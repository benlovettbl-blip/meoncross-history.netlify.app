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
 *   - Golden Standard 4-Page Enquiry Module Architecture
 *   - 5-Stage Chronological Inquiry Spine per Enquiry (Left: 38mm with triad; Right: 6 ruled lines)
 *   - Spec-Anchored Concrete Triads (3 bullets per stage: concrete nouns + active verbs)
 *   - Purely Structural Accessible Writing Frames (Zero Knowledge Giveaways)
 *   - 22 Flex Task Lines on Module Page 2 with Timeline Mission
 *   - 31 Continuation Lines on Module Page 3
 *   - 24 Conclusion Lines + 4-Mark Paper 3 Exam Question on Module Page 4
 *   - Strict School Anonymity & Institutional Neutrality
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
} = require('./components/weimar_workbook_metadata.cjs');
const { WEIMAR_ENQUIRY_CONFIGS } = require('./components/weimar_enquiry_configs.cjs');

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

function renderFooterStrip(pageNum, text, totalPages = 24) {
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
 * MODULE PAGE 1: 5-Stage Chronological Inquiry Spine (Verso)
 */
function renderSpinePage(cfg, pageNum, quip) {
  const { keyTopicBadge, enquiryQuestion, stages } = cfg;

  let stagesHtml = '';
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map((b) => `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`)
      .join('\n');
    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0; border-bottom: 1.2px solid #000000;">
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 3px 0 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
                ${st.title}
              </div>
              <div style="margin-top: 1px;">
                <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                  ${bulletsHtml}
                </div>
              </div>
              <div style="margin-top: 2.5px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                  Focus Clue
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                  ${st.focusClue}
                </div>
              </div>
            </div>

            <!-- Ruled Lines (6 Lines per stage • 30 lines total) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>`;
  });

  return `
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum}) -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ${keyTopicBadge} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 3 (1HI0/31) &bull; WEIMAR &amp; NAZI GERMANY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 1px; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Take precise, structured notes alongside each milestone as your teacher narrates the history
          </span>
        </div>

        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * MODULE PAGE 2: Extended Writing Assessment (Recto)
 */
