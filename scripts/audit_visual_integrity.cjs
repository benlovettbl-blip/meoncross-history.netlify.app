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
  code = code.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
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
  const syncMismatches = [];

  if (data.lessons) {
    data.lessons.forEach((l, lIdx) => {
      const lessonNum = lIdx + 1;
      const lessonTitle = l.title;

      // Audit canonical sources
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
            hashInfo,
            citation: s.citation || s.attribution || 'None'
          };
          canonicalSources.push(rec);

          if (!exists) {
            missingFiles.push(rec);
          } else if (hashInfo) {
            if (sourceHashMap.has(hashInfo.sha256)) {
              const prior = sourceHashMap.get(hashInfo.sha256);
              duplicateAlerts.push({
                current: rec,
                prior
              });
            } else {
              sourceHashMap.set(hashInfo.sha256, rec);
            }
          }
        });
      }

      // Check narrative block source synchronization
      if (l.narrative_blocks && Array.isArray(l.narrative_blocks)) {
        l.narrative_blocks.forEach((nb, nbIdx) => {
          if (nb.source) {
            const nbSource = nb.source;
            const letter = nbSource.letter || (nbSource.title && nbSource.title.includes('Source B') ? 'B' : 'A');
            const matchingCanonical = l.sources ? l.sources.find(cs => (cs.letter === letter || cs.title.includes(`Source ${letter}`))) : null;

            if (matchingCanonical && nbSource.image !== matchingCanonical.image) {
              syncMismatches.push({
                lessonIndex: lessonNum,
                lessonTitle,
                sourceLetter: letter,
                narrativeImage: nbSource.image,
                canonicalImage: matchingCanonical.image
              });
            }
          }
        });
      }
    });
  }

  return {
    unitId,
    title: data.title,
    canonicalSourcesCount: canonicalSources.length,
    uniqueImageHashes: sourceHashMap.size,
    canonicalSources,
    duplicateAlerts,
    missingFiles,
    syncMismatches
  };
}

const targetUnit = process.argv[2] || 'first_british_empire';
const targetPath = `./units/${targetUnit}/data.js`;

console.log(`\n========================================`);
console.log(`Auditing unit: ${targetUnit}...`);
const audit = auditUnit(targetUnit, targetPath);
if (audit.error) {
  console.error(audit.error);
  process.exit(1);
}

console.log(`Unit Title: ${audit.title}`);
console.log(`Canonical Sources: ${audit.canonicalSourcesCount}`);
console.log(`Unique Image Hashes: ${audit.uniqueImageHashes}`);
console.log(`Missing Image Files: ${audit.missingFiles.length}`);
console.log(`Duplicate Source Clones: ${audit.duplicateAlerts.length}`);
console.log(`Narrative Sync Mismatches: ${audit.syncMismatches.length}`);

if (audit.missingFiles.length > 0) {
  console.log('\n❌ MISSING IMAGE FILES:');
  audit.missingFiles.forEach((m, i) => {
    console.log(`  [${i + 1}] Lesson ${m.lessonIndex} Source ${m.sourceLetter}: "${m.title}" -> ${m.image}`);
  });
}

if (audit.duplicateAlerts.length > 0) {
  console.log('\n⚠️ DUPLICATE SOURCE CLONES DETECTED:');
  audit.duplicateAlerts.forEach((d, i) => {
    console.log(`  [Duplicate #${i + 1}]`);
    console.log(`    Original: Lesson ${d.prior.lessonIndex} Source ${d.prior.sourceLetter}: "${d.prior.title}" (${d.prior.image})`);
    console.log(`    Clone:    Lesson ${d.current.lessonIndex} Source ${d.current.sourceLetter}: "${d.current.title}" (${d.current.image})`);
  });
}

if (audit.syncMismatches.length > 0) {
  console.log('\n⚠️ NARRATIVE SYNC MISMATCHES DETECTED:');
  audit.syncMismatches.forEach((m, i) => {
    console.log(`  [Mismatch #${i + 1}] Lesson ${m.lessonIndex} Source ${m.sourceLetter}: narrative image (${m.narrativeImage}) != canonical image (${m.canonicalImage})`);
  });
}

console.log('\n--- Canonical Sources Inventory ---');
audit.canonicalSources.forEach((s, idx) => {
  console.log(`[${idx + 1}] Lesson ${s.lessonIndex} Source ${s.sourceLetter}: "${s.title}" -> ${s.image} (SHA: ${s.hashInfo ? s.hashInfo.sha256.substring(0, 10) : 'N/A'}, Size: ${s.hashInfo ? s.hashInfo.size : 0} bytes)`);
});
console.log(`========================================\n`);
