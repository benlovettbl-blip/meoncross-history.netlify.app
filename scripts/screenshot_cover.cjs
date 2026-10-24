const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureCover(unit) {
  const htmlPath = path.resolve(`public/units/${unit}/textbook.html`);
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file does not exist: ${htmlPath}`);
    return;
  }
  const outPath = path.resolve(`public/units/${unit}/preview_page1.png`);

  const chromePath =
    process.env.CHROME_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const page1 = await page.$('.page, .a4-page');
  if (page1) {
    await page1.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  } else {
    console.error(`Could not find .page element in ${htmlPath}`);
  }
  await browser.close();
}

const unit = process.argv[2];
if (!unit) {
  console.error('Usage: node scripts/screenshot_cover.cjs <unit_id>');
  process.exit(1);
}

captureCover(unit).catch((err) => {
  console.error(err);
  process.exit(1);
});
