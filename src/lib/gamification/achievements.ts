// Achievement definitions

import type { AchievementDefinition, GamificationState } from '../../types/gamification';

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // PROGRESS
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first section',
    icon: '🎯',
    category: 'progress',
    condition: (state) => state.user.sectionsCompleted.length >= 1,
  },
  {
    id: 'chapter-champion',
    name: 'Chapter Champion',
    description: 'Complete all sections in a chapter',
    icon: '🏆',
    category: 'progress',
    condition: (state) => state.user.chaptersCompleted.length >= 1,
  },

  // MASTERY
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 100% on any quiz',
    icon: '⭐',
    category: 'mastery',
    condition: (state) => state.user.perfectQuizzes >= 1,
  },
  {
    id: 'triple-threat',
    name: 'Triple Threat',
    description: 'Complete quizzes at all three difficulty levels',
    icon: '🎖️',
    category: 'mastery',
    condition: (state) => {
      const difficulties = new Set<string>();
      Object.values(state.sections).forEach((section) => {
        section.quizAttempts.forEach((attempt) => {
          difficulties.add(attempt.difficulty);
        });
      });
      return difficulties.size >= 3;
    },
  },

  // DEDICATION
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    category: 'dedication',
    condition: (state) => state.streak.currentStreak >= 3,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '💪',
    category: 'dedication',
    progressTarget: 7,
    condition: (state) => state.streak.currentStreak,
  },

  // EXPLORATION
  {
    id: 'curious-mind',
    name: 'Curious Mind',
    description: 'Interact with 10 different visualizations',
    icon: '🔬',
    category: 'exploration',
    progressTarget: 10,
    condition: (state) => {
      const uniqueViz = new Set<string>();
      Object.values(state.sections).forEach((section) => {
        section.visualizationsInteracted.forEach((v) => uniqueViz.add(v));
      });
      return uniqueViz.size;
    },
  },

  // MILESTONE
  {
    id: 'logic-unlocked',
    name: 'Logic Unlocked',
    description: 'Earn 2,000 XP to unlock the Logic Interlude',
    icon: '🔓',
    category: 'progress',
    progressTarget: 2000,
    condition: (state) => state.user.totalXP,
  },
];

/**
 * Check all achievements and return IDs of newly unlocked ones.
 */
export function checkAchievements(state: GamificationState): string[] {
  const newlyUnlocked: string[] = [];

  for (const def of ACHIEVEMENT_DEFINITIONS) {
    const progress = state.achievements.find((a) => a.id === def.id);
    if (!progress) continue;

    // Skip already unlocked
    if (progress.unlockedAt) continue;

    const result = def.condition(state);
    const isUnlocked = typeof result === 'boolean' ? result : result >= (def.progressTarget ?? 1);

    if (isUnlocked) {
      newlyUnlocked.push(def.id);
    }
  }

  return newlyUnlocked;
}

/**
 * Get achievement definition by ID.
 */
export function getAchievementDefinition(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENT_DEFINITIONS.find((a) => a.id === id);
}
