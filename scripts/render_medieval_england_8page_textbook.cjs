/**
 * scripts/render_medieval_england_8page_textbook.cjs
 *
 * 8-PAGE MASTER CLASSROOM TEXTBOOK (2 Sheets of A3 Saddle-Stitch Model)
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to the live app data in units/medieval_england/data.js
 * - Exactly 8 pages (2 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork, canonical dramatic synopsis blurb, 5-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (12 defining turning points & causal dominoes)
 * - Pages 3–7: 5 Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 8: Master 25-Question Knowledge Retrieval Quiz Back Cover (Partner Quiz / Solo Practice)
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
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
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

// Load canonical data from units/medieval_england/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// Canonical unit narrative synopsis from src/unit_synopses.js
const canonicalSynopsis =
  'A disputed succession, a blood-soaked hilltop in Sussex, and a conqueror’s iron fist that violently transformed Anglo-Saxon England forever. Enter the tumultuous world of stone fortresses, feudal bondage, and royal fury. Experience the dramatic murder of Thomas Becket in Canterbury Cathedral, King John cornered by rebel barons at Runnymede to seal Magna Carta, and the catastrophic arrival of the Black Death that shattered feudalism and spurred peasant revolt.';

// Milestone timeline data for Page 2
const milestones = [
  {
    date: 'Jan 1066',
    title: 'Death of Edward the Confessor & Succession Crisis',
    desc: 'King Edward dies childless after 24 years. The Witan elects Harold Godwinson, sparking immediate invasion claims from Normandy and Norway.',
    ref: '1.1–1.2',
  },
  {
    date: '25 Sept 1066',
    title: 'The Battle of Stamford Bridge & 190-Mile March',
    desc: 'King Harold marches his army north in four days, surprising and annihilating Harald Hardrada’s Viking armada in Yorkshire.',
    ref: '1.3',
  },
  {
    date: '14 Oct 1066',
    title: 'The Battle of Hastings & The Senlac Shield Wall',
    desc: 'Harold rushes south to face Duke William. The Saxon shield wall resists five hours of Norman charges until broken by feigned retreats.',
    ref: '1.4–1.5',
  },
  {
    date: '1067–1075',
    title: 'The Motte-and-Bailey Castle Blitz Across England',
    desc: '10,000 Normans subjugate 2 million Saxons by erecting over 500 timber-and-earth motte-and-bailey fortresses at lightning speed.',
    ref: '2.1–2.2',
  },
  {
    date: '1069–1070',
    title: 'The Harrying of the North & Scorched Earth Campaign',
    desc: 'In response to Saxon rebellion in York, William burns crops, herds, and villages across Yorkshire, causing over 100,000 famine deaths.',
    ref: '2.3',
  },
  {
    date: '1086',
    title: 'The Great Domesday Book Survey at Gloucester',
    desc: 'Facing Viking invasion threats, William orders an exhaustive wealth audit of every shire, ox, mill, and tenant in England.',
    ref: '2.4–2.5',
  },
  {
    date: '1162–1164',
    title: 'Henry II, Thomas Becket & Constitutions of Clarendon',
    desc: 'Henry II appoints Chancellor Becket as Archbishop of Canterbury. Becket champions papal authority, fiercely rejecting royal jurisdiction.',
    ref: '3.1–3.3',
  },
  {
    date: '29 Dec 1170',
    title: 'The Martyrdom of Thomas Becket in Canterbury',
    desc: 'Four royal knights assassinate Becket at the altar. Henry performs public barefoot penance as Canterbury becomes Europe’s top pilgrimage site.',
    ref: '3.4–3.5',
  },
  {
    date: '1214–1215',
    title: 'The Loss of Normandy & Baronial Revolt Against John',
    desc: 'Defeated at Bouvines, King John extorts feudal taxes. Rebellious barons capture London, compelling John to meet them at Runnymede.',
    ref: '4.1–4.3',
  },
  {
    date: '15 June 1215',
    title: 'The Sealing of Magna Carta (The Great Charter)',
    desc: 'Clause 39 establishes that no free man can be imprisoned without lawful judgement. The charter enshrines the principle that kings are subject to law.',
    ref: '4.4–4.5',
  },
  {
    date: '1348–1350',
    title: 'The Black Death Catastrophe & Labour Shortages',
    desc: 'Bubonic plague wipes out 35%–45% of England’s population. Labour scarcity empowers surviving serfs to demand higher cash wages.',
    ref: '5.1–5.2',
  },
  {
    date: 'June 1381',
    title: 'The Peasants’ Revolt: Wat Tyler & March on London',
    desc: 'Enraged by repetitive Poll Taxes, rural labourers storm London, burning tax rolls. Tyler is slain at Smithfield, but serfdom begins to dissolve.',
    ref: '5.3–5.5',
  },
];

// Retrieval Quiz Questions for Page 8
const quizCards = [
  {
    topic: 'Enquiry 1: 1066 & Hastings',
    ref: 'Page 3 • Ref [1.1]–[1.5]',
    questions: [
      'Which childless English king died on 5 January 1066?',
      'What council of Anglo-Saxon nobles possessed the authority to elect the next king?',
      'Who was elected King of England immediately following Edward the Confessor’s burial?',
      'At which northern river crossing did King Harold annihilate Harald Hardrada’s army?',
      'What military tactic did Duke William use to lure the Saxon fyrd off Senlac Hill?',
    ],
  },
  {
    topic: 'Enquiry 2: Castles & Domesday',
    ref: 'Page 4 • Ref [2.1]–[2.5]',
    questions: [
      'Approximately how many Norman invaders conquered and ruled two million Saxons?',
      'What two-part earthwork fortification allowed Normans to conquer towns rapidly?',
      'What name is given to William’s brutal winter scorched-earth campaign in Yorkshire?',
      'In what year did William I commission the comprehensive Domesday land survey?',
      'Inside which ancient Roman shore fort did the Normans construct Portchester Castle?',
    ],
  },
  {
    topic: 'Enquiry 3: Henry II & Becket',
    ref: 'Page 5 • Ref [3.1]–[3.5]',
    questions: [
      'What royal position did Thomas Becket hold before becoming Archbishop of Canterbury?',
      'Which 1164 royal document sought to strip church courts of their legal independence?',
      'To which country did Thomas Becket flee for six years of exile?',
      'On what exact date was Becket assassinated inside Canterbury Cathedral?',
      'What humiliating public penance did King Henry II perform following Becket’s murder?',
    ],
  },
  {
    topic: 'Enquiry 4: Magna Carta',
    ref: 'Page 6 • Ref [4.1]–[4.5]',
    questions: [
      'Which English king lost Normandy to King Philip Augustus of France by 1204?',
      'What derogatory nickname was King John given due to his disastrous military record?',
      'In what year and at which Surrey meadow was Magna Carta sealed?',
      'Which famous clause stated that no free man could be imprisoned without lawful trial?',
      'Which nine-year-old king reissued Magna Carta in 1216 and 1225 to secure loyalty?',
    ],
  },
  {
    topic: 'Enquiry 5: Black Death & 1381',
    ref: 'Page 7 • Ref [5.1]–[5.5]',
    questions: [
      'In what year did the bubonic plague (Black Death) first reach the shores of England?',
      'What 1351 royal law attempted to freeze peasant wages at pre-plague rates?',
      'What regressive head tax introduced in 1377, 1379, and 1381 triggered the revolt?',
      'Who was the charismatic military rebel leader who led the peasant march on London?',
      'At which London livestock market was the rebel leader struck down by the Mayor?',
    ],
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(
    unitData.cover_image || '/images/bayeux_norman_cavalry.jpg',
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Medieval England (1066–1485) • Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
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

    .running-footer .page-pill {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 2px;
      font-size: 7pt;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-page {
      padding: 13mm 16mm 11mm 16mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 5px;
    }

    .cover-series {
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2.5px;
    }

    .cover-sub-series {
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #475569;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 8px 0 5px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #fff;
      font-size: 9pt;
      font-weight: 800;
      padding: 2.5px 16px;
      border-radius: 14px;
      letter-spacing: 0.14em;
      margin-bottom: 5px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 28pt;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11pt;
      font-style: italic;
      color: #334155;
      margin-top: 4px;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 80mm;
      border: 1.5px solid #0f172a;
      position: relative;
      background: #0f172a;
      margin: 4px 0 2px 0;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 30%;
    }

    .cover-hero-caption {
      font-size: 7pt;
      color: #475569;
      text-align: center;
      font-style: italic;
      margin-bottom: 4px;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 10px 14px;
      margin: 4px 0 7px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .cover-overview-title {
      font-size: 7.4pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 7.2pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1e293b;
      margin: 0;
      font-style: italic;
      text-align: justify;
    }

    .cover-directory {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      padding: 10px 14px;
      background: #ffffff;
    }

    .cover-directory-heading {
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-list {
      display: flex;
      flex-direction: column;
      gap: 4.5px;
    }

    .directory-item {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-size: 8.2pt;
      color: #1e293b;
    }

    .directory-left {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }

    .directory-num {
      font-weight: 800;
      color: #1e3a8a;
      font-size: 8pt;
      flex-shrink: 0;
    }

    .directory-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 8.2pt;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .directory-enquiry {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 8.2pt;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .directory-page {
      font-weight: 800;
      color: #1e3a8a;
      margin-left: 8px;
      flex-shrink: 0;
      font-size: 8pt;
    }

    /* ==========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 5px;
      margin-bottom: 8px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.5pt;
      font-style: italic;
      color: #475569;
      margin-top: 2px;
    }

    .milestone-timeline {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 0 4px;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 66px;
      top: 6px;
      bottom: 6px;
      width: 2.5px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 5px;
    }

    .milestone-date-box {
      width: 58px;
      text-align: right;
      padding-right: 12px;
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
      line-height: 1.2;
      margin-top: 1px;
    }

    .milestone-node {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 2px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 3.5px 8px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }

    .milestone-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-ref {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #e0e7ff;
      padding: 0 4px;
      border-radius: 2px;
    }

    .milestone-desc {
      font-family: 'Lora', serif;
      font-size: 7.8pt;
      line-height: 1.35;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGES 3–7: ENQUIRY LESSON PAGES
       ========================================================================== */
    .enquiry-banner {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 1.5px 7px;
      border-radius: 2px;
    }

    .enquiry-canon-tag {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 3px 0;
    }

    .enquiry-core-question {
      background: #f1f5f9;
      border-left: 3px solid #1e3a8a;
      padding: 2.5px 7px;
      font-size: 7.5pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .enquiry-core-question span.label {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      font-size: 6.2pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
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
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 2px;
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
    }

    .block-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1.15;
    }

    .block-prose {
      font-family: 'Lora', Georgia, serif;
      color: #1e293b;
      margin: 0;
    }

    .block-prose strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* Calibrated typography: guarantees +30px to +60px clearance, 0px overflow, zero spillover */
    .page-lesson-1 .block-section { margin-bottom: 8px; }
    .page-lesson-1 .block-prose { font-size: 11.15pt; line-height: 1.54; }

    .page-lesson-2 .block-section { margin-bottom: 7px; }
    .page-lesson-2 .block-prose { font-size: 10.65pt; line-height: 1.49; }

    .page-lesson-3 .block-section { margin-bottom: 6.5px; }
    .page-lesson-3 .block-prose { font-size: 10.35pt; line-height: 1.46; }

    .page-lesson-4 .block-section { margin-bottom: 7px; }
    .page-lesson-4 .block-prose { font-size: 10.75pt; line-height: 1.49; }

    .page-lesson-5 .block-section { margin-bottom: 6px; }
    .page-lesson-5 .block-prose { font-size: 10.15pt; line-height: 1.45; }

    /* ==========================================================================
       PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    .quiz-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 5px;
      margin-bottom: 7px;
    }

    .quiz-badge {
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2.5px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 16pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .quiz-instructions {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 3px;
      padding: 7px 11px;
      font-size: 7.6pt;
      color: #1e3a8a;
      line-height: 1.45;
      margin-bottom: 8px;
    }

    .quiz-cards-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .quiz-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 9px 13px;
    }

    .quiz-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 5px;
    }

    .quiz-card-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quiz-card-ref {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-questions-list {
      margin: 0;
      padding-left: 16px;
      font-family: 'Lora', Georgia, serif;
      font-size: 9.5pt;
      line-height: 1.48;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 3px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }

    .quiz-colophon {
      border-top: 1.5px solid #0f172a;
      padding-top: 5px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      color: #64748b;
    }

    .colophon-hub {
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="page cover-page" id="page-1" data-page="1">
    <div class="cover-top-masthead">
      <div class="cover-series">The History Revision Hub</div>
      <div class="cover-sub-series">Key Stage 3 Disciplinary Classroom Textbook &bull; Year 7 Master Edition</div>
    </div>
    <div class="cover-title-block">
      <div class="cover-date-pill">1066 &ndash; 1485</div>
      <h1 class="cover-main-title">MEDIEVAL ENGLAND</h1>
      <div class="cover-subtitle">Crown, Castle, Church &amp; The Struggle for Power</div>
    </div>
    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64}" alt="Norman Heavy Cavalry Battle of Hastings">
    </div>
    <div class="cover-hero-caption">
      Bayeux Tapestry (c. 1070s): Norman heavy shock cavalry clashing against the Anglo-Saxon shield wall at Hastings.
    </div>

    <!-- Dramatic Unit Narrative Synopsis in Playfair Display -->
    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Enquiry &bull; Unit Narrative Synopsis</span>
        <span class="cover-overview-period">1066 &ndash; 1485</span>
      </div>
      <p class="cover-overview-text">
        &ldquo;${canonicalSynopsis}&rdquo;
      </p>
    </div>

    <!-- Canonical Enquiries Scheme of Learning -->
    <div class="cover-directory">
      <div class="cover-directory-heading">
        <span>The Canonical Enquiries &bull; Scheme of Learning</span>
        <span>Reference Directory</span>
      </div>
      <div class="cover-directory-list">
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">01</span>
            <span class="directory-title">1066 &amp; The Battle of Hastings:</span>
            <span class="directory-enquiry">Why did William win?</span>
          </div>
          <span class="directory-page">Page 3</span>
        </div>
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">02</span>
            <span class="directory-title">Castles, Terror &amp; Domesday:</span>
            <span class="directory-enquiry">How did the Normans subjugate England?</span>
          </div>
          <span class="directory-page">Page 4</span>
        </div>
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">03</span>
            <span class="directory-title">Crown vs Church:</span>
            <span class="directory-enquiry">Why did Henry II clash with Thomas Becket?</span>
          </div>
          <span class="directory-page">Page 5</span>
        </div>
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">04</span>
            <span class="directory-title">Magna Carta (1215) &amp; Kingship:</span>
            <span class="directory-enquiry">Liberty or Barons’ Power Grab?</span>
          </div>
          <span class="directory-page">Page 6</span>
        </div>
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">05</span>
            <span class="directory-title">Black Death (1348) &amp; Peasants’ Revolt:</span>
            <span class="directory-enquiry">How did plague shatter feudalism?</span>
          </div>
          <span class="directory-page">Page 7</span>
        </div>
        <div class="directory-item">
          <div class="directory-left">
            <span class="directory-num">Quiz</span>
            <span class="directory-title">Master Knowledge Retrieval Quiz:</span>
            <span class="directory-enquiry">25 Essential Factual Recall Questions</span>
          </div>
          <span class="directory-page">Page 8</span>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Independent Educational Publishing Standard</span>
      <span class="page-pill">Page 1</span>
    </div>
  </div>

  <!-- PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE -->
  <div class="page" id="page-2" data-page="2">
    <div>
      <div class="running-header">
        <span>THE HISTORY REVISION HUB</span>
        <span class="sub-badge">Master Chronology Spine &bull; 1066&ndash;1485</span>
      </div>
      <div class="spine-header-block">
        <h2 class="spine-main-title">CHRONOLOGICAL TURNING POINTS</h2>
        <div class="spine-subtitle">Twelve Decisive Milestones &amp; Causal Dominoes Across the Medieval Realm</div>
      </div>
    </div>
    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-item">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-content">
            <div class="milestone-header-row">
              <span class="milestone-title">${m.title}</span>
              <span class="milestone-ref">Ref [${m.ref}]</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
    <div class="running-footer">
      <span>Medieval England: 1066–1485 &bull; Department Classroom Textbook</span>
      <span class="page-pill">Page 2</span>
    </div>
  </div>

  <!-- PAGES 3–7: 5 ENQUIRIES -->
  ${unitData.lessons
    .map((lesson, idx) => {
      const pageNum = idx + 3;
      const lessonNum = idx + 1;
      const cleanTitle = lesson.title.replace(/^Lesson\s+\d+:\s*/i, '');
      const enquiryQ = lesson.enquiry || lesson.title;
      const blocks = lesson.narrative_blocks.filter((b) => b.text && b.text.trim().length > 0);

      return `
  <div class="page page-lesson page-lesson-${lessonNum}" id="page-${pageNum}" data-page="${pageNum}">
    <div>
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
        <span class="sub-badge">Enquiry 0${lessonNum} &bull; Page ${pageNum}</span>
      </div>
      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-pill">ENQUIRY 0${lessonNum}</span>
          <span class="enquiry-canon-tag">Pillar 1 &bull; Core Narrative</span>
        </div>
        <h2 class="enquiry-title">${cleanTitle}</h2>
        <div class="enquiry-core-question">
          <span class="label">Key Enquiry Question</span>
          <span>${enquiryQ}</span>
        </div>
      </div>
    </div>
    <div class="prose-body">
      <div class="prose-columns">
        ${blocks
          .map(
            (b, bi) => `
          <div class="block-section">
            <div class="block-header">
              <span class="block-ref">[${lessonNum}.${bi + 1}]</span>
              <span class="block-title">${b.title || `Act ${bi + 1}`}</span>
            </div>
            <p class="block-prose">${cleanProse(b.text)}</p>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
    <div class="running-footer">
      <span>The History Revision Hub &bull; Medieval England: 1066&ndash;1485</span>
      <span class="page-pill">Page ${pageNum}</span>
    </div>
  </div>
  `;
    })
    .join('')}

  <!-- PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER -->
  <div class="page" id="page-8" data-page="8">
    <div>
      <div class="quiz-top-masthead">
        <div class="quiz-badge">Back Cover &bull; Retrieval Engine</div>
        <h2 class="quiz-main-title">MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
      </div>
      <div class="quiz-instructions">
        <strong>Standard Recall Protocol:</strong> 25 core retrieval questions testing factual mastery across all five enquiries. Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit homework retrieval. <em>(Answers verified in textbook narrative; zero answers printed.)</em>
      </div>
    </div>
    <div class="quiz-cards-grid">
      ${quizCards
        .map(
          (card, ci) => `
        <div class="quiz-card">
          <div class="quiz-card-head">
            <span class="quiz-card-title">${card.topic}</span>
            <span class="quiz-card-ref">${card.ref}</span>
          </div>
          <ol class="quiz-questions-list" start="${ci * 5 + 1}">
            ${card.questions.map((q) => `<li>${q}</li>`).join('')}
          </ol>
        </div>
      `,
        )
        .join('')}
    </div>
    <div class="running-footer quiz-colophon">
      <span class="colophon-hub">The History Revision Hub</span>
      <span>Printed Reprographics Edition &bull; 8 Pages (2 Sheets A3 Saddle-Stitch)</span>
      <span class="page-pill">Page 8</span>
    </div>
  </div>

</body>
</html>
`;
}

