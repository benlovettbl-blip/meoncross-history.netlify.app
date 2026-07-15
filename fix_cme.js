const fs = require('fs');
const p = 'cme_new/generate_answer_key.js';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(/unitData\.lessons\.forEach\(lesson => \{/,
  `unitData.lessons.forEach(lesson => {
  let globalQNum = 1;
  if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
  if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); });
  if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
  if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
  if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;`);

// Strip prefixes from written tasks in cme_new too
code = code.replace(/\$\{task\.text\}/g, "${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: |Q\\d+\\.\\s*)/i, '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '').replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, '')}");

fs.writeFileSync(p, code);
console.log('Fixed Qundefined in cme_new!');
