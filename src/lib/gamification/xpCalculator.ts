// XP calculation logic

import type { Difficulty } from '../../types/gamification';
import { XP_CONFIG, LEVEL_THRESHOLDS } from '../../types/gamification';

/**
 * Calculate the level for a given XP total.
 */
export function calculateLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      if (i === LEVEL_THRESHOLDS.length - 1) {
        // Beyond defined levels - each level requires 1200 more XP
        const extraXP = totalXP - LEVEL_THRESHOLDS[i];
        return i + 1 + Math.floor(extraXP / 1200);
      }
      return i + 1;
    }
  }
  return 1;
}

/**
 * Get XP progress toward the next level.
 */
export function getXPProgress(totalXP: number): { current: number; required: number; percentage: number } {
  const level = calculateLevel(totalXP);
  const levelIndex = level - 1;

  const currentThreshold =
    levelIndex < LEVEL_THRESHOLDS.length
      ? LEVEL_THRESHOLDS[levelIndex]
      : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (levelIndex - LEVEL_THRESHOLDS.length + 1) * 1200;

  const nextThreshold =
    levelIndex + 1 < LEVEL_THRESHOLDS.length
      ? LEVEL_THRESHOLDS[levelIndex + 1]
      : currentThreshold + 1200;

  const current = totalXP - currentThreshold;
  const required = nextThreshold - currentThreshold;
  const percentage = Math.min(100, Math.round((current / required) * 100));

  return { current, required, percentage };
}

/**
 * Calculate XP earned for completing a quiz.
 */
export function calculateQuizXP(difficulty: Difficulty, scorePercent: number): number {
  const base = {
    easy: XP_CONFIG.QUIZ_EASY,
    medium: XP_CONFIG.QUIZ_MEDIUM,
    hard: XP_CONFIG.QUIZ_HARD,
  }[difficulty];

  // Scale XP by score (minimum 25% of base for any attempt)
  const scoreMultiplier = Math.max(0.25, scorePercent / 100);
  let xp = Math.round(base * scoreMultiplier);

  // Perfect score bonus
  if (scorePercent === 100) {
    xp = Math.round(xp * (1 + XP_CONFIG.QUIZ_PERFECT_BONUS));
  }

  return xp;
}

/**
 * Calculate streak bonus XP.
 */
export function calculateStreakBonus(streakDays: number): number {
  const bonus = streakDays * XP_CONFIG.STREAK_DAILY_BONUS;
  return Math.min(bonus, XP_CONFIG.STREAK_BONUS_CAP);
}
