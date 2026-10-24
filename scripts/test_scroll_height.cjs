const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testScrollHeight() {
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

  const steps = await page.evaluate(() => {
    const page2 = document.querySelector('#page-2');
    const content = page2.querySelector('.inside-cover-content');
    const footer = page2.querySelector('.page-running-footer');
    const blurbs = Array.from(page2.querySelectorAll('.isr-blurb'));
    const rows = Array.from(page2.querySelectorAll('.inside-spec-row'));

    content.style.justifyContent = 'flex-start';
    page2.style.justifyContent = 'flex-start';

    const log = [];
    // Test from 7.0pt to 10.0pt with step 0.2pt
    for (let testFs = 7.0; testFs <= 10.0; testFs += 0.2) {
      blurbs.forEach((b) => {
        b.style.fontSize = testFs.toFixed(1) + 'pt';
        b.style.lineHeight = '1.34';
      });
      rows.forEach((r) => {
        r.style.padding = '4px 8px';
      });
      page2.querySelectorAll('.isr-question').forEach((q) => {
        q.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt';
      });

      const lastRow = page2.querySelector(
        '.inside-kt-group:last-child .inside-spec-row:last-child',
      );
      const footerTop = footer.getBoundingClientRect().top;
      const lastBottom = lastRow.getBoundingClientRect().bottom;

      log.push({
        fs: testFs.toFixed(1) + 'pt',
        lastBottom,
        footerTop,
        clearance: footerTop - lastBottom,
        scrollHeight: page2.scrollHeight,
        clientHeight: page2.clientHeight,
      });
    }

    return log;
  });

  console.table(steps);
  await browser.close();
}

testScrollHeight();
