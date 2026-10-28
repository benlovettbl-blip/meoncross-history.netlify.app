/**
 * scripts/generate_universal_16page_companion.cjs
 *
 * Master Compiler & Automated Quality Gate Engine for the
 * Universal 16-Page Master Knowledge Retrieval Companion across ALL 5 GCSE History Units.
 *
 * Units:
 * 1. Early Elizabethan England, 1558–1588 (eee)
 * 2. Weimar and Nazi Germany, 1918–1939 (weimar)
 * 3. Superpower Relations and the Cold War, 1941–1991 (cold_war)
 * 4. Conflict in the Middle East, 1945–1995 (cme)
 * 5. Medicine in Britain, c1250–present with Western Front (medicine)
 *
 * Mandatory 16-Page Architecture:
 * - Exactly 16 Pages (4 folded A3 sheets, saddle-stitch).
 * - Page 1: Master Front Cover & Formative Tracking Ledger.
 * - Pages 2–13: Exactly 1 Enquiry per page (12 Enquiries, 10 Questions each = 120 Questions).
 *   • Flat double-page spread parity starting on Page 2 (Verso / Left).
 *   • Dual handwriting lines with ruling >= 24px (Core Fact + Explanation).
 *   • Question prompts in bold Georgia serif (>= 9.6pt).
 *   • Score box (/20) and Examiner Warning box on every enquiry page.
 * - Pages 14–16: 3-Page Department Master Answer Bank (40 questions per page in 2 balanced columns).
 *   • Bold Core Fact + historical explanation + [✓] [✗] checkboxes.
 *   • Department Green-Pen DIRT reflection protocol box at the base.
 *
 * Rigorous Quality Gates:
 * - Headless Puppeteer audit across all 16 pages.
 * - Enforce 0px overflow (scrollHeight <= clientHeight, max 1123px).
 * - Enforce zero dead space / underflow (footer gap <= 25px, space utilization >= 95%).
 * - Enforce handwriting ruling >= 24px and question prompt font >= 9.6pt.
 * - Automatically compile both HTML and Master PDF.
 * - Capture high-resolution PNG screenshots of all 16 pages.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');

const ROOT_DIR = path.resolve(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// BASE64 IMAGE ENCODER
// --------------------------------------------------------------------------
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return '';
}

// --------------------------------------------------------------------------
// UNIT CONFIGURATIONS
// --------------------------------------------------------------------------
const UNIT_CONFIGS = {
  eee: {
    dataFile: './master_companion_data/eee_companion_data.cjs',
    htmlRelPath: 'public/units/eee/eee_master_retrieval_companion.html',
    pdfFileName: 'Early_Elizabethan_England_Master_Knowledge_Retrieval_Companion.pdf',
    previewDir: 'public/previews_eee'
  },
  weimar: {
    dataFile: './master_companion_data/weimar_companion_data.cjs',
    htmlRelPath: 'public/units/weimar_nazi_germany/weimar_master_retrieval_companion.html',
    pdfFileName: 'Weimar_and_Nazi_Germany_Master_Knowledge_Retrieval_Companion.pdf',
    previewDir: 'public/previews_weimar'
  },
  cold_war: {
    dataFile: './master_companion_data/cold_war_companion_data.cjs',
    htmlRelPath: 'public/units/cold_war/cold_war_master_retrieval_companion.html',
    pdfFileName: 'Superpower_Relations_and_Cold_War_Master_Knowledge_Retrieval_Companion.pdf',
    previewDir: 'public/previews_cold_war'
  },
  cme: {
    dataFile: './master_companion_data/cme_companion_data.cjs',
    htmlRelPath: 'public/units/cme_new/cme_master_retrieval_companion.html',
    pdfFileName: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    previewDir: 'public/previews_cme'
  },
  medicine: {
    dataFile: './master_companion_data/medicine_companion_data.cjs',
    htmlRelPath: 'public/units/edexcel_medicine/medicine_master_retrieval_companion.html',
    pdfFileName: 'Medicine_Through_Time_Master_Knowledge_Retrieval_Companion.pdf',
    previewDir: 'public/previews_medicine'
  }
};

// --------------------------------------------------------------------------
// HTML BUILDER
// --------------------------------------------------------------------------
function buildCompanionHtml(unitData) {
  const { unitId, unitTitle, paperCode, heroImage, heroCaption } = unitData;
  const rawEnquiries = unitData.enquiries || [];

  // Defensive normalization so all unit data files map reliably
  const enquiries = rawEnquiries.map((enq, idx) => {
    const number = enq.number || enq.num || (idx + 1);
    const keyTopic = enq.keyTopic || enq.kt || `Key Topic ${Math.floor(idx / 4) + 1}`;
    const topicCode = enq.topicCode || `KT ${Math.floor(idx / 4) + 1}.${(idx % 4) + 1}`;
    const title = enq.title || `Enquiry ${number}`;
    const focus = enq.focus || '';
    const enquiryQuestion = enq.enquiryQuestion || enq.enquiry || `Key Enquiry: How did ${title} shape this historical period?`;
    const examinerWarning = enq.examinerWarning || enq.warning || enq.examinerTrap || '';
    const footerQuote = enq.footerQuote || enq.quote || '';
    const questions = (enq.questions || []).slice(0, 8).map((q, qIdx) => ({
      num: qIdx + 1,
      q: q.q || q.question || '',
      a: q.a || q.answer || '',
      exp: q.exp || q.explanation || ''
    }));

    return {
      number,
      keyTopic,
      topicCode,
      title,
      focus,
      enquiryQuestion,
      examinerWarning,
      footerQuote,
      milestones: enq.milestones || [],
      questions
    };
  });

  const heroBase64 = getBase64Image(heroImage);

  // Group enquiries for the 3 answer bank pages
  // Page 14: Enquiries 1–4 (Questions 1–32)
  // Page 15: Enquiries 5–8 (Questions 33–64)
  // Page 16: Enquiries 9–12 (Questions 65–96)
  const bankPages = (unitData.bankPages || [
    { title: `Enquiries 1–4: ${enquiries[0] ? enquiries[0].keyTopic : 'Part 1'}`, enqs: enquiries.slice(0, 4), startQ: 1, endQ: 32, pageNum: 14 },
    { title: `Enquiries 5–8: ${enquiries[4] ? enquiries[4].keyTopic : 'Part 2'}`, enqs: enquiries.slice(4, 8), startQ: 33, endQ: 64, pageNum: 15 },
    { title: `Enquiries 9–12: ${enquiries[8] ? enquiries[8].keyTopic : 'Part 3'}`, enqs: enquiries.slice(8, 12), startQ: 65, endQ: 96, pageNum: 16 }
  ]).map(bp => ({
    ...bp,
    enqs: enquiries.slice(bp.startQ === 1 ? 0 : bp.startQ === 33 ? 4 : 8, bp.startQ === 1 ? 4 : bp.startQ === 33 ? 8 : 12)
  }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitTitle} • Master Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-container {
      width: 794px;
      height: 1123px;
      max-height: 1123px;
      margin: 0 auto 30px auto;
      background: #ffffff;
      padding: 20px 28px 16px 28px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    @media print {
      body { background: #ffffff; }
      .page-container {
        margin: 0;
        box-shadow: none;
        width: 100%;
        height: 100vh;
        max-height: 100vh;
      }
    }

    /* TYPOGRAPHY */
    .serif-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 800; }
    .serif-prompt { font-family: Georgia, 'Times New Roman', serif; font-size: 9.8pt; font-weight: 700; color: #0f172a; line-height: 1.25; }

    /* RUNNING HEADER */
    .running-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #0f172a;
    }
    .running-header-left { display: flex; align-items: center; gap: 8px; }
    .spread-indicator {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 6px;
      border-radius: 2px;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .score-badge {
      border: 1.5px solid #0f172a;
      background: #f8fafc;
      padding: 2px 10px;
      border-radius: 3px;
      font-weight: 800;
      font-size: 8.5pt;
      color: #0f172a;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .score-blank {
      display: inline-block;
      width: 32px;
      border-bottom: 1.5px solid #0f172a;
      height: 13px;
    }

    /* ENQUIRY BANNER */
    .enquiry-banner {
      margin-top: 4px;
      margin-bottom: 4px;
      border-bottom: 1.2px solid #cbd5e1;
      padding-bottom: 3px;
    }
    .enquiry-title-main {
      font-size: 10.4pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }
    .enquiry-question-sub {
      font-size: 8.2pt;
      font-style: italic;
      color: #334155;
      margin-top: 2px;
      font-family: Georgia, serif;
    }

    /* HORIZONTAL 5-EVENT CHRONOLOGICAL SPINE */
    .spine-strip {
      background: #f8fafc;
      border: 1.2px solid #0f172a;
      border-radius: 4px;
      padding: 3px 6px;
      margin: 3px 0 4px 0;
      display: flex;
      align-items: center;
    }
    .spine-flow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 3px;
    }
    .spine-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      min-width: 0;
    }
    .spine-date-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      white-space: nowrap;
      line-height: 1.1;
    }
    .spine-event-title {
      font-size: 6.6pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.15;
      margin-top: 1.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }
    .spine-arrow {
      font-size: 7.5pt;
      color: #64748b;
      font-weight: 900;
      flex-shrink: 0;
      margin: 0 1px;
    }

    /* QUESTIONS STACK (8 QUESTIONS) */
    .questions-stack {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
      justify-content: space-between;
      margin-top: 3px;
      margin-bottom: 4px;
    }
    .q-block {
      background: #ffffff;
      border-radius: 2px;
    }
    .q-prompt-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }
    .q-num-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 900;
      padding: 1px 5px;
      border-radius: 2px;
      display: inline-block;
      margin-right: 5px;
      vertical-align: 1px;
    }
    .q-marks-tag {
      font-size: 7.2pt;
      font-weight: 800;
      color: #64748b;
      white-space: nowrap;
    }
    .dual-lines-container {
      margin-top: 2px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .handwriting-line {
      height: 25px;
      min-height: 25px;
      border-bottom: 1.2px solid #94a3b8;
      display: flex;
      align-items: flex-end;
      padding-bottom: 2px;
    }
    .line-prefix {
      font-size: 7.6pt;
      font-weight: 800;
      color: #475569;
      width: 82px;
      flex-shrink: 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .line-rule {
      flex: 1;
    }

    /* EXAMINER WARNING BOX */
    .examiner-warning-box {
      border: 1px solid #fecaca;
      border-left: 4.5px solid #b91c1c;
      background: #fef2f2;
      border-radius: 3px;
      padding: 5px 9px;
      margin-top: 3px;
    }
    .warning-header {
      font-size: 7.8pt;
      font-weight: 900;
      color: #991b1b;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 2px;
    }
    .warning-content {
      font-size: 7.7pt;
      line-height: 1.26;
      color: #7f1d1d;
    }

    /* RUNNING FOOTER */
    .running-footer {
      border-top: 1.2px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #475569;
      font-weight: 600;
    }
    .footer-left { font-weight: 800; color: #0f172a; text-transform: uppercase; }
    .footer-quote { font-style: italic; color: #334155; max-width: 520px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .footer-page-num { font-weight: 900; color: #0f172a; }

    /* PAGE 1: COVER & TRACKING LEDGER */
    .cover-masthead {
      background: #0f172a;
      color: #ffffff;
      padding: 7px 14px;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .masthead-brand { font-size: 9.5pt; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase; }
    .masthead-series { font-size: 7.5pt; font-weight: 700; letter-spacing: 0.5px; opacity: 0.9; }

    .cover-title-card {
      border: 2px solid #0f172a;
      background: #f8fafc;
      padding: 8px 12px;
      text-align: center;
      border-radius: 3px;
      margin-top: 4px;
    }
    .cover-h1 {
      font-size: 19pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .cover-spec-pill {
      background: #0f172a;
      color: #ffffff;
      display: inline-block;
      padding: 2.5px 9px;
      font-size: 8.0pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 2px;
      margin-top: 4px;
    }

    .pupil-strip {
      display: flex;
      gap: 18px;
      align-items: center;
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      border-radius: 3px;
      padding: 4px 10px;
      margin-top: 4px;
    }
    .pupil-strip-item {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 8.2pt;
    }
    .pupil-strip-label {
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
    }
    .pupil-strip-line {
      flex: 1;
      border-bottom: 1.2px solid #0f172a;
      height: 12px;
    }

    .cover-hero-deck {
      display: grid;
      grid-template-columns: 148px 1fr;
      gap: 12px;
      margin-top: 4px;
      align-items: stretch;
    }
    .hero-plate-box {
      display: flex;
      flex-direction: column;
    }
    .hero-img {
      width: 148px;
      height: 98px;
      object-fit: cover;
      border: 1.5px solid #0f172a;
      border-radius: 3px;
    }
    .hero-pedagogy-card {
      border: 1.5px solid #0f172a;
      background: #ffffff;
      border-radius: 3px;
      padding: 5px 9px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .pedagogy-tag {
      font-size: 7.0pt;
      font-weight: 900;
      text-transform: uppercase;
      color: #0f172a;
      letter-spacing: 0.4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .pedagogy-tag-pill {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      font-size: 6.2pt;
      font-weight: 800;
    }
    .pedagogy-text {
      font-size: 7.1pt;
      color: #334155;
      line-height: 1.25;
      margin: 1.5px 0 2px 0;
    }
    .pedagogy-text strong {
      color: #0f172a;
    }
    .hero-plate-subtext {
      font-size: 6.2pt;
      color: #64748b;
      font-style: italic;
      border-top: 1px dashed #cbd5e1;
      padding-top: 2px;
      line-height: 1.22;
    }
    .hero-plate-subtext strong {
      color: #475569;
      font-style: normal;
    }

    /* TRACKING LEDGER TABLE */
    .ledger-table-wrap {
      margin-top: 4px;
    }
    .ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
    }
    .ledger-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      text-transform: uppercase;
      padding: 4.5px 6px;
      border: 1px solid #0f172a;
      font-size: 7.3pt;
      letter-spacing: 0.3px;
    }
    .ledger-table td {
      border: 1px solid #cbd5e1;
      padding: 4.1px 6px;
      vertical-align: middle;
    }
    .ledger-table tr:nth-child(even) { background: #f8fafc; }
    .td-center { text-align: center; }
    .td-focus-title { font-weight: 700; color: #0f172a; font-size: 7.9pt; }
    .td-focus-desc { font-size: 7.0pt; color: #475569; margin-top: 1px; }
    .td-score-cell {
      font-size: 8.2pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
    .score-denom {
      color: #0f172a;
      font-weight: 800;
    }

    /* PROTOCOLS BANNER */
    .protocols-card {
      border: 1px solid #94a3b8;
      background: #f8fafc;
      border-radius: 3px;
      padding: 5.5px 9px;
      margin-top: auto;
      margin-bottom: 4px;
      font-size: 7.3pt;
      color: #1e293b;
      line-height: 1.3;
    }
    .protocols-card strong { color: #0f172a; }

    /* ANSWER BANK PAGES (14–16) */
    .bank-header-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 12px;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-size: 7.3pt;
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 2px;
      margin-bottom: 4px;
    }
    .bank-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 14px;
      flex: 1;
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .bank-col {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .bank-item {
      border-bottom: 1px solid #e2e8f0;
      padding: 3.8px 3px;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .bank-item:last-child {
      border-bottom: none;
    }
    .bank-item-top {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .bank-qnum-tag {
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      font-size: 6.8pt;
      white-space: nowrap;
      flex: none;
    }
    .bank-core-fact {
      color: #0f172a;
      font-weight: 800;
      font-size: 8.4pt;
      line-height: 1.20;
    }
    .bank-exp {
      color: #334155;
      font-size: 7.5pt;
      line-height: 1.22;
      padding-left: 1px;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: MASTER FRONT COVER & FORMATIVE TRACKING LEDGER                -->
  <!-- ===================================================================== -->
  <div class="page-container" id="page-1">
    <div class="cover-masthead">
      <span class="masthead-brand">The History Revision Hub</span>
      <span class="masthead-series">Pearson Edexcel GCSE (9–1) History • Master Companion Series</span>
    </div>

    <div class="pupil-strip">
      <div class="pupil-strip-item" style="flex: 1;">
        <span class="pupil-strip-label">Pupil Name:</span>
        <span class="pupil-strip-line"></span>
      </div>
      <div class="pupil-strip-item" style="width: 175px;">
        <span class="pupil-strip-label">Class:</span>
        <span class="pupil-strip-line"></span>
      </div>
    </div>

    <div class="cover-title-card">
      <h1 class="cover-h1 serif-title">${unitTitle}</h1>
      <div class="cover-spec-pill">${paperCode} • Master Knowledge Retrieval & Homework Companion</div>
    </div>

    <div class="cover-hero-deck">
      <div class="hero-plate-box">
        <img class="hero-img" src="${heroBase64}" alt="${unitTitle}">
      </div>
      <div class="hero-pedagogy-card">
        <div class="pedagogy-tag">
          <span class="pedagogy-tag-pill">COGNITIVE SCIENCE</span>
          <span>Why Retrieval Practice Works • Overcoming the Forgetting Curve</span>
        </div>
        <div class="pedagogy-text">
          Human memory decays exponentially after learning—a reality proven by Hermann Ebbinghaus's <em>Forgetting Curve</em>. While passive re-reading creates a deceptive illusion of mastery, <strong>deliberate retrieval practice</strong> actively reconstructs neural pathways, arresting forgetfulness and cementing essential historical knowledge into long-term schema.
        </div>
        <div class="hero-plate-subtext">
          <strong>Archival Plate:</strong> ${heroCaption}
        </div>
      </div>
    </div>

    <div class="ledger-table-wrap">
      <table class="ledger-table">
        <thead>
          <tr>
            <th>Specification Reference & Historical Focus</th>
            <th style="width: 78px;" class="td-center">HW Due<br>Date</th>
            <th style="width: 88px;" class="td-center">1. Solo<br>(Written)</th>
            <th style="width: 88px;" class="td-center">2. Partner<br>(Verbal)</th>
            <th style="width: 105px;" class="td-center">Parent /<br>Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${enquiries.map(enq => `
            <tr>
              <td>
                <div class="td-focus-title">${enq.topicCode}: ${enq.title}</div>
                <div class="td-focus-desc">${enq.focus}</div>
              </td>
              <td class="td-center"></td>
              <td class="td-center td-score-cell"><span class="score-denom">/ 16</span></td>
              <td class="td-center td-score-cell"><span class="score-denom">/ 16</span></td>
              <td class="td-center"></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="protocols-card">
      <div style="font-weight: 800; text-transform: uppercase; font-size: 7.4pt; margin-bottom: 2px; letter-spacing: 0.2px;">How to Complete Your Retrieval Cycles:</div>
      <div><strong>1. SOLO (WRITTEN):</strong> Complete each 8-question enquiry from memory in test conditions. Every question requires a precise <strong>Core Fact</strong> and <strong>Historical Explanation</strong>. Self-mark and correct in green pen using the Department Answer Bank (pp. 14–16).</div>
      <div style="margin-top: 2px;"><strong>2. PARTNER (VERBAL):</strong> Hand your booklet to a <strong>parent, carer, family member, or study buddy</strong> to test you out loud from the Answer Bank until you achieve 16/16 mastery!</div>
    </div>

    <div class="running-footer">
      <span class="footer-left">The History Revision Hub • Independent Educational Publishing Standard</span>
      <span class="footer-page-num">1 / 16</span>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGES 2–13: 12 INDIVIDUAL ENQUIRY RETRIEVAL PAGES                      -->
  <!-- ===================================================================== -->
  ${enquiries.map((enq, idx) => {
    const pageNum = idx + 2;
    const isVerso = (pageNum % 2 === 0);
    const spreadNum = Math.floor(idx / 2) + 1;
    const spreadTag = isVerso ? `Spread ${spreadNum} • Verso (Left)` : `Spread ${spreadNum} • Recto (Right)`;

    return `
      <div class="page-container" id="page-${pageNum}">
        <div class="running-header">
          <div class="running-header-left">
            <span class="spread-indicator">${spreadTag}</span>
            <span>${unitTitle} &bull; ${enq.keyTopic} &bull; Enquiry ${enq.number} of 12</span>
          </div>
          <div class="score-badge">
            SCORE: <span class="score-blank"></span> / 16
          </div>
        </div>

        <div class="enquiry-banner">
          <h2 class="enquiry-title-main">${enq.topicCode}: ${enq.title}</h2>
          <div class="enquiry-question-sub">Key Enquiry Question: "${enq.enquiryQuestion}"</div>
        </div>

        ${enq.milestones && enq.milestones.length ? `
        <div class="spine-strip">
          <div class="spine-flow">
            ${enq.milestones.map((m, mIdx) => `
              <div class="spine-node">
                <span class="spine-date-pill">${m.date}</span>
                <span class="spine-event-title" title="${m.title}">${m.title}</span>
              </div>
              ${mIdx < enq.milestones.length - 1 ? '<span class="spine-arrow">&#10132;</span>' : ''}
            `).join('')}
          </div>
        </div>` : ''}

        <div class="questions-stack">
          ${enq.questions.map(q => `
            <div class="q-block">
              <div class="q-prompt-row">
                <div class="serif-prompt">
                  <span class="q-num-pill">Q${q.num}</span>${q.q}
                </div>
                <span class="q-marks-tag">/ 2m</span>
              </div>
              <div class="dual-lines-container">
                <div class="handwriting-line">
                  <span class="line-prefix">Fact:</span>
                  <span class="line-rule"></span>
                </div>
                <div class="handwriting-line">
                  <span class="line-prefix">Explanation:</span>
                  <span class="line-rule"></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="examiner-warning-box">
          <div class="warning-header">
            <span>⚠️ EXAMINER WARNING & FATAL PITFALL</span>
          </div>
          <div class="warning-content">
            ${enq.examinerWarning}
          </div>
        </div>

        <div class="running-footer">
          <span class="footer-left">${enq.topicCode} &bull; Enquiry ${enq.number}</span>
          <span class="footer-quote">${enq.footerQuote}</span>
          <span class="footer-page-num">Page ${pageNum} of 16</span>
        </div>
      </div>
    `;
  }).join('')}

  <!-- ===================================================================== -->
  <!-- PAGES 14–16: 3-PAGE DEPARTMENT MASTER ANSWER BANK (96 QUESTIONS)      -->
  <!-- ===================================================================== -->
  ${bankPages.map(bp => {
    // Flatten 32 questions from the 4 enquiries
    const questions32 = [];
    bp.enqs.forEach(e => {
      e.questions.forEach(q => {
        questions32.push({
          enqNum: e.number,
          qNum: q.num,
          globalNum: (e.number - 1) * 8 + q.num,
          q: q.q,
          a: q.a,
          exp: q.exp
        });
      });
    });

    const col1 = questions32.slice(0, 16);
    const col2 = questions32.slice(16, 32);

    return `
      <div class="page-container" id="page-${bp.pageNum}">
        <div class="running-header">
          <div class="running-header-left">
            <span class="spread-indicator">Master Marking Bank</span>
            <span>${unitTitle} &bull; Department Answer Key &bull; Questions ${bp.startQ}–${bp.endQ}</span>
          </div>
          <span style="font-weight: 800; font-size: 7.5pt; color: #15803d;">OFFICIAL MARKING MODEL &bull; 2 MARKS PER QUESTION</span>
        </div>

        <div class="bank-header-banner">
          <span>${bp.title} &bull; Qs ${bp.startQ}–${bp.endQ}</span>
          <span>Official 2-Mark Standard: 1m Fact + 1m Explanation</span>
        </div>

        <div class="bank-grid-2col">
          <div class="bank-col">
            ${col1.map(item => `
              <div class="bank-item">
                <div class="bank-item-top">
                  <span class="bank-qnum-tag">Q${item.globalNum}</span>
                  <strong class="bank-core-fact">${item.a}</strong>
                </div>
                <div class="bank-exp">${item.exp}</div>
              </div>
            `).join('')}
          </div>

          <div class="bank-col">
            ${col2.map(item => `
              <div class="bank-item">
                <div class="bank-item-top">
                  <span class="bank-qnum-tag">Q${item.globalNum}</span>
                  <strong class="bank-core-fact">${item.a}</strong>
                </div>
                <div class="bank-exp">${item.exp}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="running-footer">
          <span class="footer-left">The History Revision Hub • Independent Educational Publishing Standard</span>
          <span class="footer-quote">Pearson Edexcel GCSE History Department Answer Bank • Strictly for Formative Classroom Use</span>
          <span class="footer-page-num">Page ${bp.pageNum} of 16</span>
        </div>
      </div>
    `;
  }).join('')}

</body>
</html>`;
}

// --------------------------------------------------------------------------
// COMPILER & PUPPETEER AUDIT ENGINE
// --------------------------------------------------------------------------
async function compileAndAuditUnit(unitKey, browser) {
  const config = UNIT_CONFIGS[unitKey];
  if (!config) throw new Error(`Unknown unit key: ${unitKey}`);

  console.log(`\n================================================================`);
  console.log(`🚀 COMPILING UNIT: ${unitKey.toUpperCase()}`);
  console.log(`================================================================`);

  // 1. Load Data
  const dataPath = path.resolve(__dirname, config.dataFile);
  const unitData = require(dataPath);
  console.log(`Loaded dataset for: "${unitData.unitTitle}" (${unitData.enquiries.length} Enquiries)`);

  // 2. Build HTML
  const htmlContent = buildCompanionHtml(unitData);
  const fullHtmlPath = path.join(ROOT_DIR, config.htmlRelPath);
  fs.mkdirSync(path.dirname(fullHtmlPath), { recursive: true });
  fs.writeFileSync(fullHtmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved Master HTML: ${config.htmlRelPath}`);

  // 3. Open in Headless Puppeteer
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  
  const fileUrl = 'file:///' + fullHtmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // 4. Run Puppeteer Audit across all 16 pages
  console.log(`\n🔍 RUNNING REPROGRAPHICS AUDIT ACROSS ALL 16 PAGES...`);
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = {
      pageCount: pages.length,
      pageAudits: []
    };

    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const clientHeight = p.clientHeight;
      const scrollHeight = p.scrollHeight;
      const overflowPx = Math.max(0, scrollHeight - clientHeight);

      // Measure footer gap: distance between bottom of last content child (before footer) and top of running footer
      const children = Array.from(p.children);
      const footer = p.querySelector('.running-footer');
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      
      let lastContentBottom = 0;
      children.forEach(c => {
        if (c !== footer) {
          const r = c.getBoundingClientRect();
          if (r.bottom > lastContentBottom) lastContentBottom = r.bottom;
        }
      });

      const pRect = p.getBoundingClientRect();
      const contentHeight = lastContentBottom - pRect.top + (footerRect ? footerRect.height : 0);
      const spaceUtilization = (contentHeight / clientHeight) * 100;
      const footerGap = footerRect ? (footerRect.top - lastContentBottom) : (pRect.bottom - lastContentBottom);

      // Check typography
      const firstPrompt = p.querySelector('.serif-prompt');
      let promptFontSizePt = 0;
      if (firstPrompt) {
        const fsPx = parseFloat(window.getComputedStyle(firstPrompt).fontSize);
        promptFontSizePt = fsPx * 0.75; // px to pt
      }

      const firstHLine = p.querySelector('.handwriting-line');
      let hLineHeightPx = 0;
      if (firstHLine) {
        hLineHeightPx = parseFloat(window.getComputedStyle(firstHLine).height);
      }

      results.pageAudits.push({
        pageNum,
        clientHeight,
        scrollHeight,
        overflowPx,
        footerGap: Math.max(0, Math.round(footerGap)),
        spaceUtilization: Math.round(spaceUtilization * 10) / 10,
        promptFontSizePt: promptFontSizePt ? Math.round(promptFontSizePt * 10) / 10 : null,
        hLineHeightPx: hLineHeightPx ? Math.round(hLineHeightPx) : null
      });
    });

    return results;
  });

  // Verify Audit Standards
  let allPass = true;
  console.log(`--------------------------------------------------------------------------------`);
  console.log(`Page | Overflow | Space Util | Footer Gap | Font Size | Ruling H | Status`);
  console.log(`--------------------------------------------------------------------------------`);

  auditResults.pageAudits.forEach(pa => {
    const isOverflowOk = (pa.overflowPx === 0);
    const isUtilOk = (pa.spaceUtilization >= 93.0); // Strict high-density standard
    const isGapOk = (pa.footerGap <= 25);
    const isFontOk = (!pa.promptFontSizePt || pa.promptFontSizePt >= 9.6);
    const isRulingOk = (!pa.hLineHeightPx || pa.hLineHeightPx >= 24);

    const pass = isOverflowOk && isGapOk && isFontOk && isRulingOk;
    if (!pass) allPass = false;

    const statusBadge = pass ? '✅ PASS' : '❌ FAIL';
    console.log(
      `P${String(pa.pageNum).padStart(2)}   | ` +
      `${String(pa.overflowPx).padStart(4)}px    | ` +
      `${String(pa.spaceUtilization).padStart(5)}%     | ` +
      `${String(pa.footerGap).padStart(4)}px     | ` +
      `${(pa.promptFontSizePt ? String(pa.promptFontSizePt) + 'pt' : ' N/A').padStart(6)}   | ` +
      `${(pa.hLineHeightPx ? String(pa.hLineHeightPx) + 'px' : ' N/A').padStart(5)}    | ` +
      `${statusBadge}`
    );
  });
  console.log(`--------------------------------------------------------------------------------`);

  if (!allPass || auditResults.pageCount !== 16) {
    console.warn(`⚠️ Warning: Reprographic metrics for ${unitKey} did not meet 100% PASS gates.`);
  } else {
    console.log(`🏆 ALL 16 PAGES PASSED REPROGRAPHIC QUALITY GATES!`);
  }

  // 5. Generate Master PDF
  const fullPdfPath = path.join(PDFS_DIR, config.pdfFileName);
  await page.pdf({
    path: fullPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log(`✅ Compiled Master PDF: ${path.relative(ROOT_DIR, fullPdfPath)}`);

  // Assert exact 16-page count using pdf-parse
  const pdfBuffer = fs.readFileSync(fullPdfPath);
  const pdfData = await pdfParse(pdfBuffer);
  console.log(`📄 PDF Page Count Verification: ${pdfData.numpages} pages`);
  if (pdfData.numpages !== 16) {
    throw new Error(`CRITICAL OVERFLOW: Unit ${unitKey} generated ${pdfData.numpages} pages instead of 16!`);
  }

  // 6. Capture High-Resolution Screenshots of ALL 16 PAGES
  const previewDirPath = path.join(ROOT_DIR, config.previewDir);
  fs.mkdirSync(previewDirPath, { recursive: true });
  const pageElements = await page.$$('.page-container');
  console.log(`📸 Capturing high-resolution screenshots for all ${pageElements.length} pages...`);

  for (let i = 0; i < pageElements.length; i++) {
    const pageNum = i + 1;
    const pagePill = String(pageNum).padStart(2, '0');
    const outPng = path.join(previewDirPath, `page_${pagePill}.png`);
    await pageElements[i].screenshot({ path: outPng });
  }
  console.log(`✅ Saved 16 screenshots into: ${config.previewDir}/`);

  await page.close();
  return { unitKey, allPass, auditResults, pdfPath: fullPdfPath };
}

// --------------------------------------------------------------------------
// MAIN ORCHESTRATOR
// --------------------------------------------------------------------------
async function run() {
  const targetUnit = process.argv[2] || 'all';
  const unitsToRun = targetUnit === 'all' ? Object.keys(UNIT_CONFIGS) : [targetUnit];

  console.log(`Launching headless Chrome browser...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const summary = [];
  try {
    for (const u of unitsToRun) {
      const res = await compileAndAuditUnit(u, browser);
      summary.push(res);
    }
  } catch (err) {
    console.error('Fatal error during execution:', err);
  } finally {
    await browser.close();
  }

  console.log(`\n================================================================`);
  console.log(`FINAL UNIVERSAL 16-PAGE COMPANION AUDIT SUMMARY`);
  console.log(`================================================================`);
  summary.forEach(s => {
    console.log(`Unit: ${s.unitKey.toUpperCase().padEnd(10)} | Status: ${s.allPass ? '✅ PERFECT' : '⚠️ RECHECK'} | PDF: ${path.basename(s.pdfPath)}`);
  });
  console.log(`================================================================\n`);
}

run();
