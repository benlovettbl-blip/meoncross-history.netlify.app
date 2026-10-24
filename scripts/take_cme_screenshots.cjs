const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/cme_new/textbook_UNIFIED.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const outDir = path.join(__dirname, '../public/units/cme_new/previews/unified');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pageIds = [4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 20, 21, 26, 27];

  for (const pNum of pageIds) {
    const selector = `#page-${pNum}`;
    const el = await page.$(selector);
    if (el) {
      const outPath = path.join(outDir, `page_${String(pNum).padStart(2, '0')}.png`);
      await el.screenshot({ path: outPath });
      console.log(`Saved ${selector} -> ${outPath}`);
    }
  }

  await browser.close();
  console.log('Finished taking screenshots!');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
