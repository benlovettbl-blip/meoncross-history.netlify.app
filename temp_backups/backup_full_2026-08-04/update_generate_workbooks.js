const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Replace the addExamRow logic
const oldTrackerLogic = `      const addExamRow = (qText) => {
        let marksMatch = qText.match(/(\\d+)\\s*marks?/i);
        let marks = marksMatch ? marksMatch[1] : '?';
        let shortText = qText.split(' ').slice(0, 10).join(' ') + '...';
        shortText = shortText.replace(/<[^>]*>?/gm, '');
        trackerRows += \`<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam: \${shortText}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / \${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
      };

      if (l.extended && l.extended.question) addExamRow(l.extended.question);
      if (l.gcse_task && l.gcse_task.tasks) {
          l.gcse_task.tasks.forEach(t => addExamRow(t.text));
      }
      if (l.exam_practice) {
          l.exam_practice.forEach(ep => {
              addExamRow(ep.question + (ep.marks ? \` (\${ep.marks} marks)\` : ''));
          });
      }`;

const newTrackerLogic = `      trackerRows += \`<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam Q1: ...........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
      trackerRows += \`<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam Q2: ...........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
      trackerRows += \`<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam Q3: ...........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;`;

content = content.replace(oldTrackerLogic, newTrackerLogic);

// 2. Replace the exam_practice rendering logic
const oldExamPracticeLogicRegex = /if \(lesson\.exam_practice && lesson\.exam_practice\.length > 0\) \{[\s\S]*?\}\n        \}\);\n      \}/;
const newExamPracticeLogic = `if (lesson.exam_practice && lesson.exam_practice.length > 0) {
        html += \`<div class="task-box" style="margin-bottom: 30px; border: 2px solid #1a237e; background: #eef2ff; page-break-inside: avoid;">\`;
        html += \`<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;"><img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Exam_icon.png" style="width:20px; vertical-align: middle; margin-right: 5px;"> Question Bank Menu</h2>\`;
        html += \`<p style="font-weight: bold; font-size: 11pt; color: #374151;">Choose a question from the menu below and write your answer on your A4 lined paper.</p>\`;
        
        lesson.exam_practice.forEach((ep, index) => {
          let marksStr = ep.marks ? \` (\${ep.marks} marks)\` : '';
          if (ep.question.includes('marks)')) marksStr = '';
          let questionHtml = \`<div style="margin-top: 15px; margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${index + 1}. \${formatText(ep.question)}\${marksStr}</strong></div>\`;

          if (ep.stimulus && ep.stimulus.length > 0) {
            let isSources = ep.question.toLowerCase().includes('useful') || ep.question.toLowerCase().includes('follow up') || ep.stimulus.some(s => s.includes('Source A') || s.includes('Source B'));
            if (isSources) {
              html += \`<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 20px; page-break-inside: avoid;">\`;
              ep.stimulus.forEach((stimText, i) => {
                html += \`<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source \${String.fromCharCode(65+i)}</strong>
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                    \${formatText(stimText.replace(/<strong>Source [A-Z]:\\s*<\\/strong>/, '').replace(/\\n/g, '<br>'))}
                  </div>
                </div>\`;
              });
              html += \`</div>\` + questionHtml;
            } else {
              html += questionHtml + \`<div style="margin-top: 5px; margin-bottom: 20px; padding: 15px; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc; page-break-inside: avoid; font-size: 0.95rem;">
                <p style="margin-top: 0; margin-bottom: 8px; font-weight: bold;">You may use the following in your answer:</p>
                <ul style="margin-top: 0; margin-bottom: 8px; padding-left: 25px;">\`;
              ep.stimulus.forEach(stimText => { html += \`<li style="margin-bottom: 4px;">\${formatText(stimText)}</li>\`; });
              html += \`</ul><p style="margin-top: 0; margin-bottom: 0; font-weight: bold;">You must also use information of your own.</p></div>\`;
            }
          } else {
            html += questionHtml;
          }
        });
        html += \`</div>\`;
      }`;

content = content.replace(oldExamPracticeLogicRegex, newExamPracticeLogic);
fs.writeFileSync('generate_workbooks.js', content);
console.log('generate_workbooks.js updated successfully!');
