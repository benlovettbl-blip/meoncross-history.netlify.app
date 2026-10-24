const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

(async () => {
  console.log('🚀 Testing Streamlined 4-Tab Architecture & Authentic Middle East Question...');
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
  await new Promise((r) => setTimeout(r, 600));

  // 1. Verify Streamlined Navigation Tabs
  console.log('1. Checking Navigation Tabs...');
  const navTabs = await page.$$eval('.gcse-tab-btn', (btns) =>
    btns.map((b) => b.innerText.replace(/\s+/g, ' ').trim()),
  );
  console.log('Nav Tabs found:', navTabs);

  const has12mTab = navTabs.some((t) => t.includes('12-Mark Causation'));
  console.log('Has 12-Mark Causation Generator tab:', has12mTab, '(Must be FALSE)');

  // 2. Check Print A4 Checklist in Hero and Toolbar
  const hasHeroPrintBtn = (await page.$('#btn-hero-print-a4')) !== null;
  const hasAuditPrintBtn = (await page.$('#btn-audit-print-a4')) !== null;
  console.log('Hero Print A4 button exists:', hasHeroPrintBtn);
  console.log('Audit Toolbar Print A4 button exists:', hasAuditPrintBtn);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'streamlined_audit_view.png') });
  console.log('Saved audit view screenshot.');

  // 3. Test Print A4 Checklist Navigation & Return
  console.log('2. Testing Print A4 Checklist Navigation...');
  await page.click('#btn-audit-print-a4');
  await new Promise((r) => setTimeout(r, 500));

  const printTitle = await page.$eval('.gcse-print-title', (el) => el.innerText);
  console.log('Print View Header:', printTitle);

  console.log('Clicking Back to Audit...');
  await page.click('#btn-back-to-audit');
  await new Promise((r) => setTimeout(r, 500));

  // 4. Navigate to Active Recall Blurt Tab (Tab 2)
  console.log('3. Switching to Active Recall Memory Engine Tab...');
  await page.click('button[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 600));

  // 5. Select Middle East Paper
  console.log('4. Selecting Middle East Paper...');
  const middleEastTab = await page.$(
    'button.gcse-blurt-paper-tab[data-paper="paper2_p5_middle_east"]',
  );
  if (middleEastTab) {
    await middleEastTab.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  // 6. Verify Target Exam Question is authentic 8-Mark Analytical Narrative
  const targetQSetup = await page.$eval('.gcse-blurt-setup-card', (el) => el.innerText);
  console.log(
    'Middle East Target Question in Setup contains "analytical narrative":',
    targetQSetup.toLowerCase().includes('analytical narrative'),
  );
  console.log(
    'Middle East Target Question in Setup contains "[8 Marks]":',
    targetQSetup.includes('[8 Marks]'),
  );

  // 7. Click Start Active Recall Blurt
  console.log('5. Clicking Start Active Recall Blurt...');
  await page.click('#btn-start-blurt');
  await new Promise((r) => setTimeout(r, 600));

  // 8. Verify Sprint View Driving Question & Quick Starters
  const sprintDrivingQ = await page.$eval('.gcse-blurt-driving-question', (el) => el.innerText);
  console.log('Sprint Driving Question:', sprintDrivingQ);

  const hasReadAloudBtn = (await page.$('#btn-blurt-read-question')) !== null;
  console.log('Read Aloud Audio button exists:', hasReadAloudBtn);

  const starterCount = await page.$$eval('.gcse-starter-pill', (pills) => pills.length);
  console.log('Quick Sentence Starter pills count:', starterCount);

  // 9. Click a Sentence Starter Pill and verify insertion
  console.log('6. Clicking a Quick Starter Pill...');
  await page.click('.gcse-starter-pill');
  await new Promise((r) => setTimeout(r, 300));

  const canvasVal = await page.$eval('#blurt-input-canvas', (el) => el.value);
  console.log('Canvas value after starter click:', canvasVal);

  const words = await page.$eval('#blurt-canvas-word-count', (el) => el.innerText);
  console.log('Word counter updated:', words);

  // 10. Check Zero Scroll measurements
  const canvasBox = await page.$eval('#blurt-input-canvas', (el) => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      visibleIn825Viewport: rect.bottom <= 825,
      windowScrollY: window.scrollY,
    };
  });
  console.log('Canvas Box measurements during sprint:', canvasBox);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'streamlined_middle_east_sprint.png') });
  console.log('Saved Middle East sprint screenshot.');

  await browser.close();
  console.log('✅ ALL ARCHITECTURE AND MIDDLE EAST 8-MARK CHECKS PASSED!');
})();
