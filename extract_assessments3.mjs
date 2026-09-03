import fs from 'fs';
import path from 'path';

const units = [
  'water_and_sanitation',
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'australia',
  'great_war',
  'great_war_part2',
  'post_war_britain'
];

async function run() {
  for (const unit of units) {
    const filePath = path.resolve(`public/units/${unit}/data.js`);
    try {
      const module = await import('file://' + filePath);
      const data = module.default || module.unitData;
      console.log(`\n=== UNIT: ${unit} ===`);
      
      if (data.assessments && data.assessments.length > 0) {
        console.log("Found 'assessments' array:");
        data.assessments.forEach(a => {
           console.log(` - ${a.title} (${a.type}): ${a.description || a.question || ''}`);
        });
      } else if (data.lessons && data.lessons.length > 0) {
        const lastLesson = data.lessons[data.lessons.length - 1];
        console.log(`Last Lesson Title: ${lastLesson.title}`);
        if (lastLesson.extended && lastLesson.extended.question) {
          console.log(`   Extended Question: ${lastLesson.extended.question}`);
        }
        if (lastLesson.narrative_blocks) {
          lastLesson.narrative_blocks.forEach(nb => {
            if (nb.tasks) {
               nb.tasks.forEach(t => {
                  console.log(`   Task (${t.type}): ${t.question || t.text}`);
               });
            }
          });
        }
      }
    } catch (e) {
      console.error(`Error loading ${unit}:`, e.message);
    }
  }
}

run();
