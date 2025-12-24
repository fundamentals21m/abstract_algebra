/**
 * Nostr NIP-07 types for browser extension integration
 * Compatible with nos2x, Alby, and other NIP-07 extensions
 */

/**
 * Nostr event structure (NIP-01)
 */
export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

/**
 * Unsigned event (before signing)
 */
export interface UnsignedNostrEvent {
  kind: number;
  created_at: number;
  tags: string[][];
  content: string;
  pubkey?: string;
}

/**
 * NIP-07 window.nostr interface
 */
export interface WindowNostr {
  /**
   * Get the user's public key (hex format)
   */
  getPublicKey(): Promise<string>;

  /**
   * Sign a Nostr event
   */
  signEvent(event: UnsignedNostrEvent): Promise<NostrEvent>;

  /**
   * Optional: Get relays the user prefers
   */
  getRelays?(): Promise<Record<string, { read: boolean; write: boolean }>>;

  /**
   * Optional: Encrypt a message (NIP-04)
   */
  nip04?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };

  /**
   * Optional: Encrypt a message (NIP-44)
   */
  nip44?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };
}

/**
 * Extend Window interface to include nostr
 */
declare global {
  interface Window {
    nostr?: WindowNostr;
  }
}

/**
 * Auth challenge kind (NIP-98 inspired)
 */
export const AUTH_EVENT_KIND = 22242;

/**
 * Leaderboard user data
 */
export interface LeaderboardUser {
  npub: string;
  displayName: string | null;
  totalXP: number;
  scores: {
    ba: number;
    crypto: number;
    aa: number;
  };
  level: number;
  banned: boolean;
  isAdmin: boolean;
}

/**
 * Score entry for leaderboard
 */
export interface LeaderboardEntry {
  rank: number;
  npub: string;
  displayName: string | null;
  xp: number;
  level: number;
}

/**
 * Course identifiers
 */
export type CourseId = 'ba' | 'crypto' | 'aa';
