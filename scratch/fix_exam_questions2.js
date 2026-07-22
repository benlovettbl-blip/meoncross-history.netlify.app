const fs = require('fs');
const path = require('path');

const units = [
  'edexcel_medicine',
  'change_1450_1750',
  'water_and_sanitation',
  'great_war',
  'great_war_part2',
  'eee'
];

units.forEach(unit => {
  const filePath = path.join(__dirname, `../${unit}/generate_worksheets.js`);
  if (!fs.existsSync(filePath)) {
     return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the GCSE Exam Practice header condition
  const regex = /let hasExamTask = lesson\.gcse_task \|\| \(lesson\.extended && lesson\.extended\.question\);/g;
  if (regex.test(content)) {
    content = content.replace(regex, `// Extract exam tasks from narrative blocks or lesson tasks
  let extractedExamTasks = [];
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        let eTasks = block.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
        extractedExamTasks = extractedExamTasks.concat(eTasks);
      }
    });
  }
  if (lesson.tasks) {
    let eTasks = lesson.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
    extractedExamTasks = extractedExamTasks.concat(eTasks);
  }

  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0;`);
    console.log(`Updated hasExamTask condition in ${unit}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
