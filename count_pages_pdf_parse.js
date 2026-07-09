const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/great_war/workbook.html', { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  
  pdfParse(pdfBuffer).then(function(data) {
      console.log(`\n=> Total printed PDF pages: ${data.numpages}\n`);
  });
  
  await browser.close();
})();
