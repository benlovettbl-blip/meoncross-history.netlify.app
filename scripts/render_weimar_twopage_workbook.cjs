/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: Weimar and Nazi Germany, 1918–1939 (Edexcel GCSE Paper 3, 1HI0/31)
 * Key Topics:
 *   - KT1: The Weimar Republic, 1918–29
 *   - KT2: Hitler’s Rise to Power, 1919–33
 *   - KT3: Nazi Control and Dictatorship, 1933–39
 *   - KT4: Life in Nazi Germany, 1933–39
 *
 * Standards Enforced:
 *   - Single Source of Truth: Consumes units/weimar_nazi_germany/data.js directly.
 *   - Authentic Prior Recall: Do Nows pull 100% prior-knowledge questions from data.js.
 *   - Declarative Dynamic Line Budgeting: data-auto-lines="true" evaluated in Puppeteer.
 *   - Calibrated Classroom Tariffs: Realistic classroom enquiry writing (4m, 8m, 12m),
 *     reserving the full 16-mark essay for Page 15 Synoptic Challenge.
 *   - Strict School Anonymity & Institutional Neutrality.
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');
const {
  renderStandardFrontCover,
  renderStandardBackCover,
} = require('./components/render_standard_cover.cjs');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const {
  WEIMAR_FOOTERS,
  WEIMAR_KEY_TOPICS_METADATA,
  WEIMAR_ENQUIRY_EXAM_CONFIG,
} = require('./components/weimar_workbook_metadata.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const weimarCurriculum = require(
  path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js'),
).default;

