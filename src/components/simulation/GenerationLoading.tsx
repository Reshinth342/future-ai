import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GenerationLoading: React.FC = () => {
  const { apiKey } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center p-6 text-center">
      <div className="bento-card w-full max-w-lg space-y-6 p-8 sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-cyan/10 text-accent-cyan">
          <LoaderCircle className="h-7 w-7 animate-spin" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Putting your notes together</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary" role="status" aria-live="polite">
            {apiKey
              ? 'Your optional AI request may take a little longer. The result is still a reflection exercise, not a forecast.'
              : 'Preparing a few planning prompts from the details you entered.'}
          </p>
        </div>
      </div>
    </div>
  );
};
