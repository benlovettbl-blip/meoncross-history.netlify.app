const fs = require('fs'); 
const lines = fs.readFileSync('public/units/australia/data.js', 'utf8').split('\n'); 
let start = -1; 
let end = -1; 
for(let i=0; i<lines.length; i++) { 
  if (lines[i].includes('"id": "lesson_5"')) start = i; 
  if (start > -1 && i > start && lines[i].includes('"id": "lesson_6"')) { end = i; break; } 
} 
if (end === -1) end = lines.length; 
for (let i = start; i < end && i < start + 120; i++) console.log(i + ': ' + lines[i]);
