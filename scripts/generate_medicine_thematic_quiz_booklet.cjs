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
      padding: 5px 10px;
      background: #ffffff;
      border-radius: 2px;
      margin-bottom: 3px;
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
      font-size: 7.5pt;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cover-dept-name {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 14.5pt;
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
      padding: 4px 10px;
      border-radius: 2px;
      display: grid;
      grid-template-columns: 1.6fr 1fr 1.2fr;
      gap: 12px;
      align-items: flex-end;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 700;
    }
    .pupil-field {
      display: flex;
      align-items: flex-end;
      gap: 6px;
    }
    .pupil-field-lbl {
      color: #0f172a;
      white-space: nowrap;
      font-weight: 800;
    }
    .pupil-line {
      flex: 1;
      border-bottom: 1.4px solid #000000;
      height: 6.2mm;
    }

    /* SPECIFICATION & EXAM OVERVIEW STRIP */
    .spec-overview-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      margin-bottom: 3px;
      overflow: hidden;
    }
    .spec-overview-title-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 8px;
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
      gap: 5px;
      padding: 4px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.2;
      background: #ffffff;
    }
    .spec-era-col {
      border-left: 2px solid #0f172a;
      padding-left: 4px;
    }
    .spec-era-lbl {
      font-weight: 900;
      color: #0f172a;
      display: block;
      font-size: 6.9pt;
      margin-bottom: 1px;
    }
    .exam-structure-strip {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1.5fr;
      gap: 5px;
      background: #f1f5f9;
      border-top: 1px solid #cbd5e1;
      padding: 3px 6px;
      font-family: 'Inter', sans-serif;
    }
    .exam-q-cell {
      border-left: 2px solid #0f172a;
      padding-left: 4px;
      line-height: 1.15;
    }
    .eq-num { font-size: 7.0pt; font-weight: 900; color: #0f172a; display: block; }
    .eq-type { font-size: 6.8pt; font-weight: 800; color: #334155; display: block; }
    .eq-meta { font-size: 6.4pt; color: #475569; display: block; }

    /* 20-LESSON TRACKER (2 COLUMNS OF 10) */
    .tracker-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      margin-bottom: 3px;
    }
    .tracker-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
    }
    .tracker-table th, .tracker-table td {
      border: 1.1px solid #0f172a;
      padding: 3.0px 4px;
    }
    .tracker-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      text-align: left;
      font-size: 6.8pt;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .tracker-table tr:nth-child(even) { background: #f8fafc; }
    .col-score { width: 32px; text-align: center; }
    .col-tick { width: 28px; text-align: center; }

    /* DIRT RETRIEVAL PROTOCOL */
    .protocol-card {
      border: 1.2px solid #0f172a;
      border-left: 4px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 3px 6px;
      margin-bottom: 3px;
    }
    .protocol-title-row {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
    }
    .protocol-grid-4col {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.18;
    }
    .step-item {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 2.5px 4px;
      border-radius: 1px;
    }
    .step-item strong { color: #0f172a; display: block; font-size: 6.8pt; }

    .traffic-tier-box {
      border: 1.2px solid #0f172a;
      background: #f1f5f9;
      border-radius: 2px;
      padding: 3px 6px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .glossary-box {
      border: 1.2px solid #0f172a;
      background: #ffffff;
      border-radius: 2px;
      margin-bottom: 3px;
      overflow: hidden;
    }
    .glossary-title {
      background: #0f172a;
      color: #ffffff;
      padding: 2px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 8px;
      padding: 3px 6px;
      font-size: 6.7pt;
      line-height: 1.16;
    }
    .glossary-item { font-family: 'Georgia', serif; color: #1e293b; }
    .glossary-term { font-family: 'Inter', sans-serif; font-weight: 800; color: #0f172a; }

    .guarantee-box {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 3px 6px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .guarantee-qr {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
    .guarantee-text {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.15;
      color: #1e293b;
    }
    .guarantee-badge {
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      display: block;
      margin-bottom: 1px;
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

    /* Page 27: 6-Factor Analytical Matrix */
    .p27-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 4px;
      margin-top: 2px;
    }
    .factor-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      flex: 1;
    }
    .factor-table th, .factor-table td {
      border: 1.1px solid #0f172a;
      padding: 3.5px 5px;
      vertical-align: top;
      line-height: 1.18;
    }
    .factor-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 7.2pt;
      text-align: center;
    }
    .factor-lbl {
      background: #f1f5f9;
      font-weight: 900;
      color: #0f172a;
      width: 14%;
      text-transform: uppercase;
      font-size: 7.1pt;
    }
    .factor-col { width: 21.5%; }

    /* Page 28: Section B Examination Strategy */
    .p28-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 4px;
      margin-top: 2px;
    }
    .exam-section-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 8px;
    }
    .exam-section-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 2px 6px;
      border-radius: 1px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
      display: inline-block;
    }
    .q3-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      line-height: 1.2;
    }
    .formula-step {
      border-left: 2.5px solid #0f172a;
      padding-left: 4px;
      margin-bottom: 2px;
    }
    .step-bold { font-weight: 800; color: #0f172a; }

    .q4-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.2;
    }
    .peel-box {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 3px 5px;
      border-radius: 2px;
    }

    .q56-essay-box {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 4px 7px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      line-height: 1.22;
    }
    .essay-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 8px;
      align-items: start;
    }
    .model-conclusion-box {
      border: 1px solid #94a3b8;
      background: #ffffff;
      padding: 4px 6px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 6.8pt;
      line-height: 1.18;
      font-style: italic;
      color: #1e293b;
    }

    .pitfalls-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.16;
    }
    .pitfall-item {
      border: 1px solid #cbd5e1;
      background: #f1f5f9;
      padding: 2.5px 4px;
      border-radius: 2px;
    }
    .pitfall-tag { font-weight: 800; color: #991b1b; display: block; }
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
          <span class="pupil-field-lbl">Target Grade:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Teaching Group:</span>
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
      <div style="border: 1.1px solid #0f172a; background: #ffffff; padding: 3px 6px; border-radius: 2px; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2;">
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
              <th class="col-score">1st</th>
              <th class="col-score">2nd</th>
              <th class="col-score">30D</th>
              <th class="col-tick">DIRT</th>
            </tr>
          </thead>
          <tbody>
            ${MEDICINE_THEMATIC_QUIZ_BANK.slice(0, 10)
              .map(
                (l) => `
              <tr>
                <td><strong>L${l.num}:</strong> ${l.title.replace('Ideas on Causes: ', '').replace('Approaches to ', '').replace('Case Study: ', '').replace('Case Study 1: ', '').replace('Case Study 2: ', '')}</td>
                <td class="col-score">/10</td>
                <td class="col-score">/10</td>
                <td class="col-score">/10</td>
                <td class="col-tick">[ &nbsp; ]</td>
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
              <th class="col-score">1st</th>
              <th class="col-score">2nd</th>
              <th class="col-score">30D</th>
              <th class="col-tick">DIRT</th>
            </tr>
          </thead>
          <tbody>
            ${MEDICINE_THEMATIC_QUIZ_BANK.slice(10, 20)
              .map(
                (l) => `
              <tr>
                <td><strong>L${l.num}:</strong> ${l.title.replace('Ideas on Causes: ', '').replace('Approaches to ', '').replace('Case Study: ', '').replace('Case Study 1: ', '').replace('Case Study 2: ', '')}</td>
                <td class="col-score">/10</td>
                <td class="col-score">/10</td>
                <td class="col-score">/10</td>
                <td class="col-tick">[ &nbsp; ]</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
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
                &bull; <strong>Battlefield Surgery:</strong> Arrow extractions, amputation &amp; cauterisation with hot irons.<br>
                &bull; <strong>John of Arderne:</strong> Developed 50% survival fistula-in-ano surgery for Hundred Years War knights.<br>
                &bull; <strong>Surgical Experience:</strong> Battlefield wounds forced empirical wound dressing over university theory.
              </td>
              <td>
                &bull; <strong>Ambroise Paré:</strong> Ran out of boiling oil in 1537; improvised egg-yolk/turpentine balm; used ligatures.<br>
                &bull; <strong>Gunpowder Trauma:</strong> Artillery &amp; muskets created shattered bones and deep contaminated flesh wounds.<br>
                &bull; <strong>Military Hospitals:</strong> Emergence of naval and regimental field dressings during European religious wars.
              </td>
              <td>
                &bull; <strong>Crimean War (1854):</strong> Nightingale &amp; Seacole reform Scutari hospital; mortality drops from 42% to 2%.<br>
                &bull; <strong>Franco-Prussian War (1870):</strong> National rivalry drove massive French and German state funding for Pasteur &amp; Koch.<br>
                &bull; <strong>American Civil War:</strong> Accelerated large-scale surgical anesthesia (ether and chloroform).
              </td>
              <td>
                &bull; <strong>First World War:</strong> Thomas splint (80% &rarr; 20% femur deaths), mobile X-rays, Robertson blood depot (1917), Gillies plastic surgery.<br>
                &bull; <strong>Second World War:</strong> US War Production Board funded industrial deep-fermentation vats for 2.3m penicillin doses.<br>
                &bull; <strong>Trauma Innovation:</strong> Burn treatments (McIndoe Guinea Pig Club) and emergency civilian blood donation services.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">2. Religion &amp; Superstition</td>
              <td>
                &bull; <strong>Papal Scriptoria Monopoly:</strong> Church controlled book copying and university curriculum; dissenting views burned.<br>
                &bull; <strong>Galenic Teleology:</strong> Galen’s design argument matched Genesis; questioning Galen was branded heresy.<br>
                &bull; <strong>Divine Retribution:</strong> Sickness sent as punishment for sin; flagellants, pilgrimages, and royal touch for scrofula.
              </td>
              <td>
                &bull; <strong>Reformation Weakening:</strong> Henry VIII dissolved 500 monastic hospitals; secular charity boards took over.<br>
                &bull; <strong>Empirical Rejection:</strong> Royal Society motto <em>Nullius in Verba</em> (1660) rejected religious dogma.<br>
                &bull; <strong>Lingering Superstition:</strong> Astrological comets blamed for 1665 Great Plague; touch of the King continued.
              </td>
              <td>
                &bull; <strong>Clerical Opposition:</strong> Churchmen initially opposed Simpson’s chloroform, citing Genesis childbearing pain.<br>
                &bull; <strong>Anti-Vaccination League:</strong> Religious objections to injecting animal cowpox matter into human children (1867).<br>
                &bull; <strong>Social Christian Reform:</strong> Christian philanthropic movements funded voluntary hospitals and sanitary temperance.
              </td>
              <td>
                &bull; <strong>Bioethical Scrutiny:</strong> Faith-based ethical debates over embryonic stem-cell research, human cloning, and IVF.<br>
                &bull; <strong>End-of-Life Debates:</strong> Modern moral debates over voluntary euthanasia and palliative hospice movements (Cicely Saunders).<br>
                &bull; <strong>Diminished Causal Role:</strong> Religion ceased to act as an explanation for disease causation or pathology.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">3. Science &amp; Technology</td>
              <td>
                &bull; <strong>Primitive Tools:</strong> Urine wheels, astrolabes, Zodiac Man charts; cautery irons and fleams.<br>
                &bull; <strong>Absence of Optics:</strong> No microscopes; doctors could not observe bacteria, capillaries, or cellular structures.<br>
                &bull; <strong>Manuscript Drift:</strong> Hand-copied texts suffered compounding translation and anatomical errors over centuries.
              </td>
              <td>
                &bull; <strong>Printing Press (1440):</strong> Gutenberg movable metal type enabled mass distribution of Vesalius’s <em>De Fabrica</em>.<br>
                &bull; <strong>Mechanical Models:</strong> Water pump engineering inspired Harvey to mathematically calculate blood circulation.<br>
                &bull; <strong>Early Microscopes:</strong> Robert Hooke published <em>Micrographia</em> (1665); Leeuwenhoek observed animalcules.
              </td>
              <td>
                &bull; <strong>Swan-Neck Flasks:</strong> Pasteur used bent glass necks to trap airborne dust, disproving spontaneous generation.<br>
                &bull; <strong>Koch’s Bacteriology:</strong> Solid agar jelly, industrial aniline chemical dyes, and microphotography isolated TB and cholera.<br>
                &bull; <strong>Chemical Anesthesia:</strong> Chloroform vapors (Simpson) and carbolic acid spray machines (Lister donkey engine).
              </td>
              <td>
                &bull; <strong>Diagnostic Imaging:</strong> Röntgen’s X-rays (1895), Hounsfield’s CT scanner (1972), MRI scanners, and endoscopes.<br>
                &bull; <strong>Molecular Genomics:</strong> Franklin’s Photograph 51, Watson &amp; Crick double helix (1953), Human Genome Project (2003).<br>
                &bull; <strong>Targeted Pharmacology:</strong> Chemical synthesis (Salvarsan 606), deep-fermentation vats, robotic da Vinci surgery.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">4. Government Intervention</td>
              <td>
                &bull; <strong>Strict Laissez-Faire:</strong> No central public health policy; King Edward III wrote letters urging London street cleaning.<br>
                &bull; <strong>Local Cordons:</strong> Gloucester attempted 1348 quarantine; London dug mass plague burial pits at East Smithfield.<br>
                &bull; <strong>Tainted Food Fines:</strong> Butcher guilds fined for dumping offal into the Thames and Fleet ditch.
              </td>
              <td>
                &bull; <strong>1665 Plague Orders:</strong> City of London mandated Searchers of the Dead, watchmen, red crosses, and night burials.<br>
                &bull; <strong>Bills of Mortality:</strong> Parish Clerks tracked epidemic deaths weekly, providing early epidemiological statistics.<br>
                &bull; <strong>Royal Charters:</strong> Henry VIII chartered Royal College of Physicians (1518); Charles II chartered Royal Society (1662).
              </td>
              <td>
                &bull; <strong>Permissive to Compulsory:</strong> 1848 optional Act &rarr; 1853 compulsory smallpox vaccination &rarr; 1875 Public Health Act.<br>
                &bull; <strong>Sanitary Infrastructure:</strong> Parliament funded Bazalgette’s £3m London sewer network after the 1858 Great Stink.<br>
                &bull; <strong>Working-Class Vote:</strong> 1867 Reform Act enfranchised urban workers, forcing MPs to legislate clean water and housing.
              </td>
              <td>
                &bull; <strong>National Health Service:</strong> Aneurin Bevan launched the NHS on 5 July 1948, nationalising 2,688 hospitals.<br>
                &bull; <strong>Preventive Legislation:</strong> Clean Air Acts (1956), TV tobacco ad bans (1965), graphic packet warnings (2008).<br>
                &bull; <strong>Public Workplace Smoking Ban:</strong> 2007 Health Act banned smoking in enclosed work and social venues across England.
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">5. Key Individuals</td>
              <td>
                &bull; <strong>Hippocrates:</strong> Four Humours, clinical bedside observation, and the Hippocratic Oath.<br>
                &bull; <strong>Claudius Galen:</strong> Theory of Opposites, teleological creator argument, 300 animal dissection errors.<br>
                &bull; <strong>Guy de Chauliac:</strong> Papal doctor who distinguished bubonic from pneumonic plague and preserved Pope Clement VI.
              </td>
              <td>
                &bull; <strong>Andreas Vesalius:</strong> <em>De Fabrica</em> (1543) disproved 300 Galenic errors through direct human dissection.<br>
                &bull; <strong>William Harvey:</strong> <em>De Motu Cordis</em> (1628) proved systemic one-way blood circulation pumped by the heart.<br>
                &bull; <strong>Thomas Sydenham:</strong> "English Hippocrates" classified illnesses as distinct species using bedside observation.
              </td>
              <td>
                &bull; <strong>Jenner (1796):</strong> Discovered cowpox vaccination on James Phipps, replacing dangerous live variolation.<br>
                &bull; <strong>Pasteur &amp; Koch:</strong> Formulated Germ Theory (1861), disproved spontaneous generation, and isolated specific bacilli.<br>
                &bull; <strong>Simpson, Lister &amp; Snow:</strong> Conquered pain (chloroform), sepsis (carbolic acid), and proved waterborne cholera.
              </td>
              <td>
                &bull; <strong>Paul Ehrlich:</strong> Coined "magic bullet" concept; discovered Salvarsan 606 for syphilis (1909).<br>
                &bull; <strong>Fleming, Florey &amp; Chain:</strong> Discovered (1928), isolated (1940), and scaled penicillin production for WWII.<br>
                &bull; <strong>Watson, Crick &amp; Franklin:</strong> Discovered DNA double helix (1953); Doll &amp; Hill proved smoking causes lung cancer (1950).
              </td>
            </tr>
            <tr>
              <td class="factor-lbl">6. Institutions &amp; Comm.</td>
              <td>
                &bull; <strong>Monastic Network:</strong> Over 500 monastic hospitals (St Bart's, St Thomas') delivered palliative "Care Not Cure".<br>
                &bull; <strong>Guild of Surgeons (1376):</strong> Separated military craft surgeons from barber-surgeons in London.<br>
                &bull; <strong>Universities:</strong> Oxford and Cambridge taught scholastic Latin Galenism; empirical research forbidden.
              </td>
              <td>
                &bull; <strong>Royal College of Physicians (1518):</strong> Controlled London licensing; preserved medical prestige and standards.<br>
                &bull; <strong>The Royal Society (1660):</strong> Provided laboratory forums for experiments without religious censorship.<br>
                &bull; <strong>Philosophical Transactions (1665):</strong> World’s first peer-reviewed scientific journal enabled rapid international sharing.
              </td>
              <td>
                &bull; <strong>British Medical Association (1856):</strong> Professionalised doctors, though often opposed state medicine.<br>
                &bull; <strong>Nightingale Training School (1860):</strong> St Thomas' Hospital school established disciplined nursing standards worldwide.<br>
                &bull; <strong>Voluntary &amp; Cottage Hospitals:</strong> Endowed municipal and rural infirmaries expanded nationwide surgical access.
              </td>
              <td>
                &bull; <strong>The National Health Service (1948):</strong> Universal, free healthcare funded by general taxation.<br>
                &bull; <strong>Medical Research Council (MRC):</strong> State-funded clinical trials (Doll &amp; Hill smoking studies; antibiotic trials).<br>
                &bull; <strong>World Health Organization (WHO):</strong> Coordinated global vaccination drives, eradicating smallpox worldwide by 1980.
              </td>
            </tr>
          </tbody>
        </table>
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
        <!-- Q3: Similarity / Difference [4 Marks] -->
        <div class="exam-section-card">
          <div class="exam-section-title">Question 3: Similarity or Difference across Eras [4 Marks &bull; 5 Mins]</div>
          <div class="q3-grid">
            <div>
              <div class="formula-step"><span class="step-bold">The 4-Step Formula:</span> (1) Direct comparative claim; (2) Detailed Era 1 evidence; (3) Mirror Era 2 evidence; (4) Causal synthesis explaining why.</div>
              <div class="formula-step"><span class="step-bold">Common Exam Prompts:</span> Ideas on causes (1348 vs 1665); Treatments (Medieval vs Renaissance); Hospital care (1700 vs 1900).</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px;">
              <span class="step-bold" style="color: #0f172a; font-size: 6.9pt; display: block;">Level 4 Worked Model Answer (4/4 Marks):</span>
              <p style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; margin: 1px 0; font-style: italic;">
                "One significant similarity between ideas about the cause of disease in the Medieval period and the Renaissance was the enduring belief in miasma. During the Black Death of 1348, people believed foul air corrupted by swamps and corpses caused pestilence, carrying posies to ward off bad air. Similarly, during the Great Plague of 1665, citizens continued to believe miasma caused disease, burning sweet herbs and smoking tobacco pipes to neutralise corrupt vapours. This similarity endured because microscopic pathogens were still unknown before Pasteur published Germ Theory in 1861."
              </p>
            </div>
          </div>
        </div>

        <!-- Q4: Causal Analysis / Explain Why [12 Marks] -->
        <div class="exam-section-card">
          <div class="exam-section-title">Question 4: Causal Analysis / Explain Why [12 Marks &bull; 18 Mins]</div>
          <div class="q4-grid">
            <div class="peel-box">
              <span class="step-bold">Paragraph 1 (Prompt 1):</span>
              <p style="margin: 2px 0;">Point &bull; Evidence &bull; Explanation. Connect directly to the prompt with exact statistics, names, and dates.</p>
            </div>
            <div class="peel-box">
              <span class="step-bold">Paragraph 2 (Prompt 2):</span>
              <p style="margin: 2px 0;">Point &bull; Evidence &bull; Explanation. Show how this second factor catalysed or sustained the development.</p>
            </div>
            <div class="peel-box">
              <span class="step-bold">Paragraph 3 (Mandatory 3rd Factor):</span>
              <p style="margin: 2px 0;"><strong>Mandatory Level 4 Hurdle:</strong> You MUST introduce a 3rd factor from own knowledge (War, Tech, Govt) to score 10–12m.</p>
            </div>
          </div>
          <div style="margin-top: 3px; background: #f1f5f9; padding: 2px 5px; border-radius: 2px; font-size: 6.6pt;">
            <span class="step-bold">Examiner Causal Connective Bank:</span> <em>"This led directly to...", "Consequently, the decisive catalyst was...", "Without this state infrastructure...", "This necessitated the adoption of..."</em>
          </div>
        </div>

        <!-- Q5 / Q6: 16-Mark Synoptic Essay [+4 SPaG] -->
        <div class="exam-section-card">
          <div class="exam-section-title">Question 5 / 6: 16-Mark Evaluative Synoptic Essay [+4 SPaG &bull; 25 Mins]</div>
          <div class="essay-grid">
            <div>
              <div class="formula-step"><span class="step-bold">Introduction:</span> Define key terms and set up explicit criteria for judgment (e.g. short-term vs long-term impact; theoretical discovery vs mass practical lives saved).</div>
              <div class="formula-step"><span class="step-bold">2 Paragraphs for Named Factor:</span> Evaluate the prompt factor across the full specified timeframe with precise chronological anchors.</div>
              <div class="formula-step"><span class="step-bold">2 Paragraphs for Alternative Factors:</span> Counter-balance by evaluating rival factors (e.g. Government intervention vs Individuals).</div>
            </div>
            <div>
              <div class="model-conclusion-box">
                <span class="step-bold" style="font-family: 'Inter', sans-serif; display: block; margin-bottom: 2px; color: #0f172a;">Level 4 Model Conclusion Formula:</span>
                "In conclusion, while [Named Factor] was undeniably revolutionary in providing [theoretical/scientific breakthrough], it was only a partial turning point because [evidence of delay, resistance, or lack of cures]. Ultimately, the decisive driver across the period was [Alternative Factor], because without [statutory state mandates / industrial mass-production], [Named Factor] remained clinically dormant. Therefore, [Alternative Factor] represents the primary catalyst for progress."
              </div>
            </div>
          </div>
        </div>

        <!-- Examiner Top 8 Pitfalls -->
        <div class="exam-section-card">
          <div class="exam-section-title">Examiner Top 8 Pitfalls in Section B &bull; How to Secure Grade 8/9</div>
          <div class="pitfalls-grid">
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Storytelling Narrative:</span> Don't just narrate events; explain WHY they happened using analytical causal linking words.</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Ignoring Q4 Third Factor:</span> If you only use the two given bullet points, your mark is permanently capped at Level 3 (8/12).</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Confusing Jenner &amp; Pasteur:</span> Jenner discovered cowpox vaccine (1796); Pasteur formulated Germ Theory (1861).</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Confusing Antiseptic &amp; Aseptic:</span> Antiseptic kills germs in wounds (carbolic); Aseptic excludes germs from theaters.</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Vague Chronological Anchors:</span> Always quote exact dates (e.g. 1875 Public Health Act, 1948 NHS, 1928 Penicillin).</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; 'Fence-Sitting' Conclusions:</span> Never write "Both were equally important." Weigh their relative significance decisively.</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Forgetting SPaG Marks:</span> Q5/Q6 carries 4 SPaG marks. Proofread spellings of key terms (phlebotomy, miasma).</div>
            <div class="pitfall-item"><span class="pitfall-tag">&cross; Timing Drift:</span> Stick strictly to exam time budgets: Q3 (5m), Q4 (18m), Q5/Q6 (25m), Section A (32m).</div>
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
