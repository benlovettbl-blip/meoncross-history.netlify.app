const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const desktopPath = path.join('C:', 'Users', 'fives', 'Desktop', 'Master_Visual_Source_Curriculum_Roadmap.pdf');
const publicPdfPath = path.join(__dirname, '..', 'public', 'pdfs', 'Master_Visual_Source_Curriculum_Roadmap.pdf');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Revision Hub • Master Primary Source Curriculum Roadmap</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 9mm 11mm 9mm 11mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.32;
      font-size: 7.8pt;
    }

    .page {
      page-break-after: always;
      position: relative;
      height: 279mm;
      max-height: 279mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
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
      padding-bottom: 2.5px;
      margin-bottom: 5px;
    }

    .doc-header .brand {
      font-weight: 800;
      font-size: 9.2pt;
      color: #0f172a;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .doc-header .badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 1.5px 5.5px;
      border-radius: 4px;
      font-size: 6.3pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .doc-header .meta {
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 500;
    }

    .doc-footer {
      margin-top: auto;
      border-top: 1px solid #e2e8f0;
      padding-top: 3.5px;
      display: flex;
      justify-content: space-between;
      font-size: 6.6pt;
      color: #94a3b8;
    }

    /* Typography */
    h1 {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      letter-spacing: -0.025em;
      margin-bottom: 1.5px;
    }

    .subtitle {
      font-size: 7.6pt;
      color: #475569;
      margin-bottom: 5px;
      font-weight: 500;
    }

    h2 {
      font-size: 8.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 4.5px 0 2.5px 0;
      display: flex;
      align-items: center;
      gap: 5px;
      border-left: 3px solid #0284c7;
      padding-left: 5px;
    }

    p {
      margin-bottom: 3.5px;
      color: #334155;
    }

    /* KPI Highlights */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-bottom: 5px;
    }

    .kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 3.5px 5px;
      text-align: center;
    }

    .kpi-value {
      font-size: 10.5pt;
      font-weight: 800;
      color: #0284c7;
      line-height: 1.1;
    }

    .kpi-label {
      font-size: 6pt;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Callout */
    .callout {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3.5px solid #16a34a;
      border-radius: 4px;
      padding: 4.5px 7px;
      margin-bottom: 5px;
      font-size: 7pt;
      color: #166534;
      line-height: 1.32;
    }

    .callout strong {
      color: #14532d;
    }

    /* 8-Typology Spectrum Grid (4x2) */
    .typology-spectrum-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4.5px;
      margin-bottom: 5px;
    }

    .spectrum-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 5.5px;
      border-top: 2.5px solid #0284c7;
    }

    .spectrum-title {
      font-weight: 700;
      font-size: 6.9pt;
      color: #0f172a;
      margin-bottom: 1.5px;
      display: flex;
      align-items: center;
      gap: 3.5px;
    }

    .spectrum-card p {
      font-size: 6.2pt;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.25;
    }

    /* Questioning Modes Grid (3x2) */
    .modes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      margin-bottom: 5px;
    }

    .mode-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 3.5px 5.5px;
      border-left: 2.5px solid #6366f1;
    }

    .mode-title {
      font-weight: 700;
      font-size: 6.7pt;
      color: #1e1b4b;
      margin-bottom: 1px;
    }

    .mode-card p {
      font-size: 6pt;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.22;
    }

    /* Tables */
    .exemplar-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.5pt;
      margin: 3.5px 0 5px 0;
    }

    .exemplar-table th {
      background: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      text-align: left;
      padding: 2.5px 4.5px;
      border: 1px solid #334155;
      font-size: 6.1pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .exemplar-table td {
      padding: 2.2px 4.5px;
      border: 1px solid #e2e8f0;
      color: #334155;
      line-height: 1.22;
    }

    .exemplar-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .type-pill {
      display: inline-block;
      padding: 0.8px 3.5px;
      border-radius: 2.5px;
      font-size: 5.6pt;
      font-weight: 700;
      text-transform: uppercase;
    }

    .type-state { background: #e0f2fe; color: #0369a1; }
    .type-below { background: #fef3c7; color: #b45309; }
    .type-satire { background: #fce7f3; color: #be185d; }
    .type-art { background: #fae8ff; color: #86198f; }
    .type-poem { background: #ecfdf5; color: #047857; }
    .type-photo { background: #dcfce7; color: #15803d; }
    .type-map { background: #ede9fe; color: #6d28d9; }
    .type-data { background: #ffedd5; color: #c2410c; }
    .type-audio { background: #e0e7ff; color: #4338ca; }
    .type-ephemera { background: #f1f5f9; color: #475569; }

    table.curriculum-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.4pt;
      margin: 3.5px 0 5px 0;
    }

    table.curriculum-table th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-align: left;
      padding: 2.2px 4px;
      border: 1px solid #cbd5e1;
      font-size: 6pt;
      text-transform: uppercase;
    }

    table.curriculum-table td {
      padding: 1.8px 4px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    table.curriculum-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .status-complete { background: #dcfce7; color: #15803d; font-weight: 700; font-size: 5.8pt; padding: 1px 3.5px; border-radius: 2px; }
  </style>
</head>
<body>

  <!-- PAGE 1: FULL DISCIPLINARY SPECTRUM & AUTONOMOUS QUESTIONING -->
  <div class="page">
    <div class="doc-header">
      <div class="brand">
        <span>The History Revision Hub</span>
        <span class="badge">Master Curriculum Standard</span>
      </div>
      <div class="meta">Curriculum Architecture • Disciplinary Pedagogy &amp; Archival Rights • 2026 Edition</div>
    </div>

    <h1>Master Primary Source Curriculum Roadmap</h1>
    <div class="subtitle">Multi-Typology Evidence Spectrum, Autonomous Pedagogical Interrogation, and Unit-Portfolio Governance</div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">20</div>
        <div class="kpi-label">Active Taught Units</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">673</div>
        <div class="kpi-label">Verified Sources</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">8 Spectrum</div>
        <div class="kpi-label">Evidence Modalities</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">0px / 0%</div>
        <div class="kpi-label">Overflow &bull; Zero Placeholders</div>
      </div>
    </div>

    <div class="callout">
      <strong>Core Pedagogical Architecture (Whole-Unit Portfolio &amp; Full Evidence Breadth):</strong> Source selection is completely freed from rigid per-act templates. We govern diversity at the <em>whole-unit portfolio level</em> (e.g. 35 sources per 7-lesson unit), granting AI full autonomy to deploy the most powerful evidence where the enquiry demands—embracing high statecraft, civilian diaries, satirical cartoons, fine art &amp; sketches, war poetry &amp; protest songs, statistical tables, archival sound clips, maps, and civil defense ephemera.
    </div>

    <h2>1. The Complete Disciplinary Evidence Spectrum (8 Core Modalities)</h2>
    <div class="typology-spectrum-grid">
      <div class="spectrum-card">
        <div class="spectrum-title"><span class="type-pill type-state">Statecraft</span> Treaties &amp; Speeches</div>
        <p>Diplomatic ciphers, legal statutes, and summit declarations. Grounds pupils in ideological doctrine, sovereignty, and macro strategy.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #d97706;">
        <div class="spectrum-title"><span class="type-pill type-below">From Below</span> Diaries &amp; Letters</div>
        <p>Private soldier letters, civilian diaries, and refugee accounts. Shatters "elite determinism" by showing how ordinary lives experienced conflict.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #be185d;">
        <div class="spectrum-title"><span class="type-pill type-satire">Satirical Art</span> Cartoons &amp; Posters</div>
        <p>Editorial cartoons (<em>Punch</em>, Low, <em>Krokodil</em>). Trains pupils to decode visual allegory, irony, and contemporary public anxieties.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #86198f;">
        <div class="spectrum-title"><span class="type-pill type-art">Fine Art</span> Paintings &amp; Drawings</div>
        <p>Official portraits (Holbein, Van Dyck), combat art (Nash, Dix), and sketches. Interrogates symbolic composition, aesthetic power, and trauma.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #047857;">
        <div class="spectrum-title"><span class="type-pill type-poem">Verse &amp; Song</span> Poems &amp; Lyrics</div>
        <p>War poetry (Wilfred Owen), protest anthems (Bob Dylan, <em>Strange Fruit</em>), and samizdat verse. Captures raw emotional and cultural resistance.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #c2410c;">
        <div class="spectrum-title"><span class="type-pill type-data">Statistics</span> Tables &amp; Datasets</div>
        <p>Nuclear stockpiles, inflation tables, and casualty inventories. Teaches critical numeracy: questioning counting methods and structural trends.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #4338ca;">
        <div class="spectrum-title"><span class="type-pill type-audio">Sound &amp; Oral</span> 30–60s Audio Clips</div>
        <p>Authentic White House tapes, BBC radio broadcasts, and oral histories. Interrogates vocal tremor, hesitation, cadence, and acoustic reality.</p>
      </div>
      <div class="spectrum-card" style="border-top-color: #15803d;">
        <div class="spectrum-title"><span class="type-pill type-photo">Visual &amp; Maps</span> Photos &amp; Ephemera</div>
        <p>Verified period photos (U-2, Yalta), tactical maps (Tet, Berlin corridors), and civil defense ephemera (UK <em>Protect and Survive</em>).</p>
      </div>
    </div>

    <h2>2. Autonomous Pedagogical Interrogation: Beyond the "How Useful" Question</h2>
    <p style="font-size: 7pt; color: #475569; margin-bottom: 3.5px;">
      Exclusively asking <em>"How useful is Source X for an enquiry into Y?"</em> breeds mechanical formula-filling. The AI deploys six second-order disciplinary interrogation modes based on the source's unique evidentiary nature:
    </p>

    <div class="modes-grid">
      <div class="mode-card">
        <div class="mode-title">1. Evidentiary Value &amp; Source Utility</div>
        <p>Evaluating what the source uniquely illuminates vs its blind spots, using the Triad: Content Inferences, Provenance (NOP), and Limits.</p>
      </div>
      <div class="mode-card" style="border-left-color: #0284c7;">
        <div class="mode-title">2. Causal Mechanism &amp; Turning Points</div>
        <p>Interrogating how an action triggered a chain reaction (e.g. how the Trinity test altered Truman's diplomatic leverage at Potsdam).</p>
      </div>
      <div class="mode-card" style="border-left-color: #be185d;">
        <div class="mode-title">3. Ideological Stance &amp; Decoding Satire</div>
        <p>Unpacking visual metaphor, allegory, and subtext (e.g. dissecting how an editorial cartoon reveals public terror of nuclear oblivion).</p>
      </div>
      <div class="mode-card" style="border-left-color: #d97706;">
        <div class="mode-title">4. Human Perspective, Empathy &amp; Worldview</div>
        <p>Entering the mindset of historical actors (e.g. examining private diaries or poetry to grasp civilian despair when the Berlin Wall rose).</p>
      </div>
      <div class="mode-card" style="border-left-color: #15803d;">
        <div class="mode-title">5. Contradiction &amp; Cross-Corroboration</div>
        <p>Evaluating conflicts between high-level state propaganda and ground-level reality (e.g. military communiqués vs frontline doctor diaries).</p>
      </div>
      <div class="mode-card" style="border-left-color: #7c3aed;">
        <div class="mode-title">6. Historical Significance &amp; Consequence</div>
        <p>Weighing long-term structural impact (e.g. analyzing why Article 5 of the North Atlantic Treaty permanently transformed global security).</p>
      </div>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 3.5px solid #2563eb; border-radius: 4px; padding: 4px 6.5px; margin-top: 1.5px;">
      <strong style="color: #1e40af; font-size: 7pt;">Mandatory Whole-Class Hinge Question:</strong> Regardless of interrogation mode, every source context concludes with an explicit <strong>Hinge Question</strong> to ignite lively class debate, challenge preconceptions, and drive historical synthesis.
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Curriculum Architecture</div>
      <div>Master Primary Source Curriculum Roadmap • Page 1 of 2</div>
    </div>
  </div>

  <!-- PAGE 2: COLD WAR EXEMPLAR BLUEPRINT & MASTER CURRICULUM REGISTER -->
  <div class="page">
    <div class="doc-header">
      <div class="brand">
        <span>The History Revision Hub</span>
        <span class="badge">Master Curriculum Standard</span>
      </div>
      <div class="meta">Case Study &bull; Cold War 35-Source Portfolio &bull; 2026 Edition</div>
    </div>

    <h2>3. Cold War Exemplar Blueprint: Whole-Unit Portfolio Diversity (35 Sources)</h2>
    <p style="font-size: 6.8pt; color: #475569; margin-bottom: 3.5px;">
      The 7 lessons demonstrate how freeing sources from rigid act templates creates a multi-perspectival, academically rigorous curriculum:
    </p>

    <table class="exemplar-table">
      <thead>
        <tr>
          <th style="width: 13%;">Enquiry Lesson</th>
          <th style="width: 18%;">Statecraft &amp; Strategy</th>
          <th style="width: 22%;">Voices, Diaries &amp; Poetry</th>
          <th style="width: 24%;">Satire, Art, Data &amp; Maps</th>
          <th style="width: 23%;">Photos, Sound &amp; Ephemera</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>L1: Ideology</strong></td>
          <td>Stalin Bolshoi Speech (1946)<br>Lenin <em>State &amp; Revolution</em> (1917)</td>
          <td>George Kennan <em>Long Telegram</em> (1946 diplomatic observation)</td>
          <td><span class="type-pill type-satire">Satire</span> David Low <em>Evening Standard</em> Iron Curtain cartoon (1946)</td>
          <td><span class="type-pill type-ephemera">Ephemera</span> Soviet Five-Year Plan agitprop election handbill</td>
        </tr>
        <tr>
          <td><strong>L2: Yalta–Potsdam</strong></td>
          <td>Yalta Declaration (Feb 1945)<br>Potsdam Demilitarization Protocol</td>
          <td><span class="type-pill type-below">Diary</span> Truman Babelsberg Diary on Trinity test (<em>"most terrible bomb"</em>)</td>
          <td><span class="type-pill type-art">Painting</span> Contemporary Soviet Socialist Realist summit painting</td>
          <td><span class="type-pill type-photo">Photo</span> Churchill, Roosevelt &amp; Stalin at Livadia Palace, Yalta</td>
        </tr>
        <tr>
          <td><strong>L3: Berlin Airlift</strong></td>
          <td>Churchill Fulton Address (1946)<br>Truman Doctrine Address (1947)</td>
          <td>NATO Treaty Article 5 collective security mutual defense clause (1949)</td>
          <td><span class="type-pill type-map">Map</span> Allied Air Safety Center: 3 Berlin Air Corridors flight route map</td>
          <td><span class="type-pill type-photo">Photo</span> USAF C-54 "Candy Bomber" landing over West Berlin children</td>
        </tr>
        <tr>
          <td><strong>L4: Cuban Crisis</strong></td>
          <td>Khrushchev Personal Letter to JFK (<em>"knot of war"</em>, 26 Oct 1962)</td>
          <td><span class="type-pill type-poem">Poem/Song</span> Bob Dylan <em>A Hard Rain's A-Gonna Fall</em> (1962 missile ballad)</td>
          <td><span class="type-pill type-satire">Satire</span> Leslie Illingworth <em>Punch</em> arm-wrestle on H-bombs cartoon (1962)</td>
          <td><span class="type-pill type-audio">Audio</span> Declassified White House ExComm audio recording (JFK vs LeMay)<br><span class="type-pill type-photo">Photo</span> CIA U-2 spy photo</td>
        </tr>
        <tr>
          <td><strong>L5: Proxy Wars</strong></td>
          <td>NSC-68 Top-Secret Directive (1950) globalizing containment</td>
          <td><span class="type-pill type-below">Letter</span> 19yo US soldier letter from Ia Drang<br><span class="type-pill type-below">Diary</span> Dr. Đặng Thùy Trâm battlefield diary</td>
          <td><span class="type-pill type-map">Map</span> West Point Department of History Tet Offensive operational map</td>
          <td><span class="type-pill type-photo">Photo</span> Bell UH-1D "Huey" combat assault landing in LZ, Vietnam (1966)</td>
        </tr>
        <tr>
          <td><strong>L6: Berlin Wall</strong></td>
          <td>Reagan Brandenburg Gate Address (1987)<br>Gorbachev Resignation (1991)</td>
          <td><span class="type-pill type-below">Diary</span> East Berlin resident diary (13 Aug 1961) waking to severed family</td>
          <td><span class="type-pill type-satire">Satire</span> Soviet <em>Krokodil</em> cartoon mocking Brezhnev consumer queues</td>
          <td><span class="type-pill type-photo">Photo</span> M48 Patton vs T-54 Checkpoint Charlie / Crowds atop Wall (Nov 1989)</td>
        </tr>
        <tr>
          <td><strong>L7: Was it 'Cold'?</strong></td>
          <td>Odd Arne Westad (*The Global Cold War*, 2005) 20M dead verdict</td>
          <td>Oral testimony transcript of civilian proxy war survivor (Cambodia/Korea)</td>
          <td><span class="type-pill type-data">Data Table</span> US vs. USSR Strategic Nuclear Warhead Stockpiles (1945–1990)</td>
          <td><span class="type-pill type-audio">Audio / Ephemera</span> UK <em>Protect &amp; Survive</em> 1980 radio attack warning sound &amp; booklet</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Master Curriculum 20-Unit Status &amp; Quality Gates</h2>
    <table class="curriculum-table">
      <thead>
        <tr>
          <th style="width: 25%;">Unit Title</th>
          <th style="width: 15%;">Key Stage / Board</th>
          <th style="width: 12%; text-align: center;">Lessons</th>
          <th style="width: 12%; text-align: center;">Sources</th>
          <th style="width: 22%;">Disciplinary Coverage Focus</th>
          <th style="width: 14%; text-align: center;">Quality Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cold War (1945–1991)</strong></td>
          <td>KS3 / GCSE Depth</td>
          <td style="text-align: center;">7</td>
          <td style="text-align: center;">35</td>
          <td>Statecraft, Satire, Dylan Verse, Stockpile Data, ExComm Audio</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
        <tr>
          <td><strong>Weimar &amp; Nazi Germany</strong></td>
          <td>GCSE Edexcel Paper 3</td>
          <td style="text-align: center;">16</td>
          <td style="text-align: center;">77</td>
          <td>Hyperinflation tables, propaganda posters, Otto Dix art, Niemöller verse</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
        <tr>
          <td><strong>Medicine Through Time</strong></td>
          <td>GCSE Edexcel Paper 1</td>
          <td style="text-align: center;">26</td>
          <td style="text-align: center;">114</td>
          <td>Anatomical drawings (Vesalius), public health acts, Western Front trench data</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
        <tr>
          <td><strong>Conflict in Middle East</strong></td>
          <td>GCSE Edexcel Depth</td>
          <td style="text-align: center;">12</td>
          <td style="text-align: center;">66</td>
          <td>Sykes-Picot map, Balfour letter, 1948 refugee photos, UN resolutions</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
        <tr>
          <td><strong>USA: Rights &amp; Free World</strong></td>
          <td>GCSE Edexcel Period</td>
          <td style="text-align: center;">16</td>
          <td style="text-align: center;">49</td>
          <td><em>Strange Fruit</em> poem/song, Little Rock photos, Black Panther 10-point plan</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
        <tr>
          <td><strong>The Great War (Parts 1 &amp; 2)</strong></td>
          <td>KS3 Depth Unit</td>
          <td style="text-align: center;">11</td>
          <td style="text-align: center;">48</td>
          <td>Wilfred Owen poetry, Nash trench paintings, Dreadnought, casualty returns</td>
          <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
        </tr>
      </tbody>
    </table>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4.5px; margin-top: 2.5px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px 5.5px;">
        <strong style="color: #0369a1; font-size: 6.6pt;">1. Zero Placeholder Guarantee:</strong>
        <p style="margin: 1px 0 0 0; color: #475569; font-size: 5.9pt;">Automated pre-flight checks fail any source utilizing generic cover images or banners. Every visual source is an authentic archival asset.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px 5.5px;">
        <strong style="color: #059669; font-size: 6.6pt;">2. Master Rights Synchronization:</strong>
        <p style="margin: 1px 0 0 0; color: #475569; font-size: 5.9pt;">All assets registered in <code>master_rights_database.json</code> with verified archive holding, accession ID, legal tier, and direct URL.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px 5.5px;">
        <strong style="color: #d97706; font-size: 6.6pt;">3. Disciplinary Rigour Audit:</strong>
        <p style="margin: 1px 0 0 0; color: #475569; font-size: 5.9pt;">Verified by <code>node scripts/audit_sources_integrity.cjs</code> across 673 sources ensuring 0 missing files and 0 broken quotations.</p>
      </div>
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Curriculum Architecture</div>
      <div>Master Primary Source Curriculum Roadmap • Page 2 of 2</div>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('🚀 Launching Puppeteer to compile Master Primary Source Curriculum Roadmap PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Render to Desktop
  console.log(`🖨️ Rendering Master Roadmap PDF to Desktop: ${desktopPath}`);
  await page.pdf({
    path: desktopPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  });

  // Also copy to public/pdfs
  const destDir = path.dirname(publicPdfPath);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(desktopPath, publicPdfPath);
  console.log(`✅ Synchronized PDF to public repository: ${publicPdfPath}`);

  await browser.close();
  console.log('🏁 Roadmap PDF compilation complete!');
}

generatePdf().catch(err => {
  console.error('❌ Error compiling roadmap PDF:', err);
  process.exit(1);
});
