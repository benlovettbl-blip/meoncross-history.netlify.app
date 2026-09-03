const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Parse the content
const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let unitData;
try {
  unitData = eval('(function(){ return ' + jsonStr + ';})()');
} catch (e) {
  console.error("Failed to parse", e);
  process.exit(1);
}

unitData.lessons.forEach(lesson => {
  // 1. Find and move `extended`
  let extendedBlockIndex = lesson.narrative_blocks.findIndex(b => b.extended);
  if (extendedBlockIndex !== -1) {
    lesson.extended = lesson.narrative_blocks[extendedBlockIndex].extended;
    // Delete the block entirely
    lesson.narrative_blocks.splice(extendedBlockIndex, 1);
  }

  // 2. Move lesson.tasks[0] to narrative_blocks as "Lesson Reflection"
  if (lesson.tasks && lesson.tasks.length > 0) {
    let reflectionTask = lesson.tasks[0];
    
    // Create new block
    let reflectionBlock = {
      title: "Lesson Reflection",
      tasks: [reflectionTask]
    };
    
    // Find side quest index to insert before it
    let sideQuestIndex = lesson.narrative_blocks.findIndex(b => b.title && b.title.includes("Side Quest:"));
    if (sideQuestIndex !== -1) {
      lesson.narrative_blocks.splice(sideQuestIndex, 0, reflectionBlock);
    } else {
      lesson.narrative_blocks.push(reflectionBlock);
    }
    
    // Delete lesson.tasks entirely
    delete lesson.tasks;
  }
});

// 3. Fix mismatched source letters
let l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2) {
  let b2_opposing = l2.narrative_blocks.find(b => b.title === 'Opposing Views: A Queen and a Captive (Part 1)');
  if (b2_opposing) delete b2_opposing.source_letter;
  let b2_scurvy = l2.narrative_blocks.find(b => b.title && b.title.includes('Horrors of Scurvy'));
  if (b2_scurvy && b2_scurvy.source_letter === 'G') b2_scurvy.source_letter = 'F';
}

let l3 = unitData.lessons.find(l => l.id === 'lesson_3');
if (l3) {
  let b3_justifying = l3.narrative_blocks.find(b => b.title && b.title.includes('Justifying Empire'));
  if (b3_justifying) delete b3_justifying.source_letter; 
  let b3_pigs = l3.narrative_blocks.find(b => b.title && b.title.includes('Invasion of the Pigs'));
  if (b3_pigs && b3_pigs.source_letter === 'E') b3_pigs.source_letter = 'G';
}

let l4 = unitData.lessons.find(l => l.id === 'lesson_4');
if (l4) {
  let b4_power = l4.narrative_blocks.find(b => b.title && b.title.includes('Investigating Power'));
  if (b4_power) delete b4_power.source_letter; 
  let b4_debate = l4.narrative_blocks.find(b => b.title && b.title.includes('Historiographical Debate'));
  if (b4_debate) b4_debate.source_letter = 'F';
}

let l6 = unitData.lessons.find(l => l.id === 'lesson_6');
if (l6) {
  let b6_voices = l6.narrative_blocks.find(b => b.title && b.title.includes('Voices of Resistance'));
  if (b6_voices) delete b6_voices.source_letter;
}

// Serialize the data back safely
const finalContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataPath, finalContent, 'utf8');
console.log("Successfully patched early_modern_world/data.js");
