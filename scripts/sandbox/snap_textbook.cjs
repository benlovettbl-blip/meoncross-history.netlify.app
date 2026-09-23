const puppeteer = require('puppeteer');
const path = require('path');

async function snapshot() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }); // A4 at 96 DPI

  const fileUrl =
    'file://' + path.resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const pages = await page.$$('.textbook-page');
  console.log(`Found ${pages.length} pages.`);

  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const outPath = path.resolve(`public/units/water_and_sanitation/snap_p${i + 1}.png`);
    await p.screenshot({ path: outPath });
    console.log(`Saved snap_p${i + 1}.png`);
  }

  await browser.close();
}

snapshot().catch(console.error);
