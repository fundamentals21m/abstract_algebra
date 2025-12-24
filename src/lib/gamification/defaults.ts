// Default state factory for gamification

import type { GamificationState, SectionProgress, SectionId } from '../../types/gamification';
import { getLocalDateString } from './storage';
import { ACHIEVEMENT_DEFINITIONS } from './achievements';

/**
 * Create a fresh gamification state for new users.
 */
export function createDefaultState(): GamificationState {
  const now = new Date().toISOString();
  const today = getLocalDateString();

  return {
    version: 2,
    user: {
      totalXP: 0,
      level: 1,
      sectionsCompleted: [],
      chaptersCompleted: [],
      quizzesTaken: 0,
      perfectQuizzes: 0,
      visualizationsUsed: 0,
      totalTimeSpentMinutes: 0,
      joinedAt: now,
    },
    sections: {},
    achievements: ACHIEVEMENT_DEFINITIONS.map((def) => ({
      id: def.id,
      unlockedAt: null,
      progress: def.progressTarget ? 0 : undefined,
    })),
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: '',
      streakFreezeAvailable: false,
    },
    dailyGoals: {
      date: today,
      xpEarned: 0,
      xpGoal: 50,
      sectionsVisited: 0,
      quizzesTaken: 0,
      isComplete: false,
    },
    lastUpdated: now,
  };
}

/**
 * Create a default section progress object.
 */
export function createDefaultSectionProgress(sectionId: SectionId): SectionProgress {
  return {
    sectionId,
    visitedAt: null,
    completedAt: null,
    timeSpentSeconds: 0,
    quizAttempts: [],
    masteryLevel: 'none',
    visualizationsInteracted: [],
  };
}

/**
 * Reset daily goals if the date has changed.
 */
export function resetDailyGoalsIfNeeded(state: GamificationState): GamificationState {
  const today = getLocalDateString();

  if (state.dailyGoals.date !== today) {
    return {
      ...state,
      dailyGoals: {
        date: today,
        xpEarned: 0,
        xpGoal: state.dailyGoals.xpGoal, // Keep the user's goal setting
        sectionsVisited: 0,
        quizzesTaken: 0,
        isComplete: false,
      },
    };
  }

  return state;
}
