const fs = require('fs');
const content = fs.readFileSync('public/units/cme_new/data.js', 'utf8');
const matches = content.match(/title\s*:\s*["'].*?["']/g);
console.log(matches.slice(0, 15));
