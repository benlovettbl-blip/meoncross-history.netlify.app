import fs from 'fs';

let viewsCode = fs.readFileSync('src/views.js', 'utf8');

const newRoadmapLogic = `
function renderGamificationRoadmap() {
  const container = document.getElementById('roadmap-nodes-container');
  if (!container) return;
  container.innerHTML = '';
  
  // Make it a horizontal scrolling list (Battle Pass style)
  container.style.flexWrap = 'nowrap';
  container.style.justifyContent = 'flex-start';
  container.style.alignItems = 'center';
  container.style.minWidth = 'max-content';

  const svgLines = document.getElementById('roadmap-svg-lines');
  if (svgLines) svgLines.innerHTML = '';

  const unlockedIds = state.userStats.unlockedCards || [];
  
  // Create a background line
  const bgLine = document.createElement('div');
  bgLine.style.position = 'absolute';
  bgLine.style.top = '50%';
  bgLine.style.left = '40px';
  bgLine.style.right = '40px';
  bgLine.style.height = '4px';
  bgLine.style.background = 'rgba(255,255,255,0.1)';
  bgLine.style.zIndex = '0';
  bgLine.style.transform = 'translateY(-50%)';
  container.appendChild(bgLine);

  let firstLockedIndex = -1;

  CARDS_DATA.forEach((card, index) => {
    const isUnlocked = unlockedIds.includes(card.id);
    if (!isUnlocked && firstLockedIndex === -1) firstLockedIndex = index;
    
    const nodeWrapper = document.createElement('div');
    nodeWrapper.style.position = 'relative';
    nodeWrapper.style.margin = '0 20px';
    nodeWrapper.style.display = 'flex';
    nodeWrapper.style.flexDirection = 'column';
    nodeWrapper.style.alignItems = 'center';

    const nodeEl = document.createElement('div');
    nodeEl.className = \`roadmap-node \${isUnlocked ? 'unlocked' : 'locked'}\`;
    
    if (isUnlocked) {
      nodeEl.style.backgroundImage = \`url('\${card.image}')\`;
      nodeEl.onclick = () => openCardDetailModal(card);
    } else {
      nodeEl.innerHTML = '<i class="fa-solid fa-lock lock-icon"></i>';
      nodeEl.title = card.unlockMessage;
      nodeEl.onclick = () => alert(card.unlockMessage);
    }

    const label = document.createElement('div');
    label.className = 'node-label';
    label.textContent = card.subtopicId.replace('subtopic_', 'Topic ').replace('_', '.');

    nodeWrapper.appendChild(nodeEl);
    nodeWrapper.appendChild(label);
    container.appendChild(nodeWrapper);
  });

  // Calculate active line width based on unlocked cards
  const progressLine = document.createElement('div');
  progressLine.style.position = 'absolute';
  progressLine.style.top = '50%';
  progressLine.style.left = '40px';
  progressLine.style.height = '4px';
  progressLine.style.background = 'var(--primary)';
  progressLine.style.boxShadow = '0 0 10px var(--primary)';
  progressLine.style.zIndex = '1';
  progressLine.style.transform = 'translateY(-50%)';
  progressLine.style.transition = 'width 1s ease';
  
  // Roughly calculate width based on index
  if (unlockedIds.length > 0) {
    const nodeWidth = 120; // 80px node + 40px margin
    const fillIndex = firstLockedIndex === -1 ? CARDS_DATA.length - 1 : firstLockedIndex - 1;
    progressLine.style.width = \`\${(fillIndex * nodeWidth) + (nodeWidth / 2)}px\`;
  } else {
    progressLine.style.width = '0px';
  }
  
  container.appendChild(progressLine);
}

window.openCardDetailModal = function(card) {
  const modal = document.getElementById('card-detail-modal');
  if (!modal) return;
  
  // Set GPK Image on Front
  document.getElementById('detail-modal-front').style.backgroundImage = \`url('\${card.image}')\`;
  
  // Find matching Historical Bio for Back
  // The 'name' in KEY_FIGURES_BIO might be different, let's match via a simple lookup or name
  let bioFound = null;
  // Use card's subtopic and name to roughly find the person
  // For safety, we search KEY_FIGURES_BIO
  for (let key in window.KEY_FIGURES_BIO || {}) {
    const figure = window.KEY_FIGURES_BIO[key];
    // Check if figure name is in card name or vice versa (e.g. "Bargain Balfour" -> "Balfour")
    const lastName = figure.name.split(' ').pop();
    if (card.name.includes(lastName)) {
      bioFound = figure;
      break;
    }
  }

  // Fallbacks if not found directly
  const manualMap = {
    'card_balfour': 'balfour',
    'card_bengurion': 'benGurion',
    'card_hussein': 'hussein',
    'card_dayan': 'dayan',
    'card_nasser': 'nasser',
    'card_eshkol': 'eshkol',
    'card_golda': 'meir',
    'card_arafat': 'arafat',
    'card_sharon': 'sharon',
    'card_carter': 'carter',
    'card_rabin': 'rabin'
  };

  if (!bioFound && window.KEY_FIGURES_BIO) {
    bioFound = window.KEY_FIGURES_BIO[manualMap[card.id]];
  }

  document.getElementById('detail-modal-name').textContent = bioFound ? bioFound.name : card.name;
  document.getElementById('detail-modal-bio').textContent = bioFound ? bioFound.bio : card.description;
  
  // Find a question from this subtopic
  const questions = window.state ? window.state.allQuestions.filter(q => q.subtopicId === card.subtopicId) : [];
  const randomQ = questions.length > 0 ? questions[0].question : "What is their significance?";
  document.getElementById('detail-modal-question').textContent = randomQ;

  // Reset rotation
  document.getElementById('detail-modal-flipper').style.transform = 'rotateY(0deg)';

  // Show modal
  modal.style.display = 'flex';
  setTimeout(() => modal.style.opacity = '1', 10);
};

window.renderGamificationRoadmap = renderGamificationRoadmap;
`;

