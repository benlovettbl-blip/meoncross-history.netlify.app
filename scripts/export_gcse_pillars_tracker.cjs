/**
 * export_gcse_pillars_tracker.cjs
 *
 * Generates an executive, print-perfect A4 Landscape PDF:
 * "GCSE History Curriculum: Three Pillars Conversion Ledger & Production Roadmap (2026 Edition)"
 *
 * Provides the department with an authoritative visual matrix tracking all 5 Pearson Edexcel GCSE units
 * across the Three Strategic Pillars:
 *   1. Visual Revision Guide & Cartographic Atlas
 *   2. Mastery Exam Practice Pack
 *   3. Knowledge Retrieval Quiz Compendium
 *
 * Outputs:
 * - public/pdfs/gcse_three_pillars_conversion_ledger.pdf
 * - G:\My Drive\AAMX\Dep File\00_Department_Admin_and_Policies\GCSE_Three_Pillars_Conversion_Ledger_2026.pdf
 * - G:\My Drive\AAMX\Dep File\GCSE_Three_Pillars_Conversion_Ledger_2026.pdf
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const publicPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');

const DRIVE_DIRS = [
  'G:\\My Drive\\AAMX\\Dep File\\00_Department_Admin_and_Policies',
  'G:\\My Drive\\AAMX\\Dep File',
  path.join(ROOT_DIR, 'admin_internal', 'department_files'),
  publicPdfsDir,
];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GCSE History — Three Pillars Conversion Ledger &amp; Roadmap</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 10mm 12mm 10mm 12mm;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 0;
      background: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #000000;
      font-size: 8.2pt;
      line-height: 1.32;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 190mm;
      justify-content: space-between;
    }
    .header-bar {
      border-bottom: 2.5px solid #000000;
      padding-bottom: 5px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 16pt;
      font-weight: 900;
      margin: 0;
      color: #000000;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: -0.3px;
    }
    .header-left p {
      margin: 2px 0 0 0;
      font-size: 8.2pt;
      font-weight: 600;
      color: #475569;
    }
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi-card {
      border: 1.5px solid #000000;
      border-radius: 3px;
      padding: 6px 8px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .kpi-label {
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #475569;
    }
    .kpi-val {
      font-size: 13pt;
      font-weight: 900;
      color: #000000;
      margin: 2px 0;
      font-family: 'Playfair Display', serif;
    }
    .kpi-sub {
      font-size: 6.8pt;
      color: #334155;
      font-weight: 600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1.5px solid #000000;
      font-size: 7.2pt;
      line-height: 1.25;
      flex: 1;
    }
    thead {
      background: #000000;
      color: #ffffff;
    }
    th {
      padding: 5px 6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: left;
      border: 1px solid #000000;
      font-size: 7.2pt;
    }
    td {
      padding: 5px 6px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      color: #000000;
    }
    tbody tr:nth-child(even) {
      background: #f8fafc;
    }
    .badge {
      display: inline-block;
      padding: 1.5px 5px;
      border-radius: 2px;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .badge-done {
      background: #000000;
      color: #ffffff;
    }
    .badge-queue {
      background: #ffffff;
      color: #000000;
      border: 1.2px solid #000000;
    }
    .badge-sched {
      background: #f1f5f9;
      color: #475569;
      border: 1px dashed #94a3b8;
    }
    .unit-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #000000;
      display: block;
      margin-bottom: 2px;
    }
    .unit-meta {
      font-size: 6.8pt;
      color: #475569;
      font-weight: 600;
    }
    .pillar-box {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .pillar-title {
      font-weight: 800;
      font-size: 7.4pt;
      color: #000000;
    }
    .pillar-details {
      color: #334155;
      font-size: 6.8pt;
      line-height: 1.2;
    }
    .file-tag {
      font-family: 'Courier New', monospace;
      font-size: 6.4pt;
      background: #ffffff;
      border: 1px solid #94a3b8;
      padding: 1px 3px;
      border-radius: 2px;
      margin-top: 2px;
      display: inline-block;
      color: #000000;
      font-weight: 700;
    }
    .footer-bar {
      border-top: 1.5px solid #000000;
      padding-top: 4px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.0pt;
      color: #64748b;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div>
      <div class="header-bar">
        <div class="header-left">
          <h1>Meoncross School &bull; History Department</h1>
          <p>GCSE Curriculum Audit: Three Strategic Pillars Conversion Ledger &amp; Production Roadmap (2026 Edition)</p>
        </div>
        <div style="text-align: right;">
          <span style="border: 1.5px solid #000000; padding: 2px 7px; border-radius: 2px; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
            Departmental Curriculum Policy
          </span>
          <div style="font-size: 6.8pt; color: #64748b; margin-top: 2px; font-weight: 600;">Standard: Strictly 1 Master PDF per Pillar</div>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-row">
        <div class="kpi-card">
          <span class="kpi-label">Total GCSE Units</span>
          <div class="kpi-val">5 Units</div>
          <span class="kpi-sub">Pearson Edexcel (9–1)</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Three Pillars Production Ready</span>
          <div class="kpi-val">3 Units (60%)</div>
          <span class="kpi-sub">Middle East, USA, Medicine</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Zero-Clutter Policy</span>
          <div class="kpi-val">Strictly 1 PDF</div>
          <span class="kpi-sub">Per Pillar &bull; Zero Split Files</span>
        </div>
        <div class="kpi-card" style="border-left: 4px solid #000000;">
          <span class="kpi-label">Priority #1 For Conversion</span>
          <div class="kpi-val" style="font-size: 11pt;">Early Elizabethan</div>
          <span class="kpi-sub">Paper 2 (1HI0/B4) &bull; Next in Queue</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Roadmap Phase 2</span>
          <div class="kpi-val" style="font-size: 11pt;">Weimar Germany</div>
          <span class="kpi-sub">Paper 3 (1HI0/31) &bull; 4-4-4-4 Matrix</span>
        </div>
      </div>

      <!-- Master Ledger Table -->
      <table>
        <thead>
          <tr>
            <th style="width: 17%;">GCSE Unit &amp; Paper Spec</th>
            <th style="width: 25%;">Pillar 1: Visual Revision Guide &amp; Atlas</th>
            <th style="width: 25%;">Pillar 2: Mastery Exam Practice Pack</th>
            <th style="width: 20%;">Pillar 3: Recall Quizzing &amp; Vault</th>
            <th style="width: 13%;">Status &amp; Next Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Row 1: CME -->
          <tr>
            <td>
              <span class="unit-title">Conflict in the Middle East, 1945–1995</span>
              <span class="unit-meta">Paper 2 &bull; Option P5 (1HI0/P5)<br>3 Key Topics &bull; 10 Lessons</span>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 36-Page Masterclass &amp; War Atlas</span>
                <span class="pillar-details">
                  &bull; 12 pure double-page revision spreads<br>
                  &bull; 4 full-page cartographic war atlases (1947, 1949, 1967/73, Oslo)<br>
                  &bull; 100% word-for-word verbatim spec cover checklist<br>
                  &bull; Pure monochrome &bull; 0 overflows (&le;1123px)
                </span>
                <span class="file-tag">cme_revision_guide.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 36-Page Complete Exam Pack</span>
                <span class="pillar-details">
                  &bull; Combined KT1, KT2, KT3 single volume<br>
                  &bull; Differentiated stepped ladder &amp; models<br>
                  &bull; Exam Provenance Badges: June 2018, 2019, 2022, 2023 &amp; Forecasts<br>
                  &bull; Pearson 7.4mm ruled response lines
                </span>
                <span class="file-tag">cme_mastery_pack_FULL.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 44-Page Retrieval Compendium</span>
                <span class="pillar-details">
                  &bull; All 200 crucial knowledge recall questions<br>
                  &bull; Memory hacking rules &amp; RAG boxes<br>
                  &bull; The Vault self-marking keys<br>
                  &bull; Even option distribution
                </span>
                <span class="file-tag">cme_recall_quiz_FULL.pdf</span>
              </div>
            </td>
            <td style="text-align: center;">
              <span class="badge badge-done">100% Complete</span><br>
              <span style="font-size: 6.5pt; color: #15803d; font-weight: 700; display: block; margin-top: 3px;">Production Ready</span>
              <span style="font-size: 6.2pt; color: #475569;">3 Master PDFs synced to Drive &amp; Netlify</span>
            </td>
          </tr>

          <!-- Row 2: USA -->
          <tr>
            <td>
              <span class="unit-title">The USA, 1954–75: Conflict at Home &amp; Abroad</span>
              <span class="unit-meta">Paper 3 &bull; Option 33 (1HI0/33)<br>4 Key Topics &bull; 16 Lessons</span>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 36-Page Visual Revision Playbook</span>
                <span class="pillar-details">
                  &bull; 16 double-page spreads across KT1–KT4<br>
                  &bull; Pure 4-4-4-4 exam architecture matrix<br>
                  &bull; Grounded in Hodder textbook facts<br>
                  &bull; Pure monochrome &bull; 0 overflows (&le;1123px)
                </span>
                <span class="file-tag">usa_visual_revision_guide.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 48-Page Master Compendium</span>
                <span class="pillar-details">
                  &bull; Combined KT1–KT4 single volume<br>
                  &bull; 4 full Paper 3 timed exam simulations<br>
                  &bull; 16 primary sources &amp; interpretations<br>
                  &bull; 24 Grade 8/9 exemplars &amp; paragraph formulas
                </span>
                <span class="file-tag">usa_mastery_pack_FULL.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 54-Page Retrieval Compendium</span>
                <span class="pillar-details">
                  &bull; All 320 crucial knowledge recall questions<br>
                  &bull; Spaced recall across all 4 Key Topics<br>
                  &bull; The Vault solutions &amp; RAG trackers<br>
                  &bull; Even option distribution
                </span>
                <span class="file-tag">usa_recall_quiz_FULL.pdf</span>
              </div>
            </td>
            <td style="text-align: center;">
              <span class="badge badge-done">100% Complete</span><br>
              <span style="font-size: 6.5pt; color: #15803d; font-weight: 700; display: block; margin-top: 3px;">Production Ready</span>
              <span style="font-size: 6.2pt; color: #475569;">3 Master PDFs synced to Drive &amp; Netlify</span>
            </td>
          </tr>

          <!-- Row 3: Medicine -->
          <tr>
            <td>
              <span class="unit-title">Medicine in Britain, c1250–present &amp; Western Front</span>
              <span class="unit-meta">Paper 1 &bull; Option 11 (1HI0/11)<br>4 Eras + Section A &bull; 18 Lessons</span>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 36-Page Masterclass Playbook</span>
                <span class="pillar-details">
                  &bull; 18 double-page spreads (all 4 eras + Sec A)<br>
                  &bull; Dual contrasting primary plates (Vesalius vs RAMC)<br>
                  &bull; Standardized typography &bull; High-contrast monochrome<br>
                  &bull; Synoptic 750-year matrix &bull; Factor evaluation
                </span>
                <span class="file-tag">edexcel_medicine_visual_revision_and_exam_guide.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 20-Page Complete Exam Pack</span>
                <span class="pillar-details">
                  &bull; Combined Section A &amp; Section B volume<br>
                  &bull; Sec A: Two 2m features, 8m utility, 4m follow-up<br>
                  &bull; Sec B: 4m similarity/diff, 12m explain, 16m essay<br>
                  &bull; Provenance badges &amp; 8mm exam ruled lines
                </span>
                <span class="file-tag">med_mastery_pack_FULL.pdf</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">✅ 16-Page Retrieval Compendium</span>
                <span class="pillar-details">
                  &bull; All 380 rapid recall questions (WF + 4 eras)<br>
                  &bull; Upgraded to Inter font &amp; monochrome<br>
                  &bull; Micro-checkboxes [ &check; ] [ &cross; ]<br>
                  &bull; Quick-marking answers bank
                </span>
                <span class="file-tag">med_recall_quiz_pack_FULL.pdf</span>
              </div>
            </td>
            <td style="text-align: center;">
              <span class="badge badge-done">Standardized</span><br>
              <span style="font-size: 6.5pt; color: #1e3a8a; font-weight: 700; display: block; margin-top: 3px;">Verified Clean</span>
              <span style="font-size: 6.2pt; color: #475569;">3 Master PDFs synced to Drive</span>
            </td>
          </tr>

          <!-- Row 4: EEE -->
          <tr style="background: #fffbeb;">
            <td>
              <span class="unit-title" style="color: #92400e;">★ Early Elizabethan England, 1558–1588</span>
              <span class="unit-meta">Paper 2 &bull; Option B4 (1HI0/B4)<br>3 Key Topics &bull; 12 Lessons</span>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title" style="color: #92400e;">🟡 Pending Conversion</span>
                <span class="pillar-details">
                  &bull; Scheduled for 24–28 page Visual Revision Guide<br>
                  &bull; 12 double-page spreads across KT1–KT3<br>
                  &bull; Mary Queen of Scots plots, Armada, Elizabethan society
                </span>
                <span class="file-tag" style="border-style: dashed;">eee_revision_guide.pdf (TBC)</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title" style="color: #92400e;">🟡 Pending Conversion</span>
                <span class="pillar-details">
                  &bull; Currently fragmented in 3 separate KT booklets<br>
                  &bull; Needs consolidation to single 36-page master volume<br>
                  &bull; Inject Exam Provenance Badges (June 2018–2024)<br>
                  &bull; Two 2m features, 12m explain, 16m essay models
                </span>
                <span class="file-tag" style="border-style: dashed;">eee_mastery_pack_FULL.pdf (TBC)</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title" style="color: #92400e;">🟡 Pending Conversion</span>
                <span class="pillar-details">
                  &bull; Currently uncompiled<br>
                  &bull; Needs compilation into unified 240-question recall compendium<br>
                  &bull; Micro-checkboxes &amp; Vault answers bank
                </span>
                <span class="file-tag" style="border-style: dashed;">eee_recall_quiz_FULL.pdf (TBC)</span>
              </div>
            </td>
            <td style="text-align: center; background: #fef3c7;">
              <span class="badge badge-queue">PRIORITY #1</span><br>
              <strong style="font-size: 6.8pt; color: #b45309; display: block; margin-top: 3px;">Next in Queue</strong>
              <span style="font-size: 6.2pt; color: #78350f;">Target for Three Pillars unification next session</span>
            </td>
          </tr>

          <!-- Row 5: Germany -->
          <tr>
            <td>
              <span class="unit-title">Weimar &amp; Nazi Germany, 1918–1939</span>
              <span class="unit-meta">Paper 3 &bull; Option 31 (1HI0/31)<br>4 Key Topics &bull; 16 Lessons</span>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">⚪ Scheduled in Roadmap</span>
                <span class="pillar-details">
                  &bull; Scheduled for 36-page 4-4-4-4 Visual Revision Guide<br>
                  &bull; 16 double-page spreads across KT1–KT4<br>
                  &bull; Strictly enforce Paper 3 4-4-4-4 question matrix
                </span>
                <span class="file-tag" style="border-style: dashed;">weimar_revision_guide.pdf (TBC)</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">⚪ Scheduled in Roadmap</span>
                <span class="pillar-details">
                  &bull; Currently split in 4 KT booklets<br>
                  &bull; Needs consolidation to single 48-page master volume<br>
                  &bull; Inject Exam Provenance Badges (June 2018–2024)<br>
                  &bull; Q1 inference, Q2 explain, Q3a utility, Q3d interpretation
                </span>
                <span class="file-tag" style="border-style: dashed;">weimar_mastery_pack_FULL.pdf (TBC)</span>
              </div>
            </td>
            <td>
              <div class="pillar-box">
                <span class="pillar-title">⚪ Scheduled in Roadmap</span>
                <span class="pillar-details">
                  &bull; Currently uncompiled<br>
                  &bull; Needs compilation into unified 320-question recall compendium<br>
                  &bull; Micro-checkboxes &amp; Vault answers bank
                </span>
                <span class="file-tag" style="border-style: dashed;">weimar_recall_quiz_FULL.pdf (TBC)</span>
              </div>
            </td>
            <td style="text-align: center;">
              <span class="badge badge-sched">PRIORITY #2</span><br>
              <span style="font-size: 6.5pt; color: #475569; font-weight: 700; display: block; margin-top: 3px;">Roadmap Phase 2</span>
              <span style="font-size: 6.2pt; color: #64748b;">Follows Elizabethan conversion</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer Strip -->
    <div class="footer-bar">
      <span>Meoncross School History Department &bull; Head of Department: Ben Lovett &bull; GCSE Specification 1HI0 (Pearson Edexcel 9–1)</span>
      <span>Three Pillars Curriculum Standard &bull; Production Ready: 3/5 Units &bull; Next Unit Target: Early Elizabethan England</span>
    </div>
  </div>
</body>
</html>`;

async function exportPdf() {
  console.log('====================================================');
  console.log('📊 GENERATING GCSE THREE PILLARS CONVERSION LEDGER PDF');
  console.log('====================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const targetPdfs = [
    path.join(publicPdfsDir, 'gcse_three_pillars_conversion_ledger.pdf'),
    path.join(publicPdfsDir, 'gcse_curriculum_audit_table.pdf'),
  ];

  for (const p of targetPdfs) {
    await page.pdf({
      path: p,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    });
    console.log(`✅ Saved Master PDF: ${p}`);
  }

  // Mirror to Google Drive Department Folders
  for (const driveDir of DRIVE_DIRS) {
    try {
      if (fs.existsSync(driveDir)) {
        const dest1 = path.join(driveDir, 'GCSE_Three_Pillars_Conversion_Ledger_2026.pdf');
        const dest2 = path.join(driveDir, 'GCSE History Curriculum Audit Table (2026).pdf');
        fs.copyFileSync(targetPdfs[0], dest1);
        fs.copyFileSync(targetPdfs[0], dest2);
        console.log(`☁️ Synced to Google Drive: ${dest1}`);
      }
    } catch (e) {
      console.warn(`⚠️ Warning: Drive sync error: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 GCSE Three Pillars Conversion Ledger generation complete!');
}

if (require.main === module) {
  exportPdf().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { exportPdf };
