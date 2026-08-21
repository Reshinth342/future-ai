import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserProfile } from '../../types/simulation';
import { ArrowRight, ArrowLeft, Sparkles, Clock, Check, Plus, Trash2, ShieldAlert } from 'lucide-react';

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Germany', 
  'Australia', 'Singapore', 'Japan', 'France', 'Brazil', 'Other'
];

export const StepWizard: React.FC = () => {
  const { currentStep, nextOnboardingStep, prevOnboardingStep, onboardingProfile, updateOnboardingProfile, generateSimulationFromProfile } = useApp();
  
  const [customHabitInput, setCustomHabitInput] = useState<string>('');

  const p = onboardingProfile;

  // Live calculations for Step 2
  const socialHoursPerYear = Math.round((p.socialMediaHours || 0) * 365);
  const socialDaysPerYear = Math.round(socialHoursPerYear / 24);
  const learnHoursFiveYears = Math.round((p.learningHours || 0) * 365 * 5);

  const toggleDigitalHabit = (item: string) => {
    const list = p.digitalHabits || [];
    const updated = list.includes(item) ? list.filter(x => x !== item) : [...list, item];
    updateOnboardingProfile({ digitalHabits: updated });
  };

  const toggleMentalPattern = (item: string) => {
    const list = p.mentalPatterns || [];
    const updated = list.includes(item) ? list.filter(x => x !== item) : [...list, item];
    updateOnboardingProfile({ mentalPatterns: updated });
  };

  const togglePositiveHabit = (item: string) => {
    const list = p.positiveHabits || [];
    const updated = list.includes(item) ? list.filter(x => x !== item) : [...list, item];
    updateOnboardingProfile({ positiveHabits: updated });
  };

  const addCustomHabit = () => {
    if (!customHabitInput.trim()) return;
    const list = p.customHabits || [];
    updateOnboardingProfile({ customHabits: [...list, customHabitInput.trim()] });
    setCustomHabitInput('');
  };

  const removeCustomHabit = (idx: number) => {
    const list = p.customHabits || [];
    updateOnboardingProfile({ customHabits: list.filter((_, i) => i !== idx) });
  };

  const handleFinish = () => {
    const fullProfile: UserProfile = {
      name: p.name || 'Alex',
      age: p.age || 21,
      country: p.country || 'India',
      role: p.role || 'IT Student',
      education: p.education || 'College',
      socialMediaHours: p.socialMediaHours || 5,
      sleepHours: p.sleepHours || 6.5,
      learningHours: p.learningHours || 1.5,
      exerciseFreq: p.exerciseFreq || '1-2x/week',
      monthlyIncome: p.monthlyIncome,
      focusRating: p.focusRating || 5,
      consistencyRating: p.consistencyRating || 4,
      goalStatement: p.goalStatement || 'I want to get a software engineering job paying ₹15L/year by 2027.',
      targetCareer: p.targetCareer || 'Software Engineer',
      targetIncome: p.targetIncome || '₹15L/year',
      targetYear: p.targetYear || '2027',
      biggestSkill: p.biggestSkill || 'Full-Stack Development & DSA',
      biggestFear: p.biggestFear,
      cityOpportunity: p.cityOpportunity,
      digitalHabits: p.digitalHabits || ['Instagram', 'YouTube'],
      mentalPatterns: p.mentalPatterns || ['Procrastination'],
      positiveHabits: p.positiveHabits || ['Coding'],
      customHabits: p.customHabits || [],
      negativeSeverity: p.negativeSeverity || {},
      startYear: p.startYear || '2026',
      horizonYears: p.horizonYears || '5 Years',
      scaredScenario: p.scaredScenario || '📍 Slow drift — never really getting there',
      fiveYearReflection: p.fiveYearReflection || ''
    };

    generateSimulationFromProfile(fullProfile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      {/* Step Progress Bar */}
      <div className="mb-8 font-mono">
        <div className="flex justify-between items-center text-xs text-text-muted mb-2 uppercase tracking-widest">
          <span>Step 0{currentStep} of 06</span>
          <span className="text-accent-cyan font-bold">
            {currentStep === 1 && 'IDENTITY & BASICS'}
            {currentStep === 2 && 'CURRENT REALITY METRICS'}
            {currentStep === 3 && 'CORE GOAL & TARGET'}
            {currentStep === 4 && 'HABITS & FRICTION'}
            {currentStep === 5 && 'HORIZON SCOPING'}
            {currentStep === 6 && 'FINAL COMMITMENT'}
          </span>
        </div>
        <div className="w-full h-2 bg-void rounded-full overflow-hidden border border-border-subtle">
          <div 
            className="h-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan transition-all duration-500"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Bento Container */}
      <div className="bento-card p-6 sm:p-10">
        {/* STEP 1: COORDINATES */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <span className="font-mono text-xs text-accent-cyan uppercase">Step 01</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">ENTER YOUR COORDINATES</h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                Before we can show you your future, we need to understand your present.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body">
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  value={p.name || ''}
                  onChange={e => updateOnboardingProfile({ name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full bg-void border border-border-subtle rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-accent-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Age</label>
                <input
                  type="number"
                  value={p.age || 21}
                  onChange={e => updateOnboardingProfile({ age: parseInt(e.target.value) || 21 })}
                  className="w-full bg-void border border-border-subtle rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-accent-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Country</label>
                <select
                  value={p.country || 'India'}
                  onChange={e => updateOnboardingProfile({ country: e.target.value })}
                  className="w-full bg-void border border-border-subtle rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-accent-blue focus:outline-none"
                >
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Current Role</label>
                <select
                  value={p.role || 'IT Student'}
                  onChange={e => updateOnboardingProfile({ role: e.target.value })}
                  className="w-full bg-void border border-border-subtle rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-accent-blue focus:outline-none"
                >
                  <option value="IT Student">IT / CS Student</option>
                  <option value="Non-CS Student">Non-CS Student</option>
                  <option value="Junior Professional">Junior Professional</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Education Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {['High School', 'College', 'Graduate', 'Self-Taught'].map(edu => (
                    <button
                      key={edu}
                      onClick={() => updateOnboardingProfile({ education: edu })}
                      className={`p-3 rounded-xl border transition-all ${
                        p.education === edu ? 'border-accent-blue bg-accent-blue/15 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                      }`}
                    >
                      {edu}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CURRENT REALITY SLIDERS WITH LIVE CALCULATIONS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-accent-amber uppercase">Step 02</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">YOUR CURRENT REALITY</h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                Be honest with your numbers. The AI uses compound formulas to project your timeline.
              </p>
            </div>

            <div className="space-y-6 font-body">
              {/* Social Media Slider */}
              <div className="p-4 rounded-xl bg-void border border-border-subtle">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    📱 Daily Social Media / Doom-scrolling
                  </span>
                  <span className="font-mono text-accent-red font-bold">{p.socialMediaHours || 5}h / day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={p.socialMediaHours || 5}
                  onChange={e => updateOnboardingProfile({ socialMediaHours: parseFloat(e.target.value) })}
                  className="w-full accent-accent-red cursor-pointer"
                />
                <div className="mt-2 font-mono text-xs text-accent-red/90 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Live calculation: {p.socialMediaHours}h/day = {socialHoursPerYear.toLocaleString()} hours/year = <strong className="underline">{socialDaysPerYear} full days</strong> staring at a screen!
                </div>
              </div>

              {/* Learning / Building Slider */}
              <div className="p-4 rounded-xl bg-void border border-border-subtle">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    🧠 Daily Hours Learning / Building
                  </span>
                  <span className="font-mono text-accent-cyan font-bold">{p.learningHours || 1.5}h / day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={p.learningHours || 1.5}
                  onChange={e => updateOnboardingProfile({ learningHours: parseFloat(e.target.value) })}
                  className="w-full accent-accent-cyan cursor-pointer"
                />
                <div className="mt-2 font-mono text-xs text-accent-cyan flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Compounded over 5 years: {learnHoursFiveYears.toLocaleString()} hours of deep growth.
                </div>
              </div>

              {/* Sleep Hours Slider */}
              <div className="p-4 rounded-xl bg-void border border-border-subtle">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    😴 Daily Sleep Hours
                  </span>
                  <span className="font-mono text-accent-violet font-bold">{p.sleepHours || 6.5}h / day</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={p.sleepHours || 6.5}
                  onChange={e => updateOnboardingProfile({ sleepHours: parseFloat(e.target.value) })}
                  className="w-full accent-accent-violet cursor-pointer"
                />
                <div className="mt-2 font-mono text-xs text-text-muted">
                  {p.sleepHours! < 7 ? '⚠️ Below optimal recovery window (7-8.5h). Cognitive speed impacted.' : '✅ Optimal brain recovery window.'}
                </div>
              </div>

              {/* Exercise Frequency */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Exercise Frequency</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {['Never', '1-2x/week', '3-4x/week', '5+/week'].map(freq => (
                    <button
                      key={freq}
                      onClick={() => updateOnboardingProfile({ exerciseFreq: freq as any })}
                      className={`p-3 rounded-xl border transition-all ${
                        p.exerciseFreq === freq ? 'border-accent-green bg-accent-green/15 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Income (Optional) */}
              <div className="p-4 rounded-xl bg-void border border-border-subtle space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2 font-mono">
                    💵 Current Monthly Income (Optional)
                  </label>
                  <span className="text-xs text-text-muted font-mono">(for scenario modeling only)</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. ₹0 (Student) or ₹35,000/mo"
                  value={p.monthlyIncome || ''}
                  onChange={e => updateOnboardingProfile({ monthlyIncome: e.target.value })}
                  className="w-full bg-surface border border-border-subtle rounded-xl p-3 text-xs text-white font-mono focus:border-accent-gold focus:outline-none"
                />
              </div>

              {/* Focus Rating Card */}
              <div className="p-5 rounded-2xl bg-void border border-border-subtle space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white font-mono flex items-center gap-2">
                    🎯 How would you rate your current focus?
                  </label>
                  <span className="font-mono text-accent-blue text-base font-bold">
                    {p.focusRating || 5} <span className="text-xs text-text-muted">/ 10</span>
                  </span>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={p.focusRating || 5}
                  onChange={e => updateOnboardingProfile({ focusRating: parseInt(e.target.value) })}
                  className="w-full accent-accent-blue cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono text-text-muted">
                  <span>1 (Highly Distracted)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (Laser Deep Focus)</span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border-subtle text-xs font-mono">
                  {(p.focusRating || 5) <= 3 && <span className="text-accent-red">🔴 Extreme focus fragmentation. High distraction leakage into daily routine.</span>}
                  {(p.focusRating || 5) >= 4 && (p.focusRating || 5) <= 6 && <span className="text-accent-amber">🟡 Moderate focus ability. Vulnerable to digital dopamine notifications.</span>}
                  {(p.focusRating || 5) >= 7 && (p.focusRating || 5) <= 8 && <span className="text-accent-cyan">🔵 Strong deep work capacity. High skill acquisition velocity unlocked.</span>}
                  {(p.focusRating || 5) >= 9 && <span className="text-accent-green">🟢 Flow state master. Exceptional cognitive stamina and output.</span>}
                </div>
              </div>

              {/* Habit Consistency Rating Card */}
              <div className="p-5 rounded-2xl bg-void border border-border-subtle space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white font-mono flex items-center gap-2">
                    🔥 How consistent are you with your habits?
                  </label>
                  <span className="font-mono text-accent-gold text-base font-bold">
                    {p.consistencyRating || 4} <span className="text-xs text-text-muted">/ 10</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  value={p.consistencyRating || 4}
                  onChange={e => updateOnboardingProfile({ consistencyRating: parseInt(e.target.value) })}
                  className="w-full accent-accent-gold cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono text-text-muted">
                  <span>1 (Irregular Effort)</span>
                  <span>5 (On & Off)</span>
                  <span>10 (Unshakable Daily Routine)</span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border-subtle text-xs font-mono">
                  {(p.consistencyRating || 4) <= 3 && <span className="text-accent-red">🔴 Irregular execution. High risk of timeline drift into 💀 Unchanged path.</span>}
                  {(p.consistencyRating || 4) >= 4 && (p.consistencyRating || 4) <= 6 && <span className="text-accent-amber">🟡 Bursts of intense effort followed by days of distraction.</span>}
                  {(p.consistencyRating || 4) >= 7 && (p.consistencyRating || 4) <= 8 && <span className="text-accent-gold">🎯 Solid habit discipline. Compounding momentum compounding daily.</span>}
                  {(p.consistencyRating || 4) >= 9 && <span className="text-accent-green">🚀 Unshakable execution. Top 1% trajectory unlocked.</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: YOUR BIGGEST GOAL */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-accent-gold uppercase">Step 03</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">YOUR BIGGEST GOAL</h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                What is the primary milestone you are trying to achieve?
              </p>
            </div>

            <div className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Primary Goal Statement</label>
                <textarea
                  rows={3}
                  value={p.goalStatement || ''}
                  onChange={e => updateOnboardingProfile({ goalStatement: e.target.value })}
                  placeholder="e.g. I want to get a software engineering job paying ₹15L/year by 2027."
                  className="w-full bg-void border border-border-subtle rounded-xl p-4 text-sm text-white font-mono focus:border-accent-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">Target Role / Career</label>
                  <input
                    type="text"
                    value={p.targetCareer || ''}
                    onChange={e => updateOnboardingProfile({ targetCareer: e.target.value })}
                    placeholder="e.g. Full-Stack / AI Engineer"
                    className="w-full bg-void border border-border-subtle rounded-xl p-3 text-sm text-white font-mono focus:border-accent-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">Target Income Scenario (Optional)</label>
                  <input
                    type="text"
                    value={p.targetIncome || ''}
                    onChange={e => updateOnboardingProfile({ targetIncome: e.target.value })}
                    placeholder="e.g. ₹15L / $80k annually"
                    className="w-full bg-void border border-border-subtle rounded-xl p-3 text-sm text-white font-mono focus:border-accent-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">Target Horizon Year</label>
                  <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                    {['2026', '2027', '2028', '2030'].map(yr => (
                      <button
                        key={yr}
                        onClick={() => updateOnboardingProfile({ targetYear: yr })}
                        className={`p-2.5 rounded-xl border ${p.targetYear === yr ? 'border-accent-gold bg-accent-gold/20 text-white font-bold' : 'border-border-subtle text-text-muted'}`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">Biggest Skill To Master</label>
                  <input
                    type="text"
                    value={p.biggestSkill || ''}
                    onChange={e => updateOnboardingProfile({ biggestSkill: e.target.value })}
                    placeholder="e.g. Data Structures & System Design"
                    className="w-full bg-void border border-border-subtle rounded-xl p-3 text-sm text-white font-mono focus:border-accent-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: HABIT MAP */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-accent-violet uppercase">Step 04</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">YOUR HABIT MAP</h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                Select your primary patterns. Your habits write your future timeline.
              </p>
            </div>

            <div className="space-y-6 font-body">
              {/* Digital Habits */}
              <div>
                <label className="block text-xs font-mono text-accent-cyan uppercase mb-2">📱 Digital Habits (Select active)</label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'YouTube', 'TikTok', 'Gaming', 'Doom-scrolling', 'Reddit', 'Twitter/X', 'Netflix', 'Online shopping'].map(item => {
                    const active = (p.digitalHabits || []).includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleDigitalHabit(item)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                          active ? 'border-accent-cyan bg-accent-cyan/20 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-accent-cyan" />} {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mental Patterns */}
              <div>
                <label className="block text-xs font-mono text-accent-red uppercase mb-2">🧠 Mental Patterns (Select active)</label>
                <div className="flex flex-wrap gap-2">
                  {['Procrastination', 'Overthinking', 'Self-doubt', 'Avoidance', 'Inconsistent sleep', 'People-pleasing', 'Lack of structure', 'Fear of failure'].map(item => {
                    const active = (p.mentalPatterns || []).includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleMentalPattern(item)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                          active ? 'border-accent-red bg-accent-red/20 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-accent-red" />} {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Positive Habits */}
              <div>
                <label className="block text-xs font-mono text-accent-green uppercase mb-2">🚀 Positive Habits (Select active)</label>
                <div className="flex flex-wrap gap-2">
                  {['Reading', 'Coding', 'Exercise', 'Meditation', 'Journaling', 'Networking', 'Building projects', 'Early waking'].map(item => {
                    const active = (p.positiveHabits || []).includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => togglePositiveHabit(item)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                          active ? 'border-accent-green bg-accent-green/20 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-accent-green" />} {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom habit input */}
              <div className="pt-2">
                <label className="block text-xs font-mono text-text-muted uppercase mb-1">+ Add Custom Habit</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Night time late scrolling"
                    value={customHabitInput}
                    onChange={e => setCustomHabitInput(e.target.value)}
                    className="flex-1 bg-void border border-border-subtle rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-violet"
                  />
                  <button
                    onClick={addCustomHabit}
                    className="px-4 py-2 rounded-xl bg-accent-violet text-white text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {(p.customHabits || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(p.customHabits || []).map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-surface border border-border-subtle text-xs font-mono text-text-secondary flex items-center gap-1">
                        {c} <button onClick={() => removeCustomHabit(i)} className="text-accent-red hover:text-white"><Trash2 className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: TIMELINE START */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-accent-cyan uppercase">Step 05</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">TIMELINE SIMULATION BOUNDS</h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                Configure your simulation starting year and timeline horizon.
              </p>
            </div>

            <div className="space-y-6 font-body">
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Simulation Start Year</label>
                <div className="grid grid-cols-3 gap-3 font-mono text-sm">
                  {['2025', '2026', '2027'].map(yr => (
                    <button
                      key={yr}
                      onClick={() => updateOnboardingProfile({ startYear: yr })}
                      className={`p-4 rounded-xl border text-center font-bold ${p.startYear === yr ? 'border-accent-cyan bg-accent-cyan/20 text-white' : 'border-border-subtle text-text-muted'}`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Simulation Horizon Depth</label>
                <div className="grid grid-cols-3 gap-3 font-mono text-sm">
                  {['3 Years', '5 Years', '10 Years'].map(depth => (
                    <button
                      key={depth}
                      onClick={() => updateOnboardingProfile({ horizonYears: depth as any })}
                      className={`p-4 rounded-xl border text-center font-bold ${p.horizonYears === depth ? 'border-accent-violet bg-accent-violet/20 text-white' : 'border-border-subtle text-text-muted'}`}
                    >
                      {depth}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">Which scenario are you most afraid of?</label>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    '💀 Nothing changes — staying in the exact same spot',
                    '📍 Slow drift — working hard but never really getting there',
                    '🎯 Being almost there but giving up right before breakthrough'
                  ].map(option => (
                    <button
                      key={option}
                      onClick={() => updateOnboardingProfile({ scaredScenario: option })}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                        p.scaredScenario === option ? 'border-accent-red bg-accent-red/15 text-white font-semibold' : 'border-border-subtle text-text-secondary hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: THE FINAL QUESTION */}
        {currentStep === 6 && (
          <div className="space-y-6 text-center py-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-red uppercase tracking-widest px-3 py-1 rounded-full bg-accent-red/10 border border-accent-red/30 mb-2">
              <ShieldAlert className="w-3.5 h-3.5" /> ONE LAST QUESTION
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
              If you continue living exactly like today — <br />
              <span className="text-accent-amber">same habits, same distractions, same effort</span> — <br />
              where do you think you'll be in 5 years?
            </h2>

            <p className="text-xs font-mono text-text-muted max-w-lg mx-auto italic">
              "Be honest. The AI won't judge you. But it will show you."
            </p>

            <textarea
              rows={4}
              value={p.fiveYearReflection || ''}
              onChange={e => updateOnboardingProfile({ fiveYearReflection: e.target.value })}
              placeholder="e.g. I might end up settling for a job I dislike, regretting the hours I wasted scrolling reels when I should have been building..."
              className="w-full bg-void border border-border-subtle rounded-2xl p-4 text-sm font-mono text-white focus:border-accent-violet focus:outline-none"
            />

            <button
              onClick={handleFinish}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan text-white font-mono font-bold text-lg tracking-wider hover:scale-[1.02] transition-all shadow-glow-violet flex items-center justify-center gap-2"
            >
              GENERATE MY FUTURE <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Navigation buttons at bottom */}
        {currentStep < 6 && (
          <div className="flex justify-between items-center pt-8 border-t border-border-subtle mt-8 font-mono text-xs">
            <button
              onClick={prevOnboardingStep}
              disabled={currentStep === 1}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-1.5 ${
                currentStep === 1 ? 'opacity-30 cursor-not-allowed border-border-subtle text-text-muted' : 'border-border-subtle text-text-secondary hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={nextOnboardingStep}
              className="px-6 py-2.5 rounded-xl bg-accent-blue text-white font-semibold shadow-glow-blue flex items-center gap-1.5 hover:opacity-90"
            >
              Next Scene <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
