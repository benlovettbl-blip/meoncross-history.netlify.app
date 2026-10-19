const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Find KS2 WW2 in database.json
let ks2ww2 = null;
if (db.units) {
  ks2ww2 = db.units.find((u) => u.id === 'ks2_ww2');
} else if (Array.isArray(db)) {
  ks2ww2 = db.find((u) => u.id === 'ks2_ww2');
}

if (!ks2ww2) {
  // search all keys
  for (const k of Object.keys(db)) {
    if (db[k] && db[k].id === 'ks2_ww2') ks2ww2 = db[k];
  }
}

if (ks2ww2) {
  console.log('Found ks2_ww2 in database.json:');
  console.log('Lessons count:', ks2ww2.lessons ? ks2ww2.lessons.length : 0);
  if (ks2ww2.lessons) {
    ks2ww2.lessons.forEach((l, idx) => {
      console.log(`L${idx + 1}: ${l.title}`);
      if (l.source_a) console.log(`   Source A: ${l.source_a.title}`);
      if (l.source_b) console.log(`   Source B: ${l.source_b.title}`);
    });
  }
} else {
  console.log('ks2_ww2 not found as top-level object in database.json');
}
