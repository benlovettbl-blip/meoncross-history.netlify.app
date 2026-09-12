const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ADMIN_DIR = path.join(__dirname, '..', 'admin_internal');
if (!fs.existsSync(ADMIN_DIR)) {
  fs.mkdirSync(ADMIN_DIR, { recursive: true });
}

const PDF_OUT_ADMIN = path.join(
  ADMIN_DIR,
  'history_department_development_plan_2026_2027.pdf',
);
const PDF_OUT_GDRIVE = path.join(
  'G:\\My Drive\\AAMX\\Dep File',
  '00_Department_Admin_and_Policies',
  'History Department Development Plan 2026-2027.pdf',
);
const HTML_OUT_ADMIN = path.join(
  ADMIN_DIR,
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
      'Deploy 36-page Visual Revision & Exam Guides across Paper 1 (Medicine) and Paper 3 (USA) with balanced 4-4-4-4 question mastery.',
    ],
    criteria: [
      'Consistent student completion of structured exam practice in workbooks.',
      'Revised Edexcel exam question frameworks (4-mark Consequence, 8-mark Narrative, 8-mark Importance) embedded in KS4 lessons.',
    ],
    evidenceLinks: [
      {
        title: 'USA Exam & Revision Guide (36pp)',
        url: 'https://meoncross-history.netlify.app/pdfs/edexcel_usa_visual_revision_and_exam_guide.pdf',
      },
      {
        title: 'Medicine Exam & Revision Guide (36pp)',
        url: 'https://meoncross-history.netlify.app/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf',
      },
      {
        title: 'Department Marking & Feedback Policy',
        url: 'https://meoncross-history.netlify.app/pdfs/history_marking_and_feedback_policy_v2.pdf',
      },
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
    evidenceLinks: [
      {
        title: 'Whole-School Curriculum Overview (PDF)',
        url: 'https://meoncross-history.netlify.app/pdfs/whole_school_curriculum_overview.pdf',
      },
      {
        title: '5-Year Chronological Sequence Map',
        url: 'https://meoncross-history.netlify.app/pdfs/curriculum_overview_tabular.pdf',
      },
      {
        title: 'Henry Cort Funtley Primary Source Pack',
        url: 'https://meoncross-history.netlify.app/pdfs/henry_cort_funtley_primary_source_pack.pdf',
      },
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
      'Plan and deliver the GCSE Ypres Battlefield Study Visit (October 2026) to support Paper 1 Western Front depth study.',
      'Support interested pupils in submitting research entries to the annual Hampshire Archives Local History Competition.',
    ],
    criteria: [
      'Regular pupil attendance and house engagement at Chess Club.',
      'Successful delivery of the October 2026 Ypres Battlefield Study Visit.',
    ],
    evidenceLinks: [
      {
        title: 'Ypres Pupil Field Guide (32pp)',
        url: 'https://meoncross-history.netlify.app/pdfs/ypres_1914_1918_pupil_field_guide.pdf',
      },
      {
        title: 'Ypres 2026 Parent Information Pack',
        url: 'https://meoncross-history.netlify.app/pdfs/ypres_2026_parent_information_pack_v2.pdf',
      },
      {
        title: 'Chess Club QR Board Stand Resources',
        url: 'https://meoncross-history.netlify.app/pdfs/meoncross_chess_board_qr_stands.pdf',
      },
    ],
    dates: 'Ongoing 2026–27',
    owner: 'BL',
  },
  {
    category: 'Adaptive Teaching & SEND',
    sipBadge: 'SIP Strategic Aim 1 & 2',
    sipBadgeSub: 'Inclusive Practice & High Expectations',
    sipBadgeColor: '#b45309',
    aim: 'Ensure all SEND and lower-attaining pupils access challenging historical content effectively through embedded structural scaffolding and dual coding, with zero extra teacher planning workload.',
    actions: [
      'Embed structured writing scaffolds directly into printed workbooks and revision guides (model sentence starters, causal connective banks, and step-by-step PEE/PEEL structure strips) to build written fluency and independence.',
      'Utilize digital accessibility tools (built-in SEN mode, adjustable read-aloud speed, visual dual coding) to offload working memory.',
    ],
    criteria: [
      'SEND pupils access curriculum tasks successfully with appropriate scaffolding.',
      'Teacher planning workload minimized through standardized, pre-formatted resources.',
    ],
    evidenceLinks: [
      {
        title: 'Live History Hub (Digital SEN Mode)',
        url: 'https://meoncross-history.netlify.app/?view=booklet&unit=eee',
      },
      {
        title: 'Sample A4 Differentiated Workbook (EEE)',
        url: 'https://meoncross-history.netlify.app/pdfs/eee_pupil_workbook_KT1_FINAL_V17.pdf',
      },
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
    evidenceLinks: [
      {
        title: 'Gridmaker SMSC Curriculum Mapping',
        url: 'https://meoncross-history.netlify.app/pdfs/curriculum_overview_tabular.pdf',
      },
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
      font-size: 8.2pt;
      line-height: 1.35;
    }

    .page {
      padding: 14px 22px;
      page-break-after: always;
      position: relative;
    }
    .page:last-child { page-break-after: auto; }

    /* Executive Header */
    .header {
      background: linear-gradient(135deg, #1b365d 0%, #0f172a 100%);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 6px;
      border-bottom: 3px solid #facc15;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 16pt;
      margin: 0 0 1px 0;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 0;
      font-size: 8.4pt;
      color: #93c5fd;
      font-weight: 500;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 4px 8px;
    }
    .meta-label {
      font-size: 6.5pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 1px;
    }
    .meta-val {
      font-size: 8.2pt;
      font-weight: 700;
      color: #1b365d;
    }

    /* Table Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
      table-layout: fixed;
    }
    th {
      background: #1b365d;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 6px 8px;
      text-align: left;
      border: 1px solid #1b365d;
    }
    td {
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      font-size: 7.6pt;
      line-height: 1.32;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    .col-obj { width: 23%; }
    .col-act { width: 34%; }
    .col-crt { width: 27%; }
    .col-dat { width: 11%; font-weight: 600; color: #1e40af; font-size: 7.4pt; }
    .col-own { width: 5%; text-align: center; font-weight: 800; color: #1e3a8a; }

    .obj-title {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 8.8pt;
      color: #1b365d;
      margin-bottom: 2px;
      line-height: 1.22;
    }
    .sip-badge {
      display: inline-block;
      font-size: 6.4pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 1.5px 5px;
      border-radius: 3px;
      color: #ffffff;
      margin-bottom: 3px;
    }
    .obj-aim {
      color: #475569;
      font-size: 7.2pt;
      line-height: 1.28;
    }

    ol.actions-list {
      margin: 0;
      padding-left: 12px;
    }
    ol.actions-list li {
      margin-bottom: 3px;
    }
    ul.criteria-list {
      margin: 0;
      padding-left: 10px;
    }
    ul.criteria-list li {
      margin-bottom: 2.5px;
    }

    /* Executive Evidence Badges / Micro-links */
    .evidence-box {
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px dashed #cbd5e1;
    }
    .evidence-tag {
      display: block;
      font-size: 6.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin-bottom: 2px;
    }
    .evidence-chips-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .evidence-chip {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding: 1.5px 5px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 3px solid #1b365d;
      border-radius: 3px;
      text-decoration: none;
      font-size: 6.5pt;
      font-weight: 600;
      color: #1e3a8a;
    }
    .evidence-chip:hover {
      background: #f1f5f9;
      border-color: #94a3b8;
      border-left-color: #0284c7;
    }
    .evidence-chip-arrow {
      font-size: 6.8pt;
      color: #0284c7;
      font-weight: 800;
    }

    /* Executive Workload & Pedagogical Footnote */
    .workload-card {
      background: #fdfdfd;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 7px 10px;
      margin-top: 8px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      font-size: 7.2pt;
      color: #475569;
    }
    .workload-pillar strong {
      display: block;
      color: #1b365d;
      font-size: 7.6pt;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>

  <!-- Page 1: Priorities 1-3 -->
  <div class="page">
    <div class="header">
      <div>
        <h1>Meoncross School History Department</h1>
        <p>Department Development Plan (DDP) 2026–2027</p>
      </div>
      <div style="text-align: right;">
        <span style="background: #facc15; color: #1b365d; font-weight: 800; padding: 3px 8px; border-radius: 3px; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
          Operational Master
        </span>
        <div style="margin-top: 3px;">
          <a href="https://meoncross-history.netlify.app" target="_blank" style="color: #93c5fd; font-size: 7.0pt; text-decoration: none; font-weight: 600;">Live Portal: meoncross-history.netlify.app ↗</a>
        </div>
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
              ${
                row.evidenceLinks && row.evidenceLinks.length > 0
                  ? `
                <div class="evidence-box">
                  <span class="evidence-tag">Verified Department Evidence:</span>
                  <div class="evidence-chips-list">
                    ${row.evidenceLinks
                      .map(
                        (link) => `
                      <a href="${link.url}" target="_blank" class="evidence-chip" title="Click to view published digital resource">
                        <span>${link.title}</span>
                        <span class="evidence-chip-arrow">↗</span>
                      </a>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }
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

  <!-- Page 2: Priorities 4-5 -->
  <div class="page">
    <div class="header" style="margin-bottom: 8px; padding: 8px 16px;">
      <div>
        <h1 style="font-size: 13pt;">Meoncross School History Department Development Plan</h1>
        <p style="font-size: 7.8pt;">Priorities 4–5: Adaptive Teaching &amp; SMSC / British Values</p>
      </div>
      <span style="background: rgba(255,255,255,0.15); color: #fff; padding: 3px 6px; border-radius: 3px; font-size: 7.4pt; font-weight: 600;">
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
              ${
                row.evidenceLinks && row.evidenceLinks.length > 0
                  ? `
                <div class="evidence-box">
                  <span class="evidence-tag">Verified Department Evidence:</span>
                  <div class="evidence-chips-list">
                    ${row.evidenceLinks
                      .map(
                        (link) => `
                      <a href="${link.url}" target="_blank" class="evidence-chip" title="Click to view published digital resource">
                        <span>${link.title}</span>
                        <span class="evidence-chip-arrow">↗</span>
                      </a>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }
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
  console.log('Generating Department Development Plan HTML in admin_internal...');
  const htmlContent = generateHTML();
  fs.writeFileSync(HTML_OUT_ADMIN, htmlContent);

  console.log('Launching Puppeteer for A4 Landscape rendering...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1123, height: 794 });
    await page.goto(require('url').pathToFileURL(HTML_OUT_ADMIN).href, {
      waitUntil: 'networkidle0',
    });

    await page.pdf({
      path: PDF_OUT_ADMIN,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
    });
    console.log('[SUCCESS] Department Development Plan PDF saved to admin_internal:', PDF_OUT_ADMIN);

    try {
      const driveDir = path.dirname(PDF_OUT_GDRIVE);
      if (!fs.existsSync(driveDir)) {
        fs.mkdirSync(driveDir, { recursive: true });
      }
      fs.copyFileSync(PDF_OUT_ADMIN, PDF_OUT_GDRIVE);
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
