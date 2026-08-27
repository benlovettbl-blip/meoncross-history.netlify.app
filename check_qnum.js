const fs = require('fs');
const data = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
const lines = data.split('\n');
let qNum = 1;
lines.forEach((l, i) => {
    if(l.includes('question') && (l.includes('marks)') || l.includes('SPaG'))) {
        console.log(`Line ${i}: Q${qNum} -> ${l.trim().substring(0, 80)}`);
        qNum++;
    }
});
