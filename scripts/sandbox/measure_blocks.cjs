const puppeteer = require('puppeteer');
const path = require('path');

async function measureBlocks() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const fileUrl =
    'file://' + path.resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const report = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.textbook-page'));
    return pages.slice(1, 13).map((p, idx) => {
      const pageNum = idx + 2;
      const isRight = pageNum % 2 !== 0;
      const prose = p.querySelector('.two-column-prose');
      if (!prose) return { pageNum, error: 'No prose' };

      const children = Array.from(prose.children).map((c) => {
        let title = c.className;
        if (c.querySelector('.sb-title'))
          title = 'BANNER: ' + c.querySelector('.sb-title').textContent;
        else if (c.querySelector('.archival-title'))
          title = 'SRC: ' + c.querySelector('.archival-title').textContent.slice(0, 30);
        else if (c.querySelector('.fieldwork-title'))
          title = 'FW: ' + c.querySelector('.fieldwork-title').textContent.slice(0, 30);
        else if (c.querySelector('.kf-name'))
          title = 'KF: ' + c.querySelector('.kf-name').textContent;
        else if (c.querySelector('.csb-title'))
          title = 'CSB: ' + c.querySelector('.csb-title').textContent.slice(0, 30);
        else if (c.classList.contains('narrative-p')) title = 'P: ' + c.textContent.slice(0, 25);
        return {
          title,
          height: Math.round(c.getBoundingClientRect().height),
        };
      });

      return {
        pageNum,
        isRight,
        proseHeight: Math.round(prose.clientHeight),
        children,
      };
    });
  });

  console.log('Block Measurements:\n', JSON.stringify(report, null, 2));
  await browser.close();
}

measureBlocks().catch(console.error);
