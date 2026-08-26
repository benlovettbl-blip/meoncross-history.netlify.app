const fs = require('fs');

const files = [
  'generate_workbooks.js',
  'generate_pupil_workbooks.js',
  'generate_textbooks.js',
  'generate_textbooks_debug.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Parent Wrapper for Vocab Checks
  if (content.includes('<h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>') && !content.includes('<div style="break-inside: avoid; page-break-inside: avoid;"><h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>')) {
    content = content.replaceAll(
      '<h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>',
      '<div style="break-inside: avoid; page-break-inside: avoid;"><h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>'
    );
    // Find the end of the vocab style 2 block and inject the closing </div>
    const vocabEndRegex = /(html \+= `\n\s*<div class="task-lines"[\s\S]*?`;\n\s*\}\n\s*)html \+= `<\/div>`;/g;
    content = content.replace(vocabEndRegex, '$1html += `</div></div>`;');
    changed = true;
  }

  // 2. Cloze CSS Workaround
  if (content.includes('&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;')) {
    content = content.replaceAll('&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;', '<span style="display:inline-block; width: 80px; border-bottom: 1px solid black;">&nbsp;</span>');
    content = content.replaceAll('&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;', '<span style="display:inline-block; width: 80px; border-bottom: 1px solid black;">&nbsp;</span>');
    changed = true;
  }

  // 3. Bulletproof RegEx for Tariffs (just stop replacing the text)
  if (content.includes("text = text.replace(match[0], '').trim();")) {
    content = content.replaceAll("text = text.replace(match[0], '').trim();", "// text = text.replace(match[0], '').trim();");
    changed = true;
  }

  // 4. Do Now Writing Lines
  if (file === 'generate_pupil_workbooks.js' && content.includes('for (let i = 0; i < 5; i++) {') && content.includes('lesson.do_now.text}')) {
    const oldDoNow = `          html += \`<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>\${lesson.do_now.text}\${lesson.startPage ? \` [p. \${lesson.startPage}]\` : ""}</strong></div>\`;
          for (let i = 0; i < 5; i++) {
            html += \`<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>\`;
          }`;
    const newDoNow = `          let processedDoNowText = lesson.do_now.text || "";
          let hasList = processedDoNowText.includes('</li>');
          if (hasList) {
             processedDoNowText = processedDoNowText.replace(/<\\/li>/g, '<div class="task-lines" style="height: 12px; margin-top: 3px;"></div></li>');
          }
          html += \`<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>\${processedDoNowText}\${lesson.startPage ? \` [p. \${lesson.startPage}]\` : ""}</strong></div>\`;
          if (!hasList) {
            for (let i = 0; i < 5; i++) {
              html += \`<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>\`;
            }
          }`;
    if (content.includes(oldDoNow)) {
      content = content.replace(oldDoNow, newDoNow);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
