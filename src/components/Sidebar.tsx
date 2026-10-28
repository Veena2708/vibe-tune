import React from 'react';
import { 
  Home, 
  Search, 
  Compass, 
  Library, 
  Sparkles, 
  Target, 
  BarChart3, 
  Radio, 
  FolderLock,
  Moon
} from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import type { NavTab } from '../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, focusSession, isPlaying } = useVibeTune();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'library', label: 'Your Library', icon: Library },
    { id: 'ai-studio', label: 'AI Studio', icon: Sparkles, badge: 'AI' },
    { id: 'focus-mode', label: 'Focus Mode', icon: Target },
    { id: 'insights', label: 'Listening Insights', icon: BarChart3 },
    { id: 'rooms', label: 'Listening Rooms', icon: Radio, badge: 'LIVE' },
    { id: 'vault', label: 'Local Vault', icon: FolderLock }
  ];

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside className="w-64 bg-[#0a0e17]/90 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      <div>
        <div 
          onClick={() => setActiveTab('home')}
          className="p-5 flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo.svg" 
              alt="VibeTune Logo" 
              className="w-10 h-10 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" 
            />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white font-['Space_Grotesk'] flex items-center gap-1.5">
              VibeTune
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block -mt-1">
              AI Music Experience
            </span>
          </div>
        </div>

        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/10 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-300'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    item.badge === 'LIVE' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' 
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 mb-24">
        {focusSession.isActive ? (
          <div 
            onClick={() => setActiveTab('focus-mode')}
            className="p-3.5 rounded-xl glass-panel border border-purple-500/30 bg-purple-950/20 cursor-pointer hover:border-purple-400/50 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                {focusSession.mode}
              </span>
              <span className="text-[11px] font-mono text-purple-200 bg-purple-500/20 px-2 py-0.5 rounded-md">
                {formatSeconds(focusSession.remainingSeconds)}
              </span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full transition-all duration-1000"
                style={{
                  width: `${((focusSession.durationMinutes * 60 - focusSession.remainingSeconds) / (focusSession.durationMinutes * 60)) * 100}%`
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl glass-card text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" />
              <span>Vibe State</span>
            </div>
            <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md font-mono">
              {isPlaying ? 'FLOWING' : 'IDLE'}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
