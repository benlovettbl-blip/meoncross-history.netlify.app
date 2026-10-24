const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 825 });
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });
  await page.click('button[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 600));

  await page.click('#btn-start-blurt');
  await new Promise((r) => setTimeout(r, 600));

  const rects = await page.evaluate(() => {
    const getR = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, left: r.left, width: r.width };
    };
    return {
      windowScrollY: window.scrollY,
      header: getR('header'),
      mainContent: getR('#main-content'),
      cockpit: getR('#gcse-blurt-active-cockpit'),
      timerBar: getR('.gcse-blurt-timer-bar'),
      questionCard: getR('.gcse-blurt-question-card'),
      ladderWrap: getR('.gcse-scaffold-ladder-wrap'),
      canvasWrap: getR('.gcse-blurt-canvas-wrap'),
      canvas: getR('#blurt-input-canvas'),
    };
  });
  console.log('Bounding Rects during sprint:', JSON.stringify(rects, null, 2));

  await browser.close();
})();
