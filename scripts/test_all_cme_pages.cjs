const puppeteer = require('puppeteer');
const path = require('path');

async function testAllPages(fontSizePt, lineHeight, pMarginPx) {
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

      // also check if any child spills below page
      const pRect = p.getBoundingClientRect();
      let childOverflow = 0;
      let horizontalSpill = 0;
      p.querySelectorAll('*').forEach((el) => {
        if (['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName)) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > pRect.bottom + 4) {
          childOverflow = Math.max(childOverflow, Math.round(r.bottom - pRect.bottom));
        }
        if (r.right > pRect.right + 4) {
          horizontalSpill = Math.max(horizontalSpill, Math.round(r.right - pRect.right));
        }
      });

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

      return {
        pageNum,
        overflow: Math.max(overflow, childOverflow),
        horizontalSpill,
        gapAboveFooter,
      };
    });
  });

  await browser.close();
  return pageData;
}

(async () => {
  for (const f of [11.8, 12.0, 12.2]) {
    console.log(
      `\n================ Testing ${f}pt / line-height 1.60 / margin 6.5px ================`,
    );
    const results = await testAllPages(f, 1.6, 6.5);
    let overflowCount = 0;
    let highGapCount = 0;
    results.forEach((r) => {
      if (r.overflow > 0 || r.horizontalSpill > 0) {
        console.log(
          `Page ${r.pageNum}: ❌ OVERFLOW (${r.overflow}px, horiz: ${r.horizontalSpill}px)`,
        );
        overflowCount++;
      } else if (r.gapAboveFooter > 25 && r.pageNum >= 4 && r.pageNum <= 27) {
        console.log(`Page ${r.pageNum}: ⚠️ Gap ${r.gapAboveFooter}px`);
        highGapCount++;
      }
    });
    console.log(
      `Summary for ${f}pt: Overflows=${overflowCount}, Pages with gap > 25px=${highGapCount}`,
    );
  }
})();
