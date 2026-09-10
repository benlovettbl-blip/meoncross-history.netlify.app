/**
 * Meoncross School Chess Club & House League Zone
 * Interactive module for Period 6 Thursdays
 */

import {
  HOUSES,
  SCORING_RULES,
  INITIAL_PLAYERS,
  INITIAL_MATCHES,
  HISTORICAL_CHESS_SPOTLIGHTS,
  BETH_HARMON_PUZZLES,
  BEGINNER_ROOKIE_PUZZLES,
  BEGINNER_PIECES_GUIDE,
  BEGINNER_GOLDEN_RULES,
} from './chess_data.js';

const STORAGE_KEY = 'meoncross_chess_club_v5';
const ARCHIVE_KEY = 'meoncross_chess_master_archive';
const BACKUP_KEY = 'meoncross_chess_backup_snapshot';
const LEGACY_STORAGE_KEYS = [
  'meoncross_chess_club_v5',
  'meoncross_chess_master_archive',
  'meoncross_chess_backup_snapshot',
  'meoncross_chess_club_v4',
  'meoncross_chess_club_v3',
  'meoncross_chess_club_v2',
  'meoncross_chess_club_v1',
];

// IndexedDB Multi-Layer Vault for Persistent Browser Storage
const IDB_NAME = 'MeoncrossChessDB';
const IDB_VERSION = 1;
const IDB_STORE = 'club_vault';

function getIndexedDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: 'id' });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    } catch (err) {
      resolve(null);
    }
  });
}

async function persistToIndexedDB(state) {
  try {
    const db = await getIndexedDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    store.put({
      id: 'active_state',
      timestamp: Date.now(),
      players: state.players,
      matches: state.matches,
      checkedInPlayerIds: state.checkedInPlayerIds,
      knockoutBracket: state.knockoutBracket,
    });
  } catch (err) {
    console.warn('IndexedDB write skipped:', err);
  }
}

async function loadFromIndexedDB() {
  try {
    const db = await getIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get('active_state');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

// Pupil Name Auto-Sanitiser: Guarantees "First Name + Last Initial" format (e.g. Leo B.)
export function sanitizePupilName(rawName) {
  if (!rawName || typeof rawName !== 'string') return '';
  const trimmed = rawName.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';

  const parts = trimmed.split(' ');
  const formatWord = (w) => {
    if (!w) return '';
    return w
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('-');
  };

  if (parts.length === 1) {
    return formatWord(parts[0]);
  }

  const firstName = formatWord(parts[0]);
  const lastPart = parts[parts.length - 1];

  // If last part is already an initial like "B" or "B."
  if (/^[A-Za-z]\.?$/.test(lastPart)) {
    return `${firstName} ${lastPart.charAt(0).toUpperCase()}.`;
  }

  // Full surname: convert to initial with dot (e.g. "Bartholomew" -> "B.")
  const surnameInitial = lastPart.charAt(0).toUpperCase();
  return `${firstName} ${surnameInitial}.`;
}
if (typeof window !== 'undefined') {
  window.sanitizePupilName = sanitizePupilName;
}

// Helper: Inspect emergency recovery backup
function getBackupInfo() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && data.playerCount !== undefined) return data;
    return null;
  } catch (e) {
    return null;
  }
}

// State container
let chessState = {
  players: [],
  matches: [],
  checkedInPlayerIds: [],
  knockoutBracket: null,
  activeTab: 'signin', // 'signin' | 'beginners' | 'ladder' | 'table' | 'pairings' | 'knockout' | 'drills' | 'matches'
  filterYear: 'all', // 'all' | 'ks3' | 'ks4'
  filterHouse: 'all', // 'all' | houseId
  currentPuzzleIdx: 0,
  puzzleCategory: 'grandmaster', // 'grandmaster' | 'beginner'
  showBethHarmonHint: false,
  showBethHarmonSolution: false,
  showStarterPuzzle: true,
  showAdminDropdown: false,
  showTeacherGuide: false,
  whiteboardMode: false,
  autoRePairEnabled: true,
  sessionActive: true,
  sessionTimeRemaining: 3600,
  sessionTimerRunning: true,
  activePuzzleBoard: null,
  activePuzzleIndex: 0,
  selectedSquare: null,
  puzzleMoveStep: 0,
  puzzleStatus: 'idle',
  sandboxMode: false,
  puzzleFeedback: null,
};

// Timer State Map for Historical Drills
const drillTimers = {};

// Toast feedback system
export function showChessToast(message, type = 'success') {
  let toastCont = document.getElementById('chess-toast-container');
  if (!toastCont) {
    toastCont = document.createElement('div');
    toastCont.id = 'chess-toast-container';
    toastCont.style.cssText =
      'position: fixed; top: 80px; right: 20px; z-index: 100000; display: flex; flex-direction: column; gap: 8px; pointer-events: none;';
    document.body.appendChild(toastCont);
  }

  const toast = document.createElement('div');
  const bg =
    type === 'success'
      ? '#10b981'
      : type === 'warning'
        ? '#f59e0b'
        : type === 'error'
          ? '#ef4444'
          : '#3b82f6';
  const icon =
    type === 'success'
      ? 'fa-circle-check'
      : type === 'warning'
        ? 'fa-triangle-exclamation'
        : type === 'error'
          ? 'fa-circle-xmark'
          : 'fa-circle-info';

  toast.style.cssText = `
    background: ${bg};
    color: #ffffff;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
    max-width: 380px;
    font-family: 'Outfit', sans-serif;
    animation: fadeInDown 0.25s ease-out;
  `;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastCont.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
window.showChessToast = showChessToast;

// Global Session Clock & Auto-Ticker for Period 6
if (typeof window !== 'undefined' && !window.__meoncrossSessionInterval) {
  window.__meoncrossSessionInterval = setInterval(() => {
    if (
      chessState &&
      chessState.sessionActive &&
      chessState.sessionTimerRunning &&
      typeof chessState.sessionTimeRemaining === 'number' &&
      chessState.sessionTimeRemaining > 0
    ) {
      chessState.sessionTimeRemaining--;
      const clockEl = document.getElementById('whiteboard-session-clock');
      if (clockEl) {
        const m = Math.floor(chessState.sessionTimeRemaining / 60);
        const s = chessState.sessionTimeRemaining % 60;
        clockEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
      if (chessState.sessionTimeRemaining === 0) {
        if (typeof window.concludePeriod6Session === 'function') {
          window.concludePeriod6Session();
        }
      }
    }
  }, 1000);
}

// Global Keyboard Shortcut for Whiteboard Mode ('W' or 'Esc')
if (typeof window !== 'undefined' && !window.__meoncrossKeydownBound) {
  window.__meoncrossKeydownBound = true;
  window.addEventListener('keydown', (e) => {
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === 'w' || e.key === 'W') {
      if (typeof window.toggleWhiteboardMode === 'function') {
        window.toggleWhiteboardMode();
      }
    } else if (e.key === 'Escape' && chessState && chessState.whiteboardMode) {
      if (typeof window.toggleWhiteboardMode === 'function') {
        window.toggleWhiteboardMode(false);
      }
    }
  });
}

// Initialize State from localStorage, legacy keys, seed, or IndexedDB
function initChessState(forceClean = false) {
  if (forceClean) {
    chessState.players = [];
    chessState.matches = [];
    chessState.checkedInPlayerIds = [];
    chessState.knockoutBracket = null;
    chessState.activeTab = 'signin';
    saveChessState(true);
    return;
  }

  let loaded = false;

  // 0. 1-Click URL Sync Key Auto-Importer (?chess_sync=...)
  if (typeof window !== 'undefined' && window.location.search) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const syncParam = urlParams.get('chess_sync');
      if (syncParam) {
        let b64 = syncParam.trim();
        if (b64.startsWith('MEONCROSS-CHESS:')) b64 = b64.replace('MEONCROSS-CHESS:', '');
        const jsonStr = decodeURIComponent(atob(b64));
        const syncData = JSON.parse(jsonStr);
        if (Array.isArray(syncData.players) && syncData.players.length > 0) {
          chessState.players = syncData.players;
          chessState.matches = Array.isArray(syncData.matches) ? syncData.matches : [];
          chessState.checkedInPlayerIds = Array.isArray(syncData.checkedInPlayerIds)
            ? syncData.checkedInPlayerIds
            : [];
          chessState.knockoutBracket = syncData.knockoutBracket || null;
          loaded = true;
          saveChessState(true);
          const cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
          setTimeout(() => {
            showChessToast(
              `🎉 Synchronized ${chessState.players.length} pupils via 1-Click Sync Link!`,
              'success',
            );
          }, 400);
        }
      }
    } catch (err) {
      console.warn('URL sync param decode error:', err);
    }
  }

  // 1. Primary check: STORAGE_KEY
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.players) && parsed.players.length > 0) {
        chessState.players = parsed.players;
        chessState.matches = Array.isArray(parsed.matches) ? parsed.matches : [];
        chessState.checkedInPlayerIds = Array.isArray(parsed.checkedInPlayerIds)
          ? parsed.checkedInPlayerIds
          : [];
        chessState.knockoutBracket = parsed.knockoutBracket || null;
        if (parsed.autoRePairEnabled !== undefined)
          chessState.autoRePairEnabled = parsed.autoRePairEnabled;
        if (parsed.sessionActive !== undefined) chessState.sessionActive = parsed.sessionActive;
        if (typeof parsed.sessionTimeRemaining === 'number')
          chessState.sessionTimeRemaining = parsed.sessionTimeRemaining;
        loaded = true;
      }
    }
  } catch (e) {
    console.error('Error loading primary chess state:', e);
  }

  // 2. Legacy Auto-Rescue Check if primary is empty!
  if (!loaded) {
    for (const key of LEGACY_STORAGE_KEYS) {
      if (key === STORAGE_KEY) continue;
      try {
        const legacyRaw = localStorage.getItem(key);
        if (legacyRaw) {
          const legacyData = JSON.parse(legacyRaw);
          const candidateState = legacyData.state || legacyData;
          if (Array.isArray(candidateState.players) && candidateState.players.length > 0) {
            chessState.players = candidateState.players;
            chessState.matches = Array.isArray(candidateState.matches)
              ? candidateState.matches
              : [];
            chessState.checkedInPlayerIds = Array.isArray(candidateState.checkedInPlayerIds)
              ? candidateState.checkedInPlayerIds
              : [];
            chessState.knockoutBracket = candidateState.knockoutBracket || null;
            loaded = true;
            console.log(
              `🛡️ Auto-rescued ${candidateState.players.length} pupils from legacy key: ${key}`,
            );
            saveChessState(); // Immediately mirror into v5 & master archive!
            showChessToast(
              `🛡️ Auto-recovered ${candidateState.players.length} pupils from backup storage!`,
              'success',
            );
            break;
          }
        }
      } catch (err) {}
    }
  }

  // 3. Fallback to INITIAL_PLAYERS from chess_data.js if available
  if (!loaded && Array.isArray(INITIAL_PLAYERS) && INITIAL_PLAYERS.length > 0) {
    chessState.players = JSON.parse(JSON.stringify(INITIAL_PLAYERS));
    chessState.matches = Array.isArray(INITIAL_MATCHES)
      ? JSON.parse(JSON.stringify(INITIAL_MATCHES))
      : [];
    chessState.checkedInPlayerIds = [];
    chessState.knockoutBracket = null;
    loaded = true;
    saveChessState();
  }

  // 4. Fallback check from IndexedDB offline database if still empty
  if (!loaded && typeof window !== 'undefined') {
    loadFromIndexedDB().then((idbData) => {
      if (
        idbData &&
        Array.isArray(idbData.players) &&
        idbData.players.length > 0 &&
        chessState.players.length === 0
      ) {
        chessState.players = idbData.players;
        chessState.matches = idbData.matches || [];
        chessState.checkedInPlayerIds = idbData.checkedInPlayerIds || [];
        chessState.knockoutBracket = idbData.knockoutBracket || null;
        saveChessState();
        renderChessHubView();
        showChessToast(
          `🛡️ Auto-recovered ${idbData.players.length} pupils from offline IndexedDB vault!`,
          'success',
        );
      }
    });
  }
}

function saveChessState(isIntentionalReset = false) {
  const payload = {
    timestamp: Date.now(),
    players: chessState.players,
    matches: chessState.matches,
    checkedInPlayerIds: chessState.checkedInPlayerIds,
    knockoutBracket: chessState.knockoutBracket,
    autoRePairEnabled: chessState.autoRePairEnabled,
    sessionActive: chessState.sessionActive,
    sessionTimeRemaining: chessState.sessionTimeRemaining,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    // Guard master archive: only write to archive if there are pupils, or if explicitly intentional
    if (chessState.players.length > 0 || isIntentionalReset) {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(payload));
    }
  } catch (e) {
    console.error('Error saving chess state to localStorage:', e);
  }

  // Mirror to IndexedDB asynchronously
  persistToIndexedDB(payload);
}

// Calculate House Totals dynamically
function calculateHouseTotals() {
  const totals = {
    victory: { id: 'victory', points: 0, games: 0, wins: 0, draws: 0, losses: 0, playersCount: 0 },
    warrior: { id: 'warrior', points: 0, games: 0, wins: 0, draws: 0, losses: 0, playersCount: 0 },
    dreadnought: {
      id: 'dreadnought',
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      playersCount: 0,
    },
    invincible: {
      id: 'invincible',
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      playersCount: 0,
    },
  };

  chessState.players.forEach((p) => {
    if (totals[p.house]) totals[p.house].playersCount++;
  });

  chessState.matches.forEach((m) => {
    const wH = m.whiteHouse;
    const bH = m.blackHouse;

    if (m.result === '1-0') {
      if (totals[wH]) {
        totals[wH].points += SCORING_RULES.WIN;
        totals[wH].wins++;
        totals[wH].games++;
      }
      if (totals[bH]) {
        totals[bH].points += SCORING_RULES.PARTICIPATION;
        totals[bH].losses++;
        totals[bH].games++;
      }
    } else if (m.result === '0-1') {
      if (totals[bH]) {
        totals[bH].points += SCORING_RULES.WIN;
        totals[bH].wins++;
        totals[bH].games++;
      }
      if (totals[wH]) {
        totals[wH].points += SCORING_RULES.PARTICIPATION;
        totals[wH].losses++;
        totals[wH].games++;
      }
    } else if (m.result === '1/2-1/2' || m.result === '½-½') {
      if (totals[wH]) {
        totals[wH].points += SCORING_RULES.DRAW;
        totals[wH].draws++;
        totals[wH].games++;
      }
      if (totals[bH]) {
        totals[bH].points += SCORING_RULES.DRAW;
        totals[bH].draws++;
        totals[bH].games++;
      }
    }
  });

  return totals;
}

