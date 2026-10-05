/**
 * generate_cme_quiz_booklet.cjs
 *
 * Compiles the Master 20-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 2 (1HI0/2B): Conflict in the Middle East, 1945–1995.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom standard
 * - 100% uniformity across all 12 lessons (12 tiered questions per lesson = 144 questions)
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
// BASE64 IMAGE HELPER (Guarantees zero broken image links in Puppeteer/offline)
// --------------------------------------------------------------------------
function getCardImageBase64(filename) {
  const p = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'assets', filename);
  if (fs.existsSync(p)) {
    const ext = path.extname(filename).replace('.', '') || 'png';
    const data = fs.readFileSync(p).toString('base64');
    return `data:image/${ext};base64,${data}`;
  }
  return `./assets/${filename}`;
}

// --------------------------------------------------------------------------
// APPROVED AUTHENTIC CLASSROOM FOOTERS (20 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'Conflict in the Middle East Master Retrieval Companion • Edexcel Paper 2 • The History Department', // P1
  'Master Chronology Domino Flowchart • 28 Causal Turning Points (1945–1995) • The History Department', // P2
  '"Balfour promised in 67 words; Attlee handed it to the UN in 1947: master the 1945 baseline."', // P3
  '"Irgun checked into the King David Hotel with milk churns... and checked Britain out of the Mandate."', // P4
  '"UN Resolution 181 gave each side a jigsaw puzzle; neither side liked the picture."', // P5
  '"Eden thought Nasser was Mussolini on the Nile; Eisenhower promptly reminded Eden what year it was."', // P6
  '"Water in the desert is worth more than oil: understand why the Headwater Diversion triggered 1967."', // P7
  '"100-hour blitzkrieg across the Sinai: Moshe Dayan showed the decisive power of pre-emptive airpower."', // P8
  '"UN Resolution 242 omitted \'the\' in English: diplomacy turned on a single definite article."', // P9
  '"Dawson\'s Field to Munich: explain how asymmetric terrorism thrust the Palestinian cause onto global TV."', // P10
  '"Crossing the Bar-Lev Line on Yom Kippur: underestimating Egyptian planning nearly cost Israel the war."', // P11
  '"Sadat flew to Jerusalem in 1977; Begin gave back the Sinai: courage in negotiation wins Grade 9."', // P12
  '"Operation Peace for Galilee drove the PLO to Tunis, but created Hezbollah and ignited the Intifada."', // P13
  '"A handshake on the White House lawn: analyze why the Oslo peace process collapsed after 1995."', // P14
  'Department Marking Bank • Lessons 1 to 3 • Self-Assessment & Green-Pen DIRT Review', // P15
  'Department Marking Bank • Lessons 4 to 6 • Self-Assessment & Green-Pen DIRT Review', // P16
  'Department Marking Bank • Lessons 7 to 9 • Self-Assessment & Green-Pen DIRT Review', // P17
  'Department Marking Bank • Lessons 10 to 12 • Self-Assessment & Green-Pen DIRT Review', // P18
  'Key Historical Protagonists Gallery & Tier 3 Disciplinary Vocabulary • Edexcel Paper 2', // P19
  'Edexcel Paper 2 Examination Strategy & Essay Architect • Departmental Archival Standard', // P20
];

// --------------------------------------------------------------------------
// MASTER CHRONOLOGY DOMINO FLOWCHART (STRICTLY 1945–1995)
// --------------------------------------------------------------------------
const DOMINO_TIMELINE = [
  {
    year: '1945',
    title: 'Post-WWII Crisis & Jewish Insurgency',
    text: 'Haganah, Irgun, and Lehi launch armed sabotage against British Mandate forces in Palestine.',
  },
  {
    year: 'July 1946',
    title: 'Bombing of the King David Hotel',
    text: 'Irgun destroys British military & administrative HQ in Jerusalem, killing 91; shatters UK public will.',
  },
  {
    year: 'Nov 1947',
    title: 'UN Resolution 181 Partition Plan',
    text: 'UN votes 33–13 to partition Palestine into separate Arab and Jewish states; rejected by Arab leaders.',
  },
  {
    year: 'May 1948',
    title: 'Proclamation of Israel & Arab Invasion',
    text: 'Ben-Gurion proclaims Israeli independence; British Mandate ends; armies of 5 Arab states invade.',
  },
  {
    year: '1949',
    title: 'Rhodes Armistices & The Green Line',
    text: 'Israel secures armistices with 21% more territory than UN plan; 700,000 Palestinian Arabs displaced.',
  },
  {
    year: '1950',
    title: 'The Israeli Law of Return',
    text: 'Knesset guarantees automatic citizenship to all Jewish immigrants; doubles population in 4 years.',
  },
  {
    year: 'Feb 1955',
    title: 'Israeli Raid on Gaza',
    text: 'IDF retaliatory raid kills 37 Egyptian soldiers; humiliates President Nasser, who vows rearmament.',
  },
  {
    year: 'Sept 1955',
    title: 'The Czech Arms Deal',
    text: 'Nasser bypasses Western arms embargo by securing Soviet tanks and jets; Cold War enters Middle East.',
  },
  {
    year: 'July 1956',
    title: 'Nationalisation of the Suez Canal',
    text: 'Nasser seizes Anglo-French canal revenues to fund Aswan High Dam after US cancels loan.',
  },
  {
    year: 'Oct 1956',
    title: 'The Protocol of Sèvres & Suez Crisis',
    text: 'Britain, France, and Israel secretly collude; Israel invades Sinai; US financial threats abort invasion.',
  },
  {
    year: 'Jan 1964',
    title: 'Cairo Conference & Creation of the PLO',
    text: 'Arab League creates the Palestine Liberation Organisation; Syria attempts to divert the River Jordan.',
  },
  {
    year: 'Apr 1967',
    title: 'Syrian Border Air Clash',
    text: 'Israeli Mirages shoot down 6 Syrian MiG-21s over Damascus; false Soviet intelligence sparks crisis.',
  },
  {
    year: 'May 1967',
    title: 'Nasser’s Brinkmanship in the Sinai',
    text: 'Nasser expels UNEF peacekeepers, moves 100,000 troops into Sinai, and blockades the Straits of Tiran.',
  },
  {
    year: '5–10 June 1967',
    title: 'The Six-Day War (Operation Focus)',
    text: 'Israeli pre-emptive airstrikes destroy Arab air forces; Israel captures Sinai, Gaza, West Bank, Golan.',
  },
  {
    year: 'Nov 1967',
    title: 'UN Security Council Resolution 242',
    text: 'Establishes the "Land for Peace" formula; Arab states issue the "Three No’s" at the Khartoum Summit.',
  },
  {
    year: '1968–1970',
    title: 'War of Attrition & Rise of Fatah',
    text: 'Static artillery and commando duels across Suez; Battle of Karameh elevates Yasser Arafat.',
  },
  {
    year: 'Sept 1970',
    title: 'Black September in Jordan',
    text: 'PFLP Dawson’s Field hijackings trigger civil war; King Hussein violently expels PLO from Jordan to Lebanon.',
  },
  {
    year: 'Sept 1972',
    title: 'Munich Olympics Massacre',
    text: 'Black September faction murders 11 Israeli athletes; global broadcast prompts Operation Wrath of God.',
  },
  {
    year: '6–25 Oct 1973',
    title: 'The Yom Kippur War (Operation Badr)',
    text: 'Egypt crosses Suez Bar-Lev Line; Syria attacks Golan; Israel rallies via massive US Operation Nickel Grass airlift.',
  },
  {
    year: 'Oct 1973',
    title: 'The OPEC Oil Embargo',
    text: 'Arab oil producers cut production by 25% and embargo the US; crude oil quadruples, triggering global crisis.',
  },
  {
    year: '1974–1975',
    title: 'Kissinger’s Shuttle Diplomacy',
    text: 'Henry Kissinger brokers step-by-step military disengagements in Sinai and Golan Heights.',
  },
  {
    year: 'Nov 1977',
    title: 'Sadat’s Historic Visit to Jerusalem',
    text: 'President Anwar Sadat addresses the Israeli Knesset in person, breaking 30 years of psychological deadlock.',
  },
  {
    year: 'Sept 1978',
    title: 'The Camp David Accords',
    text: 'Jimmy Carter brokers historic framework between Sadat and Menachem Begin at presidential retreat.',
  },
  {
    year: 'Mar 1979',
    title: 'The Treaty of Washington',
    text: 'Formal Egypt-Israel Peace Treaty; Israel returns Sinai in exchange for full diplomatic recognition.',
  },
  {
    year: 'June 1982',
    title: 'Operation Peace for Galilee (Lebanon)',
    text: 'IDF invades Lebanon to destroy PLO bases; siege of West Beirut; Sabra and Shatila massacre.',
  },
  {
    year: 'Dec 1987',
    title: 'Outbreak of the First Intifada',
    text: 'Grassroots Palestinian civil disobedience and stone-throwing erupts in Gaza and West Bank; Hamas founded.',
  },
  {
    year: 'Sept 1993',
    title: 'The Oslo I Accord (Declaration of Principles)',
    text: 'Secret back-channel in Norway results in historic Rabin-Arafat handshake on the White House lawn.',
  },
  {
    year: 'Nov 1995',
    title: 'Assassination of Yitzhak Rabin',
    text: 'Rabin assassinated by Jewish extremist Yigal Amir in Tel Aviv, severely derailing the peace process.',
  },
];

// --------------------------------------------------------------------------
// LESSON METADATA & ENQUIRY HEADERS (12 CORE LESSONS)
// --------------------------------------------------------------------------
const LESSON_HEADERS = [
  {
    num: 1,
    id: 'lesson_1',
    title: 'The 1945 Baseline & Imperial Legacies',
    enquiry: 'Why Was Conflict in Palestine Inevitable as World War II Ended?',
  },
  {
    num: 2,
    id: 'lesson_2',
    title: 'The End of the Mandate & The Birth of Israel (1945–1949)',
    enquiry: 'Why Did Britain Abandon Palestine and How Did Israel Survive 1948?',
  },
  {
    num: 3,
    id: 'lesson_3',
    title: 'The 1948–49 War, Armistice & The Refugee Crisis',
    enquiry: 'How Did the 1948–49 War Transform the Demographics of the Region?',
  },
  {
    num: 4,
    id: 'lesson_4',
    title: 'Nasser, the Gaza Raid & The 1956 Suez Crisis',
    enquiry: 'Why Did the Nationalisation of the Suez Canal Trigger War in 1956?',
  },
  {
    num: 5,
    id: 'lesson_6',
    title: 'Water Wars, Border Clashes & Escalation (1964–1967)',
    enquiry: 'How Did Water Disputes and Border Raids Lead Directly to the 1967 War?',
  },
  {
    num: 6,
    id: 'lesson_7',
    title: 'The Six-Day War & Territorial Blitz (June 1967)',
    enquiry: 'Why Was the Six-Day War Decided in Three Hours and What Land Was Seized?',
  },
  {
    num: 7,
    id: 'lesson_8',
    title: 'UN Resolution 242 & The Conquered Territories',
    enquiry: 'Why Did UN Resolution 242 and the Khartoum "Three Noes" Create Deadlock?',
  },
  {
    num: 8,
    id: 'lesson_9',
    title: 'Palestinian Resistance, Black September & Munich (1968–1972)',
    enquiry: 'How Did the Rise of the PLO and International Terrorism Reshape Conflict?',
  },
  {
    num: 9,
    id: 'lesson_10',
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    enquiry: 'Why Did Egypt and Syria Achieve Initial Surprise in the Yom Kippur War?',
  },
  {
    num: 10,
    id: 'lesson_11',
    title: 'Shuttle Diplomacy, Camp David & The 1979 Peace Treaty',
    enquiry: 'How Did Anwar Sadat and Menachem Begin Achieve the Camp David Accords?',
  },
  {
    num: 11,
    id: 'lesson_12',
    title: 'The Lebanon War (1982) & The First Intifada (1987)',
    enquiry: 'Why Did Israel Invade Lebanon and What Sparked the First Intifada?',
  },
  {
    num: 12,
    id: 'lesson_13',
    title: 'The Oslo Peace Process & Rabin’s Assassination (1993–1995)',
    enquiry: 'Why Did the Oslo Accords Offer Hope and Why Did the Process Collapse?',
  },
];

// --------------------------------------------------------------------------
// PROTAGONISTS GALLERY (12 DECISION-MAKERS ON PAGE 19)
// --------------------------------------------------------------------------
const PROTAGONISTS = [
  {
    name: 'David Ben-Gurion',
    role: '1st Prime Minister of Israel (1948–53, 1955–63)',
    dates: '1886–1973',
    img: getCardImageBase64('card_bengurion.png'),
    decision:
      'Proclaimed Israel’s independence on 14 May 1948; integrated militias into the IDF; authorized the 1950 Law of Return and 1956 Sinai invasion.',
  },
  {
    name: 'Gamal Abdel Nasser',
    role: 'President of Egypt (1954–1970)',
    dates: '1918–1970',
    img: getCardImageBase64('card_nasser.png'),
    decision:
      'Nationalised the Suez Canal in July 1956; champion of Pan-Arabism; closed Straits of Tiran in 1967; led Egypt in the 1969–70 War of Attrition.',
  },
  {
    name: 'Moshe Dayan',
    role: 'IDF Chief of Staff & Defence Minister',
    dates: '1915–1981',
    img: getCardImageBase64('card_dayan.png'),
    decision:
      'Masterminded the 1956 Sinai campaign and 1967 Six-Day War air blitz; famously captured East Jerusalem; later negotiated Camp David with Egypt.',
  },
  {
    name: 'Golda Meir',
    role: 'Prime Minister of Israel (1969–1974)',
    dates: '1898–1978',
    img: getCardImageBase64('card_golda.png'),
    decision:
      'Led Israel during the War of Attrition and initial shock of the 1973 Yom Kippur War; secured emergency US Operation Nickel Grass airlift.',
  },
  {
    name: 'Anwar Sadat',
    role: 'President of Egypt (1970–1981)',
    dates: '1918–1981',
    img: getCardImageBase64('card_sadat.png'),
    decision:
      'Launched the surprise 1973 Yom Kippur offensive; flew courageously to address the Knesset in 1977; signed the 1978 Camp David Accords.',
  },
  {
    name: 'Menachem Begin',
    role: 'Prime Minister of Israel (1977–1983)',
    dates: '1913–1992',
    img: getCardImageBase64('card_begin.png'),
    decision:
      'Former Irgun leader; first Likud PM; signed the 1979 Treaty of Washington returning Sinai for peace; ordered controversial 1982 Lebanon invasion.',
  },
  {
    name: 'King Hussein of Jordan',
    role: 'King of Jordan (1952–1999)',
    dates: '1935–1999',
    img: getCardImageBase64('card_hussein.png'),
    decision:
      'Lost the West Bank and East Jerusalem in 1967; crushed PLO militias during 1970 Black September; signed historic 1994 Israel-Jordan Peace Treaty.',
  },
  {
    name: 'Yasser Arafat',
    role: 'Chairman of the PLO & Fatah (1969–2004)',
    dates: '1929–2004',
    img: getCardImageBase64('card_arafat.png'),
    decision:
      'Delivered 1974 UN "Olive Branch & Freedom Fighter\'s Gun" speech; signed 1993 Oslo Accords on White House lawn; headed the Palestinian Authority.',
  },
  {
    name: 'Jimmy Carter',
    role: '39th US President (1977–1981)',
    dates: '1924–present',
    img: getCardImageBase64('card_carter.png'),
    decision:
      'Mediated 13 days of grueling negotiations between Sadat and Begin at presidential retreat to forge the landmark 1978 Camp David Accords framework.',
  },
  {
    name: 'Ariel Sharon',
    role: 'IDF General & Defence Minister',
    dates: '1928–2014',
    img: getCardImageBase64('card_sharon.png'),
    decision:
      'Led armored crossing of Suez in 1973 encircling Egypt’s 3rd Army; architect of 1982 invasion of Lebanon; rebuked by Kahan Commission for Sabra & Shatila.',
  },
  {
    name: 'Yitzhak Rabin',
    role: 'IDF Chief of Staff & Prime Minister (1974–77, 1992–95)',
    dates: '1922–1995',
    img: getCardImageBase64('card_rabin.png'),
    decision:
      'Commanded IDF in 1967; signed 1993 Oslo Declaration of Principles and 1994 Jordan Treaty; assassinated by Jewish extremist Yigal Amir in 1995.',
  },
  {
    name: 'Bill Clinton',
    role: '42nd US President (1993–2001)',
    dates: '1946–present',
    img: getCardImageBase64('card_clinton.png'),
    decision:
      'Hosted the historic September 1993 White House lawn handshake between Rabin and Arafat; facilitated Oslo II negotiations and 1994 Jordan peace.',
  },
];

// --------------------------------------------------------------------------
// TIER 3 DISCIPLINARY VOCABULARY (16 TERMS ON PAGE 19)
// --------------------------------------------------------------------------
const VOCAB_BANK = [
  {
    term: 'Zionism',
    phonetic: '[ZY-uh-niz-uhm]',
    def: 'The national movement advocating for the self-determination and sovereign statehood of the Jewish people in their ancestral homeland of Palestine.',
  },
  {
    term: 'Sovereignty',
    phonetic: '[SOV-rin-tee]',
    def: 'Supreme independent authority and legitimate political power over a defined geographic territory and population without foreign control.',
  },
  {
    term: 'Mandate',
    phonetic: '[MAN-dayt]',
    def: 'A legal commission granted by the League of Nations authorizing a major power (e.g. Britain) to administer a territory until ready for self-rule.',
  },
  {
    term: 'Partition',
    phonetic: '[par-TISH-uhn]',
    def: 'The political division of a territory into separate autonomous or sovereign states, as enacted by UN Resolution 181 in November 1947.',
  },
  {
    term: 'Al-Nakba',
    phonetic: '[al-NAHK-bah]',
    def: 'Arabic for "the Catastrophe"; the permanent flight and displacement of approximately 700,000 Palestinian Arabs during the 1948–49 War.',
  },
  {
    term: 'Armistice',
    phonetic: '[AR-mi-stis]',
    def: 'A formal agreement between opposing military forces to suspend hostilities, establishing the 1949 "Green Line" ceasefire borders.',
  },
  {
    term: 'Fedayeen',
    phonetic: '[fed-ah-YEEN]',
    def: 'Arabic for "self-sacrificers"; armed Palestinian nationalist guerrillas who carried out cross-border raids and sabotage attacks into Israeli territory.',
  },
  {
    term: 'Pan-Arabism',
    phonetic: '[pan-AIR-uh-biz-uhm]',
    def: 'The political ideology championed by Nasser promoting the unification of Arab countries across North Africa and the Middle East into a single bloc.',
  },
  {
    term: 'Pre-emptive Strike',
    phonetic: '[pree-EMP-tiv]',
    def: 'A military attack initiated to disable or destroy an enemy’s offensive capability when an attack by that enemy is believed to be imminent (e.g. June 1967).',
  },
  {
    term: 'Attrition',
    phonetic: '[uh-TRISH-uhn]',
    def: 'A military strategy designed to wear down an opponent through continuous artillery bombardment, economic disruption, and sustained personnel losses.',
  },
  {
    term: 'Demilitarised Zone (DMZ)',
    phonetic: '[dee-MIL-i-tuh-ryzd]',
    def: 'An agreed geographic buffer where military forces, armaments, and installations are prohibited by international treaty (e.g. Sinai after 1979).',
  },
  {
    term: 'Shuttle Diplomacy',
    phonetic: '[SHUHT-uhl dih-PLOH-muh-see]',
    def: 'Intense diplomatic mediation where an intermediary (e.g. Henry Kissinger) travels back and forth between opposing capitals unable to meet directly.',
  },
  {
    term: 'Asymmetric Warfare',
    phonetic: '[ay-sih-MET-rik]',
    def: 'Conflict between belligerents whose relative military power and tactics differ significantly, typical of guerrilla tactics against a conventional army.',
  },
  {
    term: 'Intifada',
    phonetic: '[in-tih-FAH-duh]',
    def: 'Arabic for "shaking off"; the spontaneous grassroots Palestinian uprising of civil disobedience, strikes, and stone-throwing beginning in December 1987.',
  },
  {
    term: 'Buffer State / Zone',
    phonetic: '[BUHF-er zohn]',
    def: 'A neutral or demilitarised geographic territory separating hostile rival powers to reduce the danger of accidental conflict (e.g. Sinai, Golan).',
  },
  {
    term: 'Displaced Persons (DPs)',
    phonetic: '[dis-PLAYST PUR-suhnz]',
    def: 'Approximately 250,000 European Holocaust survivors housed in allied camps after WWII who sought immediate sanctuary in Palestine.',
  },
];

// --------------------------------------------------------------------------
// EXTRACT & CURATE QUESTIONS (100% PEARSON REVISION GUIDE ALIGNED: 144 Qs)
// --------------------------------------------------------------------------
const { PEARSON_QUIZ_BANK } = require('./cme_pearson_quiz_bank.cjs');

function loadCuratedQuestions() {
  return PEARSON_QUIZ_BANK.map((item, idx) => ({
    cfg: LESSON_HEADERS[idx],
    questions: item.questions,
  }));
}

// --------------------------------------------------------------------------
// HTML BUILDER: 20-PAGE A4 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
function buildHtml(curatedLessons) {
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
      font-size: 8.8pt;
      line-height: 1.25;
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
      margin-bottom: 2.5px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2.5px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num { font-weight: 800; }
    .footer-quip { font-style: italic; color: #111111; font-weight: 500; }

    /* Page 1: Cover Styles */
    .cover-top-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 8px 10px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 9.2pt;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      border-radius: 2px;
      margin-bottom: 6px;
    }
    .cover-title-box {
      border: 2.2px solid #000000;
      padding: 15px 18px;
      text-align: center;
      background: #fafafa;
      margin-bottom: 6px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 20.5pt;
      font-weight: 900;
      color: #000000;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.3px;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 10.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-top: 4px;
    }
    .scholar-card {
      border: 1.5px solid #000000;
      background: #ffffff;
      padding: 10px 16px;
      display: grid;
      grid-template-columns: 1.6fr 1.2fr 1.2fr;
      gap: 16px;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 9.0pt;
    }
    .scholar-field { display: flex; align-items: baseline; gap: 4px; }
    .scholar-field strong { font-weight: 900; color: #000; }
    .scholar-field .field-line { flex: 1; border-bottom: 1px solid #000; height: 11px; }

    /* Homework Tracking Table (Page 1) */
    .hw-ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 8.6pt;
      margin-bottom: 6px;
    }
    .hw-ledger-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 7.5px 6px;
      font-weight: 800;
      text-transform: uppercase;
      border: 1px solid #0f172a;
      text-align: center;
      font-size: 8.5pt;
    }
    .hw-ledger-table td {
      border: 1px solid #cbd5e1;
      padding: 8.0px 7px;
      vertical-align: middle;
      color: #000000;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    
    .traffic-tier-box {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      padding: 8px 12px;
      background: #f1f5f9;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 8.3pt;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .cover-protocol-box {
      border: 1.3px solid #0f172a;
      border-left: 5px solid #0f172a;
      border-radius: 2px;
      padding: 9px 12px;
      background: #ffffff;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      line-height: 1.45;
      color: #1e293b;
    }

    /* Page 2: Chronology Domino Flowchart */
    .timeline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.2px 6px;
      flex: 1;
      margin: 2px 0;
    }
    .domino-node {
      border: 1.2px solid #0f172a;
      border-left: 3.5px solid #0f172a;
      border-radius: 2px;
      padding: 2.4px 5px;
      background: #ffffff;
      display: flex;
      gap: 6px;
      align-items: flex-start;
      line-height: 1.18;
    }
    .domino-year {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 900;
      padding: 1px 4px;
      border-radius: 2px;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }
    .domino-body { flex: 1; }
    .domino-title { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #000000; display: block; margin-bottom: 0.5px; }
    .domino-desc { font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; }

    /* Lesson Question Pages (Pages 3–14) — 100% UNIFORM ARCHITECTURE */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 3px 8px;
      margin-bottom: 2px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 10.4pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.8px 6px;
      margin-bottom: 2.2px;
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
      line-height: 1.18;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 900; color: #000000; min-width: 16px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 8.6pt; font-weight: 700; color: #000000; line-height: 1.18; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 72px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.3px solid #000000;
      height: 6.8mm;
    }

    /* Pages 15–18: Department Marking Bank (BALANCED 3-COLUMN ARCHITECTURE) */
    .mb-grid-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5.5px;
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
      font-size: 7.3pt;
      font-weight: 800;
      padding: 2.2px 5px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-radius: 1px;
      margin-bottom: 2px;
      text-align: center;
    }
    .ans-card {
      border: 1px solid #cbd5e1;
      border-left: 2.8px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 2.2px 4px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 7.0pt;
      line-height: 1.16;
      margin-bottom: 1.5px;
    }
    .ans-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 3px;
    }
    .ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; font-size: 7.4pt; }
    .ans-core { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 7.4pt; flex: 1; margin-left: 3px; }
    .ans-check { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; white-space: nowrap; }
    .ans-exp { color: #1e293b; font-family: 'Georgia', serif; font-style: italic; font-size: 6.8pt; line-height: 1.15; }

    /* Page 19: Protagonists & Vocabulary */
    .proto-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 8px;
      margin-bottom: 3.5px;
    }
    .proto-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      padding: 5px 8px;
      background: #ffffff;
      display: flex;
      gap: 9px;
      align-items: center;
    }
    .proto-img {
      width: 48px;
      height: 56px;
      object-fit: cover;
      border: 1.2px solid #000;
      border-radius: 2px;
      flex-shrink: 0;
      background: #e2e8f0;
    }
    .proto-info { flex: 1; line-height: 1.26; }
    .proto-name { font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 900; color: #000000; }
    .proto-role { font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #334155; display: block; }
    .proto-dec { font-family: 'Georgia', serif; font-size: 7.4pt; color: #111827; margin-top: 1.5px; }

    .theme-synthesis-bar {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 6px 10px;
      margin: 4px 0;
    }
    .theme-header {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1.3px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
    }
    .theme-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      font-size: 7.4pt;
      line-height: 1.28;
    }
    .theme-card {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 5px 7px;
      border-radius: 2px;
    }
    .theme-card strong { font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000; display: block; margin-bottom: 2px; }

    .vocab-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4.5px 8px;
    }
    .vocab-card {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      padding: 4.8px 8px;
      background: #f8fafc;
      font-size: 7.5pt;
      line-height: 1.26;
    }
    .vocab-term { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 8.6pt; }
    .vocab-phonetic { font-style: italic; color: #64748b; font-size: 7.2pt; }
    .vocab-def { color: #1e293b; font-family: 'Georgia', serif; display: block; margin-top: 1.5px; }

    /* Page 20: Back Cover Strategy Styles */
    .strategy-card {
      border: 1.4px solid #0f172a;
      border-radius: 2px;
      padding: 8px 12px;
      background: #ffffff;
      margin-bottom: 6px;
    }
    .strat-header {
      font-family: 'Inter', sans-serif;
      font-size: 9.0pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.4px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      letter-spacing: 0.3px;
    }
    .strat-badge {
      background: #0f172a;
      color: #ffffff;
      padding: 2px 7px;
      border-radius: 2px;
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 0.4px;
    }
    .strat-steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 9px;
      margin-bottom: 5px;
    }
    .strat-step-box {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 6px 8px;
      border-radius: 2px;
      font-size: 7.7pt;
      line-height: 1.34;
    }
    .strat-step-box strong {
      font-family: 'Inter', sans-serif;
      color: #0f172a;
      display: block;
      margin-bottom: 2.5px;
      font-size: 8.0pt;
    }
    .strat-model-callout {
      background: #fdfbf7;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #0f172a;
      padding: 7px 10px;
      font-family: 'Georgia', serif;
      font-size: 8.0pt;
      line-height: 1.42;
      color: #0f172a;
      margin-top: 4px;
    }
    .strat-model-title {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: #0f172a;
      margin-bottom: 3px;
      display: block;
    }
    .strat-warning-tag {
      display: inline-block;
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #f87171;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 2px;
    }
    .warnings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 9px;
    }
    .warning-node {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #991b1b;
      background: #fffafa;
      padding: 6px 8px;
      font-size: 7.7pt;
      line-height: 1.32;
    }
    .warning-node strong {
      font-family: 'Inter', sans-serif;
      color: #991b1b;
      font-size: 8.0pt;
    }
    .archival-seal-block {
      border: 2px solid #000000;
      padding: 10px 16px;
      text-align: center;
      background: #fafafa;
      margin-top: 6px;
    }

    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 9.5pt !important;
      letter-spacing: 1.5px;
    }
  </style>
