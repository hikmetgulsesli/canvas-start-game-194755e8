import type { HighScore } from './prod-canvas-start-game.types';

/**
 * PERSIST_HIGH_SCORE_LOCAL_STORAGE
 * kind: local_storage, owner: application, durability: reload,
 * rehydration: initialization.
 */
export const HIGH_SCORE_STORAGE_KEY = 'setfarm.canvas_start_game.high_score_local_storage.v1';

function localStorageRef(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Reads the persisted high score during application initialization (rehydration). */
export function readPersistedHighScore(): HighScore {
  const store = localStorageRef();
  if (!store) return null;
  let raw: string | null;
  try {
    raw = store.getItem(HIGH_SCORE_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'number' && Number.isFinite(parsed)) return parsed;
    if (parsed && typeof parsed === 'object' && 'high_score' in (parsed as Record<string, unknown>)) {
      const value = (parsed as Record<string, unknown>).high_score;
      if (typeof value === 'number' && Number.isFinite(value)) return value;
    }
    return null;
  } catch {
    return null;
  }
}

/** Writes the high score for reload durability. */
export function writePersistedHighScore(highScore: HighScore): void {
  const store = localStorageRef();
  if (!store) return;
  try {
    store.setItem(HIGH_SCORE_STORAGE_KEY, JSON.stringify({ high_score: highScore }));
  } catch {
    /* persistence is best effort in constrained environments */
  }
}
