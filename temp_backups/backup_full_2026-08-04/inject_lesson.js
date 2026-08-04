const fs = require('fs');
const newLesson = require('./new_lesson.js');
const file = './great_war/data.js';

let content = fs.readFileSync(file, 'utf8');

// Find the start of the lessons array
const lessonsStart = content.indexOf('"lessons": [') + '"lessons": ['.length;

// Convert the new lesson to a formatted JSON string
const newLessonStr = '\n        ' + JSON.stringify(newLesson, null, 12).replace(/\n/g, '\n        ') + ',';

// Inject the new lesson
content = content.slice(0, lessonsStart) + newLessonStr + content.slice(lessonsStart);

fs.writeFileSync(file, content);
console.log('Injected new lesson into great_war/data.js');
