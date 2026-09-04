import { unitData } from './units/edexcel_medicine/data.js';

let medievalLessons = unitData.lessons.filter(
  (l) => l.id.startsWith('lesson_1_') || l.prefix === 'KT1',
);

console.log(`Found ${medievalLessons.length} medieval lessons.`);
let l1 = medievalLessons[0];
console.log('Keys in lesson 1:', Object.keys(l1));
if (l1.sections) {
  l1.sections.forEach((s) => {
    console.log(`Section type: ${s.type}, keys: ${Object.keys(s)}`);
    if (s.questions) console.log('  Questions:', s.questions);
    if (s.exam_practice) console.log('  Exam Practice:', s.exam_practice);
  });
}
