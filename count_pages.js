const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/great_war/workbook.html', { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  
  // A hack to count pages in a PDF: count occurrences of "/Type /Page"
  const pages = (pdfBuffer.toString('binary').match(/\/Type\s*\/Page\b/g) || []).length;
  console.log(`Total printed pages: ${pages}`);
  
  await browser.close();
})();
