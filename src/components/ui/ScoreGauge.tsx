import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  color?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'md',
  label = 'AI SCENARIO SCORE',
  color = '#3b82f6'
}) => {
  const radius = size === 'lg' ? 60 : size === 'md' ? 45 : 30;
  const strokeWidth = size === 'lg' ? 10 : size === 'md' ? 8 : 5;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dim = radius * 2;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg height={dim} width={dim} className="transform -rotate-90">
          <circle
            stroke="rgba(255,255,255,0.08)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-bold ${size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-sm'}`}>
            {score}
          </span>
          <span className="text-[10px] text-text-muted font-mono">/100</span>
        </div>
      </div>
      {label && (
        <span className="text-[11px] font-mono tracking-wider text-text-muted mt-2 uppercase">
          {label}
        </span>
      )}
    </div>
  );
};
