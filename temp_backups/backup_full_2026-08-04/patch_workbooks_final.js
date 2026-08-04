const fs = require('fs');

let code = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Title Page text shadow
code = code.replace(
  `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
        <h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">\${periodTitle}</h1>
        <p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif;">Student Workbook</p>
      </div>`,
  `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
        <div style="background: rgba(15, 23, 42, 0.75); padding: 20px 40px; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px);">
          <h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">\${periodTitle}</h1>
          <p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif; color: #cbd5e1;">Student Workbook</p>
        </div>
      </div>`
);

// 2. Remove page-break-before: always; from Tracker table
code = code.replace(
  `<h2 style="margin-bottom: 25px; font-size: 24pt; text-align: center; border-bottom: none; page-break-before: always;">Progress & Assessment Tracker</h2>`,
  `<h2 style="margin-bottom: 25px; margin-top: 60px; font-size: 24pt; text-align: center; border-bottom: none;">Progress & Assessment Tracker</h2>`
);

// 3. Add page-break-before: always; to lesson titles
code = code.replace(
  `html += \`<h2 style="margin-bottom: 20px;">\${formatText(lesson.title)}</h2>\`;`,
  `html += \`<h2 style="margin-bottom: 20px; page-break-before: always;">\${formatText(lesson.title)}</h2>\`;`
);

// 4. Increase .task-lines and .task-lines-large height
code = code.replace(
  `.task-lines { border-bottom: 1px solid #94a3b8; height: 28px; margin-top: 10px; }`,
  `.task-lines { border-bottom: 1px solid #94a3b8; height: 35px; margin-top: 15px; }`
);
code = code.replace(
  `.task-lines-large { border-bottom: 1px solid #94a3b8; height: 40px; margin-top: 15px; }`,
  `.task-lines-large { border-bottom: 1px solid #94a3b8; height: 45px; margin-top: 20px; }`
);

// 5. Do Now Box Blank Lines
code = code.replace(
  `          lesson.do_now.items.forEach((item, index) => {
            html += \`<div class="do-now-q"><strong>\${index + 1}.</strong> \${item.question}</div>\`;
            html += \`<div class="task-lines"></div>\`;
          });`,
  `          lesson.do_now.items.forEach((item, index) => {
            html += \`<div class="do-now-q"><strong>\${index + 1}.</strong> \${item.question}</div>\`;
            let linesToDraw = item.question.includes('15 Second Challenge') ? 4 : 2;
            for(let i=0; i<linesToDraw; i++) {
              html += \`<div class="task-lines"></div>\`;
            }
            html += \`<br>\`;
          });`
);

// 6. Contextual Cloze Fallback
code = code.replace(
  `    if (vocabTerms && vocabTerms.length > 0) {
      let vocabStyle = lessonIndex % 3;`,
  `    if (vocabTerms && vocabTerms.length > 0) {
      let vocabStyle = lessonIndex % 3;
      if (vocabStyle === 0 && !lesson.vocab_cloze_text) {
        vocabStyle = 1;
      }`
);

// 7. Increase blank lines for Vocabulary Mapping
code = code.replace(
  `html += \`<strong>Your Sentence:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div>\`;`,
  `html += \`<strong>Your Sentence:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>\`;`
);

// 8. Sources content Support
code = code.replace(
  `      lesson.sources.forEach(source => {
        if(source.src || source.caption || source.text) {
          html += \`
            <div class="source-container" style="page-break-inside: avoid;">
              \${source.title ? \`<strong>\${source.title}</strong><br>\` : ''}
              \${source.src ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">\` : ''}
              \${source.text ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">\${source.text}</blockquote>\` : ''}
              \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
            </div>
          \`;
        }
      });`,
  `      lesson.sources.forEach(source => {
        let sourceContent = source.content || source.text;
        if(source.src || source.caption || sourceContent) {
          html += \`
            <div class="source-container" style="page-break-inside: avoid;">
              \${source.title ? \`<strong>\${source.title}</strong><br>\` : ''}
              \${source.src ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">\` : ''}
              \${sourceContent ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">\${formatText(sourceContent)}</blockquote>\` : ''}
              \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
            </div>
          \`;
        }
      });`
);

// 9. Wrap General Notes and Grading Footer in page-break-inside: avoid
code = code.replace(
  `    // Inject General Notes Box
    html += \`
      <div class="task-box" style="margin-bottom: 30px; page-break-inside: avoid; border: 2px solid #64748b; background: #f8fafc;">`,
  `    // Inject General Notes Box
    html += \`<div style="page-break-inside: avoid;">\`;
    html += \`
      <div class="task-box" style="margin-bottom: 15px; page-break-inside: avoid; border: 2px solid #64748b; background: #f8fafc;">`
);

code = code.replace(
  `        <div style="margin-top: 10px;">Teacher Comment: <span class="teacher-comment"></span></div>
        <div style="margin-top: 5px;"><span class="teacher-comment"></span></div>
      </div>
    \`;`,
  `        <div style="margin-top: 10px;">Teacher Comment: <span class="teacher-comment"></span></div>
        <div style="margin-top: 5px;"><span class="teacher-comment"></span></div>
      </div>
    </div>
    \`;`
);

fs.writeFileSync('generate_workbooks.js', code);
console.log('Successfully patched generate_workbooks.js');
