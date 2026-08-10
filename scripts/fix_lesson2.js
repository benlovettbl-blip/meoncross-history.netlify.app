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

const lesson2 = data.lessons.find(l => l.id === 'lesson_2');
if (lesson2) {
  // 1. Ghost Source A (Block 1)
  if (lesson2.narrative_blocks[1]) {
    delete lesson2.narrative_blocks[1].source_letter;
  }
  
  // 2. Cull tasks
  // Block 5: Keep only the first task (compare B and C)
  if (lesson2.narrative_blocks[5] && lesson2.narrative_blocks[5].tasks) {
    lesson2.narrative_blocks[5].tasks = [lesson2.narrative_blocks[5].tasks[0]];
  }
  
  // Block 7: Keep only the first task (revisionist view)
  if (lesson2.narrative_blocks[7] && lesson2.narrative_blocks[7].tasks) {
    lesson2.narrative_blocks[7].tasks = [lesson2.narrative_blocks[7].tasks[0]];
  }
  
  // Block 9: Keep only the "glory vs reality" task
  if (lesson2.narrative_blocks[9] && lesson2.narrative_blocks[9].tasks) {
    lesson2.narrative_blocks[9].tasks = [lesson2.narrative_blocks[9].tasks[2]]; // The third task
  }
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 2.');
