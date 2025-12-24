import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import type {
  GamificationState,
  QuizAttempt,
  Difficulty,
  SectionId,
} from '../types/gamification';
import { XP_CONFIG } from '../types/gamification';
import { loadState, saveState } from '../lib/gamification/storage';
import { createDefaultState, createDefaultSectionProgress, resetDailyGoalsIfNeeded } from '../lib/gamification/defaults';
import { checkAchievements, getAchievementDefinition } from '../lib/gamification/achievements';
import { calculateLevel, calculateQuizXP } from '../lib/gamification/xpCalculator';
import { updateStreak } from '../lib/gamification/streakManager';
import { calculateMasteryLevel } from '../lib/gamification/masteryCalculator';
import { curriculum } from '../data/curriculum';

// Course prefix for this app
const COURSE_PREFIX = 'aa';

// Helper to create section ID with course prefix
function makeSectionId(numericId: number): SectionId {
  return `${COURSE_PREFIX}:${numericId}`;
}

// Helper to extract numeric ID from section ID
function getNumericSectionId(sectionId: SectionId): number {
  const parts = sectionId.split(':');
  return parseInt(parts[parts.length - 1], 10);
}

// Action types
type GamificationAction =
  | { type: 'LOAD_STATE'; payload: GamificationState }
  | { type: 'VISIT_SECTION'; payload: { sectionId: SectionId } }
  | { type: 'COMPLETE_SECTION'; payload: { sectionId: SectionId } }
  | { type: 'RECORD_QUIZ'; payload: { sectionId: SectionId; difficulty: Difficulty; score: number; correct: number; total: number } }
  | { type: 'USE_VISUALIZATION'; payload: { sectionId: SectionId; name: string } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { id: string } }
  | { type: 'RESET_PROGRESS' };

// Notification types
export interface AchievementNotification {
  id: string;
  type: 'achievement' | 'level-up';
  name: string;
  description: string;
  icon: string;
}

interface GamificationContextValue {
  state: GamificationState;
  isLoading: boolean;
  notifications: AchievementNotification[];
  dismissNotification: (id: string) => void;

  // Actions - accept numeric section IDs, auto-prefix with course
  visitSection: (sectionId: number) => void;
  completeSection: (sectionId: number) => void;
  recordQuiz: (sectionId: number, difficulty: Difficulty, score: number, correct: number, total: number) => void;
  useVisualization: (sectionId: number, name: string) => void;
  resetProgress: () => void;
}

// Export for use in other components
export { makeSectionId, getNumericSectionId, COURSE_PREFIX };

const GamificationContext = createContext<GamificationContextValue | null>(null);

// Helper: Find chapter containing a section (uses numeric ID for curriculum lookup)
function findChapterForSection(sectionId: SectionId): { chapterId: number; sectionIds: SectionId[] } | null {
  const numericId = getNumericSectionId(sectionId);
  for (const chapter of curriculum) {
    const numericSectionIds = chapter.sections.map((s) => s.id);
    if (numericSectionIds.includes(numericId)) {
      // Return section IDs with course prefix
      const sectionIds = numericSectionIds.map(makeSectionId);
      return { chapterId: chapter.id, sectionIds };
    }
  }
  return null;
}

// Helper: Check if completing this section completes its chapter
function checkChapterCompletion(state: GamificationState, sectionId: SectionId): string | null {
  const chapterInfo = findChapterForSection(sectionId);
  if (!chapterInfo) return null;

  const { chapterId, sectionIds } = chapterInfo;
  const chapterIdStr = `${COURSE_PREFIX}:ch${chapterId}`;

  // Check if all sections in this chapter are completed (including the one being completed now)
  const allCompleted = sectionIds.every((id) =>
    state.user.sectionsCompleted.includes(id) || id === sectionId
  );

  if (allCompleted && !state.user.chaptersCompleted.includes(chapterIdStr)) {
    return chapterIdStr;
  }
  return null;
}

