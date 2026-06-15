import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { CheckCircle2, AlertTriangle, Info, X, Radio } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useWorkspace();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = '';
        let textColor = '';
        let borderColor = '';
        let Icon = Info;

        switch (toast.type) {
          case 'success':
            bgColor = 'bg-emerald-50 dark:bg-zinc-900/90 border-emerald-500/35';
            textColor = 'text-emerald-800 dark:text-emerald-400';
            borderColor = 'border-l-4 border-l-emerald-500';
            Icon = CheckCircle2;
            break;
          case 'warning':
            bgColor = 'bg-amber-50 dark:bg-zinc-900/90 border-amber-500/35';
            textColor = 'text-amber-800 dark:text-amber-400';
            borderColor = 'border-l-4 border-l-amber-500';
            Icon = AlertTriangle;
            break;
          case 'error':
            bgColor = 'bg-rose-50 dark:bg-zinc-900/90 border-rose-500/35';
            textColor = 'text-rose-800 dark:text-rose-400';
            borderColor = 'border-l-4 border-l-rose-500';
            Icon = AlertTriangle;
            break;
          default:
            bgColor = 'bg-sky-50 dark:bg-zinc-900/90 border-sky-500/35';
            textColor = 'text-sky-800 dark:text-sky-400';
            borderColor = 'border-l-4 border-l-sky-500';
            Icon = Info;
        }

        return (
          <div
            id={`toast-item-${toast.id}`}
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-xl border backdrop-blur-md animate-fade-in-slide-up transition-all ${bgColor} ${borderColor}`}
            style={{
              animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div className={`mt-0.5 shrink-0 ${textColor}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 text-xs font-medium leading-relaxed font-sans text-zinc-900 dark:text-zinc-200">
              {toast.message}
            </div>
            <button
              id={`toast-dismiss-${toast.id}`}
              onClick={() => dismissToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-100 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
