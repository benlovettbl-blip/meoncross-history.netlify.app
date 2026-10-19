const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const chromePath = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => p && fs.existsSync(p));

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: chromePath || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
    const htmlPath = path.resolve('public/units/ks2_ww2/textbook.html');
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

    for (let i = 1; i <= 24; i++) {
      const el = await page.$('#page-' + i);
      if (el) {
        await el.screenshot({ path: path.resolve('scratch/ks2_ww2_textbook_p' + i + '.png') });
        console.log('Saved p' + i);
      }
    }
    await browser.close();
    console.log('All 24 pages captured!');
  } catch (err) {
    console.error('Error capturing:', err);
  }
})();
