const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'great_war', 'app.js');
let appContent = fs.readFileSync(appJsPath, 'utf8');

const targetStr = "      html += `</div>`;\n      contentArea.innerHTML = html;";

const flashcardInjection = `
      // Flashcards
      if (lesson.flashcards && lesson.flashcards.length > 0) {
        html += \`
          <div class="flashcard-section">
            <h3><i class="fa-solid fa-layer-group"></i> Key Terms & Concepts</h3>
            <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
            <div class="flashcard-deck">
        \`;
        lesson.flashcards.forEach(fc => {
          html += \`
            <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
              <div class="flashcard-inner">
                <div class="flashcard-face flashcard-front">
                  <h4>\${fc.term}</h4>
                  <p>Tap to reveal</p>
                </div>
                <div class="flashcard-face flashcard-back">
                  \${fc.definition}
                </div>
              </div>
            </div>
          \`;
        });
        html += \`</div></div>\`;
      }
`;

appContent = appContent.replace(targetStr, flashcardInjection + targetStr);
fs.writeFileSync(appJsPath, appContent);
console.log("Flashcards injected into app.js.");
