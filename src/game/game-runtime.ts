import { actStartGame, ACT_START_GAME_REF } from '../features/surf-play-page/act_start_game';
import type {
  ApplicationState,
  HighScore,
  RuntimeStateBindings,
  RuntimeStateSnapshot,
} from '../features/prod-canvas-start-game/prod-canvas-start-game.types';

/** Generated local control id of the start button on SURF_PLAY_PAGE. */
export const START_BUTTON_LOCAL_ID = 'start-1';

export interface ActionOutcome {
  ok: boolean;
  actionRef: string;
  snapshot: RuntimeStateSnapshot;
  /** Non-null when the action produced a high score that must be persisted. */
  persistHighScore: number | null;
}

export function normalizeActionRef(actionRef: string): string {
  if (actionRef === START_BUTTON_LOCAL_ID) return ACT_START_GAME_REF;
  return actionRef;
}

export function toStateBindings(snapshot: RuntimeStateSnapshot): RuntimeStateBindings {
  return {
    STATE_APPLICATION_STATE: { ...snapshot.applicationState },
    STATE_HIGH_SCORE: snapshot.highScore,
  };
}

export function createRuntimeSnapshot(applicationState: ApplicationState, highScore: HighScore): RuntimeStateSnapshot {
  return { applicationState: { ...applicationState }, highScore };
}

/** Dispatches a bound product action against the current runtime snapshot. */
export function runAction(snapshot: RuntimeStateSnapshot, actionRef: string): ActionOutcome {
  const ref = normalizeActionRef(actionRef);
  if (ref !== ACT_START_GAME_REF) {
    return { ok: false, actionRef: ref, snapshot, persistHighScore: null };
  }
  const next = actStartGame(snapshot);
  return {
    ok: true,
    actionRef: ref,
    snapshot: next,
    persistHighScore: typeof next.highScore === 'number' ? next.highScore : null,
  };
}
