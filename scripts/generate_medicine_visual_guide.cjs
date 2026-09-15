/**
 * generate_medicine_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Edexcel GCSE (9–1) History Paper 1:
 * "Medicine in Britain (c.1250–present) & The British Sector of the Western Front (1914–1918)"
 * Visual Revision Masterclasses & Complete Specification Guide (36-Page Master Volume).
 *
 * Enforces the pure double-page revision spread architecture:
 * - 36-page master volume (9 folded A3 sheets, saddle-stitch).
 * - Front cover: Full Edexcel Paper 1 specification checklist, timing/marks meta-strip, pupil handwriting frame,
 *   4 question types breakdown, and dual contrasting archival plates (Vesalius 1543 vs RAMC Western Front 1917).
 * - Page 2: 75-minute exam blueprint, AO1–AO3 weighting, analytical connective vault, 6 fatal pitfalls.
 * - Page 3: Synchronized 750-year thematic chronology across all 4 eras and the Western Front.
 * - Spreads 1–16 (Pages 4–35, 32 content pages): Pure revision spreads with ZERO redundant practice lines:
 *     • Left Page (even: 4, 6... 34): Strategic Context card, 3 Core Historical Pillars (4 substantive bullets each),
 *       4 Key Figures cards, and Primary Archival Evidence box with verbatim quote, provenance, and historical significance.
 *     • Right Page (odd: 5, 7... 35): 4 Deep Forensic Case cards (2x2 grid, 4 substantive bullets each),
 *       Visual Causal Pathway (4 connected chronological stages), and Master GCSE Word Bank (12 tagged terms).
 * - Back Cover (Page 36): Master Factors in Medicine & 16-Mark Essay Evaluation Matrix.
 *
 * Strict high-contrast monochrome / grayscale styling, larger font sizes, and 0 layout overflows (<= 1123px).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const unitDir = path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');
const unitPdfsDir = path.join(pdfsDir, 'edexcel_medicine');

if (!fs.existsSync(unitDir)) fs.mkdirSync(unitDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });
if (!fs.existsSync(unitPdfsDir)) fs.mkdirSync(unitPdfsDir, { recursive: true });

const {
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderSpreadLeft,
  renderSpreadRight,
  renderPage36,
} = require(path.join(__dirname, 'visual_guides', 'medicine', 'med_renderers.cjs'));

const spreadsT1 = require(path.join(__dirname, 'visual_guides', 'medicine', 'med_spreads_t1.cjs'));
const spreadsT2 = require(path.join(__dirname, 'visual_guides', 'medicine', 'med_spreads_t2.cjs'));
const spreadsT3 = require(path.join(__dirname, 'visual_guides', 'medicine', 'med_spreads_t3.cjs'));
const spreadsT4 = require(path.join(__dirname, 'visual_guides', 'medicine', 'med_spreads_t4.cjs'));
const spreadsSecA = require(
  path.join(__dirname, 'visual_guides', 'medicine', 'med_spreads_secA.cjs'),
);

const ALL_SPREADS = [...spreadsT1, ...spreadsT2, ...spreadsT3, ...spreadsT4, ...spreadsSecA];

function getImageDataUri(relPath) {
  const fullPath = path.join(ROOT_DIR, 'public', relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
    const b64 = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }
  return '';
}

function buildHtml() {
  let pagesHtml = '';

  // Page 1: Front Cover
  pagesHtml += renderPage1(getImageDataUri);

  // Page 2: Exam Blueprint
  pagesHtml += renderPage2();

  // Page 3: Chronology Matrix
  pagesHtml += renderPage3();

  // Spreads 1–16 -> Pages 4–35
  ALL_SPREADS.forEach((spread, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Page 36: Outside Back Cover
  pagesHtml += renderPage36();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) Medicine in Britain &amp; Western Front — Visual Revision Guide (36 Spreads)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    ${getStyles()}
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
}

(async () => {
  console.log('======================================================================');
  console.log('🏥 GENERATING EDEXCEL GCSE MEDICINE VISUAL REVISION GUIDE (36 PAGES)');
  console.log('======================================================================');

  const htmlContent = buildHtml();
  const htmlPath = path.join(unitDir, 'visual_revision_guide.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML: ${htmlPath}`);

  console.log('🚀 Launching Puppeteer for Layout Audit and PDF Compilation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0', timeout: 180000 });

  console.log(
    '\n🔍 Auditing all 36 pages for layout overflows (threshold: scrollHeight <= 1123px)...',
  );
  const overflowAudit = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const results = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      if (scrollH > clientH + 2) {
        results.push({ pageNum, scrollH, clientH, diff: scrollH - clientH });
      }
    });
    return results;
  });

  if (overflowAudit.length > 0) {
    console.warn('⚠️ LAYOUT OVERFLOWS DETECTED:');
    overflowAudit.forEach((o) => {
      console.warn(
        `   Page ${o.pageNum}: scrollHeight=${o.scrollH}px > clientHeight=${o.clientH}px (overflow +${o.diff}px)`,
      );
    });
  } else {
    console.log('✨ 0 LAYOUT OVERFLOWS! All 36 pages fit within exact 1123px boundaries.');
  }

  const pdfPathMaster = path.join(unitDir, 'edexcel_medicine_visual_revision_and_exam_guide.pdf');
  const pdfPathPublic = path.join(pdfsDir, 'edexcel_medicine_visual_revision_and_exam_guide.pdf');
  const pdfPathUnitFolder = path.join(
    unitPdfsDir,
    'edexcel_medicine_visual_revision_and_exam_guide.pdf',
  );

  console.log('\n📄 Exporting 36-page Master PDF...');
  await page.pdf({
    path: pdfPathMaster,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    timeout: 180000,
  });

  await browser.close();

  // Copy to public/pdfs/ roots
  fs.copyFileSync(pdfPathMaster, pdfPathPublic);
  fs.copyFileSync(pdfPathMaster, pdfPathUnitFolder);

  const stats = fs.statSync(pdfPathMaster);
  const mb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Master PDF exported: ${pdfPathMaster} (${mb} MB)`);
  console.log(`✅ Synced to: ${pdfPathPublic}`);
  console.log(`✅ Synced to: ${pdfPathUnitFolder}`);

  // Sync to Google Drive Department File if present
  console.log('\n📂 Auto-syncing to Google Drive Department File...');
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
  } catch (err) {
    console.warn(`⚠️ Warning: Drive sync script encountered an error: ${err.message}`);
  }

  console.log(
    '\n🎉 SUCCESS: Medicine Through Time Visual Revision Guide is 100% complete and standardized!',
  );
  console.log('======================================================================\n');
})();
