const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3003/?cover=true...');
  await page.goto('http://localhost:3003/?cover=true', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Verify 10-Day Quick Selector Tabs exist
  const tabCount = await page.$$eval('.cover-10day-tab', (els) => els.length);
  console.log(`Found ${tabCount} 10-day quick tabs (expected 10).`);
  if (tabCount !== 10) {
    console.error(`❌ Expected 10 tabs, found ${tabCount}`);
    process.exit(1);
  }

  // 2. Click Tuesday Week A
  console.log('Clicking Tuesday Week A tab...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cover-10day-tab'));
    const tueTab = tabs.find(
      (t) => t.getAttribute('data-week') === 'Week A' && t.getAttribute('data-day') === 'Tuesday',
    );
    if (tueTab) tueTab.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Verify schedule label and email text updated to Tuesday Week A
  let emailText = await page.$eval('#coverEmailOutputArea', (el) => el.value);
  console.log('Checking Tuesday Week A email output...');
  if (!emailText.includes('Tuesday') || !emailText.includes('Week A')) {
    console.error('❌ Tuesday Week A text missing from output:', emailText);
    process.exit(1);
  }
  console.log('✅ Tuesday Week A loaded successfully.');

  // 3. Verify Cloze Dropdowns are present
  const clozeCardCount = await page.$$eval('.cloze-period-card', (els) => els.length);
  console.log(`Found ${clozeCardCount} teaching class cloze cards.`);
  if (clozeCardCount === 0) {
    console.error('❌ No cloze period cards found.');
    process.exit(1);
  }

  // 4. Test changing a Cloze Resource Dropdown to Paper Only
  console.log('Changing first period resources dropdown to "Paper only"...');
  await page.evaluate(() => {
    const firstResSelect = document.querySelector('.cloze-res-picker');
    if (firstResSelect) {
      firstResSelect.value = 'paper';
      firstResSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  emailText = await page.$eval('#coverEmailOutputArea', (el) => el.value);
  const hasPaperOnlyLine = emailText.includes(
    'Resources: Paper only — pupils complete all work on lined A4 paper.',
  );
  console.log('Has Paper Only line:', hasPaperOnlyLine);
  if (!hasPaperOnlyLine) {
    console.error('❌ Paper only line not found in email output.');
    process.exit(1);
  }
  console.log('✅ Cloze Resources Dropdown dynamically updated the email text!');

  // 5. Test "View Plain Text" toggle button
  console.log('Testing "View Plain Text" drawer toggle...');
  const isDrawerVisibleBefore = await page.$eval(
    '#coverRawTextDrawer',
    (el) => el.style.display !== 'none',
  );
  await page.click('#btnToggleRawText');
  await new Promise((r) => setTimeout(r, 300));
  const isDrawerVisibleAfter = await page.$eval(
    '#coverRawTextDrawer',
    (el) => el.style.display !== 'none',
  );
  console.log(`Drawer visibility before: ${isDrawerVisibleBefore}, after: ${isDrawerVisibleAfter}`);
  if (!isDrawerVisibleAfter) {
    console.error('❌ Raw Text drawer did not open on toggle click.');
    process.exit(1);
  }
  console.log('✅ "View Plain Text" toggle functions properly.');

  // 6. Test 1-click day switch to Thursday Week B
  console.log('Clicking Thursday Week B tab...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cover-10day-tab'));
    const thuBTab = tabs.find(
      (t) => t.getAttribute('data-week') === 'Week B' && t.getAttribute('data-day') === 'Thursday',
    );
    if (thuBTab) thuBTab.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  emailText = await page.$eval('#coverEmailOutputArea', (el) => el.value);
  if (!emailText.includes('Thursday') || !emailText.includes('Week B')) {
    console.error('❌ Thursday Week B text missing from output.');
    process.exit(1);
  }
  console.log('✅ Thursday Week B loaded successfully in a single click!');

  // 7. Test "Copy Cover Email" button click
  console.log('Testing "Copy Cover Email" button...');
  await page.click('#coverCopyActionBtn');
  await new Promise((r) => setTimeout(r, 400));
  const copyBtnText = await page.$eval('#coverCopyActionBtn', (el) => el.textContent.trim());
  console.log('Copy button text after click:', copyBtnText);
  if (!copyBtnText.includes('Copied')) {
    console.error('❌ Copy button did not show "Copied" feedback.');
    process.exit(1);
  }
  console.log('✅ Copy Cover Email button triggered copy with feedback!');

  // 8. Capture screenshot for visual inspection
  const screenshotPath = path.resolve(__dirname, '../public/images/cover_cloze_demo.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Saved demo screenshot to:', screenshotPath);

  console.log('🎉 ALL CLOZE WORKFLOW TESTS PASSED FLINT-CLEAN!');
  await browser.close();
})();
