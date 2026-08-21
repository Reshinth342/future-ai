import React, { useState } from 'react';
import type { SimulationResult, ScenarioKey } from '../../types/simulation';
import { GlassCard } from '../ui/GlassCard';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

interface PathComparisonProps {
  simulation: SimulationResult;
}

export const PathComparison: React.FC<PathComparisonProps> = ({ simulation }) => {
  const [scenarioA, setScenarioA] = useState<ScenarioKey>('unchanged');
  const [scenarioB, setScenarioB] = useState<ScenarioKey>('onePercent');

  const pathA = simulation.scenarios[scenarioA];
  const pathB = simulation.scenarios[scenarioB];

  const yearA2031 = pathA.years['2031'];
  const yearB2031 = pathB.years['2031'];

  const lostHours = simulation.habitImpact.hoursLostFiveYears;

  return (
    <GlassCard className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" /> PATH COMPARISON · SPLIT VIEW
          </span>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            TWO TIMELINES. ONE YOU.
          </h3>
        </div>

        {/* Scenario Selectors */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <select
            value={scenarioA}
            onChange={e => setScenarioA(e.target.value as ScenarioKey)}
            className="bg-void border border-accent-red/40 rounded-xl px-3 py-2 text-accent-red font-bold focus:outline-none"
          >
            <option value="unchanged">💀 UNCHANGED</option>
            <option value="reality">📍 REALITY</option>
            <option value="onePercent">🚀 1% BETTER</option>
            <option value="goalAchieved">🎯 GOAL</option>
            <option value="dream">🌙 DREAM</option>
          </select>

          <span className="text-text-muted font-bold">VS</span>

          <select
            value={scenarioB}
            onChange={e => setScenarioB(e.target.value as ScenarioKey)}
            className="bg-void border border-accent-cyan/40 rounded-xl px-3 py-2 text-accent-cyan font-bold focus:outline-none"
          >
            <option value="onePercent">🚀 1% BETTER</option>
            <option value="goalAchieved">🎯 GOAL</option>
            <option value="dream">🌙 DREAM</option>
            <option value="reality">📍 REALITY</option>
            <option value="unchanged">💀 UNCHANGED</option>
          </select>
        </div>
      </div>

      {/* Comparative Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted">
              <th className="py-3 px-4 uppercase">METRIC / HORIZON</th>
              <th className="py-3 px-4 uppercase text-accent-red font-bold" style={{ color: pathA.hex }}>
                {pathA.title}
              </th>
              <th className="py-3 px-4 uppercase text-accent-cyan font-bold" style={{ color: pathB.hex }}>
                {pathB.title}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Future Scenario Score</td>
              <td className="py-3 px-4 font-bold text-accent-red" style={{ color: pathA.hex }}>
                {pathA.score} / 100
              </td>
              <td className="py-3 px-4 font-bold text-accent-cyan" style={{ color: pathB.hex }}>
                {pathB.score} / 100
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">2031 Career Outcome</td>
              <td className="py-3 px-4 text-text-muted">{yearA2031.career}</td>
              <td className="py-3 px-4 text-text-primary font-semibold">{yearB2031.career}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Income Scenario (2031)</td>
              <td className="py-3 px-4 text-accent-amber">{yearA2031.incomeScenario || 'Baseline'}</td>
              <td className="py-3 px-4 text-accent-gold font-bold">{yearB2031.incomeScenario || 'High Growth'}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Habit Consistency</td>
              <td className="py-3 px-4 text-accent-red">Same or worse drag</td>
              <td className="py-3 px-4 text-accent-green">Steadily compounding</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Learning Velocity</td>
              <td className="py-3 px-4 text-text-muted">{simulation.userProfile.learningHours}h / day static</td>
              <td className="py-3 px-4 text-accent-cyan font-semibold">3h+ daily deep work</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Predicted Life Regret</td>
              <td className="py-3 px-4 text-accent-red font-bold">HIGH (85% risk)</td>
              <td className="py-3 px-4 text-accent-green font-bold">LOW (10% risk)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Divergence Summary Box */}
      <div className="p-4 rounded-xl bg-void border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="font-mono text-xs text-accent-gold font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent-gold" /> DIVERGENCE DELTA: {lostHours.toLocaleString()} HOURS OVER 5 YEARS
          </div>
          <p className="text-xs font-body text-text-secondary mt-1">
            "The difference between these two futures is about <strong>4 hours per day</strong>. That's it."
          </p>
        </div>

        <div className="font-mono text-xs px-4 py-2 rounded-xl bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan font-bold">
          4 Hours / Day = Alternate Life
        </div>
      </div>
    </GlassCard>
  );
};
