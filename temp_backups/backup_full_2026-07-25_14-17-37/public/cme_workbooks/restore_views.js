const fs = require('fs');
const path = 'src/views.js';

let content = fs.readFileSync(path, 'utf8');

const appendContent = `
import { CARDS_DATA } from './cards_data.js';

export function renderGarbagePailBinder() {
  const container = document.getElementById("gpk-binder-grid");
  if (!container) return;
  container.innerHTML = "";

  const unlockedIds = state.userStats.unlockedCards || [];

  CARDS_DATA.forEach(card => {
    const isUnlocked = unlockedIds.includes(card.id);

    const wrapperEl = document.createElement("div");
    wrapperEl.className = "gpk-card-container";

    const cardEl = document.createElement("div");
    cardEl.className = \`individual-card \${isUnlocked ? "gpk-card-unlocked" : "gpk-card-locked"}\`;

    if (isUnlocked) {
      cardEl.style.backgroundImage = \`url('\${card.image}')\`;
      cardEl.onclick = () => window.openCardDetailModal ? window.openCardDetailModal(card) : alert(card.description);
      cardEl.innerHTML = '<div class="hologram"></div>';
    } else {
      cardEl.innerHTML = \`
        <i class="fa-solid fa-lock" style="font-size: 2rem; color: rgba(255,255,255,0.2); margin-bottom: 10px;"></i>
        <div class="locked-hint">
          \${card.unlockMessage}
        </div>
      \`;
    }

    wrapperEl.appendChild(cardEl);
    container.appendChild(wrapperEl);
  });
}
window.renderGarbagePailBinder = renderGarbagePailBinder;
`;

// Also fix openStreakLeaderboard to call renderGarbagePailBinder
content = content.replace(
  'export function openStreakLeaderboard() {\n  renderStreakLeaderboardList();\n  const submitBtn',
  'export function openStreakLeaderboard() {\n  renderStreakLeaderboardList();\n  renderGarbagePailBinder();\n  const submitBtn'
);

fs.writeFileSync(path, content + appendContent);
console.log('Appended GPK function');
