const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.emulateMediaType('print');

  const eras = ['medieval', 'renaissance', '18th_19th', 'modern', 'western_front'];
  const targetDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/bcd70e6a-d679-405b-8831-b9087b16f92c';

  for (const era of eras) {
    const htmlPath = path.join(
      __dirname,
      '..',
      'public',
      'units',
      'edexcel_medicine',
      `textbook_${era}.html`,
    );
    if (!fs.existsSync(htmlPath)) {
      console.log('File not found:', htmlPath);
      continue;
    }
    await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 600));

    const page5El = await page.$('#page-5');
    if (page5El) {
      await page5El.screenshot({ path: `${targetDir}/diag_page_5_${era}.png` });
      const diag = await page.evaluate(() => {
        const p5 = document.querySelector('#page-5');
        if (!p5) return null;
        const footer = p5.querySelector('.page-footer');
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        const bodyEl = p5.querySelector('.spread-body');
        const cols = p5.querySelector('.prose-columns');
        const paras = Array.from(p5.querySelectorAll('.prose-p'));
        const headers = Array.from(p5.querySelectorAll('.block-header'));
        const allEls = paras.concat(headers);
        let maxBottom = 0;
        let lowestEl = null;
        allEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom > maxBottom) {
            maxBottom = r.bottom;
            lowestEl = { tag: el.tagName, text: el.textContent.slice(0, 40), bottom: r.bottom };
          }
        });

        // Check if any element overlaps the footer
        const overlapping = allEls
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return footerRect && r.bottom > footerRect.top;
          })
          .map((el) => ({
            tag: el.tagName,
            text: el.textContent.slice(0, 40),
            bottom: el.getBoundingClientRect().bottom,
            footerTop: footerRect.top,
          }));

        return {
          scrollH: p5.scrollHeight,
          clientH: p5.clientHeight,
          footerTop: footerRect ? footerRect.top : null,
          maxBottom,
          clearance: footerRect ? footerRect.top - maxBottom : null,
          overlappingCount: overlapping.length,
          overlapping,
          lowestEl,
          colsH: cols ? cols.clientHeight : null,
          colsScrollH: cols ? cols.scrollHeight : null,
        };
      });
      console.log(`[${era}] Page 5 diagnostics:`, JSON.stringify(diag, null, 2));
    } else {
      console.log(`[${era}] No #page-5 found!`);
    }
  }

  await browser.close();
})();
