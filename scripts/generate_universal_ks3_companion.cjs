/**
 * scripts/generate_universal_ks3_companion.cjs
 *
 * Universal Key Stage 3 Master Knowledge Retrieval Companion Compiler Engine
 * 
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Key Stage 3 History across all units:
 * 1. Causes of the Great War (1871–1914) [great_war]
 * 2. The Course of the Great War (1914–1918) [great_war_part2]
 * 3. Medieval England (1066–1485) [medieval_england]
 * 4. Crown, Church or Parliament (1517–1689) [monarchy_religion_power]
 * 5. Industrialisation, Power & Protest (1750–1901) [industrialisation_and_empire]
 * 6. The First British Empire (1600–1783) [first_british_empire]
 * 7. The Second British Empire (1783–1914) [second_british_empire]
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Master Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Pupil box, Attempt 1 vs 2 scores (/6), Milestone Achieved [ ] Bronze [ ] Silver [ ] Gold,
 *           Roomy Parent / Teacher Sign box, QR code, Partner Quiz / Solo practice banner, Zero DIRT)
 * - Pages 2–6: 5 Dedicated Enquiry Retrieval Pages (Enquiries 1 to 5 • 6 questions each = 30 questions total)
 *              Scaffolded on the 3-Tier Cognitive Ascent with Disciplinary Micro-Pips:
 *              • Q1–Q2 (▸): Bronze Milestone • Substantive Anchor Knowledge & Chronology (Emerald)
 *                           Q1 features Warm-Up Kick-Starter (bracketed choice / guided prompt)
 *              • Q3–Q4 (▸▸): Silver Milestone • Causal Mechanisms & Historical Context (Amber)
 *              • Q5–Q6 (▸▸▸): Gold Challenge • Synoptic Significance & Turning Point Precedent (Crimson)
 *              Featuring 2 roomy write-in lines per question with strong #000000 black typography:
 *              Line 1: Fact: [Solid line >= 25px]
 *              Line 2: Because... / This meant that... [Solid line >= 25px]
 *              Bottom of each page: Key Term Vault (Support Vault) with 6 vocabulary anchor terms.
 * - Page 7: Department Marking Bank (Part 1 • Enquiries 1–3 • Q1–Q18 • Bold answers + Explanations)
 * - Page 8: Department Marking Bank (Part 2 • Enquiries 4–5 • Q19–Q30 • Bold answers + Explanations)
 *           + Key Concept Vault (4-Pillar Reference Grid) • 100% vertical space dedicated (Zero DIRT box).
 *
 * Strict School Anonymity: 100% Institutional Neutrality under 'The History Revision Hub'.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DATA_DIR = path.join(__dirname, 'master_ks3_companion_data');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// Unit registry mapping
const UNIT_REGISTRY = {
  great_war: path.join(DATA_DIR, 'great_war_data.cjs'),
  great_war_part2: path.join(DATA_DIR, 'great_war_part2_data.cjs'),
  medieval_england: path.join(DATA_DIR, 'medieval_england_data.cjs'),
  monarchy_religion_power: path.join(DATA_DIR, 'monarchy_religion_power_data.cjs'),
  industrialisation_and_empire: path.join(DATA_DIR, 'industrialisation_data.cjs'),
  first_british_empire: path.join(DATA_DIR, 'first_british_empire_data.cjs'),
  second_british_empire: path.join(DATA_DIR, 'second_british_empire_data.cjs'),
  australia: path.join(DATA_DIR, 'australia_data.cjs'),
  post_war_britain: path.join(DATA_DIR, 'post_war_britain_data.cjs'),
  the_shoah: path.join(DATA_DIR, 'the_shoah_data.cjs'),
  water_and_sanitation: path.join(DATA_DIR, 'water_and_sanitation_data.cjs'),
};

// Base64 image helper for 100% offline self-contained HTML/PDF rendering
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
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
  return null;
}

// Helper to render micro-pips (Tier 1: ▸, Tier 2: ▸▸, Tier 3: ▸▸▸)
function getPipBadge(tier) {
  if (tier === 1) {
    return '<span class="pip-badge pip-t1" title="Tier 1: Substantive Recall (Bronze)">&#9658;</span>';
  } else if (tier === 2) {
    return '<span class="pip-badge pip-t2" title="Tier 2: Causal Mechanism (Silver)">&#9658;&#9658;</span>';
  } else {
    return '<span class="pip-badge pip-t3" title="Tier 3: Synoptic Significance (Gold)">&#9658;&#9658;&#9658;</span>';
  }
}

// --------------------------------------------------------------------------
// STRICT A5 PRINT CSS SYSTEM
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: A5 portrait;
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #000000;
    background: #ffffff;
    font-size: 8.8pt;
    line-height: 1.25;
  }
  .a5-page {
    width: 148mm;
    height: 210mm;
    padding: 5.5mm 9mm 4.5mm 9mm;
    margin: 0 auto;
    page-break-after: always;
    break-after: page;
    background: #ffffff;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .a5-page:last-child,
  .a5-page:last-of-type {
    page-break-after: avoid !important;
    break-after: avoid !important;
  }
  @media screen {
    body {
      background: #334155;
      padding: 20px 0;
    }
    .a5-page {
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      margin-bottom: 25px;
    }
  }
  @media print {
    body { background: transparent; }
    .a5-page {
      margin: 0;
      box-shadow: none;
      page-break-after: always;
      break-after: page;
    }
    .a5-page:last-child,
    .a5-page:last-of-type {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
  }

  .page-flex-full {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  /* Headers and Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 10.4pt;
    font-weight: 800;
    margin: 0;
    color: #000000;
    line-height: 1.1;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 7.0pt;
    color: #000000;
    font-weight: 600;
    font-style: italic;
  }
  .page-tag {
    font-size: 6.4pt;
    font-weight: 800;
    background: #000000;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.6pt;
    color: #000000;
    border-top: 1.2px solid #000000;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #000000;
    color: #ffffff;
    padding: 4.5px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.0pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  .cover-header-block {
    text-align: center;
    padding: 6px 6px 5px 6px;
    background: #f8fafc;
    border-left: 1.2px solid #000000;
    border-right: 1.2px solid #000000;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 12.8pt;
    font-weight: 800;
    color: #000000;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 7.2pt;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-top: none;
    padding: 5px 8px;
    font-size: 7.6pt;
    color: #000000;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 8px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 11px;
  }

  /* Cover Archival Plate */
  .cover-map-container {
    margin: 2.5px 0;
    text-align: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 2.5px 5px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 48mm;
  }
  .cover-map-img {
    max-height: 48mm;
    max-width: 100%;
    object-fit: contain;
    border: 1.2px solid #000000;
    border-radius: 2px;
  }
  .cover-map-caption {
    font-size: 6.0pt;
    color: #000000;
    margin-top: 1.8px;
    font-style: italic;
    font-weight: 600;
  }

  /* Formative Tracking Table */
  .ledger-container {
    margin-top: 2.5px;
  }
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.8pt;
    background: #ffffff;
    color: #000000;
  }
  .tracking-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    padding: 3.5px 3.5px;
    border: 1px solid #000000;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    text-align: center;
    font-size: 6.8pt;
  }
  .tracking-table td {
    border: 1px solid #000000;
    padding: 5.5px 4.0px;
    text-align: center;
    vertical-align: middle;
    color: #000000;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #000000;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 7.2pt;
    color: #000000;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.7pt;
    color: #1e293b;
    font-weight: 600;
    line-height: 1.15;
    margin-top: 1px;
  }
  .tb-lesson-desc {
    font-size: 5.7pt;
    color: #1e293b;
    font-weight: 600;
    line-height: 1.15;
    margin-top: 1px;
  }
  .score-cell {
    font-size: 7.2pt;
    font-weight: 700;
    color: #000000;
    text-align: center;
  }

  /* Partner Quiz / Instructions Banner */
  .instructions-banner {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 3px 6px;
    margin-top: 3px;
    font-size: 6.2pt;
    line-height: 1.25;
    color: #000000;
  }
  .instructions-banner strong {
    color: #000000;
    text-transform: uppercase;
  }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 3px;
    margin-bottom: 1px;
    color: #000000;
  }
  .qr-code-img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.2pt;
    color: #000000;
    line-height: 1.18;
    text-align: left;
    font-weight: 700;
  }

  /* Horizontal 5-Event Chronological Spine */
  .spine-strip {
    background: #f8fafc;
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin: 2px 0 2px 0;
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
    background: #000000;
    color: #ffffff;
    font-size: 5.2pt;
    font-weight: 800;
    padding: 0.5px 4px;
    border-radius: 2px;
    white-space: nowrap;
    line-height: 1.1;
  }
  .spine-event-title {
    font-size: 5.4pt;
    font-weight: 700;
    color: #000000;
    line-height: 1.1;
    margin-top: 1.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 95px;
  }
  .spine-arrow {
    font-size: 5.8pt;
    color: #64748b;
    font-weight: 900;
    flex-shrink: 0;
    margin: 0 1px;
  }

  /* Pages 2–6: Dedicated Question Page Layout */
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin: 3px 0 2px 0;
  }
  .q-block {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    gap: 2.5px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 9.4pt;
    line-height: 1.2;
  }
  .q-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 18px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    font-size: 9.4pt;
    line-height: 1.1;
  }
  .q-pips {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .pip-badge {
    font-size: 6.6pt;
    line-height: 1;
    letter-spacing: -0.5px;
  }
  .pip-t1 { color: #16a34a; }
  .pip-t2 { color: #d97706; }
  .pip-t3 { color: #dc2626; }

  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 9.4pt;
    line-height: 1.2;
    flex: 1;
  }
  .q-warmup-choice {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 0.5px 5px;
    margin-left: 4px;
    font-weight: 800;
    font-size: 8.6pt;
    color: #000000;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.8pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.8pt;
    min-width: 32px;
  }
  .q-line-lbl.cue {
    font-style: italic;
    font-weight: 700;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 25px;
  }

  /* Key Term Vault (Support Vault) */
  .term-vault-box {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 3px 6px;
    margin-top: 2.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .term-vault-lbl {
    font-size: 6.2pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #000000;
    white-space: nowrap;
    border-right: 1.2px solid #000000;
    padding-right: 6px;
  }
  .term-vault-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    font-size: 6.8pt;
    font-weight: 700;
    color: #000000;
    flex: 1;
  }
  .term-pill {
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 0.5px 4.5px;
    white-space: nowrap;
  }

  /* Pages 7 & 8: Department Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border: 1px solid #000000;
    border-left: 3.5px solid #000000;
    padding: 1px 4.5px;
    font-size: 6.3pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 1.5px 0 1px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1px;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 3.5px;
    font-size: 6.3pt;
    line-height: 1.12;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 0.8px 4px;
    color: #000000;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .ans-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 14px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .ans-num {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
    line-height: 1.1;
  }
  .ans-pip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .ans-pip .pip-badge {
    font-size: 5.4pt;
    letter-spacing: -1px;
  }
  .ans-content {
    flex: 1;
    color: #000000;
  }
  .ans-core {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
  }
  .ans-exp {
    color: #000000 !important;
    font-weight: 500 !important;
    font-style: italic !important;
    font-size: 6.1pt;
  }
  .ans-ticks {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 6.2pt;
    font-weight: 800;
    color: #000000;
    margin-left: 3px;
    white-space: nowrap;
    align-self: center;
  }

  /* Page 8: Key Concept 4-Pillar Grid */
  .glossary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5px;
    margin-top: 2px;
    border-top: 1.2px solid #000000;
    padding-top: 2px;
  }
  .concept-card {
    background: #f8fafc;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 1.8px 4.5px;
    font-size: 5.9pt;
    line-height: 1.13;
  }
  .concept-title {
    font-weight: 900;
    color: #000000;
    text-transform: uppercase;
    font-size: 6.2pt;
  }
`;

// --------------------------------------------------------------------------
// HTML BUILDER FUNCTION
// --------------------------------------------------------------------------
async function buildCompanionHtml(data) {
  const qrDataUrl = await QRCode.toDataURL(data.qrUrl, {
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const coverImgData = getBase64Image(data.heroImage) || '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.title} — Master Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
`;

  // ==========================================================================
  // PAGE 1: FRONT COVER & TRACKING LEDGER
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div>
      <div class="cover-banner">
        <span>The History Revision Hub</span>
        <span>${data.yearGroup}</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">${data.title}</h1>
        <p class="cover-subtitle">Knowledge Retrieval & Homework Companion &bull; 30 High-Yield Questions</p>
      </div>
      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Pupil Name:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    <!-- Centerpiece Archival Plate -->
    <div class="cover-map-container">
      <div class="cover-map-frame">
        ${
          coverImgData
            ? `<img src="${coverImgData}" alt="${data.heroAlt}" class="cover-map-img">`
            : `<div style="padding: 10px; font-weight: bold; color: #000000;">${data.heroAlt}</div>`
        }
      </div>
      <div class="cover-map-caption">
        ${data.heroCaption}
      </div>
    </div>

    <!-- Formative Tracking Ledger Table -->
    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 41%;">Lesson Enquiry Focus</th>
            <th style="width: 13%;">HW Due Date</th>
            <th style="width: 13%;">1. Solo<br>(Written)</th>
            <th style="width: 15%;">2. Partner<br>(Verbal)</th>
            <th style="width: 18%;">Parent /<br>Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${data.enquiries
            .map(
              (enq) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">Enquiry ${enq.number}: ${enq.shortTitle}</div>
              <div class="tb-lesson-desc">${enq.focus || enq.enquiryFocus}</div>
            </td>
            <td></td>
            <td class="score-cell">/ 6</td>
            <td class="score-cell">/ 6</td>
            <td></td>
          </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <!-- Instructions / Partner Quiz Banner -->
    <div class="instructions-banner">
      <div style="font-weight: 800; text-transform: uppercase; font-size: 6.2pt; margin-bottom: 1px; letter-spacing: 0.1px;">How to Complete Your Retrieval Cycles:</div>
      <div><strong>1. Solo (Written):</strong> Complete your 6 write-in lines from memory without looking. Check your answers in green pen using the Department Marking Bank on Pages 7–8.</div>
      <div style="margin-top: 1.5px;"><strong>2. Partner (Verbal):</strong> Hand your booklet to a <strong>parent, carer, family member, or study buddy</strong> to test you out loud from the Marking Bank until you hit 6/6!</div>
    </div>

    <!-- Interactive Portal QR Code -->
    <div class="qr-strip">
      <img src="${qrDataUrl}" alt="Digital Portal QR" class="qr-code-img">
      <div class="qr-caption-text">
        <strong>Scan for Interactive Digital Quizzes & Audio Lessons:</strong><br>
        Access online self-marking retrieval flashcards, diagnostic feedback, and audio narration at <strong>the-history-revision-hub.netlify.app</strong>.
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; ${data.yearGroup}</span>
      <span>Page 1 of 8</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGES 2–6: 5 DEDICATED ENQUIRY RETRIEVAL PAGES (6 Questions Each)
  // ==========================================================================
  let globalQNum = 1;
  data.enquiries.forEach((enq, eIdx) => {
    const pageNum = eIdx + 2;
    html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Enquiry ${enq.number}: ${enq.shortTitle}</h2>
        <p>${enq.enquiryFocus}</p>
      </div>
      <span class="page-tag">Questions ${globalQNum}–${globalQNum + 5}</span>
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

    <div class="q-container">
      ${enq.questions
        .map((q) => {
          const currentNum = globalQNum++;
          const pipBadge = getPipBadge(q.tier);
          const warmUpHtml = q.warmUp
            ? `<span class="q-warmup-choice">${q.warmUp}</span>`
            : '';
          const starterPrompt = q.starter || 'Because...';

          return `
      <div class="q-block">
        <div class="q-header">
          <div class="q-num-box">
            <span class="q-num">${currentNum}.</span>
            <span class="q-pips">${pipBadge}</span>
          </div>
          <span class="q-prompt">${q.q}${warmUpHtml}</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Fact:</span>
          <span class="q-solid-line"></span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl cue">${starterPrompt}</span>
          <span class="q-solid-line"></span>
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <!-- Key Term Vault at Base of Page -->
    <div class="term-vault-box">
      <div class="term-vault-lbl">Key Term Vault:</div>
      <div class="term-vault-pills">
        ${enq.termVault.map((t) => `<span class="term-pill">${t}</span>`).join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; ${enq.shortTitle}</span>
      <span>Page ${pageNum} of 8</span>
    </div>
  </div>
`;
  });

  // ==========================================================================
  // PAGE 7: DEPARTMENT MARKING BANK (PART 1: ENQUIRIES 1–3 • Q1–Q18)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank &bull; Part 1</h2>
        <p>Green-Pen Verification Key &bull; Enquiries 1 to 3 (Questions 1 to 18)</p>
      </div>
      <span class="page-tag">Enquiries 1–3</span>
    </div>

    <div class="mb-container">
      ${data.enquiries
        .slice(0, 3)
        .map(
          (enq) => `
      <div class="mb-section-title">Enquiry ${enq.number}: ${enq.shortTitle}</div>
      ${enq.questions
        .map(
          (q) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${q.num}.</span>
          <span class="ans-pip">${getPipBadge(q.tier)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${q.a}</span> &mdash;
          <span class="ans-exp">${q.exp}</span>
        </div>
        <div class="ans-ticks">[✓] [✗]</div>
      </div>`,
        )
        .join('')}
      `,
        )
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; Marking Bank Part 1</span>
      <span>Page 7 of 8</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 2: ENQUIRIES 4–5 • Q19–Q30)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank &bull; Part 2</h2>
        <p>Green-Pen Verification Key &bull; Enquiries 4 to 5 (Questions 19 to 30)</p>
      </div>
      <span class="page-tag">Enquiries 4–5</span>
    </div>

    <div class="mb-container">
      ${data.enquiries
        .slice(3, 5)
        .map(
          (enq) => `
      <div class="mb-section-title">Enquiry ${enq.number}: ${enq.shortTitle}</div>
      ${enq.questions
        .map(
          (q) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${q.num}.</span>
          <span class="ans-pip">${getPipBadge(q.tier)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${q.a}</span> &mdash;
          <span class="ans-exp">${q.exp}</span>
        </div>
        <div class="ans-ticks">[✓] [✗]</div>
      </div>`,
        )
        .join('')}
      `,
        )
        .join('')}

      <!-- Master Disciplinary Glossary / Key Concept Vault -->
      <div class="mb-section-title" style="margin-top: 3px;">Unit Conceptual Foundations &bull; 4 Core Anchors</div>
      <div class="glossary-grid">
        ${data.glossaryConcepts
          .map(
            (c) => `
        <div class="concept-card">
          <span class="concept-title">${c.term}:</span> ${c.def}
        </div>`,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; Marking Bank Part 2</span>
      <span>Page 8 of 8</span>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

// --------------------------------------------------------------------------
// COMPILER & AUDITOR RUNNER
// --------------------------------------------------------------------------
async function compileUnit(unitKey, browser) {
  const dataPath = UNIT_REGISTRY[unitKey];
  if (!dataPath || !fs.existsSync(dataPath)) {
    throw new Error(`Data path for unit ${unitKey} not found: ${dataPath}`);
  }

  const data = require(dataPath);
  console.log(`\n=============================================================`);
  console.log(`🚀 Compiling KS3 Unit: ${data.title} (${unitKey})`);
  console.log(`=============================================================`);

  const html = await buildCompanionHtml(data);

  // Save HTML source document
  const unitTargetDir = path.join(ROOT_DIR, 'public', 'units', unitKey);
  if (!fs.existsSync(unitTargetDir)) {
    fs.mkdirSync(unitTargetDir, { recursive: true });
  }
  const htmlPath = path.join(unitTargetDir, `${unitKey}_retrieval_companion.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`📄 Wrote Master HTML: ${htmlPath}`);

  // Compile PDF via Puppeteer
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: ['load', 'networkidle0'] });

  // Reprographic Quality Audit across all 8 pages
  const pageStats = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    return Array.from(pages).map((p, idx) => {
      const pageHeight = 793.7; // ~210mm at 96 DPI
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 1 ? scrollH - clientH : 0;
      const footer = p.querySelector('.page-footer-strip');
      let footerGap = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        footerGap = Math.max(0, pRect.bottom - fRect.bottom);
      }
      return {
        pageNum: idx + 1,
        scrollH,
        clientH,
        overflow: Math.round(overflow),
        footerGap: Math.round(footerGap),
        status: overflow === 0 ? 'PASS' : 'OVERFLOW',
      };
    });
  });

  console.log('\n📊 Reprographic Quality Gate Audit Results:');
  let hasOverflow = false;
  pageStats.forEach((p) => {
    console.log(
      `   Page ${p.pageNum}: ${p.status} (Overflow: ${p.overflow}px, FooterGap: ${p.footerGap}px)`,
    );
    if (p.overflow > 0) hasOverflow = true;
  });

  if (hasOverflow) {
    await page.close();
    throw new Error(`Unit ${unitKey} failed: One or more pages exceeded the strict A5 printable budget.`);
  }

  const pdfPath = path.join(PDFS_DIR, data.pdfFileName);
  await page.pdf({
    path: pdfPath,
    format: 'A5',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  console.log(`✅ Generated Master PDF: ${pdfPath}`);

  // Hard Reprographic Quality Gate: Verify EXACTLY 8 Pages
  const pdfParse = require('pdf-parse');
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(pdfBytes);
  console.log(`📄 PDF Page Count Verification: ${pdfData.numpages} pages`);
  if (pdfData.numpages !== 8) {
    throw new Error(`CRITICAL REPROGRAPHIC FAILURE: ${data.pdfFileName} compiled with ${pdfData.numpages} pages instead of exactly 8! Spillover detected on Page 7 or 8.`);
  }

  if (data.pdfAlias) {
    const aliasPath = path.join(PDFS_DIR, data.pdfAlias);
    fs.copyFileSync(pdfPath, aliasPath);
    console.log(`✅ Updated PDF Alias: ${aliasPath}`);
  }

  // Render high-resolution preview screenshots for visual quality inspection
  const previewDir = path.join(ROOT_DIR, 'public', `previews_ks3_${unitKey}`);
  if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });
  const pageElements = await page.$$('.a5-page');
  for (let i = 0; i < pageElements.length; i++) {
    const pageNumStr = String(i + 1).padStart(2, '0');
    const outPng = path.join(previewDir, `page_${pageNumStr}.png`);
    await pageElements[i].screenshot({ path: outPng });
  }
  console.log(`📸 Saved ${pageElements.length} screenshots into: public/previews_ks3_${unitKey}/`);

  await page.close();
  return { unitKey, title: data.title, pages: pageStats.length, status: 'OPTIMAL' };
}

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || '--all';

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    let unitsToCompile = [];
    if (target === '--all') {
      unitsToCompile = Object.keys(UNIT_REGISTRY);
    } else if (UNIT_REGISTRY[target]) {
      unitsToCompile = [target];
    } else {
      console.error(`Unknown unit target: ${target}`);
      console.log(`Available units: ${Object.keys(UNIT_REGISTRY).join(', ')}`);
      process.exit(1);
    }

    console.log(`Starting compilation of ${unitsToCompile.length} KS3 unit(s)...`);
    const results = [];
    for (const unit of unitsToCompile) {
      const res = await compileUnit(unit, browser);
      results.push(res);
    }

    console.log('\n=============================================================');
    console.log('🎉 ALL KS3 COMPANIONS COMPILED & AUDITED TO PERFECTION!');
    console.log('=============================================================');
    console.table(results);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during compilation:', err);
    process.exit(1);
  });
}

module.exports = { buildCompanionHtml, compileUnit, UNIT_REGISTRY };
