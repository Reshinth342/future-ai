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
            <ArrowLeftRight className="w-3.5 h-3.5" /> COMPARE TWO WHAT-IF NOTES
          </span>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            Which one feels useful?
          </h3>
        </div>

        {/* Scenario Selectors */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <select
            value={scenarioA}
            onChange={e => setScenarioA(e.target.value as ScenarioKey)}
            className="bg-void border border-accent-red/40 rounded-xl px-3 py-2 text-accent-red font-bold focus:outline-none"
          >
            <option value="unchanged">SIMILAR ROUTINE</option>
            <option value="reality">CURRENT START</option>
            <option value="onePercent">SMALL CHANGE</option>
            <option value="goalAchieved">GOAL-FOCUSED</option>
            <option value="dream">STRETCH IDEA</option>
          </select>

          <span className="text-text-muted font-bold">VS</span>

          <select
            value={scenarioB}
            onChange={e => setScenarioB(e.target.value as ScenarioKey)}
            className="bg-void border border-accent-cyan/40 rounded-xl px-3 py-2 text-accent-cyan font-bold focus:outline-none"
          >
            <option value="onePercent">SMALL CHANGE</option>
            <option value="goalAchieved">GOAL-FOCUSED</option>
            <option value="dream">STRETCH IDEA</option>
            <option value="reality">CURRENT START</option>
            <option value="unchanged">SIMILAR ROUTINE</option>
          </select>
        </div>
      </div>

      {/* Comparative Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted">
              <th className="py-3 px-4 uppercase">A QUESTION TO CONSIDER</th>
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
              <td className="py-3 px-4 text-text-secondary font-semibold">What is this route about?</td>
              <td className="py-3 px-4 text-text-muted">{pathA.subtitle}</td>
              <td className="py-3 px-4 text-text-muted">{pathB.subtitle}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">A prompt for later</td>
              <td className="py-3 px-4 text-text-muted">{yearA2031.career}</td>
              <td className="py-3 px-4 text-text-muted">{yearB2031.career}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Income outlook</td>
              <td className="py-3 px-4 text-text-muted">Not estimated</td>
              <td className="py-3 px-4 text-text-muted">Not estimated</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">One action to explore</td>
              <td className="py-3 px-4 text-text-muted">{pathA.criticalMilestones?.[0] || pathA.subtitle}</td>
              <td className="py-3 px-4 text-text-muted">{pathB.criticalMilestones?.[0] || pathB.subtitle}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Current starting estimate</td>
              <td className="py-3 px-4 text-text-muted">{simulation.userProfile.socialMediaHours}h screen time · {simulation.userProfile.learningHours}h learning</td>
              <td className="py-3 px-4 text-text-muted">{simulation.userProfile.socialMediaHours}h screen time · {simulation.userProfile.learningHours}h learning</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-text-secondary font-semibold">Personal outcome</td>
              <td className="py-3 px-4 text-text-muted">Only you can decide what feels meaningful.</td>
              <td className="py-3 px-4 text-text-muted">Only you can decide what feels meaningful.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Divergence Summary Box */}
      <div className="p-4 rounded-xl bg-void border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="font-mono text-xs text-accent-gold font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent-gold" /> TIME MATH · IF YOU CHOSE TO REDIRECT IT
          </div>
          <p className="text-xs font-body text-text-secondary mt-1">
            At your current estimate, that adds up to {lostHours.toLocaleString()} hours over five years. It is arithmetic, not a promise about what you could achieve.
          </p>
        </div>

        <div className="font-mono text-xs px-4 py-2 rounded-xl bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan font-bold">
          Time available is not a guaranteed result
        </div>
      </div>
    </GlassCard>
  );
};
