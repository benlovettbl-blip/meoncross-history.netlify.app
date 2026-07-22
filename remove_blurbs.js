const fs = require('fs');

const path = 'edexcel_medicine/data.js';
let content = fs.readFileSync(path, 'utf8');
let jsonStr = content.replace(/^export default /, '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

// We need to remove the [Archival Photograph: ...] text from lesson_5_2, lesson_5_3, and lesson_5_4.
data.lessons.forEach(l => {
  if (l.id.startsWith('lesson_5_') && l.extended && l.extended.source_b) {
    let html = l.extended.source_b.content;
    // Replace the specific placeholder text paragraph
    html = html.replace(/<p[^>]*>\[Archival Photograph:.*?\]<\/p>/, '');
    l.extended.source_b.content = html;
  }
});

let newContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path, newContent, 'utf8');
console.log('Removed placeholder blurbs');
