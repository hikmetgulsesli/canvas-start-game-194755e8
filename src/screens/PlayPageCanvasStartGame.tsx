// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Play page - Canvas Start Game
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Preserve the generated action-input state and exact payload transport
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state


export type PlayPageCanvasStartGameActionId = "start-1";

export interface PlayPageCanvasStartGameProps {
  actions?: {
    "start-1"?: () => void;
  };
  /** STATE_APPLICATION_STATE /message bound to the "Game status" observable. */
  statusMessage?: string;
  /** STATE_HIGH_SCORE bound to the "Current high score" observable. */
  highScore?: number | null;
}

export type PlayPageCanvasStartGameActionCallbacks = NonNullable<PlayPageCanvasStartGameProps["actions"]>;

export function PlayPageCanvasStartGame({ actions, statusMessage, highScore }: PlayPageCanvasStartGameProps) {
  const route = typeof window !== "undefined" ? window.location.pathname : "/play";
  const statusText = statusMessage && statusMessage.length > 0 ? statusMessage : "Ready";
  const highScoreText = highScore === null || highScore === undefined ? "" : String(highScore);
  return (
    <>
        <div data-surface-id="SURF_PLAY_PAGE" data-route={route} className="flex-1 flex flex-col min-h-screen" data-setfarm-element-ref="E000001" data-observable-refs="OBS_START_GAME_PLAY_ROUTE_RETAINED">
          {/* Top Header Bar (decorative, no undeclared controls) */}
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                C
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-wide text-white leading-tight">Canvas Arena</h1>
                <span className="text-xs text-slate-400">Route: /play</span>
              </div>
            </div>
      
            {/* Status and Score Info Panel */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Status:</span>
                {/* Accessible role="status" named "Game status" */}
                <div className="inline-flex items-center text-sm font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full" data-setfarm-element-ref="E000002" role="status" aria-label="Game status" data-observable-refs="OBS_START_GAME_GAME_STARTED_MESSAGE" data-value={statusText}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>{statusText}
                </div>
              </div>
      
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">High Score:</span>
                {/* Accessible role="status" named "Current high score". Initially empty string before action */}
                <div className="inline-flex items-center justify-center min-w-[2.5rem] h-8 text-sm font-mono font-bold text-indigo-300 bg-slate-800/80 border border-slate-700 px-3 rounded-lg" data-setfarm-element-ref="E000003" role="status" aria-label="Current high score" data-observable-refs="OBS_START_GAME_PERSISTED_HIGH_SCORE_VALUE" data-value={highScoreText}>{highScoreText}</div>
              </div>
            </div>
          </header>
      
          {/* Main Workspace */}
          <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-7xl mx-auto w-full">
            {/* Game Canvas Section */}
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/40 rounded-2xl border border-slate-800/80 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
              {/* Declared contained surface: SURF_GAME_CANVAS */}
              <div data-surface-id="SURF_GAME_CANVAS" className="w-full max-w-3xl aspect-[16/9] bg-slate-950 rounded-xl border border-slate-800 relative flex flex-col items-center justify-center shadow-inner overflow-hidden" data-setfarm-element-ref="E000004">
                {/* Subtle decorative grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/80 to-slate-950"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      
                {/* Canvas graphic placeholder representation */}
                <div className="relative z-10 text-center px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-200 mb-1">Canvas Game Display</h2>
                  <p className="text-sm text-slate-400 max-w-sm">Primary rendering surface ready for 2D game context and gameplay loops.</p>
                </div>
              </div>
            </div>
      
            {/* Controls Panel Sidebar */}
            <aside className="w-full lg:w-80 flex flex-col justify-between bg-slate-900/50 rounded-2xl border border-slate-800/80 p-6 shadow-xl">
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-semibold text-white">Match Operations</h2>
                  <p className="text-xs text-slate-400 mt-1">Initiate game loop and start recording performance.</p>
                </div>
      
                {/* Game Parameters Overview (decorative only) */}
                <div className="space-y-3">
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Target Resolution</span>
                    <span className="text-xs font-mono text-slate-300">1280 × 720</span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Frame Budget</span>
                    <span className="text-xs font-mono text-slate-300">60 FPS</span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">State Persistence</span>
                    <span className="text-xs font-mono text-slate-300">Local Storage</span>
                  </div>
                </div>
              </div>
      
              {/* Action Control Slot */}
              <div className="pt-6 border-t border-slate-800 mt-6">
                {/* Declared physical actionable control: CSLOT_START_GAME_START_BUTTON */}
                <button type="button" data-action="ACT_START_GAME" data-control-slot="CSLOT_START_GAME_START_BUTTON" className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-colors duration-150 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900" data-setfarm-element-ref="E000005" data-observable-refs="OBS_START_GAME_START_BUTTON_AVAILABLE" data-action-id="start-1" onClick={actions?.["start-1"]}>
                  <span>Start</span>
                </button>
              </div>
            </aside>
          </main>
      
          {/* Footer Chrome (decorative, no controls) */}
          <footer className="border-t border-slate-800 bg-slate-950 px-8 py-3 text-xs text-slate-500 flex items-center justify-between">
            <span>Play page session active</span>
            <span>UTF-8 Static Build</span>
          </footer>
        </div>
    </>
  );
}
