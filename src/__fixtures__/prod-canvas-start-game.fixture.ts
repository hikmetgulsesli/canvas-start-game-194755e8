import type { ApplicationState, HighScore } from '../features/prod-canvas-start-game/prod-canvas-start-game.types';

/** STATE_APPLICATION_STATE initial value. */
export const INITIAL_APPLICATION_STATE: ApplicationState = { message: '', status: 'ready' };

/** STATE_HIGH_SCORE initial value (no persisted score yet). */
export const INITIAL_HIGH_SCORE: HighScore = null;

export interface ProdCanvasStartGameFixture {
  applicationState: ApplicationState;
  highScore: HighScore;
}

export function createProdCanvasStartGameFixture(): ProdCanvasStartGameFixture {
  return {
    applicationState: { ...INITIAL_APPLICATION_STATE },
    highScore: INITIAL_HIGH_SCORE,
  };
}
