const fs = require('fs');
const path = require('path');
const weimar = require('../units/weimar_nazi_germany/data.js');
const u = weimar.default || weimar;
const root = path.resolve(__dirname, '..');

console.log('=== WEIMAR & NAZI GERMANY: COMPREHENSIVE VISUAL & SOURCE AUDIT ===\n');

let issues = 0;
let visualCount = 0;
let writtenCount = 0;

u.lessons.forEach((l) => {
  // 1. Narrative blocks
  (l.narrative_blocks || []).forEach((b, bIdx) => {
    if (b.image) {
      visualCount++;
      const p = path.join(root, 'public', b.image.replace(/^\//, ''));
      if (!fs.existsSync(p)) {
        console.error(`❌ [${l.id}] Block ${bIdx + 1} image missing: ${b.image}`);
        issues++;
      }
    }
  });

  // 2. Sources parity and existence
  (l.sources || []).forEach((s, sIdx) => {
    const expectedLetter = String.fromCharCode(65 + sIdx);
    if (s.letter !== expectedLetter) {
      console.error(
        `❌ [${l.id}] Source ${sIdx + 1} letter mismatch: '${s.letter}' vs '${expectedLetter}'`,
      );
      issues++;
    }

    const img = s.image || s.src;
    if (img) {
      visualCount++;
      const p = path.join(root, 'public', img.replace(/^\//, ''));
      if (!fs.existsSync(p)) {
        console.error(`❌ [${l.id}] Source ${expectedLetter} image missing: ${img}`);
        issues++;
      }
    } else {
      writtenCount++;
    }

    // Verify block source parity
    const b = l.narrative_blocks[sIdx];
    if (b && b.source && b.source.id !== s.id) {
      console.error(`❌ [${l.id}] Block ${sIdx + 1} b.source mismatch: ${b.source.id} vs ${s.id}`);
      issues++;
    }
  });
});

console.log(
  `Audited ${u.lessons.length} lessons: ${visualCount} visual assets, ${writtenCount} written sources.`,
);
if (issues === 0) {
  console.log(
    '✅ 100% CLEAN: Zero visual mismatches, zero missing files, 100% block-to-source parity.',
  );
  process.exit(0);
} else {
  console.error(`❌ FAILED: ${issues} issue(s) detected.`);
  process.exit(1);
}
