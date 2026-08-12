const fs = require('fs');
const content = fs.readFileSync('public/units/great_war/data.js', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(300, 350).join('\n'));
