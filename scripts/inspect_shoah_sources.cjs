const path = require('path');

async function main() {
  const dataPath = path.join(__dirname, '../units/the_shoah/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.the_shoah || Object.values(mod)[0];

  console.log('Unit:', data.id, '-', data.title);
  console.log('Lessons count:', data.lessons.length);

  data.lessons.forEach((l, lIdx) => {
    console.log(`\n======================================================`);
    console.log(`Lesson ${lIdx + 1} (${l.id}): ${l.title}`);
    console.log(`======================================================`);
    (l.narrative_blocks || []).forEach((b, bIdx) => {
      if (b.source) {
        const s = b.source;
        console.log(`  [Block ${bIdx + 1}] (${b.header || 'No Header'}):`);
        console.log(`    Title:   ${s.title}`);
        console.log(`    Image:   ${s.image || s.src || s.url || '(none)'}`);
        console.log(`    Caption: ${(s.caption || '').substring(0, 100)}...`);
      }
    });
    (l.sources || []).forEach((s, sIdx) => {
      console.log(`  [Lesson Level Source ${sIdx + 1}]:`);
      console.log(`    Title:   ${s.title}`);
      console.log(`    Image:   ${s.image || s.src || s.url || '(none)'}`);
      console.log(`    Caption: ${(s.caption || '').substring(0, 100)}...`);
    });
  });
}

main().catch(console.error);
