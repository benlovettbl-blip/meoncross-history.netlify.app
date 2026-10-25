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
      margin: 8mm 10mm 8mm 10mm;
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
      line-height: 1.34;
      font-size: 8.0pt;
    }

    .page {
      page-break-after: always;
      position: relative;
      height: 281mm;
      max-height: 281mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    .page-body {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    /* Running Header & Footer */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2.5px solid #0284c7;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }

    .doc-header .brand {
      font-weight: 800;
      font-size: 10pt;
      color: #0f172a;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .doc-header .badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 6.6pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .doc-header .meta {
      font-size: 7.2pt;
      color: #64748b;
      font-weight: 500;
    }

    .doc-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      font-size: 6.8pt;
      color: #64748b;
      margin-top: 4px;
    }

    /* Typography */
    h1 {
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      letter-spacing: -0.025em;
      margin-bottom: 1.5px;
    }

    .subtitle {
      font-size: 7.8pt;
      color: #475569;
      margin-bottom: 4px;
      font-weight: 500;
    }

    h2 {
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      margin: 4px 0 2.5px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      border-left: 3.5px solid #0284c7;
      padding-left: 5px;
    }

    p {
      margin-bottom: 3px;
      color: #334155;
    }

    /* KPI Highlights */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-bottom: 4px;
    }

    .kpi-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 4.5px 6px;
      text-align: center;
    }

    .kpi-value {
      font-size: 11.5pt;
      font-weight: 800;
      color: #0284c7;
      line-height: 1.1;
    }

    .kpi-label {
      font-size: 6.2pt;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Callout */
    .callout {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 4px solid #16a34a;
      border-radius: 4px;
      padding: 5px 8px;
      font-size: 7.2pt;
      color: #166534;
      line-height: 1.34;
    }

    .callout strong {
      color: #14532d;
    }

    /* 8-Typology Spectrum Grid (4x2) */
    .typology-spectrum-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4.5px;
    }

    .spectrum-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4.5px 6px;
      border-top: 3px solid #0284c7;
    }

    .spectrum-title {
      font-weight: 700;
      font-size: 7.2pt;
      color: #0f172a;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .spectrum-card p {
      font-size: 6.5pt;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.25;
    }

    /* Questioning Modes Grid (3x2) */
    .modes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4.5px;
    }

    .mode-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4.5px 6px;
      border-left: 3px solid #6366f1;
    }

    .mode-title {
      font-weight: 700;
      font-size: 7.1pt;
      color: #1e1b4b;
      margin-bottom: 2px;
    }

    .mode-card p {
      font-size: 6.4pt;
      color: #475569;
      margin-bottom: 2.5px;
      line-height: 1.22;
    }

    .mode-exemplar {
      font-size: 6.0pt;
      font-style: italic;
      color: #1d4ed8;
      background: #eff6ff;
      padding: 2px 4px;
      border-radius: 2.5px;
      display: block;
      border: 1px solid #dbeafe;
    }

    /* Tables */
    .exemplar-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.6pt;
      margin: 2px 0;
    }

    .exemplar-table th {
      background: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      text-align: left;
      padding: 2.5px 4.5px;
      border: 1px solid #334155;
      font-size: 6.3pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .exemplar-table td {
      padding: 2.7px 4.5px;
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
      font-size: 6.5pt;
      margin: 2px 0;
    }

    table.curriculum-table th {
      background: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      text-align: left;
      padding: 2.6px 4.5px;
      border: 1px solid #334155;
      font-size: 6.1pt;
      text-transform: uppercase;
    }

    table.curriculum-table td {
      padding: 2.9px 4.5px;
      border: 1px solid #e2e8f0;
      color: #334155;
      line-height: 1.20;
    }

    table.curriculum-table tr.group-header td {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      font-size: 6.6pt;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      border-top: 1.5px solid #cbd5e1;
      border-bottom: 1.5px solid #cbd5e1;
      padding: 2.6px 4.5px;
    }

    table.curriculum-table tr:nth-child(even):not(.group-header) td {
      background: #f8fafc;
    }

    .status-complete { background: #dcfce7; color: #15803d; font-weight: 700; font-size: 5.8pt; padding: 1px 3.5px; border-radius: 2px; }
    .status-gold { background: #fef3c7; color: #b45309; font-weight: 700; font-size: 5.8pt; padding: 1px 3.5px; border-radius: 2px; }
    .status-active { background: #e0f2fe; color: #0369a1; font-weight: 700; font-size: 5.8pt; padding: 1px 3.5px; border-radius: 2px; }
  </style>
</head>
<body>

  <!-- PAGE 1: FULL DISCIPLINARY SPECTRUM & AUTONOMOUS QUESTIONING -->
  <div class="page">
    <div class="page-body">
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
          <div class="kpi-value">19 Units</div>
          <div class="kpi-label">Active Taught Units</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">403 / 600+</div>
          <div class="kpi-label">Archival Plates / Total Sources</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">8 Spectrum</div>
          <div class="kpi-label">Evidence Modalities</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">0px / 0%</div>
          <div class="kpi-label">Reprographic Overflow &bull; 100% Clean</div>
        </div>
      </div>

      <div class="callout">
        <strong>Core Pedagogical Architecture (Whole-Unit Portfolio &amp; Full Evidence Breadth):</strong> Source selection is completely freed from rigid per-act templates. We govern diversity at the <em>whole-unit portfolio level</em> (e.g. 35 sources per 7-lesson unit), granting AI full autonomy to deploy the most powerful evidence where the enquiry demands—embracing high statecraft, civilian diaries, satirical cartoons, fine art &amp; sketches, war poetry &amp; protest songs, statistical tables, archival sound clips, maps, and civil defense ephemera.
      </div>

      <h2>1. The Complete Disciplinary Evidence Spectrum (8 Core Modalities)</h2>
      <div class="typology-spectrum-grid">
        <div class="spectrum-card">
          <div class="spectrum-title"><span class="type-pill type-state">Statecraft</span> Treaties &amp; Speeches</div>
          <p>Diplomatic ciphers, legal statutes, and summit declarations. Grounds pupils in ideological doctrine, sovereignty, and macro strategy (e.g. Sèvres Protocol, Balfour Letter, UN Res 242).</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #d97706;">
          <div class="spectrum-title"><span class="type-pill type-below">From Below</span> Diaries &amp; Letters</div>
          <p>Private soldier letters, civilian diaries, and refugee accounts. Shatters "elite determinism" by showing lived human experience (e.g. Truman Babelsberg diary, Vietnam soldier letters, Ramle accounts).</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #be185d;">
          <div class="spectrum-title"><span class="type-pill type-satire">Satirical Art</span> Cartoons &amp; Posters</div>
          <p>Editorial cartoons (<em>Punch</em>, Low, Illingworth). Trains pupils to decode visual allegory, caricature, and contemporary public anxieties (e.g. Suez Crisis crocodile, H-Bomb arm-wrestle).</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #86198f;">
          <div class="spectrum-title"><span class="type-pill type-art">Fine Art</span> Paintings &amp; Drawings</div>
          <p>Official portraits (Holbein, Van Dyck), combat art (Nash, Dix), and sketches. Interrogates symbolic composition, aesthetic power, and frontline physical and mental trauma.</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #047857;">
          <div class="spectrum-title"><span class="type-pill type-poem">Verse &amp; Song</span> Poems &amp; Lyrics</div>
          <p>War poetry (Wilfred Owen), protest anthems (Bob Dylan, <em>Strange Fruit</em>), and samizdat verse. Captures raw emotional, cultural, and spiritual resistance beyond official records.</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #c2410c;">
          <div class="spectrum-title"><span class="type-pill type-data">Statistics</span> Tables &amp; Datasets</div>
          <p>Nuclear stockpiles, inflation tables, and casualty inventories. Teaches critical numeracy: questioning counting methods, collection bias, and structural macro historical trends.</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #4338ca;">
          <div class="spectrum-title"><span class="type-pill type-audio">Sound &amp; Oral</span> 30–60s Audio Clips</div>
          <p>Authentic White House tapes, BBC radio broadcasts, and oral histories. Interrogates vocal tremor, hesitation, cadence, and acoustic reality (e.g. ExComm, Protect &amp; Survive, Churchill).</p>
        </div>
        <div class="spectrum-card" style="border-top-color: #15803d;">
          <div class="spectrum-title"><span class="type-pill type-photo">Visual &amp; Maps</span> Photos &amp; Ephemera</div>
          <p>Verified period photos (U-2, King David Hotel), tactical maps (Tet, UN Res 181 partition), and civil defense ephemera (pamphlets, leaflets, ration books).</p>
        </div>
      </div>

      <h2>2. Autonomous Pedagogical Interrogation: Beyond the "How Useful" Question</h2>
      <p style="font-size: 7.0pt; color: #475569; margin-bottom: 3.5px;">
        Exclusively asking <em>"How useful is Source X for an enquiry into Y?"</em> breeds mechanical formula-filling. The platform deploys six second-order disciplinary interrogation modes based on the source's unique evidentiary nature:
      </p>

      <div class="modes-grid">
        <div class="mode-card">
          <div class="mode-title">1. Evidentiary Value &amp; Source Utility</div>
          <p>Evaluating what the source uniquely illuminates vs its blind spots, using Content Inferences, Provenance (NOP), and Inherent Limitations.</p>
          <span class="mode-exemplar">Exemplar: "What does the 1946 King David Hotel photo reveal about Irgun tactics that official British communiqués obscured?"</span>
        </div>
        <div class="mode-card" style="border-left-color: #0284c7;">
          <div class="mode-title">2. Causal Mechanism &amp; Turning Points</div>
          <p>Interrogating how an action triggered a decisive chain reaction, escalating tensions or forcing strategic geopolitical realignment.</p>
          <span class="mode-exemplar">Exemplar: "How did the nationalisation of the Suez Canal trigger an immediate secret military coalition at Sèvres?"</span>
        </div>
        <div class="mode-card" style="border-left-color: #be185d;">
          <div class="mode-title">3. Ideological Stance &amp; Decoding Satire</div>
          <p>Unpacking visual metaphor, allegory, and contemporary subtext to understand ideological confrontation and popular hysteria.</p>
          <span class="mode-exemplar">Exemplar: "How does Illingworth use the crocodile metaphor in Punch (1956) to demonize Nasser's pan-Arab ambitions?"</span>
        </div>
        <div class="mode-card" style="border-left-color: #d97706;">
          <div class="mode-title">4. Human Perspective, Empathy &amp; Worldview</div>
          <p>Entering the mindset of historical actors to understand why choices appeared inevitable or agonizing from their vantage point.</p>
          <span class="mode-exemplar">Exemplar: "What does the Palestinian refugee photo from Ramle (1948) demonstrate about the immediate reality of displacement?"</span>
        </div>
        <div class="mode-card" style="border-left-color: #15803d;">
          <div class="mode-title">5. Contradiction &amp; Cross-Corroboration</div>
          <p>Evaluating conflicts between high-level state propaganda, frontline military reality, and independent third-party reporting.</p>
          <span class="mode-exemplar">Exemplar: "How do Egyptian radio broadcasts during the Six-Day War contradict the photographic reality of Sinai airfields?"</span>
        </div>
        <div class="mode-card" style="border-left-color: #7c3aed;">
          <div class="mode-title">6. Historical Significance &amp; Consequence</div>
          <p>Weighing long-term structural impact, precedent, and the enduring ripple effects across international and regional relations.</p>
          <span class="mode-exemplar">Exemplar: "Why did the 1978 Camp David Accords fundamentally isolate Egypt within the Arab League for over a decade?"</span>
        </div>
      </div>

      <h2>3. Cognitive Science of Spaced Retrieval &amp; Assessment Architecture</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4.5px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #0369a1; font-size: 6.8pt;">Principle of Zero Self-Testing:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Do Now starters strictly retrieve prior knowledge from previous lessons or earlier units. They NEVER test new material taught in that lesson, preventing cognitive frustration.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #16a34a; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #15803d; font-size: 6.8pt;">Rosenshine's Spaced Practice:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Systematic spiral recall (Last Lesson, Last Week, Prior Key Stage schema) ensures deep schema formation, automated retrieval fluency, and long-term exam retention.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #7c3aed; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #6d28d9; font-size: 6.8pt;">Mandatory Hinge Questions:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Every primary source concludes with an explicit Hinge Question and 3-bullet model answer to diagnose misconceptions and ignite whole-class disciplinary debate.</p>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Curriculum Architecture</div>
      <div>Master Primary Source Curriculum Roadmap • Page 1 of 3</div>
    </div>
  </div>

  <!-- PAGE 2: EXEMPLAR BLUEPRINTS (COLD WAR & CONFLICT IN THE MIDDLE EAST) -->
  <div class="page">
    <div class="page-body">
      <div class="doc-header">
        <div class="brand">
          <span>The History Revision Hub</span>
          <span class="badge">Master Curriculum Standard</span>
        </div>
        <div class="meta">Curriculum Blueprints &bull; Cold War &amp; Conflict in the Middle East &bull; 2026 Edition</div>
      </div>

      <h2>4. Depth Exemplar Blueprint 1: Cold War Whole-Unit Portfolio Diversity (35 Sources)</h2>
      <p style="font-size: 6.8pt; color: #475569; margin-bottom: 2px;">
        The 7 lessons demonstrate how freeing sources from rigid act templates creates a multi-perspectival, academically rigorous curriculum:
      </p>

      <table class="exemplar-table">
        <thead>
          <tr>
            <th style="width: 13%;">Enquiry Lesson</th>
            <th style="width: 19%;">Statecraft &amp; Strategy</th>
            <th style="width: 22%;">Voices, Diaries &amp; Poetry</th>
            <th style="width: 23%;">Satire, Art, Data &amp; Maps</th>
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

      <h2>5. Depth Exemplar Blueprint 2: Conflict in the Middle East 1945–1995 Gold Standard</h2>
      <p style="font-size: 6.8pt; color: #475569; margin-bottom: 2px;">
        Modernized across 12 canonical lessons, 60 standardized narrative blocks (strictly 5 per lesson), and 36 facing-spread primary sources:
      </p>

      <table class="exemplar-table">
        <thead>
          <tr>
            <th style="width: 14%;">Enquiry Spread</th>
            <th style="width: 19%;">Key Topic &amp; Focus</th>
            <th style="width: 22%;">Source A (Visual / Document)</th>
            <th style="width: 22%;">Source B (Map / Contemporary)</th>
            <th style="width: 23%;">Source C (Treaty / Strategic Dispatch)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>L1: Palestine 1945–47</strong></td>
            <td>Mandate Crisis &amp; Terror</td>
            <td><span class="type-pill type-photo">Photo</span> King David Hotel Ruins (1946)</td>
            <td><span class="type-pill type-map">Map</span> UN Partition Plan Res 181 (1947)</td>
            <td><span class="type-pill type-state">Document</span> 1939 British White Paper quota</td>
          </tr>
          <tr>
            <td><strong>L2: War &amp; Nakba</strong></td>
            <td>1948–49 War of Independence</td>
            <td><span class="type-pill type-photo">Photo</span> Israeli Haganah Soldiers (1948)</td>
            <td><span class="type-pill type-below">Photo</span> Palestinian Refugees Ramle (1948)</td>
            <td><span class="type-pill type-state">Speech</span> Ben-Gurion Independence Proclamation</td>
          </tr>
          <tr>
            <td><strong>L3: Suez Crisis 1956</strong></td>
            <td>Nationalisation &amp; Sèvres</td>
            <td><span class="type-pill type-satire">Satire</span> Illingworth "Grab at Suez" cartoon</td>
            <td><span class="type-pill type-photo">Photo</span> Nasser cheering crowd Alexandria</td>
            <td><span class="type-pill type-state">Treaty</span> Sèvres Protocol tripartite pact</td>
          </tr>
          <tr>
            <td><strong>L4: Six-Day War 1967</strong></td>
            <td>Operation Focus &amp; Preemption</td>
            <td><span class="type-pill type-photo">Photo</span> Destroyed Egyptian MiGs Sinai</td>
            <td><span class="type-pill type-photo">Photo</span> Israeli Paratroopers Western Wall</td>
            <td><span class="type-pill type-state">Resolution</span> Khartoum Arab Summit "Three No's"</td>
          </tr>
          <tr>
            <td><strong>L5: Yom Kippur 1973</strong></td>
            <td>Operation Badr &amp; Oil Weapon</td>
            <td><span class="type-pill type-photo">Photo</span> Egyptian troops Bar Lev Line</td>
            <td><span class="type-pill type-photo">Photo</span> Syrian T-62 tanks Golan Heights</td>
            <td><span class="type-pill type-data">Data</span> OPEC Oil Embargo price quadrupling</td>
          </tr>
          <tr>
            <td><strong>L6: Camp David 1978–79</strong></td>
            <td>Sadat, Begin &amp; Carter Accords</td>
            <td><span class="type-pill type-photo">Photo</span> White House Handshake (1979)</td>
            <td><span class="type-pill type-map">Map</span> Sinai Peninsula Demilitarisation Zones</td>
            <td><span class="type-pill type-state">Treaty</span> Egypt-Israel Peace Treaty Article 1</td>
          </tr>
          <tr>
            <td><strong>L7: Lebanon 1982</strong></td>
            <td>Operation Peace for Galilee</td>
            <td><span class="type-pill type-photo">Photo</span> West Beirut Israeli bombardment</td>
            <td><span class="type-pill type-photo">Photo</span> PLO fighters seaborne evacuation</td>
            <td><span class="type-pill type-state">Report</span> Kahan Commission Israeli verdict</td>
          </tr>
          <tr>
            <td><strong>L8: First Intifada 1987</strong></td>
            <td>Sling &amp; Stone Uprising</td>
            <td><span class="type-pill type-photo">Photo</span> Palestinian youth stone-throwing</td>
            <td><span class="type-pill type-ephemera">Ephemera</span> Unified National Leadership Leaflet</td>
            <td><span class="type-pill type-state">Charter</span> 1988 Hamas Founding Covenant Art. 13</td>
          </tr>
          <tr>
            <td><strong>L9: Oslo Accords 1993</strong></td>
            <td>Secret Talks &amp; Handshake</td>
            <td><span class="type-pill type-photo">Photo</span> Rabin-Arafat Handshake (1993)</td>
            <td><span class="type-pill type-map">Map</span> West Bank Areas A, B, and C partition</td>
            <td><span class="type-pill type-state">Treaty</span> Declaration of Principles Mutual Recognition</td>
          </tr>
          <tr>
            <td><strong>L10: Superpower Rivalry</strong></td>
            <td>Cold War Weapon Shipments</td>
            <td><span class="type-pill type-photo">Photo</span> Soviet SAM-6 battery in Syria</td>
            <td><span class="type-pill type-photo">Photo</span> US C-5 Galaxy Operation Nickel Grass</td>
            <td><span class="type-pill type-state">Treaty</span> 1955 Baghdad Pact defense protocol</td>
          </tr>
          <tr>
            <td><strong>L11: Competing Nationalisms</strong></td>
            <td>Zionism vs Arab Unity</td>
            <td><span class="type-pill type-ephemera">Ephemera</span> Zionist First Aliyah poster</td>
            <td><span class="type-pill type-photo">Photo</span> Nasser and Arab summit leaders Cairo</td>
            <td><span class="type-pill type-state">Speech</span> Rabin Mount Scopus Hebrew Univ. Address</td>
          </tr>
          <tr>
            <td><strong>L12: Resistance &amp; Diplomacy</strong></td>
            <td>From Fedayeen to Peace Deals</td>
            <td><span class="type-pill type-photo">Photo</span> 1972 Munich Olympic hostage crisis</td>
            <td><span class="type-pill type-photo">Photo</span> Arafat addressing UN with olive branch</td>
            <td><span class="type-pill type-state">Charter</span> 1968 Palestinian National Charter Art. 9</td>
          </tr>
        </tbody>
      </table>

      <h2>6. The 5-Block Gold Standard &amp; 28-Page Master Publication Standard</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4.5px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #0369a1; font-size: 6.8pt;">Canonical 5-Block Standard:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Every lesson strictly contains 5 narrative blocks (<code>[X.1]</code> to <code>[X.5]</code>). Eliminates empty 0-character blocks, fragmentations, and arbitrary breaks across all lessons.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #16a34a; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #15803d; font-size: 6.8pt;">Facing-Spread Sequential Sources:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Sources A, B, and C sequence across each double-page spread with verified dates, archives, and targeted Hinge questions with 3-bullet model answers.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #7c3aed; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #6d28d9; font-size: 6.8pt;">28-Page Saddle-Stitch Publication:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.2pt;">Compiled to <code>cme_new_textbook_UNIFIED_FINAL.pdf</code> with 100% clean reprographics, 0px overflow across all 28 pages, and 60-question retrieval quiz.</p>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Curriculum Architecture</div>
      <div>Master Primary Source Curriculum Roadmap • Page 2 of 3</div>
    </div>
  </div>

  <!-- PAGE 3: MASTER CURRICULUM REGISTER (ALL 19 UNITS) -->
  <div class="page">
    <div class="page-body">
      <div class="doc-header">
        <div class="brand">
          <span>The History Revision Hub</span>
          <span class="badge">Master Curriculum Standard</span>
        </div>
        <div class="meta">Complete Platform Register &bull; All 19 Taught Units &bull; 2026 Edition</div>
      </div>

      <h2>7. Master Curriculum Register: Full 19-Unit Portfolio &amp; Deliverables</h2>
      <p style="font-size: 6.8pt; color: #475569; margin-bottom: 2px;">
        Comprehensive platform-wide status of all Key Stage 2, Key Stage 3, and GCSE Edexcel units:
      </p>

      <table class="curriculum-table">
        <thead>
          <tr>
            <th style="width: 22%;">Unit Title &amp; ID</th>
            <th style="width: 13%;">Key Stage / Board</th>
            <th style="width: 8%; text-align: center;">Lessons</th>
            <th style="width: 10%; text-align: center;">Plates / Total</th>
            <th style="width: 31%;">Disciplinary Focus &amp; Exemplar Modalities</th>
            <th style="width: 16%; text-align: center;">Deliverables &amp; Status</th>
          </tr>
        </thead>
        <tbody>
          <!-- KEY STAGE 2 -->
          <tr class="group-header">
            <td colspan="6">Key Stage 2 (Primary Transition)</td>
          </tr>
          <tr>
            <td><strong>World War II &amp; Home Front</strong> (<code>ks2_ww2</code>)</td>
            <td>Key Stage 2</td>
            <td style="text-align: center;">11</td>
            <td style="text-align: center;">35 / 35</td>
            <td>Evacuee luggage tags, Blitz ARP photos, Dig for Victory posters, Churchill broadcast audio</td>
            <td style="text-align: center;"><span class="status-gold">GOLD STANDARD</span></td>
          </tr>

          <!-- KEY STAGE 3 -->
          <tr class="group-header">
            <td colspan="6">Key Stage 3 (Secondary Disciplinary Foundations)</td>
          </tr>
          <tr>
            <td><strong>Medieval England: 1066–1485</strong> (<code>medieval_england</code>)</td>
            <td>Year 7 Core</td>
            <td style="text-align: center;">9</td>
            <td style="text-align: center;">10 / 27</td>
            <td>Bayeux Tapestry plates, Domesday Book extract, Magna Carta seal, Peasant Revolt ballads</td>
            <td style="text-align: center;"><span class="status-gold">20p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>Crown, Church &amp; Parliament</strong> (<code>monarchy_religion_power</code>)</td>
            <td>Year 7/8 Depth</td>
            <td style="text-align: center;">5</td>
            <td style="text-align: center;">27 / 27</td>
            <td>Reformation broadsides, Spanish Armada tactical charts, Charles I death warrant</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>The First British Empire</strong> (<code>first_british_empire</code>)</td>
            <td>Year 8 Core</td>
            <td style="text-align: center;">5</td>
            <td style="text-align: center;">20 / 20</td>
            <td>East India Co charters, Brooks slave ship plan, Equiano narrative, Boston Tea Party broadside</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>Industrialisation &amp; Power</strong> (<code>industrialisation_and_empire</code>)</td>
            <td>Year 8 Depth</td>
            <td style="text-align: center;">8</td>
            <td style="text-align: center;">13 / 24</td>
            <td>Coalbrookdale paintings, Sadler child labour testimony, steam engine blueprints, Chartist petitions</td>
            <td style="text-align: center;"><span class="status-gold">18p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>The Second British Empire</strong> (<code>second_british_empire</code>)</td>
            <td>Year 8 Depth</td>
            <td style="text-align: center;">5</td>
            <td style="text-align: center;">9 / 15</td>
            <td>Scramble for Africa maps, 1857 Indian Mutiny dispatches, Boer War concentration camp photos</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>History of Australia</strong> (<code>australia</code>)</td>
            <td>Year 8/9 Enquiry</td>
            <td style="text-align: center;">5</td>
            <td style="text-align: center;">10 / 15</td>
            <td>First Nations rock art, Captain Cook logbooks, Pemulwuy dispatches, Eureka Stockade flag</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>Causes of the Great War</strong> (<code>great_war</code>)</td>
            <td>Year 9 Core</td>
            <td style="text-align: center;">6</td>
            <td style="text-align: center;">13 / 18</td>
            <td>Dreadnought blueprints, Triple Entente maps, Gavrilo Princip arrest photo, Punch satire</td>
            <td style="text-align: center;"><span class="status-gold">14p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>The Great War Part 2</strong> (<code>great_war_part2</code>)</td>
            <td>Year 9 Core</td>
            <td style="text-align: center;">7</td>
            <td style="text-align: center;">5 / 21</td>
            <td>Wilfred Owen verse, Nash battlefield art, Western Front aerial photos, casualty statistical tables</td>
            <td style="text-align: center;"><span class="status-gold">16p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>The Shoah: Holocaust Education</strong> (<code>the_shoah</code>)</td>
            <td>Year 9 Depth</td>
            <td style="text-align: center;">7</td>
            <td style="text-align: center;">14 / 21</td>
            <td>Nuremberg race charts, Kristallnacht police logs, Warsaw Ghetto diaries, Sonderkommando photos</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>Water &amp; Sanitation</strong> (<code>water_and_sanitation</code>)</td>
            <td>KS3 Thematic</td>
            <td style="text-align: center;">7</td>
            <td style="text-align: center;">19 / 21</td>
            <td>Roman aqueduct ruins, John Snow Soho cholera map, Great Stink 1858 Punch cartoons</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>Post-War Britain (1945–Pres)</strong> (<code>post_war_britain</code>)</td>
            <td>KS3/KS4 Thematic</td>
            <td style="text-align: center;">6</td>
            <td style="text-align: center;">18 / 18</td>
            <td>Empire Windrush passenger manifests, NHS handbills, Bristol Bus Boycott ephemera</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>

          <!-- GCSE (KEY STAGE 4) & FIELDWORK -->
          <tr class="group-header">
            <td colspan="6">GCSE (Key Stage 4) &amp; Disciplinary Fieldwork</td>
          </tr>
          <tr>
            <td><strong>The Cold War (1945–1991)</strong> (<code>cold_war</code>)</td>
            <td>KS3 / GCSE Depth</td>
            <td style="text-align: center;">7</td>
            <td style="text-align: center;">12 / 35</td>
            <td>Yalta Livadia photos, Kennan Long Telegram, U-2 spy photos, Dylan ballads, ExComm tapes</td>
            <td style="text-align: center;"><span class="status-gold">GOLD STANDARD</span></td>
          </tr>
          <tr>
            <td><strong>Conflict in Middle East</strong> (<code>cme_new</code>)</td>
            <td>GCSE Edexcel Depth</td>
            <td style="text-align: center;">12</td>
            <td style="text-align: center;">30 / 36</td>
            <td>Balfour letter, 1948 Nakba photos, Suez cartoon, Yom Kippur photos, Camp David, Oslo handshake</td>
            <td style="text-align: center;"><span class="status-gold">28p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>Weimar &amp; Nazi Germany</strong> (<code>weimar_nazi_germany</code>)</td>
            <td>GCSE Edexcel Paper 3</td>
            <td style="text-align: center;">16</td>
            <td style="text-align: center;">40 / 77</td>
            <td>Hyperinflation tables, propaganda posters, Otto Dix combat art, Niemöller resistance verse</td>
            <td style="text-align: center;"><span class="status-gold">28p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>Medicine Through Time</strong> (<code>edexcel_medicine</code>)</td>
            <td>GCSE Edexcel Paper 1</td>
            <td style="text-align: center;">26</td>
            <td style="text-align: center;">73 / 114</td>
            <td>Vesalius anatomical woodcuts, Harvey circulation plates, Western Front casualty clearing logs</td>
            <td style="text-align: center;"><span class="status-gold">28p TEXTBOOK</span></td>
          </tr>
          <tr>
            <td><strong>Early Elizabethan England</strong> (<code>eee</code>)</td>
            <td>GCSE Edexcel Paper 2</td>
            <td style="text-align: center;">12</td>
            <td style="text-align: center;">24 / 24</td>
            <td>Elizabeth Coronation portrait, 1559 Act of Supremacy, Mary Queen of Scots execution warrant</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>USA: Rights &amp; Free World</strong> (<code>usa</code>)</td>
            <td>GCSE Edexcel Paper 3</td>
            <td style="text-align: center;">16</td>
            <td style="text-align: center;">49 / 49</td>
            <td><em>Strange Fruit</em> poem/song, Little Rock photos, Black Panther 10-point plan, My Lai dispatches</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
          <tr>
            <td><strong>Fieldwork: Ypres Salient</strong> (<code>trip_ypres</code>)</td>
            <td>Enquiry / Fieldwork</td>
            <td style="text-align: center;">14</td>
            <td style="text-align: center;">20 / 20</td>
            <td>Menin Gate Roll of Honour, Tyne Cot cemetery plans, McCrae autograph poem, gas medical reports</td>
            <td style="text-align: center;"><span class="status-complete">100% COMPLETE</span></td>
          </tr>
        </tbody>
      </table>

      <h2>8. Non-Negotiable Quality Assurance Gates &amp; CI/CD Pipelines</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4.5px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #0369a1; font-size: 6.8pt;">1. Zero-Placeholder Guarantee:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.1pt;">Automated pre-flight checks fail any source utilizing generic cover images or banners. Verified by <code>audit_and_verify_sources_visually.cjs</code> (403 clean visual plates, 0 missing, 0 mismatches).</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #059669; font-size: 6.8pt;">2. Master Archival Rights Database:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.1pt;">All assets synchronized in <code>master_rights_database.json</code> with verified archive holding, accession ID, legal rights tier (PD/Fair Dealing/OGL), and permanent catalogue URL.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 6px;">
          <strong style="color: #d97706; font-size: 6.8pt;">3. Reprographic Zero-Overflow Audit:</strong>
          <p style="margin: 1.5px 0 0 0; color: #475569; font-size: 6.1pt;">Enforced by <code>audit_page_budget.cjs</code> across all 28-page, 20-page, 18-page, and 16-page saddle-stitch master print publications (0px overflow, footer gap &le; 25px, &ge; 95% space utilization).</p>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 3.5px solid #2563eb; border-radius: 4px; padding: 3.5px 6px;">
        <strong style="color: #1e40af; font-size: 6.8pt;">Institutional Anonymity &amp; Commercial Independence Policy:</strong>
        <span style="color: #3b82f6; font-size: 6.1pt;"> All educational resources are 100% commercially independent under <em>The History Revision Hub</em>, maintaining strict institutional neutrality across multi-school implementations.</span>
      </div>
    </div>

    <div class="doc-footer">
      <div>The History Revision Hub • Independent Curriculum Architecture</div>
      <div>Master Primary Source Curriculum Roadmap • Page 3 of 3</div>
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
