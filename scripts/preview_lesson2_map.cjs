const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });

  // Navigate to Lesson 2 directly
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2', {
    waitUntil: 'networkidle0',
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Click on Lesson 2 in the curriculum / lessons list if needed, or trigger renderLessonByIndex(1)
  await page.evaluate(() => {
    if (typeof window.renderLessonByIndex === 'function') {
      window.renderLessonByIndex(1); // Lesson 2 is index 1
    }
  });

  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/lesson2_new_map_preview.png' });
  console.log('✅ Captured public/lesson2_new_map_preview.png');

  await browser.close();
})();
