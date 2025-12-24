import type { AchievementProgress } from '../../types/gamification';
import { getAchievementDefinition } from '../../lib/gamification/achievements';

interface AchievementCardProps {
  achievement: AchievementProgress;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const def = getAchievementDefinition(achievement.id);
  if (!def) return null;

  const isUnlocked = achievement.unlockedAt !== null;
  const hasProgress = def.progressTarget && achievement.progress !== undefined;
  const progressPercent = hasProgress
    ? Math.min(100, Math.round((achievement.progress! / def.progressTarget!) * 100))
    : 0;

  return (
    <div
      className={`relative p-4 rounded-xl border transition-all ${
        isUnlocked
          ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-yellow-500/30'
          : 'bg-dark-800/40 border-dark-700/50 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative group">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl cursor-help ${
              isUnlocked ? 'bg-yellow-500/20' : 'bg-dark-700/50 grayscale'
            }`}
          >
            {def.icon}
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 whitespace-nowrap">
            <div className="text-xs font-semibold text-dark-200 mb-1">How to unlock:</div>
            <div className="text-xs text-dark-400">{def.description}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark-800" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${isUnlocked ? 'text-dark-100' : 'text-dark-400'}`}>
            {def.name}
          </h4>
          <p className={`text-sm ${isUnlocked ? 'text-dark-300' : 'text-dark-500'}`}>
            {def.description}
          </p>

          {/* Progress bar for progressive achievements */}
          {hasProgress && !isUnlocked && (
            <div className="mt-2">
              <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-xs text-dark-500 mt-1">
                {achievement.progress} / {def.progressTarget}
              </div>
            </div>
          )}
        </div>

        {isUnlocked && (
          <div className="text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
