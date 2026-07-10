import { state } from './state.js';

export const AudioEngine = {
  ctx: null,
  init() {
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        console.warn("Could not initialize AudioContext:", e);
      }
    }
  },
  play(type) {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(e => console.warn("Failed to resume AudioContext:", e));
      }
      
      const now = ctx.currentTime;
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'flip') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);       // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08);  // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16);  // G5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.setValueAtTime(0.05, now + 0.08);
        gain.gain.setValueAtTime(0.05, now + 0.16);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'fail') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.2);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'cheer') {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major chord climb
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.3);
        });
      } else if (type === 'ping_israel') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.linearRampToValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'ping_arab') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(110, now + 0.25); // A2
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (e) {
      console.warn("Audio Context synth error:", e);
    }
  },
  speak(text, onStart, onEnd, onError, force = false) {
    if (!state.soundEnabled && !force) {
      if (onEnd) onEnd();
      return;
    }
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis not supported in this browser.");
      if (onError) onError();
      return;
    }
    window.speechSynthesis.cancel();
    if (!text) {
      if (onEnd) onEnd();
      return;
    }
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      // Prioritize female voices specifically
      const femaleVoice = voices.find(v => v.name.includes('Google UK English Female')) ||
                          voices.find(v => v.name.includes('Zira')) ||
                          voices.find(v => v.name.includes('Hazel')) ||
                          voices.find(v => v.name.includes('Samantha')) ||
                          voices.find(v => v.name.toLowerCase().includes('female')) ||
                          voices.find(v => v.name.toLowerCase().includes('girl')) ||
                          voices.find(v => v.name.toLowerCase().includes('susan')) ||
                          voices.find(v => v.name.toLowerCase().includes('hazel')) ||
                          voices.find(v => v.name.toLowerCase().includes('zira')) ||
                          voices.find(v => v.name.toLowerCase().includes('samantha'));
      
      const enVoice = femaleVoice ||
                      voices.find(v => v.lang === 'en-GB' && (v.name.includes('Google') || v.name.includes('Natural'))) ||
                      voices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Natural'))) ||
                      voices.find(v => v.lang === 'en-GB') ||
                      voices.find(v => v.lang === 'en-US') ||
                      voices.find(v => v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        if (e && (e.error === 'interrupted' || e.error === 'canceled')) {
          return;
        }
        console.warn("SpeechSynthesis error:", e);
        if (onError) onError();
      };
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      if (onError) onError();
    }
  },
  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}