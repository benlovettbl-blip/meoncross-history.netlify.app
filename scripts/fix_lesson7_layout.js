const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let data;
try {
  data = JSON.parse(jsonStr);
} catch(e) {
  data = eval(`(${jsonStr})`);
}

// In the new numbering, this is lesson_7
const lesson7 = data.lessons.find(l => l.id === 'lesson_7');
if (lesson7) {
  // Fix the broken image in the Stono Rebellion block (should be block 3)
  const stonoBlock = lesson7.narrative_blocks.find(b => b.title && b.title.includes('Stono Rebellion'));
  if (stonoBlock) {
    stonoBlock.image = '/images/stono_rebellion_map.png';
  }

  // Find the Plenary Check block and remove it
  const plenaryIndex = lesson7.narrative_blocks.findIndex(b => b.title && b.title.includes('Plenary Check'));
  if (plenaryIndex !== -1) {
    lesson7.narrative_blocks.splice(plenaryIndex, 1);
  }

  // Find the Side Quest block and move it to the end
  const sideQuestIndex = lesson7.narrative_blocks.findIndex(b => b.title && b.title.includes('Side Quest'));
  if (sideQuestIndex !== -1) {
    const sideQuestBlock = lesson7.narrative_blocks.splice(sideQuestIndex, 1)[0];
    lesson7.narrative_blocks.push(sideQuestBlock);
  }
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 7 layout and image.');
