const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  await page.goto(
    'file://' + path.resolve('public/units/sandbox_pilot/pupil_workbook_pilot.html'),
    { waitUntil: 'networkidle0' },
  );
  for (let i = 1; i <= 20; i++) {
    const el = await page.$('#page-' + i);
    if (el) {
      await el.screenshot({
        path: path.resolve('public/units/sandbox_pilot/pilot_page' + i + '.png'),
      });
    }
  }
  await browser.close();
  console.log('✅ Captured all 20 pages');
})();
