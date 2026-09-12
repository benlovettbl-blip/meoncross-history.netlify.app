/**
 * Unified Curriculum Document Sync Script
 *
 * Single Source of Truth (SSOT): public/curriculum_meta.json
 *
 * This script automates the complete curriculum synchronization pipeline:
 * 1. Derives and syncs scripts/curriculum_map.json from curriculum_meta.json.
 * 2. Dynamically generates public/curriculum_overview_tabular.html with exact colspans matching unit terms.
 * 3. Exports public/pdfs/curriculum_overview_tabular.pdf (A4 Landscape) via Puppeteer.
 * 4. Executes generate_scheme_of_work.cjs to compile whole-school SOW HTML and export all 6 SOW PDFs.
 * 5. Rebuilds the curriculum database (build_database.cjs) and pupil tracker (generate_tracker_v2.mjs).
 * 6. Validates asset paths and image integrity.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');
const { PATHS } = require('./config.cjs');

const publicDir = PATHS.PUBLIC;
const pdfsDir = PATHS.PDFS;
const metaPath = path.join(publicDir, 'curriculum_meta.json');
const curriculumMapPath = path.join(__dirname, 'curriculum_map.json');
const tabularHtmlPath = path.join(publicDir, 'curriculum_overview_tabular.html');
const tabularPdfPath = path.join(pdfsDir, 'curriculum_overview_tabular.pdf');

console.log('====================================================');
console.log('🚀 UNIFIED CURRICULUM DOCUMENT SYNC PIPELINE');
console.log('====================================================\n');

// 1. Validate and load curriculum_meta.json
if (!fs.existsSync(metaPath)) {
  console.error('❌ Error: Master metadata not found at:', metaPath);
  process.exit(1);
}

console.log('📖 Step 1: Reading Master Curriculum Metadata...');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

// 2. Synchronize scripts/curriculum_map.json
console.log('🔄 Step 2: Synchronizing scripts/curriculum_map.json...');
const derivedMap = { KS3: {}, KS4: {} };

for (const yg of meta.yearGroups) {
  const isKS4 = yg.ks.includes('4');
  const stageKey = isKS4 ? 'KS4' : 'KS3';
  // Exclude internal draft/revision tokens (starting with _)
  const unitList = yg.units.filter((u) => !u.uid.startsWith('_')).map((u) => u.uid);
  derivedMap[stageKey][yg.year] = unitList;
}

fs.writeFileSync(curriculumMapPath, JSON.stringify(derivedMap, null, 2) + '\n');
console.log('   ✅ scripts/curriculum_map.json synchronized successfully.');

// 3. Dynamically Compile public/curriculum_overview_tabular.html
console.log('📝 Step 3: Compiling public/curriculum_overview_tabular.html...');

function generateTabularHTML(curriculumMeta) {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; }
    
    @page {
      size: A4 landscape;
      margin: 8mm;
    }

    body {
      font-family: 'Outfit', sans-serif;
      font-size: 8.2pt;
      line-height: 1.34;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #fff;
    }

    .cover-page {
      height: 194mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
      border: 8px solid #facc15;
      padding: 40px;
      box-sizing: border-box;
    }
    .cover-badge {
      display: inline-block;
      background: #1b365d;
      color: #facc15;
      font-weight: 700;
      font-size: 11pt;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 6px 18px;
      border-radius: 4px;
      margin-bottom: 24px;
    }
    .cover-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 42pt;
      font-weight: 700;
      color: #1b365d;
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .cover-subtitle {
      font-size: 20pt;
      color: #b45309;
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 30px;
    }
    .cover-divider {
      width: 120px;
      height: 4px;
      background: #facc15;
      margin: 0 auto 30px auto;
    }
    .cover-info {
      font-size: 13pt;
      color: #475569;
      font-weight: 500;
    }
    .cover-meta {
      margin-top: 40px;
      font-size: 10pt;
      color: #64748b;
      display: flex;
      gap: 30px;
    }
    .cover-meta-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .cover-meta-label {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      font-weight: 700;
    }
    .cover-meta-val {
      font-weight: 600;
      color: #1e293b;
      margin-top: 2px;
    }

    .page-sheet {
      page-break-before: always;
      display: flex;
      flex-direction: column;
      height: 194mm;
      box-sizing: border-box;
    }

    .year-header {
      background: linear-gradient(135deg, #0f1f38 0%, #1b365d 100%);
      color: #fff;
      padding: 8px 18px;
      border-radius: 6px 6px 0 0;
      border-bottom: 3px solid #facc15;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .year-header-left {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }
    .year-header h2 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #fff;
      margin: 0;
      font-size: 15pt;
      letter-spacing: 0.3px;
    }
    .year-header .academic-year {
      font-size: 10pt;
      color: #cbd5e1;
      font-weight: 400;
    }
    .year-header .ks-badge {
      font-family: 'Outfit', sans-serif;
      background: #facc15;
      color: #0f1f38;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 3px 10px;
      border-radius: 3px;
    }

    .table-container {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    table.overview-table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      border: 1.5px solid #cbd5e1;
      border-top: none;
    }

    th, td {
      border: 1px solid #cbd5e1;
      vertical-align: top;
      text-align: left;
      padding: 5px 8px;
    }

    th.term-header {
      background: #0f172a;
      color: #f8fafc;
      text-align: center;
      font-weight: 600;
      font-size: 9pt;
      letter-spacing: 0.5px;
      padding: 5px 6px;
      height: 26px;
    }
    th.term-corner {
      background: #1e293b;
      color: #facc15;
      font-weight: 700;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
      vertical-align: middle;
      width: 11%;
    }

    .row-header {
      background: #f1f5f9;
      font-weight: 800;
      width: 11%;
      text-align: center;
      font-size: 8pt;
      color: #0f1f38;
      vertical-align: middle;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 4px 6px;
      border-right: 2px solid #cbd5e1;
    }

    /* Content styling */
    tr.topic-row td {
      background: #eff6ff !important;
      vertical-align: middle;
      border-bottom: 2px solid #bfdbfe;
      height: 34px;
    }
    .topic-title {
      font-weight: 700;
      color: #1e40af;
      display: block;
      font-size: 9.5pt;
      letter-spacing: 0.2px;
    }

    .badge-inline {
      display: inline-block;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: baseline;
    }
    .badge-vocab {
      background: #e0e7ff;
      color: #3730a3;
      border: 1px solid #c7d2fe;
    }
    .badge-skills {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .badge-assess {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    .cell-line {
      margin-bottom: 4px;
    }
    .cell-line:last-child {
      margin-bottom: 0;
    }

    tr:nth-child(even) td:not(.row-header) {
      background: #fbfcfe;
    }
    tr:nth-child(odd) td:not(.row-header) {
      background: #ffffff;
    }

    .page-footer {
      flex-shrink: 0;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #64748b;
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
    }
    .page-footer-brand {
      font-weight: 600;
      color: #1b365d;
    }

    /* Calibrated Font Sizes and Spacing per Year Group */
    .year-7-table { font-size: 9.0pt; line-height: 1.38; }
    .year-7-table td, .year-7-table th { padding: 6px 9px; }
    .year-7-table .topic-title { font-size: 10.5pt; }

    .year-8-table { font-size: 8.8pt; line-height: 1.36; }
    .year-8-table td, .year-8-table th { padding: 5px 8px; }
    .year-8-table .topic-title { font-size: 10.2pt; }

    .year-9-table { font-size: 7.35pt; line-height: 1.25; }
    .year-9-table td, .year-9-table th { padding: 3px 5px; }
    .year-9-table .topic-title { font-size: 8.3pt; }
    .year-9-table .row-header { font-size: 7.2pt; }
    .year-9-table .badge-inline { font-size: 6.2pt; padding: 1px 3px; }

    .year-10-table { font-size: 9.2pt; line-height: 1.40; }
    .year-10-table td, .year-10-table th { padding: 7px 10px; }
    .year-10-table .topic-title { font-size: 11pt; }

    .year-11-table { font-size: 8.5pt; line-height: 1.34; }
    .year-11-table td, .year-11-table th { padding: 5px 7.5px; }
    .year-11-table .topic-title { font-size: 9.8pt; }
  `;

  let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Meoncross School - Whole School History Curriculum Overview</title>
    <style>${css}</style>
  </head>
  <body>
    <div class="cover-page">
      <div class="cover-badge">Academic Curriculum Framework</div>
      <div class="cover-title">Meoncross School<br />History Department</div>
      <div class="cover-subtitle">Whole School Curriculum Overview</div>
      <div class="cover-divider"></div>
      <div class="cover-info">
        Comprehensive Sequential Mapping &bull; Key Stages 3 &amp; 4 (Years 7 – 11) &bull; 2026–2027
      </div>
      <div class="cover-meta">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Head of History</span>
          <span class="cover-meta-val">B. Lovett</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Exam Specification</span>
          <span class="cover-meta-val">Pearson Edexcel GCSE (9-1)</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Academic Year</span>
          <span class="cover-meta-val">2026 – 2027</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Quality Assurance</span>
          <span class="cover-meta-val">Cognita Curriculum Standard</span>
        </div>
      </div>
    </div>
`;

  curriculumMeta.yearGroups.forEach((yg, idx) => {
    const yearClass = `year-${idx + 7}-table`;
    html += `    <div class="page-sheet">
      <div class="year-header">
        <div class="year-header-left">
          <h2>${yg.year} History Curriculum Overview</h2>
          <span class="academic-year">2026–2027</span>
        </div>
        <div class="ks-badge">${yg.ks}</div>
      </div>
      <div class="table-container ${yearClass}">
        <table class="overview-table">
          <tr>
            <th class="term-corner">Term</th>
            <th class="term-header" style="width: 14.83%">Autumn 1</th>
            <th class="term-header" style="width: 14.83%">Autumn 2</th>
            <th class="term-header" style="width: 14.83%">Spring 1</th>
            <th class="term-header" style="width: 14.83%">Spring 2</th>
            <th class="term-header" style="width: 14.83%">Summer 1</th>
            <th class="term-header" style="width: 14.83%">Summer 2</th>
          </tr>
          <tr class="topic-row">
            <td class="row-header">Topic &amp; Enquiry</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `            <td colspan="${span}">
              <span class="topic-title">${unit.shortTitle}</span>
            </td>\n`;
    }
    html += `          </tr>
          <tr>
            <td class="row-header">Summary of Objectives</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `            <td colspan="${span}">
              ${unit.summary}
            </td>\n`;
    }
    html += `          </tr>
          <tr>
            <td class="row-header">Knowledge &amp; Skills</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      const vocabStr = unit.vocab
        ? `<div class="cell-line"><span class="badge-inline badge-vocab">KEY VOCAB</span>${unit.vocab}</div>`
        : '';
      const skillsStr = unit.skills
        ? `<div class="cell-line"><span class="badge-inline badge-skills">SKILLS</span>${unit.skills.join(', ')}</div>`
        : '';
      html += `            <td colspan="${span}">
              ${vocabStr}
              ${skillsStr}
            </td>\n`;
    }
    html += `          </tr>
          <tr>
            <td class="row-header">Assessment</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `            <td colspan="${span}">
              <span class="badge-inline badge-assess">ASSESSMENT</span>${unit.assessment}
            </td>\n`;
    }
    html += `          </tr>
          <tr>
            <td class="row-header">SMSC</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `            <td colspan="${span}">${unit.smsc}</td>\n`;
    }
    html += `          </tr>
          <tr>
            <td class="row-header">Careers</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `            <td colspan="${span}">${unit.careers || ''}</td>\n`;
    }
    html += `          </tr>
        </table>
      </div>
      <div class="page-footer">
        <span class="page-footer-brand">Meoncross School History Department &bull; Whole School Curriculum Map 2026–2027</span>
        <span>${yg.year} &bull; ${yg.ks} &bull; Page ${idx + 2} of 6</span>
      </div>
    </div>
`;
  });

  html += `  </body>\n</html>\n`;
  return html;
}

