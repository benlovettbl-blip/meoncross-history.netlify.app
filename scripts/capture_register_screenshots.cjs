const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1.5 });
  await page.goto(
    'file:///' + path.resolve('public/master_rights_register.html').replace(/\\/g, '/'),
    { waitUntil: 'networkidle0' },
  );
  await page.evaluateHandle('document.fonts.ready');

  const pages = await page.$$('.register-page');
  console.log('Total Register Pages:', pages.length);
  for (let i = 0; i < pages.length; i++) {
    const shotPath = path.resolve('public/screenshots/register_page_' + (i + 1) + '.png');
    await pages[i].screenshot({ path: shotPath });
    console.log('Saved screenshot:', shotPath);
  }
  await browser.close();
}

testScreenshots().catch((err) => {
  console.error(err);
  process.exit(1);
});
