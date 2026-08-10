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

const l4Index = data.lessons.findIndex(l => l.id === 'lesson_4');
if (l4Index !== -1) {
  const l4Original = data.lessons[l4Index];
  
  // Clone to create 4a
  const lesson4a = JSON.parse(JSON.stringify(l4Original));
  lesson4a.id = 'lesson_4';
  lesson4a.title = "Lesson 4a. Who controlled Britain? The Ideological Battle";
  
  // Clone to create 4b
  const lesson4b = JSON.parse(JSON.stringify(l4Original));
  lesson4b.id = 'lesson_4b';
  lesson4b.title = "Lesson 4b. Who controlled Britain? The Economic Shift";
  
  // --- Configure 4a ---
  // Keep blocks: 0, 1, 3, 6, 8
  lesson4a.narrative_blocks = [
    l4Original.narrative_blocks[0], // Micro-history Executioner
    l4Original.narrative_blocks[1], // Three-Way Tug of War
    l4Original.narrative_blocks[3], // King vs Merchants (Sources B, C, D)
    l4Original.narrative_blocks[6], // Debate (Source F)
    l4Original.narrative_blocks[8], // Diggers (Source G)
    {
      "title": "Lesson Reflection",
      "text": "It is time to synthesize your understanding of the ideological and physical battles of the English Civil War.",
      "tasks": [
        {
          "type": "extended",
          "text": "Lesson Reflection: Was the English Civil War a true revolution that gave power to the people, or just a transfer of power from the King to wealthy Parliamentarians?",
          "model": "A strong answer should explain how the Divine Right of Kings was destroyed, but note that radical groups like the Diggers were crushed, meaning true power just shifted to wealthy merchants and landowners rather than ordinary people."
        }
      ]
    }
  ];
  
  // Cull tasks in 4a
  // Block 3 (index 2 in new array)
  lesson4a.narrative_blocks[2].tasks = lesson4a.narrative_blocks[2].tasks.slice(0, 2);
  // Block 6 (index 3 in new array)
  lesson4a.narrative_blocks[3].tasks = [lesson4a.narrative_blocks[3].tasks[0]];
  // Block 8 (index 4 in new array)
  lesson4a.narrative_blocks[4].tasks = lesson4a.narrative_blocks[4].tasks.slice(0, 2);

  
  // --- Configure 4b ---
  // Keep blocks: 2, 4, 5, 7
  lesson4b.narrative_blocks = [
    l4Original.narrative_blocks[2], // Financial Hub (Source A)
    l4Original.narrative_blocks[4], // Great Seal (Source E)
    l4Original.narrative_blocks[5], // Historical Interpretations
    l4Original.narrative_blocks[7]  // Lesson Reflection
  ];
  
  // Remove "Source A" formal ghost label from Financial hub? 
  // No, the instruction was: "Ensure Sources A and E are formally interrogated by tasks in their respective new lessons."
  // Wait, Source A (Financial Hub) HAS a task: "How did the visual appearance of London change..."
  // Let's make sure it explicitly mentions Source A.
  lesson4b.narrative_blocks[0].tasks[0].question = "Based on Source A, how did the visual appearance of London change as it became a global financial hub?";
  lesson4b.narrative_blocks[0].tasks[0].text = lesson4b.narrative_blocks[0].tasks[0].question;
  
  // Source E task:
  lesson4b.narrative_blocks[1].tasks[0].question = "Look at Source E. What did the design of the 1651 Great Seal signal about Britain's new priorities compared to the previous 600 years?";
  lesson4b.narrative_blocks[1].tasks[0].text = lesson4b.narrative_blocks[1].tasks[0].question;
  
  // Cull tasks in 4b
  // Block 5 (index 2 in new array)
  lesson4b.narrative_blocks[2].tasks = [lesson4b.narrative_blocks[2].tasks[0]];
  
  // Replace original lesson 4 with 4a, and insert 4b right after
  data.lessons.splice(l4Index, 1, lesson4a, lesson4b);
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully split Lesson 4 into 4a and 4b.');
