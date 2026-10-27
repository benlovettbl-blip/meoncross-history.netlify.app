const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buf = fs.readFileSync(filePath);
  return {
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
    size: buf.length
  };
}

const data = JSON.parse(fs.readFileSync('data/eee.json', 'utf8'));

console.log('=== AUDITING EEE UNIT ===');
console.log('Unit Title:', data.title);
console.log('Total Lessons:', data.lessons.length);

const allSources = [];
const allPlates = [];
const hashMap = new Map();

data.lessons.forEach((l, lIdx) => {
  const lessonNum = lIdx + 1;
  console.log(`\n--------------------------------------------------`);
  console.log(`LESSON ${lessonNum}: ${l.id} - "${l.title}"`);
  
  // 1. Primary Sources
  console.log(`  [Primary Sources] Count: ${(l.sources || []).length}`);
  (l.sources || []).forEach(s => {
    const imgPath = s.image || s.src;
    let fullPath = null;
    let exists = false;
    let hash = null;
    if (imgPath) {
      fullPath = path.join('public', imgPath.replace(/^\//, ''));
      exists = fs.existsSync(fullPath);
      if (exists) hash = getHash(fullPath);
    }
    const info = {
      type: 'primary_source',
      lessonNum,
      letter: s.letter,
      title: s.title,
      image: imgPath,
      exists,
      hash
    };
    allSources.push(info);
    console.log(`    Source ${s.letter}: "${s.title}"`);
    console.log(`      Path: ${imgPath || 'NONE'} | Exists: ${exists} | Size: ${hash ? hash.size : 0} bytes`);
  });

  // 2. Narrative Blocks
  const nbs = l.narrative_blocks || [];
  console.log(`  [Narrative Blocks] Count: ${nbs.length}`);
  nbs.forEach((b, bIdx) => {
    const hasImg = !!b.image;
    if (hasImg) {
      const fullPath = path.join('public', b.image.replace(/^\//, ''));
      const exists = fs.existsSync(fullPath);
      const hash = exists ? getHash(fullPath) : null;
      allPlates.push({
        type: 'narrative_plate',
        lessonNum,
        blockIndex: bIdx,
        image: b.image,
        caption: b.caption,
        exists,
        hash
      });
      console.log(`    Block ${bIdx} Plate: "${b.caption ? b.caption.slice(0, 60) + '...' : 'No caption'}"`);
      console.log(`      Path: ${b.image} | Exists: ${exists} | Size: ${hash ? hash.size : 0} bytes`);
    }
  });
});

console.log('\n==================================================');
console.log('SUMMARY:');
console.log('Total Primary Sources:', allSources.length);
console.log('Total Narrative Plates:', allPlates.length);

const missingSources = allSources.filter(s => s.image && !s.exists);
console.log('Missing Primary Source Files:', missingSources.length);
if (missingSources.length > 0) {
  missingSources.forEach(s => console.log('  ❌ Missing:', s.lessonNum, s.letter, s.title, s.image));
}

const missingPlates = allPlates.filter(p => !p.exists);
console.log('Missing Narrative Plate Files:', missingPlates.length);
if (missingPlates.length > 0) {
  missingPlates.forEach(p => console.log('  ❌ Missing:', p.lessonNum, p.blockIndex, p.image));
}

// Check for duplicates
const combined = [...allSources.filter(s => s.hash), ...allPlates.filter(p => p.hash)];
const seenHashes = new Map();
const duplicates = [];

combined.forEach(item => {
  const sha = item.hash.sha256;
  if (seenHashes.has(sha)) {
    duplicates.push({ item, original: seenHashes.get(sha) });
  } else {
    seenHashes.set(sha, item);
  }
});

console.log('Duplicate Images in EEE:', duplicates.length);
duplicates.forEach(d => {
  console.log(`  ⚠️ Duplicate: [${d.item.type} L${d.item.lessonNum} ${d.item.letter || d.item.blockIndex}] "${d.item.title || d.item.caption}" matches [${d.original.type} L${d.original.lessonNum} ${d.original.letter || d.original.blockIndex}] "${d.original.title || d.original.caption}" (${d.item.image})`);
});
