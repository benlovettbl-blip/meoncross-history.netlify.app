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

const lesson7 = data.lessons.find(l => l.id === 'lesson_7');
if (lesson7) {
  // Block 2: Fix Ghost Source B
  if (lesson7.narrative_blocks[2] && lesson7.narrative_blocks[2].tasks && lesson7.narrative_blocks[2].tasks[0]) {
    lesson7.narrative_blocks[2].tasks[0].question = "Based on Source B (Weighing the Evidence toggle tabs), identify one piece of political evidence that proves Britain was modern, and one piece of political evidence proving it was un-modern.";
    lesson7.narrative_blocks[2].tasks[0].text = lesson7.narrative_blocks[2].tasks[0].question;
  }
  
  // Block 4: Cull tasks (keep the Synthesis Challenge)
  if (lesson7.narrative_blocks[4] && lesson7.narrative_blocks[4].tasks) {
    lesson7.narrative_blocks[4].tasks = [lesson7.narrative_blocks[4].tasks[1]]; // Keep the second task
  }
  
  // Block 5: Fix Ghost Source E
  if (lesson7.narrative_blocks[5]) {
    lesson7.narrative_blocks[5].tasks = [
      {
        "type": "comprehension",
        "question": "Look at Source E. How does the map of London's urban sprawl visually represent the shift towards a modern, consumer-driven society?",
        "model_answer": "The map shows London expanding rapidly beyond its medieval walls, driven by new wealth, trade, and a growing population, which is a key characteristic of a modern, consumer-driven society."
      }
    ];
  }
  
  // Block 6: Historiographical Debate (Keep the one task)
  
  // Block 7: Synthesis Essay Planning Task (Keep it)
  
  // Block 9: Side Quest
  if (lesson7.narrative_blocks[9] && lesson7.narrative_blocks[9].tasks) {
    // Keep 1, 2
    lesson7.narrative_blocks[9].tasks = [
      lesson7.narrative_blocks[9].tasks[1],
      lesson7.narrative_blocks[9].tasks[2]
    ].filter(Boolean);
  }
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 7.');
