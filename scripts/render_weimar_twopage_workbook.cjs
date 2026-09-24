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
 * Standard:
 *   - Exact 16-Page A4 Double-Page Spread Architecture (4 A3 Folded Spreads)
 *   - Edexcel Paper 3 4-4-4-4 Question Matrix Across Each Key Topic:
 *     - Enquiry 1: Section A Focus (Q1 Inference [4m] + Q2 Causation [12m])
 *     - Enquiry 2: Section A Focus (Forensic Causal Domino + Q2 Explain Why [12m])
 *     - Enquiry 3: Section B Focus (Dual Primary Sources B/C + Q3a Utility [8m])
 *     - Enquiry 4: Section B Focus (Dual Interpretations 1/2 + Q3b-c [8m] + Q3d Evaluative Essay [16+4m])
 *   - Cartographic & Archival Visual Blueprint (Page 12)
 *   - Master Knowledge Organiser (Page 13)
 *   - Grade 9 Masterclass & Band 4 Rubrics (Page 14)
 *   - Synoptic Exam Challenge (Page 15)
 *   - Master Outside Back Cover with Ledger & 5 QR Codes (Page 16)
 *   - Strict School Anonymity (data-department-name customizer standard)
 *
 * Usage:
 *   node scripts/render_weimar_twopage_workbook.cjs KT1
 *   node scripts/render_weimar_twopage_workbook.cjs KT2
 *   node scripts/render_weimar_twopage_workbook.cjs KT3
 *   node scripts/render_weimar_twopage_workbook.cjs KT4
 *   node scripts/render_weimar_twopage_workbook.cjs all
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
  WEIMAR_KEY_TOPICS_DATA,
  WEIMAR_FOOTERS,
  getBase64Image,
} = require('./weimar_twopage_data.cjs');

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

// Synoptic Timed Exam Prompts for Page 15
const SYNOPTIC_PROMPTS = {
  KT1: {
    title: 'Key Topic 1 Synoptic Examination Assessment',
    provenance: 'Edexcel November 2021 (Q2)',
    tariff: 'Section A: Question 2 • Explain Why [12 Marks • 18 Mins]',
    question: 'Explain why the Weimar Republic faced political crises in the years 1919–1923.',
    stimulus: ['The Spartacist Uprising', 'The occupation of the Ruhr'],
    hint: 'Remember to introduce a third factor of your own knowledge (e.g. the Kapp Putsch, the Treaty of Versailles, or the hyperinflation crisis).',
    maxScore: 12,
  },
  KT2: {
    title: 'Key Topic 2 Synoptic Examination Assessment',
    provenance: 'Edexcel June 2023 (Q2)',
    tariff: 'Section A: Question 2 • Explain Why [12 Marks • 18 Mins]',
    question: 'Explain why the Nazi Party grew in popularity between 1929 and 1932.',
    stimulus: ['The Wall Street Crash', 'Fear of Communism'],
    hint: 'Remember to introduce a third factor of your own knowledge (e.g. Goebbels’ propaganda, Hitler’s charismatic oratory, or the failure of Brüning’s government).',
    maxScore: 12,
  },
  KT3: {
    title: 'Key Topic 3 Synoptic Examination Assessment',
    provenance: 'Edexcel June 2022 (Q2)',
    tariff: 'Section A: Question 2 • Explain Why [12 Marks • 18 Mins]',
    question:
      'Explain why Adolf Hitler was able to establish a totalitarian dictatorship in Germany between 1933 and 1934.',
    stimulus: ['The Reichstag Fire', 'The Night of the Long Knives'],
    hint: 'Remember to introduce a third factor of your own knowledge (e.g. the Enabling Act, the banning of trade unions and political parties, or the death of Hindenburg and the Army Oath).',
    maxScore: 12,
  },
  KT4: {
    title: 'Key Topic 4 Synoptic Examination Assessment',
    provenance: 'Edexcel November 2020 (Q2)',
    tariff: 'Section A: Question 2 • Explain Why [12 Marks • 18 Mins]',
    question:
      'Explain why Nazi policies towards minority groups escalated into violence between 1933 and 1939.',
    stimulus: ['The Nuremberg Laws (1935)', 'Kristallnacht (1938)'],
    hint: 'Remember to introduce a third factor of your own knowledge (e.g. the 1933 boycott of Jewish shops, forced sterilisation of the disabled, or the radicalisation of local SA and SS mobs).',
    maxScore: 12,
  },
};

