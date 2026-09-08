import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ActivityPanel } from "@/components/orchestrator/ActivityPanel";
import { ChatPanel } from "@/components/orchestrator/ChatPanel";
import { MemoryPanel } from "@/components/orchestrator/MemoryPanel";
import { SettingsModal } from "@/components/orchestrator/SettingsModal";
import { TopBar } from "@/components/orchestrator/TopBar";
import { useOrchestrator } from "@/lib/orchestrator/use-orchestrator";
import { useTheme } from "@/lib/orchestrator/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BalSaccie — Personal AI Orchestrator" },
      {
        name: "description",
        content:
          "BalSaccie is a personal AI orchestrator console: memory sources, a live chat with cited retrieval, and a transparent tool-execution log.",
      },
      { property: "og:title", content: "BalSaccie — Personal AI Orchestrator" },
      {
        property: "og:description",
        content:
          "A control center for a Claude-based orchestrator: RAG memory sources, cited answers, and a live activity feed of every tool call.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { sources, toggleSource, messages, activity, busy, send, pushActivity } = useOrchestrator();
  const { theme, toggle } = useTheme();
  const [voiceMode, setVoiceMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <h1 className="sr-only">BalSaccie — personal AI orchestrator</h1>
      <TopBar
        voiceMode={voiceMode}
        onVoiceModeChange={setVoiceMode}
        theme={theme}
        onToggleTheme={toggle}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="flex min-h-0 flex-1">
        <MemoryPanel
          sources={sources}
          onToggle={toggleSource}
          onAddSource={() => pushActivity("AD", "Add source · connector picker pending", "pending")}
        />
        <ChatPanel
          messages={messages}
          busy={busy}
          voiceMode={voiceMode}
          scopeCount={sources.filter((s) => s.enabled).length}
          onSend={send}
        />
        <ActivityPanel entries={activity} />
      </main>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
