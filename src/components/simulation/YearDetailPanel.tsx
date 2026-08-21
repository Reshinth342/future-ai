import React from 'react';
import type { YearSnapshot, ScenarioKey } from '../../types/simulation';
import { GlassCard } from '../ui/GlassCard';
import { ScoreGauge } from '../ui/ScoreGauge';
import { Briefcase, Compass, DollarSign, Award, ShieldAlert } from 'lucide-react';

interface YearDetailPanelProps {
  yearSnapshot: YearSnapshot;
  scenarioKey: ScenarioKey;
  scenarioTitle: string;
  scenarioColor: string;
}

export const YearDetailPanel: React.FC<YearDetailPanelProps> = ({
  yearSnapshot,
  scenarioTitle,
  scenarioColor
}) => {
  const { year, career, skills, habits, opportunities, score, incomeScenario } = yearSnapshot;

  return (
    <div className="space-y-6">
      {/* Header bar for Year Detail */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="font-mono text-xs text-text-muted uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scenarioColor }} />
            YEAR {year} DETAIL PANEL
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            {year} · <span style={{ color: scenarioColor }}>{scenarioTitle}</span>
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <ScoreGauge score={score} size="md" color={scenarioColor} />
        </div>
      </div>

      {/* Grid of detail metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Career & Narrative */}
        <GlassCard className="space-y-3">
          <div className="font-mono text-xs text-accent-cyan font-semibold uppercase flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent-cyan" /> CAREER STATUS
          </div>
          <p className="text-sm font-body text-text-primary leading-relaxed">
            "{career}"
          </p>
          {incomeScenario && (
            <div className="pt-2 border-t border-border-subtle flex items-center justify-between font-mono text-xs">
              <span className="text-text-muted flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-accent-gold" /> Income Scenario:
              </span>
              <span className="text-accent-gold font-bold">{incomeScenario}</span>
            </div>
          )}
        </GlassCard>

        {/* Opportunities & Breakthroughs */}
        <GlassCard className="space-y-3">
          <div className="font-mono text-xs text-accent-violet font-semibold uppercase flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent-violet" /> OPPORTUNITIES & REACH
          </div>
          <p className="text-sm font-body text-text-primary leading-relaxed">
            "{opportunities}"
          </p>
          <div className="pt-2 border-t border-border-subtle font-mono text-xs text-text-muted flex items-center justify-between">
            <span>Habit Shift:</span>
            <span className="text-white font-semibold">{habits}</span>
          </div>
        </GlassCard>
      </div>

      {/* Skills Radar / Progress Bars */}
      <GlassCard className="space-y-4">
        <div className="font-mono text-xs text-accent-gold font-semibold uppercase flex items-center gap-2">
          <Award className="w-4 h-4 text-accent-gold" /> SKILLS VELOCITY IN {year}
        </div>

        <div className="space-y-3 font-mono">
          {skills.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-text-primary">{s.name}</span>
                <span className="text-text-muted">
                  {s.level}% · <strong className="text-accent-cyan">{s.status}</strong>
                </span>
              </div>
              <div className="w-full h-2 bg-void rounded-full overflow-hidden border border-border-subtle">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${s.level}%`,
                    backgroundColor: scenarioColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Disclaimer */}
      <div className="text-[11px] font-mono text-text-muted text-center flex items-center justify-center gap-1">
        <ShieldAlert className="w-3.5 h-3.5 text-accent-amber" />
        AI-generated scenario indicators — not scientific measurements or guaranteed outcomes.
      </div>
    </div>
  );
};
