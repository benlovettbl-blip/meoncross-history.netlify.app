const puppeteer = require('puppeteer');
const path = require('path');
const { getHtmlContent } = require('./generate_parent_briefing_pdf.cjs');

(async () => {
  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/e841ef55-f3f2-46a6-acf2-8cba0b93e63a';
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const htmlContent = getHtmlContent();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pages = await page.$$('.page');
  console.log('Found .page elements:', pages.length);

  if (pages[0]) {
    await pages[0].screenshot({ path: path.join(artifactDir, 'parent_pack_page1_preview.png') });
    console.log('Page 1 screenshot saved.');
  }
  if (pages[1]) {
    await pages[1].screenshot({ path: path.join(artifactDir, 'parent_pack_page2_preview.png') });
    console.log('Page 2 screenshot saved.');
  }

  await browser.close();
})();
