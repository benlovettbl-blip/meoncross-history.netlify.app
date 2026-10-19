const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.goto(
    'file:///' +
      path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/'),
    { waitUntil: 'networkidle0' },
  );
  const p1 = await page.$('#page-1');
  if (p1)
    await p1.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/e7ef5e95-188d-421a-92d5-7160b553ca08/cover_page_1.png',
    });
  const p12 = await page.$('#page-12');
  if (p12)
    await p12.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/e7ef5e95-188d-421a-92d5-7160b553ca08/cover_page_12.png',
    });
  await browser.close();
  console.log('Cover pages captured.');
})();
