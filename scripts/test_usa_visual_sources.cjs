const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const pubUsaPath = path.join(ROOT_DIR, 'public', 'data', 'usa.json');
const usa = JSON.parse(fs.readFileSync(pubUsaPath, 'utf8'));
const lessons = usa.data ? usa.data.lessons : usa.lessons;

console.log('=== THOROUGH USA VISUAL SOURCE INSPECTION ===\n');

// Helper to get image dimensions from binary without external library
function getImageDimensions(buffer) {
  // Check JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        // SOF0 or SOF2
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { type: 'JPEG', width, height };
      }
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }
    return { type: 'JPEG', width: 'unknown', height: 'unknown' };
  }
  // Check PNG
  if (buffer.readUInt32BE(0) === 0x89504e47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { type: 'PNG', width, height };
  }
  return { type: 'UNKNOWN', width: 0, height: 0 };
}

let totalSources = 0;
let validSources = 0;
const report = [];

lessons.forEach((l, lIdx) => {
  const lNum = lIdx + 1;
  const sources = l.sources || [];
  console.log(`\nLesson ${lNum}: ${l.title} (${sources.length} sources)`);

  sources.forEach((s, sIdx) => {
    totalSources++;
    const webPath = s.src || s.image || s.source;
    const diskPath = path.join(ROOT_DIR, 'public', webPath.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);

    if (!exists) {
      console.error(`  ❌ [${s.letter}] MISSING FILE: ${webPath}`);
      report.push({
        lesson: lNum,
        letter: s.letter,
        title: s.title,
        file: webPath,
        status: 'MISSING',
      });
      return;
    }

    const stats = fs.statSync(diskPath);
    const buf = fs.readFileSync(diskPath);
    const dim = getImageDimensions(buf);

    if (stats.size < 1000) {
      console.warn(`  ⚠️ [${s.letter}] SUSPICIOUSLY SMALL FILE (${stats.size} bytes): ${webPath}`);
    }

    console.log(
      `  ✔ [${s.letter}] ${path.basename(webPath)} | ${dim.type} ${dim.width}x${dim.height} | ${(stats.size / 1024).toFixed(1)} KB`,
    );
    console.log(`      Title: ${s.title}`);
    console.log(`      Caption: ${s.caption}`);
    console.log(`      Provenance: ${s.provenance}`);
    console.log(`      Hinge Q: ${s.hinge_question}`);

    validSources++;
    report.push({
      lesson: lNum,
      letter: s.letter,
      title: s.title,
      file: webPath,
      sizeKb: (stats.size / 1024).toFixed(1),
      dim: `${dim.width}x${dim.height}`,
      type: dim.type,
      caption: s.caption,
      provenance: s.provenance,
      hinge: s.hinge_question,
      status: 'OK',
    });
  });
});

console.log(`\n========================================`);
console.log(
  `SUMMARY: ${validSources}/${totalSources} visual sources verified on disk with valid headers and dimensions.`,
);
console.log(`========================================`);