</head>
<body>
`;

  // ========================================================================
  // PAGE 1: FRONT COVER & FORMATIVE HOMEWORK RETRIEVAL TRACKER
  // ========================================================================
  html += `
  <div class="page-container" id="page-1">
    <div class="page-body-full">
      <div class="cover-top-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span> &bull; Pearson Edexcel GCSE History (1HI0/2B)
      </div>

      <div class="cover-title-box">
        <h1 class="cover-main-title">CONFLICT IN THE MIDDLE EAST, 1945–1995</h1>
        <div class="cover-sub-title">20-Page A4 Knowledge Retrieval & Formative Homework Companion</div>
        <div style="font-family: 'Georgia', serif; font-size: 8.8pt; font-style: italic; color: #334155; margin-top: 4px;">
          Core Historical Knowledge &bull; Causal Chronology &bull; Edexcel Examination Strategy
        </div>
      </div>

      <div class="scholar-card">
        <div class="scholar-field"><strong>Name:</strong><div class="field-line"></div></div>
        <div class="scholar-field"><strong>Class / Group:</strong><div class="field-line"></div></div>
        <div class="scholar-field"><strong>Teacher:</strong><div class="field-line"></div></div>
      </div>

      <!-- Specification Architecture Strip -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-align: center;">
        <div style="background: #0f172a; color: #fff; padding: 5px 8px; border-radius: 2px;">KT 1: Early Conflict (1945–56) &bull; L1–L4</div>
        <div style="background: #0f172a; color: #fff; padding: 5px 8px; border-radius: 2px;">KT 2: War & Escalation (1956–73) &bull; L5–L9</div>
        <div style="background: #0f172a; color: #fff; padding: 5px 8px; border-radius: 2px;">KT 3: Search for Peace (1974–95) &bull; L10–L12</div>
      </div>

      <!-- 12-Week Homework Tracker -->
      <table class="hw-ledger-table">
        <thead>
          <tr>
            <th style="width: 32px;">Wk</th>
            <th>Specification Lesson & Topic Focus</th>
            <th style="width: 74px;">1st Score</th>
            <th style="width: 74px;">2nd Score</th>
            <th style="width: 195px;">Recall Confidence</th>
            <th style="width: 90px;">Staff Sign</th>
          </tr>
        </thead>
        <tbody>
          ${LESSON_HEADERS.map(
            (h, idx) => `
          <tr>
            <td style="text-align: center; font-weight: 800;">${idx + 1}</td>
            <td><strong>KT ${idx < 4 ? '1.' + idx : idx < 9 ? '2.' + (idx - 4) : '3.' + (idx - 9)}:</strong> ${h.title}</td>
            <td style="text-align: center; font-weight: 700;">___ / 12</td>
            <td style="text-align: center; font-weight: 700;">___ / 12</td>
            <td>[ &nbsp; ] Instant &nbsp; [ &nbsp; ] Effortful &nbsp; [ &nbsp; ] Review</td>
            <td style="text-align: center;">__________</td>
          </tr>
          `,
          ).join('')}
        </tbody>
      </table>

      <!-- Traffic Light Box -->
      <div class="traffic-tier-box">
        <span>🟢 <strong>Green (10–12/12):</strong> Secure Core Recall &bull; Ready for Exam Questions</span>
        <span>🟡 <strong>Amber (7–9/12):</strong> Effortful &bull; Green-Pen Review</span>
        <span>🔴 <strong>Red (0–6/12):</strong> Restudy Flashcards & Re-attempt</span>
      </div>

      <!-- Spaced Retrieval Practice & Green-Pen Review Guide -->
      <div class="cover-protocol-box">
        <div style="font-weight: 900; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.3px;">Spaced Retrieval & Green-Pen Review Protocol:</div>
        <div>&bull; <strong>1. Pure Recall Practice (10 Mins):</strong> Complete each weekly 12-question quiz from memory without textbook or revision notes.</div>
        <div>&bull; <strong>2. Immediate Green-Pen Review:</strong> Turn to the <em>Department Marking Bank</em> (pages 15–18) and self-mark in green pen. Write out the full historical explanation for any incorrect answer.</div>
        <div>&bull; <strong>3. 7-Day Spaced Re-test:</strong> Re-attempt the 12 questions one week later. Record your 2nd score to verify retention into long-term memory.</div>
        <div>&bull; <strong>4. Interleaved Digital Quizzing:</strong> Scan the QR code below for daily Leitner flashcard practice before end-of-topic GCSE assessments.</div>
      </div>

      <!-- QR & Portal Banner -->
      <div style="display: flex; gap: 12px; align-items: center; border: 1.3px solid #0f172a; padding: 7px 12px; border-radius: 2px; background: #ffffff;">
        <div style="width: 52px; height: 52px; flex-shrink: 0;">${qrSvg}</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.34; color: #1e293b; flex: 1;">
          <strong>Interactive Leitner Quizzing & Digital Flashcards:</strong> Scan this QR code or access the Department Portal to practice all 144 questions interactively with automated spaced repetition, immediate explanations, and exam-level timing.
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">1/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGE 2: INSIDE FRONT COVER — MASTER CHRONOLOGY DOMINO FLOWCHART (1945–1995)
  // ========================================================================
  html += `
  <div class="page-container" id="page-2">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL PAPER 2 (1HI0/2B) &bull; MASTER CHRONOLOGY DOMINO FLOWCHART (1945–1995)</span>
        <span>28 Causal Turning Points &bull; 0px Specification Gaps</span>
      </div>

      <div class="timeline-grid">
        ${DOMINO_TIMELINE.map(
          (item) => `
        <div class="domino-node">
          <span class="domino-year">${item.year}</span>
          <div class="domino-body">
            <span class="domino-title">${item.title}</span>
            <span class="domino-desc">${item.text}</span>
          </div>
        </div>
        `,
        ).join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">2/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGES 3 TO 14: LESSONS 1 TO 12 (100% UNIFORM RETRIEVAL COMPANIONS)
  // ========================================================================
  for (let pIdx = 0; pIdx < 12; pIdx++) {
    const lData = curatedLessons[pIdx];
    const pageNum = pIdx + 3; // Pages 3 to 14

    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="page-body-full">
      <div class="running-header">
        <span>KEY TOPIC ${pIdx < 4 ? '1.' + pIdx : pIdx < 9 ? '2.' + (pIdx - 4) : '3.' + (pIdx - 9)} &bull; LESSON ${pIdx + 1} RETRIEVAL COMPANION</span>
        <span>12 PRACTICE QUESTIONS &bull; PAPER 2 (1HI0/2B)</span>
      </div>

      <div class="lesson-meta-bar">
        <h2 class="lesson-meta-title">Lesson ${pIdx + 1}: ${lData.cfg.title}</h2>
        <div class="lesson-meta-enquiry">Enquiry Question: ${lData.cfg.enquiry}</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
        ${lData.questions
          .map(
            (q, qIdx) => `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${qIdx + 1}.</span>
              <span class="q-prompt">${q.q}</span>
            </div>
            <span class="q-attempt">[ 1st: ___ / 2nd: ___ ]</span>
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
        <span class="footer-page-num">${pageNum}/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      </div>
    </div>
  </div>
    `;
  }

  // ========================================================================
  // PAGES 15 TO 18: DEPARTMENT MARKING BANK (UNIFORM 3-COLUMN ARCHITECTURE)
  // ========================================================================
  const mbPageGroups = [
    { page: 15, title: 'Key Topic 1 (Lessons 1 to 3)', lessons: [0, 1, 2] },
    { page: 16, title: 'Key Topic 1 & 2 (Lessons 4 to 6)', lessons: [3, 4, 5] },
    { page: 17, title: 'Key Topic 2 (Lessons 7 to 9)', lessons: [6, 7, 8] },
    { page: 18, title: 'Key Topic 3 (Lessons 10 to 12)', lessons: [9, 10, 11] },
  ];

  mbPageGroups.forEach((grp) => {
    html += `
  <div class="page-container" id="page-${grp.page}">
    <div class="page-body-full">
      <div class="running-header">
        <span>DEPARTMENT MARKING BANK &bull; ${grp.title.toUpperCase()}</span>
        <span>SELF-ASSESSMENT &bull; GREEN-PEN DIRT REVIEW</span>
      </div>

      <div class="mb-grid-3col">
        ${grp.lessons
          .map((lIdx) => {
            const lData = curatedLessons[lIdx];
            return `
          <div class="mb-lesson-col">
            <div class="mb-lesson-title">Lesson ${lIdx + 1}: ${lData.cfg.title}</div>
            ${lData.questions
              .map(
                (q, qIdx) => `
            <div class="ans-card">
              <div class="ans-header">
                <span class="ans-num">${qIdx + 1}.</span>
                <span class="ans-core">${q.a}</span>
                <span class="ans-check">[✓] [✗]</span>
              </div>
              <div class="ans-exp">${q.exp}</div>
            </div>
            `,
              )
              .join('')}
          </div>
          `;
          })
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">${grp.page}/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[grp.page - 1]}</span>
      </div>
    </div>
  </div>
    `;
  });

  // ========================================================================
  // PAGE 19: KEY PROTAGONISTS GALLERY & TIER 3 VOCABULARY
  // ========================================================================
  html += `
  <div class="page-container" id="page-19">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL PAPER 2 &bull; KEY PROTAGONISTS GALLERY & HISTORICAL GLOSSARY</span>
        <span>HISTORICAL BIOGRAPHIES & KEY VOCABULARY</span>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px;">
        Key Historical Protagonists: 12 Pivotal Decision-Makers (1945–1995)
      </div>

      <div class="proto-grid">
        ${PROTAGONISTS.map(
          (p) => `
        <div class="proto-card">
          <img src="${p.img}" class="proto-img" alt="${p.name}">
          <div class="proto-info">
            <span class="proto-name">${p.name} <em style="font-size: 6.8pt; color: #475569; font-weight: 600;">(${p.dates})</em></span>
            <span class="proto-role">${p.role}</span>
            <div class="proto-dec">${p.decision}</div>
          </div>
        </div>
        `,
        ).join('')}
      </div>

      <!-- Core Specification Themes Synthesis Strip -->
      <div class="theme-synthesis-bar">
        <div class="theme-header">
          <span>Three Overarching Specification Themes Across 50 Years of Conflict (1945–1995)</span>
          <span>Core Thematic Links</span>
        </div>
        <div class="theme-grid">
          <div class="theme-card">
            <strong>1. Superpower Proxy Dynamics:</strong>
            US financial and military aid to Israel vs Soviet advanced weaponry to Egypt and Syria turned regional disputes into Cold War flashpoints, directly shaping the 1956, 1967, and 1973 wars.
          </div>
          <div class="theme-card">
            <strong>2. The "Land for Peace" Principle:</strong>
            UN Resolution 242 established the core diplomatic trade-off: returning conquered lands (Sinai, Golan, West Bank) for diplomatic recognition, achieving peace with Egypt (1979) and Jordan (1994).
          </div>
          <div class="theme-card">
            <strong>3. State Wars to Asymmetric Struggle:</strong>
            The shift from conventional multi-state tank wars (1948–73) to asymmetric guerrilla resistance, PLO hijacking, Lebanese proxy warfare (1982), and the grassroots civil uprising of the Intifada (1987).
          </div>
        </div>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px; margin: 3.5px 0 3px 0;">
        Key Historical Terms & Definitions (Essential Specification Vocabulary)
      </div>

      <div class="vocab-grid">
        ${VOCAB_BANK.map(
          (v) => `
        <div class="vocab-card">
          <div>
            <span class="vocab-term">${v.term}</span>
            <span class="vocab-phonetic">${v.phonetic}</span>
          </div>
          <span class="vocab-def">${v.def}</span>
        </div>
        `,
        ).join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">19/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[18]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGE 20: BACK COVER — EDEXCEL PAPER 2 EXAM STRATEGY & ESSAY ARCHITECT
  // ========================================================================
  html += `
  <div class="page-container" id="page-20">
    <div class="page-body-full">
      <div class="cover-top-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span> &bull; Edexcel GCSE Paper 2 Examination Strategy
      </div>

      <!-- Question 1 Architecture -->
      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 1: Explain One Consequence [4 Marks &bull; ~5 Minutes]</span>
          <span class="strat-badge">The P-F-C High-Yield Formula (AO1 + AO2)</span>
        </div>
        <div class="strat-steps-grid">
          <div class="strat-step-box">
            <strong>1. Point (Direct Consequence):</strong> Directly identify ONE clear, valid consequence of the named event. (AO2 &bull; 2 marks). Never state two consequences.
          </div>
          <div class="strat-step-box">
            <strong>2. Historical Fact (AO1 Evidence):</strong> Support with precise dates, numbers, weapon types, or named leaders to prove historical recall. (AO1 &bull; 2 marks).
          </div>
          <div class="strat-step-box">
            <strong>3. Causal Impact (Mechanism):</strong> Explain how this consequence altered the balance of power, provoked retaliation, or shifted superpower relations.
          </div>
        </div>
        <div class="strat-model-callout">
          <span class="strat-model-title">Model Answer &bull; Consequence of the 1955 Czech Arms Deal:</span>
          <strong>[Point]</strong> One consequence of the September 1955 Czech Arms Deal was that it shattered the Western arms monopoly in the Middle East and brought Cold War superpower rivalry directly into the Arab-Israeli conflict. 
          <strong>[Fact]</strong> Nasser bypassed the Western 1950 Tripartite Declaration embargo by securing $250m worth of modern Soviet-bloc weaponry via Czechoslovakia, including 200 MiG-15 jet fighters, 300 T-34 tanks, and 200 APCs. 
          <strong>[Causal Link]</strong> Consequently, this tipped the regional balance of power against Israel, alarmed the United States into cancelling funding for the Aswan High Dam in July 1956, and directly precipitated Nasser's nationalisation of the Suez Canal, triggering the 1956 Suez Crisis.
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
          <span class="strat-warning-tag">&bull; Examiner Trap: Edexcel specification requires ONE consequence only. Writing two wastes 5 minutes.</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569; font-weight: 700;">Aim for 1 dense, tightly structured P-F-C paragraph</span>
        </div>
      </div>

      <!-- Question 2 Architecture -->
      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 2: Write a Narrative Account [8 Marks &bull; ~12–14 Minutes]</span>
          <span class="strat-badge">The 3-Phase Chronological Framework (AO1 + AO2)</span>
        </div>
        <div class="strat-steps-grid">
          <div class="strat-step-box">
            <strong>Phase 1: Catalyst & Preconditions:</strong> Establish the origin, underlying grievances, and immediate crisis trigger (AO1 knowledge).
          </div>
          <div class="strat-step-box">
            <strong>Phase 2: Turning Point & Escalation:</strong> Explain the crucial military or political development that links Phase 1 directly to Phase 3.
          </div>
          <div class="strat-step-box">
            <strong>Phase 3: Outcome & Aftermath:</strong> Explain the direct result, peace settlement, territorial change, or geopolitical deadlock.
          </div>
        </div>
        <div class="strat-model-callout">
          <span class="strat-model-title">Model Plan &bull; Narrative Account of the Outbreak of the Six-Day War (1967):</span>
          <strong>[Phase 1: Catalyst]</strong> In early May 1967, false Soviet intelligence reports of Israeli troop build-ups on Syria's border prompted President Nasser to deploy 100,000 Egyptian troops into the Sinai and expel UNEF peacekeepers. 
          <strong>[Phase 2: Escalation & Causal Link]</strong> <em>In direct response to this escalation</em>, on 22 May Nasser blockaded the Straits of Tiran—which Israel had repeatedly declared an explicit act of war (casus belli)—and signed a mutual defence pact with King Hussein of Jordan, completing the military encirclement of Israel. 
          <strong>[Phase 3: Outcome]</strong> <em>Precipitated by this imminent threat</em>, Israel launched pre-emptive air blitz Operation Focus on 5 June, destroying over 300 Arab aircraft on runways within three hours and conquering the Sinai, West Bank, and Golan Heights.
        </div>
        <div style="margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; background: #e0f2fe; border: 1px solid #7dd3fc; padding: 2.5px 6px; border-radius: 2px;">
          <strong>Essential Causal Connectives Bank:</strong> <em>Consequently... &bull; In direct response to... &bull; This culminated in... &bull; As an immediate catalyst... &bull; Precipitated by... &bull; Deadlock ensued because... &bull; Crucially, this shifted the balance...</em>
        </div>
      </div>

      <!-- Question 3 Architecture -->
      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 3: Explain the Importance of Two Events [16 Marks (2 &times; 8m) &bull; ~25 Minutes]</span>
          <span class="strat-badge">Dual-Aspect Significance Grid</span>
        </div>
        <div class="strat-steps-grid">
          <div class="strat-step-box">
            <strong>Aspect 1 (Tactical / Immediate):</strong> Explain how the event directly shifted battlefield balances, borders, military casualties, or strategic chokepoints.
          </div>
          <div class="strat-step-box">
            <strong>Aspect 2 (Geopolitical / Long-Term):</strong> Explain how the event permanently transformed superpower alliances, peace treaties, or Arab-Israeli relations.
          </div>
          <div class="strat-step-box">
            <strong>Sustained Analytical Conclusion:</strong> Write a comparative judgment weighing whether the immediate tactical or long-term geopolitical legacy proved more consequential.
          </div>
        </div>
        <div class="strat-model-callout">
          <span class="strat-model-title">Model Answer Architecture &bull; Importance of the 1973 Yom Kippur War for Arab-Israeli Relations:</span>
          <strong>[Aspect 1: Tactical Shock]</strong> Egypt's Operation Badr breached the Bar-Lev Line with high-pressure water monitors, inflicting 2,600 Israeli deaths and shattering the myth of IDF invincibility established in 1967. 
          <strong>[Aspect 2: Geopolitical Transformation]</strong> However, the war's greater importance was diplomatic: OPEC's Arab oil embargo proved oil could be weaponized against the West, compelling US Secretary of State Henry Kissinger to initiate "Shuttle Diplomacy." 
          <strong>[Judgment]</strong> Ultimately, by restoring Arab military pride, the war convinced both Sadat and Begin that military victory was impossible, acting as the indispensable catalyst for the 1978 Camp David Accords.
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
          <span class="strat-warning-tag">&bull; Choice Protocol: The exam paper offers 3 options. Answer on TWO options only (spend ~12 minutes each).</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569; font-weight: 700;">Structure: Aspect 1 (Tactical) &rarr; Aspect 2 (Geopolitical) &rarr; Evaluative Verdict</span>
        </div>
      </div>

      <!-- Top 8 Distinction Traps -->
      <div class="strategy-card" style="margin-bottom: 3px;">
        <div class="strat-header">
          <span>Edexcel Paper 2 Distinction Traps &bull; Top 8 Examiner Warnings</span>
          <span class="strat-badge">Essential Historical Distinctions</span>
        </div>
        <div class="warnings-grid">
          <div class="warning-node">
            <strong>1. 1956 Suez vs 1967 Six-Day War:</strong> 1956 was Anglo-French collusion to seize the canal; 1967 was an Israeli pre-emptive strike provoked by the Straits of Tiran closure.
          </div>
          <div class="warning-node">
            <strong>2. UN Res 181 vs UN Res 242:</strong> Res 181 (1947) was the Partition Plan; Res 242 (1967) was "Land for Peace" (the British draft omitted "the" before territories).
          </div>
          <div class="warning-node">
            <strong>3. Question 1 Consequence (4m Only):</strong> Edexcel specification requires ONE consequence only. Writing two wastes 5 minutes with zero extra marks.
          </div>
          <div class="warning-node">
            <strong>4. King David Hotel Bombing (1946):</strong> Executed by Menachem Begin's Irgun militia, NOT by the mainstream Haganah or David Ben-Gurion.
          </div>
          <div class="warning-node">
            <strong>5. Camp David (1978) vs Washington (1979):</strong> Camp David was the negotiation framework; the formal peace treaty was the Treaty of Washington (1979).
          </div>
          <div class="warning-node">
            <strong>6. Black September (1970) Location:</strong> King Hussein crushed and expelled PLO guerrillas to Lebanon and Syria, NOT to Gaza or the West Bank.
          </div>
          <div class="warning-node">
            <strong>7. 1956 vs 1967 Sinai Outcomes:</strong> In 1956 Israel seized Sinai but withdrew under US financial pressure; in 1967 Israel occupied Sinai until the 1979 treaty.
          </div>
          <div class="warning-node">
            <strong>8. The Bar-Lev Line (1973):</strong> Israel's fortified sand-rampart along Suez was breached by Egyptian high-pressure water monitors, not conventional artillery.
          </div>
        </div>
      </div>

      <!-- Archival Seal & Publishing Imprint -->
      <div class="archival-seal-block">
        <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase;">
          THE HISTORY DEPARTMENT &bull; REVISION ARCHIVE
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 2px;">
          Published for Full-Course Academic Revision & Formative Homework Tracking &bull; Pearson Edexcel Specification 1HI0/2B
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">20/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[19]}</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

// --------------------------------------------------------------------------
// PUPPETEER RUNNER & AUDIT PIPELINE
// --------------------------------------------------------------------------
async function compilePdf() {
  console.log('🚀 Loading master curriculum questions from data.js...');
  const curatedLessons = loadCuratedQuestions();
  console.log(
    `✅ Loaded ${curatedLessons.length} lessons with 144 total curated questions (12 Qs per lesson).`,
  );

  const html = buildHtml(curatedLessons);
  const publicHtml = path.join(
    ROOT_DIR,
    'public',
    'units',
    'cme_new',
    'cme_master_retrieval_companion.html',
  );
  const unitHtml = path.join(ROOT_DIR, 'units', 'cme_new', 'cme_master_retrieval_companion.html');
  fs.writeFileSync(publicHtml, html, 'utf8');
  fs.writeFileSync(unitHtml, html, 'utf8');
  console.log(`✅ Saved HTML: ${publicHtml}`);

  console.log('🖨️ Launching Puppeteer to audit and compile Master 20-Page A4 PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.goto('file:///' + publicHtml.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Automated Page Budget & Overflow Audit
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
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: cme_master_retrieval_companion.html');
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
  console.log(`✅ Generated Master 20-Page A4 PDF: ${targetPdf}`);

  await browser.close();

  // Mirror to Google Drive Department File
  try {
    if (fs.existsSync(DRIVE_BASE)) {
      const gDriveTargets = [
        path.join(
          DRIVE_BASE,
          'Year 10 (GCSE)',
          'Paper 2 - Conflict in the Middle East',
          'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
        ),
        path.join(
          DRIVE_BASE,
          '02. GCSE (Years 10-11)',
          'Paper 2 - Conflict in the Middle East',
          '03. Retrieval Quizzing & Mastery',
          'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
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
      console.log('✅ Google Drive Department File updated with fresh 20-page A4 companion.');
    }
  } catch (err) {
    console.warn('⚠️ Warning: Google Drive sync issue:', err.message);
  }

  if (hasErrors) {
    console.warn(
      '⚠️ Some pages showed overflow during compilation. Please inspect audit table above.',
    );
  } else {
    console.log(
      '🎉 100% SUCCESS: All 20 pages compiled cleanly with 0px overflow! Ready for reprographics.',
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
