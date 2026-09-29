const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('http://localhost:3003/?view=lessons&unit=edexcel_medicine&lesson=0', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 600));

  const el = await page.waitForSelector('.narrative-chunk');
  if (el) {
    await el.screenshot({ path: 'public/narrative_chunk_desktop.png' });
  }

  // Also measure widths
  const measurements = await page.evaluate(() => {
    const chunk = document.querySelector('.narrative-chunk');
    const paraNumber = chunk ? chunk.querySelector('.para-number') : null;
    const narrativeText = chunk ? chunk.querySelector('.narrative-text') : null;
    const audioBar = chunk ? chunk.querySelector('.read-aloud-playback-bar') : null;
    const heading = narrativeText ? narrativeText.querySelector('h3, h4, .theme-heading') : null;

    return {
      chunkWidth: chunk ? chunk.getBoundingClientRect().width : 0,
      paraNumberWidth: paraNumber ? paraNumber.getBoundingClientRect().width : 0,
      narrativeTextWidth: narrativeText ? narrativeText.getBoundingClientRect().width : 0,
      audioBarWidth: audioBar ? audioBar.getBoundingClientRect().width : 0,
      headingText: heading ? heading.innerText.trim() : null,
    };
  });

  console.log('Measurements:', measurements);

  await browser.close();
})();
