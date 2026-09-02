const fs = require('fs');
const path = require('path');

const ks3Units = [
  'water_and_sanitation',
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'australia',
  'great_war',
  'post_war_britain'
];

async function run() {
  let totalLessons = 0;
  let withLearningObjective = 0;
  let withLearningObjectivesScaffolded = 0;
  let withTeacherNotesObjectives = 0;
  
  for (const unit of ks3Units) {
    const file = path.join(__dirname, 'public/units', unit, 'data.js');
    if (!fs.existsSync(file)) continue;
    
    const module = await import('file://' + file);
    const data = module.default || module.unitData;
    
    for (const lesson of data.lessons) {
      totalLessons++;
      if (lesson.learning_objective && typeof lesson.learning_objective === 'string') {
        withLearningObjective++;
      }
      if (lesson.learning_objectives && lesson.learning_objectives.scaffolded) {
        withLearningObjectivesScaffolded++;
      }
      if (lesson.teacher_notes && lesson.teacher_notes.objectives) {
        withTeacherNotesObjectives++;
      }
    }
  }
  
  console.log(`Total KS3 Lessons: ${totalLessons}`);
  console.log(`With string 'learning_objective': ${withLearningObjective}`);
  console.log(`With structured 'learning_objectives.scaffolded': ${withLearningObjectivesScaffolded}`);
  console.log(`With 'teacher_notes.objectives': ${withTeacherNotesObjectives}`);
}

run().catch(console.error);
