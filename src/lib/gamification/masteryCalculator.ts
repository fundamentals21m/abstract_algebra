// Mastery level calculation

import type { SectionProgress, MasteryLevel } from '../../types/gamification';

interface MasteryFactors {
  hasVisited: boolean;
  bestQuizScore: number;
  quizAttemptCount: number;
  hasHardQuizPass: boolean;
  visualizationsUsed: number;
}

/**
 * Extract factors used to determine mastery level.
 */
function extractMasteryFactors(section: SectionProgress): MasteryFactors {
  const quizAttempts = section.quizAttempts;
  const scores = quizAttempts.map((a) => a.score);
  const hardAttempts = quizAttempts.filter((a) => a.difficulty === 'hard');

  return {
    hasVisited: section.visitedAt !== null,
    bestQuizScore: scores.length > 0 ? Math.max(...scores) : 0,
    quizAttemptCount: quizAttempts.length,
    hasHardQuizPass: hardAttempts.some((a) => a.score >= 70),
    visualizationsUsed: section.visualizationsInteracted.length,
  };
}

/**
 * Calculate the mastery level for a section.
 *
 * Levels:
 * - mastered: Hard quiz passed with 80%+ OR medium quiz at 100%
 * - familiar: Any quiz passed with 70%+ and used visualizations
 * - learning: Has visited and attempted a quiz
 * - none: Default
 */
export function calculateMasteryLevel(section: SectionProgress): MasteryLevel {
  const factors = extractMasteryFactors(section);

  // MASTERED: Hard quiz passed with 80%+ OR any quiz at 100%
  if (factors.hasHardQuizPass && factors.bestQuizScore >= 80) {
    return 'mastered';
  }
  if (factors.bestQuizScore === 100) {
    return 'mastered';
  }

  // FAMILIAR: Any quiz passed with 70%+ and used visualizations
  if (factors.bestQuizScore >= 70 && factors.visualizationsUsed >= 1) {
    return 'familiar';
  }

  // LEARNING: Has visited and attempted a quiz
  if (factors.hasVisited && factors.quizAttemptCount >= 1) {
    return 'learning';
  }

  // If just visited but no quiz
  if (factors.hasVisited) {
    return 'learning';
  }

  return 'none';
}
