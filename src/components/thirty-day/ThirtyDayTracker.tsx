import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Circle, Flame, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ThirtyDayTracker: React.FC = () => {
  const { simulation, toggleThirtyDayMission } = useApp();
  const plan = simulation.thirtyDayPlan || [];
  const [selectedTheme, setSelectedTheme] = useState<string>('All');

  const completedCount = plan.filter(p => p.status === 'completed').length;
  const progressPct = Math.round((completedCount / 30) * 100);

  const handleToggle = (day: number) => {
    toggleThirtyDayMission(day);
    if (completedCount + 1 === 30) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const themes = ['All', 'Elimination', 'Foundation', 'Momentum', 'Identity'];
  const filteredPlan = selectedTheme === 'All' ? plan : plan.filter(p => p.theme === selectedTheme);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative font-mono">
      {/* BENTO HEADER DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bento Tile 1: Progress Streak */}
        <div className="bento-card p-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-accent-cyan uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-accent-cyan" /> OPTIONAL 30-DAY PRACTICE
            </div>
            <h2 className="font-display text-3xl font-bold text-white mt-1">
              {completedCount} / 30 DAYS
            </h2>
            <p className="text-xs text-text-muted mt-1">
              {progressPct}% of days marked complete
            </p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-accent-cyan/30 flex items-center justify-center font-bold text-accent-cyan text-sm shadow-glow-cyan">
            {progressPct}%
          </div>
        </div>

        {/* Bento Tile 2: Theme Selector */}
        <div className="bento-card p-6 space-y-2 col-span-1 md:col-span-2">
          <span className="text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> WEEKLY THEME FILTERS
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {themes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  selectedTheme === t
                    ? 'bg-accent-cyan text-white border-accent-cyan shadow-glow-cyan'
                    : 'bg-void text-text-muted border-border-subtle hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BENTO GRID MISSION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlan.map(item => {
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.day}
              onClick={() => handleToggle(item.day)}
              className={`bento-card p-6 cursor-pointer space-y-3 border transition-all ${
                isDone ? 'border-accent-green/50 bg-accent-green/10' : 'border-border-subtle hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-accent-amber" /> DAY {item.day} · {item.theme}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-accent-green" />
                ) : (
                  <Circle className="w-5 h-5 text-text-muted" />
                )}
              </div>

              <h3 className={`font-display text-sm font-bold ${isDone ? 'text-accent-green line-through' : 'text-white'}`}>
                {item.mission}
              </h3>

              <div className="p-3 rounded-xl bg-void border border-border-subtle text-[11px] space-y-1">
                <div className="text-accent-cyan">🎯 Skill: {item.skillTask}</div>
                <div className="text-text-muted">⏱️ Focus Challenge: {item.focusChallenge}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
