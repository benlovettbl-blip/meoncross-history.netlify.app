const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

require('./generate_workbooks.js');
require('./generate_textbooks.js');
require('./generate_pupil_workbooks.js');

const publicDir = path.join(__dirname, 'public');
const pdfsDir = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(pdfsDir)){
    fs.mkdirSync(pdfsDir);
}

(async () => {
  console.log('Starting PDF export for early_modern_world...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const unit = process.argv[2] || 'early_modern_world';
  const targetFile = process.argv[3];
  console.log('Starting PDF export for ' + unit + '...');
  const unitDir = path.join(publicDir, 'units', unit);
  if (fs.existsSync(unitDir)) {
    let files = fs.readdirSync(unitDir).filter(f => f.endsWith('.html'));
    if (targetFile) {
      files = files.filter(f => f === targetFile);
    }
    for (const file of files) {
      const htmlPath = path.join(unitDir, file);
      console.log('Generating PDF for ' + unit + '/' + file + '...');
      await page.goto('file://' + htmlPath, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const pdfFileName = unit + '_' + file.replace('.html', '.pdf');
      const pdfPath = path.join(pdfsDir, pdfFileName);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
        margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
      });
      console.log('Saved ' + pdfPath);
    }
  }

  await browser.close();
  console.log('PDF generation for ' + unit + ' complete!');
})();
