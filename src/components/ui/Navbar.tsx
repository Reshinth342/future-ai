import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, Key, Sparkles, Compass, MessageSquare, CalendarCheck, BookOpen, Mail, LayoutDashboard, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, isMuted, toggleMute, apiKey, setApiKey, startOnboarding } = useApp();
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [tempKey, setTempKey] = useState<string>(apiKey);

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  const navTabs = [
    { key: 'landing', label: 'Landing', icon: Compass, color: 'bg-accent-blue' },
    { key: 'command-center', label: 'Simulation', icon: Sparkles, color: 'bg-accent-blue' },
    { key: 'future-self', label: 'Future Self', icon: MessageSquare, color: 'bg-accent-violet' },
    { key: 'thirty-day', label: '30-Day Shift', icon: CalendarCheck, color: 'bg-accent-cyan' },
    { key: 'journal', label: 'Daily Log', icon: BookOpen, color: 'bg-accent-amber' },
    { key: 'letter', label: 'Letter', icon: Mail, color: 'bg-accent-gold' },
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'bg-white/20' }
  ];

  return (
    <>
      {/* Centered Compact Floating Pill Capsule Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="glass-panel px-3 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 shadow-2xl flex items-center justify-between backdrop-blur-3xl bg-[#040407]/85 font-mono text-xs">
          
          {/* Logo Brand Pill */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-blue via-accent-violet to-accent-cyan p-[1px] group-hover:scale-105 transition-transform shadow-glow-blue">
              <div className="w-full h-full bg-void rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent-cyan" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-mono text-[11px] font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                AI TIME MACHINE <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-blue/20 text-accent-cyan border border-accent-blue/30 font-mono">3.0</span>
              </div>
            </div>
          </div>

          {/* Centered Scrollable Pill Navigation Rail */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 px-1 scrollbar-none max-w-full">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeView === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveView(tab.key as any)}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 transition-all font-mono text-xs ${
                    isActive
                      ? `${tab.color} text-white font-bold shadow-lg scale-105`
                      : 'text-text-secondary hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Compact Action Pill Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio toggle */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white transition-colors"
              title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-accent-red" /> : <Volume2 className="w-3.5 h-3.5 text-accent-cyan" />}
            </button>

            {/* API Key Modal Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-2 rounded-full bg-white/5 border border-white/10 transition-colors flex items-center gap-1 ${
                apiKey ? 'text-accent-green border-accent-green/40' : 'text-text-muted hover:text-white'
              }`}
              title="Configure Anthropic API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{apiKey ? 'API Live' : 'API Key'}</span>
            </button>

            {/* CTA Pill */}
            <button
              onClick={startOnboarding}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan text-white text-[11px] font-bold tracking-wider hover:scale-105 transition-all shadow-glow-blue flex items-center gap-1"
            >
              ENTER →
            </button>
          </div>
        </div>
      </header>

      {/* Spacing spacer so content doesn't overlap header */}
      <div className="h-16" />

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full border border-white/20 rounded-3xl relative">
            <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-accent-violet" /> Anthropic API Configuration
            </h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed font-mono">
              AI Time Machine 3.0 includes an intelligent spatial simulation generator. Optionally provide your Anthropic API key (<code className="text-accent-cyan">claude-sonnet-4-6</code>) for live streaming completions.
            </p>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              className="w-full bg-void border border-white/15 rounded-2xl px-4 py-3 text-sm font-mono text-white mb-4 focus:outline-none focus:border-accent-violet"
            />
            <div className="flex justify-end gap-2 font-mono">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-full bg-white/10 text-xs text-text-secondary hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 rounded-full bg-accent-violet text-white text-xs font-semibold shadow-glow-violet"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