function generateQrSvg(url) {
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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', 'weimar_individuals', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

function renderFooterStrip(pageNum, text, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${text}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${text}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

/**
 * Normalizes lesson data from data.js into clean enquiry components
 */
function extractEnquiryData(lesson, ktNum, enquiryNum) {
  const enquiryQuestion = lesson.enquiry || lesson.title.replace(/^KT\d\.\d:\s*/, '');
  const specAnchor =
    lesson.learning_objectives && lesson.learning_objectives[0]
      ? lesson.learning_objectives[0]
          .replace(/^Demonstrate precise knowledge of\s*/i, '')
          .slice(0, 105) + '...'
      : lesson.title;

  // 1. Prior Knowledge Do Now (10 Questions strictly from data.js)
  const doNowQuestions =
    lesson.do_now && lesson.do_now.items
      ? lesson.do_now.items.slice(0, 10).map((it) => ({
          q: it.question || it.q,
          a: it.answer || it.a || '',
        }))
      : [];

  // 2. Vocabulary extraction from data.js
  const vocabTerms = Array.isArray(lesson.vocab) ? lesson.vocab : [];
  const term1 = vocabTerms[0] || {
    term: 'Constitutional Clause',
    definition: 'A legal rule or article.',
  };
  const term2 = vocabTerms[1] || {
    term: 'Executive Power',
    definition: 'The authority to enforce laws.',
  };
  const term3 = vocabTerms[2] || {
    term: 'Paramilitary Wing',
    definition: 'An armed unofficial military force.',
  };

  // 3. Exam Practice extraction from data.js
  const ep = lesson.exam_practice || {};
  const epQ = ep.questions && ep.questions[0] ? ep.questions[0] : {};
  const epProv = ep.provenance || epQ.provenance || 'Edexcel GCSE Paper 3';
  const epStimulus = ep.stimulus || [];

  return {
    enquiryNum,
    id: lesson.id,
    title: lesson.title,
    enquiryQuestion,
    specAnchor,
    doNow: doNowQuestions,
    vocab: {
      terms: vocabTerms,
      term1,
      term2,
      term3,
      cloze: lesson.vocab_cloze_text || null,
      deliberateError: lesson.vocab_deliberate_error || null,
    },
    exam: {
      provenance: epProv,
      stimulus: epStimulus,
      rawQuestion: epQ.question || '',
      model: epQ.model || '',
      tariff: epQ.tariff || ep.tariff || '12 marks',
      type: epQ.type || '12-mark',
    },
    sourceContext: (lesson.teacher_notes && lesson.teacher_notes.source_context) || '',
    narrativeBlocks: lesson.narrative_blocks || [],
  };
}

/**
 * Builds the complete 16-page workbook HTML for a Key Topic
 */
function buildWeimarKeyTopicWorkbook(ktId) {
  const ktMeta = WEIMAR_KEY_TOPICS_METADATA[ktId];
  if (!ktMeta) throw new Error(`Unknown Key Topic ID: ${ktId}`);

  const footers = WEIMAR_FOOTERS[ktId];
  const synopticPrompt = ktMeta.synopticPrompt;
  const ktNum = ktMeta.keyTopicNum;

  // Extract the 4 lessons directly from units/weimar_nazi_germany/data.js
  const lessonIds = ktMeta.lessons;
  const lessons = lessonIds.map((id, idx) => {
    const rawLesson = weimarCurriculum.lessons.find((l) => l.id === id);
    if (!rawLesson) throw new Error(`Could not find lesson '${id}' in data.js`);
    return extractEnquiryData(rawLesson, ktNum, idx + 1);
  });

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic ${ktNum}: ${ktMeta.title} Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.8pt;
      line-height: 1.3;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
    }
    .verso-page,
    .recto-page {
      padding: 4mm 6mm;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .task-section {
      margin-bottom: 2px;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 5.8mm;
      margin: 0;
      box-sizing: border-box;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 800;
    }
    .footer-quip {
      font-style: italic;
      color: #333333;
    }
    .archival-box {
      border: 1.2px solid #000000;
      border-radius: 4px;
      padding: 3.5px 6px;
      background: #ffffff;
      margin-bottom: 2.5px;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #000000;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
    }
    .archival-shelfmark {
      font-family: 'Inter', monospace, sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #000000;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: OUTSIDE FRONT COVER
  // ====================================================================
  html += renderStandardFrontCover({
    unitId: 'weimar_nazi_germany',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 3: WEIMAR AND NAZI GERMANY, 1918–1939',
    specCode: 'SPECIFICATION 1HI0/31',
    keyTopicNum: ktNum,
    dateRange: ktMeta.dateRange,
    title: `Key Topic ${ktNum}: ${ktMeta.title}`,
    subtitle: ktMeta.subtitle,
    heroImage: {
      ...ktMeta.heroImage,
      src: getBase64Image(ktMeta.heroImage.src),
    },
    specBox: ktMeta.specBox,
    footerQuip: footers[0],
    totalPageCount: 16,
    renderFooterStrip,
  });

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (6 MILESTONES + DUAL-CODING SKETCHPADS)
  // ====================================================================
  const ms = ktMeta.milestones || [];
  const msPart1 = ms.slice(0, 3);
  const msPart2 = ms.slice(3, 6);

  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Chronological Anchors (Key Topic ${ktNum})
          </h2>
        </div>
        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding dual-coding sketchpads below.
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${msPart1
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.0pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, footers[1], 16)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Chronological Anchors (Key Topic ${ktNum})
          </h2>
        </div>
        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the dual-coding sketches to permanently anchor these chronological turning points in long-term memory.
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${msPart2
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.0pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, footers[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–11: 4 ENQUIRIES (VERSO + RECTO SPREADS)
  // SOURCED DYNAMICALLY FROM units/weimar_nazi_germany/data.js
  // ====================================================================
  lessons.forEach((enq, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = 5 + idx * 2;

    // Verso Bottom Component based on enquiry index (0=Inference, 1=Causation Check, 2=Dual Sources Utility, 3=Dual Interpretations)
    let versoExamComponentHtml = '';
    if (idx === 0) {
      // Enquiry 1: Section A Source A & Question 1 Inference [4m] + Causation Practice [4m]
      const stimulusSource =
        enq.exam.stimulus && enq.exam.stimulus[0] ? enq.exam.stimulus[0] : null;
      const sourceTitle = stimulusSource
        ? stimulusSource.title
        : `Source A: Primary dispatch relating to ${enq.enquiryQuestion}`;
      const sourceText = stimulusSource
        ? stimulusSource.content
        : 'Surviving archival dispatch documenting the political and social conditions in Germany.';

      const cfgItem =
        (WEIMAR_ENQUIRY_EXAM_CONFIG[ktId] && WEIMAR_ENQUIRY_EXAM_CONFIG[ktId][0]) || {};
      const inferenceFocus = cfgItem.q1Focus || 'the political conditions in Germany';
      const versoWhyStem =
        cfgItem.versoWhyStem ||
        `Explain one reason why ${enq.enquiryQuestion.toLowerCase().replace(/\?$/, '')}. [4 marks]`;
      const versoWhyGuidance =
        cfgItem.versoWhyGuidance ||
        'Point (State cause clearly) &bull; Evidence (Deploy specific historical facts) &bull; Explanation (Explain the causal mechanism).';
      const versoWhyStems =
        cfgItem.versoWhyStems ||
        'One key reason was... Specifically, in... Consequently, this directly resulted in...';

      versoExamComponentHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 1px;">
        <!-- Source A Excerpt -->
        <div class="archival-box" style="margin-bottom: 2px; padding: 4px 6px;">
          <div class="archival-header">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase;">
              Source A
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
              PRIMARY EVIDENCE
            </span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin: 1px 0 2px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
            ${sourceTitle.startsWith('Source A:') ? sourceTitle : `From: ${sourceTitle}`}
          </p>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; line-height: 1.25; color: #000000; margin: 0;">
            ${sourceText}
          </p>
        </div>

        <!-- Question 1: Inference from Source A (Side-by-Side 2-Column Format) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase;">
              &bull; Question 1: Inference from Source A [4 marks &bull; 5 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
              EDEXCEL PAPER 3
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
            Give two things you can infer from Source A about ${inferenceFocus}.
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1.5px 4px; border-radius: 2px; margin-bottom: 2px;">
            <strong>Target: AO3 [4 marks] &bull;</strong> 1 mark for each valid deduction + 1 mark for each supporting detail/quote from Source A.
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <!-- (i) First Inference -->
            <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000;">
                  (i) What I can infer:
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">[1 mark: deduction]</span>
              </div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000;">
                  Details in Source A that tell me this:
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">[1 mark: quote]</span>
              </div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
            </div>

            <!-- (ii) Second Inference -->
            <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000;">
                  (ii) What I can infer:
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">[1 mark: deduction]</span>
              </div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000;">
                  Details in Source A that tell me this:
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">[1 mark: quote]</span>
              </div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
            </div>
          </div>

          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e3a8a; line-height: 1.15; margin-top: 3px; border-top: 1px solid #e2e8f0; padding-top: 2px;">
            <strong>Examiner Advice:</strong> Never copy out words as your inference; state your deduction first, then quote the specific words to prove it.
          </div>
        </div>

        <!-- Question: Explain One Reason [4 marks] -->
        <div class="task-section" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
                &bull; Question: Explain One Reason [4 marks &bull; 5 mins]
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
                EDEXCEL PAPER 3
              </span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              ${versoWhyStem}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.16; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;">
              <strong>Target Guidance:</strong> ${versoWhyGuidance}<br>
              <strong>Sentence Stems:</strong> <em>${versoWhyStems}</em>
            </div>
          </div>
          <div class="auto-lines-target" data-auto-lines="true" data-line-height="6.8" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 2px;"></div>
        </div>
      </div>
      `;
    } else if (idx === 1) {
      // Enquiry 2: Chronological Sequence & Causation Check [4m]
      const blocks = enq.narrativeBlocks.slice(0, 4);
      const items =
        blocks.length > 0
          ? blocks.map(
              (b, bIdx) =>
                `<strong>Phase ${bIdx + 1}:</strong> ${(b.theme_heading || b.title || 'Historical mechanism').replace(/^\\d+\\.\\s*/, '')}`,
            )
          : [
              '<strong>Phase 1:</strong> Deep structural discontent builds under political instability.',
              '<strong>Phase 2:</strong> Decisive catalyst triggers acute geopolitical and economic crisis.',
              '<strong>Phase 3:</strong> Strategic intervention by authorities reshapes institutional power.',
              '<strong>Phase 4:</strong> Lasting consequence transforms the trajectory of the German state.',
            ];

      const cfgItem =
        (WEIMAR_ENQUIRY_EXAM_CONFIG[ktId] && WEIMAR_ENQUIRY_EXAM_CONFIG[ktId][1]) || {};
      const turningPointStem =
        cfgItem.versoTurningPointStem ||
        `Explain why this sequence represented a decisive turning point in ${ktMeta.title}. [4 marks]`;
      const turningPointGuidance =
        cfgItem.versoTurningPointGuidance ||
        'Point (Identify the decisive catalyst) &bull; Evidence (Deploy precise dates, figures, and groups) &bull; Explanation (Explain the lasting structural impact).';
      const turningPointStems =
        cfgItem.versoTurningPointStems ||
        'One major reason this was a turning point was... Specifically, when... Consequently, this directly transformed Germany because...';

      versoExamComponentHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 1px;">
        <!-- Chronological Sequence -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
              &bull; Chronology: Key Turning Points &amp; Events
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
              KEY TOPIC ${ktNum}
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 6px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2;">
            ${items.map((it) => `<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 2px;">${it}</div>`).join('')}
          </div>
        </div>

        <!-- Turning Point Analytical Framework (2-Column) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 3px;">
            &bull; Turning Point Analysis: Immediate Catalyst vs Structural Impact
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #f8fafc;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #1e3a8a; display: block;">
                Immediate Shock / Trigger:
              </span>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #f8fafc;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #1e3a8a; display: block;">
                Lasting Structural Impact:
              </span>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
            </div>
          </div>
        </div>

        <!-- Question: Explain One Reason [4 marks] -->
        <div class="task-section" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
                &bull; Question: Explain One Reason [4 marks &bull; 5 mins]
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
                EDEXCEL PAPER 3
              </span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              ${turningPointStem}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.18; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;">
              <strong>Target Guidance:</strong> ${turningPointGuidance}<br>
              <strong>Sentence Stems:</strong> <em>${turningPointStems}</em>
            </div>
          </div>
          <div class="auto-lines-target" data-auto-lines="true" data-line-height="6.8" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 2px;"></div>
        </div>
      </div>
      `;
    } else if (idx === 2) {
      // Enquiry 3: Dual Primary Sources B & C and Utility COP Analysis
      const stim = enq.exam.stimulus || [];
      const srcB = stim[0] || {
        title: 'Source B: Official government report or primary speech.',
        content:
          'Primary testimony detailing conditions, political tensions, and eyewitness accounts from the period.',
      };
      const srcC = stim[1] || {
        title: 'Source C: Contemporary diary entry or public commentary.',
        content:
          'Secondary contemporary observation reflecting public anxiety and political division.',
      };

      versoExamComponentHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 1px;">
        <!-- Dual Primary Sources B & C -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 2px;">
          <div class="archival-box" style="margin-bottom: 0;">
            <div class="archival-header">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase;">
                Source B
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">
                CONTEMPORARY RECORD
              </span>
            </div>
            <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin: 1px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
              ${srcB.title.startsWith('Source B:') ? srcB.title.slice(0, 85) : `From: ${srcB.title.slice(0, 80)}`}
            </p>
            <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.20; color: #000000; margin: 0;">
              "${srcB.content.replace(/^"|"$/g, '').slice(0, 260)}..."
            </p>
          </div>

          <div class="archival-box" style="margin-bottom: 0;">
            <div class="archival-header">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase;">
                Source C
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">
                CONTEMPORARY RECORD
              </span>
            </div>
            <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin: 1px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
              ${srcC.title.startsWith('Source C:') ? srcC.title.slice(0, 85) : `From: ${srcC.title.slice(0, 80)}`}
            </p>
            <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.20; color: #000000; margin: 0;">
              "${srcC.content.replace(/^"|"$/g, '').slice(0, 260)}..."
            </p>
          </div>
        </div>

        <!-- Question 3(a) Preparation: Content & Provenance (COP) Analysis -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; background: #f8fafc; margin-bottom: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
                &bull; Question 3(a) Preparation: Content &amp; Provenance (COP) Analysis
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px;">EDEXCEL PAPER 3</span>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.16; color: #111111; margin-top: 1px;">
              <strong>Sentence Stems:</strong> <em>"Source B is useful because it reveals... From own knowledge, I know... The provenance makes it valuable because..."</em>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; flex: 1;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 1px;">
                Source B Utility Breakdown:
              </strong>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a;">1. Content Deduction &amp; Quote:</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; margin-top: 2px;">2. Historical Context (Own Knowledge):</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; margin-top: 2px;">3. Provenance (Author, Motive, Date):</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 1px;">
                Source C Utility Breakdown:
              </strong>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a;">1. Content Deduction &amp; Quote:</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; margin-top: 2px;">2. Historical Context (Own Knowledge):</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; margin-top: 2px;">3. Provenance (Author, Motive, Date):</div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
                <div style="border-bottom: 1.2px solid #000000; height: 5.4mm;"></div>
              </div>
            </div>
          </div>

          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e3a8a; line-height: 1.15; margin-top: 2px; border-top: 1px solid #e2e8f0; padding-top: 2px;">
            <strong>Examiner Advice:</strong> Always evaluate Nature, Origin, and Purpose (NOP) to judge how typical or reliable each source is for the enquiry.
          </div>
        </div>
      </div>
      `;
    } else {
      // Enquiry 4: Dual Interpretations 1 & 2 Plate and Q3b/Q3c Tasks
      const stim = enq.exam.stimulus || [];
      const int1 = stim[0] || {
        title: 'Interpretation 1: From a modern academic study of the period.',
        content:
          'Emphasises structural economic failure, mass unemployment, and institutional weakness as the primary decisive factors.',
      };
      const int2 = stim[1] || {
        title: 'Interpretation 2: From a revisionist historical analysis.',
        content:
          'Emphasises political conspiracy, backstairs intrigue, and deliberate constitutional betrayal by conservative elites.',
      };

      const cfgItem =
        (WEIMAR_ENQUIRY_EXAM_CONFIG[ktId] && WEIMAR_ENQUIRY_EXAM_CONFIG[ktId][3]) || {};
      const interpFocus = cfgItem.interpFocus || 'the historical development of the period';

      versoExamComponentHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 1px;">
        <!-- Dual Interpretations Plate -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 2px;">
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              ${int1.title.slice(0, 50)}...
            </strong>
            <p style="font-family: 'Georgia', serif; font-size: 8.2pt; line-height: 1.20; color: #000000; margin: 0;">
              "${int1.content.replace(/^"|"$/g, '').slice(0, 260)}..."
            </p>
          </div>

          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              ${int2.title.slice(0, 50)}...
            </strong>
            <p style="font-family: 'Georgia', serif; font-size: 8.2pt; line-height: 1.20; color: #000000; margin: 0;">
              "${int2.content.replace(/^"|"$/g, '').slice(0, 260)}..."
            </p>
          </div>
        </div>

        <!-- Question 3(b) & Question 3(c) Writing Frames -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 3px; justify-content: space-between; min-height: 0;">
          <!-- Question 3(b): Difference in Views [4 marks] -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
                  &bull; Question 3(b): Difference in Views [4 marks &bull; 5 mins]
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px;">EDEXCEL PAPER 3</span>
              </div>
              <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; margin: 1px 0;">
                Study Interpretations 1 and 2. They give different views on ${interpFocus}. What is the main difference between the views?
              </p>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1px 4px; border-radius: 2px; margin-bottom: 1px;">
                <strong>Sentence Stem:</strong> The main difference is that Interpretation 1 stresses... whereas Interpretation 2 argues that... Specifically, Interpretation 1 notes "..." while Interpretation 2 suggests "...".
              </div>
            </div>
            <div class="auto-lines-target" data-auto-lines="true" data-line-height="6.0" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 2px;"></div>
          </div>

          <!-- Question 3(c): Reasons for Difference [4 marks] -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
                  &bull; Question 3(c): Reason for Difference [4 marks &bull; 5 mins]
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px;">EDEXCEL PAPER 3</span>
              </div>
              <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; margin: 1px 0;">
                Suggest one reason why Interpretations 1 and 2 give different views on ${interpFocus}. (Refer to Sources B &amp; C or historians' focus).
              </p>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1px 4px; border-radius: 2px; margin-bottom: 1px;">
                <strong>Sentence Stem:</strong> One reason they differ is because the historians relied on different evidence... Interpretation 1 draws on evidence matching Source B (which stresses...), whereas Interpretation 2 reflects Source C (which highlights...).
              </div>
            </div>
            <div class="auto-lines-target" data-auto-lines="true" data-line-height="6.0" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 2px;"></div>
          </div>
        </div>
      </div>
      `;
    }

    // Determine Recto Header & Task Structure from WEIMAR_ENQUIRY_EXAM_CONFIG
    const enqConfig =
      (WEIMAR_ENQUIRY_EXAM_CONFIG[ktId] && WEIMAR_ENQUIRY_EXAM_CONFIG[ktId][idx]) || {};
    const rectoTariff =
      enqConfig.rectoTariff || 'Section A: Question 2 • Explain Why [12 Marks • 18 Mins]';
    const rectoScoreMax = enqConfig.rectoScoreMax || '12';
    const rectoStem =
      enqConfig.rectoStem || `Explain why ${enq.enquiryQuestion.toLowerCase().replace(/\?$/, '')}.`;
    const rectoProvenance = enqConfig.rectoProvenance || enq.exam.provenance || 'Edexcel Paper 3';
    const stimulusPoints = enqConfig.rectoStimulus || [enq.vocab.term1.term, enq.vocab.term2.term];

    html += `
  <!-- ====================================================================
       ENQUIRY ${ktNum}.${enq.enquiryNum}: PAGES ${leftPageNum}–${rightPageNum}
       ==================================================================== -->
  
  <!-- VERSO PAGE (LEFT): RETRIEVAL DO NOW & EXAM PRACTICE -->
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Enquiry Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 800;">
            Enquiry ${ktNum}.${enq.enquiryNum}: ${enq.enquiryQuestion}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px; text-transform: uppercase;">
            Key Topic ${ktNum}
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333333; margin-top: 1px;">
          <strong>Specification Focus:</strong> ${enq.specAnchor}
        </div>
      </div>

      <!-- 10-Question Prior Knowledge Retrieval "Do Now" Grid -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            Prior Knowledge Retrieval &bull; Answer in 1–3 words [Target: 10/10]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">Score: [ &nbsp;&nbsp;&nbsp; / 10 ]</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
          ${enq.doNow
            .map(
              (qItem, qIdx) => `
          <div>
            <div style="line-height: 1.15;">
              <strong>Q${qIdx + 1}:</strong> ${qItem.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Verso Section: Exam Practice / Forensic Evidence -->
      ${versoExamComponentHtml}

      ${renderFooterStrip(leftPageNum, footers[leftPageNum - 1], 16)}
    </div>
  </div>

  <!-- RECTO PAGE (RIGHT): EXTENDED DISCIPLINARY WRITING & DYNAMIC AUTO-LINES -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 1px;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 800;">
            ${rectoTariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
            ${rectoProvenance}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
          Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${rectoScoreMax} ]
        </span>
      </div>

      <!-- Question Stem -->
      <div style="margin: 1px 0 2px 0;">
        <p style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.22;">
          ${rectoStem}
        </p>
        ${
          idx <= 1
            ? `<div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
                 <strong>You may use in your answer:</strong>
                 <span>&bull; ${stimulusPoints[0]}</span>
                 <span>&bull; ${stimulusPoints[1]}</span>
                 <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
               </div>`
            : idx === 2
              ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
                 <strong>Exam Rubric:</strong> Explain your answer, using Sources B and C and your knowledge of the historical context.
               </div>`
              : `<div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
                 <strong>Exam Rubric:</strong> Explain your answer, using both interpretations and your knowledge of the historical context.
               </div>`
        }
      </div>

      <!-- 3-Column Scaffolded Essay Planning Guide -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;">
        ${(enqConfig.rectoPlan || [])
          .map(
            (p) => `
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000;">
                ${p.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">
                ${p.tag}
              </span>
            </div>
            <p style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #111111; margin: 0; line-height: 1.16;">
              ${p.guidance}
            </p>
          </div>
        `,
          )
          .join('')}
      </div>

      <!-- Connectives & Word Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
        <div><strong>Analytical Connectives:</strong> Consequently, In direct reaction to, Furthermore, Crucially, As a direct result</div>
        <div style="margin-top: 1px;"><strong>Word Bank:</strong> ${enq.vocab.terms
          .slice(0, 5)
          .map((t) => t.term)
          .join(' • ')}</div>
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1px solid #000000; border-left: 3px solid #000000; padding: 1.5px 5px; background: #f8fafc; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.18;">
        <strong>Timeline Mission &bull; Pages 2–3:</strong> Illustrate the milestone sketchpad for Enquiry ${ktNum}.${enq.enquiryNum} on Pages 2–3 with your dual-coding visual symbol.
      </div>

      <!-- AUTO-FILL WRITING LINES (Declarative Engine Target, Dynamic Puppeteer Measurement) -->
      <div class="auto-lines-target" data-auto-lines="true" data-line-height="7.5" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 0;">
        <!-- Filled dynamically by engine measurement script -->
      </div>

      ${renderFooterStrip(rightPageNum, footers[rightPageNum - 1], 16)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 12: CARTOGRAPHIC & ARCHIVAL VISUAL BLUEPRINT (VERSO)
  // ====================================================================
  const bp = ktMeta.blueprint;
  html += `
  <div class="page page-container verso-page" id="page-12" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          ${bp.title}
        </h2>
      </div>

      <!-- Top Half: Section 1 -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; margin-bottom: 4px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          ${bp.section1Title}
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          ${bp.items1
            .map(
              (it) => `
          <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 3px; background: #f8fafc;">
            <strong style="color: #000000; display: block;">${it.head}</strong>
            ${it.desc}
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Bottom Half: Section 2 -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          ${bp.section2Title}
        </strong>
        <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between;">
          ${bp.items2
            .map(
              (it) => `
          <div style="border: 1px solid #cbd5e1; padding: 4px 6px; border-radius: 3px; background: #f8fafc;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-right: 4px;">
              ${it.tag}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.22; color: #111111;">
              ${it.detail}
            </span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(12, footers[11], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 13: MASTER KNOWLEDGE ORGANISER (RECTO)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-13" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Master Knowledge Organiser &bull; Key Topic ${ktNum}: ${ktMeta.title}
        </h2>
      </div>

      <!-- 8 Disciplinary Concepts -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          1. Core Disciplinary Vocabulary &amp; Conceptual Definitions
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.18;">
          ${ktMeta.koConcepts
            .map(
              (c) => `
          <div><strong>&bull; ${c.t}:</strong> ${c.d}</div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- 10 Chronological Anchors & 6 Historical Figures -->
      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 6px; flex: 1;">
        
        <!-- 10 Chronological Milestones -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
            2. Essential Chronology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.22; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${ktMeta.koDates
              .map(
                (d) => `
            <div><strong>&bull;</strong> ${d}</div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- 6 Historical Figures Matrix -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
            3. Key Historical Figures Matrix
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${ktMeta.koFigures
              .map(
                (f) => `
            <div><strong>&bull; ${f.n}:</strong> ${f.r}</div>
            `,
              )
              .join('')}
          </div>
        </div>

      </div>

      ${renderFooterStrip(13, footers[12], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 14: GRADE 9 ASSESSMENT MASTERCLASS & BAND 4 RUBRICS (VERSO)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Grade 9 Exam Technique Masterclass &bull; Pearson Edexcel Paper 3 Rubrics
        </h2>
      </div>

      <!-- Question 1: Inference Formula (4 Marks) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; margin-bottom: 3px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
            1. The 4/4 Mark Formula: Inference from Source A [4 Marks &bull; 5 Mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">TARGET: 4 / 4</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <strong>Mark Scheme Law:</strong> Two separate inferences required. Each inference must state: (1) what you can deduce beyond surface description + (2) a verbatim quote or precise detail from Source A supporting your deduction. Never quote without explaining what it means!
        </div>
      </div>

      <!-- Question 2: Explain Why Formula (12 Marks) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; margin-bottom: 3px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
            2. The 12/12 Mark Formula: Explain Why [12 Marks &bull; 18 Mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">TARGET: 11–12 / 12 (LEVEL 4)</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <strong>Three Linked PEEL Paragraphs:</strong> Use both provided stimulus bullet points + bring in ONE distinct self-selected knowledge point. Every paragraph must feature causal links: <em>"Consequently, As a direct consequence, This meant that..."</em> Connect your factors: explain how economic crisis enabled political radicalism!
        </div>
      </div>

      <!-- Question 3(a): Source Utility Formula (8 Marks) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; margin-bottom: 3px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
            3. The 8/8 Mark Formula: How Useful are Sources B &amp; C [8 Marks &bull; 12 Mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">TARGET: 7–8 / 8 (LEVEL 3)</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <strong>COP Formula (Content, Origin, Purpose):</strong> Evaluate Source B then Source C. Interrogate content using own knowledge; evaluate provenance (who wrote it, when, why, and who was the intended audience). Never dismiss a source as "biased"; explain how bias makes it useful as evidence of propaganda or fear!
        </div>
      </div>

      <!-- Question 3(d): Evaluative Essay on Interpretations (16 Marks + 4 SPaG) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; flex: 1; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
            4. The 16/16 Mark Formula: Evaluative Essay [16 Marks + 4 SPaG &bull; 25 Mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">TARGET: 15–16 / 16 (LEVEL 4)</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <strong>Criteria-Led Judgment Architecture:</strong><br>
          &bull; <strong>Opening:</strong> State your sustained thesis and establish your evaluative criteria (e.g. legal illusion vs daily social reality).<br>
          &bull; <strong>Section 1:</strong> Support the targeted Interpretation using its quotes and your own historical evidence.<br>
          &bull; <strong>Section 2:</strong> Evaluate the competing Interpretation using counter-evidence from your own knowledge.<br>
          &bull; <strong>Conclusion:</strong> Deliver a justified verdict explaining why one historian’s emphasis is more persuasive.
        </div>
      </div>

      ${renderFooterStrip(14, footers[13], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 15: TIMED SYNOPTIC EXAM CHALLENGE (RECTO)
  // WITH FULL-PAGE DYNAMIC AUTO-LINES
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 5px; border-radius: 2px;">
              ${synopticPrompt.title}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; background: #f8fafc;">
              ${synopticPrompt.provenance}
            </span>
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 2px 0 0 0; font-weight: 800;">
            ${synopticPrompt.tariff}
          </h2>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
          Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${synopticPrompt.maxScore} ]
        </span>
      </div>

      <!-- Question Stem & Stimulus -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 3px 6px; background: #f8fafc; margin-bottom: 3px;">
        <p style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
          ${synopticPrompt.question}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span>&bull; ${synopticPrompt.stimulus[0]}</span>
          <span>&bull; ${synopticPrompt.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569; margin-top: 1px;">
          ${synopticPrompt.hint}
        </div>
      </div>

      <!-- Examiner Plan Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 3px;">
        <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; display: block;">
            Paragraph 1 (Stimulus Point 1)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #333333;">Specific evidence + detailed causal mechanism.</span>
        </div>
        <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; display: block;">
            Paragraph 2 (Stimulus Point 2)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #333333;">Connect factors: how one event compounded the other.</span>
        </div>
        <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; display: block;">
            Paragraph 3 (Own Knowledge)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #333333;">Self-selected third factor + evaluative conclusion.</span>
        </div>
      </div>

      <!-- Dynamic Auto-Lines Target (Fills all available space to grading box) -->
      <div class="auto-lines-target" data-auto-lines="true" data-line-height="7.5" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 0;">
        <!-- Filled dynamically by engine measurement script -->
      </div>

      <!-- Examiner Grading Box -->
      <div style="border: 1px solid #000000; padding: 2px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; margin-top: 1px;">
        <div><strong>Band 4 Criteria Check:</strong> [ &nbsp; ] Sustained causal focus &nbsp;|&nbsp; [ &nbsp; ] 3 distinct factors deployed &nbsp;|&nbsp; [ &nbsp; ] Comprehensive factual recall</div>
        <div><strong>Teacher Sign-off:</strong> ____________________</div>
      </div>

      ${renderFooterStrip(15, footers[14], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 16: MASTER OUTSIDE BACK COVER
  // ====================================================================
  html += renderStandardBackCover({
    unitId: 'weimar_nazi_germany',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 3: WEIMAR AND NAZI GERMANY, 1918–1939',
    keyTopicNum: ktNum,
    trackerTitle: `Student Assessment Record &bull; Key Topic ${ktNum} Tracker`,
    trackerSubtitle: `Paper 3: Weimar and Nazi Germany, 1918–1939 (${ktMeta.title})`,
    enquiries: lessons.map((l) => ({
      num: l.enquiryNum,
      code: `KT${ktNum}.${l.enquiryNum}`,
      title:
        l.enquiryQuestion.length > 55 ? l.enquiryQuestion.slice(0, 52) + '...' : l.enquiryQuestion,
      doNowMarks: 10,
      q1aMarks: l.enquiryNum === 1 ? 4 : 4,
      q1bMarks: l.enquiryNum === 4 ? 4 : 4,
      extType: l.enquiryNum === 3 ? 'Q3a' : 'Q2',
      extMarks: l.enquiryNum === 3 ? 8 : 12,
      totalMarks: 26,
    })),
    feedback: {
      effortGrade: '',
      signature: '____________________________',
      date: '____________________',
    },
    qrLessons: lessons.map((l) => ({
      label: `KT ${ktNum}.${l.enquiryNum}`,
      subLabel: `Enquiry ${ktNum}.${l.enquiryNum}`,
      title: l.enquiryQuestion,
      url: `https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&lesson=${l.id}`,
    })),
    footerQuip: footers[15],
    totalPageCount: 16,
    renderFooterStrip,
  });

  html += `
  <!-- Client-Side Auto-Lines Calculator (Evaluated in Puppeteer before PDF print) -->
  <script>
    function autoFillWritingLines() {
      document.querySelectorAll('[data-auto-lines]').forEach(el => {
        el.innerHTML = '';
        const availablePx = el.clientHeight;
        const lineHMm = parseFloat(el.dataset.lineHeight || '7.5');
        // Standard 96 DPI: 1 inch = 25.4mm = 96px => 1mm = 3.779527559px
        const lineHPx = lineHMm * (96 / 25.4);
        const count = Math.max(1, Math.round(availablePx / lineHPx));
        el.innerHTML = Array(count).fill(
          '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>'
        ).join('');
      });
    }
    window.addEventListener('DOMContentLoaded', autoFillWritingLines);
    if (document.readyState !== 'loading') autoFillWritingLines();
  </script>
</body>
</html>
`;

  return html;
}

async function compilePdf(htmlPath, pdfPath, v17Path) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Evaluate dynamic lines calculation client-side in Puppeteer
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') {
      autoFillWritingLines();
    }
  });

  // Space audit before PDF compilation
  const audit = await auditPageBudget(page);
  printSpaceAuditReport(audit, path.basename(htmlPath));

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  if (v17Path) {
    fs.copyFileSync(pdfPath, v17Path);
  }

  await browser.close();
}

async function main() {
  const target = process.argv[2] || 'all';
  const targets = target === 'all' ? ['KT1', 'KT2', 'KT3', 'KT4'] : [target.toUpperCase()];

  console.log('======================================================');
  console.log(`🏰 Weimar & Nazi Germany Declarative 16-Page Engine`);
  console.log(`Targeting: ${targets.join(', ')}`);
  console.log('======================================================\n');

  for (const kt of targets) {
    console.log(`\n▶ Generating 16-page workbook for Key Topic ${kt}...`);
    const html = buildWeimarKeyTopicWorkbook(kt);

    const publicHtml = path.join(
      ROOT_DIR,
      'public',
      'units',
      'weimar_nazi_germany',
      `pupil_workbook_${kt}.html`,
    );
    const unitHtml = path.join(
      ROOT_DIR,
      'units',
      'weimar_nazi_germany',
      `pupil_workbook_${kt}.html`,
    );

    fs.mkdirSync(path.dirname(publicHtml), { recursive: true });
    fs.mkdirSync(path.dirname(unitHtml), { recursive: true });

    fs.writeFileSync(publicHtml, html, 'utf8');
    fs.writeFileSync(unitHtml, html, 'utf8');
    console.log(`✅ Saved HTML: ${publicHtml}`);

    const pdfPath = path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      `weimar_nazi_germany_pupil_workbook_${kt}.pdf`,
    );
    const v17Path = path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      `weimar_nazi_germany_pupil_workbook_${kt}_FINAL_V17.pdf`,
    );

    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
    console.log(`🖨️ Compiling PDF with Puppeteer & Dynamic Auto-Lines...`);
    await compilePdf(publicHtml, pdfPath, v17Path);
    console.log(`✅ Compiled PDF: ${v17Path}`);
  }

  console.log('\n🎉 100% COMPLETE: Weimar & Nazi Germany Workbooks Generated!');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error in Weimar workbook generator:', err);
    process.exit(1);
  });
}

module.exports = {
  buildWeimarKeyTopicWorkbook,
};
