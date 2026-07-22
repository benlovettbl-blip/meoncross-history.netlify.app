const fs = require('fs');

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// 1. Fix task.question -> task.text
let fixedCount = 0;
data.lessons.forEach(lesson => {
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        block.tasks.forEach(task => {
          if (task.question) {
            task.text = task.question;
            delete task.question;
            fixedCount++;
          }
        });
      }
    });
  }
});
console.log(`Fixed ${fixedCount} tasks from 'question' to 'text'.`);

// 2. Chunky paragraph for Historian's Corner
if (data.lessons[0].historians_corner) {
  data.lessons[0].historians_corner.text = `**Simon Schama** argues:

"The Romans were the first to provide their citizens with the basic requirements of public health. Rather than just building spectacular temples, they poured staggering amounts of money, engineering brilliance, and state resources into aqueducts, public bathhouses, and flushing latrines. It was not merely about hygiene, but about Roman identity; to be 'Roman' meant participating in the civilized, communal bathing culture that separated them from the so-called 'barbarians'. However, we must be careful not to overstate this progress: while the wealthy enjoyed luxurious private hypocausts, the vast majority of ordinary citizens still lived in crowded, smoke-filled insulae, sharing public latrines that were breeding grounds for intestinal parasites."`;
  
  data.lessons[0].historians_corner.stretch_question = "According to Schama, was Roman public health purely about stopping disease, or was there another motivation?";
  data.lessons[0].historians_corner.stretch_model = "According to Schama, Roman public health was not just about stopping disease, but also about 'Roman identity'. Participating in communal bathing culture was a way for Romans to feel 'civilized' and distinguish themselves from the 'barbarians'. However, he also points out that the reality was uneven, as the poor still suffered from parasites in communal latrines.";
  console.log("Updated Historian's Corner for Lesson 1.");
}

fs.writeFileSync('water_and_sanitation/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';');
console.log('Saved data.js');
