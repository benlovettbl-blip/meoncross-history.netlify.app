const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const filePath =
    'file:///' +
    path.resolve(__dirname, '../public/units/the_shoah/pupil_workbook.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  const pageDivs = await page.$$('.page');
  console.log('Total pages found:', pageDivs.length);

  let hasOverflow = false;
  for (let i = 0; i < pageDivs.length; i++) {
    const p = pageDivs[i];
    const metrics = await page.evaluate((el) => {
      return {
        id: el.id,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        overflow: el.scrollHeight - el.clientHeight,
      };
    }, p);

    const status = metrics.overflow > 1 ? '❌ OVERFLOW ' + metrics.overflow + 'px' : '✅ OK (0px)';
    console.log(
      'Page ' +
        (i + 1) +
        ' (' +
        metrics.id +
        '): clientHeight=' +
        metrics.clientHeight +
        ', scrollHeight=' +
        metrics.scrollHeight +
        ' -> ' +
        status,
    );
    if (metrics.overflow > 1) hasOverflow = true;
  }

  // Capture Page 1 screenshot to verify the Pitel family front cover visually
  const page1 = await page.$('#page-1');
  if (page1) {
    await page1.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_cover_pitel_family.png',
    });
    console.log('Saved Page 1 screenshot to shoah_cover_pitel_family.png');
  }

  // Capture Page 3 screenshot to verify uniform 7.8mm line spacing
  const page3 = await page.$('#page-3');
  if (page3) {
    await page3.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page3_lines.png',
    });
    console.log('Saved Page 3 screenshot to shoah_page3_lines.png');
  }

  // Capture Page 5 screenshot to verify right page layout with timeline mission
  const page5 = await page.$('#page-5');
  if (page5) {
    await page5.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page5_narrative.png',
    });
    console.log('Saved Page 5 screenshot to shoah_page5_narrative.png');
  }

  // Capture Page 7 screenshot to verify source utility layout
  const page7 = await page.$('#page-7');
  if (page7) {
    await page7.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page7_source.png',
    });
    console.log('Saved Page 7 screenshot to shoah_page7_source.png');
  }

  // Capture Page 9 screenshot to verify single 12-mark evaluative essay layout
  const page9 = await page.$('#page-9');
  if (page9) {
    await page9.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page9_essay.png',
    });
    console.log('Saved Page 9 screenshot to shoah_page9_essay.png');
  }

  // Capture Page 10 & 11 screenshots to verify centrefold living timeline
  const page10 = await page.$('#page-10');
  if (page10) {
    await page10.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page10_centrefold.png',
    });
    console.log('Saved Page 10 screenshot to shoah_page10_centrefold.png');
  }
  const page11 = await page.$('#page-11');
  if (page11) {
    await page11.screenshot({
      path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/shoah_page11_centrefold.png',
    });
    console.log('Saved Page 11 screenshot to shoah_page11_centrefold.png');
  }

  await browser.close();
  if (hasOverflow) {
    console.error('FAILED: One or more pages overflowed!');
    process.exit(1);
  } else {
    console.log('🎉 ALL 20 PAGES PERFECT: Exactly 0px overflow across all pages!');
  }
})();
