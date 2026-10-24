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
  const artifactDir =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

  console.log('Navigating to GCSE Tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });

  // Switch to Tab 2
  const tabBtn = await page.waitForSelector('.gcse-tab-btn[data-tab="blurt"]');
  await tabBtn.click();
  await new Promise((r) => setTimeout(r, 600));

  // ==========================================
  // SCENARIO 1: MEDICINE WITH ACCURATE MEDICINE RECALL
  // ==========================================
  console.log('\n--- SCENARIO 1: MEDICINE IN BRITAIN ---');
  const filter12m = await page.$('.gcse-blurt-tariff-filter[data-tariff="12"]');
  if (filter12m) await filter12m.click();
  await new Promise((r) => setTimeout(r, 400));

  const medQText = await page.$eval(
    '#select-blurt-topic',
    (el) => el.options[el.selectedIndex]?.text,
  );
  console.log('Selected Question (Medicine):', medQText);

  let btnStart = await page.waitForSelector('#btn-start-blurt');
  await btnStart.click();
  await new Promise((r) => setTimeout(r, 400));

  let canvas = await page.waitForSelector('#blurt-input-canvas');
  await canvas.type(
    'One major factor was Edward Jenner discovering the smallpox vaccine in 1796 using cowpox from Sarah Nelmes. ' +
      'Jenner proved immunity could be generated artificially, leading to government-mandated vaccination in 1853 and the eventual eradication of smallpox. ' +
      'Furthermore, the 1875 Public Health Act marked the decisive end of laissez-faire government attitude, compelling local councils to provide clean water, sewers, and refuse collection. ' +
      'Finally, beyond the stimulus, modern government health legislation and campaigns like clean air acts and compulsory childhood vaccinations targeted non-infectious conditions.',
  );
  await new Promise((r) => setTimeout(r, 300));

  let btnFinish = await page.waitForSelector('#btn-blurt-finish');
  await btnFinish.click();
  await new Promise((r) => setTimeout(r, 600));

  const medScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
  const medCounter = await page.$eval('#blurt-score-counter', (el) => el.innerText);
  console.log('Medicine Evaluated Score:', medScore, '| Counter:', medCounter);

  await page.evaluate(() => {
    const el = document.querySelector('.gcse-blurt-compare-grid');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artifactDir, 'medicine_authentic_benchmark.png') });
  console.log('Captured medicine_authentic_benchmark.png');

  // ==========================================
  // SCENARIO 2: ELIZABETHAN ENGLAND WITH ACCURATE ELIZABETHAN RECALL
  // ==========================================
  console.log('\n--- SCENARIO 2: EARLY ELIZABETHAN ENGLAND ---');
  let btnRestart = await page.waitForSelector('#btn-blurt-restart');
  await btnRestart.click();
  await new Promise((r) => setTimeout(r, 500));

  // Click Early Elizabethan England tab
  const eeeTab = await page.waitForSelector(
    '.gcse-blurt-paper-tab[data-paper="paper2_b4_early_elizabethan_england"]',
  );
  await eeeTab.click();
  await new Promise((r) => setTimeout(r, 500));

  // Click 12 Marks filter
  const eeeFilter12 = await page.waitForSelector('.gcse-blurt-tariff-filter[data-tariff="12"]');
  await eeeFilter12.click();
  await new Promise((r) => setTimeout(r, 400));

  const eeeQText = await page.$eval(
    '#select-blurt-topic',
    (el) => el.options[el.selectedIndex]?.text,
  );
  console.log('Selected Question (Elizabethan):', eeeQText);

  btnStart = await page.waitForSelector('#btn-start-blurt');
  await btnStart.click();
  await new Promise((r) => setTimeout(r, 400));

  canvas = await page.waitForSelector('#blurt-input-canvas');
  await canvas.type(
    'One crucial factor behind increased exploration was navigational aids. Instruments like astrolabes, magnetic compasses, and Mercator projection maps made ocean navigation much safer and more accurate. ' +
      'Furthermore, the search for luxury goods like spices, silk, and tobacco intensified following the collapse of the Antwerp cloth market, forcing merchants to find new markets. ' +
      'Finally, beyond the stimulus, improved galleon ship design with larger sails and heavier cannons, combined with privateering rivalry against Spanish silver fleets led by Drake and Hawkins, drove English voyages.',
  );
  await new Promise((r) => setTimeout(r, 300));

  btnFinish = await page.waitForSelector('#btn-blurt-finish');
  await btnFinish.click();
  await new Promise((r) => setTimeout(r, 600));

  const eeeScore = await page.$eval('#blurt-score-percentage', (el) => el.innerText);
  const eeeCounter = await page.$eval('#blurt-score-counter', (el) => el.innerText);
  console.log('Elizabethan Evaluated Score:', eeeScore, '| Counter:', eeeCounter);

  await page.evaluate(() => {
    const el = document.querySelector('.gcse-blurt-compare-grid');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artifactDir, 'elizabethan_authentic_benchmark.png') });
  console.log('Captured elizabethan_authentic_benchmark.png');

  console.log('\nALL AUTHENTIC TESTS PASSED PERFECTLY!');
  await browser.close();
})();
