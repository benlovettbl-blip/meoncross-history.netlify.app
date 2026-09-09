/**
 * exam_trend_matrix.js
 *
 * Interactive Pearson Edexcel GCSE Past Paper Matrix (2018–2026) &
 * Specification Gap Analysis / Overdue Topic Predictor for History Hub.
 */

const UNIT_CONFIGS = {
  edexcel_medicine: {
    id: 'edexcel_medicine',
    name: 'Paper 1: Medicine in Britain, c1250–present and The British sector of the Western Front, 1914–18',
    code: '1HI0/11',
    badge: 'Paper 1: Medicine & Western Front',
    label: '🩺 Medicine (11)',
    dataFile: '/data/edexcel_medicine_past_papers.json',
    trendFile: '/data/edexcel_medicine_trend_analysis.json',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #042f2e 100%)',
    primary: '#0d9488',
    light: '#ccfbf1',
    guidePdf: '/pdfs/edexcel_medicine_revision_guide.pdf',
    guideName: 'Open in 40-Page Visual Guide',
  },
  eee: {
    id: 'eee',
    name: 'Paper 2: Early Elizabethan England, 1558–1588',
    code: '1HI0/B4',
    badge: 'Paper 2: Early Elizabethan England',
    label: '👑 Elizabethan (B4)',
    dataFile: '/data/eee_past_papers.json',
    trendFile: '/data/eee_trend_analysis.json',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #2e1065 100%)',
    primary: '#7c3aed',
    light: '#ede9fe',
    guidePdf: null,
    guideName: null,
  },
  cme_new: {
    id: 'cme_new',
    name: 'Paper 2: Conflict in the Middle East, 1945–1995',
    code: '1HI0/P5',
    badge: 'Paper 2: Middle East 1945–95',
    label: '🕊️ Middle East (P5)',
    dataFile: '/data/cme_new_past_papers.json',
    trendFile: '/data/cme_new_trend_analysis.json',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #082f49 100%)',
    primary: '#0284c7',
    light: '#e0f2fe',
    guidePdf: null,
    guideName: null,
  },
  weimar_nazi_germany: {
    id: 'weimar_nazi_germany',
    name: 'Paper 3: Weimar and Nazi Germany, 1918–1939',
    code: '1HI0/31',
    badge: 'Paper 3: Weimar & Nazi Germany (Year 10)',
    label: '🦅 Germany (Yr 10)',
    cohort: 'Year 10',
    dataFile: '/data/weimar_nazi_germany_past_papers.json',
    trendFile: '/data/weimar_nazi_germany_trend_analysis.json',
    gradient: 'linear-gradient(135deg, #881337 0%, #be123c 50%, #4c0519 100%)',
    primary: '#be123c',
    light: '#ffe4e6',
    boosterHtml: '/revision_sheets/year10_germany_overdue_booster.html',
    boosterPdf: '/pdfs/year10_germany_overdue_booster.pdf',
    guidePdf: null,
    guideName: null,
  },
  usa: {
    id: 'usa',
    name: 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75',
    code: '1HI0/33',
    badge: 'Paper 3: USA 1954–75 (Year 11)',
    label: '🇺🇸 USA (Yr 11)',
    cohort: 'Year 11',
    dataFile: '/data/usa_past_papers.json',
    trendFile: '/data/usa_trend_analysis.json',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #172554 100%)',
    primary: '#2563eb',
    light: '#dbeafe',
    boosterHtml: '/revision_sheets/year11_usa_overdue_booster.html',
    boosterPdf: '/pdfs/year11_usa_overdue_booster.pdf',
    guidePdf: null,
    guideName: null,
  },
};

