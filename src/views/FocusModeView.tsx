import React, { useState } from 'react';
import { Target, Play, Pause, Square, Flame, Award, Clock } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const FocusModeView: React.FC = () => {
  const { focusSession, startFocusSession, pauseFocusSession, resumeFocusSession, endFocusSession } = useVibeTune();

  const [selectedMode, setSelectedMode] = useState('Deep Focus');
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [customDurationInput, setCustomDurationInput] = useState('');

  const modes = [
    { name: 'Deep Focus', desc: 'Maximum cognitive concentration for intense work.' },
    { name: 'Coding', desc: 'Rhythmic lo-fi loops tuned for software engineering.' },
    { name: 'Reading', desc: 'Soft ambient textures without distracting speech.' },
    { name: 'Study', desc: 'Balanced tempo soundscapes for memory retention.' },
    { name: 'Relaxation', desc: 'Calming 432Hz sine waves for stress relief.' },
    { name: 'Sleep', desc: 'Slow delta wave frequencies for rest.' }
  ];

  const durations = [25, 45, 60];

  const handleStart = () => {
    let dur = selectedDuration;
    if (customDurationInput && Number(customDurationInput) > 0) {
      dur = Number(customDurationInput);
    }
    startFocusSession(selectedMode, dur, 'rain');
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalSeconds = focusSession.durationMinutes * 60;
  const progressPercent = ((totalSeconds - focusSession.remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
          <Target className="w-4 h-4 text-purple-400" />
          Focus Engine
        </div>
        <h1 className="text-4xl font-extrabold text-white font-['Space_Grotesk']">
          Focus Mode & Pomodoro
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Immerse yourself in distraction-free acoustic zones with integrated timer tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Total Focus Time</span>
            <span className="text-xl font-bold text-white font-mono">{focusSession.totalFocusMinutes} Mins</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Focus Streak</span>
            <span className="text-xl font-bold text-white font-mono">{focusSession.completedSessions} Sessions</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Efficiency Level</span>
            <span className="text-xl font-bold text-white font-mono">96.4% FLOW</span>
          </div>
        </div>
      </div>

      {focusSession.isActive ? (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-500/50 shadow-2xl text-center space-y-8 bg-gradient-to-b from-purple-950/30 to-slate-950">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
              Active Session • {focusSession.mode}
            </span>
            <h2 className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              {formatTimer(focusSession.remainingSeconds)}
            </h2>
          </div>

          <div className="w-full max-w-md mx-auto space-y-2">
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-white/10 p-0.5">
              <div 
                className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>0%</span>
              <span>{Math.round(progressPercent)}% Completed</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 pt-4">
            {focusSession.isPaused ? (
              <button
                onClick={resumeFocusSession}
                className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-purple-500/30 transition-all"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Resume Session</span>
              </button>
            ) : (
              <button
                onClick={pauseFocusSession}
                className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 transition-all"
              >
                <Pause className="w-5 h-5 fill-white" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={endFocusSession}
              className="px-6 py-3.5 rounded-2xl glass-card text-rose-300 hover:bg-rose-950/40 border border-rose-500/30 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>End Session</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              1. Select Focus Activity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modes.map((m) => (
                <div
                  key={m.name}
                  onClick={() => setSelectedMode(m.name)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    selectedMode === m.name 
                      ? 'bg-purple-900/40 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'glass-card border-white/5 text-slate-300 hover:border-purple-500/30'
                  }`}
                >
                  <h4 className="text-sm font-bold">{m.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              2. Select Duration
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {durations.map((dur) => (
                <button
                  key={dur}
                  onClick={() => {
                    setSelectedDuration(dur);
                    setCustomDurationInput('');
                  }}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all ${
                    selectedDuration === dur && !customDurationInput
                      ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
                      : 'glass-card text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  {dur} Minutes
                </button>
              ))}

              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  placeholder="Custom min"
                  value={customDurationInput}
                  onChange={(e) => setCustomDurationInput(e.target.value)}
                  className="w-32 px-4 py-3 rounded-2xl glass-input text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={handleStart}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-extrabold text-base flex items-center justify-center gap-2 mx-auto shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Target className="w-5 h-5 text-purple-200" />
              <span>Start Focus Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
