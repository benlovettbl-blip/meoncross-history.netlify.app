const fs = require('fs');

const content = fs.readFileSync('units/usa/data.js', 'utf8');
const targets = [
  'usa_lesson_2_3_e',
  'usa_lesson_3_1_b',
  'usa_lesson_4_1_d',
  'usa_lesson_4_1_c',
  'usa_lesson_4_2_e',
];

targets.forEach((id) => {
  const targetStr = `id: '${id}'`;
  const idx = content.indexOf(targetStr);
  if (idx !== -1) {
    console.log(`\n=================== ${id} ===================`);
    console.log(content.slice(idx - 15, idx + 800));
  } else {
    console.log(`Not found: ${id}`);
  }
});
