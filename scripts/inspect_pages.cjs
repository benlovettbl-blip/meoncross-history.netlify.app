const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  const htmlPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'great_war_part2',
    'textbook_PUBLISHER.html',
  );
  await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.evaluateHandle('document.fonts.ready');

  const pageEls = await page.$$('.textbook-page');
  const tempDir = path.join(__dirname, '..', '.temp_screenshots');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  for (let i = 0; i < Math.min(6, pageEls.length); i++) {
    await pageEls[i].screenshot({ path: path.join(tempDir, `page_${i + 1}.png`) });
    console.log(`Saved page_${i + 1}.png`);
  }

  // Also screenshot great_war part 1
  const gw1Path = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'great_war',
    'textbook_PUBLISHER.html',
  );
  if (fs.existsSync(gw1Path)) {
    await page.goto(require('url').pathToFileURL(gw1Path).href, { waitUntil: 'load' });
    await page.evaluateHandle('document.fonts.ready');
    const gw1Pages = await page.$$('.textbook-page');
    if (gw1Pages[1])
      await gw1Pages[1].screenshot({ path: path.join(tempDir, 'gw_part1_page_2.png') });
    if (gw1Pages[2])
      await gw1Pages[2].screenshot({ path: path.join(tempDir, 'gw_part1_page_3.png') });
    console.log('Saved gw_part1_page_2.png and gw_part1_page_3.png');
  }

  // Inspect vertical distribution of elements on page 2 and page 3
  const layoutAnalysis = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.textbook-page')).map((p, idx) => {
      const pRect = p.getBoundingClientRect();
      const colSides = Array.from(p.querySelectorAll('.col-side')).map((cs) => {
        const csRect = cs.getBoundingClientRect();
        const topGroup = cs.querySelector('.col-top-group');
        const bottomBox = cs.querySelector(
          '.archival-source-box, .key-figure-box, .concept-spotlight-box',
        );
        const tgRect = topGroup ? topGroup.getBoundingClientRect() : null;
        const bbRect = bottomBox ? bottomBox.getBoundingClientRect() : null;
        const gap = tgRect && bbRect ? bbRect.top - tgRect.bottom : null;
        return {
          colHeight: csRect.height,
          topGroupHeight: tgRect ? tgRect.height : 0,
          bottomBoxHeight: bbRect ? bbRect.height : 0,
          gapBetween: gap,
        };
      });
      return {
        page: idx + 1,
        pageHeight: pRect.height,
        colSides,
      };
    });
  });

  console.log('Layout Analysis:');
  console.log(JSON.stringify(layoutAnalysis.slice(1, 5), null, 2));

  await browser.close();
})();
