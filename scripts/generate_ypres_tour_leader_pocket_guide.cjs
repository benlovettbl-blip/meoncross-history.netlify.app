const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_tour_leader_pocket_guide.pdf');

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
  const lowryWilliam = getBase64Image('images/lowry_william.png');
  const lowryCyril = getBase64Image('images/lowry_cyril.png');
  const lowryEric = getBase64Image('images/lowry_auriol.png');
  const salientMap = getBase64Image('images/ypres_salient_map_new.png');
  const essexFarm = getBase64Image('images/ypres_essex_farm.jpg');
  const headstoneImg = getBase64Image('images/cwgc_headstone_essex_farm.jpg');
  const broodingSoldier = getBase64Image('images/brooding_soldier_gas.jpg');
  const hoogeCrater = getBase64Image('images/hooge_crater.jpg');
  const tyneCot = getBase64Image('images/ypres_tyne_cot.jpg');
  const meninGate = getBase64Image('images/ypres_menin_gate.jpg');
  const clothHall = getBase64Image('images/ypres_cloth_hall.jpg');
  const talbotHouse = getBase64Image('images/talbot_house_relaxing.jpg');
  const passchendaeleDugout = getBase64Image('images/passchendaele_museum_dugout.jpg');
  const cheshireTrench = getBase64Image('images/cheshire_regiment_trench.png');

  // Poet Portraits
  const mccraeImg = getBase64Image('images/john_mccrae.jpg');
  const sorleyImg = getBase64Image('images/charles_sorley.jpg');
  const owenImg = getBase64Image('images/wilfred_owen.jpg');
  const rosenbergImg = getBase64Image('images/isaac_rosenberg.jpg');
  const binyonImg = getBase64Image('images/laurence_binyon.jpg');
  const sassoonImg = getBase64Image('images/siegfried_sassoon.jpg');
  const brookeImg = getBase64Image('images/rupert_brooke.jpg');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Tour Leader Pocket Field Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    @page {
      size: 148mm 210mm; /* A5 Portrait */
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
      font-size: 7.4pt;
      line-height: 1.34;
    }

    /* Discrete A5 Page Container for Saddle-Stitching */
    .page {
      width: 148mm;
      height: 210mm;
      padding: 6.5mm 8mm 5.5mm 8mm;
      position: relative;
      background: #ffffff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }

    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Running Header Bar */
    .header-bar {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 8.6pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
      line-height: 1.1;
    }

    .school-sub {
      font-size: 6.6pt;
      color: #475569;
      font-weight: 600;
      margin-top: 1px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 1.5px 5px;
      border-radius: 4px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 6.6pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 6pt;
      color: #334155;
      font-weight: 600;
    }

    /* Headings */
    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      margin: 0;
      color: #0f172a;
    }

    /* Core Pedagogical & Briefing Boxes */
    .pitch-box {
      background: #eff6ff;
      border: 1.2px solid #bfdbfe;
      border-left: 4px solid #1e3a8a;
      border-radius: 5px;
      padding: 4.5px 7px;
      margin-bottom: 4px;
    }

    .pitch-box .box-header {
      font-size: 7pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .pitch-box p {
      margin: 0;
      font-size: 7.1pt;
      color: #1e293b;
      line-height: 1.32;
    }

    .look-fors-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-left: 4px solid #059669;
      border-radius: 5px;
      padding: 3.5px 7px;
      margin-bottom: 4px;
    }

    .look-fors-box .box-header {
      font-size: 7pt;
      font-weight: 800;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1.5px;
    }

    .look-fors-list {
      margin: 0;
      padding-left: 11px;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.28;
    }

    .hinge-box {
      background: #fffbeb;
      border: 1.2px solid #fde68a;
      border-left: 4px solid #d97706;
      border-radius: 5px;
      padding: 3.5px 7px;
      margin-bottom: 4px;
    }

    .hinge-box .box-header {
      font-size: 6.8pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1px;
    }

    .hinge-box p {
      margin: 0;
      font-size: 6.8pt;
      color: #451a03;
      line-height: 1.28;
      font-style: italic;
    }

    /* Poetry Box */
    .poem-box {
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      border-left: 3.5px solid #78716c;
      border-radius: 5px;
      padding: 4px 7px;
      margin-bottom: 4px;
    }

    .poem-box .poem-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px dashed #d6d3d1;
      padding-bottom: 2px;
    }

    .poem-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 8pt;
      font-weight: 700;
      color: #292524;
    }

    .poem-box .poem-meta {
      font-size: 6pt;
      color: #78716c;
      font-weight: 700;
      text-transform: uppercase;
    }

    .poem-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 6.6pt;
      color: #292524;
      line-height: 1.26;
      white-space: pre-line;
    }

    /* Visual Media & Grid Utilities */
    .photo-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px;
      text-align: center;
    }

    .photo-card img {
      width: 100%;
      border-radius: 2px;
      object-fit: cover;
      display: block;
    }

    .photo-card .caption {
      font-size: 6.1pt;
      color: #475569;
      font-style: italic;
      margin-top: 2px;
      line-height: 1.2;
      text-align: left;
    }

    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }

    .grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
    }

    .compact-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.6pt;
    }

    .compact-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 2.5px 4.5px;
      font-size: 6.1pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .compact-table td {
      padding: 2px 4.5px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
      line-height: 1.22;
    }

    .compact-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Running Footer Bar */
    .footer-bar {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      font-size: 6.4pt;
      font-weight: 600;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .footer-bar .page-number {
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 1px 5px;
      border-radius: 3px;
      border: 1px solid #bfdbfe;
      font-size: 6.4pt;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER & MISSION ================= -->
  <div class="page">
    <div>
      <div style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.08em; display: block;">The History Portal</span>
          <span style="font-size: 6.4pt; color: #64748b; font-weight: 600;">Department of History · Ypres Salient Fieldwork</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 7.6pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: block;">The History Boys</span>
          <span style="font-size: 6pt; color: #64748b; font-weight: 600;">Specialist Battlefield Education</span>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 5px;">
        <div style="display: inline-block; background: #eff6ff; border: 1px solid #93c5fd; color: #1e3a8a; font-size: 6.5pt; font-weight: 800; padding: 2px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px;">
          Tour Leader Field Pocket Guide · Staff Edition
        </div>
        <h1 style="font-size: 19pt; line-height: 1.1; color: #0f172a; margin-bottom: 2px; letter-spacing: 0.02em;">
          YPRES 1914–1918
        </h1>
        <div style="font-size: 8.6pt; font-weight: 600; color: #b45309; font-style: italic;">
          Master Tour Scripts, Site Storytelling, Look-Fors &amp; Timings
        </div>
      </div>

      <!-- Tour Leadership Box -->
      <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
        <div style="font-size: 6.9pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
          Expedition Directorate &amp; 24/7 Field Contacts
        </div>
        <div style="font-size: 6.7pt; line-height: 1.32; color: #1e293b;">
          <strong>Tour Leaders:</strong> Department Lead &amp; Mr James Garrett (The History Boys)<br>
          <strong>Field Staff:</strong> Accompanying Staff (Pastoral Care &amp; First Aid Leads)<br>
          <strong>Dates:</strong> Thursday 1st – Saturday 3rd October 2026<br>
          <strong>Base Camp:</strong> Peace Village Hostel, Nieuwkerkestraat 9, 8957 Mesen (+32 57 226 040)<br>
          <strong>24/7 School Emergency Base:</strong> +44 (0)1329 662182 / 07825 297749
        </div>
      </div>

      <!-- Cover Photo -->
      <div style="margin-bottom: 5px;">
        <img src="${stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 130px; object-fit: cover; border-radius: 4px; border: 1.2px solid #cbd5e1;">
        <div style="font-size: 6.1pt; color: #64748b; font-style: italic; margin-top: 2px; text-align: center;">
          The War Memorial at Holy Rood Church, Stubbington — Anchoring our school expedition to our local parish fallen.
        </div>
      </div>

      <!-- The Charge -->
      <div style="background: #fffbeb; border: 1.2px solid #fde68a; border-left: 3.5px solid #b45309; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
        <div style="font-size: 6.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 1.5px;">
          The Tour Leader's Charge: A Pilgrimage of Remembrance
        </div>
        <p style="font-size: 6.7pt; color: #334155; line-height: 1.28; margin: 0 0 2px 0;">
          This pocket guide equips the teacher with rich, memorable historical narratives at every cemetery and trench. Each stop provides a 45-second spoken pitch, 3 concrete look-fors, an enquiry hinge question, and the complete war poem.
        </p>
        <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 6.7pt; color: #1e3a8a;">
          "They shall grow not old, as we that are left grow old... At the going down of the sun and in the morning, We will remember them."
        </div>
      </div>

      <!-- Booklet Format Badge -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; font-size: 6.2pt; color: #475569;">
        <span><strong>Pagination:</strong> 16-Page Saddle-Stitch Format (A5 Folded)</span>
        <span><strong>Curriculum:</strong> Edexcel GCSE Paper 1 &amp; Key Stage 3</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 1 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 2: SALIENT MAP & ITINERARY ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Expedition Itinerary &amp; Salient Map</div>
          <div class="school-sub">Tour Leader Route Pacing &amp; 13 Field Stops</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Master Timetable</div>
          <div class="lead">13 Historic Stops</div>
        </div>
      </div>

      <!-- Map -->
      <div class="photo-card" style="margin-bottom: 4px; padding: 2px;">
        <img src="${salientMap}" alt="Salient Map" style="height: 76px; object-fit: contain; background: #ffffff;">
      </div>

      <!-- Timetable Table -->
      <table class="compact-table" style="margin-bottom: 4px;">
        <thead>
          <tr>
            <th style="width: 19%;">Time</th>
            <th style="width: 38%;">Site / Location</th>
            <th>Teacher Focus &amp; Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>D1 · 06:15</strong></td>
            <td>Depart The History Portal · Folkestone</td>
            <td>Jet Connect coach; passports collected; 11:20 Eurotunnel.</td>
          </tr>
          <tr>
            <td><strong>D1 · 14:30</strong></td>
            <td><strong>Stop 1:</strong> Essex Farm ADS</td>
            <td>Bunker 4; Alexis Helmer burial; read <em>In Flanders Fields</em>.</td>
          </tr>
          <tr>
            <td><strong>D1 · 15:15</strong></td>
            <td><strong>Stop 2:</strong> Yorkshire Trench</td>
            <td>Canal bank breastworks, A-frames, deep dugout entrance.</td>
          </tr>
          <tr>
            <td><strong>D1 · 16:00</strong></td>
            <td><strong>Stop 3:</strong> Langemarck Cemetery</td>
            <td><em>Kindermord</em> myth; Kameradengrab (24,917); Krieger bronzes.</td>
          </tr>
          <tr>
            <td><strong>D1 · 17:00</strong></td>
            <td><strong>Stop 4:</strong> Hooge Crater Museum</td>
            <td>Mine warfare crater; 1915 flamethrower attack site; artifacts.</td>
          </tr>
          <tr>
            <td><strong>D1 · 18:00</strong></td>
            <td>Arrive Peace Village, Mesen</td>
            <td>Room keys, 18:30 dinner, 19:30 evening seminar room debrief.</td>
          </tr>
          <tr>
            <td><strong>D2 · 09:15</strong></td>
            <td><strong>Stop 5:</strong> Vancouver Corner</td>
            <td>First gas attack (22 April 1915); Canadian stand; Brooding Soldier.</td>
          </tr>
          <tr>
            <td><strong>D2 · 10:00</strong></td>
            <td><strong>Stop 6:</strong> Sanctuary Wood</td>
            <td>Preserved British trenches, traverses, mud, duckboard sumps.</td>
          </tr>
          <tr>
            <td><strong>D2 · 11:45</strong></td>
            <td>Lunch &amp; Aldi Supermarket, Ypres</td>
            <td>Supervised shopping for fresh picnic lunches &amp; rations.</td>
          </tr>
          <tr>
            <td><strong>D2 · 13:00</strong></td>
            <td><strong>Stop 7:</strong> Tyne Cot Cemetery</td>
            <td>11,961 graves; Baker pillbox cross; rear wall (34,984 missing).</td>
          </tr>
          <tr>
            <td><strong>D2 · 14:30</strong></td>
            <td><strong>Stop 8:</strong> Lijssenthoek Cemetery</td>
            <td>Casualty Clearing Station chain; Staff Nurse Nellie Spindler.</td>
          </tr>
          <tr>
            <td><strong>D2 · 16:00</strong></td>
            <td><strong>Stop 9:</strong> Passchendaele Museum</td>
            <td>Subterranean dugouts 20ft deep; reconstructed trench systems.</td>
          </tr>
          <tr>
            <td><strong>D2 · 19:20</strong></td>
            <td><strong>Stop 10:</strong> Menin Gate Last Post</td>
            <td>Wreath laying; Panel 35 (Franklin &amp; Ayling); Fire Brigade buglers.</td>
          </tr>
          <tr>
            <td><strong>D3 · 09:30</strong></td>
            <td><strong>Stop 11:</strong> Ypres Cloth Hall</td>
            <td>Grote Markt; stone-by-stone reconstruction; chocolate shops.</td>
          </tr>
          <tr>
            <td><strong>D3 · 10:45</strong></td>
            <td><strong>Stop 12:</strong> Talbot House, Poperinge</td>
            <td>Tubby Clayton; Everyman sanctuary; attic Upper Room chapel.</td>
          </tr>
          <tr>
            <td><strong>D3 · 12:45</strong></td>
            <td><strong>Stop 13:</strong> Poperinge Death Cells</td>
            <td>Town Hall execution post; military justice; 2006 pardons.</td>
          </tr>
          <tr>
            <td><strong>D3 · 14:30</strong></td>
            <td>Depart Poperinge for Calais</td>
            <td>17:50 Le Shuttle; return to school approx. 20:00.</td>
          </tr>
        </tbody>
      </table>

      <!-- Pacing Directive -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a; text-transform: uppercase;">
          Driver Hours &amp; Supervisory Protocol
        </div>
        <div style="font-size: 6.3pt; color: #475569; line-height: 1.23;">
          Our Jet Connect driver operates under strict EU tachograph hours. Group must board 10 mins before departure. Headcounts mandatory at every gate. Buddy-pair system active throughout.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 2 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 3: TOPOGRAPHY & HEADSTONE ANATOMY ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Field Geography &amp; Headstone Anatomy</div>
          <div class="school-sub">Staff Primer: Topography &amp; CWGC Architecture</div>
        </div>
        <div class="partner-pill">
          <div class="brand">CWGC Architecture</div>
          <div class="lead">Fabian Ware</div>
        </div>
      </div>

      <!-- Topography Briefing -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Ypres Battlefield Topography</div>
        <p>
          "Look out over the landscape: Flanders appears dead flat, but the Salient is defined by a low, curved clay ridge rising barely 45 metres towards Passchendaele. In 1914, German forces seized that higher ground, wrapping around Ypres on three sides. This formed 'the Salient'—a murderous bulge where German artillery could fire inwards from north, east, and south. The soil beneath our feet is dense, water-impermeable Flemish blue clay. When millions of artillery shells shattered the medieval drainage dykes, the trapped groundwater had nowhere to go, turning the entire battleground into an ocean of liquid mud where men, mules, and guns literally drowned."
        </p>
      </div>

      <!-- Headstone Anatomy Graphic & Breakdown -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${headstoneImg}" alt="CWGC Headstone" style="height: 125px; object-fit: contain; background: #ffffff;">
          <div class="caption">CWGC Portland Stone: 81cm x 38cm x 7.5cm. Absolute equality in death.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              CWGC Headstone Anatomy
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.24;">
              <strong>1. Regimental Badge:</strong> Identical size for privates and generals.<br>
              <strong>2. Service Details:</strong> Number, rank, name, honors, battalion.<br>
              <strong>3. Religious Emblem:</strong> Latin Cross, Star of David, or blank.<br>
              <strong>4. Date &amp; Age:</strong> Salient average age was 24.<br>
              <strong>5. Personal Inscription:</strong> Family-chosen (max 66 letters; 3½d per letter).<br>
              <strong>Unknowns:</strong> Kipling's universal words: <em>"A Soldier of the Great War — Known unto God."</em>
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #475569;">
            <strong>Principles:</strong> Equality across rank, permanence in foreign soil, no repatriation.
          </div>
        </div>
      </div>

      <!-- Inscription Typologies Box -->
      <div style="background: #fefce8; border: 1.2px solid #fde047; border-left: 3.5px solid #ca8a04; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #854d0e; text-transform: uppercase; margin-bottom: 1px;">
          Deciphering Family Inscription Typologies
        </div>
        <div style="font-size: 6.4pt; color: #713f12; line-height: 1.23;">
          Have pupils classify personal epitaphs into four categories: (1) <strong>Christian Hope:</strong> <em>"Thy Will Be Done"</em>; (2) <strong>Classical Duty:</strong> <em>"For King &amp; Country"</em>; (3) <strong>Raw Grief:</strong> <em>"A Day of Memory Sad to Recall, Without Goodbye He Left Us All"</em>; (4) <strong>Stoic Pride:</strong> <em>"Duty Nobly Done"</em>.
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Why did Fabian Ware insist on uniform Portland stone and ban wealthy families from repatriating bodies, yet allow families to choose and pay for a private inscription?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 3 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 4: LOCAL HERITAGE: LOWRY BROTHERS & ROLL ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Local Heritage: The Lowry Brothers &amp; Parish Roll</div>
          <div class="school-sub">Staff Dossier: Holy Rood Church Memorial Fallen</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Parish Fallen</div>
          <div class="lead">Tyne Cot &amp; Menin Gate</div>
        </div>
      </div>

      <!-- Lowry Brothers Story -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Lowry Family Tragedy</div>
        <p>
          "Stand with pupils and share this extraordinary local story: William and Annie Lowry lived at Manor Way Grange in Lee-on-the-Solent. They had three sons—William, Cyril, and Eric. In 1914, all three boys volunteered and took officer commissions. Over the next four years, all three were killed in action across different battlefronts. William died in a charge at Gallipoli; Cyril was shot dead on the Somme right in front of his brother Eric's eyes; and Eric, a decorated Lieutenant Colonel with a DSO and MC, was killed in the final weeks of the war in 1918. Their grief-stricken father built the Lowry Memorial Hall in Lee-on-the-Solent so their names would never fade. On our Holy Rood memorial tablet, all three are reunited."
        </p>
      </div>

      <!-- 3 Lowry Brothers Cards -->
      <div class="grid-3col" style="margin-bottom: 4px;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; text-align: center;">
          <img src="${lowryWilliam}" alt="William" style="height: 52px; width: 40px; object-fit: cover; margin: 0 auto 2px auto; display: block; border-radius: 2px;">
          <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a;">Lieut. William Lowry</div>
          <div style="font-size: 5.7pt; color: #b45309; font-weight: 700;">8th Gurkha Rifles (Age 25)</div>
          <div style="font-size: 5.7pt; color: #475569; line-height: 1.18;">Killed 4 June 1915, Gallipoli charge. Helles Memorial.</div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; text-align: center;">
          <img src="${lowryCyril}" alt="Cyril" style="height: 52px; width: 40px; object-fit: cover; margin: 0 auto 2px auto; display: block; border-radius: 2px;">
          <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a;">Capt. Cyril Lowry</div>
          <div style="font-size: 5.7pt; color: #b45309; font-weight: 700;">2nd West Yorks (Age 20)</div>
          <div style="font-size: 5.7pt; color: #475569; line-height: 1.18;">Killed 25 Mar 1918, Somme. Pozières Memorial.</div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; text-align: center;">
          <img src="${lowryEric}" alt="Eric" style="height: 52px; width: 40px; object-fit: cover; margin: 0 auto 2px auto; display: block; border-radius: 2px;">
          <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a;">Lt. Col. Eric Lowry</div>
          <div style="font-size: 5.7pt; color: #b45309; font-weight: 700;">2nd West Yorks DSO MC (25)</div>
          <div style="font-size: 5.7pt; color: #475569; line-height: 1.18;">Killed 23 Sep 1918, Arras. La Targette Cemetery.</div>
        </div>
      </div>

      <!-- Parish Fallen Table -->
      <table class="compact-table" style="margin-bottom: 4px;">
        <thead>
          <tr>
            <th>Local Soldier</th>
            <th>Regiment &amp; Age</th>
            <th>Salient Memorial Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pte. Thomas Franklin</strong></td>
            <td>1st Bn, Hampshire Regt (Age 23)</td>
            <td><strong>Menin Gate · Panel 35</strong> (Frezenberg Ridge, 1915)</td>
          </tr>
          <tr>
            <td><strong>Pte. William Ayling</strong></td>
            <td>1st Bn, Hampshire Regt (Age 20)</td>
            <td><strong>Menin Gate · Panel 35</strong> (Mortar attack, July 1915)</td>
          </tr>
          <tr>
            <td><strong>Pte. Sydney Muckett</strong></td>
            <td>15th Bn, Hampshire Regt (Age 21)</td>
            <td><strong>Tyne Cot · Panels 88–90</strong> (Menin Road Ridge, 1917)</td>
          </tr>
          <tr>
            <td><strong>Pte. Arthur Rye</strong></td>
            <td>14th Bn, Hampshire Regt (Age 21)</td>
            <td><strong>Tyne Cot · Panels 88–90</strong> (Polygon Wood, 1917)</td>
          </tr>
          <tr>
            <td><strong>L/Cpl. Archibald Ward</strong></td>
            <td>15th Bn, Hampshire Regt (Age 23)</td>
            <td><strong>Tyne Cot · Panels 88–90</strong> (Killed 14 Oct 1918 in mist)</td>
          </tr>
          <tr>
            <td><strong>Pte. Charles Warland</strong></td>
            <td>3rd/4th The Queen's (Age 20)</td>
            <td><strong>Tyne Cot · Panels 14–17</strong> (Broodseinde marsh, 1917)</td>
          </tr>
        </tbody>
      </table>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How does discovering that three brothers from one family in our local village were wiped out transform our understanding of the 'Lost Generation' from statistics into personal grief?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 4 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 5: DAY 1 · STOP 1: ESSEX FARM ADS ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 · Stop 1: Essex Farm ADS &amp; Canal Bank</div>
          <div class="school-sub">14:30 · Yser Canal Embankment · John McCrae &amp; Valentine Strudwick</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 1</div>
          <div class="lead">Medical ADS</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Story to Tell at Essex Farm</div>
        <p>
          "We are standing outside the concrete medical bunkers carved directly into the Yser Canal bank. In May 1915, during the Second Battle of Ypres, Dr John McCrae of the Canadian Army Medical Corps worked inside these damp, blood-soaked chambers triaging thousands of casualties blinded and choking on poison gas. On 2 May, an 8-inch high-explosive shell scored a direct hit on his 22-year-old friend and former student, Lieutenant Alexis Helmer, blowing him to pieces. With no chaplain available, McCrae gathered what remained of Helmer in a blanket and buried him at night by lantern light, reciting the prayers by memory. Early the next morning, sitting on the back step of an ambulance looking out over this bank, McCrae saw wild red field poppies flourishing across the fresh, shell-churned graves—and wrote the world's most famous war poem."
        </p>
      </div>

      <!-- Boy Soldier Valentine Strudwick Focus -->
      <div style="background: #fef2f2; border: 1.2px solid #fecaca; border-left: 3.5px solid #dc2626; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.8pt; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 1px;">
          Case Study: Private Valentine Strudwick (Plot I. U. 8)
        </div>
        <div style="font-size: 6.5pt; color: #450a0a; line-height: 1.25;">
          Enlisted at 14 lying about his age; sent to Flanders with the 8th Rifle Brigade. Killed on 14 January 1916 aged just <strong>15 years and 11 months</strong>—one of the youngest casualties on the Western Front. Point out his mother's moving epitaph: <em>"Not gone from memory, not gone from love, but gone to our Father's home above."</em>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Bunker 4 Triage Bay:</strong> Low, damp concrete arches built into the canal earthwork to shield wounded from artillery shrapnel.</li>
          <li><strong>Grave of Valentine Strudwick (Plot I.U.8):</strong> Observe the sea of school poppy crosses continuously left on this 15-year-old boy's stone.</li>
          <li><strong>Yser Canal Embankment:</strong> Notice the steep ridge offering the only natural cover from German gunners firing across the flat plains.</li>
        </ul>
      </div>

      <!-- Definitive Poem: In Flanders Fields with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">In Flanders Fields</span>
            <span class="poem-meta"> · Lt. Col. John McCrae (Canadian AMC) · 3 May 1915</span>
          </div>
          <img src="${mccraeImg}" alt="John McCrae" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">In Flanders fields the poppies blow
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
In Flanders fields.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How did McCrae's poem transform a common weed growing in disturbed soil into a sacred global symbol of sacrifice—and does the final stanza glorify continuous warfare?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 5 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 6: DAY 1 · STOP 2: YORKSHIRE TRENCH ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 · Stop 2: Yorkshire Trench &amp; Canal Line</div>
          <div class="school-sub">15:15 · Boezinge Sector · Preserved Frontline &amp; Deep Dugout</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 2</div>
          <div class="lead">Original Trenches</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Discovery of Yorkshire Trench</div>
        <p>
          "This site was completely lost for 75 years until 1992, when a group of amateur Belgian archaeologists known as 'The Diggers' investigated land designated for an industrial estate. Beneath the turf, they uncovered an intact British frontline system constructed in 1915 by the 49th (West Riding) Division. As you walk through, notice why trenches here were built as raised sandbag breastworks rather than deep ditches: in the Yser valley, digging down just three feet strikes the water table. Men lived with water pooling around their boots 24 hours a day. Notice the steel-reinforced entrances leading down to deep subterranean dugouts 30 feet beneath us, where over 200 soldiers huddled in candlelit bunks waiting for the order to go over the top."
        </p>
      </div>

      <!-- Photo & Trench Anatomy Card -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${cheshireTrench}" alt="Trench Construction" style="height: 95px; object-fit: cover;">
          <div class="caption">Frontline breastworks: Sandbag revetments and duckboards.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              Traverses &amp; Sump Drainage
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.23;">
              Trenches followed a rigid 90-degree zig-zag pattern with thick earth baffles called <strong>traverses</strong> to isolate shell blast shrapnel. Sump pits beneath duckboards drained stagnant water to combat trench foot.
            </div>
          </div>
          <div style="background: #eff6ff; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #1e3a8a;">
            Deep dugout shafts sheltered 200 men from high explosive barrages.
          </div>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Preserved Timber A-Frames:</strong> Look down beneath the duckboards to see the inverted V-shaped wooden posts holding up trench walls.</li>
          <li><strong>Subterranean Dugout Stairwells:</strong> The steep timber-lined shafts descending 30 feet into the earth, where 200 men took shelter from barrages.</li>
          <li><strong>Sandbag Breastwork Construction:</strong> Notice how the trench walls rise above ground level using revetments because digging deeper hit water.</li>
        </ul>
      </div>

      <!-- Context Note: The Dec 1915 Phosgene Attack -->
      <div style="background: #eff6ff; border: 1.2px solid #bfdbfe; border-left: 3.5px solid #2563eb; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 1px;">
          Tactical Event: The Phosgene Attack of 19 December 1915
        </div>
        <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.23;">
          This sector saw the German military debut of <strong>phosgene gas</strong>, mixed with chlorine. Colorless and smelling faintly of moldy hay, phosgene was six times deadlier than chlorine because its suffocating fluid buildup in the lungs took 24 to 48 hours to manifest, catching unwary troops without gas helmets.
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Looking at the high water table and cramped zig-zag walls, did soldiers in the Salient face a greater daily threat from enemy artillery or from the hostile Flemish environment itself?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 6 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 7: DAY 1 · STOP 3: LANGEMARCK GERMAN CEMETERY ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 · Stop 3: Langemarck German Cemetery</div>
          <div class="school-sub">16:00 · Studentenfriedhof · The Myth of 1914 &amp; The Mourning Bronzes</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 3</div>
          <div class="lead">German Mourning</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Kindermord Myth &amp; The 24,917 Mass Grave</div>
        <p>
          "Step through this red sandstone gatehouse and feel the immediate, deliberate change in atmosphere: dark basalt stone, low oak trees, and somber stillness. This is the <em>Studentenfriedhof</em>—the Student Cemetery. In November 1914, German propaganda created the heroic myth of Langemarck, claiming thousands of enthusiastic university and schoolboy volunteers charged singing <em>'Deutschland über alles'</em>. In reality, it was a tragedy known as the <em>Kindermord</em> (the Massacre of the Innocents): untrained teenage boys were sent forward into the rapid-firing rifles of British regular soldiers and slaughtered in heaps. Directly ahead lies the <em>Kameradengrab</em> (Comrades' Grave)—holding <strong>24,917 men buried in a single mass grave</strong> beneath this dark stone patio. At the rear stand Emil Krieger’s four bronze mourning figures, heads bowed in bleak, inconsolable grief. Notice: no triumphal angels, no victorious swords."
        </p>
      </div>

      <!-- Adolf Hitler Historical Connection -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 1px;">
          Historical Context: Adolf Hitler &amp; The List Regiment (1914 &amp; 1940)
        </div>
        <div style="font-size: 6.4pt; color: #334155; line-height: 1.23;">
          A young 25-year-old dispatch runner named Adolf Hitler served here in October 1914 with the 16th Bavarian Reserve Regiment (the List Regiment). The myth of heroic youth sacrifice at Langemarck shaped Nazi propaganda in the 1920s and 30s. On 1 June 1940, immediately following the fall of France, Hitler returned here and was photographed standing in triumph outside the gatehouse.
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Kameradengrab Bronze Tablet:</strong> The central bronze wreath flanked by massive bronze tablets listing 17,342 identified soldiers buried together.</li>
          <li><strong>Emil Krieger's Mourning Soldiers:</strong> Walk to the rear boundary to see the four dark bronze figures standing shoulder-to-shoulder in sorrow.</li>
          <li><strong>Flat Basalt Markers:</strong> Unlike British upright Portland stones, German stones lie flat in the grass, each marking the remains of up to 20 soldiers.</li>
        </ul>
      </div>

      <!-- Definitive Poem: Charles Sorley with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">When You See Millions of the Mouthless Dead</span>
            <span class="poem-meta"> · Capt. Charles Sorley (7th Suffolks) · 1915</span>
          </div>
          <img src="${sorleyImg}" alt="Charles Sorley" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">When you see millions of the mouthless dead
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
Great death has made all his for evermore.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How does the deliberate gloom, dark granite, and mass grave of Langemarck reflect defeat and national mourning, compared to the radiant Portland stone of British CWGC cemeteries?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 7 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 8: DAY 1 · STOP 4: HOOGE CRATER & FLAMETHROWER ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 · Stop 4: Hooge Crater &amp; Flamethrower Attack</div>
          <div class="school-sub">17:00 · Menin Road · Subterranean Mines &amp; Industrial Escalation</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 4</div>
          <div class="lead">Mine Warfare</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Mine Blast &amp; The Horror of Liquid Fire</div>
        <p>
          "We are standing on the historic Menin Road at Hooge Chateau—one of the most contested bloodbaths in the Salient. By 1915, surface trench attacks had stalled, so armies took the war subterranean. British tunnelling companies dug deep through Flemish clay beneath the German stronghold and packed 1,700 pounds of ammonal high explosives. On 19 July 1915, they detonated the mine, blasting a terrifying crater 120 feet wide and 20 feet deep. But just eleven days later, at 03:15 on 30 July 1915, the German army struck back with a horrifying new weapon: the world debut of the portable <em>Flammenwerfer</em> (flamethrower). German shock troops jetted liquid fire 30 yards into the trenches of the British 8th Rifle Brigade, setting men instantly ablaze in the dark. Pre-war notions of chivalrous warfare died right here in the mud of Hooge."
        </p>
      </div>

      <!-- Photo & Crater Breakdown -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${hoogeCrater}" alt="Hooge Crater" style="height: 105px;">
          <div class="caption">The water-filled mine crater rim at Hooge along the Menin Road.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              The Menin Road Bloodbath
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.23;">
              Because Hooge sat on the main road between Ypres and Menen, both sides fought relentlessly for control of its shattered stables and chateau ruins. Artillery pounded the sector day and night, turning the woods into jagged stumps known as 'Sanctuary Wood' and 'Chateau Wood'.
            </div>
          </div>
          <div style="background: #eff6ff; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #1e3a8a;">
            <strong>Museum Highlights:</strong> Preserved flamethrower nozzles, trench armour, sniper plates.
          </div>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Preserved Crater Basin:</strong> Walk along the wooden fence behind the museum to view the enormous water-filled depression created by the 1915 mine.</li>
          <li><strong>Restored Frontline Trench System:</strong> Inspect the sandbag parapets, trench mortar emplacements, and duckboards winding through the trees.</li>
          <li><strong>Original German Periscopes &amp; Armor:</strong> Inside the museum, view the steel trench helmets pocked with shrapnel and heavy sniper breastplates.</li>
        </ul>
      </div>

      <!-- Evening Transfer Note -->
      <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-left: 3.5px solid #16a34a; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 1px;">
          Teacher Directive: Evening Base Camp Transfer to Mesen
        </div>
        <div style="font-size: 6.4pt; color: #14532d; line-height: 1.23;">
          Board coach at 17:30. Travel south past Messines Ridge to Peace Village Hostel (Mesen). Check-in at 18:00; dinner at 18:30; evening seminar debrief on Day 1 findings in Seminar Room A from 19:30 to 20:30.
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How did the simultaneous introduction of subterranean mines and liquid flamethrowers fundamentally alter the psychological resilience of frontline soldiers?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 8 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 9: DAY 2 · STOP 5: VANCOUVER CORNER ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 5: Vancouver Corner &amp; Gas Attack</div>
          <div class="school-sub">09:15 · St Julien · The Brooding Soldier &amp; Chlorine Warfare</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 5</div>
          <div class="lead">Gas Warfare</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Green Cloud &amp; The Canadian Stand</div>
        <p>
          "We stand at Vancouver Corner outside St Julien. At 17:00 on 22 April 1915, the German 4th Army opened the valves of 5,730 cylinders, unleashing 168 tons of chlorine gas across a four-mile front. Carried by a gentle northeast breeze, a dense greenish-yellow cloud drifted into the trenches of French colonial and Algerian troops. Chlorine dissolves in moisture, turning into hydrochloric acid in human lungs; men coughed up burning fluid and fled in agony, tearing a four-mile hole in the Allied lines. Two days later, the gas was released directly against the untested Canadian 1st Division right here. With no gas masks, Canadian medical officer Captain Francis Scrimger realized chlorine was neutralized by ammonia. He ordered men to urinate on their handkerchiefs, socks, or cloths and press them over their faces. Breathing through their own urine, the Canadians held the line for four days, saving Ypres from capture at the cost of 6,000 casualties. Above us stands Chapman Clemesha’s 33-foot granite <em>Brooding Soldier</em>, hands resting on reversed arms."
        </p>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Reversed Rifle Position:</strong> Notice the colossal hands resting on the rifle butt—the international symbol of mourning and solemn respect.</li>
          <li><strong>Granite Battle Narrative:</strong> Read the bronze plaques on the boundary walls detailing the Canadian 1st Division's defense on 22–24 April 1915.</li>
          <li><strong>The Surrounding Topography:</strong> Look east towards Poelcappelle to see how gas pooled along the natural depressions and valleys.</li>
        </ul>
      </div>

      <!-- Definitive Poem: Dulce et Decorum Est with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">Dulce et Decorum Est</span>
            <span class="poem-meta"> · Wilfred Owen · 1917</span>
          </div>
          <img src="${owenImg}" alt="Wilfred Owen" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">Gas! Gas! Quick, boys!—An ecstasy of fumbling,
Fitting the clumsy helmets just in time;
But someone still was yelling out and stumbling,
And flound'ring like a man in fire or lime...
Dim, through the misty panes and thick green light,
As under a green sea, I saw him drowning.

In all my dreams, before my helpless sight,
He plunges at me, guttering, choking, drowning.

If in some smothering dreams you too could pace
Behind the wagon that we flung him in,
And watch the white eyes writhing in his face...
My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie; Dulce et decorum est
Pro patria mori.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Why did both sides view the introduction of chemical warfare as a moral turning point, and why did Wilfred Owen label the classical motto of patriotic sacrifice 'The Old Lie'?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 9 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 10: DAY 2 · STOP 6: SANCTUARY WOOD ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 6: Sanctuary Wood (Hill 62)</div>
          <div class="school-sub">10:00 · Preserved British Frontlines, Duckboards &amp; Mud</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 6</div>
          <div class="lead">Living Trenches</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Mud, The Rats &amp; The Ironic 'Sanctuary'</div>
        <p>
          "We are walking into the original British frontline trenches preserved exactly where they were dug in 1915–1916 by the Schier family. Why was this dense copse named 'Sanctuary Wood'? In November 1914, British soldiers retreated into these trees because they were hidden from German view and thought to be a safe haven. But that sanctuary was an illusion: in June 1916, during the Battle of Mount Sorrel, German heavy artillery obliterated the trees, turning them into blackened telephone poles standing in liquid mud. As you walk through, feel the narrowness of the fire-steps and duckboards. Men lived in these slimy ditches for days without relief, infested with body lice that caused trench fever, and plagued by corpse-fattened brown rats that scurried across their faces while they slept."
        </p>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Original Corrugated Iron Revetments:</strong> Look at the rusted iron sheeting holding up the collapsing clay walls of the communications trench.</li>
          <li><strong>Underground Sap Tunnel Entrance:</strong> A low, timber-shored tunnel entrance leading towards no-man's-land used by listening posts.</li>
          <li><strong>Splintered Oak Stumps:</strong> The preserved, petrified remains of trees shorn in half by heavy shellfire during the 1916 bombardment.</li>
        </ul>
      </div>

      <!-- Definitive Poem: Isaac Rosenberg with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">Break of Day in the Trenches</span>
            <span class="poem-meta"> · Isaac Rosenberg (Private, King's Own) · 1916</span>
          </div>
          <img src="${rosenbergImg}" alt="Isaac Rosenberg" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">The darkness crumbles away.
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
Poppies from man's roots brought
But mine in my ear is safe—
Just a little white with the dust.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Why did Isaac Rosenberg contrast the survival of a lowly trench rat freely crossing no-man's-land with the trapped, doomed condition of the soldiers on both sides?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 10 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 11: DAY 2 · STOP 7: TYNE COT CEMETERY ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 7: Tyne Cot British Military Cemetery</div>
          <div class="school-sub">13:00 · Passchendaele · 11,961 Graves &amp; 34,984 Missing Dead</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 7</div>
          <div class="lead">Tyne Cot</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Epicentre of Passchendaele</div>
        <p>
          "We are standing inside the largest Commonwealth war cemetery in the world: Tyne Cot. Between July and November 1917, over half a million men became casualties in the mud of the Third Battle of Ypres (Passchendaele). There are 11,961 soldiers buried here—and staggeringly, nearly <strong>70% (8,369 men) are unidentified</strong>, with their headstones bearing Kipling's words <em>'Known unto God'</em>. When King George V visited this muddy hill in 1922, he looked at the captured German concrete machine-gun bunkers and suggested they be preserved. Architect Sir Herbert Baker literally built Blomfield’s Great Cross of Sacrifice directly atop the central German pillbox, leaving the open machine-gun slit visible at ground level—Christian sacrifice erected over the machine of war. Along the curving rear wall are engraved the names of <strong>34,984 soldiers with no known grave</strong> who fell after 16 August 1917, including four of our own village heroes."
        </p>
      </div>

      <!-- Photo & Parish Fallen Focus -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${tyneCot}" alt="Tyne Cot" style="height: 98px;">
          <div class="caption">Cross of Sacrifice mounted directly on captured German bunker.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              Our Parish Fallen at Tyne Cot
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.22;">
              Lead pupils along the rear memorial wall to locate our four local boys:<br>
              • <strong>Pte. Sydney Muckett</strong> (Panel 88)<br>
              • <strong>Pte. Arthur Rye</strong> (Panel 88)<br>
              • <strong>L/Cpl. Archibald Ward</strong> (Panel 88)<br>
              • <strong>Pte. Charles Warland</strong> (Panel 14)
            </div>
          </div>
          <div style="background: #eff6ff; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #1e3a8a;">
            Lay the school remembrance cross at the central pillbox aperture.
          </div>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The German Pillbox Aperture:</strong> Walk to the base of the Great Cross to peer into the preserved concrete firing slit used by German Maxim gunners.</li>
          <li><strong>Flanking German Bunkers:</strong> Inspect the two untouched German pillboxes preserved amidst the headstones on the northern and southern flanks.</li>
          <li><strong>The Passchendaele Ridge View:</strong> Stand at the terrace and look back down the slope towards Ypres to appreciate German artillery observation.</li>
        </ul>
      </div>

      <!-- Definitive Poem: Laurence Binyon with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">For the Fallen</span>
            <span class="poem-meta"> · Laurence Binyon · 1914</span>
          </div>
          <img src="${binyonImg}" alt="Laurence Binyon" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea...
They went with songs to the battle, they were young,
Straight of limb, true of eye, steady and aglow.
They were staunch to the end against odds uncounted;
They fell with their faces to the foe.

They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.

They mingle not with their laughing comrades again;
They sit no more at familiar tables of home;
They have no lot in our labour of the day-time;
They sleep beyond England's foam.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Why did the British Empire choose to leave over 8,000 unidentified soldiers in marked individual graves rather than burying them in a single national tomb like the Unknown Warrior?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 11 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 12: DAY 2 · STOP 8: LIJSSENTHOEK CEMETERY ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 8: Lijssenthoek Military Cemetery</div>
          <div class="school-sub">14:30 · Poperinge Line · Casualty Clearing Stations &amp; Nurse Nellie Spindler</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 8</div>
          <div class="lead">Evacuation Chain</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Hospital on the Railway Line</div>
        <p>
          "We are at Lijssenthoek, the second largest Commonwealth cemetery in Belgium, with 10,755 graves. But unlike Tyne Cot, which grew directly out of a frontline battlefield, Lijssenthoek was the medical hub of the Western Front. Situated eight miles behind Ypres alongside the railway line to Boulogne, this site hosted British Casualty Clearing Stations (CCS 10, 33, and 44). Over 300,000 wounded men passed through these hospital tents. The men buried here did not die instantly in combat; they were carried back through the evacuation chain—from Regimental Aid Post to Advanced Dressing Station to CCS—and died here of wounds, sepsis, or gas gangrene. Notice the extraordinary timeline visitor centre at the entrance, where the density of headstones matches the exact dates of major offensives."
        </p>
      </div>

      <!-- Staff Nurse Nellie Spindler Focus -->
      <div style="background: #fef2f2; border: 1.2px solid #fecaca; border-left: 3.5px solid #dc2626; border-radius: 4px; padding: 3.5px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.8pt; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 1px;">
          The Heroine of Lijssenthoek: Staff Nurse Nellie Spindler (Plot XVI. A. 3)
        </div>
        <div style="font-size: 6.5pt; color: #450a0a; line-height: 1.25;">
          Gather pupils at Plot XVI, Row A, Grave 3. Staff Nurse Nellie Spindler was a 26-year-old nurse from Leeds with Queen Alexandra's Imperial Military Nursing Service. On 21 August 1917, during Third Ypres, a German long-range 5.9-inch naval gun shelled CCS 44. A shell splinter pierced her chest; she died in the arms of her fellow nurses twenty minutes later. She is one of only two female British nurses buried on the Western Front killed by enemy fire, buried with full military honours as buglers sounded the <em>Last Post</em> over her grave.
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Grave of Nurse Nellie Spindler (Plot XVI. A. 3):</strong> Locate her headstone surrounded entirely by male officers and soldiers.</li>
          <li><strong>The Visitor Centre Timeline Wall:</strong> Walk along the tally-mark glass wall showing daily death tolls spiking during Third Ypres.</li>
          <li><strong>International Ally Plots:</strong> Observe the headstones of French, American, and even German prisoners of war treated in the same hospital tents.</li>
        </ul>
      </div>

      <!-- Context Note: The Medical Evacuation Chain -->
      <div style="background: #eff6ff; border: 1.2px solid #bfdbfe; border-left: 3.5px solid #2563eb; border-radius: 4px; padding: 3.5px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 1px;">
          The Evacuation Chain: From Mud to Base Hospital
        </div>
        <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.23;">
          Stretcher Bearers (frontline mud) → <strong>RAP</strong> (Regimental Aid Post, 200m) → <strong>ADS</strong> (Advanced Dressing Station, e.g. Essex Farm, 1-2 miles) → <strong>CCS</strong> (Casualty Clearing Station, e.g. Lijssenthoek, 8 miles) → <strong>Ambulance Train</strong> → <strong>Base Hospital</strong> (Boulogne/Etaples).
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How does the story of Staff Nurse Nellie Spindler challenge traditional perceptions that female war service was confined to safe support roles on the home front?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 12 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 13: DAY 2 · STOP 9: PASSCHENDAELE MUSEUM ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 9: Passchendaele 1917 Museum</div>
          <div class="school-sub">16:00 · Zonnebeke Chateau · Subterranean Dugouts &amp; Trench Labyrinth</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 9</div>
          <div class="lead">Underground War</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Subterranean World of 1917</div>
        <p>
          "We are at Zonnebeke Chateau, the Memorial Museum Passchendaele 1917. In the summer and autumn of 1917, artillery fire was so intense that nothing could survive on the surface. Commonwealth tunnelling companies excavated massive subterranean dugout networks 20 to 30 feet below ground level. Step down the steep wooden stairwell into the reconstructed dugout: feel the sudden drop in temperature, the damp smell of timber and stagnant water, and the claustrophobia. Thousands of soldiers lived down here for weeks on end, sleeping on canvas-and-wire bunks stacked three high. They had underground operating theatres, signal stations, and pump rooms that ran 24 hours a day to prevent the rooms from filling with water. Outside in the park, compare the British zig-zag trench system with the fortified German concrete bunker line."
        </p>
      </div>

      <!-- Dugout Photo Card -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${passchendaeleDugout}" alt="Passchendaele Dugout" style="height: 105px;">
          <div class="caption">Reconstructed 20ft subterranean dugout labyrinth at Zonnebeke.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              Subterranean Survival
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.23;">
              Air had to be manually pumped down through ventilation shafts using bellows. A single candle was kept burning at floor level: if the flame sputtered and died, it warned the men that carbon dioxide was pooling and asphyxiation was imminent.
            </div>
          </div>
          <div style="background: #eff6ff; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #1e3a8a;">
            <strong>Outdoor Trench Park:</strong> Authentic comparison of British A-frames vs German hurdles.
          </div>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Underground Regimental Aid Post:</strong> View the cramped bunk room where doctors performed emergency surgery by candlelight 25 feet underground.</li>
          <li><strong>Communication Signal Room:</strong> Inspect the field telephone switchboards and carrier pigeon baskets used to send messages to the rear.</li>
          <li><strong>German vs British Trenches:</strong> In the chateau grounds, compare the British timber revetments with German woven-wicker hurdle walls.</li>
        </ul>
      </div>

      <!-- Evening Menin Gate Transit Briefing -->
      <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-left: 3.5px solid #16a34a; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 1px;">
          Tour Leader Briefing: Transfer to Ypres for Menin Gate
        </div>
        <div style="font-size: 6.4pt; color: #14532d; line-height: 1.23;">
          Board coach at 17:30. Travel into Ypres; early dinner in town square / hostel at 18:15. Depart for Menin Gate at 19:15 sharp to secure prime viewing positions under the north archway before crowds assemble for the 20:00 Last Post ceremony.
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How did deep subterranean dugouts solve the problem of survival during artillery barrages, while simultaneously creating new psychological horrors for the troops?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 13 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 14: DAY 2 · STOP 10: MENIN GATE LAST POST ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 · Stop 10: Menin Gate Memorial to Missing</div>
          <div class="school-sub">19:20 · Ypres · 54,395 Missing Dead &amp; The 20:00 Last Post Ceremony</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Stop 10</div>
          <div class="lead">Last Post</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: The Arch of Triumph &amp; The Wall That Ran Out</div>
        <p>
          "We are standing beneath Sir Reginald Blomfield's classical triumphal arch, built across the ancient ramparts where hundreds of thousands of British soldiers marched out towards the trenches along the Menin Road. Carved into these Portland stone walls are the names of <strong>54,395 Commonwealth soldiers who died in the Salient before 16 August 1917 and have no known grave</strong>. But here is the tragedy of its design: Blomfield intended this arch to hold every single missing soldier of the Salient. During construction, the architects discovered they had completely run out of wall space—leaving another 34,984 missing men who had to be carved on the wall at Tyne Cot instead! Every night at 20:00 without fail since 1928, police halt traffic and volunteer buglers of the Ypres Fire Brigade sound the <em>Last Post</em>. On Panel 35, our school will locate Private Thomas Franklin and Private William Ayling of the Hampshire Regiment."
        </p>
      </div>

      <!-- Photo & Protocol Card -->
      <div class="grid-2col" style="margin-bottom: 4px; align-items: stretch;">
        <div class="photo-card" style="padding: 2px;">
          <img src="${meninGate}" alt="Menin Gate" style="height: 105px;">
          <div class="caption">The Menin Gate Memorial to the Missing, inaugurated July 1927.</div>
        </div>

        <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
              Ceremony Protocol &amp; Panel 35
            </div>
            <div style="font-size: 6.5pt; color: #334155; line-height: 1.22;">
              • <strong>19:20:</strong> Secure standing position along north walkway.<br>
              • <strong>19:45:</strong> Two designated pupil wreath bearers escorted by staff to ceremonial marshalling point.<br>
              • <strong>20:00:</strong> Last Post sounded, 2-minute silence, wreath laid.<br>
              • <strong>Panel 35:</strong> Inscribed with Pte. T. J. Franklin &amp; Pte. W. Ayling.
            </div>
          </div>
          <div style="background: #eff6ff; padding: 2px 4px; border-radius: 3px; font-size: 6pt; color: #1e3a8a;">
            Maintain absolute silence during the sounding of the bugles.
          </div>
        </div>
      </div>

      <!-- 3 Look-Fors -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Panel 35 (Hampshire Regiment):</strong> Walk along the southern interior wall to locate Franklin and Ayling among the Hampshire fallen.</li>
          <li><strong>The Lion of Britain:</strong> Look above the eastern entrance arch to see the British lion resting on the pediment gazing towards the battlefields.</li>
          <li><strong>Latin Arch Inscription:</strong> Read the words high on the attic: <em>Ad Majorem Dei Gloriam</em> ('To the Greater Glory of God').</li>
        </ul>
      </div>

      <!-- Definitive Poem: Siegfried Sassoon with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">On Passing the New Menin Gate</span>
            <span class="poem-meta"> · Capt. Siegfried Sassoon · 1927</span>
          </div>
          <img src="${sassoonImg}" alt="Siegfried Sassoon" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,—
Those doomed, conscripted, unvictorious ones?

Crudely renewed, the Salient holds its dead,
And magnificent, the arch of triumph stands;
Sure are the streets, untorn by shot and shell;
Here was the world’s worst wound. And here with pride
Their names are graven whom the world forgot,
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.</div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "Why was war veteran Siegfried Sassoon so repulsed by Blomfield's grand triumphal arch, calling it a 'sepulchre of crime', while bereaved mothers found solace in seeing their sons' names?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 14 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 15: DAY 3 · STOPS 11, 12, 13: REBIRTH & JUSTICE ================= -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 3 · Stops 11, 12 &amp; 13: Rebirth, Haven &amp; Justice</div>
          <div class="school-sub">Ypres Cloth Hall, Talbot House (Poperinge) &amp; Town Hall Death Cells</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Day 3</div>
          <div class="lead">Poperinge &amp; Ypres</div>
        </div>
      </div>

      <!-- Spoken Storytelling Pitch: 3 Stops -->
      <div class="pitch-box">
        <div class="box-header">⏱️ 45-Second Teacher Pitch: Rebuilding, Fellowship &amp; The Firing Squad</div>
        <p>
          "Our final morning links three contrasting themes: civic rebirth, human compassion, and brutal military law.<br>
          <strong>Stop 11 (Cloth Hall):</strong> By 1918, Ypres was flat rubble; Churchill wanted the ruins left untouched as an open-air British monument. The proud Belgian citizens refused, spending 40 years rebuilding their medieval Cloth Hall stone-for-stone.<br>
          <strong>Stop 12 (Talbot House, Poperinge):</strong> In December 1915, Army Chaplain Rev. Philip 'Tubby' Clayton opened this house as an Everyman's club behind the lines. In an army divided by strict class rank, his sign read: <em>'All rank abandon ye who enter here'</em>. Generals and privates drank tea together, and climbed to the attic 'Upper Room' chapel where an old carpenter's bench served as an altar.<br>
          <strong>Stop 13 (Poperinge Death Cells):</strong> Just 200 yards away in the Town Hall courtyard stand two cramped brick cells and a wooden execution post. Here, 306 British soldiers suffering from shell shock and trauma were executed at dawn for 'cowardice' or desertion—finally pardoned by Parliament in 2006."
        </p>
      </div>

      <!-- 3 Look-Fors for Day 3 Sites -->
      <div class="look-fors-box">
        <div class="box-header">👁️ 3 Physical Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Upper Room Carpenter's Altar (Talbot House):</strong> Climb the attic stairs to see the workbench and candles where men took communion before battle.</li>
          <li><strong>The Courtyard Execution Post (Poperinge):</strong> Stand before the weathered wooden post where condemned soldiers were tied and blindfolded at dawn.</li>
          <li><strong>Rebuilt Belfry &amp; Cloth Hall Masonry:</strong> In Ypres Grote Markt, inspect the medieval stonework meticulously reconstructed from 1928 to 1967.</li>
        </ul>
      </div>

      <!-- Definitive Poem: Rupert Brooke with Portrait -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">The Soldier</span>
            <span class="poem-meta"> · Rupert Brooke (Royal Naval Division) · 1914</span>
          </div>
          <img src="${brookeImg}" alt="Rupert Brooke" style="width: 24px; height: 30px; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines">If I should die, think only this of me:
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
In hearts at peace, under an English heaven.</div>
      </div>

      <!-- Shot at Dawn Pardon Context -->
      <div style="background: #fef2f2; border: 1.2px solid #fecaca; border-left: 3.5px solid #dc2626; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 1px;">
          Historical Justice: The 2006 Statutory Pardon
        </div>
        <div style="font-size: 6.4pt; color: #450a0a; line-height: 1.23;">
          Of the 306 men shot at dawn, over 90% had suffered severe combat trauma or prolonged shell shock (*neurasthenia*). In 2006, after decades of campaigning, the UK Parliament passed the Armed Forces Act, granting all 306 posthumous pardons and acknowledging that they were victims of war.
        </div>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">❓ Targeted Enquiry Hinge Question</div>
        <p>
          "How does the radical Christian equality and compassion of Talbot House contrast with the cold discipline of the Poperinge execution cells just 200 yards away?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 15 of 16</span>
    </div>
  </div>


  <!-- ================= PAGE 16: BACK COVER & FIELD REFERENCE ================= -->
  <div class="page" style="background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f8fafc 100%);">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Field Study Reference &amp; Emergency Protocols</div>
          <div class="school-sub">Military Terminology, Flemish Toponyms &amp; Tour Standards</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Staff Directory</div>
          <div class="lead">Back Cover</div>
        </div>
      </div>

      <!-- 24/7 Emergency Contacts Box -->
      <div style="background: #0f172a; color: #ffffff; border-radius: 4px; padding: 5px 8px; margin-bottom: 4px;">
        <div style="font-size: 7pt; font-weight: 800; color: #fbbf24; text-transform: uppercase; margin-bottom: 2px;">
          24/7 Tour Directorate &amp; Emergency Communication
        </div>
        <div style="font-size: 6.5pt; line-height: 1.28; color: #e2e8f0;">
          <strong>School Emergency Base:</strong> +44 (0)1329 662182 / 07825 297749<br>
          <strong>Base Camp:</strong> Peace Village Hostel, Mesen (+32 57 226 040)<br>
          <strong>Coach Operator:</strong> Jet Connect Executive Travel (+44 1322 221122)<br>
          <strong>European Emergency Services:</strong> 112 (Police, Ambulance, Fire)
        </div>
      </div>

      <!-- Essential Battlefield Glossary -->
      <div style="margin-bottom: 4px;">
        <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Essential Battlefield Glossary
        </div>
        <table class="compact-table">
          <tbody>
            <tr>
              <td style="width: 25%;"><strong>ADS</strong></td>
              <td><strong>Advanced Dressing Station:</strong> Medical bunker behind lines for immediate triage.</td>
            </tr>
            <tr>
              <td><strong>CCS</strong></td>
              <td><strong>Casualty Clearing Station:</strong> Large hospital facility (e.g. Lijssenthoek) 8 miles behind front.</td>
            </tr>
            <tr>
              <td><strong>A-Frames</strong></td>
              <td>Wooden V-frames supporting duckboards above stagnant Flemish mud.</td>
            </tr>
            <tr>
              <td><strong>Traverse</strong></td>
              <td>U-shaped earth baffle preventing shell shrapnel from spreading down trenches.</td>
            </tr>
            <tr>
              <td><strong>Enfilade</strong></td>
              <td>Fire directed down the entire length of a trench line from the flank.</td>
            </tr>
            <tr>
              <td><strong>Kameradengrab</strong></td>
              <td>Mass burial plot holding thousands of German fallen (e.g. 24,917 at Langemarck).</td>
            </tr>
            <tr>
              <td><strong>Stone of Memory</strong></td>
              <td>Lutyens' altar stone carved with Kipling's <em>"Their Name Liveth For Evermore"</em>.</td>
            </tr>
            <tr>
              <td><strong>Cross of Sacrifice</strong></td>
              <td>Blomfield's Portland stone cross with an embedded bronze broadsword.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Flemish Toponyms -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; margin-bottom: 4px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 1px;">
          Flemish Toponyms Guide
        </div>
        <div style="font-size: 6.3pt; color: #475569; line-height: 1.23;">
          <strong>Ieper:</strong> Flemish for Ypres · <strong>Poperinge:</strong> British staging town nicknamed <em>"Pop"</em> · <strong>Mesen:</strong> Historic Messines · <strong>Menenpoort:</strong> Menin Gate · <strong>Lakenhalle:</strong> Medieval Cloth Hall.
        </div>
      </div>

      <!-- Closing Dedication -->
      <div style="background: #eff6ff; border: 1.2px solid #bfdbfe; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 4px 7px;">
        <div style="font-size: 6.7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 1px;">
          The Department Dedication
        </div>
        <p style="font-size: 6.4pt; color: #1e293b; line-height: 1.23; margin: 0;">
          "Dedicated to the memory of the fallen of our home parish of Holy Rood and the countless thousands who lie in the quiet earth of Flanders. We will remember them."
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Pocket Field Guide</span>
      <span class="page-number">Page 16 of 16</span>
    </div>
  </div>

</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres Tour Leader A5 Pocket Field Guide (16 Pages)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  const html = getHtmlContent();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Evaluate page heights to guarantee zero overflow
  const pageEvaluations = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((p, idx) => ({
      pageIndex: idx + 1,
      scrollHeight: p.scrollHeight,
      clientHeight: p.clientHeight,
      overflowPx: Math.max(0, p.scrollHeight - p.clientHeight),
    }));
  });

  console.log('Page Height & Overflow Audit:');
  pageEvaluations.forEach((p) => {
    console.log(
      `Page ${p.pageIndex}: scroll=${p.scrollHeight}px, client=${p.clientHeight}px, overflow=${p.overflowPx}px`,
    );
  });

  const totalOverflow = pageEvaluations.reduce((sum, p) => sum + p.overflowPx, 0);
  if (totalOverflow > 0) {
    console.warn(`⚠️ Warning: Detected ${totalOverflow}px overflow across pages!`);
  } else {
    console.log('✅ Perfect 0px overflow across all 16 pages!');
  }

  await page.pdf({
    path: outputPath,
    width: '148mm',
    height: '210mm',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log('✅ Ypres Tour Leader Pocket Guide PDF successfully created at:', outputPath);
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating Tour Leader Pocket Guide PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
