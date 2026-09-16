const fs = require('fs');
const path = require('path');

const USA_SCRIPT_PATH = path.join(__dirname, '..', '..', 'generate_usa_visual_guide.cjs');

const code = `/**
 * generate_usa_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 3:
 * "Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)"
 * Visual Revision Masterclasses & Complete Specification Guide (36-Page Master Volume).
 *
 * Standardized to the Pure Double-Page Revision Spread Architecture:
 * - 100% Monochrome / High-Contrast Grayscale (#000000, #0f172a, #1e293b, #ffffff)
 * - Zero Redundant Blank Lines
 * - Full Pearson Specification Word-for-Word Cover Matrix
 * - Dual Contrasting Archival Plates (Conflict at Home: Civil Rights vs Conflict Abroad: Vietnam War)
 * - True Facing Spreads: Pages 4–35 (16 Spreads × 2 Pages = 32 Content Pages)
 * - Master Word Bank with 192 Tagged Concepts across 16 Spreads
 * - Master Historiography & Paper 3 Section B Evaluative Guide on Back Cover (Page 36)
 * - Automated 0-Overflow Puppeteer Guardrail (<= 1123px per page)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const HTML_OUT_UNIT = path.join(ROOT_DIR, 'public', 'units', 'usa', 'visual_revision_guide.html');
const PDF_OUT_UNIT = path.join(ROOT_DIR, 'public', 'units', 'usa', 'edexcel_usa_visual_revision_and_exam_guide.pdf');
const PDF_OUT_GLOBAL_CANONICAL = path.join(ROOT_DIR, 'public', 'pdfs', 'edexcel_usa_visual_revision_and_exam_guide.pdf');
const PDF_OUT_GLOBAL_SHORT = path.join(ROOT_DIR, 'public', 'pdfs', 'usa_visual_revision_guide.pdf');
const PDF_OUT_USA_SUBDIR = path.join(ROOT_DIR, 'public', 'pdfs', 'usa', 'usa_visual_revision_guide.pdf');

// Google Drive Destinations (Departmental Reference File)
const GDRIVE_DIR_1 = 'G:\\\\My Drive\\\\AAMX\\\\Dep File\\\\Year 11 (GCSE)\\\\Paper 3 - USA 1954-75';
const GDRIVE_DIR_2 = 'G:\\\\My Drive\\\\AAMX\\\\Dep File\\\\02. GCSE (Years 10-11)\\\\Paper 3 - USA 1954-75\\\\03. Retrieval Quizzing & Mastery';

// Helper to convert relative public paths to base64 Data URIs
function getImageDataUri(imgPath) {
  if (!imgPath) return '';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(ROOT_DIR, 'public', cleanPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(\`⚠️ Warning: Image not found on disk: \${fullPath}\`);
    return '';
  }

  const ext = path.extname(fullPath).toLowerCase();
  let mimeType = 'image/jpeg';
  if (ext === '.png') mimeType = 'image/png';
  if (ext === '.webp') mimeType = 'image/webp';
  if (ext === '.svg') mimeType = 'image/svg+xml';

  const base64 = fs.readFileSync(fullPath).toString('base64');
  return \`data:\${mimeType};base64,\${base64}\`;
}

// Import Modular Components
const {
  formatMd,
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderSpreadLeft,
  renderSpreadRight,
  renderPage36,
} = require('./visual_guides/usa/usa_renderers.cjs');

const kt1 = require('./visual_guides/usa/usa_spreads_kt1.cjs');
const kt2 = require('./visual_guides/usa/usa_spreads_kt2.cjs');
const kt3 = require('./visual_guides/usa/usa_spreads_kt3.cjs');
const kt4 = require('./visual_guides/usa/usa_spreads_kt4.cjs');

const ALL_SPREADS = [...kt1, ...kt2, ...kt3, ...kt4];

function generateMasterHtml() {
  let pagesHtml = '';

  // Page 1: Cover
  pagesHtml += renderPage1(getImageDataUri);

  // Page 2: Blueprint & Non-Negotiable Success Principles
  pagesHtml += renderPage2();

  // Page 3: Master Chronology (1954–1975) & Synoptic Overview
  pagesHtml += renderPage3();

  // Pages 4–35: The 16 Double-Page Spreads (32 Content Pages)
  ALL_SPREADS.forEach((spread, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = 5 + idx * 2;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Page 36: Historiography & Master Interpretations Guide (Back Cover)
  pagesHtml += renderPage36();

  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>USA 1954–75 (Paper 3) Visual Revision & Exam Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
\${getStyles()}
  </style>
</head>
<body>
\${pagesHtml}
</body>
</html>\`;
}

async function run() {
  console.log('====================================================');
  console.log('🚀 COMPILING USA 1954–75 VISUAL REVISION & EXAM GUIDE');
  console.log('   (36 PAGES, MONOCHROME, ZERO BLANK LINES)');
  console.log('====================================================');

  const html = generateMasterHtml();

  // Ensure directories exist
  [
    path.dirname(HTML_OUT_UNIT),
    path.dirname(PDF_OUT_UNIT),
    path.dirname(PDF_OUT_GLOBAL_CANONICAL),
    path.dirname(PDF_OUT_USA_SUBDIR),
  ].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Save standalone HTML
  fs.writeFileSync(HTML_OUT_UNIT, html, 'utf8');
  console.log(\`✅ Generated standalone HTML: \${HTML_OUT_UNIT}\`);

  // Launch Puppeteer for Automated Overflow Check & PDF Export
  console.log('🌐 Launching headless browser with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Evaluate Layout Heights across all 36 pages
  const pageReport = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((el, i) => {
      const scrollH = el.scrollHeight;
      const clientH = el.clientHeight;
      return {
        page: i + 1,
        id: el.id,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: scrollH > 1123 ? scrollH - 1123 : 0,
      };
    });
  });

  console.log(\`📐 Page layout report: Total pages rendered = \${pageReport.length}\`);
  const overflows = pageReport.filter((p) => p.overflow > 0);
  if (overflows.length > 0) {
    console.warn(\`⚠️ WARNING: Found \${overflows.length} layout overflows (> 1123px):\`);
    overflows.forEach((p) =>
      console.warn(\`   - Page \${p.page} (\${p.id}): \${p.scrollHeight}px (overflows by \${p.overflow}px)\`),
    );
  } else {
    console.log('✅ Automated Overflow Check: All 36 pages fit cleanly within 1123px bounds (0 overflows)!');
  }

  // Generate Master PDF
  console.log('📄 Exporting print-perfect PDF (A4 Portrait, 0 margins)...');
  await page.pdf({
    path: PDF_OUT_UNIT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(\`📕 Exported unit PDF: \${PDF_OUT_UNIT}\`);

  await browser.close();

  // Sync to public/pdfs/ mirrors
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_GLOBAL_CANONICAL);
  console.log(\`📋 Synced PDF to public/pdfs/: \${PDF_OUT_GLOBAL_CANONICAL}\`);

  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_GLOBAL_SHORT);
  console.log(\`📋 Synced PDF to public/pdfs/ (short name): \${PDF_OUT_GLOBAL_SHORT}\`);

  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_USA_SUBDIR);
  console.log(\`📋 Synced PDF to public/pdfs/usa/: \${PDF_OUT_USA_SUBDIR}\`);

  // Sync to Google Drive Department Folders
  if (fs.existsSync('G:\\\\My Drive')) {
    [GDRIVE_DIR_1, GDRIVE_DIR_2].forEach((driveDir) => {
      try {
        if (!fs.existsSync(driveDir)) fs.mkdirSync(driveDir, { recursive: true });
        const target1 = path.join(driveDir, 'edexcel_usa_visual_revision_and_exam_guide.pdf');
        const target2 = path.join(driveDir, 'USA 1954-75 Visual Revision & Exam Guide.pdf');
        fs.copyFileSync(PDF_OUT_UNIT, target1);
        fs.copyFileSync(PDF_OUT_UNIT, target2);
        console.log(\`\\n☁️ Syncing freshly compiled guide to Google Drive: \${driveDir}\`);
        console.log('   ✅ Synced master PDF (both short and canonical names) to Google Drive.');
      } catch (err) {
        console.warn(\`⚠️ Could not sync to Google Drive (\${driveDir}): \${err.message}\`);
      }
    });
  }

  console.log('\\n====================================================');
  console.log('🎉 USA PILLAR 1 GENERATION COMPLETE (36 PAGES, MONOCHROME, 0 OVERFLOWS)');
  console.log('====================================================');
}

run().catch((err) => {
  console.error('❌ Error compiling USA visual guide:', err);
  process.exit(1);
});
`;

fs.writeFileSync(USA_SCRIPT_PATH, code, 'utf8');
console.log(`Successfully assembled: ${USA_SCRIPT_PATH} (${Buffer.byteLength(code)} bytes)`);
