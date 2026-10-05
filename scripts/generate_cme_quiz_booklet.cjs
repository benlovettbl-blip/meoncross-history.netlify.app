/**
 * generate_cme_quiz_booklet.cjs
 *
 * Compiles the Master 20-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 2 (1HI0/2B): Conflict in the Middle East, 1945–1995.
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
// APPROVED WITTY FOOTERS (20 PAGES)
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
// LESSON METADATA & INQUIRY ENGINES
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
// PROTAGONISTS GALLERY (PAGE 19)
// --------------------------------------------------------------------------
const PROTAGONISTS = [
  {
    name: 'David Ben-Gurion',
    role: '1st Prime Minister of Israel (1948–53, 1955–63)',
    dates: '1886–1973',
    img: '/units/cme_new/assets/card_bengurion.png',
    decision:
      'Proclaimed Israel’s independence on 14 May 1948; integrated underground militias into the IDF; authorized the 1950 Law of Return and 1956 Sinai invasion.',
  },
  {
    name: 'Gamal Abdel Nasser',
    role: 'President of Egypt (1954–1970)',
    dates: '1918–1970',
    img: '/units/cme_new/assets/card_nasser.png',
    decision:
      'Nationalised the Suez Canal in July 1956; champion of Pan-Arab nationalism; closed Straits of Tiran in 1967; led Egypt through the 1969–70 War of Attrition.',
  },
  {
    name: 'Moshe Dayan',
    role: 'IDF Chief of Staff & Defence Minister',
    dates: '1915–1981',
    img: '/units/cme_new/assets/card_dayan.png',
    decision:
      'Masterminded the 1956 Sinai campaign and 1967 Six-Day War blitzkrieg; famously captured East Jerusalem and the Western Wall; later helped negotiate Camp David.',
  },
  {
    name: 'Anwar Sadat',
    role: 'President of Egypt (1970–1981)',
    dates: '1918–1981',
    img: '/units/cme_new/assets/card_sadat.png',
    decision:
      'Launched the surprise 1973 Yom Kippur offensive; flew courageously to Jerusalem in 1977; signed the 1978 Camp David Accords; assassinated in 1981.',
  },
  {
    name: 'Menachem Begin',
    role: 'Prime Minister of Israel (1977–1983)',
    dates: '1913–1992',
    img: '/units/cme_new/assets/card_begin.png',
    decision:
      'Former Irgun commander; elected Likud leader in 1977; signed the 1979 Treaty of Washington returning Sinai; authorized the controversial 1982 invasion of Lebanon.',
  },
  {
    name: 'Yasser Arafat',
    role: 'Chairman of the PLO (1969–2004)',
    dates: '1929–2004',
    img: '/units/cme_new/assets/card_arafat.png',
    decision:
      'Leader of Fatah; delivered 1974 UN "Olive Branch and Freedom Fighter\'s Gun" speech; signed 1993 Oslo Accords and became head of the Palestinian Authority.',
  },
  {
    name: 'Ariel Sharon',
    role: 'IDF General & Defence Minister',
    dates: '1928–2014',
    img: '/units/cme_new/assets/card_sharon.png',
    decision:
      'Led the daring armored crossing of the Suez Canal in 1973, encircling Egypt’s 3rd Army; architect of the 1982 invasion of Lebanon; rebuked by Kahan Commission.',
  },
  {
    name: 'Yitzhak Rabin',
    role: 'IDF Chief of Staff & Prime Minister (1974–77, 1992–95)',
    dates: '1922–1995',
    img: '/units/cme_new/assets/card_rabin.png',
    decision:
      'Commanded IDF in 1967 Six-Day War; signed the historic 1993 Oslo Declaration of Principles and 1994 Jordan Peace Treaty; assassinated by Jewish extremist in 1995.',
  },
];

// --------------------------------------------------------------------------
// TIER 3 DISCIPLINARY VOCABULARY (PAGE 19)
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
    def: 'Supreme independent authority and legitimate political power over a defined territory and population without foreign control.',
  },
  {
    term: 'Fedayeen',
    phonetic: '[fed-ah-YEEN]',
    def: 'Arabic for "self-sacrificers"; armed Palestinian nationalist guerrillas who carried out cross-border raids and armed attacks into Israeli territory.',
  },
  {
    term: 'Pan-Arabism',
    phonetic: '[pan-AIR-uh-biz-uhm]',
    def: 'The political ideology championed by Nasser promoting the unification of Arab countries across North Africa and the Middle East into a single bloc.',
  },
  {
    term: 'Pre-emptive Strike',
    phonetic: '[pree-EMP-tiv]',
    def: 'A military attack initiated to disable or destroy an enemy’s offensive capability when an attack by that enemy is believed to be imminent.',
  },
  {
    term: 'Attrition',
    phonetic: '[uh-TRISH-uhn]',
    def: 'A military strategy designed to wear down an opponent through continuous bombardment, economic disruption, and sustained personnel losses.',
  },
  {
    term: 'Demilitarised Zone (DMZ)',
    phonetic: '[dee-MIL-i-tuh-ryzd]',
    def: 'An agreed geographic area where military forces, armaments, and military installations are prohibited by international treaty.',
  },
  {
    term: 'Intifada',
    phonetic: '[in-tih-FAH-duh]',
    def: 'Arabic for "shaking off"; the spontaneous grassroots Palestinian uprising of civil disobedience, strikes, and stone-throwing beginning in December 1987.',
  },
];

// --------------------------------------------------------------------------
// EXTRACT & CURATE QUESTIONS FROM Master data.js
// --------------------------------------------------------------------------
function loadCuratedQuestions() {
  const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
  const raw = require(dataPath);
  const cme = raw.unitData || raw;
  const lessons = cme.lessons;

  const curated = [];

  // LESSON 1: Special 1945 Baseline Curation (6 Anchor Questions)
  const l1Questions = [
    {
      q: 'What 1917 British diplomatic statement promised support for a "national home for the Jewish people" in Palestine?',
      a: 'The Balfour Declaration',
      exp: 'Authored by Foreign Secretary Arthur Balfour, this 67-word pledge gave Zionist aspirations official British imperial sponsorship.',
      tier: 'Tier 1: Core Foundation (Grades 1–4)',
    },
    {
      q: 'What 1915 correspondence led Arab leaders to believe Britain had promised post-war Arab independence across Palestine?',
      a: 'The McMahon-Hussein Correspondence',
      exp: 'Sir Henry McMahon traded promises of Arab independence to Sharif Hussein of Mecca in exchange for an Arab revolt against the Ottoman Empire.',
      tier: 'Tier 1: Core Foundation (Grades 1–4)',
    },
    {
      q: 'What 1939 British government policy paper restricted Jewish immigration into Palestine to 75,000 over five years?',
      a: 'The 1939 British White Paper (MacDonald White Paper)',
      exp: 'Seeking Arab support ahead of WWII, Britain abandoned partition plans and capped immigration, alienating Zionists during the Holocaust.',
      tier: 'Tier 2: Causal Mechanism (Grades 5–7)',
    },
    {
      q: 'Following the liberation of Nazi concentration camps in 1945, what urgent humanitarian demand did US President Truman make of Britain?',
      a: 'Immediate admission of 100,000 Jewish Displaced Persons (DPs)',
      exp: 'Truman pressured Prime Minister Clement Attlee to open Palestine’s gates to Holocaust survivors stranded in European camps.',
      tier: 'Tier 2: Causal Mechanism (Grades 5–7)',
    },
    {
      q: 'In 1945 at the end of the Second World War, what was the approximate demographic balance in Mandatory Palestine?',
      a: 'Approximately 1.2 million Palestinian Arabs and 600,000 Jews',
      exp: 'Arabs formed a 2:1 majority and demanded a unitary democratic state; Zionists demanded a sovereign Jewish majority state to secure sanctuary.',
      tier: 'Tier 3: Grade 8/9 Examiner Nuance (Grades 8–9)',
    },
    {
      q: 'Why did the British Labour government under Clement Attlee decide to refer the Palestine Mandate to the United Nations in February 1947?',
      a: 'Armed Jewish insurgency, economic exhaustion after WWII, and irreconcilable Arab-Jewish demands',
      exp: 'Attlee and Foreign Secretary Ernest Bevin concluded that maintaining 100,000 British troops in Palestine was politically and financially untenable.',
      tier: 'Tier 3: Grade 8/9 Examiner Nuance (Grades 8–9)',
    },
  ];
  curated.push({
    cfg: LESSON_HEADERS[0],
    questions: l1Questions,
  });

  // LESSONS 2 to 12: 12 Tiered Questions per Lesson
  for (let i = 1; i < 12; i++) {
    const l = lessons[i];
    const cfg = LESSON_HEADERS[i];
    const quiz = l.quiz || [];

    const qList = [];
    const pool = quiz.slice(0, 20);

    for (let k = 0; k < 12; k++) {
      const srcQ = pool[k] || {
        q: `Sample question ${k + 1}`,
        a: 'Core Fact',
        explanation: 'Historical explanation.',
      };
      let tierLabel = 'Tier 1: Core Foundation (Grades 1–4)';
      if (k >= 4 && k < 8) tierLabel = 'Tier 2: Causal Mechanism (Grades 5–7)';
      if (k >= 8) tierLabel = 'Tier 3: Grade 8/9 Examiner Nuance (Grades 8–9)';

      qList.push({
        q: srcQ.q || srcQ.question,
        a: srcQ.a || srcQ.answer,
        exp: srcQ.explanation || srcQ.exp || '',
        tier: tierLabel,
      });
    }

    curated.push({
      cfg: cfg,
      questions: qList,
    });
  }

  return curated;
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
      margin: 8mm 10mm 6mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.4pt;
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
      height: 280mm;
      max-height: 280mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 1.5mm 0;
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
      padding-bottom: 1.5px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 1.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #000000;
    }
    .footer-page-num { font-weight: 800; }
    .footer-quip { font-style: italic; color: #111111; font-weight: 500; }

    /* Page 1: Cover Styles */
    .cover-top-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-radius: 2px;
      margin-bottom: 3px;
    }
    .cover-title-box {
      border: 2px solid #000000;
      padding: 6px 10px;
      text-align: center;
      background: #fafafa;
      margin-bottom: 4px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 15.5pt;
      font-weight: 900;
      color: #000000;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.2px;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .scholar-card {
      border: 1.5px solid #000000;
      background: #ffffff;
      padding: 4px 8px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 3.5px;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
    }
    .scholar-field { display: flex; align-items: baseline; gap: 4px; }
    .scholar-field strong { font-weight: 900; color: #000; }
    .scholar-field .field-line { flex: 1; border-bottom: 1px solid #000; height: 10px; }

    /* Homework Tracking Table (Page 1) */
    .hw-ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      margin-bottom: 3px;
    }
    .hw-ledger-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 2.2px 4px;
      font-weight: 800;
      text-transform: uppercase;
      border: 1px solid #0f172a;
      text-align: center;
    }
    .hw-ledger-table td {
      border: 1px solid #cbd5e1;
      padding: 1.8px 4px;
      vertical-align: middle;
      color: #000000;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    .traffic-tier-box {
      border: 1px solid #000;
      border-radius: 2px;
      padding: 2.5px 6px;
      background: #f1f5f9;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 700;
      margin-bottom: 3px;
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
      border-radius: 2px;
      padding: 2px 4px;
      background: #ffffff;
      display: flex;
      gap: 5px;
      align-items: flex-start;
      line-height: 1.15;
    }
    .domino-year {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 900;
      padding: 1px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }
    .domino-body { flex: 1; }
    .domino-title { font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 800; color: #000000; display: block; margin-bottom: 0.5px; }
    .domino-desc { font-family: 'Georgia', serif; font-size: 6.3pt; color: #222222; }

    /* Lesson Question Pages (Pages 3–14) */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 3.5px solid #0f172a;
      padding: 2.2px 6px;
      margin-bottom: 2px;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .tier-header-strip {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 1.2px 5px;
      margin: 1.5px 0 1.2px 0;
      border-radius: 1px;
    }
    .q-block {
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 2px 5px;
      margin-bottom: 1.5px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 4px;
      line-height: 1.15;
    }
    .q-prompt-wrap { display: flex; gap: 3.5px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; color: #000000; min-width: 14px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.15; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 70px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.3px solid #000000;
      height: 6.4mm;
    }

    /* Page 3: 1945 Baseline Matrix */
    .matrix-box {
      border: 1.5px solid #0f172a;
      border-radius: 2px;
      padding: 3.5px 6px;
      background: #f8fafc;
      margin-top: 3px;
    }
    .matrix-header {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1px solid #0f172a;
      padding-bottom: 1.5px;
      margin-bottom: 2.5px;
      display: flex;
      justify-content: space-between;
    }
    .matrix-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px;
      font-family: 'Georgia', serif;
      font-size: 6.6pt;
      line-height: 1.18;
    }
    .matrix-card {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 2.5px 5px;
      border-radius: 2px;
    }
    .matrix-card strong { font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; display: block; margin-bottom: 1px; }

    /* Pages 15–18: Department Marking Bank */
    .mb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 7px;
      flex: 1;
      margin-top: 1.5px;
    }
    .mb-lesson-col {
      display: flex;
      flex-direction: column;
      gap: 2.0px;
    }
    .mb-lesson-title {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      padding: 2px 5px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-radius: 1px;
    }
    .ans-card {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      border-radius: 2px;
      padding: 1.5px 3.5px;
      display: flex;
      gap: 3px;
      font-size: 6.2pt;
      line-height: 1.15;
    }
    .ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; min-width: 12px; }
    .ans-body { flex: 1; }
    .ans-core { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; }
    .ans-exp { color: #334155; font-style: italic; }
    .ans-check { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; color: #475569; white-space: nowrap; }

    /* Page 19: Protagonists & Vocabulary */
    .proto-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 6px;
      margin-bottom: 3px;
    }
    .proto-card {
      border: 1px solid #0f172a;
      border-radius: 2px;
      padding: 2px 4px;
      background: #ffffff;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .proto-img {
      width: 26px;
      height: 32px;
      object-fit: cover;
      border: 1px solid #000;
      border-radius: 1px;
      flex-shrink: 0;
    }
    .proto-info { flex: 1; line-height: 1.12; }
    .proto-name { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; color: #000000; }
    .proto-role { font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 700; color: #475569; display: block; }
    .proto-dec { font-family: 'Georgia', serif; font-size: 5.9pt; color: #1e293b; margin-top: 0.5px; }

    .vocab-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5px 5px;
    }
    .vocab-card {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      padding: 2px 4px;
      background: #f8fafc;
      font-size: 6.2pt;
      line-height: 1.12;
    }
    .vocab-term { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; }
    .vocab-phonetic { font-style: italic; color: #64748b; font-size: 5.6pt; }
    .vocab-def { color: #1e293b; display: block; margin-top: 0.5px; }

    /* Page 20: Back Cover Strategy */
    .strategy-card {
      border: 1.5px solid #0f172a;
      border-radius: 2px;
      padding: 3.5px 6px;
      background: #ffffff;
      margin-bottom: 3px;
    }
    .strat-header {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 1px;
      margin-bottom: 1.5px;
      display: flex;
      justify-content: space-between;
    }
    .strat-body { font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.18; color: #111111; }
    .archival-seal-block {
      border: 2px solid #000000;
      padding: 3.5px 8px;
      text-align: center;
      background: #fafafa;
      margin-top: 2.5px;
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
        <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #444; margin-top: 2px;">
          Exhaustive Dual-Tier Retrieval: Core Facts &bull; Causal Explanations &bull; Grade 9 Specification Mastery
        </div>
      </div>

      <div class="scholar-card">
        <div class="scholar-field"><strong>Scholar:</strong><div class="field-line"></div></div>
        <div class="scholar-field"><strong>Class / Group:</strong><div class="field-line"></div></div>
        <div class="scholar-field"><strong>Teacher:</strong><div class="field-line"></div></div>
      </div>

      <!-- 12-Week Homework Tracker -->
      <table class="hw-ledger-table">
        <thead>
          <tr>
            <th style="width: 24px;">Wk</th>
            <th>Specification Lesson & Topic Focus</th>
            <th style="width: 58px;">1st Score</th>
            <th style="width: 58px;">2nd Score</th>
            <th style="width: 145px;">Retrieval Strength (Metacognition)</th>
            <th style="width: 80px;">Staff Sign</th>
          </tr>
        </thead>
        <tbody>
          ${LESSON_HEADERS.map(
            (h, idx) => `
          <tr>
            <td style="text-align: center; font-weight: 800;">${idx + 1}</td>
            <td><strong>KT ${idx < 4 ? '1.' + idx : idx < 9 ? '2.' + (idx - 4) : '3.' + (idx - 9)}:</strong> ${h.title}</td>
            <td style="text-align: center;">___ / 12</td>
            <td style="text-align: center;">___ / 12</td>
            <td>[ &nbsp; ] Instant &nbsp; [ &nbsp; ] Effortful &nbsp; [ &nbsp; ] Restudy</td>
            <td style="text-align: center;">________</td>
          </tr>
          `,
          ).join('')}
        </tbody>
      </table>

      <!-- Traffic Light Box -->
      <div class="traffic-tier-box">
        <span>🟢 <strong>Green (10–12/12):</strong> Secure Core Recall</span>
        <span>🟡 <strong>Amber (7–9/12):</strong> Green-Pen DIRT Review</span>
        <span>🔴 <strong>Red (0–6/12):</strong> Flashcard Restudy & Mandatory Re-attempt</span>
      </div>

      <!-- QR & Portal Banner -->
      <div style="display: flex; gap: 8px; align-items: center; border: 1.2px solid #0f172a; padding: 3px 6px; border-radius: 2px; background: #ffffff;">
        <div style="width: 32px; height: 32px; flex-shrink: 0;">${qrSvg}</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.18; color: #1e293b; flex: 1;">
          <strong>Interactive Quizzing & Digital Flashcards:</strong> Scan this QR code or access the Department Portal to practice all 240 questions interactively with instant Leitner spaced repetition.
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
  // PAGE 3: LESSON 1 — THE 1945 BASELINE & IMPERIAL ROOTS (SLIMMED DOWN)
  // ========================================================================
  const l1Data = curatedLessons[0];
  html += `
  <div class="page-container" id="page-3">
    <div class="page-body-full">
      <div class="running-header">
        <span>KT 1.0 &bull; LESSON 1 RETRIEVAL: THE 1945 BASELINE & IMPERIAL ROOTS</span>
        <span>FOUNDATION ANCHOR QUESTIONS</span>
      </div>

      <div class="lesson-meta-bar">
        <h2 class="lesson-meta-title">${l1Data.cfg.title}</h2>
        <div class="lesson-meta-enquiry">Enquiry Question: ${l1Data.cfg.enquiry}</div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2px;">
        <div class="tier-header-strip">Specification Anchor Questions: Pre-1945 Causal Legacies (6 Critical Benchmarks)</div>
        ${l1Data.questions
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
            <span class="q-line-lbl">Core Fact:</span>
            <div class="q-solid-line"></div>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">The Explanation:</span>
            <div class="q-solid-line"></div>
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- 1945 Strategic Baseline Actor Matrix -->
      <div class="matrix-box">
        <div class="matrix-header">
          <span>The 1945 Geopolitical Baseline: Conflicting Factions & Strategic Positions</span>
          <span>Post-WWII Crisis</span>
        </div>
        <div class="matrix-grid">
          <div class="matrix-card">
            <strong>1. The British Mandate Administration</strong>
            Exhausted economically after WWII; committed to 1939 White Paper immigration caps to placate Arab states; caught in military crossfire between underground Jewish insurgent groups and Arab resistance.
          </div>
          <div class="matrix-card">
            <strong>2. The Yishuv & Jewish Agency (David Ben-Gurion)</strong>
            Demanded immediate immigration of 100,000 Holocaust survivors from European Displaced Persons camps; backed united resistance (Haganah, Irgun, Lehi) to force Britain out of Palestine.
          </div>
          <div class="matrix-card">
            <strong>3. Palestinian Arabs & The Arab League (1945)</strong>
            Formed 2:1 majority in Palestine (1.2m Arabs vs 600,000 Jews); demanded immediate independence based on majority rule; rejected partition and any continued Zionist immigration as imperial dispossession.
          </div>
          <div class="matrix-card">
            <strong>4. The United States & United Nations</strong>
            President Harry S. Truman pressured Attlee to open gates to survivors; in Feb 1947, Britain referred the Mandate to the newly founded UN, triggering the UNSCOP partition investigation.
          </div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">3/20</span>
        <span class="footer-quip">${APPROVED_FOOTERS[2]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGES 4 TO 14: LESSONS 2 TO 12 (THE 11 CORE SPECIFICATION LESSONS)
  // ========================================================================
  for (let pIdx = 1; pIdx < 12; pIdx++) {
    const lData = curatedLessons[pIdx];
    const pageNum = pIdx + 3; // Pages 4 to 14

    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="page-body-full">
      <div class="running-header">
        <span>KEY TOPIC ${pIdx < 4 ? '1.' + pIdx : pIdx < 9 ? '2.' + (pIdx - 4) : '3.' + (pIdx - 9)} &bull; LESSON ${pIdx + 1} RETRIEVAL COMPANION</span>
        <span>12 TIERED QUESTIONS &bull; PAPER 2 (1HI0/2B)</span>
      </div>

      <div class="lesson-meta-bar">
        <h2 class="lesson-meta-title">Lesson ${pIdx + 1}: ${lData.cfg.title}</h2>
        <div class="lesson-meta-enquiry">Enquiry Question: ${lData.cfg.enquiry}</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
        <!-- TIER 1 -->
        <div class="tier-header-strip">Tier 1: Core Foundation & Chronology (Grades 1–4) &bull; Q1 to Q4</div>
        ${lData.questions
          .slice(0, 4)
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
            <span class="q-line-lbl">Core Fact:</span>
            <div class="q-solid-line"></div>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">The Explanation:</span>
            <div class="q-solid-line"></div>
          </div>
        </div>
        `,
          )
          .join('')}

        <!-- TIER 2 -->
        <div class="tier-header-strip">Tier 2: Causal Mechanism & Process (Grades 5–7) &bull; Q5 to Q8</div>
        ${lData.questions
          .slice(4, 8)
          .map(
            (q, qIdx) => `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${qIdx + 5}.</span>
              <span class="q-prompt">${q.q}</span>
            </div>
            <span class="q-attempt">[ 1st: ___ / 2nd: ___ ]</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Causal Fact:</span>
            <div class="q-solid-line"></div>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Mechanism:</span>
            <div class="q-solid-line"></div>
          </div>
        </div>
        `,
          )
          .join('')}

        <!-- TIER 3 -->
        <div class="tier-header-strip">Tier 3: Grade 8/9 Examiner Nuance & Impact (Grades 8–9) &bull; Q9 to Q12</div>
        ${lData.questions
          .slice(8, 12)
          .map(
            (q, qIdx) => `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${qIdx + 9}.</span>
              <span class="q-prompt">${q.q}</span>
            </div>
            <span class="q-attempt">[ 1st: ___ / 2nd: ___ ]</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Significance:</span>
            <div class="q-solid-line"></div>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Analytical Link:</span>
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
  // PAGES 15 TO 18: DEPARTMENT MARKING BANK (3 LESSONS PER PAGE)
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
        <span>SELF-ASSESSMENT &bull; DIRT GREEN-PEN LOOP</span>
      </div>

      <div class="mb-grid">
        ${grp.lessons
          .map((lIdx) => {
            const lData = curatedLessons[lIdx];
            return `
          <div class="mb-lesson-col" style="${grp.lessons.indexOf(lIdx) === 2 ? 'grid-column: 1 / -1;' : ''}">
            <div class="mb-lesson-title">Lesson ${lIdx + 1}: ${lData.cfg.title} (${lData.questions.length} Qs)</div>
            ${lData.questions
              .map(
                (q, qIdx) => `
            <div class="ans-card">
              <span class="ans-num">${qIdx + 1}.</span>
              <div class="ans-body">
                <span class="ans-core">${q.a}</span> —
                <span class="ans-exp">${q.exp}</span>
              </div>
              <span class="ans-check">[ ✓ ] [ ✗ ]</span>
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
        <span>EDEXCEL PAPER 2 &bull; KEY PROTAGONISTS GALLERY & TIER 3 DISCIPLINARY VOCABULARY</span>
        <span>EXAMINER BIOGRAPHICAL MASTERY</span>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #0f172a; padding-bottom: 1px; margin-bottom: 2px;">
        Key Historical Protagonists: 8 Pivotal Decision-Makers (1945–1995)
      </div>

      <div class="proto-grid">
        ${PROTAGONISTS.map(
          (p) => `
        <div class="proto-card">
          <img src="${p.img}" class="proto-img" alt="${p.name}">
          <div class="proto-info">
            <span class="proto-name">${p.name} <em style="font-size: 6pt; color: #555;">(${p.dates})</em></span>
            <span class="proto-role">${p.role}</span>
            <div class="proto-dec">${p.decision}</div>
          </div>
        </div>
        `,
        ).join('')}
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #0f172a; padding-bottom: 1px; margin: 3px 0 2px 0;">
        Tier 3 Academic & Disciplinary Vocabulary (High-Yield Examiner Lexicon)
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
  // PAGE 20: BACK COVER — EDEXCEL PAPER 2 GRADE 9 EXAM STRATEGY & ESSAY ARCHITECT
  // ========================================================================
  html += `
  <div class="page-container" id="page-20">
    <div class="page-body-full">
      <div class="cover-top-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span> &bull; Edexcel GCSE Paper 2 Examination Strategy
      </div>

      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 1: Explain One Consequence [4 marks &bull; 5 Minutes]</span>
          <span>The P-F-C High-Yield Formula</span>
        </div>
        <div class="strat-body">
          <strong>Point (1 Sentence):</strong> Directly state one clear consequence of the named event.<br>
          <strong>Fact (1–2 Sentences):</strong> Support with precise historical evidence (dates, casualty numbers, treaty names, key individuals).<br>
          <strong>Consequence Link (1 Sentence):</strong> Explain the exact causal mechanism of how this altered relations, triggered retaliation, or transformed the balance of power.
        </div>
      </div>

      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 2: Narrative Account [8 marks &bull; 12 Minutes]</span>
          <span>The 3-Phase Chronological Planning Strip</span>
        </div>
        <div class="strat-body">
          <strong>Phase 1: Catalyst & Origin:</strong> Establish the initial trigger, underlying grievances, and early escalation.<br>
          <strong>Phase 2: Turning Point & Escalation:</strong> Explain the crucial military, diplomatic, or political development linking Phase 1 to Phase 3.<br>
          <strong>Phase 3: Direct Outcome & Deadlock:</strong> Explain the final consequence, treaty, or geopolitical transformation.<br>
          <em>Examiner Rule:</em> Every paragraph must use causal connectives (<em>"Consequently", "In direct response to", "This culminated in"</em>) to secure Level 4.
        </div>
      </div>

      <div class="strategy-card">
        <div class="strat-header">
          <span>Question 3: Explain the Importance [8 marks &bull; 12 Minutes]</span>
          <span>Dual-Aspect Comparative Significance</span>
        </div>
        <div class="strat-body">
          <strong>Aspect 1 (Immediate / Operational):</strong> Explain how the event directly impacted military balances or tactical realities.<br>
          <strong>Aspect 2 (Long-Term / Geopolitical):</strong> Explain the broader impact on international superpower involvement or peace negotiations.<br>
          <strong>Sustained Conclusion:</strong> Evaluate which aspect proved more significant in prolonging or resolving the Arab-Israeli deadlock.
        </div>
      </div>

      <div class="archival-seal-block">
        <div style="font-family: 'Playfair Display', serif; font-size: 10pt; font-weight: 900; letter-spacing: 1px;">
          THE HISTORY DEPARTMENT &bull; REVISION ARCHIVE
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.8pt; font-style: italic; color: #444; margin-top: 1.5px;">
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
  console.log(`✅ Loaded ${curatedLessons.length} lessons with 138 total curated questions.`);

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
  const legacyFullPdf = path.join(PDFS_DIR, 'cme_recall_quiz_FULL.pdf');

  await page.pdf({
    path: targetPdf,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 20-Page A4 PDF: ${targetPdf}`);

  // Also replace legacy multiple-choice dump
  fs.copyFileSync(targetPdf, legacyFullPdf);
  console.log(`✅ Updated legacy PDF replacement: ${legacyFullPdf}`);

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
