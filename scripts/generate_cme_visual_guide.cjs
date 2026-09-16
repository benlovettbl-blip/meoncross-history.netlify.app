/**
 * generate_cme_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2 (Period Study):
 * "Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)"
 * Complete Revision Guide & Cartographic Specification Masterclass (32-Page Master Volume).
 *
 * Commercial Saddle-Stitch Format (32 Pages = 8 folded A3 sheets, 0 blank pages, 0 overflows):
 * - Page 1: Official Examination Cover with Candidate Box, Photos & Verbatim Spec Checklist
 * - Pages 2 & 3: Period Study Blueprint & 50-Year Master Chronology Matrix (1945–1995)
 * - Pages 4 & 5: Master Cartographic Atlas 1 — 1947 UN Partition (Res 181) vs. 1949 Armistice Green Line
 * - Pages 6–29: 12 Pure Double-Page Revision Spreads (100% core knowledge, causal pathways & GCSE Word Banks)
 * - Pages 30 & 31: Master Cartographic Atlas 2 — 1967 Six Day War (Occupied Territories) vs. 1995 Oslo West Bank
 * - Page 32: Master Historiographical Debates (Traditional vs New Historians) & Final Revision Checklist
 *
 * Strict Monochrome / Black & White Styling:
 * - Designed for optimal high-contrast professional printing with zero color reliance.
 * - Enriched with 100% of the facts, metrics, and demographics from the official Pearson Revision Guide.
 * - Zero exam questions, zero model answers.
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
  renderPage14,
  renderPage15,
  renderPage24,
  renderPage25,
  renderPage34,
  renderPage35,
  renderPage36,
  renderSpreadLeft,
  renderSpreadRight,
} = require('./visual_guides/cme/cme_renderers.cjs');

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

  // Pages 6–13: Key Topic 1 Spreads (4 Spreads = 8 Pages)
  kt1Spreads.forEach((spread, idx) => {
    const leftPageNum = 6 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Pages 14 & 15: Master Cartographic Atlas 2 (1967 Six Day War vs. 1973 Yom Kippur War)
  pagesHtml += renderPage14();
  pagesHtml += renderPage15();

  // Pages 16–23: Key Topic 2 Spreads (4 Spreads = 8 Pages)
  kt2Spreads.forEach((spread, idx) => {
    const leftPageNum = 16 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Pages 24 & 25: Master Cartographic Atlas 3 (1982 Lebanon War vs. 1995 Oslo II)
  pagesHtml += renderPage24();
  pagesHtml += renderPage25();

  // Pages 26–33: Key Topic 3 Spreads (4 Spreads = 8 Pages)
  kt3Spreads.forEach((spread, idx) => {
    const leftPageNum = 26 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Pages 34 & 35: Master Cartographic Atlas 4 (1949 Green Line vs. Regional Geopolitics)
  pagesHtml += renderPage34();
  pagesHtml += renderPage35();

  // Page 36: Master Historiographical Debates & Final Revision Checklist
  pagesHtml += renderPage36();

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
  console.log('🚀 COMPILING CME REVISION GUIDE (36 PAGES, CARTOGRAPHIC ATLAS, MONOCHROME)');
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

  // Automated Overflow Check (Strict 1123px Limit across all 36 pages)
  const overflowReports = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const overflows = [];
    pages.forEach((p, idx) => {
      const pageNum = p.getAttribute('data-page') || idx + 1;
      const scrollHeight = p.scrollHeight;
      if (scrollHeight > 1124) {
        overflows.push({
          pageNum,
          id: p.id,
          scrollHeight,
          overflowBy: scrollHeight - 1123,
        });
      }
    });
    return { totalPages: pages.length, overflows };
  });

  console.log(`📐 Page layout report: Total pages rendered = ${overflowReports.totalPages}`);
  if (overflowReports.overflows.length > 0) {
    const details = overflowReports.overflows
      .map(
        (o) =>
          `Page ${o.pageNum} (#${o.id}): ${o.scrollHeight}px (overflows by +${o.overflowBy}px)`,
      )
      .join('\n');
    throw new Error(`PDF Generation halted due to page overflow:\n${details}`);
  }
  console.log(
    '✅ Automated Overflow Check: All 36 pages fit cleanly within 1123px bounds (0 overflows)!',
  );

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
  console.log('🎉 CME 36-PAGE REVISION GUIDE GENERATION COMPLETE (0 OVERFLOWS, 4 MAP ATLASES)');
  console.log('====================================================');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { run, generateFullHTML };
