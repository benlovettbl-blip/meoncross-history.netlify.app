const fs = require('fs');

function updateEMW() {
  const file = 'public/units/early_modern_world/data.js';
  let content = fs.readFileSync(file, 'utf8');

  const targetTitle = `"title": "Macro-History: Weighing the Evidence (1450 vs. 1750)",`;
  const blockIdx = content.indexOf(targetTitle);
  if (blockIdx !== -1) {
    const drawingTaskStr = `"tasks": [
        {
          "type": "drawing",
          "lines": 10,
          "question": "Drawing Task: Draw a single symbol or logo that you feel best represents the state of 18th-century Britain (e.g., a combination of a bank, a ship, and chains)."
        }
      ]`;
    const drawingTaskIdx = content.indexOf(drawingTaskStr, blockIdx);
    if (drawingTaskIdx !== -1) {
       // Look back to remove the comma
       let beforeTask = drawingTaskIdx - 1;
       while (content[beforeTask] === ' ' || content[beforeTask] === '\n' || content[beforeTask] === '\r') beforeTask--;
       let startIdx = drawingTaskIdx;
       if (content[beforeTask] === ',') {
          startIdx = beforeTask;
       }
       content = content.substring(0, startIdx) + content.substring(drawingTaskIdx + drawingTaskStr.length);
    }
  }

  // Also, we can remove the other bloat if needed, but the plan only specifically mentioned drawing task and tabs. 
  // Let's remove the Mudlarks block and London Sprawl block since they said "keep the Do Now, the essay planner table, and the final synthesis essay".
  // Actually, let's just remove the drawing task to be safe, as it explicitly mentioned the drawing task.

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated early_modern_world');
}

updateEMW();
