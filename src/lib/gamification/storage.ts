// localStorage operations for gamification state

import type { GamificationState } from '../../types/gamification';

const STORAGE_KEY = 'magic-internet-math-progress';
const OLD_STORAGE_KEY = 'basic-algebra-progress';

/**
 * Migrate from old single-course storage to new unified format.
 * Prefixes all section IDs with 'ba:' for Basic Algebra.
 */
function migrateFromOldFormat(): GamificationState | null {
  try {
    const oldData = localStorage.getItem(OLD_STORAGE_KEY);
    if (!oldData) return null;

    const oldState = JSON.parse(oldData);

    // Migrate sections: numeric keys to 'ba:N' string keys
    const newSections: Record<string, typeof oldState.sections[number]> = {};
    for (const [key, value] of Object.entries(oldState.sections || {})) {
      newSections[`ba:${key}`] = {
        ...value as Record<string, unknown>,
        sectionId: `ba:${key}`,
      };
    }

    // Migrate user arrays: prefix section/chapter IDs
    const migratedState: GamificationState = {
      ...oldState,
      version: 2,
      sections: newSections,
      user: {
        ...oldState.user,
        sectionsCompleted: (oldState.user.sectionsCompleted || []).map((id: number) => `ba:${id}`),
        chaptersCompleted: (oldState.user.chaptersCompleted || []).map((id: number) => `ba:${id}`),
      },
    };

    // Save to new key and remove old
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedState));
    localStorage.removeItem(OLD_STORAGE_KEY);

    console.log('Migrated gamification data to unified format');
    return migratedState;
  } catch (error) {
    console.error('Migration failed:', error);
    return null;
  }
}

/**
 * Load gamification state from localStorage.
 * Returns null if no state exists or if parsing fails.
 */
export function loadState(): GamificationState | null {
  try {
    // Check for old format first and migrate if needed
    if (localStorage.getItem(OLD_STORAGE_KEY) && !localStorage.getItem(STORAGE_KEY)) {
      return migrateFromOldFormat();
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as GamificationState;

    // Version check for future migrations
    if (parsed.version !== 2) {
      console.warn('Unknown gamification state version:', parsed.version);
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load gamification state:', error);
    return null;
  }
}

/**
 * Save gamification state to localStorage.
 * Updates the lastUpdated timestamp automatically.
 */
export function saveState(state: GamificationState): boolean {
  try {
    const stateToSave: GamificationState = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    return true;
  } catch (error) {
    console.error('Failed to save gamification state:', error);
    return false;
  }
}

/**
 * Clear all gamification data from localStorage.
 */
export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if gamification state exists in localStorage.
 */
export function hasState(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Get the current date string in YYYY-MM-DD format using local timezone.
 * This ensures "day" boundaries match the user's local midnight.
 */
export function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
