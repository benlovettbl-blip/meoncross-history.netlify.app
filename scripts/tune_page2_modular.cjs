const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testTune() {
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

  const evaluation = await page.evaluate(() => {
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

    // Remove artificial space-between
    content.style.justifyContent = 'flex-start';
    content.style.gap = '8px';

    // Test scaling upwards from 7.0pt to 10.0pt
    let bestFs = 7.0;
    let bestPad = 3.5;
    let bestGap = 3.5;
    let bestGroupGap = 6;

    const footerTop = footer.getBoundingClientRect().top;

    for (let testFs = 7.0; testFs <= 10.5; testFs += 0.2) {
      const testPad = 3.0 + (testFs - 7.0) * 0.8;
      const testGap = 3.0 + (testFs - 7.0) * 0.6;
      const testGroupGap = 6.0 + (testFs - 7.0) * 1.2;

      content.style.gap = testGroupGap.toFixed(1) + 'px';
      blurbs.forEach((b) => {
        b.style.fontSize = testFs.toFixed(1) + 'pt';
        b.style.lineHeight = '1.34';
      });
      questions.forEach((q) => (q.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt'));
      codes.forEach((c) => (c.style.fontSize = (testFs + 0.4).toFixed(1) + 'pt'));
      pages.forEach((p) => (p.style.fontSize = testFs.toFixed(1) + 'pt'));
      ktTitles.forEach((t) => (t.style.fontSize = (testFs + 1.6).toFixed(1) + 'pt'));
      ktBadges.forEach((b) => (b.style.fontSize = (testFs + 0.2).toFixed(1) + 'pt'));

      rows.forEach((r) => {
        r.style.padding = `${testPad.toFixed(1)}px 8px`;
      });
      page2.querySelectorAll('.inside-kt-rows').forEach((r) => {
        r.style.gap = testGap.toFixed(1) + 'px';
      });

      const lastRow = groups[groups.length - 1].querySelector('.inside-spec-row:last-child');
      const lastBottom = lastRow.getBoundingClientRect().bottom;

      if (lastBottom <= footerTop - 8 && page2.scrollHeight <= page2.clientHeight) {
        bestFs = testFs;
        bestPad = testPad;
        bestGap = testGap;
        bestGroupGap = testGroupGap;
      } else {
        break;
      }
    }

    // Apply best settings
    content.style.gap = bestGroupGap.toFixed(1) + 'px';
    blurbs.forEach((b) => {
      b.style.fontSize = bestFs.toFixed(1) + 'pt';
      b.style.lineHeight = '1.34';
    });
    questions.forEach((q) => (q.style.fontSize = (bestFs + 1.2).toFixed(1) + 'pt'));
    codes.forEach((c) => (c.style.fontSize = (bestFs + 0.4).toFixed(1) + 'pt'));
    pages.forEach((p) => (p.style.fontSize = bestFs.toFixed(1) + 'pt'));
    ktTitles.forEach((t) => (t.style.fontSize = (bestFs + 1.6).toFixed(1) + 'pt'));
    ktBadges.forEach((b) => (b.style.fontSize = (bestFs + 0.2).toFixed(1) + 'pt'));
    rows.forEach((r) => {
      r.style.padding = `${bestPad.toFixed(1)}px 8px`;
    });
    page2.querySelectorAll('.inside-kt-rows').forEach((r) => {
      r.style.gap = bestGap.toFixed(1) + 'px';
    });

    const lastRow = groups[groups.length - 1].querySelector('.inside-spec-row:last-child');
    const finalClearance = footerTop - lastRow.getBoundingClientRect().bottom;

    return {
      bestFs,
      bestPad,
      bestGap,
      bestGroupGap,
      finalClearance,
      pageScrollHeight: page2.scrollHeight,
      pageClientHeight: page2.clientHeight,
    };
  });

  console.log('Optimization results:', evaluation);

  // Take screenshot of Page 2
  const page2Elem = await page.$('#page-2');
  const previewPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'cme_new',
    'previews',
    'unified',
    'page_02_tuned.png',
  );
  await page2Elem.screenshot({ path: previewPath });
  console.log('Saved preview to:', previewPath);

  await browser.close();
}

testTune();
