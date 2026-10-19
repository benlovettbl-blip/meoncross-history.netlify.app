const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function inspectLineBoxes() {
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

  const lineStats = await page.evaluate(() => {
    return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
      const p = document.querySelector('#page-' + num);
      const prose = p.querySelector('.prose-two-column');
      const proseRect = prose.getBoundingClientRect();
      const col1Left = proseRect.left;
      const col2Left = proseRect.left + proseRect.width / 2;
      const col3Left = proseRect.right;

      let col1Lines = 0;
      let col2Lines = 0;
      let col3Lines = 0;

      const paras = Array.from(p.querySelectorAll('.prose-p'));
      paras.forEach((para) => {
        const rects = Array.from(para.getClientRects());
        rects.forEach((r) => {
          if (r.left < col2Left - 10) {
            col1Lines++;
          } else if (r.left < col3Left - 10) {
            col2Lines++;
          } else {
            col3Lines++;
          }
        });
      });

      return {
        pageNum: num,
        col1Lines,
        col2Lines,
        col3Lines,
        totalLines: col1Lines + col2Lines + col3Lines,
      };
    });
  });

  console.log(JSON.stringify(lineStats, null, 2));
  await browser.close();
}

inspectLineBoxes().catch(console.error);
