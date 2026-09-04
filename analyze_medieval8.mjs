import { unitData } from './units/edexcel_medicine/data.js';

let medievalLessons = unitData.lessons.filter(
  (l) => l.id.startsWith('lesson_1_') || l.prefix === 'KT1',
);

medievalLessons.forEach((l) => {
  console.log(`Lesson ${l.id} - ${l.title}`);

  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((nb, i) => {
      console.log(`  Block ${i}: ${nb.text.length} chars, ${nb.text.split(' ').length} words`);
    });
  }

  let totalTextLen = JSON.stringify(l).length;
  console.log(`  Total lesson JSON size: ${totalTextLen} chars`);
});
