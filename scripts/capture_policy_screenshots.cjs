/**
 * scripts/capture_policy_screenshots.cjs
 *
 * Captures live curriculum exemplar screenshots for the History Marking & Feedback Policy:
 * - Figure 1: Key Stage 3 Progress & Assessment Record (from great_war pupil workbook Page 16)
 * - Figure 2: Master Knowledge Retrieval Companion Marking Bank (from great_war retrieval companion Page 7)
 * - Figure 3: Key Stage 4 (GCSE) Assessment Record & Tariffs (from edexcel_medicine western front workbook Page 28)
 *
 * Overwrites target PNGs in public/images/policy/ with crisp 2x resolution.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const url = require('url');

const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const policyImgDir = path.resolve(__dirname, '../public/images/policy');

(async () => {
  console.log('Capturing live policy visual appendix figures...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2200, deviceScaleFactor: 2 });

  // -------------------------------------------------------------
  // Figure 1: KS3 Workbook Progress & Assessment Record
  // -------------------------------------------------------------
  const gwWorkbookPath = path.resolve(__dirname, '../public/units/great_war/pupil_workbook.html');
  await page.goto(url.pathToFileURL(gwWorkbookPath).href, { waitUntil: 'networkidle0' });

  const fig1Clip = await page.evaluate(() => {
    const p16 = document.getElementById('page-16');
    if (!p16) return null;
    const body = p16.querySelector('.page-body-full');
    if (!body) return null;
    const bodyRect = body.getBoundingClientRect();

    const table = p16.querySelector('table');
    const tableRect = table ? table.getBoundingClientRect() : null;
    const bottom = tableRect ? tableRect.bottom + 4 : bodyRect.bottom;

    return {
      x: bodyRect.x,
      y: bodyRect.y,
      width: bodyRect.width,
      height: bottom - bodyRect.y,
    };
  });

  if (fig1Clip) {
    const fig1Path = path.join(policyImgDir, 'figure1_ks3_tracking_grid.png');
    await page.screenshot({ path: fig1Path, clip: fig1Clip });
    console.log('✅ Captured Figure 1 (KS3 Workbook Progress Record) ->', fig1Path);
  }

  // -------------------------------------------------------------
  // Figure 2: Retrieval Companion Marking Bank
  // -------------------------------------------------------------
  const gwCompanionPath = path.resolve(
    __dirname,
    '../public/units/great_war/great_war_retrieval_companion.html',
  );
  await page.goto(url.pathToFileURL(gwCompanionPath).href, { waitUntil: 'networkidle0' });

  const fig2Clip = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    let targetPage = null;
    for (const p of pages) {
      if (p.textContent.includes('Department Marking Bank • Part 1')) {
        targetPage = p;
        break;
      }
    }
    if (!targetPage) targetPage = pages[pages.length - 2];
    const pageRect = targetPage.getBoundingClientRect();

    const cards = targetPage.querySelectorAll('.ans-card');
    let bottomOfCard6 = pageRect.top + 330;
    if (cards && cards.length >= 6) {
      const card6Rect = cards[5].getBoundingClientRect();
      bottomOfCard6 = card6Rect.bottom + 4;
    }

    return {
      x: pageRect.x,
      y: pageRect.y,
      width: pageRect.width,
      height: bottomOfCard6 - pageRect.y,
    };
  });

  if (fig2Clip) {
    const fig2Path = path.join(policyImgDir, 'figure2_pupil_voice_reflection.png');
    await page.screenshot({ path: fig2Path, clip: fig2Clip });
    console.log('✅ Captured Figure 2 (Retrieval Companion Marking Bank) ->', fig2Path);
  }

  // -------------------------------------------------------------
  // Figure 3: GCSE Western Front Assessment Record & Tariffs
  // -------------------------------------------------------------
  const wfWorkbookPath = path.resolve(
    __dirname,
    '../public/units/edexcel_medicine/pupil_workbook_western_front.html',
  );
  await page.goto(url.pathToFileURL(wfWorkbookPath).href, { waitUntil: 'networkidle0' });

  const fig3Clip = await page.evaluate(() => {
    const p28 = document.getElementById('page-28');
    if (!p28) return null;
    const body = p28.querySelector('.page-body-full');
    if (!body) return null;
    const bodyRect = body.getBoundingClientRect();

    const table = p28.querySelector('table');
    let bottom = bodyRect.top + 350;
    if (table) {
      const rows = table.querySelectorAll('tr');
      if (rows.length >= 5) {
        const row4Rect = rows[4].getBoundingClientRect();
        bottom = row4Rect.bottom + 4;
      }
    }

    return {
      x: bodyRect.x,
      y: bodyRect.y,
      width: bodyRect.width,
      height: bottom - bodyRect.y,
    };
  });

  if (fig3Clip) {
    const fig3Path = path.join(policyImgDir, 'figure3_ks4_gcse_tracker.png');
    await page.screenshot({ path: fig3Path, clip: fig3Clip });
    console.log('✅ Captured Figure 3 (GCSE Assessment Record & Tariffs) ->', fig3Path);
  }

  await browser.close();
  console.log('All policy figures captured and synchronized successfully.');
})();
