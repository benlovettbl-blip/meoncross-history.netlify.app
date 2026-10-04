const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  console.log('Navigating to CME Lesson 7 (Six-Day War)...');
  await page.goto('http://localhost:3003/?unit=cme_new&lesson=7', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Verify Hero Jump Button
  const heroJumpBtn = await page.$('.btn-causal-spine-jump');
  console.log('Hero jump button exists:', !!heroJumpBtn);
  if (heroJumpBtn) {
    await heroJumpBtn.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  // 2. Expand all causal drawers
  const toggleBtn = await page.$('#btn-toggle-all-causal');
  console.log('Toggle Causal Analysis button exists:', !!toggleBtn);
  if (toggleBtn) {
    await toggleBtn.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  // Take screenshot of expanded causal analysis
  const spineEl = await page.$('#lesson-chronology-spine');
  if (spineEl) {
    await spineEl.screenshot({
      path: path.join(__dirname, '../public/images/test_cme_spine_expanded.png'),
    });
    console.log('Saved test_cme_spine_expanded.png');
  }

  // 3. Test Self-Quiz Mode toggle
  const quizBtn = await page.$('#btn-cme-quiz-mode');
  console.log('Self-Quiz Mode button exists:', !!quizBtn);
  if (quizBtn) {
    await quizBtn.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  if (spineEl) {
    await spineEl.screenshot({
      path: path.join(__dirname, '../public/images/test_cme_spine_quiz_active.png'),
    });
    console.log('Saved test_cme_spine_quiz_active.png');
  }

  // 4. Test clicking a masked item
  const firstMask = await page.$('.cme-quiz-target');
  if (firstMask) {
    await firstMask.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  if (spineEl) {
    await spineEl.screenshot({
      path: path.join(__dirname, '../public/images/test_cme_spine_quiz_revealed_one.png'),
    });
    console.log('Saved test_cme_spine_quiz_revealed_one.png');
  }

  await browser.close();
  console.log('Interaction testing successfully completed!');
})();
