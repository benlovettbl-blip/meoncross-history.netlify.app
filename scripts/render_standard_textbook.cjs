/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/cme_new (Key Topic 2: The Escalating Conflict, 1964–1973)
 * Output: public/pdfs/cme_new_textbook_KT2_PUBLISHER_PILOT.pdf
 * HTML:   public/units/cme_new/textbook_KT2_PUBLISHER_PILOT.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff: No pedagogical theory jargon in pupil textbooks (removed "Christine Counsell 4-Act Arc").
 * 2. Official Specification Primacy: Header & banners prominently feature Edexcel GCSE 1HI0/26 Option 26/27.
 * 3. Base64 Image Inlining: All archival photos embedded directly as Data URIs (100% reliable offline & in Puppeteer).
 * 4. Dual-Modality Primary Sources: Image sources render with calibrated photos; written diplomatic texts render verbatim.
 * 5. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages):
 *    - Page 1:  Master Front Cover (98mm hero photo, official 3-column spec matrix, zero workbook pupil lines)
 *    - Page 2:  Lesson 6 (KT 2.1 Causes of Six-Day War - Acts 1 & 2, Sources A & B)
 *    - Page 3:  Lesson 6 (KT 2.1 Causes of Six-Day War - Acts 3 & 4, Source C Diplomatic Text)
 *    - Page 4:  Lesson 7 (KT 2.2 Course of Six-Day War - Acts 1 & 2, Source A Airfield Photo)
 *    - Page 5:  Lesson 7 (KT 2.2 Course of Six-Day War - Acts 3 & 4, Source B Paratroopers Photo)
 *    - Page 6:  Lesson 8 (KT 2.3 Conquered Territories & 242 - Acts 1 & 2, Sources A & B Khartoum Text)
 *    - Page 7:  Lesson 8 (KT 2.3 Conquered Territories & 242 - Acts 3 & 4, Source C Treaty Comparison)
 *    - Page 8:  Lesson 9 (KT 2.4 Palestinian Resistance & Munich - Acts 1 & 2, Source A Dawson's Field)
 *    - Page 9:  Lesson 9 (KT 2.4 Palestinian Resistance & Munich - Acts 3 & 4, Source B Balcony Terrorist)
 *    - Page 10: Lesson 10 (KT 2.5 War of Attrition & Yom Kippur - Acts 1 & 2, Source A Egyptian Crossing)
 *    - Page 11: Lesson 10 (KT 2.5 War of Attrition & Yom Kippur - Acts 3 & 4, Source B Israeli Crossing)
 *    - Page 12: Master Back Cover (KT2 Chronological Overview, Core Terminology & Exam Question Guide)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Safely parse data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

// Key Topic 2 lessons: index 4 to 8 (Lessons 6 through 10)
const kt2Lessons = unitData.lessons.slice(4, 9);
console.log(`Loaded ${kt2Lessons.length} Key Topic 2 lessons for publisher textbook pilot.`);

/**
 * Robust Base64 Image Inliner
 * Guarantees 100% reliable rendering in standalone file:// HTML and headless Puppeteer.
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'assets', path.basename(clean)),
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
  console.warn(`[WARN] Image not found on disk: ${relPath}`);
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/**
 * Builds the complete 12-page Publisher-Standard Textbook HTML
 */
function buildPublisherTextbookHtml() {
  const coverBase64 = getBase64Image('/units/cme_new/assets/kt2_cover.jpg');

  // Short enquiry descriptions for running headers
  const shortEnquiries = [
    'How Did Water, Border Raids, and Rhetoric Make a Second War Inevitable?',
    'Why Was the Six-Day War Decided in Three Hours?',
    'How Did the 1967 Conquered Territories Transform the Conflict?',
    'The Rise of Palestinian Resistance: The PLO, Black September & Munich',
    'The War of Attrition & The Yom Kippur War (1969–1973)',
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History — Key Topic 2 Course Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }

    @page {
      size: A4 portrait;
      margin: 12mm 14mm 12mm 14mm;
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.8pt;
      line-height: 1.44;
      color: #1c1917;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }

    /* Strict A4 Page Container (297mm - 24mm margins = 273mm printable height) */
    .textbook-page {
      width: 100%;
      height: 273mm;
      max-height: 273mm;
      overflow: hidden;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    /* Running Header */
    .running-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #475569;
      flex-shrink: 0;
    }
    .running-header strong {
      color: #0f172a;
      font-weight: 800;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Lesson Hero Banner (Page 1 of each lesson) */
    .lesson-hero {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 6px;
      margin-bottom: 8px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.0pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 7.0pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2px 0 4px 0;
      line-height: 1.22;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      color: #334155;
      line-height: 1.35;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 4px 8px;
      border-radius: 0 4px 4px 0;
    }

    /* 2-Column Cambridge / OUP Reading Prose Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 18px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    /* Act Section Banners (Spans across both columns) */
    .act-banner {
      column-span: all;
      background: #0f172a;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 3px;
      margin: 8px 0 6px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .act-banner-title {
      font-size: 8.2pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .act-banner-tag {
      font-size: 6.8pt;
      font-weight: 700;
      color: #93c5fd;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* Paragraph Styling with Pure [Act.Paragraph] pill */
    .numbered-para {
      margin: 0 0 7px 0;
      text-indent: 0;
      line-height: 1.42;
    }
    .para-ref-pill {
      font-family: 'Inter', monospace;
      font-size: 7.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    /* Archival Primary Source Box */
    .archival-source-box {
      background: #fffdfa;
      border: 1.2px solid #e7e5e4;
      border-top: 3px solid #78350f;
      border-radius: 4px;
      padding: 8px 10px;
      margin: 8px 0;
      break-inside: avoid;
      font-family: 'Newsreader', Georgia, serif;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
    }
    .archival-badge {
      background: #78350f;
      color: #ffffff;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
    }
    .archival-shelfmark {
      font-family: monospace;
      font-size: 6.5pt;
      color: #78716c;
      font-weight: 700;
    }
    .archival-title {
      font-family: 'Playfair Display', serif;
      font-size: 9.0pt;
      font-weight: 700;
      color: #1c1917;
      margin: 0 0 4px 0;
      line-height: 1.25;
    }
    .archival-image {
      width: 100%;
      max-height: 130px;
      object-fit: cover;
      border-radius: 3px;
      margin: 4px 0;
      border: 1px solid #d6d3d1;
      display: block;
    }
    .archival-body {
      font-size: 8.4pt;
      line-height: 1.4;
      color: #292524;
      margin: 4px 0;
      font-style: italic;
      background: #fafaf9;
      padding: 6px 8px;
      border-left: 2px solid #a8a29e;
      border-radius: 0 3px 3px 0;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 3px;
      margin-top: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #78716c;
      display: flex;
      justify-content: space-between;
    }

    /* Key Individual Callout */
    .key-individual-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3px solid #059669;
      border-radius: 4px;
      padding: 6px 8px;
      margin: 6px 0;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      line-height: 1.35;
      color: #166534;
      break-inside: avoid;
    }
    .key-individual-box strong { color: #065f46; }

    /* Specification Review Box */
    .spec-review-strip {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px 10px;
      margin-top: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #334155;
      break-inside: avoid;
      column-span: all;
    }
    .spec-review-strip strong {
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  </style>
</head>
<body>

  <!-- ====================================================================
       PAGE 1: MASTER FRONT COVER (Key Topic 2 Course Textbook)
       ==================================================================== -->
  <div class="textbook-page" style="padding: 2mm 2mm; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">OPTION 26/27 &bull; 1HI0/26</span>
        </div>
      </div>

      <!-- Key Topic Title & Inquiry Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 10px; background: #fff; margin-bottom: 4px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Key Topic 2
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Course Textbook &bull; Chronological Enquiry Sequence &bull; 1964–1973
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 16pt; margin: 2px 0; font-weight: 900; line-height: 1.15; color: #000;">
          THE ESCALATING CONFLICT
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #333; font-style: italic; line-height: 1.25;">
          From the Water Wars and Six-Day War to the Yom Kippur Surprise
        </div>
      </div>

      <!-- Master Wide Photographic Plate -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 5px; display: flex; flex-direction: column;">
        <div style="height: 98mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverBase64}" alt="Israeli Paratroopers at the Western Wall, Jerusalem (David Rubinger, 7 June 1967)" style="width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; filter: grayscale(100%) contrast(115%);">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 4px 10px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
              Archival Primary Record &bull; 7 June 1967
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
              GPO-ARCHIVE / ACC-1967-06-07
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 800; line-height: 1.2; margin: 1px 0;">
            Israeli Paratroopers at the Western Wall, Jerusalem
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #111; line-height: 1.25;">
            Yitzhak Yifat, Tzion Karasenti, and Haim Oshri of the 55th Paratroopers Brigade standing before the Western Wall following the capture of the Old City (David Rubinger, 7 June 1967).
          </div>
          <div style="margin-top: 2px; padding-top: 2px; border-top: 1px dashed #999; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; text-transform: uppercase; color: #333;">
            <span>Archival Primary Record</span>
            <span>Edexcel Paper 2 Master Archive</span>
          </div>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Coverage (Official 3-Column Matrix) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; flex: 1; display: flex; flex-direction: column; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 4px 12px; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>Pearson Edexcel GCSE (9–1) History Specification Content</span>
          <span style="font-size: 7.0pt; letter-spacing: 0.5px;">Key Topic 2 Coverage</span>
        </div>

        <div style="padding: 10px 14px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.48; color: #111; flex: 1;">
          <!-- 2.1 -->
          <div style="border-right: 1.2px solid #e2e8f0; padding-right: 12px; display: flex; flex-direction: column; justify-content: space-between;">
            <strong style="font-size: 8.5pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 2px; display: block; margin-bottom: 4px;">
              2.1 Six-Day War Causes
            </strong>
            <div>&bull; 1964 Cairo Summit &amp; PLO formation</div>
            <div>&bull; Water Wars &amp; River Jordan diversion</div>
            <div>&bull; Syrian border raids &amp; Samu reprisal</div>
            <div>&bull; 7 April 1967 air dogfight</div>
            <div>&bull; Nasser closes Straits of Tiran</div>
          </div>
          <!-- 2.2 -->
          <div style="border-right: 1.2px solid #e2e8f0; padding-right: 12px; display: flex; flex-direction: column; justify-content: space-between;">
            <strong style="font-size: 8.5pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 2px; display: block; margin-bottom: 4px;">
              2.2 Six-Day War Course
            </strong>
            <div>&bull; Operation Focus dawn airstrikes</div>
            <div>&bull; Sinai blitzkrieg against Egypt</div>
            <div>&bull; Capture of West Bank &amp; Jerusalem</div>
            <div>&bull; Assault on the Golan Heights</div>
            <div>&bull; Ceasefire &amp; map transformation</div>
          </div>
          <!-- 2.3 -->
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <strong style="font-size: 8.5pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 2px; display: block; margin-bottom: 4px;">
              2.3 Aftermath &amp; Yom Kippur
            </strong>
            <div>&bull; Khartoum Summit &amp; 'Three Noes'</div>
            <div>&bull; UN Resolution 242 ('Land for Peace')</div>
            <div>&bull; PLO resistance &amp; Dawson's Field</div>
            <div>&bull; 1972 Munich Olympics massacre</div>
            <div>&bull; 1973 Yom Kippur surprise &amp; OPEC</div>
          </div>
        </div>
      </div>

      <!-- Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333; font-weight: 700;">
        <span>Paper 2: Conflict in the Middle East, 1945–1995 &bull; Key Topic 2 Student Textbook</span>
        <span>Page 1 of 12</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGES 2 THROUGH 11: 5 LESSON DOUBLE-PAGE SPREADS (2 Pages Per Lesson)
       ==================================================================== -->
  ${kt2Lessons
    .map((lesson, lessonIdx) => {
      const lNum = lessonIdx + 1;
      const leftPageNum = lNum * 2;
      const rightPageNum = leftPageNum + 1;
      const enquiryShort = shortEnquiries[lessonIdx];

      const blocks = lesson.narrative_blocks || [];
      const acts1And2 = blocks.slice(0, 2);
      const acts3And4 = blocks.slice(2, 4);

      function renderActBlock(block, actNum) {
        const actHeading = block.title || block.act_title || `Act ${actNum}: Historical Analysis`;
        const paragraphs = block.paragraphs || (block.text ? [block.text] : []);
        const source = block.source;

        let sourceHtml = '';
        if (source) {
          const sourceBody = source.content || source.text || source.excerpt || '';
          const sourceImgSrc = source.image ? getBase64Image(source.image) : null;

          sourceHtml = `
            <div class="archival-source-box">
              <div class="archival-header">
                <span class="archival-badge">${source.type === 'written' ? 'Historical Document' : 'Archival Primary Record'}</span>
                <span class="archival-shelfmark">${source.shelfmark || `CME-KT2-L${lNum}-SRC${source.letter || actNum}`}</span>
              </div>
              <div class="archival-title">${source.title || source.name || 'Primary Source'}</div>
              ${sourceImgSrc ? `<img src="${sourceImgSrc}" class="archival-image" alt="${source.title || 'Primary Source'}">` : ''}
              ${sourceBody ? `<div class="archival-body">"${formatText(sourceBody)}"</div>` : ''}
              <div class="archival-footer">
                <span><strong>Provenance:</strong> ${source.provenance || source.citation || source.author || 'Contemporary Record'}</span>
                <span><strong>Date:</strong> ${source.date || '1964–1973'}</span>
              </div>
            </div>
          `;
        }

        return `
          <div class="act-banner">
            <span class="act-banner-title">${actHeading}</span>
            <span class="act-banner-tag">ACT ${actNum}</span>
          </div>
          ${paragraphs
            .map((p, pIdx) => {
              const cleanP = String(p)
                .replace(/^<span class="para-ref">.*?<\/span>\s*/i, '')
                .replace(/^\[\d+\.\d+\]\s*/, '')
                .trim();
              return `
              <div class="numbered-para">
                <span class="para-ref-pill">[${actNum}.${pIdx + 1}]</span>
                ${formatText(cleanP)}
              </div>
            `;
            })
            .join('')}
          ${sourceHtml}
        `;
      }

      return `
      <!-- ====================================================================
           PAGE ${leftPageNum}: LESSON ${lNum} (LEFT SPREAD: ACTS 1 & 2)
           ==================================================================== -->
      <div class="textbook-page">
        <!-- Running Header (Left Verso: Official Specification Reference) -->
        <div class="running-header">
          <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 2.${lNum}</span>
        </div>

        <!-- Lesson Hero Header -->
        <div class="lesson-hero">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KEY TOPIC 2.${lNum}</span>
            <span class="spec-ref-badge">SPECIFICATION ENQUIRY &bull; 1964–1973</span>
          </div>
          <h1 class="lesson-title">
            ${lesson.title || 'Historical Enquiry'}
          </h1>
          <div class="lesson-spec-anchor">
            <strong>Pearson Specification Focus:</strong> ${lesson.spec_anchor || 'Key Topic 2 Specification Content, Geopolitical Mechanisms & Turning Points.'}
          </div>
        </div>

        <!-- Two-Column Prose for Acts 1 & 2 -->
        <div class="two-column-prose">
          ${acts1And2.map((b, idx) => renderActBlock(b, idx + 1)).join('')}
        </div>

        <!-- Running Footer -->
        <div class="running-footer">
          <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
          <span>Page ${leftPageNum} of 12</span>
        </div>
      </div>

      <!-- ====================================================================
           PAGE ${rightPageNum}: LESSON ${lNum} (RIGHT SPREAD: ACTS 3 & 4)
           ==================================================================== -->
      <div class="textbook-page">
        <!-- Running Header (Right Recto: Key Topic & Specific Lesson Enquiry) -->
        <div class="running-header">
          <span><strong>KEY TOPIC 2: THE ESCALATING CONFLICT, 1964–1973</strong></span>
          <span>ENQUIRY: ${enquiryShort}</span>
        </div>

        <!-- Two-Column Prose for Acts 3 & 4 -->
        <div class="two-column-prose">
          ${acts3And4.map((b, idx) => renderActBlock(b, idx + 3)).join('')}
          
          <!-- Specification Synthesis Strip -->
          <div class="spec-review-strip">
            <strong>Exam Synthesis &bull; Key Topic 2.${lNum}:</strong> Review how the evidence in Acts 1–4 explains historical causation and consequence. Use paragraph references <code>[Act.Paragraph]</code> when completing extended analytical writing in your consumable pupil workbook.
          </div>
        </div>

        <!-- Running Footer -->
        <div class="running-footer">
          <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
          <span>Page ${rightPageNum} of 12</span>
        </div>
      </div>
      `;
    })
    .join('')}

  <!-- ====================================================================
       PAGE 12: MASTER BACK COVER (Chronology, Concepts & Exam Matrix)
       ==================================================================== -->
  <div class="textbook-page" style="padding: 2mm 2mm; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Specification Review</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">KEY TOPIC 2 SYNTHESIS</span>
        </div>
      </div>

      <!-- Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 10px; background: #fff; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0 0 2px 0; font-weight: 900; color: #000;">
          KEY TOPIC 2: CHRONOLOGY &amp; DISCIPLINARY MASTERY (1964–1973)
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; line-height: 1.3;">
          Comprehensive revision index of vital historical turning points, diplomatic resolutions, and Edexcel examination question frameworks.
        </div>
      </div>

      <!-- Chronological Matrix Table -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #fff; padding: 4px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px;">
          Key Topic 2 Master Timeline &bull; Critical Chronological Sequence
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.32;">
          <tbody>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; width: 85px; white-space: nowrap;">Jan 1964</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a; width: 140px;">Cairo Arab Summit</td>
              <td style="padding: 4px 8px; color: #334155;">Arab League convenes to counter Israeli National Water Carrier; Palestinian Liberation Organization (PLO) formed.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Nov 1966</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Samu Reprisal Raid</td>
              <td style="padding: 4px 8px; color: #334155;">IDF launches major raid into Jordanian West Bank following Fatah mine attack; severely damages King Hussein's prestige.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">7 Apr 1967</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Air Dogfight over Damascus</td>
              <td style="padding: 4px 8px; color: #334155;">Israeli Mirage jets shoot down 6 Syrian MiG-21s; Arab public taunts Nasser over Egyptian inaction behind UNEF lines.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">May 1967</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Straits of Tiran Blockade</td>
              <td style="padding: 4px 8px; color: #334155;">Nasser expels UNEF peacekeepers, mobilises 100,000 troops in Sinai, and closes Straits of Tiran; Israel declares casus belli.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">5–10 Jun 1967</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">The Six-Day War</td>
              <td style="padding: 4px 8px; color: #334155;">Operation Focus preempts Egyptian Air Force; Israel captures Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Sep 1967</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Khartoum Summit</td>
              <td style="padding: 4px 8px; color: #334155;">Eight Arab states adopt the "Three Noes": No peace with Israel, No recognition of Israel, No negotiations with Israel.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">22 Nov 1967</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">UN Resolution 242</td>
              <td style="padding: 4px 8px; color: #334155;">Establishes "Land for Peace" principle; deliberately ambiguous language ("territories occupied" vs "des territoires occupés").</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Sep 1970</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Black September</td>
              <td style="padding: 4px 8px; color: #334155;">PFLP hijacks commercial planes to Dawson's Field; King Hussein expels armed PLO militias from Jordan to southern Lebanon.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Sep 1972</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">Munich Olympics Massacre</td>
              <td style="padding: 4px 8px; color: #334155;">Black September terrorists murder 11 Israeli Olympic team members; prompts Israel's Operation "Wrath of God" counter-strikes.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 4px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">6–25 Oct 1973</td>
              <td style="padding: 4px 8px; font-weight: 700; color: #0f172a;">The Yom Kippur War</td>
              <td style="padding: 4px 8px; color: #334155;">Egypt &amp; Syria launch coordinated surprise attack; IDF counter-attacks across Suez; OPEC initiates Arab oil embargo.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Disciplinary Glossary & Exam Architecture Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
        
        <!-- Core Conceptual Vocabulary -->
        <div style="border: 1.5px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; background: #f8fafc;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #1e3a8a; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">
            Key Topic 2 Disciplinary Terminology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.35; color: #334155;">
            <div><strong>Casus Belli:</strong> An act or event that provokes or is used to justify war (e.g. closing the Straits of Tiran).</div>
            <div><strong>Pre-emption:</strong> Launching a military strike to disrupt an imminent and inevitable enemy attack.</div>
            <div><strong>UNEF:</strong> United Nations Emergency Force deployed in Sinai to maintain buffer between Egypt and Israel.</div>
            <div><strong>Bar-Lev Line:</strong> Massive chain of Israeli sand fortifications and strongpoints built along the east bank of Suez.</div>
            <div><strong>OPEC Oil Weapon:</strong> Arab production cuts and embargo against nations supporting Israel during the 1973 war.</div>
          </div>
        </div>

        <!-- Examination Question Structure -->
        <div style="border: 1.5px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; background: #f8fafc;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0f172a; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">
            Edexcel Paper 2 Exam Framework (Middle East)
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.35; color: #334155;">
            <div><strong>Q1: Explain ONE consequence of... [4 Marks]:</strong> Focus directly on immediate and long-term results with precise contextual evidence.</div>
            <div><strong>Q2: Write an analytical narrative explaining... [8 Marks]:</strong> Sequence causes, events, and results in precise chronological order using causal connectives.</div>
            <div><strong>Q3: Explain the importance of... for... [8 Marks]:</strong> Analyse significance and causal transformation for international relations.</div>
          </div>
        </div>

      </div>

      <!-- Back Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333; font-weight: 700;">
        <span>Paper 2: Conflict in the Middle East, 1945–1995 &bull; Specification Review Index</span>
        <span>Page 12 of 12</span>
      </div>

    </div>
  </div>

</body>
</html>`;
}

(async () => {
  console.log(
    '🚀 Compiling Publisher-Level Standard Textbook Pilot for Middle East Key Topic 2...',
  );

  const htmlContent = buildPublisherTextbookHtml();

  // Save HTML companion
  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT2_PUBLISHER_PILOT.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  // Compile PDF with Puppeteer
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'cme_new_textbook_KT2_PUBLISHER_PILOT.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  console.log(`🎉 Masterpiece PDF Textbook Pilot successfully compiled!`);
  console.log(`📄 PDF Output: ${pdfPath}`);

  await page.close();
  await browser.close();
})();
