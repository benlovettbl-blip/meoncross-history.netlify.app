const fs = require('fs');

let code = fs.readFileSync('generate_workbooks.js', 'utf8');

// Skip qNum for vocab_match tasks
// Original: if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++);
const oldTasksNum = `if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++);`;
const newTasksNum = `if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });`;
if (code.includes(oldTasksNum)) {
    code = code.replace(oldTasksNum, newTasksNum);
}

// And do not render Q.. if qNum is missing
// Original: html += `<p style="margin-top:10px;"><strong>Q\${task.qNum}. \${task.text || task.question}</strong></p>`;
const oldRenderQ = `html += \`<p style="margin-top:10px;"><strong>Q\${task.qNum}. \${task.text || task.question}</strong></p>\`;`;
const newRenderQ = `if (task.type === 'vocab_match') {
                  // Do nothing
                } else {
                  html += \`<p style="margin-top:10px;"><strong>Q\${task.qNum}. \${task.text || task.question}</strong></p>\`;
                }`;
if (code.includes(oldRenderQ)) {
    code = code.replace(oldRenderQ, newRenderQ);
}

fs.writeFileSync('generate_workbooks.js', code, 'utf8');
console.log('Patched generate_workbooks.js for vocab_match');
