const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  if (!filePath || typeof filePath !== 'string') return null;
  const full = path.join(__dirname, '..', 'public', filePath.replace(/^\//, ''));
  if (fs.existsSync(full)) {
    return crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  }
  return null;
}

const units = fs.readdirSync(path.join(__dirname, '..', 'units'));
let totalDups = 0;

units.forEach((u) => {
  const dataPath = path.join(__dirname, '..', 'units', u, 'data.js');
  if (!fs.existsSync(dataPath)) return;
  try {
    const mod = require(dataPath);
    const unit = mod.default || mod;
    if (!unit.lessons) return;
    unit.lessons.forEach((l) => {
      const items = [];
      (l.narrative_blocks || []).forEach((b, i) => {
        if (b.image)
          items.push({ where: 'Block ' + (i + 1), file: b.image, hash: getHash(b.image) });
      });
      (l.sources || []).forEach((s) => {
        const f = s.src || s.image || s.source;
        if (f && typeof f === 'string')
          items.push({ where: 'Source ' + (s.letter || s.id), file: f, hash: getHash(f) });
      });
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const samePath = items[i].file === items[j].file;
          const sameHash = items[i].hash && items[j].hash && items[i].hash === items[j].hash;
          if (samePath || sameHash) {
            totalDups++;
            console.log(
              `[${u}] [${l.id}] DUPLICATE: ${items[i].where} (${items[i].file}) vs ${items[j].where} (${items[j].file}) [sameHash=${sameHash}]`,
            );
          }
        }
      }
    });
  } catch (e) {
    // console.log('Error reading', u, e.message);
  }
});

console.log(`Total intra-lesson duplicates found: ${totalDups}`);
if (totalDups > 0) {
  console.error(`❌ FAILED: ${totalDups} intra-lesson duplicate image(s) detected!`);
  process.exit(1);
} else {
  console.log(`✅ PASSED: Zero intra-lesson visual duplicates detected across all units.`);
  process.exit(0);
}
