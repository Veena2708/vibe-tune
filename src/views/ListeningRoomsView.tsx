import React, { useState } from 'react';
import { Radio, Send, X, MessageSquare } from 'lucide-react';
import { useVibeTune } from '../context/VibeTuneContext';
import { MOCK_ROOMS, MOCK_SONGS } from '../data/mockData';
import type { ListeningRoom } from '../types';

export const ListeningRoomsView: React.FC = () => {
  const { playTrack, addToast } = useVibeTune();
  const [activeRoom, setActiveRoom] = useState<ListeningRoom | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [roomList, setRoomList] = useState<ListeningRoom[]>(MOCK_ROOMS);

  const handleJoinRoom = (room: ListeningRoom) => {
    setActiveRoom(room);
    const roomTrack = MOCK_SONGS.find(s => s.id === room.currentTrackId) || MOCK_SONGS[0];
    playTrack(roomTrack, MOCK_SONGS);
    addToast('Joined Listening Room', `Synced with ${room.activeListeners} active listeners in "${room.name}" 📻`, 'success');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeRoom) return;

    const newMsg = {
      id: 'chat-' + Date.now(),
      user: 'Alex Vibe (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRoomList(prev => prev.map(r => {
      if (r.id === activeRoom.id) {
        return { ...r, chatMessages: [...r.chatMessages, newMsg] };
      }
      return r;
    }));

    setActiveRoom(prev => prev ? { ...prev, chatMessages: [...prev.chatMessages, newMsg] } : null);
    setChatInput('');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-32 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          Synchronized Social Audio
        </div>
        <h1 className="text-4xl font-black text-white font-['Space_Grotesk']">
          Listening Rooms
        </h1>
        <p className="text-slate-400 text-sm">
          Listen to music together in real-time with developers, creators, and ambient explorers around the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {roomList.map((room) => {
          const currentTrack = MOCK_SONGS.find(s => s.id === room.currentTrackId) || MOCK_SONGS[0];
          const isCurrentJoined = activeRoom?.id === room.id;

          return (
            <div 
              key={room.id}
              className={`glass-panel rounded-3xl p-5 border flex flex-col justify-between space-y-4 transition-all ${
                isCurrentJoined 
                  ? 'border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)] bg-emerald-950/20' 
                  : 'border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <img src={room.coverUrl} alt={room.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {room.activeListeners} LIVE
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
                    {room.vibeTag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">{room.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{room.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
                  <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-9 h-9 rounded-lg object-cover" />
                  <div className="overflow-hidden flex-1">
                    <span className="text-[9px] font-bold uppercase text-purple-400 block">NOW PLAYING</span>
                    <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{currentTrack.artist}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleJoinRoom(room)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isCurrentJoined 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>{isCurrentJoined ? 'Currently Synced' : 'Join Room'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {activeRoom && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 space-y-6 shadow-2xl bg-gradient-to-b from-emerald-950/30 via-purple-950/20 to-slate-950">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  {activeRoom.name}
                </h2>
                <span className="text-xs text-emerald-300 font-mono">
                  Hosted by {activeRoom.hostName} • {activeRoom.activeListeners} Synced Listeners
                </span>
              </div>
            </div>
            <button onClick={() => setActiveRoom(null)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-4 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between h-80">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Vibe Chat</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {activeRoom.chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <img src={msg.avatar} alt={msg.user} className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-300">{msg.user}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Share a thought in the room..."
                  className="flex-1 px-3 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-3 h-80 flex flex-col">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
                Room Synced Queue
              </h4>
              <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                {activeRoom.upcomingTrackIds.map((tid, idx) => {
                  const song = MOCK_SONGS.find(s => s.id === tid);
                  if (!song) return null;
                  return (
                    <div key={song.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 text-xs">
                      <span className="font-mono text-purple-400">{idx + 1}</span>
                      <img src={song.coverUrl} alt={song.title} className="w-8 h-8 rounded object-cover" />
                      <div className="overflow-hidden">
                        <h5 className="font-bold text-white truncate">{song.title}</h5>
                        <p className="text-[10px] text-slate-400 truncate">{song.artist}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
