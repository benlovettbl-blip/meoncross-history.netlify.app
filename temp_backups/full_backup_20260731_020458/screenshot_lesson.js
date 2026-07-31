const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle0' });
  
  // Wait for the lesson card
  await page.waitForSelector('.homepage-lesson-card[data-index="0"]', { visible: true, timeout: 5000 });
  await page.click('.homepage-lesson-card[data-index="0"]');
  
  // Wait for lesson to load
  await new Promise(r => setTimeout(r, 1000));
  
  // Take screenshot of the lesson
  await page.screenshot({ path: 'lesson_screenshot.png', fullPage: true });
  
  await browser.close();
})();
