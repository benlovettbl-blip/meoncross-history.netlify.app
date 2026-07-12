import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Restore the original Fareham Chimney SVG everywhere
const newSvgRegex = /<svg width="32" height="40" viewBox="0 0 24 32" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="filter: drop-shadow\(0 2px 4px rgba\(0,0,0,0\.3\)\);">[\s\S]*?<\/svg>/g;

const oldSvg = `<svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
              <rect x="5" y="24" width="14" height="2" rx="0.5" fill="#a03018" />
              <polygon points="6,24 8,4 16,4 18,24" fill="#e65c00" />
              <rect x="7" y="2" width="10" height="2" rx="0.5" fill="#b34700" />
              <rect x="7.8" y="6" width="8.4" height="1.5" fill="#ffffff" />
              <rect x="8.0" y="9.5" width="8.0" height="1.5" fill="#ffffff" />
              <rect x="8.2" y="13" width="7.6" height="1.5" fill="#ffffff" />
            </svg>`;

html = html.replace(newSvgRegex, oldSvg);

// 2. Fix the Leaderboard GPK tabs insertion
const btnLeaderboardBackHtml = `<button class="btn-secondary" id="btn-leaderboard-back">
            <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>`;

const tabsHtml = `
          <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">
            <button id="tab-leaderboard-standings" style="padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Standings</button>
            <button id="tab-leaderboard-gpk" style="padding: 10px 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-glass); border-radius: 4px; cursor: pointer; font-weight: bold;">Collector's Binder</button>
          </div>

          <div id="leaderboard-standings-view">`;

// Only inject if it's not already there
if (!html.includes('id="tab-leaderboard-standings"')) {
  html = html.replace(btnLeaderboardBackHtml, btnLeaderboardBackHtml + tabsHtml);

  const standingsEndHtml = `<div id="streak-leaderboard-list-container">
              <!-- Dynamically rendered -->
            </div>
          </div>`;

  const gpkViewHtml = `</div> <!-- End standings view -->

          <div id="leaderboard-gpk-view" style="display: none;">
            <div class="exam-skills-header-card" style="background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(160,48,24,0.1));">
              <h2 class="exam-skills-title">
                <i class="fa-solid fa-book-open"></i> Garbage Pail Kids Binder
              </h2>
              <p class="exam-skills-desc">
                Your collection of historical trading cards. Master topics to unlock more cards!
              </p>
            </div>
            <div id="gpk-binder-grid" class="card-binder-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; margin-top: 20px;">
              <!-- Dynamically populated locked/unlocked cards -->
            </div>
          </div>`;

  html = html.replace(standingsEndHtml, standingsEndHtml + gpkViewHtml);
}

fs.writeFileSync('index.html', html);
console.log('Fixed index.html tabs and SVGs');
