const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath = path.resolve('public/units/cme_new/textbook_KT1_PUBLISHER.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const pages = await page.$$('.textbook-page');
  if (pages[3]) {
    await pages[3].screenshot({ path: path.join(__dirname, '../kt1_p4.png') });
    console.log('Successfully saved kt1_p4.png');
  }
  await browser.close();
})();
