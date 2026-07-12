import fs from 'fs';

let storageCode = fs.readFileSync('src/storage.js', 'utf8');

// Add import
if (!storageCode.includes("import { CARDS_DATA }")) {
  storageCode = storageCode.replace("import { state } from './state.js';", "import { state } from './state.js';\nimport { CARDS_DATA } from './cards_data.js';");
}

// Add the unlock logic
const unlockLogic = `
      if (masteredInSubtopic.length === subtopicQuestions.length) {
        AudioEngine.play('cheer');
        Confetti.spawn(100);

        // CHECK GAMIFICATION CARD UNLOCKS
        const matchedCard = CARDS_DATA.find(c => c.subtopicId === question.subtopicId);
        if (matchedCard && !state.userStats.unlockedCards.includes(matchedCard.id)) {
          state.userStats.unlockedCards.push(matchedCard.id);
          saveProgress();
          
          // Trigger Pack Opening UI
          const overlay = document.getElementById('pack-opening-overlay');
          const cardImg = document.getElementById('pack-opening-card-image');
          if (overlay && cardImg) {
            cardImg.style.backgroundImage = \`url('\${matchedCard.image}')\`;
            overlay.classList.add('active');
            
            // Re-render binder if currently on that view
            if (window.renderGarbagePailBinder) {
              window.renderGarbagePailBinder();
            }
          }
        }
      }
`;

storageCode = storageCode.replace(
  /if \(masteredInSubtopic\.length === subtopicQuestions\.length\) {\s*AudioEngine\.play\('cheer'\);\s*Confetti\.spawn\(100\);\s*}/g,
  unlockLogic
);

fs.writeFileSync('src/storage.js', storageCode);
console.log("Updated storage.js with GPK unlock logic.");
