const fs = require('fs');

let content = fs.readFileSync('src/core_app.js', 'utf-8');

const corruptedBlock = \`export function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
        remainingSeconds: defaultMinutes * 60,
        interval: null,
        isRunning: false
      };
      updateTimerDisplay(cardId);
    }
  } else {
    container.style.display = 'none';
  }
};\`;

const fixedBlock = \`export function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return "/units/" + window.currentUnitId + "/" + path;
  }
  return path;
}

window.toggleExamTimer = function(cardId, defaultMinutes = 15) {
  const container = document.getElementById('exam-timer-container-' + cardId);
  if (!container) return;
  if (container.style.display === 'none' || !container.style.display) {
    container.style.display = 'block';
    if (!window.examTimers) window.examTimers = {};
    if (!window.examTimers[cardId]) {
      window.examTimers[cardId] = {
        totalSeconds: defaultMinutes * 60,
        remainingSeconds: defaultMinutes * 60,
        interval: null,
        isRunning: false
      };
      updateTimerDisplay(cardId);
    }
  } else {
    container.style.display = 'none';
  }
};\`;

content = content.replace(corruptedBlock, fixedBlock);

const dupImport = "import { initEventDelegation } from './engine/events.js';";
content = content.replace(dupImport + "\\r\\n" + dupImport, dupImport);
content = content.replace(dupImport + "\\n" + dupImport, dupImport);

fs.writeFileSync('src/core_app.js', content);
console.log("Fixed core_app.js");
