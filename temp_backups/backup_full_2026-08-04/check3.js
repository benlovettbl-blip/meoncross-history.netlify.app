const fs = require('fs');
const lines = fs.readFileSync('cme_new/timeline_data.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('\\"')) {
    console.log(i + 1, l);
  }
});
