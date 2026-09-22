const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { getHtmlContent } = require('./generate_ypres_tour_leader_pocket_guide.cjs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  const html = getHtmlContent();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pages = await page.$$('.page');
  console.log('Found .page count:', pages.length);
  const outDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/77e31091-6f73-45d7-ae12-29358bb4caf5';
  for (let i = 0; i < pages.length; i++) {
    const shotPath = path.join(outDir, `ypres_a4_page_${i + 1}.png`);
    await pages[i].screenshot({ path: shotPath });
    console.log('Saved:', shotPath);
  }
  await browser.close();
})();
