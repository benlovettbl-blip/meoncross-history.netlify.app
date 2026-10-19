const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testSettings(fontSizePt, lineHeight, pMarginPx) {
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

  // Inject styles
  await page.addStyleTag({
    content: `
      .prose-p {
        font-size: ${fontSizePt}pt !important;
        line-height: ${lineHeight} !important;
        margin-bottom: ${pMarginPx}px !important;
      }
    `,
  });

  const pageData = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

      const footer = p.querySelector('.page-running-footer') || p.querySelector('.page-footer');
      let gapAboveFooter = 0;
      if (footer) {
        const fRect = footer.getBoundingClientRect();
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

      return { pageNum, overflow, gapAboveFooter };
    });
  });

  await browser.close();
  return pageData;
}

(async () => {
  console.log('Testing 11.5pt / 1.58 / 6px:');
  const res1 = await testSettings(11.5, 1.58, 6);
  console.log(res1.slice(3, 11)); // pages 4 to 11

  console.log('Testing 12.0pt / 1.60 / 7px:');
  const res2 = await testSettings(12.0, 1.6, 7);
  console.log(res2.slice(3, 11));

  console.log('Testing 12.5pt / 1.62 / 8px:');
  const res3 = await testSettings(12.5, 1.62, 8);
  console.log(res3.slice(3, 11));
})();
