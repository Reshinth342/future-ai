import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldAlert, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { startOnboarding } = useApp();

  return (
    <div className="relative z-10 overflow-hidden max-w-7xl mx-auto px-4 py-8 space-y-12 font-body">
      {/* BENTO HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bento Tile 1: Main Title & CTA (Col 1-7) */}
        <div className="bento-card lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan text-xs font-bold uppercase mb-6">
              <Zap className="w-4 h-4" /> A PERSONAL PLANNING STUDIO
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold text-text-primary leading-[1.02] mb-5">
              Your future isn't <br />
              <span className="text-accent-cyan">
                a forecast.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-text-secondary font-body leading-relaxed max-w-xl">
              Take a clear look at the routines you have now. Explore a few ways they could change, then choose one small thing to try. No prophecy, no pressure.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={startOnboarding}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent-blue text-white text-sm font-display font-bold hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group"
              >
                Make a starting point <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="text-xs text-text-muted flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-accent-amber" /> Your entries stay in this browser unless you choose the optional AI service.
            </div>
          </div>
        </div>

        {/* Bento Tile 2: SVG Interactive Timeline Node Rail (Col 8-12) */}
        <div className="bento-card lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-text-muted border-b border-border-subtle pb-3">
            <span className="flex items-center gap-1.5 text-accent-cyan font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" /> A few possible directions
            </span>
            <span>2026 → 2031</span>
          </div>

          <div className="relative py-4">
            <svg viewBox="0 0 450 160" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#99700e" />
                  <stop offset="100%" stopColor="#b8424c" />
                </linearGradient>
                <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#99700e" />
                  <stop offset="100%" stopColor="#147e78" />
                </linearGradient>
                <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#99700e" />
                  <stop offset="100%" stopColor="#315bc5" />
                </linearGradient>
              </defs>

              <circle cx="30" cy="80" r="8" fill="#99700e" />
              <text x="30" y="110" textAnchor="middle" fill="#565e56" fontSize="10" fontFamily="Inter">NOW</text>

              <path d="M 30 80 Q 200 20 410 30" fill="none" stroke="url(#grad-red)" strokeWidth="3" strokeDasharray="4 4" />
              <circle cx="410" cy="30" r="6" fill="#b8424c" />
              <text x="410" y="20" textAnchor="middle" fill="#8e303a" fontSize="10" fontFamily="Inter">SAME ROUTINE</text>

              <path d="M 30 80 Q 220 80 410 80" fill="none" stroke="url(#grad-cyan)" strokeWidth="4" />
              <circle cx="410" cy="80" r="6" fill="#147e78" />
              <text x="410" y="72" textAnchor="middle" fill="#12635e" fontSize="10" fontFamily="Inter">SMALL SHIFT</text>

              <path d="M 30 80 Q 240 140 410 130" fill="none" stroke="url(#grad-gold)" strokeWidth="3" strokeDasharray="4 4" />
              <circle cx="410" cy="130" r="6" fill="#315bc5" />
              <text x="410" y="150" textAnchor="middle" fill="#315bc5" fontSize="10" fontFamily="Inter">YOUR OWN GOAL</text>
            </svg>
          </div>

          <div className="p-3 rounded-xl bg-void border border-border-subtle text-xs text-text-secondary font-body">
            These lines are prompts for reflection, not predictions about what will happen.
          </div>
        </div>
      </div>

      {/* BENTO PRODUCT CAPABILITIES ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-cyan mb-1">
            5
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">Illustrative paths</div>
        </div>

        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-violet mb-1">
            6
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">Years to explore</div>
        </div>

        <div className="bento-card p-6 text-center">
          <div className="text-3xl font-bold text-accent-gold mb-1 flex items-center justify-center gap-1">
            30 <span className="text-xl">DAYS</span>
          </div>
          <div className="text-[11px] text-text-muted uppercase tracking-wider">Optional practice plan</div>
        </div>

        <div className="bento-card p-6 text-center flex flex-col justify-center">
          <div className="text-xs text-text-secondary mb-1">Works without an API key</div>
          <div className="text-[10px] text-text-muted uppercase">AI is optional</div>
        </div>
      </div>

      {/* HOW IT WORKS BENTO GRID */}
      <div id="how-it-works" className="space-y-6 pt-6">
        <div className="text-center">
          <span className="text-xs text-accent-cyan uppercase tracking-widest">A SIMPLE PLACE TO START</span>
          <h2 className="font-display text-3xl font-bold text-text-primary mt-1">Make sense of your next step.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-blue">[01]</div>
            <h3 className="font-display text-lg font-bold text-text-primary">Start with today</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Add a few details about your routine and a goal you care about. Every answer is editable.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-violet">[02]</div>
            <h3 className="font-display text-lg font-bold text-text-primary">Compare possibilities</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Review five written what-if prompts shaped by your inputs. They are not outcome predictions.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3">
            <div className="text-2xl font-bold text-accent-cyan">[03]</div>
            <h3 className="font-display text-lg font-bold text-text-primary">Choose one small action</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Turn an idea into a flexible 30-day practice plan, keep a private journal, or write a note for later.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA BENTO CARD */}
      <div className="bento-card p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary max-w-3xl mx-auto">
          No big life overhaul. Just a useful place to begin.
        </h2>
        <button
          onClick={startOnboarding}
          className="px-10 py-5 rounded-xl bg-accent-blue text-white text-sm font-display font-bold hover:translate-y-[-2px] transition-all inline-flex items-center gap-3"
        >
          Make a starting point <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
