import fs from 'fs';
import path from 'path';
import util from 'util';

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
      const data = module.unitData;
      console.log(`\n=== UNIT: ${unit} ===`);
      
      let foundAssessment = false;
      if (data.assessments && data.assessments.length > 0) {
        console.log("Found 'assessments' array:");
        console.log(util.inspect(data.assessments, {depth: null, colors: false}));
        foundAssessment = true;
      }
      
      if (data.lessons && data.lessons.length > 0) {
        const lastLesson = data.lessons[data.lessons.length - 1];
        if (lastLesson.title.toLowerCase().includes('assessment') || !foundAssessment) {
           console.log("Last Lesson:");
           console.log(util.inspect(lastLesson, {depth: null, colors: false}));
        }
      } else {
        if (!foundAssessment) console.log("No lessons and no assessments found.");
      }
    } catch (e) {
      console.error(`Error loading ${unit}:`, e.message);
    }
  }
}

run();
