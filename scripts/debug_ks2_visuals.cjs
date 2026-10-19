const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Check Homepage Hero
  await page.goto('http://localhost:3003/?unit=ks2_ww2', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/images/debug_home_full.png' });

  // Check Lesson 1
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=1', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/images/debug_lesson_1_full.png' });

  // Check Lesson 5
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=5', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/images/debug_lesson_5_full.png' });

  // Check Lesson 9
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=9', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/images/debug_lesson_9_full.png' });

  // Check Lesson 10
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=10', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/images/debug_lesson_10_full.png' });

  await browser.close();
  console.log('Screenshots captured!');
})();
