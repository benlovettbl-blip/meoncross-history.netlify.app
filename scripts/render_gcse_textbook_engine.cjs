/**
 * scripts/render_gcse_textbook_engine.cjs
 *
 * UNIVERSAL GCSE 28-PAGE MASTER CLASSROOM TEXTBOOK COMPILER ENGINE
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard:
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, atmospheric narrative hook, 12-enquiry syllabus roadmap)
 * - Page 2:  Master Chronological Milestone Spine (15 defining turning points & causal dominoes)
 * - Page 3:  Geopolitical Theater Atlas & 4 Strategic Flashpoints (Dual maps + 2x2 flashpoints grid)
 * - Pages 4–27: 12 Canonical Enquiries across 12 flat double-page spreads (Verso + Recto)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Body font >= 11.5pt Lora serif, 1.58 line-height
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 *
 * Usage:
 *   node scripts/render_gcse_textbook_engine.cjs --unit=cme_new
 *   node scripts/render_gcse_textbook_engine.cjs --data=./scripts/my_unit_data.cjs
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Parse CLI arguments
const args = process.argv.slice(2);
let unitId = 'cme_new';
let dataFilePath = null;

for (const arg of args) {
  if (arg.startsWith('--unit=')) {
    unitId = arg.split('=')[1];
  } else if (arg.startsWith('--data=')) {
    dataFilePath = path.resolve(ROOT_DIR, arg.split('=')[1]);
  }
}

if (!dataFilePath && (unitId === 'cme_new' || unitId === 'cme_unified')) {
  console.log(
    `🚀 Delegating CME compilation to canonical 1:1 app-aligned compiler: scripts/render_standard_textbook_cme_unified.cjs`,
  );
  const { execSync } = require('child_process');
  execSync(`node "${path.join(__dirname, 'render_standard_textbook_cme_unified.cjs')}"`, {
    stdio: 'inherit',
    cwd: ROOT_DIR,
  });
  process.exit(0);
}

if (!dataFilePath) {
  // Attempt standard locations
  const candidates = [
    path.join(__dirname, `${unitId}_unified_textbook_data.cjs`),
    path.join(__dirname, `${unitId}_textbook_data.cjs`),
    path.join(ROOT_DIR, 'public', 'units', unitId, 'textbook_data.cjs'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      dataFilePath = c;
      break;
    }
  }
}

if (!dataFilePath || !fs.existsSync(dataFilePath)) {
  console.error(`❌ Error: Data file not found for unit "${unitId}".`);
  console.error(
    `Please provide --data=<path_to_data.cjs> or ensure scripts/${unitId}_unified_textbook_data.cjs exists.`,
  );
  process.exit(1);
}

console.log(`Loading unit data from: ${dataFilePath}`);
const DATA = require(dataFilePath);

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', unitId, 'assets', path.basename(cleanPath)),
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
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function buildHtml() {
  const coverImgData = getBase64Image(DATA.COVER_CONFIG.coverImage);
  const mapRegionalData = getBase64Image(DATA.THEATER_MAP_CONFIG.mapRegionalImage);
  const mapLocalData = getBase64Image(
    DATA.THEATER_MAP_CONFIG.mapIsraelImage || DATA.THEATER_MAP_CONFIG.mapLocalImage,
  );

  // 1. FRONT COVER (Page 1) Directory Items
  const syllabusItemsHtml = DATA.ENQUIRIES.map((e) => {
    const startP = e.num * 2 + 2;
    const endP = startP + 1;
    return `
      <div class="cover-enquiry-item">
        <span class="cover-enquiry-num">${e.ktCode || String(e.num).padStart(2, '0')}</span>
        <div class="cover-enquiry-text">
          <div class="cover-enquiry-top-row">
            <span class="cover-enquiry-title">${e.title}</span>
            <span class="cover-enquiry-locator">pp. ${startP}&ndash;${endP} &bull; [${e.num}.1]&ndash;[${e.num}.4]</span>
          </div>
          <div class="cover-enquiry-question">${e.enquiry}</div>
        </div>
      </div>
    `;
  }).join('');

  // 2. MILESTONE SPINE (Page 2)
  const milestoneItemsHtml = DATA.MILESTONE_SPINE.map((m) => {
    return `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
            <span class="spine-ref">Ref [${m.ref}]</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // 3. FLASHPOINTS (Page 3)
  const flashpointsHtml = (DATA.THEATER_MAP_CONFIG.flashpoints || [])
    .map((f) => {
      return `
      <div class="fp-card">
        <div class="fp-header">
          <span class="fp-badge">${f.badge}</span>
          <h3 class="fp-title">${f.title}</h3>
        </div>
        <p class="fp-text">${f.text}</p>
      </div>
    `;
    })
    .join('');

  // 4. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';
  DATA.ENQUIRIES.forEach((enquiry) => {
    const num = enquiry.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${String(num).padStart(2, '0')} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page" data-page="${versoPage}" id="page-${versoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">${DATA.COVER_CONFIG.title} &bull; ${enquiry.ktGroup || 'GCSE MASTER SERIES'}</span>
        <span class="rh-right">${enquiry.ktCode || 'ENQ ' + num} &bull; PART I</span>
      </header>

      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">${enquiry.ktCode || 'ENQ ' + num} &bull; ENQUIRY ${String(num).padStart(2, '0')}</span>
          <span class="enquiry-subtitle-tag">${enquiry.versoSubtitle || 'Part I'}</span>
        </div>
        <h1 class="enquiry-main-title">${enquiry.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-badge">KEY ENQUIRY QUESTION</span>
          <span class="eq-text">${enquiry.enquiry}</span>
        </div>
      </div>

      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block1.ref}]</span>
              <span class="block-date">${enquiry.block1.date}</span>
              <h2 class="block-title">${enquiry.block1.title}</h2>
            </div>
            ${enquiry.block1.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('')}
          </section>

          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block2.ref}]</span>
              <span class="block-date">${enquiry.block2.date}</span>
              <h2 class="block-title">${enquiry.block2.title}</h2>
            </div>
            ${enquiry.block2.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('')}
          </section>

        </div>
      </main>

      <footer class="page-running-footer">
        <span>${DATA.COVER_CONFIG.title} &bull; Enquiry ${String(num).padStart(2, '0')} Part I</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${String(num).padStart(2, '0')} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">${DATA.COVER_CONFIG.title}</span>
        <span class="rh-right">${enquiry.ktCode || 'ENQ ' + num} &bull; PART II</span>
      </header>

      <div class="recto-header-banner">
        <div class="recto-meta-row">
          <span class="recto-part-tag">${enquiry.ktCode || 'ENQ ' + num} PART II: CLIMAX, TURNING POINTS &amp; CONSEQUENCES</span>
          <span class="recto-subhead">${enquiry.rectoSubtitle || 'Part II'}</span>
        </div>
        <div class="recto-anchor-box">
          <span class="anchor-badge">DECISIVE HISTORICAL MECHANISM</span>
          <span class="anchor-text">${enquiry.rectoAnchor}</span>
        </div>
      </div>

      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block3.ref}]</span>
              <span class="block-date">${enquiry.block3.date}</span>
              <h2 class="block-title">${enquiry.block3.title}</h2>
            </div>
            ${enquiry.block3.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('')}
          </section>

          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block4.ref}]</span>
              <span class="block-date">${enquiry.block4.date}</span>
              <h2 class="block-title">${enquiry.block4.title}</h2>
            </div>
            ${enquiry.block4.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('')}
          </section>

        </div>
      </main>

      <footer class="page-running-footer">
        <span>${DATA.COVER_CONFIG.title} &bull; Enquiry ${String(num).padStart(2, '0')} Part II</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  // 5. MASTER RETRIEVAL QUIZ (Page 28)
  const cardKeys = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
  let globalQNum = 1;
  const quizCardsHtml = cardKeys
    .map((k, idx) => {
      const startEnq = idx * 2 + 1;
      const endEnq = startEnq + 1;
      const startP = startEnq * 2 + 2;
      const endP = endEnq * 2 + 3;
      const qList = (DATA.QUIZ_QUESTIONS[k] || [])
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

      return `
      <div class="quiz-grid-card">
        <div class="quiz-grid-header">
          <div class="quiz-title-wrap">
            <span class="quiz-badge">ENQUIRIES ${startEnq} &amp; ${endEnq}</span>
            <span class="quiz-title">Core Knowledge Check</span>
          </div>
          <span class="quiz-locator">pp. ${startP}&ndash;${endP} &bull; Ref [${startEnq}.1]&ndash;[${endEnq}.4]</span>
        </div>
        <div class="quiz-items-wrap">
          ${qList}
        </div>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${DATA.COVER_CONFIG.title} — Master Classroom Textbook</title>
  <meta name="description" content="GCSE Master Pure Narrative Classroom Textbook. Exactly 28 pages." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --navy-deep: #0b192c;
      --crimson-accent: #8b0000;
      --gold-royal: #c5a059;
      --ink-primary: #1e293b;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --border-soft: #cbd5e1;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      background: #525659;
      margin: 0;
      padding: 20px 0;
      font-family: var(--font-body);
      color: var(--ink-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }

    .anthology-book-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      padding: 13mm 18mm 13mm 18mm;
    }

    @media print {
      body { background: transparent; padding: 0; }
      .anthology-book-container { gap: 0; }
      .a4-page {
        box-shadow: none;
        page-break-after: always;
        break-after: page;
        margin: 0;
        width: 210mm;
        height: 297mm;
      }
    }

    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 2mm;
      margin-bottom: 3.5mm;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .page-running-footer {
      margin-top: auto;
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--ink-muted);
    }
    .page-num {
      font-weight: 700;
      color: var(--navy-deep);
    }

    /* FRONT COVER (Page 1) */
    .front-cover {
      background: #0f172a;
      color: #ffffff;
      padding: 13mm 18mm 11mm 18mm;
      justify-content: space-between;
    }
    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 2mm;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .cover-title-group {
      text-align: center;
      margin-top: 2mm;
      margin-bottom: 2mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: var(--crimson-accent);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.15em;
      padding: 1.5px 9px;
      border-radius: 3px;
      margin-bottom: 2mm;
      text-transform: uppercase;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 23pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      color: #ffffff;
      line-height: 1.05;
      margin-bottom: 1.5mm;
      text-transform: uppercase;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-size: 9.8pt;
      font-style: italic;
      color: #cbd5e1;
    }
    .cover-hero-row {
      display: grid;
      grid-template-columns: 82mm 1fr;
      gap: 14px;
      align-items: center;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      padding: 11px 13px;
      margin-bottom: 3.5mm;
    }
    .cover-hero-artwork-frame {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      overflow: hidden;
      background: #000000;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 76mm;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3px 6px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }
    .cover-overview-narrative {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cover-overview-title {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 800;
      color: #f1f5f9;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 1.5px solid var(--crimson-accent);
      padding-bottom: 1.5mm;
      margin-bottom: 2.2mm;
    }
    .cover-overview-p {
      font-family: var(--font-body);
      font-size: 9.1pt;
      line-height: 1.41;
      color: #e2e8f0;
      text-align: justify;
      margin-bottom: 5px;
    }
    .cover-overview-p:last-child { margin-bottom: 0; }
    .cover-enquiries-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .cover-enquiry-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
      flex: 1;
      align-content: space-around;
    }
    .cover-enquiry-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 7.2pt;
    }
    .cover-enquiry-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 1.5px 5px;
      border-radius: 2px;
      font-size: 6.2pt;
      white-space: nowrap;
    }
    .cover-enquiry-text {
      flex: 1;
    }
    .cover-enquiry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .cover-enquiry-title {
      font-weight: 700;
      color: #0f172a;
      font-family: var(--font-sans);
      font-size: 7.8pt;
    }
    .cover-enquiry-locator {
      font-size: 6.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .cover-enquiry-question {
      font-style: italic;
      color: #475569;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .cover-footer-meta {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 6pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* PAGE 2: CHRONOLOGICAL SPINE */
    .spine-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .spine-header-strip h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .spine-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .spine-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .spine-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 20.5mm;
      top: 5mm;
      bottom: 5mm;
      width: 2px;
      background: #e2e8f0;
      z-index: 1;
    }
    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      position: relative;
      z-index: 2;
    }
    .spine-date-badge {
      width: 17mm;
      text-align: right;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      padding-top: 1px;
    }
    .spine-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--navy-deep);
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px var(--navy-deep);
      margin-top: 3px;
      flex-shrink: 0;
    }
    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 2.2px 7px;
    }
    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }
    .spine-title {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
    }
    .spine-ref {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 4px;
      border-radius: 2px;
    }
    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.22;
      color: #334155;
    }

    /* PAGE 3: DUAL MAPS & 4 FLASHPOINTS */
    .page-3-dual-maps {
      justify-content: flex-start;
      gap: 0;
    }
    .map-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .map-header-strip h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .map-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 1px;
    }
    .dual-maps-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5mm;
      margin-bottom: 2.5mm;
      min-width: 0;
      max-width: 100%;
    }
    .dual-map-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
      max-width: 100%;
    }
    .dual-map-header {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--crimson-accent);
    }
    .dual-map-badge {
      font-family: var(--font-sans);
      font-size: 6pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--crimson-accent);
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .dual-map-title {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #f1f5f9;
    }
    .dual-map-img-box {
      width: 100%;
      height: 94mm;
      max-height: 94mm;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .dual-map-img-box img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    .dual-map-caption {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
      background: #f1f5f9;
      padding: 3px 6px;
      border-top: 1px solid #e2e8f0;
    }
    .flashpoints-section {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 8px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 2mm;
      min-width: 0;
    }
    .flashpoints-section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1.5px solid var(--navy-deep);
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .flashpoints-section-header h3 {
      font-family: var(--font-display);
      font-size: 9.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .flashpoints-section-header span {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .flashpoints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      flex: 1;
      align-content: space-around;
      min-width: 0;
    }
    .fp-card {
      background: #f8fafc;
      border-left: 2.5px solid var(--crimson-accent);
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 2px;
      padding: 3px 6px;
      min-width: 0;
    }
    .fp-header {
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 1.5px;
    }
    .fp-badge {
      font-family: var(--font-sans);
      font-size: 5.8pt;
      font-weight: 800;
      color: #ffffff;
      background: #b45309;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .fp-title {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: #7c2d12;
      line-height: 1.15;
    }
    .fp-text {
      font-family: var(--font-body);
      font-size: 7.4pt;
      line-height: 1.28;
      color: #334155;
      text-align: justify;
    }

    /* NARRATIVE ENQUIRY SPREADS (Pages 4–27) */
    .enquiry-title-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--crimson-accent);
      border-bottom: 1px solid #e2e8f0;
      padding: 2.2mm 3.5mm;
      margin-bottom: 3.5mm;
    }
    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .enquiry-badge {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
    }
    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 900;
      color: var(--navy-deep);
      line-height: 1.15;
      margin-bottom: 2mm;
    }
    .enquiry-question-box {
      display: flex;
      align-items: baseline;
      gap: 5px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 1.5mm 3mm;
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

    .recto-header-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--navy-deep);
      border-bottom: 1px solid #e2e8f0;
      padding: 2.2mm 3.5mm;
      margin-bottom: 3.5mm;
    }
    .recto-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5mm;
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
      padding: 1.5mm 3mm;
    }
    .anchor-badge {
      display: inline-block;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
      margin-right: 5px;
    }
    .anchor-text {
      font-family: var(--font-body);
      font-size: 8.4pt;
      font-style: italic;
      color: var(--ink-secondary);
      line-height: 1.25;
    }

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
      margin-bottom: 9px;
    }
    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
      margin-bottom: 2.5px;
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
      font-size: 6.6pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .block-title {
      font-family: var(--font-sans);
      font-size: 8.6pt;
      font-weight: 800;
      color: var(--ink-primary);
      width: 100%;
      margin-top: 1px;
      line-height: 1.22;
    }
    .prose-p {
      font-size: 11.5pt;
      line-height: 1.58;
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
      margin-bottom: 6px;
    }
    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* PAGE 28: MASTER RETRIEVAL QUIZ */
    .back-cover {
      background: #ffffff;
      padding: 11mm 16mm 10mm 16mm;
      display: flex;
      flex-direction: column;
    }
    .back-header-strip {
      border-bottom: 2.2px solid var(--crimson-accent);
      padding-bottom: 1.5mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h2 {
      font-family: var(--font-display);
      font-size: 14.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .header-left p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1.5px;
    }
    .badge-capsule {
      background: var(--navy-deep);
      color: #fff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
    }
    .header-right {
      text-align: right;
    }
    .header-right p {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      color: var(--ink-muted);
      font-weight: 600;
      margin-top: 1.5px;
    }
    .quiz-instructions-strip {
      background: #f1f5f9;
      border-left: 3px solid var(--crimson-accent);
      padding: 1.2mm 2.8mm;
      margin-bottom: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5mm;
      font-family: var(--font-sans);
      font-size: 7pt;
      color: #1e293b;
    }
    .quiz-instructions-strip span { flex: 1; }
    .quiz-instructions-strip strong { color: var(--navy-deep); }
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
      border-top: 2.2px solid var(--navy-deep);
      border-radius: 3px;
      padding: 3px 6px;
      display: flex;
      flex-direction: column;
    }
    .quiz-grid-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 600;
      color: #64748b;
    }
    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .quiz-item {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      font-size: 6.5pt;
      line-height: 1.18;
      color: #1e293b;
    }
    .quiz-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      width: 14px;
      flex-shrink: 0;
      text-align: right;
    }
    .quiz-text {
      flex: 1;
      font-family: var(--font-sans);
    }
    .back-colophon {
      margin-top: auto;
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--ink-muted);
    }
  </style>
