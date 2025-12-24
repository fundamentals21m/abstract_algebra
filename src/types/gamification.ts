// Gamification System Type Definitions

export type Difficulty = 'easy' | 'medium' | 'hard';
export type MasteryLevel = 'none' | 'learning' | 'familiar' | 'mastered';
export type CourseId = 'ba' | 'crypto' | 'aa';

// Section ID format: "course:sectionNumber" (e.g., "ba:5", "crypto:3", "aa:12")
export type SectionId = `${CourseId}:${number}` | string;

// Main state stored in localStorage
export interface GamificationState {
  version: 2;
  user: UserProgress;
  sections: Record<SectionId, SectionProgress>;
  achievements: AchievementProgress[];
  streak: StreakData;
  dailyGoals: DailyGoalState;
  lastUpdated: string; // ISO timestamp
}

export interface UserProgress {
  totalXP: number;
  level: number;
  sectionsCompleted: SectionId[];
  chaptersCompleted: string[];
  quizzesTaken: number;
  perfectQuizzes: number;
  visualizationsUsed: number;
  totalTimeSpentMinutes: number;
  joinedAt: string; // ISO timestamp
}

export interface SectionProgress {
  sectionId: SectionId;
  visitedAt: string | null;
  completedAt: string | null;
  timeSpentSeconds: number;
  quizAttempts: QuizAttempt[];
  masteryLevel: MasteryLevel;
  visualizationsInteracted: string[];
}

export interface QuizAttempt {
  timestamp: string;
  difficulty: Difficulty;
  score: number; // 0-100 percentage
  questionsCorrect: number;
  questionsTotal: number;
  xpEarned: number;
}

export interface AchievementProgress {
  id: string;
  unlockedAt: string | null;
  progress?: number; // For progressive achievements
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // YYYY-MM-DD in local timezone
  streakFreezeAvailable: boolean;
}

export interface DailyGoalState {
  date: string; // YYYY-MM-DD
  xpEarned: number;
  xpGoal: number;
  sectionsVisited: number;
  quizzesTaken: number;
  isComplete: boolean;
}

// Achievement definition (static, not stored)
export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'mastery' | 'dedication' | 'exploration';
  progressTarget?: number;
  condition: (state: GamificationState) => boolean | number;
}

// XP configuration constants
export const XP_CONFIG = {
  SECTION_VISIT: 10,
  SECTION_COMPLETE: 25,
  QUIZ_EASY: 15,
  QUIZ_MEDIUM: 25,
  QUIZ_HARD: 40,
  QUIZ_PERFECT_BONUS: 0.5,
  VISUALIZATION_USE: 5,
  CHAPTER_COMPLETE_BONUS: 50,
  STREAK_DAILY_BONUS: 5,
  STREAK_BONUS_CAP: 50,
} as const;

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2650,   // Level 8
  3550,   // Level 9
  4600,   // Level 10
] as const;

// Mastery display configuration
export const MASTERY_CONFIG = {
  none: { label: 'Not Started', color: 'text-dark-500', bgColor: 'bg-dark-700', icon: '○' },
  learning: { label: 'Learning', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', icon: '◐' },
  familiar: { label: 'Familiar', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', icon: '◑' },
  mastered: { label: 'Mastered', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', icon: '●' },
} as const;
