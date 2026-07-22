const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR (UNHANDLED EXCEPTION):', err.message);
  });
  
  await page.goto('http://localhost:3003/unit.html?id=edexcel_medicine', { waitUntil: 'domcontentloaded' });
  
  await page.waitForSelector('.lesson-link');
  const links = await page.$$('.lesson-link');
  
  for (let l of links) {
    const text = await page.evaluate(el => el.textContent, l);
    if (text.includes('1.1:')) {
      console.log('Clicking:', text.trim());
      await l.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  await browser.close();
})();
