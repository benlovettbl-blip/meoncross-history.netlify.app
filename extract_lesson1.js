const fs = require('fs');
const content = fs.readFileSync('./public/units/great_war/data.js', 'utf8');
const start = content.indexOf('"id": "lesson_1"');
const end = content.indexOf('"id": "lesson_2"');
console.log(content.substring(start, end));
