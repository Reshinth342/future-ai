import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
    <div className="min-h-screen bg-transparent text-text-primary flex flex-col font-body relative overflow-x-hidden">
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
          <span>FUTURE / IN PROGRESS</span>
          <span>·</span>
          <span>A planning prompt, not a promise.</span>
        </div>
        <div className="text-[11px] text-text-muted">
          Scenarios are reflective examples, not forecasts, financial advice, or guaranteed outcomes.
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
