import fs from 'fs';

let viewsCode = fs.readFileSync('src/views.js', 'utf8');

// 1. Add import
if (!viewsCode.includes('import { CARDS_DATA }')) {
  viewsCode = viewsCode.replace("import { state } from './state.js';", "import { state } from './state.js';\nimport { CARDS_DATA } from './cards_data.js';");
}

// 2. Add renderGarbagePailBinder function
const gpkFunction = `
function renderGarbagePailBinder() {
  const container = document.getElementById('gpk-binder-grid');
  if (!container) return;
  container.innerHTML = '';

  const unlockedIds = state.userStats.unlockedCards || [];

  CARDS_DATA.forEach(card => {
    const isUnlocked = unlockedIds.includes(card.id);
    const cardEl = document.createElement('div');
    cardEl.className = 'gpk-card-container';
    
    if (isUnlocked) {
      cardEl.innerHTML = \`
        <div class="gpk-card-unlocked" style="background-image: url('\${card.image}');" title="\${card.name} - \${card.description}"></div>
      \`;
    } else {
      cardEl.innerHTML = \`
        <div class="gpk-card-locked">
          <i class="fa-solid fa-lock"></i>
          <span class="locked-hint">\${card.unlockMessage}</span>
        </div>
      \`;
    }
    
    container.appendChild(cardEl);
  });
}
`;

if (!viewsCode.includes('function renderGarbagePailBinder')) {
  viewsCode = viewsCode.replace('function renderKeyIndividualsView() {', gpkFunction + '\nfunction renderKeyIndividualsView() {\n  renderGarbagePailBinder();\n');
}

fs.writeFileSync('src/views.js', viewsCode);
console.log("Updated views.js with GPK Binder logic.");
