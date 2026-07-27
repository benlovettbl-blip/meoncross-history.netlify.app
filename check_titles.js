const fs = require('fs');
const code = fs.readFileSync('public/units/cme_new/data.js', 'utf8');
const match = code.match(/"title":\s*"KT[^"]+"/g);
console.log(match);
