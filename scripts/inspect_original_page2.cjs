const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function inspectOriginal() {
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

  const analysis = await page.evaluate(() => {
    const page2 = document.querySelector('#page-2');
    const header = page2.querySelector('.inside-cover-header-strip');
    const content = page2.querySelector('.inside-cover-content');
    const footer = page2.querySelector('.page-running-footer');
    const groups = Array.from(page2.querySelectorAll('.inside-kt-group'));

    const groupDetails = groups.map((g, gIdx) => {
      const gHeader = g.querySelector('.inside-kt-header');
      const rows = Array.from(g.querySelectorAll('.inside-spec-row'));
      return {
        group: gIdx + 1,
        totalHeight: g.getBoundingClientRect().height,
        headerHeight: gHeader ? gHeader.getBoundingClientRect().height : 0,
        rows: rows.map((r, rIdx) => {
          const blurb = r.querySelector('.isr-blurb');
          const cs = window.getComputedStyle(blurb);
          return {
            row: rIdx + 1,
            rowHeight: r.getBoundingClientRect().height,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            textLen: blurb.textContent.length,
          };
        }),
      };
    });

    return {
      pageScrollHeight: page2.scrollHeight,
      pageClientHeight: page2.clientHeight,
      headerHeight: header.getBoundingClientRect().height,
      contentHeight: content.getBoundingClientRect().height,
      footerHeight: footer.getBoundingClientRect().height,
      groupDetails,
    };
  });

  console.log(JSON.stringify(analysis, null, 2));
  await browser.close();
}

inspectOriginal();
