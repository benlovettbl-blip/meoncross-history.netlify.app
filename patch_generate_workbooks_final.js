const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'generate_workbooks.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change vocab style to rotation of 2 (remove Frayer model)
content = content.replace('let vocabStyle = lessonIndex % 3;', 'let vocabStyle = lessonIndex % 2;');

content = content.replace(
`} else if (vocabStyle === 2) {

        let focusWord = vocabTerms[0].term;
        html += \`<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a clear definition and a historically accurate sentence for the term: <strong>\${focusWord}</strong></p>\`;
        html += \`
          <div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div>
        \`;
      }`, '');

// 2. Inject page numbers into extended block
content = content.replace(
  '<p style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">${block.extended.question}</p>',
  '<p style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">${block.extended.question}${block.extended.page ? ` [p. ${block.extended.page}]` : \'\'}</p>'
);

// 3. Inject page numbers into exam practice (ep)
content = content.replace(
  '<div style="margin-top: 15px; margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>${index + 1}. ${formatText(ep.question)}${marksStr}</strong></div>',
  '<div style="margin-top: 15px; margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>${index + 1}. ${formatText(ep.question)}${marksStr}${ep.page ? ` [p. ${ep.page}]` : \'\'}</strong></div>'
);


fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched generate_workbooks.js');
