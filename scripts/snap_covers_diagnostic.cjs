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

  const baseDir = path.resolve(__dirname, '..', 'public', 'units', 'cme_new');
  const targets = [
    { name: 'cover_diag_kt1', file: path.join(baseDir, 'textbook_KT1_PUBLISHER.html') },
    { name: 'cover_diag_kt2', file: path.join(baseDir, 'textbook_KT2_PUBLISHER.html') },
    { name: 'cover_diag_kt3', file: path.join(baseDir, 'textbook_KT3_PUBLISHER.html') },
  ];

  for (const t of targets) {
    console.log(`Rendering ${t.name}...`);
    await page.goto(`file://${t.file}`, { waitUntil: 'networkidle0' });
    const coverEl = await page.$('.textbook-page');
    if (coverEl) {
      const outPath = path.join(artDir, `${t.name}.png`);
      await coverEl.screenshot({ path: outPath });
      console.log(`Saved ${outPath}`);
    } else {
      console.warn(`Could not find .page-container for ${t.name}`);
    }
  }

  await browser.close();
  console.log('Done rendering cover diagnostics.');
})();
