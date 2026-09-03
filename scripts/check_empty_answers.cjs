const fs = require('fs');
const path = require('path');

const unitsDir = path.join(process.cwd(), 'units');
const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const report = {};

for (const unit of unitFolders) {
  const dataPath = path.join(unitsDir, unit, 'data.js');
  if (!fs.existsSync(dataPath)) continue;
  
  try {
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const match = dataContent.match(/export default ([\s\S]+);/);
    if (!match) continue;
    
    const unitData = eval('(' + match[1] + ')');
    const issues = [];
    
    if (unitData.lessons) {
      unitData.lessons.forEach((lesson, idx) => {
        const lessonName = `Lesson ${idx + 1}: ${lesson.title || 'Untitled'}`;
        
        // Helper function to check a task for missing answers
        const checkTask = (task, contextStr) => {
          if (!task.question && !task.text && !task.task) return; // Not a question task
          
          if (task.type === 'activity' || task.type === 'discussion' || task.type === 'timeline') return;

          // if it has options, it might be multiple choice which is checked in quiz_zone, but let's check
          if (task.options) {
             if (task.correct_index === undefined && !task.answer) {
                 issues.push(`${lessonName} [${contextStr}] - Multiple choice missing correct answer.`);
             }
             return;
          }
          
          const questionText = task.question || task.task || task.text;
          if (questionText && typeof questionText === 'string') {
            if (!task.answer || task.answer.trim() === '' || task.answer.toLowerCase().includes('placeholder') || task.answer.toLowerCase().includes('model answer')) {
              issues.push(`${lessonName} [${contextStr}] - Missing or placeholder answer for question: "${questionText.substring(0, 30)}..."`);
            }
          }
        };

        if (lesson.tasks) {
          lesson.tasks.forEach((task, tIdx) => checkTask(task, `Consolidation Task ${tIdx + 1}`));
        }
        
        if (lesson.narrative_blocks) {
          lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.tasks) {
              block.tasks.forEach((task, tIdx) => checkTask(task, `Narrative Block ${bIdx + 1} Task ${tIdx + 1}`));
            }
          });
        }
        
        if (lesson.gcse_task && lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach((task, tIdx) => checkTask(task, `GCSE Task ${tIdx + 1}`));
        }
      });
    }

    if (issues.length > 0) {
      report[unit] = issues;
    }

  } catch (e) {
    report[unit] = [`Error parsing data.js: ${e.message}`];
  }
}

fs.writeFileSync('missing_answers_report.json', JSON.stringify(report, null, 2));
console.log("Audit complete. Written to missing_answers_report.json.");
