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
    { key: 'landing', label: 'Overview', icon: Compass, color: 'bg-accent-blue' },
    { key: 'command-center', label: 'Scenarios', icon: Sparkles, color: 'bg-accent-blue' },
    { key: 'future-self', label: 'Reflection', icon: MessageSquare, color: 'bg-accent-violet' },
    { key: 'thirty-day', label: '30-day plan', icon: CalendarCheck, color: 'bg-accent-cyan' },
    { key: 'journal', label: 'Journal', icon: BookOpen, color: 'bg-accent-amber' },
    { key: 'letter', label: 'Letters', icon: Mail, color: 'bg-accent-gold' },
    { key: 'dashboard', label: 'My board', icon: LayoutDashboard, color: 'bg-accent-blue' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full px-3 sm:px-6">
        <div className="store-nav mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-2 py-3 sm:px-0">
          
          {/* Logo Brand Pill */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="brand-mark group-hover:rotate-[-6deg] transition-transform">
              <div className="brand-mark-inner">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold text-text-primary uppercase">
                FUTURE <span className="text-accent-cyan">/</span> IN PROGRESS
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
                  className={`nav-tab px-3 py-2 rounded-full flex items-center gap-1.5 shrink-0 transition-all text-xs ${
                    isActive
                      ? `${tab.color} text-white font-bold shadow-lg scale-105`
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-dark'
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
              className="utility-button"
              title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-accent-red" /> : <Volume2 className="w-3.5 h-3.5 text-accent-cyan" />}
            </button>

            {/* API Key Modal Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`utility-button flex items-center gap-1 ${
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
              className="plan-button px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            >
              Start here <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacing spacer so content doesn't overlap header */}
      <div className="h-16 sm:h-20" />

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel key-modal p-6 max-w-md w-full relative">
            <h3 className="font-display text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-accent-violet" /> Anthropic API Configuration
            </h3>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Optional. Your key is saved in this browser and sent directly to Anthropic when you request a response. For a public app, use a server-side key instead of entering a private one here.
            </p>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm mb-4 focus:outline-none focus:border-accent-violet"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-full bg-surface-dark text-xs text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 rounded-full bg-accent-blue text-white text-xs font-semibold"
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
