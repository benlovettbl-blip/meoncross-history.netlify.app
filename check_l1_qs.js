const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');
let l1 = c.substring(c.indexOf('lesson_1'), c.indexOf('lesson_2'));
let match;
let regex = /"question"\s*:\s*"([^"]+)"/g;
while ((match = regex.exec(l1)) !== null) {
    console.log(match[1]);
}
