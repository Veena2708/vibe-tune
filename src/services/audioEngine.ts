import type { Song } from '../types';

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private gainNode: GainNode | null = null;
  private masterVolume: number = 0.85;
  private isPlaying: boolean = false;
  private currentSong: Song | null = null;
  private synthTimer: number | null = null;
  private onTimeUpdateCallback: ((currentTime: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private playbackTime: number = 0;
  private timerInterval: number | null = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.masterVolume;
    }
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.audioCtx.currentTime);
    }
  }

  public playTrack(song: Song, onTimeUpdate?: (t: number) => void, onEnded?: () => void) {
    this.initCtx();
    this.currentSong = song;
    this.onTimeUpdateCallback = onTimeUpdate || null;
    this.onEndedCallback = onEnded || null;
    this.stopSynth();

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
    }

    if (song.audioUrl) {
      // Play real audio track!
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = 'anonymous';
      this.audioElement.src = song.audioUrl;
      this.audioElement.volume = this.masterVolume;

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        if (this.onEndedCallback) this.onEndedCallback();
      });

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement && this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.audioElement.currentTime);
        }
      });

      this.isPlaying = true;
      this.audioElement.play().catch(err => {
        console.warn("Real audio autoplay blocked or failed, falling back to Web Audio synth:", err);
        this.playbackTime = 0;
        this.startSynth(song);
        this.startTimer();
      });
    } else {
      // Procedural Web Audio synth fallback
      this.playbackTime = 0;
      this.isPlaying = true;
      this.startSynth(song);
      this.startTimer();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthTimer) {
      clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public resume() {
    this.initCtx();
    this.isPlaying = true;
    if (this.audioElement && this.currentSong?.audioUrl) {
      this.audioElement.play().catch(console.error);
    } else if (this.currentSong) {
      this.startSynth(this.currentSong);
      this.startTimer();
    }
  }

  public seek(seconds: number) {
    this.playbackTime = seconds;
    if (this.audioElement && this.currentSong?.audioUrl) {
      this.audioElement.currentTime = seconds;
    }
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.playbackTime);
    }
  }

  private startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.currentSong) return;
      this.playbackTime += 1;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.playbackTime);
      }
      if (this.playbackTime >= this.currentSong.duration) {
        this.pause();
        if (this.onEndedCallback) this.onEndedCallback();
      }
    }, 1000);
  }

  private stopSynth() {
    if (this.synthTimer) {
      clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private startSynth(song: Song) {
    if (!this.audioCtx || !this.gainNode) return;
    
    const baseFreqs = song.genre === 'Cyberpunk' 
      ? [110, 164.81, 220, 329.63] 
      : song.genre === 'Synthwave'
      ? [130.81, 164.81, 196.00, 246.94] 
      : song.genre === 'Ambient' || song.genre === 'Neo-Classical'
      ? [174.61, 220, 261.63, 329.63] 
      : [146.83, 174.61, 220, 261.63];

    let chordStep = 0;

    const playChordNote = () => {
      if (!this.audioCtx || !this.gainNode || !this.isPlaying) return;

      const rootFreq = baseFreqs[chordStep % baseFreqs.length];
      chordStep++;

      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = song.genre === 'Cyberpunk' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(rootFreq, this.audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + Math.random() * 400, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(0.12 * this.masterVolume, now + 0.4);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + 3.6);
    };

    playChordNote();
    const intervalMs = Math.max(800, (60 / song.bpm) * 2000);
    this.synthTimer = window.setInterval(playChordNote, intervalMs);
  }

  public triggerSmartTransition(_fromSong: Song, toSong: Song, onFinish: () => void) {
    if (!this.gainNode || !this.audioCtx) {
      this.playTrack(toSong);
      onFinish();
      return;
    }

    const now = this.audioCtx.currentTime;
    this.gainNode.gain.setValueAtTime(this.masterVolume, now);
    this.gainNode.gain.linearRampToValueAtTime(0.01, now + 1.2);

    setTimeout(() => {
      this.playTrack(toSong);
      if (this.audioCtx && this.gainNode) {
        const resetNow = this.audioCtx.currentTime;
        this.gainNode.gain.setValueAtTime(0.01, resetNow);
        this.gainNode.gain.linearRampToValueAtTime(this.masterVolume, resetNow + 1.2);
      }
      onFinish();
    }, 1200);
  }
}

export const audioEngine = new AudioEngine();
