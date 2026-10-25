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

function loadUnitData(unitPath) {
  if (!fs.existsSync(unitPath)) return null;
  let code = fs.readFileSync(unitPath, 'utf8');
  code = code.replace(/export\s+const\s+/g, 'const ').replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const fakeWindow = {};
  const fn = new Function('window', code + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
  try {
    return fn(fakeWindow);
  } catch (e) {
    return null;
  }
}

function auditUnit(unitId, unitPath) {
  const data = loadUnitData(unitPath);
  if (!data) return { error: `Failed to load ${unitPath}` };

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

  return {
    unitId,
    title: data.title || unitId,
    canonicalSourcesCount: canonicalSources.length,
    uniqueImageHashes: sourceHashMap.size,
    missingFiles,
    duplicateAlerts
  };
}

const units = [
  'australia', 'cme_new', 'cold_war', 'early_modern_world', 'edexcel_medicine',
  'eee', 'first_british_empire', 'great_war', 'great_war_part2', 'industrialisation_and_empire',
  'ks2_ww2', 'medieval_england', 'monarchy_religion_power', 'post_war_britain',
  'second_british_empire', 'the_shoah', 'trip_ypres', 'usa', 'water_and_sanitation', 'weimar_nazi_germany'
];

console.log('=== PLATFORM-WIDE INTERNAL INTEGRITY AUDIT ===');
let overallSources = 0;
let overallMissing = 0;
let overallDuplicates = 0;

units.forEach(u => {
  const res = auditUnit(u, `./units/${u}/data.js`);
  if (res.error) {
    console.log(`❌ ${u}: ${res.error}`);
    return;
  }
  overallSources += res.canonicalSourcesCount;
  overallMissing += res.missingFiles.length;
  overallDuplicates += res.duplicateAlerts.length;

  const status = (res.missingFiles.length === 0 && res.duplicateAlerts.length === 0) ? '✅ PERFECT' : '⚠️ ISSUES';
  console.log(`${status} [${u.padEnd(28)}] Sources: ${String(res.canonicalSourcesCount).padStart(2)} | Unique Hashes: ${String(res.uniqueImageHashes).padStart(2)} | Missing: ${res.missingFiles.length} | Dupes: ${res.duplicateAlerts.length}`);
  if (res.missingFiles.length > 0) {
    res.missingFiles.forEach(m => console.log(`   ❌ Missing: L${m.lessonIndex} ${m.sourceLetter}: ${m.image}`));
  }
  if (res.duplicateAlerts.length > 0) {
    res.duplicateAlerts.forEach(d => console.log(`   ⚠️ Dupe: L${d.current.lessonIndex} ${d.current.sourceLetter} duplicates L${d.prior.lessonIndex} ${d.prior.sourceLetter} (${d.current.image})`));
  }
});

console.log('==============================================');
console.log(`Total Sources: ${overallSources} | Total Missing: ${overallMissing} | Total Intra-Unit Dupes: ${overallDuplicates}`);
