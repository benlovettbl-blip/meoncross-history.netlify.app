const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  console.log('♟️ Generating GCSE Chess Club Official Personas PDF on Desktop...');

  const desktopDir = path.join(process.env.USERPROFILE || 'C:\\Users\\fives', 'Desktop');
  const targetPdf = path.join(desktopDir, 'GCSE_Chess_Club_Nicknames.pdf');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GCSE History Revision Hub — Chess Club Official Personas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 8mm 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #ffffff;
      color: #0f172a;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }
    .brand-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .badge-top {
      font-family: 'Outfit', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #92400e;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 2px 7px;
      border-radius: 4px;
      display: inline-block;
      width: fit-content;
    }
    .title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 19px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.02em;
    }
    .subtitle {
      font-size: 10px;
      font-weight: 600;
      color: #475569;
    }
    .header-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
    }
    .dept-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: #1e3a8a;
      background: #dbeafe;
      border: 1px solid #bfdbfe;
      padding: 3px 9px;
      border-radius: 5px;
    }
    .compliance-pill {
      font-size: 8.5px;
      font-weight: 700;
      color: #15803d;
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      padding: 2px 6px;
      border-radius: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.2px;
      line-height: 1.25;
    }
    thead th {
      background: #0f172a;
      color: #f8fafc;
      font-family: 'Outfit', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 5px 7px;
      text-align: left;
    }
    tbody tr {
      border-bottom: 1px solid #e2e8f0;
    }
    tbody tr:nth-child(even) {
      background: #f8fafc;
    }
    td {
      padding: 4px 7px;
      vertical-align: middle;
    }
    .rank-cell {
      font-weight: 800;
      font-family: 'Outfit', monospace;
      font-size: 10px;
      text-align: center;
      width: 32px;
    }
    .rank-1 { color: #b45309; }
    .rank-2 { color: #475569; }
    .rank-3 { color: #9a3412; }
    .house-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .house-victory { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .house-warrior { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
    .house-dreadnought { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .house-invincible { background: #fef9c3; color: #a16207; border: 1px solid #fef08a; }

    .persona-cell {
      font-weight: 800;
      font-size: 10.5px;
      color: #0f172a;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }
    .handle-cell {
      font-family: 'Outfit', monospace;
      font-size: 9.5px;
      font-weight: 700;
      color: #475569;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      white-space: nowrap;
    }
    .spec-unit {
      font-weight: 700;
      font-size: 8.5px;
      color: #334155;
      white-space: nowrap;
    }
    .spec-detail {
      font-size: 8.8px;
      color: #334155;
      line-height: 1.25;
    }
    .footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 5px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8px;
      font-weight: 600;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div>
    <div class="header">
      <div class="brand-left">
        <span class="badge-top">Edexcel GCSE History Specification Cohort Registry</span>
        <h1 class="title">The History Revision Hub — Chess Club Official Personas</h1>
        <div class="subtitle">Academic Year 2026/27 • Period 6 Thursday League • 100% GDPR-Compliant Student Personas</div>
      </div>
      <div class="header-right">
        <span class="dept-badge">The History Department</span>
        <span class="compliance-pill">✓ UK GDPR &amp; DPA 2018 Compliant • Zero Pupil Identifiers</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 32px; text-align: center;">Rank</th>
          <th style="width: 85px;">House</th>
          <th style="width: 140px;">GCSE In-Club Persona</th>
          <th style="width: 125px;">System Handle</th>
          <th style="width: 130px;">Edexcel GCSE Unit</th>
          <th>Historical Specification Anchor &amp; Curriculum Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rank-cell rank-1">#1</td>
          <td><span class="house-badge house-invincible">Invincible</span></td>
          <td class="persona-cell">The Golden Stresemann</td>
          <td><span class="handle-cell">@GoldenStresemann</span></td>
          <td class="spec-unit">Paper 3: Weimar Germany</td>
          <td class="spec-detail"><strong>Gustav Stresemann:</strong> Chancellor &amp; Foreign Minister who rescued Weimar with the Rentenmark (1923), Dawes Plan (1924), Locarno Pact (1925), and 1926 Nobel Peace Prize.</td>
        </tr>
        <tr>
          <td class="rank-cell rank-2">#2</td>
          <td><span class="house-badge house-dreadnought">Dreadnought</span></td>
          <td class="persona-cell">Sir Francis Drake</td>
          <td><span class="handle-cell">@FrancisDrake</span></td>
          <td class="spec-unit">Paper 2: Early Elizabeth</td>
          <td class="spec-detail"><strong>Elizabethan Privateer:</strong> Global circumnavigation (1577–80), devastating Cadiz harbor raid ("singeing the King's beard" 1587), and decisive Armada victory at Gravelines (1588).</td>
        </tr>
        <tr>
          <td class="rank-cell rank-3">#3</td>
          <td><span class="house-badge house-warrior">Warrior</span></td>
          <td class="persona-cell">The Thomas Splint</td>
          <td><span class="handle-cell">@ThomasSplint</span></td>
          <td class="spec-unit">Paper 1: Western Front</td>
          <td class="spec-detail"><strong>Medical Innovation (1915):</strong> Rigid metal frame devised by Hugh Owen Thomas to stabilize fractured femurs in the trenches, slashing compound fracture mortality from 80% to &lt;20%.</td>
        </tr>
        <tr>
          <td class="rank-cell">#4</td>
          <td><span class="house-badge house-victory">Victory</span></td>
          <td class="persona-cell">The Shuttle Diplomat</td>
          <td><span class="handle-cell">@ShuttleDiplomat</span></td>
          <td class="spec-unit">Paper 2: Middle East</td>
          <td class="spec-detail"><strong>Henry Kissinger (1973–74):</strong> Intensive shuttle missions between Jerusalem, Cairo, and Damascus that negotiated the military disengagements following the Yom Kippur War.</td>
        </tr>
        <tr>
          <td class="rank-cell">#5</td>
          <td><span class="house-badge house-invincible">Invincible</span></td>
          <td class="persona-cell">The Armada Fireship</td>
          <td><span class="handle-cell">@ArmadaFireship</span></td>
          <td class="spec-unit">Paper 2: Early Elizabeth</td>
          <td class="spec-detail"><strong>Midnight Attack (7 Aug 1588):</strong> Eight unmanned, gunpowder-packed ablaze vessels steered into Calais roads, shattering the Spanish crescent formation and inducing mass panic.</td>
        </tr>
        <tr>
          <td class="rank-cell">#6</td>
          <td><span class="house-badge house-dreadnought">Dreadnought</span></td>
          <td class="persona-cell">Andreas Vesalius</td>
          <td><span class="handle-cell">@AndreasVesalius</span></td>
          <td class="spec-unit">Paper 1: Renaissance Medicine</td>
          <td class="spec-detail"><strong>Renaissance Anatomy (1543):</strong> Padua physician whose masterwork <em>De Humani Corporis Fabrica</em> utilized direct human dissection to disprove over 200 of Galen’s long-standing anatomical dogmas.</td>
        </tr>
        <tr>
          <td class="rank-cell">#7</td>
          <td><span class="house-badge house-warrior">Warrior</span></td>
          <td class="persona-cell">Joseph Lister</td>
          <td><span class="handle-cell">@JosephLister</span></td>
          <td class="spec-unit">Paper 1: Industrial Medicine</td>
          <td class="spec-detail"><strong>Antiseptic Surgery (1865):</strong> Introduced carbolic acid mist and sterilized dressings, eradicating post-surgical gangrene and laying the foundation for aseptic modern operating theatres.</td>
        </tr>
        <tr>
          <td class="rank-cell">#8</td>
          <td><span class="house-badge house-warrior">Warrior</span></td>
          <td class="persona-cell">The Bar Lev Defender</td>
          <td><span class="handle-cell">@BarLevDefender</span></td>
          <td class="spec-unit">Paper 2: Middle East</td>
          <td class="spec-detail"><strong>Suez Fortification (1967–73):</strong> Formidable chain of high sand ramparts, hardened bunkers, and minefields erected along the Suez Canal following the Six-Day War.</td>
        </tr>
        <tr>
          <td class="rank-cell">#9</td>
          <td><span class="house-badge house-invincible">Invincible</span></td>
          <td class="persona-cell">The Tudor Spymaster</td>
          <td><span class="handle-cell">@TudorSpymaster</span></td>
          <td class="spec-unit">Paper 2: Early Elizabeth</td>
          <td class="spec-detail"><strong>Sir Francis Walsingham:</strong> Elizabeth’s Secretary of State whose codebreaking network intercepted and deciphered the beer-barrel correspondence in the fatal 1586 Babington Plot.</td>
        </tr>
        <tr>
          <td class="rank-cell">#10</td>
          <td><span class="house-badge house-dreadnought">Dreadnought</span></td>
          <td class="persona-cell">William Harvey</td>
          <td><span class="handle-cell">@WilliamHarvey</span></td>
          <td class="spec-unit">Paper 1: Renaissance Medicine</td>
          <td class="spec-detail"><strong>Circulatory System (1628):</strong> Published <em>De Motu Cordis</em>, scientifically proving the heart operates as a mechanical pump constantly recirculating blood in a closed loop.</td>
        </tr>
        <tr>
          <td class="rank-cell">#11</td>
          <td><span class="house-badge house-warrior">Warrior</span></td>
          <td class="persona-cell">Alexander Fleming</td>
          <td><span class="handle-cell">@AlexanderFleming</span></td>
          <td class="spec-unit">Paper 1: Modern Medicine</td>
          <td class="spec-detail"><strong>Discovery of Penicillin (1928):</strong> Noticed <em>Penicillium notatum</em> mould destroying staphylococcus bacteria colonies at St Mary's Hospital, inaugurating modern antibiotic medicine.</td>
        </tr>
        <tr>
          <td class="rank-cell">#12</td>
          <td><span class="house-badge house-invincible">Invincible</span></td>
          <td class="persona-cell">The White Rose</td>
          <td><span class="handle-cell">@WhiteRose</span></td>
          <td class="spec-unit">Paper 3: Nazi Germany</td>
          <td class="spec-detail"><strong>Student Resistance (1942–43):</strong> Munich University resistance movement led by Hans and Sophie Scholl, distributing clandestine anti-Nazi leaflets urging sabotage of the regime.</td>
        </tr>
        <tr>
          <td class="rank-cell">#13</td>
          <td><span class="house-badge house-warrior">Warrior</span></td>
          <td class="persona-cell">The RAMC Field Medic</td>
          <td><span class="handle-cell">@RAMCFieldMedic</span></td>
          <td class="spec-unit">Paper 1: Western Front</td>
          <td class="spec-detail"><strong>Royal Army Medical Corps:</strong> Operated the Western Front casualty evacuation chain: Regimental Aid Posts (RAP) &rarr; Dressing Stations &rarr; Casualty Clearing Stations (CCS) &rarr; Base Hospitals.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>The History Revision Hub &bull; Disciplinary Excellence &amp; Retrieval Practice</span>
    <span>Edexcel GCSE History Specification (Paper 1 Medicine, Paper 2 Early Elizabeth &amp; Middle East, Paper 3 Weimar Germany)</span>
    <span>100% GDPR Anonymous Cohort Registry</span>
  </div>
</body>
</html>`;

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : fs.existsSync('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe')
        ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: targetPdf,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '6mm',
        right: '8mm',
        bottom: '6mm',
        left: '8mm',
      },
    });

    console.log(`✅ GCSE Chess Club Nicknames PDF successfully created on Desktop: ${targetPdf}`);
  } finally {
    await browser.close();
  }
})();
