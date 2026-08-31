import fs from 'fs';

const data = fs.readFileSync('cme_new/data.js', 'utf8');
const jsonStr = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
const unit = JSON.parse(jsonStr);

let issues = [];

unit.lessons.forEach((lesson, index) => {
  if (lesson.tasks && lesson.tasks.length > 0) {
    issues.push(`Lesson ${index+1} has ${lesson.tasks.length} tasks in lesson.tasks.`);
    lesson.tasks.forEach(t => {
      issues.push(` - Task type: ${t.type}, text: ${t.text?.substring(0, 30)}`);
    });
  } else if (lesson.tasks && lesson.tasks.length === 0) {
    issues.push(`Lesson ${index+1} has an empty lesson.tasks array.`);
  }
  
  if (lesson.primary_source && lesson.primary_source.tasks) {
     lesson.primary_source.tasks.forEach(t => {
        if (t.type === 'draw') {
           issues.push(`Lesson ${index+1} primary_source has drawing task: ${t.text?.substring(0, 30)}`);
        }
     });
  }

  if (lesson.visual_sources) {
    issues.push(`Lesson ${index+1} has visual_sources.`);
  }
});

console.log(issues.join('\n'));
