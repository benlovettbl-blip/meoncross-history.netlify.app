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

const lesson5 = data.lessons.find(l => l.id === 'lesson_5');
if (lesson5) {
  // Block 0
  if (lesson5.narrative_blocks[0] && lesson5.narrative_blocks[0].tasks) {
    // Keep 0, 1, 3
    lesson5.narrative_blocks[0].tasks = [
      lesson5.narrative_blocks[0].tasks[0],
      lesson5.narrative_blocks[0].tasks[1],
      lesson5.narrative_blocks[0].tasks[3]
    ].filter(Boolean);
  }
  
  // Block 1 (Ghost Source B fix)
  if (lesson5.narrative_blocks[1] && lesson5.narrative_blocks[1].tasks && lesson5.narrative_blocks[1].tasks[0]) {
    lesson5.narrative_blocks[1].tasks[0].question = "Based on Source B (the flowchart), what specific goods were exchanged for enslaved Africans in West Africa?";
    lesson5.narrative_blocks[1].tasks[0].text = lesson5.narrative_blocks[1].tasks[0].question;
  }
  
  // Block 2
  if (lesson5.narrative_blocks[2] && lesson5.narrative_blocks[2].tasks) {
    // Keep 0, 1, 3
    lesson5.narrative_blocks[2].tasks = [
      lesson5.narrative_blocks[2].tasks[0],
      lesson5.narrative_blocks[2].tasks[1],
      lesson5.narrative_blocks[2].tasks[3]
    ].filter(Boolean);
  }
  
  // Block 3
  if (lesson5.narrative_blocks[3] && lesson5.narrative_blocks[3].tasks) {
    // Keep only the first task
    lesson5.narrative_blocks[3].tasks = [lesson5.narrative_blocks[3].tasks[0]].filter(Boolean);
  }
  
  // Add Lesson Reflection block
  lesson5.narrative_blocks.push({
    "title": "Lesson Reflection",
    "text": "It is time to synthesize your understanding of the mechanics of the Transatlantic slave trade.",
    "tasks": [
      {
        "type": "extended",
        "text": "Lesson Reflection: How did the reality of the Transatlantic Slave Trade and the brutal 'death camp' model of the Caribbean sugar plantations challenge the idea that 18th-century Britain was a 'modern', enlightened, and civilized society?",
        "model": "A strong answer should contrast the wealth and apparent civilization of London's financial hubs with the barbaric, industrialized violence that produced that wealth, noting how absentee landlords willingly ignored the brutality to secure their profits."
      }
    ]
  });
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 5.');
