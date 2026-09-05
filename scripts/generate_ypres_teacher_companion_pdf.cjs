const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_1914_1918_teacher_companion.pdf');

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
  const hoogeTrench = getBase64Image('images/hooge_crater_trench.png');
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
  <title>Ypres 1914–1918: Tour Leader &amp; Teacher Field Companion</title>
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
      line-height: 1.38;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 10mm 12mm 9mm 12mm;
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
      padding-bottom: 6px;
      margin-bottom: 9px;
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
      padding: 4px 10px;
      border-radius: 6px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 8.2pt;
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

    .section-title {
      font-size: 12.5pt;
      color: #1e3a8a;
      font-weight: 800;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Specialized Callout Boxes */
    .talking-points-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 5px solid #1e3a8a;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 8px;
    }

    .talking-points-box .box-header {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .reading-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-left: 5px solid #d97706;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 8px;
    }

    .reading-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 10.5pt;
      font-weight: 700;
      color: #78350f;
      margin-bottom: 2px;
    }

    .reading-box .poet-meta {
      font-size: 7.5pt;
      color: #92400e;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .reading-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.5pt;
      color: #451a03;
      line-height: 1.45;
      white-space: pre-line;
    }

    .photo-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px;
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
      margin-top: 5px;
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
      padding: 5px 8px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .companion-table td {
      padding: 5px 8px;
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
      padding-top: 5px;
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

    <div style="margin: 12px 0;">
      <div style="display: inline-block; background: #eff6ff; border: 1.5px solid #93c5fd; color: #1e3a8a; font-size: 8.5pt; font-weight: 800; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
        Staff Edition · Tour Leader &amp; Teacher Companion
      </div>
      <h1 style="font-size: 28pt; line-height: 1.1; color: #0f172a; margin-bottom: 8px; letter-spacing: 0.02em;">
        YPRES 1914–1918
      </h1>
      <h2 style="font-size: 13pt; font-weight: 600; color: #b45309; font-style: italic; margin-bottom: 16px;">
        Master Expedition Handbook, On-Site Scripts, Timings &amp; Logistics
      </h2>

      <div style="max-width: 440px; margin: 0 auto 16px auto; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 18px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: left;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
          Tour Staff &amp; Leadership Directorate
        </div>
        <div style="font-size: 8.2pt; line-height: 1.45; color: #1e293b;">
          <strong>Tour Leaders:</strong> Mr Ben Lovett (Head of History) &amp; Mr James Garrett (The History Boys)<br>
          <strong>Accompanying Staff:</strong> Dr Kirkup &amp; Mrs Lushey<br>
          <strong>Base Camp:</strong> Peace Village Hostel, Mesen, Belgium<br>
          <strong>Tour Operators:</strong> Joint Educational Partnership (Meoncross &amp; The History Boys)
        </div>
      </div>

      <div style="max-width: 460px; margin: 0 auto;">
        <img src="${stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 175px; object-fit: cover; border-radius: 6px; border: 2px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <div style="font-size: 7.5pt; color: #64748b; font-style: italic; margin-top: 6px;">
          The War Memorial at Holy Rood Church, Stubbington — Anchoring our school expedition to our local parish fallen.
        </div>
      </div>
    </div>

    <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 16px; margin-bottom: 10px; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-size: 7.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Tour Leaders:</span>
          <span style="font-size: 8.5pt; color: #0f172a; font-weight: 600;">Mr Ben Lovett &amp; Mr James Garrett</span>
        </div>
        <div>
          <span style="font-size: 7.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Accompanying Staff:</span>
          <span style="font-size: 8.5pt; color: #0f172a; font-weight: 600;">Dr Kirkup &amp; Mrs Lushey</span>
        </div>
        <div>
          <span style="font-size: 7.8pt; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.05em; display: block;">School Base 24/7 Emergency:</span>
          <span style="font-size: 8.5pt; color: #0f172a; font-weight: 600;">+44 (0)1329 288339</span>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 1 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 2: ITINERARY & SALIENT MAP ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Master Expedition Timetable &amp; Salient Map</div>
          <div class="school-sub">Tour Leader Pacing, Coach Logistics &amp; Strategic Route</div>
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
        <h3 style="font-size: 10pt; color: #1e3a8a; margin-bottom: 5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Tour Leader Operational Schedule</h3>
        <table class="companion-table">
          <thead>
            <tr>
              <th style="width: 18%;">Day / Time</th>
              <th style="width: 32%;">Location &amp; Activity</th>
              <th>Teacher Pacing &amp; Key Directives</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Day 1 · 05:45</strong></td>
              <td>Depart Meoncross School · Dover Ferry Crossing</td>
              <td>Register check; collect passports; ferry meal vouchers; ETA Boezinge 14:00.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 14:15</strong></td>
              <td><strong>Stop 1:</strong> Essex Farm ADS &amp; Canal Bank</td>
              <td>Gather group at Bunker 4; read McCrae; guide to Strudwick headstone (Plot I.U.8).</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 15:30</strong></td>
              <td><strong>Stop 2:</strong> Yorkshire Trench &amp; Dugout</td>
              <td>Single-file trench walk; point out A-frames and sump pits; 35 min stop.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 16:30</strong></td>
              <td><strong>Stop 3:</strong> Langemarck German Cemetery</td>
              <td>Transition talk: somber tone; gather at Kameradengrab; prompt Sorley poem reading.</td>
            </tr>
            <tr>
              <td><strong>Day 1 · 18:30</strong></td>
              <td>Check-in: Peace Village Hostel, Mesen</td>
              <td>Key cards; room inspections; dinner at 19:15; evening briefing; 22:00 curfew.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 09:15</strong></td>
              <td><strong>Stop 4:</strong> Vancouver Corner (Brooding Soldier)</td>
              <td>Canadian stand; gas warfare overview; terrain vantage looking towards Gravenstafel.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 10:30</strong></td>
              <td><strong>Stop 5:</strong> Hooge Crater Museum &amp; Trenches</td>
              <td>Crater geology; mine detonation; trench walk; pack lunches at museum picnic area.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 13:30</strong></td>
              <td><strong>Stop 6:</strong> Tyne Cot Commonwealth Cemetery</td>
              <td>Pillbox assembly; Binyon reading; direct pupils to Lowry grave &amp; Hampshire names on Wall.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 16:30</strong></td>
              <td><strong>Stop 7:</strong> Ypres Ramparts Cemetery &amp; Walk</td>
              <td>Shaded canal walk; quiet reflection; transition to central Ypres for early dinner.</td>
            </tr>
            <tr>
              <td><strong>Day 2 · 19:30</strong></td>
              <td><strong>Stop 8:</strong> The Menin Gate Last Post Ceremony</td>
              <td>Arrive by 19:30 for prime position; wreath party prep; silence during buglers at 20:00.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 09:30</strong></td>
              <td><strong>Stop 9:</strong> Ypres Cloth Hall &amp; Grote Markt</td>
              <td>Town rebirth; stone-by-stone reconstruction; In Flanders Fields Museum visit.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 11:15</strong></td>
              <td><strong>Stop 10:</strong> Talbot House (Toc H), Poperinge</td>
              <td>Tea in dining room; visit Tubby's Upper Room chapel; read Rupert Brooke in garden.</td>
            </tr>
            <tr>
              <td><strong>Day 3 · 14:00</strong></td>
              <td>Calais Eurotunnel / Ferry · Return to School</td>
              <td>Final head count; customs clearance; ETA Meoncross approx. 19:30.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="talking-points-box" style="margin-bottom: 0;">
        <div class="box-header">📋 Staff Supervisory Protocol</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          Pupil count required at every coach departure and cemetery entrance. Dr Kirkup and Mrs Lushey lead sweep duties. In case of separation, designated pupil assembly point is the coach parking bay.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 2 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 3: THE LOWRY BROTHERS ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Local Heritage: The Lowry Brothers of Stubbington</div>
          <div class="school-sub">Stubbington House Alumni · Staff Historical Dossier &amp; Cemetery Coordinates</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Local Fallen</div>
          <div class="lead">Tyne Cot &amp; Beyond</div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px;">
        <div class="box-header">🎤 Tour Leader Talking Points: The Lowry Brothers</div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
          <strong>Local Connection:</strong> Three sons of William and Annie Lowry of Manor Way Grange in Lee-on-the-Solent attended Stubbington House School. All three held commissions, and all three were killed in action across different theatres: Gallipoli (William), the Somme (Cyril), and Arras (Eric).<br>
          <strong>Pedagogical Goal:</strong> Connect grand tactical operations to individual boys who walked our local paths. Emphasise that William and Cyril have no known graves, while Eric lies in a marked grave at La Targette British Cemetery near Arras. Grieving father William Lowry built the Lowry Memorial Hall in Lee-on-the-Solent in their honour.
        </div>
      </div>

      <div class="grid-3col" style="margin-bottom: 10px; align-items: stretch;">
        <!-- William -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryWilliam}" alt="Lieut. William Lowry" style="width: 85px; height: 110px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lieut. William Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">8th Gurkha Rifles (Indian Army)</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Eldest brother (aged 25); Cambridge scholar. Killed 4 June 1915 leading charge up Gully Ravine, Gallipoli, under heavy machine-gun fire.<br><br>
              Body never recovered. Commemorated on Helles Memorial, Turkey.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 5px; border-radius: 4px; font-size: 7pt; color: #1e293b; font-weight: 700; margin-top: 6px; text-align: center;">
            📍 Helles Memorial, Gallipoli
          </div>
        </div>

        <!-- Cyril -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryCyril}" alt="Capt. Cyril Lowry" style="width: 85px; height: 110px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Capt. Cyril Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">2nd Bn, West Yorkshire Regt</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Youngest brother (aged 20). Served under older brother Eric. Killed 25 March 1918 defending Somme crossing at Eterpigny during German Spring Offensive.<br><br>
              Fell in full view of Eric; body lost in withdrawal. Commemorated on Pozières Memorial.
            </p>
          </div>
          <div style="background: #fef3c7; padding: 5px; border-radius: 4px; font-size: 7pt; color: #92400e; font-weight: 700; margin-top: 6px; text-align: center;">
            📍 Pozières Memorial, Somme
          </div>
        </div>

        <!-- Eric -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 6px;">
              <img src="${lowryEric}" alt="Lt Col Eric Lowry" style="width: 85px; height: 110px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 9.5pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lt. Col. Eric Lowry</h4>
            <div style="font-size: 7.2pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 5px;">2nd Bn, West Yorkshire Regt (DSO, MC)</div>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0;">
              Middle brother (aged 25). Commanded 2nd West Yorkshires at Westhoek Ridge and Somme. Awarded DSO, MC &amp; Bar, French Croix de Guerre.<br><br>
              Killed 23 September 1918 by machine gun inspecting outposts near Arleux, dying in his runner's arms. Buried at La Targette.
            </p>
          </div>
          <div style="background: #fee2e2; padding: 5px; border-radius: 4px; font-size: 7pt; color: #991b1b; font-weight: 700; margin-top: 6px; text-align: center;">
            📍 La Targette British Cemetery (Plot I. C. 2)
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 0;">
        <h4 style="font-size: 8.8pt; color: #1e3a8a; margin-bottom: 4px;">🎯 Staff Action Points at Tyne Cot</h4>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          1. Lead pupils along the central avenue directly to the Cross of Sacrifice built atop the captured German pillbox.<br>
          2. Guide students along the rear memorial wall to locate our parish fallen (such as L/Cpl Arthur Newman, Royal Engineers).<br>
          3. Emphasise how the tragedy of the three Lowry brothers mirrors the universal bereavement that affected families across every street in Britain.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 3 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 4: THE SIX VILLAGE HEROES ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">The Six Village Fallen &amp; Boy Soldiers</div>
          <div class="school-sub">Staff Plot Guides &amp; Case Study: Private Valentine Strudwick</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stubbington Fallen</div>
          <div class="lead">Holy Rood Parish</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div>
          <h3 style="font-size: 10.5pt; color: #1e3a8a; margin-bottom: 5px;">The Holy Rood Memorial Roll</h3>
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
            <div class="caption">The Memorial Tablet inside Holy Rood Church, Stubbington.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 9px; font-size: 7.5pt; color: #475569; line-height: 1.35;">
            <strong>Staff Note:</strong> Distribute local fallen cards to student pairs during coach journey from Boezinge. Each pair will locate their assigned soldier's panel on site.
          </div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px;">
        <div class="box-header">🎤 Tour Leader Talking Points: Boy Soldier Valentine Strudwick</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <strong>Location:</strong> Essex Farm Cemetery, Plot I. U. 8 (facing canal bank).<br>
          <strong>The Story:</strong> Enlisted at 14 claiming he was 19; killed in action on 14 January 1916 aged 15 years and 11 months.<br>
          <strong>Teaching Cue:</strong> Ask students to stand around the grave. Compare Valentine's age to their own year group. Note the continuous flow of poppy tributes laid by visiting schools from across Britain.
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 6px; padding: 10px 14px; margin-bottom: 0;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #991b1b; margin-bottom: 3px;">
          Mother's Epitaph: "Not Gone From Memory, Not Gone From Love, But Gone To Our Father's Home Above."
        </div>
        <p style="font-size: 7.8pt; color: #450a0a; margin: 0; line-height: 1.38;">
          Use this epitaph to discuss the profound human cost borne by working-class families who lost adolescent boys before they had ever reached adult life.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 4 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 5: FIELD GEOGRAPHY & HEADSTONE ANATOMY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Field Geography &amp; CWGC Headstone Anatomy</div>
          <div class="school-sub">Staff Primer: Topography of the Salient &amp; Cemetery Decorum</div>
        </div>
        <div class="partner-pill">
          <div class="brand">CWGC Architecture</div>
          <div class="lead">Sir Fabian Ware</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="photo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${headstoneImg}" alt="CWGC Headstone Anatomy" style="height: 200px; object-fit: contain; background: #ffffff;">
          <div class="caption">CWGC Portland Stone Headstone Dimensions: 81cm x 38cm x 7.5cm.</div>
        </div>

        <div class="talking-points-box" style="display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div class="box-header">🎤 Tour Leader Briefing: Headstone Anatomy</div>
            <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
              <strong>1. Badge:</strong> Regimental heraldry; equality across officer and private.<br>
              <strong>2. Text:</strong> Service number, rank, name, honours, regiment.<br>
              <strong>3. Cross / Emblem:</strong> Latin Cross, Star of David, or left blank.<br>
              <strong>4. Age &amp; Date:</strong> Average age in the Salient was 24.<br>
              <strong>5. Personal Inscription:</strong> Family-paid line (max 66 characters). Highlight to pupils how diverse these are: religious, stoic, or heartbroken.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px; font-size: 7.2pt; color: #475569; margin-top: 6px;">
            <strong>Unknowns:</strong> Kipling's phrase: <em>"A Soldier of the Great War — Known Unto God."</em>
          </div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px;">
        <div class="box-header">🎤 Tour Leader Script: Topography of the Salient</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <strong>The Ridge:</strong> Stand with students looking east from Ypres. The land rises barely 45 metres towards Passchendaele, but in flat Flanders, that low ridge commanded complete artillery domination.<br>
          <strong>Converging Arcs:</strong> German batteries positioned along the arc could shell British rear areas from three directions. Reinforcements had to march into the bulge under continuous observation.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 3px;">
          Staff Management at Cemeteries
        </div>
        <div style="font-size: 7.6pt; color: #475569; line-height: 1.35;">
          Remind students that these are active cemeteries. No running, no sitting on headstones, no shouting. Set a calm, contemplative tone upon disembarking the coach.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 5 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 6: ESSEX FARM & YORKSHIRE TRENCH ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Study · Medical Care &amp; Frontline Trenches</div>
          <div class="school-sub">Stops 1 &amp; 2 · Essex Farm ADS &amp; Yorkshire Trench · Tour Scripts</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Yser Canal</div>
          <div class="lead">Boezinge Sector</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 1 Tour Script: Essex Farm ADS</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Where We Stand:</strong> Concrete bunkers built into the Yser canal bank. An Advanced Dressing Station where Canadian surgeons triaged thousands during Second Ypres.<br>
            <strong>Alexis Helmer:</strong> On 2 May 1915, McCrae's 22-year-old friend was blown to pieces by an 8-inch shell. McCrae performed the burial by lantern light; next morning he sat on the ambulance step and composed <em>In Flanders Fields</em>.
          </div>
        </div>

        <div class="photo-card">
          <img src="${essexFarm}" alt="Essex Farm Bunkers" style="height: 105px;">
          <div class="caption">Concrete dressing station bunkers dug into the canal embankment.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 2 Tour Script: Yorkshire Trench</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Discovery:</strong> Unearthed in 1992 by amateur archaeologists ("The Diggers") in an industrial zone.<br>
            <strong>What to Notice:</strong> The wooden A-frames, fire-bays, deep dugout entrance (holding 200 men), and the shallow water table.
          </div>
        </div>

        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">In Flanders Fields</div>
              <div class="poet-meta">Lt. Col. John McCrae (1872–1918) · Canadian AMC</div>
            </div>
            <img src="${mccraeImg}" alt="John McCrae" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
