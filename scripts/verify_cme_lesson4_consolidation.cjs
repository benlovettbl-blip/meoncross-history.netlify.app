const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3004/?view=lessons&unit=cme_new&lesson=4', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  
  // Click the Chronology Spine tab in the launchpad
  await page.evaluate(() => {
    const tabBtn = document.querySelector('button[data-tab="spine"]');
    if (tabBtn) tabBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelector('#lesson-chronology-spine')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 1: Clean collapsed baseline
  await page.screenshot({ path: 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\f641103a-363e-4a0e-9fce-e55ff461d693\\stepped_domino_1_collapsed.png' });

  // Step-by-step disclosure on Card 1 (Stage 1)
  // Click Step 1 (Action)
  await page.evaluate(() => {
    const card = document.querySelector('.cme-spine-card[data-stage="1"]');
    card?.querySelector('.cme-step-action summary')?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Click Step 2 (Motive)
  await page.evaluate(() => {
    const card = document.querySelector('.cme-spine-card[data-stage="1"]');
    card?.querySelector('.cme-step-motive summary')?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Click Step 3 (Outcome)
  await page.evaluate(() => {
    const card = document.querySelector('.cme-spine-card[data-stage="1"]');
    card?.querySelector('.cme-step-outcome summary')?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot 2: Card 1 partially revealed stepped cascade
  await page.screenshot({ path: 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\f641103a-363e-4a0e-9fce-e55ff461d693\\stepped_domino_2_card1_revealed.png' });

  // Click Toolbar "Expand All"
  await page.evaluate(() => {
    document.querySelector('.btn-toggle-all-spine-stages')?.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot 3: All cards expanded
  await page.screenshot({ path: 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\f641103a-363e-4a0e-9fce-e55ff461d693\\stepped_domino_3_all_expanded.png' });

  const result = await page.evaluate(() => {
    const cards = document.querySelectorAll('.cme-spine-card');
    const workbookQuestions = document.querySelectorAll('.cme-spine-question');
    const steps = document.querySelectorAll('.cme-domino-step');
    const copyBtn = document.querySelector('.btn-copy-spine-notes');
    return {
      cardsCount: cards.length,
      questionsCount: workbookQuestions.length,
      stepsCount: steps.length,
      hasCopyBtn: !!copyBtn
    };
  });
  console.log('Stepped Domino Result:', JSON.stringify(result, null, 2));

  await browser.close();
})();
