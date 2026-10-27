const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testAllKT1Lessons() {
  console.log('🚀 Auditing Weimar & Nazi Germany Key Topic 1 (Lessons 1 to 4) in Chrome...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const failedImages = [];
  page.on('response', response => {
    if (response.request().resourceType() === 'image') {
      if (response.status() >= 400) {
        failedImages.push({ url: response.url(), status: response.status() });
      }
    }
  });

  for (let lessonNum = 1; lessonNum <= 4; lessonNum++) {
    console.log(`\n--- Auditing Lesson ${lessonNum} ---`);
    const url = `http://localhost:3003/index.html?view=lessons&unit=weimar_nazi_germany&lesson=${lessonNum}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, 600));

    // Invoke viewLessonDetail if needed
    await page.evaluate((idx) => {
      if (typeof window.viewLessonDetail === 'function') {
        window.viewLessonDetail(idx);
      }
    }, lessonNum - 1);
    await new Promise(r => setTimeout(r, 600));

    // Open all source drawers to verify images
    await page.evaluate(() => {
      document.querySelectorAll('.cme-source-drawer').forEach(d => d.setAttribute('open', 'true'));
    });
    await new Promise(r => setTimeout(r, 400));

    const check = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('.lesson-narrative img, .cme-source-drawer img'));
      return imgs.map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0,
        naturalWidth: img.naturalWidth,
        alt: img.alt
      }));
    });

    console.log(`Lesson ${lessonNum}: Evaluated ${check.length} narrative & source images.`);
    const failed = check.filter(c => !c.loaded);
    if (failed.length > 0) {
      console.error(`❌ Lesson ${lessonNum} has ${failed.length} broken images:`, failed);
    } else {
      console.log(`✅ Lesson ${lessonNum}: 100% of images (${check.length}/${check.length}) loaded perfectly (naturalWidth > 0).`);
    }

    const scrPath = path.join(__dirname, '..', 'public', 'images', `weimar_kt1_l${lessonNum}_verified.png`);
    await page.screenshot({ path: scrPath, fullPage: false });
    console.log(`📸 Lesson ${lessonNum} screenshot saved: ${scrPath}`);
  }

  await browser.close();

  if (failedImages.length > 0) {
    console.warn(`Network image failures:`, failedImages);
  } else {
    console.log(`\n🎉 PERFECT AUDIT: All 4 lessons in Key Topic 1 passed with 0 HTTP image failures!`);
  }
}

testAllKT1Lessons().catch(e => {
  console.error(e);
  process.exit(1);
});
