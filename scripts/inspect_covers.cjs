const fs = require('fs');

const html = fs.readFileSync('public/units/cme_new/textbook_UNIFIED.html', 'utf8');
const idx = html.indexOf('<div class="cover-spec-box"');
console.log(html.slice(idx, idx + 2500));
