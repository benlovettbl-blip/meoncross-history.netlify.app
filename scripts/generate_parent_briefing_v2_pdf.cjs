const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'ypres_2026_parent_information_pack_v2.pdf');

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

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Parent Information Pack (Version 2) · Meoncross School</title>
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
      font-size: 12pt;
      line-height: 1.35;
    }

    .page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 9mm 11mm;
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
      padding-bottom: 6px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .school-title {
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
    }

    .school-sub {
      font-size: 10.5pt;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 6px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 10.5pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 9.2pt;
      color: #334155;
      font-weight: 600;
    }

    /* Title Block */
    .title-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 11px 15px;
      border-radius: 7px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title-banner h1 {
      color: #ffffff;
      font-size: 16pt;
      letter-spacing: 0.02em;
    }

    .title-banner .sub {
      color: #fbbf24;
      font-size: 10.5pt;
      font-weight: 600;
      margin-top: 2px;
      font-family: 'Outfit', sans-serif;
    }

    .title-badge {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 5px 11px;
      border-radius: 6px;
      text-align: right;
      font-size: 10pt;
      color: #f8fafc;
      font-weight: 600;
      line-height: 1.3;
      flex-shrink: 0;
    }

    /* Section Title */
    .section-title {
      font-size: 13pt;
      color: #1e3a8a;
      font-weight: 800;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 7px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    /* Itinerary Cards */
    .itinerary-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
    }

    .day-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 12px 14px;
      display: flex;
      gap: 12px;
    }

    .day-pill {
      flex-shrink: 0;
      width: 74px;
      background: #1e3a8a;
      color: #ffffff;
      border-radius: 5px;
      padding: 6px 3px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .day-pill.day2 { background: #b45309; }
    .day-pill.day3 { background: #0f766e; }

    .day-pill .d-num { font-size: 12.5pt; font-weight: 800; line-height: 1; }
    .day-pill .d-date { font-size: 8.5pt; font-weight: 700; text-transform: uppercase; margin-top: 3px; }

    .day-details { flex: 1; }
    .day-title { font-size: 12pt; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .day-schedule {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .day-schedule li {
      font-size: 11.5pt;
      color: #334155;
      line-height: 1.42;
      margin-bottom: 6px;
      position: relative;
      padding-left: 13px;
      white-space: nowrap;
    }
    .day-schedule li:last-child {
      margin-bottom: 0;
    }
    .day-schedule li::before {
      content: "•";
      position: absolute;
      left: 1px;
      color: #2563eb;
      font-weight: bold;
    }
    .day-schedule li strong {
      color: #0f172a;
    }

    /* App Callout Banner */
    .app-callout {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 7px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .app-qr {
      width: 58px;
      height: 58px;
      background: #ffffff;
      padding: 2px;
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
    .app-heading { font-size: 12.5pt; font-weight: 800; color: #1e3a8a; margin-bottom: 1px; font-family: 'Playfair Display', serif; }
    .app-desc { font-size: 10.5pt; color: #334155; line-height: 1.3; }
    .app-url { font-size: 11pt; font-weight: 700; color: #2563eb; margin-top: 2px; }

    /* Footer Strip */
    .footer-bar {
      border-top: 1.5px solid #e2e8f0;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 8.5pt;
      color: #64748b;
      white-space: nowrap;
    }

    /* Page 2 Styles */
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 7px;
    }

    .info-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 10px;
    }

    .info-card-header {
      margin-bottom: 4px;
      padding-bottom: 3px;
      border-bottom: 2px solid #1e3a8a;
    }

    .info-card-header .title {
      font-size: 11.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .checklist {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .checklist li {
      font-size: 11pt;
      color: #334155;
      margin-bottom: 3.5px;
      line-height: 1.32;
      position: relative;
      padding-left: 13px;
    }
    .checklist li:last-child {
      margin-bottom: 0;
    }

    .checklist li::before {
      content: "▪";
      position: absolute;
      left: 1px;
      color: #2563eb;
      font-size: 10pt;
      line-height: 1;
    }

    .checklist li strong {
      color: #0f172a;
    }

    .notice-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 6px;
      padding: 7px 11px;
      margin-bottom: 7px;
    }

    .notice-box h4 {
      font-size: 12pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 3px;
    }

    .notice-box p {
      margin: 0 0 3px 0;
      font-size: 11pt;
      color: #334155;
      line-height: 1.33;
    }
    .notice-box p:last-child {
      margin-bottom: 0;
    }

    .action-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 7px;
      font-size: 11pt;
    }

    .action-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 5px 8px;
      text-align: left;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10pt;
      letter-spacing: 0.04em;
    }

    .action-table td {
      padding: 4px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      line-height: 1.25;
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
      font-size: 9.5pt;
      display: inline-block;
    }

    .badge-info {
      background: #eff6ff;
      color: #1d4ed8;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
      font-size: 9.5pt;
      display: inline-block;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1 (FRONT) ================= -->
  <div class="page page-break" id="page1">
    <div>
      <!-- Header -->
      <div class="header-bar">
        <div>
          <div class="school-title">Meoncross School History Department</div>
          <div class="school-sub">Parental Information Briefing · Version 2</div>
        </div>
        <div class="partner-pill">
          <div class="brand">The History Boys</div>
          <div class="lead">Mr B. Lovett &amp; Mr J. Garrett · Accompanied by 2 Staff</div>
        </div>
      </div>

      <!-- Main Title -->
      <div class="title-banner">
        <div>
          <h1>YPRES 1914–1918: FLANDERS FIELDS &amp; LOCAL HERITAGE</h1>
          <div class="sub">3-Day Immersive Study Tour · Thursday 1st – Saturday 3rd October 2026</div>
        </div>
        <div class="title-badge">
          Base: Peace Village Hostel<br>
          Mesen (Messines), Belgium
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
              <li><strong>06:15 Meet at Meoncross:</strong> 06:30 coach departure; Eurotunnel Le Shuttle crossing to Calais.</li>
              <li><strong>14:30 Essex Farm ADS:</strong> John McCrae dugout ('In Flanders Fields') &amp; 15-year-old Pte Strudwick.</li>
              <li><strong>15:15 Langemarck Cemetery:</strong> The somber <em>Studentenfriedhof</em> &amp; German commemoration.</li>
              <li><strong>16:00 Hooge Crater Museum:</strong> Preserved frontline trenches, deep mine craters &amp; archaeology.</li>
              <li><strong>17:45 Peace Village Hostel:</strong> Check-in at Mesen, 2-course dinner &amp; evening study debrief.</li>
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
            <div class="day-title">Passchendaele Ridge, Medical Care &amp; The Menin Gate</div>
            <ul class="day-schedule">
              <li><strong>09:15 Vancouver Corner:</strong> Brooding Soldier memorial &amp; 1915 gas attacks analysis.</li>
              <li><strong>09:45 Sanctuary Wood (Hill 62):</strong> Authentic preserved British frontline trenches &amp; tunnels.</li>
              <li><strong>11:30 Supermarket Lunch Stop:</strong> Supervised stop in Ypres (pupils select lunch with Euros).</li>
              <li><strong>13:00 Tyne Cot Cemetery:</strong> World's largest CWGC cemetery; locating our local fallen.</li>
              <li><strong>14:15 Lijssenthoek Cemetery:</strong> Casualty Clearing Station medical care &amp; Nurse Nellie Spindler.</li>
              <li><strong>15:45 Passchendaele Museum:</strong> 20ft underground dugout system &amp; recreated trenches.</li>
              <li><strong>20:00 Menin Gate Ceremony:</strong> Solemn Last Post Ceremony, wreath-laying &amp; Panel 35 tribute.</li>
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
            <div class="day-title">Daylight Menin Gate, Civilian Rebirth &amp; Poperinge</div>
            <ul class="day-schedule">
              <li><strong>09:15 Daylight Menin Gate:</strong> Architectural study &amp; morning walk atop Ypres Ramparts.</li>
              <li><strong>10:30 Grote Markt &amp; Chocolatier:</strong> Supervised visit to De Groote chocolatier for gift shopping.</li>
              <li><strong>11:20 Talbot House (Poperinge):</strong> Historic 'Every Man’s Club' soldiers' sanctuary &amp; chapel.</li>
              <li><strong>12:45 Town Centre Lunch &amp; Death Cells:</strong> Supervised lunch; visiting preserved execution cells.</li>
              <li><strong>14:30 Return Journey:</strong> Depart for Calais; 17:50 Le Shuttle (17:30 UK arrival); ~20:00 at school.</li>
            </ul>
          </div>
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
            Explore the full itinerary, interactive maps, cemetery coordinates, local hero dossiers, and the complete 16-poem anthology from any smartphone or tablet.
          </div>
          <div class="app-url">🌐 meoncross-history.netlify.app (Select 'History Battlefield Tour')</div>
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
  <div class="page" id="page2">
    <div>
      <!-- Header -->
      <div class="header-bar">
        <div>
          <div class="school-title">Meoncross School History Department · Ypres 2026</div>
          <div class="school-sub">Essential Logistics, Kit List, Rooming &amp; Parental Checklist (Version 2)</div>
        </div>
        <div class="partner-pill">
          <div class="brand">Key Logistics</div>
          <div class="lead">Briefing Information · Keep for Reference</div>
        </div>
      </div>

      <!-- 2-Column Information Cards -->
      <div class="grid-2col">
        <!-- Col 1: Footwear, Clothing & Towels -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Footwear, Clothing &amp; Towels</span>
          </div>
          <ul class="checklist">
            <li><strong>TOWELS (Mandatory):</strong> Pupils <strong>MUST bring their own bath/shower towel</strong>. The hostel does not provide towels for school groups.</li>
            <li><strong>Sanctuary Wood Muddy Trenches:</strong> Deep, authentic frontline trenches are wet and muddy. Pupils <strong>MUST bring a separate pair of wellington boots or sturdy walking boots</strong>, plus a clean, separate pair of shoes/trainers for coach and hostel.</li>
            <li><strong>Sturdy Plastic Bag:</strong> Every pupil must pack a strong plastic bag (or bin liner) in their daypack to seal away muddy boots before boarding the coach!</li>
            <li><strong>Waterproof Coat:</strong> Hooded rain jacket. We are outdoors regardless of light rain.</li>
            <li><strong>Warm Layers, Hat &amp; Gloves:</strong> Autumn in Belgium is cold on exposed ridges. Standing still at the 8:00 PM Menin Gate ceremony gets very cold.</li>
          </ul>
        </div>

        <!-- Col 2: Luggage, Food, Euros & Tech -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="title">Food, Luggage, Euros &amp; Devices</span>
          </div>
          <ul class="checklist">
            <li><strong>Day 1 Packed Lunch:</strong> Bring a packed lunch and snacks from home for the coach journey (no fast food at motorway services). Refillable water bottle.</li>
            <li><strong>Spending Money (€30–€40 Euros):</strong> In cash for supervised Friday &amp; Saturday supermarket lunches (fresh rolls/fruit) and Belgian chocolates.</li>
            <li><strong>Luggage:</strong> 1 main holdall (<15kg) for coach luggage hold + 1 small daypack inside coach. Casual clothes for hostel. Roll-on deodorant only (<strong>NO aerosols</strong>).</li>
            <li><strong>Plug Adapter:</strong> European 2-pin adapter for charging devices in bedrooms.</li>
            <li><strong>Mobile Phone Policy:</strong> Allowed by day for photos and web app. <strong>Collected each night in staff phone bag at curfew</strong> for proper rest.</li>
          </ul>
        </div>
      </div>

      <!-- Accommodation & Rooming Timeline -->
      <div class="notice-box">
        <h4>Accommodation, Safety &amp; Rooming Allocation Timeline</h4>
        <p>
          <strong>Expedition Base:</strong> Peace Village Hostel, Nieuwkerkestraat 9aB, 8957 Mesen, Belgium (Tel: +32 57 226 040 · info@peacevillage.be). Secure rural centre with keycard access, modern ensuite studios (typically 4–7 pupils with bunk beds), and recreational grounds. View facilities &amp; FAQs at: <a href="https://peacevillage.be/en/practical/faq" target="_blank" style="color: #1e3a8a; font-weight: 700; text-decoration: underline;">peacevillage.be/en/practical/faq</a>.
        </p>
        <p>
          <strong>Rooming &amp; Dietary Process (In ~2 Weeks):</strong> In approximately two weeks, pupils will submit rooming friend requests in school (ensuring every pupil is happily paired with close friends). Parents will also confirm specific dietary options (e.g. vegetarian evening meals; medical allergies are already on school records). Staff sleep on the same corridors with active evening checks.
        </p>
      </div>

      <!-- Action Items Table -->
      <div class="section-title">Parent Action Items &amp; Next Steps</div>
      <table class="action-table">
        <thead>
          <tr>
            <th style="width: 25%;">Item / Action</th>
            <th style="width: 48%;">Details &amp; Requirements</th>
            <th style="width: 27%;">Deadline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Code of Conduct Form</strong></td>
            <td>Signed agreement by pupil &amp; parent (Nut &amp; Sesame Policy).</td>
            <td><span class="badge-urgent">Return by Fri 25 Sep</span></td>
          </tr>
          <tr>
            <td><strong>Passport &amp; GHIC Collection</strong></td>
            <td>Hand in valid UK passport (>3m validity) &amp; GHIC card to Mr Lovett.</td>
            <td><span class="badge-urgent">Tonight / This Week</span></td>
          </tr>
          <tr>
            <td><strong>Rooming &amp; Dietary Choices</strong></td>
            <td>Pupils nominate friend pairs; parents confirm dietary meal choices.</td>
            <td><span class="badge-info">In Approx. 2 Weeks</span></td>
          </tr>
          <tr>
            <td><strong>Euros Currency (€)</strong></td>
            <td>Provide €30–€40 cash for Fri &amp; Sat supermarket lunches &amp; gifts.</td>
            <td><span class="badge-info">For Departure Day</span></td>
          </tr>
        </tbody>
      </table>

      <!-- Contacts & Joint Venture Banner -->
      <div style="background: #0f172a; color: #ffffff; padding: 7px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 10pt; margin-top: 4px;">
        <div>
          <span style="color: #fbbf24; font-weight: 700;">Expedition Staff:</span>
          Mr B. Lovett &amp; Mr J. Garrett (Tour Leaders) · 2 Accompanying Staff
        </div>
        <div>
          <span style="color: #94a3b8;">School Base 24/7 Emergency:</span>
          <strong style="color: #38bdf8;">+44 (0)1329 662182</strong>
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
  console.log('Generating Ypres 2026 Parent Information Pack (Version 2) PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  const html = getHtmlContent();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Evaluate page heights to verify no overflow
  const dimensions = await page.evaluate(() => {
    const p1 = document.getElementById('page1');
    const p2 = document.getElementById('page2');
    return {
      p1Scroll: p1 ? p1.scrollHeight : 0,
      p1Client: p1 ? p1.clientHeight : 0,
      p2Scroll: p2 ? p2.scrollHeight : 0,
      p2Client: p2 ? p2.clientHeight : 0,
    };
  });
  console.log('Page Dimensions:', dimensions);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log('✅ Parent Information Pack V2 PDF successfully created at:', outputPath);

  const v1Path = path.join(pdfsDir, 'ypres_2026_parent_information_pack.pdf');
  fs.copyFileSync(outputPath, v1Path);
  console.log('✅ Also mirrored to v1 path at:', v1Path);

  const gdriveDir = 'G:/My Drive/AAMX/trips/Somme Oct26';
  if (fs.existsSync(gdriveDir)) {
    const gdrivePathV2 = path.join(gdriveDir, 'Ypres 2026 Parent Information Pack v2.pdf');
    fs.copyFileSync(outputPath, gdrivePathV2);
    console.log('✅ Also copied to Google Drive at:', gdrivePathV2);

    const gdrivePathV1 = path.join(gdriveDir, 'Ypres 2026 Parent Information Pack.pdf');
    fs.copyFileSync(outputPath, gdrivePathV1);
    console.log('✅ Also mirrored to Google Drive at:', gdrivePathV1);
  }
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
}

module.exports = { getHtmlContent, generatePdf, outputPath };
