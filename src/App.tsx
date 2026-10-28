import React, { useState, useEffect } from 'react';
import { VibeTuneProvider, useVibeTune } from './context/VibeTuneContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MusicPlayer } from './components/MusicPlayer';
import { MoodAnalysisPanel } from './components/MoodAnalysisPanel';
import { LyricsPanel } from './components/LyricsPanel';
import { QueueDrawer } from './components/QueueDrawer';
import { ToastNotifications } from './components/ToastNotifications';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';

// Views
import { HomeView } from './views/HomeView';
import { SearchView } from './views/SearchView';
import { DiscoverView } from './views/DiscoverView';
import { YourLibraryView } from './views/YourLibraryView';
import { AiStudioView } from './views/AiStudioView';
import { FocusModeView } from './views/FocusModeView';
import { InsightsView } from './views/InsightsView';
import { ListeningRoomsView } from './views/ListeningRoomsView';
import { LocalVaultView } from './views/LocalVaultView';

const MainContent: React.FC = () => {
  const { 
    activeTab, setActiveTab, togglePlay, nextTrack, prevTrack, 
    toggleMute, toggleShuffle, cycleRepeat, toggleLyrics, toggleQueue 
  } = useVibeTune();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing inside input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextTrack();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevTrack();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 's') {
        toggleShuffle();
      } else if (e.key.toLowerCase() === 'r') {
        cycleRepeat();
      } else if (e.key === '/') {
        e.preventDefault();
        setActiveTab('search');
      } else if (e.key.toLowerCase() === 'l') {
        toggleLyrics();
      } else if (e.key.toLowerCase() === 'f') {
        setActiveTab('focus-mode');
      } else if (e.key.toLowerCase() === 'q') {
        toggleQueue();
      } else if (e.key === '?') {
        setIsShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack, toggleMute, toggleShuffle, cycleRepeat, toggleLyrics, toggleQueue, setActiveTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchView />;
      case 'discover':
        return <DiscoverView />;
      case 'library':
        return <YourLibraryView />;
      case 'ai-studio':
        return <AiStudioView />;
      case 'focus-mode':
        return <FocusModeView />;
      case 'insights':
        return <InsightsView />;
      case 'rooms':
        return <ListeningRoomsView />;
      case 'vault':
        return <LocalVaultView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090e] text-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header onOpenShortcuts={() => setIsShortcutsOpen(true)} />
        <main className="flex-1">
          {renderActiveView()}
        </main>
      </div>

      {/* Persistent Audio Player */}
      <MusicPlayer />

      {/* Feature Panels & Drawers */}
      <MoodAnalysisPanel />
      <LyricsPanel />
      <QueueDrawer />
      <ToastNotifications />

      {/* Shortcuts Modal */}
      <KeyboardShortcutsModal 
        isOpen={isShortcutsOpen} 
        onClose={() => setIsShortcutsOpen(false)} 
      />
    </div>
  );
};

export function App() {
  return (
    <VibeTuneProvider>
      <MainContent />
    </VibeTuneProvider>
  );
}

export default App;