In Flanders fields the poppies blow
Between the crosses, row on row,
    That mark our place; and in the sky
    The larks, still bravely singing, fly
Scarce heard amid the guns below.
We are the Dead. Short days ago
We lived, felt dawn, saw sunset glow,
    Loved and were loved, and now we lie,
    In Flanders fields.
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🎯 Teacher Field Task at Essex Farm
        </div>
        <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
          Prompt a designated student to read stanzas 1 and 2 of <em>In Flanders Fields</em> standing directly outside Bunker 4. Then lead the group to Plot I. U. 8 to observe Valentine Strudwick's headstone.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
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

      <div class="talking-points-box" style="margin-bottom: 8px;">
        <div class="box-header">🎤 Stop 3 Tour Script: Langemarck &amp; The Student Myth</div>
        <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
          <strong>The Myth of Langemarck:</strong> In November 1914, German propaganda claimed raw student regiments charged singing <em>"Deutschland über alles"</em>. In reality, poorly trained youths were mown down by experienced British rifle fire.<br>
          <strong>Kameradengrab (Comrades' Grave):</strong> 24,917 men buried in a single mass grave behind the oak gatehouse.<br>
          <strong>Contrast with CWGC:</strong> Dark German granite, low flat markers, somber oak canopy—capturing defeat, national mourning, and heavy grief compared to British radiant Portland stone.
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">When You See Millions of the Mouthless Dead</div>
              <div class="poet-meta">Charles Sorley (1895–1915) · Capt., 7th Suffolks</div>
            </div>
            <img src="${sorleyImg}" alt="Charles Sorley" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
When you see millions of the mouthless dead
Across your dreams in pale battalions go,
Say not soft things as other men have said,
That you'll remember. For you need not so.
Give them not praise. For, deaf, how should they know
It is not curses heaped on each gashed head?
Nor tears. Their blind eyes see not your tears flow.
Nor honour. It is easy to be dead.
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">Pedagogical Cue: Emil Krieger Statues</h4>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0 0 4px 0;">
              Gather students at the rear boundary facing Emil Krieger’s four mourning bronze figures. Note how they huddle together without martial glory or triumphalism.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 5px; border-radius: 4px; font-size: 7pt; color: #1e293b; font-weight: 600;">
            Key Question: Why did the German state choose dark basalt over white limestone?
          </div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Logistical Transfer to Mesen
        </div>
        <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
          Depart Langemarck at 17:30. Coach journey south to Peace Village Hostel in Mesen takes approx. 35 mins. Prepare pupils for room check-in and evening meal.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 7 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 8: SECOND YPRES & HOOGE CRATER ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Study · Gas Warfare &amp; Underground Mines</div>
          <div class="school-sub">Stops 4 &amp; 5 · Vancouver Corner &amp; Hooge Crater · Tour Scripts</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Menin Road</div>
          <div class="lead">Gas &amp; Mine Warfare</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 4 Tour Script: Vancouver Corner</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>22 April 1915:</strong> The first lethal use of poison gas in history. 168 tons of chlorine released by German forces against French Algerian troops.<br>
            <strong>The Canadian Stand:</strong> Canadian troops held the gap for days by urinating on handkerchiefs to neutralise chlorine. Commemorated by the magnificent <em>Brooding Soldier</em> monument.
          </div>
        </div>

        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 5 Tour Script: Hooge Crater</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Underground War:</strong> Tunnelling companies dug deep into blue Flemish clay to detonate ammonal charges beneath German trenches.<br>
            <strong>The Hooge Crater:</strong> Detonated on 19 July 1915 (1,700lb ammonal), creating a 120ft wide crater. First German flamethrower attack occurred here 11 days later.
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">Break of Day in the Trenches</div>
              <div class="poet-meta">Isaac Rosenberg (1890–1918) · Private, King's Own</div>
            </div>
            <img src="${rosenbergImg}" alt="Isaac Rosenberg" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
The darkness crumbles away.
It is the same old druid Time as ever,
Only a live thing leaps on my hand,
A queer, sardonic rat,
As I pull the parapet’s poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies...
          </div>
        </div>

        <div class="photo-card">
          <img src="${hoogeCrater}" alt="Hooge Crater" style="height: 105px;">
          <div class="caption">Hooge Crater site: Preserved mine craters and trench warfare lines.</div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🥪 Lunch Break Directives at Hooge
        </div>
        <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
          Eat packed lunches at the Hooge Crater Museum picnic area. Restroom break. Coach boards at 13:00 sharp for Tyne Cot Cemetery.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
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

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 6 Tour Script: The Scale of Tyne Cot</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>The Scale:</strong> Largest British war cemetery in the world. 11,961 burials (8,369 unidentified). Sir Herbert Baker built the Cross of Sacrifice directly atop a captured German machine gun bunker.<br>
            <strong>The Memorial Wall:</strong> 34,984 names of soldiers missing after 16 August 1917.<br>
            <strong>Pilgrimage:</strong> Guide pupils to Hampshire Regiment panels and our parish fallen (including L/Cpl Arthur Newman on the Memorial Wall).
          </div>
        </div>

        <div class="photo-card">
          <img src="${tyneCot}" alt="Tyne Cot" style="height: 105px;">
          <div class="caption">Cross of Sacrifice standing atop captured German bunker.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">For the Fallen</div>
              <div class="poet-meta">Laurence Binyon (1869–1943) · British Museum</div>
            </div>
            <img src="${binyonImg}" alt="Laurence Binyon" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea...
They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">Staff Coordination: Parish Fallen</h4>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0 0 4px 0;">
              After Binyon recitation at the Cross of Sacrifice, lead pupils to the Memorial Wall to locate our parish fallen (including L/Cpl Arthur Newman, Royal Engineers). Lay the Meoncross remembrance marker.
            </p>
          </div>
          <div style="background: #fef3c7; padding: 5px; border-radius: 4px; font-size: 7pt; color: #92400e; font-weight: 600;">
            Allow 25 mins personal reflective walk across the rows.
          </div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Next Stop: Ramparts Cemetery &amp; Menin Gate
        </div>
        <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
          Board coach at 15:45. Drive to Ypres Lille Gate for Stop 7 (Ramparts Cemetery) and prepare for evening Last Post Ceremony at Menin Gate.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 9 of 12</span>
    </div>
  </div>


  <!-- ================= PAGE 10: THE MENIN GATE CEREMONY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Evening · The Memorial to the Missing &amp; Last Post</div>
          <div class="school-sub">Stop 8 · The Menin Gate (Menenpoort) · Official Wreath-Laying</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Last Post</div>
          <div class="lead">20:00 Daily Since 1928</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 8 Tour Script: The Menin Gate</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>54,395 Names:</strong> Inscribed with soldiers missing in the Salient prior to 16 August 1917. Designed by Sir Reginald Blomfield.<br>
            <strong>The Last Post Ceremony:</strong> Held every night at 20:00 without fail (except during WWII occupation). Buglers of the volunteer fire brigade sound the salute.
          </div>
        </div>

        <div class="photo-card">
          <img src="${meninGate}" alt="Menin Gate" style="height: 105px;">
          <div class="caption">The Menin Gate Memorial: Inaugurated July 1927.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">On Passing the New Menin Gate</div>
              <div class="poet-meta">Siegfried Sassoon (1886–1967) · Capt., Royal Welch Fusiliers</div>
            </div>
            <img src="${sassoonImg}" alt="Siegfried Sassoon" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,—
Those doomed, conscripted, unvictorious ones?...
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">Staff Wreath-Laying Protocol</h4>
            <p style="font-size: 7.5pt; color: #475569; line-height: 1.35; margin: 0 0 4px 0;">
              19:30: Secure prime position on northern walkway under the arch.<br>
              19:50: Designated Meoncross wreath bearers escorted by staff to ceremonial marshalling area.<br>
              20:00: Last Post sounded; two-minute silence; official wreath laying.
            </p>
          </div>
          <div style="background: #eff6ff; padding: 5px; border-radius: 4px; font-size: 7pt; color: #1e3a8a; font-weight: 600;">
            Staff Lead: Mr Ben Lovett &amp; Mr James Garrett
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 0;">
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Evening Return to Peace Village
        </div>
        <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
          Depart Menin Gate at 20:45. Arrive hostel 21:15. Evening drinks/cookies. Curfew and phone collection in corridor at 22:00 sharp.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
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

      <div class="grid-2col" style="margin-bottom: 8px;">
        <!-- Stop 9: Cloth Hall -->
        <div class="photo-card">
          <img src="${clothHallRuins}" alt="The Cloth Hall Ypres 1919" style="height: 105px; object-fit: cover;">
          <div class="caption">
            <strong>The Cloth Hall, Ypres (1919):</strong> Watercolour by Scottish war artist <strong>Emily Murray Paterson RSW (1855–1934)</strong>, painted on-site amidst the ruins after the Armistice (Imperial War Museum collection).
          </div>
        </div>

        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 9 Tour Script: The Rebirth of Ypres</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Total Destruction:</strong> By 1918, Ypres was rubble; Winston Churchill wanted the ruins left untouched as a sacred memorial. Instead, citizens rebuilt stone-for-stone.<br>
            <strong>The Lakenhalle:</strong> Built in 1304; rebuilt over 40 years. Inside is the <em>In Flanders Fields Museum</em>.
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <!-- Stop 10: Talbot House -->
        <div class="photo-card">
          <img src="${talbotHouse}" alt="Talbot House Exterior Façade" style="height: 105px; object-fit: cover;">
          <div class="caption">
            <strong>Talbot House Façade, Poperinge:</strong> The exterior façade on Gasthuisstraat, opened in December 1915 by Rev. Philip 'Tubby' Clayton as an unranked sanctuary for all soldiers behind the lines.
          </div>
        </div>

        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 10 Tour Script: Talbot House (Toc H)</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>The Haven Behind the Lines:</strong> In Dec 1915, Army Chaplain Rev. Philip 'Tubby' Clayton opened this house in Poperinge as an alternative to pubs and brothels.<br>
            <strong>"Abandon all rank that enter here":</strong> Officers and privates drank tea from the same mugs and played the same piano.<br>
            <strong>The Upper Room:</strong> Climb the creaking stairs to the hop-loft chapel. A carpenter's bench served as the altar.
          </div>
        </div>
      </div>

      <div class="reading-box" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">The Soldier</div>
            <div class="poet-meta">Rupert Brooke (1887–1915) · Sub-Lieutenant, Royal Naval Division</div>
          </div>
          <img src="${brookeImg}" alt="Rupert Brooke" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.4;">
If I should die, think only this of me:
    That there's some corner of a foreign field
That is for ever England. There shall be
    In that rich earth a richer dust concealed;
A dust whom England bore, shaped, made aware,
    Gave, once, her flowers to love, her ways to roam;
A body of England's, breathing English air,
    Washed by the rivers, blest by suns of home.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
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
                <td style="width: 32%;"><strong>ADS</strong></td>
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

      <div class="talking-points-box" style="margin-bottom: 9px;">
        <div class="box-header">🇧🇪 Useful Flemish &amp; French Toponyms in the Salient</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <strong>Ieper:</strong> Flemish name for Ypres.<br>
          <strong>Poperinge:</strong> Town behind lines known affectionately to British troops as <em>"Pop"</em>.<br>
          <strong>Heuvelland:</strong> 'Hill Country' south of Ypres (home of our Peace Village Hostel base in Mesen).<br>
          <strong>Lakenhalle:</strong> The medieval Cloth Hall in the Grote Markt of Ypres.<br>
          <strong>Menenpoort:</strong> Flemish for the Menin Gate.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 7px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          🤝 Code of Conduct &amp; Expedition Standards
        </div>
        <div style="font-size: 7.6pt; color: #475569; line-height: 1.35;">
          1. <strong>Quiet Respect:</strong> Cemeteries are active places of mourning. Walk strictly on grass paths; do not sit on headstones or climb on memorial panels.<br>
          2. <strong>Mobile Phone Protocol:</strong> Phones may be used for photographs during the day. Collected each evening in dedicated staff bags at curfew.<br>
          3. <strong>Hostel Downtime:</strong> Quiet hours from 22:00 in Peace Village corridors. Respect international guests and staff sleep cycles.<br>
          4. <strong>The Mission:</strong> Always remember that we represent Meoncross School and our village parish of Holy Rood before the people of Belgium.
        </div>
      </div>

      <div style="background: #0f172a; color: #ffffff; padding: 6px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.4pt;">
        <div>
          <span style="color: #fbbf24; font-weight: 700;">Expedition Staff:</span>
          Mr Ben Lovett &amp; Mr James Garrett (Tour Leaders) · Dr Kirkup &amp; Mrs Lushey (Accompanying Staff)
        </div>
        <div>
          <span style="color: #94a3b8;">School Base 24/7 Emergency:</span>
          <strong>+44 (0)1329 288339</strong>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Tour Leader Companion</span>
      <span class="page-number">Page 12 of 12</span>
    </div>
  </div>

</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres 1914–1918 Tour Leader & Teacher Companion PDF...');
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
  console.log('✅ Ypres Tour Leader Companion PDF successfully created at:', outputPath);
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating Tour Leader Companion PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
