/**
 * generate_cme_quiz_booklet.cjs
 *
 * Compiles the Master 24-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 2 (1HI0/2B / Option P5): Conflict in the Middle East, 1945–1995.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 16 enquiries (12 tiered questions per enquiry = 192 questions)
 * - Two-Line Dual Retrieval Format (Line 1: Core Fact / Line 2: The Explanation)
 * - Examiner Warning / Fatal Pitfall Callout on every enquiry page
 * - Exact multiple of 4 (24 pages / 6 folded A3 sheets) for commercial A4 saddle-stitch booklet printing
 * - Publisher-grade typography & 0px dead space underflow budget
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { CME_PEARSON_QUIZ_BANK } = require('./cme_pearson_quiz_bank.cjs');

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
// APPROVED AUTHENTIC CLASSROOM FOOTERS (24 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'Conflict in the Middle East Master Retrieval Companion • Edexcel Paper 2 • The History Department', // P1
  'Master Chronology Domino Flowchart • 28 Causal Turning Points (1945–1995) • The History Department', // P2
  '"Balfour promised in 67 words; Attlee handed it to the UN in 1947: master the post-war baseline."', // P3
  '"Irgun checked into the King David Hotel with milk churns... and checked Britain out of the Mandate."', // P4
  '"UN Resolution 181 gave each side a jigsaw puzzle; neither side liked the picture."', // P5
  '"Czech arms turned the tide in 1948; understand why Arab division was Israel\'s greatest asset."', // P6
  '"Al-Nakba displaced 700,000 refugees; the 1950 Law of Return rebuilt a nation out of tragedy."', // P7
  '"Eden thought Nasser was Mussolini on the Nile; Eisenhower promptly reminded Eden what year it was."', // P8
  '"Water in the desert is worth more than oil: understand why the Headwater Diversion triggered 1967."', // P9
  '"Operation Focus destroyed Arab air power in 3 hours; total air supremacy determined the 100-hour blitz."', // P10
  '"UN Resolution 242 omitted \'the\' in English: diplomacy turned on a single definite article."', // P11
  '"Dawson\'s Field to Munich: explain how asymmetric terrorism thrust Palestinian identity onto global TV."', // P12
  '"Crossing the Bar-Lev Line on Yom Kippur: underestimating Egyptian planning nearly cost Israel the war."', // P13
  '"OPEC quadrupled oil prices; Kissinger\'s shuttle diplomacy drew Egypt out of the Soviet orbit."', // P14
  '"Sadat flew to Jerusalem in 1977; Begin surrendered the Sinai: courage in negotiation wins Grade 9."', // P15
  '"Operation Peace for Galilee drove the PLO to Tunis, but created Hezbollah and ignited the Intifada."', // P16
  '"The Children of the Stones proved that military force cannot extinguish a popular uprising."', // P17
  '"A handshake on the White House lawn: analyze why the Oslo peace process collapsed after 1995."', // P18
  'Department Marking Bank • Key Topic 1: The Birth of Israel & 1948 War • Verified Marking Model', // P19
  'Department Marking Bank • Key Topic 1 & 2: Refugees, Suez & Escalation • Verified Marking Model', // P20
  'Department Marking Bank • Key Topic 2 & 3: Conquered Lands, Yom Kippur & Oil • Verified Marking Model', // P21
  'Department Marking Bank • Key Topic 3: Camp David, Lebanon, Intifada & Oslo • Verified Marking Model', // P22
  'Edexcel Paper 2 Period Study Examination Strategy: Question 1 & Question 2 Blueprint • The History Department', // P23
  'Edexcel Paper 2 Period Study Question 3 Importance Architect & Digital Revision Hub • Departmental Archival Standard', // P24
];

// --------------------------------------------------------------------------
// HAND-CRAFTED CONCISE TITLES FOR COVER LEDGER (16 ENQUIRIES)
// --------------------------------------------------------------------------
const LEDGER_TITLES = [
  'Post-War Mandate Crisis',
  'Armed Jewish Insurgency',
  'UN Partition Plan (1947)',
  '1948–49 Arab-Israeli War',
  'Palestinian Refugee Crisis',
  'Nasser & 1956 Suez Crisis',
  'Road to War (1964–67)',
  'The Six-Day War (1967)',
  'Conquered Lands & Res 242',
  'Black September & Munich',
  '1973 Yom Kippur War',
  '1973 Oil Crisis & Kissinger',
  'Camp David & 1979 Treaty',
  '1982 Lebanon War',
  'First Intifada & Hamas',
  'The Oslo Accords (1993–95)',
];

// --------------------------------------------------------------------------
// MASTER CHRONOLOGY DOMINO FLOWCHART (STRICTLY 1945–1995 • 28 TURNING POINTS)
// --------------------------------------------------------------------------
const DOMINO_TIMELINE = [
  {
    year: '1945',
    title: 'Post-WWII Jewish Insurgency',
    text: 'Haganah, Irgun, and Lehi launch armed sabotage against British Mandate forces; illegal immigration surges.',
  },
  {
    year: 'Jul 1946',
    title: 'King David Hotel Bombing',
    text: 'Irgun bombs British administrative HQ in Jerusalem, killing 91; shatters British domestic resolve.',
  },
  {
    year: 'Feb 1947',
    title: 'Britain Surrenders Mandate',
    text: 'Attlee and Bevin announce Britain will surrender the Palestine Mandate to the United Nations.',
  },
  {
    year: 'Nov 1947',
    title: 'UN Resolution 181 Partition Plan',
    text: 'UN votes 33-13 to partition Palestine (56% Jewish state, 43% Arab state; Jerusalem international).',
  },
  {
    year: 'Dec 1947',
    title: 'Outbreak of Inter-Communal Civil War',
    text: 'Arab-Jewish fighting erupts over strategic highways, convoys, and towns across Mandatory Palestine.',
  },
  {
    year: 'Apr 1948',
    title: 'Deir Yassin & Plan Dalet',
    text: 'Haganah secures strategic corridors; Irgun attacks Deir Yassin, triggering mass Palestinian flight.',
  },
  {
    year: '14 May 1948',
    title: 'Declaration of the State of Israel',
    text: 'David Ben-Gurion proclaims sovereign Jewish statehood as the British Mandate officially expires at midnight.',
  },
  {
    year: '15 May 1948',
    title: 'Invasion by Five Arab States',
    text: 'Egypt, Jordan, Syria, Iraq, and Lebanon invade; Israel mobilises the newly unified IDF.',
  },
  {
    year: 'Jun 1948',
    title: 'Czech Arms Shipments Arrive',
    text: 'First UN truce allows Israel to import rifles, artillery, and Avia fighter aircraft from Czechoslovakia.',
  },
  {
    year: '1949',
    title: 'Rhodes Armistices & The Green Line',
    text: 'Fighting ends; Israel controls 78% of Palestine; Jordan annexes West Bank; Egypt holds Gaza.',
  },
  {
    year: '1948–50',
    title: 'The Palestinian Nakba & UNRWA',
    text: '700,000+ Palestinian refugees displaced; UNRWA established; Israel bars repatriation of refugees.',
  },
  {
    year: 'Jul 1950',
    title: 'Law of Return Passed',
    text: 'Knesset grants automatic citizenship to all Jewish immigrants, doubling the national population by 1951.',
  },
  {
    year: 'Feb 1955',
    title: 'Israeli Gaza Reprisal Raid',
    text: 'IDF paratroopers kill 38 Egyptian soldiers; humiliates Nasser and triggers the Czechoslovak Arms Deal.',
  },
  {
    year: 'Jul 1956',
    title: 'Nasser Nationalises Suez Canal',
    text: 'Nasser seizes canal after US cancels Aswan Dam loans, outraging Britain and France.',
  },
  {
    year: 'Oct–Nov 1956',
    title: 'The Suez Crisis',
    text: 'Protocol of Sèvres collusion; Israel invades Sinai; US financial threat forces British-French withdrawal.',
  },
  {
    year: 'Jan 1964',
    title: 'Cairo Summit & Founding of PLO',
    text: 'Arab League plans Jordan River diversion; Palestine Liberation Organization (PLO) founded under Shukeiri.',
  },
  {
    year: '1966–67',
    title: 'Samu Raid & Golan Air Clashes',
    text: 'IDF reprisal raid on Samu and downing of 6 Syrian MiGs over Damascus sharply escalate border hostilities.',
  },
  {
    year: 'May 1967',
    title: 'Pre-War Escalation & Tiran Blockade',
    text: 'Nasser expels UNEF, blocks Straits of Tiran, and moves 100,000 troops into Sinai; Jordan signs defence pact.',
  },
  {
    year: '5–10 Jun 1967',
    title: 'The Six-Day War (100-Hour Blitz)',
    text: 'Operation Focus destroys Arab air forces in 3 hours; Israel conquers Sinai, Gaza, West Bank, Golan Heights.',
  },
  {
    year: 'Nov 1967',
    title: 'UN Security Council Resolution 242',
    text: 'Establishes "Land for Peace" principle with disputed English wording regarding withdrawal from territories.',
  },
  {
    year: 'Sep 1970',
    title: 'Dawson’s Field & Black September',
    text: 'PFLP hijacks 4 airliners; King Hussein crushes PLO in civil war, expelling Arafat’s forces to Lebanon.',
  },
  {
    year: 'Sep 1972',
    title: 'Munich Olympics Massacre',
    text: 'Black September murders 11 Israeli athletes; Israel responds with covert Operation Wrath of God.',
  },
  {
    year: '6–25 Oct 1973',
    title: 'The Yom Kippur War',
    text: 'Egypt breaches Bar-Lev Line; Syria attacks Golan; US airlifts weapons; Sharon crosses Suez; ceasefire.',
  },
  {
    year: '1973–75',
    title: 'Arab Oil Embargo & Shuttle Diplomacy',
    text: 'OPEC quadruples crude oil prices; Kissinger brokers Sinai disengagement accords; Suez Canal reopens in 1975.',
  },
  {
    year: 'Sep 1978',
    title: 'Camp David Accords & 1979 Peace Treaty',
    text: 'Carter, Sadat, and Begin agree peace; Sinai returned to Egypt; Egypt expelled from Arab League.',
  },
  {
    year: 'Jun 1982',
    title: 'Israeli Invasion of Lebanon',
    text: 'Operation Peace for Galilee; siege of Beirut; Sabra & Shatila massacre; PLO evacuated to Tunis.',
  },
  {
    year: 'Dec 1987',
    title: 'First Intifada Erupts & Hamas Founded',
    text: 'Jabalya incident sparks grassroots uprising; stone-throwing vs IDF; Hamas founded by Sheikh Yassin.',
  },
  {
    year: '1993–95',
    title: 'The Oslo Accords & Rabin Assassination',
    text: '1993 Oslo Accords signed at White House; 1994 Jordan peace; Oslo II signed; Rabin assassinated Nov 1995.',
  },
];

// --------------------------------------------------------------------------
// HTML BUILDER: 24-PAGE A4 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
function buildHtml() {
  const qrSvg = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=cme_new');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East, 1945–1995: Master Knowledge Retrieval & Homework Companion</title>
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
      font-size: 8.7pt;
      line-height: 1.24;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page-container {
      width: 100%;
      height: 286mm;
      max-height: 286mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 0;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }

    /* Running Header & Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #000000;
      padding-bottom: 2px;
      margin-bottom: 2.2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #000000;
    }
    .footer-page-num { font-weight: 800; }
    .footer-quip { font-style: italic; color: #111111; font-weight: 500; }

    /* Page 1: Cover Styles */
    .cover-top-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 6px 10px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      border-radius: 2px;
    }
    .cover-title-group {
      text-align: center;
      padding: 3px 0 2px 0;
      border-bottom: 1.8px solid #000000;
      margin-bottom: 3px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 15.5pt;
      font-weight: 900;
      margin: 0 0 1px 0;
      line-height: 1.1;
      color: #000000;
      letter-spacing: -0.3px;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1e293b;
      margin: 0;
    }
    .pupil-meta-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.2fr;
      gap: 12px;
      border: 1.4px solid #0f172a;
      padding: 6px 10px;
      background: #ffffff;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
    }
    .pupil-field { display: flex; align-items: baseline; gap: 5px; }
    .pupil-field strong { font-weight: 900; color: #0f172a; }
    .pupil-field .field-line { flex: 1; border-bottom: 1.4px solid #0f172a; height: 11px; }

    /* Expanded Full-Page Homework Tracking Dual Grid */
    .hw-ledger-full-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 5px;
      margin-bottom: 4px;
    }
    .hw-ledger-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      flex: 1;
    }
    .hw-ledger-table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
    }
    .hw-ledger-table thead th {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 5px;
      font-weight: 900;
      text-transform: uppercase;
      border: 1.2px solid #0f172a;
      font-size: 7.4pt;
      letter-spacing: 0.3px;
    }
    .hw-ledger-table td {
      border: 1.2px solid #cbd5e1;
      padding: 4.5px 5px;
      vertical-align: middle;
      color: #000000;
      line-height: 1.2;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    .hw-col-title {
      background: #0f172a !important;
      color: #ffffff;
      font-size: 7.8pt;
      font-weight: 900;
      text-align: center;
      padding: 4px 5px !important;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .cover-protocol-box {
      border: 1.4px solid #0f172a;
      border-left: 5px solid #0f172a;
      border-radius: 2px;
      padding: 7px 11px;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      line-height: 1.35;
      color: #1e293b;
      margin-top: 2px;
    }
    .cover-protocol-box strong.proto-title {
      color: #0f172a;
      font-size: 8.3pt;
      margin-bottom: 3px;
      display: block;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    /* Page 2: Chronology Domino Flowchart */
    .timeline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.0px 6px;
      flex: 1;
      margin: 2px 0;
    }
    .domino-node {
      border: 1.2px solid #0f172a;
      border-left: 3.5px solid #0f172a;
      border-radius: 2px;
      padding: 2.2px 5px;
      background: #ffffff;
      display: flex;
      gap: 5px;
      align-items: flex-start;
      line-height: 1.16;
    }
    .domino-year {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      padding: 1px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }
    .domino-body { flex: 1; }
    .domino-title { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000; display: block; margin-bottom: 0.5px; }
    .domino-desc { font-family: 'Georgia', serif; font-size: 7.0pt; color: #222222; }

    /* Enquiry Pages (Pages 3–18) */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 3px 8px;
      margin-bottom: 2px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.4px 6px;
      margin-bottom: 1.8px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
      line-height: 1.16;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; color: #000000; min-width: 15px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 8.4pt; font-weight: 700; color: #000000; line-height: 1.16; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 60px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.2px solid #000000;
      height: 6.2mm;
    }

    /* Examiner Trap Box at Base of Enquiry Pages */
    .examiner-trap-box {
      border: 1.3px solid #b91c1c;
      border-left: 4.5px solid #b91c1c;
      background: #fef2f2;
      padding: 4px 8px;
      margin-top: 3px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      line-height: 1.28;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .trap-tag {
      background: #b91c1c;
      color: #ffffff;
      font-weight: 900;
      font-size: 6.4pt;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 1.5px 5px;
      border-radius: 2px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .trap-text {
      font-weight: 600;
      color: #991b1b;
      flex: 1;
    }

    /* Pages 19–22: Department Marking Bank */
    .mb-meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f1f5f9;
      border: 1.2px solid #cbd5e1;
      padding: 2.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #334155;
      border-radius: 2px;
      margin-bottom: 3px;
    }
    .mb-meta-bar strong {
      color: #0f172a;
      font-weight: 800;
    }
    .mb-grid-4enq {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      flex: 1;
      margin-top: 1px;
      height: 100%;
    }
    .mb-enq-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      background: #ffffff;
      padding: 3px 5px;
    }
    .mb-enq-header {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-radius: 1px;
      margin-bottom: 2px;
      text-align: center;
    }
    .mb-answers-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 1px;
    }
    .mb-ans-row {
      border-bottom: 1px dashed #cbd5e1;
      padding: 1.0px 1px;
      font-size: 6.6pt;
      line-height: 1.15;
      display: flex;
      gap: 3.5px;
      align-items: baseline;
    }
    .mb-ans-row:last-child { border-bottom: none; }
    .mb-ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; min-width: 14px; }
    .mb-ans-text { flex: 1; color: #1e293b; }
    .mb-ans-bold { font-family: 'Inter', sans-serif; font-weight: 800; color: #000000; }
    .mb-check-box { font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 800; color: #64748b; white-space: nowrap; }

    /* Page 23: Period Study Question 1 & Question 2 Blueprints */
    /* Page 23: Period Study Question 1 & Question 2 Strategy */
    .strat-meta-bar-23 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 2px;
      margin-bottom: 2px;
    }
    .strat-meta-bar-23 strong { color: #f8fafc; font-weight: 900; text-transform: uppercase; }
    .strat-stack-23 {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;
      margin: 1px 0;
    }
    .strat-card-q1 {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }
    .strat-card-q2 {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      gap: 3px;
    }
    .strat-card-header {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 1.5px;
      margin-bottom: 1px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      letter-spacing: 0.3px;
    }
    .strat-badge {
      font-size: 6.8pt;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1px 5px;
      border-radius: 2px;
      font-weight: 800;
    }
    .strat-task-prompt {
      font-family: 'Georgia', serif;
      font-size: 7.6pt;
      color: #1e293b;
      margin-bottom: 1px;
    }
    .strat-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 5px;
    }
    .strat-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
    }
    .strat-subbox {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 3.5px 6px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 7.3pt;
      line-height: 1.26;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1.5px;
    }
    .strat-subbox-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .strat-ok-matrix {
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      overflow: hidden;
      margin: 1px 0;
    }
    .strat-ok-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
    }
    .strat-ok-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 5px;
      font-weight: 800;
      text-align: left;
      text-transform: uppercase;
      font-size: 6.6pt;
      letter-spacing: 0.3px;
    }
    .strat-ok-table td {
      padding: 2px 5px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      line-height: 1.24;
    }
    .strat-ok-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .strat-ok-table tr:last-child td {
      border-bottom: none;
    }
    .strat-mini-trap {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
      color: #991b1b;
      font-weight: 700;
      display: flex;
      align-items: baseline;
      gap: 5px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 2px 5px;
      border-radius: 2px;
    }
    .strat-connectives-bar {
      border: 1px solid #cbd5e1;
      background: #f1f5f9;
      padding: 2.5px 6px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.24;
    }

    /* Page 24: Period Study Question 3 Importance & Digital Revision Hub */
    .strat-meta-bar-24 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 2px;
      margin-bottom: 2px;
    }
    .strat-meta-bar-24 strong { color: #f8fafc; font-weight: 900; text-transform: uppercase; }
    .strat-stack-24 {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;
      margin: 1px 0;
    }
    .strat-card-24 {
      border: 1.4px solid #0f172a;
      border-radius: 2px;
      padding: 6px 9px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      gap: 3.5px;
    }
    .strat-header-24 {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 1.5px;
      margin-bottom: 1px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      letter-spacing: 0.3px;
    }
    .strat-header-badge {
      font-size: 6.8pt;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1px 5px;
      border-radius: 2px;
      font-weight: 800;
    }
    .strat-selection-protocol {
      border: 1px solid #0284c7;
      background: #f0f9ff;
      border-left: 3.5px solid #0284c7;
      padding: 2px 5px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
      color: #0369a1;
      font-weight: 600;
    }
    .strat-essay-grid-24 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4.5px;
    }
    .strat-essay-step-24 {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 3px 5.5px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 7.1pt;
      line-height: 1.24;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1px;
    }
    .strat-step-num {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .strat-models-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
    }
    .strat-model-para-24 {
      border: 1.2px solid #0f172a;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 3px 5px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 6.9pt;
      line-height: 1.22;
      color: #1e293b;
    }
    .strat-model-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.25px;
      margin-bottom: 1px;
    }
    .strat-starters-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
    }
    .strat-starter-box {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 2px 4.5px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 6.8pt;
      line-height: 1.20;
      color: #1e293b;
    }
    .strat-starter-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .strat-criteria-box {
      border: 1px dashed #0f172a;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.20;
      color: #1e293b;
    }
    .strat-traps-bar-fixed {
      border: 1.3px solid #b91c1c;
      border-left: 5px solid #b91c1c;
      background: #fef2f2;
      padding: 4px 8px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Inter', sans-serif;
      font-size: 7.1pt;
      color: #7f1d1d;
    }
    .strat-traps-list {
      flex: 1;
      font-weight: 600;
      line-height: 1.25;
    }
    .back-hub-card {
      border: 1.4px solid #0f172a;
      background: #f8fafc;
      padding: 7px 11px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .back-hub-qr {
      width: 78px;
      height: 78px;
      flex-shrink: 0;
      background: #ffffff;
      padding: 2px;
      border: 1.2px solid #cbd5e1;
      border-radius: 2px;
    }
    .back-hub-info {
      flex: 1;
      font-family: 'Inter', sans-serif;
    }
    .back-hub-title {
      font-size: 9.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 1.5px;
      letter-spacing: 0.3px;
    }
    .back-hub-desc {
      font-size: 7.5pt;
      line-height: 1.26;
      color: #334155;
      margin-bottom: 3px;
    }
    .back-hub-features {
      display: flex;
      gap: 4.5px;
      margin-bottom: 3px;
    }
    .hub-feature-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      font-weight: 800;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1.2px 4.5px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .back-hub-url {
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 900;
      color: #0369a1;
      letter-spacing: 0.2px;
    }
  </style>
</head>
<body>
`;

  // =========================================================================
  // PAGE 1: FRONT COVER & PARENTAL DUE DATE / SCORE LEDGER
  // =========================================================================
  html += `
  <div class="page-container" id="page-1">
    <div class="running-header">
      <span>Edexcel GCSE (9–1) History • Paper 2 Period Study</span>
      <span>Option P5: Conflict in the Middle East, 1945–1995</span>
    </div>

    <div class="cover-top-banner">
      The History Department • GCSE History Retrieval Companion
    </div>

    <div class="cover-title-group">
      <h1 class="cover-main-title">Conflict in the Middle East, 1945–1995</h1>
      <p class="cover-sub-title">Pearson Edexcel GCSE (9–1) History • Option P5 (Paper 2) • Master Knowledge Companion</p>
    </div>

    <div class="pupil-meta-grid">
      <div class="pupil-field"><strong>Pupil:</strong><div class="field-line"></div></div>
      <div class="pupil-field"><strong>Class:</strong><div class="field-line"></div></div>
      <div class="pupil-field"><strong>Target:</strong><div class="field-line"></div></div>
      <div class="pupil-field"><strong>Teacher:</strong><div class="field-line"></div></div>
    </div>

    <div class="hw-ledger-full-wrap">
      <div class="hw-ledger-dual-grid">
        <!-- LEFT COLUMN: ENQUIRIES 1 TO 8 -->
        <table class="hw-ledger-table">
          <thead>
            <tr>
              <th colspan="5" class="hw-col-title">Part 1: Key Topics 1 &amp; 2 (Enquiries 1–8)</th>
            </tr>
            <tr>
              <th style="width: 38%;">Enquiry Focus</th>
              <th style="width: 17%;">Due Date</th>
              <th style="width: 16%;">Score</th>
              <th style="width: 20%;">Parent Sign</th>
              <th style="width: 9%;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${CME_PEARSON_QUIZ_BANK.slice(0, 8)
              .map(
                (enq, idx) => `
            <tr>
              <td><strong>Enq ${enq.num}:</strong> ${LEDGER_TITLES[idx]}</td>
              <td>____/____</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 24</td>
              <td></td>
              <td style="text-align: center; color: #94a3b8; font-size: 7pt;">[ &nbsp; ]</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>

        <!-- RIGHT COLUMN: ENQUIRIES 9 TO 16 -->
        <table class="hw-ledger-table">
          <thead>
            <tr>
              <th colspan="5" class="hw-col-title">Part 2: Key Topics 2 &amp; 3 (Enquiries 9–16)</th>
            </tr>
            <tr>
              <th style="width: 38%;">Enquiry Focus</th>
              <th style="width: 17%;">Due Date</th>
              <th style="width: 16%;">Score</th>
              <th style="width: 20%;">Parent Sign</th>
              <th style="width: 9%;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${CME_PEARSON_QUIZ_BANK.slice(8, 16)
              .map(
                (enq, idx) => `
            <tr>
              <td><strong>Enq ${enq.num}:</strong> ${LEDGER_TITLES[idx + 8]}</td>
              <td>____/____</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 24</td>
              <td></td>
              <td style="text-align: center; color: #94a3b8; font-size: 7pt;">[ &nbsp; ]</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="cover-protocol-box">
        <strong class="proto-title">Department Retrieval Protocol &amp; Spaced Learning Standards:</strong>
        Complete one enquiry weekly as targeted homework. Each question requires both a <strong>Core Fact</strong> (Line 1: precise historical anchor, date, key figure, or battle) and a complete <strong>Historical Explanation</strong> (Line 2: causal mechanism or significance). Self-assess in class using green pen against the verified Department Marking Bank on pages 19–22. Scores below 18/24 trigger immediate flashcard consolidation.
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 1</span>
      <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 2: MASTER CHRONOLOGY DOMINO FLOWCHART (1945–1995 • 28 NODES)
  // =========================================================================
  html += `
  <div class="page-container" id="page-2">
    <div class="running-header">
      <span>Key Chronology &amp; Causal Turning Points</span>
      <span>Conflict in the Middle East (1945–1995)</span>
    </div>

    <div class="lesson-meta-bar" style="margin-bottom: 2px;">
      <h2 class="lesson-meta-title">Master Chronology Domino Flowchart (1945–1995)</h2>
      <div class="lesson-meta-enquiry">28 Causal Turning Points Across 50 Years of Middle Eastern Conflict and Diplomacy</div>
    </div>

    <div class="timeline-grid">
      ${DOMINO_TIMELINE.map(
        (node) => `
      <div class="domino-node">
        <span class="domino-year">${node.year}</span>
        <div class="domino-body">
          <span class="domino-title">${node.title}</span>
          <span class="domino-desc">${node.text}</span>
        </div>
      </div>`,
      ).join('')}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 2</span>
      <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGES 3–18: 16 ENQUIRY RETRIEVAL PAGES (12 QUESTIONS PER PAGE)
  // =========================================================================
  CME_PEARSON_QUIZ_BANK.forEach((enq, idx) => {
    const pageNum = idx + 3;
    const cleanTrap = (enq.examinerTrap || '').replace(/^Examiner Warning:\s*/i, '');
    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="running-header">
      <span>${enq.keyTopic}</span>
      <span>Enquiry ${enq.num} of 16</span>
    </div>

    <div class="lesson-meta-bar">
      <h2 class="lesson-meta-title">Enquiry ${enq.num}: ${enq.title}</h2>
      <div class="lesson-meta-enquiry">${enq.enquiry}</div>
    </div>

    <div class="page-body-full" style="justify-content: space-between;">
      ${enq.questions
        .map(
          (q, qIdx) => `
      <div class="q-block">
        <div class="q-header">
          <div class="q-prompt-wrap">
            <span class="q-num">${qIdx + 1}.</span>
            <span class="q-prompt">${q.q}</span>
          </div>
          <span class="q-attempt">[ &nbsp; ]</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Core Fact:</span>
          <div class="q-solid-line"></div>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Explanation:</span>
          <div class="q-solid-line"></div>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="examiner-trap-box">
      <span class="trap-tag">EXAMINER WARNING</span>
      <span class="trap-text">${cleanTrap}</span>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page ${pageNum}</span>
      <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGES 19–22: 4-PAGE DEPARTMENT MARKING BANK (4 ENQUIRIES PER PAGE)
  // =========================================================================
  const MARKING_PAGES = [
    {
      title: 'Key Topic 1: The Birth of Israel & 1948 War (Enquiries 1–4)',
      enqs: [0, 1, 2, 3],
    },
    {
      title: 'Key Topics 1 & 2: Refugees, Suez & Escalation (Enquiries 5–8)',
      enqs: [4, 5, 6, 7],
    },
    {
      title: 'Key Topics 2 & 3: Conquered Lands, Yom Kippur & Oil (Enquiries 9–12)',
      enqs: [8, 9, 10, 11],
    },
    {
      title: 'Key Topic 3: Camp David, Lebanon, Intifada & Oslo (Enquiries 13–16)',
      enqs: [12, 13, 14, 15],
    },
  ];

  MARKING_PAGES.forEach((mp, mpIdx) => {
    const pageNum = 19 + mpIdx;
    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="running-header">
      <span>Department Marking Bank • Green-Pen DIRT Review</span>
      <span>${mp.title}</span>
    </div>

    <div class="mb-meta-bar">
      <span><strong>Department Marking Bank (Part ${mpIdx + 1} of 4):</strong> ${mp.title}</span>
      <span>Self-Assessment Key • Award [✓] Core Fact + [✓] Explanation</span>
    </div>

    <div class="mb-grid-4enq">
      ${mp.enqs
        .map((enqIdx) => {
          const enq = CME_PEARSON_QUIZ_BANK[enqIdx];
          return `
      <div class="mb-enq-card">
        <div class="mb-enq-header">Enquiry ${enq.num}: ${LEDGER_TITLES[enqIdx]}</div>
        <div class="mb-answers-list">
          ${enq.questions
            .map(
              (q, qIdx) => `
          <div class="mb-ans-row">
            <span class="mb-ans-num">${qIdx + 1}.</span>
            <div class="mb-ans-text">
              <span class="mb-ans-bold">${q.a}</span> — ${q.exp}
            </div>
            <span class="mb-check-box">[✓][✗]</span>
          </div>`,
            )
            .join('')}
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page ${pageNum}</span>
      <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGE 23: EDEXCEL PAPER 2 EXAMINATION STRATEGY (QUESTION 1 & QUESTION 2)
  // =========================================================================
  html += `
  <div class="page-container" id="page-23">
    <div class="running-header">
      <span>Edexcel Paper 2 Period Study Examination Strategy</span>
      <span>Question 1 &amp; Question 2 Blueprints (1HI0/2B)</span>
    </div>

    <div class="strat-meta-bar-23">
      <span><strong>Edexcel Paper 2 Question Guide:</strong> Period Study Technical Execution</span>
      <span>Paper 2 Period Study: 28 Marks Total • Target Time: 50 Mins</span>
    </div>

    <div class="strat-stack-23">
      <!-- QUESTION 1: EXPLAIN ONE CONSEQUENCE -->
      <div class="strat-card-q1">
        <div class="strat-card-header">
          <span>Question 1: Explain One Consequence [Single Consequence Format]</span>
          <span class="strat-badge">4 Marks • Target: 5 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"Explain one consequence of [historical event, development, or treaty]..."</em>
        </div>
        <div class="strat-grid-2col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Execution Architecture &amp; Level Rubric</div>
            <div>• <strong>Point (Direct Consequence):</strong> State the single consequence immediately in your opening topic sentence.</div>
            <div>• <strong>Evidence (Precise Corroboration):</strong> Deploy 2 specific factual anchors (dates, treaty names, numbers, or key figures).</div>
            <div>• <strong>Explanation (Causal Mechanism):</strong> Explain exactly *how* and *why* the initial event led directly to this subsequent result.</div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #475569; border-top: 1px dashed #cbd5e1; padding-top: 1px; margin-top: 1px;">
              <strong>Level 2 Descriptor (3–4 Marks):</strong> Accurate, relevant knowledge is deployed with an explicit explanation of the resulting impact.
            </div>
            <div style="background: #e2e8f0; padding: 2px 4px; border-radius: 1px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f172a; margin-top: 1px;">
              Golden Formula: Consequence Statement → 2 Factual Proofs → Causal "So What?" Link
            </div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Four Exemplar Grade 9 Model Answers [4/4 Marks Each]</div>
            <div><strong>Model 1 (1956 Suez Crisis):</strong> <em>"One major consequence was the decisive humiliation of Britain and France, ending their superpower role. US President Eisenhower threatened to collapse the British pound by blocking IMF emergency loans, forcing Anthony Eden to order a ceasefire and resign."</em></div>
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 1px; margin-top: 1px;">
              <strong>Model 2 (1967 Six-Day War):</strong> <em>"One major consequence was the creation of the occupied territories dispute and UN Resolution 242. By capturing Sinai, Gaza, the West Bank, and Golan, Israel established the contested 'Land for Peace' baseline that defined all future peace negotiations."</em>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 1px; margin-top: 1px;">
              <strong>Model 3 (1973 Oil Embargo):</strong> <em>"One major consequence was that it forced Western European nations into a pro-Arab diplomatic shift. When OPEC cut production by 5% monthly and quadrupled prices, fuel shortages compelled European states to distance themselves from Israel to secure oil."</em>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 1px; margin-top: 1px;">
              <strong>Model 4 (1979 Egyptian Peace Treaty):</strong> <em>"One major consequence was the shattering of Arab military unity. By signing a separate peace for the return of Sinai, President Sadat removed Egypt from the conflict, leading to Egypt's expulsion from the Arab League."</em>
            </div>
          </div>
        </div>
        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">EXAMINER RULE</span>
          Under current Edexcel specifications, Question 1 assesses ONE consequence only [4 marks]. Never write two consequences; doing so wastes 5 valuable minutes with zero additional marks awarded!
        </div>
      </div>

      <!-- QUESTION 2: ANALYTICAL NARRATIVE ACCOUNT -->
      <div class="strat-card-q2">
        <div class="strat-card-header">
          <span>Question 2: The Analytical Narrative Account (Chronological Causation)</span>
          <span class="strat-badge">8 Marks • Target: 15 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"Write an analytical narrative account explaining [development]... You may use [Stimulus 1] and [Stimulus 2]. You must also use information of your own."</em>
        </div>

        <div class="strat-grid-3col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 1: Catalyst / Spark</div>
            <div>• <strong>Preconditions:</strong> Establish the initial situation and immediate trigger.</div>
            <div>• <strong>Stimulus 1:</strong> Anchor with the opening stimulus bullet point.</div>
            <div>• <strong>Causal Link:</strong> <em>"This directly precipitated the crisis because..."</em></div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 2: Escalation &amp; Crisis</div>
            <div>• <strong>Mandatory Own Knowledge:</strong> Deploy at least 2 precise historical facts omitted from the two stimulus bullets.</div>
            <div>• <strong>Causal Progression:</strong> <em>"Consequently, this in turn compelled..."</em></div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 3: Climax &amp; Outcome</div>
            <div>• <strong>Stimulus 2 &amp; Result:</strong> Integrate the second stimulus and explain the decisive resolution.</div>
            <div>• <strong>Enduring Consequence:</strong> <em>"As an immediate consequence of this outcome..."</em></div>
          </div>
        </div>

        <!-- DUAL GRADE 9 NARRATIVE MODELS -->
        <div class="strat-grid-2col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Grade 9 Model 1: Outbreak of Six-Day War (1967) [8/8m]</div>
            <em>"The crisis was sparked in May 1967 when President Nasser expelled UNEF peacekeepers from Sinai and closed the Straits of Tiran to Israeli shipping. This directly precipitated war because Israel had declared any maritime blockade an act of war, prompting Prime Minister Eshkol to appoint Moshe Dayan as Defence Minister. This escalation in turn compelled Israel to execute a pre-emptive strike; at 07:45 on 5 June 1967, Operation Focus flew beneath Egyptian radar to destroy over 300 combat aircraft on the ground within three hours. With total air supremacy secured, Israeli armored divisions advanced across Sinai, while counter-attacks captured East Jerusalem, the West Bank, and Golan Heights, achieving total victory in 132 hours."</em>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Grade 9 Model 2: The 1973 Yom Kippur War [8/8m]</div>
            <em>"The war began on 6 October 1973 with a coordinated surprise attack by Egypt and Syria on Yom Kippur. In Operation Badr, Egyptian forces crossed the Suez Canal, breaching the Bar-Lev Line while Syrian armor advanced into the Golan Heights. This Arab breakthrough in turn compelled the US to launch Operation Nickel Grass, airlifting 22,000 tons of munitions to prevent an Israeli collapse. Reinforced by US arms, General Ariel Sharon executed a daring counter-crossing of the Suez Canal, encircling the Egyptian Third Army. This crisis brought the superpowers to the brink of nuclear war before UN Resolution 338 secured a ceasefire on 25 October."</em>
          </div>
        </div>

        <!-- LEVEL 3 OWN KNOWLEDGE GATE MATRIX -->
        <div class="strat-ok-matrix">
          <table class="strat-ok-table">
            <thead>
              <tr>
                <th style="width: 25%;">Narrative Topic</th>
                <th style="width: 35%;">Typical Edexcel Stimulus Bullets</th>
                <th style="width: 40%;">Mandatory Independent Own Knowledge (To Unlock Level 3)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1948–49 Arab-Israeli War</strong></td>
                <td>• UN Partition Plan (1947)<br>• Invasion by 5 Arab states</td>
                <td>Czech arms shipments (Avia fighters) via Operation Balak; Plan Dalet &amp; Deir Yassin; creation of 700,000 refugees.</td>
              </tr>
              <tr>
                <td><strong>1956 Suez Crisis</strong></td>
                <td>• Nasser nationalises canal<br>• Anglo-French invasion</td>
                <td>Protocol of Sèvres collusion; Israeli airborne assault on Mitla Pass; Eisenhower's IMF loan freeze threat forcing withdrawal.</td>
              </tr>
              <tr>
                <td><strong>1987 First Intifada</strong></td>
                <td>• Jabalya camp road collision<br>• Stone-throwing youths vs IDF</td>
                <td>UNLU leaflets directing civil disobedience; tax strikes &amp; boycotts; Rabin's "Iron Fist" policy; 1988 Hamas founding charter.</td>
              </tr>
              <tr>
                <td><strong>1993 Oslo Peace Process</strong></td>
                <td>• 1991 Madrid Conference<br>• White House lawn handshake</td>
                <td>Secret backchannel in Oslo (Holst &amp; Larsen); Letters of Mutual Recognition; division of West Bank into Areas A, B, and C.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="strat-connectives-bar">
          <strong>Chronological &amp; Causal Connective Bank:</strong> <em>"The crisis was sparked when...", "This directly precipitated...", "Consequently, this in turn compelled...", "Left with no alternative, X responded by...", "As an immediate consequence of this outcome...", "This proved decisive because..."</em>
        </div>

        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">GRADE 9 CRITERIA</span>
          Level 3 (7–8 marks) requires sustained chronological causation throughout. Every paragraph must explicitly explain how event A caused event B. Deploying independent own knowledge beyond the stimulus points is strictly mandatory to unlock Level 3!
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 23</span>
      <span class="footer-quip">${APPROVED_FOOTERS[22]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 24: EDEXCEL PAPER 2 QUESTION 3 IMPORTANCE & DIGITAL REVISION HUB
  // =========================================================================
  html += `
  <div class="page-container" id="page-24">
    <div class="running-header">
      <span>Edexcel Paper 2 Period Study Examination Strategy</span>
      <span>Question 3 Importance Architect &amp; Back Cover (1HI0/2B)</span>
    </div>

    <div class="strat-meta-bar-24">
      <span><strong>Question 3 Importance Analysis Architect:</strong> Grade 9 Evaluative Structure</span>
      <span>16 Marks Total (Choose Exactly 2 of 3 Options: 2 × 8m) • Target: 30 Mins (15 Mins Each)</span>
    </div>

    <div class="strat-stack-24">
      <!-- 16-MARK IMPORTANCE ARCHITECT CARD -->
      <div class="strat-card-24">
        <div>
          <div class="strat-header-24">
            <span>Question 3: The Importance Analysis Architect (2 × 8 Marks = 16 Marks)</span>
            <span class="strat-header-badge">2 × 8m • 30 Mins (15 Mins Each)</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.7pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Official Stem:</strong> <em>"Explain two of the following: The importance of [Event A] for [Focus]... The importance of [Event B] for [Focus]... The importance of [Event C] for [Focus]..."</em>
          </div>

          <div class="strat-selection-protocol">
            <strong>The 2-Minute Selection Rule:</strong> Edexcel provides 3 options—you must choose <strong>EXACTLY TWO</strong>. Select the two events where you can deploy the most specific factual anchors. Never attempt all three; doing so wastes 15 minutes because examiners mark only two!
          </div>

          <div class="strat-essay-grid-24" style="margin-top: 3px;">
            <div class="strat-essay-step-24">
              <div class="strat-step-num">Paragraph 1: Direct &amp; Immediate Impact [4 Marks]</div>
              <div>• <strong>Focus Anchor:</strong> Explain how the event immediately transformed the situation regarding the specified question focus.</div>
              <div>• <strong>Deploy Evidence:</strong> Ground analysis in 2 precise historical facts (treaty terms, casualties, territorial changes).</div>
              <div>• <strong>Analytical Sentence Stem:</strong> <em>"The primary immediate importance of [Event] lay in..."</em></div>
            </div>
            <div class="strat-essay-step-24">
              <div class="strat-step-num">Paragraph 2: Long-Term Significance &amp; Legacy [4 Marks]</div>
              <div>• <strong>Enduring Transformation:</strong> Analyze what lasting precedent, realignment, or subsequent conflict was caused.</div>
              <div>• <strong>Broader Trajectory:</strong> Explain how it fundamentally reshaped Arab-Israeli diplomacy or military strategy.</div>
              <div>• <strong>Analytical Sentence Stem:</strong> <em>"In the longer term, [Event] was historically decisive because it..."</em></div>
            </div>
          </div>
        </div>

        <!-- Grade 9 Triple Models Grid -->
        <div class="strat-models-grid-3col">
          <div class="strat-model-para-24">
            <div class="strat-model-tag">Exemplar 1: Camp David Accords [8/8m]</div>
            <em>"The Camp David Accords (1978) were of profound importance because they permanently fractured Arab military unity by removing Egypt—the largest Arab military state—from the conflict. In exchange for the Sinai Peninsula, President Sadat signed a separate peace, eliminating the threat of a two-front war for Israel. In the long term, Arab League states expelled Egypt and relocated to Tunis, granting Israel strategic southern security that enabled its 1982 invasion of Lebanon."</em>
          </div>
          <div class="strat-model-para-24">
            <div class="strat-model-tag">Exemplar 2: 1973 Yom Kippur War [8/8m]</div>
            <em>"The Yom Kippur War was of immense importance for superpower relations because it brought the USA and USSR to the brink of direct nuclear confrontation. When the USSR threatened unilateral intervention to save the Egyptian Third Army, the US placed its nuclear forces on DEFCON 3 alert. In the long term, this crisis demonstrated that regional proxy wars could spark global war, compelling Kissinger to launch 'shuttle diplomacy' that displaced Soviet influence from Cairo."</em>
          </div>
          <div class="strat-model-para-24">
            <div class="strat-model-tag">Exemplar 3: Munich Olympics Massacre [8/8m]</div>
            <em>"The 1972 Munich massacre was of critical importance because it catapulted the Palestinian national struggle onto the global stage before a live television audience of 900 million. While the murder of 11 Israeli athletes drew international condemnation and sparked Israel's covert Operation Wrath of God, it destroyed the myth that Palestinians were merely passive refugees. In the long term, it forced world powers to treat the PLO as a national liberation movement, leading to Arafat's 1974 UN address."</em>
          </div>
        </div>

        <!-- Question 3 High-Frequency Past Paper Targets -->
        <div class="strat-ok-matrix">
          <table class="strat-ok-table">
            <thead>
              <tr>
                <th style="width: 28%;">Edexcel Question 3 Event</th>
                <th style="width: 24%;">Question Focus</th>
                <th style="width: 48%;">Key Analytical Angle (Immediate Impact vs Long-Term Legacy)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Law of Return (1950)</strong></td>
                <td>Development of Israel</td>
                <td>Immediate: Influx of 680,000 immigrants doubling population; Long-term: Permanent Jewish demographic majority.</td>
              </tr>
              <tr>
                <td><strong>UN Resolution 242 (1967)</strong></td>
                <td>Search for Peace</td>
                <td>Immediate: Established "Land for Peace" formula; Long-term: Disputed English/French wording stalled diplomacy for decades.</td>
              </tr>
              <tr>
                <td><strong>1973 Arab Oil Embargo</strong></td>
                <td>International Relations</td>
                <td>Immediate: 400% oil price hike &amp; Western panic; Long-term: Forced EEC into pro-Arab diplomatic stance away from Israel.</td>
              </tr>
              <tr>
                <td><strong>1982 Siege of Beirut</strong></td>
                <td>The PLO</td>
                <td>Immediate: Destruction of military infrastructure &amp; exile to Tunis; Long-term: Arafat compelled towards diplomatic recognition.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Evaluative Discourse Markers Bank -->
        <div class="strat-starters-grid">
          <div class="strat-starter-box">
            <div class="strat-starter-title">Immediate Impact Stems</div>
            • <em>"The primary immediate significance of X was..."</em><br>
            • <em>"This instantly transformed the strategic balance by..."</em>
          </div>
          <div class="strat-starter-box">
            <div class="strat-starter-title">Long-Term Legacy Stems</div>
            • <em>"In the longer term, X proved decisive because..."</em><br>
            • <em>"This established the lasting precedent that..."</em>
          </div>
          <div class="strat-starter-box">
            <div class="strat-starter-title">Direct Focus Stems</div>
            • <em>"With specific regard to [Focus], this proved..."</em><br>
            • <em>"Consequently, the enduring importance for Y was..."</em>
          </div>
        </div>

        <div class="strat-criteria-box">
          <strong>Level 3 (Grade 9) Examiner Mark Scheme Requirements:</strong>
          Selects exactly 2 options • Focuses directly on the specified historical relationship rather than describing what happened • Explains both immediate impact and long-term significance • Deploys accurate, detailed historical knowledge throughout.
        </div>
      </div>

      <!-- EXAMINER PITFALLS RED STRIP -->
      <div class="strat-traps-bar-fixed">
        <span class="trap-tag" style="background: #b91c1c;">EXAMINER PITFALLS</span>
        <span class="strat-traps-list">
          <strong>5 Fatal Period Study Traps:</strong> 1. On Q1: Describing the event instead of its consequence • 2. Writing 2 consequences when only 1 is required • 3. On Q2: Writing a descriptive story without causal connectors • 4. On Q2: Failing to include own knowledge beyond stimulus points (capped at 5/8) • 5. On Q3: Answering all 3 choices instead of exactly 2.
        </span>
      </div>

      <!-- DIGITAL REVISION HUB CARD -->
      <div class="back-hub-card">
        <div class="back-hub-qr">${qrSvg}</div>
        <div class="back-hub-info">
          <div class="back-hub-title">Digital Revision Hub &amp; Interactive Quizzes</div>
          <div class="back-hub-desc">
            Scan to access 16 self-marking retrieval quizzes, digital flashcards, animated campaign maps, and verified Edexcel Paper 2 model answers.
          </div>
          <div class="back-hub-features">
            <span class="hub-feature-tag">✓ 16 Self-Marking Quizzes</span>
            <span class="hub-feature-tag">✓ Digital Flashcard Vault</span>
            <span class="hub-feature-tag">✓ Period Study Model Bank</span>
          </div>
          <div class="back-hub-url">the-history-revision-hub.netlify.app/?unit=cme_new</div>
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 24</span>
      <span class="footer-quip">${APPROVED_FOOTERS[23]}</span>
      <span class="footer-page-num">1HI0/2B</span>
    </div>
  </div>
</body>
</html>`;

  return html;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION ENGINE & PUPPETEER EXPORT
// --------------------------------------------------------------------------
async function compilePdf() {
  console.log('🚀 Compiling Master 24-Page A4 Conflict in the Middle East Retrieval Companion...');

  const html = buildHtml();
  const htmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'cme_new',
    'cme_master_retrieval_companion.html',
  );
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`📄 Saved HTML source to: ${htmlPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

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
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: CME COMPANION (24 PAGES)');
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

  const targetPdf = path.join(
    PDFS_DIR,
    'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
  );

  await page.pdf({
    path: targetPdf,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 24-Page A4 PDF: ${targetPdf}`);

  // Take visual screenshots for user inspection
  const debugDir = path.join(ROOT_DIR, 'public', 'images', 'cme_pages');
  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
  }

  for (let pNum = 1; pNum <= 24; pNum++) {
    const el = await page.$(`#page-${pNum}`);
    if (el) {
      await el.screenshot({ path: path.join(debugDir, `page_${pNum}.png`) });
    }
  }
  console.log(`📸 Rendered high-resolution screenshots for all 24 pages in: ${debugDir}`);

  await browser.close();

  // Mirror to Google Drive Department File if available
  try {
    if (fs.existsSync(DRIVE_BASE)) {
      const gDriveTargets = [
        path.join(
          DRIVE_BASE,
          '02. GCSE (Years 10-11)',
          'Paper 2 - Conflict in the Middle East',
          'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
        ),
        path.join(
          DRIVE_BASE,
          'pdfs',
          'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
        ),
      ];

      gDriveTargets.forEach((dest) => {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(targetPdf, dest);
        console.log(`☁️ Synced to Google Drive Department File: ${dest}`);
      });
      console.log('✅ Google Drive Department File updated with fresh 24-page A4 companion.');
    }
  } catch (err) {
    console.warn('⚠️ Warning: Google Drive sync issue:', err.message);
  }

  if (hasErrors) {
    console.warn('⚠️ Some pages showed overflow during compilation. Inspect audit table above.');
  } else {
    console.log(
      '🎉 100% SUCCESS: All 24 pages compiled cleanly with 0px overflow! Ready for reprographics.',
    );
  }
}

if (require.main === module) {
  compilePdf().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { compilePdf };
