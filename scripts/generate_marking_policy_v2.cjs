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
  <title>Meoncross School History Department - Marking & Feedback Policy (Version 2: Core + Visual Appendix)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    
    * { box-sizing: border-box; }
    
    body { 
      font-family: 'Outfit', sans-serif; 
      color: #1e293b; 
      background: #ffffff; 
      margin: 0; 
      padding: 0; 
      font-size: 10pt; 
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 { 
      font-family: 'Playfair Display', serif; 
      color: #1b365d; 
      margin-top: 0; 
      font-weight: 700;
    }

    p { margin: 0 0 8px 0; }

    .page {
      width: 100%;
      height: 256mm;
      max-height: 256mm;
      padding: 30px 45px;
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
      border: 10px solid #1b365d; 
      padding: 40px; 
      box-sizing: border-box;
      page-break-after: always;
    }
    .cover-title { font-size: 40pt; font-weight: 700; color: #1b365d; margin-bottom: 16px; line-height: 1.15; }
    .cover-subtitle { font-size: 20pt; color: #d97706; font-family: 'Outfit', sans-serif; font-weight: 400; text-transform: uppercase; letter-spacing: 2px; }

    /* Header Banners */
    .header-banner { 
      background: #1b365d; 
      color: #ffffff; 
      padding: 12px 20px; 
      text-align: center; 
      border-radius: 6px; 
      margin-bottom: 16px; 
      border-bottom: 4px solid #d97706; 
    }
    .header-banner h1 { color: #ffffff; margin: 0; font-size: 18pt; font-weight: 700; }
    
    .section-banner-appendix {
      background: #0f2942;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 6px;
      margin-bottom: 12px;
      border-left: 5px solid #d97706;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-banner-appendix h2 {
      color: #ffffff;
      font-size: 13pt;
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

    .primer-box { 
      background: #fef3c7; 
      border: 1px solid #fde68a; 
      border-left: 4px solid #d97706; 
      padding: 10px 14px; 
      border-radius: 4px; 
      margin: 10px 0; 
      font-size: 9pt;
    }
    .primer-box h4 { margin: 0 0 6px 0; color: #92400e; font-family: 'Outfit', sans-serif; text-transform: uppercase; font-size: 9pt; letter-spacing: 1px; }

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

    /* Tables */
    table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 9pt; }
    tr { border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background-color: #f8fafc; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 7px 10px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 9pt; border: none; }
    td { padding: 6px 10px; border: none; vertical-align: top; color: #334155; }
    
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

    /* Visual Figures */
    .figure-container {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px;
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
      font-size: 7.8pt;
      color: #475569;
      margin-top: 4px;
      padding: 4px 6px;
      background: #f8fafc;
      border-left: 3px solid #0f2942;
      border-radius: 3px;
      line-height: 1.35;
    }
    .figure-caption strong { color: #0f2942; }

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
      padding: 8px 12px;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER PAGE ==================== -->
  <div class="cover-page">
    <div style="font-family: 'Outfit', sans-serif; font-size: 14pt; letter-spacing: 3px; text-transform: uppercase; color: #64748b; margin-bottom: 12px; font-weight: 700;">Meoncross School • Faculty of Humanities</div>
    <div class="cover-title">History Department</div>
    <div class="cover-subtitle">Marking & Feedback Policy</div>
    <div style="margin-top: 40px; font-size: 13pt; color: #475569; font-weight: 500;">Approved for Academic Year 2026–2027</div>
    <div style="margin-top: 20px; font-size: 10pt; color: #94a3b8;">Head of History: Mr. B. Lovett</div>
  </div>

  <!-- ==================== PAGE 2: PART 1 - RATIONALE, FREQUENCY & TYPES ==================== -->
  <div class="page">
    <div class="header-banner">
      <h1>Part 1: Departmental Rationale & Policy</h1>
    </div>
    
    <p>The History Department prioritizes meaningful, manageable, and motivating feedback by focusing on the impact of teacher interventions rather than performative volume. In line with this, the department has shifted its primary focus toward handwritten work completed directly in pupil printed workbooks.</p>
    
    <p>Formal assessments are recorded centrally, while individual feedback is delivered through live verbal coaching and whole-class modelling to ensure student effort is redirected into active reflection and improvement rather than administrative record-keeping.</p>
    
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 5px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin: 10px 0;">
      <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 4px; font-size: 11pt;">Centring Pupil Voice</h3>
      <p style="margin: 0; font-size: 9.5pt; color: #1e40af;">
        Feedback is a two-way dialogue, not a monologue. Our policy is fundamentally driven by <strong>Pupil Voice</strong>. Throughout all lessons, live marking requires pupils to vocalize their understanding and misconceptions during teacher coaching. Furthermore, at the end of every unit, pupils complete structured reflections to explicitly voice what they found engaging or challenging, directly informing and adapting future teacher planning.
      </p>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 4px; margin-top: 14px; font-size: 12pt;">Presentation & Workbooks</h2>
    <p style="font-size: 9.5pt;">The history department utilizes structured A4 workbooks for all Key Stage 3 year groups and GCSE Mastery Booklets for Key Stage 4. This reduces the reliance on loose worksheets and the time spent managing traditional exercise books. By pairing these structured workbooks with our bespoke digital learning app, we create a unified system: the app drives retrieval practice and interactive revision, while the workbook provides a permanent, high-quality physical record for extended writing and core knowledge.</p>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 4px; margin-top: 14px; font-size: 12pt;">Frequency of Marking</h2>
    
    <h3 style="color: #1e40af; margin-bottom: 4px; font-size: 10pt;">Key Stage 3</h3>
    <p style="font-size: 9pt;">Teachers will provide two pieces of feedback-focused homework each half term: one 'Read Out Loud' task (self-graded on Teams) to support literacy across the curriculum, and one short written piece graded by the teacher using the KS3 levels. Routine classwork is not formally stamped; instead, teacher time is reinvested into high-quality planning and live verbal feedback during lessons.</p>
    
    <h3 style="color: #1e40af; margin-bottom: 4px; font-size: 10pt;">Key Stage 4</h3>
    <p style="font-size: 9pt;">At Key Stage 4, there is increased flexibility in assessment methods depending on the unit being studied. Generally, this involves ongoing, low-stakes informal assessment conducted at regular intervals in class. Feedback is primarily delivered verbally, focusing on teacher modelling of answers and exam technique, with a particular emphasis on source-based questions.</p>
    
    <p style="font-size: 9pt; margin-bottom: 0;">To ensure progress is monitored effectively, a formal tracking sheet is utilized within Teams Assignments. This includes CAT4 target grades, which serve as a minimum target rate with the clear aspiration for pupils to exceed them.</p>
  </div>

  <!-- ==================== PAGE 3: PART 2 - TYPES, STANDARDS & GRADING ==================== -->
  <div class="page">
    <div class="header-banner">
      <h1>Part 2: Standards, Grading & Feedback Types</h1>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 4px; margin-top: 0; font-size: 12pt;">Types of Marking & Feedback</h2>
    
    <div class="two-col-grid" style="margin-bottom: 8px;">
      <div>
        <h3 style="color: #1e40af; font-size: 9.5pt; margin-bottom: 2px;">Live In-The-Moment Marking</h3>
        <p style="font-size: 8.5pt;">Intervention marking within the lesson to prompt deeper thinking and address misconceptions. Occurs through effective verbal questioning to clarify or refocus tasks.</p>
        
        <h3 style="color: #1e40af; font-size: 9.5pt; margin-bottom: 2px;">Self & Peer Assessment</h3>
        <p style="font-size: 8.5pt;">Pupils are given regular opportunities to assess their own or peers' work against explicit success criteria or structured checklists before teacher corroboration.</p>
      </div>
      <div>
        <h3 style="color: #1e40af; font-size: 9.5pt; margin-bottom: 2px;">End of Unit Assessments & Pupil Voice</h3>
        <p style="font-size: 8.5pt;">Written feedback based on set criteria or formal mark schemes. Following assessment, pupils complete the <strong>Pupil Reflection Area</strong> in their workbooks to document progress and set forward targets.</p>

        <h3 style="color: #1e40af; font-size: 9.5pt; margin-bottom: 2px;">Automated Digital Marking</h3>
        <p style="font-size: 8.5pt;">Spaced retrieval quizzes set on our custom history app provide instant self-marking and diagnostic feedback, with completion monitored centrally.</p>
      </div>
    </div>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 4px; margin-top: 10px; font-size: 12pt;">Spelling, Punctuation & Grammar (SPaG)</h2>
    <p style="font-size: 8.5pt;">We follow the English department's marking guide to set clear, consistent standards across the humanities:</p>
    
    <table style="font-size: 8.5pt; margin-bottom: 10px;">
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
          <td>Incorrect spelling</td>
          <td><span class="symbol-pill">^</span></td>
          <td>Word omitted</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">P</span></td>
          <td>Punctuation issue</td>
          <td><span class="symbol-pill">?</span></td>
          <td>Meaning is unclear</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">G</span></td>
          <td>Grammar problem</td>
          <td><span class="symbol-pill">!</span></td>
          <td>Basic historical error</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">C</span></td>
          <td>Capital letter needed</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓</span></td>
          <td>Good point / valid evidence</td>
        </tr>
        <tr>
          <td><span class="symbol-pill">//</span></td>
          <td>New paragraph needed</td>
          <td><span class="symbol-pill" style="color: #166534; background: #dcfce7;">✓✓</span></td>
          <td>Exceptional point / insight</td>
        </tr>
      </tbody>
    </table>

    <h2 style="color: #1b365d; border-bottom: 2px solid #d97706; padding-bottom: 4px; margin-top: 8px; font-size: 12pt;">Assessment & Grading Framework</h2>
    
    <p style="font-size: 8.5pt; margin-bottom: 6px;">
      <strong>Recording Progress:</strong> Progress tracking is maintained using the assessment grid located on the inside front cover of the pupil workbooks. 
      <strong>Progress Categories:</strong> Awarded based on work produced against set success criteria:
    </p>

    <table style="font-size: 8.5pt; margin-bottom: 0;">
      <thead>
        <tr>
          <th>Pathway Level</th>
          <th>Percentage Band</th>
          <th>GCSE Indicative Grades</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>GD (Greater Depth)</strong></td><td>80% – 100%</td><td>Grades 8 – 9</td></tr>
        <tr><td><strong>Exp + (Expected +)</strong></td><td>60% – 79%</td><td>Grades 6 – 7</td></tr>
        <tr><td><strong>Exp (Expected)</strong></td><td>40% – 59%</td><td>Grades 4 – 5</td></tr>
        <tr><td><strong>EM + (Emerging +)</strong></td><td>30% – 39%</td><td>Grade 3</td></tr>
        <tr><td><strong>EM (Emerging)</strong></td><td>10% – 29%</td><td>Grades 1 – 2</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== PAGE 4: PART 3 - VISUAL EVIDENCE (KEY STAGE 3) ==================== -->
  <div class="page">
    <div class="section-banner-appendix">
      <h2>Part 3: Exemplar Implementation & Visual Evidence (Key Stage 3)</h2>
      <span class="section-badge">Visual Appendix • KS3</span>
    </div>

    <p style="font-size: 8.8pt;">
      To illustrate the policy in practice, every Key Stage 3 student workbook incorporates systematic front-cover tracking and back-page pupil reflection:
    </p>

    <div style="display: grid; grid-template-columns: 88mm 1fr; gap: 14px; align-items: start; margin-bottom: 8px;">
      <div>
        <div class="figure-container" style="margin: 0;">
          <img src="${fig1Base64}" class="figure-image" style="max-height: 120mm; object-fit: contain;" alt="Figure 1: KS3 Inside Front Cover Tracker">
          <div class="figure-caption">
            <strong>Figure 1: Inside Front Cover Progress & Assessment Tracker (KS3 Workbook).</strong>
            Lesson-by-lesson chronological audit trail tracking Effort (1–5), Pathway standard, and teacher/self dialogue.
          </div>
        </div>
      </div>

      <div>
        <div class="sub-heading" style="margin-top: 0;">Inside Front Cover Tracking Grid</div>
        <p style="font-size: 8.2pt;">
          Serves as an ongoing dialogue between pupil, teacher, and parents:
        </p>
        <ul style="font-size: 8pt; padding-left: 14px; margin: 0 0 6px 0; color: #334155;">
          <li><strong>Effort Logging (1–5):</strong> Fosters personal responsibility and evaluates active participation.</li>
          <li><strong>Pathway Level:</strong> Records progress towards Greater Depth (GD) against National Curriculum criteria.</li>
          <li><strong>Formative Feedback:</strong> Focuses teacher comments on actionable praise and immediate targets.</li>
        </ul>

        <div class="sub-heading">Effort Scoring Rubric (1–5)</div>
        <table style="font-size: 7.5pt; margin-bottom: 0;">
          <thead>
            <tr><th style="width: 25%;">Score</th><th>Pupil Focus & Diligence</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>5 • Exemplary</strong></td><td>Proactive curiosity; voluntary extension; impeccable pride.</td></tr>
            <tr><td><strong>4 • Good</strong></td><td>Consistent engagement; thoughtful contributions; complete work.</td></tr>
            <tr><td><strong>3 • Satisfactory</strong></td><td>Meets baseline; requires occasional prompting.</td></tr>
            <tr><td><strong>2 • Inconsistent</strong></td><td>Incomplete written tasks; frequent off-task reminders.</td></tr>
            <tr><td><strong>1 • Concern</strong></td><td>Persistent passivity; triggers departmental intervention.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sub-heading">Visual Evidence: End-of-Unit Reflection & Pupil Voice</div>
    <div class="figure-container" style="margin: 4px 0 0 0;">
      <img src="${fig2Base64}" class="figure-image" style="max-height: 52mm; object-fit: contain;" alt="Figure 2: End of Unit Reflection & Pupil Voice">
      <div class="figure-caption">
        <strong>Figure 2: End of Unit Reflection & Two-Way Pupil Voice (Workbook Final Page).</strong>
        Students document successes (WWW), voice misconceptions for reteaching (EBI), self-score effort (1–5), and set forward targets validated by teacher coaching.
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 5: PART 3 - VISUAL EVIDENCE (KEY STAGE 4) ==================== -->
  <div class="page">
    <div class="section-banner-appendix">
      <h2>Part 3: Exemplar Implementation & Visual Evidence (Key Stage 4)</h2>
      <span class="section-badge">Visual Appendix • KS4</span>
    </div>

    <p style="font-size: 8.8pt;">
      At Key Stage 4, feedback is scaffolded through structured mastery booklets and targeted exam question intelligence:
    </p>

    <div class="figure-container" style="margin: 4px 0 8px 0;">
      <img src="${fig3Base64}" class="figure-image" style="max-height: 42mm; object-fit: contain;" alt="Figure 3: Section B Mastery Tracker">
      <div class="figure-caption">
        <strong>Figure 3: GCSE Section B Progress & Assessment Tracker (Edexcel Medicine Mastery Booklet).</strong>
        Maps student progression across Round 1 (Stepped Enquiries with writing frames), Round 2 (Dual-Track Enquiries for Grades 7–9), and Round 3 (Timed 55-minute Exam Hall Simulations).
      </div>
    </div>

    <div class="two-col-grid" style="margin-bottom: 6px;">
      <div class="col-card" style="font-size: 8pt;">
        <div class="sub-heading" style="margin-top: 0;">Specification-Specific Scaffolding</div>
        <ul style="padding-left: 14px; margin: 0; color: #334155;">
          <li><strong>Paper 1 (Western Front):</strong> Feature questions exist <em>strictly</em> as two separate 2-mark questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li><strong>Paper 2 (Elizabethan):</strong> Two distinct 2-mark feature questions: Q1(a) [2m] and Q1(b) [2m].</li>
          <li><strong>Paper 2 (Middle East):</strong> Updated single 4-mark consequence format ('Explain one consequence of...').</li>
        </ul>
      </div>

      <div class="col-card" style="font-size: 8pt;">
        <div class="sub-heading" style="margin-top: 0;">Provenance Clues ('How Useful' Scaffolding)</div>
        <p style="margin: 0; line-height: 1.35;">
          Explicit prompt boxes guide students to evaluate <strong>Author</strong> (role, firsthand access), <strong>Audience</strong> (private diary vs propaganda), and <strong>Motive</strong> (purpose of publication), moving beyond generic utility comments.
        </p>
      </div>
    </div>

    <div class="sub-heading">Longitudinal Exam Trend Intelligence & Automated Quizzing</div>
    <div class="figure-container" style="margin: 4px 0 0 0;">
      <img src="${fig4Base64}" class="figure-image" style="max-height: 70mm; object-fit: contain;" alt="Figure 4: Exam Trend Matrix Wide Table">
      <div class="figure-caption">
        <strong>Figure 4: Pearson Edexcel Past Exam Question Matrix (8-Series Analysis, 2018–2026).</strong>
        Departmental tracking across Medicine, Elizabethan, Middle East, Germany, and USA. Flags overdue question tariffs and unexamined syllabus themes, allowing teachers to deliver high-yield classroom rehearsals and automated 20-question mastery quizzes.
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

  console.log('Launching Puppeteer to render Version 2 PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
        <span>Meoncross School History Department • Marking & Feedback Policy (2026–2027)</span>
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
