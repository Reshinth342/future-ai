import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { NotebookPen, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RoastModeModalProps {
  roastText: string;
  onClose: () => void;
}

export const RoastModeModal: React.FC<RoastModeModalProps> = ({ roastText, onClose }) => {
  const { setActiveView } = useApp();

  const handleOpenPlan = () => {
    onClose();
    setActiveView('thirty-day');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <GlassCard className="max-w-2xl w-full space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2 text-accent-cyan font-mono text-sm font-bold uppercase tracking-widest">
            <NotebookPen className="w-5 h-5" /> ROUTINE CHECK-IN
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface border border-border-subtle text-text-muted hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-void p-6 rounded-xl border border-border-subtle text-sm font-body text-text-primary leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto">
          {roastText}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-text-muted flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-accent-amber" /> A short reflection based on the estimates you entered, not an assessment.
          </div>
          <button
            onClick={handleOpenPlan}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-blue text-white text-xs font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all"
          >
            Open my 30-day plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
