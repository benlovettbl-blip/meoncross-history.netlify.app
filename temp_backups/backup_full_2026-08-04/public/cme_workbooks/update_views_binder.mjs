import fs from 'fs';

let viewsCode = fs.readFileSync('src/views.js', 'utf8');

// 1. Revert Key Individuals to iterate ALL figures
const gpkFilterStr = `  // Render Supporting Figures (those NOT in the GPK manual map)
  const gpkMap = ['balfour', 'benGurion', 'hussein', 'dayan', 'nasser', 'eshkol', 'meir', 'arafat', 'sharon', 'carter', 'rabin'];
  const activeFigures = Object.keys(KEY_FIGURES_BIO)
    .filter(key => !gpkMap.includes(key))
    .map(key => ({ key, ...KEY_FIGURES_BIO[key] }));`;

const originalActiveFiguresStr = `  const activeFigures = Object.keys(KEY_FIGURES_BIO).map(key => ({ key, ...KEY_FIGURES_BIO[key] }));`;

viewsCode = viewsCode.replace(gpkFilterStr, originalActiveFiguresStr);

// Also remove `renderGamificationRoadmap();` from `renderKeyIndividualsView`
viewsCode = viewsCode.replace('renderGamificationRoadmap();', '');


// 2. Replace renderGamificationRoadmap with renderGarbagePailBinder
const newBinderLogic = `
function renderGarbagePailBinder() {
  const container = document.getElementById('gpk-binder-grid');
  if (!container) return;
  container.innerHTML = '';

  const unlockedIds = state.userStats.unlockedCards || [];

  CARDS_DATA.forEach(card => {
    const isUnlocked = unlockedIds.includes(card.id);
    
    const cardEl = document.createElement('div');
    cardEl.className = \`individual-card \${isUnlocked ? 'gpk-card-unlocked' : 'gpk-card-locked'}\`;
    
    if (isUnlocked) {
      cardEl.style.backgroundImage = \`url('\${card.image}')\`;
      cardEl.onclick = () => window.openCardDetailModal ? window.openCardDetailModal(card) : alert(card.description);
      // Create hologram effect on hover
      cardEl.innerHTML = '<div class="hologram"></div>';
    } else {
      cardEl.innerHTML = \`
        <i class="fa-solid fa-lock" style="font-size: 2rem; color: rgba(255,255,255,0.2); margin-bottom: 10px;"></i>
        <div style="font-size: 0.8rem; text-align: center; color: var(--text-muted); padding: 0 10px;">
          \${card.unlockMessage}
        </div>
      \`;
    }
    
    container.appendChild(cardEl);
  });
}
window.renderGarbagePailBinder = renderGarbagePailBinder;
`;

viewsCode = viewsCode.replace(/function renderGamificationRoadmap\(\) \{[\s\S]*?window\.renderGamificationRoadmap = renderGamificationRoadmap;/m, newBinderLogic);

fs.writeFileSync('src/views.js', viewsCode);
console.log('Updated views.js');
