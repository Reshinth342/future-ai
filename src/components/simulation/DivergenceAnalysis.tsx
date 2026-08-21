import React from 'react';
import type { DivergenceWindowData } from '../../types/simulation';
import { GlassCard } from '../ui/GlassCard';
import { Zap, CheckSquare, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DivergenceAnalysisProps {
  data: DivergenceWindowData;
}

export const DivergenceAnalysis: React.FC<DivergenceAnalysisProps> = ({ data }) => {
  const { setActiveView } = useApp();

  return (
    <GlassCard glowColor="cyan" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent-cyan" /> HIGHEST LEVERAGE MOMENT IDENTIFIED
          </span>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            ◈ YOUR CRITICAL DIVERGENCE POINT
          </h3>
        </div>

        <div className="px-4 py-2 rounded-xl bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan font-mono text-xs font-bold flex items-center gap-2">
          <Calendar className="w-4 h-4" /> ⚡ WINDOW: {data.period}
        </div>
      </div>

      <p className="text-sm font-body text-text-secondary leading-relaxed">
        "The next 90 days represent your highest-leverage window. Your decisions, habit consistency, and focus in this period will disproportionately dictate which of the 5 future timelines becomes your actual reality. After this window, the trajectory paths separate significantly."
      </p>

      {/* High impact checklist */}
      <div className="space-y-3 font-mono text-xs">
        <div className="text-text-muted uppercase tracking-wider font-bold">HIGH-IMPACT ACTIONS FOR THIS WINDOW:</div>
        <div className="space-y-2">
          {data.actions.map((act, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-void border border-border-subtle flex items-start gap-2.5 text-text-primary">
              <CheckSquare className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={() => setActiveView('thirty-day')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-xs font-mono font-bold tracking-wider shadow-glow-cyan flex items-center gap-2 hover:scale-105 transition-all"
        >
          START 90-DAY SPRINT <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
};
