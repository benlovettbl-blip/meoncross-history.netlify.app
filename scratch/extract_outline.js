const data = require('../edexcel_medicine/data.js');

data.lessons.slice(0, 3).forEach((lesson, index) => {
  console.log(`\nLesson ${index + 1}: ${lesson.title}`);
  if (lesson.extended) {
    console.log(`  - Extended Title: ${lesson.extended.title}`);
    console.log(`  - Extended Paragraphs:`);
    lesson.extended.paragraphs.forEach(p => console.log(`      ${p}`));
  }
});
