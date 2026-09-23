const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  const htmlPath = path.resolve('public/units/early_modern_world/pupil_workbook.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  const pages = await page.$$('.page');
  console.log('Found .page count:', pages.length);
  const outDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/f4725722-aa70-4d55-8df1-0932083cef86/.tempmediaStorage';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  for (let i = 0; i < pages.length; i++) {
    const shotPath = path.join(outDir, `em_page_${i + 1}.png`);
    await pages[i].screenshot({ path: shotPath });
    console.log('Saved:', shotPath);
  }
  await browser.close();
})();
