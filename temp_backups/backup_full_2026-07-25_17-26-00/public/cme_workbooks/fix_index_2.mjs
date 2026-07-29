import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// If the GPK view is missing entirely, we must insert it.
if (!html.includes('id="leaderboard-gpk-view"')) {
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
console.log("Injected Leaderboard GPK View.");
