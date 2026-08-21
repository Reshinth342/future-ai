import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import type { ScenarioKey, YearKey, FutureSelfMessage } from '../../types/simulation';
import { storageService } from '../../services/storageService';
import { aiEngine } from '../../services/aiEngine';
import { soundFx } from '../../services/audioService';
import { Send, Sparkles, Zap, MessageSquare, Bot, User } from 'lucide-react';

const PRESET_QUESTIONS = [
  "What changed everything?",
  "What was my biggest mistake?",
  "What should I stop doing now?",
  "Was the sacrifice worth it?",
  "What skill mattered most?",
  "What do you wish you'd started earlier?",
  "How did you handle failure?",
  "What would you tell 21-year-old me?",
  "Did I achieve my goal?",
  "What does your life look like now?"
];

export const FutureSelfChat: React.FC = () => {
  const { simulation, activeScenario, apiKey } = useApp();
  const profile = simulation.userProfile;
  const [selectedYear, setSelectedYear] = useState<YearKey>('2031');
  const [messages, setMessages] = useState<FutureSelfMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scenarioMeta: Record<ScenarioKey, { title: string; color: string; hex: string; orbBg: string }> = {
    unchanged: { title: '💀 UNCHANGED', color: 'text-accent-red', hex: '#ef4444', orbBg: 'from-accent-red via-red-900 to-black' },
    reality: { title: '📍 REALITY', color: 'text-accent-amber', hex: '#f59e0b', orbBg: 'from-accent-amber via-amber-900 to-black' },
    onePercent: { title: '🚀 1% BETTER', color: 'text-accent-cyan', hex: '#06b6d4', orbBg: 'from-accent-cyan via-cyan-900 to-black' },
    goalAchieved: { title: '🎯 GOAL ACHIEVED', color: 'text-accent-gold', hex: '#eab308', orbBg: 'from-accent-gold via-yellow-900 to-black' },
    dream: { title: '🌙 DREAM SCENARIO', color: 'text-accent-violet', hex: '#8b5cf6', orbBg: 'from-accent-violet via-purple-900 to-black' }
  };

  const meta = scenarioMeta[activeScenario];

  // Load chat messages when scenario or simulation changes
  useEffect(() => {
    const existing = storageService.getChatMessages(simulation.id, activeScenario);
    if (existing.length > 0) {
      setMessages(existing);
    } else {
      const initialGreeting: FutureSelfMessage = {
        id: `msg_init_${Date.now()}`,
        scenario: activeScenario,
        year: selectedYear,
        sender: 'future_self',
        text: `You made it to ${selectedYear}.

I know you have questions. So did I, sitting where you are in 2026.

Ask me anything. But I should warn you — I'm going to be honest in ways the 21-year-old you might not want to hear.`,
        timestamp: new Date().toISOString()
      };
      setMessages([initialGreeting]);
      storageService.saveChatMessage(simulation.id, activeScenario, initialGreeting);
    }
  }, [simulation.id, activeScenario, selectedYear]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isTyping) return;

    soundFx.playClick();
    const userMsg: FutureSelfMessage = {
      id: `msg_user_${Date.now()}`,
      scenario: activeScenario,
      year: selectedYear,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    const updated = storageService.saveChatMessage(simulation.id, activeScenario, userMsg);
    setMessages(updated);
    setInputPrompt('');
    setIsTyping(true);

    soundFx.playTelemetryTick();
    const responseText = await aiEngine.generateFutureSelfResponse(text, profile, activeScenario, selectedYear, apiKey);
    const fsMsg: FutureSelfMessage = {
      id: `msg_fs_${Date.now()}`,
      scenario: activeScenario,
      year: selectedYear,
      sender: 'future_self',
      text: responseText,
      timestamp: new Date().toISOString()
    };
    const finalMsgs = storageService.saveChatMessage(simulation.id, activeScenario, fsMsg);
    setMessages(finalMsgs);
    setIsTyping(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative font-mono">
      {/* BENTO HEADER DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bento Tile 1: Avatar Orb Persona Card */}
        <div className="bento-card p-6 flex items-center gap-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${meta.orbBg} p-1 shadow-2xl animate-pulse`}>
              <div className="w-full h-full bg-void rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-accent-green border-2 border-void animate-ping" />
          </div>
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-widest">PERSONA SIMULATION</div>
            <h2 className="font-display text-xl font-bold text-white">{profile.name.toUpperCase()} ({selectedYear})</h2>
            <div className="text-xs text-text-secondary mt-0.5" style={{ color: meta.hex }}>
              {meta.title} TIMELINE
            </div>
          </div>
        </div>

        {/* Bento Tile 2: Year Selector */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-text-muted uppercase tracking-widest">TIMELINE YEAR HORIZON</span>
          <div className="flex items-center gap-2">
            {(['2027', '2029', '2031'] as YearKey[]).map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedYear === yr ? 'bg-white text-void border-white' : 'bg-void text-text-muted border-border-subtle hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Tile 3: Live API Status */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-text-muted uppercase tracking-widest">AI TELEMETRY STREAM</span>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent-cyan" /> Engine: {apiKey ? 'Claude 3.5 Sonnet' : 'Local Neural Engine'}
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${apiKey ? 'bg-accent-green/20 text-accent-green border-accent-green/40' : 'bg-white/10 text-text-muted border-white/20'}`}>
              {apiKey ? 'API LIVE' : 'LOCAL'}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN BENTO CHAT TERMINAL (Full Width) */}
      <div className="bento-card p-6 sm:p-8 space-y-6 flex flex-col h-[520px]">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <MessageSquare className="w-4 h-4 text-accent-violet" />
            <span>COMMUNICATION CHANNEL: {selectedYear} FUTURE SELF</span>
          </div>
          <span className="text-[10px] text-accent-cyan animate-pulse">STREAM ACTIVE</span>
        </div>

        {/* Messages Scroll Thread */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'future_self' && (
                <div className="w-8 h-8 rounded-full bg-surface border border-white/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-accent-cyan" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-accent-blue text-white rounded-br-none shadow-glow-blue'
                    : 'bg-surface border border-border-subtle text-text-primary rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent-blue/30 border border-accent-blue/50 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <div className="w-8 h-8 rounded-full bg-surface border border-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-cyan animate-spin" />
              </div>
              <span className="animate-pulse">Future Self is receiving telemetry and typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Prompt Box */}
        <div className="pt-2 border-t border-border-subtle flex gap-2">
          <input
            type="text"
            placeholder={`Ask your ${selectedYear} self anything...`}
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-void border border-border-subtle rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent-violet"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isTyping}
            className="px-6 py-3 rounded-2xl bg-accent-violet text-white font-bold text-xs shadow-glow-violet disabled:opacity-40 flex items-center gap-2"
          >
            <span>SEND</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BENTO TILE: SUGGESTED QUESTIONS PILL GRID */}
      <div className="bento-card p-6 space-y-3">
        <span className="text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> RECOMMENDED PROMPT PILLS
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3.5 py-2 rounded-xl bg-void border border-border-subtle text-text-secondary text-xs hover:text-white hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
