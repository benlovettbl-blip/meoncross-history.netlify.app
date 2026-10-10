const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const MEDIA_DIR = 'C:/Users/fives/.gemini/antigravity-ide/brain/4f39cb5d-5256-4d03-82be-00238d593a52/.tempmediaStorage';
if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });

async function snapPages() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  const htmlPath = path.resolve('public/units/monarchy_religion_power/pupil_workbook.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  const pageElements = await page.$$('.page');
  console.log(`Found ${pageElements.length} pages`);

  const pagesToSnap = [1, 2, 3, 6, 7, 12, 13];
  for (const pNum of pagesToSnap) {
    if (pNum <= pageElements.length) {
      const el = pageElements[pNum - 1];
      const outPath = path.join(MEDIA_DIR, `monarchy_page_${pNum}.png`);
      await el.screenshot({ path: outPath });
      console.log(`Snapped page ${pNum} -> ${outPath}`);
    }
  }

  await browser.close();
}

snapPages().catch(err => {
  console.error(err);
  process.exit(1);
});
