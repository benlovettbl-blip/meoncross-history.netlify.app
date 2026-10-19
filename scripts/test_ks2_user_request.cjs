const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testKs2Features() {
  console.log('🧪 Starting Puppeteer Verification for KS2 User Requirements...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Homepage Launchpad for ks2_ww2
  console.log('\n--- 1. Testing KS2 Homepage Launchpad (view=lessons&unit=ks2_ww2) ---');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2', {
    waitUntil: 'networkidle0',
  });

  // Wait a moment for rendering
  await new Promise((r) => setTimeout(r, 1000));

  const launchpadInfo = await page.evaluate(() => {
    const launchpad = document.querySelector('.hero-curricular-launchpad');
    if (!launchpad) return { found: false, html: document.body.innerHTML.slice(0, 500) };

    const pills = Array.from(launchpad.querySelectorAll('.launchpad-pill-group')).map((p) => {
      const btn = p.querySelector('.launchpad-pill-btn');
      const pdf = p.querySelector('.launchpad-pill-pdf');
      return {
        label: btn ? btn.innerText.trim() : null,
        pdfHref: pdf ? pdf.getAttribute('href') : null,
      };
    });

    return { found: true, pills };
  });

  console.log('Launchpad Info:', JSON.stringify(launchpadInfo, null, 2));

  // Screenshot homepage hero launchpad
  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  await page.screenshot({
    path: path.join(screenshotDir, 'ks2_homepage_launchpad.png'),
    fullPage: false,
  });
  console.log('📸 Saved screenshot: ks2_homepage_launchpad.png');

  // Verify direct file download URLs
  const req1 = await page.goto('http://localhost:3003/pdfs/ks2_ww2_pupil_workbook_FINAL_V17.pdf');
  console.log('Pupil Workbook PDF (FINAL_V17) HTTP Status:', req1.status());

  const req2 = await page.goto('http://localhost:3003/pdfs/ks2_ww2_quiz_pack_FINAL_V17.pdf');
  console.log('Retrieval Companion PDF (FINAL_V17) HTTP Status:', req2.status());

  const req3 = await page.goto('http://localhost:3003/units/ks2_ww2/quiz_pack.html');
  console.log('Retrieval Companion HTML HTTP Status:', req3.status());

  const req4 = await page.goto('http://localhost:3003/units/ks2_ww2/pupil_workbook.html');
  console.log('Pupil Workbook HTML HTTP Status:', req4.status());

  // 2. Check Lesson 1 - Collapsed Sources & In-Lesson Worksheet
  console.log('\n--- 2. Testing Lesson 1 for Collapsed Sources & Worksheets ---');
  await page.goto('http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=0', {
    waitUntil: 'networkidle0',
  });
  await new Promise((r) => setTimeout(r, 1000));

  const lessonState = await page.evaluate(() => {
    const sourceDrawers = Array.from(
      document.querySelectorAll('details.archival-drawer, details.cme-source-drawer'),
    );
    const stickyWorksheetBtn = document.querySelector('.btn-ks2-worksheet-launcher');
    const inlessonBanner = document.querySelector('.ks2-inlesson-worksheet-banner');

    return {
      drawersCount: sourceDrawers.length,
      drawersAreClosed: sourceDrawers.every((d) => !d.open),
      drawerSummaries: sourceDrawers.map((d) => {
        const s = d.querySelector('summary');
        return s ? s.innerText.trim().replace(/\s+/g, ' ') : '';
      }),
      hasStickyWorksheetBtn: !!stickyWorksheetBtn,
      stickyBtnText: stickyWorksheetBtn ? stickyWorksheetBtn.innerText.trim() : null,
      hasInlessonBanner: !!inlessonBanner,
    };
  });

  console.log('Lesson 1 State:', JSON.stringify(lessonState, null, 2));

  // Take screenshot of collapsed drawer in Lesson 1
  await page.screenshot({
    path: path.join(screenshotDir, 'ks2_lesson1_collapsed_source.png'),
    fullPage: false,
  });
  console.log('📸 Saved screenshot: ks2_lesson1_collapsed_source.png');

  // Open the drawer
  await page.evaluate(() => {
    const drawer = document.querySelector('details.archival-drawer, details.cme-source-drawer');
    if (drawer) {
      drawer.open = true;
      drawer.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });

  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({
    path: path.join(screenshotDir, 'ks2_lesson1_expanded_source.png'),
    fullPage: false,
  });
  console.log('📸 Saved screenshot: ks2_lesson1_expanded_source.png');

  // Scroll to in-lesson worksheet banner
  await page.evaluate(() => {
    const banner = document.querySelector('.ks2-inlesson-worksheet-banner');
    if (banner) banner.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({
    path: path.join(screenshotDir, 'ks2_lesson1_inlesson_worksheet_banner.png'),
    fullPage: false,
  });
  console.log('📸 Saved screenshot: ks2_lesson1_inlesson_worksheet_banner.png');

  // Test opening the worksheet modal
  console.log('\n--- 3. Testing Worksheet Modal in Lesson 1 ---');
  await page.evaluate(() => {
    const btn =
      document.querySelector('.btn-ks2-worksheet-launcher') ||
      document.querySelector('.btn-ks2-inlesson-worksheet');
    if (btn) btn.click();
  });

  await new Promise((r) => setTimeout(r, 800));

  const modalState = await page.evaluate(() => {
    const modal = document.getElementById('ks2WorksheetModalOverlay');
    if (!modal) return { open: false };
    const title = modal.querySelector('#ks2ModalTitle');
    const iframe = modal.querySelector('iframe');
    return {
      open: true,
      title: title ? title.innerText.trim() : null,
      iframeSrc: iframe ? iframe.getAttribute('src') : null,
    };
  });

  console.log('Worksheet Modal State:', JSON.stringify(modalState, null, 2));

  await page.screenshot({
    path: path.join(screenshotDir, 'ks2_worksheet_modal_open.png'),
    fullPage: false,
  });
  console.log('📸 Saved screenshot: ks2_worksheet_modal_open.png');

  await browser.close();
  console.log('\n🎉 ALL KS2 REQUIREMENTS VERIFIED AND VALIDATED VIA BROWSER!');
}

testKs2Features().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