// Replace renderGarbagePailBinder with renderGamificationRoadmap
viewsCode = viewsCode.replace(/function renderGarbagePailBinder\(\) \{[\s\S]*?window\.renderGarbagePailBinder = renderGarbagePailBinder;/m, newRoadmapLogic);

// Change `renderGarbagePailBinder()` call to `renderGamificationRoadmap()` inside `renderKeyIndividualsView`
viewsCode = viewsCode.replace('renderGarbagePailBinder();', 'renderGamificationRoadmap();');

// Also filter the flip cards to ONLY show Supporting Figures
const filterLogic = `
  // Render Supporting Figures (those NOT in the GPK manual map)
  const gpkMap = ['balfour', 'benGurion', 'hussein', 'dayan', 'nasser', 'eshkol', 'meir', 'arafat', 'sharon', 'carter', 'rabin'];
  const activeFigures = Object.keys(KEY_FIGURES_BIO)
    .filter(key => !gpkMap.includes(key))
    .map(key => ({ key, ...KEY_FIGURES_BIO[key] }));
`;

viewsCode = viewsCode.replace('const activeFigures = Object.keys(KEY_FIGURES_BIO).map(key => ({ key, ...KEY_FIGURES_BIO[key] }));', filterLogic);
// If the original activeFigures line was already modified or different:
if (!viewsCode.includes('const gpkMap =')) {
  viewsCode = viewsCode.replace('activeFigures.forEach(item => {', `
  const gpkMap = ['balfour', 'benGurion', 'hussein', 'dayan', 'nasser', 'eshkol', 'meir', 'arafat', 'sharon', 'carter', 'rabin'];
  const supportingFigures = activeFigures.filter(item => !gpkMap.includes(item.key));
  supportingFigures.forEach(item => {
  `);
}

// Ensure KEY_FIGURES_BIO is attached to window so modal can read it easily
if (!viewsCode.includes('window.KEY_FIGURES_BIO = KEY_FIGURES_BIO;')) {
  viewsCode = viewsCode.replace('export const KEY_FIGURES_BIO = {', 'export const KEY_FIGURES_BIO = {\n');
  viewsCode += '\nwindow.KEY_FIGURES_BIO = KEY_FIGURES_BIO;\n';
}

fs.writeFileSync('src/views.js', viewsCode);
console.log("Updated views.js with Gamification Roadmap logic.");
