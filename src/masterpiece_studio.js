/**
 * Masterpiece of the Week: Classroom Starter Studio
 * Interactive 3-Minute Whiteboard Timer, Multi-Tone Audio Soundscape Chimes,
 * Visual Primary Source Canvas with 2.5x Loupe Magnifier & Smartboard Spotter Pen,
 * 3-Stage Observation Prompts, Detective Riddles, Masterpiece Archive Tray,
 * and Fullscreen Classroom Projector Mode.
 */

import { MASTERPIECES_DATA } from './data/masterpieces_data.js';

// Internal Studio State
export const studioState = {
  currentId: 'brueghel_village_lawyer',
  timerSeconds: 180,
  timerDuration: 180,
  isRunning: false,
  timerInterval: null,
  isMuted: false,
  riddleRevealed: false,
  atelierOpen: false,
  projectorMode: false,
  theaterFocus: false,
  magnifierActive: false,
  spotterActive: false,
  spotterPins: [], // Array of { id, x, y } in percentages (0-100)
};

// Initialize from localStorage if present
try {
  const savedId = localStorage.getItem('masterpiece_studio_active_id');
  if (savedId && MASTERPIECES_DATA.some((m) => m.id === savedId)) {
    studioState.currentId = savedId;
  }
  const savedMuted = localStorage.getItem('masterpiece_timer_muted');
  if (savedMuted !== null) {
    studioState.isMuted = savedMuted === 'true';
  }
} catch (e) {}

/**
 * Play authentic synthesized transition soundscapes using Web Audio API
 * - Stage 2 (02:00, Turn & Talk): Warm two-tone ascending Westminster chime harmonic (F#4 -> A4)
 * - Stage 3 (00:30, Hinge Verdict): Resonant grandfather clock bell chime (D5 -> F#5)
 * - Completion (00:00): Full celebratory acoustic triad (D5 -> F#5 -> A5)
 */
export function playTransitionChime(stage) {
  if (studioState.isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    if (stage === 2) {
      // Stage 2: Turn & Talk Transition (02:00) -> Warm two-tone ascending harmonic
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(369.99, now); // F#4
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.95);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440.0, now + 0.28); // A4
      gain2.gain.setValueAtTime(0.35, now + 0.28);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.28);
      osc2.stop(now + 1.4);
    } else if (stage === 3) {
      // Stage 3: Hinge Verdict Transition (00:30) -> Resonant grandfather clock bell strike
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.32, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.85);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(739.99, now + 0.24); // F#5
      gain2.gain.setValueAtTime(0.38, now + 0.24);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.24);
      osc2.stop(now + 1.5);
    } else {
      // Stage 0: Timer Completion (00:00) -> Celebratory full triad
      [587.33, 739.99, 880.0].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.22);
        gain.gain.setValueAtTime(0.3, now + idx * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.22 + 1.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.22);
        osc.stop(now + idx * 0.22 + 1.35);
      });
    }
  } catch (err) {
    console.warn('[Masterpiece Studio] Soundscape chime error:', err);
  }
}

/**
 * Play standard classroom double chime (backwards compatible)
 */
export function playClassroomChime() {
  playTransitionChime(0);
}

/**
 * Flash stage card with gold/violet pulse when transitions occur
 */
export function flashStageTransitionPulse(stepNumber) {
  document
    .querySelectorAll(`.masterpiece-starter-step[data-step="${stepNumber}"]`)
    .forEach((el) => {
      el.classList.add('stage-transition-pulse');
      setTimeout(() => el.classList.remove('stage-transition-pulse'), 2500);
    });
}

/**
 * Format seconds into MM:SS display
 */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Determine which starter phase is active based on remaining seconds
 */
export function getActivePhase(seconds, totalDuration = 180) {
  if (seconds <= 0) return 0; // Completed
  const ratio = seconds / totalDuration;
  if (ratio > 0.66) return 1; // Step 1: Forensic Look
  if (ratio > 0.17) return 2; // Step 2: Turn & Talk
  return 3; // Step 3: Hinge Verdict
}

/**
 * Timer tick handler with acoustic transition chimes
 */
function tickTimer() {
  if (studioState.timerSeconds > 0) {
    studioState.timerSeconds--;
    updateTimerDOM();

    // Stage transition cues at 02:00 (120s) and 00:30 (30s)
    if (studioState.timerSeconds === 120) {
      playTransitionChime(2);
      flashStageTransitionPulse(2);
    } else if (studioState.timerSeconds === 30) {
      playTransitionChime(3);
      flashStageTransitionPulse(3);
    } else if (studioState.timerSeconds === 0) {
      pauseTimer();
      playTransitionChime(0);
      triggerTimerCompletionPulse();
    }
  } else {
    pauseTimer();
  }
}

/**
 * Start the 3-minute starter timer
 */
export function startTimer() {
  if (studioState.isRunning) return;
  if (studioState.timerSeconds <= 0) {
    studioState.timerSeconds = studioState.timerDuration;
  }
  studioState.isRunning = true;
  studioState.timerInterval = setInterval(tickTimer, 1000);
  updateTimerDOM();
}

/**
 * Pause the timer
 */
export function pauseTimer() {
  if (studioState.timerInterval) {
    clearInterval(studioState.timerInterval);
    studioState.timerInterval = null;
  }
  studioState.isRunning = false;
  updateTimerDOM();
}

/**
 * Toggle timer run state
 */
