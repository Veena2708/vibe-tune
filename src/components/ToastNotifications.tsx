import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const ToastNotifications: React.FC = () => {
  const { notifications, removeToast } = useVibeTune();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {notifications.map((toast) => {
        let Icon = Info;
        let borderColor = 'border-purple-500/40';
        let bgColor = 'bg-slate-900/90';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'border-emerald-500/40';
        } else if (toast.type === 'ai') {
          Icon = Sparkles;
          borderColor = 'border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          borderColor = 'border-amber-500/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl glass-panel border ${borderColor} ${bgColor} text-white shadow-xl animate-in slide-in-from-right-10 duration-300`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${
              toast.type === 'ai' ? 'text-purple-400 animate-pulse' : 'text-purple-300'
            }`} />
            <div className="flex-1 pr-2">
              <h5 className="text-xs font-bold text-white leading-snug">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
