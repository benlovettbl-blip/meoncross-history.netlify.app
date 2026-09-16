const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve('public/units/edexcel_medicine/booklets/med_mastery_FULL.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const pages = await page.$$('.page');
  console.log('Total pages found in HTML:', pages.length);

  const captureIndices = [1, 2, 3, 4, 11, 12, 14, 15];
  for (let idx of captureIndices) {
    if (pages[idx]) {
      const outPath = path.resolve(
        'public/pdfs/edexcel_medicine/preview_page_' + (idx + 1) + '.png',
      );
      await pages[idx].screenshot({ path: outPath });
      console.log('Captured page ' + (idx + 1) + ' to ' + outPath);
    }
  }

  await browser.close();
})();
