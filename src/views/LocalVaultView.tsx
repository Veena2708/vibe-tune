import React, { useRef } from 'react';
import { FolderLock, UploadCloud, Play, Trash2, Music, ShieldCheck, FileAudio } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';

export const LocalVaultView: React.FC = () => {
  const { localVaultTracks, addLocalVaultTracks, removeLocalVaultTrack, playTrack } = useVibeTune();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addLocalVaultTracks(e.target.files);
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
          <FolderLock className="w-4 h-4 text-purple-400" />
          Offline Security Vault
        </div>
        <h1 className="text-4xl font-black text-white font-['Space_Grotesk']">
          Local Vault
        </h1>
        <p className="text-slate-400 text-sm">
          Import and stream your local audio files directly from your PC. Completely private and local playback.
        </p>
      </div>

      <div 
        onClick={triggerUpload}
        className="glass-panel p-10 rounded-3xl border-2 border-dashed border-purple-500/40 hover:border-purple-400 transition-all text-center space-y-4 cursor-pointer group bg-gradient-to-b from-purple-950/20 to-slate-950"
      >
        <input 
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,.mp3,.wav,.ogg,.flac,.m4a"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            Select or Drag Audio Files from Your Computer
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Supports MP3, WAV, FLAC, OGG, and AAC files. Metadata extracted locally in your browser.
          </p>
        </div>

        <button 
          type="button"
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 transition-all inline-flex items-center gap-2"
        >
          <FileAudio className="w-4 h-4" />
          <span>Browse Files</span>
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          100% Local Privacy: Your audio files remain stored safely on your device and are never uploaded to any remote server or cloud.
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Music className="w-4 h-4 text-purple-400" />
          Vault Audio Files ({localVaultTracks.length})
        </h3>

        {localVaultTracks.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-2">
            <FolderLock className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
            <h4 className="text-base font-bold text-white">Your Local Vault is empty</h4>
            <p className="text-xs text-slate-400">Click the upload area above to import local tracks from your PC!</p>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            {localVaultTracks.map((song, idx) => (
              <div 
                key={song.id}
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
              >
                <div 
                  className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
                  onClick={() => playTrack(song, localVaultTracks)}
                >
                  <span className="font-mono text-xs font-bold text-slate-500 w-5">{idx + 1}</span>
                  <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <FileAudio className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 truncate">{song.title}</h4>
                    <p className="text-xs text-slate-400 truncate font-mono">{song.artist} • Local File</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playTrack(song, localVaultTracks)}
                    className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-md"
                    title="Play Local Track"
                  >
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </button>

                  <button
                    onClick={() => removeLocalVaultTrack(song.id)}
                    className="text-slate-400 hover:text-rose-400 p-2 transition-colors"
                    title="Remove from Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
