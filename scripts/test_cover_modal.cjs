const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/?cover=true', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // Select Week A and Monday
  await page.evaluate(() => {
    const btnWeekA = document.getElementById('btnWeekA');
    if (btnWeekA) btnWeekA.click();
    const monBtn = document.querySelector('.day-btn[data-day="Monday"]');
    if (monBtn) monBtn.click();
  });

  await new Promise((r) => setTimeout(r, 600));

  const emailText = await page.$eval('#coverEmailOutputArea', (el) => el.value);
  console.log('=== WEB APP GENERATED COVER EMAIL ===');
  console.log(emailText);
  console.log('=====================================');

  // Check key assertions
  const hasDoubleLinks = emailText.includes('](');
  console.log('Has double links [url](url):', hasDoubleLinks);
  const startsWithDearPaul = emailText.startsWith('Dear Paul,');
  console.log('Starts with Dear Paul,:', startsWithDearPaul);
  const endsWithThanksBen = emailText.endsWith('Thanks\nBen');
  console.log('Ends with Thanks\\nBen:', endsWithThanksBen);
  const hasHubColon = emailText.includes('SUPERVISION ONLY — NO COVER WORK TO SET:');
  console.log('Has Hub colon bug:', hasHubColon);
  const hasCleanHub = emailText.includes('SUPERVISION ONLY — NO COVER WORK TO SET\n');
  console.log('Has clean Hub supervision:', hasCleanHub);
  const hasVleDutyNote = emailText.includes(
    'Duties: none All cover set on VLE; please allow pupils to use laptops as textbooks only.',
  );
  console.log('Has VLE Duty Note:', hasVleDutyNote);

  if (
    !hasDoubleLinks &&
    startsWithDearPaul &&
    endsWithThanksBen &&
    !hasHubColon &&
    hasCleanHub &&
    hasVleDutyNote
  ) {
    console.log('✅ ALL VERIFICATIONS PASSED IN WEB APP!');
  } else {
    console.error('❌ SOME ASSERTIONS FAILED');
    process.exit(1);
  }

  await browser.close();
})();
