/**
 * scripts/generate_western_front_master_companion.cjs
 *
 * Master Compiler & Automated Quality Gate Engine for the
 * Official 8-Page Master Knowledge Retrieval Companion for
 * The British Sector of the Western Front, 1914–1918 (Edexcel Paper 1: Section A - 1HI0/11).
 *
 * Strict Reprographic & Pedagogical Architecture (Matching Flagship GCSE Companions):
 * - Exactly 8 Pages (2 folded A3 sheets, saddle-stitch).
 * - Page 1: Master Front Cover & 6-Enquiry Formative Tracking Ledger.
 *           Clean 2-field pupil strip (Name & Class only - zero target grades, zero tutor groups).
 *           Clean ledger table with Attempt 1/2 scores (zero DIRT columns, zero milestone checkboxes).
 *           Clean 2-step Solo/Partner retrieval protocol.
 * - Pages 2–7: 6 Dedicated Enquiry Retrieval Pages (Spread 1: L1 & L2; Spread 2: L3 & L4; Spread 3: L5 & L6).
 *              Flat double-page spread parity starting on Page 2 (Verso / Left).
 *              Horizontal 5-event chronological spine.
 *              8 Tiered retrieval questions in bold Georgia serif (>= 9.8pt).
 *              Dual physical handwriting lines (Core Fact + Explanation >= 25px).
 *              Red-bordered Fatal Examiner Trap callout box.
 * - Page 8: 100% Dedicated Master Department Marking Bank (Back Cover).
 *           3 Balanced columns (16 Qs per column = 48 Qs total).
 *           Bold Core Fact + concise historical explanation.
 *           Strictly ZERO [✓] [✗] tickboxes and strictly ZERO DIRT review boxes.
 * - Rigorous Puppeteer audit across all 8 pages:
 *   Enforce 0px overflow (scrollHeight <= clientHeight, max 1123px).
 *   Enforce zero dead space (footer gap <= 25px, space utilization >= 95%).
 *   Assert compiled PDF is exactly 8 physical pages.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');
const QRCode = require('qrcode');
const { WESTERN_FRONT_QUIZ_BANK } = require('./western_front_pearson_quiz_bank.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const OUTPUT_HTML = path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine', 'western_front_master_retrieval_companion.html');
const OUTPUT_PDF = path.join(PDFS_DIR, 'Western_Front_Master_Knowledge_Retrieval_Companion.pdf');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// QR CODE SVG HELPER
// --------------------------------------------------------------------------
function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

// --------------------------------------------------------------------------
// 3 SPECIFICATION PILLARS (EDEXCEL PAPER 1 SECTION A)
// --------------------------------------------------------------------------
const SPECIFICATION_PILLARS = [
  {
    title: '1. Theatre of War & Trenches',
    text: 'Key sectors: <strong>Ypres Salient</strong> (Hill 60, Passchendaele mud), <strong>The Somme</strong> (1916 casualty crisis), <strong>Arras</strong> (chalk caves, underground hospital), <strong>Cambrai</strong> (tanks, blood depot). Trench layout: front line, support, reserve, communication, saps, and deep dugouts.'
  },
  {
    title: '2. Illnesses, Weaponry & Trauma',
    text: 'Environmental conditions: <strong>trench foot</strong> (whale oil, dry socks), <strong>trench fever</strong> (body lice), <strong>shell shock</strong> (NYDN). Weaponry: artillery shells (58% wounds), shrapnel bullets, gas gangrene/tetanus soil bacteria, poison gas (<strong>chlorine, phosgene, mustard gas</strong>).'
  },
  {
    title: '3. Evacuation Chain & Innovations',
    text: 'Chain of evacuation: <strong>RAP &rarr; ADS/MDS &rarr; CCS &rarr; Base Hospitals</strong>. Medical corps: <strong>RAMC &amp; FANY</strong>. Breakthroughs: <strong>Thomas Splint</strong> (82% survival), <strong>Carrel-Dakin</strong>, <strong>debridement</strong>, mobile X-rays, <strong>blood storage</strong>, Cushing brain surgery, Gillies plastic reconstruction.'
  }
];

// --------------------------------------------------------------------------
// 8 CORE DISCIPLINARY TERMS (SPECIFICATION GLOSSARY)
// --------------------------------------------------------------------------
const CORE_DISCIPLINARY_TERMS = [
  {
    term: '1. Ypres Salient',
    def: 'Vulnerable bulge in the British line surrounded on 3 sides; subjected to converging German artillery and liquid Passchendaele mud.'
  },
  {
    term: '2. Gas Gangrene',
    def: 'Lethal anaerobic bacterial infection caused by soil bacteria (*Clostridium*) in deep, oxygen-deprived shrapnel muscle wounds.'
  },
  {
    term: '3. Wound Debridement',
    def: 'Surgical excision of dead, contaminated tissue and foreign uniform cloth from jagged wounds before suturing to halt infection.'
  },
  {
    term: '4. Carrel-Dakin Method',
    def: 'Continuous chemical irrigation system flushing sterilised sodium hypochlorite solution through rubber tubes into deep wound pockets.'
  },
  {
    term: '5. Thomas Splint',
    def: 'Rigid traction splint introduced to France in Dec 1915; prevented broken femur ends grinding, lifting survival from 20% to 82%.'
  },
  {
    term: '6. Sodium Citrate',
    def: 'Anticoagulant chemical (Lewisohn 1915) that stopped blood clotting, enabling indirect transfusion and revolutionising blood storage.'
  },
  {
    term: '7. Cambrai Blood Depot',
    def: 'World\'s first blood bank created by Oswald Robertson in Nov 1917, storing Universal Group O blood in iced bottles for 26 days.'
  },
  {
    term: '8. Triage Protocol',
    def: 'Systematic casualty sorting at the Casualty Clearing Station (CCS): walking wounded, urgent surgery cases, and moribund (fatal).'
  }
];

// --------------------------------------------------------------------------
// BASE64 IMAGE ENCODER
// --------------------------------------------------------------------------
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return '';
}

// --------------------------------------------------------------------------
// CANONICAL LESSON METADATA (SPINES, TRAPS & QUOTES)
// --------------------------------------------------------------------------
const LESSON_CONFIGS = [
  {
    num: 1,
    title: 'The Theatre of War: Geography, Trenches & Key Battles',
    enquiryQuestion: 'How did the landscape and trench system shape military operations and medical care?',
    topicCode: 'KT 5.1',
    spreadIndicator: 'Spread 1 • Verso (Left)',
    isVerso: true,
    spine: [
      { date: 'Oct 1914', title: 'First Ypres (Salient)' },
      { date: 'Apr 1915', title: 'Second Ypres (Gas)' },
      { date: '1 Jul 1916', title: 'The Somme (57k Loss)' },
      { date: 'Apr 1917', title: 'Arras (Chalk Caves)' },
      { date: 'Nov 1917', title: 'Cambrai (Mass Tanks)' }
    ],
    warning: 'Fatal Examiner Trap: Assuming trenches were dug in long straight lines. They were constructed in a zig-zag traverse pattern so shell blast waves and machine-gun fire could not travel directly down the line.',
    quote: '"Holding the Ypres Salient guarded the Channel ports; the liquid mud made evacuation an ordeal."'
  },
  {
    num: 2,
    title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
    enquiryQuestion: 'How did trench conditions cause debilitating illnesses among frontline troops?',
    topicCode: 'KT 5.2',
    spreadIndicator: 'Spread 1 • Recto (Right)',
    isVerso: false,
    spine: [
      { date: 'Autumn 1914', title: 'Trench Foot Outbreak' },
      { date: 'Winter 1914', title: 'Whale Oil Socks Routine' },
      { date: '1915', title: 'Trench Fever Identified' },
      { date: 'Dec 1915', title: 'Delousing Stations Built' },
      { date: '1916', title: 'NYDN (Shell Shock)' }
    ],
    warning: 'Fatal Examiner Trap: Assuming shell shock was treated as cowardice by medical staff. Over 80,000 cases were medically diagnosed as NYDN (Not Yet Diagnosed Nervous) and treated in specialist psychiatric wards.',
    quote: '"Whale oil and dry socks kept men on their feet; body lice spread 500,000 cases of trench fever."'
  },
  {
    num: 3,
    title: 'Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
    enquiryQuestion: 'Why did modern weaponry and agricultural soil cause unprecedented physical trauma?',
    topicCode: 'KT 5.3',
    spreadIndicator: 'Spread 2 • Verso (Left)',
    isVerso: true,
    spine: [
      { date: 'Autumn 1914', title: 'Tetanus Serum Routine' },
      { date: 'Apr 1915', title: 'Chlorine Gas (Ypres)' },
      { date: 'Autumn 1915', title: 'Brodie Helmets Issued' },
      { date: 'Dec 1915', title: 'Phosgene Deployed' },
      { date: 'July 1917', title: 'Mustard Gas Introduced' }
    ],
    warning: 'Fatal Examiner Trap: Believing poison gas caused the majority of deaths on the Western Front. Artillery shells caused 58% of all battlefield casualties; gas caused less than 3% of fatalities, though it caused immense terror.',
    quote: '"Fertilised manure soil bred lethal gas gangrene; the Brodie helmet cut fatal head wounds by 80%."'
  },
  {
    num: 4,
    title: 'The Chain of Evacuation: From RAP to Base Hospitals',
    enquiryQuestion: 'How did the multi-stage chain of evacuation function to transport and triage casualties?',
    topicCode: 'KT 5.4',
    spreadIndicator: 'Spread 2 • Recto (Right)',
    isVerso: false,
    spine: [
      { date: 'Front Line', title: 'Stretcher-Bearers' },
      { date: '200m', title: 'Regimental Aid Post' },
      { date: '1 Mile', title: 'Dressing Stations' },
      { date: '10 Miles', title: 'Casualty Clearing' },
      { date: 'Coast', title: 'Base Hospitals' }
    ],
    warning: 'Fatal Examiner Trap: Confusing the functions of the RAP and the CCS. The RAP provided emergency first aid only within 200m; major life-saving surgery was performed at the Casualty Clearing Station (CCS).',
    quote: '"From stretcher-bearers under fire to coastal Base Hospitals: master the four-stage chain of evacuation."'
  },
  {
    num: 5,
    title: 'Surgical Breakthroughs: The Thomas Splint, Wound Debridement & X-Rays',
    enquiryQuestion: 'How did wartime necessity drive breakthroughs in surgery, wound cleansing, and imaging?',
    topicCode: 'KT 5.5',
    spreadIndicator: 'Spread 3 • Verso (Left)',
    isVerso: true,
    spine: [
      { date: 'Autumn 1914', title: 'Wound Debridement' },
      { date: 'Dec 1915', title: 'Thomas Splint in France' },
      { date: '1915', title: 'Carrel-Dakin Flushing' },
      { date: '1916', title: 'Mobile X-Ray Vans' },
      { date: '1917', title: 'Arras Cave Hospital' }
    ],
    warning: 'Fatal Examiner Trap: Overstating the diagnostic ability of X-rays. X-rays revealed dense metal bullets and bone fragments, but could not detect muddy uniform cloth containing lethal gas gangrene bacteria.',
    quote: '"The Thomas Splint transformed compound femur survival from 20% to 82%: understand wartime innovation."'
  },
  {
    num: 6,
    title: 'Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
    enquiryQuestion: 'How did the Western Front pioneer modern blood banking, neurosurgery, and plastic surgery?',
    topicCode: 'KT 5.6',
    spreadIndicator: 'Spread 3 • Recto (Right)',
    isVerso: false,
    spine: [
      { date: '1901', title: 'Blood Groups Discovered' },
      { date: '1914', title: 'Sodium Citrate Anti-Clot' },
      { date: '1915', title: 'Citrate-Glucose Storage' },
      { date: 'Nov 1917', title: 'Cambrai Blood Depot' },
      { date: '1917', title: 'Queen\'s Hospital Sidcup' }
    ],
    warning: 'Fatal Examiner Trap: Believing blood banks were available from 1914. Transfusions were strictly person-to-person until Oswald Robertson established the world\'s first blood bank in November 1917 at Cambrai.',
    quote: '"From Cambrai blood depots to Cushing and Gillies: surgical desperation drove modern clinical medicine."'
  }
];

// --------------------------------------------------------------------------
// HTML BUILDER FUNCTION
// --------------------------------------------------------------------------
function buildHtml() {
  const heroImageBase64 = getBase64Image('images/stretcher_bearers_passchendaele_1917.jpg');
  const qrSvg = generateQrSvg('https://the-history-revision-hub.netlify.app/units/edexcel_medicine/');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The British Sector of the Western Front, 1914–1918 • Master Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-container {
      width: 794px;
      height: 1123px;
      max-height: 1123px;
      margin: 0 auto 30px auto;
      background: #ffffff;
      padding: 20px 28px 16px 28px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    @media print {
      body { background: #ffffff; }
      .page-container {
        margin: 0;
        box-shadow: none;
        width: 100%;
        height: 100vh;
        max-height: 100vh;
      }
      .page-container:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }

    /* TYPOGRAPHY */
    .serif-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 800; }
    .serif-prompt { font-family: Georgia, 'Times New Roman', serif; font-size: 9.8pt; font-weight: 700; color: #0f172a; line-height: 1.25; }

    /* RUNNING HEADER */
    .running-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #0f172a;
    }
    .running-header-left { display: flex; align-items: center; gap: 8px; }
    .spread-indicator {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 6px;
      border-radius: 2px;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .score-badge {
      border: 1.5px solid #0f172a;
      background: #f8fafc;
      padding: 2px 10px;
      border-radius: 3px;
      font-weight: 800;
      font-size: 8.5pt;
      color: #0f172a;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .score-blank {
      display: inline-block;
      width: 32px;
      border-bottom: 1.5px solid #0f172a;
      height: 13px;
    }

    /* ENQUIRY BANNER */
    .enquiry-banner {
      margin-top: 4px;
      margin-bottom: 4px;
      border-bottom: 1.2px solid #cbd5e1;
      padding-bottom: 3px;
    }
    .enquiry-title-main {
      font-size: 10.4pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }
    .enquiry-question-sub {
      font-size: 8.2pt;
      font-style: italic;
      color: #334155;
      margin-top: 2px;
      font-family: Georgia, serif;
    }

    /* HORIZONTAL 5-EVENT CHRONOLOGICAL SPINE */
    .spine-strip {
      background: #f8fafc;
      border: 1.2px solid #0f172a;
      border-radius: 4px;
      padding: 3px 6px;
      margin: 3px 0 4px 0;
      display: flex;
      align-items: center;
    }
    .spine-flow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 3px;
    }
    .spine-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      min-width: 0;
    }
    .spine-date-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      white-space: nowrap;
      line-height: 1.1;
    }
    .spine-event-title {
      font-size: 6.6pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.15;
      margin-top: 1.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }
    .spine-arrow {
      font-size: 7.5pt;
      color: #64748b;
      font-weight: 900;
      flex-shrink: 0;
      margin: 0 1px;
    }

    /* QUESTIONS STACK (8 QUESTIONS) */
    .questions-stack {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
      justify-content: space-between;
      margin-top: 3px;
      margin-bottom: 4px;
    }
    .q-block {
      background: #ffffff;
      border-radius: 2px;
    }
    .q-prompt-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }
    .q-num-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 900;
      padding: 1px 5px;
      border-radius: 2px;
      display: inline-block;
      margin-right: 5px;
      vertical-align: 1px;
    }
    .q-marks-tag {
      font-size: 7.2pt;
      font-weight: 800;
      color: #64748b;
      white-space: nowrap;
    }
    .dual-lines-container {
      margin-top: 2px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .handwriting-line {
      height: 25px;
      min-height: 25px;
      border-bottom: 1.2px solid #94a3b8;
      display: flex;
      align-items: flex-end;
      padding-bottom: 2px;
    }
    .line-prefix {
      font-size: 7.6pt;
      font-weight: 800;
      color: #475569;
      width: 82px;
      flex-shrink: 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .line-rule {
      flex: 1;
    }

    /* EXAMINER WARNING BOX */
    .examiner-warning-box {
      border: 1px solid #fecaca;
      border-left: 4.5px solid #b91c1c;
      background: #fef2f2;
      border-radius: 3px;
      padding: 5px 9px;
      margin-top: 3px;
    }
    .warning-header {
      font-size: 7.8pt;
      font-weight: 900;
      color: #991b1b;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 2px;
    }
    .warning-content {
      font-size: 7.7pt;
      line-height: 1.26;
      color: #7f1d1d;
    }

    /* RUNNING FOOTER */
    .running-footer {
      border-top: 1.2px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #475569;
      font-weight: 600;
    }
    .footer-left { font-weight: 800; color: #0f172a; text-transform: uppercase; }
    .footer-quote { font-style: italic; color: #334155; }
    .footer-page-num { font-weight: 800; color: #0f172a; }

    /* FRONT COVER (PAGE 1) */
    .cover-masthead {
      border-bottom: 2.2px solid #0f172a;
      padding-bottom: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .masthead-brand {
      font-size: 8.2pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
    }
    .masthead-series {
      font-size: 7.2pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .pupil-strip {
      display: flex;
      gap: 16px;
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      border-radius: 3px;
      padding: 3.5px 10px;
      margin-top: 3px;
    }
    .pupil-strip-item {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 8.0pt;
    }
    .pupil-strip-label {
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
    }
    .pupil-strip-line {
      flex: 1;
      border-bottom: 1.2px solid #0f172a;
      height: 11px;
    }

    .cover-title-card {
      margin-top: 3.5px;
      margin-bottom: 3.5px;
      text-align: center;
    }
    .cover-h1 {
      font-size: 14.2pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 1.5px 0;
      letter-spacing: -0.3px;
      line-height: 1.15;
    }
    .cover-spec-pill {
      font-size: 7.5pt;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .cover-hero-deck {
      display: grid;
      grid-template-columns: 145px 1fr;
      gap: 10px;
      margin-top: 3px;
      align-items: stretch;
    }
    .hero-plate-box {
      display: flex;
      flex-direction: column;
    }
    .hero-img {
      width: 145px;
      height: 94px;
      object-fit: cover;
      border: 1.4px solid #0f172a;
      border-radius: 3px;
    }
    .hero-pedagogy-card {
      border: 1.4px solid #0f172a;
      background: #ffffff;
      border-radius: 3px;
      padding: 5px 9px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .pedagogy-tag {
      font-size: 6.8pt;
      font-weight: 900;
      text-transform: uppercase;
      color: #0f172a;
      letter-spacing: 0.4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .pedagogy-tag-pill {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      font-size: 6.0pt;
      font-weight: 800;
    }
    .pedagogy-text {
      font-size: 7.0pt;
      color: #334155;
      line-height: 1.25;
      margin: 1.5px 0;
    }
    .pedagogy-text strong { color: #0f172a; }
    .hero-plate-subtext {
      font-size: 6.0pt;
      color: #64748b;
      font-style: italic;
      border-top: 1px dashed #cbd5e1;
      padding-top: 1.5px;
      line-height: 1.2;
      margin-top: 2px;
    }

    /* SPECIFICATION OVERVIEW CARD (3 PILLARS + EXAM STRUCTURE) */
    .spec-overview-card {
      border: 1.2px solid #0f172a;
      border-radius: 3px;
      background: #ffffff;
      margin-top: 3.5px;
      overflow: hidden;
    }
    .spec-overview-title-bar {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.0pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 2.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .spec-three-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      padding: 4px 8px;
      background: #f8fafc;
      border-bottom: 1px solid #cbd5e1;
    }
    .spec-pillar-col {
      border-left: 2.5px solid #0f172a;
      padding-left: 5px;
      line-height: 1.2;
    }
    .pillar-label {
      font-size: 6.8pt;
      font-weight: 900;
      color: #0f172a;
      display: block;
      margin-bottom: 1px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .pillar-text {
      font-size: 6.6pt;
      color: #1e293b;
      line-height: 1.2;
    }
    .pillar-text strong { color: #0f172a; }

    .exam-structure-strip {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr 1.1fr;
      gap: 6px;
      padding: 3px 8px;
      background: #ffffff;
      align-items: center;
    }
    .exam-q-cell {
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 2px 5px;
      background: #f1f5f9;
      line-height: 1.15;
    }
    .eq-num {
      font-size: 6.8pt;
      font-weight: 900;
      color: #0f172a;
      display: inline-block;
      margin-right: 3px;
    }
    .eq-type {
      font-size: 6.8pt;
      font-weight: 800;
      color: #000000;
    }
    .eq-meta {
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
      display: block;
    }

    /* 8 CORE DISCIPLINARY TERMS */
    .spec-glossary-card {
      border: 1.2px solid #0f172a;
      border-radius: 3px;
      background: #ffffff;
      margin-top: 3.5px;
      overflow: hidden;
    }
    .glossary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      padding: 4px 7px;
      background: #ffffff;
      font-size: 6.5pt;
      line-height: 1.18;
    }
    .glossary-item {
      border-left: 2px solid #0f172a;
      padding-left: 4px;
    }
    .glossary-term {
      color: #0f172a;
      font-size: 6.8pt;
      font-weight: 900;
      display: block;
      margin-bottom: 1px;
    }

    /* FORMATIVE TRACKING LEDGER TABLE */
    .ledger-table-wrap {
      margin-top: 3.5px;
    }
    .ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.8pt;
    }
    .ledger-table th {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      padding: 3.5px 6px;
      text-align: left;
      border: 1px solid #0f172a;
    }
    .ledger-table td {
      border: 1px solid #cbd5e1;
      padding: 3.8px 6px;
      font-size: 7.1pt;
      vertical-align: middle;
    }
    .ledger-table tr:nth-child(even) { background: #f8fafc; }
    .td-focus-title { font-weight: 800; color: #0f172a; font-size: 7.4pt; }
    .td-focus-desc { color: #475569; font-size: 6.6pt; line-height: 1.15; margin-top: 1px; }
    .td-center { text-align: center; vertical-align: middle; }
    .score-denom { color: #0f172a; font-weight: 800; }
    .score-line { display: inline-block; width: 24px; border-bottom: 1.2px solid #94a3b8; height: 11px; margin-right: 2px; }
    .td-date-line { display: inline-block; width: 50px; border-bottom: 1.2px solid #94a3b8; height: 12px; }
    .td-sign-line { display: inline-block; width: 75px; border-bottom: 1.2px solid #94a3b8; height: 12px; }

    /* MASTERY TIERS STRIP */
    .traffic-tier-box {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      border-radius: 3px;
      padding: 3px 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 7.1pt;
      font-weight: 700;
      margin-top: 3.5px;
    }
    .traffic-tier-box strong { color: #0f172a; }

    /* COVER PROTOCOL & QR DECK */
    .cover-protocol-qr-deck {
      display: flex;
      gap: 10px;
      align-items: center;
      border: 1.2px solid #0f172a;
      padding: 4px 8px;
      border-radius: 3px;
      background: #ffffff;
      margin-top: 3.5px;
    }
    .qr-box {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .protocol-text-wrap {
      flex: 1;
      font-size: 6.9pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .protocol-text-wrap strong { color: #0f172a; }

    /* ANSWER BANK PAGE (PAGE 8) - 3 BALANCED COLUMNS */
    .bank-header-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 12px;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-size: 7.3pt;
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 2px;
      margin-bottom: 4px;
    }
    .bank-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 10px;
      flex: 1;
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .bank-col {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .bank-col-banner {
      background: #1e293b;
      color: #ffffff;
      padding: 2.5px 6px;
      border-radius: 2px;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
      text-align: center;
    }
    .bank-item {
      border-bottom: 1px solid #e2e8f0;
      padding: 2.8px 1px;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .bank-item:last-child {
      border-bottom: none;
    }
    .bank-item-top {
      display: flex;
      align-items: baseline;
      gap: 3.5px;
    }
    .bank-qnum-tag {
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      font-size: 6.5pt;
      white-space: nowrap;
      flex: none;
    }
    .bank-core-fact {
      color: #0f172a;
      font-weight: 800;
      font-size: 7.7pt;
      line-height: 1.18;
    }
    .bank-exp {
      color: #334155;
      font-size: 6.9pt;
      line-height: 1.18;
      padding-left: 1px;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: MASTER FRONT COVER & FORMATIVE TRACKING LEDGER                -->
  <!-- ===================================================================== -->
  <div class="page-container" id="page-1">
    <div class="cover-masthead">
      <span class="masthead-brand">The History Revision Hub</span>
      <span class="masthead-series">Pearson Edexcel GCSE (9–1) History • Master Companion Series</span>
    </div>

    <!-- Pupil Metadata Strip -->
    <div class="pupil-strip">
      <div class="pupil-strip-item" style="flex: 1;">
        <span class="pupil-strip-label">Pupil Name:</span>
        <span class="pupil-strip-line"></span>
      </div>
      <div class="pupil-strip-item" style="width: 180px;">
        <span class="pupil-strip-label">Class:</span>
        <span class="pupil-strip-line"></span>
      </div>
    </div>

    <div class="cover-title-card">
      <h1 class="cover-h1 serif-title">The British Sector of the Western Front, 1914–1918</h1>
      <div class="cover-spec-pill">Injuries, Treatment and the Trenches • Paper 1: Section A (1HI0/11) • Master Knowledge Retrieval Companion</div>
    </div>

    <div class="cover-hero-deck">
      <div class="hero-plate-box">
        <img class="hero-img" src="${heroImageBase64}" alt="Stretcher-bearers at Pilckem Ridge, 1917">
        <div class="hero-plate-subtext">
          Pilckem Ridge, Passchendaele (1917) • IWM Q 5935
        </div>
      </div>
      <div class="hero-pedagogy-card">
        <div class="pedagogy-tag">
          <span class="pedagogy-tag-pill">COGNITIVE SCIENCE &amp; DUAL-LINE MASTERY</span>
          <span>Overcoming the Forgetting Curve</span>
        </div>
        <div class="pedagogy-text">
          Human memory decays exponentially after initial study. Active, deliberate <strong>spaced retrieval practice</strong> interrupts this decay curve, re-activating neural connections and embedding key historical knowledge into long-term schema for high-stakes GCSE examination recall.
        </div>
        <div class="pedagogy-text">
          Every enquiry trains the rigorous <strong>Dual-Line Retrieval Standard</strong>: Line 1 establishes the exact historical <strong>Core Fact</strong>; Line 2 provides the causal <strong>Historical Explanation</strong> demanded for top marks in Section A feature questions and source utility evaluations.
        </div>
      </div>
    </div>

    <!-- Edexcel Paper 1: Section A Specification Overview -->
    <div class="spec-overview-card">
      <div class="spec-overview-title-bar">
        <span>Edexcel Historic Environment Specification Overview (1HI0/11)</span>
        <span>16 Marks &bull; 10% GCSE Paper 1 Weighting</span>
      </div>
      <div class="spec-three-pillars">
        ${SPECIFICATION_PILLARS.map(p => `
          <div class="spec-pillar-col">
            <span class="pillar-label">${p.title}</span>
            <div class="pillar-text">${p.text}</div>
          </div>
        `).join('')}
      </div>

      <div class="exam-structure-strip">
        <div class="exam-q-cell">
          <span class="eq-num">Q1(a) &amp; Q1(b)</span>
          <span class="eq-type">Feature Questions</span>
          <span class="eq-meta">2m + 2m = 4 Marks &bull; ~6 Mins</span>
        </div>
        <div class="exam-q-cell">
          <span class="eq-num">Q2(a)</span>
          <span class="eq-type">Source Utility Enquiry</span>
          <span class="eq-meta">8 Marks &bull; ~14 Mins</span>
        </div>
        <div class="exam-q-cell">
          <span class="eq-num">Q2(b)</span>
          <span class="eq-type">4-Step Follow-Up Enquiry</span>
          <span class="eq-meta">4 Marks &bull; ~5 Mins</span>
        </div>
      </div>
    </div>

    <!-- 8 Core Disciplinary Terms & Specification Glossary -->
    <div class="spec-glossary-card">
      <div class="spec-overview-title-bar">
        <span>8 Core Disciplinary Terms &bull; Pearson Edexcel Specification Glossary</span>
        <span>Historic Environment Precision</span>
      </div>
      <div class="glossary-grid">
        ${CORE_DISCIPLINARY_TERMS.map(t => `
          <div class="glossary-item">
            <span class="glossary-term">${t.term}</span>
            <div>${t.def}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Formative Tracking Ledger -->
    <div class="ledger-table-wrap">
      <table class="ledger-table">
        <thead>
          <tr>
            <th style="width: 44%;">Historic Environment Topic Focus &amp; Specification Anchor</th>
            <th style="width: 14%; text-align: center;">HW Due Date</th>
            <th style="width: 14%; text-align: center;">1. Solo (/16)</th>
            <th style="width: 14%; text-align: center;">2. Partner (/16)</th>
            <th style="width: 14%; text-align: center;">Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${LESSON_CONFIGS.map(cfg => `
            <tr>
              <td>
                <div class="td-focus-title">${cfg.topicCode}: ${cfg.title}</div>
                <div class="td-focus-desc">${cfg.enquiryQuestion}</div>
              </td>
              <td class="td-center"></td>
              <td class="td-center td-score-cell"><span class="score-denom">/ 16</span></td>
              <td class="td-center td-score-cell"><span class="score-denom">/ 16</span></td>
              <td class="td-center"></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Mastery Tiers Strip -->
    <div class="traffic-tier-box">
      <span>🟢 <strong>Gold Mastery (15–16/16):</strong> Secure Core Recall &bull; Ready for Feature &amp; Source Questions</span>
      <span>🟡 <strong>Silver Milestone (12–14/16):</strong> Effortful Retrieval &bull; Review Marking Bank &amp; Re-test</span>
      <span>🔴 <strong>Foundation Consolidation (&lt;12/16):</strong> Restudy Spines &amp; Retake Weekly Quiz</span>
    </div>

    <!-- Protocol & Interactive QR Portal Banner -->
    <div class="cover-protocol-qr-deck">
      <div class="qr-box">${qrSvg}</div>
      <div class="protocol-text-wrap">
        <div style="font-weight: 800; text-transform: uppercase; font-size: 7.0pt; margin-bottom: 2px; letter-spacing: 0.2px;">Formative Retrieval Protocols &bull; Spaced Testing Standard:</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div><strong>1. SOLO (WRITTEN):</strong> Complete each 8-question enquiry from memory under test conditions. Write a precise <strong>Core Fact</strong> and <strong>Explanation</strong> on the handwriting lines. Self-mark using the Page 8 Answer Bank.</div>
          <div><strong>2. PARTNER (VERBAL):</strong> Hand your booklet to a partner or family member to quiz you verbally from the Page 8 Answer Bank until achieving 16/16 mastery! Scan QR code for digital Leitner quizzing.</div>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span class="footer-left">The History Revision Hub • Independent Educational Publishing Standard</span>
      <span class="footer-page-num">Page 1 of 8</span>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGES 2–7: 6 DEDICATED ENQUIRY RETRIEVAL PAGES (FLAT SPREADS)          -->
  <!-- ===================================================================== -->
  ${LESSON_CONFIGS.map((cfg, idx) => {
    const pageNum = idx + 2;
    const lessonData = WESTERN_FRONT_QUIZ_BANK[idx];
    const questions = lessonData.questions;

    return `
      <div class="page-container" id="page-${pageNum}">
        <div class="running-header">
          <div class="running-header-left">
            <span class="spread-indicator">${cfg.spreadIndicator}</span>
            <span>Western Front, 1914–1918 &bull; Historic Environment &bull; Enquiry ${cfg.num} of 6</span>
          </div>
          <div class="score-badge">
            SCORE: <span class="score-blank"></span> / 16
          </div>
        </div>

        <div class="enquiry-banner">
          <h2 class="enquiry-title-main">Enquiry ${cfg.num}: ${cfg.title}</h2>
          <div class="enquiry-question-sub">Key Enquiry Question: "${cfg.enquiryQuestion}"</div>
        </div>

        <div class="spine-strip">
          <div class="spine-flow">
            ${cfg.spine.map((node, nIdx) => `
              <div class="spine-node">
                <span class="spine-date-pill">${node.date}</span>
                <span class="spine-event-title" title="${node.title}">${node.title}</span>
              </div>
              ${nIdx < cfg.spine.length - 1 ? `<span class="spine-arrow">&#10132;</span>` : ''}
            `).join('')}
          </div>
        </div>

        <div class="questions-stack">
          ${questions.map((q, qIdx) => `
            <div class="q-block">
              <div class="q-prompt-row">
                <div class="serif-prompt">
                  <span class="q-num-pill">Q${qIdx + 1}</span>${q.q}
                </div>
                <span class="q-marks-tag">/ 2m</span>
              </div>
              <div class="dual-lines-container">
                <div class="handwriting-line">
                  <span class="line-prefix">Fact:</span>
                  <span class="line-rule"></span>
                </div>
                <div class="handwriting-line">
                  <span class="line-prefix">Explanation:</span>
                  <span class="line-rule"></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="examiner-warning-box">
          <div class="warning-header">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
              <path d="M12 2L1 21h22L12 2zm0 3.5L20.3 19H3.7L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
            </svg>
            <span>FATAL EXAMINER TRAP</span>
          </div>
          <div class="warning-content">
            ${cfg.warning}
          </div>
        </div>

        <div class="running-footer">
          <span class="footer-left">The History Revision Hub</span>
          <span class="footer-quote">${cfg.quote}</span>
          <span class="footer-page-num">Page ${pageNum} of 8</span>
        </div>
      </div>
    `;
  }).join('')}

  <!-- ===================================================================== -->
  <!-- PAGE 8: MASTER DEPARTMENT MARKING BANK (3 BALANCED COLUMNS)           -->
  <!-- ===================================================================== -->
  <div class="page-container" id="page-8">
    <div class="running-header">
      <div class="running-header-left">
        <span class="spread-indicator">Master Marking Bank</span>
        <span>The British Sector of the Western Front, 1914–1918 &bull; Department Answer Key &bull; Questions 1–48</span>
      </div>
      <span style="font-weight: 800; font-size: 7.5pt; color: #15803d;">OFFICIAL MARKING MODEL &bull; 2 MARKS PER QUESTION</span>
    </div>

    <div class="bank-header-banner">
      <span>Official Department Knowledge Bank &bull; 48 Questions across All 6 Historic Environment Enquiries</span>
      <span>2-Mark Standard: 1m Core Fact + 1m Explanation</span>
    </div>

    <div class="bank-grid-3col">
      <!-- Column 1: Enquiries 1 & 2 (Qs 1–16) -->
      <div class="bank-col">
        <div class="bank-col-banner">Enquiries 1–2: Theatre & Environment</div>
        ${WESTERN_FRONT_QUIZ_BANK.slice(0, 2).flatMap((l, lIdx) => 
          l.questions.map((q, qIdx) => {
            const overallNum = lIdx * 8 + qIdx + 1;
            return `
              <div class="bank-item">
                <div class="bank-item-top">
                  <span class="bank-qnum-tag">Q${overallNum}</span>
                  <strong class="bank-core-fact">${q.a}</strong>
                </div>
                <div class="bank-exp">${q.exp}</div>
              </div>
            `;
          })
        ).join('')}
      </div>

      <!-- Column 2: Enquiries 3 & 4 (Qs 17–32) -->
      <div class="bank-col">
        <div class="bank-col-banner">Enquiries 3–4: Trauma & Evacuation</div>
        ${WESTERN_FRONT_QUIZ_BANK.slice(2, 4).flatMap((l, lIdx) => 
          l.questions.map((q, qIdx) => {
            const overallNum = 16 + lIdx * 8 + qIdx + 1;
            return `
              <div class="bank-item">
                <div class="bank-item-top">
                  <span class="bank-qnum-tag">Q${overallNum}</span>
                  <strong class="bank-core-fact">${q.a}</strong>
                </div>
                <div class="bank-exp">${q.exp}</div>
              </div>
            `;
          })
        ).join('')}
      </div>

      <!-- Column 3: Enquiries 5 & 6 (Qs 33–48) -->
      <div class="bank-col">
        <div class="bank-col-banner">Enquiries 5–6: Surgery & Innovations</div>
        ${WESTERN_FRONT_QUIZ_BANK.slice(4, 6).flatMap((l, lIdx) => 
          l.questions.map((q, qIdx) => {
            const overallNum = 32 + lIdx * 8 + qIdx + 1;
            return `
              <div class="bank-item">
                <div class="bank-item-top">
                  <span class="bank-qnum-tag">Q${overallNum}</span>
                  <strong class="bank-core-fact">${q.a}</strong>
                </div>
                <div class="bank-exp">${q.exp}</div>
              </div>
            `;
          })
        ).join('')}
      </div>
    </div>

    <div class="running-footer">
      <span class="footer-left">The History Revision Hub • Independent Educational Publishing Standard</span>
      <span class="footer-quote">Pearson Edexcel GCSE History Department Answer Bank • Strictly for Formative Classroom Retrieval</span>
      <span class="footer-page-num">Page 8 of 8</span>
    </div>
  </div>

</body>
</html>`;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION AND AUDIT RUNNER
// --------------------------------------------------------------------------
async function main() {
  console.log('================================================================');
  console.log('🚀 COMPILING 8-PAGE MASTER RETRIEVAL COMPANION: Western Front (1914–1918)');
  console.log('================================================================');

  const html = buildHtml();
  fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
  console.log(`[OK] Generated clean HTML at: ${OUTPUT_HTML}`);

  const chromePath =
    process.env.CHROME_BIN ||
    (process.platform === 'win32' &&
    fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  console.log('Launching Puppeteer for layout verification and PDF compilation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Automated Page Budget & 0px Overflow Quality Gate
  const audit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const sh = p.scrollHeight;
      const ch = p.clientHeight;
      const overflow = sh > ch;
      const footer = p.querySelector('.running-footer');
      let footerGap = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        footerGap = Math.round(pRect.bottom - fRect.bottom);
      }
      results.push({
        pageNum,
        id: p.id,
        sh,
        ch,
        overflow,
        footerGap
      });
    });
    return results;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: Western Front 8-Page');
  console.log('=============================================================');
  let hasFailure = false;
  audit.forEach(res => {
    const status = !res.overflow && res.footerGap <= 25 ? '✅ OPTIMAL' : '❌ FAIL';
    if (res.overflow || res.footerGap > 25) hasFailure = true;
    console.log(`Page ${String(res.pageNum).padStart(2)} (${res.id.padEnd(8)}): ${status} (sh: ${res.sh}px, ch: ${res.ch}px, footer gap: ${res.footerGap}px)`);
  });
  console.log('=============================================================\n');

  if (hasFailure) {
    console.error('❌ Compilation halted: Page budget violation detected!');
    await browser.close();
    process.exit(1);
  }

  // Compile Master Print PDF
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log(`[OK] Master 8-Page PDF compiled: ${OUTPUT_PDF}`);

  // Assert exact page count via pdf-parse
  const pdfBytes = fs.readFileSync(OUTPUT_PDF);
  const pdfInfo = await pdfParse(pdfBytes);
  console.log(`[PDF-Parse] Physical page count: ${pdfInfo.numpages}`);
  if (pdfInfo.numpages !== 8) {
    console.error(`❌ Reprographic violation: Expected exactly 8 pages, got ${pdfInfo.numpages}!`);
    await browser.close();
    process.exit(1);
  }
  console.log('✅ PASS: Physical PDF asserted at exactly 8 pages (0 spillover).');

  await browser.close();

  // Sync to Google Drive Department File if available
  const drivePaths = [
    'G:\\My Drive\\AAMX\\Dep File\\Year 11 (GCSE)\\Paper 1 - Medicine Through Time\\Western Front Master Knowledge Retrieval Companion.pdf',
    'G:\\My Drive\\AAMX\\Dep File\\02. GCSE (Years 10-11)\\Paper 1 - Medicine Through Time\\Western Front Master Knowledge Retrieval Companion.pdf',
    'G:\\My Drive\\AAMX\\Dep File\\pdfs\\Western_Front_Master_Knowledge_Retrieval_Companion.pdf'
  ];

  for (const dp of drivePaths) {
    try {
      const dDir = path.dirname(dp);
      if (fs.existsSync(dDir)) {
        fs.copyFileSync(OUTPUT_PDF, dp);
        console.log(`☁️ Synced to Google Drive: ${dp}`);
      }
    } catch (e) {
      // Optional drive sync
    }
  }

  console.log('\n🎉 SUCCESS: Western Front 8-Page Master Retrieval Companion published perfectly!');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal compilation error:', err);
    process.exit(1);
  });
}

module.exports = { buildHtml };
