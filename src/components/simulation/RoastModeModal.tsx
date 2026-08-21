import React, { useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Flame, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { soundFx } from '../../services/audioService';
import { useApp } from '../../context/AppContext';

interface RoastModeModalProps {
  roastText: string;
  onClose: () => void;
}

export const RoastModeModal: React.FC<RoastModeModalProps> = ({ roastText, onClose }) => {
  const { setActiveView } = useApp();

  useEffect(() => {
    soundFx.playRoastSound();
  }, []);

  const handleFixIt = () => {
    onClose();
    setActiveView('thirty-day');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <GlassCard glowColor="red" className="max-w-2xl w-full border-accent-red/50 space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent-red/30 pb-4">
          <div className="flex items-center gap-2 text-accent-red font-mono text-sm font-bold uppercase tracking-widest">
            <Flame className="w-5 h-5 animate-bounce" /> AI ROAST REPORT 🔥
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface border border-border-subtle text-text-muted hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roast Content */}
        <div className="bg-void p-6 rounded-2xl border border-accent-red/20 text-sm font-mono text-text-primary leading-relaxed whitespace-pre-line shadow-inner max-h-[60vh] overflow-y-auto">
          {roastText}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-text-muted flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-accent-amber" /> Constructive AI assessment based on daily inputs.
          </div>
          <button
            onClick={handleFixIt}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-red text-white text-xs font-mono font-bold tracking-wider shadow-glow-red flex items-center justify-center gap-2 hover:scale-105 transition-all"
          >
            FIX IT — START 30-DAY SHIFT <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
