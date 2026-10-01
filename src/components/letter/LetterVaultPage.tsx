import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { soundFx } from '../../services/audioService';

export const LetterVaultPage: React.FC = () => {
  const { simulation, saveLetterToFutureSelf } = useApp();
  const letter = simulation.letterToSelf;

  const [content, setContent] = useState<string>(letter?.content || '');
  const [deliverYear, setDeliverYear] = useState<string>('2031');
  const [isSaved, setIsSaved] = useState<boolean>(!!letter);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    soundFx.playSuccessChime();
    saveLetterToFutureSelf({
      content,
      writtenDate: new Date().toISOString(),
      deliveryDate: `${deliverYear}-01-01`,
      deliverOption: deliverYear === '2031' ? '5_years' : deliverYear === '2027' ? '1_year' : '6_months',
      isOpened: false
    });
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 relative font-mono">
      {/* BENTO HEADER */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs text-accent-gold uppercase tracking-widest flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent-gold" /> A NOTE FOR LATER
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            A letter to read again
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Saved in this browser. Come back on your chosen date to read it; no reminder or email is sent.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-void border border-border-subtle p-4 rounded-2xl">
          <Lock className={`w-6 h-6 ${isSaved ? 'text-accent-green' : 'text-text-muted'}`} />
          <div className="text-xs">
            <div className="text-text-muted">LETTER STATUS</div>
            <div className={`font-bold ${isSaved ? 'text-accent-green' : 'text-accent-amber'}`}>
              {isSaved ? 'SAVED IN THIS BROWSER' : 'DRAFT IN PROGRESS'}
            </div>
          </div>
        </div>
      </div>

      {/* BENTO MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bento Tile 1: Options & Vault Settings (1 Col) */}
        <div className="bento-card p-6 space-y-6">
          <div className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5 border-b border-border-subtle pb-3">
            <Sparkles className="w-4 h-4 text-accent-gold" /> VAULT CONFIGURATION
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-text-muted uppercase mb-1">Choose a year to revisit</label>
              <select
                value={deliverYear}
                onChange={e => setDeliverYear(e.target.value)}
                disabled={isSaved}
                className="w-full bg-void border border-border-subtle rounded-xl p-3 text-white focus:outline-none focus:border-accent-gold"
              >
                <option value="2027">2027 (+1 Year)</option>
                <option value="2028">2028 (+2 Years)</option>
                <option value="2029">2029 (+3 Years)</option>
                <option value="2030">2030 (+4 Years)</option>
                <option value="2031">2031 (+5 years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bento Tile 2: Letter Composer / Vault Card (2 Cols) */}
        <div className="bento-card lg:col-span-2 p-6 sm:p-8 space-y-4">
          <div className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1.5 border-b border-border-subtle pb-3">
            <Mail className="w-4 h-4 text-accent-gold" /> YOUR NOTE
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <textarea
              rows={12}
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={isSaved}
              placeholder={`A note to myself in ${deliverYear}...`}
              className="w-full bg-void border border-border-subtle rounded-2xl p-4 text-white leading-relaxed focus:outline-none focus:border-accent-gold"
            />

            <div className="flex justify-between items-center pt-2">
              {isSaved ? (
                <button
                  type="button"
                  onClick={() => setIsSaved(false)}
                  className="px-6 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs"
                >
                  UNSEAL TO EDIT 🔓
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="px-8 py-3 rounded-2xl bg-accent-gold text-void font-bold text-xs shadow-glow-gold disabled:opacity-40 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" /> SEAL LETTER IN VAULT 🔒
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
