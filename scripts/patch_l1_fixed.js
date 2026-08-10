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

const lesson1 = data.lessons.find(l => l.id === 'lesson_1');

if (lesson1) {
  // Clear tasks for blocks 2, 3, 4, 5, 6, 7 that might be messed up
  for (let i = 2; i <= 7; i++) {
    if (lesson1.narrative_blocks[i]) {
      lesson1.narrative_blocks[i].tasks = [];
    }
  }

  // Find the original tasks we want to preserve/re-insert:
  
  // 1. Canton task
  const cantonTask = {
    "type": "comprehension",
    "question": "Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
    "model_answer": "It shows that Europeans did not dominate trade; instead, they were forced into small, heavily regulated zones (the Thirteen Factories) by the powerful Chinese Emperor, showing that Asian empires held the true economic power and dictated the terms of trade."
  };

  // 2. West Africa Sources D & E task
  const africaTask = {
    "type": "comprehension",
    "question": "What impression do Sources D and E give about the balance of power between Europe and the rest of the world in the 15th century?",
    "model_answer": "Both sources suggest that Europe was relatively weak and poor compared to non-European powers. Source D (Benin Bronze) shows highly advanced metallurgical skills that rivalled Europe, while Source E highlights how European merchants were desperate to travel vast distances just to obtain a 'fraction' of West Africa's staggering wealth."
  };

  // Assign them to the correct blocks.
  // Block 3 is "Macro-History: The Wealth of the East" (Canton)
  lesson1.narrative_blocks[3].tasks = [cantonTask];

  // Block 5 is "West Africa: Kingdoms of Gold and Brass" (Has the Benin Bronze and Catalan Atlas)
  // Wait, Benin Bronze is block 5, Catalan Atlas text is block 6.
  // We can put the task in Block 6.
  lesson1.narrative_blocks[6].tasks = [africaTask];
  
  // Make sure Source D is on block 5 and Source E is on block 6
  // Check the title of block 5
  if (lesson1.narrative_blocks[5].title.includes("West Africa")) {
    lesson1.narrative_blocks[5].source_letter = "D"; // Benin Bronze is in this block
  }
  
  // Block 6 is "Analyzing the Evidence: The Wealth of West Africa" (or similar)
  if (lesson1.narrative_blocks[6].title.includes("Analyzing the Evidence")) {
    // The text contains Catalan Atlas
    lesson1.narrative_blocks[6].source_letter = "E";
  }

}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully patched data.js with strict task assignment');
