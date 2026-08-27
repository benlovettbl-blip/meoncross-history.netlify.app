const fs = require('fs');
const data = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
const start = data.indexOf('L2: ');
const end = data.indexOf('L3: ');
const txt = data.substring(start, end);
const m = txt.match(/"type"/g) || [];
console.log('Tasks:', m.length);