</head>
<body>

  <div class="anthology-book-container">

    <!-- PAGE 1: MASTER FRONT COVER -->
    <div class="a4-page front-cover cover-page textbook-page" data-page="1" id="page-1">
      <div class="cover-top-masthead">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Key Stage 4 &bull; GCSE Master Anthology</span>
      </div>

      <div class="cover-title-group">
        <span class="cover-date-pill">${DATA.COVER_CONFIG.dateRange}</span>
        <h1>${DATA.COVER_CONFIG.title}</h1>
        <p>${DATA.COVER_CONFIG.subtitle}</p>
      </div>

      <div class="cover-hero-row">
        <div class="cover-hero-artwork-frame">
          <div class="cover-hero-img-box">
            <img src="${coverImgData}" alt="Hero Artwork" />
          </div>
          <div class="cover-hero-caption">${DATA.COVER_CONFIG.coverImageCaption}</div>
        </div>
        <div class="cover-overview-narrative">
          <div class="cover-overview-title">${DATA.COVER_CONFIG.overviewHeading}</div>
          <p class="cover-overview-p">${DATA.COVER_CONFIG.overviewParas[0]}</p>
          <p class="cover-overview-p">${DATA.COVER_CONFIG.overviewParas[1]}</p>
        </div>
      </div>

      <div class="cover-enquiries-box">
        <div class="cover-enquiry-list">
          ${syllabusItemsHtml}
        </div>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Classroom Reading Edition &bull; 100% Pure Disciplinary Narrative Architecture</span>
      </div>
    </div>

    <!-- PAGE 2: CHRONOLOGICAL MILESTONE SPINE -->
    <div class="a4-page textbook-page" data-page="2" id="page-2">
      <header class="page-running-header">
        <span class="rh-left">${DATA.COVER_CONFIG.title}</span>
        <span class="rh-right">CHRONOLOGICAL MILESTONE SPINE</span>
      </header>

      <div class="spine-header-strip">
        <div>
          <h2>The Chronological Milestone Spine</h2>
          <p>15 Defining Turning Points &amp; Causal Dominoes</p>
        </div>
        <span class="spine-badge">One-Page Chronology Highway</span>
      </div>

      <div class="spine-container">
        ${milestoneItemsHtml}
      </div>

      <footer class="page-running-footer">
        <span>${DATA.COVER_CONFIG.title} &bull; Master Chronology</span>
        <span class="page-num">2</span>
      </footer>
    </div>

    <!-- PAGE 3: DUAL CARTOGRAPHIC THEATER & 4 STRATEGIC FLASHPOINTS -->
    <div class="a4-page textbook-page page-3-dual-maps" data-page="3" id="page-3">
      <header class="page-running-header">
        <span class="rh-left">${DATA.COVER_CONFIG.title}</span>
        <span class="rh-right">GEOPOLITICAL THEATER ATLAS &bull; REGIONAL &amp; LOCAL PERSPECTIVES</span>
      </header>

      <div class="map-header-strip">
        <div>
          <h2>The Geopolitical Theater: Dual Cartographic Perspectives</h2>
          <p>Regional Theater &amp; Focused Conflict Corridor</p>
        </div>
        <span class="spine-badge">Strategic Atlas</span>
      </div>

      <div class="dual-maps-row">
        
        <div class="dual-map-card">
          <div class="dual-map-header">
            <span class="dual-map-badge">MAP 1: REGIONAL THEATER</span>
            <span class="dual-map-title">Regional Boundaries &amp; Frontiers</span>
          </div>
          <div class="dual-map-img-box">
            <img src="${mapRegionalData}" alt="Regional Map" />
          </div>
          <div class="dual-map-caption">
            <strong>Strategic Overview:</strong> ${DATA.THEATER_MAP_CONFIG.captionRegional}
          </div>
        </div>

        <div class="dual-map-card">
          <div class="dual-map-header">
            <span class="dual-map-badge">MAP 2: CONFLICT CORRIDOR</span>
            <span class="dual-map-title">Tactical Frontier &amp; Disputed Territories</span>
          </div>
          <div class="dual-map-img-box">
            <img src="${mapLocalData}" alt="Local Conflict Corridor Map" />
          </div>
          <div class="dual-map-caption">
            <strong>Territorial Core:</strong> ${DATA.THEATER_MAP_CONFIG.captionLocal}
          </div>
        </div>

      </div>

      <div class="flashpoints-section">
        <div class="flashpoints-section-header">
          <h3>Four Defining Strategic Geopolitical Flashpoints</h3>
          <span>Topography, Maritime Chokepoints &amp; Strategic Depth</span>
        </div>
        <div class="flashpoints-grid">
          ${flashpointsHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>${DATA.COVER_CONFIG.title} &bull; Geopolitical &amp; Spatial Analysis</span>
        <span class="page-num">3</span>
      </footer>
    </div>

    <!-- PAGES 4–27: 12 CANONICAL ENQUIRY SPREADS -->
    ${spreadsHtml}

    <!-- PAGE 28: MASTER RETRIEVAL QUIZ BACK COVER -->
    <div class="a4-page back-cover textbook-page" data-page="28" id="page-28">
      
      <div class="back-header-strip">
        <div class="header-left">
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>60 Essential Recall Questions &bull; ${DATA.COVER_CONFIG.title}</p>
        </div>
        <div class="header-right">
          <span class="badge-capsule">Partner Quiz or Solo Practice</span>
          <p>Check your answers inside &bull; Paragraphs [1.1] to [12.4]</p>
        </div>
      </div>

      <div class="quiz-instructions-strip">
        <span><strong>Partner Quiz:</strong> Sit in pairs with one book closed. Take turns reading 5 questions to test your partner. Swap roles!</span>
        <span><strong>Solo Practice:</strong> Pick an Enquiry box. Write answers 1 to 10 in your book from memory, then check paragraphs to mark your score.</span>
      </div>

      <div class="quiz-grid-container">
        ${quizCardsHtml}
      </div>

      <footer class="back-colophon page-footer">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Classroom Retrieval Edition &bull; Page 28 of 28</span>
      </footer>

    </div>

  </div>

  <script>
    function autoFitPage3Flashpoints() {
      const p3 = document.querySelector('#page-3');
      if (!p3) return;
      const texts = Array.from(p3.querySelectorAll('.fp-text'));
      if (!texts.length) return;
      
      let bestFs = 7.0;
      for (let fs = 7.0; fs <= 8.8; fs += 0.1) {
        texts.forEach(t => {
          t.style.fontSize = fs.toFixed(1) + 'pt';
          t.style.lineHeight = '1.28';
        });
        if (p3.scrollHeight <= p3.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      texts.forEach(t => {
        t.style.fontSize = bestFs.toFixed(1) + 'pt';
        t.style.lineHeight = '1.28';
      });
      return bestFs;
    }

    function autoFitCoverEnquiries() {
      const p1 = document.querySelector('#page-1');
      const items = Array.from(document.querySelectorAll('#page-1 .cover-enquiry-item'));
      if (!p1 || !items.length) return;
      
      let bestFs = 6.8;
      for (let fs = 6.8; fs <= 9.5; fs += 0.1) {
        items.forEach(it => {
          it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = fs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
          it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
        });
        if (p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      items.forEach(it => {
        it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (bestFs + 0.6).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = bestFs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
        it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
      });
      return bestFs;
    }

    window.addEventListener('DOMContentLoaded', autoFitPage3Flashpoints);
    window.addEventListener('DOMContentLoaded', autoFitCoverEnquiries);
    window.autoFitCoverEnquiries = autoFitCoverEnquiries;
    window.autoFitPage3Flashpoints = autoFitPage3Flashpoints;
  </script>

</body>
</html>`;
}

async function run() {
  console.log('=============================================================');
  console.log(`🚀 COMPILING 28-PAGE MASTER TEXTBOOK FOR UNIT: ${unitId}`);
  console.log('=============================================================');

  const html = buildHtml();

  const publicHtmlDir = path.join(ROOT_DIR, 'public', 'units', unitId);
  const rootHtmlDir = path.join(ROOT_DIR, 'units', unitId);
  fs.mkdirSync(publicHtmlDir, { recursive: true });
  fs.mkdirSync(rootHtmlDir, { recursive: true });

  const publicHtmlPath = path.join(publicHtmlDir, 'textbook_UNIFIED.html');
  const rootHtmlPath = path.join(rootHtmlDir, 'textbook_UNIFIED.html');
  const pdfPath = path.join(ROOT_DIR, 'public', 'pdfs', `${unitId}_textbook_UNIFIED_FINAL.pdf`);

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');
  console.log('HTML saved to:', publicHtmlPath);

  console.log('Launching Puppeteer to audit and compile 28-page PDF...');
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
  await page.evaluate(() => {
    if (window.autoFitCoverEnquiries) window.autoFitCoverEnquiries();
    if (window.autoFitPage3Flashpoints) window.autoFitPage3Flashpoints();
  });

  // Page Overflow Audit across all 28 pages
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    const results = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      results.push({
        pageNum,
        scrollH,
        clientH,
        overflow: overflow > 4 ? overflow : 0,
      });
    });
    return results;
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  let hasOverflow = false;
  auditResults.forEach((r) => {
    if (r.overflow > 0) {
      console.error(`❌ OVERFLOW on Page ${r.pageNum}: ${r.overflow}px overflow!`);
      hasOverflow = true;
    }
  });

  if (!hasOverflow) {
    console.log('PERFECT: All 28 pages have 0px overflow!');
  }

  // Print Space Audit
  console.log('\nAuditing Page Budget...');
  const spaceAudit = await auditPageBudget(page, {
    pageSelector: '.a4-page',
    maxPageHeightPx: 1123,
    underflowThresholdPx: 40,
    minUtilizationPct: 88,
    maxGapAboveFooterPx: 25,
    maxInterTaskGapPx: 35,
  });

  printSpaceAuditReport(spaceAudit, `${unitId}_textbook_UNIFIED.html`);

  // Export PDF
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  console.log(`\nMaster 28-Page Textbook PDF compiled to: ${pdfPath}`);
  await browser.close();
  return true;
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { buildHtml, run };
