import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  
  console.log("Navigating to http://localhost:3003/unit.html?id=eee");
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();
