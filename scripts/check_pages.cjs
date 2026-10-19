const fs = require('fs');
const html = fs.readFileSync('units/ks2_ww2/pupil_workbook.html', 'utf8');
const pages = html.match(/id="page-[0-9]+"/g);
console.log('Total workbook pages:', pages ? pages.length : 0);
if (pages) {
  console.log('First 5:', pages.slice(0, 5));
  console.log('Last 5:', pages.slice(-5));
}
