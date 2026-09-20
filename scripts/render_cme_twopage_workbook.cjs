const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

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

// Footers currently on pages (retaining departmental styling for pupil books)
const currentFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 2 • The History Department', // Page 1
  'Milestones 1–3: The Road to War and the Six-Day War (1964–1967)', // Page 2
  'Milestones 4–6: Diplomacy, Terror, and the Yom Kippur War (1967–1973)', // Page 3
  'Key Topic 2.1: The Road to War (1964–1967) • Knowledge Retrieval & Exam Practice', // Page 4
  'Key Topic 2.1: Extended Writing Assessment • Question 2: Analytical Narrative', // Page 5
  'Key Topic 2.2: The Six-Day War (1967) • Knowledge Retrieval & Exam Practice', // Page 6
  'Key Topic 2.2: Extended Writing Assessment • Question 3: Explain the Importance', // Page 7
  'Key Topic 2.3: Aftermath & Resolution 242 (1967) • Knowledge Retrieval & Exam Practice', // Page 8
  'Key Topic 2.3: Extended Writing Assessment • Question 2: Analytical Narrative', // Page 9
  'Key Topic 2.4: Palestinian Resistance & Munich (1968–1972) • Knowledge Retrieval & Exam Practice', // Page 10
  'Key Topic 2.4: Extended Writing Assessment • Question 3: Explain the Importance', // Page 11
  'Key Topic 2.5: Yom Kippur War & Oil Crisis (1969–1973) • Knowledge Retrieval & Exam Practice', // Page 12
  'Key Topic 2.5: Extended Writing Assessment • Question 2: Analytical Narrative', // Page 13
  'Key Topic 2 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub', // Page 14
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Footer Text on the Same Line)
// Even pages (verso/left): Page number on left, text on right.
// Odd pages (recto/right): Text on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, text, totalPages = 14) {
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
      question:
        'Explain one consequence of the Arab League’s Headwater Diversion Plan (1964–66). [4 marks]',
      guidance:
        'Point (IDF airstrikes and artillery destroying Syrian earthmoving machinery) &bull; Fact (Israel targeted Banyas canal diversion works) &bull; Consequence (Halted Arab water diversion but sharply escalated cross-border shelling and Syrian backing for Fatah guerrilla raids).',
      stems:
        'One major consequence was... &bull; Specifically, when Syria attempted to divert the headwaters of the Jordan... &bull; Consequently, this resulted in...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the 7 April 1967 air battle over the Golan Heights. [4 marks]',
      guidance:
        'Point (Humiliating defeat for the Syrian Air Force) &bull; Fact (Israeli Mirage jets shot down six Syrian MiG-21s and flew victory passes over Damascus) &bull; Consequence (Provoked false Soviet intelligence reports in May 1967, pressuring Nasser to mobilise in Sinai).',
      stems:
        'One major consequence was... &bull; Specifically, during the aerial clash on 7 April 1967... &bull; Consequently, this directly triggered...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events that led to the outbreak of the Six-Day War (1964–June 1967). [8 marks]',
      stimulus: [
        'The closure of the Straits of Tiran (May 1967)',
        'The expulsion of UNEF from Sinai',
      ],
      structureStrip: [
        {
          col: '1. PHASE 1: CATALYSTS (1964–66)',
          text: 'Explain the Cairo Conference (1964), River Jordan water disputes, creation of the PLO, and escalating cross-border Syrian artillery and fedayeen raids.',
        },
        {
          col: '2. PHASE 2: ESCALATION (MAY 1967)',
          text: 'Explain Soviet false warnings, Nasser expelling UNEF peacekeepers, moving 100,000 troops into Sinai, and closing the Straits of Tiran at Sharm el-Sheikh.',
        },
        {
          col: '3. PHASE 3: OUTCOME (JUNE 1967)',
          text: 'Explain the Egyptian-Jordanian defence pact (May 30) encircling Israel, and Israel launching Operation Focus pre-emptive airstrikes on 5 June.',
        },
      ],
      connectives:
        'The crisis began in 1964 when... &bull; Tensions escalated sharply in May 1967 because... &bull; Following the expulsion of UNEF, Nasser... &bull; Consequently, Israel viewed this as a casus belli... &bull; Ultimately, this culminated in...',
      wordBank:
        'Cairo Conference (1964) &bull; National Water Carrier &bull; Headwater Diversion &bull; Fatah raids &bull; 7 April air battle &bull; UNEF peacekeepers &bull; Straits of Tiran &bull; Sharm el-Sheikh &bull; casus belli &bull; Operation Focus',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.1). In Milestones 1 and 2, sketch the Cairo Arab Summit symbol and annotate the blockade of the Straits of Tiran at Sharm el-Sheikh.',
    },
  },

  {
    lessonIndex: 5,
    lessonNum: 2,
    id: 'lesson_7',
    title: 'KT2.2: The Outbreak & Course of the Six-Day War (June 1967)',
    specAnchor:
      'The outbreak of war on 5 June 1967; Operation Focus (destruction of Arab air forces on the ground); the three-front campaign in Sinai, West Bank/Jerusalem, and Golan Heights; Israel’s total military victory and capture of strategic territory.',
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
        'Explain one consequence of Operation Focus on the morning of 5 June 1967. [4 marks]',
      guidance:
        'Point (Complete destruction of the Egyptian Air Force on the ground) &bull; Fact (Over 300 of Egypt’s 420 combat aircraft wiped out in 3 hours using runway-crater bombs) &bull; Consequence (Gave Israel total air supremacy, leaving Egyptian ground forces in Sinai defenseless without air cover).',
      stems:
        'One major consequence was... &bull; Specifically, when the Israeli Air Force launched Operation Focus... &bull; Consequently, this enabled the IDF to...',
    },
    consequenceB: {
      question: 'Explain one consequence of Jordan entering the war on 5 June 1967. [4 marks]',
      guidance:
        'Point (Israel’s capture of East Jerusalem and the entire West Bank) &bull; Fact (Jordanian artillery shelled West Jerusalem based on false Egyptian reports; Israeli paratroopers counter-attacked) &bull; Consequence (Israel captured the Old City and annexed East Jerusalem, displacing 300,000+ Palestinians).',
      stems:
        'One major consequence was... &bull; Specifically, after King Hussein ordered Jordanian forces to fire... &bull; Consequently, this resulted in...',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the Israeli capture of the Golan Heights (9–10 June 1967) for Israeli security. [8 marks]',
      focusAspects: [
        'Protection of Galilee Farming Settlements & Water Sources',
        'Topographical High Ground & Strategic Early Warning',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: ELIMINATING BORDER SHELLING',
          text: 'Explain how Syrian artillery bunkers on the escarpment had terrorised Hula Valley kibbutzim for 19 years; capturing the heights permanently ended cross-border bombardments.',
        },
        {
          col: '2. POINT 2: STRATEGIC HIGH GROUND',
          text: 'Explain how holding Mt Hermon and the high volcanic plateau placed the IDF within 40 miles of Damascus, providing early radar warning and blocking Syrian armored invasions.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: PERMANENT SHIFT',
          text: 'Explain how capturing the Golan permanently transformed Israel from a vulnerable defensive position into the dominant military power on its northern frontier.',
        },
      ],
      connectives:
        'The capture of the Golan Heights was important for Israeli security because... &bull; In particular, for 19 years Syrian forces had... &bull; By capturing the volcanic escarpment, the IDF... &bull; Furthermore, holding the high plateau provided... &bull; Ultimately, this transformed...',
      wordBank:
        'Golan escarpment &bull; Galilee kibbutzim &bull; Hula Valley &bull; Syrian artillery bunkers &bull; General David Elazar &bull; Mt Hermon &bull; radar early warning &bull; Damascus buffer &bull; strategic depth &bull; 9–10 June assault',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.2). In Milestone 3, sketch Israeli Centurion tanks advancing through the desert and label the Golan Heights, West Bank, and Sinai.',
    },
  },

  {
    lessonIndex: 6,
    lessonNum: 3,
    id: 'lesson_8',
    title: 'KT2.3: The Aftermath: Resolution 242 & The Occupied Territories (1967)',
    specAnchor:
      'The creation of the Occupied Territories (Sinai, Gaza, West Bank, East Jerusalem, Golan Heights); Palestinian refugee crisis (300,000+ displaced); the Khartoum Conference and the "Three Noes" (Aug–Sept 1967); UN Resolution 242 and "Land for Peace" (Nov 1967).',
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
      question:
        'Explain one consequence of the Six-Day War for Palestinian civilians in the West Bank. [4 marks]',
      guidance:
        'Point (Mass displacement and military occupation) &bull; Fact (Over 300,000 Palestinians fled across the River Jordan; 1 million fell under Israeli military rule) &bull; Consequence (Deepened the refugee crisis and drove young Palestinians into armed guerrilla groups like Fatah).',
      stems:
        'One major consequence for Palestinian civilians was... &bull; Specifically, during and immediately after the June 1967 fighting... &bull; Consequently, this resulted in...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the Khartoum Arab Summit (August–September 1967). [4 marks]',
      guidance:
        'Point (Entrenched total diplomatic deadlock via the "Three Noes") &bull; Fact (Eight Arab heads of state declared: No peace, no recognition, no negotiations with Israel) &bull; Consequence (Convinced Israeli leaders that Arab states would never negotiate, prompting Israel to retain the lands and build settlements).',
      stems:
        'One major consequence was... &bull; Specifically, Arab leaders resolved at Khartoum that... &bull; Consequently, this entrenched deadlock because...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the diplomatic responses to the Six-Day War between June and November 1967. [8 marks]',
      stimulus: [
        'The Khartoum Conference (August–September 1967)',
        'UN Security Council Resolution 242 (November 1967)',
      ],
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
          col: '3. PHASE 3: UN COMPROMISE (NOV 1967)',
          text: 'Explain British drafting of Resolution 242 establishing "Land for Peace", deliberate linguistic ambiguity ("territories occupied"), and resulting deadlock.',
        },
      ],
      connectives:
        'Following the swift conclusion of the June 1967 war... &bull; This territorial transformation prompted Arab leaders to meet at Khartoum, where... &bull; In response to the growing diplomatic impasse, the UN drafted... &bull; Consequently, Lord Caradon formulated... &bull; Ultimately, this established...',
      wordBank:
        'Occupied Territories &bull; 300,000 refugees &bull; Khartoum Summit &bull; "Three Noes" &bull; UN Resolution 242 &bull; Lord Caradon &bull; "Land for Peace" &bull; "territories occupied" &bull; Gunnar Jarring &bull; military governor',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.3). In Milestone 4, sketch the UN Security Council emblem and write out the three banners of the Khartoum "Three Noes".',
    },
  },

  {
    lessonIndex: 7,
    lessonNum: 4,
    id: 'lesson_9',
    title: 'KT2.4: Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    specAnchor:
      'The rise of independent Palestinian resistance: the Battle of Karameh (1968) and Yasser Arafat taking leadership of the PLO; PFLP aircraft hijackings and Dawson’s Field (1970); Black September in Jordan (1970) and expulsion to Lebanon; the Munich Olympics massacre (1972) and Israeli reprisals.',
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
      question:
        'Explain one consequence of the Battle of Karameh (March 1968) for the Palestinian national movement. [4 marks]',
      guidance:
        'Point (Surge in volunteers and Fatah taking leadership of the PLO) &bull; Fact (Palestinian fedayeen resisted an Israeli armored raid in Jordan, killing 28 IDF soldiers) &bull; Consequence (Celebrated as a moral victory after 1967, transforming Arafat into a hero and leading to his 1969 election as PLO Chairman).',
      stems:
        'One major consequence was... &bull; Specifically, when Palestinian fedayeen fought at Karameh... &bull; Consequently, this resulted in...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the Black September conflict (1970) for the PLO. [4 marks]',
      guidance:
        'Point (Total military expulsion of the PLO from Jordan to southern Lebanon) &bull; Fact (Following the Dawson’s Field airliner hijackings, King Hussein ordered his army to crush armed militias in Amman) &bull; Consequence (The PLO lost its border with Israel and established "Fatahland" in Lebanon, pushing radical cells toward international terror).',
      stems:
        'One major consequence was... &bull; Specifically, after the Dawson’s Field hijackings... &bull; Consequently, this forced the PLO to...',
    },
    // Right Page: Question 3 Explain Importance [8 marks]
    rightExam: {
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the 1972 Munich Olympics massacre for international attitudes towards the Palestinian cause. [8 marks]',
      focusAspects: [
        'Global Media Recognition of the Palestinian Problem',
        'International Moral Outrage & Israeli Targeted Retaliation',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: GLOBAL TV SPOTLIGHT',
          text: 'Explain how Black September holding 11 Israeli athletes broadcast the Palestinian cause live to 900 million TV viewers, destroying the idea that Palestinians were merely passive refugees.',
        },
        {
          col: '2. POINT 2: MORAL OUTRAGE & REPRISALS',
          text: 'Explain how murdering unarmed athletes provoked worldwide condemnation, branding militants as terrorists and prompting Golda Meir to launch Operation Wrath of God assassinations.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: STRATEGIC IMPACT',
          text: 'Explain how the outrage proved terrorism could not win statehood, ultimately pushing Yasser Arafat to steer the PLO toward international diplomacy (1974 UN speech).',
        },
      ],
      connectives:
        'The Munich Olympics attack was important for international attitudes because... &bull; By striking a global sporting event broadcast live... &bull; However, the murder of eleven athletes provoked... &bull; In response, Israeli Prime Minister Golda Meir... &bull; Ultimately, this forced the world community to...',
      wordBank:
        'Black September &bull; 5 September 1972 &bull; 11 Israeli athletes &bull; Olympic Village &bull; 900 million viewers &bull; Golda Meir &bull; Operation Wrath of God &bull; Mossad assassinations &bull; global terrorism &bull; 1974 UN speech',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.4). In Milestone 5, sketch the Dawson’s Field aircraft explosion and trace the PLO exile route from Jordan to southern Lebanon.',
    },
  },

  {
    lessonIndex: 8,
    lessonNum: 5,
    id: 'lesson_10',
    title: 'KT2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
    specAnchor:
      'The War of Attrition (1969–70) and the Bar-Lev Line; death of Nasser and succession of Anwar Sadat; reasons for the 1973 attack; surprise assault on Yom Kippur (6 Oct 1973); water-monitor breach of the Bar-Lev Line; superpower involvement (US and Soviet airlifts); Sharon’s counter-crossing; the OPEC oil embargo; military and political outcomes.',
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
      question: 'Explain one consequence of Operation Badr on 6 October 1973. [4 marks]',
      guidance:
        'Point (Successful breach of the Bar-Lev Line and crossing of the Suez Canal) &bull; Fact (80,000 Egyptian infantry crossed on rafts, washed away sand ramparts, and established bridgeheads under SAM missiles) &bull; Consequence (Shattered Israeli confidence in defensive invincibility and destroyed 150+ Israeli tanks in 48 hours).',
      stems:
        'One major consequence of Operation Badr was... &bull; Specifically, on the afternoon of 6 October 1973... &bull; Consequently, this resulted in...',
    },
    consequenceB: {
      question: 'Explain one consequence of the OPEC oil embargo in October 1973. [4 marks]',
      guidance:
        'Point (Global energy crisis and quadrupling of world crude oil prices) &bull; Fact (Arab oil states cut output 5% monthly and embargoed the US and Netherlands; oil rose from $3 to $12 a barrel) &bull; Consequence (Caused inflation, fuel queues, and economic distress in the West, forcing the US into active peace mediation).',
      stems:
        'One major consequence was... &bull; Specifically, when Arab OPEC oil ministers enacted the embargo... &bull; Consequently, this directly forced...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events of the Yom Kippur War (October 1973). [8 marks]',
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
          col: '3. PHASE 3: OIL WEAPON & CEASEFIRE',
          text: 'Explain Arab OPEC oil embargo quadrupling world oil prices, superpower nuclear DEFCON 3 tension, and Henry Kissinger securing a UN ceasefire on 24 October.',
        },
      ],
      connectives:
        'The war began on 6 October 1973 when Egypt and Syria launched... &bull; This coordinated assault achieved tactical surprise because... &bull; As early losses threatened Israel, the United States... &bull; Consequently, General Sharon was able to... &bull; In response, Arab oil nations deployed the oil weapon by... &bull; Ultimately, this forced...',
      wordBank:
        'Operation Badr &bull; Bar-Lev Line &bull; water monitors &bull; SAM-6 missiles &bull; Golan Heights &bull; Operation Nickel Grass &bull; Ariel Sharon &bull; Third Army encirclement &bull; OPEC oil embargo &bull; DEFCON 3 &bull; Henry Kissinger',
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
    /* Print Offset for Saddle-Stitch Booklet Binding (3mm alternating inner margin) */
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    @page:left {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 7mm;
      margin-right: 13mm; /* 3mm inner gutter on right for verso staple fold */
    }
    @page:right {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 13mm; /* 3mm inner gutter on left for recto staple fold */
      margin-right: 7mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.5pt;
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
    .verso-page {
      padding-left: 4mm;
      padding-right: 8mm;
    }
    .recto-page {
      padding-left: 8mm;
      padding-right: 4mm;
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
      margin-bottom: 3px;
    }
    .task-line {
      border-bottom: 1px solid #000000;
      height: 6.6mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1px dotted #333333;
      height: 5.6mm;
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
      font-size: 6.8pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 800;
    }
    .footer-quip {
      font-style: italic;
      color: #222222;
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

  // ====================================================================
  // PAGE 1: FRONT COVER (Specification Checklist, Shelfmark GPO-D388-052)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Department Header Strip -->
      <div style="text-align: center; border-bottom: 1.5px solid #000000; padding-bottom: 3px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #000000;">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #222222; margin-top: 1px;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
        </div>
      </div>

      <!-- Pupil Details Box (Top of Cover, 3 Columns) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 4px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 1px 0 4px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 1px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; background: #ffffff;">
          Key Topic 2 &bull; 1964–1973
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; line-height: 1.15; color: #000000; margin: 1px 0 2px 0; font-weight: 900;">
          The Escalating Conflict, 1964–1973
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 9.5pt; color: #222222; font-style: italic; font-weight: 600;">
          The Cairo Conference, Six-Day War, Resolution 242, Palestinian Resistance &amp; The Yom Kippur War
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Entirety of Photograph Fully Visible) -->
      <div style="margin: 1px 0 4px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="height: 72mm; display: flex; justify-content: center; align-items: center; padding: 2px 0; background: #fdfdfd;">
          <img src="/units/cme_new/assets/kt2_cover.jpg" alt="David Rubinger: Israeli Paratroopers at the Western Wall, Jerusalem" style="max-height: 100%; max-width: 100%; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; filter: grayscale(100%);">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; padding: 2px 8px; border-top: 1.2px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Source:</strong> <em>Israeli Paratroopers at the Western Wall</em> &bull; David Rubinger (7 June 1967)</span>
          <span>Accession Shelfmark: <strong>GPO-D388-052</strong></span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 4px 10px; text-align: left; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 4px 4px; width: 68px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Learnt
              </th>
              <th style="padding: 4px 4px; width: 68px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 3px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.1: The Road to War: The Cairo Conference, Water Wars &amp; Skirmishes (1964–67)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the River Jordan water dispute, creation of the PLO, and 7 April 1967 air clash escalate tensions?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 3px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.2: The Outbreak &amp; Course of the Six-Day War (June 1967)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why was Operation Focus decisive, and how did Israel conquer the Sinai, West Bank, and Golan Heights?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 3px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.3: The Aftermath: Resolution 242 &amp; The Occupied Territories (1967)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did the Khartoum "Three Noes" and the linguistic ambiguity of Resolution 242 cause enduring deadlock?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 3px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.4: Palestinian Resistance: The PLO, Black September &amp; Munich (1968–1972)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the Battle of Karameh empower the PLO, and why did factions turn to hijackings and the Munich attack?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 3px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.5: The War of Attrition &amp; The Yom Kippur War (1969–1973)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did Egypt and Syria achieve surprise, how did the oil embargo impact the West, and why did it lead to peace?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, currentFooters[0], 14)}
    </div>
  </div>
`;

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
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                JAN 1964 &bull; The Cairo Conference &amp; The Foundation of the PLO
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Thirteen Arab League leaders meet in Cairo to oppose Israel's National Water Carrier. They establish the Palestine Liberation Organisation (PLO) under Ahmad Shukeiri and approve the Headwater Diversion Plan to divert the Hasbani and Banyas rivers away from the Sea of Galilee.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2: MAY–JUNE 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                MAY–JUNE 1967 &bull; Straits of Tiran Blockade &amp; UNEF Expulsion
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Spurred by Soviet false warnings, President Nasser demands the immediate withdrawal of UN Emergency Force (UNEF) peacekeepers, moves 100,000 troops into Sinai, and blockades the Straits of Tiran at Sharm el-Sheikh, cutting off Israel's southern oil route (casus belli).
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3: 5–10 JUNE 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                5–10 JUNE 1967 &bull; The Six-Day War &amp; The Conquered Territories
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Israel launches Operation Focus, wiping out the Egyptian Air Force on the tarmac. In six days of mobile warfare, the IDF captures the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, currentFooters[1], 14)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6) -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Diplomacy, Resistance &amp; The Yom Kippur War (1967–1973)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 4: NOV 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                22 NOV 1967 &bull; UN Resolution 242 &amp; The Khartoum "Three Noes"
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The UN Security Council unanimously adopts Resolution 242, establishing the foundational principle of "Land for Peace" (Israeli withdrawal in exchange for Arab recognition and secure borders). At the Khartoum Summit, the Arab League issues the defiant "Three Noes": no peace, no recognition, and no negotiations with Israel.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 5: SEPT 1970 – 1972 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                SEPT 1970 – 1972 &bull; Black September in Jordan &amp; The Munich Olympics
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Operating as a "state within a state" in Jordan, the PFLP blows up three hijacked Western airliners at Dawson's Field. King Hussein’s army crushes Palestinian militia strongholds in September 1970, expelling the PLO to Lebanon. In September 1972, the militant splinter faction Black September murders 11 Israeli Olympic athletes in Munich.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6: OCT 1973 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                6–25 OCT 1973 &bull; The Yom Kippur War &amp; The OPEC Oil Embargo
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Egypt and Syria launch a surprise assault on Yom Kippur. Egyptian infantry blast through the Bar-Lev Line using high-pressure water monitors under a Soviet SAM umbrella. Following emergency US airlifts and an Israeli counter-crossing led by Ariel Sharon, Arab OPEC ministers impose an oil embargo that quadruples global prices, shattering Israeli complacency.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, currentFooters[2], 14)}
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
    // LEFT PAGE: SPEC FOCUS + 10 DO NOW + VOCAB (3 LINES) + TWO 4-MARK QUESTIONS
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Retrieval &bull; Vocabulary &bull; Exam Practice
        </span>
      </div>

      <!-- Key Specification Focus -->
      <div style="border-left: 3px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25;">
        <strong>Key Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- 10-Question Do Now Retrieval Grid -->
      <div class="task-section" style="margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 12px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; line-height: 1.15;">
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
      <div class="task-section" style="margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">HISTORICAL TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Question 1(a): Explain One Consequence [4 marks] -->
      <div class="task-section" style="margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(a): Explain One Consequence [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          ${cfg.consequenceA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>PFC Guidance:</strong> ${cfg.consequenceA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; margin-bottom: 1px;">
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
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(b): Explain One Consequence [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          ${cfg.consequenceB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>PFC Guidance:</strong> ${cfg.consequenceB.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; margin-bottom: 1px;">
          <strong>Sentence Stems:</strong> ${cfg.consequenceB.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(leftPageNum, currentFooters[leftPageNum - 1], 14)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM PRACTICE (NARRATIVE / IMPORTANCE)        -->
  <!-- Zero Maps/Sources • 11 Fixed Ruled Lines • Clean Timeline Mission   -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${rx.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus/Focus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.25;">
          ${rx.stem}
        </div>
        ${
          rx.type === 'narrative_8'
            ? `
        <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.2;">
          <strong>You may use the following in your answer:</strong> &bull; ${rx.stimulus[0]} &bull; ${rx.stimulus[1]}<br>
          <em>You must also use information of your own.</em>
        </div>
        `
            : `
        <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.2;">
          <strong>Structure across two distinct analytical aspects:</strong> &bull; ${rx.focusAspects[0]} &bull; ${rx.focusAspects[1]}
        </div>
        `
        }
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; Analytical Step-by-Step Framework
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
          ${rx.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #000000; line-height: 1.15; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-style: italic; line-height: 1.15; display: block;">${rx.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; display: block;">${rx.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing (Fixed Height 6.8mm, No Flex Stretching) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #222222; margin-bottom: 1px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical exam answer in full sentences below:
      </div>
      <div style="margin-bottom: 4px;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Clean Tidy Timeline Mission Box -->
      <div style="border: 1px solid #000000; border-left: 3px solid #000000; border-radius: 3px; padding: 3px 6px; background: #fdfdfd; margin-top: 1px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1px;">
          Timeline Mission &bull; Pages 2–3
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #000000; line-height: 1.2;">
          ${rx.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(rightPageNum, currentFooters[rightPageNum - 1], 14)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (Spacious Ledger, Feedback & QR Hub)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Header Block -->
      <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0 0 2px 0; font-weight: 900; text-transform: uppercase;">
          Student Assessment Record &bull; Key Topic 2 Tracker
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #222222; font-weight: 700; letter-spacing: 0.5px;">
          Paper 2: Conflict in the Middle East, 1945–1995 &bull; The Escalating Conflict (1964–1973)
        </div>
      </div>

      <!-- Target Grade & Pupil Information Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 14px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 12px; align-items: center; margin-bottom: 6px;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <div style="border-bottom: 1.5px solid #000000; height: 16px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase;">Target Grade:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase;">Predicted:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase;">Attitude:</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 9pt; font-weight: 800; margin-top: 4px;">
            1 &bull; 2 &bull; 3 &bull; 4 &bull; 5
          </div>
        </div>
      </div>

      <!-- Assessment Progress Ledger Table (Expanded Spacing & Clear 26m Totals) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 6px 6px; width: 32px; text-align: center; font-size: 8pt; font-weight: 900; border-right: 1px solid #000000;">#</th>
              <th style="padding: 6px 10px; text-align: left; font-size: 8pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Enquiry / Lesson Assessment</th>
              <th style="padding: 6px 6px; width: 88px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Do Now (10m)</th>
              <th style="padding: 6px 6px; width: 108px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Q1 Conseq (8m)</th>
              <th style="padding: 6px 6px; width: 108px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Extended (8m)</th>
              <th style="padding: 6px 8px; width: 92px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; font-weight: 800;">1</td>
              <td style="padding: 5px 10px; border-right: 1px solid #000000;"><strong>KT2.1:</strong> Cairo Conference &amp; Water Wars</td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1(a+b): <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2 Narr: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 8px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 26</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; font-weight: 800;">2</td>
              <td style="padding: 5px 10px; border-right: 1px solid #000000;"><strong>KT2.2:</strong> Straits of Tiran &amp; Six Day War</td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1(a+b): <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Impt: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 8px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 26</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; font-weight: 800;">3</td>
              <td style="padding: 5px 10px; border-right: 1px solid #000000;"><strong>KT2.3:</strong> Occupied Territories &amp; Res 242</td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1(a+b): <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2 Narr: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 8px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 26</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; font-weight: 800;">4</td>
              <td style="padding: 5px 10px; border-right: 1px solid #000000;"><strong>KT2.4:</strong> Black September &amp; Munich 1972</td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1(a+b): <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Impt: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 8px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 26</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; font-weight: 800;">5</td>
              <td style="padding: 5px 10px; border-right: 1px solid #000000;"><strong>KT2.5:</strong> Yom Kippur War &amp; Oil Embargo</td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1(a+b): <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2 Narr: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 5px 8px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 26</strong> ]</td>
            </tr>
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 6px 10px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8pt;">Key Topic 2 Cumulative Assessment Totals</td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Do Now: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 50</strong> ]</span></td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1 Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 40</strong> ]</span></td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Ext Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 40</strong> ]</span></td>
              <td style="padding: 6px 8px; text-align: center; font-size: 10.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 130</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 lines each at 7.2mm) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            Teacher Formative Assessment &bull; WWW / EBI Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #222222; font-weight: 700;">
            Effort Grade: [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </span>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </span>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
        </div>
      </div>

      <!-- Interactive Quizzing & Revision QR Hub (5 QR Codes for Lessons 5 to 9) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #000000;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; font-weight: 700;">
            Scan with smartphone camera to open live interactive self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${kt2Configs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=${cfg.lessonIndex}`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Water Wars',
                'Six-Day War',
                'Res 242',
                'Munich 1972',
                'Yom Kippur',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT2.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 20mm; height: 20mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(14, currentFooters[13], 14)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildCmeKt2TwoPageWorkbook };
