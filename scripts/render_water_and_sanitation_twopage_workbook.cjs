/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/water_and_sanitation (KS3 Year 7: Water & Sanitation Through Time)
 * Output: public/units/water_and_sanitation/pupil_workbook.html
 * PDF:    public/pdfs/water_and_sanitation_pupil_workbook.pdf
 *
 * Gold Standard Publisher Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Christine Counsell Gold Standard)
 * - 100% Institutional Neutrality (Zero School / Teacher Name Identifiers)
 * - Page 1: Master Front Cover with photo frame, pupil info card, and syllabus overview
 * - Pages 2–3: Living Unit Timeline (6 Milestones across 2 pages with sketch challenges)
 * - Pages 4–15: 6 Double-Page Enquiry Spreads:
 *     Left Page (Verso): 5-Stage Chronological Inquiry Spine (44mm trigger spine with 3 Spec-Anchored Triad bullets + 6 ruled note-taking lines)
 *     Right Page (Recto): Part B Disciplinary Extended Writing (Tariff, Question Stem & Stimulus, 3-Column Evaluative Structure Strip,
 *                         Word Bank, Structural Analytical Connectives, Timeline Mission, 20-22 Ruled Handwriting Lines, Footer Strip)
 * - Page 16: Outside Back Cover (Student Assessment Record, WWW/EBI Feedback Lines, QR Revision Hub)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { renderKs3BackCover } = require('./components/render_standard_cover.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Data file not found:', dataPath);
  process.exit(1);
}

