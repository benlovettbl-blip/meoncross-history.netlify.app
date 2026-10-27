const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'images', 'verification');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,950']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });

  console.log('Navigating to homepage: http://localhost:3003/...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Launching USA unit via window.launchSubApp("usa")...');
  await page.evaluate(() => {
    if (window.launchSubApp) window.launchSubApp('usa');
  });
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot 1: USA Unit Launchpad
  await page.screenshot({ path: path.join(screenshotsDir, 'usa_launchpad.png'), fullPage: false });
  console.log('Captured: usa_launchpad.png');

  // Click on Lesson 1.1 card
  console.log('Clicking Lesson 1.1 card...');
  const lesson1Card = await page.$('.homepage-lesson-card[data-index="0"]');
  if (lesson1Card) {
    await lesson1Card.click();
    await new Promise(r => setTimeout(r, 2000));
  } else {
    console.log('Calling renderLessonDetail(0) directly in page context...');
    await page.evaluate(() => {
      if (window.renderLessonDetail) window.renderLessonDetail(0);
    });
    await new Promise(r => setTimeout(r, 2000));
  }

  // Check source drawers in Lesson 1.1
  const drawers = await page.$$('.archival-drawer, .cme-source-drawer, details.gcse-source-container');
  console.log(`Found ${drawers.length} archival source drawers in Lesson 1.1`);
  if (drawers.length > 0) {
    await drawers[0].click();
    await new Promise(r => setTimeout(r, 600));
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'usa_lesson_1_1_verified.png'), fullPage: false });
  console.log('Captured: usa_lesson_1_1_verified.png');

  // Return to launchpad and navigate to Lesson 3.3
  console.log('Navigating to Lesson 3.3 (Vietnam War Tactics)...');
  await page.evaluate(() => {
    if (window.launchSubApp) window.launchSubApp('usa');
  });
  await new Promise(r => setTimeout(r, 1500));

  const allCards = await page.$$('.homepage-lesson-card');
  console.log(`Found ${allCards.length} lesson cards on launchpad`);
  if (allCards.length > 10) {
    await allCards[10].click();
    await new Promise(r => setTimeout(r, 2000));
  }

  const drawersL3 = await page.$$('.archival-drawer, .cme-source-drawer, details.gcse-source-container');
  console.log(`Found ${drawersL3.length} archival source drawers in Lesson 3.3`);
  if (drawersL3.length > 0) {
    await drawersL3[0].click();
    await new Promise(r => setTimeout(r, 600));
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'usa_lesson_3_3_verified.png'), fullPage: false });
  fs.copyFileSync(path.join(screenshotsDir, 'usa_lesson_3_3_verified.png'), 'C:/Users/fives/.gemini/antigravity-ide/brain/d7cef477-15ab-4ae1-8738-8fab235bf2b2/usa_lesson_3_3_verified.png');
  console.log('Captured: usa_lesson_3_3_verified.png');

  await browser.close();
  console.log('Browser visual verification complete!');
})();
