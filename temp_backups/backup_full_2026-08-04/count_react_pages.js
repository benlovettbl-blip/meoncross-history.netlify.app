const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1600, height: 1200 });
  
  console.log('Navigating to http://localhost:3001/unit.html?id=great_war...');
  await page.goto('http://localhost:3001/unit.html?id=great_war', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const pageCount = await page.evaluate(() => {
    return document.querySelectorAll('.page, .page-landscape').length;
  });
  console.log(`\n=> Total Pages Detected in unit.html: ${pageCount}\n`);
  
  await browser.close();
})();
