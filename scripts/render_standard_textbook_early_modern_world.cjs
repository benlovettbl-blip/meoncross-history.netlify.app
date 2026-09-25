/**
 * History Revision Hub — Publisher-Level Master Textbook Engine
 *
 * Target: units/early_modern_world (KS3 Year 8: The Early Modern World, 1450–1750)
 * Output: public/pdfs/early_modern_world_textbook_PUBLISHER.pdf
 * HTML:   public/units/early_modern_world/textbook_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Weimar Dual-Column Master Architecture:
 *    - .two-column-prose with column-span: all Act banners
 *    - Pure PEEL paragraph referencing with .para-ref micro-badges ([1.1], [1.2], etc.)
 *    - Audited paragraph density: Exactly 3 discrete paragraphs of 60–80 words per Act (108 total)
 * 3. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (139mm uncropped photographic plate, 9-enquiry syllabus matrix)
 *    - Pages 2–19: 9 Double-Page Enquiry Spreads (Verso Acts 1 & 2 + Sources A & B + Key Figure; Recto Acts 3 & 4 + Archival Dispatch + Concept Spotlight)
 *    - Page 20: Master Back Cover (1450–1750 Chronological Spine, Themes Matrix, Historiography, PEEL Scaffold & QR Matrix)
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
    path.join(ROOT_DIR, 'units', 'early_modern_world', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'assets', path.basename(clean)),
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

// Load Early Modern canonical data module
const getEarlyModernData = require('./early_modern_world_textbook_data.cjs');
const earlyModernData = getEarlyModernData({ getBase64Image });

const {
  COVER_CONFIG,
  EARLY_MODERN_COMPONENT_BANK,
  EARLY_MODERN_LEFT_VOCAB,
  EARLY_MODERN_LEFT_SOURCES,
  EARLY_MODERN_ACT_NARRATIVES,
  BACK_COVER_DATA,
} = earlyModernData;

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
          <span class="source-type">${src.type || 'Historical Primary Record'}</span>
        </div>
        <span class="source-date-micro">${src.date || src.shelfmark || ''}</span>
      </div>
      <div class="archival-title">${src.title || ''}</div>
      ${imgHtml}
      ${src.text ? `<div class="${bodyClass}">${src.text}</div>` : ''}
      <div class="archival-context-box">
        <p class="archival-context-text">${src.context || ''}</p>
        ${src.hingeQuestion ? `<div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>` : ''}
      </div>
      <div class="archival-footer">
        <span>${src.shelfmark || 'Historical Archive Collection'}</span>
        <span>${src.footer || 'Curriculum Archival Record'}</span>
      </div>
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

/**
 * Builds the complete 20-page Early Modern World Master Textbook HTML
 */
