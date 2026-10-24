const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
  const fileUrl =
    'file:///' + path.resolve('public/units/ks2_ww2/textbook.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const outDir = path.resolve('scratch/ks2_inspect');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pages = await page.$$('.page');
  console.log('Total pages found:', pages.length);

  for (let i = 0; i < pages.length; i++) {
    const pPath = path.join(outDir, `page_${i + 1}.png`);
    await pages[i].screenshot({ path: pPath });
    console.log(`Captured: page_${i + 1}.png`);
  }

  await browser.close();
  console.log('All screenshots captured in scratch/ks2_inspect');
})();
