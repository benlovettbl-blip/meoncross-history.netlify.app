const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const MEDIA_DIR =
  'C:/Users/fives/.gemini/antigravity-ide/brain/d6e7c88e-573e-4fb9-a636-c4124ce3f151/.tempmediaStorage';
if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });

async function captureWorkbook(htmlPath, prefix, maxPages = 16) {
  console.log(`Capturing ${prefix} from ${htmlPath}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle0' });

  const pageElements = await page.$$('.page');
  console.log(`Found ${pageElements.length} pages for ${prefix}`);

  for (let i = 0; i < Math.min(pageElements.length, maxPages); i++) {
    const el = pageElements[i];
    const outName = `${prefix}_page_${i + 1}.png`;
    const outPath = path.join(MEDIA_DIR, outName);
    await el.screenshot({ path: outPath });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
}

async function main() {
  await captureWorkbook('public/units/great_war/pupil_workbook_v2.html', 'gw');
  await captureWorkbook('public/units/water_and_sanitation/pupil_workbook_v2.html', 'ws');
  console.log('All captures complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