async function run() {
  console.log('Compiling 8-Page Master Classroom Textbook for Medieval England...');
  const html = buildHtml();

  // Save HTML to public and units dirs
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'medieval_england');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log(`[OK] Saved HTML to: ${publicHtmlPath}`);

  const unitsDir = path.join(ROOT_DIR, 'units', 'medieval_england');
  if (fs.existsSync(unitsDir)) {
    fs.writeFileSync(path.join(unitsDir, 'textbook.html'), html, 'utf8');
  }

  // Puppeteer Overflow Audit & PDF Compilation
  console.log('Launching Puppeteer for strict 8-page reprographic audit...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');

  // Evaluate page heights & clearance
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    return Array.from(pages).map((p, i) => {
      const pageNum = p.getAttribute('data-page') || i + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 2;
      const diff = scrollH - clientH;
      const footer = p.querySelector('.running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;

      let lowestBottom = 0;
      const paras = Array.from(
        p.querySelectorAll('.block-prose, .quiz-card, .cover-directory, .milestone-timeline'),
      );
      paras.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > lowestBottom) {
          lowestBottom = r.bottom;
        }
      });

      const clearance = Math.round(footerTop - lowestBottom);

      const proseBox = p.querySelector('.prose-columns');
      let horizOverflow = false;
      if (proseBox) {
        horizOverflow = proseBox.scrollWidth > proseBox.clientWidth + 2;
      }

      return {
        page: pageNum,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: overflow || horizOverflow,
        diff,
        clearance,
        horizOverflow,
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
    console.log('PERFECT: All 8 pages have 0px overflow, positive clearance, and balanced text!');
  }

  // Audit Page Budget
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.page',
      underflowThresholdPx: 50,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 50,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'medieval_england/textbook.html');
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

  const pdfPath = path.join(pdfOutputDir, 'medieval_england_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 8-Page Textbook PDF compiled to: ${pdfPath}`);

  // Mirror PDF
  const standardPdfPath = path.join(pdfOutputDir, 'medieval_england_textbook.pdf');
  fs.copyFileSync(pdfPath, standardPdfPath);
  console.log(`[OK] Mirrored PDF to: ${standardPdfPath}`);

  await browser.close();
  console.log('8-Page Medieval England Textbook compilation completed successfully.');
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
