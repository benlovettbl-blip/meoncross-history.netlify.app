const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureAllPages() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, '..', 'public', 'units', 'the_shoah', 'textbook.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const pageElements = await page.$$('.page');
  console.log(`Found ${pageElements.length} pages.`);

  const outDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65';

  for (let i = 0; i < pageElements.length; i++) {
    const pNum = i + 1;
    const elem = pageElements[i];
    const bounding = await elem.boundingBox();
    const metrics = await page.evaluate(
      (el) => ({
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        offsetHeight: el.offsetHeight,
        overflow: el.scrollHeight - el.clientHeight,
      }),
      elem,
    );

    console.log(
      `Page ${pNum}: clientHeight=${metrics.clientHeight}, scrollHeight=${metrics.scrollHeight}, overflow=${metrics.overflow}px`,
    );
    const screenshotPath = path.join(outDir, `textbook_page_${pNum}.png`);
    await elem.screenshot({ path: screenshotPath });
  }

  await browser.close();
  console.log('Finished capturing all textbook pages!');
}

captureAllPages().catch((err) => {
  console.error(err);
  process.exit(1);
});
