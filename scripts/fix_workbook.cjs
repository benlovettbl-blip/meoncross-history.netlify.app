const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../generate_pupil_workbooks.js');
let txt = fs.readFileSync(file, 'utf8');

// 1. Replace the renderLines definition to accept customLines
const oldRenderLines = `const renderLines = (text) => {
          if (text.includes("16 marks")) {
              for(let i=0; i<42; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("12 marks") || text.includes("Explain why")) {
              for(let i=0; i<22; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("8 marks")) {
              for(let i=0; i<19; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("2 marks")) {
              for(let i=0; i<3; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("4 marks") || text.includes("Explain one way") || text.includes("Explain one consequence")) {
              for(let i=0; i<4; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else {
              for(let i=0; i<8; i++) { html += \`<div class="task-lines-large"></div>\`; }
          }
      };`;

const newRenderLines = `const renderLines = (text, customLines) => {
          if (customLines) {
              for(let i=0; i<customLines; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("16 marks")) {
              for(let i=0; i<42; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("12 marks") || text.includes("Explain why")) {
              for(let i=0; i<22; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("8 marks")) {
              for(let i=0; i<19; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("2 marks")) {
              for(let i=0; i<3; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else if (text.includes("4 marks") || text.includes("Explain one way") || text.includes("Explain one consequence")) {
              for(let i=0; i<4; i++) { html += \`<div class="task-lines-large"></div>\`; }
          } else {
              for(let i=0; i<8; i++) { html += \`<div class="task-lines-large"></div>\`; }
          }
      };`;

if(txt.includes(oldRenderLines)) {
  txt = txt.replace(oldRenderLines, newRenderLines);
} else {
  console.log("Could not find oldRenderLines in generate_pupil_workbooks.js");
}

// 2. Replace the Title 
const oldTitle = `html += \`<div style="page-break-inside: auto; margin-top: 20px;">\`;
      html += \`<h2 style="margin-top: 0;">GCSE Exam Practice</h2>\`;`;

const newTitle = `html += \`<div style="page-break-inside: auto; margin-top: 20px;">\`;
      let examTitle = (lesson.extended && lesson.extended.title) ? lesson.extended.title : 'GCSE Exam Practice';
      html += \`<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">\${examTitle}</h2>\`;`;

if(txt.includes(oldTitle)) {
  txt = txt.replace(oldTitle, newTitle);
} else {
  console.log("Could not find oldTitle in generate_pupil_workbooks.js");
}

// 3. Inject hints before rendering the extended question and use custom lines
const oldExtendedQuestion = `html += \`<div style="margin-top: 15px;"><strong>Q\${lesson.extended.qNum}. \${formatText(lesson.extended.question)}</strong></div>\`;
          if (!lesson.extended.title || !lesson.extended.title.toLowerCase().includes('map task')) {
            renderLines(lesson.extended.question);
          }`;

const newExtendedQuestion = `if (lesson.extended.hints && lesson.extended.hints.length > 0) {
               html += \`<div style="margin-top: 15px; margin-bottom: 15px; padding: 15px; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px;">\`;
               html += \`<strong style="color: #166534; font-size: 11pt;">Scaffolding & Hints:</strong>\`;
               html += \`<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #15803d; font-size: 10pt;">\`;
               lesson.extended.hints.forEach(hint => {
                   html += \`<li style="margin-bottom: 4px;">\${formatBold(hint)}</li>\`;
               });
               html += \`</ul></div>\`;
          }
          html += \`<div style="margin-top: 15px;"><strong>Q\${lesson.extended.qNum}. \${formatText(lesson.extended.question)}</strong></div>\`;
          if (!lesson.extended.title || !lesson.extended.title.toLowerCase().includes('map task')) {
            renderLines(lesson.extended.question, lesson.extended.lines);
          }`;

if(txt.includes(oldExtendedQuestion)) {
  txt = txt.replace(oldExtendedQuestion, newExtendedQuestion);
} else {
  console.log("Could not find oldExtendedQuestion in generate_pupil_workbooks.js");
}


// Fix generate_textbooks.js for the title as well just in case
const tbFile = path.join(__dirname, '../generate_textbooks.js');
let tbTxt = fs.readFileSync(tbFile, 'utf8');
if(tbTxt.includes(oldTitle)) {
  tbTxt = tbTxt.replace(oldTitle, newTitle);
  fs.writeFileSync(tbFile, tbTxt, 'utf8');
}


fs.writeFileSync(file, txt, 'utf8');
console.log('Successfully modified workbook generator logic.');
