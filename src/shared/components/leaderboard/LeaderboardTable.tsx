/**
 * LeaderboardTable - Displays ranked leaderboard entries
 */

import { shortenNpub } from '../../nostr/utils';
import type { LeaderboardRanking } from '../../leaderboard/types';

interface LeaderboardTableProps {
  rankings: LeaderboardRanking[];
  currentUserNpub?: string | null;
  isLoading?: boolean;
}

function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return { emoji: '1st', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/30' };
    case 2:
      return { emoji: '2nd', bgColor: 'bg-gray-400/20', textColor: 'text-gray-300', borderColor: 'border-gray-400/30' };
    case 3:
      return { emoji: '3rd', bgColor: 'bg-orange-500/20', textColor: 'text-orange-400', borderColor: 'border-orange-500/30' };
    default:
      return { emoji: `${rank}`, bgColor: 'bg-dark-700/50', textColor: 'text-dark-300', borderColor: 'border-dark-600/30' };
  }
}

function LeaderboardRow({
  entry,
  isCurrentUser,
}: {
  entry: LeaderboardRanking;
  isCurrentUser: boolean;
}) {
  const badge = getRankBadge(entry.rank);

  return (
    <div
      className={`
        flex items-center gap-4 p-3 rounded-xl transition-colors
        ${isCurrentUser ? 'bg-primary-500/10 border border-primary-500/30' : 'hover:bg-dark-700/30'}
      `}
    >
      {/* Rank badge */}
      <div
        className={`
          w-10 h-10 rounded-lg ${badge.bgColor} ${badge.borderColor} border
          flex items-center justify-center font-bold ${badge.textColor}
          ${entry.rank <= 3 ? 'text-lg' : 'text-sm'}
        `}
      >
        {badge.emoji}
      </div>

      {/* Avatar */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold
          ${entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
            entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
              entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                'bg-gradient-to-br from-primary-500 to-purple-500'}
        `}
      >
        {entry.displayName?.[0]?.toUpperCase() || entry.npub[5]?.toUpperCase() || '?'}
      </div>

      {/* Name and npub */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium truncate ${isCurrentUser ? 'text-primary-300' : 'text-dark-100'}`}>
            {entry.displayName || shortenNpub(entry.npub, 8)}
          </span>
          {isCurrentUser && (
            <span className="text-xs bg-primary-500/20 text-primary-300 px-1.5 py-0.5 rounded">
              You
            </span>
          )}
        </div>
        {entry.displayName && (
          <span className="text-xs text-dark-500 font-mono">
            {shortenNpub(entry.npub, 6)}
          </span>
        )}
      </div>

      {/* XP and Level */}
      <div className="text-right">
        <div className="text-lg font-bold text-yellow-400">
          {entry.xp.toLocaleString()}
          <span className="text-xs text-dark-400 ml-1">XP</span>
        </div>
        <div className="text-xs text-dark-400">
          Level {entry.level}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-dark-700" />
          <div className="w-10 h-10 rounded-full bg-dark-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-dark-700 rounded w-32" />
            <div className="h-3 bg-dark-700 rounded w-24" />
          </div>
          <div className="space-y-2 text-right">
            <div className="h-5 bg-dark-700 rounded w-16 ml-auto" />
            <div className="h-3 bg-dark-700 rounded w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">🏆</div>
      <p className="text-dark-300 font-medium">No rankings yet</p>
      <p className="text-dark-500 text-sm mt-1">
        Be the first to join the leaderboard!
      </p>
    </div>
  );
}

export function LeaderboardTable({
  rankings,
  currentUserNpub,
  isLoading = false,
}: LeaderboardTableProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (rankings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      {rankings.map((entry) => (
        <LeaderboardRow
          key={entry.npub}
          entry={entry}
          isCurrentUser={currentUserNpub === entry.npub}
        />
      ))}
    </div>
  );
}
