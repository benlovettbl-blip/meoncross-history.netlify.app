const fs = require('fs');
let c = fs.readFileSync('edexcel_medicine/generate_worksheets.js', 'utf8');

const targetStr = `    if (lesson.extended && lesson.extended.question) {
        if (lesson.extended.source_a || lesson.extended.source_b) {
            html += \`<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 20px; page-break-inside: avoid;">\`;
            if (lesson.extended.source_a) {
                html += \`<div style="flex: 1; padding: 15px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px;">
                  <strong style="color: #334155; display: block; border-bottom: 2px solid #94a3b8; padding-bottom: 5px; margin-bottom: 10px;">Source A</strong>
                <p style="color: #475569; font-size: 0.95rem; line-height: 1.5; margin: 0;">\${lesson.extended.source_a}</p>
                </div>\`;
              }
            if (lesson.extended.source_b) {
                html += \`<div style="flex: 1; padding: 15px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px;">
                  <strong style="color: #334155; display: block; border-bottom: 2px solid #94a3b8; padding-bottom: 5px; margin-bottom: 10px;">Source B</strong>
                <div style="color: #475569; font-size: 0.95rem; line-height: 1.5; margin: 0;">\${lesson.extended.source_b}</div>
                </div>\`;
              }
              html += \`</div>\`;
          }

        if (lesson.extended.provenance_clue) {
             html += \`<div style="margin-top: 15px; margin-bottom: 15px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; page-break-inside: avoid;"><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">\${formatBold(lesson.extended.provenance_clue)}</p></div>\`;
          }

        html += \`<div style="margin-top: 15px;"><strong>Q\${lesson.extended.qNum}. \${formatBold(lesson.extended.question)}</strong></div>\`;
        renderLines(lesson.extended.question);
        html += \`<br>\`;
    }`;

// Wait, looking at grep results from earlier, generate_worksheets.js DOES NOT HAVE source_a!
// Let me double check what is actually in generate_worksheets.js
// Ah, my previous edit failed there too!
