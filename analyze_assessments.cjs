const fs = require('fs');
const path = require('path');

const units = [
  'water_and_sanitation',
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'australia',
  'great_war',
  'post_war_britain'
];

async function run() {
  const results = [];
  for (const unit of units) {
    const file = path.join(__dirname, 'public/units', unit, 'data.js');
    if (!fs.existsSync(file)) continue;
    
    // We can just import it
    const module = await import('file://' + file);
    const data = module.default || module.unitData;
    
    const lastLesson = data.lessons[data.lessons.length - 1];
    
    let hasDoNow = lastLesson.do_now ? true : false;
    let doNowType = lastLesson.do_now ? lastLesson.do_now.type : 'N/A';
    
    // Check for extended writing
    let essayTask = 'None';
    if (lastLesson.extended && lastLesson.extended.question) {
        essayTask = `Extended: ${lastLesson.extended.question.substring(0, 40)}...`;
    }
    
    let blocksCount = lastLesson.narrative_blocks ? lastLesson.narrative_blocks.length : 0;
    
    let hasAssessmentsArray = data.assessments ? true : false;
    
    results.push({
      unit,
      title: lastLesson.title,
      hasDoNow: hasDoNow ? doNowType : 'No',
      essayTask,
      blocksCount,
      hasAssessmentsArray
    });
  }
  
  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
