const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

(async () => {
  console.log('🚀 Starting Comprehensive Verification of Active Recall Memory Engine...');
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

  // 1. Navigate to GCSE Tracker with active recall tab
  console.log('Navigating to http://localhost:3003/index.html?view=gcse-tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // 2. Click Tab 2: Active Recall Memory Engine
  console.log('Clicking Tab 2 (Active Recall Memory Engine)...');
  await page.waitForSelector('.gcse-tab-btn[data-tab="blurt"]');
  await page.click('.gcse-tab-btn[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 800));

  // 3. Verify Decluttering & Zero Timers
  console.log('Verifying decluttering in Setup View...');
  const durationBtnsCount = await page.$$eval('.gcse-blurt-duration-btn', (el) => el.length);
  console.log(`Duration buttons count: ${durationBtnsCount} (Expected: 0)`);
  if (durationBtnsCount !== 0) throw new Error('Failed: Duration buttons still exist in DOM!');

  const step2TextExists = await page.evaluate(() =>
    document.body.innerText.includes('Step 2: Choose Your Time Pressure'),
  );
  console.log(`"Step 2: Choose Your Time Pressure" present: ${step2TextExists} (Expected: false)`);
  if (step2TextExists) throw new Error('Failed: Step 2 text still present!');

  const podsExist = await page.evaluate(() => {
    return (
      document.body.innerText.includes('Pod 1: Chronological Anchors') ||
      document.body.innerText.includes('Pod 2: Individuals & Tier-3 Vocab') ||
      document.body.innerText.includes('Pod 3: Decisive Historical Mechanism')
    );
  });
  console.log(`Pedagogical Pod cards present: ${podsExist} (Expected: false)`);
  if (podsExist) throw new Error('Failed: Pod cards still present in setup view!');

  // 4. Test Paper Switching & Topic Counts across all 4 papers
  console.log('Auditing paper tabs and topic dropdowns...');

  // Medicine
  const medTopics = await page.$$eval('#select-blurt-topic option', (opts) =>
    opts.map((o) => o.text.trim()),
  );
  console.log(`Paper 1 Medicine topics (${medTopics.length}):`, medTopics.slice(0, 3));
  if (medTopics.length < 5) throw new Error('Medicine topic count unexpectedly low!');

  // Early Elizabethan England
  console.log('Switching to Early Elizabethan England...');
  await page.click('.gcse-blurt-paper-tab[data-paper="paper2_b4_early_elizabethan_england"]');
  await new Promise((r) => setTimeout(r, 500));
  const eeeTopics = await page.$$eval('#select-blurt-topic option', (opts) =>
    opts.map((o) => o.text.trim()),
  );
  console.log(`Paper 2 Elizabethan England topics (${eeeTopics.length}):`, eeeTopics);
  if (eeeTopics.length !== 4)
    throw new Error(`Expected 4 Elizabethan topics, got ${eeeTopics.length}`);

  // Middle East
  console.log('Switching to Conflict in the Middle East (P5)...');
  await page.click('.gcse-blurt-paper-tab[data-paper="paper2_p5_middle_east"]');
  await new Promise((r) => setTimeout(r, 500));
  const cmeTopics = await page.$$eval('#select-blurt-topic option', (opts) =>
    opts.map((o) => o.text.trim()),
  );
  console.log(`Paper 2 Middle East topics (${cmeTopics.length}):`, cmeTopics);
  if (cmeTopics.length !== 6)
    throw new Error(`Expected 6 Middle East topics, got ${cmeTopics.length}`);

  // Capture Screenshot of Streamlined Setup with Middle East selected
  const setupPicPath = path.join(__dirname, '../public/memory_engine_setup_verified.png');
  await page.screenshot({ path: setupPicPath, fullPage: false });
  const artifactSetupPath = path.join(ARTIFACT_DIR, 'memory_engine_setup_verified.png');
  fs.copyFileSync(setupPicPath, artifactSetupPath);
  console.log(`📸 Setup screenshot captured at ${setupPicPath} and ${artifactSetupPath}`);

  // 5. Test Selecting Topic 2: The Suez Crisis (1956)
  console.log('Selecting Topic 2: The Suez Crisis (1956)...');
  await page.select('#select-blurt-topic', 'cme_suez_crisis_1956');
  await new Promise((r) => setTimeout(r, 500));

  // Verify Driving Question & Mission Guidance for Suez
  const drivingQ = await page.$eval('.gcse-blurt-setup-card h3', (el) => el.textContent.trim());
  console.log(`Driving Question: "${drivingQ}"`);
  if (!drivingQ.includes('Explain two consequences of the Suez Crisis (1956). [8 Marks]')) {
    throw new Error(`Unexpected driving question for Suez: ${drivingQ}`);
  }

  // 6. Launch Active Practice Session
  console.log('Launching Active Recall Practice...');
  await page.click('#btn-start-blurt');
  await new Promise((r) => setTimeout(r, 600));

  // Check Active Session DOM
  const clockDigitsExist = await page.$('#blurt-timer-digits');
  console.log(`Timer countdown digits present: ${!!clockDigitsExist} (Expected: false)`);
  if (clockDigitsExist) throw new Error('Timer digits should NOT exist in active session!');

  const pauseBtnExist = await page.$('#btn-blurt-pause');
  console.log(`Pause button present: ${!!pauseBtnExist} (Expected: false)`);
  if (pauseBtnExist) throw new Error('Pause button should NOT exist in untimed session!');

  const modePillText = await page.$eval('.gcse-blurt-mode-pill', (el) => el.textContent.trim());
  console.log(`Mode pill text: "${modePillText}"`);
  if (!modePillText.includes('Free Recall Practice') || !modePillText.includes('Untimed')) {
    throw new Error('Mode pill text missing Free Recall or Untimed designation!');
  }

  // Test Quick Starter click
  console.log('Testing Quick Starters pill...');
  await page.click('.gcse-starter-pill[data-starter="One major factor was"]');
  let canvasVal = await page.$eval('#blurt-input-canvas', (el) => el.value);
  console.log(`Canvas value after quick starter click: "${canvasVal}"`);
  if (!canvasVal.includes('One major factor was'))
    throw new Error('Quick starter failed to insert into canvas!');

  // Test Scaffold Ladder
  console.log('Testing Scaffold Ladder ("🪜 Need a Hint?")...');
  await page.click('#btn-blurt-ladder-toggle');
  await new Promise((r) => setTimeout(r, 300));
  const step1Text = await page.$eval('.gcse-ladder-drawer', (el) => el.textContent);
  console.log(
    `Scaffold step 1 questions rendered: ${step1Text.includes('Why did President Gamal Abdel Nasser nationalise')}`,
  );

  // Advance to Step 2: Word Bank
  await page.click('#btn-ladder-next-step');
  await new Promise((r) => setTimeout(r, 300));
  const chipCount = await page.$$eval('.gcse-ladder-chip', (el) => el.length);
  console.log(`Step 2 Word Bank chips rendered: ${chipCount}`);
  if (chipCount === 0) throw new Error('Word bank chips not rendered in Step 2!');

  // Click a word bank chip to insert
  await page.click('.gcse-ladder-chip');
  canvasVal = await page.$eval('#blurt-input-canvas', (el) => el.value);
  console.log(`Canvas value after word bank chip: "${canvasVal.slice(0, 60)}..."`);

  // Type authentic recall text
  console.log('Typing student recall paragraph...');
  const studentRecall = `
One consequence of the Suez Crisis in 1956 was the humiliation of Britain and France as global powers. Anthony Eden ordered troops into Egypt following the Protocol of Sèvres collusion, but Dwight D. Eisenhower threatened to collapse the British pound sterling and cut off emergency oil. This forced Britain and France to withdraw, proving European imperial powers could no longer act without superpower approval.

A second consequence was the massive rise in prestige for Gamal Abdel Nasser across the Arab world. Nasser kept control of the nationalised Suez Canal Company and became the undisputed hero of Pan-Arabism. The United Nations deployed UNEF peacekeepers in the Sinai Peninsula to guarantee Israeli shipping through the Straits of Tiran, while the Soviet Union financed the Aswan High Dam.
  `.trim();

  await page.$eval(
    '#blurt-input-canvas',
    (el, text) => {
      el.value = text;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    },
    studentRecall,
  );

  const wordCount = await page.$eval('#blurt-canvas-word-count', (el) => el.textContent.trim());
  console.log(`Live canvas word count: ${wordCount}`);

  // Capture Screenshot of Active Practice Session
  const activePicPath = path.join(__dirname, '../public/memory_engine_active_verified.png');
  await page.screenshot({ path: activePicPath, fullPage: false });
  const artifactActivePath = path.join(ARTIFACT_DIR, 'memory_engine_active_verified.png');
  fs.copyFileSync(activePicPath, artifactActivePath);
  console.log(
    `📸 Active session screenshot captured at ${activePicPath} and ${artifactActivePath}`,
  );

  // 7. Finish & Benchmark Recall
  console.log('Clicking "Finish & Benchmark Recall"...');
  await page.click('#btn-blurt-finish');
  await new Promise((r) => setTimeout(r, 600));

  // Verify Benchmark Screen
  const scorePercent = await page.$eval('#blurt-score-percentage', (el) => el.textContent.trim());
  const scoreCounter = await page.$eval('#blurt-score-counter', (el) => el.textContent.trim());
  console.log(`Benchmark Score: ${scorePercent} (${scoreCounter})`);

  const factorsCredited = await page.$$eval('.gcse-cluster-card.credited', (el) => el.length);
  console.log(`Thematic Causation Clusters credited: ${factorsCredited} of 2`);
  if (factorsCredited < 2) throw new Error('Expected both thematic clusters to be credited!');

  // Verify RAG Sync buttons
  console.log('Testing RAG Sync to Specification Matrix...');
  await page.click('#btn-blurt-sync-green');
  await new Promise((r) => setTimeout(r, 500));
  const syncBanner = await page.$eval('.gcse-blurt-sync-card', (el) => el.textContent);
  console.log(
    `Sync card response confirmed: ${syncBanner.includes('Mastered') || syncBanner.includes('synchronized')}`,
  );

  // Capture Screenshot of Evaluation Screen
  const evalPicPath = path.join(__dirname, '../public/memory_engine_eval_verified.png');
  await page.screenshot({ path: evalPicPath, fullPage: false });
  const artifactEvalPath = path.join(ARTIFACT_DIR, 'memory_engine_eval_verified.png');
  fs.copyFileSync(evalPicPath, artifactEvalPath);
  console.log(`📸 Evaluation screenshot captured at ${evalPicPath} and ${artifactEvalPath}`);

  console.log('✅ ALL TESTS PASSED TO PERFECTION!');
  await browser.close();
})();
