import { unitData } from '../early_modern_world/data.js';
const l1 = unitData.lessons[0];
l1.narrative_blocks.forEach((b, i) => {
  console.log(`\nBlock ${i}: ${b.title || 'No Title'}`);
  console.log('Source Letter:', b.source_letter || 'None');
  if (b.tasks) {
    b.tasks.forEach((t, tIdx) => console.log(`  Task ${tIdx}: ${t.text || t.question}`));
  }
});
