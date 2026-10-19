const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Test Lesson 10
  console.log('Navigating to Lesson 10...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=10', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll to discussion box
  await page.evaluate(() => {
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: 'public/images/debug_think_discuss_closed.png' });
  console.log('Captured debug_think_discuss_closed.png');

  // Click Example Answers button
  console.log('Clicking Example Answers button...');
  await page.evaluate(() => {
    const btn = document.querySelector('.btn-think-discuss-toggle');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: 'public/images/debug_think_discuss_open.png' });
  console.log('Captured debug_think_discuss_open.png');

  // Test Lesson 3
  console.log('Navigating to Lesson 3...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=3', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.evaluate(() => {
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const btn = document.querySelector('.btn-think-discuss-toggle');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'public/images/debug_lesson_3_think_discuss.png' });
  console.log('Captured debug_lesson_3_think_discuss.png');

  await browser.close();
  console.log('All tests finished successfully!');
})();
