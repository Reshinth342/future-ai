import type { SimulationResult, FutureSelfMessage, DailyJournalEntry, LetterToSelf, WeeklyCheckin, AccountabilityPartner } from '../types/simulation';
import { defaultSimulationResult } from '../data/demoData';
import { aiEngine } from './aiEngine';

const makeSampleSimulation = () => aiEngine.generateLocalSimulation(defaultSimulationResult.userProfile);

const KEYS = {
  CURRENT_SIMULATION: 'atm_current_simulation',
  SIMULATION_HISTORY: 'atm_simulation_history',
  CHAT_MESSAGES: 'atm_chat_messages',
  DAILY_LOGS: 'atm_daily_logs',
  LETTER_TO_SELF: 'atm_letter_to_self',
  WEEKLY_CHECKINS: 'atm_weekly_checkins',
  ACCOUNTABILITY: 'atm_accountability',
  API_KEY: 'atm_anthropic_api_key'
};

export const storageService = {
  getCurrentSimulation(): SimulationResult {
    try {
      const raw = localStorage.getItem(KEYS.CURRENT_SIMULATION);
      if (!raw || raw === 'undefined' || raw === 'null') {
        return makeSampleSimulation();
      }
      const parsed = JSON.parse(raw);
      if (parsed && parsed.scenarios && parsed.scenarios.unchanged && parsed.userProfile) {
        if (parsed.id === defaultSimulationResult.id) return makeSampleSimulation();
        return parsed;
      }
    } catch (e) {
      console.warn('Error reading current simulation from localStorage:', e);
    }
    return makeSampleSimulation();
  },

  saveCurrentSimulation(sim: SimulationResult): void {
    try {
      localStorage.setItem(KEYS.CURRENT_SIMULATION, JSON.stringify(sim));
      this.addHistoryEntry(sim);
    } catch (e) {
      console.warn('Error saving simulation to localStorage:', e);
    }
  },

  getHistory(): SimulationResult[] {
    try {
      const raw = localStorage.getItem(KEYS.SIMULATION_HISTORY);
      if (!raw || raw === 'undefined' || raw === 'null') return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter(item => item.id !== defaultSimulationResult.id);
    } catch {}
    return [];
  },

  addHistoryEntry(sim: SimulationResult): void {
    try {
      const history = this.getHistory();
      const existingIdx = history.findIndex(h => h.id === sim.id);
      if (existingIdx >= 0) {
        history[existingIdx] = sim;
      } else {
        history.unshift(sim);
      }
      localStorage.setItem(KEYS.SIMULATION_HISTORY, JSON.stringify(history));
    } catch {}
  },

  getChatMessages(simId: string, scenario: string): FutureSelfMessage[] {
    try {
      const raw = localStorage.getItem(`${KEYS.CHAT_MESSAGES}_${simId}_${scenario}`);
      if (!raw || raw === 'undefined' || raw === 'null') {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [];
  },

  saveChatMessage(simId: string, scenario: string, message: FutureSelfMessage): FutureSelfMessage[] {
    const msgs = this.getChatMessages(simId, scenario);
    msgs.push(message);
    try {
      localStorage.setItem(`${KEYS.CHAT_MESSAGES}_${simId}_${scenario}`, JSON.stringify(msgs));
    } catch {}
    return msgs;
  },

  getDailyLogs(): DailyJournalEntry[] {
    try {
      const raw = localStorage.getItem(KEYS.DAILY_LOGS);
      if (!raw || raw === 'undefined' || raw === 'null') return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [];
  },

  addDailyLog(log: DailyJournalEntry): DailyJournalEntry[] {
    const logs = this.getDailyLogs();
    logs.unshift(log);
    try {
      localStorage.setItem(KEYS.DAILY_LOGS, JSON.stringify(logs));
    } catch {}
    return logs;
  },

  getLetterToSelf(): LetterToSelf | null {
    try {
      const raw = localStorage.getItem(KEYS.LETTER_TO_SELF);
      if (!raw || raw === 'undefined' || raw === 'null') return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.content) return parsed;
    } catch {}
    return null;
  },

  saveLetterToSelf(letter: LetterToSelf): void {
    try {
      localStorage.setItem(KEYS.LETTER_TO_SELF, JSON.stringify(letter));
    } catch {}
  },

  getWeeklyCheckins(): WeeklyCheckin[] {
    try {
      const raw = localStorage.getItem(KEYS.WEEKLY_CHECKINS);
      if (!raw || raw === 'undefined' || raw === 'null') return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [];
  },

  addWeeklyCheckin(checkin: WeeklyCheckin): WeeklyCheckin[] {
    const checkins = this.getWeeklyCheckins();
    checkins.push(checkin);
    try {
      localStorage.setItem(KEYS.WEEKLY_CHECKINS, JSON.stringify(checkins));
    } catch {}
    return checkins;
  },

  getAccountabilityPartner(): AccountabilityPartner | null {
    try {
      const raw = localStorage.getItem(KEYS.ACCOUNTABILITY);
      if (!raw || raw === 'undefined' || raw === 'null') return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) return parsed;
    } catch {}
    return null;
  },

  saveAccountabilityPartner(partner: AccountabilityPartner): void {
    try {
      localStorage.setItem(KEYS.ACCOUNTABILITY, JSON.stringify(partner));
    } catch {}
  },

  getApiKey(): string {
    try {
      return localStorage.getItem(KEYS.API_KEY) || '';
    } catch {
      return '';
    }
  },

  saveApiKey(key: string): void {
    try {
      localStorage.setItem(KEYS.API_KEY, key);
    } catch {}
  }
};
