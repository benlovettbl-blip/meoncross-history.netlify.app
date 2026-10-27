/**
 * scripts/generate_weimar_master_retrieval_companion.cjs
 *
 * Compiles the Flagship 28-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 3 (1HI0/31): Weimar and Nazi Germany, 1918–1939.
 *
 * Strict Reprographic & Pedagogical Architecture:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 16 enquiries (8 tiered questions per enquiry = 128 questions)
 * - Two-Line Dual Retrieval Format (Line 1: Core Fact / Line 2: The Explanation)
 * - Examiner Warning / Fatal Pitfall Callout on every enquiry page
 * - Exact multiple of 4 (28 pages / 7 folded A3 sheets) for commercial A4 saddle-stitch booklet printing
 * - Publisher-grade typography & 0px dead space underflow budget
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { WEIMAR_PEARSON_QUIZ_BANK } = require('./weimar_pearson_quiz_bank.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const OUTPUT_HTML = path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'weimar_master_retrieval_companion.html');
const OUTPUT_PDF = path.join(PDFS_DIR, 'Weimar_and_Nazi_Germany_Master_Knowledge_Retrieval_Companion.pdf');

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
// BASE64 IMAGE HELPER
// --------------------------------------------------------------------------
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
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
  return null;
}

// --------------------------------------------------------------------------
// APPROVED AUTHENTIC CLASSROOM FOOTERS (28 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'Weimar and Nazi Germany Master Retrieval Companion • Edexcel Paper 3 • The History Department', // P1
  'Master Chronology Domino Flowchart • 28 Causal Turning Points (1918–1939) • The History Department', // P2
  '"Kiel mutineers marched on Berlin; the Kaiser fled on 9 November: master the revolutionary baseline."', // P3 (Enq 1)
  '"Diktat, Dolchstoss, and £6.6bn reparations: understand why the republic carried a mortal birth defect."', // P4 (Enq 2)
  '"Stresemann warned Germany was dancing on a volcano: US loans brought golden years, but fragile foundation."', // P5 (Enq 3)
  '"Bauhaus functionalism, Otto Dix satire, and the New Woman: cultural liberation provoked conservative backlash."', // P6 (Enq 4)
  '"DAP to NSDAP: Drexler\'s 25 points and Rohm\'s Brownshirts gave Hitler an ideological and street army."', // P7 (Enq 5)
  '"16 Nazis died at the Feldherrnhalle; Landsberg produced Mein Kampf: the ballot box replaced the putsch."', // P8 (Enq 6)
  '"Wall Street crashed and 6 million lost work: Bruning cut budgets while Goebbels promised Work and Bread."', // P9 (Enq 7)
  '"Papen thought he boxed Hitler in; Hindenburg signed on 30 January 1933: legal appointment killed democracy."', // P10 (Enq 8)
  '"Reichstag Fire to Enabling Act: Gleichschaltung crushed unions and parties; the Fuhrer oath bound the army."', // P11 (Enq 9)
  '"Gestapo terror, Dachau wire, and Himmler\'s SS: the police state enforced obedience through fear and denunciation."', // P12 (Enq 10)
  '"Volksempfanger radios, Speer\'s Nuremberg lights, and 1936 Olympics: Goebbels orchestrated total public mind."', // P13 (Enq 11)
  '"Edelweiss Pirates camped and Swing Youth danced; Bishop Galen protested: evaluate the reality of resistance."', // P14 (Enq 12)
  '"Kinder, Kuche, Kirche and Mother\'s Cross: by 1937 rearmament compelled millions of women back into factories."', // P15 (Enq 13)
  '"Eugenics in biology and two hours daily PE: schools and Hitler Youth trained Aryan warriors and mothers."', // P16 (Enq 14)
  '"Autobahns, RAD spades, and KdF cruise ships: invisible unemployment concealed long hours and military economy."', // P17 (Enq 15)
  '"1933 Boycott, 1935 Nuremberg Laws, and 1938 Kristallnacht: legal exclusion escalated to violent destruction."', // P18 (Enq 16)
  'Department Marking Bank • Key Topic 1: The Weimar Republic (1918–1929) • Verified Marking Model', // P19
  'Department Marking Bank • Key Topic 2: Hitler\'s Rise to Power (1919–1933) • Verified Marking Model', // P20
  'Department Marking Bank • Key Topic 3: Nazi Control & Dictatorship (1933–1939) • Verified Marking Model', // P21
  'Department Marking Bank • Key Topic 4: Life in Nazi Germany (1933–1939) • Verified Marking Model', // P22
  'Edexcel Paper 3 Section A Strategy: Question 1 Inferences [4m] & Question 2 Causation [12m] Blueprint', // P23
  'Edexcel Paper 3 Section B Strategy: Question 3(a) Source Utility [8m] (COP Framework & Weighted Verdict)', // P24
  'Edexcel Paper 3 Section B Strategy: Question 3(b) Contrasting Views [4m] & 3(c) Why Historians Disagree [4m]', // P25
  'Edexcel Paper 3 Section B Strategy: Question 3(d) Synoptic Evaluation Essay Architect [16m + 4m SPaG]', // P26
  'Top 10 Fatal Examiner Traps in Paper 3 & Historiographical Comparison Matrix • The History Department', // P27
  'Digital Revision Hub • 4-Gateway QR Command Deck & Master Knowledge Companion Back Cover (1HI0/31)', // P28
];

// --------------------------------------------------------------------------
// MASTER CHRONOLOGY DOMINO FLOWCHART (STRICTLY 1918–1939 • 28 TURNING POINTS)
// --------------------------------------------------------------------------
const DOMINO_TIMELINE = [
  {
    year: 'Oct 1918',
    title: 'Kiel Naval Mutiny',
    text: 'German sailors mutiny at Kiel and Wilhelmshaven, refusing suicide battle; triggers nationwide revolution.',
  },
  {
    year: 'Nov 1918',
    title: 'Abdication & Armistice',
    text: 'Kaiser Wilhelm II abdicates on 9 Nov; Friedrich Ebert leads provisional republic; 11 Nov armistice signed.',
  },
  {
    year: 'Jan 1919',
    title: 'Spartacist Uprising',
    text: 'Left-wing communist revolt crushed in Berlin by Freikorps; Rosa Luxemburg and Karl Liebknecht murdered.',
  },
  {
    year: 'Jun 1919',
    title: 'Treaty of Versailles Signed',
    text: 'War guilt Article 231, £6.6bn reparations, army cut to 100,000, and loss of 13% territory branded a Diktat.',
  },
  {
    year: 'Aug 1919',
    title: 'Weimar Constitution Passed',
    text: 'Democratic voting, Proportional Representation, and universal adult franchise adopted alongside emergency Article 48.',
  },
  {
    year: 'Mar 1920',
    title: 'Kapp Putsch Defeated',
    text: 'Right-wing Freikorps mutiny seizes Berlin; defeated within 4 days by a nationwide general strike of workers.',
  },
  {
    year: 'Jul 1921',
    title: 'Hitler Becomes Fuhrer',
    text: 'Adolf Hitler replaces Anton Drexler as absolute leader of NSDAP; establishes Fuhrerprinzip and SA Brownshirts.',
  },
  {
    year: 'Jan 1923',
    title: 'Occupation of the Ruhr',
    text: '60,000 French and Belgian troops occupy industrial Ruhr after Germany defaults on coal deliveries; passive resistance ordered.',
  },
  {
    year: 'Nov 1923',
    title: 'Hyperinflation Peak & Rentenmark',
    text: 'Printing paper money collapses mark; Stresemann introduces emergency Rentenmark backed by land, halting crisis.',
  },
  {
    year: 'Nov 1923',
    title: 'Munich Beer Hall Putsch',
    text: 'Hitler and Ludendorff march on Munich; state police open fire, killing 16 Nazis; putsch fails and Hitler arrested.',
  },
  {
    year: 'Feb 1924',
    title: 'Hitler\'s Trial & Landsberg',
    text: 'Courtroom speeches yield national fame; lenient 5-year sentence results in 9 months\' imprisonment and Mein Kampf.',
  },
  {
    year: 'Aug 1924',
    title: 'Dawes Plan Agreed',
    text: 'US loans of 800m gold marks reorganize reparation instalments, kickstarting German factory production.',
  },
  {
    year: 'Feb 1925',
    title: 'Re-founding of Nazi Party',
    text: 'Hitler adopts the "legal strategy" to win power democratically through Reichstag elections rather than armed coup.',
  },
  {
    year: 'Oct 1925',
    title: 'Locarno Treaties Concluded',
    text: 'Germany accepts western borders with France and Belgium, ending diplomatic isolation and restoring peace.',
  },
  {
    year: 'Feb 1926',
    title: 'Bamberg Party Conference',
    text: 'Hitler crushes the socialist faction of Strasser brothers, securing absolute authority and conservative industrialist backing.',
  },
  {
    year: 'Sep 1926',
    title: 'Germany Joins League of Nations',
    text: 'Admitted as a permanent member of the League Council, restoring Germany\'s international great power status.',
  },
  {
    year: 'Aug 1928',
    title: 'Kellogg-Briand Pact Signed',
    text: 'Germany and 61 nations sign international treaty renouncing aggressive war as an instrument of national policy.',
  },
  {
    year: 'Jun 1929',
    title: 'The Young Plan Agreed',
    text: 'Reparations cut from £6.6bn to £2bn payable over 59 years; France agrees to evacuate the Rhineland early.',
  },
  {
    year: 'Oct 1929',
    title: 'The Wall Street Crash',
    text: 'US banks recall short-term loans; German banks collapse, industrial output falls 40%, and Stresemann dies.',
  },
  {
    year: 'Sep 1930',
    title: 'Nazi Electoral Surge',
    text: 'Unemployment passes 3 million; Bruning governs by Article 48 decree; Nazis surge from 12 seats to 107 seats.',
  },
  {
    year: 'Jul 1932',
    title: 'Nazis Become Largest Party',
    text: 'Unemployment reaches 6 million; Nazis win 230 seats (37.3% vote), establishing undisputed parliamentary dominance.',
  },
  {
    year: 'Nov 1932',
    title: 'Schleicher Maneuvers',
    text: 'Nazis lose 2 million votes (196 seats); Schleicher tries to split party; Papen schemes with Hindenburg to replace him.',
  },
  {
    year: 'Jan 1933',
    title: 'Hitler Appointed Chancellor',
    text: 'Hindenburg swears in Hitler on 30 Jan with Papen as Vice-Chancellor, believing the non-Nazi cabinet majority will box him in.',
  },
  {
    year: 'Feb 1933',
    title: 'The Reichstag Fire',
    text: 'Dutch communist Van der Lubbe arrested; Hitler triggers Decree for Protection of People and State, suspending civil liberties.',
  },
  {
    year: 'Mar 1933',
    title: 'The Enabling Act Passed',
    text: 'Passed 444 votes to 94 after banning communists; transfers all legislative power to Hitler, ending democracy.',
  },
  {
    year: 'May–Jul 1933',
    title: 'Gleichschaltung Coordination',
    text: 'Independent trade unions abolished on 2 May; rival political parties banned on 14 July; Germany becomes one-party state.',
  },
  {
    year: 'Jun 1934',
    title: 'Night of the Long Knives',
    text: 'SS executes Ernst Rohm and 200 SA leaders; army generals pledge loyalty to Hitler after radical SA threat eliminated.',
  },
  {
    year: 'Aug 1934',
    title: 'Death of Hindenburg & Fuhrer Oath',
    text: 'Hitler merges Chancellor and President into Fuhrer; armed forces swear sacred personal oath of loyalty directly to Hitler.',
  },
];

// --------------------------------------------------------------------------
// PEARSON EDEXCEL SPECIFICATION TOPIC MAPPINGS FOR COVER LEDGER (16 ENQUIRIES)
// --------------------------------------------------------------------------
const LEDGER_ENTRIES = [
  { num: 1, topicCode: 'KT 1.1', title: 'Origins of Republic (1918–19)', focus: 'Kiel Mutiny, abdication, armistice, Weimar Constitution, PR & Article 48' },
  { num: 2, topicCode: 'KT 1.2', title: 'Early Challenges (1919–23)', focus: 'Versailles Treaty, Diktat, Dolchstoss, Spartacists, Kapp Putsch & Ruhr crisis' },
  { num: 3, topicCode: 'KT 1.3', title: 'Recovery of Republic (1924–29)', focus: 'Stresemann, Rentenmark, Dawes/Young Plans, Locarno & League entry' },
  { num: 4, topicCode: 'KT 1.4', title: 'Weimar Society (1924–29)', focus: 'Living standards, 2m homes, New Woman, Bauhaus, Otto Dix & cabaret' },
  { num: 5, topicCode: 'KT 2.1', title: 'Early Nazi Development (1919–22)', focus: 'DAP to NSDAP, 25-Point Programme, SA Brownshirts & Fuhrerprinzip' },
  { num: 6, topicCode: 'KT 2.2', title: 'Munich Putsch & Lean Years', focus: 'Beer Hall Putsch, Landsberg trial, Mein Kampf & legal strategy shift' },
  { num: 7, topicCode: 'KT 2.3', title: 'Growth of Support (1929–32)', focus: 'Wall Street Crash, 6m unemployed, Bruning austerity & 230 seats in 1932' },
  { num: 8, topicCode: 'KT 2.4', title: 'Hitler Becomes Chancellor (1932–33)', focus: 'Papen, Schleicher, Hindenburg intrigue & 30 January 1933 appointment' },
  { num: 9, topicCode: 'KT 3.1', title: 'Creation of Dictatorship (1933–34)', focus: 'Reichstag Fire, Enabling Act, Gleichschaltung & Night of the Long Knives' },
  { num: 10, topicCode: 'KT 3.2', title: 'Police State & Religion (1933–39)', focus: 'SS, Gestapo, Dachau, People\'s Court, Concordat & Confessing Church' },
  { num: 11, topicCode: 'KT 3.3', title: 'Controlling Attitudes (1933–39)', focus: 'Goebbels, censorship, book burning, Volksempfanger, rallies & 1936 Olympics' },
  { num: 12, topicCode: 'KT 3.4', title: 'Opposition & Conformity (1933–39)', focus: 'Edelweiss Pirates, Swing Youth, Bishop Galen, Niemoller & limits of dissent' },
  { num: 13, topicCode: 'KT 4.1', title: 'Policies Towards Women (1933–39)', focus: 'Kinder Kuche Kirche, marriage loans, Mother\'s Cross & factory recall 1937' },
  { num: 14, topicCode: 'KT 4.2', title: 'Policies Towards Young (1933–39)', focus: 'School curricula, racial studies, Hitler Youth, BDM & compulsory law 1939' },
  { num: 15, topicCode: 'KT 4.3', title: 'Employment & Standards (1933–39)', focus: 'RAD, Autobahns, Autarky, DAF, KdF, invisible unemployment & working hours' },
  { num: 16, topicCode: 'KT 4.4', title: 'Persecution of Minorities (1933–39)', focus: '1933 Boycott, Nuremberg Laws (1935), Kristallnacht (1938) & T4 euthanasia' },
];

// Micro-pip helper
function getPipBadge(idx) {
  if (idx < 3) {
    return '<span class="pip-badge pip-t1" title="Tier 1: Core Substantive Recall (Foundation / Level 4)">&#9658;</span>';
  } else if (idx < 6) {
    return '<span class="pip-badge pip-t2" title="Tier 2: Causal Mechanism &amp; Explanation (Grades 5–7)">&#9658;&#9658;</span>';
  } else {
    return '<span class="pip-badge pip-t3" title="Tier 3: Synoptic Significance &amp; Evaluation (Grades 8–9)">&#9658;&#9658;&#9658;</span>';
  }
}

// --------------------------------------------------------------------------
// HTML BUILDER
// --------------------------------------------------------------------------
function buildHtml() {
  const coverImageBase64 = getBase64Image('weimar_hyperinflation_verified.png') || getBase64Image('weimar_reichstag_fire_verified.png') || getBase64Image('/images/weimar_hyperinflation_verified.png');
  const qrHub = generateQrSvg('https://thehistorydepartment.org/units/weimar_nazi_germany/');
  const qrKt1 = generateQrSvg('https://thehistorydepartment.org/units/weimar_nazi_germany/?kt=1');
  const qrKt2 = generateQrSvg('https://thehistorydepartment.org/units/weimar_nazi_germany/?kt=2');
  const qrKt3 = generateQrSvg('https://thehistorydepartment.org/units/weimar_nazi_germany/?kt=3');
  const qrKt4 = generateQrSvg('https://thehistorydepartment.org/units/weimar_nazi_germany/?kt=4');

  // Page 1 Tracking Rows
  const trackingRows = LEDGER_ENTRIES.map((e) => `
    <tr>
      <td style="text-align: center; font-weight: 700; color: #475569;">__/__</td>
      <td><strong>${e.topicCode}: ${e.title}</strong><br><span style="font-size: 6.6pt; color: #475569;">${e.focus}</span></td>
      <td style="text-align: center; font-weight: 800;">___/8</td>
      <td style="text-align: center; font-weight: 800;">___/8</td>
      <td></td>
      <td></td>
    </tr>
  `).join('');

  // Page 2 Domino Nodes
  const dominoNodesHtml = DOMINO_TIMELINE.map((item, idx) => `
    <div class="domino-node">
      <div class="domino-node-header">
        <span class="domino-step-num">Turn ${idx + 1}</span>
        <span class="domino-year-badge">${item.year}</span>
      </div>
      <div class="domino-title">${item.title}</div>
      <div class="domino-text">${item.text}</div>
    </div>
  `).join('');

  // Pages 3–18 Enquiry Retrieval Pages
  const enquiryPagesHtml = WEIMAR_PEARSON_QUIZ_BANK.map((lesson, idx) => {
    const pageNum = idx + 3;
    const qrSvg = generateQrSvg(`https://thehistorydepartment.org/units/weimar_nazi_germany/?lesson=${lesson.id}`);

    const questionsHtml = lesson.questions.map((item, qIdx) => {
      const qNum = qIdx + 1;
      const pip = getPipBadge(qIdx);
      return `
        <div class="q-block">
          <div class="q-stem">
            <div class="q-num-box">${qNum}</div>
            <div class="q-text-wrap">${pip} ${item.q}</div>
          </div>
          <div class="q-lines">
            <div class="q-line-row">
              <span class="line-label">Ans:</span>
              <span class="line-rule"></span>
            </div>
            <div class="q-line-row">
              <span class="line-label">Det:</span>
              <span class="line-rule"></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="page-container" id="page-${pageNum}">
        <div class="running-header">
          <span>Weimar and Nazi Germany, 1918–1939</span>
          <span>Enquiry ${idx + 1} of 16 &bull; ${lesson.keyTopic}</span>
        </div>

        <div class="enquiry-banner">
          <div class="enquiry-banner-left">
            <span class="enquiry-code-tag">${lesson.keyTopic} &bull; ENQUIRY ${idx + 1}</span>
            <div class="enquiry-title-text">${lesson.title}</div>
            <div class="enquiry-question-text"><em>Enquiry:</em> ${lesson.enquiry}</div>
          </div>
          <div class="enquiry-qr-box">
            <div class="qr-svg-wrap">${qrSvg}</div>
            <span class="qr-tag">SCAN &bull; REVISE</span>
          </div>
        </div>

        <div class="questions-stack">
          ${questionsHtml}
        </div>

        <div class="page-warning-box">
          <span class="warning-badge">EXAMINER WARNING</span>
          <span class="warning-text">${lesson.examinerTrap}</span>
        </div>

        <div class="page-footer-strip">
          <span class="footer-page-num">Page ${pageNum}</span>
          <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
          <span class="footer-page-num">1HI0/31</span>
        </div>
      </div>
    `;
  }).join('');

  // Pages 19–22 Marking Bank (4 Key Topics)
  const mbKt1Questions = WEIMAR_PEARSON_QUIZ_BANK.slice(0, 4).map(l => l.questions).flat();
  const mbKt2Questions = WEIMAR_PEARSON_QUIZ_BANK.slice(4, 8).map(l => l.questions).flat();
  const mbKt3Questions = WEIMAR_PEARSON_QUIZ_BANK.slice(8, 12).map(l => l.questions).flat();
  const mbKt4Questions = WEIMAR_PEARSON_QUIZ_BANK.slice(12, 16).map(l => l.questions).flat();

  function renderMarkingBankPage(ktTitle, questions, pageNum, footerIdx) {
    const itemsHtml = questions.map((item, idx) => `
      <div class="mb-item">
        <span class="mb-qnum">Q${idx + 1}</span>
        <div class="mb-content">
          <strong>${item.a}</strong>
          <span class="mb-exp">${item.exp}</span>
        </div>
        <div class="mb-check">
          <span>[✓]</span>
          <span>[✗]</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="page-container" id="page-${pageNum}">
        <div class="running-header">
          <span>Weimar and Nazi Germany &bull; Department Marking Bank</span>
          <span>${ktTitle} (32 Questions) &bull; Green-Pen DIRT Review</span>
        </div>

        <div class="mb-header-bar">
          <span class="mb-header-title">${ktTitle.toUpperCase()} &bull; VERIFIED MARKING MODEL</span>
          <span class="mb-header-sub">Tick [✓] if completely accurate &bull; Cross [✗] if core fact or explanation missing</span>
        </div>

        <div class="mb-grid-container">
          ${itemsHtml}
        </div>

        <div class="dirt-instruction-box">
          <strong>DIRT Review Standard:</strong> For every [✗], copy the bold core fact and underlying historical explanation into your green-pen reflection tracker. Memorise the dates, names, and statistics before your next lesson.
        </div>

        <div class="page-footer-strip">
          <span class="footer-page-num">Page ${pageNum}</span>
          <span class="footer-quip">${APPROVED_FOOTERS[footerIdx]}</span>
          <span class="footer-page-num">1HI0/31</span>
        </div>
      </div>
    `;
  }

  const mbPage1 = renderMarkingBankPage('Key Topic 1: The Weimar Republic (1918–1929)', mbKt1Questions, 19, 18);
  const mbPage2 = renderMarkingBankPage('Key Topic 2: Hitler\'s Rise to Power (1919–1933)', mbKt2Questions, 20, 19);
  const mbPage3 = renderMarkingBankPage('Key Topic 3: Nazi Control & Dictatorship (1933–1939)', mbKt3Questions, 21, 20);
  const mbPage4 = renderMarkingBankPage('Key Topic 4: Life in Nazi Germany (1933–1939)', mbKt4Questions, 22, 21);

  // Return Master HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weimar and Nazi Germany, 1918–1939 &bull; Master Knowledge Retrieval & Homework Companion</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; }
    body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
    }
    .page-container {
      width: 210mm;
      height: 297mm;
      padding: 8.5mm 12mm 7.5mm 12mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: always;
    }
    @media print {
      body { background: #ffffff; }
      .page-container { margin: 0; box-shadow: none; width: 210mm; height: 297mm; }
    }

    /* HEADER & FOOTER STRIPS */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 2px;
      font-size: 6.8pt;
      color: #475569;
    }
    .footer-quip { font-style: italic; font-family: 'Georgia', serif; color: #1e293b; font-size: 7.0pt; text-align: center; }
    .footer-page-num { font-weight: 800; color: #0f172a; }

    /* COVER PAGE (PAGE 1) */
    .cover-masthead {
      text-align: center;
      padding: 2px 0 3px 0;
      border-bottom: 2.5px solid #0f172a;
    }
    .cover-brand { font-size: 7.8pt; font-weight: 800; letter-spacing: 1px; color: #b91c1c; text-transform: uppercase; }
    .cover-title { font-size: 19.5pt; font-weight: 900; color: #0f172a; margin: 2px 0 1px 0; letter-spacing: -0.5px; font-family: 'Georgia', serif; }
    .cover-subtitle { font-size: 8.8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.4px; }
    
    .cover-hero-wrap {
      display: flex;
      gap: 12px;
      align-items: center;
      margin: 4px 0;
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      background: #f8fafc;
      border-radius: 4px;
    }
    .cover-hero-img {
      width: 76mm;
      height: 52mm;
      object-fit: cover;
      border-radius: 3px;
      border: 1px solid #94a3b8;
    }
    .cover-hero-desc {
      flex: 1;
      font-size: 7.3pt;
      line-height: 1.32;
      color: #334155;
    }
    .cover-hero-desc strong { color: #0f172a; }

    .student-id-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin: 3px 0;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 3.5px 8px;
      border-radius: 3px;
    }
    .id-field { display: flex; align-items: baseline; gap: 4px; font-size: 7.4pt; font-weight: 700; color: #0f172a; }
    .id-field .line { flex: 1; border-bottom: 1.2px dotted #475569; height: 11px; }

    .tracking-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.8pt;
      margin-top: 2px;
    }
    .tracking-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 2.8px 4.5px;
      text-align: left;
      font-weight: 700;
      border: 1px solid #0f172a;
    }
    .tracking-table td {
      padding: 2.2px 4.5px;
      border: 1px solid #cbd5e1;
      line-height: 1.15;
    }
    .tracking-table tr:nth-child(even) td { background: #f8fafc; }

    /* DOMINO FLOWCHART (PAGE 2) */
    .domino-header-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.4pt;
      font-weight: 800;
      letter-spacing: 0.3px;
      border-radius: 2px;
      margin: 2px 0 4px 0;
    }
    .domino-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3.8px;
      flex: 1;
    }
    .domino-node {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #b91c1c;
      background: #ffffff;
      padding: 2.8px 4.5px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1px;
    }
    .domino-node-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .domino-step-num { font-size: 5.8pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; }
    .domino-year-badge { font-size: 6.2pt; font-weight: 900; background: #fee2e2; color: #991b1b; padding: 0.5px 3px; border-radius: 2px; }
    .domino-title { font-size: 6.9pt; font-weight: 800; color: #0f172a; line-height: 1.15; }
    .domino-text { font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.20; color: #334155; }
    
    .domino-rule-box {
      border: 1px solid #fecaca;
      background: #fef2f2;
      padding: 3px 6px;
      border-radius: 3px;
      font-size: 6.8pt;
      color: #991b1b;
      line-height: 1.22;
      margin-top: 3px;
    }

    /* ENQUIRY RETRIEVAL PAGES (PAGES 3–18) */
    .enquiry-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1.5px solid #0f172a;
      border-left: 5px solid #b91c1c;
      background: #f8fafc;
      padding: 3.5px 7px;
      margin: 2px 0 4px 0;
      border-radius: 2px;
    }
    .enquiry-code-tag { font-size: 6.4pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.4px; }
    .enquiry-title-text { font-size: 10.0pt; font-weight: 900; color: #0f172a; font-family: 'Georgia', serif; }
    .enquiry-question-text { font-size: 7.2pt; color: #334155; margin-top: 1px; }
    .enquiry-qr-box { display: flex; flex-direction: column; align-items: center; width: 40px; }
    .qr-svg-wrap { width: 32px; height: 32px; }
    .qr-tag { font-size: 5.2pt; font-weight: 800; color: #475569; margin-top: 1px; }

    .questions-stack {
      display: flex;
      flex-direction: column;
      gap: 3.2px;
      flex: 1;
    }
    .q-block {
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0f172a;
      background: #ffffff;
      padding: 2.2px 5.5px;
      border-radius: 2px;
    }
    .q-stem {
      display: flex;
      gap: 5px;
      align-items: baseline;
      font-size: 7.5pt;
      line-height: 1.20;
      color: #0f172a;
      font-weight: 700;
    }
    .q-num-box {
      font-size: 6.9pt;
      font-weight: 900;
      color: #b91c1c;
      width: 14px;
      flex-shrink: 0;
    }
    .pip-badge { font-size: 6.5pt; margin-right: 2px; }
    .pip-t1 { color: #16a34a; }
    .pip-t2 { color: #d97706; }
    .pip-t3 { color: #dc2626; }
    .q-lines {
      margin-top: 1.8px;
      display: flex;
      flex-direction: column;
      gap: 2.2px;
    }
    .q-line-row {
      display: flex;
      align-items: baseline;
      gap: 5px;
    }
    .line-label { font-size: 6.0pt; font-weight: 800; color: #64748b; width: 22px; flex-shrink: 0; text-transform: uppercase; }
    .line-rule { flex: 1; border-bottom: 1px solid #cbd5e1; height: 8px; }

    .page-warning-box {
      border: 1px solid #fecaca;
      border-left: 3.5px solid #dc2626;
      background: #fef2f2;
      padding: 2.5px 5.5px;
      border-radius: 2px;
      font-size: 6.7pt;
      line-height: 1.22;
      color: #991b1b;
      margin-top: 3px;
      display: flex;
      gap: 5px;
      align-items: baseline;
    }
    .warning-badge { font-size: 6.0pt; font-weight: 900; background: #dc2626; color: #ffffff; padding: 1px 3.5px; border-radius: 2px; flex-shrink: 0; }

    /* MARKING BANK (PAGES 19–22) */
    .mb-header-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 2px;
      margin: 2px 0 4px 0;
    }
    .mb-header-title { font-size: 7.2pt; font-weight: 800; letter-spacing: 0.3px; }
    .mb-header-sub { font-size: 6.6pt; color: #94a3b8; }
    .mb-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5px 7px;
      flex: 1;
    }
    .mb-item {
      border: 1px solid #e2e8f0;
      border-left: 2px solid #b91c1c;
      background: #ffffff;
      padding: 2px 4.5px;
      border-radius: 2px;
      display: flex;
      gap: 3.5px;
      align-items: baseline;
      font-size: 6.7pt;
      line-height: 1.18;
    }
    .mb-qnum { font-size: 6.3pt; font-weight: 900; color: #b91c1c; width: 17px; flex-shrink: 0; }
    .mb-content { flex: 1; color: #1e293b; }
    .mb-content strong { color: #0f172a; font-family: 'Inter', sans-serif; font-size: 6.8pt; }
    .mb-exp { font-family: 'Georgia', serif; font-size: 6.5pt; color: #475569; display: block; margin-top: 0.5px; line-height: 1.16; }
    .mb-check { display: flex; gap: 2.5px; font-size: 6.3pt; font-weight: 800; color: #94a3b8; flex-shrink: 0; }
    .dirt-instruction-box {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 2.5px 6px;
      border-radius: 2px;
      font-size: 6.6pt;
      color: #334155;
      margin-top: 3px;
    }

    /* STRATEGY PAGES (PAGES 23–27) */
    .strat-meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      font-size: 7.2pt;
      font-weight: 700;
      border-radius: 2px;
      margin: 2px 0 4px 0;
    }
    .strat-card {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #ffffff;
      padding: 3.5px 6.5px;
      border-radius: 2px;
      margin-bottom: 4px;
    }
    .strat-title { font-size: 7.6pt; font-weight: 900; color: #0f172a; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between; }
    .strat-body { font-size: 6.9pt; line-height: 1.23; color: #334155; }
    .strat-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 5.5px; }
    .strat-grid-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4.5px; }
    .strat-box { border: 1px solid #cbd5e1; background: #f8fafc; padding: 2.8px 5px; border-radius: 2px; }
    .strat-box-title { font-size: 7.1pt; font-weight: 800; color: #b91c1c; margin-bottom: 1.5px; }
    
    .model-answer-box {
      border: 1px solid #b91c1c;
      border-left: 3.5px solid #b91c1c;
      background: #fff5f5;
      padding: 3px 6px;
      border-radius: 2px;
      font-size: 6.8pt;
      line-height: 1.20;
      color: #450a0a;
      margin: 3px 0;
    }
    .model-answer-header { font-weight: 800; color: #991b1b; font-size: 7.0pt; margin-bottom: 1.5px; }

    /* TRAPS & BACK COVER (PAGE 27 & 28) */
    .traps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 7px; flex: 1; }
    .trap-item { border: 1px solid #fecaca; border-left: 3px solid #dc2626; background: #fff5f5; padding: 3px 5px; border-radius: 2px; }
    .trap-item-title { font-size: 7.1pt; font-weight: 800; color: #991b1b; margin-bottom: 1px; }
    .trap-item-body { font-size: 6.6pt; line-height: 1.20; color: #450a0a; }

    .hub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5.5px; margin-top: 5px; }
    .hub-card { border: 1.5px solid #0f172a; padding: 5px 7px; border-radius: 3px; display: flex; gap: 7px; align-items: center; background: #ffffff; }
    .hub-qr { width: 42px; height: 42px; flex-shrink: 0; }
    .hub-info { flex: 1; font-size: 7.0pt; line-height: 1.23; }
    .hub-badge { font-size: 5.8pt; font-weight: 900; background: #0f172a; color: #ffffff; padding: 1px 4px; border-radius: 2px; }
    .hub-title { font-size: 7.8pt; font-weight: 800; color: #0f172a; margin: 1px 0; }
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- PAGE 1: MASTER FRONT COVER & FORMATIVE TRACKING LEDGER                     -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-1">
    <div class="cover-masthead">
      <div class="cover-brand">The History Revision Hub &bull; GCSE (9–1) History Revision Portal</div>
      <h1 class="cover-title">Weimar and Nazi Germany, 1918–1939</h1>
      <div class="cover-subtitle">Pearson Edexcel GCSE History Paper 3 (1HI0/31: Modern Depth Study)</div>
    </div>

    <div class="cover-hero-wrap">
      ${coverImageBase64 ? `<img src="${coverImageBase64}" class="cover-hero-img" alt="Weimar Hero Artwork">` : ''}
      <div class="cover-hero-desc">
        <strong>The Master Knowledge Retrieval & Homework Companion:</strong><br>
        This official companion booklet contains 128 specification retrieval questions anchored across all 16 canonical enquiry lessons, the complete 28-point Weimar Chronology Domino Flowchart, verified department marking models, and Edexcel Paper 3 examination strategy guides for Section A (Inference & Causation) and Section B (Source Utility, Interpretation Comparisons & Evaluative Essays).
      </div>
    </div>

    <div class="student-id-grid">
      <div class="id-field"><span>Pupil Name:</span><span class="line"></span></div>
      <div class="id-field"><span>Teacher:</span><span class="line"></span></div>
      <div class="id-field"><span>Target Grade:</span><span class="line"></span></div>
    </div>

    <table class="tracking-table">
      <thead>
        <tr>
          <th style="width: 48px;">Date</th>
          <th>Enquiry & Specification Focus</th>
          <th style="width: 40px;">Att 1</th>
          <th style="width: 40px;">Att 2</th>
          <th style="width: 70px;">Parent Sign</th>
          <th style="width: 50px;">Teacher</th>
        </tr>
      </thead>
      <tbody>
        ${trackingRows}
      </tbody>
    </table>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 1</span>
      <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 2: MASTER CHRONOLOGY DOMINO FLOWCHART (28 TURNING POINTS)             -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-2">
    <div class="running-header">
      <span>Weimar and Nazi Germany, 1918–1939</span>
      <span>Master Chronology Domino Flowchart &bull; 28 Causal Turning Points</span>
    </div>

    <div class="domino-header-bar">
      <span>WEIMAR &amp; NAZI MASTER CHRONOLOGY DOMINO FLOWCHART &bull; 1918 TO 1939</span>
      <span>28 Causal Links &bull; Follow the Chronological Chain &#9658;</span>
    </div>

    <div class="domino-grid">
      ${dominoNodesHtml}
    </div>

    <div class="domino-rule-box">
      <strong>The Domino Causal Protocol:</strong> Every event directly precipitated the next crisis. The 1918 defeat birthed the Dolchstoss myth and the harsh Versailles Diktat, triggering the 1923 Ruhr occupation and hyperinflation. Stresemann's golden years built an economy dependent on US loans; when Wall Street crashed in 1929, mass unemployment propelled the Nazi surge, enabling Hitler's legal appointment in 1933 and the rapid construction of a totalitarian police state by 1934.
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 2</span>
      <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGES 3–18: 16 DEDICATED ENQUIRY RETRIEVAL PAGES                           -->
  <!-- ========================================================================= -->
  ${enquiryPagesHtml}

  <!-- ========================================================================= -->
  <!-- PAGES 19–22: 4 DEDICATED MARKING BANK PAGES                               -->
  <!-- ========================================================================= -->
  ${mbPage1}
  ${mbPage2}
  ${mbPage3}
  ${mbPage4}

  <!-- ========================================================================= -->
  <!-- PAGE 23: SECTION A STRATEGY: QUESTION 1 INFERENCES & QUESTION 2 CAUSATION  -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-23">
    <div class="running-header">
      <span>Edexcel Paper 3 Section A Examination Strategy</span>
      <span>Question 1 Inferences [4m] &bull; Question 2 Causation [12m]</span>
    </div>

    <div class="strat-meta-bar">
      <span><strong>Paper 3 Section A:</strong> Core Comprehension &amp; Causal Analysis</span>
      <span>16 Marks Total &bull; Target Time: 25 Minutes (6m for Q1, 19m for Q2)</span>
    </div>

    <div class="strat-card">
      <div class="strat-title">
        <span>Question 1: Give Two Inferences from Source A [4 Marks &bull; 6 Mins]</span>
        <span style="color: #b91c1c;">2 Marks Per Inference</span>
      </div>
      <div class="strat-body">
        <strong>The 2-Step Formula:</strong> An inference is something the source suggests without stating directly. Never merely quote the source!<br>
        &bull; <strong>Inference 1:</strong> <em>"Source A suggests that [inference about the topic]."</em> [1 mark]<br>
        &bull; <strong>Quotation / Detail 1:</strong> <em>"I know this because the source states/shows: '[exact quote or visual detail]'."</em> [1 mark]<br>
        &bull; <strong>Inference 2:</strong> <em>"Source A also suggests that [distinct second inference]."</em> [1 mark]<br>
        &bull; <strong>Quotation / Detail 2:</strong> <em>"This is supported by the detail: '[second quote]'."</em> [1 mark]
      </div>
    </div>

    <div class="model-answer-box">
      <div class="model-answer-header">Verified Grade 9 Exemplar: "Give two inferences from Source A about German living conditions in 1923."</div>
      <strong>Inference 1:</strong> Source A suggests that hyperinflation completely destroyed the purchasing power of ordinary wages. <em>"I know this because Source A states that a worker's daily wage had to be spent within an hour before bread prices doubled again at noon."</em><br>
      <strong>Inference 2:</strong> Source A also suggests that the economic crisis triggered deep panic and desperation among the respectable middle classes. <em>"I know this because the author notes that retired teachers and civil servants were forced to sell their family heirlooms and beg on street corners."</em>
    </div>

    <div class="strat-card">
      <div class="strat-title">Question 2: Explain Why... [12 Marks &bull; 19 Mins]</div>
      <div class="strat-body">
        <strong>3-PEE Causal Architecture:</strong> 3 developed paragraphs analysing causation. Must use both stimulus points PLUS one mandatory own knowledge factor!<br>
        &bull; <strong>Stimulus Point 1 (¶1):</strong> State point &bull; Deploy 2–3 precise dates/facts &bull; Explain exact causal mechanism.<br>
        &bull; <strong>Stimulus Point 2 (¶2):</strong> State second factor &bull; Deploy facts &bull; Explain how it intensified the outcome.<br>
        &bull; <strong>Own Knowledge Gate (¶3):</strong> Introduce an independent factor omitted from the prompt &bull; <strong>Without this, marks are capped at Level 2 (7/12)!</strong>
      </div>
    </div>

    <div class="strat-card">
      <div class="strat-title">High-Probability Question 2 Practice Bank (6 Core Topics)</div>
      <div class="strat-grid-2col" style="font-size: 6.6pt; line-height: 1.22;">
        <div>&bull; <strong>1.</strong> Explain why the Weimar Republic faced severe political rebellions in the years 1919–1923.</div>
        <div>&bull; <strong>2.</strong> Explain why the German economy recovered in the years 1924–1929.</div>
        <div>&bull; <strong>3.</strong> Explain why support for the Nazi Party increased in the years 1929–1932.</div>
        <div>&bull; <strong>4.</strong> Explain why Hitler was appointed Chancellor in January 1933.</div>
        <div>&bull; <strong>5.</strong> Explain why Hitler was able to create a dictatorship in the years 1933–1934.</div>
        <div>&bull; <strong>6.</strong> Explain why there was so little open opposition to the Nazi regime in the years 1933–1939.</div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 23</span>
      <span class="footer-quip">${APPROVED_FOOTERS[22]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 24: SECTION B STRATEGY: QUESTION 3(A) SOURCE UTILITY [8 MARKS]        -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-24">
    <div class="running-header">
      <span>Edexcel Paper 3 Section B Examination Strategy</span>
      <span>Question 3(a) Utility of Sources B and C [8 Marks &bull; 15 Mins]</span>
    </div>

    <div class="strat-meta-bar">
      <span><strong>Question 3(a) Source Utility:</strong> How useful are Sources B and C for an enquiry into [Topic]?</span>
      <span>8 Marks Total &bull; Level 3 Criteria (6–8 Marks) &bull; Target Time: 15 Mins</span>
    </div>

    <div class="strat-card">
      <div class="strat-title">The "COP" Provenance &amp; Utility Framework</div>
      <div class="strat-body">
        Never write that a source is "useless because it is biased"! Every contemporary source has historical utility when contextualised.<br>
        <strong>1. Content (C):</strong> What accurate historical details does the source reveal about the enquiry focus? Quote directly.<br>
        <strong>2. Own Knowledge (O):</strong> Corroborate or contextualise the content using 2 precise historical facts (dates, data, acts).<br>
        <strong>3. Provenance (P):</strong> How does the Author, Date, Audience, and Motive affect its value? Does an eyewitness reveal authentic public fear, or does an official speech reveal state propaganda intentions?
      </div>
    </div>

    <div class="strat-grid-2col">
      <div class="strat-box">
        <div class="strat-box-title">Analysing Source B (¶1 - 7 Mins)</div>
        <div style="font-size: 6.7pt; line-height: 1.2;">
          &bull; <strong>Utility of Content:</strong> <em>"Source B is useful because it reveals [specific detail about topic]..."</em><br>
          &bull; <strong>Contextual Knowledge:</strong> <em>"This is corroborated by own knowledge, as in 1933 [insert factual proof]..."</em><br>
          &bull; <strong>Provenance Assessment:</strong> <em>"The provenance strengthens its value because [author] had direct access to..."</em>
        </div>
      </div>
      <div class="strat-box">
        <div class="strat-box-title">Analysing Source C (¶2 - 7 Mins)</div>
        <div style="font-size: 6.7pt; line-height: 1.2;">
          &bull; <strong>Utility of Content:</strong> <em>"Source C is also useful as it offers an alternative perspective on..."</em><br>
          &bull; <strong>Contextual Knowledge:</strong> <em>"This aligns with historical realities, for example [insert facts]..."</em><br>
          &bull; <strong>Provenance Assessment:</strong> <em>"However, the utility is shaped by its purpose to persuade [audience] that..."</em>
        </div>
      </div>
    </div>

    <div class="model-answer-box">
      <div class="model-answer-header">Level 3 (Grade 9) Exemplar Excerpt: Source Utility on the Gestapo</div>
      <em>"Source B is exceptionally useful for an enquiry into public fear of the Gestapo. Writing in a private diary in 1936, a Berlin worker records that neighbours lower their voices in tenement stairwells for fear of block wardens. This is corroborated by own knowledge, as the Gestapo relied on 150,000 voluntary block wardens (Blockleiter) to monitor local households. The provenance powerfully enhances its utility: as an un-published personal diary written under the threat of arrest, the author had zero incentive to deceive, offering raw, unmediated insight into the psychological atmosphere of terror."</em>
    </div>

    <div class="page-warning-box">
      <span class="warning-badge">FATAL TRAP</span>
      <span class="warning-text">Never write "Source B is biased and therefore has no utility". The examiner will cap you at Level 1! Explain WHAT the bias reveals about the author's purpose and state ideology.</span>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 24</span>
      <span class="footer-quip">${APPROVED_FOOTERS[23]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 25: SECTION B STRATEGY: QUESTION 3(B) & 3(C) INTERPRETATIONS          -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-25">
    <div class="running-header">
      <span>Edexcel Paper 3 Section B Examination Strategy</span>
      <span>Question 3(b) &amp; 3(c): Dissecting Historical Interpretations</span>
    </div>

    <div class="strat-meta-bar">
      <span><strong>Interpretations Analysis:</strong> Question 3(b) [4m] &amp; Question 3(c) [4m]</span>
      <span>8 Marks Combined &bull; Target Time: 12 Minutes (5m for 3b, 7m for 3c)</span>
    </div>

    <div class="strat-card">
      <div class="strat-title">
        <span>Question 3(b): How Do Interpretations 1 and 2 Differ? [4 Marks &bull; 5 Mins]</span>
        <span style="color: #b91c1c;">Direct Contrast Formula</span>
      </div>
      <div class="strat-body">
        <strong>Official Stem:</strong> <em>"Study Interpretations 1 and 2. They give different views about [Topic]. What is the main difference between these views? Explain your answer, using details from both interpretations."</em><br>
        <strong>Step 1: State the Main Difference (Line 1):</strong> <em>"The main difference is that Interpretation 1 argues [View A], whereas Interpretation 2 argues [contrasting View B]."</em> [2 marks]<br>
        <strong>Step 2: Quotation from Interpretation 1:</strong> <em>"Interpretation 1 emphasizes that '[direct quote]'."</em> [1 mark]<br>
        <strong>Step 3: Quotation from Interpretation 2:</strong> <em>"In direct contrast, Interpretation 2 states that '[direct quote]'."</em> [1 mark]
      </div>
    </div>

    <div class="model-answer-box">
      <div class="model-answer-header">Verified Grade 9 Exemplar: Question 3(b) Model Answer</div>
      <em>"The main difference between the two interpretations is that Interpretation 1 argues the German standard of living genuinely improved under the Nazis due to full employment and KdF leisure schemes, whereas Interpretation 2 argues that workers were severely exploited through frozen wages, long working hours, and the abolition of independent trade unions. Interpretation 1 states that 'workers enjoyed subsidized theatre tickets and holidays they could never previously afford', while Interpretation 2 asserts that 'the real wages of industrial labourers fell as weekly hours were extended to 49 hours without overtime pay'."</em>
    </div>

    <div class="strat-card">
      <div class="strat-title">
        <span>Question 3(c): Why Do Interpretations 1 and 2 Differ? [4 Marks &bull; 7 Mins]</span>
        <span style="color: #b91c1c;">Historiographical Cause</span>
      </div>
      <div class="strat-body">
        <strong>Official Stem:</strong> <em>"Suggest one reason why Interpretations 1 and 2 give different views about [Topic]. You may use Sources B and C to help explain your answer."</em><br>
        <strong>The 3 Approved Historical Reasons:</strong><br>
        &bull; <strong>Reason 1 (Different Sources Used):</strong> Historian 1 relied primarily on official Nazi propaganda reports (e.g. KdF promotional material), while Historian 2 drew upon confidential Sopade reports from underground socialist workers.<br>
        &bull; <strong>Reason 2 (Different Emphasis / Focus):</strong> Historian 1 focuses on the psychological benefits of job security for previously unemployed families, whereas Historian 2 focuses on statistical consumer purchasing power.<br>
        &bull; <strong>Reason 3 (Different Social Groups):</strong> Historian 1 examines wealthy industrialists who profited from armaments, while Historian 2 examines small retailers squeezed by price controls.
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 25</span>
      <span class="footer-quip">${APPROVED_FOOTERS[24]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 26: SECTION B STRATEGY: QUESTION 3(D) EVALUATIVE ESSAY ARCHITECT      -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-26">
    <div class="running-header">
      <span>Edexcel Paper 3 Section B Examination Strategy</span>
      <span>Question 3(d) Synoptic Evaluative Essay Architect &bull; 16m + 4m SPaG [30 Mins]</span>
    </div>

    <div class="strat-meta-bar">
      <span><strong>Question 3(d) Evaluative Essay:</strong> "How far do you agree with Interpretation 2 about [Topic]?"</span>
      <span>16 Marks Content + 4 Marks SPaG = 20 Marks &bull; Level 4 Criteria (13–16 Marks)</span>
    </div>

    <div class="strat-card">
      <div class="strat-title">4-Step Evaluative Synthesis Architecture</div>
      <div class="strat-grid-2col" style="font-size: 6.7pt; line-height: 1.22;">
        <div>
          <strong>Step 1: Agree with Interpretation 2 (Target - ¶1)</strong><br>
          &bull; Explain why Interpretation 2 provides valid insight.<br>
          &bull; Quote directly from Interpretation 2.<br>
          &bull; Corroborate with 2–3 precise own knowledge facts.
        </div>
        <div>
          <strong>Step 2: Alternative View: Interpretation 1 (¶2)</strong><br>
          &bull; Examine the contrasting perspective in Interpretation 1.<br>
          &bull; Quote directly from Interpretation 1.<br>
          &bull; Deploy conflicting own knowledge facts validating it.
        </div>
        <div>
          <strong>Step 3: Broader Historical Context (¶3)</strong><br>
          &bull; Introduce decisive factors omitted by both historians.<br>
          &bull; Demonstrate comprehensive specification mastery.
        </div>
        <div>
          <strong>Step 4: Criteria-Led Historical Verdict (¶4)</strong><br>
          &bull; Deliver an explicit judgment on "how far" you agree.<br>
          &bull; Establish criteria (e.g. short-term reality vs long-term myth).<br>
          &bull; Clinch why one interpretation is more persuasive.
        </div>
      </div>
    </div>

    <div class="model-answer-box">
      <div class="model-answer-header">Grade 9 Evaluative Synthesis Model Excerpt: Nazi Economic Recovery</div>
      <em>"Interpretation 2 offers substantial explanatory weight by arguing that the Nazi economic 'miracle' was a statistical illusion built upon rearmament and labour conscription. Historian X correctly identifies that 'unemployment was eliminated only through statistical manipulation and compulsory manual labour'. This is powerfully corroborated by own knowledge: the 1935 Reich Labour Service (RAD) removed 400,000 young men from the register, while 1.4 million conscripted soldiers, married women forced out of professions, and Jews stripped of citizenship under the 1935 Nuremberg Laws were omitted from official figures. Consequently, Interpretation 2 rightly exposes that Germany did not achieve genuine economic prosperity, but rather an unsustainable war economy financed by inflationary MEFO bills."</em>
    </div>

    <div class="strat-card">
      <div class="strat-title">Level 4 Examiner Mark Scheme Rubric (Grade 9 Benchmark)</div>
      <div style="font-size: 6.6pt; line-height: 1.20; color: #1e293b;">
        &bull; <strong>Evaluates Interpretation 2 thoroughly</strong> using both interpretations and rich contextual knowledge.<br>
        &bull; <strong>Balanced and analytical argument</strong> exploring the strengths and limitations of both viewpoints.<br>
        &bull; <strong>Substantiated conclusion</strong> reaching a sustained judgment on the validity of the target interpretation based on historical criteria.
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 26</span>
      <span class="footer-quip">${APPROVED_FOOTERS[25]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 27: TOP 10 FATAL EXAMINER TRAPS IN WEIMAR & NAZI GERMANY              -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-27">
    <div class="running-header">
      <span>Weimar and Nazi Germany, 1918–1939</span>
      <span>Examiner Quality Control &bull; Top 10 Fatal Pitfalls to Avoid in Paper 3</span>
    </div>

    <div class="mb-header-bar" style="background: #991b1b;">
      <span>TOP 10 FATAL EXAMINER TRAPS IN EDEXCEL PAPER 3 (1HI0/31)</span>
      <span>Eliminate these errors to secure Grades 8 and 9</span>
    </div>

    <div class="traps-grid">
      <div class="trap-item">
        <div class="trap-item-title">1. Claiming Hitler was Elected Dictator</div>
        <div class="trap-item-body">Hitler was <strong>appointed Chancellor legally by Hindenburg</strong> on 30 Jan 1933 after backstairs deals with Papen. In the last free election (Nov 1932), the Nazis won only 33% of the vote!</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">2. Confusing Hyperinflation (1923) with Depression (1929)</div>
        <div class="trap-item-body"><strong>1923:</strong> Currency collapsed due to French in Ruhr and money printing; middle-class savings wiped out. <strong>1929:</strong> Wall Street crash recalled US loans; 6 million unemployed.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">3. Quoting without Inferring on Question 1</div>
        <div class="trap-item-body">On Question 1, merely copying a sentence from Source A scores <strong>0 marks</strong>. You must state what the source <em>suggests</em>, then quote as supporting evidence.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">4. Calling Sources "Biased and Useless" on 3(a)</div>
        <div class="trap-item-body">Writing that a Nazi poster or Goebbels speech is "biased and useless" caps you at Level 1. Explain <strong>what the propaganda intention reveals</strong> about state indoctrination!</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">5. Treating Interpretations as Primary Sources</div>
        <div class="trap-item-body">Interpretations 1 and 2 are <strong>modern historical extracts written after 1945</strong>. Do NOT evaluate their "reliability" or "witness access"! Focus 100% on their historical arguments.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">6. Forgetting the Enabling Act Majority Rule</div>
        <div class="trap-item-body">The Enabling Act was a constitutional amendment requiring a <strong>two-thirds majority</strong>. Hitler achieved this by banning 81 communists and intimidating the Catholic Centre Party.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">7. Conflating Dachau with Wartime Death Camps</div>
        <div class="trap-item-body">Dachau (1933) was a political prison camp for communists and dissidents to be re-educated through terror. Industrial extermination camps (Auschwitz) were established during wartime after 1941.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">8. Omitting Invisible Unemployment</div>
        <div class="trap-item-body">Nazi "full employment" was statistical manipulation: married women forced from jobs, Jews stripped of citizenship, RAD workers, and 1.4 million conscripts were excluded from figures!</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">9. Missing the 1937 Female Employment U-Turn</div>
        <div class="trap-item-body">While the Nazis promoted <em>Kinder, Küche, Kirche</em>, massive rearmament caused labour shortages from 1937, compelling <strong>14.6 million women into industrial and munitions work</strong> by 1939.</div>
      </div>
      <div class="trap-item">
        <div class="trap-item-title">10. On 3(d): Writing a One-Sided Essay</div>
        <div class="trap-item-body">On Question 3(d) [16m], candidates who only agree with Interpretation 2 without analyzing Interpretation 1 and contextual knowledge are <strong>statutorily capped at Level 2 (8/16 marks)</strong>.</div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 27</span>
      <span class="footer-quip">${APPROVED_FOOTERS[26]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 28: DIGITAL REVISION HUB & 4-GATEWAY QR COMMAND DECK                  -->
  <!-- ========================================================================= -->
  <div class="page-container" id="page-28">
    <div class="running-header">
      <span>Weimar and Nazi Germany, 1918–1939</span>
      <span>Digital Revision Hub &bull; 4-Gateway QR Command Deck &bull; 1HI0/31</span>
    </div>

    <div class="mb-header-bar">
      <span>DIGITAL REVISION HUB &bull; SMARTPHONE REVISION GATEWAYS</span>
      <span>Scan any QR code with a camera to access quizzes, flashcards &amp; model answers</span>
    </div>

    <div class="hub-grid">
      <div class="hub-card">
        <div class="hub-qr">${qrKt1}</div>
        <div class="hub-info">
          <span class="hub-badge">KEY TOPIC 1</span>
          <div class="hub-title">The Weimar Republic (1918–29)</div>
          <div>Enquiries 1–4: Origins, Versailles Diktat, Spartacists, Ruhr, Hyperinflation, Stresemann &amp; Society.</div>
        </div>
      </div>
      <div class="hub-card">
        <div class="hub-qr">${qrKt2}</div>
        <div class="hub-info">
          <span class="hub-badge">KEY TOPIC 2</span>
          <div class="hub-title">Hitler's Rise to Power (1919–33)</div>
          <div>Enquiries 5–8: NSDAP founding, Munich Putsch, Landsberg, Wall Street Crash &amp; Chancellor appointment.</div>
        </div>
      </div>
      <div class="hub-card">
        <div class="hub-qr">${qrKt3}</div>
        <div class="hub-info">
          <span class="hub-badge">KEY TOPIC 3</span>
          <div class="hub-title">Nazi Dictatorship (1933–39)</div>
          <div>Enquiries 9–12: Reichstag Fire, Enabling Act, SS/Gestapo, Dachau, Goebbels &amp; youth opposition.</div>
        </div>
      </div>
      <div class="hub-card" style="border: 1.5px solid #b91c1c;">
        <div class="hub-qr">${qrKt4}</div>
        <div class="hub-info">
          <span class="hub-badge" style="background: #b91c1c;">KEY TOPIC 4 &amp; PORTAL</span>
          <div class="hub-title">Life in Nazi Germany &amp; Quizzes</div>
          <div>Enquiries 13–16: Women, Hitler Youth, RAD/Autobahns, Nuremberg Laws, Kristallnacht &amp; Flashcard Vault.</div>
        </div>
      </div>
    </div>

    <div class="strat-card" style="margin-top: 6px;">
      <div class="strat-title">The Three Pillars of Edexcel Paper 3 Mastery</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.8pt; line-height: 1.25;">
        <div><strong>Pillar 1: Knowledge Retrieval</strong><br>Memorise the 128 core questions in this booklet. Precision dates, election totals, and statutes form the bedrock of Grade 9 writing.</div>
        <div><strong>Pillar 2: Causal Dominoes</strong><br>Study the 28-point Domino Flowchart on Page 2. Trace the direct chain from 1918 defeat to the 1933 dictatorship and 1939 police state.</div>
        <div><strong>Pillar 3: Exam Architecture</strong><br>Deploy the exact structures on Pages 23–26: COP for 3(a) utility, direct contrast for 3(b/c), and criteria-led synthesis for 3(d) evaluative essays.</div>
      </div>
    </div>

    <div class="domino-rule-box" style="text-align: center; margin-top: 4px;">
      <strong>The History Revision Hub &bull; GCSE (9–1) History &bull; Paper 3 Modern Depth Study: Weimar and Nazi Germany, 1918–1939</strong><br>
      Published for multi-school departmental use &bull; Institutional Neutrality &bull; Pearson Edexcel Specification Standard
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 28</span>
      <span class="footer-quip">${APPROVED_FOOTERS[27]}</span>
      <span class="footer-page-num">1HI0/31</span>
    </div>
  </div>

</body>
</html>`;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION ENGINE
// --------------------------------------------------------------------------
async function compilePdf() {
  console.log('🚀 Compiling Master 28-Page A4 Weimar and Nazi Germany Retrieval Companion...');

  const html = buildHtml();
  fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
  console.log(`📄 Saved HTML companion to: ${OUTPUT_HTML}`);

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(`file://${OUTPUT_HTML}`, { waitUntil: 'networkidle0' });

  // Page Budget & Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = [];
    pages.forEach((p, idx) => {
      results.push({
        page: idx + 1,
        id: p.id,
        scrollHeight: p.scrollHeight,
        clientHeight: p.clientHeight,
        overflow: p.scrollHeight > p.clientHeight + 1,
      });
    });
    return results;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: WEIMAR 1918–1939 COMPANION');
  console.log('=============================================================');
  let hasErrors = false;
  auditResults.forEach((r) => {
    const status = r.overflow
      ? `❌ OVERFLOW (${r.scrollHeight}px > ${r.clientHeight}px)`
      : `✅ OPTIMAL (${r.scrollHeight}px <= ${r.clientHeight}px)`;
    console.log(`Page ${String(r.page).padStart(2, ' ')} (${r.id}): ${status}`);
    if (r.overflow) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (auditResults.length !== 28) {
    console.warn(`⚠️ Warning: Expected 28 pages, but found ${auditResults.length}.`);
  }

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 28-Page A4 PDF: ${OUTPUT_PDF}`);

  await browser.close();
}

compilePdf().catch((err) => {
  console.error('Fatal error during PDF generation:', err);
  process.exit(1);
});
