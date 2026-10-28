import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Heart, X, Clock, Disc, User, ListMusic } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import { MOCK_SONGS, MOCK_ARTISTS, MOCK_PLAYLISTS } from '../data/mockData';

type FilterCategory = 'All' | 'Songs' | 'Artists' | 'Albums' | 'Playlists' | 'Genres';

export const SearchView: React.FC = () => {
  const { playTrack, likedSongIds, toggleLike } = useVibeTune();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Synthwave', 'Luna Eclipse', 'Deep Code Flow', 'Lo-Fi', 'Rainy'
  ]);

  const categories: FilterCategory[] = ['All', 'Songs', 'Artists', 'Albums', 'Playlists', 'Genres'];

  const filteredSongs = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_SONGS.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q) ||
      s.mood.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredArtists = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_ARTISTS.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.genre.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredPlaylists = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_PLAYLISTS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  const removeRecent = (term: string) => {
    setRecentSearches(prev => prev.filter(t => t !== term));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="relative max-w-3xl">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums, playlists, moods..."
            autoFocus
            className="w-full pl-14 pr-12 py-4 rounded-3xl glass-input text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xl"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20' 
                  : 'glass-card text-slate-400 hover:text-white border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!query.trim() && (
        <div className="space-y-8">
          {recentSearches.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Recent Searches
                </h3>
                <button 
                  onClick={() => setRecentSearches([])}
                  className="text-xs text-slate-500 hover:text-slate-300 font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <div 
                    key={term}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card border border-white/5 text-xs text-slate-200 hover:border-purple-500/30 group cursor-pointer"
                  >
                    <span onClick={() => handleRecentClick(term)}>{term}</span>
                    <button onClick={() => removeRecent(term)} className="text-slate-500 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Browse Categories & Genres
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Lo-Fi', 'Synthwave', 'Ambient', 'Chillhop', 'Cyberpunk', 'Neo-Classical', 'Deep House', 'Indie Pop'].map((g) => (
                <div 
                  key={g}
                  onClick={() => setQuery(g)}
                  className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-purple-500/40 text-center font-bold text-sm text-white hover:text-purple-300 transition-all border border-white/5"
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {query.trim() && (
        <div className="space-y-8">
          {(activeCategory === 'All' || activeCategory === 'Songs') && filteredSongs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                <Disc className="w-5 h-5 text-purple-400" />
                Songs ({filteredSongs.length})
              </h3>
              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
                {filteredSongs.map((song) => {
                  const isLiked = likedSongIds.has(song.id);
                  return (
                    <div 
                      key={song.id}
                      onClick={() => playTrack(song, filteredSongs)}
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
                          {song.genre}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(song.id);
                          }}
                          className="text-slate-400 hover:text-pink-500 p-1"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(activeCategory === 'All' || activeCategory === 'Artists') && filteredArtists.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                <User className="w-5 h-5 text-indigo-400" />
                Artists ({filteredArtists.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredArtists.map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => {
                      const artistSongs = MOCK_SONGS.filter(s => s.artistId === art.id);
                      if (artistSongs.length > 0) playTrack(artistSongs[0], MOCK_SONGS);
                    }}
                    className="glass-card p-4 rounded-2xl text-center cursor-pointer hover:border-purple-500/40 transition-all group"
                  >
                    <img src={art.avatarUrl} alt={art.name} className="w-20 h-20 rounded-full mx-auto object-cover mb-2" />
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300">{art.name}</h4>
                    <p className="text-xs text-purple-400 font-mono mt-0.5">{art.genre}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeCategory === 'All' || activeCategory === 'Playlists') && filteredPlaylists.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                <ListMusic className="w-5 h-5 text-fuchsia-400" />
                Playlists ({filteredPlaylists.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {filteredPlaylists.map((pl) => (
                  <div 
                    key={pl.id}
                    onClick={() => {
                      const plSongs = MOCK_SONGS.filter(s => pl.trackIds.includes(s.id));
                      if (plSongs.length > 0) playTrack(plSongs[0], plSongs);
                    }}
                    className="glass-panel p-4 rounded-2xl cursor-pointer hover:border-purple-500/40 transition-all flex items-center gap-4"
                  >
                    <img src={pl.coverUrl} alt={pl.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{pl.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{pl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredSongs.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 && (
            <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-2">
              <h3 className="text-base font-bold text-white">No results found for "{query}"</h3>
              <p className="text-xs text-slate-400">Try searching for genres like "Synthwave", "Lo-Fi", or artist names.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
