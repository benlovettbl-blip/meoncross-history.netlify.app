const puppeteer = require('puppeteer');
const path = require('path');

const artDir =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\d74cbf7c-7001-410d-9a25-5fe6e61b949e';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }); // A4 at 96 DPI @ 2x

  const targets = [
    { name: 'kt1_front_cover', url: 'http://localhost:3003/units/cme_new/pupil_workbook_KT1.html' },
    { name: 'kt2_front_cover', url: 'http://localhost:3003/units/cme_new/pupil_workbook_KT2.html' },
    { name: 'kt3_front_cover', url: 'http://localhost:3003/units/cme_new/pupil_workbook_KT3.html' },
  ];

  for (const t of targets) {
    console.log(`Rendering ${t.name}...`);
    await page.goto(t.url, { waitUntil: 'networkidle2' });
    const coverEl = await page.$('.page-container');
    if (coverEl) {
      await coverEl.screenshot({
        path: path.join(artDir, `${t.name}.png`),
      });
      console.log(`Saved ${t.name}.png`);
    } else {
      console.warn(`Could not find .page-container for ${t.name}`);
    }
  }

  await browser.close();
  console.log('Done rendering cover snapshots.');
})();
