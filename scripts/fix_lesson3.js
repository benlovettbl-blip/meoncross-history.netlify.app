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

const lesson3 = data.lessons.find(l => l.id === 'lesson_3');
if (lesson3) {
  // 1. Ghost Source A (Block 1)
  if (lesson3.narrative_blocks[1]) {
    delete lesson3.narrative_blocks[1].source_letter;
  }
  
  // 2. Cull tasks
  if (lesson3.narrative_blocks[2] && lesson3.narrative_blocks[2].tasks) {
    lesson3.narrative_blocks[2].tasks = lesson3.narrative_blocks[2].tasks.slice(0, 2);
  }
  
  if (lesson3.narrative_blocks[3]) {
    lesson3.narrative_blocks[3].tasks = [];
  }
  
  if (lesson3.narrative_blocks[5] && lesson3.narrative_blocks[5].tasks) {
    lesson3.narrative_blocks[5].tasks = [lesson3.narrative_blocks[5].tasks[0]];
  }
  
  if (lesson3.narrative_blocks[7] && lesson3.narrative_blocks[7].tasks) {
    lesson3.narrative_blocks[7].tasks = [lesson3.narrative_blocks[7].tasks[2]]; // Keep the third one
  }
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 3.');
