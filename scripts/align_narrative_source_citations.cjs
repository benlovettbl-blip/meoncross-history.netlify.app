const fs = require('fs');
const path = require('path');

// 1. Align EEE
const eeePath = path.resolve(__dirname, '../units/eee/data.js');
const eeeRaw = require(eeePath);
const eeeData = eeeRaw.default || eeeRaw;

console.log('Aligning EEE narrative source citations...');

eeeData.lessons.forEach((l) => {
  l.narrative_blocks.forEach((b, idx) => {
    const actNum = b.act || idx + 1;
    const sourceLetter = b.source ? b.source.letter : null;

    if (sourceLetter === 'B') {
      // If block has Source B, update any "Source A" in its text to "Source B"
      if (b.text && b.text.includes('Source A')) {
        b.text = b.text.replace(/Source A/g, 'Source B');
        console.log(`[EEE] ${l.id} Act ${actNum}: Updated citation Source A -> Source B`);
      }
    }
  });
});

fs.writeFileSync(eeePath, `export default ${JSON.stringify(eeeData, null, 2)};\n`, 'utf8');
console.log('Saved EEE data.js');

// 2. Align Weimar
const weimarPath = path.resolve(__dirname, '../units/weimar_nazi_germany/data.js');
const weimarRaw = require(weimarPath);
const weimarData = weimarRaw.unitData;

console.log('Aligning Weimar narrative source citations...');

weimarData.lessons.forEach((l) => {
  l.narrative_blocks.forEach((b, idx) => {
    const actNum = b.act || idx + 1;
    const actualLetter = b.source ? b.source.letter : null;

    if (b.text) {
      if (actualLetter) {
        // If block has a source, ensure any cited letter matches actualLetter
        b.text = b.text.replace(
          /<span class="archival-meta-tag">Source [A-Z]<\/span>/g,
          `<span class="archival-meta-tag">Source ${actualLetter}</span>`,
        );
        b.text = b.text.replace(/\(Source [A-Z]\)/g, `(Source ${actualLetter})`);
      } else {
        // If block has no source, remove any orphan source tag
        b.text = b.text.replace(/\s*\(<span class="archival-meta-tag">Source [A-Z]<\/span>\)/g, '');
        b.text = b.text.replace(/\s*\(Source [A-Z]\)/g, '');
      }
    }
  });

  // Ensure each block WITH a source has a reference in its text if not already present
  l.narrative_blocks.forEach((b, idx) => {
    if (b.source && b.source.letter && b.text) {
      const tag = `<span class="archival-meta-tag">Source ${b.source.letter}</span>`;
      if (!b.text.includes(tag) && !b.text.includes(`Source ${b.source.letter}`)) {
        // Add subtle reference after the first paragraph ref
        b.text = b.text.replace(/(<span class="para-ref">\[\d+\.\d+\]<\/span>)/, `$1 (${tag})`);
      }
    }
  });
});

fs.writeFileSync(
  weimarPath,
  `export const unitData = ${JSON.stringify(weimarData, null, 2)};\nexport default unitData;\n`,
  'utf8',
);
console.log('Saved Weimar data.js');