function renderModulePage2(cfg, pageNum, quip) {
  const flexTaskLines = Array.from(
    { length: 22 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  return `
  <!-- MODULE PAGE 2: EXTENDED WRITING ASSESSMENT (PAGE ${pageNum}) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
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
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 22 Ruled Task Lines for Extended Writing -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
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

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * MODULE PAGE 3: Extended Writing Continued (Verso)
 */
function renderModulePage3(cfg, pageNum, quip) {
  const continuationTaskLines = Array.from(
    { length: 31 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  return `
  <!-- MODULE PAGE 3: EXTENDED WRITING CONTINUED (PAGE ${pageNum}) -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          ${cfg.tariff.split(':')[0]} Continued
        </span>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
        Continue your response to ${cfg.tariff.split(':')[0]} below:
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
${continuationTaskLines}
      </div>

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

/**
 * MODULE PAGE 4: Assessment Synthesis & 4-Mark Practice (Recto)
 */
function renderModulePage4(cfg, pageNum, quip) {
  const conclusionTaskLines = Array.from(
    { length: 24 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  const q4TaskLines = Array.from(
    { length: 6 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  const fm = cfg.fourMark;
  let fourMarkBody = '';

  if (fm.type === 'Inference') {
    fourMarkBody = `
      <div style="border-top: 2px solid #000000; padding-top: 3px; margin-top: 2px; flex: 1.4; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; ${fm.tariffLabel}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; text-transform: uppercase;">
              [4 MARKS &bull; 5 MINS]
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
            ${fm.stem}
          </p>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; font-style: italic; color: #222222; margin-bottom: 2px; border-left: 2px solid #000000; padding-left: 4px; line-height: 1.18;">
            ${fm.sourceExcerpt}
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; margin: 0;">
          ${q4TaskLines}
        </div>
      </div>`;
  } else {
    fourMarkBody = `
      <div style="border-top: 2px solid #000000; padding-top: 3px; margin-top: 2px; flex: 1.4; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; ${fm.tariffLabel}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; text-transform: uppercase;">
              [4 MARKS &bull; 5 MINS]
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
            ${fm.stem}
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1.5px 4px; border-radius: 2px; margin-bottom: 1px;">
            <strong>Target: AO4 [4 marks] &bull; Sentence Stem:</strong> <em>${fm.stems}</em>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; margin: 0;">
          ${q4TaskLines}
        </div>
      </div>`;
  }

  return `
  <!-- MODULE PAGE 4: ASSESSMENT SYNTHESIS & 4-MARK EXAM PRACTICE (PAGE ${pageNum}) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Assessment Synthesis &amp; Question Practice
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Final analytical evaluation &amp; concluding historical verdict:
        </div>
      </div>

      <div style="flex: 3.6; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
${conclusionTaskLines}
      </div>

      ${fourMarkBody}

      ${renderFooterStrip(pageNum, quip, 24)}
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
  const synopticPrompt = ktMeta.synopticPrompt;
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
    totalPageCount: 24,
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

      ${renderFooterStrip(2, footers[1], 24)}
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

      ${renderFooterStrip(3, footers[2], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–19: 4 DEDICATED FOUR-PAGE ENQUIRY MODULES (GOLDEN STANDARD)
  // Page 1: 5-Stage Chronological Inquiry Spine (Verso)
  // Page 2: Extended Writing Assessment with 22 Flex Lines & Frames (Recto)
  // Page 3: Extended Writing Continued with 31 Lines (Verso)
  // Page 4: Assessment Synthesis with 24 Lines + 4-Mark Practice (Recto)
  // ====================================================================
  enquiryConfigs.forEach((cfg, idx) => {
    const leftPageNum = 4 + idx * 4; // 4, 8, 12, 16
    const rightPageNum = leftPageNum + 1; // 5, 9, 13, 17
    const linedLeftPageNum = leftPageNum + 2; // 6, 10, 14, 18
    const linedRightPageNum = leftPageNum + 3; // 7, 11, 15, 19

    // Page 1 of module (Verso): 5-Stage Chronological Inquiry Spine
    html += renderSpinePage(cfg, leftPageNum, footers[leftPageNum - 1]);

    // Page 2 of module (Recto): Extended Writing Assessment
    html += renderModulePage2(cfg, rightPageNum, footers[rightPageNum - 1]);

    // Page 3 of module (Verso): Extended Writing Continued
    html += renderModulePage3(cfg, linedLeftPageNum, footers[linedLeftPageNum - 1]);

    // Page 4 of module (Recto): Assessment Synthesis & 4-Mark Practice
    html += renderModulePage4(cfg, linedRightPageNum, footers[linedRightPageNum - 1]);
  });

  // ====================================================================
  // PAGE 20: CARTOGRAPHIC & ARCHIVAL VISUAL BLUEPRINT (VERSO)
  // ====================================================================
  const bp = ktMeta.blueprint;
  html += `
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(20, footers[19], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 21: MASTER KNOWLEDGE ORGANISER (RECTO)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-21" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(21, footers[20], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 22: GRADE 9 ASSESSMENT MASTERCLASS & BAND 4 RUBRICS (VERSO)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-22" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(22, footers[21], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 23: TIMED SYNOPTIC EXAM CHALLENGE (RECTO)
  // WITH FULL-PAGE DYNAMIC AUTO-LINES
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(23, footers[22], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 24: MASTER OUTSIDE BACK COVER
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
      q1bMarks: 4,
      extType:
        l.lessonNum === 3 && ktNum === 3
          ? 'Q3a'
          : l.lessonNum === 4 && (ktNum === 3 || ktNum === 4)
            ? 'Q3d'
            : 'Q2',
      extMarks:
        l.lessonNum === 3 && ktNum === 3
          ? 8
          : l.lessonNum === 4 && (ktNum === 3 || ktNum === 4)
            ? 16
            : 12,
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
    footerQuip: footers[23],
    totalPageCount: 24,
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
  console.log(`🏰 Weimar & Nazi Germany Declarative 24-Page Engine`);
  console.log(`Targeting: ${targets.join(', ')}`);
  console.log('======================================================\n');

  for (const kt of targets) {
    console.log(`\n▶ Generating 24-page workbook for Key Topic ${kt}...`);
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
