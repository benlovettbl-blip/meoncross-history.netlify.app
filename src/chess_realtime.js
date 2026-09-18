/**
 * The History Portal Chess Club: Real-Time Cloud Synchronization Manager
 * Connects teacher arbiter actions to pupil devices in real time.
 */

const SYNC_ENDPOINT = '/.netlify/functions/chess_sync';
const POLL_INTERVAL_MS = 3000;
const POLL_INTERVAL_BACKGROUND_MS = 15000;

let lastKnownSyncedAt = 0;
let pollingIntervalId = null;
let isPushing = false;
let pushDebounceTimer = null;
let currentSyncStatus = 'idle'; // 'idle' | 'syncing' | 'synced' | 'offline'

export function isAirgapModeActive() {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem('chess_airgap_mode');
  // Safe by default: Airgap is active unless explicitly turned off
  return val !== 'false';
}

export function setAirgapMode(active) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chess_airgap_mode', active ? 'true' : 'false');
    currentSyncStatus = active ? 'airgap' : 'idle';
    updateSyncStatusUI();
  }
}

export function getCloudSyncStatus() {
  return {
    status: isAirgapModeActive() ? 'airgap' : currentSyncStatus,
    lastSyncedAt: lastKnownSyncedAt,
  };
}

/**
 * Teacher Mode: Broadcasts current chess state to the live cloud room
 */
export async function broadcastStateToCloud(chessState, showToast = false) {
  if (!chessState) return;

  if (isAirgapModeActive()) {
    currentSyncStatus = 'airgap';
    updateSyncStatusUI();
    if (showToast && typeof window !== 'undefined' && window.showChessToast) {
      window.showChessToast(
        '🛡️ Airgap Mode Active: Data stays strictly on this school laptop (GDPR Compliant)',
        'info',
      );
    }
    return false;
  }

  if (pushDebounceTimer) {
    clearTimeout(pushDebounceTimer);
  }

  return new Promise((resolve) => {
    pushDebounceTimer = setTimeout(async () => {
      isPushing = true;
      currentSyncStatus = 'syncing';
      updateSyncStatusUI();

      try {
        const nicknameMap = {};
        (chessState.players || []).forEach((p) => {
          const nick = p.nickname || p.name;
          nicknameMap[p.id] = nick;
          if (p.realName) nicknameMap[p.realName] = nick;
          nicknameMap[p.name] = nick;
        });

        // Strict GDPR Cloak: Strip realName and year; force name to be nickname
        const cloakedPlayers = (chessState.players || []).map((p) => {
          const { realName, year, ...rest } = p;
          const nick = p.nickname || p.name;
          return {
            ...rest,
            name: nick,
            nickname: nick,
          };
        });

        // Cloak player names in matches
        const cloakedMatches = (chessState.matches || []).map((m) => {
          return {
            ...m,
            white: nicknameMap[m.white] || m.white,
            black: nicknameMap[m.black] || m.black,
          };
        });

        // Cloak active pairings if any
        const cloakedPairings = (chessState.activePairings || []).map((pair) => {
          const p1 = pair.p1
            ? {
                ...pair.p1,
                name: nicknameMap[pair.p1.id] || pair.p1.nickname || pair.p1.name,
                realName: undefined,
              }
            : null;
          const p2 = pair.p2
            ? {
                ...pair.p2,
                name: nicknameMap[pair.p2.id] || pair.p2.nickname || pair.p2.name,
                realName: undefined,
              }
            : null;
          return {
            ...pair,
            p1,
            p2,
          };
        });

        const payload = {
          players: cloakedPlayers,
          matches: cloakedMatches,
          activePairings: cloakedPairings,
          checkedInPlayerIds: chessState.checkedInPlayerIds || [],
          sessionTimeRemaining: chessState.sessionTimeRemaining,
          sessionActive: chessState.sessionActive,
          knockoutBracket: chessState.knockoutBracket || null,
        };

        const res = await fetch(SYNC_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-teacher-passkey': 'Drake.30!',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const json = await res.json();
          lastKnownSyncedAt = json.syncedAt || Date.now();
          currentSyncStatus = 'synced';
          updateSyncStatusUI();
          if (showToast && typeof window !== 'undefined' && window.showChessToast) {
            window.showChessToast('☁️ Live Room Broadcasted to Pupil Devices!', 'success');
          }
          resolve(true);
        } else {
          currentSyncStatus = 'offline';
          updateSyncStatusUI();
          resolve(false);
        }
      } catch (err) {
        console.warn('Realtime cloud sync broadcast failed:', err.message);
        currentSyncStatus = 'offline';
        updateSyncStatusUI();
        resolve(false);
      } finally {
        isPushing = false;
      }
    }, 400); // 400ms debounce
  });
}

