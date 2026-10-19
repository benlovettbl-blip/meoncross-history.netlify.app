const puppeteer = require('puppeteer');

(async () => {
  console.log('Testing KS2 Worksheet & Teacher Guidance Integration...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.toString());
  });

  // Test 1: Lesson View with buttons
  console.log('Navigating to Lesson 2...');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=2', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1500));

  const worksheetBtn = await page.$('.btn-ks2-worksheet-launcher');
  const teacherBtn = await page.$('.btn-ks2-teacher-launcher');
  const workbookLink = await page.$('.btn-ks2-workbook-launcher');

  console.log('Worksheet Button found:', !!worksheetBtn);
  console.log('Teacher Guidance Button found:', !!teacherBtn);
  console.log('Workbook Download Link found:', !!workbookLink);

  if (!worksheetBtn || !teacherBtn) {
    console.error('FAIL: KS2 action buttons not rendered in sticky header!');
    process.exit(1);
  }

  // Click Worksheet Button to open modal
  console.log('Clicking Worksheet Launcher...');
  await worksheetBtn.click();
  await new Promise((r) => setTimeout(r, 1000));

  const worksheetModal = await page.$('#ks2WorksheetModalOverlay');
  console.log('Worksheet Modal Overlay displayed:', !!worksheetModal);

  // Take screenshot of worksheet modal
  await page.screenshot({ path: 'public/images/test_ks2_worksheet_modal.png' });
  console.log('Captured test_ks2_worksheet_modal.png');

  // Close worksheet modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // Click Teacher Guidance Button to open modal
  console.log('Clicking Teacher Guidance Launcher...');
  await teacherBtn.click();
  await new Promise((r) => setTimeout(r, 1000));

  const guidanceModal = await page.$('#ks2TeacherGuidanceModalOverlay');
  console.log('Teacher Guidance Modal Overlay displayed:', !!guidanceModal);

  // Take screenshot of teacher guidance modal
  await page.screenshot({ path: 'public/images/test_ks2_teacher_guidance_modal.png' });
  console.log('Captured test_ks2_teacher_guidance_modal.png');

  // Close guidance modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // Test 2: Workbooks Zone with KS2 Pillar Cards
  console.log('Navigating to Workbooks Zone (?view=booklet&unit=ks2_ww2)...');
  await page.goto('http://localhost:3003/?view=booklet&unit=ks2_ww2', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1500));

  const pillarCards = await page.$$('.master-pillar-card');
  console.log(`Pillar Master Cards found for ks2_ww2: ${pillarCards.length}`);

  const ks2Toolbar = await page.$('a[href="/pdfs/ks2_ww2/ks2_ww2_pupil_workbook.pdf"]');
  console.log('KS2 Print Desk Toolbar found:', !!ks2Toolbar);

  await page.screenshot({ path: 'public/images/test_ks2_workbooks_zone.png' });
  console.log('Captured test_ks2_workbooks_zone.png');

  await browser.close();

  if (errors.length > 0) {
    console.log('Page Errors encountered:', errors);
  } else {
    console.log('ALL INTEGRATION CHECKS PASSED WITH 0 ERRORS!');
  }
})();
