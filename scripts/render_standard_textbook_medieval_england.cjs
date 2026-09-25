/**
 * History Revision Hub — Publisher-Level Master Textbook Engine
 *
 * Target: units/medieval_england (KS3 Year 7: Medieval England & The Struggle for Power, 1066–1485)
 * Output: public/pdfs/medieval_england_textbook_PUBLISHER.pdf
 * HTML:   public/units/medieval_england/textbook_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Symmetric Dual-Column Master Architecture:
 *    - Verso (Left Page): Act 1 (Source A + Key Figure) & Act 2 (Source B + Analytical Matrix) + Vocab Strip
 *    - Recto (Right Page): Act 3 (Archival Dispatch Source C) & Act 4 (Concept Spotlight + Archival Oddity) + Assessment Grid
 *    - Pure PEEL paragraph referencing with .para-ref micro-badges ([1.1], [1.2], etc.)
 *    - Audited paragraph density: Exactly 3 discrete paragraphs of 60–80 words per Act
 * 3. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate, 9-enquiry syllabus matrix)
 *    - Pages 2–19: 9 Double-Page Enquiry Spreads (Verso Acts 1 & 2; Recto Acts 3 & 4)
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

function getMonogramInitials(name) {
  if (!name) return 'KF';
  const clean = name.replace(/^(The|Sir|Lord|Dr|King|Queen|Prior|Sultan)\s+/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

function renderArchivalSourceBox(src) {
  if (!src) return '';
  const isPanoramic =
    src.isPanoramic || src.panoramic || (src.aspectRatio && src.aspectRatio === 'panoramic');
  const sizeClass = src.expand ? ` expand-${src.expand}` : '';
  const panoramicClass = isPanoramic ? ' panoramic-source' : '';
  const imgHtml = src.image
    ? `<img class="archival-image" src="${src.image.startsWith('data:') ? src.image : getBase64Image(src.image) || src.image}" alt="${src.title || 'Source'}">`
    : '';
  const bodyClass = src.image ? 'archival-body' : 'archival-body written-source-box';

  return `
    <div class="archival-source-box${sizeClass}${panoramicClass}">
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

function renderConceptSpotlightBox(csb) {
  if (!csb) return '';
  return `
    <div class="concept-spotlight-box">
      <div class="csb-header">
        <span class="csb-tag">${csb.tag || 'CONCEPT SPOTLIGHT'}</span>
        <span class="csb-category">${csb.category || ''}</span>
      </div>
      <h4 class="csb-title">${csb.title || ''}</h4>
      <div class="csb-body">${formatText(csb.body || '')}</div>
      ${csb.takeaway ? `<div class="csb-takeaway"><strong>Key Historical Insight:</strong> ${formatText(csb.takeaway.replace(/^Key Historical Insight:\s*/i, ''))}</div>` : ''}
    </div>
  `;
}

function renderAnalyticalMatrixCard(matrix) {
  if (!matrix) return '';
  return `
    <div class="analytical-matrix-card">
      <div class="amc-header">${matrix.header}</div>
      <div class="amc-grid">
        ${matrix.items
          .map(
            (it) => `
          <div class="amc-col">
            <strong>${it.title}:</strong>
            <p>${formatText(it.text)}</p>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderKeyFigureBox(keyFigure) {
  if (!keyFigure) return '';
  const portraitHtml =
    keyFigure.image && keyFigure.image !== 'monogram'
      ? `<img class="kf-portrait" src="${keyFigure.image.startsWith('data:') ? keyFigure.image : getBase64Image(keyFigure.image) || keyFigure.image}" alt="${keyFigure.name}">`
      : `<div class="kf-portrait kf-monogram" title="${keyFigure.name}"><span class="kf-monogram-initials">${getMonogramInitials(keyFigure.name)}</span><span class="kf-monogram-tag">RECORD</span></div>`;

  return `
    <div class="key-figure-box">
      <div class="kf-header">
        <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
        <span class="kf-lifespan">${keyFigure.lifespan}</span>
      </div>
      <div class="kf-identity-row">
        ${portraitHtml}
        <div class="kf-identity-text">
          <div class="kf-name">${keyFigure.name}</div>
          <div class="kf-role">${keyFigure.role}</div>
        </div>
      </div>
      <div class="kf-significance">${formatText(keyFigure.significance)}</div>
      <div class="kf-actions-title">DECISIVE ACTIONS:</div>
      <ul class="kf-actions-list">
        ${keyFigure.actions.map((a) => `<li>${formatText(a)}</li>`).join('')}
      </ul>
    </div>
  `;
}

async function buildPublisherTextbookHtmlMedieval() {
  const medievalData = getMedievalData({ getBase64Image });
  const {
    COVER_CONFIG,
    MEDIEVAL_COMPONENT_BANK,
    MEDIEVAL_LEFT_VOCAB,
    MEDIEVAL_LEFT_SOURCES,
    MEDIEVAL_ACT_NARRATIVES,
    BACK_COVER_DATA,
    CONCEPT_SPOTLIGHTS,
    LEFT_ANALYTICAL_MATRICES,
  } = medievalData;

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
    if (leftPageNum === 2 && sources.sourceA) {
      sources.sourceA.panoramic = true;
    }

    const act1 = lesson.act1 || { title: 'Context & Catalyst', paras: [] };
    const act2 = lesson.act2 || { title: 'Escalation & Conflict', paras: [] };
    const act3 = lesson.act3 || { title: 'Forensic Archival Evidence', paras: [] };
    const act4 = lesson.act4 || { title: 'The Historical Verdict', paras: [] };

    const spotlight = CONCEPT_SPOTLIGHTS[bankKey];
    const matrix = LEFT_ANALYTICAL_MATRICES[leftSrcKey];

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

          ${renderKeyFigureBox(bank.keyFigure)}

          ${renderArchivalSourceBox(sources.sourceA)}

          <div class="section-banner">
            <span class="sb-num">ACT 2</span>
            <span class="sb-title">${act2.title}</span>
          </div>
          ${act2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceB)}

          ${renderAnalyticalMatrixCard(matrix)}

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

          ${renderConceptSpotlightBox(spotlight)}

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

  const textbookCss = fs.readFileSync(
    path.join(__dirname, 'medieval_england_textbook.css'),
    'utf8',
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${COVER_CONFIG.title} — Master Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    ${textbookCss}
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

  const legacyHtmlPath1 = path.join(
    ROOT_DIR,
    'public',
    'units',
    'medieval_england',
    'textbook.html',
  );
  const legacyHtmlPath2 = path.join(ROOT_DIR, 'units', 'medieval_england', 'textbook.html');
  fs.writeFileSync(legacyHtmlPath1, html, 'utf8');
  fs.writeFileSync(legacyHtmlPath2, html, 'utf8');

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
      const targetPdf1 = path.join(driveDir, 'Medieval England Master Textbook.pdf');
      const targetPdf2 = path.join(driveDir, 'medieval_england_textbook_PUBLISHER.pdf');
      fs.copyFileSync(outPdfPath, targetPdf1);
      fs.copyFileSync(outPdfPath, targetPdf2);
      console.log(`Mirrored to Google Drive: ${targetPdf1}`);
      console.log(`Mirrored to Google Drive: ${targetPdf2}`);
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
