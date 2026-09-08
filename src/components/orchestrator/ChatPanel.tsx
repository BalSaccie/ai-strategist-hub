import { useEffect, useRef, useState } from "react";

import { useSpeechInput } from "@/lib/orchestrator/use-speech-input";
import type { ChatMessage } from "@/lib/orchestrator/types";

function MessageBody({ content, streaming }: { content: string; streaming?: boolean }) {
  const lines = content.split("\n").filter(Boolean);
  const lead = lines.filter((l) => !/^\d{2}\s/.test(l));
  const steps = lines.filter((l) => /^\d{2}\s/.test(l));

  return (
    <>
      {lead.map((line, i) => (
        <p key={i} className={i > 0 ? "mt-2" : undefined}>
          {line}
        </p>
      ))}
      {steps.length > 0 && (
        <ul className="mt-2.5 space-y-1.5">
          {steps.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-px font-mono text-[12px] text-ember/80">{line.slice(0, 2)}</span>
              <span>{line.slice(3)}</span>
            </li>
          ))}
        </ul>
      )}
      {streaming && <span className="caret" />}
    </>
  );
}

function SourcesFooter({ sources }: { sources: NonNullable<ChatMessage["sources"]> }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog/50 transition-colors hover:text-bright"
        aria-expanded={open}
      >
        sources used {open ? "▾" : "▸"} {!open && `· ${sources.length}`}
      </button>
      {open &&
        sources.map((s) => (
          <span
            key={s.id}
            className={`rounded-md px-2 py-1 font-mono text-[11px] ring-1 ${
              s.primary ? "bg-ember/10 text-emberhi ring-ember/25" : "bg-panel2 text-fog ring-edge"
            }`}
          >
            {s.label}
          </span>
        ))}
    </div>
  );
}

interface ChatPanelProps {
  messages: ChatMessage[];
  busy: boolean;
  voiceMode: boolean;
  scopeCount: number;
  onSend: (text: string) => void;
}

export function ChatPanel({ messages, busy, voiceMode, scopeCount, onSend }: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { listening, supported, toggle } = useSpeechInput((text) =>
    setDraft((d) => (d ? `${d} ${text}` : text)),
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [busy]);

  const submit = () => {
    if (!draft.trim() || busy) return;
    onSend(draft);
    setDraft("");
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="rise flex justify-end">
              <div className="max-w-[78%]">
                <div className="rounded-2xl rounded-tr-md bg-ember/12 px-4 py-3 text-[14px] leading-relaxed ring-1 ring-ember/25">
                  {m.content}
                </div>
                <div className="mt-1 text-right font-mono text-[10px] text-fog/50">{m.time}</div>
              </div>
            </div>
          ) : (
            <div key={m.id} className="rise flex gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-panel2 font-mono text-[11px] font-semibold text-ember ring-1 ring-ember/40">
                AI
              </span>
              <div className="max-w-[82%]">
                <div className="rounded-2xl rounded-tl-md bg-panel2 px-4 py-3.5 text-[14px] leading-relaxed text-bright/90 ring-1 ring-edge/80">
                  <MessageBody content={m.content} streaming={m.streaming} />
                </div>
                {m.sources && m.sources.length > 0 && <SourcesFooter sources={m.sources} />}
                <div className="mt-1 font-mono text-[10px] text-fog/50">
                  {m.time}
                  {m.model ? ` · ${m.model}` : ""}
                </div>
              </div>
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>

      <div className="shrink-0 px-6 pt-3 pb-5">
        <div className="flex items-end gap-2 rounded-[14px] bg-panel2 p-2 ring-1 ring-edge/80 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--bright)_5%,transparent)]">
          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            className="flex-1 resize-none bg-transparent px-3 py-2 text-[14px] leading-relaxed placeholder:text-fog/40 focus:outline-none"
            placeholder={listening ? "Listening…" : "Set intent — the agent executes…"}
          />
          <button
            type="button"
            onClick={toggle}
            disabled={!supported}
            aria-label={listening ? "Stop voice input" : "Start voice input"}
            className={`grid size-9 shrink-0 place-items-center rounded-md transition-colors disabled:opacity-40 ${
              listening ? "text-ember" : "text-fog/70 hover:text-bright"
            }`}
          >
            <span className="flex flex-col items-center gap-1">
              <span className="h-3 w-1.5 rounded-full bg-current" />
              <span className="h-4 w-1.5 rounded-full bg-current" />
              <span className="h-2.5 w-1.5 rounded-full bg-current" />
            </span>
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={busy || !draft.trim()}
            aria-label="Send"
            className="grid size-9 shrink-0 place-items-center rounded-md bg-ember font-semibold text-ink ring-1 ring-ember shadow-[0_0_16px_-4px_color-mix(in_oklab,var(--ember)_80%,transparent)] disabled:opacity-45"
          >
            <span className="relative block size-3.5">
              <span
                className="absolute inset-y-0 left-0 w-1.5 bg-current"
                style={{ clipPath: "polygon(0 0,100% 50%,0 100%)" }}
              />
            </span>
          </button>
        </div>
        <div className="mt-2 font-mono text-[10px] text-fog/40">
          Enter to send · {voiceMode ? "voice-first mode" : "text-first mode"}
          {supported ? " · voice input armed" : " · voice input unavailable"} · {scopeCount} sources in
          retrieval scope
        </div>
      </div>
    </section>
  );
}
