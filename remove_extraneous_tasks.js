const fs = require('fs');
const filepath = 'water_and_sanitation/data.js';
const code = fs.readFileSync(filepath, 'utf8');
const json = eval('(function(){ const mock_exams=[]; return ' + code.replace(/export const unitData = /,'') + '})()');

let removedCount = 0;

json.lessons.forEach(lesson => {
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        // Filter out any think_pair_share task that contains keywords indicating individual activity
        const originalLength = block.tasks.length;
        block.tasks = block.tasks.filter(task => {
          if (task.type === 'think_pair_share') {
            const text = (task.text || task.question || '').toLowerCase();
            if (text.includes('highlight') || text.includes('circle') || text.includes('draw an arrow')) {
              console.log(`Removed task: ${task.text || task.question}`);
              removedCount++;
              return false; // Remove this task
            }
          }
          return true; // Keep others
        });
      }
    });
  }
});

if (removedCount > 0) {
  fs.writeFileSync(filepath, 'export const unitData = ' + JSON.stringify(json, null, 2) + ';\n');
  console.log(`Successfully removed ${removedCount} extraneous tasks from data.js!`);
} else {
  console.log('No tasks were removed.');
}
