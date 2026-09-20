const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

(async () => {
  const mod = await import(pathToFileURL(path.resolve('units/edexcel_medicine/data.js')).href);
  const {
    buildWesternFrontTwoPageWorkbook,
  } = require('./render_medicine_western_front_twopage_workbook.cjs');
  const html = buildWesternFrontTwoPageWorkbook(mod.unitData, { name: 'western_front' });
  const pageMatches = html.match(/class="page"/g);
  console.log('Total pages in generated HTML:', pageMatches ? pageMatches.length : 0);
  console.log(
    'Contains Page 4 locked quip:',
    html.includes('500 square miles of fermented pig manure'),
  );
  console.log(
    'Contains Page 16 mock exam:',
    html.includes('Western Front 16-Mark Mock Exam Paper'),
  );

  if (!fs.existsSync('public/units/edexcel_medicine')) {
    fs.mkdirSync('public/units/edexcel_medicine', { recursive: true });
  }
  fs.writeFileSync('public/units/edexcel_medicine/pupil_workbook_western_front.html', html);
  fs.writeFileSync('units/edexcel_medicine/pupil_workbook_western_front.html', html);
  console.log('Successfully wrote pupil_workbook_western_front.html to public and units dirs.');
})();
