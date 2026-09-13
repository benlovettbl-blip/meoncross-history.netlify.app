const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const units = ['medieval_england', 'great_war_part2'];

console.log('====================================================');
console.log('📜 GENERATING HIGH-YIELD REVISION CHEAT SHEETS');
console.log('====================================================');

units.forEach((unitId) => {
  const dataJsPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataJsPath)) {
    console.warn(`⚠️ Warning: ${dataJsPath} does not exist. Skipping.`);
    return;
  }

  const raw = fs.readFileSync(dataJsPath, 'utf8');
  let startIndex = raw.indexOf('{');
  let endIndex = raw.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1) return;
  const jsonStr = raw.substring(startIndex, endIndex + 1);

  let unitData;
  try {
    unitData = eval('(function(){ const mock_exams=[]; return ' + jsonStr + ';})()');
  } catch (err) {
    console.error(`❌ Failed to parse data.js for ${unitId}:`, err.message);
    return;
  }

  const title =
    unitData.title ||
    (unitId === 'medieval_england'
      ? 'KS3: Medieval England & The Struggle for Power (1066–1485)'
      : 'KS3: The Great War (1914–1919)');
  const enquiry = unitData.enquiry || '';
  const glossary = unitData.glossary || [];
  const lessons = unitData.lessons || [];

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - High-Yield Revision Cheat Sheet</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #1e3a8a;
      --secondary: #b45309;
      --bg: #f8fafc;
      --border: #cbd5e1;
      --text: #1e293b;
    }
    body {
      font-family: 'Inter', sans-serif;
      margin: 25px 30px;
      color: var(--text);
      line-height: 1.45;
      background: #ffffff;
    }
    h1 {
      font-family: 'Playfair Display', serif;
      color: var(--primary);
      border-bottom: 3px solid var(--primary);
      padding-bottom: 8px;
      text-align: center;
      font-size: 22pt;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .subtitle {
      text-align: center;
      font-size: 10.5pt;
      color: #64748b;
      margin-bottom: 20px;
      font-weight: 500;
    }
    .enquiry-callout {
      background: #f0f9ff;
      border: 1.5px solid #bae6fd;
      border-radius: 6px;
      padding: 10px 16px;
      margin-bottom: 22px;
      text-align: center;
    }
    .enquiry-callout strong {
      color: var(--primary);
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      display: block;
      margin-bottom: 3px;
    }
    .enquiry-callout p {
      margin: 0;
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-style: italic;
      color: #0f172a;
    }
    h2 {
      font-family: 'Inter', sans-serif;
      color: var(--secondary);
      border-bottom: 2px solid var(--border);
      margin: 24px 0 10px 0;
      padding-bottom: 4px;
      font-size: 13pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 8.8pt;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 6px 9px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: var(--primary);
      color: #ffffff;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 8.2pt;
    }
    tr:nth-child(even) {
      background: var(--bg);
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    }
    .card {
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 9px 12px;
      background: #ffffff;
      border-left: 3.5px solid var(--primary);
    }
    .card strong {
      display: block;
      color: var(--primary);
      font-size: 9.5pt;
      margin-bottom: 3px;
    }
    .card p {
      margin: 0;
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.35;
    }
    .rules-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-radius: 6px;
      padding: 10px 14px;
      margin-top: 20px;
    }
    .rules-box strong {
      color: #92400e;
      font-size: 9pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      display: block;
      margin-bottom: 4px;
    }
    .rules-box ol {
      margin: 0;
      padding-left: 18px;
      font-size: 8.5pt;
      color: #78350f;
      line-height: 1.4;
    }
    @media print {
      body { margin: 10mm; font-size: 8pt; }
      h1 { font-size: 16pt; }
      h2 { font-size: 11pt; page-break-after: avoid; }
      .card, table tr { page-break-inside: avoid; }
    }
  </style>
</head>
<body>

  <h1>${title}</h1>
  <div class="subtitle">High-Yield Departmental Revision Cheat Sheet &bull; Meoncross School History</div>

  ${
    enquiry
      ? `
  <div class="enquiry-callout">
    <strong>Overarching Historical Enquiry</strong>
    <p>“${enquiry}”</p>
  </div>
  `
      : ''
  }

  <h2>1. Master Disciplinary Glossary (${glossary.length} High-Yield Concepts)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Historical Term</th>
        <th style="width: 75%;">Rigorous Academic Definition</th>
      </tr>
    </thead>
    <tbody>
      ${glossary
        .map(
          (g) => `
      <tr>
        <td><strong>${g.term}</strong></td>
        <td>${g.definition}</td>
      </tr>
      `,
        )
        .join('')}
    </tbody>
  </table>

  <h2>2. Key Enquiries &amp; Historical Verdicts</h2>
  <div class="grid-2">
    ${lessons
      .map(
        (l, idx) => `
    <div class="card">
      <strong>Lesson ${idx + 1}: ${l.title}</strong>
      <p>${l.subtitle || l.enquiry || ''}</p>
    </div>
    `,
      )
      .join('')}
  </div>

  <div class="rules-box">
    <strong>The 4 Golden Rules of Extended Historical Writing (PEEL Standard)</strong>
    <ol>
      <li><strong>[P] Direct Thematic Point:</strong> Open every paragraph with a direct, analytical answer to the enquiry question.</li>
      <li><strong>[E] Specific Historical Evidence:</strong> Deploy precise names, dates, legislation, casualties, or contemporary quotes.</li>
      <li><strong>[E] Causal Explanation:</strong> Explain the exact mechanism: why and how one factor caused or accelerated the outcome.</li>
      <li><strong>[L] Evaluative Judgement:</strong> Weigh factors against explicit criteria to form a sustained, independent historical verdict.</li>
    </ol>
  </div>

</body>
</html>
`;

  const outTargets = [
    path.join(ROOT_DIR, 'public', 'units', unitId, 'cheat_sheet.html'),
    path.join(ROOT_DIR, 'units', unitId, 'cheat_sheet.html'),
  ];

  outTargets.forEach((target) => {
    if (fs.existsSync(path.dirname(target))) {
      fs.writeFileSync(target, html, 'utf8');
      console.log(`✅ Generated ${path.relative(ROOT_DIR, target)}`);
    }
  });
});
