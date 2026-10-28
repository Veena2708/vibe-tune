import React, { useState } from 'react';
import { X, Sparkles, Sliders, Play, Clock } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const QueueDrawer: React.FC = () => {
  const { 
    queue, queueIndex, currentTrack, playTrack,
    showQueue, toggleQueue, generateSmartQueue, optimizeQueue
  } = useVibeTune();

  const [prompt, setPrompt] = useState('');

  if (!showQueue) return null;

  const handleGenerateSmartQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    generateSmartQueue(prompt);
    setPrompt('');
  };

  const upcomingTracks = queue.slice(queueIndex + 1);
  const totalRemainingSecs = upcomingTracks.reduce((acc, t) => acc + t.duration, 0);

  const formatTotalTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return `${mins} min`;
  };

  return (
    <div className="fixed top-16 bottom-24 right-0 w-96 glass-panel border-l border-white/10 z-30 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.7)] animate-in slide-in-from-right duration-300">
      <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white font-['Space_Grotesk']">Smart AI Queue</h3>
        </div>
        <button onClick={toggleQueue} className="text-slate-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 bg-purple-950/20 border-b border-white/10 shrink-0">
        <form onSubmit={handleGenerateSmartQueue} className="space-y-2">
          <label className="text-xs font-semibold text-purple-300 block">
            Ask Smart Queue:
          </label>
          <div className="flex gap-2">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Play something calm for the next 45 minutes"
              className="flex-1 px-3 py-1.5 text-xs rounded-xl glass-input text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shrink-0"
            >
              Generate
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={optimizeQueue}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Optimize Queue</span>
          </button>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-400" />
            Remaining: {formatTotalTime(totalRemainingSecs)}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {currentTrack && (
          <div>
            <span className="text-xs uppercase font-bold text-purple-400 tracking-wider block mb-2">
              Now Playing
            </span>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-900/30 border border-purple-500/40">
              <div className="flex items-center gap-3">
                <img 
                  src={currentTrack.coverUrl} 
                  alt={currentTrack.title}
                  className="w-10 h-10 rounded-lg object-cover" 
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
                  <p className="text-[11px] text-purple-300 truncate">{currentTrack.artist}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                {currentTrack.bpm} BPM
              </span>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Next Up ({upcomingTracks.length})
            </span>
          </div>

          {upcomingTracks.length === 0 ? (
            <p className="text-xs text-slate-500 italic text-center py-6">
              No upcoming tracks in queue. Search or generate a vibe to add songs!
            </p>
          ) : (
            <div className="space-y-1.5">
              {upcomingTracks.map((song, idx) => (
                <div 
                  key={song.id + '-' + idx}
                  onClick={() => playTrack(song)}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-mono text-slate-500 w-4 text-center">
                      {idx + 1}
                    </span>
                    <img 
                      src={song.coverUrl} 
                      alt={song.title}
                      className="w-9 h-9 rounded-lg object-cover" 
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 truncate">
                        {song.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{song.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                    <button className="p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white">
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
