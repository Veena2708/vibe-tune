export type MoodType = 'Chill' | 'Focus' | 'Energy' | 'Rainy' | 'Night Drive' | 'Workout' | 'Party' | 'Meditation';

export interface MoodScores {
  energy: number;
  happiness: number;
  calmness: number;
  focus: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  coverUrl: string;
  duration: number; // in seconds
  genre: string;
  mood: MoodType;
  bpm: number;
  audioUrl?: string;
  moodScores: MoodScores;
  lyrics: string[];
  releaseDate: string;
  playCount: number;
  isLiked?: boolean;
  isLocal?: boolean;
  fileRef?: File;
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  genre: string;
  followers: number;
  bio: string;
  popularTrackIds: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  trackIds: string[];
  genre: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  mood?: string;
  genre?: string;
  trackIds: string[];
  createdBy: string;
  isAiGenerated?: boolean;
  createdAt?: string;
}

export interface RoomChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
}

export interface ListeningRoom {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  currentTrackId: string;
  activeListeners: number;
  hostName: string;
  hostAvatar: string;
  upcomingTrackIds: string[];
  vibeTag: string;
  chatMessages: RoomChatMessage[];
}

export interface ListeningInsightsData {
  totalListeningHours: number;
  songsPlayed: number;
  artistsDiscovered: number;
  activeTimeRange: string;
  topGenre: string;
  topMood: string;
  listeningStreak: number;
  weeklyActivity: { day: string; hours: number }[];
  moodBreakdown: { mood: string; percentage: number; color: string }[];
  personality: {
    title: string;
    tagline: string;
    description: string;
    traits: string[];
  };
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'ai' | 'warning';
}

export type NavTab = 
  | 'home' 
  | 'search' 
  | 'discover' 
  | 'library' 
  | 'ai-studio' 
  | 'focus-mode' 
  | 'insights' 
  | 'rooms' 
  | 'vault';
