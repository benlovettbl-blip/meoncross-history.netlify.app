const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  const htmlPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'usa',
    'usa_master_retrieval_companion.html',
  );
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  const pageIds = ['page-1', 'page-4', 'page-22', 'page-23', 'page-24'];
  for (const id of pageIds) {
    const el = await page.$('#' + id);
    if (el) {
      const outPath = path.join(__dirname, '..', 'public', 'images', 'inspect_' + id + '.png');
      await el.screenshot({ path: outPath });
      console.log('Saved: ' + outPath);
    }
  }
  await browser.close();
  console.log('Done capturing inspection screenshots.');
})();
