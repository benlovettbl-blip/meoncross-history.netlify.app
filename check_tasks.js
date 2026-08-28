const fs = require('fs');
let data = fs.readFileSync('australia/data.js', 'utf8');
data = data.replace(/^[^{]*\{/, '{'); // strip module.exports
if (data.endsWith(';')) data = data.substring(0, data.length - 1);
const j = JSON.parse(data);
const l5 = j.lessons[j.lessons.length - 1]; // or the assessment one
console.log('Lesson Title:', l5.title);
console.log('Tasks:', JSON.stringify(l5.tasks, null, 2));
