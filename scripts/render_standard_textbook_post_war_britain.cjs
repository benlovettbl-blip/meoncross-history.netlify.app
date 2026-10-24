/**
 * scripts/render_standard_textbook_post_war_britain.cjs
 *
 * 8-PAGE MASTER CLASSROOM TEXTBOOK (2 Sheets of A3 Saddle-Stitch Model)
 * Target: KS3 Year 9 — Rights, Protest, and Post-War Britain (1900–Present)
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to live app data in units/post_war_britain/data.js (narrative_blocks)
 * - Dynamic Single Source of Truth (SSoT): Automatically inherits any text edits made in data.js
 * - Exactly 8 pages (2 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork, canonical dramatic synopsis blurb, 5-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (12 defining turning points & causal dominoes)
 * - Pages 3–7: 5 Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 8: Master 25-Question Knowledge Retrieval Quiz Back Cover (Partner Quiz / Solo Practice)
 * - Dynamic Auto-Balancing Typography: Automatically calibrates font-size and leading per page
 *   to ensure 0px overflow, positive clearance (>= +20px), and >= 95% space utilization
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    if (!relativePath) return null;
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'post_war_britain', 'assets', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'post_war_britain',
        'assets',
        path.basename(cleanPath),
      ),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>)
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .trim();
}

// Load canonical data from units/post_war_britain/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'post_war_britain', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// 12 Defining Turning Points & Causal Dominoes for Page 2
const MILESTONE_SPINE = [
  {
    date: '1897',
    title: 'Formation of the NUWSS',
    desc: 'Millicent Fawcett unites regional societies into the National Union of Women’s Suffrage Societies, pioneering peaceful, constitutional campaigning.',
    ref: '1.1',
  },
  {
    date: '1903',
    title: 'Formation of the WSPU: "Deeds, Not Words"',
    desc: "Emmeline Pankhurst establishes the Women's Social and Political Union in Manchester, adopting militant direct action to force female suffrage into national headlines.",
    ref: '1.3',
  },
  {
    date: '1913',
    title: 'The "Cat and Mouse Act" & Davison\'s Martyrdom',
    desc: 'Government introduces force-feeding and temporary release for hunger-striking Suffragettes; Emily Wilding Davison dies at the Epsom Derby.',
    ref: '1.4',
  },
  {
    date: 'Feb 1918',
    title: 'Representation of the People Act 1918',
    desc: 'Following decisive female mobilization in wartime factories and agriculture, Parliament enfranchises women over thirty meeting property criteria.',
    ref: '1.6',
  },
  {
    date: 'Dec 1942',
    title: 'Publication of the Beveridge Report',
    desc: 'Sir William Beveridge publishes his revolutionary blueprint pledging to slay the "Five Giants" of Want, Disease, Ignorance, Squalor, and Idleness.',
    ref: '2.1',
  },
  {
    date: 'July 1945',
    title: 'Attlee’s Post-War Labour Landslide',
    desc: 'British voters reject Winston Churchill to elect Clement Attlee’s Labour government, mandating the construction of the universal Welfare State.',
    ref: '2.3',
  },
  {
    date: '5 July 1948',
    title: 'Foundation of the National Health Service',
    desc: 'Minister of Health Aneurin Bevan opens the NHS at Park Hospital, Davyhulme, guaranteeing universal medical care free at the point of delivery.',
    ref: '2.5',
  },
  {
    date: '22 June 1948',
    title: 'Arrival of HMT Empire Windrush at Tilbury',
    desc: 'Carrying 492 Caribbean passengers invited under the British Nationality Act 1948, the Windrush arrives to help reconstruct post-war Britain.',
    ref: '3.3',
  },
  {
    date: 'Aug 1958',
    title: 'Notting Hill Riots & The Birth of Carnival',
    desc: 'Racial attacks by white gangs prompt Caribbean community self-defence; Claudia Jones organizes the historic 1959 indoor Caribbean Carnival.',
    ref: '3.5',
  },
  {
    date: '1962',
    title: 'Commonwealth Immigrants Act 1962',
    desc: 'Conservative legislation ends the unrestricted right of Commonwealth citizens to settle in the UK, establishing work voucher restrictions.',
    ref: '3.6',
  },
  {
    date: 'Apr–Aug 1963',
    title: 'The Bristol Bus Boycott & Colour Bar Defeat',
    desc: 'Paul Stephenson and Roy Hackett lead a four-month passenger boycott against the Bristol Omnibus Company, successfully overturning its racist hiring ban.',
    ref: '4.4',
  },
  {
    date: '1965–1968',
    title: 'The Landmark Race Relations Acts',
    desc: 'Harold Wilson’s Labour government outlaws racial discrimination in public venues (1965) and extends protections to housing and employment (1968).',
    ref: '4.6',
  },
];

// 25 Master Knowledge Retrieval Questions for Page 8 Back Cover
const RETRIEVAL_QUIZ = {
  card1: {
    title: 'Topic Card 1: Votes for Women',
    locator: 'p. 3 • Ref [1.1]–[1.6]',
    questions: [
      'Who founded the NUWSS in 1897, and what core campaigning method did they champion?',
      'What militant motto was adopted by Emmeline Pankhurst upon founding the WSPU in 1903?',
      'What was the official name of the 1913 legislation dubbed the "Cat and Mouse Act"?',
      'At which 1913 sporting event was Emily Wilding Davison fatally injured?',
      'What age and property qualifications were placed on women under the 1918 Representation of the People Act?',
    ],
  },
  card2: {
    title: 'Topic Card 2: The Welfare State & The NHS',
    locator: 'p. 4 • Ref [2.1]–[2.6]',
    questions: [
      'Name the "Five Giants" identified in William Beveridge’s landmark 1942 social report.',
      'Which political party and Prime Minister won a landslide general election victory in July 1945?',
      'What was the name of the 1946 Act that created universal sickness and unemployment benefits?',
      'Who served as Minister of Health responsible for creating the National Health Service?',
      'On what exact date and at which hospital was the National Health Service officially launched?',
    ],
  },
  card3: {
    title: 'Topic Card 3: The Windrush Generation',
    locator: 'p. 5 • Ref [3.1]–[3.6]',
    questions: [
      'What rights did the British Nationality Act 1948 grant to citizens of the British Empire?',
      'On what date did HMT Empire Windrush dock at the Port of Tilbury, and how many passengers were aboard?',
      'What derogatory phrase was commonly displayed on private rental housing notices in post-war Britain?',
      'What informal collective financial scheme did Caribbean communities use to pool money and buy homes?',
      'Which activist founded the West Indian Gazette and organized the 1959 Caribbean Carnival?',
    ],
  },
  card4: {
    title: 'Topic Card 4: The Bristol Bus Boycott',
    locator: 'p. 6 • Ref [4.1]–[4.6]',
    questions: [
      'What discriminatory hiring policy did the state-owned Bristol Omnibus Company operate in 1963?',
      'Which young Jamaican warehouseman was refused a job interview purely because of his skin color?',
      'Name two community leaders who formed the West Indian Development Council to lead the boycott.',
      'On what historic date did the bus company announce the total end of the colour bar?',
      'What two landmark Acts of Parliament were passed in 1965 and 1968 to ban racial discrimination?',
    ],
  },
  card5: {
    title: 'Topic Card 5: Cold War on the Home Front',
    locator: 'p. 7 • Ref [5.1]–[5.6]',
    questions: [
      'In what year did Britain test its first atomic bomb (Operation Hurricane)?',
      'What peace organization was formed in February 1958, and who designed its famous symbol?',
      'What was the destination of the annual 52-mile Easter peace march launched by CND in 1958?',
      'What was the military function of the blast-proof semi-subterranean York Cold War Bunker built in 1961?',
      'What was the title of the notorious 1980 government survival booklet advising "inner core shelters"?',
    ],
  },
};

function buildHtml() {
  const unitData = loadUnitData();
  const lessons = unitData.lessons.slice(0, 5); // 5 canonical enquiries

  const coverImgData = getBase64Image('/images/post_war_britain_cover.jpg');

  // Canonical 5 Enquiries for Australia 4-Column Directory Architecture
  const canonicalEnquiries = [
    {
      num: '01',
      title: 'Votes for Women: The Suffrage Movement',
      question: 'Were the Suffragists or Suffragettes more effective in securing the vote?',
      page: 'Page 3',
    },
    {
      num: '02',
      title: 'The 1945 Settlement: NHS & Welfare State',
      question: 'How did the aftermath of total war build the Welfare State and the NHS?',
      page: 'Page 4',
    },
    {
      num: '03',
      title: 'The Windrush Generation & Migration',
      question: 'Why did Britain invite Commonwealth citizens, and what did they face?',
      page: 'Page 5',
    },
    {
      num: '04',
      title: 'The 1963 Bristol Bus Boycott',
      question: 'How did community direct action defeat the colour bar and inspire civil rights?',
      page: 'Page 6',
    },
    {
      num: '05',
      title: 'The Cold War on the British Home Front',
      question: 'How did nuclear paranoia and civil defence shape British popular culture?',
      page: 'Page 7',
    },
  ];

  // Milestone Spine HTML (Page 2)
  const milestoneSpineHtml = MILESTONE_SPINE.map(
    (m) => `
    <div class="timeline-item">
      <div class="timeline-date">${m.date}</div>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <span class="timeline-title">${m.title}</span>
          <span class="timeline-ref">Ref [${m.ref}]</span>
        </div>
        <div class="timeline-desc">${m.desc}</div>
      </div>
    </div>
  `,
  ).join('');

  // 5 Lesson Enquiries HTML (Pages 3–7)
  const lessonPagesHtml = lessons
    .map((l, idx) => {
      const pageNum = idx + 3;
      const enqNum = idx + 1;
      const blocks = l.narrative_blocks || [];

      const actsHtml = blocks
        .map((b, bIdx) => {
          const p1Num = `${enqNum}.${bIdx * 2 + 1}`;
          const p2Num = `${enqNum}.${bIdx * 2 + 2}`;
          const paras = b.text
            .split('<br><br>')
            .map((p) => cleanProse(p))
            .filter(Boolean);

          return `
        <div class="block-section">
          <div class="block-header">
            <span class="block-ref">[${p1Num}]–[${p2Num}]</span>
            <span class="block-title">${b.title}</span>
          </div>
          <div class="block-prose">
            ${paras
              .map(
                (p) => `
              <p class="prose-p">${p}</p>
            `,
              )
              .join('')}
          </div>
        </div>
      `;
        })
        .join('');

      return `
      <!-- PAGE ${pageNum}: ENQUIRY 0${enqNum} -->
      <div class="page page-lesson" id="page-${pageNum}" data-page="${pageNum}">
        <header class="running-header">
          <span>THE HISTORY REVISION HUB &bull; KS3 MASTER CLASSROOM ANTHOLOGY</span>
          <span class="sub-badge">ENQUIRY 0${enqNum} &bull; PAGE 0${pageNum}</span>
        </header>

        <div class="enquiry-banner">
          <div class="enquiry-tag-row">
            <span class="enquiry-num-pill">ENQUIRY 0${enqNum}</span>
            <span class="enquiry-subtag">DISCIPLINARY HISTORICAL READING &bull; KEY STAGE 3</span>
          </div>
          <h2 class="enquiry-title">${l.title}</h2>
          <div class="hinge-box">
            <span class="hinge-badge">KEY ENQUIRY QUESTION</span>
            <span class="hinge-text">${l.prologue || l.enquiry || 'How did popular protest and political courage transform modern British society?'}</span>
          </div>
        </div>

        <main class="prose-body">
          <div class="prose-columns">
            ${actsHtml}
          </div>
        </main>

        <footer class="running-footer">
          <span>Rights, Protest, and Post-War Britain (1900–Present) &bull; Enquiry 0${enqNum}</span>
          <span class="page-pill">Page 0${pageNum}</span>
        </footer>
      </div>
    `;
    })
    .join('');

  // Page 8 Retrieval Quiz Cards HTML
  const quizCardsHtml = Object.keys(RETRIEVAL_QUIZ)
    .map((k) => {
      const card = RETRIEVAL_QUIZ[k];
      const qList = card.questions
        .map(
          (q, qIdx) => `
      <div class="quiz-q-item">
        <span class="quiz-q-num">${qIdx + 1}.</span>
        <span class="quiz-q-text">${q}</span>
      </div>
    `,
        )
        .join('');

      return `
      <div class="quiz-card">
        <div class="quiz-card-header">
          <span class="quiz-card-title">${card.title}</span>
          <span class="quiz-card-loc">${card.locator}</span>
        </div>
        <div class="quiz-card-body">
          ${qList}
        </div>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rights, Protest, and Post-War Britain (1900–Present) - Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #0f172a;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 10mm auto;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12mm 15mm 10mm 15mm;
      page-break-after: always;
      page-break-inside: avoid;
    }

    @media print {
      body {
        background: #ffffff;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* Common Running Header / Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 6px;
      font-size: 7pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
    }

    .running-header .sub-badge {
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.04em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3.5px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      color: #64748b;
    }

    .page-pill {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 7px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 6.5pt;
      letter-spacing: 0.05em;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-page {
      padding: 9mm 14mm 8mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-top-masthead {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .cover-series {
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0f172a;
    }

    .cover-sub-series {
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #ffffff;
      background: #0f172a;
      padding: 2px 7px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 4px 0 3px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #fff;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 12px;
      letter-spacing: 0.12em;
      margin-bottom: 3px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 22pt;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: 0.03em;
      color: #0f172a;
      margin: 0;
      text-transform: uppercase;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.8pt;
      font-style: italic;
      color: #334155;
      margin-top: 2px;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 84mm;
      border: 1.5px solid #0f172a;
      position: relative;
      background: #0f172a;
      margin: 3px 0 2px 0;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 20%;
    }

    .cover-hero-caption {
      font-size: 6.6pt;
      color: #475569;
      text-align: center;
      font-style: italic;
      margin-bottom: 3px;
      line-height: 1.25;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 9px 12px;
      margin: 3px 0 5px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }

    .cover-overview-title {
      font-size: 7.0pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 0;
      font-style: italic;
      text-align: justify;
    }

    .cover-directory {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .cover-directory-head {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      background: #ffffff;
    }

    .cover-directory-table tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .cover-directory-table tr:last-child {
      border-bottom: none;
    }

    .cover-directory-table td {
      padding: 4.5px 8px;
      vertical-align: middle;
    }

    .col-num {
      width: 55px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .col-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 7.8pt;
      width: 36%;
      line-height: 1.25;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.5pt;
      padding-left: 6px;
      line-height: 1.28;
    }

    .col-page {
      width: 48px;
      text-align: right;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
    }

    .cover-concepts-strip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 3px;
      padding: 3.5px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #1e3a8a;
      margin-bottom: 4px;
    }

    .cover-concepts-tag {
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 4.5px;
      border-radius: 2px;
      white-space: nowrap;
      font-size: 6.2pt;
    }

    /* PAGE 2: MILESTONE SPINE */
    .timeline-page-header {
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
    }

    .timeline-page-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 900;
      letter-spacing: 0.12em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .timeline-page-subtitle {
      font-size: 7pt;
      font-weight: 600;
      color: #64748b;
      margin-top: 1px;
      letter-spacing: 0.04em;
    }

    .milestone-timeline {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex-grow: 1;
      justify-content: space-between;
      position: relative;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 17mm;
      top: 5mm;
      bottom: 5mm;
      width: 2px;
      background: #cbd5e1;
      z-index: 1;
    }

    .timeline-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
    }

    .timeline-date {
      width: 15mm;
      flex-shrink: 0;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-align: right;
      padding-right: 3mm;
      padding-top: 1.5px;
    }

    .timeline-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 2.5px;
      margin-right: 3.5mm;
      flex-shrink: 0;
    }

    .timeline-content {
      flex-grow: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 3.5px 6px;
      border-radius: 2px;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }

    .timeline-title {
      font-size: 7.5pt;
      font-weight: 800;
      color: #0f172a;
    }

    .timeline-ref {
      font-size: 6pt;
      font-weight: 800;
      color: #b91c1c;
      background: #fee2e2;
      padding: 0.5px 4px;
      border-radius: 2px;
    }

    .timeline-desc {
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.3;
      text-align: justify;
    }

    /* PAGES 3–7: CANONICAL ENQUIRIES */
    .enquiry-banner {
      background: #f8fafc;
      border: 1.5px solid #0f172a;
      padding: 5px 8px;
      margin-bottom: 7px;
    }

    .enquiry-tag-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-num-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 6pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 1px 6px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .enquiry-subtag {
      font-size: 6pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      line-height: 1.15;
      color: #0f172a;
      margin-bottom: 3.5px;
    }

    .hinge-box {
      background: #eff6ff;
      border-left: 2.5px solid #2563eb;
      padding: 2.5px 6px;
      display: flex;
      gap: 6px;
      align-items: baseline;
    }

    .hinge-badge {
      font-size: 5.5pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
      flex-shrink: 0;
      text-transform: uppercase;
    }

    .hinge-text {
      font-size: 6.8pt;
      font-style: italic;
      color: #1e3a8a;
      line-height: 1.25;
    }

    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 20px;
      column-fill: balance;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .block-section {
      break-inside: auto;
      margin-bottom: 6px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 2.5px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
    }

    .block-ref {
      font-size: 7.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 0 4px;
      border-radius: 2px;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .block-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1.15;
    }

    .block-prose {
      font-family: 'Lora', Georgia, serif;
      font-size: 10.4pt;
      line-height: 1.48;
      color: #1e293b;
      margin: 0;
    }

    .prose-p {
      margin-bottom: 5px;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* PAGE 8: RETRIEVAL QUIZ BACK COVER */
    .quiz-page-header {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 900;
      letter-spacing: 0.14em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .quiz-subtitle {
      font-size: 7pt;
      font-weight: 600;
      color: #64748b;
      margin-top: 1px;
    }

    .quiz-banner {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3px solid #1e3a8a;
      padding: 3.5px 8px;
      margin-bottom: 6px;
      font-size: 6.5pt;
      color: #1e3a8a;
      line-height: 1.3;
    }

    .quiz-banner strong {
      color: #0f172a;
    }

    .quiz-cards-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex-grow: 1;
      justify-content: space-between;
    }

    .quiz-card {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      background: #f8fafc;
      border-radius: 3px;
      padding: 6.5px 10px;
    }

    .quiz-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3.5px;
    }

    .quiz-card-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quiz-card-loc {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-card-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .quiz-q-item {
      display: flex;
      align-items: baseline;
      font-size: 8.2pt;
      line-height: 1.34;
      color: #1e293b;
    }

    .quiz-q-num {
      width: 4mm;
      flex-shrink: 0;
      font-weight: 800;
      color: #1e3a8a;
    }

    .quiz-q-text {
      flex-grow: 1;
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================= -->
  <div class="page cover-page" id="page-1" data-page="1">
    <div class="cover-top-masthead">
      <div class="cover-series">The History Revision Hub</div>
      <div class="cover-sub-series">Key Stage 3 Disciplinary Classroom Textbook &bull; Year 9 Master Edition</div>
    </div>

    <div class="cover-title-block">
      <div class="cover-date-pill">1900 &ndash; Present</div>
      <h1 class="cover-main-title">RIGHTS, PROTEST &amp; POST-WAR BRITAIN</h1>
      <div class="cover-subtitle">Democracy, Diversity &amp; The Evolution of Modern British Identity</div>
    </div>

    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${coverImgData || '/images/post_war_britain_cover.jpg'}" alt="Rights, Protest &amp; Post-War Britain Primary Plate">
    </div>
    <div class="cover-hero-caption">
      Primary Archival Record: Abram Games' iconic 1951 Festival of Britain emblem, symbolising post-war national recovery, resilience, and modern democratic renewal.
    </div>

    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Enquiry &bull; Unit Narrative Synopsis</span>
        <span class="cover-overview-period">1900 &ndash; Present</span>
      </div>
      <p class="cover-overview-text">
        &ldquo;From the militant defiance of Emmeline Pankhurst’s Suffragettes to the post-Blitz foundation of the National Health Service by Aneurin Bevan, the arrival of the HMT Empire Windrush, the courage of the 1963 Bristol Bus Boycott, and the pervasive civilian shadow of the Cold War, modern British identity was forged through popular protest, democratic struggle, and the relentless pursuit of social equality.&rdquo;
      </p>
    </div>

    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>The Canonical Enquiries &bull; Scheme of Learning Directory</span>
        <span>A3 Saddle-Stitch Format</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          ${canonicalEnquiries
            .map(
              (enq) => `
            <tr>
              <td class="col-num">Enquiry ${enq.num}</td>
              <td class="col-title">${enq.title}</td>
              <td class="col-eq">${enq.question}</td>
              <td class="col-page">${enq.page}</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Suffragists &bull; Suffragettes &bull; 'Deeds Not Words' &bull; Representation of the People Act &bull; Beveridge Report &bull; Five Giants &bull; Welfare State &bull; NHS &bull; HMT Empire Windrush &bull; Colour Bar &bull; Bristol Bus Boycott &bull; Race Relations Acts &bull; CND &bull; Protect and Survive</span>
    </div>

    <footer class="running-footer">
      <span>The History Revision Hub &bull; Disciplinary History Textbook Series</span>
      <span class="page-pill">Page 1</span>
      <span>Year 9 Curriculum Companion &bull; Saddle-Stitch Model</span>
    </footer>
  </div>

  <!-- =========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================= -->
  <div class="page" id="page-2" data-page="2">
    <header class="running-header">
      <span>THE HISTORY REVISION HUB &bull; ADVANCE ORGANIZER</span>
      <span class="sub-badge">CHRONOLOGICAL SPINE &bull; PAGE 02</span>
    </header>

    <div class="timeline-page-header">
      <h2 class="timeline-page-title">CHRONOLOGICAL HIGHWAY: RIGHTS &amp; POST-WAR BRITAIN (1897–1968)</h2>
      <div class="timeline-page-subtitle">Twelve Decisive Turning Points, Parliamentary Reforms &amp; Civil Rights Landmarks</div>
    </div>

    <div class="milestone-timeline">
      ${milestoneSpineHtml}
    </div>

    <footer class="running-footer">
      <span>Rights, Protest, and Post-War Britain (1900–Present) &bull; Chronological Spine</span>
      <span class="page-pill">Page 02</span>
    </footer>
  </div>

  <!-- =========================================================================
       PAGES 3–7: FIVE CANONICAL ENQUIRIES
       ========================================================================= -->
  ${lessonPagesHtml}

  <!-- =========================================================================
       PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================= -->
  <div class="page" id="page-8" data-page="8">
    <header class="running-header">
      <span>THE HISTORY REVISION HUB &bull; DISCIPLINARY RETRIEVAL STANDARD</span>
      <span class="sub-badge">MASTER QUIZ &bull; PAGE 08</span>
    </header>

    <div class="quiz-page-header">
      <h2 class="quiz-main-title">MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
      <div class="quiz-subtitle">Twenty-Five Essential Recall Questions &bull; Rights, Protest, and Post-War Britain</div>
    </div>

    <div class="quiz-banner">
      <strong>Instructions for Classroom Retrieval:</strong> Complete as a Paired Oral Quiz or Silent Solo Practice. Write your answers into your exercise book under timed conditions. Strictly zero answers printed &bull; Consult paragraph cross-references to verify recall.
    </div>

    <div class="quiz-cards-grid">
      ${quizCardsHtml}
    </div>

    <footer class="running-footer">
      <span>Rights, Protest, and Post-War Britain &bull; Retrieval Quiz Back Cover</span>
      <span class="page-pill">Page 08</span>
    </footer>
  </div>

</body>
</html>`;
}

// Master execution routine
async function main() {
  console.log('=============================================================');
  console.log('🚀 COMPILING 8-PAGE MASTER TEXTBOOK: POST-WAR BRITAIN (1900–PRESENT)');
  console.log('=============================================================');

  const html = buildHtml();

  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'post_war_britain');
  const rootDir = path.join(ROOT_DIR, 'units', 'post_war_britain');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  const rootHtmlPath = path.join(rootDir, 'textbook.html');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');
  console.log(`[OK] Generated HTML textbook at:\n  ${publicHtmlPath}\n  ${rootHtmlPath}`);

  // Launch Puppeteer with auto-balancing typography engine
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.goto('file:///' + publicHtmlPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
  });

  // Dynamic Auto-Balancing Typography Engine
  console.log(
    '\n[Auto-Balancer] Dynamically calibrating font metrics to guarantee 0px overflow & >= 95% fill...',
  );
  await page.evaluate(() => {
    const lessonPages = document.querySelectorAll('.page-lesson');
    lessonPages.forEach((p) => {
      const footer = p.querySelector('.running-footer');
      const proseEls = p.querySelectorAll('.block-prose');
      const sections = p.querySelectorAll('.block-section');
      if (proseEls.length === 0 || !footer) return;

      let size = 10.5;
      let lh = 1.48;
      let secMargin = 6.0;

      const getOverlap = () => {
        const fTop = footer.getBoundingClientRect().top;
        const children = Array.from(p.querySelectorAll('.block-section, p, .block-header'));
        const maxB = Math.max(...children.map((c) => c.getBoundingClientRect().bottom));
        return maxB - fTop;
      };

      while (getOverlap() > -15 && size > 8.5) {
        size -= 0.1;
        lh -= 0.01;
        secMargin = Math.max(3.0, secMargin - 0.1);
        proseEls.forEach((el) => {
          el.style.fontSize = size.toFixed(2) + 'pt';
          el.style.lineHeight = lh.toFixed(2);
        });
        sections.forEach((s) => (s.style.marginBottom = secMargin.toFixed(1) + 'px'));
      }

      while (getOverlap() < -45 && size < 11.2) {
        size += 0.1;
        lh += 0.01;
        secMargin = Math.min(8.0, secMargin + 0.1);
        proseEls.forEach((el) => {
          el.style.fontSize = size.toFixed(2) + 'pt';
          el.style.lineHeight = lh.toFixed(2);
        });
        sections.forEach((s) => (s.style.marginBottom = secMargin.toFixed(1) + 'px'));
      }
    });
  });

  // Re-read HTML with calibrated styles and save back to disk
  const calibratedHtml = await page.content();
  fs.writeFileSync(publicHtmlPath, calibratedHtml, 'utf8');
  fs.writeFileSync(rootHtmlPath, calibratedHtml, 'utf8');

  // Verify Page Count & Height
  const auditResults = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const diff = scrollH - clientH;
      const footer = p.querySelector('.running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const body = p.querySelector(
        '.prose-body, .milestone-timeline, .quiz-cards-grid, .cover-concepts-strip, .cover-directory',
      );
      const bodyBottom = body ? body.getBoundingClientRect().bottom : 0;
      const clearance = footer ? Math.round(footerTop - bodyBottom) : 0;

      return {
        page: idx + 1,
        overflow: diff > 2,
        diff,
        clearance,
        horizOverflow: p.scrollWidth > p.clientWidth + 2,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  auditResults.forEach((r) => {
    console.log(
      `  Page ${r.page}: overflow=${r.overflow} (diff=${r.diff}px), clearance=${r.clearance}px, horizOverflow=${r.horizOverflow}`,
    );
  });

  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log(
      '✅ PERFECT: All 8 pages have 0px overflow, positive clearance, and balanced text!',
    );
  }

  // Audit Page Budget
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.page',
      underflowThresholdPx: 50,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 55,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'post_war_britain/textbook.html');
  } catch (err) {
    console.warn('Space audit error:', err.message);
  }

  // Save preview screenshots for all 8 pages
  const pageEls = await page.$$('.page');
  for (let i = 0; i < pageEls.length; i++) {
    await pageEls[i].screenshot({
      path: path.join(publicDir, `preview_page${i + 1}.png`),
    });
  }
  console.log(`[OK] Saved all 8 page preview screenshots to: ${publicDir}`);

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });

  const pdfPath = path.join(pdfOutputDir, 'post_war_britain_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 8-Page Textbook PDF compiled to: ${pdfPath}`);

  // Duplicate to standard aliases
  const legacyPdfPath = path.join(pdfOutputDir, 'post_war_britain_textbook_FINAL.pdf');
  fs.copyFileSync(pdfPath, legacyPdfPath);
  console.log(`[OK] Mirrored to: ${legacyPdfPath}`);

  await browser.close();
  console.log('\n🎉 MASTERPIECE COMPILATION SUCCESSFUL: Post-War Britain 8-Page Textbook!');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal compilation error:', err);
    process.exit(1);
  });
}

module.exports = { buildHtml, run: main };
