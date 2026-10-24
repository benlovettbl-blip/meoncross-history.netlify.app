const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function measureFontSteps() {
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

  const measurements = await page.evaluate(() => {
    const page2 = document.querySelector('#page-2');
    const content = page2.querySelector('.inside-cover-content');
    const footer = page2.querySelector('.page-running-footer');
    const groups = Array.from(page2.querySelectorAll('.inside-kt-group'));
    const rows = Array.from(page2.querySelectorAll('.inside-spec-row'));
    const blurbs = Array.from(page2.querySelectorAll('.isr-blurb'));
    const questions = Array.from(page2.querySelectorAll('.isr-question'));
    const codes = Array.from(page2.querySelectorAll('.isr-code'));
    const pages = Array.from(page2.querySelectorAll('.isr-pages'));
    const ktTitles = Array.from(page2.querySelectorAll('.ikt-title'));
    const ktBadges = Array.from(page2.querySelectorAll('.ikt-badge'));

    // Test with justify-content: flex-start vs space-between
    content.style.justifyContent = 'flex-start';

    const results = [];
    const footerTop = footer.getBoundingClientRect().top;
    const clientHeight = page2.clientHeight;

    for (let testFs = 6.5; testFs <= 9.0; testFs += 0.2) {
      const pad = 3.0 + (testFs - 6.5) * 0.8;
      const gap = 3.0 + (testFs - 6.5) * 0.6;
      const groupGap = 8.0 + (testFs - 6.5) * 1.5;

      content.style.gap = groupGap.toFixed(1) + 'px';
      blurbs.forEach((b) => {
        b.style.fontSize = testFs.toFixed(1) + 'pt';
        b.style.lineHeight = '1.30';
      });
      questions.forEach((q) => (q.style.fontSize = (testFs + 1.0).toFixed(1) + 'pt'));
      codes.forEach((c) => (c.style.fontSize = (testFs + 0.3).toFixed(1) + 'pt'));
      pages.forEach((p) => (p.style.fontSize = testFs.toFixed(1) + 'pt'));
      ktTitles.forEach((t) => (t.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt'));
      ktBadges.forEach((b) => (b.style.fontSize = testFs.toFixed(1) + 'pt'));

      rows.forEach((r) => {
        r.style.padding = `${pad.toFixed(1)}px 7px`;
      });
      page2.querySelectorAll('.inside-kt-rows').forEach((r) => {
        r.style.gap = gap.toFixed(1) + 'px';
      });

      const lastGroup = groups[groups.length - 1];
      const lastRow = lastGroup.querySelector('.inside-spec-row:last-child');
      const lastBottom = lastRow.getBoundingClientRect().bottom;
      const scrollHeight = page2.scrollHeight;
      const clearance = footerTop - lastBottom;

      results.push({
        fs: testFs.toFixed(1),
        pad: pad.toFixed(1),
        groupGap: groupGap.toFixed(1),
        clearance: Math.round(clearance),
        scrollHeight,
        clientHeight,
        fits: lastBottom <= footerTop - 4 && scrollHeight <= clientHeight,
      });
    }

    return results;
  });

  console.table(measurements);
  await browser.close();
}

measureFontSteps();
