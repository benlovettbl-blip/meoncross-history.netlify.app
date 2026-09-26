/**
 * History Revision Hub — Publisher-Level Master Textbook Engine
 *
 * Target: units/great_war_part2 (KS3 Year 9: The Great War Part 2, 1914–1919)
 * Output: public/pdfs/great_war_part2_textbook_PUBLISHER.pdf
 * HTML:   public/units/great_war_part2/textbook_PUBLISHER.html
 *
 * Gold Standard Publisher Architecture:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Symmetric Dual-Column Master Architecture:
 *    - Verso (Left Page): Act 1 (3 paras + Source A) & Act 2 (3 paras + Source B) + 4-Term Vocab Deck
 *    - Recto (Right Page): Upper Grid [Act 3 (2 paras + Key Figure) | Act 4 (2 paras + Concept Spotlight)] + Source C Archival Dispatch + Bottom Enquiry & Workbook Signpost
 *    - Pure PEEL paragraph referencing with .para-ref micro-badges ([1.1], [1.2], etc.)
 * 3. Exact 16-Page Budget:
 *    - Page 1:  Master Front Cover (4-column syllabus matrix with "Disciplinary Skill & Assessment Focus")
 *    - Pages 2–15: 7 Double-Page Enquiry Spreads (Verso Acts 1 & 2; Recto Acts 3 & 4)
 *    - Page 16: Master Revision Back Cover (1914–1922 Chronological Spine, Themes Matrix, Historiography, PEEL Scaffold & QR Matrix)
 * 4. Zero multi-column prose voids (completely eliminates legacy CSS column-count: 2; uses flex .two-column-grid).
 * 5. Base64 Image Inlining for 100% offline and Puppeteer fidelity.
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
    path.join(ROOT_DIR, 'units', 'great_war_part2', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'great_war_part2', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'great_war', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'great_war', 'assets', path.basename(clean)),
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
const getGreatWarPart2Data = require('./great_war_part2_textbook_data.cjs');

function renderArchivalSourceBox(src) {
  if (!src) return '';
  const isPanoramic =
    src.isPanoramic || src.panoramic || (src.aspectRatio && src.aspectRatio === 'panoramic');
  const sizeClass = src.expand ? ` expand-${src.expand}` : '';
  const panoramicClass = isPanoramic ? ' panoramic-source' : '';

  if (src.text && !src.image) {
    // Written Primary Document
    return `
      <div class="archival-source-box written-source-box${sizeClass}${panoramicClass}">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">${src.badge || 'SOURCE'}</span>
            <span class="source-type">${src.type || 'Written Primary Document'}</span>
          </div>
          <span class="source-date-micro">${src.date || src.shelfmark || ''}</span>
        </div>
        <div class="archival-title">${src.title || 'Primary Historical Record'}</div>
        <div class="archival-body">${formatText(src.text)}</div>
        <div class="archival-context-box">
          <p class="archival-context-text">${formatText(src.context || '')}</p>
          ${src.hingeQuestion ? `<div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${formatText(src.hingeQuestion)}</em></div>` : ''}
        </div>
        <div class="archival-footer">
          <span>${src.shelfmark || 'Curriculum Primary Record'}</span>
          <span>${src.footer || 'Department Archives'}</span>
        </div>
      </div>
    `;
  }

  if (src.image) {
    // Visual / Artifact Primary Document
    const imgData = src.image.startsWith('data:')
      ? src.image
      : getBase64Image(src.image) || src.image;
    return `
      <div class="archival-source-box${sizeClass}${panoramicClass}">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">${src.badge || 'SOURCE'}</span>
            <span class="source-type">${src.type || 'Visual Primary Evidence'}</span>
          </div>
          <span class="source-date-micro">${src.date || src.shelfmark || ''}</span>
        </div>
        <div class="archival-title">${src.title || 'Primary Historical Evidence'}</div>
        <img class="archival-image" src="${imgData}" alt="${src.title || 'Primary Source'}">
        ${src.text ? `<div class="archival-body">${formatText(src.text)}</div>` : ''}
        <div class="archival-context-box">
          <p class="archival-context-text">${formatText(src.context || '')}</p>
          ${src.hingeQuestion ? `<div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${formatText(src.hingeQuestion)}</em></div>` : ''}
        </div>
        <div class="archival-footer">
          <span>${src.shelfmark || 'Curriculum Primary Record'}</span>
          <span>${src.footer || 'Department Archives'}</span>
        </div>
      </div>
    `;
  }

  return '';
}

function renderConceptSpotlightBox(csb) {
  if (!csb) return '';
  if (typeof csb === 'string') return csb;
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

function renderKeyFigureBox(keyFigure) {
  if (!keyFigure) return '';
  const portraitHtml =
    keyFigure.image && keyFigure.image !== 'monogram'
      ? `<img class="kf-portrait" src="${keyFigure.image.startsWith('data:') ? keyFigure.image : getBase64Image(keyFigure.image) || keyFigure.image}" alt="${keyFigure.name}">`
      : '';

  return `
    <div class="key-figure-box">
      <div class="kf-header">
        <span class="kf-tag">${keyFigure.category || keyFigure.badge || 'KEY FIGURE'}</span>
        <span class="kf-lifespan">${keyFigure.lifespan || ''}</span>
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

async function buildPublisherTextbookHtmlGreatWarPart2() {
  const gwData = getGreatWarPart2Data({ getBase64Image });
  const {
    unitTitle,
    yearGroup,
    subtitle,
    overarchingEnquiry,
    heroImage,
    heroCaption,
    syllabusMatrix,
    leftSources,
    leftVocab,
    componentBank,
    lessonSections,
    chronology,
    thematicMatrix,
    historiographicalDebates,
    synopticVerdict,
  } = gwData;

  const coverImgData =
    getBase64Image(heroImage) || getBase64Image('/images/stubbington_memorial_1.jpg');

  // Back cover practice quiz cards for 7 lessons
  const qrLessons = [
    {
      num: 'Enquiry 1',
      title: 'Recruitment & Pals',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=1',
    },
    {
      num: 'Enquiry 2',
      title: 'Trenches & Haig',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=2',
    },
    {
      num: 'Enquiry 3',
      title: 'Empire & Khudadad',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=3',
    },
    {
      num: 'Enquiry 4',
      title: 'DORA & Home Front',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=4',
    },
    {
      num: 'Enquiry 5',
      title: 'Treaty of Versailles',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=5',
    },
    {
      num: 'Enquiry 6',
      title: 'Lost Gen & Village',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=6',
    },
    {
      num: 'Enquiry 7',
      title: 'Synoptic Assessment',
      url: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2&lesson=7',
    },
  ];

  const qrCardsHtml = qrLessons
    .map(
      (l) => `
    <div class="bqr-card">
      <div class="bqr-header">
        <span class="bqr-num">${l.num}</span>
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

  let lessonsHtml = '';

  syllabusMatrix.forEach((syl, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;

    const bank = componentBank[bankKey] || {};
    const vocabTerms = leftVocab[leftVocabKey] || [];
    const sources = leftSources[leftSrcKey] || {};
    const acts = lessonSections[idx] || [];

    const act1 = acts[0] || { title: 'Act 1: Context & Catalyst', text: [] };
    const act2 = acts[1] || { title: 'Act 2: Escalation & Conflict', text: [] };
    const act3 = acts[2] || { title: 'Act 3: Forensic Archival Evidence', text: [] };
    const act4 = acts[3] || { title: 'Act 4: The Historical Verdict', text: [] };

    const task3Instruction =
      bank.task3Instruction ||
      'Prepare factual evidence for both sides of the historical enquiry in your workbook before writing.';
    const task4Question = bank.task4Question || syl.enquiry || syl.title;
    const wbPages = bank.wbPages || `${lessonNum * 2 + 2}–${lessonNum * 2 + 3}`;

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: The Great War Part 2 Enquiry ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <!-- Lesson Header Strip -->
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KEY STAGE 3 MASTER CURRICULUM &bull; YEAR 9</span>
            <span class="spec-ref-badge">THE GREAT WAR (1914–1919) &bull; ENQUIRY ${lessonNum} OF 7</span>
          </div>
          <h2 class="lesson-title">${syl.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${syl.enquiry} &bull; <em>Acts 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <!-- 2-Column Core Prose Grid -->
        <div class="two-column-grid">
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 1</span>
                <span class="sb-title">${act1.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${act1.text.map((p) => `<p class="narrative-p">${formatText(p)}</p>`).join('')}
            </div>
            ${renderArchivalSourceBox(sources.sourceA)}
          </div>
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 2</span>
                <span class="sb-title">${act2.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${act2.text.map((p) => `<p class="narrative-p">${formatText(p)}</p>`).join('')}
            </div>
            ${renderArchivalSourceBox(sources.sourceB)}
          </div>
        </div>

        <!-- Bottom Fingertip Vocabulary Deck -->
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

        <!-- Page Footer -->
        <div class="page-footer">
          <span>The Great War (1914–1919) &bull; Enquiry ${lessonNum}: ${syl.title}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: The Great War Part 2 Enquiry ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <!-- Right Page Header -->
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; KS3 MASTER CURRICULUM</span>
            <span class="rph-lesson">ENQUIRY ${lessonNum} OF 7: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${syl.title}</h3>
        </div>

        <!-- Right Page Content Layout -->
        <div class="right-page-content">
          <div class="right-upper-grid">
            <div class="col-side">
              <div class="col-top-group">
                <div class="section-banner">
                  <span class="sb-num">ACT 3</span>
                  <span class="sb-title">${act3.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
                </div>
                ${act3.text
                  .slice(0, 2)
                  .map((p) => `<p class="narrative-p">${formatText(p)}</p>`)
                  .join('')}
              </div>
              ${renderKeyFigureBox(bank.keyFigure)}
            </div>
            <div class="col-side">
              <div class="col-top-group">
                <div class="section-banner">
                  <span class="sb-num">ACT 4</span>
                  <span class="sb-title">${act4.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
                </div>
                ${act4.text
                  .slice(0, 2)
                  .map((p) => `<p class="narrative-p">${formatText(p)}</p>`)
                  .join('')}
              </div>
              ${renderConceptSpotlightBox(bank.conceptSpotlight)}
            </div>
          </div>

          ${
            bank.archivalDispatch
              ? `
          <div class="fullwidth-dispatch-wrap">
            ${bank.archivalDispatch}
          </div>`
              : ''
          }
        </div>

        <!-- Lesson Enquiry & Writing Tasks Box -->
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT &bull; ENQUIRY ${lessonNum}</span>
            <span class="beb-badge">${syl.skill || 'DISCIPLINARY WRITING'}</span>
          </div>
          <div class="beb-mission-content">
            <div class="beb-task-row">
              <span class="beb-task-tag">TASK 3: EVIDENCE PREPARATION</span>
              <span class="beb-task-text">${task3Instruction}</span>
            </div>
            <div class="beb-task-row">
              <span class="beb-task-tag">TASK 4: EXTENDED WRITING</span>
              <span class="beb-task-text"><strong>Enquiry Question:</strong> ${task4Question}</span>
            </div>
            <div class="beb-workbook-signpost">
              <span>&rarr; <strong>Pupil Workbook:</strong> Turn to Lesson ${lessonNum} (pages ${wbPages}) in your Pupil Workbook to complete your Task 3 evidence notes and Task 4 written response.</span>
            </div>
          </div>
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>The Great War (1914–1919) &bull; Primary Archival Core</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitTitle} — Master Publisher Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
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
      font-size: 10.0pt;
      line-height: 1.46;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 9.5mm 13mm 8mm 13mm;
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
      padding-bottom: 3.5px;
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
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 7.2pt;
      font-weight: 700;
      color: #1d4ed8;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1.5px 0 2.5px 0;
      line-height: 1.18;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      color: #334155;
      line-height: 1.32;
      background: #eff6ff;
      border-left: 3px solid #1e3a8a;
      padding: 2px 7px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.6pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.18;
    }

    /* Balanced 2-Column Grid Layout (Left Page) */
    .two-column-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5mm;
      flex: 1;
      overflow: hidden;
      margin-bottom: 2px;
    }
    .col-side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .col-top-group {
      display: flex;
      flex-direction: column;
    }
    .col-side .archival-source-box {
      margin: 0;
    }
    .two-column-grid .narrative-p {
      margin: 0 0 4px 0;
      line-height: 1.46;
      font-size: 9.8pt;
    }
    .two-column-grid .archival-source-box {
      padding: 4.5px 6.5px;
    }
    .two-column-grid .archival-image {
      height: 122px;
      object-fit: contain;
    }
    .two-column-grid .archival-body {
      font-size: 8.3pt;
      line-height: 1.28;
      padding: 3px 5.5px;
      margin-bottom: 2.5px;
    }
    .two-column-grid .archival-context-box {
      padding: 3px 5px;
      margin: 2px 0;
    }
    .two-column-grid .archival-context-text {
      font-size: 7.6pt;
      line-height: 1.24;
      margin: 0 0 1px 0;
    }
    .two-column-grid .archival-hinge-q {
      font-size: 7.6pt;
      line-height: 1.24;
      padding: 1.5px 3.5px;
    }

    /* Right Page 2-Tier Balanced Layout */
    .right-page-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin-bottom: 2px;
    }
    .right-upper-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5mm;
      flex-shrink: 0;
      overflow: hidden;
    }
    .right-upper-grid .col-side {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 7px;
      overflow: hidden;
    }
    .right-upper-grid .narrative-p {
      font-size: 9.9pt;
      line-height: 1.48;
      margin: 0 0 4.5px 0;
    }
    .right-upper-grid .col-side .key-figure-box,
    .right-upper-grid .col-side .concept-spotlight-box {
      margin: 0;
    }
    .fullwidth-dispatch-wrap {
      flex-shrink: 0;
      margin: 4px 0 2px 0;
    }
    .fullwidth-dispatch-wrap .archival-source-box {
      margin: 0;
      padding: 5px 8px;
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
    }
    .fullwidth-dispatch-wrap .archival-image {
      float: left;
      max-height: 68px;
      width: auto;
      max-width: 115px;
      object-fit: contain !important;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      margin: 0 8px 3px 0;
    }
    .fullwidth-dispatch-wrap .archival-title {
      font-size: 9.0pt;
      margin-bottom: 2px;
      line-height: 1.15;
    }
    .fullwidth-dispatch-wrap .archival-body {
      font-size: 8.3pt;
      line-height: 1.28;
      margin-bottom: 2.5px;
    }
    .fullwidth-dispatch-wrap .archival-context-box {
      clear: both;
      padding: 2.5px 6px;
      margin: 2.5px 0 0 0;
    }
    .fullwidth-dispatch-wrap .archival-context-text {
      font-size: 7.5pt;
      line-height: 1.22;
      margin: 0;
    }
    .fullwidth-dispatch-wrap .archival-hinge-q {
      font-size: 7.5pt;
      line-height: 1.22;
      padding: 1.5px 4px;
      margin-top: 2px;
    }
    .fullwidth-dispatch-wrap .archival-footer {
      display: none;
    }

    .section-banner {
      background: #eff6ff;
      border-left: 3px solid #1e3a8a;
      border-bottom: 1px solid #bfdbfe;
      padding: 2px 6px;
      border-radius: 0 3px 3px 0;
      margin: 2px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      break-after: avoid;
    }
    .sb-num {
      font-size: 8.0pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
      font-size: 9.8pt;
      line-height: 1.44;
      color: #1e293b;
      margin: 0 0 3px 0;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0 2.5px;
      border-radius: 2px;
      margin-right: 3.5px;
      vertical-align: 0.5px;
      display: inline-block;
      line-height: 1.1;
    }

    /* Archival Source Box Standard */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
      border-radius: 0 3px 3px 0;
      padding: 4px 6px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .written-source-box {
      border-left: 3.5px solid #1e3a8a;
      background: #f8fafc;
      padding: 5px 7px;
    }
    .written-source-box .archival-body {
      font-size: 8.5pt;
      line-height: 1.34;
      padding: 3.5px 6px;
      margin-bottom: 2.5px;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .source-identity {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .source-badge {
      font-size: 6.8pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .source-type {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .source-date-micro {
      font-size: 6.2pt;
      font-weight: 700;
      color: #1e3a8a;
      font-family: 'Inter', sans-serif;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      height: 120px;
      object-fit: contain;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 2px;
      margin-bottom: 2px;
    }
    .archival-body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.2pt;
      line-height: 1.24;
      color: #1e293b;
      font-style: italic;
      margin-bottom: 2px;
      background: #ffffff;
      padding: 2.5px 5px;
      border-radius: 2px;
      border: 1px solid #f1f5f9;
    }
    .archival-context-box {
      background: #f1f5f9;
      border-left: 2px solid #64748b;
      padding: 2.5px 4.5px;
      border-radius: 0 2px 2px 0;
      margin-top: 1px;
    }
    .archival-context-text {
      font-size: 7.2pt;
      line-height: 1.20;
      color: #334155;
      margin: 0 0 1px 0;
      font-family: 'Inter', sans-serif;
    }
    .archival-hinge-q {
      font-size: 7.2pt;
      line-height: 1.20;
      color: #0f172a;
      font-family: 'Inter', sans-serif;
      background: #e2e8f0;
      padding: 1.5px 3px;
      border-radius: 2px;
    }
    .archival-hinge-q strong {
      color: #1e3a8a;
    }
    .archival-footer {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 1.5px;
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 0 3px 3px 0;
      padding: 6px 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 7.2pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .kf-lifespan {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
    }
    .kf-identity-row {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 2px 0;
    }
    .kf-portrait {
      width: 46px;
      height: 54px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      flex-shrink: 0;
    }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      color: #1e3a8a;
      line-height: 1.2;
    }
    .kf-significance {
      font-size: 8.0pt;
      line-height: 1.30;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 1.5px 0 0.5px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-size: 7.8pt;
      line-height: 1.28;
      color: #334155;
    }
    .kf-actions-list li {
      margin-bottom: 1.5px;
    }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 0 3px 3px 0;
      padding: 6px 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #fde68a;
      padding-bottom: 1.5px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 7.2pt;
      font-weight: 900;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .csb-category {
      font-size: 6.8pt;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 8.2pt;
      line-height: 1.30;
      color: #1e293b;
    }
    .csb-takeaway {
      background: #fef3c7;
      border-left: 2.5px solid #b45309;
      padding: 2.5px 5px;
      border-radius: 0 2px 2px 0;
      font-size: 7.6pt;
      line-height: 1.24;
      color: #78350f;
      font-family: 'Inter', sans-serif;
      margin-top: 2.5px;
    }

    /* Bottom Fingertip Vocabulary Deck */
    .bottom-vocab-box {
      background: #f8fafc;
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      padding: 4.5px 7px;
      flex-shrink: 0;
      margin-bottom: 2px;
    }
    .bvb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bvb-title {
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      font-size: 7.6pt;
      line-height: 1.28;
      color: #334155;
    }
    .bvb-col strong {
      color: #0f172a;
      display: block;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      margin-bottom: 1.5px;
    }

    /* Bottom Enquiry & Writing Tasks Box */
    .bottom-enquiry-box {
      background: #eff6ff;
      border: 1.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 5px 8px;
      flex-shrink: 0;
      margin-bottom: 2px;
    }
    .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #bfdbfe;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .beb-title {
      font-size: 7.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-badge {
      font-size: 6.8pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 1.5px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .beb-mission-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 7.8pt;
      line-height: 1.28;
    }
    .beb-task-row {
      display: flex;
      gap: 6px;
      align-items: baseline;
    }
    .beb-task-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
      flex-shrink: 0;
      text-transform: uppercase;
    }
    .beb-task-text {
      color: #1e293b;
      font-size: 7.8pt;
      line-height: 1.26;
    }
    .beb-workbook-signpost {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #1e3a8a;
      background: #dbeafe;
      border-left: 2.5px solid #1e3a8a;
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
      margin-top: 2px;
    }

    /* Page Footer */
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      flex-shrink: 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* ============================================================ */
    /* MASTER FRONT COVER ARCHITECTURE                              */
    /* ============================================================ */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 18px 14px 18px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .cover-top {
      text-align: center;
      margin-bottom: 4px;
    }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2.5px 12px;
      border-radius: 2px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .cover-series {
      font-size: 7.6pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }
    .cover-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 21.0pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0 0 2px 0;
      line-height: 1.12;
      letter-spacing: 0.02em;
    }
    .cover-subtitle {
      font-size: 8.8pt;
      color: #475569;
      font-style: italic;
      font-weight: 500;
      line-height: 1.25;
      max-width: 90%;
      margin: 0 auto;
    }
    .cover-plate-wrapper {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 4px;
      border-radius: 3px;
      text-align: center;
      margin: 3px 0;
    }
    .cover-plate-img {
      width: 100%;
      height: 104mm;
      max-height: 106mm;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
    }
    .cover-plate-caption {
      font-size: 6.8pt;
      color: #64748b;
      margin-top: 2.5px;
      font-style: italic;
      line-height: 1.2;
    }
    .cover-enquiry-box {
      background: #eff6ff;
      border: 1.5px solid #1e3a8a;
      border-left: 4px solid #1e3a8a;
      border-radius: 0 3px 3px 0;
      padding: 5px 8px;
      margin: 4px 0;
      text-align: center;
    }
    .ceb-label {
      font-size: 6.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 1px;
    }
    .ceb-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.8pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.3pt;
      line-height: 1.24;
      margin: 3px 0;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 5px;
      text-transform: uppercase;
      font-weight: 800;
      font-size: 6.8pt;
      letter-spacing: 0.05em;
      border: 1px solid #0f172a;
    }
    .cover-matrix-table td {
      padding: 2.9mm 2.6mm;
      border: 1px solid #cbd5e1;
      color: #1e293b;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-matrix-table td strong {
      color: #1e3a8a;
      display: block;
    }
    .cover-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.5pt;
      font-weight: 800;
      color: #64748b;
      border-top: 1.5px solid #0f172a;
      padding-top: 3px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* Master Back Cover Architecture */
    .bc-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 14px 18px 12px 18px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .bc-header {
      text-align: center;
      margin-bottom: 4px;
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 3px;
    }
    .bc-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15.0pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.02em;
    }
    .bc-tag {
      font-size: 7.6pt;
      color: #1d4ed8;
      margin-top: 1px;
      font-style: italic;
      font-weight: 600;
    }
    .back-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .bct-header, .bth-header, .bch-header, .bcv-header, .bcw-header {
      font-size: 7.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 1.5px;
      margin: 3px 0 2px 0;
    }
    .bct-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bct-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bct-date { color: #1e3a8a; font-weight: 800; font-size: 7.3pt; }
    
    .bth-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bth-col {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1d4ed8;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bth-col strong { color: #0f172a; font-weight: 800; display: block; margin-bottom: 1px; }

    .bch-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bch-col {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 2.5px solid #b45309;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bch-col strong { color: #92400e; font-weight: 800; display: block; margin-bottom: 1px; }

    .bcv-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bcv-col {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bcv-col strong { color: #0369a1; font-weight: 800; display: block; margin-bottom: 1px; }

    .bcw-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bcw-col {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bcw-col strong { color: #1e3a8a; font-weight: 800; display: block; margin-bottom: 1px; }

    .bc-qr-strip {
      margin-top: 3px;
    }
    .bqr-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 3px;
      margin-top: 2px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 3px 2px 2px 2px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .bqr-header {
      width: 100%;
      margin-bottom: 1px;
    }
    .bqr-num {
      display: block;
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .bqr-title {
      display: block;
      font-size: 5.4pt;
      font-weight: 700;
      color: #334155;
      line-height: 1.15;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .bqr-code-box {
      width: 44px;
      height: 44px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 1.5px;
      box-sizing: border-box;
      border-radius: 2px;
    }
    .bqr-footer {
      font-size: 5.0pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-top: 1.5px;
      border-top: 1px solid #f1f5f9;
      padding-top: 1px;
      width: 100%;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: MASTER FRONT COVER                 -->
  <!-- ========================================== -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">KEY STAGE 3 MASTER CURRICULUM SERIES &bull; ${yearGroup.toUpperCase()}</div>
        <h1 class="cover-title">${unitTitle}</h1>
        <div class="cover-subtitle">${subtitle}</div>
      </div>

      <div class="cover-plate-wrapper">
        <img class="cover-plate-img" src="${coverImgData}" alt="Stubbington War Memorial Shelter">
        <div class="cover-plate-caption">${heroCaption}</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Core Overarching Historical Enquiry:</div>
        <div class="ceb-text">"${overarchingEnquiry}"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 12%;">Lesson</th>
            <th style="width: 44%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 32%;">Disciplinary Skill &amp; Assessment Focus</th>
            <th style="width: 12%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          ${syllabusMatrix
            .map(
              (s, i) => `
            <tr>
              <td><strong>Enquiry ${s.num}</strong></td>
              <td>${s.title}</td>
              <td>${s.assessmentFocus || s.skill}</td>
              <td>pp. ${i * 2 + 2}–${i * 2 + 3}</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Independent Educational Publishing</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGES 2–15: 7 CORE ENQUIRY LESSONS         -->
  <!-- ========================================== -->
  ${lessonsHtml}

  <!-- ========================================== -->
  <!-- PAGE 16: MASTER REVISION BACK COVER        -->
  <!-- ========================================== -->
  <div class="textbook-page" data-page="16">
    <div class="bc-container">
      <div class="bc-header">
        <h2 class="bc-title">${unitTitle}</h2>
        <div class="bc-tag">Master Revision Spine &bull; Key Stage 3 Master Curriculum Series</div>
      </div>

      <div class="back-body-content">
        <div class="bc-timeline-box">
          <div class="bct-header">Chronological Spine &bull; 14 Causal Turning Points (1914–1922)</div>
          <div class="bct-grid">
            ${chronology
              .map(
                (t) => `
              <div class="bct-item">
                <span class="bct-date">${t.date}:</span>
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
            ${thematicMatrix
              .map(
                (th) => `
              <div class="bth-col">
                <strong>${th.strand}</strong>
                <p style="margin: 0; font-size: 7.0pt; line-height: 1.20;">${th.trajectory}</p>
                <span style="font-size: 6.2pt; color: #64748b; font-weight: 700; display: block; margin-top: 1px;">Focus: ${th.lessons}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="bc-hist-box">
          <div class="bch-header">Academic Historiography &amp; Debates &bull; The Western Front &amp; Versailles</div>
          <div class="bch-grid">
            ${historiographicalDebates
              .map(
                (d) => `
              <div class="bch-col">
                <strong>${d.debate}</strong>
                <p style="margin: 0 0 2px 0; font-size: 7.0pt; line-height: 1.20;">${d.viewA}</p>
                <p style="margin: 0; font-size: 7.0pt; line-height: 1.20;">${d.viewB}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        ${
          synopticVerdict
            ? `
        <div class="bc-verdict-box">
          <div class="bcv-header">${synopticVerdict.title}</div>
          <div class="bcv-grid">
            ${synopticVerdict.pillars
              .map(
                (p) => `
              <div class="bcv-col">
                <strong>${p.theme}</strong>
                <p style="margin: 0; font-size: 6.8pt; line-height: 1.18;">${p.verdict}</p>
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
          <div class="bcw-header">Disciplinary Extended Writing Framework &bull; Causal &amp; Evaluative Argumentation</div>
          <div class="bcw-grid">
            <div class="bcw-col">
              <strong>1. Causal PEEL Structure &amp; Evidence:</strong>
              "A decisive catalyst for voluntary enlistment was... for example, following Kitchener’s appeal in August 1914, civic leaders formed Pals Battalions like the Pompey Pals, which directly compelled..."
            </div>
            <div class="bcw-col">
              <strong>2. Counter-Argument &amp; Nuance:</strong>
              "However, this factor cannot be viewed in isolation; domestic emotional coercion through the White Feather campaign and pre-war economic poverty fundamentally altered..."
            </div>
            <div class="bcw-col">
              <strong>3. Synoptic Historical Verdict:</strong>
              "Ultimately, while immediate triggers ignited the conflict, deep structural currents—industrialised warfare, state control under DORA, and unresolved geopolitical trauma at Versailles—shaped..."
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
        <span>The History Revision Hub &bull; Independent Educational Publishing</span>
        <span>The Great War (1914–1919) &bull; Master Revision Guide</span>
        <span>Page 16</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

async function renderGreatWarPart2MasterTextbook() {
  console.log('Building 16-page Great War Part 2 Master Textbook HTML...');
  const html = await buildPublisherTextbookHtmlGreatWarPart2();

  const outHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'great_war_part2',
    'textbook_PUBLISHER.html',
  );
  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'great_war_part2_textbook_PUBLISHER.pdf',
  );

  fs.mkdirSync(path.dirname(outHtmlPath), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });

  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`HTML saved to: ${outHtmlPath}`);

  const legacyHtmlPath1 = path.join(
    ROOT_DIR,
    'public',
    'units',
    'great_war_part2',
    'textbook.html',
  );
  const legacyHtmlPath2 = path.join(ROOT_DIR, 'units', 'great_war_part2', 'textbook.html');
  fs.writeFileSync(legacyHtmlPath1, html, 'utf8');
  fs.writeFileSync(legacyHtmlPath2, html, 'utf8');

  console.log('Launching Puppeteer to compile PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.goto(require('url').pathToFileURL(outHtmlPath).href, {
    waitUntil: 'load',
    timeout: 120000,
  });
  await page.evaluateHandle('document.fonts.ready');

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
  const driveDir = 'G:\\My Drive\\AAMX\\Dep File\\Year 9\\The Great War Part 2';
  if (fs.existsSync(driveDir)) {
    try {
      const targetPdf1 = path.join(driveDir, 'Great War Part 2 Master Textbook.pdf');
      const targetPdf2 = path.join(driveDir, 'great_war_part2_textbook_PUBLISHER.pdf');
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
  renderGreatWarPart2MasterTextbook()
    .then(() => {
      console.log('Great War Part 2 Master Textbook Compilation Complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal error during textbook compilation:', err);
      process.exit(1);
    });
}

module.exports = {
  renderGreatWarPart2MasterTextbook,
  buildPublisherTextbookHtmlGreatWarPart2,
};
