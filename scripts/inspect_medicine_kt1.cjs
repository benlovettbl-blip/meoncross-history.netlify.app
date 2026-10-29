const fs = require('fs');

const content = fs.readFileSync('units/edexcel_medicine/data.js', 'utf8');

const lessons = ['lesson_1_1', 'lesson_1_2', 'lesson_1_3', 'lesson_1_4', 'lesson_1_5'];

lessons.forEach((lId, idx) => {
  const startIdx = content.indexOf(`id: '${lId}'`);
  const nextId = lessons[idx + 1] || 'lesson_2_1';
  const endIdx = content.indexOf(`id: '${nextId}'`);
  const sub = content.slice(startIdx, endIdx);

  const blockMatches = [...sub.matchAll(/theme:\s*['"]([^'"]+)['"]/g)];
  console.log(`=== ${lId} ===`);
  console.log(
    'Themes:',
    blockMatches.map((m) => m[1]),
  );
});
