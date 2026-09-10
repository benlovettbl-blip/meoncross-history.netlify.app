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
} from './chess_data.js';

const STORAGE_KEY = 'meoncross_chess_club_v5';
const BACKUP_KEY = 'meoncross_chess_backup_snapshot';

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

// Clear legacy dummy cache if present
try {
  localStorage.removeItem('meoncross_chess_club_v1');
  localStorage.removeItem('meoncross_chess_club_v2');
  localStorage.removeItem('meoncross_chess_club_v3');
  localStorage.removeItem('meoncross_chess_club_v4');
} catch (e) {}

// State container
let chessState = {
  players: [],
  matches: [],
  checkedInPlayerIds: [],
  knockoutBracket: null,
  activeTab: 'signin', // 'signin' | 'ladder' | 'table' | 'pairings' | 'knockout' | 'drills' | 'matches'
  filterYear: 'all', // 'all' | 'ks3' | 'ks4'
  filterHouse: 'all', // 'all' | houseId
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

// Initialize State from localStorage or clean seed
function initChessState(forceClean = false) {
  if (forceClean) {
    chessState.players = [];
    chessState.matches = [];
    chessState.checkedInPlayerIds = [];
    chessState.knockoutBracket = null;
    chessState.activeTab = 'signin';
    saveChessState();
    return;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      chessState.players = Array.isArray(parsed.players) ? parsed.players : [];
      chessState.matches = Array.isArray(parsed.matches) ? parsed.matches : [];
      chessState.checkedInPlayerIds = Array.isArray(parsed.checkedInPlayerIds)
        ? parsed.checkedInPlayerIds
        : [];
      chessState.knockoutBracket = parsed.knockoutBracket || null;
    } else {
      chessState.players = [];
      chessState.matches = [];
      chessState.checkedInPlayerIds = [];
      chessState.knockoutBracket = null;
      chessState.activeTab = 'signin';
      saveChessState();
    }
  } catch (e) {
    console.error('Error loading chess state:', e);
    chessState.players = [];
    chessState.matches = [];
    chessState.checkedInPlayerIds = [];
    chessState.knockoutBracket = null;
  }
}

