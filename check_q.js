const fs = require('fs');
const data = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
const start = data.indexOf('L1:');
const end = data.indexOf('L3:');
const txt = data.substring(start, end);
const qMatch = txt.match(/"question":\s*"[^"]+marks[^"]+"/g);
console.log(qMatch);
