import { SOURCE_CODE, type MemorySource } from "@/lib/orchestrator/types";

interface MemoryPanelProps {
  sources: MemorySource[];
  onToggle: (id: string) => void;
  onAddSource: () => void;
}

export function MemoryPanel({ sources, onToggle, onAddSource }: MemoryPanelProps) {
  const enabled = sources.filter((s) => s.enabled).length;

  return (
    <aside className="flex w-[280px] min-h-0 shrink-0 flex-col border-r border-edge/70 bg-panel/30">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">Memory sources</span>
        <span className="font-mono text-[10px] text-ember">
          {String(enabled).padStart(2, "0")} / {String(sources.length).padStart(2, "0")}
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`flex gap-3 rounded-[10px] bg-panel2 p-3 ring-1 ring-edge/80 ${source.enabled ? "" : "opacity-70"}`}
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold ${
                source.enabled ? "bg-ember/10 text-ember" : "bg-panel text-fog/50"
              }`}
            >
              {SOURCE_CODE[source.type]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-medium">{source.name}</span>
                <span className="ml-auto font-mono text-[10px] text-fog/60">
                  {source.itemCount.toLocaleString()}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-fog/50">synced {source.lastSynced}</div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={source.enabled}
              aria-label={`Use ${source.name} in retrieval`}
              onClick={() => onToggle(source.id)}
              className={`relative h-4 w-7 shrink-0 self-center rounded-full ring-1 transition-colors ${
                source.enabled ? "bg-ember/30 ring-ember/50" : "bg-edge ring-edge"
              }`}
            >
              <span
                className={`absolute top-0.5 size-2.5 rounded-full transition-all ${
                  source.enabled ? "right-0.5 bg-ember" : "left-0.5 bg-fog/60"
                }`}
              />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddSource}
          className="mt-1 w-full rounded-[10px] border border-dashed border-edge py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fog/70 transition-colors hover:border-ember/40 hover:text-bright"
        >
          + Add source
        </button>
      </div>
    </aside>
  );
}
