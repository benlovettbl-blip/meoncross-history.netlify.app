const fs = require('fs');
const dirs = ['water_and_sanitation', 'great_war', 'cme_new'];
dirs.forEach(dir => {
  ['generate_worksheets.js', 'generate_answer_key.js'].forEach(file => {
    const p = dir + '/' + file;
    if (!fs.existsSync(p)) return;
    let code = fs.readFileSync(p, 'utf8');

    code = code.replace(/<div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">/g, '<div style="column-count: 2; column-gap: 40px;">');

    fs.writeFileSync(p, code);
  });
});
console.log('Fixed CSS Grid page break issue!');
