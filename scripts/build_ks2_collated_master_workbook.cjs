const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const worksheetsDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const assetsDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'assets');
const unitsDir = path.join(__dirname, '..', 'units', 'ks2_ww2');
const pubDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2');
const pdfPath = path.join(
  __dirname,
  '..',
  'public',
  'pdfs',
  'ks2_ww2',
  'ks2_ww2_pupil_workbook.pdf',
);

function getBase64Image(filename) {
  const clean = filename.replace(/^.*[\\\/]/, '');
  const candidates = [
    path.join(assetsDir, clean),
    path.join(__dirname, '..', 'units', 'ks2_ww2', 'assets', clean),
    path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', clean),
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

const shortMissions = [
  'Outbreak & Gas Masks',
  'Pied Piper & Evacuation',
  "Vera's Kindertransport",
  'The Blitz & Garden Shelters',
  'Dig for Victory & Rationing',
  'Women at War & Land Army',
  'Pre-War Life & Rights Lost',
  'Codebreakers & Bletchley',
  'The Rescuers: Winton & Chadwick',
  'VE Day & Remembrance',
];

function buildCollatedWorkbook() {
  console.log('🚀 Collating 10 Enquiry Worksheets into 24-Page Master Pupil Workbook...');

  // Collect all styles from the 10 worksheet files
  const stylesSet = new Set();
  const extractedSheets = [];
  let runningPageNum = 2;

  for (let i = 1; i <= 10; i++) {
    const numStr = i < 10 ? '0' + i : '' + i;
    const file = fs
      .readdirSync(worksheetsDir)
      .find((f) => f.startsWith('lesson_' + numStr) && f.endsWith('.html'));
    if (!file) throw new Error(`Missing worksheet file for lesson ${i}`);

    const html = fs.readFileSync(path.join(worksheetsDir, file), 'utf8');

    // Extract style
    const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch) {
      stylesSet.add(styleMatch[1]);
    }

    // Split into sheets by <div class="worksheet-page
    const sheetParts = html.split('<div class="worksheet-page');
    // In a 24-page saddle-stitch booklet (6 folded A3 sheets), each of the 10 enquiries
    // occupies strictly a 2-page spread (Sheet 1 & Sheet 2, A4 Portrait).
    // Standalone craft sheets (such as Sheet 3 A4 Landscape) belong only in individual worksheets.
    for (let p = 1; p <= 2 && p < sheetParts.length; p++) {
      let sheetHtml = '<div class="worksheet-page' + sheetParts[p];

      // If this is sheet 2 or the last sheet in the file, strip </body></html>
      if (p === 2 || p === sheetParts.length - 1) {
        const bodyCloseIdx = sheetHtml.lastIndexOf('</body>');
        if (bodyCloseIdx !== -1) {
          sheetHtml = sheetHtml.substring(0, bodyCloseIdx).trim();
        }
      }

      const pageId = `page-${runningPageNum}`;

      // Clean ID and ensure proper classes (strictly A4 portrait)
      sheetHtml = sheetHtml.replace(
        /<div class="worksheet-page[^"]*"\s+id="[^"]*"/,
        `<div class="worksheet-page workbook-page" id="${pageId}"`,
      );

      // Standardize footers to show workbook page sequence
      const missionPill = i < 10 ? '0' + i : '' + i;
      let sheetDesc = p === 1 ? 'Story &amp; Evidence' : 'Investigation &amp; Synthesis';

      sheetHtml = sheetHtml.replace(
        /<div class="sheet-footer">[\s\S]*?<\/div>/,
        `<div class="sheet-footer"><span>The History Revision Hub • KS2 Pupil Workbook</span><span>Mission ${missionPill} • ${sheetDesc} • Page ${runningPageNum} of 24</span></div>`,
      );

      sheetHtml = sheetHtml.replace(/(YEAR\s*5|Year\s*5)/g, 'KS2');

      extractedSheets.push(sheetHtml);
      runningPageNum++;
    }
  }

  const quizP1Num = runningPageNum++;
  const quizP2Num = runningPageNum++;
  const backCoverNum = runningPageNum;

  // Cover HTML
  const coverHtml = `
  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="worksheet-page workbook-page" id="page-1">
    <div class="exercise-book-cutline cover-cutline">
      <div class="cover-masthead">
        <span class="cover-brand-badge">THE HISTORY REVISION HUB</span>
        <span class="cover-date-pill">1939–1945 • KEY STAGE 2</span>
      </div>

      <div class="cover-hero-box">
        <h1 class="cover-title">WORLD WAR II &amp; THE HOME FRONT</h1>
        <p class="cover-subtitle">PUPIL WORKBOOK &amp; HISTORIAN COMPANION</p>
      </div>

      <div class="cover-enquiry-banner">
        <span class="cover-enquiry-prompt">CENTRAL HISTORICAL ENQUIRY QUESTION</span>
        <h2 class="cover-enquiry-title">How did World War II transform children's lives in Britain and Europe?</h2>
      </div>

      <div class="cover-plate-box">
        <img src="${getBase64Image('evacuees_station_1940_hu36871.jpg') || '/units/ks2_ww2/assets/evacuees_station_1940_hu36871.jpg'}" class="cover-hero-img" alt="London schoolchildren evacuees at railway station 1940">
        <div class="cover-caption">Archival Record: London schoolchildren carrying luggage labels and gas mask boxes pass through the railway station as Britain mobilises for war, 1940 (Imperial War Museum HU 36871).</div>
      </div>

      <div class="student-id-block">
        <div class="id-row">
          <span class="id-label">Pupil Name:</span>
          <div class="id-line" style="flex: 1.4;"></div>
          <span class="id-label" style="margin-left: 12px;">Class / Year Group:</span>
          <div class="id-line" style="flex: 1;"></div>
          <span class="id-label" style="margin-left: 12px;">Teacher:</span>
          <div class="id-line" style="flex: 1;"></div>
        </div>
      </div>

      <div class="cover-enquiries-dir">
        <div class="dir-header">
          <div class="dir-header-title">
            <span style="font-size: 1.1rem;">⭐</span>
            <span>YOUR 10 HISTORIAN MISSIONS</span>
          </div>
          <span class="dir-header-sub">Tick off each enquiry as you investigate the evidence!</span>
        </div>
        <div class="dir-grid">
          ${shortMissions
            .map(
              (name, idx) => `
            <div class="dir-item">
              <span class="dir-pill">${idx + 1 < 10 ? 'Enquiry 0' + (idx + 1) : 'Enquiry ' + (idx + 1)}</span>
              <span class="dir-name">${name}</span>
              <span class="dir-check-box"></span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="cover-footer">
        <span>The History Revision Hub • Key Stage 2 History</span>
        <span>World War II Pupil Workbook • 10 Historian Missions</span>
      </div>
    </div>
  </div>
  `;

  // Quiz HTML (Pages 24 and 25)
  const quizP1Html = `
  <!-- PAGE ${quizP1Num}: RETRIEVAL QUIZ PART 1 -->
  <div class="worksheet-page workbook-page" id="page-${quizP1Num}">
    <div class="exercise-book-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">RETRIEVAL CHALLENGE</span>
          <span class="brand-text">Knowledge Recall • Questions 1 to 20</span>
        </div>
        <div class="student-fields"><div class="field-item">Score: <span class="field-line" style="width:18mm;"></span> / 40</div></div>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>WW2 Knowledge Retrieval Challenge (Part 1)</h1>
          <p class="enquiry-question">Answer each factual question from memory to prove your historical mastery.</p>
        </div>
        <div class="lesson-badge">QUIZ<br><span style="font-size:6pt; font-weight:600;">PART 1</span></div>
      </div>

      <div class="quiz-questions-grid">
        ${[
          '1. On what date did Prime Minister Chamberlain announce war with Germany?',
          '2. How many million gas masks were distributed to British civilians in 1939?',
          '3. What was the name of the official government evacuation plan?',
          '4. Why did evacuee children wear cardboard luggage labels pinned to their coats?',
          '5. How many refugee children were rescued on the Kindertransport from 1938–39?',
          '6. What was the name of 9-year-old Czech girl who travelled on the train from Prague?',
          '7. Name the garden shelter made of curved corrugated steel covered with soil.',
          '8. Where did over 150,000 Londoners shelter during night air raids in the Blitz?',
          '9. What was the name of the government campaign urging families to grow food?',
          '10. Why was throwing away leftover food made a criminal offence during wartime?',
          '11. What book of coupons did every British citizen carry to buy meat, butter, and sugar?',
          "12. What was the popular nickname given to volunteers in the Women's Land Army?",
          '13. Name two jobs women carried out in wartime Britain besides farming.',
          '14. Approximately how many Jewish people lived across Europe before 1939?',
          '15. What cardboard cone filled with sweets did German children carry on their first day of school?',
          '16. In what year were Jewish pupils completely banned from attending state schools?',
          '17. What was the name of the German cipher typewriter used to scramble battle orders?',
          '18. Name the genius mathematician who designed the Bombe machines at Bletchley Park.',
          '19. How many rotor wheels scrambled the electrical circuits inside an Enigma machine?',
          '20. For how many years did Bletchley Park workers keep their codebreaking work secret?',
        ]
          .map(
            (q) => `
          <div class="quiz-q-item">
            <span class="quiz-q-text">${q}</span>
            <div class="ruled-line quiz-line"></div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 Pupil Workbook</span>
        <span>Retrieval Challenge • Page ${quizP1Num} of 24</span>
      </div>
    </div>
  </div>
  `;

  const quizP2Html = `
  <!-- PAGE ${quizP2Num}: RETRIEVAL QUIZ PART 2 -->
  <div class="worksheet-page workbook-page" id="page-${quizP2Num}">
    <div class="exercise-book-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">RETRIEVAL CHALLENGE</span>
          <span class="brand-text">Knowledge Recall • Questions 21 to 40</span>
        </div>
        <div class="student-fields"><div class="field-item">Total: <span class="field-line" style="width:18mm;"></span> / 40</div></div>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>WW2 Knowledge Retrieval Challenge (Part 2)</h1>
          <p class="enquiry-question">Questions 21 to 40 covering Rescuers, VE Day, and the Home Front.</p>
        </div>
        <div class="lesson-badge">QUIZ<br><span style="font-size:6pt; font-weight:600;">PART 2</span></div>
      </div>

      <div class="quiz-questions-grid">
        ${[
          '21. Who was the 29-year-old London stockbroker who rescued 669 children from Prague?',
          '22. Name the Dorset schoolmaster who stayed in Prague facing the Gestapo.',
          '23. Where did Nicholas Winton hide his rescue scrapbook for nearly 50 years?',
          "24. Who discovered Nicholas Winton's scrapbook in the attic in 1988?",
          '25. What is the definition of an "upstander"?',
          '26. What does "VE Day" stand for, and on what date did it occur in 1945?',
          "27. Who was the Prime Minister who announced Germany's surrender on VE Day?",
          '28. What food did communities save their coupons for to celebrate on VE Day?',
          '29. In what year did food rationing finally end in Great Britain?',
          '30. What was the name of the indoor steel shelter that could double as a kitchen table?',
          '31. What did people paint white on city streets to help drivers in the blackout?',
          '32. Why did ships travel together in "convoys" across the Atlantic Ocean?',
          '33. What weapon did German submarines use to attack merchant ships?',
          '34. What did Air Raid Wardens shout if they saw a chink of light at night?',
          '35. How many consecutive nights was London bombed during the Blitz?',
          '36. What famous cathedral survived the Blitz surrounded by fires in London?',
          '37. Name the country where Nicholas Winton travelled to rescue children in 1938.',
          '38. What station in London did the Kindertransport children arrive at?',
          '39. Why did families plant cabbages and potatoes on top of their Anderson shelters?',
          '40. What is the most important lesson the Second World War generation taught us?',
        ]
          .map(
            (q) => `
          <div class="quiz-q-item">
            <span class="quiz-q-text">${q}</span>
            <div class="ruled-line quiz-line"></div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 Pupil Workbook</span>
        <span>Retrieval Challenge • Page ${quizP2Num} of 24</span>
      </div>
    </div>
  </div>
  `;

  // Back Cover HTML (Page 26)
  const backCoverHtml = `
  <!-- PAGE ${backCoverNum}: BACK COVER & HISTORIAN PROGRESS -->
  <div class="worksheet-page workbook-page" id="page-${backCoverNum}">
    <div class="exercise-book-cutline back-cover-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">HISTORIAN RECORD</span>
          <span class="brand-text">Teacher Feedback &amp; Historical Word Bank</span>
        </div>
      </div>

      <div class="back-cover-header">
        <h2>YOUR HISTORIAN JOURNEY • SKILLS &amp; MASTERY</h2>
        <p>Key Stage 2 Historical Knowledge, Evidence Detective &amp; Empathy</p>
      </div>

      <div class="rubric-grid">
        <div class="rubric-card">
          <h4>Historical Knowledge &amp; Chronology</h4>
          <p>Understands the causes, major milestones, and home front conditions of the Second World War (1939–1945).</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
        <div class="rubric-card">
          <h4>Primary Evidence &amp; Visual Deduction</h4>
          <p>Extracts meaningful historical deductions from photographs, government posters, and artifact records without bias.</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
        <div class="rubric-card">
          <h4>Historical Empathy &amp; Significance</h4>
          <p>Explains how ordinary children, evacuees, Land Girls, and refugees experienced wartime separation and resilience.</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
      </div>

      <div class="teacher-feedback-box">
        <div class="feedback-title">TEACHER COMMENDATION &amp; TARGET FEEDBACK</div>
        <div class="feedback-lines">
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
        </div>
        <div class="feedback-sig-row">
          <span>Teacher Signature: ______________________</span>
          <span>Date: ____________</span>
          <span>Mastery Award: ⭐⭐⭐</span>
        </div>
      </div>

      <div class="glossary-box">
        <div class="glossary-title">HISTORICAL WORD BANK</div>
        <div class="glossary-grid">
          <div><strong>Evacuee:</strong> Child sent from cities to safety.</div>
          <div><strong>Blackout:</strong> Turning off lights to hide from bombers.</div>
          <div><strong>Anderson Shelter:</strong> Corrugated steel garden bunker.</div>
          <div><strong>Rationing:</strong> Fair sharing of food during shortage.</div>
          <div><strong>Kindertransport:</strong> Rescue of 10,000 refugee children.</div>
          <div><strong>Bletchley Park:</strong> Secret UK codebreaking station.</div>
          <div><strong>Upstander:</strong> Person who acts to protect others.</div>
          <div><strong>VE Day:</strong> Victory in Europe Day (8 May 1945).</div>
        </div>
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • Key Stage 2 History</span>
        <span>World War II Pupil Workbook • Page ${backCoverNum} of 24 • Well Done Historian!</span>
      </div>
    </div>
  </div>
  `;

  // Build Pages 2–23
  const spreadsHtml = extractedSheets.join('\n');

  // Additional workbook CSS (Cover, Quiz, Back Cover)
  const additionalCss = `
    /* ENQUIRY TITLE BANNER & HIGH-CONTRAST TYPOGRAPHY OVERRIDE */
    .enquiry-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%) !important;
      color: #ffffff !important;
      border: 1px solid #1e3a8a !important;
      border-radius: 6px !important;
      padding: 2.2mm 3.8mm !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 2.4mm !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 5px rgba(15, 23, 42, 0.15) !important;
    }

    .enquiry-title-group {
      flex: 1 !important;
      min-width: 0 !important;
      padding-right: 4mm !important;
    }

    .enquiry-title-group h1 {
      font-family: 'Cinzel', serif !important;
      font-size: 11.2pt !important;
      font-weight: 800 !important;
      letter-spacing: 0.02em !important;
      line-height: 1.15 !important;
      color: #ffffff !important;
      margin: 0 !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
    }

    .enquiry-title-group .enquiry-question,
    .enquiry-question {
      font-family: 'Lora', serif !important;
      font-size: 7.8pt !important;
      font-style: italic !important;
      color: #fef08a !important;
      margin-top: 0.5mm !important;
      line-height: 1.25 !important;
      display: block !important;
    }

    .lesson-badge {
      background: #ffffff !important;
      color: #1e3a8a !important;
      border: 1.5px solid #93c5fd !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      padding: 1.8mm 3.8mm !important;
      border-radius: 5px !important;
      text-align: center !important;
      font-size: 7.4pt !important;
      font-weight: 900 !important;
      letter-spacing: 0.06em !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      line-height: 1.25 !important;
    }

    .lesson-badge span {
      color: #0369a1 !important;
      font-size: 6.2pt !important;
      font-weight: 800 !important;
      letter-spacing: 0.05em !important;
      display: block !important;
    }

    /* A4 LANDSCAPE CRAFT SHEET */
    .worksheet-page.landscape-page {
      width: 297mm;
      height: 210mm;
      padding: 6.5mm 8.5mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      break-after: page;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      margin: 15mm auto;
    }

    @media print {
      .worksheet-page.landscape-page {
        page: landscape-sheet;
        box-shadow: none !important;
        margin: 0;
      }
    }

    @page landscape-sheet {
      size: A4 landscape;
      margin: 0;
    }

    .landscape-cutline {
      width: 100%;
      height: 100%;
      border: 1.5px dashed var(--cut-guide);
      border-radius: 6px;
      padding: 4mm 6mm;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      box-sizing: border-box;
      justify-content: space-between;
    }

    /* GIANT FULL-PAGE A4 LANDSCAPE SUITCASE */
    .giant-suitcase-frame {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      margin-top: 1.5mm;
      margin-bottom: 1.5mm;
      position: relative;
    }

    .giant-suitcase-shell {
      flex: 1;
      border: 2.8px solid #78350f;
      border-radius: 10px;
      background: #fdfbf7;
      box-shadow: inset 0 0 15px rgba(120, 53, 15, 0.05), 0 3px 8px rgba(0,0,0,0.06);
      position: relative;
      padding: 4mm 5mm;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .giant-suitcase-handle {
      position: absolute;
      top: -5.5mm;
      left: 50%;
      transform: translateX(-50%);
      width: 58mm;
      height: 5.5mm;
      border: 3.5px solid #78350f;
      border-bottom: none;
      border-radius: 6px 6px 0 0;
      background: #d97706;
      box-shadow: 0 -1px 3px rgba(0,0,0,0.15);
    }

    .giant-brass-clasp {
      position: absolute;
      top: -3mm;
      width: 12mm;
      height: 6mm;
      background: #f59e0b;
      border: 1.5px solid #78350f;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .giant-brass-clasp.left { left: 45mm; }
    .giant-brass-clasp.right { right: 45mm; }

    .giant-corner-bracket {
      position: absolute;
      width: 14mm;
      height: 14mm;
      border: 2.5px solid #78350f;
      background: #d97706;
      border-radius: 3px;
    }
    .giant-corner-bracket.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
    .giant-corner-bracket.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
    .giant-corner-bracket.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
    .giant-corner-bracket.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

    .giant-blank-suitcase-interior {
      flex: 1;
      border: 2px dashed #b45309;
      border-radius: 8px;
      background: #ffffff;
      margin-top: 4.5mm;
      padding: 6mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      box-shadow: inset 0 2px 8px rgba(120, 53, 15, 0.04);
    }

    /* FULL WIDTH EXPANDED WRITTEN LEDGER (SHEET 2) */
    .expanded-written-ledger {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
      flex: 1;
      min-height: 0;
    }

    .expanded-ledger-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3.8px solid var(--navy-primary);
      border-radius: 4px;
      padding: 1.8mm 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      min-height: 0;
    }

    .expanded-ledger-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .expanded-ledger-prompt {
      font-size: 7.0pt;
      font-style: italic;
      color: var(--ink-muted);
      margin-top: 0.4mm;
      margin-bottom: 0.8mm;
    }

    .expanded-ledger-rule {
      border-bottom: 1.2px dashed #94a3b8;
      min-height: 7.8mm;
      flex: 1;
    }

    /* COVER STYLES */
    .cover-cutline {
      justify-content: space-between;
      border: 2px solid var(--navy-deep);
      padding: 6mm 7mm;
    }
    .cover-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
    }
    .cover-brand-badge {
      font-family: 'Cinzel', serif;
      font-size: 8.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.08em;
    }
    .cover-date-pill {
      background: #0f172a;
      color: #fde68a;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 12px;
      letter-spacing: 0.05em;
    }
    .cover-hero-box {
      text-align: center;
      margin: 2mm 0;
    }
    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 19pt;
      font-weight: 900;
      color: var(--navy-deep);
      letter-spacing: 0.03em;
      line-height: 1.15;
    }
    .cover-subtitle {
      font-size: 8.5pt;
      font-weight: 700;
      color: var(--accent-gold);
      letter-spacing: 0.1em;
      margin-top: 1mm;
    }
    .cover-enquiry-banner {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 4.5px solid var(--navy-primary);
      border-radius: 6px;
      padding: 1.8mm 3mm;
      text-align: center;
      margin: 1.2mm 0 1.8mm 0;
    }
    .cover-enquiry-prompt {
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-primary);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 0.5mm;
      display: block;
    }
    .cover-enquiry-title {
      font-family: 'Lora', serif;
      font-size: 10.5pt;
      font-weight: 700;
      font-style: italic;
      color: var(--navy-deep);
      line-height: 1.25;
      margin: 0;
    }
    .cover-plate-box {
      background: #f8fafc;
      border: 1.5px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.0mm;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cover-hero-img {
      max-height: 52mm;
      max-width: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      display: block;
      margin: 0 auto;
    }
    .cover-caption {
      font-size: 7.0pt;
      color: var(--ink-muted);
      margin-top: 1.0mm;
      font-style: italic;
    }
    .student-id-block {
      background: #fdfbf7;
      border: 1.5px solid #fed7aa;
      border-radius: 6px;
      padding: 2.2mm 3.8mm;
      font-size: 8.0pt;
      font-weight: 700;
      color: var(--navy-deep);
    }
    .id-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .id-label {
      font-weight: 800;
      white-space: nowrap;
      color: var(--navy-deep);
      font-size: 7.8pt;
    }
    .id-line {
      border-bottom: 1.2px solid var(--navy-deep);
      height: 3.8mm;
    }
    .cover-enquiries-dir {
      border: 1.6px solid #93c5fd;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(30,58,138,0.06);
    }
    .dir-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      padding: 2.0mm 3.5mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5px;
    }
    .dir-header-title {
      font-size: 8.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dir-header-sub {
      font-size: 6.8pt;
      font-weight: 500;
      color: #dbeafe;
      letter-spacing: 0.02em;
    }
    .dir-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.8mm 3.2mm;
      padding: 2.2mm 3.2mm;
      background: #f8fafc;
    }
    .dir-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Outfit', sans-serif;
      font-size: 7.8pt;
      color: var(--ink);
      gap: 6px;
      background: #ffffff;
      padding: 1.2mm 2.4mm;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
    }
    .dir-pill {
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      font-size: 6.8pt;
      padding: 1.2px 5.5px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .dir-name {
      flex: 1;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #0f172a;
    }
    .dir-check-box {
      width: 12px;
      height: 12px;
      border: 1.5px solid #3b82f6;
      border-radius: 3px;
      background: #ffffff;
      flex-shrink: 0;
    }
    .cover-footer {
      display: flex;
      justify-content: space-between;
      font-size: 6.8pt;
      color: #94a3b8;
      border-top: 1px solid var(--border-gray);
      padding-top: 1.5mm;
    }

    /* QUIZ & BACK COVER */
    .quiz-questions-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.6mm 4mm;
      min-height: 0;
    }
    .quiz-q-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .quiz-q-text {
      font-size: 7.6pt;
      font-weight: 700;
      color: var(--navy-deep);
      line-height: 1.25;
    }
    .quiz-line {
      height: 4.6mm;
    }
    .back-cover-cutline {
      justify-content: space-between;
    }
    .back-cover-header {
      text-align: center;
      margin-bottom: 1.6mm;
    }
    .back-cover-header h2 {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
    }
    .back-cover-header p {
      font-size: 7.8pt;
      color: var(--accent-gold);
      font-weight: 700;
    }
    .rubric-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3mm;
      margin-bottom: 2mm;
    }
    .rubric-card {
      background: #f8fafc;
      border: 1px solid var(--border-gray);
      border-radius: 4px;
      padding: 2mm 2.5mm;
    }
    .rubric-card h4 {
      font-size: 7.8pt;
      font-weight: 800;
      color: var(--navy-deep);
      margin-bottom: 0.8mm;
    }
    .rubric-card p {
      font-size: 6.8pt;
      color: var(--ink-muted);
      line-height: 1.3;
      margin-bottom: 1.2mm;
    }
    .rubric-grade {
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--accent-gold);
      border-top: 1px dashed #cbd5e1;
      padding-top: 0.8mm;
    }
    .teacher-feedback-box {
      border: 1.5px solid #93c5fd;
      background: #eff6ff;
      border-radius: 6px;
      padding: 2.2mm 3.5mm;
      margin-bottom: 2mm;
    }
    .feedback-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      margin-bottom: 1.2mm;
    }
    .feedback-lines {
      display: flex;
      flex-direction: column;
      gap: 2mm;
      margin-bottom: 1.5mm;
    }
    .feedback-sig-row {
      display: flex;
      justify-content: space-between;
      font-size: 7.0pt;
      font-weight: 600;
      color: var(--ink-muted);
    }
    .glossary-box {
      border: 1px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.0mm 3mm;
    }
    .glossary-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      margin-bottom: 1.0mm;
    }
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1mm 3mm;
      font-size: 7.0pt;
      color: var(--ink-muted);
    }
  `;

  const combinedStyles = Array.from(stylesSet).join('\n') + '\n' + additionalCss;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS2 History: World War II &amp; The Home Front — Complete Master Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
${combinedStyles}
  </style>
</head>
<body>

${coverHtml}
${spreadsHtml}
${quizP1Html}
${quizP2Html}
${backCoverHtml}

</body>
</html>
  `;

  fs.writeFileSync(path.join(unitsDir, 'pupil_workbook.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(pubDir, 'pupil_workbook.html'), fullHtml, 'utf8');
  console.log('🎉 Successfully created 24-page Collated Master Pupil Workbook HTML!');
}

buildCollatedWorkbook();
