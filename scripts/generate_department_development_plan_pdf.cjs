const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PDF_OUT_PUBLIC = path.join(
  __dirname,
  '..',
  'public',
  'pdfs',
  'history_department_development_plan_2026_2027.pdf',
);
const PDF_OUT_GDRIVE =
  'G:\\My Drive\\AAMX\\Dep File\\History Department Development Plan 2026-2027.pdf';
const HTML_OUT_PUBLIC = path.join(
  __dirname,
  '..',
  'public',
  'history_department_development_plan_2026_2027.html',
);

const ddpData = [
  {
    category: 'Academic Achievement (GCSE)',
    sipBadge: 'Subject Core Priority',
    sipBadgeColor: '#0284c7',
    aim: 'Secure strong student attainment and confidence in Edexcel GCSE History (Papers 1, 2, and 3) while keeping marking manageable through standardized question stamps and clear model answers.',
    actions: [
      'Embed revised Edexcel exam question formats into teaching: 4-mark Consequence stamps (PEE), 8-mark Narrative flowcharts, and 8-mark Importance frameworks in Conflict in the Middle East and Elizabethan England.',
      'Use low-stakes recall quizzes (Do Nows and Flashcard Vault) at the start of lessons to reinforce core knowledge and retention.',
    ],
    criteria: [
      'Consistent student completion of structured exam practice in workbooks.',
      'Revised Edexcel exam question frameworks (4-mark Consequence, 8-mark Narrative, 8-mark Importance) embedded in KS4 lessons.',
    ],
    dates: 'Ongoing 2026–27',
    owner: 'BL',
  },
  {
    category: 'Aspirational Curriculum',
    sipBadge: 'SIP Strategic Aim 2',
    sipBadgeSub: 'Coastal Education & Progression',
    sipBadgeColor: '#15803d',
    aim: 'Deliver a sequenced, chronologically secure 5-year curriculum that links national and global history with local Hampshire context (Funtley Ironworks, Portsmouth Dockyard, and Stubbington).',
    actions: [
      'Teach a coherent 5-year curriculum connecting local coastal heritage to national and international events.',
      'Use pure paragraph indexing [Act.Paragraph] in lesson materials to provide pupils with clear chronological structure and cognitive signposting.',
    ],
    criteria: [
      'Department Schemes of Work published and followed across all year groups.',
      'Pupils demonstrate secure chronological understanding and positive engagement with local historical context.',
    ],
    dates: 'Ongoing 2026–27',
    owner: 'BL',
  },
  {
    category: 'Co-Curriculum & Clubs',
    sipBadge: 'SIP Strategic Aim 2 & 4',
    sipBadgeSub: 'Opportunities Beyond the Classroom',
    sipBadgeColor: '#7c3aed',
    aim: 'Broaden pupil horizons and foster historical curiosity, strategic thinking, and leadership through extra-curricular activities and experiential field trips.',
    actions: [
      'Run the weekly Meoncross Chess Club, encouraging house participation, ladder progression, and tactical skill.',
      'Plan and deliver the biannual GCSE Ypres Battlefield Tour to support Paper 1 Western Front depth study.',
      'Support interested pupils in submitting research entries to the annual Hampshire Archives Local History Competition.',
    ],
    criteria: [
      'Regular pupil attendance and house engagement at Chess Club.',
      'Successful delivery of the 2026 GCSE Ypres Battlefield Tour.',
    ],
    dates: 'Ongoing 2026–27',
    owner: 'BL',
  },
  {
    category: 'Adaptive Teaching & SEND',
    sipBadge: 'SIP Strategic Aim 1 & 2',
    sipBadgeSub: 'Inclusive Practice & High Expectations',
    sipBadgeColor: '#b45309',
    aim: 'Ensure all SEND and lower-attaining pupils access challenging historical content effectively through pre-formatted dual coding and 3-tier scaffolding, with zero extra paper planning.',
    actions: [
      'Use printed workbooks paired with digital resources to support SEND pupils with 3-tier scaffolding (Bronze starters, Silver connectives, Gold evaluation).',
      'Utilize digital accessibility tools (built-in SEN mode, adjustable read-aloud speed, visual dual coding) to offload working memory.',
    ],
    criteria: [
      'SEND pupils access curriculum tasks successfully with appropriate scaffolding.',
      'Teacher planning workload minimized through standardized, pre-formatted resources.',
    ],
    dates: 'Embedded in practice',
    owner: 'BL',
  },
  {
    category: 'SMSC & British Values',
    sipBadge: 'SIP Strategic Aim 3',
    sipBadgeSub: 'Community & Personal Development',
    sipBadgeColor: '#0f766e',
    aim: 'Systematically explore British Values, democracy, and ethical issues naturally through the curriculum, recording key departmental touchpoints on Gridmaker.',
    actions: [
      "Address British Values, democracy, and moral dilemmas through curriculum topics (e.g. Peasants' Revolt 1381, Chartism, civil rights, and public health ethics).",
      "Log departmental curriculum touchpoints on the school's Gridmaker system on an ongoing basis as required by school policy.",
    ],
    criteria: [
      'Key topics recorded on Gridmaker as required for whole-school auditing.',
      'Pupils engage thoughtfully with ethical and moral questions during classroom discussions.',
    ],
    dates: 'Termly as needed',
    owner: 'BL',
  },
];

