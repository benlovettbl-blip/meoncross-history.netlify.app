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
  for (const unit of ks3Units) {
    const file = path.join(__dirname, 'public/units', unit, 'data.js');
    if (!fs.existsSync(file)) continue;
    
    // Dynamic import
    const module = await import('file://' + file);
    const data = module.default || module.unitData;
    
    let modified = false;
    
    // Iterate over lessons
    for (const lesson of data.lessons) {
      // Check if it lacks learning_objectives.scaffolded
      if (!lesson.learning_objectives || !lesson.learning_objectives.scaffolded) {
        
        // Ensure teacher_notes.objectives exist
        if (lesson.teacher_notes && lesson.teacher_notes.objectives && lesson.teacher_notes.objectives.length > 0) {
          const overarching = lesson.learning_objective || lesson.title;
          
          lesson.learning_objectives = {
            overarching: overarching,
            scaffolded: lesson.teacher_notes.objectives.map(o => o.objective)
          };
          
          // Optionally, remove the old string property to avoid redundancy
          // delete lesson.learning_objective;
          
          modified = true;
        }
      }
    }
    
    if (modified) {
      // Write back
      // Check original prefix (export const unitData = or const unit = ...)
      const origText = fs.readFileSync(file, 'utf8');
      let prefix = 'export const unitData = ';
      if (origText.startsWith('const ')) {
        const match = origText.match(/const\s+\w+\s*=\s*/);
        if (match) prefix = match[0];
      } else if (origText.startsWith('export const ')) {
        const match = origText.match(/export const\s+\w+\s*=\s*/);
        if (match) prefix = match[0];
      }
      
      let suffix = ';\n';
      if (origText.includes('export default')) {
        const match = origText.match(/export default\s+\w+;\s*$/);
        if (match) suffix = ';\n\n' + match[0] + '\n';
      }
      
      const newText = prefix + JSON.stringify(data, null, 2) + suffix;
      fs.writeFileSync(file, newText, 'utf8');
      console.log(`Updated ${unit}`);
    } else {
      console.log(`No changes needed for ${unit}`);
    }
  }
}

run().catch(console.error);
