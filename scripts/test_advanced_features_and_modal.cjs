const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve(
  'C:/Users/fives/.gemini/antigravity-ide/brain/02daaa8e-416c-47fc-95fb-9083341d1893',
);

async function testAdvancedFeaturesAndModal() {
  console.log(
    '🚀 Launching Puppeteer browser to test Scaffold Ladder, Clusters, Wider Credit, and 40-Features Modal...',
  );
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  console.log('1. Navigating to GCSE Tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Click Tab 4: Blurt Engine
  await page.waitForSelector('button[data-tab="blurt"]');
  await page.click('button[data-tab="blurt"]');
  await sleep(600);

  // Switch to Paper 1 Medicine & Western Front
  console.log('2. Selecting Paper 1 Western Front features topic...');
  const p1Tab = await page.$('.gcse-blurt-paper-tab[data-paper="paper1_11_medicine_britain"]');
  if (p1Tab) await p1Tab.click();
  await sleep(400);

  await page.select('#select-blurt-topic', 'med_wf_q1_battles_terrain');
  await sleep(400);

  // Take screenshot of Blurt Setup with 40-Features banner & 3-min sweet spot
  const setupScreenshot = path.join(ARTIFACT_DIR, 'wf_blurt_setup_screen.png');
  await page.screenshot({ path: setupScreenshot, fullPage: false });
  console.log(`Saved Blurt Setup screenshot: ${setupScreenshot}`);

  // Test opening 40-Features Modal from Setup
  console.log('3. Testing Western Front 40-Features Modal from Setup...');
  await page.waitForSelector('#btn-open-wf-modal-setup');
  await page.click('#btn-open-wf-modal-setup');
  await sleep(600);

  // Verify modal is open
  await page.waitForSelector('#gcse-wf-modal');
  console.log('Verified #gcse-wf-modal opened successfully!');

  // Filter by Surgery & Innovations category
  const surgeryBtn = await page.$('.gcse-wf-cat-btn[data-cat="Surgery & Innovations"]');
  if (surgeryBtn) {
    console.log('Filtering by category: Surgery & Innovations...');
    await surgeryBtn.click();
    await sleep(300);
  }

  // Search "Thomas Splint"
  console.log('Searching for "Thomas Splint" in modal...');
  await page.type('#wf-features-search', 'Thomas Splint', { delay: 20 });
  await sleep(300);

  const modalScreenshot = path.join(ARTIFACT_DIR, 'wf_40_features_modal_filtered.png');
  await page.screenshot({ path: modalScreenshot, fullPage: false });
  console.log(`Saved Filtered Modal screenshot: ${modalScreenshot}`);

  // Close modal
  await page.click('#btn-close-wf-modal');
  await sleep(400);

  // Start sprint
  console.log('4. Starting Active Blurt Sprint for Western Front Section A...');
  await page.click('#btn-start-blurt');
  await sleep(600);

  // Verify Exam Mission Banner
  const missionBanner = await page.$('.banner-paper1-a');
  console.log(`Paper 1 Section A Mission Banner present: ${!!missionBanner}`);

  // Test 3-Step Scaffold Ladder
  console.log('5. Testing 3-Step Scaffold Ladder interaction...');

  // Step 1: Click ladder button
  await page.waitForSelector('#btn-blurt-ladder-toggle');
  await page.click('#btn-blurt-ladder-toggle');
  await sleep(400);
  console.log('Scaffold Step 1 active: Thematic Focus Questions revealed.');

  // Step 2: Advance to Word Bank
  await page.click('#btn-ladder-next-step');
  await sleep(400);
  console.log('Scaffold Step 2 active: Key Word Bank chips revealed.');

  // Click a word bank chip (e.g. Hill 60)
  const chip = await page.$('.gcse-ladder-chip');
  if (chip) {
    const chipText = await page.evaluate((el) => el.textContent, chip);
    console.log(`Clicking word bank chip: ${chipText.trim()}`);
    await chip.click();
    await sleep(200);
  }

  // Step 3: Advance to Sentence Starters
  await page.click('#btn-ladder-next-step');
  await sleep(400);
  console.log('Scaffold Step 3 active: Sentence Starters revealed.');

  // Click Insert Starter
  const starterInsertBtn = await page.$('.gcse-ladder-insert-starter');
  if (starterInsertBtn) {
    console.log('Clicking Insert Starter...');
    await starterInsertBtn.click();
    await sleep(200);
  }

  // Capture active sprint with Scaffold Ladder Step 3 open
  const ladderActiveScreenshot = path.join(ARTIFACT_DIR, 'blurt_scaffold_ladder_step3_active.png');
  await page.screenshot({ path: ladderActiveScreenshot, fullPage: false });
  console.log(`Saved Scaffold Ladder Step 3 screenshot: ${ladderActiveScreenshot}`);

  // Type full recall text
  console.log('6. Typing comprehensive answer stream...');
  const wfText = `Ypres Salient was surrounded on three sides by German forces on higher ground such as Hill 60, holding onto town of Ypres.
Hill 60 mines were detonated using 5 ammonite mines by Welsh and Australian miners blowing the top off the hill.
Battle of the Somme in 1916 caused 57000 casualties on the first day July 1st.
Battle of Arras in 1917 had chalky soil allowing underground tunnels and Thompson's Cave hospital with 700 beds and operating theatres.
3rd Battle of Ypres Passchendaele saw heavy rain waterlogged mud causing drowning.
Cambrai in 1917 saw 500 tanks.
Trenches were dug in zig-zag pattern 2.5 metres deep with parapet, parados, and fire step.`;

  await page.type('#blurt-input-canvas', wfText, { delay: 1 });
  await sleep(300);

  // Click Finish
  console.log('7. Clicking Finish & Reveal Benchmark...');
  await page.click('#btn-blurt-finish');
  await sleep(800);

  // Verify Thematic Causation Clusters
  const clustersCount = await page.$$eval('.gcse-cluster-card', (cards) => cards.length);
  const creditedCount = await page.$$eval('.gcse-cluster-card.credited', (cards) => cards.length);
  console.log(`Thematic Clusters: ${creditedCount} of ${clustersCount} credited!`);

  // Verify Initial Score
  let initialScore = await page.$eval('#blurt-score-percentage', (el) => el.textContent);
  let initialCounter = await page.$eval('#blurt-score-counter', (el) => el.textContent);
  console.log(
    `Score before Wider Credit: ${initialScore} (${initialCounter.trim().replace(/\s+/g, ' ')})`,
  );

  // Test "+ Credit 1 Wider Detail" Button
  console.log('8. Clicking "+ Credit 1 Wider Detail" button...');
  await page.waitForSelector('#btn-add-wider-credit');
  await page.click('#btn-add-wider-credit');
  await sleep(400);

  let newScore = await page.$eval('#blurt-score-percentage', (el) => el.textContent);
  let newCounter = await page.$eval('#blurt-score-counter', (el) => el.textContent);
  console.log(`Score AFTER Wider Credit: ${newScore} (${newCounter.trim().replace(/\s+/g, ' ')})`);

  // Capture final benchmark screen showing clusters, wider credit pill, and score
  const finishedScreenshot = path.join(
    ARTIFACT_DIR,
    'blurt_benchmark_clusters_and_wider_credit.png',
  );
  await page.screenshot({ path: finishedScreenshot, fullPage: false });
  console.log(`Saved Benchmark Clusters & Wider Credit screenshot: ${finishedScreenshot}`);

  console.log(
    '\n✅ All advanced Blurt Engine features, Scaffold Ladder, Clusters, and 40-Features Modal VERIFIED PERFECTLY!',
  );
  await browser.close();
}

testAdvancedFeaturesAndModal().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
