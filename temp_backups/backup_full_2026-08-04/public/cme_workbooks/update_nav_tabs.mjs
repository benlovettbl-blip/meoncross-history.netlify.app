import fs from 'fs';

let navCode = fs.readFileSync('src/navigation.js', 'utf8');

// Add Leaderboard Tab switching logic inside DOMContentLoaded or bindEvents
const newTabsLogic = `
  // Leaderboard Tab Switching
  const tabStandings = document.getElementById('tab-leaderboard-standings');
  const tabGpk = document.getElementById('tab-leaderboard-gpk');
  const viewStandings = document.getElementById('leaderboard-standings-view');
  const viewGpk = document.getElementById('leaderboard-gpk-view');

  if (tabStandings && tabGpk && viewStandings && viewGpk) {
    tabStandings.addEventListener('click', () => {
      viewStandings.style.display = 'block';
      viewGpk.style.display = 'none';
      tabStandings.style.background = 'var(--primary)';
      tabStandings.style.color = 'white';
      tabStandings.style.border = 'none';
      tabGpk.style.background = 'transparent';
      tabGpk.style.color = 'var(--text-main)';
      tabGpk.style.border = '1px solid var(--border-glass)';
    });

    tabGpk.addEventListener('click', () => {
      viewStandings.style.display = 'none';
      viewGpk.style.display = 'block';
      tabGpk.style.background = 'var(--primary)';
      tabGpk.style.color = 'white';
      tabGpk.style.border = 'none';
      tabStandings.style.background = 'transparent';
      tabStandings.style.color = 'var(--text-main)';
      tabStandings.style.border = '1px solid var(--border-glass)';
      
      // Render the binder grid when opened
      if (window.renderGarbagePailBinder) {
        window.renderGarbagePailBinder();
      }
    });
  }
`;

navCode = navCode.replace("const btnLeaderboardBack = document.getElementById('btn-leaderboard-back');", newTabsLogic + "\n  const btnLeaderboardBack = document.getElementById('btn-leaderboard-back');");

fs.writeFileSync('src/navigation.js', navCode);
console.log('Updated navigation.js tabs');
