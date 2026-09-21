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
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });

  await page.goto('file://' + path.resolve('public/units/cme_new/textbook_KT1_PUBLISHER.html'), {
    waitUntil: 'networkidle0',
  });
  const els = await page.$$('.textbook-page');
  console.log(`Found ${els.length} pages in KT1`);

  for (let i = 0; i < els.length; i++) {
    const out = path.join(artDir, `kt1_p${i + 1}.png`);
    await els[i].screenshot({ path: out });
    console.log(`Saved page ${i + 1} to ${out}`);
  }

  await browser.close();
  console.log('All KT1 pages saved.');
})();
