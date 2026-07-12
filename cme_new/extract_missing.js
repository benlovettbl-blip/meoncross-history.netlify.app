const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(targetPath, 'utf8');

let data;
try {
  data = new Function(content.replace('export const unitData = ', 'return ').replace(/;$/, '') + ';')();
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

const extract = {};

data.lessons.forEach(lesson => {
  if (lesson.id === 'lesson_1') return;
  extract[lesson.id] = [];
  
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, index) => {
      // Only care about blocks with text that don't have tasks
      if (block.text && (!block.tasks || block.tasks.length === 0)) {
        extract[lesson.id].push({
          blockIndex: index,
          text: block.text
        });
      }
    });
  }
});

fs.writeFileSync(path.join(__dirname, 'missing_questions.json'), JSON.stringify(extract, null, 2), 'utf8');
console.log("Extracted missing questions to missing_questions.json");
