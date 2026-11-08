import type { ApplicationState, HighScore } from '../prod-canvas-start-game/prod-canvas-start-game.types';

/**
 * ACT_START_GAME
 * trigger: user (rendered control CSLOT_START_GAME_START_BUTTON)
 * navigation: stay
 * stateDeltas:
 *   STATE_APPLICATION_STATE /status  = "playing"
 *   STATE_APPLICATION_STATE /message = "Game started"
 *   STATE_HIGH_SCORE                  = 0
 * persistenceEffects:
 *   PERSIST_HIGH_SCORE_LOCAL_STORAGE (write)
 */
export const ACT_START_GAME_REF = 'ACT_START_GAME';

export const START_GAME_MESSAGE = 'Game started';
export const START_GAME_STATUS = 'playing';
export const START_GAME_HIGH_SCORE = 0;

export interface StartGameOutcome {
  applicationState: ApplicationState;
  highScore: HighScore;
}

export function actStartGame(current: {
  applicationState: ApplicationState;
  highScore: HighScore;
}): StartGameOutcome {
  return {
    applicationState: {
      ...current.applicationState,
      status: START_GAME_STATUS,
      message: START_GAME_MESSAGE,
    },
    highScore: START_GAME_HIGH_SCORE,
  };
}
