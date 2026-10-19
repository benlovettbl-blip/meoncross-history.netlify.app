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

  // In page, inject a focus box into each recto page header banner
  await page.evaluate(() => {
    const rectos = document.querySelectorAll('.a4-page.recto');
    rectos.forEach((r) => {
      const banner = r.querySelector('.recto-header-banner');
      if (banner && !banner.querySelector('.recto-focus-box')) {
        const box = document.createElement('div');
        box.className = 'recto-focus-box';
        box.innerHTML = `
          <div style="margin-top: 5px; padding: 6px 10px; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #0b192c; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.3;">
            <strong style="color: #0b192c; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.05em;">Decisive Turning Point & Long-Term Impact:</strong>
            Historical analysis of causal dominoes, military escalations, and regional diplomatic ramifications.
          </div>
        `;
        banner.appendChild(box);
      }
    });
  });

  // Inject tuned CSS
  await page.addStyleTag({
    content: `
      .recto-header-banner {
        flex-direction: column !important;
        align-items: stretch !important;
        padding: 2.5mm 3.5mm !important;
        margin-bottom: 3.5mm !important;
      }
      .prose-p {
        font-size: 11.4pt !important;
        line-height: 1.58 !important;
        margin-bottom: 5.5px !important;
      }
      .narrative-block {
        margin-bottom: 12px !important;
      }
    `,
  });

  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page'))
      .slice(3, 27)
      .map((p, idx) => {
        const pageNum = idx + 4;
        const footer = p.querySelector('.page-running-footer');
        const fRect = footer.getBoundingClientRect();
        const pRect = p.getBoundingClientRect();
        const twoCol = p.querySelector('.prose-two-column');
        const leaves = Array.from(twoCol.querySelectorAll('.prose-p, .block-header'));
        const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
        const rights = leaves.map((el) => el.getBoundingClientRect().right);

        const maxRight = Math.max(...rights);
        const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
        const maxBottom = Math.max(...bottoms);
        const gap = Math.round(fRect.top - maxBottom);

        return {
          pageNum,
          isVerso: pageNum % 2 === 0,
          gap,
          rightSpill,
        };
      });
  });

  console.table(results);
  await browser.close();
})();
