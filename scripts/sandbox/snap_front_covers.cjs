const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  for (const kt of ['KT1', 'KT2', 'KT3']) {
    const htmlPath = path.resolve(
      __dirname,
      '../../public/units/cme_new/pupil_workbook_' + kt + '.html',
    );
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    const p1 = await page.$('#page-1');
    if (p1) {
      const outPath = path.resolve(__dirname, '../../public/pdfs/cme_' + kt + '_p1_preview.png');
      await p1.screenshot({ path: outPath });
      console.log(`Saved: ${outPath}`);
    }
  }

  await browser.close();
  console.log('✅ All 3 front cover screenshots captured');
})();
