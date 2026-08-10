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

const lesson6 = data.lessons.find(l => l.id === 'lesson_6');
if (lesson6) {
  // Block 2
  if (lesson6.narrative_blocks[2] && lesson6.narrative_blocks[2].tasks) {
    // Keep 0, 2
    lesson6.narrative_blocks[2].tasks = [
      lesson6.narrative_blocks[2].tasks[0],
      lesson6.narrative_blocks[2].tasks[2]
    ].filter(Boolean);
  }
  
  // Block 3
  if (lesson6.narrative_blocks[3] && lesson6.narrative_blocks[3].tasks) {
    // Modify task to include Source D and cull others
    const newTasks = [];
    if (lesson6.narrative_blocks[3].tasks[2]) {
      lesson6.narrative_blocks[3].tasks[2].question = "Based on Source D, why did the Stono Rebellion terrify the British planter class, and what was the immediate goal of the rebels?";
      lesson6.narrative_blocks[3].tasks[2].text = lesson6.narrative_blocks[3].tasks[2].question;
      lesson6.narrative_blocks[3].tasks[2].model_answer = "The rebels sought immediate freedom by marching to Spanish Florida. It terrified the planters because it proved enslaved people were capable of organizing armed, military-style uprisings against their oppressors.";
      lesson6.narrative_blocks[3].tasks[2].model = lesson6.narrative_blocks[3].tasks[2].model_answer;
      newTasks.push(lesson6.narrative_blocks[3].tasks[2]);
    }
    if (lesson6.narrative_blocks[3].tasks[3]) {
      newTasks.push(lesson6.narrative_blocks[3].tasks[3]);
    }
    lesson6.narrative_blocks[3].tasks = newTasks;
  }
  
  // Block 4
  if (lesson6.narrative_blocks[4] && lesson6.narrative_blocks[4].tasks) {
    // Keep 0, 2
    lesson6.narrative_blocks[4].tasks = [
      lesson6.narrative_blocks[4].tasks[0],
      lesson6.narrative_blocks[4].tasks[2]
    ].filter(Boolean);
  }
  
  // Block 5 (Side Quest)
  if (lesson6.narrative_blocks[5] && lesson6.narrative_blocks[5].tasks) {
    lesson6.narrative_blocks[5].tasks = [lesson6.narrative_blocks[5].tasks[2]].filter(Boolean);
  }
  
  // Add Lesson Reflection
  lesson6.narrative_blocks.push({
    "title": "Lesson Reflection",
    "text": "It is time to synthesize your understanding of how enslaved Africans resisted the Transatlantic Slave Trade.",
    "tasks": [
      {
        "type": "extended",
        "text": "Lesson Reflection: Why is it historically inaccurate and damaging to claim that the abolition of the slave trade was purely the result of benevolent white politicians like William Wilberforce?",
        "model": "A strong answer should explain that this 'white savior' narrative ignores the centuries of relentless resistance by enslaved people themselves (both covert sabotage and overt rebellions like Stono), as well as the economic factors (like the declining profitability of sugar) that historians like Eric Williams argue were the true catalysts for abolition."
      }
    ]
  });
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Lesson 6.');
