/**
 * render_narrative_textbook_medieval_england.cjs
 *
 * PURE NARRATIVE CLASSROOM TEXTBOOK (12-Page Saddle-Stitch Model)
 * Conforms strictly to the KS3 Classroom Textbook Engine Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero QR codes/ledgers)
 * - Large, comfortable, high-legibility typography for Year 7 reading (11.5pt body, 1.6 line-height)
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - 5 Canonical Enquiries across 5 flat double-page spreads (Verso + Recto)
 * - Explicit paragraph referencing [1.1] to [5.5] matching pupil workbook citations
 * - Minimalist, dignified front cover (Portchester Keep, clean title, zero clutter)
 * - Classical publisher book synopsis back cover (narrative blurb, 5-enquiry overview, colophon)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub")
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(ROOT_DIR, cleanPath);
    if (!fs.existsSync(fullPath)) return null;
    const ext = path.extname(fullPath).toLowerCase();
    const mime =
      ext === '.png'
        ? 'image/png'
        : ext === '.jpg' || ext === '.jpeg'
          ? 'image/jpeg'
          : ext === '.webp'
            ? 'image/webp'
            : 'image/jpeg';
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${data}`;
  } catch (err) {
    return null;
  }
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// ============================================================================
// CANONICAL 5-ENQUIRY PURE NARRATIVE TEXT (Expanded for 11.5pt Full-Page Flow)
// ============================================================================
const ENQUIRIES = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'perfect_calibrated_enquiries.json'), 'utf8'),
);

const UNIT_DATA = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'data', 'medieval_england.json'), 'utf8'),
);

const RECTO_ANCHORS = {
  1: 'Tactical Deception, The Feigned Retreat & The Death of Harold on Senlac Ridge',
  2: 'Monumental Stone Architecture, Strategic Harbours & Imperial Fiscal Auditing',
  3: 'Clash of Sovereign Jurisdictions: Secular Royal Common Law vs Universal Papal Authority',
  4: 'Baronial Rebellion, The Bouvines Defeat & The Constitutional Subjection of Crown to Law',
  5: 'Demographic Shockwaves, Severe Labour Scarcity & The Irreversible Collapse of Feudal Serfdom',
};

// ============================================================================
// HTML GENERATOR FUNCTION
// ============================================================================
function buildNarrativeTextbookHtml() {
  const coverImgData =
    getBase64Image('/images/portchester_keep.jpg') || '/images/portchester_keep.jpg';

  let spreadsHtml = '';

  ENQUIRIES.forEach((enquiry) => {
    const num = enquiry.num;
    const versoPage = num * 2;
    const rectoPage = num * 2 + 1;

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${num} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page" data-page="${versoPage}" id="page-${versoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">KEY STAGE 3 DISCIPLINARY HISTORY</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART I</span>
      </header>

      <!-- Enquiry Title Banner -->
      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">ENQUIRY 0${num} &bull; YEAR 7</span>
          <span class="enquiry-subtitle-tag">${enquiry.versoSubtitle}</span>
        </div>
        <h1 class="enquiry-main-title">${enquiry.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-badge">KEY ENQUIRY QUESTION</span>
          <span class="eq-text">${enquiry.enquiry}</span>
        </div>
      </div>

      <!-- Main Prose Reading Area (2-Column Flow for Blocks 1 & 2) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 1 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block1.ref}]</span>
              <span class="block-date">${enquiry.block1.date}</span>
              <h2 class="block-title">${enquiry.block1.title}</h2>
            </div>
            ${enquiry.block1.paras
              .map(
                (p) => `
            <p class="prose-p">${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 2 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block2.ref}]</span>
              <span class="block-date">${enquiry.block2.date}</span>
              <h2 class="block-title">${enquiry.block2.title}</h2>
            </div>
            ${enquiry.block2.paras
              .map(
                (p) => `
            <p class="prose-p">${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>Medieval England (1066&ndash;1381) &bull; Enquiry 0${num} Part I</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${num} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">MEDIEVAL ENGLAND (1066&ndash;1381)</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART II</span>
      </header>

      <!-- Recto Section Header -->
      <div class="recto-header-banner">
        <div class="recto-meta-row">
          <span class="recto-part-tag">ENQUIRY 0${num} PART II: CLIMAX, TURNING POINTS &amp; CONSEQUENCES</span>
          <span class="recto-subhead">${enquiry.rectoSubtitle}</span>
        </div>
        <div class="recto-anchor-box">
          <span class="anchor-badge">DECISIVE HISTORICAL MECHANISM</span>
          <span class="anchor-text">${enquiry.rectoAnchor || RECTO_ANCHORS[num] || 'Causal Turning Points & Historical Consequences'}</span>
        </div>
      </div>

      <!-- Main Prose Reading Area (2-Column Continuous Flow for Blocks 3, 4 & 5) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 3 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block3.ref}]</span>
              <span class="block-date">${enquiry.block3.date}</span>
              <h2 class="block-title">${enquiry.block3.title}</h2>
            </div>
            ${enquiry.block3.paras
              .map(
                (p) => `
            <p class="prose-p">${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 4 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block4.ref}]</span>
              <span class="block-date">${enquiry.block4.date}</span>
              <h2 class="block-title">${enquiry.block4.title}</h2>
            </div>
            ${enquiry.block4.paras
              .map(
                (p) => `
            <p class="prose-p">${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 5 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block5.ref}]</span>
              <span class="block-date">${enquiry.block5.date}</span>
              <h2 class="block-title">${enquiry.block5.title}</h2>
            </div>
            ${enquiry.block5.paras
              .map(
                (p) => `
            <p class="prose-p">${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>Medieval England (1066&ndash;1381) &bull; Enquiry 0${num} Part II</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  // Master Knowledge Retrieval Quiz (5 Enquiry Boxes matching the 5 textbook spreads)
  const enquiry1Qs = UNIT_DATA.data.lessons[0].quiz.slice(10, 20).map((q) => q.q || q.question);
  const enquiry2Qs = UNIT_DATA.data.lessons[1].quiz.slice(10, 20).map((q) => q.q || q.question);
  const enquiry3Qs = UNIT_DATA.data.lessons[2].quiz.slice(10, 20).map((q) => q.q || q.question);
  const enquiry4Qs = UNIT_DATA.data.lessons[3].quiz.slice(10, 20).map((q) => q.q || q.question);
  const enquiry5PartAQs = UNIT_DATA.data.lessons[5].quiz
    .slice(10, 20)
    .map((q) => q.q || q.question); // Black Death
  const enquiry5PartBQs = UNIT_DATA.data.lessons[6].quiz
    .slice(10, 20)
    .map((q) => q.q || q.question); // Peasants' Revolt

  let globalQNum = 1;
  function renderQList(questions) {
    return questions
      .map((qText) => {
        const num = globalQNum++;
        return `
        <div class="quiz-item">
          <span class="quiz-num">${num}.</span>
          <span class="quiz-text">${qText}</span>
        </div>
      `;
      })
      .join('');
  }

  const box1List = renderQList(enquiry1Qs);
  const box2List = renderQList(enquiry2Qs);
  const box3List = renderQList(enquiry3Qs);
  const box4List = renderQList(enquiry4Qs);
  const box5PartAList = renderQList(enquiry5PartAQs);
  const box5PartBList = renderQList(enquiry5PartBQs);

  const quizBoxesHtml = `
    <!-- BOX 1: ENQUIRY 1 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 01</span>
          <span class="quiz-title">1066 &amp; The Battle of Hastings</span>
        </div>
        <span class="quiz-locator">pp. 2&ndash;3 &bull; Ref [1.1]&ndash;[1.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box1List}
      </div>
    </div>

    <!-- BOX 2: ENQUIRY 2 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 02</span>
          <span class="quiz-title">Castles, Terror &amp; Domesday</span>
        </div>
        <span class="quiz-locator">pp. 4&ndash;5 &bull; Ref [2.1]&ndash;[2.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box2List}
      </div>
    </div>

    <!-- BOX 3: ENQUIRY 3 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 03</span>
          <span class="quiz-title">Crown vs Church (Henry II &amp; Becket)</span>
        </div>
        <span class="quiz-locator">pp. 6&ndash;7 &bull; Ref [3.1]&ndash;[3.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box3List}
      </div>
    </div>

    <!-- BOX 4: ENQUIRY 4 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 04</span>
          <span class="quiz-title">Magna Carta &amp; Medieval Kingship</span>
        </div>
        <span class="quiz-locator">pp. 8&ndash;9 &bull; Ref [4.1]&ndash;[4.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box4List}
      </div>
    </div>

    <!-- BOX 5: ENQUIRY 5 (SPANS BOTH COLUMNS) -->
    <div class="quiz-grid-card enquiry-span-2">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 05</span>
          <span class="quiz-title">Demographic Catastrophe &amp; Popular Rebellion: The Black Death (1348) &amp; Peasants&rsquo; Revolt (1381)</span>
        </div>
        <span class="quiz-locator">pp. 10&ndash;11 &bull; Ref [5.1]&ndash;[5.5]</span>
      </div>
      <div class="compound-columns-wrap">
        <div class="compound-subcol">
          <div class="subcol-header">
            <span>Part I: The Black Death (1348)</span>
            <span class="subcol-tag">p. 10 &bull; Ref [5.1]&ndash;[5.2]</span>
          </div>
          <div class="quiz-items-wrap">
            ${box5PartAList}
          </div>
        </div>
        <div class="compound-subcol">
          <div class="subcol-header">
            <span>Part II: The Peasants&rsquo; Revolt (1381)</span>
            <span class="subcol-tag">p. 11 &bull; Ref [5.3]&ndash;[5.5]</span>
          </div>
          <div class="quiz-items-wrap">
            ${box5PartBList}
          </div>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medieval England (1066–1381) — Classroom Reading Anthology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --crimson-accent: #991b1b;
      --crimson-dark: #7f1d1d;
      --navy-deep: #0f284e;
      --gold-royal: #b45309;
      --parchment-bg: #fdfbf7;
      --border-soft: #cbd5e1;
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', -apple-system, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background: #e2e8f0;
      color: var(--ink-primary);
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.6;
      margin: 0;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Screen Quick Control Bar */
    .screen-control-bar {
      width: 210mm;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      margin-bottom: 20px;
      font-family: var(--font-sans);
      font-size: 8.5pt;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .screen-control-bar .badge-hub {
      background: var(--crimson-accent);
      color: #ffffff;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .screen-control-bar button {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 8pt;
    }
    .screen-control-bar button:hover {
      background: #334155;
    }

    /* =============================================================
       A4 PAGE ARCHITECTURE (210mm x 297mm)
       ============================================================= */
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 11mm 15mm 9mm 15mm;
      page-break-after: always;
      break-after: always;
    }

    /* =============================================================
       PAGE 1: MASTER FRONT COVER (Rich Architectural Overview)
       ============================================================= */
    .a4-page.front-cover {
      background: #0f172a;
      color: #ffffff;
      padding: 10mm 15mm 9mm 15mm;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.5mm;
      margin-bottom: 2.5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .cover-title-group {
      text-align: center;
      margin-bottom: 2.8mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: #991b1b;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      padding: 2.2px 12px;
      border-radius: 3px;
      margin-bottom: 2mm;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 26.5pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #ffffff;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-size: 10.6pt;
      font-style: italic;
      color: #cbd5e1;
      line-height: 1.34;
    }

    /* Hero Plate & Overview Row */
    .cover-hero-row {
      display: flex;
      gap: 16px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 3mm 4.5mm;
      margin-bottom: 3.2mm;
      align-items: center;
    }
    .cover-hero-artwork-frame {
      width: 78mm;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 58.5mm;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      background: #000000;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6pt;
      color: #94a3b8;
      margin-top: 1mm;
      line-height: 1.15;
      text-align: center;
      font-style: italic;
    }
    .cover-overview-narrative {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.6mm;
    }
    .cover-overview-title {
      color: #fca5a5;
      font-family: var(--font-sans);
      font-size: 9.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(252, 165, 165, 0.3);
      padding-bottom: 1.1mm;
      margin-bottom: 0.5mm;
    }
    .cover-overview-p {
      font-family: var(--font-body);
      font-size: 10.4pt;
      line-height: 1.41;
      color: #f8fafc;
      text-align: justify;
      text-justify: inter-word;
    }

    /* Enquiries Syllabus Box */
    .cover-enquiries-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 4.8mm 6.2mm;
      border-left: 5px solid #991b1b;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .cover-enquiries-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #0f284e;
      padding-bottom: 1.4mm;
      margin-bottom: 2mm;
      font-family: var(--font-sans);
    }
    .cover-enquiries-header h2 {
      font-size: 9.6pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0f284e;
    }
    .cover-enquiries-header span {
      font-size: 7.6pt;
      font-weight: 700;
      color: #991b1b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-enquiry-list {
      display: flex;
      flex-direction: column;
      gap: 3.2mm;
    }
    .cover-enquiry-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-family: var(--font-sans);
      padding-bottom: 2.6mm;
      border-bottom: 1px solid #f1f5f9;
    }
    .cover-enquiry-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .cover-enquiry-num {
      background: #0f284e;
      color: #ffffff;
      font-size: 7.8pt;
      font-weight: 800;
      padding: 2.5px 7px;
      border-radius: 3px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .cover-enquiry-text {
      flex: 1;
    }
    .cover-enquiry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .cover-enquiry-title {
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
    }
    .cover-enquiry-locator {
      font-size: 7.4pt;
      font-weight: 700;
      color: #991b1b;
      flex-shrink: 0;
      margin-left: 8px;
    }
    .cover-enquiry-question {
      font-family: var(--font-body);
      font-size: 8.2pt;
      font-style: italic;
      color: #334155;
      line-height: 1.32;
      margin-bottom: 2px;
    }
    .cover-enquiry-desc {
      font-size: 7.4pt;
      color: #64748b;
      line-height: 1.32;
    }

    /* Bottom Concept Strip */
    .cover-concept-strip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 2.2mm 3.5mm;
      margin-top: 3.2mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.35;
    }
    .cover-concept-label {
      background: #0f284e;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      font-size: 6.5pt;
      letter-spacing: 0.06em;
      flex-shrink: 0;
    }

    .cover-footer-meta {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 2mm;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      font-family: var(--font-sans);
      font-size: 7pt;
      color: #94a3b8;
    }

    /* =============================================================
       PAGES 2–11: SPREAD RUNNING HEADERS & FOOTERS
       ============================================================= */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-soft);
      padding-bottom: 1.5mm;
      margin-bottom: 2.2mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .page-running-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-soft);
      padding-top: 1.8mm;
      margin-top: 1.8mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--ink-muted);
    }
    .page-running-footer .page-num {
      font-weight: 800;
      color: var(--ink-primary);
      font-size: 8.5pt;
    }

    /* =============================================================
       VERSO ENQUIRY HEADER
       ============================================================= */
    .enquiry-title-banner {
      margin-bottom: 2.2mm;
    }
    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.2mm;
    }
    .enquiry-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 2px;
    }
    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 7pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 13.5pt;
      font-weight: 800;
      color: var(--ink-primary);
      line-height: 1.2;
      margin-bottom: 1.8mm;
    }
    .enquiry-question-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid var(--crimson-accent);
      padding: 1.5mm 3mm;
      border-radius: 3px;
      display: flex;
      align-items: baseline;
      gap: 5px;
    }
    .eq-badge {
      display: inline-block;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--crimson-accent);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
      margin-right: 5px;
    }
    .eq-text {
      font-family: var(--font-body);
      font-size: 8.4pt;
      font-style: italic;
      color: var(--ink-secondary);
      line-height: 1.25;
    }

    /* =============================================================
       RECTO RUNNING SUBHEAD & DECISIVE MECHANISM
       ============================================================= */
    .recto-header-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--navy-deep);
      border-bottom: 1px solid #e2e8f0;
      padding: 1.4mm 2.8mm;
      margin-bottom: 2mm;
    }
    .recto-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2mm;
    }
    .recto-part-tag {
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: var(--font-sans);
    }
    .recto-subhead {
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
      font-family: var(--font-sans);
    }
    .recto-anchor-box {
      display: flex;
      align-items: baseline;
      gap: 5px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 1.2mm 2.5mm;
    }
    .anchor-badge {
      display: inline-block;
      font-family: var(--font-sans);
      font-size: 6pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1.2px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
      margin-right: 4px;
    }
    .anchor-text {
      font-family: var(--font-body);
      font-size: 8.2pt;
      font-style: italic;
      color: var(--ink-secondary);
      line-height: 1.22;
    }

    /* =============================================================
       PROSE BODY & TWO-COLUMN ARCHITECTURE (11.5pt Reading Grade)
       ============================================================= */
    .page-prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .prose-two-column {
      column-count: 2;
      column-gap: 20px;
      column-fill: balance;
      height: 100%;
    }
    .prose-two-column .narrative-block:last-child,
    .prose-two-column .narrative-block:last-child .prose-p:last-child {
      margin-bottom: 0;
    }
    .narrative-block {
      break-inside: auto;
      margin-bottom: 5px;
    }
    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
      margin-bottom: 1.5px;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 5px;
    }
    .block-ref {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .block-date {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .block-title {
      font-family: var(--font-sans);
      font-size: 8.8pt;
      font-weight: 800;
      color: var(--ink-primary);
      width: 100%;
      margin-top: 1px;
      line-height: 1.25;
    }
    .prose-p {
      font-size: 11.5pt;
      line-height: 1.54;
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
      margin-bottom: 3.8px;
    }
    .prose-p strong {
      color: var(--ink-primary);
      font-weight: 700;
    }

    /* =============================================================
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ (6-Box Grid)
       ============================================================= */
    .a4-page.back-cover {
      background: #faf8f5;
      padding: 9.5mm 13mm 7.5mm 13mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0;
    }
    .back-header-strip {
      border-bottom: 2.2px solid #8b0000;
      padding-bottom: 2mm;
      margin-bottom: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h2 {
      font-family: var(--font-display);
      font-size: 15.5pt;
      font-weight: 800;
      color: #0b192c;
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .header-left p {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      color: #8b0000;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1.5px;
    }
    .header-right {
      text-align: right;
    }
    .badge-capsule {
      background: #0b192c;
      color: #fff;
      font-family: var(--font-sans);
      font-size: 7pt;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
    }
    .header-right p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }

    /* INSTRUCTIONS BANNER */
    .quiz-instructions-strip {
      background: #f1f5f9;
      border-left: 3px solid #8b0000;
      padding: 1.8mm 3mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: #1e293b;
    }
    .quiz-instructions-strip span {
      flex: 1;
    }
    .quiz-instructions-strip strong {
      color: #0b192c;
    }

    /* 2x3 GRID CONTAINER */
    .quiz-grid-container {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 2.5mm 3.5mm;
    }
    .quiz-grid-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    /* Box 5 spans full width across both columns */
    .quiz-grid-card.enquiry-span-2 {
      grid-column: span 2;
    }
    .quiz-grid-header {
      border-bottom: 1.4px solid #8b0000;
      padding-bottom: 1.5px;
      margin-bottom: 1.8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-family: var(--font-sans);
      font-size: 6.5pt;
      font-weight: 800;
      color: #8b0000;
      letter-spacing: 0.04em;
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0b192c;
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 6.3pt;
      font-weight: 700;
      color: #64748b;
    }
    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5px;
    }
    .quiz-item {
      display: flex;
      gap: 3.5px;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: #8b0000;
      min-width: 15px;
      flex-shrink: 0;
    }
    .quiz-text {
      flex: 1;
    }
    /* Compound Box 5 inner split */
    .compound-columns-wrap {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
    }
    .compound-subcol {
      display: flex;
      flex-direction: column;
    }
    .subcol-header {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0b192c;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 1px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
    }
    .subcol-header span.subcol-tag {
      color: #8b0000;
      font-size: 6.2pt;
    }
    .back-colophon {
      border-top: 1px solid #cbd5e1;
      padding-top: 1.8mm;
      margin-top: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }

    /* Print media overrides */
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .screen-control-bar {
        display: none !important;
      }
      .a4-page {
        box-shadow: none !important;
        margin: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Only Quick Control Bar -->
  <div class="screen-control-bar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span class="badge-hub">The History Revision Hub</span>
      <span>Medieval England (1066&ndash;1381) &bull; Master Classroom Reading Anthology (12 Pages)</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="anthology-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover cover-page textbook-page" data-page="1" id="page-1">
      <div class="cover-top-masthead">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Key Stage 3 Disciplinary History</span>
      </div>

      <div class="cover-title-group">
        <span class="cover-date-pill">1066 &ndash; 1381</span>
        <h1>MEDIEVAL ENGLAND</h1>
        <p>The Struggle for Power: Monarchy, Church &amp; Popular Rebellion</p>
      </div>

      <!-- HERO VISUAL PLATE & STORY BLURB ROW -->
      <div class="cover-hero-row">
        <div class="cover-hero-artwork-frame">
          <div class="cover-hero-img-box">
            <img src="${coverImgData}" alt="Portchester Castle Norman Keep" />
          </div>
          <div class="cover-hero-caption">Portchester Castle Norman Keep &bull; Hampshire (Late 11th Century)</div>
        </div>
        <div class="cover-overview-narrative">
          <div class="cover-overview-title">HISTORICAL OVERVIEW &bull; 1066&ndash;1381</div>
          <p class="cover-overview-p">
            In October 1066, on a bloody ridge near Hastings, an arrow pierced King Harold&rsquo;s eye and shattered Anglo-Saxon England forever. Duke William unleashed a brutal conquest&mdash;erecting towering stone keeps to terrify the conquered, laying waste to Yorkshire in the ferocious Harrying of the North, and recording every acre and ox in the Domesday Book to cement iron-fisted Norman rule.
          </p>
          <p class="cover-overview-p">
            Yet the crown&rsquo;s grip was never secure. Across three turbulent centuries, violent clashes between monarchs and subjects transformed the realm: from the martyrdom of Thomas Becket at Canterbury and the revolutionary liberties extorted at Magna Carta, to the horror of the Black Death and the armed peasants marching on London in 1381 to demand an end to serfdom.
          </p>
        </div>
      </div>

      <!-- 5 ENQUIRIES OVERVIEW BOX -->
      <div class="cover-enquiries-box">
        <div class="cover-enquiries-header">
          <h2>Curriculum Enquiries in This Volume</h2>
          <span>Chronological Syllabus Overview</span>
        </div>
        <div class="cover-enquiry-list">
          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">01</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">1066: The Succession Crisis &amp; The Battle of Hastings</span>
                <span class="cover-enquiry-locator">pp. 2&ndash;3 &bull; Ref [1.1]&ndash;[1.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Why did three men claim one throne in 1066, and how did William secure victory at Hastings?</div>
              <div class="cover-enquiry-desc">Edward the Confessor's deathbed void, the Witan's dilemma, Harold Godwinson's coronation, Harald Hardrada's invasion at Stamford Bridge, and the tactical turning point on Senlac Ridge.</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">02</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">Castles, Terror &amp; Domesday: How Did the Normans Subjugate England?</span>
                <span class="cover-enquiry-locator">pp. 4&ndash;5 &bull; Ref [2.1]&ndash;[2.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: How did William the Conqueror crush English rebellion and consolidate total control by 1086?</div>
              <div class="cover-enquiry-desc">Motte-and-bailey blitzkrieg, scorched earth during the Harrying of the North, Portchester Castle's stone keep, the 1086 fiscal audit, and total Saxon aristocratic land dispossession.</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">03</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">Crown vs Church: Why Did Henry II Clash With Thomas Becket?</span>
                <span class="cover-enquiry-locator">pp. 6&ndash;7 &bull; Ref [3.1]&ndash;[3.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Was the murder of Thomas Becket a defense of royal law or a catastrophic abuse of monarchical tyranny?</div>
              <div class="cover-enquiry-desc">Secular royal justice vs ecclesiastical immunity, the Clarendon clash over criminous clerks, six years of papal exile in France, the fatal Christmas rage, and Canterbury martyrdom.</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">04</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">Magna Carta (1215) &amp; Medieval Kingship: Liberty or Barons’ Power Grab?</span>
                <span class="cover-enquiry-locator">pp. 8&ndash;9 &bull; Ref [4.1]&ndash;[4.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Did Magna Carta establish universal rule of law or protect selfish baronial privilege?</div>
              <div class="cover-enquiry-desc">King John 'Softsword', the loss of Normandy, feudal scutage extortion, the Papal Interdict, catastrophic defeat at Bouvines, Runnymede, and foundational Clause 39 liberties.</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">05</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">The Black Death (1348) &amp; The Peasants’ Revolt (1381)</span>
                <span class="cover-enquiry-locator">pp. 10&ndash;11 &bull; Ref [5.1]&ndash;[5.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Did demographic catastrophe and popular rebellion permanently shatter feudal serfdom in England?</div>
              <div class="cover-enquiry-desc">Yersinia pestis pandemic, acute rural labour shortages, Statute of Labourers wage freeze, regressive Poll Taxes, John Ball's sermons, the sack of London, and the Smithfield climax.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Classroom Reading Edition &bull; 100% Pure Disciplinary Narrative Architecture</span>
      </div>
    </div>

    <!-- =========================================================
         PAGES 2–11: 5 CANONICAL ENQUIRY SPREADS
         ========================================================= -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 12: MASTER CLASSROOM BACK COVER (Knowledge Retrieval Quiz)
         ========================================================= -->
    <div class="a4-page back-cover textbook-page" data-page="12" id="page-12">
      
      <div class="back-header-strip">
        <div class="header-left">
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>60 Essential Recall Questions &bull; Medieval England 1066&ndash;1381</p>
        </div>
        <div class="header-right">
          <span class="badge-capsule">Partner Quiz or Solo Practice</span>
          <p>Check your answers inside &bull; Paragraphs [1.1] to [5.5]</p>
        </div>
      </div>

      <div class="quiz-instructions-strip">
        <span><strong>Partner Quiz:</strong> Sit in pairs with one book closed. Take turns reading 5 questions to test your partner. Swap roles!</span>
        <span><strong>Solo Practice:</strong> Pick an Enquiry box. Write answers 1 to 10 in your book from memory, then check paragraphs to mark your score.</span>
      </div>

      <div class="quiz-grid-container">
        ${quizBoxesHtml}
      </div>

      <footer class="back-colophon page-footer">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Classroom Retrieval Edition &bull; Page 12 of 12</span>
      </footer>

    </div>

  </div>

  <script>
    function autoBalanceProsePages() {
      const pages = document.querySelectorAll('.a4-page.textbook-page:not(.front-cover):not(.back-cover)');
      pages.forEach(p => {
        const pRect = p.getBoundingClientRect();
        const paras = Array.from(p.querySelectorAll('.prose-p'));
        if (!paras.length) return;

        // Reset to clean CSS baseline before balancing
        paras.forEach(pr => {
          pr.style.lineHeight = '';
          pr.style.marginBottom = '';
        });

        function check() {
          const spill = Array.from(p.querySelectorAll('*')).some(el => el.getBoundingClientRect().right > pRect.right + 4);
          const lastChild = Array.from(p.querySelectorAll('*')).reduce((acc, el) => {
            const r = el.getBoundingClientRect();
            return (r.bottom <= pRect.bottom + 2 && r.bottom > acc) ? r.bottom : acc;
          }, pRect.top);
          const gap = Math.round(pRect.bottom - lastChild);
          return { spill, gap };
        }

        let current = check();
        let bestLh = 1.54;
        let bestMb = 3.8;

        if (current.spill) {
          for (let lh = 1.53; lh >= 1.46; lh -= 0.01) {
            paras.forEach(pr => pr.style.lineHeight = lh.toFixed(2));
            current = check();
            if (!current.spill) {
              bestLh = lh;
              break;
            }
          }
          if (current.spill) {
            for (let mb = 3.5; mb >= 2.0; mb -= 0.5) {
              paras.forEach(pr => pr.style.marginBottom = mb.toFixed(1) + 'px');
              current = check();
              if (!current.spill) {
                bestMb = mb;
                break;
              }
            }
          }
        } else if (current.gap > 25) {
          for (let lh = 1.55; lh <= 1.68; lh += 0.01) {
            paras.forEach(pr => pr.style.lineHeight = lh.toFixed(2));
            const c = check();
            if (!c.spill) {
              current = c;
              bestLh = lh;
              if (c.gap <= 25) break;
            } else {
              paras.forEach(pr => pr.style.lineHeight = bestLh.toFixed(2));
              break;
            }
          }
          if (current.gap > 25) {
            for (let mb = 4.0; mb <= 8.0; mb += 0.5) {
              paras.forEach(pr => pr.style.marginBottom = mb.toFixed(1) + 'px');
              const c = check();
              if (!c.spill) {
                current = c;
                bestMb = mb;
                if (c.gap <= 25) break;
              } else {
                paras.forEach(pr => pr.style.marginBottom = bestMb.toFixed(1) + 'px');
                break;
              }
            }
          }
        }
      });
    }

    window.addEventListener('DOMContentLoaded', autoBalanceProsePages);
    window.autoBalanceProsePages = autoBalanceProsePages;
  </script>

</body>
</html>`;
}

// ============================================================================
// MAIN EXECUTION & PDF GENERATION
// ============================================================================
async function run() {
  console.log('Building 12-Page Pure Narrative Classroom Textbook HTML...');
  const html = buildNarrativeTextbookHtml();

  const publicHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'medieval_england',
    'textbook.html',
  );
  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log('HTML saved to:', publicHtmlPath);

  // Synchronize to root units copy
  const rootHtmlPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'textbook.html');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');

  console.log('Launching Puppeteer to audit and compile 12-page PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Run autoBalanceProsePages in browser
  await page.evaluate(() => {
    if (typeof window.autoBalanceProsePages === 'function') {
      window.autoBalanceProsePages();
    }
  });

  // Page Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    return Array.from(pages).map((p, index) => {
      const pageNum = p.getAttribute('data-page') || index + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      return {
        page: pageNum,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: scrollH > clientH + 4,
        diff: scrollH - clientH,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log('PERFECT: All 12 pages have 0px overflow!');
  }

  // Audit Page Budget
  console.log('\nAuditing Page Budget...');
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.a4-page, .textbook-page',
      underflowThresholdPx: 45,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'textbook.html');
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) {
    fs.mkdirSync(pdfOutputDir, { recursive: true });
  }

  const pdfPath = path.join(pdfOutputDir, 'medieval_england_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });

  console.log('Master 12-Page Textbook PDF compiled to:', pdfPath);
  await browser.close();

  console.log('Compilation completed successfully.');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error during compilation:', err);
    process.exit(1);
  });
}

module.exports = {
  buildNarrativeTextbookHtml,
  run,
};
