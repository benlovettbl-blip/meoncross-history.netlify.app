const fs = require('fs');
const path = require('path');

// 1. Fix in scripts/build_western_front_lessons.cjs, lessons_5_3_and_5_4.cjs, lessons_5_5_and_5_6.cjs
const filesToClean = [
  'scripts/build_western_front_lessons.cjs',
  'scripts/lessons_5_3_and_5_4.cjs',
  'scripts/lessons_5_5_and_5_6.cjs',
  'scripts/kt4_upgraded.json',
];

filesToClean.forEach((relPath) => {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Remove lines like: question: '...',
    content = content.replace(/^\s*question:\s*['"`].*?['"`],?\r?\n/gm, '');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned rogue questions from ${relPath}`);
  }
});

// 2. Re-run apply_medicine_curriculum_update.cjs
require('./apply_medicine_curriculum_update.cjs');
