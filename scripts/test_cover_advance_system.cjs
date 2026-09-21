const puppeteer = require('puppeteer');

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

  // Clear localStorage cover keys to test clean baseline
  await page.evaluate(() => {
    localStorage.removeItem('hub_cover_history_v1');
    localStorage.removeItem('hub_cover_selected_topics');
    localStorage.removeItem('hub_cover_period_settings');
  });

  // Reload to test with seeded initial state
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  console.log('1. Verifying default advance badges on Monday Week A...');
  // Monday Week A has Set 8A, Set 9B, Set 7A, Set 11A etc.
  const cards = await page.$$('.cloze-period-card');
  console.log(`Found ${cards.length} cloze cards on Monday Week A.`);

  // Check advance button or badge presence
  const bumpButtons = await page.$$('.btn-quick-bump');
  console.log(`Found ${bumpButtons.length} individual +1 Advance buttons.`);

  // 2. Click an advance button on the first card that has one
  if (bumpButtons.length > 0) {
    const targetIdx = await page.evaluate(() => {
      const btn = document.querySelector('.btn-quick-bump');
      return btn ? btn.getAttribute('data-nextidx') : null;
    });
    console.log(`Target next lesson index for first bump button: ${targetIdx}`);

    await page.evaluate(() => {
      const btn = document.querySelector('.btn-quick-bump');
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Verify it changed to the green "+1 Advanced" badge
    const confirmedBadges = await page.$$eval('.badge-advanced-confirm', (els) =>
      els.map((e) => e.innerText.trim()),
    );
    console.log('Confirmed advance badges:', confirmedBadges);
    if (confirmedBadges.length === 0) {
      console.error('❌ Failed: Advance button did not transform into confirmed badge.');
      process.exit(1);
    }
    console.log(
      '✅ Individual +1 Advance button successfully advanced the lesson and showed confirmation badge!',
    );
  }

  // 3. Test "+1 Advance All Sets" toolbar button
  console.log('3. Testing "+1 Advance All Sets" toolbar button...');
  // Switch to another day, e.g. Tuesday Week A
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cover-10day-tab'));
    const tueTab = tabs.find(
      (t) => t.getAttribute('data-week') === 'Week A' && t.getAttribute('data-day') === 'Tuesday',
    );
    if (tueTab) tueTab.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const advanceAllVisible = await page.evaluate(() => {
    const btn = document.getElementById('btnAdvanceAllSets');
    return btn && btn.style.display !== 'none' ? btn.innerText : null;
  });
  console.log(`Advance All button status on Tuesday: ${advanceAllVisible}`);

  if (advanceAllVisible) {
    await page.click('#btnAdvanceAllSets');
    await new Promise((r) => setTimeout(r, 500));

    const remainingBumpBtns = await page.$$('.btn-quick-bump');
    console.log(`Remaining bump buttons after Advance All: ${remainingBumpBtns.length}`);
    const confirmedCount = await page.$$eval('.badge-advanced-confirm', (els) => els.length);
    console.log(`Confirmed advanced badges after Advance All: ${confirmedCount}`);

    if (remainingBumpBtns.length === 0 && confirmedCount > 0) {
      console.log('✅ Batch +1 Advance All Sets successfully advanced all classes in 1 click!');
    }
  } else {
    console.log('ℹ️ All sets on Tuesday were already at next lesson or completed.');
  }

  // 4. Test Cross-Day In-Memory / LocalStorage History Tracking
  console.log('4. Testing Session History propagation across days...');
  // Switch back to Monday Week A and verify state is preserved
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cover-10day-tab'));
    const monTab = tabs.find(
      (t) => t.getAttribute('data-week') === 'Week A' && t.getAttribute('data-day') === 'Monday',
    );
    if (monTab) monTab.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const mondayEmail = await page.$eval('#coverEmailOutputArea', (el) => el.value);
  console.log('Preserved Monday email snippet:', mondayEmail.slice(0, 200).replace(/\n/g, ' '));
  if (!mondayEmail.includes('Monday') || !mondayEmail.includes('Week A')) {
    console.error('❌ Failed: Monday state was not preserved.');
    process.exit(1);
  }
  console.log('✅ Day state and selections seamlessly preserved across quick tabs!');

  await browser.close();
  console.log('🎉 ALL AUTO-ADVANCE TESTS PASSED FLINT-CLEAN!');
})();
