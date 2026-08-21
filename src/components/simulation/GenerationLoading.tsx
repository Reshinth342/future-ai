import React, { useEffect, useState } from 'react';
import { soundFx } from '../../services/audioService';

const LOG_STEPS = [
  'INITIALIZING TIME MACHINE v3.0...',
  '▸ ANALYZING YOUR CURRENT REALITY...',
  '▸ MAPPING HABIT TRAJECTORIES...',
  '▸ SIMULATING COMPOUND EFFECTS...',
  '▸ BUILDING 5 PARALLEL FUTURES...',
  '▸ CALCULATING DIVERGENCE POINTS...',
  '▸ GENERATING FUTURE SELF PERSONAS...',
  '▸ LOCKING TIMELINE...'
];

export const GenerationLoading: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < LOG_STEPS.length) {
        soundFx.playTelemetryTick();
        setCompletedSteps(prev => [...prev, LOG_STEPS[currentIdx]]);
        currentIdx++;
        setProgress(Math.floor((currentIdx / LOG_STEPS.length) * 100));
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center p-6 text-center font-mono select-none">
      {/* Upward particle stream simulation */}
      <div className="w-full max-w-lg space-y-6">
        <div className="text-xs text-accent-cyan tracking-widest uppercase animate-pulse">
          SIMULATION ENGINE RUNNING
        </div>

        {/* Bento Telemetry log output box */}
        <div className="bento-card p-6 sm:p-8 text-left space-y-3 shadow-2xl min-h-[240px]">
          {completedSteps.map((log, idx) => (
            <div key={idx} className="text-xs text-accent-cyan flex items-center gap-2">
              <span className="text-text-muted">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
              <span>{log}</span>
            </div>
          ))}
          {completedSteps.length < LOG_STEPS.length && (
            <div className="w-2 h-4 bg-accent-cyan inline-block animate-pulse" />
          )}
        </div>

        {/* Progress bar & percentage counter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-text-muted font-mono">
            <span>TIMELINE SYNCHRONIZATION</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border-subtle">
            <div
              className="h-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {progress === 100 && (
          <div className="text-sm font-bold text-accent-green tracking-widest uppercase animate-bounce pt-2">
            YOUR FUTURE IS READY.
          </div>
        )}
      </div>
    </div>
  );
};
