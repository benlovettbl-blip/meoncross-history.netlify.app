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
    category: 'Academic Achievement & GCSE High-Tariff Attainment',
    sipBadge: 'Subject Core Priority',
    sipBadgeColor: '#0284c7',
    aim: 'Secure outstanding progress and high-tariff attainment across Edexcel GCSE History (Papers 1, 2, and 3) while reducing teacher workload through standardized formula stamps and scaffolded models.',
    actions: [
      'Embed revised Edexcel exam specifications across KS4: deploy 4-mark Consequence stamps (PEE), 8-mark Narrative 3-phase flowcharts, and 8-mark Importance analytical frameworks in Conflict in the Middle East (cme_new) and Early Elizabethan England (eee).',
      'Implement regular low-stakes recall testing at the start of every lesson using the digital Flashcard Vault and randomized Do Now quizzes, isolating prior knowledge to build retention.',
      'Deploy walking-talking mock exams and teacher specimen mark schemes embedded directly in the digital portal, enabling live classroom modeling without requiring ad-hoc worksheet preparation.',
    ],
    criteria: [
      '85%+ of GCSE cohort achieving Grade 6–9; positive Value Added across all pupil subgroups.',
      'Zero generic placeholder model answers; 100% of exam practice tasks feature historically accurate, 3-tier models (Bronze/Silver/Gold).',
      'Rapid, actionable feedback facilitated by the printed workbook formula stamps and digital self-marking diagnostic quizzes.',
    ],
    dates:
      'Milestone 1: Nov 2026 (Paper 2 CME timed assessment)<br>Milestone 2: Feb 2027 (Paper 1 & 3 Mock Series)<br>Completion: June 2027',
    owner: 'BL',
  },
  {
    category: 'Aspirational Curriculum & Coastal Heritage',
    sipBadge: 'SIP Aim 2: Curricular Challenge & Coastal Learning',
    sipBadgeColor: '#15803d',
    aim: 'Embed a rigorous, de-centered, chronologically robust 5-year curriculum that champions coastal and local Hampshire heritage alongside global history, ensuring seamless progression from KS3 to GCSE with zero teacher re-planning.',
    actions: [
      'Fully roll out the 4-Act dramatic enquiry structure across KS3 (e.g. Early Modern World, Medieval England, Great War), utilizing pure paragraph indexing [Act.Paragraph] to provide seamless cognitive signposting.',
      "Weave distinctive local maritime and coastal history into core units: study Henry Cort's puddling process at Funtley (Industrialisation L1), Portsmouth Royal Dockyard's ironclad steam revolution and Two-Power naval standard (L3), and the Stubbington village 'Lost Generation' war memorials (Great War L8).",
      'Embed progressive thematic links: use Year 7 Water and Sanitation Through Time as a deliberate, low-stakes conceptual primer for Year 11 Medicine Through Time, pre-teaching change, continuity, and public health attitudes.',
    ],
    criteria: [
      'Complete, unified Schemes of Work published with clear enquiry questions, learning objectives, and hinge questions across all 5 year groups.',
      'Pupil voice audits demonstrate high engagement and vivid understanding of local Hampshire connections to national/global events.',
      'Curriculum Map and Tabular Overview published and accessible for departmental line management and whole-school QA.',
    ],
    dates:
      'Review 1: Oct 2026 (KS3 Autumn units review)<br>Review 2: Jan 2027 (Spring coastal study check)<br>Completion: July 2027',
    owner: 'BL',
  },
  {
    category: 'Co-Curriculum, Clubs & Experiential Learning',
    sipBadge: 'SIP Aim 2 & 4: Opportunities Beyond Classroom',
    sipBadgeColor: '#7c3aed',
    aim: 'Broaden pupil horizons and foster historical adventure, leadership, and intellectual curiosity through high-profile co-curricular clubs, academic competitions, and experiential field trips.',
    actions: [
      'Coordinate and deliver the biannual GCSE Ypres Battlefield Tour (Years 10–11), investigating historic Western Front casualty clearing stations, dressing stations, and Menin Gate commemoration, directly supporting Paper 1 Section A British sector depth study.',
      'Organize participation in the annual Hampshire Record Office Archives Local History Competition, guiding pupils to conduct primary archival detective work on local community lineage and combat records.',
      'Lead and expand the weekly Meoncross Chess Club, integrating the digital Chess League ladder, house points, and tactician badges into the History Portal.',
    ],
    criteria: [
      'Successful execution of the 2026 Ypres Battlefield Tour with comprehensive digital field companion, parent information packs, and risk assessments.',
      'Active pupil submissions to the Hampshire Archives Competition with high-quality archival source presentation.',
      '30+ regular participants across Years 7–11 in Meoncross Chess Club; sustained engagement recorded in house point tracking.',
    ],
    dates:
      'Milestone 1: Oct 2026 (Ypres parent briefing & packs)<br>Milestone 2: March 2027 (Hampshire Archives submission)<br>Milestone 3: May 2027 (Ypres Tour)<br>Ongoing: Weekly Chess Club',
    owner: 'BL',
  },
  {
    category: 'Adaptive Teaching & Low-Workload SEND Provision',
    sipBadge: 'SIP Aim 1 & 2: Inclusive Practice & High Expectations',
    sipBadgeColor: '#b45309',
    aim: 'Ensure all SEND, EAL, and lower-attaining pupils make outstanding progress through fully embedded adaptive teaching tools and dual-coded resources, achieving maximum inclusion with minimal ongoing teacher workload.',
    actions: [
      'Deploy the History Hub digital web app alongside physical printed A4 workbooks, combining dual coding and structured tasks to offload working memory and prevent cognitive overload.',
      'Embed 3-tier differentiated scaffolding into every pupil task: Bronze (sentence stems/recall), Silver (analytical connectives: Consequently, Furthermore), and Gold (historiographical evaluation and academic debate).',
      'Activate digital accessibility features: built-in SEN mode (soft cream background with high-legibility dyslexia font), adjustable speech-rate read-aloud engine (0.85x–1.15x), and pure paragraph indices [Act.Paragraph] that eliminate cognitive clutter.',
      'Track individual SEND progress using targeted diagnostic checks and provide instant visual booster sheets (e.g. Overdue Boosters) without demanding ad-hoc teacher resource creation.',
    ],
    criteria: [
      'Adaptive teaching clearly visible in all classroom observations and departmental QA drops without requiring differentiated paper planning.',
      'SEND pupils demonstrate parity of progress with non-SEND peers on departmental tracking data; 100% completion of workbook scaffolding.',
      'Teacher planning time reduced significantly through standardized, pre-formatted digital and physical scaffolding.',
    ],
    dates:
      'Review 1: Nov 2026 (SEND diagnostic review)<br>Review 2: Feb 2027 (Adaptive teaching QA check)<br>Completion: June 2027',
    owner: 'BL',
  },
  {
    category: 'SMSC, British Values & Gridmaker Integration',
    sipBadge: 'SIP Aim 3: Community, Belonging & Personal Development',
    sipBadgeColor: '#0f766e',
    aim: "Systematically track, evidence, and deepen pupils' Spiritual, Moral, Social, and Cultural (SMSC) development and understanding of Fundamental British Values across all key stages, fully aligning with the whole-school Gridmaker recording system.",
    actions: [
      'Map explicit SMSC and British Values questions into every unit in curriculum_meta.json, addressing democracy (Chartism, parliamentary power), the rule of law (Magna Carta, Nuremberg trials), individual liberty (civil rights, Transatlantic Slave Trade resistance), and mutual tolerance.',
      "Systematically log history curriculum touchpoints onto the school's Gridmaker platform on an ongoing termly basis to provide transparent, inspection-ready evidence of SMSC coverage.",
      "Incorporate ethical reflection tasks and hinge questions into lessons (e.g., 'Is rebellion ever justified?' in 1381; 'Should public health ever override personal liberty?' in Jenner/vaccination debates).",
    ],
    criteria: [
      '100% of units audited and logged on Gridmaker with rich descriptive evidence of SMSC and British Values delivery.',
      'Pupils demonstrate sophisticated moral and social reasoning during class debate and written reflections.',
      'Department rated outstanding for SMSC and personal development in internal and external inspection reviews.',
    ],
    dates:
      'Termly logging: Oct 2026, Dec 2026, Feb 2027, Apr 2027, Jun 2027<br>Audit completion: July 2027',
    owner: 'BL',
  },
  {
    category: 'Pupil Leadership, Family Archives & Achievement Hub',
    sipBadge: 'SIP Aim 4: Social & Economic Wellbeing, Careers & Leadership',
    sipBadgeColor: '#be123c',
    aim: 'Elevate pupil leadership, real-world historical research, and careers awareness through pupil-led family archive investigations and integration with the Meoncross Achievement Hub.',
    actions: [
      "Embed pupil family history and archival research into the live curriculum (e.g., Aby's Year 10 research on 2nd Lt Ernest Crummack DCM, Marcus Goodall, and Siegfried Sassoon's holograph manuscript), establishing pupil pride and leadership in departmental scholarship.",
      "Partner with the school's new Achievement Hub to deliver history careers workshops (e.g. archivist, international diplomat, heritage consultant, legal researcher), inviting parent/alumni speakers to demonstrate the real-world value of history degrees.",
      'Appoint History Subject Ambassadors / Prefects to mentor Year 7–8 pupils in the Chess Club and support peer study clinics during GCSE walking-talking mock sessions.',
    ],
    criteria: [
      'Archival detective features embedded in unit companion guides showcasing pupil research.',
      'Scheduled careers touchpoints completed with the Achievement Hub, with high pupil feedback ratings.',
      'Active History Ambassador network supporting lower school engagement and library study sessions.',
    ],
    dates:
      'Milestone 1: Nov 2026 (Ambassador appointments)<br>Milestone 2: Feb 2027 (Achievement Hub careers event)<br>Completion: July 2027',
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
      font-size: 8pt;
      line-height: 1.4;
    }

    .page {
      padding: 24px 32px;
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
      margin-bottom: 16px;
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
      font-size: 8.5pt;
      color: #93c5fd;
      font-weight: 500;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 14px;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 10px;
    }
    .meta-label {
      font-size: 6.8pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .meta-val {
      font-size: 8.5pt;
      font-weight: 700;
      color: #1b365d;
    }

    /* SIP Alignment Banner */
    .sip-banner {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .sip-banner-text {
      font-size: 7.6pt;
      color: #1e3a8a;
      line-height: 1.45;
    }
    .sip-banner-text strong {
      color: #1e40af;
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
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 8px 10px;
      text-align: left;
      border: 1px solid #1b365d;
    }
    td {
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      font-size: 7.6pt;
      line-height: 1.35;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    .col-obj { width: 22%; }
    .col-act { width: 36%; }
    .col-crt { width: 24%; }
    .col-dat { width: 14%; }
    .col-own { width: 4%; text-align: center; font-weight: 800; color: #1e3a8a; }

    .obj-title {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 8.8pt;
      color: #1b365d;
      margin-bottom: 4px;
      line-height: 1.25;
    }
    .sip-badge {
      display: inline-block;
      font-size: 6.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 2px 6px;
      border-radius: 4px;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .obj-aim {
      color: #475569;
      font-size: 7.2pt;
      line-height: 1.35;
      font-style: italic;
    }

    ol.actions-list {
      margin: 0;
      padding-left: 14px;
    }
    ol.actions-list li {
      margin-bottom: 4px;
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
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      font-size: 7.2pt;
      color: #475569;
    }
    .workload-pillar strong {
      display: block;
      color: #1b365d;
      font-size: 7.8pt;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>

  <!-- Page 1: Priorities 1 to 3 -->
  <div class="page">
    <div class="header">
      <div>
        <h1>Meoncross School History Department</h1>
        <p>Department Development Plan (DDP) 2026–2027 · Academic Year Implementation</p>
      </div>
      <div style="text-align: right;">
        <span style="background: #facc15; color: #1b365d; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
          Approved Inspection Master
        </span>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-box">
        <div class="meta-label">Subject</div>
        <div class="meta-val">History (KS3 &amp; GCSE)</div>
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
        <div class="meta-label">Strategic Policy</div>
        <div class="meta-val">Aligned with Meoncross SIP 2026</div>
      </div>
    </div>

    <div class="sip-banner">
      <div class="sip-banner-text">
        <strong>Meoncross School Vision &amp; SIP Operational Alignment:</strong> "Meoncross seeks to offer coastal education underpinned by creativity, sustainability and adventure, where excellence in teaching and learning goes hand in hand with a sense of belonging and community." All objectives below directly integrate the 2026 School Improvement Plan pillars: <em>Coastal Learning &amp; Sustainability</em>, <em>Excellence in Teaching &amp; Adaptive Learning</em>, <em>Gridmaker SMSC Integration</em>, and <em>Pupil Leadership</em>.
      </div>
      <div style="white-space: nowrap; font-size: 7.2pt; font-weight: 700; color: #1d4ed8; background: #ffffff; padding: 5px 8px; border-radius: 4px; border: 1px solid #93c5fd;">
        Low-Workload App Ecosystem
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th class="col-obj">Objective &amp; Strategic Aim</th>
          <th class="col-act">Actions (How Objective Will Be Achieved)</th>
          <th class="col-crt">Success Criteria &amp; Evidence</th>
          <th class="col-dat">Dates / Milestones</th>
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
            <td style="font-size: 7.2pt; color: #334155;">${row.dates}</td>
            <td class="col-own">${row.owner}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 2: Priorities 4 to 6 & Sustainability Summary -->
  <div class="page">
    <div class="header" style="margin-bottom: 12px; padding: 12px 20px;">
      <div>
        <h1 style="font-size: 15pt;">Meoncross School History Department Development Plan</h1>
        <p style="font-size: 8pt;">Priorities 4–6: Adaptive Teaching, Whole-School Gridmaker Tracking &amp; Pupil Leadership</p>
      </div>
      <span style="background: rgba(255,255,255,0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 7.5pt; font-weight: 600;">
        Page 2 of 2
      </span>
    </div>

    <table>
      <thead>
        <tr>
          <th class="col-obj">Objective &amp; Strategic Aim</th>
          <th class="col-act">Actions (How Objective Will Be Achieved)</th>
          <th class="col-crt">Success Criteria &amp; Evidence</th>
          <th class="col-dat">Dates / Milestones</th>
          <th class="col-own">Owner</th>
        </tr>
      </thead>
      <tbody>
        ${ddpData
          .slice(3, 6)
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
            <td style="font-size: 7.2pt; color: #334155;">${row.dates}</td>
            <td class="col-own">${row.owner}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>

    <div class="workload-card">
      <div class="workload-pillar">
        <strong>1. Cognitive Offloading &amp; Low Workload</strong>
        The History Hub web app paired with printed A4 workbooks completely pre-formats dual coding, paragraph indexing, and 3-tier scaffolding. This eliminates repetitive weekly lesson re-planning and standardizes high expectations across all classes.
      </div>
      <div class="workload-pillar">
        <strong>2. Meaningful Coastal Connections</strong>
        Local Hampshire heritage (Funtley Ironworks, Portsmouth Royal Dockyard, Stubbington war memorials) is directly integrated into Schemes of Work, giving pupils a tangible sense of place and lived environment without ad-hoc resource creation.
      </div>
      <div class="workload-pillar">
        <strong>3. Inspection-Ready Evidence</strong>
        SMSC and British Values are pre-audited in metadata for immediate Gridmaker logging; GCSE formula stamps provide transparent, actionable formative assessment that satisfies all Quality of Education QA requirements.
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
  console.log('HTML saved to:', HTML_OUT_PUBLIC);

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

    // Also copy to Google Drive if available
    try {
      fs.copyFileSync(PDF_OUT_PUBLIC, PDF_OUT_GDRIVE);
      console.log(
        '[SUCCESS] Department Development Plan PDF copied to Google Drive:',
        PDF_OUT_GDRIVE,
      );
    } catch (gErr) {
      console.warn('[WARN] Could not copy to G Drive (check permissions/path):', gErr.message);
    }
  } finally {
    await browser.close();
  }
}

exportPDF();
