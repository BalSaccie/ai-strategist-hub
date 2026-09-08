import { useEffect } from "react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const models = ["claude-orchestrator", "claude-sonnet", "claude-haiku"];

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="rise w-full max-w-[520px] rounded-[14px] bg-panel2 p-5 ring-1 ring-edge"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">Settings</span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] text-fog/60 transition-colors hover:text-bright"
          >
            close
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog/60" htmlFor="apikey">
              API key
            </label>
            <input
              id="apikey"
              type="password"
              placeholder="sk-ant-…"
              className="mt-2 w-full rounded-[10px] bg-panel px-3 py-2.5 font-mono text-[12px] ring-1 ring-edge placeholder:text-fog/40 focus:outline-none focus:ring-ember/40"
            />
            <p className="mt-1.5 font-mono text-[10px] text-fog/40">Stored locally for now — placeholder.</p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog/60">Model</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {models.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] ring-1 ${
                    i === 0 ? "bg-ember/15 text-ember ring-ember/30" : "bg-panel text-fog ring-edge"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog/60">
              Vector store
            </span>
            <div className="mt-2 rounded-[10px] bg-panel px-3 py-2.5 font-mono text-[11px] text-fog ring-1 ring-edge">
              local · http://127.0.0.1:6333 · connected
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-[10px] bg-ember py-2.5 text-[13px] font-semibold text-ink ring-1 ring-ember"
        >
          Save configuration
        </button>
      </div>
    </div>
  );
}
