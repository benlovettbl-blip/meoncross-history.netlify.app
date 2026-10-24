const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testProperLayout() {
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

  const result = await page.evaluate(() => {
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

    // Fix the root cause: remove space-between
    content.style.justifyContent = 'flex-start';
    page2.style.justifyContent = 'flex-start';

    const footerTop = footer.getBoundingClientRect().top;

    // Test different font sizes with natural proportional spacing
    let best = null;

    for (let fsPt = 7.0; fsPt <= 9.0; fsPt += 0.1) {
      const padY = 3.2 + (fsPt - 7.0) * 0.4;
      const rowGap = 3.0 + (fsPt - 7.0) * 0.3;
      const groupGap = 8.0 + (fsPt - 7.0) * 0.8;

      content.style.gap = `${groupGap.toFixed(1)}px`;

      groups.forEach((g) => {
        g.style.marginBottom = '0px';
      });

      page2.querySelectorAll('.inside-kt-rows').forEach((r) => {
        r.style.gap = `${rowGap.toFixed(1)}px`;
      });

      rows.forEach((r) => {
        r.style.padding = `${padY.toFixed(1)}px 8px`;
      });

      blurbs.forEach((b) => {
        b.style.fontSize = `${fsPt.toFixed(2)}pt`;
        b.style.lineHeight = '1.28';
      });

      questions.forEach((q) => {
        q.style.fontSize = `${(fsPt + 1.2).toFixed(2)}pt`;
      });

      codes.forEach((c) => {
        c.style.fontSize = `${(fsPt + 0.3).toFixed(2)}pt`;
      });

      pages.forEach((p) => {
        p.style.fontSize = `${fsPt.toFixed(2)}pt`;
      });

      ktTitles.forEach((t) => {
        t.style.fontSize = `${(fsPt + 1.5).toFixed(2)}pt`;
      });

      ktBadges.forEach((b) => {
        b.style.fontSize = `${(fsPt + 0.3).toFixed(2)}pt`;
      });

      const lastGroup = groups[groups.length - 1];
      const lastRow = lastGroup.querySelector('.inside-spec-row:last-child');
      const lastBottom = lastRow.getBoundingClientRect().bottom;
      const clearance = footerTop - lastBottom;

      if (lastBottom <= footerTop - 8 && page2.scrollHeight <= page2.clientHeight) {
        best = {
          fsPt: fsPt.toFixed(2),
          padY: padY.toFixed(1),
          rowGap: rowGap.toFixed(1),
          groupGap: groupGap.toFixed(1),
          clearance: Math.round(clearance),
          scrollHeight: page2.scrollHeight,
          clientHeight: page2.clientHeight,
        };
      } else {
        break;
      }
    }

    if (best) {
      // Re-apply best settings
      const fsPt = parseFloat(best.fsPt);
      content.style.gap = `${best.groupGap}px`;
      page2.querySelectorAll('.inside-kt-rows').forEach((r) => {
        r.style.gap = `${best.rowGap}px`;
      });
      rows.forEach((r) => {
        r.style.padding = `${best.padY}px 8px`;
      });
      blurbs.forEach((b) => {
        b.style.fontSize = `${fsPt.toFixed(2)}pt`;
        b.style.lineHeight = '1.28';
      });
      questions.forEach((q) => {
        q.style.fontSize = `${(fsPt + 1.2).toFixed(2)}pt`;
      });
      codes.forEach((c) => {
        c.style.fontSize = `${(fsPt + 0.3).toFixed(2)}pt`;
      });
      pages.forEach((p) => {
        p.style.fontSize = `${fsPt.toFixed(2)}pt`;
      });
      ktTitles.forEach((t) => {
        t.style.fontSize = `${(fsPt + 1.5).toFixed(2)}pt`;
      });
      ktBadges.forEach((b) => {
        b.style.fontSize = `${(fsPt + 0.3).toFixed(2)}pt`;
      });
    }

    return best;
  });

  console.log('Optimal Page 2 Layout:', result);

  // Screenshot Page 2
  const page2Elem = await page.$('#page-2');
  const previewPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'cme_new',
    'previews',
    'unified',
    'page_02_fixed.png',
  );
  await page2Elem.screenshot({ path: previewPath });
  console.log('Saved fixed preview to:', previewPath);

  await browser.close();
}

testProperLayout();
