const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const fileUrl =
    'file:///' +
    path.join(__dirname, '../units/industrialisation_and_empire/textbook.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  const p6Data = await page.evaluate(() => {
    const el = document.querySelector('[data-page="6"]');
    const prose = el.querySelector('.two-column-prose');
    const proseRect = prose.getBoundingClientRect();
    const nextSection = prose.nextElementSibling;
    const leaves = Array.from(prose.querySelectorAll('*')).filter(
      (x) =>
        !['SCRIPT', 'STYLE', 'LINK'].includes(x.tagName) &&
        x.style.display !== 'none' &&
        x.children.length === 0 &&
        x.getBoundingClientRect().height > 0,
    );
    const maxLeafBottom = Math.max(...leaves.map((x) => x.getBoundingClientRect().bottom));
    const nextTop = nextSection ? nextSection.getBoundingClientRect().top : proseRect.bottom;

    const children = Array.from(prose.children).map((c) => ({
      tag: c.tagName,
      className: c.className,
      text: c.textContent.trim().slice(0, 40),
      height: c.getBoundingClientRect().height,
    }));

    const totalChildHeight = children.reduce((sum, c) => sum + c.height, 0);

    return {
      proseHeight: proseRect.height,
      nextTop,
      maxLeafBottom,
      internalProseGap: nextTop - maxLeafBottom,
      totalChildHeight,
      children,
    };
  });

  console.log('Industrialisation P6 Data:', JSON.stringify(p6Data, null, 2));

  await browser.close();
})();
