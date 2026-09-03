const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let data;
try {
  data = JSON.parse(jsonStr);
} catch(e) {
  data = eval(`(${jsonStr})`);
}

data.lessons.forEach((lesson, i) => {
  // Update ID to be perfectly sequential
  lesson.id = `lesson_${i + 1}`;
  
  // Clean up title
  if (lesson.title) {
    lesson.title = lesson.title.replace(/^Lesson \d+[ab]?\.\s*/i, '');
    lesson.title = lesson.title.replace(/^Lesson \d+:\s*/i, '');
  }
  
  // Delete enquiry properties so core_app.js relies entirely on the clean title
  delete lesson.enquiry;
  delete lesson.enquiry_question;
  delete lesson.inquiry_question;
});

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully renamed and cleaned lesson titles/IDs.');
