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

  // Open the main spine container
  await page.evaluate(() => {
    const spine = document.getElementById('lesson-chronology-spine');
    if (spine) spine.open = true;
  });

  await new Promise((r) => setTimeout(r, 800));

  const screenshotPathDefault = path.join(__dirname, '..', 'scratch', 'spine_enquiry_roadmap.png');
  const spineElement = await page.$('#lesson-chronology-spine');
  if (spineElement) {
    await spineElement.screenshot({ path: screenshotPathDefault });
    console.log('Saved default enquiry roadmap screenshot to:', screenshotPathDefault);
  }

  // Click the master "Expand All" button
  await page.evaluate(() => {
    const btn = document.querySelector('.btn-toggle-all-spine-stages');
    if (btn) btn.click();
  });

  await new Promise((r) => setTimeout(r, 800));

  const screenshotPathExpanded = path.join(__dirname, '..', 'scratch', 'spine_expanded_all.png');
  if (spineElement) {
    await spineElement.screenshot({ path: screenshotPathExpanded });
    console.log('Saved expanded all screenshot to:', screenshotPathExpanded);
  }

  await browser.close();
})();
