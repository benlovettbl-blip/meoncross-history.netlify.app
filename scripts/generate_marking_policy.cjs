const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PATHS } = require('./config.cjs');

const publicDir = PATHS.PUBLIC;
const pdfsDir = PATHS.PDFS;

if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

// Convert figures to base64 data URIs for robust, standalone rendering
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
  <title>Meoncross School History Department - Marking, Feedback & Assessment Policy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

    * { box-sizing: border-box; }
    
    body {
      font-family: 'Outfit', sans-serif;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 9.3pt;
      line-height: 1.40;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 {
      font-family: 'Playfair Display', serif;
      color: #0f2942;
      margin-top: 0;
      font-weight: 700;
    }

    p { margin: 0 0 7px 0; }

    .page {
      width: 100%;
      height: 257mm;
      max-height: 257mm;
      padding: 0;
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

    /* Cover Page Styling */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 8px solid #0f2942;
      padding: 42px 40px;
      background: linear-gradient(180deg, #fcfdfe 0%, #f8fafc 100%);
      position: relative;
    }
    
    .cover-top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 3px solid #d97706;
      padding-bottom: 18px;
    }

    .school-crest-tag {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 13pt;
      letter-spacing: 3px;
      color: #0f2942;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .faculty-tag {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 9.5pt;
      letter-spacing: 2px;
      color: #64748b;
      text-transform: uppercase;
    }

    .cover-main {
      margin: 35px 0;
    }

    .cover-title {
      font-size: 34pt;
      line-height: 1.15;
      font-weight: 700;
      color: #0f2942;
      margin-bottom: 14px;
    }

    .cover-subtitle {
      font-size: 14pt;
      color: #b45309;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 22px;
    }

    .cover-abstract {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 5px solid #0f2942;
      padding: 16px 20px;
      border-radius: 6px;
      font-size: 9.8pt;
      color: #334155;
      line-height: 1.5;
      box-shadow: 0 4px 12px rgba(15, 41, 66, 0.04);
    }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 26px;
    }

    .cover-meta-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }

    .cover-meta-label {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .cover-meta-value {
      font-size: 9.5pt;
      color: #0f2942;
      font-weight: 600;
    }

    .cover-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 14px;
      font-size: 8.5pt;
      color: #64748b;
    }

    /* Content Pages Header */
    .section-header-banner {
      background: #0f2942;
      color: #ffffff;
      padding: 9px 16px;
      border-radius: 6px;
      margin-bottom: 10px;
      border-left: 5px solid #d97706;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .section-header-banner h2 {
      color: #ffffff;
      font-size: 12.5pt;
      margin: 0;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      border: none;
      padding: 0;
    }

    .section-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #fef3c7;
      background: rgba(217, 119, 6, 0.35);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
    }

    /* Subheadings */
    .sub-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 10pt;
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
      height: 11px;
      background: #d97706;
      border-radius: 2px;
    }

    /* Layout Grids */
    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 8px;
    }

    .col-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 9px 12px;
    }

    /* Visual Figures */
    .figure-container {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px;
      margin: 6px 0 8px 0;
      box-shadow: 0 2px 6px rgba(15, 41, 66, 0.05);
    }

    .figure-image {
      width: 100%;
      height: auto;
      border-radius: 4px;
      display: block;
      border: 1px solid #e2e8f0;
    }

    .figure-caption {
      font-size: 8pt;
      color: #475569;
      margin-top: 5px;
      padding: 4px 6px;
      background: #f8fafc;
      border-left: 3px solid #0f2942;
      border-radius: 3px;
      line-height: 1.35;
    }

    .figure-caption strong {
      color: #0f2942;
    }

    /* Policy Boxes */
    .highlight-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #2563eb;
      padding: 7px 11px;
      border-radius: 4px;
      margin: 6px 0;
      font-size: 8.8pt;
      color: #1e3a8a;
      line-height: 1.36;
    }

    .warning-box {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-left: 4px solid #d97706;
      padding: 7px 11px;
      border-radius: 4px;
      margin: 6px 0;
      font-size: 8.8pt;
      color: #92400e;
      line-height: 1.36;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 10px 0;
      font-size: 8.4pt;
    }

    th {
      background: #0f2942;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      text-align: left;
      padding: 5px 9px;
      border: 1px solid #0f2942;
    }

    td {
      padding: 4.5px 9px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
      color: #334155;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    .symbol-pill {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #0f2942;
      background: #e2e8f0;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 8.5pt;
    }

    .badge-gold {
      background: #fef3c7;
      color: #92400e;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 8pt;
    }

    .badge-navy {
      background: #e0e7ff;
      color: #3730a3;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 8pt;
    }

    .badge-green {
      background: #dcfce7;
      color: #166534;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 8pt;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER PAGE ==================== -->
  <div class="page">
    <div class="cover-container">
      <div class="cover-top">
        <div class="school-crest-tag">Meoncross School</div>
        <div class="faculty-tag">Faculty of Humanities • Department of History</div>
      </div>

      <div class="cover-main">
        <div class="cover-title">Marking, Feedback & Assessment Policy</div>
        <div class="cover-subtitle">A Two-Way Dialogue Model: Meaningful, Manageable, and Motivating</div>
        
        <div class="cover-abstract">
          <strong>Executive Summary:</strong> The History Department prioritizes high-impact feedback that accelerates student historical thinking while strictly maintaining teacher workload sustainability. In full compliance with DfE Teacher Workload Review recommendations and EEF research, performative 'tick-and-flick' marking is eliminated. 
          <br><br>
          Our department operates a dual physical-digital architecture: bespoke printed <strong>A4 Pupil Workbooks</strong> provide a permanent, handwriting-focused record of extended analytical writing, while the digital <strong>History Hub Web App</strong> automates low-stakes retrieval practice. Central to our practice is <strong>Two-Way Pupil Voice</strong>: feedback is treated as a continuous dialogue where pupils actively evaluate their own progress, identify misconceptions, and respond immediately through dedicated reflection time.
        </div>

        <div class="cover-meta-grid">
          <div class="cover-meta-card">
            <div class="cover-meta-label">Curriculum Scope</div>
            <div class="cover-meta-value">KS3 History & Pearson Edexcel GCSE (9–1)</div>
          </div>
          <div class="cover-meta-card">
            <div class="cover-meta-label">Department Lead</div>
            <div class="cover-meta-value">Mr. B. Lovett (Head of History)</div>
          </div>
          <div class="cover-meta-card">
            <div class="cover-meta-label">Policy Status</div>
            <div class="cover-meta-value">Approved for 2026–2027 Academic Year</div>
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <div>Meoncross School • Faculty of Humanities • Department of History</div>
        <div>Revised for Academic Year 2026–2027</div>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 2: SECTION 1 - RATIONALE & PUPIL VOICE ==================== -->
  <div class="page">
    <div class="section-header-banner">
      <h2>1. Departmental Rationale & The Two-Way Feedback Dialogue</h2>
      <span class="section-badge">Ethos & Evidence</span>
    </div>

    <p style="font-size: 8.8pt;">
      The Meoncross History Department adheres to the triad of <strong>Meaningful, Manageable, and Motivating</strong> feedback. Extensive research from the Education Endowment Foundation (EEF) demonstrates that retrospective written grading has negligible correlation with pupil attainment. Instead, teacher time is strategically redirected into in-lesson diagnostic questioning, high-quality modelling, and structured student response.
    </p>

    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">Physical-Digital Unified Architecture</div>
        <p style="font-size: 8.3pt; margin-bottom: 0;">
          We have eliminated loose sheets and disorganized exercise books by issuing bespoke, bound <strong>A4 Pupil Workbooks</strong> across KS3 and <strong>GCSE Mastery Booklets</strong> across KS4. The physical workbook guarantees a permanent, high-status record of extended historical essays, source evaluations, and disciplinary literacy. This is paired with the <strong>History Hub App</strong>, handling automated spaced retrieval practice without generating teacher marking workload.
        </p>
      </div>
      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">Centring Two-Way Pupil Voice</div>
        <p style="font-size: 8.3pt; margin-bottom: 0;">
          Feedback is fundamentally a <strong>dialogue, not a monologue</strong>. During lessons, live verbal coaching obliges students to articulate historical explanations and defend causal arguments. At the end of every unit, pupils complete a structured self-evaluation in their workbooks, permanently documenting their reflections to inform adaptive departmental planning.
        </p>
      </div>
    </div>

    <div class="sub-heading">Visual Evidence: End-of-Unit Reflection & Pupil Voice Architecture</div>
    
    <div class="figure-container" style="margin: 4px 0 6px 0;">
      <img src="${fig2Base64}" class="figure-image" style="max-height: 104mm; object-fit: contain; width: 100%;" alt="Figure 2: End of Unit Reflection & Pupil Voice">
      <div class="figure-caption">
        <strong>Figure 2: End of Unit Reflection & Two-Way Pupil Voice (Page 24, Medieval England Workbook).</strong>
        Mandatory summative reflection permanently bound into the pupil workbook, capturing self-assessed effort (1–5 scale), pupil-identified strengths (WWW), misconceptions (EBI), forward targets, and dedicated teacher coaching.
      </div>
    </div>

    <div class="two-col-grid" style="margin-top: 4px;">
      <div class="highlight-box" style="margin: 0; font-size: 8.2pt;">
        <strong style="color: #1e3a8a;">WWW & EBI Diagnostic Loop:</strong> Students articulate which historical enquiries were easiest to master and specifically flag topics requiring reteaching (e.g. feudal land tenure vs Church courts).
      </div>
      <div class="warning-box" style="margin: 0; font-size: 8.2pt;">
        <strong style="color: #92400e;">Effort Self-Scoring & Accountability:</strong> By scoring personal effort from 1 (Low) to 5 (Excellent), students take direct ownership of their academic habits prior to receiving summative teacher feedback.
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 3: SECTION 2 - KEY STAGE 3 WORKBOOKS & TRACKING ==================== -->
  <div class="page">
    <div class="section-header-banner">
      <h2>2. Key Stage 3 Architecture: Workbooks & Progress Tracking</h2>
      <span class="section-badge">Key Stage 3</span>
    </div>

    <div style="display: grid; grid-template-columns: 106mm 1fr; gap: 14px; align-items: start;">
      <div>
        <div class="figure-container" style="margin-top: 0;">
          <img src="${fig1Base64}" class="figure-image" style="max-height: 172mm; object-fit: contain; width: 100%;" alt="Figure 1: Inside Front Cover Tracking Grid">
          <div class="figure-caption">
            <strong>Figure 1: Inside Front Cover Progress & Assessment Tracker (Year 7 Workbook).</strong>
            Systematic front-cover audit trail tracking chronological enquiries, effort (1–5), pathway attainment, and live teacher commentary.
          </div>
        </div>

        <div class="highlight-box" style="margin: 6px 0 0 0; font-size: 8pt; padding: 6px 8px;">
          <strong>KS3 Assessment Frequency:</strong> Two formal feedback homeworks per half term (1 digital 'Read Out Loud' on Teams + 1 teacher-marked written piece) + 1 formal end-of-unit summative assessment recorded on the inside cover.
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <div class="sub-heading" style="margin-top: 0;">Inside Front Cover Tracking Grid</div>
        <p style="font-size: 8.2pt;">
          Every Key Stage 3 workbook opens with a standardized <strong>Progress & Assessment Tracker</strong>, creating an open audit trail for pupils, parents, and school leadership:
        </p>
        <ul style="font-size: 8pt; padding-left: 14px; margin: 0 0 6px 0; color: #334155;">
          <li style="margin-bottom: 3px;"><strong>Chronological Enquiries:</strong> Full mapping of enquiry lessons.</li>
          <li style="margin-bottom: 3px;"><strong>Effort Score (1–5):</strong> Evaluates in-lesson diligence and workbook pride.</li>
          <li style="margin-bottom: 3px;"><strong>Pathway Level:</strong> Logs emerging, expected, or greater depth standard.</li>
          <li style="margin-bottom: 3px;"><strong>Formative Dialogue:</strong> Space for live teacher stamps or student self-notes.</li>
        </ul>

        <div class="sub-heading">Effort Scoring Rubric (1–5 Scale)</div>
        <table style="font-size: 7.8pt; margin: 4px 0 6px 0;">
          <thead>
            <tr>
              <th style="width: 20%;">Score</th>
              <th style="width: 80%;">Pupil Learning Behaviors</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>5 • Exemplary</strong></td><td>Proactive historical curiosity; completes extension tasks; exemplary presentation.</td></tr>
            <tr><td><strong>4 • Good</strong></td><td>Consistent engagement; thoughtful contributions; all core tasks completed.</td></tr>
            <tr><td><strong>3 • Satisfactory</strong></td><td>Meets baseline expectations; requires occasional teacher prompting.</td></tr>
            <tr><td><strong>2 • Inconsistent</strong></td><td>Incomplete written tasks; frequent off-task reminders; lacks pride.</td></tr>
            <tr><td><strong>1 • Concern</strong></td><td>Persistent passivity or refusal; triggers departmental parental contact.</td></tr>
          </tbody>
        </table>

        <div class="sub-heading">Dynamic Vocabulary Pedagogy</div>
        <p style="font-size: 8pt; margin-bottom: 4px;">
          To secure disciplinary literacy, workbooks dynamically rotate across 3 cognitive styles:
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 8px; border-radius: 4px; font-size: 7.8pt; margin-bottom: 6px; line-height: 1.35;">
          <div><strong>1. Contextual Cloze:</strong> High-yield retrieval summaries targeting key terms.</div>
          <div><strong>2. Vocabulary Mapping:</strong> Synthesizing two terms into a causal sentence.</div>
          <div><strong>3. Mini-Frayer Models:</strong> Definition, historical example, and non-example grid.</div>
        </div>

        <div class="sub-heading">Domino Flowchart Chronology</div>
        <p style="font-size: 8pt; margin-bottom: 0;">
          Timeline starters are formatted as <em>Domino Flowcharts</em> with scrambled event nodes. Pupils draw causal arrows and justify historical sequence over rote memorization.
        </p>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 4: SECTION 3 - KEY STAGE 4 GCSE ARCHITECTURE ==================== -->
  <div class="page">
    <div class="section-header-banner">
      <h2>3. Key Stage 4 (GCSE 9–1) Architecture & Stepped Mastery</h2>
      <span class="section-badge">Key Stage 4 • Edexcel</span>
    </div>

    <p style="font-size: 8.8pt;">
      GCSE History requires pupils to master complex, divergent exam tariffs ranging from 2-mark recall features to 16+4-mark thematic judgement essays. The department employs a systematic, 3-stage scaffolding architecture within our bespoke <strong>GCSE Section B Mastery Booklets</strong>:
    </p>

    <div class="figure-container" style="margin: 4px 0 8px 0;">
      <img src="${fig3Base64}" class="figure-image" style="max-height: 44mm; object-fit: contain; width: 100%;" alt="Figure 3: Section B Progress & Assessment Tracker">
      <div class="figure-caption">
        <strong>Figure 3: Section B Progress & Assessment Tracker (Page 1, Edexcel Medicine Mastery Booklet).</strong>
        Visual tracking table mapping student journey through the 280-question recall vault, Round 1 (Stepped Enquiries), Round 2 (Dual-Track Enquiries), and Round 3 (55-minute Full Exam Pitch Simulation).
      </div>
    </div>

    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">Systematic 3-Round Progression</div>
        <ul style="font-size: 8.2pt; padding-left: 14px; margin: 0; color: #334155;">
          <li style="margin-bottom: 3px;"><strong>Round 1 (Stepped Enquiries):</strong> Scaffolded writing frames, PEEL structure strips, and model answers across Q3 (4m), Q4 (12m), and Q5/Q6 (16+4m).</li>
          <li style="margin-bottom: 3px;"><strong>Round 2 (Dual-Track Enquiries):</strong> Differentiated choice between guided scaffolding (Track A) or independent exam conditions (Track B) targeting Grades 7–9.</li>
          <li style="margin-bottom: 3px;"><strong>Round 3 (Exam Simulation):</strong> Timed 55-minute assessment trial replicating exact Edexcel mark scheme standards.</li>
        </ul>
      </div>

      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">Specification-Specific Scaffolding Rules</div>
        <ul style="font-size: 8.2pt; padding-left: 14px; margin: 0; color: #334155;">
          <li style="margin-bottom: 3px;"><strong>Paper 1 Western Front (Section A):</strong> Feature questions exist <em>strictly</em> as two separate 2-mark questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li style="margin-bottom: 3px;"><strong>Paper 2 Early Elizabethan England:</strong> Feature questions strictly structured as two distinct 2-mark questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li style="margin-bottom: 3px;"><strong>Paper 2 Middle East:</strong> Consequence question format strictly reflects the updated single 4-mark requirement ('Explain one consequence of...').</li>
        </ul>
      </div>
    </div>

    <div class="sub-heading">Source Provenance Scaffolding ('How Useful' Questions)</div>
    <p style="font-size: 8.2pt;">
      Source provenance is the single most common stumbling block for GCSE candidates. In all source-utility assessments, the department embeds explicit <strong>Provenance Clue Boxes</strong> prompting students to dissect:
    </p>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 4px 0 6px 0;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #0f2942; padding: 6px 9px; border-radius: 4px; font-size: 7.8pt;">
        <strong>1. Author & Expert Status:</strong> Who created the source, what was their direct medical/military role, and what access did they have to firsthand evidence?
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #d97706; padding: 6px 9px; border-radius: 4px; font-size: 7.8pt;">
        <strong>2. Audience & Confidentiality:</strong> Was this written for a private diary, official military command (RAMC), or public wartime home-front propaganda?
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #2563eb; padding: 6px 9px; border-radius: 4px; font-size: 7.8pt;">
        <strong>3. Motive & Limitations:</strong> Why was it created at that specific date, what does it deliberately omit, and how does it corroborate contextual knowledge?
      </div>
    </div>

    <div class="highlight-box" style="margin: 2px 0 0 0; font-size: 8pt; padding: 6px 10px;">
      <strong>The Four Golden Rules for GCSE Historical Writing:</strong> 
      (1) Substantive evidence over vague generalizations; 
      (2) Sustained analytical focus on the explicit question concept (causation, similarity, utility); 
      (3) Purpose-led provenance evaluation over superficial bias labels; 
      (4) Criteria-driven comparative judgement in 16-mark essays.
    </div>
  </div>

  <!-- ==================== PAGE 5: SECTION 4 - INTELLIGENCE & AUTO-MARKING ==================== -->
  <div class="page">
    <div class="section-header-banner">
      <h2>4. Departmental Intelligence, Mock Packs & Digital Auto-Marking</h2>
      <span class="section-badge">Data & Technology</span>
    </div>

    <p style="font-size: 8.8pt;">
      To prevent teacher marking fatigue while maximizing student exam readiness, the department utilizes a bespoke <strong>Exam Trend Matrix & Specification Gap Radar</strong>. This replaces blind past paper marking with data-driven surgical rehearsals.
    </p>

    <div class="figure-container" style="margin: 4px 0 8px 0;">
      <img src="${fig4Base64}" class="figure-image" style="max-height: 108mm; object-fit: contain; width: 100%;" alt="Figure 4: Exam Trend Matrix Wide Table">
      <div class="figure-caption">
        <strong>Figure 4: Pearson Edexcel GCSE Past Exam Question Matrix (8-Series Longitudinal Analysis, 2018–2026).</strong>
        Departmental database mapping all 8 exam series across Medicine, Elizabethan, Middle East, Germany, and USA. Flags overdue question tariffs and unexamined syllabus points for high-leverage classroom rehearsals.
      </div>
    </div>

    <div class="two-col-grid" style="margin-top: 6px;">
      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">Data-Driven Target Rehearsals</div>
        <p style="font-size: 8.2pt; margin-bottom: 0;">
          Rather than having teachers mark entire 52-mark past papers every fortnight, the <strong>Specification Gap Radar</strong> identifies high-probability 'overdue' topics (e.g. Modern Public Health 16m essays or Medieval Surgery 12m causation). The department conducts 15-minute high-yield timed trials on these exact question stems, followed immediately by whole-class live modelling.
        </p>
      </div>

      <div class="col-card">
        <div class="sub-heading" style="margin-top: 0;">One-Click Classroom Mock Packs</div>
        <p style="font-size: 8.2pt; margin-bottom: 0;">
          The web application enables instant generation of authentic <strong>4-Page Section B Mock Exam Dossiers</strong>. These compile official Edexcel typography, source boxes, and lined response pages with zero teacher administrative formatting time, enabling regular, low-friction exam hall trial runs.
        </p>
      </div>
    </div>

    <div class="sub-heading">Digital Automated Marking: 20-Question Knowledge Vaults</div>
    <p style="font-size: 8.2pt; margin-bottom: 0;">
      Every unit in the curriculum is supported by an automated 20-question <strong>Mastery Vault</strong> within the History Hub Web App. Pupils complete spaced retrieval quizzes on laptops or mobile devices, receiving instantaneous automated scoring, diagnostic explanations, and Leitner flashcard reinforcement. This delivers rigorous continuous recall practice with <strong>zero teacher marking hours</strong>, freeing faculty to focus entirely on qualitative essay feedback.
    </p>
  </div>

  <!-- ==================== PAGE 6: SECTION 5 - IN-LESSON PRACTICE & ACCORD ==================== -->
  <div class="page">
    <div class="section-header-banner">
      <h2>5. In-Lesson Practice, Standards & Quality Assurance</h2>
      <span class="section-badge">Classroom Standards</span>
    </div>

    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div>
        <div class="sub-heading" style="margin-top: 0;">Live In-The-Moment Feedback</div>
        <p style="font-size: 8.2pt;">
          During independent writing phases, teachers actively circulate and review work in progress. Misconceptions in historical chronology, source inferences, or essay structure are addressed immediately, allowing students to refine their work in real time.
        </p>
      </div>
      <div>
        <div class="sub-heading" style="margin-top: 0;">Whole-Class Feedback & Dedicated Reflection (DIRT)</div>
        <p style="font-size: 8.2pt;">
          Following major written assessments, teachers compile diagnostic findings onto a single <strong>Whole-Class Feedback Sheet</strong> rather than writing repetitive comments in individual books. Students complete dedicated <strong>DIRT</strong>, redrafting key paragraphs and addressing targeted misconceptions.
        </p>
      </div>
    </div>

    <div class="sub-heading">Spelling, Punctuation & Grammar (SPaG) Marking Code</div>
    <table style="margin-bottom: 6px;">
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
          <td>Incorrect historical / general spelling</td>
          <td><span class="symbol-pill">^</span></td>
          <td>Word omitted</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">P</span></td>
          <td>Punctuation error (full stop, comma)</td>
          <td><span class="symbol-pill">?</span></td>
          <td>Meaning unclear / illogical phrase</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">G</span></td>
          <td>Grammatical issue / tense agreement</td>
          <td><span class="symbol-pill">!</span></td>
          <td>Historical factual inaccuracy</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">C</span></td>
          <td>Capital letter required (proper noun)</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓</span></td>
          <td>Valid historical evidence / sound point</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">//</span></td>
          <td>New paragraph required (PEEL structure)</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓✓</span></td>
          <td>Exceptional historical insight / sustained analysis</td>
        </tr>
      </tbody>
    </table>

    <div class="sub-heading">Assessment Pathways & GCSE Indicative Bands</div>
    <table style="margin-bottom: 6px;">
      <thead>
        <tr>
          <th>Pathway Level</th>
          <th>Descriptor</th>
          <th>Assessment % Band</th>
          <th>GCSE Indicative Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-gold">Greater Depth (GD)</span></td>
          <td>Sophisticated analysis, nuanced historical synthesis, perceptive judgements.</td>
          <td><strong>80% – 100%</strong></td>
          <td><strong>Grades 8 – 9</strong></td>
        </tr>
        <tr>
          <td><span class="badge-navy">Expected+ (Exp+)</span></td>
          <td>Secure explanations, well-selected evidence, clear causal reasoning.</td>
          <td><strong>60% – 79%</strong></td>
          <td><strong>Grades 6 – 7</strong></td>
        </tr>
        <tr>
          <td><span class="badge-navy">Expected (Exp)</span></td>
          <td>Sound descriptive knowledge, structured paragraphs, basic historical analysis.</td>
          <td><strong>40% – 59%</strong></td>
          <td><strong>Grades 4 – 5</strong></td>
        </tr>
        <tr>
          <td><span class="badge-green">Emerging+ (EM+)</span></td>
          <td>Partial recall, simple assertions, emerging chronological awareness.</td>
          <td><strong>30% – 39%</strong></td>
          <td><strong>Grade 3</strong></td>
        </tr>
        <tr>
          <td><span class="badge-green">Emerging (EM)</span></td>
          <td>Fragmented knowledge, requires frequent scaffolding to complete tasks.</td>
          <td><strong>10% – 29%</strong></td>
          <td><strong>Grades 1 – 2</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="col-card" style="font-size: 8pt; padding: 8px 12px; margin-top: 4px;">
      <strong>Quality Assurance & Moderation Schedule:</strong><br>
      • Termly collaborative work scrutinies evaluating student reflection, redrafts, and progress over time.<br>
      • Formal GCSE mock standardization against official Pearson Edexcel anchor scripts and examiners' reports.<br>
      • Inside-cover tracking grids shared directly at Parents' Consultations to celebrate effort and attainment.
    </div>
  </div>

</body>
</html>`;

(async () => {
  console.log('Generating updated marking policy HTML template...');
  const outHtmlPath = path.join(publicDir, 'marking_policy.html');
  fs.writeFileSync(outHtmlPath, htmlContent, 'utf8');
  console.log('✅ Wrote HTML template to:', outHtmlPath);

  console.log('Launching Puppeteer to render PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  await page.goto(require('url').pathToFileURL(outHtmlPath).href, {
    waitUntil: 'networkidle0',
  });

  const pdfPath = path.join(pdfsDir, 'history_marking_and_feedback_policy.pdf');
  console.log('Exporting PDF to:', pdfPath);

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 8pt; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; font-family: 'Outfit', sans-serif; color: #64748b;">
        <span>Meoncross School History Department • Marking, Feedback & Assessment Policy (2026–2027)</span>
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

  console.log('✅ Success! Policy PDF compiled cleanly to:', pdfPath);

  await browser.close();
})();
