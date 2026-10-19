const fs = require('fs');
const html = fs.readFileSync('units/ks2_ww2/pupil_workbook.html', 'utf8');
const p6Idx = html.indexOf('id="page-6"');
console.log('p6Idx:', p6Idx);
if (p6Idx !== -1) {
  console.log(html.substring(p6Idx, p6Idx + 800));
}
