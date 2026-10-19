const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2000 });
  await page.goto('http://localhost:3004/units/medieval_england/textbook.html', {
    waitUntil: 'networkidle0',
  });

  const p16 = await page.$('#page-16');
  if (p16) {
    await p16.screenshot({ path: path.join(__dirname, '../scratch/page16_screenshot.png') });
  }
  const p17 = await page.$('#page-17');
  if (p17) {
    await p17.screenshot({ path: path.join(__dirname, '../scratch/page17_screenshot.png') });
  }
  await browser.close();
  console.log('Done capturing screenshots');
})();
