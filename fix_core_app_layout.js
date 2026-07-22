const fs = require('fs');

let c = fs.readFileSync('src/core_app.js', 'utf8');

const targetStr = `        let sourceHtml = '';
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
        }`;

const replaceStr = `        let sourceHtml = '';
        if (lesson.extended.source_a || lesson.extended.source_b) {
          sourceHtml = \`<div style="display: flex; gap: 20px; margin: 15px 0;">\`;
          if (lesson.extended.source_a) {
             const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
             const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
             sourceHtml += \`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
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
             sourceHtml += \`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 \${prov ? \`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">\${prov}</span>\` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   \${content.replace(/\\n/g, '<br>')}
                 </div>
               </div>\`;
          }
          sourceHtml += \`</div>\`;
          if (lesson.extended.provenance_clue) {
            sourceHtml += \`<div style="margin-top: 15px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;"><strong style="color: #166534;"><i class="fa-solid fa-magnifying-glass"></i> Provenance Scaffolding:</strong> <span style="color: #15803d;">\${lesson.extended.provenance_clue}</span></div>\`;
          }
        }`;

if (c.includes(targetStr)) {
  c = c.replace(targetStr, replaceStr);
  fs.writeFileSync('src/core_app.js', c, 'utf8');
  console.log('Successfully replaced block');
} else {
  console.log('Target string not found!');
}
