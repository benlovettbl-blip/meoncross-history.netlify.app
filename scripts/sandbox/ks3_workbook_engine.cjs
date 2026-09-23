/**
 * History Revision Hub — Universal KS3 Declarative Workbook Engine (Sandbox Pilot)
 *
 * Architecture:
 * - Pure data-driven template engine for all Key Stage 3 2-page spread workbooks.
 * - Dynamic Space Budgeting: Automates ruled line calculation via flexbox clientHeight.
 * - Zero AI Fluff: Guarantees authentic academic/archival headers and structured disciplinary pedagogy.
 * - Single Source of Truth: Uses standard Front Cover, Living Timeline, and KS3 Back Cover components.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { renderKs3BackCover, generateQrSvg } = require('../components/render_standard_cover.cjs');
const { getThematicStrandsForUnit } = require('../../src/curriculum_strands.js');

const ROOT_DIR = path.join(__dirname, '..', '..');

/**
 * Image helper (base64 data URI)
 */
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
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

/**
 * Universal Enquiry Property Normalizer
 * Standardizes enquiry question access across KS3 unit configurations (enquiryQuestion, inquiryQuestion, question, title)
 */
function getEnquiryQuestion(l) {
  if (!l) return '';
  const raw = l.enquiryQuestion || l.inquiryQuestion || l.question || l.title || '';
  return raw.replace(/^Enquiry:\s*/i, '').trim();
}

/**
 * Builds the complete Master HTML for any KS3 Unit
 */
