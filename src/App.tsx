import { GameRuntimeProvider, useGameRuntime } from './features/prod-canvas-start-game/prod-canvas-start-game.store';
import { ACT_START_GAME_REF } from './features/surf-play-page/act_start_game';
import { PlayPageCanvasStartGame } from './screens/PlayPageCanvasStartGame';

const PLAY_ROUTE = '/play';

function currentPath(): string {
  if (typeof window === 'undefined') return PLAY_ROUTE;
  return window.location.pathname;
}

function PlayPage() {
  const { applicationState, highScore, invokeAction } = useGameRuntime();
  const path = currentPath();
  if (path !== PLAY_ROUTE) {
    return null;
  }
  return (
    <PlayPageCanvasStartGame
      statusMessage={applicationState.message}
      highScore={highScore}
      actions={{
        'start-1': () => {
          invokeAction(ACT_START_GAME_REF);
        },
      }}
    />
  );
}

export default function App() {
  return (
    <div data-setfarm-root="app" data-testid="setfarm-app-root" className="min-h-screen bg-slate-950 text-slate-100">
      <GameRuntimeProvider>
        <PlayPage />
      </GameRuntimeProvider>
    </div>
  );
}
