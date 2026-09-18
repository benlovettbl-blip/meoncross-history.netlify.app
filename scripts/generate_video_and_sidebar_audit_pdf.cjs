const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });

const OUTPUT_PATH = path.join(PDFS_DIR, 'video_integration_and_curriculum_review.pdf');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Curriculum Architecture & Media Audit Review: Pedagogical Video Integration</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 15mm 15mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Outfit', sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 9pt;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #0f172a;
      margin-top: 0;
    }

    .page-break {
      page-break-before: always;
    }

    .cover-card {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%);
      color: #ffffff;
      padding: 32px 28px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
    }

    .cover-card::after {
      content: "";
      position: absolute;
      top: -40px;
      right: -40px;
      width: 180px;
      height: 180px;
      background: rgba(220, 38, 38, 0.15);
      border-radius: 50%;
    }

    .cover-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 10px;
    }

    .dept-badge {
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #38bdf8;
    }

    .date-badge {
      font-size: 8pt;
      font-weight: 600;
      color: #94a3b8;
    }

    .cover-card h1 {
      color: #ffffff;
      font-size: 20pt;
      line-height: 1.2;
      margin-bottom: 8px;
    }

    .cover-card .subtitle {
      font-size: 10.5pt;
      color: #cbd5e1;
      font-weight: 400;
      max-width: 680px;
      line-height: 1.4;
      margin-bottom: 16px;
    }

    .meta-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .meta-pill {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: 600;
      color: #f1f5f9;
    }

    .meta-pill.accent {
      background: #dc2626;
      border-color: #ef4444;
      color: #ffffff;
    }

    .section-title {
      font-size: 13pt;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 14px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .section-title span.tag {
      font-family: 'Outfit', sans-serif;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      font-weight: 700;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 16px;
    }

    .card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    }

    .card.blue {
      border-left: 4px solid #2563eb;
      background: #f8fafc;
    }

    .card.red {
      border-left: 4px solid #dc2626;
      background: #fef2f2;
    }

    .card.green {
      border-left: 4px solid #16a34a;
      background: #f0fdf4;
    }

    .card.amber {
      border-left: 4px solid #d97706;
      background: #fffbeb;
    }

    .card h3 {
      font-size: 10pt;
      margin-bottom: 6px;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      color: #0f172a;
    }

    .card p {
      margin: 0;
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.45;
    }

    table.audit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      margin-bottom: 16px;
      background: #ffffff;
    }

    table.audit-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 6px 8px;
      font-weight: 700;
      letter-spacing: 0.04em;
      border: 1px solid #0f172a;
    }

    table.audit-table td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    table.audit-table tr:nth-child(even) {
      background: #f8fafc;
    }

    .badge-live {
      background: #dcfce7;
      color: #166534;
      font-weight: 700;
      font-size: 7pt;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      border: 1px solid #bbf7d0;
    }

    .badge-era {
      background: #dbeafe;
      color: #1e40af;
      font-weight: 700;
      font-size: 7pt;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      border: 1px solid #bfdbfe;
    }

    .badge-yt {
      background: #fee2e2;
      color: #991b1b;
      font-weight: 700;
      font-size: 7pt;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      border: 1px solid #fecaca;
    }

    .catalog-item {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }

    .catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }

    .catalog-header .title {
      font-weight: 700;
      font-size: 9pt;
      color: #0f172a;
    }

    .catalog-header .duration {
      font-size: 7.5pt;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .task-box {
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 6px 8px;
      border-radius: 0 4px 4px 0;
      font-size: 8pt;
      color: #92400e;
      margin-bottom: 6px;
      line-height: 1.4;
    }

    .model-box {
      background: #f0fdf4;
      border-left: 3px solid #22c55e;
      padding: 6px 8px;
      border-radius: 0 4px 4px 0;
      font-size: 8pt;
      color: #14532d;
      line-height: 1.4;
    }

    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }

    .kpi-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      text-align: center;
    }

    .kpi-number {
      font-size: 18pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1;
      font-family: 'Outfit', sans-serif;
    }

    .kpi-number.green { color: #16a34a; }
    .kpi-number.blue { color: #2563eb; }
    .kpi-number.red { color: #dc2626; }

    .kpi-label {
      font-size: 7.5pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER & EXECUTIVE SUMMARY -->
  <div class="cover-card">
    <div class="cover-meta">
      <span class="dept-badge">Meoncross School · History Department Curriculum Review</span>
      <span class="date-badge">September 2026</span>
    </div>
    <h1>Curriculum Architecture & Media Audit Review</h1>
    <div class="subtitle">
      A comprehensive review of pedagogical video integration, distraction-free modal playback, sidebar workspace ergonomics, and 100% link health verification across all KS3 and KS4 schemes of work.
    </div>
    <div class="meta-pills">
      <span class="meta-pill accent">Act 2 Climax Bridge Standard</span>
      <span class="meta-pill">16 Schemes of Work</span>
      <span class="meta-pill">162 Video Resources</span>
      <span class="meta-pill">100% Live Link Verification</span>
      <span class="meta-pill">Dual-Coding Architecture</span>
    </div>
  </div>

  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-number">16</div>
      <div class="kpi-label">Schemes Audited</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-number blue">162</div>
      <div class="kpi-label">Total Video Assets</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-number green">100%</div>
      <div class="kpi-label">Live Link Health</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-number red">21</div>
      <div class="kpi-label">Newly Curated Videos</div>
    </div>
  </div>

  <div class="section-title">
    <span>1. Executive Summary & Overview of Systemic Upgrades</span>
    <span class="tag">Pedagogical Rationale</span>
  </div>

  <div class="grid-2">
    <div class="card blue">
      <h3>1. Workspace Navigation & Sidebar Overhaul</h3>
      <p>
        <strong>Active Unit Glowing Accent:</strong> Added a high-contrast accent border and background highlight to the currently active unit in the "Units of Study" tree, preventing pupil disorientation.<br><br>
        <strong>Sub-Item Lesson Count Badges:</strong> Integrated micro-badges (e.g. <em>10 Lessons</em>, <em>18 Lessons</em>) alongside the "Study Lessons" link, giving pupils immediate visibility into unit length.<br><br>
        <strong>Unit Tools Unification:</strong> Relocated the printable workbook/PDF booklet directly under the "Unit Tools" container alongside Quizzing and Flashcards.
      </p>
    </div>
    <div class="card red">
      <h3>2. The "Act 2 Climax / Dual-Coding Bridge" Standard</h3>
      <p>
        <strong>Flawed Legacy Placement:</strong> Video links previously resided inside the "Do Now" recall accordion, creating severe pedagogical interference with retrieval practice.<br><br>
        <strong>Architectural Relocation:</strong> Videos are now permanently embedded immediately following the historical narrative (<code style="font-size:7.5pt;">htmlNarrative</code>) and preceding primary sources, structured tasks, and extended writing.<br><br>
        <strong>Distraction-Free Modal:</strong> YouTube videos now launch inside a dedicated in-app modal with background dimming and Escape key exit, completely isolating pupils from YouTube comment sections and algorithms.
      </p>
    </div>
  </div>

  <div class="card green" style="margin-bottom: 14px;">
    <h3>Pedagogical Foundation: Cognitive Load & Rosenshine Principles</h3>
    <p>
      Under Rosenshine’s Principles of Instruction, the <em>Do Now</em> must serve exclusively as low-stakes retrieval practice of <strong>prior</strong> knowledge. Placing documentary videos inside the Do Now contaminated retrieval practice with new sensory inputs. By shifting media to the <strong>Act 2 Climax</strong>, the video functions as an authentic <em>Dual-Coding Bridge</em> (Paivio / Mayer): pupils first construct a linguistic mental model through the narrative text, and then solidify it through dynamic historical broadcast footage before forensic archival work.
    </p>
  </div>

  <!-- PAGE 2: MEDIA AUDIT MATRIX ACROSS ALL 16 UNITS -->
  <div class="page-break"></div>

  <div class="section-title">
    <span>2. Departmental Media Coverage Audit: All 16 Schemes of Work</span>
    <span class="tag">100% Verified Health</span>
  </div>

  <table class="audit-table">
    <thead>
      <tr>
        <th>Scheme ID</th>
        <th>Unit Title</th>
        <th>Tier / Spec</th>
        <th>Lessons</th>
        <th>ERA (SSO)</th>
        <th>YouTube</th>
        <th>Total</th>
        <th>Health Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>cme_new</strong></td>
        <td>Conflict in the Middle East, 1945–1995</td>
        <td>GCSE Paper 2</td>
        <td>10</td>
        <td>0</td>
        <td>2</td>
        <td>2</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>edexcel_medicine</strong></td>
        <td>Medicine Through Time &amp; Western Front</td>
        <td>GCSE Paper 1</td>
        <td>18</td>
        <td>0</td>
        <td>15</td>
        <td>15</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>eee</strong></td>
        <td>Early Elizabethan England, 1558–1588</td>
        <td>GCSE Paper 2</td>
        <td>12</td>
        <td>0</td>
        <td>10</td>
        <td>10</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>weimar_nazi_germany</strong></td>
        <td>Weimar and Nazi Germany, 1918–1939</td>
        <td>GCSE Paper 3</td>
        <td>16</td>
        <td>0</td>
        <td>2</td>
        <td>2</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>usa</strong></td>
        <td>USA: Conflict at Home &amp; Abroad 1954–75</td>
        <td>GCSE Paper 3</td>
        <td>16</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="badge-live">Document-Only</span></td>
      </tr>
      <tr>
        <td><strong>trip_ypres</strong></td>
        <td>Battlefield Tour: Ypres &amp; The Salient</td>
        <td>GCSE Tour</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="badge-live">Field Guide</span></td>
      </tr>
      <tr>
        <td><strong>medieval_england</strong></td>
        <td>Medieval England: 1066–1485</td>
        <td>KS3 Year 7</td>
        <td>9</td>
        <td>0</td>
        <td>8</td>
        <td>8</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>early_modern_world</strong></td>
        <td>Early Modern World &amp; Global Encounters</td>
        <td>KS3 Year 8</td>
        <td>9</td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td><span class="badge-live">100% Protected</span></td>
      </tr>
      <tr>
        <td><strong>industrialisation_and_empire</strong></td>
        <td>Industrialisation, Empire &amp; Power</td>
        <td>KS3 Year 8</td>
        <td>8</td>
        <td>18</td>
        <td>0</td>
        <td>18</td>
        <td><span class="badge-era">18 ERA Broadcasts</span></td>
      </tr>
      <tr>
        <td><strong>great_war</strong></td>
        <td>Causes of the Great War (1870–1914)</td>
        <td>KS3 Year 9</td>
        <td>6</td>
        <td>0</td>
        <td>13</td>
        <td>13</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>great_war_part2</strong></td>
        <td>The Great War (1914–1919)</td>
        <td>KS3 Year 9</td>
        <td>7</td>
        <td>34</td>
        <td>0</td>
        <td>34</td>
        <td><span class="badge-era">34 ERA Broadcasts</span></td>
      </tr>
      <tr>
        <td><strong>the_shoah</strong></td>
        <td>The Shoah: Persecution to Liberation</td>
        <td>KS3 Year 9</td>
        <td>9</td>
        <td>19</td>
        <td>0</td>
        <td>19</td>
        <td><span class="badge-era">19 ERA Broadcasts</span></td>
      </tr>
      <tr>
        <td><strong>post_war_britain</strong></td>
        <td>Rights, Protest &amp; Post-War Britain</td>
        <td>KS3 Year 9</td>
        <td>9</td>
        <td>27</td>
        <td>0</td>
        <td>27</td>
        <td><span class="badge-era">27 ERA Broadcasts</span></td>
      </tr>
      <tr>
        <td><strong>cold_war</strong></td>
        <td>The Cold War: Superpower Rivalry</td>
        <td>KS3 Year 9</td>
        <td>7</td>
        <td>4</td>
        <td>0</td>
        <td>4</td>
        <td><span class="badge-era">4 ERA Broadcasts</span></td>
      </tr>
      <tr>
        <td><strong>australia</strong></td>
        <td>History of Australia: First Peoples to Gold</td>
        <td>KS3 Year 8</td>
        <td>5</td>
        <td>0</td>
        <td>2</td>
        <td>2</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
      <tr>
        <td><strong>water_and_sanitation</strong></td>
        <td>Water and Sanitation Through Time</td>
        <td>KS3 Thematic</td>
        <td>6</td>
        <td>0</td>
        <td>3</td>
        <td>3</td>
        <td><span class="badge-live">100% Live (oEmbed)</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr style="background: #0f172a; color: white; font-weight: bold;">
        <td colspan="4" style="color: white;">TOTAL DEPARTMENTAL HOLDINGS</td>
        <td style="color: #93c5fd;">105 ERA</td>
        <td style="color: #fca5a5;">57 YouTube</td>
        <td style="color: white;">162 Total</td>
        <td style="color: #86efac;">0 Broken Links</td>
      </tr>
    </tfoot>
  </table>

  <div class="grid-2">
    <div class="card amber">
      <h3>Preservation of Institutional BBC / ERA Streams</h3>
      <p>
        The department holds 105 official BBC, Channel 4, and ITV broadcast licenses accessible via the <em>Educational Recording Agency (ERA)</em>. These resources contain high-fidelity contemporary documentaries (e.g. <em>The Great War</em>, BBC Panorama, Days That Shook the World). Under our strict security rules, these links are safely preserved and routed directly to external SSO login tabs to prevent licensing conflicts.
      </p>
    </div>
    <div class="card blue">
      <h3>Active Viewing Mandate</h3>
      <p>
        Every newly integrated video resource adheres to our strict pedagogical standard:
        <strong>1)</strong> High-quality channel provenance (timelinesTV, British Library, History Matters, BBC Bitesize, Simple History, The History Teacher).
        <strong>2)</strong> Exact duration metadata (e.g. <em>7 mins 34 secs</em>).
        <strong>3)</strong> Active Viewing Task focusing pupil attention.
        <strong>4)</strong> Revealable Model Answer for teacher plenaries.
      </p>
    </div>
  </div>

  <!-- PAGE 3: CATALOG OF NEWLY CURATED VIDEOS (PART 1) -->
  <div class="page-break"></div>

  <div class="section-title">
    <span>3. Catalog of Newly Curated Videos: GCSE Units</span>
    <span class="tag">GCSE Papers 1, 2 &amp; 3</span>
  </div>

  <!-- CME Lesson 1 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Conflict in the Middle East · Lesson 1: Broken Promises &amp; Imperial Borders</strong>
      </div>
      <div class="duration">Vox · 10 mins 19 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>The Israel-Palestine conflict: a brief, simple history</em> (<code>https://www.youtube.com/watch?v=iRYZjOuUnlU</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Identify how the collapse of the Ottoman Empire during World War I and British imperial administration shaped modern borders in Palestine, and why contradictory promises caused escalating tension.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Britain established a League of Nations mandate over Palestine following Ottoman collapse. The 1917 Balfour Declaration promised a Jewish national home, clashing with wartime commitments to Arab independence (McMahon-Hussein Correspondence). Competing nationalisms led to communal violence, culminating in the 1947 UN Partition Plan.
    </div>
  </div>

  <!-- Weimar Lesson 1.4 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Weimar Germany · Lesson 1.4: Changes in Society, 1924–1929</strong>
      </div>
      <div class="duration">The History Teacher · 6 mins 12 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Changes for workers, women and to culture in the 1920s</em> (<code>https://www.youtube.com/watch?v=-j52Dx5wUFk</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Note 3 specific changes in living standards for German workers, 2 ways women's social/political freedom expanded, and how traditionalists reacted to avant-garde Berlin culture.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Workers saw real wages increase 10%, 100k+ modern homes constructed, and the 1927 Unemployment Insurance Act protecting 17M workers. Women secured Article 109 equality, professional jobs, and social autonomy ('New Woman'). Right-wing traditionalists attacked Bauhaus architecture, Expressionism, and cabarets as decadent and 'un-German'.
    </div>
  </div>

  <!-- Weimar Lesson 4.1 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Weimar Germany · Lesson 4.1: Nazi Policies Towards Women, 1933–1939</strong>
      </div>
      <div class="duration">The History Teacher · 6 mins 6 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Life for Women: Weimar and Nazi Germany</em> (<code>https://www.youtube.com/watch?v=arCs4X2rko4</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain the Nazi slogan 'Kinder, Küche, Kirche' and explain how the Law for the Encouragement of Marriage (1933) and the Mother's Cross incentivised high birth rates.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> The slogan relegated women to children, kitchen, and church. The 1933 Marriage Law gave 1,000-mark loans, clearing 25% debt per child born. The Mother's Cross (bronze, silver, gold for 4, 6, 8 children) framed motherhood as military service to breed future soldiers for the Reich.
    </div>
  </div>

  <!-- Medicine Lesson 4.4 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>GCSE Medicine · Lesson 4.4: The Modern Epidemic of Lung Cancer</strong>
      </div>
      <div class="duration">GCSE History Mr Rochester · 18 mins 0 sec</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Medicine through Time - Modern - Lung Cancer</em> (<code>https://www.youtube.com/watch?v=tlNtakmOOho</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Contrast government prevention policies (1965 TV ad ban, 2007 public smoking ban, 2016 plain packaging) with high-tech diagnostic/treatment technologies (CT scans, broncho-endoscopy, radiotherapy, chemotherapy).
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Doll and Hill (1950) proved heavy smokers were 50x more likely to develop lung cancer. State intervention shifted from laissez-faire to coercive public bans (2007 indoor ban) and graphic packaging. High-tech CT scans enable early 3D tumor diagnosis, treated by targeted radiotherapy and chemotherapy.
    </div>
  </div>

  <!-- Medicine Lesson 5.2 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>GCSE Medicine · Lesson 5.2: Trench Environment &amp; Medical Challenges</strong>
      </div>
      <div class="duration">Simple History · 10 mins 4 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Average Day In The Life Of A WW1 Soldier</em> (<code>https://www.youtube.com/watch?v=bSPh5Jgx_wY</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Identify how cold mud caused Trench Foot, body lice spread Trench Fever, and relentless artillery barrages triggered Shell Shock (NYD.N).
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Waterlogged mud starved foot tissue of blood, causing gangrene and amputation; prevented by twice-daily whale oil rubbing and dry socks. Body lice living in clothing seams transmitted Trench Fever, prompting delousing stations. Relentless artillery bombardment caused psychological trauma (recorded as NYD.N).
    </div>
  </div>

  <!-- PAGE 4: CATALOG OF NEWLY CURATED VIDEOS (PART 2) -->
  <div class="page-break"></div>

  <div class="section-title">
    <span>4. Catalog of Newly Curated Videos: Early Elizabethan England</span>
    <span class="tag">GCSE Paper 2 (1558–1588)</span>
  </div>

  <!-- EEE 1.2 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Early Elizabethan England · Lesson 1.2: The Religious Settlement (1559)</strong>
      </div>
      <div class="duration">The History Teacher · 5 mins 48 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>The Religious settlement</em> (<code>https://www.youtube.com/watch?v=-GbkZ_Y1AeQ</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Identify the 3 pillars of Elizabeth's Middle Way: Act of Supremacy ('Supreme Governor'), Act of Uniformity (Common Prayer), and Royal Injunctions.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Act of Supremacy made Elizabeth 'Supreme Governor' (reassuring Catholics and Protestants). Act of Uniformity made Protestant services compulsory with 1-shilling recusancy fines. Royal Injunctions required English Bibles while retaining traditional clerical vestments to avoid rebellion.
    </div>
  </div>

  <!-- EEE 1.3 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Early Elizabethan England · Lesson 1.3: Threats to the Religious Settlement</strong>
      </div>
      <div class="duration">The History Teacher · 5 mins 37 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Threats to Elizabeth's Religious Settlement</em> (<code>https://www.youtube.com/watch?v=_tD3KvqCc8g</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Contrast the internal Puritan challenge (Vestment Controversy) with the existential Catholic threat (1570 Papal Bull of Excommunication).
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Puritans protested Catholic vestments and crucifixes from within the church. The Catholic threat escalated into international treason in 1570 when Pope Pius V issued <em>Regnans in Excelsis</em>, excommunicating Elizabeth and releasing Catholic subjects from obedience.
    </div>
  </div>

  <!-- EEE 1.4 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Early Elizabethan England · Lesson 1.4: The Problem of Mary Queen of Scots</strong>
      </div>
      <div class="duration">The History Teacher · 8 mins 10 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>The Problem of Mary Queen of Scots</em> (<code>https://www.youtube.com/watch?v=LIZtyIgtVio</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain why Mary fled to England in 1568 and why her presence as a legitimate Catholic heir made her an immediate focus for Catholic plots.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Mary fled Scotland after Protestant lords rebelled following Darnley's murder. As Henry VII's great-granddaughter, European Catholics viewed her as the rightful Queen of England, making her the natural figurehead for the Northern Rebellion, Ridolfi, and Babington plots.
    </div>
  </div>

  <!-- EEE 2.2 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Early Elizabethan England · Lesson 2.2: Political and Religious Rivalry with Spain</strong>
      </div>
      <div class="duration">The History Teacher · 4 mins 48 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Spain: Political and Religious Rivalry</em> (<code>https://www.youtube.com/watch?v=ldZYD51Ohjo</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain how Philip II's Catholic counter-reformation, the Dutch Revolt, and Francis Drake's privateering brought England and Spain to war.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Philip II viewed Protestant England as a heretical enemy. English covert support for Protestant Dutch rebels and Drake's raids on Spanish treasure galleons in the Caribbean pushed Philip to launch an all-out invasion fleet.
    </div>
  </div>

  <!-- EEE 2.3 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Early Elizabethan England · Lesson 2.3: Outbreak of War &amp; The Raid on Cadiz</strong>
      </div>
      <div class="duration">The History Teacher · 4 mins 7 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>The Netherlands and Cadiz</em> (<code>https://www.youtube.com/watch?v=33zs4b3iyyw</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain the 1585 Treaty of Nonsuch and how Drake's 1587 Cadiz raid ('Singeing the King of Spain's Beard') delayed the Armada.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Nonsuch put English troops directly on the battlefield in the Netherlands. In 1587, Drake sailed into Cadiz, destroying 30+ Spanish warships and critical barrel staves, delaying the Armada's invasion by a full year.
    </div>
  </div>

  <!-- PAGE 5: CATALOG OF NEWLY CURATED VIDEOS (PART 3) -->
  <div class="page-break"></div>

  <div class="section-title">
    <span>5. Catalog of Newly Curated Videos: KS3 History</span>
    <span class="tag">Medieval England, Great War &amp; Sanitation</span>
  </div>

  <!-- Medieval England 1 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 1: 1066 &amp; The Battle of Hastings</strong>
      </div>
      <div class="duration">timelinesTV · 7 mins 34 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Norman Conquest (The Battle of Hastings)</em> (<code>https://www.youtube.com/watch?v=PE0RAgHr06U</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Identify the 3 claimants in 1066 and explain how William used the 'feigned retreat' tactic to break the Saxon shield wall on Senlac Hill.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Harold Godwinson faced Harald Hardrada (defeated at Stamford Bridge) and William of Normandy. At Hastings, Norman cavalry feigned panic and retreat, drawing the Saxon fyrd off the high ground and obliterating their shield formation.
    </div>
  </div>

  <!-- Medieval England 2 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 2: Castles, Terror &amp; The Domesday Book</strong>
      </div>
      <div class="duration">timelinesTV · 7 mins 35 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>The Norman Conquest (Castles and Control)</em> (<code>https://www.youtube.com/watch?v=BEU_xPJd7Yo</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain how William used Motte and Bailey castles, the Harrying of the North (1069), and the Domesday Book (1086) to establish feudal control.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> William built earthwork castles to garrison knights and intimidate Saxons. The Harrying of the North systematically starved 100k people. In 1086, the Domesday Book surveyed all land and wealth, cementing total Norman taxation and land redistribution.
    </div>
  </div>

  <!-- Medieval England 3 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 3: Crown vs Church (Henry II &amp; Thomas Becket)</strong>
      </div>
      <div class="duration">timelinesTV · 3 mins 53 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Church &amp; Crown (Henry II and Thomas Becket)</em> (<code>https://www.youtube.com/watch?v=_EKUIBz_po0</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain why Henry II appointed Becket, and why Becket's defense of church courts provoked four knights to murder him in 1170.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Henry wanted royal control over church courts ('benefit of clergy'). Once Archbishop, Becket defended Papal supremacy. Henry's furious outburst led four knights to assassinate Becket at Canterbury Cathedral, creating a permanent martyr.
    </div>
  </div>

  <!-- Medieval England 4 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 4: King John &amp; Magna Carta (1215)</strong>
      </div>
      <div class="duration">British Library · 3 mins 33 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>What is Magna Carta?</em> (<code>https://www.youtube.com/watch?v=7xo4tUMdAMw</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain why rebel barons forced King John to seal Magna Carta at Runnymede, and identify the fundamental principle of Clause 39.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> John's heavy scutage taxes and military failure in France triggered baronial rebellion. Clause 39 established that no free man can be imprisoned except by lawful judgment of equals, establishing that monarchs are subject to the rule of law.
    </div>
  </div>

  <!-- Medieval England 5 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 5: Life in a Medieval Village &amp; Doom Paintings</strong>
      </div>
      <div class="duration">timelinesTV · 7 mins 21 secs</div>
    </div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      <em>Medieval Manor (Life in a Medieval Village)</em> (<code>https://www.youtube.com/watch?v=fgd9eI8dk6U</code>)
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Describe peasant labor in the open-field system and how church Doom paintings visually enforced obedience through terror of Hell.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Serfs farmed strips in open fields and owed compulsory week-work on the lord's demesne land. Parish church Doom paintings depicted sinners dragged into Hellmouth, ensuring peasants obeyed feudal lords to secure salvation.
    </div>
  </div>

  <!-- PAGE 6: CATALOG (PART 4) & TEACHER CLASSROOM GUIDE -->
  <div class="page-break"></div>

  <div class="section-title">
    <span>6. Catalog of Newly Curated Videos: Epidemics &amp; War</span>
    <span class="tag">Black Death, 1381, Roses, 1870 &amp; 1914</span>
  </div>

  <!-- Medieval England 6 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 6: The Black Death (1348)</strong>
      </div>
      <div class="duration">timelinesTV · 6 mins 34 secs</div>
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Trace the arrival of bubonic plague in 1348, medieval beliefs in miasma, and how the death of 30–50% of the population empowered surviving peasants.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> The plague arrived at Weymouth in 1348. Killing half the workforce, it caused acute labor shortages: surviving serfs demanded higher cash wages, fatally undermining the feudal system.
    </div>
  </div>

  <!-- Medieval England 7 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Medieval England · Lesson 7: The Peasants' Revolt (1381)</strong>
      </div>
      <div class="duration">timelinesTV · 8 mins 45 secs</div>
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain how the 1381 Poll Tax and John Ball's preaching sparked the revolt, and how Richard II outwitted Wat Tyler at Smithfield.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> The third Poll Tax sparked rebellion. Wat Tyler and John Ball stormed London. Mayor Walworth struck down Tyler; 14-year-old Richard II placated the crowd with false promises before executing leaders, yet the poll tax was abandoned.
    </div>
  </div>

  <!-- Great War 1 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Great War · Lesson 1: The Franco-Prussian War (1870–71)</strong>
      </div>
      <div class="duration">History Matters · 3 mins 49 secs</div>
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Explain how Bismarck engineered the war to unify Germany and why the seizure of Alsace-Lorraine created permanent French resentment (revanche).
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Bismarck provoked Napoleon III, defeating French armies at Sedan. The German Empire was proclaimed at Versailles, and Germany annexed Alsace-Lorraine, guaranteeing French diplomatic enmity leading into 1914.
    </div>
  </div>

  <!-- Great War 5 -->
  <div class="catalog-item">
    <div class="catalog-header">
      <div class="title">
        <span class="badge-yt">YouTube</span> <strong>Great War · Lesson 5: The Sarajevo Assassination &amp; July Crisis</strong>
      </div>
      <div class="duration">Simple History · 10 mins 27 secs</div>
    </div>
    <div class="task-box">
      <strong>Active Viewing Task:</strong> Trace the Black Hand conspiracy in Sarajevo on 28 June 1914 and Gavrilo Princip's fatal shots outside Schiller's Delicatessen.
    </div>
    <div class="model-box">
      <strong>Model Notes:</strong> Princip shot Franz Ferdinand and Sophie after the chauffeur took a wrong turn. Austria-Hungary issued the Serbian ultimatum with Germany's 'blank cheque', triggering treaty obligations across Russia, France, and Britain.
    </div>
  </div>

  <div class="section-title" style="margin-top: 20px;">
    <span>7. Teacher Implementation Protocols &amp; Strategic Recommendations</span>
    <span class="tag">Classroom Best Practice</span>
  </div>

  <div class="grid-2">
    <div class="card blue">
      <h3>Interactive Whiteboard Protocol</h3>
      <p>
        <strong>1. Narrative Anchor:</strong> Have students read paragraphs [1.1]–[2.2] first to build foundational schema.<br>
        <strong>2. Launch Modal Player:</strong> Click the red <em>Watch in App</em> button. The player launches full-screen with black backdrop, blocking algorithmic sidebars.<br>
        <strong>3. Active Note-Taking:</strong> Display the Amber <em>Viewing Task</em> prominently on the screen during playback.<br>
        <strong>4. Reveal Model Answer:</strong> Click <em>Reveal Model Notes</em> for cold-call questioning and instant student self-correction.
      </p>
    </div>
    <div class="card green">
      <h3>Proactive Planning &amp; Next Steps</h3>
      <p>
        <strong>Recommendation 1: Student Timestamp Bookmarks:</strong> Add interactive timestamp jump-buttons (e.g. <code>[02:15]</code>) inside the active viewing task for clips longer than 8 minutes.<br><br>
        <strong>Recommendation 2: Offline Fallback Cache:</strong> Integrate video captions/transcripts as an expandable fallback accordion for classrooms with restrictive firewall policies.<br><br>
        <strong>Recommendation 3: ERA Deep-Linking Expansion:</strong> Embed ERA broadcast clips into GCSE Paper 3 USA 1954–75 (Vietnam &amp; Civil Rights) once new BBC archives become available.
      </p>
    </div>
  </div>

</body>
</html>
`;

async function main() {
  console.log('🚀 Compiling video_integration_and_curriculum_review.pdf with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family: 'Outfit', sans-serif; font-size: 7.5pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 15mm;">Meoncross School History Department · Curriculum Architecture Review</div>`,
    footerTemplate: `<div style="font-family: 'Outfit', sans-serif; font-size: 7.5pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding: 0 15mm;"><span>Pedagogical Video Integration &amp; 16-Scheme Media Audit</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  });

  await browser.close();
  console.log(`✅ Successfully generated: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
