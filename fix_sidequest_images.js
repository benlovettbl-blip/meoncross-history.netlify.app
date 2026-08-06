const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const prefix = 'export const unitData = ';
const jsonStr = content.replace(prefix, '').trim().replace(/;$/, '');

let data = eval('(' + jsonStr + ')');

data.lessons.forEach(l => {
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            if (b.title && b.title.includes('Side Quest') && b.image) {
                const imgHtml = `
<div style="text-align:center; margin:15px 0;">
  <img src="${b.image}" style="max-width:100%; max-height:300px; border-radius:8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: zoom-in;" onclick="window.openModal && window.openModal(this.src)"/>
  <br/>
  <i style="font-size:0.9em; color:#64748b;"><strong>Source ${b.source_letter}:</strong> ${b.image_caption}</i>
</div>
`;
                b.text = b.text.replace('<p>', imgHtml + '<p>');
                delete b.image;
                delete b.image_alt;
                delete b.image_caption;
                delete b.source_letter;
            }
        });
    }
});

const output = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Fixed side quest images.');
