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
        }`;

const replaceStr = `    if (lesson.extended && lesson.extended.question) {
        if (lesson.extended.source_a || lesson.extended.source_b) {
            html += \`<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 20px; page-break-inside: avoid;">\`;
            if (lesson.extended.source_a) {
              const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
              const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
              html += \`<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                \${prov ? \`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">\${prov}</span>\` : ''}
                <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                  \${content.replace(/\\n/g, '<br>')}
                </div>
              </div>\`;
            }
            if (lesson.extended.source_b) {
              const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
              const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
              html += \`<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                \${prov ? \`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">\${prov}</span>\` : ''}
                <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                  \${content.replace(/\\n/g, '<br>')}
                </div>
              </div>\`;
            }
            html += \`</div>\`;
        }

        if (lesson.extended.provenance_clue) {
             html += \`<div style="margin-top: 15px; margin-bottom: 15px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; page-break-inside: avoid;"><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">\${formatBold(lesson.extended.provenance_clue)}</p></div>\`;
        }`;

if (c.includes(targetStr)) {
  c = c.replace(targetStr, replaceStr);
  fs.writeFileSync('edexcel_medicine/generate_worksheets.js', c, 'utf8');
  console.log('Successfully replaced block');
} else {
  console.log('Target string not found!');
}
