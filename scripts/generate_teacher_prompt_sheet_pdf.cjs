const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}
const outputPath = path.join(pdfsDir, 'Ypres_2026_Teacher_Meeting_Prompt_Sheet.pdf');

function getHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Teacher's Meeting Briefing & Prompt Sheet · Ypres 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

    @page {
      size: A4 portrait;
      margin: 7mm 9mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8.8pt;
      line-height: 1.35;
    }

    .sheet {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Header */
    .header {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 6px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .title {
      font-family: 'Outfit', sans-serif;
      font-size: 14pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.02em;
    }

    .subtitle {
      font-size: 8.8pt;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
    }

    .badge-bar {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      text-align: right;
    }

    /* Section styling */
    .section-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 10px;
      margin-bottom: 7px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      padding-bottom: 3px;
      border-bottom: 1.5px solid #e2e8f0;
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 9.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .time-tag {
      background: #eff6ff;
      color: #1e3a8a;
      font-weight: 800;
      font-size: 7.4pt;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
    }

    /* Fallen Heroes Grid */
    .fallen-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 4px;
    }

    .fallen-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #b45309;
      border-radius: 5px;
      padding: 6px 8px;
      font-size: 8pt;
      line-height: 1.3;
    }

    .fallen-box.tyne-cot {
      border-left-color: #0f766e;
    }

    .fallen-box strong {
      color: #0f172a;
      font-size: 8.4pt;
    }

    .fallen-tag {
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 2px 5px;
      border-radius: 3px;
      float: right;
    }

    .tag-menin { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .tag-tyne { background: #ccfbf1; color: #115e59; border: 1px solid #99f6e4; }

    /* Speaking Prompt Lists */
    .prompt-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .prompt-list li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 4px;
      font-size: 8.2pt;
      line-height: 1.32;
      color: #334155;
    }

    .prompt-list li::before {
      content: "▶";
      position: absolute;
      left: 1px;
      color: #2563eb;
      font-size: 6.5pt;
      top: 1px;
    }

    .prompt-list li strong {
      color: #0f172a;
    }

    .highlight-rule {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 4px;
      padding: 4px 7px;
      margin-bottom: 5px;
      font-size: 8pt;
      line-height: 1.3;
      color: #991b1b;
    }

    .highlight-rule strong {
      color: #7f1d1d;
    }

    .closing-box {
      background: #eff6ff;
      border: 1.5px solid #93c5fd;
      border-left: 5px solid #1e3a8a;
      border-radius: 6px;
      padding: 7px 11px;
    }

    .closing-quote {
      font-family: 'Playfair Display', serif;
      font-size: 9pt;
      font-style: italic;
      color: #1e3a8a;
      line-height: 1.35;
      margin: 0 0 4px 0;
    }

    .footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #64748b;
    }
  </style>
</head>
<body>