/**
 * Pupil / Spectator Mode: Listens for live updates from teacher
 */
export function startPupilRealtimeSync(onUpdateReceived) {
  if (pollingIntervalId) {
    clearInterval(pollingIntervalId);
  }

  async function checkRemoteState() {
    if (isPushing) return;

    try {
      const res = await fetch(SYNC_ENDPOINT, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        currentSyncStatus = 'offline';
        updateSyncStatusUI();
        return;
      }

      const remoteData = await res.json();
      if (!remoteData || !remoteData.syncedAt) {
        currentSyncStatus = 'idle';
        updateSyncStatusUI();
        return;
      }

      currentSyncStatus = 'synced';
      updateSyncStatusUI();

      if (remoteData.syncedAt > lastKnownSyncedAt) {
        console.log(
          '⚡ Remote chess update received from teacher at:',
          new Date(remoteData.syncedAt).toLocaleTimeString(),
        );
        lastKnownSyncedAt = remoteData.syncedAt;
        if (typeof onUpdateReceived === 'function') {
          onUpdateReceived(remoteData);
        }
      }
    } catch (e) {
      currentSyncStatus = 'offline';
      updateSyncStatusUI();
    }
  }

  // Initial fetch immediately
  checkRemoteState();

  // Smart polling based on tab visibility
  function resetInterval() {
    if (pollingIntervalId) clearInterval(pollingIntervalId);
    const interval = document.hidden ? POLL_INTERVAL_BACKGROUND_MS : POLL_INTERVAL_MS;
    pollingIntervalId = setInterval(checkRemoteState, interval);
  }

  resetInterval();
  document.addEventListener('visibilitychange', resetInterval);

  return () => {
    if (pollingIntervalId) clearInterval(pollingIntervalId);
    document.removeEventListener('visibilitychange', resetInterval);
  };
}

/**
 * UI Status Pill in Header
 */
export function renderCloudSyncStatusPill(userRole = 'pupil') {
  if (isAirgapModeActive()) {
    return `
      <div id="chess-cloud-sync-pill" onclick="window.openAirgapInfoModal && window.openAirgapInfoModal()" style="cursor: pointer; display: inline-flex; align-items: center; gap: 7px; background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; padding: 6px 14px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-shadow: 0 1px 4px rgba(0,0,0,0.06); transition: all 0.15s;" title="Airgap Mode Active: Data stored strictly on this school laptop and never sent to the internet (Click for GDPR & privacy settings)">
        <i class="fa-solid fa-shield-halved" style="color: #16a34a; font-size: 0.88rem;"></i>
        <span>Airgap Mode: Local Laptop</span>
        <span style="background: #dcfce7; color: #166534; font-size: 0.65rem; padding: 1px 6px; border-radius: 10px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em;">100% GDPR Safe</span>
      </div>
    `;
  }

  let badgeText = 'Live Cloud';
  let badgeColor = '#10b981'; // Green
  let badgeBg = '#ecfdf5';
  let badgeBorder = '#a7f3d0';
  let icon = 'fa-cloud';

  if (currentSyncStatus === 'syncing') {
    badgeText = 'Syncing...';
    badgeColor = '#3b82f6'; // Blue
    badgeBg = '#eff6ff';
    badgeBorder = '#bfdbfe';
    icon = 'fa-rotate fa-spin';
  } else if (currentSyncStatus === 'offline') {
    badgeText = 'Local Cache';
    badgeColor = '#f59e0b'; // Amber
    badgeBg = '#fffbeb';
    badgeBorder = '#fde68a';
    icon = 'fa-cloud-slash';
  } else if (currentSyncStatus === 'synced') {
    badgeText = userRole === 'teacher' ? 'Room Live' : 'Live Sync';
    badgeColor = '#059669';
    badgeBg = '#ecfdf5';
    badgeBorder = '#6ee7b7';
    icon = 'fa-circle-check';
  }

  const timeStr = lastKnownSyncedAt
    ? new Date(lastKnownSyncedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Ready';

  return `
    <div id="chess-cloud-sync-pill" style="display: inline-flex; align-items: center; gap: 6px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; padding: 4px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; font-family: monospace;" title="Last cloud update: ${timeStr}">
      <i class="fa-solid ${icon}"></i>
      <span>${badgeText}</span>
      <span style="font-size: 0.65rem; opacity: 0.75;">(${timeStr})</span>
    </div>
  `;
}

function updateSyncStatusUI() {
  const el = document.getElementById('chess-cloud-sync-pill');
  if (el) {
    const parent = el.parentElement;
    if (parent) {
      // Re-render pill
      const temp = document.createElement('div');
      temp.innerHTML = renderCloudSyncStatusPill();
      if (temp.firstElementChild) {
        parent.replaceChild(temp.firstElementChild, el);
      }
    }
  }
}
