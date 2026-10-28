import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { 
  Song, Playlist, NavTab, ToastNotification, MoodType 
} from '../types';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../data/mockData';
import { audioEngine } from '../services/audioEngine';

interface FocusSessionState {
  mode: string;
  durationMinutes: number;
  remainingSeconds: number;
  isActive: boolean;
  isPaused: boolean;
  ambientSound: string;
  completedSessions: number;
  totalFocusMinutes: number;
}

interface VibeTuneContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentTrack: Song | null;
  isPlaying: boolean;
  queue: Song[];
  queueIndex: number;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: 'off' | 'all' | 'one';
  smartTransitionEnabled: boolean;
  likedSongIds: Set<string>;
  playlists: Playlist[];
  recentlyPlayed: Song[];
  localVaultTracks: Song[];
  theme: 'dark' | 'light';
  showLyrics: boolean;
  showMoodPanel: boolean;
  showQueue: boolean;
  notifications: ToastNotification[];
  focusSession: FocusSessionState;
  
  // Actions
  playTrack: (song: Song, newQueue?: Song[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleLike: (songId: string) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleSmartTransition: () => void;
  toggleTheme: () => void;
  toggleLyrics: () => void;
  toggleMoodPanel: () => void;
  toggleQueue: () => void;
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'ai' | 'warning') => void;
  removeToast: (id: string) => void;
  createPlaylist: (title: string, description: string, mood?: string, genre?: string) => Playlist;
  addTrackToPlaylist: (playlistId: string, songId: string) => void;
  addLocalVaultTracks: (files: FileList | File[]) => void;
  removeLocalVaultTrack: (songId: string) => void;
  generateAiPlaylist: (prompt: string) => Playlist;
  generateSmartQueue: (prompt: string) => void;
  optimizeQueue: () => void;
  startFocusSession: (mode: string, durationMinutes: number, ambientSound?: string) => void;
  pauseFocusSession: () => void;
  resumeFocusSession: () => void;
  endFocusSession: () => void;
}

const VibeTuneContext = createContext<VibeTuneContextType | undefined>(undefined);

