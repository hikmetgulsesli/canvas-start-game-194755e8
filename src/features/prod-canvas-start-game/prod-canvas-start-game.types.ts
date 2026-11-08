/**
 * Types for the ACT_START_GAME product component (US-001).
 *
 * The runtime contract binds exactly two application states:
 *   - STATE_APPLICATION_STATE : { message: string; status: string }
 *   - STATE_HIGH_SCORE        : number | null
 */

export interface ApplicationState {
  message: string;
  status: string;
}

export type HighScore = number | null;

/** ENTITY_GAME_PROGRESS */
export interface GameProgress {
  high_score: HighScore;
}

export interface RuntimeStateSnapshot {
  applicationState: ApplicationState;
  highScore: HighScore;
}

/** Shape published through the runtime capture bridge state bindings. */
export type RuntimeStateBindings = {
  STATE_APPLICATION_STATE: ApplicationState;
  STATE_HIGH_SCORE: HighScore;
};

export interface ActionInvocationOutcome {
  ok: boolean;
  actionRef: string;
  states: Record<string, unknown>;
}
