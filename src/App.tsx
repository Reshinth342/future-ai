import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ParticleField } from './components/ui/ParticleField';
import { Navbar } from './components/ui/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { StepWizard } from './components/onboarding/StepWizard';
import { GenerationLoading } from './components/simulation/GenerationLoading';
import { TimelineCommandCenter } from './components/simulation/TimelineCommandCenter';
import { FutureSelfChat } from './components/future-self/FutureSelfChat';
import { ThirtyDayTracker } from './components/thirty-day/ThirtyDayTracker';
import { JournalPage } from './components/journal/JournalPage';
import { LetterVaultPage } from './components/letter/LetterVaultPage';
import { DashboardPage } from './components/dashboard/DashboardPage';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-void text-text-primary flex flex-col font-body selection:bg-accent-blue/30 selection:text-white relative overflow-x-hidden">
      {/* Particle Canvas Background */}
      <ParticleField />

      {/* Main Header Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'onboarding' && <StepWizard />}
        {activeView === 'loading' && <GenerationLoading />}
        {activeView === 'command-center' && <TimelineCommandCenter />}
        {activeView === 'future-self' && <FutureSelfChat />}
        {activeView === 'thirty-day' && <ThirtyDayTracker />}
        {activeView === 'journal' && <JournalPage />}
        {activeView === 'letter' && <LetterVaultPage />}
        {activeView === 'dashboard' && <DashboardPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-subtle bg-void/90 py-8 px-4 text-center font-mono text-xs text-text-muted space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-secondary">
          <span>AI TIME MACHINE · v3.0</span>
          <span>·</span>
          <span>"Your habits are a vote for who you're becoming."</span>
        </div>
        <div className="text-[11px] text-text-muted">
          AI-generated scenarios are simulations, not predictions or guaranteed professional advice.
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
