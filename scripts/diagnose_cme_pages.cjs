const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/cme_new/textbook_UNIFIED.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Test at 11.5pt font size
  await page.addStyleTag({
    content: `
      .prose-p {
        font-size: 11.5pt !important;
        line-height: 1.58 !important;
        margin-bottom: 6px !important;
      }
    `,
  });

  const pageDiagnostics = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const footer = p.querySelector('.page-running-footer') || p.querySelector('.page-footer');
      const fRect = footer ? footer.getBoundingClientRect() : null;
      const pRect = p.getBoundingClientRect();

      const prose = p.querySelector('.prose-two-column');
      let wordCount = 0;
      let gap = 0;
      let rightSpill = 0;

      if (prose) {
        const paras = Array.from(prose.querySelectorAll('.prose-p'));
        wordCount = paras
          .map((el) => el.textContent)
          .join(' ')
          .split(/\s+/)
          .filter(Boolean).length;

        const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
        const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
        const rights = leaves.map((el) => el.getBoundingClientRect().right);

        const maxRight = Math.max(...rights);
        rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
        const maxBottom = Math.max(...bottoms);
        gap = fRect ? Math.round(fRect.top - maxBottom) : 0;
      }

      return {
        pageNum,
        isVerso: pageNum % 2 === 0,
        wordCount,
        gap,
        rightSpill,
      };
    });
  });

  console.log('PAGE DIAGNOSTICS (at 11.5pt / 1.58 / 6px):');
  console.table(pageDiagnostics.filter((p) => p.pageNum >= 4 && p.pageNum <= 27));

  await browser.close();
})();
