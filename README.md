# AI Strategist Hub

Build a web app called "[BalSaccie]" — a personal AI orchestrator interface. This is not a generic chatbot; it's a control center where I act as strategist/orchestrator and the AI is the executing layer. The design should feel personal, creative, and premium — not like a default SaaS dashboard.

Core layout

Three-panel layout:

Left sidebar — Memory & Data Sources

List of connected data sources/folders (name, type icon, last-synced timestamp, item count)

Toggle to enable/disable a source from being used in retrieval

"Add source" button (placeholder action for now)

Center — Chat

Main conversation view, text bubbles, clean typography

Input bar at bottom with: text field, microphone icon (voice input toggle), send button

Support for streaming text responses (typing effect)

Each AI message can show an expandable "sources used" footer (which memory items informed this answer)

Right sidebar — Activity Log / Tool Execution

Live feed of actions the agent is taking or has taken (e.g. "Reading file X", "Running script Y", "Query embedded in vector DB")

Each entry: timestamp, action type (icon), short description, status (pending/done/error)

Collapsible, defaults to showing last 10 entries

Top bar

App name/logo on the left

Voice mode toggle (switch between text-first and voice-first interaction)

Settings icon (opens a modal for API key management, model selection, data source config — placeholders are fine)

Visual style

Dark mode by default, with a light mode toggle

Personal, creative aesthetic — avoid generic blue/purple SaaS gradients. Use a distinctive accent color (pick something that isn't the default indigo/violet everyone uses)

Subtle motion: message fade-ins, activity log entries sliding in

Typography should feel intentional — a distinct font pairing, not system defaults

Functional notes (for scaffolding, backend can be mocked for now)

Chat should support both typed and voice input (use browser speech-to-text API as placeholder)

Activity log entries should be mockable via a simple state array so I can wire in real agent events later

Memory sidebar items should be structured as { name, type, itemCount, lastSynced, enabled }

Keep components modular — I'll be connecting this to a Claude API backend and a local vector DB, so the frontend should cleanly separate UI state from data-fetching logic

What this app is for (context, not UI)

This is the frontend for a personal AI system: a Claude-based orchestrator with a RAG memory layer built from my own files, and tool-execution access (via Claude Code / Agent SDK) to actually perform tasks. The UI needs to make the "thinking" (memory retrieval) and "doing" (tool execution) visible and transparent, not hidden behind a plain chatbot.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/190483be-ba9e-4f49-8ef7-c379671e72ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
