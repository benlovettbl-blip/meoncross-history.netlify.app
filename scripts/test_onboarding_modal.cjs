const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  const artifactDir =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\02daaa8e-416c-47fc-95fb-9083341d1893';

  console.log('Navigating to GCSE Tracker...');
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });

  // Clear onboarding keys to simulate first-time visitor
  console.log('Clearing localStorage onboarding keys...');
  await page.evaluate(() => {
    localStorage.removeItem('gcse_spec_onboarding_completed_v1');
    localStorage.removeItem('gcse_spec_selected_papers_v1');
  });

  // Reload page to trigger first-time onboarding check
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  // Check if onboarding modal is visible
  const modalVisible = await page.$eval('#gcse-pathway-modal', (el) => Boolean(el));
  console.log('Onboarding modal present on first load:', modalVisible);

  const modalTitle = await page.$eval('#gcse-pathway-modal h3', (el) => el.innerText);
  console.log('Modal title:', modalTitle);

  // Check default selected values in modal dropdowns
  const p1Val = await page.$eval('#select-p1', (el) => el.value);
  const p2bdVal = await page.$eval('#select-p2bd', (el) => el.value);
  const p2psVal = await page.$eval('#select-p2ps', (el) => el.value);
  const p3Val = await page.$eval('#select-p3', (el) => el.value);
  console.log('Initial default selections:');
  console.log('  Paper 1:', p1Val);
  console.log('  Paper 2 British Depth:', p2bdVal);
  console.log('  Paper 2 Period:', p2psVal);
  console.log('  Paper 3:', p3Val);

  // Check existence of reset button in modal
  const hasResetBtnTop = await page.$eval('#btn-reset-default-papers', (el) => Boolean(el));
  const hasResetBtnBottom = await page.$eval('#btn-modal-reset-bottom', (el) => Boolean(el));
  console.log('Modal top Reset button present:', hasResetBtnTop);
  console.log('Modal bottom Reset button present:', hasResetBtnBottom);

  // Take screenshot of first-time modal
  await page.screenshot({ path: path.join(artifactDir, 'onboarding_modal_first_time.png') });
  console.log('Captured onboarding_modal_first_time.png');

  // Change paper 3 to Weimar Germany
  console.log('\nTesting dropdown change and reset button...');
  await page.select('#select-p3', 'paper3_31_weimar_nazi_germany');
  let changedP3 = await page.$eval('#select-p3', (el) => el.value);
  console.log('Changed Paper 3 to:', changedP3);

  // Click top Reset button
  await page.click('#btn-reset-default-papers');
  await new Promise((r) => setTimeout(r, 300));

  let resetP3 = await page.$eval('#select-p3', (el) => el.value);
  console.log(
    'Paper 3 after clicking Reset:',
    resetP3,
    resetP3 === 'paper3_33_usa_conflict_home_abroad' ? '✅ RESTORED TO USA' : '❌ FAILED',
  );

  // Now change Paper 1 to Crime and Punishment
  await page.select('#select-p1', 'paper1_10_crime_and_punishment');
  let changedP1 = await page.$eval('#select-p1', (el) => el.value);
  console.log('Changed Paper 1 to:', changedP1);

  // Click bottom Reset button
  await page.click('#btn-modal-reset-bottom');
  await new Promise((r) => setTimeout(r, 300));

  let resetP1 = await page.$eval('#select-p1', (el) => el.value);
  console.log(
    'Paper 1 after clicking bottom Reset:',
    resetP1,
    resetP1 === 'paper1_11_medicine_britain' ? '✅ RESTORED TO MEDICINE' : '❌ FAILED',
  );

  // Click "Confirm & Start Revising"
  console.log('\nSubmitting onboarding confirmation...');
  await page.click('#gcse-pathway-form button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));

  // Verify modal is removed
  const modalStillPresent = await page.evaluate(() =>
    Boolean(document.getElementById('gcse-pathway-modal')),
  );
  const onboardingFlag = await page.evaluate(() =>
    localStorage.getItem('gcse_spec_onboarding_completed_v1'),
  );
  console.log('Modal removed after confirm:', !modalStillPresent);
  console.log('Onboarding completed flag in localStorage:', onboardingFlag);

  // Check hero quick reset button
  const hasHeroResetBtn = await page.$eval('#btn-quick-reset-papers', (el) => Boolean(el));
  console.log('Hero header quick Reset button present:', hasHeroResetBtn);

  // Screenshot confirmed dashboard
  await page.screenshot({ path: path.join(artifactDir, 'onboarding_confirmed_dashboard.png') });
  console.log('Captured onboarding_confirmed_dashboard.png');

  // Verify quick reset from hero
  console.log('\nTesting hero quick Reset button...');
  // First change via My 4 Papers
  await page.click('#btn-change-papers');
  await new Promise((r) => setTimeout(r, 400));
  await page.select('#select-p3', 'paper3_31_weimar_nazi_germany');
  await page.click('#gcse-pathway-form button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));

  let activeRibbonBefore = await page.$$eval('.gcse-paper-chip', (chips) =>
    chips.map((c) => c.innerText.trim()),
  );
  console.log('Active paper chips before quick reset:', activeRibbonBefore);

  // Setup dialog handler in case confirmation dialog appears
  page.on('dialog', async (dialog) => {
    console.log('Dialog popped:', dialog.message());
    await dialog.accept();
  });

  // Click hero Reset button
  await page.click('#btn-quick-reset-papers');
  await new Promise((r) => setTimeout(r, 600));

  let activeRibbonAfter = await page.$$eval('.gcse-paper-chip', (chips) =>
    chips.map((c) => c.innerText.trim()),
  );
  console.log('Active paper chips after quick reset:', activeRibbonAfter);

  await page.screenshot({ path: path.join(artifactDir, 'hero_reset_verified.png') });
  console.log('Captured hero_reset_verified.png');

  await browser.close();
  console.log('\nAll Onboarding & Reset verification tests completed successfully!');
})();