<div class="sheet">
  <!-- Header -->
  <div class="header">
    <div>
      <div class="title">YPRES 2026: PARENT BRIEFING MEETING · TEACHER RUNNING SHEET</div>
      <div class="subtitle">Mr Ben Lovett (Head of History) · Meeting Duration: ~30 mins + Q&amp;A</div>
    </div>
    <div class="badge-bar">
      Tour Dates: 1–3 Oct 2026 · Handout Follow-Along Order
    </div>
  </div>

  <!-- 1. Opening Hook & Our Local Fallen -->
  <div class="section-card" style="border-left: 4px solid #b45309; background: #fffbeb;">
    <div class="section-header">
      <div class="section-title">1. Welcome &amp; Opening Hook: Connecting Village Streets to Flanders</div>
      <span class="time-tag">00:00 – 05:00</span>
    </div>
    <p style="margin: 0 0 4px 0; font-size: 7.3pt; color: #451a03; line-height: 1.25;">
      <strong>The Teacher's Core Hook:</strong> <em>"This is not a passive holiday. Our pupils are traveling as field historians to honour young men from our own village who once walked the very streets our students walk today."</em>
    </p>
    <div class="fallen-grid">
      <!-- Menin Gate 1 -->
      <div class="fallen-box">
        <span class="fallen-tag tag-menin">Menin Gate · Panel 35</span>
        <strong>Pte Thomas John Franklin</strong> (Age 23 · 1st Hampshires)<br>
        Lived at Meadow Cottage, Chark, Lee-on-the-Solent. Killed 29 April 1915 defending Frezenberg Ridge under gas &amp; intense shelling. No known grave.
      </div>
      <!-- Menin Gate 2 -->
      <div class="fallen-box">
        <span class="fallen-tag tag-menin">Menin Gate · Panel 35</span>
        <strong>Pte William (Walter) Ayling</strong> (Age 20 · 1st Hampshires)<br>
        Lived in Stubbington Lane; village Baker Boy. Killed by shellfire north of Ypres 9 July 1915. Commemorated side-by-side with Pte Franklin.
      </div>
      <!-- Tyne Cot 1 -->
      <div class="fallen-box tyne-cot">
        <span class="fallen-tag tag-tyne">Tyne Cot · Panels 88–90</span>
        <strong>Pte Sydney Muckett</strong> (Age 21 · 15th 'Pompey Pals')<br>
        Lived at Brown's Farm, Stubbington; Grocer's errand boy. Killed 20 Sept 1917 during Menin Road Ridge assault (Passchendaele). No known grave.
      </div>
      <!-- Tyne Cot 2 -->
      <div class="fallen-box tyne-cot">
        <span class="fallen-tag tag-tyne">Tyne Cot · Panels 88–90</span>
        <strong>Pte Arthur Rye</strong> (Age 21 · 14th 'Pompey Pals')<br>
        Lived at Lower Crabthorne, Hill Head; Nurseryman. Brother-in-law to Muckett family; killed in Polygon Wood 6 days after Sydney (26 Sept 1917).
      </div>
    </div>
  </div>

  <!-- 2. Itinerary Overview (Handout Page 1) -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">2. Expedition Itinerary (Follows Handout Page 1)</div>
      <span class="time-tag">05:00 – 12:00</span>
    </div>
    <ul class="prompt-list">
      <li><strong>Joint Venture &amp; Care:</strong> Led by Mr Ben Lovett &amp; Mr James Garrett (The History Boys) + 2 Meoncross staff. High <strong>1:8 staff ratio</strong>, private executive coach throughout.</li>
      <li><strong>Day 1 (Thu 1 Oct):</strong> Meet <strong>06:15</strong> at Meoncross (<strong>06:30 sharp</strong> departure). Eurotunnel Le Shuttle. Afternoon: Essex Farm ADS (John McCrae 'In Flanders Fields' &amp; 15-yr-old Pte Strudwick), Langemarck German Cemetery (somber contrast), Hooge Crater trenches. Check-in Peace Village Hostel; 18:15 dinner &amp; debrief.</li>
      <li><strong>Day 2 (Fri 2 Oct):</strong> Vancouver Corner (gas attacks); Sanctuary Wood (Hill 62 preserved deep trenches); supervised supermarket lunch at Aldi in Ypres; Tyne Cot (locating village fallen); Lijssenthoek CCS (Nurse Nellie Spindler); Passchendaele 1917 Museum (20ft underground dugout); <strong>20:00 Menin Gate Last Post Ceremony</strong> (Meoncross wreath laying &amp; Panel 35 tribute).</li>
      <li><strong>Day 3 (Sat 3 Oct):</strong> Daylight Menin Gate &amp; Ramparts; De Groote artisan chocolate shop in Ypres; Talbot House in Poperinge ('Every Man's Club'); Town Hall death cells; 14:30 departure; ~20:00 arrival back at Meoncross.</li>
      <li><strong>Digital App Callout:</strong> Direct parents to the QR code on the handout: live updates, itinerary, poems, and maps at <span style="color:#2563eb; font-weight:700;">meoncross-history.netlify.app</span>.</li>
    </ul>
  </div>

  <!-- 3. Key Logistics, Kit List & Accommodation (Handout Page 2) -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">3. Logistics, Mandatory Kit &amp; Accommodation (Follows Handout Page 2)</div>
      <span class="time-tag">12:00 – 22:00</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
      <!-- Left Column -->
      <div>
        <div class="highlight-rule">
          <strong>⚠️ Sanctuary Wood Footwear (CRUCIAL):</strong> Preserved frontline trenches have real, deep mud. Mandatory <strong>separate pair of wellies/walking boots</strong> + clean change of trainers + <strong>strong plastic bag</strong> to seal muddy boots before re-boarding coach!
        </div>
        <ul class="prompt-list">
          <li><strong>Warm Clothing:</strong> Waterproof hooded coat, warm fleece/layers. <strong>Warm hat &amp; gloves mandatory</strong>—standing still on stone ramparts at Menin Gate at 8 PM is freezing!</li>
          <li><strong>MANDATORY TOWELS:</strong> Pupils <strong>MUST bring their own bath/shower towels</strong>. The hostel does not provide towels for school groups.</li>
          <li><strong>Luggage:</strong> 1 main holdall (max 15kg, coach hold) + 1 small daypack (inside coach with waterproofs, boots bag, packed lunch, water).</li>
          <li><strong>Toiletries:</strong> Roll-on deodorant only. <strong>Strictly NO aerosols</strong> (triggers coach/fire alarms).</li>
        </ul>
      </div>

      <!-- Right Column -->
      <div>
        <ul class="prompt-list">
          <li><strong>Food &amp; Catering:</strong> Day 1 packed lunch from home for coach. Days 2 &amp; 3 supervised Belgian supermarket lunch stops (fresh rolls, fruit). Buffet breakfasts &amp; 2-course evening dinners included at hostel.</li>
          <li><strong>Spending Money:</strong> <strong>€30 to €40 in cash (Euros)</strong> for supermarket lunches and chocolate gifts.</li>
          <li><strong>Passports &amp; GHIC:</strong> Collect tonight (valid UK passports &gt;3 months validity + GHIC/EHIC cards). European 2-pin adapter for charging phones.</li>
          <li><strong>Mobile Phone Policy:</strong> Allowed by day for photos and app. <strong>Collected every night in staff phone bag at curfew</strong> to ensure proper rest.</li>
          <li><strong>Accommodation &amp; FAQ:</strong> Peace Village Hostel, <strong>Nieuwkerkestraat 9aB, 8957 Mesen</strong> (+32 57 226 040). Mention website FAQ link (<span style="color:#1e3a8a; font-weight:700;">peacevillage.be/en/practical/faq</span>).</li>
          <li><strong>Rooming &amp; Dietaries:</strong> Friend pairing forms and dietary requirements (e.g. vegetarian evening meals) in ~2 weeks.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 4. Next Steps & Deadlines -->
  <div class="section-card" style="margin-bottom: 4px;">
    <div class="section-header">
      <div class="section-title">4. Immediate Parent Actions &amp; Deadlines</div>
      <span class="time-tag">22:00 – 25:00</span>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 10px; font-size: 7.2pt;">
      <div><strong>1. Code of Conduct:</strong> Signed agreement by pupil &amp; parent returned by <strong>Fri 25 Sept</strong>.</div>
      <div><strong>2. Passports &amp; GHIC:</strong> Hand in to Mr Lovett tonight (or School Office this week).</div>
      <div><strong>3. Emergency Contact:</strong> 24/7 School Base <strong>+44 (0)1329 662182</strong>.</div>
    </div>
  </div>

  <!-- 5. Inspiring Concluding Remark & Q&A -->
  <div class="closing-box">
    <div style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
      5. Concluding Words to Parents &amp; Open Q&amp;A (25:00 – 30:00)
    </div>
    <div class="closing-quote">
      "When your sons and daughters return to Meoncross on Saturday evening, they will be tired, and their boots will have the red clay of Flanders on them. But they will also return with an enduring sense of perspective, having stood where our village boys stood and carried their memory forward. Thank you for entrusting them to us."
    </div>
    <div style="font-size: 7.2pt; color: #1e3a8a; font-weight: 700;">
      👉 <em>"I'd now be delighted to open the floor to any questions you or your children may have."</em>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <span>Meoncross School History Department · Ypres 1914–1918 Study Tour</span>
    <span>Single-Sheet Teacher Briefing Card · Accurate for Parental Briefing Meeting</span>
  </div>
</div>

</body>
</html>`;
}

async function generate() {
  console.log('Generating Teacher Meeting Prompt Sheet PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setContent(getHtml(), { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log('✅ Teacher Prompt Sheet PDF successfully created at:', outputPath);

  const gdriveDir = 'G:/My Drive/AAMX/trips/Somme Oct26';
  if (fs.existsSync(gdriveDir)) {
    const gdrivePath = path.join(gdriveDir, 'Ypres 2026 Teacher Meeting Prompt Sheet.pdf');
    fs.copyFileSync(outputPath, gdrivePath);
    console.log('✅ Also copied to Google Drive at:', gdrivePath);
  }
}

if (require.main === module) {
  generate().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
}

module.exports = { getHtml, generate, outputPath };