const tabularHtml = generateTabularHTML(meta);
fs.writeFileSync(tabularHtmlPath, tabularHtml, 'utf8');
console.log('   ✅ public/curriculum_overview_tabular.html generated successfully.');

// 4. Puppeteer Exports & SOW Regeneration
(async () => {
  console.log('\n📄 Step 4: Exporting Tabular Overview PDF (A4 Landscape)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(require('url').pathToFileURL(tabularHtmlPath).href, {
      waitUntil: 'networkidle0',
    });

    await page.pdf({
      path: tabularPdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
    });
    console.log('   ✅ Success! Tabular Overview PDF saved to:', tabularPdfPath);
    await page.close();
  } catch (err) {
    console.error('❌ Error exporting Tabular Overview PDF:', err);
  } finally {
    await browser.close();
  }

  // 5. Execute SOW PDF and Overview generation
  console.log('\n📚 Step 5: Generating Scheme of Work Documents & PDFs...');
  try {
    execSync('node scripts/generate_scheme_of_work.cjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    console.log('   ✅ All Schemes of Work PDFs generated successfully.');
  } catch (err) {
    console.error('❌ Error in generate_scheme_of_work.cjs:', err);
    process.exit(1);
  }

  // 6. Build Database & Tracker
  console.log('\n🗄️ Step 6: Building Database & Pupil Tracker...');
  try {
    execSync('node scripts/build_database.cjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    execSync('node scripts/generate_tracker_v2.mjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    console.log('   ✅ Database & Pupil Tracker synced.');
  } catch (err) {
    console.error('❌ Error updating database or tracker:', err);
    process.exit(1);
  }

  // 7. Verification checks
  console.log('\n🔍 Step 7: Performing Integrity & Verification Checks...');
  try {
    execSync('node scripts/verify_images.cjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    execSync('node scripts/verify_asset_paths.cjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    execSync('node scripts/verify_vault_answers.cjs', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    console.log('   ✅ Asset, Image, and Vault Answer checks passed cleanly.');
  } catch (err) {
    console.error('❌ Error in asset/image verification:', err);
    process.exit(1);
  }

  // 8. Synchronize Admin PDFs to Google Drive Department File
  console.log('\n📂 Step 8: Syncing Admin PDFs to Google Drive Department File...');
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
  } catch (err) {
    console.warn('⚠️ Warning syncing to Google Drive:', err.message);
  }

  console.log('\n====================================================');
  console.log('🎉 UNIFIED CURRICULUM SYNC COMPLETED SUCCESSFULLY!');
  console.log('====================================================\n');
})();
