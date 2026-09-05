const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_1914_1918_field_guide_and_companion.pdf');

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
  const clothHall = getBase64Image('images/ypres_cloth_hall.jpg');
  const clothHallRuins = getBase64Image('images/cloth_hall_ruins_1919.jpg');
  const talbotHouse = getBase64Image('images/talbot_house_relaxing.jpg');
  const meninRoadNash = getBase64Image('images/menin_road_nash.jpg');

  // Poet Portraits
  const mccraeImg = getBase64Image('images/john_mccrae.jpg');
  const sorleyImg = getBase64Image('images/charles_sorley.jpg');
  const owenImg = getBase64Image('images/wilfred_owen.jpg');
  const sassoonImg = getBase64Image('images/siegfried_sassoon.jpg');
  const rosenbergImg = getBase64Image('images/isaac_rosenberg.jpg');
  const binyonImg = getBase64Image('images/laurence_binyon.jpg');
  const brookeImg = getBase64Image('images/rupert_brooke.jpg');
  const brittainImg = getBase64Image('images/vera_brittain.jpg');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Official Battlefield Field Guide &amp; Historical Companion</title>
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
      padding: 10mm 12mm;
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

    /* Header Bar */
    .header-bar {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 6px;
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
      font-size: 8pt;
      color: #475569;
      font-weight: 600;
      margin-top: 1px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 3px 8px;
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
      border: 1px solid #cbd5e1;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 6px;
      padding: 8px 11px;
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
      background: #fefce8;
      border: 1px solid #fef08a;
      border-left: 4.5px solid #d97706;
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
      margin-bottom: 6px;
    }

    .reading-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.4pt;
      color: #451a03;
      line-height: 1.45;
      white-space: pre-line;
    }

    .search-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4.5px solid #2563eb;
      border-radius: 6px;
      padding: 8px 11px;
      margin-bottom: 8px;
    }

    .search-box .search-header {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1d4ed8;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-bottom: 4px;
    }

    /* Footer */
    .footer-bar {
      border-top: 1.5px solid #e2e8f0;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #64748b;
    }

    /* Data Tables */
    table.companion-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.8pt;
      margin-bottom: 8px;
    }

    table.companion-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 5px 8px;
      text-align: left;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7pt;
      letter-spacing: 0.04em;
    }

    table.companion-table td {
      padding: 5px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }

    table.companion-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .badge-gold {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 6.8pt;
      display: inline-block;
    }

    .badge-navy {
      background: #eff6ff;
      color: #1e3a8a;
      border: 1px solid #bfdbfe;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 6.8pt;
      display: inline-block;
    }

    /* Layout Grids */
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

    .photo-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      text-align: center;
    }

    .photo-card img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      border-radius: 4px;
      display: block;
    }

    .photo-card .caption {
      font-size: 6.8pt;
      color: #475569;
      font-weight: 600;
      margin-top: 4px;
      line-height: 1.2;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER ================= -->
  <div class="page page-break" style="justify-content: space-between; text-align: center; background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f8fafc 100%);">
    <div style="border-bottom: 3px double #1e3a8a; padding-bottom: 12px; margin-top: 15px;">
      <div style="font-size: 13pt; font-weight: 800; letter-spacing: 0.12em; color: #1e3a8a; text-transform: uppercase; font-family: 'Outfit', sans-serif;">
        Meoncross School · History Department
      </div>
      <div style="font-size: 9.5pt; color: #b45309; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px;">
        In Association with The History Boys Tour Company
      </div>
    </div>

    <div style="padding: 10px 0;">
      <div style="display: inline-block; background: #eff6ff; border: 1.5px solid #bfdbfe; color: #1e3a8a; font-weight: 800; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 14px; border-radius: 20px; margin-bottom: 14px;">
        Official Expedition Field Study Guide &amp; Historical Companion
      </div>
      <h1 style="font-size: 26pt; line-height: 1.15; color: #0f172a; margin-bottom: 8px; font-weight: 800; letter-spacing: 0.01em;">
        YPRES 1914–1918
      </h1>
      <div style="font-family: 'Playfair Display', serif; font-size: 14pt; color: #78350f; font-style: italic; margin-bottom: 15px;">
        Flanders Fields, Frontline Memory &amp; Local Village Heritage
      </div>
      <p style="max-width: 170mm; margin: 0 auto 20px auto; font-size: 9.2pt; color: #334155; line-height: 1.5;">
        A comprehensive on-site study companion for pupils and staff. Connecting the Great War memorial tablets of <strong>Holy Rood Church, Stubbington</strong> and <strong>Lee-on-the-Solent</strong> to the preserved trenches, craterfields, and memorial walls of the Ypres Salient.
      </p>

      <div style="max-width: 175mm; margin: 0 auto; border: 2px solid #1e3a8a; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.12); background: #0f172a;">
        <img src="${tyneCot}" alt="Tyne Cot Cemetery" style="width: 100%; height: 180px; object-fit: cover; display: block; opacity: 0.95;">
        <div style="background: #0f172a; color: #ffffff; padding: 7px 12px; font-size: 7.5pt; display: flex; justify-content: space-between;">
          <span>Tyne Cot Commonwealth War Graves Cemetery · Passchendaele</span>
          <span>11,961 Graves · 34,996 Memorial Names</span>
        </div>
      </div>
    </div>

    <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; max-width: 180mm; margin: 0 auto 10px auto; text-align: left; display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px;">
      <div>
        <div style="font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 3px;">Expedition Leadership</div>
        <div style="font-size: 9pt; font-weight: 700; color: #0f172a;">Mr Ben Lovett <span style="font-weight: normal; color: #475569;">(Head of History, Meoncross School)</span></div>
        <div style="font-size: 9pt; font-weight: 700; color: #0f172a;">Mr James Garrett <span style="font-weight: normal; color: #475569;">(The History Boys · Battlefield Historian)</span></div>
        <div style="font-size: 8pt; color: #334155; margin-top: 3px;"><strong>Accompanying Staff:</strong> Dr Kirkup &amp; Mrs Lushey</div>
      </div>
      <div style="border-left: 1px solid #e2e8f0; padding-left: 15px;">
        <div style="font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 3px;">Expedition Details</div>
        <div style="font-size: 8.5pt; color: #1e3a8a; font-weight: 700;">Thursday 1st – Saturday 3rd October 2026</div>
        <div style="font-size: 8pt; color: #334155;"><strong>Base:</strong> Peace Village Hostel, Heuvelland, Belgium</div>
        <div style="font-size: 8pt; color: #334155;"><strong>Coach:</strong> Jet Connect Executive Travel</div>
      </div>
    </div>

    <div class="footer-bar" style="border-top: none; font-size: 7pt; color: #94a3b8; justify-content: center;">
      Source of Truth Field Study Text · Meoncross School History Department © 2026
    </div>
  </div>


  <!-- ================= PAGE 2: ITINERARY & SALIENT MAP ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Expedition Master Route &amp; Timetable</div>
          <div class="school-sub">3-Day Field Expedition · 1st–3rd October 2026</div>
        </div>
        <div class="partner-pill">
          <div class="brand">The Ypres Salient</div>
          <div class="lead">Western Flanders, Belgium</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 9px; align-items: stretch;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
          <h3 style="font-size: 10pt; color: #1e3a8a; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em;">The Salient Route</h3>
          <img src="${salientMap}" alt="Salient Map" style="width: 100%; height: 165px; object-fit: contain; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; display: block;">
          <div style="font-size: 7.2pt; color: #64748b; margin-top: 5px; line-height: 1.3;">
            <strong>The Salient Bulge:</strong> British lines jutted eastward into German artillery arcs. Defending this ten-mile crescent cost over 500,000 Commonwealth casualties across four brutal years.
          </div>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px; padding: 9px 12px;">
            <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4px;">Hostel Base &amp; Logistics</div>
            <div style="font-size: 8pt; color: #1e293b; line-height: 1.4;">
              <strong>Peace Village Hostel</strong><br>
              Kemmelbergweg 43, 8956 Heuvelland, Belgium<br>
              Rural educational centre at the foot of the Kemmelberg. Secure en-suite group chalets, on-site 2-course dinners, and private recreation grounds.
            </div>
          </div>

          <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 6px; padding: 9px 12px;">
            <div style="font-size: 8.5pt; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 4px;">24/7 Emergency Numbers</div>
            <div style="font-size: 7.8pt; color: #7f1d1d; line-height: 1.4;">
              <strong>School Office Base:</strong> +44 (0)1329 288339<br>
              <strong>Trip Leaders Mobile:</strong> On 24/7 staff duty throughout tour<br>
              <strong>Belgian Emergency Services:</strong> 112 (European Emergency)
            </div>
          </div>
        </div>
      </div>

      <div class="section-title">Hourly Field Schedule</div>
      <table class="companion-table">
        <thead>
          <tr>
            <th style="width: 18%;">Day &amp; Time</th>
            <th style="width: 32%;">Location &amp; Activity</th>
            <th style="width: 50%;">Academic &amp; Ceremonial Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Day 1 · 06:15</strong></td>
            <td>Meoncross Departure</td>
            <td>Sharp departure via Jet Connect coach to Folkestone crossing. Packed lunch required.</td>
          </tr>
          <tr>
            <td><strong>Day 1 · 14:30</strong></td>
            <td>Essex Farm ADS (Stop 1)</td>
            <td>Concrete dressing station dugouts; John McCrae's <em>"In Flanders Fields"</em>; Strudwick grave (age 15).</td>
          </tr>
          <tr>
            <td><strong>Day 1 · 15:15</strong></td>
            <td>Yorkshire Trench &amp; Langemarck (2&amp;3)</td>
            <td>Preserved frontline earthworks followed by dark basalt German Cemetery (24,917 mass grave).</td>
          </tr>
          <tr>
            <td><strong>Day 1 · 18:30</strong></td>
            <td>Peace Village Hostel Check-in</td>
            <td>Room allocation, settle in, 2-course hot group dinner on-site in hostel dining hall.</td>
          </tr>
          <tr>
            <td><strong>Day 2 · 09:15</strong></td>
            <td>Vancouver Corner &amp; Hooge (4&amp;5)</td>
            <td>Brooding Soldier (First Gas Attack, Owen's <em>"Dulce"</em>); Hooge Crater mine warfare &amp; trenches.</td>
          </tr>
          <tr>
            <td><strong>Day 2 · 12:45</strong></td>
            <td>Supermarket Lunch Stop</td>
            <td>Supervised lunch stop (fresh sandwiches &amp; fruit using €30–€40 cash).</td>
          </tr>
          <tr>
            <td><strong>Day 2 · 14:15</strong></td>
            <td>Tyne Cot Cemetery (Stop 6)</td>
            <td>World's largest CWGC cemetery. Search for 4 village fallen on rear curved panels (85, 125, 142).</td>
          </tr>
          <tr>
            <td><strong>Day 2 · 18:00</strong></td>
            <td>Peace Village Group Dinner</td>
            <td>2-course dinner on-site at hostel ahead of evening ceremonial parade in Ypres.</td>
          </tr>
          <tr>
            <td><strong>Day 2 · 20:00</strong></td>
            <td>The Menin Gate Ceremony (Stop 8)</td>
            <td>Solemn Last Post ceremony. Meoncross pupils lay official wreath. Locate Franklin &amp; Ayling (Panel 35).</td>
          </tr>
          <tr>
            <td><strong>Day 3 · 09:30</strong></td>
            <td>Cloth Hall &amp; Ramparts (Stop 9)</td>
            <td>In Flanders Fields Museum; walk the medieval ramparts to the Lille Gate.</td>
          </tr>
          <tr>
            <td><strong>Day 3 · 12:45</strong></td>
            <td>Talbot House, Poperinge (Stop 10)</td>
            <td>Tubby Clayton's 'Everyman's Club' behind the lines; Upper Room hop-loft chapel; piano &amp; tea.</td>
          </tr>
          <tr>
            <td><strong>Day 3 · 20:30</strong></td>
            <td>Return to Meoncross School</td>
            <td>Coach crossing and return to Stubbington for collection by parents.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 2 · Master Timetable &amp; Route</span>
    </div>
  </div>


  <!-- ================= PAGE 3: THE LOWRY BROTHERS ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">The Local Heritage Mission · Part I</div>
          <div class="school-sub">Connecting Our Village to the Memorial Walls of Flanders</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Holy Rood Church</div>
          <div class="lead">Stubbington &amp; Crofton Parish</div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 9px;">
        <div class="box-header">🏛️ The Home Link: Holy Rood Church Memorial Tablet</div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="flex: 1; font-size: 8.2pt; color: #334155; line-height: 1.4;">
            Inside <strong>Holy Rood Church, Stubbington</strong>, carved into the marble Great War Memorial Tablet and painted upon the oak tie-beams of the village lychgate, are the names of three brothers from Manor Way Grange, Lee-on-the-Solent: <strong>William, Cyril, and Eric Lowry</strong>. All three gave their lives. On this tour, our pupils carry their memory from Hampshire back to the blood-soaked ground where their youth was spent.
          </div>
          <div class="photo-card" style="width: 85px; flex-shrink: 0;">
            <img src="${tabletImg}" alt="Holy Rood Memorial Tablet" style="height: 65px;">
            <div class="caption">Crofton Tablet</div>
          </div>
        </div>
      </div>

      <div class="section-title">The Three Lowry Brothers of Manor Way Grange</div>

      <!-- William Lowry -->
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; display: flex; gap: 12px; align-items: flex-start;">
        <div class="photo-card" style="width: 75px; flex-shrink: 0;">
          <img src="${lowryWilliam}" alt="William Lowry" style="height: 75px; object-position: 50% 6%;">
          <div class="caption">2nd Lt William Lowry</div>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-size: 9.5pt; color: #1e3a8a;">Second Lieutenant William Lowry (Age 25)</h4>
            <span class="badge-navy">Gallipoli Front</span>
          </div>
          <div style="font-size: 7.5pt; color: #64748b; font-weight: 600; margin-bottom: 3px;">
            8th Battalion, Duke of Wellington's (West Riding Regiment) · Killed in Action 21 August 1915
          </div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.35;">
            The eldest brother. Landing at Suvla Bay during the fierce August Offensive on the Gallipoli Peninsula, he was killed during the assault on Scimitar Hill amidst baking heat and shrapnel fire. His body was never recovered; he is commemorated on the <strong>Helles Memorial</strong> in Turkey.
          </div>
        </div>
      </div>

      <!-- Cyril Lowry -->
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4.5px solid #b45309; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; display: flex; gap: 12px; align-items: flex-start;">
        <div class="photo-card" style="width: 75px; flex-shrink: 0;">
          <img src="${lowryCyril}" alt="Cyril Lowry" style="height: 75px;">
          <div class="caption">Capt Cyril Lowry</div>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-size: 9.5pt; color: #b45309;">Captain Cyril John 'Patrick' Lowry (Age 20)</h4>
            <span class="badge-gold">Somme Front</span>
          </div>
          <div style="font-size: 7.5pt; color: #64748b; font-weight: 600; margin-bottom: 3px;">
            2nd Battalion, West Yorkshire Regiment · Killed in Action 25 March 1918
          </div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.35;">
            The youngest brother. Promoted to Captain at just 20. Killed during the catastrophic German Spring Offensive (Operation Michael) near Pozières, leading a desperate counter-attack under the direct command of his older brother Eric, falling mortally wounded in full view of him. Commemorated on the <strong>Pozières Memorial to the Missing</strong>.
          </div>
        </div>
      </div>

      <!-- Eric Lowry -->
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4.5px solid #0f766e; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; display: flex; gap: 12px; align-items: flex-start;">
        <div class="photo-card" style="width: 75px; flex-shrink: 0;">
          <img src="${lowryEric}" alt="Eric Lowry" style="height: 75px;">
          <div class="caption">Lt Col Eric Lowry</div>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-size: 9.5pt; color: #0f766e;">Lieutenant Colonel Auriol Eric Lowry, DSO, MC (Age 25)</h4>
            <span class="badge-navy">Arras &amp; Somme</span>
          </div>
          <div style="font-size: 7.5pt; color: #64748b; font-weight: 600; margin-bottom: 3px;">
            Commanding 2nd Battalion, West Yorkshire Regiment · Killed in Action 19 September 1918
          </div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.35;">
            A decorated frontline hero awarded the Distinguished Service Order and Military Cross for extraordinary bravery under fire. Having witnessed Cyril's death in March, Eric fought on through the Hundred Days Offensive until he was killed leading his battalion near Gouzeaucourt, just six weeks before the Armistice. Buried in <strong>Varennes Military Cemetery</strong>.
          </div>
        </div>
      </div>

      <div class="reading-box" style="margin-bottom: 0;">
        <div class="box-header" style="font-size: 8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Field Reflection Question</div>
        <div style="font-size: 8pt; color: #78350f; font-style: italic; line-height: 1.4;">
          "How did three sons from one coastal Hampshire home answer the call across Gallipoli, Arras, and the Somme—and what does their mother's loss reveal about the total devastation visited upon families across Britain?"
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 3 · The Lowry Brothers Heritage</span>
    </div>
  </div>


  <!-- ================= PAGE 4: THE SIX VILLAGE HEROES ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">The Local Heritage Mission · Part II</div>
          <div class="school-sub">Our Six Village Heroes Commemorated on Flanders Memorials</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Field Search Task</div>
          <div class="lead">Tyne Cot &amp; Menin Gate</div>
        </div>
      </div>

      <p style="font-size: 8.2pt; color: #334155; margin-bottom: 8px; line-height: 1.35;">
        While three Lowry sons fell on other battlefields, <strong>six young men from Stubbington and Chark</strong> gave their lives in the Ypres Salient and have no known grave. Their names are permanently incised into the stone panels of the Menin Gate and Tyne Cot. Pupils will locate and touch these names on site:
      </p>

      <table class="companion-table">
        <thead>
          <tr>
            <th style="width: 25%;">Soldier Name &amp; Age</th>
            <th style="width: 27%;">Regiment &amp; Date of Death</th>
            <th style="width: 28%;">Flanders Memorial Panel</th>
            <th style="width: 20%;">Local Connection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Private William Franklin</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 27</span></td>
            <td>1st Battalion, Hampshire Regiment<br><span style="font-size: 7.2pt; color: #991b1b;">13 May 1915</span></td>
            <td><strong style="color: #1e3a8a;">Menin Gate · Panel 35</strong></td>
            <td>Stubbington native. Second Ypres defensive stand.</td>
          </tr>
          <tr>
            <td><strong>Private George Ayling</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 28</span></td>
            <td>1st Battalion, Hampshire Regiment<br><span style="font-size: 7.2pt; color: #991b1b;">26 April 1915</span></td>
            <td><strong style="color: #1e3a8a;">Menin Gate · Panel 35</strong></td>
            <td>Stubbington born; son of George &amp; Mary Ayling.</td>
          </tr>
          <tr>
            <td><strong>Private Frederick Muckett</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 21</span></td>
            <td>2nd Battalion, Hampshire Regiment<br><span style="font-size: 7.2pt; color: #991b1b;">20 November 1917</span></td>
            <td><strong style="color: #b45309;">Tyne Cot · Panel 85</strong></td>
            <td>Born in Chark, Stubbington. Passchendaele offensive.</td>
          </tr>
          <tr>
            <td><strong>Private Frank Rye</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 25</span></td>
            <td>1st/4th Bn King's Own Yorkshire L.I.<br><span style="font-size: 7.2pt; color: #991b1b;">9 October 1917</span></td>
            <td><strong style="color: #b45309;">Tyne Cot · Panel 125</strong></td>
            <td>Resident of Stubbington; Battle of Poelcappelle mud.</td>
          </tr>
          <tr>
            <td><strong>Lance Corporal Charles Ward</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 23</span></td>
            <td>8th Battalion, Machine Gun Corps<br><span style="font-size: 7.2pt; color: #991b1b;">22 October 1917</span></td>
            <td><strong style="color: #b45309;">Tyne Cot · Panel 142</strong></td>
            <td>Stubbington resident; deadly machine gun support.</td>
          </tr>
          <tr>
            <td><strong>Private George Warland</strong><br><span style="font-size: 7.2pt; color: #64748b;">Age 24</span></td>
            <td>2nd Battalion, Machine Gun Corps<br><span style="font-size: 7.2pt; color: #991b1b;">26 October 1917</span></td>
            <td><strong style="color: #b45309;">Tyne Cot · Panel 142</strong></td>
            <td>Stubbington native; Second Passchendaele assault.</td>
          </tr>
        </tbody>
      </table>

      <div class="search-box">
        <div class="search-header">🔍 How to Locate Our Fallen on Site</div>
        <div style="font-size: 8pt; color: #1e293b; line-height: 1.4;">
          <strong>At the Menin Gate (Friday 8:00 PM):</strong> Enter under the central arch. Locate <strong>Panel 35</strong> along the south internal wall for the Hampshire Regiment. Trace your fingers over <em>Franklin</em> and <em>Ayling</em>.<br>
          <strong>At Tyne Cot (Friday 14:15):</strong> Walk past the Cross of Sacrifice to the rear curved stone walls. Panels are numbered from left to right along the apses. Find <strong>Panel 85</strong> (Hampshires), <strong>Panel 125</strong> (KOYLI), and <strong>Panel 142</strong> (Machine Gun Corps).
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 0;">
        <div class="box-header">🎤 Tour Leader Script: On Touching the Names</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <em>"Gather the students by the panel. Ask them to remember the distance from Stubbington Green to this cold Portland stone. Explain that for over a century, their families in Hampshire had no grave to visit, no flowers to leave. When we speak their names aloud today, we break their anonymity and complete a sacred parish promise made in 1919."</em>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 4 · The Six Village Fallen</span>
    </div>
  </div>


  <!-- ================= PAGE 5: DAY 1 GEOGRAPHY & HEADSTONE ANATOMY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Guide · The Landscape of War</div>
          <div class="school-sub">The Geography of the Salient &amp; The Evolution of War Graves</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Field Stop 1 Prep</div>
          <div class="lead">Thursday 1st October</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 9px; align-items: stretch;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
          <h4 style="font-size: 9.5pt; color: #1e3a8a; margin-bottom: 4px;">Why the Salient Was a Lethal Bulge</h4>
          <p style="font-size: 7.8pt; color: #334155; line-height: 1.35; margin-bottom: 6px;">
            A 'salient' is a pocket where frontline positions project into enemy territory. Because the Germans held the surrounding high ground (Passchendaele Ridge, Messines, and Hill 60), every road, trench, and dressing station was visible to enemy forward observers. British troops were pounded by artillery fire from three sides.
          </p>
          <img src="${meninRoadNash}" alt="Menin Road by Paul Nash" style="width: 100%; height: 85px; object-fit: cover; border-radius: 4px; display: block;">
          <div style="font-size: 6.8pt; color: #64748b; margin-top: 3px; font-style: italic;">
            "The Menin Road" by Paul Nash (1917): Bottomless Flanders clay churned by millions of high-explosive shells.
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
          <h4 style="font-size: 9.5pt; color: #b45309; margin-bottom: 4px;">The Anatomy of a CWGC Headstone</h4>
          <p style="font-size: 7.8pt; color: #334155; line-height: 1.35; margin-bottom: 6px;">
            Created by Sir Fabian Ware and architect Edwin Lutyens, Commonwealth headstones were revolutionary instruments of <strong>total social equality</strong>:
          </p>
          <div style="display: flex; gap: 8px; align-items: center;">
            <img src="${headstoneImg}" alt="CWGC Headstone" style="width: 58px; height: 85px; object-fit: cover; border-radius: 3px;">
            <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #334155; line-height: 1.3;">
              <li><strong>Portland Stone:</strong> Identical shape, height, and material for all.</li>
              <li><strong>No Repatriation:</strong> Wealthy families were forbidden from bringing bodies home.</li>
              <li><strong>Regimental Badge:</strong> Carved at the top of every stone.</li>
              <li><strong>Kipling's Epitaph:</strong> <em>"Known unto God"</em> for unidentified men.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="talking-points-box">
        <div class="box-header">🎤 Tour Leader Talking Points: The Radical Equality of Death</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <em>"Before pupils step through the gates of Essex Farm, stop them. Explain that in Victorian Britain, your wealth determined the grandeur of your tomb. Here, Lord and commoner, General and 15-year-old boy like Valentine Strudwick, stand shoulder to shoulder beneath identical slabs of Portland stone. It was Britain's first truly democratic national statement."</em>
        </div>
      </div>

      <div class="section-title">Key Field Questions for Day 1</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 7px 10px;">
          <strong style="color: #1e3a8a; font-size: 7.8pt;">1. Frontline Triage:</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.4pt; color: #475569; line-height: 1.3;">Why did medical dressing stations have to be built directly beneath the canal banks, and how did doctors decide who lived and who died?</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 7px 10px;">
          <strong style="color: #b45309; font-size: 7.8pt;">2. Architecture &amp; Memory:</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.4pt; color: #475569; line-height: 1.3;">Why does Langemarck German Cemetery look so dark and heavy compared to the bright, garden-like Portland stone of British cemeteries?</p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 5 · Day 1 Field Context &amp; Headstone Anatomy</span>
    </div>
  </div>


  <!-- ================= PAGE 6: ESSEX FARM & YORKSHIRE TRENCH ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Stops · Essex Farm &amp; Yorkshire Trench</div>
          <div class="school-sub">Stops 1 &amp; 2 · Medical Triage &amp; Preserved Frontline Earthworks</div>
        </div>
        <div class="partner-pill">
          <div class="brand">North Salient</div>
          <div class="lead">Thursday Afternoon</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 1 Tour Script: Essex Farm ADS</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Where We Stand:</strong> Beside the Yser Canal. These concrete bunkers were an Advanced Dressing Station (ADS). Here, Dr John McCrae and his orderlies treated hundreds of shattered soldiers during the Second Battle of Ypres.<br>
            <strong>What to Notice:</strong> Look at the tiny concrete recesses where stretchers were slid in. Notice how low the ceilings are. The doors were hung with sodden blankets to prevent chlorine gas from sinking into the wounds.<br>
            <strong>Strudwick Grave:</strong> Walk to Plot I, Row G, Grave 12: Private Valentine Joe Strudwick, killed in January 1916 aged just <strong>15 years and 11 months</strong>.
          </div>
        </div>

        <div class="photo-card">
          <img src="${essexFarm}" alt="Essex Farm ADS" style="height: 100px;">
          <div class="caption">Concrete bunkers of the Advanced Dressing Station at Essex Farm</div>
        </div>
      </div>

      <!-- On-Site Reading: In Flanders Fields -->
      <div class="reading-box" style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">In Flanders Fields</div>
            <div class="poet-meta">Lieutenant Colonel John McCrae (1872–1918) · Composed at Essex Farm, 3rd May 1915</div>
          </div>
          <img src="${mccraeImg}" alt="John McCrae" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; margin-bottom: 4px;">
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
        <div style="font-size: 7.2pt; color: #78350f; font-style: italic; border-top: 1px dashed #fde047; padding-top: 4px;">
          <strong>Historical Note:</strong> Written on the step of an ambulance the morning after McCrae buried his close friend Lt Alexis Helmer. It became the global inspiration for the Remembrance Poppy.
        </div>
      </div>

      <!-- Stop 2: Yorkshire Trench -->
      <div class="talking-points-box" style="margin-bottom: 0;">
        <div class="box-header">🎤 Stop 2 Tour Script: Yorkshire Trench &amp; Dugout</div>
        <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
          <strong>The Rediscovery:</strong> Uncovered in 1998 by amateur archaeologists in an industrial estate, this trench was restored on its exact 1915 footprint.<br>
          <strong>What to Notice:</strong> Look down at the wooden A-frame duckboards. Notice the sump channels beneath them. Because the water table here is only two feet below ground, trenches filled with freezing water within minutes. Soldiers stood for days in wet boots, causing agonizing 'trench foot' that could lead to gangrene and amputation.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 6 · Stops 1 &amp; 2: Essex Farm &amp; Yorkshire Trench</span>
    </div>
  </div>


  <!-- ================= PAGE 7: LANGEMARCK GERMAN CEMETERY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 1 Field Stops · Langemarck German Cemetery</div>
          <div class="school-sub">Stop 3 · Basalt Architecture, Mass Mourning &amp; The Student Myth</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Langemarck</div>
          <div class="lead">Thursday 15:45</div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 8px;">
        <div class="box-header">🎤 Stop 3 Tour Script: The Contrast of Langemarck</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.4;">
          <strong>The German Experience:</strong> Over 44,000 German soldiers lie in Langemarck. Under the Treaty of Versailles, Germany was not permitted to use gleaming white stone or individual Christian crosses.<br>
          <strong>The Kameradengrab (Comrades' Grave):</strong> Right inside the entrance gate lies a single mass grave containing <strong>24,917 German soldiers</strong>. Around it stand bronze panels engraved with their names.<br>
          <strong>Emil Krieger's Statues:</strong> At the rear of the cemetery stand four dark bronze figures of mourning soldiers, gazing toward their fallen comrades.
        </div>
      </div>

      <!-- On-Site Reading: To Germany -->
      <div class="reading-box" style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">To Germany</div>
            <div class="poet-meta">Captain Charles Hamilton Sorley (1895–1915) · 7th Bn Suffolk Regt · Killed at Loos, aged 20</div>
          </div>
          <img src="${sorleyImg}" alt="Charles Sorley" style="width: 32px; height: 42px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; margin-bottom: 4px;">
You are blind like us. Your hurt no man designed,
And no man claimed the conquest of your land.
But both have gone warring against the dark; and so we stand
Looking beyond each other in the blind night,
And only reach each other through the night
Of our own darkness, like men in a cave.
You are only our brothers who have made
The same mistake; and when the fight is done,
We shall cross the fields of blood and tears,
And take each other's hands, and be at peace.
        </div>
        <div style="font-size: 7.2pt; color: #78350f; font-style: italic; border-top: 1px dashed #fde047; padding-top: 4px;">
          <strong>Historical Note:</strong> Sorley lived and studied in Germany before the war and rejected anti-German hatred. Found in his kit-bag after his death.
        </div>
      </div>

      <!-- The Student Myth Warning Box -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4.5px solid #475569; border-radius: 6px; padding: 8px 11px; margin-bottom: 0;">
        <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 3px;">
          ⚠️ Historical Insight: The 'Langemarck-Mythos' (Student Myth)
        </div>
        <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
          In October 1914, raw German student volunteers were slaughtered by British rifle fire at First Ypres. The German High Command issued a false dispatch claiming the students advanced singing <em>"Deutschland über alles"</em>. Later in the 1930s, Adolf Hitler visited Langemarck and used this myth to indoctrinate Hitler Youth into blind sacrifice. Remind students that history is often twisted for political propaganda.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 7 · Stop 3: Langemarck German Cemetery</span>
    </div>
  </div>


  <!-- ================= PAGE 8: SECOND YPRES & HOOGE CRATER ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Stops · Gas Attacks &amp; Mine Warfare</div>
          <div class="school-sub">Stops 4 &amp; 5 · Vancouver Corner &amp; Hooge Crater Preserved Trenches</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Passchendaele Ridge</div>
          <div class="lead">Friday Morning</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 4 Tour Script: Vancouver Corner (St Julien)</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>22nd April 1915:</strong> The First Lethal Gas Attack in world history. German forces opened 5,730 cylinders of liquid chlorine gas. A dense greenish-yellow cloud rolled southwest across French colonial troops, who suffocated or fled in panic.<br>
            <strong>The Canadian Stand:</strong> Canadian soldiers held the ruptured line using urine-soaked cloths to neutralize the gas. Look up at <em>The Brooding Soldier</em>: his hands rest upon the reversed butt of his rifle in silent, eternal mourning.
          </div>
        </div>

        <!-- On-Site Reading: Dulce et Decorum Est -->
        <div class="reading-box">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="poem-title" style="font-size: 9.5pt;">Dulce et Decorum Est</div>
              <div class="poet-meta">Wilfred Owen, MC (1893–1918) · Composed 1917</div>
            </div>
            <img src="${owenImg}" alt="Wilfred Owen" style="width: 30px; height: 38px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
          </div>
          <div class="poem-lines" style="font-size: 7.8pt; margin-bottom: 2px;">
Gas! GAS! Quick, boys!—An ecstasy of fumbling,
Fitting the clumsy helmets just in time;
But someone still was yelling out and stumbling,
And flound'ring like a man in fire or lime...
Dim, through the misty panes and thick green light,
As under a green sea, I saw him drowning.

In all my dreams, before my helpless sight,
He plunges at me, guttering, choking, drowning...
          </div>
        </div>
      </div>

      <div class="section-title">Stop 5: Hooge Crater &amp; Sanctuary Wood (Hill 62)</div>
      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="photo-card">
          <img src="${hoogeCrater}" alt="Hooge Crater Mine Detonation" style="height: 95px;">
          <div class="caption">The 1915 mine crater blown by 3rd Canadian Tunnelling Co.</div>
        </div>
        <div class="photo-card">
          <img src="${hoogeTrench}" alt="Preserved Trenches at Hooge" style="height: 95px;">
          <div class="caption">Preserved sandbagged frontline trenches at Sanctuary Wood</div>
        </div>
      </div>

      <div class="talking-points-box" style="margin-bottom: 0;">
        <div class="box-header">🎤 Stop 5 Tour Script: Underground Warfare &amp; Mud</div>
        <div style="font-size: 7.8pt; color: #334155; line-height: 1.38;">
          <strong>The War Beneath the Ground:</strong> At Hooge, British and German trenches were less than 15 yards apart. Unable to cross No Man's Land above ground, miners dug tunnels deep into the clay, planting tons of ammonal explosive beneath enemy listening posts.<br>
          <strong>Walk the Preserved Mud:</strong> As you walk the corrugated iron revetments, imagine living in this quagmire for days with constant shell-splinters, buzzing flies, and the smell of stagnant water and decaying horses.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 8 · Stops 4 &amp; 5: Vancouver Corner &amp; Hooge Crater</span>
    </div>
  </div>


  <!-- ================= PAGE 9: TYNE COT COMMONWEALTH CEMETERY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Stops · Tyne Cot British Cemetery</div>
          <div class="school-sub">Stop 6 · The Largest Commonwealth War Cemetery in the World</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Passchendaele</div>
          <div class="lead">Friday 14:15</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px; align-items: center;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 6 Tour Script: The Scale of Passchendaele</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>The Staggering Figures:</strong> 11,961 soldiers are buried here. Of these, <strong>8,369 are unidentified</strong>—their headstones bear only Kipling's words: <em>"A Soldier of the Great War · Known unto God"</em>.<br>
            <strong>The Pillboxes of Passchendaele:</strong> In October 1917, this was a heavily defended German bunker stronghold. King George V suggested that the Great Cross of Sacrifice be built directly atop the central captured German pillbox.<br>
            <strong>The Missing:</strong> On the curved memorial walls at the rear are carved the names of <strong>34,996 officers and men</strong> who fell after 16 August 1917 and have no known resting place.
          </div>
        </div>

        <div class="photo-card">
          <img src="${tyneCot}" alt="Tyne Cot" style="height: 110px;">
          <div class="caption">The Cross of Sacrifice erected directly over a German concrete bunker</div>
        </div>
      </div>

      <div class="search-box" style="margin-bottom: 8px;">
        <div class="search-header">🔍 Locating Our Four Village Fallen on Tyne Cot Walls</div>
        <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.35;">
          Pupils must disperse along the rear curved colonnade to find and touch four heroes of Stubbington:<br>
          • <strong>Panel 85: Private Frederick Muckett</strong> (2nd Hampshire Regt, born in Chark, fell 20 Nov 1917, age 21)<br>
          • <strong>Panel 125: Private Frank Rye</strong> (1st/4th King's Own Yorkshire Light Infantry, fell 9 Oct 1917, age 25)<br>
          • <strong>Panel 142: Lance Corporal Charles Ward</strong> (8th Machine Gun Corps, fell 22 Oct 1917, age 23)<br>
          • <strong>Panel 142: Private George Warland</strong> (2nd Machine Gun Corps, fell 26 Oct 1917, age 24)
        </div>
      </div>

      <!-- On-Site Reading: Anthem for Doomed Youth -->
      <div class="reading-box" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">Anthem for Doomed Youth</div>
            <div class="poet-meta">Wilfred Owen, MC (1893–1918) · Composed at Craiglockhart Hospital, 1917</div>
          </div>
          <img src="${owenImg}" alt="Wilfred Owen" style="width: 30px; height: 38px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 7.8pt; margin-bottom: 2px;">
What passing-bells for these who die as cattle?
    — Only the monstrous anger of the guns.
    Only the stuttering rifles' rapid rattle
Can patter out their hasty orisons.
No mockeries now for them; no prayers nor bells;
    Nor any voice of mourning, save the choirs,—
The shrill, demented choirs of wailing shells;
    And bugles calling for them from sad shires.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 9 · Stop 6: Tyne Cot British Cemetery</span>
    </div>
  </div>


  <!-- ================= PAGE 10: THE MENIN GATE CEREMONY ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 2 Field Stops · The Menin Gate Ceremony</div>
          <div class="school-sub">Stop 8 · Sir Reginald Blomfield's Memorial &amp; The 8:00 PM Last Post</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Ypres (Ieper)</div>
          <div class="lead">Friday 20:00</div>
        </div>
      </div>

      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 8 Tour Script: The Menin Gate</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>The Gateway to the Front:</strong> Through this eastern rampart opening marched hundreds of thousands of British and Commonwealth troops on their way to the frontline. For tens of thousands, it was their final march.<br>
            <strong>54,395 Names of the Missing:</strong> Designed by Sir Reginald Blomfield. Engraved with the names of soldiers who fell in the Salient before 16 August 1917 with no known grave.<br>
            <strong>The Last Post Tradition:</strong> Every evening at <strong>8:00 PM sharp</strong> since 1928, the Ypres volunteer fire brigade sound bugles beneath the arch. Traffic stops, and silence falls.
          </div>
        </div>

        <div class="photo-card">
          <img src="${meninGate}" alt="Menin Gate Memorial" style="height: 105px;">
          <div class="caption">The Menin Gate Memorial to the Missing, Ypres</div>
        </div>
      </div>

      <!-- Meoncross Wreath-Laying Box -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 4.5px solid #1e3a8a; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          🌺 Meoncross School Wreath-Laying Protocol
        </div>
        <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.4;">
          Selected Meoncross School pupils will step forward beneath the central arch to lay an official commemorative wreath on behalf of the school and the community of Stubbington. All students must stand in smart, dignified silence, coats buttoned, hats off, listening to the Buglers of the Last Post Association.
        </div>
      </div>

      <!-- On-Site Reading: The Ode of Remembrance -->
      <div class="reading-box" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">For the Fallen (The Ode of Remembrance)</div>
            <div class="poet-meta">Laurence Binyon (1869–1943) · Written September 1914 on the cliffs of Cornwall</div>
          </div>
          <img src="${binyonImg}" alt="Laurence Binyon" style="width: 30px; height: 38px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; margin-bottom: 3px;">
They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.

(All assemble and respond together: <strong>"We will remember them."</strong>)
        </div>
        <div style="font-size: 7.2pt; color: #78350f; font-style: italic; border-top: 1px dashed #fde047; padding-top: 3px;">
          <strong>Panel 35 Task:</strong> Before the crowd gathers, pupils will locate <strong>Private Franklin</strong> and <strong>Private Ayling</strong> on Panel 35 (Hampshire Regiment).
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 10 · Stop 8: The Menin Gate Ceremony</span>
    </div>
  </div>


  <!-- ================= PAGE 11: DAY 3 YPRES & TALBOT HOUSE ================= -->
  <div class="page page-break">
    <div>
      <div class="header-bar">
        <div>
          <div class="school-title">Day 3 Field Stops · Rebirth &amp; Fellowship</div>
          <div class="school-sub">Stops 9 &amp; 10 · Ypres Cloth Hall &amp; Talbot House (Everyman's Club)</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Poperinge &amp; Ypres</div>
          <div class="lead">Saturday Morning</div>
        </div>
      </div>

      <!-- Stop 9: Cloth Hall -->
      <div class="grid-2col" style="margin-bottom: 8px;">
        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 9 Tour Script: The Rebirth of Ypres</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>Total Destruction:</strong> By 1918, Ypres was rubble; Winston Churchill wanted the ruins left as a sacred memorial. Instead, citizens rebuilt stone-for-stone.<br>
            <strong>The Lakenhalle (Cloth Hall):</strong> Built in 1304 as Europe's greatest commercial market. Completely demolished by shellfire in 1914–1918. Rebuilt over 40 years. Inside is the <em>In Flanders Fields Museum</em>.
          </div>
        </div>

        <div class="photo-card">
          <img src="${clothHallRuins}" alt="Cloth Hall Ruins 1919" style="height: 100px;">
          <div class="caption">The Cloth Hall in total ruins, 1919 (top) &amp; rebuilt today</div>
        </div>
      </div>

      <!-- Stop 10: Talbot House -->
      <div class="grid-2col" style="margin-bottom: 8px; align-items: stretch;">
        <div class="photo-card">
          <img src="${talbotHouse}" alt="Soldiers Relaxing at Talbot House" style="height: 110px;">
          <div class="caption">Soldiers relaxing inside Tubby Clayton's 'Everyman's Club', 1916</div>
        </div>

        <div class="talking-points-box">
          <div class="box-header">🎤 Stop 10 Tour Script: Talbot House (Toc H)</div>
          <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
            <strong>The Haven Behind the Lines:</strong> In December 1915, Army Chaplain Rev. Philip 'Tubby' Clayton opened this house in Poperinge as an alternative to pubs and brothels.<br>
            <strong>"Abandon all rank that enter here":</strong> Officers and privates drank tea from the same mugs, played the same piano, and slept in the same garden.<br>
            <strong>The Upper Room:</strong> Climb the creaking wooden stairs to the hop-loft chapel. The carpenter's bench altar provided solace to soldiers hours before they returned to the Salient mud.
          </div>
        </div>
      </div>

      <!-- On-Site Reading: The Soldier -->
      <div class="reading-box" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div class="poem-title">The Soldier</div>
            <div class="poet-meta">Rupert Brooke (1887–1915) · Sub-Lieutenant, Royal Naval Division</div>
          </div>
          <img src="${brookeImg}" alt="Rupert Brooke" style="width: 30px; height: 38px; object-fit: cover; border-radius: 3px; border: 1px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; margin-bottom: 2px;">
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
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 11 · Stops 9 &amp; 10: Cloth Hall &amp; Talbot House</span>
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
          <div class="lead">Essential Terminology</div>
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
                <td>Severe medical condition caused by prolonged immersion in cold, wet mud, causing gangrene.</td>
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
                <td>Fine white limestone from Dorset, chosen for its luminosity and radical equality.</td>
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
          <strong>Heuvelland:</strong> 'Hill Country' south of Ypres (home of our Peace Village Hostel base).<br>
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
      <span>Meoncross History Department · Ypres 1914–1918 Official Field Guide</span>
      <span>Page 12 · Field Glossary &amp; Expedition Standards</span>
    </div>
  </div>

</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres 1914–1918 Official Field Guide & Companion PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
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
  console.log('✅ Ypres Field Guide & Companion PDF successfully created at:', outputPath);
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating Field Guide PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
