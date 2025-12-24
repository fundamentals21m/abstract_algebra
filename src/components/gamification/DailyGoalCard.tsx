import { useGamification } from '../../contexts/GamificationContext';

export function DailyGoalCard() {
  const { state } = useGamification();
  const { dailyGoals, streak } = state;

  const percentage = Math.min(100, Math.round((dailyGoals.xpEarned / dailyGoals.xpGoal) * 100));

  return (
    <div className="p-5 rounded-2xl bg-dark-800/60 border border-dark-700/50 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-dark-100">Today's Goal</h3>
        {streak.currentStreak > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
            <span className="text-base">🔥</span>
            <span className="text-orange-400 font-bold text-sm">{streak.currentStreak}</span>
            <span className="text-orange-400/70 text-xs">day{streak.currentStreak !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-dark-700 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            dailyGoals.isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
              : 'bg-gradient-to-r from-primary-500 to-cyan-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">★</span>
          <span className="text-dark-200 font-medium">
            {dailyGoals.xpEarned} / {dailyGoals.xpGoal} XP
          </span>
        </div>
        {dailyGoals.isComplete ? (
          <span className="text-emerald-400 font-medium">Goal reached!</span>
        ) : (
          <span className="text-dark-500">{dailyGoals.xpGoal - dailyGoals.xpEarned} XP to go</span>
        )}
      </div>

      {/* Activity summary */}
      <div className="mt-4 pt-4 border-t border-dark-700/50 flex gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-dark-500">📚</span>
          <span className="text-dark-300">{dailyGoals.sectionsVisited} section{dailyGoals.sectionsVisited !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-dark-500">✏️</span>
          <span className="text-dark-300">{dailyGoals.quizzesTaken} quiz{dailyGoals.quizzesTaken !== 1 ? 'zes' : ''}</span>
        </div>
      </div>
    </div>
  );
}
