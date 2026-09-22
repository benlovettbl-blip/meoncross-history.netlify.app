/**
 * History Revision Hub — Guidance Manuals Generator
 *
 * Compiles professional, laminated-style A4 PDF standard operating procedures
 * into public/history_revision_hub_guidance/
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.join(__dirname, '..', 'public', 'history_revision_hub_guidance');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const guides = [
  {
    id: 'guide_01',
    filename: 'Guide_01_The_Tripartite_Curriculum_Model.pdf',
    title: 'Guide 01: The Tripartite Curriculum Model',
    subtitle: 'Architecture & Separation of Concerns: Textbooks, Workbooks & The Digital App',
    category: 'CURRICULUM ARCHITECTURE & SYSTEM DESIGN',
    content: `
      <div class="intro-box">
        <strong>Executive Summary:</strong> The History Revision Hub operates on a strict <strong>Tripartite Model</strong> designed to eliminate cognitive friction, prevent question numbering desynchronization, and drastically reduce school reprographics costs. By separating reading material from pupil writing and interactive quizzing, each document fulfills a singular disciplinary purpose.
      </div>

      <div class="grid-3">
        <div class="card">
          <div class="card-header blue">📖 The Textbook (Classroom Set)</div>
          <div class="card-body">
            <strong>Role:</strong> The permanent, timeless reading anthology.<br><br>
            <strong>Key Features:</strong>
            <ul>
              <li>Authoritative 4-act Christine Counsell disciplinary narrative.</li>
              <li>Two-column layout (50–65 char measure) to prevent eye-sweep fatigue.</li>
              <li>Left-margin line numbering (every 5 lines) for precise teacher signposting.</li>
              <li>Archival source plaques with museum shelfmarks and provenance.</li>
              <li><strong>ZERO task lines, ZERO Do-Now blanks.</strong></li>
              <li>Reused year after year; never scribbled in or discarded.</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header amber">📝 The Pupil Workbook (Consumable)</div>
          <div class="card-body">
            <strong>Role:</strong> The 16-page consumable termly writing pack.<br><br>
            <strong>Key Features:</strong>
            <ul>
              <li>The <em>only</em> document where pupils write answers.</li>
              <li>Pre-numbered tasks (Q1, Q2, Q3...) strictly aligned to digital app.</li>
              <li>Do-Now prior-learning recall grids and vocabulary challenges.</li>
              <li>Scaffolded exam writing with criteria stems and model answers.</li>
              <li>Audited to 99% page utilization with 0px overflow.</li>
              <li>Printed per student each term as a saddle-stitched booklet.</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header emerald">💻 The Digital App (Interactive Hub)</div>
          <div class="card-body">
            <strong>Role:</strong> The interactive revision and multimedia engine.<br><br>
            <strong>Key Features:</strong>
            <ul>
              <li>Self-marking recall quizzes with instant formative feedback.</li>
              <li>Flashcard decks with morphological etymology.</li>
              <li>Interactive chronologies, map sliders, and satellite views.</li>
              <li>Masterpiece Studio: 2.5x Loupe inspection and detective riddles.</li>
              <li>Audio read-aloud synthesizers for accessible whole-class reading.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section-title">Why This Solved the "September Numbering Desynchronization" Crisis</div>
      <p>In legacy setups, questions were printed in both the textbook and the workbook. Any editorial change shifted question numbering (e.g. Question 3 becoming Question 4), breaking synchronization with printed student packs. Under the Tripartite Model:</p>
      <div class="highlight-rule">
        <strong>The Golden Rule of Indexing:</strong> The Textbook NEVER contains question numbers. Question numbering lives <em>canonically and exclusively</em> within the Pupil Workbook and Digital App. Because the textbook is purely indexed by paragraph references (e.g. <code>[1.1]</code>, <code>[2.2]</code>) and source letters (<code>Source A</code>, <code>Source B</code>), it can never drift out of numerical alignment.
      </div>
    `,
  },
  {
    id: 'guide_02',
    filename: 'Guide_02_The_Master_Cover_Engine_and_Customizer.pdf',
    title: 'Guide 02: The Master Cover Engine & Commercial Customizer',
    subtitle: 'Standardized Cover Architecture, Specification Grid & Multi-School Branding',
    category: 'DESIGN SYSTEM & INSTITUTIONAL NEUTRALITY',
    content: `
      <div class="intro-box">
        <strong>Executive Summary:</strong> All printed pupil workbooks and revision guides enforce the <strong>Master Cover Engine</strong> (<code>scripts/components/render_standard_cover.cjs</code>). This ensures a dignified, museum-grade aesthetic that complies with the Pearson Edexcel specification while maintaining 100% commercial neutrality for purchasing schools.
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header blue">🏛️ Front Cover Architecture (Page 1)</div>
          <div class="card-body">
            <ul>
              <li><strong>Top Departmental Header:</strong> Features <code>data-department-name="The History Department"</code>, enabling any school to brand the cover.</li>
              <li><strong>Chronological Banner:</strong> Displays Key Topic number, dates, and official Pearson qualification code (e.g. <code>SPECIFICATION 1HI0/2B</code>).</li>
              <li><strong>Archival Hero Plaque:</strong> 120mm landscape historical photograph with accession shelfmark, date, photographer/artist, and institutional repository.</li>
              <li><strong>Pupil Identification Block:</strong> Crisp Name, Class, and Teacher fields with classical hairline borders.</li>
              <li><strong>3-Column Specification Breakdown:</strong> Direct Pearson specification syllabus points filling the bottom page budget with 0 dead white void.</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header purple">📊 Back Cover Architecture (Page 16)</div>
          <div class="card-body">
            <ul>
              <li><strong>Assessment Progress Ledger:</strong> Formative breakdown of enquiry marks (/26 per topic, /130 total) with benchmark conversion.</li>
              <li><strong>WWW / EBI Feedback Section:</strong> 4-line 7.2mm handwriting lines for teacher formative feedback, SEND adaptations, and pupil response.</li>
              <li><strong>Teacher Sign-off:</strong> Dedicated signature and date approval lines.</li>
              <li><strong>5-Code Vector QR Hub:</strong> Vector SVGs linking pupils directly to online flashcards, digital quizzes, model answers, and audio narratives.</li>
              <li><strong>Bottom Folio:</strong> Departmental imprint and pagination marker.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section-title">Commercial Multi-School Customizer Pattern</div>
      <p>To maintain commercial neutrality, the repository strictly forbids hardcoded school names. Purchasing schools can instantly brand their printed packs via three seamless mechanisms:</p>
      <div class="code-box">
        1. <strong>Browser Query Param:</strong> Add <code>?school=St+Peters+Collegiate</code> to the URL.<br>
        2. <strong>CLI Build Flag:</strong> <code>SCHOOL_NAME="St Jude's Academy" node scripts/export_pdfs.cjs cme_new</code><br>
        3. <strong>Pure CSS Override:</strong> <code>[data-department-name]::after { content: "Your School Name"; }</code>
      </div>
    `,
  },
  {
    id: 'guide_03',
    filename: 'Guide_03_Reprographics_and_Print_Handbook.pdf',
    title: 'Guide 03: Reprographics & Print Handbook',
    subtitle: 'Saddle-Stitch Imposition, Gutter Margins & Duplex Booklet Production',
    category: 'PRINT PRODUCTION & REPROGRAPHICS MANUAL',
    content: `
      <div class="intro-box">
        <strong>Instructions for Reprographics & Print Room Staff:</strong> All pupil workbooks are engineered for <strong>A4 Portrait Saddle-Stitched Booklets</strong> (printed two-up on A3 paper, folded and stapled on the spine). Follow these exact machine settings to guarantee flawless page alignment.
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header emerald">🖨️ Photocopier / RISO Machine Settings</div>
          <div class="card-body">
            <ul>
              <li><strong>Original Document Size:</strong> A4 Portrait (210mm &times; 297mm).</li>
              <li><strong>Target Paper Size:</strong> A3 Landscape (420mm &times; 297mm).</li>
              <li><strong>Layout Mode:</strong> Booklet / 2-Up Saddle-Stitch (Left Binding).</li>
              <li><strong>Duplexing:</strong> 2-Sided &rarr; 2-Sided (Flip on Short Edge).</li>
              <li><strong>Finishing / Stapling:</strong> Center Saddle-Stitch (Dual Spine Staples).</li>
              <li><strong>Scaling:</strong> 100% (Do NOT choose "Fit to Printable Area" as margins are already calibrated).</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header blue">📐 Gutter Margins & Creep Allowance</div>
          <div class="card-body">
            <ul>
              <li><strong>Internal Gutter:</strong> 10mm inner margin on all pages ensures text is never swallowed by the spine fold.</li>
              <li><strong>Outer Margin:</strong> 10mm outer margin protects content from edge trimmer clipping.</li>
              <li><strong>Page Budget:</strong> 16-page count ensures 4 physical A3 folded sheets with zero blank waste pages.</li>
              <li><strong>Recommended Paper Stock:</strong>
                <ul>
                  <li><strong>Cover Sheet (Pages 1 &amp; 16):</strong> 120gsm or 160gsm Silk/Matt Cardstock.</li>
                  <li><strong>Inner Pages (Pages 2–15):</strong> 80gsm or 90gsm Uncoated (prevents ink show-through from highlighters).</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section-title">16-Page Booklet Imposition Diagram</div>
      <p>When printed as a saddle-stitched booklet, pages pair automatically on A3 sheets:</p>
      <div class="imposition-diagram">
        <strong>Sheet 1 (Outer):</strong> Page 16 (Back Cover) &bull; Page 1 (Front Cover) &nbsp;|&nbsp; <em>Reverse:</em> Page 2 &bull; Page 15<br>
        <strong>Sheet 2:</strong> Page 14 (Map Atlas) &bull; Page 3 (Enquiry 1) &nbsp;|&nbsp; <em>Reverse:</em> Page 4 &bull; Page 13<br>
        <strong>Sheet 3:</strong> Page 12 (Exam Practice) &bull; Page 5 (Enquiry 2) &nbsp;|&nbsp; <em>Reverse:</em> Page 6 &bull; Page 11<br>
        <strong>Sheet 4 (Center):</strong> Page 10 (Exam Practice) &bull; Page 7 (Enquiry 3) &nbsp;|&nbsp; <em>Reverse:</em> Page 8 &bull; Page 9
      </div>
    `,
  },
  {
    id: 'guide_04',
    filename: 'Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.pdf',
    title: 'Guide 04: Disciplinary Pedagogy & Research Evidence',
    category: 'EVIDENCE-INFORMED PEDAGOGICAL BLUEPRINT',
    pages: [
      {
        subtitle:
          'Part I: Foundational Pillars — Counsell, Quigley, The Writing Revolution & Cognitive Load',
        content: `
          <div class="intro-box">
            <strong>Academic Rationale:</strong> Every element of The History Revision Hub is grounded in contemporary educational research. We combine <strong>disciplinary historical rigor</strong> with <strong>cognitive science</strong> to support all learners from low-attaining SEND pupils to high-tariff GCSE candidates.
          </div>

          <div class="grid-2">
            <div class="card">
              <div class="card-header blue">🏛️ 1. Christine Counsell: Disciplinary Narrative & Enquiry</div>
              <div class="card-body">
                <strong>Core Concept:</strong> History is not a list of isolated facts; it is an enquiry-driven discipline where substantive narrative carries disciplinary meaning.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>4-Act Dramatic Structure:</strong> Context &rarr; Conflict &rarr; Archival Evidence &rarr; Historical Verdict.</li>
                  <li><strong>Death of the Comprehension Treadmill:</strong> Eliminates fragmented mid-text recall trivia; channels cognitive energy into a single high-yield Act 4 extended writing enquiry with PEEL scaffolds.</li>
                  <li><strong>Pure [Act.Paragraph] Notation:</strong> Eliminates sentence clutter, indexing text as <code>[1.1]</code>, <code>[2.1]</code> to train pupils to cite narrative blocks.</li>
                  <li><strong>Fingertip vs. Residual Knowledge:</strong> Starter retrieval primes prior schema; front-loaded vocab fuels today's debate.</li>
                </ul>
                <div class="citation">
                  <strong>Key Reference:</strong> Counsell, C. (2000). <em>"Historical knowledge and the curriculum"</em>, Teaching History, 100 &bull; Dawson, I. (2004). <em>"Creating a sense of enquiry"</em>, TH 117.<br>
                  <strong>Research Link:</strong> <a href="https://www.history.org.uk/secondary/categories/436/module/8702/teaching-history" target="_blank">www.history.org.uk (Historical Association)</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header amber">📚 2. Alex Quigley: Closing the Vocabulary Gap</div>
              <div class="card-body">
                <strong>Core Concept:</strong> Academic language is the primary gatekeeper of student success. Explicit Tier-2/3 vocabulary instruction closes attainment disparities.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>The Golden Sentence:</strong> Pupils connect Tier-3 terms using subordinating conjunctions (<em>although, because, consequently</em>).</li>
                  <li><strong>Odd-One-Out Trios:</strong> Develops conceptual clustering and historiographical reasoning.</li>
                  <li><strong>Immediate Margin Glossaries:</strong> Prevents cognitive disruption by defining words right beside the text.</li>
                </ul>
                <div class="citation">
                  <strong>Key Reference:</strong> Quigley, A. (2018). <em>Closing the Vocabulary Gap</em>, Routledge.<br>
                  <strong>Research Link:</strong> <a href="https://www.theconfidentteacher.co.uk/" target="_blank">www.theconfidentteacher.co.uk (Research Blog)</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header emerald">✍️ 3. The Writing Revolution (Hochman & Wexler)</div>
              <div class="card-body">
                <strong>Core Concept:</strong> Students cannot write rigorous multi-page essays until they master sentence-level syntax and causal relationships.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>Because / But / So Scaffolding:</strong> Structured analytical expansions before extended writing.</li>
                  <li><strong>Evidence Stems & Counter-Stems:</strong> Pre-crafted sentence openers that lower working memory barriers for SEND pupils.</li>
                  <li><strong>Strict Model Answers:</strong> Every task includes a historically accurate, high-tariff model answer.</li>
                </ul>
                <div class="citation">
                  <strong>Key Reference:</strong> Hochman, J. &amp; Wexler, N. (2017). <em>The Writing Revolution</em>, Jossey-Bass.<br>
                  <strong>Research Link:</strong> <a href="https://www.thewritingrevolution.org/" target="_blank">www.thewritingrevolution.org (TWR Institute)</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header purple">🧠 4. Sweller: Cognitive Load Theory & SEND Measure</div>
              <div class="card-body">
                <strong>Core Concept:</strong> Working memory is severely limited. Extraneous cognitive load must be minimized to allow germane schema construction.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>2-Column Reading Measure:</strong> Constrains line length to 50–65 characters, eliminating "eye-sweep tracking fatigue" for dyslexic readers.</li>
                  <li><strong>Margin Line Numbering:</strong> "Line 14, Johnny" rule allows instant teacher signposting without confusion.</li>
                  <li><strong>Prior-Recall Isolation:</strong> Do-Now retrieval strictly tests prior lessons, never current unfamiliar material.</li>
                </ul>
                <div class="citation">
                  <strong>Key Reference:</strong> Sweller, J. (1988). <em>Cognitive Load During Problem Solving</em>, Cognitive Science.<br>
                  <strong>Research Link:</strong> <a href="https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/cognitive-science-approaches-in-the-classroom" target="_blank">educationendowmentfoundation.org.uk (EEF Review)</a>
                </div>
              </div>
            </div>
          </div>
        `,
      },
      {
        subtitle:
          'Part II: Classroom Execution — SEND Inclusive Strategies, Rosenshine & Formative Ledgers',
        content: `
          <div class="grid-2">
            <div class="card">
              <div class="card-header" style="background: #e11d48;">♿ 5. SEND & Inclusive Accessibility in History</div>
              <div class="card-body">
                <strong>Core Concept:</strong> High structure, not diluted content, creates accessibility for neurodiverse learners.<br><br>
                <strong>What Fails (Strictly Prohibited):</strong>
                <ul>
                  <li>❌ Unchunked dense walls of text (causes tracking breakdown).</li>
                  <li>❌ Sentence-by-sentence indices <code>[1.1], [1.2]</code> (visual noise).</li>
                  <li>❌ Answering questions on page 9 while text is on page 2.</li>
                </ul>
                <strong>What Works (Enforced Across Revision Hub):</strong>
                <ul>
                  <li>✅ 50–65 char measure + margin line numbers every 5 lines.</li>
                  <li>✅ 7.2mm pre-printed handwriting lines for motor control.</li>
                  <li>✅ Pre-crafted sentence openers and structure strips.</li>
                  <li>✅ Synchronized audio read-aloud for dual sensory input.</li>
                </ul>
                <div class="citation">
                  <strong>Reference:</strong> EEF (2020). <em>Special Educational Needs in Mainstream Schools</em>.<br>
                  <strong>Research Link:</strong> <a href="https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/send" target="_blank">educationendowmentfoundation.org.uk/education-evidence/guidance-reports/send</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" style="background: #0d9488;">🔄 6. Rosenshine: Prior-Recall & Hinge Questions</div>
              <div class="card-body">
                <strong>Core Concept:</strong> Daily retrieval practice automates recall and frees working memory for high-level enquiry.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>Recall Isolation:</strong> "Do Now" questions test prior units ONLY. Guessing unfamiliar content is banned.</li>
                  <li><strong>Targeted Hinge Questions:</strong> Embedded in teacher notes to verify conceptual mastery before transitions.</li>
                  <li><strong>Small-Step Guided Practice:</strong> Direct instruction chunked into manageable cognitive steps.</li>
                </ul>
                <div class="citation">
                  <strong>Reference:</strong> Rosenshine, B. (2012). <em>"Principles of instruction"</em>, American Educator.<br>
                  <strong>Research Link:</strong> <a href="https://www.aft.org/ae/spring2012/rosenshine" target="_blank">www.aft.org/ae/spring2012/rosenshine (Full Paper)</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" style="background: #4338ca;">📊 7. Dylan Wiliam: Formative Assessment & DIRT</div>
              <div class="card-body">
                <strong>Core Concept:</strong> Feedback must cause more work for the pupil than for the teacher.<br><br>
                <strong>Application in Our System:</strong>
                <ul>
                  <li><strong>Back-Cover Progress Ledger:</strong> Formative breakdown of enquiry marks (/26) with benchmark conversion.</li>
                  <li><strong>WWW / EBI Handwriting Lines:</strong> Targeted feedback boxes with dedicated pupil DIRT response time.</li>
                  <li><strong>Live Highlighting:</strong> In-class yellow highlighter targeting academic vocabulary over red margin ink.</li>
                </ul>
                <div class="citation">
                  <strong>Reference:</strong> Wiliam, D. (2011). <em>Embedded Formative Assessment</em>.<br>
                  <strong>Research Link:</strong> <a href="https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback" target="_blank">educationendowmentfoundation.org.uk (EEF Feedback Report)</a>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" style="background: #0f172a;">🌐 8. Master Educational Research Directory</div>
              <div class="card-body">
                <strong>Direct Research Web Hubs for Department Leaders:</strong>
                <ul>
                  <li><strong>Historical Association:</strong> <a href="https://www.history.org.uk" target="_blank">www.history.org.uk</a></li>
                  <li><strong>The Confident Teacher:</strong> <a href="https://www.theconfidentteacher.co.uk" target="_blank">www.theconfidentteacher.co.uk</a></li>
                  <li><strong>The Writing Revolution:</strong> <a href="https://www.thewritingrevolution.org" target="_blank">www.thewritingrevolution.org</a></li>
                  <li><strong>EEF Guidance Reports:</strong> <a href="https://educationendowmentfoundation.org.uk" target="_blank">educationendowmentfoundation.org.uk</a></li>
                  <li><strong>British Dyslexia Association:</strong> <a href="https://www.bdadyslexia.org.uk" target="_blank">www.bdadyslexia.org.uk</a></li>
                  <li><strong>Dylan Wiliam Assessment:</strong> <a href="https://www.dylanwiliam.org" target="_blank">www.dylanwiliam.org</a></li>
                </ul>
                <div class="citation" style="margin-top: 8px;">
                  All platform documents are 100% compliant with UK national curriculum specifications and peer-reviewed educational research.
                </div>
              </div>
            </div>
          </div>
        `,
      },
    ],
  },
];

function generateGuideHtml(guide) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${guide.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 8.5pt;
      line-height: 1.35;
      color: #0f172a;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2mm 4mm;
    }
    .header-bar {
      border-bottom: 2.5px solid #0f172a;
      padding-bottom: 5px;
      margin-bottom: 8px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    .brand-title {
      font-size: 11pt;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0f172a;
    }
    .brand-subtitle {
      font-size: 7.5pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .cat-badge {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 17pt;
      font-weight: 800;
      margin: 0 0 2px 0;
      color: #0f172a;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 8.5pt;
      color: #475569;
      font-style: italic;
      margin-bottom: 6px;
    }
    .intro-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 10px;
      font-size: 8.2pt;
      line-height: 1.4;
      color: #1e293b;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }
    .card {
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .card-header {
      padding: 5px 8px;
      font-weight: 800;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #ffffff;
    }
    .card-header.blue { background: #1e3a8a; }
    .card-header.amber { background: #b45309; }
    .card-header.emerald { background: #065f46; }
    .card-header.purple { background: #581c87; }
    .card-body {
      padding: 8px;
      font-size: 7.6pt;
      line-height: 1.35;
      color: #334155;
      flex: 1;
    }
    .card-body ul {
      margin: 4px 0 0 0;
      padding-left: 14px;
    }
    .card-body li {
      margin-bottom: 3px;
    }
    .citation {
      margin-top: 6px;
      padding-top: 5px;
      border-top: 1px dashed #cbd5e1;
      font-size: 7pt;
      color: #64748b;
    }
    .citation a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      margin-top: 2px;
    }
    .section-title {
      font-weight: 800;
      font-size: 8.8pt;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 8px 0 6px 0;
    }
    .highlight-rule {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-left: 4px solid #16a34a;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 8pt;
      color: #166534;
      line-height: 1.35;
    }
    .code-box {
      background: #0f172a;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 7.8pt;
      line-height: 1.5;
    }
    .imposition-diagram {
      background: #f8fafc;
      border: 1.5px solid #0284c7;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 7.8pt;
      color: #0369a1;
      line-height: 1.6;
    }
    .footer-bar {
      border-top: 1.5px solid #0f172a;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  ${(() => {
    const pages = guide.pages || [{ content: guide.content, subtitle: guide.subtitle }];
    const totalPages = pages.length;
    return pages
      .map(
        (p, idx) => `
      <div class="page-container" ${idx < totalPages - 1 ? 'style="page-break-after: always; break-after: always;"' : ''}>
        <div>
          <div class="header-bar">
            <div class="header-top">
              <div class="brand-title">THE HISTORY REVISION HUB</div>
              <div class="brand-subtitle">DEPARTMENT PORTAL &bull; STANDARD OPERATING PROCEDURE</div>
            </div>
            <div class="cat-badge">${guide.category}</div>
            <h1>${guide.title}</h1>
            <div class="subtitle">${p.subtitle || guide.subtitle}</div>
          </div>

          ${p.content}
        </div>

        <div class="footer-bar">
          <span>The History Revision Hub &bull; Disciplinary Guidance System &bull; 2026 Edition</span>
          <span>Strict Commercial Neutrality &bull; Page ${idx + 1} of ${totalPages}</span>
        </div>
      </div>
    `,
      )
      .join('');
  })()}
</body>
</html>`;
}

(async () => {
  console.log('🚀 Compiling History Revision Hub Guidance Manuals...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const guide of guides) {
    console.log(`Rendering ${guide.filename}...`);
    const page = await browser.newPage();
    const html = generateGuideHtml(guide);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Save HTML version
    const htmlPath = path.join(outputDir, guide.filename.replace('.pdf', '.html'));
    fs.writeFileSync(htmlPath, html, 'utf8');

    // Export PDF
    const pdfPath = path.join(outputDir, guide.filename);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });
    console.log(`✅ Exported: ${guide.filename}`);
    await page.close();
  }

  await browser.close();
  console.log('🎉 All 4 Guidance Manuals compiled successfully!');
})();
