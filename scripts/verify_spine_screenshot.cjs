const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('http://localhost:3003/?unit=great_war&lesson=lesson_5', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Open the spine and open Stage 1 & 2 causal drawers
  await page.evaluate(() => {
    const spine = document.getElementById('lesson-chronology-spine');
    if (spine) spine.open = true;
    const drawers = document.querySelectorAll('.cme-spine-causal-drawer');
    if (drawers[0]) drawers[0].open = true;
  });

  await new Promise((r) => setTimeout(r, 1000));

  const screenshotPath = path.join(__dirname, '..', 'scratch', 'spine_verification.png');
  const spineElement = await page.$('#lesson-chronology-spine');
  if (spineElement) {
    await spineElement.screenshot({ path: screenshotPath });
    console.log('Saved spine screenshot to:', screenshotPath);
  } else {
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Spine element not found, saved page screenshot to:', screenshotPath);
  }

  await browser.close();
})();
