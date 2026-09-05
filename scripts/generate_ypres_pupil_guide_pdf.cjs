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
      font-size: 9.4pt;
      line-height: 1.52;
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
      padding-bottom: 6px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 12.8pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
    }

    .school-sub {
      font-size: 8.8pt;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
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
      font-size: 7.6pt;
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
      border-radius: 8px;
      padding: 13px 18px;
      margin-bottom: 11px;
      box-shadow: 0 1px 4px rgba(217, 119, 6, 0.06);
    }

    .reading-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 12.8pt;
      font-weight: 700;
      color: #78350f;
      margin-bottom: 3px;
    }

    .reading-box .poet-meta {
      font-size: 8.4pt;
      color: #92400e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }

    .reading-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 10.6pt;
      color: #451a03;
      line-height: 1.62;
      white-space: pre-line;
    }

    /* Poet Biographical Card */
    .poet-bio-card {
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 9px 11px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .poet-bio-card img {
      width: 95px;
      height: 124px;
      object-fit: cover;
      border-radius: 5px;
      border: 1.5px solid #cbd5e1;
      margin-bottom: 6px;
    }

    .poet-bio-card .poet-name {
      font-family: 'Playfair Display', serif;
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.22;
    }

    .poet-bio-card .poet-dates {
      font-size: 7.8pt;
      font-weight: 700;
      color: #b45309;
      margin-bottom: 4px;
    }

    .poet-bio-card .poet-desc {
      font-size: 8pt;
      color: #475569;
      line-height: 1.44;
      text-align: left;
    }

    /* Pupil Inquiry / Field Reflection Box */
    .inquiry-box {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      border-radius: 8px;
      padding: 11px 15px;
      margin-bottom: 11px;
    }

    .inquiry-box .inquiry-header {
      font-size: 9.3pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .inquiry-box .inquiry-content {
      font-size: 8.8pt;
      color: #1e293b;
      line-height: 1.48;
    }

    /* Field Inquiry / Historical Reference Callout Box */
    .field-focus-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 5px solid #1e3a8a;
      border-radius: 8px;
      padding: 11px 15px;
      margin-top: 10px;
      margin-bottom: 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .field-focus-box .focus-header {
      font-size: 9.3pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .field-focus-box .focus-content {
      font-size: 8.8pt;
      color: #334155;
      line-height: 1.48;
    }

    /* Photo Cards */
    .photo-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 7px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .photo-card img {
      width: 100%;
      border-radius: 6px;
      object-fit: cover;
      display: block;
    }

    .photo-card .caption {
      font-size: 8pt;
      color: #475569;
      font-style: italic;
      margin-top: 5px;
      line-height: 1.38;
      text-align: left;
    }

    /* Grid Layouts */
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    /* Tables */
    .companion-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.8pt;
    }

    .companion-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 6px 9px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .companion-table td {
      padding: 6px 9px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
      line-height: 1.42;
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

      <!-- Grand Cover Photograph of Stubbington Memorial -->
      <div style="margin: 0 auto; max-width: 530px; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.12); border: 2.5px solid #cbd5e1; background: #ffffff;">
        <img src="${stubbingtonMem}" alt="The War Memorial at Holy Rood Church Stubbington" style="width: 100%; height: 260px; object-fit: cover; display: block;">
        <div style="background: #ffffff; padding: 7px 12px; font-size: 8pt; color: #475569; font-style: italic; border-top: 1px solid #e2e8f0;">
          The War Memorial at Holy Rood Church, Stubbington — Commemorating our village fallen whose graves and memorial panels we visit across the Salient.
        </div>
      </div>
    </div>

    <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 8.6pt; color: #334155; margin-bottom: 8px;">
      <div style="text-align: left;">
        <strong style="color: #1e3a8a;">TOUR LEADERS:</strong><br>
        Mr Ben Lovett (Head of History) &amp; Mr James Garrett (The History Boys)
      </div>
      <div style="text-align: right;">
        <strong style="color: #1e3a8a;">ACCOMPANYING STAFF:</strong><br>
        Dr Kirkup &amp; Mrs Lushey
      </div>
    </div>

    <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #b45309; border-radius: 8px; padding: 10px 14px; text-align: left; margin-bottom: 6px;">
      <div style="font-size: 8.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
        The Purpose of Our Journey: A Pilgrimage of Remembrance
      </div>
      <p style="font-size: 8.5pt; color: #334155; line-height: 1.45; margin: 0 0 6px 0;">
        This field study across the Ypres Salient is not a casual excursion—it is a solemn educational pilgrimage. We journey from our home parish of Stubbington to the ramparts, craters, and sanctuaries of Flanders to walk the ground where a generation sacrificed their youth, and to honour the local sons whose names are carved forever into Holy Rood Church.
      </p>
      <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 9.2pt; color: #1e3a8a; padding-left: 10px; border-left: 2px solid #93c5fd; margin-top: 4px;">
        "They shall grow not old, as we that are left grow old:<br>
        Age shall not weary them, nor the years condemn.<br>
        At the going down of the sun and in the morning<br>
        We will remember them."<br>
        <span style="font-size: 7.8pt; color: #64748b; font-style: normal; font-family: 'Outfit', sans-serif;">— Laurence Binyon, <em>For the Fallen</em> (September 1914)</span>
      </div>
    </div>

    <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 7px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 8.2pt; color: #1e3a8a;">
      <div><strong>Expedition Dates:</strong> 1st–3rd October 2026</div>
      <div><strong>Field Base:</strong> Peace Village, Mesen</div>
      <div><strong>Base Emergency:</strong> +44 (0)1329 288339</div>
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
          <div class="school-sub">1st–3rd October 2026 · Three-Day Operational Timetable</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Field Route</div>
          <div class="lead">10 Historic Stops</div>
        </div>
      </div>

      <!-- Overview Map -->
      <div class="photo-card" style="margin-bottom: 10px; padding: 6px;">
        <img src="${salientMap}" alt="Strategic Map of the Ypres Salient" style="height: 172px; object-fit: contain; background: #ffffff;">
        <div class="caption">
          Strategic Overview of the Ypres Salient (1914–1918): Showing frontlines, allied arcs, and major battlefield sites.
        </div>
      </div>

      <h3 style="font-size: 10.8pt; color: #1e3a8a; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em;">
        Expedition Schedule
      </h3>

      <table class="companion-table" style="margin-bottom: 10px; font-size: 8.6pt;">
        <thead>
          <tr>
            <th style="width: 18%; padding: 5px 8px;">Day / Time</th>
            <th style="width: 32%; padding: 5px 8px;">Location &amp; Activity</th>
            <th style="width: 50%; padding: 5px 8px;">Pupil Focus &amp; Key Enquiry</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 1 · 05:45</strong></td>
            <td style="padding: 4.8px 8px;">Depart Meoncross School · Folkestone Eurotunnel Crossing</td>
            <td style="padding: 4.8px 8px;">Travel logistics, Eurotunnel transit under the Channel, arrival in Flanders.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 1 · 14:15</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 1:</strong> Essex Farm ADS &amp; Canal Bank</td>
            <td style="padding: 4.8px 8px;">Triage bunkers, McCrae's <em>In Flanders Fields</em>, grave of 15-year-old Valentine Strudwick.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 1 · 15:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 2:</strong> Yorkshire Trench &amp; Dugout</td>
            <td style="padding: 4.8px 8px;">Restored British front trench; inspect A-frames, fire-bays, and duckboards.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 1 · 16:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 3:</strong> Langemarck German Cemetery</td>
            <td style="padding: 4.8px 8px;"><em>Studentenfriedhof</em>, 24,917 fallen in the <em>Kameradengrab</em>, Krieger sculptures.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 1 · 18:30</strong></td>
            <td style="padding: 4.8px 8px;">Check-in: Peace Village Hostel, Mesen</td>
            <td style="padding: 4.8px 8px;">Room allocation, dinner, evening seminar &amp; equipment preparation.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 2 · 09:15</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 4:</strong> Vancouver Corner (Brooding Soldier)</td>
            <td style="padding: 4.8px 8px;">First German gas attack (22 April 1915); Canadian heroic stand; gas warfare analysis.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 2 · 10:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 5:</strong> Hooge Crater Museum &amp; Trenches</td>
            <td style="padding: 4.8px 8px;">Mine crater warfare, preserved trench systems and early flamethrower attacks.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 2 · 13:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 6:</strong> Tyne Cot Commonwealth Cemetery</td>
            <td style="padding: 4.8px 8px;">Passchendaele ridge; pillbox Cross of Sacrifice; Stubbington parish fallen (Newman, Ward, Muckett, Rye, Warland).</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 2 · 16:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 7:</strong> Ypres Ramparts Cemetery &amp; Walk</td>
            <td style="padding: 4.8px 8px;">Vauban's 17th-century moated brick ramparts; casualty clearing stations.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 2 · 19:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 8:</strong> The Menin Gate Last Post Ceremony</td>
            <td style="padding: 4.8px 8px;">54,395 names of the missing; Meoncross School official wreath laying at 20:00.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 3 · 09:30</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 9:</strong> Ypres Cloth Hall &amp; Grote Markt</td>
            <td style="padding: 4.8px 8px;">The rebirth of Ypres; Churchill's ruins proposal vs Flemish stone-for-stone reconstruction.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 3 · 11:15</strong></td>
            <td style="padding: 4.8px 8px;"><strong>Stop 10:</strong> Talbot House (Toc H), Poperinge</td>
            <td style="padding: 4.8px 8px;">Tubby Clayton's 'Everyman's Club'; upper room hop-loft chapel; fellowship behind lines.</td>
          </tr>
          <tr>
            <td style="padding: 4.8px 8px;"><strong>Day 3 · 14:00</strong></td>
            <td style="padding: 4.8px 8px;">Calais Eurotunnel (Le Shuttle) · Return to School</td>
            <td style="padding: 4.8px 8px;">Final reflection journal completion; arrival back at Meoncross approx. 19:30.</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 7px; padding: 8px 12px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🎒 Essential Field Guidelines for Pupils
        </div>
        <div style="font-size: 8pt; color: #1e293b; line-height: 1.38;">
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
          <div class="school-sub">Manor Way Grange · Three Brothers, Three Fronts, Immense Sibling Sacrifice</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Local Fallen</div>
          <div class="lead">Gallipoli, Somme &amp; Arras</div>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e3a8a; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px;">
        <h3 style="font-size: 11.8pt; color: #1e3a8a; margin-bottom: 4px;">A Family's Total Sacrifice: The Lowry Brothers</h3>
        <p style="font-size: 9pt; color: #334155; margin: 0; line-height: 1.5;">
          William and Annie Lowry lived in a grand twenty-room house called Manor Way Grange in Lee-on-the-Solent. All three of their sons answered the call to arms, serving as commissioned officers in the British and Indian Armies. Tragically, every single son was killed in action across three different battlefronts. Not one of them returned home.
        </p>
      </div>

      <div class="grid-3col" style="margin-bottom: 12px; align-items: stretch;">
        <!-- William -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryWilliam}" alt="Lieut. William Lowry" style="width: 104px; height: 134px; object-fit: cover; border-radius: 5px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lieut. William Lowry</h4>
            <div style="font-size: 7.8pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">8th Gurkha Rifles (Indian Army)</div>
            <p style="font-size: 8.3pt; color: #475569; line-height: 1.45; margin: 0;">
              Eldest brother (aged 25); Cambridge scholar. Killed 4 June 1915 leading a desperate charge up Gully Ravine, Gallipoli, under devastating Turkish machine-gun fire.<br><br>
              Body never recovered. Commemorated on the Helles Memorial, Turkey.
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 5px; border-radius: 4px; font-size: 7.6pt; color: #1e293b; font-weight: 700; margin-top: 7px; text-align: center;">
            📍 Helles Memorial, Gallipoli
          </div>
        </div>

        <!-- Cyril -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryCyril}" alt="Capt. Cyril Lowry" style="width: 104px; height: 134px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Capt. Cyril Lowry</h4>
            <div style="font-size: 7.8pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">2nd Bn, West Yorkshire Regt</div>
            <p style="font-size: 8.3pt; color: #475569; line-height: 1.45; margin: 0;">
              Youngest brother (aged 20). Served in same battalion commanded by older brother Eric. Killed 25 March 1918 defending Somme crossing at Eterpigny.<br><br>
              Fell in full view of Eric; body lost in withdrawal. Commemorated on Pozières Memorial.
            </p>
          </div>
          <div style="background: #fef3c7; padding: 5px; border-radius: 4px; font-size: 7.6pt; color: #92400e; font-weight: 700; margin-top: 7px; text-align: center;">
            📍 Pozières Memorial, Somme
          </div>
        </div>

        <!-- Eric -->
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="text-align: center; margin-bottom: 7px;">
              <img src="${lowryEric}" alt="Lt Col Eric Lowry" style="width: 104px; height: 134px; object-fit: cover; border-radius: 4px; border: 1.5px solid #94a3b8;">
            </div>
            <h4 style="font-size: 10.4pt; color: #0f172a; margin-bottom: 2px; text-align: center;">Lt. Col. Eric Lowry</h4>
            <div style="font-size: 7.8pt; font-weight: 700; color: #b45309; text-align: center; margin-bottom: 6px;">2nd Bn, West Yorkshire Regt (DSO, MC)</div>
            <p style="font-size: 8.3pt; color: #475569; line-height: 1.45; margin: 0;">
              Middle brother (aged 25). Commanded 2nd West Yorkshires at Westhoek Ridge and Somme. Awarded DSO, MC &amp; Bar, French Croix de Guerre.<br><br>
              Killed 23 September 1918 by machine gun inspecting outposts near Arleux, dying in runner's arms. Buried at La Targette.
            </p>
          </div>
          <div style="background: #fee2e2; padding: 5px; border-radius: 4px; font-size: 7.6pt; color: #991b1b; font-weight: 700; margin-top: 7px; text-align: center;">
            📍 La Targette British Cemetery (Plot I. C. 2)
          </div>
        </div>
      </div>

      <div class="inquiry-box" style="margin-bottom: 11px; padding: 12px 16px;">
        <div class="inquiry-header">🔍 Historical Inquiry: The Concentrated Grief of Sibling Enlistment</div>
        <div class="inquiry-content" style="font-size: 9pt; line-height: 1.5;">
          The tragedy of the Lowry brothers illustrates how the Great War shattered entire households. Rather than casualties spreading evenly across populations, sibling enlistment and Pals Battalions meant that catastrophic losses were concentrated in specific families. How does investigating the Lowrys help us grasp the profound, localized grief experienced across communities like Stubbington and Lee-on-the-Solent?
        </div>
      </div>

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 11px; padding: 12px 16px;">
        <div class="focus-header">🏛️ Local Parish Connection: The Lowry Memorial Hall &amp; Crofton Tablet</div>
        <div class="focus-content" style="font-size: 9pt; line-height: 1.5;">
          Devastated by the loss of all three sons, their father William Lowry funded and built the <strong>Lowry Memorial Hall</strong> in Lee-on-the-Solent so his boys would never be forgotten. On the marble tablet inside Holy Rood Church, the three brothers' names are inscribed together in Column 2 under the Army section. Note how their resting places span thousands of miles—from Turkey to the Somme and Arras—yet local parish memorials reunite them forever in their home community.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 15px;">
        <div style="font-size: 9.2pt; font-weight: 800; color: #1e3a8a; margin-bottom: 3px;">
          📖 Memorial Record: Stubbington War Memorial Inscription
        </div>
        <div style="font-size: 8.8pt; color: #475569; line-height: 1.48;">
          On the North Beam of the wooden pump shelter in the village square, locate the names: <em>"LIEUT. W. A. H. LOWRY · CAPT. C. J. P. LOWRY · LT. COL. A. E. E. LOWRY, M.C., D.S.O."</em> Reflect on how village memorials served as surrogate tombstones for families whose sons lay in distant or unmarked graves.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 12px;">
        <div>
          <h3 style="font-size: 11.8pt; color: #1e3a8a; margin-bottom: 6px;">The Holy Rood Memorial Roll</h3>
          <p style="font-size: 9pt; color: #334155; line-height: 1.5; margin-bottom: 9px;">
            The marble memorial tablet inside Holy Rood Church, Stubbington, records the names of men from our village parish who did not return. Six of these local heroes fell directly in the Ypres Salient:
          </p>
          <table class="companion-table" style="font-size: 9pt;">
            <thead>
              <tr>
                <th style="padding: 7px 9px;">Soldier</th>
                <th style="padding: 7px 9px;">Regiment / Unit</th>
                <th style="padding: 7px 9px;">Salient Commemoration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>Pte. Walter Spratt</strong></td>
                <td style="padding: 7.5px 9px;">1st Bn, Hampshire Regt</td>
                <td style="padding: 7.5px 9px;">Ploegsteert Memorial (Missing)</td>
              </tr>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>Sgt. Frank Rogers</strong></td>
                <td style="padding: 7.5px 9px;">2nd Bn, Hampshire Regt</td>
                <td style="padding: 7.5px 9px;">Menin Gate (Panel 35)</td>
              </tr>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>L/Cpl. Arthur Newman</strong></td>
                <td style="padding: 7.5px 9px;">Royal Engineers (Signals)</td>
                <td style="padding: 7.5px 9px;">Tyne Cot Memorial Wall</td>
              </tr>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>Pte. George Stares</strong></td>
                <td style="padding: 7.5px 9px;">8th Bn, Hampshire Regt</td>
                <td style="padding: 7.5px 9px;">Bedford House Cemetery</td>
              </tr>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>Dvr. Edward Vear</strong></td>
                <td style="padding: 7.5px 9px;">Royal Field Artillery</td>
                <td style="padding: 7.5px 9px;">Brandhoek Military Cemetery</td>
              </tr>
              <tr>
                <td style="padding: 7.5px 9px;"><strong>Cpl. Harry Freemantle</strong></td>
                <td style="padding: 7.5px 9px;">Royal Marine Artillery</td>
                <td style="padding: 7.5px 9px;">Dunkirk / Ypres Coastal Sector</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="photo-card" style="margin-bottom: 9px; padding: 8px;">
            <img src="${tabletImg}" alt="Holy Rood Church Tablet" style="height: 195px; object-fit: cover; border-radius: 6px;">
            <div class="caption">The Memorial Tablet inside Holy Rood Church, Stubbington, commemorating our parish fallen.</div>
          </div>
          <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 14px; font-size: 8.8pt; color: #334155; line-height: 1.48;">
            <strong>Parish Pilgrimage Mission:</strong> These men walked the same village lanes we walk every day in Stubbington. At each cemetery, we will halt and lay a personal school remembrance cross at their names.
          </div>
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 13px 18px; margin-bottom: 11px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <h3 style="font-size: 11.8pt; color: #991b1b; margin: 0;">Case Study: Private Valentine Joe Strudwick (Age 15)</h3>
          <span style="font-size: 8.2pt; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 3px 8px; border-radius: 5px;">Essex Farm · Plot I. U. 8</span>
        </div>
        <p style="font-size: 9pt; color: #450a0a; line-height: 1.52; margin: 0 0 7px 0;">
          Valentine Strudwick of Dorking enlisted at just 14 years old, claiming he was 19. Sent to the freezing frontline trenches of the Boezinge Canal bank, he survived months of brutal artillery bombardments before being killed in action on 14 January 1916—one month before his 16th birthday. He remains one of the youngest recorded British casualties in the Great War.
        </p>
        <div style="font-size: 8.8pt; font-weight: 700; color: #7f1d1d; font-style: italic;">
          Mother's Chosen Inscription: "Not Gone From Memory, Not Gone From Love, But Gone To Our Father's Home Above."
        </div>
      </div>

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 11px; padding: 12px 16px;">
        <div class="focus-header">🔍 Historical Analysis: Underage Enlistment &amp; The 'Boy Soldiers'</div>
        <div class="focus-content" style="font-size: 9pt; line-height: 1.5;">
          An estimated 250,000 British boys under the legal fighting age of 19 served in the First World War. Driven by peer pressure, patriotic propaganda, economic hardship, and recruiting sergeants who received a cash bounty of half-a-crown for every volunteer enrolled, teenagers like Valentine Strudwick altered their birth certificates to reach the frontlines. Standing before Strudwick's headstone at Essex Farm, reflect on his age (15) compared to your own life today, and how industrial shellfire wiped out an entire generation before their adult lives could begin.
        </div>
      </div>

      <div style="background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 15px;">
        <div style="font-size: 9.2pt; font-weight: 800; color: #1e3a8a; margin-bottom: 3px;">
          📍 Locating Parish Fallen in the Salient
        </div>
        <div style="font-size: 8.8pt; color: #475569; line-height: 1.46;">
          When arriving at Menin Gate, locate <strong>Frank Rogers</strong> on Panel 35 under Hampshire Regiment. At Tyne Cot, inspect the rear stone wall panels for <strong>Arthur Newman</strong>. Notice how individual identification bridges the gap between massive casualty rolls and human memory.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 12px; align-items: stretch;">
        <div class="photo-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 8px;">
          <img src="${headstoneImg}" alt="CWGC Headstone Anatomy" style="height: 310px; object-fit: contain; background: #ffffff; border-radius: 6px;">
          <div class="caption" style="font-size: 8.2pt; margin-top: 6px;">Standard CWGC Portland Stone Headstone (81cm high, 38cm wide, 7.5cm thick). Every fallen soldier receives identical dignity regardless of rank.</div>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 12pt; color: #1e3a8a; margin-bottom: 8px;">The 5 Elements of a CWGC Headstone</h3>
            <div style="font-size: 9.2pt; color: #334155; line-height: 1.56;">
              <div style="margin-bottom: 8px;">
                <strong style="color: #1e3a8a;">1. Regimental Badge:</strong> Distinctive regimental insignia carved at the top with extraordinary architectural precision.
              </div>
              <div style="margin-bottom: 8px;">
                <strong style="color: #1e3a8a;">2. Identification:</strong> Service Number, Rank, Full Name, Honours, and Unit. General officers and privates receive identical uniform markers.
              </div>
              <div style="margin-bottom: 8px;">
                <strong style="color: #1e3a8a;">3. Religious Emblem:</strong> Latin Cross, Star of David, or left intentionally blank for secular or non-Christian soldiers.
              </div>
              <div style="margin-bottom: 8px;">
                <strong style="color: #1e3a8a;">4. Date &amp; Age:</strong> The exact date of death and soldier's age at the time of sacrifice.
              </div>
              <div>
                <strong style="color: #1e3a8a;">5. Personal Inscription:</strong> Up to 66 letters chosen and funded by the grieving family back home.
              </div>
            </div>
          </div>

          <div style="background: #fefce8; border: 1.5px solid #fde047; padding: 9px 12px; border-radius: 6px; font-size: 8.8pt; color: #854d0e; line-height: 1.45; margin-top: 8px;">
            <strong>Unidentified Soldiers:</strong> Inscribed with Rudyard Kipling's universal epitaph: <em>"A Soldier of the Great War — Known Unto God."</em> Over 8,300 lie at Tyne Cot alone.
          </div>
        </div>
      </div>

      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 13px 17px; margin-bottom: 11px;">
        <h3 style="font-size: 11.5pt; color: #0f172a; margin-bottom: 6px;">The Geography of the Salient: Why Did So Many Die Here?</h3>
        <p style="font-size: 9.1pt; color: #475569; line-height: 1.52; margin: 0 0 9px 0;">
          A <strong>salient</strong> is an outward bulge in military frontlines, surrounded by the enemy on three sides. British, Canadian, Australian, and French troops defending Ypres were overlooked by German artillery observers on high ground (Messines and Passchendaele Ridges). German gun batteries could converge lethal shellfire from the north, east, and south simultaneously.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 8.8pt; color: #1e293b;">
          <div style="background: #f1f5f9; padding: 9px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e3a8a;">Flemish Clay &amp; Water Table:</strong> Digging only inches struck water; destroyed drainage dykes turned shell craters into deadly lakes of liquid mud.
          </div>
          <div style="background: #f1f5f9; padding: 9px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e3a8a;">Converging Artillery Arcs:</strong> Enfilade artillery fire meant no position was safe; heavy explosive shells caused over 70% of all battlefield casualties.
          </div>
        </div>
      </div>

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 11px; padding: 12px 16px;">
        <div class="focus-header">🏷️ Field Study Focus: Royal Hampshire Regiment Badges &amp; Inscriptions</div>
        <div class="focus-content" style="font-size: 9pt; line-height: 1.52;">
          As we examine CWGC headstones across the Salient, search for the <strong>Royal Tiger and Hampshire Rose</strong> badge of our local county regiment. Note the personal inscriptions carved at the foot of each stone—chosen and paid for by grieving parents and widows back in Stubbington, Fareham, and Portsmouth. Observe how some express steadfast Christian hope (<em>"Thy Will Be Done"</em>), others classical Roman duty (<em>"Dulce et Decorum Est"</em>), and some profound personal heartbreak: <em>"A Day of Memory Sad to Recall, Without Goodbye He Left Us All."</em>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 8px; padding: 11px 15px;">
          <div style="font-size: 9.2pt; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
            ⚖️ The Radical Equality of CWGC
          </div>
          <div style="font-size: 8.6pt; color: #14532d; line-height: 1.46;">
            Founder <strong>Sir Fabian Ware</strong> established three non-negotiable principles: (1) no distinction of rank; (2) uniform headstones; and (3) no repatriation, ensuring generals and privates lie together forever in the Flemish soil.
          </div>
        </div>

        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 11px 15px;">
          <div style="font-size: 9.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
            🎯 Field Observation Hinge Question
          </div>
          <div style="font-size: 8.6pt; color: #1e293b; line-height: 1.46;">
            The CWGC charged families 3½d per letter for personal inscriptions, but paid for the stone. Why allow individual family epitaphs while strictly enforcing uniform stone design and banning private crosses?
          </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 7px;">
            <img src="${essexFarm}" alt="Essex Farm Bunkers" style="height: 125px; object-fit: cover;">
            <div class="caption">Concrete bunkers of Essex Farm ADS dug into the canal embankment.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 8.2pt; color: #334155; line-height: 1.4;">
            <strong>Advanced Dressing Station (ADS):</strong> Frontline triage post where surgeons worked by candlelight treating catastrophic wounds. John McCrae penned <em>In Flanders Fields</em> here on 3 May 1915.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${mccraeImg}" alt="Lt. Col. John McCrae">
          <div class="poet-name">Lt. Col. John McCrae</div>
          <div class="poet-dates">1872–1918 · Canadian Army Medical Corps</div>
          <div class="poet-desc">
            Physician and soldier from Guelph, Ontario. Served as brigade surgeon during Second Ypres. Penned his famous poem in the back of an ambulance on 3 May 1915 following the funeral of his friend Lt. Alexis Helmer. Died of pneumonia in France in 1918.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 10px;">
        <div class="poem-title">In Flanders Fields</div>
        <div class="poet-meta">By Lt. Col. John McCrae · Composed at Essex Farm, 3 May 1915</div>
        <div class="poem-lines" style="font-size: 10.4pt; line-height: 1.58;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">🏥 Medical Triage Analysis: The Chain of Evacuation</div>
        <div class="focus-content">
          Essex Farm operated as an Advanced Dressing Station (ADS) cut directly into the canal bank, mere hundreds of yards behind frontline communication saps. Medical officers performed desperate emergency triage—arresting catastrophic hemorrhages, applying field splints, and administering morphine—before stretcher-bearers evacuated wounded men in horse-drawn or motor ambulances to Casualty Clearing Stations (CCS) at Brandhoek and Base Hospitals on the French coast.
        </div>
      </div>

      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          ⛏️ Stop 2 Archaeological Insight: Yorkshire Trench Restoration
        </div>
        <div style="font-size: 8.5pt; color: #14532d; line-height: 1.45;">
          Discovered by amateur Belgian archaeologists ('The Diggers') in 1992 in an expanding industrial zone, Yorkshire Trench preserves original 1915 British frontlines. Notice the timber A-frames supporting duckboards above waterlogged clay, recessed fire-steps, and the deep entrance shafts to the 1917 dugout shelter deep below the water table.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 13px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 11pt; color: #1e3a8a; margin-bottom: 5px;">The Somber Atmosphere of Langemarck</h3>
            <p style="font-size: 8.4pt; color: #334155; line-height: 1.45; margin: 0 0 8px 0;">
              Langemarck stands in powerful contrast to the white Portland stone of CWGC cemeteries. Known as the <em>Studentenfriedhof</em>, it commemorates thousands of student volunteers fallen in autumn 1914.
            </p>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 6px; font-size: 8pt; color: #475569; line-height: 1.4;">
              <strong>Kameradengrab (Comrades' Grave):</strong> 24,917 German soldiers buried together in a single mass burial.<br>
              <strong>Emil Krieger's Statues:</strong> Four bronze mourning soldiers standing sentinel beneath towering oak trees.
            </div>
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${sorleyImg}" alt="Charles Hamilton Sorley">
          <div class="poet-name">Charles Hamilton Sorley</div>
          <div class="poet-dates">1895–1915 · Captain, 7th Suffolk Regiment</div>
          <div class="poet-desc">
            Scottish poet born in Aberdeen; educated at Marlborough and Oxford. Lived in Germany before the war and admired German culture. Killed by a sniper at the Battle of Loos on 13 October 1915, aged 20. His stark sonnet was recovered from his kitbag after his death, stripping away patriotic vanity.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 10px;">
        <div class="poem-title">When You See Millions of the Mouthless Dead</div>
        <div class="poet-meta">By Charles Hamilton Sorley · Found in his kitbag, October 1915</div>
        <div class="poem-lines" style="font-size: 10.4pt; line-height: 1.58;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">⚖️ Comparative Historiography: German vs Commonwealth Commemoration</div>
        <div class="focus-content">
          Notice the stark architectural contrast between Langemarck and Commonwealth cemeteries. Whereas British CWGC sites celebrate radical individual equality with white Portland stone and manicured English cottage borders, the German War Graves Commission utilized dark volcanic basalt, collective mass graves (the <em>Kameradengrab</em> holding 24,917 men), and sheltering oak trees to express communal tragedy, somber defeat, and the heavy weight of national grief.
        </div>
      </div>

      <div style="background: #fefce8; border: 1.5px solid #fde047; border-left: 5px solid #ca8a04; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #854d0e; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          🥀 The Myth of Langemarck: Propaganda vs Reality
        </div>
        <div style="font-size: 8.5pt; color: #713f12; line-height: 1.45;">
          German wartime communiqués claimed thousands of young student volunteers charged across the beet fields towards British lines singing <em>"Deutschland über alles"</em>. In reality, untrained youths were sent forward in dense columns directly into devastating British rapid rifle fire (the 'Old Contemptibles'). Interwar propagandists mythologized their slaughter as heroic self-sacrifice.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 7px;">
            <img src="${hoogeCrater}" alt="Hooge Crater Museum" style="height: 125px; object-fit: cover;">
            <div class="caption">The Hooge Crater site: Where underground mines blew massive chasms in the ridge.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 8.2pt; color: #334155; line-height: 1.4;">
            <strong>Vancouver Corner &amp; Hooge:</strong> On 22 April 1915, German forces released 168 tons of chlorine gas. Canadian troops heroically held the line. At Hooge, tunnelling units detonated 1,700lb ammonal mines.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${rosenbergImg}" alt="Isaac Rosenberg">
          <div class="poet-name">Isaac Rosenberg</div>
          <div class="poet-dates">1890–1918 · Private, King's Own Royal Lancaster Regt</div>
          <div class="poet-desc">
            Working-class Jewish painter and poet from Whitechapel; studied at the Slade School of Art. Enlisted in a 'Bantam' battalion (for men under 5ft 3in). Wrote visceral poetry on scraps of cardboard in Flemish mud. Killed in action near Arras on 1 April 1918 during the German Spring Offensive.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 10px;">
        <div class="poem-title">Break of Day in the Trenches</div>
        <div class="poet-meta">By Isaac Rosenberg · Written in Flanders mud, June 1916</div>
        <div class="poem-lines" style="font-size: 10.2pt; line-height: 1.54;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">⚡ Technological Revolution: Gas Warfare &amp; Underground Mining</div>
        <div class="focus-content">
          The Ypres Salient served as the terrifying testbed of modern industrial warfare. At Vancouver Corner on 22 April 1915, the German Army released 168 metric tons of chlorine gas, creating a deadly green cloud four miles wide that devastated Algerian and French colonial divisions before Canadian units heroically plugged the breach. At Hooge Crater, British tunneling companies dug hundreds of feet beneath German lines to detonate enormous ammonal mine charges, forever transforming the ridge.
        </div>
      </div>

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          🍁 Stop 4 Focus: Vancouver Corner &amp; 'The Brooding Soldier'
        </div>
        <div style="font-size: 8.5pt; color: #1e293b; line-height: 1.45;">
          Sculpted by Frederick Chapman Clemesha, the 33-foot granite bust of <em>The Brooding Soldier</em> towers over Vancouver Corner with hands resting on reversed arms and head bowed in solemn grief. It honors 2,000 Canadians of the 1st Canadian Division who fell holding the frontline during the world's first large-scale chemical weapons attack.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 7px;">
            <img src="${tyneCot}" alt="Tyne Cot Cemetery" style="height: 125px; object-fit: cover;">
            <div class="caption">The Cross of Sacrifice erected atop a captured German pillbox at Tyne Cot.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 8.2pt; color: #334155; line-height: 1.4;">
            <strong>The Largest Commonwealth Cemetery:</strong> 11,961 soldiers lie buried here, 8,369 of them unidentified. Architect Sir Herbert Baker incorporated three captured German machine-gun pillboxes directly into the cemetery.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${binyonImg}" alt="Laurence Binyon">
          <div class="poet-name">Laurence Binyon</div>
          <div class="poet-dates">1869–1943 · British Museum Curator &amp; Red Cross Orderly</div>
          <div class="poet-desc">
            Scholar of art and poetry who volunteered as a hospital orderly in France in 1916 caring for wounded soldiers. Wrote <em>For the Fallen</em> while sitting on the cliffs of North Cornwall in September 1914. Its central stanza was adopted across the English-speaking world as the universal Ode of Remembrance.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 10px;">
        <div class="poem-title">For the Fallen (The Ode of Remembrance)</div>
        <div class="poet-meta">By Laurence Binyon · September 1914 · Recited Nightly at the Menin Gate</div>
        <div class="poem-lines" style="font-size: 10.5pt; line-height: 1.6;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">🏛️ Architectural Symbolism: The Cross Over the Pillbox</div>
        <div class="focus-content">
          While <strong>Sir Reginald Blomfield</strong> designed the universal CWGC Cross of Sacrifice pattern, cemetery architect <strong>Sir Herbert Baker</strong> made the inspired decision to site Tyne Cot's great Portland stone Cross directly atop a captured German concrete machine-gun bunker in the centre of the cemetery. The bronze broadsword points downward upon the captured pillbox, symbolizing the ultimate triumph of sacrifice and peace over instruments of war. Along the sweeping curved flint memorial wall behind the cross, Baker had carved the names of 34,984 soldiers with no known grave who fell in the catastrophic mud of Passchendaele.
        </div>
      </div>

      <div style="background: #fdf2f8; border: 1.5px solid #fbcfe8; border-left: 5px solid #db2777; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #9d174d; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          🌹 Stubbington Parish Fallen at Tyne Cot: L/Cpl Arthur Newman
        </div>
        <div style="font-size: 8.5pt; color: #831843; line-height: 1.45;">
          Locate Panel 8 on the Memorial Wall for <strong>Lance Corporal Arthur Newman</strong> (Royal Engineers 153rd Field Company), born and raised in Stubbington. He fell during the Third Battle of Ypres. Like thousands of his comrades, his body was swallowed by the Passchendaele quagmire and never found. Reflect on how this wall restores his name to perpetual memory.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <div>
          <div class="photo-card" style="margin-bottom: 7px;">
            <img src="${meninGate}" alt="The Menin Gate Ypres" style="height: 125px; object-fit: cover;">
            <div class="caption">The Menin Gate Memorial: Designed by Sir Reginald Blomfield, inaugurated in 1927.</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 8.2pt; color: #334155; line-height: 1.4;">
            <strong>The Gateway to Battle:</strong> Through this eastern gate hundreds of thousands marched towards the frontline trenches. Carved into its stone panels are 54,395 soldiers missing in the Salient prior to 16 August 1917.
          </div>
        </div>

        <div class="poet-bio-card">
          <img src="${sassoonImg}" alt="Siegfried Sassoon">
          <div class="poet-name">Siegfried Sassoon</div>
          <div class="poet-dates">1886–1967 · Captain, Royal Welch Fusiliers (MC)</div>
          <div class="poet-desc">
            Decorated for reckless courage ("Mad Jack"), Sassoon became the foremost soldier-critic of the war. Attending the 1927 dedication of the Menin Gate, he reacted with fury against its triumphalist architecture, believing its classical grandeur sanitized the brutal slaughter of the dead.
          </div>
        </div>
      </div>

      <!-- Enlarged Poem Display -->
      <div class="reading-box" style="margin-bottom: 10px;">
        <div class="poem-title">On Passing the New Menin Gate</div>
        <div class="poet-meta">By Siegfried Sassoon · Written upon the Memorial's Unveiling, 1927</div>
        <div class="poem-lines" style="font-size: 10.3pt; line-height: 1.56;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">🎺 The Daily Act of Remembrance: The Menin Gate Tradition</div>
        <div class="focus-content">
          Every evening at exactly 20:00, traffic halts completely beneath the Menin Gate as buglers from the Ypres Volunteer Fire Brigade sound the <em>Last Post</em>. Initiated in 1928, this solemn act of gratitude has continued unbroken through the decades (interrupted only during German WWII occupation, when it was sounded in Surrey, England). As the bugle notes reverberate beneath the vaulted arch bearing 54,395 names of the missing, consider Siegfried Sassoon's bitter protest against glorification alongside Laurence Binyon's eternal pledge: <em>"We will remember them."</em>
        </div>
      </div>

      <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          🌺 Meoncross School Wreath Laying Ceremony Protocol
        </div>
        <div style="font-size: 8.5pt; color: #7f1d1d; line-height: 1.45;">
          At 19:45, our designated student wreath-bearers will take their positions under the central vault alongside staff. When invited forward by the master of ceremonies, step in unison, place the poppy wreath upon the plinth on behalf of Meoncross School and the parish of Stubbington, take two paces back, and bow heads in silent remembrance.
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
        <!-- Stop 9: Cloth Hall -->
        <div class="photo-card">
          <img src="${clothHallRuins}" alt="The Cloth Hall Ypres 1919" style="height: 120px; object-fit: cover;">
          <div class="caption">
            <strong>The Cloth Hall, Ypres (1919):</strong> Watercolour by Scottish war artist <strong>Emily Murray Paterson RSW (1855–1934)</strong>, painted on-site amidst the ruins after the Armistice (Imperial War Museum collection).
          </div>
        </div>

        <!-- Stop 10: Talbot House -->
        <div class="photo-card">
          <img src="${talbotHouse}" alt="Talbot House Exterior Façade" style="height: 120px; object-fit: cover;">
          <div class="caption">
            <strong>Talbot House Façade, Poperinge:</strong> The exterior façade on Gasthuisstraat, opened in December 1915 by Rev. Philip 'Tubby' Clayton as an unranked sanctuary for all soldiers behind the lines.
          </div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 10px; align-items: stretch;">
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
            <div class="poem-lines" style="font-size: 10.3pt; line-height: 1.56;">
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

      <div class="field-focus-box" style="margin-top: 0; margin-bottom: 10px;">
        <div class="focus-header">🕊️ Social History &amp; Rebirth: The Sanctuary of Toc H</div>
        <div class="focus-content">
          In Poperinge, Rev. Philip 'Tubby' Clayton opened Talbot House in December 1915 with an extraordinary rule: <em>"All rank abandon, ye who enter here."</em> Officers and privates drank tea together, played piano, and climbed to the upper hop-loft chapel for quiet communion behind the lines. Following the Armistice, Winston Churchill advocated preserving the shattered Cloth Hall of Ypres as a permanent ruins monument, but the Flemish citizens chose to painstakingly reconstruct their medieval city brick by brick, symbolising enduring resurrection.
        </div>
      </div>

      <div style="background: #fdf4ff; border: 1.5px solid #f0abfc; border-left: 5px solid #c026d3; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #86198f; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          ⛪ The Upper Room: The 'Hop-Loft' Chapel
        </div>
        <div style="font-size: 8.5pt; color: #701a75; line-height: 1.45;">
          Climbing the steep attic stairs of Talbot House, soldiers found a sanctuary made from an old carpenter's bench converted into an altar, illuminated by candles in brass shell-casings. Over 100,000 men took communion here before moving up the Menin Road. Inscribed on the wall: <em>"All rank abandon ye who enter here."</em>
        </div>
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

      <div class="grid-2col" style="margin-bottom: 10px;">
        <div>
          <h4 style="font-size: 9.8pt; color: #1e3a8a; margin-bottom: 5px;">Trench &amp; Military Terminology</h4>
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
            </tbody>
          </table>
        </div>

        <div>
          <h4 style="font-size: 9.8pt; color: #b45309; margin-bottom: 5px;">CWGC &amp; Memorial Terminology</h4>
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

      <!-- Chronology of the 5 Battles of Ypres -->
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px 13px; margin-bottom: 10px;">
        <h4 style="font-size: 9.5pt; color: #1e3a8a; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em;">
          ⚔️ Chronology: The Five Battles of the Ypres Salient (1914–1918)
        </h4>
        <table class="companion-table" style="font-size: 8.2pt;">
          <thead>
            <tr>
              <th style="width: 22%;">Battle</th>
              <th style="width: 20%;">Dates</th>
              <th style="width: 58%;">Key Historical Significance &amp; Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>First Ypres</strong></td>
              <td>Oct – Nov 1914</td>
              <td>BEF and French halt German 'Race to the Sea'. Traditional regular British Army largely decimated.</td>
            </tr>
            <tr>
              <td><strong>Second Ypres</strong></td>
              <td>Apr – May 1915</td>
              <td>First mass use of poison gas (chlorine). Canadian Division holds line at St. Julien. Salient compresses.</td>
            </tr>
            <tr>
              <td><strong>Battle of Mount Sorrel</strong></td>
              <td>June 1916</td>
              <td>Fierce fighting around Hill 62; Canadian Corps retakes strategic vantage points overlooking Ypres.</td>
            </tr>
            <tr>
              <td><strong>Third Ypres (Passchendaele)</strong></td>
              <td>July – Nov 1917</td>
              <td>Catastrophic offensive in torrential rain and liquid mud; over 500,000 casualties for five miles of advance.</td>
            </tr>
            <tr>
              <td><strong>Battle of the Lys &amp; Advance</strong></td>
              <td>Apr &amp; Sep 1918</td>
              <td>German Spring Offensive stopped; Allied Hundred Days Advance liberates the Salient permanently.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 8px 12px; margin-bottom: 10px;">
        <h4 style="font-size: 9pt; color: #0f172a; margin-bottom: 3px;">Useful Flemish &amp; French Toponyms in the Salient</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 8pt; color: #334155;">
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

      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e3a8a; border-radius: 7px; padding: 8px 12px; margin-bottom: 10px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          🤝 Code of Conduct &amp; Pupil Expedition Standards
        </div>
        <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.36;">
          1. <strong>Quiet Respect:</strong> Cemeteries are active places of international mourning. Walk strictly on grass paths; never sit on headstones.<br>
          2. <strong>Mobile Phone Protocol:</strong> Phones may be used for educational photography during visits. Collected into secure bags at evening curfew.<br>
          3. <strong>Hostel Downtime:</strong> Quiet hours from 22:00 at Peace Village. Respect other international student groups.<br>
          4. <strong>Ambassadors of Meoncross:</strong> We represent our school and the village of Stubbington before the people of Flanders.
        </div>
      </div>

      <div style="background: #0f172a; color: #ffffff; padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt;">
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
