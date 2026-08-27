const fs = require('fs');
const data = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
const start = data.indexOf('L2: ');
const end = data.indexOf('L3: ');
const txt = data.substring(start, end);

let globalQNum = 1;
// Count occurrences of things that generate qNum++ in generate_pupil_workbooks.js
const qNumGenerators = txt.match(/("instruction"|"question"|"title")\s*:/g) || [];
console.log('qNumGenerators:', qNumGenerators.length);

const quizTasks = txt.match(/"options"/g) || [];
console.log('Quiz Questions:', quizTasks.length);
