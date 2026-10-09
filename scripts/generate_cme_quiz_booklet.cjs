/**
 * generate_cme_quiz_booklet.cjs
 *
 * Compiles the Master 24-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 2 (1HI0/2B / Option P5): Conflict in the Middle East, 1945–1995.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 16 enquiries (8 tiered questions per enquiry = 128 questions)
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
// PEARSON EDEXCEL SPECIFICATION TOPIC MAPPINGS FOR COVER LEDGER (16 ENQUIRIES)
// --------------------------------------------------------------------------
const LEDGER_ENTRIES = [
  {
    num: 1,
    topicCode: 'KT 1.1',
    title: 'Post-War Mandate Crisis (1945–47)',
    focus: 'British policy, Jewish DPs, Balfour vs 1939 White Paper & UN handover',
  },
  {
    num: 2,
    topicCode: 'KT 1.1',
    title: 'Armed Jewish Insurgency (1945–47)',
    focus: 'Haganah, Irgun, King David Hotel bombing & British exit decision',
  },
  {
    num: 3,
    topicCode: 'KT 1.2',
    title: 'UN Partition & Civil War (1947–48)',
    focus: 'Resolution 181 (56%/43%), communal civil war, Plan Dalet & Deir Yassin',
  },
  {
    num: 4,
    topicCode: 'KT 1.2',
    title: 'First Arab-Israeli War (1948–49)',
    focus: 'Declaration of Israel, 5-state invasion, Czech arms & Rhodes Green Line',
  },
  {
    num: 5,
    topicCode: 'KT 1.2',
    title: 'Palestinian Nakba & Early Israel',
    focus: '700,000 refugees, UNRWA relief, 1950 Law of Return & state survival',
  },
  {
    num: 6,
    topicCode: 'KT 1.3',
    title: 'Suez Crisis & Superpowers (1956)',
    focus: 'Canal nationalisation, Protocol of Sèvres collusion & US ultimatum',
  },
  {
    num: 7,
    topicCode: 'KT 2.1',
    title: 'Road to Six-Day War (1964–67)',
    focus: 'Water disputes, PLO/Fatah raids, Golan clashes & Tiran blockade',
  },
  {
    num: 8,
    topicCode: 'KT 2.1',
    title: 'Six-Day War: 100-Hour Blitz (1967)',
    focus: 'Operation Focus air strike & conquest of Sinai, Gaza, West Bank, Golan',
  },
  {
    num: 9,
    topicCode: 'KT 2.2',
    title: 'Occupied Lands & Res 242 (1967–73)',
    focus: "Khartoum 'Three Noes', Land for Peace ambiguity & Jewish settlements",
  },
  {
    num: 10,
    topicCode: 'KT 2.2',
    title: 'Palestinian Resistance & Terror (1968–72)',
    focus: "Battle of Karameh, Dawson's Field, Black September & Munich Olympics",
  },
  {
    num: 11,
    topicCode: 'KT 2.3',
    title: 'The 1973 Yom Kippur War',
    focus: 'Sadat surprise crossing, Bar-Lev breach, US airlift & Soviet tension',
  },
  {
    num: 12,
    topicCode: 'KT 2.3 / 3.1',
    title: '1973 Oil Crisis & Shuttle Diplomacy',
    focus: 'OPEC oil embargo quadruples prices & Kissinger step-by-step accords',
  },
  {
    num: 13,
    topicCode: 'KT 3.1',
    title: 'Camp David & 1979 Peace Treaty',
    focus: 'Sadat Knesset speech, Carter mediation, Sinai return & Arab backlash',
  },
  {
    num: 14,
    topicCode: 'KT 3.2',
    title: '1982 Lebanon War & Hezbollah',
    focus: 'Op Peace for Galilee, Beirut siege, Sabra-Shatila & PLO to Tunis',
  },
  {
    num: 15,
    topicCode: 'KT 3.3',
    title: 'First Intifada & Rise of Hamas (1987–93)',
    focus: 'Stone-throwing uprising, Iron Fist policy, Hamas charter & PLO shift',
  },
  {
    num: 16,
    topicCode: 'KT 3.3',
    title: 'Oslo Accords & Aftermath (1993–95)',
    focus: 'Secret Oslo talks, White House handshake, PA rule & Rabin murder',
  },
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
  const qrHub = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=cme_new');
  const qrKt1 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=cme_new#kt1');
  const qrKt2 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=cme_new#kt2');
  const qrKt3 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=cme_new#kt3');

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
      margin-bottom: 3px;
    }
    .hw-ledger-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      flex: 1;
    }
    .hw-ledger-table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
    }
    .hw-ledger-table thead th {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 4.5px;
      font-weight: 900;
      text-transform: uppercase;
      border: 1.2px solid #0f172a;
      font-size: 7.2pt;
      letter-spacing: 0.3px;
    }
    .hw-ledger-table td {
      border: 1.2px solid #cbd5e1;
      padding: 3px 4.5px;
      vertical-align: middle;
      color: #000000;
      line-height: 1.16;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    .hw-col-title {
      background: #0f172a !important;
      color: #ffffff;
      font-size: 7.6pt;
      font-weight: 900;
      text-align: center;
      padding: 3.5px 5px !important;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .hw-enq-name {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 3px;
      line-height: 1.15;
    }
    .hw-topic-tag {
      background: #0f172a;
      color: #ffffff;
      font-size: 5.7pt;
      font-weight: 800;
      padding: 0.5px 3px;
      border-radius: 2px;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    .hw-enq-focus-text {
      font-family: 'Georgia', serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #334155;
      margin-top: 1.5px;
    }

    .cover-protocol-box {
      border: 1.4px solid #0f172a;
      border-left: 5px solid #0f172a;
      border-radius: 2px;
      padding: 5.5px 10px;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      line-height: 1.32;
      color: #1e293b;
      margin-top: 2px;
    }
    .cover-protocol-box strong.proto-title {
      color: #0f172a;
      font-size: 8.1pt;
      margin-bottom: 2.5px;
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
      padding: 2.5px 8px;
      margin-bottom: 2px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .lesson-meta-left { flex: 1; }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .lesson-score-pill {
      background: #ffffff;
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      padding: 1.5px 6px;
      text-align: center;
      margin-left: 8px;
      flex-shrink: 0;
    }
    .score-pill-title {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .score-pill-val {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.1;
    }
    .score-pill-sub {
      font-family: 'Inter', sans-serif;
      font-size: 5.4pt;
      font-weight: 700;
      color: #475569;
    }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.8px 6px;
      margin-bottom: 2.0px;
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
    .q-num { font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000; min-width: 17px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 9.6pt; font-weight: 700; color: #000000; line-height: 1.18; }
    .q-attempt-dual {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #334155;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 3.5px;
    }
    .q-tick-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 0.5px 3.5px;
      font-size: 6.2pt;
      font-weight: 700;
      color: #1e293b;
    }
    .q-tick-tot {
      font-size: 7.0pt;
      font-weight: 900;
      color: #0f172a;
    }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      min-width: 65px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.2px solid #000000;
      height: 8.4mm;
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
      padding: 2.0px 1px;
      font-size: 7.6pt;
      line-height: 1.24;
      display: flex;
      gap: 4px;
      align-items: baseline;
    }
    .mb-ans-row:last-child { border-bottom: none; }
    .mb-ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; min-width: 15px; }
    .mb-ans-text { flex: 1; color: #000000; font-weight: 500; }
    .mb-ans-bold { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 7.8pt; }
    .mb-check-box { font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; color: #000000; white-space: nowrap; }

    /* Page 23: Period Study Question 1 & Question 2 Strategy */
    .strat-meta-bar-23 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
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
      justify-content: flex-start;
      gap: 7px;
      margin: 1px 0;
    }
    .strat-card-q1 {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .strat-card-q2 {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
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
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }
    .strat-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4.5px;
    }
    .strat-subbox {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 3.5px 5.5px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 7.2pt;
      line-height: 1.25;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1.5px;
    }
    .strat-subbox-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .strat-model-q1-box {
      border: 1px solid #0284c7;
      border-left: 3.5px solid #0284c7;
      background: #f0f9ff;
      padding: 3.5px 6px;
      border-radius: 2px;
      font-size: 6.9pt;
      line-height: 1.22;
      color: #0c4a6e;
    }
    .strat-model-q1-header {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #0369a1;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }
    .strat-model-q1-stem {
      font-family: 'Georgia', serif;
      font-size: 7.0pt;
      color: #0f172a;
      margin-bottom: 1.5px;
    }
    .strat-model-q1-body {
      font-family: 'Georgia', serif;
      font-size: 6.9pt;
      line-height: 1.22;
      color: #1e293b;
      font-style: italic;
      margin-bottom: 2px;
    }
    .strat-model-q1-breakdown {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.20;
      color: #0369a1;
      border-top: 1px dashed #bae6fd;
      padding-top: 1.5px;
    }
    .strat-qbank-box {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 3.5px 5.5px;
      border-radius: 2px;
    }
    .strat-qbank-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .strat-qbank-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5px 8px;
    }
    .strat-qbank-item {
      font-family: 'Georgia', serif;
      font-size: 7.1pt;
      line-height: 1.22;
      color: #1e293b;
    }
    .strat-qbank-item strong {
      font-family: 'Inter', sans-serif;
      color: #0f172a;
      font-size: 7.0pt;
    }
    .strat-q2-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 6.5px;
    }
    .strat-q2-card {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      background: #f8fafc;
      padding: 3px 5px;
      border-radius: 2px;
      font-size: 6.8pt;
      line-height: 1.18;
    }
    .strat-q2-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.1pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .strat-q2-stimulus {
      font-family: 'Georgia', serif;
      font-size: 6.7pt;
      color: #334155;
      line-height: 1.16;
    }
    .strat-q2-ok {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 700;
      color: #991b1b;
      margin-top: 1px;
    }
    .strat-q2-chain {
      font-family: 'Georgia', serif;
      font-size: 6.5pt;
      font-style: italic;
      color: #1e3a8a;
      line-height: 1.15;
      margin-top: 1px;
    }
    .strat-mini-trap {
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.22;
      color: #991b1b;
      font-weight: 700;
      display: flex;
      align-items: baseline;
      gap: 5px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 2.5px 5.5px;
      border-radius: 2px;
    }
    .strat-connectives-bar {
      border: 1px solid #cbd5e1;
      background: #f1f5f9;
      padding: 3px 6px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      color: #334155;
      line-height: 1.22;
    }

    /* Page 24: Period Study Question 3 Importance & Digital Revision Hub */
    .strat-meta-bar-24 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
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
      justify-content: space-between;
      gap: 5px;
      margin: 1px 0;
    }
    .strat-card-24 {
      border: 1.4px solid #0f172a;
      border-radius: 2px;
      padding: 6.5px 9px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .strat-header-24 {
      font-family: 'Inter', sans-serif;
      font-size: 9.4pt;
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
      font-size: 7.1pt;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1.5px 6px;
      border-radius: 2px;
      font-weight: 800;
    }
    .strat-selection-protocol {
      border: 1px solid #0284c7;
      background: #f0f9ff;
      border-left: 3.5px solid #0284c7;
      padding: 3.5px 7px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      line-height: 1.25;
      color: #0369a1;
      font-weight: 600;
    }
    .strat-q3-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 7.5px;
    }
    .strat-q3-card {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      background: #f8fafc;
      padding: 3.8px 7px;
      border-radius: 2px;
    }
    .strat-q3-header {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .strat-q3-focus {
      color: #1e3a8a;
      font-weight: 800;
      font-size: 7.2pt;
    }
    .strat-q3-options {
      font-family: 'Georgia', serif;
      font-size: 7.4pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .strat-starters-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5.5px;
    }
    .strat-starter-box {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 4px 7px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 7.4pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .strat-starter-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1.5px;
    }
    .strat-criteria-box {
      border: 1px dashed #0f172a;
      background: #f1f5f9;
      padding: 4px 7.5px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .strat-traps-box-p24 {
      border: 1.3px solid #b91c1c;
      border-left: 5px solid #b91c1c;
      background: #fef2f2;
      padding: 5.5px 9.5px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }
    .strat-traps-header-p24 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fecaca;
      padding-bottom: 2px;
    }
    .strat-traps-grid-p24 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 12px;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      line-height: 1.25;
      color: #7f1d1d;
    }
    .strat-trap-item strong {
      color: #991b1b;
      font-weight: 800;
    }
    .back-hub-grid-wrap {
      border: 1.4px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 1px;
    }
    .back-hub-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
    }
    .back-hub-banner-title {
      font-size: 8.0pt;
      font-weight: 900;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .back-hub-banner-sub {
      font-size: 6.9pt;
      color: #94a3b8;
      font-weight: 700;
    }
    .back-hub-gateways-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      padding: 6px 8px;
    }
    .hub-gw-card {
      background: #ffffff;
      border: 1.1px solid #cbd5e1;
      border-radius: 2px;
      padding: 4.5px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 2.5px;
    }
    .hub-gw-qr {
      width: 63px;
      height: 63px;
      background: #ffffff;
      padding: 1px;
      border: 1px solid #e2e8f0;
    }
    .hub-gw-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5px;
    }
    .hub-gw-badge {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      font-weight: 800;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.2px;
    }
    .hub-gw-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
    }
    .hub-gw-desc {
      font-family: 'Georgia', serif;
      font-size: 6.3pt;
      color: #475569;
      line-height: 1.18;
    }
    .back-hub-url {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.4px;
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
      <p class="cover-sub-title">Pearson Edexcel GCSE (9–1) History • Option P5 (Paper 2) • Master Knowledge Companion (128 Core Exam Questions)</p>
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
              <th style="width: 50%;">Enquiry &amp; Specification Focus</th>
              <th style="width: 12%;">Due Date</th>
              <th style="width: 15%;">Score (/16)<br><span style="font-size: 5.6pt; font-weight: normal; opacity: 0.9;">8 Qs × 2m</span></th>
              <th style="width: 15%;">Parent Sign</th>
              <th style="width: 8%;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${LEDGER_ENTRIES.slice(0, 8)
              .map(
                (item) => `
            <tr>
              <td>
                <div class="hw-enq-name">
                  <span class="hw-topic-tag">${item.topicCode}</span>
                  <span>Enq ${item.num}: ${item.title}</span>
                </div>
                <div class="hw-enq-focus-text">${item.focus}</div>
              </td>
              <td style="text-align: center; font-size: 7.2pt; color: #64748b;">____/____</td>
              <td style="text-align: center; font-weight: 700; font-size: 7.4pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 16</td>
              <td></td>
              <td style="text-align: center; color: #94a3b8; font-size: 6.8pt;">[ &nbsp; ]</td>
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
              <th style="width: 50%;">Enquiry &amp; Specification Focus</th>
              <th style="width: 12%;">Due Date</th>
              <th style="width: 15%;">Score (/16)<br><span style="font-size: 5.6pt; font-weight: normal; opacity: 0.9;">8 Qs × 2m</span></th>
              <th style="width: 15%;">Parent Sign</th>
              <th style="width: 8%;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${LEDGER_ENTRIES.slice(8, 16)
              .map(
                (item) => `
            <tr>
              <td>
                <div class="hw-enq-name">
                  <span class="hw-topic-tag">${item.topicCode}</span>
                  <span>Enq ${item.num}: ${item.title}</span>
                </div>
                <div class="hw-enq-focus-text">${item.focus}</div>
              </td>
              <td style="text-align: center; font-size: 7.2pt; color: #64748b;">____/____</td>
              <td style="text-align: center; font-weight: 700; font-size: 7.4pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 16</td>
              <td></td>
              <td style="text-align: center; color: #94a3b8; font-size: 6.8pt;">[ &nbsp; ]</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="cover-protocol-box">
        <strong class="proto-title">Department Retrieval Protocol &amp; Spaced Learning Standards:</strong>
        Complete one enquiry weekly as targeted homework. Each question has a 2-mark structure: <strong>Core Fact</strong> (Line 1: 1 mark for the precise historical anchor, date, key figure, or battle) and <strong>Historical Explanation</strong> (Line 2: 1 mark for the causal mechanism or significance). Total: 8 questions × 2 marks = <strong>16 marks per enquiry</strong>. Self-assess in class using green pen against the verified Department Marking Bank on pages 19–22. Scores below 12/16 trigger immediate digital flashcard consolidation.
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
  // PAGES 3–18: 16 ENQUIRY RETRIEVAL PAGES (8 QUESTIONS PER PAGE)
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
      <div class="lesson-meta-left">
        <h2 class="lesson-meta-title">Enquiry ${enq.num}: ${enq.title}</h2>
        <div class="lesson-meta-enquiry"><strong>Enquiry Focus:</strong> ${enq.enquiry}</div>
      </div>
      <div class="lesson-score-pill">
        <div class="score-pill-title">ENQUIRY SCORE</div>
        <div class="score-pill-val">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 16</div>
        <div class="score-pill-sub">Fact: __/8 • Expl: __/8</div>
      </div>
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
          <span class="q-attempt-dual">
            <span class="q-tick-pill">Fact: [ &nbsp; ]</span>
            <span class="q-tick-pill">Expl: [ &nbsp; ]</span>
            <span class="q-tick-tot">/ 2m</span>
          </span>
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
        <div class="mb-enq-header">Enquiry ${enq.num}: ${LEDGER_ENTRIES[enqIdx].title}</div>
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
      <span>Question 1 &amp; Question 2 Blueprints &amp; Master Banks (1HI0/2B)</span>
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
            <div class="strat-subbox-title">Execution Architecture &amp; Level 2 Rubric</div>
            <div>• <strong>Point (Consequence Sentence):</strong> State the single consequence directly in your opening sentence.</div>
            <div>• <strong>Evidence (Precise Corroboration):</strong> Deploy 2 specific factual anchors (dates, treaty names, numbers, or key figures).</div>
            <div>• <strong>Explanation (Causal Link):</strong> Explain exactly *how* and *why* the initial event produced this lasting result.</div>
            <div style="background: #e2e8f0; padding: 1.5px 4px; border-radius: 1px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #0f172a; margin-top: 1px;">
              Golden Formula: Consequence Statement → 2 Factual Proofs → Causal "So What?" Link
            </div>
          </div>

          <div class="strat-subbox">
            <div class="strat-subbox-title">Examiner Strategy &amp; Golden Rules</div>
            <div>• <strong>Single Consequence Rule:</strong> Only ONE consequence is credited. Writing two wastes valuable time with 0 extra marks.</div>
            <div>• <strong>Avoid Narrative Drift:</strong> Do not explain *why* the event happened; focus 100% on the *aftermath and results*.</div>
            <div>• <strong>Time Target:</strong> Strictly 5 minutes. Allocate 1 minute to plan and 4 minutes to write one precise PEEL paragraph.</div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #991b1b; font-weight: 700; border-top: 1px dashed #cbd5e1; padding-top: 1px; margin-top: 1px;">
              Fatal Trap: Describing the event instead of its consequence caps your mark at Level 1 (1–2 marks)!
            </div>
          </div>
        </div>

        <!-- LEVEL 2 (GRADE 9) EXEMPLAR MODEL PARAGRAPH -->
        <div class="strat-model-q1-box">
          <div class="strat-model-q1-header">
            <span>Verified Grade 9 Exemplar Answer [Level 2 • 4/4 Marks]</span>
            <span style="font-weight: 600; color: #475569;">Target Time: 4 Mins</span>
          </div>
          <div class="strat-model-q1-stem">
            <strong>Practice Prompt:</strong> <em>"Explain one consequence of the 1956 Suez Crisis for Great Britain's global superpower standing." [4 marks]</em>
          </div>
          <div class="strat-model-q1-body">
            "One consequence of the Suez Crisis was the decisive collapse of Great Britain's standing as an independent global superpower. In November 1956, after Britain, France, and Israel secretly colluded under the Protocol of Sèvres to invade Egypt, US President Eisenhower threatened to collapse the British pound by blocking a critical $1.3 billion IMF loan and withholding oil supplies unless British troops withdrew immediately. Prime Minister Anthony Eden was forced into a humiliating and unconditional retreat within days. This exposed Britain's total economic and military subordination to the United States, effectively ending over two centuries of British imperial dominance in the Middle East."
          </div>
          <div class="strat-model-q1-breakdown">
            <strong>Examiner Breakdown (4/4 Marks):</strong> <strong>✓ Point:</strong> States explicit consequence in line 1. <strong>✓ Evidence:</strong> Cites Protocol of Sèvres, Eisenhower IMF loan freeze, and Anthony Eden. <strong>✓ Explanation:</strong> Explicitly explains how US financial leverage forced retreat and ended imperial dominance.
          </div>
        </div>

        <!-- QUESTION 1 HIGH-PROBABILITY QUESTION BANK -->
        <div class="strat-qbank-box">
          <div class="strat-qbank-title">
            <span>High-Probability Question 1 Practice Bank (10 Specification Targets)</span>
            <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">1 Consequence • 4 Marks</span>
          </div>
          <div class="strat-qbank-grid-2col">
            <div class="strat-qbank-item"><strong>1. 1946:</strong> Explain one consequence of the King David Hotel bombing for British rule in Palestine.</div>
            <div class="strat-qbank-item"><strong>2. 1947:</strong> Explain one consequence of the UN Partition Plan (Resolution 181) for Arab-Jewish relations.</div>
            <div class="strat-qbank-item"><strong>3. 1948:</strong> Explain one consequence of the 1948–49 Arab-Israeli War for Palestinian Arabs (the Nakba).</div>
            <div class="strat-qbank-item"><strong>4. 1950:</strong> Explain one consequence of the Israeli Law of Return for the State of Israel.</div>
            <div class="strat-qbank-item"><strong>5. 1956:</strong> Explain one consequence of the Suez Crisis for Great Britain's global superpower standing.</div>
            <div class="strat-qbank-item"><strong>6. 1967:</strong> Explain one consequence of the Six-Day War for United Nations diplomacy (Resolution 242).</div>
            <div class="strat-qbank-item"><strong>7. 1968:</strong> Explain one consequence of the Battle of Karameh for the Palestine Liberation Organization (PLO).</div>
            <div class="strat-qbank-item"><strong>8. 1973:</strong> Explain one consequence of the Yom Kippur War for Arab oil diplomacy (OAPEC).</div>
            <div class="strat-qbank-item"><strong>9. 1978:</strong> Explain one consequence of the Camp David Accords for Egypt's standing in the Arab world.</div>
            <div class="strat-qbank-item"><strong>10. 1987:</strong> Explain one consequence of the First Palestinian Intifada for the Israeli government.</div>
          </div>
        </div>

        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">EXAMINER RULE</span>
          Under current Pearson Edexcel specifications, Question 1 assesses ONE consequence only [4 marks]. Never write two consequences; doing so wastes 5 valuable minutes with zero additional marks awarded!
        </div>
      </div>

      <!-- QUESTION 2: ANALYTICAL NARRATIVE ACCOUNT -->
      <div class="strat-card-q2">
        <div class="strat-card-header">
          <span>Question 2: The Analytical Narrative Account (Chronological Causation)</span>
          <span class="strat-badge">8 Marks • Target: 15 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"Write a narrative account analysing [development]... You may use [Stimulus 1] and [Stimulus 2]. You must also use information of your own."</em>
        </div>

        <div class="strat-grid-3col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 1: Catalyst / Spark (¶1)</div>
            <div>• <strong>Preconditions:</strong> Establish initial trigger.</div>
            <div>• <strong>Stimulus 1:</strong> Anchor with opening stimulus bullet.</div>
            <div>• <strong>Causal Link:</strong> <em>"This directly precipitated the crisis because..."</em></div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 2: Escalation &amp; Conflict (¶2)</div>
            <div>• <strong>Mandatory Own Knowledge:</strong> Deploy at least 2 facts omitted from stimulus bullets.</div>
            <div>• <strong>Causal Progression:</strong> <em>"Consequently, this in turn compelled..."</em></div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Phase 3: Climax &amp; Resolution (¶3)</div>
            <div>• <strong>Stimulus 2:</strong> Integrate second stimulus bullet.</div>
            <div>• <strong>Decisive Outcome:</strong> Explain the resolution.</div>
            <div>• <strong>Enduring Result:</strong> <em>"As an immediate consequence..."</em></div>
          </div>
        </div>

        <!-- QUESTION 2 HIGH-PROBABILITY NARRATIVE PRACTICE BANK (8 SPECIFICATION ARCS) -->
        <div class="strat-qbank-box" style="padding: 2.5px 5px;">
          <div class="strat-qbank-title">
            <span>High-Probability Question 2 Narrative Practice Bank (8 Major Chronological Arcs)</span>
            <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">8 Marks • 3-Phase Chronological Framework &amp; Own Knowledge Gate</span>
          </div>
          <div class="strat-q2-grid">
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">1. British Withdrawal from Palestine (1945–48)</div>
              <div class="strat-q2-stimulus">Stimulus: • King David Hotel bombing (1946) • UN Partition Plan (1947)</div>
              <div class="strat-q2-ok">Own Knowledge: SS Exodus crisis / Bevin's 1,500 monthly quota / Sergeants affair</div>
              <div class="strat-q2-chain">Causal Chain: Post-war insurgency &amp; Exodus → British crisis &amp; UN referral → May 1948 withdrawal.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">2. The 1948–49 Arab-Israeli War</div>
              <div class="strat-q2-stimulus">Stimulus: • Declaration of State of Israel (May 1948) • UN ceasefires</div>
              <div class="strat-q2-ok">Own Knowledge: Haganah/Irgun merger into IDF / Czech arms shipments (Op Balak)</div>
              <div class="strat-q2-chain">Causal Chain: 5-nation Arab invasion → IDF truce rearmament &amp; counter-offensives → 1949 armistices.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">3. The Suez Crisis of 1956</div>
              <div class="strat-q2-stimulus">Stimulus: • Nationalisation of Suez Canal (July 1956) • Protocol of Sèvres</div>
              <div class="strat-q2-ok">Own Knowledge: Israeli Mitla Pass assault / Eisenhower's IMF loan freeze threat</div>
              <div class="strat-q2-chain">Causal Chain: Nasser nationalises canal → Secret tripartite Sèvres invasion → US financial pressure ends crisis.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">4. Escalation to the Six-Day War (1964–67)</div>
              <div class="strat-q2-stimulus">Stimulus: • Syrian border clashes &amp; water disputes • Closure of Straits of Tiran</div>
              <div class="strat-q2-ok">Own Knowledge: Expulsion of UNEF peacekeepers / Operation Focus air strikes</div>
              <div class="strat-q2-chain">Causal Chain: Border raids &amp; Tiran blockade → Egyptian militarisation of Sinai → Israel launches Op Focus air wipeout.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">5. The 1973 Yom Kippur War</div>
              <div class="strat-q2-stimulus">Stimulus: • Operation Badr Suez crossing (6 Oct) • US emergency military airlift</div>
              <div class="strat-q2-ok">Own Knowledge: Bar-Lev Line breach / Soviet SAM umbrella / Sharon's counter-crossing</div>
              <div class="strat-q2-chain">Causal Chain: Dual surprise crossing breaches Bar-Lev → Soviet SAM umbrella stalls IDF → US airlift &amp; Sharon counter-attack.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">6. Sadat's Peace Initiative &amp; Camp David (1977–79)</div>
              <div class="strat-q2-stimulus">Stimulus: • Sadat's visit to Jerusalem (Nov 1977) • Treaty of Washington (1979)</div>
              <div class="strat-q2-ok">Own Knowledge: 13 days Carter mediation at Camp David / Return of Sinai Peninsula</div>
              <div class="strat-q2-chain">Causal Chain: Sadat breaks 30-year taboo in Knesset → 13-day Carter mediation at Camp David → 1979 Washington treaty.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">7. The First Palestinian Intifada (1987–93)</div>
              <div class="strat-q2-stimulus">Stimulus: • Jabalya refugee camp road incident • Unified National Leadership (UNLU)</div>
              <div class="strat-q2-ok">Own Knowledge: Commercial &amp; tax strikes / Rabin's "Iron Fist" policy / 1988 Hamas charter</div>
              <div class="strat-q2-chain">Causal Chain: Jabalya incident sparks grassroots riots → UNLU strikes defy Rabin's Iron Fist → Global pressure compels talks.</div>
            </div>
            <div class="strat-q2-card">
              <div class="strat-q2-card-title">8. The Road to the Oslo Peace Accords (1991–95)</div>
              <div class="strat-q2-stimulus">Stimulus: • Madrid Peace Conference (1991) • White House lawn handshake (1993)</div>
              <div class="strat-q2-ok">Own Knowledge: Secret backchannel talks in Norway / Letters of Mutual Recognition / Oslo II Areas A, B, C</div>
              <div class="strat-q2-chain">Causal Chain: Gulf War &amp; Madrid open diplomacy → Secret Norwegian talks craft Recognition → 1993 White House handshake.</div>
            </div>
          </div>
        </div>

        <div class="strat-connectives-bar">
          <strong>Chronological &amp; Causal Connective Bank:</strong> <em>"The crisis was sparked when...", "This directly precipitated...", "Consequently, this in turn compelled...", "Left with no alternative, X responded by...", "As an immediate consequence of this outcome...", "This proved decisive because..."</em>
        </div>

        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">GRADE 9 CRITERIA</span>
          Level 3 (7–8 marks) requires sustained chronological causation across 3 developed paragraphs. Every paragraph must explicitly explain how event A caused event B. Deploying independent own knowledge beyond the stimulus points is strictly mandatory to unlock Level 3!
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
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Official Stem:</strong> <em>"Explain two of the following: The importance of [Event A] for [Focus]... The importance of [Event B] for [Focus]... The importance of [Event C] for [Focus]..."</em>
          </div>

          <div class="strat-selection-protocol">
            <strong>The 2-Minute Selection Rule:</strong> Edexcel provides 3 options—you must choose <strong>EXACTLY TWO</strong>. Select the two events where you can deploy the most specific factual anchors. Never attempt all three; doing so wastes 15 minutes because examiners mark only two!
          </div>

          <div class="strat-grid-3col" style="margin-top: 3px;">
            <div class="strat-subbox">
              <div class="strat-subbox-title">Selection &amp; Planning (2 Mins)</div>
              <div>• Audit the 3 options against the stated focus.</div>
              <div>• Pick the 2 options where you recall exact dates, numbers, treaties, and causal links.</div>
              <div>• Write 2 distinct 8-mark answers.</div>
            </div>
            <div class="strat-subbox">
              <div class="strat-subbox-title">Para 1: Immediate Impact [4m]</div>
              <div>• <strong>Focus Anchor:</strong> How the event immediately transformed the specified question focus.</div>
              <div>• <strong>Factual Proof:</strong> 2 precise historical facts.</div>
              <div>• <em>"The primary immediate importance lay in..."</em></div>
            </div>
            <div class="strat-subbox">
              <div class="strat-subbox-title">Para 2: Long-Term Legacy [4m]</div>
              <div>• <strong>Strategic Precedent:</strong> Lasting realignment or subsequent conflict caused.</div>
              <div>• <strong>Broader Trajectory:</strong> Shift in diplomacy or military balance.</div>
              <div>• <em>"In the longer term, this proved decisive as..."</em></div>
            </div>
          </div>
        </div>

        <!-- Question 3 High-Probability Master Bank (8 Specification Triads = 24 Topics) -->
        <div class="strat-qbank-box" style="padding: 2.5px 5px;">
          <div class="strat-qbank-title">
            <span>High-Probability Question 3 Practice Bank (8 Specification Triads = 24 Topics)</span>
            <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">16 Marks (2 × 8m) • Authentic Pearson Edexcel Option P5 Triads</span>
          </div>
          <div class="strat-q3-grid">
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 1: Creation of Israel (1945–49)</span>
                <span class="strat-q3-focus">Focus: Birth of Israel</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) SS Exodus crisis (1947):</strong> Global fury destroyed British moral authority.<br>
                • <strong>(b) UN Resolution 181 (1947):</strong> International legal legitimacy for statehood.<br>
                • <strong>(c) 1949 Armistice Agreements:</strong> Established Green Line borders &amp; 78% land control.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 2: 1956 Suez Crisis</span>
                <span class="strat-q3-focus">Focus: European Influence</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) Nationalisation of Canal:</strong> Shattered UK/French control over oil transit.<br>
                • <strong>(b) Protocol of Sèvres:</strong> Secret collusion exposed Western imperial aggression.<br>
                • <strong>(c) US financial ultimatum:</strong> Ended UK and French independent global power.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 3: Superpower Rivalry (1956–73)</span>
                <span class="strat-q3-focus">Focus: Cold War Tensions</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) Eisenhower Doctrine (1957):</strong> Pledged US military aid to resist Arab communism.<br>
                • <strong>(b) Soviet arms to Egypt (1967–73):</strong> Equipped Egypt with SAM air defence umbrella.<br>
                • <strong>(c) US Op Nickel Grass (1973):</strong> 22,000-ton airlift turned Yom Kippur tide.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 4: Palestinian Nationalism (1964–82)</span>
                <span class="strat-q3-focus">Focus: Palestinian Identity</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) Battle of Karameh (1968):</strong> Fatah resistance created a heroic Arab legend.<br>
                • <strong>(b) Munich Olympics attack (1972):</strong> Black September broadcast struggle to 900m viewers.<br>
                • <strong>(c) 1982 Siege of Beirut:</strong> Expelled 14,000 fighters; shifted PLO to diplomacy.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 5: Search for Peace (1967–95)</span>
                <span class="strat-q3-focus">Focus: Arab-Israeli Peace</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) UN Resolution 242 (1967):</strong> Established "Land for Peace" principle for all talks.<br>
                • <strong>(b) Sadat's visit to Jerusalem (1977):</strong> Shattered 30-year taboo at the Knesset.<br>
                • <strong>(c) 1993 Oslo Accords:</strong> First bilateral recognition between Israel and PLO.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 6: Regional Strategic Shifts (1973–79)</span>
                <span class="strat-q3-focus">Focus: Regional Diplomacy</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) 1973 Arab Oil Embargo:</strong> Quadrupled prices; showed Arab economic leverage.<br>
                • <strong>(b) Kissinger's shuttle diplomacy:</strong> Displaced Soviet influence from Cairo.<br>
                • <strong>(c) Camp David Accords (1978):</strong> Removed Egypt from Arab military coalition.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 7: Security &amp; Conflict (1982–85)</span>
                <span class="strat-q3-focus">Focus: Israeli Security</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) Op Peace for Galilee (1982):</strong> Cleared PLO artillery; led to Sabra/Shatila.<br>
                • <strong>(b) South Lebanon Security Zone:</strong> Buffer zone embroiled IDF in 18-year guerilla war.<br>
                • <strong>(c) Emergence of Hezbollah (1982):</strong> Created Iranian-backed militant threat on border.
              </div>
            </div>
            <div class="strat-q3-card">
              <div class="strat-q3-header">
                <span>Triad 8: Popular Uprising &amp; Talks (1987–95)</span>
                <span class="strat-q3-focus">Focus: Resolving Conflict</span>
              </div>
              <div class="strat-q3-options">
                • <strong>(a) First Intifada (1987–93):</strong> Grassroots uprising forced Israel to negotiate.<br>
                • <strong>(b) Founding of Hamas (1988):</strong> Rejectionist charter opposed all peace with Israel.<br>
                • <strong>(c) Assassination of Rabin (1995):</strong> Extremist murder derailed Oslo peace process.
              </div>
            </div>
          </div>
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

      <!-- EXAMINER PITFALLS 5-TRAP CALLOUT GRID -->
      <div class="strat-traps-box-p24">
        <div class="strat-traps-header-p24">
          <span class="trap-tag" style="background: #b91c1c;">EXAMINER PITFALLS</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #7f1d1d;">5 Fatal Period Study Traps &amp; Cap Risk Callout</span>
        </div>
        <div class="strat-traps-grid-p24">
          <div class="strat-trap-item"><strong>Trap 1 (Q1):</strong> Describing the event instead of its consequence. Caps mark at Level 1 (1–2/4). Focus 100% on aftermath.</div>
          <div class="strat-trap-item"><strong>Trap 2 (Q1):</strong> Writing two consequences. Edexcel awards marks for ONE consequence only; writing two wastes 5 valuable minutes.</div>
          <div class="strat-trap-item"><strong>Trap 3 (Q2):</strong> Writing a chronological story without causal connectors. Caps answer at Level 2 (4/8). Every paragraph must link A to B.</div>
          <div class="strat-trap-item"><strong>Trap 4 (Q2):</strong> Omitting own knowledge beyond stimulus points. Level 3 is strictly locked (capped at 5/8) without outside facts.</div>
          <div class="strat-trap-item" style="grid-column: span 2;"><strong>Trap 5 (Q3):</strong> Attempting all 3 options instead of exactly 2, or writing a narrative of the event without explaining its importance FOR the stated focus.</div>
        </div>
      </div>

      <!-- DIGITAL REVISION HUB 4-GATEWAY COMMAND DECK -->
      <div class="back-hub-grid-wrap">
        <div class="back-hub-banner">
          <span class="back-hub-banner-title">DIGITAL REVISION HUB • DIRECT TOPIC QR REVISION GATEWAYS</span>
          <span class="back-hub-banner-sub">the-history-revision-hub.netlify.app/?unit=cme_new • Scan with smartphone camera</span>
        </div>
        <div class="back-hub-gateways-grid">
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt1}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 1</span>
              <div class="hub-gw-title">Birth of Israel &amp; Suez (1945–63)</div>
              <div class="hub-gw-desc">Enquiries 1–6: British Mandate, 1948 War, Nakba, Law of Return &amp; 1956 Suez Crisis.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt2}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 2</span>
              <div class="hub-gw-title">Six-Day &amp; Yom Kippur (1964–73)</div>
              <div class="hub-gw-desc">Enquiries 7–12: Water War, 1967 Blitz, Res 242, Black September &amp; 1973 Oil Embargo.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt3}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 3</span>
              <div class="hub-gw-title">Peace &amp; Solutions (1974–95)</div>
              <div class="hub-gw-desc">Enquiries 13–16: Camp David, 1982 Lebanon, First Intifada &amp; Oslo Accords.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrHub}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge" style="background: #0284c7;">MASTER PORTAL</span>
              <div class="hub-gw-title">All 16 Quizzes &amp; Flashcards</div>
              <div class="hub-gw-desc">128 self-marking questions, digital flashcard vaults &amp; animated battle maps.</div>
            </div>
          </div>
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
