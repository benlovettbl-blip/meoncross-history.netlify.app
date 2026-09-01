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
  // Reset all tasks and source letters for blocks 1-9 to clean the slate
  for (let i = 1; i <= 9; i++) {
    if (lesson1.narrative_blocks[i]) {
      lesson1.narrative_blocks[i].tasks = [];
      delete lesson1.narrative_blocks[i].source_letter;
      if (lesson1.narrative_blocks[i].images) {
        lesson1.narrative_blocks[i].images.forEach(img => delete img.source_letter);
      }
    }
  }

  // --- REASSIGN SOURCES CORRECTLY ---
  // Block 1 (Constantinople text) -> already hardcoded "Source A" in text, no need to set.
  // Block 2 (Canton image)
  lesson1.narrative_blocks[2].source_letter = "B";
  // Block 3 (Ottoman image)
  lesson1.narrative_blocks[3].source_letter = "C";
  // Block 4 (West Africa Benin Bronze)
  lesson1.narrative_blocks[4].source_letter = "D";
  // Block 5 (West Africa Catalan Atlas Text)
  lesson1.narrative_blocks[5].source_letter = "E";
  // Fix the text of Block 5 to say "Source E" instead of "Source D"
  lesson1.narrative_blocks[5].text = lesson1.narrative_blocks[5].text.replace("Source D:", "Source E:");
  // Block 9 (Side Quest Peasant)
  lesson1.narrative_blocks[9].source_letter = "F";

  // --- REASSIGN TASKS CORRECTLY ---
  
  // Block 2: Canton task
  lesson1.narrative_blocks[2].tasks = [{
    "type": "comprehension",
    "question": "Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
    "model_answer": "It shows that Europeans did not dominate trade; instead, they were forced into small, heavily regulated zones (the Thirteen Factories) by the powerful Chinese Emperor, showing that Asian empires held the true economic power and dictated the terms of trade."
  }];

  // Block 5: West Africa task (Sources D and E)
  lesson1.narrative_blocks[5].tasks = [{
    "type": "comprehension",
    "question": "What impression do Sources D and E give about the balance of power between Europe and the rest of the world in the 15th century?",
    "model_answer": "Both sources suggest that Europe was relatively weak and poor compared to non-European powers. Source D (Benin Bronze) shows highly advanced metallurgical skills that rivalled Europe, while Source E highlights how European merchants were desperate to travel vast distances just to obtain a 'fraction' of West Africa's staggering wealth."
  }];

  // Block 7: Eurocentric Myth
  lesson1.narrative_blocks[7].tasks = [
    {
      "type": "debate",
      "text": "Class Debate: Based on Professor Frankopan's argument, why might traditional European textbooks have deliberately ignored the wealth of the East in 1450?",
      "model": "Traditional textbooks may have minimized Eastern wealth to justify later European imperialism, creating a narrative where Europe 'civilized' the rest of the world rather than acknowledging that Europe was initially an isolated, desperate outpost seeking access to superior Eastern economies."
    }
  ];

  // Block 8: Lesson Reflection
  lesson1.narrative_blocks[8].tasks = [
    {
      "qNum": 11,
      "text": "Lesson Reflection: Looking at the state of the world in 1450, why might a historian argue that Europe was actually on the periphery of global power rather than at its center?",
      "model": "A strong answer should reference the immense wealth of the Ming Dynasty in China, the military dominance of the Ottoman Empire, or the vast riches of African kingdoms like Mali or Benin, contrasting these with the relative poverty, isolation, and basic agricultural lifestyle of European peasants."
    }
  ];

  // Block 9: Side Quest
  lesson1.narrative_blocks[9].tasks = [
    {
      "type": "comprehension",
      "question": "How does the evidence in Source F and the description of the peasant's 'pottage' contrast with the lives of the Oba of Benin or the Ming Emperor?",
      "model_answer": "Unlike the Oba of Benin with his bronze plaques or the Ming Emperor in silk, the English peasant lived in poverty in a dark mud hut, relying on a bland stew just to survive."
    },
    {
      "type": "comprehension",
      "question": "Why does this evidence support the idea that Europe was an 'isolated outpost' in 1450?",
      "model_answer": "It shows that ordinary Europeans were completely oblivious to the vast wealth of the Silk Road or African trade networks, rarely traveling far from their poor, localized villages."
    }
  ];
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully applied absolute task and source fix to data.js');
