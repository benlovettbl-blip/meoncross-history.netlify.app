const fs = require('fs');

let content = fs.readFileSync('src/core_app.js', 'utf-8');

const corruptedBlock = "export function getAssetUrl(path) {\n" +
"  if (!path) return path;\n" +
"  if (path.startsWith('http') || path.startsWith('/')) return path;\n" +
"  if (window.currentUnitId) {\n" +
"        remainingSeconds: defaultMinutes * 60,\n" +
"        interval: null,\n" +
"        isRunning: false\n" +
"      };\n" +
"      updateTimerDisplay(cardId);\n" +
"    }\n" +
"  } else {\n" +
"    container.style.display = 'none';\n" +
"  }\n" +
"};";

const fixedBlock = "export function getAssetUrl(path) {\n" +
"  if (!path) return path;\n" +
"  if (path.startsWith('http') || path.startsWith('/')) return path;\n" +
"  if (window.currentUnitId) {\n" +
"    return '/units/' + window.currentUnitId + '/' + path;\n" +
"  }\n" +
"  return path;\n" +
"}\n" +
"\n" +
"window.toggleExamTimer = function(cardId, defaultMinutes = 15) {\n" +
"  const container = document.getElementById('exam-timer-container-' + cardId);\n" +
"  if (!container) return;\n" +
"  if (container.style.display === 'none' || !container.style.display) {\n" +
"    container.style.display = 'block';\n" +
"    if (!window.examTimers) window.examTimers = {};\n" +
"    if (!window.examTimers[cardId]) {\n" +
"      window.examTimers[cardId] = {\n" +
"        totalSeconds: defaultMinutes * 60,\n" +
"        remainingSeconds: defaultMinutes * 60,\n" +
"        interval: null,\n" +
"        isRunning: false\n" +
"      };\n" +
"      updateTimerDisplay(cardId);\n" +
"    }\n" +
"  } else {\n" +
"    container.style.display = 'none';\n" +
"  }\n" +
"};";

content = content.replace(corruptedBlock, fixedBlock);
content = content.replace(corruptedBlock.replace(/\n/g, '\r\n'), fixedBlock);

const dupImport = "import { initEventDelegation } from './engine/events.js';";
content = content.replace(dupImport + "\r\n" + dupImport, dupImport);
content = content.replace(dupImport + "\n" + dupImport, dupImport);

fs.writeFileSync('src/core_app.js', content);
console.log("Fixed core_app.js");
