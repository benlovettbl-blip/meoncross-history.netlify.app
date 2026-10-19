const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');

async function measurePages(enquiriesData) {
  // Save temporary data or test inside browser
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  // Update HTML file
  const { buildCmeUnifiedHtml } = require('./render_standard_textbook_cme_unified.cjs');
  const html = buildCmeUnifiedHtml(enquiriesData);
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const audit = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const footer = p.querySelector('.page-running-footer') || p.querySelector('.page-footer');
      const fRect = footer ? footer.getBoundingClientRect() : null;
      const pRect = p.getBoundingClientRect();

      let overflow = p.scrollHeight > p.clientHeight + 4 ? p.scrollHeight - p.clientHeight : 0;
      let childOverflow = 0;
      let horizontalSpill = 0;
      p.querySelectorAll('*').forEach((el) => {
        if (['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName)) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > pRect.bottom + 4)
          childOverflow = Math.max(childOverflow, Math.round(r.bottom - pRect.bottom));
        if (r.right > pRect.right + 4)
          horizontalSpill = Math.max(horizontalSpill, Math.round(r.right - pRect.right));
      });

      let gapAboveFooter = 0;
      if (footer) {
        const allEls = Array.from(p.querySelectorAll('*')).filter((el) => {
          if (el === footer || footer?.contains(el)) return false;
          if (['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName)) return false;
          if (
            el.matches(
              '.page, .page-container, .a4-page, .page-prose-body, .prose-two-column, .narrative-block',
            )
          )
            return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.bottom <= fRect.top + 2;
        });
        if (allEls.length > 0) {
          const maxBottom = Math.max(...allEls.map((el) => el.getBoundingClientRect().bottom));
          gapAboveFooter = Math.max(0, Math.round(fRect.top - maxBottom));
        }
      }

      return {
        pageNum,
        overflow: Math.max(overflow, childOverflow),
        horizontalSpill,
        gapAboveFooter,
      };
    });
  });

  await browser.close();
  return audit;
}

(async () => {
  console.log('Measuring current state...');
  const results = await measurePages();
  console.table(results);
})();
