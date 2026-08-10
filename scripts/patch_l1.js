const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Parse the content
const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let data;
try {
  data = JSON.parse(jsonStr);
} catch(e) {
  // If JSON.parse fails, try eval
  data = eval(`(${jsonStr})`);
}

const lesson1 = data.lessons.find(l => l.id === 'lesson_1');

if (lesson1) {
  // Fix 1: The Key Individual tags in block 4 (Silk Road & Ming China)
  if (lesson1.narrative_blocks[4]) {
    lesson1.narrative_blocks[4].text = lesson1.narrative_blocks[4].text.replace(/\[Key Individual: Admiral \[Key Individual: Admiral \[Key Individual: Admiral Zheng He\]\]\]/g, '[Key Individual: Admiral Zheng He]');
    // Also fix Christopher Columbus
    lesson1.narrative_blocks[4].text = lesson1.narrative_blocks[4].text.replace(/\[Key Individual: Christopher Columbus\]/g, '[Key Individual: Christopher Columbus]');
  }

  // Fix 2: Re-sequence tasks and match source letters
  
  // Block 1: The Fall of Constantinople (Task about fall of Constantinople)
  // This is correct.
  
  // Block 2: Analyzing the Evidence: Source A (Kritovoulos)
  // Let's ensure it has Source A letter. It doesn't use `source_letter`, it's hardcoded in text.
  // Wait, task here is asking about Sources D and E! Let's delete this task, it belongs elsewhere.
  const taskDandE = lesson1.narrative_blocks[2].tasks.pop();
  
  // Block 3: Macro-History: The Wealth of the East (Source B - Canton)
  // Task is: "Based on Source B, how does the reality of the Thirteen Factories..." - this is correct.
  lesson1.narrative_blocks[3].source_letter = "B";

  // Block 4: Macro-History: The Real Centers of Wealth in 1450 (Ottomans)
  // No tasks. Let's make it Source C.
  lesson1.narrative_blocks[4].source_letter = "C";
  
  // Block 5: West Africa: Kingdoms of Gold and Brass (Benin/Mali)
  // Has images of Benin Bronze and Catalan Atlas.
  // We can label Benin Bronze as Source D and Catalan Atlas as Source E.
  if (lesson1.narrative_blocks[5].images && lesson1.narrative_blocks[5].images.length > 0) {
    lesson1.narrative_blocks[5].images[0].source_letter = "E"; // Catalan Atlas
  }
  lesson1.narrative_blocks[5].source_letter = "D"; // Benin Bronze

  // Block 6: Analyzing the Evidence (Adapted from Catalan Atlas)
  // This has the Source E text. Wait, text says "Source D: A European Description..."
  // Let's change the text to match "Source E" if Catalan Atlas is E.
  lesson1.narrative_blocks[6].text = lesson1.narrative_blocks[6].text.replace('Source D:', 'Source E:');
  
  // Now we can put the "D and E" task here!
  if (taskDandE) {
    taskDandE.text = "What impression do Sources D and E give about the balance of power between Europe and the rest of the world in the 15th century?";
    taskDandE.model = "Both sources suggest that Europe was relatively weak and poor compared to non-European powers. Source D (Benin Bronze) shows highly advanced metallurgical skills that rivalled Europe, while Source E highlights how European merchants were desperate to travel vast distances just to obtain a 'fraction' of West Africa's staggering wealth.";
    lesson1.narrative_blocks[6].tasks = [taskDandE];
  }

  // Block 7: The Silk Road & Ming China
  // We already fixed Zheng He.
  
  // Block 8: Historical Interpretations: The Eurocentric Myth (Frankopan)
  // This has the class debate task. This is fine.
  
  // Block 9: Lesson Reflection
  // This is fine.

  // Block 10: Side Quest (Peasant's Pottage)
  // This is fine.
}

// Write back to file
const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully patched data.js');
