const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));
const cme = db['cme_new'].data;

console.log('=== CME LESSONS & SOURCES ===\n');

cme.lessons.forEach((l, idx) => {
  console.log(`--- Lesson ${idx + 1}: ${l.title} ---`);

  if (l.teacher_notes && l.teacher_notes.source_context) {
    let sc = l.teacher_notes.source_context;
    let scStr = typeof sc === 'string' ? sc : JSON.stringify(sc);
    console.log(`  Source Context: ${scStr.substring(0, 160)}...`);
  }

  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((nb, bIdx) => {
      if (nb.source) {
        console.log(
          `  Block ${bIdx} Source: ${nb.source.title || nb.source.letter} | Img: ${nb.source.image} | Citation: ${nb.source.citation || 'none'}`,
        );
      }
    });
  }
  console.log('');
});
