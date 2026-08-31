const fs = require('fs');
const path = 'src/engine/lesson_renderer.js';
let content = fs.readFileSync(path, 'utf8');

const target1 = 'if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);';
const repl1 = "if (lesson.tasks) lesson.tasks.forEach(task => { if (typeof task === 'object' && task !== null) task.qNum = globalQNum++; });";

const target2 = "if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });";
const repl2 = "if (block.tasks) block.tasks.forEach(task => { if (typeof task === 'object' && task !== null && task.type !== 'vocab_match') task.qNum = globalQNum++; });";

content = content.replace(target1, repl1);
content = content.replace(target2, repl2);

fs.writeFileSync(path, content);
console.log('Patched');
