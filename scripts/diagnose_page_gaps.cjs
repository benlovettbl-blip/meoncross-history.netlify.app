const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const footer = p.querySelector('.page-running-footer') || p.querySelector('.page-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;

      const paras = Array.from(
        p.querySelectorAll(
          '.prose-p, .narrative-block, p, h2, h3, .back-synopsis-card, .back-enquiries-box, .back-perspectives-box, .back-themes-strip',
        ),
      );
      // exclude container elements
      const leafElements = paras.filter(
        (el) =>
          !el.classList.contains('prose-two-column') &&
          !el.classList.contains('page-prose-body') &&
          !el.classList.contains('back-body-prose') &&
          !el.classList.contains('back-body-content'),
      );

      const bottoms = leafElements.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          cls: el.className,
          bottom: r.bottom,
          text: (el.textContent || '').trim().slice(0, 30),
        };
      });

      const maxBottom = bottoms.length > 0 ? Math.max(...bottoms.map((b) => b.bottom)) : 0;
      const gap = footerTop ? footerTop - maxBottom : 0;

      // Also let's check column 1 and column 2 heights in .prose-two-column
      const twoCol = p.querySelector('.prose-two-column');
      let colInfo = null;
      if (twoCol) {
        // get client height of twoCol
        colInfo = {
          clientHeight: twoCol.clientHeight,
          scrollHeight: twoCol.scrollHeight,
        };
      }

      return {
        pageNum,
        footerTop: Math.round(footerTop),
        maxContentBottom: Math.round(maxBottom),
        actualGapToFooterPx: Math.round(gap),
        colInfo,
      };
    });
  });

  console.log('ACTUAL PAGE GAPS:');
  console.log(JSON.stringify(data, null, 2));

  // Also capture screenshots of all pages 1 to 12 into artifact dir
  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/e7ef5e95-188d-421a-92d5-7160b553ca08';
  for (let i = 1; i <= 12; i++) {
    const el = await page.$(`#page-${i}`);
    if (el) {
      await el.screenshot({ path: path.join(artifactDir, `page_${i}.png`) });
    }
  }
  console.log('Screenshots saved for all 12 pages.');

  await browser.close();
})();