function buildWeimarKeyTopicWorkbook(ktId) {
  const data = WEIMAR_KEY_TOPICS_DATA[ktId];
  if (!data) throw new Error(`Unknown Key Topic ID: ${ktId}`);

  const footers = WEIMAR_FOOTERS[ktId];
  const synopticPrompt = SYNOPTIC_PROMPTS[ktId];

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic ${data.keyTopicNum}: ${data.title} Workbook</title>
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
    .textbook-cite-badge {
      display: inline-block;
      font-family: 'Inter', monospace, sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #000000;
      background: #f1f5f9;
      border: 1px solid #000000;
      padding: 0.5px 4px;
      border-radius: 2px;
      letter-spacing: 0.02em;
    }
    .task-line {
      border-bottom: 1.5px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.0mm;
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
    keyTopicNum: data.keyTopicNum,
    dateRange: data.dateRange,
    title: data.title,
    subtitle: data.subtitle,
    heroImage: data.heroImage,
    specBox: data.specBox,
    footerQuip: footers[0],
    totalPageCount: 16,
    renderFooterStrip,
  });

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (6 MILESTONES)
  // ====================================================================
  const msPart1 = data.milestones.slice(0, 3);
  const msPart2 = data.milestones.slice(3, 6);

  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Chronological Anchors (Key Topic ${data.keyTopicNum})
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
            Living Timeline &bull; Part 2: Chronological Anchors (Key Topic ${data.keyTopicNum})
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
  // ====================================================================
  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = 5 + idx * 2;
    const rx = enq.rightExam;

    // Dynamic Verso Bottom Component based on examType
    let versoExamComponentHtml = '';

    if (enq.examType === 'inference_4') {
      // Enquiry 1: Q1 Inference [4m] with Source A Archival Citation Box
      versoExamComponentHtml = `
      <!-- Question 1: Inference [4 marks] & Source A -->
      <div class="archival-box">
        <div class="archival-header">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
            ${enq.sourceA.tag}
          </span>
          <span class="archival-shelfmark">${enq.sourceA.shelfmark}</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin: 1px 0 2px 0;">
          <strong>Provenance:</strong> ${enq.sourceA.origin}
        </p>
        <p style="font-family: 'Georgia', serif; font-size: 8.6pt; line-height: 1.22; color: #000000; margin: 0;">
          ${enq.sourceA.text}
        </p>
      </div>

      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase;">
            &bull; Question 1: Inference from Source A [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            ${enq.provenance}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          ${enq.inferenceQuestion.stem}
        </p>
        <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 5px; background: #f8fafc; margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.16;">
            <strong>(i) What I can infer:</strong> ____________________________________________________________________<br>
            <strong>Details in Source A that tell me this:</strong> ____________________________________________________
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.16; margin-top: 2px;">
            <strong>(ii) What I can infer:</strong> ___________________________________________________________________<br>
            <strong>Details in Source A that tell me this:</strong> ____________________________________________________
          </div>
        </div>
      </div>
      `;
    } else if (enq.examType === 'forensic_check') {
      // Enquiry 2: Causal Chain Domino / Forensic Check
      const cc = enq.causationCheck;
      versoExamComponentHtml = `
      <!-- Chronological Domino & Causal Chain -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            &bull; Forensic Causation Domino: Chronological Sequence
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            HISTORICAL CAUSALITY
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.18;">
          ${cc.items.map((it) => `<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.5px 5px; border-radius: 2px;"><strong>&bull;</strong> ${it}</div>`).join('')}
        </div>
      </div>

      <div class="task-section">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
          &bull; Forensic Causal Task: Explain the turning point
        </strong>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          ${cc.question}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>
      `;
    } else if (enq.examType === 'utility_8') {
      // Enquiry 3: Dual Sources B & C and Utility COP Hints
      const s = enq.sourcesBC;
      versoExamComponentHtml = `
      <!-- Dual Primary Sources B & C Plate -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 2px;">
        <div class="archival-box" style="margin-bottom: 0;">
          <div class="archival-header">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 0.5px 4px; border-radius: 2px;">SOURCE B</span>
            <span class="archival-shelfmark">${s.sourceB.shelfmark}</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.18; color: #000000; margin: 0 0 2px 0;">
            ${s.sourceB.text}
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #475569; border-top: 1px dashed #cbd5e1; padding-top: 1px;">
            ${s.sourceB.provenance}
          </div>
        </div>

        <div class="archival-box" style="margin-bottom: 0;">
          <div class="archival-header">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 0.5px 4px; border-radius: 2px;">SOURCE C</span>
            <span class="archival-shelfmark">${s.sourceC.shelfmark}</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.18; color: #000000; margin: 0 0 2px 0;">
            ${s.sourceC.text}
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #475569; border-top: 1px dashed #cbd5e1; padding-top: 1px;">
            ${s.sourceC.provenance}
          </div>
        </div>
      </div>

      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 2.5px 6px; background: #f8fafc; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
        <strong>Utility Evaluation Strategy (COP Formula):</strong><br>
        &bull; <strong>Content:</strong> What specific factual details do Sources B & C reveal about the enquiry?<br>
        &bull; <strong>Origin & Purpose:</strong> Why was each source created? Who was the author trying to convince?<br>
        &bull; <strong>Context:</strong> Test both sources against your precise historical own knowledge!
      </div>
      `;
    } else if (enq.examType === 'interpretations_16') {
      // Enquiry 4: Interpretations 1 & 2 Plate and Q3b/Q3c Tasks
      const ip = enq.interpretations;
      const iq = enq.interpQuestions;
      versoExamComponentHtml = `
      <!-- Dual Interpretations Plate -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 2px;">
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            ${ip.int1.title}
          </strong>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.18; color: #000000; margin: 0;">
            ${ip.int1.text}
          </p>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            ${ip.int2.title}
          </strong>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.18; color: #000000; margin: 0;">
            ${ip.int2.text}
          </p>
        </div>
      </div>

      <!-- Question 3(b): Difference in Views [4 marks] -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 5px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            &bull; Question 3(b): Difference in Views [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px;">EDEXCEL PAPER 3</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; margin: 0 0 1px 0;">
          ${iq.q3b.stem}
        </p>
        <div class="task-line" style="height: 5.5mm;"></div>
        <div class="task-line" style="height: 5.5mm;"></div>
      </div>

      <!-- Question 3(c): Reasons for Difference [4 marks] -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 5px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            &bull; Question 3(c): Reason for Difference [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px;">EDEXCEL PAPER 3</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; margin: 0 0 1px 0;">
          ${iq.q3c.stem}
        </p>
        <div class="task-line" style="height: 5.5mm;"></div>
        <div class="task-line" style="height: 5.5mm;"></div>
      </div>
      `;
    }

    html += `
  <!-- ====================================================================
       ENQUIRY ${data.keyTopicNum}.${enq.enquiryNum}: PAGES ${leftPageNum}–${rightPageNum}
       ==================================================================== -->
  
  <!-- VERSO PAGE (LEFT): RETRIEVAL DO NOW, VOCABULARY & FORENSIC TASKS -->
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Enquiry Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 800;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.inquiryQuestion}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px; text-transform: uppercase;">
            Key Topic ${data.keyTopicNum}
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333333; margin-top: 1px;">
          <strong>Specification Focus:</strong> ${enq.specAnchor}
        </div>
      </div>

      <!-- 10-Question Retrieval "Do Now" Grid -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; margin-bottom: 2px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            1. Retrieval Recall "Do Now" &bull; Answer in 1–3 words [Target: 10/10]
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

      <!-- Key Disciplinary Vocabulary (Analytical Distinction) -->
      <div class="task-section" style="margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            2. Core Disciplinary Vocabulary <span class="textbook-cite-badge">${enq.vocabRef}</span>
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">HISTORICAL TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #000000; margin: 0 0 1px 0; line-height: 1.18;">
          ${enq.vocabPrompt}
        </p>
        <div class="task-line" style="height: 6.2mm;"></div>
        <div class="task-line" style="height: 6.2mm;"></div>
      </div>

      <!-- Dynamic Verso Bottom Component -->
      ${versoExamComponentHtml}

      ${renderFooterStrip(leftPageNum, footers[leftPageNum - 1], 16)}
    </div>
  </div>

  <!-- RECTO PAGE (RIGHT): EXTENDED EXAM PRACTICE (12m EXPLAIN WHY, 8m UTILITY, OR 16m ESSAY) -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 1px;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 800;">
            ${rx.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
            ${rx.provenance || 'EDEXCEL PAPER 3'}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
          Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${rx.type === 'explain_why_12' ? '12' : rx.type === 'source_utility_8' ? '8' : '20'} ]
        </span>
      </div>

      <!-- Question Stem -->
      <div style="margin: 1px 0 2px 0;">
        <p style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.22;">
          ${rx.stem}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
          <strong>You may use in your answer:</strong>
          <span>&bull; ${rx.stimulus[0]}</span>
          <span>&bull; ${rx.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
      </div>

      <!-- 3-Column Mastery Structure Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;">
        ${rx.structureStrip
          .map(
            (col) => `
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000;">
              ${col.col}
            </strong>
            <span class="textbook-cite-badge">${col.ref}</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #111111; margin: 0; line-height: 1.16;">
            ${col.text}
          </p>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Connectives & Word Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
        <div><strong>Analytical Connectives:</strong> ${rx.connectives}</div>
        <div style="margin-top: 1px;"><strong>Word Bank:</strong> ${rx.wordBank}</div>
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1px solid #000000; border-left: 3px solid #000000; padding: 1.5px 5px; background: #f8fafc; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.18;">
        <strong>Timeline Mission:</strong> ${rx.timelineMission}
      </div>

      <!-- Full-Page Ruled Lines (16 Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; margin-top: 2px;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(rightPageNum, footers[rightPageNum - 1], 16)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 12: CARTOGRAPHIC & ARCHIVAL VISUAL BLUEPRINT (VERSO)
  // ====================================================================
  const bp = data.blueprint;
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
          Master Knowledge Organiser &bull; Key Topic ${data.keyTopicNum}: ${data.title}
        </h2>
      </div>

      <!-- 8 Disciplinary Concepts -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          1. Core Disciplinary Vocabulary &amp; Conceptual Definitions
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.18;">
          ${data.koConcepts
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
            ${data.koDates
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
            ${data.koFigures
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

      <!-- Student PEEL Planning Box -->
      <div style="border: 1px dashed #000000; border-radius: 3px; padding: 2px 6px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
        <strong>Quick PEEL Plan:</strong> Point 1: _____________________ | Point 2: _____________________ | Point 3 (Own Knowledge): _____________________
      </div>

      <!-- 16 Ruled Lines for Timed Writing -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; margin-top: 2px;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(15, footers[14], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER
  // ====================================================================
  const enquiriesRows = data.enquiries.map((enq, idx) => {
    return {
      num: idx + 1,
      title: `Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title}`,
      doNowMax: 10,
      partAMax: enq.examType === 'inference_4' ? 4 : enq.examType === 'utility_8' ? 8 : 4,
      extMax:
        enq.rightExam.type === 'explain_why_12'
          ? 12
          : enq.rightExam.type === 'source_utility_8'
            ? 8
            : 16,
      totalMax:
        enq.rightExam.type === 'explain_why_12'
          ? 26
          : enq.rightExam.type === 'source_utility_8'
            ? 26
            : 30,
    };
  });

  const enquiriesRowsHtml = enquiriesRows
    .map(
      (r) => `
    <tr style="border-bottom: 1px solid #cbd5e1; font-size: 7.2pt;">
      <td style="padding: 2.5px 4px; border-right: 1px solid #cbd5e1; text-align: center; font-weight: 800;">${r.num}</td>
      <td style="padding: 2.5px 6px; border-right: 1px solid #cbd5e1; font-weight: 600;">${r.title}</td>
      <td style="padding: 2.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">[ &nbsp;&nbsp;&nbsp; / ${r.doNowMax} ]</td>
      <td style="padding: 2.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">[ &nbsp;&nbsp;&nbsp; / ${r.partAMax} ]</td>
      <td style="padding: 2.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">[ &nbsp;&nbsp;&nbsp; / ${r.extMax} ]</td>
      <td style="padding: 2.5px 6px; text-align: center; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / ${r.totalMax} ]</td>
    </tr>`,
    )
    .join('');

  // Pearson Edexcel Past Paper Provenance Rows (mapping the 4 enquiries directly to exam series)
  const provenanceRows = data.enquiries.map((enq) => {
    let qTypeA = '';
    let qTypeB = '';
    if (enq.examType === 'inference_4') {
      qTypeA = 'Section A: Q1 Inference [4m]';
      qTypeB = 'Section A: Q2 Causation [12m]';
    } else if (enq.examType === 'forensic_check') {
      qTypeA = 'Section A: Causal Check';
      qTypeB = 'Section A: Q2 Causation [12m]';
    } else if (enq.examType === 'utility_8') {
      qTypeA = 'Section B: Sources B/C COP';
      qTypeB = 'Section B: Q3a Utility [8m]';
    } else {
      qTypeA = 'Section B: Q3b-c Interp [8m]';
      qTypeB = 'Section B: Q3d Essay [16m+4m]';
    }

    return {
      num: enq.enquiryNum,
      focus: `KT ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title.split(':')[0]}`,
      partA: qTypeA,
      partB: qTypeB,
      series: enq.provenance || 'Edexcel Official Series',
    };
  });

  const provenanceRowsHtml = provenanceRows
    .map(
      (r) => `
    <tr style="border-bottom: 1px solid #cbd5e1; font-size: 7.1pt;">
      <td style="padding: 2px 4px; border-right: 1px solid #cbd5e1; text-align: center; font-weight: 800;">${r.num}</td>
      <td style="padding: 2px 6px; border-right: 1px solid #cbd5e1; font-weight: 700;">${r.focus}</td>
      <td style="padding: 2px 4px; border-right: 1px solid #cbd5e1; text-align: center; font-family: monospace; font-size: 6.8pt;">${r.partA}</td>
      <td style="padding: 2px 4px; border-right: 1px solid #cbd5e1; text-align: center; font-family: monospace; font-size: 6.8pt;">${r.partB}</td>
      <td style="padding: 2px 4px; border-right: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a; font-size: 6.8pt;">${r.series}</td>
      <td style="padding: 2px 6px; text-align: center; font-family: monospace; font-size: 6.8pt;">[ &nbsp; / 16 ] &bull; ___/___</td>
    </tr>`,
    )
    .join('');

  // 5 Interactive Digital QR Codes
  const qrCodes = [
    ...data.enquiries.map((enq) => ({
      label: `KT ${data.keyTopicNum}.${enq.enquiryNum}`,
      subLabel: enq.title.slice(0, 16) + '...',
      url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=weimar_nazi_germany&lesson=${enq.id}`,
    })),
    {
      label: `KT ${data.keyTopicNum} Vault`,
      subLabel: 'Master Quizzing',
      url: `https://the-history-revision-hub.netlify.app/?view=revision&unit=weimar_nazi_germany&topic=KT${data.keyTopicNum}`,
    },
  ];

  const qrCardsHtml = qrCodes
    .map((item) => {
      const qrSvg = generateQrSvg(item.url);
      return `
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 3px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
          ${item.label}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
          ${item.subLabel}
        </div>
        <div style="width: 15mm; height: 15mm; margin: 1px auto;">
          ${qrSvg}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 700; color: #000000;">
          20 Questions
        </div>
      </div>`;
    })
    .join('');

  html += `
  <div class="page page-container recto-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Department Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 10.5pt; text-transform: uppercase; color: #000000;">
            <span class="school-brand-target">The History Department</span> &bull; Assessment &amp; Progress Record
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; letter-spacing: 0.5px;">
            KEY TOPIC ${data.keyTopicNum} MASTERY RECORD
          </span>
        </div>
      </div>

      <!-- Pupil Header Card -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
        <div style="flex: 1; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <div style="border-bottom: 1.5px solid #000000; height: 14px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: center; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase;">Target Grade:</span>
          <div style="border: 1.5px solid #000000; width: 36px; height: 20px; margin: 1px auto 0 auto; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10pt;"></div>
        </div>
        <div style="text-align: center; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase;">Class Group:</span>
          <div style="border-bottom: 1.5px solid #000000; width: 65px; height: 14px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: right;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase;">Teacher:</span>
          <div style="border-bottom: 1.5px solid #000000; width: 90px; height: 14px; margin-top: 1px;"></div>
        </div>
      </div>

      <!-- Assessment Progress Ledger Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 3px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 2.5px 4px; width: 24px; text-align: center; font-size: 7.8pt; font-weight: 900; border-right: 1px solid #000000;">#</th>
              <th style="padding: 2.5px 6px; text-align: left; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Enquiry / Lesson Assessment</th>
              <th style="padding: 2.5px 4px; width: 75px; text-align: center; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Do Now (10m)</th>
              <th style="padding: 2.5px 4px; width: 72px; text-align: center; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Part A (4/8m)</th>
              <th style="padding: 2.5px 4px; width: 78px; text-align: center; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Part B (12/16m)</th>
              <th style="padding: 2.5px 6px; width: 80px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            ${enquiriesRowsHtml}
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 2.5px 6px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 7.4pt;">Key Topic ${data.keyTopicNum} Cumulative Assessment Totals</td>
              <td style="padding: 2.5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.2pt;">Do Now: [ <strong>/ 40</strong> ]</td>
              <td style="padding: 2.5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.2pt;">Part A: [ <strong>/ 20</strong> ]</td>
              <td style="padding: 2.5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.2pt;">Part B: [ <strong>/ 52</strong> ]</td>
              <td style="padding: 2.5px 6px; text-align: center; font-size: 8.6pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp; <strong>/ 112</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Past Paper Provenance Index Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 3px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1px solid #000000; background: #e2e8f0; color: #000000;">
              <th colspan="6" style="padding: 2px 6px; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">
                Pearson Edexcel Past Paper Provenance &bull; Completed Exam Year Ledger
              </th>
            </tr>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 2px 4px; width: 24px; text-align: center; font-size: 7.4pt; font-weight: 900; border-right: 1px solid #000000;">#</th>
              <th style="padding: 2px 6px; text-align: left; font-size: 7.3pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Enquiry / Topic Focus</th>
              <th style="padding: 2px 4px; width: 110px; text-align: center; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Section A Question</th>
              <th style="padding: 2px 4px; width: 110px; text-align: center; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Section B Question</th>
              <th style="padding: 2px 4px; width: 125px; text-align: center; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Official Exam Series</th>
              <th style="padding: 2px 6px; width: 75px; text-align: center; font-size: 7.2pt; font-weight: 900; text-transform: uppercase;">Pupil Score</th>
            </tr>
          </thead>
          <tbody>
            ${provenanceRowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 2 lines each at 6.0mm) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2.5px 8px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            Teacher Formative Assessment &bull; WWW / EBI Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222222; font-weight: 700;">
            Effort Grade: [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </span>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
          </div>
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </span>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 1.5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ___/___/2026</span>
        </div>
      </div>

      <!-- Interactive Quizzing & Revision QR Hub -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2.5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; color: #000000;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant 20-Question Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; font-weight: 700;">
            Scan with smartphone camera to launch live self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; text-align: center;">
          ${qrCardsHtml}
        </div>
      </div>

      ${renderFooterStrip(16, footers[15], 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

// PDF Compiler Helper with Automated Space Audit
async function compilePdf(htmlPath, pdfPath, v17Path) {
  const browser = await puppeteer.launch({
    headless: 'new',
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

  await browser.close();
}

async function main() {
  const target = process.argv[2] || 'all';
  const targets = target === 'all' ? ['KT1', 'KT2', 'KT3', 'KT4'] : [target.toUpperCase()];

  console.log('======================================================');
  console.log(`🏰 Weimar & Nazi Germany 16-Page Workbook Engine`);
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
    console.log(`🖨️ Compiling PDF with Puppeteer...`);
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
