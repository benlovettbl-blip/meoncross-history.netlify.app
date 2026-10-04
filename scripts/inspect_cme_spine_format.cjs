const fs = require('fs');
const content = fs.readFileSync('units/cme_new/data.js', 'utf8');

const target = 'id: "lesson_8"';
const target2 = "id: 'lesson_8'";
const target3 = '"id": "lesson_8"';

let idx = content.indexOf(target);
if (idx === -1) idx = content.indexOf(target2);
if (idx === -1) idx = content.indexOf(target3);

console.log('Index of lesson_8:', idx);
if (idx !== -1) {
  const spineIdx = content.indexOf('causal_domino_spine', idx);
  console.log('Index of spine:', spineIdx);
  if (spineIdx !== -1) {
    console.log(content.slice(spineIdx, spineIdx + 1500));
  }
}
