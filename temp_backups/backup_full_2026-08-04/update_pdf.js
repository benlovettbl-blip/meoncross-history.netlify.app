const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let code = fs.readFileSync(filePath, 'utf8');

// Find the end of the Extended Scholarship section
const extendedScholarshipRegex = /if \(lesson\.extended && lesson\.extended\.paragraphs\) \{[\s\S]*?html \+= `<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;\s*\}/;

const newContent = `
  // Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">\`;
    html += \`<h3 style="margin-top: 0;">Historian's Corner: \${lesson.historians_corner.title}</h3>\`;
    html += \`<p style="font-size: 11pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
    html += \`</div>\`;
  }

  // GCSE Cross-Source Analysis
  if (lesson.gcse_task) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2>GCSE Cross-Source Analysis</h2>\`;
    html += \`<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
    
    let srcA = lesson.gcse_task.sources[0].src.startsWith('../') ? lesson.gcse_task.sources[0].src : \`../great_war/\${lesson.gcse_task.sources[0].src}\`;
    html += \`
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          <img src="\${srcA}" style="max-width: 100%; max-height: 250px;">
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${lesson.gcse_task.sources[0].title}</p>
        </div>
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
          <blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${lesson.gcse_task.sources[1].text}</blockquote>
          <p style="font-size: 10pt; font-weight: bold; margin: 0;">\${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    \`;

    html += \`<h3 style="margin-top: 0;">Source Evaluation Notes</h3>\`;
    html += \`
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: avoid;">
        <tr>
          <th style="border: 2px solid #000; padding: 8px; width: 10%;">Source</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">N.O.P. (Nature, Origin, Purpose)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Content (What it shows/says)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Contextual Knowledge</th>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">A</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">B</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
      </table>
    \`;

    html += \`<h3 style="margin-top: 0;">Final Written Evaluation</h3>\`;
    for(let i=0; i<10; i++) {
      html += \`<div class="task-lines-large"></div>\`;
    }
    
    html += \`</div>\`;
  }
`;

code = code.replace(extendedScholarshipRegex, match => match + '\n' + newContent);

fs.writeFileSync(filePath, code);
console.log("Updated generate_worksheets.js");

// Now create generate_answer_key.js
let answerKeyCode = code;
answerKeyCode = answerKeyCode.replace('<title>${unitData.title} - Printable Workbook</title>', '<title>${unitData.title} - Teacher Answer Key</title>');
answerKeyCode = answerKeyCode.replace('Student Workbook</p>', 'Teacher Answer Key</p>');

// Replace do_now questions lines with answer
answerKeyCode = answerKeyCode.replace(
  /<div class="task-lines"><\/div>/g,
  '<div class="task-lines" style="color:red; font-weight:bold; padding-top: 5px;">${item.answer}</div>'
);
answerKeyCode = answerKeyCode.replace(
  /<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>/g,
  '<div class="task-lines-large" style="color:red; font-weight:bold; padding-top: 5px;">${item.answer}</div>'
);

// Replace written tasks lines with answer
answerKeyCode = answerKeyCode.replace(
  /html \+= `<p style="margin-top:20px;"><strong>Q\$\{task\.qNum\}\.(.*?)<\/strong><\/p>`;\s*\/\/\s*Add 3 blank lines for writing\s*html \+= `<div class="task-lines"><\/div><div class="task-lines"><\/div><div class="task-lines"><\/div>`;/g,
  `html += \`<p style="margin-top:20px;"><strong>Q\${task.qNum}. $1</strong></p>\`;
      html += \`<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red;">\${task.model}</div>\`;`
);

// Replace extended lines with answer
answerKeyCode = answerKeyCode.replace(
  /html \+= `<div style="margin-top: 20px;"><strong>Q\$\{lesson\.extended\.qNum\}\.(.*?)<\/strong><\/div>`;\s*html \+= `<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;/g,
  `html += \`<div style="margin-top: 20px;"><strong>Q\${lesson.extended.qNum}. $1</strong></div>\`;
      html += \`<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 10px;">\${lesson.extended.model}</div>\`;`
);

// Replace GCSE lines with answer
answerKeyCode = answerKeyCode.replace(
  /html \+= `<h3 style="margin-top: 0;">Final Written Evaluation<\/h3>`;\s*for\(let i=0; i<10; i\+\+\) \{\s*html \+= `<div class="task-lines-large"><\/div>`;\s*\}/,
  `html += \`<h3 style="margin-top: 0;">Final Written Evaluation</h3>\`;
    html += \`<div style="color:red; font-weight:bold; padding: 15px; background: #fff0f0; border: 2px dashed red; min-height: 200px;">\${lesson.gcse_task.model}</div>\`;`
);

answerKeyCode = answerKeyCode.replace(/workbook\.html/g, 'answer_key.html');

fs.writeFileSync(path.join(__dirname, 'great_war_v2', 'generate_answer_key.js'), answerKeyCode);
console.log("Created generate_answer_key.js");
