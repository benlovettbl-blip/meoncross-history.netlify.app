const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) console.log('HTTP ERROR:', response.status(), response.url());
  });

  await page.goto('http://localhost:3001/unit.html?id=edexcel_medicine');
  
  // Wait for sidebar links to render
  await page.waitForSelector('.lesson-link');
  
  // Find the first actual lesson link (not Unit Homepage)
  const links = await page.$$('.lesson-link');
  if (links.length > 1) {
    console.log('Clicking lesson link...');
    await links[1].click();
    await new Promise(r => setTimeout(r, 2000));
  } else {
    console.log('No lesson links found.');
  }

  await browser.close();
})();
