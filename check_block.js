const fs = require('fs');
const dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
const codeToEval = dataStr.replace('export const unitData =', 'global.unitData =');
eval(codeToEval);

const lesson = global.unitData.lessons[2]; // Lesson 3
const block = lesson.narrative_blocks.find(b => b.title === 'Visual Analysis: The Jamestown Triangular Fort Plan (1607)');
console.log(block);