// Load data safely
const imported = require(dataPath);
const unitData = imported.water_and_sanitation || imported.default || imported;

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Water & Sanitation lessons for 16-Page Pupil Workbook.`);

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

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

// 6 Enquiry Configurations Aligned with the 5-Block Standard
const lessonConfigs = lessons.map((l, idx) => {
  const lessonNum = idx + 1;
  const wbStages = l.workbook_stages || [];
  const primaryTask = (l.tasks && l.tasks[0]) || {};
  const scaffolding = primaryTask.scaffolding || {};

  return {
    lessonNum,
    id: l.id,
    title: `Enquiry ${lessonNum}: ${l.title}`,
    enquiryQuestion: l.enquiry || l.title,
    stages: wbStages,
    rightPage: {
      type: 'single_12',
      tariff: primaryTask.topic || 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        primaryTask.question ||
        `Explain why public health transformed in Lesson ${lessonNum}. [12 marks]`,
      stimulus: primaryTask.stimulus || ['Key historical trigger 1', 'Key historical factor 2'],
      structureStrip: scaffolding.structure_strip
        ? scaffolding.structure_strip.map((s) => ({
            col: s.col || 'ANALYSIS',
            text: s.prompt || '',
          }))
        : [
            {
              col: '1. CATALYST & CONTEXT',
              text: 'Analyse the immediate historical catalyst and early developments.',
            },
            {
              col: '2. CORE FACTOR',
              text: 'Examine the central turning point, resistance, and key evidence.',
            },
            {
              col: '3. HISTORICAL VERDICT',
              text: 'Evaluate long-term significance and reach a sustained comparative verdict.',
            },
          ],
      connectives:
        'The primary catalyst explaining why... was... &bull; Specifically, this meant that... &bull; In particular, this was demonstrated when... &bull; On the other hand, a decisive underlying factor was... &bull; Consequently, this reveals that... &bull; Ultimately, the decisive reason was... because...',
      wordBank: l.vocabulary
        ? l.vocabulary.map((v) => v.term).join(' &bull; ')
        : 'Aqueduct &bull; Cloaca &bull; Thermae &bull; Miasma &bull; Cesspit',
      timelineMissionTitle: `Centrefold Sketch Challenge ${lessonNum}`,
      timelineMission: `Turn to Pages 2–3 (Milestone ${lessonNum}). Complete the dual-coding sketch challenge in the timeline sketchpad.`,
    },
    leftPageQuip:
      l.did_you_know ||
      'Clean water is not an accident of nature; it is a triumph of engineering and public health.',
    rightPageQuip:
      'Connectives turn facts into explanations: Consequently, As a result, Because of this, Ultimately...',
  };
});

// Refined quips
lessonConfigs[0].leftPageQuip =
  'Roman lead pipes at Fishbourne carried spring water under gravity pressure to garden fountains.';
lessonConfigs[0].rightPageQuip =
  'Victorian historians believed Romans built baths for health; modern historians emphasize imperial power.';

lessonConfigs[1].leftPageQuip =
  'Medieval monks drank spring water filtered through five settling tanks while townspeople drank from rivers.';
lessonConfigs[1].rightPageQuip =
  'The 1388 Statute of Cambridge banned dumping animal dung and offal into rivers under heavy royal fines.';

lessonConfigs[2].leftPageQuip =
  'Sir John Harington invented the flush toilet in 1596, but towns lacked running water mains to make it work.';
lessonConfigs[2].rightPageQuip =
  'Samuel Pepys recorded stepping into his cellar in October 1660 to find his neighbour’s cesspit had leaked through.';

lessonConfigs[3].leftPageQuip =
  'Edwin Chadwick proved in 1842 that industrial labourers in Manchester died at an average age of just 17.';
lessonConfigs[3].rightPageQuip =
  "Victorian ratepayers resisted taxes for sewers under the philosophy of laissez-faire ('leave alone').";

lessonConfigs[4].leftPageQuip =
  'Michael Faraday warned in 1855 that the Thames was an opaque, fermenting sewer of human waste.';
lessonConfigs[4].rightPageQuip =
  'Joseph Bazalgette built 82 miles of brick intercepting sewers that still keep London healthy today.';

lessonConfigs[5].leftPageQuip =
  'Dr John Snow proved cholera was water-borne by mapping 616 deaths around the Broad Street pump in Soho.';
lessonConfigs[5].rightPageQuip =
  'Robert Koch isolated the Vibrio cholerae bacterium under the microscope in 1884, confirming Snow’s theory.';

function renderFooterStrip(pageNum, quip, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// LEFT PAGE: 5-Stage Chronological Inquiry Spine
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
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

      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step}
              </span>
              ${st.paraRef ? `<span style="background: #222222; color: #ffffff; border: 1px solid #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">${st.paraRef}</span>` : ''}
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.date}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 9.2pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines -->
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

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 7 &bull; WATER &amp; SANITATION THROUGH TIME
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13.0pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// RIGHT PAGE: Disciplinary Skills Extended Writing
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EXTENDED DISCIPLINARY WRITING -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 11.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.32;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #000000;">
          <strong style="color: #000000;">Stimulus:</strong>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Evaluative Structure Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
        ${rp.structureStrip
          .map(
            (col) => `
          <div style="border-right: 1px solid #000000; padding-right: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">${col.col}</div>
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.18; color: #000000; margin-top: 1px;">${col.text}</div>
          </div>`,
          )
          .join('')}
      </div>

      <!-- Word Bank & Connectives Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 8.0pt; line-height: 1.24;">
        <div style="margin-bottom: 2px;">
          <strong style="text-transform: uppercase; font-size: 7.2pt; color: #000000;">Key Terms:</strong>
          <span style="color: #000000; font-weight: 700;">${rp.wordBank}</span>
        </div>
        <div>
          <strong style="text-transform: uppercase; font-size: 7.2pt; color: #000000;">Analytical Connectives:</strong>
          <span style="font-style: italic; color: #000000;">${rp.connectives}</span>
        </div>
      </div>

      <!-- Centrefold Sketch Mission Box -->
      <div style="border: 1.2px dashed #000000; border-radius: 3px; padding: 3px 7px; background: #ffffff; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; flex-shrink: 0;">
          Timeline Mission
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2; color: #000000;">
          ${rp.timelineMission}
        </span>
      </div>

      <!-- Ruled Handwriting Lines (Standard 8.8mm Pitch) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        ${Array.from({ length: 21 })
          .map(
            () =>
              `<div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>`,
          )
          .join('')}
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
}

// Master HTML Renderer
function generateWorkbookHtml() {
  const qrSvg = generateQrSvg('https://revision-hub.netlify.app/?unit=water_and_sanitation');
  const coverImageB64 = getBase64Image('/images/john_snow_cholera_map.jpg');

  let pagesHtml = '';

  // PAGE 1: Front Cover
  pagesHtml += `
  <!-- PAGE 1: FRONT COVER -->
  <div class="page page-container recto-page" id="page-1" style="padding: 10mm 12mm;">
    <div class="page-body-full" style="justify-content: space-between; border: 3px solid #000000; padding: 8mm 9mm; box-sizing: border-box;">
      
      <!-- Top Title Block -->
      <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 4mm;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3mm;">
          <span style="font-family: 'Inter', sans-serif; font-size: 9.0pt; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; background: #000000; color: #ffffff; padding: 2px 10px; border-radius: 2px;">
            KEY STAGE 3 &bull; YEAR 7 NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 9.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #000000;">
            THE HISTORY DEPARTMENT
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; font-weight: 900; line-height: 1.1; margin: 2mm 0; color: #000000; text-transform: uppercase; letter-spacing: 0.5px;">
          Water &amp; Sanitation<br><span style="font-size: 20pt; font-weight: 700;">Through Time</span>
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 11pt; font-style: italic; color: #000000; margin-top: 1mm;">
          Why did it take two thousand years to clean up Britain?
        </div>
      </div>

      <!-- Photo Frame with Border -->
      <div style="flex: 1; margin: 4mm 0; border: 2px solid #000000; border-radius: 2px; overflow: hidden; max-height: 115mm; display: flex; align-items: center; justify-content: center; background: #ffffff;">
        <img src="${coverImageB64}" style="width: 100%; height: 100%; object-fit: cover;" alt="John Snow Cholera Spot Map">
      </div>

      <!-- Pupil Details & Information Box -->
      <div style="border: 2px solid #000000; border-radius: 2px; padding: 4mm 6mm; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 2mm;">
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #000000; border-bottom: 1.5px solid #000000; padding-bottom: 1.5mm;">
            <strong>Pupil Name:</strong> ___________________________________
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #000000; border-bottom: 1.5px solid #000000; padding-bottom: 1.5mm;">
            <strong>Teaching Group:</strong> ___________________________
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm;">
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #000000; border-bottom: 1.5px solid #000000; padding-bottom: 1.5mm;">
            <strong>Teacher:</strong> ________________________________________
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #000000; border-bottom: 1.5px solid #000000; padding-bottom: 1.5mm;">
            <strong>Target Grade:</strong> ___________
          </div>
        </div>
      </div>

      ${renderFooterStrip(1, 'The History Department &bull; Key Stage 3 History Revision Hub', 16)}
    </div>
  </div>`;

  // PAGES 2–3: Living Unit Timeline Centrefold
  pagesHtml += `
  <!-- PAGES 2–3: LIVING TIMELINE (6 MILESTONES ACROSS SPREAD) -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0; font-weight: 900; text-transform: uppercase;">
          Living Unit Timeline &bull; Part 1 (c.AD 43–1665)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Chronology &bull; Dual-Coding
        </span>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        ${[
          {
            num: 1,
            date: 'c.AD 75',
            title: 'Roman Aqueducts & Fishbourne Lead Pipes',
            desc: 'Romans construct monumental gravity-fed aqueducts, thermae, and jointed lead pipes at Fishbourne Palace.',
            prompt: 'Draw stone aqueduct arches with water flowing into lead pipes',
          },
          {
            num: 2,
            date: 'c.1165',
            title: 'Canterbury Monastic Conduits & Settling Tanks',
            desc: 'Monk Wibert designs five settling tanks and lead conduits to bring filtered spring water to Christ Church Priory.',
            prompt: 'Draw five settling tanks filtering mud and sand',
          },
          {
            num: 3,
            date: '1596',
            title: 'Sir John Harington: The Flush Toilet',
            desc: 'Elizabeth I’s godson invents the world’s first valve-operated flushing water closet, though lack of running water prevents wide adoption.',
            prompt: 'Draw an overhead cistern with a pull lever flushing into a pan',
          },
        ]
          .map(
            (m) => `
          <div style="border: 1.4px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px;">Milestone ${m.num} &bull; ${m.date}</span>
              <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #000000;">${m.title}</strong>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.8pt; line-height: 1.22; color: #000000; margin-bottom: 3px;">${m.desc}</div>
            <div style="border: 1px dashed #000000; border-radius: 2px; height: 38mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #555;">Dual-Coding Sketchpad: ${m.prompt}</span>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, 'Living Chronology: Track turning points and technological milestones', 16)}
    </div>
  </div>

  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0; font-weight: 900; text-transform: uppercase;">
          Living Unit Timeline &bull; Part 2 (1831–Present)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Chronology &bull; Dual-Coding
        </span>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        ${[
          {
            num: 4,
            date: '1831–1842',
            title: 'Asiatic Cholera & Chadwick’s 1842 Report',
            desc: 'Cholera sweeps through industrial boomtowns; Edwin Chadwick proves squalor causes preventable poverty.',
            prompt: 'Draw back-to-back terraced houses and a shared privy midden',
          },
          {
            num: 5,
            date: '1858–1865',
            title: 'The Great Stink & Bazalgette’s Sewers',
            desc: 'A boiling heatwave turns the Thames into an unbearable sewer, driving MPs to fund 82 miles of brick intercepting sewers.',
            prompt: 'Draw an egg-shaped brick underground sewer tunnel with flowing water',
          },
          {
            num: 6,
            date: '1854–1884',
            title: 'John Snow, Germ Theory & Robert Koch',
            desc: 'Dr John Snow removes the Broad Street pump handle, Pasteur proves Germ Theory, and Koch isolates Vibrio cholerae.',
            prompt: 'Draw a street pump with handle removed and a cholera spot map',
          },
        ]
          .map(
            (m) => `
          <div style="border: 1.4px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px;">Milestone ${m.num} &bull; ${m.date}</span>
              <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #000000;">${m.title}</strong>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.8pt; line-height: 1.22; color: #000000; margin-bottom: 3px;">${m.desc}</div>
            <div style="border: 1px dashed #000000; border-radius: 2px; height: 38mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #555;">Dual-Coding Sketchpad: ${m.prompt}</span>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, 'From industrial squalor to modern microbiology and compulsory public health', 16)}
    </div>
  </div>`;

  // PAGES 4–15: 6 Double-Page Enquiry Spreads
  lessonConfigs.forEach((cfg, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpinePage(cfg, leftPageNum);
    pagesHtml += renderRightPage(cfg, rightPageNum);
  });

  // PAGE 16: Standard Outside Back Cover
  pagesHtml += renderKs3BackCover(16, qrSvg);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Water &amp; Sanitation Through Time (KS3 Year 7 Pupil Workbook)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Georgia:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 10mm 8mm;
    }
    body {
      font-family: 'Georgia', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    .page-container {
      width: 210mm;
      height: 297mm;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .page-footer-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1.2px solid #000000;
      padding-top: 1.5mm;
      margin-top: 2mm;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 900;
      background: #000000;
      color: #ffffff;
      padding: 1px 6px;
      border-radius: 2px;
      font-size: 7.2pt;
    }
    .footer-quip {
      font-style: italic;
      color: #333333;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page-container { page-break-after: always !important; }
    }
  </style>
</head>
<body>
${pagesHtml}
</body>
</html>`;
}

