const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');
let match;
let regex = /"gcse_task":\s*\{[\s\S]*?"sources":\s*\[([\s\S]*?)\]/g;
while ((match = regex.exec(c)) !== null) {
    console.log('--- MATCH ---');
    console.log(match[1]);
}
