const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Navigate to Lesson 9
  console.log('Navigating to Lesson 9...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=9', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.evaluate(() => {
    const details = document.querySelector('details');
    if (details) {
      details.open = true;
      const revealBtn = details.querySelector('[data-action="toggle-all-answers"]');
      if (revealBtn && window.toggleAllAnswers) {
        window.toggleAllAnswers(revealBtn);
      }
    }
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'public/images/debug_lesson_9_donow.png' });
  console.log('Captured debug_lesson_9_donow.png');

  // Navigate to Lesson 10
  console.log('Navigating to Lesson 10...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=10', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.evaluate(() => {
    const details = document.querySelector('details');
    if (details) {
      details.open = true;
      const revealBtn = details.querySelector('[data-action="toggle-all-answers"]');
      if (revealBtn && window.toggleAllAnswers) {
        window.toggleAllAnswers(revealBtn);
      }
    }
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'public/images/debug_lesson_10_donow.png' });
  console.log('Captured debug_lesson_10_donow.png');

  await browser.close();
  console.log('Done!');
})();
