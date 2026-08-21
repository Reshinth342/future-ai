import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error in AI Time Machine 3.0:", error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0a0a0f] border border-red-500/30 space-y-4 shadow-2xl">
            <div className="text-4xl">⚠️</div>
            <h2 className="font-display text-2xl font-bold text-red-500">SIMULATION ENGINE RUNTIME FAILURE</h2>
            <p className="text-xs text-slate-400 font-body leading-relaxed">
              An unexpected runtime error occurred. You can reset your session cache to restore the AI Time Machine 3.0 state instantly.
            </p>
            <div className="p-3 rounded-xl bg-black border border-white/10 text-[11px] text-red-400 text-left font-mono overflow-auto max-h-32">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-blue-500 transition-colors"
            >
              Reset Session & Restore Demo →
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
