const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '..', 'public', 'master_rights_register.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1000));

  const page1 = await page.$('#page-executive-cover');
  if (page1)
    await page1.screenshot({ path: path.resolve(__dirname, '..', 'public', 'preview_page1.png') });

  const page2 = await page.$('#page-curriculum-directory');
  if (page2)
    await page2.screenshot({ path: path.resolve(__dirname, '..', 'public', 'preview_page2.png') });

  const page3 = await page.$('#page-ks2_ww2-1');
  if (page3)
    await page3.screenshot({ path: path.resolve(__dirname, '..', 'public', 'preview_page3.png') });

  console.log('✅ Preview screenshots captured!');
  await browser.close();
})();
