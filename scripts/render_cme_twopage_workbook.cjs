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

// Approved Witty Revision Quips (Confirmed and approved for CME Key Topic 2)
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 2 • The History Department', // Page 1
  '"Remember: A crisis without a plan is just an essay waiting to happen."', // Page 2
  '"Chronology is king: 1967 happens before 1973, even under exam pressure!"', // Page 3
  '"Don\'t just state the Straits were closed — explain who couldn\'t sail through them!"', // Page 4
  '"Operation Focus took 45 minutes; you have 10 minutes to write this answer."', // Page 5
  '"Triple territory gained in six days: please write more than six lines about it."', // Page 6
  '"Topography wins wars: who controls the Golan Heights controls the skyline."', // Page 7
  '"The \'Three Noes\' of Khartoum: No peace, no recognition, no negotiations (and no blank answers!)."', // Page 8
  '"Resolution 242 was deliberately ambiguous; your exam answer should NOT be."', // Page 9
  '"Hijackings made headlines, but did they win hearts? Evaluate the consequence."', // Page 10
  '"Munich broadcast terror into 900 million homes: explain that importance clearly."', // Page 11
  '"The Bar-Lev Line took 3 years to build and 2 hours to breach — detail matters."', // Page 12
  '"A war fought on holy days: keep your cause and consequence strictly separated."', // Page 13
  '"Master the specification: When facts, dates, and connectives align, Grade 9 follows."', // Page 14
  '"The difference between Grade 7 and Grade 9 is not what happened, but precisely why it mattered."', // Page 15
  'Key Topic 2 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub', // Page 16
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Footer Text on the Same Line)
// Even pages (verso/left): Page number on left, text on right.
// Odd pages (recto/right): Text on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, text, totalPages = 16) {
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
    specAnchor:
      'The Cairo Conference (1964) and creation of the PLO; River Jordan water dispute and Headwater Diversion Plan; Syrian-backed fedayeen guerrilla attacks; Israeli reprisal raids and the 7 April 1967 aerial battle over the Golan Heights.',
    doNow: [
      {
        q: 'What 1917 British declaration supported a Jewish national home in Palestine?',
        a: 'The Balfour Declaration',
      },
      {
        q: 'Which international organisation granted Britain the Mandate for Palestine in 1922?',
        a: 'The League of Nations',
      },
      {
        q: 'Which Jerusalem hotel was bombed by the Zionist militant group Irgun in July 1946?',
        a: 'The King David Hotel',
      },
      {
        q: 'What was the number of the United Nations Resolution to partition Palestine in 1947?',
        a: 'UN Resolution 181',
      },
      {
        q: 'On what date did David Ben-Gurion proclaim the establishment of the State of Israel?',
        a: '14 May 1948',
      },
      {
        q: 'Approximately how many Palestinian Arabs became refugees during the 1948–49 War?',
        a: 'Approximately 700,000',
      },
      {
        q: 'What 1950 Israeli law granted every Jewish person the right to settle in Israel?',
        a: 'The Law of Return',
      },
      {
        q: 'Who became President of Egypt in 1954 and emerged as leader of Pan-Arab nationalism?',
        a: 'Gamal Abdel Nasser',
      },
      {
        q: 'What vital international waterway did Nasser nationalise in July 1956?',
        a: 'The Suez Canal',
      },
      {
        q: 'Which two European powers secretly colluded with Israel in the Protocol of Sèvres (1956)?',
        a: 'Britain and France',
      },
    ],
    vocabPrompt:
      'Define the <strong>Headwater Diversion Plan</strong> and explain how it differed from a conventional border clash as a catalyst for military escalation:',
    consequenceA: {
      question: 'Explain one consequence of the Cairo Conference (1964). [4 marks]',
      guidance:
        'Point (Creation of the Palestine Liberation Organisation and unified Arab command) &bull; Fact (Arab League heads of state authorized the Palestinian National Charter and water diversion) &bull; Consequence (United Arab resistance and established armed fedayeen factions like Fatah to actively challenge Israel).',
      stems:
        'One major consequence was... &bull; Specifically, following the Cairo Conference in 1964... &bull; Consequently, this led directly to...',
    },
    consequenceB: {
      question: 'Explain one consequence of the events of 7 April 1967. [4 marks]',
      guidance:
        'Point (Humiliating defeat for the Syrian Air Force and sharp escalation towards war) &bull; Fact (Israeli Mirage jets shot down six Syrian MiG-21s and flew victory passes over Damascus) &bull; Consequence (Provoked false Soviet intelligence reports in May 1967, pressuring Nasser to mobilise in Sinai).',
      stems:
        'One major consequence was... &bull; Specifically, during the aerial clash on 7 April 1967... &bull; Consequently, this directly triggered...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events leading to the outbreak of the Six-Day War (1967). [8 marks]',
      stimulus: ['Syria’s support for Fatah', 'The actions of Nasser'],
      structureStrip: [
        {
          col: '1. PHASE 1: BORDER TENSIONS (1964–66)',
          text: 'Explain the Cairo Conference (1964), Syria’s support for Fatah guerrilla raids across the border, and Israeli retaliatory strikes culminating in the events of 7 April 1967.',
        },
        {
          col: '2. PHASE 2: ESCALATION IN SINAI (MAY 1967)',
          text: 'Explain Soviet false warnings, and the actions of Nasser: expelling UNEF peacekeepers, mobilising 100,000 troops into Sinai, and blockading the Straits of Tiran.',
        },
        {
          col: '3. PHASE 3: OUTBREAK OF WAR (JUNE 1967)',
          text: 'Explain the Egyptian-Jordanian defence pact (30 May) encircling Israel, and Israel launching Operation Focus pre-emptive airstrikes on 5 June 1967.',
        },
      ],
      connectives:
        'The escalation began when... &bull; In response to Syrian support for Fatah, Israel... &bull; Tensions heightened in May 1967 when the actions of Nasser... &bull; Consequently, Israel viewed the Straits blockade as a casus belli... &bull; Ultimately, this culminated on 5 June 1967 when...',
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
    specAnchor:
      'The actions of the USSR, Nasser and the USA in the period leading to war; the outbreak of war on 5 June 1967; Operation Focus; key events of the war in Sinai, the West Bank, East Jerusalem and the Golan Heights.',
    doNow: [
      {
        q: 'In which city was the Palestine Liberation Organisation (PLO) founded in January 1964?',
        a: 'Cairo',
      },
      {
        q: 'Who was elected the first chairman of the PLO in 1964?',
        a: 'Ahmad Shukeiri',
      },
      {
        q: 'Which Palestinian guerrilla faction was founded by Yasser Arafat in Kuwait in 1959?',
        a: 'Fatah',
      },
      {
        q: 'What strategic high ground overlooking Galilee kibbutzim was controlled by Syria before 1967?',
        a: 'The Golan Heights',
      },
      {
        q: 'How many Syrian MiG-21s were shot down by the Israeli Air Force on 7 April 1967?',
        a: 'Six',
      },
      {
        q: 'What peacekeeping force was deployed in Sinai following the 1956 Suez Crisis?',
        a: 'UNEF (UN Emergency Force)',
      },
      {
        q: 'What narrow strait did President Nasser close to Israeli shipping on 22 May 1967?',
        a: 'The Straits of Tiran',
      },
      {
        q: 'Which coastal outpost at the entrance of the Gulf of Aqaba was fortified by Egyptian guns?',
        a: 'Sharm el-Sheikh',
      },
      {
        q: 'Which monarch of Jordan flew to Cairo on 30 May 1967 to sign a joint defence pact with Nasser?',
        a: 'King Hussein',
      },
      {
        q: 'Who was appointed Israeli Minister of Defence on 1 June 1967 on the eve of war?',
        a: 'Moshe Dayan',
      },
    ],
    vocabPrompt:
      'Define a <strong>Pre-emptive Strike</strong> and explain why Israeli commanders argued Operation Focus was necessary for national survival on 5 June 1967:',
    consequenceA: {
      question:
        'Explain one consequence of the actions of Nasser in the period leading to war. [4 marks]',
      guidance:
        'Point (Forced Israel into launching a pre-emptive strike) &bull; Fact (Nasser mobilized troops in Sinai, expelled UNEF, and blockaded the Straits of Tiran at Sharm el-Sheikh) &bull; Consequence (Convinced Israeli leaders that war was imminent, prompting the surprise destruction of Arab air forces on 5 June 1967).',
      stems:
        'One major consequence was... &bull; Specifically, when President Nasser took the decision to... &bull; Consequently, this resulted in...',
    },
    consequenceB: {
      question: 'Explain one consequence of the outbreak of the Six-Day War (1967). [4 marks]',
      guidance:
        'Point (Total Israeli military victory and capture of strategic territory) &bull; Fact (Israel destroyed Arab air forces within three hours, capturing the Sinai, Gaza Strip, West Bank, East Jerusalem, and Golan Heights) &bull; Consequence (Tripled the land under Israeli control and placed over 1 million Palestinian Arabs under military occupation).',
      stems:
        'One major consequence was... &bull; Specifically, when war broke out on 5 June 1967... &bull; Consequently, this transformed the region because...',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
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
          text: 'Explain how Syrian artillery bunkers on the escarpment had terrorised Hula Valley kibbutzim for 19 years; controlling the heights permanently ended cross-border bombardments.',
        },
        {
          col: '2. POINT 2: STRATEGIC HIGH GROUND',
          text: 'Explain how holding Mt Hermon and the high volcanic plateau placed the IDF within 40 miles of Damascus, providing early radar warning and blocking Syrian armored invasions.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: REGIONAL BALANCE',
          text: 'Explain how holding the Golan Heights permanently transformed Israel from a vulnerable defensive position into the dominant military power on its northern frontier.',
        },
      ],
      connectives:
        'The Golan Heights were important for Israeli security because... &bull; In particular, for 19 years Syrian forces had... &bull; By capturing the volcanic escarpment, the IDF... &bull; Furthermore, holding the high plateau provided... &bull; Ultimately, this transformed Israel’s security by...',
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
    specAnchor:
      'UN Resolution 242 and the continued dispute over the Suez Canal; Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem.',
    doNow: [
      {
        q: 'How many days did the Arab-Israeli war of June 1967 last?',
        a: 'Six days (5–10 June 1967)',
      },
      {
        q: 'Name the massive desert peninsula captured by Israel from Egypt in 1967.',
        a: 'The Sinai Peninsula',
      },
      {
        q: 'Which territory along the Mediterranean coast was captured from Egyptian military administration?',
        a: 'The Gaza Strip',
      },
      {
        q: 'Which territory on the west bank of the River Jordan was captured from the Kingdom of Jordan?',
        a: 'The West Bank',
      },
      {
        q: 'Which holy sector of Jerusalem was captured and annexed by Israel in June 1967?',
        a: 'East Jerusalem (including the Old City)',
      },
      {
        q: 'Which strategic volcanic plateau was captured by Israeli troops from Syria on 9–10 June?',
        a: 'The Golan Heights',
      },
      {
        q: 'Approximately how many Palestinian Arabs became refugees following the 1967 war?',
        a: 'Between 300,000 and 350,000',
      },
      {
        q: 'What city in Sudan hosted the Arab League summit in August–September 1967?',
        a: 'Khartoum',
      },
      {
        q: 'What famous formula summarized the Arab League position at the Khartoum Summit?',
        a: 'The "Three Noes" (no peace, no recognition, no negotiations)',
      },
      {
        q: 'What core diplomatic formula was introduced by UN Security Council Resolution 242?',
        a: '"Land for Peace"',
      },
    ],
    vocabPrompt:
      'Define the diplomatic principle of <strong>"Land for Peace"</strong> and explain why its interpretation caused 30 years of diplomatic stalemate after November 1967:',
    consequenceA: {
      question: 'Explain one consequence of UN Resolution 242. [4 marks]',
      guidance:
        'Point (Established the principle of "Land for Peace" but created lasting diplomatic stalemate) &bull; Fact (The resolution called for withdrawal from "territories occupied", leaving deliberate ambiguity between English and French texts) &bull; Consequence (Arab states insisted on total withdrawal, while Israel insisted on direct peace treaties and retained the lands).',
      stems:
        'One major consequence was... &bull; Specifically, when the UN Security Council passed Resolution 242 in November 1967... &bull; Consequently, this created deadlock because...',
    },
    consequenceB: {
      question: 'Explain one consequence of the continued dispute over the Suez Canal. [4 marks]',
      guidance:
        'Point (Triggered the War of Attrition and long-term economic disruption) &bull; Fact (The Suez Canal became the ceasefire frontline, remaining closed to international shipping from 1967 to 1975) &bull; Consequence (Led Israel to construct the fortified Bar-Lev Line and prompted persistent artillery and commando duels with Egypt).',
      stems:
        'One major consequence was... &bull; Specifically, with the Suez Canal closed as a hostile frontline... &bull; Consequently, this resulted in...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the aftermath of the 1967 war in the period from June to November 1967. [8 marks]',
      stimulus: ['The occupied territories', 'UN Resolution 242'],
      structureStrip: [
        {
          col: '1. PHASE 1: OCCUPATION & REFUGEES (JUNE)',
          text: 'Explain Israel annexing East Jerusalem and occupying Sinai, Gaza, West Bank, and Golan; 300,000+ Palestinian refugees fleeing across the River Jordan.',
        },
        {
          col: '2. PHASE 2: ARAB DEFIANCE AT KHARTOUM (AUG–SEPT)',
          text: 'Explain Arab heads of state meeting in Sudan to adopt the "Three Noes" (no peace, no recognition, no negotiation), refusing to concede defeat or negotiate.',
        },
        {
          col: '3. PHASE 3: UN RESOLUTION 242 (NOV 1967)',
          text: 'Explain British drafting of Resolution 242 establishing "Land for Peace", deliberate linguistic ambiguity ("territories occupied"), and resulting deadlock.',
        },
      ],
      connectives:
        'Following the swift conclusion of the June 1967 war... &bull; This territorial transformation displaced 300,000 refugees and prompted... &bull; In response to the growing diplomatic impasse, the UN drafted... &bull; Consequently, Resolution 242 formulated... &bull; Ultimately, this established...',
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
    specAnchor:
      'The use of terrorism, Israel’s response and international attitudes towards the Palestine issue: the PFLP airplane hijacks of 1970; Black September and the Munich Olympics; the expulsion of the PLO from Jordan (1970).',
    doNow: [
      {
        q: 'What core diplomatic formula was established by UN Resolution 242 in November 1967?',
        a: '"Land for Peace"',
      },
      {
        q: 'What were the famous "Three Noes" declared by Arab leaders at Khartoum in 1967?',
        a: 'No peace, no recognition, no negotiations with Israel',
      },
      {
        q: 'Name three of the five territories captured by Israel in the Six-Day War.',
        a: 'Any 3: Sinai, Gaza, West Bank, East Jerusalem, Golan Heights',
      },
      {
        q: 'How many Palestinian refugees fled into Jordan following the 1967 war?',
        a: 'Approximately 300,000 to 350,000',
      },
      {
        q: 'Which Palestinian guerrilla movement was led by Yasser Arafat?',
        a: 'Fatah',
      },
      {
        q: 'What does the acronym PLO stand for?',
        a: 'Palestine Liberation Organisation',
      },
      {
        q: 'In what year was Yasser Arafat elected Chairman of the PLO?',
        a: '1969',
      },
      {
        q: 'Which Egyptian president expelled UNEF and closed the Straits of Tiran in 1967?',
        a: 'Gamal Abdel Nasser',
      },
      {
        q: 'What was the 1949 armistice border between Israel and Jordan known as?',
        a: 'The Green Line',
      },
      {
        q: 'What term describes Palestinian armed guerrilla fighters who "sacrifice themselves"?',
        a: 'Fedayeen',
      },
    ],
    vocabPrompt:
      'Explain the crucial tactical difference between <strong>Fedayeen Guerrilla Warfare</strong> and <strong>International Terrorism</strong> as methods adopted by Palestinian factions after 1967:',
    consequenceA: {
      question: 'Explain one consequence of the PFLP airplane hijacks of 1970. [4 marks]',
      guidance:
        'Point (Directly triggered King Hussein’s military crackdown against Palestinian militias in Jordan) &bull; Fact (PFLP militants blew up three hijacked Western airliners at Dawson’s Field in front of international TV cameras) &bull; Consequence (King Hussein declared martial law in September 1970, launching the Black September civil war to expel armed Palestinian groups).',
      stems:
        'One major consequence was... &bull; Specifically, when the PFLP hijacked Western airliners to Dawson’s Field... &bull; Consequently, this provoked King Hussein to...',
    },
    consequenceB: {
      question: 'Explain one consequence of the expulsion of the PLO from Jordan (1970). [4 marks]',
      guidance:
        'Point (Relocation of PLO headquarters to southern Lebanon and rise of clandestine terror cells) &bull; Fact (Jordanian forces crushed PLO resistance and expelled armed guerrillas to Lebanon by 1971) &bull; Consequence (The PLO lost its direct border with Israel, created "Fatahland" in Lebanon, and radical elements formed the "Black September" terror group).',
      stems:
        'One major consequence was... &bull; Specifically, following the expulsion of the PLO from Jordan... &bull; Consequently, this forced the movement to...',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
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
          text: 'Explain how Black September holding 11 Israeli athletes broadcast the Palestine issue live to 900 million TV viewers, destroying the idea that Palestinians were merely passive refugees.',
        },
        {
          col: '2. POINT 2: MORAL OUTRAGE & REPRISALS',
          text: 'Explain how murdering unarmed athletes provoked worldwide condemnation, branding militants as terrorists and prompting Golda Meir to launch Operation Wrath of God assassinations.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: STRATEGIC SHIFT',
          text: 'Explain how the outrage proved terrorism could not win statehood, ultimately pushing Yasser Arafat to steer the PLO toward international diplomacy (1974 UN speech).',
        },
      ],
      connectives:
        'The Munich Olympics was important for international attitudes because... &bull; By striking a global sporting event broadcast live... &bull; However, the murder of eleven athletes provoked... &bull; In response, Israeli Prime Minister Golda Meir... &bull; Ultimately, this forced the world community to...',
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
    specAnchor:
      'Israel’s consolidation of control of the occupied territories; key events of the Yom Kippur War (1973) and its aftermath.',
    doNow: [
      {
        q: 'What Israeli hostage crisis occurred at an international sporting event in September 1972?',
        a: 'The Munich Olympics massacre',
      },
      {
        q: 'What covert Mossad retaliation operation was authorized by Golda Meir following Munich?',
        a: 'Operation Wrath of God',
      },
      {
        q: 'Which desert airstrip in Jordan was used by the PFLP in 1970 to blow up hijacked airliners?',
        a: 'Dawson’s Field',
      },
      {
        q: 'Which country became the main headquarters for the PLO after being expelled from Jordan in 1971?',
        a: 'Lebanon',
      },
      {
        q: 'What static artillery border conflict was fought along the Suez Canal in 1969–70?',
        a: 'The War of Attrition',
      },
      {
        q: 'Who succeeded Gamal Abdel Nasser as President of Egypt following Nasser’s death in 1970?',
        a: 'Anwar Sadat',
      },
      {
        q: 'What fortified sand-rampart defensive line did Israel construct along the Suez Canal?',
        a: 'The Bar-Lev Line',
      },
      {
        q: 'What method did Egyptian engineers use to blast through the sand ramparts of the Bar-Lev Line?',
        a: 'High-pressure water monitors (water cannons)',
      },
      {
        q: 'On what Jewish holy day did Egypt and Syria launch their coordinated surprise attack in 1973?',
        a: 'Yom Kippur (Day of Atonement)',
      },
      {
        q: 'Which vital international waterway remained closed to shipping between 1967 and 1975?',
        a: 'The Suez Canal',
      },
    ],
    vocabPrompt:
      'Define the <strong>Bar-Lev Line</strong> and explain why Egyptian military planners deployed high-pressure water monitors to breach it on 6 October 1973:',
    consequenceA: {
      question:
        'Explain one consequence of Israel’s consolidation of control of the occupied territories. [4 marks]',
      guidance:
        'Point (Deepened Arab determination to launch a military attack to reclaim occupied lands) &bull; Fact (Israel constructed the Bar-Lev Line along the Suez Canal and established permanent settlements in Sinai, Golan, and the West Bank) &bull; Consequence (Convinced Egyptian President Anwar Sadat that diplomacy had failed, leading directly to the coordinated surprise attack on Yom Kippur 1973).',
      stems:
        'One major consequence was... &bull; Specifically, as Israel consolidated control by building the Bar-Lev Line... &bull; Consequently, this convinced Arab leaders that...',
    },
    consequenceB: {
      question: 'Explain one consequence of the Yom Kippur War (1973). [4 marks]',
      guidance:
        'Point (Shattered the myth of Israeli invincibility and triggered the global energy crisis) &bull; Fact (Arab states launched an oil embargo quadrupling crude oil prices; Israel suffered heavy casualties before counter-crossing the canal) &bull; Consequence (Forced the United States and Israel to recognise that military superiority alone could not guarantee security, paving the way for peace negotiations).',
      stems:
        'One major consequence was... &bull; Specifically, the initial surprise attack on 6 October 1973... &bull; Consequently, the aftermath of the war resulted in...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973) and its aftermath. [8 marks]',
      stimulus: ['The surprise attack on 6 October 1973', 'The OPEC oil embargo'],
      structureStrip: [
        {
          col: '1. PHASE 1: SURPRISE TWO-FRONT ASSAULT',
          text: 'Explain the 6 October surprise crossing on Yom Kippur / Ramadan: water monitors breaching Bar-Lev Line under Soviet SAM umbrella while Syria assaulted Golan.',
        },
        {
          col: '2. PHASE 2: AIRLIFTS & COUNTER-CROSSING',
          text: 'Explain massive US emergency airlift (Nickel Grass) enabling General Sharon’s armored division to counter-cross the canal and encircle Egypt’s 3rd Army.',
        },
        {
          col: '3. PHASE 3: OIL WEAPON & AFTERMATH',
          text: 'Explain Arab OPEC oil embargo quadrupling world oil prices, superpower nuclear DEFCON 3 tension, and Henry Kissinger securing a UN ceasefire on 24 October.',
        },
      ],
      connectives:
        'The war began on 6 October 1973 when Egypt and Syria launched... &bull; This coordinated assault achieved tactical surprise because... &bull; As early losses threatened Israel, the United States... &bull; Consequently, General Sharon was able to... &bull; In response, Arab oil nations deployed the oil weapon by... &bull; Ultimately, the aftermath resulted in...',
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
      heightMm: 120,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. The Six Day War, 1967',
          items: [
            'Significance of Cairo Conference (1964) & growth of Fatah / PLO',
            'Escalating tension: Syria’s support for Fatah, Samu raid, 7 April 1967',
            'Actions of the USSR, Nasser and the USA leading to war',
            'Key events of the war across Sinai, West Bank, Jerusalem & Golan',
          ],
        },
        {
          title: '2. Aftermath of the 1967 War',
          items: [
            'UN Resolution 242 and continued dispute over the Suez Canal',
            'Palestinian refugees and occupied territories (Golan, Gaza, West Bank, Sinai, East Jerusalem)',
            'Terrorism, response & attitudes: PFLP hijacks 1970, Black September, Munich Olympics',
            'Expulsion of the PLO from Jordan (1970)',
          ],
        },
        {
          title: '3. Israel & Egypt, 1967–73',
          items: [
            'Egyptian relations with Israel, the USA, the USSR and Arab states',
            'Israel’s consolidation of control of the occupied territories',
            'Key events of the Yom Kippur War (1973) and its aftermath',
          ],
        },
      ],
    },
    footerQuip: approvedFunnyFooters[0],
    totalPageCount: 16,
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
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, approvedFunnyFooters[1], 16)}
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
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, approvedFunnyFooters[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS KT 2.1 TO 2.5)
  // ====================================================================
  kt2Configs.forEach((cfg) => {
    const leftPageNum = cfg.lessonNum * 2 + 2; // Pages 4, 6, 8, 10, 12
    const rightPageNum = leftPageNum + 1; // Pages 5, 7, 9, 11, 13
    const rx = cfg.rightExam;

    // ------------------------------------------------------------------
    // LEFT PAGE: ENQUIRY TITLE + SPEC FOCUS + 10 DO NOW + VOCAB + TWO 4-MARKERS
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC 2.${cfg.lessonNum} &bull; ENQUIRY LESSON
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 &bull; 26 MARKS
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${cfg.inquiryQuestion}
        </h2>
        <div style="font-family: 'Georgia', serif; font-size: 8.2pt; font-style: italic; color: #222222; line-height: 1.2;">
          ${cfg.subTitle}
        </div>
      </div>

      <!-- Key Specification Focus: Directly beneath the Title -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.22;">
        <strong>Key Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- 10-Question Do Now Retrieval Grid -->
      <div class="task-section" style="margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 12px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000; line-height: 1.18;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary (3 Lines, No Double Border) -->
      <div class="task-section" style="margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">HISTORICAL TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Question 1(a): Explain One Consequence [4 marks] -->
      <div class="task-section" style="margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(a): Explain One Consequence [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.5pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          ${cfg.consequenceA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>PFC Guidance:</strong> ${cfg.consequenceA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; margin-bottom: 1px;">
          <strong>Sentence Stems:</strong> ${cfg.consequenceA.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Question 1(b): Explain One Consequence [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(b): Explain One Consequence [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.5pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          ${cfg.consequenceB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>PFC Guidance:</strong> ${cfg.consequenceB.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; margin-bottom: 1px;">
          <strong>Sentence Stems:</strong> ${cfg.consequenceB.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(leftPageNum, approvedFunnyFooters[leftPageNum - 1], 16)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM PRACTICE (NARRATIVE / IMPORTANCE)        -->
  <!-- Docked 3-Row Scaffolding Block (Zero Gaps) • 16 Writing Lines       -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header (Top of Page) -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 1px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${rx.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment &bull; 8 Marks
        </span>
      </div>

      <!-- Unified 3-Row Scaffolding Block (Zero Inter-Row Gaps • Docked Directly Below Header) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; overflow: hidden; margin-top: 1px; margin-bottom: 2px; background: #ffffff;">
        
        <!-- Row 1: Question Stem & Stimulus / Analytical Focus -->
        <div style="padding: 2.5px 6px; border-bottom: 1px solid #000000; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #000000; line-height: 1.2;">
            ${rx.stem}
          </div>
          ${
            rx.type === 'narrative_8'
              ? `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.18;">
            <strong>You may use the following in your answer:</strong> &bull; ${rx.stimulus[0]} &bull; ${rx.stimulus[1]} &bull; <em>You must also use information of your own.</em>
          </div>
          `
              : `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.18;">
            <strong>Structure across two distinct analytical aspects:</strong> &bull; ${rx.focusAspects[0]} &bull; ${rx.focusAspects[1]}
          </div>
          `
          }
        </div>

        <!-- Row 2: 3-Column Planning Structure Strip (Flush Directly Beneath Row 1) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #000000; background: #fafafa;">
          ${rx.structureStrip
            .map(
              (strip, sIdx) => `
          <div style="padding: 2px 4px; ${sIdx < 2 ? 'border-right: 1px solid #000000;' : ''}">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000; display: block; line-height: 1.1; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #111111; line-height: 1.12; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Row 3: Connectives & Key Vocabulary Bank (Flush Directly Beneath Row 2) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; background: #ffffff;">
          <div style="padding: 2px 5px; border-right: 1px solid #000000;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; display: block; line-height: 1.1;">Analytical Connectives:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; line-height: 1.12; display: block;">${rx.connectives}</span>
          </div>
          <div style="padding: 2px 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; display: block; line-height: 1.1;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.12; display: block;">${rx.wordBank}</span>
          </div>
        </div>

      </div>

      <!-- Ruled Task Lines for Extended Writing (27 Thick Black Lines) -->
      <div style="margin-bottom: 2px;">
        ${Array.from({ length: 27 })
          .map(() => '<div class="task-line"></div>')
          .join('\n        ')}
      </div>

      <!-- Timeline Mission Box (Sits right at the bottom above the footer line & funny quote) -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 2px 6px; background: #fdfdfd; margin-top: auto; margin-bottom: 2px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1px;">
          Timeline Mission &bull; Pages 2–3
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; line-height: 1.2;">
          ${rx.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(rightPageNum, approvedFunnyFooters[rightPageNum - 1], 16)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: KEY TOPIC 2 MASTER KNOWLEDGE ORGANISER (Verso / Left Page)
  // Specification Synthesis & Flash Recall Accelerator
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      
      <!-- Top Departmental Branding -->
      <div style="border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Master Knowledge Organiser</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">KEY TOPIC 2 SYNTHESIS</span>
        </div>
      </div>

      <!-- Main Title Header -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 4px 10px; background: #fff; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 1px;">
            <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
              CORE KNOWLEDGE
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              Specification Synthesis (1964–1973)
            </span>
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; line-height: 1.15; margin: 0; font-weight: 900;">
            The Escalating Conflict, 1964–1973: Master Knowledge Organiser
          </h2>
        </div>
        <div style="text-align: right; border-left: 1.5px solid #000; padding-left: 10px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; display: block;">Paper 2 Spec</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 900;">1HI0/2B</span>
        </div>
      </div>

      <!-- Section 1: 5 Enquiries Core Specification Synthesis (High-Density Cards) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
          <span>1. The 5 Core Specification Enquiries (Chronological Causal Sequence)</span>
          <span>Pearson Edexcel High-Yield Content</span>
        </div>

        <!-- Enquiry 1 -->
        <div style="padding: 3.5px 8px; border-bottom: 1px solid #000; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">KT 2.1: The Road to War: Water Wars &amp; Border Skirmishes (1964–67)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; background: #eee; padding: 0.5px 4px; border-radius: 2px;">Exam: Q1 Conseq &bull; Q2 Narrative</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.25; margin: 0; color: #111;">
            <strong>Cairo Conference (1964):</strong> Arab League meets in Cairo to oppose Israel's National Water Carrier; creates the <strong>Palestine Liberation Organisation (PLO)</strong> under Ahmad Shuqeiri and approves the Syrian Headwater Diversion Plan. <br>
            <strong>Border Clashes:</strong> Israeli airstrikes destroy Syrian earth-moving equipment. Syrian-backed <strong>Fatah fedayeen</strong> conduct cross-border guerrilla sabotage. Israel retaliates with the Samu raid in Jordan (Nov 1966) and the <strong>7 April 1967 air dogfight</strong> over the Golan Heights, shooting down 6 Syrian MiG-21s and buzzing Damascus.
          </p>
        </div>

        <!-- Enquiry 2 -->
        <div style="padding: 3.5px 8px; border-bottom: 1px solid #000; background: #fafafa;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">KT 2.2: Course of the Six-Day War (5–10 June 1967)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; background: #eee; padding: 0.5px 4px; border-radius: 2px;">Exam: Q1 Conseq &bull; Q3 Importance</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.25; margin: 0; color: #111;">
            <strong>May 1967 Escalation:</strong> Soviet false intelligence warns Syria of Israeli troop build-up. In response, Egyptian President Nasser expels <strong>UNEF peacekeepers</strong> from Sinai (18 May), deploys 100,000 troops and 1,000 tanks, closes the <strong>Straits of Tiran</strong> at Sharm el-Sheikh to Israeli shipping (22 May), and signs a Mutual Defence Pact with King Hussein of Jordan (30 May). <br>
            <strong>Operation Focus (5–10 June):</strong> On 5 June, Israel launches a pre-emptive air strike, wiping out 300+ Egyptian aircraft on the ground in 3 hours. Israeli forces secure total air supremacy and capture the <strong>Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem (Western Wall), and Golan Heights</strong> in just six days.
          </p>
        </div>

        <!-- Enquiry 3 -->
        <div style="padding: 3.5px 8px; border-bottom: 1px solid #000; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">KT 2.3: Aftermath: Occupied Territories &amp; UN Resolution 242 (1967)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; background: #eee; padding: 0.5px 4px; border-radius: 2px;">Exam: Q1 Conseq &bull; Q2 Narrative</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.25; margin: 0; color: #111;">
            <strong>Territorial Expansion:</strong> Israel triples its land area, establishing strategic depth but bringing over 1 million Palestinian Arabs under direct military occupation. Jewish religious and security settlements begin in the West Bank and Golan. <br>
            <strong>Diplomatic Deadlock:</strong> Arab leaders meet at the <strong>Khartoum Summit (Sept 1967)</strong> and issue the <em>‘Three Noes’</em>: No peace with Israel, no recognition of Israel, no negotiations with Israel. In November 1967, the UN passes <strong>Resolution 242</strong> establishing the <em>‘Land for Peace’</em> formula; its deliberate English ambiguity ('withdrawal from territories' vs French 'des territoires') leads to diplomatic stalemate.
          </p>
        </div>

        <!-- Enquiry 4 -->
        <div style="padding: 3.5px 8px; border-bottom: 1px solid #000; background: #fafafa;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">KT 2.4: Palestinian Nationalism &amp; International Terrorism (1968–72)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; background: #eee; padding: 0.5px 4px; border-radius: 2px;">Exam: Q1 Conseq &bull; Q3 Importance</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.25; margin: 0; color: #111;">
            <strong>Rise of Fatah &amp; Arafat:</strong> Following the Arab armies' defeat, Palestinians conclude they must liberate themselves. At the <strong>Battle of Karameh (March 1968)</strong>, Palestinian fighters inflict heavy casualties on an Israeli raid, boosting recruitment. <strong>Yasser Arafat</strong> becomes PLO Chairman in 1969. <br>
            <strong>Terrorism &amp; Expulsion:</strong> George Habash's PFLP hijacks 4 Western airliners to Dawson’s Field, Jordan (Sept 1970). King Hussein’s army launches <strong>Black September</strong>, violently expelling the PLO to Lebanon. In revenge, the Black September faction murders 11 Israeli athletes at the <strong>1972 Munich Olympics</strong>, triggering Israeli Operation Wrath of God counter-assassinations.
          </p>
        </div>

        <!-- Enquiry 5 -->
        <div style="padding: 3.5px 8px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">KT 2.5: The Yom Kippur War &amp; The Global Oil Weapon (1973)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; background: #eee; padding: 0.5px 4px; border-radius: 2px;">Exam: Q1 Conseq &bull; Q2 Narrative</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.0pt; line-height: 1.25; margin: 0; color: #111;">
            <strong>Operation Badr (6 Oct 1973):</strong> Egyptian President Anwar Sadat and Syrian President Hafez al-Assad launch a coordinated surprise assault on Yom Kippur/Ramadan. Egyptian forces use high-pressure water monitors to breach the <strong>Bar-Lev Line</strong> sand wall, crossing the Suez Canal under a mobile Soviet SAM-6 anti-aircraft umbrella while Syria invades the Golan Heights. <br>
            <strong>Airlifts, Counter-Attack &amp; Oil Embargo:</strong> The US launches massive emergency airlift <strong>Operation Nickel Grass</strong> to re-arm Israel. General Ariel Sharon counter-crosses the canal, encircling Egypt's Third Army. Arab members of <strong>OPEC deploy the oil weapon</strong>, cutting production and imposing an embargo on the US and Netherlands, quadrupling global oil prices. US Secretary of State Henry Kissinger brokers a ceasefire (UN Res 338).
          </p>
        </div>
      </div>

      <!-- Section 2: Dual-Term Conceptual & Analytical Distinctions -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
          <span>2. Dual-Term Analytical Distinctions (Do Not Confuse in Extended Writing)</span>
          <span>Conceptual Precision</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.22;">
          <div style="padding: 3px 6px; border-right: 1px solid #000; border-bottom: 1px solid #000;">
            <strong style="text-transform: uppercase;">Pre-emptive Strike vs Act of Aggression:</strong><br>
            <span style="font-family: 'Georgia', serif;">Israel argued Operation Focus was a legal pre-emptive strike in self-defence against an existential blockade; Arab states condemned it as unprovoked territorial aggression.</span>
          </div>
          <div style="padding: 3px 6px; border-bottom: 1px solid #000;">
            <strong style="text-transform: uppercase;">Fatah vs The PLO:</strong><br>
            <span style="font-family: 'Georgia', serif;">Fatah was Arafat's specific secular guerrilla faction (formed 1959); the PLO was the wider umbrella body established by the Arab League (1964) which Fatah took control of in 1969.</span>
          </div>
          <div style="padding: 3px 6px; border-right: 1px solid #000;">
            <strong style="text-transform: uppercase;">'Three Noes' vs 'Land for Peace':</strong><br>
            <span style="font-family: 'Georgia', serif;">Khartoum (Sept 1967) rejected peace, recognition, and talks with Israel; UN Res 242 (Nov 1967) offered Arab recognition and secure borders in exchange for Israeli territorial withdrawal.</span>
          </div>
          <div style="padding: 3px 6px;">
            <strong style="text-transform: uppercase;">Water Monitors vs Artillery Shelling:</strong><br>
            <span style="font-family: 'Georgia', serif;">Water monitors were high-pressure water cannons pumping canal water to liquify 20m sand ramparts in 2 hours; conventional explosives were proven useless against loose sand.</span>
          </div>
        </div>
      </div>

      <!-- Section 3: Rapid Retrieval Statistical Anchors (10 Must-Know Flash Facts) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 3px 8px; background: #fafafa;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>3. Rapid Retrieval Flash Anchors &bull; 10 Essential Chronological &amp; Statistical Milestones</span>
          <span>Memorise for Grade 9</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; text-align: center; font-family: 'Inter', sans-serif;">
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">1964</strong>
            <span style="font-size: 5.8pt; color: #222;">Cairo Summit &bull; PLO Created</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">7 Apr 1967</strong>
            <span style="font-size: 5.8pt; color: #222;">Golan Dogfight (6 MiGs)</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">5–10 Jun 1967</strong>
            <span style="font-size: 5.8pt; color: #222;">Six-Day Blitzkrieg</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">Nov 1967</strong>
            <span style="font-size: 5.8pt; color: #222;">UN Resolution 242</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">Mar 1968</strong>
            <span style="font-size: 5.8pt; color: #222;">Battle of Karameh</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">Sep 1970</strong>
            <span style="font-size: 5.8pt; color: #222;">Dawson's Field &amp; Black Sept</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">Sep 1972</strong>
            <span style="font-size: 5.8pt; color: #222;">Munich Olympics (11 killed)</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">6 Oct 1973</strong>
            <span style="font-size: 5.8pt; color: #222;">Op Badr (Yom Kippur)</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">Oct 1973</strong>
            <span style="font-size: 5.8pt; color: #222;">OPEC Embargo (400% rise)</span>
          </div>
          <div style="border: 1px solid #000; padding: 2px; border-radius: 2px; background: #fff;">
            <strong style="font-size: 7.2pt; display: block;">24 Oct 1973</strong>
            <span style="font-size: 5.8pt; color: #222;">UN Res 338 Ceasefire</span>
          </div>
        </div>
      </div>

      ${renderFooterStrip(14, approvedFunnyFooters[13], 16)}
    </div>
  </div>

  <!-- ==================================================================== -->
  <!-- PAGE 15: INSIDE BACK COVER: GRADE 9 EXAM MASTERCLASS (Recto / Right)  -->
  <!-- Pearson Edexcel Rubric, PFC Formula & Analytical Connectives         -->
  <!-- ==================================================================== -->
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      
      <!-- Top Departmental Branding -->
      <div style="border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Grade 9 Masterclass</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">INSIDE BACK COVER</span>
        </div>
      </div>

      <!-- Main Title Header -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 4px 10px; background: #fff; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 1px;">
            <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
              EXAM ARCHITECTURE
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              Pearson Edexcel Paper 2 Assessment Rubric
            </span>
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; line-height: 1.15; margin: 0; font-weight: 900;">
            Grade 9 Extended Writing Masterclass &amp; Mark Scheme Rubric
          </h2>
        </div>
        <div style="text-align: right; border-left: 1.5px solid #000; padding-left: 10px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; display: block;">Target Standard</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 900;">GRADE 9 (85%+)</span>
        </div>
      </div>

      <!-- Section 1: Official Pearson Edexcel Mark Scheme Descriptors Matrix -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
          <span>1. Official Pearson Edexcel Mark Scheme Descriptors (Q2 Narrative &amp; Q3 Importance [8 Marks])</span>
          <span>Assessment Criteria</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
          <thead>
            <tr style="background: #f0f0f0; border-bottom: 1.2px solid #000;">
              <th style="padding: 3px 6px; width: 65px; text-align: center; border-right: 1px solid #000;">Level &amp; Marks</th>
              <th style="padding: 3px 8px; text-align: left; border-right: 1px solid #000;">Official Pearson Edexcel Standard</th>
              <th style="padding: 3px 8px; text-align: left; width: 230px;">Actionable Pupil Guidance (How to Secure It)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000; background: #fff;">
              <td style="padding: 3px 6px; text-align: center; font-weight: 900; font-size: 7.5pt; border-right: 1px solid #000;">
                Level 4<br><span style="font-size: 8.5pt;">7–8m</span>
              </td>
              <td style="padding: 3px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                An analytical explanation is offered which is consistently directed to the question. Shows comprehensive, accurate historical knowledge and understanding. Synthesises a sustained, coherent line of reasoning with explicit causal links between events/phases.
              </td>
              <td style="padding: 3px 8px; font-weight: 600;">
                &bull; Never just say <em>'and then'</em>; explain <strong>HOW</strong> event A directly forced event B.<br>
                &bull; Integrate at least 4 precise proper nouns, statistics, or named figures per paragraph.<br>
                &bull; Conclude each paragraph with an analytical verdict directly answering the stem.
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000; background: #fafafa;">
              <td style="padding: 3px 6px; text-align: center; font-weight: 800; font-size: 7.5pt; border-right: 1px solid #000;">
                Level 3<br><span style="font-size: 8.5pt;">5–6m</span>
              </td>
              <td style="padding: 3px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                An analytical explanation is offered with some focus on the question. Accurate knowledge is demonstrated. The account is mostly coherent and structured, with some causal links established between stages.
              </td>
              <td style="padding: 3px 8px;">
                &bull; Good factual knowledge and chronological ordering, but some sections lapse into storytelling without explaining historical consequence.<br>
                &bull; Weak or missing transitions between the phases of the event.
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000; background: #fff;">
              <td style="padding: 3px 6px; text-align: center; font-weight: 800; font-size: 7.5pt; border-right: 1px solid #000;">
                Level 2<br><span style="font-size: 8.5pt;">3–4m</span>
              </td>
              <td style="padding: 3px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                A narrative or descriptive account is offered. Basic knowledge is shown. Links between events are weak, simple, or purely chronological rather than causal.
              </td>
              <td style="padding: 3px 8px;">
                &bull; Retells the plot chronologically without answering the prompt's key analytical verb.<br>
                &bull; Broad generalisations with few specific dates, proper nouns, or named battles.
              </td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 3px 6px; text-align: center; font-weight: 800; font-size: 7.5pt; border-right: 1px solid #000;">
                Level 1<br><span style="font-size: 8.5pt;">1–2m</span>
              </td>
              <td style="padding: 3px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                Simple, general statements are made. Demonstrates limited knowledge with significant factual confusion or irrelevance.
              </td>
              <td style="padding: 3px 8px;">
                &bull; 1–2 vague, disjointed sentences without historical grounding. Needs basic recall drill.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 2: The Edexcel PFC Formula for Q1 Consequence Questions [4 Marks] -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 3px 8px; background: #fff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">
            2. The Edexcel PFC Formula for Q1 Consequence Questions [4 Marks in 4 Minutes]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
            1 PARAGRAPH = 4/4 MARKS
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1.2fr 1.4fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.5pt; margin-bottom: 2px;">
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>[P] POINT (1 Mark):</strong> Identify ONE specific consequence clearly in your very first sentence.
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>[F] FACT (1–2 Marks):</strong> Deploy 2–3 precise proper nouns, statistics, or chronological details.
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>[C] CONSEQUENCE (1 Mark):</strong> Explain the direct historical impact and why it mattered.
          </div>
        </div>
        <div style="border-left: 2px solid #000; padding-left: 5px; font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.2; color: #111;">
          <strong>Exemplar 4/4 Model:</strong> <em>One consequence of Nasser closing the Straits of Tiran in May 1967 was that it made war inevitable [P]. By blockading the port of Eilat, Egypt cut off 90% of Israel’s vital oil imports, which Prime Minister Levi Eshkol had repeatedly declared would be treated as an explicit casus belli [F]. Consequently, this economic asphyxiation convinced the Israeli Cabinet that diplomatic options were exhausted, directly triggering the pre-emptive air strikes of Operation Focus on 5 June 1967 [C].</em>
        </div>
      </div>

      <!-- Section 3: High-Yield Analytical Connective & Sentence Starter Matrix -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
          <span>3. Grade 9 Analytical Connective &amp; Transition Bank</span>
          <span>Elevate Your Writing</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.22;">
          <div style="padding: 3px 6px; border-right: 1px solid #000; background: #fff;">
            <strong style="text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Causal Chain Stems:</strong>
            <span style="font-family: 'Georgia', serif; font-style: italic;">
              &bull; "The underlying catalyst was..."<br>
              &bull; "This directly precipitated..."<br>
              &bull; "Consequently, this forced Israel to..."<br>
              &bull; "As an inevitable repercussion..."
            </span>
          </div>
          <div style="padding: 3px 6px; border-right: 1px solid #000; background: #fafafa;">
            <strong style="text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Narrative Progression:</strong>
            <span style="font-family: 'Georgia', serif; font-style: italic;">
              &bull; "The immediate precursor was..."<br>
              &bull; "Tensions intensified when..."<br>
              &bull; "This military breakthrough enabled..."<br>
              &bull; "The situation culminated in..."
            </span>
          </div>
          <div style="padding: 3px 6px; background: #fff;">
            <strong style="text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Significance &amp; Verdict:</strong>
            <span style="font-family: 'Georgia', serif; font-style: italic;">
              &bull; "This proved decisive because..."<br>
              &bull; "The fundamental turning point lay in..."<br>
              &bull; "This shattered the assumption that..."<br>
              &bull; "The enduring consequence was..."
            </span>
          </div>
        </div>
      </div>

      <!-- Section 4: Pupil Extended Writing Self-Audit Checklist -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 3px 8px; background: #fafafa;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>4. Pupil Extended Writing Self-Audit Checklist (The Grade 9 Polish)</span>
          <span>Tick Before Handing In</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.2;">
          <div>&bull; &#9633; Did I name at least 3 specific historical proper nouns per paragraph?</div>
          <div>&bull; &#9633; Did I frame my opening line to echo the exact words of the exam question?</div>
          <div>&bull; &#9633; Did I explain <strong>HOW</strong> event A caused event B rather than just stating it?</div>
          <div>&bull; &#9633; For narrative accounts: Are my 3 paragraphs in strict chronological sequence?</div>
          <div>&bull; &#9633; Did I use causal connectives (<em>Consequently, This directly led to</em>)?</div>
          <div>&bull; &#9633; For importance questions: Did I evaluate the lasting impact or turning point?</div>
        </div>
      </div>

      ${renderFooterStrip(15, approvedFunnyFooters[14], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (Student Assessment Record & Digital Quizzing Hub)
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
    footerQuip: approvedFunnyFooters[15],
    totalPageCount: 16,
    renderFooterStrip,
  });

  html += `
</body>
</html>
`;

  return html;
}

module.exports = { buildCmeKt2TwoPageWorkbook };
