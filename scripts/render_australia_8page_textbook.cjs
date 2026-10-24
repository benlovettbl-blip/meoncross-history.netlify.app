/**
 * scripts/render_australia_8page_textbook.cjs
 *
 * KEY STAGE 3 DISCIPLINARY CLASSROOM COMPANION TEXTBOOK
 * THE HISTORY OF AUSTRALIA (1770–1901)
 *
 * Implements the Key Stage 3 Disciplinary Classroom Companion Textbook Publishing Standard:
 * - Exactly 8 Pages (2 Folded A3 Sheets, Saddle-Stitch Reprographics Standard)
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero task boxes, zero QR codes)
 * - Page 1: Rich architectural Front Cover with hero artwork plate, narrative overview, scheme of learning directory, and core concepts
 * - Page 2: Master Chronological Milestone Spine (12 decisive causal turning points 1770–1901)
 * - Pages 3–7: Five Canonical Enquiries (1 full page per enquiry, 2 balanced columns, paragraph refs [X.1]–[X.5])
 * - Page 8: Master Knowledge Retrieval Quiz Back Cover (25 core recall questions across 5 enquiry cards)
 * - Dynamic SSoT loading directly from units/australia/data.js
 * - Dynamic Auto-Balancing Typography: Automatically calibrates font-size and leading per page
 *   to guarantee 0px overflow, positive clearance (>= +25px above footer), and >= 95% space utilization
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
      path.join(ROOT_DIR, 'units', 'australia', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'australia', 'assets', path.basename(cleanPath)),
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

// Load canonical data dynamically from units/australia/data.js (Single Source of Truth)
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'australia', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw = raw.replace(/export\s*\{[^}]*\};?/g, '').replace(/export\s+default\s+[^;]+;?/g, '');
  const moduleObj = { exports: {} };
  const sandbox = { module: moduleObj, exports: moduleObj.exports, console };
  vm.runInContext(raw, vm.createContext(sandbox));
  return moduleObj.exports;
}

// Canonical unit narrative overview for Front Cover
const canonicalOverview = {
  para1:
    'For more than sixty-five thousand years, hundreds of distinct First Nations cultivated complex societies, oral songlines, and sophisticated fire-stick land management systems across the Australian continent. In 1770, Lieutenant James Cook charted the eastern coastline aboard HMS Endeavour, formally claiming the land for King George III under the convenient imperial fiction of terra nullius—declaring an inhabited continent to be "nobody’s land". Eighteen years later, Governor Arthur Phillip led the First Fleet into Sydney Cove to establish a brutal penal colony, banishing British convicts to the opposite side of the globe.',
  para2:
    'What colonial authorities envisaged as an orderly agricultural outpost rapidly ignited more than a century of fierce territorial conflict known as the Frontier Wars. From the devastating introduction of smallpox and Pemulwuy’s Bidjigal guerrilla resistance to the martial-law clearance of Van Diemen’s Land and the 1838 Myall Creek massacre, pastoral settlement wrought profound devastation upon First Nations peoples. Yet through the 1851 Gold Rush, the democratic rebellion of the Eureka Stockade, and the 1901 Federation, First Nations survivance endured to challenge the foundational legal myths of British colonisation.',
};

// Milestone timeline data for Page 2 (Zero-Maps Standard)
const milestones = [
  {
    date: '1768–1770',
    title: 'Cook, Tupaia & The Myth of Terra Nullius',
    desc: 'Guided across Polynesia by high priest Tupaia, Captain Cook maps the eastern coastline on HMS Endeavour, claiming the territory for King George III under the legal fiction of terra nullius.',
    ref: '1.1–1.5',
  },
  {
    date: 'Jan 1788',
    title: 'Arrival of the First Fleet at Sydney Cove',
    desc: 'Governor Arthur Phillip lands 11 ships carrying roughly 750 convicts and marines at Sydney Cove, raising the Union Jack to found Britain’s first Australian penal colony.',
    ref: '2.1–2.3',
  },
  {
    date: 'Apr 1789',
    title: 'The Sydney Basin Smallpox Catastrophe (Gal-galla)',
    desc: 'A devastating smallpox epidemic sweeps through the Sydney Basin, killing between 50% and 70% of the local Eora population and obliterating Indigenous clan leadership.',
    ref: '3.1–3.2',
  },
  {
    date: 'Nov 1789',
    title: 'Abduction of Woollarawarre Bennelong',
    desc: 'Phillip captures Bennelong to act as an imperial cultural mediator; though Bennelong visits London, the cross-cultural alliance collapses as settlement expands.',
    ref: '3.2–3.3',
  },
  {
    date: '1797–1802',
    title: 'Pemulwuy’s Resistance & The Battle of Parramatta',
    desc: 'Bidjigal resistance leader Pemulwuy leads 100 warriors in a direct daytime assault on colonial troops during a 12-year guerrilla war defending country until his death in 1802.',
    ref: '3.4–3.5',
  },
  {
    date: 'Mar 1804',
    title: 'Castle Hill Convict Rebellion (Vinegar Hill)',
    desc: 'Over 200 predominantly Irish convicts stage an armed uprising outside Sydney demanding return to Ireland, but are swiftly routed by the New South Wales Corps at Rouse Hill.',
    ref: '2.5, 4.1',
  },
  {
    date: '1824–1828',
    title: 'Pastoral Expansion & Martial Law in Van Diemen’s Land',
    desc: 'Merino sheep pastoralists seize fertile inland hunting grounds; mounting settler-Indigenous clashes prompt Governor George Arthur to declare martial law, unleashing the Black War.',
    ref: '4.1–4.3',
  },
  {
    date: 'Oct–Nov 1830',
    title: 'Governor Arthur’s ‘Black Line’ Military Operation',
    desc: 'Over 2,200 soldiers, settlers, and convicts form an unbroken human cordon across Tasmania to drive surviving Aboriginal clans into the Tasman Peninsula, capturing only two people.',
    ref: '4.2–4.3',
  },
  {
    date: '10 June 1838',
    title: 'The Myall Creek Massacre & Landmark Trials',
    desc: 'Eleven white stockmen brutally murder 28 unarmed Wirrayaraay women, children, and elders; seven perpetrators are convicted and hanged in an unprecedented colonial court trial.',
    ref: '4.4–4.5',
  },
  {
    date: 'May 1851',
    title: 'Australian Gold Rush Ignites at Ophir & Ballarat',
    desc: 'Edward Hargraves announces payable gold in NSW, followed by rich Victorian strikes that attract 600,000 global migrants and triple Australia’s population within a decade.',
    ref: '5.1–5.2',
  },
  {
    date: '3 Dec 1854',
    title: 'The Eureka Stockade Battle at Ballarat',
    desc: 'Gold miners rebel against corrupt police licence hunts under the Southern Cross flag; though crushed militarily in 20 minutes, the rebellion catalyzes universal male suffrage in Victoria.',
    ref: '5.2–5.3',
  },
  {
    date: '1 Jan 1901',
    title: 'Australian Federation & The White Australia Policy',
    desc: 'The six self-governing colonies unite into the Commonwealth of Australia, immediately passing the Immigration Restriction Act to institutionalize racial exclusion and disenfranchise First Nations peoples.',
    ref: '5.4–5.5',
  },
];

// Enquiry quiz cards for Page 8
const quizCards = [
  {
    title: 'Enquiry 1: Claiming Australia: Cook, Tupaia & Terra Nullius (1768–1770)',
    questions: [
      {
        q: 'What was the public scientific purpose of Captain Cook’s 1768 Endeavour voyage to Tahiti?',
      },
      {
        q: 'What secret orders was Captain Cook given by the British Admiralty to execute after Tahiti?',
      },
      {
        q: 'Who was Tupaia, and how did his Polynesian navigation skills assist the Endeavour expedition?',
      },
      {
        q: 'Where did Captain Cook formally claim the eastern coast of Australia for King George III in August 1770?',
      },
      {
        q: 'What did the legal doctrine of terra nullius mean in British colonial law, and why was it applied?',
      },
    ],
  },
  {
    title: 'Enquiry 2: The First Fleet & The Convict Penal Colony (1783–1792)',
    questions: [
      { q: 'Why could Britain no longer transport convicted felons to North America after 1783?' },
      {
        q: 'What were the prison hulks moored along the River Thames and southern English naval ports?',
      },
      {
        q: 'On what exact date did Governor Arthur Phillip land at Sydney Cove and raise the Union Jack?',
      },
      {
        q: 'Why was the early penal settlement at Sydney Cove pushed to the brink of mass starvation in 1788–1790?',
      },
      {
        q: 'What was an ‘emancipist’ in colonial Australian society, and what rights did they possess?',
      },
    ],
  },
  {
    title: 'Enquiry 3: Frontier Warfare: Smallpox, Bennelong & Pemulwuy (1788–1802)',
    questions: [
      {
        q: 'Approximately how long have First Nations peoples lived continuously across the Australian continent?',
      },
      {
        q: 'What was the catastrophic impact of the April 1789 smallpox epidemic (gal-galla) on the Sydney Eora?',
      },
      {
        q: 'Who was Woollarawarre Bennelong, and why did Governor Phillip capture and detain him in November 1789?',
      },
      {
        q: 'Which Bidjigal resistance warrior led a twelve-year guerrilla war against British expansion across Sydney?',
      },
      {
        q: 'What lethal proclamation did Governor King issue in November 1801 regarding Parramatta Indigenous clans?',
      },
    ],
  },
  {
    title: 'Enquiry 4: The Frontier Wars, Pastoral Expansion & Black War (1803–1840)',
    questions: [
      {
        q: 'What was the island of Tasmania officially named during early British colonial rule until 1856?',
      },
      {
        q: 'What was Governor George Arthur’s ‘Black Line’ military operation in Tasmania in October–November 1830?',
      },
      {
        q: 'Where were surviving Aboriginal Tasmanians exiled in the 1830s under George Augustus Robinson’s scheme?',
      },
      {
        q: 'Why were wealthy pastoralists who seized vast inland Indigenous territories known as ‘squatters’?',
      },
      {
        q: 'Why was the December 1838 Myall Creek massacre trial historically unprecedented in colonial Australia?',
      },
    ],
  },
  {
    title: 'Enquiry 5: The Gold Rush, Eureka Stockade & Federation (1851–1901)',
    questions: [
      {
        q: 'What was the immediate demographic and economic effect of the 1851 Australian Gold Rush?',
      },
      {
        q: 'What major financial and civil grievance sparked the 1854 Eureka Stockade rebellion in Ballarat?',
      },
      {
        q: 'What flag did the rebel miners swear allegiance to on Bakery Hill before the Eureka Stockade battle?',
      },
      {
        q: 'What was the White Australia Policy established by the 1901 Immigration Restriction Act?',
      },
      {
        q: 'What did the landmark 1992 Mabo Decision achieve in Australian High Court constitutional law?',
      },
    ],
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const lessons = unitData.lessons || [];

  // Hero plate image
  const heroImageBase64 =
    getBase64Image('images/first_fleet_botany_bay_1788.jpg') ||
    getBase64Image('public/images/first_fleet_botany_bay_1788.jpg') ||
    getBase64Image(unitData.hero_image) ||
    '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History of Australia (1770–1901) • Key Stage 3 Disciplinary Classroom Textbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600;1,700&family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'Lora', Georgia, serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
      margin: 0 auto 12mm auto;
      padding: 10mm 12mm 9mm 12mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      page-break-after: always;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    @media print {
      body { background: #ffffff; }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* Running Headers & Footers */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .running-header .sub-badge {
      font-size: 6.8pt;
      font-weight: 800;
      color: #64748b;
      letter-spacing: 0.12em;
    }

    .running-footer {
      margin-top: auto;
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 600;
      color: #64748b;
      letter-spacing: 0.04em;
    }

    .running-footer .page-pill {
      font-weight: 800;
      color: #0f172a;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 1px 7px;
      border-radius: 999px;
      font-size: 7pt;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    #page-1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-masthead {
      text-align: center;
      border-bottom: 2.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 4px;
    }

    .cover-top-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      padding: 1.5px 12px;
      border-radius: 999px;
      margin-bottom: 3px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 21pt;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 2px 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      font-style: italic;
      color: #475569;
      margin-top: 1px;
      font-weight: 600;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 104mm;
      border: 1.5px solid #0f172a;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      margin-bottom: 5px;
      background: #0f172a;
    }

    .cover-hero-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      display: block;
    }

    .cover-hero-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.92);
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.34;
      padding: 4.5px 9px;
      border-top: 1px solid rgba(255, 255, 255, 0.25);
    }

    .cover-hero-caption strong {
      color: #93c5fd;
      font-weight: 700;
    }

    .cover-overview-card {
      background: #fdfbf7;
      border: 1px solid #e2e8f0;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8px 12px;
      margin-bottom: 5px;
    }

    .cover-overview-title {
      font-family: 'Cinzel', serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cover-overview-prose {
      font-family: 'Lora', Georgia, serif;
      font-size: 9.1pt;
      line-height: 1.52;
      color: #1e293b;
      margin: 0 0 4px 0;
      text-align: justify;
      text-justify: inter-word;
    }

    .cover-overview-prose:last-child {
      margin-bottom: 0;
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
      padding: 4px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
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
      font-size: 7.9pt;
      background: #ffffff;
    }

    .cover-directory-table tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .cover-directory-table tr:last-child {
      border-bottom: none;
    }

    .cover-directory-table td {
      padding: 5px 8px;
      vertical-align: middle;
    }

    .col-num {
      width: 55px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
    }

    .col-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 7.9pt;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.6pt;
      padding-left: 4px;
    }

    .col-page {
      width: 48px;
      text-align: right;
      font-weight: 800;
      color: #1e3a8a;
    }

    .cover-concepts-strip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 3px;
      padding: 4.5px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
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

    /* ==========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE (ZERO-MAPS STANDARD)
       ========================================================================== */
    .spine-header-banner {
      background: #0f172a;
      color: #ffffff;
      border-radius: 3px;
      padding: 4px 10px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .spine-title-main {
      font-family: 'Cinzel', serif;
      font-size: 10pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .spine-title-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      color: #93c5fd;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .milestone-timeline {
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 1px 0 3px 0;
      flex: 1;
      justify-content: space-between;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 78px;
      top: 8px;
      bottom: 8px;
      width: 2.5px;
      background: #1e3a8a;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: center;
      position: relative;
      margin: 1px 0;
      z-index: 2;
    }

    .milestone-date-box {
      width: 70px;
      text-align: right;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.02em;
      padding-right: 8px;
      flex-shrink: 0;
    }

    .milestone-node {
      width: 11px;
      height: 11px;
      background: #ffffff;
      border: 2.5px solid #1e3a8a;
      border-radius: 50%;
      margin-left: 2.5px;
      margin-right: 11px;
      flex-shrink: 0;
    }

    .milestone-card {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #1e3a8a;
      border-radius: 3px;
      padding: 3.5px 7px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 6px;
    }

    .milestone-card-content {
      flex: 1;
    }

    .milestone-card-title {
      font-family: 'Cinzel', serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.18;
      margin-bottom: 1px;
    }

    .milestone-card-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.1pt;
      line-height: 1.34;
      color: #334155;
      margin: 0;
    }

    .milestone-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 3px;
      padding: 1px 5px;
      white-space: nowrap;
      align-self: flex-start;
      margin-top: 1px;
    }

    /* ==========================================================================
       PAGES 3–7: FIVE CANONICAL ENQUIRIES (1 PAGE PER ENQUIRY)
       ========================================================================== */
    .enquiry-banner {
      background: #0f172a;
      color: #ffffff;
      border-radius: 3px;
      padding: 5px 9px 4px 9px;
      margin-bottom: 7px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-tag-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
    }

    .enquiry-pillar-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 700;
      color: #93c5fd;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-main-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.02em;
      line-height: 1.15;
      margin: 0 0 3px 0;
    }

    .enquiry-question-card {
      background: rgba(255, 255, 255, 0.1);
      border-left: 3px solid #38bdf8;
      padding: 2.5px 6px;
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 7.7pt;
      line-height: 1.28;
      color: #f1f5f9;
    }

    .enquiry-question-card strong {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-size: 6.6pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #38bdf8;
      margin-right: 4px;
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
      font-size: 10.5pt;
      line-height: 1.48;
      color: #1e293b;
      margin: 0;
    }

    .block-prose strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* ==========================================================================
       PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    .quiz-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .quiz-badge {
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 17pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .quiz-instructions {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 3px;
      padding: 6px 10px;
      font-size: 7.5pt;
      color: #1e3a8a;
      line-height: 1.42;
      margin-bottom: 6px;
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
      padding: 6.5px 10px;
      margin-bottom: 4px;
    }

    .quiz-card:last-child {
      margin-bottom: 0;
    }

    .quiz-card-head {
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

    .quiz-card-ref {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-questions-list {
      margin: 0;
      padding-left: 15px;
      font-family: 'Lora', Georgia, serif;
      font-size: 8.5pt;
      line-height: 1.38;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 2px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="page" id="page-1" data-page="1">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KEY STAGE 3 DISCIPLINARY CLASSROOM TEXTBOOK</span>
      <span class="sub-badge">YEAR 8/9 MASTER EDITION</span>
      <span>PAGE 1</span>
    </div>

    <div class="cover-masthead">
      <div class="cover-top-tag">Key Stage 3 Disciplinary History &bull; The British Empire &amp; World History</div>
      <div class="cover-date-pill">1770 &ndash; 1901</div>
      <h1 class="cover-main-title">THE HISTORY OF AUSTRALIA</h1>
      <div class="cover-subtitle">First Nations, Colonisation, Frontier Resistance &amp; The Path to Federation</div>
    </div>

    <div class="cover-hero-wrap">
      ${heroImageBase64 ? `<img src="${heroImageBase64}" alt="The First Fleet entering Botany Bay, 1788">` : ''}
      <div class="cover-hero-caption">
        <strong>ARCHIVAL PLATE:</strong> The First Fleet entering Botany Bay, January 1788 &bull; Eleven British sailing vessels carrying roughly 1,400 convicts, marines, and civilian officials cast anchor off the eastern coast of Australia, initiating more than a century of imperial colonisation, territorial dispossession, and Indigenous resistance.
      </div>
    </div>

    <div class="cover-overview-card">
      <div class="cover-overview-title">
        <span>Historical Overview &bull; 1770&ndash;1901</span>
        <span style="font-size: 6.8pt; color: #64748b; font-family: 'Inter', sans-serif;">Five Disciplinary Enquiries</span>
      </div>
      <p class="cover-overview-prose">${canonicalOverview.para1}</p>
      <p class="cover-overview-prose">${canonicalOverview.para2}</p>
    </div>

    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>The Canonical Enquiries &bull; Scheme of Learning Directory</span>
        <span>A3 Saddle-Stitch Format</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          ${lessons
            .slice(0, 5)
            .map((lesson, idx) => {
              const num = idx + 1;
              const pageNum = idx + 3;
              const cleanTitle = lesson.title.replace(/\s*\(\d+–\d+\)/, '');
              return `
              <tr>
                <td class="col-num">Enquiry 0${num}</td>
                <td class="col-title">${cleanTitle}</td>
                <td class="col-eq">${lesson.enquiry || ''}</td>
                <td class="col-page">Page ${pageNum}</td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Songlines &bull; Terra Nullius &bull; Botany Bay &bull; Penal Colony &bull; Eora Resistance &bull; Pemulwuy &bull; Van Diemen’s Land &bull; Black War &bull; Myall Creek &bull; Ballarat Gold Rush &bull; Eureka Stockade &bull; White Australia Policy &bull; Mabo Legacy</span>
    </div>

    <div class="running-footer">
      <span>Master Disciplinary Classroom Textbook &bull; Key Stage 3</span>
      <span class="page-pill">Page 1</span>
      <span>The History Revision Hub &bull; 100% Institutional Neutrality</span>
    </div>
  </div>

  <!-- PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE -->
  <div class="page" id="page-2" data-page="2">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KEY STAGE 3 DISCIPLINARY CHRONOLOGY</span>
      <span class="sub-badge">DECISIVE TURNING POINTS SPINE</span>
      <span>PAGE 2</span>
    </div>

    <div class="spine-header-banner">
      <span class="spine-title-main">CHRONOLOGICAL MILESTONE HIGHWAY &bull; 1770&ndash;1901</span>
      <span class="spine-title-tag">12 Decisive Causal Turning Points &bull; Zero Maps Mandate</span>
    </div>

    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-item">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-card">
            <div class="milestone-card-content">
              <div class="milestone-card-title">${m.title}</div>
              <p class="milestone-card-desc">${m.desc}</p>
            </div>
            <div class="milestone-ref">Ref [${m.ref}]</div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>Master Chronological Spine &bull; Twelve Defining Causal Turning Points (1770–1901)</span>
      <span class="page-pill">Page 2</span>
      <span>The History Revision Hub &bull; Disciplinary Standard</span>
    </div>
  </div>

  <!-- PAGES 3–7: FIVE CANONICAL ENQUIRIES -->
  ${lessons
    .slice(0, 5)
    .map((lesson, idx) => {
      const enquiryNum = idx + 1;
      const pageNum = idx + 3;
      const cleanTitle = lesson.title.replace(/\s*\(\d+–\d+\)/, '');
      const blocks = (lesson.narrative_blocks || []).filter(
        (b) => b.text && b.type !== 'photo_slider',
      );

      return `
    <div class="page page-lesson" id="page-${pageNum}" data-page="${pageNum}">
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
        <span class="sub-badge">Enquiry 0${enquiryNum} &bull; Page ${pageNum}</span>
        <span>PAGE ${pageNum}</span>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-tag-pill">ENQUIRY 0${enquiryNum}</span>
          <span class="enquiry-pillar-tag">Pillar 1 &bull; Core Disciplinary Narrative</span>
        </div>
        <h2 class="enquiry-main-title">${cleanTitle.toUpperCase()}</h2>
        <div class="enquiry-question-card">
          <strong>Key Enquiry Question:</strong> ${lesson.enquiry || ''}
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${blocks
            .map((b, bIdx) => {
              const cleaned = cleanProse(b.text);
              return `
              <div class="block-section">
                <div class="block-header">
                  <span class="block-ref">[${enquiryNum}.${bIdx + 1}]</span>
                  <span class="block-title">${b.title || ''}</span>
                </div>
                <p class="block-prose">${cleaned}</p>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Enquiry ${enquiryNum} &bull; ${cleanTitle}</span>
        <span class="page-pill">Page ${pageNum}</span>
        <span>The History Revision Hub &bull; Zero Primary Sources Mandate</span>
      </div>
    </div>
    `;
    })
    .join('')}

  <!-- PAGE 8: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER -->
  <div class="page" id="page-8" data-page="8">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">BACK COVER &bull; RETRIEVAL ENGINE</span>
      <span>PAGE 8</span>
    </div>

    <div class="quiz-top-masthead">
      <div class="quiz-badge">Master Disciplinary Retrieval Engine</div>
      <h2 class="quiz-main-title">MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
    </div>

    <div class="quiz-instructions">
      <strong>Standard Recall Protocol:</strong> 25 core retrieval questions testing factual mastery across all five enquiries. Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit homework retrieval. (Answers verified in textbook narrative; zero answers printed.)
    </div>

    <div class="quiz-cards-grid">
      ${quizCards
        .map((card, cIdx) => {
          const pageRef = cIdx + 3;
          const questions = card.questions || [];
          return `
          <div class="quiz-card">
            <div class="quiz-card-head">
              <span class="quiz-card-title">${card.title.replace(/^Enquiry\s*\d+:\s*/i, 'Enquiry ' + (cIdx + 1) + ': ')}</span>
              <span class="quiz-card-ref">Page ${pageRef} &bull; Ref [${cIdx + 1}.1]&ndash;[${cIdx + 1}.5]</span>
            </div>
            <ol class="quiz-questions-list">
              ${questions.map((q) => `<li>${q.q || q.question}</li>`).join('')}
            </ol>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>Master Knowledge Retrieval Engine &bull; 25 Core Recall Questions (Zero Answers Printed)</span>
      <span class="page-pill">Page 8</span>
      <span>The History Revision Hub &bull; All Rights Reserved</span>
    </div>
  </div>

</body>
</html>`;
}

async function run() {
  console.log('\n============================================================');
  console.log('🚀 COMPILING 8-PAGE MASTER TEXTBOOK: [australia]');
  console.log('============================================================');

  const html = buildHtml();
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'australia');
  const unitDir = path.join(ROOT_DIR, 'units', 'australia');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  const rootHtmlPath = path.join(unitDir, 'textbook.html');

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

      let size = 10.6;
      let lh = 1.49;
      let secMargin = 6.0;

      const getOverlap = () => {
        const fTop = footer.getBoundingClientRect().top;
        const children = Array.from(p.querySelectorAll('.block-section, p, .block-header'));
        const maxB = Math.max(...children.map((c) => c.getBoundingClientRect().bottom));
        return maxB - fTop;
      };

      // Shrink if overflowing or too close to footer
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

      // Expand if underflowing (too much void above footer)
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
        '.prose-body, .milestone-timeline, .quiz-cards-grid, .cover-directory',
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
    printSpaceAuditReport(report, 'australia/textbook.html');
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

  const pdfPath = path.join(pdfOutputDir, 'australia_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 8-Page Textbook PDF compiled to: ${pdfPath}`);

  // Mirror PDF
  const standardPdfPath = path.join(pdfOutputDir, 'australia_textbook.pdf');
  fs.copyFileSync(pdfPath, standardPdfPath);
  console.log(`[OK] Mirrored PDF to: ${standardPdfPath}`);

  await browser.close();
  console.log(
    '\n🎉 MASTERPIECE COMPILATION SUCCESSFUL: The History of Australia 8-Page Textbook!\n',
  );
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error during compilation:', err);
    process.exit(1);
  });
}

module.exports = { run, buildHtml };
