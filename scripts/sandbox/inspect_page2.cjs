const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  const medHtml = path.resolve('public/units/medieval_england/textbook_PUBLISHER.html');
  await page.goto('file:///' + medHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const info = await page.evaluate(() => {
    function inspectPage(pageNum) {
      const p = document.querySelector(`.textbook-page[data-page="${pageNum}"]`);
      if (!p) return null;
      const prose = p.querySelector('.two-column-prose');
      const all = Array.from(prose.children);
      const proseRect = prose.getBoundingClientRect();
      return all.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          page: pageNum,
          cls: el.className,
          text: el.textContent.trim().slice(0, 30),
          rect: {
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
          },
          proseRight: Math.round(proseRect.right),
          isOutsideRight: r.right > proseRect.right + 4,
        };
      });
    }
    return { p2: inspectPage(2), p3: inspectPage(3) };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
