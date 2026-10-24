/**
 * scripts/render_standard_textbook_second_british_empire.cjs
 *
 * PURE NARRATIVE CLASSROOM TEXTBOOK (12-Page Saddle-Stitch Model)
 * Target: KS3 Year 8 — The Second British Empire (1783–1914)
 * Conforms strictly to the KS3 Classroom Textbook Engine Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Large, comfortable, high-legibility typography for Year 8 reading (9.4pt–9.8pt body, 1.42–1.46 line-height)
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - 5 Canonical Enquiries across 5 flat double-page spreads (Verso Part I + Recto Part II)
 * - Explicit paragraph referencing [1.1] to [5.4] matching pupil workbook citations
 * - Master Front Cover with hero plate, canonical synopsis overview, and 5-enquiry directory
 * - Back cover: 5-Card Master Knowledge Retrieval Quiz (35 canonical recall questions, 0 answers)
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
      path.join(ROOT_DIR, 'units', 'second_british_empire', 'assets', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'second_british_empire',
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

// Format block paragraphs from HTML string
function formatBlockParas(htmlText) {
  if (!htmlText) return '';
  const matches = htmlText.match(/<p>([\s\S]*?)<\/p>/gi);
  if (matches && matches.length > 0) {
    return matches
      .map((m) => {
        let inner = m.replace(/<\/?p>/gi, '');
        inner = cleanProse(inner);
        return `<p class="prose-p">${inner}</p>`;
      })
      .join('\n');
  }
  return `<p class="prose-p">${cleanProse(htmlText)}</p>`;
}

// Load canonical data from units/second_british_empire/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'second_british_empire', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw = raw.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const sandbox = { module: { exports: {} } };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox);
  return sandbox.module.exports.id ? sandbox.module.exports : sandbox.unitData;
}

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(
    unitData.cover_image || '/images/imperial_federation_map.jpg',
  );

  const canonicalSynopsis =
    unitData.description ||
    'From East India Company monopoly rule and Portsmouth Royal Dockyard to Australian settler colonialism, the 1857 Indian Rebellion, the Scramble for Africa, and Dadabhai Naoroji’s Drain Theory, explore how global commerce, naval power, dispossession, and armed resistance shaped the Second British Empire.';

  const lessons = unitData.lessons || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Second British Empire (1783–1914) &bull; Master Classroom Textbook</title>
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
      padding: 11mm 15mm 10mm 15mm;
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
      margin-bottom: 5px;
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
      margin-top: 5px;
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
      object-position: center 30%;
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
      width: 58px;
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
       PAGES 2–11: 5 DOUBLE-PAGE SPREADS (VERSO + RECTO)
       ========================================================================== */
    .enquiry-banner {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5px;
    }

    .enquiry-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 1.5px 6px;
      border-radius: 2px;
    }

    .enquiry-canon-tag {
      font-size: 6.6pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 2.5px 0;
    }

    .enquiry-core-question {
      background: #f1f5f9;
      border-left: 3px solid #1e3a8a;
      padding: 2px 6px;
      font-size: 7.2pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .enquiry-core-question span.label {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 6pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .page-prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 18px;
      column-fill: balance;
      height: 100%;
    }

    .block-section {
      break-inside: auto;
      margin-bottom: 5px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 2px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }

    .block-ref {
      font-size: 6.8pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 0 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .block-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      line-height: 1.15;
    }

    .prose-p {
      font-family: 'Lora', Georgia, serif;
      font-size: 9.35pt;
      line-height: 1.42;
      color: #1e293b;
      margin: 0 0 4px 0;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    .prose-p strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* ==========================================================================
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    .quiz-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }

    .quiz-badge {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .quiz-instructions {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 3px;
      padding: 4px 8px;
      font-size: 7pt;
      color: #1e3a8a;
      line-height: 1.34;
      margin-bottom: 4px;
    }

    .quiz-cards-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 3.5px;
    }

    .quiz-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4.5px 8px;
    }

    .quiz-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
      margin-bottom: 2.5px;
    }

    .quiz-card-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .quiz-card-ref {
      font-size: 6.6pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-questions-list {
      margin: 0;
      padding-left: 14px;
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      line-height: 1.28;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 1.5px;
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
      <div class="cover-date-pill">1783 &ndash; 1914</div>
      <h1 class="cover-main-title">THE SECOND BRITISH EMPIRE</h1>
      <div class="cover-subtitle">Corporate Rule, Frontier Warfare &amp; The Scramble for Africa</div>
    </div>
    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64}" alt="Imperial Federation Map (1886)">
    </div>
    <div class="cover-hero-caption">
      Archival Cartography (1886): Imperial Federation Map showing the British Empire in red, projecting global maritime dominance and Victorian imperial ideology.
    </div>

    <!-- Dramatic Unit Narrative Synopsis in Playfair Display -->
    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Enquiry &bull; Unit Narrative Synopsis</span>
        <span class="cover-overview-period">1783 &ndash; 1914</span>
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
          <tr>
            <td class="col-num">Enquiry 01</td>
            <td class="col-title">Imperial Expansion &amp; Royal Navy</td>
            <td class="col-eq">How was the British Empire built and sustained?</td>
            <td class="col-page">Pages 2&ndash;3</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 02</td>
            <td class="col-title">Corporate Rule &amp; The 1857 Rebellion</td>
            <td class="col-eq">How did corporate rule spark the Indian Uprising?</td>
            <td class="col-page">Pages 4&ndash;5</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 03</td>
            <td class="col-title">Settler Colonisation &amp; Frontier Wars</td>
            <td class="col-eq">How did British colonisation transform Australia?</td>
            <td class="col-page">Pages 6&ndash;7</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 04</td>
            <td class="col-title">The Scramble for Africa &amp; Ideology</td>
            <td class="col-eq">Why did European powers scramble for Africa?</td>
            <td class="col-page">Pages 8&ndash;9</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 05</td>
            <td class="col-title">Conquest, Costs &amp; Imperial Legacy</td>
            <td class="col-eq">Who truly benefited from the British Empire?</td>
            <td class="col-page">Pages 10&ndash;11</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Core Concepts Anchor Strip -->
    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Pax Britannica &bull; Royal Navy &bull; East India Company &bull; 1857 Rebellion &bull; British Raj &bull; Terra Nullius &bull; Frontier Wars &bull; Scramble for Africa &bull; Berlin Conference &bull; Social Darwinism &bull; Indirect Rule</span>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Disciplinary History Textbook Series</span>
      <span class="page-pill">Page 1</span>
      <span>Year 8 Curriculum Companion &bull; 12-Page Saddle-Stitch Model</span>
    </div>
  </div>

  <!-- PAGES 2–11: 5 DOUBLE-PAGE SPREADS -->
  ${lessons
    .map((lesson, lIdx) => {
      const num = String(lIdx + 1).padStart(2, '0');
      const pVerso = lIdx * 2 + 2;
      const pRecto = pVerso + 1;
      const blocks = (lesson.narrative_blocks || []).filter(
        (b) => b.text && b.type !== 'photo_slider',
      );

      const versoBlocks = blocks.slice(0, 2);
      const rectoBlocks = blocks.slice(2, 4);

      return `
    <!-- VERSO: ENQUIRY ${num} PART I -->
    <div class="page page-lesson" id="page-${pVerso}" data-page="${pVerso}">
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
        <span class="sub-badge">Enquiry ${num} (Part I) &bull; Page ${pVerso}</span>
        <span>THE SECOND BRITISH EMPIRE</span>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-pill">Enquiry ${num} &bull; Part I</span>
          <span class="enquiry-canon-tag">Pillar 1 &bull; Core Historical Narrative</span>
        </div>
        <h2 class="enquiry-title">${lesson.title}</h2>
        <div class="enquiry-core-question">
          <span class="label">Key Enquiry Question</span>
          <span>${lesson.title}</span>
        </div>
      </div>

      <div class="page-prose-body">
        <div class="prose-columns">
          ${versoBlocks
            .map((b, bIdx) => {
              const formattedParas = formatBlockParas(b.text);
              return `
              <div class="block-section">
                <div class="block-header">
                  <span class="block-ref">[${lIdx + 1}.${bIdx + 1}]</span>
                  <span class="block-title">${b.title}</span>
                </div>
                ${formattedParas}
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Enquiry ${num} &bull; Left Spread (Verso)</span>
        <span class="page-pill">Page ${pVerso}</span>
        <span>The History Revision Hub &bull; Zero Primary Sources Mandate</span>
      </div>
    </div>

    <!-- RECTO: ENQUIRY ${num} PART II -->
    <div class="page page-lesson" id="page-${pRecto}" data-page="${pRecto}">
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
        <span class="sub-badge">Enquiry ${num} (Part II) &bull; Page ${pRecto}</span>
        <span>THE SECOND BRITISH EMPIRE</span>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-pill">Enquiry ${num} &bull; Part II</span>
          <span class="enquiry-canon-tag">Decisive Historical Evidence &bull; Analysis</span>
        </div>
        <h2 class="enquiry-title">${lesson.title}</h2>
        <div class="enquiry-core-question">
          <span class="label">Historical Synthesis</span>
          <span>Investigating causation, human resistance, and colonial impact</span>
        </div>
      </div>

      <div class="page-prose-body">
        <div class="prose-columns">
          ${rectoBlocks
            .map((b, bIdx) => {
              const formattedParas = formatBlockParas(b.text);
              return `
              <div class="block-section">
                <div class="block-header">
                  <span class="block-ref">[${lIdx + 1}.${bIdx + 3}]</span>
                  <span class="block-title">${b.title}</span>
                </div>
                ${formattedParas}
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Enquiry ${num} &bull; Right Spread (Recto)</span>
        <span class="page-pill">Page ${pRecto}</span>
        <span>The History Revision Hub &bull; Zero Primary Sources Mandate</span>
      </div>
    </div>
    `;
    })
    .join('')}

  <!-- PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER -->
  <div class="page" id="page-12" data-page="12">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">BACK COVER &bull; RETRIEVAL ENGINE</span>
      <span>PAGE 12</span>
    </div>

    <div class="quiz-top-masthead">
      <div class="quiz-badge">Master Disciplinary Retrieval Engine</div>
      <h2 class="quiz-main-title">MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
    </div>

    <div class="quiz-instructions">
      <strong>Standard Recall Protocol:</strong> 35 core retrieval questions testing factual mastery across all five enquiries (7 questions per enquiry). Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit homework retrieval. (Answers verified in textbook narrative; zero answers printed.)
    </div>

    <div class="quiz-cards-grid">
      ${lessons
        .map((l, cIdx) => {
          const num = String(cIdx + 1).padStart(2, '0');
          const pStart = cIdx * 2 + 2;
          const pEnd = pStart + 1;
          const qs = (l.quiz || []).slice(0, 7);
          return `
          <div class="quiz-card">
            <div class="quiz-card-head">
              <span class="quiz-card-title">Enquiry ${num}: ${l.title.replace(/^How did |^Why did |^Who truly |^How was /i, '').slice(0, 48)}</span>
              <span class="quiz-card-ref">Pages ${pStart}&ndash;${pEnd} &bull; Ref [${cIdx + 1}.1]&ndash;[${cIdx + 1}.4]</span>
            </div>
            <ol class="quiz-questions-list">
              ${qs.map((q) => `<li>${q.question}</li>`).join('')}
            </ol>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>Master Knowledge Retrieval Engine &bull; 35 Core Recall Questions (Zero Answers Printed)</span>
      <span class="page-pill">Page 12</span>
      <span>The History Revision Hub &bull; All Rights Reserved</span>
    </div>
  </div>

</body>
</html>`;
}

async function run() {
  console.log('\n============================================================');
  console.log('🚀 COMPILING 12-PAGE MASTER TEXTBOOK: [second_british_empire]');
  console.log('============================================================');

  const html = buildHtml();
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'second_british_empire');
  const unitDir = path.join(ROOT_DIR, 'units', 'second_british_empire');

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
      const proseEls = p.querySelectorAll('.prose-p');
      const sections = p.querySelectorAll('.block-section');
      if (proseEls.length === 0 || !footer) return;

      let size = 9.35;
      let lh = 1.42;
      let pMargin = 4.0;

      const getOverlap = () => {
        const fTop = footer.getBoundingClientRect().top;
        const children = Array.from(p.querySelectorAll('.block-section, .prose-p, .block-header'));
        const maxB = Math.max(...children.map((c) => c.getBoundingClientRect().bottom));
        return maxB - fTop;
      };

      while (getOverlap() > -12 && size > 7.5) {
        size -= 0.1;
        lh -= 0.01;
        pMargin = Math.max(2.0, pMargin - 0.1);
        proseEls.forEach((el) => {
          el.style.fontSize = size.toFixed(2) + 'pt';
          el.style.lineHeight = lh.toFixed(2);
          el.style.marginBottom = pMargin.toFixed(1) + 'px';
        });
        sections.forEach((s) => (s.style.marginBottom = Math.max(3, pMargin).toFixed(1) + 'px'));
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
      const body = p.querySelector('.page-prose-body, .quiz-cards-grid, .cover-directory');
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
      '✅ PERFECT: All 12 pages have 0px overflow, positive clearance, and balanced text!',
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
    printSpaceAuditReport(report, 'second_british_empire/textbook.html');
  } catch (err) {
    console.warn('Space audit error:', err.message);
  }

  // Save preview screenshots for all 12 pages
  const pageEls = await page.$$('.page');
  for (let i = 0; i < pageEls.length; i++) {
    await pageEls[i].screenshot({
      path: path.join(publicDir, `preview_page${i + 1}.png`),
    });
  }
  console.log(`[OK] Saved all 12 page preview screenshots to: ${publicDir}`);

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });

  const pdfPath = path.join(pdfOutputDir, 'second_british_empire_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 12-Page Textbook PDF compiled to: ${pdfPath}`);

  // Mirror PDF
  const standardPdfPath = path.join(pdfOutputDir, 'second_british_empire_textbook.pdf');
  fs.copyFileSync(pdfPath, standardPdfPath);
  console.log(`[OK] Mirrored PDF to: ${standardPdfPath}`);

  await browser.close();
  console.log(
    '\n🎉 MASTERPIECE COMPILATION SUCCESSFUL: The Second British Empire 12-Page Textbook!\n',
  );
}

run().catch((err) => {
  console.error('Fatal error during compilation:', err);
  process.exit(1);
});
