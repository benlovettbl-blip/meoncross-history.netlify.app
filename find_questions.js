const fs = require('fs');
const data = fs.readFileSync('great_war/data.js', 'utf8');
const lines = data.split('\n');
lines.forEach((l, i) => {
  if (l.includes('"text":') && (l.includes('Q') || l.includes('Question '))) {
    console.log(i + ': ' + l.trim());
  }
});
