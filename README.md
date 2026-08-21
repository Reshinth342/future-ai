# ⚡ AI Time Machine 3.0 — Interactive Future Simulation Engine

> *"Your future isn't fixed. But your current habits are already writing it — one day at a time."*

[![React 19](https://img.shields.io/badge/React-19.2-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.2-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS v3](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Anthropic Claude](https://img.shields.io/badge/AI-Claude%203.5%20Sonnet-D97706.svg?style=flat-square)](https://www.anthropic.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**AI Time Machine 3.0** is an interactive, cinematic web application that transforms a user's current daily habits, screen time, focus ratings, and career goals into **5 parallel interactive future timeline simulations** spanning 2026 to 2031.

---

## 🔮 Core Features

- 🍱 **Bento Grid Dashboard Architecture**: Integrated spatial bento grid layouts across all 6 core views (*Timeline Command Center*, *Future Self AI Chat*, *30-Day Shift*, *Daily Log*, *Letter Vault*, *Main Dashboard*).
- 🥽 **Apple Vision Pro Spatial Glass (VisionOS)**: Frosted glass depth panels, spatial pill navigation bar, top inner edge reflection borders, and ambient glowing badges.
- 🌌 **5 Parallel 5-Year Futures**:
  - 💀 **The Unchanged Timeline**: What happens if current habits and distractions continue without intervention (*High Regret Path*).
  - 📍 **Current Reality Baseline**: An honest projection of your current lifestyle over 5 years.
  - 🚀 **The 1% Better Timeline**: What steady 1% weekly compound improvements look like over 5 years (*Recommended Path*).
  - 🎯 **Goal Achieved Timeline**: Precision trajectory engineered specifically around landing your target career role and salary.
  - 🌙 **The Dream Scenario**: Outlier path unlocked by taking bold risks, building in public, and achieving peak performance.
- 💬 **Future Self AI Chat**: Atmospheric 2031 persona chat powered live by Claude (`claude-3-5-sonnet-20241022`) or dynamic local fallback.
- 🔥 **Habit Roast Generator**: Brutally honest AI analysis exposing digital dependency, time waste, and opportunity cost.
- 📅 **30-Day Reality Shift Tracker**: Interactive 4-week mission sprint (*Elimination*, *Foundation*, *Momentum*, *Identity*) with progress streak confetti.
- ✉️ **Letter to Future Self**: Time capsule vault for sealing letters to your future self.
- 📊 **Shareable Viral Card**: Downloadable custom graphics for LinkedIn & Twitter sharing.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v3 + Custom Spatial Glass CSS tokens
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API Sound Synthesizer (Ambient clicks & success chimes)
- **AI Engine**: Anthropic Claude API (`claude-3-5-sonnet-20241022`) + Local fallback generator
- **State & Storage**: React Context API + LocalStorage Manager
- **Exporting**: `html2canvas` & `canvas-confetti`

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Reshinth342/future-ai.git
cd future-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-your-actual-api-key
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📦 Production Build

```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Production Deployment

### Deploying to Vercel (1-Click Setup)
1. Import `Reshinth342/future-ai` at [vercel.com/new](https://vercel.com/new).
2. Under **Environment Variables**, add `VITE_ANTHROPIC_API_KEY` (optional).
3. Click **Deploy**.

### Linking Custom Domain (`future.jo3.org`)
1. In Vercel Project Settings → **Domains**, add `future.jo3.org`.
2. In your DNS manager (e.g. DNSExit.com), set a CNAME record:
   - **Host**: `future`
   - **Target**: `cname.vercel-dns.com`

---

## 📜 License

MIT License © 2026 [Reshinth342](https://github.com/Reshinth342)