// Execution
(async () => {
  const html = generateWorkbookHtml();

  const publicHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'water_and_sanitation',
    'pupil_workbook.html',
  );
  const unitsHtmlPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'pupil_workbook.html');
  const canonicalPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'water_and_sanitation_pupil_workbook.pdf',
  );
  const v2PdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'water_and_sanitation_pupil_workbook_V2.pdf',
  );
  const finalV17PdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'water_and_sanitation_pupil_workbook_FINAL_V17.pdf',
  );

  fs.mkdirSync(path.dirname(publicHtmlPath), { recursive: true });
  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(unitsHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${publicHtmlPath}`);
  console.log(`[OK] HTML mirrored to: ${unitsHtmlPath}`);

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : undefined),
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(require('url').pathToFileURL(publicHtmlPath).href, {
    waitUntil: 'networkidle0',
    timeout: 120000,
  });

  await page.pdf({
    path: canonicalPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  await browser.close();

  // Mirror PDF aliases
  fs.copyFileSync(canonicalPdfPath, v2PdfPath);
  fs.copyFileSync(canonicalPdfPath, finalV17PdfPath);
  console.log(`[OK] Single canonical PDF compiled: ${canonicalPdfPath}`);
  console.log(
    `[OK] Mirrored to aliases: ${path.basename(v2PdfPath)}, ${path.basename(finalV17PdfPath)}`,
  );
})();
