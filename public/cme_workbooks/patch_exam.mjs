import fs from 'fs';

let exam = fs.readFileSync('src/exam.js', 'utf8');

// 1. Hardcode sort order
exam = exam.replace(/const sortOrder = document\.getElementById\('exam-order-select'\)\.value;/g, "const sortOrder = 'random';");

fs.writeFileSync('src/exam.js', exam);
console.log("exam.js patched.");
