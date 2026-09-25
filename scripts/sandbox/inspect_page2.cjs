const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  const medHtml = path.resolve('public/units/medieval_england/textbook_PUBLISHER.html');
  await page.goto('file:///' + medHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const info = await page.evaluate(() => {
    const p2 = document.querySelector('.textbook-page[data-page="2"]');
    const prose = p2.querySelector('.two-column-prose');
    const all = Array.from(prose.children);
    const proseRect = prose.getBoundingClientRect();
    return all.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: el.className,
        text: el.textContent.trim().slice(0, 30),
        rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right },
        isOutsideRight: r.left >= proseRect.right - 2,
        isOutsideBottom: r.top >= proseRect.bottom - 2,
      };
    });
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
