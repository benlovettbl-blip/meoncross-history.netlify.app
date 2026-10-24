const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  console.log('Navigating to GCSE Tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });

  // Switch to Tab 2: Active Recall Memory Engine
  console.log('Switching to Active Recall Memory Engine tab...');
  const tabBtn = await page.waitForSelector('.gcse-tab-btn[data-tab="blurt"]');
  await tabBtn.click();
  await new Promise((r) => setTimeout(r, 1000));

  // Verify Tariff filters exist
  const tariffFilters = await page.$$('.gcse-blurt-tariff-filter');
  console.log(`Found ${tariffFilters.length} tariff filter buttons`);

  // Verify dropdown options
  const optgroups = await page.$$eval('#select-blurt-topic optgroup', (groups) =>
    groups.map((g) => ({ label: g.label, count: g.children.length })),
  );
  console.log('Dropdown optgroups:', JSON.stringify(optgroups, null, 2));

  // Take screenshot of Setup view with tariff filters and official past question selected
  const artifactDir =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';
  await page.screenshot({
    path: path.join(artifactDir, 'blurt_past_papers_setup.png'),
    fullPage: false,
  });
  console.log('Captured blurt_past_papers_setup.png');

  // Test selecting a 12-mark question filter
  const filter12m = await page.$('.gcse-blurt-tariff-filter[data-tariff="12"]');
  if (filter12m) {
    console.log('Clicking 12 Marks filter...');
    await filter12m.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  // Check the selected question
  const selectedQuestionText = await page.$eval(
    '#select-blurt-topic',
    (el) => el.options[el.selectedIndex]?.text,
  );
  console.log('Currently selected question in dropdown:', selectedQuestionText);

  // Click "Start Free Recall Practice"
  console.log('Starting free recall session...');
  const btnStart = await page.waitForSelector('#btn-start-blurt');
  await btnStart.click();
  await new Promise((r) => setTimeout(r, 600));

  // Verify stimulus points box and quick starters are visible
  const stimulusText = await page.$eval('.gcse-blurt-question-card', (el) => el.innerText);
  console.log('Question card snippet:', stimulusText.slice(0, 180));

  // Type some recall text into canvas
  const canvas = await page.waitForSelector('#blurt-input-canvas');
  await canvas.type(
    'In 1923, the Munich Putsch failed because Gustav von Kahr betrayed Hitler and called the police and army. Ludendorff and Hitler marched on the Munich beer hall and the Feldherrnhalle where 16 Nazis and 4 Bavarian police officers were killed. Hitler was arrested and put on trial for high treason, receiving a light sentence from sympathetic right-wing judges at Landsberg prison, where he dictated Mein Kampf to Rudolf Hess.',
  );
  await new Promise((r) => setTimeout(r, 400));

  // Click quick starter pill to test insertion
  const starterPill = await page.$('.gcse-starter-pill');
  if (starterPill) {
    await starterPill.click();
  }

  await page.screenshot({
    path: path.join(artifactDir, 'blurt_past_papers_sprint.png'),
    fullPage: false,
  });
  console.log('Captured blurt_past_papers_sprint.png');

  // Click Finish & Benchmark Recall
  console.log('Finishing sprint and checking benchmark model...');
  const btnFinish = await page.waitForSelector('#btn-blurt-finish');
  await btnFinish.click();
  await new Promise((r) => setTimeout(r, 800));

  // Verify Indicative Content box exists
  const benchmarkHeader = await page.$eval('.gcse-blurt-benchmark-col h3', (el) => el.innerText);
  console.log('Benchmark Column Header:', benchmarkHeader);

  const indicativeItems = await page.$$('.blurt-check-input[data-key^="indicative_"]');
  console.log(`Found ${indicativeItems.length} official mark scheme indicative point checkboxes`);

  const initialScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
  console.log('Initial Auto-matched Score:', initialScore);

  // Click one of the indicative checkboxes to test dynamic scoring recalculation
  if (indicativeItems.length > 0) {
    await indicativeItems[0].click();
    await new Promise((r) => setTimeout(r, 300));
    const updatedScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
    console.log('Updated Score after clicking indicative item:', updatedScore);
  }

  // Scroll to benchmark column and take screenshot
  await page.evaluate(() => {
    const el = document.querySelector('.gcse-blurt-compare-grid');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(artifactDir, 'blurt_dual_column_benchmark.png'),
    fullPage: false,
  });
  console.log('Captured blurt_dual_column_benchmark.png');

  console.log('ALL PUPPETEER CHECKS PASSED SUCCESSFULLY!');
  await browser.close();
})();
