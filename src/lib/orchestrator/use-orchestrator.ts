import { useCallback, useEffect, useRef, useState } from "react";

import { initialActivity, initialMessages, initialSources, mockReply } from "./mock-data";
import type { ActivityEntry, ActivityStatus, ChatMessage, MemorySource } from "./types";

const clock = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const stamp = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

/**
 * All app state lives here so the UI stays presentational.
 * Replace the mocked send/stream with a Claude API call and the activity
 * array with real agent events.
 */
export function useOrchestrator() {
  const [sources, setSources] = useState<MemorySource[]>(initialSources);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [activity, setActivity] = useState<ActivityEntry[]>(initialActivity);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const toggleSource = useCallback((id: string) => {
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  }, []);

  const pushActivity = useCallback((code: string, description: string, status: ActivityStatus = "pending") => {
    const id = `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setActivity((prev) => [{ id, code, description, status, time: stamp() }, ...prev]);
    return id;
  }, []);

  const settleActivity = useCallback((id: string, status: ActivityStatus) => {
    setActivity((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }, []);

  const send = useCallback(
    (text: string) => {
      const prompt = text.trim();
      if (!prompt || busy) return;
      setBusy(true);
      setMessages((prev) => [
        ...prev,
        { id: `m-${Date.now()}`, role: "user", content: prompt, time: clock() },
      ]);

      const embedId = pushActivity("EM", "Embedding query in vector DB");
      later(() => settleActivity(embedId, "done"), 700);
      later(() => {
        const readId = pushActivity("SE", `Searching ${sources.filter((s) => s.enabled).length} enabled sources`);
        later(() => settleActivity(readId, "done"), 900);
      }, 500);

      const replyId = `m-${Date.now()}-ai`;
      const { text: full, sources: used } = mockReply(prompt);

      later(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: replyId,
            role: "assistant",
            content: "",
            time: clock(),
            streaming: true,
            model: "claude-orchestrator",
          },
        ]);

        const step = 3;
        for (let i = step; i <= full.length; i += step) {
          const slice = full.slice(0, i);
          later(
            () =>
              setMessages((prev) =>
                prev.map((m) => (m.id === replyId ? { ...m, content: slice } : m)),
              ),
            (i / step) * 16,
          );
        }
        later(
          () => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === replyId ? { ...m, content: full, streaming: false, sources: used } : m,
              ),
            );
            pushActivity("WR", "Composed response · 2 citations", "done");
            setBusy(false);
          },
          (full.length / step) * 16 + 120,
        );
      }, 650);
    },
    [busy, pushActivity, settleActivity, sources],
  );

  return { sources, toggleSource, messages, activity, busy, send, pushActivity };
}
