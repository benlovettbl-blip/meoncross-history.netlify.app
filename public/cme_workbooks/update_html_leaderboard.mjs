import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the Gamification Roadmap from Key Individuals
const roadmapRegex = /<!-- GAMIFICATION ROADMAP -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
html = html.replace(roadmapRegex, '');

// 2. Fix the header from "Supporting Figures" back to "Historical Biographies"
html = html.replace('Supporting Figures</h3>\n          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Other key individuals from the specification. Flip to revise their roles.</p>', 
'Historical Biographies</h3>\n          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Key individuals from the specification. Flip to revise their roles.</p>');

// 3. Add Tab System and GPK Binder to Leaderboard view
const oldLeaderboardStart = `<div class="leaderboard-container">
          <button class="btn-secondary" id="btn-leaderboard-back">
            <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>`;

const newLeaderboardTabs = `<div class="leaderboard-container">
          <button class="btn-secondary" id="btn-leaderboard-back">
            <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>
          
          <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">
            <button id="tab-leaderboard-standings" style="padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Standings</button>
            <button id="tab-leaderboard-gpk" style="padding: 10px 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-glass); border-radius: 4px; cursor: pointer; font-weight: bold;">Collector's Binder</button>
          </div>

          <div id="leaderboard-standings-view">`;

html = html.replace(oldLeaderboardStart, newLeaderboardTabs);

// Find the end of the leaderboard-container and inject the GPK view and closing div for standings
const standingsEndStr = `            <div id="streak-leaderboard-list-container">
              <!-- Dynamically rendered -->
            </div>
          </div>`;

const injectGpkStr = `            <div id="streak-leaderboard-list-container">
              <!-- Dynamically rendered -->
            </div>
          </div>
          </div> <!-- End standings view -->

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

html = html.replace(standingsEndStr, injectGpkStr);

// Add some CSS for the grid in case we removed it earlier
if (!html.includes('grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))')) {
  // It's in inline styles now
}

fs.writeFileSync('index.html', html);
console.log('Updated index.html');
