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
 *   - Canonical 3-Page Enquiry Module Architecture (aligned with Medicine Benchmark Standard)
 *   - 5-Stage Chronological Inquiry Spine per Enquiry (Left: 44mm pure white trigger spine with spec triads; Right: 6 ruled note-taking lines)
 *   - Spec-Anchored Concrete Triads (3 bullets per stage: concrete nouns + active verbs)
 *   - Purely Structural Accessible Writing Frames (Zero Knowledge Giveaways)
 *   - 24 Flex Task Lines on Module Page 2 with Timeline Mission
 *   - 14 Flex Task Lines on Module Page 3 to complete Question 2 (~1.5 pages total)
 *   - 4-Mark Question Practice at bottom of Module Page 3 (Inference from Source A/B, Difference in Views, or Why Views Differ)
 *   - STRICTLY ZERO PRE-PRINTED MODEL ANSWERS OR ANSWER KEYS IN PUPIL WORKBOOK
 *   - Pages 16–17 Double Spread: Cartographic & Archival Visual Blueprint + Master Knowledge Organiser
 *   - Pages 18–19 Double Spread: Grade 9 Exam Technique Masterclass (marking rubrics/formulas) + Dedicated British Exercise Notes & Strategy Page
 *   - Pages 20–23 Double Spread: Pearson Edexcel Paper 3 Section B Capstone Assessment
 *   - Page 24: Master Outside Back Cover with Student Assessment Record Tracker Ledger & QR Codes
 *   - Strict School Anonymity & Institutional Neutrality
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');
const {
  renderStandardFrontCover,
  renderStandardBackCover,
} = require('./components/render_standard_cover.cjs');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const {
  WEIMAR_FOOTERS,
  WEIMAR_KEY_TOPICS_METADATA,
} = require('./components/weimar_workbook_metadata.cjs');
const { WEIMAR_ENQUIRY_CONFIGS } = require('./components/weimar_enquiry_configs.cjs');
const { WEIMAR_SECTION_B } = require('./components/weimar_section_b_data.cjs');

const ROOT_DIR = path.join(__dirname, '..');

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

function renderFooterStrip(pageNum, text, totalPages = 20) {
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
 * MODULE PAGE 1: 5-Stage Chronological Inquiry Spine & Note-Taking Canvas
 * Aligned with Edexcel Medicine Benchmark Standard:
 *   - Full-width black .stage-banner across both columns
 *   - High-visibility 44mm pure white trigger spine with 3 spec-anchored concrete triad bullets
 *   - 6 clean ruled note-taking lines (~154mm writing width)
 *   - White pill paragraph badge [X.Y] on far right of stage banner
 *   - Core Specification Focus strip in header
 */
function renderSpinePage(cfg, pageNum, quip) {
  const { keyTopicBadge, enquiryQuestion, specAnchor, stages } = cfg;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  const stagesHtml = stages
    .map((st, sIdx) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');

      const questionText = st.questionHeading || st.focusClue || st.title;
      const paraBadge = st.paraBadge || `[${sIdx + 1}.1]`;

      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step || sIdx + 1}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.dates}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${questionText}
              </span>
            </div>
            <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; padding: 0.5px 5px; border-radius: 2px; margin-left: 6px; white-space: nowrap; flex-shrink: 0;">
              ${paraBadge}
            </span>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine (Pure White Canvas, Zero Grey Dithering) -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  return `
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum}) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px;">
            ${keyTopicBadge} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 3 (1HI0/31)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Core Specification Focus Strip -->
      ${
        specAnchor
          ? `
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2.5px 7px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.26; color: #000000;">
        <strong style="color: #000000;">Core Specification Focus:</strong> ${specAnchor}
      </div>`
          : ''
      }

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 2px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * MODULE PAGE 2: Extended Writing Assessment Part 1
 * Features:
 *   - Question 2 tariff, exam stem & stimulus box
 *   - Accessible writing frames & key vocabulary bank
 *   - 24 flex task lines
 *   - Timeline Mission linking back to Living Timeline (pp. 2–3)
 */
function renderModulePage2(cfg, pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  const flexTaskLines = Array.from(
    { length: 24 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  return `
  <!-- MODULE PAGE 2: EXTENDED WRITING ASSESSMENT (PAGE ${pageNum}) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div style="display: flex; align-items: baseline; gap: 6px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
              ${cfg.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
              EDEXCEL PAPER 3
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${cfg.scoreMax} ]
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.22;">
            ${cfg.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
            <strong>You may use in your answer:</strong>
            <span>&bull; ${cfg.stimulus[0]}</span>
            <span>&bull; ${cfg.stimulus[1]}</span>
            <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
          </div>
        </div>

        <!-- Accessible Writing Frames & Key Vocabulary Bank -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Accessible Writing Frames:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block; color: #222222;">
              ${cfg.connectives}
            </span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Key Vocabulary Bank:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block; color: #111111;">
              ${cfg.wordBank}
            </span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on Page ${pageNum + 1})</span>
        </div>
      </div>

      <!-- 24 Ruled Task Lines for Extended Writing -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 2px 0 3px 0;">
${flexTaskLines}
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 1px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.22; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 1.5px 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp; ] Done
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * MODULE PAGE 3: Question 2 Continuation & 4-Mark Practice
 * Exactly 1.5 pages for Question 2 (~38 lines total across pp. 2 & 3)
 * + 4-Mark Practice at bottom:
 *   - Inference from Source A (or B) [4 marks]
 *   - Difference in Views between Interpretations 1 & 2 [4 marks]
 *   - Reason Why Views Differ [4 marks]
 */
