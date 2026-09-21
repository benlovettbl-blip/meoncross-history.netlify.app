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

  const targets = [
    { name: 'spread_kt1_p2', file: 'public/units/cme_new/textbook_KT1_PUBLISHER.html', pageNum: 2 },
    { name: 'spread_kt1_p3', file: 'public/units/cme_new/textbook_KT1_PUBLISHER.html', pageNum: 3 },
    { name: 'spread_kt3_p2', file: 'public/units/cme_new/textbook_KT3_PUBLISHER.html', pageNum: 2 },
    { name: 'spread_kt3_p3', file: 'public/units/cme_new/textbook_KT3_PUBLISHER.html', pageNum: 3 },
  ];

  for (const t of targets) {
    await page.goto('file://' + path.resolve(t.file), { waitUntil: 'networkidle0' });
    const els = await page.$$('.textbook-page');
    if (els[t.pageNum - 1]) {
      const out = path.join(artDir, t.name + '.png');
      await els[t.pageNum - 1].screenshot({ path: out });
      console.log('Saved', out);
    }
  }

  await browser.close();
})();
