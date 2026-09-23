const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  const htmlUrl =
    'file:///' +
    path.resolve('public/units/early_modern_world/pupil_workbook.html').replace(/\\/g, '/');

  // NOTE: do NOT call any evaluate or autoFillWritingLines. Just open the raw HTML as a user would in Chrome/Edge!
  await page.goto(htmlUrl, { waitUntil: 'load' });

  const p6 = await page.$('#page-6');
  if (p6) {
    await p6.screenshot({ path: 'public/units/sandbox_pilot/raw_html_page6.png' });
    console.log('Saved raw_html_page6.png');
  } else {
    console.log('Page 6 not found in raw HTML!');
  }

  await browser.close();
})();
