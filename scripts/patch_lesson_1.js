const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let unitData;
try {
  unitData = eval('(function(){ return ' + jsonStr + ';})()');
} catch (e) {
  console.error("Failed to parse", e);
  process.exit(1);
}

let l1 = unitData.lessons.find(l => l.id === 'lesson_1');

if (l1) {
  l1.narrative_blocks.forEach(b => {
    // 1. Downgrade sources A, C, D, E
    if (['A', 'C', 'D', 'E'].includes(b.source_letter)) {
      delete b.source_letter;
      if (b.text) {
        // Strip blockquote and Source X formatting, but keep the content
        // Pattern: <blockquote><strong>Source [A-Z]: (.*?)</strong>(?:<br>)*(.*?)</blockquote>
        // Sometimes there is no text after the title, just the title.
        b.text = b.text.replace(/<blockquote>\s*<strong>Source [A-Z]:\s*(.*?)<\/strong>\s*(?:<br>)*([\s\S]*?)<\/blockquote>/g, (match, title, content) => {
          return `<strong>${title}</strong><br>${content}`;
        });
      }
    }

    // 2. Cull tasks
    if (b.title === "Macro-History: The Wealth of the East") {
      // Keep only one task
      if (b.tasks && b.tasks.length > 1) {
        b.tasks = [b.tasks[1]]; // Keep the 'challenge Eurocentric view' question
      }
    }
    
    if (b.title === "Macro-History: The Real Centers of Wealth in 1450" || b.title === "Analyzing the Evidence: The Wealth of West Africa") {
      // Remove drawing tasks
      if (b.tasks) b.tasks = [];
    }

    if (b.title === "Historical Interpretations: The Eurocentric Myth") {
      // Remove Synoptic Reflection
      if (b.tasks && b.tasks.length > 1) {
        b.tasks = [b.tasks[0]]; // Keep Class Debate
      }
    }

    if (b.title && b.title.includes("Side Quest: The English Peasant's Pottage")) {
      if (b.tasks && b.tasks.length === 4) {
        b.tasks = [
          {
            "type": "comprehension",
            "question": "How does the evidence in Source F and the description of the peasant's 'pottage' contrast with the lives of the Oba of Benin or the Ming Emperor?",
            "model_answer": "Unlike the Oba of Benin with his bronze plaques or the Ming Emperor in silk, the English peasant lived in poverty in a dark mud hut, relying on a bland stew just to survive."
          },
          b.tasks[2] // Keep Q3: Why does this support Europe as isolated
        ];
      }
    }
  });
}

const finalContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataPath, finalContent, 'utf8');
console.log("Successfully patched Lesson 1 in early_modern_world/data.js");
