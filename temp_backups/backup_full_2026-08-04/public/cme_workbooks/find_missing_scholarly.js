import { LESSONS_DATA } from '../src/lessons_data.js';

for (const [subtopicId, subtopic] of Object.entries(LESSONS_DATA)) {
  console.log(`Subtopic: ${subtopicId} (${subtopic.headerTitle.replace(/<[^>]*>/g, '').trim()})`);
  subtopic.steps.forEach((step, idx) => {
    if (!step.scholarlyDepth) {
      console.log(`  - Step ${idx + 1}: ${step.title} [MISSING]`);
    } else {
      console.log(`  - Step ${idx + 1}: ${step.title} [HAS: ${step.scholarlyDepth.title}]`);
    }
  });
}
