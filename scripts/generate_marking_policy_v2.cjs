const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PATHS } = require('./config.cjs');

const publicDir = PATHS.PUBLIC;
const pdfsDir = PATHS.PDFS;

if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

// Convert figures to base64 data URIs for robust standalone rendering
const fig1Path = path.join(publicDir, 'images/policy/figure1_ks3_tracking_grid.png');
const fig2Path = path.join(publicDir, 'images/policy/figure2_pupil_voice_reflection.png');
const fig3Path = path.join(publicDir, 'images/policy/figure3_ks4_gcse_tracker.png');
const fig4Path = path.join(publicDir, 'images/policy/figure4_matrix_table_wide.png');

const fig1Base64 = fs.existsSync(fig1Path)
  ? `data:image/png;base64,${fs.readFileSync(fig1Path).toString('base64')}`
  : '';
const fig2Base64 = fs.existsSync(fig2Path)
  ? `data:image/png;base64,${fs.readFileSync(fig2Path).toString('base64')}`
  : '';
const fig3Base64 = fs.existsSync(fig3Path)
  ? `data:image/png;base64,${fs.readFileSync(fig3Path).toString('base64')}`
  : '';
const fig4Base64 = fs.existsSync(fig4Path)
  ? `data:image/png;base64,${fs.readFileSync(fig4Path).toString('base64')}`
  : '';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Department - Marking & Feedback Policy (Tripartite Curriculum Standard)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    
    * { box-sizing: border-box; }
    
    body { 
      font-family: 'Outfit', sans-serif; 
      color: #1e293b; 
      background: #ffffff; 
      margin: 0; 
      padding: 0; 
      font-size: 9pt; 
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 { 
      font-family: 'Playfair Display', serif; 
      color: #1b365d; 
      margin-top: 0; 
      font-weight: 700;
    }

    p { margin: 0 0 6px 0; }

    .page {
      width: 100%;
      height: 256mm;
      max-height: 256mm;
      padding: 24px 38px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      page-break-after: always;
      position: relative;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Cover Page */
    .cover-page { 
      height: 256mm; 
      max-height: 256mm;
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center; 
      text-align: center; 
      background: #f8fafc; 
      border: 8px solid #1b365d; 
      padding: 36px; 
      box-sizing: border-box;
      page-break-after: always;
    }
    .cover-title { font-size: 34pt; font-weight: 700; color: #1b365d; margin-bottom: 12px; line-height: 1.15; }
    .cover-subtitle { font-size: 16pt; color: #d97706; font-family: 'Outfit', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    .cover-pill-box {
      display: flex;
      gap: 12px;
      margin-top: 30px;
    }
    .cover-pill {
      background: #e2e8f0;
      color: #0f2942;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Header Banners */
    .header-banner { 
      background: #1b365d; 
      color: #ffffff; 
      padding: 9px 16px; 
      text-align: center; 
      border-radius: 5px; 
      margin-bottom: 10px; 
      border-bottom: 3px solid #d97706; 
    }
    .header-banner h1 { color: #ffffff; margin: 0; font-size: 15pt; font-weight: 700; }
    
    .section-banner-appendix {
      background: #0f2942;
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 5px;
      margin-bottom: 10px;
      border-left: 4px solid #d97706;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-banner-appendix h2 {
      color: #ffffff;
      font-size: 12pt;
      margin: 0;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      border: none;
      padding: 0;
    }
    .section-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #fef3c7;
      background: rgba(217, 119, 6, 0.35);
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
    }

    .pillar-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin: 8px 0 10px 0;
    }
    .pillar-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #1b365d;
      border-radius: 4px;
      padding: 8px 10px;
    }
    .pillar-card strong {
      display: block;
      color: #1b365d;
      font-size: 8.5pt;
      margin-bottom: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .pillar-card p {
      font-size: 7.8pt;
      line-height: 1.35;
      margin: 0;
      color: #475569;
    }

    .sub-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f2942;
      margin: 8px 0 4px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sub-heading::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 10px;
      background: #d97706;
      border-radius: 2px;
    }

    /* Tables */
    table { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 8.5pt; }
    tr { border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background-color: #f8fafc; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 5px 8px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 8.5pt; border: none; }
    td { padding: 5px 8px; border: none; vertical-align: top; color: #334155; }
    
    .symbol-pill {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #0f2942;
      background: #e2e8f0;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 8pt;
    }

    /* Visual Figures */
    .figure-container {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 5px;
      margin: 4px 0 6px 0;
      box-shadow: 0 1px 4px rgba(15, 41, 66, 0.04);
    }
    .figure-image {
      width: 100%;
      height: auto;
      border-radius: 3px;
      display: block;
      border: 1px solid #e2e8f0;
    }
    .figure-caption {
      font-size: 7.5pt;
      color: #475569;
      margin-top: 3px;
      padding: 3px 5px;
      background: #f8fafc;
      border-left: 3px solid #0f2942;
      border-radius: 2px;
      line-height: 1.3;
    }
    .figure-caption strong { color: #0f2942; }

    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 6px;
    }
    .col-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 7px 10px;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER PAGE ==================== -->
  <div class="cover-page">
    <div style="font-family: 'Outfit', sans-serif; font-size: 13pt; letter-spacing: 3px; text-transform: uppercase; color: #64748b; margin-bottom: 10px; font-weight: 700;">The History Department</div>
    <div class="cover-title">Marking & Feedback Policy</div>
    <div class="cover-subtitle">The Tripartite Curriculum Architecture</div>
    
    <div class="cover-pill-box">
      <div class="cover-pill">1. Master Textbooks</div>
      <div class="cover-pill">2. Pupil Workbooks</div>
      <div class="cover-pill">3. Retrieval Companions</div>
    </div>

    <div style="margin-top: 36px; font-size: 12pt; color: #475569; font-weight: 500;">Approved for Academic Year 2026–2027</div>
    <div style="margin-top: 14px; font-size: 9.5pt; color: #94a3b8;">Department Lead • The History Revision Hub Platform Standards</div>
  </div>

  <!-- ==================== PAGE 2: PART 1 - RATIONALE, TRIPARTITE MODEL & FREQUENCY ==================== -->
  <div class="page">
    <div class="header-banner">
      <h1>Part 1: Departmental Rationale & Tripartite Architecture</h1>
    </div>
    
    <p>The History Department prioritises meaningful, manageable, and motivating feedback, focusing on high-impact live intervention, whole-class modelling, and structured pupil self-regulation over performative red-pen marking. Our feedback system is integrated into a unified <strong>Tripartite Curriculum Model</strong>:</p>

    <div class="pillar-strip">
      <div class="pillar-card">
        <strong>Pillar 1: Master Textbooks</strong>
        <p>Pure narrative reading anthologies (zero source boxes, zero rubrics) providing immersive, high-challenge prose during whole-class reading before writing begins.</p>
      </div>
      <div class="pillar-card">
        <strong>Pillar 2: Pupil Workbooks</strong>
        <p>16–20 page saddle-stitch workbooks. Verso: 5-Stage Chronological Inquiry Spine; Recto: Disciplinary writing on calibrated ~7.8mm–8.1mm ruled handwriting lines.</p>
      </div>
      <div class="pillar-card">
        <strong>Pillar 3: Retrieval Companions</strong>
        <p>8-page (KS3) and 16–28 page (GCSE) companions featuring Domino causal flowcharts, 2-line dual retrieval, and self-scoring Marking Banks.</p>
      </div>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; padding: 8px 12px; border-radius: 4px; margin: 6px 0;">
      <h3 style="color: #1e3a8a; margin: 0 0 3px 0; font-size: 9.5pt;">Centring Pupil Voice & Live Metacognition</h3>
      <p style="margin: 0; font-size: 8.5pt; color: #1e40af; line-height: 1.35;">
        Feedback is an active dialogue, not a retrospective teacher chore. Live marking during circulating coaching prompts pupils to vocalise historical reasoning, correct misconceptions in real time with green pen, and complete end-of-unit reflection grids in their workbooks to document progress and set immediate targets.
      </p>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 3px; margin-top: 10px; font-size: 11pt;">Zero Knowledge Giveaways in Scaffolds</h2>
    <p style="font-size: 8.5pt;">Sentence stems and connectives in pupil workbooks provide purely structural, disciplinary scaffolding—never factual answers. Key Terms banks supply technical vocabulary (e.g. <em>Diktat, Article 231, £6.6bn reparations</em>), but connectives remain strictly content-free (e.g. <em>In particular, a decisive factor was...</em>), forcing pupils to retrieve historical knowledge from memory rather than transcribing hints.</p>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 3px; margin-top: 10px; font-size: 11pt;">Frequency of Marking</h2>
    
    <div class="two-col-grid" style="margin-top: 6px; margin-bottom: 0;">
      <div class="col-card">
        <h3 style="color: #1e40af; margin-bottom: 2px; font-size: 9pt;">Key Stage 3</h3>
        <p style="font-size: 8pt; margin: 0; line-height: 1.35;">
          Routine classwork is reviewed via live circulating coaching and self-marking with the Knowledge Retrieval Companion's Marking Bank. Teachers assess one substantial disciplinary extended writing task (Explain Why 12m, Narrative Account 8m, or Interpretations 8m) per half term using the 5 Pathway Levels.
        </p>
      </div>
      <div class="col-card">
        <h3 style="color: #1e40af; margin-bottom: 2px; font-size: 9pt;">Key Stage 4 (GCSE)</h3>
        <p style="font-size: 8pt; margin: 0; line-height: 1.35;">
          Regular low-stakes rehearsals using Pearson Edexcel past questions. Teachers provide live exemplar modelling and mark formal timed assessments across Paper 1 (Medicine & Western Front), Paper 2 (Elizabeth & Middle East), and Paper 3 (Weimar & USA) against Pearson 9–1 mark criteria and CAT4 benchmarks.
        </p>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 3: PART 2 - TYPES, STANDARDS & GRADING ==================== -->
  <div class="page">
    <div class="header-banner">
      <h1>Part 2: Standards, Grading & Feedback Types</h1>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 3px; margin-top: 0; font-size: 11pt;">Types of Marking & Feedback</h2>
    
    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div>
        <h3 style="color: #1e40af; font-size: 9pt; margin-bottom: 2px;">1. Live In-The-Moment Coaching</h3>
        <p style="font-size: 8pt; line-height: 1.3;">Teacher circulates while pupils write on ruled lines, checking historical precision and intervening immediately with verbal coaching and green-pen margin codes.</p>
        
        <h3 style="color: #1e40af; font-size: 9pt; margin-bottom: 2px;">2. Retrieval Companion Self-Scoring</h3>
        <p style="font-size: 8pt; line-height: 1.3;">Pupils complete low-stakes starters and self-mark immediately using the verified Marking Bank at the back of the companion, cementing factual recall and schema retention.</p>
      </div>
      <div>
        <h3 style="color: #1e40af; font-size: 9pt; margin-bottom: 2px;">3. Disciplinary Writing Assessment</h3>
        <p style="font-size: 8pt; line-height: 1.3;">End-of-enquiry written pieces are assessed against national progression criteria (KS3) or Pearson Edexcel 9–1 criteria (GCSE), recorded on the workbook back cover ledger.</p>

        <h3 style="color: #1e40af; font-size: 9pt; margin-bottom: 2px;">4. Spaced App Quizzing & QR Retrieval</h3>
        <p style="font-size: 8pt; line-height: 1.3;">Dual-QR codes on workbook back covers link pupils directly to interactive 20-question digital quizzes on the History Revision Hub, automating diagnostics and homework retrieval.</p>
      </div>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 3px; margin-top: 6px; font-size: 11pt;">Spelling, Punctuation & Grammar (SPaG)</h2>
    <p style="font-size: 8pt; margin-bottom: 4px;">Consistent whole-school marking symbols applied across all humanities written work:</p>
    
    <table style="font-size: 8pt; margin-bottom: 8px;">
      <thead>
        <tr>
          <th style="width: 14%;">Symbol</th>
          <th style="width: 36%;">Meaning</th>
          <th style="width: 14%;">Symbol</th>
          <th style="width: 36%;">Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="symbol-pill">Sp</span></td>
          <td>Incorrect spelling (write 3x in margin)</td>
          <td><span class="symbol-pill">^</span></td>
          <td>Word omitted</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">P</span></td>
          <td>Punctuation error (. , ! ?)</td>
          <td><span class="symbol-pill">?</span></td>
          <td>Meaning unclear / historical confusion</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">G</span></td>
          <td>Grammar error / sentence structure</td>
          <td><span class="symbol-pill">!</span></td>
          <td>Factual / chronological inaccuracy</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">C</span></td>
          <td>Capital letter required (proper noun/date)</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓</span></td>
          <td>Valid historical evidence / explanation</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">//</span></td>
          <td>New paragraph required</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓✓</span></td>
          <td>Exceptional analytical insight / causal link</td>
        </tr>
      </tbody>
    </table>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 3px; margin-top: 6px; font-size: 11pt;">Assessment & Grading Framework</h2>
    
    <p style="font-size: 8pt; margin-bottom: 4px;">
      Progress tracking is maintained using the ledger on the inside front/back cover of workbooks, aligned to national standards and indicative GCSE outcomes:
    </p>

    <table style="font-size: 8pt; margin-bottom: 0;">
      <thead>
        <tr>
          <th style="width: 25%;">Pathway Level</th>
          <th style="width: 20%;">Score Band</th>
          <th style="width: 25%;">Indicative GCSE</th>
          <th>Disciplinary Writing Standard</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>GD (Greater Depth)</strong></td><td>80% – 100%</td><td>Grades 8 – 9</td><td>Sustained causal argument, conceptual hierarchy, nuanced evaluation.</td></tr>
        <tr><td><strong>Exp + (Expected +)</strong></td><td>60% – 79%</td><td>Grades 6 – 7</td><td>Consistent analytical structure, detailed evidence deployment, clear links.</td></tr>
        <tr><td><strong>Exp (Expected)</strong></td><td>40% – 59%</td><td>Grades 4 – 5</td><td>Accurate historical knowledge, structured explanation, sound PEEL points.</td></tr>
        <tr><td><strong>EM + (Emerging +)</strong></td><td>30% – 39%</td><td>Grade 3</td><td>Descriptive accounts, basic causal awareness, emerging terminology.</td></tr>
        <tr><td><strong>EM (Emerging)</strong></td><td>10% – 29%</td><td>Grades 1 – 2</td><td>Fragmentary recall, simple narrative statements requiring teacher guidance.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== PAGE 4: PART 3 - VISUAL EVIDENCE (KEY STAGE 3) ==================== -->
  <div class="page">
    <div class="section-banner-appendix">
      <h2>Part 3: Exemplar Implementation & Visual Evidence (Key Stage 3)</h2>
      <span class="section-badge">Visual Appendix • KS3</span>
    </div>

    <p style="font-size: 8.2pt; margin-bottom: 6px;">
      Key Stage 3 workbooks embed our double-page spread architecture: Verso inquiry spine [1.1]–[5.5] with left-trigger keywords; Recto writing tasks on calibrated ~7.8mm–8.1mm handwriting pitch with zero knowledge giveaways in scaffolds.
    </p>

    <div style="display: grid; grid-template-columns: 85mm 1fr; gap: 12px; align-items: start; margin-bottom: 6px;">
      <div>
        <div class="figure-container" style="margin: 0;">
          <img src="${fig1Base64}" class="figure-image" style="max-height: 108mm; object-fit: contain;" alt="Figure 1: KS3 Progress Tracker">
          <div class="figure-caption">
            <strong>Figure 1: Progress & Assessment Ledger (KS3 Workbook).</strong>
            Lesson-by-lesson audit trail recording Effort (1–5), Pathway Standard (EM to GD), and formative teacher/pupil dialogue.
          </div>
        </div>
      </div>

      <div>
        <div class="sub-heading" style="margin-top: 0;">Dual-Pathway Centrefold Timeline</div>
        <p style="font-size: 7.8pt; line-height: 1.35; margin-bottom: 4px;">
          The centrefold (Pages 8–9 or 10–11) features our Panoramic Living Timeline with a binary dual-coding protocol:
        </p>
        <ul style="font-size: 7.8pt; padding-left: 12px; margin: 0 0 6px 0; color: #334155; line-height: 1.3;">
          <li><strong>Choice A (Visual Dual-Coding):</strong> Pupils draw a symbolic icon representing the decisive causal mechanism.</li>
          <li><strong>Choice B (Concept Mind Map):</strong> Pupils construct a 3-branch analytical web linking cause, event, and consequence.</li>
        </ul>

        <div class="sub-heading">Effort Scoring Rubric (1–5)</div>
        <table style="font-size: 7.2pt; margin-bottom: 0;">
          <thead>
            <tr><th style="width: 28%;">Score</th><th>Pupil Focus & Diligence</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>5 • Exemplary</strong></td><td>Proactive curiosity; voluntary extension; exceptional pride.</td></tr>
            <tr><td><strong>4 • Good</strong></td><td>Consistent engagement; thoughtful contributions; complete work.</td></tr>
            <tr><td><strong>3 • Satisfactory</strong></td><td>Meets baseline; requires occasional prompting.</td></tr>
            <tr><td><strong>2 • Inconsistent</strong></td><td>Incomplete written tasks; frequent off-task reminders.</td></tr>
            <tr><td><strong>1 • Concern</strong></td><td>Persistent passivity; triggers departmental intervention.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sub-heading">Visual Evidence: Retrieval Companion Marking Bank & Green-Pen Self-Scoring</div>
    <div class="figure-container" style="margin: 2px 0 0 0;">
      <img src="${fig2Base64}" class="figure-image" style="max-height: 48mm; object-fit: contain;" alt="Figure 2: Retrieval Companion Marking Bank">
      <div class="figure-caption">
        <strong>Figure 2: Department Marking Bank & Green-Pen Verification Key (Retrieval Companion, pp. 7–8).</strong>
        Pupils complete low-stakes retrieval starters from memory, then immediately verify accuracy in green pen using the Marking Bank. Binary verification ticks [✓] and query tags [?] drive immediate metacognitive self-regulation before circulating teacher intervention.
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 5: PART 4 - VISUAL EVIDENCE (KEY STAGE 4) ==================== -->
  <div class="page">
    <div class="section-banner-appendix">
      <h2>Part 4: Exemplar Implementation & Visual Evidence (Key Stage 4)</h2>
      <span class="section-badge">Visual Appendix • KS4</span>
    </div>

    <p style="font-size: 8.2pt; margin-bottom: 6px;">
      At Key Stage 4, feedback is structured around Pearson Edexcel exam question tariffs, PEEL writing frames with content-free connectives, and targeted question intelligence:
    </p>

    <div class="figure-container" style="margin: 2px 0 6px 0;">
      <img src="${fig3Base64}" class="figure-image" style="max-height: 40mm; object-fit: contain;" alt="Figure 3: GCSE Assessment Record & Tariffs">
      <div class="figure-caption">
        <strong>Figure 3: Key Topic Assessment & Progress Record (Edexcel Medicine & Western Front Workbook, Page 28).</strong>
        Lesson-by-lesson audit tracking Pearson Edexcel exam question tariffs (Q1 4m Features, Q2a 8m Utility, Q2b 4m Follow-Up), pupil scores, and targeted teacher next steps.
      </div>
    </div>

    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div class="col-card" style="font-size: 7.8pt;">
        <div class="sub-heading" style="margin-top: 0;">Specification-Specific Question Tariffs</div>
        <ul style="padding-left: 12px; margin: 0; color: #334155; line-height: 1.3;">
          <li><strong>Paper 1 (Western Front):</strong> Feature questions exist <em>strictly</em> as two separate 2-mark questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li><strong>Paper 2 (Elizabethan):</strong> Two distinct 2-mark feature questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li><strong>Paper 2 (Middle East):</strong> Updated single 4-mark consequence format ('Explain one consequence of...').</li>
        </ul>
      </div>

      <div class="col-card" style="font-size: 7.8pt;">
        <div class="sub-heading" style="margin-top: 0;">Provenance Clues ('How Useful' Utility Prompts)</div>
        <p style="margin: 0; line-height: 1.3;">
          Scaffolding boxes guide students to evaluate <strong>Author</strong> (access, expertise), <strong>Audience</strong> (private diary vs mass propaganda), and <strong>Motive</strong> (substantive purpose) against verified historical context, eliminating generic speculation.
        </p>
      </div>
    </div>

    <div class="sub-heading">Longitudinal Exam Trend Intelligence & Automated Quizzing</div>
    <div class="figure-container" style="margin: 2px 0 0 0;">
      <img src="${fig4Base64}" class="figure-image" style="max-height: 66mm; object-fit: contain;" alt="Figure 4: Exam Trend Matrix Wide Table">
      <div class="figure-caption">
        <strong>Figure 4: Pearson Edexcel Past Exam Question Matrix (8-Series Analysis, 2018–2026).</strong>
        Departmental tracking across Medicine, Elizabethan, Middle East, Germany, and USA. Flags unexamined syllabus themes, allowing teachers to deliver high-yield classroom rehearsals and automated 20-question mastery quizzes.
      </div>
    </div>
  </div>

</body>
</html>`;

(async () => {
  console.log('Generating Version 2 marking policy HTML template...');
  const outHtmlPath = path.join(publicDir, 'marking_policy_v2.html');
  fs.writeFileSync(outHtmlPath, htmlContent, 'utf8');
  console.log('✅ Wrote HTML template to:', outHtmlPath);

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  console.log('Launching Puppeteer to render Version 2 PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  await page.goto(require('url').pathToFileURL(outHtmlPath).href, {
    waitUntil: 'networkidle0',
  });

  const pdfPath = path.join(pdfsDir, 'history_marking_and_feedback_policy_v2.pdf');
  console.log('Exporting Version 2 PDF to:', pdfPath);

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 8pt; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; font-family: 'Outfit', sans-serif; color: #64748b;">
        <span>The History Department • Marking & Feedback Policy (2026–2027)</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '12mm',
      right: '12mm',
      bottom: '16mm',
      left: '12mm',
    },
  });

  console.log('✅ Success! Version 2 Policy PDF compiled cleanly to:', pdfPath);

  await browser.close();

  // Synchronize updated Marking Policy PDF to Google Drive Department File if available
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
  } catch (err) {
    // Non-fatal if Google Drive is unmounted
  }
})();
