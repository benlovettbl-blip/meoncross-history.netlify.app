import { LESSONS_DATA } from '../src/lessons_data.js';

for (const [subId, subData] of Object.entries(LESSONS_DATA)) {
  console.log(`=== ${subId} ===`);
  console.log('Specification Checklist:');
  subData.specChecklist.forEach(item => console.log(`  - ${item}`));
  if (subData.scaffoldedPractice) {
    console.log(`Current Question (${subData.scaffoldedPractice.questionType}):`);
    console.log(`  "${subData.scaffoldedPractice.questionText}"`);
  } else {
    console.log('No scaffolded practice defined.');
  }
  console.log();
}
