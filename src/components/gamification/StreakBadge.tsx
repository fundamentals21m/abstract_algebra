import { useGamification } from '../../contexts/GamificationContext';
import { hasActivityToday, isStreakAtRisk } from '../../lib/gamification/streakManager';

interface StreakBadgeProps {
  showLabel?: boolean;
}

export function StreakBadge({ showLabel = false }: StreakBadgeProps) {
  const { state } = useGamification();
  const { currentStreak } = state.streak;

  if (currentStreak === 0) {
    return null;
  }

  const hasToday = hasActivityToday(state.streak);
  const atRisk = isStreakAtRisk(state.streak);

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
        atRisk
          ? 'bg-orange-500/20 border border-orange-500/30 animate-pulse'
          : hasToday
          ? 'bg-orange-500/20 border border-orange-500/30'
          : 'bg-dark-800/80 border border-dark-700'
      }`}
      title={atRisk ? 'Study today to keep your streak!' : `${currentStreak} day streak`}
    >
      <span className={`text-lg ${hasToday ? 'animate-bounce' : ''}`}>🔥</span>
      <span className={`font-bold text-sm ${atRisk ? 'text-orange-400' : 'text-dark-200'}`}>
        {currentStreak}
      </span>
      {showLabel && (
        <span className="text-dark-500 text-xs ml-1">
          day{currentStreak !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
