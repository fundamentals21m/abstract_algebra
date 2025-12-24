// Streak management logic

import type { StreakData } from '../../types/gamification';
import { getLocalDateString } from './storage';

/**
 * Calculate days between two YYYY-MM-DD date strings.
 */
function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1 + 'T00:00:00');
  const d2 = new Date(date2 + 'T00:00:00');
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export interface StreakUpdateResult {
  streak: StreakData;
  streakBroken: boolean;
  streakExtended: boolean;
}

/**
 * Update streak based on activity.
 * Call this when any activity occurs (section visit, quiz, visualization use).
 */
export function updateStreak(
  current: StreakData,
  activityDate: string = getLocalDateString()
): StreakUpdateResult {
  const { lastActivityDate, currentStreak, longestStreak, streakFreezeAvailable } = current;

  // First activity ever
  if (!lastActivityDate) {
    return {
      streak: {
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: activityDate,
        streakFreezeAvailable,
      },
      streakBroken: false,
      streakExtended: true,
    };
  }

  const daysDiff = daysBetween(lastActivityDate, activityDate);

  // Same day - no change
  if (daysDiff === 0) {
    return {
      streak: current,
      streakBroken: false,
      streakExtended: false,
    };
  }

  // Next day - extend streak
  if (daysDiff === 1) {
    const newStreak = currentStreak + 1;
    return {
      streak: {
        currentStreak: newStreak,
        longestStreak: Math.max(longestStreak, newStreak),
        lastActivityDate: activityDate,
        streakFreezeAvailable,
      },
      streakBroken: false,
      streakExtended: true,
    };
  }

  // More than 1 day gap - streak broken, start new
  return {
    streak: {
      currentStreak: 1,
      longestStreak,
      lastActivityDate: activityDate,
      streakFreezeAvailable,
    },
    streakBroken: currentStreak > 0,
    streakExtended: true,
  };
}

/**
 * Check if there has been activity today.
 */
export function hasActivityToday(streak: StreakData): boolean {
  return streak.lastActivityDate === getLocalDateString();
}

/**
 * Check if the streak is at risk (no activity today and streak > 0).
 */
export function isStreakAtRisk(streak: StreakData): boolean {
  return streak.currentStreak > 0 && !hasActivityToday(streak);
}
