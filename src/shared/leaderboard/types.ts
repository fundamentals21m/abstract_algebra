/**
 * Leaderboard types shared across all apps
 */

export type CourseId = 'ba' | 'crypto' | 'aa';

/**
 * User profile stored in Firestore
 */
export interface UserProfile {
  npub: string;
  pubkeyHex: string;
  displayName: string | null;
  totalXP: number;
  scores: Record<CourseId, number>;
  level: number;
  banned: boolean;
  isAdmin: boolean;
  lastSeen: Date;
  createdAt: Date;
}

/**
 * Score entry for a specific course
 */
export interface ScoreEntry {
  npub: string;
  courseId: CourseId;
  xp: number;
  lastUpdated: Date;
}

/**
 * Leaderboard ranking entry
 */
export interface LeaderboardRanking {
  rank: number;
  npub: string;
  displayName: string | null;
  xp: number;
  level: number;
}

/**
 * Leaderboard response from Cloud Function
 */
export interface LeaderboardResponse {
  rankings: LeaderboardRanking[];
  userRank: number | null;
}

/**
 * Score update payload for sync
 */
export interface ScoreUpdate {
  courseId: CourseId;
  xp: number;
}

/**
 * Sync payload sent to Cloud Function
 */
export interface SyncPayload {
  scores: ScoreUpdate[];
  displayName?: string | null;
}

/**
 * Auth state for the app
 */
export interface AuthState {
  isAuthenticated: boolean;
  isConnecting: boolean;
  npub: string | null;
  displayName: string | null;
  isAdmin: boolean;
  error: string | null;
}

/**
 * Notification for achievements, level-ups, etc.
 */
export interface LeaderboardNotification {
  id: string;
  type: 'rank_up' | 'rank_down' | 'new_high_score';
  message: string;
  timestamp: Date;
}
