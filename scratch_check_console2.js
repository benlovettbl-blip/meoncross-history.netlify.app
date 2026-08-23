const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText)
  );
  page.on('request', request => {
    console.log('REQUEST:', request.url());
  });
  page.on('response', async response => {
    if (response.status() === 404) {
      console.log('404 RESPONSE:', response.url());
    }
    if (response.url().includes('.js') && response.headers()['content-type']?.includes('text/html')) {
      console.log('FOUND HTML IN JS RESPONSE:', response.url());
    }
  });

  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:51205/unit?id=trip_ypres&lesson=2&v=fixed3', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    console.log('Waiting 5 seconds for JS execution...');
    await new Promise(r => setTimeout(r, 5000));
    
    await page.screenshot({path: 'puppeteer_screenshot.png'});
    console.log('Screenshot saved to puppeteer_screenshot.png');
    
    const html = await page.content();
    fs.writeFileSync('puppeteer_dom.html', html);
    console.log('DOM saved to puppeteer_dom.html');
  } catch (e) {
    console.error('SCRIPT ERROR:', e);
  } finally {
    await browser.close();
  }
})();
