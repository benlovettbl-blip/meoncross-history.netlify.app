const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));
const w = db['weimar_nazi_germany'].data || db['weimar_nazi_germany'];

console.log('Unit title:', w.title);
console.log('Total lessons:', w.lessons.length);
console.log('Key individuals:', w.key_individuals ? w.key_individuals.length : 0);

w.lessons.forEach((l, i) => {
  const sources = l.sources ? l.sources.length : 0;
  const nbSources = l.narrative_blocks ? l.narrative_blocks.filter((nb) => nb.source).length : 0;
  const actSources = l.activities ? l.activities.filter((a) => a.source_image).length : 0;
  console.log(
    `L${i + 1} (${l.id}): "${l.title}" | sources=${sources}, nbSources=${nbSources}, actSources=${actSources}`,
  );
});
