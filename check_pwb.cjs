const fs = require('fs');
const file = 'public/units/post_war_britain/data.js';
async function run() {
  const module = await import('file://' + require('path').resolve(file));
  const data = module.default || module.unitData;
  console.log(`Total lessons: ${data.lessons.length}`);
  const lastLesson = data.lessons[data.lessons.length - 1];
  console.log('Last lesson title:', lastLesson.title);
  
  if (data.assessments) {
      console.log('Has assessments array:', data.assessments.length);
      console.log(JSON.stringify(data.assessments, null, 2));
  } else {
      console.log('No assessments array');
  }
}
run();
