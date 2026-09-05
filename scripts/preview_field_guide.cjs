const puppeteer = require('puppeteer');
const path = require('path');
const { getHtmlContent } = require('./generate_ypres_field_guide_pdf.cjs');

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

  for (let i = 0; i < pages.length; i++) {
    const box = await pages[i].boundingBox();
    const scrollHeight = await page.evaluate((el) => el.scrollHeight, pages[i]);
    const clientHeight = await page.evaluate((el) => el.clientHeight, pages[i]);
    console.log(
      `Page ${i + 1}: scrollHeight=${scrollHeight}, clientHeight=${clientHeight}, overflow=${scrollHeight > clientHeight}`,
    );

    // Save sample screenshots for visual inspection
    if (i === 0 || i === 2 || i === 3 || i === 5 || i === 8 || i === 9) {
      await pages[i].screenshot({
        path: path.join(artifactDir, `field_guide_page${i + 1}_preview.png`),
      });
    }
  }

  await browser.close();
  console.log('Inspection complete.');
})();
