import { useGamification } from '../../contexts/GamificationContext';
import { AchievementCard } from './AchievementCard';

export function AchievementGrid() {
  const { state } = useGamification();
  const { achievements } = state;

  const unlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;

  return (
    <div className="p-5 rounded-2xl bg-dark-800/60 border border-dark-700/50 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-dark-100">Achievements</h3>
        <div className="px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
          <span className="text-yellow-400 font-bold text-sm">
            {unlockedCount} / {achievements.length}
          </span>
        </div>
      </div>

      <div className="grid gap-3">
        {/* Show unlocked first, then locked */}
        {[...achievements]
          .sort((a, b) => {
            if (a.unlockedAt && !b.unlockedAt) return -1;
            if (!a.unlockedAt && b.unlockedAt) return 1;
            return 0;
          })
          .map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
      </div>
    </div>
  );
}
