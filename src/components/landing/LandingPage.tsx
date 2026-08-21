import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ArrowRight, ShieldAlert, Zap, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { startOnboarding } = useApp();

  return (
    <div className="relative z-10 overflow-hidden max-w-7xl mx-auto px-4 py-8 space-y-8 font-mono">
      {/* BENTO HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bento Tile 1: Main Title & CTA (Col 1-7) */}
        <div className="bento-card lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-cyan font-mono text-xs tracking-widest uppercase mb-6 shadow-glow-blue">
              <Zap className="w-4 h-4 text-accent-cyan" /> BENTO SPATIAL ENGINE · v3.0
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4">
              MEET THE PERSON <br />
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                YOU'RE BECOMING.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-text-secondary font-body leading-relaxed max-w-xl">
              AI Time Machine transforms your current habits, choices, and goals into 5 parallel future simulations — so you can choose which one you actually want to live.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={startOnboarding}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan text-white text-xs sm:text-sm font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-glow-blue flex items-center justify-center gap-2 group"
              >
                ENTER TIME MACHINE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="text-[11px] text-text-muted flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-accent-amber" /> AI-generated scenarios are dynamic timeline simulations.
            </div>
          </div>
        </div>

        {/* Bento Tile 2: SVG Interactive Timeline Node Rail (Col 8-12) */}
        <div className="bento-card lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-text-muted border-b border-border-subtle pb-3">
            <span className="flex items-center gap-1.5 text-accent-cyan font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-ping" /> TIMELINE NODES
            </span>
            <span>2026 → 2031</span>
          </div>

          <div className="relative py-4">
            <svg viewBox="0 0 450 160" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>

              <circle cx="30" cy="80" r="8" fill="#f59e0b" />
              <text x="30" y="110" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="JetBrains Mono">2026</text>

              <path d="M 30 80 Q 200 20 410 30" fill="none" stroke="url(#grad-red)" strokeWidth="3" strokeDasharray="4 4" />
              <circle cx="410" cy="30" r="6" fill="#ef4444" />
              <text x="410" y="20" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="JetBrains Mono">💀 Unchanged</text>

              <path d="M 30 80 Q 220 80 410 80" fill="none" stroke="url(#grad-cyan)" strokeWidth="4" />
              <circle cx="410" cy="80" r="6" fill="#06b6d4" />
              <text x="410" y="72" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="JetBrains Mono">🚀 1% Better</text>

              <path d="M 30 80 Q 240 140 410 130" fill="none" stroke="url(#grad-gold)" strokeWidth="3" strokeDasharray="4 4" />
              <circle cx="410" cy="130" r="6" fill="#eab308" />
              <text x="410" y="150" textAnchor="middle" fill="#eab308" fontSize="10" fontFamily="JetBrains Mono">🎯 Goal Achieved</text>
            </svg>
          </div>

          <div className="p-3 rounded-2xl bg-void border border-border-subtle text-xs text-text-secondary font-body">
            "Your future isn't fixed. But your current daily habits are already writing it."
          </div>
        </div>
      </div>

      {/* BENTO STATS BAR ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-cyan mb-1">
            <AnimatedCounter value={84000} suffix="+" />
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">Futures Simulated</div>
        </div>

        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-violet mb-1">
            <AnimatedCounter value={127} />
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">Countries</div>
        </div>

        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-gold mb-1 flex items-center justify-center gap-1">
            4.8 <Star className="w-5 h-5 fill-accent-gold text-accent-gold" />
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">User Rating</div>
        </div>

        <div className="bento-card p-6 text-center flex flex-col justify-center">
          <div className="text-xs text-text-secondary italic mb-1">
            "Changed how I see my life"
          </div>
          <div className="text-[10px] text-text-muted uppercase">Verified Impact</div>
        </div>
      </div>

      {/* HOW IT WORKS BENTO GRID */}
      <div id="how-it-works" className="space-y-6 pt-6">
        <div className="text-center">
          <span className="text-xs text-accent-cyan uppercase tracking-widest">THE SIMULATION PROCESS</span>
          <h2 className="font-display text-3xl font-bold text-white mt-1">HOW IT WORKS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-blue">[01]</div>
            <h3 className="font-display text-lg font-bold text-white">Map Your Reality</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Input social media hours, daily learning, sleep, focus ratings, and career goals.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-violet">[02]</div>
            <h3 className="font-display text-lg font-bold text-white">AI Compounds Timeline</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Our neural engine calculates 5 parallel timeline trajectories in seconds.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-cyan">[03]</div>
            <h3 className="font-display text-lg font-bold text-white">Recalibrate & Shift</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Chat with your 2031 Future Self, run 30-day missions, and seal time capsules.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA BENTO CARD */}
      <div className="bento-card p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
          "Every day you wait is a day your current habits write the next chapter."
        </h2>
        <button
          onClick={startOnboarding}
          className="px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan text-white text-sm font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-glow-blue inline-flex items-center gap-3"
        >
          ENTER THE TIME MACHINE <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
