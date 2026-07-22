const fs = require('fs');

let c = fs.readFileSync('src/core_app.js', 'utf8');

const targetStr = `          if (lesson.extended.provenance_clue) {
            sourceHtml += \`<div style="margin-top: 15px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;"><strong style="color: #166534;"><i class="fa-solid fa-magnifying-glass"></i> Provenance Scaffolding:</strong> <span style="color: #15803d;">\${lesson.extended.provenance_clue}</span></div>\`;
          }`;

const replaceStr = `          if (lesson.extended.provenance_clue) {
            sourceHtml += \`<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                \${lesson.extended.provenance_clue}
              </div>
            </details>\`;
          }`;

if (c.includes(targetStr)) {
  c = c.replace(targetStr, replaceStr);
  fs.writeFileSync('src/core_app.js', c, 'utf8');
  console.log('Successfully replaced block');
} else {
  console.log('Target string not found!');
}
