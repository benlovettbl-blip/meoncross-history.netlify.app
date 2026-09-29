/**
 * generate_cme_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2 (Period Study):
 * "Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)"
 * Complete Revision Guide & Cartographic Specification Masterclass (20-Page Master Volume).
 *
 * Commercial Saddle-Stitch Format (20 Pages = 5 folded A3 sheets, 0 blank pages, 0 overflows):
 * - Page 1: Official Examination Cover with Candidate Box, Photos & Verbatim Spec Checklist
 * - Pages 2 & 3: Period Study Blueprint & 50-Year Master Chronology Matrix (1945–1995)
 * - Pages 4 & 5: Master Cartographic Atlas 1 — 1947 UN Partition (Res 181) & 1948–49 War
 * - Pages 6–17: 12 Single-Page Specification Cheat Sheets (Lessons 1 to 12)
 * - Pages 18 & 19: Master Cartographic Atlas 2 — 1967 Six Day War (Occupied Territories) & 1995 Oslo II
 * - Page 20: Master Historiographical Debates (Traditional vs New Historians) & Final Revision Checklist
 *
 * Strict Monochrome / Black & White Styling:
 * - Designed for optimal high-contrast professional printing with zero color reliance.
 * - 1-Page non-repetitive Specification Cheat Sheets optimized for lower-ability pupils.
 * - Memory Vault numerical stats, 4-step dual-coded causal sequence ribbons, and plain-English vocabulary.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const {
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderPage4,
  renderPage5,
  renderSpecificationCheatSheet,
  renderPage18,
  renderPage19,
  renderPage20,
} = require('./visual_guides/cme/cme_renderers.cjs');

const { autoCalibrateTextbook } = require('./auto_calibrate_engine.cjs');

const kt1Spreads = require('./visual_guides/cme/cme_spreads_kt1.cjs');
const kt2Spreads = require('./visual_guides/cme/cme_spreads_kt2.cjs');
const kt3Spreads = require('./visual_guides/cme/cme_spreads_kt3.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const PDF_OUT_PUBLIC_LEGACY = path.join(
  ROOT_DIR,
  'public',
  'pdfs',
  'cme_visual_revision_guide.pdf',
);
const PDF_OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_revision_guide.pdf');
const PDF_OUT_PUBLIC_CME = path.join(
  ROOT_DIR,
  'public',
  'pdfs',
  'cme_new',
  'cme_revision_guide.pdf',
);
const PDF_OUT_PUBLIC_CME_LEGACY = path.join(
  ROOT_DIR,
  'public',
  'pdfs',
  'cme_new',
  'cme_visual_revision_guide.pdf',
);
const PDF_OUT_UNIT = path.join(
  ROOT_DIR,
  'public',
  'units',
  'cme_new',
  'edexcel_cme_revision_guide.pdf',
);
const PDF_OUT_UNIT_LEGACY = path.join(
  ROOT_DIR,
  'public',
  'units',
  'cme_new',
  'edexcel_cme_visual_revision_and_exam_guide.pdf',
);
const HTML_OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'revision_guide.html');
const HTML_OUT_PUBLIC_LEGACY = path.join(
  ROOT_DIR,
  'public',
  'units',
  'cme_new',
  'visual_revision_guide.html',
);

const GDRIVE_DIRS = [
  'G:\\My Drive\\AAMX\\Dep File\\Year 10 (GCSE)\\Paper 2 - Conflict in the Middle East',
  'G:\\My Drive\\AAMX\\Dep File\\02. GCSE (Years 10-11)\\Paper 2 - Conflict in the Middle East\\03. Retrieval Quizzing & Mastery',
];

function generateFullHTML() {
  let pagesHtml = '';

  // Page 1: Official Examination Cover with Candidate Box, Photos & Large Spec Checklist
  pagesHtml += renderPage1();

  // Page 2: Paper 2 Period Study Blueprint & 4 Non-Negotiable Success Principles
  pagesHtml += renderPage2();

  // Page 3: Thematic Chronology Matrix (1945–1995) + Examiner Synoptic Takeaway
  pagesHtml += renderPage3();

  // Pages 4 & 5: Master Cartographic Atlas 1 (1947 UN Partition vs. 1948–49 Arab Invasions)
  pagesHtml += renderPage4();
  pagesHtml += renderPage5();

  // Pages 6–17: 12 Single-Page Specification Cheat Sheets (Lessons 1 to 12)
  const allSpreads = [...kt1Spreads, ...kt2Spreads, ...kt3Spreads];
  allSpreads.forEach((spread, idx) => {
    const pageNum = 6 + idx;
    pagesHtml += renderSpecificationCheatSheet(spread, pageNum);
  });

  // Page 18: Master Cartographic Atlas Plate 3 (1967 Six Day War & Occupied Territories)
  pagesHtml += renderPage18();

  // Page 19: Master Cartographic Atlas Plate 4 (1995 Oslo II Administrative Division)
  pagesHtml += renderPage19();

  // Page 20: Master Historiographical Debates & Final Revision Checklist
  pagesHtml += renderPage20();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995 &bull; Complete Revision Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
  <style>
    ${getStyles()}
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
}

// =============================================================================
// COMPILATION & PDF GENERATION
// =============================================================================
async function run() {
  console.log('====================================================');
  console.log('🚀 COMPILING CME REVISION GUIDE (20 PAGES, SPECIFICATION CHEAT SHEETS, MONOCHROME)');
  console.log('====================================================');

  const html = generateFullHTML();
  fs.writeFileSync(HTML_OUT_PUBLIC, html);
  fs.writeFileSync(HTML_OUT_PUBLIC_LEGACY, html);
  console.log(`✅ Generated standalone HTML: ${HTML_OUT_PUBLIC}`);

  console.log('🌐 Launching headless browser with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(HTML_OUT_PUBLIC).href, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Recommendation 2: Run In-Memory Layout & Typographical Balancing Engine
  console.log('⚙️ Running in-memory auto-calibration engine before capturing PDF...');
  const calibLog = await autoCalibrateTextbook(page, { pageSelector: '.page' });
  if (calibLog && calibLog.length > 0) {
    console.log(`   ✨ Calibrated ${calibLog.length} element adjustments.`);
  }

  // Automated Overflow & Dead-Space Void Check (Strict 1123px Limit across all 20 pages)
  const layoutAudit = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const overflows = [];
    const voids = [];
    pages.forEach((p, idx) => {
      const pageNum = p.getAttribute('data-page') || idx + 1;
      const scrollHeight = p.scrollHeight;
      const footer = p.querySelector('.page-footer');
      let gapAboveFooter = 0;
      if (footer) {
        const prev = footer.previousElementSibling;
        if (prev) {
          const prevRect = prev.getBoundingClientRect();
          const footerRect = footer.getBoundingClientRect();
          gapAboveFooter = Math.round(footerRect.top - prevRect.bottom);
        }
      }

      if (scrollHeight > 1124) {
        overflows.push({
          pageNum,
          id: p.id,
          scrollHeight,
          overflowBy: scrollHeight - 1123,
        });
      }
      if (gapAboveFooter > 35 && pageNum > 1) {
        voids.push({
          pageNum,
          gapAboveFooter,
        });
      }
    });
    return { totalPages: pages.length, overflows, voids };
  });

  console.log(`📐 Page layout report: Total pages rendered = ${layoutAudit.totalPages}`);
  if (layoutAudit.overflows.length > 0) {
    const details = layoutAudit.overflows
      .map(
        (o) =>
          `Page ${o.pageNum} (#${o.id}): ${o.scrollHeight}px (overflows by +${o.overflowBy}px)`,
      )
      .join('\n');
    throw new Error(`PDF Generation halted due to page overflow:\n${details}`);
  }
  console.log(
    '✅ Automated Overflow Check: All 20 pages fit cleanly within 1123px bounds (0 overflows)!',
  );
  if (layoutAudit.voids.length > 0) {
    console.log(
      `ℹ️ Large dead space report: ${layoutAudit.voids.length} pages have gaps > 35px:`,
      layoutAudit.voids,
    );
  } else {
    console.log(
      '✅ Automated Space Utilization: All pages have < 35px dead gap (optimal layout budget)!',
    );
  }

  // Export PDF to unit directory
  await page.pdf({
    path: PDF_OUT_UNIT,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  console.log(`📕 Exported unit PDF: ${PDF_OUT_UNIT}`);

  // Maintain legacy path copy
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_UNIT_LEGACY);

  // Mirror to public/pdfs (strictly 1 master PDF)
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_PUBLIC);
  console.log(`📋 Synced master PDF to public/pdfs/: ${PDF_OUT_PUBLIC}`);

  const publicCmeDir = path.dirname(PDF_OUT_PUBLIC_CME);
  if (!fs.existsSync(publicCmeDir)) fs.mkdirSync(publicCmeDir, { recursive: true });
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_PUBLIC_CME);
  console.log(`📋 Synced PDF to public/pdfs/cme_new/: ${PDF_OUT_PUBLIC_CME}`);

  // Mirror to Google Drive Department File
  const canonicalName = 'Conflict in the Middle East Revision Guide.pdf';
  const legacyCanonicalName = 'Conflict in the Middle East Visual Revision & Exam Guide.pdf';
  for (const driveDir of GDRIVE_DIRS) {
    try {
      if (fs.existsSync(driveDir)) {
        console.log(`\n☁️ Syncing freshly compiled guide to Google Drive: ${driveDir}`);
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, 'cme_revision_guide.pdf'));
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, 'cme_visual_revision_guide.pdf'));
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, canonicalName));
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, legacyCanonicalName));
        console.log(`   ✅ Synced master PDF (both revision and legacy names) to Google Drive.`);
      }
    } catch (err) {
      console.warn(`   ⚠️ Could not copy to ${driveDir}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n====================================================');
  console.log(
    '🎉 CME 20-PAGE SPECIFICATION REVISION GUIDE GENERATION COMPLETE (0 OVERFLOWS, 4 MAP ATLASES)',
  );
  console.log('====================================================');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { run, generateFullHTML };
