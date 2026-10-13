const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const {
  renderStandardFrontCover,
  renderStandardBackCover,
} = require('./components/render_standard_cover.cjs');

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

// Approved Witty Revision Quips (Exact 28 Pages for CME Key Topic 2)
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 2 • The History Department', // Page 1
  '"Remember: A crisis without a plan is just an essay waiting to happen."', // Page 2
  '"Chronology is king: 1967 happens before 1973, even under exam pressure!"', // Page 3
  '"Don\'t just state the Straits were closed — explain who couldn\'t sail through them!"', // Page 4
  '"Operation Focus took 45 minutes; you have 10 minutes to write this answer."', // Page 5
  '"Pre-emptive air strikes destroyed 400 Egyptian MiGs: deploy exact numbers for Band 4."', // Page 6
  '"Extended responses win Grade 9: evaluate tactical surprise against long-term occupation."', // Page 7
  '"Triple territory gained in six days: please write more than six lines about it."', // Page 8
  '"Topography wins wars: who controls the Golan Heights controls the skyline."', // Page 9
  '"The conquest of the West Bank and Gaza: explain why territorial depth created new diplomatic traps."', // Page 10
  '"Write with precision: explain how Israeli settlement policy began immediately after the Six-Day War."', // Page 11
  '"The \'Three Noes\' of Khartoum: No peace, no recognition, no negotiations (and no blank answers!)."', // Page 12
  '"Resolution 242 was deliberately ambiguous; your exam answer should NOT be."', // Page 13
  '"Territory for peace: explain why the missing word \'the\' in Resolution 242 sparked 50 years of debate."', // Page 14
  '"The War of Attrition: artillery duels along the Suez Canal proved the 1967 borders were unstable."', // Page 15
  '"Hijackings made headlines, but did they win hearts? Evaluate the consequence."', // Page 16
  '"Munich broadcast terror into 900 million homes: explain that importance clearly."', // Page 17
  '"Black September 1970: King Hussein expelled the PLO to Lebanon; trace the causal chain."', // Page 18
  '"Internationalisation of the Palestinian cause: weigh global attention against diplomatic condemnation."', // Page 19
  '"The Bar-Lev Line took 3 years to build and 2 hours to breach — detail matters."', // Page 20
  '"A war fought on holy days: keep your cause and consequence strictly separated."', // Page 21
  '"Operation Badr and SAM umbrellas: explain how Egyptian planning shattered Israel\'s air supremacy."', // Page 22
  '"OPEC oil embargo: when oil jumped 300%, Washington realised Middle East diplomacy was urgent."', // Page 23
  '"Cartographic evidence: Golan, Sinai, and the Bar-Lev Line dictated military strategy in 1973."', // Page 24
  '"Grade 9 formula: Point, Fact, Consequence — sustain your historical analysis across all paragraphs."', // Page 25
  '"Synoptic mastery: compare the causes and outcomes of the 1967 and 1973 wars directly."', // Page 26
  '"Final timed assessment: three sustained paragraphs, zero fluff, maximum historical precision."', // Page 27
  'Key Topic 2 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub', // Page 28
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Footer Text on the Same Line)
// Even pages (verso/left): Page number on left, text on right.
// Odd pages (recto/right): Text on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, text, totalPages = 24) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${text}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${text}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// 5 DEDICATED KEY TOPIC 2 LESSON CONFIGURATIONS (LESSONS 5 TO 9)
// ============================================================================
const kt2Configs = [
  {
    lessonIndex: 4,
    lessonNum: 1,
    id: 'lesson_6',
    inquiryQuestion: 'What caused the outbreak of the Six-Day War in June 1967?',
    subTitle:
      'Key Topic 2.1: The Road to War: Water Wars, Guerrilla Raids & Skirmishes (1964–1967)',
    title: 'KT2.1: The Road to War: Water Wars & Skirmishes (1964–1967)',
    specAnchor: `The <strong>founding of the Palestine Liberation Organization (PLO) in 1964 and its aims</strong>; <strong>Fatah guerrilla raids</strong>; the <strong>Samu raid (1966)</strong>; <strong>Syrian border disputes and the Golan Heights</strong>; the <strong>April 1967 air skirmish</strong>; and <strong>Soviet false intelligence warnings</strong>.`,
    stages: [
      {
        step: 1,
        date: 'January 1964',
        questionHeading: 'Why did Arab leaders meet in Cairo and create the PLO in 1964?',
        bullets: [
          'Opposition to Jordan River Diversion',
          'Palestinian National Charter',
          'Armed Struggle by Fatah Fedayeen',
        ],
        keywords: [
          'Opposition to Jordan River Diversion',
          'Palestinian National Charter',
          'Armed Struggle by Fatah Fedayeen',
        ],
        clue: 'Why did Arab leaders meet in Cairo and create the PLO in 1964?',
        title: 'The 1964 Cairo Conference & PLO Founded',
      },
      {
        step: 2,
        date: '1964–1965',
        questionHeading: 'How did the dispute over River Jordan water spark military conflict?',
        bullets: [
          'National Water Carrier (Negev)',
          'Arab Headwater Diversion Plan',
          'Airstrikes on Syrian Construction',
        ],
        keywords: [
          'National Water Carrier (Negev)',
          'Arab Headwater Diversion Plan',
          'Airstrikes on Syrian Construction',
        ],
        clue: 'How did the dispute over River Jordan water spark military conflict?',
        title: 'The Dispute Over the River Jordan Waterways',
      },
      {
        step: 3,
        date: '1966',
        questionHeading: 'Why did Syria sponsor Fatah guerrilla raids across the border?',
        bullets: [
          'Radical Damascus Ba’ath Regime',
          'Bases in the Golan Heights',
          'Landmine Sabotage in Galilee Farms',
        ],
        keywords: [
          'Radical Damascus Ba’ath Regime',
          'Bases in the Golan Heights',
          'Landmine Sabotage in Galilee Farms',
        ],
        clue: 'Why did Syria sponsor Fatah guerrilla raids across the border?',
        title: 'Syrian Support for Fatah Border Raids',
      },
      {
        step: 4,
        date: '13 November 1966',
        questionHeading: 'What were the consequences of the Israeli reprisal raid on Samu?',
        bullets: [
          'Destruction of Over 100 Buildings',
          'Clashes with Jordanian Soldiers',
          'Violent West Bank Riots Against King',
        ],
        keywords: [
          'Destruction of Over 100 Buildings',
          'Clashes with Jordanian Soldiers',
          'Violent West Bank Riots Against King',
        ],
        clue: 'What were the consequences of the Israeli reprisal raid on Samu?',
        title: 'The Israeli Raid on Samu',
      },
      {
        step: 5,
        date: '7 April 1967',
        questionHeading: 'How did the 7 April dogfight escalate tensions toward all-out war?',
        bullets: [
          'Six Syrian MiG-21s Shot Down',
          'Israeli Victory Passes over Damascus',
          'Soviet False Intelligence Triggered',
        ],
        keywords: [
          'Six Syrian MiG-21s Shot Down',
          'Israeli Victory Passes over Damascus',
          'Soviet False Intelligence Triggered',
        ],
        clue: 'How did the 7 April dogfight escalate tensions toward all-out war?',
        title: 'The Aerial Battle of 7 April 1967',
      },
    ],
    vocabRef: '[Textbook §1.1–§1.2]',
    vocabPrompt:
      'Define the <strong>Headwater Diversion Plan</strong> and explain how it differed from a conventional border clash as a catalyst for military escalation:',
    consequenceA: {
      ref: '[Textbook §1.1 &amp; Source A]',
      question: 'Explain one consequence of the Cairo Conference (1964). [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Creation of the Palestine Liberation Organisation and unified Arab command) &bull; Fact (Arab League heads of state authorized the Palestinian National Charter and water diversion) &bull; Consequence (United Arab resistance and established armed fedayeen factions like Fatah to actively challenge Israel).',
    },
    consequenceB: {
      ref: '[Textbook §2.2, §3.1–§3.2 &amp; Source C]',
      question: 'Explain one consequence of the events of 7 April 1967. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Humiliating defeat for the Syrian Air Force and sharp escalation towards war) &bull; Fact (Israeli Mirage jets shot down six Syrian MiG-21s and flew victory passes over Damascus) &bull; Consequence (Provoked false Soviet intelligence reports in May 1967, pressuring Nasser to mobilise in Sinai).',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      ref: '[Textbook §1.1–§4.2 &amp; Sources A–C]',
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events leading to the outbreak of the Six-Day War (1967). [8 marks]',
      stimulus: ['Syria’s support for Fatah', 'The actions of Nasser'],
      structureStrip: [
        {
          col: '1. PHASE 1: BORDER TENSIONS (1964–66)',
          ref: '[Textbook §1.1–§2.2]',
          text: 'Explain the Cairo Conference (1964), Syria’s support for Fatah guerrilla raids across the border, and Israeli retaliatory strikes culminating in the events of 7 April 1967.',
        },
        {
          col: '2. PHASE 2: ESCALATION IN SINAI (MAY 1967)',
          ref: '[Textbook §3.1–§3.2]',
          text: 'Explain Soviet false warnings, and the actions of Nasser: expelling UNEF peacekeepers, mobilising 100,000 troops into Sinai, and blockading the Straits of Tiran.',
        },
        {
          col: '3. PHASE 3: OUTBREAK OF WAR (JUNE 1967)',
          ref: '[Textbook §4.1–§4.2]',
          text: 'Explain the Egyptian-Jordanian defence pact (30 May) encircling Israel, and Israel launching Operation Focus pre-emptive airstrikes on 5 June 1967.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'Cairo Conference (1964) &bull; Syria’s support for Fatah &bull; Samu raid &bull; events of 7 April 1967 &bull; Soviet false warnings &bull; actions of Nasser &bull; UNEF withdrawal &bull; Straits of Tiran &bull; Sharm el-Sheikh &bull; pre-emptive strike',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.1). In Milestones 1 and 2, sketch the Cairo Arab Summit symbol and annotate the blockade of the Straits of Tiran at Sharm el-Sheikh.',
    },
  },

  {
    lessonIndex: 5,
    lessonNum: 2,
    id: 'lesson_7',
    inquiryQuestion: 'How did Israel secure total military victory during the Six-Day War?',
    subTitle: 'Key Topic 2.2: The Outbreak & Course of the Six-Day War (June 1967)',
    title: 'KT2.2: The Outbreak & Course of the Six-Day War (June 1967)',
    specAnchor: `<strong>Causes of the Six-Day War</strong>: <strong>Nasser's remilitarisation of the Sinai and expulsion of UNEF</strong>; <strong>closure of the Straits of Tiran</strong>; the <strong>Egyptian-Jordanian Defence Pact</strong>; the <strong>Israeli pre-emptive air strike (Operation Focus, 5 June 1967)</strong>; <strong>air supremacy</strong>; and the <strong>rapid IDF tank blitzkrieg in Sinai, Jerusalem, the West Bank, and the Golan Heights</strong>.`,
    stages: [
      {
        step: 1,
        date: '13–15 May 1967',
        questionHeading:
          'How did Soviet false warnings trigger Egyptian troop mobilisation in Sinai?',
        bullets: [
          'Fabricated Syrian Border Threat',
          '100,000 Egyptian Soldiers Deployed',
          'Reasserting Pan-Arab Leadership',
        ],
        keywords: [
          'Fabricated Syrian Border Threat',
          '100,000 Egyptian Soldiers Deployed',
          'Reasserting Pan-Arab Leadership',
        ],
        clue: 'How did Soviet false warnings trigger Egyptian troop mobilisation in Sinai?',
        title: 'Soviet False Reports & Egyptian Mobilisation',
      },
      {
        step: 2,
        date: '16–23 May 1967',
        questionHeading: 'Why was closing the Straits of Tiran treated by Israel as a casus belli?',
        bullets: [
          'UNEF Peacekeepers Expelled',
          'Severing Oil Access to Eilat Port',
          'Violation of 1957 Maritime Pledge',
        ],
        keywords: [
          'UNEF Peacekeepers Expelled',
          'Severing Oil Access to Eilat Port',
          'Violation of 1957 Maritime Pledge',
        ],
        clue: 'Why was closing the Straits of Tiran treated by Israel as a casus belli?',
        title: 'UN Peacekeepers Expelled & Straits of Tiran Closed',
      },
      {
        step: 3,
        date: '30 May 1967',
        questionHeading:
          'How did the Egyptian-Jordanian Defence Pact encircle Israel on three fronts?',
        bullets: [
          'King Hussein Flies to Cairo',
          'Hostile Ring on Three Borders',
          'Moshe Dayan Named Defence Minister',
        ],
        keywords: [
          'King Hussein Flies to Cairo',
          'Hostile Ring on Three Borders',
          'Moshe Dayan Named Defence Minister',
        ],
        clue: 'How did the Egyptian-Jordanian Defence Pact encircle Israel on three fronts?',
        title: 'The Arab Defence Pact (Israel Encircled)',
      },
      {
        step: 4,
        date: '5 June 1967',
        questionHeading: 'How did Operation Focus destroy Arab air power on the first morning?',
        bullets: [
          'Flying Low Under Enemy Radar',
          'Over 300 Aircraft Wiped Out on Runway',
          'Uncontested Total Air Supremacy',
        ],
        keywords: [
          'Flying Low Under Enemy Radar',
          'Over 300 Aircraft Wiped Out on Runway',
          'Uncontested Total Air Supremacy',
        ],
        clue: 'How did Operation Focus destroy Arab air power on the first morning?',
        title: 'The Pre-Emptive Air Strike',
      },
      {
        step: 5,
        date: '5–10 June 1967',
        questionHeading: 'What territories did Israel conquer during the six days of fighting?',
        bullets: [
          'Sinai Peninsula & Gaza Strip Seized',
          'West Bank & Old City of Jerusalem',
          'Strategic Escarpment of Golan Heights',
        ],
        keywords: [
          'Sinai Peninsula & Gaza Strip Seized',
          'West Bank & Old City of Jerusalem',
          'Strategic Escarpment of Golan Heights',
        ],
        clue: 'What territories did Israel conquer during the six days of fighting?',
        title: 'The Six-Day Victory & The Conquered Territories',
      },
    ],
    vocabRef: '[Textbook §1.1–§2.1 &amp; Source A]',
    vocabPrompt:
      'Define a <strong>Pre-emptive Strike</strong> and explain why Israeli commanders argued Operation Focus was necessary for national survival on 5 June 1967:',
    consequenceA: {
      ref: '[Textbook §1.1–§1.2]',
      question:
        'Explain one consequence of the actions of Nasser in the period leading to war. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Forced Israel into launching a pre-emptive strike) &bull; Fact (Nasser mobilized troops in Sinai, expelled UNEF, and blockaded the Straits of Tiran at Sharm el-Sheikh) &bull; Consequence (Convinced Israeli leaders that war was imminent, prompting the surprise destruction of Arab air forces on 5 June 1967).',
    },
    consequenceB: {
      ref: '[Textbook §2.1–§3.2 &amp; Sources A &amp; B]',
      question: 'Explain one consequence of the outbreak of the Six-Day War (1967). [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Total Israeli military victory and capture of strategic territory) &bull; Fact (Israel destroyed Arab air forces within three hours, capturing the Sinai, Gaza Strip, West Bank, East Jerusalem, and Golan Heights) &bull; Consequence (Tripled the land under Israeli control and placed over 1 million Palestinian Arabs under military occupation).',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
      ref: '[Textbook §2.2, §3.1–§4.2 &amp; Source B (L6)]',
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the Golan Heights for Israeli security. [8 marks]',
      focusAspects: [
        'Protection of Galilee Farming Settlements & Water Sources',
        'Topographical High Ground & Strategic Early Warning',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: ENDING BORDER SHELLING',
          ref: '[Textbook §3.2]',
          text: 'Explain how Syrian artillery bunkers on the escarpment had terrorised Hula Valley kibbutzim for 19 years; controlling the heights permanently ended cross-border bombardments.',
        },
        {
          col: '2. POINT 2: STRATEGIC HIGH GROUND',
          ref: '[Textbook §3.2 &amp; §4.1]',
          text: 'Explain how holding Mt Hermon and the high volcanic plateau placed the IDF within 40 miles of Damascus, providing early radar warning and blocking Syrian armored invasions.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: REGIONAL BALANCE',
          ref: '[Textbook §4.1–§4.2]',
          text: 'Explain how holding the Golan Heights permanently transformed Israel from a vulnerable defensive position into the dominant military power on its northern frontier.',
        },
      ],
      connectives:
        'This was of paramount historical importance because... • In particular, a decisive factor was that... • Furthermore, this directly altered developments by... • On the other hand, an alternative critical perspective is that... • Consequently, this transformed relations because... • Ultimately, this was important because...',
      wordBank:
        'Golan Heights &bull; Galilee kibbutzim &bull; Hula Valley &bull; Syrian artillery bunkers &bull; General David Elazar &bull; Mt Hermon &bull; radar early warning &bull; Damascus buffer &bull; strategic depth &bull; 9–10 June assault',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.2). In Milestone 3, sketch Israeli Centurion tanks advancing through the desert and label the Golan Heights, West Bank, and Sinai.',
    },
  },

  {
    lessonIndex: 6,
    lessonNum: 3,
    id: 'lesson_8',
    inquiryQuestion: 'Why did the aftermath of the 1967 war lead to lasting diplomatic deadlock?',
    subTitle: 'Key Topic 2.3: The Aftermath: Resolution 242 & The Occupied Territories (1967)',
    title: 'KT2.3: The Aftermath: Resolution 242 & The Occupied Territories (1967)',
    specAnchor: `<strong>Consequences of the Six-Day War</strong>: <strong>territorial gains (Sinai, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights)</strong>; the <strong>refugee crisis</strong>; the <strong>Khartoum Resolution ("Three No's")</strong>; <strong>UN Resolution 242 ("Land for Peace")</strong>; and the <strong>start of Israeli settlement building</strong>.`,
    stages: [
      {
        step: 1,
        date: '7 June 1967',
        questionHeading:
          'Why did the capture and annexation of East Jerusalem cause global outcry?',
        bullets: [
          'Paratroopers Reach Western Wall',
          'Knesset Declares Unified Capital',
          'UN Declares Annexation Illegal',
        ],
        keywords: [
          'Paratroopers Reach Western Wall',
          'Knesset Declares Unified Capital',
          'UN Declares Annexation Illegal',
        ],
        clue: 'Why did the capture and annexation of East Jerusalem cause global outcry?',
        title: 'The Capture of East Jerusalem',
      },
      {
        step: 2,
        date: 'September 1967',
        questionHeading: 'Why did the Arab League issue the "Three Noes" at the Khartoum Summit?',
        bullets: [
          'Sudan Post-War Arab Summit',
          '"No Peace, No Recognition, No Negotiations"',
          'Decade-Long Diplomatic Stalemate',
        ],
        keywords: [
          'Sudan Post-War Arab Summit',
          '"No Peace, No Recognition, No Negotiations"',
          'Decade-Long Diplomatic Stalemate',
        ],
        clue: 'Why did the Arab League issue the "Three Noes" at the Khartoum Summit?',
        title: 'The Khartoum Summit & The "Three No’s"',
      },
      {
        step: 3,
        date: '22 November 1967',
        questionHeading: 'How did UN Resolution 242 establish the principle of "Land for Peace"?',
        bullets: [
          'Call for Withdrawal from Territories',
          'Arab Recognition of Secure Borders',
          'Deliberate English vs French Ambiguity',
        ],
        keywords: [
          'Call for Withdrawal from Territories',
          'Arab Recognition of Secure Borders',
          'Deliberate English vs French Ambiguity',
        ],
        clue: 'How did UN Resolution 242 establish the principle of "Land for Peace"?',
        title: 'UN Resolution 242: "Land for Peace"',
      },
      {
        step: 4,
        date: '1968–1969',
        questionHeading: 'Why did Israel build the fortified Bar-Lev Line along the Suez Canal?',
        bullets: [
          '20-Metre-High Sand Rampart',
          'Thirty Reinforced Concrete Bunkers',
          'Strategic Depth & Military Overconfidence',
        ],
        keywords: [
          '20-Metre-High Sand Rampart',
          'Thirty Reinforced Concrete Bunkers',
          'Strategic Depth & Military Overconfidence',
        ],
        clue: 'Why did Israel build the fortified Bar-Lev Line along the Suez Canal?',
        title: 'The Bar-Lev Line on the Suez Canal',
      },
      {
        step: 5,
        date: '1968–1973',
        questionHeading:
          'How did permanent Israeli settlements transform the occupied territories?',
        bullets: [
          'Allon Plan Security Outposts',
          'Civilian Communities in Jordan Valley',
          'Creating Permanent Facts on the Ground',
        ],
        keywords: [
          'Allon Plan Security Outposts',
          'Civilian Communities in Jordan Valley',
          'Creating Permanent Facts on the Ground',
        ],
        clue: 'How did permanent Israeli settlements transform the occupied territories?',
        title: 'The Beginning of Israeli Settlements',
      },
    ],
    vocabRef: '[Textbook §3.1–§3.2 &amp; Source C]',
    vocabPrompt:
      'Define the diplomatic principle of <strong>"Land for Peace"</strong> and explain why its interpretation caused 30 years of diplomatic stalemate after November 1967:',
    consequenceA: {
      ref: '[Textbook §3.1–§3.2 &amp; Source C]',
      question: 'Explain one consequence of UN Resolution 242. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Established the principle of "Land for Peace" but created lasting diplomatic stalemate) &bull; Fact (The resolution called for withdrawal from "territories occupied',
    },
    consequenceB: {
      ref: '[Textbook §1.1 &amp; §4.1–§4.2]',
      question: 'Explain one consequence of the continued dispute over the Suez Canal. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Triggered the War of Attrition and long-term economic disruption) &bull; Fact (The Suez Canal became the ceasefire frontline, remaining closed to international shipping from 1967 to 1975) &bull; Consequence (Led Israel to construct the fortified Bar-Lev Line and prompted persistent artillery and commando duels with Egypt).',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      ref: '[Textbook §1.1–§4.2 &amp; Sources A–C]',
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the aftermath of the 1967 war in the period from June to November 1967. [8 marks]',
      stimulus: ['The occupied territories', 'UN Resolution 242'],
      structureStrip: [
        {
          col: '1. PHASE 1: OCCUPATION & REFUGEES (JUNE)',
          ref: '[Textbook §1.1–§1.2 &amp; Source A]',
          text: 'Explain Israel annexing East Jerusalem and occupying Sinai, Gaza, West Bank, and Golan; 300,000+ Palestinian refugees fleeing across the River Jordan.',
        },
        {
          col: '2. PHASE 2: ARAB DEFIANCE AT KHARTOUM (AUG–SEPT)',
          ref: '[Textbook §2.1–§2.2 &amp; Source B]',
          text: 'Explain Arab heads of state meeting in Sudan to adopt the "Three Noes" (no peace, no recognition, no negotiation), refusing to concede defeat or negotiate.',
        },
        {
          col: '3. PHASE 3: UN RESOLUTION 242 (NOV 1967)',
          ref: '[Textbook §3.1–§4.2 &amp; Source C]',
          text: 'Explain British drafting of Resolution 242 establishing "Land for Peace", deliberate linguistic ambiguity ("territories occupied"), and resulting deadlock.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'Occupied territories &bull; 300,000 refugees &bull; West Bank &bull; Gaza Strip &bull; Golan Heights &bull; Khartoum Conference &bull; "Three Noes" &bull; UN Resolution 242 &bull; "Land for Peace" &bull; diplomatic deadlock',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.3). In Milestone 4, sketch the UN Security Council emblem and write out the three banners of the Khartoum "Three Noes".',
    },
  },

  {
    lessonIndex: 7,
    lessonNum: 4,
    id: 'lesson_9',
    inquiryQuestion:
      'Why did Palestinian groups turn to international terrorism between 1968 and 1972?',
    subTitle:
      'Key Topic 2.4: Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    title: 'KT2.4: Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    specAnchor: `The <strong>War of Attrition along the Suez Canal (1969–70)</strong>; the <strong>Battle of Karameh (1968)</strong>; the <strong>rise of Yasser Arafat</strong>; <strong>international aircraft hijackings (Dawson's Field, Sept 1970)</strong>; <strong>Black September in Jordan (1970)</strong>; and the <strong>Munich Olympics massacre (Sept 1972)</strong> followed by <strong>Operation Wrath of God</strong>.`,
    stages: [
      {
        step: 1,
        date: '21 March 1968',
        questionHeading:
          'How did the Battle of Karameh establish Yasser Arafat as leader of the PLO?',
        bullets: [
          'Fierce Hand-to-Hand Resistance',
          '28 Israeli Soldiers Killed',
          'Moral Victory for Armed Fedayeen',
        ],
        keywords: [
          'Fierce Hand-to-Hand Resistance',
          '28 Israeli Soldiers Killed',
          'Moral Victory for Armed Fedayeen',
        ],
        clue: 'How did the Battle of Karameh establish Yasser Arafat as leader of the PLO?',
        title: 'The Battle of Karameh',
      },
      {
        step: 2,
        date: 'September 1970',
        questionHeading: 'Why did the PFLP hijack Western airliners to Dawson’s Field in 1970?',
        bullets: [
          'George Habash & Marxist Faction',
          'Blowing Up Jets for World Television',
          'Humiliating King Hussein’s Sovereignty',
        ],
        keywords: [
          'George Habash & Marxist Faction',
          'Blowing Up Jets for World Television',
          'Humiliating King Hussein’s Sovereignty',
        ],
        clue: 'Why did the PFLP hijack Western airliners to Dawson’s Field in 1970?',
        title: 'The Dawson’s Field Airline Hijackings',
      },
      {
        step: 3,
        date: 'September 1970',
        questionHeading: 'Why did King Hussein expel the PLO during Black September in 1970?',
        bullets: [
          'Threat of Armed "State-Within-a-State"',
          'Ten-Day Armoured Camp Offensive',
          'Fighters Relocated to Southern Lebanon',
        ],
        keywords: [
          'Threat of Armed "State-Within-a-State"',
          'Ten-Day Armoured Camp Offensive',
          'Fighters Relocated to Southern Lebanon',
        ],
        clue: 'Why did King Hussein expel the PLO during Black September in 1970?',
        title: 'Black September (Civil War in Jordan)',
      },
      {
        step: 4,
        date: '5–6 September 1972',
        questionHeading: 'What was the global impact of the Munich Olympics massacre in 1972?',
        bullets: [
          'Black September Infiltrates Village',
          'Eleven Athletes Murdered in Failed Rescue',
          'Live Broadcast to 900 Million Viewers',
        ],
        keywords: [
          'Black September Infiltrates Village',
          'Eleven Athletes Murdered in Failed Rescue',
          'Live Broadcast to 900 Million Viewers',
        ],
        clue: 'What was the global impact of the Munich Olympics massacre in 1972?',
        title: 'The Munich Olympics Massacre',
      },
      {
        step: 5,
        date: '1972–1979',
        questionHeading: 'How did Israel retaliate through Operation Wrath of God covert strikes?',
        bullets: [
          'Prime Minister Golda Meir Directive',
          'Global Mossad Targeted Assassinations',
          'Lillehammer Innocent Waiter Scandal',
        ],
        keywords: [
          'Prime Minister Golda Meir Directive',
          'Global Mossad Targeted Assassinations',
          'Lillehammer Innocent Waiter Scandal',
        ],
        clue: 'How did Israel retaliate through Operation Wrath of God covert strikes?',
        title: 'Israeli Retaliation (Operation Wrath of God)',
      },
    ],
    vocabRef: '[Textbook §1.1–§2.2 &amp; Source A]',
    vocabPrompt:
      'Explain the crucial tactical difference between <strong>Fedayeen Guerrilla Warfare</strong> and <strong>International Terrorism</strong> as methods adopted by Palestinian factions after 1967:',
    consequenceA: {
      ref: '[Textbook §2.1–§2.2 &amp; Source A]',
      question: 'Explain one consequence of the PFLP airplane hijacks of 1970. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Directly triggered King Hussein’s military crackdown against Palestinian militias in Jordan) &bull; Fact (PFLP militants blew up three hijacked Western airliners at Dawson’s Field in front of international TV cameras) &bull; Consequence (King Hussein declared martial law in September 1970, launching the Black September civil war to expel armed Palestinian groups).',
    },
    consequenceB: {
      ref: '[Textbook §2.2]',
      question: 'Explain one consequence of the expulsion of the PLO from Jordan (1970). [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Relocation of PLO headquarters to southern Lebanon and rise of clandestine terror cells) &bull; Fact (Jordanian forces crushed PLO resistance and expelled armed guerrillas to Lebanon by 1971) &bull; Consequence (The PLO lost its direct border with Israel, created "Fatahland" in Lebanon, and radical elements formed the "Black September" terror group).',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
      ref: '[Textbook §3.1–§4.2 &amp; Source B]',
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the Munich Olympics for international attitudes towards the Palestine issue. [8 marks]',
      focusAspects: [
        'Global Television Awareness of Palestinian Demands',
        'International Condemnation of Terrorism & Israel’s Response',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: GLOBAL TV SPOTLIGHT',
          ref: '[Textbook §3.1 &amp; Source B]',
          text: 'Explain how Black September holding 11 Israeli athletes broadcast the Palestine issue live to 900 million TV viewers, destroying the idea that Palestinians were merely passive refugees.',
        },
        {
          col: '2. POINT 2: MORAL OUTRAGE & REPRISALS',
          ref: '[Textbook §3.2 &amp; §4.1]',
          text: 'Explain how murdering unarmed athletes provoked worldwide condemnation, branding militants as terrorists and prompting Golda Meir to launch Operation Wrath of God assassinations.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: STRATEGIC SHIFT',
          ref: '[Textbook §4.1–§4.2]',
          text: 'Explain how the outrage proved terrorism could not win statehood, ultimately pushing Yasser Arafat to steer the PLO toward international diplomacy (1974 UN speech).',
        },
      ],
      connectives:
        'This was of paramount historical importance because... • In particular, a decisive factor was that... • Furthermore, this directly altered developments by... • On the other hand, an alternative critical perspective is that... • Consequently, this transformed relations because... • Ultimately, this was important because...',
      wordBank:
        'Munich Olympics &bull; Black September &bull; 5 September 1972 &bull; 11 Israeli athletes &bull; Olympic Village &bull; 900 million viewers &bull; international attitudes &bull; Palestine issue &bull; Operation Wrath of God &bull; 1974 UN speech',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.4). In Milestone 5, sketch the Dawson’s Field aircraft explosion and trace the PLO exile route from Jordan to southern Lebanon.',
    },
  },

  {
    lessonIndex: 8,
    lessonNum: 5,
    id: 'lesson_10',
    inquiryQuestion: 'How did the Yom Kippur War shatter Israeli invincibility in October 1973?',
    subTitle: 'Key Topic 2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
    title: 'KT2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
    specAnchor: `<strong>Causes of the Yom Kippur War (1973)</strong>: <strong>Sadat’s diplomacy and Egyptian-Syrian desire to regain lost land</strong>; <strong>Operation Badr surprise crossing on Yom Kippur</strong>; <strong>Syrian offensive on Mount Hermon</strong>; the <strong>Israeli counter-offensive (Sharon crossing the Suez Canal)</strong>; <strong>superpower resupply airlifts (US Operation Nickel Grass vs Soviet airlift)</strong>; <strong>nuclear alert DEFCON 3</strong>; the <strong>ceasefire (UN Res 338)</strong>; and the <strong>OPEC oil embargo</strong>.`,
    stages: [
      {
        step: 1,
        date: '1969–1970',
        questionHeading: 'Why did Nasser launch the War of Attrition along the Suez Canal?',
        bullets: [
          'Eighteen-Month Heavy Artillery Duels',
          'Soviet Anti-Aircraft Missile Umbrella',
          'Anwar Sadat Assumes Egyptian Presidency',
        ],
        keywords: [
          'Eighteen-Month Heavy Artillery Duels',
          'Soviet Anti-Aircraft Missile Umbrella',
          'Anwar Sadat Assumes Egyptian Presidency',
        ],
        clue: 'Why did Nasser launch the War of Attrition along the Suez Canal?',
        title: 'The War of Attrition',
      },
      {
        step: 2,
        date: '1971–1972',
        questionHeading: 'Why did Anwar Sadat expel 15,000 Soviet advisers from Egypt in 1972?',
        bullets: [
          'Moscow Withholding Offensive Weapons',
          'Superpower Détente Freezing Status Quo',
          'Resolve to Break Diplomatic Deadlock',
        ],
        keywords: [
          'Moscow Withholding Offensive Weapons',
          'Superpower Détente Freezing Status Quo',
          'Resolve to Break Diplomatic Deadlock',
        ],
        clue: 'Why did Anwar Sadat expel 15,000 Soviet advisers from Egypt in 1972?',
        title: 'Sadat Expels Soviet Advisers',
      },
      {
        step: 3,
        date: '6 October 1973',
        questionHeading:
          'How did Egyptian and Syrian forces achieve tactical surprise on Yom Kippur?',
        bullets: [
          'Operation Badr Holy Day Assault',
          'High-Pressure Water Monitors Breach Sand',
          '1,400 Syrian Tanks Storm the Heights',
        ],
        keywords: [
          'Operation Badr Holy Day Assault',
          'High-Pressure Water Monitors Breach Sand',
          '1,400 Syrian Tanks Storm the Heights',
        ],
        clue: 'How did Egyptian and Syrian forces achieve tactical surprise on Yom Kippur?',
        title: 'The Surprise Attack on Yom Kippur',
      },
      {
        step: 4,
        date: '12–16 October 1973',
        questionHeading: 'How did the US airlift enable General Sharon’s canal counter-crossing?',
        bullets: [
          '22,000 Tons of Vital US Ammunition',
          'Exploiting Seam Between Arab Armies',
          'Surrounding Egypt’s Entire Third Army',
        ],
        keywords: [
          '22,000 Tons of Vital US Ammunition',
          'Exploiting Seam Between Arab Armies',
          'Surrounding Egypt’s Entire Third Army',
        ],
        clue: 'How did the US airlift enable General Sharon’s canal counter-crossing?',
        title: 'The US Emergency Airlift & Israeli Counter-Attack',
      },
      {
        step: 5,
        date: 'October 1973',
        questionHeading: 'How did the Arab OPEC oil embargo transform global superpower diplomacy?',
        bullets: [
          'Crude Prices Soar from $3 to $12',
          'Severe Western Fuel Rationing Queues',
          'Proving Reliance on Arab Energy',
        ],
        keywords: [
          'Crude Prices Soar from $3 to $12',
          'Severe Western Fuel Rationing Queues',
          'Proving Reliance on Arab Energy',
        ],
        clue: 'How did the Arab OPEC oil embargo transform global superpower diplomacy?',
        title: 'The Arab Oil Embargo & Ceasefire',
      },
    ],
    vocabRef: '[Textbook §1.1–§2.1 &amp; Source A]',
    vocabPrompt:
      'Define the <strong>Bar-Lev Line</strong> and explain why Egyptian military planners deployed high-pressure water monitors to breach it on 6 October 1973:',
    consequenceA: {
      ref: '[Textbook §1.1–§1.2]',
      question:
        'Explain one consequence of Israel’s consolidation of control of the occupied territories. [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Deepened Arab determination to launch a military attack to reclaim occupied lands) &bull; Fact (Israel constructed the Bar-Lev Line along the Suez Canal and established permanent settlements in Sinai, Golan, and the West Bank) &bull; Consequence (Convinced Egyptian President Anwar Sadat that diplomacy had failed, leading directly to the coordinated surprise attack on Yom Kippur 1973).',
    },
    consequenceB: {
      ref: '[Textbook §2.1–§4.2 &amp; Sources A &amp; B]',
      question: 'Explain one consequence of the Yom Kippur War (1973). [4 marks]',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Point (Shattered the myth of Israeli invincibility and triggered the global energy crisis) &bull; Fact (Arab states launched an oil embargo quadrupling crude oil prices; Israel suffered heavy casualties before counter-crossing the canal) &bull; Consequence (Forced the United States and Israel to recognise that military superiority alone could not guarantee security, paving the way for peace negotiations).',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      ref: '[Textbook §1.1–§4.2 &amp; Sources A &amp; B]',
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973) and its aftermath. [8 marks]',
      stimulus: ['The surprise attack on 6 October 1973', 'The OPEC oil embargo'],
      structureStrip: [
        {
          col: '1. PHASE 1: SURPRISE TWO-FRONT ASSAULT',
          ref: '[Textbook §2.1–§2.2 &amp; Source A]',
          text: 'Explain the 6 October surprise crossing on Yom Kippur / Ramadan: water monitors breaching Bar-Lev Line under Soviet SAM umbrella while Syria assaulted Golan.',
        },
        {
          col: '2. PHASE 2: AIRLIFTS & COUNTER-CROSSING',
          ref: '[Textbook §2.2, §3.1 &amp; Source B]',
          text: 'Explain massive US emergency airlift (Nickel Grass) enabling General Sharon’s armored division to counter-cross the canal and encircle Egypt’s 3rd Army.',
        },
        {
          col: '3. PHASE 3: OIL WEAPON & AFTERMATH',
          ref: '[Textbook §3.2–§4.2]',
          text: 'Explain Arab OPEC oil embargo quadrupling world oil prices, superpower nuclear DEFCON 3 tension, and Henry Kissinger securing a UN ceasefire on 24 October.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'Yom Kippur War (1973) &bull; Bar-Lev Line &bull; water monitors &bull; SAM-6 missiles &bull; Golan Heights &bull; Operation Nickel Grass &bull; Ariel Sharon &bull; Third Army encirclement &bull; OPEC oil embargo &bull; DEFCON 3 &bull; Henry Kissinger',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.5). In Milestone 6, sketch the water-monitor breach of the Bar-Lev Line and the OPEC oil pipeline embargo valve.',
    },
  },
];

// ============================================================================
// MAIN GENERATOR FUNCTION: 14-PAGE TWO-PAGE SPREAD WORKBOOK FOR CME KT2
// ============================================================================
function buildCmeKt2TwoPageWorkbook(unitData, period) {
  const lessons = unitData.lessons;

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 2: The Escalating Conflict, 1964–1973 Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    /* Uniform Page Margins for Booklet Imposition & Printing */
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.8pt;
      line-height: 1.3;
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
      height: 272mm;
      max-height: 272mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
    }
    .verso-page,
    .recto-page {
      padding: 4mm 6mm;
    }
    
    /* 5-Stage Full-Width Question Banner & 3-Fact Trigger Spine (KS3 Golden Standard for GCSE) */
    .spine-notes-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      margin: 2px 0 2px 0;
      gap: 2px;
    }
    .spine-stage-block {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      border: 1.2px solid #000000;
      border-radius: 2px;
      overflow: hidden;
      background: #ffffff;
    }
    .stage-banner {
      background: #000000;
      color: #ffffff;
      padding: 1.5px 6px;
      display: flex;
      align-items: center;
      border-bottom: 1.2px solid #000000;
      line-height: 1.15;
      flex-shrink: 0;
    }
    .stage-trigger-col {
      width: 26mm;
      flex-shrink: 0;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      border-right: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .trigger-fact-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 3px;
      box-sizing: border-box;
    }
    .trigger-fact-cell:not(:last-child) {
      border-bottom: 0.8px solid #cbd5e1;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .task-section {
      margin-bottom: 2px;
    }
    /* Thick Black Writing Lines for Accessibility & Special Needs */
    .task-line {
      border-bottom: 1.5px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    /* Clean Lined Paper Grid for Extended Writing Pages (8mm margin, thick 1.5px black lines for photocopying) */
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.5px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.5px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 8mm;
      border-right: 1.5px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 1px;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 5px;
      box-sizing: border-box;
    }
    /* Page Footer Strip */
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 800;
    }
    .footer-quip {
      font-style: italic;
      color: #111111;
      font-weight: 500;
    }
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 11pt !important;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
`;

  const coverImgPath = path.resolve('public/units/cme_new/assets/kt2_cover.jpg');
  let coverImgSrc = '/units/cme_new/assets/kt2_cover.jpg';
  if (fs.existsSync(coverImgPath)) {
    const coverImgBase64 = fs.readFileSync(coverImgPath).toString('base64');
    coverImgSrc = `data:image/jpeg;base64,${coverImgBase64}`;
  }

  // Map images for Page 14 Cartographic Masterclass
  const sixDayWarMapPath = path.resolve(
    'public/units/cme_new/assets/palestine_1967_six_day_war_map.png',
  );
  let sixDayWarMapSrc = '/units/cme_new/assets/palestine_1967_six_day_war_map.png';
  if (fs.existsSync(sixDayWarMapPath)) {
    const b64 = fs.readFileSync(sixDayWarMapPath).toString('base64');
    sixDayWarMapSrc = `data:image/png;base64,${b64}`;
  }

  const yomKippurMapPath = path.resolve('public/units/cme_new/assets/cme_yom_kippur_1973_map.png');
  let yomKippurMapSrc = '/units/cme_new/assets/cme_yom_kippur_1973_map.png';
  if (fs.existsSync(yomKippurMapPath)) {
    const b64 = fs.readFileSync(yomKippurMapPath).toString('base64');
    yomKippurMapSrc = `data:image/png;base64,${b64}`;
  }
  // ====================================================================
  // PAGE 1: OUTSIDE FRONT COVER (Master Architectural Cover)
  // ====================================================================
  html += renderStandardFrontCover({
    unitId: 'cme_new',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
    specCode: 'SPECIFICATION 1HI0/2B',
    keyTopicNum: 2,
    dateRange: '1964–1973',
    title: 'The Escalating Conflict, 1964–1973',
    subtitle:
      'The Cairo Conference, Six-Day War, Resolution 242, Palestinian Resistance & The Yom Kippur War',
    heroImage: {
      src: coverImgSrc,
      alt: 'Israeli Paratroopers at the Western Wall, Jerusalem',
      objectPosition: 'center 60%',
      shelfmark: 'GPO-D388-052',
      date: '7 June 1967',
      title: 'Israeli Paratroopers at the Western Wall, Jerusalem',
      caption:
        'David Rubinger (1924–2017) • Paratroopers of the 55th Paratroopers Brigade stand in silence before the Western Wall (Kotel) following the capture of the Old City during the Six-Day War. Registered in the State of Israel Government Press Office archive under Accession Shelfmark GPO-D388-052.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 100,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification &bull; Key Topic 2 Content',
      subtopics: [
        {
          title: '1. The Six Day War, 1967',
          items: [
            '<strong>Cairo Conference &amp; PLO (1964):</strong> Arab League water dispute over the National Water Carrier and the creation of the PLO and armed fedayeen factions.',
            '<strong>Border Clashes &amp; Radicalisation:</strong> Syrian support for Fatah guerrillas, the Israeli Samu raid (Nov 1966), and dogfights over the Golan (April 1967).',
            '<strong>Drift to War (May–June 1967):</strong> Soviet disinformation, Nasser expelling UNEF from Sinai, blockading the Straits of Tiran, and mobilising Arab forces.',
            '<strong>Operation Focus &amp; Mobile Victory:</strong> Pre-emptive airstrike destroying the Egyptian Air Force, capturing Sinai, Gaza, West Bank, Jerusalem, and Golan.',
          ],
        },
        {
          title: '2. Aftermath of the 1967 War',
          items: [
            '<strong>UN Resolution 242 (Nov 1967):</strong> The "Land for Peace" formula, Arab Khartoum Summit "Three Noes", and the closed Suez Canal.',
            '<strong>Refugees &amp; Occupied Lands:</strong> 1 million Palestinians under Israeli military administration; establishment of religious settlements and fresh refugee exiles.',
            "<strong>International Fedayeen Campaigns:</strong> PFLP aircraft hijackings at Dawson's Field (1970) and the Black September hostage massacre at Munich (1972).",
            '<strong>Expulsion from Jordan (1970):</strong> King Hussein’s military crushes Palestinian militia strongholds in Black September, forcing the PLO into Lebanon.',
          ],
        },
        {
          title: '3. Israel &amp; Egypt, 1967–73',
          items: [
            '<strong>War of Attrition &amp; Cold War Diplomacy:</strong> Artillery duels along Suez, Soviet air-defence umbrellas, and Sadat’s 1972 expulsion of 15,000 Soviet advisors.',
            '<strong>Fortification &amp; The Conceptia:</strong> Construction of the fortified Bar-Lev Line along Suez and Israeli overconfidence in military superiority.',
            '<strong>The Yom Kippur War (Oct 1973):</strong> Egyptian surprise canal crossing using water cannons, Syrian assault in Golan, and emergency US resupply airlifts.',
            "<strong>Diplomatic &amp; Economic Fallout:</strong> Sharon’s counter-crossing, Kissinger's shuttle diplomacy, and the OPEC oil embargo quadrupling global fuel prices.",
          ],
        },
      ],
    },
    footerQuip: approvedFunnyFooters[0],
    totalPageCount: 24,
    renderFooterStrip,
  });

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (Panoramic Dual-Coding Spread, 6 Milestones)
  // Zero Exam Synthesis Questions • Zero Ruled Lines • 48mm Sketch Canvases
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3) -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: The Road to War &amp; The Six-Day War (1964–1967)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Throughout this unit, illustrate each historical milestone inside its dedicated sketchpad box below. Use the dual-coding prompt to combine symbolic diagrams, causal arrows, and key dates.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1: JAN 1964 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                JAN 1964 &bull; The Cairo Conference &amp; The Foundation of the PLO
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Thirteen Arab League leaders meet in Cairo to oppose Israel's National Water Carrier. They establish the Palestine Liberation Organisation (PLO) under Ahmad Shukeiri and approve the Headwater Diversion Plan to divert the Hasbani and Banyas rivers away from the Sea of Galilee.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch the Jordan River / Sea of Galilee Headwater Diversion route alongside the early PLO emblem and fedayeen rifle symbol.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 2: MAY–JUNE 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                MAY–JUNE 1967 &bull; Straits of Tiran Blockade &amp; UNEF Expulsion
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Spurred by Soviet false warnings, President Nasser demands the immediate withdrawal of UN Emergency Force (UNEF) peacekeepers, moves 100,000 troops into Sinai, and blockades the Straits of Tiran at Sharm el-Sheikh, cutting off Israel's southern oil route (casus belli).
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch Egyptian tanks advancing past evicted UNEF peacekeepers and a naval chain closing the Straits of Tiran at Sharm el-Sheikh.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 3: 5–10 JUNE 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                5–10 JUNE 1967 &bull; The Six-Day War &amp; The Conquered Territories
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Israel launches Operation Focus, wiping out the Egyptian Air Force on the tarmac. In six days of mobile warfare, the IDF captures the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch an airfield runway with destroyed Egyptian jets (Operation Focus), then map the 4 captured lands: Sinai, Gaza, West Bank, Golan.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(2, approvedFunnyFooters[1], 24)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6) -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Diplomacy, Resistance &amp; The Yom Kippur War (1967–1973)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual symbols, causal arrows, and dates) to master the chronological spine.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 4: NOV 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                22 NOV 1967 &bull; UN Resolution 242 &amp; The Khartoum "Three Noes"
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              The UN Security Council unanimously adopts Resolution 242, establishing the foundational principle of "Land for Peace" (Israeli withdrawal in exchange for Arab recognition and secure borders). At the Khartoum Summit, the Arab League issues the defiant "Three Noes": no peace, no recognition, and no negotiations with Israel.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a 'Land for Peace' balance scale (occupied territory for recognition) stamped with the Khartoum Summit's Three 'NO's.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 5: SEPT 1970 – 1972 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                SEPT 1970 – 1972 &bull; Black September in Jordan &amp; The Munich Olympics
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Operating as a "state within a state" in Jordan, the PFLP blows up three hijacked Western airliners at Dawson's Field. King Hussein’s army crushes Palestinian militia strongholds in September 1970, expelling the PLO to Lebanon. In September 1972, the militant splinter faction Black September murders 11 Israeli Olympic athletes in Munich.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch the hijacked airliners at Dawson's Field, PLO fighters expelled across Jordan to Lebanon, and the Munich balcony silhouette.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 6: OCT 1973 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                6–25 OCT 1973 &bull; The Yom Kippur War &amp; The OPEC Oil Embargo
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Egypt and Syria launch a surprise assault on Yom Kippur. Egyptian infantry blast through the Bar-Lev Line using high-pressure water monitors under a Soviet SAM umbrella. Following emergency US airlifts and an Israeli counter-crossing led by Ariel Sharon, Arab OPEC ministers impose an oil embargo that quadruples global prices, shattering Israeli complacency.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch water cannons breaching the Bar-Lev sand wall, Sharon's canal counter-crossing, and a soaring OPEC oil barrel price graph.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(3, approvedFunnyFooters[2], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED FOUR-PAGE LESSONS (KT 2.1 TO 2.5)
  // Spread 1 (Verso & Recto): Enquiry Lesson + Docked Exam Scaffolding
  // Spread 2 (Verso & Recto): Facing Ruled Paper for Extended Assessment
  // ====================================================================
  kt2Configs.forEach((cfg) => {
    const leftPageNum = 4 + (cfg.lessonNum - 1) * 4; // Spread 1 Left (Verso): Chronological Spine + Vocab
    const rightPageNum = leftPageNum + 1; // Spread 1 Right (Recto): Open Ruled Lesson Notebook
    const linedLeftPageNum = leftPageNum + 2; // Spread 2 Left (Verso): Exam Practice & Planning Scaffold
    const linedRightPageNum = leftPageNum + 3; // Spread 2 Right (Recto): Extended Response & Band 4 Rubric
    const rx = cfg.rightExam || cfg.extendedPractice;

    // ------------------------------------------------------------------
    // SPREAD 1, LEFT PAGE (VERSO): 5-STAGE CAUSAL DOMINO SPINE & CORE VOCABULARY
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC 2.${cfg.lessonNum} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 (1HI0/2B) &bull; PERIOD STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.inquiryQuestion}
        </h2>
        <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #222222; line-height: 1.18;">
          ${cfg.subTitle}
        </div>
      </div>

      <!-- Key Specification Focus -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.2;">
        <strong>Key Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- 5-Stage Chronological Inquiry Spine with Full-Width Question Banners (KS3 Golden Standard for GCSE) -->
      <div class="spine-notes-container" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin: 2px 0 2px 0; gap: 2px;">
        ${cfg.stages
          .map((st) => {
            const questionHeading = st.questionHeading || st.clue || st.title;
            const bullets = st.bullets || (st.keywords ? st.keywords.slice(0, 3) : []);
            const bulletsHtml = bullets
              .map(
                (b, bIdx) => `
              <div class="trigger-fact-cell" style="flex: 1; display: flex; align-items: center; padding: 0 3px; ${bIdx < 2 ? 'border-bottom: 0.8px solid #cbd5e1;' : ''}">
                <div style="display: flex; align-items: flex-start; gap: 2.5px; line-height: 1.12;">
                  <span style="font-weight: 900; color: #000000; font-size: 5pt; line-height: 1.3;">&bull;</span>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.3pt; font-weight: 700; color: #000000; word-break: break-word;">${b}</span>
                </div>
              </div>`,
              )
              .join('');
            return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 1.5px 6px; display: flex; align-items: center; border-bottom: 1.2px solid #000000;">
            <div style="display: flex; align-items: center; gap: 5px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; padding: 0.5px 4.5px; border-radius: 2px; white-space: nowrap;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #e2e8f0; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #94a3b8; font-size: 7pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (26mm) & Right Ruled Writing Lines (~172mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            <div class="stage-trigger-col" style="width: 26mm; flex-shrink: 0; background: #f8fafc; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>

        </div>`;
          })
          .join('')}
      </div>

      <!-- Key Vocabulary (Core Disciplinary Distinction) -->
      ${renderFooterStrip(leftPageNum, approvedFunnyFooters[leftPageNum - 1], 24)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 1, RIGHT PAGE (RECTO): OPEN RULED LESSON NOTE-TAKING CANVAS -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 900;">
          ${cfg.title}
        </h2>
      </div>

      <!-- 32 Ruled Lines with 8mm Left Margin (Tighter Line Spacing) -->
      <div class="lined-page-grid" style="flex: 1;">
        ${Array.from(
          { length: 32 },
          () => `
            <div class="lined-row">
              <div class="lined-margin-cell">&nbsp;</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`,
        ).join('')}
      </div>

      ${renderFooterStrip(rightPageNum, approvedFunnyFooters[rightPageNum - 1], 24)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, LEFT PAGE (VERSO): EXAM PRACTICE & EXTENDED PLANNING SCAFFOLD -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-${linedLeftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
          KEY TOPIC 2.${cfg.lessonNum} &bull; EDEXCEL EXAM PRACTICE
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #000000;">
          PAPER 2 (1HI0/2B) &bull; 12 MARKS TOTAL
        </span>
      </div>

      <!-- Section 1: Question 1 Consequence [4 marks] -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; margin-bottom: 4px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1: Explain One Consequence [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${cfg.consequenceA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-style: italic; color: #222222; margin-bottom: 1.5px; line-height: 1.15;">
          <strong>P-F-C Structure:</strong> <strong>Point</strong> (State one direct consequence) &bull; <strong>Fact</strong> (Support with precise historical evidence and dates) &bull; <strong>Consequence</strong> (Explain how this altered subsequent developments/relations).
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> One major consequence was that... &bull; Specifically, this was evident when... &bull; Consequently, this directly resulted in... / altered relations because...
        </div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
      </div>

      <!-- Section 2: Extended Exam Practice (Q2 Narrative [8m] or Q3 Importance [8m]) -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 10.2pt; color: #000000; margin: 0; font-weight: 800;">
          ${rx.tariff}
        </h3>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase;">
          Extended Writing Assessment &bull; 8 Marks
        </span>
      </div>

      <!-- Unified Scaffolding Block -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; overflow: hidden; margin-bottom: 3px; background: #ffffff;">
        <!-- Row 1: Stem & Stimulus/Focus -->
        <div style="padding: 2.5px 6px; border-bottom: 1px solid #000000; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
            ${rx.stem}
          </div>
          ${
            rx.type === 'narrative_8'
              ? `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.18;">
            <strong>You may use the following in your answer:</strong> &bull; ${rx.stimulus[0]} &bull; ${rx.stimulus[1]} &bull; <em>You must also use information of your own.</em>
          </div>
          `
              : `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.18;">
            <strong>Structure across two distinct analytical aspects:</strong> &bull; ${rx.focusAspects[0]} &bull; ${rx.focusAspects[1]}
          </div>
          `
          }
        </div>

        <!-- Row 2: 3-Column Planning Structure Strip (Heading Anchors Only) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #000000; background: #f4f4f4;">
          ${rx.structureStrip
            .map(
              (strip, sIdx) => `
          <div style="padding: 2.5px 4px; text-align: center; ${sIdx < 2 ? 'border-right: 1px solid #000000;' : ''}">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; line-height: 1.15; letter-spacing: 0.3px;">${strip.col}</strong>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Row 3: Causal Connectives Strip (Key Vocabulary Bank removed for active recall) -->
        <div style="padding: 2.5px 6px; background: #ffffff; display: flex; align-items: baseline; gap: 6px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; flex-shrink: 0; line-height: 1.1;">Causal Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #222222; line-height: 1.12; flex: 1;">${rx.connectives || rx.causalConnectives}</span>
        </div>
      </div>

      <!-- Initial Response Lines (Ruled Grid with 8mm Margin • Tighter Line Spacing) -->
      <div class="lined-page-grid" style="flex: 1; margin: 2px 0 2px 0;">
        ${Array.from(
          { length: 22 },
          () => `
            <div class="lined-row">
              <div class="lined-margin-cell">&nbsp;</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`,
        ).join('')}
      </div>

      ${renderFooterStrip(linedLeftPageNum, approvedFunnyFooters[linedLeftPageNum - 1], 24)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, RIGHT PAGE (RECTO): FULL-PAGE EXTENDED TIMED ESSAY RESPONSE -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${linedRightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
      </div>

      <!-- 26 Ruled Response Lines with 8mm Margin (Tighter Line Spacing) -->
      <div class="lined-page-grid" style="flex: 1; margin-bottom: 3px;">
        ${Array.from(
          { length: 28 },
          () => `
            <div class="lined-row">
              <div class="lined-margin-cell">&nbsp;</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`,
        ).join('')}
      </div>

      <!-- Timeline Mission Box (At very foot of page above footer strip) -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 2px; padding: 2px 6px; background: #fafafa; margin-bottom: 2px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
          Timeline Mission &bull; Pages 2–3
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.18;">
          ${rx.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(linedRightPageNum, approvedFunnyFooters[linedRightPageNum - 1], 24)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 24: OUTSIDE BACK COVER (Student Assessment Record & Digital Quizzing Hub)
  // ====================================================================
  html += renderStandardBackCover({
    unitId: 'cme_new',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
    keyTopicNum: 2,
    trackerTitle: 'Student Assessment Record • Key Topic 2 Tracker',
    trackerSubtitle:
      'Paper 2: Conflict in the Middle East, 1945–1995 • The Escalating Conflict (1964–1973)',
    enquiries: [
      {
        num: 1,
        code: 'KT2.1',
        title: 'Cairo Conference & Water Wars',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 2,
        code: 'KT2.2',
        title: 'Straits of Tiran & Six Day War',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 3,
        code: 'KT2.3',
        title: 'Occupied Territories & Res 242',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 4,
        code: 'KT2.4',
        title: 'Black September & Munich 1972',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 5,
        code: 'KT2.5',
        title: 'Yom Kippur War & Oil Embargo',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
    ],
    feedback: {
      signature: '____________________________',
      date: '____________________',
    },
    qrLessons: [
      {
        label: 'KT 2.1: Water Wars',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=4`,
      },
      {
        label: 'KT 2.2: Six-Day War',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=5`,
      },
      {
        label: 'KT 2.3: Res 242',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=6`,
      },
      {
        label: 'KT 2.4: Munich 1972',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=7`,
      },
      {
        label: 'KT 2.5: Yom Kippur',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=8`,
      },
    ],
    footerQuip: approvedFunnyFooters[23],
    totalPageCount: 24,
    renderFooterStrip,
  });

  html += `
  <!-- Client-Side Auto-Lines Calculator (Evaluated in Puppeteer before PDF print) -->
  <script>
    function autoFillWritingLines() {
      document.querySelectorAll('[data-auto-lines]').forEach(el => {
        el.innerHTML = '';
        const availablePx = el.clientHeight;
        const lineHMm = parseFloat(el.dataset.lineHeight || '7.5');
        // Standard 96 DPI: 1 inch = 25.4mm = 96px => 1mm = 3.779527559px
        const lineHPx = lineHMm * (96 / 25.4);
        const count = Math.max(1, Math.round(availablePx / lineHPx));
        el.innerHTML = Array(count).fill(
          '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>'
        ).join('');
      });
    }
    window.addEventListener('DOMContentLoaded', autoFillWritingLines);
    if (document.readyState !== 'loading') autoFillWritingLines();
  </script>
</body>
</html>
`;

  return html;
}

// ============================================================================
// PDF COMPILER HELPER (WITH AUDIT)
// ============================================================================
async function compilePdf(htmlPath, pdfPath, v17Path) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  const checkOverflowsScript = path.join(__dirname, 'check_overflows.cjs');
  if (fs.existsSync(checkOverflowsScript)) {
    const { execSync } = require('child_process');
    try {
      execSync(`node "${checkOverflowsScript}" "${htmlPath}" --strict`, { stdio: 'inherit' });
    } catch (e) {
      console.warn('⚠️ Overflow check warned or failed:', e.message);
    }
  }

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    timeout: 120000,
  });

  if (v17Path) {
    fs.copyFileSync(pdfPath, v17Path);
  }

  await browser.close();
}

