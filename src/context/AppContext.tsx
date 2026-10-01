import React, { createContext, useContext, useState } from 'react';
import type { SimulationResult, UserProfile, ScenarioKey, YearKey, ThirtyDayMission, DailyJournalEntry, LetterToSelf, WeeklyCheckin, AccountabilityPartner } from '../types/simulation';
import { storageService } from '../services/storageService';
import { aiEngine } from '../services/aiEngine';
import { soundFx } from '../services/audioService';

export type ActiveView = 
  | 'landing' 
  | 'onboarding' 
  | 'loading' 
  | 'command-center' 
  | 'future-self' 
  | 'thirty-day' 
  | 'journal' 
  | 'letter' 
  | 'dashboard';

interface AppContextType {
  simulation: SimulationResult;
  activeScenario: ScenarioKey;
  activeYear: YearKey;
  activeView: ActiveView;
  isMuted: boolean;
  apiKey: string;
  isGenerating: boolean;
  currentStep: number;
  onboardingProfile: Partial<UserProfile>;
  
  // Actions
  setActiveView: (view: ActiveView) => void;
  setActiveScenario: (scenario: ScenarioKey) => void;
  setActiveYear: (year: YearKey) => void;
  toggleMute: () => void;
  setApiKey: (key: string) => void;
  updateOnboardingProfile: (data: Partial<UserProfile>) => void;
  nextOnboardingStep: () => void;
  prevOnboardingStep: () => void;
  startOnboarding: () => void;
  generateSimulationFromProfile: (profile: UserProfile) => Promise<void>;
  toggleThirtyDayMission: (day: number) => void;
  addDailyJournalLog: (log: Omit<DailyJournalEntry, 'id'>) => void;
  saveLetterToFutureSelf: (letter: Omit<LetterToSelf, 'id'>) => void;
  addWeeklyCheckinEntry: (checkin: Omit<WeeklyCheckin, 'id'>) => void;
  savePartnerCommitment: (partner: AccountabilityPartner) => void;
  loadDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulation, setSimulation] = useState<SimulationResult>(() => storageService.getCurrentSimulation());
  const [activeScenario, setActiveScenarioState] = useState<ScenarioKey>('onePercent');
  const [activeYear, setActiveYearState] = useState<YearKey>('2028');
  const [activeView, setActiveViewState] = useState<ActiveView>('landing');
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.isMuted());
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return storageService.getApiKey() || (import.meta.env.VITE_ANTHROPIC_API_KEY as string) || '';
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [onboardingProfile, setOnboardingProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: 21,
    country: 'India',
    role: 'IT Student',
    education: 'College',
    socialMediaHours: 3,
    sleepHours: 7,
    learningHours: 1,
    exerciseFreq: '1-2x/week',
    focusRating: 5,
    consistencyRating: 5,
    goalStatement: '',
    targetCareer: '',
    targetIncome: '',
    targetYear: '2027',
    biggestSkill: '',
    digitalHabits: [],
    mentalPatterns: [],
    positiveHabits: [],
    customHabits: [],
    negativeSeverity: {},
    startYear: '2026',
    horizonYears: '5 Years',
    scaredScenario: '',
    fiveYearReflection: ''
  });

  const setActiveView = (view: ActiveView) => {
    soundFx.playClick();
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveScenario = (scenario: ScenarioKey) => {
    soundFx.playNodeSelect();
    setActiveScenarioState(scenario);
  };

  const setActiveYear = (year: YearKey) => {
    soundFx.playNodeSelect();
    setActiveYearState(year);
  };

  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const setApiKey = (key: string) => {
    storageService.saveApiKey(key);
    setApiKeyState(key);
  };

  const updateOnboardingProfile = (data: Partial<UserProfile>) => {
    setOnboardingProfile(prev => ({ ...prev, ...data }));
  };

  const startOnboarding = () => {
    setCurrentStep(1);
    setActiveView('onboarding');
  };

  const nextOnboardingStep = () => {
    soundFx.playClick();
    setCurrentStep(prev => Math.min(6, prev + 1));
  };

  const prevOnboardingStep = () => {
    soundFx.playClick();
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const generateSimulationFromProfile = async (fullProfile: UserProfile) => {
    setIsGenerating(true);
    setActiveViewState('loading');
    
    try {
      const result = await aiEngine.generateSimulation(fullProfile, apiKey);
      setSimulation(result);
      storageService.saveCurrentSimulation(result);
      soundFx.playSuccessChime();
    } catch (err) {
      console.error('Error generating simulation:', err);
    } finally {
      setIsGenerating(false);
      setActiveViewState('command-center');
    }
  };

  const toggleThirtyDayMission = (dayNumber: number) => {
    soundFx.playClick();
    setSimulation(prev => {
      const updatedPlan: ThirtyDayMission[] = prev.thirtyDayPlan.map(item => {
        if (item.day === dayNumber) {
          const nextStatus = item.status === 'completed' ? 'pending' : 'completed';
          if (nextStatus === 'completed') soundFx.playSuccessChime();
          return { ...item, status: nextStatus };
        }
        return item;
      });
      const updatedSim = { ...prev, thirtyDayPlan: updatedPlan };
      storageService.saveCurrentSimulation(updatedSim);
      return updatedSim;
    });
  };

  const addDailyJournalLog = (logData: Omit<DailyJournalEntry, 'id'>) => {
    soundFx.playClick();
    const newLog: DailyJournalEntry = {
      ...logData,
      id: `log_${Date.now()}`
    };
    storageService.addDailyLog(newLog);
    setSimulation(prev => {
      const updatedSim = { ...prev, dailyLogs: [...(prev.dailyLogs || []), newLog] };
      storageService.saveCurrentSimulation(updatedSim);
      return updatedSim;
    });
  };

  const saveLetterToFutureSelf = (letterData: Omit<LetterToSelf, 'id'>) => {
    soundFx.playSuccessChime();
    const newLetter: LetterToSelf = {
      ...letterData,
      id: `letter_${Date.now()}`
    };
    storageService.saveLetterToSelf(newLetter);
    setSimulation(prev => {
      const updatedSim = { ...prev, letterToSelf: newLetter };
      storageService.saveCurrentSimulation(updatedSim);
      return updatedSim;
    });
  };

  const addWeeklyCheckinEntry = (checkinData: Omit<WeeklyCheckin, 'id'>) => {
    soundFx.playClick();
    const newCheckin: WeeklyCheckin = {
      ...checkinData,
      id: `checkin_${Date.now()}`
    };
    storageService.addWeeklyCheckin(newCheckin);
    setSimulation(prev => {
      const updatedSim = { ...prev, weeklyCheckins: [...(prev.weeklyCheckins || []), newCheckin] };
      storageService.saveCurrentSimulation(updatedSim);
      return updatedSim;
    });
  };

  const savePartnerCommitment = (partner: AccountabilityPartner) => {
    soundFx.playSuccessChime();
    storageService.saveAccountabilityPartner(partner);
  };

  const loadDemoData = () => {
    soundFx.playClick();
    const demo = storageService.getCurrentSimulation();
    setSimulation(demo);
    setActiveView('command-center');
  };

  return (
    <AppContext.Provider
      value={{
        simulation,
        activeScenario,
        activeYear,
        activeView,
        isMuted,
        apiKey,
        isGenerating,
        currentStep,
        onboardingProfile,
        setActiveView,
        setActiveScenario,
        setActiveYear,
        toggleMute,
        setApiKey,
        updateOnboardingProfile,
        nextOnboardingStep,
        prevOnboardingStep,
        startOnboarding,
        generateSimulationFromProfile,
        toggleThirtyDayMission,
        addDailyJournalLog,
        saveLetterToFutureSelf,
        addWeeklyCheckinEntry,
        savePartnerCommitment,
        loadDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
