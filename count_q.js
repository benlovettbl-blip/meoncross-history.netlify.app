const fs = require('fs');
const data = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
const start = data.indexOf('L2: Prevent and Treat Disease');
const end = data.indexOf('L3: The Black Death');
const l2Text = data.substring(start, end);
console.log('Number of questions in L2:');
const qMatches = l2Text.match(/"question"\s*:\s*"/g);
console.log(qMatches ? qMatches.length : 0);

const qNumMatch = l2Text.match(/"qNum"\s*:\s*\d+/g);
console.log('qNums:', qNumMatch);
