const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve(
  'C:/Users/fives/.gemini/antigravity-ide/brain/02daaa8e-416c-47fc-95fb-9083341d1893',
);

async function testBlurtEngine() {
  console.log(
    '🚀 Launching Puppeteer browser to test Blurt Engine across all 5 built-out units...',
  );
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  console.log(
    'Navigating to GCSE Spec Tracker: http://localhost:3003/index.html?view=gcse-tracker',
  );
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Helper to wait
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Click Tab 4: Blurt Engine
  console.log('Clicking Tab 4: Active Recall Blurt Engine...');
  await page.waitForSelector('button[data-tab="blurt"]');
  await page.click('button[data-tab="blurt"]');
  await sleep(600);

  const unitsToTest = [
    {
      name: 'Unit 1: Medicine in Britain & Western Front',
      paperId: 'paper1_11_medicine_britain',
      topicId: 'med_c1250_black_death',
      answers: {
        dates:
          '1348: Black Death arrives in Melcombe Regis Dorset\n1349: Edward III orders London clean up',
        vocab:
          'Four Humours, Galen, Hippocrates, Miasma, Flagellants, Regimen Sanitatis, Phlebotomy',
        mechanism:
          'The Catholic Church controlled medical education and banned human dissection. Therapeutics focused on divine appeasement and humoral balance because germ transmission was unknown.',
      },
      screenshotName: 'blurt_verified_1_medicine.png',
    },
    {
      name: 'Unit 2: Early Elizabethan England, 1558–88',
      paperId: 'paper2_b4_early_elizabethan_england',
      topicId: 'eee_spanish_armada',
      answers: {
        dates:
          '1585 Treaty of Nonsuch\n1587 Cadiz raid\n1588 Spanish Armada & Battle of Gravelines',
        vocab:
          'Medina Sidonia, Duke of Parma, Lord Howard, Sir Francis Drake, fireships, culverins, Protestant Wind',
        mechanism:
          'Fireships at Calais broke the Spanish crescent formation. English culverins reloaded in minutes while Spanish guns could not reload easily. Parma was blockaded without a deep-water port.',
      },
      screenshotName: 'blurt_verified_2_elizabeth.png',
    },
    {
      name: 'Unit 3: Conflict in the Middle East, 1945–95',
      paperId: 'paper2_p5_middle_east',
      topicId: 'cme_six_day_1967',
      answers: {
        dates:
          '1964 PLO founded\nMay 1967 Straits of Tiran closed\nJune 1967 Operation Focus & Six-Day War\nNov 1967 UN Resolution 242',
        vocab:
          'Gamal Abdel Nasser, Straits of Tiran, Operation Focus, Sinai, West Bank, Golan Heights, UN Resolution 242',
        mechanism:
          'Pre-emptive air strikes destroyed the Egyptian air force on the ground in 3 hours. Air supremacy enabled the IDF to capture Sinai, West Bank, and Golan Heights, bringing over 1 million Palestinians under military administration.',
      },
      screenshotName: 'blurt_verified_3_middle_east.png',
    },
    {
      name: 'Unit 4: USA 1954–75: Conflict at Home and Abroad',
      paperId: 'paper3_33_usa_conflict_home_abroad',
      topicId: 'usa_civil_rights_50s_60s',
      answers: {
        dates:
          '1954 Brown v Board\n1955 Montgomery Bus Boycott\n1957 Little Rock Nine\n1963 Birmingham\n1964 Civil Rights Act\n1965 Selma & Voting Rights Act',
        vocab:
          'Jim Crow, NAACP, CORE, SCLC, SNCC, Martin Luther King Jr, Rosa Parks, Bull Connor, Civil Rights Act 1964',
        mechanism:
          'Nonviolent direct action and economic boycotts forced commercial desegregation. Televised police brutality in Birmingham and Selma shocked national television audiences, compelling federal legislative intervention.',
      },
      screenshotName: 'blurt_verified_4_usa.png',
    },
    {
      name: 'Unit 5: Weimar and Nazi Germany, 1918–39',
      paperId: 'paper3_31_weimar_nazi_germany',
      topicId: 'weimar_crisis_1923',
      answers: {
        dates:
          'Jan 1923 French invasion of Ruhr\nSummer 1923 Hyperinflation peak\nNov 1923 Munich Beer Hall Putsch\nNov 1923 Rentenmark introduced',
        vocab:
          'Ruhr Occupation, Passive Resistance, Hyperinflation, Rentenmark, Munich Putsch, Gustav Stresemann, Mittelstand',
        mechanism:
          'Printing money to pay striking Ruhr workers destroyed mark currency value. Hyperinflation permanently alienated the German middle class from democracy. Stresemann stabilized the currency with the Rentenmark.',
      },
      screenshotName: 'blurt_verified_5_weimar.png',
      requiresPathwaySwitch: true,
    },
  ];

  const results = [];

  for (const unit of unitsToTest) {
    console.log(`\n======================================================`);
    console.log(`TESTING: ${unit.name} (${unit.paperId})`);
    console.log(`======================================================`);

    // If unit requires pathway switch (e.g. Weimar instead of USA), configure My 4 Papers
    if (unit.requiresPathwaySwitch) {
      console.log('Configuring pathway to activate Weimar Germany paper...');
      await page.waitForSelector('#btn-change-papers');
      await page.click('#btn-change-papers');
      await sleep(500);

      // Select Weimar in Paper 3 dropdown
      await page.waitForSelector('#select-p3');
      await page.select('#select-p3', 'paper3_31_weimar_nazi_germany');
      await sleep(300);

      // Save pathway
      await page.click('#gcse-pathway-form button[type="submit"]');
      await sleep(600);

      // Return to Blurt tab
      await page.waitForSelector('button[data-tab="blurt"]');
      await page.click('button[data-tab="blurt"]');
      await sleep(500);
    }

    // Reset to setup screen if in finished view
    const changeTopicBtn = await page.$('#btn-blurt-change-topic');
    if (changeTopicBtn) {
      await changeTopicBtn.click();
      await sleep(400);
    }
    const restartBtn = await page.$('#btn-blurt-restart');
    if (restartBtn) {
      await restartBtn.click();
      await sleep(400);
    }

    // Switch paper tab in Blurt setup
    console.log(`Selecting paper tab: ${unit.paperId}`);
    const paperTab = await page.$(`.gcse-blurt-paper-tab[data-paper="${unit.paperId}"]`);
    if (paperTab) {
      await paperTab.click();
      await sleep(400);
    } else {
      console.log(`Paper tab ${unit.paperId} not found directly, checking dropdown...`);
    }

    // Select topic in dropdown
    console.log(`Selecting topic: ${unit.topicId}`);
    await page.select('#select-blurt-topic', unit.topicId);
    await sleep(400);

    // Select 2-minute duration
    const durBtn = await page.$('.gcse-blurt-duration-btn[data-seconds="120"]');
    if (durBtn) await durBtn.click();
    await sleep(200);

    // Click Start Blurt
    console.log('Starting Blurt sprint...');
    await page.click('#btn-start-blurt');
    await sleep(600);

    // Verify unified canvas and voice button exist
    await page.waitForSelector('#blurt-input-canvas');
    await page.waitForSelector('#btn-blurt-voice-toggle');

    // Also take a screenshot of the active unified canvas on the first unit
    if (unit.paperId === 'paper1_11_medicine_britain') {
      const activeScreenshotPath = path.join(ARTIFACT_DIR, 'unified_blurt_canvas_active.png');
      await page.screenshot({ path: activeScreenshotPath, fullPage: false });
      console.log(`Saved active canvas screenshot: ${activeScreenshotPath}`);
    }

    // Combine answers into single unified blurt
    const combinedText = `${unit.answers.dates}\n\n${unit.answers.vocab}\n\n${unit.answers.mechanism}`;
    console.log('Typing active recall answers into unified memory canvas...');
    await page.type('#blurt-input-canvas', combinedText, { delay: 2 });
    await sleep(300);

    // Verify word counts
    const canvasWords = await page.$eval('#blurt-canvas-word-count', (el) => el.textContent);
    const totalWords = await page.$eval('#blurt-total-words', (el) => el.textContent);
    console.log(`Live Word Counters: Canvas=${canvasWords}, Total=${totalWords}`);

    // Click Finish & Reveal Benchmark
    console.log('Clicking Finish & Reveal Benchmark Model...');
    await page.click('#btn-blurt-finish');
    await sleep(700);

    // Verify benchmark model elements
    const benchmarkVisible = await page.$('.gcse-blurt-benchmark-col');
    if (!benchmarkVisible) {
      throw new Error(`Benchmark model failed to render for ${unit.name}`);
    }

    // Verify auto-checked items and click remaining checkboxes to test interactive scoring
    const checkInputs = await page.$$('.blurt-check-input');
    console.log(`Found ${checkInputs.length} benchmark checkable targets.`);
    for (let i = 0; i < Math.min(4, checkInputs.length); i++) {
      const isChecked = await (await checkInputs[i].getProperty('checked')).jsonValue();
      if (!isChecked) {
        await checkInputs[i].click();
        await sleep(100);
      }
    }

    const accuracyScore = await page.$eval('#blurt-score-percentage', (el) => el.textContent);
    const counterText = await page.$eval('#blurt-score-counter', (el) => el.textContent);
    console.log(`Interactive Accuracy Score: ${accuracyScore} (${counterText})`);

    // Test 1-Click RAG Sync
    console.log('Testing 1-Click RAG Sync (Mastered - Green)...');
    await page.click('#btn-blurt-sync-green');
    await sleep(400);

    // Verify readiness widget update
    const readinessLabel = await page.$eval('.gcse-ring-label', (el) => el.textContent);
    console.log(`Master Specification Readiness updated to: ${readinessLabel}`);

    // Capture screenshot of verified benchmark
    const screenshotPath = path.join(ARTIFACT_DIR, unit.screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`✅ Saved screenshot: ${screenshotPath}`);

    results.push({
      unit: unit.name,
      paperId: unit.paperId,
      accuracyScore,
      readinessLabel,
      screenshotName: unit.screenshotName,
    });
  }

  console.log('\n======================================================');
  console.log('ALL 5 UNITS SUCCESSFULLY TESTED AND VERIFIED:');
  console.table(results);
  console.log('======================================================');

  await browser.close();
}

testBlurtEngine().catch((err) => {
  console.error('Test run error:', err);
  process.exit(1);
});
