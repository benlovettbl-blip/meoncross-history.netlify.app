const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));
const w = db['weimar_nazi_germany'].data || db['weimar_nazi_germany'];

w.lessons.forEach((l, i) => {
  console.log(`\n======================================================`);
  console.log(`LESSON ${i + 1}: ${l.id} - ${l.title}`);
  console.log(`Card Image: ${l.card_image || l.image || 'None'}`);
  console.log(`Hero Image: ${l.hero_image || 'None'}`);

  if (l.sources) {
    console.log(`  --- l.sources (${l.sources.length}) ---`);
    l.sources.forEach((s, sIdx) => {
      console.log(`    [Source ${s.id || s.letter || sIdx + 1}]: "${s.title || ''}"`);
      console.log(`      Image: ${s.image || s.url || s.image_url || 'NO IMAGE'}`);
      console.log(`      Caption: ${s.caption || ''}`);
      console.log(`      Provenance: ${s.provenance || s.citation || ''}`);
    });
  }

  if (l.narrative_blocks) {
    console.log(`  --- narrative_blocks sources ---`);
    l.narrative_blocks.forEach((nb, bIdx) => {
      if (nb.source) {
        console.log(
          `    [Block ${bIdx + 1} / Source ${nb.source.letter || nb.source.id}]: "${nb.source.title || ''}"`,
        );
        console.log(`      Image: ${nb.source.image || 'NO IMAGE'}`);
        console.log(`      Caption: ${nb.source.caption || ''}`);
        console.log(`      Citation: ${nb.source.citation || ''}`);
        console.log(`      Context: ${nb.source.context || ''}`);
        console.log(`      Hinge Q: ${nb.source.hinge_question || ''}`);
      }
    });
  }
});
