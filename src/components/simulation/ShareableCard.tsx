import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import type { SimulationResult } from '../../types/simulation';
import { Download, Copy, Share2, Check, Zap } from 'lucide-react';
import { soundFx } from '../../services/audioService';

interface ShareableCardProps {
  simulation: SimulationResult;
}

export const ShareableCard: React.FC<ShareableCardProps> = ({ simulation }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const profile = simulation.userProfile;
  const unchanged = simulation.scenarios.unchanged;
  const onePercent = simulation.scenarios.onePercent;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      soundFx.playClick();
      setIsExporting(true);
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#fffdf8',
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `AITimeMachine_FutureCard_${profile.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      soundFx.playSuccessChime();
    } catch (err) {
      console.error('Error exporting image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToX = () => {
    const text = encodeURIComponent(`I used a personal planning studio to think through a couple of what-if scenarios. They are prompts, not predictions.
  Try it yourself:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* CARD ELEMENT TO EXPORT */}
      <div
        ref={cardRef}
        className="p-8 rounded-xl bg-[#fffdf8] border border-border-subtle shadow-xl space-y-6 max-w-xl mx-auto font-body relative overflow-hidden"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-bold text-text-primary uppercase">FUTURE / IN PROGRESS · WHAT-IF</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan font-bold">NOT A FORECAST</span>
        </div>

        {/* User Identity */}
        <div>
          <h3 className="font-display text-2xl font-bold text-white">{profile.name}, {profile.age}</h3>
          <div className="text-xs text-text-muted mt-0.5">{profile.role} · {profile.country}</div>
          <div className="text-xs text-accent-gold mt-1 font-semibold">A goal I am thinking about: "{profile.goalStatement}"</div>
        </div>

        {/* 2 Path Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-void border border-accent-red/30 space-y-2">
            <div className="text-[10px] text-accent-red font-bold uppercase">A SIMILAR ROUTINE</div>
            <div className="text-sm font-semibold text-text-primary">{unchanged.subtitle}</div>
            <div className="text-[11px] text-text-secondary">{unchanged.criticalMilestones?.[0]}</div>
          </div>

          <div className="p-4 rounded-2xl bg-void border border-accent-cyan/30 space-y-2">
            <div className="text-[10px] text-accent-cyan font-bold uppercase">A SMALL STEADY CHANGE</div>
            <div className="text-sm font-semibold text-text-primary">{onePercent.subtitle}</div>
            <div className="text-[11px] text-text-secondary">{onePercent.criticalMilestones?.[0]}</div>
          </div>
        </div>

        {/* Quote Line */}
        <div className="text-center pt-2 border-t border-border-subtle space-y-1">
          <p className="text-xs text-text-primary font-body">
            These are reflection prompts based on my own entries, not predictions or advice.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs max-w-xl mx-auto">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="px-4 py-2.5 rounded-xl bg-accent-blue text-white font-semibold shadow-glow-blue flex items-center gap-1.5 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" /> {isExporting ? 'Exporting...' : 'Download Card'}
        </button>

        <button
          onClick={handleCopyLink}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Link Copied!' : 'Copy app link'}
        </button>

        <button
          onClick={shareToX}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Share2 className="w-4 h-4 text-accent-cyan" /> Share to X
        </button>

        <button
          onClick={shareToLinkedIn}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Share2 className="w-4 h-4 text-accent-blue" /> Share to LinkedIn
        </button>
      </div>
    </div>
  );
};
