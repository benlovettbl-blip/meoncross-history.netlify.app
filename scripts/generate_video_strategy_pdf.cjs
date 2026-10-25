const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const desktopPath = path.join('C:', 'Users', 'fives', 'Desktop', 'Classroom_Video_Architecture_and_Master_Rollout_Plan.pdf');
const publicPdfPath = path.join(__dirname, '..', 'public', 'pdfs', 'Classroom_Video_Architecture_and_Master_Rollout_Plan.pdf');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Master Curriculum Video Architecture &amp; Rollout Plan</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      font-size: 9.5pt;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 100%;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Running Header & Footer */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }

    .doc-header .brand {
      font-weight: 800;
      font-size: 11pt;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .doc-header .meta-tag {
      font-size: 8pt;
      font-weight: 700;
      color: #0284c7;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #e0f2fe;
      padding: 3px 8px;
      border-radius: 4px;
    }

    h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-bottom: 6px;
      letter-spacing: -0.03em;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0369a1;
      margin-top: 10px;
      margin-bottom: 4px;
    }

    p {
      margin-bottom: 8px;
      color: #334155;
    }

    .lead-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 14px;
      font-size: 9pt;
      color: #334155;
    }

    /* Cards Grid */
    .card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px;
    }

    .card.highlight {
      background: #f0f9ff;
      border-color: #bae6fd;
    }

    .card-title {
      font-weight: 700;
      font-size: 10pt;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card p {
      font-size: 8.5pt;
      margin-bottom: 0;
      color: #475569;
    }

    /* 3-Tier Ladder Table */
    .ladder-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 14px 0;
      font-size: 8.5pt;
    }

    .ladder-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 6px 10px;
      font-weight: 700;
      font-size: 8.5pt;
    }

    .ladder-table td {
      padding: 6px 10px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }

    .badge-tier {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .tier-recall { background: #dbeafe; color: #1e40af; }
    .tier-explain { background: #fef3c7; color: #92400e; }
    .tier-challenge { background: #fce7f3; color: #9d174d; }

    /* Pipeline Steps */
    .pipeline-step {
      display: flex;
      gap: 12px;
      margin-bottom: 10px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 12px;
    }

    .step-num {
      width: 28px;
      height: 28px;
      background: #0284c7;
      color: #ffffff;
      font-weight: 800;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 10pt;
    }

    .step-body {
      flex: 1;
    }

    .step-title {
      font-weight: 700;
      font-size: 9.5pt;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .step-desc {
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 0;
    }

    /* Inventory Table */
    .inv-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8pt;
    }

    .inv-table th {
      background: #1e293b;
      color: #ffffff;
      text-align: left;
      padding: 5px 8px;
      font-weight: 700;
    }

    .inv-table td {
      padding: 4px 8px;
      border-bottom: 1px solid #e2e8f0;
    }

    .inv-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .status-badge {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .status-complete { background: #dcfce7; color: #166534; }
    .status-pending { background: #fef9c3; color: #854d0e; }
    .status-missing { background: #fee2e2; color: #991b1b; }

    .doc-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 7.5pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: ARCHITECTURE, PEDAGOGY & COGNITIVE LADDER -->
  <div class="page">
    <div class="doc-header">
      <div class="brand">THE HISTORY REVISION HUB</div>
      <div class="meta-tag">Master Publishing Standard</div>
    </div>

    <h1>Classroom Video Architecture &amp; Master Rollout Strategy</h1>
    <p style="font-size: 10pt; color: #64748b; margin-bottom: 12px; font-weight: 500;">
      A Pedagogical Blue-Print for Active Historical Inquiry, Dual-Pane Classroom Theater, and Multi-Lens Differentiation Across All Units
    </p>

    <div class="lead-box">
      <strong>Core Purpose:</strong> Video in secondary history lessons is too often a passive, unmonitored experience or a source of teacher friction (managing ads, searching for timestamps, or losing pupils to off-task distraction). This architecture transforms video into a <strong>rigorous, differentiated, and time-controlled learning instrument</strong> that directly drives GCSE examination skills and deep historical inquiry.
    </div>

    <h2>1. The Classroom Architecture: Solving Teacher Pain-Points</h2>
    <div class="card-grid">
      <div class="card highlight">
        <div class="card-title">⏱️ Eliminating Scrubber Friction</div>
        <p>Teachers have no time to hunt for specific scenes. Every clip specifies an exact <strong>Recommended Watch Window</strong> (e.g. <code>01:20–05:50</code>) with a one-click <strong>"Jump to Watch Window"</strong> button and instant <strong>"Restart (0:00)"</strong> control.</p>
      </div>
      <div class="card highlight">
        <div class="card-title">🎭 Dual-Pane Focus Theater</div>
        <p>Isolates the video in a 16:9 player on the left while simultaneously anchoring the pedagogical tasks on the right. <strong>Zero YouTube sidebar recommendations, zero external comments, zero distraction voids.</strong></p>
      </div>
      <div class="card">
        <div class="card-title">🧭 Curricular Phase Tagging</div>
        <p>Every clip is assigned an explicit lesson phase badge: <code>Starter Hook (0–5m)</code>, <code>Guided Instruction</code>, <code>Source Analysis &amp; Evidence</code>, or <code>Exam Extension</code>, telling the teacher exactly where it belongs in the hour.</p>
      </div>
      <div class="card">
        <div class="card-title">🔍 Historical Tone &amp; Perspective Alerts</div>
        <p>Briefs the teacher on historiographical perspective (e.g. <em>"Employs 1946 British newsreel rhetoric"</em> or <em>"Academic demographic analysis from 1922 censuses"</em>), modeling historical discipline.</p>
      </div>
    </div>

    <h2>2. The 3-Tier Cognitive Scaffolding Ladder</h2>
    <p>To ensure universal classroom accessibility from lower-attaining pupils to Grade 9 candidates, every single clip is paired with a strictly differentiated 3-tier task ladder:</p>

    <table class="ladder-table">
      <thead>
        <tr>
          <th style="width: 18%;">Tier</th>
          <th style="width: 25%;">Target Cognitive Skill</th>
          <th style="width: 35%;">Pedagogical Function</th>
          <th style="width: 22%;">GCSE Assessment Anchor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-tier tier-recall">Tier 1: Recall</span></td>
          <td>Concrete Factual Retrieval</td>
          <td>Direct timestamp anchor (<code>[01:15]</code>). Fosters early success for SEN/Lower-attainers by identifying names, dates, casualty counts, or treaties.</td>
          <td>AO1: Knowledge &amp; Understanding</td>
        </tr>
        <tr>
          <td><span class="badge-tier tier-explain">Tier 2: Explain</span></td>
          <td>Causal Reasoning &amp; Impact</td>
          <td>Requires pupils to articulate <em>why</em> an event occurred and connect causes to immediate geopolitical consequences.</td>
          <td>AO1 &amp; AO2: Cause, Consequence &amp; Significance</td>
        </tr>
        <tr>
          <td><span class="badge-tier tier-challenge">Tier 3: Challenge</span></td>
          <td>Historiographical Critique &amp; Bias</td>
          <td>High-attainer stretch: evaluates film propaganda, narrator rhetoric, conflicting interpretations, or ethical tensions.</td>
          <td>AO3 &amp; AO4: Source Evaluation &amp; Interpretations</td>
        </tr>
      </tbody>
    </table>

    <div class="card" style="margin-top: 8px;">
      <div class="card-title">💡 One-Click Interactive Mark Schemes</div>
      <p>Underneath the tasks, a collapsible <strong>"Reveal Model Answer &amp; Teacher Mark Scheme"</strong> accordion allows instant whole-class projection, self-assessment, or peer-marking before pupils transition to textbook reading.</p>
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Educational Architecture</div>
      <div>Confidential &amp; Proprietary • Page 1 of 3</div>
    </div>
  </div>

  <!-- PAGE 2: THE 4-STAGE METHODOLOGY & UNIT INVENTORY -->
  <div class="page">
    <div class="doc-header">
      <div class="brand">THE HISTORY REVISION HUB</div>
      <div class="meta-tag">Production Pipeline</div>
    </div>

    <h1>Production Methodology &amp; Platform Status</h1>
    <p style="font-size: 10pt; color: #64748b; margin-bottom: 12px; font-weight: 500;">
      The 4-Stage Quality Gate System for Methodical Unit Rollout
    </p>

    <h2>3. The 4-Stage Production Pipeline (Strict Quality Gates)</h2>
    <p>To avoid rushed authoring, broken links, or hallucinated timestamps, every curriculum unit passes through four non-negotiable gates:</p>

    <div class="pipeline-step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Stage 1: Sourcing &amp; Curatorial Multi-Perspective Audit</div>
        <p class="step-desc">Audit existing video arrays for dead links. Curate 3–4 high-definition clips per lesson across distinct pathways: <em>Starter Hook</em>, <em>Enquiry Evidence</em>, <em>Multi-Perspective</em> (e.g. Israeli vs. Palestinian; German vs. Allied), and <em>Cinematic / Oral History</em> (ERA / BBC / IWM). Sourcing directory is submitted for review before authoring begins.</p>
      </div>
    </div>

    <div class="pipeline-step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Stage 2: Timestamp Verification &amp; Pedagogical Authoring</div>
        <p class="step-desc">Direct inspection of the footage: establish the optimal 2–5 minute <em>Watch Window</em>. Author the teacher briefing (phase + tone alert). Formulate the bespoke 3-tier question ladder with exact minute-and-second anchors (<code>[MM:SS]</code>), plus detailed GCSE-calibre model answers.</p>
      </div>
    </div>

    <div class="pipeline-step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Stage 3: Technical Ingestion &amp; Database Rebuild</div>
        <p class="step-desc">Inject clean data into <code>units/[unit_id]/data.js</code> and <code>data/[unit_id].json</code>. Recompile <code>public/database.json</code> with zero entity linter errors. Synchronize any introduced visual assets with <code>master_rights_database.json</code> and recompile legal provenance PDFs.</p>
      </div>
    </div>

    <div class="pipeline-step">
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Stage 4: Headless Browser Verification &amp; Proofing</div>
        <p class="step-desc">Automated browser testing across multiple lessons using <code>browser_subagent</code>. Confirm modal opening, correct timestamp seek triggering, mark scheme expansion, zero layout shifting, and capture visual verification screenshots.</p>
      </div>
    </div>

    <h2>4. Platform Video Inventory &amp; Baseline Audit (20 Units)</h2>
    <p>A complete census of all 20 units currently active within the platform database:</p>

    <table class="inv-table">
      <thead>
        <tr>
          <th>Unit ID</th>
          <th>Curriculum Tier</th>
          <th>Lessons</th>
          <th>Existing Clips</th>
          <th>Gold Standard (3-Tier)</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>cme_new</strong></td>
          <td>GCSE Paper 2</td>
          <td>12</td>
          <td>56</td>
          <td>56 (100%)</td>
          <td><span class="status-badge status-complete">✅ Gold Standard Complete</span></td>
        </tr>
        <tr>
          <td><strong>weimar_nazi_germany</strong></td>
          <td>GCSE Paper 3</td>
          <td>16</td>
          <td>32</td>
          <td>0</td>
          <td><span class="status-badge status-pending">⚡ Next Priority (Stage 1)</span></td>
        </tr>
        <tr>
          <td><strong>edexcel_medicine</strong></td>
          <td>GCSE Paper 1</td>
          <td>26</td>
          <td>51</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (GCSE Core)</span></td>
        </tr>
        <tr>
          <td><strong>eee</strong></td>
          <td>GCSE Paper 2</td>
          <td>12</td>
          <td>16</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (GCSE Core)</span></td>
        </tr>
        <tr>
          <td><strong>usa</strong></td>
          <td>GCSE Paper 1</td>
          <td>16</td>
          <td>32</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (GCSE Core)</span></td>
        </tr>
        <tr>
          <td><strong>cold_war</strong></td>
          <td>GCSE Paper 2</td>
          <td>7</td>
          <td>0</td>
          <td>0</td>
          <td><span class="status-badge status-missing">⚠️ Full Sourcing Needed</span></td>
        </tr>
        <tr>
          <td><strong>ks2_ww2</strong></td>
          <td>Key Stage 2</td>
          <td>11</td>
          <td>36</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (KS2 Specialist)</span></td>
        </tr>
        <tr>
          <td><strong>the_shoah</strong></td>
          <td>KS3 Depth Study</td>
          <td>7</td>
          <td>7</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (KS3 Core)</span></td>
        </tr>
        <tr>
          <td><strong>great_war (1 &amp; 2)</strong></td>
          <td>KS3 Depth Study</td>
          <td>11</td>
          <td>29</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (KS3 Core)</span></td>
        </tr>
        <tr>
          <td><strong>Remaining KS3 (10 units)</strong></td>
          <td>KS3 Thematic</td>
          <td>60</td>
          <td>110</td>
          <td>0</td>
          <td><span class="status-badge status-pending">In Queue (KS3 Thematic)</span></td>
        </tr>
      </tbody>
    </table>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Educational Architecture</div>
      <div>Confidential &amp; Proprietary • Page 2 of 3</div>
    </div>
  </div>

  <!-- PAGE 3: PHASED ROLLOUT SCHEDULE & EXECUTION STANDARDS -->
  <div class="page">
    <div class="doc-header">
      <div class="brand">THE HISTORY REVISION HUB</div>
      <div class="meta-tag">Execution Roadmap</div>
    </div>

    <h1>Phased Rollout Schedule &amp; Compliance</h1>
    <p style="font-size: 10pt; color: #64748b; margin-bottom: 12px; font-weight: 500;">
      A Strategic Phased Horizon for 100% Platform-Wide Video Excellence
    </p>

    <h2>5. The Phased Implementation Schedule</h2>
    <div class="card-grid">
      <div class="card highlight">
        <div class="card-title">Phase 1: Benchmark Deployment (Completed)</div>
        <p><strong>Conflict in the Middle East, 1945–1995:</strong> 12 lessons, 56 multi-lens video clips fully authored with 3-tier scaffolds, watch windows, and verified in the Dual-Pane Theater.</p>
      </div>
      <div class="card highlight">
        <div class="card-title">Phase 2: GCSE Exam-Classroom Core (Active)</div>
        <p>Focuses on high-stakes GCSE examination specifications where active retrieval and mark scheme modeling deliver immediate examination impact:<br>
        1. <strong>Weimar &amp; Nazi Germany</strong> (16 lessons • 48–64 clips)<br>
        2. <strong>Medicine Through Time</strong> (26 lessons • 75+ clips)<br>
        3. <strong>Early Elizabethan England</strong> (12 lessons • 36–48 clips)<br>
        4. <strong>USA 1954–75</strong> &amp; <strong>Cold War</strong> (23 lessons total)</p>
      </div>
      <div class="card">
        <div class="card-title">Phase 3: Key Stage 3 Core Enquiry Units</div>
        <p>Extends the standard to foundational Key Stage 3 historical investigations:<br>
        • <em>The Great War (Origins &amp; Trench Warfare)</em><br>
        • <em>The Shoah (Holocaust Education &amp; Survivor Testimony)</em><br>
        • <em>Medieval England &amp; The Norman Conquest</em><br>
        • <em>Monarchy, Religion &amp; Power (Tudors/Stuarts)</em></p>
      </div>
      <div class="card">
        <div class="card-title">Phase 4: Thematic &amp; Primary Horizons</div>
        <p>Completes the platform catalogue across thematic units and Key Stage 2:<br>
        • <em>Industrialisation &amp; Empire</em> (Parts 1 &amp; 2)<br>
        • <em>Post-War Britain &amp; Australian Colonisation</em><br>
        • <em>Water &amp; Sanitation Across Time</em><br>
        • <em>KS2 World War II Companion</em> (Age-adapted scaffolding)</p>
      </div>
    </div>

    <h2>6. Non-Negotiable Editorial &amp; Legal Standards</h2>
    <div class="card-grid">
      <div class="card">
        <div class="card-title">🏛️ Institutional Neutrality &amp; Anonymity</div>
        <p>All materials are authored under <strong>The History Revision Hub</strong> with 100% strict institutional anonymity. No school names, staff identities, or local identifiers may ever appear.</p>
      </div>
      <div class="card">
        <div class="card-title">⚖️ Statutory Impartiality &amp; Multi-Perspective Balance</div>
        <p>All contentious historical topics (e.g. Israeli-Arab conflict, imperial conquest, Cold War ideologies) must provide multi-lens perspectives: balanced primary voices with zero partisan slant.</p>
      </div>
      <div class="card">
        <div class="card-title">📜 Rights &amp; Provenance Synchronization</div>
        <p>All video and archival assets are mapped to educational fair dealing (CDPA 1988), Public Domain, or Open Government Licences and synchronized with the master provenance register.</p>
      </div>
      <div class="card">
        <div class="card-title">🛡️ Pedagogical Verification Gate</div>
        <p>No video is released without an active watch window, authentic minute-and-second anchors, and complete model answers to ensure classroom readiness from day one.</p>
      </div>
    </div>

    <div class="lead-box" style="margin-top: 14px; background: #f0fdf4; border-color: #86efac; border-left-color: #16a34a;">
      <strong>Immediate Next Action:</strong> Commencement of <strong>Stage 1 (Video Sourcing &amp; Curatorial Audit)</strong> for <em>Weimar &amp; Nazi Germany</em> across all 16 canonical lessons.
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Educational Architecture</div>
      <div>Confidential &amp; Proprietary • Page 3 of 3</div>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('🚀 Launching Puppeteer to compile Master Strategy PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Render to Desktop
  console.log(`🖨️ Rendering Master Strategy PDF to Desktop: ${desktopPath}`);
  await page.pdf({
    path: desktopPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  // Render to Public PDFs
  console.log(`🖨️ Rendering backup copy to Public PDFs: ${publicPdfPath}`);
  await page.pdf({
    path: publicPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log('🎉 Successfully compiled Master Strategy PDF to Desktop and Public PDFs!');
}

generatePdf().catch(err => {
  console.error('❌ Failed to generate strategy PDF:', err);
  process.exit(1);
});
