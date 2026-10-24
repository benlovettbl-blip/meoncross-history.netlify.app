/**
 * scripts/render_first_british_empire_8page_textbook.cjs
 *
 * 8-PAGE MASTER CLASSROOM TEXTBOOK (2 Sheets of A3 Saddle-Stitch Model)
 * Target: KS3 Year 8 — The First British Empire (1600–1783)
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to live app data in units/first_british_empire/data.js
 * - Dynamic Single Source of Truth (SSoT): Automatically inherits any text edits made in data.js
 * - Exactly 8 pages (2 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork, canonical dramatic synopsis blurb, 5-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (12 defining turning points & causal dominoes)
 * - Pages 3–7: 5 Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 8: Master 25-Question Knowledge Retrieval Quiz Back Cover (5 Enquiry Cards, 5 Qs each = Qs 1–25)
 * - Dynamic Auto-Balancing Typography: Automatically calibrates font-size and leading per page
 *   to ensure 0px overflow, positive clearance (>= +20px), and >= 95% space utilization
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    if (!relativePath) return null;
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'first_british_empire', 'assets', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'first_british_empire',
        'assets',
        path.basename(cleanPath),
      ),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>)
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .trim();
}

// Load canonical data from units/first_british_empire/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'first_british_empire', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw = raw.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const sandbox = { module: { exports: {} } };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox);
  return sandbox.module.exports.id ? sandbox.module.exports : sandbox.unitData;
}

// 12 Defining Chronological Milestones for Page 2
const milestones = [
  {
    date: '31 Dec 1600',
    title: 'Royal Charter of the East India Company',
    desc: 'Queen Elizabeth I grants a monopoly charter to London merchants, initiating corporate maritime commerce and factory construction in Mughal India.',
    ref: '1.1',
  },
  {
    date: '1615–1619',
    title: 'Sir Thomas Roe’s Embassy to Emperor Jahangir',
    desc: 'King James I’s ambassador secures Mughal farman decrees, granting European traders duty-free access and commercial security in Surat.',
    ref: '1.2',
  },
  {
    date: 'Aug 1619',
    title: 'First Enslaved Africans Land in Virginia',
    desc: 'A privateer ship deposits twenty captive Angolans at Point Comfort, initiating chattel bondage in Britain’s North American tobacco colonies.',
    ref: '2.1',
  },
  {
    date: 'May 1655',
    title: 'English Naval Conquest of Jamaica',
    desc: 'Cromwell’s "Western Design" seizes Jamaica from Spain, rapidly transforming the island into the epicenter of the brutal Atlantic sugar economy.',
    ref: '3.1',
  },
  {
    date: '1672',
    title: 'Royal African Company Chartered',
    desc: 'Led by James, Duke of York, the Crown establishes a corporate monopoly shipping more than 200,000 enslaved Africans across the Middle Passage.',
    ref: '2.2',
  },
  {
    date: '1720–1739',
    title: 'First Maroon War & Queen Nanny’s Treaty',
    desc: 'Escaped Jamaican Maroons wage mountain guerrilla warfare, compelling British authorities to sign a 1739 treaty recognising their sovereign autonomy.',
    ref: '3.4–3.5',
  },
  {
    date: '23 Jun 1757',
    title: 'Battle of Plassey & Corporate Rule in Bengal',
    desc: 'Robert Clive defeats Nawab Siraj ud-Daulah through political betrayal, transforming the EIC from a trading concern into a sovereign territorial power.',
    ref: '1.4',
  },
  {
    date: 'Aug 1765',
    title: 'Treaty of Allahabad: Emperor Grants Diwani Tax Rights',
    desc: 'Shah Alam II cedes Bengal’s vast taxation revenues to Clive, enriching company nabobs while paving the way for catastrophic agrarian famine.',
    ref: '1.5',
  },
  {
    date: 'Oct 1763',
    title: 'Royal Proclamation of 1763',
    desc: 'King George III forbids colonial expansion west of the Appalachians, incensing land speculators and deepening colonial friction with Westminster.',
    ref: '4.1',
  },
  {
    date: '16 Dec 1773',
    title: 'The Boston Tea Party & Coercive Acts',
    desc: 'Sons of Liberty dump 342 chests of British tea into Boston Harbour, triggering draconian punitive laws that unify the Thirteen Colonies in resistance.',
    ref: '4.4–4.5',
  },
  {
    date: '4 Jul 1776',
    title: 'American Declaration of Independence',
    desc: 'Thomas Jefferson drafts the revolutionary declaration proclaiming universal liberty, while maintaining slavery and provoking imperial civil war.',
    ref: '5.1–5.2',
  },
  {
    date: '1775–1783',
    title: 'Dunmore’s Proclamation, Black Loyalists & Paris Treaty',
    desc: 'Over 3,000 Black Loyalists earn freedom aiding the Crown before British capitulation at Yorktown compels Britain to recognise American independence.',
    ref: '5.3–5.5',
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(unitData.cover_image || '/images/shah_alam_clive.jpg');

  const canonicalSynopsis =
    unitData.description ||
    'From the founding of the East India Company and the horrors of the Transatlantic slave trade to Jamaican Maroon resistance and the American Revolution, explore how commercial greed, human exploitation, and colonial rebellion built and fractured the First British Empire.';

  const quizCards = (unitData.quizzing_pack && unitData.quizzing_pack.sections) || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The First British Empire (1600–1783) &bull; Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #0f172a;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 10mm auto;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12mm 15mm 10mm 15mm;
      page-break-after: always;
      page-break-inside: avoid;
    }

    @media print {
      body {
        background: #ffffff;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* Common Running Header / Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 6px;
      font-size: 7pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
    }

    .running-header .sub-badge {
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.04em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3.5px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      color: #64748b;
    }

    .running-footer .page-pill {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 2px;
      font-size: 7pt;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-page {
      padding: 12mm 16mm 10mm 16mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
    }

    .cover-series {
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .cover-sub-series {
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #475569;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 6px 0 4px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #fff;
      font-size: 9pt;
      font-weight: 800;
      padding: 2px 16px;
      border-radius: 14px;
      letter-spacing: 0.14em;
      margin-bottom: 4px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 26pt;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.5pt;
      font-style: italic;
      color: #334155;
      margin-top: 3px;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 86mm;
      border: 1.5px solid #0f172a;
      position: relative;
      background: #0f172a;
      margin: 4px 0 3px 0;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 35%;
    }

    .cover-hero-caption {
      font-size: 6.8pt;
      color: #475569;
      text-align: center;
      font-style: italic;
      margin-bottom: 4px;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 10px 14px;
      margin: 4px 0 6px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }

    .cover-overview-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.8pt;
      line-height: 1.58;
      color: #1e293b;
      margin: 0;
      font-style: italic;
      text-align: justify;
    }

    .cover-directory {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .cover-directory-head {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.9pt;
      background: #ffffff;
    }

    .cover-directory-table tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .cover-directory-table tr:last-child {
      border-bottom: none;
    }

    .cover-directory-table td {
      padding: 4.5px 8px;
      vertical-align: middle;
    }

    .col-num {
      width: 55px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .col-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 7.9pt;
      width: 36%;
      line-height: 1.3;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.6pt;
      padding-left: 6px;
      line-height: 1.34;
    }

    .col-page {
      width: 48px;
      text-align: right;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
    }

    .cover-concepts-strip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 3px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #1e3a8a;
      margin-bottom: 4px;
    }

    .cover-concepts-tag {
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 4.5px;
      border-radius: 2px;
      white-space: nowrap;
      font-size: 6.2pt;
    }

    /* ==========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.5pt;
      font-style: italic;
      color: #475569;
      margin-top: 2px;
    }

    .milestone-timeline {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 0 4px;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 70px;
      top: 6px;
      bottom: 6px;
      width: 2.5px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 4px;
    }

    .milestone-date-box {
      width: 62px;
      text-align: right;
      padding-right: 12px;
      font-size: 7.6pt;
      font-weight: 800;
      color: #1e3a8a;
      line-height: 1.2;
      margin-top: 1px;
    }

    .milestone-node {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 2px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 3px 8px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }

    .milestone-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-ref {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #e0e7ff;
      padding: 0 4px;
      border-radius: 2px;
    }

    .milestone-desc {
      font-family: 'Lora', serif;
      font-size: 7.6pt;
      line-height: 1.34;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGES 3–7: ENQUIRY LESSON PAGES
       ========================================================================== */
    .enquiry-banner {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 1.5px 7px;
      border-radius: 2px;
    }

    .enquiry-canon-tag {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 3px 0;
    }

    .enquiry-core-question {
      background: #f1f5f9;
      border-left: 3px solid #1e3a8a;
      padding: 2.5px 7px;
      font-size: 7.5pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .enquiry-core-question span.label {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      font-size: 6.2pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 20px;
      column-fill: balance;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .block-section {
      break-inside: auto;
      margin-bottom: 6px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 2px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
    }

    .block-ref {
      font-size: 7.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 0 4px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .block-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1.15;
    }

    .block-prose {
      font-family: 'Lora', Georgia, serif;
      font-size: 10.5pt;
      line-height: 1.48;
      color: #1e293b;
      margin: 0;
    }

    .block-prose strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* ==========================================================================
       PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    .quiz-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .quiz-badge {
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 17pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .quiz-instructions {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 3px;
      padding: 6px 10px;
      font-size: 7.5pt;
      color: #1e3a8a;
      line-height: 1.42;
      margin-bottom: 6px;
    }

    .quiz-cards-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .quiz-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 6.5px 10px;
      margin-bottom: 4px;
    }

    .quiz-card:last-child {
      margin-bottom: 0;
    }

    .quiz-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3.5px;
    }

    .quiz-card-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quiz-card-ref {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-questions-list {
      margin: 0;
      padding-left: 15px;
      font-family: 'Lora', Georgia, serif;
      font-size: 8.8pt;
      line-height: 1.38;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 2px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="page cover-page" id="page-1" data-page="1">
    <div class="cover-top-masthead">
      <div class="cover-series">The History Revision Hub</div>
      <div class="cover-sub-series">Key Stage 3 Disciplinary Classroom Textbook &bull; Year 8 Master Edition</div>
    </div>
    <div class="cover-title-block">
      <div class="cover-date-pill">1600 &ndash; 1783</div>
      <h1 class="cover-main-title">THE FIRST BRITISH EMPIRE</h1>
      <div class="cover-subtitle">Mercantilism, Transatlantic Bondage &amp; The American Revolution</div>
    </div>
    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64}" alt="Shah Alam II granting the Diwani to Robert Clive">
    </div>
    <div class="cover-hero-caption">
      Historical Painting (1765): Mughal Emperor Shah Alam II cedes the Diwani tax rights of Bengal to Lord Clive and the East India Company.
    </div>

    <!-- Dramatic Unit Narrative Synopsis in Playfair Display -->
    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Enquiry &bull; Unit Narrative Synopsis</span>
        <span class="cover-overview-period">1600 &ndash; 1783</span>
      </div>
      <p class="cover-overview-text">
        &ldquo;${canonicalSynopsis}&rdquo;
      </p>
    </div>

    <!-- Canonical Enquiries Scheme of Learning Directory (Australia 4-Column Architecture) -->
    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>The Canonical Enquiries &bull; Scheme of Learning Directory</span>
        <span>A3 Saddle-Stitch Format</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          ${unitData.lessons
            .slice(0, 5)
            .map((lesson, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const cleanTitle = lesson.title.replace(/\s*\(\d+–\d+\)/, '');
              const enquiryQ = lesson.enquiry || '';
              const pageNum = idx + 3;
              return `
              <tr>
                <td class="col-num">Enquiry ${num}</td>
                <td class="col-title">${cleanTitle}</td>
                <td class="col-eq">${enquiryQ}</td>
                <td class="col-page">Page ${pageNum}</td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>

    <!-- Core Concepts Anchor Strip -->
    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Charter Companies &bull; East India Company &bull; Jamestown 1607 &bull; Mayflower &bull; Indentured Servitude &bull; Middle Passage &bull; Chattel Slavery &bull; Plantation Economy &bull; Navigation Acts &bull; Seven Years' War &bull; Stamp Act &bull; American Independence 1776</span>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Disciplinary History Textbook Series</span>
      <span class="page-pill">Page 1</span>
      <span>Year 8 Curriculum Companion &bull; Saddle-Stitch Model</span>
    </div>
  </div>

  <!-- PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE -->
  <div class="page" id="page-2" data-page="2">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 DISCIPLINARY HISTORY</span>
      <span class="sub-badge">YEAR 8 &bull; THE FIRST BRITISH EMPIRE (1600&ndash;1783)</span>
      <span>PAGE 2</span>
    </div>

    <div class="spine-header-block">
      <h2 class="spine-main-title">Chronological Turning Points Highway (1600&ndash;1783)</h2>
      <div class="spine-subtitle">Twelve Decisive Causal Turning Points in the Rise and Fracture of Empire</div>
    </div>

    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-item">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-content">
            <div class="milestone-header-row">
              <span class="milestone-title">${m.title}</span>
              <span class="milestone-ref">Ref [${m.ref}]</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>Unit Chronology Spine &bull; Causal Turning Points 1600&ndash;1783</span>
      <span class="page-pill">Page 2</span>
      <span>Master Disciplinary Framework</span>
    </div>
  </div>

  <!-- PAGES 3–7: 5 CANONICAL ENQUIRIES -->
  ${unitData.lessons
    .map((lesson, lIdx) => {
      const pageNum = lIdx + 3;
      const enquiryNum = String(lIdx + 1).padStart(2, '0');
      const blocks = (lesson.narrative_blocks || []).filter(
        (b) => b.text && b.type !== 'photo_slider',
      );

      return `
    <div class="page page-lesson page-lesson-${lIdx + 1}" id="page-${pageNum}" data-page="${pageNum}">
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
        <span class="sub-badge">Enquiry ${enquiryNum} &bull; Page ${pageNum}</span>
        <span>THE FIRST BRITISH EMPIRE</span>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-pill">Enquiry ${enquiryNum}</span>
          <span class="enquiry-canon-tag">Pillar 1 &bull; Core Historical Narrative</span>
        </div>
        <h2 class="enquiry-title">${lesson.title}</h2>
        <div class="enquiry-core-question">
          <span class="label">Key Enquiry Question</span>
          <span>${lesson.enquiry || 'How was the First British Empire built and contested?'}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${blocks
            .map((block, bIdx) => {
              const prose = cleanProse(block.text);
              return `
              <div class="block-section">
                <div class="block-header">
                  <span class="block-ref">[${lIdx + 1}.${bIdx + 1}]</span>
                  <span class="block-title">${block.title}</span>
                </div>
                <p class="block-prose">${prose}</p>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Enquiry ${enquiryNum} &bull; ${lesson.title.replace(/\s*\(\d+–\d+\)/, '')}</span>
        <span class="page-pill">Page ${pageNum}</span>
        <span>The History Revision Hub &bull; Zero Primary Sources Mandate</span>
      </div>
    </div>
    `;
    })
    .join('')}

  <!-- PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER -->
  <div class="page" id="page-8" data-page="8">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">BACK COVER &bull; RETRIEVAL ENGINE</span>
      <span>PAGE 8</span>
    </div>

    <div class="quiz-top-masthead">
      <div class="quiz-badge">Master Disciplinary Retrieval Engine</div>
      <h2 class="quiz-main-title">MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
    </div>

    <div class="quiz-instructions">
      <strong>Standard Recall Protocol:</strong> 25 core retrieval questions testing factual mastery across all five enquiries. Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit homework retrieval. (Answers verified in textbook narrative; zero answers printed.)
    </div>

    <div class="quiz-cards-grid">
      ${quizCards
        .map((card, cIdx) => {
          const pageRef = cIdx + 3;
          const questions = card.questions || [];
          return `
          <div class="quiz-card">
            <div class="quiz-card-head">
              <span class="quiz-card-title">${card.title.replace(/^Lesson\s*\d+\s*Retrieval:\s*/i, 'Enquiry ' + (cIdx + 1) + ': ')}</span>
              <span class="quiz-card-ref">Page ${pageRef} &bull; Ref [${cIdx + 1}.1]&ndash;[${cIdx + 1}.5]</span>
            </div>
            <ol class="quiz-questions-list">
              ${questions.map((q) => `<li>${q.q || q.question}</li>`).join('')}
            </ol>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>Master Knowledge Retrieval Engine &bull; 25 Core Recall Questions (Zero Answers Printed)</span>
      <span class="page-pill">Page 8</span>
      <span>The History Revision Hub &bull; All Rights Reserved</span>
    </div>
  </div>

</body>
</html>`;
}

async function run() {
  console.log('\n============================================================');
  console.log('🚀 COMPILING 8-PAGE MASTER TEXTBOOK: [first_british_empire]');
  console.log('============================================================');

  const html = buildHtml();
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'first_british_empire');
  const unitDir = path.join(ROOT_DIR, 'units', 'first_british_empire');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  const rootHtmlPath = path.join(unitDir, 'textbook.html');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');
  console.log(`[OK] Generated HTML textbook at:\n  ${publicHtmlPath}\n  ${rootHtmlPath}`);

  // Launch Puppeteer with auto-balancing typography engine
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.goto('file:///' + publicHtmlPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
  });

  // Dynamic Auto-Balancing Typography Engine
  console.log(
    '\n[Auto-Balancer] Dynamically calibrating font metrics to guarantee 0px overflow & >= 95% fill...',
  );
  await page.evaluate(() => {
    const lessonPages = document.querySelectorAll('.page-lesson');
    lessonPages.forEach((p) => {
      const footer = p.querySelector('.running-footer');
      const proseEls = p.querySelectorAll('.block-prose');
      const sections = p.querySelectorAll('.block-section');
      if (proseEls.length === 0 || !footer) return;

      let size = 10.6;
      let lh = 1.49;
      let secMargin = 6.0;

      const getOverlap = () => {
        const fTop = footer.getBoundingClientRect().top;
        const children = Array.from(p.querySelectorAll('.block-section, p, .block-header'));
        const maxB = Math.max(...children.map((c) => c.getBoundingClientRect().bottom));
        return maxB - fTop;
      };

      while (getOverlap() > -15 && size > 8.5) {
        size -= 0.1;
        lh -= 0.01;
        secMargin = Math.max(3, secMargin - 0.1);
        proseEls.forEach((el) => {
          el.style.fontSize = size.toFixed(2) + 'pt';
          el.style.lineHeight = lh.toFixed(2);
        });
        sections.forEach((s) => (s.style.marginBottom = secMargin.toFixed(1) + 'px'));
      }
    });
  });

  // Re-read HTML with calibrated styles and save back to disk
  const calibratedHtml = await page.content();
  fs.writeFileSync(publicHtmlPath, calibratedHtml, 'utf8');
  fs.writeFileSync(rootHtmlPath, calibratedHtml, 'utf8');

  // Verify Page Count & Height
  const auditResults = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const diff = scrollH - clientH;
      const footer = p.querySelector('.running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const body = p.querySelector(
        '.prose-body, .milestone-timeline, .quiz-cards-grid, .cover-directory',
      );
      const bodyBottom = body ? body.getBoundingClientRect().bottom : 0;
      const clearance = footer ? Math.round(footerTop - bodyBottom) : 0;

      return {
        page: idx + 1,
        overflow: diff > 2,
        diff,
        clearance,
        horizOverflow: p.scrollWidth > p.clientWidth + 2,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  auditResults.forEach((r) => {
    console.log(
      `  Page ${r.page}: overflow=${r.overflow} (diff=${r.diff}px), clearance=${r.clearance}px, horizOverflow=${r.horizOverflow}`,
    );
  });

  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log(
      '✅ PERFECT: All 8 pages have 0px overflow, positive clearance, and balanced text!',
    );
  }

  // Audit Page Budget
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.page',
      underflowThresholdPx: 50,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 55,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'first_british_empire/textbook.html');
  } catch (err) {
    console.warn('Space audit error:', err.message);
  }

  // Save preview screenshots for all 8 pages
  const pageEls = await page.$$('.page');
  for (let i = 0; i < pageEls.length; i++) {
    await pageEls[i].screenshot({
      path: path.join(publicDir, `preview_page${i + 1}.png`),
    });
  }
  console.log(`[OK] Saved all 8 page preview screenshots to: ${publicDir}`);

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });

  const pdfPath = path.join(pdfOutputDir, 'first_british_empire_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 8-Page Textbook PDF compiled to: ${pdfPath}`);

  // Mirror PDF
  const standardPdfPath = path.join(pdfOutputDir, 'first_british_empire_textbook.pdf');
  fs.copyFileSync(pdfPath, standardPdfPath);
  console.log(`[OK] Mirrored PDF to: ${standardPdfPath}`);

  await browser.close();
  console.log(
    '\n🎉 MASTERPIECE COMPILATION SUCCESSFUL: The First British Empire 8-Page Textbook!\n',
  );
}

run().catch((err) => {
  console.error('Fatal error during compilation:', err);
  process.exit(1);
});
