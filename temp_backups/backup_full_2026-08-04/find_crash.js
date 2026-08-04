const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  
  await page.goto('http://localhost:3003/unit.html?id=edexcel_medicine', { waitUntil: 'networkidle0' });
  
  // Wait for the lesson links to appear
  await page.waitForSelector('.lesson-link');
  
  const links = await page.$$('.lesson-link');
  console.log(`Found ${links.length} lesson links.`);
  
  // Click on the first one (L1: KT1.1)
  console.log('Clicking the first lesson...');
  await links[0].click();
  
  // Wait a bit to see if errors are thrown
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
