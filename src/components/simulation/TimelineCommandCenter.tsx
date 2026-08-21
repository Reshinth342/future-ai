import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ScenarioKey, YearKey } from '../../types/simulation';
import { ScoreGauge } from '../ui/ScoreGauge';
import { YearDetailPanel } from './YearDetailPanel';
import { PathComparison } from './PathComparison';
import { HabitImpactCalculator } from './HabitImpactCalculator';
import { DivergenceAnalysis } from './DivergenceAnalysis';
import { RoastModeModal } from './RoastModeModal';
import { ShareableCard } from './ShareableCard';
import { Flame, MessageSquare, CalendarCheck, Share2, Sparkles } from 'lucide-react';

const YEARS: YearKey[] = ['2026', '2027', '2028', '2029', '2030', '2031'];

export const TimelineCommandCenter: React.FC = () => {
  const { simulation, activeScenario, setActiveScenario, activeYear, setActiveYear, setActiveView } = useApp();
  const [showRoast, setShowRoast] = useState<boolean>(false);

  const profile = simulation.userProfile;
  const activePath = simulation.scenarios[activeScenario];
  const activeYearSnapshot = activePath.years[activeYear] || activePath.years['2031'];

  const scenarioTabs: { key: ScenarioKey; label: string; icon: string; color: string; hex: string }[] = [
    { key: 'unchanged', label: '💀 Unchanged', icon: '💀', color: 'var(--accent-red)', hex: '#ef4444' },
    { key: 'reality', label: '📍 Reality Baseline', icon: '📍', color: 'var(--accent-amber)', hex: '#f59e0b' },
    { key: 'onePercent', label: '🚀 1% Better', icon: '🚀', color: 'var(--accent-cyan)', hex: '#06b6d4' },
    { key: 'goalAchieved', label: '🎯 Goal Achieved', icon: '🎯', color: 'var(--accent-gold)', hex: '#eab308' },
    { key: 'dream', label: '🌙 Dream Scenario', icon: '🌙', color: 'var(--accent-violet)', hex: '#8b5cf6' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative">
      {/* BENTO HEADER TILE */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-text-muted uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
            BENTO DASHBOARD · TIMELINE COMMAND CENTER
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mt-1">
            YOUR FUTURE, {profile.name.toUpperCase()}
          </h1>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-secondary mt-2">
            <span>Age Now: <strong className="text-white">{profile.age}</strong></span>
            <span>·</span>
            <span>Horizon: <strong className="text-white">2031</strong></span>
            <span>·</span>
            <span>Target Role: <strong className="text-accent-cyan">{profile.role}</strong></span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setShowRoast(true)}
            className="px-4 py-2.5 rounded-2xl bg-accent-red/20 border border-accent-red/40 text-accent-red font-bold flex items-center gap-1.5 hover:bg-accent-red/30 transition-all shadow-glow-red"
          >
            <Flame className="w-4 h-4" /> ROAST HABITS 🔥
          </button>

          <button
            onClick={() => setActiveView('future-self')}
            className="px-4 py-2.5 rounded-2xl bg-accent-violet text-white font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-glow-violet"
          >
            <MessageSquare className="w-4 h-4" /> FUTURE SELF CHAT
          </button>

          <button
            onClick={() => setActiveView('thirty-day')}
            className="px-4 py-2.5 rounded-2xl bg-accent-cyan text-white font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-glow-cyan"
          >
            <CalendarCheck className="w-4 h-4" /> 30-DAY SHIFT
          </button>
        </div>
      </div>

      {/* BENTO GRID DASHBOARD MAIN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* BENTO TILE 1: SCENARIO TABS & YEAR NODE RAIL (Spans Full 4 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-4 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-cyan" /> 01 / SCENARIO PATHS & YEAR NODES
            </div>
            <span className="font-mono text-xs font-bold" style={{ color: activePath.hex }}>
              ACTIVE TIMELINE: {activePath.title}
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {scenarioTabs.map(tab => {
              const isActive = activeScenario === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveScenario(tab.key)}
                  className={`px-4 py-3 rounded-2xl font-mono text-xs font-bold tracking-wider shrink-0 transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-surface text-white scale-105 shadow-lg'
                      : 'bg-void text-text-muted border-border-subtle hover:text-white'
                  }`}
                  style={{
                    borderColor: isActive ? tab.hex : undefined,
                    boxShadow: isActive ? `0 0 25px ${tab.hex}30` : undefined
                  }}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: tab.hex }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Year Node Rail */}
          <div className="relative py-2">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border-subtle -translate-y-1/2 z-0" />
            <div className="relative z-10 flex items-center justify-between px-2">
              {YEARS.map(yr => {
                const isSelected = activeYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    className="group flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isSelected
                          ? 'scale-125 text-white shadow-lg'
                          : 'bg-void text-text-muted border border-border-subtle hover:scale-110 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? activePath.hex : undefined,
                        boxShadow: isSelected ? `0 0 20px ${activePath.hex}60` : undefined
                      }}
                    >
                      {yr}
                    </div>
                    <span
                      className={`text-[10px] font-mono transition-colors ${
                        isSelected ? 'font-bold' : 'text-text-muted group-hover:text-white'
                      }`}
                      style={{ color: isSelected ? activePath.hex : undefined }}
                    >
                      {yr === '2026' ? 'PRESENT' : yr === '2031' ? 'HORIZON' : `+${parseInt(yr) - 2026}Y`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BENTO TILE 2: YEAR DETAIL PANEL (Spans 2 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 p-6">
          <YearDetailPanel
            yearSnapshot={activeYearSnapshot}
            scenarioKey={activeScenario}
            scenarioTitle={activePath.title}
            scenarioColor={activePath.hex}
          />
        </div>

        {/* BENTO TILE 3: FUTURE POTENTIAL SCORE & GAUGES (Spans 2 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <span className="font-mono text-xs text-accent-violet uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-violet" /> 03 / METRIC INDICATORS
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                FUTURE POTENTIAL SCORE
              </h3>
            </div>
            <ScoreGauge score={simulation.futureScore.overall} size="md" color="var(--accent-violet)" />
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-text-secondary">Focus Quality</span>
                <span className="text-accent-cyan font-bold">{simulation.futureScore.focusQuality} / 100</span>
              </div>
              <div className="w-full h-2 bg-void rounded-full overflow-hidden border border-border-subtle">
                <div className="h-full bg-accent-cyan" style={{ width: `${simulation.futureScore.focusQuality}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-text-secondary">Skill Velocity</span>
                <span className="text-accent-gold font-bold">{simulation.futureScore.skillVelocity} / 100</span>
              </div>
              <div className="w-full h-2 bg-void rounded-full overflow-hidden border border-border-subtle">
                <div className="h-full bg-accent-gold" style={{ width: `${simulation.futureScore.skillVelocity}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-text-secondary">Habit Consistency</span>
                <span className="text-accent-red font-bold">{simulation.futureScore.consistency} / 100</span>
              </div>
              <div className="w-full h-2 bg-void rounded-full overflow-hidden border border-border-subtle">
                <div className="h-full bg-accent-red" style={{ width: `${simulation.futureScore.consistency}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-void border border-border-subtle text-accent-amber font-body">
              <strong>Your primary drag:</strong> {simulation.futureScore.biggestDrag}
            </div>
          </div>
        </div>

        {/* BENTO TILE 4: PATH COMPARISON (Spans Full 4 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-4 p-6">
          <PathComparison simulation={simulation} />
        </div>

        {/* BENTO TILE 5: HABIT IMPACT CALCULATOR (Spans 2 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 p-6">
          <HabitImpactCalculator initialSocialMedia={profile.socialMediaHours} />
        </div>

        {/* BENTO TILE 6: DIVERGENCE POINT ANALYSIS (Spans 2 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 p-6">
          <DivergenceAnalysis data={simulation.divergenceWindow} />
        </div>

        {/* BENTO TILE 7: SHAREABLE FUTURE CARD (Spans Full 4 Cols) */}
        <div className="bento-card col-span-1 md:col-span-2 lg:col-span-4 p-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
            <div>
              <span className="font-mono text-xs text-accent-gold uppercase tracking-widest flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-accent-gold" /> 07 / VIRAL CARD EXPORTER
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Export Your Simulation Card
              </h3>
            </div>
          </div>
          <ShareableCard simulation={simulation} />
        </div>
      </div>

      {/* ROAST MODAL */}
      {showRoast && (
        <RoastModeModal roastText={simulation.roastText} onClose={() => setShowRoast(false)} />
      )}
    </div>
  );
};
