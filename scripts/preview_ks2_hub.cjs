const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const url =
    'file:///' + path.resolve(__dirname, '../public/units/ks2_ww2/index.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Screenshot top of page
  await page.screenshot({ path: path.resolve(__dirname, '../public/hub_preview_top.png') });

  // 2. Scroll to lessons grid
  await page.evaluate(() => window.scrollBy(0, 750));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.resolve(__dirname, '../public/hub_preview_cards.png') });

  // 3. Test opening video modal for Lesson 1, Video 1
  await page.evaluate(() => openVideoModal(1, 0));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.resolve(__dirname, '../public/hub_preview_video_modal.png') });

  // 4. Close video modal and open Teacher Guidance modal for Lesson 1
  await page.evaluate(() => {
    closeVideoModal();
    openTeacherGuidanceModal(1);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.resolve(__dirname, '../public/hub_preview_teacher_modal.png'),
  });

  console.log('✅ All 4 hub screenshots captured successfully!');
  await browser.close();
})();
