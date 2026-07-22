const fs = require('fs');
let c = fs.readFileSync('src/core_app.js', 'utf8');

const startStr = "      if (lesson.extended && lesson.extended.question) {";
const endStr = "      // 2. Render standard GCSE tasks";

const startIdx = c.indexOf(startStr);
const endIdx = c.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
  const newBlock = `      if (lesson.extended && lesson.extended.question) {
        let hintsHtml = '';
        if (lesson.extended.hints && lesson.extended.hints.length > 0) {
           hintsHtml = \`<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">\${lesson.extended.hints.map(h => \`<li>\${formatBold(h)}</li>\`).join('')}</ul></div>\`;
        }

        let sourceHtml = '';
        if (lesson.extended.source_a || lesson.extended.source_b) {
          sourceHtml = \`<div style="display: flex; gap: 20px; margin: 15px 0;">\`;
          if (lesson.extended.source_a) {
             sourceHtml += \`<div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.95rem; line-height: 1.5;"><strong style="color: #1e3a8a; display: block; margin-bottom: 10px;">Source A</strong>\${lesson.extended.source_a.replace(/\\n/g, '<br>')}</div>\`;
          }
          if (lesson.extended.source_b) {
             sourceHtml += \`<div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.95rem; line-height: 1.5;"><strong style="color: #1e3a8a; display: block; margin-bottom: 10px;">Source B</strong>\${lesson.extended.source_b.replace(/\\n/g, '<br>')}</div>\`;
          }
          sourceHtml += \`</div>\`;
          if (lesson.extended.provenance_clue) {
            sourceHtml += \`<div style="margin-top: 15px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;"><strong style="color: #166534;"><i class="fa-solid fa-magnifying-glass"></i> Provenance Scaffolding:</strong> <span style="color: #15803d;">\${lesson.extended.provenance_clue}</span></div>\`;
          }
        }

        gcseHtml += \`
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              \${formatQuestion(lesson.extended.question)}
              <span style="display: inline-flex; vertical-align: middle;">
                \${lesson.extended.model || lesson.extended.answer ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extended-model-\${lesson.id}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
              </span>
            </div>
            \${sourceHtml}
            \${hintsHtml}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>

            \${lesson.extended.model || lesson.extended.answer ? \`<div id="extended-model-\${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${lesson.extended.model || lesson.extended.answer}</div>\` : ''}
          </div>
        \`;
      }

      `;
  
  c = c.substring(0, startIdx) + newBlock + c.substring(endIdx);
  fs.writeFileSync('src/core_app.js', c, 'utf8');
  console.log('Successfully replaced block');
} else {
  console.log('Could not find indices', startIdx, endIdx);
}
