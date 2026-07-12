import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace great_war with cme_new
content = content.replace(/great_war/g, 'cme_new');

// Fix the gcse_task block to check for sources
content = content.replace(
  'if (lesson.gcse_task) {',
  'if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources.length >= 2) {'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched cme_new/generate_worksheets.js");
