interface TopBarProps {
  voiceMode: boolean;
  onVoiceModeChange: (voice: boolean) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export function TopBar({ voiceMode, onVoiceModeChange, theme, onToggleTheme, onOpenSettings }: TopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-edge/70 bg-panel/40 px-5">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-md bg-panel2 ring-1 ring-ember/40 shadow-[0_0_14px_-2px_color-mix(in_oklab,var(--ember)_50%,transparent)]">
          <span className="size-2 rounded-full bg-ember shadow-[0_0_8px_2px_color-mix(in_oklab,var(--ember)_80%,transparent)]" />
        </span>
        <div className="leading-none">
          <span className="text-[15px] font-semibold tracking-tight">BalSaccie</span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
            orchestrator · v0.4
          </span>
        </div>
      </div>

      <div className="ml-6 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog/60 md:flex">
        <span className="size-1 animate-pulse rounded-full bg-done" /> agent online
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center rounded-md bg-panel2 p-0.5 font-mono text-[11px] ring-1 ring-edge">
          <button
            type="button"
            onClick={() => onVoiceModeChange(false)}
            className={
              !voiceMode
                ? "rounded-[6px] bg-ember/15 px-2.5 py-1.5 text-ember ring-1 ring-ember/30"
                : "rounded-[6px] px-2.5 py-1.5 text-fog/70 transition-colors hover:text-bright"
            }
          >
            text
          </button>
          <button
            type="button"
            onClick={() => onVoiceModeChange(true)}
            className={
              voiceMode
                ? "rounded-[6px] bg-ember/15 px-2.5 py-1.5 text-ember ring-1 ring-ember/30"
                : "rounded-[6px] px-2.5 py-1.5 text-fog/70 transition-colors hover:text-bright"
            }
          >
            voice
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="grid size-9 place-items-center rounded-md bg-panel2 text-fog ring-1 ring-edge transition-colors hover:text-bright"
        >
          <span
            className="block size-4 rounded-full ring-1 ring-current"
            style={{ background: "linear-gradient(90deg, currentColor 50%, transparent 50%)" }}
          />
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Settings"
          className="grid size-9 place-items-center rounded-md bg-panel2 text-fog ring-1 ring-edge transition-colors hover:text-bright"
        >
          <span className="flex flex-col gap-0.5">
            <span className="h-0.5 w-4 rounded bg-current" />
            <span className="h-0.5 w-4 rounded bg-current" />
            <span className="h-0.5 w-4 rounded bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
}
