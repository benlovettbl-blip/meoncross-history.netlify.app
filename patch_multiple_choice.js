const fs = require('fs');

// 1. Fix generate_workbooks.js
let gw = fs.readFileSync('generate_workbooks.js', 'utf8');
let gwTarget = `if (task.type === 'draw') {
                   html += \`<div class="draw-task">Q\${task.qNum}: \${task.text || task.question}</div>\`;
                } else {`;
let gwReplace = `if (task.type === 'draw') {
                   html += \`<div class="draw-task">Q\${task.qNum}: \${task.text || task.question}</div>\`;
                } else if (task.type === 'multiple_choice') {
                   html += \`<h4 style="margin-top: 0; margin-bottom: 10px;">Q\${task.qNum || ""} \${task.text || task.question || task.instruction || task.title || ''}</h4>\`;
                   if (task.questions) {
                     task.questions.forEach((q, qIdx) => {
                       html += \`<p style="font-weight:bold; margin-bottom:5px; margin-top:5px;">\${qIdx + 1}. \${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">\`;
                       q.options.forEach((opt) => {
                         html += \`<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">\${opt}</li>\`;
                       });
                       html += \`</ul>\`;
                     });
                   }
                } else {`;
gw = gw.replace(gwTarget, gwReplace);
fs.writeFileSync('generate_workbooks.js', gw);

// 2. Fix generate_textbooks.js
let gt = fs.readFileSync('generate_textbooks.js', 'utf8');
let gtTarget = `} else if (task.type === 'draw') {
                   html += \`<div class="draw-task" style="display:none;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Task_\${bIdx}_\${tIdx}]]</span>Q\${task.qNum}: \${task.text || task.question}</div>\`;
                } else {`;
let gtReplace = `} else if (task.type === 'draw') {
                   html += \`<div class="draw-task" style="display:none;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Task_\${bIdx}_\${tIdx}]]</span>Q\${task.qNum}: \${task.text || task.question}</div>\`;
                } else if (task.type === 'multiple_choice') {
                   html += \`<div style="margin-top:10px;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Task_\${bIdx}_\${tIdx}]]</span><strong>Q\${task.qNum}. \${task.text || task.question}</strong></div>\`;
                   if (task.questions) {
                     task.questions.forEach((q, qIdx) => {
                       html += \`<p style="margin-top: 5px; margin-bottom: 5px; font-weight:bold;">\${qIdx + 1}. \${q.q}</p><ul style="list-style-type:none; padding-left:15px; margin-top:0; margin-bottom:15px;">\`;
                       q.options.forEach((opt, optIdx) => {
                         let letter = String.fromCharCode(65 + optIdx);
                         html += \`<li style="margin-bottom: 3px;">\${letter}) \${opt}</li>\`;
                       });
                       html += \`</ul>\`;
                     });
                   }
                } else {`;
gt = gt.replace(gtTarget, gtReplace);
fs.writeFileSync('generate_textbooks.js', gt);

// 3. Fix data.js
let dataPath = 'public/units/early_modern_world/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');
dataContent = dataContent.replace(/"question": "Knowledge Check: Review the events of 1450."/g, '"question": "Task: Comprehension on the Fall of Constantinople"');
fs.writeFileSync(dataPath, dataContent);

let dataPath2 = 'units/early_modern_world/data.js';
if (fs.existsSync(dataPath2)) {
    let dataContent2 = fs.readFileSync(dataPath2, 'utf8');
    dataContent2 = dataContent2.replace(/"question": "Knowledge Check: Review the events of 1450."/g, '"question": "Task: Comprehension on the Fall of Constantinople"');
    fs.writeFileSync(dataPath2, dataContent2);
}

console.log("Patches applied successfully.");
