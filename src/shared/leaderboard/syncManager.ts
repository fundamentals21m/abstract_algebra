/**
 * SyncManager - Handles syncing local progress to Firebase
 * Works with both React apps and vanilla JS (Crypto course)
 */

import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions, isFirebaseConfigured } from '../firebase/config';
import type { CourseId, ScoreUpdate, SyncPayload } from './types';

// Storage key for gamification state
const STORAGE_KEY = 'magic-internet-math-progress';

// Sync interval (5 minutes)
const SYNC_INTERVAL_MS = 5 * 60 * 1000;

// Debounce delay for immediate syncs
const DEBOUNCE_MS = 2000;

/**
 * Extract scores from localStorage gamification state
 */
function extractScoresFromStorage(): ScoreUpdate[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state = JSON.parse(stored);
    if (!state?.user || !state?.sections) return null;

    const scores: Record<CourseId, number> = { ba: 0, crypto: 0, aa: 0 };

    // Calculate XP per course from sections
    for (const [sectionId, sectionData] of Object.entries(state.sections)) {
      const [coursePrefix] = sectionId.split(':');
      const course = coursePrefix as CourseId;

      if (!['ba', 'crypto', 'aa'].includes(course)) continue;

      const section = sectionData as {
        visitedAt?: string;
        completedAt?: string;
        quizAttempts?: Array<{ xpEarned?: number }>;
        visualizationsInteracted?: string[];
      };

      // Add XP from quiz attempts
      if (section.quizAttempts) {
        for (const attempt of section.quizAttempts) {
          if (attempt.xpEarned) {
            scores[course] += attempt.xpEarned;
          }
        }
      }

      // Add XP for section visits (10 XP each)
      if (section.visitedAt) {
        scores[course] += 10;
      }

      // Add XP for section completion (25 XP each)
      if (section.completedAt) {
        scores[course] += 25;
      }

      // Add XP for visualizations (5 XP each)
      if (section.visualizationsInteracted) {
        scores[course] += section.visualizationsInteracted.length * 5;
      }
    }

    return [
      { courseId: 'ba', xp: scores.ba },
      { courseId: 'crypto', xp: scores.crypto },
      { courseId: 'aa', xp: scores.aa },
    ];
  } catch (error) {
    console.error('Error extracting scores from storage:', error);
    return null;
  }
}

/**
 * SyncManager class for handling score synchronization
 */
export class SyncManager {
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastSyncTime: number = 0;
  private isAuthenticated: boolean = false;
  private displayName: string | null = null;

  /**
   * Set authentication status
   */
  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
    if (authenticated) {
      this.syncNow();
    }
  }

  /**
   * Set display name to sync with scores
   */
  setDisplayName(name: string | null): void {
    this.displayName = name;
  }

  /**
   * Start periodic sync
   */
  startPeriodicSync(): void {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      if (this.isAuthenticated) {
        this.syncNow();
      }
    }, SYNC_INTERVAL_MS);

    // Also sync on visibility change (user returns to tab)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  /**
   * Stop periodic sync
   */
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  /**
   * Handle visibility change event
   */
  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible' && this.isAuthenticated) {
      this.syncNow();
    }
  };

  /**
   * Request a sync (debounced)
   */
  requestSync(): void {
    if (!this.isAuthenticated) return;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.syncNow();
    }, DEBOUNCE_MS);
  }

  /**
   * Sync scores immediately
   */
  async syncNow(): Promise<{ success: boolean; totalXP?: number; error?: string }> {
    if (!this.isAuthenticated) {
      return { success: false, error: 'Not authenticated' };
    }

    if (!isFirebaseConfigured()) {
      return { success: false, error: 'Firebase not configured' };
    }

    // Rate limit: don't sync more than once every 30 seconds
    const now = Date.now();
    if (now - this.lastSyncTime < 30000) {
      return { success: false, error: 'Rate limited' };
    }

    try {
      const scores = extractScoresFromStorage();
      if (!scores) {
        return { success: false, error: 'No scores to sync' };
      }

      const functions = getFirebaseFunctions();
      const syncScores = httpsCallable<SyncPayload, { success: boolean; totalXP: number }>(
        functions,
        'syncScores'
      );

      const payload: SyncPayload = { scores };
      if (this.displayName !== undefined) {
        payload.displayName = this.displayName;
      }

      const result = await syncScores(payload);
      this.lastSyncTime = now;

      return { success: result.data.success, totalXP: result.data.totalXP };
    } catch (error) {
      console.error('Sync failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get current local scores
   */
  getLocalScores(): Record<CourseId, number> | null {
    const scores = extractScoresFromStorage();
    if (!scores) return null;

    return scores.reduce(
      (acc, s) => {
        acc[s.courseId] = s.xp;
        return acc;
      },
      { ba: 0, crypto: 0, aa: 0 } as Record<CourseId, number>
    );
  }
}

// Singleton instance
let syncManagerInstance: SyncManager | null = null;

/**
 * Get the singleton SyncManager instance
 */
export function getSyncManager(): SyncManager {
  if (!syncManagerInstance) {
    syncManagerInstance = new SyncManager();
  }
  return syncManagerInstance;
}
