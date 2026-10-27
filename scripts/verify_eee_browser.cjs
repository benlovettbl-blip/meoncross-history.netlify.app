const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testEEE() {
  console.log('🚀 Launching Chrome to verify Early Elizabethan England live in browser...');
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

  const results = [];

  for (let lessonNum = 1; lessonNum <= 12; lessonNum++) {
    console.log(`\n--- Testing Lesson ${lessonNum} ---`);
    const url = `http://localhost:3003/index.html?view=lessons&unit=eee&lesson=${lessonNum}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));

    // Check narrative visual rows
    const visualRows = await page.$$('.narrative-visual-row');
    const narrativePlates = await page.$$('.narrative-visual-plate');
    console.log(`Lesson ${lessonNum}: Found ${visualRows.length} narrative visual rows, ${narrativePlates.length} plates`);

    // Check source drawers
    const sourceDrawers = await page.$$('.cme-source-drawer');
    console.log(`Lesson ${lessonNum}: Found ${sourceDrawers.length} source drawers`);

    // Check images inside lesson
    const imgUrls = await page.$$eval('img', imgs => imgs.map(img => img.src).filter(Boolean));
    const duplicates = imgUrls.filter((item, index) => imgUrls.indexOf(item) !== index);

    // Test expanding first source and revealing model answer
    let modelAnswerText = '';

    if (sourceDrawers.length > 0 && (lessonNum === 1 || lessonNum === 8)) {
      const firstDrawerHeader = await page.$('.cme-source-drawer:first-child .cme-source-header');
      if (firstDrawerHeader) {
        await firstDrawerHeader.click();
        await new Promise(r => setTimeout(r, 500));

        const revealBtn = await page.$('.cme-source-drawer:first-child .cme-reveal-btn, .cme-source-drawer:first-child button[onclick*="toggleCmeModelAnswer"]');
        if (revealBtn) {
          await revealBtn.click();
          await new Promise(r => setTimeout(r, 500));

          modelAnswerText = await page.evaluate(() => {
            const answerBox = document.querySelector('.cme-source-drawer:first-child .cme-model-answer-box, .cme-source-drawer:first-child .model-answer-card');
            return answerBox ? answerBox.textContent.trim().substring(0, 100) : '';
          });
        }
      }
    }

    if (lessonNum === 1 || lessonNum === 8) {
      const shotPath = path.join(__dirname, '..', 'public', 'images', `eee_lesson_${lessonNum}_preview.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`📸 Saved screenshot for Lesson ${lessonNum} to: ${shotPath}`);
    }

    results.push({
      lessonNum,
      visualRowsCount: visualRows.length,
      narrativePlatesCount: narrativePlates.length,
      sourceDrawersCount: sourceDrawers.length,
      modelAnswerSnippet: modelAnswerText,
      intraLessonDuplicates: duplicates
    });
  }

  await browser.close();

  console.log('\n=== VERIFICATION RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
  console.log('Failed images count:', failedImages.length);
  if (failedImages.length > 0) {
    console.log('Failed images:', failedImages);
  }
}

testEEE().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
