const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testWhyNull() {
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'cme_new',
    'textbook_UNIFIED.html',
  );
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const diag = await page.evaluate(() => {
    const page2 = document.querySelector('#page-2');
    const content = page2.querySelector('.inside-cover-content');
    const footer = page2.querySelector('.page-running-footer');
    const groups = Array.from(page2.querySelectorAll('.inside-kt-group'));

    content.style.justifyContent = 'flex-start';
    page2.style.justifyContent = 'flex-start';

    const footerTop = footer.getBoundingClientRect().top;
    const lastGroup = groups[groups.length - 1];
    const lastRow = lastGroup.querySelector('.inside-spec-row:last-child');
    const lastBottom = lastRow.getBoundingClientRect().bottom;

    return {
      footerTop,
      lastBottom,
      pageScrollHeight: page2.scrollHeight,
      pageClientHeight: page2.clientHeight,
      initialDiff: footerTop - lastBottom,
    };
  });

  console.log('Diag before changes:', diag);
  await browser.close();
}

testWhyNull();
