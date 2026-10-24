const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function diag() {
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

  const info = await page.evaluate(() => {
    const page2 = document.querySelector('#page-2');
    const header = page2.querySelector('.inside-cover-header-strip');
    const content = page2.querySelector('.inside-cover-content');
    const footer = page2.querySelector('.page-running-footer');
    const groups = Array.from(page2.querySelectorAll('.inside-kt-group'));

    return {
      page2Rect: page2.getBoundingClientRect(),
      page2ScrollHeight: page2.scrollHeight,
      headerRect: header ? header.getBoundingClientRect() : null,
      contentRect: content ? content.getBoundingClientRect() : null,
      contentComputed: content
        ? {
            display: window.getComputedStyle(content).display,
            justifyContent: window.getComputedStyle(content).justifyContent,
            height: window.getComputedStyle(content).height,
            gap: window.getComputedStyle(content).gap,
          }
        : null,
      footerRect: footer ? footer.getBoundingClientRect() : null,
      groups: groups.map((g, idx) => ({
        idx: idx + 1,
        rect: g.getBoundingClientRect(),
        rowsCount: g.querySelectorAll('.inside-spec-row').length,
        firstRowRect: g.querySelector('.inside-spec-row').getBoundingClientRect(),
        lastRowRect: g.querySelector('.inside-spec-row:last-child').getBoundingClientRect(),
      })),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

diag();
