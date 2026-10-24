const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureAllPages(unit) {
  let htmlPath = path.resolve(`public/units/${unit}/textbook.html`);
  if (!fs.existsSync(htmlPath)) {
    htmlPath = path.resolve(`public/units/${unit}/textbook_PUBLISHER.html`);
  }
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file does not exist: ${htmlPath}`);
    return;
  }
  const outDir = path.resolve(`public/units/${unit}/previews`);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

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

  const pages = await page.$$('.page, .a4-page, .textbook-page');
  console.log(`Found ${pages.length} pages in ${unit}`);
  for (let i = 0; i < pages.length; i++) {
    const outPath = path.join(outDir, `page_${i + 1}.png`);
    await pages[i].screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  }
  await browser.close();
}

const unit = process.argv[2];
if (!unit) {
  console.error('Usage: node scripts/screenshot_all_pages.cjs <unit_id>');
  process.exit(1);
}

captureAllPages(unit).catch((err) => {
  console.error(err);
  process.exit(1);
});
