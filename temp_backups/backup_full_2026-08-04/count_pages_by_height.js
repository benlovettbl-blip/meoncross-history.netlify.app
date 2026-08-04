const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/great_war/workbook.html', { waitUntil: 'networkidle0' });
  
  // An A4 page at 96 DPI is about 1122 pixels tall
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const estimatedPages = Math.ceil(scrollHeight / 1122);
  
  console.log(`\n=> Total Document Scroll Height: ${scrollHeight}px`);
  console.log(`=> Estimated A4 Pages: ${estimatedPages}\n`);
  
  await browser.close();
})();
