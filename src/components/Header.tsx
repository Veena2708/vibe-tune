import React from 'react';
import { Search, Bell, Sun, Moon, Keyboard, Sparkles } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

interface HeaderProps {
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShortcuts }) => {
  const { setActiveTab, theme, toggleTheme, notifications, addToast } = useVibeTune();

  return (
    <header className="h-16 px-8 flex items-center justify-between sticky top-0 z-20 glass-panel border-b border-white/5 bg-[#080b11]/80">
      <div 
        onClick={() => setActiveTab('search')}
        className="w-96 flex items-center gap-3 px-4 py-2 rounded-full glass-input text-slate-400 cursor-pointer hover:text-slate-200 transition-all text-sm group"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
        <span className="flex-1 font-normal text-slate-400 group-hover:text-slate-200">Search songs, artists, moods, playlists...</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-800 text-slate-400 rounded border border-slate-700">
          /
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab('ai-studio')}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
          <span>AI Vibe Studio</span>
        </button>

        <button
          onClick={onOpenShortcuts}
          title="Keyboard Shortcuts (?)"
          className="p-2 rounded-full glass-card text-slate-400 hover:text-purple-300 hover:bg-white/10 transition-all"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTheme}
          title="Toggle Dark/Light Mode"
          className="p-2 rounded-full glass-card text-slate-400 hover:text-purple-300 hover:bg-white/10 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        <div className="relative">
          <button
            onClick={() => addToast('VibeTune Notifications', 'All music recommendations and sessions up to date!', 'info')}
            className="p-2 rounded-full glass-card text-slate-400 hover:text-purple-300 hover:bg-white/10 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            )}
          </button>
        </div>

        <div 
          onClick={() => setActiveTab('insights')}
          className="flex items-center gap-2.5 pl-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Alex Vibe Avatar"
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Alex Vibe</span>
            <span className="block text-[10px] text-purple-400 font-mono">PRO MEMBER</span>
          </div>
        </div>
      </div>
    </header>
  );
};
