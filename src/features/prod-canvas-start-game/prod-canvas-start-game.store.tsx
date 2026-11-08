import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { readPersistedHighScore, writePersistedHighScore } from './prod-canvas-start-game.repo';
import { registerBridgeProvider, unregisterBridgeProvider } from '../../test/bridge';
import {
  createRuntimeSnapshot,
  runAction,
  toStateBindings,
} from '../../game/game-runtime';
import { ACT_START_GAME_REF } from '../surf-play-page/act_start_game';
import type {
  ActionInvocationOutcome,
  ApplicationState,
  HighScore,
  RuntimeStateSnapshot,
} from './prod-canvas-start-game.types';

export interface GameRuntimeContextValue {
  applicationState: ApplicationState;
  highScore: HighScore;
  invokeAction: (actionRef: string, payload?: unknown) => ActionInvocationOutcome;
  snapshot: () => RuntimeStateSnapshot;
}

const GameRuntimeContext = createContext<GameRuntimeContextValue | null>(null);

const INITIAL_APPLICATION_STATE: ApplicationState = { message: '', status: 'ready' };

export function GameRuntimeProvider({ children }: { children?: React.ReactNode }) {
  // PERSIST_HIGH_SCORE_LOCAL_STORAGE rehydration happens at initialization.
  const [applicationState, setApplicationState] = useState<ApplicationState>(INITIAL_APPLICATION_STATE);
  const [highScore, setHighScore] = useState<HighScore>(() => readPersistedHighScore());

  const snapshotRef = useRef<RuntimeStateSnapshot>(
    createRuntimeSnapshot(INITIAL_APPLICATION_STATE, null),
  );
  snapshotRef.current = createRuntimeSnapshot(applicationState, highScore);

  const invokeAction = useCallback((actionRef: string, payload?: unknown): ActionInvocationOutcome => {
    const outcome = runAction(snapshotRef.current, actionRef);
    if (!outcome.ok) {
      return { ok: false, actionRef: outcome.actionRef, states: toStateBindings(outcome.snapshot) };
    }
    snapshotRef.current = outcome.snapshot;
    setApplicationState(outcome.snapshot.applicationState);
    setHighScore(outcome.snapshot.highScore);
    if (outcome.persistHighScore !== null) {
      writePersistedHighScore(outcome.persistHighScore);
    }
    return { ok: true, actionRef: outcome.actionRef, states: toStateBindings(outcome.snapshot) };
  }, []);

  useEffect(() => {
    const provider = {
      getStates: () => toStateBindings(snapshotRef.current),
      invokeAction: (actionRef: string, payload?: unknown) => invokeAction(actionRef, payload),
    };
    registerBridgeProvider(provider);
    return () => unregisterBridgeProvider(provider);
  }, [invokeAction]);

  const value = useMemo<GameRuntimeContextValue>(
    () => ({
      applicationState,
      highScore,
      invokeAction,
      snapshot: () => snapshotRef.current,
    }),
    [applicationState, highScore, invokeAction],
  );

  return <GameRuntimeContext.Provider value={value}>{children}</GameRuntimeContext.Provider>;
}

export function useGameRuntime(): GameRuntimeContextValue {
  const context = useContext(GameRuntimeContext);
  if (!context) {
    throw new Error('useGameRuntime must be used inside GameRuntimeProvider');
  }
  return context;
}

export { ACT_START_GAME_REF };