// CLI runner
if (require.main === module) {
  (async () => {
    const rootDir = path.join(__dirname, '..');
    const html = buildCmeKt2TwoPageWorkbook({}, { name: 'KT2' });
    const publicHtml = path.join(rootDir, 'public', 'units', 'cme_new', 'pupil_workbook_KT2.html');
    const unitHtml = path.join(rootDir, 'units', 'cme_new', 'pupil_workbook_KT2.html');
    fs.mkdirSync(path.dirname(publicHtml), { recursive: true });
    fs.mkdirSync(path.dirname(unitHtml), { recursive: true });
    fs.writeFileSync(publicHtml, html, 'utf8');
    fs.writeFileSync(unitHtml, html, 'utf8');
    console.log(`✅ Saved HTML: ${publicHtml}`);

    const pdfPath = path.join(rootDir, 'public', 'pdfs', 'cme_new_pupil_workbook_KT2.pdf');
    const v17Path = path.join(
      rootDir,
      'public',
      'pdfs',
      'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
    );
    console.log(`🖨️ Compiling PDF with Puppeteer & Dynamic Auto-Lines...`);
    await compilePdf(publicHtml, pdfPath, v17Path);
    console.log(`✅ Compiled PDF: ${v17Path}`);
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildCmeKt2TwoPageWorkbook };
