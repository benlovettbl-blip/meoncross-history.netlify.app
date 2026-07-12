import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

data.lessons.forEach(lesson => {
  if (!lesson.narrative) return;
  
  let blocks = [];
  const narrativeLen = lesson.narrative.length;
  
  // Separate written tasks from draw tasks
  let writtenTasks = [];
  let drawTasks = [];
  if (lesson.tasks) {
    writtenTasks = lesson.tasks.filter(t => t.type !== 'draw');
    drawTasks = lesson.tasks.filter(t => t.type === 'draw');
  }
  
  let tasksPerBlock = writtenTasks.length > 0 && narrativeLen > 0 ? Math.ceil(writtenTasks.length / narrativeLen) : 0;
  let taskIndex = 0;

  for (let i = 0; i < narrativeLen; i++) {
    let blockTasks = [];
    if (tasksPerBlock > 0) {
        for(let j=0; j<tasksPerBlock; j++) {
            if (taskIndex < writtenTasks.length) {
                blockTasks.push(writtenTasks[taskIndex]);
                taskIndex++;
            }
        }
    }
    
    // If it's the last block, dump remaining tasks
    if (i === narrativeLen - 1 && taskIndex < writtenTasks.length) {
        while(taskIndex < writtenTasks.length) {
            blockTasks.push(writtenTasks[taskIndex]);
            taskIndex++;
        }
    }

    blocks.push({
      text: lesson.narrative[i],
      level_4: lesson.level_4_narrative ? lesson.level_4_narrative[i] : null,
      tasks: blockTasks
    });
  }
  
  // Create the new structure, but keep backwards compatibility if needed? 
  // No, let's just use the new structure in our frontend and generators.
  lesson.narrative_blocks = blocks;
  
  // Keep draw tasks in the main tasks array or somewhere safe so they don't get lost
  lesson.draw_tasks = drawTasks;
  
  // Delete old properties to clean up and force us to fix the frontend
  delete lesson.narrative;
  delete lesson.level_4_narrative;
  delete lesson.tasks;
});

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully transformed data.js into chunked narrative_blocks");
