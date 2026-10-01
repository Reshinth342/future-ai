import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Sparkles } from 'lucide-react';
import { soundFx } from '../../services/audioService';

export const JournalPage: React.FC = () => {
  const { simulation, addDailyJournalLog } = useApp();
  const logs = simulation.dailyLogs || [];

  const [deepWorkHours, setDeepWorkHours] = useState<number>(2);
  const [socialMediaHours, setSocialMediaHours] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(7);
  const [win, setWin] = useState<string>('');
  const [drag, setDrag] = useState<string>('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!win.trim()) return;

    soundFx.playSuccessChime();
    addDailyJournalLog({
      date: new Date().toISOString().split('T')[0],
      dayNumber: logs.length + 1,
      goalProgress: win,
      wastedTime: drag,
      energy: energyLevel,
      shiftAction: deepWorkHours > socialMediaHours ? 'Focus momentum' : 'Screen time reduction',
      guardianInsight: 'Saved in this browser. Review this note whenever it is useful.'
    });

    setWin('');
    setDrag('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative font-mono">
      {/* BENTO HEADER */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs text-accent-amber uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-amber" /> PRIVATE NOTES
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            A quick note about today
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Keep a private note about what you tried, what got in the way, and what you want to adjust.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-void border border-border-subtle p-3 rounded-2xl">
          <Sparkles className="w-5 h-5 text-accent-gold" />
          <div className="text-xs">
            <div className="text-text-muted">TOTAL LOGS</div>
            <div className="font-bold text-white text-base">{logs.length} ENTRIES</div>
          </div>
        </div>
      </div>

      {/* BENTO MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bento Tile 1: Quick Composer (1 Col) */}
        <div className="bento-card p-6 space-y-4">
          <div className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5 border-b border-border-subtle pb-3">
            <Plus className="w-4 h-4 text-accent-cyan" /> NEW DAILY ENTRY
          </div>

          <form onSubmit={handleAddLog} className="space-y-4 text-xs">
            <div>
              <label htmlFor="journal-focus-hours" className="block text-text-muted uppercase mb-1">Focused time: {deepWorkHours}h</label>
              <input
                id="journal-focus-hours"
                type="range" min="0" max="10" step="0.5"
                value={deepWorkHours}
                onChange={e => setDeepWorkHours(parseFloat(e.target.value))}
                className="w-full accent-accent-cyan cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="journal-screen-hours" className="block text-text-muted uppercase mb-1">Social and entertainment time: {socialMediaHours}h</label>
              <input
                id="journal-screen-hours"
                type="range" min="0" max="12" step="0.5"
                value={socialMediaHours}
                onChange={e => setSocialMediaHours(parseFloat(e.target.value))}
                className="w-full accent-accent-red cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="journal-energy" className="block text-text-muted uppercase mb-1">Energy level (1–10): {energyLevel}</label>
              <input
                id="journal-energy"
                type="range" min="1" max="10"
                value={energyLevel}
                onChange={e => setEnergyLevel(parseInt(e.target.value))}
                className="w-full accent-accent-gold cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="journal-win" className="block text-text-muted uppercase mb-1">What I did today</label>
              <input
                id="journal-win"
                type="text"
                placeholder="e.g. Shipped authentication component..."
                value={win}
                onChange={e => setWin(e.target.value)}
                className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>

            <div>
              <label htmlFor="journal-friction" className="block text-text-muted uppercase mb-1">What got in the way? (optional)</label>
              <input
                id="journal-friction"
                type="text"
                placeholder="e.g. Spent 2h scrolling Instagram..."
                value={drag}
                onChange={e => setDrag(e.target.value)}
                className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-red"
              />
            </div>

            <button
              type="submit"
              disabled={!win.trim()}
              className="w-full py-3 rounded-2xl bg-accent-cyan text-white font-bold shadow-glow-cyan disabled:opacity-40"
            >
              SAVE DAILY LOG →
            </button>
          </form>
        </div>

        {/* Bento Tile 2: Past Journal Entries Feed (2 Cols) */}
        <div className="bento-card lg:col-span-2 p-6 space-y-4">
          <div className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5 border-b border-border-subtle pb-3">
              <BookOpen className="w-4 h-4 text-accent-gold" /> YOUR PAST NOTES
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {logs.map(log => (
              <div key={log.id} className="p-4 rounded-2xl bg-void border border-border-subtle space-y-2 text-xs">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="font-bold text-white">{log.date}</span>
                  <span>Energy: {log.energy}/10</span>
                </div>

                <div className="text-text-secondary">What I did: {log.goalProgress}</div>
                {log.wastedTime && <div className="text-text-muted">⚠️ Friction: {log.wastedTime}</div>}

                {log.guardianInsight && (
                  <div className="p-2.5 rounded-xl bg-surface text-[11px] text-accent-amber border border-white/10">
                    {log.guardianInsight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
