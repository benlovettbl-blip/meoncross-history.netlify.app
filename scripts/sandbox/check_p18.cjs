const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  await page.goto('file://' + path.resolve('public/units/early_modern_world/pupil_workbook.html'), {
    waitUntil: 'networkidle0',
  });
  for (const num of [1, 2, 3, 4, 6, 8, 18]) {
    const el = await page.$('#page-' + num);
    if (el) {
      await el.screenshot({
        path: path.resolve('public/units/early_modern_world/test_p' + num + '.png'),
      });
      console.log('Saved test_p' + num + '.png');
    }
  }
  await browser.close();
})();