function saveChessState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        players: chessState.players,
        matches: chessState.matches,
        checkedInPlayerIds: chessState.checkedInPlayerIds,
        knockoutBracket: chessState.knockoutBracket,
      }),
    );
  } catch (e) {
    console.error('Error saving chess state:', e);
  }
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
    } else if (m.result === '1/2-1/2') {
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
      
      <!-- Top Hero Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-radius: 16px; padding: 24px 22px; color: #ffffff; margin-bottom: 22px; box-shadow: 0 8px 24px rgba(30, 27, 75, 0.25); position: relative; overflow: hidden; border: 1.5px solid rgba(139, 92, 246, 0.3);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; position: relative; z-index: 2;">
          <div style="max-width: 680px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168, 85, 247, 0.2); border: 1px solid rgba(168, 85, 247, 0.4); padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: #c084fc; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
              <i class="fa-solid fa-clock"></i> Period 6 Thursdays · Meoncross Co-Curricular Club
            </div>
            <h1 style="font-family: 'Playfair Display', serif; font-size: 1.95rem; margin: 0 0 6px 0; color: #ffffff; font-weight: 800; line-height: 1.2;">
              Meoncross Chess Club &amp; House League
            </h1>
            <p style="margin: 0; font-size: 0.92rem; color: #cbd5e1; line-height: 1.5;">
              Compete on the master ladder, generate instant tournament pairings, and score vital <strong>House Points</strong> for <strong>Warrior</strong>, <strong>Dreadnought</strong>, <strong>Victory</strong>, and <strong>Invincible</strong>. Every game completed earns points for your House!
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end;">
              <button onclick="window.switchChessTab('signin')" style="background: #10b981; color: #ffffff; border: none; font-weight: 700; font-size: 0.88rem; padding: 9px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.35); transition: all 0.15s;">
                <i class="fa-solid fa-clipboard-user"></i> Pupil Sign-In (${chessState.checkedInPlayerIds.length})
              </button>
              <button onclick="window.openLogMatchModal()" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.88rem; padding: 9px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.35); transition: all 0.15s;">
                <i class="fa-solid fa-plus-circle"></i> Log Match
              </button>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end;">
              <button onclick="window.openAssemblySlideModal()" style="background: rgba(245, 158, 11, 0.2); color: #fde047; border: 1.5px solid rgba(245, 158, 11, 0.5); font-weight: 700; font-size: 0.8rem; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-file-powerpoint"></i> Assembly Slide
              </button>
              <button onclick="window.openBoardQRStandsModal()" style="background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); font-weight: 600; font-size: 0.8rem; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-qrcode" style="color: #38bdf8;"></i> Board QR Stands
              </button>
              ${
                chessState.players.length === 0 && getBackupInfo()
                  ? `
                <button onclick="window.restoreChessBackup()" style="background: rgba(59, 130, 246, 0.25); color: #93c5fd; border: 1.5px solid rgba(59, 130, 246, 0.6); font-weight: 700; font-size: 0.78rem; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" title="Undo reset & restore previous cohort">
                  <i class="fa-solid fa-arrow-rotate-left"></i> Restore Cohort (${getBackupInfo().playerCount})
                </button>
              `
                  : ''
              }
              ${
                chessState.players.length > 0
                  ? `
                <button onclick="window.resetClubDataToCleanSlate()" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); font-weight: 600; font-size: 0.78rem; padding: 6px 10px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="Reset all pupils and points (Emergency backup preserved)">
                  <i class="fa-solid fa-rotate-left"></i> Reset Slate
                </button>
              `
                  : ''
              }
            </div>
          </div>
        </div>

        <!-- House Points Scoring Rule Banner -->
        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.82rem; color: #e2e8f0; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #10b981; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.72rem;">+${SCORING_RULES.WIN}</span>
            <span>Win</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #3b82f6; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.72rem;">+${SCORING_RULES.DRAW}</span>
            <span>Draw</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #64748b; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.72rem;">+${SCORING_RULES.PARTICIPATION}</span>
            <span>Participation</span>
          </div>
          <div style="margin-left: auto; font-style: italic; color: #fde047;">
            <i class="fa-solid fa-crown" style="margin-right: 4px;"></i> Current Leader: <strong>${leadingHouse.name}</strong> (${sortedHouses[0].points} pts)
          </div>
        </div>
      </div>

      <!-- House Championship Podium Grid (Fully Responsive) -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px; background: #ffffff; padding: 6px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <i class="fa-solid fa-shield-halved" style="color: #1e3a8a;"></i> House Championship Standings
          </h2>
          <span style="font-size: 0.82rem; color: #475569; font-weight: 700; background: #ffffff; padding: 6px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">Total Games Logged: ${chessState.matches.length}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; width: 100%; box-sizing: border-box;">
          ${sortedHouses
            .map((hStats, index) => {
              const houseInfo = HOUSES[hStats.id];
              const isFirst = index === 0 && hStats.points > 0;
              return `
              <div class="chess-house-card" style="background: #ffffff; border: 1.5px solid ${isFirst ? houseInfo.color : '#e2e8f0'}; border-radius: 12px; padding: 16px 18px; box-shadow: 0 ${isFirst ? '6px 18px rgba(0,0,0,0.06)' : '2px 6px rgba(0,0,0,0.02)'}; position: relative; overflow: hidden;">
                ${isFirst ? `<div style="position: absolute; top: 0; right: 0; background: ${houseInfo.color}; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 3px 8px; border-bottom-left-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em;"><i class="fa-solid fa-trophy"></i> 1st</div>` : ''}
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: ${houseInfo.bgLight}; border: 1.5px solid ${houseInfo.borderColor}; color: ${houseInfo.color}; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                    <i class="fa-solid ${houseInfo.icon}"></i>
                  </div>
                  <div>
                    <h3 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700;">${houseInfo.name}</h3>
                    <div style="font-size: 0.72rem; color: #64748b; font-style: italic;">${houseInfo.ship}</div>
                  </div>
                </div>

                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px;">
                  <span style="font-size: 1.85rem; font-weight: 800; color: ${houseInfo.color}; line-height: 1;">${hStats.points}</span>
                  <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">House Points</span>
                </div>

                <div style="background: #f1f5f9; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 10px;">
                  <div style="background: ${houseInfo.color}; height: 100%; width: ${Math.min(100, Math.round((hStats.points / (sortedHouses[0].points || 1)) * 100))}%; border-radius: 3px; transition: width 0.4s ease;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; border-top: 1px solid #f1f5f9; padding-top: 8px;">
                  <span><strong>${hStats.playersCount}</strong> Players</span>
                  <span><strong>${hStats.wins}</strong>W · <strong>${hStats.draws}</strong>D · <strong>${hStats.losses}</strong>L</span>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Main Navigation Tabs (Sign-In Placed First & Fully Responsive) -->
      <div style="display: flex; gap: 6px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; padding-bottom: 4px; scrollbar-width: thin;">
        <button onclick="window.switchChessTab('signin')" style="${getTabStyle(chessState.activeTab === 'signin')}">
          <i class="fa-solid fa-clipboard-user" style="color: #10b981;"></i> Pupil Sign-In (${chessState.checkedInPlayerIds.length})
        </button>
        <button onclick="window.switchChessTab('ladder')" style="${getTabStyle(chessState.activeTab === 'ladder')}">
          <i class="fa-solid fa-stairs"></i> Master Ladder (${chessState.players.length})
        </button>
        <button onclick="window.switchChessTab('table')" style="${getTabStyle(chessState.activeTab === 'table')}">
          <i class="fa-solid fa-table-list"></i> League Table
        </button>
        <button onclick="window.switchChessTab('pairings')" style="${getTabStyle(chessState.activeTab === 'pairings')}">
          <i class="fa-solid fa-shuffle"></i> Thursday Pairings
        </button>
        <button onclick="window.switchChessTab('knockout')" style="${getTabStyle(chessState.activeTab === 'knockout')}">
          <i class="fa-solid fa-sitemap" style="color: #f59e0b;"></i> Knockout Cup
        </button>
        <button onclick="window.switchChessTab('drills')" style="${getTabStyle(chessState.activeTab === 'drills')}">
          <i class="fa-solid fa-stopwatch-20" style="color: #ec4899;"></i> Historical Drills (2-Min)
        </button>
        <button onclick="window.switchChessTab('matches')" style="${getTabStyle(chessState.activeTab === 'matches')}">
          <i class="fa-solid fa-clock-rotate-left"></i> Match History (${chessState.matches.length})
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

  // Handle board parameter if opened via QR scan
  const urlParams = new URLSearchParams(window.location.search);
  const boardParam = urlParams.get('board');
  if (boardParam && !window._handledBoardParam) {
    window._handledBoardParam = true;
    setTimeout(() => {
      window.openLogMatchModal(null, null, parseInt(boardParam, 10));
    }, 200);
  }
}

// Tab Content Router
function renderActiveTabContent(filteredPlayers) {
  if (chessState.activeTab === 'signin') {
    return renderSignInTab();
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

// 3. Pupil Self-Check-In & Attendance Management
function renderSignInTab() {
  const notCheckedIn = chessState.players.filter(
    (p) => !chessState.checkedInPlayerIds.includes(p.id),
  );
  const checkedInPlayers = chessState.players.filter((p) =>
    chessState.checkedInPlayerIds.includes(p.id),
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
            <h3 style="margin: 0; font-size: 1.18rem; color: #14532d; font-weight: 800;">Thursday Period 6 Pupil Sign-In</h3>
            <div style="font-size: 0.88rem; color: #166534; margin-top: 2px;">
              Currently <strong>${checkedInPlayers.length}</strong> pupil${checkedInPlayers.length === 1 ? '' : 's'} checked in and ready for today's session!
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${
            chessState.players.length > 0
              ? `
            <button onclick="window.checkInAllPlayers()" style="background: #15803d; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-users"></i> Check In All (${chessState.players.length})
            </button>
          `
              : ''
          }
          ${
            checkedInPlayers.length > 0
              ? `
            <button onclick="window.clearAttendance()" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-clock-rotate-left"></i> Reset Attendance
            </button>
          `
              : ''
          }
          ${
            chessState.players.length > 0
              ? `
            <button onclick="window.resetClubDataToCleanSlate()" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Reset all pupils and points (Emergency backup preserved)">
              <i class="fa-solid fa-trash-can"></i> Clear All Data
            </button>
          `
              : getBackupInfo()
                ? `
            <button onclick="window.restoreChessBackup()" style="background: #eff6ff; color: #1e40af; border: 1.5px solid #bfdbfe; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Undo reset & restore previous cohort">
              <i class="fa-solid fa-arrow-rotate-left"></i> Restore Previous Cohort (${getBackupInfo().playerCount})
            </button>
          `
                : ''
          }
        </div>
      </div>

      <!-- Two-Column Form: Quick Check-In vs New Player Registration -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
        
        <!-- Column 1: New Pupil Registration -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-user-plus" style="color: #10b981; font-size: 1.1rem;"></i>
            <h4 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800;">Register New Pupil</h4>
          </div>
          <p style="font-size: 0.84rem; color: #64748b; margin: 0 0 16px 0; line-height: 1.45;">
            Enter arriving pupil to immediately add them to their House and mark them present for today:
          </p>

          <form id="chess-self-reg-form" onsubmit="event.preventDefault(); window.handleSelfRegister(event); return false;">
            <div style="margin-bottom: 12px;">
              <label for="reg-name" style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Pupil Full Name:</label>
              <input type="text" id="reg-name" required placeholder="e.g. Leo B. or Emily T." style="width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#cbd5e1'; if(this.value && window.sanitizePupilName) this.value = window.sanitizePupilName(this.value);">
              <div style="font-size: 0.74rem; color: #64748b; margin-top: 5px; display: flex; align-items: center; gap: 5px; line-height: 1.3;">
                <i class="fa-solid fa-shield-halved" style="color: #6366f1;"></i>
                <span><strong>School Privacy:</strong> Please use <strong>First Name + Last Initial</strong> (e.g. <em>Leo B.</em>). Full surnames are auto-sanitised.</span>
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
                  <option value="warrior" selected>Warrior (Green)</option>
                  <option value="victory">Victory (Blue)</option>
                  <option value="dreadnought">Dreadnought (Red)</option>
                  <option value="invincible">Invincible (Gold)</option>
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
            <h4 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800;">Returning Pupils</h4>
          </div>
          <p style="font-size: 0.84rem; color: #64748b; margin: 0 0 16px 0; line-height: 1.45;">
            Pupils already in the club can tap their name chip below to check in with 1 click:
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
            <div style="font-size: 0.82rem; color: #64748b; margin-top: 2px;">These pupils will be automatically seeded into Pairings and the Knockout Cup.</div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
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
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
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
          <button onclick="window.openBoardQRStandsModal()" style="background: #f8fafc; color: #1e3a8a; border: 1.5px solid #cbd5e1; font-weight: 700; font-size: 0.85rem; padding: 9px 14px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-qrcode" style="color: #0284c7;"></i> Board QR Stands (PDF)
          </button>
          <button onclick="window.generateThursdayPairings()" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 10px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
            <i class="fa-solid fa-shuffle"></i> Generate Balanced Pairings
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

      <!-- Bracket Tree Horizontal Scroll Container -->
      <div style="display: flex; gap: 28px; overflow-x: auto; padding: 10px 0 20px;">
        ${bracket.rounds
          .map((round, rIdx) => {
            const roundTitle = bracket.roundNames[rIdx] || `Round ${rIdx + 1}`;
            return `
            <div style="min-width: 250px; flex: 1;">
              <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 12px; text-align: center; letter-spacing: 0.05em;">
                ${roundTitle}
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-height: 380px; gap: 16px;">
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

// Styling Helpers
function getTabStyle(isActive) {
  return `
    padding: 10px 16px;
    font-size: 0.9rem;
    font-weight: 700;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${isActive ? '#8b5cf6' : '#64748b'};
    border-bottom: 3px solid ${isActive ? '#8b5cf6' : 'transparent'};
    display: inline-flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    transition: all 0.15s ease;
  `;
}

function getFilterPillStyle(isActive) {
  return `
    padding: 5px 12px;
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 20px;
    border: 1.5px solid ${isActive ? '#8b5cf6' : '#cbd5e1'};
    background: ${isActive ? '#8b5cf6' : '#ffffff'};
    color: ${isActive ? '#ffffff' : '#475569'};
    cursor: pointer;
    transition: all 0.15s ease;
  `;
}

// Navigation Handlers
window.switchChessTab = function (tabName) {
  chessState.activeTab = tabName;
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

        <button onclick="window.print()" style="background: #ffffff; border: 1.5px solid #cbd5e1; color: #1e293b; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-print"></i> Print Whiteboard Sheet
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

  chessState.knockoutBracket = {
    tournamentSize,
    roundNames,
    rounds,
  };

  saveChessState();
  chessState.activeTab = 'knockout';
  renderChessHubView();
};

window.advanceKnockoutWinner = function (roundIdx, matchIdx, winnerId) {
  const bracket = chessState.knockoutBracket;
  if (!bracket) return;

  const match = bracket.rounds[roundIdx][matchIdx];
  if (!match) return;

  const winner = match.p1.id === winnerId ? match.p1 : match.p2;
  const loser = match.p1.id === winnerId ? match.p2 : match.p1;
  match.winner = winner;

  // Record official match in history
  chessState.matches.push({
    id: 'ko_m_' + Date.now(),
    date: 'Thursday Period 6 Knockout',
    round: bracket.roundNames[roundIdx],
    white: match.p1.name,
    black: match.p2.name,
    whiteHouse: match.p1.house,
    blackHouse: match.p2.house,
    result: winner.id === match.p1.id ? '1-0' : '0-1',
    opening: 'Knockout Cup Match',
  });

  // Update player stats
  winner.won++;
  winner.games++;
  winner.rating += 15;
  loser.lost++;
  loser.games++;
  loser.rating = Math.max(800, loser.rating - 15);

  // If there is a next round, advance winner
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

  saveChessState();
  renderChessHubView();
};

window.resetKnockoutTournament = function () {
  chessState.knockoutBracket = null;
  saveChessState();
  renderChessHubView();
};

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

  const playerOptions = chessState.players
    .map(
      (p) => `<option value="${p.id}">${p.name} (Year ${p.year}, ${HOUSES[p.house].name})</option>`,
    )
    .join('');

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #ffffff; border-radius: 14px; max-width: 520px; width: 100%; padding: 26px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 12px;">
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-trophy" style="color: #8b5cf6;"></i> Log Match Result
          </h2>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

        ${
          boardNum
            ? `
          <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; padding: 8px 12px; border-radius: 8px; margin-bottom: 14px; color: #1e40af; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-chess-board"></i> Official Match at Board ${boardNum}
          </div>
        `
            : ''
        }

        <form id="chess-match-form" onsubmit="window.handleMatchSubmit(event)">
          
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">White Player:</label>
            <select id="match-white-player" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
              <option value="">-- Select White Player --</option>
              ${playerOptions}
            </select>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">Black Player:</label>
            <select id="match-black-player" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
              <option value="">-- Select Black Player --</option>
              ${playerOptions}
            </select>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">Outcome / Result:</label>
            <select id="match-result" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
              <option value="1-0">White Won (1 - 0) [+3 pts White, +1 pt Black]</option>
              <option value="0-1">Black Won (0 - 1) [+3 pts Black, +1 pt White]</option>
              <option value="1/2-1/2">Draw (½ - ½) [+2 pts White, +2 pts Black]</option>
            </select>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 5px;">Opening (Optional):</label>
            <input type="text" id="match-opening" placeholder="e.g. Italian Game, Queen's Gambit, Sicilian" style="width: 100%; padding: 9px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
            <button type="button" onclick="window.closeChessModal()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 6px; font-weight: 700; cursor: pointer;">Cancel</button>
            <button type="submit" style="background: #8b5cf6; color: #ffffff; border: none; padding: 9px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-check"></i> Save Match &amp; House Points
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

// Modal Handling: Board QR Stands (Boards 1–10)
window.openBoardQRStandsModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (!modalCont) return;

  let boardsHtml = '';
  for (let i = 1; i <= 10; i++) {
    boardsHtml += `
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="font-size: 0.72rem; font-weight: 800; color: #2563eb; text-transform: uppercase;">Table Tent</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 2px 0;">BOARD ${i}</div>
        <div style="font-size: 0.72rem; color: #64748b; margin-bottom: 8px;">Scan to log match</div>
        <a href="/?view=chess&board=${i}" target="_blank" style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-decoration: none;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Test Link
        </a>
      </div>
    `;
  }

  modalCont.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;" onclick="if(event.target === this) window.closeChessModal();">
      <div style="background: #ffffff; border-radius: 14px; max-width: 680px; width: 100%; padding: 26px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: zoomIn 0.2s ease-out; font-family: 'Outfit', sans-serif;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 10px;">
          <div>
            <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #0f172a;">
              <i class="fa-solid fa-qrcode" style="color: #0284c7;"></i> Board Sign-In QR Stands (Boards 1–10)
            </h2>
            <div style="font-size: 0.82rem; color: #64748b;">Printable A4 table tents for each chess board in the classroom.</div>
          </div>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

        <p style="font-size: 0.9rem; color: #334155; line-height: 1.5; margin: 0 0 16px 0;">
          Place these folded table tent stands at Boards 1 through 10. Pupils sit down, scan the QR code on their phone, and the app instantly opens the Match Logger for that exact board!
        </p>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">
          ${boardsHtml}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
          <button type="button" onclick="window.closeChessModal()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 6px; font-weight: 700; cursor: pointer;">Close</button>
          <a href="/pdfs/meoncross_chess_board_qr_stands.pdf" target="_blank" download style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 9px 20px; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-file-pdf"></i> Download Printable PDF (10 Stands)
          </a>
        </div>

      </div>
    </div>
  `;
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
              <option value="warrior">Warrior (Green)</option>
              <option value="dreadnought">Dreadnought (Red)</option>
              <option value="invincible">Invincible (Gold)</option>
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
