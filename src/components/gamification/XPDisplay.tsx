import { useGamification } from '../../contexts/GamificationContext';
import { getXPProgress } from '../../lib/gamification/xpCalculator';

interface XPDisplayProps {
  compact?: boolean;
}

export function XPDisplay({ compact = false }: XPDisplayProps) {
  const { state } = useGamification();
  const { totalXP, level } = state.user;
  const { current, required, percentage } = getXPProgress(totalXP);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-dark-800/80 border border-dark-700">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-dark-200 text-sm font-medium">{totalXP.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-600/20 border border-primary-500/30">
          <span className="text-primary-400 text-sm font-bold">Lv{level}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-dark-100 font-bold text-lg">{totalXP.toLocaleString()} XP</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30">
          <span className="text-primary-400 font-bold">Level {level}</span>
        </div>
      </div>
      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-dark-500 text-right">
        {current} / {required} XP to next level
      </div>
    </div>
  );
}
