const fs = require('fs');
const path = require('path');

const files = [
  path.join(
    __dirname,
    '..',
    'public',
    'units',
    'ks2_ww2',
    'worksheets',
    'lesson_02_evacuation_worksheet.html',
  ),
  path.join(
    __dirname,
    '..',
    'units',
    'ks2_ww2',
    'worksheets',
    'lesson_02_evacuation_worksheet.html',
  ),
  path.join(
    __dirname,
    '..',
    'public',
    'units',
    'ks2_ww2',
    'worksheets',
    'lesson_03_kindertransport_worksheet.html',
  ),
  path.join(
    __dirname,
    '..',
    'units',
    'ks2_ww2',
    'worksheets',
    'lesson_03_kindertransport_worksheet.html',
  ),
];

files.forEach((f) => {
  if (!fs.existsSync(f)) return;
  let html = fs.readFileSync(f, 'utf8');

  // Stray lines in L2
  const strayL2 = `            <div>NAME: _________________</div>
            <div>DESTINATION: DEVON</div>
          </div>`;
  if (html.includes(strayL2)) {
    html = html.replace(strayL2, '');
    console.log('Removed stray L2 lines from:', f);
  }

  // Stray lines in L3
  const strayL3 = `            <div>REFUGEE NO.: 8434 (VERA)</div>
            <div>DESTINATION: LIVERPOOL ST</div>
          </div>`;
  if (html.includes(strayL3)) {
    html = html.replace(strayL3, '');
    console.log('Removed stray L3 lines from:', f);
  }

  fs.writeFileSync(f, html, 'utf8');
});

console.log('Done cleaning stray lines.');
