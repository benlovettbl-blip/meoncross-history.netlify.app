/**
 * scripts/verify_ks2_ww2_inline_rendering.cjs
 *
 * Verifies live browser rendering for all 11 lessons of ks2_ww2:
 * - Sources dumped outside narrative blocks MUST be 0
 * - Sources inside narrative blocks MUST be exactly 5
 * - Narrative visual support plates MUST be 2
 * - Broken local images MUST be 0
 */

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let allPassed = true;
  console.log('=== Starting Live Browser Verification for All 11 KS2 WW2 Lessons ===');

  for (let l = 1; l <= 11; l++) {
    const url = `http://localhost:3003/index.html?view=lessons&unit=ks2_ww2&lesson=${l}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    const check = await page.evaluate(() => {
      const main = document.getElementById('main-content');
      if (!main) return { error: 'No main-content container' };

      const narrativeBlocks = main.querySelectorAll('.standard-narrative-container');
      const narrativePlates = main.querySelectorAll('.narrative-visual-plate');
      
      let insideSourcesCount = 0;
      narrativeBlocks.forEach(b => {
        const drawers = b.querySelectorAll('.cme-source-drawer, .archival-source-box, .source-card');
        insideSourcesCount += drawers.length;
      });

      const outsideSources = main.querySelectorAll('.sources-grid .source-card, .sources-grid .cme-source-drawer');

      const allImgs = Array.from(main.querySelectorAll('img')).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth
      }));
      const localImgs = allImgs.filter(i => !i.src.includes('youtube'));
      const brokenLocal = localImgs.filter(i => i.naturalWidth === 0 || !i.complete);

      return {
        blocksCount: narrativeBlocks.length,
        platesCount: narrativePlates.length,
        insideSourcesCount: insideSourcesCount,
        outsideSourcesCount: outsideSources.length,
        localImgsCount: localImgs.length,
        brokenLocalCount: brokenLocal.length,
        brokenUrls: brokenLocal.map(b => b.src)
      };
    });

    const isSuccess =
      check.insideSourcesCount === 5 &&
      check.outsideSourcesCount === 0 &&
      check.platesCount === 2 &&
      check.brokenLocalCount === 0;

    if (!isSuccess) allPassed = false;

    const icon = isSuccess ? '✅' : '❌';
    console.log(
      `${icon} Lesson ${l.toString().padStart(2, ' ')}: ` +
      `Blocks: ${check.blocksCount} | ` +
      `Plates: ${check.platesCount}/2 | ` +
      `Sources Inline: ${check.insideSourcesCount}/5 | ` +
      `Sources Outside: ${check.outsideSourcesCount} | ` +
      `Broken Imgs: ${check.brokenLocalCount}`
    );
    if (check.brokenLocalCount > 0) {
      console.log('   Broken URLs:', check.brokenUrls);
    }
  }

  await browser.close();

  console.log('======================================================================');
  if (allPassed) {
    console.log('🎉 100% AUDIT PASS: All 11 lessons have zero dumped sources, 5 inline accordions, and 2 narrative plates!');
  } else {
    console.log('⚠️ AUDIT FAILED: Some lessons had layout or rendering issues.');
    process.exit(1);
  }
})();
