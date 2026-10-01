import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import type { ScenarioKey, YearKey, FutureSelfMessage } from '../../types/simulation';
import { storageService } from '../../services/storageService';
import { aiEngine } from '../../services/aiEngine';
import { soundFx } from '../../services/audioService';
import { Send, Sparkles, Zap, MessageSquare, Bot, User } from 'lucide-react';

const PRESET_QUESTIONS = [
  "What is one small change I could test?",
  "What part of my routine is already working?",
  "How could I make time for this goal?",
  "What is a realistic first milestone?",
  "What might get in the way this week?",
  "How can I make this plan easier to repeat?",
  "What would I like to learn next?",
  "What can I change if this plan does not fit?",
  "What should I check in on next month?",
  "What would a good-enough week look like?"
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
    unchanged: { title: 'SIMILAR ROUTINE', color: 'text-accent-red', hex: '#b8424c', orbBg: 'from-accent-red via-red-100 to-white' },
    reality: { title: 'CURRENT STARTING POINT', color: 'text-accent-amber', hex: '#a65f16', orbBg: 'from-accent-amber via-amber-100 to-white' },
    onePercent: { title: 'SMALL STEADY CHANGE', color: 'text-accent-cyan', hex: '#147e78', orbBg: 'from-accent-cyan via-teal-100 to-white' },
    goalAchieved: { title: 'GOAL-FOCUSED ROUTE', color: 'text-accent-gold', hex: '#99700e', orbBg: 'from-accent-gold via-yellow-100 to-white' },
    dream: { title: 'STRETCH IDEA', color: 'text-accent-violet', hex: '#7654a6', orbBg: 'from-accent-violet via-purple-100 to-white' }
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
        text: `Imagine checking in with yourself in ${selectedYear}. This is a writing prompt, not a message from your actual future.

      What would you want that version of you to ask about your routine, your goal, or the next small step?`,
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
            <div className="text-[10px] text-text-muted uppercase tracking-widest">IMAGINED REFLECTION</div>
            <h2 className="font-display text-xl font-bold text-white">{profile.name.toUpperCase()} ({selectedYear})</h2>
            <div className="text-xs text-text-secondary mt-0.5" style={{ color: meta.hex }}>
              {meta.title} TIMELINE
            </div>
          </div>
        </div>

        {/* Bento Tile 2: Year Selector */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-text-muted uppercase tracking-widest">CHOOSE AN EXAMPLE YEAR</span>
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
          <span className="text-[10px] text-text-muted uppercase tracking-widest">RESPONSE SOURCE</span>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent-cyan" /> {apiKey ? 'Anthropic API' : 'Local prompt guide'}
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${apiKey ? 'bg-accent-green/20 text-accent-green border-accent-green/40' : 'bg-white/10 text-text-muted border-white/20'}`}>
              {apiKey ? 'OPTIONAL API' : 'ON DEVICE'}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN BENTO CHAT TERMINAL (Full Width) */}
      <div className="bento-card p-6 sm:p-8 space-y-6 flex flex-col h-[520px]">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <MessageSquare className="w-4 h-4 text-accent-violet" />
            <span>REFLECTION EXERCISE · {selectedYear}</span>
          </div>
          <span className="text-[10px] text-accent-cyan">READY WHEN YOU ARE</span>
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
          <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> QUESTIONS TO GET STARTED
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
