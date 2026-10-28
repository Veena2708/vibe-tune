import React from 'react';
import { Play, Sparkles, Flame, Clock, Radio, ArrowRight, Zap, Coffee, Moon, Headphones, Activity } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../data/mockData';
import type { MoodType } from '../types';

export const HomeView: React.FC = () => {
  const { playTrack, currentTrack, isPlaying, setActiveTab, likedSongIds, toggleLike } = useVibeTune();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const moodsList: { name: MoodType; icon: React.ElementType; color: string }[] = [
    { name: 'Focus', icon: Activity, color: 'from-purple-600 to-indigo-600' },
    { name: 'Chill', icon: Coffee, color: 'from-blue-600 to-teal-600' },
    { name: 'Night Drive', icon: Moon, color: 'from-fuchsia-600 to-pink-600' },
    { name: 'Rainy', icon: Headphones, color: 'from-cyan-600 to-blue-700' },
    { name: 'Energy', icon: Zap, color: 'from-amber-500 to-rose-600' },
    { name: 'Workout', icon: Flame, color: 'from-red-600 to-orange-500' }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    const matching = MOCK_SONGS.filter(s => s.mood === mood);
    if (matching.length > 0) {
      playTrack(matching[0], matching);
    }
  };

  return (
    <div className="p-8 space-y-10 pb-32 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            {getGreeting()}, <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Alex</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            VibeTune AI analyzed your 10 PM listening patterns. Ready for your flow session?
          </p>
        </div>
        <button
          onClick={() => setActiveTab('ai-studio')}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel border border-purple-500/40 text-purple-300 text-xs font-bold hover:bg-purple-900/30 transition-all shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Generate Custom Vibe</span>
        </button>
      </div>

      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900/80 border border-purple-500/30 shadow-2xl group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10 group-hover:bg-purple-600/30 transition-all duration-700"></div>
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            AI Audio Engine
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight font-['Space_Grotesk']">
            Music for every mood
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Discover, play, and feel the vibe. Intelligently synced soundscapes for productivity, relaxation, and midnight exploration.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => playTrack(MOCK_SONGS[0], MOCK_SONGS)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Flow Vibe</span>
            </button>
            <button
              onClick={() => setActiveTab('focus-mode')}
              className="px-6 py-3 rounded-2xl glass-card text-white font-semibold text-sm hover:bg-white/10 border border-white/10 transition-all"
            >
              Enter Focus Mode
            </button>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
            <Clock className="w-5 h-5 text-purple-400" />
            Recently Played
          </h2>
          <button onClick={() => setActiveTab('library')} className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_SONGS.slice(0, 6).map((song) => {
            const isPlayingThis = currentTrack?.id === song.id && isPlaying;
            return (
              <div 
                key={song.id}
                onClick={() => playTrack(song, MOCK_SONGS)}
                className="glass-card p-3 rounded-2xl cursor-pointer group hover:border-purple-500/40 transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isPlayingThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white truncate">{song.title}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{song.artist}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Made For You • AI Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_PLAYLISTS.slice(0, 4).map((pl) => (
            <div 
              key={pl.id}
              onClick={() => {
                const plSongs = MOCK_SONGS.filter(s => pl.trackIds.includes(s.id));
                if (plSongs.length > 0) playTrack(plSongs[0], plSongs);
              }}
              className="glass-panel p-4 rounded-2xl cursor-pointer group hover:border-purple-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                  <img src={pl.coverUrl} alt={pl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full">
                    {pl.mood}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{pl.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{pl.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[11px] text-purple-400 font-mono">
                <span>{pl.trackIds.length} Tracks</span>
                <span className="flex items-center gap-1 text-white group-hover:text-purple-300">
                  Play Mix <Play className="w-3 h-3 fill-current" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
            <Flame className="w-5 h-5 text-rose-500" />
            Trending Now
          </h2>
        </div>

        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {MOCK_SONGS.slice(3, 8).map((song, index) => {
              const isLiked = likedSongIds.has(song.id);
              return (
                <div 
                  key={song.id}
                  className="flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0" onClick={() => playTrack(song, MOCK_SONGS)}>
                    <span className="font-mono text-sm font-bold text-slate-500 w-6 text-center group-hover:text-purple-400">
                      0{index + 1}
                    </span>
                    <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{song.title}</h4>
                      <p className="text-xs text-slate-400 truncate">{song.artist} • {song.album}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden md:inline text-xs font-mono text-slate-400">
                      {(song.playCount / 1000).toFixed(0)}k plays
                    </span>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {song.mood}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song.id);
                      }}
                      className="text-slate-400 hover:text-pink-500 p-1"
                    >
                      <svg className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400'}`} viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
            <Radio className="w-5 h-5 text-purple-400" />
            Your Moods
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {moodsList.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.name}
                onClick={() => handleMoodSelect(m.name)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${m.color} text-white font-bold text-sm flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all border border-white/10`}
              >
                <Icon className="w-6 h-6" />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