function buildKs3WorkbookHtml(unitConfig) {
  const {
    unitId,
    unitTitle,
    yearGroup = 'Year 8',
    overarchingEnquiry,
    coverImage,
    coverPlate = {},
    syllabus = [],
    milestones = [],
    lessons = [],
    quips = [],
    pageHeight = '256mm',
    pageMargin = '10mm 12mm 10mm 12mm',
  } = unitConfig;

  const totalPages = lessons.length * 2 + 4; // Cover (1) + Timeline (2-3) + Spreads (lessons*2) + Back Cover (1)
  const coverImgData = getBase64Image(coverImage);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Portal • KS3 ${unitTitle} Pupil Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Georgia:ital@0;1&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: ${pageMargin};
    }
    *, *:before, *:after { box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page, .page-container {
      width: 100%;
      height: ${pageHeight};
      max-height: ${pageHeight};
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      background: #ffffff;
      box-sizing: border-box;
      position: relative;
    }
    .verso-page, .recto-page {
      padding: 3mm 0 5mm 0;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .task-line {
      height: 7.8mm;
      border-bottom: 1.4px solid #0f172a;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      height: 5.4mm;
      border-bottom: 1.2px dotted #0f172a;
      box-sizing: border-box;
      margin: 0;
    }
    .badge {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1.2px solid #0f172a;
      padding: 1.5px 6px;
      border-radius: 2px;
      background: #f8fafc;
      color: #0f172a;
    }
    /* Auto-fill flex container for zero-underflow ruled lines */
    .auto-lines-target {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 0;
      overflow: hidden;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
  </style>
</head>
<body>
`;

  const thematicStrands =
    unitConfig.thematicStrands && unitConfig.thematicStrands.length > 0
      ? unitConfig.thematicStrands
      : getThematicStrandsForUnit(unitId);

  const hubUrl =
    unitConfig.hubUrl || `https://the-history-revision-hub.netlify.app/?unit=${unitId}`;
  const microQrSvg = generateQrSvg(hubUrl);

  // ==========================================
  // PAGE 1: FRONT COVER
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 14px 16px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 3px;" data-department-name="The History Department">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #0f172a;">The History Department</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #475569;">Key Stage 3 History • ${yearGroup} Workbook</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #cbd5e1; padding-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #1e3a8a;">UNIT: ${unitTitle.toUpperCase()}</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #64748b;">DEPARTMENTAL STANDARD EDITION</span>
          </div>
        </div>

        <div style="border: 1.8px solid #0f172a; border-radius: 4px; padding: 4px 8px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
              ${yearGroup} Enquiry
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155;">
              ${unitConfig.subtitle || 'Global Encounters, Reformation, Civil War & The Transatlantic Slave Trade'}
            </span>
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 15pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #0f172a;">
            ${unitTitle.toUpperCase()}
          </h1>
          <div style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #1e293b; font-style: italic; line-height: 1.25;">
            Overarching Enquiry: “${overarchingEnquiry}”
          </div>
        </div>

        <!-- Hero Photo Plate (Full Uncropped Primary Source Presentation) -->
        <div style="border: 1.8px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px; display: flex; flex-direction: column;">
          <div style="height: 52mm; background: #0f172a; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 2px 0;">
            <img src="${coverImgData}" alt="Cover Image" style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;">
          </div>
          <div style="border-top: 1.5px solid #0f172a; padding: 2px 8px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #1e3a8a;">
                ${coverPlate.tag || 'Primary Historical Source'}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #0f172a; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
                ${coverPlate.shelfmark || 'HISTORICAL ARCHIVE'}
              </span>
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; line-height: 1.15; margin: 1px 0; color: #0f172a;">
              ${coverPlate.title || 'Primary Source Evidence'}
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #334155; line-height: 1.18;">
              ${coverPlate.description || ''}
            </div>
          </div>
        </div>

        <!-- Pupil Information Card with Micro QR Code -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 3px 8px 3px 10px; background: #ffffff; margin-bottom: 3px; display: flex; align-items: center; gap: 10px;">
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.8px; color: #0f172a;">
                Pupil Workbook &amp; Academic Record
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #64748b;">
                ${yearGroup} History • ${unitConfig.termCode || 'Unit 2'}
              </span>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr 1.2fr 1fr; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
              <div style="display: flex; align-items: baseline;">
                <strong style="text-transform: uppercase; width: 44px; font-size: 7pt; color: #0f172a;">Name:</strong>
                <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 12px;"></div>
              </div>
              <div style="display: flex; align-items: baseline;">
                <strong style="text-transform: uppercase; width: 40px; font-size: 7pt; color: #0f172a;">Class:</strong>
                <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 12px;"></div>
              </div>
              <div style="display: flex; align-items: baseline;">
                <strong style="text-transform: uppercase; width: 50px; font-size: 7pt; color: #0f172a;">Teacher:</strong>
                <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 12px;"></div>
              </div>
              <div style="display: flex; align-items: baseline;">
                <strong style="text-transform: uppercase; width: 42px; font-size: 7pt; color: #0f172a;">Target:</strong>
                <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 12px;"></div>
              </div>
            </div>
          </div>
          <!-- Micro QR Hub Badge -->
          <div style="border-left: 1px solid #cbd5e1; padding-left: 8px; display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <div style="width: 32px; height: 32px; flex-shrink: 0; border: 1px solid #0f172a; border-radius: 2px; padding: 1px; background: #ffffff;">
              ${microQrSvg}
            </div>
            <div style="font-family: 'Inter', sans-serif; text-align: left; line-height: 1.15;">
              <span style="display: block; font-size: 5.8pt; font-weight: 900; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.3px;">Revision Hub</span>
              <span style="display: block; font-size: 5.0pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Scan To Launch</span>
            </div>
          </div>
        </div>

        <!-- The 8 Historical Enquiries (GCSE Specification-Style Curriculum Roadmap) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px;">
          <div style="background: #0f172a; color: #ffffff; padding: 2.5px 10px; font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
            <span>The 8 Historical Enquiries Across This Unit &bull; Knowledge Checklist</span>
            <span style="font-size: 6.8pt; letter-spacing: 0.5px; color: #94a3b8;">Curriculum Progression &bull; 1450–1750</span>
          </div>
          <div style="padding: 4px 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5px 8px; font-family: 'Inter', sans-serif; background: #ffffff;">
            ${lessons
              .map((l, idx) => {
                const cleanEnquiry = getEnquiryQuestion(l);
                const bullets =
                  l.specBullets && l.specBullets.length > 0
                    ? l.specBullets
                    : l.syllabusTopic
                      ? l.syllabusTopic.split(/,\s*|\.\s*/).filter(Boolean)
                      : [];
                return `
              <div style="border: 1px solid #cbd5e1; border-left: 3px solid ${idx < 4 ? '#1e3a8a' : '#0369a1'}; border-radius: 3px; padding: 3px 5px; background: ${idx % 2 === 0 ? '#f8fafc' : '#ffffff'}; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="margin-bottom: 1.5px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                    <span style="background: ${idx < 4 ? '#1e3a8a' : '#0369a1'}; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY ${idx + 1}</span>
                    <span style="display: inline-flex; align-items: center; gap: 3px; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.3px;">
                      <span>AUDIT</span>
                      <span style="width: 10.5px; height: 10.5px; border: 1.3px solid #0f172a; border-radius: 2px; background: #ffffff; display: inline-block;"></span>
                    </span>
                  </div>
                  <strong style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f172a; line-height: 1.18; display: block; margin-bottom: 2px;">
                    ${cleanEnquiry}
                  </strong>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #334155; line-height: 1.2; padding-left: 2px;">
                  ${bullets.map((b) => `<div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 6.0pt;">&bull;</span><span>${b.trim()}</span></div>`).join('')}
                </div>
              </div>
              `;
              })
              .join('')}
          </div>
        </div>

        <!-- Lower Section: Pupil-Friendly "How to Write Like a Historian" + "The Big Storylines" -->
        <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 6px; margin-bottom: 3px;">
          <!-- Left Box: How to Write Like a Historian (Pupil-Friendly Literacy Toolkit) -->
          <div style="border: 1.4px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff;">
            <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
              <span>How to Write Like a Historian</span>
              <span style="color: #94a3b8; font-size: 6.4pt;">4 Golden Rules &amp; Connectives</span>
            </div>
            <div style="padding: 4px 7px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div>
                <strong style="color: #1e3a8a; text-transform: uppercase; font-size: 6.6pt;">The 4 Golden Rules of Extended Writing:</strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 5px; margin-top: 1px; font-size: 6.5pt; color: #334155;">
                  <span><strong>1. Direct Thesis:</strong> Clear answer in sentence 1.</span>
                  <span><strong>2. Specific Evidence:</strong> Names, dates, acts &amp; data.</span>
                  <span><strong>3. Causal Mechanics:</strong> Explain <em>why</em> &amp; <em>how</em>.</span>
                  <span><strong>4. Evaluative Balance:</strong> Weighted judgement.</span>
                </div>
              </div>
              <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; margin-top: 1px;">
                <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.6pt;">High-Impact Analytical Connectives:</strong>
                <div style="font-size: 6.4pt; color: #475569; line-height: 1.22; margin-top: 1px;">
                  <strong style="color: #0f172a;">Causation:</strong> <em>Consequently &bull; Precipitated by &bull; Directly resulted in</em><br>
                  <strong style="color: #0f172a;">Nuance &amp; Evaluation:</strong> <em>Conversely &bull; While ostensibly... in reality &bull; Decisively</em>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Box: Thematic Strands (Single Source of Truth across Schemes of Work) -->
          <div style="border: 1.4px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff;">
            <div style="background: #1e3a8a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
              <span>The ${thematicStrands.length} Big Storylines to Track</span>
              <span style="color: #bfdbfe; font-size: 6.4pt;">Core Historical Themes</span>
            </div>
            <div style="padding: 4px 7px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              ${thematicStrands
                .map(
                  (strand, sIdx) => `
              <div>
                <strong style="color: ${strand.color || '#1e3a8a'};">${sIdx + 1}. ${strand.title}:</strong> <span style="color: #475569;">${strand.trajectory}</span>
              </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Page 1 Footer Strip -->
      <div style="border-top: 1.2px solid #0f172a; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569;">
        <span><strong>Term:</strong> ${unitConfig.termName || 'Spring Term • ' + yearGroup + ' History'}</span>
        <span style="font-style: italic; color: #64748b;">Permanent Academic Record &bull; Retain for Synoptic Revision</span>
        <span><strong>Edition:</strong> 2026.1 Publisher Standard</span>
      </div>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 2 & 3: LIVING TIMELINE (SPOKE MILESTONES)
  // ==========================================
  const half = Math.ceil(milestones.length / 2);
  const page2Milestones = milestones.slice(0, half);
  const page3Milestones = milestones.slice(half);

  [page2Milestones, page3Milestones].forEach((mList, pIdx) => {
    const pNum = pIdx + 2;
    const isP2 = pIdx === 0;
    const timelinePartTitle = isP2
      ? unitConfig.timelinePart1Title ||
        'Living Unit Timeline • Part 1: Global Encounter & Religious Crisis (1450–1605)'
      : unitConfig.timelinePart2Title ||
        'Living Unit Timeline • Part 2: Civil War, Finance & Enslaved Resistance (1642–1739)';
    const spineFacing = isP2
      ? 'Chronological Spine • Facing Left'
      : 'Chronological Spine • Facing Right';

    html += `
  <div class="page page-container ${isP2 ? 'verso-page' : 'recto-page'}" id="page-${pNum}" style="padding: 10px 14px; display: flex; flex-direction: column; height: 256mm; justify-content: space-between; box-sizing: border-box;">
    <div>
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          ${timelinePartTitle}
        </h2>
        <span class="badge" style="background: #1e3a8a; color: #ffffff; border-color: #1e3a8a; font-size: 6.8pt; padding: 1.5px 6px;">Pages 2–3 Facing Spread</span>
      </div>
      <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between;">
        <span><strong>Timeline Mission:</strong> In each lesson, turn back to this double-page spread to illustrate the milestone sketchpad with your visual symbol and key notes.</span>
        <span style="font-weight: 700; color: #1e3a8a;">${spineFacing}</span>
      </div>
    </div>

    <!-- Milestones Container -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 2px 0;">
      ${mList
        .map(
          (m) => `
        <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">${m.date}</span>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">${m.title}</strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">${m.lesson}</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
            ${m.summary}
          </p>
          <!-- Open Visual Dual-Coding Canvas (Unboxed, freeform sketching & concept mapping) -->
          <div style="flex: 1; min-height: 26mm; display: flex; flex-direction: column; justify-content: space-between; padding: 4px 2px 2px 2px; border-top: 1px dashed #cbd5e1; margin-top: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-style: italic; font-weight: 600;">
                ${m.sketchPrompt || '✎ Visual Dual-Coding: Sketch key symbol, causal link, or concept diagram:'}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #1e3a8a;">
                ${m.exactDate || m.date} &bull; ${m.keyTerm || ''}
              </span>
            </div>
            <!-- Completely unboxed free canvas for student drawing, arrows, and dual-coding -->
            <div style="flex: 1;"></div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <!-- Bottom Synthesis Box (Facing Spread Guidance) -->
    <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 3px 8px; background: #eff6ff; display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
      <span style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #1e3a8a;">
        <strong>Timeline Check:</strong> ${
          isP2
            ? unitConfig.timelineCheckP2 ||
              'Why did the fall of Constantinople in 1453 force European crowns out onto the Atlantic Ocean?'
            : unitConfig.timelineCheckP3 ||
              'How did the wealth generated by Atlantic trade and the 1688 financial settlement transform Britain into a global superpower?'
        }
      </span>
      <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #0f172a; white-space: nowrap; margin-left: 8px;">
        ${isP2 ? 'See Milestone 5 Facing Right &rarr;' : 'Turn overleaf for Lesson 1 (Pages 4–5) &rarr;'}
      </span>
    </div>

    <!-- Footer Strip -->
    <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px;">
      <span>The History Department &bull; ${unitTitle} &bull; Living Chronology</span>
      <span>Page ${pNum} (${isP2 ? 'Facing Spread Left' : 'Facing Spread Right'})</span>
    </div>
  </div>
`;
  });

  // ==========================================
  // PAGES 4+ : DOUBLE-PAGE ENQUIRY SPREADS
  // ==========================================
  lessons.forEach((l, idx) => {
    const leftPageNum = idx * 2 + 4;
    const rightPageNum = idx * 2 + 5;
    const cleanEnquiry = getEnquiryQuestion(l);

    // LEFT PAGE (VERSO): Do Now, Vocab, Task 3 Dual-Column Extraction
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; font-weight: 800;">
              KS3 ${unitTitle.toUpperCase()} &bull; LESSON ${idx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
              Enquiry ${idx + 1}: ${cleanEnquiry}
            </h2>
          </div>
          <span class="badge">${l.skill || 'Historical Analysis'}</span>
        </div>

        <!-- Core Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #334155; line-height: 1.3;">
            ${(l.objectives && l.objectives.length > 0
              ? l.objectives
              : [
                  'Explain the historical context, global geopolitical shifts, and competing perspectives of this enquiry.',
                  'Deploy precise factual evidence to analyse cause, consequence, or second-order significance.',
                  'Formulate an independent, evaluative historical judgement supported by causal reasoning.',
                ]
            )
              .map((o) => `<li>${o}</li>`)
              .join('')}
          </ul>
        </div>

        <!-- Task 1: Do Now Recall Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 1: 'Do Now' Retrieval Practice</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px;">
            ${(l.doNow || [])
              .map(
                (dn, qIdx) => `
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
                  <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${dn.q}
                </div>
                <div>
                  <div class="task-line" style="height: 5.4mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 5.4mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Task 2: Core Disciplinary Vocabulary Container -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Task 2: Core Disciplinary Vocabulary</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #64748b;">Historical Literacy</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 2px; line-height: 1.2;">
            ${l.vocabPrompt || (l.vocabTask && l.vocabTask.prompt) || l.vocabTask || ''}
          </div>
          <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
          <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
        </div>
      </div>

      <!-- Task 3: Dual-Column Extraction & Argument Workspace -->
      <div style="border: 1.4px solid #0f172a; border-radius: 4px; padding: 4px 8px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 2px; min-height: 0;">
        <!-- Grouped Header + Instruction + Dual Columns (Tucked directly underneath first line) -->
        <div>
          <div style="border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a; text-transform: uppercase;">
              ${l.bridgeTask?.title ? l.bridgeTask.title.replace(/\[.*?\]\s*/g, '') : 'Task 3: Dual-Column Knowledge Extraction'}
            </strong>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; margin-bottom: 3px;">
            ${(
              l.bridgeTask?.instruction ||
              'Extract 3 key pieces of factual evidence into each column, then develop your argument below:'
            ).replace(/then synthesise below:?/gi, 'then develop your argument below:')}
          </div>

          <!-- Dual Evidence Columns (Moved UP directly under instruction line) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 3px;">
            <!-- Left Column (Blue) -->
            <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #0369a1; border-radius: 4px; padding: 4px 7px 5px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
                ${l.bridgeTask?.col1Title || 'Column 1 Evidence'}
              </strong>
              <div style="display: flex; flex-direction: column; gap: 3px;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1;">Point 1:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1;">Point 2:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1;">Point 3:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
              </div>
            </div>

            <!-- Right Column (Crimson) -->
            <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 4px 7px 5px 7px; background: #fffaf0;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #b91c1c; display: block; border-bottom: 1px solid #fecaca; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
                ${l.bridgeTask?.col2Title || 'Column 2 Evidence'}
              </strong>
              <div style="display: flex; flex-direction: column; gap: 3px;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #b91c1c;">Point 1:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #b91c1c;">Point 2:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #b91c1c;">Point 3:</strong>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                  <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Task 3 Argument Box with Ruled Lines (Accessible Year 8 Language, 0 Synthesis Jargon) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
            ✍️ Task 3: Developing Your Argument: ${(
              l.bridgeTask?.synthesisPrompt ||
              'Combine your findings into a reasoned historical argument:'
            )
              .replace(/^Synthesise\s+whether\s+/i, 'Explain whether ')
              .replace(/^Synthesise\s+how\s+/i, 'Explain how ')
              .replace(/^Synthesise\s+why\s+/i, 'Explain why ')
              .replace(/^Synthesise\s+the\s+/i, 'Explain the ')
              .replace(/^Synthesise\s+/i, 'Explain ')
              .replace(/synthesis/gi, 'argument')}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
            <div class="task-line" style="height: 6.0mm; border-bottom: 1.5px solid #0f172a; margin-top: 1px;"></div>
          </div>
        </div>

        <!-- Clue & Scholar's Edge -->
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; margin-top: 1px; line-height: 1.2;">
            ${l.bridgeTask?.clue || ''}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 1px; margin-top: 1px; line-height: 1.2;">
            ${l.bridgeTask?.scholarsEdge || ''}
          </div>
        </div>
      </div>

      <!-- Verso Footer Strip -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 3px;">
        <span style="font-weight: 800; color: #0f172a;">Page ${leftPageNum} (Facing Spread Left)</span>
        <span>The History Department &bull; ${yearGroup} Enquiry Spreads</span>
      </div>
    </div>
  </div>
`;

    // RIGHT PAGE (RECTO): Task 4 Writing & Auto-Lines
    html += `
  <div class="page page-container recto-page" id="page-${rightPageNum}">
    <div class="page-body-full">
      <div>
`;

    if (l.taskType === 'source_utility') {
      html += `
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${l.skill} &bull; Dual-Source Evidence
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              Enquiry: ${cleanEnquiry}
            </h3>
          </div>
          <span class="badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 1 &amp; 3 Prep</span>
        </div>

        <!-- Dual Primary Sources Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
          <!-- Source A -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${l.sourceA?.title || 'Source A'}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${l.sourceA?.text || ''}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${l.sourceA?.shelfmark || ''}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${l.sourceA?.clue || ''}
            </div>
          </div>

          <!-- Source B -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #0369a1; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0369a1; text-transform: uppercase;">${l.sourceB?.title || 'Source B'}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${l.sourceB?.text || ''}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${l.sourceB?.shelfmark || ''}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${l.sourceB?.clue || ''}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${(l.matrix || [])
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${l.connectives || ''}
          </div>
        </div>
`;
    } else if (l.taskType === 'historical_interpretations') {
      html += `
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${l.skill} &bull; Historiographical Debate
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              Enquiry: ${cleanEnquiry}
            </h3>
          </div>
          <span class="badge" style="background: #fef2f2; color: #b91c1c; border-color: #fecaca; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 3 Prep</span>
        </div>

        <!-- Dual Interpretations Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
          <!-- Interpretation 1 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #b91c1c; text-transform: uppercase;">${l.interp1?.title || 'Interpretation 1'}</strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
              ${l.interp1?.badge || ''}
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${l.interp1?.text || ''}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              <strong>Scholar:</strong> ${l.interp1?.author || ''}
            </div>
          </div>

          <!-- Interpretation 2 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${l.interp2?.title || 'Interpretation 2'}</strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e3a8a; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
              ${l.interp2?.badge || ''}
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${l.interp2?.text || ''}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              <strong>Scholar:</strong> ${l.interp2?.author || ''}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${(l.matrix || [])
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${l.connectives || ''}
          </div>
        </div>
`;
    } else {
      // Default: Extended Writing
      html += `
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${l.skill || 'Change & Continuity'} &bull; Extended Writing
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              Enquiry: ${cleanEnquiry}
            </h3>
          </div>
          <span class="badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">
            Independent Argument
          </span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns, 8.0pt) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${(l.structureStrip || l.matrix || [])
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">
                  ${m.col}
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; line-height: 1.22; display: block;">
                  ${m.text || m.prompt}
                </span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${l.connectives || ''}
          </div>
        </div>

        <!-- Writing Framework Strip (PEEL Mastery) -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 3px 8px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear direct answer to enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific names, dates, acts &amp; data.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism (why &amp; how).</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluative conclusion.</span>
        </div>
`;
    }

    html += `
      </div>

      <!-- AUTO-FILL WRITING LINES (Engine flex calculation target, capped at 17 lines) -->
      <div class="auto-lines-target" data-auto-lines="true" data-max-lines="17" data-line-height="7.8" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; justify-content: flex-start; margin-bottom: 3px;">
        <!-- Filled dynamically by engine measurement script -->
      </div>

      <!-- Footer Section: Teacher Assessment, Timeline Mission Box & Page Footer -->
      <div>
        <!-- Teacher Assessment Strip -->
        <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; margin-bottom: 3px;">
          ${
            l.taskType === 'source_utility'
              ? `<span><strong style="color: #0f172a;">Teacher Assessment:</strong> &nbsp; Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp; Source Utility: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp; Provenance: [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
               <span><strong style="color: #1e3a8a;">Judgement:</strong> [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>`
              : l.taskType === 'historical_interpretations'
                ? `<span><strong style="color: #0f172a;">Teacher Assessment:</strong> &nbsp; Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp; Interpretation Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp; Evaluation: [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
               <span><strong style="color: #b91c1c;">Balance:</strong> [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>`
                : `<span><strong style="color: #0f172a;">Teacher Assessment:</strong> &nbsp; Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp; Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp; Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
               <span><strong style="color: #1e3a8a;">PEEL:</strong> [ P ] &bull; [ E ] &bull; [ E ] &bull; [ L ]</span>`
          }
        </div>

        <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 2.5px 8px; background: #eff6ff; display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
              Timeline Mission &bull; Pages 2–3:
            </strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; font-style: italic;">
              ${l.timelineMission || 'Illustrate the milestone sketchpad on Pages 2–3 with your visual symbol.'}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">
            Pages 2–3 &rarr;
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 3px;">
          <span>${l.taskType === 'source_utility' ? 'Source Utility Assessment' : l.taskType === 'historical_interpretations' ? 'Historiographical Assessment' : 'Extended Writing Assessment'} &bull; The History Department</span>
          <span style="font-weight: 800; color: #0f172a;">Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
  </div>
`;
  });

  // ==========================================
  // PAGE 20: OUTSIDE BACK COVER (Universal Component)
  // ==========================================
  html += renderKs3BackCover({
    unitId: unitId,
    unitTitle: unitTitle,
    yearGroup: yearGroup,
    totalPageCount: totalPages,
    pageHeight: pageHeight,
    lessons: lessons.map((l, i) => ({
      num: i + 1,
      title: l.shortTitle || getEnquiryQuestion(l).slice(0, 45),
      skill: l.skill || 'Historical Analysis',
      doNowMax: 5,
      taskMax: 'Grade',
    })),
    qrLessons: lessons.map((l, i) => ({
      label: `L${i + 1}`,
      subLabel: l.shortTitle || `Lesson ${i + 1}`,
      title: `Lesson ${i + 1}`,
      questionCount: l.questionCount || 20,
      url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=${unitId}&lesson=${i + 1}`,
    })),
    footerQuip: quips[totalPages - 1] || 'Key Stage 3 Historical Studies • Pupil Assessment Record',
  });

  html += `
  <!-- Client-Side Auto-Lines Calculator (Runs inside Puppeteer before PDF print) -->
  <script>
    function autoFillWritingLines() {
      document.querySelectorAll('[data-auto-lines]').forEach(el => {
        el.innerHTML = '';
        const availablePx = el.clientHeight;
        const lineHMm = parseFloat(el.dataset.lineHeight || '7.8');
        const maxLines = parseInt(el.dataset.maxLines || '17', 10);
        // Standard 96 DPI: 1 inch = 25.4mm = 96px => 1mm = 3.779527559px
        const lineHPx = lineHMm * (96 / 25.4);
        const count = Math.min(maxLines, Math.max(1, Math.floor(availablePx / lineHPx)));
        el.innerHTML = Array(count).fill(
          '<div class="task-line" style="height: ' + lineHMm + 'mm; border-bottom: 1.5px solid #0f172a; box-sizing: border-box; flex-shrink: 0;"></div>'
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

/**
 * Universal PDF Compiler
 */
async function renderKs3WorkbookToPdf(unitConfig, outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  const htmlPath = path.join(outputDir, 'pupil_workbook_pilot.html');
  const pdfPath = path.join(outputDir, `${unitConfig.unitId}_pupil_workbook_pilot.pdf`);

  const html = buildKs3WorkbookHtml(unitConfig);
  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Execute in-browser line population
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') {
      autoFillWritingLines();
    }
  });

  // Save the populated HTML back to file so static HTML viewers have pre-rendered lines
  const populatedHtml = await page.content();
  fs.writeFileSync(htmlPath, populatedHtml, 'utf8');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  await browser.close();
  return { htmlPath, pdfPath };
}

module.exports = {
  buildKs3WorkbookHtml,
  renderKs3WorkbookToPdf,
};
