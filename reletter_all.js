const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

function fixLessonByTitle(lessonIndex, replacements, blockLettersMap) {
  const l = data.lessons[lessonIndex];
  
  l.narrative_blocks.forEach(b => {
    // 1. Replace letters in text
    if (b.text) {
      replacements.forEach(r => {
        const regex = new RegExp(`Source ${r.old}(:|\\s|\\.|,)`, 'g');
        b.text = b.text.replace(regex, `Source [[${r.new}]]$1`);
      });
      // Clean up placeholders
      b.text = b.text.replace(/Source \[\[([A-Z])\]\]/g, 'Source $1');
    }
    
    // 2. Replace letters in tasks
    if (b.tasks) {
      b.tasks.forEach(t => {
        replacements.forEach(r => {
          if (t.question) {
            t.question = t.question.replace(new RegExp(`Source ${r.old}(:|\\s|\\.|,|\\?)`, 'g'), `Source [[${r.new}]]$1`);
            t.question = t.question.replace(new RegExp(`Study ${r.old}\\.`, 'g'), `Study [[${r.new}]].`);
          }
          if (t.model_answer) {
            t.model_answer = t.model_answer.replace(new RegExp(`Source ${r.old}(:|\\s|\\.|,|\\?)`, 'g'), `Source [[${r.new}]]$1`);
          }
        });
        
        // Clean up placeholders
        if (t.question) t.question = t.question.replace(/Source \[\[([A-Z])\]\]/g, 'Source $1').replace(/Study \[\[([A-Z])\]\]/g, 'Study $1');
        if (t.model_answer) t.model_answer = t.model_answer.replace(/Source \[\[([A-Z])\]\]/g, 'Source $1');
      });
    }
    
    // 3. Assign new source_letter to the block
    if (blockLettersMap[b.title]) {
      b.source_letter = blockLettersMap[b.title];
    } else {
      delete b.source_letter;
    }
  });
}

// LESSON 0
fixLessonByTitle(0, 
  [{old: 'D', new: 'A'}, {old: 'A', new: 'B'}, {old: 'B', new: 'C'}, {old: 'E', new: 'D'}, {old: 'C', new: 'E'}, {old: 'F', new: 'F'}],
  {
    'Analyzing the Evidence: The Fall of Constantinople': 'A',
    'Macro-History: The Wealth of the East': 'B',
    'Macro-History: The Real Centers of Wealth in 1450': 'C',
    'Analyzing the Evidence: The Wealth of West Africa': 'D',
    'The Silk Road & Ming China: The World\'s Industrial Engine': 'E',
    'Side Quest: The English Peasant\'s Pottage': 'F'
  }
);

// LESSON 1
fixLessonByTitle(1,
  [{old: 'C', new: 'A'}, {old: 'D', new: 'B'}, {old: 'E', new: 'C'}, {old: 'D', new: 'D'}, {old: 'E', new: 'E'}, {old: 'F', new: 'F'}, {old: 'I', new: 'G'}],
  {
    'Macro-History: Navigating the Unknown': 'A',
    'Macro-History: The Reformation (1517)': 'B',
    'Macro-History: The New World Monopoly & Privateers': 'C',
    'Opposing Views: A Queen and a Captive (Part 1)': 'D',
    'Visual Analysis: The Armada Portrait (1588)': 'F',
    'Side Quest: The Horrors of Scurvy': 'G'
  }
);

// LESSON 2
// Manually fix L2's duplicated "Source E"s first
const l2 = data.lessons[2];
const justifyingEmpire = l2.narrative_blocks.find(b => b.title === 'Justifying Empire: Religion vs. Profit');
if (justifyingEmpire) {
  justifyingEmpire.text = justifyingEmpire.text.replace('Source E: From the First Charter', 'Source B: From the First Charter');
  justifyingEmpire.text = justifyingEmpire.text.replace('Source E: From the Journal', 'Source C: From the Journal');
  justifyingEmpire.tasks[0].question = justifyingEmpire.tasks[0].question.replace('Source D', 'Source B');
  justifyingEmpire.tasks[0].model_answer = justifyingEmpire.tasks[0].model_answer.replace('Source D', 'Source B');
  justifyingEmpire.tasks[1].question = justifyingEmpire.tasks[1].question.replace('Source E', 'Source C');
  justifyingEmpire.tasks[1].model_answer = justifyingEmpire.tasks[1].model_answer.replace('Source E', 'Source C');
  justifyingEmpire.tasks[2].question = justifyingEmpire.tasks[2].question.replace('Source B', 'Source C').replace('Source A', 'Source B');
  justifyingEmpire.tasks[2].model_answer = justifyingEmpire.tasks[2].model_answer.replace(/Source B/g, 'Source C').replace(/Source A/g, 'Source B');
}

fixLessonByTitle(2,
  [{old: 'C', new: 'A'}, {old: 'F', new: 'D'}, {old: 'F', new: 'E'}],
  {
    'Macro-History: The Big Picture': 'A',
    'Justifying Empire: Religion vs. Profit': 'B',
    'Visual Analysis: The Jamestown Triangular Fort Plan (1607)': 'D',
    'Side Quest: The Invasion of the Pigs': 'E'
  }
);

// LESSON 4
// Already correct: A, B, C. Let's just enforce it.
fixLessonByTitle(4, [], {
  'Micro-History: The Barracoons of West Africa': 'A',
  'Macro-History: The Triangular Machinery of Exploitation': 'B',
  'Comparative Case Study: Caribbean Sugar vs. Virginian Tobacco': 'C'
});

// LESSON 5
fixLessonByTitle(5,
  [{old: '\\[X\\]', new: 'A'}, {old: '\\[Y\\]', new: 'B'}, {old: '\\[Z\\]', new: 'C'}],
  {
    'Voices of Resistance: Equiano\'s Testimony': 'A',
    'Case Study: The Stono Rebellion (1739)': 'D',
    'Side Quest: Obeah and Botanical Warfare': 'E',
    'Historical Debates: What Truly Destroyed Slavery?': 'F'
  }
);

// LESSON 6
fixLessonByTitle(6,
  [{old: 'C', new: 'A'}, {old: 'D', new: 'B'}, {old: 'E', new: 'C'}, {old: 'F', new: 'D'}, {old: 'G', new: 'E'}, {old: 'H', new: 'F'}],
  {
    'Macro-History: The Ideology of Empire': 'A',
    'Macro-History: Weighing the Evidence (1450 vs. 1750)': 'B',
    'Primary Source Analysis: The Dual Reality': 'C',
    'Primary Source Analysis: The Dark Side': 'D',
    'Urban Sprawl: Mapping 18th-Century London': 'E',
    'Side Quest: The Mudlarks of London': 'F'
  }
);

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully re-lettered all lessons in early_modern_world/data.js!');
