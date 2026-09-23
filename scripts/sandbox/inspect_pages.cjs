const fs = require('fs');
const puppeteer = require('puppeteer');

async function inspect() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const fileUrl =
    'file://' +
    require('path').resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const pageMetrics = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.a4-page, .page, [class*="page"]')).filter(
      (el) => {
        // filter only top-level page containers
        return (
          el.classList.contains('a4-page') ||
          el.classList.contains('page-sheet') ||
          (el.offsetHeight > 800 && el.parentElement === document.body)
        );
      },
    );

    return pages.map((p, idx) => {
      const rect = p.getBoundingClientRect();
      const scrollHeight = p.scrollHeight;
      const clientHeight = p.clientHeight;
      // find children and lowest bottom
      let maxBottom = 0;
      for (const child of p.children) {
        const cRect = child.getBoundingClientRect();
        const bottomRel = cRect.bottom - rect.top;
        if (bottomRel > maxBottom) maxBottom = bottomRel;
      }
      return {
        pageIndex: idx + 1,
        className: p.className,
        clientHeight,
        scrollHeight,
        maxBottom,
        deadBottomGap: clientHeight - maxBottom,
      };
    });
  });

  console.log('Page Metrics:', JSON.stringify(pageMetrics, null, 2));
  await browser.close();
}

inspect().catch(console.error);
