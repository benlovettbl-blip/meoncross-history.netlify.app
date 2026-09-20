// scripts/apply_medicine_curriculum_update.cjs
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const dataFilePath = path.resolve(__dirname, '../units/edexcel_medicine/data.js');

// 1. Create timestamped backup
if (!fs.existsSync('temp_backups')) fs.mkdirSync('temp_backups');
const backupPath = path.resolve(__dirname, `../temp_backups/data_js_backup_${Date.now()}.js`);
fs.copyFileSync(dataFilePath, backupPath);
console.log(`✅ Backed up data.js to ${backupPath}`);

// 2. Load content and determine boundaries
const content = fs.readFileSync(dataFilePath, 'utf8');
const lines = content.split('\n');

let kt4Start = -1,
  kt4End = -1,
  kt5Start = -1,
  kt5End = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('lesson_4_1') && kt4Start === -1) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        kt4Start = j;
        break;
      }
    }
  }
  if (lines[i].includes('lesson_5_1') && kt5Start === -1) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        kt5Start = j;
        kt4End = j - 1;
        break;
      }
    }
  }
  if (lines[i].includes('specification: [')) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '],') {
        kt5End = j - 1;
        break;
      }
    }
    break;
  }
}

console.log(`KT4 Range: lines ${kt4Start} to ${kt4End}`);
console.log(`KT5 Range: lines ${kt5Start} to ${kt5End}`);

if (kt4Start === -1 || kt4End === -1 || kt5Start === -1 || kt5End === -1) {
  console.error('❌ Could not locate lesson boundaries accurately!');
  process.exit(1);
}

// 3. Load upgraded KT4 and authored KT5 lessons
const kt4Lessons = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'kt4_upgraded.json'), 'utf8'),
);
const { allWesternFrontLessons } = require('./build_western_front_lessons.cjs');

console.log(`Loaded ${kt4Lessons.length} upgraded KT4 lessons.`);
console.log(`Loaded ${allWesternFrontLessons.length} new KT5 Western Front lessons.`);

function formatLesson(l) {
  return (
    '    ' +
    JSON.stringify(l, null, 2)
      .replace(/\n/g, '\n    ')
      .replace(/"([a-zA-Z_$][0-9a-zA-Z_$]*)":/g, '$1:') +
    ','
  );
}

const formattedKT4Str = kt4Lessons.map(formatLesson).join('\n');
const formattedKT5Str = allWesternFrontLessons.map(formatLesson).join('\n');

const beforeKT4 = lines.slice(0, kt4Start).join('\n');
const afterKT5 = lines.slice(kt5End + 1).join('\n');

const newContent = beforeKT4 + '\n' + formattedKT4Str + '\n' + formattedKT5Str + '\n' + afterKT5;

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log('✅ Wrote updated curriculum content to data.js!');

// 4. Validate syntax and integrity
(async () => {
  try {
    const mod = await import(pathToFileURL(dataFilePath).href);
    const unitData = mod.default || mod.unitData;
    console.log(`🎉 Syntax check PASSED! Total lessons now: ${unitData.lessons.length}`);
    if (unitData.lessons.length !== 26) {
      console.warn(`⚠️ Warning: Expected 26 lessons, but got ${unitData.lessons.length}`);
    } else {
      console.log(
        '✅ Exactly 26 lessons verified (5 Medieval + 5 Renaissance + 5 18th/19th + 5 Modern + 6 Western Front).',
      );
    }
  } catch (err) {
    console.error('❌ Syntax validation failed on updated data.js:', err);
    console.log(`Restoring backup from ${backupPath}...`);
    fs.copyFileSync(backupPath, dataFilePath);
    process.exit(1);
  }
})();
