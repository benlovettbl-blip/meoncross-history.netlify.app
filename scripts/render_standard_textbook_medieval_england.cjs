/**
 * History Revision Hub — Publisher-Level Master Textbook Engine
 *
 * Target: units/medieval_england (KS3 Year 7: Medieval England & The Struggle for Power, 1066–1485)
 * Output: public/pdfs/medieval_england_textbook_PUBLISHER.pdf
 * HTML:   public/units/medieval_england/textbook_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Weimar Dual-Column Master Architecture:
 *    - .two-column-prose with column-span: all Act banners
 *    - Pure PEEL paragraph referencing with .para-ref micro-badges ([1.1], [1.2], etc.)
 *    - Audited paragraph density: 2 to 3 discrete paragraphs of 60–80 words per Act
 * 3. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate, 9-enquiry syllabus matrix)
 *    - Pages 2–19: 9 Double-Page Enquiry Spreads (Verso Acts 1 & 2 + Sources A & B; Recto Acts 3 & 4 + Key Figure + Archival Oddity)
 *    - Page 20: Master Back Cover (1066–1485 Chronological Spine, Themes Matrix, Historiography, PEEL Scaffold & QR Matrix)
 * 4. Base64 Image Inlining for 100% offline and Puppeteer fidelity.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'medieval_england', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'assets', path.basename(clean)),
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

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function generateQrSvg(url) {
  try {
    const qr = QRCode.create(url, { margin: 1 });
    const size = qr.modules.size;
    const data = qr.modules.data;
    let pathD = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (data[r * size + c]) {
          pathD += `M${c},${r}h1v1h-1z `;
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
  } catch (e) {
    return `<div style="font-size: 6pt; color: #64748b; text-align: center;">QR Code</div>`;
  }
}

// Load data module
const getMedievalData = require('./medieval_england_textbook_data.cjs');
const medievalData = getMedievalData({ getBase64Image });

const {
  COVER_CONFIG,
  MEDIEVAL_COMPONENT_BANK,
  MEDIEVAL_LEFT_VOCAB,
  MEDIEVAL_LEFT_SOURCES,
  MEDIEVAL_ACT_NARRATIVES,
  BACK_COVER_DATA,
} = medievalData;

function renderArchivalSourceBox(src) {
  if (!src) return '';
  const imgHtml = src.image
    ? `<img class="archival-image" src="${src.image.startsWith('data:') ? src.image : getBase64Image(src.image) || src.image}" alt="${src.title || 'Source'}">`
    : '';
  const bodyClass = src.image ? 'archival-body' : 'archival-body written-source-box';

  return `
    <div class="archival-source-box">
      <div class="archival-header">
        <div class="source-identity">
          <span class="source-badge">${src.badge || 'SOURCE'}</span>
          <span class="source-type">${src.type || 'Primary Evidence'}</span>
        </div>
        ${src.date ? `<span class="source-date-micro">${src.date}</span>` : ''}
      </div>
      <div class="archival-title">${src.title || 'Primary Historical Record'}</div>
      ${imgHtml}
      <div class="${bodyClass}">${formatText(src.text || '')}</div>
      ${
        src.context
          ? `
      <div class="archival-context-box">
        <p class="archival-context-text">${formatText(src.context)}</p>
        ${src.hingeQuestion ? `<div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${formatText(src.hingeQuestion)}</em></div>` : ''}
      </div>`
          : ''
      }
    </div>
  `;
}

async function buildPublisherTextbookHtmlMedieval() {
  const coverImgData =
    getBase64Image(COVER_CONFIG.coverImage) || getBase64Image('/images/portchester_keep.jpg');

  let lessonsHtml = '';

  MEDIEVAL_ACT_NARRATIVES.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;

    const bank = MEDIEVAL_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = MEDIEVAL_LEFT_VOCAB[leftVocabKey] || [];
    const sources = MEDIEVAL_LEFT_SOURCES[leftSrcKey] || {};

    const act1 = lesson.act1 || { title: 'Context & Catalyst', paras: [] };
    const act2 = lesson.act2 || { title: 'Escalation & Conflict', paras: [] };
    const act3 = lesson.act3 || { title: 'Forensic Archival Evidence', paras: [] };
    const act4 = lesson.act4 || { title: 'The Historical Verdict', paras: [] };

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Medieval England Enquiry ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page page a4-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KEY STAGE 3 MASTER CURRICULUM &bull; YEAR 7</span>
            <span class="spec-ref-badge">MEDIEVAL ENGLAND (1066–1485) &bull; ENQUIRY ${lessonNum} OF 9</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${lesson.enquiry} &bull; <em>Acts 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 1</span>
            <span class="sb-title">${act1.title}</span>
          </div>
          ${act1.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[1.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceA)}

          ${
            bank.keyFigure
              ? `
          <div class="key-figure-box">
            <div class="kf-header">
              <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
              <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
            </div>
            <div class="kf-identity-row">
              ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image.startsWith('data:') ? bank.keyFigure.image : getBase64Image(bank.keyFigure.image) || bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
              <div class="kf-identity-text">
                <div class="kf-name">${bank.keyFigure.name}</div>
                <div class="kf-role">${bank.keyFigure.role}</div>
              </div>
            </div>
            <div class="kf-significance">${formatText(bank.keyFigure.significance)}</div>
            <div class="kf-actions-title">DECISIVE ACTIONS:</div>
            <ul class="kf-actions-list">
              ${bank.keyFigure.actions.map((a) => `<li>${formatText(a)}</li>`).join('')}
            </ul>
          </div>`
              : ''
          }

          <div class="section-banner">
            <span class="sb-num">ACT 2</span>
            <span class="sb-title">${act2.title}</span>
          </div>
          ${act2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceB)}

        </div>

        <div class="bottom-vocab-box">
          <div class="bvb-header">
            <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; ENQUIRY ${lessonNum}</span>
            <span class="bvb-badge">KEY STAGE 3 VOCABULARY</span>
          </div>
          <div class="bvb-grid">
            ${vocabTerms
              .map(
                (v) => `
              <div class="bvb-col">
                <strong>${v.term}</strong>
                ${v.def}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="page-footer">
          <span>Medieval England &amp; The Struggle for Power (1066–1485) &bull; Enquiry ${lessonNum}: ${lesson.title.replace(/^Lesson \d+:\s*/i, '')}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: Medieval England Enquiry ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page page a4-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; KS3 MASTER CURRICULUM</span>
            <span class="rph-lesson">ENQUIRY ${lessonNum} OF 9: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 3</span>
            <span class="sb-title">${act3.title}</span>
          </div>
          ${act3.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[3.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}

          ${bank.archivalDispatch || ''}

          <div class="section-banner">
            <span class="sb-num">ACT 4</span>
            <span class="sb-title">${act4.title}</span>
          </div>
          ${act4.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[4.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}

          ${
            bank.archivalOddity
              ? `
          <div class="archival-oddity-box">
            <div class="aob-header">
              <div class="aob-identity">
                <span class="aob-badge">${bank.archivalOddity.badge}</span>
                <span class="aob-date">${bank.archivalOddity.date}</span>
              </div>
              <span class="aob-shelfmark">${bank.archivalOddity.shelfmark}</span>
            </div>
            <h4 class="aob-title">${bank.archivalOddity.title}</h4>
            <div class="aob-body">${formatText(bank.archivalOddity.text)}</div>
          </div>`
              : ''
          }

        </div>

        ${
          bank.bottomEnquiry
            ? `
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
            <span class="beb-badge">ENQUIRY ${lessonNum} SYNTHESIS</span>
          </div>
          <div class="beb-grid">
            <div class="beb-col">
              <strong>1. Knowledge &amp; Evidence:</strong>
              ${bank.bottomEnquiry.q1}
            </div>
            <div class="beb-col">
              <strong>2. Causal Analysis (PEEL):</strong>
              ${bank.bottomEnquiry.q2}
            </div>
            <div class="beb-col">
              <strong>3. Historical Evaluation:</strong>
              ${bank.bottomEnquiry.q3}
            </div>
          </div>
        </div>`
            : ''
        }

        <div class="page-footer">
          <span>Medieval England &amp; The Struggle for Power (1066–1485) &bull; Enquiry ${lessonNum}: ${lesson.title.replace(/^Lesson \d+:\s*/i, '')}</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  const qrCardsHtml = BACK_COVER_DATA.quizzes
    .map(
      (l) => `
    <div class="bqr-card">
      <div class="bqr-header">
        <span class="bqr-num">${l.code || l.num}</span>
        <span class="bqr-title">${l.title}</span>
      </div>
      <div class="bqr-code-box">
        ${generateQrSvg(l.url)}
      </div>
      <div class="bqr-footer">Interactive Hub &bull; Quiz</div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${COVER_CONFIG.title} — Master Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.35pt;
      line-height: 1.44;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 10mm 12mm 8mm 12mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    @media print {
      body { background: #ffffff; }
      .textbook-page { margin: 0; }
    }

    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Lesson Header */
    .lesson-header {
      border-bottom: 2px solid #831843;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #831843;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.6pt;
      font-weight: 700;
      color: #9d174d;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0;
      line-height: 1.15;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.25;
      background: #fdf2f8;
      border-left: 3px solid #831843;
      padding: 1.5px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    .rph-tag { color: #831843; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    /* 2-Column Reading Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 14px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    .section-banner {
      column-span: all;
      background: #fdf2f8;
      border-left: 3.5px solid #831843;
      border-bottom: 1px solid #fbcfe8;
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
      margin: 4px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-family: 'Inter', sans-serif;
    }
    .sb-num {
      font-size: 6.0pt;
      font-weight: 900;
      color: #ffffff;
      background: #831843;
      padding: 1px 4px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .sb-title {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 4px 0;
      text-indent: 0.9em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      color: #831843;
      background: #fce7f3;
      border: 1px solid #fbcfe8;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 3px;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 5.8pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 5.8pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 3px;
    }
    .source-date-micro {
      font-size: 5.6pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 100px;
      object-fit: cover;
      border-radius: 2px;
      margin-bottom: 2px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #292524;
      font-style: italic;
      margin-bottom: 2px;
    }
    .written-source-box {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 3px 5px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 2px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 4.5px;
      margin: 2px 0 1px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #334155;
      margin: 0 0 1px 0;
    }
    .archival-hinge-q {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 3.5px;
      border-radius: 2px;
      margin-top: 1px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.4pt;
      letter-spacing: 0.03em;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #fdf2f8;
      border: 1px solid #fbcfe8;
      border-left: 3.5px solid #831843;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 5.8pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 5.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-portrait {
      width: 40px;
      height: 48px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.12;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .kf-significance {
      font-size: 7.0pt;
      font-style: italic;
      color: #334155;
      line-height: 1.25;
      margin-bottom: 2px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      margin: 1.5px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Archival Oddity Box */
    .archival-oddity-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .aob-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
      border-bottom: 1px solid #ffedd5;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .aob-badge {
      font-size: 5.6pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .aob-date {
      font-size: 5.4pt;
      font-weight: 600;
      color: #78716c;
    }
    .aob-shelfmark {
      font-size: 5.2pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
    }
    .aob-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0;
      line-height: 1.15;
    }
    .aob-body {
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1e293b;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 5px 8px;
      border-radius: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bottom-vocab-box {
      background: #fdf2f8;
      border: 1.2px solid #fbcfe8;
      border-top: 2.5px solid #831843;
    }
    .bvb-header, .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }
    .bvb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.4pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 5.8pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #831843;
    }
    .beb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 6.4pt;
      line-height: 1.26;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Cover Page */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 8px 12px 2px 12px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 2px 10px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 700;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.2pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 6px;
    }
    .cover-plate-frame {
      border: 1px solid #cbd5e1;
      padding: 3px;
      background: #ffffff;
      margin-bottom: 4px;
    }
    .cover-plate-img {
      width: 100%;
      height: 139mm;
      object-fit: cover;
      object-position: center 40%;
      display: block;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      color: #64748b;
      margin-top: 2px;
      text-align: right;
    }
    .cover-enquiry-box {
      background: #fdf2f8;
      border: 1.5px solid #831843;
      border-left: 4px solid #831843;
      padding: 4px 8px;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.2pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.8pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }

    /* Cover Syllabus Checklist Box */
    .cover-spec-checklist-box {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      padding: 4px 6px;
      background: #ffffff;
      font-family: 'Inter', sans-serif;
      margin-top: 2px;
    }
    .cscb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .cscb-title {
      font-size: 7.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .cscb-subtitle {
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
    }
    .cscb-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.2pt;
      line-height: 1.22;
      color: #1e293b;
    }
    .cscb-col {
      border-right: 1px solid #e2e8f0;
      padding-right: 4px;
    }
    .cscb-col:last-child {
      border-right: none;
    }
    .cscb-topic-title {
      font-size: 6.8pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      margin-bottom: 2px;
      border-bottom: 1px solid #fbcfe8;
      padding-bottom: 1px;
    }
    .cscb-item {
      display: flex;
      gap: 3px;
      align-items: flex-start;
      margin-bottom: 2px;
    }
    .cscb-bullet {
      color: #831843;
      font-size: 7.0pt;
      line-height: 1;
      flex-shrink: 0;
    }

    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      color: #475569;
    }

    /* Back Cover */
    .bc-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 14px 12px 14px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      margin: 3px 0;
    }
    .bc-header {
      border-bottom: 2px solid #831843;
      padding-bottom: 2px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .bc-title {
      font-size: 9.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .bc-tag {
      font-size: 6.4pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
    }

    /* Timeline Grid */
    .bc-timeline-box {
      background: #fdf2f8;
      border: 1px solid #fbcfe8;
      border-left: 3.5px solid #831843;
      border-radius: 3px;
      padding: 8px 10px;
      margin-bottom: 0;
    }
    .bct-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      border-bottom: 1px solid #fbcfe8;
      padding-bottom: 1px;
    }
    .bct-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 8px;
      font-size: 6.4pt;
      line-height: 1.30;
      color: #1e293b;
    }
    .bct-item {
      display: flex;
      gap: 4px;
    }
    .bct-date {
      font-weight: 800;
      color: #831843;
      flex-shrink: 0;
      width: 58px;
    }

    /* Themes Grid */
    .bc-themes-box {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 10px 10px;
      background: #f8fafc;
      margin-bottom: 0;
    }
    .bth-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }
    .bth-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      font-size: 6.6pt;
      line-height: 1.32;
    }
    .bth-col strong {
      display: block;
      color: #831843;
      font-size: 6.4pt;
      margin-bottom: 1px;
      text-transform: uppercase;
    }

    /* Historiography Box */
    .bc-hist-box {
      background: #ffffff;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 10px 10px;
      margin-bottom: 0;
    }
    .bch-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 2px;
    }
    .bch-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      font-size: 6.6pt;
      line-height: 1.34;
      color: #1e293b;
    }
    .bch-col strong {
      display: block;
      color: #78350f;
      margin-bottom: 1px;
    }

    /* Synoptic Verdict Grid */
    .bc-verdict-box {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 10px 10px;
      background: #f8fafc;
      margin-bottom: 0;
    }
    .bcv-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }
    .bcv-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      font-size: 6.6pt;
      line-height: 1.32;
      color: #334155;
    }
    .bcv-col strong {
      display: block;
      color: #0f172a;
      font-size: 6.4pt;
      margin-bottom: 1px;
      text-transform: uppercase;
    }

    /* Disciplinary Writing Framework */
    .bc-writing-box {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 10px 10px;
      background: #ffffff;
      margin-bottom: 0;
    }
    .bcw-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }
    .bcw-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      font-size: 6.6pt;
      line-height: 1.32;
      color: #334155;
    }
    .bcw-col strong {
      display: block;
      color: #831843;
      font-size: 6.4pt;
      margin-bottom: 1px;
      text-transform: uppercase;
    }

    /* QR Matrix */
    .bc-qr-strip {
      border-top: 1px solid #e2e8f0;
      padding-top: 3px;
    }
    .bqr-grid {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 4px;
    }
    .bqr-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 8px 2px;
      text-align: center;
    }
    .bqr-header {
      font-size: 4.8pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bqr-num {
      display: block;
      font-weight: 900;
      color: #831843;
      font-size: 5.2pt;
    }
    .bqr-code-box {
      width: 62px;
      height: 62px;
      margin: 3px auto;
    }
    .bqr-footer {
      font-size: 4.2pt;
      color: #64748b;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: Master Front Cover -->
  <div class="textbook-page page a4-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">${COVER_CONFIG.seriesTag}</div>
        <h1 class="cover-main-title">${COVER_CONFIG.title}</h1>
        <div class="cover-subtitle">${COVER_CONFIG.subtitle}</div>

        <div class="cover-plate-frame">
          <img class="cover-plate-img" src="${coverImgData}" alt="Portchester Castle Keep">
          <div class="cover-plate-caption">${COVER_CONFIG.plateCaption}</div>
        </div>

        <div class="cover-enquiry-box">
          <span class="ceb-label">Core Overarching Enquiry</span>
          <div class="ceb-text">"${COVER_CONFIG.enquiry}"</div>
        </div>

        <div class="cover-spec-checklist-box">
          <div class="cscb-header">
            <span class="cscb-title">Syllabus Matrix &bull; 9 Core Historical Enquiries</span>
            <span class="cscb-subtitle">Key Stage 3 National Curriculum Specification</span>
          </div>
          <div class="cscb-grid">
            ${COVER_CONFIG.syllabusTopics
              .map(
                (t) => `
              <div class="cscb-col">
                <div class="cscb-topic-title">${t.title}</div>
                ${t.bullets
                  .map(
                    (b) => `
                  <div class="cscb-item">
                    <span class="cscb-bullet">&bull;</span>
                    <span>${b}</span>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <span>${COVER_CONFIG.imprint}</span>
        <span>Verified Disciplinary Curriculum &bull; 20-Page Publisher Standard</span>
        <span>Page 1</span>
      </div>
    </div>
  </div>

  ${lessonsHtml}

  <!-- PAGE 20: Master Back Cover -->
  <div class="textbook-page page a4-page" data-page="20">
    <div class="bc-container">
      <div class="bc-header">
        <span class="bc-title">${BACK_COVER_DATA.title}</span>
        <span class="bc-tag">Master Revision Spine &bull; Key Stage 3</span>
      </div>

      <div class="back-body-content">
        <div class="bc-timeline-box">
          <div class="bct-header">Chronological Spine &bull; 19 Causal Turning Points (1066–1485)</div>
          <div class="bct-grid">
            ${BACK_COVER_DATA.timeline
              .map(
                (t) => `
              <div class="bct-item">
                <span class="bct-date">${t.date}</span>
                <span>${t.event}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="bc-themes-box">
          <div class="bth-header">The 4 Big Storylines to Track &bull; Core Disciplinary Strands</div>
          <div class="bth-grid">
            ${BACK_COVER_DATA.themes
              .map(
                (th) => `
              <div class="bth-col">
                <strong>${th.title}</strong>
                <p style="margin: 0;">${th.desc}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="bc-hist-box">
          <div class="bch-header">${BACK_COVER_DATA.historiography.title}</div>
          <div class="bch-grid">
            ${BACK_COVER_DATA.historiography.views
              .map(
                (v) => `
              <div class="bch-col">
                <strong>${v.school}</strong>
                <p style="margin: 0;">"${v.argument}"</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        ${
          BACK_COVER_DATA.synopticVerdict
            ? `
        <div class="bc-verdict-box">
          <div class="bcv-header">${BACK_COVER_DATA.synopticVerdict.title}</div>
          <div class="bcv-grid">
            ${BACK_COVER_DATA.synopticVerdict.pillars
              .map(
                (p) => `
              <div class="bcv-col">
                <strong>${p.theme}</strong>
                <p style="margin: 0;">${p.verdict}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>`
            : ''
        }

        <!-- Disciplinary Extended Writing Framework -->
        <div class="bc-writing-box">
          <div class="bcw-header">Disciplinary Writing Framework &bull; Causal &amp; Evaluative Argumentation</div>
          <div class="bcw-grid">
            <div class="bcw-col">
              <strong>1. Causal PEEL Structure &amp; Evidence:</strong>
              "A decisive catalyst for the baronial challenge was... for example, following [Date], [Barons/Crown] instituted [Action], which directly compelled..."
            </div>
            <div class="bcw-col">
              <strong>2. Counter-Argument &amp; Nuance:</strong>
              "However, this factor cannot be viewed in isolation; chronic financial extortion and battlefield failure in France fundamentally destabilised..."
            </div>
            <div class="bcw-col">
              <strong>3. Synoptic Historical Verdict:</strong>
              "Ultimately, while royal administrative institutions provided coercive machinery, baronial consensus remained the true foundation of medieval governance..."
            </div>
          </div>
        </div>

        <div class="bc-qr-strip">
          <div style="font-size: 6.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
            Interactive Revision Hub &bull; 20-Question Knowledge Practice Quizzes
          </div>
          <div class="bqr-grid">
            ${qrCardsHtml}
          </div>
        </div>
      </div>

      <div class="page-footer" style="margin-top: 2px;">
        <span>${COVER_CONFIG.imprint}</span>
        <span>Medieval England (1066–1485) &bull; Master Revision Guide</span>
        <span>Page 20</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

async function renderMedievalMasterTextbook() {
  console.log('Building 20-page Medieval England Master Textbook HTML...');
  const html = await buildPublisherTextbookHtmlMedieval();

  const outHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'medieval_england',
    'textbook_PUBLISHER.html',
  );
  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'medieval_england_textbook_PUBLISHER.pdf',
  );

  fs.mkdirSync(path.dirname(outHtmlPath), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });

  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`HTML saved to: ${outHtmlPath}`);

  console.log('Launching Puppeteer to compile PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.setContent(html, { waitUntil: ['load', 'networkidle0'] });

  // Evaluate page count and dimensions
  const pageStats = await page.evaluate(() => {
    const pages = document.querySelectorAll('.textbook-page');
    return {
      count: pages.length,
      heights: Array.from(pages).map((p) => ({
        page: p.getAttribute('data-page'),
        scrollHeight: p.scrollHeight,
        clientHeight: p.clientHeight,
      })),
    };
  });

  console.log(`Rendered ${pageStats.count} pages.`);

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // Audit page budget
  console.log('\nAuditing Page Budget...');
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.textbook-page, .page, .a4-page',
      underflowThresholdPx: 40,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, path.basename(outHtmlPath));
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  await browser.close();
  console.log(`Master Textbook PDF compiled to: ${outPdfPath}`);

  // Mirror to G: Drive if available
  const driveDir = 'G:\\My Drive\\AAMX\\Dep File\\Year 7\\Medieval England';
  if (fs.existsSync(driveDir)) {
    try {
      const targetPdf = path.join(driveDir, 'Medieval England Master Textbook.pdf');
      fs.copyFileSync(outPdfPath, targetPdf);
      console.log(`Mirrored to Google Drive: ${targetPdf}`);
    } catch (e) {
      console.warn('Could not mirror to Google Drive:', e.message);
    }
  }

  return { htmlPath: outHtmlPath, pdfPath: outPdfPath };
}

if (require.main === module) {
  renderMedievalMasterTextbook()
    .then(() => {
      console.log('Medieval England Master Textbook Compilation Complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal error during textbook compilation:', err);
      process.exit(1);
    });
}

module.exports = {
  renderMedievalMasterTextbook,
  buildPublisherTextbookHtmlMedieval,
};
