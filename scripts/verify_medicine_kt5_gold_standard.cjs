const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Starting Comprehensive Browser & UI Verification for Medicine KT5 (Western Front)...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  const lessons = ['lesson_5_1', 'lesson_5_2', 'lesson_5_3', 'lesson_5_4', 'lesson_5_5', 'lesson_5_6'];
  let passCount = 0;
  let failCount = 0;

  for (const lid of lessons) {
    const url = `http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=${lid}`;
    console.log(`\n--------------------------------------------------`);
    console.log(`Testing Lesson: ${lid} (${url})`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Open all details and source accordions
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(d => d.open = true);
    });

    // Check images
    const imgAudit = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.getAttribute('src'),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete
      }));
    });

    const brokenImgs = imgAudit.filter(i => i.naturalWidth === 0 || !i.complete);
    if (brokenImgs.length > 0) {
      console.error(`  ❌ Found ${brokenImgs.length} broken images in ${lid}:`, brokenImgs);
      failCount++;
    } else {
      console.log(`  ✅ All ${imgAudit.length} images loaded successfully with naturalWidth > 0.`);
    }

    // Check Do Now Starter
    const doNowAudit = await page.evaluate(() => {
      const starter = document.querySelector('.starter-activity-container, .do-now-container, [data-do-now]');
      const title = starter ? starter.querySelector('h3, h4')?.textContent : 'N/A';
      const questionCount = starter ? starter.querySelectorAll('.retrieval-question-card, .question-card, input[type="radio"]').length : 0;
      return { found: !!starter, title, questionCount };
    });
    console.log(`  Do Now Starter: Found=${doNowAudit.found}, Title="${doNowAudit.title}"`);

    // Check Source Drawers and Exemplars
    const sourceAudit = await page.evaluate(() => {
      const drawers = Array.from(document.querySelectorAll('.cme-source-drawer, .source-card, details.source-details'));
      // Also look for archival-source-discussion-box
      const boxes = Array.from(document.querySelectorAll('.archival-source-discussion-box'));

      return {
        drawerCount: drawers.length,
        boxCount: boxes.length,
        sourcesInfo: boxes.map((b, idx) => {
          const badge = b.querySelector('.question-badge, span[style*="font-weight: 800"], div[style*="font-weight: 800"]')?.textContent.trim() || '';
          const qText = b.querySelector('.question-text, div[style*="font-family"] > span:last-child')?.textContent.trim() || '';
          const panel = b.querySelector('.think-discuss-exemplar-panel');
          const panelContent = panel ? panel.innerHTML : '';
          const hasContentEval = panelContent.includes('Content &amp; Contextual Knowledge') || panelContent.includes('Content & Contextual Knowledge');
          const hasProvEval = panelContent.includes('Provenance &amp; Utility Evaluation') || panelContent.includes('Provenance & Utility Evaluation');
          const hasFollowUp = panelContent.includes('Detail in Source') && panelContent.includes('Question I would ask');

          return {
            idx,
            badge: badge.substring(0, 50),
            qText: qText.substring(0, 80),
            hasContentEval,
            hasProvEval,
            hasFollowUp,
            panelContentLength: panelContent.length
          };
        })
      };
    });

    console.log(`  Archival Sources: Found ${sourceAudit.boxCount} interactive source boxes`);
    sourceAudit.sourcesInfo.forEach(s => {
      const utilityTag = (s.hasContentEval && s.hasProvEval) ? ' [⭐ 2-Part Utility Standard]' : '';
      const followUpTag = s.hasFollowUp ? ' [🔍 4-Part Follow-up Standard]' : '';
      console.log(`    Source ${s.idx + 1}: Badge="${s.badge}"${utilityTag}${followUpTag}`);
    });

    passCount++;
  }

  // Capture Screenshot of Lesson 5.1 showing Source A Utility answer
  console.log('\nCapturing screenshot of Lesson 5.1 Source A (How Useful Model Answer)...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=lesson_5_1', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    // Click the toggle button for Source A
    const btn = document.querySelector('.btn-think-discuss-toggle');
    if (btn) btn.click();
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  const shotPath = path.resolve('public/images/kt5_source_a_utility_verified.png');
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log(`  📸 Saved screenshot: ${shotPath}`);

  // Capture Screenshot of Lesson 5.4 showing Stretcher Bearers & Chain of Evacuation
  console.log('Capturing screenshot of Lesson 5.4 (Passchendaele Mud & Chain of Evacuation)...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=lesson_5_4', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) {
      const btn = box.querySelector('.btn-think-discuss-toggle');
      if (btn) btn.click();
      box.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const shotPath54 = path.resolve('public/images/kt5_lesson_5_4_verified.png');
  await page.screenshot({ path: shotPath54, fullPage: false });
  console.log(`  📸 Saved screenshot: ${shotPath54}`);

  await browser.close();
  console.log(`\n🎉 Verification Completed: ${passCount} Lessons Verified, ${failCount} Failures!`);
})();
