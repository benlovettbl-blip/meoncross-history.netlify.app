const puppeteer = require('puppeteer');
const path = require('path');

const targetPageId = process.argv[2] || '#page-6';
const targetFile = process.argv[3] || 'public/units/cme_new/pupil_workbook_KT1.html';
const outFile = process.argv[4] || 'scratch/preview.png';

const fs = require('fs');

const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : undefined);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(targetFile), { waitUntil: 'networkidle0' });
  const el = await page.$(targetPageId);
  if (!el) {
    console.error(`Element ${targetPageId} not found!`);
    process.exit(1);
  }
  await el.screenshot({ path: path.resolve(outFile) });
  console.log(`Saved screenshot of ${targetPageId} to ${outFile}`);
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
