const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_2026_parent_information_pack.pdf');

// Helper to convert images to base64
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
  const qrBase64 = getBase64Image('images/tour_app_qr.png');
  const tabletBase64 = getBase64Image('images/stubbington_memorial_2.jpg');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Parent Information Pack · Meoncross School</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');

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
      line-height: 1.35;
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

    /* Typography */
    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      margin: 0;
      color: #0f172a;
    }

    /* Header Bar */
    .header-bar {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 7px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 13pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
    }

    .school-sub {
      font-size: 8.5pt;
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
      font-size: 8.5pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 7.8pt;
      color: #334155;
      font-weight: 600;
    }

    /* Title Block */
    .title-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 10px 14px;
      border-radius: 8px;
      margin-bottom: 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title-banner h1 {
      color: #ffffff;
      font-size: 15.5pt;
      letter-spacing: 0.02em;
    }

    .title-banner .sub {
      color: #fbbf24;
      font-size: 8.5pt;
      font-weight: 600;
      margin-top: 2px;
      font-family: 'Outfit', sans-serif;
    }

    .title-badge {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 5px 10px;
      border-radius: 6px;
      text-align: right;
      font-size: 8pt;
      color: #f8fafc;
      font-weight: 500;
      line-height: 1.3;
    }

    /* Core Mission Box */
    .heritage-box {
      background: #fefce8;
      border: 1px solid #fef08a;
      border-left: 4.5px solid #d97706;
      border-radius: 7px;
      padding: 9px 13px;
      margin-bottom: 9px;
    }

    .heritage-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .heritage-tag {
      background: #d97706;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.05em;
    }

    .heritage-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #78350f;
    }

    .heritage-content {
      font-size: 8.4pt;
      color: #451a03;
      line-height: 1.4;
    }

    /* Itinerary Cards */
    .section-title {
      font-size: 10pt;
      color: #1e3a8a;
      font-weight: 800;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .itinerary-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 8px;
    }

    .day-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
      display: flex;
      gap: 12px;
    }

    .day-pill {
      flex-shrink: 0;
      width: 64px;
      background: #1e3a8a;
      color: #ffffff;
      border-radius: 5px;
      padding: 4px 3px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .day-pill.day2 { background: #b45309; }
    .day-pill.day3 { background: #0f766e; }

    .day-pill .d-num { font-size: 10pt; font-weight: 800; line-height: 1; }
    .day-pill .d-date { font-size: 6.2pt; font-weight: 600; text-transform: uppercase; margin-top: 2px; }

    .day-details { flex: 1; }
    .day-title { font-size: 9.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .day-schedule {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .day-schedule li {
      font-size: 7.9pt;
      color: #334155;
      line-height: 1.35;
      margin-bottom: 2px;
      position: relative;
      padding-left: 12px;
    }
    .day-schedule li::before {
      content: "•";
      position: absolute;
      left: 2px;
      color: #2563eb;
      font-weight: bold;
    }
    .day-schedule li strong {
      color: #0f172a;
    }

    /* Key Expedition Highlights */
    .highlights-bar {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }

    .highlight-pill-card {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 8px;
      text-align: center;
    }

    .highlight-pill-card .icon {
      font-size: 11pt;
      display: block;
      margin-bottom: 2px;
    }

    .highlight-pill-card .hl-title {
      font-size: 8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .highlight-pill-card .hl-desc {
      font-size: 7.2pt;
      color: #475569;
      line-height: 1.25;
      margin-top: 2px;
    }

    /* App Callout Banner */
    .app-callout {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 7px;
      padding: 7px 11px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .app-qr {
      width: 58px;
      height: 58px;
      background: #ffffff;
      padding: 3px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      flex-shrink: 0;
    }

    .app-qr img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .app-text { flex: 1; }
    .app-heading { font-size: 9.2pt; font-weight: 800; color: #1e3a8a; margin-bottom: 1px; font-family: 'Playfair Display', serif; }
    .app-desc { font-size: 7.6pt; color: #334155; line-height: 1.28; }
    .app-url { font-size: 7.8pt; font-weight: 700; color: #2563eb; margin-top: 2px; }

    /* Footer Strip */
    .footer-bar {
      border-top: 1.5px solid #e2e8f0;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #64748b;
    }

    /* Page 2 Styles */
    .grid-2x2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 6px;
    }

    .info-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 9px;
    }

    .info-card-header {
      margin-bottom: 4px;
      padding-bottom: 3px;
      border-bottom: 2px solid #1e3a8a;
    }

    .info-card-header .title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .checklist {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .checklist li {
      font-size: 7.4pt;
      color: #334155;
      margin-bottom: 2.5px;
      line-height: 1.25;
      position: relative;
      padding-left: 13px;
    }

    .checklist li::before {
      content: "▪";
      position: absolute;
      left: 2px;
      color: #2563eb;
      font-size: 8.5pt;
      line-height: 1;
    }

    .checklist li strong {
      color: #0f172a;
    }

    .notice-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 6px;
    }

    .notice-box h4 {
      font-size: 9pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .notice-box p {
      margin: 0 0 3px 0;
      font-size: 7.5pt;
      color: #334155;
      line-height: 1.28;
    }

    .action-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
      font-size: 7.5pt;
    }

    .action-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 7px;
      text-align: left;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 6.8pt;
      letter-spacing: 0.05em;
    }

    .action-table td {
      padding: 3.5px 7px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }

    .action-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .badge-urgent {
      background: #fef2f2;
      color: #991b1b;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #fecaca;
      font-size: 6.8pt;
      display: inline-block;
    }

    .badge-info {
      background: #eff6ff;
      color: #1d4ed8;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
      font-size: 6.8pt;
      display: inline-block;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1 (FRONT) ================= -->
  <div class="page page-break">
    <div>
      <!-- Header -->
      <div class="header-bar">
        <div>
          <div class="school-title">Meoncross School History Department</div>
          <div class="school-sub">Parental Information Briefing</div>
        </div>
        <div class="partner-pill">
          <div class="brand">The History Boys</div>
          <div class="lead">Mr B. Lovett &amp; Mr J. Garrett · Accompanied by 2 Meoncross Staff</div>
        </div>
      </div>

      <!-- Main Title -->
      <div class="title-banner">
        <div>
          <h1>YPRES 1914–1918: FLANDERS FIELDS &amp; LOCAL HERITAGE</h1>
          <div class="sub">A 3-Day Immersive Battlefield Study Tour · Thursday 1st – Saturday 3rd October 2026</div>
        </div>
        <div class="title-badge">
          Base: Peace Village Hostel<br>
          Mesen (Messines), Belgium
        </div>
      </div>

      <!-- Heritage Box -->
      <div class="heritage-box">
        <div class="heritage-header">
          <span class="heritage-title">Connecting Our Village Community to Flanders Fields</span>
        </div>
        <div class="heritage-content">
          On this expedition, our pupils are not passive tourists—they are field historians exploring our local community's living history. Carved into the Great War memorials back home across Stubbington and Lee-on-the-Solent are the names of young men who once walked our familiar streets before answering the call. Over these three days, pupils will bridge classroom history with village memory, physically locating and honouring our local fallen—including <strong>Private Thomas Franklin</strong> and <strong>Private William Ayling</strong> on Menin Gate Panel 35, and our village soldiers commemorated upon the memorial panels of Tyne Cot.
        </div>
      </div>

      <!-- 3-Day Itinerary -->
      <div class="section-title">3-Day Field Expedition Itinerary</div>
      <div class="itinerary-grid">
        <!-- Day 1 -->
        <div class="day-card">
          <div class="day-pill">
            <span class="d-num">DAY 1</span>
            <span class="d-date">Thu 1 Oct</span>
          </div>
          <div class="day-details">
            <div class="day-title">Departure, North Salient &amp; Mine Warfare</div>
            <ul class="day-schedule">
              <li><strong>06:15</strong> Meet at Meoncross School (06:30 sharp departure) via executive coach to Folkestone.</li>
              <li><strong>Transit:</strong> Eurotunnel Le Shuttle crossing to Calais, arriving in Belgium early afternoon.</li>
              <li><strong>14:30 Essex Farm ADS:</strong> John McCrae dugout ('In Flanders Fields') &amp; 15-year-old Pte Strudwick.</li>
              <li><strong>15:15 Langemarck German Cemetery:</strong> The somber <em>Studentenfriedhof</em> and contrast in commemoration.</li>
              <li><strong>16:00 Hooge Crater Museum:</strong> Preserved frontline trenches, deep mine craters, and battlefield archaeology.</li>
              <li><strong>17:45 Check-in &amp; Evening:</strong> Peace Village Hostel; 18:15 2-course dinner followed by evening study debrief.</li>
            </ul>
          </div>
        </div>

        <!-- Day 2 -->
        <div class="day-card">
          <div class="day-pill day2">
            <span class="d-num">DAY 2</span>
            <span class="d-date">Fri 2 Oct</span>
          </div>
          <div class="day-details">
            <div class="day-title">Passchendaele Ridge, Medical Evacuation &amp; The Menin Gate</div>
            <ul class="day-schedule">
              <li><strong>09:15 Vancouver Corner:</strong> The Brooding Soldier memorial; analysing the first gas attacks of 1915.</li>
              <li><strong>09:45 Sanctuary Wood (Hill 62):</strong> Authentic preserved frontline British trench system and tunnels.</li>
              <li><strong>11:30 Supermarket Lunch:</strong> Supervised lunch stop at Aldi in Ypres (pupils select fresh items using Euros).</li>
              <li><strong>13:00 Tyne Cot British War Cemetery:</strong> World's largest CWGC cemetery; locating our village fallen.</li>
              <li><strong>14:15 Lijssenthoek Military Cemetery:</strong> Casualty Clearing Station medical evacuation &amp; Nurse Nellie Spindler.</li>
              <li><strong>15:45 Passchendaele 1917 Museum:</strong> Walk-through 20ft underground dugout system and recreated trenches.</li>
              <li><strong>20:00 Menin Gate Ceremony:</strong> Solemn Last Post Ceremony; Meoncross wreath-laying &amp; Panel 35 tribute.</li>
            </ul>
          </div>
        </div>

        <!-- Day 3 -->
        <div class="day-card">
          <div class="day-pill day3">
            <span class="d-num">DAY 3</span>
            <span class="d-date">Sat 3 Oct</span>
          </div>
          <div class="day-details">
            <div class="day-title">Menin Gate Daylight, Civilian Rebirth &amp; Poperinge Sanctuaries</div>
            <ul class="day-schedule">
              <li><strong>09:15 Daylight Menin Gate:</strong> Detailed architectural study and morning walk atop Ypres Ramparts.</li>
              <li><strong>10:30 Grote Markt &amp; Chocolatier:</strong> Supervised visit to De Groote’s artisan chocolatier for gift shopping.</li>
              <li><strong>11:20 Talbot House (Poperinge):</strong> The famous 'Every Man’s Club' where rank was strictly abandoned.</li>
              <li><strong>12:45 Town Centre Lunch &amp; Death Cells:</strong> Supervised lunch; visiting preserved Town Hall execution cells.</li>
              <li><strong>14:30 Return Journey:</strong> Depart for Calais; 17:50 Le Shuttle crossing (17:30 UK arrival); ~20:00 back at school.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Key Reassurance Highlights -->
      <div class="highlights-bar">
        <div class="highlight-pill-card">
          <span class="icon">🛡️</span>
          <div class="hl-title">Dedicated Care</div>
          <div class="hl-desc">High 1:8 staff ratio, 24/7 leadership support, and private executive coach throughout.</div>
        </div>
        <div class="highlight-pill-card">
          <span class="icon">📖</span>
          <div class="hl-title">Specialist Historians</div>
          <div class="hl-desc">Every cemetery and trench led on-site by experienced GCSE &amp; KS3 History specialists.</div>
        </div>
        <div class="highlight-pill-card">
          <span class="icon">🎖️</span>
          <div class="hl-title">Bespoke Field Packs</div>
          <div class="hl-desc">Every pupil receives a printed investigative field workbook and digital companion app.</div>
        </div>
      </div>

      <!-- App QR Callout -->
      <div class="app-callout">
        <div class="app-qr">
          <img src="${qrBase64}" alt="Scan QR Code">
        </div>
        <div class="app-text">
          <div class="app-heading">Explore the Expedition on Our Digital Field Companion</div>
          <div class="app-desc">
            We have created a bespoke digital tour companion and interactive web app for this expedition. Parents and pupils can explore the full itinerary, interactive maps, cemetery locations, local hero dossiers, and the complete 16-poem anthology from any smartphone, tablet, or home computer.
          </div>
          <div class="app-url">🌐 https://meoncross-history.netlify.app (Select 'History Battlefield Tour')</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <span>Meoncross School History Department · In Partnership with The History Boys</span>
      <span>Page 1 of 2 (Please Turn Over for Kit List &amp; Logistics)</span>
    </div>
  </div>


  <!-- ================= PAGE 2 (BACK) ================= -->
  <div class="page">
    <div>
      <!-- Header -->
      <div class="header-bar">
        <div>
          <div class="school-title">Meoncross School History Department · Ypres 2026</div>
          <div class="school-sub">Essential Logistics, Kit List, Rooming &amp; Parental Checklist</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Key Logistics</div>
          <div class="lead">Briefing Information · Keep for Reference</div>
        </div>
      </div>

      <!-- 2x2 Information Cards -->
      <div class="grid-2x2">
        <!-- Box 1: Footwear & Weather Kit -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Footwear &amp; Sanctuary Wood Prep</span>
          </div>
          <ul class="checklist">
            <li><strong>Sanctuary Wood Trenches (Crucial):</strong> At Sanctuary Wood (Hill 62), pupils will explore real, preserved, deep frontline trenches. These trenches are notoriously muddy and wet.</li>
            <li><strong>Separate Pair of Shoes / Wellington Boots:</strong> Pupils <strong>MUST bring a separate pair of wellington boots or sturdy walking boots</strong> specifically for walking in the muddy trenches, plus a clean, separate pair of shoes/trainers to change into afterwards.</li>
            <li><strong>Sturdy Plastic Bag (Essential):</strong> Every pupil must pack a strong plastic carrier bag (or bin bag) in their daypack to seal away their muddy, wet boots before re-boarding the coach and entering the hostel!</li>
            <li><strong>Waterproof &amp; Windproof Coat:</strong> Hooded rain jacket. We will be outdoors regardless of light rain.</li>
            <li><strong>Warm Fleece / Layers:</strong> Autumn in Belgium can be chilly and breezy on exposed ridges.</li>
            <li><strong>Warm Hat &amp; Gloves:</strong> Mandatory for all pupils. Standing still on the stone ramparts for the 8:00 PM Menin Gate ceremony gets extremely cold.</li>
            <li><strong>Socks:</strong> At least 4–5 pairs of comfortable walking socks.</li>
          </ul>
        </div>

        <!-- Box 2: Luggage & Bag Policy -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Luggage, Towels &amp; Toiletries</span>
          </div>
          <ul class="checklist">
            <li><strong>TOWELS (Mandatory):</strong> Pupils <strong>MUST bring their own bath/shower towels</strong>! The hostel does not provide towels for school groups.</li>
            <li><strong>Washbag &amp; Shower Gel:</strong> Shower gel, shampoo, soap, toothbrush, toothpaste, roll-on deodorant only (strictly NO aerosol cans allowed on coach or in hostel).</li>
            <li><strong>1 Main Holdall / Medium Suitcase:</strong> Placed in coach luggage hold until arrival at hostel. Please label clearly with student's full name. Maximum 15kg.</li>
            <li><strong>1 Small Daypack (Rucksack):</strong> Stays with student inside the coach. Must contain waterproof coat, plastic bag for muddy boots, water bottle, Day 1 packed lunch, and notebook/pen.</li>
            <li><strong>Comfortable Casual Clothes:</strong> Practical, comfortable clothing for downtime and evening activities at the hostel (jeans, joggers, hoodies, t-shirts). No formal or restaurant clothing required.</li>
          </ul>
        </div>

        <!-- Box 3: Food, Catering & Euros -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Catering, Food &amp; Spending Money</span>
          </div>
          <ul class="checklist">
            <li><strong>Day 1 (Thursday):</strong> Pupils <strong>MUST bring a packed lunch</strong> and travel snacks from home for the coach journey. No fast food purchases at motorway services.</li>
            <li><strong>Days 2 &amp; 3 Supermarket Lunches:</strong> On both Friday and Saturday, we make supervised stops at local Belgian supermarkets where pupils choose their own fresh packed lunch items (sandwiches/rolls, fruit, drinks, snacks).</li>
            <li><strong>Included Meals &amp; Dietary Options:</strong> Buffet breakfasts at the hostel (Fri &amp; Sat); 2-course evening group dinners served on-site at Peace Village (both Thu &amp; Fri). Specific dietary requirements (e.g. vegetarian options) will be gathered alongside roomings in ~2 weeks (school already holds medical allergy records).</li>
            <li><strong>Spending Money (Euros):</strong> Pupils require <strong>€30 to €40 in cash (Euros)</strong>. This comfortably covers their Friday and Saturday supermarket lunches, plus Belgian chocolates or small souvenirs.</li>
            <li><strong>Water Bottle:</strong> Refillable water bottle for coach and field walking.</li>
          </ul>
        </div>

        <!-- Box 4: Travel Documents & Tech -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Travel Documents &amp; Devices</span>
          </div>
          <ul class="checklist">
            <li><strong>Passports &amp; GHIC/EHIC Collection:</strong> Valid UK passports and GHIC/EHIC cards will be collected in advance by Mr Lovett at tonight's Parental Briefing meeting (or immediately afterwards) for secure administrative checks and group border clearance.</li>
            <li><strong>European 2-Pin Plug Adapter:</strong> Required for charging mobile phones/devices in hostel bedrooms.</li>
            <li><strong>Mobile Phone Policy:</strong> Permitted during the day for photography and accessing the history web app. To ensure all pupils receive a proper night's sleep, <strong>all mobile phones will be collected each evening in a dedicated staff phone bag at curfew</strong> and securely stored overnight.</li>
          </ul>
        </div>
      </div>

      <!-- Accommodation & Rooming Timeline -->
      <div class="notice-box">
        <h4>Accommodation, Safety &amp; Rooming Allocation Timeline</h4>
        <p>
          <strong>Expedition Base:</strong> Peace Village Hostel, Nieuwkerkestraat 9aB, 8957 Mesen, Belgium (Tel: +32 57 226 040 · Email: info@peacevillage.be). A purpose-built, secure rural educational centre set in the Flemish countryside at Messines, featuring modern ensuite studios (typically 4 to 7 pupils per room with bunk beds), secure keycard access, and dedicated dining and recreational spaces.
        </p>
        <p>
          <strong>Accommodation FAQs &amp; Facilities:</strong> Parents can view studio layouts, amenities, and visitor FAQs directly on the hostel website at <a href="https://peacevillage.be/en/faqs" target="_blank" style="color: #1e3a8a; font-weight: 700; text-decoration: underline;">www.peacevillage.be/en/faqs</a>.
        </p>
        <p>
          <strong>Rooming Process &amp; Dietary Options:</strong> In approximately <strong>two weeks' time</strong>, Mr Lovett will assemble rooming allocations in school. Pupils will be asked to nominate friends they would like to share with (ensuring every pupil is happily paired). <strong>When this rooming information is sent out, Mr Lovett will also ask parents to confirm any specific dietary requirements (e.g. vegetarian options; note that the school already holds existing medical allergy records).</strong> Staff sleep on the same corridors with active evening checks and a strict curfew.
        </p>
      </div>

      <!-- Action Items Table -->
      <div class="section-title">Parent Action Items &amp; Next Steps</div>
      <table class="action-table">
        <thead>
          <tr>
            <th style="width: 25%;">Item / Action</th>
            <th style="width: 45%;">Details &amp; Requirements</th>
            <th style="width: 30%;">Deadline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Code of Conduct Form</strong></td>
            <td>Signed agreement by pupil &amp; parent regarding behaviour and respect at war memorials.</td>
            <td><span class="badge-urgent">Return by Fri 25 Sep</span></td>
          </tr>
          <tr>
            <td><strong>Passport &amp; GHIC Collection</strong></td>
            <td>Hand in valid UK passport and GHIC/EHIC card to Mr Lovett tonight (or to School Office this week).</td>
            <td><span class="badge-urgent">Tonight / This Week</span></td>
          </tr>
          <tr>
            <td><strong>Rooming &amp; Dietary Choices</strong></td>
            <td>Pupils nominate friend rooming requests; parents confirm dietary options (e.g. vegetarian meals).</td>
            <td><span class="badge-info">In Approx. 2 Weeks</span></td>
          </tr>
          <tr>
            <td><strong>Euros Currency (€)</strong></td>
            <td>Provide €30–€40 in cash for pupil Friday &amp; Saturday supermarket lunches and small souvenirs.</td>
            <td><span class="badge-info">For Departure Day</span></td>
          </tr>
        </tbody>
      </table>

      <!-- Contacts & Joint Venture Banner -->
      <div style="background: #0f172a; color: #ffffff; padding: 7px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.6pt;">
        <div>
          <span style="color: #fbbf24; font-weight: 700;">Expedition Staff:</span>
          Mr B. Lovett &amp; Mr J. Garrett (Tour Leaders) · Accompanied by Two Meoncross Staff
        </div>
        <div>
          <span style="color: #94a3b8;">School Base 24/7 Emergency:</span>
          <strong>+44 (0)1329 662182</strong>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <span>Meoncross School History Department · In Partnership with The History Boys</span>
      <span>Page 2 of 2 · Information Accurate for 1st–3rd October 2026 Tour</span>
    </div>
  </div>

</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres 2026 Parent Information Pack PDF...');
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
  console.log('✅ Parent Information Pack PDF successfully created at:', outputPath);

  const gdriveDir = 'G:/My Drive/AAMX/trips/Somme Oct26';
  if (fs.existsSync(gdriveDir)) {
    const gdrivePath = path.join(gdriveDir, 'Ypres 2026 Parent Information Pack.pdf');
    fs.copyFileSync(outputPath, gdrivePath);
    console.log('✅ Also copied to Google Drive at:', gdrivePath);
  }
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
