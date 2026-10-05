/**
 * generate_medicine_thematic_quiz_booklet.cjs
 *
 * Compiles the Master 28-Page A4 Saddle-Stitch Knowledge Retrieval & Thematic Synoptic Companion
 * for Pearson Edexcel GCSE (9–1) History Paper 1: Section B (1HI0/11)
 * Medicine in Britain, c1250–present: Thematic Study.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 20 lessons (10 Pearson Revision Guide questions per lesson = 200 questions)
 * - Exact multiple of 4 (28 pages) for commercial A4 saddle-stitch booklet printing
 * - Publisher-grade typography & 0px dead space underflow budget
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_BASE = 'G:\\My Drive\\AAMX\\Dep File';

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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// --------------------------------------------------------------------------
// APPROVED AUTHENTIC CLASSROOM FOOTERS (28 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'Medicine in Britain Thematic Retrieval Companion • Edexcel Paper 1 (Section B) • The History Department', // P1
  '750-Year Master Chronology & The Four Core Thematic Threads Matrix (c1250–present) • The History Department', // P2
  '"Medieval belief held disease as divine retribution or humoural imbalance; church scriptoria enforced Galenic dogma."', // P3
  '"Galen\'s teleological design matched Church theology; the Four Humours rationalised disease through natural fluids."', // P4
  '"Phlebotomy, purging, and the Regimen Sanitatis sought balance; theriac and pomanders fought miasmatic air."', // P5
  '"\'Care Not Cure\' defined medieval monastic hospitals; prayer and spiritual comfort took precedence over clinical healing."', // P6
  '"The 1348 Black Death overwhelmed humoural medicine; quarantine at Gloucester and mass burial trenches marked civic response."', // P7
  '"Humanism and the printing press unleashed empirical enquiry; Nullius in Verba defined the 1660 Royal Society."', // P8
  '"Thomas Sydenham classified diseases into distinct biological species; bedside observation triumphed over armchair dogma."', // P9
  '"Vesalius corrected over 300 Galenic anatomical errors on human cadavers: \'Trust not Galen, trust your own eyes.\'"', // P10
  '"William Harvey proved the heart is a muscular pump circulating blood in a closed loop, calculating 540 lbs/hr."', // P11
  '"The 1665 Great Plague combined traditional miasma beliefs with organized municipal quarantine and searchers."', // P12
  '"Louis Pasteur destroyed spontaneous generation in 1861; Robert Koch isolated anthrax, tuberculosis, and cholera."', // P13
  '"Edward Jenner\'s 1796 cowpox vaccine replaced risky inoculation, leading to the compulsory 1853 Vaccination Act."', // P14
  '"Florence Nightingale\'s sanitary pavilion plan cut Scutari mortality from 42% to 2%, founding modern professional nursing."', // P15
  '"James Simpson conquered pain with chloroform in 1847; Joseph Lister conquered surgical sepsis with carbolic acid in 1865."', // P16
  '"John Snow mapped cholera to the Broad Street pump in 1854; the 1875 Public Health Act permanently ended laissez-faire."', // P17
  '"Watson, Crick, and Franklin revealed DNA\'s double helix in 1953; the Human Genome Project mapped 3 billion base pairs in 2003."', // P18
  '"From Röntgen\'s X-rays (1895) to CT and MRI scans: non-invasive imaging eliminated exploratory diagnostic surgery."', // P19
  '"Ehrlich\'s Salvarsan 606 pioneered magic bullets; Bevan launched the National Health Service on 5 July 1948."', // P20
  '"Fleming discovered penicillin in 1928; Florey, Chain, and US wartime production scaled 2.3 million D-Day doses."', // P21
  '"Doll and Hill proved smoking causes lung cancer; public health evolved from sewers to lifestyle regulation and 2007 smoking bans."', // P22
  'Department Marking Bank • Era 1: Medieval Britain (c1250–c1500) • Self-Assessment & Green-Pen DIRT Review', // P23
  'Department Marking Bank • Era 2: The Medical Renaissance (c1500–c1700) • Self-Assessment & Green-Pen DIRT Review', // P24
  'Department Marking Bank • Era 3: 18th & 19th Century Britain (c1700–c1900) • Self-Assessment & Green-Pen DIRT Review', // P25
  'Department Marking Bank • Era 4: Modern Britain (c1900–present) • Self-Assessment & Green-Pen DIRT Review', // P26
  'Master 6-Factor Analytical Matrix (War, Religion, Science/Tech, Government, Individuals, Institutions) • Synoptic Grid', // P27
  'Paper 1 Section B Examination Strategy: Similarity/Difference, Causal Analysis & 16-Mark Synoptic Essays • Archival Standard', // P28
];

// --------------------------------------------------------------------------
// MASTER 750-YEAR CHRONOLOGY (18 KEY TURNING POINTS)
// --------------------------------------------------------------------------
const MEDICINE_TIMELINE = [
  {
    year: '1123',
    title: "St Bartholomew's Hospital Founded",
    text: 'Rahere establishes London hospital providing charitable "Care Not Cure" monastic shelter.',
  },
  {
    year: '1277',
    title: 'Roger Bacon Imprisoned',
    text: 'Franciscan friar imprisoned for advocating empirical observation over church dogma.',
  },
  {
    year: '1345',
    title: 'Planetary Conjunction',
    text: 'Saturn, Jupiter, and Mars align in Aquarius, blamed for corrupting air into deadly miasma.',
  },
  {
    year: '1348',
    title: 'The Black Death Arrives',
    text: 'Bubonic and pneumonic plague kills 30–45% of England; Gloucester attempts quarantine.',
  },
  {
    year: '1440',
    title: 'Gutenberg Printing Press',
    text: 'Movable metal type enables rapid mass-dissemination of medical texts without copyist error.',
  },
  {
    year: '1543',
    title: 'Vesalius Publishes De Fabrica',
    text: 'Direct human dissection disproves over 300 of Galen’s animal-derived anatomical errors.',
  },
  {
    year: '1628',
    title: 'Harvey Publishes De Motu Cordis',
    text: 'Proves heart is a muscular pump circulating blood in a closed loop, disproving Galen.',
  },
  {
    year: '1660',
    title: 'Royal Society Founded',
    text: 'Motto "Nullius in Verba" establishes laboratory experimentation and peer-reviewed journals.',
  },
  {
    year: '1665',
    title: 'Great Plague of London',
    text: 'Kills 100,000; City enforces Plague Orders, house quarantine, searchers, and red crosses.',
  },
  {
    year: '1676',
    title: 'Sydenham Publishes Observationes',
    text: 'Classifies diseases into distinct species through bedside clinical observation.',
  },
  {
    year: '1796',
    title: 'Jenner Smallpox Vaccine',
    text: 'Inoculates James Phipps with cowpox, pioneering safe universal vaccination over variolation.',
  },
  {
    year: '1847',
    title: 'Simpson Discovers Chloroform',
    text: 'Inhales chloroform vapors in Edinburgh, conquering surgical and childbirth pain.',
  },
  {
    year: '1854',
    title: 'Snow Broad Street Pump & Scutari',
    text: 'Snow maps cholera to water; Nightingale cuts Scutari Crimean hospital mortality from 42% to 2%.',
  },
  {
    year: '1861',
    title: 'Pasteur Publishes Germ Theory',
    text: 'Swan-neck flask experiments prove airborne microbes cause decay, disproving spontaneous generation.',
  },
  {
    year: '1865',
    title: 'Lister Introduces Carbolic Acid',
    text: 'Applies Germ Theory to surgery, reducing compound fracture sepsis from 46% to 15%.',
  },
  {
    year: '1875',
    title: 'Second Public Health Act',
    text: 'Compulsory legislation mandates piped water, sewage, and inspectors, ending laissez-faire.',
  },
  {
    year: '1928',
    title: 'Fleming Discovers Penicillin',
    text: 'Penicillium notatum mould dissolves staphylococcus; purified by Florey & Chain (1938–41).',
  },
  {
    year: '1948',
    title: 'National Health Service (NHS)',
    text: 'Bevan launches universal healthcare free at point of need, funded by central taxation.',
  },
  {
    year: '1953',
    title: 'Watson, Crick & Franklin: DNA',
    text: 'Double-helix molecular structure discovered, shifting medical causation to cellular genetics.',
  },
  {
    year: '2007',
    title: 'Public Smoking Ban Enacted',
    text: 'Bans smoking in enclosed public workplaces, marking modern lifestyle public health regulation.',
  },
];

// --------------------------------------------------------------------------
// THE FOUR CORE THEMATIC THREADS MATRIX
// --------------------------------------------------------------------------
const THEMATIC_THREADS = [
  {
    theme: '1. Ideas About Causes of Disease',
    medieval:
      'Divine retribution from God; astrological alignments (1345); Theory of the Four Humours; foul miasma.',
    renaissance:
      'Continuity of miasma & divine will; rise of Humanism; Sydenham classifies diseases as biological species.',
    industrial:
      'Miasma persists until 1861; Pasteur proves Germ Theory; Koch isolates specific anthrax, TB & cholera bacteria.',
    modern:
      'Genetics & DNA double helix (1953); Human Genome Project (2003); lifestyle factors (smoking, diet, alcohol).',
  },
  {
    theme: '2. Approaches to Prevention',
    medieval:
      'Prayer, flagellation, pilgrimages; Regimen Sanitatis (Six Non-Naturals); burning sweet herbs; quarantine cordons.',
    renaissance:
      'Plague Orders (1665), quarantine with watchmen, stray animals culled; smoking tobacco; clearing streets.',
    industrial:
      'Jenner cowpox vaccine (1796); 1853 Compulsory Vaccination Act; Snow on cholera (1854); 1875 Public Health Act.',
    modern:
      'Universal childhood immunization (diphtheria, polio, MMR); mass screening; lifestyle legislation (2007 smoking ban).',
  },
  {
    theme: '3. Approaches to Treatment',
    medieval:
      'Phlebotomy (bleeding), purging (laxatives/emetics); Theory of Opposites; herbal theriac; royal touch.',
    renaissance:
      'Continuity of bleeding & purges; iatrochemistry (mercury for syphilis); cinchona bark (quinine); laudanum.',
    industrial:
      'Simpson’s chloroform (1847) conquers pain; Lister’s carbolic acid (1865) conquers sepsis; aseptic surgery by 1890s.',
    modern:
      'Ehrlich’s Salvarsan 606 (1909); Domagk’s Prontosil (1932); Fleming, Florey & Chain penicillin (1928–44); chemotherapy.',
  },
  {
    theme: '4. Hospital Care & Medical Training',
    medieval:
      'Monastic hospitals ("Care Not Cure"); leper houses; university physicians read Galen; barber-surgeons & wise women.',
    renaissance:
      'Dissolution of monasteries closes 500 hospitals; Royal College of Physicians (1518); Vesalius teaches dissection.',
    industrial:
      'Nightingale pavilion plan & nurse training (1860); voluntary infirmaries; cottage hospitals; specialist surgeons.',
    modern:
      'Cottage/voluntary system nationalized; Bevan launches NHS (1948) free at delivery; robotic & keyhole surgery.',
  },
];

// --------------------------------------------------------------------------
// HTML BUILDER: 28-PAGE A4 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
const { MEDICINE_THEMATIC_QUIZ_BANK } = require('./medicine_thematic_pearson_quiz_bank.cjs');

function buildHtml() {
  const qrSvg = generateQrSvg(
    'https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine',
  );

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Medicine in Britain, c1250–present: Master Knowledge Retrieval & Thematic Synoptic Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 6mm 8mm 5mm 8mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page-container {
      width: 100%;
      height: 1081px;
      max-height: 1081px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      background: #ffffff;
    }
    .page-container:last-child {
      page-break-after: avoid;
    }

    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }

    .running-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #0f172a;
    }

    .page-footer-strip {
      border-top: 1.5px solid #0f172a;
      padding-top: 2.5px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
    }
    .footer-quip { font-family: 'Georgia', serif; font-style: italic; color: #1e293b; }
    .footer-page-num { font-weight: 900; font-size: 7.5pt; color: #000000; }

    /* FRONT COVER STYLES */
    .cover-top-box {
      border: 1.5px solid #0f172a;
      padding: 6px 12px;
      background: #ffffff;
      border-radius: 2px;
      margin-bottom: 3.5px;
    }
    .cover-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }
    .cover-badge {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cover-dept-name {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 14.8pt;
      font-weight: 900;
      line-height: 1.15;
      color: #000000;
      margin: 2px 0 1px 0;
      text-align: center;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 700;
      color: #334155;
      text-align: center;
      line-height: 1.25;
      margin-bottom: 2px;
    }

    .pupil-meta-strip {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 5px 8px;
      border-radius: 2px;
      display: grid;
      grid-template-columns: 1.7fr 1fr 1fr 1fr;
      gap: 10px;
      align-items: flex-end;
      margin-bottom: 3.5px;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 700;
    }
    .pupil-field {
      display: flex;
      align-items: flex-end;
      gap: 5px;
    }
    .pupil-field-lbl {
      color: #0f172a;
      white-space: nowrap;
      font-weight: 800;
      font-size: 7.6pt;
    }
    .pupil-line {
      flex: 1;
      border-bottom: 1.4px solid #000000;
      height: 6.8mm;
    }

    /* SPECIFICATION & EXAM OVERVIEW STRIP */
    .spec-overview-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      margin-bottom: 3.5px;
      overflow: hidden;
    }
    .spec-overview-title-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .spec-four-eras {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      padding: 3.5px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.20;
      background: #ffffff;
    }
    .spec-era-col {
      border-left: 2.2px solid #0f172a;
      padding-left: 5px;
    }
    .spec-era-lbl {
      font-weight: 900;
      color: #0f172a;
      display: block;
      font-size: 7.1pt;
      margin-bottom: 1.5px;
    }
    .exam-structure-strip {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1.5fr;
      gap: 6px;
      background: #f1f5f9;
      border-top: 1px solid #cbd5e1;
      padding: 3.5px 7px;
      font-family: 'Inter', sans-serif;
    }
    .exam-q-cell {
      border-left: 2.2px solid #0f172a;
      padding-left: 5px;
      line-height: 1.18;
    }
    .eq-num { font-size: 7.2pt; font-weight: 900; color: #0f172a; display: block; }
    .eq-type { font-size: 6.9pt; font-weight: 800; color: #334155; display: block; }
    .eq-meta { font-size: 6.5pt; color: #475569; display: block; }

    /* 20-LESSON TRACKER (2 COLUMNS OF 10) */
    .tracker-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 3.5px;
    }
    .tracker-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
    }
    .tracker-table th, .tracker-table td {
      border: 1.1px solid #0f172a;
      padding: 7.8px 6px;
      line-height: 1.22;
    }
    .tracker-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      text-align: left;
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      padding: 4.8px 6px;
    }
    .tracker-table tr:nth-child(even) { background: #f8fafc; }
    .col-score { width: 36px; text-align: center; font-size: 6.8pt; font-weight: 800; }
    .col-tick { width: 28px; text-align: center; font-size: 7.0pt; font-weight: 800; }

    /* 4-ERA DIAGNOSTIC MATRIX (FRONT COVER) */
    .era-rag-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-bottom: 2.5px;
    }
    .era-rag-card {
      border: 1.1px solid #0f172a;
      border-top: 3px solid #0f172a;
      background: #ffffff;
      padding: 4.5px 6.5px;
      border-radius: 1px;
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      line-height: 1.22;
    }
    .era-rag-title { font-weight: 900; color: #0f172a; display: block; font-size: 7.0pt; margin-bottom: 1.5px; }

    /* DIRT RETRIEVAL PROTOCOL */
    .protocol-card {
      border: 1.2px solid #0f172a;
      border-left: 4px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 3.5px 6.5px;
      margin-bottom: 2.5px;
    }
    .protocol-title-row {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
    }
    .protocol-grid-4col {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
    }
    .step-item {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 4px 5.5px;
      border-radius: 1px;
    }
    .step-item strong { color: #0f172a; display: block; font-size: 7.0pt; margin-bottom: 1px; }

    .traffic-tier-box {
      border: 1.2px solid #0f172a;
      background: #f1f5f9;
      border-radius: 2px;
      padding: 4px 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 700;
      margin-bottom: 3.5px;
    }

    .glossary-box {
      border: 1.2px solid #0f172a;
      background: #ffffff;
      border-radius: 2px;
      margin-bottom: 3.5px;
      overflow: hidden;
    }
    .glossary-title {
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 7px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 8px;
      padding: 3px 6px;
      font-size: 6.5pt;
      line-height: 1.16;
    }
    .glossary-item { font-family: 'Georgia', serif; color: #1e293b; }
    .glossary-term { font-family: 'Inter', sans-serif; font-weight: 800; color: #0f172a; }

    .guarantee-box {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 4px 8px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .guarantee-qr {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }
    .guarantee-text {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.2;
      color: #1e293b;
    }
    .guarantee-badge {
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      display: block;
      margin-bottom: 1.5px;
    }

    /* Page 2: Chronology & Synoptic Matrix */
    .p2-grid {
      display: grid;
      grid-template-columns: 1.05fr 1.35fr;
      gap: 8px;
      flex: 1;
      margin: 2px 0;
    }
    .col-card {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .col-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 2.5px 6px;
      border-radius: 1px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
      text-align: center;
    }
    .timeline-node {
      border-left: 2.5px solid #0f172a;
      padding-left: 4.5px;
      margin-bottom: 2.5px;
      line-height: 1.14;
    }
    .t-year { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; color: #000; }
    .t-title { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0f172a; margin-left: 3px; }
    .t-desc { font-family: 'Georgia', serif; font-size: 6.6pt; color: #222; display: block; }

    .thread-card {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 4px 6px;
      border-radius: 2px;
      margin-bottom: 3.5px;
      line-height: 1.18;
    }
    .thread-name { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; }
    .thread-era-row { font-size: 6.8pt; margin-bottom: 1.5px; }
    .era-tag { font-family: 'Inter', sans-serif; font-weight: 800; color: #0f172a; display: inline-block; width: 85px; }

    /* Lesson Question Pages (Pages 3–22) */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 3.5px 8px;
      margin-bottom: 3px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 10.6pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 3.2px 6.5px;
      margin-bottom: 2.8px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
      line-height: 1.18;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; color: #000000; min-width: 18px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 8.8pt; font-weight: 700; color: #000000; line-height: 1.18; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 1px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 78px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.3px solid #000000;
      height: 7.0mm;
    }

    /* Pages 23–26: Department Marking Bank (5 Lessons per Page) */
    .mb-grid-5col {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4.5px;
      flex: 1;
      margin-top: 2px;
      height: 100%;
    }
    .mb-lesson-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .mb-lesson-title {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 3px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      border-radius: 1px;
      margin-bottom: 2px;
      text-align: center;
      line-height: 1.15;
    }
    .ans-card {
      border: 1px solid #cbd5e1;
      border-left: 2.5px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 2px 3.5px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 6.8pt;
      line-height: 1.15;
      margin-bottom: 1.2px;
    }
    .ans-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 2px;
    }
    .ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; font-size: 7.2pt; }
    .ans-core { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 7.0pt; flex: 1; margin-left: 2px; }
    .ans-check { font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 800; color: #475569; white-space: nowrap; }
    .ans-exp { color: #1e293b; font-family: 'Georgia', serif; font-style: italic; font-size: 6.5pt; line-height: 1.12; }

    /* Page 27: 6-Factor Analytical Matrix (Top Half) & Synoptic Synthesis (Bottom Half) */
    .p27-wrap {
      display: flex;
      flex-direction: column;
      gap: 4.5px;
      margin-top: 1px;
      height: 100%;
      justify-content: space-between;
    }
    .factor-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
    }
    .factor-table th, .factor-table td {
      border: 1.1px solid #0f172a;
      padding: 11.5px 6.5px;
      vertical-align: top;
      line-height: 1.26;
    }
    .factor-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 7.0pt;
      text-align: center;
      padding: 3.2px 5.5px;
    }
    .factor-lbl {
      background: #f1f5f9;
      font-weight: 900;
      color: #0f172a;
      width: 14%;
      text-transform: uppercase;
      font-size: 6.9pt;
    }
    .factor-col { width: 21.5%; }

    /* Page 27 Bottom Half Components */
    .p27-bottom-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .thematic-progression-card {
      border: 1.2px solid #0f172a;
      background: #ffffff;
      border-radius: 2px;
      overflow: hidden;
    }
    .p27-section-title {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 900;
      padding: 2.5px 7px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .thematic-progression-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
    }
    .thematic-progression-table th, .thematic-progression-table td {
      border: 1px solid #cbd5e1;
      padding: 6.8px 6.5px;
      vertical-align: top;
      line-height: 1.24;
    }
    .thematic-progression-table th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      font-size: 6.6pt;
      text-transform: uppercase;
    }
    .synergy-card-wrap {
      border: 1.2px solid #0f172a;
      background: #ffffff;
      border-radius: 2px;
      overflow: hidden;
    }
    .synergy-grid-4col {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      padding: 4px;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
    }
    .synergy-card {
      border: 1.1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      background: #ffffff;
      padding: 7.5px 7px;
      border-radius: 1px;
      font-size: 6.5pt;
      line-height: 1.22;
    }
    .synergy-tag { font-weight: 900; color: #0f172a; display: block; font-size: 6.8pt; margin-bottom: 1.5px; }

    .debates-grid-4col {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4.5px;
      font-family: 'Inter', sans-serif;
    }
    .debate-card {
      border: 1.1px solid #94a3b8;
      border-top: 2.5px solid #0f172a;
      background: #f8fafc;
      padding: 7.5px 7px;
      border-radius: 1px;
      font-size: 6.5pt;
      line-height: 1.22;
    }
    .debate-tag { font-weight: 900; color: #0f172a; display: block; font-size: 6.8pt; margin-bottom: 1.5px; }

    /* Page 28: Section B Examination Strategy & Level 4 Scaffolding */
    .p28-wrap {
      display: flex;
      flex-direction: column;
      gap: 4.5px;
      margin-top: 1px;
      height: 100%;
      justify-content: space-between;
    }
    .exam-section-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 7.5px 9px;
    }
    .exam-section-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 2.8px 8px;
      border-radius: 1px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .q3-grid {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 7px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
    }
    .formula-step {
      border-left: 2.5px solid #0f172a;
      padding-left: 4px;
      margin-bottom: 2.5px;
    }
    .step-bold { font-weight: 800; color: #0f172a; }

    .q4-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      line-height: 1.22;
    }
    .peel-box {
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      background: #f8fafc;
      padding: 4.8px 6px;
      border-radius: 1px;
    }

    .q56-essay-box {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 5px 8px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
    }
    .essay-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.25fr;
      gap: 7px;
      align-items: start;
    }
    .model-conclusion-box {
      border: 1px solid #94a3b8;
      background: #ffffff;
      padding: 5px 7px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 6.6pt;
      line-height: 1.2;
      font-style: italic;
      color: #1e293b;
    }

    .pitfalls-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.18;
    }
    .pitfall-item {
      border: 1px solid #cbd5e1;
      background: #f1f5f9;
      padding: 4px 5px;
      border-radius: 1px;
    }
    .pitfall-tag { font-weight: 800; color: #991b1b; display: block; font-size: 6.5pt; margin-bottom: 1.5px; }
  </style>
</head>
<body>
`;

  // =========================================================================
  // PAGE 1: FRONT COVER & 20-LESSON TRACKER
  // =========================================================================
  html += `
  <!-- PAGE 1: FRONT COVER -->
  <div class="page-container" id="page-1">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 (1HI0/11)</span>
        <span>SECTION B: THEMATIC STUDY &bull; c1250–PRESENT</span>
      </div>

      <div class="cover-top-box">
        <div class="cover-badge-row">
          <span class="cover-badge">Paper 1: Section B</span>
          <span class="cover-dept-name">The History Department &bull; Revision Spine: Core Knowledge & Exam Strategy</span>
        </div>
        <div class="cover-main-title">MEDICINE IN BRITAIN, c1250–PRESENT</div>
        <div class="cover-sub-title">Master Knowledge Retrieval Companion & Thematic Synoptic Guide &bull; 20 Lessons &bull; 200 Retrieval Questions</div>
      </div>

      <div class="pupil-meta-strip">
        <div class="pupil-field">
          <span class="pupil-field-lbl">Candidate Name:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Candidate No:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Target Grade:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Teacher/Group:</span>
          <div class="pupil-line"></div>
        </div>
      </div>

      <!-- Edexcel Paper 1: Section B Specification Overview -->
      <div class="spec-overview-card">
        <div class="spec-overview-title-bar">
          <span>Edexcel Specification Overview &bull; Paper 1 (Section B: Thematic Study)</span>
          <span>36 Marks &bull; ~48 Mins &bull; 750-Year Chronology</span>
        </div>
        <div class="spec-four-eras">
          <div class="spec-era-col">
            <span class="spec-era-lbl">1. Medieval (c1250–1500)</span>
            Divine retribution, Galenic teleology, Four Humours, monastic "Care Not Cure", 1348 Black Death.
          </div>
          <div class="spec-era-col">
            <span class="spec-era-lbl">2. Renaissance (c1500–1700)</span>
            Humanism, Royal Society (1660), Sydenham observation, Vesalius anatomy, Harvey circulation, 1665 Plague.
          </div>
          <div class="spec-era-col">
            <span class="spec-era-lbl">3. Industrial (c1700–1900)</span>
            Germ Theory (1861), Koch microbes, Jenner vaccine, Nightingale nursing, Simpson, Lister, Snow, 1875 Act.
          </div>
          <div class="spec-era-col">
            <span class="spec-era-lbl">4. Modern (c1900–present)</span>
            DNA double helix (1953), CT/MRI tech, Ehrlich magic bullets, 1948 NHS, mass penicillin, anti-smoking bans.
          </div>
        </div>

        <div class="exam-structure-strip">
          <div class="exam-q-cell">
            <span class="eq-num">Question 3</span>
            <span class="eq-type">Similarity or Difference</span>
            <span class="eq-meta">4 Marks &bull; ~5 Mins</span>
          </div>
          <div class="exam-q-cell">
            <span class="eq-num">Question 4</span>
            <span class="eq-type">Causal Analysis (Explain Why)</span>
            <span class="eq-meta">12 Marks &bull; ~18 Mins &bull; 3 Factors</span>
          </div>
          <div class="exam-q-cell">
            <span class="eq-num">Question 5 or 6</span>
            <span class="eq-type">Synoptic Evaluative Essay</span>
            <span class="eq-meta">16 Marks [+4 SPaG] &bull; ~25 Mins</span>
          </div>
        </div>
      </div>

      <!-- Paper 1 Examination Timing & Mark Allocation Architecture -->
      <div style="border: 1.2px solid #0f172a; background: #ffffff; padding: 2.8px 6px; border-radius: 2px; margin-bottom: 2.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18;">
        <div style="border-left: 2.5px solid #0f172a; padding-left: 4px;">
          <strong style="color: #0f172a;">Section A: Historic Environment (Western Front)</strong> &bull; 16 Marks &bull; 32 Minutes<br>
          Q1(a) Feature [2m] &bull; Q1(b) Feature [2m] &bull; Q2(a) Source Utility [8m] &bull; Q2(b) Follow-up [4m]
        </div>
        <div style="border-left: 2.5px solid #0f172a; padding-left: 4px;">
          <strong style="color: #0f172a;">Section B: Thematic Study (c1250–present)</strong> &bull; 36 Marks [+4 SPaG] &bull; 48 Minutes<br>
          Q3 Similarity/Diff [4m / 5 mins] &bull; Q4 Causal [12m / 18 mins] &bull; Q5/Q6 Essay [16m+4 SPaG / 25 mins]
        </div>
      </div>

      <!-- 20-Lesson Triple-Testing Retrieval Tracker -->
      <div class="tracker-wrap">
        <!-- Col 1: Lessons 1 to 10 -->
        <table class="tracker-table">
          <thead>
            <tr>
              <th style="width: 58%;">Era 1 &amp; Era 2 (c1250–c1700)</th>
              <th class="col-score">1st Cold</th>
              <th class="col-score">2nd DIRT</th>
              <th class="col-score">30D Rev</th>
              <th class="col-tick">Check</th>
            </tr>
          </thead>
          <tbody>
            ${MEDICINE_THEMATIC_QUIZ_BANK.slice(0, 10)
              .map(
                (l) => `
              <tr>
                <td style="padding: 4.1px 5.5px;">
                  <div style="font-weight: 800; font-size: 7.2pt; color: #0f172a; line-height: 1.15;">L${l.num}: ${l.title.replace('Ideas on Causes: ', '').replace('Approaches to ', '').replace('Case Study: ', '').replace('Case Study 1: ', '').replace('Case Study 2: ', '')}</div>
                  <div style="font-size: 6.2pt; color: #475569; font-style: italic; line-height: 1.15; margin-top: 1px;">${l.enquiry}</div>
                </td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-tick" style="padding: 4.1px 2px; font-weight: 900;">[ &nbsp; ]</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>

        <!-- Col 2: Lessons 11 to 20 -->
        <table class="tracker-table">
          <thead>
            <tr>
              <th style="width: 58%;">Era 3 &amp; Era 4 (c1700–present)</th>
              <th class="col-score">1st Cold</th>
              <th class="col-score">2nd DIRT</th>
              <th class="col-score">30D Rev</th>
              <th class="col-tick">Check</th>
            </tr>
          </thead>
          <tbody>
            ${MEDICINE_THEMATIC_QUIZ_BANK.slice(10, 20)
              .map(
                (l) => `
              <tr>
                <td style="padding: 4.1px 5.5px;">
                  <div style="font-weight: 800; font-size: 7.2pt; color: #0f172a; line-height: 1.15;">L${l.num}: ${l.title.replace('Ideas on Causes: ', '').replace('Approaches to ', '').replace('Case Study: ', '').replace('Case Study 1: ', '').replace('Case Study 2: ', '')}</div>
                  <div style="font-size: 6.2pt; color: #475569; font-style: italic; line-height: 1.15; margin-top: 1px;">${l.enquiry}</div>
                </td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-score" style="padding: 4.1px 3px;"><div style="font-size: 5.8pt; color: #64748b; font-weight: normal;">__/__</div><span style="font-weight: 900;">/10</span></td>
                <td class="col-tick" style="padding: 4.1px 2px; font-weight: 900;">[ &nbsp; ]</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Section B 4-Era Diagnostic Progress & Mastery Tracker -->
      <div class="era-rag-matrix">
        <div class="era-rag-card">
          <span class="era-rag-title">Era 1: Medieval (c1250–1500)</span>
          Lessons 1–5 &bull; Target: <strong>&ge;45/50</strong><br>
          Score: <strong>____ / 50</strong> &bull; [ &nbsp; ] DIRT Done<br>
          <div style="margin-top: 1.5px; font-size: 6.2pt; color: #334155;">Weakest: L___ &bull; Sign: ________</div>
          <span style="color: #64748b; font-size: 6.0pt;">Focus: Humours &bull; Monasteries &bull; Plague</span>
        </div>
        <div class="era-rag-card">
          <span class="era-rag-title">Era 2: Renaissance (c1500–1700)</span>
          Lessons 6–10 &bull; Target: <strong>&ge;45/50</strong><br>
          Score: <strong>____ / 50</strong> &bull; [ &nbsp; ] DIRT Done<br>
          <div style="margin-top: 1.5px; font-size: 6.2pt; color: #334155;">Weakest: L___ &bull; Sign: ________</div>
          <span style="color: #64748b; font-size: 6.0pt;">Focus: Vesalius &bull; Harvey &bull; 1665 Plague</span>
        </div>
        <div class="era-rag-card">
          <span class="era-rag-title">Era 3: Industrial (c1700–1900)</span>
          Lessons 11–15 &bull; Target: <strong>&ge;45/50</strong><br>
          Score: <strong>____ / 50</strong> &bull; [ &nbsp; ] DIRT Done<br>
          <div style="margin-top: 1.5px; font-size: 6.2pt; color: #334155;">Weakest: L___ &bull; Sign: ________</div>
          <span style="color: #64748b; font-size: 6.0pt;">Focus: Germ Theory &bull; Surgery &bull; 1875 Act</span>
        </div>
        <div class="era-rag-card">
          <span class="era-rag-title">Era 4: Modern (c1900–present)</span>
          Lessons 16–20 &bull; Target: <strong>&ge;45/50</strong><br>
          Score: <strong>____ / 50</strong> &bull; [ &nbsp; ] DIRT Done<br>
          <div style="margin-top: 1.5px; font-size: 6.2pt; color: #334155;">Weakest: L___ &bull; Sign: ________</div>
          <span style="color: #64748b; font-size: 6.0pt;">Focus: Genetics &bull; Penicillin &bull; NHS (1948)</span>
        </div>
      </div>

      <!-- 4-Stage DIRT Retrieval Protocol -->
      <div class="protocol-card">
        <div class="protocol-title-row">
          <span>Four-Stage Closed-Book Retrieval &amp; Green-Pen DIRT Protocol</span>
        </div>
        <div class="protocol-grid-4col">
          <div class="step-item">
            <strong>Step 1: Blind Recall</strong>
            Complete 10 questions in black ink without notes under timed 8-minute conditions.
          </div>
          <div class="step-item">
            <strong>Step 2: Green-Pen DIRT</strong>
            Self-assess against Department Marking Bank (pp. 23–26). Correct errors in green ink.
          </div>
          <div class="step-item">
            <strong>Step 3: 48h Flashcard Drill</strong>
            Re-test any terms scored &lt;8/10 on the interactive Revision Hub portal within 48h.
          </div>
          <div class="step-item">
            <strong>Step 4: 30-Day Retention</strong>
            Re-test after 30 days to guarantee transfer into permanent long-term semantic memory.
          </div>
        </div>
      </div>

      <!-- Traffic Tier Performance Guidance -->
      <div class="traffic-tier-box">
        <span><strong>Tier 1 (Mastery):</strong> 9–10/10 (&ge;90%) &bull; Ready for 16-Mark Synoptic Evaluation</span>
        <span><strong>Tier 2 (Consolidation):</strong> 7–8/10 (70–80%) &bull; Green-pen DIRT corrections</span>
        <span><strong>Tier 3 (Intervention):</strong> &lt;7/10 (&lt;70%) &bull; Re-test flashcards &amp; re-quiz in 48h</span>
      </div>

      <!-- 10 Core Disciplinary Terms & Specification Glossary -->
      <div class="glossary-box">
        <div class="glossary-title">10 Core Disciplinary Terms &bull; Edexcel Paper 1 Command Vocabulary</div>
        <div class="glossary-grid">
          <div class="glossary-item"><span class="glossary-term">1. Teleology:</span> Doctrine that bodily organs were purposefully designed by a single divine Creator (Galen).</div>
          <div class="glossary-item"><span class="glossary-term">2. Miasma:</span> False theory that foul, poisonous airborne vapour corrupted by decaying matter caused illness.</div>
          <div class="glossary-item"><span class="glossary-term">3. Regimen Sanitatis:</span> Holistic rules balancing diet, sleep, exercise, air, and the Six Non-Naturals.</div>
          <div class="glossary-item"><span class="glossary-term">4. Humanism:</span> Renaissance intellectual movement prioritizing empirical observation over medieval dogma.</div>
          <div class="glossary-item"><span class="glossary-term">5. Inoculation vs Vaccine:</span> Inoculation used live virulent smallpox; vaccination used benign cowpox safely.</div>
          <div class="glossary-item"><span class="glossary-term">6. Spontaneous Generation:</span> False belief that rotting matter generated microbes; disproved by Pasteur (1861).</div>
          <div class="glossary-item"><span class="glossary-term">7. Magic Bullet:</span> Synthetic chemical targeting specific pathogens internally without harming human cells.</div>
          <div class="glossary-item"><span class="glossary-term">8. Antiseptic vs Aseptic:</span> Antiseptic kills germs in wounds (carbolic); aseptic excludes germs completely.</div>
          <div class="glossary-item"><span class="glossary-term">9. Nosology:</span> Systematic scientific classification of distinct diseases into species based on symptoms (Sydenham).</div>
          <div class="glossary-item"><span class="glossary-term">10. Iatrochemistry:</span> Medical approach using chemical minerals and synthetic drugs rather than herbal humours (Paracelsus).</div>
        </div>
      </div>

      <!-- Official Department Revision Standard & QR Code -->
      <div class="guarantee-box">
        <div class="guarantee-qr">${qrSvg}</div>
        <div class="guarantee-text">
          <span class="guarantee-badge">Official Department Revision Standard &bull; Zero Commercial Compromise</span>
          This master knowledge retrieval companion covers the complete Pearson Edexcel GCSE History Paper 1 Section B specification. Scan the QR code for instant mobile access to the interactive revision quizzes, digital flashcards, and teacher video walkthroughs on The History Revision Hub.
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
        <span class="footer-page-num">Page 1 of 28</span>
      </div>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 2: CHRONOLOGY & SYNOPTIC THEMATIC THREADS
  // =========================================================================
  html += `
  <!-- PAGE 2: CHRONOLOGY & SYNOPTIC THREADS -->
  <div class="page-container" id="page-2">
    <div class="page-body-full">
      <div class="running-header">
        <span>MASTER 750-YEAR CHRONOLOGY &bull; c1250 TO PRESENT</span>
        <span>THE FOUR CORE SPECIFICATION THEMATIC THREADS</span>
      </div>

      <div class="p2-grid">
        <!-- Col 1: Master Timeline -->
        <div class="col-card">
          <div class="col-title">750-Year Chronological Sequence (1123–2007)</div>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            ${MEDICINE_TIMELINE.map(
              (t) => `
              <div class="timeline-node">
                <span class="t-year">${t.year} &bull;</span>
                <span class="t-title">${t.title}</span>
                <span class="t-desc">${t.text}</span>
              </div>
            `,
            ).join('')}
          </div>
        </div>

        <!-- Col 2: The Four Core Thematic Threads -->
        <div class="col-card">
          <div class="col-title">The Four Core Thematic Threads Across 4 Eras</div>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            ${THEMATIC_THREADS.map(
              (th) => `
              <div class="thread-card">
                <div class="thread-name">${th.theme}</div>
                <div class="thread-era-row"><span class="era-tag">Medieval (1250–1500):</span> ${th.medieval}</div>
                <div class="thread-era-row"><span class="era-tag">Renaissance (1500–1700):</span> ${th.renaissance}</div>
                <div class="thread-era-row"><span class="era-tag">Industrial (1700–1900):</span> ${th.industrial}</div>
                <div class="thread-era-row"><span class="era-tag">Modern (1900–present):</span> ${th.modern}</div>
              </div>
            `,
            ).join('')}
          </div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
        <span class="footer-page-num">Page 2 of 28</span>
      </div>
    </div>
  </div>
`;

  // =========================================================================
  // PAGES 3–22: 20 LESSON RETRIEVAL PAGES (10 QUESTIONS PER PAGE)
  // =========================================================================
  MEDICINE_THEMATIC_QUIZ_BANK.forEach((lesson, index) => {
    const pageNum = index + 3;
    const footerText = APPROVED_FOOTERS[pageNum - 1];

    html += `
  <!-- PAGE ${pageNum}: LESSON ${lesson.num} (${lesson.era.toUpperCase()}) -->
  <div class="page-container" id="page-${pageNum}">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL GCSE HISTORY &bull; PAPER 1 (SECTION B: THEMATIC STUDY)</span>
        <span>${lesson.eraName.toUpperCase()} &bull; LESSON ${lesson.num} OF 20</span>
      </div>

      <div class="lesson-meta-bar">
        <div class="lesson-meta-title">LESSON ${lesson.num}: ${lesson.title}</div>
        <div class="lesson-meta-enquiry">Historical Enquiry: ${lesson.enquiry}</div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        ${lesson.questions
          .map(
            (q, qIdx) => `
          <div class="q-block">
            <div class="q-header">
              <div class="q-prompt-wrap">
                <span class="q-num">${qIdx + 1}.</span>
                <span class="q-prompt">${q.q}</span>
              </div>
              <span class="q-attempt">[ &nbsp; &nbsp; / 10 ]</span>
            </div>
            <div class="q-line-row">
              <span class="q-line-lbl">Key Fact:</span>
              <div class="q-solid-line"></div>
            </div>
            <div class="q-line-row">
              <span class="q-line-lbl">Explanation:</span>
              <div class="q-solid-line"></div>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${footerText}</span>
        <span class="footer-page-num">Page ${pageNum} of 28</span>
      </div>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGES 23–26: DEPARTMENT MARKING BANK (4 PAGES = 1 PER ERA)
  // =========================================================================
  const ERAS = [
    { id: 'medieval', name: 'Era 1: Medieval Britain (c1250–c1500)', start: 0, end: 5, page: 23 },
    {
      id: 'renaissance',
      name: 'Era 2: The Medical Renaissance (c1500–c1700)',
      start: 5,
      end: 10,
      page: 24,
    },
    {
      id: '18th_19th',
      name: 'Era 3: 18th & 19th Century Britain (c1700–c1900)',
      start: 10,
      end: 15,
      page: 25,
    },
    { id: 'modern', name: 'Era 4: Modern Britain (c1900–present)', start: 15, end: 20, page: 26 },
  ];

  ERAS.forEach((era) => {
    const eraLessons = MEDICINE_THEMATIC_QUIZ_BANK.slice(era.start, era.end);
    const footerText = APPROVED_FOOTERS[era.page - 1];

    html += `
  <!-- PAGE ${era.page}: DEPARTMENT MARKING BANK (${era.name}) -->
  <div class="page-container" id="page-${era.page}">
    <div class="page-body-full">
      <div class="running-header">
        <span>DEPARTMENT MARKING BANK &bull; OFFICIAL MODEL ANSWERS</span>
        <span>${era.name.toUpperCase()}</span>
      </div>

      <div class="mb-grid-5col">
        ${eraLessons
          .map(
            (lesson) => `
          <div class="mb-lesson-col">
            <div class="mb-lesson-title">L${lesson.num}: ${lesson.title.replace('Ideas on Causes: ', '').replace('Approaches to ', '').replace('Case Study: ', '').replace('Case Study 1: ', '').replace('Case Study 2: ', '').substring(0, 24)}</div>
            ${lesson.questions
              .map(
                (q, qIdx) => `
              <div class="ans-card">
                <div class="ans-header">
                  <span class="ans-num">Q${qIdx + 1}:</span>
                  <span class="ans-core">${q.a}</span>
                  <span class="ans-check">[ &check; ]</span>
                </div>
                <div class="ans-exp">${q.exp}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${footerText}</span>
        <span class="footer-page-num">Page ${era.page} of 28</span>
      </div>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGE 27: MASTER 6-FACTOR SYNOPTIC ANALYSIS GRID
  // =========================================================================
  html += `
  <!-- PAGE 27: 6-FACTOR SYNOPTIC ANALYSIS GRID -->
  <div class="page-container" id="page-27">
    <div class="page-body-full">
      <div class="running-header">
        <span>MASTER 6-FACTOR SYNOPTIC ANALYSIS MATRIX</span>
        <span>THE ENGINES OF CHANGE & CONTINUITY (c1250–PRESENT)</span>
      </div>

      <div class="p27-wrap">
        <!-- TOP HALF: 6-FACTOR SYNOPTIC ANALYSIS MATRIX -->
        <table class="factor-table">
          <thead>
            <tr>
              <th style="width: 14%;">Causal Factor</th>
              <th class="factor-col">Medieval (c1250–c1500)</th>
              <th class="factor-col">Renaissance (c1500–c1700)</th>
              <th class="factor-col">18th & 19th Century (c1700–c1900)</th>
              <th class="factor-col">Modern (c1900–present)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="factor-lbl">1. War &amp; Conflict</td>
              <td>
                &bull; <strong>Battlefield Surgery:</strong> Arrow extractions, cautery irons, amputations.<br>
                &bull; <strong>John of Arderne:</strong> Anal fistula surgery for Hundred Years War knights.<br>
                &bull; <strong>Empirical Urgency:</strong> Trauma wounds forced wound dressing over Galen.
              </td>
              <td>
                &bull; <strong>Ambroise Paré (1537):</strong> Improvised egg/turpentine balm; silk ligatures.<br>
                &bull; <strong>Gunpowder Trauma:</strong> Artillery wounds forced deeper wound excision.<br>
                &bull; <strong>Military Care:</strong> Early naval and regimental field dressings.
              </td>
              <td>
                &bull; <strong>Crimean War (1854):</strong> Nightingale cuts Scutari deaths from 42% to 2%.<br>
                &bull; <strong>Franco-Prussian War:</strong> Franco-German rivalry funded Pasteur &amp; Koch.<br>
                &bull; <strong>American Civil War:</strong> Accelerated adoption of battlefield anesthesia.
              </td>
              <td>
                &bull; <strong>WWI:</strong> Thomas splint (80% &rarr; 20% femur deaths), blood depots, plastic surgery.<br>
                &bull; <strong>WWII:</strong> US War Production Board funded mass industrial penicillin vats.<br>
                &bull; <strong>Trauma Innovation:</strong> McIndoe Guinea Pig Club; civilian blood banks.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">2. Religion</td>
              <td>
                &bull; <strong>Scriptoria Monopoly:</strong> Church copied books; dissent burned as heresy.<br>
                &bull; <strong>Galenic Teleology:</strong> Church preserved Galen as proving God's design.<br>
                &bull; <strong>Divine Retribution:</strong> Sickness punished sin; flagellants, pilgrimages.
              </td>
              <td>
                &bull; <strong>Reformation:</strong> Dissolution of 500 monastic hospitals under Henry VIII.<br>
                &bull; <strong>Royal Society (1660):</strong> Motto <em>Nullius in Verba</em> rejected religious dogma.<br>
                &bull; <strong>Lingering Superstition:</strong> Astrological comets blamed for 1665 Plague.
              </td>
              <td>
                &bull; <strong>Clerical Resistance:</strong> Opposition to chloroform citing childbearing pain.<br>
                &bull; <strong>Anti-Vaccine League:</strong> Religious objections to injecting animal matter.<br>
                &bull; <strong>Christian Philanthropy:</strong> Endowed voluntary hospitals and temperance.
              </td>
              <td>
                &bull; <strong>Bioethics:</strong> Debates over embryonic stem-cell research, IVF, cloning.<br>
                &bull; <strong>Palliative Movement:</strong> Cicely Saunders founded modern hospices (1967).<br>
                &bull; <strong>Diminished Causal Role:</strong> Religion ceased to explain pathology or disease.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">3. Science &amp; Tech</td>
              <td>
                &bull; <strong>Primitive Tools:</strong> Urine wheels, astrolabes, Zodiac Man charts, fleams.<br>
                &bull; <strong>Absence of Optics:</strong> No microscopes; couldn't observe microbes or cells.<br>
                &bull; <strong>Hand Manuscripts:</strong> Hand-copying compounded translation errors.
              </td>
              <td>
                &bull; <strong>Printing Press (1440):</strong> Enabled mass distribution of Vesalius's texts.<br>
                &bull; <strong>Mechanical Pumps:</strong> Water engineering inspired Harvey's circulation calculations.<br>
                &bull; <strong>Early Optics:</strong> Hooke's <em>Micrographia</em>; Leeuwenhoek observed animalcules.
              </td>
              <td>
                &bull; <strong>Swan-Neck Flasks:</strong> Pasteur trapped airborne dust; disproved spontaneous gen.<br>
                &bull; <strong>Koch's Bacteriology:</strong> Solid agar, aniline dyes, and camera microscopes.<br>
                &bull; <strong>Chemical Tech:</strong> Chloroform vaporizers; Lister carbolic donkey spray engine.
              </td>
              <td>
                &bull; <strong>Diagnostic Imaging:</strong> X-rays (1895), CT scans (1972), MRI scanners.<br>
                &bull; <strong>Genomics:</strong> Franklin/Crick/Watson DNA (1953); Human Genome (2003).<br>
                &bull; <strong>Targeted Pharmacology:</strong> Salvarsan 606, deep fermentation, robotic surgery.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">4. Government</td>
              <td>
                &bull; <strong>Laissez-Faire:</strong> No central public health; Edward III urged London cleaning.<br>
                &bull; <strong>Local Cordons:</strong> Gloucester 1348 quarantine; East Smithfield mass pits.<br>
                &bull; <strong>Guild Fines:</strong> Butchers fined for dumping offal into the Thames.
              </td>
              <td>
                &bull; <strong>1665 Plague Orders:</strong> Searchers of the Dead, watchmen, red crosses, night burials.<br>
                &bull; <strong>Bills of Mortality:</strong> Parish clerks recorded weekly cause-of-death stats.<br>
                &bull; <strong>Royal Charters:</strong> Henry VIII chartered RCP (1518); Charles II Royal Society (1662).
              </td>
              <td>
                &bull; <strong>Permissive &rarr; Compulsory:</strong> 1848 optional Act &rarr; 1875 compulsory Act.<br>
                &bull; <strong>Sanitary Works:</strong> Parliament funded Bazalgette's £3m London sewer network.<br>
                &bull; <strong>1867 Reform Act:</strong> Enfranchised urban working men, forcing public health laws.
              </td>
              <td>
                &bull; <strong>NHS (1948):</strong> Bevan nationalised 2,688 hospitals, free at point of need.<br>
                &bull; <strong>Preventive Laws:</strong> Clean Air Acts (1956), tobacco ad bans, cigarette warnings.<br>
                &bull; <strong>2007 Smoking Ban:</strong> Health Act banned smoking in enclosed public workspaces.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">5. Key Individuals</td>
              <td>
                &bull; <strong>Hippocrates:</strong> Four Humours, clinical bedside observation, Hippocratic Oath.<br>
                &bull; <strong>Galen:</strong> Theory of Opposites, teleology, 300 animal dissection errors.<br>
                &bull; <strong>Guy de Chauliac:</strong> Preserved Pope Clement VI; noted bubonic vs pneumonic.
              </td>
              <td>
                &bull; <strong>Vesalius (1543):</strong> <em>De Fabrica</em> disproved 300 Galenic anatomical errors.<br>
                &bull; <strong>William Harvey (1628):</strong> <em>De Motu Cordis</em> proved systemic heart circulation.<br>
                &bull; <strong>Sydenham (1676):</strong> "English Hippocrates" classified diseases by symptoms.
              </td>
              <td>
                &bull; <strong>Jenner (1796):</strong> Discovered cowpox vaccine, replacing variolation.<br>
                &bull; <strong>Pasteur &amp; Koch:</strong> Formulated Germ Theory (1861); isolated specific bacilli.<br>
                &bull; <strong>Simpson, Lister, Snow:</strong> Conquered pain (chloroform), sepsis (carbolic), cholera.
              </td>
              <td>
                &bull; <strong>Paul Ehrlich:</strong> Coined "magic bullet"; discovered Salvarsan 606 (1909).<br>
                &bull; <strong>Fleming, Florey &amp; Chain:</strong> Discovered (1928), isolated (1940) penicillin.<br>
                &bull; <strong>Franklin, Crick, Watson:</strong> DNA double helix; Doll &amp; Hill link smoking to cancer.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">6. Institutions</td>
              <td>
                &bull; <strong>Monastic Hospitals:</strong> St Bart's, St Thomas' delivered palliative "Care Not Cure".<br>
                &bull; <strong>Surgeons Guild (1376):</strong> Separated military craft surgeons from barber-surgeons.<br>
                &bull; <strong>Universities:</strong> Oxford &amp; Cambridge enforced scholastic Latin Galenism.
              </td>
              <td>
                &bull; <strong>RCP (1518):</strong> Controlled London licensing; preserved physician prestige.<br>
                &bull; <strong>Royal Society (1660):</strong> Laboratory forums without religious censorship.<br>
                &bull; <strong>Philosophical Transactions:</strong> First peer-reviewed scientific journal.
              </td>
              <td>
                &bull; <strong>BMA (1856):</strong> Professionalised doctors, though resisted state public health.<br>
                &bull; <strong>Nightingale School (1860):</strong> Standardised sanitary clinical nursing.<br>
                &bull; <strong>Voluntary Hospitals:</strong> Municipal and cottage infirmaries expanded surgical care.
              </td>
              <td>
                &bull; <strong>NHS (1948):</strong> Universal, tax-funded national health service.<br>
                &bull; <strong>MRC:</strong> State-funded clinical trials (Doll &amp; Hill; streptomycin).<br>
                &bull; <strong>WHO:</strong> Global coordinated vaccination campaigns; smallpox wiped out (1980).
              </td>
            </tr>
          </tbody>
        </table>

        <!-- BOTTOM HALF: THEMATIC CHANGE/CONTINUITY PROGRESSION & FACTOR SYNERGY -->
        <div class="p27-bottom-wrap">
          <div class="thematic-progression-card">
            <div class="p27-section-title">
              <span>Thematic Change &amp; Continuity Progression Across 750 Years (c1250–Present)</span>
              <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Edexcel Paper 1 Section B Core Themes</span>
            </div>
            <table class="thematic-progression-table">
              <thead>
                <tr>
                  <th style="width: 14%;">Core Theme</th>
                  <th style="width: 21.5%;">Medieval (c1250–1500)</th>
                  <th style="width: 21.5%;">Renaissance (c1500–1700)</th>
                  <th style="width: 21.5%;">18th &amp; 19th C. (c1700–1900)</th>
                  <th style="width: 21.5%;">Modern (c1900–present)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight: 800; background: #f8fafc; color: #0f172a;">1. Ideas on Causes</td>
                  <td><strong>Supernatural &amp; Humours:</strong> God's punishment, 1345 planetary alignment, Four Humours, miasma. Galen teleology dogmatic.</td>
                  <td><strong>Transitional Empiricism:</strong> Sydenham bedside observation; animalcules seen; yet miasma and God endured for 1665 Plague.</td>
                  <td><strong>Microbial Revolution:</strong> Pasteur Germ Theory (1861) disproved spontaneous gen; Koch bacteriology isolated specific TB and cholera bacilli.</td>
                  <td><strong>Genetics &amp; Lifestyle:</strong> DNA double helix (1953); Human Genome Project (2003); smoking &amp; lifestyle risks identified.</td>
                </tr>
                <tr>
                  <td style="font-weight: 800; background: #f8fafc; color: #0f172a;">2. Prevention &amp; Public Health</td>
                  <td><strong>Spiritual &amp; Laissez-Faire:</strong> Prayer, flagellants, sweet herbs; local quarantine (Gloucester 1348); butcher offal fines.</td>
                  <td><strong>Early Municipal Orders:</strong> 1665 Plague Orders (watchmen, Searchers of Dead, red crosses); parish Bills of Mortality; stray animals culled.</td>
                  <td><strong>Compulsory Legislation:</strong> Jenner vaccine (1796); 1853 mandatory smallpox; Bazalgette sewers; 1875 Public Health Act ended laissez-faire.</td>
                  <td><strong>Preventive Welfare State:</strong> Universal childhood vaccines (diphtheria, polio, MMR); 1956 Clean Air Act; 2007 smoking ban; NHS screening.</td>
                </tr>
                <tr>
                  <td style="font-weight: 800; background: #f8fafc; color: #0f172a;">3. Treatments &amp; Surgery</td>
                  <td><strong>Palliative &amp; Humoral:</strong> Phlebotomy (bleeding), purges, herbal theriac, Theory of Opposites; cautery irons and fleams.</td>
                  <td><strong>Chemical Experiments:</strong> Continuity of bleeding/purges; Paracelsian iatrochemistry (mercury); cinchona bark (quinine); laudanum.</td>
                  <td><strong>Conquest of Pain &amp; Sepsis:</strong> Simpson chloroform (1847); Lister carbolic spray (1865); transition to aseptic theatres by 1890s.</td>
                  <td><strong>Targeted Pharmacology:</strong> Ehrlich Salvarsan 606 (1909); Fleming/Florey/Chain penicillin (1928–44); radiotherapy, chemotherapy.</td>
                </tr>
                <tr>
                  <td style="font-weight: 800; background: #f8fafc; color: #0f172a;">4. Care &amp; Institutions</td>
                  <td><strong>Monastic Hospitality:</strong> 500+ monastic hospitals ("Care Not Cure"); barber-surgeons vs university physicians reading Latin Galen.</td>
                  <td><strong>Secular Reorganisation:</strong> Dissolution of monasteries closed 500 hospitals; Royal College of Physicians (1518); Royal Society (1660).</td>
                  <td><strong>Professionalized Nursing:</strong> Nightingale pavilion plan &amp; St Thomas' school (1860); voluntary municipal infirmaries; cottage hospitals.</td>
                  <td><strong>Universal Healthcare:</strong> Bevan launched NHS (5 July 1948) nationalising 2,688 hospitals; free healthcare funded by general taxation.</td>
                </tr>
                <tr>
                  <td style="font-weight: 800; background: #f8fafc; color: #0f172a;">5. Science &amp; Profession</td>
                  <td><strong>Scholastic Authority:</strong> Latin texts learned by heart; Galenic infallibility; craft guilds separated barber-surgeons (1376).</td>
                  <td><strong>Empirical Enquiry:</strong> Human dissection at Padua; <em>Nullius in Verba</em> (1660); <em>Philosophical Transactions</em> peer review.</td>
                  <td><strong>Laboratory Science:</strong> Medical Act (1858) established GMC register; British Medical Association (1856); bacteriology institutes.</td>
                  <td><strong>Multidisciplinary Teams:</strong> State Medical Research Council (MRC); clinical trials; international WHO disease eradication (smallpox 1980).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Synoptic Factor Interdependence & Synergy Matrix (For 16-Mark Essays) -->
          <div class="synergy-card-wrap">
            <div class="p27-section-title">
              <span>Synoptic Factor Interdependence &amp; Cross-Thematic Synergy &bull; Level 4 Evaluative Toolkit</span>
              <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Edexcel Paper 1 16-Mark Strategy</span>
            </div>
            <div class="synergy-grid-4col">
              <div class="synergy-card">
                <span class="synergy-tag">&bull; War &amp; Science / Tech</span>
                Traumatic trauma demanded urgent remedies. WWI enabled Robertson's blood depots &amp; Thomas splints (femur deaths 80% &rarr; 20%); WWII US War Production Board funded mass industrial penicillin fermentation.
              </div>
              <div class="synergy-card">
                <span class="synergy-tag">&bull; Government &amp; Science</span>
                Scientific discovery was impotent without statutory state force. Snow's 1854 cholera proof remained unapplied until Parliament funded Bazalgette's £3m sewers and passed the compulsory 1875 Act.
              </div>
              <div class="synergy-card">
                <span class="synergy-tag">&bull; Technology &amp; Individuals</span>
                Genius was imprisoned by contemporary technology. Pasteur and Koch could not have proven Germ Theory without Zeiss optical microscopes and industrial synthetic aniline dyes staining bacilli.
              </div>
              <div class="synergy-card">
                <span class="synergy-tag">&bull; Institutions &amp; Public Health</span>
                Progress required institutional structures to overcome vested interests. Bevan overcame 90% BMA doctor boycotts in 1948 by allowing private consultant beds, securing universal tax-funded care.
              </div>
            </div>
          </div>

          <!-- 4 Examiner Historiographical Debates for Level 4 Essays -->
          <div class="debates-grid-4col">
            <div class="debate-card">
              <span class="debate-tag">&bull; Renaissance Reality Check</span>
              <strong>Did Vesalius &amp; Harvey save lives?</strong>
              <em>No immediate impact.</em> Overthrew Galenic anatomy/physiology, but doctors lacked microscopes and Germ Theory; patients were still bled in 1665.
            </div>
            <div class="debate-card">
              <span class="debate-tag">&bull; 19th C. Individual vs Technology</span>
              <strong>Genius or Industrial Tech?</strong>
              <em>Symbiotic dependency.</em> Pasteur &amp; Koch were geniuses, but their bacteriology was impossible without Zeiss microscope optics and industrial aniline dyes.
            </div>
            <div class="debate-card">
              <span class="debate-tag">&bull; Laissez-Faire Turning Point</span>
              <strong>Why 1875, not 1848?</strong>
              <em>Working-class vote.</em> The 1848 Act failed because it was permissive. The 1867 Reform Act gave urban workers the vote, forcing compulsory legislation in 1875.
            </div>
            <div class="debate-card">
              <span class="debate-tag">&bull; Modern NHS Politics</span>
              <strong>Consensus or Conflict?</strong>
              <em>Bitter opposition.</em> 90% of BMA doctors initially voted to boycott the NHS; Bevan succeeded only by allowing consultants private beds ("gold").
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${APPROVED_FOOTERS[26]}</span>
        <span class="footer-page-num">Page 27 of 28</span>
      </div>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 28: BACK COVER EXAMINATION STRATEGY
  // =========================================================================
  html += `
  <!-- PAGE 28: SECTION B EXAMINATION STRATEGY -->
  <div class="page-container" id="page-28">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 (SECTION B)</span>
        <span>EXAMINATION STRATEGY & LEVEL 4 ARCHITECTURE</span>
      </div>

      <div class="p28-wrap">
        <!-- Q3: Similarity / Difference [4 Marks &bull; 5 Mins] -->
        <div class="exam-section-card">
          <div class="exam-section-title">
            <span>Question 3: Direct Comparative Analysis Across Eras [4 Marks &bull; ~5 Mins]</span>
            <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Level 2 (3–4m): Direct Comparative Analysis &bull; Both Eras Contextualised</span>
          </div>
          <div class="q3-grid">
            <div style="font-size: 6.6pt; line-height: 1.22;">
              <div class="formula-step"><span class="step-bold">The 4-Step Direct Comparative Architecture:</span><br>
              <strong>(1) Comparative Claim:</strong> State explicit similarity or difference in opening sentence.<br>
              <strong>(2) Era 1 Specific Evidence:</strong> Name 2+ concrete historical details from the first specified period.<br>
              <strong>(3) Mirror Era 2 Evidence:</strong> Deploy comparative connective (<em>"Similarly" / "In contrast"</em>) with exact facts.<br>
              <strong>(4) Causal Synthesis:</strong> Explain <em>why</em> this continuity or change existed historically.</div>
              <div class="formula-step" style="background: #f1f5f9; padding: 3px 5px; border-radius: 1px; margin-top: 2.5px;">
                <span class="step-bold" style="color: #991b1b;">Examiner Level 2 Trap:</span> Never write two separate standalone paragraphs! Writing about Era 1 then Era 2 without integrated within-sentence comparison permanently caps your answer at Level 1 (max 2/4m).
              </div>
              <div style="margin-top: 3px; background: #ffffff; border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 1px; font-size: 6.0pt; line-height: 1.18;">
                <strong style="color: #0f172a;">Edexcel Rubric:</strong> Level 1 (1–2m): General description without direct links &bull; Level 2 (3–4m): Direct comparative analysis with accurate knowledge from both periods.
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
              <div style="background: #f8fafc; border: 1.1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 6px 7px; border-radius: 1px;">
                <span class="step-bold" style="color: #0f172a; font-size: 6.9pt; display: block; margin-bottom: 2px;">Model A: Similarity (4/4m Level 2)</span>
                <p style="font-family: 'Georgia', serif; font-size: 6.2pt; line-height: 1.20; margin: 1px 0; font-style: italic; color: #1e293b;">
                  "One significant similarity between ideas about disease causes during the 1348 Black Death and the 1665 Great Plague was the persistent belief in miasma. In 1348, people carried sweet posies and pomanders to neutralise foul air corrupted by swamps and unburied filth. Similarly, in 1665, citizens burned sweet pine resin, smoked tobacco pipes, and carried camphor to ward off poisonous vapours. This similarity endured across three centuries because microscopic bacteria remained undiscovered before Pasteur's 1861 Germ Theory, leaving doctors reliant on ancient humoural assumptions."
                </p>
                <div style="margin-top: 3px; font-size: 5.9pt; color: #166534; font-weight: 700; background: #f0fdf4; padding: 2px 4px; border: 1px solid #bbf7d0; border-radius: 1px;">
                  &check; <strong>Examiner Annotation:</strong> Specific named evidence (posies vs tobacco) integrated within sentences + causal reason explaining continuity.
                </div>
              </div>
              <div style="background: #f8fafc; border: 1.1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 6px 7px; border-radius: 1px;">
                <span class="step-bold" style="color: #0f172a; font-size: 6.9pt; display: block; margin-bottom: 2px;">Model B: Difference (4/4m Level 2)</span>
                <p style="font-family: 'Georgia', serif; font-size: 6.2pt; line-height: 1.20; margin: 1px 0; font-style: italic; color: #1e293b;">
                  "One fundamental difference in hospital care between the Medieval era and the 19th century was their clinical purpose. Medieval monastic hospitals (such as St Bartholomew's) operated on 'Care Not Cure', providing spiritual prayer, palliative shelter, and warmth rather than medical treatment. In sharp contrast, 19th-century hospitals following Florence Nightingale's pavilion plan focused on clinical sanitation, separate infectious wards, aseptic ventilation, and antiseptic surgery to actively cure illness and reduce mortality from 42% to 2%."
                </p>
                <div style="margin-top: 3px; font-size: 5.9pt; color: #166534; font-weight: 700; background: #f0fdf4; padding: 2px 4px; border: 1px solid #bbf7d0; border-radius: 1px;">
                  &check; <strong>Examiner Annotation:</strong> Religious palliative purpose contrasted with clinical curative science + specific mortality statistics (42% &rarr; 2%).
                </div>
              </div>
            </div>
          </div>
          <!-- Frequent Edexcel Comparative Pairings -->
          <div style="margin-top: 4px; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 6px; border-radius: 1px; font-size: 6.2pt; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong style="color: #0f172a;">Frequent Similarity Prompts:</strong> 1348 vs 1665 Plague causes (miasma) &bull; Medieval vs Renaissance treatment continuities (bleeding, herbal theriac, Galenic herbalism).</div>
            <div><strong style="color: #0f172a;">Frequent Difference Prompts:</strong> Medieval vs 19th C. hospital purpose ('Care Not Cure' vs clinical cure) &bull; 1348 vs 1848 public health (spiritual prayer vs sanitary engineering).</div>
          </div>
        </div>

        <!-- Q4: Causal Analysis / Explain Why [12 Marks &bull; 18 Mins] -->
        <div class="exam-section-card">
          <div class="exam-section-title">
            <span>Question 4: Causal Analysis / Explain Why [12 Marks &bull; ~18 Mins]</span>
            <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Three Full PEEL Paragraphs &bull; Mandatory 3rd Factor Required for Level 4</span>
          </div>
          <div class="q4-grid">
            <div class="peel-box" style="padding: 13px 8.5px;">
              <span class="step-bold" style="color: #0f172a; font-size: 7.2pt; display: block; margin-bottom: 2px;">PEEL 1: Stimulus Factor 1 Blueprint</span>
              <p style="margin: 1.5px 0; font-size: 6.5pt; line-height: 1.24;"><strong>Point Stem:</strong> "Firstly, [Factor 1] acted as a decisive primary catalyst in explaining why [event] occurred because..."<br>
              <strong>Factual Evidence:</strong> Deploy 2+ precise anchors: named individuals, exact dates (e.g. 1861 Germ Theory, 1875 Act), or scientific trials.<br>
              <strong>Causal Mechanism:</strong> Explain step-by-step explicitly <em>how</em> this factor overcame previous medical barriers or forced reform.<br>
              <strong>Evaluative Link:</strong> "Therefore, [Factor 1] was essential in initiating the institutional transformation of..."</p>
              <div style="margin-top: 3px; font-size: 6.0pt; color: #1e293b; background: #ffffff; border: 1px solid #cbd5e1; padding: 2px 4px; border-radius: 1px;">
                <em>e.g., "Pasteur's 1861 Germ Theory acted as a primary catalyst because it scientifically proved that airborne microbes caused disease..."</em>
              </div>
            </div>
            <div class="peel-box" style="padding: 13px 8.5px;">
              <span class="step-bold" style="color: #0f172a; font-size: 7.2pt; display: block; margin-bottom: 2px;">PEEL 2: Stimulus Factor 2 Blueprint</span>
              <p style="margin: 1.5px 0; font-size: 6.5pt; line-height: 1.24;"><strong>Point Stem:</strong> "Furthermore, [Factor 2] significantly accelerated and embedded this development by..."<br>
              <strong>Factual Evidence:</strong> Deploy statutory legislation, royal charters, industrial technology, or clinical mortality statistics.<br>
              <strong>Causal Mechanism:</strong> Demonstrate how this factor sustained, expanded, or reinforced the earlier breakthrough across the population.<br>
              <strong>Evaluative Link:</strong> "Consequently, without [Factor 2], progress would have remained restricted to localized pockets."</p>
              <div style="margin-top: 3px; font-size: 6.0pt; color: #1e293b; background: #ffffff; border: 1px solid #cbd5e1; padding: 2px 4px; border-radius: 1px;">
                <em>e.g., "The 1875 Public Health Act accelerated progress because it legally compelled local authorities to appoint medical officers..."</em>
              </div>
            </div>
            <div class="peel-box" style="border-top-color: #dc2626; background: #fffaf0; padding: 13px 8.5px;">
              <span class="step-bold" style="color: #991b1b; font-size: 7.2pt; display: block; margin-bottom: 2px;">PEEL 3: Mandatory 3rd Factor (Level 4 Hurdle)</span>
              <p style="margin: 1.5px 0; font-size: 6.5pt; line-height: 1.24;"><strong>Level 4 Rule:</strong> You MUST introduce an unprompted 3rd factor from own knowledge (War, Technology, Government, Individuals, Religion).<br>
              <strong>Critical Warning:</strong> Using ONLY the two stimulus points permanently caps your mark at Level 3 (max 8/12)!<br>
              <strong>Point Stem:</strong> "Crucially, neither stimulus factor could have succeeded without the independent catalyst of [Factor 3]..."<br>
              <strong>Causal Prerequisite:</strong> Show why this factor provided the essential infrastructure or funding for change.</p>
              <div style="margin-top: 3px; font-size: 6.0pt; color: #991b1b; background: #ffffff; border: 1px solid #fca5a5; padding: 2px 4px; border-radius: 1px;">
                <em>e.g., "Crucially, neither factor could succeed without Bazalgette's £3m industrial engineering and Parliament's 1867 Reform Act..."</em>
              </div>
            </div>
          </div>
          <div style="margin-top: 4px; background: #f1f5f9; padding: 4px 8px; border-radius: 1px; font-size: 6.6pt; display: flex; justify-content: space-between; align-items: center;">
            <span class="step-bold" style="color: #0f172a;">Examiner Causal Connective Bank:</span>
            <span><em>"This acted as the primary catalyst because..." &bull; "Consequently, this was an indispensable prerequisite, without which..." &bull; "This necessitated the statutory adoption of..." &bull; "This created the technological infrastructure required to..."</em></span>
          </div>
          <!-- Level 4 Causal Progression & Selection Blueprint -->
          <div style="margin-top: 4px; background: #ffffff; border: 1px solid #cbd5e1; padding: 3.5px 7px; border-radius: 1px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 6.2pt; line-height: 1.18;">
            <div><strong style="color: #0f172a;">Level 4 Causal Progression:</strong> Show momentum across paragraphs &bull; Para 1 initiates breakthrough &bull; Para 2 accelerates adoption &bull; Para 3 provides legal/industrial backbone.</div>
            <div><strong style="color: #0f172a;">Factor Selection Strategy:</strong> If stimulus gives Science and Individual, choose Government or War as your 3rd factor for maximum analytical contrast.</div>
          </div>
        </div>

        <!-- Q5 / Q6: 16-Mark Synoptic Essay [+4 SPaG &bull; 25 Mins] -->
        <div class="exam-section-card">
          <div class="exam-section-title">
            <span>Question 5 / 6: 16-Mark Evaluative Synoptic Essay [+4 SPaG &bull; ~25 Mins]</span>
            <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Full 5-Part Essay Architecture &bull; Sustained Judgment Criteria Required</span>
          </div>
          <div class="essay-grid">
            <div style="font-size: 6.7pt; line-height: 1.28;">
              <div class="formula-step" style="margin-bottom: 3px;"><span class="step-bold">1. Introduction (Define &amp; Set Criteria):</span> Define the core concept in prompt (e.g. 'turning point'); establish explicit historical criteria (e.g. theoretical discovery vs mass clinical lives saved; voluntary charity vs state statutory compulsion); declare a decisive thesis immediately.</div>
              <div class="formula-step" style="margin-bottom: 3px;"><span class="step-bold">2. Named Stimulus Factor (2 Paragraphs):</span> Full chronological evaluation across the 750-year range; deploy 2+ concrete dates and named figures; evaluate transformative impact; critically weigh limitations (e.g. delay in clinical adoption, clerical opposition, lack of cures).</div>
              <div class="formula-step" style="margin-bottom: 3px;"><span class="step-bold">3. Alternative Factor 1 (Rival Assessment):</span> Evaluate a rival factor (Government, Science &amp; Tech, War, Individuals) against your criteria; explain how it directly resolved the shortcomings of the named factor.</div>
              <div class="formula-step" style="margin-bottom: 3px;"><span class="step-bold">4. Alternative Factor 2 &amp; Symbiotic Synergy:</span> Evaluate a 3rd factor; explicitly demonstrate factor interdependence (e.g. Science discovered microbes, but Government funding and compulsion made clean water universal).</div>
              <div class="formula-step"><span class="step-bold">5. Sustained Evaluative Conclusion:</span> Re-test introductory criteria; weigh short-term catalysts against long-term prerequisites; deliver an unequivocal, justified final verdict avoiding fence-sitting.</div>
            </div>
            <div>
              <div class="model-conclusion-box" style="padding: 8px 9px; font-size: 6.6pt; line-height: 1.25;">
                <span class="step-bold" style="font-family: 'Inter', sans-serif; display: block; margin-bottom: 2px; color: #0f172a; font-size: 7.1pt;">Level 4 Model Conclusion Formula:</span>
                "In conclusion, while [Named Factor] was undeniably revolutionary in providing [theoretical/scientific breakthrough], it was only a partial turning point because [evidence of delay, opposition, or lack of cures]. Ultimately, the decisive driver across the period was [Alternative Factor], because without [statutory state mandates / industrial technology / military funding], [Named Factor] remained clinically dormant. Therefore, [Alternative Factor] represents the primary catalyst for genuine progress, while [Named Factor] acted as an essential supporting prerequisite."
              </div>
              <div style="margin-top: 4px; background: #ffffff; border: 1px solid #94a3b8; padding: 5px 7px; border-radius: 1px; font-size: 6.3pt; line-height: 1.22; font-family: 'Inter', sans-serif;">
                <strong style="color: #0f172a; display: block; margin-bottom: 2px;">Level 4 Evaluative Framework (Choose One to Structure Your Judgment):</strong>
                &bull; <strong>Catalyst vs Prerequisite:</strong> Did the factor spark initial discovery, or provide the necessary legal/industrial machinery?<br>
                &bull; <strong>Theory vs Practice:</strong> Did the idea cure patients immediately, or did it require decades of tech development?<br>
                &bull; <strong>Voluntary vs Statutory:</strong> Did private charity suffice, or was government compulsion required?
              </div>
              <div style="margin-top: 4px; background: #f8fafc; border: 1.1px solid #cbd5e1; padding: 4.5px 7px; border-radius: 1px; font-size: 6.4pt; font-family: 'Inter', sans-serif;">
                <strong style="color: #0f172a;">SPaG Bank (+4 Marks):</strong> <em>phlebotomy, miasma, teleology, iatrochemistry, inoculation, anaesthetic, antiseptic, aseptic, Salvarsan, penicillin, palliative, regimen sanitatis, spontaneous generation, nosology</em>
              </div>
            </div>
          </div>
          <!-- Level 4 Essay Examination Architecture Strategy -->
          <div style="margin-top: 4px; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 6px; border-radius: 1px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.1pt; line-height: 1.18;">
            <div><strong style="color: #0f172a;">Rigid Essay Timing:</strong> Planning &amp; Criteria (3m) &bull; Named Factor (9m) &bull; Alternative Factors (9m) &bull; Sustained Synthesis &amp; Verdict (4m).</div>
            <div><strong style="color: #0f172a;">Decisive Catalyst Rule:</strong> Never conclude both were equal. Explicitly distinguish the <em>primary catalyst</em> from the <em>enabling prerequisite</em>.</div>
            <div><strong style="color: #0f172a;">Factor Interdependence:</strong> Level 4 essays show how Science, Government, War, and Technology acted symbiotically across 750 years.</div>
          </div>
        </div>

        <!-- Examiner Top 10 Commandments -->
        <div class="exam-section-card">
          <div class="exam-section-title">
            <span>Examiner Top 10 Commandments in Section B &bull; How to Secure Grade 8/9</span>
            <span style="font-size: 6.2pt; color: #cbd5e1; font-weight: 700;">Avoid Historic Traps &bull; Secure Full SPaG</span>
          </div>
          <div class="pitfalls-grid" style="gap: 4.5px;">
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Storytelling Narrative</span><span style="color:#0f172a; font-weight:800;">&check; Causal Analysis:</span> Explain WHY things happened using analytical connectives. Never just describe what happened chronologically.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Omitting Q4 3rd Factor</span><span style="color:#0f172a; font-weight:800;">&check; Mandatory 3rd Factor:</span> Introduce War, Tech, or Govt from own knowledge to break the 8/12 mark ceiling.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Confusing Jenner &amp; Pasteur</span><span style="color:#0f172a; font-weight:800;">&check; Accurate Anchors:</span> Jenner (1796) used empirical cowpox without knowing why; Pasteur (1861) proved microbes cause disease.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Confusing Antiseptic/Aseptic</span><span style="color:#0f172a; font-weight:800;">&check; Precise Terms:</span> Antiseptic kills germs in wound (carbolic spray); Aseptic excludes all germs from the operating theatre.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Vague Chronology</span><span style="color:#0f172a; font-weight:800;">&check; Exact Dates:</span> Anchor essays to 1348, 1543, 1628, 1861, 1875, 1948, 1953. Never use vague terms like "in the old days".</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Fence-Sitting Conclusion</span><span style="color:#0f172a; font-weight:800;">&check; Decisive Judgment:</span> Never say "both equal"; weigh relative catalyst significance (catalyst vs prerequisite).</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Forgetting SPaG Marks</span><span style="color:#0f172a; font-weight:800;">&check; Proofread Spellings:</span> Check key terms (phlebotomy, miasma, anaesthetic, penicillin) in final 3 mins for +4 marks.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Exam Timing Drift</span><span style="color:#0f172a; font-weight:800;">&check; Rigid Timings:</span> Q3 (5m), Q4 (18m), Q5/6 (25m), Section A Western Front (32m). Stick to strict clock stops.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Separate Q3 Eras</span><span style="color:#0f172a; font-weight:800;">&check; Integrated Links:</span> Compare within every sentence using <em>"Similarly"</em> or <em>"In contrast"</em> to guarantee Level 2.</div>
            <div class="pitfall-item" style="padding: 13.5px 7.5px; font-size: 6.6pt; line-height: 1.28;"><span class="pitfall-tag">&cross; Isolated Factors</span><span style="color:#0f172a; font-weight:800;">&check; Symbiotic Links:</span> Show how Science, Tech, and Govt depended on each other (e.g. science proved, govt mandated).</div>
          </div>
          <!-- Master Grade 8/9 Examination Synthesis Principles -->
          <div style="margin-top: 4px; background: #ffffff; border: 1.1px solid #0f172a; padding: 3.5px 8px; border-radius: 1px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 6.2pt; line-height: 1.20;">
            <div><strong style="color: #0f172a;">Grade 8/9 Golden Rule:</strong> Always substantiate every causal claim with at least TWO precise historical facts (dates, named figures, royal charters, or acts) to demonstrate comprehensive grasp across 750 years.</div>
            <div><strong style="color: #0f172a;">Thematic Synthesis Checklist:</strong> Before writing, identify whether the enquiry demands <em>causes</em> (miasma/germs/genetics), <em>prevention</em> (regimen/quarantine/vaccines/welfare state), or <em>treatment</em> (monastic/Nightingale/NHS).</div>
          </div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip">${APPROVED_FOOTERS[27]}</span>
        <span class="footer-page-num">Page 28 of 28</span>
      </div>
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION SCRIPT (PUPPETEER)
// --------------------------------------------------------------------------
async function main() {
  console.log('🚀 Starting Medicine Thematic Study 28-Page Quiz Booklet Compilation...');

  const html = buildHtml();
  const tempHtmlPath = path.join(ROOT_DIR, 'public', 'pdfs', 'temp_medicine_thematic_booklet.html');
  fs.writeFileSync(tempHtmlPath, html, 'utf8');
  console.log('✅ Generated HTML markup:', (html.length / 1024).toFixed(1), 'KB');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 2 });
  await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Evaluate page heights & overflow checks
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = [];
    pages.forEach((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      results.push({
        page: idx + 1,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: overflow > 0 ? overflow : 0,
      });
    });
    return results;
  });

  console.log('\n📊 Page Container Layout & Overflow Audit:');
  let hasOverflow = false;
  auditResults.forEach((r) => {
    const status = r.overflow === 0 ? '✅ 0px' : `⚠️ OVERFLOW: ${r.overflow}px`;
    if (r.overflow > 0) hasOverflow = true;
    console.log(
      `Page ${r.page.toString().padStart(2, ' ')}: scroll=${r.scrollHeight}px, client=${r.clientHeight}px -> ${status}`,
    );
  });

  if (hasOverflow) {
    console.error('❌ Critical layout error: Page overflow detected!');
  } else {
    console.log('🎉 100% SUCCESS: All 28 pages strictly budget within 1081px with 0px overflow!');
  }

  const outputPdfPath = path.join(
    PDFS_DIR,
    'Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
  );

  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: {
      top: '6mm',
      right: '8mm',
      bottom: '5mm',
      left: '8mm',
    },
    displayHeaderFooter: false,
  });

  console.log(`\n💾 Saved Master PDF: ${outputPdfPath}`);
  const pdfStats = fs.statSync(outputPdfPath);
  console.log(`📁 PDF File Size: ${(pdfStats.size / 1024 / 1024).toFixed(2)} MB`);

  // Mirror to Google Drive Department File if available
  const drivePaper1Dir = path.join(DRIVE_BASE, 'Year 11 (GCSE)', 'Paper 1 - Medicine Through Time');

  if (fs.existsSync(drivePaper1Dir)) {
    const driveDest = path.join(
      drivePaper1Dir,
      'Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
    );
    fs.copyFileSync(outputPdfPath, driveDest);
    console.log(`☁️ Synced to Google Drive Department File: ${driveDest}`);
  } else {
    console.log(
      `ℹ️ Google Drive destination folder not found at ${drivePaper1Dir}, skipping cloud mirror.`,
    );
  }

  await browser.close();

  // Clean up temp html file
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  console.log('\n✨ Medicine Thematic Master Knowledge Retrieval Companion Compilation Complete!');
}

module.exports = { buildHtml };

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during compilation:', err);
    process.exit(1);
  });
}
