const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

(async () => {
  console.log('🚀 Starting Verification of Streamlined 2-Pillar GCSE Tracker...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 825 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('❌ Browser Console Error:', msg.text());
  });

  // 1. Navigate to GCSE Tracker
  console.log('Navigating to http://localhost:3003/index.html?view=gcse-tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // 2. Verify Hero Header Streamlining
  console.log('Auditing Hero Banner elements...');
  const pillCount = await page.$$eval('.gcse-badge-pill', (pills) => pills.length);
  const pillTexts = await page.$$eval('.gcse-badge-pill', (pills) =>
    pills.map((p) => p.innerText.trim()),
  );
  console.log(`Badge pill count: ${pillCount} (Pills: ${JSON.stringify(pillTexts)})`);
  if (pillCount !== 1) throw new Error(`Expected 1 badge pill, found ${pillCount}`);

  const titleText = await page.$eval('.gcse-tracker-title', (el) => el.innerText.trim());
  console.log(`Title: "${titleText}"`);
  if (!titleText.includes('Year 11 GCSE Specification Tracker'))
    throw new Error('Unexpected title');

  // Verify Western Front button removed from hero
  const heroWfBtn = await page.$('#btn-hero-wf-modal');
  console.log(`Hero Western Front 40 Features button present: ${!!heroWfBtn} (Expected: false)`);
  if (heroWfBtn) throw new Error('Western Front button still present in hero banner!');

  // Verify Overall Readiness widget present
  const readinessWidget = await page.$('.gcse-readiness-widget');
  console.log(`Readiness widget present: ${!!readinessWidget} (Expected: true)`);
  if (!readinessWidget) throw new Error('Readiness widget missing!');

  // 3. Verify Navigation Tabs (Strictly 2 tabs: Specification Audit & Active Recall Memory Engine)
  const tabBtns = await page.$$eval('.gcse-tab-btn', (btns) =>
    btns.map((b) => ({
      tab: b.getAttribute('data-tab'),
      text: b.innerText.replace(/\s+/g, ' ').trim(),
    })),
  );
  console.log(`Navigation tabs count: ${tabBtns.length}`);
  console.log('Tabs:', tabBtns);
  if (tabBtns.length !== 2) throw new Error(`Expected 2 navigation tabs, found ${tabBtns.length}`);
  if (tabBtns[0].tab !== 'audit' || tabBtns[1].tab !== 'blurt') {
    throw new Error('Tabs do not match expected [audit, blurt]');
  }

  // 4. Capture Screenshot of Tab 1 (Audit Matrix) with streamlined hero
  const snap1Path = path.join(ARTIFACT_DIR, 'streamlined_hero_and_audit.png');
  await page.screenshot({ path: snap1Path });
  console.log(`Saved screenshot: ${snap1Path}`);

  // 5. Switch to Tab 2: Active Recall Memory Engine
  console.log('Switching to Tab 2 (Active Recall Memory Engine)...');
  await page.click('.gcse-tab-btn[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 600));

  const snap2Path = path.join(ARTIFACT_DIR, 'streamlined_active_recall.png');
  await page.screenshot({ path: snap2Path });
  console.log(`Saved screenshot: ${snap2Path}`);

  console.log('✅ ALL VERIFICATION CHECKS PASSED PERFECTLY!');
  await browser.close();
})().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
