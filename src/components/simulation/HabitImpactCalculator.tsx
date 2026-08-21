import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Calculator, Zap } from 'lucide-react';
import { soundFx } from '../../services/audioService';

interface HabitImpactCalculatorProps {
  initialSocialMedia: number;
}

export const HabitImpactCalculator: React.FC<HabitImpactCalculatorProps> = ({ initialSocialMedia }) => {
  const [socialHours, setSocialHours] = useState<number>(initialSocialMedia);
  const [gamingHours, setGamingHours] = useState<number>(1);
  const [sleepDeficitHours, setSleepDeficitHours] = useState<number>(1.5);
  const [redirectedHours, setRedirectedHours] = useState<number>(2);

  const socialYearly = Math.round(socialHours * 365);
  const socialFiveYears = socialYearly * 5;

  const gamingYearly = Math.round(gamingHours * 365);
  const gamingFiveYears = gamingYearly * 5;

  const sleepYearly = Math.round(sleepDeficitHours * 365);
  const sleepFiveYears = sleepYearly * 5;

  const totalDailyLost = socialHours + gamingHours + sleepDeficitHours;
  const totalYearlyLost = socialYearly + gamingYearly + sleepYearly;
  const totalFiveYearLost = totalYearlyLost * 5;

  const redirectYearly = Math.round(redirectedHours * 365);
  const redirectFiveYears = redirectYearly * 5;
  const masteryPercentage = ((redirectFiveYears / 10000) * 100).toFixed(1);

  const handleSliderChange = (setter: (val: number) => void, val: number) => {
    soundFx.playClick();
    setter(val);
  };

  return (
    <GlassCard glowColor="amber" className="space-y-6">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4">
        <div>
          <span className="font-mono text-xs text-accent-amber uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" /> HABIT IMPACT CALCULATOR
          </span>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            See Exactly What Your Habits Cost You
          </h3>
        </div>
      </div>

      {/* Sliders Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body">
        <div className="p-3.5 rounded-xl bg-void border border-border-subtle">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-text-secondary">📱 Social Media</span>
            <span className="text-accent-red font-bold">{socialHours}h / day</span>
          </div>
          <input
            type="range" min="0" max="10" step="0.5" value={socialHours}
            onChange={e => handleSliderChange(setSocialHours, parseFloat(e.target.value))}
            className="w-full accent-accent-red cursor-pointer"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-void border border-border-subtle">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-text-secondary">🎮 Gaming / Browsing</span>
            <span className="text-accent-amber font-bold">{gamingHours}h / day</span>
          </div>
          <input
            type="range" min="0" max="8" step="0.5" value={gamingHours}
            onChange={e => handleSliderChange(setGamingHours, parseFloat(e.target.value))}
            className="w-full accent-accent-amber cursor-pointer"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-void border border-border-subtle">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-text-secondary">😴 Sleep Deficit Drag</span>
            <span className="text-accent-violet font-bold">{sleepDeficitHours}h / day</span>
          </div>
          <input
            type="range" min="0" max="6" step="0.5" value={sleepDeficitHours}
            onChange={e => handleSliderChange(setSleepDeficitHours, parseFloat(e.target.value))}
            className="w-full accent-accent-violet cursor-pointer"
          />
        </div>
      </div>

      {/* Habit Impact Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted">
              <th className="py-2.5 px-3 uppercase">CURRENT HABIT</th>
              <th className="py-2.5 px-3 uppercase">DAILY</th>
              <th className="py-2.5 px-3 uppercase">YEARLY</th>
              <th className="py-2.5 px-3 uppercase">5 YEARS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="py-2.5 px-3 text-text-secondary">📱 Social Media</td>
              <td className="py-2.5 px-3 text-white font-bold">{socialHours}h</td>
              <td className="py-2.5 px-3 text-accent-red">{socialYearly.toLocaleString()}h</td>
              <td className="py-2.5 px-3 text-accent-red font-bold">{socialFiveYears.toLocaleString()}h</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 text-text-secondary">🎮 Gaming / Casual Browsing</td>
              <td className="py-2.5 px-3 text-white font-bold">{gamingHours}h</td>
              <td className="py-2.5 px-3 text-accent-amber">{gamingYearly.toLocaleString()}h</td>
              <td className="py-2.5 px-3 text-accent-amber font-bold">{gamingFiveYears.toLocaleString()}h</td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 text-text-secondary">😴 Sleep Deficit Drag</td>
              <td className="py-2.5 px-3 text-white font-bold">{sleepDeficitHours}h</td>
              <td className="py-2.5 px-3 text-accent-violet">{sleepYearly.toLocaleString()}h</td>
              <td className="py-2.5 px-3 text-accent-violet font-bold">{sleepFiveYears.toLocaleString()}h</td>
            </tr>
            <tr className="bg-white/5 font-bold">
              <td className="py-3 px-3 text-accent-red uppercase">TOTAL TIME DRAIN:</td>
              <td className="py-3 px-3 text-white">{totalDailyLost}h</td>
              <td className="py-3 px-3 text-accent-red">{totalYearlyLost.toLocaleString()}h</td>
              <td className="py-3 px-3 text-accent-red text-sm">{totalFiveYearLost.toLocaleString()}h</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Redirected Time Calculation */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-accent-blue/15 via-accent-cyan/15 to-accent-violet/15 border border-accent-cyan/30 space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-accent-cyan uppercase flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-accent-cyan" /> IF YOU REDIRECTED JUST:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range" min="0.5" max="6" step="0.5" value={redirectedHours}
              onChange={e => handleSliderChange(setRedirectedHours, parseFloat(e.target.value))}
              className="accent-accent-cyan cursor-pointer w-32"
            />
            <span className="text-sm font-bold text-white bg-void px-2.5 py-1 rounded-lg border border-accent-cyan/40">
              {redirectedHours}h / day
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-void/80 border border-border-subtle">
            <div className="text-text-muted">Compound Growth per Year:</div>
            <div className="text-xl font-bold text-accent-cyan mt-1">+{redirectYearly.toLocaleString()} hours / year</div>
          </div>
          <div className="p-3 rounded-xl bg-void/80 border border-border-subtle">
            <div className="text-text-muted">Compound Growth over 5 Years:</div>
            <div className="text-xl font-bold text-accent-gold mt-1">+{redirectFiveYears.toLocaleString()} hours / 5 years</div>
          </div>
        </div>

        <p className="text-xs font-body text-text-secondary leading-relaxed pt-1">
          💡 World-class mastery in almost any technical skill requires ~10,000 hours of deliberate practice. 
          By redirecting {redirectedHours}h/day, you would complete <strong className="text-accent-gold">{masteryPercentage}%</strong> of the way to world-class mastery in 5 years!
        </p>
      </div>
    </GlassCard>
  );
};
