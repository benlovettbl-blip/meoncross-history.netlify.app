/**
 * scripts/apply_cme_kt2_update.cjs
 *
 * Applies the 5-lesson Key Topic 2 curriculum to units/cme_new/data.js.
 * Replaces old lessons 5, 6, 7 with new lessons 6, 7, 8, 9, 10.
 * Renumbers KT3 lessons to 11, 12, 13 to avoid ID collision.
 * Updates timeline banner IDs.
 * Validates syntax before saving.
 */

const fs = require('fs');
const path = require('path');
const { buildKT2Lessons } = require('./build_cme_kt2_lessons.cjs');

const dataJsPath = path.resolve(__dirname, '../units/cme_new/data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

console.log('Reading current units/cme_new/data.js (length:', content.length, 'chars)');

// Find boundaries of KT2 (lesson_6 to end of lesson_10, right before lesson_11)
const lines = content.split(/\r?\n/);
let kt2StartLine = -1;
let kt3StartLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (
    lines[i].includes('lesson_6') &&
    lines[i - 1] &&
    lines[i - 1].includes('{') &&
    kt2StartLine === -1
  ) {
    kt2StartLine = i - 1; // line with '{'
  }
  if (lines[i].includes('lesson_11') && lines[i - 1] && lines[i - 1].includes('{') && i < 12000) {
    kt3StartLine = i - 1; // line with '{'
    break;
  }
}

console.log(`KT2 starts at line index: ${kt2StartLine} (line ${kt2StartLine + 1})`);
console.log(`KT3 starts at line index: ${kt3StartLine} (line ${kt3StartLine + 1})`);

if (kt2StartLine === -1 || kt3StartLine === -1) {
  console.error('❌ Failed to locate KT2 / KT3 boundaries.');
  process.exit(1);
}

// Generate the 5 new lessons
const newLessons = buildKT2Lessons();

// Format new lessons into JavaScript code
function formatLessonToJs(lesson) {
  return '    ' + JSON.stringify(lesson, null, 6).replace(/^/gm, '    ').trim();
}

const formattedNewLessons = newLessons.map((l) => formatLessonToJs(l)).join(',\n    ');

// Replace lines between kt2StartLine and kt3StartLine
const beforeKT2 = lines.slice(0, kt2StartLine).join('\n');
let afterKT2 = lines.slice(kt3StartLine).join('\n');

// Renumber KT3 IDs in afterKT2:
// lesson_8 -> lesson_11
// lesson_9 -> lesson_12
// lesson_10 -> lesson_13
afterKT2 = afterKT2.replace(/id:\s*['"]lesson_8['"]/g, "id: 'lesson_11'");
afterKT2 = afterKT2.replace(/id:\s*['"]lesson_9['"]/g, "id: 'lesson_12'");
afterKT2 = afterKT2.replace(/id:\s*['"]lesson_10['"]/g, "id: 'lesson_13'");

// Update timeline banner IDs in afterKT2:
afterKT2 = afterKT2.replace(
  /lesson_banner_id:\s*['"]lesson_5['"]/g,
  "lesson_banner_id: 'lesson_7'",
); // Six Day War
afterKT2 = afterKT2.replace(
  /lesson_banner_id:\s*['"]lesson_6['"]/g,
  "lesson_banner_id: 'lesson_10'",
); // Yom Kippur War
afterKT2 = afterKT2.replace(
  /lesson_banner_id:\s*['"]lesson_7['"]/g,
  "lesson_banner_id: 'lesson_11'",
); // Camp David / Negotiations
afterKT2 = afterKT2.replace(
  /lesson_banner_id:\s*['"]lesson_8['"]/g,
  "lesson_banner_id: 'lesson_12'",
); // Palestinian Issue
afterKT2 = afterKT2.replace(
  /lesson_banner_id:\s*['"]lesson_9['"]/g,
  "lesson_banner_id: 'lesson_13'",
); // Oslo

// Assemble the new file content
const newContent = beforeKT2 + '\n    ' + formattedNewLessons + ',\n' + afterKT2;

console.log('Assembled new data.js (length:', newContent.length, 'chars)');

// Validate syntax by saving to a temp file and dynamically importing it
const tempPath = path.resolve(__dirname, '../units/cme_new/data_temp_test.js');
fs.writeFileSync(tempPath, newContent, 'utf8');

(async () => {
  try {
    const { pathToFileURL } = require('url');
    const fileUrl = pathToFileURL(tempPath).href;
    const mod = await import(fileUrl);
    const data = mod.default || mod.unitData;
    console.log('✅ Successfully loaded temporary module!');
    console.log('Total lessons in unitData:', data.lessons.length);
    data.lessons.forEach((l, idx) => {
      console.log(`  [${idx}] ${l.id} | ${l.title}`);
    });

    // Cleanup temp file
    fs.unlinkSync(tempPath);

    // Overwrite units/cme_new/data.js
    fs.writeFileSync(dataJsPath, newContent, 'utf8');
    console.log('🎉 Successfully written to units/cme_new/data.js!');
  } catch (err) {
    console.error('❌ Syntax or import error:', err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    process.exit(1);
  }
})();
