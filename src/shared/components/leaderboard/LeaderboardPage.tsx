/**
 * LeaderboardPage - Main leaderboard view with tabs for different courses
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions, isFirebaseConfigured } from '../../firebase/config';
import { useNostrAuth } from '../../contexts/NostrAuthContext';
import { NostrConnectButton } from './NostrConnectButton';
import { LeaderboardTable } from './LeaderboardTable';
import { UserRankCard } from './UserRankCard';
import { AdminPanel } from './AdminPanel';
import { getSyncManager } from '../../leaderboard/syncManager';
import { fetchNostrProfiles, type NostrProfile } from '../../nostr/utils';
import type { CourseId, LeaderboardRanking, LeaderboardResponse } from '../../leaderboard/types';

type TabId = CourseId | 'overall';

const TABS: { id: TabId; label: string; shortLabel: string }[] = [
  { id: 'overall', label: 'Overall', shortLabel: 'All' },
  { id: 'ba', label: 'Basic Algebra', shortLabel: 'BA' },
  { id: 'crypto', label: 'Cryptography', shortLabel: 'Crypto' },
  { id: 'aa', label: 'Abstract Algebra', shortLabel: 'AA' },
];

interface LeaderboardPageProps {
  className?: string;
}

export function LeaderboardPage({ className = '' }: LeaderboardPageProps) {
  const { isAuthenticated, npub, displayName, setDisplayName, isAdmin } = useNostrAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overall');
  const [rankings, setRankings] = useState<LeaderboardRanking[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(displayName || '');

  // Cache for fetched Nostr profiles
  const profileCache = useRef<Map<string, NostrProfile>>(new Map());

  // Load leaderboard data
  const loadLeaderboard = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      setError('Firebase not configured');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const functions = getFirebaseFunctions();
      const getLeaderboard = httpsCallable<
        { courseId: TabId; limit: number },
        LeaderboardResponse
      >(functions, 'getLeaderboard');

      const result = await getLeaderboard({ courseId: activeTab, limit: 50 });
      setRankings(result.data.rankings);
      setUserRank(result.data.userRank);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  // Load leaderboard on mount and tab change
  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  // Fetch Nostr profiles for users without display names
  useEffect(() => {
    const fetchMissingProfiles = async () => {
      // Find users without display names who aren't already cached
      const npubsToFetch = rankings
        .filter(r => !r.displayName && !profileCache.current.has(r.npub))
        .map(r => r.npub);

      if (npubsToFetch.length === 0) return;

      // Fetch profiles from Nostr relays
      const profiles = await fetchNostrProfiles(npubsToFetch);

      // Update cache
      profiles.forEach((profile, npub) => {
        profileCache.current.set(npub, profile);
      });

      // Update rankings with fetched display names
      if (profiles.size > 0) {
        setRankings(prev => prev.map(r => {
          const profile = profileCache.current.get(r.npub);
          if (!r.displayName && profile) {
            return {
              ...r,
              displayName: profile.display_name || profile.name || null,
            };
          }
          return r;
        }));
      }
    };

    fetchMissingProfiles();
  }, [rankings]);

  // Refresh leaderboard periodically (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(loadLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [loadLeaderboard]);

  // Get local scores
  const syncManager = getSyncManager();
  const localScores = syncManager.getLocalScores();
  const totalXP = localScores
    ? localScores.ba + localScores.crypto + localScores.aa
    : 0;
  const level = Math.floor(Math.sqrt(totalXP / 100)) + 1;

  // Handle display name save
  const handleSaveName = () => {
    const trimmed = nameInput.trim().slice(0, 30);
    setDisplayName(trimmed || null);
    setEditingName(false);
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Leaderboard</h1>
          <p className="text-sm text-dark-400 mt-1">
            Compete with other learners across all courses
          </p>
        </div>

        <NostrConnectButton showDisplayName={false} />
      </div>

      {/* User rank card (if authenticated) */}
      {isAuthenticated && (
        <div className="mb-6">
          <UserRankCard
            rank={userRank}
            totalXP={totalXP}
            level={level}
            courseXP={localScores || undefined}
          />

          {/* Display name editor */}
          <div className="mt-3 flex items-center gap-2">
            {editingName ? (
              <>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter display name"
                  maxLength={30}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-600 text-dark-100 text-sm focus:outline-none focus:border-primary-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') setEditingName(false);
                  }}
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-500 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingName(false)}
                  className="px-3 py-1.5 rounded-lg bg-dark-700 text-dark-300 text-sm hover:bg-dark-600 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setNameInput(displayName || '');
                  setEditingName(true);
                }}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                {displayName ? 'Edit display name' : 'Set display name'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Connect prompt (if not authenticated) */}
      {!isAuthenticated && (
        <div className="mb-6 p-6 rounded-2xl bg-dark-800/60 border border-dark-700/50 text-center">
          <div className="text-4xl mb-3">🔐</div>
          <h3 className="text-lg font-semibold text-dark-100 mb-2">
            Connect to Join the Leaderboard
          </h3>
          <p className="text-sm text-dark-400 mb-4 max-w-sm mx-auto">
            Link your Nostr identity to sync your progress and compete with other learners.
          </p>
          <NostrConnectButton />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-dark-800/60 border border-dark-700/50 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50'
              }
            `}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
          <button
            onClick={loadLeaderboard}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Leaderboard table */}
      <div className="p-4 rounded-2xl bg-dark-800/60 border border-dark-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-dark-100">
            {TABS.find((t) => t.id === activeTab)?.label} Rankings
          </h2>
          <button
            onClick={loadLeaderboard}
            disabled={isLoading}
            className="text-xs text-dark-400 hover:text-dark-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <LeaderboardTable
          rankings={rankings}
          currentUserNpub={npub}
          isLoading={isLoading}
        />
      </div>

      {/* Admin panel (for admins only) */}
      {isAdmin && (
        <AdminPanel className="mt-6" />
      )}

      {/* Footer */}
      <p className="mt-4 text-xs text-dark-500 text-center">
        Scores sync automatically when you&apos;re connected.
        Rankings update every few minutes.
      </p>
    </div>
  );
}
