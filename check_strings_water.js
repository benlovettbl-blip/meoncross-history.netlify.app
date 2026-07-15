const ws = require('./public/data/water_and_sanitation.json');
const fs = require('fs');
const wb = fs.readFileSync('./water_and_sanitation/workbook.html', 'utf8');

function findStrings(obj) {
  let strings = [];
  for (let key in obj) {
    if (typeof obj[key] === 'string' && obj[key].length > 100) {
      strings.push({key, text: obj[key]});
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      strings = strings.concat(findStrings(obj[key]));
    }
  }
  return strings;
}

const allStrings = findStrings(ws.data);
allStrings.forEach(s => {
  let snippet = s.text.substring(0, 50).trim();
  // Escape regex chars for simple includes check
  if (!wb.includes(snippet.replace(/"/g, '').replace(/'/g, ''))) {
    // try removing HTML tags just in case
    if (!wb.includes(snippet.substring(0, 15))) {
      console.log('Missing in workbook:', s.key, '->', snippet);
    }
  }
});
