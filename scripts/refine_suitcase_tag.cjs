const fs = require('fs');
const path = require('path');

function refineSuitcasePage(filePath, isL3) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Adjust margin-top on .giant-suitcase-frame
  content = content.replace(
    /\.giant-suitcase-frame\s*\{[\s\S]*?margin-top:\s*[\d\.]+mm;/,
    `.giant-suitcase-frame {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      margin-top: 4.5mm;`,
  );

  // Adjust tag top position from -9.5mm to -4.5mm
  content = content.replace(/top:\s*-9\.5mm;/g, 'top: -4.5mm;');

  fs.writeFileSync(filePath, content, 'utf8');
}

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

files.forEach((f, idx) => refineSuitcasePage(f, idx >= 2));
console.log('✅ Refined tag and margin-top on suitcase sheets.');
