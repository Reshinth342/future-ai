# Future / In Progress

A personal planning workspace for looking at your current routines, exploring a few what-if prompts, and choosing a manageable next step.

This app does **not** predict careers, income, health, relationships, or other personal outcomes. Its built-in scenarios are written reflection prompts based on the details you enter. Any simple indices are heuristics, not validated assessments.

## What You Can Do

- Add a personal goal and a few estimates about your routine.
- Compare five illustrative what-if prompts across a fixed 2026–2031 review window.
- Turn an idea into an optional, editable 30-day practice plan.
- Keep weekly notes, a journal, and a letter to revisit later.
- Export or share a planning card when you choose.

## Privacy Notes

- Profile details, plans, and notes are stored in your browser's local storage; they are not synced between devices.
- The optional Anthropic API key is also stored in local storage and sent directly from your browser when you request an AI response.
- Do not enter sensitive information or use a private API key on a public/shared device. A public deployment should use a server-side API proxy.
- Letters do not send automatically. Visit the app again to read the note on your chosen date.

## Run Locally

```bash
git clone https://github.com/Reshinth342/future-ai.git
cd future-ai
npm install
npm run dev
```

Open `http://localhost:5173/`.

The local planning prompts work without an API key. To try optional Anthropic responses, enter your key in the app settings for that browser session.

## Build

```bash
npm run build
```

## Stack

React, TypeScript, Vite, Tailwind CSS, Lucide icons, and browser local storage. Optional Anthropic API requests run from the browser; see the privacy notes before enabling them on a public deployment.
