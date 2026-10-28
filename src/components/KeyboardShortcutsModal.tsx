import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', action: 'Play / Pause music' },
    { key: 'Right Arrow', action: 'Skip to Next Track' },
    { key: 'Left Arrow', action: 'Previous Track' },
    { key: 'M', action: 'Mute / Unmute Audio' },
    { key: 'S', action: 'Toggle Shuffle Mode' },
    { key: 'R', action: 'Cycle Repeat Mode' },
    { key: '/', action: 'Focus Search Page' },
    { key: 'L', action: 'Toggle Lyrics Panel' },
    { key: 'F', action: 'Open Focus Mode' },
    { key: 'Q', action: 'Toggle Smart AI Queue' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">Keyboard Shortcuts</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {shortcuts.map((sc, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xs text-slate-300">{sc.action}</span>
              <kbd className="px-2 py-1 text-xs font-mono font-bold bg-purple-950 text-purple-300 rounded border border-purple-500/30">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
