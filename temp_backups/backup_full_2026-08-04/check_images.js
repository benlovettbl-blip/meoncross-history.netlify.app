const fs = require('fs');
const content = fs.readFileSync('public/units/cme_new/workbook_KT1.html', 'utf8');
const regex = /<img[^>]+src="([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1]);
}
