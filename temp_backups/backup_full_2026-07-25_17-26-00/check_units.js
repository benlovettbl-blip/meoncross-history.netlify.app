const fs = require('fs');
const dirs = ['great_war', 'great_war_part2', 'norman_conquest', 'usa', 'cme', 'cme_new', 'cme_structured', 'eee', 'change_1450_1750'];
dirs.forEach(d => {
  const p = d + '/data.js';
  if(fs.existsSync(p)) {
    const code = fs.readFileSync(p, 'utf8');
    const m = code.match(/"text":\s*"[^"]+"/g);
    if(m) {
      console.log('--- ' + d + ' ---');
      m.slice(0, 5).forEach(x => console.log(x));
    }
  }
});
