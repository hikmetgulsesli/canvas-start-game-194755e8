import type { ActionInvocationOutcome, RuntimeStateBindings } from '../features/prod-canvas-start-game/prod-canvas-start-game.types';

export interface SetfarmTestBridge {
  invokeAction(actionRef: string | Record<string, unknown>, payload?: unknown): ActionInvocationOutcome;
  readonly states: RuntimeStateBindings | Record<string, unknown>;
}

export interface BridgeProvider {
  getStates(): RuntimeStateBindings | Record<string, unknown>;
  invokeAction(actionRef: string, payload?: unknown): ActionInvocationOutcome;
}

declare global {
  interface Window {
    __SETFARM_TEST_BRIDGE__?: SetfarmTestBridge;
    __SETFARM_SCENARIO_MODE__?: string;
  }
}

let activeProvider: BridgeProvider | null = null;

function emptyOutcome(actionRef: string): ActionInvocationOutcome {
  return { ok: false, actionRef, states: {} };
}

function resolveActionRef(input: string | Record<string, unknown>): string {
  if (typeof input === 'string') return input;
  if (input && typeof input === 'object') {
    const candidate =
      (input as Record<string, unknown>).actionRef ??
      (input as Record<string, unknown>).action ??
      (input as Record<string, unknown>).localId ??
      (input as Record<string, unknown>).id;
    if (typeof candidate === 'string') return candidate;
  }
  return '';
}

function bridge(): SetfarmTestBridge {
  return {
    invokeAction(input, payload) {
      const actionRef = resolveActionRef(input);
      if (!activeProvider) return emptyOutcome(actionRef);
      return activeProvider.invokeAction(actionRef, payload);
    },
    get states() {
      if (!activeProvider) return {};
      return activeProvider.getStates();
    },
  };
}

/**
 * Installs the runtime capture globals declared by the runtime evidence contract:
 *   capture.globalName      -> __SETFARM_TEST_BRIDGE__
 *   scenarioMode.globalName -> __SETFARM_SCENARIO_MODE__ (value "manual")
 */
export function installSetfarmTestBridge(): void {
  if (typeof window === 'undefined') return;
  window.__SETFARM_SCENARIO_MODE__ = 'manual';
  if (!window.__SETFARM_TEST_BRIDGE__) {
    window.__SETFARM_TEST_BRIDGE__ = bridge();
  }
}

export function registerBridgeProvider(provider: BridgeProvider): void {
  activeProvider = provider;
  installSetfarmTestBridge();
  if (typeof window !== 'undefined') {
    window.__SETFARM_TEST_BRIDGE__ = bridge();
  }
}

export function unregisterBridgeProvider(provider: BridgeProvider): void {
  if (activeProvider === provider) activeProvider = null;
}
