import { useState } from "react";

import type { ActivityEntry, ActivityStatus } from "@/lib/orchestrator/types";

const statusRing: Record<ActivityStatus, string> = {
  pending: "bg-ember/15 text-ember ring-ember/30",
  done: "bg-done/10 text-done ring-done/30",
  error: "bg-error/10 text-error ring-error/30",
};

const iconRing: Record<ActivityStatus, string> = {
  pending: "ring-ember/40 text-ember",
  done: "ring-edge text-fog",
  error: "ring-error/40 text-error",
};

export function ActivityPanel({ entries }: { entries: ActivityEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? entries : entries.slice(0, 10);

  return (
    <aside className="flex w-[320px] min-h-0 shrink-0 flex-col border-l border-edge/70 bg-panel/30">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">Activity</span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-mono text-[10px] text-fog/50 transition-colors hover:text-bright"
        >
          {expanded ? "collapse" : `showing ${shown.length} / ${entries.length}`}
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <div className="relative">
          <div className="absolute top-2 bottom-2 left-[19px] w-px bg-edge/70" />
          {shown.map((entry, i) => (
            <div
              key={entry.id}
              className="entry relative py-2 pl-9"
              style={{ animationDelay: `${Math.min(i, 9) * 0.07}s` }}
            >
              <span
                className={`absolute top-2.5 left-2 grid size-6 place-items-center rounded-md bg-panel2 font-mono text-[10px] ring-1 ${iconRing[entry.status]}`}
              >
                {entry.code}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-bright/90">{entry.description}</span>
                <span
                  className={`ml-auto shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] ring-1 ${statusRing[entry.status]}`}
                >
                  {entry.status}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-fog/50">{entry.time}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
