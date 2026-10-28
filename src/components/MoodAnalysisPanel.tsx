import React from 'react';
import { X, Activity, Zap, Smile, Heart, Target, Sparkles } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const MoodAnalysisPanel: React.FC = () => {
  const { currentTrack, showMoodPanel, toggleMoodPanel } = useVibeTune();

  if (!showMoodPanel || !currentTrack) return null;

  const { energy, happiness, calmness, focus } = currentTrack.moodScores;

  const getBarColor = (score: number) => {
    if (score >= 80) return 'from-purple-500 to-fuchsia-500';
    if (score >= 60) return 'from-indigo-500 to-purple-500';
    if (score >= 40) return 'from-blue-500 to-indigo-500';
    return 'from-emerald-500 to-teal-500';
  };

  return (
    <div className="fixed bottom-28 right-6 w-80 glass-panel p-5 rounded-2xl border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">Live Mood Analysis</h3>
        </div>
        <button onClick={toggleMoodPanel} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4">
        <span className="text-xs text-slate-400 block mb-0.5">Currently Analyzing:</span>
        <span className="text-sm font-semibold text-purple-200 truncate block">{currentTrack.title}</span>
        <span className="text-xs text-purple-400 font-mono">BPM: {currentTrack.bpm} • Mode: {currentTrack.mood}</span>
      </div>

      <div className="space-y-3.5">
        {/* Energy */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Energy
            </span>
            <span className="font-mono text-amber-300">{energy}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
            <div 
              className={`h-full bg-gradient-to-r ${getBarColor(energy)} transition-all duration-700`}
              style={{ width: `${energy}%` }}
            />
          </div>
        </div>

        {/* Happiness */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-pink-300">
              <Smile className="w-3.5 h-3.5 text-pink-400" />
              Happiness
            </span>
            <span className="font-mono text-pink-300">{happiness}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
            <div 
              className={`h-full bg-gradient-to-r ${getBarColor(happiness)} transition-all duration-700`}
              style={{ width: `${happiness}%` }}
            />
          </div>
        </div>

        {/* Calmness */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-blue-300">
              <Heart className="w-3.5 h-3.5 text-blue-400" />
              Calmness
            </span>
            <span className="font-mono text-blue-300">{calmness}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
            <div 
              className={`h-full bg-gradient-to-r ${getBarColor(calmness)} transition-all duration-700`}
              style={{ width: `${calmness}%` }}
            />
          </div>
        </div>

        {/* Focus */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-purple-300">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              Focus
            </span>
            <span className="font-mono text-purple-300">{focus}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
            <div 
              className={`h-full bg-gradient-to-r ${getBarColor(focus)} transition-all duration-700`}
              style={{ width: `${focus}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-purple-300">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>VibeTune AI Real-Time Audio Metric</span>
      </div>
    </div>
  );
};