export const VibeTuneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentTrack, setCurrentTrack] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>(MOCK_SONGS);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(MOCK_SONGS[0].duration);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<'off' | 'all' | 'one'>('off');
  const [smartTransitionEnabled, setSmartTransitionEnabled] = useState<boolean>(true);
  
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(
    new Set(MOCK_SONGS.filter(s => s.isLiked).map(s => s.id))
  );
  const [playlists, setPlaylists] = useState<Playlist[]>(MOCK_PLAYLISTS);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([
    MOCK_SONGS[0], MOCK_SONGS[3], MOCK_SONGS[6], MOCK_SONGS[12], MOCK_SONGS[17]
  ]);
  const [localVaultTracks, setLocalVaultTracks] = useState<Song[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [showMoodPanel, setShowMoodPanel] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const [focusSession, setFocusSession] = useState<FocusSessionState>({
    mode: 'Deep Focus',
    durationMinutes: 25,
    remainingSeconds: 25 * 60,
    isActive: false,
    isPaused: false,
    ambientSound: 'rain',
    completedSessions: 3,
    totalFocusMinutes: 75
  });

  const addToast = useCallback((title: string, message: string, type: 'info' | 'success' | 'ai' | 'warning' = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const playTrack = useCallback((song: Song, newQueue?: Song[]) => {
    const targetQueue = newQueue || queue;
    const index = targetQueue.findIndex(s => s.id === song.id);

    if (newQueue) {
      setQueue(newQueue);
    }
    if (index !== -1) {
      setQueueIndex(index);
    }

    const previousSong = currentTrack;
    setCurrentTrack(song);
    setDuration(song.duration);
    setCurrentTime(0);

    setRecentlyPlayed(prev => [song, ...prev.filter(s => s.id !== song.id)].slice(0, 15));

    const handleEnded = () => {
      nextTrack();
    };

    const handleTimeUpdate = (t: number) => {
      setCurrentTime(t);
    };

    if (smartTransitionEnabled && previousSong && previousSong.id !== song.id) {
      audioEngine.triggerSmartTransition(previousSong, song, () => {
        setIsPlaying(true);
      });
    } else {
      audioEngine.playTrack(song, handleTimeUpdate, handleEnded);
      setIsPlaying(true);
    }
  }, [queue, currentTrack, smartTransitionEnabled]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.resume();
      setIsPlaying(true);
    }
  }, [currentTrack, isPlaying]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;
    let nextIdx = queueIndex + 1;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
      nextIdx = 0;
    }
    setQueueIndex(nextIdx);
    const nextSong = queue[nextIdx];
    if (nextSong) {
      playTrack(nextSong);
    }
  }, [queue, queueIndex, isShuffle, playTrack]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0) return;
    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = queue.length - 1;
    }
    setQueueIndex(prevIdx);
    const prevSong = queue[prevIdx];
    if (prevSong) {
      playTrack(prevSong);
    }
  }, [queue, queueIndex, playTrack]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(seconds);
    audioEngine.seek(seconds);
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    setIsMuted(vol === 0);
    audioEngine.setVolume(vol);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume || 0.85);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  }, [isMuted, volume]);

  const toggleLike = useCallback((songId: string) => {
    setLikedSongIds(prev => {
      const next = new Set(prev);
      if (next.has(songId)) {
        next.delete(songId);
        addToast('Library Updated', 'Removed track from your Liked Songs', 'info');
      } else {
        next.add(songId);
        addToast('Liked Song', 'Saved track to your Liked Songs ❤️', 'success');
      }
      return next;
    });
  }, [addToast]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
    addToast('Playback Mode', !isShuffle ? 'Shuffle mode enabled 🔀' : 'Shuffle disabled', 'info');
  }, [isShuffle, addToast]);

  const cycleRepeat = useCallback(() => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const nextMode = modes[(modes.indexOf(isRepeat) + 1) % modes.length];
    setIsRepeat(nextMode);
    addToast('Repeat Mode', `Repeat set to ${nextMode.toUpperCase()}`, 'info');
  }, [isRepeat, addToast]);

  const toggleSmartTransition = useCallback(() => {
    setSmartTransitionEnabled(prev => {
      const next = !prev;
      addToast('Smart Transitions', next ? 'Smart Transition crossfades activated ✨' : 'Smart Transitions turned off', 'ai');
      return next;
    });
  }, [addToast]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleLyrics = useCallback(() => setShowLyrics(prev => !prev), []);
  const toggleMoodPanel = useCallback(() => setShowMoodPanel(prev => !prev), []);
  const toggleQueue = useCallback(() => setShowQueue(prev => !prev), []);

  const createPlaylist = useCallback((title: string, description: string, mood?: string, genre?: string): Playlist => {
    const newPl: Playlist = {
      id: 'pl-custom-' + Date.now(),
      title,
      description: description || 'Custom user playlist on VibeTune',
      coverUrl: MOCK_SONGS[Math.floor(Math.random() * MOCK_SONGS.length)].coverUrl,
      mood: mood || 'Chill',
      genre: genre || 'Lo-Fi',
      trackIds: [],
      createdBy: 'Alex Vibe',
      createdAt: new Date().toLocaleDateString()
    };
    setPlaylists(prev => [newPl, ...prev]);
    addToast('Playlist Created', `"${title}" has been created in your Library`, 'success');
    return newPl;
  }, [addToast]);

  const addTrackToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId && !pl.trackIds.includes(songId)) {
        return { ...pl, trackIds: [...pl.trackIds, songId] };
      }
      return pl;
    }));
    addToast('Playlist Updated', 'Added song to playlist', 'success');
  }, [addToast]);

  const addLocalVaultTracks = useCallback((files: FileList | File[]) => {
    const newTracks: Song[] = [];
    Array.from(files).forEach((file, i) => {
      const objectUrl = URL.createObjectURL(file);
      const titleWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const song: Song = {
        id: 'local-' + Date.now() + '-' + i,
        title: titleWithoutExt,
        artist: 'Local Artist / File',
        artistId: 'local-art',
        album: 'Local Vault Collection',
        albumId: 'local-alb',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        duration: 210,
        genre: 'Local Audio',
        mood: 'Chill',
        bpm: 100,
        audioUrl: objectUrl,
        moodScores: { energy: 60, happiness: 70, calmness: 70, focus: 75 },
        lyrics: ['[00:05] Local user file loaded successfully', '[00:30] Pure uncompressed local sound'],
        releaseDate: new Date().toISOString().split('T')[0],
        playCount: 1,
        isLocal: true,
        fileRef: file
      };
      newTracks.push(song);
    });

    setLocalVaultTracks(prev => [...newTracks, ...prev]);
    addToast('Local Vault Updated', `Imported ${newTracks.length} audio file(s) into your Local Vault`, 'success');
  }, [addToast]);

  const removeLocalVaultTrack = useCallback((songId: string) => {
    setLocalVaultTracks(prev => prev.filter(s => s.id !== songId));
    addToast('Vault Updated', 'Removed local file from vault', 'info');
  }, [addToast]);

  const generateAiPlaylist = useCallback((prompt: string): Playlist => {
    const lower = prompt.toLowerCase();
    let targetMood: MoodType = 'Focus';
    let targetGenre = 'Lo-Fi';
    let title = 'AI Vibe Session';

    if (lower.includes('study') || lower.includes('code') || lower.includes('work') || lower.includes('focus')) {
      targetMood = 'Focus';
      targetGenre = 'Lo-Fi';
      title = 'Deep Cognitive Flow State';
    } else if (lower.includes('rain') || lower.includes('relax') || lower.includes('evening') || lower.includes('cozy')) {
      targetMood = 'Rainy';
      targetGenre = 'Chillhop';
      title = 'Rainy Window Resonance';
    } else if (lower.includes('workout') || lower.includes('energy') || lower.includes('gym') || lower.includes('motivat')) {
      targetMood = 'Workout';
      targetGenre = 'Cyberpunk';
      title = 'High-Velocity Kinetic Surge';
    } else if (lower.includes('night') || lower.includes('drive') || lower.includes('late')) {
      targetMood = 'Night Drive';
      targetGenre = 'Synthwave';
      title = 'Midnight Highway Vector Grid';
    } else if (lower.includes('meditat') || lower.includes('sleep') || lower.includes('calm')) {
      targetMood = 'Meditation';
      targetGenre = 'Ambient';
      title = '432Hz Celestial Sanctuary';
    }

    const matching = MOCK_SONGS.filter(s => s.mood === targetMood || s.genre === targetGenre);
    const selectedTracks = matching.length >= 4 
      ? matching 
      : [...matching, ...MOCK_SONGS.filter(s => !matching.includes(s))].slice(0, 7);

    const newAiPl: Playlist = {
      id: 'ai-gen-' + Date.now(),
      title,
      description: `Intelligently curated for: "${prompt}"`,
      coverUrl: selectedTracks[0]?.coverUrl || MOCK_SONGS[0].coverUrl,
      mood: targetMood,
      genre: targetGenre,
      trackIds: selectedTracks.map(t => t.id),
      createdBy: 'VibeTune AI Engine',
      isAiGenerated: true,
      createdAt: new Date().toLocaleDateString()
    };

    setPlaylists(prev => [newAiPl, ...prev]);
    addToast('AI Generation Complete 🪄', `Generated custom playlist "${title}" based on your prompt!`, 'ai');
    return newAiPl;
  }, [addToast]);

  const generateSmartQueue = useCallback((prompt: string) => {
    const lower = prompt.toLowerCase();
    let filtered = [...MOCK_SONGS];

    if (lower.includes('calm') || lower.includes('relax')) {
      filtered = MOCK_SONGS.filter(s => s.moodScores.calmness >= 70);
    } else if (lower.includes('focus') || lower.includes('study')) {
      filtered = MOCK_SONGS.filter(s => s.moodScores.focus >= 75);
    } else if (lower.includes('energy') || lower.includes('workout')) {
      filtered = MOCK_SONGS.filter(s => s.moodScores.energy >= 80);
    }

    if (filtered.length < 5) {
      filtered = MOCK_SONGS.slice(0, 8);
    }

    setQueue(filtered);
    setQueueIndex(0);
    if (filtered[0]) {
      playTrack(filtered[0], filtered);
    }
    addToast('Smart Queue Generated', `Queue populated with ${filtered.length} optimal tracks for your session`, 'ai');
  }, [playTrack, addToast]);

  const optimizeQueue = useCallback(() => {
    const sorted = [...queue].sort((a, b) => a.bpm - b.bpm);
    setQueue(sorted);
    addToast('Queue Optimized', 'Re-ordered tracks for seamless BPM and energy transitions ⚡', 'ai');
  }, [queue, addToast]);

  useEffect(() => {
    let timer: number | null = null;
    if (focusSession.isActive && !focusSession.isPaused) {
      timer = window.setInterval(() => {
        setFocusSession(prev => {
          if (prev.remainingSeconds <= 1) {
            addToast('Focus Session Complete! 🎉', `Completed ${prev.mode} session of ${prev.durationMinutes} minutes!`, 'success');
            return {
              ...prev,
              isActive: false,
              isPaused: false,
              completedSessions: prev.completedSessions + 1,
              totalFocusMinutes: prev.totalFocusMinutes + prev.durationMinutes,
              remainingSeconds: prev.durationMinutes * 60
            };
          }
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [focusSession.isActive, focusSession.isPaused, addToast]);

  const startFocusSession = useCallback((mode: string, durationMinutes: number, ambientSound: string = 'rain') => {
    setFocusSession(prev => ({
      ...prev,
      mode,
      durationMinutes,
      remainingSeconds: durationMinutes * 60,
      isActive: true,
      isPaused: false,
      ambientSound
    }));
    addToast('Focus Session Started 🎯', `${mode} session active for ${durationMinutes} minutes. Stay in the flow!`, 'success');
  }, [addToast]);

  const pauseFocusSession = useCallback(() => {
    setFocusSession(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeFocusSession = useCallback(() => {
    setFocusSession(prev => ({ ...prev, isPaused: false }));
  }, []);

  const endFocusSession = useCallback(() => {
    setFocusSession(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      remainingSeconds: prev.durationMinutes * 60
    }));
    addToast('Focus Session Ended', 'Session ended early.', 'info');
  }, [addToast]);

  return (
    <VibeTuneContext.Provider value={{
      activeTab, setActiveTab,
      currentTrack, isPlaying, queue, queueIndex,
      currentTime, duration, volume, isMuted, isShuffle, isRepeat,
      smartTransitionEnabled, likedSongIds, playlists, recentlyPlayed,
      localVaultTracks, theme, showLyrics, showMoodPanel, showQueue,
      notifications, focusSession,
      
      playTrack, togglePlay, nextTrack, prevTrack, seek, setVolume,
      toggleMute, toggleLike, toggleShuffle, cycleRepeat,
      toggleSmartTransition, toggleTheme, toggleLyrics, toggleMoodPanel,
      toggleQueue, addToast, removeToast, createPlaylist, addTrackToPlaylist,
      addLocalVaultTracks, removeLocalVaultTrack, generateAiPlaylist,
      generateSmartQueue, optimizeQueue, startFocusSession, pauseFocusSession,
      resumeFocusSession, endFocusSession
    }}>
      {children}
    </VibeTuneContext.Provider>
  );
};

export const useVibeTune = () => {
  const context = useContext(VibeTuneContext);
  if (!context) {
    throw new Error('useVibeTune must be used within a VibeTuneProvider');
  }
  return context;
};
