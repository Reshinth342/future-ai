import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScoreGauge } from '../ui/ScoreGauge';
import { LayoutDashboard, Users, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../../services/audioService';

export const DashboardPage: React.FC = () => {
  const { simulation, setActiveView, addWeeklyCheckinEntry, savePartnerCommitment } = useApp();
  const profile = simulation.userProfile;
  const checkins = simulation.weeklyCheckins || [];
  const partner = simulation.accountabilityPartner;

  const [showCheckinModal, setShowCheckinModal] = useState<boolean>(false);
  const [showPartnerModal, setShowPartnerModal] = useState<boolean>(false);

  // Checkin form state
  const [deepWorkHours, setDeepWorkHours] = useState<number>(3);
  const [socialMediaHours, setSocialMediaHours] = useState<number>(2);
  const [weeklyWin, setWeeklyWin] = useState<string>('');
  const [biggestFriction, setBiggestFriction] = useState<string>('');

  // Partner form state
  const [partnerName, setPartnerName] = useState<string>(partner?.name || '');
  const [partnerEmail, setPartnerEmail] = useState<string>(partner?.email || '');
  const [partnerStake, setPartnerStake] = useState<string>(partner?.commitment || '₹1,000 stake');

  const handleSaveCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weeklyWin.trim()) return;

    soundFx.playSuccessChime();
    addWeeklyCheckinEntry({
      weekNumber: checkins.length + 1,
      date: new Date().toISOString().split('T')[0],
      deepWorkHours,
      socialMediaHours,
      wins: weeklyWin,
      setbacks: biggestFriction || 'None',
      energy: 8,
      calculatedScore: Math.min(100, Math.round(deepWorkHours * 15))
    });

    setWeeklyWin('');
    setBiggestFriction('');
    setShowCheckinModal(false);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim() || !partnerEmail.trim()) return;

    soundFx.playSuccessChime();
    savePartnerCommitment({
      name: partnerName,
      email: partnerEmail,
      commitment: partnerStake,
      checkInDate: new Date().toISOString().split('T')[0]
    });
    setShowPartnerModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative font-mono">
      {/* BENTO HERO TILE */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs text-accent-cyan uppercase tracking-widest flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-accent-cyan" /> COMMAND DASHBOARD OVERVIEW
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mt-1">
            WELCOME BACK, {profile.name.toUpperCase()}
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Goal: <strong className="text-accent-gold">{profile.goalStatement}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreGauge score={simulation.futureScore.overall} size="md" color="var(--accent-cyan)" />
          <div className="text-xs">
            <div className="text-text-muted">TRAJECTORY SCORE</div>
            <div className="font-bold text-white text-lg">{simulation.futureScore.overall} / 100</div>
          </div>
        </div>
      </div>

      {/* BENTO GRID MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Bento Tile 1: Weekly Checkin Status */}
        <div className="bento-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-accent-cyan" /> WEEKLY CHECK-INS
            </span>
            <span className="text-xs text-accent-cyan font-bold">{checkins.length} COMPLETED</span>
          </div>

          <p className="text-xs text-text-secondary">
            Recalibrate your timeline consistency every 7 days.
          </p>

          <button
            onClick={() => setShowCheckinModal(true)}
            className="w-full py-3 rounded-2xl bg-accent-cyan text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" /> LOG WEEKLY CHECK-IN →
          </button>
        </div>

        {/* Bento Tile 2: Accountability Partner */}
        <div className="bento-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent-violet" /> ACCOUNTABILITY PARTNER
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${partner ? 'bg-accent-green/20 text-accent-green border-accent-green/40' : 'bg-white/10 text-text-muted border-white/20'}`}>
              {partner ? 'ACTIVE 🤝' : 'NOT SET'}
            </span>
          </div>

          {partner ? (
            <div className="p-3 rounded-xl bg-void border border-border-subtle text-xs space-y-1">
              <div className="text-white font-bold">{partner.name}</div>
              <div className="text-text-muted">{partner.email}</div>
              <div className="text-accent-gold font-bold">Commitment: {partner.commitment}</div>
            </div>
          ) : (
            <p className="text-xs text-text-secondary">
              Put financial or social skin-in-the-game with an accountability partner.
            </p>
          )}

          <button
            onClick={() => setShowPartnerModal(true)}
            className="w-full py-3 rounded-2xl bg-accent-violet text-white font-bold text-xs shadow-glow-violet flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" /> {partner ? 'EDIT PARTNER' : 'ADD PARTNER'} →
          </button>
        </div>

        {/* Bento Tile 3: Quick Navigation Modules */}
        <div className="bento-card p-6 space-y-4">
          <div className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5 border-b border-border-subtle pb-3">
            <Sparkles className="w-4 h-4 text-accent-gold" /> SIMULATION MODULES
          </div>

          <div className="space-y-2 text-xs">
            {[
              { key: 'command-center', label: 'Timeline Command Center', color: 'text-accent-cyan' },
              { key: 'future-self', label: 'Future Self AI Chat', color: 'text-accent-violet' },
              { key: 'thirty-day', label: '30-Day Shift Tracker', color: 'text-accent-gold' },
              { key: 'journal', label: 'Daily Micro-Journal', color: 'text-accent-amber' },
              { key: 'letter', label: 'Letter to Future Self', color: 'text-accent-green' }
            ].map(mod => (
              <button
                key={mod.key}
                onClick={() => setActiveView(mod.key as any)}
                className="w-full p-2.5 rounded-xl bg-void border border-border-subtle text-left text-text-secondary hover:text-white hover:border-white/20 flex items-center justify-between"
              >
                <span className={mod.color}>{mod.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WEEKLY CHECKIN MODAL */}
      {showCheckinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full border border-white/20 rounded-3xl relative text-xs">
            <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-accent-cyan" /> Log Weekly Check-In
            </h3>
            <form onSubmit={handleSaveCheckin} className="space-y-4">
              <div>
                <label className="block text-text-muted uppercase mb-1">Deep Work Hours This Week: {deepWorkHours}h/day</label>
                <input
                  type="range" min="0" max="10" step="0.5"
                  value={deepWorkHours}
                  onChange={e => setDeepWorkHours(parseFloat(e.target.value))}
                  className="w-full accent-accent-cyan cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-text-muted uppercase mb-1">Social Media Hours This Week: {socialMediaHours}h/day</label>
                <input
                  type="range" min="0" max="12" step="0.5"
                  value={socialMediaHours}
                  onChange={e => setSocialMediaHours(parseFloat(e.target.value))}
                  className="w-full accent-accent-red cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-text-muted uppercase mb-1">Weekly Win</label>
                <input
                  type="text"
                  placeholder="e.g. Completed 15 hours of deep focus..."
                  value={weeklyWin}
                  onChange={e => setWeeklyWin(e.target.value)}
                  className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label className="block text-text-muted uppercase mb-1">Biggest Friction Point</label>
                <input
                  type="text"
                  placeholder="e.g. Late night YouTube rabbit holes..."
                  value={biggestFriction}
                  onChange={e => setBiggestFriction(e.target.value)}
                  className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-red"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="px-4 py-2 rounded-full bg-white/10 text-text-secondary hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!weeklyWin.trim()}
                  className="px-5 py-2 rounded-full bg-accent-cyan text-white font-semibold shadow-glow-cyan disabled:opacity-40"
                >
                  Save Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACCOUNTABILITY PARTNER MODAL */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full border border-white/20 rounded-3xl relative text-xs">
            <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent-violet" /> Accountability Partner Setup
            </h3>
            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="block text-text-muted uppercase mb-1">Partner Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul"
                  value={partnerName}
                  onChange={e => setPartnerName(e.target.value)}
                  className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-violet"
                />
              </div>

              <div>
                <label className="block text-text-muted uppercase mb-1">Partner Email</label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={partnerEmail}
                  onChange={e => setPartnerEmail(e.target.value)}
                  className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-violet"
                />
              </div>

              <div>
                <label className="block text-text-muted uppercase mb-1">Stake / Commitment Amount</label>
                <input
                  type="text"
                  placeholder="e.g. ₹1,000 if 30-day shift missed"
                  value={partnerStake}
                  onChange={e => setPartnerStake(e.target.value)}
                  className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPartnerModal(false)}
                  className="px-4 py-2 rounded-full bg-white/10 text-text-secondary hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!partnerName.trim() || !partnerEmail.trim()}
                  className="px-5 py-2 rounded-full bg-accent-violet text-white font-semibold shadow-glow-violet disabled:opacity-40"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
