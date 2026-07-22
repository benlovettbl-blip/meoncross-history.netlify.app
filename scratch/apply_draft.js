const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../edexcel_medicine/generate_worksheets.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update the Tracker Table Generation
const oldTrackerLoop = `periodLessons.forEach(l => {
    let maxScore = 5;
    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
    trackerRows += \`<tr><td style="border:1px solid #333; padding:4px;">\${l.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / \${maxScore}</td><td style="border:1px solid #333; padding:4px; width:60px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>\`;
  });`;

const newTrackerLoop = `periodLessons.forEach(l => {
    let maxScore = 5;
    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
    trackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">\${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">Do Now: / \${maxScore}</td><td style="border:1px solid #333; padding:6px; width:60px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
    
    // Add Exam Questions to Tracker
    const addExamRow = (qText) => {
      let marksMatch = qText.match(/\\((\\d+)\\s*marks?\\)/i);
      let marks = marksMatch ? marksMatch[1] : '?';
      let shortText = qText.split(' ').slice(0, 10).join(' ') + '...';
      shortText = shortText.replace(/<[^>]*>?/gm, ''); // remove html
      trackerRows += \`<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">\u21b3 Exam: \${shortText}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / \${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
    };

    if (l.extended && l.extended.question) addExamRow(l.extended.question);
    if (l.gcse_task && l.gcse_task.tasks) {
        l.gcse_task.tasks.forEach(t => addExamRow(t.text));
    }
  });`;

if (content.includes(oldTrackerLoop)) {
    content = content.replace(oldTrackerLoop, newTrackerLoop);
}

// 2. Remove extended question from Extended Scholarship block
const oldExtended = `if (lesson.extended.question) {
      html += \`<div style="margin-top: 20px;"><strong>Q\${lesson.extended.qNum}. \${formatBold(lesson.extended.question)}</strong></div>\`;
      html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
    }`;
const newExtended = `// Extended question moved to GCSE Exam Practice`;
if (content.includes(oldExtended)) {
    content = content.replace(oldExtended, newExtended);
}

// 3. Update GCSE Exam Practice rendering to include the extended question and handle 16 marks
const oldGCSE = `// GCSE Cross-Source Analysis & Exam Practice
  if (lesson.gcse_task) {
    html += \`<div>\`;
    html += \`<h2>GCSE Exam Practice</h2>\`;`;

const newGCSE = `// GCSE Cross-Source Analysis & Exam Practice
  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question);
  if (hasExamTask) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2 style="margin-top: 0;">GCSE Exam Practice</h2>\`;

    const renderLines = (text) => {
        if (text.includes("16 marks")) {
            for(let i=0; i<42; i++) { // ~2 pages
                html += \`<div class="task-lines-large"></div>\`;
            }
        } else if (text.includes("12 marks") || text.includes("Explain why")) {
            for(let i=0; i<22; i++) { // ~1 page
                html += \`<div class="task-lines-large"></div>\`;
            }
        } else if (text.includes("8 marks")) {
            for(let i=0; i<14; i++) { // ~half page
                html += \`<div class="task-lines-large"></div>\`;
            }
        } else if (text.includes("4 marks") || text.includes("Explain one way")) {
            for(let i=0; i<8; i++) {
                html += \`<div class="task-lines-large"></div>\`;
            }
        } else {
            for(let i=0; i<8; i++) {
                html += \`<div class="task-lines-large"></div>\`;
            }
        }
    };

    if (lesson.extended && lesson.extended.question) {
        html += \`<div style="margin-top: 15px;"><strong>Q\${lesson.extended.qNum}. \${formatBold(lesson.extended.question)}</strong></div>\`;
        renderLines(lesson.extended.question);
        html += \`<br>\`;
    }
`;

if (content.includes(oldGCSE)) {
    content = content.replace(oldGCSE, newGCSE);
}

const oldGCSEBody = `if (lesson.gcse_task.tasks) {
      // It's the Section B style (Q3 and Q4)
      lesson.gcse_task.tasks.forEach(task => {
         html += \`<div style="margin-top: 15px;"><strong>\${task.text}</strong></div>\`;
         if (task.text.includes("4 marks") || task.text.includes("Explain one way")) {
             for(let i=0; i<6; i++) {
                 html += \`<div class="task-lines-large"></div>\`;
             }
         } else if (task.text.includes("12 marks") || task.text.includes("Explain why")) {
             for(let i=0; i<12; i++) {
                 html += \`<div class="task-lines-large"></div>\`;
             }
         } else {
             for(let i=0; i<8; i++) {
                 html += \`<div class="task-lines-large"></div>\`;
             }
         }
         html += \`<br>\`;
      });
    } else if (lesson.gcse_task.sources) {`;

const newGCSEBody = `if (lesson.gcse_task && lesson.gcse_task.tasks) {
      // It's the Section B style (Q3 and Q4)
      lesson.gcse_task.tasks.forEach(task => {
         html += \`<div style="margin-top: 15px;"><strong>Q\${task.qNum}. \${task.text}</strong></div>\`;
         renderLines(task.text);
         html += \`<br>\`;
      });
    } else if (lesson.gcse_task && lesson.gcse_task.sources) {`;

if (content.includes(oldGCSEBody)) {
    content = content.replace(oldGCSEBody, newGCSEBody);
}

fs.writeFileSync(filePath, content);
console.log('Draft applied to edexcel_medicine/generate_worksheets.js');
