const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return {
    sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
    md5: crypto.createHash('md5').update(buffer).digest('hex'),
    size: buffer.length
  };
}

const dbPath = path.resolve('public/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== GLOBAL DATABASE VISUAL INTEGRITY AUDIT ===');

let totalUnits = 0;
let totalSources = 0;
let totalMissing = 0;
let totalIntraUnitDupes = 0;

const unitResults = [];

for (const [unitId, unitObj] of Object.entries(db)) {
  totalUnits++;
  const data = unitObj.data || unitObj;
  const canonicalSources = [];
  const sourceHashMap = new Map();
  const duplicateAlerts = [];
  const missingFiles = [];

  if (data.lessons) {
    data.lessons.forEach((l, lIdx) => {
      const lessonNum = lIdx + 1;
      const lessonTitle = l.title;

      const rawSources = (l.sources && Array.isArray(l.sources) && l.sources.length > 0)
        ? l.sources
        : (l.narrative_blocks || []).map(nb => nb.source).filter(s => s && (s.image || s.src || s.image_url));

      if (rawSources && rawSources.length > 0) {
        rawSources.forEach((s, sIdx) => {
          const letter = s.letter || (sIdx === 0 ? 'A' : sIdx === 1 ? 'B' : String.fromCharCode(65 + sIdx));
          const imgRel = s.image || s.src || s.image_url;
          const fullPath = imgRel ? path.join('public', imgRel.replace(/^\//, '')) : null;
          const exists = fullPath ? fs.existsSync(fullPath) : false;
          const hashInfo = exists ? getFileHash(fullPath) : null;

          const rec = {
            lessonIndex: lessonNum,
            lessonTitle,
            sourceLetter: letter,
            title: s.title || `Source ${letter}`,
            image: imgRel,
            fullPath,
            exists,
            hashInfo
          };

          canonicalSources.push(rec);

          if (!exists && imgRel) {
            missingFiles.push(rec);
          } else if (hashInfo) {
            if (sourceHashMap.has(hashInfo.sha256)) {
              duplicateAlerts.push({
                current: rec,
                prior: sourceHashMap.get(hashInfo.sha256)
              });
            } else {
              sourceHashMap.set(hashInfo.sha256, rec);
            }
          }
        });
      }
    });
  }

  totalSources += canonicalSources.length;
  totalMissing += missingFiles.length;
  totalIntraUnitDupes += duplicateAlerts.length;

  unitResults.push({
    unitId,
    title: data.title || unitId,
    count: canonicalSources.length,
    uniqueHashes: sourceHashMap.size,
    missing: missingFiles,
    duplicates: duplicateAlerts
  });
}

unitResults.sort((a, b) => a.unitId.localeCompare(b.unitId));

unitResults.forEach(r => {
  const status = (r.missing.length === 0 && r.duplicates.length === 0) ? '✅ PERFECT' : '⚠️ ISSUES';
  console.log(`${status} [${r.unitId.padEnd(28)}] Sources: ${String(r.count).padStart(2)} | Unique Hashes: ${String(r.uniqueHashes).padStart(2)} | Missing: ${r.missing.length} | Dupes: ${r.duplicates.length}`);
  if (r.missing.length > 0) {
    r.missing.forEach(m => console.log(`   ❌ Missing: L${m.lessonIndex} ${m.sourceLetter}: ${m.image}`));
  }
  if (r.duplicates.length > 0) {
    r.duplicates.forEach(d => console.log(`   ⚠️ Dupe: L${d.current.lessonIndex} ${d.current.sourceLetter} duplicates L${d.prior.lessonIndex} ${d.prior.sourceLetter} (${d.current.image}) - "${d.current.title}"`));
  }
});

console.log('==============================================');
console.log(`Units Audited: ${totalUnits} | Total Sources: ${totalSources} | Total Missing: ${totalMissing} | Total Intra-Unit Dupes: ${totalIntraUnitDupes}`);
