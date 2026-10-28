import React from 'react';
import { Compass, Play, Sparkles, Flame, Star, Radio } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import { MOCK_SONGS, MOCK_ARTISTS, MOCK_PLAYLISTS } from '../data/mockData';

export const DiscoverView: React.FC = () => {
  const { playTrack } = useVibeTune();

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-purple-400" />
          Sonic Radar
        </div>
        <h1 className="text-4xl font-black text-white font-['Space_Grotesk']">
          Discover New Vibes
        </h1>
        <p className="text-slate-400 text-sm">
          Explore fresh releases, underground hidden gems, trending artists, and algorithmic recommendation channels.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
          <Sparkles className="w-5 h-5 text-purple-400" />
          New Releases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_SONGS.slice(0, 3).map((song) => (
            <div 
              key={song.id}
              onClick={() => playTrack(song, MOCK_SONGS)}
              className="glass-panel p-4 rounded-2xl flex items-center gap-4 cursor-pointer group hover:border-purple-500/40 transition-all"
            >
              <img src={song.coverUrl} alt={song.title} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-lg group-hover:scale-105 transition-transform" />
              <div className="overflow-hidden flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  NEW SINGLE
                </span>
                <h3 className="text-sm font-bold text-white truncate group-hover:text-purple-300 mt-1">{song.title}</h3>
                <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                <span className="text-[11px] text-slate-500 font-mono block mt-1">{song.releaseDate}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shrink-0">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
          <Star className="w-5 h-5 text-amber-400" />
          Recommended Artists
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {MOCK_ARTISTS.slice(0, 5).map((artist) => (
            <div 
              key={artist.id}
              className="glass-card p-4 rounded-2xl text-center space-y-3 hover:border-purple-500/40 transition-all group cursor-pointer"
              onClick={() => {
                const artistSongs = MOCK_SONGS.filter(s => s.artistId === artist.id);
                if (artistSongs.length > 0) playTrack(artistSongs[0], MOCK_SONGS);
              }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-purple-500/30 group-hover:border-purple-400 shadow-xl group-hover:scale-105 transition-all">
                <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{artist.name}</h4>
                <p className="text-xs text-purple-400 font-semibold mt-0.5">{artist.genre}</p>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">{(artist.followers / 1000).toFixed(0)}k Followers</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
          <Radio className="w-5 h-5 text-cyan-400" />
          Hidden Gems & Underground Sounds
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SONGS.slice(12, 16).map((song) => (
            <div 
              key={song.id}
              onClick={() => playTrack(song, MOCK_SONGS)}
              className="glass-card p-4 rounded-2xl space-y-3 cursor-pointer group hover:border-cyan-500/40 transition-all"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  UNDERRATED
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 truncate">{song.title}</h4>
                <p className="text-xs text-slate-400 truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
          <Flame className="w-5 h-5 text-rose-500" />
          Based on Your Focus & Synthwave History
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_PLAYLISTS.slice(4, 7).map((pl) => (
            <div 
              key={pl.id}
              onClick={() => {
                const plSongs = MOCK_SONGS.filter(s => pl.trackIds.includes(s.id));
                if (plSongs.length > 0) playTrack(plSongs[0], plSongs);
              }}
              className="glass-panel p-5 rounded-2xl cursor-pointer group hover:border-purple-500/40 transition-all flex items-center gap-4"
            >
              <img src={pl.coverUrl} alt={pl.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="overflow-hidden flex-1">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{pl.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{pl.description}</p>
                <span className="text-[11px] text-purple-400 font-mono block mt-1">{pl.trackIds.length} Songs</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