function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    case 'LOAD_STATE':
      return resetDailyGoalsIfNeeded(action.payload);

    case 'VISIT_SECTION': {
      const { sectionId } = action.payload;
      const existingSection = state.sections[sectionId];

      // Already visited
      if (existingSection?.visitedAt) {
        return state;
      }

      const now = new Date().toISOString();
      const sectionProgress = existingSection ?? createDefaultSectionProgress(sectionId);

      // Award XP for first visit
      const xpGain = XP_CONFIG.SECTION_VISIT;
      const newTotalXP = state.user.totalXP + xpGain;

      // Update streak
      const streakResult = updateStreak(state.streak);

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newTotalXP,
          level: calculateLevel(newTotalXP),
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            ...sectionProgress,
            visitedAt: now,
            masteryLevel: 'learning',
          },
        },
        streak: streakResult.streak,
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + xpGain,
          sectionsVisited: state.dailyGoals.sectionsVisited + 1,
          isComplete: state.dailyGoals.xpEarned + xpGain >= state.dailyGoals.xpGoal,
        },
      };
    }

    case 'COMPLETE_SECTION': {
      const { sectionId } = action.payload;

      // Already completed
      if (state.user.sectionsCompleted.includes(sectionId)) {
        return state;
      }

      const now = new Date().toISOString();
      const existingSection = state.sections[sectionId] ?? createDefaultSectionProgress(sectionId);

      // Award XP
      let xpGain = XP_CONFIG.SECTION_COMPLETE;

      // Check for chapter completion bonus
      const completedChapter = checkChapterCompletion(state, sectionId);
      if (completedChapter !== null) {
        xpGain += XP_CONFIG.CHAPTER_COMPLETE_BONUS;
      }

      const newTotalXP = state.user.totalXP + xpGain;

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newTotalXP,
          level: calculateLevel(newTotalXP),
          sectionsCompleted: [...state.user.sectionsCompleted, sectionId],
          chaptersCompleted: completedChapter !== null
            ? [...state.user.chaptersCompleted, completedChapter]
            : state.user.chaptersCompleted,
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            ...existingSection,
            visitedAt: existingSection.visitedAt ?? now,
            completedAt: now,
          },
        },
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + xpGain,
          isComplete: state.dailyGoals.xpEarned + xpGain >= state.dailyGoals.xpGoal,
        },
      };
    }

    case 'RECORD_QUIZ': {
      const { sectionId, difficulty, score, correct, total } = action.payload;
      const now = new Date().toISOString();
      const existingSection = state.sections[sectionId] ?? createDefaultSectionProgress(sectionId);

      // Calculate XP
      const xpGain = calculateQuizXP(difficulty, score);
      const newTotalXP = state.user.totalXP + xpGain;
      const isPerfect = score === 100;

      // Create quiz attempt record
      const attempt: QuizAttempt = {
        timestamp: now,
        difficulty,
        score,
        questionsCorrect: correct,
        questionsTotal: total,
        xpEarned: xpGain,
      };

      const updatedSection = {
        ...existingSection,
        visitedAt: existingSection.visitedAt ?? now,
        quizAttempts: [...existingSection.quizAttempts, attempt],
      };

      // Recalculate mastery
      updatedSection.masteryLevel = calculateMasteryLevel(updatedSection);

      // Update streak
      const streakResult = updateStreak(state.streak);

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newTotalXP,
          level: calculateLevel(newTotalXP),
          quizzesTaken: state.user.quizzesTaken + 1,
          perfectQuizzes: isPerfect ? state.user.perfectQuizzes + 1 : state.user.perfectQuizzes,
        },
        sections: {
          ...state.sections,
          [sectionId]: updatedSection,
        },
        streak: streakResult.streak,
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + xpGain,
          quizzesTaken: state.dailyGoals.quizzesTaken + 1,
          isComplete: state.dailyGoals.xpEarned + xpGain >= state.dailyGoals.xpGoal,
        },
      };
    }

    case 'USE_VISUALIZATION': {
      const { sectionId, name } = action.payload;
      const existingSection = state.sections[sectionId] ?? createDefaultSectionProgress(sectionId);

      // Already used this visualization
      if (existingSection.visualizationsInteracted.includes(name)) {
        return state;
      }

      const now = new Date().toISOString();
      const xpGain = XP_CONFIG.VISUALIZATION_USE;
      const newTotalXP = state.user.totalXP + xpGain;

      // Update streak
      const streakResult = updateStreak(state.streak);

      const updatedSection = {
        ...existingSection,
        visitedAt: existingSection.visitedAt ?? now,
        visualizationsInteracted: [...existingSection.visualizationsInteracted, name],
      };

      // Recalculate mastery
      updatedSection.masteryLevel = calculateMasteryLevel(updatedSection);

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newTotalXP,
          level: calculateLevel(newTotalXP),
          visualizationsUsed: state.user.visualizationsUsed + 1,
        },
        sections: {
          ...state.sections,
          [sectionId]: updatedSection,
        },
        streak: streakResult.streak,
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + xpGain,
          isComplete: state.dailyGoals.xpEarned + xpGain >= state.dailyGoals.xpGoal,
        },
      };
    }

    case 'UPDATE_STREAK': {
      return resetDailyGoalsIfNeeded(state);
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const { id } = action.payload;
      const now = new Date().toISOString();

      return {
        ...state,
        achievements: state.achievements.map((a) =>
          a.id === id && !a.unlockedAt ? { ...a, unlockedAt: now } : a
        ),
      };
    }

    case 'RESET_PROGRESS':
      return createDefaultState();

    default:
      return state;
  }
}

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, null, () => {
    try {
      const loaded = loadState();
      if (loaded) {
        // Validate the loaded state has required fields
        if (loaded.user && loaded.sections && loaded.achievements && loaded.streak && loaded.dailyGoals) {
          return resetDailyGoalsIfNeeded(loaded);
        }
      }
    } catch (error) {
      console.error('Failed to load gamification state:', error);
    }
    return createDefaultState();
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const previousLevelRef = useRef<number | null>(null);

  // Load state on mount
  useEffect(() => {
    try {
      const loaded = loadState();
      if (loaded && loaded.user && loaded.sections && loaded.achievements && loaded.streak && loaded.dailyGoals) {
        dispatch({ type: 'LOAD_STATE', payload: loaded });
      }
    } catch (error) {
      console.error('Failed to load gamification state on mount:', error);
    }
    setIsLoading(false);
  }, []);

  // Persist state changes
  useEffect(() => {
    if (!isLoading && state) {
      try {
        saveState(state);

        // Check for level-up
        const currentLevel = state.user?.level ?? 1;
        if (previousLevelRef.current !== null && currentLevel > previousLevelRef.current) {
          setNotifications((prev) => [
            ...prev,
            {
              id: `level-up-${currentLevel}-${Date.now()}`,
              type: 'level-up',
              name: `Level ${currentLevel}`,
              description: 'Keep up the great work!',
              icon: '🎉',
            },
          ]);
        }
        previousLevelRef.current = currentLevel;

        // Check for new achievements
        const newlyUnlocked = checkAchievements(state);
        for (const id of newlyUnlocked) {
          const existing = state.achievements?.find((a) => a.id === id);
          if (existing && !existing.unlockedAt) {
            dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { id } });

            // Add notification
            const def = getAchievementDefinition(id);
            if (def) {
              setNotifications((prev) => [
                ...prev,
                { id, type: 'achievement', name: def.name, description: def.description, icon: def.icon },
              ]);
            }
          }
        }
      } catch (error) {
        console.error('Error in gamification effect:', error);
      }
    }
  }, [state, isLoading]);

  // Update streak/daily goals on visibility change (user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch({ type: 'UPDATE_STREAK' });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const visitSection = useCallback((numericSectionId: number) => {
    const sectionId = makeSectionId(numericSectionId);
    dispatch({ type: 'VISIT_SECTION', payload: { sectionId } });
  }, []);

  const completeSection = useCallback((numericSectionId: number) => {
    const sectionId = makeSectionId(numericSectionId);
    dispatch({ type: 'COMPLETE_SECTION', payload: { sectionId } });
  }, []);

  const recordQuiz = useCallback(
    (numericSectionId: number, difficulty: Difficulty, score: number, correct: number, total: number) => {
      const sectionId = makeSectionId(numericSectionId);
      dispatch({ type: 'RECORD_QUIZ', payload: { sectionId, difficulty, score, correct, total } });
    },
    []
  );

  const useVisualization = useCallback((numericSectionId: number, name: string) => {
    const sectionId = makeSectionId(numericSectionId);
    dispatch({ type: 'USE_VISUALIZATION', payload: { sectionId, name } });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' });
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        state,
        isLoading,
        notifications,
        dismissNotification,
        visitSection,
        completeSection,
        recordQuiz,
        useVisualization,
        resetProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
}
