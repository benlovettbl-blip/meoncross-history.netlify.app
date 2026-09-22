const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  await page.goto(
    'file://' + path.resolve('public/units/water_and_sanitation/pupil_workbook_v2.html'),
    { waitUntil: 'networkidle0' },
  );
  const els = await page.$$('.page');
  const checkPages = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16];
  for (const p of checkPages) {
    const el = els[p - 1];
    if (el) {
      await el.screenshot({
        path:
          'C:/Users/fives/.gemini/antigravity-ide/brain/d6e7c88e-573e-4fb9-a636-c4124ce3f151/.tempmediaStorage/ws_fixed_page_' +
          p +
          '.png',
      });
      console.log('Saved ws_fixed_page_' + p);
    }
  }
  await browser.close();
  console.log('Done capturing ws pages!');
})();
