import { useGamification } from '../../contexts/GamificationContext';
import { getXPProgress } from '../../lib/gamification/xpCalculator';
import { getTotalSections } from '../../data/curriculum';

export function ProgressStats() {
  const { state } = useGamification();
  const { user, streak } = state;
  const { percentage } = getXPProgress(user.totalXP);
  const totalSections = getTotalSections();

  const stats = [
    {
      label: 'Level',
      value: user.level,
      subtext: `${percentage}% to next`,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
    },
    {
      label: 'Total XP',
      value: user.totalXP.toLocaleString(),
      subtext: 'earned',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      label: 'Sections',
      value: user.sectionsCompleted.length,
      subtext: `of ${totalSections}`,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
    },
    {
      label: 'Best Streak',
      value: streak.longestStreak,
      subtext: 'days',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-dark-800/60 border border-dark-700/50 backdrop-blur">
      <h3 className="text-lg font-semibold text-dark-100 mb-4">Your Progress</h3>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-3 rounded-xl ${stat.bgColor} border border-dark-700/30`}
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-dark-400">
              {stat.label} <span className="text-dark-500">{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional stats */}
      <div className="mt-4 pt-4 border-t border-dark-700/50 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="text-dark-200 font-medium">{user.quizzesTaken}</div>
          <div className="text-dark-500 text-xs">Quizzes</div>
        </div>
        <div>
          <div className="text-dark-200 font-medium">{user.perfectQuizzes}</div>
          <div className="text-dark-500 text-xs">Perfect</div>
        </div>
        <div>
          <div className="text-dark-200 font-medium">{user.chaptersCompleted.length}</div>
          <div className="text-dark-500 text-xs">Chapters</div>
        </div>
      </div>
    </div>
  );
}
