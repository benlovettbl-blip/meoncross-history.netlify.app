const fs = require('fs');
let content = fs.readFileSync('src/views.js', 'utf8');

const targetStr = `export function triggerPackOpening(cardId) {
  const matchedCard = CARDS_DATA.find(c => c.id === cardId);
  if (!matchedCard) return;

  const overlay = document.getElementById('pack-opening-overlay');`;

const replaceStr = `export function triggerPackOpening(cardId) {
  const matchedCard = CARDS_DATA.find(c => c.id === cardId);
  if (!matchedCard) return;

  // Add to unlocked cards
  if (window.state && window.state.userStats) {
    if (!window.state.userStats.unlockedCards) {
      window.state.userStats.unlockedCards = [];
    }
    if (!window.state.userStats.unlockedCards.includes(cardId)) {
      window.state.userStats.unlockedCards.push(cardId);
      try {
        localStorage.setItem('edexcel_prefs_user_stats', JSON.stringify(window.state.userStats));
      } catch(e) {}
    }
  }

  const overlay = document.getElementById('pack-opening-overlay');`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/views.js', content);
console.log('Successfully updated triggerPackOpening logic in views.js.');
