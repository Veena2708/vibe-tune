import React, { useState } from 'react';
import { Sparkles, Play, Clock, Disc, Wand2 } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import type { Playlist } from '../types';
import { MOCK_SONGS } from '../data/mockData';

export const AiStudioView: React.FC = () => {
  const { generateAiPlaylist, playTrack } = useVibeTune();
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);

  const examplePrompts = [
    'Music for studying for 2 hours',
    'Relaxing music for a rainy evening',
    'High-energy workout music',
    'Coding music for late night',
    'Songs for when I need motivation'
  ];

  const handleGenerate = (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const prompt = promptOverride || promptInput;
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedPlaylist(null);

    setTimeout(() => {
      const pl = generateAiPlaylist(prompt);
      setGeneratedPlaylist(pl);
      setIsGenerating(false);
    }, 1400);
  };

  const playlistSongs = generatedPlaylist 
    ? MOCK_SONGS.filter(s => generatedPlaylist.trackIds.includes(s.id))
    : [];

  const totalSecs = playlistSongs.reduce((acc, s) => acc + s.duration, 0);
  const totalMins = Math.floor(totalSecs / 60);

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-extrabold uppercase tracking-wider">
          <Wand2 className="w-4 h-4 text-purple-400 animate-pulse" />
          AI Studio
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Create your vibe
        </h1>
        <p className="text-slate-400 text-sm">
          Describe the mood, activity, duration, or feeling you want, and VibeTune AI will synthesize an optimal custom playlist for you.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 bg-gradient-to-b from-purple-950/20 to-slate-900/60">
        <form onSubmit={(e) => handleGenerate(e)} className="space-y-4">
          <label className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
            What do you want to listen to?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Deep focus lo-fi for coding React components for 2 hours..."
              className="flex-1 px-5 py-4 rounded-2xl glass-input text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isGenerating || !promptInput.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-500/30 transition-all disabled:opacity-50 shrink-0"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 text-purple-200 animate-spin" />
                  <span>Synthesizing Vibe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-purple-200" />
                  <span>Generate Playlist</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div>
          <span className="text-xs text-slate-400 font-semibold block mb-3">
            Or try an example prompt:
          </span>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setPromptInput(prompt);
                  handleGenerate(undefined, prompt);
                }}
                className="px-3.5 py-2 rounded-xl glass-card text-xs text-purple-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-900/20 transition-all border border-white/5"
              >
                ✨ "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="p-12 text-center glass-panel rounded-3xl border border-purple-500/30 space-y-4">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
            <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-white">Analyzing acoustic resonance & mood scores...</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Matching audio features, BPM alignment, and harmonic keys to synthesize your perfect stream.
          </p>
        </div>
      )}

      {generatedPlaylist && !isGenerating && (
        <div className="glass-panel rounded-3xl border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/10">
            <img 
              src={generatedPlaylist.coverUrl} 
              alt={generatedPlaylist.title}
              className="w-40 h-40 rounded-2xl object-cover shadow-2xl border border-white/10 shrink-0" 
            />
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
                  Mood: {generatedPlaylist.mood}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
                  Genre: {generatedPlaylist.genre}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                {generatedPlaylist.title}
              </h2>
              <p className="text-sm text-slate-300">{generatedPlaylist.description}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Disc className="w-3.5 h-3.5 text-purple-400" />
                  {playlistSongs.length} Tracks
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {totalMins} Minutes
                </span>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => {
                    if (playlistSongs.length > 0) playTrack(playlistSongs[0], playlistSongs);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play AI Playlist</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
              Generated Tracklist
            </h4>
            <div className="divide-y divide-white/5">
              {playlistSongs.map((song, idx) => (
                <div 
                  key={song.id}
                  onClick={() => playTrack(song, playlistSongs)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-5">{idx + 1}</span>
                    <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-purple-300">{song.title}</h5>
                      <p className="text-xs text-slate-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                      {song.bpm} BPM
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
