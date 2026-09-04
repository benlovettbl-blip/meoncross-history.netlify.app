import { unitData } from './units/edexcel_medicine/data.js';
let l1 = unitData.lessons.find((l) => l.id === 'lesson_1_1');
console.log('Guided reading:', JSON.stringify(l1.guided_reading, null, 2).substring(0, 500));
console.log(
  'Narrative block 0:',
  JSON.stringify(l1.narrative_blocks[0], null, 2).substring(0, 500),
);
console.log('Extended:', JSON.stringify(l1.extended, null, 2));
