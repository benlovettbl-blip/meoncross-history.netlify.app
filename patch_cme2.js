const fs = require('fs');
let c = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Fix 1: Remove unitId !== 'cme_new' from the hasExamTask condition
c = c.replace(
    /if \(hasExamTask && unitId !== "cme_new"\) \{/g,
    'if (hasExamTask) {'
);

// Fix 2: Remove the Question Bank at the bottom
let questionBankStart = c.indexOf('if (unitId === "cme_new") {\n      let allExamTasksHtml = "";');
if (questionBankStart !== -1) {
    let questionBankEnd = c.indexOf('if (unitId === "edexcel_medicine" || unitId === "western_front") {', questionBankStart);
    if (questionBankEnd !== -1) {
        c = c.substring(0, questionBankStart) + c.substring(questionBankEnd);
    }
}

// Fix 3: Fix fill-in-the-blanks empty spans
c = c.replace(
    /let cloze = lesson\.vocab_cloze_text\.replace\([\s\S]*?\&nbsp;<\/span>',\s*\);/g,
    "let cloze = lesson.vocab_cloze_text.replace(/\\[.*?\\]/g, ' _______________________ ');"
);

// Fix 4: Move Historians Corner to replace Lesson Consolidation
let oldHistoriansCorner = `      // Historians Corner
    if (lesson.historians_corner) {
      html += \`<div class="task-box" style=" ">\`;
      html += \`<h3 style="margin-top: 0;">Historian's Corner: \${lesson.historians_corner.title}</h3>\`;
      html += \`<p style="font-size: 12pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
      if (lesson.historians_corner.stretch_question) {
        html += \`<div style="margin-top: 15px; font-weight: bold;">Q\${lesson.historians_corner.qNum}. \${lesson.historians_corner.stretch_question}</div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
      }
      html += \`</div>\`;
    }`;
c = c.replace(oldHistoriansCorner, ''); // Remove it from the middle

let oldConsolidation = `      } else {
        html += \`<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">\`;
        html += \`<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>\`;

        if (lesson.lesson_assessment) {
          html += \`<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">\`;
          html += \`<p style="font-weight: bold; color: #166534; margin-top: 0;">\${lesson.lesson_assessment.question}</p>\`;
          if (lesson.lesson_assessment.hints) {
            html += \`<p style="font-size: 0.95rem; margin-bottom: 5px;"><strong>Hints:</strong> \${lesson.lesson_assessment.hints}</p>\`;
          }
          if (lesson.lesson_assessment.sentence_starters) {
            html += \`<p style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0;"><strong>Sentence Starters:</strong></p>\`;
            html += \`<ul style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0; padding-left: 20px;">\`;
            lesson.lesson_assessment.sentence_starters.forEach((starter) => {
              html += \`<li><em>\${starter}</em></li>\`;
            });
            html += \`</ul>\`;
          }
          html += \`</div>\`;
        } else {
          const consolText = lesson.consolidation || "Reflect on today's learning and answer your teacher's final challenge.";
          html += \`<p style="font-weight: bold; margin-bottom: 15px;">\${consolText}</p>\`;
        }

        for (let i = 0; i < 15; i++) {
          html += \`<div class="task-lines-large"></div>\`;
        }
        html += \`</div>\`;
      }`;

let newConsolidation = `      } else {
        html += \`<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">\`;
        
        if (lesson.historians_corner) {
            html += \`<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-book-open"></i> Historian's Corner</h2>\`;
            html += \`<h3 style="margin-top: 5px;">\${lesson.historians_corner.title}</h3>\`;
            html += \`<p style="font-size: 11pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
            if (lesson.historians_corner.stretch_question) {
                html += \`<div style="margin-top: 15px; font-weight: bold;">Q\${lesson.historians_corner.qNum}. \${lesson.historians_corner.stretch_question}</div>\`;
            } else {
                html += \`<div style="margin-top: 15px; font-weight: bold;">Q\${lesson.historians_corner.qNum || ''}. Write a short paragraph summarising the historian's argument.</div>\`;
            }
            for (let i = 0; i < 15; i++) {
                html += \`<div class="task-lines-large"></div>\`;
            }
        } else {
            html += \`<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>\`;
            if (lesson.lesson_assessment) {
              html += \`<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">\`;
              html += \`<p style="font-weight: bold; color: #166534; margin-top: 0;">\${lesson.lesson_assessment.question}</p>\`;
              if (lesson.lesson_assessment.hints) {
                html += \`<p style="font-size: 0.95rem; margin-bottom: 5px;"><strong>Hints:</strong> \${lesson.lesson_assessment.hints}</p>\`;
              }
              if (lesson.lesson_assessment.sentence_starters) {
                html += \`<p style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0;"><strong>Sentence Starters:</strong></p>\`;
                html += \`<ul style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0; padding-left: 20px;">\`;
                lesson.lesson_assessment.sentence_starters.forEach((starter) => {
                  html += \`<li><em>\${starter}</em></li>\`;
                });
                html += \`</ul>\`;
              }
              html += \`</div>\`;
            } else {
              const consolText = lesson.consolidation || "Reflect on today's learning and answer your teacher's final challenge.";
              html += \`<p style="font-weight: bold; margin-bottom: 15px;">\${consolText}</p>\`;
            }

            for (let i = 0; i < 15; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
        }
        html += \`</div>\`;
      }`;

c = c.replace(oldConsolidation, newConsolidation);

fs.writeFileSync('generate_pupil_workbooks.js', c);
console.log('Patched generate_pupil_workbooks.js');
