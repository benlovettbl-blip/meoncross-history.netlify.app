/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine (Pilot)
 *
 * Target: units/cme_new (Key Topic 2: The Escalating Conflict, 1964–1973)
 * Output: public/pdfs/cme_new_textbook_KT2_PUBLISHER_PILOT.pdf
 *
 * Architectural Standards Enforced:
 * 1. The Tripartite Separation of Concerns: Timeless reading anthology only.
 *    ZERO task boxes, ZERO Do-Now blanks, ZERO handwriting lines.
 * 2. Cambridge / Oxford University Press 2-Column Layout (50–65 char measure).
 * 3. Prominent Act subheadings directly restored from data.js.
 * 4. Pure [Act.Paragraph] notation with left-margin line numbering every 5 lines.
 * 5. Archival Primary Source Plaques with museum shelfmarks and citations.
 * 6. Standard Master Front Cover via renderStandardFrontCover.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderStandardFrontCover } = require('./components/render_standard_cover.cjs');

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

// Key Topic 2 lessons: lesson_6 through lesson_10 (indices 4 to 8)
const kt2Lessons = unitData.lessons.slice(4, 9);
console.log(`Loaded ${kt2Lessons.length} Key Topic 2 lessons for publisher textbook pilot.`);

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/**
 * Generates the complete HTML for the Cambridge/OUP standard textbook
 */
