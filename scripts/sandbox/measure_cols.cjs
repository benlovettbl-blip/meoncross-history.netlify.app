const puppeteer = require('puppeteer');
const path = require('path');

async function measureColumns() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const fileUrl =
    'file://' + path.resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const colReport = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.textbook-page'));
    return pages.slice(1, 13).map((p, idx) => {
      const pageNum = idx + 2;
      const prose = p.querySelector('.two-column-prose');
      if (!prose) return { pageNum, error: 'No prose' };

      const proseRect = prose.getBoundingClientRect();
      const proseMidX = proseRect.left + proseRect.width / 2;

      let col1MaxBottom = 0;
      let col2MaxBottom = 0;

      for (const child of prose.children) {
        const cRect = child.getBoundingClientRect();
        // check if child is in col1 or col2 or spans
        const childMidX = cRect.left + cRect.width / 2;
        if (childMidX < proseMidX) {
          // Col 1
          if (cRect.bottom > col1MaxBottom) col1MaxBottom = cRect.bottom;
        } else {
          // Col 2
          if (cRect.bottom > col2MaxBottom) col2MaxBottom = cRect.bottom;
        }
      }

      const col1BottomGap = Math.round(proseRect.bottom - col1MaxBottom);
      const col2BottomGap = Math.round(proseRect.bottom - col2MaxBottom);

      return {
        pageNum,
        proseHeight: Math.round(proseRect.height),
        col1BottomGap,
        col2BottomGap,
      };
    });
  });

  console.log('Column Gaps in Prose:\n', JSON.stringify(colReport, null, 2));
  await browser.close();
}

measureColumns().catch(console.error);
