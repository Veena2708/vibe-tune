import React from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Heart, Volume2, VolumeX, Sparkles, Activity, FileText, ListMusic 
} from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const MusicPlayer: React.FC = () => {
  const {
    currentTrack, isPlaying, togglePlay, nextTrack, prevTrack,
    currentTime, duration, seek, volume, setVolume, isMuted, toggleMute,
    isShuffle, toggleShuffle, isRepeat, cycleRepeat,
    likedSongIds, toggleLike, smartTransitionEnabled, toggleSmartTransition,
    showMoodPanel, toggleMoodPanel, showLyrics, toggleLyrics,
    showQueue, toggleQueue
  } = useVibeTune();

  if (!currentTrack) return null;

  const isLiked = likedSongIds.has(currentTrack.id);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#080b12]/95 backdrop-blur-2xl border-t border-white/10 px-6 z-40 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)] select-none">
      
      {/* Left: Track Information */}
      <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
        <div className="relative group w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px] flex items-center justify-center gap-1">
              <span className="w-1 bg-purple-400 rounded-full animate-wave-1"></span>
              <span className="w-1 bg-purple-300 rounded-full animate-wave-2"></span>
              <span className="w-1 bg-fuchsia-400 rounded-full animate-wave-3"></span>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-white truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-slate-400 truncate hover:text-slate-200 cursor-pointer">
            {currentTrack.artist}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-1.5 py-0.2 rounded border border-purple-500/30">
              {currentTrack.genre}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentTrack.bpm} BPM
            </span>
          </div>
        </div>

        <button
          onClick={() => toggleLike(currentTrack.id)}
          className="ml-2 p-2 text-slate-400 hover:text-pink-500 transition-colors"
          title={isLiked ? "Unlike" : "Like Song"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500 text-pink-500 animate-bounce' : ''}`} />
        </button>
      </div>

      {/* Center: Playback Controls & Timeline Progress Bar */}
      <div className="flex flex-col items-center gap-2 w-2/4 max-w-xl">
        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button 
            onClick={toggleShuffle}
            className={`p-2 rounded-full transition-all ${isShuffle ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-white'}`}
            title="Shuffle (S)"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button 
            onClick={prevTrack}
            className="p-2 text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95"
            title="Previous (Left Arrow)"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button 
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
            title="Play/Pause (Space)"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          <button 
            onClick={nextTrack}
            className="p-2 text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95"
            title="Next (Right Arrow)"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button 
            onClick={cycleRepeat}
            className={`p-2 rounded-full transition-all relative ${isRepeat !== 'off' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-white'}`}
            title="Repeat (R)"
          >
            <Repeat className="w-4 h-4" />
            {isRepeat === 'one' && (
              <span className="absolute -top-1 -right-1 text-[9px] font-bold text-purple-400 bg-purple-950 px-1 rounded-full border border-purple-500">
                1
              </span>
            )}
          </button>
        </div>

        {/* Timeline Slider Bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 group">
            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 group-hover:h-2 transition-all"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Extra Feature Actions & Volume Slider */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[220px]">
        {/* Smart Transition Toggle */}
        <button
          onClick={toggleSmartTransition}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
            smartTransitionEnabled 
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
          }`}
          title="Smart Transitions Crossfade"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden lg:inline text-[11px]">Smart Fade</span>
        </button>

        {/* Mood Analysis Button */}
        <button
          onClick={toggleMoodPanel}
          className={`p-2 rounded-full transition-all ${showMoodPanel ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40' : 'text-slate-400 hover:text-white'}`}
          title="Live Mood Analysis"
        >
          <Activity className="w-4 h-4" />
        </button>

        {/* Lyrics Button */}
        <button
          onClick={toggleLyrics}
          className={`p-2 rounded-full transition-all ${showLyrics ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40' : 'text-slate-400 hover:text-white'}`}
          title="Song Lyrics"
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Queue Drawer Button */}
        <button
          onClick={toggleQueue}
          className={`p-2 rounded-full transition-all ${showQueue ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40' : 'text-slate-400 hover:text-white'}`}
          title="Smart AI Queue"
        >
          <ListMusic className="w-4 h-4" />
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 ml-1">
          <button onClick={toggleMute} className="text-slate-400 hover:text-white">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};