async function buildPublisherTextbookHtmlEarlyModernWorld() {
  const coverImgData =
    getBase64Image('/images/mansa_musa_catalan.jpg') ||
    getBase64Image('/images/armada_portrait.jpg');

  const lessonConfigs = [
    {
      num: 1,
      key: 'lesson1',
      title: 'Who Held Global Power in 1450? (Constantinople & Wealth of the East)',
      enquiry: 'Who held true global power in 1450?',
    },
    {
      num: 2,
      key: 'lesson2',
      title: 'Religious Conflict & Global Exploration (Reformation, Silver & The Armada)',
      enquiry: 'Why did European rulers risk crossing the oceans?',
    },
    {
      num: 3,
      key: 'lesson3',
      title: 'Trade or Takeover? (Benin & English East India Company 1600–1650)',
      enquiry: 'Trade or takeover: How did trading posts become an empire?',
    },
    {
      num: 4,
      key: 'lesson4',
      title: 'James I & The Gunpowder Plot: Religious Division & Treason (1605)',
      enquiry: 'Why was religious division so explosive under James I?',
    },
    {
      num: 5,
      key: 'lesson5',
      title: 'The Ideological Battle, English Civil War & Regicide (1642–1649)',
      enquiry: 'Was the Civil War an unavoidable fight against royal tyranny?',
    },
    {
      num: 6,
      key: 'lesson6',
      title: 'The Economic Shift, Glorious Revolution & Bank of England (1688–1694)',
      enquiry: 'How did 1688 and the Bank of England create a superpower?',
    },
    {
      num: 7,
      key: 'lesson7',
      title: 'Mechanics of the Transatlantic Slave Trade (Middle Passage & Exploitation)',
      enquiry: 'What was the human cost and scale of the Slave Trade?',
    },
    {
      num: 8,
      key: 'lesson8',
      title: 'Resistance to the Slave Trade (Maroons, Mutinies & Olaudah Equiano)',
      enquiry: 'How did enslaved Africans fight back against slavery?',
    },
    {
      num: 9,
      key: 'lesson9',
      title: "How 'Modern' was Britain by 1750? (Synthesis & Disciplinary Assessment)",
      enquiry: "How 'modern' was Britain by 1750?",
    },
  ];

  let lessonsHtml = '';

  lessonConfigs.forEach((cfg) => {
    const lessonNum = cfg.num;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;

    const bank = EARLY_MODERN_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = EARLY_MODERN_LEFT_VOCAB[leftVocabKey] || [];
    const sources = EARLY_MODERN_LEFT_SOURCES[leftSrcKey] || {};
    const narrative = EARLY_MODERN_ACT_NARRATIVES[cfg.key] || {};

    const act1 = narrative.act1 || { title: 'Context & Catalyst', paras: [] };
    const act2 = narrative.act2 || { title: 'Escalation & Conflict', paras: [] };
    const act3 = narrative.act3 || { title: 'Forensic Archival Evidence', paras: [] };
    const act4 = narrative.act4 || { title: 'The Historical Verdict', paras: [] };

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Early Modern World Enquiry ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page page a4-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KS3 HISTORY &bull; UNIT 2</span>
            <span class="spec-ref-badge">ENQUIRY ${lessonNum} OF 9</span>
          </div>
          <h2 class="lesson-title">${cfg.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${cfg.enquiry} &bull; <em>Acts 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
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
          <span>Early Modern World (1450–1750) &bull; Enquiry ${lessonNum}: ${cfg.title.replace(/^Lesson \d+:\s*/i, '')}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: Early Modern World Enquiry ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page page a4-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; KS3 MASTER CURRICULUM</span>
            <span class="rph-lesson">ENQUIRY ${lessonNum} OF 9: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${cfg.title}</h3>
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

          ${renderConceptSpotlightBox(bank.conceptSpotlight)}

          ${
            bank.archivalOddity
              ? `
          <div class="archival-oddity-box">
            <div class="aob-header">
              <div class="aob-identity">
                <span class="aob-badge">${bank.archivalOddity.badge || 'ARCHIVAL ODDITY & CURIOUS REALITY'}</span>
                <span class="aob-date">${bank.archivalOddity.date || ''}</span>
              </div>
              <span class="aob-shelfmark">${bank.archivalOddity.shelfmark || ''}</span>
            </div>
            <h4 class="aob-title">${bank.archivalOddity.title || ''}</h4>
            <div class="aob-body">${formatText(bank.archivalOddity.text || '')}</div>
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
          <span>Early Modern World (1450–1750) &bull; Enquiry ${lessonNum}: ${cfg.title.replace(/^Lesson \d+:\s*/i, '')}</span>
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
      font-size: 9.45pt;
      line-height: 1.49;
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

    /* Lesson Header Strip */
    .lesson-header {
      border-bottom: 2px solid #1e3a8a;
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
      background: #1e3a8a;
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
      color: #1e40af;
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
      background: #eff6ff;
      border-left: 3px solid #1e3a8a;
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
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    /* 2-Column Core Prose Measure */
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
      background: #eff6ff;
      border-left: 3.5px solid #1e3a8a;
      border-bottom: 1px solid #bfdbfe;
      padding: 2.5px 6px;
      margin: 5px 0 3px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .section-banner:first-of-type {
      margin-top: 0;
    }
    .sb-num {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .sb-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.45pt;
      line-height: 1.49;
      margin: 0 0 5px 0;
      color: #1e293b;
      text-indent: 0.9em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    
    /* Archival Oddity Box */
    .archival-oddity-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 5px 8px;
      margin: 5px 0;
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

    /* Primary Source Citation Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 5px 7px;
      margin: 5px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 1.5px;
    }
    .source-identity {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .source-badge {
      font-family: 'Inter', sans-serif;
      background: #78350f;
      color: #ffffff;
      font-size: 5.6pt;
      font-weight: 800;
      padding: 1px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .source-type {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
    }
    .source-date-micro {
      font-family: 'Inter', sans-serif;
      font-size: 5.4pt;
      color: #78350f;
      font-weight: 600;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 700;
      color: #451a03;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 115px;
      object-fit: cover;
      border: 1px solid #d97706;
      border-radius: 2px;
      margin: 2px 0;
      display: block;
    }
    .archival-body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.0pt;
      line-height: 1.25;
      font-style: italic;
      color: #292524;
      margin: 2px 0;
    }
    .archival-body.written-source-box {
      font-size: 7.4pt;
      line-height: 1.28;
      border-left: 2px solid #d97706;
      padding-left: 5px;
      margin: 3px 0;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #fde68a;
      border-radius: 2px;
      padding: 2.5px 5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #451a03;
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
    .archival-footer {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.2pt;
      color: #92400e;
      margin-top: 2px;
      border-top: 0.8px dashed #fed7aa;
      padding-top: 1px;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 5px 8px;
      margin: 5px 0;
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
      color: #1e3a8a;
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
      font-size: 5.6pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.03em;
      margin-top: 1px;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 11px;
      font-size: 6.6pt;
      line-height: 1.25;
      color: #334155;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      border-radius: 3px;
      padding: 5px 8px;
      margin: 5px 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 5.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .csb-category {
      font-size: 5.6pt;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 6.8pt;
      line-height: 1.26;
      color: #334155;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 2px;
      padding: 2px 4px;
      margin-top: 2px;
    }
    .csb-takeaway strong {
      color: #1e3a8a;
      text-transform: uppercase;
      font-size: 5.4pt;
    }

    /* Bottom Vocabulary Deck */
    .bottom-vocab-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 7px 10px;
      margin-top: 4px;
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
    }
    .bvb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
    }
    .bvb-title {
      font-size: 6.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .bvb-badge {
      font-size: 5.4pt;
      font-weight: 700;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 0.5px 3px;
      border-radius: 2px;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    .bvb-col {
      font-size: 6.0pt;
      line-height: 1.22;
      color: #334155;
    }
    .bvb-col strong {
      display: block;
      color: #1e3a8a;
      font-size: 6.2pt;
      margin-bottom: 0.5px;
    }

    /* Bottom Enquiry Box */
    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      border-radius: 2px;
      padding: 7px 10px;
      margin-top: 4px;
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
    }
    .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
    }
    .beb-title {
      font-size: 6.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .beb-badge {
      font-size: 5.4pt;
      font-weight: 700;
      color: #0f172a;
      background: #e2e8f0;
      padding: 0.5px 3px;
      border-radius: 2px;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .beb-col {
      font-size: 6.0pt;
      line-height: 1.22;
      color: #334155;
    }
    .beb-col strong {
      display: block;
      color: #0f172a;
      font-size: 6.2pt;
      margin-bottom: 0.5px;
    }

    /* Footer */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      color: #64748b;
      flex-shrink: 0;
    }

    /* ========================================= */
    /* MASTER FRONT COVER ARCHITECTURE           */
    /* ========================================= */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 10px 14px 6px 14px;
      box-sizing: border-box;
    }
    .cover-top {
      text-align: center;
    }
    .cover-dept-banner {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      border-bottom: 1.5px solid #1e3a8a;
      padding-bottom: 2px;
      margin-bottom: 4px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 17pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.0pt;
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
      background: #eff6ff;
      border: 1.5px solid #1e3a8a;
      border-left: 4px solid #1e3a8a;
      padding: 4px 8px;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
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
      color: #1e3a8a;
      text-transform: uppercase;
      margin-bottom: 2px;
      border-bottom: 1px solid #bfdbfe;
      padding-bottom: 1px;
    }
    .cscb-item {
      display: flex;
      gap: 3px;
      align-items: flex-start;
      margin-bottom: 2px;
    }
    .cscb-bullet {
      color: #1e3a8a;
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

    /* ========================================= */
    /* MASTER BACK COVER ARCHITECTURE            */
    /* ========================================= */
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
      border-bottom: 2px solid #1e3a8a;
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
      color: #1e3a8a;
      text-transform: uppercase;
    }

    /* Timeline Grid */
    .bc-timeline-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8px 10px;
      margin-bottom: 0;
    }
    .bct-header {
      font-size: 7.0pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      border-bottom: 1px solid #bfdbfe;
      padding-bottom: 1px;
    }
    .bct-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 8px;
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
      color: #1e3a8a;
      flex-shrink: 0;
      width: 65px;
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
      color: #1e3a8a;
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
      color: #1e3a8a;
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
      color: #1e3a8a;
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
          <img class="cover-plate-img" src="${coverImgData}" alt="Mansa Musa / Early Modern World">
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
          <div class="bct-header">Chronological Spine &bull; 20 Causal Turning Points (1450–1750)</div>
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
              "A decisive catalyst for Britain's global rise was... for example, following [Date], [State/Company] instituted [Mechanism], which directly generated..."
            </div>
            <div class="bcw-col">
              <strong>2. Counter-Argument &amp; Nuance:</strong>
              "However, this factor cannot be viewed in isolation; domestic constitutional stability was directly subsidized by the profits of transatlantic chattel slavery..."
            </div>
            <div class="bcw-col">
              <strong>3. Synoptic Historical Verdict:</strong>
              "Ultimately, while parliamentary liberties and state finance enabled maritime supremacy, imperial expansion relied upon systematic colonial coercion..."
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
        <span>The Early Modern World (1450–1750) &bull; Master Revision Guide</span>
        <span>Page 20</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main compilation and synchronization runner
 */
async function runEarlyModernWorld() {
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Early Modern World...');
  const html = await buildPublisherTextbookHtmlEarlyModernWorld();

  const publicHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'early_modern_world',
    'textbook_PUBLISHER.html',
  );
  const unitHtmlPath = path.join(
    ROOT_DIR,
    'units',
    'early_modern_world',
    'textbook_PUBLISHER.html',
  );
  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_textbook_PUBLISHER.pdf',
  );

  fs.mkdirSync(path.dirname(publicHtmlPath), { recursive: true });
  fs.mkdirSync(path.dirname(unitHtmlPath), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log(`✅ Saved HTML companion to: ${publicHtmlPath}`);

  fs.writeFileSync(unitHtmlPath, html, 'utf8');
  console.log(`✅ Updated unit textbook.html: ${unitHtmlPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Count pages rendered
  const pageStats = await page.evaluate(() => {
    const pages = document.querySelectorAll('.textbook-page, .page, .a4-page');
    return { count: pages.length };
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
    printSpaceAuditReport(report, path.basename(publicHtmlPath));
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  await browser.close();
  console.log(`🎉 Masterpiece PDF Textbook Early Modern World successfully compiled!`);
  console.log(`📄 PDF Output: ${outPdfPath}`);

  // Synchronize to production textbook HTML
  const prodHtml1 = path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'textbook.html');
  const prodHtml2 = path.join(ROOT_DIR, 'units', 'early_modern_world', 'textbook.html');
  fs.writeFileSync(prodHtml1, html, 'utf8');
  fs.writeFileSync(prodHtml2, html, 'utf8');
  console.log(`✅ Synchronized to production textbook HTML: ${prodHtml1}`);

  // Synchronize PDF outputs
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_textbook_FINAL_V17.pdf',
  );
  const prodPdf = path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_textbook.pdf');
  const distPdfV17 = path.join(
    ROOT_DIR,
    'dist',
    'pdfs',
    'early_modern_world_textbook_FINAL_V17.pdf',
  );
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', 'early_modern_world_textbook.pdf');

  fs.mkdirSync(path.dirname(distPdfV17), { recursive: true });
  fs.copyFileSync(outPdfPath, prodPdfV17);
  fs.copyFileSync(outPdfPath, prodPdf);
  fs.copyFileSync(outPdfPath, distPdfV17);
  fs.copyFileSync(outPdfPath, distPdf);
  console.log(`✅ Synchronized to production V17 PDF: ${prodPdfV17}`);
  console.log(`✅ Synchronized to dist PDF: ${distPdfV17}`);

  // Synchronize to Google Drive Department File (if connected)
  const gDriveFolder = 'G:\\My Drive\\AAMX\\Dep File\\Year 8\\Early Modern World';
  if (fs.existsSync(gDriveFolder)) {
    try {
      const gDriveMaster = path.join(gDriveFolder, 'Early Modern World Master Textbook.pdf');
      fs.copyFileSync(outPdfPath, gDriveMaster);
      console.log(`✅ Synchronized to Google Drive: ${gDriveMaster}`);
    } catch (gErr) {
      console.warn(
        `⚠️ Warning: Could not write Master Textbook to Google Drive (file may be open):`,
        gErr.message,
      );
    }
  }

  return { htmlPath: publicHtmlPath, pdfPath: outPdfPath };
}

if (require.main === module) {
  runEarlyModernWorld().catch((err) => {
    console.error('Fatal textbook compilation error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtmlEarlyModernWorld,
  runEarlyModernWorld,
  run: runEarlyModernWorld,
};
