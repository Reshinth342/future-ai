import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'violet' | 'cyan' | 'amber' | 'red' | 'gold' | 'green' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick
}) => {
  const glowMap = {
    blue: 'border-accent-blue/30 hover:border-accent-blue/60 hover:shadow-glow-blue',
    violet: 'border-accent-violet/30 hover:border-accent-violet/60 hover:shadow-glow-violet',
    cyan: 'border-accent-cyan/30 hover:border-accent-cyan/60 hover:shadow-glow-cyan',
    amber: 'border-accent-amber/30 hover:border-accent-amber/60 hover:shadow-glow-amber',
    red: 'border-accent-red/30 hover:border-accent-red/60 hover:shadow-glow-red',
    gold: 'border-accent-gold/30 hover:border-accent-gold/60 hover:shadow-glow-gold',
    green: 'border-emerald-500/30 hover:border-emerald-500/60',
    none: 'border-border-subtle hover:border-white/20'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${glowMap[glowColor]} ${
        onClick ? 'cursor-pointer hover:-translate-y-1.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
