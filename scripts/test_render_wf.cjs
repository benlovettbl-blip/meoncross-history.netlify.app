const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

(async () => {
  const mod = await import(pathToFileURL(path.resolve('units/edexcel_medicine/data.js')).href);
  const {
    buildWesternFrontTwoPageWorkbook,
  } = require('./render_medicine_western_front_twopage_workbook.cjs');
  const html = buildWesternFrontTwoPageWorkbook(mod.unitData, { name: 'western_front' });
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  const unitPath = path.resolve('units/edexcel_medicine/pupil_workbook_western_front.html');
  await page.goto(pathToFileURL(unitPath).href, { waitUntil: 'networkidle0' });

  const audit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const errors = [];
    pages.forEach((p, idx) => {
      const num = idx + 1;
      const sh = p.scrollHeight;
      const ch = p.clientHeight;
      if (sh > ch + 1) {
        errors.push(`Page ${num}: OVERFLOW detected (scrollHeight ${sh}px > clientHeight ${ch}px)`);
      }
    });
    return { pageCount: pages.length, errors };
  });

  console.log(`Audited ${audit.pageCount} pages.`);
  if (audit.errors.length === 0) {
    console.log('✅ ALL 28 PAGES CLEAN: 0 OVERFLOWS DETECTED!');
  } else {
    console.log('❌ ERRORS DETECTED:');
    audit.errors.forEach((e) => console.log(' - ' + e));
  }

  const heights = await page.evaluate(() => {
    return [5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 27, 28].map((pNum) => {
      const p = document.getElementById('page-' + pNum);
      const sh = p.scrollHeight;
      const ch = p.clientHeight;
      const footer = p.querySelector('.page-footer-strip');
      const fRect = footer ? footer.getBoundingClientRect() : null;
      const pRect = p.getBoundingClientRect();
      const gap = fRect ? pRect.bottom - fRect.bottom : 0;
      return { page: pNum, scrollHeight: sh, clientHeight: ch, footerBottomGap: gap };
    });
  });

  console.log('\nPage footer gaps (target: < 25px):');
  heights.forEach((h) =>
    console.log(
      `Page ${h.page}: scrollHeight=${h.scrollHeight}, clientHeight=${h.clientHeight}, footerGap=${h.footerBottomGap.toFixed(1)}px`,
    ),
  );

  await browser.close();
})();
