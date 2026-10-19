const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testTune() {
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

  const metrics = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const prose = p.querySelector('.prose-two-column');
      if (!prose) return { pageNum, isOptimal: true, desc: 'Cover' };

      const footer = p.querySelector('.page-running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const proseRect = prose.getBoundingClientRect();
      const pRect = p.getBoundingClientRect();

      const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
      const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
      const rights = leaves.map((el) => el.getBoundingClientRect().right);

      const maxRight = Math.max(...rights);
      const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
      const maxBottom = Math.max(...bottoms);
      const gap = Math.round(footerTop - maxBottom);

      const paras = Array.from(prose.querySelectorAll('.prose-p'));
      const words = paras
        .map((el) => el.textContent)
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length;

      const isOptimal = gap >= 5 && gap <= 25 && rightSpill === 0;

      return {
        pageNum,
        words,
        gap,
        rightSpill,
        isOptimal,
        status: isOptimal
          ? '✅ OPTIMAL'
          : rightSpill > 0
            ? `❌ SPILL (+${rightSpill}px)`
            : `❌ VOID (${gap}px)`,
      };
    });
  });

  console.log('\n================ PAGE TUNING AUDIT ================');
  metrics.forEach((m) => {
    if (m.desc) {
      console.log(`Page ${String(m.pageNum).padStart(2, ' ')}: ✅ OPTIMAL (${m.desc})`);
    } else {
      console.log(
        `Page ${String(m.pageNum).padStart(2, ' ')}: ${m.status} | Words: ${m.words} | Gap: ${m.gap}px | Spill: ${m.rightSpill}px`,
      );
    }
  });
  console.log('====================================================\n');

  await browser.close();
}

testTune().catch(console.error);
