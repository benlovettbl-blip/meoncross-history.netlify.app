const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');

// Parse the data
let jsonStr = rawData.replace(/^export default /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Process the lessons
data.lessons.forEach(lesson => {
  if (lesson.teacher_notes && lesson.teacher_notes.objectives) {
    
    // Create an overarching string based on the title
    // E.g., "Lesson 1: Why did medicine stand still..." -> "Why did medicine stand still..."
    let cleanTitle = lesson.title.replace(/^Lesson\s*\d+:\s*/i, '').replace(/KT\d+\.\d+:\s*/i, '').trim();
    let overarching = `To explore: ${cleanTitle.replace(/\?$/, '')}`;
    
    let scaffolded = lesson.teacher_notes.objectives.map(obj => obj.objective);
    
    lesson.learning_objectives = {
      overarching: overarching,
      scaffolded: scaffolded
    };
  }
});

// Save back
const newFileContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newFileContent, 'utf8');
console.log('Successfully injected learning_objectives in data.js');
