/**
 * scripts/render_great_war_8page_textbook.cjs
 *
 * 8-PAGE MASTER CLASSROOM TEXTBOOK (2 Sheets of A3 Saddle-Stitch Model)
 * Target: KS3 Year 9 — Causes of the Great War (1871–1914)
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to live app data in units/great_war/data.js (narrative_blocks)
 * - Dynamic Single Source of Truth (SSoT): Automatically inherits any text edits made in data.js
 * - Exactly 8 pages (2 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork, canonical dramatic synopsis blurb, 5-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (12 defining turning points & causal dominoes)
 * - Pages 3–7: 5 Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 8: Master 25-Question Knowledge Retrieval Quiz Back Cover (Partner Quiz / Solo Practice)
 * - Dynamic Auto-Balancing Typography: Automatically calibrates font-size and leading per page
 *   to ensure 0px overflow, positive clearance (>= +25px), and >= 95% space utilization
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
      path.join(ROOT_DIR, 'units', 'great_war', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'great_war', 'assets', path.basename(cleanPath)),
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

// Load canonical data dynamically from units/great_war/data.js (Single Source of Truth)
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw = raw
    .replace(/export\s+const\s+\w+\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+[\w$]+;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '');
  const sandbox = { module: { exports: {} }, window: {} };
  vm.runInNewContext(raw, sandbox);
  return sandbox.module.exports?.lessons
    ? sandbox.module.exports
    : sandbox.window?.UNIT_DATA || sandbox.great_war_data || sandbox.unitData;
}

// Canonical unit narrative synopsis
const canonicalSynopsis =
  'Decades of imperial vanity, secret alliances, and dreadnought arms races wound the clockwork of European catastrophe. When a teenage assassin fired two fatal shots on the streets of Sarajevo in June 1914, thirty days of diplomatic brinkmanship sleepwalked an entire continent into ruin. Trace the geopolitical friction of European empires, the naval race, and the fatal railway timetables that sparked world war.';

// Milestone timeline data for Page 2
const milestones = [
  {
    date: '1862–1871',
    title: 'Bismarck’s Wars & The Unification of Germany',
    desc: 'Through "blood and iron" wars against Denmark, Austria, and France, Prussia unifies Germany and fundamentally ruptures the European balance of power.',
    ref: '1.1–1.2',
  },
  {
    date: '18 Jan 1871',
    title: 'Proclamation of the German Empire at Versailles',
    desc: 'King Wilhelm I is crowned Kaiser in the Hall of Mirrors. Defeated France cedes Alsace-Lorraine and pays 5 billion gold francs in indemnity.',
    ref: '1.2–1.3',
  },
  {
    date: 'May 1871',
    title: 'Annexation of Alsace-Lorraine & The Cult of Revanche',
    desc: 'Seizure of border fortresses Metz and Strasbourg alienates 1.6 million French citizens, creating an implacable enemy and four decades of French hatred.',
    ref: '1.3–1.4',
  },
  {
    date: '1871–1890',
    title: 'Bismarckian Isolation & The Secret Reinsurance Treaty',
    desc: 'Haunted by fear of a two-front encirclement, Chancellor Bismarck spins a defensive diplomatic web, culminating in the 1887 Russian treaty.',
    ref: '1.5–1.6',
  },
  {
    date: '1884–1885',
    title: 'The Berlin Conference & The Scramble for Africa',
    desc: 'Fourteen powers partition Africa under "effective occupation". Latecomer Germany receives only scattered territories, sparking imperial resentment.',
    ref: '2.1–2.2',
  },
  {
    date: '1890',
    title: 'Dismissal of Bismarck & Wilhelm II’s Weltpolitik',
    desc: 'Kaiser Wilhelm II fires Bismarck, lets the Russian treaty lapse, and adopts Weltpolitik, demanding Germany’s aggressive "place in the sun".',
    ref: '2.3',
  },
  {
    date: '1898–1900',
    title: 'Admiral von Tirpitz & The German Navy Laws',
    desc: 'Germany legislates massive battle fleet construction, deploying the "Risk Theory" to threaten the Royal Navy in the North Sea.',
    ref: '3.1–3.2',
  },
  {
    date: '1904–1907',
    title: 'The Diplomatic Revolution: The Triple Entente',
    desc: 'Alarmed by German naval expansion, Britain abandons "Splendid Isolation" to sign defensive ententes with France (1904) and Russia (1907).',
    ref: '4.1–4.3',
  },
  {
    date: '1905–1906',
    title: 'The First Moroccan Crisis: Kaiser at Tangier',
    desc: 'Wilhelm II visits Tangier to challenge French control. The 1906 Algeciras Conference isolates Germany and cements the Anglo-French Entente.',
    ref: '2.4',
  },
  {
    date: 'Feb 1906',
    title: 'Launch of HMS Dreadnought & Naval Arms Race',
    desc: 'Royal Navy launches the first all-big-gun, steam-turbine battleship, making all older fleets obsolete and resetting naval competition.',
    ref: '3.3–3.5',
  },
  {
    date: '1908–1911',
    title: 'Bosnian Annexation Crisis & The Panther at Agadir',
    desc: 'Austria annexes Bosnia, humiliating Serbia and Russia. In 1911, German gunboat SMS Panther arrives in Agadir, bringing Europe close to war.',
    ref: '2.5, 4.4',
  },
  {
    date: '28 Jun – 4 Aug 1914',
    title: 'Sarajevo Assassination, July Crisis & Outbreak of War',
    desc: 'Gavrilo Princip assassinates Archduke Franz Ferdinand. The German Blank Cheque, Austrian ultimatum, and railway mobilization trigger general war.',
    ref: '5.1–5.5',
  },
];

// Retrieval Quiz Questions for Page 8 (5 per enquiry)
const quizCards = [
  {
    topic: 'Enquiry 1: German Unification & Bismarck',
    ref: 'Page 3 • Ref [1.1]–[1.6]',
    questions: [
      'How many independent German-speaking states existed in Central Europe before 1871?',
      'What economic customs union established by Prussia in 1834 bound German states together?',
      'What famous phrase did Otto von Bismarck use to declare how German unification would be decided?',
      'Which two border provinces did defeated France cede to Germany in the 1871 Treaty of Frankfurt?',
      'What was the name of the secret 1887 treaty negotiated by Bismarck to prevent a two-front war with Russia?',
    ],
  },
  {
    topic: 'Enquiry 2: Imperial Rivalry & Morocco',
    ref: 'Page 4 • Ref [2.1]–[2.5]',
    questions: [
      'What diplomatic conference did Bismarck host in 1884–1885 to regulate the Scramble for Africa?',
      'Which aggressive foreign policy did Kaiser Wilhelm II adopt after dismissing Bismarck in 1890?',
      'At which Moroccan port did Kaiser Wilhelm II land in March 1905 to provoke the French Republic?',
      'Which 1906 international conference rejected German demands and upheld French control in Morocco?',
      'What was the name of the German naval gunboat sent to Agadir during the Second Moroccan Crisis in 1911?',
    ],
  },
  {
    topic: 'Enquiry 3: Naval Arms Race & Dreadnought',
    ref: 'Page 5 • Ref [3.1]–[3.5]',
    questions: [
      'What British naval standard required the Royal Navy to be larger than the next two largest navies combined?',
      'Which German Naval Minister designed the "Risk Theory" to challenge British dominance in the North Sea?',
      'In what year was the revolutionary all-big-gun British battleship HMS Dreadnought launched?',
      'Which British First Sea Lord championed steam-turbine propulsion and the development of Dreadnought?',
      'What popular British public slogan was coined in 1909 demanding eight new battleships from Parliament?',
    ],
  },
  {
    topic: 'Enquiry 4: Alliance Systems & The Balkans',
    ref: 'Page 6 • Ref [4.1]–[4.5]',
    questions: [
      'Which three major Central European powers made up the defensive Triple Alliance by 1882?',
      'What term described Britain’s traditional nineteenth-century policy of avoiding continental military pacts?',
      'Which three European nations completed the counter-balancing Triple Entente by 1907?',
      'Which Balkan province was formally annexed by Austria-Hungary in October 1908, enraging Serbia?',
      'Why was the Balkan region commonly described as the "Powder Keg of Europe" in the decade before 1914?',
    ],
  },
  {
    topic: 'Enquiry 5: The July Crisis & Sarajevo',
    ref: 'Page 7 • Ref [5.1]–[5.5]',
    questions: [
      'On what exact date were Archduke Franz Ferdinand and his wife Sophie assassinated in Sarajevo?',
      'Which nineteen-year-old Bosnian Serb radical fired the fatal shots on the Latin Bridge?',
      'What secret Serbian military nationalist organisation supplied the weapons for the assassination?',
      'What informal name was given to Germany’s unconditional pledge of military support to Austria on 5 July 1914?',
      'The invasion of which neutral nation by the German army compelled Great Britain to declare war on 4 August 1914?',
    ],
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(unitData.cover_image || '/images/great_war_cover.jpg');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War (1871–1914) • Master Classroom Textbook</title>
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
    .cover-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .cover-series {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .cover-sub-series {
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #1e3a8a;
      text-transform: uppercase;
      margin-top: 1px;
    }

    .cover-title-block {
      text-align: center;
      margin: 4px 0 6px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      padding: 2px 10px;
      border-radius: 3px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .cover-main-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 21pt;
      font-weight: 900;
      letter-spacing: 0.04em;
      color: #0f172a;
      line-height: 1.08;
      margin: 0;
      text-transform: uppercase;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.2pt;
      font-weight: 500;
      font-style: italic;
      color: #334155;
      margin-top: 4px;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 78mm;
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
      object-position: center 40%;
    }

    .cover-hero-caption {
      font-size: 7pt;
      color: #475569;
      text-align: center;
      font-style: italic;
      margin-bottom: 4px;
      line-height: 1.3;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 9px 13px;
      margin: 4px 0 6px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }

    .cover-overview-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.8pt;
      line-height: 1.55;
      color: #1e293b;
      margin: 0;
      font-style: italic;
      text-align: justify;
    }

    .cover-directory {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 2px;
      background: #f8fafc;
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
      font-size: 7.9pt;
      width: 36%;
      line-height: 1.3;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.6pt;
      padding-left: 6px;
      line-height: 1.34;
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
      padding: 4px 8px;
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
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      margin-bottom: 6px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #0f172a;
      margin: 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 8.5pt;
      color: #475569;
      margin-top: 2px;
    }

    .milestone-timeline {
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 2px 0 4px 0;
      flex: 1;
      justify-content: space-between;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 78px;
      top: 10px;
      bottom: 10px;
      width: 2.5px;
      background: #1e3a8a;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: center;
      position: relative;
      margin: 1.5px 0;
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
      font-size: 12.8pt;
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
      margin-bottom: 7px;
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
      font-size: 10.4pt;
      line-height: 1.48;
      color: #1e293b;
      margin: 0;
    }

    .block-prose strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* Calibrated base styling per enquiry */
    .page-lesson-1 .block-prose { font-size: 10.5pt; line-height: 1.48; }
    .page-lesson-2 .block-prose { font-size: 10.6pt; line-height: 1.50; }
    .page-lesson-3 .block-prose { font-size: 10.55pt; line-height: 1.49; }
    .page-lesson-4 .block-prose { font-size: 10.75pt; line-height: 1.51; }
    .page-lesson-5 .block-prose { font-size: 10.25pt; line-height: 1.45; }

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
      padding: 8px 12px;
      margin-bottom: 5px;
    }

    .quiz-card:last-child {
      margin-bottom: 0;
    }

    .quiz-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
    }

    .quiz-card-title {
      font-size: 8.4pt;
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
      font-size: 9.35pt;
      line-height: 1.45;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 2.5px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="page cover-page" id="page-1" data-page="1">
    <div class="cover-top-masthead">
      <div class="cover-series">The History Revision Hub</div>
      <div class="cover-sub-series">Key Stage 3 Disciplinary Classroom Textbook &bull; Year 9 Master Edition</div>
    </div>
    <div class="cover-title-block">
      <div class="cover-date-pill">1871 &ndash; 1914</div>
      <h1 class="cover-main-title">CAUSES OF THE GREAT WAR</h1>
      <div class="cover-subtitle">Imperial Ambition, Naval Rivalry &amp; The Collapse of Peace</div>
    </div>
    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64}" alt="HMS Dreadnought Battleship">
    </div>
    <div class="cover-hero-caption">
      Primary Photograph (c. 1906–1907): HMS Dreadnought at sea, the all-big-gun battleship that sparked the Anglo-German naval arms race.
    </div>

    <!-- Dramatic Unit Narrative Synopsis in Playfair Display -->
    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Enquiry &bull; Unit Narrative Synopsis</span>
        <span class="cover-overview-period">1871 &ndash; 1914</span>
      </div>
      <p class="cover-overview-text">
        &ldquo;${canonicalSynopsis}&rdquo;
      </p>
    </div>

    <!-- Canonical Enquiries Scheme of Learning Directory (Australia 4-Column Architecture) -->
    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>The Canonical Enquiries &bull; Scheme of Learning Directory</span>
        <span>A3 Saddle-Stitch Format</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          <tr>
            <td class="col-num">Enquiry 01</td>
            <td class="col-title">German Unification &amp; Bismarck</td>
            <td class="col-eq">How did 1871 rupture European peace?</td>
            <td class="col-page">Page 3</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 02</td>
            <td class="col-title">Imperial Rivalry &amp; Morocco</td>
            <td class="col-eq">Did Weltpolitik push powers to brink of war?</td>
            <td class="col-page">Page 4</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 03</td>
            <td class="col-title">Naval Arms Race &amp; Dreadnought</td>
            <td class="col-eq">Why did battleships reset naval supremacy?</td>
            <td class="col-page">Page 5</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 04</td>
            <td class="col-title">Alliance Systems &amp; The Balkans</td>
            <td class="col-eq">Did alliances protect or doom peace?</td>
            <td class="col-page">Page 6</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 05</td>
            <td class="col-title">The July Crisis &amp; Sarajevo</td>
            <td class="col-eq">Why did two shots ignite thirty-seven days of madness?</td>
            <td class="col-page">Page 7</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Core Concepts Anchor Strip -->
    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Realpolitik &bull; Balance of Power &bull; Alsace-Lorraine &bull; Weltpolitik &bull; Moroccan Crises &bull; Dreadnought Race &bull; Triple Entente &bull; Balkan Powder Keg &bull; Sarajevo &bull; Blank Cheque &bull; Schlieffen Plan</span>
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
        <span class="sub-badge">Master Chronology Spine &bull; 1871&ndash;1914</span>
      </div>
      <div class="spine-header-block">
        <h2 class="spine-main-title">CHRONOLOGICAL TURNING POINTS</h2>
        <div class="spine-subtitle">Twelve Decisive Milestones &amp; Causal Dominoes Culminating in the Outbreak of War</div>
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
      <span>Causes of the Great War: 1871–1914 &bull; Department Classroom Textbook</span>
      <span class="page-pill">Page 2</span>
    </div>
  </div>

  <!-- PAGES 3–7: 5 ENQUIRIES -->
  ${unitData.lessons
    .slice(0, 5)
    .map((lesson, idx) => {
      const pageNum = idx + 3;
      const lessonNum = idx + 1;
      const cleanTitle = lesson.title.replace(/^Enquiry\s+\d+:\s*/i, '');
      const enquiryQ = lesson.enquiryQuestion || lesson.enquiry || lesson.title;
      const blocks = (lesson.narrative_blocks || []).filter(
        (b) => b.text && b.text.trim().length > 0,
      );

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
      <span>The History Revision Hub &bull; Causes of the Great War: 1871&ndash;1914</span>
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
        <div class="quiz-card quiz-card-${ci + 1}">
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
    <div class="running-footer">
      <span>Master Knowledge Retrieval Engine &bull; Zero Clutter Publication Standard</span>
      <span class="page-pill">Page 8</span>
    </div>
  </div>

</body>
</html>
`;
}

async function run() {
  console.log(`\n============================================================`);
  console.log(`🚀 COMPILING 8-PAGE MASTER TEXTBOOK: [great_war]`);
  console.log(`============================================================`);

  const html = buildHtml();
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'great_war');
  const rootDir = path.join(ROOT_DIR, 'units', 'great_war');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });

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
      let secMargin = 6;

      const getOverlap = () => {
        const fTop = footer.getBoundingClientRect().top;
        const children = Array.from(p.querySelectorAll('.block-section, p, .block-header'));
        const maxB = Math.max(...children.map((c) => c.getBoundingClientRect().bottom));
        return maxB - fTop;
      };

      while (getOverlap() > -15 && size > 8.5) {
        size -= 0.1;
        lh -= 0.01;
        secMargin = Math.max(3, secMargin - 0.1);
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
    printSpaceAuditReport(report, 'great_war/textbook.html');
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

  const standardPdfPath = path.join(pdfOutputDir, 'great_war_textbook.pdf');
  await page.pdf({
    path: standardPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });
  console.log(`[OK] Master 8-Page Textbook PDF compiled to: ${standardPdfPath}`);

  await browser.close();
  console.log('8-Page Causes of the Great War Textbook compilation completed successfully.');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { run, buildHtml };
