const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function diagnoseColumns() {
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

  const pageDetails = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const prose = p.querySelector('.prose-two-column');
      if (!prose) return { pageNum, type: 'cover' };

      const footer = p.querySelector('.page-running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const proseRect = prose.getBoundingClientRect();

      // Check horizontal spill
      const hasHorizontalSpill = prose.scrollWidth > prose.clientWidth + 2;
      const spillAmount = prose.scrollWidth - prose.clientWidth;

      // Leaf elements
      const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
      const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
      const rights = leaves.map((el) => el.getBoundingClientRect().right);
      const pRect = p.getBoundingClientRect();
      const maxRight = Math.max(...rights);
      const pageRightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;

      const maxBottom = Math.max(...bottoms);
      const gap = Math.round(footerTop - maxBottom);

      // Paragraph counts and word count
      const paras = Array.from(prose.querySelectorAll('.prose-p'));
      const words = paras
        .map((el) => el.textContent)
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length;

      // Check how many lines or text elements are positioned beyond column 2
      const col2Right = proseRect.left + prose.clientWidth;
      const spilledElements = leaves.filter(
        (el) => el.getBoundingClientRect().right > col2Right + 5,
      );

      return {
        pageNum,
        words,
        parasCount: paras.length,
        proseHeight: Math.round(proseRect.height),
        gapAboveFooter: gap,
        pageRightSpill,
        hasHorizontalSpill,
        spillAmount: Math.round(spillAmount),
        spilledCount: spilledElements.length,
        spilledTextSnippet: spilledElements.map((el) => el.textContent.trim().slice(0, 40)),
      };
    });
  });

  console.log(JSON.stringify(pageDetails, null, 2));
  await browser.close();
}

diagnoseColumns().catch(console.error);
