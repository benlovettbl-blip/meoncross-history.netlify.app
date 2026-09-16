const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(
    'public/units/edexcel_medicine/booklets/medicine_mastery_compendium_32page.html',
  );
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const pages = await page.$$('.page');
  console.log('Total pages found in HTML:', pages.length);

  // Capture representative sample of pages: 1, 8, 9, 16, 17, 24, 25, 27, 28, 30, 31, 32 (0-indexed: 0, 7, 8, 15, 16, 23, 24, 26, 27, 29, 30, 31)
  const captureIndices = [0, 7, 8, 15, 16, 23, 24, 26, 27, 29, 30, 31];
  for (let idx of captureIndices) {
    if (pages[idx]) {
      const pageNum = idx + 1;
      const outPath = path.resolve('public/pdfs/edexcel_medicine/preview_page_' + pageNum + '.png');
      await pages[idx].screenshot({ path: outPath });
      console.log('Captured page ' + pageNum + ' to ' + outPath);
    }
  }

  await browser.close();
})();
