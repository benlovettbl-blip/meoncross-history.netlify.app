const fs = require('fs');

const dataFile = 'cme_new/data.js';
const txt = fs.readFileSync(dataFile, 'utf8');

function checkTerm(regex) {
  const hits = [];
  const lines = txt.split('\n');
  lines.forEach(l => {
    if (regex.test(l)) {
      hits.push(l.trim());
    }
  });
  console.log(`\n=== ${regex} === (${hits.length} hits)`);
  hits.forEach(h => console.log('  ' + h.substring(0, 100) + '...'));
}

checkTerm(/US aid/i);
checkTerm(/Gaza.*1955/i);
checkTerm(/oil crisis|embargo|OPEC/i);
checkTerm(/Ismailia|Begin.*Egypt/i);
checkTerm(/renounc.*terrorism/i);
