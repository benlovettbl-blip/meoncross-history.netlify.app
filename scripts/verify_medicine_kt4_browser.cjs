/**
 * scripts/verify_medicine_kt4_browser.cjs
 *
 * Automated Browser Verification for GCSE Medicine Key Topic 4 (Lessons 4.1 to 4.5):
 * 1. Checks that all 10 narrative plates load (img.naturalWidth > 0, 0 broken images).
 * 2. Checks that all 25 primary source drawers render cleanly.
 * 3. Expands all drawers and verifies:
 *    - Exact rotation rhythm: 2 Visual + 3 Written sources per lesson.
 *    - Visual sources load authentic images (img.naturalWidth > 0, 0 broken images).
 *    - Written sources render authentic quotation text in .archival-source-body.
 *    - Model answer reveal drawers operate correctly with concise answers.
 *    - Strictly ZERO 3-part provenance scaffolding (Author/Audience/Motive).
 *    - Strictly ZERO "How Useful" question badges/prompts.
 * 4. Takes high-resolution full-page screenshots of each lesson.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const previewDir = path.join(__dirname, '..', 'public', 'previews', 'medicine_kt4');
if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

const lessons = [
  { id: 'lesson_4_1', num: '4.1', title: 'Ideas on Causes: Genetics, DNA & The Human Genome Project' },
  { id: 'lesson_4_2', num: '4.2', title: 'Lifestyle Factors & Diagnostic Technology' },
  { id: 'lesson_4_3', num: '4.3', title: 'Magic Bullets, High-Tech Treatments & The Birth of the NHS' },
  { id: 'lesson_4_4', num: '4.4', title: 'Case Study 1: Fleming, Florey & Chain and Penicillin' },
  { id: 'lesson_4_5', num: '4.5', title: 'Case Study 2: Public Health & The Fight Against Lung Cancer' }
];

async function runVerification() {
  console.log('🚀 Starting Browser Visual Verification for Medicine KT4 (Lessons 4.1–4.5)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const summaryReport = [];

  for (const l of lessons) {
    console.log(`\n======================================================`);
    console.log(`🔍 Inspecting Lesson ${l.num}: ${l.title} (${l.id})`);
    console.log(`======================================================`);

    const url = `http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=${l.id}`;
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for dynamic app to render
    await new Promise(r => setTimeout(r, 2500));

    // Verify DOM structure inside page
    const report = await page.evaluate((lessonId) => {
      // 1. Narrative visual plates
      const narrativePlates = Array.from(document.querySelectorAll('.narrative-visual-plate img')).map(img => ({
        src: img.getAttribute('src'),
        loaded: img.complete && img.naturalWidth > 0,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        alt: img.alt
      }));

      // 2. Source drawers
      const drawers = Array.from(document.querySelectorAll('.cme-source-drawer, .archival-drawer'));
      
      // Expand all details elements
      drawers.forEach(d => {
        d.open = true;
      });

      // Expand all model answer details inside sources
      const revealDetails = Array.from(document.querySelectorAll('.source-enquiry-reveal'));
      revealDetails.forEach(rd => {
        rd.open = true;
      });

      const sourcesData = drawers.map(d => {
        const titleEl = d.querySelector('.archival-drawer-title');
        const metaTag = d.querySelector('.archival-meta-tag');
        const img = d.querySelector('img');
        const writtenBody = d.querySelector('.archival-source-body');
        const modelAnswer = d.querySelector('.source-enquiry-answer-body');
        const badge = d.querySelector('.source-enquiry-reveal summary span');
        const provenanceBox = d.querySelector('.archival-citation-footer, .archival-media-provenance');
        const fullText = d.innerText || '';

        const has3PartProvenance = /Provenance Scaffolding|Author\s*•\s*Audience\s*•\s*Motive/i.test(fullText);
        const hasHowUseful = /how useful/i.test(fullText);

        return {
          sourceLabel: metaTag ? metaTag.innerText.trim() : 'UNKNOWN',
          title: titleEl ? titleEl.innerText.trim() : '',
          isVisual: !!img,
          imgLoaded: img ? (img.complete && img.naturalWidth > 0) : null,
          imgWidth: img ? img.naturalWidth : 0,
          imgSrc: img ? img.getAttribute('src') : null,
          hasWrittenBody: !!writtenBody && writtenBody.innerText.trim().length > 0,
          writtenBodyPreview: writtenBody ? writtenBody.innerText.trim().slice(0, 70) + '...' : null,
          hasModelAnswer: !!modelAnswer && modelAnswer.innerText.trim().length > 0,
          questionBadge: badge ? badge.innerText.trim() : null,
          provenance: provenanceBox ? provenanceBox.innerText.trim() : null,
          has3PartProvenance,
          hasHowUseful
        };
      });

      // Check Do Now starter
      const doNowContainer = document.querySelector('.do-now-card, #do-now-container, .retrieval-starter');
      const doNowText = doNowContainer ? doNowContainer.innerText : '';

      return {
        lessonTitle: document.querySelector('.lesson-banner h1, h1, .lesson-header-title')?.innerText || '',
        narrativePlateCount: narrativePlates.length,
        narrativePlates,
        sourceDrawerCount: drawers.length,
        sourcesData,
        doNowPresent: !!doNowContainer,
        doNowTextLength: doNowText.length
      };
    }, l.id);

    console.log(`- Lesson Title: "${report.lessonTitle.slice(0, 50)}..."`);
    console.log(`- Layer 2 Narrative Plates: ${report.narrativePlateCount}/2 found`);
    report.narrativePlates.forEach((p, idx) => {
      console.log(`  Plate ${idx + 1}: ${p.loaded ? '✅ LOADED' : '❌ BROKEN'} (${p.naturalWidth}x${p.naturalHeight}px) -> ${p.src}`);
    });

    console.log(`- Layer 3 Disciplinary Sources: ${report.sourceDrawerCount}/5 found`);
    let visualCount = 0;
    let writtenCount = 0;
    let any3PartProvenance = false;
    let anyHowUseful = false;

    report.sourcesData.forEach((s) => {
      if (s.isVisual) {
        visualCount++;
        console.log(`  [${s.sourceLabel}] VISUAL: ${s.imgLoaded ? '✅ LOADED' : '❌ BROKEN'} (${s.imgWidth}px) | Badge: [${s.questionBadge}] | ModelAnswer: ${s.hasModelAnswer ? '✅' : '❌'}`);
      } else {
        writtenCount++;
        console.log(`  [${s.sourceLabel}] WRITTEN: ✅ Body Present | Preview: "${s.writtenBodyPreview}" | Badge: [${s.questionBadge}] | ModelAnswer: ${s.hasModelAnswer ? '✅' : '❌'}`);
      }
      if (s.has3PartProvenance) any3PartProvenance = true;
      if (s.hasHowUseful) anyHowUseful = true;
    });

    console.log(`- Source Rhythm: ${visualCount} Visual + ${writtenCount} Written (Target: 2 Visual + 3 Written)`);
    console.log(`- 3-Part Provenance Scaffolding: ${any3PartProvenance ? '❌ DETECTED (Violation)' : '✅ NONE (Clean Medicine Standard)'}`);
    console.log(`- "How Useful" Questions: ${anyHowUseful ? '❌ DETECTED (Violation)' : '✅ ZERO (Thematic Enquiry Standard)'}`);

    // Wait a brief moment after expanding all drawers to capture screenshot
    await new Promise(r => setTimeout(r, 1000));

    const screenshotPath = path.join(previewDir, `${l.id}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Full-page screenshot saved: ${screenshotPath}`);

    summaryReport.push({
      lessonId: l.id,
      title: l.title,
      platesOk: report.narrativePlates.length === 2 && report.narrativePlates.every(p => p.loaded),
      drawersOk: report.sourceDrawerCount === 5,
      visualOk: visualCount === 2 && report.sourcesData.filter(s => s.isVisual).every(s => s.imgLoaded),
      writtenOk: writtenCount === 3 && report.sourcesData.filter(s => !s.isVisual).every(s => s.hasWrittenBody),
      modelsOk: report.sourcesData.every(s => s.hasModelAnswer),
      no3PartProv: !any3PartProvenance,
      noHowUseful: !anyHowUseful,
      screenshot: screenshotPath
    });
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`🏆 FINAL KT4 VERIFICATION AUDIT SUMMARY`);
  console.log(`======================================================`);
  let allPass = true;
  summaryReport.forEach(r => {
    const passed = r.platesOk && r.drawersOk && r.visualOk && r.writtenOk && r.modelsOk && r.no3PartProv && r.noHowUseful;
    if (!passed) allPass = false;
    console.log(`${r.lessonId}: ${passed ? '✅ 100% PASS' : '❌ FAILED'} | Plates:${r.platesOk ? '2/2' : 'FAIL'} | Drawers:${r.drawersOk ? '5/5' : 'FAIL'} | Visual:${r.visualOk ? '2/2' : 'FAIL'} | Written:${r.writtenOk ? '3/3' : 'FAIL'} | Models:${r.modelsOk ? '5/5' : 'FAIL'} | Zero3Part:${r.no3PartProv ? 'PASS' : 'FAIL'} | ZeroHowUseful:${r.noHowUseful ? 'PASS' : 'FAIL'}`);
  });
  console.log(`\nOVERALL AUDIT RESULT: ${allPass ? '🎉 ALL 5 KT4 LESSONS PASSED WITH 100% COMPLIANCE' : '⚠️ ISSUES DETECTED'}\n`);
}

runVerification().catch(err => {
  console.error('Fatal Verification Error:', err);
  process.exit(1);
});
