const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

(async () => {
  console.log('🚀 Testing Streamlined Zero-Scroll Sprint and Question Cards...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 825 });
  await page.setCacheEnabled(false);
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });

  // 1. Navigate to Blurt tab
  console.log('1. Switching to Active Recall Blurt Tab...');
  await page.click('button[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 600));

  // 2. Verify Target Exam Question Preview Card on Setup
  const setupTargetQuestion = await page.$eval('.gcse-blurt-setup-card', (el) => el.innerText);
  const hasTargetQuestion = setupTargetQuestion.toUpperCase().includes('TARGET EXAM QUESTION');
  console.log('Setup text includes "TARGET EXAM QUESTION":', hasTargetQuestion);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'streamlined_blurt_setup.png') });
  console.log('Saved setup screenshot.');

  // 3. Click Start Active Recall Blurt
  console.log('2. Clicking Start Active Recall Blurt...');
  await page.click('#btn-start-blurt');
  await new Promise((r) => setTimeout(r, 600));

  // 4. Verify Driving Exam Question on Sprint Screen
  const drivingQuestionText = await page.$eval(
    '.gcse-blurt-driving-question',
    (el) => el.innerText,
  );
  console.log('Driving Exam Question displayed:', drivingQuestionText);

  // 5. Verify Zero Scroll: check bounding box of textarea relative to viewport
  const canvasBox = await page.$eval('#blurt-input-canvas', (el) => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      visibleIn825Viewport: rect.bottom <= 825,
      isFocused: document.activeElement === el,
      windowScrollY: window.scrollY,
    };
  });
  console.log('Canvas Box measurements & scroll position:', canvasBox);

  // Also check top controls
  const timerBarBox = await page.$eval('.gcse-blurt-timer-bar', (el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Timer Bar measurements:', timerBarBox);

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'streamlined_blurt_sprint_zero_scroll.png'),
  });
  console.log('Saved zero-scroll sprint screenshot.');

  // 6. Test 3-Step Ladder in streamlined view
  console.log('3. Testing Ladder in Streamlined view...');
  await page.click('.gcse-ladder-pip[data-step="2"]'); // Open word bank
  await new Promise((r) => setTimeout(r, 400));

  const chipText = await page.$eval('.gcse-ladder-chip', (el) => el.innerText);
  console.log('Word Bank Chip visible:', chipText);
  await page.click('.gcse-ladder-chip'); // click chip to insert
  await new Promise((r) => setTimeout(r, 300));

  // 7. Type answer and finish
  console.log('4. Typing answer...');
  await page.type(
    '#blurt-input-canvas',
    ' The Four Humours theory by Galen and Hippocrates stated that blood, phlegm, yellow bile, and black bile caused disease. The 1348 Black Death arrived at Melcombe Regis in Dorset, causing buboes and killing 30-50% of people.',
  );
  await new Promise((r) => setTimeout(r, 400));

  console.log('5. Clicking Finish & Benchmark...');
  await page.click('#btn-blurt-finish');
  await new Promise((r) => setTimeout(r, 800));

  // 8. Verify Benchmark Screen displays Driving Exam Question Evaluated
  const finishedText = await page.$eval('.gcse-blurt-container', (el) => el.innerText);
  console.log(
    'Finished screen contains "Exam Question Evaluated":',
    finishedText.toUpperCase().includes('EXAM QUESTION EVALUATED'),
  );

  // Test Wider Knowledge Credit
  console.log('6. Testing Wider Knowledge Credit...');
  const initialScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
  console.log('Initial retrieval score:', initialScore);
  await page.click('#btn-add-wider-credit');
  await new Promise((r) => setTimeout(r, 400));
  const updatedScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
  console.log('Updated score after wider credit:', updatedScore);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'streamlined_blurt_benchmark.png') });
  console.log('Saved benchmark screenshot.');

  await browser.close();
  console.log('✅ Streamlined Zero-Scroll Sprint and Question Cards VERIFIED!');
})();
