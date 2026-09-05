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
      font-size: 9.3pt;
      line-height: 1.5;
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
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 12.5pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
    }

    .school-sub {
      font-size: 8.6pt;
      color: #475569;
      font-weight: 600;
      margin-top: 1px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1.5px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 8.5pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 7.5pt;
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
      font-size: 12pt;
      color: #1e3a8a;
      font-weight: 800;
      margin-bottom: 7px;
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
      border-radius: 7px;
      padding: 10px 14px;
      margin-bottom: 10px;
    }

    .talking-points-box .box-header {
      font-size: 8.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .reading-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-left: 5px solid #d97706;
      border-radius: 7px;
      padding: 10px 13px;
      margin-bottom: 10px;
    }

    .reading-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 10.8pt;
      font-weight: 700;
      color: #78350f;
      margin-bottom: 1px;
    }

    .reading-box .poet-meta {
      font-size: 7.8pt;
      color: #92400e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 5px;
    }

    .reading-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.8pt;
      color: #451a03;
      line-height: 1.46;
      white-space: pre-line;
    }

    .photo-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 7px;
      padding: 6px;
      text-align: center;
    }

    .photo-card img {
      width: 100%;
      border-radius: 4px;
      object-fit: cover;
      display: block;
    }

    .photo-card .caption {
      font-size: 7.8pt;
      color: #475569;
      font-style: italic;
      margin-top: 4px;
      line-height: 1.35;
      text-align: left;
    }

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

    .companion-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.4pt;
    }

    .companion-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 5px 8px;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .companion-table td {
      padding: 4.8px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
      line-height: 1.4;
    }

    .companion-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Running Footer Bar */
    .footer-bar {
      border-top: 1.5px solid #cbd5e1;
      padding-top: 5px;
      font-size: 8.2pt;
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
      padding: 2px 9px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER ================= -->
  <div class="page page-break" style="text-align: center; background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f8fafc 100%);">
    <div>
      <div style="border-bottom: 2px solid #cbd5e1; padding-bottom: 11px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: left;">
          <span style="font-size: 12pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.08em; display: block;">Meoncross School</span>
          <span style="font-size: 8.4pt; color: #64748b; font-weight: 600;">Department of History · Ypres Salient Expedition 2026</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10.5pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">The History Boys</span>
          <span style="font-size: 8.2pt; color: #64748b; font-weight: 600;">Specialist Battlefield Education</span>
        </div>
      </div>

      <div style="display: inline-block; background: #eff6ff; border: 1.5px solid #93c5fd; color: #1e3a8a; font-size: 8.8pt; font-weight: 800; padding: 4px 18px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">
        Staff Edition · Tour Leader &amp; Teacher Companion
      </div>

      <h1 style="font-size: 30pt; line-height: 1.1; color: #0f172a; margin-bottom: 4px; letter-spacing: 0.02em;">
        YPRES 1914–1918
      </h1>
      <h2 style="font-size: 13.2pt; font-weight: 600; color: #b45309; font-style: italic; margin-bottom: 11px;">
        Master Expedition Handbook, On-Site Scripts, Timings &amp; Logistics
      </h2>

      <!-- Leadership & Logistics Box -->
      <div style="max-width: 540px; margin: 0 auto 10px auto; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 18px; box-shadow: 0 3px 6px -1px rgba(0,0,0,0.05); text-align: left;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
          Tour Leadership Directorate &amp; Operational Logistics
        </div>
        <div style="font-size: 8.5pt; line-height: 1.46; color: #1e293b;">
          <strong>Tour Leaders:</strong> Mr Ben Lovett (Head of History) &amp; Mr James Garrett (The History Boys)<br>
          <strong>Accompanying Staff:</strong> Dr Kirkup (Pastoral Lead) &amp; Mrs Lushey (First Aid &amp; Sweep Lead)<br>
          <strong>Expedition Dates:</strong> Thursday 1st – Saturday 3rd October 2026<br>
          <strong>Base Camp:</strong> Peace Village Hostel, Nieuwkerkestraat 9, 8957 Mesen, Belgium (+32 57 22 60 40)<br>
          <strong>Transport:</strong> Jet Connect 53-Seat Executive Coach · Driver Rest Regulations strictly observed
        </div>
      </div>

      <!-- Grand Cover Photograph (Height 270px) -->
      <div style="max-width: 540px; margin: 0 auto 10px auto;">
        <img src="${stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 270px; object-fit: cover; border-radius: 7px; border: 2px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.09);">
        <div style="font-size: 7.8pt; color: #64748b; font-style: italic; margin-top: 5px;">
          The War Memorial at Holy Rood Church, Stubbington — Anchoring our school expedition to our local parish fallen.
        </div>
      </div>

      <!-- Educational Mission & Binyon Dedication -->
      <div style="max-width: 540px; margin: 0 auto 10px auto; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #b45309; border-radius: 8px; padding: 10px 16px; text-align: left;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          The Tour Leader's Charge: A Pilgrimage of Remembrance
        </div>
        <p style="font-size: 8.3pt; color: #334155; line-height: 1.45; margin: 0 0 5px 0;">
          We lead our pupils not on a detached tour, but on a transformative pilgrimage of memory. By standing at the graves of our Stubbington parish fallen, walking the mud of Passchendaele, and sounding the Last Post at the Menin Gate, we nurture historical empathy, evidential enquiry, and lifelong reverence for the fallen.
        </p>
        <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 9pt; color: #1e3a8a; padding-left: 8px; border-left: 2px solid #93c5fd;">
          "They shall grow not old, as we that are left grow old: Age shall not weary them, nor the years condemn.<br>
          At the going down of the sun and in the morning, We will remember them."
        </div>
      </div>

      <!-- Emergency Contact & Pastoral Lead Matrix -->
      <div style="max-width: 540px; margin: 0 auto 10px auto; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 16px; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="font-size: 7.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Tour Leaders:</span>
            <span style="font-size: 8.6pt; color: #0f172a; font-weight: 600;">Mr Ben Lovett &amp; Mr James Garrett</span>
          </div>
          <div>
            <span style="font-size: 7.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Accompanying Staff:</span>
            <span style="font-size: 8.6pt; color: #0f172a; font-weight: 600;">Dr Kirkup &amp; Mrs Lushey</span>
          </div>
          <div>
            <span style="font-size: 7.8pt; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.05em; display: block;">School Base 24/7 Emergency:</span>
            <span style="font-size: 8.6pt; color: #0f172a; font-weight: 600;">+44 (0)1329 288339</span>
          </div>
        </div>
      </div>

      <!-- Peace Village Base Camp Protocol Box -->
      <div style="max-width: 540px; margin: 0 auto; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 9px 15px; text-align: left;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🏡 Peace Village Base Camp Protocol (Mesen)
        </div>
        <div style="font-size: 8.1pt; color: #1e293b; line-height: 1.42;">
          Nightly academic debriefs held in Seminar Room A (19:15–20:30). Staff room allocations, emergency first-aid post, and evening student curfew (22:00) managed on-site by Dr Kirkup &amp; Mrs Lushey.
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
          <div class="lead">13 Historic Stops</div>
        </div>
      </div>

      <div class="photo-card" style="margin-bottom: 8px; padding: 6px;">
        <img src="${salientMap}" alt="Map of Ypres Salient" style="height: 132px; object-fit: contain; background: #ffffff;">
        <div class="caption">Strategic Overview of the Ypres Salient (1914–1918): Showing frontlines, allied arcs, canal defenses, and major battle sites.</div>
      </div>

      <div style="margin-bottom: 8px;">
        <h3 style="font-size: 10pt; color: #1e3a8a; margin-bottom: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Tour Leader Operational Schedule</h3>
        <table class="companion-table" style="font-size: 7.6pt;">
          <thead>
            <tr>
              <th style="width: 17%; padding: 4px 7px;">Day / Time</th>
              <th style="width: 32%; padding: 4px 7px;">Location &amp; Activity</th>
              <th style="padding: 4px 7px;">Teacher Pacing &amp; Key Directives</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 1 · 06:15</strong></td>
              <td style="padding: 2.2px 7px;">Depart Meoncross School · Folkestone Le Shuttle</td>
              <td style="padding: 2.2px 7px;">Jet Connect coach departs; collect passports; 11:20 Eurotunnel; arrival in France/Belgium.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 1 · 14:30</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 1:</strong> Essex Farm ADS &amp; Canal Bank</td>
              <td style="padding: 2.2px 7px;">Gather group at Bunker 4; read McCrae; guide pupils to Valentine Strudwick headstone (Plot I.U.8).</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 1 · 15:15</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 2:</strong> Langemarck German Cemetery</td>
              <td style="padding: 2.2px 7px;">Transition talk on German bereavement; gather at Kameradengrab; prompt Sorley poem reading.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 1 · 16:00</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 3:</strong> Hooge Crater Museum &amp; Trenches</td>
              <td style="padding: 2.2px 7px;">Mine crater warfare; crater rim observation; front line trench walk; inspect museum collection.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 1 · 17:45</strong></td>
              <td style="padding: 2.2px 7px;">Arrive Peace Village Hostel, Mesen</td>
              <td style="padding: 2.2px 7px;">Safety briefing; 18:15 dinner &amp; keys; 19:15 classroom debrief (workbook &amp; 8-mark question).</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 09:15</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 4:</strong> Vancouver Corner (Brooding Soldier)</td>
              <td style="padding: 2.2px 7px;">Canadian stand; gas warfare overview; terrain vantage looking east towards Gravenstafel.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 09:45</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 5:</strong> Sanctuary Wood (Hill 62) Trenches</td>
              <td style="padding: 2.2px 7px;">Original preserved British frontlines; mud terrain inspection (alternative footwear recommended).</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 11:30</strong></td>
              <td style="padding: 2.2px 7px;">Lunch &amp; Snack Shopping (Aldi, Ypres)</td>
              <td style="padding: 2.2px 7px;">Supervised supermarket stop in Ypres; pupils manage budget to buy fresh picnic supplies.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 13:00</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 6:</strong> Tyne Cot British War Cemetery</td>
              <td style="padding: 2.2px 7px;">Baker/Blomfield pillbox assembly; Binyon reading; direct pupils to Hampshire names on rear wall.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 14:15</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 7:</strong> Lijssenthoek Military Cemetery</td>
              <td style="padding: 2.2px 7px;">Casualty clearing station evacuation chain; timeline wall; headstone of Staff Nurse Nellie Spindler.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 15:45</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 8:</strong> Passchendaele Museum (Zonnebeke)</td>
              <td style="padding: 2.2px 7px;">Underground dugout immersion (20ft subterranean bunks &amp; dressing station); Chateau park trenches.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 2 · 19:20</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 9:</strong> The Menin Gate Last Post Ceremony</td>
              <td style="padding: 2.2px 7px;">Arrive early for prime position; brief two Meoncross wreath bearers; Frank Rogers on Panel 35.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 09:15</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 10:</strong> Menin Gate Daylight &amp; Ramparts Walk</td>
              <td style="padding: 2.2px 7px;">Daylight panel study without crowds; Ramparts Cemetery walk; read Sassoon's anti-monument poem.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 10:30</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 11:</strong> De Groote’s Chocolatier (Grote Markt)</td>
              <td style="padding: 2.2px 7px;">Supervised confectionery visit; €30–€40 cash envelopes; discuss Ypres stone-by-stone rebirth.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 11:20</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 12:</strong> Talbot House (Toc H), Poperinge</td>
              <td style="padding: 2.2px 7px;">Tea in soldiers' club; upper room hop-loft chapel; Tubby Clayton's radical egalitarian refuge.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 12:45</strong></td>
              <td style="padding: 2.2px 7px;">Supervised Lunch in Poperinge</td>
              <td style="padding: 2.2px 7px;">Lunch stop in Poperinge town centre before afternoon heritage visits.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 13:30</strong></td>
              <td style="padding: 2.2px 7px;"><strong>Stop 13:</strong> Poperinge Town Hall Death Cells</td>
              <td style="padding: 2.2px 7px;">Physical visit to cramped cells &amp; execution post; military justice &amp; 2006 statutory pardon.</td>
            </tr>
            <tr>
              <td style="padding: 2.2px 7px;"><strong>Day 3 · 14:30</strong></td>
              <td style="padding: 2.2px 7px;">Depart Poperinge · Calais Eurotunnel · Return</td>
              <td style="padding: 2.2px 7px;">Coach departs 14:30 to Calais; 17:50 Le Shuttle crossing; arrival at school approx. 20:00.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid-2col" style="gap: 8px; margin-bottom: 8px;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">📋 Staff Supervisory Protocol</div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
            • Strict headcounts at every coach departure &amp; cemetery gate.<br>
            • Dr Kirkup and Mrs Lushey manage the rear sweep.<br>
            • Designated pupil assembly point is the coach bay.<br>
            • Pupils must remain in assigned buddy pairs at all times.
          </div>
        </div>
        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 9px 12px;">
          <div style="font-size: 8.3pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
            📝 Daily Academic Rhythm &amp; Fieldwork
          </div>
          <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.4;">
            • Pupils complete Field Companion tasks at each site.<br>
            • Evening classroom debrief at Peace Village (19:15–20:30).<br>
            • Staff conduct D.I.R.T. marking on the 8-mark enquiry question.<br>
            • Flashcard peer recall conducted on the coach journeys.
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 8px 12px;">
        <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          🚍 Coach Pacing, Parking Directives &amp; Driver Hours
        </div>
        <div style="font-size: 7.7pt; color: #475569; line-height: 1.38;">
          Our Jet Connect coach driver operates under strict EU tachograph driving hours. Please ensure prompt group boarding 10 minutes prior to scheduled departure times. Designated parking at Ypres is at the Lille Gate coach bays; Poperinge drop-off is near the Grote Markt.
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

      <div class="talking-points-box" style="margin-bottom: 11px; padding: 11px 15px;">
        <div class="box-header">🎤 Tour Leader Talking Points: The Lowry Family of Lee-on-the-Solent</div>
        <div style="font-size: 8.5pt; color: #334155; line-height: 1.48;">
          <strong>Local Connection:</strong> William and Annie Lowry of Manor Way Grange, Lee-on-the-Solent, sent all three of their sons to Stubbington House School. All three boys answered the call in 1914, held officer commissions, and all three were killed in action across three different theatres: Gallipoli (William), the Somme (Cyril), and Arras (Eric).<br>
          <strong>Pedagogical Goal:</strong> Connect grand tactical movements to individual boys from our local parish paths. Emphasise that William and Cyril have no known graves, while Eric lies at La Targette near Arras. In grief, William Lowry funded and built the Lowry Memorial Hall in Lee-on-the-Solent to preserve his sons' memory in their home community.
        </div>
      </div>

      <div class="grid-3col" style="margin-bottom: 11px; align-items: stretch;">
        <!-- William -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryWilliam}" alt="Lieut. William Lowry" style="width: 110px; height: 154px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lieut. William Lowry</h4>
            <div style="font-size: 7.7pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">8th Gurkha Rifles (Indian Army)</div>
            <p style="font-size: 8pt; color: #475569; line-height: 1.42; margin: 0;">
              Eldest brother (aged 25); Cambridge graduate. Killed 4 June 1915 leading a frontal charge up Gully Ravine, Gallipoli, under severe Turkish machine-gun enfilade.<br><br>
              Body never recovered from the ravine scrub. Commemorated on Helles Memorial, Turkey.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 6px; border-radius: 4px; font-size: 7.6pt; color: #1e293b; font-weight: 700; margin-top: 8px; text-align: center;">
            📍 Helles Memorial, Gallipoli
          </div>
        </div>

        <!-- Cyril -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryCyril}" alt="Capt. Cyril Lowry" style="width: 110px; height: 154px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Capt. Cyril Lowry</h4>
            <div style="font-size: 7.7pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">2nd Bn, West Yorkshire Regt</div>
            <p style="font-size: 8pt; color: #475569; line-height: 1.42; margin: 0;">
              Youngest brother (aged 20). Served directly under older brother Eric. Killed 25 March 1918 defending Somme crossing at Eterpigny during the German Spring Offensive.<br><br>
              Shot down in full view of Eric; body lost in retreat. Commemorated on Pozières Memorial.
            </p>
          </div>
          <div style="background: #fef3c7; padding: 6px; border-radius: 4px; font-size: 7.6pt; color: #92400e; font-weight: 700; margin-top: 8px; text-align: center;">
            📍 Pozières Memorial, Somme
          </div>
        </div>

        <!-- Eric -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryEric}" alt="Lt Col Eric Lowry" style="width: 110px; height: 154px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lt. Col. Eric Lowry</h4>
            <div style="font-size: 7.7pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">2nd Bn, West Yorkshires (DSO, MC)</div>
            <p style="font-size: 8pt; color: #475569; line-height: 1.42; margin: 0;">
              Middle brother (aged 25). Decorated war leader (DSO, MC &amp; Bar, French Croix de Guerre). Commanded battalion at Westhoek Ridge and Somme.<br><br>
              Killed 23 September 1918 near Arleux by machine gun inspecting outposts, dying in his runner's arms just 7 weeks before the Armistice.
            </p>
          </div>
          <div style="background: #fee2e2; padding: 6px; border-radius: 4px; font-size: 7.6pt; color: #991b1b; font-weight: 700; margin-top: 8px; text-align: center;">
            📍 La Targette British Cemetery (Plot I. C. 2)
          </div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 12px 16px; margin-bottom: 11px;">
        <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          🏛️ Local Parish Connection: The Lowry Memorial Hall &amp; Crofton Tablet
        </div>
        <div style="font-size: 8.3pt; color: #1e293b; line-height: 1.46;">
          Devastated by the loss of all three sons, their father William Lowry funded and built the <strong>Lowry Memorial Hall</strong> in Lee-on-the-Solent in 1920 so his boys would never be forgotten. On the marble tablet inside Holy Rood Church, the three brothers' names are inscribed together in Column 2 under the Army roll. Point out to pupils how their physical graves span thousands of miles—from Turkey to the Somme and Arras—yet our parish memorials reunite them forever in our home community.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-bottom: 11px;">
        <h4 style="font-size: 9pt; color: #1e3a8a; margin-bottom: 4px;">🎯 Staff Action Points at Tyne Cot &amp; In The Field</h4>
        <div style="font-size: 8.2pt; color: #334155; line-height: 1.45;">
          1. Lead pupils along the central avenue directly to the Cross of Sacrifice built atop the captured German pillbox.<br>
          2. Guide students along the rear memorial wall to locate our parish fallen (such as L/Cpl Arthur Newman, Royal Engineers).<br>
          3. Emphasise how the tragedy of the three Lowry brothers mirrors the universal bereavement that affected families across every street in Britain.<br>
          4. Cross-reference the Stubbington war memorial north beam where their three names appear together before our village square pump.
        </div>
      </div>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 7px; padding: 11px 16px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 2px;">
          💡 Pedagogical Debrief &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #451a03; line-height: 1.45;">
          <strong>Hinge Question for Pupils:</strong> <em>"How does the loss of three sons from a single local household in Lee-on-the-Solent challenge or reinforce the historical concept of a 'Lost Generation'?"</em><br>
          <strong>Workbook Alignment:</strong> Ensure pupils record their comparative notes in Section 1 of their Pupil Field Companion before boarding the coach for the afternoon sites.
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

      <div class="grid-2col" style="margin-bottom: 11px; align-items: stretch;">
        <div>
          <h3 style="font-size: 10.8pt; color: #1e3a8a; margin-bottom: 5px;">The Holy Rood Memorial Roll</h3>
          <table class="companion-table">
            <thead>
              <tr>
                <th style="padding: 7px 8px;">Soldier</th>
                <th style="padding: 7px 8px;">Regiment / Unit</th>
                <th style="padding: 7px 8px;">Salient Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 7px 8px;"><strong>Pte. Walter Spratt</strong></td>
                <td style="padding: 7px 8px;">1st Bn, Hampshire Regt</td>
                <td style="padding: 7px 8px;">Ploegsteert (Missing)</td>
              </tr>
              <tr>
                <td style="padding: 7px 8px;"><strong>Sgt. Frank Rogers</strong></td>
                <td style="padding: 7px 8px;">2nd Bn, Hampshire Regt</td>
                <td style="padding: 7px 8px;">Menin Gate (Panel 35)</td>
              </tr>
              <tr>
                <td style="padding: 7px 8px;"><strong>L/Cpl. Arthur Newman</strong></td>
                <td style="padding: 7px 8px;">Royal Engineers (Signals)</td>
                <td style="padding: 7px 8px;">Tyne Cot Memorial</td>
              </tr>
              <tr>
                <td style="padding: 7px 8px;"><strong>Pte. George Stares</strong></td>
                <td style="padding: 7px 8px;">8th Bn, Hampshire Regt</td>
                <td style="padding: 7px 8px;">Bedford House Cemetery</td>
              </tr>
              <tr>
                <td style="padding: 7px 8px;"><strong>Dvr. Edward Vear</strong></td>
                <td style="padding: 7px 8px;">Royal Field Artillery</td>
                <td style="padding: 7px 8px;">Brandhoek Military Cemetery</td>
              </tr>
              <tr>
                <td style="padding: 7px 8px;"><strong>Cpl. Harry Freemantle</strong></td>
                <td style="padding: 7px 8px;">Royal Marine Artillery</td>
                <td style="padding: 7px 8px;">Dunkirk / Ypres Coast</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="photo-card" style="margin-bottom: 6px;">
            <img src="${tabletImg}" alt="Holy Rood Church Tablet" style="height: 195px; object-fit: cover;">
            <div class="caption">The Memorial Tablet inside Holy Rood Church, Stubbington.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 8pt; color: #475569; line-height: 1.42;">
            <strong>Staff Directive:</strong> Distribute local fallen cards to student pairs during coach journey from Boezinge. Each pair will locate their assigned soldier's panel on site.
          </div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px; padding: 11px 15px;">
        <div class="box-header">🎤 Tour Leader Talking Points: Boy Soldier Valentine Strudwick</div>
        <div style="font-size: 8.4pt; color: #334155; line-height: 1.46;">
          <strong>Location:</strong> Essex Farm Cemetery, Plot I. U. 8 (facing canal bank).<br>
          <strong>The Story:</strong> Enlisted at 14 claiming he was 19; sent to the Western Front with the 8th Rifle Brigade; killed in action by heavy shellfire on 14 January 1916 aged 15 years and 11 months.<br>
          <strong>Teaching Cue:</strong> Ask students to stand around the grave. Compare Valentine's age to their own year group. Note the continuous flow of poppy tributes laid by visiting schools from across Britain.
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 7px; padding: 11px 16px; margin-bottom: 10px;">
        <div style="font-size: 8.8pt; font-weight: 800; color: #991b1b; margin-bottom: 3px;">
          Mother's Epitaph: "Not Gone From Memory, Not Gone From Love, But Gone To Our Father's Home Above."
        </div>
        <p style="font-size: 8.2pt; color: #450a0a; margin: 0; line-height: 1.44;">
          Use this epitaph to discuss the profound human cost borne by working-class families who lost adolescent boys before they had ever reached adult life. Contrast this private maternal expression with state-sponsored patriotic slogans.
        </p>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          ❄️ The 8th Rifle Brigade on the Boezinge Canal Bank (Winter 1915–1916)
        </div>
        <div style="font-size: 8.1pt; color: #334155; line-height: 1.42;">
          Valentine served during one of the coldest winters of the war. Standing waist-deep in freezing canal slush, men suffered rampant trench foot and frostbite. On 14 January 1916, a direct hit from an 8-inch high-explosive shell obliterated his section's dugout. Fellow soldiers recovered his remains and buried him at Essex Farm by lantern light.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          💡 Underage Enlistment Enquiry &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.46;">
          <strong>Context:</strong> An estimated 250,000 underage British boys enlisted in 1914–1915 due to recruiting sergeant bounties, patriotic fever, and lack of birth certificates.<br>
          <strong>Hinge Question:</strong> <em>"Why did authorities tolerate underage recruitment, and how does standing at Valentine's grave alter our understanding of the volunteer armies of 1914–1915?"</em>
        </div>
      </div>

      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 7px; padding: 10px 14px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 2px;">
          📍 Teacher Field Protocol: Memorial Roll Student Allocation
        </div>
        <div style="font-size: 8pt; color: #14532d; line-height: 1.42;">
          Ensure each student pair checks the service numbers, units, and family details of their allocated soldier in their Pupil Field Guide before arriving at Essex Farm and Tyne Cot. Prompt them to locate their soldier's specific panel during personal reflection time.
        </div>
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
        <div class="photo-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 7px;">
          <img src="${headstoneImg}" alt="CWGC Headstone Anatomy" style="height: 275px; object-fit: contain; background: #ffffff;">
          <div class="caption">CWGC Portland Stone Headstone Dimensions: 81cm x 38cm x 7.5cm. Radical equality across ranks.</div>
        </div>

        <div class="talking-points-box" style="display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div class="box-header">🎤 Tour Leader Briefing: Headstone Anatomy</div>
            <div style="font-size: 8.3pt; color: #334155; line-height: 1.48;">
              <strong>1. Badge:</strong> Regimental heraldry; absolute equality across officer and private.<br>
              <strong>2. Text:</strong> Service number, rank, name, honours, and regiment.<br>
              <strong>3. Cross / Emblem:</strong> Latin Cross, Star of David, or left blank per family wishes.<br>
              <strong>4. Age &amp; Date:</strong> Average age in the Salient was 24.<br>
              <strong>5. Personal Inscription:</strong> Family-paid line (max 66 characters; 3½d per letter). Highlight to pupils how diverse these are: religious, stoic, or heartbroken.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 5px; font-size: 7.8pt; color: #475569;">
            <strong>Unknowns:</strong> Kipling's phrase: <em>"A Soldier of the Great War — Known Unto God."</em> Over 8,300 lie at Tyne Cot alone.
          </div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px; padding: 11px 15px;">
        <div class="box-header">🎤 Tour Leader Script: Topography of the Salient</div>
        <div style="font-size: 8.4pt; color: #334155; line-height: 1.48;">
          <strong>The Ridge:</strong> Stand with students looking east from Ypres. The land rises barely 45 metres towards Passchendaele, but in flat Flanders, that low ridge commanded complete artillery domination.<br>
          <strong>Converging Arcs:</strong> German batteries positioned along the arc could shell British rear areas from three directions. Reinforcements had to march into the bulge under continuous observation.<br>
          <strong>The Flemish Mud:</strong> The soil consists of heavy, impermeable clay over sand. Constant shelling destroyed drainage canals, turning the battlefield into a quagmire where thousands drowned.
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 11px 14px;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
            🏛️ Sir Fabian Ware &amp; The CWGC Principles
          </div>
          <div style="font-size: 8.1pt; color: #1e293b; line-height: 1.45;">
            Founded 1917: <strong>Equality in death</strong> (uniform Portland stone for privates and lords); <strong>permanence</strong> in foreign soil; <strong>no repatriation</strong>. Over 1.7 million commemorated worldwide.
          </div>
        </div>
        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 7px; padding: 11px 14px;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 3px;">
            ⚔️ Lutyens vs Blomfield Architecture
          </div>
          <div style="font-size: 8.1pt; color: #14532d; line-height: 1.45;">
            <strong>Stone of Memory:</strong> Lutyens' secular altar (<em>"Their Name Liveth For Evermore"</em>).<br>
            <strong>Cross of Sacrifice:</strong> Blomfield's Portland stone cross with embedded bronze broadsword.
          </div>
        </div>
      </div>

      <!-- Tour Leader Guide: Hampshire Inscriptions Typology -->
      <div style="background: #fefce8; border: 1.5px solid #fde047; border-left: 5px solid #ca8a04; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #854d0e; text-transform: uppercase; margin-bottom: 3px;">
          🏷️ Tour Leader Guide: Deciphering Hampshire Inscription Typologies
        </div>
        <div style="font-size: 8.1pt; color: #713f12; line-height: 1.45;">
          Prompt pupils to classify family epitaphs on Hampshire Regiment stones into four distinct typologies: (1) <strong>Christian Consolation</strong> (<em>"Thy Will Be Done"</em> / <em>"Sleeping in Peace"</em>); (2) <strong>Classical Duty</strong> (<em>"For King and Country"</em> / <em>"Dulce et Decorum Est"</em>); (3) <strong>Raw Maternal Grief</strong> (<em>"A Day of Memory Sad to Recall, Without Goodbye He Left Us All"</em>); and (4) <strong>Stoic Resignation</strong> (<em>"Duty Nobly Done"</em>).
        </div>
      </div>

      <!-- CWGC Architecture Hinge Question -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 10px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          💡 CWGC Commemorative Enquiry &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.44;">
          <strong>Hinge Question for Pupils:</strong> <em>"Why did the Imperial War Graves Commission strictly forbid wealthy families from erecting private marble crosses, yet permit them to choose and pay for a personal inscription?"</em>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 10px 15px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          🤝 Staff Management at Cemeteries &amp; Decorum Standards
        </div>
        <div style="font-size: 8pt; color: #475569; line-height: 1.42;">
          Remind students that these are active cemeteries visited by grieving relatives and international pilgrims. Walk strictly on grass pathways; no running, shouting, or leaning against headstones. Ensure students conduct pencil rubbings gently with non-abrasive paper.
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

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 1 Tour Script: Essex Farm ADS</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.45;">
            <strong>Where We Stand:</strong> Concrete bunkers built into the Yser canal embankment. An Advanced Dressing Station where Canadian surgeons triaged thousands during Second Ypres.<br>
            <strong>Alexis Helmer:</strong> On 2 May 1915, McCrae's 22-year-old friend was blown to pieces by an 8-inch shell. McCrae performed the burial by lantern light; next morning he sat on the ambulance step and composed <em>In Flanders Fields</em>.<br>
            <strong>Evacuation Chain:</strong> Regimental Aid Post (RAP) ➔ Advanced Dressing Station (ADS) ➔ Casualty Clearing Station (CCS) ➔ Base Hospital.
          </div>
        </div>

        <div class="photo-card">
          <img src="${essexFarm}" alt="Essex Farm Bunkers" style="height: 165px;">
          <div class="caption">Concrete dressing station bunkers dug into the canal embankment.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 2 Tour Script: Yorkshire Trench</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.45;">
            <strong>Discovery:</strong> Unearthed in 1992 by amateur archaeologists ("The Diggers") in a modern industrial zone.<br>
            <strong>What to Notice:</strong> The wooden A-frames, fire-bays, deep dugout entrance (holding 200 men), and the high water table requiring constant pump drainage.<br>
            <strong>Tactical Reality:</strong> Trenches here were defensive sandbag breastworks because digging deep struck immediate groundwater.
          </div>
        </div>

        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">In Flanders Fields</div>
              <div class="poet-meta">Lt. Col. John McCrae (1872–1918) · Canadian AMC · 3 May 1915</div>
            </div>
            <img src="${mccraeImg}" alt="John McCrae" style="width: 38px; height: 48px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.8pt; line-height: 1.46;">
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
      </div>

      <!-- Poppy Symbolism & Botanical Context -->
      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 2px;">
          🌿 McCrae's Botanical Observation &amp; Poppy Symbolism
        </div>
        <div style="font-size: 8.2pt; color: #14532d; line-height: 1.45;">
          Explain to pupils why the common field poppy (<em>Papaver rhoeas</em>) flourished across the torn fields of Flanders: its seeds lie dormant for decades and only germinate when heavy artillery bombardment churns the lime-rich chalk and clay soil. McCrae observed them blooming amidst fresh graves within days of intense shellfire, transforming a weed into an enduring global symbol.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🎯 Teacher Field Directives at Essex Farm
        </div>
        <div style="font-size: 8.2pt; color: #334155; line-height: 1.44;">
          Prompt a designated student to read all three stanzas of <em>In Flanders Fields</em> standing directly outside Bunker 4. Then lead the group into the cemetery to observe Valentine Strudwick's headstone (Plot I. U. 8). Have pupils examine how close the frontline medical triage was to active artillery fire.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 11px 15px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          💡 Medical Evacuation Enquiry &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.44;">
          <strong>Hinge Question:</strong> <em>"Why was rapid evacuation to an Advanced Dressing Station the critical factor in preventing gas gangrene and hypovolemic shock on the Western Front?"</em><br>
          <strong>Pupil Companion Link:</strong> Ensure pupils complete the medical chain diagram on Page 6 of their Field Guide.
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

      <div class="talking-points-box" style="margin-bottom: 10px; padding: 11px 15px;">
        <div class="box-header">🎤 Stop 3 Tour Script: Langemarck &amp; The Student Myth</div>
        <div style="font-size: 8.3pt; color: #334155; line-height: 1.46;">
          <strong>The Myth of Langemarck:</strong> In November 1914, German army communiqués claimed young, enthusiastic student regiments charged into British lines singing <em>"Deutschland über alles"</em>. In historical reality, poorly trained schoolboys were cut to ribbons by regular British riflemen delivering rapid "mad minute" volleys.<br>
          <strong>Kameradengrab (Comrades' Grave):</strong> 24,917 soldiers buried in a single mass grave behind the oak gatehouse.<br>
          <strong>Contrast with CWGC:</strong> Dark basalt stone, low flat markers, somber oak canopy—capturing collective sorrow, national mourning, and defeat compared to British radiant Portland stone.
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">When You See Millions of the Mouthless Dead</div>
              <div class="poet-meta">Charles Sorley (1895–1915) · Capt., 7th Suffolks · Found in kitbag</div>
            </div>
            <img src="${sorleyImg}" alt="Charles Sorley" style="width: 38px; height: 48px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.6pt; line-height: 1.45;">
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

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 9.2pt; color: #0f172a; margin-bottom: 4px;">Pedagogical Cue: Emil Krieger Statues</h4>
            <p style="font-size: 8.2pt; color: #475569; line-height: 1.44; margin: 0 0 6px 0;">
              Gather students at the rear boundary facing Emil Krieger’s four mourning bronze figures. Note how they huddle together in grief, heads bowed, devoid of martial glory or triumphalism.
            </p>
            <p style="font-size: 8.2pt; color: #475569; line-height: 1.44; margin: 0;">
              Point out the oak trees planted throughout—sacred symbols in German folklore representing national memory, strength, and silent endurance.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 7px 10px; border-radius: 4px; font-size: 7.7pt; color: #1e293b; font-weight: 700;">
            Key Comparison: Collective Burial vs Individual Commemoration
          </div>
        </div>
      </div>

      <!-- Historical Analysis of the Student Myth -->
      <div style="background: #fefce8; border: 1.5px solid #fde047; border-left: 5px solid #ca8a04; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #854d0e; text-transform: uppercase; margin-bottom: 3px;">
          🥀 The Myth of Langemarck: Propaganda vs Military Reality
        </div>
        <div style="font-size: 8.2pt; color: #713f12; line-height: 1.45;">
          German wartime propaganda mythologized the slaughter of 10,000 university and secondary students as an act of willing heroic patriotism. In post-war Germany, this narrative was seized upon by nationalists to argue that the youth had been betrayed by home-front defeatists ('stab-in-the-back' myth). Contrast this state myth with the bleak, unadorned grief expressed in Krieger's statues.
        </div>
      </div>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 3px;">
          💡 Comparative Cemetery Analysis &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #451a03; line-height: 1.45;">
          <strong>Hinge Question:</strong> <em>"How does the deliberate gloom, dark granite, and mass grave architecture of Langemarck produce a fundamentally different emotional impact than the open lawns and white Portland stone of CWGC sites?"</em><br>
          <strong>Staff Observation:</strong> Ask pupils to contrast the individual CWGC headstones at Essex Farm with the flat basalt slabs at Langemarck, each inscribed with up to 20 names.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 10px 15px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🚍 Logistical Transfer to Peace Village Hostel (Mesen)
        </div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
          Depart Langemarck at 17:15. Coach journey south across the Salient to Peace Village Hostel in Mesen takes approx. 35 mins. On arrival: room keys, baggage drop, 18:15 evening meal, followed by 19:15 evening debrief session.
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

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 4 Tour Script: Vancouver Corner</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.44;">
            <strong>22 April 1915:</strong> The first lethal use of poison gas in history. 168 tons of chlorine released by German forces against French Algerian troops.<br>
            <strong>The Canadian Stand:</strong> Canadian troops held the 4-mile gap by urinating on handkerchiefs to neutralise chlorine. Commemorated by Chapman Clemesha's 33ft <em>Brooding Soldier</em> monument.<br>
            <strong>Tactical Terrain:</strong> Direct students' gaze towards Gravenstafel ridge to demonstrate how gas flowed downhill along natural folds in the ground.
          </div>
        </div>

        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 5 Tour Script: Hooge Crater</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.44;">
            <strong>Underground War:</strong> Tunnelling companies dug deep into blue Flemish clay to detonate ammonal charges beneath German trenches.<br>
            <strong>The Hooge Crater:</strong> Detonated on 19 July 1915 (1,700lb ammonal), creating a 120ft wide crater. First German flamethrower attack occurred here 11 days later against the 8th Rifle Brigade.<br>
            <strong>Museum Collection:</strong> Superb collection of trench weapons, body armour, and periscopes.
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">Break of Day in the Trenches</div>
              <div class="poet-meta">Isaac Rosenberg (1890–1918) · Private, King's Own</div>
            </div>
            <img src="${rosenbergImg}" alt="Isaac Rosenberg" style="width: 38px; height: 48px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.6pt; line-height: 1.45;">
The darkness crumbles away.
It is the same old druid Time as ever,
Only a live thing leaps on my hand,
A queer, sardonic rat,
As I pull the parapet’s poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies.
Now you have touched this English hand
You will do the same to a German
Soon, no doubt, if it be your pleasure
To cross the sleeping green between.
What do you see in our eyes
At the shrieking iron and flame
Hurled through still heavens?
          </div>
        </div>

        <div class="photo-card">
          <img src="${hoogeCrater}" alt="Hooge Crater" style="height: 185px;">
          <div class="caption">Hooge Crater site: Preserved mine craters and trench warfare lines.</div>
        </div>
      </div>

      <!-- Flamethrower & Tactical Evolution -->
      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 2px;">
          🔥 Stop 5 Museum Focus: The 8th Rifle Brigade Flamethrower Attack (30 July 1915)
        </div>
        <div style="font-size: 8.2pt; color: #451a03; line-height: 1.45;">
          Guide pupils through the museum's preserved flamethrower artifacts. On 30 July 1915, German forces unleashed portable <em>Flammenwerfer</em> jetting burning oil 30 yards into British trenches here, catching the 8th Rifle Brigade completely unprepared. Explain how defensive psychology changed when fire and chemical agents were introduced as frontline weapons.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          💡 Technology &amp; Warfare Enquiry · Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.45;">
          <strong>Hinge Question:</strong> <em>"How did the simultaneous introduction of industrial weapons—chlorine gas, flamethrowers, and deep subterranean mines—completely shatter pre-war conceptions of heroic soldiering?"</em><br>
          <strong>Field Directives:</strong> Have pupils walk the restored trench line behind Hooge Crater Museum and inspect the lip of the mine crater.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 10px 15px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🥪 Supervised Field Lunch &amp; Boarding Directives
        </div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
          Eat packed picnic lunches at Hooge Crater Museum picnic area. Restroom break and museum shop visit. Prompt boarding at 12:45 for transfer to Tyne Cot Commonwealth Cemetery.
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

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 6 Tour Script: The Scale of Tyne Cot</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.45;">
            <strong>The Scale:</strong> Largest Commonwealth war cemetery in the world. 11,961 burials, of which 8,369 are unidentified ('Known Unto God').<br>
            <strong>Herbert Baker's Architecture:</strong> Baker preserved three German concrete machine-gun pillboxes inside the cemetery. He deliberately mounted Sir Reginald Blomfield's Great Cross of Sacrifice directly atop the central bunker, leaving an observation slit open to reveal the concrete beneath.<br>
            <strong>The Memorial Wall:</strong> Semicircular stone wall listing 34,984 soldiers missing in action after 16 August 1917.
          </div>
        </div>

        <div class="photo-card">
          <img src="${tyneCot}" alt="Tyne Cot" style="height: 180px;">
          <div class="caption">Cross of Sacrifice standing atop captured German pillbox.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">For the Fallen</div>
              <div class="poet-meta">Laurence Binyon (1869–1943) · British Museum · 1914</div>
            </div>
            <img src="${binyonImg}" alt="Laurence Binyon" style="width: 38px; height: 48px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.6pt; line-height: 1.46;">
With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea...
They went with songs to the battle, they were young,
Straight of limb, true of eye, steady and aglow.
They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.
They mingle not with their laughing comrades again;
They sit no more at familiar tables of home;
They have no lot in our labour of the day-time;
They sleep beyond England's foam.
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 9.2pt; color: #0f172a; margin-bottom: 4px;">Staff Coordination: Parish Fallen</h4>
            <p style="font-size: 8.2pt; color: #475569; line-height: 1.44; margin: 0 0 6px 0;">
              Following the recitation of Binyon's <em>For the Fallen</em> at the Cross of Sacrifice, lead pupils along the rear Memorial Wall to locate our parish fallen (including L/Cpl Arthur Newman, Royal Engineers). Lay the Meoncross remembrance cross.
            </p>
          </div>
          <div style="background: #fef3c7; padding: 7px 10px; border-radius: 4px; font-size: 7.7pt; color: #92400e; font-weight: 700;">
            Allow 25 mins personal reflective walk across the rows.
          </div>
        </div>
      </div>

      <!-- Siting the Cross of Sacrifice Box -->
      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 2px;">
          🎖️ Siting the Cross of Sacrifice atop the German Bunker
        </div>
        <div style="font-size: 8.2pt; color: #14532d; line-height: 1.45;">
          King George V visited Tyne Cot during construction in 1922 and suggested preserving the central German bunker. Sir Herbert Baker enclosed it within the base of Blomfield's Great Cross of Sacrifice, leaving an observation slit visible at ground level. Emphasise to pupils how British architects literally erected Christian sacrifice atop the concrete machinery of war.
        </div>
      </div>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 3px;">
          💡 Passchendaele Tactical Enquiry &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #451a03; line-height: 1.45;">
          <strong>Hinge Question:</strong> <em>"Why did Field Marshal Haig persist with the Passchendaele offensive for three months when rain and artillery fire had reduced the low ridge to an impassable swamp?"</em><br>
          <strong>Teacher Guidance:</strong> Prompt pupils to look back down the slope towards Ypres to appreciate the commanding view German machine-gunners possessed over every approach.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 10px 15px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🚍 Next Stops: Lijssenthoek &amp; Passchendaele Museum
        </div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
          Board coach at 14:00 sharp. Drive to Lijssenthoek Military Cemetery (Stop 7) to study the Casualty Clearing Station evacuation chain and Nurse Nellie Spindler, followed by Passchendaele 1917 Museum (Stop 8).
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
          <div class="school-sub">Stop 9 · The Menin Gate (Menenpoort) · Official Wreath-Laying</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Last Post</div>
          <div class="lead">20:00 Daily Since 1928</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div class="talking-points-box" style="margin-bottom: 0;">
          <div class="box-header">🎤 Stop 9 Tour Script: The Menin Gate</div>
          <div style="font-size: 8.2pt; color: #334155; line-height: 1.45;">
            <strong>54,395 Names:</strong> Inscribed with Commonwealth soldiers missing in the Salient prior to 16 August 1917. Designed by Sir Reginald Blomfield as a classical triumphal arch.<br>
            <strong>The Last Post Ceremony:</strong> Sounded every night at 20:00 by volunteer fire brigade buglers without fail since 1928 (suspended only during WWII occupation).<br>
            <strong>Frank Rogers:</strong> Guide students to Panel 35 to locate Sgt. Frank Rogers of the Hampshire Regiment.
          </div>
        </div>

        <div class="photo-card">
          <img src="${meninGate}" alt="Menin Gate" style="height: 180px;">
          <div class="caption">The Menin Gate Memorial: Inaugurated July 1927.</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div class="reading-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title">On Passing the New Menin Gate</div>
              <div class="poet-meta">Siegfried Sassoon (1886–1967) · Capt., Royal Welch Fusiliers</div>
            </div>
            <img src="${sassoonImg}" alt="Siegfried Sassoon" style="width: 38px; height: 48px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 8.6pt; line-height: 1.45;">
Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,—
Those doomed, conscripted, unvictorious ones?
Crudely renewed, the Salient holds its dead,
And magnificent, the arch of triumph stands;
Sure are the streets, untorn by shot and shell;
Here was the world’s worst wound. And here with pride
Their names are graven whom the world forgot,
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.
          </div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="font-size: 9.2pt; color: #0f172a; margin-bottom: 4px;">Staff Wreath-Laying Protocol</h4>
            <p style="font-size: 8.2pt; color: #475569; line-height: 1.44; margin: 0 0 5px 0;">
              19:20: Secure prime standing position on northern walkway under the arch.<br>
              19:45: Designated Meoncross pupil wreath bearers escorted by Mr Lovett to ceremonial marshalling area.<br>
              20:00: Buglers sound Last Post; two-minute silence; official wreath laying.
            </p>
          </div>
          <div style="background: #eff6ff; padding: 7px 10px; border-radius: 4px; font-size: 7.6pt; color: #1e3a8a; font-weight: 700;">
            Staff Lead: Mr Ben Lovett &amp; Mr James Garrett
          </div>
        </div>
      </div>

      <!-- The Last Post Association Context Box -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🎺 The Last Post Association &amp; The Civic Buglers
        </div>
        <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.45;">
          Explain to pupils the extraordinary history of the ceremony: founded in 1928 by local Ypres police commissioner Pierre Vandenbraambussche to honour British soldiers who defended the town. Except for the period of German occupation from May 1940 to September 1944 (when it was sounded instead at Brookwood in England), the volunteer buglers of the Ypres Fire Brigade have sounded the call every night at 20:00 without fail.
        </div>
      </div>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 7px; padding: 11px 15px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 3px;">
          💡 Sassoon's Anti-Monument Critique &amp; Targeted Hinge Question
        </div>
        <div style="font-size: 8.2pt; color: #451a03; line-height: 1.45;">
          <strong>Hinge Question:</strong> <em>"Why was Siegfried Sassoon so repulsed by Blomfield's triumphal arch, calling it a 'sepulchre of crime', while grieving families found immense comfort in seeing their sons' names carved in stone?"</em><br>
          <strong>Teaching Tip:</strong> Have pupils read Sassoon's poem privately while standing under the cavernous vaulted archway before the ceremony begins.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 10px 15px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🌙 Evening Return to Peace Village &amp; Night Protocol
        </div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
          Depart Menin Gate at 20:45. Arrive hostel 21:15. Evening drinks, cookies, and reflective briefing. Curfew and phone collection in corridor at 22:00 sharp. Staff overnight watch roster active.
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
          <div class="school-sub">Stops 10, 11, 12 &amp; 13 · Ypres Cloth Hall, De Groote's, Talbot House &amp; Death Cells</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Rebirth</div>
          <div class="lead">Poperinge &amp; Ypres</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <!-- Stop 10: Cloth Hall -->
        <div class="photo-card">
          <img src="${clothHallRuins}" alt="The Cloth Hall Ypres 1919" style="height: 135px; object-fit: cover;">
          <div class="caption">
            <strong>The Cloth Hall, Ypres (1919):</strong> Watercolour by Scottish war artist <strong>Emily Murray Paterson RSW (1855–1934)</strong>, painted on-site amidst the ruins after the Armistice (Imperial War Museum collection).
          </div>
        </div>

        <div class="talking-points-box" style="margin-bottom: 0; padding: 9px 13px;">
          <div class="box-header">🎤 Stop 10 Tour Script: The Rebirth of Ypres</div>
          <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
            <strong>Total Destruction:</strong> By 1918, Ypres was rubble; Winston Churchill wanted the ruins left untouched as a British national monument. Instead, Belgian citizens rebuilt stone-for-stone.<br>
            <strong>The Lakenhalle:</strong> Built in 1304; meticulously reconstructed over 40 years.<br>
            <strong>De Groote's Chocolatier:</strong> Supervised visit for pupils to experience modern Flemish civic life and chocolate heritage (€30–€40 cash envelopes).
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <!-- Stop 12: Talbot House -->
        <div class="photo-card">
          <img src="${talbotHouse}" alt="Talbot House Exterior Façade" style="height: 135px; object-fit: cover;">
          <div class="caption">
            <strong>Talbot House Façade, Poperinge:</strong> Opened in December 1915 by Rev. Philip 'Tubby' Clayton as an unranked sanctuary for all soldiers behind the lines.
          </div>
        </div>

        <div class="talking-points-box" style="margin-bottom: 0; padding: 9px 13px;">
          <div class="box-header">🎤 Stop 12 Tour Script: Talbot House (Toc H)</div>
          <div style="font-size: 8pt; color: #334155; line-height: 1.42;">
            <strong>The Haven Behind the Lines:</strong> Army Chaplain Tubby Clayton opened this house in Poperinge as an alternative to pubs and brothels.<br>
            <strong>"All rank abandon ye who enter here":</strong> Officers and privates drank tea from identical mugs, played the piano, and conversed as human equals.<br>
            <strong>The Upper Room:</strong> Climb the creaking stairs to the hop-loft chapel. A carpenter's bench served as the altar.
          </div>
        </div>
      </div>

      <div class="reading-box" style="margin-bottom: 8px; padding: 8px 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title" style="font-size: 10.4pt;">The Soldier</div>
            <div class="poet-meta" style="font-size: 7.5pt; margin-bottom: 3px;">Rupert Brooke (1887–1915) · Sub-Lieutenant, Royal Naval Division</div>
          </div>
          <img src="${brookeImg}" alt="Rupert Brooke" style="width: 36px; height: 46px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.3pt; line-height: 1.4;">
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

      <!-- Upper Room Chapel Box -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 9px 14px; margin-bottom: 8px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🕊️ Talbot House: The Upper Room Hop-Loft Chapel
        </div>
        <div style="font-size: 8.1pt; color: #1e293b; line-height: 1.42;">
          Take pupils in small groups up the steep attic staircase to the 'Upper Room'. Clayton converted the hops drying loft into a quiet haven of prayer, using an old carpenter's bench as the altar and candlelight. Men carved their names and regimental numbers into the wooden posts before returning to the trenches.
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 7px; padding: 9px 14px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 2px;">
          ⚖️ Stop 13 Briefing: Poperinge Town Hall Death Cells &amp; Shot at Dawn
        </div>
        <div style="font-size: 8.1pt; color: #450a0a; line-height: 1.42;">
          <strong>Context:</strong> Physical visit to the cramped brick holding cells and wooden execution post in the Town Hall courtyard.<br>
          <strong>Teaching Narrative:</strong> Discuss the harshness of military discipline, the medical misunderstanding of shell shock (neurasthenia), and the 2006 statutory pardon granted to 306 British and Commonwealth soldiers executed at dawn.<br>
          <strong>Hinge Question:</strong> <em>"How does the radical egalitarian compassion of Talbot House contrast with the cold military discipline of the Poperinge Death Cells just 200 yards away?"</em>
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

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div>
          <h4 style="font-size: 10pt; color: #1e3a8a; margin-bottom: 4px;">Trench &amp; Military Terminology</h4>
          <table class="companion-table">
            <tbody>
              <tr>
                <td style="width: 28%;"><strong>ADS</strong></td>
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
              <tr>
                <td><strong>Enfilade</strong></td>
                <td>Gunfire directed along the length of a trench line rather than frontally across no-man's-land.</td>
              </tr>
              <tr>
                <td><strong>Duckboards</strong></td>
                <td>Slatted timber walkways laid over trench floors to keep troops out of stagnant clay mud.</td>
              </tr>
              <tr>
                <td><strong>Traverse</strong></td>
                <td>U-shaped bends built into trenches every few yards to contain shell blasts and stop enfilade fire.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h4 style="font-size: 10pt; color: #b45309; margin-bottom: 4px;">CWGC &amp; Memorial Terminology</h4>
          <table class="companion-table">
            <tbody>
              <tr>
                <td style="width: 28%;"><strong>CWGC</strong></td>
                <td><strong>Commonwealth War Graves Commission:</strong> Founded 1917 by Fabian Ware to care for 1.7 million fallen.</td>
              </tr>
              <tr>
                <td><strong>Cross of Sacrifice</strong></td>
                <td>Designed by Sir Reginald Blomfield: Portland stone cross bearing an embedded bronze broadsword.</td>
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
              <tr>
                <td><strong>Special Memorial</strong></td>
                <td>Headstone carved with <em>"Believed to be buried in this cemetery"</em> where exact grave plot was lost.</td>
              </tr>
              <tr>
                <td><strong>Screen Wall</strong></td>
                <td>Memorial wall listing names of casualties whose individual headstones cannot be erected.</td>
              </tr>
              <tr>
                <td><strong>Memorial to Missing</strong></td>
                <td>Monuments dedicated to dead soldiers with no known grave (e.g., Menin Gate, Tyne Cot, Ploegsteert).</td>
              </tr>
              <tr>
                <td><strong>Orientation Table</strong></td>
                <td>Carved bronze or stone dial indicating bearings and distances to distant frontline objectives.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 10px; padding: 10px 14px;">
        <div class="box-header">Useful Flemish &amp; French Toponyms in the Salient</div>
        <div style="font-size: 8.3pt; color: #334155; line-height: 1.46;">
          <strong>Ieper:</strong> Flemish name for Ypres.<br>
          <strong>Poperinge:</strong> Town behind lines known affectionately to British troops as <em>"Pop"</em>.<br>
          <strong>Heuvelland:</strong> 'Hill Country' south of Ypres (home of our Peace Village Hostel base in Mesen).<br>
          <strong>Lakenhalle:</strong> The medieval Cloth Hall in the Grote Markt of Ypres.<br>
          <strong>Menenpoort:</strong> Flemish for the Menin Gate.
        </div>
      </div>

      <!-- Tour Leader Kit & Equipment Checklist -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 10px 14px; margin-bottom: 10px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🎒 Tour Leader Equipment Checklist &amp; On-Site Kit
        </div>
        <div style="font-size: 8.1pt; color: #1e293b; line-height: 1.44;">
          • <strong>School First Aid Kits:</strong> Carried by Mrs Lushey at all times (including travel sickness meds).<br>
          • <strong>Pupil Medication Roster:</strong> Asthma inhalers &amp; EpiPens inspected prior to coach boarding.<br>
          • <strong>Emergency Whistle &amp; Hi-Vis Vests:</strong> Worn by staff leads during urban transit in Ypres and Poperinge.<br>
          • <strong>Meoncross Poppy Wreaths:</strong> Safely stowed in coach forward locker for the Menin Gate ceremony.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 10px 14px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          🤝 Code of Conduct &amp; Expedition Standards
        </div>
        <div style="font-size: 8.1pt; color: #475569; line-height: 1.44;">
          1. <strong>Quiet Respect:</strong> Cemeteries are active places of mourning. Walk strictly on grass paths; do not sit on headstones or climb on memorial panels.<br>
          2. <strong>Mobile Phone Protocol:</strong> Phones may be used for photographs during the day. Collected each evening in dedicated staff bags at curfew.<br>
          3. <strong>Hostel Downtime:</strong> Quiet hours from 22:00 in Peace Village corridors. Respect international guests and staff sleep cycles.<br>
          4. <strong>The Mission:</strong> Always remember that we represent Meoncross School and our village parish of Holy Rood before the people of Belgium.
        </div>
      </div>

      <div style="background: #0f172a; color: #ffffff; padding: 9px 15px; border-radius: 7px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt;">
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