export function toggleTimer() {
  if (studioState.isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

/**
 * Reset timer to target seconds (default 180 = 3m)
 */
export function resetTimer(seconds = 180) {
  pauseTimer();
  studioState.timerDuration = seconds;
  studioState.timerSeconds = seconds;
  updateTimerDOM();
}

/**
 * Adjust timer by delta (e.g. +30s, -30s)
 */
export function adjustTimer(delta) {
  const newSeconds = Math.max(10, Math.min(600, studioState.timerSeconds + delta));
  studioState.timerSeconds = newSeconds;
  if (newSeconds > studioState.timerDuration) {
    studioState.timerDuration = newSeconds;
  }
  updateTimerDOM();
}

/**
 * Toggle chime mute
 */
export function toggleMute() {
  studioState.isMuted = !studioState.isMuted;
  try {
    localStorage.setItem('masterpiece_timer_muted', String(studioState.isMuted));
  } catch (e) {}
  if (!studioState.isMuted) {
    playTransitionChime(2); // Play brief preview tone so teacher confirms volume
  }
  updateTimerDOM();
}

/**
 * Select a different masterpiece
 */
export function selectMasterpiece(id) {
  const item = MASTERPIECES_DATA.find((m) => m.id === id);
  if (!item) return;
  studioState.currentId = id;
  studioState.riddleRevealed = false;
  studioState.atelierOpen = false;
  studioState.spotterPins = []; // Reset markers for new artwork
  studioState.magnifierActive = false;
  studioState.spotterActive = false;

  try {
    localStorage.setItem('masterpiece_studio_active_id', id);
  } catch (e) {}

  // Update homepage strip if present
  const stripRoot = document.getElementById('masterpiece-starter-strip-root');
  if (stripRoot) {
    stripRoot.innerHTML = getMasterpieceStarterStripHtml();
    attachStarterStripEvents(stripRoot);
  }

  // Re-render studio container if present
  const container = document.getElementById('masterpiece-studio-root');
  if (container) {
    container.innerHTML = getMasterpieceStudioHtml();
    attachStudioEvents(container);
  }

  // Re-render projector modal if active
  const modal = document.getElementById('masterpiece-projector-content');
  if (modal && studioState.projectorMode) {
    modal.innerHTML = getProjectorModalInnerHtml();
    attachProjectorEvents();
  }
}

/**
 * Toggle 2.5x Optical Magnifier Loupe
 */
export function toggleMagnifier(isProjector = true) {
  studioState.magnifierActive = !studioState.magnifierActive;
  if (studioState.magnifierActive) {
    studioState.spotterActive = false; // Mutually exclusive with spotter pen
  }
  refreshToolButtonsDOM();
}

/**
 * Toggle Smartboard Spotter Marker Pen
 */
export function toggleSpotter(isProjector = true) {
  studioState.spotterActive = !studioState.spotterActive;
  if (studioState.spotterActive) {
    studioState.magnifierActive = false; // Mutually exclusive with magnifier
  }
  refreshToolButtonsDOM();
}

/**
 * Clear all spotter pins
 */
export function clearSpotterPins() {
  studioState.spotterPins = [];
  refreshPinsDOM();
  refreshToolButtonsDOM();
}

/**
 * Add a spotter pin at (xPercent, yPercent)
 */
export function addSpotterPin(xPercent, yPercent) {
  if (studioState.spotterPins.length >= 6) {
    studioState.spotterPins.shift(); // Max 6 active pins
  }
  const nextId =
    studioState.spotterPins.length > 0
      ? Math.max(...studioState.spotterPins.map((p) => p.id)) + 1
      : 1;

  studioState.spotterPins.push({
    id: nextId,
    x: Math.round(xPercent * 10) / 10,
    y: Math.round(yPercent * 10) / 10,
  });

  refreshPinsDOM();
  refreshToolButtonsDOM();
}

/**
 * Refresh tool buttons and canvas state across DOM
 */
function refreshToolButtonsDOM() {
  // Update Projector Mode Tool Buttons
  const projLoupeBtn = document.getElementById('projector-loupe-btn');
  if (projLoupeBtn) {
    projLoupeBtn.style.background = studioState.magnifierActive
      ? '#f59e0b'
      : 'rgba(255,255,255,0.08)';
    projLoupeBtn.style.color = studioState.magnifierActive ? '#000000' : '#f8fafc';
    projLoupeBtn.style.borderColor = studioState.magnifierActive
      ? '#f59e0b'
      : 'rgba(255,255,255,0.2)';
    projLoupeBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> <span>${studioState.magnifierActive ? 'Loupe: Active (2.5x)' : '2.5x Loupe'}</span>`;
  }

  const projSpotterBtn = document.getElementById('projector-spotter-btn');
  if (projSpotterBtn) {
    projSpotterBtn.style.background = studioState.spotterActive
      ? '#f59e0b'
      : 'rgba(255,255,255,0.08)';
    projSpotterBtn.style.color = studioState.spotterActive ? '#000000' : '#f8fafc';
    projSpotterBtn.style.borderColor = studioState.spotterActive
      ? '#f59e0b'
      : 'rgba(255,255,255,0.2)';
    projSpotterBtn.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${studioState.spotterActive ? 'Spotter: Tap to Pin' : 'Spotter Pen'}</span>`;
  }

  const projCanvas = document.getElementById('projector-canvas-container');
  if (projCanvas) {
    projCanvas.style.cursor = studioState.spotterActive
      ? 'crosshair'
      : studioState.magnifierActive
        ? 'none'
        : 'zoom-in';
  }

  const projClearBtn = document.getElementById('projector-clear-pins-btn');
  if (projClearBtn) {
    projClearBtn.style.display = studioState.spotterPins.length > 0 ? 'flex' : 'none';
    const span = projClearBtn.querySelector('span');
    if (span) span.textContent = `Clear Pins (${studioState.spotterPins.length})`;
  }

  // Hide loupe element if magnifier is inactive
  const loupe = document.getElementById('projector-loupe');
  if (loupe && !studioState.magnifierActive) {
    loupe.style.display = 'none';
  }
}

/**
 * Refresh spotter pins DOM overlay
 */
function refreshPinsDOM() {
  const layer = document.getElementById('projector-spotter-pins-layer');
  if (!layer) return;

  layer.innerHTML = studioState.spotterPins
    .map(
      (p) => `
    <div class="spotter-pin" style="left: ${p.x}%; top: ${p.y}%; pointer-events: auto;" data-pin-id="${p.id}" title="Focus Pin ${p.id} (click to remove)">
      ${p.id}
    </div>
  `,
    )
    .join('');

  // Wire click to remove individual pin
  layer.querySelectorAll('.spotter-pin').forEach((pinEl) => {
    pinEl.onclick = (e) => {
      e.stopPropagation();
      const pid = parseInt(pinEl.dataset.pinId, 10);
      studioState.spotterPins = studioState.spotterPins.filter((p) => p.id !== pid);
      refreshPinsDOM();
      refreshToolButtonsDOM();
    };
  });
}

/**
 * Pulse indicator when timer expires
 */
function triggerTimerCompletionPulse() {
  document.querySelectorAll('.masterpiece-timer-display').forEach((el) => {
    el.classList.add('timer-finished-pulse');
    setTimeout(() => el.classList.remove('timer-finished-pulse'), 3000);
  });
}

/**
 * Synchronize DOM displays for both regular view and projector modal
 */
export function updateTimerDOM() {
  const timeFormatted = formatTime(studioState.timerSeconds);
  const activePhase = getActivePhase(studioState.timerSeconds, studioState.timerDuration);
  const percent = Math.max(
    0,
    Math.min(100, (studioState.timerSeconds / studioState.timerDuration) * 100),
  );

  // Digital displays
  document.querySelectorAll('.masterpiece-timer-digits').forEach((el) => {
    el.textContent = timeFormatted;
  });

  // Start / Pause buttons
  document.querySelectorAll('.masterpiece-timer-toggle-btn').forEach((btn) => {
    if (studioState.isRunning) {
      btn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Pause</span>`;
      btn.classList.add('is-running');
      btn.style.background = '#d97706';
      btn.style.borderColor = '#b45309';
    } else {
      btn.innerHTML = `<i class="fa-solid fa-play"></i> <span>${studioState.timerSeconds <= 0 ? 'Restart' : 'Start 3m'}</span>`;
      btn.classList.remove('is-running');
      btn.style.background = '#2563eb';
      btn.style.borderColor = '#1d4ed8';
    }
  });

  // Progress bars
  document.querySelectorAll('.masterpiece-timer-bar-fill').forEach((el) => {
    el.style.width = `${percent}%`;
    if (studioState.timerSeconds <= 30) {
      el.style.background = '#ef4444';
    } else if (studioState.timerSeconds <= 120) {
      el.style.background = '#8b5cf6';
    } else {
      el.style.background = '#f59e0b';
    }
  });

  // Mute buttons
  document.querySelectorAll('.masterpiece-mute-btn').forEach((btn) => {
    btn.innerHTML = studioState.isMuted
      ? `<i class="fa-solid fa-volume-xmark"></i>`
      : `<i class="fa-solid fa-volume-high"></i>`;
    btn.title = studioState.isMuted ? 'Chime muted (click to unmute)' : 'Chime enabled';
  });

  // Phase highlighting on step cards
  document.querySelectorAll('.masterpiece-starter-step').forEach((card) => {
    const step = parseInt(card.dataset.step, 10);
    if (step === activePhase && studioState.timerSeconds > 0) {
      card.classList.add('active-step-glow');
    } else {
      card.classList.remove('active-step-glow');
    }
  });
}

/**
 * Toggle native browser fullscreen (F11 style)
 */
export function toggleBrowserFullscreen() {
  try {
    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => console.log('Fullscreen rejected:', err));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (err) {
    console.warn('[Masterpiece Studio] Fullscreen toggle error:', err);
  }
}

/**
 * Toggle Theater Focus mode inside Projector overlay (expands painting to 100% full screen)
 */
export function toggleTheaterFocus() {
  studioState.theaterFocus = !studioState.theaterFocus;
  const grid = document.getElementById('projector-workspace-grid');
  const rightCol = document.getElementById('projector-right-column');
  const focusBadge = document.getElementById('projector-focus-badge');
  const theaterBtn = document.getElementById('projector-theater-toggle-btn');
  const img = document.getElementById('projector-canvas-img');

  if (grid && rightCol) {
    if (studioState.theaterFocus) {
      grid.style.gridTemplateColumns = '1fr';
      rightCol.style.display = 'none';
      if (focusBadge) {
        focusBadge.innerHTML = `<i class="fa-solid fa-compress"></i> Click painting to show starter prompts & timer`;
        focusBadge.style.background = 'rgba(245, 158, 11, 0.95)';
        focusBadge.style.color = '#000000';
      }
      if (theaterBtn) {
        theaterBtn.innerHTML = `<i class="fa-solid fa-table-columns"></i> <span>Show Prompts</span>`;
      }
      if (img) {
        img.style.maxHeight = '92vh';
      }
    } else {
      grid.style.gridTemplateColumns = '1.25fr 1fr';
      rightCol.style.display = 'flex';
      if (focusBadge) {
        focusBadge.innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i> Click painting to expand full screen`;
        focusBadge.style.background = 'rgba(15, 23, 42, 0.85)';
        focusBadge.style.color = '#93c5fd';
      }
      if (theaterBtn) {
        theaterBtn.innerHTML = `<i class="fa-solid fa-arrows-left-right-to-line"></i> <span>Focus Painting</span>`;
      }
      if (img) {
        img.style.maxHeight = '100%';
      }
    }
  }
}

/**
 * Open Fullscreen Whiteboard Projector Mode
 */
export function openProjectorMode() {
  studioState.projectorMode = true;
  studioState.theaterFocus = false;
  studioState.magnifierActive = false;
  studioState.spotterActive = false;

  let modal = document.getElementById('masterpiece-projector-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'masterpiece-projector-modal';
    modal.className = 'masterpiece-projector-overlay';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="masterpiece-projector-shell" id="masterpiece-projector-content">
      ${getProjectorModalInnerHtml()}
    </div>
  `;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  attachProjectorEvents();
  updateTimerDOM();

  // Try to trigger native browser fullscreen upon user click
  try {
    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  } catch (err) {}

  window.addEventListener('keydown', handleProjectorKeydown);
}

/**
 * Keyboard shortcuts for Projector Mode
 */
function handleProjectorKeydown(e) {
  if (!studioState.projectorMode) return;
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

  if (e.key === 'Escape') {
    closeProjectorMode();
  } else if (e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    toggleMagnifier(true);
  } else if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    toggleSpotter(true);
  } else if (e.key === 'c' || e.key === 'C') {
    e.preventDefault();
    clearSpotterPins();
  } else if (e.code === 'Space') {
    e.preventDefault();
    toggleTimer();
  }
}

/**
 * Close Fullscreen Projector Mode
 */
export function closeProjectorMode() {
  studioState.projectorMode = false;
  studioState.theaterFocus = false;
  studioState.magnifierActive = false;
  studioState.spotterActive = false;

  const modal = document.getElementById('masterpiece-projector-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleProjectorKeydown);

  // If in browser fullscreen, exit gracefully
  try {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  } catch (err) {}

  updateTimerDOM();
}

/**
 * Generate Artist Spotlight / Biographical Blurb Card HTML
 * Positioned on the top right, directly above the countdown timer
 */
export function getArtistSpotlightCardHtml(item, isProjector = false) {
  if (!item || !item.artistBio) return '';

  const factsHtml = (item.artistBio.fastFacts || [])
    .map(
      (fact) => `
      <div style="display: flex; align-items: flex-start; gap: 7px; font-size: 0.77rem; color: #cbd5e1; line-height: 1.35;">
        <span style="color: #f59e0b; margin-top: 2px; font-size: 0.65rem; flex-shrink: 0;"><i class="fa-solid fa-chevron-right"></i></span>
        <span>${fact.replace(/\*(.*?)\*/g, '<strong style="color: #fde68a;">$1</strong>')}</span>
      </div>
    `,
    )
    .join('');

  return `
    <!-- Artist Spotlight Card (Above Timer) -->
    <div class="masterpiece-artist-spotlight" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1.5px solid rgba(245, 158, 11, 0.4); border-radius: 14px; padding: 14px 16px; color: #f8fafc; box-shadow: 0 4px 18px rgba(15, 23, 42, 0.35); position: relative; overflow: hidden; flex-shrink: 0;">
      
      <!-- Subtle Ambient Gold Glow -->
      <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>

      <!-- Header: Category & Artist Dates Badge -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 8px; flex-wrap: wrap;">
        <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #f59e0b; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-palette"></i> Artist Spotlight
        </span>
        <span style="background: rgba(245, 158, 11, 0.15); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.4); padding: 2px 8px; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.03em;">
          ${item.artistDates}
        </span>
      </div>

      <!-- Main Profile: Portrait + Identity + Summary Blurb -->
      <div style="display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px;">
        <div style="position: relative; flex-shrink: 0;">
          <img src="${item.artistPortrait}" alt="${item.artist}" style="width: 52px; height: 62px; object-fit: cover; border-radius: 8px; border: 1.5px solid rgba(245, 158, 11, 0.5); box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: block;" />
          <span style="position: absolute; bottom: -3px; right: -3px; background: #0f172a; color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.6); font-size: 0.58rem; padding: 1px 4px; border-radius: 3px;" title="Historical Portrait">
            <i class="fa-solid fa-paintbrush"></i>
          </span>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; font-weight: 700; color: #ffffff; line-height: 1.25; margin-bottom: 2px;">
            ${item.artist}
          </div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #fcd34d; margin-bottom: 5px; line-height: 1.3;">
            ${item.artistBio.headline}
          </div>
          <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.42; margin: 0;">
            ${item.artistBio.summary}
          </p>
        </div>
      </div>

      <!-- Fascinating Fast Facts Strip -->
      <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px;">
        <div style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; display: flex; align-items: center; gap: 5px;">
          <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Fascinating Artist Facts
        </div>
        ${factsHtml}
      </div>

    </div>
  `;
}

/**
 * Generate Inner HTML for Projector Mode
 */
function getProjectorModalInnerHtml() {
  const item =
    MASTERPIECES_DATA.find((m) => m.id === studioState.currentId) || MASTERPIECES_DATA[0];
  const timeFormatted = formatTime(studioState.timerSeconds);
  const activePhase = getActivePhase(studioState.timerSeconds, studioState.timerDuration);
  const isFs = typeof document !== 'undefined' && !!document.fullscreenElement;

  return `
    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; max-width: 1600px; margin: 0 auto; padding: 20px 24px; box-sizing: border-box; color: #f8fafc; font-family: 'Outfit', sans-serif;">
      
      <!-- Projector Top Header Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(255,255,255,0.12); padding-bottom: 14px; margin-bottom: 18px; flex-shrink: 0; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="background: rgba(245, 158, 11, 0.2); border: 1.5px solid #f59e0b; color: #fbbf24; padding: 6px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase;">
            <i class="fa-solid fa-chalkboard-user"></i> Whiteboard Projector
          </div>
          <div>
            <h1 style="margin: 0; font-size: 1.35rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">${item.title}</h1>
            <div style="font-size: 0.84rem; color: #94a3b8; font-weight: 500;">
              ${item.artist} (${item.artistDates}) · ${item.date} · ${item.location}
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <select id="projector-artwork-select" style="background: #1e293b; color: #f8fafc; border: 1px solid #475569; padding: 7px 12px; border-radius: 8px; font-weight: 600; font-size: 0.84rem; cursor: pointer;">
            ${MASTERPIECES_DATA.map((m) => `<option value="${m.id}" ${m.id === item.id ? 'selected' : ''}>${m.artist}: ${m.title.split('(')[0]}</option>`).join('')}
          </select>
          
          <button id="projector-fullscreen-btn" style="background: rgba(59, 130, 246, 0.2); border: 1.5px solid #3b82f6; color: #93c5fd; padding: 7px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.84rem;" title="Toggle Fullscreen (F11)">
            <i class="${isFs ? 'fa-solid fa-compress' : 'fa-solid fa-expand'}" id="projector-fullscreen-icon"></i>
            <span id="projector-fullscreen-text">${isFs ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button id="projector-close-btn" style="background: rgba(239, 68, 68, 0.15); border: 1.5px solid #ef4444; color: #fca5a5; padding: 7px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.84rem;">
            <i class="fa-solid fa-xmark"></i> <span>Exit (Esc)</span>
          </button>
        </div>
      </div>

      <!-- Main Projector Workspace (2 Columns or 1 Column in Theater Focus) -->
      <div id="projector-workspace-grid" style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 24px; flex: 1; min-height: 0; overflow: hidden; transition: grid-template-columns 0.3s ease;">
        
        <!-- Left: High-Res Painting Frame & Smartboard Tools -->
        <div id="projector-painting-frame" style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #0b0f19; border-radius: 16px; border: 1.5px solid rgba(255,255,255,0.1); padding: 12px; box-shadow: 0 12px 30px rgba(0,0,0,0.6); position: relative; overflow: hidden;">
          
          <!-- Interactive Whiteboard Tools Toolbar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-shrink: 0; z-index: 20; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <button id="projector-loupe-btn" class="btn-projector-tool" style="background: ${studioState.magnifierActive ? '#f59e0b' : 'rgba(255,255,255,0.08)'}; color: ${studioState.magnifierActive ? '#000000' : '#f8fafc'}; border: 1.5px solid ${studioState.magnifierActive ? '#f59e0b' : 'rgba(255,255,255,0.2)'}; padding: 5px 12px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Activate 2.5x Optical Magnifier Loupe (Key: M)">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>${studioState.magnifierActive ? 'Loupe: Active (2.5x)' : '2.5x Loupe'}</span>
              </button>

              <button id="projector-spotter-btn" class="btn-projector-tool" style="background: ${studioState.spotterActive ? '#f59e0b' : 'rgba(255,255,255,0.08)'}; color: ${studioState.spotterActive ? '#000000' : '#f8fafc'}; border: 1.5px solid ${studioState.spotterActive ? '#f59e0b' : 'rgba(255,255,255,0.2)'}; padding: 5px 12px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Activate Smartboard Spotter Marker Pen (Key: S)">
                <i class="fa-solid fa-location-dot"></i>
                <span>${studioState.spotterActive ? 'Spotter: Tap to Pin' : 'Spotter Pen'}</span>
              </button>

              <button id="projector-clear-pins-btn" style="display: ${studioState.spotterPins.length > 0 ? 'flex' : 'none'}; background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444; padding: 5px 10px; border-radius: 8px; font-weight: 700; font-size: 0.76rem; cursor: pointer; align-items: center; gap: 5px;" title="Clear all placed spotter pins (Key: C)">
                <i class="fa-solid fa-trash-can"></i>
                <span>Clear Pins (${studioState.spotterPins.length})</span>
              </button>
            </div>

            <button id="projector-theater-toggle-btn" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd; border: 1.5px solid #3b82f6; padding: 5px 12px; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px;" title="Toggle between split-view and painting focus">
              <i class="fa-solid ${studioState.theaterFocus ? 'fa-table-columns' : 'fa-arrows-left-right-to-line'}"></i>
              <span>${studioState.theaterFocus ? 'Show Prompts' : 'Focus Painting'}</span>
            </button>
          </div>

          <!-- Canvas Container -->
          <div id="projector-canvas-container" style="flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 10px; background: #000000; position: relative; cursor: ${studioState.spotterActive ? 'crosshair' : studioState.magnifierActive ? 'none' : 'zoom-in'}; touch-action: none;" title="${studioState.spotterActive ? 'Tap painting to drop numbered focus pin' : studioState.magnifierActive ? 'Move cursor or finger over artwork to magnify' : 'Click painting to toggle full-screen theater focus'}">
            <img src="${item.image}" alt="${item.title}" id="projector-canvas-img" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.8); transition: all 0.3s ease; pointer-events: none;" />
            <div class="masterpiece-loupe" id="projector-loupe"></div>
            <div id="projector-spotter-pins-layer" style="position: absolute; inset: 0; pointer-events: none;">
              ${studioState.spotterPins
                .map(
                  (p) => `
                <div class="spotter-pin" style="left: ${p.x}%; top: ${p.y}%; pointer-events: auto;" data-pin-id="${p.id}" title="Focus Pin ${p.id} (click to remove)">
                  ${p.id}
                </div>
              `,
                )
                .join('')}
            </div>
            ${
              !studioState.magnifierActive && !studioState.spotterActive
                ? `
              <div id="projector-focus-badge" style="position: absolute; bottom: 12px; right: 12px; background: rgba(15, 23, 42, 0.85); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.5); padding: 4px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; display: flex; align-items: center; gap: 6px; pointer-events: none; backdrop-filter: blur(4px);">
                <i class="fa-solid fa-magnifying-glass-plus"></i> Click painting to expand
              </div>
            `
                : ''
            }
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 6px 2px; font-size: 0.78rem; color: #94a3b8; flex-shrink: 0;">
            <span><i class="fa-solid fa-landmark"></i> ${item.curatorBadge}</span>
            <span>${item.medium}</span>
          </div>
        </div>

        <!-- Right: Whiteboard Starter Prompts & Huge Timer -->
        <div id="projector-right-column" style="display: flex; flex-direction: column; gap: 14px; height: 100%; overflow-y: auto; padding-right: 4px;">
          
          <!-- Artist Spotlight & Biographical Blurb -->
          ${getArtistSpotlightCardHtml(item, true)}

          <!-- Giant Whiteboard Tap Timer -->
          <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 2px solid #3b82f6; border-radius: 16px; padding: 18px 22px; box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-stopwatch-20"></i> Classroom Discussion Timer
              </span>
              <button class="masterpiece-mute-btn" style="background: transparent; border: none; color: #94a3b8; font-size: 1.1rem; cursor: pointer; padding: 4px;" title="${studioState.isMuted ? 'Chime muted' : 'Chime enabled'}">
                ${studioState.isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>'}
              </button>
            </div>

            <!-- Big Digits Display -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
              <div class="masterpiece-timer-display" style="font-family: 'Outfit', monospace; font-size: 3.2rem; font-weight: 900; letter-spacing: -0.02em; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.5); line-height: 1;">
                <span class="masterpiece-timer-digits">${timeFormatted}</span>
              </div>

              <!-- Big Tap Action Buttons for Whiteboard -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="masterpiece-timer-toggle-btn" style="background: #2563eb; border: 1.5px solid #1d4ed8; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 1.05rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); touch-action: manipulation;">
                  <i class="fa-solid fa-play"></i> <span>Start 3m</span>
                </button>
                <button id="projector-timer-reset-btn" style="background: #334155; border: 1.5px solid #475569; color: #f8fafc; padding: 12px 16px; border-radius: 10px; font-weight: 700; font-size: 1.05rem; cursor: pointer; touch-action: manipulation;" title="Reset to 3 minutes">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
                <button id="projector-timer-add-btn" style="background: #334155; border: 1.5px solid #475569; color: #f8fafc; padding: 12px 14px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; touch-action: manipulation;" title="Add 30 seconds">
                  +30s
                </button>
              </div>
            </div>

            <!-- Progress Bar -->
            <div style="background: rgba(255,255,255,0.1); border-radius: 6px; height: 8px; margin-top: 14px; overflow: hidden;">
              <div class="masterpiece-timer-bar-fill" style="height: 100%; width: ${(studioState.timerSeconds / studioState.timerDuration) * 100}%; background: #f59e0b; transition: width 0.3s ease, background 0.3s ease;"></div>
            </div>
          </div>

          <!-- 3 Starter Discussion Steps -->
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${item.starterQuestions
              .map(
                (q) => `
              <div class="masterpiece-starter-step ${q.step === activePhase && studioState.timerSeconds > 0 ? 'active-step-glow' : ''}" data-step="${q.step}" style="background: #1e293b; border: 1.5px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 12px 16px; transition: all 0.3s ease;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="background: ${q.color}22; color: ${q.color}; border: 1px solid ${q.color}55; padding: 2px 7px; border-radius: 6px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">
                      <i class="fa-solid ${q.icon}"></i> ${q.phaseName}
                    </span>
                    <span style="font-size: 0.78rem; font-weight: 700; color: #cbd5e1;">${q.badge}</span>
                  </div>
                  <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; font-family: monospace;">${q.timeRange}</span>
                </div>
                <div style="font-size: 0.92rem; font-weight: 600; color: #f1f5f9; line-height: 1.42;">
                  ${q.question}
                </div>
              </div>
            `,
              )
              .join('')}
          </div>

          <!-- Detective Riddle Bar -->
          <div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.1) 100%); border: 1.5px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 12px 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-size: 0.8rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-magnifying-glass-arrow-right"></i> ${item.detectiveRiddle.title}
              </span>
              <button id="projector-riddle-toggle-btn" style="background: #f59e0b; border: none; color: #000000; font-size: 0.76rem; font-weight: 800; padding: 3px 9px; border-radius: 6px; cursor: pointer;">
                ${studioState.riddleRevealed ? 'Hide Clue' : 'Reveal Clue'}
              </button>
            </div>
            <div style="font-size: 0.86rem; color: #e2e8f0; line-height: 1.4; margin-bottom: 5px;">
              ${item.detectiveRiddle.riddle}
            </div>
            <div id="projector-riddle-answer" style="display: ${studioState.riddleRevealed ? 'block' : 'none'}; background: rgba(0,0,0,0.3); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; color: #fde68a; line-height: 1.45; margin-top: 6px;">
              <strong>Historical Revelation:</strong> ${item.detectiveRiddle.reveal}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

/**
 * Attach Event Listeners to Projector Mode
 */
function attachProjectorEvents() {
  const item =
    MASTERPIECES_DATA.find((m) => m.id === studioState.currentId) || MASTERPIECES_DATA[0];

  const closeBtn = document.getElementById('projector-close-btn');
  if (closeBtn) closeBtn.onclick = closeProjectorMode;

  const fullscreenBtn = document.getElementById('projector-fullscreen-btn');
  if (fullscreenBtn) fullscreenBtn.onclick = toggleBrowserFullscreen;

  const loupeBtn = document.getElementById('projector-loupe-btn');
  if (loupeBtn) loupeBtn.onclick = () => toggleMagnifier(true);

  const spotterBtn = document.getElementById('projector-spotter-btn');
  if (spotterBtn) spotterBtn.onclick = () => toggleSpotter(true);

  const clearPinsBtn = document.getElementById('projector-clear-pins-btn');
  if (clearPinsBtn) clearPinsBtn.onclick = clearSpotterPins;

  const theaterToggleBtn = document.getElementById('projector-theater-toggle-btn');
  if (theaterToggleBtn) theaterToggleBtn.onclick = toggleTheaterFocus;

  // Interactive Canvas Handling (Loupe + Spotter Pins + Theater Zoom)
  const canvasContainer = document.getElementById('projector-canvas-container');
  const loupeEl = document.getElementById('projector-loupe');

  if (canvasContainer) {
    // Pointer Move for Loupe
    canvasContainer.onpointermove = (e) => {
      if (!studioState.magnifierActive || !loupeEl) {
        if (loupeEl) loupeEl.style.display = 'none';
        return;
      }
      const rect = canvasContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        loupeEl.style.display = 'none';
        return;
      }

      loupeEl.style.display = 'block';
      loupeEl.style.left = `${x}px`;
      loupeEl.style.top = `${y}px`;

      // Optical 2.5x Zoom Calculation
      const zoom = 2.5;
      const bgW = rect.width * zoom;
      const bgH = rect.height * zoom;
      const bgX = -(x * zoom - 95);
      const bgY = -(y * zoom - 95);

      loupeEl.style.backgroundImage = `url('${item.image}')`;
      loupeEl.style.backgroundSize = `${bgW}px ${bgH}px`;
      loupeEl.style.backgroundPosition = `${bgX}px ${bgY}px`;
    };

    canvasContainer.onpointerleave = () => {
      if (loupeEl) loupeEl.style.display = 'none';
    };

    // Canvas Click: Handle Spotter Pin Drop vs Theater Focus
    canvasContainer.onclick = (e) => {
      if (studioState.spotterActive) {
        const rect = canvasContainer.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        addSpotterPin(xPercent, yPercent);
        return;
      }

      if (studioState.magnifierActive) {
        // In magnifier mode, clicking does not trigger theater focus
        return;
      }

      toggleTheaterFocus();
    };
  }

  // Timer Buttons
  const toggleBtn = document.querySelector(
    '#masterpiece-projector-modal .masterpiece-timer-toggle-btn',
  );
  if (toggleBtn) toggleBtn.onclick = toggleTimer;

  const resetBtn = document.getElementById('projector-timer-reset-btn');
  if (resetBtn) resetBtn.onclick = () => resetTimer(180);

  const addBtn = document.getElementById('projector-timer-add-btn');
  if (addBtn) addBtn.onclick = () => adjustTimer(30);

  const muteBtn = document.querySelector('#masterpiece-projector-modal .masterpiece-mute-btn');
  if (muteBtn) muteBtn.onclick = toggleMute;

  // Detective Riddle Toggle
  const riddleBtn = document.getElementById('projector-riddle-toggle-btn');
  if (riddleBtn) {
    riddleBtn.onclick = () => {
      studioState.riddleRevealed = !studioState.riddleRevealed;
      const ans = document.getElementById('projector-riddle-answer');
      if (ans) ans.style.display = studioState.riddleRevealed ? 'block' : 'none';
      riddleBtn.textContent = studioState.riddleRevealed ? 'Hide Clue' : 'Reveal Clue';
    };
  }

  // Artwork Switcher
  const selectEl = document.getElementById('projector-artwork-select');
  if (selectEl) {
    selectEl.onchange = (e) => {
      selectMasterpiece(e.target.value);
    };
  }

  refreshPinsDOM();
}

/**
 * Generate Compact 75px Classroom Starter Strip HTML for the Homepage Dashboard
 */
export function getMasterpieceStarterStripHtml() {
  const item =
    MASTERPIECES_DATA.find((m) => m.id === studioState.currentId) || MASTERPIECES_DATA[0];

  return `
    <div class="masterpiece-starter-strip" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border: 1.5px solid var(--border-glass, #e2e8f0); border-left: 4.5px solid #f59e0b; border-radius: 14px; padding: 10px 18px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 75px; box-sizing: border-box; flex-wrap: wrap;">
      
      <!-- Left Thumbnail & Centre Info -->
      <div style="display: flex; align-items: center; gap: 14px; min-width: 280px; flex: 1;">
        <!-- Left: Small thumbnail preview of the artwork -->
        <div class="masterpiece-strip-thumb-wrap" data-action="launch-masterpiece-projector" style="position: relative; flex-shrink: 0; cursor: pointer;" title="Click artwork to launch Whiteboard Projector">
          <img src="${item.image}" alt="${item.title}" data-action="launch-masterpiece-projector" class="masterpiece-strip-thumb" style="width: 62px; height: 52px; object-fit: cover; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: block; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;" />
          <span style="position: absolute; bottom: 2px; right: 2px; background: rgba(15, 23, 42, 0.85); color: #38bdf8; font-size: 0.6rem; padding: 1px 4px; border-radius: 3px; pointer-events: none; border: 1px solid rgba(255,255,255,0.2);">
            <i class="fa-solid fa-expand"></i>
          </span>
        </div>

        <!-- Centre: Masterpiece of the Week: Title (Artist) with badge -->
        <div style="display: flex; flex-direction: column; gap: 3px; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.68rem; font-weight: 800; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 2px 8px; border-radius: 5px; text-transform: uppercase; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-stopwatch-20"></i> 3-Min Whiteboard Starter
            </span>
            <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase; letter-spacing: 0.05em;">
              Masterpiece of the Week
            </span>
          </div>
          <div style="font-size: 1.02rem; font-weight: 700; color: var(--text-main, #0f172a); line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <span style="font-family: 'Playfair Display', serif;">${item.title.split('(')[0].trim()}</span>
            <span style="font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--text-muted, #64748b); margin-left: 6px;">(${item.artist})</span>
          </div>
        </div>
      </div>

      <!-- Right: Two quick tap buttons -->
      <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0; flex-wrap: wrap;">
        <button class="btn-pedagogy-secondary masterpiece-strip-open-btn" data-action="open-masterpiece-studio" style="background: var(--bg-card, #ffffff); border: 1.5px solid #cbd5e1; color: var(--text-main, #1e293b); padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s ease;">
          <i class="fa-solid fa-play" style="color: #2563eb; font-size: 0.75rem;"></i>
          <span>Open Starter Studio</span>
        </button>
        <button class="btn-pedagogy-primary masterpiece-strip-projector-btn" data-action="launch-masterpiece-projector" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1.5px solid #334155; color: #ffffff; padding: 9px 16px; border-radius: 8px; font-weight: 800; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; box-shadow: 0 3px 10px rgba(15, 23, 42, 0.25); transition: all 0.2s ease;">
          <i class="fa-solid fa-expand" style="color: #38bdf8;"></i>
          <span>Launch Whiteboard Projector</span>
        </button>
      </div>

    </div>
  `;
}

/**
 * Attach Event Listeners to the Classroom Starter Strip
 */
export function attachStarterStripEvents(container) {
  if (!container) return;

  const thumbWrap = container.querySelector('.masterpiece-strip-thumb-wrap');
  if (thumbWrap) {
    thumbWrap.onclick = (e) => {
      e.stopPropagation();
      openProjectorMode();
    };
  }

  const openBtn = container.querySelector('.masterpiece-strip-open-btn');
  if (openBtn) {
    openBtn.onclick = (e) => {
      e.stopPropagation();
      if (typeof window.switchView === 'function') {
        window.switchView('masterpiece');
      }
    };
  }

  const projBtn = container.querySelector('.masterpiece-strip-projector-btn');
  if (projBtn) {
    projBtn.onclick = (e) => {
      e.stopPropagation();
      openProjectorMode();
    };
  }
}

/**
 * Generate Masterpiece Archive Tray HTML
 */
export function getMasterpieceArchiveTrayHtml() {
  const currentItem =
    MASTERPIECES_DATA.find((m) => m.id === studioState.currentId) || MASTERPIECES_DATA[0];

  return `
    <div style="margin-top: 32px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 22px 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 4px 10px; border-radius: 6px; font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
            <i class="fa-solid fa-layer-group"></i> Masterpiece Archive Gallery
          </span>
          <span style="font-size: 0.88rem; font-weight: 700; color: #1e293b;">
            Weekly Whiteboard Starters (KS3 & GCSE History)
          </span>
        </div>
        <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">
          5 Curated Masterpieces · One-Tap Instant Cue
        </span>
      </div>

      <div class="masterpiece-archive-tray">
        ${MASTERPIECES_DATA.map((m) => {
          const isActive = m.id === currentItem.id;
          return `
            <div class="masterpiece-archive-card ${isActive ? 'active-archive-card' : ''}" data-action="select-masterpiece" data-masterpiece-id="${m.id}">
              <div style="position: relative; height: 124px; border-radius: 8px; overflow: hidden; background: #0b0f19; margin-bottom: 10px;">
                <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" class="archive-card-thumb" />
                ${
                  isActive
                    ? `
                  <div style="position: absolute; top: 8px; right: 8px; background: #f59e0b; color: #000000; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">
                    <i class="fa-solid fa-check"></i> ACTIVE
                  </div>
                `
                    : ''
                }
                <div style="position: absolute; bottom: 6px; left: 6px; background: rgba(15, 23, 42, 0.85); color: #e2e8f0; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; backdrop-filter: blur(4px);">
                  ${m.date}
                </div>
              </div>

              <div style="margin-bottom: 10px;">
                <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #b45309; letter-spacing: 0.05em; margin-bottom: 3px;">
                  ${m.artist}
                </div>
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.95rem; font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${m.title.split('(')[0].trim()}
                </div>
                <div style="font-size: 0.74rem; color: #64748b; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${m.curatorBadge}
                </div>
              </div>

              <button class="btn-cue-masterpiece" style="width: 100%; padding: 7px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1.5px solid ${isActive ? '#f59e0b' : '#cbd5e1'}; background: ${isActive ? '#f59e0b' : '#f8fafc'}; color: ${isActive ? '#000000' : '#334155'}; transition: all 0.2s ease; margin-top: auto;">
                ${isActive ? '<i class="fa-solid fa-sparkles"></i> Currently Cued' : '<i class="fa-solid fa-play"></i> Cue Up Starter'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Generate Main Studio HTML for Embedding in Dashboard / Dedicated View
 */
export function getMasterpieceStudioHtml() {
  const item =
    MASTERPIECES_DATA.find((m) => m.id === studioState.currentId) || MASTERPIECES_DATA[0];
  const timeFormatted = formatTime(studioState.timerSeconds);
  const activePhase = getActivePhase(studioState.timerSeconds, studioState.timerDuration);

  return `
    <div class="masterpiece-studio-card" style="background: var(--bg-card, #ffffff); border: 1.5px solid var(--border-glass, #e2e8f0); border-radius: 16px; padding: 22px 24px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: relative;">
      
      <!-- Studio Header Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 18px; border-bottom: 1px solid var(--border-glass, #e2e8f0); padding-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
            <i class="fa-solid fa-palette"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 2px 8px; border-radius: 6px;">
                ${item.weekTitle}
              </span>
              <span style="font-size: 0.74rem; font-weight: 700; color: var(--text-muted, #64748b);">
                Interactive Classroom Starter Studio
              </span>
            </div>
            <h2 style="margin: 2px 0 0 0; font-size: 1.18rem; font-weight: 800; color: var(--text-main, #0f172a); letter-spacing: -0.01em;">
              ${item.title}
            </h2>
          </div>
        </div>

        <!-- Studio Control Actions -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <!-- Masterpiece Selector Dropdown -->
          <div style="position: relative;">
            <select id="masterpiece-switcher-select" style="background: var(--bg-main, #f8fafc); border: 1.5px solid var(--border-glass, #cbd5e1); color: var(--text-main, #1e293b); padding: 7px 12px; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
              ${MASTERPIECES_DATA.map((m) => `<option value="${m.id}" ${m.id === item.id ? 'selected' : ''}>${m.artist}: ${m.title.split('(')[0]}</option>`).join('')}
            </select>
          </div>

          <!-- Whiteboard Projector Button -->
          <button id="masterpiece-launch-projector-btn" data-action="launch-masterpiece-projector" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border: 1.5px solid #334155; padding: 7px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);">
            <i class="fa-solid fa-expand" style="color: #38bdf8;"></i>
            <span>Classroom Projector</span>
          </button>
        </div>
      </div>

      <!-- Main Studio Layout: 2 Columns (Canvas & Timer/Starter) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 22px; align-items: start;">
        
        <!-- Left Column: Masterpiece Visual Canvas & Detective Riddle -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Masterpiece Painting Display Frame -->
          <div style="position: relative; border-radius: 12px; overflow: hidden; border: 2px solid #334155; background: #0b0f19; box-shadow: 0 6px 18px rgba(0,0,0,0.15);">
            <div style="max-height: 380px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000000; cursor: zoom-in; position: relative;" id="masterpiece-canvas-preview" data-action="launch-masterpiece-projector" title="Click to launch fullscreen Whiteboard Projector">
              <img src="${item.image}" alt="${item.title}" data-action="launch-masterpiece-projector" style="width: 100%; height: auto; max-height: 380px; object-fit: contain; transition: transform 0.3s ease; cursor: zoom-in;" class="masterpiece-img-hover" />
              <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(15, 23, 42, 0.85); color: #ffffff; border: 1px solid rgba(255,255,255,0.25); padding: 4px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; display: flex; align-items: center; gap: 6px; pointer-events: none; backdrop-filter: blur(4px);">
                <i class="fa-solid fa-expand" style="color: #38bdf8;"></i> Whiteboard Projector
              </div>
            </div>

            <!-- Archival Museum Label Strip -->
            <div style="background: rgba(15, 23, 42, 0.95); color: #f8fafc; padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem; color: #ffffff;">${item.artist} (${item.artistDates})</div>
                <div style="font-size: 0.74rem; color: #94a3b8;">${item.date} · ${item.medium} · ${item.location}</div>
              </div>
              <span style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fde68a; padding: 4px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-landmark"></i> ${item.curatorBadge}
              </span>
            </div>
          </div>

          <!-- Curator Hook Commentary -->
          <div style="font-size: 0.85rem; color: var(--text-muted, #475569); line-height: 1.5; background: var(--bg-main, #f8fafc); border-radius: 10px; padding: 10px 14px; border-left: 3.5px solid #f59e0b;">
            <strong style="color: var(--text-main, #0f172a);"><i class="fa-solid fa-quote-left" style="color: #f59e0b; margin-right: 4px;"></i> Historical Context:</strong> ${item.curatorHook}
          </div>

          <!-- Detective Riddle Card -->
          <div style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(180, 83, 9, 0.04) 100%); border: 1.5px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 14px 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-magnifying-glass-arrow-right"></i> ${item.detectiveRiddle.title}
              </span>
              <button id="masterpiece-riddle-btn" style="background: #f59e0b; border: none; color: #000000; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                ${studioState.riddleRevealed ? '<i class="fa-solid fa-eye-slash"></i> <span>Hide Riddle Clue</span>' : '<i class="fa-solid fa-eye"></i> <span>Reveal Secret Allegory</span>'}
              </button>
            </div>
            <div style="font-size: 0.88rem; color: var(--text-main, #1e293b); line-height: 1.45;">
              ${item.detectiveRiddle.riddle}
            </div>
            <div id="masterpiece-riddle-answer" style="display: ${studioState.riddleRevealed ? 'block' : 'none'}; margin-top: 10px; background: #ffffff; border-left: 3.5px solid #f59e0b; border-radius: 6px; padding: 10px 12px; font-size: 0.84rem; color: #92400e; line-height: 1.45; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
              <strong>Historical Revelation:</strong> ${item.detectiveRiddle.reveal}
            </div>
          </div>

        </div>

        <!-- Right Column: Interactive Starter Timer & 3 Discussion Phases -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Artist Spotlight & Biographical Blurb -->
          ${getArtistSpotlightCardHtml(item, false)}

          <!-- Timer Display Card -->
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 14px; padding: 16px 20px; color: #ffffff; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.2);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-stopwatch-20"></i> Classroom Starter Timer
              </span>
              <button class="masterpiece-mute-btn" style="background: transparent; border: none; color: #94a3b8; font-size: 1rem; cursor: pointer;" title="${studioState.isMuted ? 'Chime muted' : 'Chime enabled'}">
                ${studioState.isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>'}
              </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
              <!-- Large Digits -->
              <div class="masterpiece-timer-display" style="font-family: 'Outfit', monospace; font-size: 2.8rem; font-weight: 900; letter-spacing: -0.02em; color: #ffffff; line-height: 1;">
                <span class="masterpiece-timer-digits">${timeFormatted}</span>
              </div>

              <!-- Timer Controls -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="masterpiece-timer-toggle-btn" style="background: #2563eb; border: 1.5px solid #1d4ed8; color: #ffffff; padding: 9px 18px; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);">
                  <i class="fa-solid fa-play"></i> <span>Start 3m</span>
                </button>
                <button id="masterpiece-timer-reset-btn" style="background: #334155; border: 1.5px solid #475569; color: #f8fafc; padding: 9px 12px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer;" title="Reset Timer">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
                <button id="masterpiece-timer-add-btn" style="background: #334155; border: 1.5px solid #475569; color: #f8fafc; padding: 9px 10px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer;" title="Add 30 seconds">
                  +30s
                </button>
              </div>
            </div>

            <!-- Progress Bar -->
            <div style="background: rgba(255,255,255,0.1); border-radius: 5px; height: 6px; margin-top: 12px; overflow: hidden;">
              <div class="masterpiece-timer-bar-fill" style="height: 100%; width: ${(studioState.timerSeconds / studioState.timerDuration) * 100}%; background: #f59e0b; transition: width 0.3s ease, background 0.3s ease;"></div>
            </div>
          </div>

          <!-- 3 Starter Discussion Steps -->
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${item.starterQuestions
              .map(
                (q) => `
              <div class="masterpiece-starter-step ${q.step === activePhase && studioState.timerSeconds > 0 ? 'active-step-glow' : ''}" data-step="${q.step}" style="background: var(--bg-main, #f8fafc); border: 1.5px solid var(--border-glass, #e2e8f0); border-radius: 12px; padding: 12px 14px; transition: all 0.3s ease; position: relative;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="background: ${q.color}22; color: ${q.color}; border: 1px solid ${q.color}55; padding: 2px 7px; border-radius: 5px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase;">
                      <i class="fa-solid ${q.icon}"></i> ${q.phaseName}
                    </span>
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-main, #1e293b);">${q.badge}</span>
                  </div>
                  <span style="font-size: 0.72rem; color: var(--text-muted, #64748b); font-weight: 600; font-family: monospace;">${q.timeRange}</span>
                </div>
                <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-main, #1e293b); line-height: 1.45;">
                  ${q.question}
                </div>
              </div>
            `,
              )
              .join('')}
          </div>

        </div>

      </div>

      <!-- Masterpiece Archive Gallery Tray -->
      ${getMasterpieceArchiveTrayHtml()}

    </div>
  `;
}

/**
 * Attach Event Listeners to the Embedded Studio Component
 */
export function attachStudioEvents(container) {
  if (!container) return;

  // Toggle button (Start / Pause)
  const toggleBtn = container.querySelector('.masterpiece-timer-toggle-btn');
  if (toggleBtn) toggleBtn.onclick = toggleTimer;

  // Reset button
  const resetBtn = container.querySelector('#masterpiece-timer-reset-btn');
  if (resetBtn) resetBtn.onclick = () => resetTimer(180);

  // Add 30s
  const addBtn = container.querySelector('#masterpiece-timer-add-btn');
  if (addBtn) addBtn.onclick = () => adjustTimer(30);

  // Mute button
  const muteBtn = container.querySelector('.masterpiece-mute-btn');
  if (muteBtn) muteBtn.onclick = toggleMute;

  // Riddle Reveal button
  const riddleBtn = container.querySelector('#masterpiece-riddle-btn');
  if (riddleBtn) {
    riddleBtn.onclick = () => {
      studioState.riddleRevealed = !studioState.riddleRevealed;
      const ans = container.querySelector('#masterpiece-riddle-answer');
      if (ans) ans.style.display = studioState.riddleRevealed ? 'block' : 'none';
      riddleBtn.innerHTML = studioState.riddleRevealed
        ? `<i class="fa-solid fa-eye-slash"></i> <span>Hide Riddle Clue</span>`
        : `<i class="fa-solid fa-eye"></i> <span>Reveal Secret Allegory</span>`;
    };
  }

  // Artist Atelier Drawer button
  const atelierBtn = container.querySelector('#masterpiece-atelier-btn');
  if (atelierBtn) {
    atelierBtn.onclick = () => {
      studioState.atelierOpen = !studioState.atelierOpen;
      const drawer = container.querySelector('#masterpiece-atelier-drawer');
      if (drawer) drawer.style.display = studioState.atelierOpen ? 'block' : 'none';
    };
  }

  // Projector launch buttons
  const projBtn = container.querySelector('#masterpiece-launch-projector-btn');
  if (projBtn) projBtn.onclick = openProjectorMode;

  const canvasPreview = container.querySelector('#masterpiece-canvas-preview');
  if (canvasPreview) canvasPreview.onclick = openProjectorMode;

  // Artwork Switcher Dropdown
  const selectEl = container.querySelector('#masterpiece-switcher-select');
  if (selectEl) {
    selectEl.onchange = (e) => {
      selectMasterpiece(e.target.value);
    };
  }

  // Archive Gallery Tray Card Clicks
  container.querySelectorAll('[data-action="select-masterpiece"]').forEach((card) => {
    card.onclick = (e) => {
      e.stopPropagation();
      const mid = card.dataset.masterpieceId;
      if (mid) {
        selectMasterpiece(mid);
      }
    };
  });

  updateTimerDOM();
}

/**
 * Initialize / Render Studio inside any target container element
 */
export function mountMasterpieceStudio(container) {
  if (!container) return;
  container.innerHTML = getMasterpieceStudioHtml();
  attachStudioEvents(container);
}

// Global window assignments for seamless cross-component triggering
if (typeof window !== 'undefined') {
  window.openMasterpieceProjector = openProjectorMode;
  window.closeMasterpieceProjector = closeProjectorMode;
  window.toggleMasterpieceTimer = toggleTimer;
  window.selectMasterpiece = selectMasterpiece;
  window.toggleBrowserFullscreen = toggleBrowserFullscreen;
  window.toggleTheaterFocus = toggleTheaterFocus;
  window.toggleMagnifier = toggleMagnifier;
  window.toggleSpotter = toggleSpotter;
  window.clearSpotterPins = clearSpotterPins;
  window.playTransitionChime = playTransitionChime;
  window.studioState = studioState;
  window.updateTimerDOM = updateTimerDOM;
}

if (typeof document !== 'undefined') {
  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    const icon = document.getElementById('projector-fullscreen-icon');
    const text = document.getElementById('projector-fullscreen-text');
    if (icon) {
      icon.className = isFs ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
    }
    if (text) {
      text.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen';
    }
  });
}
