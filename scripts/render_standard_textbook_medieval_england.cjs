/**
 * History Revision Hub — Publisher-Level Master Textbook Engine
 *
 * Target: units/medieval_england (KS3 Year 7: Medieval England & The Struggle for Power, 1066–1485)
 * Output: public/pdfs/medieval_england_textbook_PUBLISHER.pdf
 * HTML:   public/units/medieval_england/textbook_PUBLISHER.html
 *
 * Gold Standard Publisher Architecture:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Symmetric Dual-Column Master Architecture:
 *    - Verso (Left Page): Act 1 (3 paras + Source A) & Act 2 (3 paras + Source B) + 4-Term Vocab Deck
 *    - Recto (Right Page): Upper Grid [Act 3 (2 paras + Key Figure) | Act 4 (2 paras + Concept Spotlight)] + Source C Archival Dispatch + Bottom Enquiry & Workbook Signpost
 *    - Pure PEEL paragraph referencing with .para-ref micro-badges ([1.1], [1.2], etc.)
 * 3. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (4-column syllabus matrix with "Disciplinary Skill & Assessment Focus")
 *    - Pages 2–19: 9 Double-Page Enquiry Spreads (Verso Acts 1 & 2; Recto Acts 3 & 4)
 *    - Page 20: Master Back Cover (1066–1485 Chronological Spine, Themes Matrix, Historiography, PEEL Scaffold & QR Matrix)
 * 4. Zero multi-column prose voids (completely eliminates legacy CSS column-count: 2).
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
  } = medievalData;

  const coverImgData =
    getBase64Image(COVER_CONFIG.coverImage) || getBase64Image('/images/portchester_keep.jpg');

  // Bespoke prompt maps for Task 3 and Task 4
  const t3PromptMap = {
    1: 'Examine both perspectives on Duke William’s victory at Hastings: Norman combined-arms tactical flexibility (the feigned retreat) vs King Harold’s military exhaustion after Stamford Bridge. Note two key pieces of factual evidence for each factor in your workbook.',
    2: 'Compare the mechanisms used by William I to establish control: physical intimidation (motte-and-bailey castles and the Harrying of the North) vs bureaucratic surveillance (the Domesday Book). Note two key pieces of factual evidence for each mechanism in your workbook.',
    3: 'Evaluate the motives driving the conflict between Henry II and Thomas Becket: royal legal centralization and the rule of law vs defense of Church autonomy and spiritual liberty. Note two key pieces of factual evidence for each perspective in your workbook.',
    4: 'Analyze both interpretations of Magna Carta: a selfish, reactionary rebellion by wealthy feudal barons vs the foundational cornerstone of English due process and the rule of law. Note two key pieces of factual evidence for each view in your workbook.',
    5: 'Examine the structures governing medieval peasant life: economic exploitation under the manorial open-field system vs spiritual and psychological control through parish tithes and terrifying Doom paintings. Note two key pieces of factual evidence for each structure in your workbook.',
    6: 'Assess the transformative impact of the Black Death: immediate demographic and social devastation vs the long-term empowerment of surviving peasants and the decay of feudal serfdom. Note two key pieces of factual evidence for each consequence in your workbook.',
    7: 'Evaluate both historical interpretations of the 1381 Peasants’ Revolt: an unruly, chaotic outburst of working-class violence vs a sophisticated, coordinated political movement demanding legal equality and an end to feudal serfdom. Note two key pieces of factual evidence for each view in your workbook.',
    8: 'Weigh the causes behind the collapse of the Plantagenet dynasty during the Wars of the Roses: structural corruption through Bastard Feudalism and private noble armies vs personal ambition, dynastic usurpation, and Richard III’s loss of legitimacy. Note two key pieces of factual evidence for each factor in your workbook.',
    9: 'Synthesize the historical evidence across 1066–1485: Did the power of medieval English monarchs increase through administrative centralization, or decline under baronial, parliamentary, and religious constraints? Note two arguments for each conclusion in your workbook.',
  };

  const disciplinarySkillsMap = {
    1: 'Change & Continuity & The Norman Transition',
    2: 'Dual-Source Utility & Norman Control Mechanisms',
    3: 'Causation & The Monarchy-Church Struggle',
    4: 'Historical Significance & The Limits of Monarchical Rule',
    5: 'Historiographical Debate & Peasant Agency',
    6: 'Turning Point Analysis & The Demographic Crisis',
    7: 'Historical Evidence & Working-Class Insurrection',
    8: 'Agency & The Collapse of Bastard Feudalism',
    9: 'Synoptic Evaluation & Medieval Monarchical Power',
  };

  const wbPagesMap = {
    1: '4–5',
    2: '6–7',
    3: '8–9',
    4: '10–11',
    5: '12–13',
    6: '14–15',
    7: '16–17',
    8: '18–19',
    9: 'Folio / End of Unit',
  };

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

    const spotlight = CONCEPT_SPOTLIGHTS[bankKey];

    const task3Instruction =
      t3PromptMap[lessonNum] ||
      (bank.bottomEnquiry && bank.bottomEnquiry.q1) ||
      'Prepare factual evidence for both sides of the historical debate in your workbook before writing.';
    const task4Question =
      (bank.bottomEnquiry && bank.bottomEnquiry.q3) || lesson.enquiry || lesson.title;
    const wbPages = wbPagesMap[lessonNum] || `${lessonNum * 2 + 2}–${lessonNum * 2 + 3}`;

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Medieval England Enquiry ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <!-- Lesson Header Strip -->
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

        <!-- 2-Column Core Prose Grid -->
        <div class="two-column-grid">
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 1</span>
                <span class="sb-title">${act1.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${act1.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[1.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}
            </div>
            ${renderArchivalSourceBox(sources.sourceA)}
          </div>
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 2</span>
                <span class="sb-title">${act2.title.replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${act2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${formatText(p)}</p>`).join('')}
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
          <span>Medieval England &amp; The Struggle for Power (1066–1485) &bull; Enquiry ${lessonNum}: ${lesson.title.replace(/^Lesson \d+:\s*/i, '')}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: Medieval England Enquiry ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <!-- Right Page Header -->
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; KS3 MASTER CURRICULUM</span>
            <span class="rph-lesson">ENQUIRY ${lessonNum} OF 9: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
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
                ${act3.paras
                  .slice(0, 2)
                  .map(
                    (p, pIdx) =>
                      `<p class="narrative-p"><span class="para-ref">[3.${pIdx + 1}]</span>${formatText(p)}</p>`,
                  )
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
                ${act4.paras
                  .slice(0, 2)
                  .map(
                    (p, pIdx) =>
                      `<p class="narrative-p"><span class="para-ref">[4.${pIdx + 1}]</span>${formatText(p)}</p>`,
                  )
                  .join('')}
              </div>
              ${renderConceptSpotlightBox(spotlight)}
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
            <span class="beb-badge">${disciplinarySkillsMap[lessonNum] || 'DISCIPLINARY WRITING'}</span>
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
              ${
                lessonNum <= 8
                  ? `<span>&rarr; <strong>Pupil Workbook:</strong> Turn to Lesson ${lessonNum} (pages ${wbPages}) in your Pupil Workbook to complete your Task 3 evidence notes and Task 4 written response.</span>`
                  : `<span>&rarr; <strong>Pupil Workbook:</strong> Turn to your Assessment Folio / End of Unit Synoptic Task in your Pupil Workbook to complete your final historical evaluation.</span>`
              }
            </div>
          </div>
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Medieval England &amp; The Struggle for Power (1066–1485) &bull; Primary Archival Core</span>
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
      font-size: 9.55pt;
      line-height: 1.46;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 11mm 13mm 9mm 13mm;
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
      border-bottom: 2px solid #831843;
      padding-bottom: 4px;
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
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.8pt;
      font-weight: 700;
      color: #9d174d;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2px 0 2px 0;
      line-height: 1.18;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #334155;
      line-height: 1.3;
      background: #fdf2f8;
      border-left: 3px solid #831843;
      padding: 2px 6px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .rph-tag { color: #831843; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.2pt;
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
      margin: 0 0 1.5px 0;
      line-height: 1.25;
    }
    .two-column-grid .archival-source-box {
      padding: 3px 5px;
    }
    .two-column-grid .archival-image {
      height: 110px;
      object-fit: contain;
    }
    .two-column-grid .archival-context-box {
      padding: 2px 4px;
      margin: 1.5px 0;
    }
    .two-column-grid .archival-context-text {
      font-size: 7.7pt;
      line-height: 1.22;
      margin: 0 0 1px 0;
    }
    .two-column-grid .archival-hinge-q {
      font-size: 7.6pt;
      line-height: 1.22;
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
      flex: 1;
      overflow: hidden;
    }
    .right-upper-grid .col-side {
      justify-content: flex-start;
      gap: 2.5px;
    }
    .right-upper-grid .narrative-p {
      font-size: 8.8pt;
      line-height: 1.24;
      margin: 0 0 2px 0;
    }
    .right-upper-grid .col-side .key-figure-box,
    .right-upper-grid .col-side .concept-spotlight-box {
      margin: 0;
    }
    .fullwidth-dispatch-wrap {
      flex-shrink: 0;
      margin: 2px 0 1px 0;
    }
    .fullwidth-dispatch-wrap .archival-source-box {
      margin: 0;
      padding: 2.5px 5px;
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
    }
    .fullwidth-dispatch-wrap .archival-image {
      float: left;
      max-height: 56px;
      width: auto;
      max-width: 110px;
      object-fit: contain !important;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      margin: 0 6px 2px 0;
    }
    .fullwidth-dispatch-wrap .archival-title {
      font-size: 8.2pt;
      margin-bottom: 1px;
      line-height: 1.12;
    }
    .fullwidth-dispatch-wrap .archival-body {
      font-size: 7.6pt;
      line-height: 1.20;
      margin-bottom: 1px;
    }
    .fullwidth-dispatch-wrap .archival-context-box {
      clear: both;
      padding: 1px 3.5px;
      margin: 1px 0 0 0;
    }
    .fullwidth-dispatch-wrap .archival-context-text {
      font-size: 7.0pt;
      line-height: 1.15;
      margin: 0;
    }
    .fullwidth-dispatch-wrap .archival-hinge-q {
      font-size: 7.0pt;
      line-height: 1.15;
      padding: 0.5px 2px;
      margin-top: 1px;
    }
    .fullwidth-dispatch-wrap .archival-footer {
      display: none;
    }

    .section-banner {
      background: #fdf2f8;
      border-left: 3px solid #831843;
      border-bottom: 1px solid #fbcfe8;
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
      color: #831843;
      background: #fce7f3;
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
      margin: 0 0 4px 0;
      text-indent: 1.0em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #831843;
      background: #fce7f3;
      border: 1px solid #fbcfe8;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      margin-right: 4px;
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
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .source-identity {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .source-badge {
      font-size: 7.2pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 4px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .source-type {
      font-size: 7.2pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .source-date-micro {
      font-size: 6.8pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      height: 100px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 2px;
      display: block;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }
    .archival-body {
      font-size: 8.8pt;
      line-height: 1.34;
      color: #292524;
      font-style: italic;
      margin-bottom: 2.5px;
    }
    .written-source-box .archival-body {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 3.5px 5.5px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.8pt;
      line-height: 1.34;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 2.5px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 4.5px;
      margin: 2px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 8.0pt;
      line-height: 1.28;
      color: #334155;
      margin: 0 0 1.5px 0;
    }
    .archival-hinge-q {
      font-size: 8.1pt;
      line-height: 1.28;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 3.5px;
      border-radius: 2px;
      margin-top: 1.5px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 8.0pt;
      letter-spacing: 0.03em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 1.5px;
      margin-top: 1.5px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      color: #78716c;
      font-weight: 600;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #fdf2f8;
      border: 1px solid #fbcfe8;
      border-left: 3.5px solid #831843;
      border-radius: 3px;
      padding: 2.5px 5px;
      margin: 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 7.2pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .kf-lifespan {
      font-size: 7.2pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 5px;
      align-items: center;
      margin-bottom: 1.5px;
    }
    .kf-portrait {
      width: 32px;
      height: 38px;
      object-fit: contain;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.12;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .kf-significance {
      font-size: 7.5pt;
      font-style: italic;
      color: #334155;
      line-height: 1.18;
      margin-bottom: 1px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      margin: 1px 0 0.5px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #1e293b;
      line-height: 1.16;
    }
    .kf-actions-list li {
      margin-bottom: 0.5px;
    }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdf2f8;
      border: 1px solid #fbcfe8;
      border-left: 3.5px solid #9d174d;
      border-radius: 3px;
      padding: 2.5px 5px;
      margin: 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 6.8pt;
      font-weight: 800;
      color: #9d174d;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .csb-category {
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.6pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.6pt;
      line-height: 1.18;
      color: #1e293b;
      margin-bottom: 1.5px;
    }
    .csb-takeaway {
      background: #ffffff;
      border-left: 2px solid #9d174d;
      padding: 1.5px 3.5px;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      line-height: 1.16;
      color: #0f172a;
      border-radius: 0 2px 2px 0;
    }
    .csb-takeaway strong {
      color: #9d174d;
      text-transform: uppercase;
      font-size: 7.2pt;
    }

    /* Bottom Vocabulary Box */
    .bottom-vocab-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-top: 2.5px solid #831843;
      padding: 4px 8px;
      margin-top: 3px;
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
    }
    .bvb-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    .bvb-title {
      font-size: 8.0pt;
      font-weight: 900;
      color: #831843;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .bvb-badge {
      font-size: 7.2pt;
      font-weight: 800;
      background: #831843;
      color: #fff;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 7px;
      font-size: 8.8pt;
      line-height: 1.34;
      color: #334155;
    }
    .bvb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 8.8pt;
    }

    /* Bottom Enquiry Box */
    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #831843;
      padding: 2.5px 6px;
      margin-top: 2px;
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
    }
    .beb-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5px;
    }
    .beb-title {
      font-size: 7.8pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .beb-badge {
      font-size: 6.8pt;
      font-weight: 800;
      background: #831843;
      color: #fff;
      padding: 0.5px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .beb-mission-content {
      padding: 1px 0 0.5px 0;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .beb-task-row {
      display: flex;
      gap: 5px;
      align-items: baseline;
    }
    .beb-task-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      color: #831843;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .beb-task-text {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      color: #334155;
      line-height: 1.20;
    }
    .beb-task-text strong {
      color: #0f172a;
    }
    .beb-workbook-signpost {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      color: #475569;
      border-top: 1px dashed #cbd5e1;
      padding-top: 1px;
      margin-top: 0.5px;
    }
    .beb-workbook-signpost strong {
      color: #831843;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
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
      padding: 16px 20px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #9d174d;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 3px 0 2px 0;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 10pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 6px;
    }
    .cover-plate-wrapper {
      text-align: center;
      margin: 3px 0;
    }
    .cover-plate-img {
      height: 84mm;
      max-height: 87mm;
      max-width: 100%;
      width: auto;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      display: block;
      margin: 0 auto;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      color: #64748b;
      margin-top: 3px;
      font-style: italic;
    }
    .cover-enquiry-box {
      background: #fdf2f8;
      border-left: 4px solid #831843;
      padding: 5px 10px;
      margin: 4px 0;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.8pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.8pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      margin-top: 3px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 1.5mm 2.0mm;
      text-align: left;
      font-weight: 800;
      font-size: 7.0pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 1.8mm 2.0mm;
      color: #334155;
      font-size: 7.0pt;
      line-height: 1.22;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      color: #475569;
      font-weight: 700;
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
      border-bottom: 2.5px solid #831843;
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
      color: #9d174d;
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
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bct-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #831843;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bct-date { color: #831843; font-weight: 800; font-size: 7.3pt; }
    
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
      border-left: 2.5px solid #9d174d;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bth-col strong { color: #0f172a; font-weight: 800; display: block; margin-bottom: 1px; }

    .bch-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .bch-col {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #831843;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bch-col strong { color: #831843; font-weight: 800; display: block; margin-bottom: 1px; }

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
      border-left: 2.5px solid #831843;
      padding: 3px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bcw-col strong { color: #831843; font-weight: 800; display: block; margin-bottom: 1px; }

    .bc-qr-strip {
      margin-top: 3px;
    }
    .bqr-grid {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 3px;
      margin-top: 2px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #831843;
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
      color: #831843;
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
        <div class="cover-series">${COVER_CONFIG.seriesTag}</div>
        <h1 class="cover-title">${COVER_CONFIG.title}</h1>
        <div class="cover-subtitle">${COVER_CONFIG.subtitle}</div>
      </div>

      <div class="cover-plate-wrapper">
        <img class="cover-plate-img" src="${coverImgData}" alt="Portchester Castle Keep">
        <div class="cover-plate-caption">${COVER_CONFIG.plateCaption}</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Core Overarching Enquiry:</div>
        <div class="ceb-text">"${COVER_CONFIG.enquiry}"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 12%;">Lesson</th>
            <th style="width: 46%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 30%;">Disciplinary Skill &amp; Assessment Focus</th>
            <th style="width: 12%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Enquiry 1</strong></td>
            <td>1066: The Succession Crisis &amp; The Battle of Hastings</td>
            <td>Change &amp; Continuity &amp; The Norman Transition</td>
            <td>pp. 2–3</td>
          </tr>
          <tr>
            <td><strong>Enquiry 2</strong></td>
            <td>Castles, Terror, and the Domesday Book (1066–1087)</td>
            <td>Dual-Source Utility &amp; Norman Control Mechanisms</td>
            <td>pp. 4–5</td>
          </tr>
          <tr>
            <td><strong>Enquiry 3</strong></td>
            <td>Crown vs Church: The Conflict of Henry II and Thomas Becket</td>
            <td>Causation &amp; The Monarchy-Church Struggle</td>
            <td>pp. 6–7</td>
          </tr>
          <tr>
            <td><strong>Enquiry 4</strong></td>
            <td>Magna Carta (1215): The Great Charter of Liberties</td>
            <td>Historical Significance &amp; Limits of Monarchical Rule</td>
            <td>pp. 8–9</td>
          </tr>
          <tr>
            <td><strong>Enquiry 5</strong></td>
            <td>Village Life, Tithes &amp; Doom Paintings (The Manorial World)</td>
            <td>Historiographical Debate &amp; Peasant Agency</td>
            <td>pp. 10–11</td>
          </tr>
          <tr>
            <td><strong>Enquiry 6</strong></td>
            <td>The Black Death (1348): Demographic Catastrophe &amp; Serfdom</td>
            <td>Turning Point Analysis &amp; The Demographic Crisis</td>
            <td>pp. 12–13</td>
          </tr>
          <tr>
            <td><strong>Enquiry 7</strong></td>
            <td>The Peasants’ Revolt (1381): Uprising, Smithfield &amp; Betrayal</td>
            <td>Historical Evidence &amp; Working-Class Insurrection</td>
            <td>pp. 14–15</td>
          </tr>
          <tr>
            <td><strong>Enquiry 8</strong></td>
            <td>The Wars of the Roses &amp; The Battle of Bosworth (1455–1485)</td>
            <td>Agency &amp; The Collapse of Bastard Feudalism</td>
            <td>pp. 16–17</td>
          </tr>
          <tr>
            <td><strong>Enquiry 9</strong></td>
            <td>Synoptic Assessment: The Dynamics of Medieval Power (1066–1485)</td>
            <td>Synoptic Evaluation &amp; Medieval Monarchical Power</td>
            <td>pp. 18–19</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>${COVER_CONFIG.imprint}</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGES 2–19: 9 CORE ENQUIRY LESSONS         -->
  <!-- ========================================== -->
  ${lessonsHtml}

  <!-- ========================================== -->
  <!-- PAGE 20: MASTER REVISION BACK COVER        -->
  <!-- ========================================== -->
  <div class="textbook-page" data-page="20">
    <div class="bc-container">
      <div class="bc-header">
        <h2 class="bc-title">${BACK_COVER_DATA.title}</h2>
        <div class="bc-tag">Master Revision Spine &bull; Key Stage 3 Master Curriculum Series</div>
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
