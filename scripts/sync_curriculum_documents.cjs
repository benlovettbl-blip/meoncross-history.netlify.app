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
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

      * {
        box-sizing: border-box;
      }
      body {
        font-family: 'Outfit', sans-serif;
        font-size: 8.5pt;
        color: #1e293b;
        margin: 0;
        padding: 0;
        line-height: 1.45;
      }

      .cover-page {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: #f8fafc;
        border: 10px solid #facc15;
        padding: 40px;
      }
      .cover-title {
        font-family: 'Playfair Display', serif;
        font-size: 42pt;
        font-weight: 700;
        color: #1b365d;
        margin-bottom: 15px;
      }
      .cover-subtitle {
        font-size: 20pt;
        color: #facc15;
        font-family: 'Outfit', sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 3px;
      }
      .cover-info {
        margin-top: 30px;
        font-size: 13pt;
        color: #475569;
      }

      .page-break {
        page-break-before: always;
      }
      .container {
        padding: 15px 20px;
      }

      .year-header {
        background: #1b365d;
        color: #fff;
        padding: 12px 20px;
        border-radius: 6px;
        margin-bottom: 15px;
        border-bottom: 3px solid #facc15;
        text-align: center;
      }
      .year-header h2 {
        font-family: 'Playfair Display', serif;
        color: #fff;
        margin: 0;
        font-size: 16pt;
      }
      .year-header .ks {
        font-family: 'Outfit', sans-serif;
        color: #facc15;
        font-size: 9pt;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-top: 3px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th,
      td {
        border: 1px solid #cbd5e1;
        padding: 7px 9px;
        vertical-align: top;
      }
      th {
        background: #0f172a;
        color: #fff;
        text-align: center;
        font-weight: 600;
        font-size: 9pt;
        letter-spacing: 0.5px;
      }
      .row-header {
        background: #e8edf5;
        font-weight: 700;
        width: 11%;
        text-align: left;
        font-size: 8pt;
        color: #0f172a;
        vertical-align: middle;
      }
      tr {
        page-break-inside: avoid;
      }
      tr:nth-child(odd) td:not(.row-header) {
        background: #ffffff;
      }
      tr:nth-child(even) td:not(.row-header) {
        background: #f8fafc;
      }
      td strong {
        color: #1b365d;
      }
      td ul {
        padding-left: 14px;
        margin: 2px 0;
      }
      td li {
        margin-bottom: 2px;
      }

      tr.topic-row td {
        background: #eff6ff !important;
        font-weight: 600;
      }
      tr.topic-row td strong {
        color: #1d4ed8;
        font-size: 9.5pt;
      }
  `;

  let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>History Curriculum Overview 2026-2027</title>
    <style>${css}    </style>
  </head>
  <body>
    <div class="cover-page">
      <div class="cover-title">Meoncross School<br />History Department</div>
      <div class="cover-subtitle">Curriculum Overview</div>
      <div class="cover-info">
        Key Stages 3 &amp; 4 &nbsp;|&nbsp; Years 7 – 11 &nbsp;|&nbsp; 2026-2027
      </div>
    </div>
`;

  curriculumMeta.yearGroups.forEach((yg, idx) => {
    html += `    <div class="page-break"></div>
    <div class="container">
      <div class="year-header">
        <h2>${yg.year} – History Curriculum Overview (2026-2027)</h2>
        <div class="ks">${yg.ks}</div>
      </div>
      <table>
        <tr>
          <th class="row-header"></th>
          <th style="width: 14.8%">Autumn 1</th>
          <th style="width: 14.8%">Autumn 2</th>
          <th style="width: 14.8%">Spring 1</th>
          <th style="width: 14.8%">Spring 2</th>
          <th style="width: 14.8%">Summer 1</th>
          <th style="width: 14.8%">Summer 2</th>
        </tr>
        <tr class="topic-row">
          <td class="row-header">Topic</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `          <td colspan="${span}"><strong>${unit.shortTitle}</strong></td>\n`;
    }
    html += `        </tr>
        <tr>
          <td class="row-header">Summary of Objectives</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `          <td colspan="${span}">
            ${unit.summary}
          </td>\n`;
    }
    html += `        </tr>
        <tr>
          <td class="row-header">Knowledge & Skills</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      const vocabStr = unit.vocab ? `<strong>Key Vocab:</strong> ${unit.vocab}<br />` : '';
      const skillsStr = unit.skills ? `<strong>Skills:</strong> ${unit.skills.join(', ')}` : '';
      html += `          <td colspan="${span}">
            ${vocabStr}${skillsStr}
          </td>\n`;
    }
    html += `        </tr>
        <tr>
          <td class="row-header">Assessment</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `          <td colspan="${span}">
            ${unit.assessment}
          </td>\n`;
    }
    html += `        </tr>
        <tr>
          <td class="row-header">SMSC</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `          <td colspan="${span}">
            ${unit.smsc}
          </td>\n`;
    }
    html += `        </tr>
        <tr>
          <td class="row-header">Careers</td>
`;
    for (const unit of yg.units) {
      const span = unit.terms.length;
      html += `          <td colspan="${span}">${unit.careers || ''}</td>\n`;
    }
    html += `        </tr>
      </table>
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
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
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

  console.log('\n====================================================');
  console.log('🎉 UNIFIED CURRICULUM SYNC COMPLETED SUCCESSFULLY!');
  console.log('====================================================\n');
})();
