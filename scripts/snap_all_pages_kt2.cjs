const puppeteer = require('puppeteer');
const path = require('path');

const artDir =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\12de0527-a7b2-4ab8-b8ae-673122685716';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  await page.goto('file://' + path.resolve('public/units/cme_new/textbook_KT2_PUBLISHER.html'), {
    waitUntil: 'networkidle0',
  });
  const pages = await page.$$('.textbook-page');

  for (let i = 1; i <= 10; i++) {
    const pNum = i + 1;
    if (pages[i]) {
      const out = path.join(artDir, 'spread_kt2_p' + pNum + '.png');
      await pages[i].screenshot({ path: out });
      console.log('Saved', out);
    }
  }
  await browser.close();
})();
