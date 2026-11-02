import React, { Component, ErrorInfo, ReactNode } from 'react';

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
    console.error('Uncaught error in AURA FLORALE:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center p-6 text-[#26232E] font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-purple-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center text-3xl mx-auto">
              🌸
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-[#26232E]">
                AURA FLORALE
              </h1>
              <p className="text-xs text-[#5E5968] leading-relaxed">
                Произошла ошибка при загрузке приложения. Нажмите кнопку ниже, чтобы перезапустить бутик с начальными настройками.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-900 font-mono text-left overflow-auto max-h-32 border border-purple-100">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold text-xs transition-colors cursor-pointer"
              >
                Обновить страницу
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                Очистить кэш и открыть
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
