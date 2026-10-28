import React from 'react';
import { X, FileText, Music2 } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const LyricsPanel: React.FC = () => {
  const { currentTrack, currentTime, showLyrics, toggleLyrics } = useVibeTune();

  if (!showLyrics || !currentTrack) return null;

  const lyrics = currentTrack.lyrics && currentTrack.lyrics.length > 0
    ? currentTrack.lyrics
    : [
        '[00:05] Instrumentals flowing smoothly through space',
        '[00:30] Pure harmonic sound waves filling the place',
        '[01:10] Floating on atmospheric synth textures',
        '[01:50] Feel the rhythm take over all your senses'
      ];

  // Estimate active line index based on elapsed ratio
  const activeIndex = Math.min(
    lyrics.length - 1,
    Math.floor((currentTime / currentTrack.duration) * lyrics.length)
  );

  return (
    <div className="fixed bottom-28 right-6 w-96 max-h-[480px] glass-panel p-6 rounded-2xl border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-40 flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">Original Fictional Lyrics</h3>
        </div>
        <button onClick={toggleLyrics} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4 shrink-0 flex items-center gap-3">
        <img 
          src={currentTrack.coverUrl} 
          alt={currentTrack.title}
          className="w-12 h-12 rounded-lg object-cover border border-white/10"
        />
        <div>
          <h4 className="text-sm font-bold text-white leading-tight">{currentTrack.title}</h4>
          <p className="text-xs text-purple-300">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
        {lyrics.map((line, idx) => {
          const isActive = idx === activeIndex;
          return (
            <p
              key={idx}
              className={`text-sm transition-all duration-300 ${
                isActive 
                  ? 'text-white font-bold text-base scale-102 pl-2 border-l-2 border-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' 
                  : 'text-slate-400 opacity-60 hover:opacity-100 font-normal'
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
        <Music2 className="w-3 h-3 text-purple-400" />
        <span>VibeTune Fictional AI Lyric Synthesizer</span>
      </div>
    </div>
  );
};
