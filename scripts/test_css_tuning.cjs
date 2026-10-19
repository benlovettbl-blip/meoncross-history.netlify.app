const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testCss() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Test with slightly adjusted font size or line height to see if the expanded text fits
  // Currently font-size: 11pt (14.66px), line-height: 1.58 (23.17px)
  // What if font-size: 10.5pt (14px), line-height: 1.52?
  const test1 = await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-style';
    style.innerHTML = `
      .prose-p {
        font-size: 10.3pt !important;
        line-height: 1.5 !important;
        margin-bottom: 5px !important;
      }
      .narrative-block {
        margin-bottom: 8px !important;
      }
    `;
    document.head.appendChild(style);

    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const prose = p.querySelector('.prose-two-column');
      if (!prose) return { pageNum, type: 'cover' };

      const footer = p.querySelector('.page-running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const proseRect = prose.getBoundingClientRect();

      const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
      const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
      const rights = leaves.map((el) => el.getBoundingClientRect().right);
      const pRect = p.getBoundingClientRect();
      const maxRight = Math.max(...rights);
      const pageRightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;

      const maxBottom = Math.max(...bottoms);
      const gap = Math.round(footerTop - maxBottom);

      return {
        pageNum,
        gapAboveFooter: gap,
        pageRightSpill,
        hasSpill: pageRightSpill > 0,
        isOptimal: gap >= 0 && gap <= 25 && pageRightSpill === 0,
      };
    });
  });

  console.log('--- TEST 1 (font: 10.3pt, line: 1.5): ---');
  console.log(test1);

  await browser.close();
}

testCss().catch(console.error);
