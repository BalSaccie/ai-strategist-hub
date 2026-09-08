import type { ActivityEntry, ChatMessage, MemorySource } from "./types";

export const initialSources: MemorySource[] = [
  { id: "s1", name: "Obsidian Vault", type: "vault", itemCount: 1284, lastSynced: "2m ago", enabled: true },
  { id: "s2", name: "Projects/2026", type: "folder", itemCount: 342, lastSynced: "18m ago", enabled: true },
  { id: "s3", name: "Gmail Archive", type: "email", itemCount: 9105, lastSynced: "1h ago", enabled: false },
  { id: "s4", name: "GitHub · repos", type: "code", itemCount: 58, lastSynced: "34m ago", enabled: true },
  { id: "s5", name: "Dropbox · Media", type: "cloud", itemCount: 1020, lastSynced: "3h ago", enabled: true },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Draft the Q3 strategy memo using the vault and my 2026 project notes. Keep it to three priorities.",
    time: "14:02",
  },
  {
    id: "m2",
    role: "assistant",
    time: "14:02",
    model: "claude-orchestrator",
    content:
      "Three priorities for Q3, grounded in the vault and your 2026 notes:\n01 Consolidate the two overlapping pipeline tools into a single orchestrator surface.\n02 Ship the RAG memory layer against the Obsidian Vault before onboarding Google data.\n03 Stand up tool-execution guardrails so every action is logged and reversible.",
    sources: [
      { id: "u1", label: "~/notes/strategy.md", primary: true },
      { id: "u2", label: "Obsidian · Q2 retro" },
      { id: "u3", label: "Projects/2026 · roadmap" },
    ],
  },
  {
    id: "m3",
    role: "user",
    content: "Good. Now run the deploy dry-run and report any failing checks.",
    time: "14:05",
  },
  {
    id: "m4",
    role: "assistant",
    time: "14:05",
    model: "executing",
    content:
      "Running deploy.sh --dry-run now. Waiting on the type-check and integration suites to complete.",
    sources: [{ id: "u4", label: "deploy.sh", primary: true }],
  },
];

export const initialActivity: ActivityEntry[] = [
  { id: "a1", code: "EM", description: "Embedding query in vector DB", status: "pending", time: "14:05:41" },
  { id: "a2", code: "RD", description: "Reading ~/notes/strategy.md", status: "done", time: "14:05:38" },
  { id: "a3", code: "EX", description: "Running deploy.sh --dry-run", status: "pending", time: "14:05:30" },
  { id: "a4", code: "SE", description: "Searching Obsidian Vault · 3 hits", status: "done", time: "14:04:52" },
  { id: "a5", code: "TS", description: "Type-check failed · 2 errors", status: "error", time: "14:04:19" },
  { id: "a6", code: "WR", description: "Wrote memo_draft.md", status: "done", time: "14:03:47" },
  { id: "a7", code: "RD", description: "Reading Projects/2026/roadmap", status: "done", time: "14:03:11" },
  { id: "a8", code: "SY", description: "Synced Gmail Archive · 9,105", status: "done", time: "13:58:02" },
  { id: "a9", code: "IX", description: "Indexed 58 repos", status: "done", time: "13:51:20" },
  { id: "a10", code: "SY", description: "Synced Dropbox · Media", status: "done", time: "13:44:55" },
  { id: "a11", code: "EM", description: "Rebuilt vault embeddings", status: "done", time: "13:30:02" },
  { id: "a12", code: "AU", description: "Rotated API credentials", status: "done", time: "12:58:41" },
  { id: "a13", code: "EX", description: "Ran nightly digest job", status: "done", time: "08:00:00" },
  { id: "a14", code: "SY", description: "Cold start · sources mounted", status: "done", time: "07:59:12" },
];

/** Mocked agent reply — swap this for a real Claude call later. */
export function mockReply(prompt: string) {
  return {
    text:
      `Understood — I'll treat that as an intent, not a question.\n01 Retrieving the highest-signal chunks for "${prompt.slice(0, 48)}".\n02 Cross-checking against your enabled sources before I act.\n03 I'll log every tool call in the activity feed so nothing happens off-book.`,
    sources: [
      { id: `u-${Date.now()}-1`, label: "~/notes/strategy.md", primary: true },
      { id: `u-${Date.now()}-2`, label: "Projects/2026 · roadmap" },
    ],
  };
}