function renderModulePage3(cfg, pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const fm = cfg.fourMark || {};

  // Top half: 14 ruled task lines to finish Question 2 (~1.5 pages total)
  const q2ContinuationLines = Array.from(
    { length: 14 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  // Bottom half: Exam Practice based on fm.type
  let bottomPracticeHtml = '';

  if (fm.type === 'Difference') {
    // 4-Mark Question 3(b) Difference in Views
    bottomPracticeHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; border-top: 2px solid #000000; padding-top: 3px; margin-top: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
              Question 3(b) Practice
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              Difference in Views between Interpretations
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; text-transform: uppercase; background: #f8fafc;">
              4 Marks &bull; 5 Mins
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0.5px 5px; border-radius: 2px;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
            </span>
          </div>
        </div>

        <p style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${fm.stem}
        </p>

        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
              INTERPRETATIONS 1 &amp; 2 EXTRACT SUMMARY
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #333333;">
              ${fm.provenance || ''}
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; line-height: 1.22; color: #111111;">
            ${fm.sourceExcerpt || ''}
          </div>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Sentence Frame:</strong> ${fm.stems || 'The main difference is that Interpretation 1 argues... whereas Interpretation 2 suggests...'}
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
        </div>
      </div>`;
  } else if (fm.type === 'Reason') {
    // 4-Mark Question 3(c) Why Views Differ
    bottomPracticeHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; border-top: 2px solid #000000; padding-top: 3px; margin-top: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
              Question 3(c) Practice
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              Suggest One Reason Why Views Differ
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; text-transform: uppercase; background: #f8fafc;">
              4 Marks &bull; 5 Mins
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0.5px 5px; border-radius: 2px;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
            </span>
          </div>
        </div>

        <p style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${fm.stem}
        </p>

        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
              HISTORIOGRAPHICAL CONTEXT
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #333333;">
              ${fm.provenance || ''}
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; line-height: 1.22; color: #111111;">
            ${fm.sourceExcerpt || ''}
          </div>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Sentence Frame:</strong> ${fm.stems || 'One reason they give different views is that the historians investigated different aspects...'}
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
          <div class="task-line-flex"></div>
        </div>
      </div>`;
  } else {
    // Default: Question 1 Inference from Source A (or Source B, C, D)
    const sourceLabel =
      fm.tariffLabel && fm.tariffLabel.includes('Source B')
        ? 'SOURCE B'
        : fm.tariffLabel && fm.tariffLabel.includes('Source C')
        ? 'SOURCE C'
        : fm.tariffLabel && fm.tariffLabel.includes('Source D')
        ? 'SOURCE D'
        : 'SOURCE A';
    bottomPracticeHtml = `
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; border-top: 2px solid #000000; padding-top: 3px; margin-top: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
              Question 1 Practice
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              Inference from ${sourceLabel}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; text-transform: uppercase; background: #f8fafc;">
              4 Marks &bull; 5 Mins
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0.5px 5px; border-radius: 2px;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
            </span>
          </div>
        </div>

        <!-- Question Stem -->
        <p style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${fm.stem || `Give two things you can infer from ${sourceLabel}.`}
        </p>

        <!-- Source Extract Box -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
              ${sourceLabel}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #333333;">
              ${fm.provenance || ''}
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; line-height: 1.22; color: #111111;">
            ${fm.sourceExcerpt || ''}
          </div>
        </div>

        <!-- Official Pearson Edexcel Inference Answer Structure -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 1px;">
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-bottom: 1.5px;">
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000;">
                (i) What I can infer:
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #555555; font-style: italic;">[1 mark]</span>
            </div>
            <div class="task-line-flex" style="min-height: 5.5mm;"></div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-bottom: 1.5px;">
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000;">
                Details in ${sourceLabel} that tell me this:
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #555555; font-style: italic;">[1 mark]</span>
            </div>
            <div class="task-line-flex" style="min-height: 5.5mm;"></div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-bottom: 1.5px;">
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000;">
                (ii) What I can infer:
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #555555; font-style: italic;">[1 mark]</span>
            </div>
            <div class="task-line-flex" style="min-height: 5.5mm;"></div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000;">
                Details in ${sourceLabel} that tell me this:
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #555555; font-style: italic;">[1 mark]</span>
            </div>
            <div class="task-line-flex" style="min-height: 5.5mm;"></div>
          </div>
        </div>
      </div>`;
  }

  return `
  <!-- MODULE PAGE 3: QUESTION 2 CONTINUED & EXAM PRACTICE (PAGE ${pageNum}) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- TOP HALF: QUESTION 2 EXPLAIN WHY CONTINUATION (14 LINES) -->
      <div style="flex: 1.1; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            Question 2: Explain Why Continued [12 Marks]
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Continue your response below (complete Factor 3 from own knowledge &amp; concluding analytical verdict):
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${q2ContinuationLines}
        </div>
      </div>

      <!-- BOTTOM HALF: 4-MARK EXAM PRACTICE -->
${bottomPracticeHtml}

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * PAGE 16: Cartographic & Archival Visual Blueprint (Verso)
 */
function renderBlueprintPage(bp, pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- PAGE ${pageNum}: CARTOGRAPHIC & ARCHIVAL VISUAL BLUEPRINT -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
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
          <div>
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

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * PAGE 17: Master Knowledge Organiser (Recto)
 */
function renderKnowledgeOrganiserPage(ktMeta, pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const ktNum = ktMeta.keyTopicNum;

  return `
  <!-- PAGE ${pageNum}: MASTER KNOWLEDGE ORGANISER -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * PAGE 18: Grade 9 Exam Technique Masterclass & Marking Rubrics (Verso)
 * Zero model answers; teaches examination laws, COP formula, and Band 4 criteria.
 */
function renderExamMasterclassPage(ktNum, pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- PAGE ${pageNum}: GRADE 9 EXAM TECHNIQUE MASTERCLASS & MARKING RUBRICS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * PAGE 19: Dedicated British Exercise Notes & Examination Strategy Page (Recto)
 * Aligned with Medicine Benchmark Page 19 Standard:
 *   - Red/black vertical margin line at 26mm
 *   - 32 flex-filled ruled horizontal note lines
 */
function renderNotesPage(pageNum, quip, totalPages = 24, ktNum = 1) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: DEDICATED BRITISH EXERCISE NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Topic ${ktNum} Notes &amp; Examination Strategy
        </h2>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Standard Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #000000; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard ~8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, totalPages)}
    </div>
  </div>`;
}

/**
 * SECTION B CAPSTONE PAGE 16: Sources B & C and Question 3(a) Utility [8 Marks] (Verso)
 */
function renderSectionBPage16(ktId, pageNum, quip) {
  const sb = WEIMAR_SECTION_B[ktId];
  if (!sb) throw new Error(`Missing Section B data for ${ktId}`);

  // Dynamic lines count based on whether visual source plates are embedded
  const hasImages = !!(sb.sourceB.image || sb.sourceC.image);
  const numLines = hasImages ? 16 : 22;

  const q3aTaskLines = Array.from(
    { length: numLines },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  return `
  <!-- PAGE 16: SECTION B CAPSTONE PART 1: SOURCES B & C & QUESTION 3(a) -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- EXAM HEADER -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 7px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
            SECTION B: HISTORICAL SOURCES &amp; INTERPRETATIONS MASTERCLASS
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
            Key Topic ${sb.keyTopicNum} Capstone Assessment &bull; Edexcel Paper 3
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 2px 0 0 0; font-weight: 900; line-height: 1.2;">
          ${sb.q3a.tariff}
        </h2>
      </div>

      <!-- SOURCES B AND C CONTAINER (TWO SIDE-BY-SIDE ARCHIVAL BOXES) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 2px;">
        
        <!-- SOURCE B -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                ${sb.sourceB.tag}
              </strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1.5px;">
              ${sb.sourceB.heading}
            </div>
            ${
              sb.sourceB.image
                ? `
            <div style="text-align: center; margin: 2px 0;">
              <img src="${getBase64Image(sb.sourceB.image)}" alt="${sb.sourceB.heading}" style="max-height: 25mm; max-width: 100%; object-fit: contain; border: 1px solid #000000; border-radius: 2px; display: block; margin: 0 auto;" />
            </div>`
                : ''
            }
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-style: italic; color: #333333; margin-bottom: 2px; line-height: 1.18;">
              ${sb.sourceB.provenance}
            </div>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.22; color: #111111; border-top: 0.8px solid #cbd5e1; padding-top: 2px;">
            ${sb.sourceB.text}
          </div>
        </div>

        <!-- SOURCE C -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                ${sb.sourceC.tag}
              </strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1.5px;">
              ${sb.sourceC.heading}
            </div>
            ${
              sb.sourceC.image
                ? `
            <div style="text-align: center; margin: 2px 0;">
              <img src="${getBase64Image(sb.sourceC.image)}" alt="${sb.sourceC.heading}" style="max-height: 25mm; max-width: 100%; object-fit: contain; border: 1px solid #000000; border-radius: 2px; display: block; margin: 0 auto;" />
            </div>`
                : ''
            }
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-style: italic; color: #333333; margin-bottom: 2px; line-height: 1.18;">
              ${sb.sourceC.provenance}
            </div>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.22; color: #111111; border-top: 0.8px solid #cbd5e1; padding-top: 2px;">
            ${sb.sourceC.text}
          </div>
        </div>

      </div>

      <!-- QUESTION 3(a) STEM & FORMULA BOX -->
      <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #f8fafc; margin-bottom: 2px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.6pt; font-weight: 800; color: #000000; margin-bottom: 1.5px; line-height: 1.2;">
          ${sb.q3a.stem}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #1e293b;">
          <strong>Assessment Formula:</strong> Evaluate Content + Provenance (Author, Motive, Date) with contextual knowledge for Source B, then Source C.
        </div>
      </div>

      <!-- SOURCE B EVALUATION WRITING SECTION -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000; margin-bottom: 1px;">
          <span>${sb.q3a.promptB}</span>
          <span style="font-size: 6.6pt; color: #555555; font-style: italic;">(Source C evaluation continues on Page ${pageNum + 1})</span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 0 0;">
${q3aTaskLines}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * SECTION B CAPSTONE PAGE 17: Q3(a) Synthesis, Interpretations 1 & 2 & Q3(b) [4 Marks] (Recto)
 */
function renderSectionBPage17(ktId, pageNum, quip) {
  const sb = WEIMAR_SECTION_B[ktId];
  if (!sb) throw new Error(`Missing Section B data for ${ktId}`);

  const q3aContinuationLines = Array.from(
    { length: 10 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  const q3bTaskLines = Array.from(
    { length: 8 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  return `
  <!-- PAGE 17: SECTION B CAPSTONE PART 2: Q3(a) SYNTHESIS & Q3(b) DIFFERENCE IN VIEWS -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- TOP: QUESTION 3(a) CONTINUATION (SOURCE C & SYNTHESIS) -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase;">
            Question 3(a) Continued: ${sb.q3a.promptC}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0.5px 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 8 ]
          </span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 0 0;">
${q3aContinuationLines}
        </div>
      </div>

      <!-- BOTTOM: INTERPRETATIONS 1 AND 2 & QUESTION 3(b) [4 MARKS] -->
      <div style="flex: 1.35; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 2px solid #000000; padding-top: 2px; margin-top: 2px; margin-bottom: 2px;">
        
        <!-- SECTION BANNER -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
            HISTORICAL INTERPRETATIONS 1 AND 2
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            Target: How and why historians differ (AO4)
          </span>
        </div>

        <!-- INTERPRETATIONS SIDE-BY-SIDE BOXES -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 2px;">
          
          <!-- INTERPRETATION 1 -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000000;">
                ${sb.interp1.tag}
              </strong>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #333333; font-style: italic;">
                ${sb.interp1.author}
              </div>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 6.9pt; line-height: 1.22; color: #111111;">
              ${sb.interp1.text}
            </div>
          </div>

          <!-- INTERPRETATION 2 -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000000;">
                ${sb.interp2.tag}
              </strong>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #333333; font-style: italic;">
                ${sb.interp2.author}
              </div>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 6.9pt; line-height: 1.22; color: #111111;">
              ${sb.interp2.text}
            </div>
          </div>

        </div>

        <!-- QUESTION 3(b) STEM BOX -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000;">
              ${sb.q3b.stem}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; white-space: nowrap; margin-left: 6px;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; margin-top: 1px;">
            <strong>Mark Scheme Law:</strong> Identify the fundamental difference in emphasis, then back up each view with direct quotes or specific details from both interpretations.
          </div>
        </div>

        <!-- QUESTION 3(b) RULED WRITING LINES -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 0 0;">
${q3bTaskLines}
        </div>

      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * SECTION B CAPSTONE PAGE 18: Q3(c) [4 Marks] & Q3(d) Planning Framework (Verso)
 */
function renderSectionBPage18(ktId, pageNum, quip) {
  const sb = WEIMAR_SECTION_B[ktId];
  if (!sb) throw new Error(`Missing Section B data for ${ktId}`);

  const q3cTaskLines = Array.from(
    { length: 9 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  const q3dPlanningLines = Array.from(
    { length: 11 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  return `
  <!-- PAGE 18: SECTION B CAPSTONE PART 3: Q3(c) REASONS & Q3(d) PLANNING FRAMEWORK -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- TOP: QUESTION 3(c) SUGGEST WHY INTERPRETATIONS DIFFER [4 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${sb.q3c.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0.5px 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000; margin-bottom: 1px;">
            ${sb.q3c.stem}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #334155;">
            <strong>Examiner Guidance:</strong> ${sb.q3c.target || sb.q3c.guidance || 'Explain that historians investigated different aspects of society or placed weight on different sources.'}
          </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 0 0;">
${q3cTaskLines}
        </div>
      </div>

      <!-- BOTTOM: QUESTION 3(d) PLANNING & ESSAY SETUP [16 MARKS + 4 SPAG = 20 MARKS] -->
      <div style="flex: 1.4; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 2px solid #000000; padding-top: 2px; margin-top: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
            QUESTION 3(d) ESSAY PLANNING &amp; CRITERIA SETUP
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            16 Marks + 4 SPaG = 20 Marks &bull; 25 Mins
          </span>
        </div>

        <!-- Question Stem & Thesis Prompt -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000; margin-bottom: 1px;">
            ${sb.q3d.stem}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #334155;">
            <strong>Thesis Prompt:</strong> ${sb.planning3d ? sb.planning3d.thesisPrompt : 'Establish your judgment criteria, select quotes from Interpretations 1 & 2, and deploy contextual knowledge.'}
          </div>
        </div>

        <!-- Guidance Banner -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e293b; margin-bottom: 1px;">
          <span><strong>Criteria Planning Canvas:</strong> Establish criteria benchmark, map quotes from Int 1 &amp; Int 2, and outline your verdict:</span>
          <span style="font-size: 6.4pt; color: #555555; font-style: italic;">(Essay continues on Page ${pageNum + 1})</span>
        </div>

        <!-- Continuous Ruled Planning Lines (STRICTLY NO 4-box matrix) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 2px 0;">
${q3dPlanningLines}
        </div>

        <!-- LEVEL 4 RUBRIC CHECK STRIP -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.3pt;">
          <div><strong>Level 4 Target (13–16 Marks):</strong> Balanced analysis of both views &bull; Sustained contextual knowledge &bull; Justified criteria-led judgment.</div>
          <div style="font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">SPaG: 4/4 MARKS</div>
        </div>

      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * SECTION B CAPSTONE PAGE 19: Question 3(d) Extended Evaluative Essay Canvas (Recto)
 */
function renderSectionBPage19(ktId, pageNum, quip) {
  const sb = WEIMAR_SECTION_B[ktId];
  if (!sb) throw new Error(`Missing Section B data for ${ktId}`);

  const essayLines = Array.from(
    { length: 26 },
    () => `
        <div class="task-line-flex"></div>`,
  ).join('');

  return `
  <!-- PAGE 19: SECTION B CAPSTONE PART 4: QUESTION 3(d) EVALUATIVE ESSAY -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- ESSAY HEADER & MARK MATRIX -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 900;">
              Question 3(d): Evaluative Essay on Historical Interpretations
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
              [16 MARKS + 4 SPAG = 20 MARKS &bull; TIMED ESSAY: 25 MINS]
            </span>
          </div>
          <div style="border: 1.2px solid #000000; padding: 2px 7px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #ffffff;">
            AO4: [ &nbsp;&nbsp;&nbsp;&nbsp; / 16 ] &nbsp;|&nbsp; SPaG: [ &nbsp;&nbsp;&nbsp;&nbsp; / 4 ] &nbsp;|&nbsp; Total: [ &nbsp;&nbsp;&nbsp;&nbsp; / 20 ]
          </div>
        </div>

        <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000; margin: 1.5px 0 1px 0; line-height: 1.2;">
          ${sb.q3d.stem}
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin-bottom: 1.5px;">
          Write your response in the space provided below:
        </div>
      </div>

      <!-- 26 RULED TASK LINES FOR EVALUATIVE ESSAY -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 2px 0;">
${essayLines}
      </div>

      <!-- EXAMINER LEVEL MATRIX & SIGN-OFF -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; margin-top: 1px;">
        <div style="display: flex; gap: 8px;">
          <strong>Band 4 Criteria Check:</strong>
          <span>[ &nbsp; ] Criteria Established</span>
          <span>[ &nbsp; ] Both Ints Explored</span>
          <span>[ &nbsp; ] Precise Own Knowledge</span>
          <span>[ &nbsp; ] Justified Verdict</span>
        </div>
        <div>
          <strong>Teacher Sign-off:</strong> ____________________
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

/**
 * Builds the complete 24-page workbook HTML for a Key Topic
 */
function buildWeimarKeyTopicWorkbook(ktId) {
  const ktMeta = WEIMAR_KEY_TOPICS_METADATA[ktId];
  if (!ktMeta) throw new Error(`Unknown Key Topic ID: ${ktId}`);

  const footers = WEIMAR_FOOTERS[ktId];
  const ktNum = ktMeta.keyTopicNum;
  const enquiryConfigs = WEIMAR_ENQUIRY_CONFIGS[ktId] || [];

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
    .page, .page-container {
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
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
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
    .spine-stage-row {
      display: flex;
      flex: 1;
      min-height: 0;
      align-items: stretch;
      margin: 0;
      border-bottom: 1.2px solid #000000;
    }
    .task-section {
      margin-bottom: 2px;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-flex {
      border-bottom: 1.2px solid #000000;
      flex: 1;
      min-height: 0;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 5.8mm;
      margin: 0;
      box-sizing: border-box;
    }
    .note-line {
      border-bottom: 1.2px solid #000000;
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
      margin: 0;
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
      white-space: nowrap;
    }
    .footer-quip {
      font-style: italic;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    totalPageCount: 20,
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

      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        ${msPart1
          .map(
            (m, mIdx) => `
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0 4px 0; ${mIdx < msPart1.length - 1 ? 'border-bottom: 1.2px solid #000000; margin-bottom: 2px;' : ''}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #333333;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #111111; margin: 0 0 2px 0; line-height: 1.22;">
              ${m.text}
            </p>
          </div>
          <!-- Open Sketchpad Area -->
          <div style="flex: 1; min-height: 48mm; background: #ffffff;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, footers[1], 20)}
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

      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        ${msPart2
          .map(
            (m, mIdx) => `
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0 4px 0; ${mIdx < msPart2.length - 1 ? 'border-bottom: 1.2px solid #000000; margin-bottom: 2px;' : ''}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #333333;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #111111; margin: 0 0 2px 0; line-height: 1.22;">
              ${m.text}
            </p>
          </div>
          <!-- Open Sketchpad Area -->
          <div style="flex: 1; min-height: 48mm; background: #ffffff;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, footers[2], 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–15: 4 DEDICATED THREE-PAGE ENQUIRY MODULES (12 PAGES TOTAL)
  // Page 1: Chronological Inquiry Spine & Note-Taking Canvas
  // Page 2: Extended Writing Part 1 (24 flex lines, stimulus, frames & vocab, timeline mission)
  // Page 3: Extended Writing Part 2 (14 continuation lines + 4-Mark Practice at bottom)
  // ====================================================================
  enquiryConfigs.forEach((cfg, idx) => {
    const spinePageNum = 4 + idx * 3; // 4, 7, 10, 13
    const qPart1PageNum = spinePageNum + 1; // 5, 8, 11, 14
    const qPart2PageNum = spinePageNum + 2; // 6, 9, 12, 15

    // Module Page 1: 5-Stage Chronological Inquiry Spine & Note-Taking Canvas
    html += renderSpinePage(cfg, spinePageNum, footers[spinePageNum - 1]);

    // Module Page 2: Question 2 Extended Writing Part 1
    html += renderModulePage2(cfg, qPart1PageNum, footers[qPart1PageNum - 1]);

    // Module Page 3: Question 2 Continuation + 4-Mark Exam Practice
    html += renderModulePage3(cfg, qPart2PageNum, footers[qPart2PageNum - 1]);
  });

  // ====================================================================
  // PAGES 16–19: SECTION B CAPSTONE ASSESSMENT (PEARSON EDEXCEL PAPER 3)
  // Page 16 (Verso): Sources B & C Extracts + Question 3(a) Utility [8m] (Source B)
  // Page 17 (Recto): Question 3(a) Synthesis + Interpretations 1 & 2 + Question 3(b) [4m]
  // Page 18 (Verso): Question 3(c) Why views differ [4m] + Question 3(d) Planning Framework
  // Page 19 (Recto): Question 3(d) Evaluative Essay [16m + 4 SPaG = 20m]
  // ====================================================================
  html += renderSectionBPage16(ktId, 16, footers[15]);
  html += renderSectionBPage17(ktId, 17, footers[16]);
  html += renderSectionBPage18(ktId, 18, footers[17]);
  html += renderSectionBPage19(ktId, 19, footers[18]);

  // ====================================================================
  // PAGE 20: MASTER OUTSIDE BACK COVER
  // ====================================================================
  html += renderStandardBackCover({
    unitId: 'weimar_nazi_germany',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 3: WEIMAR AND NAZI GERMANY, 1918–1939',
    keyTopicNum: ktNum,
    trackerTitle: `Student Assessment Record &bull; Key Topic ${ktNum} Tracker`,
    trackerSubtitle: `Paper 3: Weimar and Nazi Germany, 1918–1939 (${ktMeta.title})`,
    enquiries: enquiryConfigs.map((l) => ({
      num: l.lessonNum,
      code: `KT${ktNum}.${l.lessonNum}`,
      title:
        l.enquiryQuestion.length > 55 ? l.enquiryQuestion.slice(0, 52) + '...' : l.enquiryQuestion,
      doNowMarks: 10,
      q1aMarks: 4,
      q1bMarks: 12,
      extType: 'Q2',
      extMarks: 12,
      totalMarks: 26,
    })),
    feedback: {
      effortGrade: '',
      signature: '____________________________',
      date: '____________________',
    },
    qrLessons: enquiryConfigs.map((l) => ({
      label: `KT ${ktNum}.${l.lessonNum}`,
      subLabel: `Enquiry ${ktNum}.${l.lessonNum}`,
      title: l.enquiryQuestion,
      url: `https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&lesson=${l.id}`,
    })),
    footerQuip: footers[19],
    totalPageCount: 20,
    renderFooterStrip,
  });

  html += `
</body>
</html>
`;

  return html;
}

async function compilePdf(htmlPath, pdfPath, v17Path) {
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

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

  // Strict physical page count verification
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(pdfBuffer);
  if (pdfData.numpages !== 20) {
    await browser.close();
    throw new Error(
      `CRITICAL REPROGRAPHIC FAILURE: Compiled PDF ${pdfPath} has ${pdfData.numpages} pages, expected strictly 20!`,
    );
  }
  console.log(`✅ Asserted exact 20-page physical count (${pdfData.numpages}/20 pages).`);

  await browser.close();
}

async function main() {
  const target = process.argv[2] || 'all';
  const targets = target === 'all' ? ['KT1', 'KT2', 'KT3', 'KT4'] : [target.toUpperCase()];

  console.log('======================================================');
  console.log(`🏰 Weimar & Nazi Germany Declarative 20-Page Engine`);
  console.log(`Targeting: ${targets.join(', ')}`);
  console.log('======================================================\n');

  for (const kt of targets) {
    console.log(`\n▶ Generating 20-page workbook for Key Topic ${kt}...`);
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
    console.log(`🖨️ Compiling PDF with Puppeteer & Asserting Page Budget...`);
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
