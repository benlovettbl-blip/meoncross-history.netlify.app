const fs = require('fs');

const d = JSON.parse(fs.readFileSync('data/the_shoah.json', 'utf8'));
const unit = d.data || d;

unit.lessons.forEach((l, lIdx) => {
  console.log(`\nLesson ${lIdx + 1}: ${l.id} - ${l.title}`);
  l.sources.forEach((s, sIdx) => {
    const letter = String.fromCharCode(65 + sIdx);
    console.log(`  Source ${letter}: has_image=${!!s.image} | image=${s.image || 'NONE'} | title=${(s.title || s.caption || s.text || '').slice(0, 70)}`);
  });
});