// Main View Renderer
export function renderChessHubView() {
  initChessState();

  const container = document.getElementById('main-content');
  if (!container) return;

  const contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.style.paddingTop = '1.5rem';

  const houseTotals = calculateHouseTotals();
  const sortedHouses = Object.values(houseTotals).sort((a, b) => b.points - a.points);
  const leadingHouse = HOUSES[sortedHouses[0].id];

  // Whiteboard Projector Mode View (Clean, High-Contrast Classroom Display)
  if (chessState.whiteboardMode) {
    container.innerHTML = renderWhiteboardModeView(sortedHouses);
    return;
  }

  // Filtering players for display
  let filteredPlayers = [...chessState.players];
  if (chessState.filterYear === 'ks3') {
    filteredPlayers = filteredPlayers.filter((p) => p.year <= 9);
  } else if (chessState.filterYear === 'ks4') {
    filteredPlayers = filteredPlayers.filter((p) => p.year >= 10);
  }
  if (chessState.filterHouse !== 'all') {
    filteredPlayers = filteredPlayers.filter((p) => p.house === chessState.filterHouse);
  }
  filteredPlayers.sort((a, b) => a.rank - b.rank);

  let html = `
    <div style="max-width: 1200px; width: 100%; box-sizing: border-box; margin: 0 auto; padding: 0 16px 60px 16px; animation: fadeInUp 0.25s ease-out; font-family: 'Outfit', sans-serif; overflow-x: hidden;">
      
      <!-- Top Hero Header: 1960s Tournament Salon Placard -->
      <div style="background: #1c1917; border-radius: 12px; padding: 26px 24px; color: #ffffff; margin-bottom: 22px; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25); position: relative; overflow: hidden; border: 2px solid #44403c;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; position: relative; z-index: 2;">
          <div style="max-width: 680px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.35); padding: 4px 12px; border-radius: 4px; font-size: 0.76rem; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; font-family: 'Playfair Display', Georgia, serif; font-style: italic;">
              Period VI Thursdays · Senior Block History Room
            </div>
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 2.15rem; margin: 0 0 6px 0; color: #fafaf9; font-weight: 700; letter-spacing: 0.02em; line-height: 1.15;">
              Meoncross Chess Club &amp; House League
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: #d6d3d1; line-height: 1.55; font-family: 'Outfit', sans-serif;">
              Autumn Term tournament ledger and master ladder. Every completed game scores points toward the annual House Championship for <strong>Victory</strong>, <strong>Warrior</strong>, <strong>Dreadnought</strong>, and <strong>Invincible</strong>.
            </p>
          </div>

          <!-- Clean Primary Teacher Action Buttons -->
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <!-- Button 1: Master Whiteboard Launch (Main Projector Screen) -->
            <button onclick="window.toggleWhiteboardMode()" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: 1.5px solid #38bdf8; font-weight: 800; font-size: 0.92rem; padding: 11px 20px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 9px; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4); transition: all 0.15s;" title="Launch Big Screen Whiteboard Display for Interactive Projector (Press W)">
              <span style="font-size: 1.25rem; line-height: 1;">📺</span> Launch Whiteboard Mode (W)
            </button>

            <!-- Button 2: Quick Record Result -->
            <button onclick="window.openLogMatchModal()" style="background: #292524; color: #fafaf9; border: 1.5px solid #78716c; font-weight: 700; font-size: 0.88rem; padding: 11px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.25); transition: all 0.15s;" onmouseover="this.style.borderColor='#d4af37';this.style.color='#d4af37'" onmouseout="this.style.borderColor='#78716c';this.style.color='#fafaf9'">
              <span style="font-size: 1.05rem; line-height: 1;">⚔</span> Record Game Result
            </button>

            <!-- Button 3: Clean Teacher Tools Dropdown -->
            <div style="position: relative; display: inline-block;">
              <button id="btn-chess-admin-menu" onclick="window.toggleChessAdminDropdown(event)" style="background: rgba(255, 255, 255, 0.08); color: #e7e5e4; border: 1.5px solid #57534e; font-weight: 700; font-size: 0.84rem; padding: 11px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" title="Administrative & Backup Tools">
                <span>⚙️</span> Teacher Tools ▾
              </button>
              <div id="chess-admin-dropdown" style="display: ${chessState.showAdminDropdown ? 'block' : 'none'}; position: absolute; right: 0; top: calc(100% + 6px); background: #292524; border: 1.5px solid #57534e; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 1000; min-width: 230px; overflow: hidden;">
                <button type="button" onclick="window.openAssemblySlideModal(); window.toggleChessAdminDropdown();" style="width: 100%; text-align: left; background: transparent; border: none; border-bottom: 1px solid #3e3835; color: #fef08a; padding: 10px 14px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                  <span>⚑</span> Assembly Presentation Slide
                </button>
                <button type="button" onclick="window.toggleAutoRePair(); window.toggleChessAdminDropdown();" style="width: 100%; text-align: left; background: transparent; border: none; border-bottom: 1px solid #3e3835; color: ${chessState.autoRePairEnabled ? '#86efac' : '#fca5a5'}; padding: 10px 14px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                  <span>⚡</span> Auto Re-Pairing: ${chessState.autoRePairEnabled ? 'Active (ON)' : 'Paused'}
                </button>
                <button type="button" onclick="window.openDataVaultModal(); window.toggleChessAdminDropdown();" style="width: 100%; text-align: left; background: transparent; border: none; border-bottom: 1px solid #3e3835; color: #cbd5e1; padding: 10px 14px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                  <span>💾</span> Backup Data Vault
                </button>
                ${
                  getBackupInfo()
                    ? `
                  <button type="button" onclick="window.restoreChessBackup(); window.toggleChessAdminDropdown();" style="width: 100%; text-align: left; background: transparent; border: none; border-bottom: 1px solid #3e3835; color: #93c5fd; padding: 10px 14px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span>↺</span> Restore Cohort (${getBackupInfo().playerCount})
                  </button>
                `
                    : ''
                }
                ${
                  chessState.players.length > 0
                    ? `
                  <button type="button" onclick="window.resetClubDataToCleanSlate(); window.toggleChessAdminDropdown();" style="width: 100%; text-align: left; background: transparent; border: none; color: #fca5a5; padding: 10px 14px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span>✕</span> Reset Roster to Clean Slate
                  </button>
                `
                    : ''
                }
              </div>
            </div>
          </div>
        </div>

        <!-- House Points Scoring Rule Banner (Vintage Ledger Style) -->
        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 18px; padding-top: 14px; border-top: 1px solid #332e2a; font-size: 0.8rem; color: #d6d3d1; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #292524; border: 1px solid #57534e; color: #fafaf9; padding: 2px 8px; border-radius: 3px; font-weight: 700; font-family: monospace; font-size: 0.75rem;">+${SCORING_RULES.WIN}</span>
            <span>Win</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #292524; border: 1px solid #57534e; color: #fafaf9; padding: 2px 8px; border-radius: 3px; font-weight: 700; font-family: monospace; font-size: 0.75rem;">+${SCORING_RULES.DRAW}</span>
            <span>Draw</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #292524; border: 1px solid #57534e; color: #a8a29e; padding: 2px 8px; border-radius: 3px; font-weight: 700; font-family: monospace; font-size: 0.75rem;">+${SCORING_RULES.PARTICIPATION}</span>
            <span>Participation</span>
          </div>
          <div style="margin-left: auto; font-family: 'Playfair Display', Georgia, serif; font-style: italic; color: #d4af37; font-size: 0.88rem;">
            👑 Tournament Leader: <strong>${leadingHouse.name}</strong> (${sortedHouses[0].points} pts)
          </div>
        </div>
      </div>

      <!-- House Championship Podium Grid (Vintage Collegiate Plaques) -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #1c1917; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>♜</span> House Championship Standings
          </h2>
          <span style="font-size: 0.8rem; color: #78716c; font-family: monospace; background: #faf8f5; padding: 5px 12px; border-radius: 4px; border: 1px solid #e7e5e4;">GAMES LOGGED: ${chessState.matches.length}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; width: 100%; box-sizing: border-box;">
          ${sortedHouses
            .map((hStats, index) => {
              const houseInfo = HOUSES[hStats.id];
              const isFirst = index === 0 && hStats.points > 0;
              return `
              <div class="chess-house-card" style="background: #faf8f5; border: 1.5px solid ${isFirst ? '#c5a059' : '#e7e5e4'}; border-radius: 8px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); position: relative; overflow: hidden;">
                ${isFirst ? `<div style="position: absolute; top: 0; right: 0; background: #c5a059; color: #1c1917; font-size: 0.62rem; font-weight: 800; padding: 3px 8px; border-bottom-left-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; font-family: monospace;">★ 1ST PLACE</div>` : ''}
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <div style="width: 34px; height: 34px; border-radius: 6px; background: ${houseInfo.bgLight}; border: 1.5px solid ${houseInfo.borderColor}; color: ${houseInfo.color}; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; font-weight: 800;">
                    ${houseInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style="margin: 0; font-size: 1.05rem; color: #1c1917; font-weight: 700; font-family: 'Playfair Display', Georgia, serif;">${houseInfo.name}</h3>
                    <div style="font-size: 0.7rem; color: #78716c; font-style: italic;">${houseInfo.ship}</div>
                  </div>
                </div>

                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px;">
                  <span style="font-size: 1.85rem; font-weight: 800; color: #1c1917; font-family: 'Playfair Display', serif; line-height: 1;">${hStats.points}</span>
                  <span style="font-size: 0.72rem; font-weight: 700; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">House Pts</span>
                </div>

                <div style="background: #e7e5e4; height: 5px; border-radius: 2px; overflow: hidden; margin-bottom: 10px;">
                  <div style="background: ${houseInfo.color}; height: 100%; width: ${Math.min(100, Math.round((hStats.points / (sortedHouses[0].points || 1)) * 100))}%; border-radius: 2px; transition: width 0.4s ease;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: #78716c; border-top: 1px solid #e7e5e4; padding-top: 8px; font-family: monospace;">
                  <span>${hStats.playersCount} Players</span>
                  <span>${hStats.wins}W · ${hStats.draws}D · ${hStats.losses}L</span>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Teacher Quick-Start Guide (Collapsible Card) -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; margin-bottom: 18px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <button type="button" onclick="window.toggleTeacherGuideCollapse()" style="width: 100%; text-align: left; background: #fafaf9; border: none; padding: 12px 18px; font-size: 0.88rem; font-weight: 800; color: #334155; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem; color: #2563eb;">ℹ️</span>
            <span>How Period 6 Works: Quick 3-Step Teacher Rhythm</span>
            <span style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">Guide</span>
          </div>
          <span style="font-size: 0.85rem; color: #64748b;">${chessState.showTeacherGuide ? '▲ Hide Guide' : '▼ Show Guide'}</span>
        </button>
        ${
          chessState.showTeacherGuide
            ? `
          <div style="padding: 16px 20px; border-top: 1px solid #e2e8f0; background: #ffffff;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
              <div style="background: #f8fafc; border-left: 3px solid #10b981; padding: 12px 14px; border-radius: 0 8px 8px 0;">
                <div style="font-size: 0.85rem; font-weight: 800; color: #065f46; margin-bottom: 4px;">1️⃣ 3:30pm — Pupil Arrival</div>
                <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
                  Click <strong>[ Check In All ]</strong> to mark regulars present in 1 second. For first-timers, use the quick 5-second registration form. Absent pupils stay unchecked and are never paired!
                </div>
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 12px 14px; border-radius: 0 8px 8px 0;">
                <div style="font-size: 0.85rem; font-weight: 800; color: #075985; margin-bottom: 4px;">2️⃣ 3:35pm — Launch Whiteboard</div>
                <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
                  Hit <strong>[ 📺 Launch Whiteboard Mode ]</strong> on your classroom projector. It shows the 60-min countdown clock, live House standings, and active boards for pupils to see.
                </div>
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #8b5cf6; padding: 12px 14px; border-radius: 0 8px 8px 0;">
                <div style="font-size: 0.85rem; font-weight: 800; color: #5b21b6; margin-bottom: 4px;">3️⃣ 3:35–4:28pm — Hands-Off Play</div>
                <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
                  When a game finishes, tap <strong>[ White Win ]</strong>, <strong>[ Draw ]</strong>, or <strong>[ Black Win ]</strong> on the screen. The computer auto-pairs idle pupils onto new boards!
                </div>
              </div>
            </div>
          </div>
        `
            : ''
        }
      </div>

      <!-- Main Navigation Tabs: Classic Typography -->
      <div style="display: flex; gap: 4px; border-bottom: 2px solid #e7e5e4; margin-bottom: 20px; overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; padding-bottom: 2px; scrollbar-width: thin;">
        <button onclick="window.switchChessTab('signin')" style="${getTabStyle(chessState.activeTab === 'signin')}">
          <span style="font-size: 1.1rem; line-height: 1;">♔</span> Period 6
        </button>
        <button onclick="window.switchChessTab('beginners')" style="${getTabStyle(chessState.activeTab === 'beginners')}">
          <span style="font-size: 1.05rem; line-height: 1;">🌱</span> Rookie Academy
        </button>
        <button onclick="window.switchChessTab('ladder')" style="${getTabStyle(chessState.activeTab === 'ladder')}">
          <span style="font-size: 1.05rem; line-height: 1;">🪜</span> Master Ladder (${chessState.players.length})
        </button>
        <button onclick="window.switchChessTab('table')" style="${getTabStyle(chessState.activeTab === 'table')}">
          <span style="font-size: 1.05rem; line-height: 1;">☵</span> League Cross-Table
        </button>
        <button onclick="window.switchChessTab('pairings')" style="${getTabStyle(chessState.activeTab === 'pairings')}">
          <span style="font-size: 1.05rem; line-height: 1;">⚔</span> Round Pairings
        </button>
        <button onclick="window.switchChessTab('knockout')" style="${getTabStyle(chessState.activeTab === 'knockout')}">
          <span style="font-size: 1.05rem; line-height: 1;">♛</span> Championship Cup
        </button>
        <button onclick="window.switchChessTab('drills')" style="${getTabStyle(chessState.activeTab === 'drills')}">
          <span style="font-size: 1.05rem; line-height: 1;">📖</span> Master Tactical Drills
        </button>
        <button onclick="window.switchChessTab('matches')" style="${getTabStyle(chessState.activeTab === 'matches')}">
          <span style="font-size: 1.05rem; line-height: 1;">📜</span> Match Ledger (${chessState.matches.length})
        </button>
      </div>

      <!-- Year & House Filter Controls Bar (Visible on Ladder & Table) -->
      ${
        chessState.activeTab === 'ladder' || chessState.activeTab === 'table'
          ? `
        <div style="display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; background: #ffffff; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
            <i class="fa-solid fa-filter" style="color: #8b5cf6;"></i> Year:
          </div>
          <button onclick="window.setChessYearFilter('all')" style="${getFilterPillStyle(chessState.filterYear === 'all')}">All (7–11)</button>
          <button onclick="window.setChessYearFilter('ks3')" style="${getFilterPillStyle(chessState.filterYear === 'ks3')}">KS3 (Y7–9)</button>
          <button onclick="window.setChessYearFilter('ks4')" style="${getFilterPillStyle(chessState.filterYear === 'ks4')}">KS4 (Y10–11)</button>

          <div style="width: 1px; height: 18px; background: #cbd5e1; margin: 0 2px;"></div>

          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
            <i class="fa-solid fa-shield-halved" style="color: #2563eb;"></i> House:
          </div>
          <button onclick="window.setChessHouseFilter('all')" style="${getFilterPillStyle(chessState.filterHouse === 'all')}">All</button>
          ${Object.values(HOUSES)
            .map(
              (h) => `
            <button onclick="window.setChessHouseFilter('${h.id}')" style="${getFilterPillStyle(chessState.filterHouse === h.id)}">
              ${h.name}
            </button>
          `,
            )
            .join('')}

          <div style="margin-left: auto;">
            <button onclick="window.openAddPlayerModal()" style="background: #10b981; color: #ffffff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-user-plus"></i> Register Pupil
            </button>
          </div>
        </div>
      `
          : ''
      }

      <!-- Tab Content Panels -->
      <div id="chess-tab-content">
        ${renderActiveTabContent(filteredPlayers)}
      </div>

    </div>

    <!-- Modals (Hidden by default) -->
    <div id="chess-modal-container"></div>
  `;

  container.innerHTML = html;
}

// Tab Content Router
function renderActiveTabContent(filteredPlayers) {
  if (chessState.activeTab === 'signin') {
    return renderSignInTab(filteredPlayers);
  } else if (chessState.activeTab === 'beginners') {
    return renderBeginnersTab();
  } else if (chessState.activeTab === 'ladder') {
    return renderLadderTab(filteredPlayers);
  } else if (chessState.activeTab === 'table') {
    return renderLeagueTableTab(filteredPlayers);
  } else if (chessState.activeTab === 'pairings') {
    return renderPairingsTab();
  } else if (chessState.activeTab === 'knockout') {
    return renderKnockoutTab();
  } else if (chessState.activeTab === 'drills') {
    return renderDrillsTab();
  } else if (chessState.activeTab === 'matches') {
    return renderMatchesTab();
  }
  return '';
}

// 1. Master Ladder View (King of the Hill)
function renderLadderTab(players) {
  const backupInfo = getBackupInfo();
  if (players.length === 0) {
    return `
      <div style="background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 48px 24px; text-align: center; color: #64748b;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #f3e8ff; color: #8b5cf6; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px;">
          <i class="fa-solid fa-stairs"></i>
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 1.25rem; color: #0f172a; font-weight: 800;">
          The Master Ladder is Ready
        </h3>
        <p style="margin: 0 auto 20px; max-width: 480px; font-size: 0.92rem; color: #64748b; line-height: 1.5;">
          No pupils are currently on the ladder. Sign in arriving pupils in the <strong>Pupil Sign-In</strong> tab to build your club ladder from scratch!
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button onclick="window.switchChessTab('signin')" style="background: #10b981; color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 10px 20px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
            <i class="fa-solid fa-clipboard-user"></i> Go to Pupil Sign-In
          </button>
          ${
            backupInfo
              ? `
            <button onclick="window.restoreChessBackup()" style="background: #ffffff; color: #1e40af; border: 1.5px solid #bfdbfe; font-weight: 700; font-size: 0.9rem; padding: 10px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-arrow-rotate-left"></i> Restore Previous Cohort (${backupInfo.playerCount})
            </button>
          `
              : ''
          }
        </div>
        ${
          backupInfo
            ? `
          <div style="margin-top: 20px; font-size: 0.8rem; color: #64748b;">
            <i class="fa-solid fa-shield-halved" style="color: #6366f1;"></i> Accidentally clicked Reset Slate? An emergency backup from <strong>${backupInfo.dateStr}</strong> (${backupInfo.playerCount} pupils, ${backupInfo.matchCount} games) is safely preserved.
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  return `
    <div>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 4px solid #8b5cf6; padding: 12px 18px; border-radius: 8px; margin-bottom: 18px; font-size: 0.88rem; color: #334155; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <strong><i class="fa-solid fa-circle-info" style="color: #8b5cf6;"></i> The Master Ladder Rules:</strong> Pupils can challenge any player up to <strong>2 rungs above</strong> them. If the challenger wins, they swap rungs!
        </div>
        <span style="font-size: 0.8rem; font-weight: 700; color: #64748b;">Showing ${players.length} Pupils</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${players
          .map((p) => {
            const h = HOUSES[p.house];
            const isCheckedIn = chessState.checkedInPlayerIds.includes(p.id);
            let badgeBg = '#f1f5f9';
            let badgeColor = '#475569';
            if (p.rank === 1) {
              badgeBg = '#fef08a';
              badgeColor = '#854d0e';
            } else if (p.rank === 2) {
              badgeBg = '#e2e8f0';
              badgeColor = '#334155';
            } else if (p.rank === 3) {
              badgeBg = '#fed7aa';
              badgeColor = '#9a3412';
            }

            return `
            <div class="ladder-row" style="background: #ffffff; border: 1.5px solid ${isCheckedIn ? '#86efac' : '#e2e8f0'}; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.15s ease;" onmouseover="this.style.transform='translateX(3px)'" onmouseout="this.style.transform='translateX(0)'">
              
              <!-- Left: Rank & Avatar & Name -->
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: ${badgeBg}; color: ${badgeColor}; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                  ${p.rank === 1 ? '<i class="fa-solid fa-crown"></i>' : `#${p.rank}`}
                </div>

                <div>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h3 style="margin: 0; font-size: 1.05rem; color: #0f172a; font-weight: 700;">${p.name}</h3>
                    <span style="background: ${h.bgLight}; color: ${h.color}; border: 1px solid ${h.borderColor}; padding: 2px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">
                      <i class="fa-solid ${h.icon}"></i> ${h.name}
                    </span>
                    <span style="background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">
                      Year ${p.year}
                    </span>
                    ${
                      isCheckedIn
                        ? `<span style="background: #dcfce7; color: #15803d; font-size: 0.72rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-circle-check"></i> Present</span>`
                        : `<span style="background: #f1f5f9; color: #94a3b8; font-size: 0.72rem; font-weight: 600; padding: 2px 6px; border-radius: 4px;">Absent</span>`
                    }
                  </div>
                  <div style="font-size: 0.78rem; color: #64748b; margin-top: 3px;">
                    Rating: <strong>${p.rating}</strong> · Played: <strong>${p.games}</strong> (${p.won}W / ${p.drawn}D / ${p.lost}L)
                  </div>
                </div>
              </div>

              <!-- Right: Challenge Action & Contribution -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="text-align: right; margin-right: 4px;">
                  <div style="font-size: 1.05rem; font-weight: 800; color: ${h.color};">${p.won * SCORING_RULES.WIN + p.drawn * SCORING_RULES.DRAW + p.lost * SCORING_RULES.PARTICIPATION} pts</div>
                  <div style="font-size: 0.68rem; color: #64748b; text-transform: uppercase; font-weight: 700;">House Contribution</div>
                </div>

                ${
                  isCheckedIn
                    ? `<button onclick="window.checkOutPlayer('${p.id}')" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #64748b; padding: 6px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">Check Out</button>`
                    : `<button onclick="window.checkInPlayer('${p.id}')" style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #059669; padding: 6px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">+ Check In</button>`
                }

                <button onclick="window.quickChallengePlayer('${p.id}')" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #1e3a8a; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                  <i class="fa-solid fa-chess-knight" style="color: #8b5cf6;"></i> Challenge
                </button>

                <button onclick="window.removePlayer('${p.id}')" title="Delete pupil" style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 6px;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#94a3b8'">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>

            </div>
          `;
          })
          .join('')}
      </div>
    </div>
  `;
}

// 2. League Table View
function renderLeagueTableTab(players) {
  if (players.length === 0) {
    return `
      <div style="background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 48px 24px; text-align: center; color: #64748b;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px;">
          <i class="fa-solid fa-table-list"></i>
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 1.25rem; color: #0f172a; font-weight: 800;">
          League Table is Clean
        </h3>
        <p style="margin: 0 auto 20px; max-width: 480px; font-size: 0.92rem; color: #64748b; line-height: 1.5;">
          No matches or pupils recorded yet. Registered pupils and their match results will rank here automatically.
        </p>
        <button onclick="window.switchChessTab('signin')" style="background: #10b981; color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 10px 20px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          <i class="fa-solid fa-clipboard-user"></i> Go to Pupil Sign-In
        </button>
      </div>
    `;
  }

  const sortedByPoints = [...players].sort((a, b) => {
    const ptsA =
      a.won * SCORING_RULES.WIN +
      a.drawn * SCORING_RULES.DRAW +
      a.lost * SCORING_RULES.PARTICIPATION;
    const ptsB =
      b.won * SCORING_RULES.WIN +
      b.drawn * SCORING_RULES.DRAW +
      b.lost * SCORING_RULES.PARTICIPATION;
    return ptsB - ptsA || b.rating - a.rating;
  });

  return `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div style="width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="width: 100%; min-width: 680px; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;">
              <th style="padding: 12px 14px;">Rank</th>
              <th style="padding: 12px 14px;">Pupil</th>
              <th style="padding: 12px 14px;">Year</th>
              <th style="padding: 12px 14px;">House</th>
              <th style="padding: 12px 14px; text-align: center;">Played</th>
              <th style="padding: 12px 14px; text-align: center;">Won</th>
              <th style="padding: 12px 14px; text-align: center;">Drawn</th>
              <th style="padding: 12px 14px; text-align: center;">Lost</th>
              <th style="padding: 12px 14px; text-align: center;">Rating</th>
              <th style="padding: 12px 14px; text-align: right;">House Points</th>
            </tr>
          </thead>
          <tbody>
            ${sortedByPoints
              .map((p, idx) => {
                const h = HOUSES[p.house];
                const totalPts =
                  p.won * SCORING_RULES.WIN +
                  p.drawn * SCORING_RULES.DRAW +
                  p.lost * SCORING_RULES.PARTICIPATION;
                return `
                <tr class="chess-table-row" style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                  <td style="padding: 12px 14px; font-weight: 800; color: #64748b;">${idx + 1}</td>
                  <td style="padding: 12px 14px; font-weight: 700; color: #0f172a;">${p.name}</td>
                  <td style="padding: 12px 14px; color: #475569;">Year ${p.year}</td>
                  <td style="padding: 12px 14px;">
                    <span style="background: ${h.bgLight}; color: ${h.color}; border: 1px solid ${h.borderColor}; padding: 3px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700;">
                      <i class="fa-solid ${h.icon}"></i> ${h.name}
                    </span>
                  </td>
                  <td style="padding: 12px 14px; text-align: center; font-weight: 600;">${p.games}</td>
                  <td style="padding: 12px 14px; text-align: center; color: #16a34a; font-weight: 700;">${p.won}</td>
                  <td style="padding: 12px 14px; text-align: center; color: #2563eb; font-weight: 700;">${p.drawn}</td>
                  <td style="padding: 12px 14px; text-align: center; color: #94a3b8;">${p.lost}</td>
                  <td style="padding: 12px 14px; text-align: center; font-family: monospace; font-weight: 700; color: #334155;">${p.rating}</td>
                  <td style="padding: 12px 14px; text-align: right; font-weight: 800; color: ${h.color}; font-size: 1.05rem;">+${totalPts}</td>
                </tr>
              `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Helper: Get active puzzle collection based on selected category ('grandmaster' vs 'beginner')
function getActivePuzzles() {
  if (chessState.puzzleCategory === 'beginner') {
    return Array.isArray(BEGINNER_ROOKIE_PUZZLES) && BEGINNER_ROOKIE_PUZZLES.length > 0
      ? BEGINNER_ROOKIE_PUZZLES
      : [];
  }
  return Array.isArray(BETH_HARMON_PUZZLES) && BETH_HARMON_PUZZLES.length > 0
    ? BETH_HARMON_PUZZLES
    : [];
}

// The Beth Harmon Ceiling Board: Interactive Tactical Starter (Movable Pieces & Sandbox Mode)
function renderBethHarmonCeilingBoard() {
  const puzzles = getActivePuzzles();
  if (puzzles.length === 0) return '';

  const puzzleIdx = (chessState.currentPuzzleIdx || 0) % puzzles.length;
  const puzzle = puzzles[puzzleIdx];
  const totalPuzzles = puzzles.length;
  const isCollapsed = chessState.showStarterPuzzle === false;

  // Initialize interactive board matrix if not already set or if puzzle changed
  if (!chessState.activePuzzleBoard || chessState.activePuzzleIndex !== puzzleIdx) {
    chessState.activePuzzleBoard = JSON.parse(JSON.stringify(puzzle.board));
    chessState.activePuzzleIndex = puzzleIdx;
    chessState.selectedSquare = null;
    chessState.puzzleMoveStep = 0;
    chessState.puzzleStatus = 'idle';
    chessState.puzzleFeedback = null;
  }

  const PIECE_GLYPHS = {
    k: '♚',
    q: '♛',
    r: '♜',
    b: '♝',
    n: '♞',
    p: '♟',
    K: '♔',
    Q: '♕',
    R: '♖',
    B: '♗',
    N: '♘',
    P: '♙',
    '.': '',
  };

  const boardMatrix = chessState.activePuzzleBoard;

  let squaresHtml = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      const pieceCode = (boardMatrix[r] && boardMatrix[r][c]) || '.';
      const glyph = PIECE_GLYPHS[pieceCode] || '';
      const isWhitePiece = /[KQBNRP]/.test(pieceCode);
      const isBlackPiece = /[kqbnrp]/.test(pieceCode);

      const isSelected =
        chessState.selectedSquare &&
        chessState.selectedSquare[0] === r &&
        chessState.selectedSquare[1] === c;

      let bg = isLight ? '#f2ebe0' : '#785338';
      if (isSelected) {
        bg = '#d97706';
      }

      const color = isWhitePiece ? '#ffffff' : isBlackPiece ? '#18181b' : 'transparent';
      const textShadow = isWhitePiece
        ? '0 1px 2px rgba(0,0,0,0.9), 0 0 1px #000'
        : '0 1px 2px rgba(255,255,255,0.4)';

      const squareNotation = `${String.fromCharCode(97 + c)}${8 - r}`;
      const titleAttr = glyph
        ? `${squareNotation}: ${pieceCode} (Click or drag to move)`
        : `${squareNotation}`;

      squaresHtml += `
        <div onclick="window.handleBethSquareClick(${r}, ${c})"
             ondragstart="window.handleBethDragStart(event, ${r}, ${c})"
             ondragover="event.preventDefault()"
             ondrop="window.handleBethDrop(event, ${r}, ${c})"
             draggable="${glyph ? 'true' : 'false'}"
             title="${titleAttr}"
             style="background: ${bg}; display: flex; align-items: center; justify-content: center; font-size: clamp(1.2rem, 2.7vw, 2.05rem); font-family: 'Apple Symbols', 'Segoe UI Symbol', 'DejaVu Sans', serif; color: ${color}; text-shadow: ${textShadow}; user-select: none; position: relative; cursor: ${glyph || chessState.selectedSquare ? 'pointer' : 'default'}; box-shadow: ${isSelected ? 'inset 0 0 0 3px #fbbf24, 0 0 12px rgba(251, 191, 36, 0.7)' : 'none'}; z-index: ${isSelected ? 3 : 1}; transition: all 0.15s ease;">
          ${glyph}
          ${c === 0 ? `<span style="position: absolute; top: 1px; left: 2px; font-size: 8px; font-family: monospace; font-weight: bold; color: ${isLight ? '#785338' : '#f2ebe0'}; opacity: 0.75; pointer-events: none;">${8 - r}</span>` : ''}
          ${r === 7 ? `<span style="position: absolute; bottom: 1px; right: 2px; font-size: 8px; font-family: monospace; font-weight: bold; color: ${isLight ? '#785338' : '#f2ebe0'}; opacity: 0.75; pointer-events: none;">${String.fromCharCode(97 + c)}</span>` : ''}
        </div>
      `;
    }
  }

  return `
    <div id="chess-interactive-board-container" style="background: #1c1917; border: 2px solid #44403c; border-radius: 12px; padding: 20px; box-shadow: 0 12px 30px rgba(0,0,0,0.35); color: #fafaf9; margin-bottom: 22px;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1.5px solid #38332e; padding-bottom: 12px; margin-bottom: ${isCollapsed ? '0' : '16px'};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #292524; border: 1px solid #57534e; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #d4af37;">
            ${chessState.puzzleCategory === 'beginner' ? '🌱' : '♟'}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <h3 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.22rem; color: #f5f5f4; font-weight: 700; letter-spacing: 0.02em;">
                ${chessState.puzzleCategory === 'beginner' ? '🌱 Rookie Academy: Training Missions' : 'The Beth Harmon Ceiling Board'}
              </h3>
              <span style="background: #362f27; color: #d4af37; border: 1px solid #785338; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; font-family: monospace;">
                ${chessState.puzzleCategory === 'beginner' ? 'Rookie Mission' : 'Tactical Starter'} · Challenge ${puzzleIdx + 1} of ${totalPuzzles}
              </span>
              ${
                chessState.sandboxMode
                  ? `<span style="background: #0369a1; color: #bae6fd; border: 1px solid #38bdf8; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; font-family: monospace;">🔓 Free Move Sandbox</span>`
                  : `<span style="background: #14532d; color: #86efac; border: 1px solid #22c55e; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; font-family: monospace;">⚔ Movable Pieces</span>`
              }
            </div>
            <div style="font-size: 0.8rem; color: #a8a29e; margin-top: 2px;">
              ${isCollapsed ? 'Click "Expand Board" to calculate the tactical combination.' : chessState.puzzleCategory === 'beginner' ? 'Solve interactive challenges designed for beginners and Year 7s! Tap or drag pieces to make your move.' : 'Tap or drag pieces to play the combination. Practice on your screen before Period 6 pairings begin!'}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <!-- Category Switcher Pill -->
          <div style="display: inline-flex; background: #292524; border: 1px solid #57534e; border-radius: 6px; padding: 2px;">
            <button type="button" onclick="window.setBethHarmonCategory('grandmaster')" style="${chessState.puzzleCategory !== 'beginner' ? 'background: #d4af37; color: #1c1917; font-weight: 800;' : 'background: transparent; color: #a8a29e; font-weight: 600;'} border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; transition: all 0.15s ease;">
              🏆 Grandmaster Legends
            </button>
            <button type="button" onclick="window.setBethHarmonCategory('beginner')" style="${chessState.puzzleCategory === 'beginner' ? 'background: #22c55e; color: #14532d; font-weight: 800;' : 'background: transparent; color: #a8a29e; font-weight: 600;'} border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; transition: all 0.15s ease;">
              🌱 Rookie Missions (${BEGINNER_ROOKIE_PUZZLES.length})
            </button>
          </div>

          <button type="button" onclick="window.cycleBethHarmonPuzzle(-1)" style="background: #292524; color: #fafaf9; border: 1px solid #57534e; width: 32px; height: 32px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;" title="Previous Puzzle">
            ◀
          </button>
          <span style="font-family: monospace; font-size: 0.8rem; color: #d4af37; padding: 0 4px;">
            ${puzzleIdx + 1}/${totalPuzzles}
          </span>
          <button type="button" onclick="window.cycleBethHarmonPuzzle(1)" style="background: #292524; color: #fafaf9; border: 1px solid #57534e; width: 32px; height: 32px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-weight: bold;" title="Next Puzzle">
            ▶
          </button>
          <button type="button" onclick="window.toggleStarterPuzzleCollapse()" style="background: #292524; color: #e7e5e4; border: 1px solid #57534e; font-size: 0.76rem; font-weight: 700; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-left: 6px;">
            ${isCollapsed ? '▾ Expand Board' : '▴ Collapse'}
          </button>
        </div>
      </div>

      ${
        isCollapsed
          ? ''
          : `
      <!-- Main Interactive Content: 2-Column Split -->
      <div style="display: grid; grid-template-columns: minmax(280px, 340px) 1fr; gap: 24px; align-items: start;">
        
        <!-- Left: The Visual 8x8 Chessboard with Movable Pieces -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 100%; max-width: 320px; aspect-ratio: 1; display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(8, 1fr); border: 3.5px solid #44403c; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); overflow: hidden;">
            ${squaresHtml}
          </div>
          <div style="font-size: 0.72rem; color: #78716c; margin-top: 8px; font-family: monospace; text-align: center;">
            [White at bottom · Black at top · Tap/drag pieces to move]
          </div>

          <!-- Board Interactive Toolbar -->
          <div style="display: flex; gap: 8px; justify-content: center; margin-top: 10px; flex-wrap: wrap; width: 100%;">
            <button type="button" onclick="window.resetBethHarmonBoard()" style="background: #292524; color: #fafaf9; border: 1px solid #57534e; padding: 6px 12px; border-radius: 4px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="Reset pieces to starting puzzle layout">
              <span>↺</span> Reset Position
            </button>
            <button type="button" onclick="window.toggleBethHarmonSandbox()" style="background: ${chessState.sandboxMode ? '#0284c7' : '#292524'}; color: #fafaf9; border: 1px solid ${chessState.sandboxMode ? '#38bdf8' : '#57534e'}; padding: 6px 12px; border-radius: 4px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="Toggle Free Move Sandbox to experiment freely with any piece">
              <span>${chessState.sandboxMode ? '🔓 Free Move: ON' : '🔒 Challenge Mode'}</span>
            </button>
          </div>

          <!-- Selection helper text -->
          ${
            chessState.selectedSquare
              ? `
            <div style="background: rgba(217, 119, 6, 0.15); border: 1px solid #d97706; color: #fef3c7; padding: 6px 12px; border-radius: 4px; margin-top: 8px; font-size: 0.78rem; text-align: center; font-family: monospace; width: 100%; box-sizing: border-box;">
              Selected: <strong>${String.fromCharCode(97 + chessState.selectedSquare[1])}${8 - chessState.selectedSquare[0]}</strong> — Tap destination square to move!
            </div>
          `
              : ''
          }

          <!-- Feedback Alert Banner -->
          ${
            chessState.puzzleFeedback
              ? `
            <div style="background: ${chessState.puzzleFeedback.type === 'success' ? '#14532d' : chessState.puzzleFeedback.type === 'error' ? '#7f1d1d' : '#1e293b'}; border: 1px solid ${chessState.puzzleFeedback.type === 'success' ? '#22c55e' : chessState.puzzleFeedback.type === 'error' ? '#ef4444' : '#38bdf8'}; color: #fafafa; padding: 10px 14px; border-radius: 6px; margin-top: 10px; font-size: 0.84rem; line-height: 1.45; animation: fadeInUp 0.2s ease; width: 100%; box-sizing: border-box;">
              ${chessState.puzzleFeedback.text}
            </div>
          `
              : ''
          }
        </div>

        <!-- Right: Story, Clues & Interactive Controls -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
              <span style="background: #292524; color: #f59e0b; border: 1px solid #78350f; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
                ${puzzle.tag}
              </span>
              <span style="font-size: 0.75rem; color: #a8a29e; font-weight: 600;">
                Difficulty: <strong style="color: #f5f5f4;">${puzzle.difficulty}</strong>
              </span>
              ${
                puzzle.steps && puzzle.steps.length > 0
                  ? `
                <span style="background: #27272a; color: #38bdf8; border: 1px solid #0369a1; font-size: 0.72rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; font-family: monospace;">
                  Step ${Math.min((chessState.puzzleMoveStep || 0) + 1, puzzle.steps.length)}/${puzzle.steps.length}
                </span>
              `
                  : ''
              }
            </div>
            <h4 style="margin: 0 0 6px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; color: #f5f5f4;">
              ${puzzle.title}
            </h4>
            <div style="font-size: 0.88rem; font-weight: 800; color: #d4af37; font-family: monospace; margin-bottom: 8px;">
              ⚔ ${puzzle.toMove}
            </div>
            <p style="margin: 0; font-size: 0.86rem; color: #d6d3d1; line-height: 1.55;">
              ${puzzle.intro}
            </p>
          </div>

          <!-- Interactive Action Buttons -->
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px;">
            <button type="button" onclick="window.toggleBethHarmonHint()" style="background: #292524; color: #f59e0b; border: 1px solid #78350f; padding: 8px 14px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <span>💡</span> ${chessState.showBethHarmonHint ? 'Hide Hint' : 'Show Tactical Hint'}
            </button>
            <button type="button" onclick="window.toggleBethHarmonSolution()" style="background: #292524; color: #22c55e; border: 1px solid #14532d; padding: 8px 14px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <span>♛</span> ${chessState.showBethHarmonSolution ? 'Hide Solution' : 'Reveal Solution'}
            </button>
          </div>

          <!-- Hint Box -->
          ${
            chessState.showBethHarmonHint
              ? `
            <div style="background: #292524; border-left: 3px solid #f59e0b; border-radius: 0 6px 6px 0; padding: 10px 14px; font-size: 0.84rem; color: #fef3c7; line-height: 1.45; animation: fadeIn 0.2s ease-out;">
              <strong>Tactical Clue:</strong> ${puzzle.hint}
            </div>
          `
              : ''
          }

          <!-- Solution Box -->
          ${
            chessState.showBethHarmonSolution
              ? `
            <div style="background: #14281d; border: 1px solid #166534; border-left: 3px solid #22c55e; border-radius: 0 6px 6px 0; padding: 12px 14px; animation: fadeIn 0.2s ease-out;">
              <div style="font-size: 0.76rem; font-weight: 800; color: #86efac; text-transform: uppercase; font-family: monospace; margin-bottom: 4px;">
                Expected Continuation:
              </div>
              <div style="font-size: 1.05rem; font-weight: 900; color: #ffffff; font-family: monospace; margin-bottom: 6px;">
                ${puzzle.solutionMoves}
              </div>
              <div style="font-size: 0.82rem; color: #bbf7d0; line-height: 1.45;">
                ${puzzle.solutionExplanation}
              </div>
            </div>
          `
              : ''
          }

        </div>
      </div>
      `
      }
    </div>
  `;
}

// Window controls & handlers for Beth Harmon Ceiling Board & Rookie Training Board
function executeBethMove(fromR, fromC, toR, toC, puzzle) {
  const sourcePiece = chessState.activePuzzleBoard[fromR][fromC];

  // 1. Free Move Sandbox Mode
  if (chessState.sandboxMode) {
    chessState.activePuzzleBoard[toR][toC] = sourcePiece;
    chessState.activePuzzleBoard[fromR][fromC] = '.';
    chessState.selectedSquare = null;
    chessState.puzzleFeedback = {
      text: `Moved ${sourcePiece} to ${String.fromCharCode(97 + toC)}${8 - toR} (Sandbox Mode)`,
      type: 'info',
    };
    renderChessHubView();
    return;
  }

  // 2. Tactical Challenge Mode
  const steps = puzzle.steps || [];
  const stepIdx = chessState.puzzleMoveStep || 0;
  const currentStep = steps[stepIdx];

  if (!currentStep) {
    chessState.selectedSquare = null;
    chessState.puzzleFeedback = {
      text: 'Puzzle already solved! Press "Reset Position" or switch to the next challenge.',
      type: 'success',
    };
    renderChessHubView();
    return;
  }

  // Check expected origin
  const matchFrom = currentStep.expectedFrom[0] === fromR && currentStep.expectedFrom[1] === fromC;

  // Check expected destination (can be single [r, c] or array of valid squares)
  let matchTo = false;
  if (Array.isArray(currentStep.expectedTo[0])) {
    matchTo = currentStep.expectedTo.some(([er, ec]) => er === toR && ec === toC);
  } else {
    matchTo = currentStep.expectedTo[0] === toR && currentStep.expectedTo[1] === toC;
  }

  if (matchFrom && matchTo) {
    // Correct Move! Auto-promote pawns reaching the back rank
    let finalPiece = sourcePiece;
    if (sourcePiece === 'P' && toR === 0) finalPiece = 'Q';
    if (sourcePiece === 'p' && toR === 7) finalPiece = 'q';

    chessState.activePuzzleBoard[toR][toC] = finalPiece;
    chessState.activePuzzleBoard[fromR][fromC] = '.';
    chessState.selectedSquare = null;

    if (currentStep.replyFrom && currentStep.replyTo) {
      chessState.puzzleFeedback = { text: currentStep.successMsg, type: 'success' };
      renderChessHubView();

      // Schedule opponent reply
      setTimeout(() => {
        const repFrom = currentStep.replyFrom;
        const repTo = currentStep.replyTo;
        const repPiece =
          currentStep.replyPiece || chessState.activePuzzleBoard[repFrom[0]][repFrom[1]];
        chessState.activePuzzleBoard[repTo][toC] = repPiece;
        chessState.activePuzzleBoard[repFrom[0]][repFrom[1]] = '.';
        chessState.puzzleMoveStep = stepIdx + 1;
        chessState.puzzleFeedback = { text: currentStep.replyMsg, type: 'info' };
        renderChessHubView();
      }, 700);
    } else {
      chessState.puzzleMoveStep = stepIdx + 1;
      chessState.puzzleStatus = 'solved';
      chessState.puzzleFeedback = { text: currentStep.successMsg, type: 'success' };
      showChessToast(currentStep.successMsg, 'success');
      renderChessHubView();
    }
  } else {
    chessState.selectedSquare = null;
    chessState.puzzleFeedback = {
      text: `❌ Not quite right! Re-calculate your move or view the clue. (Hint: ${puzzle.hint})`,
      type: 'error',
    };
    renderChessHubView();
  }
}

window.handleBethSquareClick = function (r, c) {
  const puzzles = getActivePuzzles();
  const puzzle = puzzles[(chessState.currentPuzzleIdx || 0) % puzzles.length];
  if (!puzzle) return;

  const currentBoard = chessState.activePuzzleBoard;
  if (!currentBoard) return;
  const targetPiece = currentBoard[r][c];

  // If nothing is selected yet
  if (!chessState.selectedSquare) {
    if (targetPiece && targetPiece !== '.') {
      chessState.selectedSquare = [r, c];
      renderChessHubView();
    }
    return;
  }

  // Square was already selected
  const [fromR, fromC] = chessState.selectedSquare;
  const sourcePiece = currentBoard[fromR][fromC];

  // If clicking the same square: deselect
  if (fromR === r && fromC === c) {
    chessState.selectedSquare = null;
    renderChessHubView();
    return;
  }

  // If clicking another piece of the same color/side: switch selection
  const isWhiteSource = /[KQBNRP]/.test(sourcePiece);
  const isWhiteTarget = /[KQBNRP]/.test(targetPiece);
  if (!chessState.sandboxMode && targetPiece !== '.' && isWhiteSource === isWhiteTarget) {
    chessState.selectedSquare = [r, c];
    renderChessHubView();
    return;
  }

  // Attempt the move
  executeBethMove(fromR, fromC, r, c, puzzle);
};

window.handleBethDragStart = function (e, r, c) {
  if (e && e.dataTransfer) {
    e.dataTransfer.setData('text/plain', JSON.stringify({ r, c }));
  }
};

window.handleBethDrop = function (e, toR, toC) {
  if (e && e.preventDefault) e.preventDefault();
  try {
    const raw = e.dataTransfer ? e.dataTransfer.getData('text/plain') : null;
    if (!raw) return;
    const { r: fromR, c: fromC } = JSON.parse(raw);
    const puzzles = getActivePuzzles();
    const puzzle = puzzles[(chessState.currentPuzzleIdx || 0) % puzzles.length];
    if (puzzle) {
      executeBethMove(fromR, fromC, toR, toC, puzzle);
    }
  } catch (err) {
    console.warn('Chess drag-drop error:', err);
  }
};

window.resetBethHarmonBoard = function () {
  const puzzles = getActivePuzzles();
  const puzzle = puzzles[(chessState.currentPuzzleIdx || 0) % puzzles.length];
  if (puzzle) {
    chessState.activePuzzleBoard = JSON.parse(JSON.stringify(puzzle.board));
    chessState.selectedSquare = null;
    chessState.puzzleMoveStep = 0;
    chessState.puzzleStatus = 'idle';
    chessState.puzzleFeedback = { text: 'Board reset to starting puzzle position.', type: 'info' };
    renderChessHubView();
  }
};

window.toggleBethHarmonSandbox = function () {
  chessState.sandboxMode = !chessState.sandboxMode;
  chessState.selectedSquare = null;
  chessState.puzzleFeedback = {
    text: chessState.sandboxMode
      ? '🔓 Free Move Sandbox ENABLED: You can freely move any piece anywhere on the board!'
      : '🔒 Tactical Challenge Mode ENABLED: Moves will be evaluated against the puzzle solution.',
    type: 'info',
  };
  renderChessHubView();
};

window.cycleBethHarmonPuzzle = function (delta) {
  const total = getActivePuzzles();
  const puzzleCount = total.length || 1;
  chessState.currentPuzzleIdx =
    ((chessState.currentPuzzleIdx || 0) + delta + puzzleCount) % puzzleCount;
  chessState.showBethHarmonHint = false;
  chessState.showBethHarmonSolution = false;
  chessState.activePuzzleBoard = null;
  chessState.selectedSquare = null;
  chessState.puzzleMoveStep = 0;
  chessState.puzzleStatus = 'idle';
  chessState.puzzleFeedback = null;
  renderChessHubView();
};

window.setBethHarmonCategory = function (category) {
  chessState.puzzleCategory = category;
  chessState.currentPuzzleIdx = 0;
  chessState.activePuzzleBoard = null;
  chessState.selectedSquare = null;
  chessState.puzzleMoveStep = 0;
  chessState.puzzleStatus = 'idle';
  chessState.puzzleFeedback = null;
  chessState.showBethHarmonHint = false;
  chessState.showBethHarmonSolution = false;
  renderChessHubView();
};

window.selectRookieMission = function (missionIdx) {
  chessState.puzzleCategory = 'beginner';
  chessState.currentPuzzleIdx = missionIdx;
  chessState.activePuzzleBoard = null;
  chessState.selectedSquare = null;
  chessState.puzzleMoveStep = 0;
  chessState.puzzleStatus = 'idle';
  chessState.puzzleFeedback = null;
  chessState.showBethHarmonHint = false;
  chessState.showBethHarmonSolution = false;
  chessState.showStarterPuzzle = true;
  renderChessHubView();
  const boardEl = document.getElementById('chess-interactive-board-container');
  if (boardEl) {
    boardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

window.toggleBethHarmonHint = function () {
  chessState.showBethHarmonHint = !chessState.showBethHarmonHint;
  renderChessHubView();
};

window.toggleBethHarmonSolution = function () {
  chessState.showBethHarmonSolution = !chessState.showBethHarmonSolution;
  renderChessHubView();
};

window.toggleStarterPuzzleCollapse = function () {
  chessState.showStarterPuzzle = !chessState.showStarterPuzzle;
  renderChessHubView();
};

// Mini 5x5 Movement Board Grid for 11-Year-Olds
function renderMiniMovementGrid(piece) {
  const targetMap = new Set(piece.matrixCoords.map(([r, c]) => `${r},${c}`));
  let squares = '';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const isCenter = r === 2 && c === 2;
      const isTarget = targetMap.has(`${r},${c}`);
      const isLight = (r + c) % 2 === 0;
      const bg = isLight ? '#f5ede0' : '#855938';

      let inner = '';
      if (isCenter) {
        inner = `<span style="font-size: 1.65rem; line-height: 1; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.9); font-family: 'Apple Symbols', 'Segoe UI Symbol', serif;">${piece.symbol}</span>`;
      } else if (isTarget) {
        inner = `<div style="width: 12px; height: 12px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></div>`;
      }

      squares += `
        <div style="background: ${isCenter ? '#d97706' : bg}; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; position: relative; border-radius: ${isCenter ? '3px' : '0'};">
          ${inner}
        </div>
      `;
    }
  }

  return `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0;">
      <div style="width: 130px; aspect-ratio: 1; display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); border: 2.5px solid #44403c; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background: #1c1917;">
        ${squares}
      </div>
      <div style="font-size: 0.68rem; font-weight: 700; color: #78716c; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">
        Visual Move Map
      </div>
    </div>
  `;
}

// 2. Rookie Academy View: Complete Beginner Guide for 11-Year-Olds
function renderBeginnersTab() {
  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">

      <!-- Welcoming Hero Banner -->
      <div style="background: linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%); border-radius: 12px; padding: 24px; color: #ffffff; box-shadow: 0 8px 24px rgba(20, 83, 45, 0.25); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; bottom: -30px; font-size: 9rem; color: rgba(255,255,255,0.06); font-family: 'Playfair Display', serif; pointer-events: none; user-select: none;">
          🌱
        </div>
        
        <div style="position: relative; z-index: 2;">
          <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); padding: 4px 10px; border-radius: 20px; font-size: 0.76rem; font-weight: 700; font-family: monospace; letter-spacing: 0.05em; margin-bottom: 12px; text-transform: uppercase;">
            <span>🌱</span> Rookie Academy · Year 7 &amp; New Players Hub
          </div>
          <h2 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 800; color: #ffffff; line-height: 1.25;">
            How to Play Chess: Visual Beginner Guide
          </h2>
          <p style="margin: 0 0 16px 0; font-size: 0.95rem; color: #dcfce7; line-height: 1.55; max-width: 780px;">
            Never touched a chess piece before? You are in the right place! Chess is an ancient battle of wits, courage, and clever tactics. Below you’ll find everything explained in <strong>simple picture terms</strong>: how all 6 warriors move, how to set up the board, the lifesaving C-P-R check rule, and interactive missions you can solve right on your screen!
          </p>

          <!-- Quick Anchor Navigation -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="#rookie-warriors" style="background: rgba(255,255,255,0.92); color: #14532d; text-decoration: none; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <span>♟</span> The 6 Warriors
            </a>
            <a href="#rookie-cpr" style="background: rgba(255,255,255,0.92); color: #14532d; text-decoration: none; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <span>🛡</span> C-P-R Check Rule
            </a>
            <a href="#rookie-setup" style="background: rgba(255,255,255,0.92); color: #14532d; text-decoration: none; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <span>📐</span> Board Setup
            </a>
            <a href="#rookie-superpowers" style="background: rgba(255,255,255,0.92); color: #14532d; text-decoration: none; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <span>⚡</span> Superpowers
            </a>
            <a href="#rookie-training-board" style="background: #fbbf24; color: #1c1917; text-decoration: none; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
              <span>🎯</span> Interactive Missions (${BEGINNER_ROOKIE_PUZZLES.length})
            </a>
          </div>
        </div>
      </div>

      <!-- Section 1: Meet the 6 Warriors -->
      <div id="rookie-warriors">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #1c1917; font-weight: 800;">
              ♟️ Meet the 6 Warriors: Visual Movement Guide
            </h3>
            <div style="font-size: 0.84rem; color: #78716c; margin-top: 2px;">
              Every piece moves in a distinct pattern. Study the green dots on the mini-boards to see legal movement squares!
            </div>
          </div>
          <span style="font-size: 0.78rem; font-weight: 700; color: #166534; background: #dcfce7; border: 1px solid #86efac; padding: 3px 8px; border-radius: 4px; font-family: monospace;">
            6 Unique Movement Patterns
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;">
          ${BEGINNER_PIECES_GUIDE.map((p) => {
            return `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
              <div>
                <!-- Piece Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 12px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 44px; height: 44px; border-radius: 8px; background: #fafaf9; border: 1.5px solid #e7e5e4; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; line-height: 1; flex-shrink: 0; font-family: 'Apple Symbols', 'Segoe UI Symbol', serif; color: #1c1917;">
                      ${p.symbol}
                    </div>
                    <div>
                      <h4 style="margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 800;">${p.name}</h4>
                      <div style="font-size: 0.8rem; font-weight: 700; color: ${p.colorHex}; font-style: italic;">"${p.nickname}"</div>
                    </div>
                  </div>
                  <span style="background: #f8fafc; border: 1px solid #cbd5e1; color: #334155; font-size: 0.74rem; font-weight: 800; padding: 4px 8px; border-radius: 6px; font-family: monospace; white-space: nowrap;">
                    ⭐ ${p.value}
                  </span>
                </div>

                <!-- Split Body: Visual Grid + Rules -->
                <div style="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;">
                  ${renderMiniMovementGrid(p)}
                  
                  <div style="flex: 1; min-width: 180px;">
                    <div style="background: #f8fafc; border-left: 3px solid ${p.colorHex}; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 0.82rem; font-weight: 700; color: #1e293b; margin-bottom: 10px; line-height: 1.4;">
                      ${p.movementSummary}
                    </div>

                    <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; color: #475569; line-height: 1.45; display: flex; flex-direction: column; gap: 4px;">
                      ${p.rules.map((r) => `<li>${r}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Mnemonic Rhyme Callout -->
              <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 8px 12px; font-size: 0.78rem; color: #854d0e; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.95rem;">💡</span>
                <div>
                  <strong>Memory Rhyme:</strong> <em>${p.funMnemonic}</em>
                </div>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>

      <!-- Section 2: Golden Memory Anchors (CPR, Board Setup, 3 Opening Habits) -->
      <div>
        <h3 style="margin: 0 0 14px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #1c1917; font-weight: 800;">
          🛡️ Golden Rules &amp; Lifesaving Habits
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
          
          <!-- Card 1: The C-P-R Rule -->
          <div id="rookie-cpr" style="background: #ffffff; border: 1.5px solid #fecaca; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 8px; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0;">
                <i class="fa-solid fa-shield-heart"></i>
              </div>
              <div>
                <h4 style="margin: 0; font-size: 1.1rem; color: #991b1b; font-weight: 800;">The C-P-R Check Defense</h4>
                <div style="font-size: 0.75rem; color: #dc2626; font-weight: 700; text-transform: uppercase; font-family: monospace;">When Opponent Says "CHECK!"</div>
              </div>
            </div>

            <p style="margin: 0 0 12px 0; font-size: 0.84rem; color: #475569; line-height: 1.45;">
              When your King is attacked, you are in <strong>CHECK</strong>! You must defend him immediately using C-P-R:
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #991b1b;">
                <strong>C — Capture:</strong> Knock out the enemy piece attacking your King!
              </div>
              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #991b1b;">
                <strong>P — Protect (Block):</strong> Slide another piece in between like a bodyguard! <em>(Note: You cannot block a jumping Knight!)</em>
              </div>
              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #991b1b;">
                <strong>R — Run:</strong> Step your King to a safe square with no danger!
              </div>
            </div>

            <div style="background: #450a0a; color: #fecaca; border-radius: 6px; padding: 10px 14px; font-size: 0.8rem; font-weight: 700; text-align: center; font-family: monospace;">
              "If you cannot Capture, Protect, or Run — it is CHECKMATE and the game is won!"
            </div>
          </div>

          <!-- Card 2: Board Setup Rules -->
          <div id="rookie-setup" style="background: #ffffff; border: 1.5px solid #bfdbfe; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 8px; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0;">
                <i class="fa-solid fa-chess-board"></i>
              </div>
              <div>
                <h4 style="margin: 0; font-size: 1.1rem; color: #1e40af; font-weight: 800;">Board Setup: The 2 Golden Tests</h4>
                <div style="font-size: 0.75rem; color: #2563eb; font-weight: 700; text-transform: uppercase; font-family: monospace;">Pre-Game Ritual</div>
              </div>
            </div>

            <p style="margin: 0 0 12px 0; font-size: 0.84rem; color: #475569; line-height: 1.45;">
              Before making a single move on Thursday, always double-check these two universal rules:
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #1e40af;">
                <strong>1. "White on Right":</strong> Look at the bottom-right corner square closest to your right hand. It <strong>MUST</strong> be a white/light square! If it's dark, rotate your board 90 degrees.
              </div>
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #1e40af;">
                <strong>2. "Queen on Her Color":</strong> The White Queen sits on White (d1). The Black Queen sits on Black (d8). Kings sit on the square right beside them!
              </div>
            </div>

            <div style="background: #172554; color: #bfdbfe; border-radius: 6px; padding: 10px 14px; font-size: 0.8rem; font-weight: 700; text-align: center; font-family: monospace;">
              "White on the right, Queen on her color — every single game!"
            </div>
          </div>

          <!-- Card 3: 3 Opening Habits -->
          <div id="rookie-opening" style="background: #ffffff; border: 1.5px solid #fef08a; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 8px; background: #fef9c3; color: #ca8a04; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0;">
                <i class="fa-solid fa-trophy"></i>
              </div>
              <div>
                <h4 style="margin: 0; font-size: 1.1rem; color: #854d0e; font-weight: 800;">The 3 Golden Opening Habits</h4>
                <div style="font-size: 0.75rem; color: #ca8a04; font-weight: 700; text-transform: uppercase; font-family: monospace;">First 5–8 Moves of Every Game</div>
              </div>
            </div>

            <p style="margin: 0 0 12px 0; font-size: 0.84rem; color: #475569; line-height: 1.45;">
              Follow these three habits in order to gain a winning start in every match:
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
              <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #854d0e;">
                <strong>1. Claim the Center:</strong> Push your center pawn forward 2 squares (e4 or d4) to control the middle battlefield.
              </div>
              <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #854d0e;">
                <strong>2. Develop Knights &amp; Bishops:</strong> Bring out your minor pieces toward the center before touching your Queen.
              </div>
              <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 8px 12px; font-size: 0.82rem; color: #854d0e;">
                <strong>3. Castle Your King:</strong> Castle within the first 6–8 moves to hide your King safely behind pawns!
              </div>
            </div>

            <div style="background: #422006; color: #fef08a; border-radius: 6px; padding: 10px 14px; font-size: 0.8rem; font-weight: 700; text-align: center; font-family: monospace;">
              "Center, Knights, Castle — that is how Meoncross champions start!"
            </div>
          </div>

        </div>
      </div>

      <!-- Section 3: Special Superpowers Explained -->
      <div id="rookie-superpowers">
        <h3 style="margin: 0 0 14px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #1c1917; font-weight: 800;">
          ⚡ Special Chess Superpowers
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
          
          <!-- Superpower 1: Castling -->
          <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 1.5rem;">🏰</span>
              <div>
                <h4 style="margin: 0; font-size: 1.05rem; color: #14532d; font-weight: 800;">Castling (The King &amp; Castle Dance)</h4>
                <div style="font-size: 0.72rem; color: #16a34a; font-weight: 700; font-family: monospace;">Move TWO pieces in ONE turn!</div>
              </div>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569; line-height: 1.45;">
              The King moves <strong>TWO squares</strong> towards the corner Rook. The Rook leaps right over the King to sit beside him!
            </p>
            <div style="font-size: 0.78rem; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 6px 10px; border-radius: 6px; line-height: 1.4;">
              ✓ King and Rook must not have moved yet.<br>
              ✓ Squares between them must be empty.<br>
              ✓ King cannot castle while in check or through check!
            </div>
          </div>

          <!-- Superpower 2: Pawn Promotion -->
          <div style="background: #ffffff; border: 1.5px solid #fed7aa; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 1.5rem;">👑</span>
              <div>
                <h4 style="margin: 0; font-size: 1.05rem; color: #9a3412; font-weight: 800;">Pawn Promotion (Coronation)</h4>
                <div style="font-size: 0.72rem; color: #ea580c; font-weight: 700; font-family: monospace;">Transform 1pt into 9pts!</div>
              </div>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569; line-height: 1.45;">
              When a brave 1-point pawn marches across the entire board and touches the 8th rank, it instantly <strong>transforms</strong> into any piece you want!
            </p>
            <div style="font-size: 0.78rem; color: #9a3412; background: #fff7ed; border: 1px solid #fed7aa; padding: 6px 10px; border-radius: 6px; line-height: 1.4;">
              💡 99% of the time, choose a <strong>Queen</strong>! You can have more than one Queen on the board at the same time.
            </div>
          </div>

          <!-- Superpower 3: En Passant -->
          <div style="background: #ffffff; border: 1.5px solid #e9d5ff; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 1.5rem;">⚔</span>
              <div>
                <h4 style="margin: 0; font-size: 1.05rem; color: #6b21a8; font-weight: 800;">En Passant (The Sneaky Passing Catch)</h4>
                <div style="font-size: 0.72rem; color: #9333ea; font-weight: 700; font-family: monospace;">French for "In Passing"</div>
              </div>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569; line-height: 1.45;">
              If an enemy pawn leaps two squares forward to land directly alongside your pawn on rank 5, you can capture it diagonally on your very next turn as if it only moved one square!
            </p>
            <div style="font-size: 0.78rem; color: #6b21a8; background: #faf5ff; border: 1px solid #e9d5ff; padding: 6px 10px; border-radius: 6px; line-height: 1.4;">
              ⏳ Must be done immediately on the next move, or the superpower vanishes!
            </div>
          </div>

        </div>
      </div>

      <!-- Section 4: Dedicated Interactive Rookie Training Missions -->
      <div id="rookie-training-board" style="border-top: 2px solid #e7e5e4; padding-top: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #1c1917; font-weight: 800;">
              🎯 Rookie Training Missions: Practice on the Live Board
            </h3>
            <div style="font-size: 0.84rem; color: #78716c; margin-top: 2px;">
              Practice moving the pieces! Click a mission below to load it on the interactive training board:
            </div>
          </div>
          <span style="font-size: 0.78rem; font-weight: 700; color: #854d0e; background: #fef08a; border: 1px solid #fde047; padding: 3px 8px; border-radius: 4px; font-family: monospace;">
            Movable Pieces &amp; Instant Clues
          </span>
        </div>

        <!-- Mission Selector Quick Buttons -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          ${BEGINNER_ROOKIE_PUZZLES.map((m, idx) => {
            const isSelected =
              chessState.puzzleCategory === 'beginner' &&
              (chessState.currentPuzzleIdx || 0) === idx;
            return `
            <button type="button" onclick="window.selectRookieMission(${idx})" style="background: ${isSelected ? '#15803d' : '#ffffff'}; color: ${isSelected ? '#ffffff' : '#334155'}; border: 1.5px solid ${isSelected ? '#15803d' : '#cbd5e1'}; padding: 8px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.15s ease;">
              <span>${isSelected ? '★' : '•'}</span> ${m.title.split(':')[0]}: ${m.tag}
            </button>
          `;
          }).join('')}
        </div>

        <!-- Embedded Interactive Live Board -->
        ${renderBethHarmonCeilingBoard()}
      </div>

    </div>
  `;
}

// 3. Pupil Self-Check-In & Attendance Management (Unified Period 6 Hub)
function renderSignInTab(players = []) {
  const notCheckedIn = chessState.players.filter(
    (p) => !chessState.checkedInPlayerIds.includes(p.id),
  );
  const checkedInPlayers = chessState.players.filter((p) =>
    chessState.checkedInPlayerIds.includes(p.id),
  );

  // Sort players for the league standings by total points descending
  const leaguePlayers = [...(players && players.length > 0 ? players : chessState.players)].sort(
    (a, b) => {
      const ptsA =
        a.won * SCORING_RULES.WIN +
        a.drawn * SCORING_RULES.DRAW +
        a.lost * SCORING_RULES.PARTICIPATION;
      const ptsB =
        b.won * SCORING_RULES.WIN +
        b.drawn * SCORING_RULES.DRAW +
        b.lost * SCORING_RULES.PARTICIPATION;
      if (ptsB !== ptsA) return ptsB - ptsA;
      return a.rank - b.rank;
    },
  );

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Guidance & Attendance Controls Header -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1.5px solid #86efac; border-radius: 12px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: #16a34a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
            <i class="fa-solid fa-clipboard-check"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.18rem; color: #14532d; font-weight: 800;">Thursday Period 6 Club Session</h3>
            <div style="font-size: 0.88rem; color: #166534; margin-top: 2px;">
              Currently <strong>${checkedInPlayers.length}</strong> pupil${checkedInPlayers.length === 1 ? '' : 's'} checked in for today's session · <strong>${chessState.matches.length}</strong> games logged this term!
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${
            chessState.players.length > 0
              ? `
            <button onclick="window.checkInAllPlayers()" style="background: #15803d; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 800; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(21, 128, 61, 0.25);">
              <i class="fa-solid fa-users"></i> Check In All (${chessState.players.length})
            </button>
          `
              : ''
          }
          ${
            checkedInPlayers.length > 0
              ? `
            <button onclick="window.clearAttendance()" style="background: #ffffff; color: #475569; border: 1.5px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Reset today's attendance checklist without losing pupil records or points">
              <i class="fa-solid fa-clock-rotate-left"></i> Reset Today's Attendance
            </button>
          `
              : ''
          }
        </div>
      </div>

      <!-- The Beth Harmon Ceiling Board (Quiet Entry Starter / Weekly Challenge) -->
      ${renderBethHarmonCeilingBoard()}

      <!-- Two-Column Form: Quick Check-In vs New Player Registration -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
        
        <!-- Column 1: New Pupil Registration -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-user-plus" style="color: #10b981; font-size: 1.1rem;"></i>
            <h4 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800;">⚡ First Time Today? Quick Registration</h4>
          </div>
          <p style="font-size: 0.84rem; color: #64748b; margin: 0 0 16px 0; line-height: 1.45;">
            Register once to add pupil to permanent club roster &amp; House (takes 5 seconds · auto-checked in for today):
          </p>

          <form id="chess-self-reg-form" onsubmit="event.preventDefault(); window.handleSelfRegister(event); return false;">
            <div style="margin-bottom: 12px;">
              <label for="reg-name" style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Pupil Full Name:</label>
              <input type="text" id="reg-name" required placeholder="e.g. Leo B. or Emily T." style="width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#cbd5e1'; if(this.value && window.sanitizePupilName) this.value = window.sanitizePupilName(this.value);">
              <div style="font-size: 0.74rem; color: #64748b; margin-top: 5px; display: flex; align-items: center; gap: 5px; line-height: 1.3;">
                <i class="fa-solid fa-shield-halved" style="color: #6366f1;"></i>
                <span><strong>School Privacy:</strong> First Name + Last Initial (e.g. <em>Leo B.</em>). Full surnames are auto-sanitised.</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div>
                <label for="reg-year" style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Year Group:</label>
                <select id="reg-year" required style="width: 100%; box-sizing: border-box; padding: 9px 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem; font-family: inherit; background: #fff;">
                  <option value="7">Year 7</option>
                  <option value="8" selected>Year 8</option>
                  <option value="9">Year 9</option>
                  <option value="10">Year 10 (GCSE)</option>
                  <option value="11">Year 11 (GCSE)</option>
                </select>
              </div>

              <div>
                <label for="reg-house" style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 5px;">School House:</label>
                <select id="reg-house" required style="width: 100%; box-sizing: border-box; padding: 9px 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem; font-family: inherit; background: #fff;">
                  <option value="victory" selected>Victory (Blue)</option>
                  <option value="warrior">Warrior (Red)</option>
                  <option value="dreadnought">Dreadnought (Green)</option>
                  <option value="invincible">Invincible (Yellow)</option>
                </select>
              </div>
            </div>

            <button type="submit" id="btn-self-register-submit" style="width: 100%; background: #10b981; color: #ffffff; border: none; font-weight: 700; padding: 12px; border-radius: 8px; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
              <i class="fa-solid fa-user-check"></i> Register &amp; Check In for Today
            </button>
          </form>
        </div>

        <!-- Column 2: Returning Pupils (1-Click Sign-In) -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-user-check" style="color: #2563eb; font-size: 1.1rem;"></i>
            <h4 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800;">✓ Returning Pupils (1-Click Attendance)</h4>
          </div>
          <p style="font-size: 0.84rem; color: #64748b; margin: 0 0 16px 0; line-height: 1.45;">
            Tap a pupil's badge to mark them present today (absent pupils stay unchecked and are <strong>never</strong> paired):
          </p>

          ${
            notCheckedIn.length > 0
              ? `
            <div style="display: flex; flex-wrap: wrap; gap: 8px; max-height: 220px; overflow-y: auto; padding: 4px; margin-bottom: 8px;">
              ${notCheckedIn
                .map((p) => {
                  const h = HOUSES[p.house];
                  return `
                  <button type="button" onclick="window.checkInPlayer('${p.id}')" style="background: #f8fafc; border: 1.5px solid ${h.borderColor}; border-radius: 20px; padding: 6px 14px; font-size: 0.85rem; font-weight: 700; color: #1e293b; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" onmouseover="this.style.background='${h.bgLight}';this.style.borderColor='${h.color}'" onmouseout="this.style.background='#f8fafc';this.style.borderColor='${h.borderColor}'">
                    <i class="fa-solid fa-circle-plus" style="color: ${h.color};"></i>
                    <span>${p.name} (Y${p.year} · ${h.name})</span>
                  </button>
                `;
                })
                .join('')}
            </div>
          `
              : chessState.players.length > 0
                ? `
            <div style="background: #f0fdf4; border: 1.5px solid #86efac; padding: 24px 16px; border-radius: 8px; text-align: center; color: #15803d; font-weight: 700; font-size: 0.92rem; margin: auto 0;">
              <i class="fa-solid fa-circle-check" style="font-size: 1.8rem; margin-bottom: 8px; display: block;"></i>
              All registered pupils (${chessState.players.length}) are checked in for today!
            </div>
          `
                : `
            <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; padding: 24px 16px; border-radius: 8px; text-align: center; color: #64748b; font-size: 0.88rem; margin: auto 0;">
              <i class="fa-solid fa-user-group" style="font-size: 1.8rem; color: #cbd5e1; margin-bottom: 8px; display: block;"></i>
              No returning pupils yet.<br>
              <span style="font-size: 0.8rem; color: #94a3b8;">Use the form on the left to register your first pupil!</span>
            </div>
          `
          }
        </div>

      </div>

      <!-- Live Attendance Checklist Box -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h4 style="margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 800; display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></span>
              Checked-In Roster for Today's Period 6 (${checkedInPlayers.length})
            </h4>
            <div style="font-size: 0.82rem; color: #64748b; margin-top: 2px;">
              Tap 'Match' to quickly record a game, or launch auto-pairings:
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" onclick="window.openLogMatchModal()" style="background: linear-gradient(135deg, #8b5cf6 0%, #7e22ce 100%); color: #fff; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);">
              <i class="fa-solid fa-bolt"></i> Log Match Result
            </button>
            <button type="button" onclick="window.switchChessTab('pairings')" style="background: #0284c7; color: #fff; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-shuffle"></i> Launch Pairings
            </button>
            <button type="button" onclick="window.switchChessTab('knockout')" style="background: #f59e0b; color: #000; border: none; font-weight: 800; font-size: 0.85rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-sitemap"></i> Launch Knockout
            </button>
          </div>
        </div>

        ${
          checkedInPlayers.length === 0
            ? `
          <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 36px 20px; text-align: center; color: #64748b;">
            <i class="fa-solid fa-user-clock" style="font-size: 2.2rem; color: #94a3b8; margin-bottom: 10px; display: block;"></i>
            <strong style="font-size: 1rem; color: #1e293b;">No pupils checked in for today's session yet.</strong><br>
            <span style="font-size: 0.85rem; color: #64748b; max-width: 440px; display: inline-block; margin-top: 4px;">
              Arriving pupils can type their name above to register, or returning pupils can tap their name chip to check in!
            </span>
          </div>
        `
            : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
            ${checkedInPlayers
              .map((p) => {
                const h = HOUSES[p.house];
                return `
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; flex-shrink: 0; box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);"></span>
                    <div style="min-width: 0;">
                      <div style="font-weight: 700; font-size: 0.95rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                      <div style="font-size: 0.74rem; color: ${h.color}; font-weight: 700;">Year ${p.year} · ${h.name}</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 4px; flex-shrink: 0;">
                    <button type="button" onclick="window.prefillMatchModal('${p.id}', null)" title="Log match with ${p.name}" style="background: #f3e8ff; border: 1px solid #d8b4fe; color: #7e22ce; cursor: pointer; font-size: 0.78rem; padding: 5px 8px; border-radius: 4px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                      <i class="fa-solid fa-bolt"></i> Match
                    </button>
                    <button type="button" onclick="window.checkOutPlayer('${p.id}')" title="Mark absent / check out for today" style="background: #ffffff; border: 1px solid #cbd5e1; color: #64748b; cursor: pointer; font-size: 0.8rem; padding: 5px 8px; border-radius: 4px; transition: all 0.15s;" onmouseover="this.style.color='#ef4444';this.style.borderColor='#fca5a5'" onmouseout="this.style.color='#64748b';this.style.borderColor='#cbd5e1'">
                      <i class="fa-solid fa-user-minus"></i>
                    </button>
                    <button type="button" onclick="window.removePlayer('${p.id}')" title="Delete pupil from club" style="background: #fee2e2; border: 1px solid #fecaca; color: #dc2626; cursor: pointer; font-size: 0.8rem; padding: 5px 8px; border-radius: 4px; transition: all 0.15s;" onmouseover="this.style.background='#fca5a5'" onmouseout="this.style.background='#fee2e2'">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        `
        }
      </div>

      <!-- Live League Standings & Ladder Section (Unified directly into Period 6 Hub!) -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h4 style="margin: 0; font-size: 1.22rem; color: #0f172a; font-weight: 800; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-trophy" style="color: #f59e0b;"></i>
              Current Period 6 League Standings (${leaguePlayers.length} Pupils)
            </h4>
            <div style="font-size: 0.84rem; color: #64748b; margin-top: 3px;">
              Every game completed scores: <strong style="color: #16a34a;">+3 Win</strong> · <strong style="color: #2563eb;">+2 Draw</strong> · <strong style="color: #64748b;">+1 Playing/Loss</strong>. Ranks update immediately!
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="window.openLogMatchModal()" style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(109, 40, 217, 0.3);">
              <i class="fa-solid fa-plus-circle"></i> Log Match Result
            </button>
            <button onclick="window.switchChessTab('ladder')" style="background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-stairs"></i> Ladder View
            </button>
          </div>
        </div>

        ${
          leaguePlayers.length === 0
            ? `
          <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 36px 20px; text-align: center; color: #64748b;">
            <i class="fa-solid fa-chess-board" style="font-size: 2.2rem; color: #94a3b8; margin-bottom: 10px; display: block;"></i>
            <strong style="font-size: 1rem; color: #1e293b;">The League Table is ready for your pupils.</strong><br>
            <span style="font-size: 0.85rem; color: #64748b; max-width: 440px; display: inline-block; margin-top: 4px;">
              Register your first pupil above, and they will immediately appear on the league leaderboard!
            </span>
          </div>
        `
            : `
          <div style="overflow-x: auto; border: 1.5px solid #44403c; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem; background: #faf8f5;">
              <thead>
                <tr style="background: #1c1917; color: #fafaf9; font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.08em; font-family: monospace;">
                  <th style="padding: 10px 12px; width: 45px; text-align: center;">POS</th>
                  <th style="padding: 10px 12px; font-family: 'Playfair Display', Georgia, serif;">Player</th>
                  <th style="padding: 10px 12px;">Year</th>
                  <th style="padding: 10px 12px;">House</th>
                  <th style="padding: 10px 12px; text-align: center;">Session</th>
                  <th style="padding: 10px 12px; text-align: center;">P</th>
                  <th style="padding: 10px 12px; text-align: center;">W</th>
                  <th style="padding: 10px 12px; text-align: center;">D</th>
                  <th style="padding: 10px 12px; text-align: center;">L</th>
                  <th style="padding: 10px 12px; text-align: center;">Elo</th>
                  <th style="padding: 10px 12px; text-align: right;">Pts</th>
                  <th style="padding: 10px 12px; text-align: center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${leaguePlayers
                  .map((p, idx) => {
                    const h = HOUSES[p.house] || {
                      name: p.house,
                      color: '#44403c',
                      bgLight: '#f5f2eb',
                      borderColor: '#d6d3d1',
                    };
                    const isCheckedIn = chessState.checkedInPlayerIds.includes(p.id);
                    const totalPts =
                      p.won * SCORING_RULES.WIN +
                      p.drawn * SCORING_RULES.DRAW +
                      p.lost * SCORING_RULES.PARTICIPATION;
                    const rankBadge =
                      idx === 0
                        ? '<span style="color: #c5a059; font-weight: 800; font-family: monospace;">★ 1</span>'
                        : idx === 1
                          ? '<span style="color: #78716c; font-weight: 800; font-family: monospace;">2</span>'
                          : idx === 2
                            ? '<span style="color: #a8a29e; font-weight: 800; font-family: monospace;">3</span>'
                            : `<span style="color: #78716c; font-weight: 600; font-family: monospace;">${idx + 1}</span>`;

                    return `
                    <tr style="border-bottom: 1px solid #e7e2d7; transition: background 0.15s ease; background: ${idx % 2 === 0 ? '#ffffff' : '#faf8f5'};" onmouseover="this.style.background='#f3efe6'" onmouseout="this.style.background='${idx % 2 === 0 ? '#ffffff' : '#faf8f5'}'">
                      <td style="padding: 10px 12px; text-align: center;">${rankBadge}</td>
                      <td style="padding: 10px 12px; font-weight: 700; color: #1c1917; font-family: 'Playfair Display', Georgia, serif; font-size: 0.95rem;">${p.name}</td>
                      <td style="padding: 10px 12px; color: #57534e; font-family: monospace; font-size: 0.8rem;">Yr ${p.year}</td>
                      <td style="padding: 10px 12px;">
                        <span style="background: ${h.bgLight}; color: ${h.color}; border: 1px solid ${h.borderColor}; padding: 2px 8px; border-radius: 3px; font-size: 0.72rem; font-weight: 700; font-family: monospace;">
                          ${h.name}
                        </span>
                      </td>
                      <td style="padding: 10px 12px; text-align: center;">
                        ${
                          isCheckedIn
                            ? `<span style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 3px; font-family: monospace;">PRESENT</span>`
                            : `<button onclick="window.checkInPlayer('${p.id}')" style="background: #faf8f5; color: #57534e; border: 1px solid #d6d3d1; font-size: 0.7rem; font-weight: 600; padding: 2px 7px; border-radius: 3px; cursor: pointer; font-family: monospace;">+ ROLL CALL</button>`
                        }
                      </td>
                      <td style="padding: 10px 12px; text-align: center; font-family: monospace; font-weight: 600;">${p.games}</td>
                      <td style="padding: 10px 12px; text-align: center; color: #166534; font-weight: 700; font-family: monospace;">${p.won}</td>
                      <td style="padding: 10px 12px; text-align: center; color: #1e40af; font-weight: 700; font-family: monospace;">${p.drawn}</td>
                      <td style="padding: 10px 12px; text-align: center; color: #78716c; font-family: monospace;">${p.lost}</td>
                      <td style="padding: 10px 12px; text-align: center; font-family: monospace; font-weight: 700; color: #1c1917;">${p.rating}</td>
                      <td style="padding: 10px 12px; text-align: right; font-weight: 800; color: #1c1917; font-size: 1rem; font-family: monospace;">+${totalPts}</td>
                      <td style="padding: 10px 12px; text-align: center;">
                        <button onclick="window.prefillMatchModal('${p.id}', null)" title="Log match with ${p.name}" style="background: #1c1917; border: 1px solid #1c1917; color: #fafaf9; cursor: pointer; font-size: 0.72rem; padding: 4px 10px; border-radius: 3px; font-weight: 700; font-family: monospace; display: inline-flex; align-items: center; gap: 4px;">
                          <span>♔</span> MATCH
                        </button>
                      </td>
                    </tr>
                  `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        `
        }
      </div>

    </div>
  `;
}

// 4. Automated Period 6 Thursday Matchmaker

function renderPairingsTab() {
  return `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> 1-Click Swiss / Ladder Algorithm
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #0f172a; margin: 4px 0 0 0;">
            Thursday Period 6 Board Pairings
          </h2>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button onclick="window.generateThursdayPairings()" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 10px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
            <i class="fa-solid fa-shuffle"></i> Generate Balanced Pairings
          </button>
          <button onclick="window.printFidePairingSheet()" style="background: #1c1917; color: #d4af37; border: 1.5px solid #44403c; font-weight: 700; font-size: 0.88rem; padding: 10px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);" title="Print official A4 FIDE pairing sheet for classroom whiteboard">
            <i class="fa-solid fa-print"></i> 🖨 Print FIDE Pairing Sheet (A4)
          </button>
        </div>
      </div>

      <p style="color: #475569; font-size: 0.95rem; margin: 0 0 20px 0; line-height: 1.5;">
        Select the pupils present in the classroom for Period 6. The algorithm will automatically assign boards, balance player ratings, prioritise cross-house rivalries (e.g. Victory vs Warrior), and avoid repeat pairings from last week.
      </p>

      <!-- Player Presence Checklist -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-weight: 700; font-size: 0.85rem; color: #334155; text-transform: uppercase;">Pupil Attendance Checklist:</span>
          <div>
            <button onclick="window.toggleAllAttendance(true)" style="background: none; border: none; color: #2563eb; font-weight: 700; font-size: 0.8rem; cursor: pointer; margin-right: 10px;">Select All</button>
            <button onclick="window.toggleAllAttendance(false)" style="background: none; border: none; color: #64748b; font-weight: 700; font-size: 0.8rem; cursor: pointer;">Deselect All</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;">
          ${chessState.players
            .map((p) => {
              const isChecked = chessState.checkedInPlayerIds.includes(p.id);
              return `
              <label style="display: flex; align-items: center; gap: 8px; background: #ffffff; padding: 6px 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.82rem; cursor: pointer;">
                <input type="checkbox" class="attendance-check" data-player-id="${p.id}" ${isChecked ? 'checked' : ''} onchange="window.handleChecklistChange('${p.id}', this.checked)">
                <span style="font-weight: 600; color: #0f172a;">${p.name}</span>
                <span style="margin-left: auto; font-size: 0.72rem; color: #64748b; font-weight: 700;">Y${p.year}</span>
              </label>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Generated Pairings Container -->
      <div id="pairings-results-box">
        <div style="text-align: center; padding: 40px 20px; border: 2px dashed #cbd5e1; border-radius: 10px; color: #64748b;">
          <i class="fa-solid fa-chess-board" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px;"></i>
          <div>Click <strong>"Generate Balanced Pairings"</strong> above to auto-assign boards for Period 6.</div>
        </div>
      </div>

    </div>
  `;
}

// 5. Digital Knockout Cup (Single-Elimination Bracket) (Audio 3)
function renderKnockoutTab() {
  const bracket = chessState.knockoutBracket;

  if (!bracket) {
    return `
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 40px 24px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px;">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #0f172a; margin: 0 0 10px 0;">
          Thursday Period 6 Knockout Cup
        </h2>
        <p style="color: #64748b; max-width: 580px; margin: 0 auto 24px; font-size: 0.95rem; line-height: 1.6;">
          Keep it fully digital! Generate a single-elimination tournament bracket using today's checked-in pupils. Tap the winner of each match on-screen to automatically advance them, log the game, and award vital House Points!
        </p>
        <button onclick="window.generateKnockoutTournament()" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; font-weight: 800; font-size: 1rem; padding: 12px 26px; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);">
          <i class="fa-solid fa-sitemap"></i> Generate Digital Knockout Bracket
        </button>
      </div>
    `;
  }

  // Render Visual Bracket Tree
  let grandWinner = null;
  const finalMatch = bracket.rounds[bracket.rounds.length - 1][0];
  if (finalMatch && finalMatch.winner) grandWinner = finalMatch.winner;

  let plateWinner = null;
  if (bracket.plateRounds && bracket.plateRounds.length > 0) {
    const plateFinalMatch = bracket.plateRounds[bracket.plateRounds.length - 1][0];
    if (plateFinalMatch && plateFinalMatch.winner) plateWinner = plateFinalMatch.winner;
  }

  return `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; background: #fef3c7; color: #b45309; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
            <i class="fa-solid fa-trophy"></i> Single-Elimination Knockout
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #0f172a; margin: 4px 0 0 0;">
            Thursday Period 6 Championship Bracket
          </h2>
        </div>

        <div style="display: flex; gap: 8px;">
          <button onclick="window.generateKnockoutTournament()" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
            <i class="fa-solid fa-rotate"></i> Re-Seed Bracket
          </button>
          <button onclick="window.resetKnockoutTournament()" style="background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
            Clear Tournament
          </button>
        </div>
      </div>

      ${
        grandWinner
          ? `
        <!-- Champion Glory Banner -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center; box-shadow: 0 6px 18px rgba(245, 158, 11, 0.25); animation: zoomIn 0.3s ease-out;">
          <div style="font-size: 2rem; color: #d97706; margin-bottom: 6px;"><i class="fa-solid fa-crown"></i></div>
          <h3 style="margin: 0 0 4px 0; font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #78350f; font-weight: 900;">
            TOURNAMENT CHAMPION: ${grandWinner.name}!
          </h3>
          <div style="font-size: 1rem; font-weight: 800; color: ${HOUSES[grandWinner.house].color}; text-transform: uppercase;">
            ${HOUSES[grandWinner.house].name} House (+3 House Points Awarded)
          </div>
          <div style="font-size: 0.85rem; color: #92400e; margin-top: 6px;">
            Brilliant strategic mastery throughout all rounds of Period 6!
          </div>
        </div>
      `
          : ''
      }

      <!-- Championship Bracket Tree Horizontal Scroll Container -->
      <div style="display: flex; gap: 28px; overflow-x: auto; padding: 10px 0 20px;">
        ${bracket.rounds
          .map((round, rIdx) => {
            const roundTitle = bracket.roundNames[rIdx] || `Round ${rIdx + 1}`;
            return `
            <div style="min-width: 250px; flex: 1;">
              <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 12px; text-align: center; letter-spacing: 0.05em;">
                ${roundTitle}
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-height: 340px; gap: 16px;">
                ${round
                  .map((m, mIdx) => {
                    const p1 = m.p1;
                    const p2 = m.p2;
                    const h1 = p1 ? HOUSES[p1.house] : null;
                    const h2 = p2 ? HOUSES[p2.house] : null;

                    return `
                    <div style="background: #f8fafc; border: 1.5px solid ${m.winner ? '#10b981' : '#cbd5e1'}; border-radius: 8px; padding: 10px 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); position: relative;">
                      
                      <!-- P1 Slot -->
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 4px; background: ${m.winner && m.winner.id === (p1 && p1.id) ? '#dcfce7' : '#ffffff'}; margin-bottom: 4px;">
                        <span style="font-weight: 700; font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${p1 ? p1.name : 'TBD'}
                        </span>
                        ${h1 ? `<span style="font-size: 0.7rem; font-weight: 800; color: ${h1.color};">${h1.name}</span>` : ''}
                      </div>

                      <!-- P2 Slot -->
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 4px; background: ${m.winner && m.winner.id === (p2 && p2.id) ? '#dcfce7' : '#ffffff'};">
                        <span style="font-weight: 700; font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${p2 ? p2.name : 'TBD'}
                        </span>
                        ${h2 ? `<span style="font-size: 0.7rem; font-weight: 800; color: ${h2.color};">${h2.name}</span>` : ''}
                      </div>

                      <!-- Action Button -->
                      ${
                        p1 && p2 && !m.winner
                          ? `
                        <div style="display: flex; gap: 6px; margin-top: 8px; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
                          <button onclick="window.advanceKnockoutWinner(${rIdx}, ${mIdx}, '${p1.id}')" style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; font-size: 0.72rem; font-weight: 700; padding: 4px; border-radius: 4px; cursor: pointer; color: ${h1 ? h1.color : '#0f172a'};" title="Advance ${p1.name}">
                            ${p1.name.split(' ')[0]} Wins
                          </button>
                          <button onclick="window.advanceKnockoutWinner(${rIdx}, ${mIdx}, '${p2.id}')" style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; font-size: 0.72rem; font-weight: 700; padding: 4px; border-radius: 4px; cursor: pointer; color: ${h2 ? h2.color : '#0f172a'};" title="Advance ${p2.name}">
                            ${p2.name.split(' ')[0]} Wins
                          </button>
                        </div>
                      `
                          : ''
                      }
                      ${
                        m.winner
                          ? `
                        <div style="font-size: 0.72rem; font-weight: 800; color: #15803d; text-align: center; margin-top: 6px; padding-top: 4px; border-top: 1px solid #dcfce7;">
                          <i class="fa-solid fa-check"></i> Winner: ${m.winner.name} (+3 pts)
                        </div>
                      `
                          : ''
                      }
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- SECTION 2: Challenger Plate / Wooden Spoon Shield (Silver Tier) -->
      ${
        bracket.plateRounds && bracket.plateRounds.length > 0
          ? `
        <div style="margin-top: 28px; border-top: 2px dashed #cbd5e1; padding-top: 22px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
                🥄 Consolation Bracket · Keep Everyone Playing
              </div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1e293b; margin: 4px 0 0 0;">
                The Challenger Plate &amp; Wooden Spoon Shield
              </h3>
              <div style="font-size: 0.84rem; color: #64748b; margin-top: 2px;">
                Losers from Round 1 automatically advance here to compete for the Challenger Plate trophy (+2 House Points)!
              </div>
            </div>
          </div>

          ${
            plateWinner
              ? `
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #94a3b8; border-radius: 12px; padding: 18px; margin-bottom: 20px; text-align: center; box-shadow: 0 4px 14px rgba(0,0,0,0.06); animation: zoomIn 0.3s ease-out;">
              <div style="font-size: 1.8rem; color: #475569; margin-bottom: 4px;">🥄</div>
              <h3 style="margin: 0 0 4px 0; font-family: 'Playfair Display', serif; font-size: 1.45rem; color: #1e293b; font-weight: 900;">
                CHALLENGER PLATE CHAMPION: ${plateWinner.name}!
              </h3>
              <div style="font-size: 0.95rem; font-weight: 800; color: ${HOUSES[plateWinner.house]?.color || '#475569'}; text-transform: uppercase;">
                ${HOUSES[plateWinner.house]?.name || plateWinner.house} House (+2 House Points Awarded)
              </div>
              <div style="font-size: 0.82rem; color: #64748b; margin-top: 4px;">
                Fought back with grit and determination through the Wooden Spoon consolation rounds!
              </div>
            </div>
          `
              : ''
          }

          <div style="display: flex; gap: 28px; overflow-x: auto; padding: 10px 0 16px;">
            ${bracket.plateRounds
              .map((round, rIdx) => {
                const roundTitle = bracket.plateRoundNames[rIdx] || `Plate Round ${rIdx + 1}`;
                return `
                <div style="min-width: 250px; flex: 1;">
                  <div style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 10px; text-align: center; letter-spacing: 0.04em;">
                    ${roundTitle}
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-height: 200px; gap: 14px;">
                    ${round
                      .map((m, mIdx) => {
                        const p1 = m.p1;
                        const p2 = m.p2;
                        const h1 = p1 ? HOUSES[p1.house] : null;
                        const h2 = p2 ? HOUSES[p2.house] : null;

                        return `
                        <div style="background: #ffffff; border: 1.5px solid ${m.winner ? '#64748b' : '#cbd5e1'}; border-radius: 8px; padding: 10px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                          
                          <!-- P1 Slot -->
                          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 4px; background: ${m.winner && m.winner.id === (p1 && p1.id) ? '#f1f5f9' : '#fafafa'}; margin-bottom: 4px;">
                            <span style="font-weight: 700; font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                              ${p1 ? p1.name : '<span style="color: #94a3b8; font-style: italic;">Awaiting R1 Loser</span>'}
                            </span>
                            ${h1 ? `<span style="font-size: 0.7rem; font-weight: 800; color: ${h1.color};">${h1.name}</span>` : ''}
                          </div>

                          <!-- P2 Slot -->
                          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 4px; background: ${m.winner && m.winner.id === (p2 && p2.id) ? '#f1f5f9' : '#fafafa'};">
                            <span style="font-weight: 700; font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                              ${p2 ? p2.name : '<span style="color: #94a3b8; font-style: italic;">Awaiting R1 Loser</span>'}
                            </span>
                            ${h2 ? `<span style="font-size: 0.7rem; font-weight: 800; color: ${h2.color};">${h2.name}</span>` : ''}
                          </div>

                          <!-- Action Button -->
                          ${
                            p1 && p2 && !m.winner
                              ? `
                            <div style="display: flex; gap: 6px; margin-top: 8px; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
                              <button onclick="window.advancePlateWinner(${rIdx}, ${mIdx}, '${p1.id}')" style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; font-size: 0.72rem; font-weight: 700; padding: 5px; border-radius: 4px; cursor: pointer; color: ${h1 ? h1.color : '#0f172a'};" title="Plate Win for ${p1.name}">
                                ${p1.name.split(' ')[0]} Wins
                              </button>
                              <button onclick="window.advancePlateWinner(${rIdx}, ${mIdx}, '${p2.id}')" style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; font-size: 0.72rem; font-weight: 700; padding: 5px; border-radius: 4px; cursor: pointer; color: ${h2 ? h2.color : '#0f172a'};" title="Plate Win for ${p2.name}">
                                ${p2.name.split(' ')[0]} Wins
                              </button>
                            </div>
                          `
                              : ''
                          }
                          ${
                            m.winner
                              ? `
                            <div style="font-size: 0.72rem; font-weight: 800; color: #475569; text-align: center; margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0;">
                              <i class="fa-solid fa-check"></i> Plate Winner: ${m.winner.name} (+2 pts)
                            </div>
                          `
                              : ''
                          }
                        </div>
                      `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>

        </div>
      `
          : ''
      }

      <!-- SECTION 3: ⚡ Instant Re-Pairing for Idle Pupils (Casual Rapid Games) -->
      <div style="margin-top: 28px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.1rem; color: #0284c7;">⚡</span>
              <h4 style="margin: 0; font-size: 1.05rem; color: #0f172a; font-weight: 800;">
                Period 6 Rapid Re-Pairing (Full 60-Minute Engagement)
              </h4>
            </div>
            <div style="font-size: 0.82rem; color: #64748b; margin-top: 2px;">
              Pupils finished their game early? Click below to instantly pair all idle pupils for 10-minute rapid games so nobody sits waiting!
            </div>
          </div>

          <button onclick="window.repairFreePupilsCasual()" style="background: #0284c7; color: #ffffff; border: none; font-weight: 700; font-size: 0.82rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);">
            <i class="fa-solid fa-bolt"></i> ⚡ Re-Pair Free Pupils
          </button>
        </div>

        ${
          bracket.casualMatches && bracket.casualMatches.length > 0
            ? `
          <div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
            ${bracket.casualMatches
              .map((cm) => {
                const h1 = HOUSES[cm.p1.house];
                const h2 = HOUSES[cm.p2.house];
                return `
                <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 0.72rem; font-weight: 800; color: #64748b;">
                    <span>CASUAL RAPID</span>
                    <span style="color: #0284c7;">${cm.time}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">
                    <span style="color: ${h1 ? h1.color : '#0f172a'};">${cm.p1.name}</span>
                    <span style="color: #94a3b8; font-size: 0.75rem;">vs</span>
                    <span style="color: ${h2 ? h2.color : '#0f172a'};">${cm.p2.name}</span>
                  </div>
                  ${
                    !cm.winner
                      ? `
                    <div style="display: flex; gap: 6px;">
                      <button onclick="window.advanceCasualMatch('${cm.id}', '${cm.p1.id}')" style="flex: 1; background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 0.7rem; font-weight: 700; padding: 4px; border-radius: 4px; cursor: pointer;">
                        ${cm.p1.name.split(' ')[0]} Won
                      </button>
                      <button onclick="window.advanceCasualMatch('${cm.id}', '${cm.p2.id}')" style="flex: 1; background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 0.7rem; font-weight: 700; padding: 4px; border-radius: 4px; cursor: pointer;">
                        ${cm.p2.name.split(' ')[0]} Won
                      </button>
                    </div>
                  `
                      : `
                    <div style="text-align: center; font-size: 0.72rem; font-weight: 800; color: #15803d; border-top: 1px solid #e2e8f0; padding-top: 4px;">
                      ✓ Winner: ${cm.winner.name} (+3 pts)
                    </div>
                  `
                  }
                </div>
              `;
              })
              .join('')}
          </div>
        `
            : ''
        }
      </div>

    </div>
  `;
}

// 6. Historical Chess Opening Drill Cards (2-Minute Timers)
function renderDrillsTab() {
  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Guidance Header -->
      <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border: 1.5px solid #fbcfe8; border-radius: 12px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: #db2777; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
            <i class="fa-solid fa-stopwatch-20"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; color: #831843; font-weight: 800;">2-Minute "Chess in History" Opening Drills</h3>
            <div style="font-size: 0.85rem; color: #9d174d; margin-top: 2px;">
              Kick off Period 6 sessions with a historical spark! Pose the tactical problem to pupils, hit the 2-minute timer, and reveal the grandmaster solution.
            </div>
          </div>
        </div>
      </div>

      <!-- The Beth Harmon Ceiling Board (Tactical Showcase) -->
      ${renderBethHarmonCeilingBoard()}

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px;">
        ${HISTORICAL_CHESS_SPOTLIGHTS.map((sp) => {
          return `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 22px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="background: #f1f5f9; color: #475569; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">
                  <i class="fa-solid ${sp.icon}" style="color: ${sp.color || '#8b5cf6'};"></i> ${sp.badge}
                </span>
                <span style="font-size: 0.75rem; color: #b45309; font-weight: 700;">${sp.period}</span>
              </div>

              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #0f172a; margin: 0 0 8px 0; font-weight: 700;">
                ${sp.title}
              </h3>

              <p style="font-size: 0.9rem; color: #334155; line-height: 1.55; margin: 0 0 14px 0;">
                ${sp.excerpt}
              </p>

              <!-- Tactical Drill Box -->
              <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 14px;">
                <div style="font-weight: 800; font-size: 0.85rem; color: #0f172a; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-crosshairs" style="color: #ef4444;"></i> ${sp.drill.headline}
                </div>
                <div style="font-size: 0.85rem; color: #475569; line-height: 1.5; margin-bottom: 8px;">
                  ${sp.drill.scenario}
                </div>
                <div style="font-size: 0.78rem; color: #64748b; font-style: italic;">
                  <strong>Hint:</strong> ${sp.drill.hint}
                </div>

                <!-- 2-Minute Timer Widget -->
                <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; margin-top: 10px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-hourglass-half" style="color: #f59e0b;"></i>
                    <span id="timer-display-${sp.id}" style="font-family: monospace; font-size: 1.15rem; font-weight: 800; color: #0f172a;">02:00</span>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <button id="timer-btn-${sp.id}" onclick="window.startDrillTimer('${sp.id}')" style="background: #0284c7; color: #fff; border: none; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                      Start
                    </button>
                    <button onclick="window.resetDrillTimer('${sp.id}')" style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                      Reset
                    </button>
                  </div>
                </div>

                <!-- Solution Reveal Accordion -->
                <div style="margin-top: 10px;">
                  <button onclick="window.toggleDrillSolution('${sp.id}')" style="background: none; border: none; color: #2563eb; font-size: 0.8rem; font-weight: 700; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-key"></i> Reveal Solution
                  </button>
                  <div id="solution-${sp.id}" style="display: none; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 8px 10px; margin-top: 6px; font-size: 0.82rem; color: #065f46; line-height: 1.45;">
                    <strong>Solution:</strong> ${sp.drill.solution}
                  </div>
                </div>

              </div>

            </div>

            <!-- Did you know & Hinge -->
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="background: #fffbeb; border-left: 3.5px solid #f59e0b; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 0.78rem; color: #92400e; line-height: 1.4;">
                <strong><i class="fa-solid fa-lightbulb"></i> Did You Know?</strong> ${sp.didYouKnow}
              </div>
              <div style="background: #f0fdfa; border-left: 3.5px solid #0d9488; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 0.78rem; color: #115e59; line-height: 1.4;">
                <strong><i class="fa-solid fa-question-circle"></i> Discussion Hinge:</strong> ${sp.drill.hingeQuestion}
              </div>
            </div>

          </div>
        `;
        }).join('')}
      </div>

    </div>
  `;
}

// 7. Match History View
function renderMatchesTab() {
  return `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 700; font-size: 0.85rem; color: #64748b; text-transform: uppercase;">
          Recorded Games (${chessState.matches.length})
        </span>
        <button onclick="window.openLogMatchModal()" style="background: #8b5cf6; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
          + Log Another Match
        </button>
      </div>

      ${[...chessState.matches]
        .reverse()
        .map((m) => {
          const wH = HOUSES[m.whiteHouse] || { name: m.whiteHouse, color: '#334155' };
          const bH = HOUSES[m.blackHouse] || { name: m.blackHouse, color: '#334155' };

          let scoreBadge = '';
          if (m.result === '1-0') {
            scoreBadge = `<span style="background: #dcfce7; color: #166534; font-weight: 800; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">1 - 0</span>`;
          } else if (m.result === '0-1') {
            scoreBadge = `<span style="background: #dcfce7; color: #166534; font-weight: 800; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">0 - 1</span>`;
          } else {
            scoreBadge = `<span style="background: #e0f2fe; color: #0369a1; font-weight: 800; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">½ - ½</span>`;
          }

          return `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            
            <div style="display: flex; align-items: center; gap: 16px;">
              <!-- White Player -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #ffffff; border: 1.5px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #0f172a;">
                  <i class="fa-solid fa-chess-pawn"></i>
                </div>
                <div>
                  <div style="font-weight: 700; color: #0f172a; font-size: 0.95rem;">${m.white}</div>
                  <span style="font-size: 0.72rem; color: ${wH.color}; font-weight: 700;">${wH.name}</span>
                </div>
              </div>

              <div style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">vs</div>

              <!-- Black Player -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #0f172a; border: 1.5px solid #0f172a; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #ffffff;">
                  <i class="fa-solid fa-chess-pawn"></i>
                </div>
                <div>
                  <div style="font-weight: 700; color: #0f172a; font-size: 0.95rem;">${m.black}</div>
                  <span style="font-size: 0.72rem; color: ${bH.color}; font-weight: 700;">${bH.name}</span>
                </div>
              </div>
            </div>

            <!-- Match Meta & Result -->
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="text-align: right;">
                <div style="font-size: 0.8rem; color: #64748b;">${m.date} · ${m.round || 'Period 6'}</div>
                ${m.opening ? `<div style="font-size: 0.75rem; color: #b45309; font-weight: 600;">${m.opening}</div>` : ''}
              </div>
              <div>${scoreBadge}</div>
            </div>

          </div>
        `;
        })
        .join('')}
    </div>
  `;
}

// Styling Helpers: Classic Chess Salon Aesthetic
function getTabStyle(isActive) {
  return `
    padding: 10px 16px;
    font-size: 0.92rem;
    font-weight: 700;
    font-family: 'Playfair Display', Georgia, serif;
    letter-spacing: 0.02em;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${isActive ? '#1c1917' : '#78716c'};
    border-bottom: 2.5px solid ${isActive ? '#1c1917' : 'transparent'};
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: all 0.15s ease;
  `;
}

function getFilterPillStyle(isActive) {
  return `
    padding: 5px 14px;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: monospace;
    letter-spacing: 0.04em;
    border-radius: 4px;
    border: 1px solid ${isActive ? '#1c1917' : '#d6d3d1'};
    background: ${isActive ? '#1c1917' : '#faf8f5'};
    color: ${isActive ? '#fafaf9' : '#57534e'};
    cursor: pointer;
    transition: all 0.15s ease;
  `;
}

window.toggleChessAdminDropdown = function (e) {
  if (e && e.stopPropagation) e.stopPropagation();
  chessState.showAdminDropdown = !chessState.showAdminDropdown;
  renderChessHubView();
};

window.toggleTeacherGuideCollapse = function () {
  chessState.showTeacherGuide = !chessState.showTeacherGuide;
  renderChessHubView();
};

if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (chessState.showAdminDropdown) {
      const menu = document.getElementById('chess-admin-dropdown');
      const btn = document.getElementById('btn-chess-admin-menu');
      if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        chessState.showAdminDropdown = false;
        renderChessHubView();
      }
    }
  });
}

// Navigation Handlers
window.switchChessTab = function (tabName) {
  chessState.activeTab = tabName;
  if (tabName === 'beginners') {
    chessState.puzzleCategory = 'beginner';
    chessState.currentPuzzleIdx = 0;
    chessState.activePuzzleBoard = null;
    chessState.selectedSquare = null;
    chessState.puzzleMoveStep = 0;
    chessState.puzzleStatus = 'idle';
    chessState.puzzleFeedback = null;
    chessState.showBethHarmonHint = false;
    chessState.showBethHarmonSolution = false;
  }
  renderChessHubView();
};

window.setChessYearFilter = function (filter) {
  chessState.filterYear = filter;
  renderChessHubView();
};

window.setChessHouseFilter = function (houseId) {
  chessState.filterHouse = houseId;
  renderChessHubView();
};

// Check-in / Attendance Handlers
window.checkInPlayer = function (id) {
  const p = chessState.players.find((x) => x.id === id);
  if (!p) return;
  if (!chessState.checkedInPlayerIds.includes(id)) {
    chessState.checkedInPlayerIds.push(id);
    saveChessState();
    renderChessHubView();
    showChessToast(`✓ ${p.name} checked in!`, 'success');
  }
};

window.checkOutPlayer = function (id) {
  const p = chessState.players.find((x) => x.id === id);
  chessState.checkedInPlayerIds = chessState.checkedInPlayerIds.filter((pId) => pId !== id);
  saveChessState();
  renderChessHubView();
  showChessToast(`Marked ${p ? p.name : 'pupil'} as absent`, 'info');
};

window.checkInAllPlayers = function () {
  chessState.checkedInPlayerIds = chessState.players.map((p) => p.id);
  saveChessState();
  renderChessHubView();
  showChessToast(`All ${chessState.players.length} pupils checked in!`, 'success');
};

window.clearAttendance = function () {
  chessState.checkedInPlayerIds = [];
  saveChessState();
  renderChessHubView();
  showChessToast('Attendance reset for today', 'info');
};

window.handleChecklistChange = function (id, checked) {
  if (checked) {
    window.checkInPlayer(id);
  } else {
    window.checkOutPlayer(id);
  }
};

window.toggleAllAttendance = function (checkAll) {
  if (checkAll) {
    window.checkInAllPlayers();
  } else {
    window.clearAttendance();
  }
};

window.removePlayer = function (id) {
  const p = chessState.players.find((x) => x.id === id);
  const name = p ? p.name : 'Pupil';
  chessState.players = chessState.players.filter((x) => x.id !== id);
  chessState.checkedInPlayerIds = chessState.checkedInPlayerIds.filter((pId) => pId !== id);
  chessState.players.sort((a, b) => a.rank - b.rank);
  chessState.players.forEach((player, idx) => {
    player.rank = idx + 1;
  });
  saveChessState();
  renderChessHubView();
  showChessToast(`Removed ${name} from the club`, 'info');
};

window.resetClubDataToCleanSlate = function () {
  const count = chessState.players.length;
  const matchCount = chessState.matches.length;

  const msg =
    count > 0
      ? `⚠️ RESET CHESS CLUB SLATE\n\nAre you sure you want to clear the active cohort for the new term/year?\n\n• ${count} pupils on ladder\n• ${matchCount} match records\n• House championship points\n\n🛡️ SAFETY NET: An emergency backup snapshot will be automatically preserved. You can undo or restore this cohort at any time if clicked by accident.`
      : 'Are you sure you want to reset the club to a clean slate?';

  if (confirm(msg)) {
    if (count > 0 || matchCount > 0) {
      try {
        const backup = {
          timestamp: Date.now(),
          dateStr: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          playerCount: count,
          matchCount: matchCount,
          state: JSON.parse(JSON.stringify(chessState)),
        };
        localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
      } catch (err) {
        console.error('Failed to create emergency backup:', err);
      }
    }
    initChessState(true);
    renderChessHubView();
    showChessToast('Club reset to clean slate. Safety backup created!', 'warning');
  }
};

window.restoreChessBackup = function () {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) {
      showChessToast('No previous backup found to restore.', 'warning');
      return;
    }
    const backup = JSON.parse(raw);
    if (!backup.state || !Array.isArray(backup.state.players)) {
      showChessToast('Backup archive is invalid or corrupted.', 'error');
      return;
    }
    chessState.players = Array.isArray(backup.state.players) ? backup.state.players : [];
    chessState.matches = Array.isArray(backup.state.matches) ? backup.state.matches : [];
    chessState.checkedInPlayerIds = Array.isArray(backup.state.checkedInPlayerIds)
      ? backup.state.checkedInPlayerIds
      : [];
    chessState.knockoutBracket = backup.state.knockoutBracket || null;
    saveChessState();
    renderChessHubView();
    showChessToast(
      `🎉 Restored previous cohort: ${backup.playerCount} pupils & ${backup.matchCount} games from ${backup.dateStr}!`,
      'success',
    );
  } catch (err) {
    console.error('Failed to restore chess backup:', err);
    showChessToast('Error restoring previous cohort.', 'error');
  }
};

window.handleSelfRegister = function (e) {
  if (e && e.preventDefault) e.preventDefault();
  const nameInput = document.getElementById('reg-name');
  if (!nameInput) return false;
  const rawName = nameInput.value.trim();
  const name = sanitizePupilName(rawName);
  nameInput.value = name;
  const year = parseInt(document.getElementById('reg-year')?.value || '8', 10);
  const house = document.getElementById('reg-house')?.value || 'warrior';

  if (!name) {
    showChessToast("Please enter the pupil's name.", 'warning');
    return false;
  }

  // Check if pupil already registered (case-insensitive)
  const existing = chessState.players.find((p) => p.name.toLowerCase() === name.toLowerCase());

  if (existing) {
    if (!chessState.checkedInPlayerIds.includes(existing.id)) {
      chessState.checkedInPlayerIds.push(existing.id);
      saveChessState();
      renderChessHubView();
      showChessToast(`Welcome back, ${existing.name}! Checked in for today.`, 'success');
    } else {
      showChessToast(`${existing.name} is already checked in for today!`, 'info');
    }
    return false;
  }

  const newId = 'p_' + Date.now();
  const newRank = chessState.players.length + 1;
  chessState.players.push({
    id: newId,
    name: name,
    year: year,
    house: house,
    rating: 1000,
    games: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    rank: newRank,
  });

  chessState.checkedInPlayerIds.push(newId);
  saveChessState();
  renderChessHubView();
  showChessToast(
    `🎉 Registered & checked in ${name} for House ${HOUSES[house]?.name || house}!`,
    'success',
  );

  setTimeout(() => {
    const input = document.getElementById('reg-name');
    if (input) input.focus();
  }, 50);

  return false;
};

// 1-Click Thursday Period 6 Auto-Pairings Algorithm
window.generateThursdayPairings = function () {
  const presentIds = chessState.checkedInPlayerIds;
  if (presentIds.length < 2) {
    showChessToast('Please check in at least 2 pupils to generate pairings.', 'warning');
    return;
  }

  const presentPlayers = chessState.players
    .filter((p) => presentIds.includes(p.id))
    .sort((a, b) => b.rating - a.rating);

  const pairings = [];
  const pool = [...presentPlayers];

  while (pool.length >= 2) {
    const white = pool.shift();
    let bestOpponentIdx = 0;

    for (let i = 0; i < pool.length; i++) {
      if (pool[i].house !== white.house) {
        bestOpponentIdx = i;
        break;
      }
    }

    const black = pool.splice(bestOpponentIdx, 1)[0];
    const boardNum = pairings.length + 1;

    pairings.push({
      board: boardNum,
      white: white,
      black: black,
    });
  }

  if (pool.length === 1) {
    pairings.push({
      board: pairings.length + 1,
      white: pool[0],
      black: null,
      isBye: true,
    });
  }

  chessState.activePairings = pairings;

  const box = document.getElementById('pairings-results-box');
  if (!box) return;

  box.innerHTML = `
    <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; animation: fadeIn 0.25s ease-out;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-chess-board" style="color: #8b5cf6;"></i> Official Period 6 Board Assignments
          </h3>
          <div style="font-size: 0.8rem; color: #64748b;">Generated for ${presentIds.length} players (${pairings.filter((p) => !p.isBye).length} active boards)</div>
        </div>

        <button onclick="window.printFidePairingSheet()" style="background: #1c1917; color: #d4af37; border: 1.5px solid #44403c; padding: 6px 14px; border-radius: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-print"></i> 🖨 Print FIDE Sheet (A4)
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        ${pairings
          .map((p) => {
            if (p.isBye) {
              return `
              <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; text-align: center;">
                <div style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Odd Number of Players</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 4px 0;">${p.white.name}</div>
                <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">Receives 1 Practice Bye (+1 pt)</div>
              </div>
            `;
            }

            const wH = HOUSES[p.white.house];
            const bH = HOUSES[p.black.house];

            return `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.75rem; font-weight: 800;">
                <span style="color: #2563eb; text-transform: uppercase;">BOARD ${p.board}</span>
                <span style="color: #64748b;">Rank #${p.white.rank} vs #${p.black.rank}</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="min-width: 0;">
                  <div style="font-weight: 700; color: #0f172a; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 2px; background: #ffffff; border: 1px solid #94a3b8;"></span>
                    <span>${p.white.name}</span>
                  </div>
                  <div style="font-size: 0.72rem; color: ${wH.color}; font-weight: 700;">${wH.name} · Y${p.white.year}</div>
                </div>

                <div style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; padding: 0 6px;">vs</div>

                <div style="text-align: right; min-width: 0;">
                  <div style="font-weight: 700; color: #0f172a; font-size: 0.9rem; display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
                    <span>${p.black.name}</span>
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 2px; background: #0f172a;"></span>
                  </div>
                  <div style="font-size: 0.72rem; color: ${bH.color}; font-weight: 700;">${bH.name} · Y${p.black.year}</div>
                </div>
              </div>

              <div style="border-top: 1px solid #f1f5f9; padding-top: 8px; text-align: center;">
                <button onclick="window.prefillMatchModal('${p.white.id}', '${p.black.id}', ${p.board})" style="background: none; border: none; color: #8b5cf6; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                  <i class="fa-solid fa-square-check"></i> Record Result for Board ${p.board}
                </button>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

    </div>
  `;
};

// Knockout Cup Generator & Progression (Audio 3)
window.generateKnockoutTournament = function () {
  let playerPool = chessState.players.filter((p) => chessState.checkedInPlayerIds.includes(p.id));
  if (playerPool.length < 4) {
    // If fewer than 4, take top 8 players from overall roster
    playerPool = [...chessState.players].slice(0, 8);
  }

  if (playerPool.length < 4) {
    showChessToast(
      'Need at least 4 registered pupils to create a Knockout Cup bracket.',
      'warning',
    );
    return;
  }

  // Shuffle players
  const shuffled = [...playerPool].sort(() => 0.5 - Math.random());
  const tournamentSize = shuffled.length >= 8 ? 8 : 4;
  const participants = shuffled.slice(0, tournamentSize);

  const round1Matches = [];
  for (let i = 0; i < tournamentSize; i += 2) {
    round1Matches.push({
      id: `ko_r1_${i / 2}`,
      p1: participants[i],
      p2: participants[i + 1],
      winner: null,
    });
  }

  const roundNames =
    tournamentSize === 8
      ? ['Quarter-Finals', 'Semi-Finals', 'Championship Final']
      : ['Semi-Finals', 'Championship Final'];

  const rounds = [round1Matches];
  if (tournamentSize === 8) {
    rounds.push([
      { id: 'ko_sf_0', p1: null, p2: null, winner: null },
      { id: 'ko_sf_1', p1: null, p2: null, winner: null },
    ]);
  }
  rounds.push([{ id: 'ko_final', p1: null, p2: null, winner: null }]);

  // Challenger Plate (Wooden Spoon Shield) Setup:
  // In an 8-player bracket: 4 losers from Round 1 battle in Plate Semi-Finals -> Wooden Spoon Final
  // In a 4-player bracket: 2 losers from Round 1 battle in the Wooden Spoon Final directly!
  let plateRounds = [];
  let plateRoundNames = [];
  if (tournamentSize === 8) {
    plateRoundNames = ['Plate Semi-Finals', 'Wooden Spoon Shield Final'];
    plateRounds = [
      [
        { id: 'plate_sf_0', p1: null, p2: null, winner: null },
        { id: 'plate_sf_1', p1: null, p2: null, winner: null },
      ],
      [{ id: 'plate_final', p1: null, p2: null, winner: null }],
    ];
  } else {
    plateRoundNames = ['Wooden Spoon Shield Final'];
    plateRounds = [[{ id: 'plate_final', p1: null, p2: null, winner: null }]];
  }

  chessState.knockoutBracket = {
    tournamentSize,
    roundNames,
    rounds,
    plateRoundNames,
    plateRounds,
    casualMatches: [],
  };

  saveChessState();
  chessState.activeTab = 'knockout';
  renderChessHubView();
};

window.advanceKnockoutWinner = function (roundIdx, matchIdx, winnerId) {
  const bracket = chessState.knockoutBracket;
  if (!bracket) return;

  const match = bracket.rounds[roundIdx][matchIdx];
  if (!match || !match.p1 || !match.p2) return;

  const winner = match.p1.id === winnerId ? match.p1 : match.p2;
  const loser = match.p1.id === winnerId ? match.p2 : match.p1;
  match.winner = winner;
  match.loser = loser;

  // Record official match in history
  chessState.matches.push({
    id: 'ko_m_' + Date.now(),
    date: 'Thursday Period 6 Championship',
    round: bracket.roundNames[roundIdx] || 'Championship Match',
    white: match.p1.name,
    black: match.p2.name,
    whiteHouse: match.p1.house,
    blackHouse: match.p2.house,
    result: winner.id === match.p1.id ? '1-0' : '0-1',
    opening: 'Championship Cup Match',
  });

  // Update player stats
  winner.won++;
  winner.games++;
  winner.rating += 15;
  loser.lost++;
  loser.games++;
  loser.rating = Math.max(800, loser.rating - 15);

  // Advance winner in the Championship Cup tree
  if (roundIdx + 1 < bracket.rounds.length) {
    const nextMatchIdx = Math.floor(matchIdx / 2);
    const nextMatch = bracket.rounds[roundIdx + 1][nextMatchIdx];
    if (nextMatch) {
      if (matchIdx % 2 === 0) {
        nextMatch.p1 = winner;
      } else {
        nextMatch.p2 = winner;
      }
    }
  }

  // Route Round 1 losers into the Challenger Plate (Wooden Spoon Shield)
  if (roundIdx === 0 && bracket.plateRounds && bracket.plateRounds.length > 0) {
    if (bracket.tournamentSize === 8) {
      const plateMatchIdx = Math.floor(matchIdx / 2);
      const plateMatch = bracket.plateRounds[0][plateMatchIdx];
      if (plateMatch) {
        if (matchIdx % 2 === 0) {
          plateMatch.p1 = loser;
        } else {
          plateMatch.p2 = loser;
        }
      }
    } else if (bracket.tournamentSize === 4) {
      const plateFinal = bracket.plateRounds[0][0];
      if (plateFinal) {
        if (matchIdx === 0) {
          plateFinal.p1 = loser;
        } else {
          plateFinal.p2 = loser;
        }
      }
    }
  }

  saveChessState();
  renderChessHubView();
  if (chessState.autoRePairEnabled && chessState.sessionActive) {
    setTimeout(() => {
      window.checkAndAutoPairFreePupils();
    }, 120);
  }
};

window.advancePlateWinner = function (roundIdx, matchIdx, winnerId) {
  const bracket = chessState.knockoutBracket;
  if (!bracket || !bracket.plateRounds) return;

  const match = bracket.plateRounds[roundIdx][matchIdx];
  if (!match || !match.p1 || !match.p2) return;

  const winner = match.p1.id === winnerId ? match.p1 : match.p2;
  const loser = match.p1.id === winnerId ? match.p2 : match.p1;
  match.winner = winner;
  match.loser = loser;

  const roundName = bracket.plateRoundNames[roundIdx] || `Plate Round ${roundIdx + 1}`;

  // Record official match in history
  chessState.matches.push({
    id: 'plate_m_' + Date.now(),
    date: 'Thursday Period 6 Challenger Plate',
    round: roundName,
    white: match.p1.name,
    black: match.p2.name,
    whiteHouse: match.p1.house,
    blackHouse: match.p2.house,
    result: winner.id === match.p1.id ? '1-0' : '0-1',
    opening: 'Challenger Plate Match',
  });

  // Update player stats (+2 House points for Plate wins!)
  winner.won++;
  winner.games++;
  winner.rating += 10;
  loser.lost++;
  loser.games++;
  loser.rating = Math.max(800, loser.rating - 10);

  // If there is a next round in the Plate (e.g. from SF to Final in 8-player)
  if (roundIdx + 1 < bracket.plateRounds.length) {
    const nextMatchIdx = Math.floor(matchIdx / 2);
    const nextMatch = bracket.plateRounds[roundIdx + 1][nextMatchIdx];
    if (nextMatch) {
      if (matchIdx % 2 === 0) {
        nextMatch.p1 = winner;
      } else {
        nextMatch.p2 = winner;
      }
    }
  }

  saveChessState();
  renderChessHubView();
  if (chessState.autoRePairEnabled && chessState.sessionActive) {
    setTimeout(() => {
      window.checkAndAutoPairFreePupils();
    }, 120);
  }
};

window.repairFreePupilsCasual = function () {
  const bracket = chessState.knockoutBracket;
  if (!bracket) return;

  const busyIds = new Set();
  bracket.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if (m.p1 && m.p2 && !m.winner) {
        busyIds.add(m.p1.id);
        busyIds.add(m.p2.id);
      }
    });
  });
  if (bracket.plateRounds) {
    bracket.plateRounds.forEach((rnd) => {
      rnd.forEach((m) => {
        if (m.p1 && m.p2 && !m.winner) {
          busyIds.add(m.p1.id);
          busyIds.add(m.p2.id);
        }
      });
    });
  }
  if (bracket.casualMatches) {
    bracket.casualMatches.forEach((m) => {
      if (m.p1 && m.p2 && !m.winner) {
        busyIds.add(m.p1.id);
        busyIds.add(m.p2.id);
      }
    });
  }

  const pool = chessState.players.filter(
    (p) => chessState.checkedInPlayerIds.includes(p.id) && !busyIds.has(p.id),
  );

  if (pool.length < 2) {
    showChessToast(
      'Fewer than 2 free pupils available right now (others are in active tournament matches).',
      'warning',
    );
    return;
  }

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  if (!bracket.casualMatches) bracket.casualMatches = [];

  let count = 0;
  while (shuffled.length >= 2) {
    const p1 = shuffled.shift();
    const p2 = shuffled.shift();
    bracket.casualMatches.push({
      id: 'casual_' + Date.now() + '_' + count,
      p1,
      p2,
      time: '10-Min Rapid',
      winner: null,
    });
    count++;
  }

  saveChessState();
  renderChessHubView();
  showChessToast(
    `⚡ Paired ${count * 2} free pupils for 10-minute rapid games! Nobody sits idle.`,
    'success',
  );
};

window.advanceCasualMatch = function (casualId, winnerId) {
  const bracket = chessState.knockoutBracket;
  if (!bracket || !bracket.casualMatches) return;
  const match = bracket.casualMatches.find((m) => m.id === casualId);
  if (!match || match.winner) return;

  const winner = match.p1.id === winnerId ? match.p1 : match.p2;
  const loser = match.p1.id === winnerId ? match.p2 : match.p1;
  match.winner = winner;

  chessState.matches.push({
    id: 'cas_m_' + Date.now(),
    date: 'Thursday Period 6 Casual Rapid',
    round: 'Casual Rapid Match',
    white: match.p1.name,
    black: match.p2.name,
    whiteHouse: match.p1.house,
    blackHouse: match.p2.house,
    result: winner.id === match.p1.id ? '1-0' : '0-1',
    opening: 'Period 6 Rapid Game',
  });

  winner.won++;
  winner.games++;
  winner.rating += 8;
  loser.lost++;
  loser.games++;
  loser.rating = Math.max(800, loser.rating - 8);

  saveChessState();
  renderChessHubView();
  showChessToast(`Logged match! ${winner.name} won (+3 House points).`, 'success');
  if (chessState.autoRePairEnabled && chessState.sessionActive) {
    setTimeout(() => {
      window.checkAndAutoPairFreePupils();
    }, 120);
  }
};

window.resetKnockoutTournament = function () {
  chessState.knockoutBracket = null;
  saveChessState();
  renderChessHubView();
};

// Continuous Play Matchmaker & Whiteboard Projection Engine
export function getActiveMatches() {
  const active = [];
  const bracket = chessState.knockoutBracket;
  let boardIdx = 1;
  if (bracket) {
    if (Array.isArray(bracket.rounds)) {
      bracket.rounds.forEach((round, rIdx) => {
        round.forEach((m, mIdx) => {
          if (m.p1 && m.p2 && !m.winner && !m.isDraw) {
            active.push({
              type: 'knockout',
              rIdx,
              mIdx,
              id: m.id || `ko_${rIdx}_${mIdx}`,
              boardNum: boardIdx++,
              p1: m.p1,
              p2: m.p2,
              title: bracket.roundNames?.[rIdx] || `Championship Round ${rIdx + 1}`,
              badge: 'Championship Cup',
            });
          }
        });
      });
    }
    if (Array.isArray(bracket.plateRounds)) {
      bracket.plateRounds.forEach((round, rIdx) => {
        round.forEach((m, mIdx) => {
          if (m.p1 && m.p2 && !m.winner && !m.isDraw) {
            active.push({
              type: 'plate',
              rIdx,
              mIdx,
              id: m.id || `plate_${rIdx}_${mIdx}`,
              boardNum: boardIdx++,
              p1: m.p1,
              p2: m.p2,
              title: bracket.plateRoundNames?.[rIdx] || `Plate Round ${rIdx + 1}`,
              badge: 'Challenger Plate',
            });
          }
        });
      });
    }
    if (Array.isArray(bracket.casualMatches)) {
      bracket.casualMatches.forEach((m, mIdx) => {
        if (m.p1 && m.p2 && !m.winner && !m.isDraw) {
          active.push({
            type: 'casual',
            rIdx: 0,
            mIdx,
            id: m.id,
            boardNum: m.boardNumber || boardIdx++,
            p1: m.p1,
            p2: m.p2,
            title: m.time || '10-Min Rapid Game',
            badge: 'Rapid Re-Pair',
          });
        }
      });
    }
  }
  return active;
}

export function getIdlePupils() {
  const activeMatches = getActiveMatches();
  const busyIds = new Set();
  activeMatches.forEach((m) => {
    if (m.p1) busyIds.add(m.p1.id);
    if (m.p2) busyIds.add(m.p2.id);
  });
  const checkedInSet = new Set(chessState.checkedInPlayerIds || []);
  return chessState.players.filter((p) => checkedInSet.has(p.id) && !busyIds.has(p.id));
}

window.checkAndAutoPairFreePupils = function () {
  if (!chessState.autoRePairEnabled || !chessState.sessionActive) return;

  if (!chessState.knockoutBracket) {
    chessState.knockoutBracket = {
      tournamentSize: 0,
      rounds: [],
      plateRounds: [],
      casualMatches: [],
      roundNames: [],
    };
  }
  const bracket = chessState.knockoutBracket;
  if (!bracket.casualMatches) bracket.casualMatches = [];

  const activeMatches = getActiveMatches();
  const busyIds = new Set();
  activeMatches.forEach((m) => {
    if (m.p1) busyIds.add(m.p1.id);
    if (m.p2) busyIds.add(m.p2.id);
  });

  const checkedInSet = new Set(chessState.checkedInPlayerIds || []);
  const freePupils = chessState.players.filter((p) => checkedInSet.has(p.id) && !busyIds.has(p.id));

  if (freePupils.length < 2) return;

  // Smart pairing: balance by rating and try to pair different houses
  const pool = [...freePupils].sort((a, b) => (b.rating || 1000) - (a.rating || 1000));
  const newlyPaired = [];
  let nextBoard = activeMatches.length + 1;

  while (pool.length >= 2) {
    const p1 = pool.shift();
    let p2Idx = pool.findIndex((cand) => cand.house !== p1.house);
    if (p2Idx === -1) p2Idx = 0;
    const p2 = pool.splice(p2Idx, 1)[0];

    const matchObj = {
      id: 'auto_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      p1,
      p2,
      time: '10-Min Rapid',
      boardNumber: nextBoard++,
      winner: null,
      isDraw: false,
      startedAt: Date.now(),
    };
    bracket.casualMatches.push(matchObj);
    newlyPaired.push(`${p1.name} vs ${p2.name} (Board ${matchObj.boardNumber})`);
  }

  if (newlyPaired.length > 0) {
    saveChessState();
    renderChessHubView();
    showChessToast(
      `⚡ Auto-Paired: ${newlyPaired.join(' · ')}! Continuous play in progress.`,
      'success',
    );
  }
};

window.recordBoardResult = function (type, rIdx, mIdx, resultWinnerId, matchId) {
  const bracket = chessState.knockoutBracket;
  if (!bracket) return;

  if (type === 'knockout') {
    if (resultWinnerId === 'draw') {
      const match = bracket.rounds?.[rIdx]?.[mIdx];
      if (match && match.p1 && match.p2) {
        match.isDraw = true;
        match.p1.drawn = (match.p1.drawn || 0) + 1;
        match.p2.drawn = (match.p2.drawn || 0) + 1;
        match.p1.games++;
        match.p2.games++;
        chessState.matches.push({
          id: 'ko_m_' + Date.now(),
          date: 'Thursday Period 6 Championship',
          round: bracket.roundNames?.[rIdx] || 'Championship Match',
          white: match.p1.name,
          black: match.p2.name,
          whiteHouse: match.p1.house,
          blackHouse: match.p2.house,
          result: '½-½',
          opening: 'Championship Draw',
        });
        saveChessState();
        renderChessHubView();
        showChessToast(
          `Board result logged: Draw between ${match.p1.name} and ${match.p2.name} (+2 House pts each)!`,
          'info',
        );
      }
    } else {
      window.advanceKnockoutWinner(rIdx, mIdx, resultWinnerId);
    }
  } else if (type === 'plate') {
    if (resultWinnerId === 'draw') {
      const match = bracket.plateRounds?.[rIdx]?.[mIdx];
      if (match && match.p1 && match.p2) {
        match.isDraw = true;
        match.p1.drawn = (match.p1.drawn || 0) + 1;
        match.p2.drawn = (match.p2.drawn || 0) + 1;
        match.p1.games++;
        match.p2.games++;
        chessState.matches.push({
          id: 'plate_m_' + Date.now(),
          date: 'Thursday Period 6 Challenger Plate',
          round: bracket.plateRoundNames?.[rIdx] || `Plate Round ${rIdx + 1}`,
          white: match.p1.name,
          black: match.p2.name,
          whiteHouse: match.p1.house,
          blackHouse: match.p2.house,
          result: '½-½',
          opening: 'Challenger Plate Draw',
        });
        saveChessState();
        renderChessHubView();
        showChessToast(
          `Plate result logged: Draw between ${match.p1.name} and ${match.p2.name} (+2 House pts each)!`,
          'info',
        );
      }
    } else {
      window.advancePlateWinner(rIdx, mIdx, resultWinnerId);
    }
  } else if (type === 'casual') {
    const match = bracket.casualMatches?.find((m) => m.id === matchId);
    if (!match || match.winner || match.isDraw) return;
    if (resultWinnerId === 'draw') {
      match.isDraw = true;
      match.p1.drawn = (match.p1.drawn || 0) + 1;
      match.p2.drawn = (match.p2.drawn || 0) + 1;
      match.p1.games++;
      match.p2.games++;
      chessState.matches.push({
        id: 'cas_m_' + Date.now(),
        date: 'Thursday Period 6 Casual Rapid',
        round: 'Casual Rapid Match',
        white: match.p1.name,
        black: match.p2.name,
        whiteHouse: match.p1.house,
        blackHouse: match.p2.house,
        result: '½-½',
        opening: 'Period 6 Rapid Game',
      });
      saveChessState();
      renderChessHubView();
      showChessToast(
        `Logged: Draw between ${match.p1.name} and ${match.p2.name} (+2 House pts each)!`,
        'info',
      );
    } else {
      window.advanceCasualMatch(matchId, resultWinnerId);
    }
  }

  // Automatic Re-Pair trigger
  if (chessState.autoRePairEnabled && chessState.sessionActive) {
    setTimeout(() => {
      window.checkAndAutoPairFreePupils();
    }, 120);
  }
};

window.concludePeriod6Session = function () {
  chessState.sessionActive = false;
  chessState.sessionTimerRunning = false;

  const bracket = chessState.knockoutBracket;
  let drawCount = 0;

  if (bracket) {
    const processMatch = (m, roundTitle) => {
      if (m && m.p1 && m.p2 && !m.winner && !m.isDraw) {
        m.isDraw = true;
        m.p1.drawn = (m.p1.drawn || 0) + 1;
        m.p2.drawn = (m.p2.drawn || 0) + 1;
        m.p1.games++;
        m.p2.games++;
        chessState.matches.push({
          id: 'adj_m_' + Date.now() + '_' + drawCount,
          date: 'Thursday Period 6 Final Adjudication',
          round: roundTitle,
          white: m.p1.name,
          black: m.p2.name,
          whiteHouse: m.p1.house,
          blackHouse: m.p2.house,
          result: '½-½',
          opening: 'Adjudicated Time Draw',
        });
        drawCount++;
      }
    };

    if (Array.isArray(bracket.rounds)) {
      bracket.rounds.forEach((rnd, rIdx) => {
        rnd.forEach((m) => processMatch(m, bracket.roundNames?.[rIdx] || 'Championship Match'));
      });
    }
    if (Array.isArray(bracket.plateRounds)) {
      bracket.plateRounds.forEach((rnd, rIdx) => {
        rnd.forEach((m) => processMatch(m, bracket.plateRoundNames?.[rIdx] || 'Plate Match'));
      });
    }
    if (Array.isArray(bracket.casualMatches)) {
      bracket.casualMatches.forEach((m) => processMatch(m, 'Casual Rapid Match'));
    }
  }

  saveChessState();
  renderChessHubView();
  showChessToast(
    `🏁 Period 6 Concluded! ${drawCount > 0 ? `${drawCount} active game(s) adjudicated as draws (+2 House points each).` : 'All games finished.'} Standings finalized!`,
    'success',
  );
};

window.resumePeriod6Session = function () {
  chessState.sessionActive = true;
  chessState.sessionTimerRunning = true;
  if (chessState.sessionTimeRemaining <= 0) {
    chessState.sessionTimeRemaining = 3600;
  }
  saveChessState();
  renderChessHubView();
  showChessToast('Period 6 Session resumed! Clock running & continuous re-pairing active.', 'info');
};

window.toggleSessionTimer = function () {
  chessState.sessionTimerRunning = !chessState.sessionTimerRunning;
  renderChessHubView();
  showChessToast(
    chessState.sessionTimerRunning ? '▶ Session clock running' : '⏸ Session clock paused',
    'info',
  );
};

window.resetSessionTimer = function () {
  chessState.sessionTimeRemaining = 3600;
  chessState.sessionTimerRunning = true;
  chessState.sessionActive = true;
  saveChessState();
  renderChessHubView();
  showChessToast('⏱ Session clock reset to 60:00.', 'info');
};

window.toggleWhiteboardMode = function (forceState) {
  if (typeof forceState === 'boolean') {
    chessState.whiteboardMode = forceState;
  } else {
    chessState.whiteboardMode = !chessState.whiteboardMode;
  }
  renderChessHubView();
  if (chessState.whiteboardMode) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showChessToast('📺 Big Screen Whiteboard Mode enabled! Press [Esc] or [W] to exit.', 'info');
  }
};

window.toggleAutoRePair = function () {
  chessState.autoRePairEnabled = !chessState.autoRePairEnabled;
  saveChessState();
  if (chessState.autoRePairEnabled) {
    window.checkAndAutoPairFreePupils();
    showChessToast(
      '⚡ Auto Re-Pairing ENABLED: Free pupils will be paired automatically.',
      'success',
    );
  } else {
    renderChessHubView();
    showChessToast('⏸ Auto Re-Pairing PAUSED: Manual pairing mode.', 'warning');
  }
};

export function renderWhiteboardModeView(sortedHouses) {
  const activeMatches = getActiveMatches();
  const idlePupils = getIdlePupils();
  const mins = Math.floor((chessState.sessionTimeRemaining || 0) / 60);
  const secs = (chessState.sessionTimeRemaining || 0) % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const leaderHouse = HOUSES[sortedHouses[0].id] || { name: 'Victory', color: '#dc2626' };

  return `
    <div style="background: #09090b; color: #fafafa; min-height: 100vh; padding: 18px 24px 80px 24px; font-family: 'Outfit', sans-serif; box-sizing: border-box;">
      
      <!-- Top Control Header Bar -->
      <div style="background: #18181b; border: 2px solid #27272a; border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Left: Status Badge & Salon Placard -->
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 46px; height: 46px; border-radius: 10px; background: #27272a; border: 1.5px solid #3f3f46; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #d4af37;">
            ♔
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-flex; align-items: center; gap: 5px; background: ${chessState.sessionActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${chessState.sessionActive ? '#4ade80' : '#f87171'}; border: 1px solid ${chessState.sessionActive ? '#22c55e' : '#ef4444'}; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; font-family: monospace;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: ${chessState.sessionActive ? '#22c55e' : '#ef4444'}; display: inline-block;"></span>
                ${chessState.sessionActive ? 'LIVE SESSION' : 'SESSION ENDED'}
              </span>
              <span style="color: #a1a1aa; font-size: 0.75rem; font-family: monospace;">SENIOR BLOCK HISTORY ROOM</span>
            </div>
            <h1 style="margin: 2px 0 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.65rem; color: #ffffff; font-weight: 700; letter-spacing: 0.02em;">
              Meoncross Chess Salon · Whiteboard Display
            </h1>
          </div>
        </div>

        <!-- Center: Giant Period 6 Countdown Clock -->
        <div style="background: #09090b; border: 2px solid #3f3f46; border-radius: 10px; padding: 10px 20px; display: flex; align-items: center; gap: 16px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.6);">
          <span style="font-size: 1.6rem; color: #f59e0b;">⏱</span>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div id="whiteboard-session-clock" style="font-family: monospace; font-size: 2.3rem; font-weight: 900; letter-spacing: 2px; line-height: 1; color: ${chessState.sessionActive ? '#22c55e' : '#ef4444'}; text-shadow: 0 0 12px ${chessState.sessionActive ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'};">
              ${formattedTime}
            </div>
            <span style="font-size: 0.65rem; color: #71717a; font-family: monospace; text-transform: uppercase; margin-top: 2px;">Period 6 Match Clock</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <button onclick="window.toggleSessionTimer()" style="background: #27272a; color: #fafafa; border: 1px solid #52525b; padding: 4px 10px; border-radius: 4px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px;">
              <span>${chessState.sessionTimerRunning ? '⏸' : '▶'}</span> ${chessState.sessionTimerRunning ? 'Pause' : 'Resume'}
            </button>
            <div style="display: gap: 4px; display: flex;">
              <button onclick="window.resetSessionTimer()" style="background: #27272a; color: #d4d4d8; border: 1px solid #52525b; padding: 3px 7px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer;" title="Reset clock to 60:00">
                ↺ 60m
              </button>
              ${
                chessState.sessionActive
                  ? `
                <button onclick="window.concludePeriod6Session()" style="background: rgba(220, 38, 38, 0.25); color: #fca5a5; border: 1px solid #ef4444; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; cursor: pointer;" title="Conclude session and adjudicate all active games as draws (+2 House points each)">
                  ⏹ Conclude
                </button>
              `
                  : `
                <button onclick="window.resumePeriod6Session()" style="background: rgba(34, 197, 94, 0.25); color: #86efac; border: 1px solid #22c55e; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; cursor: pointer;">
                  ▶ Resume
                </button>
              `
              }
            </div>
          </div>
        </div>

        <!-- Right: Action & Mode Exit Buttons -->
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button onclick="window.toggleAutoRePair()" style="background: ${chessState.autoRePairEnabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${chessState.autoRePairEnabled ? '#86efac' : '#fca5a5'}; border: 1.5px solid ${chessState.autoRePairEnabled ? '#22c55e' : '#ef4444'}; font-weight: 800; font-size: 0.82rem; padding: 8px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);" title="When enabled, free pupils are automatically paired as soon as a game ends">
            <span>⚡</span> Auto Re-Pair: <strong>${chessState.autoRePairEnabled ? 'ON' : 'PAUSED'}</strong>
          </button>
          <button onclick="window.openLogMatchModal()" style="background: #27272a; color: #fafafa; border: 1.5px solid #52525b; font-weight: 700; font-size: 0.82rem; padding: 8px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <span>⚔</span> Record Game
          </button>
          <button onclick="window.toggleWhiteboardMode(false)" style="background: #ffffff; color: #09090b; border: 1.5px solid #e4e4e7; font-weight: 800; font-size: 0.82rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(255,255,255,0.15);" title="Return to regular tabbed dashboard (or press Esc)">
            <span>✕</span> Exit (Esc)
          </button>
        </div>

      </div>

      <!-- House Championship Live Standings Ribbons -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 24px;">
        ${sortedHouses
          .map((h, idx) => {
            const houseDef = HOUSES[h.id] || { name: h.id, color: '#666', crest: '♜' };
            const isFirst = idx === 0;
            return `
            <div style="background: #18181b; border: 2px solid ${isFirst ? '#d4af37' : '#27272a'}; border-radius: 10px; padding: 14px 18px; position: relative; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
              ${
                isFirst
                  ? `<div style="position: absolute; top: 0; right: 0; background: #d4af37; color: #18181b; font-size: 0.65rem; font-weight: 900; padding: 2px 10px; border-bottom-left-radius: 6px; text-transform: uppercase; font-family: monospace;">👑 LEADER</div>`
                  : ''
              }
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.4rem;">${houseDef.crest || '♜'}</span>
                  <div>
                    <h3 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; color: #fafafa; font-weight: 700;">
                      ${houseDef.name}
                    </h3>
                    <span style="font-size: 0.72rem; color: #a1a1aa; font-family: monospace;">Rank #${idx + 1}</span>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.85rem; font-weight: 900; color: ${isFirst ? '#fbbf24' : '#fafafa'}; line-height: 1; font-family: monospace;">
                    ${h.points}
                  </div>
                  <span style="font-size: 0.68rem; color: #71717a; text-transform: uppercase; font-family: monospace;">House Pts</span>
                </div>
              </div>
              <div style="display: flex; gap: 10px; font-size: 0.75rem; color: #a1a1aa; border-top: 1px solid #27272a; padding-top: 8px; font-family: monospace;">
                <span>W: <strong style="color: #4ade80;">${h.wins}</strong></span>
                <span>D: <strong style="color: #facc15;">${h.draws}</strong></span>
                <span>L: <strong style="color: #f87171;">${h.losses}</strong></span>
                <span style="margin-left: auto;">${h.playersCount} pupils</span>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- Active Tournament Boards Grid -->
      <div style="margin-bottom: 26px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: #27272a; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #38bdf8;">
              ⚔
            </div>
            <div>
              <h2 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #ffffff; font-weight: 700;">
                Active Tournament Boards (${activeMatches.length} In Play)
              </h2>
              <div style="font-size: 0.78rem; color: #a1a1aa;">
                Tap result directly on the interactive whiteboard when the game concludes!
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            ${
              idlePupils.length >= 2
                ? `
              <button onclick="window.checkAndAutoPairFreePupils()" style="background: #0284c7; color: #ffffff; border: 1px solid #38bdf8; font-weight: 800; font-size: 0.78rem; padding: 6px 14px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                <span>⚡</span> Pair Free Pupils Now (${idlePupils.length})
              </button>
            `
                : ''
            }
          </div>
        </div>

        ${
          activeMatches.length > 0
            ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;">
            ${activeMatches
              .map((m) => {
                const h1 = HOUSES[m.p1.house] || { name: m.p1.house, color: '#dc2626' };
                const h2 = HOUSES[m.p2.house] || { name: m.p2.house, color: '#2563eb' };
                return `
                <div style="background: #18181b; border: 2px solid #27272a; border-radius: 12px; padding: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); display: flex; flex-direction: column; justify-content: space-between;">
                  
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid #27272a; padding-bottom: 10px;">
                      <span style="background: #27272a; color: #38bdf8; border: 1px solid #0369a1; font-family: monospace; font-size: 0.75rem; font-weight: 800; padding: 3px 8px; border-radius: 4px;">
                        BOARD ${m.boardNum}
                      </span>
                      <span style="font-size: 0.74rem; color: #a1a1aa; font-family: monospace;">
                        ${m.badge} · ${m.title}
                      </span>
                    </div>

                    <!-- Players Row -->
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 16px;">
                      
                      <!-- White Player -->
                      <div style="background: #27272a; border: 1px solid #3f3f46; border-radius: 8px; padding: 10px 12px;">
                        <div style="font-size: 0.68rem; color: #a1a1aa; font-family: monospace; text-transform: uppercase;">♔ White</div>
                        <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${m.p1.name}
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                          <span style="background: ${h1.color || '#444'}; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 1px 6px; border-radius: 3px;">
                            ${h1.name}
                          </span>
                          <span style="font-size: 0.72rem; color: #d4d4d8; font-family: monospace;">${m.p1.rating || 1000}</span>
                        </div>
                      </div>

                      <div style="font-size: 0.85rem; font-weight: 900; color: #71717a; font-family: monospace;">
                        VS
                      </div>

                      <!-- Black Player -->
                      <div style="background: #27272a; border: 1px solid #3f3f46; border-radius: 8px; padding: 10px 12px; text-align: right;">
                        <div style="font-size: 0.68rem; color: #a1a1aa; font-family: monospace; text-transform: uppercase;">♚ Black</div>
                        <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${m.p2.name}
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px; justify-content: flex-end;">
                          <span style="font-size: 0.72rem; color: #d4d4d8; font-family: monospace;">${m.p2.rating || 1000}</span>
                          <span style="background: ${h2.color || '#444'}; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 1px 6px; border-radius: 3px;">
                            ${h2.name}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <!-- Touch-Friendly Result Action Buttons -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 6px;">
                    <button onclick="window.recordBoardResult('${m.type}', ${m.rIdx}, ${m.mIdx}, '${m.p1.id}', '${m.id}')"
                            style="background: #ffffff; color: #18181b; border: 2px solid #e4e4e7; border-radius: 8px; padding: 10px 6px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: all 0.15s;"
                            onmouseover="this.style.background='#f4f4f5';this.style.borderColor='#d4af37'"
                            onmouseout="this.style.background='#ffffff';this.style.borderColor='#e4e4e7'"
                            title="White wins (+3 House pts)">
                      <span style="font-size: 1.1rem; line-height: 1;">♔</span>
                      <span>White Win</span>
                      <span style="font-size: 0.68rem; color: #16a34a; font-weight: 700;">+3 Pts</span>
                    </button>

                    <button onclick="window.recordBoardResult('${m.type}', ${m.rIdx}, ${m.mIdx}, 'draw', '${m.id}')"
                            style="background: #27272a; color: #fafafa; border: 2px solid #52525b; border-radius: 8px; padding: 10px 6px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: all 0.15s;"
                            onmouseover="this.style.background='#3f3f46';this.style.borderColor='#d4af37'"
                            onmouseout="this.style.background='#27272a';this.style.borderColor='#52525b'"
                            title="Draw: +2 House pts each">
                      <span style="font-size: 1.1rem; line-height: 1;">½</span>
                      <span>Draw</span>
                      <span style="font-size: 0.68rem; color: #facc15; font-weight: 700;">+2 Pts Each</span>
                    </button>

                    <button onclick="window.recordBoardResult('${m.type}', ${m.rIdx}, ${m.mIdx}, '${m.p2.id}', '${m.id}')"
                            style="background: #18181b; color: #ffffff; border: 2px solid #3f3f46; border-radius: 8px; padding: 10px 6px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: all 0.15s;"
                            onmouseover="this.style.background='#27272a';this.style.borderColor='#d4af37'"
                            onmouseout="this.style.background='#18181b';this.style.borderColor='#3f3f46'"
                            title="Black wins (+3 House pts)">
                      <span style="font-size: 1.1rem; line-height: 1;">♚</span>
                      <span>Black Win</span>
                      <span style="font-size: 0.68rem; color: #16a34a; font-weight: 700;">+3 Pts</span>
                    </button>
                  </div>

                </div>
              `;
              })
              .join('')}
          </div>
        `
            : `
          <div style="background: #18181b; border: 2px dashed #3f3f46; border-radius: 12px; padding: 36px 20px; text-align: center; color: #a1a1aa;">
            <div style="font-size: 2.2rem; margin-bottom: 8px; color: #d4af37;">♙</div>
            <h3 style="margin: 0 0 6px 0; color: #fafafa; font-size: 1.25rem;">All Tournament Boards Cleared!</h3>
            <p style="margin: 0 auto 16px auto; max-width: 500px; font-size: 0.88rem; color: #a1a1aa;">
              No active games on the board right now. Check in pupils or start the automated pairing engine to begin rapid games.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button onclick="window.repairFreePupilsCasual()" style="background: #0284c7; color: #ffffff; border: 1px solid #38bdf8; font-weight: 700; font-size: 0.86rem; padding: 9px 18px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                <span>⚡</span> Pair All Free Pupils Now
              </button>
              <button onclick="window.openLogMatchModal()" style="background: #27272a; color: #fafafa; border: 1px solid #52525b; font-weight: 700; font-size: 0.86rem; padding: 9px 18px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                <span>⚔</span> Record Single Game Outcome
              </button>
            </div>
          </div>
        `
        }
      </div>

      <!-- Bottom Split: Free Waiting Queue & Beth Harmon Quick Access -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
        
        <!-- Free Waiting Queue -->
        <div style="background: #18181b; border: 2px solid #27272a; border-radius: 10px; padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 9px; height: 9px; border-radius: 50%; background: #22c55e; display: inline-block;"></span>
              <h3 style="margin: 0; font-size: 1.05rem; color: #fafafa; font-weight: 700;">
                Free Pupils Waiting Queue (${idlePupils.length})
              </h3>
            </div>
            ${
              idlePupils.length >= 2
                ? `
              <button onclick="window.checkAndAutoPairFreePupils()" style="background: #27272a; color: #4ade80; border: 1px solid #166534; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; cursor: pointer;">
                Pair (${Math.floor(idlePupils.length / 2)} games)
              </button>
            `
                : ''
            }
          </div>

          ${
            idlePupils.length > 0
              ? `
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              ${idlePupils
                .map((p) => {
                  const h = HOUSES[p.house] || { name: p.house, color: '#555' };
                  return `
                  <div style="background: #27272a; border: 1px solid #3f3f46; border-radius: 6px; padding: 6px 10px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem;">
                    <span style="background: ${h.color}; width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></span>
                    <strong style="color: #fafafa;">${p.name}</strong>
                    <span style="color: #a1a1aa; font-family: monospace; font-size: 0.72rem;">${p.rating || 1000}</span>
                  </div>
                `;
                })
                .join('')}
            </div>
            <div style="font-size: 0.76rem; color: #a1a1aa; font-style: italic;">
              ⚡ Continuous Play Engine is active. As soon as any match finishes, free pupils are automatically re-paired onto available boards.
            </div>
          `
              : `
            <div style="font-size: 0.84rem; color: #71717a; padding: 12px 0;">
              ✨ Zero idle pupils — every checked-in player currently has an active board!
            </div>
          `
          }
        </div>

        <!-- Beth Harmon Tactical Spotlight -->
        <div style="background: #18181b; border: 2px solid #27272a; border-radius: 10px; padding: 16px 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #d4af37; font-size: 1.1rem;">♟</span>
              <h3 style="margin: 0; font-size: 1.05rem; color: #fafafa; font-weight: 700;">
                The Beth Harmon Ceiling Board
              </h3>
              <span style="background: #27272a; color: #f59e0b; border: 1px solid #78350f; font-size: 0.65rem; font-weight: 800; padding: 1px 6px; border-radius: 3px; font-family: monospace;">
                Movable Pieces
              </span>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 0.82rem; color: #a1a1aa; line-height: 1.45;">
              Finished early? Pupils can solve grandmaster tactical combinations with physical tap-to-move pieces on the interactive ceiling board.
            </p>
          </div>
          <button onclick="window.toggleWhiteboardMode(false); chessState.showStarterPuzzle = true; renderChessHubView();" style="background: #27272a; color: #fafafa; border: 1.5px solid #52525b; font-weight: 700; font-size: 0.82rem; padding: 8px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s;" onmouseover="this.style.borderColor='#d4af37';this.style.color='#d4af37'" onmouseout="this.style.borderColor='#52525b';this.style.color='#fafafa'">
            <span>♟</span> Open Interactive Ceiling Board
          </button>
        </div>

      </div>

    </div>
  `;
}

// 2-Minute Historical Drill Timer Handlers
window.startDrillTimer = function (id) {
  if (!drillTimers[id]) {
    drillTimers[id] = { remaining: 120, interval: null, running: false };
  }

  const timer = drillTimers[id];
  const btn = document.getElementById(`timer-btn-${id}`);
  const display = document.getElementById(`timer-display-${id}`);

  if (timer.running) {
    // Pause timer
    clearInterval(timer.interval);
    timer.running = false;
    if (btn) btn.textContent = 'Resume';
    return;
  }

  timer.running = true;
  if (btn) btn.textContent = 'Pause';

  timer.interval = setInterval(() => {
    timer.remaining--;
    const mins = String(Math.floor(timer.remaining / 60)).padStart(2, '0');
    const secs = String(timer.remaining % 60).padStart(2, '0');
    if (display) display.textContent = `${mins}:${secs}`;

    if (timer.remaining <= 0) {
      clearInterval(timer.interval);
      timer.running = false;
      if (display) display.textContent = 'TIME UP!';
      if (btn) btn.textContent = 'Done';
      alert('⏰ 2 Minutes Up! Pencils down — reveal the tactical solution with your class!');
    }
  }, 1000);
};

window.resetDrillTimer = function (id) {
  if (drillTimers[id]) {
    clearInterval(drillTimers[id].interval);
    drillTimers[id].remaining = 120;
    drillTimers[id].running = false;
  }
  const display = document.getElementById(`timer-display-${id}`);
  const btn = document.getElementById(`timer-btn-${id}`);
  if (display) display.textContent = '02:00';
  if (btn) btn.textContent = 'Start';
};

window.toggleDrillSolution = function (id) {
  const el = document.getElementById(`solution-${id}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

// Modal Handling: Log Match
window.openLogMatchModal = function (
  defaultWhiteId = null,
  defaultBlackId = null,
  boardNum = null,
) {
  if (chessState.players.length < 2) {
    showChessToast('Please register at least 2 pupils before logging matches.', 'warning');
    return;
  }
  const modalCont = document.getElementById('chess-modal-container');
  if (!modalCont) return;

  const checkedInSet = new Set(chessState.checkedInPlayerIds || []);
  const checkedInList = chessState.players.filter((p) => checkedInSet.has(p.id));
  const otherList = chessState.players.filter((p) => !checkedInSet.has(p.id));

  const renderPlayerOpt = (p) =>
    `<option value="${p.id}">${p.name} (Yr ${p.year} • ${HOUSES[p.house]?.name || p.house} • Rtg ${p.rating})</option>`;

  const playerOptionsHtml = `
    ${
      checkedInList.length > 0
        ? `<optgroup label="🟢 Checked-In Today (${checkedInList.length})">
            ${checkedInList.map(renderPlayerOpt).join('')}
           </optgroup>`
        : ''
    }
    <optgroup label="All Enrolled Pupils (${chessState.players.length})">
      ${(checkedInList.length > 0 ? otherList : chessState.players).map(renderPlayerOpt).join('')}
    </optgroup>
  `;

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(28, 25, 23, 0.82); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 16px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #faf7f2; border: 2px solid #44403c; border-radius: 10px; max-width: 520px; width: 100%; padding: 26px; box-shadow: 0 20px 45px rgba(0,0,0,0.4); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #e7e2d7; padding-bottom: 12px;">
          <div>
            <div style="font-family: monospace; font-size: 0.7rem; color: #78716c; text-transform: uppercase; letter-spacing: 0.1em;">Official FIDE Match Scorecard</div>
            <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.45rem; color: #1c1917; font-weight: 700; letter-spacing: 0.02em;">
              Record Match Outcome
            </h2>
          </div>
          <button onclick="window.closeChessModal()" style="background: #e7e2d7; border: none; font-size: 1.2rem; color: #57534e; cursor: pointer; width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">&times;</button>
        </div>

        ${
          boardNum
            ? `
          <div style="background: #f5f2eb; border: 1px solid #d6d3d1; padding: 8px 12px; border-radius: 6px; margin-bottom: 14px; color: #1c1917; font-family: monospace; font-size: 0.82rem; font-weight: 700;">
            TABLE / BOARD ${boardNum} · OFFICIAL SESSION MATCH
          </div>
        `
            : ''
        }

        <form id="chess-match-form" onsubmit="window.handleMatchSubmit(event)">
          
          <div style="background: #f5f2eb; border: 1.5px solid #e7e2d7; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
            <div style="margin-bottom: 12px;">
              <label style="display: block; font-weight: 700; font-size: 0.8rem; color: #44403c; margin-bottom: 4px; font-family: monospace; letter-spacing: 0.05em;">
                ♔ WHITE PIECES:
              </label>
              <select id="match-white-player" required style="width: 100%; padding: 10px 12px; border-radius: 6px; border: 1.5px solid #d6d3d1; font-size: 0.92rem; background: #ffffff; color: #1c1917; font-weight: 600;">
                <option value="">-- Select White Player --</option>
                ${playerOptionsHtml}
              </select>
            </div>

            <div style="text-align: center; margin: -4px 0 8px;">
              <button type="button" onclick="window.swapWhiteAndBlack()" style="background: #e7e2d7; border: 1px solid #d6d3d1; padding: 3px 12px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #44403c; cursor: pointer; font-family: monospace;">
                ⇄ SWAP COLORS
              </button>
            </div>

            <div>
              <label style="display: block; font-weight: 700; font-size: 0.8rem; color: #44403c; margin-bottom: 4px; font-family: monospace; letter-spacing: 0.05em;">
                ♚ BLACK PIECES:
              </label>
              <select id="match-black-player" required style="width: 100%; padding: 10px 12px; border-radius: 6px; border: 1.5px solid #d6d3d1; font-size: 0.92rem; background: #ffffff; color: #1c1917; font-weight: 600;">
                <option value="">-- Select Black Player --</option>
                ${playerOptionsHtml}
              </select>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-weight: 700; font-size: 0.8rem; color: #44403c; margin-bottom: 6px; font-family: monospace; letter-spacing: 0.05em;">
              RESULT / SCORE:
            </label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;" id="result-radio-group">
              <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 6px; border: 1.5px solid #d6d3d1; border-radius: 6px; cursor: pointer; text-align: center; background: #ffffff; color: #1c1917;" class="result-btn-label">
                <input type="radio" name="match_result_radio" value="1-0" checked style="margin-bottom: 4px;" onchange="document.getElementById('match-result').value = '1-0'">
                <span style="font-weight: 800; font-size: 0.88rem; font-family: monospace;">1 – 0</span>
                <span style="font-size: 0.68rem; color: #57534e; font-weight: 600;">White Won (+3/+1)</span>
              </label>
              <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 6px; border: 1.5px solid #d6d3d1; border-radius: 6px; cursor: pointer; text-align: center; background: #ffffff; color: #1c1917;" class="result-btn-label">
                <input type="radio" name="match_result_radio" value="1/2-1/2" style="margin-bottom: 4px;" onchange="document.getElementById('match-result').value = '1/2-1/2'">
                <span style="font-weight: 800; font-size: 0.88rem; font-family: monospace;">½ – ½</span>
                <span style="font-size: 0.68rem; color: #57534e; font-weight: 600;">Draw (+2/+2)</span>
              </label>
              <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 6px; border: 1.5px solid #d6d3d1; border-radius: 6px; cursor: pointer; text-align: center; background: #ffffff; color: #1c1917;" class="result-btn-label">
                <input type="radio" name="match_result_radio" value="0-1" style="margin-bottom: 4px;" onchange="document.getElementById('match-result').value = '0-1'">
                <span style="font-weight: 800; font-size: 0.88rem; font-family: monospace;">0 – 1</span>
                <span style="font-size: 0.68rem; color: #57534e; font-weight: 600;">Black Won (+3/+1)</span>
              </label>
            </div>
            <input type="hidden" id="match-result" value="1-0">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-weight: 700; font-size: 0.8rem; color: #44403c; margin-bottom: 4px; font-family: monospace;">OPENING / NOTES (OPTIONAL):</label>
            <input type="text" id="match-opening" placeholder="e.g. Queen's Gambit, Sicilian Defence, Ruy Lopez" style="width: 100%; box-sizing: border-box; padding: 9px 12px; border-radius: 6px; border: 1.5px solid #d6d3d1; font-size: 0.88rem; background: #ffffff; color: #1c1917;">
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; border-top: 1.5px solid #e7e2d7; padding-top: 14px;">
            <button type="button" onclick="window.closeChessModal()" style="background: #e7e2d7; color: #44403c; border: 1px solid #d6d3d1; padding: 9px 16px; border-radius: 6px; font-weight: 700; font-family: monospace; font-size: 0.8rem; cursor: pointer;">CANCEL</button>
            <button type="submit" style="background: #1c1917; color: #fafaf9; border: 1.5px solid #1c1917; padding: 9px 22px; border-radius: 6px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <span>✓</span> Save Match &amp; House Points
            </button>
          </div>

        </form>

      </div>
    </div>
  `;

  if (defaultWhiteId) {
    const wSelect = document.getElementById('match-white-player');
    if (wSelect) wSelect.value = defaultWhiteId;
  }
  if (defaultBlackId) {
    const bSelect = document.getElementById('match-black-player');
    if (bSelect) bSelect.value = defaultBlackId;
  }
};

window.swapWhiteAndBlack = function () {
  const wSelect = document.getElementById('match-white-player');
  const bSelect = document.getElementById('match-black-player');
  if (wSelect && bSelect) {
    const temp = wSelect.value;
    wSelect.value = bSelect.value;
    bSelect.value = temp;
  }
};

window.prefillMatchModal = function (wId, bId, boardNum = null) {
  window.openLogMatchModal(wId, bId, boardNum);
};

window.closeChessModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (modalCont) modalCont.innerHTML = '';
};

window.handleMatchSubmit = function (e) {
  if (e && e.preventDefault) e.preventDefault();
  const wId = document.getElementById('match-white-player')?.value;
  const bId = document.getElementById('match-black-player')?.value;
  const result = document.getElementById('match-result')?.value;
  const opening = document.getElementById('match-opening')?.value;

  if (!wId || !bId) {
    alert('Please select two players.');
    return;
  }
  if (wId === bId) {
    alert('White and Black must be two different players.');
    return;
  }

  const pWhite = chessState.players.find((p) => p.id === wId);
  const pBlack = chessState.players.find((p) => p.id === bId);

  if (!pWhite || !pBlack) return;

  pWhite.games++;
  pBlack.games++;

  if (result === '1-0') {
    pWhite.won++;
    pBlack.lost++;
    pWhite.rating += 15;
    pBlack.rating = Math.max(800, pBlack.rating - 15);
    if (pWhite.rank > pBlack.rank) {
      const tempRank = pWhite.rank;
      pWhite.rank = pBlack.rank;
      pBlack.rank = tempRank;
    }
  } else if (result === '0-1') {
    pBlack.won++;
    pWhite.lost++;
    pBlack.rating += 15;
    pWhite.rating = Math.max(800, pWhite.rating - 15);
    if (pBlack.rank > pWhite.rank) {
      const tempRank = pBlack.rank;
      pBlack.rank = pWhite.rank;
      pWhite.rank = tempRank;
    }
  } else {
    pWhite.drawn++;
    pBlack.drawn++;
  }

  chessState.players.sort((a, b) => a.rank - b.rank);
  chessState.players.forEach((p, idx) => (p.rank = idx + 1));

  chessState.matches.push({
    id: 'm_' + Date.now(),
    date: 'Thursday Period 6',
    round: 'Period 6 Session',
    white: pWhite.name,
    black: pBlack.name,
    whiteHouse: pWhite.house,
    blackHouse: pBlack.house,
    result: result,
    opening: opening || 'Open Game',
  });

  saveChessState();
  window.closeChessModal();
  renderChessHubView();
  showChessToast(`Saved match: ${pWhite.name} vs ${pBlack.name} (${result})!`, 'success');
  if (chessState.autoRePairEnabled && chessState.sessionActive) {
    setTimeout(() => {
      window.checkAndAutoPairFreePupils();
    }, 120);
  }
};

// Modal Handling: Assembly Slide Exporter (16:9 Presentation)
window.openAssemblySlideModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (!modalCont) return;

  const houseTotals = calculateHouseTotals();
  const sorted = Object.values(houseTotals).sort((a, b) => b.points - a.points);
  const leader = HOUSES[sorted[0].id];

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #ffffff; border-radius: 14px; max-width: 900px; width: 100%; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 10px;">
          <div>
            <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #0f172a;">
              <i class="fa-solid fa-file-powerpoint" style="color: #f59e0b;"></i> Export House Standings Slide (16:9)
            </h2>
            <div style="font-size: 0.8rem; color: #64748b;">Ready to copy or drop straight into Friday morning assembly notices!</div>
          </div>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

        <!-- 16:9 Slide Preview Canvas Wrapper -->
        <div id="slide-preview-card" style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 12px; padding: 28px 32px; color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #3b82f6; box-shadow: 0 8px 24px rgba(0,0,0,0.2); position: relative; overflow: hidden;">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; color: #93c5fd; text-transform: uppercase;">
                MEONCROSS SCHOOL · PERIOD 6 CHESS CLUB
              </div>
              <h1 style="font-family: 'Playfair Display', serif; font-size: 1.9rem; margin: 4px 0 0 0; color: #ffffff; font-weight: 900;">
                Weekly House Championship Standings
              </h1>
            </div>
            <div style="text-align: right;">
              <span style="background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fde047; padding: 4px 10px; border-radius: 14px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
                <i class="fa-solid fa-crown"></i> 1st: ${leader.name} (${sorted[0].points} pts)
              </span>
            </div>
          </div>

          <!-- 4 House Cards -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0;">
            ${sorted
              .map((h, idx) => {
                const house = HOUSES[h.id];
                const is1st = idx === 0;
                return `
                <div style="background: rgba(255, 255, 255, 0.08); border: 1.5px solid ${is1st ? house.color : 'rgba(255, 255, 255, 0.15)'}; border-radius: 8px; padding: 12px; text-align: center;">
                  <div style="font-size: 0.7rem; font-weight: 800; color: ${is1st ? '#fde047' : '#94a3b8'}; text-transform: uppercase;">
                    ${idx === 0 ? '🏆 1st Place' : idx === 1 ? '2nd Place' : idx === 2 ? '3rd Place' : '4th Place'}
                  </div>
                  <div style="font-size: 1.1rem; font-weight: 800; color: #ffffff; margin: 2px 0;">${house.name}</div>
                  <div style="font-size: 2.2rem; font-weight: 900; color: ${house.color}; line-height: 1.1;">${h.points}</div>
                  <div style="font-size: 0.68rem; color: #cbd5e1; text-transform: uppercase; font-weight: 700;">House Points</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 4px;">${h.wins}W · ${h.draws}D · ${h.losses}L</div>
                </div>
              `;
              })
              .join('')}
          </div>

          <!-- Footer Banner -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 8px; font-size: 0.75rem; color: #94a3b8;">
            <span>Every match played earns points: <strong>+3 Win</strong> | <strong>+2 Draw</strong> | <strong>+1 Participation</strong></span>
            <span style="color: #e2e8f0; font-weight: 700;">Thursdays Period 6 · Meoncross History Hub</span>
          </div>

        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px;">
          <button onclick="window.copyAssemblyNoticeText()" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-copy"></i> Copy Notice Text
          </button>
          <button onclick="window.downloadAssemblySlidePNG()" style="background: #2563eb; color: #ffffff; border: none; padding: 9px 18px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-download"></i> Download 16:9 Slide (PNG)
          </button>
        </div>

      </div>
    </div>
  `;
};

window.copyAssemblyNoticeText = function () {
  const houseTotals = calculateHouseTotals();
  const sorted = Object.values(houseTotals).sort((a, b) => b.points - a.points);

  const text = `🏆 MEONCROSS CHESS CLUB — WEEKLY HOUSE STANDINGS (Period 6 Thursdays)
1st Place: ${HOUSES[sorted[0].id].name} — ${sorted[0].points} pts (${sorted[0].wins}W, ${sorted[0].draws}D, ${sorted[0].losses}L)
2nd Place: ${HOUSES[sorted[1].id].name} — ${sorted[1].points} pts (${sorted[1].wins}W, ${sorted[1].draws}D, ${sorted[1].losses}L)
3rd Place: ${HOUSES[sorted[2].id].name} — ${sorted[2].points} pts (${sorted[2].wins}W, ${sorted[2].draws}D, ${sorted[2].losses}L)
4th Place: ${HOUSES[sorted[3].id].name} — ${sorted[3].points} pts (${sorted[3].wins}W, ${sorted[3].draws}D, ${sorted[3].losses}L)

Every game played earns points for your House (+3 for Win, +2 for Draw, +1 for Participation)! See you next Thursday in Period 6!`;

  navigator.clipboard.writeText(text).then(() => {
    alert(
      '📋 Notice text copied to clipboard! Ready to paste into the Friday morning school notices.',
    );
  });
};

window.downloadAssemblySlidePNG = function () {
  const houseTotals = calculateHouseTotals();
  const sorted = Object.values(houseTotals).sort((a, b) => b.points - a.points);
  const leader = HOUSES[sorted[0].id];

  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Border
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, 1860, 1020);

  // Header
  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('MEONCROSS SCHOOL · PERIOD 6 CHESS CLUB', 80, 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Georgia, serif';
  ctx.fillText('Weekly House Championship Standings', 80, 210);

  // Leader Crown Pill
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(`CURRENT LEADER: ${leader.name.toUpperCase()} (${sorted[0].points} PTS)`, 1100, 150);

  // Draw 4 House Boxes
  const boxWidth = 400;
  const boxHeight = 540;
  const startX = 80;
  const gap = 60;
  const startY = 300;

  sorted.forEach((h, i) => {
    const x = startX + i * (boxWidth + gap);
    const house = HOUSES[h.id];

    // Card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.fillRect(x, startY, boxWidth, boxHeight);

    ctx.strokeStyle = i === 0 ? house.color : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = i === 0 ? 6 : 2;
    ctx.strokeRect(x, startY, boxWidth, boxHeight);

    // Rank
    ctx.fillStyle = i === 0 ? '#fde047' : '#94a3b8';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      i === 0 ? '1ST PLACE' : i === 1 ? '2ND PLACE' : i === 2 ? '3RD PLACE' : '4TH PLACE',
      x + boxWidth / 2,
      startY + 60,
    );

    // House Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(house.name, x + boxWidth / 2, startY + 130);

    // Points
    ctx.fillStyle = house.color;
    ctx.font = 'bold 110px sans-serif';
    ctx.fillText(String(h.points), x + boxWidth / 2, startY + 270);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('HOUSE POINTS', x + boxWidth / 2, startY + 330);

    // Stats
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px sans-serif';
    ctx.fillText(`${h.wins}W · ${h.draws}D · ${h.losses}L`, x + boxWidth / 2, startY + 410);

    ctx.font = 'italic 24px sans-serif';
    ctx.fillText(house.ship, x + boxWidth / 2, startY + 470);
  });

  // Footer
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px sans-serif';
  ctx.fillText(
    'Scoring: +3 Win | +2 Draw | +1 Participation · Every game matters for your House!',
    80,
    960,
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText("Mr Lovett's History Hub", 1840, 960);

  // Download Trigger
  const link = document.createElement('a');
  link.download = 'meoncross_chess_house_standings.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

// Modal Handling: Data Vault & Backup Tools
window.openDataVaultModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (!modalCont) return;

  const playerCount = chessState.players.length;
  const matchCount = chessState.matches.length;
  const backup = getBackupInfo();

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #ffffff; border-radius: 14px; max-width: 580px; width: 100%; padding: 26px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 10px;">
          <div>
            <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-vault" style="color: #2563eb;"></i> Data Vault &amp; Club Safety Backup
            </h2>
            <div style="font-size: 0.82rem; color: #64748b;">Guaranteed zero data loss across terms, devices, and browser updates.</div>
          </div>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

        <div style="background: #faf8f5; border: 1.5px solid #d6d3d1; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px; font-size: 0.86rem; color: #1c1917; line-height: 1.45;">
          <strong>🛡️ Multi-Layer Redundancy Active:</strong> All changes are mirrored across <strong>localStorage</strong>, <strong>IndexedDB</strong>, and an immutable <strong>Master Archive</strong>.
        </div>

        <!-- Section: Cross-Device Instant Sync Key -->
        <div style="background: #f5f2eb; border: 1.5px solid #44403c; border-radius: 8px; padding: 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 1.05rem; color: #1c1917;">
              🔑 Cross-Device Instant Sync Key
            </div>
            <span style="font-family: monospace; font-size: 0.7rem; background: #1c1917; color: #fafaf9; padding: 2px 6px; border-radius: 3px;">School ↔ Home ↔ iPad</span>
          </div>
          <p style="margin: 0 0 12px 0; font-size: 0.8rem; color: #57534e; line-height: 1.45;">
            Switching between your school laptop, home laptop, or iPad? Use this key to transfer your entire club roster, ratings, and match history in 2 seconds without accounts or logins.
          </p>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
            <button type="button" onclick="window.copySyncKey()" style="background: #1c1917; color: #fafaf9; border: 1px solid #1c1917; padding: 8px 14px; border-radius: 4px; font-size: 0.78rem; font-weight: 700; font-family: monospace; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <span>📋</span> Copy My Sync Key
            </button>
            <button type="button" onclick="window.copySyncLink()" style="background: #ffffff; color: #1c1917; border: 1.5px solid #44403c; padding: 8px 14px; border-radius: 4px; font-size: 0.78rem; font-weight: 700; font-family: monospace; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <span>🔗</span> Copy 1-Click Sync Link
            </button>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <input type="text" id="vault-sync-key-input" placeholder="Paste Sync Key here on this device (e.g. MEONCROSS-CHESS:...)" style="flex: 1; padding: 8px 10px; border-radius: 4px; border: 1px solid #d6d3d1; font-family: monospace; font-size: 0.78rem; background: #ffffff;">
            <button type="button" onclick="window.applySyncKey()" style="background: #292524; color: #d4af37; border: 1px solid #44403c; padding: 8px 14px; border-radius: 4px; font-weight: 700; font-size: 0.78rem; font-family: monospace; cursor: pointer;">
              ⚡ SYNC NOW
            </button>
          </div>
        </div>

        <!-- 4 Action Cards -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
          
          <!-- Tool 1: Download JSON Backup -->
          <div style="background: #faf8f5; border: 1px solid #d6d3d1; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div>
              <div style="font-weight: 700; color: #1c1917; font-size: 0.92rem; font-family: 'Playfair Display', serif;">
                Download Backup File (.json)
              </div>
              <div style="font-size: 0.76rem; color: #78716c; margin-top: 2px;">
                Saves current cohort (${playerCount} pupils, ${matchCount} matches) to your device.
              </div>
            </div>
            <button onclick="window.downloadChessBackupJSON()" style="background: #1c1917; color: #ffffff; border: none; padding: 7px 14px; border-radius: 4px; font-weight: 700; font-size: 0.78rem; cursor: pointer; flex-shrink: 0; font-family: monospace;">
              DOWNLOAD
            </button>
          </div>

          <!-- Tool 2: Restore from JSON File -->
          <div style="background: #faf8f5; border: 1px solid #d6d3d1; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div>
              <div style="font-weight: 700; color: #1c1917; font-size: 0.92rem; font-family: 'Playfair Display', serif;">
                Restore from Backup File
              </div>
              <div style="font-size: 0.76rem; color: #78716c; margin-top: 2px;">
                Upload any previously downloaded .json backup file to restore in 1 second.
              </div>
            </div>
            <label style="background: #ffffff; color: #1c1917; border: 1px solid #44403c; padding: 7px 14px; border-radius: 4px; font-weight: 700; font-size: 0.78rem; cursor: pointer; flex-shrink: 0; font-family: monospace;">
              UPLOAD FILE
              <input type="file" accept=".json" onchange="window.handleRestoreBackupFile(event)" style="display: none;">
            </label>
          </div>

          <!-- Tool 3: Copy Code for Permanent Git Bake-In -->
          <div style="background: #faf8f5; border: 1px solid #d6d3d1; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div>
              <div style="font-weight: 700; color: #1c1917; font-size: 0.92rem; font-family: 'Playfair Display', serif;">
                Copy Roster Code for Git
              </div>
              <div style="font-size: 0.76rem; color: #78716c; margin-top: 2px;">
                Copies code to clipboard so you can send it to me to bake into Git forever.
              </div>
            </div>
            <button onclick="window.copyRosterCodeToClipboard()" style="background: #292524; color: #fafaf9; border: 1px solid #44403c; padding: 7px 14px; border-radius: 4px; font-weight: 700; font-size: 0.78rem; cursor: pointer; flex-shrink: 0; font-family: monospace;">
              COPY CODE
            </button>
          </div>

          <!-- Tool 4: Printable Paper Scoresheet -->
          <div style="background: #faf8f5; border: 1px solid #d6d3d1; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div>
              <div style="font-weight: 700; color: #1c1917; font-size: 0.92rem; font-family: 'Playfair Display', serif;">
                Printable Weekly Scoresheet (A4)
              </div>
              <div style="font-size: 0.76rem; color: #78716c; margin-top: 2px;">
                Print a physical paper roster and score logging grid for your classroom clipboard.
              </div>
            </div>
            <button onclick="window.printWeeklyChessSheet()" style="background: #57534e; color: #ffffff; border: none; padding: 7px 14px; border-radius: 4px; font-weight: 700; font-size: 0.78rem; cursor: pointer; flex-shrink: 0; font-family: monospace;">
              PRINT A4
            </button>
          </div>

        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1.5px solid #e7e2d7; padding-top: 14px;">
          <button type="button" onclick="window.closeChessModal()" style="background: #e7e2d7; color: #1c1917; border: 1px solid #d6d3d1; padding: 8px 18px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 0.8rem; cursor: pointer;">CLOSE</button>
        </div>

      </div>
    </div>
  `;
};

// Cross-Device Instant Sync Key Tools
window.copySyncKey = function () {
  const exportPayload = {
    v: 5,
    t: Date.now(),
    players: chessState.players,
    matches: chessState.matches,
    checkedInPlayerIds: chessState.checkedInPlayerIds,
    knockoutBracket: chessState.knockoutBracket,
  };
  try {
    const jsonStr = JSON.stringify(exportPayload);
    const b64 = btoa(encodeURIComponent(jsonStr));
    const syncKey = `MEONCROSS-CHESS:${b64}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(syncKey)
        .then(() => {
          showChessToast(
            '🔑 Sync Key copied! Paste it in the Sync box on your other laptop or iPad.',
            'success',
          );
        })
        .catch(() => {
          prompt('Copy your Sync Key below:', syncKey);
        });
    } else {
      prompt('Copy your Sync Key below:', syncKey);
    }
  } catch (err) {
    console.error('Failed to generate Sync Key:', err);
    showChessToast('Failed to generate Sync Key.', 'error');
  }
};

window.copySyncLink = function () {
  const exportPayload = {
    v: 5,
    t: Date.now(),
    players: chessState.players,
    matches: chessState.matches,
    checkedInPlayerIds: chessState.checkedInPlayerIds,
    knockoutBracket: chessState.knockoutBracket,
  };
  try {
    const jsonStr = JSON.stringify(exportPayload);
    const b64 = btoa(encodeURIComponent(jsonStr));
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const syncUrl = `${origin}${pathname}?chess_sync=${b64}#chess`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(syncUrl)
        .then(() => {
          showChessToast(
            '🔗 1-Click Sync Link copied! Open this link on your other device to sync instantly.',
            'success',
          );
        })
        .catch(() => {
          prompt('Copy your 1-Click Sync Link below:', syncUrl);
        });
    } else {
      prompt('Copy your 1-Click Sync Link below:', syncUrl);
    }
  } catch (err) {
    console.error('Failed to generate 1-Click Sync Link:', err);
    showChessToast('Failed to generate 1-Click Sync Link.', 'error');
  }
};

window.applySyncKey = function () {
  const input = document.getElementById('vault-sync-key-input');
  if (!input || !input.value.trim()) {
    showChessToast('Please paste a valid Sync Key into the box first.', 'warning');
    return;
  }
  let raw = input.value.trim();
  if (raw.startsWith('MEONCROSS-CHESS:')) {
    raw = raw.replace('MEONCROSS-CHESS:', '');
  }
  try {
    const jsonStr = decodeURIComponent(atob(raw));
    const syncData = JSON.parse(jsonStr);
    if (!Array.isArray(syncData.players)) {
      showChessToast('Invalid Sync Key: missing player records.', 'error');
      return;
    }
    chessState.players = syncData.players;
    chessState.matches = Array.isArray(syncData.matches) ? syncData.matches : [];
    chessState.checkedInPlayerIds = Array.isArray(syncData.checkedInPlayerIds)
      ? syncData.checkedInPlayerIds
      : [];
    chessState.knockoutBracket = syncData.knockoutBracket || null;
    saveChessState(true);
    window.closeChessModal();
    renderChessHubView();
    showChessToast(
      `🎉 Successfully synchronized ${chessState.players.length} pupils and ${chessState.matches.length} matches!`,
      'success',
    );
  } catch (err) {
    console.error('Failed to apply Sync Key:', err);
    showChessToast(
      'Failed to apply Sync Key. Please check that you copied the complete key.',
      'error',
    );
  }
};

window.downloadChessBackupJSON = function () {
  const backup = {
    app: 'Meoncross Chess Club',
    exportedAt: new Date().toISOString(),
    playerCount: chessState.players.length,
    matchCount: chessState.matches.length,
    state: {
      players: chessState.players,
      matches: chessState.matches,
      checkedInPlayerIds: chessState.checkedInPlayerIds,
      knockoutBracket: chessState.knockoutBracket,
    },
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  a.href = url;
  a.download = `meoncross_chess_backup_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showChessToast('💾 Backup file downloaded successfully!', 'success');
};

window.handleRestoreBackupFile = function (e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const data = JSON.parse(evt.target.result);
      const incomingState = data.state || data;
      if (!Array.isArray(incomingState.players)) {
        showChessToast('Invalid backup file: missing players array.', 'error');
        return;
      }
      chessState.players = incomingState.players;
      chessState.matches = Array.isArray(incomingState.matches) ? incomingState.matches : [];
      chessState.checkedInPlayerIds = Array.isArray(incomingState.checkedInPlayerIds)
        ? incomingState.checkedInPlayerIds
        : [];
      chessState.knockoutBracket = incomingState.knockoutBracket || null;
      saveChessState();
      window.closeChessModal();
      renderChessHubView();
      showChessToast(
        `🎉 Restored ${chessState.players.length} pupils and ${chessState.matches.length} matches!`,
        'success',
      );
    } catch (err) {
      console.error('Failed to parse backup JSON:', err);
      showChessToast('Failed to parse backup file.', 'error');
    }
  };
  reader.readAsText(file);
};

window.copyRosterCodeToClipboard = function () {
  if (chessState.players.length === 0) {
    showChessToast('No pupils to copy yet. Register your pupils first.', 'warning');
    return;
  }
  const cleanPlayers = chessState.players.map((p) => ({
    id: p.id,
    name: p.name,
    year: p.year,
    house: p.house,
    rating: p.rating || 1000,
    games: p.games || 0,
    won: p.won || 0,
    drawn: p.drawn || 0,
    lost: p.lost || 0,
    rank: p.rank || 1,
  }));
  const code = `export const INITIAL_PLAYERS = ${JSON.stringify(cleanPlayers, null, 2)};\n`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        showChessToast(
          '📋 Roster code copied! Send it to the developer to bake into Git.',
          'success',
        );
      })
      .catch(() => {
        prompt('Copy the roster code below:', code);
      });
  } else {
    prompt('Copy the roster code below:', code);
  }
};

window.printWeeklyChessSheet = function () {
  const sorted = [...chessState.players].sort((a, b) => a.rank - b.rank);
  const houseTotals = calculateHouseTotals();
  const sortedHouses = Object.values(houseTotals).sort((a, b) => b.points - a.points);

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to view the printable sheet.');
    return;
  }

  const d = new Date();
  const dateFormatted = d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let rowsHtml = sorted
    .map(
      (p) => `
    <tr>
      <td style="text-align: center; font-weight: bold;">${p.rank}</td>
      <td style="font-weight: 600;">${p.name}</td>
      <td style="text-align: center;">Year ${p.year}</td>
      <td style="text-align: center; text-transform: uppercase; font-size: 11px; font-weight: bold; color: ${HOUSES[p.house]?.color || '#333'};">${HOUSES[p.house]?.name || p.house}</td>
      <td style="text-align: center; width: 60px;">[ &nbsp; ]</td>
      <td style="text-align: center;">${p.games}</td>
      <td style="text-align: center;">${p.won}W / ${p.drawn}D / ${p.lost}L</td>
      <td style="text-align: center; font-weight: bold;">${p.won * 3 + p.drawn * 2 + p.lost * 1} pts</td>
      <td style="width: 140px; border-bottom: 1px solid #ccc;">&nbsp;</td>
    </tr>
  `,
    )
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Meoncross Chess Club - Period 6 Roster (${dateFormatted})</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 24px; color: #1e293b; }
        h1 { margin: 0 0 4px 0; font-size: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
        .meta { font-size: 12px; color: #64748b; margin-bottom: 16px; display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 8px; }
        .standings { display: flex; gap: 12px; margin-bottom: 16px; }
        .house-box { flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; text-align: center; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; }
        th { background: #f1f5f9; font-weight: 700; text-transform: uppercase; font-size: 10px; }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Meoncross School · Period 6 Chess Club</h1>
        <button onclick="window.print()" style="padding: 6px 14px; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Print Sheet</button>
      </div>
      <div class="meta">
        <span>Session Date: <strong>${dateFormatted} (Thursday Period 6)</strong></span>
        <span>Scoring: <strong>Win = +3 pts | Draw = +2 pts | Loss/Playing = +1 pt</strong></span>
      </div>

      <div class="standings">
        ${sortedHouses
          .map(
            (h) => `
          <div class="house-box">
            <div style="font-size: 10px; font-weight: bold; color: ${HOUSES[h.id].color}; text-transform: uppercase;">${HOUSES[h.id].name}</div>
            <div style="font-size: 16px; font-weight: bold;">${h.points} pts</div>
            <div style="font-size: 10px; color: #64748b;">${h.wins}W · ${h.draws}D · ${h.losses}L</div>
          </div>
        `,
          )
          .join('')}
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 35px;">Rank</th>
            <th>Pupil Name</th>
            <th style="width: 70px;">Year</th>
            <th style="width: 90px;">House</th>
            <th>Present</th>
            <th style="width: 50px;">Played</th>
            <th style="width: 90px;">Record</th>
            <th style="width: 70px;">Points</th>
            <th>Today's Result / Notes</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="9" style="text-align: center; padding: 20px;">No registered pupils yet.</td></tr>'}
        </tbody>
      </table>
    </body>
    </html>
  `);
  printWindow.document.close();
};

window.printFidePairingSheet = function () {
  let pairings = chessState.activePairings;

  // If no pairings generated yet, build them on the fly
  if (!pairings || pairings.length === 0) {
    const presentIds = chessState.checkedInPlayerIds;
    let pool = chessState.players
      .filter((p) => (presentIds.length > 0 ? presentIds.includes(p.id) : true))
      .sort((a, b) => b.rating - a.rating);

    if (pool.length < 2) {
      showChessToast(
        'Please register or check in at least 2 pupils to generate a FIDE pairing sheet.',
        'warning',
      );
      return;
    }

    pairings = [];
    const tempPool = [...pool];
    while (tempPool.length >= 2) {
      const white = tempPool.shift();
      let bestOpponentIdx = 0;
      for (let i = 0; i < tempPool.length; i++) {
        if (tempPool[i].house !== white.house) {
          bestOpponentIdx = i;
          break;
        }
      }
      const black = tempPool.splice(bestOpponentIdx, 1)[0];
      pairings.push({
        board: pairings.length + 1,
        white,
        black,
      });
    }
    if (tempPool.length === 1) {
      pairings.push({
        board: pairings.length + 1,
        white: tempPool[0],
        black: null,
        isBye: true,
      });
    }
    chessState.activePairings = pairings;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to view the printable sheet.');
    return;
  }

  const d = new Date();
  const dateFormatted = d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const houseTotals = calculateHouseTotals();
  const sortedHouses = Object.values(houseTotals).sort((a, b) => b.points - a.points);
  const totalPlayersCount = pairings.reduce((acc, p) => acc + (p.isBye ? 1 : 2), 0);

  const rowsHtml = pairings
    .map((p) => {
      if (p.isBye) {
        return `
        <tr style="background: #f8fafc;">
          <td style="text-align: center; font-weight: 900; font-size: 13px;">Board ${p.board}</td>
          <td style="font-weight: 700; font-size: 13px; color: #0f172a;">
            ♔ ${p.white.name} <span style="font-size: 11px; color: #64748b;">(Y${p.white.year})</span>
            <div style="font-size: 10px; color: ${HOUSES[p.white.house]?.color || '#333'}; font-weight: 800; text-transform: uppercase;">
              ${HOUSES[p.white.house]?.name || p.white.house} · ELO ${p.white.rating}
            </div>
          </td>
          <td style="text-align: center; font-weight: 800; font-size: 13px; background: #e2e8f0; width: 45px;">BYE</td>
          <td style="text-align: center; font-weight: 700; font-size: 11px; color: #94a3b8; width: 30px;">—</td>
          <td style="text-align: center; font-weight: 700; font-size: 11px; color: #94a3b8; width: 45px;">—</td>
          <td style="font-size: 12px; color: #64748b; font-style: italic;">Assigned Practice Bye (+1 Pt)</td>
          <td style="text-align: center; font-size: 11px; color: #94a3b8;">N/A</td>
        </tr>
      `;
      }

      const wH = HOUSES[p.white.house];
      const bH = HOUSES[p.black.house];

      return `
      <tr>
        <td style="text-align: center; font-weight: 900; font-size: 14px; background: #fafafa;">
          Board ${p.board}
        </td>
        <td>
          <div style="font-weight: 700; font-size: 13px; color: #0f172a;">
            ♔ ${p.white.name} <span style="font-size: 11px; font-weight: 600; color: #64748b;">(Y${p.white.year})</span>
          </div>
          <div style="font-size: 10px; font-weight: 800; color: ${wH?.color || '#333'}; text-transform: uppercase;">
            ${wH?.name || p.white.house} House · ELO ${p.white.rating}
          </div>
        </td>
        <td style="text-align: center; width: 55px; height: 38px; border: 1.5px solid #0f172a; font-size: 14px; font-weight: 800;">
          &nbsp;
        </td>
        <td style="text-align: center; font-weight: 800; font-size: 11px; color: #64748b; width: 30px;">
          VS
        </td>
        <td style="text-align: center; width: 55px; height: 38px; border: 1.5px solid #0f172a; font-size: 14px; font-weight: 800;">
          &nbsp;
        </td>
        <td>
          <div style="font-weight: 700; font-size: 13px; color: #0f172a;">
            ♚ ${p.black.name} <span style="font-size: 11px; font-weight: 600; color: #64748b;">(Y${p.black.year})</span>
          </div>
          <div style="font-size: 10px; font-weight: 800; color: ${bH?.color || '#333'}; text-transform: uppercase;">
            ${bH?.name || p.black.house} House · ELO ${p.black.rating}
          </div>
        </td>
        <td style="width: 170px; font-size: 10px; color: #94a3b8; vertical-align: bottom; padding-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #94a3b8; height: 18px; margin-bottom: 3px;">
            <span style="font-size: 9px; font-weight: bold; color: #475569;">W:</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #94a3b8; height: 18px;">
            <span style="font-size: 9px; font-weight: bold; color: #475569;">B:</span>
          </div>
        </td>
      </tr>
    `;
    })
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Meoncross Chess Club - FIDE Round Pairing Sheet (${dateFormatted})</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        * { box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          margin: 0;
          padding: 10px;
          color: #0f172a;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2.5px solid #0f172a;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        h1 {
          margin: 0;
          font-size: 19px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 900;
        }
        .subtitle {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 8px 12px;
          margin-bottom: 12px;
          font-size: 11px;
        }
        .meta-item strong {
          display: block;
          font-size: 9px;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 1px;
        }
        .house-strip {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .house-badge {
          flex: 1;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 4px 6px;
          text-align: center;
          font-size: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #94a3b8;
          padding: 6px 8px;
        }
        th {
          background: #f1f5f9;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.03em;
        }
        .instructions {
          margin-top: 12px;
          border-top: 1.5px solid #0f172a;
          padding-top: 8px;
          font-size: 10px;
          color: #475569;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .signoff-box {
          border: 1px solid #94a3b8;
          border-radius: 4px;
          padding: 6px 12px;
          width: 250px;
          background: #fafafa;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px 14px; border-radius: 6px;">
        <div>
          <strong style="color: #1e40af;">FIDE Pairing Sheet Preview</strong>
          <div style="font-size: 12px; color: #3b82f6;">Ready for A4 printout or pinning to the classroom whiteboard.</div>
        </div>
        <button onclick="window.print()" style="background: #2563eb; color: #ffffff; border: none; font-weight: bold; font-size: 13px; padding: 8px 18px; border-radius: 4px; cursor: pointer;">
          🖨 Print A4 Sheet
        </button>
      </div>

      <div class="header">
        <div>
          <h1>Meoncross School Chess Club</h1>
          <div class="subtitle">Official FIDE-Style Round Pairing &amp; Results Sheet</div>
        </div>
        <div style="text-align: right; font-size: 11px; font-weight: 700; color: #334155;">
          <div>Session: Period 6 (15:30 - 16:30)</div>
          <div style="color: #64748b;">${dateFormatted}</div>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <strong>Event / Time Control</strong>
          15-Min Rapid · Swiss Ladder
        </div>
        <div class="meta-item">
          <strong>Scoring Standard</strong>
          Win = 1 (3 pts) · Draw = ½ (2 pts) · Loss = 0 (1 pt)
        </div>
        <div class="meta-item">
          <strong>Active Boards</strong>
          ${pairings.filter((p) => !p.isBye).length} Boards (${totalPlayersCount} Players)
        </div>
        <div class="meta-item">
          <strong>Chief Arbiter</strong>
          Teacher in Charge
        </div>
      </div>

      <div class="house-strip">
        ${sortedHouses
          .map(
            (h) => `
          <div class="house-badge">
            <strong style="color: ${HOUSES[h.id]?.color || '#333'}; text-transform: uppercase;">${HOUSES[h.id]?.name || h.id}</strong>
            <span style="font-weight: 800; margin-left: 4px;">${h.points} pts</span>
            <span style="color: #64748b; font-size: 9px; margin-left: 2px;">(${h.wins}W / ${h.draws}D / ${h.losses}L)</span>
          </div>
        `,
          )
          .join('')}
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 70px; text-align: center;">Board</th>
            <th>White Player (♔)</th>
            <th style="width: 55px; text-align: center;">White</th>
            <th style="width: 30px; text-align: center;">vs</th>
            <th style="width: 55px; text-align: center;">Black</th>
            <th>Black Player (♚)</th>
            <th style="width: 170px;">Pupil Signatures</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="instructions">
        <div style="max-width: 520px; line-height: 1.4;">
          <strong>Instructions for Players:</strong><br>
          1. Check your board number and locate your assigned chessboard in the room.<br>
          2. White moves first. Shake hands before beginning the clock or timer.<br>
          3. When your game concludes, agree on the result (1-0, 0-1, or ½-½), enter the scores in the boxes above, sign your name, and report the result to the Arbiter.
        </div>
        <div class="signoff-box">
          <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; margin-bottom: 12px; color: #475569;">Arbiter Verification &amp; Sign-Off</div>
          <div style="font-size: 9px; color: #64748b; margin-top: 14px; border-top: 1px solid #cbd5e1; padding-top: 2px;">
            Teacher Signature / Date
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Modal Handling: Register Pupil
window.openAddPlayerModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (!modalCont) return;

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #ffffff; border-radius: 14px; max-width: 460px; width: 100%; padding: 26px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 12px;">
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #0f172a;">
            <i class="fa-solid fa-user-plus" style="color: #10b981;"></i> Register New Chess Player
          </h2>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

        <form onsubmit="window.handleAddPlayerSubmit(event)">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">Pupil Full Name:</label>
            <input type="text" id="new-player-name" required placeholder="e.g. Leo B." style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;" onblur="if(this.value && window.sanitizePupilName) this.value = window.sanitizePupilName(this.value);">
            <div style="font-size: 0.74rem; color: #64748b; margin-top: 5px; display: flex; align-items: center; gap: 5px; line-height: 1.3;">
              <i class="fa-solid fa-shield-halved" style="color: #6366f1;"></i>
              <span><strong>School Privacy:</strong> Please use <strong>First Name + Last Initial</strong> (e.g. <em>Leo B.</em>). Full surnames are auto-sanitised.</span>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">Year Group:</label>
            <select id="new-player-year" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
              <option value="7">Year 7 (KS3)</option>
              <option value="8">Year 8 (KS3)</option>
              <option value="9">Year 9 (KS3)</option>
              <option value="10">Year 10 (GCSE / KS4)</option>
              <option value="11">Year 11 (GCSE / KS4)</option>
            </select>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">School House:</label>
            <select id="new-player-house" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
              <option value="victory">Victory (Blue)</option>
              <option value="warrior">Warrior (Red)</option>
              <option value="dreadnought">Dreadnought (Green)</option>
              <option value="invincible">Invincible (Yellow)</option>
            </select>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
            <button type="button" onclick="window.closeChessModal()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 6px; font-weight: 700; cursor: pointer;">Cancel</button>
            <button type="submit" style="background: #10b981; color: #ffffff; border: none; padding: 9px 20px; border-radius: 6px; font-weight: 700; cursor: pointer;">Add to Ladder</button>
          </div>
        </form>

      </div>
    </div>
  `;
};

window.handleAddPlayerSubmit = function (e) {
  if (e && e.preventDefault) e.preventDefault();
  const rawName = document.getElementById('new-player-name')?.value.trim();
  const name = sanitizePupilName(rawName);
  const year = parseInt(document.getElementById('new-player-year')?.value, 10);
  const house = document.getElementById('new-player-house')?.value;

  if (!name) return;

  const newId = 'p_' + Date.now();
  const newRank = chessState.players.length + 1;
  chessState.players.push({
    id: newId,
    name: name,
    year: year,
    house: house,
    rating: 1000,
    games: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    rank: newRank,
  });

  chessState.checkedInPlayerIds.push(newId);
  saveChessState();
  window.closeChessModal();
  renderChessHubView();
  showChessToast(
    `🎉 Added & checked in ${name} for House ${HOUSES[house]?.name || house}!`,
    'success',
  );
};

window.quickChallengePlayer = function (targetId) {
  window.openLogMatchModal();
  setTimeout(() => {
    const bSelect = document.getElementById('match-black-player');
    if (bSelect) bSelect.value = targetId;
  }, 50);
};
