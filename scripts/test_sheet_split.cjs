const fs = require('fs');
const html2 = fs.readFileSync(
  'public/units/ks2_ww2/worksheets/lesson_02_evacuation_worksheet.html',
  'utf8',
);
const parts2 = html2.split('<div class="worksheet-page');
console.log('Lesson 2 sheets count:', parts2.length - 1);
for (let i = 1; i < parts2.length; i++) {
  const p = parts2[i];
  const idM = p.match(/id="([^"]+)"/);
  console.log(
    '  Sheet ' +
      i +
      ' id: ' +
      (idM ? idM[1] : 'none') +
      ', isLandscape: ' +
      p.includes('landscape-page'),
  );
}

const html3 = fs.readFileSync(
  'public/units/ks2_ww2/worksheets/lesson_03_kindertransport_worksheet.html',
  'utf8',
);
const parts3 = html3.split('<div class="worksheet-page');
console.log('Lesson 3 sheets count:', parts3.length - 1);
for (let i = 1; i < parts3.length; i++) {
  const p = parts3[i];
  const idM = p.match(/id="([^"]+)"/);
  console.log(
    '  Sheet ' +
      i +
      ' id: ' +
      (idM ? idM[1] : 'none') +
      ', isLandscape: ' +
      p.includes('landscape-page'),
  );
}
