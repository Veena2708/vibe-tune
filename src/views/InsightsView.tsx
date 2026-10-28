import React from 'react';
import { BarChart3, Clock, Music, Compass, Flame, Sparkles, Award, Zap, Heart, Calendar } from 'lucide-react';
import { MOCK_INSIGHTS } from '../data/mockData';

export const InsightsView: React.FC = () => {
  const { 
    totalListeningHours, songsPlayed, artistsDiscovered, 
    activeTimeRange, topGenre, topMood, listeningStreak, 
    weeklyActivity, moodBreakdown, personality 
  } = MOCK_INSIGHTS;

  const maxHours = Math.max(...weeklyActivity.map(w => w.hours));

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-32 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            Personal Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk']">
            Your Music Insights
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Comprehensive breakdown of your listening habits, acoustic trends, and sonic profile.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{listeningStreak} Day Streak 🔥</span>
        </div>
      </div>

      {/* Top 6 Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Clock className="w-5 h-5 text-purple-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Total Time</span>
          <span className="text-xl font-bold text-white font-mono">{totalListeningHours} hrs</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Music className="w-5 h-5 text-indigo-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Songs Played</span>
          <span className="text-xl font-bold text-white font-mono">{songsPlayed}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Compass className="w-5 h-5 text-cyan-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Artists Found</span>
          <span className="text-xl font-bold text-white font-mono">{artistsDiscovered}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Calendar className="w-5 h-5 text-pink-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Peak Listening</span>
          <span className="text-xs font-bold text-white font-mono truncate block">{activeTimeRange}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Top Genre</span>
          <span className="text-xs font-bold text-purple-300 truncate block">{topGenre}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <Heart className="w-5 h-5 text-emerald-400" />
          <span className="text-[11px] text-slate-400 font-semibold block">Top Mood</span>
          <span className="text-xs font-bold text-emerald-300 truncate block">{topMood}</span>
        </div>
      </div>

      {/* Fictional "Your Music Personality" Hero Card */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-purple-900/60 via-fuchsia-900/40 to-slate-900/90 border border-purple-500/40 shadow-2xl overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-widest inline-block mb-2">
              Music Personality Badge
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              {personality.title}
            </h2>
            <p className="text-sm font-semibold text-purple-300 mt-1">{personality.tagline}</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-center shrink-0">
            <Award className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block mt-1">
              Top 1% Night Listener
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {personality.description}
        </p>

        <div className="pt-2">
          <h4 className="text-xs uppercase font-bold text-purple-300 tracking-wider mb-2">
            Identified Sonic Traits
          </h4>
          <div className="flex flex-wrap gap-2">
            {personality.traits.map((trait, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-xl glass-card border border-purple-500/30 text-xs font-semibold text-slate-200"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity & Mood Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Weekly Listening Activity
            </h3>
            <span className="text-xs font-mono text-slate-400">Hours / Day</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
            {weeklyActivity.map((wa) => {
              const heightPercent = (wa.hours / maxHours) * 100;
              return (
                <div key={wa.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {wa.hours}h
                  </span>
                  <div className="w-full bg-slate-800/80 rounded-t-xl h-36 flex items-end p-1">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-600 to-fuchsia-500 rounded-t-lg transition-all duration-700 group-hover:from-purple-500 group-hover:to-fuchsia-400"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white">
                    {wa.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Mood Distribution
            </h3>
            <span className="text-xs font-mono text-slate-400">% Share</span>
          </div>

          <div className="space-y-4 pt-2">
            {moodBreakdown.map((mb) => (
              <div key={mb.mood} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{mb.mood}</span>
                  <span className="font-mono text-purple-300">{mb.percentage}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ 
                      width: `${mb.percentage}%`,
                      backgroundColor: mb.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
