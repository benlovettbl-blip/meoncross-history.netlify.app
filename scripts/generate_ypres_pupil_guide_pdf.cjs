const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_1914_1918_pupil_field_guide.pdf');

// Helper to convert images to base64 for fast, reliable offline rendering
function getBase64Image(relPath) {
  const fullPath = path.join(__dirname, '../public', relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).replace('.', '').toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
  }
  console.warn('Could not find image at:', fullPath);
  return '';
}

function getHtmlContent() {
  // Visual assets
  const stubbingtonMem = getBase64Image('images/stubbington_memorial.jpg');
  const tabletImg = getBase64Image('images/stubbington_memorial_2.jpg');
  const lowryWilliam = getBase64Image('images/lowry_william.png');
  const lowryCyril = getBase64Image('images/lowry_cyril.png');
  const lowryEric = getBase64Image('images/lowry_auriol.png');
  const salientMap = getBase64Image('images/ypres_salient_map_new.png');
  const essexFarm = getBase64Image('images/essex_farm_bunkers.jpg');
  const headstoneImg = getBase64Image('images/cwgc_headstone_essex_farm.jpg');
  const hoogeCrater = getBase64Image('images/hooge_crater.jpg');
  const tyneCot = getBase64Image('images/ypres_tyne_cot.jpg');
  const meninGate = getBase64Image('images/ypres_menin_gate.jpg');
  const clothHallRuins = getBase64Image('images/cloth_hall_ruins_1919.jpg');
  const talbotHouse = getBase64Image('images/talbot_house_relaxing.jpg');

  // Poet Portraits
  const mccraeImg = getBase64Image('images/john_mccrae.jpg');
  const sorleyImg = getBase64Image('images/charles_sorley.jpg');
  const rosenbergImg = getBase64Image('images/isaac_rosenberg.jpg');
  const binyonImg = getBase64Image('images/laurence_binyon.jpg');
  const sassoonImg = getBase64Image('images/siegfried_sassoon.jpg');
  const brookeImg = getBase64Image('images/rupert_brooke.jpg');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Pupil Field Guide &amp; Historical Companion</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8.8pt;
      line-height: 1.4;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 9.5mm 12mm 8.5mm 12mm;
      position: relative;
      background: #ffffff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page-break {
      page-break-after: always;
      break-after: page;
    }

    /* Running Header Bar */
    .header-bar {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 5px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 11.5pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
    }

    .school-sub {
      font-size: 8.2pt;
      color: #475569;
      font-weight: 600;
      margin-top: 1px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 3px 9px;
      border-radius: 5px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 8pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 7.2pt;
      color: #334155;
      font-weight: 600;
    }

    /* Section Headings */
    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      margin: 0;
      color: #0f172a;
    }

    /* Generous Reading Box for Poems */
    .reading-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-left: 5px solid #d97706;
      border-radius: 7px;
      padding: 10px 14px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(217, 119, 6, 0.05);
    }

    .reading-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 11.5pt;
      font-weight: 700;
      color: #78350f;
      margin-bottom: 2px;
    }

    .reading-box .poet-meta {
      font-size: 7.8pt;
      color: #92400e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }

    .reading-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 10pt;
      color: #451a03;
      line-height: 1.5;
      white-space: pre-line;
    }

    /* Poet Biographical Card */
    .poet-bio-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 9px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .poet-bio-card img {
      width: 80px;
      height: 105px;
      object-fit: cover;
      border-radius: 4px;
      border: 1.5px solid #cbd5e1;
      margin-bottom: 5px;
    }

    .poet-bio-card .poet-name {
      font-family: 'Playfair Display', serif;
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
    }

    .poet-bio-card .poet-dates {
      font-size: 7.2pt;
      font-weight: 700;
      color: #b45309;
      margin-bottom: 3px;
    }

    .poet-bio-card .poet-desc {
      font-size: 7.2pt;
      color: #475569;
      line-height: 1.35;
      text-align: left;
    }

    /* Pupil Inquiry / Field Reflection Box */
    .inquiry-box {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      border-radius: 7px;
      padding: 8px 12px;
      margin-bottom: 6px;
    }

    .inquiry-box .inquiry-header {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .inquiry-box .inquiry-content {
      font-size: 8pt;
      color: #1e293b;
      line-height: 1.4;
    }

    /* Cadet Note Taking Lines */
    .field-notes-box {
      background: #fdfefe;
      border: 1.5px dashed #94a3b8;
      border-radius: 6px;
      padding: 6px 10px 8px 10px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    .field-notes-box .notes-header {
      font-size: 7.4pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .field-notes-box .note-line {
      border-bottom: 1px solid #cbd5e1;
      height: 15px;
      width: 100%;
    }

    /* Photo Cards */
    .photo-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .photo-card img {
      width: 100%;
      border-radius: 4px;
      object-fit: cover;
      display: block;
    }

    .photo-card .caption {
      font-size: 7.2pt;
      color: #475569;
      font-style: italic;
      margin-top: 4px;
      line-height: 1.35;
      text-align: left;
    }

    /* Grid Layouts */
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    /* Tables */
    .companion-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
    }

    .companion-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 4px 7px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .companion-table td {
      padding: 4px 7px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
      line-height: 1.35;
    }

    .companion-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Running Footer Bar */
    .footer-bar {
      border-top: 1.5px solid #cbd5e1;
      padding-top: 4px;
      font-size: 7.8pt;
      font-weight: 600;
      color: #475569;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .footer-bar .page-number {
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER ================= -->
  <div class="page page-break" style="justify-content: space-between; text-align: center; background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f8fafc 100%);">
    <div style="border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div style="text-align: left;">
        <span style="font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.08em; display: block;">Meoncross School</span>
        <span style="font-size: 8pt; color: #64748b; font-weight: 600;">Department of History · Ypres Expedition 2026</span>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 9.5pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">The History Boys</span>
        <span style="font-size: 7.8pt; color: #64748b; font-weight: 600;">Specialist Battlefield Education</span>
      </div>
    </div>

    <div style="margin: 10px 0;">
      <div style="display: inline-block; background: #eff6ff; border: 1.5px solid #93c5fd; color: #1e3a8a; font-size: 8.5pt; font-weight: 800; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">
        Official Pupil Field Companion &amp; Study Guide
      </div>
      <h1 style="font-size: 28pt; line-height: 1.1; color: #0f172a; margin-bottom: 6px; letter-spacing: 0.02em;">
        YPRES 1914–1918
      </h1>
      <h2 style="font-size: 12.5pt; font-weight: 600; color: #b45309; font-style: italic; margin-bottom: 14px;">
        The Immortal Salient: Sacrifice, Poetry, Memory &amp; Local Heritage
      </h2>

      <div style="max-width: 440px; margin: 0 auto 14px auto; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 18px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: left;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
          Expedition Cadet Information
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 8.5pt;">
          <div><strong>Pupil Name:</strong> ______________________</div>
          <div><strong>Tutor Group:</strong> _________________</div>
          <div><strong>Field Duty Group:</strong> ______________</div>
          <div><strong>Peace Village Room:</strong> _________</div>
        </div>
      </div>

      <div style="max-width: 450px; margin: 0 auto;">
        <img src="${stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 170px; object-fit: cover; border-radius: 6px; border: 2px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <div style="font-size: 7.5pt; color: #64748b; font-style: italic; margin-top: 5px;">
          The War Memorial at Holy Rood Church, Stubbington — Commemorating our village fallen whose graves and memorial panels we visit across the Salient.
        </div>
      </div>
    </div>

    <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px 15px; margin-bottom: 8px; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-size: 7.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Tour Leaders:</span>
          <span style="font-size: 8.5pt; color: #0f172a; font-weight: 600;">Mr Ben Lovett (Head of History) &amp; Mr James Garrett (The History Boys)</span>
        </div>
        <div>
          <span style="font-size: 7.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Accompanying Staff:</span>
          <span style="font-size: 8.5pt; color: #0f172a; font-weight: 600;">Dr Kirkup &amp; Mrs Lushey</span>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 1 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 2: ITINERARY & SALIENT MAP ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Master Expedition Itinerary &amp; Salient Map</div>
          <div class="school-sub">October Field Study · Three-Day Operational Timetable</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Field Route</div>
          <div class="lead">10 Historic Stops</div>
        </div>
      </div>

      <div class="photo-card" style="margin-bottom: 10px;">
        <img src="${salientMap}" alt="Map of Ypres Salient" style="height: 175px; object-fit: contain; background: #ffffff;">
        <div class="caption">Strategic Overview of the Ypres Salient (1914–1918): Showing frontlines, allied arcs, and major battlefield sites.</div>
      </div>

      <div style="margin-bottom: 10px;">
        <h3 style="font-size: 10pt; color: #1e3a8a; margin-bottom: 5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Expedition Schedule</h3>
        <table class="companion-table">
          <thead>
            <tr>
              <th style="width: 18%;">Day / Time</th>
              <th style="width: 32%;">Location &amp; Activity</th>
              <th>Pupil Focus &amp; Key Enquiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Day 1 · 05:45</strong></td>
              <td>Depart Meoncross School · Dover Ferry Crossing</td>
              <td>Travel logistics, channel crossing orientation, arrival in Flanders.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 14:15</strong></td>
              <td><strong>Stop 1:</strong> Essex Farm ADS &amp; Canal Bank</td>
              <td>Triage bunkers, McCrae's <em>In Flanders Fields</em>, grave of 15-year-old Valentine Strudwick.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 15:30</strong></td>
              <td><strong>Stop 2:</strong> Yorkshire Trench &amp; Dugout</td>
              <td>Restored British front trench; inspect A-frames, fire-bays, and duckboards.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 16:30</strong></td>
              <td><strong>Stop 3:</strong> Langemarck German Cemetery</td>
              <td><em>Studentenfriedhof</em>, 24,917 fallen in the <em>Kameradengrab</em>, Krieger sculptures.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 18:30</strong></td>
              <td>Check-in: Peace Village Hostel, Mesen</td>
              <td>Room allocation, dinner, evening seminar &amp; equipment preparation.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 09:15</strong></td>
              <td><strong>Stop 4:</strong> Vancouver Corner (Brooding Soldier)</td>
              <td>First German gas attack (22 April 1915); Canadian heroic stand; gas warfare analysis.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 10:30</strong></td>
              <td><strong>Stop 5:</strong> Hooge Crater Museum &amp; Trenches</td>
              <td>Mine crater warfare, preserved trench systems, flamethrower attacks.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 13:30</strong></td>
              <td><strong>Stop 6:</strong> Tyne Cot Commonwealth Cemetery</td>
              <td>Passchendaele ridge; pillbox Cross of Sacrifice; Lowry &amp; Stubbington fallen.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 16:30</strong></td>
              <td><strong>Stop 7:</strong> Ypres Ramparts Cemetery &amp; Walk</td>
              <td>Vauban's 17th-century moated brick ramparts; casualty clearing stations.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 19:30</strong></td>
              <td><strong>Stop 8:</strong> The Menin Gate Last Post Ceremony</td>
              <td>54,395 names of the missing; Meoncross School official wreath laying at 20:00.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 09:30</strong></td>
              <td><strong>Stop 9:</strong> Ypres Cloth Hall &amp; Grote Markt</td>
              <td>The rebirth of Ypres; Churchill's ruins proposal vs Flemish stone-for-stone reconstruction.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 11:15</strong></td>
              <td><strong>Stop 10:</strong> Talbot House (Toc H), Poperinge</td>
              <td>Tubby Clayton's 'Everyman's Club'; upper room hop-loft chapel; fellowship behind lines.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 14:00</strong></td>
              <td>Calais Eurotunnel / Ferry · Return to School</td>
              <td>Final reflection journal completion; arrival back at Meoncross approx. 19:30.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="inquiry-box" style="margin-bottom: 0;">
        <div class="inquiry-header">🎒 Essential Field Guidelines for Pupils</div>
        <div class="inquiry-content">
          Wear sturdy walking boots and waterproof layers. Keep this guide, a pencil, and your phone in a secure daypack. At each site, listen carefully to staff orientations before beginning your personal observations.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 2 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 3: THE LOWRY BROTHERS ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Local Heritage: The Lowry Brothers of Stubbington</div>
          <div class="school-sub">Stubbington House School Alumni · Three Brothers, Three Fronts, Immense Sacrifice</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Local Fallen</div>
          <div class="lead">Tyne Cot &amp; Beyond</div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e3a8a; border-radius: 8px; padding: 8px 12px; margin-bottom: 10px;">
        <h3 style="font-size: 10.5pt; color: #1e3a8a; margin-bottom: 3px;">The Lowry Family Heritage</h3>
        <p style="font-size: 8.2pt; color: #334155; margin: 0; line-height: 1.4;">
          Three sons of Arthur and Eleanor Lowry of Stubbington attended Stubbington House School—the historic preparatory school whose grounds now form part of our local community. All three brothers received officer commissions; all three made extraordinary sacrifices across the major theatres of the Great War.
        </p>
      </div>

      <div class="grid-3col" style="margin-bottom: 10px; align-items: stretch;">
        <!-- William -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryWilliam}" alt="Captain William Lowry" style="width: 90px; height: 115px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Capt. William Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">2nd Bn, King's Own (Royal Lancaster)</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Killed leading assault on Frezenberg Ridge, Second Ypres, 8 May 1915, aged 26.<br><br>
              Body never recovered. Commemorated on Menin Gate Panel 12.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 5px; border-radius: 4px; font-size: 7pt; color: #1e293b; font-weight: 600; margin-top: 6px; text-align: center;">
            📍 Menin Gate (Panel 12)
          </div>
        </div>

        <!-- Cyril -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryCyril}" alt="Captain Cyril Lowry" style="width: 90px; height: 115px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Capt. Cyril Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">4th Bn, North Staffordshire Regt</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Mortally wounded commanding front trenches at Zonnebeke, Passchendaele, 26 Sept 1917, aged 22.<br><br>
              Buried in Tyne Cot Cemetery (Plot LXII. D. 12).
            </p>
          </div>
          <div style="background: #fef3c7; padding: 5px; border-radius: 4px; font-size: 7pt; color: #92400e; font-weight: 600; margin-top: 6px; text-align: center;">
            📍 Tyne Cot (Plot LXII. D. 12)
          </div>
        </div>

        <!-- Eric -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryEric}" alt="Lt Col Eric Lowry" style="width: 90px; height: 115px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lt. Col. Eric Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">2nd Bn, Prince of Wales's Volunteers</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Survived intense actions on Western Front, wounded twice, awarded DSO.<br><br>
              Continued serving in regular army, bearing lifelong trauma of brothers' loss.
            </p>
          </div>
          <div style="background: #ecfdf5; padding: 5px; border-radius: 4px; font-size: 7pt; color: #065f46; font-weight: 600; margin-top: 6px; text-align: center;">
            🎖️ Survived: DSO &amp; MiD
          </div>
        </div>
      </div>

      <div class="inquiry-box" style="margin-bottom: 6px;">
        <div class="inquiry-header">🔍 Pupil Field Inquiry: The Lowry Memorial at Tyne Cot</div>
        <div class="inquiry-content">
          When we reach Plot LXII at Tyne Cot, locate Captain Cyril Lowry's headstone. Note the cross emblem, his age (just 22), and read the family inscription: <em>"In Proud and Loving Memory"</em>. How does standing at an individual grave change our comprehension of Passchendaele compared to looking across 11,000 stones?
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Field Notes (The Lowry Brothers &amp; Plot LXII):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Record observations on site</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 3 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 4: THE SIX VILLAGE HEROES ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">The Six Village Fallen of Holy Rood &amp; Boy Soldiers</div>
          <div class="school-sub">Connecting Our Village Parish to the Flemish Soil · Private Valentine Strudwick</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stubbington Fallen</div>
          <div class="lead">Holy Rood Parish</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div>
          <h3 style="font-size: 10.5pt; color: #1e3a8a; margin-bottom: 5px;">The Holy Rood Memorial Roll</h3>
          <p style="font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 6px;">
            The memorial plaque inside Holy Rood Church, Stubbington, records the names of men from our village who did not return. Six of these local soldiers fell in the Ypres Salient and the battle of Passchendaele:
          </p>
          <table class="companion-table">
            <thead>
              <tr>
                <th>Soldier</th>
                <th>Regiment / Unit</th>
                <th>Salient Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Pte. Walter Spratt</strong></td>
                <td>1st Bn, Hampshire Regt</td>
                <td>Ploegsteert (Missing)</td>
              </tr>
              <tr>
                <td><strong>Sgt. Frank Rogers</strong></td>
                <td>2nd Bn, Hampshire Regt</td>
                <td>Menin Gate (Panel 35)</td>
              </tr>
              <tr>
                <td><strong>L/Cpl. Arthur Newman</strong></td>
                <td>Royal Engineers (Signals)</td>
                <td>Tyne Cot Memorial</td>
              </tr>
              <tr>
                <td><strong>Pte. George Stares</strong></td>
                <td>8th Bn, Hampshire Regt</td>
                <td>Bedford House Cemetery</td>
              </tr>
              <tr>
                <td><strong>Dvr. Edward Vear</strong></td>
                <td>Royal Field Artillery</td>
                <td>Brandhoek Military Cemetery</td>
              </tr>
              <tr>
                <td><strong>Cpl. Harry Freemantle</strong></td>
                <td>Royal Marine Artillery</td>
                <td>Dunkirk / Ypres Coast</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${tabletImg}" alt="Holy Rood Church Tablet" style="height: 125px; object-fit: cover;">
            <div class="caption">The Memorial Tablet inside Holy Rood Church, Stubbington, commemorating our parish fallen.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 7.5pt; color: #475569; line-height: 1.35;">
            <strong>Parish Remembrance:</strong> These men walked the same village lanes we walk today. During our tour, we will pause and lay a personal remembrance marker at each of their commemorative panels.
          </div>
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 7px; padding: 10px 14px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h3 style="font-size: 10.5pt; color: #991b1b; margin: 0;">Case Study: Private Valentine Joe Strudwick (Age 15)</h3>
          <span style="font-size: 7.5pt; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 2px 7px; border-radius: 4px;">Essex Farm · Plot I. U. 8</span>
        </div>
        <p style="font-size: 8pt; color: #450a0a; line-height: 1.42; margin: 0 0 5px 0;">
          Valentine Strudwick enlisted at 14, claiming he was 19. Sent to the Ypres Salient, he survived intense shellfire before being killed in action on 14 January 1916—just one month before his 16th birthday. He is one of the youngest recorded British casualties of the war.
        </p>
        <div style="font-size: 7.8pt; font-weight: 700; color: #7f1d1d; font-style: italic;">
          Mother's Inscription: "Not Gone From Memory, Not Gone From Love, But Gone To Our Father's Home Above."
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Reflection (Boy Soldiers &amp; Underage Enlistment):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Reflect on Valentine Strudwick's age vs your own</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 4 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 5: FIELD GEOGRAPHY & HEADSTONE ANATOMY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Reading the Battlefield: Geography &amp; Headstone Anatomy</div>
          <div class="school-sub">The Commonwealth War Graves System · Decoding the Portland Stone Markers</div>
        </div>
        <div class="partner-pill">
          <div class="brand">CWGC Architecture</div>
          <div class="lead">Sir Fabian Ware</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="photo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${headstoneImg}" alt="CWGC Headstone Anatomy" style="height: 195px; object-fit: contain; background: #ffffff;">
          <div class="caption">Standard CWGC Portland Stone Headstone (81cm high, 38cm wide, 7.5cm thick).</div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 10.5pt; color: #1e3a8a; margin-bottom: 6px;">The 5 Elements of a CWGC Headstone</h3>
            <div style="font-size: 8pt; color: #334155; line-height: 1.4;">
              <div style="margin-bottom: 5px;">
                <strong style="color: #1e3a8a;">1. Regimental Badge:</strong> Carved at the top with extraordinary detail.
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #1e3a8a;">2. Identification:</strong> Service Number, Rank, Name, Honours, Regiment. All ranks receive identical stones.
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #1e3a8a;">3. Religious Emblem:</strong> Latin Cross, Star of David, or left blank.
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #1e3a8a;">4. Date &amp; Age:</strong> The exact date fallen and age.
              </div>
              <div>
                <strong style="color: #1e3a8a;">5. Personal Inscription:</strong> Up to 66 letters chosen by family.
              </div>
            </div>
          </div>

          <div style="background: #fefce8; border: 1px solid #fde047; padding: 6px 8px; border-radius: 5px; font-size: 7.5pt; color: #854d0e; line-height: 1.3; margin-top: 6px;">
            <strong>Unknown Soldiers:</strong> Kipling's epitaph: <em>"A Soldier of the Great War — Known Unto God."</em>
          </div>
        </div>
      </div>

      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 9px 13px; margin-bottom: 8px;">
        <h3 style="font-size: 10pt; color: #0f172a; margin-bottom: 4px;">The Geography of the Salient: Why Did So Many Die Here?</h3>
        <p style="font-size: 8pt; color: #475569; line-height: 1.38; margin: 0 0 6px 0;">
          A <strong>salient</strong> is an outward bulge in military frontlines, surrounded by the enemy on three sides. British, Canadian, Australian, and French troops holding Ypres were overlooked by German observers on higher ridges. German artillery batteries could shell Allied positions from the north, east, and south simultaneously.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.6pt; color: #1e293b;">
          <div style="background: #f1f5f9; padding: 5px 8px; border-radius: 4px;">
            <strong>Water Table &amp; Clay:</strong> Digging down struck water; trenches became liquid mud.
          </div>
          <div style="background: #f1f5f9; padding: 5px 8px; border-radius: 4px;">
            <strong>Convergence of Shellfire:</strong> Heavy artillery caused over 70% of casualties.
          </div>
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Hampshire Regiment Headstone Discovery Log:</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Find a Hampshire soldier &amp; record details</span>
        </div>
        <div class="note-line" style="display: flex; justify-content: space-between; font-size: 7pt; color: #64748b; align-items: flex-end; padding-bottom: 1px;">
          <span>Name &amp; Rank: ___________________________________</span>
          <span>Cemetery &amp; Plot: ______________________</span>
        </div>
        <div class="note-line" style="display: flex; justify-content: space-between; font-size: 7pt; color: #64748b; align-items: flex-end; padding-bottom: 1px;">
          <span>Personal Inscription: _______________________________________________________________________________</span>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 5 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 6: ESSEX FARM & YORKSHIRE TRENCH ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Study · Medical Care &amp; Frontline Trenches</div>
          <div class="school-sub">Stops 1 &amp; 2 · Essex Farm Advanced Dressing Station &amp; Yorkshire Trench</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Yser Canal</div>
          <div class="lead">Boezinge Sector</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${essexFarm}" alt="Essex Farm Bunkers" style="height: 105px; object-fit: cover;">
            <div class="caption">Concrete bunkers of Essex Farm ADS dug into the canal embankment.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 7.8pt; color: #334155; line-height: 1.35;">
            <strong>Advanced Dressing Station (ADS):</strong> Frontline triage post where surgeons worked by candlelight treating horrific wounds. McCrae penned <em>In Flanders Fields</em> here on 3 May 1915.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${mccraeImg}" alt="Lt. Col. John McCrae">
          <div class="poet-name">Lt. Col. John McCrae</div>
          <div class="poet-dates">1872–1918 · Canadian Army Medical Corps</div>
          <div class="poet-desc">
            Physician and soldier from Ontario. Served as brigade surgeon during Second Ypres. Penned his famous poem in the back of an ambulance on 3 May 1915 following the funeral of his friend Lt. Alexis Helmer. Died of pneumonia in 1918.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 6px;">
        <div class="poem-title">In Flanders Fields</div>
        <div class="poet-meta">By Lt. Col. John McCrae · Composed at Essex Farm, 3 May 1915</div>
        <div class="poem-lines" style="font-size: 9.8pt; line-height: 1.48;">
