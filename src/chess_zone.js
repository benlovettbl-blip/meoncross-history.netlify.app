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

const STORAGE_KEY = 'meoncross_chess_club_v1';

// State container
let chessState = {
  players: [],
  matches: [],
  activeTab: 'ladder', // 'ladder' | 'table' | 'pairings' | 'matches' | 'spotlight'
  filterYear: 'all', // 'all' | 'ks3' | 'ks4'
  filterHouse: 'all', // 'all' | houseId
};

// Initialize State from localStorage or seed
function initChessState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      chessState.players = parsed.players || INITIAL_PLAYERS;
      chessState.matches = parsed.matches || INITIAL_MATCHES;
    } else {
      chessState.players = JSON.parse(JSON.stringify(INITIAL_PLAYERS));
      chessState.matches = JSON.parse(JSON.stringify(INITIAL_MATCHES));
      saveChessState();
    }
  } catch (e) {
    console.error('Error loading chess state:', e);
    chessState.players = JSON.parse(JSON.stringify(INITIAL_PLAYERS));
    chessState.matches = JSON.parse(JSON.stringify(INITIAL_MATCHES));
  }
}

function saveChessState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        players: chessState.players,
        matches: chessState.matches,
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

  // Count players
  chessState.players.forEach((p) => {
    if (totals[p.house]) {
      totals[p.house].playersCount++;
    }
  });

  // Calculate match points
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

