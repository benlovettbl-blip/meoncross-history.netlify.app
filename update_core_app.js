const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const target = `          htmlNarrative += \`
              <div class="standard-narrative-container">
                \${imageHtml}
                <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div class="para-number">\${index + 1}</div>
                  <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${themeHeadingHtml}\${styledContent}</div>
                  <div style="display: flex; align-items: flex-start;">
                    <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                  </div>
                </div>
              </div>
            \`;`;

const replacement = `          const blockText = block.text || '';
          const isSideQuestBlock = typeof blockText === 'string' && blockText.includes('side-quest-box');
          const isLessonReflection = block.title && block.title.toLowerCase().includes('lesson reflection');
          const skipParaNumber = !blockText.trim() || isSideQuestBlock || isLessonReflection;

          if (skipParaNumber) {
            htmlNarrative += \`
              <div class="standard-narrative-container">
                \${imageHtml}
                \${styledContent ? \`<div style="margin-bottom: 15px; line-height: 1.6;">\${themeHeadingHtml}\${styledContent}</div>\` : ''}
              </div>
            \`;
          } else {
            htmlNarrative += \`
              <div class="standard-narrative-container">
                \${imageHtml}
                <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div class="para-number">\${index + 1}</div>
                  <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${themeHeadingHtml}\${styledContent}</div>
                  <div style="display: flex; align-items: flex-start;">
                    <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                  </div>
                </div>
              </div>
            \`;
          }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/core_app.js', code);
  console.log('Replaced successfully');
} else {
  console.log('Target not found');
}
