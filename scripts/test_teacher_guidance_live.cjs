const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Launching browser to test Teacher Guidance modal...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to lesson 2...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=2', {
    waitUntil: 'networkidle2',
  });

  // Open modal
  console.log('Opening Teacher Guidance modal for Lesson 2...');
  await page.evaluate(() => {
    if (window.openKs2TeacherGuidanceModal) {
      window.openKs2TeacherGuidanceModal('lesson_2');
    } else {
      const btn = document.querySelector('.btn-ks2-teacher-launcher');
      if (btn) btn.click();
    }
  });

  await new Promise((r) => setTimeout(r, 600));

  // Verify modal is visible
  const modalExists = await page.evaluate(() => {
    const el = document.getElementById('ks2TeacherGuidanceModalOverlay');
    return el !== null && window.getComputedStyle(el).display !== 'none';
  });
  console.log('Modal exists and visible:', modalExists);

  // Tab 1: At a Glance screenshot
  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  await page.screenshot({ path: path.join(screenshotDir, 'tg_tab1_glance.png') });
  console.log('Saved tg_tab1_glance.png');

  // Click Tab 2: Subject Knowledge Primer
  console.log('Switching to Tab 2: Primer...');
  await page.evaluate(() => {
    const tab = document.querySelector('.tg-tab[data-target="tg-primer"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'tg_tab2_primer.png') });
  console.log('Saved tg_tab2_primer.png');

  // Click Tab 3: Misconceptions & Discussion
  console.log('Switching to Tab 3: Misconceptions & Hinge Discussion...');
  await page.evaluate(() => {
    const tab = document.querySelector('.tg-tab[data-target="tg-misconceptions"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'tg_tab3_misconceptions.png') });
  console.log('Saved tg_tab3_misconceptions.png');

  // Click Tab 4: Worksheet Answer Key & WAGOLL
  console.log('Switching to Tab 4: Answer Key & WAGOLL...');
  await page.evaluate(() => {
    const tab = document.querySelector('.tg-tab[data-target="tg-answers"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'tg_tab4_answers.png') });
  console.log('Saved tg_tab4_answers.png');

  // Scroll down in Tab 4 to capture Task 5 WAGOLL
  await page.evaluate(() => {
    const sec = document.getElementById('tg-answers');
    if (sec && sec.parentElement) {
      sec.parentElement.scrollTop = sec.parentElement.scrollHeight;
    }
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'tg_tab4_answers_scrolled.png') });
  console.log('Saved tg_tab4_answers_scrolled.png');

  // Extract tasks rendered in Tab 4
  const answersContent = await page.evaluate(() => {
    const sec = document.getElementById('tg-answers');
    if (!sec) return null;
    const taskHeaders = Array.from(sec.querySelectorAll('h4')).map((h) => h.innerText.trim());
    const wagoll = sec.querySelector('p[style*="font-style: italic"]')?.innerText || '';
    return { taskHeaders, wagoll: wagoll.substring(0, 100) + '...' };
  });
  console.log('Tab 4 Content Summary:', JSON.stringify(answersContent, null, 2));

  // Test lesson dropdown change
  console.log('Testing dropdown change to Lesson 1...');
  await page.evaluate(() => {
    const sel = document.getElementById('guidanceLessonSelect');
    if (sel) {
      sel.value = 'lesson_1';
      sel.dispatchEvent(new Event('change'));
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  // Click Tab 4 on Lesson 1
  await page.evaluate(() => {
    const tab = document.querySelector('.tg-tab[data-target="tg-answers"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'tg_lesson1_tab4_answers.png') });
  console.log('Saved tg_lesson1_tab4_answers.png');

  const lesson1Content = await page.evaluate(() => {
    const title = document.querySelector('#ks2TeacherGuidanceModalOverlay h2')?.innerText || '';
    const sec = document.getElementById('tg-answers');
    const taskHeaders = sec
      ? Array.from(sec.querySelectorAll('h4')).map((h) => h.innerText.trim())
      : [];
    return { title, taskHeaders };
  });
  console.log('Lesson 1 Content:', JSON.stringify(lesson1Content, null, 2));

  await browser.close();
  console.log('Live validation completed successfully!');
})();
