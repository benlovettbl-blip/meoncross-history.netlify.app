const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', request => {
    console.log(`REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText || request.response()?.status()}`);
  });
  
  await page.goto('http://localhost:3003/unit.html?id=early_modern_world&lesson=0', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  if (content.includes('Unit Not Found')) {
      console.log("UNIT NOT FOUND detected in early_modern_world lesson 0");
  } else {
      console.log("early_modern_world lesson 0 loaded successfully");
  }
  
  await browser.close();
})();
