const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testMargin() {
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

  // Test setting margin-bottom: 4px on narrative-block
  const res = await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .narrative-block {
        margin-bottom: 4px !important;
      }
      .prose-p {
        margin-bottom: 5px !important;
      }
    `;
    document.head.appendChild(style);

    const p2 = document.querySelector('#page-2');
    const b1 = p2.querySelectorAll('.narrative-block')[0];
    const p1 = b1.querySelectorAll('.prose-p')[2];
    p1.innerHTML +=
      ' The crown was thus acquired through political negotiation rather than hereditary succession.';

    const prose = p2.querySelector('.prose-two-column');
    const pRect = p2.getBoundingClientRect();
    const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
    const rights = leaves.map((el) => el.getBoundingClientRect().right);
    const maxRight = Math.max(...rights);
    const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
    const f = p2.querySelector('.page-running-footer');
    const fTop = f.getBoundingClientRect().top;
    const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
    const maxBottom = Math.max(...bottoms);
    const gap = Math.round(fTop - maxBottom);

    return { gap, rightSpill };
  });

  console.log('Result with margin-bottom: 4px:', res);
  await browser.close();
}

testMargin().catch(console.error);
