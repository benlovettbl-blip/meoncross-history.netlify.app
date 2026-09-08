const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, '../data/cme_new.json'),
  path.join(__dirname, '../public/data/cme_new.json'),
];

filesToUpdate.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  // 1. Update Lesson 1 Title
  const l1 = data.lessons.find((l) => l.id === 'lesson_1');
  if (l1) {
    l1.title =
      'KT 1.0: Broken Promises & Imperial Borders: Why Was Conflict in the Middle East Inevitable?';
  }

  // 2. Fix Lesson 4 issues
  const l4 = data.lessons.find((l) => l.id === 'lesson_4');
  if (l4) {
    // A. Remove duplicate Nasser photo from Block 0
    if (l4.narrative_blocks && l4.narrative_blocks[0]) {
      delete l4.narrative_blocks[0].image;
      delete l4.narrative_blocks[0].caption;
      delete l4.narrative_blocks[0].image_caption;
      delete l4.narrative_blocks[0].image_alt;
    }

    // B. Minify table in Block 12 to eliminate any stray newlines
    if (l4.narrative_blocks && l4.narrative_blocks[12]) {
      if (l4.narrative_blocks[12].text) {
        l4.narrative_blocks[12].text = l4.narrative_blocks[12].text.replace(
          /<table[\s\S]*?<\/table>/gi,
          (match) => match.replace(/\r?\n\s*/g, ' '),
        );
      }
      if (l4.narrative_blocks[12].level_4) {
        l4.narrative_blocks[12].level_4 = l4.narrative_blocks[12].level_4.replace(
          /<table[\s\S]*?<\/table>/gi,
          (match) => match.replace(/\r?\n\s*/g, ' '),
        );
      }
    }

    // C. Enlarge flowchart in Block 13 from max-width: 300px to max-width: 700px
    if (l4.narrative_blocks && l4.narrative_blocks[13]) {
      if (l4.narrative_blocks[13].text) {
        l4.narrative_blocks[13].text = l4.narrative_blocks[13].text.replace(
          /max-width:\s*300px/g,
          'max-width: 700px',
        );
      }
      if (l4.narrative_blocks[13].level_4) {
        l4.narrative_blocks[13].level_4 = l4.narrative_blocks[13].level_4.replace(
          /max-width:\s*300px/g,
          'max-width: 700px',
        );
      }
    }

    // Harmonize l4.sources on root
    if (l4.sources && l4.sources[0]) {
      // Ensure source 0 on root reflects Source A Nasser, not duplicate British Troops
      l4.sources[0] = {
        title: 'Source A: President Gamal Abdel Nasser (1956)',
        src: '/images/cme_nasser_1956.jpg',
        source: '/images/cme_nasser_1956.jpg',
        caption:
          'Primary Photograph: President Gamal Abdel Nasser of Egypt, whose nationalisation of the Suez Canal in July 1956 electrified the Arab world.',
        question:
          "Study Source A. Why did Nasser's charismatic leadership and anti-colonial stance inspire such widespread devotion across the Arab world?",
      };
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated JSON:', file);
});

// Now update units/cme_new/data.js and public/units/cme_new/data.js
const jsFiles = [
  path.join(__dirname, '../units/cme_new/data.js'),
  path.join(__dirname, '../public/units/cme_new/data.js'),
];

const jsonData = JSON.parse(fs.readFileSync(filesToUpdate[0], 'utf8'));
const jsContent = `export const unitData = ${JSON.stringify(jsonData, null, 2)};\n`;

jsFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.writeFileSync(file, jsContent, 'utf8');
    console.log('Updated JS:', file);
  }
});
