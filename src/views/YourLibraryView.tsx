import React, { useState } from 'react';
import { Library, Heart, Plus, Play, Clock, Disc, User, ListMusic, X } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import { MOCK_SONGS, MOCK_ARTISTS, MOCK_ALBUMS } from '../data/mockData';

type LibraryTab = 'liked' | 'playlists' | 'albums' | 'artists' | 'recent';

export const YourLibraryView: React.FC = () => {
  const { 
    likedSongIds, playlists, createPlaylist, playTrack, 
    recentlyPlayed, toggleLike 
  } = useVibeTune();

  const [activeTab, setActiveTab] = useState<LibraryTab>('liked');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const likedSongs = MOCK_SONGS.filter(s => likedSongIds.has(s.id));

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createPlaylist(newTitle, newDesc);
    setNewTitle('');
    setNewDesc('');
    setShowCreateModal(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider mb-2">
            <Library className="w-4 h-4 text-purple-400" />
            Your Sanctuary
          </div>
          <h1 className="text-4xl font-black text-white font-['Space_Grotesk']">
            Your Library
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create Playlist</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'liked', label: `Liked Songs (${likedSongs.length})`, icon: Heart },
          { id: 'playlists', label: `Playlists (${playlists.length})`, icon: ListMusic },
          { id: 'albums', label: `Albums (${MOCK_ALBUMS.length})`, icon: Disc },
          { id: 'artists', label: `Artists (${MOCK_ARTISTS.length})`, icon: User },
          { id: 'recent', label: `Recently Played`, icon: Clock }
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as LibraryTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'glass-card text-slate-400 hover:text-white border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'liked' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Your Favorites</h3>
            {likedSongs.length > 0 && (
              <button
                onClick={() => playTrack(likedSongs[0], likedSongs)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Play All Liked
              </button>
            )}
          </div>

          {likedSongs.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-2">
              <Heart className="w-8 h-8 text-pink-500 mx-auto opacity-50" />
              <h4 className="text-base font-bold text-white">No liked songs yet</h4>
              <p className="text-xs text-slate-400">Click the heart icon on any song to save it here!</p>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
              {likedSongs.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => playTrack(song, likedSongs)}
                  className="flex items-center justify-between p-3.5 hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300">{song.title}</h4>
                      <p className="text-xs text-slate-400">{song.artist} • {song.album}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                      {song.mood}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song.id);
                      }}
                      className="text-pink-500 p-1"
                    >
                      <Heart className="w-4 h-4 fill-pink-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlists.map((pl) => (
            <div 
              key={pl.id}
              onClick={() => {
                const plSongs = MOCK_SONGS.filter(s => pl.trackIds.includes(s.id));
                if (plSongs.length > 0) playTrack(plSongs[0], plSongs);
              }}
              className="glass-panel p-4 rounded-2xl cursor-pointer hover:border-purple-500/40 transition-all flex items-center gap-4 group"
            >
              <img src={pl.coverUrl} alt={pl.title} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-lg group-hover:scale-105 transition-transform" />
              <div className="overflow-hidden flex-1">
                {pl.isAiGenerated && (
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 rounded-full inline-block mb-1">
                    ✨ AI GENERATED
                  </span>
                )}
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{pl.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{pl.description}</p>
                <span className="text-[11px] text-purple-400 font-mono block mt-1">{pl.trackIds.length} Tracks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'albums' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {MOCK_ALBUMS.map((alb) => (
            <div 
              key={alb.id}
              onClick={() => {
                const albSongs = MOCK_SONGS.filter(s => alb.trackIds.includes(s.id));
                if (albSongs.length > 0) playTrack(albSongs[0], albSongs);
              }}
              className="glass-card p-4 rounded-2xl cursor-pointer hover:border-purple-500/40 transition-all group"
            >
              <img src={alb.coverUrl} alt={alb.title} className="w-full aspect-square rounded-xl object-cover mb-3 shadow-lg group-hover:scale-105 transition-transform" />
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{alb.title}</h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{alb.artist}</p>
              <span className="text-[10px] text-purple-400 font-mono block mt-1">{alb.releaseYear} • {alb.genre}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'artists' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
          {MOCK_ARTISTS.map((art) => (
            <div 
              key={art.id}
              onClick={() => {
                const artSongs = MOCK_SONGS.filter(s => s.artistId === art.id);
                if (artSongs.length > 0) playTrack(artSongs[0], artSongs);
              }}
              className="glass-card p-4 rounded-2xl text-center cursor-pointer hover:border-purple-500/40 transition-all group"
            >
              <img src={art.avatarUrl} alt={art.name} className="w-24 h-24 rounded-full mx-auto object-cover mb-3 shadow-lg border-2 border-purple-500/30 group-hover:scale-105 transition-transform" />
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{art.name}</h4>
              <p className="text-xs text-purple-400 font-semibold mt-0.5">{art.genre}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
          {recentlyPlayed.map((song) => (
            <div 
              key={song.id}
              onClick={() => playTrack(song, recentlyPlayed)}
              className="flex items-center justify-between p-3.5 hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300">{song.title}</h4>
                  <p className="text-xs text-slate-400">{song.artist}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                {song.bpm} BPM
              </span>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-purple-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">Create New Playlist</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-purple-300 uppercase block mb-1">Playlist Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Late Night Midnight Beats"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-purple-300 uppercase block mb-1">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Short description of this vibe..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg"
                >
                  Save Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