// Global UI trigger
export function renderChessHubView() {
  initChessState();
  const container = document.getElementById('main-content');
  if (!container) return;

  const houseTotals = calculateHouseTotals();
  const sortedHouses = Object.values(houseTotals).sort((a, b) => b.points - a.points);
  const leadingHouse = HOUSES[sortedHouses[0].id];

  // Filter players
  let filteredPlayers = [...chessState.players];
  if (chessState.filterYear === 'ks3') {
    filteredPlayers = filteredPlayers.filter((p) => p.year >= 7 && p.year <= 9);
  } else if (chessState.filterYear === 'ks4') {
    filteredPlayers = filteredPlayers.filter((p) => p.year >= 10 && p.year <= 11);
  }
  if (chessState.filterHouse !== 'all') {
    filteredPlayers = filteredPlayers.filter((p) => p.house === chessState.filterHouse);
  }
  filteredPlayers.sort((a, b) => a.rank - b.rank);

  let html = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px 60px 20px; animation: fadeInUp 0.3s ease-out; font-family: 'Outfit', sans-serif;">
      
      <!-- Top Hero Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-radius: 16px; padding: 32px 30px; color: #ffffff; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(30, 27, 75, 0.3); position: relative; overflow: hidden; border: 1.5px solid rgba(139, 92, 246, 0.3);">
        <div style="position: absolute; right: -15px; bottom: -25px; font-size: 160px; color: rgba(255, 255, 255, 0.03); pointer-events: none;">
          <i class="fa-solid fa-chess-knight"></i>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; position: relative; z-index: 2;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168, 85, 247, 0.2); border: 1px solid rgba(168, 85, 247, 0.4); padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: #c084fc; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
              <i class="fa-solid fa-clock"></i> Period 6 Thursdays · Meoncross Co-Curricular Club
            </div>
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; margin: 0 0 10px 0; color: #ffffff; font-weight: 800;">
              Meoncross Chess Club &amp; House League
            </h1>
            <p style="margin: 0; font-size: 1rem; color: #cbd5e1; max-width: 780px; line-height: 1.6;">
              Welcome to the 2026–27 Chess Championship. Compete on the master ladder, test your strategic acumen, and earn vital <strong>House Points</strong> for <strong>Warrior</strong>, <strong>Dreadnought</strong>, <strong>Victory</strong>, and <strong>Invincible</strong>. Every single game played scores points for your house!
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
            <button onclick="window.openLogMatchModal()" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.92rem; padding: 11px 20px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.35); transition: transform 0.15s ease;">
              <i class="fa-solid fa-plus-circle"></i> Log Thursday Match
            </button>
            <button onclick="window.switchChessTab('pairings')" style="background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); font-weight: 600; font-size: 0.85rem; padding: 8px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background 0.15s ease;">
              <i class="fa-solid fa-shuffle" style="color: #38bdf8;"></i> Thursday P6 Auto-Pairings
            </button>
          </div>
        </div>

        <!-- House Points Scoring Rule Pill Banner -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem; color: #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #10b981; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.75rem;">+${SCORING_RULES.WIN}</span>
            <span>House Win</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #3b82f6; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.75rem;">+${SCORING_RULES.DRAW}</span>
            <span>Draw (Valuable Save)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #64748b; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.75rem;">+${SCORING_RULES.PARTICIPATION}</span>
            <span>Game Played (Participation)</span>
          </div>
          <div style="margin-left: auto; font-style: italic; color: #fde047;">
            <i class="fa-solid fa-crown" style="margin-right: 4px;"></i> Current Leader: <strong>${leadingHouse.name}</strong> (${sortedHouses[0].points} pts)
          </div>
        </div>
      </div>

      <!-- House Championship Podium Grid -->
      <div style="margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-shield-halved" style="color: #1e3a8a;"></i> House Championship Standings
          </h2>
          <span style="font-size: 0.82rem; color: #64748b; font-weight: 600;">Total Games Logged: ${chessState.matches.length}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
          ${sortedHouses
            .map((hStats, index) => {
              const houseInfo = HOUSES[hStats.id];
              const isFirst = index === 0;
              return `
              <div style="background: #ffffff; border: 1.5px solid ${isFirst ? houseInfo.color : '#e2e8f0'}; border-radius: 12px; padding: 18px 20px; box-shadow: 0 ${isFirst ? '6px 20px rgba(0,0,0,0.08)' : '2px 8px rgba(0,0,0,0.03)'}; position: relative; overflow: hidden;">
                ${isFirst ? `<div style="position: absolute; top: 0; right: 0; background: ${houseInfo.color}; color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 3px 10px; border-bottom-left-radius: 8px; text-transform: uppercase; letter-spacing: 0.05em;"><i class="fa-solid fa-trophy"></i> 1st Place</div>` : ''}
                
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                  <div style="width: 42px; height: 42px; border-radius: 10px; background: ${houseInfo.bgLight}; border: 1.5px solid ${houseInfo.borderColor}; color: ${houseInfo.color}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
                    <i class="fa-solid ${houseInfo.icon}"></i>
                  </div>
                  <div>
                    <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 700;">${houseInfo.name}</h3>
                    <div style="font-size: 0.76rem; color: #64748b; font-style: italic;">${houseInfo.ship}</div>
                  </div>
                </div>

                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px;">
                  <span style="font-size: 2rem; font-weight: 800; color: ${houseInfo.color}; line-height: 1;">${hStats.points}</span>
                  <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">House Points</span>
                </div>

                <div style="background: #f1f5f9; height: 7px; border-radius: 4px; overflow: hidden; margin-bottom: 12px;">
                  <div style="background: ${houseInfo.color}; height: 100%; width: ${Math.min(100, Math.round((hStats.points / (sortedHouses[0].points || 1)) * 100))}%; border-radius: 4px; transition: width 0.4s ease;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #475569; border-top: 1px solid #f1f5f9; padding-top: 8px;">
                  <span><strong>${hStats.playersCount}</strong> Players</span>
                  <span><strong>${hStats.wins}</strong>W · <strong>${hStats.draws}</strong>D · <strong>${hStats.losses}</strong>L</span>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Main Navigation Tabs -->
      <div style="display: flex; gap: 8px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; overflow-x: auto; padding-bottom: 2px;">
        <button onclick="window.switchChessTab('ladder')" style="${getTabStyle(chessState.activeTab === 'ladder')}">
          <i class="fa-solid fa-stairs"></i> Master Ladder (Rungs)
        </button>
        <button onclick="window.switchChessTab('table')" style="${getTabStyle(chessState.activeTab === 'table')}">
          <i class="fa-solid fa-table-list"></i> League Table &amp; Stats
        </button>
        <button onclick="window.switchChessTab('pairings')" style="${getTabStyle(chessState.activeTab === 'pairings')}">
          <i class="fa-solid fa-shuffle"></i> Thursday P6 Auto-Pairings
        </button>
        <button onclick="window.switchChessTab('matches')" style="${getTabStyle(chessState.activeTab === 'matches')}">
          <i class="fa-solid fa-clock-rotate-left"></i> Match History (${chessState.matches.length})
        </button>
        <button onclick="window.switchChessTab('spotlight')" style="${getTabStyle(chessState.activeTab === 'spotlight')}">
          <i class="fa-solid fa-landmark"></i> Historical Chess Trivia
        </button>
      </div>

      <!-- Year & House Filter Controls Bar (Visible on Ladder & Table) -->
      ${
        chessState.activeTab === 'ladder' || chessState.activeTab === 'table'
          ? `
        <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; background: #ffffff; padding: 10px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
            <i class="fa-solid fa-filter" style="color: #8b5cf6;"></i> Year Group:
          </div>
          <button onclick="window.setChessYearFilter('all')" style="${getFilterPillStyle(chessState.filterYear === 'all')}">All Years (7–11)</button>
          <button onclick="window.setChessYearFilter('ks3')" style="${getFilterPillStyle(chessState.filterYear === 'ks3')}">Key Stage 3 (Y7–9)</button>
          <button onclick="window.setChessYearFilter('ks4')" style="${getFilterPillStyle(chessState.filterYear === 'ks4')}">Key Stage 4 (Y10–11)</button>

          <div style="width: 1px; height: 20px; background: #cbd5e1; margin: 0 4px;"></div>

          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
            <i class="fa-solid fa-shield-halved" style="color: #2563eb;"></i> House:
          </div>
          <button onclick="window.setChessHouseFilter('all')" style="${getFilterPillStyle(chessState.filterHouse === 'all')}">All Houses</button>
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
            <button onclick="window.openAddPlayerModal()" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-user-plus" style="color: #10b981;"></i> Register Pupil
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

// Active Tab Renderer
function renderActiveTabContent(filteredPlayers) {
  if (chessState.activeTab === 'ladder') {
    return renderLadderTab(filteredPlayers);
  } else if (chessState.activeTab === 'table') {
    return renderLeagueTableTab(filteredPlayers);
  } else if (chessState.activeTab === 'pairings') {
    return renderPairingsTab();
  } else if (chessState.activeTab === 'matches') {
    return renderMatchesTab();
  } else if (chessState.activeTab === 'spotlight') {
    return renderSpotlightTab();
  }
  return '';
}

// 1. Ladder View (King of the Hill)
function renderLadderTab(players) {
  return `
    <div>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 4px solid #8b5cf6; padding: 12px 18px; border-radius: 8px; margin-bottom: 18px; font-size: 0.9rem; color: #334155; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <strong><i class="fa-solid fa-circle-info" style="color: #8b5cf6;"></i> The Master Ladder Rules:</strong> Pupils can challenge any player up to <strong>2 rungs above</strong> them. If the challenger wins, they swap rungs with the defeated player!
        </div>
        <span style="font-size: 0.8rem; font-weight: 700; color: #64748b;">Showing ${players.length} Players</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${players
          .map((p) => {
            const h = HOUSES[p.house];
            const isTop3 = p.rank <= 3;
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
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.15s ease;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
              
              <!-- Left: Rank & Avatar & Name -->
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: ${badgeBg}; color: ${badgeColor}; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                  ${p.rank === 1 ? '<i class="fa-solid fa-crown"></i>' : `#${p.rank}`}
                </div>

                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="margin: 0; font-size: 1.08rem; color: #0f172a; font-weight: 700;">${p.name}</h3>
                    <span style="background: ${h.bgLight}; color: ${h.color}; border: 1px solid ${h.borderColor}; padding: 2px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">
                      <i class="fa-solid ${h.icon}"></i> ${h.name}
                    </span>
                    <span style="background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">
                      Year ${p.year}
                    </span>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748b; margin-top: 3px;">
                    Rating: <strong>${p.rating}</strong> · Played: <strong>${p.games}</strong> (${p.won}W / ${p.drawn}D / ${p.lost}L)
                  </div>
                </div>
              </div>

              <!-- Right: Challenge Action & Contribution -->
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="text-align: right;">
                  <div style="font-size: 1.1rem; font-weight: 800; color: ${h.color};">${p.won * SCORING_RULES.WIN + p.drawn * SCORING_RULES.DRAW + p.lost * SCORING_RULES.PARTICIPATION} pts</div>
                  <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 700;">House Contribution</div>
                </div>

                <button onclick="window.quickChallengePlayer('${p.id}')" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #1e3a8a; padding: 7px 14px; border-radius: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='#f8fafc'">
                  <i class="fa-solid fa-chess-knight" style="color: #8b5cf6;"></i> Challenge
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
  const sortedByPoints = [...players].sort((a, b) => {
    const aPts =
      a.won * SCORING_RULES.WIN +
      a.drawn * SCORING_RULES.DRAW +
      a.lost * SCORING_RULES.PARTICIPATION;
    const bPts =
      b.won * SCORING_RULES.WIN +
      b.drawn * SCORING_RULES.DRAW +
      b.lost * SCORING_RULES.PARTICIPATION;
    return bPts - aPts;
  });

  return `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;">
            <th style="padding: 12px 16px;">Rank</th>
            <th style="padding: 12px 16px;">Pupil</th>
            <th style="padding: 12px 16px;">Year</th>
            <th style="padding: 12px 16px;">House</th>
            <th style="padding: 12px 16px; text-align: center;">Played</th>
            <th style="padding: 12px 16px; text-align: center;">Won</th>
            <th style="padding: 12px 16px; text-align: center;">Drawn</th>
            <th style="padding: 12px 16px; text-align: center;">Lost</th>
            <th style="padding: 12px 16px; text-align: center;">Rating</th>
            <th style="padding: 12px 16px; text-align: right;">House Pts</th>
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
              <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                <td style="padding: 12px 16px; font-weight: 800; color: #64748b;">${idx + 1}</td>
                <td style="padding: 12px 16px; font-weight: 700; color: #0f172a;">${p.name}</td>
                <td style="padding: 12px 16px; color: #475569;">Year ${p.year}</td>
                <td style="padding: 12px 16px;">
                  <span style="background: ${h.bgLight}; color: ${h.color}; border: 1px solid ${h.borderColor}; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
                    <i class="fa-solid ${h.icon}"></i> ${h.name}
                  </span>
                </td>
                <td style="padding: 12px 16px; text-align: center; font-weight: 600;">${p.games}</td>
                <td style="padding: 12px 16px; text-align: center; color: #16a34a; font-weight: 700;">${p.won}</td>
                <td style="padding: 12px 16px; text-align: center; color: #2563eb; font-weight: 700;">${p.drawn}</td>
                <td style="padding: 12px 16px; text-align: center; color: #94a3b8;">${p.lost}</td>
                <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-weight: 700; color: #334155;">${p.rating}</td>
                <td style="padding: 12px 16px; text-align: right; font-weight: 800; color: ${h.color}; font-size: 1.05rem;">+${totalPts}</td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 3. Automated Period 6 Thursday Matchmaker
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

        <button onclick="window.generateThursdayPairings()" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 10px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          <i class="fa-solid fa-shuffle"></i> Generate Balanced Pairings
        </button>
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
              const h = HOUSES[p.house];
              return `
              <label style="display: flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                <input type="checkbox" class="attendance-check" value="${p.id}" checked style="accent-color: #8b5cf6;">
                <span style="font-weight: 600; color: #1e293b;">${p.name}</span>
                <span style="margin-left: auto; color: ${h.color}; font-size: 0.72rem; font-weight: 700;">Y${p.year}</span>
              </label>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Generated Pairings Container -->
      <div id="pairings-results-box">
        <div style="text-align: center; padding: 30px 20px; color: #64748b; border: 2px dashed #cbd5e1; border-radius: 8px;">
          <i class="fa-solid fa-chess-board" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px; display: block;"></i>
          Click <strong>"Generate Balanced Pairings"</strong> above to auto-assign boards for Period 6.
        </div>
      </div>

    </div>
  `;
}

// 4. Match History Log
function renderMatchesTab() {
  const matches = [...chessState.matches].reverse();

  return `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 0.9rem; font-weight: 700; color: #475569;">Recent Match Results &amp; Board History</span>
        <button onclick="window.openLogMatchModal()" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #1e3a8a; padding: 6px 14px; border-radius: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer;">
          <i class="fa-solid fa-plus"></i> Add Match Result
        </button>
      </div>

      ${matches
        .map((m) => {
          const wH = HOUSES[m.whiteHouse] || HOUSES.victory;
          const bH = HOUSES[m.blackHouse] || HOUSES.warrior;

          let scoreBadge = '';
          if (m.result === '1-0') {
            scoreBadge = `<span style="background: #dcfce7; color: #166534; font-weight: 800; padding: 4px 10px; border-radius: 6px;">White Won (1 - 0)</span>`;
          } else if (m.result === '0-1') {
            scoreBadge = `<span style="background: #fee2e2; color: #991b1b; font-weight: 800; padding: 4px 10px; border-radius: 6px;">Black Won (0 - 1)</span>`;
          } else {
            scoreBadge = `<span style="background: #e0f2fe; color: #0369a1; font-weight: 800; padding: 4px 10px; border-radius: 6px;">Draw (½ - ½)</span>`;
          }

          return `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            
            <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
              <!-- White Player -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #ffffff; border: 1.5px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #334155;">
                  <i class="fa-solid fa-chess-pawn"></i>
                </div>
                <div>
                  <div style="font-weight: 700; color: #0f172a; font-size: 0.95rem;">${m.white}</div>
                  <span style="font-size: 0.72rem; color: ${wH.color}; font-weight: 700;">${wH.name}</span>
                </div>
              </div>

              <!-- VS Badge -->
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

// 5. Historical Chess Spotlight (Curriculum Connection)
function renderSpotlightTab() {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
      ${HISTORICAL_CHESS_SPOTLIGHTS.map((sp) => {
        return `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 22px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; color: #475569; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; margin-bottom: 10px;">
                <i class="fa-solid ${sp.icon}" style="color: #8b5cf6;"></i> ${sp.badge}
              </div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #0f172a; margin: 0 0 4px 0; font-weight: 700;">
                ${sp.title}
              </h3>
              <div style="font-size: 0.82rem; color: #b45309; font-weight: 600; margin-bottom: 12px;">
                ${sp.period}
              </div>
              <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin: 0 0 16px 0;">
                ${sp.excerpt}
              </p>
            </div>

            <div style="background: #fffbeb; border-left: 3.5px solid #f59e0b; padding: 10px 14px; border-radius: 0 6px 6px 0; font-size: 0.82rem; color: #92400e; line-height: 1.45;">
              <strong><i class="fa-solid fa-lightbulb"></i> Did You Know?</strong> ${sp.didYouKnow}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Styling Helpers
function getTabStyle(isActive) {
  return `
    padding: 10px 18px;
    font-size: 0.92rem;
    font-weight: 700;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${isActive ? '#8b5cf6' : '#64748b'};
    border-bottom: 3px solid ${isActive ? '#8b5cf6' : 'transparent'};
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: all 0.15s ease;
  `;
}

function getFilterPillStyle(isActive) {
  return `
    background: ${isActive ? '#8b5cf6' : '#f1f5f9'};
    color: ${isActive ? '#ffffff' : '#475569'};
    border: 1px solid ${isActive ? '#8b5cf6' : '#cbd5e1'};
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  `;
}

// Global Handlers attached to window
window.switchChessTab = function (tabName) {
  chessState.activeTab = tabName;
  renderChessHubView();
};

window.setChessYearFilter = function (yearVal) {
  chessState.filterYear = yearVal;
  renderChessHubView();
};

window.setChessHouseFilter = function (houseVal) {
  chessState.filterHouse = houseVal;
  renderChessHubView();
};

// 1-Click Thursday Period 6 Auto-Pairings Algorithm
window.generateThursdayPairings = function () {
  const checkboxes = document.querySelectorAll('.attendance-check:checked');
  const presentIds = Array.from(checkboxes).map((cb) => cb.value);

  if (presentIds.length < 2) {
    alert('Please select at least 2 players in attendance to generate pairings.');
    return;
  }

  // Get active player objects sorted by rank
  const activePlayers = chessState.players
    .filter((p) => presentIds.includes(p.id))
    .sort((a, b) => a.rank - b.rank);

  const pairings = [];
  const paired = new Set();

  for (let i = 0; i < activePlayers.length; i++) {
    const p1 = activePlayers[i];
    if (paired.has(p1.id)) continue;

    // Find best opponent: prefer adjacent rank and different house
    let bestOpponent = null;
    let bestOpponentIdx = -1;

    for (let j = i + 1; j < activePlayers.length; j++) {
      const candidate = activePlayers[j];
      if (paired.has(candidate.id)) continue;

      if (!bestOpponent) {
        bestOpponent = candidate;
        bestOpponentIdx = j;
      } else if (candidate.house !== p1.house && bestOpponent.house === p1.house) {
        // Strongly favor cross-house rivalry!
        bestOpponent = candidate;
        bestOpponentIdx = j;
        break;
      }
    }

    if (bestOpponent) {
      paired.add(p1.id);
      paired.add(bestOpponent.id);

      // Alternate white/black by board index
      const boardNum = pairings.length + 1;
      const isP1White = boardNum % 2 !== 0;

      pairings.push({
        board: boardNum,
        white: isP1White ? p1 : bestOpponent,
        black: isP1White ? bestOpponent : p1,
      });
    } else {
      // Bye (odd number of players)
      paired.add(p1.id);
      pairings.push({
        board: pairings.length + 1,
        white: p1,
        black: null,
        isBye: true,
      });
    }
  }

  // Render results into pairings-results-box
  const box = document.getElementById('pairings-results-box');
  if (!box) return;

  let html = `
    <div style="background: #ffffff; border: 2px solid #8b5cf6; border-radius: 10px; padding: 20px; margin-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h3 style="margin: 0; font-size: 1.2rem; color: #1e1b4b; font-family: 'Playfair Display', serif;">
            <i class="fa-solid fa-chess-board" style="color: #8b5cf6;"></i> Official Period 6 Board Assignments
          </h3>
          <div style="font-size: 0.8rem; color: #64748b;">Generated for ${presentIds.length} players (${pairings.filter((p) => !p.isBye).length} active boards)</div>
        </div>
        <button onclick="window.print()" class="no-print" style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
          <i class="fa-solid fa-print"></i> Print Whiteboard Sheet
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        ${pairings
          .map((pr) => {
            if (pr.isBye) {
              const h = HOUSES[pr.white.house];
              return `
              <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-weight: 800; font-size: 0.78rem; color: #64748b; text-transform: uppercase;">Board ${pr.board}</span>
                  <div style="font-weight: 700; color: #0f172a;">${pr.white.name} (Year ${pr.white.year})</div>
                  <span style="font-size: 0.72rem; color: ${h.color}; font-weight: 700;">${h.name}</span>
                </div>
                <span style="background: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 800;">ODD / BYE (+1 Pt)</span>
              </div>
            `;
            }

            const wH = HOUSES[pr.white.house];
            const bH = HOUSES[pr.black.house];

            return `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
                <span style="font-weight: 900; font-size: 0.85rem; color: #8b5cf6; text-transform: uppercase;">Board ${pr.board}</span>
                <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Rank #${pr.white.rank} vs #${pr.black.rank}</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <!-- White -->
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-square" style="color: #cbd5e1; font-size: 0.8rem;"></i>
                    <strong style="font-size: 0.95rem; color: #0f172a;">${pr.white.name}</strong>
                  </div>
                  <span style="font-size: 0.72rem; color: ${wH.color}; font-weight: 700;">${wH.name} · Y${pr.white.year}</span>
                </div>

                <div style="font-weight: 800; font-size: 0.8rem; color: #94a3b8;">VS</div>

                <!-- Black -->
                <div style="text-align: right;">
                  <div style="display: flex; align-items: center; gap: 6px; justify-content: flex-end;">
                    <strong style="font-size: 0.95rem; color: #0f172a;">${pr.black.name}</strong>
                    <i class="fa-solid fa-square" style="color: #0f172a; font-size: 0.8rem;"></i>
                  </div>
                  <span style="font-size: 0.72rem; color: ${bH.color}; font-weight: 700;">${bH.name} · Y${pr.black.year}</span>
                </div>
              </div>

              <!-- Quick Log Link -->
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #e2e8f0; text-align: center;">
                <button onclick="window.prefillMatchModal('${pr.white.id}', '${pr.black.id}')" style="background: none; border: none; color: #8b5cf6; font-weight: 700; font-size: 0.78rem; cursor: pointer;">
                  <i class="fa-solid fa-square-check"></i> Record Result for Board ${pr.board}
                </button>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    </div>
  `;
  box.innerHTML = html;
};

window.toggleAllAttendance = function (shouldCheck) {
  document.querySelectorAll('.attendance-check').forEach((cb) => {
    cb.checked = shouldCheck;
  });
};

// Modal Handling: Log Match
window.openLogMatchModal = function () {
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
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 12px;">
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-trophy" style="color: #8b5cf6;"></i> Log Match Result
          </h2>
          <button onclick="window.closeChessModal()" style="background: none; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer;">&times;</button>
        </div>

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
};

window.prefillMatchModal = function (wId, bId) {
  window.openLogMatchModal();
  setTimeout(() => {
    const wSelect = document.getElementById('match-white-player');
    const bSelect = document.getElementById('match-black-player');
    if (wSelect) wSelect.value = wId;
    if (bSelect) bSelect.value = bId;
  }, 50);
};

window.closeChessModal = function () {
  const modalCont = document.getElementById('chess-modal-container');
  if (modalCont) modalCont.innerHTML = '';
};

window.handleMatchSubmit = function (e) {
  e.preventDefault();
  const wId = document.getElementById('match-white-player').value;
  const bId = document.getElementById('match-black-player').value;
  const result = document.getElementById('match-result').value;
  const opening = document.getElementById('match-opening').value;

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

  // Update stats
  pWhite.games++;
  pBlack.games++;

  if (result === '1-0') {
    pWhite.won++;
    pBlack.lost++;
    pWhite.rating += 15;
    pBlack.rating = Math.max(800, pBlack.rating - 15);
    // Ladder swap if lower rank wins
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

  // Re-sort ranks to maintain consecutive numbers
  chessState.players.sort((a, b) => a.rank - b.rank);
  chessState.players.forEach((p, idx) => (p.rank = idx + 1));

  // Add match to log
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
            <input type="text" id="new-player-name" required placeholder="e.g. Leo B." style="width: 100%; padding: 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 0.95rem;">
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
  e.preventDefault();
  const name = document.getElementById('new-player-name').value.trim();
  const year = parseInt(document.getElementById('new-player-year').value, 10);
  const house = document.getElementById('new-player-house').value;

  if (!name) return;

  const newRank = chessState.players.length + 1;
  chessState.players.push({
    id: 'p_' + Date.now(),
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

  saveChessState();
  window.closeChessModal();
  renderChessHubView();
};

window.quickChallengePlayer = function (targetId) {
  window.openLogMatchModal();
  setTimeout(() => {
    const bSelect = document.getElementById('match-black-player');
    if (bSelect) bSelect.value = targetId;
  }, 50);
};