export function renderExamTrendMatrix(container, unitId = 'edexcel_medicine') {
  let activeUnit = unitId;
  if (!UNIT_CONFIGS[activeUnit]) {
    if (activeUnit && activeUnit.includes('cme')) activeUnit = 'cme_new';
    else if (activeUnit && (activeUnit.includes('eliz') || activeUnit === 'eee'))
      activeUnit = 'eee';
    else if (activeUnit && activeUnit.includes('germany')) activeUnit = 'weimar_nazi_germany';
    else if (activeUnit && activeUnit.includes('usa')) activeUnit = 'usa';
    else activeUnit = 'edexcel_medicine';
  }

  const cfg = UNIT_CONFIGS[activeUnit];

  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 400px; color: #64748b;">
      <i class="fa-solid fa-spinner fa-spin fa-2x" style="margin-right: 12px; color: ${cfg.primary};"></i>
      <span style="font-size: 1.1rem; font-weight: 600;">Loading Exam Trend Matrix & Specification Radar...</span>
    </div>
  `;

  Promise.all([
    fetch(cfg.dataFile).then((r) => (r.ok ? r.json() : null)),
    fetch(cfg.trendFile).then((r) => (r.ok ? r.json() : null)),
  ])
    .then(([pastData, trendData]) => {
      if (!pastData || !trendData) {
        container.innerHTML = `
          <div style="padding: 40px; text-align: center; background: white; border-radius: 16px; border: 1px solid #e2e8f0; margin: 20px auto; max-width: 800px;">
            <i class="fa-solid fa-triangle-exclamation fa-3x" style="color: #f59e0b; margin-bottom: 15px;"></i>
            <h2 style="color: #0f172a; margin: 0 0 10px 0;">Data Not Available</h2>
            <p style="color: #64748b;">Unable to load past exam papers or specification trend analysis for <code>${activeUnit}</code>.</p>
          </div>
        `;
        return;
      }
      buildTrendMatrixUI(container, pastData, trendData, activeUnit, cfg);
    })
    .catch((err) => {
      console.error('Failed to load exam trend matrix:', err);
      container.innerHTML = `
        <div style="padding: 40px; text-align: center; background: white; border-radius: 16px; border: 1px solid #fee2e2; margin: 20px auto; max-width: 800px;">
          <i class="fa-solid fa-circle-exclamation fa-3x" style="color: #ef4444; margin-bottom: 15px;"></i>
          <h2 style="color: #991b1b; margin: 0 0 10px 0;">Error Loading Exam Radar</h2>
          <p style="color: #64748b;">${err.message}</p>
        </div>
      `;
    });
}

function openSectionBMockPrintWindow(yearPaper, secB, cfg) {
  if (!yearPaper || !secB || secB.length === 0) return;
  const q3a = secB.find((q) => q.q_number === 'Q3(a)') || secB[0];
  const q3b = secB.find((q) => q.q_number === 'Q3(b)');
  const q3c = secB.find((q) => q.q_number === 'Q3(c)');
  const q3d = secB.find((q) => q.q_number === 'Q3(d)');

  // Extract source & interpretation points
  const q3aPoints = q3a.indicative_content
    ? Array.isArray(q3a.indicative_content)
      ? q3a.indicative_content
      : [q3a.indicative_content]
    : [];
  const q3bPoints =
    q3b && q3b.indicative_content
      ? Array.isArray(q3b.indicative_content)
        ? q3b.indicative_content
        : [q3b.indicative_content]
      : [];
  const q3dPoints =
    q3d && q3d.indicative_content
      ? Array.isArray(q3d.indicative_content)
        ? q3d.indicative_content
        : [q3d.indicative_content]
      : [];

  const sourceBText =
    q3aPoints.find((p) => p.toLowerCase().includes('source b')) ||
    'Source B provides key contemporary eyewitness and documentary evidence directly relevant to this historical enquiry.';
  const sourceCText =
    q3aPoints.find((p) => p.toLowerCase().includes('source c')) ||
    'Source C provides contemporary statistical and contextual evidence offering an alternative historical perspective.';
  const provenanceText =
    q3aPoints.find((p) => p.toLowerCase().includes('provenance')) ||
    'Candidates should evaluate the nature, origin, and purpose of both contemporary sources in the context of the enquiry.';

  const interp1Text =
    q3bPoints.find((p) => p.toLowerCase().includes('interpretation 1')) ||
    q3dPoints.find((p) => p.toLowerCase().includes('interpretation 1')) ||
    'Interpretation 1 provides a distinct historical viewpoint focusing on specific political and societal developments.';
  const interp2Text =
    q3bPoints.find((p) => p.toLowerCase().includes('interpretation 2')) ||
    q3dPoints.find((p) => p.toLowerCase().includes('interpretation 2')) ||
    'Interpretation 2 provides an alternative historical assessment weighing different evidence and outcomes.';

  const printHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Section B Mock Exam Booklet - ${yearPaper.series} (${yearPaper.year}) - ${cfg.code || cfg.paperCode || 'Paper 3'}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body {
      font-family: "Times New Roman", Times, Georgia, serif;
      color: #000;
      background: #fff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.45;
    }
    .no-print-toolbar {
      background: #0f172a;
      color: white;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 999;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .no-print-toolbar button {
      padding: 8px 18px;
      border-radius: 6px;
      border: none;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .btn-print { background: #10b981; color: white; margin-right: 8px; }
    .btn-close { background: #475569; color: white; }
    @media print {
      .no-print-toolbar { display: none !important; }
      body { padding: 0; }
    }
    .exam-page {
      width: 100%;
      min-height: 265mm;
      page-break-after: always;
      position: relative;
      padding-bottom: 18mm;
    }
    .exam-page:last-child {
      page-break-after: avoid;
    }
    .exam-header {
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: Arial, sans-serif;
    }
    .exam-logo {
      font-size: 14pt;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .candidate-box {
      border: 1.5px solid #000;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 12px;
      font-family: Arial, sans-serif;
      font-size: 9pt;
    }
    .candidate-field {
      border-bottom: 1px dotted #000;
      min-height: 22px;
      margin-top: 3px;
    }
    .enquiry-banner {
      background: #f8fafc;
      border: 2px solid #000;
      padding: 12px 18px;
      margin: 14px 0;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    .source-box {
      border: 1.5px solid #334155;
      border-radius: 3px;
      padding: 12px 14px;
      margin-bottom: 14px;
      background: #fafafa;
    }
    .source-title {
      font-weight: bold;
      font-family: Arial, sans-serif;
      font-size: 10.5pt;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .source-provenance {
      font-style: italic;
      font-size: 9.5pt;
      margin-bottom: 8px;
      color: #1e293b;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 4px;
    }
    .source-content {
      font-size: 10.5pt;
      line-height: 1.45;
    }
    .q-prompt {
      font-weight: bold;
      margin-bottom: 6px;
      font-size: 11pt;
    }
    .q-tariff {
      float: right;
      font-family: Arial, sans-serif;
      font-weight: bold;
      font-size: 10pt;
    }
    .exam-lines {
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 23px,
        #cbd5e1 24px
      );
      line-height: 24px;
      width: 100%;
      margin-top: 8px;
      margin-bottom: 14px;
    }
    .planning-box {
      border: 1px dashed #64748b;
      background: #f8fafc;
      padding: 8px 12px;
      font-family: Arial, sans-serif;
      font-size: 9pt;
      color: #475569;
      margin-bottom: 8px;
      border-radius: 4px;
    }
    .page-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      font-family: Arial, sans-serif;
      font-size: 8.5pt;
      color: #64748b;
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
    }
  </style>
</head>
<body>
  <div class="no-print-toolbar">
    <div>
      <strong>Classroom Mock Exam Booklet:</strong> ${cfg.name || cfg.title} • Section B (${yearPaper.series})
    </div>
    <div>
      <button class="btn-print" onclick="window.print()">🖨️ Print Booklet (A4)</button>
      <button class="btn-close" onclick="window.close()">Close</button>
    </div>
  </div>

  <!-- PAGE 1: COVER & INSTRUCTIONS -->
  <div class="exam-page">
    <div class="exam-header">
      <div>
        <div class="exam-logo">Pearson Edexcel GCSE (9–1)</div>
        <div style="font-size: 10pt; color: #475569;">History Paper 3: Modern Depth Study</div>
      </div>
      <div style="text-align: right; font-weight: bold; font-size: 12pt;">
        ${cfg.code || cfg.paperCode || 'Paper 3'}
      </div>
    </div>

    <div class="candidate-box">
      <div>
        <strong>Candidate Surname:</strong>
        <div class="candidate-field"></div>
      </div>
      <div>
        <strong>Centre Number:</strong>
        <div class="candidate-field"></div>
      </div>
      <div>
        <strong>Candidate Number:</strong>
        <div class="candidate-field"></div>
      </div>
    </div>

    <div style="text-align: center; margin: 30px 0 20px 0;">
      <h1 style="font-family: Arial, sans-serif; font-size: 18pt; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        ${cfg.name || cfg.title}
      </h1>
      <h2 style="font-family: Arial, sans-serif; font-size: 14pt; margin: 0; color: #1e293b;">
        Section B: Sources and Interpretations Enquiry Booklet & Question Paper
      </h2>
      <div style="margin-top: 12px; font-weight: bold; font-size: 11pt; color: #0f172a;">
        ${yearPaper.series} Examination • 36 Marks Available (69% of Total Paper 3)
      </div>
    </div>

    <div class="enquiry-banner">
      <div style="font-size: 9pt; font-weight: bold; text-transform: uppercase; color: #475569; letter-spacing: 1px;">
        Historical Enquiry Controversy Focus:
      </div>
      <div style="font-size: 13pt; font-weight: bold; margin-top: 4px; color: #0f172a;">
        ${q3a.topic}
      </div>
    </div>

    <div style="border: 1px solid #94a3b8; border-radius: 4px; padding: 14px 18px; margin: 24px 0; font-family: Arial, sans-serif; font-size: 9.5pt; line-height: 1.5;">
      <div style="font-weight: bold; font-size: 10.5pt; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Instructions to Candidates:
      </div>
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Time allowed:</strong> 50–55 minutes for Section B.</li>
        <li>Answer <strong>ALL parts of Question 3</strong>: 3(a), 3(b), 3(c), and 3(d).</li>
        <li>Write your answers in the lined spaces provided in this booklet.</li>
        <li>Turn to <strong>Page 2</strong> for the <em>Sources and Interpretations Insert</em> before attempting questions.</li>
        <li>In Question 3(a), you must evaluate <strong>Sources B and C</strong> for utility using content and provenance.</li>
        <li>In Questions 3(b) and 3(c), compare and explain the difference between <strong>Interpretations 1 and 2</strong>.</li>
        <li>In Question 3(d), evaluate the interpretations using contextual knowledge. An additional <strong>4 marks are awarded for SPaG</strong> (spelling, punctuation, grammar, and specialist terminology).</li>
      </ul>
    </div>

    <div class="page-footer">
      <div>${cfg.code || cfg.paperCode || 'Paper 3'} • Section B Classroom Mock Booklet</div>
      <div>Page 1 of 4 (Cover & Instructions)</div>
    </div>
  </div>

  <!-- PAGE 2: SOURCES & INTERPRETATIONS INSERT -->
  <div class="exam-page">
    <div class="exam-header">
      <div style="font-size: 11pt; font-weight: bold;">SOURCES AND INTERPRETATIONS INSERT</div>
      <div style="font-size: 10pt; color: #475569;">Enquiry: ${q3a.topic}</div>
    </div>

    <!-- SOURCE B -->
    <div class="source-box">
      <div class="source-title">SOURCE B (Contemporary Primary Source)</div>
      <div class="source-provenance">Evidence & Provenance: ${provenanceText}</div>
      <div class="source-content">${sourceBText}</div>
    </div>

    <!-- SOURCE C -->
    <div class="source-box">
      <div class="source-title">SOURCE C (Contemporary Primary Source)</div>
      <div class="source-provenance">Evidence & Provenance: Contemporary historical documentation from the period.</div>
      <div class="source-content">${sourceCText}</div>
    </div>

    <!-- INTERPRETATION 1 -->
    <div class="source-box">
      <div class="source-title">INTERPRETATION 1 (Historian Evaluation)</div>
      <div class="source-provenance">From a modern historical study examining the period and debate.</div>
      <div class="source-content">${interp1Text}</div>
    </div>

    <!-- INTERPRETATION 2 -->
    <div class="source-box">
      <div class="source-title">INTERPRETATION 2 (Alternative Historian Evaluation)</div>
      <div class="source-provenance">From an alternative modern historical perspective on the controversy.</div>
      <div class="source-content">${interp2Text}</div>
    </div>

    <div class="page-footer">
      <div>${cfg.code || cfg.paperCode || 'Paper 3'} • Sources & Interpretations Insert</div>
      <div>Page 2 of 4 (Insert)</div>
    </div>
  </div>

  <!-- PAGE 3: QUESTIONS 3(a) & 3(b) -->
  <div class="exam-page">
    <div class="exam-header">
      <div style="font-size: 11pt; font-weight: bold;">QUESTION PAPER & ANSWER SECTION (PART 1)</div>
      <div style="font-size: 10pt; color: #475569;">Questions 3(a) & 3(b)</div>
    </div>

    <!-- QUESTION 3(a) -->
    <div style="margin-bottom: 22px;">
      <div class="q-tariff">[8 Marks]</div>
      <div class="q-prompt">
        Question 3(a): ${q3a.question_text}
      </div>
      <div style="font-size: 9.5pt; color: #475569; font-style: italic; margin-bottom: 8px;">
        (Candidates should assess content, author provenance, and specific historical context for both Sources B and C.)
      </div>
      <div class="exam-lines" style="height: 336px;"></div>
    </div>

    <!-- QUESTION 3(b) -->
    <div>
      <div class="q-tariff">[4 Marks]</div>
      <div class="q-prompt">
        Question 3(b): ${q3b ? q3b.question_text : 'Study Interpretations 1 and 2. What is the main difference between the views?'}
      </div>
      <div style="font-size: 9.5pt; color: #475569; font-style: italic; margin-bottom: 8px;">
        (Explain the main conceptual difference between the views, using details from both interpretations.)
      </div>
      <div class="exam-lines" style="height: 192px;"></div>
    </div>

    <div class="page-footer">
      <div>${cfg.code || cfg.paperCode || 'Paper 3'} • Answer Booklet Part 1</div>
      <div>Page 3 of 4</div>
    </div>
  </div>

  <!-- PAGE 4: QUESTIONS 3(c) & 3(d) -->
  <div class="exam-page">
    <div class="exam-header">
      <div style="font-size: 11pt; font-weight: bold;">QUESTION PAPER & ANSWER SECTION (PART 2)</div>
      <div style="font-size: 10pt; color: #475569;">Questions 3(c) & 3(d)</div>
    </div>

    <!-- QUESTION 3(c) -->
    <div style="margin-bottom: 20px;">
      <div class="q-tariff">[4 Marks]</div>
      <div class="q-prompt">
        Question 3(c): ${q3c ? q3c.question_text : 'Suggest one reason why Interpretations 1 and 2 give different views.'}
      </div>
      <div style="font-size: 9.5pt; color: #475569; font-style: italic; margin-bottom: 8px;">
        (Explain how differing evidence, focus, or source materials led the historians to their conclusions.)
      </div>
      <div class="exam-lines" style="height: 168px;"></div>
    </div>

    <!-- QUESTION 3(d) -->
    <div>
      <div class="q-tariff">[16 Marks + 4 SPaG = 20 Marks]</div>
      <div class="q-prompt">
        Question 3(d): ${q3d ? q3d.question_text : 'How far do you agree with Interpretation 2? Explain your answer using both interpretations and historical context.'}
      </div>
      <div class="planning-box">
        <strong>Optional Essay Plan:</strong> Points supporting Int 1 vs Points supporting Int 2 • Key contextual evidence & names • Concluding judgement.
      </div>
      <div class="exam-lines" style="height: 480px;"></div>
    </div>

    <div class="page-footer">
      <div>${cfg.code || cfg.paperCode || 'Paper 3'} • Total Marks for Section B: 36 (Questions: 32 | SPaG: 4)</div>
      <div>Page 4 of 4 (End of Section B)</div>
    </div>
  </div>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  }
}

function buildTrendMatrixUI(container, pastData, trendData, unitId, cfg) {
  if (!cfg) cfg = UNIT_CONFIGS[unitId] || UNIT_CONFIGS.edexcel_medicine;
  const papers = pastData.papers || [];
  const years = papers.map((p) => p.year);

  // Flatten questions
  const allQuestions = [];
  papers.forEach((p) => {
    p.questions.forEach((q) => {
      allQuestions.push({
        ...q,
        year: p.year,
        season: p.season,
        series: p.series,
      });
    });
  });

  const totalQuestions = allQuestions.length;
  const overdueCount = trendData.summary_stats ? trendData.summary_stats.overdue_topics_count : 0;
  const highTariffGaps = trendData.summary_stats
    ? trendData.summary_stats.high_tariff_gaps_count
    : 0;
  const totalPoints = trendData.summary_stats
    ? trendData.summary_stats.total_specification_points
    : 0;

  // Distinct question rows per specification
  const isMedicine = unitId === 'edexcel_medicine';
  const isMedSecAExpanded = !!window._etm_med_seca_expanded;

  const questionRowsMedicineCollapsed = [
    {
      isMedSectionA: true,
      label: 'Section A: Western Front Historic Environment Enquiry',
      sub: '16m (Q1 Features: 4m • Q2a Utility: 8m • Q2b Follow-Up: 4m)',
      match: (q) => q.section && q.section.includes('Western Front'),
    },
    {
      label: 'Q3: Similarity / Difference',
      sub: '4m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q3',
    },
    {
      label: 'Q4: Causation Explanation',
      sub: '12m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q4',
    },
    {
      label: 'Q5: Judgement Essay (Choice A)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q5',
    },
    {
      label: 'Q6: Judgement Essay (Choice B)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q6',
    },
  ];

  const questionRowsMedicineExpanded = [
    {
      label: 'Q1: Feature Questions',
      sub: '2m / 4m (Western Front)',
      match: (q) => q.q_number.startsWith('Q1'),
    },
    {
      label: 'Q2(a): Source Utility',
      sub: '8m (Western Front)',
      match: (q) => q.q_number === 'Q2(a)',
    },
    {
      label: 'Q2(b): Follow-Up Enquiry',
      sub: '4m (Western Front)',
      match: (q) => q.q_number === 'Q2(b)',
    },
    {
      label: 'Q3: Similarity / Difference',
      sub: '4m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q3',
    },
    {
      label: 'Q4: Causation Explanation',
      sub: '12m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q4',
    },
    {
      label: 'Q5: Judgement Essay (Choice A)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q5',
    },
    {
      label: 'Q6: Judgement Essay (Choice B)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q6',
    },
  ];

  const questionRowsEliz = [
    {
      label: 'Q1: Feature Questions',
      sub: '2m / 4m (Early Elizabethan England)',
      match: (q) => q.q_number.startsWith('Q1'),
    },
    {
      label: 'Q2: Causation Explanation',
      sub: '12m (Key Topic 1–3 Causation)',
      match: (q) => q.q_number === 'Q2',
    },
    {
      label: 'Q3(a): Judgement Essay Option A',
      sub: '16m + 4m SPaG (Extended Evaluation)',
      match: (q) => q.q_number === 'Q3(a)',
    },
    {
      label: 'Q3(b): Judgement Essay Option B',
      sub: '16m + 4m SPaG (Extended Evaluation)',
      match: (q) => q.q_number === 'Q3(b)',
    },
  ];

  const questionRowsCME = [
    {
      label: 'Q1: Consequence',
      sub: '4m / 8m (Direct Cause & Effect)',
      match: (q) => q.q_number.startsWith('Q1'),
    },
    {
      label: 'Q2: Narrative Account',
      sub: '8m (Chronological Analysis)',
      match: (q) => q.q_number === 'Q2',
    },
    {
      label: 'Q3(a): Importance Option 1',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(a)',
    },
    {
      label: 'Q3(b): Importance Option 2',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(b)',
    },
    {
      label: 'Q3(c): Importance Option 3',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(c)',
    },
  ];

  const isPaper3 = unitId === 'weimar_nazi_germany' || unitId === 'usa';
  const isSecBExpanded = !!window._etm_secb_expanded;

  const questionRowsGermanyCollapsed = [
    {
      label: 'Q1: Source Inference',
      sub: '4m (Source A Analysis)',
      match: (q) => q.q_number === 'Q1',
    },
    {
      label: 'Q2: Causation Explanation',
      sub: '12m (Key Topic 1–4 Causation)',
      match: (q) => q.q_number.startsWith('Q2'),
    },
    {
      isSectionB: true,
      label: 'Section B: Sources & Interpretations Enquiry',
      sub: '32m + 4m SPaG (Enquiry Focus: 3a Utility • 3b Diff • 3c Reasons • 3d Judgement)',
      match: (q) => q.q_number.startsWith('Q3'),
    },
  ];

  const questionRowsGermanyExpanded = [
    {
      label: 'Q1: Source Inference',
      sub: '4m (Source A Analysis)',
      match: (q) => q.q_number === 'Q1',
    },
    {
      label: 'Q2: Causation Explanation',
      sub: '12m (Key Topic 1–4 Causation)',
      match: (q) => q.q_number.startsWith('Q2'),
    },
    {
      label: 'Q3(a): Source Utility',
      sub: '8m (Sources B & C Enquiry)',
      match: (q) => q.q_number === 'Q3(a)',
    },
    {
      label: 'Q3(b): Interpretation Difference',
      sub: '4m (Content & View Analysis)',
      match: (q) => q.q_number === 'Q3(b)',
    },
    {
      label: 'Q3(c): Why Interpretations Differ',
      sub: '4m (Historian Weight & Evidence)',
      match: (q) => q.q_number === 'Q3(c)',
    },
    {
      label: 'Q3(d): Interpretation Evaluation',
      sub: '16m + 4m SPaG (Extended Judgement)',
      match: (q) => q.q_number === 'Q3(d)',
    },
  ];

  const questionRowsUSACollapsed = [
    {
      label: 'Q1: Source Inference',
      sub: '4m (Source A Analysis)',
      match: (q) => q.q_number === 'Q1',
    },
    {
      label: 'Q2: Causation Explanation',
      sub: '12m (Key Topic 1–4 Causation)',
      match: (q) => q.q_number.startsWith('Q2'),
    },
    {
      isSectionB: true,
      label: 'Section B: Sources & Interpretations Enquiry',
      sub: '32m + 4m SPaG (Enquiry Focus: 3a Utility • 3b Diff • 3c Reasons • 3d Judgement)',
      match: (q) => q.q_number.startsWith('Q3'),
    },
  ];

  const questionRowsUSAExpanded = [
    {
      label: 'Q1: Source Inference',
      sub: '4m (Source A Analysis)',
      match: (q) => q.q_number === 'Q1',
    },
    {
      label: 'Q2: Causation Explanation',
      sub: '12m (Key Topic 1–4 Causation)',
      match: (q) => q.q_number.startsWith('Q2'),
    },
    {
      label: 'Q3(a): Source Utility',
      sub: '8m (Sources B & C Enquiry)',
      match: (q) => q.q_number === 'Q3(a)',
    },
    {
      label: 'Q3(b): Interpretation Difference',
      sub: '4m (Content & View Analysis)',
      match: (q) => q.q_number === 'Q3(b)',
    },
    {
      label: 'Q3(c): Why Interpretations Differ',
      sub: '4m (Historian Weight & Evidence)',
      match: (q) => q.q_number === 'Q3(c)',
    },
    {
      label: 'Q3(d): Interpretation Evaluation',
      sub: '16m + 4m SPaG (Extended Judgement)',
      match: (q) => q.q_number === 'Q3(d)',
    },
  ];

  let currentRows = isMedSecAExpanded
    ? questionRowsMedicineExpanded
    : questionRowsMedicineCollapsed;
  if (unitId === 'eee') {
    currentRows = questionRowsEliz;
  } else if (unitId === 'cme_new') {
    currentRows = questionRowsCME;
  } else if (unitId === 'weimar_nazi_germany') {
    currentRows = isSecBExpanded ? questionRowsGermanyExpanded : questionRowsGermanyCollapsed;
  } else if (unitId === 'usa') {
    currentRows = isSecBExpanded ? questionRowsUSAExpanded : questionRowsUSACollapsed;
  }

  const html = `
    <style>
      .etm-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 10px 20px 60px 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      .etm-hero {
        background: ${cfg.gradient};
        border-radius: 20px;
        padding: 35px 40px;
        color: white;
        margin-bottom: 30px;
        box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3);
        position: relative;
        overflow: hidden;
      }
      .etm-hero::after {
        content: '';
        position: absolute;
        top: -60px; right: -60px; width: 260px; height: 260px;
        background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
        border-radius: 50%;
      }
      .etm-metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 25px;
      }
      .etm-metric-box {
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 14px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .etm-tabs-bar {
        display: flex;
        gap: 10px;
        border-bottom: 2px solid #e2e8f0;
        margin-bottom: 25px;
        overflow-x: auto;
        padding-bottom: 2px;
      }
      .etm-tab-btn {
        background: none;
        border: none;
        padding: 12px 24px;
        font-size: 1.05rem;
        font-weight: 700;
        color: #64748b;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
      .etm-tab-btn:hover {
        color: #0f172a;
      }
      .etm-tab-btn.active {
        color: ${cfg.primary};
        border-bottom-color: ${cfg.primary};
      }

      .etm-table-wrap {
        overflow-x: auto;
        background: white;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);
      }
      .etm-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        min-width: 1100px;
      }
      .etm-table th {
        background: #f8fafc;
        color: #1e293b;
        padding: 16px;
        font-weight: 700;
        font-size: 0.95rem;
        border-bottom: 2px solid #cbd5e1;
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .etm-table td {
        padding: 14px;
        border-bottom: 1px solid #e2e8f0;
        border-right: 1px solid #f1f5f9;
        vertical-align: top;
      }
      .etm-table tr:hover td {
        background-color: #fafafa;
      }
      .etm-q-card {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 0.85rem;
        color: #1e293b;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 6px;
      }
      .etm-q-card:hover {
        transform: translateY(-2px);
        background: white;
        border-color: ${cfg.primary};
        box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1);
      }
      .etm-tariff-badge {
        font-size: 0.72rem;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 6px;
        text-transform: uppercase;
        align-self: flex-start;
      }
      .etm-tariff-2m { background: #e0e7ff; color: #3730a3; }
      .etm-tariff-4m { background: #dbeafe; color: #1e40af; }
      .etm-tariff-8m { background: #fef3c7; color: #92400e; }
      .etm-tariff-12m { background: #ffedd5; color: #9a3412; }
      .etm-tariff-16m { background: #fce7f3; color: #9d174d; }

      /* Modal / Drawer */
      .etm-modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      .etm-modal-backdrop.open {
        opacity: 1;
        pointer-events: auto;
      }
      .etm-modal-card {
        background: white;
        border-radius: 20px;
        max-width: 780px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
        padding: 35px 40px;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .etm-modal-backdrop.open .etm-modal-card {
        transform: translateY(0);
      }
      .etm-badge-overdue-high {
        background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;
      }
      .etm-badge-overdue-med {
        background: #fef3c7; color: #92400e; border: 1px solid #fde68a;
      }
      .etm-badge-overdue-recent {
        background: #dcfce7; color: #166534; border: 1px solid #86efac;
      }
    </style>

    <div class="etm-container">
      <!-- HERO BANNER -->
      <div class="etm-hero">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
              <i class="fa-solid fa-graduation-cap"></i> Pearson Edexcel GCSE (9–1) Archive
            </div>
            <h1 style="margin: 0; font-size: 2.3rem; font-weight: 800; line-height: 1.2;">
              Past Exam Matrix & Overdue Topic Radar
            </h1>
            <p style="margin: 10px 0 0 0; font-size: 1.15rem; opacity: 0.9; max-width: 800px;">
              ${pastData.paper_name} (${pastData.paper_code}) • Comprehensive 2018–2026 examination history, indicative mark schemes, and syllabus gap predictions.
            </p>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.85;">Switch GCSE Unit:</div>
            <div class="etm-unit-pills" style="display: flex; gap: 6px; flex-wrap: wrap; background: rgba(0,0,0,0.28); backdrop-filter: blur(8px); padding: 5px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.25);">
              ${Object.keys(UNIT_CONFIGS)
                .map((k) => {
                  const item = UNIT_CONFIGS[k];
                  const isActive = k === unitId;
                  return `
                  <button class="etm-unit-pill ${isActive ? 'active' : ''}" data-unit="${k}" style="background: ${isActive ? 'white' : 'transparent'}; color: ${isActive ? '#0f172a' : 'white'}; border: none; padding: 7px 12px; border-radius: 8px; font-size: 0.82rem; font-weight: ${isActive ? '800' : '600'}; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; box-shadow: ${isActive ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'};">
                    ${item.label}
                  </button>
                `;
                })
                .join('')}
            </div>
          </div>
        </div>

        <div class="etm-metrics-grid">
          <div class="etm-metric-box">
            <i class="fa-solid fa-file-lines fa-2x" style="color: #67e8f9;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${totalQuestions} Questions</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">${papers.length} Exam Series (2018–2026)</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: #fca5a5;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${overdueCount} Overdue</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">Unexamined or 5+ yrs unexamined</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-bullseye fa-2x" style="color: #fde047;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${highTariffGaps} Essay Gaps</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">Never set as 12m or 16m essays</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-list-check fa-2x" style="color: #a7f3d0;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${totalPoints} Spec Points</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">100% Syllabus Coverage Mapped</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS BAR -->
      <div class="etm-tabs-bar">
        <button class="etm-tab-btn active" data-tab="matrix">
          <i class="fa-solid fa-table-cells"></i> Year × Question Matrix (2018–2026)
        </button>
        <button class="etm-tab-btn" data-tab="radar">
          <i class="fa-solid fa-radar"></i> Syllabus Overdue Radar & Gap Heatmap
        </button>
        <button class="etm-tab-btn" data-tab="vault">
          <i class="fa-solid fa-vault"></i> Official PDF Materials Vault
        </button>
      </div>

      <!-- TAB 1: MATRIX VIEW -->
      <div id="etm-view-matrix" class="etm-tab-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <p style="margin: 0; color: #475569; font-size: 0.95rem;">
              Click any question card to inspect the prompt, stimulus points, mark scheme indicative content, and examiner pitfalls.
            </p>
            ${
              isPaper3
                ? `
              <button id="etm-secb-toggle-btn" style="background: ${isSecBExpanded ? '#ffffff' : cfg.light}; color: ${isSecBExpanded ? '#0f172a' : cfg.primary}; border: 1px solid ${isSecBExpanded ? '#cbd5e1' : cfg.primary}; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;">
                <i class="fa-solid ${isSecBExpanded ? 'fa-compress' : 'fa-layer-group'}"></i>
                <span>${isSecBExpanded ? '▾ Collapse Section B (Unified Enquiry Focus)' : '▸ Expand Section B Sub-Questions (3a–3d)'}</span>
              </button>
            `
                : ''
            }
            ${
              isMedicine
                ? `
              <button id="etm-med-seca-toggle-btn" style="background: ${isMedSecAExpanded ? '#ffffff' : cfg.light}; color: ${isMedSecAExpanded ? '#0f172a' : cfg.primary}; border: 1px solid ${isMedSecAExpanded ? '#cbd5e1' : cfg.primary}; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;">
                <i class="fa-solid ${isMedSecAExpanded ? 'fa-compress' : 'fa-layer-group'}"></i>
                <span>${isMedSecAExpanded ? '▾ Collapse Section A (Western Front Enquiry Focus)' : '▸ Expand Section A Sub-Questions (Q1, 2a, 2b)'}</span>
              </button>
            `
                : ''
            }
          </div>
          <div style="display: flex; gap: 6px; align-items: center; font-size: 0.8rem; font-weight: 600;">
            <span style="color: #64748b;">Key:</span>
            <span class="etm-tariff-badge etm-tariff-2m">2m</span>
            <span class="etm-tariff-badge etm-tariff-4m">4m</span>
            <span class="etm-tariff-badge etm-tariff-8m">8m</span>
            <span class="etm-tariff-badge etm-tariff-12m">12m</span>
            <span class="etm-tariff-badge etm-tariff-16m">16m</span>
          </div>
        </div>

        <div class="etm-table-wrap">
          <table class="etm-table">
            <thead>
              <tr>
                <th style="min-width: 220px; width: 220px; border-right: 2px solid #cbd5e1;">Question Focus</th>
                ${years.map((y) => `<th style="text-align: center; min-width: 140px;">${y === 2026 ? '2026 (Specimen)' : y}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${currentRows
                .map((row) => {
                  return `
                    <tr>
                      <td style="background: #f8fafc; font-weight: 700; border-right: 2px solid #e2e8f0;">
                        <div style="color: #0f172a; font-size: 0.95rem;">${row.label}</div>
                        <div style="color: #64748b; font-size: 0.78rem; font-weight: 500; margin-top: 4px;">${row.sub}</div>
                      </td>
                      ${years
                        .map((yr) => {
                          const yearPaper = papers.find((p) => p.year === yr);
                          if (row.isMedSectionA) {
                            const secA = yearPaper
                              ? yearPaper.questions.filter(
                                  (q) => q.section && q.section.includes('Western Front'),
                                )
                              : [];
                            const q2a = secA.find((q) => q.q_number === 'Q2(a)') || secA[0];
                            if (!q2a) {
                              return `<td style="color: #cbd5e1; text-align: center; font-size: 0.8rem; font-style: italic;">—</td>`;
                            }
                            const cleanTopic = q2a.topic.replace(/^Western Front:\s*/i, '');
                            return `
                              <td>
                                <div class="etm-q-card etm-med-seca-card" data-med-year="${yr}" data-qid="${q2a.q_id}" title="Click to view full Western Front Historic Environment Dossier (16m)" style="border-left: 4px solid ${cfg.primary}; background: #ffffff;">
                                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <span style="font-weight: 800; font-size: 0.72rem; color: ${cfg.primary}; text-transform: uppercase; letter-spacing: 0.4px;">
                                      <i class="fa-solid fa-crosshairs"></i> Western Front Enquiry
                                    </span>
                                    <span class="etm-tariff-badge" style="background: ${cfg.primary}; color: white; font-size: 0.68rem; font-weight: 800; padding: 2px 6px;">16m (31%)</span>
                                  </div>
                                  <div style="font-weight: 800; color: #0f172a; line-height: 1.35; font-size: 0.88rem; margin-bottom: 6px;">
                                    ${cleanTopic}
                                  </div>
                                  <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">Q1: 4m</span>
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">Q2a: 8m</span>
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">Q2b: 4m</span>
                                  </div>
                                </div>
                              </td>
                            `;
                          }
                          if (row.isSectionB) {
                            const secB = yearPaper
                              ? yearPaper.questions.filter((q) => q.q_number.startsWith('Q3'))
                              : [];
                            const q3a = secB.find((q) => q.q_number === 'Q3(a)') || secB[0];
                            if (!q3a) {
                              return `<td style="color: #cbd5e1; text-align: center; font-size: 0.8rem; font-style: italic;">—</td>`;
                            }
                            return `
                              <td>
                                <div class="etm-q-card etm-secb-card" data-secb-year="${yr}" data-qid="${q3a.q_id}" title="Click to view full Section B Enquiry Dossier (32m + 4m SPaG)" style="border-left: 4px solid ${cfg.primary}; background: #ffffff;">
                                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <span style="font-weight: 800; font-size: 0.72rem; color: ${cfg.primary}; text-transform: uppercase; letter-spacing: 0.4px;">
                                      <i class="fa-solid fa-layer-group"></i> Section B Enquiry
                                    </span>
                                    <span class="etm-tariff-badge" style="background: ${cfg.primary}; color: white; font-size: 0.68rem; font-weight: 800; padding: 2px 6px;">32m + 4m SPaG</span>
                                  </div>
                                  <div style="font-weight: 800; color: #0f172a; line-height: 1.35; font-size: 0.88rem; margin-bottom: 6px;">
                                    ${q3a.topic}
                                  </div>
                                  <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">3a: 8m</span>
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">3b: 4m</span>
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">3c: 4m</span>
                                    <span style="background: #f1f5f9; color: #475569; font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; font-weight: 700;">3d: 16m</span>
                                  </div>
                                </div>
                              </td>
                            `;
                          }
                          const matchedQs = yearPaper
                            ? yearPaper.questions.filter((q) => row.match(q))
                            : [];
                          if (matchedQs.length === 0) {
                            return `<td style="color: #cbd5e1; text-align: center; font-size: 0.8rem; font-style: italic;">—</td>`;
                          }
                          return `
                            <td>
                              ${matchedQs
                                .map((q) => {
                                  const tariffClass = `etm-tariff-${q.tariff}m`;
                                  return `
                                    <div class="etm-q-card" data-qid="${q.q_id}" title="Click to view question & mark scheme">
                                      <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-weight: 800; font-size: 0.75rem; color: #475569;">${q.q_number}</span>
                                        <span class="etm-tariff-badge ${tariffClass}">${q.tariff} Marks</span>
                                      </div>
                                      <div style="font-weight: 700; color: #0f172a; line-height: 1.3;">${q.topic}</div>
                                    </div>
                                  `;
                                })
                                .join('')}
                            </td>
                          `;
                        })
                        .join('')}
                    </tr>
                  `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 2: SPECIFICATION OVERDUE RADAR -->
      <div id="etm-view-radar" class="etm-tab-content" style="display: none;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 25px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
          <div>
            <h3 style="margin: 0 0 6px 0; color: #0f172a;">Specification Overdue & Probability Filter</h3>
            <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Filter syllabus sub-topics based on their historical exam frequency and overdue rating.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            ${
              cfg.boosterHtml
                ? `
              <a href="${cfg.boosterHtml}" target="_blank" style="background: linear-gradient(135deg, ${cfg.primary}, #0f172a); color: white; text-decoration: none; padding: 7px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 7px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <i class="fa-solid fa-file-pdf"></i> Print 2-Page Overdue Booster (${cfg.cohort || 'GCSE'})
              </a>
            `
                : ''
            }
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="etm-radar-filters">
              <button class="etm-pill active" data-filter="all" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #cbd5e1; background: #0f172a; color: white; cursor: pointer; font-weight: 600; font-size: 0.85rem;">All Topics (${totalPoints})</button>
              <button class="etm-pill" data-filter="high" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #fca5a5; background: #fee2e2; color: #991b1b; cursor: pointer; font-weight: 700; font-size: 0.85rem;">🔴 Highly Overdue / Unexamined (${overdueCount})</button>
              <button class="etm-pill" data-filter="gaps" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #fde68a; background: #fef3c7; color: #92400e; cursor: pointer; font-weight: 700; font-size: 0.85rem;">🎯 High-Tariff Essay Gaps (${highTariffGaps})</button>
            </div>
          </div>
        </div>

        <div id="etm-radar-list" style="display: flex; flex-direction: column; gap: 20px;">
          ${trendData.sections
            .map((sec) => {
              return `
                <div class="etm-sec-block" style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                  <div style="background: #f8fafc; padding: 18px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.15rem; color: #1e293b;">${sec.title}</h3>
                  </div>
                  <div style="padding: 20px 24px; display: flex; flex-direction: column; gap: 15px;">
                    ${sec.topics
                      .map((top) => {
                        return `
                          <div style="margin-bottom: 10px;">
                            <h4 style="margin: 0 0 12px 0; color: #334155; font-size: 1.02rem; border-left: 3px solid ${cfg.primary}; padding-left: 10px;">${top.title}</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                              ${top.points
                                .map((pt) => {
                                  let badgeClass = 'etm-badge-overdue-recent';
                                  let badgeLabel = `Examined in ${pt.last_examined}`;
                                  if (pt.overdue_status === 'high') {
                                    badgeClass = 'etm-badge-overdue-high';
                                    badgeLabel =
                                      pt.last_examined === 'Never'
                                        ? 'Never Examined (2018–2026)'
                                        : `Overdue: Last set in ${pt.last_examined}`;
                                  } else if (pt.overdue_status === 'medium') {
                                    badgeClass = 'etm-badge-overdue-med';
                                    badgeLabel = `Warm: Last set in ${pt.last_examined}`;
                                  }

                                  return `
                                    <div class="etm-radar-item" data-overdue="${pt.overdue_status}" data-gap="${pt.high_tariff_gap ? 'true' : 'false'}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; transition: border-color 0.2s;">
                                      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; flex-wrap: wrap;">
                                        <div style="flex: 1; font-size: 0.95rem; color: #1e293b; line-height: 1.5;">
                                          ${pt.point_text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                                        </div>
                                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                          <span style="font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px;" class="${badgeClass}">
                                            ${badgeLabel}
                                          </span>
                                          <span style="font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 12px;">
                                            ${pt.exam_count}x in Exams
                                          </span>
                                        </div>
                                      </div>
                                      
                                      <div style="margin-top: 12px; background: #f8fafc; border-left: 3px solid ${pt.overdue_status === 'high' ? '#ef4444' : '#3b82f6'}; padding: 8px 12px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #334155;">
                                        ${pt.teacher_note}
                                      </div>
                                      
                                      ${
                                        pt.matched_questions && pt.matched_questions.length > 0
                                          ? `
                                          <div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Tested in:</span>
                                            ${pt.matched_questions
                                              .map(
                                                (mq) => `
                                                  <span class="etm-q-card-mini" data-qid="${mq.q_id}" style="cursor: pointer; background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 8px; font-size: 0.75rem; font-weight: 700; color: #1e293b;" title="Click to view question">
                                                    ${mq.year} ${mq.q_number} (${mq.tariff}m)
                                                  </span>
                                                `,
                                              )
                                              .join('')}
                                          </div>
                                        `
                                          : ''
                                      }
                                    </div>
                                  `;
                                })
                                .join('')}
                            </div>
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- TAB 3: OFFICIAL PDF VAULT -->
      <div id="etm-view-vault" class="etm-tab-content" style="display: none;">
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 10px 0; color: #0f172a;"><i class="fa-solid fa-book-bookmark" style="color: ${cfg.primary};"></i> Official Edexcel Exam Archive</h2>
          <p style="color: #64748b; font-size: 1rem; margin-bottom: 25px;">
            The History Hub is synchronized directly with your local Google Drive exam repository. Below are all verified official Question Papers, Mark Schemes, and Examiner Reports.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
            ${papers
              .map((p) => {
                return `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-weight: 800; font-size: 1.15rem; color: #0f172a;">${p.series} (${p.paper_code})</span>
                        <span style="background: #e2e8f0; color: #334155; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${p.questions.length} Questions</span>
                      </div>
                      <p style="color: #64748b; font-size: 0.88rem; margin: 0 0 15px 0;">
                        Official Pearson Edexcel Examination Series with complete question paper, mark scheme, and examiner report insights.
                      </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <button class="main-btn etm-btn-view-paper" data-year="${p.year}" style="flex: 1; padding: 8px 12px; font-size: 0.82rem; background: white; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-weight: 600; color: #1e293b;">
                        <i class="fa-solid fa-list-ol"></i> View Questions
                      </button>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- QUESTION INSPECTOR MODAL -->
    <div id="etm-modal" class="etm-modal-backdrop">
      <div class="etm-modal-card">
        <button id="etm-modal-close" style="position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #475569; display: flex; justify-content: center; align-items: center;">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div id="etm-modal-content"></div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // --------------------------------------------------------------------------
  // Interactivity & Event Handlers
  // --------------------------------------------------------------------------

  // Switch between GCSE units
  container.querySelectorAll('.etm-unit-pill').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUnit = btn.dataset.unit;
      if (targetUnit === unitId) return;
      if (window.switchView) {
        window.switchView('mock-exams', targetUnit);
      } else {
        renderExamTrendMatrix(container, targetUnit);
      }
    });
  });

  // Tab navigation
  const tabBtns = container.querySelectorAll('.etm-tab-btn');
  const tabContents = {
    matrix: document.getElementById('etm-view-matrix'),
    radar: document.getElementById('etm-view-radar'),
    vault: document.getElementById('etm-view-vault'),
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      Object.keys(tabContents).forEach((k) => {
        if (tabContents[k]) tabContents[k].style.display = k === target ? 'block' : 'none';
      });
    });
  });

  // Radar Filters
  const filterBtns = container.querySelectorAll('#etm-radar-filters .etm-pill');
  const radarItems = container.querySelectorAll('.etm-radar-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.style.background = '#f1f5f9';
        b.style.color = '#334155';
        b.style.borderColor = '#cbd5e1';
      });
      btn.classList.add('active');
      btn.style.background = '#0f172a';
      btn.style.color = 'white';

      const filter = btn.dataset.filter;
      radarItems.forEach((item) => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (filter === 'high') {
          item.style.display = item.dataset.overdue === 'high' ? 'block' : 'none';
        } else if (filter === 'gaps') {
          item.style.display = item.dataset.gap === 'true' ? 'block' : 'none';
        }
      });
    });
  });

  // Modal Setup
  const modal = document.getElementById('etm-modal');
  const modalClose = document.getElementById('etm-modal-close');
  const modalContent = document.getElementById('etm-modal-content');

  const openQuestionModal = (qid) => {
    const q = allQuestions.find((item) => item.q_id === qid);
    if (!q) return;

    modalContent.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
        <span style="background: ${cfg.primary}; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem;">
          ${q.series} (${q.year})
        </span>
        <span style="background: #f1f5f9; color: #1e293b; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85rem;">
          ${q.q_number} • ${q.tariff} Marks
        </span>
        <span style="color: #64748b; font-size: 0.85rem; font-weight: 600;">
          ${q.section || 'Exam Question'}
        </span>
      </div>

      <h2 style="color: #0f172a; margin: 0 0 15px 0; font-size: 1.45rem; line-height: 1.35; font-family: 'Playfair Display', serif;">
        ${q.question_text}
      </h2>

      ${
        q.stimulus
          ? `
          <div style="background: #f8fafc; border-left: 4px solid #cbd5e1; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 0.95rem; color: #475569; margin-bottom: 20px; font-style: italic; white-space: pre-wrap;">
            <strong>Stimulus provided in exam:</strong><br>${q.stimulus}
          </div>
        `
          : ''
      }

      <!-- EXAMINER REPORT WARNING -->
      ${
        q.examiner_tips
          ? `
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="color: #b45309; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-triangle-exclamation"></i> Chief Examiner Pitfall Warning
            </div>
            <div style="color: #92400e; font-size: 0.95rem; line-height: 1.5;">
              ${q.examiner_tips}
            </div>
          </div>
        `
          : ''
      }

      <!-- INDICATIVE CONTENT -->
      <div style="margin-bottom: 25px;">
        <h4 style="color: #1e293b; font-size: 1rem; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-check-double" style="color: #10b981;"></i> Mark Scheme Indicative Content
        </h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 0.95rem; line-height: 1.6;">
          ${
            Array.isArray(q.indicative_content)
              ? q.indicative_content
                  .map((pt) => `<li style="margin-bottom: 8px;">${pt}</li>`)
                  .join('')
              : `<li>${q.indicative_content}</li>`
          }
        </ul>
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <button id="etm-modal-practice-btn" style="background: linear-gradient(135deg, #3b82f6, #4f46e5); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-stopwatch"></i> Practice in Exam Hall With Timer
        </button>
        ${
          cfg.guidePdf
            ? `
            <a href="${cfg.guidePdf}" target="_blank" style="text-decoration: none; background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-book-open"></i> Open in Visual Revision Guide
            </a>
          `
            : ''
        }
      </div>
    `;

    modal.classList.add('open');

    // Wire practice button to load into Exam Practice Zone
    const practiceBtn = document.getElementById('etm-modal-practice-btn');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', async () => {
        modal.classList.remove('open');
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
          const { renderExamPracticeZone } = await import('./exam_practice_zone.js');
          const activeUnitData = window.currentUnitData || {};
          renderExamPracticeZone(contentArea, activeUnitData);

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });

          // Pre-populate question into display area
          setTimeout(() => {
            const displayArea = document.getElementById('epz-question-display');
            const controls = document.getElementById('epz-controls');
            const qMeta = document.getElementById('epz-q-meta');
            const qText = document.getElementById('epz-q-text');
            const qStimulus = document.getElementById('epz-q-stimulus');
            const wagollPanel = document.getElementById('epz-wagoll-panel');
            const wagollBtn = document.getElementById('epz-wagoll-btn');

            if (displayArea && qText) {
              if (controls) controls.style.display = 'none';
              displayArea.style.display = 'block';
              qMeta.textContent = `${q.year} Past Paper • ${q.q_number} • ${q.tariff} Marks`;
              qText.textContent = q.question_text;
              if (qStimulus && q.stimulus) {
                qStimulus.style.display = 'block';
                qStimulus.textContent = q.stimulus;
              }
              if (wagollPanel && q.indicative_content) {
                const points = Array.isArray(q.indicative_content)
                  ? q.indicative_content.join('\n\n• ')
                  : q.indicative_content;
                wagollPanel.textContent = 'MARK SCHEME INDICATIVE CONTENT:\n\n• ' + points;
                if (wagollBtn) wagollBtn.style.display = 'inline-block';
              }
            }
          }, 100);
        }
      });
    }
  };

  // Section B Enquiry Dossier Modal (Collapses 3a, 3b, 3c, 3d into a cohesive historical enquiry)
  const openSectionBModal = (yr) => {
    const yearPaper = papers.find((p) => p.year === yr);
    if (!yearPaper) return;
    const secB = yearPaper.questions.filter(
      (q) => q.q_number.startsWith('Q3') || q.section === 'Section B',
    );
    if (secB.length === 0) return;

    const q3a = secB.find((q) => q.q_number === 'Q3(a)') || secB[0];
    const q3d = secB.find((q) => q.q_number === 'Q3(d)');

    modalContent.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
        <span style="background: ${cfg.primary}; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem;">
          ${yearPaper.series} (${yr})
        </span>
        <span style="background: #0f172a; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85rem;">
          Section B Enquiry • 32 Marks + 4 SPaG
        </span>
        <span style="color: #64748b; font-size: 0.85rem; font-weight: 600;">
          69% of Total Paper Mark
        </span>
      </div>

      <div style="background: linear-gradient(135deg, ${cfg.light}, #ffffff); border: 2px solid ${cfg.primary}; border-radius: 14px; padding: 18px 22px; margin-bottom: 24px;">
        <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: ${cfg.primary}; letter-spacing: 0.5px; margin-bottom: 4px;">
          Enquiry Focus & Historical Controversy:
        </div>
        <h2 style="margin: 0; color: #0f172a; font-size: 1.45rem; line-height: 1.3; font-family: 'Playfair Display', serif;">
          ${q3a.topic}
        </h2>
        <p style="margin: 8px 0 0 0; color: #475569; font-size: 0.9rem; line-height: 1.45;">
          All four questions in Section B investigate this singular historical controversy using two contemporary Sources (B & C) and two historian Interpretations (1 & 2).
        </p>
      </div>

      <!-- 4 SUB QUESTIONS GRID -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 25px;">
        ${secB
          .map((q) => {
            const points = q.indicative_content
              ? Array.isArray(q.indicative_content)
                ? q.indicative_content
                : [q.indicative_content]
              : [];
            return `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #0f172a; color: white; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.78rem;">
                    ${q.q_number}
                  </span>
                  <span style="font-weight: 700; color: #334155; font-size: 0.85rem;">
                    ${
                      q.q_number === 'Q3(a)'
                        ? 'Source Utility (Sources B & C)'
                        : q.q_number === 'Q3(b)'
                          ? 'Difference of Views (Interpretations 1 & 2)'
                          : q.q_number === 'Q3(c)'
                            ? 'Reasons for Difference'
                            : 'Interpretation Evaluation & Judgement'
                    }
                  </span>
                </div>
                <span class="etm-tariff-badge etm-tariff-${q.tariff}m" style="font-size: 0.72rem;">${q.tariff} Marks ${q.q_number === 'Q3(d)' ? '+ 4 SPaG' : ''}</span>
              </div>
              <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: 600; font-size: 0.95rem; line-height: 1.4;">
                ${q.question_text}
              </p>
              ${
                q.stimulus
                  ? `
                <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; color: #334155; margin-bottom: 10px;">
                  <strong>Stimulus Prompts:</strong> ${q.stimulus}
                </div>
              `
                  : ''
              }
              ${
                points.length > 0
                  ? `
                <details style="font-size: 0.82rem; color: #475569; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px;">
                  <summary style="cursor: pointer; font-weight: 700; color: #0f172a;">
                    View Mark Scheme Indicative Content (${points.length} points)
                  </summary>
                  <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.45;">
                    ${points.map((pt) => `<li style="margin-bottom: 4px;">${pt}</li>`).join('')}
                  </ul>
                </details>
              `
                  : ''
              }
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <button id="etm-modal-print-mock-pack" style="background: linear-gradient(135deg, #059669, #0f766e); color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
          <i class="fa-solid fa-print"></i> Generate 4-Page Classroom Mock Booklet
        </button>
        ${
          q3d
            ? `
          <button id="etm-modal-practice-3d-btn" style="background: linear-gradient(135deg, ${cfg.primary}, #0f172a); color: white; border: none; padding: 12px 22px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-stopwatch"></i> Practice 16m Essay (Q3d) in Exam Hall
          </button>
        `
            : ''
        }
        <button id="etm-modal-close-inner" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; border-radius: 10px; font-weight: 600; cursor: pointer;">
          Close Dossier
        </button>
      </div>
    `;

    modal.classList.add('open');

    // Wire close inner button
    const closeInnerBtn = document.getElementById('etm-modal-close-inner');
    if (closeInnerBtn) {
      closeInnerBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    // Wire print mock pack button
    const printMockBtn = document.getElementById('etm-modal-print-mock-pack');
    if (printMockBtn) {
      printMockBtn.addEventListener('click', () => {
        openSectionBMockPrintWindow(yearPaper, secB, cfg);
      });
    }

    // Wire practice 3d button
    const practice3dBtn = document.getElementById('etm-modal-practice-3d-btn');
    if (practice3dBtn && q3d) {
      practice3dBtn.addEventListener('click', async () => {
        modal.classList.remove('open');
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
          const { renderExamPracticeZone } = await import('./exam_practice_zone.js');
          const activeUnitData = window.currentUnitData || {};
          renderExamPracticeZone(contentArea, activeUnitData);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            const displayArea = document.getElementById('epz-question-display');
            const controls = document.getElementById('epz-controls');
            const qMeta = document.getElementById('epz-q-meta');
            const qText = document.getElementById('epz-q-text');
            const qStimulus = document.getElementById('epz-q-stimulus');
            const wagollPanel = document.getElementById('epz-wagoll-panel');
            const wagollBtn = document.getElementById('epz-wagoll-btn');

            if (displayArea && qText) {
              if (controls) controls.style.display = 'none';
              displayArea.style.display = 'block';
              qMeta.textContent = `${q3d.year} Past Paper • ${q3d.q_number} • ${q3d.tariff} Marks + 4 SPaG`;
              qText.textContent = q3d.question_text;
              if (qStimulus && q3d.stimulus) {
                qStimulus.style.display = 'block';
                qStimulus.textContent = q3d.stimulus;
              }
              if (wagollPanel && q3d.indicative_content) {
                const pts = Array.isArray(q3d.indicative_content)
                  ? q3d.indicative_content.join('\n\n• ')
                  : q3d.indicative_content;
                wagollPanel.textContent = 'MARK SCHEME INDICATIVE CONTENT:\n\n• ' + pts;
                if (wagollBtn) wagollBtn.style.display = 'inline-block';
              }
            }
          }, 100);
        }
      });
    }
  };

  // Medicine Section A Western Front Historic Environment Dossier Modal
  const openMedicineSectionAModal = (yr) => {
    const yearPaper = papers.find((p) => p.year === yr);
    if (!yearPaper) return;
    const secA = yearPaper.questions.filter(
      (q) => q.section && q.section.includes('Western Front'),
    );
    if (secA.length === 0) return;

    const q1 = secA.find((q) => q.q_number.startsWith('Q1'));
    const q2a = secA.find((q) => q.q_number === 'Q2(a)') || secA[0];
    const q2b = secA.find((q) => q.q_number === 'Q2(b)');

    modalContent.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
        <span style="background: ${cfg.primary}; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem;">
          ${yearPaper.series} (${yr})
        </span>
        <span style="background: #0f172a; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85rem;">
          Section A: Western Front • 16 Marks
        </span>
        <span style="color: #64748b; font-size: 0.85rem; font-weight: 600;">
          31% of Paper 1 Total
        </span>
      </div>

      <div style="background: linear-gradient(135deg, ${cfg.light}, #ffffff); border: 2px solid ${cfg.primary}; border-radius: 14px; padding: 18px 22px; margin-bottom: 24px;">
        <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: ${cfg.primary}; letter-spacing: 0.5px; margin-bottom: 4px;">
          Historic Environment Enquiry Topic:
        </div>
        <h2 style="margin: 0; color: #0f172a; font-size: 1.45rem; line-height: 1.3; font-family: 'Playfair Display', serif;">
          ${q2a.topic}
        </h2>
        <p style="margin: 8px 0 0 0; color: #475569; font-size: 0.9rem; line-height: 1.45;">
          The British sector of the Western Front, 1914–18: injuries, treatment and the trenches. Section A tests factual recall (Q1: 4m), source utility (Q2a: 8m), and historical enquiry follow-up methods (Q2b: 4m).
        </p>
      </div>

      <!-- 3 QUESTIONS CARDS -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 25px;">
        ${
          q1
            ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: #0f172a; color: white; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.78rem;">
                  Q1
                </span>
                <span style="font-weight: 700; color: #334155; font-size: 0.85rem;">
                  Feature Questions (Recall of Historic Environment)
                </span>
              </div>
              <span class="etm-tariff-badge etm-tariff-4m" style="font-size: 0.72rem;">4 Marks (2×2m)</span>
            </div>
            <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: 600; font-size: 0.95rem; line-height: 1.4;">
              ${q1.question_text}
            </p>
            ${
              q1.indicative_content
                ? `
              <details style="font-size: 0.82rem; color: #475569; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px;">
                <summary style="cursor: pointer; font-weight: 700; color: #0f172a;">
                  View Mark Scheme Indicative Features & Supporting Detail
                </summary>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.45;">
                  ${(Array.isArray(q1.indicative_content) ? q1.indicative_content : [q1.indicative_content]).map((pt) => `<li style="margin-bottom: 4px;">${pt}</li>`).join('')}
                </ul>
              </details>
            `
                : ''
            }
          </div>
        `
            : ''
        }

        ${
          q2a
            ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: #0f172a; color: white; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.78rem;">
                  Q2(a)
                </span>
                <span style="font-weight: 700; color: #334155; font-size: 0.85rem;">
                  Source Utility (Sources A & B)
                </span>
              </div>
              <span class="etm-tariff-badge etm-tariff-8m" style="font-size: 0.72rem;">8 Marks</span>
            </div>
            <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: 600; font-size: 0.95rem; line-height: 1.4;">
              ${q2a.question_text}
            </p>
            ${
              q2a.stimulus
                ? `
              <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; color: #334155; margin-bottom: 10px;">
                <strong>Sources Provided:</strong> ${q2a.stimulus}
              </div>
            `
                : ''
            }
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 12px; font-size: 0.82rem; color: #1e40af; margin-bottom: 10px;">
              <strong>Provenance Scaffolding (Examiner Clue):</strong> Consider the author (e.g. army surgeon, nurse, official war artist), audience (private diary vs published propaganda), and date/location. How does this context affect its utility for this specific enquiry?
            </div>
            ${
              q2a.indicative_content
                ? `
              <details style="font-size: 0.82rem; color: #475569; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px;">
                <summary style="cursor: pointer; font-weight: 700; color: #0f172a;">
                  View Mark Scheme Indicative Utility Points
                </summary>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.45;">
                  ${(Array.isArray(q2a.indicative_content) ? q2a.indicative_content : [q2a.indicative_content]).map((pt) => `<li style="margin-bottom: 4px;">${pt}</li>`).join('')}
                </ul>
              </details>
            `
                : ''
            }
          </div>
        `
            : ''
        }

        ${
          q2b
            ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: #0f172a; color: white; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 0.78rem;">
                  Q2(b)
                </span>
                <span style="font-weight: 700; color: #334155; font-size: 0.85rem;">
                  Follow-Up Enquiry (4-Step Historical Method)
                </span>
              </div>
              <span class="etm-tariff-badge etm-tariff-4m" style="font-size: 0.72rem;">4 Marks</span>
            </div>
            <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: 600; font-size: 0.95rem; line-height: 1.4;">
              ${q2b.question_text}
            </p>
            ${
              q2b.indicative_content
                ? `
              <div style="font-size: 0.82rem; color: #334155; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px;">
                <div style="font-weight: 700; color: #0f172a; margin-bottom: 6px;">4-Part Edexcel Mark Scheme Model Answer:</div>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.45;">
                  ${(Array.isArray(q2b.indicative_content) ? q2b.indicative_content : [q2b.indicative_content]).map((pt) => `<li style="margin-bottom: 4px;">${pt}</li>`).join('')}
                </ul>
              </div>
            `
                : ''
            }
          </div>
        `
            : ''
        }
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        ${
          q2a
            ? `
          <button id="etm-modal-med-practice-2a" style="background: linear-gradient(135deg, ${cfg.primary}, #0f172a); color: white; border: none; padding: 12px 22px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-stopwatch"></i> Practice Q2(a) Utility (8m) in Exam Hall
          </button>
        `
            : ''
        }
        <button id="etm-modal-med-close" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; border-radius: 10px; font-weight: 600; cursor: pointer;">
          Close Dossier
        </button>
      </div>
    `;

    modal.classList.add('open');

    const medCloseBtn = document.getElementById('etm-modal-med-close');
    if (medCloseBtn) medCloseBtn.addEventListener('click', () => modal.classList.remove('open'));

    const medPracticeBtn = document.getElementById('etm-modal-med-practice-2a');
    if (medPracticeBtn && q2a) {
      medPracticeBtn.addEventListener('click', async () => {
        modal.classList.remove('open');
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
          const { renderExamPracticeZone } = await import('./exam_practice_zone.js');
          const activeUnitData = window.currentUnitData || {};
          renderExamPracticeZone(contentArea, activeUnitData);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            const displayArea = document.getElementById('epz-question-display');
            const controls = document.getElementById('epz-controls');
            const qMeta = document.getElementById('epz-q-meta');
            const qText = document.getElementById('epz-q-text');
            const qStimulus = document.getElementById('epz-q-stimulus');
            const wagollPanel = document.getElementById('epz-wagoll-panel');
            const wagollBtn = document.getElementById('epz-wagoll-btn');

            if (displayArea && qText) {
              if (controls) controls.style.display = 'none';
              displayArea.style.display = 'block';
              qMeta.textContent = `${q2a.year} Past Paper • ${q2a.q_number} • ${q2a.tariff} Marks`;
              qText.textContent = q2a.question_text;
              if (qStimulus && q2a.stimulus) {
                qStimulus.style.display = 'block';
                qStimulus.textContent = q2a.stimulus;
              }
              if (wagollPanel && q2a.indicative_content) {
                const pts = Array.isArray(q2a.indicative_content)
                  ? q2a.indicative_content.join('\n\n• ')
                  : q2a.indicative_content;
                wagollPanel.textContent = 'MARK SCHEME INDICATIVE CONTENT:\n\n• ' + pts;
                if (wagollBtn) wagollBtn.style.display = 'inline-block';
              }
            }
          }, 100);
        }
      });
    }
  };

  modalClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // Section B expand/collapse button
  const secbToggleBtn = document.getElementById('etm-secb-toggle-btn');
  if (secbToggleBtn) {
    secbToggleBtn.addEventListener('click', () => {
      window._etm_secb_expanded = !window._etm_secb_expanded;
      buildTrendMatrixUI(container, pastData, trendData, unitId, cfg);
    });
  }

  // Medicine Section A expand/collapse button
  const medSecaToggleBtn = document.getElementById('etm-med-seca-toggle-btn');
  if (medSecaToggleBtn) {
    medSecaToggleBtn.addEventListener('click', () => {
      window._etm_med_seca_expanded = !window._etm_med_seca_expanded;
      buildTrendMatrixUI(container, pastData, trendData, unitId, cfg);
    });
  }

  // Attach click to all question cards in table
  container.querySelectorAll('.etm-q-card, .etm-q-card-mini').forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset.secbYear) {
        openSectionBModal(parseInt(card.dataset.secbYear));
      } else if (card.dataset.medYear) {
        openMedicineSectionAModal(parseInt(card.dataset.medYear));
      } else {
        const qid = card.dataset.qid;
        if (qid) openQuestionModal(qid);
      }
    });
  });

  // View Paper button in Vault
  container.querySelectorAll('.etm-btn-view-paper').forEach((btn) => {
    btn.addEventListener('click', () => {
      const year = parseInt(btn.dataset.year);
      tabBtns[0].click(); // Switch to matrix
    });
  });
}
