const fs = require('fs');
const path = require('path');

const folders = [
    'change_1450_1750',
    'edexcel_medicine',
    'great_war',
    'great_war_part2',
    'water_and_sanitation'
];

folders.forEach(folder => {
    const filePath = path.join(__dirname, '..', folder, 'generate_worksheets.js');
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Update numbering logic
    const oldNumbering = `if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); });`;
    const newNumbering = `if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); if (block.hinge_question) block.hinge_question.qNum = globalQNum++; });`;
    
    if (content.includes(oldNumbering)) {
        content = content.replace(oldNumbering, newNumbering);
        changed = true;
    }

    // Update rendering logic
    const oldRenderTask = `if (block.tasks && block.tasks.length > 0) {`;
    const newRenderHinge = `
      if (block.hinge_question) {
        html += \`<div class="task-box" style="background: #f8fafc; border: 2px dashed #94a3b8;">\`;
        html += \`<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong><i class="fa-solid fa-circle-check"></i> Knowledge Check (Q\${block.hinge_question.qNum})</strong></p>\`;
        html += \`<p style="margin-bottom: 15px;"><strong>\${block.hinge_question.text}</strong></p>\`;
        html += \`<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">\`;
        block.hinge_question.options.forEach((opt, idx) => {
          html += \`<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>\${String.fromCharCode(65+idx)}. \${opt}</li>\`;
        });
        html += \`</ul></div>\`;
      }
      
      if (block.tasks && block.tasks.length > 0) {`;

    if (content.includes(oldRenderTask) && !content.includes('Knowledge Check (Q${block.hinge_question.qNum})')) {
        content = content.replace(oldRenderTask, newRenderHinge);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${folder}/generate_worksheets.js`);
    } else {
        console.log(`Could not automatically patch ${folder}/generate_worksheets.js`);
    }
});
