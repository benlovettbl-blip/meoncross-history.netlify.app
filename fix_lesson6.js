const fs = require('fs');

async function fixLesson6() {
  const dataPath = 'early_modern_world/data.js';
  const content = fs.readFileSync(dataPath, 'utf8');
  
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData;
  const lesson6 = data.lessons.find(l => l.title.includes('1750'));
  
  if (!lesson6) return;
  
  // Find the index of the side quest
  const sideQuestIndex = lesson6.narrative_blocks.findIndex(b => b.title.includes('Side Quest'));
  if (sideQuestIndex !== -1) {
     const sideQuest = lesson6.narrative_blocks.splice(sideQuestIndex, 1)[0];
     // Insert it after block 0
     lesson6.narrative_blocks.splice(1, 0, sideQuest);
  }
  
  // Remove hardcoded qNum
  if (lesson6.tasks && lesson6.tasks.length > 0) {
     delete lesson6.tasks[0].qNum;
  }
  
  // Generate the new string
  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(dataPath, output);
  console.log("Fixed lesson 6 structure in early_modern_world/data.js");
}

fixLesson6().catch(console.error);