function generateHTML() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Meoncross School History Department - Department Development Plan 2026-27</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    
    * { box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-size: 8.5pt;
      line-height: 1.45;
    }

    .page {
      padding: 24px 30px;
      page-break-after: always;
      position: relative;
    }
    .page:last-child { page-break-after: auto; }

    /* Executive Header */
    .header {
      background: linear-gradient(135deg, #1b365d 0%, #0f172a 100%);
      color: #ffffff;
      padding: 16px 22px;
      border-radius: 8px;
      border-bottom: 4px solid #facc15;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 19pt;
      margin: 0 0 3px 0;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 0;
      font-size: 9pt;
      color: #93c5fd;
      font-weight: 500;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 10px;
    }
    .meta-label {
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .meta-val {
      font-size: 9pt;
      font-weight: 700;
      color: #1b365d;
    }

    /* Table Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      table-layout: fixed;
    }
    th {
      background: #1b365d;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 8px 12px;
      text-align: left;
      border: 1px solid #1b365d;
    }
    td {
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      font-size: 8.2pt;
      line-height: 1.4;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    .col-obj { width: 24%; }
    .col-act { width: 36%; }
    .col-crt { width: 24%; }
    .col-dat { width: 11%; font-weight: 600; color: #1e40af; }
    .col-own { width: 5%; text-align: center; font-weight: 800; color: #1e3a8a; }

    .obj-title {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 9.5pt;
      color: #1b365d;
      margin-bottom: 4px;
      line-height: 1.25;
    }
    .sip-badge {
      display: inline-block;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 2px 7px;
      border-radius: 4px;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .obj-aim {
      color: #475569;
      font-size: 7.8pt;
      line-height: 1.35;
    }

    ol.actions-list {
      margin: 0;
      padding-left: 14px;
    }
    ol.actions-list li {
      margin-bottom: 5px;
    }
    ul.criteria-list {
      margin: 0;
      padding-left: 12px;
    }
    ul.criteria-list li {
      margin-bottom: 4px;
    }

    /* Executive Workload & Pedagogical Footnote */
    .workload-card {
      background: #fdfdfd;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 14px;
      margin-top: 14px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      font-size: 7.8pt;
      color: #475569;
    }
    .workload-pillar strong {
      display: block;
      color: #1b365d;
      font-size: 8.2pt;
      margin-bottom: 3px;
    }
  </style>
</head>
<body>

  <!-- Single Page / Clean 2-Page Format -->
  <div class="page">
    <div class="header">
      <div>
        <h1>Meoncross School History Department</h1>
        <p>Department Development Plan (DDP) 2026–2027</p>
      </div>
      <div style="text-align: right;">
        <span style="background: #facc15; color: #1b365d; font-weight: 800; padding: 5px 12px; border-radius: 4px; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
          Operational Master
        </span>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-box">
        <div class="meta-label">Subject</div>
        <div class="meta-val">History</div>
      </div>
      <div class="meta-box">
        <div class="meta-label">Subject Leader</div>
        <div class="meta-val">Benjamin Lovett (Head of History)</div>
      </div>
      <div class="meta-box">
        <div class="meta-label">Academic Year</div>
        <div class="meta-val">2026–2027</div>
      </div>
      <div class="meta-box">
        <div class="meta-label">Alignment</div>
        <div class="meta-val">Meoncross SIP 2026</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th class="col-obj">Objective</th>
          <th class="col-act">Actions (how you will achieve the objective)</th>
          <th class="col-crt">Success criteria &amp; evidence</th>
          <th class="col-dat">Dates</th>
          <th class="col-own">Owner</th>
        </tr>
      </thead>
      <tbody>
        ${ddpData
          .slice(0, 3)
          .map(
            (row) => `
          <tr>
            <td>
              <span class="sip-badge" style="background:${row.sipBadgeColor};">${row.sipBadge}</span>
              <div class="obj-title">${row.category}</div>
              <div class="obj-aim">${row.aim}</div>
            </td>
            <td>
              <ol class="actions-list">
                ${row.actions.map((a) => `<li>${a}</li>`).join('')}
              </ol>
            </td>
            <td>
              <ul class="criteria-list">
                ${row.criteria.map((c) => `<li>${c}</li>`).join('')}
              </ul>
            </td>
            <td class="col-dat">${row.dates}</td>
            <td class="col-own">${row.owner}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <div class="page">
    <div class="header" style="margin-bottom: 12px; padding: 12px 20px;">
      <div>
        <h1 style="font-size: 15pt;">Meoncross School History Department Development Plan</h1>
        <p style="font-size: 8.5pt;">Priorities 4–5: Adaptive Teaching &amp; SMSC / British Values</p>
      </div>
      <span style="background: rgba(255,255,255,0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 8pt; font-weight: 600;">
        Page 2 of 2
      </span>
    </div>

    <table>
      <thead>
        <tr>
          <th class="col-obj">Objective</th>
          <th class="col-act">Actions (how you will achieve the objective)</th>
          <th class="col-crt">Success criteria &amp; evidence</th>
          <th class="col-dat">Dates</th>
          <th class="col-own">Owner</th>
        </tr>
      </thead>
      <tbody>
        ${ddpData
          .slice(3, 5)
          .map(
            (row) => `
          <tr>
            <td>
              <span class="sip-badge" style="background:${row.sipBadgeColor};">${row.sipBadge}</span>
              <div class="obj-title">${row.category}</div>
              <div class="obj-aim">${row.aim}</div>
            </td>
            <td>
              <ol class="actions-list">
                ${row.actions.map((a) => `<li>${a}</li>`).join('')}
              </ol>
            </td>
            <td>
              <ul class="criteria-list">
                ${row.criteria.map((c) => `<li>${c}</li>`).join('')}
              </ul>
            </td>
            <td class="col-dat">${row.dates}</td>
            <td class="col-own">${row.owner}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>

    <div class="workload-card">
      <div class="workload-pillar">
        <strong>1. Cognitive Offloading &amp; Workload</strong>
        Printed workbooks paired with the History Hub app pre-format scaffolding and dual coding once, cutting weekly teacher preparation and standardizing expectations.
      </div>
      <div class="workload-pillar">
        <strong>2. Meaningful Local History</strong>
        Hampshire connections (Funtley Ironworks, Portsmouth Royal Dockyard, Stubbington war memorials) ground national history in pupils' lived coastal environment.
      </div>
      <div class="workload-pillar">
        <strong>3. Straightforward Evidence</strong>
        GCSE exam question stamps provide structured pupil writing; SMSC touchpoints are recorded directly on Gridmaker without extra paperwork.
      </div>
    </div>
  </div>

</body>
</html>
`;
}

async function exportPDF() {
  console.log('Generating Department Development Plan HTML...');
  const htmlContent = generateHTML();
  fs.writeFileSync(HTML_OUT_PUBLIC, htmlContent);

  console.log('Launching Puppeteer for A4 Landscape rendering...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(require('url').pathToFileURL(HTML_OUT_PUBLIC).href, {
      waitUntil: 'networkidle0',
    });

    await page.pdf({
      path: PDF_OUT_PUBLIC,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
    });
    console.log('[SUCCESS] Department Development Plan PDF saved to public/pdfs:', PDF_OUT_PUBLIC);

    try {
      fs.copyFileSync(PDF_OUT_PUBLIC, PDF_OUT_GDRIVE);
      console.log(
        '[SUCCESS] Department Development Plan PDF copied to Google Drive:',
        PDF_OUT_GDRIVE,
      );
    } catch (gErr) {
      console.warn('[WARN] Could not copy to G Drive:', gErr.message);
    }
  } finally {
    await browser.close();
  }
}

exportPDF();