In Flanders fields the poppies blow
Between the crosses, row on row,
    That mark our place; and in the sky
    The larks, still bravely singing, fly
Scarce heard amid the guns below.

We are the Dead. Short days ago
We lived, felt dawn, saw sunset glow,
    Loved and were loved, and now we lie,
    In Flanders fields.

Take up our quarrel with the foe:
To you from failing hands we throw
    The torch; be yours to hold it high.
    If ye break faith with us who die
We shall not sleep, though poppies grow
    In Flanders fields.
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Field Notes (Essex Farm Bunkers &amp; Yorkshire Trench Duckboards):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Record observations on site</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 6 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 7: LANGEMARCK GERMAN CEMETERY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Study · German Mourning &amp; Youth Sacrifice</div>
          <div class="school-sub">Stop 3 · Langemarck German Military Cemetery (Studentenfriedhof)</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Langemarck</div>
          <div class="lead">The Myth of 1914</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 10.5pt; color: #1e3a8a; margin-bottom: 4px;">The Somber Atmosphere of Langemarck</h3>
            <p style="font-size: 7.8pt; color: #334155; line-height: 1.4; margin: 0 0 6px 0;">
              Langemarck stands in powerful contrast to the white Portland stone of CWGC cemeteries. Known as the <em>Studentenfriedhof</em>, it commemorates thousands of student volunteers fallen in 1914.
            </p>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 5px; font-size: 7.4pt; color: #475569; line-height: 1.35;">
              <strong>Kameradengrab (Comrades' Grave):</strong> 24,917 German soldiers buried in a single mass grave.<br>
              <strong>Emil Krieger's Statues:</strong> Four bronze mourning figures standing sentinel beneath the oaks.
            </div>
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${sorleyImg}" alt="Charles Hamilton Sorley">
          <div class="poet-name">Charles Hamilton Sorley</div>
          <div class="poet-dates">1895–1915 · Captain, 7th Suffolk Regiment</div>
          <div class="poet-desc">
            Scottish poet born in Aberdeen; educated at Marlborough and Oxford. Lived in Germany before the war. Killed by a sniper at the Battle of Loos on 13 October 1915, aged 20. His stark sonnet was found in his kitbag after his death, rejecting patriotic vanity.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 6px;">
        <div class="poem-title">When You See Millions of the Mouthless Dead</div>
        <div class="poet-meta">By Charles Hamilton Sorley · Found in his kitbag, October 1915</div>
        <div class="poem-lines" style="font-size: 9.8pt; line-height: 1.48;">
When you see millions of the mouthless dead
Across your dreams in pale battalions go,
Say not soft things as other men have said,
That you'll remember. For you need not so.
Give them not praise. For, deaf, how should they know
It is not curses heaped on each gashed head?
Nor tears. Their blind eyes see not your tears flow.
Nor honour. It is easy to be dead.
Say only this, “They are dead.” Then add thereto,
“Yet many a better one has died before.”
Then, scanning all the o'ercrowded mass, should you
Perceive one face that you loved heretofore,
It is a spook. None wears the face you knew.
Great death has made all his for evermore.
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Comparative Notes (Langemarck Basalt vs CWGC Portland Stone):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">How does architecture shape remembrance?</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 7 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 8: SECOND YPRES & HOOGE CRATER ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Study · Gas Warfare &amp; Underground Mines</div>
          <div class="school-sub">Stops 4 &amp; 5 · Vancouver Corner &amp; Hooge Crater Museum</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Menin Road</div>
          <div class="lead">Gas &amp; Crater Warfare</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${hoogeCrater}" alt="Hooge Crater Museum" style="height: 105px; object-fit: cover;">
            <div class="caption">The Hooge Crater site: Where underground mines blew massive chasms in the ridge.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 7.8pt; color: #334155; line-height: 1.35;">
            <strong>Vancouver Corner &amp; Hooge:</strong> On 22 April 1915, German forces released 168 tons of chlorine gas. Canadian troops heroically held the line. At Hooge, tunnelling units detonated 1,700lb ammonal mines.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${rosenbergImg}" alt="Isaac Rosenberg">
          <div class="poet-name">Isaac Rosenberg</div>
          <div class="poet-dates">1890–1918 · Private, King's Own Royal Lancaster Regt</div>
          <div class="poet-desc">
            Working-class Jewish painter and poet from Whitechapel; studied at the Slade School. Enlisted in a 'Bantam' battalion. Wrote visceral poetry on scraps of cardboard in Flemish mud. Killed in action near Arras on 1 April 1918.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 6px;">
        <div class="poem-title">Break of Day in the Trenches</div>
        <div class="poet-meta">By Isaac Rosenberg · Written in Flanders mud, June 1916</div>
        <div class="poem-lines" style="font-size: 9.5pt; line-height: 1.48;">
The darkness crumbles away.
It is the same old druid Time as ever,
Only a live thing leaps on my hand,
A queer, sardonic rat,
As I pull the parapet’s poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies,
Now you have touched this English hand
You will have the same chance for a German...
Poppies whose roots are in man’s veins
Drop, and are ever dropping;
But mine in my ear is safe—
Just a little white with the dust.
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Field Observations (Gas Warfare &amp; Trench Mine Craters):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Record observations on site</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 8 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 9: TYNE COT COMMONWEALTH CEMETERY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Study · The Epicentre of Passchendaele</div>
          <div class="school-sub">Stop 6 · Tyne Cot British Military Cemetery &amp; Memorial to the Missing</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Passchendaele</div>
          <div class="lead">11,961 Burials</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${tyneCot}" alt="Tyne Cot Cemetery" style="height: 105px; object-fit: cover;">
            <div class="caption">The Cross of Sacrifice erected atop a captured German pillbox at Tyne Cot.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 7.8pt; color: #334155; line-height: 1.35;">
            <strong>The Largest Commonwealth Cemetery:</strong> 11,961 soldiers lie buried here, 8,369 of them unidentified. Sir Herbert Baker incorporated three captured German machine-gun pillboxes directly into the cemetery.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${binyonImg}" alt="Laurence Binyon">
          <div class="poet-name">Laurence Binyon</div>
          <div class="poet-dates">1869–1943 · British Museum Curator &amp; Red Cross Orderly</div>
          <div class="poet-desc">
            Scholar of art and poetry who volunteered as a hospital orderly in France in 1916. Wrote <em>For the Fallen</em> while sitting on the cliffs of Cornwall in September 1914. Its fourth stanza was adopted worldwide as the Ode of Remembrance.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 6px;">
        <div class="poem-title">For the Fallen (The Ode of Remembrance)</div>
        <div class="poet-meta">By Laurence Binyon · September 1914 · Recited Nightly at the Menin Gate</div>
        <div class="poem-lines" style="font-size: 10pt; line-height: 1.5;">
With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea.
Flesh of her flesh they were, spirit of her spirit,
Fallen in the cause of the free.

Solemn the drums thrill: Death august and royal
Sings sorrow up into immortal spheres,
There is music in the midst of desolation
And a glory that shines upon our tears.

They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Reflection (Tyne Cot Memorial Wall &amp; 34,984 Missing):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Capt. Cyril Lowry (Plot LXII. D. 12)</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 9 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 10: THE MENIN GATE CEREMONY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Evening · The Memorial to the Missing &amp; Last Post</div>
          <div class="school-sub">Stop 8 · The Menin Gate (Menenpoort) · 54,395 Commonwealth Soldiers</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Last Post</div>
          <div class="lead">20:00 Daily Since 1928</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${meninGate}" alt="The Menin Gate Ypres" style="height: 105px; object-fit: cover;">
            <div class="caption">The Menin Gate Memorial: Designed by Sir Reginald Blomfield, inaugurated in 1927.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 7.8pt; color: #334155; line-height: 1.35;">
            <strong>The Gateway to Battle:</strong> Through this gate hundreds of thousands of men marched towards the frontline trenches. Carved into its stone panels are the names of 54,395 soldiers missing in the Salient prior to August 1917.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${sassoonImg}" alt="Siegfried Sassoon">
          <div class="poet-name">Siegfried Sassoon</div>
          <div class="poet-dates">1886–1967 · Captain, Royal Welch Fusiliers (MC)</div>
          <div class="poet-desc">
            Decorated for reckless courage ("Mad Jack"), Sassoon became the foremost soldier-critic of the war. Attending the 1927 dedication of the Menin Gate, he reacted with fury against its grand architecture, believing it sanitized the suffering of the dead.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 6px;">
        <div class="poem-title">On Passing the New Menin Gate</div>
        <div class="poet-meta">By Siegfried Sassoon · Written upon the Memorial's Unveiling, 1927</div>
        <div class="poem-lines" style="font-size: 9.8pt; line-height: 1.48;">
Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,—
Those doomed, conscripted, unvictorious ones?
Crudely renewed, the Salient holds its own.
Paid are its expenses by alone
The unknown dead who face the gaping void.
Here was the world’s worst wound. And here with pride
‘Their name liveth for ever,’ the Gateway claims.
Was ever an immolation so belied
As these intolerably nameless names?
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Personal Reflections on the Last Post Ceremony &amp; The Missing:</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">Sounding of the bugles at 20:00</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 10 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 11: CLOTH HALL & TALBOT HOUSE ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 3 Field Study · Rebirth &amp; Fellowship Behind Lines</div>
          <div class="school-sub">Stops 9 &amp; 10 · Ypres Cloth Hall &amp; Talbot House (Everyman's Club, Poperinge)</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Rebirth</div>
          <div class="lead">Poperinge &amp; Ypres</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <!-- Stop 9: Cloth Hall -->
        <div class="photo-card">
          <img src="${clothHallRuins}" alt="The Cloth Hall Ypres 1919" style="height: 105px; object-fit: cover;">
          <div class="caption">
            <strong>The Cloth Hall, Ypres (1919):</strong> Watercolour by Scottish war artist <strong>Emily Murray Paterson RSW (1855–1934)</strong>, painted on-site amidst the ruins after the Armistice (Imperial War Museum collection).
          </div>
        </div>

        <!-- Stop 10: Talbot House -->
        <div class="photo-card">
          <img src="${talbotHouse}" alt="Talbot House Exterior Façade" style="height: 105px; object-fit: cover;">
          <div class="caption">
            <strong>Talbot House Façade, Poperinge:</strong> The exterior façade on Gasthuisstraat, opened in December 1915 by Rev. Philip 'Tubby' Clayton as an unranked sanctuary for all soldiers behind the lines.
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="poet-bio-card">
          <img src="${brookeImg}" alt="Rupert Brooke">
          <div class="poet-name">Rupert Brooke</div>
          <div class="poet-dates">1887–1915 · Sub-Lieutenant, Royal Naval Division</div>
          <div class="poet-desc">
            Cambridge scholar whose handsome charisma and patriotic sonnets captivated the nation in 1914. Brooke captured the early Edwardian idealism before trench warfare set in. Died of sepsis on a hospital ship off Skyros on 23 April 1915 on his way to Gallipoli.
          </div>
        </div>

        <!-- Enlarged Poem Display -->
        <div class="reading-box" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="poem-title">The Soldier</div>
            <div class="poet-meta">By Rupert Brooke · Written late 1914</div>
            <div class="poem-lines" style="font-size: 9.8pt; line-height: 1.48;">
If I should die, think only this of me:
    That there's some corner of a foreign field
That is for ever England. There shall be
    In that rich earth a richer dust concealed;
A dust whom England bore, shaped, made aware,
    Gave, once, her flowers to love, her ways to roam;
A body of England's, breathing English air,
    Washed by the rivers, blest by suns of home.

And think, this heart, all evil shed away,
    A pulse in the eternal mind, no less
        Gives somewhere back the thoughts by England given;
Her sights and sounds; dreams happy as her day;
    And laughter, learnt of friends; and gentleness,
        In hearts at peace, under an English heaven.
            </div>
          </div>
        </div>
      </div>

      <div class="field-notes-box">
        <div class="notes-header">
          <span>✍️ Cadet Notes (Talbot House 'Everyman’s Club' &amp; Rebuilt Cloth Hall):</span>
          <span style="font-size: 6.8pt; color: #94a3b8;">"Abandon all rank that enter here"</span>
        </div>
        <div class="note-line"></div>
        <div class="note-line"></div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 11 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 12: FIELD REFERENCE & GLOSSARY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Field Study Reference &amp; Battlefield Glossary</div>
          <div class="school-sub">Architectural Terminology, Flemish Toponyms &amp; Tour Standards</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Field Reference</div>
          <div class="lead">Essential Knowledge</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 9px;">
        <div>
          <h4 style="font-size: 9.5pt; color: #1e3a8a; margin-bottom: 5px;">Trench &amp; Military Terminology</h4>
          <table class="companion-table">
            <tbody>
              <tr>
                <td style="width: 30%;"><strong>ADS</strong></td>
                <td><strong>Advanced Dressing Station:</strong> Frontline medical bunker behind trenches for urgent triage before casualty evacuation.</td>
              </tr>
              <tr>
                <td><strong>A-Frames</strong></td>
                <td>A-shaped timber frames supporting duckboard walkways above waterlogged trench mud.</td>
              </tr>
              <tr>
                <td><strong>Pillbox</strong></td>
                <td>Reinforced concrete machine gun bunker built by German forces to withstand heavy artillery shellfire.</td>
              </tr>
              <tr>
                <td><strong>Salient</strong></td>
                <td>A bulge in military lines surrounded by the enemy on three sides, exposed to converging artillery arcs.</td>
              </tr>
              <tr>
                <td><strong>Sump</strong></td>
                <td>A deep drainage pit dug beneath trench duckboards to catch pooling rainwater.</td>
              </tr>
              <tr>
                <td><strong>Trench Foot</strong></td>
                <td>Severe fungal and circulatory condition caused by prolonged immersion in cold, wet mud.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h4 style="font-size: 9.5pt; color: #b45309; margin-bottom: 5px;">CWGC &amp; Memorial Terminology</h4>
          <table class="companion-table">
            <tbody>
              <tr>
                <td style="width: 32%;"><strong>CWGC</strong></td>
                <td><strong>Commonwealth War Graves Commission:</strong> Founded 1917 by Fabian Ware to care for 1.7 million fallen.</td>
              </tr>
              <tr>
                <td><strong>Cross of Sacrifice</strong></td>
                <td>Designed by Sir Reginald Blomfield: Portland stone cross bearing a bronze broadsword.</td>
              </tr>
              <tr>
                <td><strong>Stone of Memory</strong></td>
                <td>Designed by Sir Edwin Lutyens: altar-like stone carved with Kipling's phrase <em>"Their Name Liveth For Evermore"</em>.</td>
              </tr>
              <tr>
                <td><strong>Kameradengrab</strong></td>
                <td>German 'Comrades' Grave': a central mass burial holding thousands of fallen soldiers (e.g. 24,917 at Langemarck).</td>
              </tr>
              <tr>
                <td><strong>Portland Stone</strong></td>
                <td>Fine white limestone from Dorset, chosen for its luminosity and radical equality across all military ranks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 8px 12px; margin-bottom: 8px;">
        <h4 style="font-size: 9pt; color: #0f172a; margin-bottom: 3px;">🇧🇪 Flemish &amp; French Toponyms in the Salient</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 7.8pt; color: #334155;">
          <div><strong>Ieper:</strong> Ypres</div>
          <div><strong>Poperinge:</strong> "Pop" (rear town)</div>
          <div><strong>Heuvelland:</strong> Hill country (hostel)</div>
          <div><strong>Menenpoort:</strong> Menin Gate</div>
          <div><strong>Lakenhalle:</strong> Cloth Hall</div>
          <div><strong>Krombeke:</strong> Reserve lines</div>
          <div><strong>Zonnebeke:</strong> Polygon Wood area</div>
          <div><strong>Mesen:</strong> Messines Ridge</div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e3a8a; border-radius: 7px; padding: 8px 12px; margin-bottom: 8px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          🤝 Code of Conduct &amp; Pupil Expedition Standards
        </div>
        <div style="font-size: 7.6pt; color: #1e293b; line-height: 1.35;">
          1. <strong>Quiet Respect:</strong> Cemeteries are active places of international mourning. Walk strictly on grass paths; do not sit on headstones.<br>
          2. <strong>Mobile Phone Protocol:</strong> Phones may be used for educational photography during visits. Collected into secure bags at curfew.<br>
          3. <strong>Hostel Downtime:</strong> Quiet hours from 22:00 at Peace Village. Respect other international student groups.<br>
          4. <strong>Ambassadors of Meoncross:</strong> We represent our school and the village of Stubbington before the people of Flanders.
        </div>
      </div>

      <div style="background: #0f172a; color: #ffffff; padding: 7px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt;">
        <div>
          <span style="color: #fbbf24; font-weight: 700;">Expedition Staff:</span>
          Mr Ben Lovett &amp; Mr James Garrett (Tour Leaders) · Dr Kirkup &amp; Mrs Lushey (Accompanying Staff)
        </div>
        <div>
          <span style="color: #94a3b8;">School Base 24/7 Emergency:</span>
          <strong style="color: #ffffff;">+44 (0)1329 288339</strong>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross School History Department · Ypres 1914–1918 Pupil Field Guide</span>
      <span class="page-number">Page 12 of 12</span>
    </div>
  </div>

</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres 1914–1918 Pupil Field Guide PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  const html = getHtmlContent();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log('✅ Ypres Pupil Field Guide PDF successfully created at:', outputPath);
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating Pupil Field Guide PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
