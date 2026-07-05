const fs = require('fs');
let content = fs.readFileSync('src/views.js', 'utf8');

const targetStr = `export function renderScumbagBinder() {
  const container = document.getElementById("scumbag-binder-grid");
  if (!container) return;
  container.innerHTML = "";

    const totalXP = (window.state && window.state.userStats && window.state.userStats.totalXP) || 0;

  CARDS_DATA.forEach((card, index) => {
    const requiredXP = (index + 1) * 200;
    const isUnlocked = totalXP >= requiredXP;`;

const replaceStr = `export function renderScumbagBinder() {
  const container = document.getElementById("scumbag-binder-grid");
  if (!container) return;
  container.innerHTML = "";

  const totalXP = (window.state && window.state.userStats && window.state.userStats.xp) || 0;
  const unlockedCards = (window.state && window.state.userStats && window.state.userStats.unlockedCards) || [];

  CARDS_DATA.forEach((card, index) => {
    const requiredXP = (index + 1) * 200;
    const hasEnoughXP = totalXP >= requiredXP;
    const isOpened = unlockedCards.includes(card.id);`;

content = content.replace(targetStr, replaceStr);

const targetStr2 = `    if (isUnlocked) {
      frontEl.className += " scumbag-card-unlocked";
      frontEl.style.backgroundImage = \`url('\${card.image}')\`;
      frontEl.innerHTML = '<div class="hologram"></div>';
    } else {
      frontEl.className += " scumbag-card-locked";
      frontEl.innerHTML = \`
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: linear-gradient(rgba(10, 10, 15, 0.85), rgba(10, 10, 15, 0.85)), url('assets/mr_lovett_wrapper.png?v=2'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px; color: white; text-align: center; border-radius: 12px; overflow: hidden;">
          <i class="fa-solid fa-lock" style="font-size: 2rem; color: #facc15; margin-bottom: 10px;"></i>
          <h3 style="margin-bottom: 5px;">Locked Pack</h3>
          <p style="font-size: 0.85rem;">Reach \${requiredXP} XP to unlock</p>
        </div>
      \`;
    }`;

const replaceStr2 = `    if (hasEnoughXP && isOpened) {
      frontEl.className += " scumbag-card-unlocked";
      frontEl.style.backgroundImage = \`url('\${card.image}')\`;
      frontEl.innerHTML = '<div class="hologram"></div>';
    } else if (hasEnoughXP && !isOpened) {
      frontEl.className += " scumbag-card-ready";
      frontEl.innerHTML = \`
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: url('assets/mr_lovett_wrapper.png?v=2'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px; color: white; text-align: center; border: 2px solid #facc15; box-shadow: 0 0 15px rgba(250, 204, 21, 0.5); animation: pulse 2s infinite; border-radius: 12px; overflow: hidden; cursor: pointer;">
          <div style="background: rgba(0,0,0,0.8); padding: 15px; border-radius: 8px; width: 100%; border: 1px solid #facc15;">
            <i class="fa-solid fa-gift" style="font-size: 2rem; margin-bottom: 10px; color: #facc15; animation: bounce 1s infinite;"></i>
            <h3 style="margin-bottom: 5px; color: #facc15; text-transform: uppercase;">Tap to Open!</h3>
          </div>
        </div>
      \`;
      frontEl.onclick = () => {
        if (window.triggerPackOpening) window.triggerPackOpening(card.id);
      };
    } else {
      frontEl.className += " scumbag-card-locked";
      frontEl.innerHTML = \`
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: linear-gradient(rgba(10, 10, 15, 0.85), rgba(10, 10, 15, 0.85)), url('assets/mr_lovett_wrapper.png?v=2'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px; color: white; text-align: center; border-radius: 12px; overflow: hidden;">
          <i class="fa-solid fa-lock" style="font-size: 2rem; color: #facc15; margin-bottom: 10px;"></i>
          <h3 style="margin-bottom: 5px;">Locked Pack</h3>
          <p style="font-size: 0.85rem;">Reach \${requiredXP} XP to unlock</p>
        </div>
      \`;
    }`;

content = content.replace(targetStr2, replaceStr2);

const targetStr3 = `    if (isUnlocked && card.stats) {`;
const replaceStr3 = `    if (hasEnoughXP && isOpened && card.stats) {`;
content = content.replace(targetStr3, replaceStr3);

const targetStr4 = `    if (isUnlocked) {
      wrapperEl.onclick = () => {
        AudioEngine.play('cardFlip');
        innerEl.classList.toggle('flipped');
      };
    }`;
const replaceStr4 = `    if (hasEnoughXP && isOpened) {
      wrapperEl.onclick = () => {
        AudioEngine.play('cardFlip');
        innerEl.classList.toggle('flipped');
      };
    }`;
content = content.replace(targetStr4, replaceStr4);

fs.writeFileSync('src/views.js', content);
console.log('Successfully updated renderScumbagBinder logic in views.js.');
