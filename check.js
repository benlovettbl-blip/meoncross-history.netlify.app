const fs = require('fs');
const files = ['cme_new/data.js', 'cme_new/timeline_data.js', 'cme_new/src/key_individuals.js', 'cme_new/app.js'];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('\\"')) {
    console.log(`${f} contains bad quotes`);
  }
});
