const puppeteer = require('puppeteer');
const path = require('path');

async function measureDetails() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const fileUrl =
    'file://' + path.resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const report = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.textbook-page'));
    return pages.map((p, idx) => {
      const pageNum = idx + 1;
      const pageInner = p.querySelector('.page-inner, .cover-container, .back-container');
      const prose = p.querySelector('.two-column-prose');
      const footer = p.querySelector('.page-footer, .cover-footer');

      let proseInfo = null;
      if (prose) {
        // find children of prose
        const children = Array.from(prose.children).map((c) => ({
          tag: c.tagName,
          className: c.className,
          top: c.offsetTop,
          height: c.offsetHeight,
        }));
        proseInfo = {
          clientHeight: prose.clientHeight,
          scrollHeight: prose.scrollHeight,
          childrenCount: prose.children.length,
        };
      }

      const pRect = p.getBoundingClientRect();
      const fRect = footer ? footer.getBoundingClientRect() : null;

      // Calculate last content element before footer
      let lastContentBottom = 0;
      for (const el of pageInner ? pageInner.children : p.children) {
        if (el === footer) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom > lastContentBottom) lastContentBottom = r.bottom;
      }

      const footerTop = fRect ? fRect.top : pRect.bottom;
      const gapBeforeFooter = footerTop - lastContentBottom;

      return {
        pageNum,
        pHeight: p.offsetHeight,
        pageInnerHeight: pageInner ? pageInner.offsetHeight : null,
        gapBeforeFooter: Math.round(gapBeforeFooter),
        proseInfo,
      };
    });
  });

  console.log('Detailed Page Measurement:\n', JSON.stringify(report, null, 2));
  await browser.close();
}

measureDetails().catch(console.error);
