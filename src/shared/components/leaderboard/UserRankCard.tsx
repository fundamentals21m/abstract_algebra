/**
 * UserRankCard - Shows the current user's rank
 */

import { useState, useCallback } from 'react';
import { useNostrAuth } from '../../contexts/NostrAuthContext';

interface UserRankCardProps {
  rank: number | null;
  totalXP: number;
  level: number;
  courseXP?: {
    ba: number;
    crypto: number;
    aa: number;
  };
}

export function UserRankCard({ rank, totalXP, level, courseXP }: UserRankCardProps) {
  const { npub, displayName, nip05 } = useNostrAuth();
  const [copied, setCopied] = useState(false);

  const copyNpub = useCallback(() => {
    if (npub) {
      navigator.clipboard.writeText(npub);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [npub]);

  if (!npub) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20 backdrop-blur">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/25">
          {displayName?.[0]?.toUpperCase() || npub[5]?.toUpperCase() || '?'}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          {/* Display name (nickname) */}
          {displayName && (
            <div className="font-semibold text-dark-100 truncate text-lg">{displayName}</div>
          )}

          {/* NIP-05 verified identity */}
          {nip05 && (
            <div className="text-sm text-dark-300 flex items-center gap-1">
              <span className="truncate">{nip05}</span>
              <svg className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Full npub - clickable to copy */}
          <button
            onClick={copyNpub}
            className="text-xs text-dark-400 font-mono break-all text-left hover:text-dark-200 transition-colors group"
            title="Click to copy"
          >
            {npub}
            <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? '✓' : '📋'}
            </span>
          </button>
        </div>

        {/* Rank */}
        <div className="text-right">
          {rank !== null ? (
            <>
              <div className="text-3xl font-bold text-primary-400">
                #{rank}
              </div>
              <div className="text-xs text-dark-400">Global Rank</div>
            </>
          ) : (
            <>
              <div className="text-xl font-bold text-dark-400">--</div>
              <div className="text-xs text-dark-500">Not ranked</div>
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 pt-4 border-t border-dark-700/50 grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold text-yellow-400">
            {totalXP.toLocaleString()}
          </div>
          <div className="text-xs text-dark-400">Total XP</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-400">
            {level}
          </div>
          <div className="text-xs text-dark-400">Level</div>
        </div>
      </div>

      {/* Course breakdown */}
      {courseXP && (
        <div className="mt-4 pt-4 border-t border-dark-700/50">
          <div className="text-xs text-dark-400 mb-2">XP by Course</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-dark-800/50 text-center">
              <div className="text-sm font-bold text-blue-400">
                {courseXP.ba.toLocaleString()}
              </div>
              <div className="text-xs text-dark-500">Basic Algebra</div>
            </div>
            <div className="p-2 rounded-lg bg-dark-800/50 text-center">
              <div className="text-sm font-bold text-green-400">
                {courseXP.crypto.toLocaleString()}
              </div>
              <div className="text-xs text-dark-500">Cryptography</div>
            </div>
            <div className="p-2 rounded-lg bg-dark-800/50 text-center">
              <div className="text-sm font-bold text-purple-400">
                {courseXP.aa.toLocaleString()}
              </div>
              <div className="text-xs text-dark-500">Abstract Algebra</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