function buildPublisherTextbookHtml() {
  const frontCoverHtml = renderStandardFrontCover({
    unitId: 'cme_new',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • OPTION 26/27',
    specCode: 'COURSE TEXTBOOK • PERMANENT CLASSROOM ANTHOLOGY',
    keyTopicNum: 2,
    dateRange: '1964–1973',
    title: 'THE ESCALATING CONFLICT',
    subtitle: 'From the Water Wars and Six-Day War to the Yom Kippur Surprise',
    heroImage: {
      src: '/units/cme_new/assets/kt2_cover.jpg',
      alt: 'David Ben-Gurion and Israeli Defense Leaders 1967',
      objectPosition: 'center 30%',
      shelfmark: 'IDF-ARCHIVE / ACC-1967-06-A',
      date: 'June 1967',
      title: 'Command Staff of the Israel Defense Forces, Six-Day War',
      caption:
        'Prime Minister Levi Eshkol and Defense Minister Moshe Dayan reviewing combat dispatches following Operation Focus.',
      sourceTag: 'Archival Primary Record',
      archiveTag: 'Middle East Contemporary Archive',
      heightMm: 120,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE Specification Coverage (Key Topic 2)',
      subtopics: [
        {
          title: '2.1 The Six-Day War Causes',
          items: [
            '1964 Cairo Conference & PLO formation',
            'Water Wars & diversion of River Jordan',
            'Syrian border raids & Samu reprisal',
            'Events of 7 April 1967 air dogfight',
            'Nasser closes the Straits of Tiran',
          ],
        },
        {
          title: '2.2 The Six-Day War Course',
          items: [
            'Operation Focus dawn airstrikes',
            'Sinai blitzkrieg against Egyptian forces',
            'Capture of the West Bank & East Jerusalem',
            'Assault on the Golan Heights (Syrian front)',
            'Territorial transformation & ceasefire',
          ],
        },
        {
          title: '2.3 Aftermath, 242 & Yom Kippur',
          items: [
            'Khartoum Summit & the "Three Noes"',
            'UN Security Council Resolution 242',
            'Rise of the PLO & Dawson’s Field (1970)',
            '1972 Munich Olympics hostage crisis',
            'October 1973: Yom Kippur surprise & OPEC',
          ],
        },
      ],
    },
    footerQuip: 'Paper 2: Conflict in the Middle East • Key Topic 2 Permanent Reading Anthology',
    totalPageCount: 16,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Paper 2: Conflict in the Middle East — Key Topic 2 Textbook Anthology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
      @bottom-right {
        content: counter(page);
      }
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.8pt;
      line-height: 1.52;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }

    /* Page container enforcing strict printable boundaries */
    .textbook-page {
      width: 100%;
      min-height: 268mm;
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
      padding-bottom: 4px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #475569;
    }
    .running-header-title {
      color: #0f172a;
      font-weight: 800;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #64748b;
      font-weight: 600;
    }

    /* Lesson Hero Header */
    .lesson-hero {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .enquiry-badge {
      font-size: 7.5pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      margin: 4px 0 6px 0;
      line-height: 1.25;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      color: #475569;
      line-height: 1.4;
      background: #f8fafc;
      border-left: 3px solid #64748b;
      padding: 5px 10px;
      border-radius: 0 4px 4px 0;
    }

    /* Objectives & Pedagogical Framing Box */
    .pedagogy-framing-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      color: #334155;
    }
    .pedagogy-col strong {
      display: block;
      color: #0f172a;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 2px;
    }

    /* 2-Column Cambridge / OUP Reading Prose Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 22px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }

    /* Act Section Banners (Span All Columns) */
    .act-banner {
      column-span: all;
      background: #0f172a;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 4px;
      margin: 12px 0 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .act-banner-title {
      font-size: 8.8pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .act-banner-tag {
      font-size: 7pt;
      font-weight: 700;
      color: #93c5fd;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* Paragraph Styling with Pure [Act.Paragraph] pill */
    .numbered-para {
      margin: 0 0 10px 0;
      text-indent: 0;
      position: relative;
    }
    .para-ref-pill {
      font-family: 'Inter', monospace;
      font-size: 7.5pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 1px 5px;
      border-radius: 3px;
      margin-right: 5px;
      display: inline-block;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    /* Margin Line Number Marker (Every 5 lines) */
    .margin-line-number {
      float: left;
      margin-left: -18px;
      width: 14px;
      font-family: 'Inter', monospace;
      font-size: 6.8pt;
      font-weight: 700;
      color: #94a3b8;
      text-align: right;
      user-select: none;
    }

    /* Archival Primary Source Plaque */
    .archival-source-box {
      background: #fafaf9;
      border: 1.2px solid #d6d3d1;
      border-top: 3px solid #78350f;
      border-radius: 5px;
      padding: 10px 12px;
      margin: 10px 0;
      break-inside: avoid;
      font-family: 'Newsreader', Georgia, serif;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
    }
    .archival-badge {
      background: #78350f;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.06em;
    }
    .archival-shelfmark {
      font-family: monospace;
      font-size: 6.8pt;
      color: #78716c;
      font-weight: 700;
    }
    .archival-title {
      font-family: 'Playfair Display', serif;
      font-size: 9.8pt;
      font-weight: 700;
      color: #1c1917;
      margin: 0 0 6px 0;
      line-height: 1.3;
    }
    .archival-image {
      width: 100%;
      max-height: 160px;
      object-fit: cover;
      border-radius: 4px;
      margin: 6px 0;
      border: 1px solid #d6d3d1;
      display: block;
    }
    .archival-body {
      font-size: 8.8pt;
      line-height: 1.45;
      color: #292524;
      margin: 4px 0;
      font-style: italic;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 4px;
      margin-top: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #78716c;
      display: flex;
      justify-content: space-between;
    }

    /* Key Individual Callout Box */
    .key-individual-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3.5px solid #059669;
      border-radius: 5px;
      padding: 8px 10px;
      margin: 8px 0;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      line-height: 1.4;
      color: #166534;
      break-inside: avoid;
    }
    .key-individual-box strong {
      color: #065f46;
    }

    /* Table styling */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      margin: 8px 0;
      break-inside: avoid;
    }
    table.data-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      text-align: left;
      font-weight: 700;
    }
    table.data-table td {
      border: 1px solid #e2e8f0;
      padding: 4px 8px;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="textbook-page" style="padding: 0; min-height: 270mm;">
    ${frontCoverHtml}
  </div>

  <!-- LESSONS 1 THROUGH 5 (KEY TOPIC 2) -->
  ${kt2Lessons
    .map((lesson, lessonIdx) => {
      const lNum = lessonIdx + 1;
      const objectives = lesson.learning_objectives || [
        'Understand the key geopolitical catalysts and strategic mechanisms.',
        'Analyze archival primary sources and evaluate conflicting historical perspectives.',
        'Construct high-tariff causal explanations anchored in empirical evidence.',
      ];

      return `
      <!-- LESSON ${lNum} -->
      <div class="textbook-page">
        <div>
          <!-- Running Header -->
          <div class="running-header">
            <span class="running-header-title">THE HISTORY REVISION HUB &bull; COURSE TEXTBOOK ANTHOLOGY</span>
            <span>KEY TOPIC 2 &bull; LESSON ${lNum} OF 5</span>
          </div>

          <!-- Lesson Hero -->
          <div class="lesson-hero">
            <div class="lesson-badge-strip">
              <span class="topic-badge">KEY TOPIC 2.${lNum}</span>
              <span class="enquiry-badge">HISTORICAL ENQUIRY &bull; EDEXCEL PAPER 2</span>
            </div>
            <h1 class="lesson-title">
              ${lesson.title || 'Historical Enquiry'}
            </h1>
            <div class="lesson-spec-anchor">
              <strong>Pearson Specification Focus:</strong> ${lesson.spec_anchor || 'Key Topic 2 Specification Content & Historical Mechanisms.'}
            </div>
          </div>

          <!-- Pedagogical Framing: 4-Act Arc & Objectives -->
          <div class="pedagogy-framing-box">
            <div class="pedagogy-col">
              <strong><i class="fa-solid fa-compass"></i> Learning Objectives</strong>
              <ul style="margin: 2px 0 0 0; padding-left: 14px;">
                ${objectives.map((obj) => `<li>${typeof obj === 'string' ? obj : obj.objective || ''}</li>`).join('')}
              </ul>
            </div>
            <div class="pedagogy-col">
              <strong><i class="fa-solid fa-feather-pointed"></i> Christine Counsell 4-Act Enquiry Arc</strong>
              <div>This lesson follows a structured dramatic narrative. Use the paragraph markers <code>[Act.Paragraph]</code> to cite evidence in your 16-page consumable Workbook.</div>
            </div>
          </div>

          <!-- Two-Column Cambridge / OUP Reading Prose -->
          <div class="two-column-prose">
            ${(lesson.narrative_blocks || [])
              .map((block, blockIdx) => {
                const actNum = blockIdx + 1;
                const actHeading =
                  block.title || block.act_title || `Act ${actNum}: Historical Analysis`;
                const paragraphs = block.paragraphs || (block.text ? [block.text] : []);
                const source = block.source;

                return `
                <!-- ACT ${actNum} BANNER -->
                <div class="act-banner">
                  <span class="act-banner-title">${actHeading}</span>
                  <span class="act-banner-tag">ACT ${actNum}</span>
                </div>

                <!-- ACT PARAGRAPHS -->
                ${paragraphs
                  .map((p, pIdx) => {
                    const lineNum = (pIdx + 1) * 5;
                    return `
                    <div class="numbered-para">
                      <span class="margin-line-number">${lineNum}</span>
                      ${formatText(p)}
                    </div>
                  `;
                  })
                  .join('')}

                <!-- ARCHIVAL PRIMARY SOURCE BOX (IF PRESENT) -->
                ${
                  source
                    ? `
                  <div class="archival-source-box">
                    <div class="archival-header">
                      <span class="archival-badge">${source.type || 'Primary Archive'}</span>
                      <span class="archival-shelfmark">${source.shelfmark || `CME-KT2-L${lNum}-SRC${actNum}`}</span>
                    </div>
                    <div class="archival-title">${source.title || source.name || 'Archival Historical Record'}</div>
                    ${
                      source.image || source.url
                        ? `
                      <img src="${source.image || source.url}" class="archival-image" alt="${source.title || 'Primary Source'}">
                    `
                        : ''
                    }
                    ${
                      source.text || source.excerpt
                        ? `
                      <div class="archival-body">"${formatText(source.text || source.excerpt)}"</div>
                    `
                        : ''
                    }
                    <div class="archival-footer">
                      <span><strong>Provenance:</strong> ${source.author || source.attribution || 'Contemporary Archival Record'}</span>
                      <span><strong>Date:</strong> ${source.date || '1964–1973'}</span>
                    </div>
                  </div>
                `
                    : ''
                }
              `;
              })
              .join('')}
          </div>
        </div>

        <!-- Running Footer -->
        <div class="running-footer">
          <span>The History Revision Hub &bull; GCSE History Reading Anthology &bull; Option 26/27</span>
          <span>Permanent Classroom Set &bull; Do Not Write In This Book</span>
        </div>
      </div>
    `;
    })
    .join('')}

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
