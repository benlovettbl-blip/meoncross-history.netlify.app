const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

require('./generate_textbooks.js');
require('./generate_pupil_workbooks.js');
require('./generate_timelines.js');

const publicDir = path.join(__dirname, 'public');
const pdfsDir = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(pdfsDir)){
    fs.mkdirSync(pdfsDir);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', protocolTimeout: 600000, timeout: 300000 });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(300000);
  
  const unitArg = process.argv[2] || 'early_modern_world';
  const targetFile = process.argv[3];
  
  const units = unitArg === 'all' 
    ? fs.readdirSync(path.join(publicDir, 'units')).filter(f => fs.statSync(path.join(publicDir, 'units', f)).isDirectory()) 
    : [unitArg];

  for (const unit of units) {
    console.log('Starting PDF export for ' + unit + '...');
  const unitDir = path.join(publicDir, 'units', unit);
  if (fs.existsSync(unitDir)) {
    let files = fs.readdirSync(unitDir).filter(f => f.endsWith('.html'));
    
    // Only generate PDFs for core required documents
    const allowedPrefixes = ['textbook', 'pupil_workbook', 'mastery_pack_full', 'mastery_pack_KT'];
    files = files.filter(f => allowedPrefixes.some(prefix => f.startsWith(prefix) && f.endsWith('.html')));
    
    if (targetFile) {
      files = files.filter(f => f === targetFile);
    }
    for (const file of files) {
      const htmlPath = path.join(unitDir, file);
      console.log('Generating PDF for ' + unit + '/' + file + '...');
      await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2', timeout: 300000 });
      const pdfFileName = unit + '_' + file.replace('.html', '_FINAL_V17.pdf');
      const pdfPath = path.join(pdfsDir, pdfFileName);
      let success = false;
      let retries = 3;
      while (!success && retries > 0) {
        try {
          await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div></div>',
            footerTemplate: '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
          });
          success = true;
          console.log('Saved ' + pdfPath);
        } catch (err) {
          if (err.code === 'EBUSY' || err.code === 'EPERM') {
            console.warn(`File locked (${pdfFileName}). Retrying in 2 seconds... (${retries - 1} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            retries--;
          } else {
            throw err;
          }
        }
      }
      if (!success) {
        console.error(`Failed to export ${pdfFileName} after multiple retries due to file locking.`);
      }
    }
  }

  }
  
  await browser.close();
  console.log('PDF generation complete!');
})();
