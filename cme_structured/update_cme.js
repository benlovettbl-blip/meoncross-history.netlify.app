const fs = require('fs');
const viewsPath = 'src/views.js';
let content = fs.readFileSync(viewsPath, 'utf8');

const targetStr = `  const unlockedIds = state.userStats.unlockedCards || [];

  CARDS_DATA.forEach(card => {
    const isUnlocked = unlockedIds.includes(card.id);

    const wrapperEl = document.createElement("div");
    wrapperEl.className = "scumbag-card-container scumbag-flippable";

    const innerEl = document.createElement("div");
    innerEl.className = "scumbag-flip-card-inner";

    // Front Face
    const frontEl = document.createElement("div");
    frontEl.className = "scumbag-flip-card-front";
    if (isUnlocked) {
      frontEl.className += " scumbag-card-unlocked";
      frontEl.style.backgroundImage = \`url('\${card.image}')\`;
      frontEl.innerHTML = '<div class="hologram"></div>';
    } else {
      frontEl.className += " scumbag-card-locked";
      frontEl.innerHTML = \`
        <i class="fa-solid fa-lock" style="font-size: 2rem; color: rgba(255,255,255,0.2); margin-bottom: 10px;"></i>
        <div class="locked-hint">
          \${card.unlockMessage}
        </div>
      \`;
    }`;

const replacementStr = `  const totalXP = (window.state && window.state.userStats && window.state.userStats.totalXP) || 0;

  CARDS_DATA.forEach((card, index) => {
    const requiredXP = (index + 1) * 200;
    const isUnlocked = totalXP >= requiredXP;

    const wrapperEl = document.createElement("div");
    wrapperEl.className = "scumbag-card-container scumbag-flippable";

    const innerEl = document.createElement("div");
    innerEl.className = "scumbag-flip-card-inner";

    // Front Face
    const frontEl = document.createElement("div");
    frontEl.className = "scumbag-flip-card-front";
    if (isUnlocked) {
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

if(content.includes('unlockedIds.includes(card.id)')) {
    // using regex in case of slight whitespace diffs
    content = content.replace(/const unlockedIds = state\.userStats\.unlockedCards \|\| \[\];[\s\S]*?\${card\.unlockMessage}\s*<\/div>\s*`;\s*}/, replacementStr);
    fs.writeFileSync(viewsPath, content, 'utf8');
    console.log("Successfully updated Trading Cards logic in CME app.");
} else {
    console.log("Could not find target logic to replace. Maybe already done?");
}
