/**
 * NostrAuthContext - Manages Nostr authentication state
 * Uses NIP-07 browser extensions (nos2x, Alby, etc.)
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { signInWithCustomToken, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseAuth, getFirebaseFunctions, isFirebaseConfigured } from '../firebase/config';
import { hexToNpub, npubToHex, hasNostrExtension, waitForNostrExtension } from '../nostr/utils';
import { AUTH_EVENT_KIND, type UnsignedNostrEvent, type NostrEvent } from '../nostr/types';
import { getSyncManager } from '../leaderboard/syncManager';

// Default relays to query for profile
const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.nostr.band',
  'wss://nos.lol',
  'wss://relay.primal.net',
];

// Nostr profile metadata (kind 0)
interface NostrProfile {
  name?: string;
  display_name?: string;
  nip05?: string;
  picture?: string;
  about?: string;
}

// Fetch profile from a single relay
async function fetchProfileFromRelay(
  relayUrl: string,
  pubkeyHex: string
): Promise<NostrProfile | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      ws.close();
      resolve(null);
    }, 5000);

    const ws = new WebSocket(relayUrl);
    const subId = Math.random().toString(36).substring(2, 15);

    ws.onopen = () => {
      // Request kind 0 (metadata) events for this pubkey
      const req = JSON.stringify([
        'REQ',
        subId,
        { kinds: [0], authors: [pubkeyHex], limit: 1 },
      ]);
      ws.send(req);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data[0] === 'EVENT' && data[1] === subId) {
          const content = JSON.parse(data[2].content);
          clearTimeout(timeout);
          ws.close();
          resolve({
            name: content.name || content.display_name,
            display_name: content.display_name,
            nip05: content.nip05,
            picture: content.picture,
            about: content.about,
          });
        } else if (data[0] === 'EOSE') {
          // End of stored events - no profile found
          clearTimeout(timeout);
          ws.close();
          resolve(null);
        }
      } catch {
        // Ignore parse errors
      }
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      ws.close();
      resolve(null);
    };
  });
}

interface NostrAuthContextValue {
  // Auth state
  isAuthenticated: boolean;
  isConnecting: boolean;
  npub: string | null;
  displayName: string | null;
  nip05: string | null;
  isAdmin: boolean;
  error: string | null;

  // Extension status
  hasExtension: boolean;
  extensionChecked: boolean;

  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setDisplayName: (name: string | null) => void;
  clearError: () => void;
}

const NostrAuthContext = createContext<NostrAuthContextValue | null>(null);

// Storage key for persisted auth state
const AUTH_STORAGE_KEY = 'magic-internet-math-nostr-auth';

interface StoredAuthState {
  npub: string;
  displayName: string | null;
}

export function NostrAuthProvider({ children }: { children: ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [npub, setNpub] = useState<string | null>(null);
  const [displayName, setDisplayNameState] = useState<string | null>(null);
  const [nip05, setNip05] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasExtension, setHasExtension] = useState(false);
  const [extensionChecked, setExtensionChecked] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // Check for Nostr extension on mount
  useEffect(() => {
    const checkExtension = async () => {
      const found = await waitForNostrExtension(2000);
      setHasExtension(found);
      setExtensionChecked(true);
    };
    checkExtension();
  }, []);

  // Fetch user profile from Nostr relays to get NIP-05 and display name
  const fetchNostrProfile = useCallback(async (pubkeyHex: string) => {
    // Try each relay until we get a profile
    for (const relayUrl of DEFAULT_RELAYS) {
      try {
        const profile = await fetchProfileFromRelay(relayUrl, pubkeyHex);
        if (profile) {
          if (profile.nip05) {
            setNip05(profile.nip05);
          }
          // Use display_name or name from Nostr profile
          const profileName = profile.display_name || profile.name;
          if (profileName) {
            setDisplayNameState(profileName);
            // Sync display name to Firebase
            const syncManager = getSyncManager();
            syncManager.setDisplayName(profileName);
            syncManager.requestSync();
          }
          return;
        }
      } catch (err) {
        console.warn(`Failed to fetch profile from ${relayUrl}:`, err);
      }
    }
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        // User is signed in
        setNpub(user.uid);

        // Get custom claims from ID token (force refresh to get latest claims)
        try {
          const tokenResult = await user.getIdTokenResult(true);
          console.log('[NostrAuth] Token claims:', tokenResult.claims);
          setIsAdmin(tokenResult.claims.isAdmin === true);
        } catch (err) {
          console.error('[NostrAuth] Error getting token:', err);
          setIsAdmin(false);
        }

        // Restore display name from storage
        try {
          const stored = localStorage.getItem(AUTH_STORAGE_KEY);
          if (stored) {
            const state: StoredAuthState = JSON.parse(stored);
            if (state.npub === user.uid) {
              setDisplayNameState(state.displayName);
            }
          }
        } catch {
          // Ignore storage errors
        }

        // Start sync manager
        const syncManager = getSyncManager();
        syncManager.setAuthenticated(true);
        syncManager.startPeriodicSync();

        // Fetch profile from Nostr relays (for NIP-05)
        try {
          const pubkeyHex = npubToHex(user.uid);
          fetchNostrProfile(pubkeyHex);
        } catch {
          // Ignore conversion errors
        }
      } else {
        // User is signed out
        setNpub(null);
        setNip05(null);
        setIsAdmin(false);
        setDisplayNameState(null);

        // Stop sync manager
        const syncManager = getSyncManager();
        syncManager.setAuthenticated(false);
        syncManager.stopPeriodicSync();
      }
    });

    return () => unsubscribe();
  }, [fetchNostrProfile]);

  // Connect with Nostr
  const connect = useCallback(async () => {
    console.log('[NostrAuth] connect() called');
    console.log('[NostrAuth] isFirebaseConfigured:', isFirebaseConfigured());
    console.log('[NostrAuth] hasNostrExtension:', hasNostrExtension());

    if (!isFirebaseConfigured()) {
      setError('Firebase is not configured. Please set up your Firebase project.');
      console.log('[NostrAuth] Firebase not configured, returning');
      return;
    }

    if (!hasNostrExtension()) {
      setError('No Nostr extension found. Please install nos2x, Alby, or another NIP-07 extension.');
      console.log('[NostrAuth] No extension found, returning');
      return;
    }

    setIsConnecting(true);
    setError(null);
    console.log('[NostrAuth] Starting connection...');

    try {
      const nostr = window.nostr!;
      const functions = getFirebaseFunctions();

      // Step 1: Get public key from extension
      const pubkeyHex = await nostr.getPublicKey();
      const userNpub = hexToNpub(pubkeyHex);

      // Step 2: Request challenge from server
      const createChallenge = httpsCallable<
        { pubkeyHex: string },
        { challenge: string; expiresAt: number }
      >(functions, 'createChallenge');

      const challengeResult = await createChallenge({ pubkeyHex });
      const { challenge } = challengeResult.data;

      // Step 3: Sign the challenge
      const unsignedEvent: UnsignedNostrEvent = {
        kind: AUTH_EVENT_KIND,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['challenge', challenge]],
        content: challenge,
      };

      const signedEvent: NostrEvent = await nostr.signEvent(unsignedEvent);

      // Step 4: Verify signature and get Firebase token
      const verifyNostrAndCreateToken = httpsCallable<
        { signedEvent: NostrEvent; challenge: string },
        { token: string; npub: string }
      >(functions, 'verifyNostrAndCreateToken');

      const verifyResult = await verifyNostrAndCreateToken({
        signedEvent,
        challenge,
      });

      // Step 5: Sign in to Firebase
      const auth = getFirebaseAuth();
      await signInWithCustomToken(auth, verifyResult.data.token);

      // Store auth state
      try {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ npub: userNpub, displayName: null })
        );
      } catch {
        // Ignore storage errors
      }

      // Trigger initial sync
      const syncManager = getSyncManager();
      syncManager.syncNow();
    } catch (err) {
      console.error('Nostr connect error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect. Please try again.'
      );
    } finally {
      setIsConnecting(false);
    }
  }, [hasExtension]);

  // Disconnect
  const disconnect = useCallback(async () => {
    try {
      if (isFirebaseConfigured()) {
        const auth = getFirebaseAuth();
        await signOut(auth);
      }

      // Clear stored auth state
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }

      setNpub(null);
      setDisplayNameState(null);
      setIsAdmin(false);
    } catch (err) {
      console.error('Disconnect error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to disconnect'
      );
    }
  }, []);

  // Set display name
  const setDisplayName = useCallback(
    (name: string | null) => {
      setDisplayNameState(name);

      // Update storage
      if (npub) {
        try {
          localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ npub, displayName: name })
          );
        } catch {
          // Ignore storage errors
        }
      }

      // Update sync manager and trigger sync
      const syncManager = getSyncManager();
      syncManager.setDisplayName(name);
      syncManager.requestSync();
    },
    [npub]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: NostrAuthContextValue = {
    isAuthenticated: !!firebaseUser && !!npub,
    isConnecting,
    npub,
    displayName,
    nip05,
    isAdmin,
    error,
    hasExtension,
    extensionChecked,
    connect,
    disconnect,
    setDisplayName,
    clearError,
  };

  return (
    <NostrAuthContext.Provider value={value}>
      {children}
    </NostrAuthContext.Provider>
  );
}

export function useNostrAuth() {
  const context = useContext(NostrAuthContext);
  if (!context) {
    throw new Error('useNostrAuth must be used within NostrAuthProvider');
  }
  return context;
}
