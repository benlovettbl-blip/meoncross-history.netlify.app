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

// Approved Witty Revision Quips for CME Key Topic 3
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 3 • The History Department', // Page 1
  "\"'Shuttle diplomacy' wasn't a holiday: Kissinger lived on a Boeing 707 so you could write this essay.\"", // Page 2
  '"Carter spent 13 days in a Maryland cabin without leaving: you only need 45 minutes for Paper 2."', // Page 3
  '"Sadat said \'No more war\': make sure your consequence question has no more blank lines."', // Page 4
  '"Yamit was dismantled house by house: build your narrative paragraph by paragraph."', // Page 5
  '"Arafat brought an olive branch and a gun in 1974: bring your blue pen and specific dates."', // Page 6
  '"Operation Litani pushed 25 miles north: push your historical explanation beyond a simple description."', // Page 7
  '"400,000 Israelis marched in Tel Aviv: evidence and statistics turn a Grade 5 into a Grade 9."', // Page 8
  '"The Kahan Commission didn\'t accept vague excuses; neither will your Pearson GCSE examiner."', // Page 9
  '"The Intifada began with stones, but examiners award marks for precise political causes."', // Page 10
  '"Don\'t confuse the PLO with Hamas: secular nationalism vs Islamic covenant is vital detail."', // Page 11
  '"Arafat backed Saddam in 1990 and lost his Gulf funding: evaluate that diplomatic disaster."', // Page 12
  '"Secret talks in a Norwegian farmhouse: Oslo was born in silence, not on social media."', // Page 13
  '"Oslo II carved the West Bank into Areas A, B, and C: know your jurisdictions and percentages!"', // Page 14
  '"Rabin paid with his life on 4 November 1995: explain how extremism derailed the peace process."', // Page 15
  'Key Topic 3 Mastery Complete • Conflict in the Middle East GCSE Certification Hub', // Page 16
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
// 5 DEDICATED KEY TOPIC 3 LESSON CONFIGURATIONS
// ============================================================================
const kt3Configs = [
  {
    lessonIndex: 9,
    lessonNum: 1,
    id: 'lesson_11',
    inquiryQuestion:
      'How did the 1973 oil shock and shuttle diplomacy lead to Sadat’s visit to Jerusalem?',
    subTitle: 'Key Topic 3.1: Diplomatic Negotiations & Shuttle Diplomacy (1974–1978)',
    title: 'KT3.1: Diplomatic Negotiations & Shuttle Diplomacy (1974–1978)',
    specAnchor:
      'The oil crisis and superpower involvement: the roles of the USA (Kissinger’s shuttle diplomacy) and the USSR; the 1974–75 disengagement accords; the reopening of the Suez Canal; the 1977 Israeli election of Menachem Begin; Sadat’s visit to Israel (November 1977) and Knesset speech; Begin’s visit to Egypt (December 1977).',
    doNow: [
      {
        q: 'On what Jewish holy day did Egypt and Syria launch their surprise attack in 1973?',
        a: 'Yom Kippur (Day of Atonement)',
      },
      {
        q: 'What cartel of Arab oil-producing nations imposed the October 1973 oil embargo?',
        a: 'OPEC (Organization of the Petroleum Exporting Countries)',
      },
      {
        q: 'By how much did the price of crude oil increase per barrel following the 1973 oil embargo?',
        a: 'It quadrupled (from $3 to $12 a barrel)',
      },
      {
        q: 'Who served as US Secretary of State and pioneered "shuttle diplomacy" between 1974 and 1975?',
        a: 'Henry Kissinger',
      },
      {
        q: 'Which vital international waterway, closed since June 1967, was reopened by Egypt in June 1975?',
        a: 'The Suez Canal',
      },
      {
        q: 'Which right-wing Israeli political party won the May 1977 election, ending 29 years of Labour rule?',
        a: 'Likud',
      },
      {
        q: 'Who became Prime Minister of Israel in May 1977 having formerly commanded the Irgun?',
        a: 'Menachem Begin',
      },
      {
        q: 'On what date did Egyptian President Anwar Sadat land in Israel to address the Knesset in Jerusalem?',
        a: '19 November 1977',
      },
      {
        q: 'What foundational diplomatic principle did UN Resolution 242 establish in November 1967?',
        a: '"Land for Peace"',
      },
      {
        q: 'In which Egyptian city did Menachem Begin meet Sadat on Christmas Day 1977 for reciprocal talks?',
        a: 'Ismailia',
      },
    ],
    vocabPrompt:
      "Explain the crucial historical difference between a <strong>Multilateral Peace Conference</strong> (such as Geneva 1973) and <strong>Step-by-Step Bilateral Diplomacy</strong> (Kissinger's shuttle diplomacy). Why was bilateral mediation far more effective at achieving disengagement after 1973?",
    consequenceA: {
      question:
        'Explain one consequence of the 1973 OPEC oil embargo for American foreign policy in the Middle East. [4 marks]',
      guidance:
        'Point (Forced the United States to actively mediate in the Middle East to prevent future wars) • Fact (Quadrupling oil prices and domestic fuel queues caused stagflation, proving Western economic survival depended on Arab oil) • Consequence (Convinced Secretary of State Henry Kissinger that the US could not afford a frozen status quo, launching intense shuttle diplomacy).',
      stems:
        'One major consequence was... • Specifically, the OPEC embargo quadrupled oil prices, which caused... • Consequently, this compelled the US government to...',
    },
    consequenceB: {
      question:
        'Explain one consequence of Anwar Sadat’s visit to Jerusalem in November 1977. [4 marks]',
      guidance:
        'Point (Shattered thirty years of psychological taboos and opened direct bilateral peace negotiations) • Fact (Sadat addressed the Knesset directly, declaring "No more war, no more bloodshed", offering full diplomatic peace in return for Arab land) • Consequence (Bypassed multilateral stalemates and laid the direct foundation for the 1978 Camp David summit).',
      stems:
        'One major consequence was... • Specifically, on 19 November 1977, Sadat landed at Ben Gurion Airport and... • Consequently, this historic gesture directly resulted in...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks • 12 mins]',
      stem: 'Write a narrative account analysing the key events in diplomatic negotiations between Israel and Egypt from 1974 to November 1977. [8 marks]',
      stimulus: ['Kissinger’s shuttle diplomacy', 'Sadat’s visit to Jerusalem (1977)'],
      structureStrip: [
        {
          col: '1. PHASE 1: STEP-BY-STEP DIPLOMACY (1974–75)',
          text: 'Explain how the 1973 oil shock motivated Henry Kissinger to shuttle between capitals, brokering the Sinai I & II disengagements and reopening the Suez Canal.',
        },
        {
          col: '2. PHASE 2: THE 1977 LIKUD ELECTION',
          text: "Explain the political earthquake of May 1977: Menachem Begin's election, fears of renewed war over the West Bank, and the diplomatic impasse.",
        },
        {
          col: '3. PHASE 3: THE KNESSET BREAKTHROUGH (NOV 1977)',
          text: "Explain Sadat’s dramatic gamble flying to Jerusalem, addressing the Knesset, breaking psychological barriers, and Begin's reciprocal Ismailia summit.",
        },
      ],
      connectives:
        'The diplomatic process began following the 1973 war when... • In response to Western economic paralysis, Henry Kissinger... • Tensions shifted dramatically in May 1977 when the election of Menachem Begin... • Crucially, this deadlock was broken when Anwar Sadat decided to... • Consequently, by addressing the Knesset in November 1977... • Ultimately, this transformed relations because...',
      wordBank:
        'OPEC oil embargo • Henry Kissinger • shuttle diplomacy • Sinai I & II • Suez Canal reopening (1975) • Likud election (1977) • Menachem Begin • Anwar Sadat • Ben Gurion Airport • Knesset speech • Ismailia summit (Dec 1977)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.1). In Milestone 1, sketch Sadat addressing the Knesset chamber and annotate his historic declaration: "No more war, no more bloodshed!"',
    },
  },

  {
    lessonIndex: 10,
    lessonNum: 2,
    id: 'lesson_12',
    inquiryQuestion:
      'Why were the Camp David Accords signed, and why did they provoke violent fury across the Arab world?',
    subTitle: 'Key Topic 3.2: The Camp David Accords & The Treaty of Washington (1978–1982)',
    title: 'KT3.2: Camp David Accords & The Treaty of Washington (1978–1982)',
    specAnchor:
      'The role of US President Jimmy Carter; the Camp David negotiations (September 1978); the two frameworks of the Camp David Accords; the Egyptian-Israeli Peace Treaty (Treaty of Washington, March 1979); the phased return of Sinai and the evacuation of Yamit (1982); Arab state backlash, the Arab League boycott, and the assassination of Anwar Sadat (October 1981).',
    doNow: [
      {
        q: 'Which US President invited Menachem Begin and Anwar Sadat to Camp David in September 1978?',
        a: 'Jimmy Carter',
      },
      {
        q: 'How many days of sequestered negotiations took place at the Camp David presidential retreat?',
        a: '13 days',
      },
      {
        q: 'What were the two distinct frameworks signed at Camp David on 17 September 1978?',
        a: 'Palestinian self-governing autonomy & Egyptian-Israeli bilateral peace',
      },
      {
        q: 'On what date was the formal Egyptian-Israeli Peace Treaty signed on the White House lawn?',
        a: '26 March 1979 (Treaty of Washington)',
      },
      {
        q: 'What major captured territory did Israel agree to return to Egypt in exchange for full diplomatic peace?',
        a: 'The Sinai Peninsula',
      },
      {
        q: 'What was the name of the modern Israeli settlement in northern Sinai evacuated and bulldozed in April 1982?',
        a: 'Yamit',
      },
      {
        q: 'Approximately how much annual military and economic aid did the US guarantee to Israel and Egypt?',
        a: 'Approximately $3 billion to Israel and $2 billion to Egypt annually',
      },
      {
        q: 'To which North African city did the Arab League move its headquarters after expelling Egypt in 1979?',
        a: 'Tunis (Tunisia)',
      },
      {
        q: 'On what date was Egyptian President Anwar Sadat assassinated by Islamist soldiers in Cairo?',
        a: '6 October 1981',
      },
      {
        q: 'Who succeeded Anwar Sadat as President of Egypt and pledged to uphold the 1979 Peace Treaty?',
        a: 'Hosni Mubarak',
      },
    ],
    vocabPrompt:
      'Explain the fundamental difference between the <strong>Camp David Accords (1978)</strong> and the <strong>Treaty of Washington (1979)</strong>. Why did Palestinian leaders regard the Camp David framework as an unacceptable betrayal while Western powers celebrated it?',
    consequenceA: {
      question:
        'Explain one consequence of the Camp David Accords (1978) for Egyptian-Arab relations. [4 marks]',
      guidance:
        "Point (Led to Egypt's complete diplomatic isolation and expulsion from the Arab League) • Fact (Arab states meeting in Baghdad branded Sadat a traitor for signing a separate peace without securing Palestinian statehood; suspended Egypt's membership and moved Arab League HQ to Tunis) • Consequence (Severed Egypt's diplomatic leadership of the Arab world and isolated Sadat domestically).",
      stems:
        'One major consequence was... • Specifically, following the 1978 Camp David Accords, Arab nations... • Consequently, this resulted in Egypt being...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the Treaty of Washington (1979) for the Israeli settlement of Yamit. [4 marks]',
      guidance:
        'Point (Forced the complete evacuation and destruction of the Jewish settlement by the Israeli military in April 1982) • Fact (Prime Minister Begin deployed the IDF to forcibly remove protesting nationalist settlers, bulldozing 2,500 homes to return northern Sinai to Egypt) • Consequence (Demonstrated that Israel was willing to dismantle permanent settlements in exchange for full treaty peace and demilitarisation).',
      stems:
        'One major consequence was... • Specifically, under the terms of the 1979 Treaty of Washington, Israel had to... • Consequently, this forced the Israeli government to...',
    },
    // Right Page: Question 3 Source Utility [8 marks]
    rightExam: {
      type: 'utility_8',
      tariff: 'Question 3: Source Utility [8 marks • 12 mins]',
      stem: 'How useful are Sources A and B for an enquiry into the international and regional impact of the 1978 Camp David Accords? [8 marks]',
      sourceA: {
        letter: 'A',
        shelfmark: 'EGY-PRES-1978-09',
        tag: 'Official Egyptian Presidential Speech',
        title: 'President Anwar Sadat, Speech to the People’s Assembly, Cairo (October 1978)',
        quote:
          'We did not go to Camp David to seek a separate peace, nor did we abandon the Palestinian cause. We recovered every inch of Egyptian sacred soil in the Sinai without firing a single bullet, opening our canal and restoring our oil fields to our impoverished people. We secured for the Palestinians a framework for full autonomy and self-government within five years. Those who shout slogans from luxury hotels in Baghdad and Damascus have never shed one drop of blood for the liberation of our lands.',
      },
      sourceB: {
        letter: 'B',
        shelfmark: 'ARAB-LEAGUE-RES-1978-11',
        tag: 'Official Arab League Summit Communiqué',
        title: 'Final Declaration of the Ninth Arab League Summit, Baghdad, Iraq (5 November 1978)',
        quote:
          'The conference affirms that the Camp David agreements harm the rights of the Palestinian people and the Arab nation. By concluding a separate bilateral deal with the Zionist enemy, the Egyptian government has deviated from the unified Arab ranks and surrendered Arab sovereignty over Jerusalem and the West Bank. The summit decides to reject these accords, to sever all diplomatic ties with Cairo, to suspend Egypt’s membership in the Arab League, and to relocate the headquarters from Cairo to Tunis.',
      },
      structureStrip: [
        {
          col: '1. SOURCE A UTILITY & PROVENANCE',
          text: 'Analyse Source A’s content (recovering Sinai soil, Palestinian autonomy framework) and evaluate provenance: Sadat defending his deal to Egyptian MPs against accusations of Arab betrayal.',
        },
        {
          col: '2. SOURCE B UTILITY & PROVENANCE',
          text: 'Analyse Source B’s content (rejection of separate deal, suspension of Egypt, moving HQ to Tunis) and evaluate provenance: unanimous Arab League resolution showing profound diplomatic fury.',
        },
        {
          col: '3. COMPARATIVE VERDICT & KNOWLEDGE',
          text: "Compare how both sources together expose the core regional dilemma: Egyptian national territorial recovery vs pan-Arab condemnation leading directly to Sadat's 1981 assassination.",
        },
      ],
      connectives:
        'Source A is valuable for revealing... • The content is corroborated by historical evidence that Egypt regained... • However, its utility is shaped by its provenance, as Sadat needed to... • In contrast, Source B is useful for demonstrating... • This reflects the genuine Arab fury because... • Taken together, both sources are highly useful because they illustrate...',
      wordBank:
        'Camp David Accords (1978) • Jimmy Carter • Menachem Begin • Anwar Sadat • Treaty of Washington (1979) • Sinai recovery • Yamit evacuation (1982) • Baghdad Summit • Arab League suspension • Tunis HQ • October 1981 assassination',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.2). In Milestones 2 and 3, sketch the three-way handshake on the White House lawn and annotate the return of the Sinai Peninsula to Egypt.',
    },
  },

  {
    lessonIndex: 11,
    lessonNum: 3,
    id: 'lesson_13',
    inquiryQuestion:
      'Why did Israel invade Lebanon in 1982, and how did the Sabra and Shatila massacre transform Israeli politics?',
    subTitle:
      'Key Topic 3.3: The Palestinian Issue in Lebanon: Litani to Sabra-Shatila (1974–1985)',
    title: 'KT3.3: The Palestinian Issue in Lebanon (1974–1985)',
    specAnchor:
      'Arafat and the PLO: changing attitudes to diplomacy; rejectionist states; the PLO in Lebanon and "Fatahland"; the 1978 Coastal Road massacre and Operation Litani; UNIFIL and the South Lebanon Army; the 1982 Israeli invasion of Lebanon (Operation Peace for Galilee); the siege of West Beirut; the evacuation of the PLO to Tunis; the assassination of Bachir Gemayel and the Sabra and Shatila massacre (September 1982); the Kahan Commission and the resignation of Ariel Sharon.',
    doNow: [
      {
        q: 'In what year did Yasser Arafat deliver his famous "Olive Branch and Gun" speech at the United Nations?',
        a: '1974 (13 November)',
      },
      {
        q: 'What armed stronghold did the PLO establish in southern Lebanon following their expulsion from Jordan?',
        a: '"Fatahland"',
      },
      {
        q: 'What March 1978 terrorist attack on a civilian bus near Tel Aviv left 37 Israelis dead?',
        a: 'The Coastal Road Massacre',
      },
      {
        q: 'What was the code name of the March 1978 Israeli military invasion of southern Lebanon?',
        a: 'Operation Litani',
      },
      {
        q: 'What United Nations peacekeeping force was created by Resolution 425 to patrol southern Lebanon in 1978?',
        a: 'UNIFIL (UN Interim Force in Lebanon)',
      },
      {
        q: 'Which Israeli Defence Minister launched Operation Peace for Galilee on 6 June 1982?',
        a: 'Ariel Sharon',
      },
      {
        q: 'For how many weeks did the Israeli military besiege and bombard West Beirut in the summer of 1982?',
        a: 'Ten weeks',
      },
      {
        q: 'To which North African nation was Yasser Arafat and 14,000 PLO fighters evacuated in August 1982?',
        a: 'Tunisia (Tunis)',
      },
      {
        q: 'Which Lebanese Christian President-elect was assassinated on 14 September 1982?',
        a: 'Bachir Gemayel',
      },
      {
        q: 'What official Israeli judicial inquiry investigated the Sabra and Shatila massacre in 1982–83?',
        a: 'The Kahan Commission',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical distinction between <strong>Operation Litani (1978)</strong> and <strong>Operation Peace for Galilee (1982)</strong>. Why did Ariel Sharon expand a 40km buffer zone operation into a full 60-mile drive to besiege Beirut?',
    consequenceA: {
      question: 'Explain one consequence of Operation Litani in March 1978. [4 marks]',
      guidance:
        'Point (Established a permanent UN buffer zone and proxy security belt in southern Lebanon) • Fact (Over 25,000 IDF troops pushed PLO fighters north of the Litani River; UN passed Resolution 425 creating UNIFIL while Israel armed Major Haddad’s Christian South Lebanon Army) • Consequence (Failed to stop rocket fire and laid the groundwork for the wider 1982 invasion).',
      stems:
        'One major consequence was... • Specifically, during Operation Litani in March 1978, the IDF... • Consequently, this led directly to...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the Sabra and Shatila massacre (September 1982). [4 marks]',
      guidance:
        'Point (Triggered unprecedented domestic Israeli moral outrage and forced the resignation of Ariel Sharon) • Fact (400,000 Israelis rallied in Tel Aviv demanding accountability; the Kahan Commission ruled Sharon bore "personal responsibility" for permitting Phalangist militias into the refugee camps) • Consequence (Shattered Sharon’s military career temporarily and contributed to Menachem Begin’s resignation in 1983).',
      stems:
        'One major consequence was... • Specifically, following the slaughter of up to 2,000 civilians by Phalangist militias, the Israeli public... • Consequently, the Kahan Commission concluded that...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks • 12 mins]',
      stem: 'Write a narrative account analysing Israeli military involvement in Lebanon between 1978 and 1983. [8 marks]',
      stimulus: ['Operation Litani (1978)', 'The Sabra and Shatila massacre (1982)'],
      structureStrip: [
        {
          col: '1. PHASE 1: OPERATION LITANI (1978)',
          text: 'Explain the Coastal Road massacre, Begin launching Operation Litani to push PLO north of the river, and the creation of UNIFIL and the South Lebanon Army.',
        },
        {
          col: '2. PHASE 2: INVASION & SIEGE OF BEIRUT (1982)',
          text: 'Explain the Argov shooting pretext, Sharon launching Operation Peace for Galilee, driving 60 miles to Beirut, 10-week siege, and PLO evacuation to Tunis.',
        },
        {
          col: '3. PHASE 3: SABRA-SHATILA & FALLOUT (1982–83)',
          text: "Explain Bachir Gemayel's assassination, Phalangist massacre in refugee camps under IDF illumination flares, 400,000-strong Tel Aviv protest, and Kahan Commission findings.",
        },
      ],
      connectives:
        'Israeli military intervention began in March 1978 when... • In response to PLO cross-border rocket fire, Prime Minister Begin launched... • Tensions escalated into total war in June 1982 when Ariel Sharon... • Rather than halting at the 40km boundary, Israeli forces advanced directly to... • This culminated in tragedy following the assassination of Bachir Gemayel when... • Ultimately, the aftermath in Israel resulted in...',
      wordBank:
        'Operation Litani (1978) • Litani River • UNIFIL (Res 425) • South Lebanon Army • Ariel Sharon • Operation Peace for Galilee (1982) • Siege of Beirut • Philip Habib • PLO evacuation to Tunis • Bachir Gemayel • Sabra and Shatila • Kahan Commission',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.3). In Milestone 4, sketch the IDF tank columns entering Beirut and annotate the Kahan Commission finding of "personal responsibility" against Sharon.',
    },
  },

  {
    lessonIndex: 12,
    lessonNum: 4,
    id: 'lesson_14',
    inquiryQuestion:
      'Why did the First Intifada break out in December 1987, and how did changing superpower relations reshape Middle East diplomacy?',
    subTitle: 'Key Topic 3.4: The First Intifada & Changing Superpower Dynamics (1987–1992)',
    title: 'KT3.4: First Intifada & Superpower Shifts (1987–1992)',
    specAnchor:
      'The First Intifada (1987–93): causes, events and the Israeli response; the roles of the PLO and the founding of Hamas (1987); Arafat’s Geneva speech (1988); the collapse of the Soviet Union and Soviet Jewish immigration; US loan guarantees and West Bank settlement disputes; the 1990–91 Gulf War; the 1991 Madrid Peace Conference; the 1992 Israeli election of Yitzhak Rabin.',
    doNow: [
      {
        q: 'In what refugee camp in the Gaza Strip did the First Intifada ignite on 8 December 1987?',
        a: 'Jabalia refugee camp',
      },
      {
        q: 'What fatal traffic incident triggered mass protests and riots across Gaza on 8 December 1987?',
        a: 'An IDF tank transporter crashed into four Palestinian civilian cars, killing four workers',
      },
      {
        q: 'What is the literal Arabic meaning of the word "Intifada"?',
        a: '"Shaking off" (uprising)',
      },
      {
        q: 'What controversial security policy did Israeli Defence Minister Yitzhak Rabin announce to suppress the uprising?',
        a: 'The "Iron Fist" policy ("breaking the bones" of stone throwers)',
      },
      {
        q: 'Which Islamic militant group was founded in Gaza in December 1987 by Sheikh Ahmed Yassin?',
        a: 'Hamas (Islamic Resistance Movement)',
      },
      {
        q: 'In which Swiss city did Yasser Arafat address the UN in December 1988, officially renouncing terrorism?',
        a: 'Geneva',
      },
      {
        q: 'Approximately how many Soviet Jews immigrated to Israel between 1989 and 1992 following the USSR’s collapse?',
        a: 'Over 400,000 (roughly 10% of Israel’s population)',
      },
      {
        q: 'What amount of US loan guarantees did President George H.W. Bush withhold over West Bank settlement building?',
        a: '$10 billion',
      },
      {
        q: 'Which Iraqi dictator did Yasser Arafat publicly support during the 1990–91 Gulf War?',
        a: 'Saddam Hussein',
      },
      {
        q: 'Which historic international peace conference was convened jointly by the US and USSR in October 1991?',
        a: 'The Madrid Conference',
      },
    ],
    vocabPrompt:
      "Explain the fundamental ideological difference between the <strong>Palestine Liberation Organisation (PLO)</strong> and <strong>Hamas</strong> in the late 1980s. Why did the emergence of Hamas fundamentally challenge Yasser Arafat's diplomatic authority?",
    consequenceA: {
      question:
        'Explain one consequence of the outbreak of the First Intifada in December 1987. [4 marks]',
      guidance:
        'Point (Transformed international public opinion and proved that military occupation was unsustainable) • Fact (Images of teenage Palestinians throwing stones being beaten by heavily armed IDF soldiers under Rabin\'s "Iron Fist" policy broadcast on global TV) • Consequence (Shattered the Israeli assumption that the status quo could endure, forcing Israeli leaders to seek a political solution).',
      stems:
        'One major consequence was... • Specifically, following the Jabalia spark in December 1987, Palestinian youths... • Consequently, television footage of Israeli soldiers using the Iron Fist policy resulted in...',
    },
    consequenceB: {
      question:
        'Explain one consequence of Yasser Arafat supporting Saddam Hussein during the 1990–91 Gulf War. [4 marks]',
      guidance:
        'Point (Catastrophic diplomatic isolation and financial bankruptcy for the PLO) • Fact (Gulf monarchies expelled 300,000 Palestinian workers from Kuwait and cut off tens of millions in funding; Arab states severed diplomatic relations) • Consequence (Left Arafat desperate for international rehabilitation, forcing him to accept direct compromise with Israel).',
      stems:
        'One major consequence was... • Specifically, when Arafat backed Saddam Hussein’s invasion of Kuwait, Gulf states... • Consequently, this financial bankruptcy forced the PLO to...',
    },
    // Right Page: Question 3 Source Utility [8 marks]
    rightExam: {
      type: 'utility_8',
      tariff: 'Question 3: Source Utility [8 marks • 12 mins]',
      stem: 'How useful are Sources A and B for an enquiry into Palestinian political attitudes towards peace and armed struggle between 1987 and 1990? [8 marks]',
      sourceA: {
        letter: 'A',
        shelfmark: 'UN-GA-GENEVA-1988-12',
        tag: 'Official Address to UN General Assembly',
        title:
          'Yasser Arafat, Chairman of the PLO, Speech to the UN General Assembly in Geneva (13 December 1988)',
        quote:
          'The PLO completely and categorically renounces all forms of terrorism, including individual, group, and state terrorism. We accept United Nations Resolutions 242 and 338 as the basis for negotiations with Israel within an international peace conference. We desire peace, and we seek a state of Palestine living side by side with the State of Israel in peace, harmony, and security. We stretch out our hands to the leaders of Israel: let us build the peace of the brave.',
      },
      sourceB: {
        letter: 'B',
        shelfmark: 'HAMAS-COV-1988-08',
        tag: 'Official Charter of Hamas',
        title: 'The Covenant of the Islamic Resistance Movement (Hamas), Article 13 (August 1988)',
        quote:
          'There is no solution for the Palestinian problem except by Jihad. Initiatives, proposals, and international conferences are but a waste of time, an exercise in futility. The land of Palestine is an Islamic Waqf consecrated for Muslim generations until Judgement Day. Renouncing any part of Palestine means renouncing part of the religion; our nationalism is part of our religious faith. Peaceful conferences are an illusion that cannot return the rights of the dispossessed.',
      },
      structureStrip: [
        {
          col: '1. SOURCE A UTILITY & PROVENANCE',
          text: 'Analyse Source A’s content (renouncing terrorism, accepting Res 242, two-state vision) and evaluate provenance: Arafat pivoting to diplomacy in Geneva to open direct dialogue with Washington.',
        },
        {
          col: '2. SOURCE B UTILITY & PROVENANCE',
          text: 'Analyse Source B’s content (rejecting international conferences, sacred Waqf land, Jihad) and evaluate provenance: founding Hamas covenant emerging from the Intifada to challenge PLO secularism.',
        },
        {
          col: '3. COMPARATIVE VERDICT & SYNTHESIS',
          text: 'Assess how the sources together reveal the profound, irreconcilable split within Palestinian politics between secular diplomatic accommodation (PLO) and uncompromising Islamist resistance (Hamas).',
        },
      ],
      connectives:
        'Source A is valuable for understanding... • The content demonstrates that by December 1988, Arafat was willing to... • In terms of provenance, Arafat was addressing the UN in Geneva because... • On the other hand, Source B provides vital evidence of... • The charter reflects the ideology of Hamas, which arose during the Intifada to... • Together, both sources are highly useful because they capture the deep ideological fracture between...',
      wordBank:
        'First Intifada (1987) • Jabalia camp • Iron Fist policy • Yitzhak Rabin • PLO • Yasser Arafat • Geneva speech (1988) • UN Resolution 242 • Hamas Covenant (1988) • Sheikh Ahmed Yassin • Islamic Waqf • Gulf War bankruptcy',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.4). In Milestone 5, sketch the stone-throwing youth facing an Israeli tank and annotate Arafat’s 1988 Geneva renunciation of terrorism.',
    },
  },

  {
    lessonIndex: 13,
    lessonNum: 5,
    id: 'lesson_15',
    inquiryQuestion:
      'Why were the Oslo Accords signed in 1993, and why did the peace process collapse into violence by 1995?',
    subTitle: 'Key Topic 3.5: The Oslo Peace Accords, Areas A/B/C & The Road to 1995 (1992–1995)',
    title: 'KT3.5: The Oslo Accords & Rabin’s Assassination (1992–1995)',
    specAnchor:
      'The 1992 Israeli election and the Labour victory of Yitzhak Rabin; the secret Oslo negotiations in Norway (1993); the Letters of Mutual Recognition; the Oslo I Accord (Declaration of Principles, September 1993); the Cairo Agreement (Gaza-Jericho First, 1994); the 1994 Israel-Jordan Peace Treaty; the 1994 Nobel Peace Prize; extremist opposition on both sides: Hamas suicide bombings, the Hebron mosque massacre (1994); the Oslo II Interim Agreement (1995) partitioning the West Bank into Areas A, B, and C; the assassination of Yitzhak Rabin (4 November 1995).',
    doNow: [
      {
        q: 'Which Israeli Prime Minister was elected in June 1992 on a platform promising peace within nine months?',
        a: 'Yitzhak Rabin',
      },
      {
        q: 'In which European capital city did secret backchannel negotiations between Israeli and PLO delegates occur in 1993?',
        a: 'Oslo (Norway)',
      },
      {
        q: 'What historic diplomatic exchange in September 1993 saw Israel and the PLO officially recognize each other?',
        a: 'Letters of Mutual Recognition',
      },
      {
        q: 'On what date was the Oslo I Accord (Declaration of Principles) signed on the White House lawn?',
        a: '13 September 1993',
      },
      {
        q: 'Which US President facilitated the historic handshake between Yitzhak Rabin and Yasser Arafat in 1993?',
        a: 'Bill Clinton',
      },
      {
        q: 'Which two areas were transferred to Palestinian Authority control first under the May 1994 Cairo Agreement?',
        a: 'Gaza and Jericho ("Gaza-Jericho First")',
      },
      {
        q: 'Which Arab monarch signed a formal peace treaty with Israel in the Arava desert in October 1994?',
        a: 'King Hussein of Jordan',
      },
      {
        q: 'What American-Israeli extremist murdered 29 Palestinian worshippers at the Cave of the Patriarchs in Hebron in February 1994?',
        a: 'Baruch Goldstein',
      },
      {
        q: 'What September 1995 agreement divided the West Bank into three administrative zones: Area A, Area B, and Area C?',
        a: 'Oslo II (The Taba / Washington Agreement)',
      },
      {
        q: 'On what date was Israeli Prime Minister Yitzhak Rabin assassinated at a peace rally in Tel Aviv by Yigal Amir?',
        a: '4 November 1995',
      },
    ],
    vocabPrompt:
      'Explain the crucial administrative difference between <strong>Area A</strong>, <strong>Area B</strong>, and <strong>Area C</strong> under the Oslo II Agreement (1995). Why did this complex partition create an "archipelago" of isolated Palestinian enclaves surrounded by Israeli checkpoints and settlements?',
    consequenceA: {
      question:
        'Explain one consequence of the secret Oslo back-channel negotiations in 1993. [4 marks]',
      guidance:
        "Point (Produced the historic breakthrough of mutual recognition between Israel and the PLO) • Fact (Rabin officially recognized the PLO as the representative of the Palestinian people; Arafat recognized Israel's right to exist in peace and renounced terrorism) • Consequence (Ended decades of non-recognition, leading directly to the signing of Oslo I on the White House lawn).",
      stems:
        'One major consequence was... • Specifically, the secret talks in Norway resulted in Letters of Mutual Recognition where... • Consequently, this breakthrough paved the way for...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the assassination of Yitzhak Rabin on 4 November 1995. [4 marks]',
      guidance:
        'Point (Derailment of the peace process and the election of a right-wing Likud government opposed to Oslo) • Fact (Right-wing Jewish extremist Yigal Amir shot Rabin at a Tel Aviv peace rally; subsequent Hamas bus bombings eroded public confidence in peace) • Consequence (Led directly to the narrow election of Benjamin Netanyahu in May 1996, who halted further territorial handovers).',
      stems:
        'One major consequence was... • Specifically, following Rabin’s murder by Yigal Amir at a peace rally... • Consequently, this traumatic loss resulted in...',
    },
    // Right Page: Question 2 Analytical Narrative [8 marks]
    rightExam: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks • 12 mins]',
      stem: 'Write a narrative account analysing the peace process between Israel and the Palestinians from 1992 to the assassination of Yitzhak Rabin in 1995. [8 marks]',
      stimulus: ['The Oslo I Accords (1993)', 'Extremist opposition to the peace process'],
      structureStrip: [
        {
          col: '1. PHASE 1: THE OSLO BREAKTHROUGH (1992–93)',
          text: 'Explain the 1992 election of Rabin, secret Norway talks, Letters of Mutual Recognition, and the 13 September 1993 White House signing of Oslo I.',
        },
        {
          col: '2. PHASE 2: IMPLEMENTATION & EXTENSION (1994)',
          text: 'Explain Cairo Agreement (Gaza-Jericho), Arafat’s return to Palestine, Jordan-Israel Peace Treaty (Oct 1994), and the Nobel Peace Prize.',
        },
        {
          col: '3. PHASE 3: EXTREMISM & TRAGEDY (1994–95)',
          text: 'Explain Hebron massacre (Goldstein), Hamas suicide bombings, Oslo II partition into Areas A/B/C, and the 4 Nov 1995 assassination of Rabin by Yigal Amir.',
        },
      ],
      connectives:
        'The peace process was revived in 1992 when Yitzhak Rabin was elected on a pledge to... • In complete secrecy, Israeli and Palestinian negotiators met in Norway, leading to... • This culminated on 13 September 1993 when Rabin and Arafat signed... • Over the following year, progress continued as the Cairo Agreement enabled... • However, violent extremism emerged from both sides when... • Ultimately, the peace momentum was shattered on 4 November 1995 when...',
      wordBank:
        'Yitzhak Rabin • Shimon Peres • Yasser Arafat • Bill Clinton • Oslo I Accord (1993) • Letters of Mutual Recognition • Gaza-Jericho First • Jordan Treaty (1994) • Baruch Goldstein (Hebron 1994) • Hamas suicide bombings • Oslo II (1995: Areas A, B, C) • Yigal Amir (4 Nov 1995)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.5). In Milestone 6, sketch the map division of Areas A, B, and C and annotate the memorial flame for Yitzhak Rabin in Kings of Israel Square.',
    },
  },
];

// ============================================================================
// MAIN GENERATOR FUNCTION: 16-PAGE TWO-PAGE SPREAD WORKBOOK FOR CME KT3
// ============================================================================
function buildCmeKt3TwoPageWorkbook(unitData, period) {
  const lessons = unitData.lessons;

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 3: Attempts at a Solution, 1974–1995 Workbook</title>
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

  // Cover image: Oslo I handshake
  const coverImgPath = path.resolve('public/units/cme_new/assets/kt3_cover.png');
  let coverImgSrc = '/units/cme_new/assets/kt3_cover.png';
  if (fs.existsSync(coverImgPath)) {
    const coverImgBase64 = fs.readFileSync(coverImgPath).toString('base64');
    coverImgSrc = `data:image/png;base64,${coverImgBase64}`;
  }

  // Map images for Page 14
  const osloMapPath = path.resolve('public/units/cme_new/assets/cme_west_bank_oslo_areas.png');
  let osloMapSrc = '/units/cme_new/assets/cme_west_bank_oslo_areas.png';
  if (fs.existsSync(osloMapPath)) {
    const b64 = fs.readFileSync(osloMapPath).toString('base64');
    osloMapSrc = `data:image/png;base64,${b64}`;
  }

  const lebanonMapPath = path.resolve(
    'public/units/cme_new/assets/cme_lebanon_1982_campaign_map.png',
  );
  let lebanonMapSrc = '/units/cme_new/assets/cme_lebanon_1982_campaign_map.png';
  if (fs.existsSync(lebanonMapPath)) {
    const b64 = fs.readFileSync(lebanonMapPath).toString('base64');
    lebanonMapSrc = `data:image/png;base64,${b64}`;
  }

  // ====================================================================
  // PAGE 1: OUTSIDE FRONT COVER (Master Architectural Cover)
  // ====================================================================
  html += renderStandardFrontCover({
    unitId: 'cme_new',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY • PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
    specCode: 'SPECIFICATION 1HI0/2B',
    keyTopicNum: 3,
    dateRange: '1974–1995',
    title: 'Attempts at a Solution, 1974–1995',
    subtitle: 'Camp David Accords, The Lebanon War, First Intifada & The Oslo Peace Process',
    heroImage: {
      src: coverImgSrc,
      alt: 'The Oslo I Accord Handshake on the White House Lawn',
      objectPosition: 'center 40%',
      shelfmark: 'WHPO-C5679-14A',
      date: '13 September 1993',
      title: 'The Oslo I Accord Handshake on the White House Lawn',
      caption:
        'Vince Musi (White House Photographic Office) • Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shake hands on the South Lawn of the White House following the signing of the Oslo I Declaration of Principles, witnessed by US President Bill Clinton. Accession Shelfmark WHPO-C5679-14A.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 120,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. Diplomatic Negotiations, 1974–79',
          items: [
            'Oil crisis & US/USSR roles: Kissinger’s shuttle diplomacy',
            'Sadat’s visit to Israel (1977) & Knesset speech; Begin’s visit to Egypt',
            'Camp David Accords (1978) & Treaty of Washington (1979)',
            'Evacuation of Yamit, Arab League boycott, Sadat assassinated (1981)',
          ],
        },
        {
          title: '2. The Palestinian Issue, 1974–93',
          items: [
            'Arafat and PLO diplomacy; Rejectionist states; "Fatahland"',
            'Operation Litani (1978); 1982 Lebanon invasion & siege of Beirut',
            'Sabra & Shatila massacre, Kahan Commission & Sharon resignation',
            'First Intifada (1987–93): causes, events, Iron Fist policy, rise of Hamas',
          ],
        },
        {
          title: '3. Attempts at a Solution, 1988–95',
          items: [
            'Arafat renounces terrorism (1988); Soviet collapse & loan guarantees',
            'Gulf War (1990–91) & Madrid (1991); 1992 election of Yitzhak Rabin',
            'Oslo Accords (1993) & 1994 Israel-Jordan Peace Treaty',
            'Extremist opposition; Hebron massacre (1994); Oslo II (1995: Areas A/B/C); Rabin assassinated',
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
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3) -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: The Road to Peace with Egypt (1974–1982)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1: NOV 1977 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                19 NOV 1977 &bull; Sadat’s Historic Flight to Jerusalem &amp; Knesset Speech
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Following years of Kissinger’s shuttle diplomacy, Anwar Sadat breaks thirty years of Arab taboos by landing at Ben Gurion Airport and addressing the Israeli Knesset: <em>"No more war, no more bloodshed."</em> He offers permanent peace and recognition in exchange for Israeli withdrawal from 1967 lands.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2: SEPT 1978 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                17 SEPT 1978 &bull; The Camp David Accords (Carter, Sadat &amp; Begin)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              President Jimmy Carter secludes Begin and Sadat at Camp David for 13 days of intense negotiation. They sign two frameworks: a vague five-year path for Palestinian self-government, and concrete terms for a bilateral peace treaty returning the entire Sinai to Egypt.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3: 1979–1982 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                MARCH 1979 &ndash; APRIL 1982 &bull; Treaty of Washington &amp; Sinai Return
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Begin and Sadat sign the Treaty of Washington, securing mutual diplomatic recognition, demilitarisation, and open navigation through Suez. Arab states sever ties and expel Egypt. In April 1982, Israel demolishes the settlement of Yamit and returns all Sinai territory to Egypt. Sadat is assassinated in Oct 1981.
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
            Living Timeline &bull; Part 2: Resistance, The Intifada &amp; The Oslo Peace Process (1982–1995)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 4: JUNE–SEPT 1982 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                JUNE–SEPT 1982 &bull; Operation Peace for Galilee &amp; Sabra-Shatila
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Ariel Sharon launches an invasion of Lebanon, driving 60 miles north to besiege West Beirut. After a 10-week siege, Arafat and 14,000 PLO fighters evacuate to Tunis. In September, Christian Phalangists slaughter up to 2,000 Palestinians in Sabra and Shatila. The Kahan Commission forces Sharon’s resignation.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 5: DEC 1987 &ndash; 1988 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                DEC 1987 &ndash; DEC 1988 &bull; The First Intifada &amp; Arafat’s Geneva Speech
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              A road accident in Jabalia camp triggers the First Intifada: stone throwing, commercial strikes, and barricades across Gaza and the West Bank. Rabin deploys the "Iron Fist" policy. Hamas is founded in 1987. In Geneva (Dec 1988), Arafat formally renounces terrorism and recognizes Israel, opening dialogue with the US.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6: SEPT 1993 &ndash; NOV 1995 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                SEPT 1993 &ndash; NOV 1995 &bull; The Oslo Accords, Oslo II &amp; Rabin’s Assassination
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 3.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Secret talks in Norway produce Letters of Mutual Recognition and Oslo I on the White House lawn. Oslo II (1995) divides the West Bank into Areas A, B, and C. Violent opposition erupts from Hamas suicide bombers and Jewish extremists. On 4 November 1995, Prime Minister Yitzhak Rabin is assassinated at a Tel Aviv peace rally.
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
  // PAGES 4–13: 5 ENQUIRY LESSON DOUBLE-PAGE SPREADS
  // ====================================================================
  kt3Configs.forEach((cfg, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = leftPageNum + 1;

    // LEFT PAGE (VERSO): Spec Anchor, Do Now, Vocab Check, 2x Q1 Consequence (4 Marks Each)
    html += `
  <!-- PAGE ${leftPageNum}: ENQUIRY LESSON ${cfg.lessonNum} (PART 1) -->
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Title Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            Key Topic 3.${cfg.lessonNum}
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.4pt; font-style: italic; color: #111; margin-top: 1px;">
          Enquiry: ${cfg.inquiryQuestion}
        </div>
      </div>

      <!-- Specification Anchor Strip -->
      <div style="border: 1px solid #000000; background: #fafafa; padding: 3px 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; margin-bottom: 3px;">
        <strong style="text-transform: uppercase;">Pearson Specification Anchor:</strong> ${cfg.specAnchor}
      </div>

      <!-- Retrieval Practice Do Now (10 Recall Questions) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase;">
            1. Retrieval Practice &bull; Historical Recall (Do Now)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Score: &nbsp;&nbsp;&nbsp;&nbsp;/10</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 10px; font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.2;">
          ${cfg.doNow
            .map(
              (item, qIdx) => `
            <div>
              <strong>${qIdx + 1}.</strong> ${item.q}
              <div style="border-bottom: 1px dotted #000000; height: 3.8mm; margin-top: 0.5px;"></div>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Disciplinary Vocabulary Check -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          2. Disciplinary Vocabulary &bull; Historical Rigour
        </strong>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; margin: 0 0 2px 0; line-height: 1.2;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice 1: Q1 Consequence A (4 Marks) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">
            3. Exam Practice &bull; ${cfg.consequenceA.question}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">[4 Marks &bull; 4 Mins]</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #222; margin-bottom: 1px;">
          <strong>Model Structure (P-F-C):</strong> ${cfg.consequenceA.guidance}
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.2pt; font-style: italic; color: #333; margin-bottom: 2px;">
          <strong>Sentence Starters:</strong> ${cfg.consequenceA.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice 2: Q1 Consequence B (4 Marks) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">
              4. Exam Practice &bull; ${cfg.consequenceB.question}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">[4 Marks &bull; 4 Mins]</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #222; margin-bottom: 1px;">
            <strong>Model Structure (P-F-C):</strong> ${cfg.consequenceB.guidance}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.2pt; font-style: italic; color: #333; margin-bottom: 2px;">
            <strong>Sentence Starters:</strong> ${cfg.consequenceB.stems}
          </div>
        </div>
        <div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      ${renderFooterStrip(leftPageNum, approvedFunnyFooters[leftPageNum - 1], 16)}
    </div>
  </div>
  `;

    // RIGHT PAGE (RECTO): Question 2 Analytical Narrative [8 marks] OR Question 3 Source Utility [8 marks]
    const isNarrative = cfg.rightExam.type === 'narrative_8';

    html += `
  <!-- PAGE ${rightPageNum}: ENQUIRY LESSON ${cfg.lessonNum} (PART 2) -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">

      <!-- Top Title Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            ${isNarrative ? 'Question 2: Narrative Account' : 'Question 3: Source Utility'} &bull; Key Topic 3.${cfg.lessonNum}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 7px; border-radius: 2px;">
            ${cfg.rightExam.tariff}
          </span>
        </div>
      </div>

      <!-- Question Stem Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #fafafa; margin-bottom: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin-bottom: 2px;">
          ${cfg.rightExam.stem}
        </div>
        ${
          isNarrative
            ? `
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222;">
          <strong>You may use the following in your answer:</strong> &bull; ${cfg.rightExam.stimulus.join(' &bull; ')} <em>(You must also use information of your own.)</em>
        </div>`
            : ''
        }
      </div>

      ${
        !isNarrative
          ? `
      <!-- 2 Primary Archival Sources Box for Question 3 Utility -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
        <!-- Source A -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase;">Source ${cfg.rightExam.sourceA.letter} (${cfg.rightExam.sourceA.tag})</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6pt; border: 1px solid #000; padding: 0 3px;">${cfg.rightExam.sourceA.shelfmark}</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #111; margin-bottom: 2px;">
            ${cfg.rightExam.sourceA.title}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; font-style: italic; line-height: 1.2; color: #111;">
            "${cfg.rightExam.sourceA.quote}"
          </div>
        </div>

        <!-- Source B -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase;">Source ${cfg.rightExam.sourceB.letter} (${cfg.rightExam.sourceB.tag})</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6pt; border: 1px solid #000; padding: 0 3px;">${cfg.rightExam.sourceB.shelfmark}</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #111; margin-bottom: 2px;">
            ${cfg.rightExam.sourceB.title}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; font-style: italic; line-height: 1.2; color: #111;">
            "${cfg.rightExam.sourceB.quote}"
          </div>
        </div>
      </div>`
          : ''
      }

      <!-- Structure Strip (3 Analytical Phases) -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <div style="background: #000000; color: #ffffff; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Structure Strip &bull; 3 Analytical Phases (Grade 9 Architecture)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.2;">
          ${cfg.rightExam.structureStrip
            .map(
              (strip, sIdx) => `
            <div style="padding: 3px 5px; ${sIdx < 2 ? 'border-right: 1px solid #000000;' : ''} background: ${sIdx % 2 === 0 ? '#ffffff' : '#fafafa'};">
              <strong style="text-transform: uppercase; display: block; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 1px;">
                ${strip.col}
              </strong>
              ${strip.text}
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Causal Connectives & Transition Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; border-radius: 3px; background: #fafafa; font-family: 'Georgia', serif; font-size: 6.2pt; font-style: italic; line-height: 1.2; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-style: normal; text-transform: uppercase; font-size: 6pt;">Analytical Stems:</strong>
        ${cfg.rightExam.connectives}
      </div>

      <!-- High-Yield Proper Noun Word Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; border-radius: 3px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.2; margin-bottom: 4px;">
        <strong style="text-transform: uppercase; font-size: 6pt;">High-Yield Word Bank (Minimum 4 Per Paragraph):</strong> ${cfg.rightExam.wordBank}
      </div>

      <!-- Student Response Ruled Lines (Full Page Budget Fill) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2px;">
        ${Array(isNarrative ? 14 : 11)
          .fill('<div class="task-line"></div>')
          .join('')}
      </div>

      <!-- Timeline Integration Mission -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; background: #fafafa; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.2;">
        <strong>Timeline Mission:</strong> ${cfg.rightExam.timelineMission}
      </div>

      ${renderFooterStrip(rightPageNum, approvedFunnyFooters[rightPageNum - 1], 16)}
    </div>
  </div>
  `;
  });

  // ====================================================================
  // PAGE 14: CARTOGRAPHIC MASTERCLASS & TERRITORIAL REFERENCE
  // ====================================================================
  html += `
  <!-- PAGE 14: CARTOGRAPHIC MASTERCLASS & TERRITORIAL PARTITION REFERENCE -->
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Title Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Key Topic 3 Cartographic Masterclass &bull; Territorial Partition (1974–1995)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px;">
            Geographical Disciplinary Evidence
          </span>
        </div>
      </div>

      <!-- Two Authentic Historical Maps Side by Side -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px; flex: 1;">
        
        <!-- Map 1: Oslo II West Bank Partition -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">
                1. The Oslo II Accord (1995): Areas A, B &amp; C
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6pt; border: 1px solid #000; padding: 0 3px;">MAP ARCHIVE</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 6.8pt; margin: 0 0 4px 0; line-height: 1.2;">
              The 1995 Interim Agreement partitioned the West Bank into three distinct jurisdictions, creating a fragmented archipelago of Palestinian enclaves:
            </p>
          </div>
          
          <div style="text-align: center; margin: 2px 0;">
            <img src="${osloMapSrc}" style="max-height: 115mm; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 2px; display: block; margin: 0 auto;" alt="Oslo II Areas Map">
          </div>

          <!-- Key Data Statistics Box -->
          <div style="border: 1px solid #000000; background: #fafafa; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.22;">
            <div>&bull; <strong>Area A (~18% of land, 55% of Palestinians):</strong> Full Palestinian Authority civil &amp; security control (Jenin, Nablus, Ramallah, Bethlehem, Jericho).</div>
            <div>&bull; <strong>Area B (~22% of land, 41% of Palestinians):</strong> Palestinian civil control; joint Israeli security control.</div>
            <div>&bull; <strong>Area C (~60% of land, 4% of Palestinians):</strong> Exclusive Israeli civil &amp; military control, containing all Israeli settlements, roads, and the Jordan Valley.</div>
          </div>
        </div>

        <!-- Map 2: Southern Lebanon & Operation Litani / 1982 War -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">
                2. Southern Lebanon &bull; Litani to Beirut (1978–82)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6pt; border: 1px solid #000; padding: 0 3px;">IDF ARCHIVE</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 6.8pt; margin: 0 0 4px 0; line-height: 1.2;">
              The strategic frontline of the PLO-Israeli conflict in Lebanon: from the 1978 Litani River buffer zone to the 1982 encirclement of West Beirut:
            </p>
          </div>

          <div style="text-align: center; margin: 2px 0;">
            <img src="${lebanonMapSrc}" style="max-height: 115mm; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 2px; display: block; margin: 0 auto;" alt="Lebanon Campaign Map">
          </div>

          <!-- Strategic Key Data Box -->
          <div style="border: 1px solid #000000; background: #fafafa; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.22;">
            <div>&bull; <strong>Operation Litani (1978):</strong> 25,000 IDF troops pushed PLO north of the Litani River; UNIFIL created under Res 425; South Lebanon Army proxy established.</div>
            <div>&bull; <strong>Operation Peace for Galilee (1982):</strong> Advanced 60 miles beyond the 40km cabinet limit to encircle Beirut; 10-week siege evacuated 14,000 PLO fighters to Tunis.</div>
            <div>&bull; <strong>Sabra &amp; Shatila (Sept 1982):</strong> Phalangist militia massacres in refugee camps; 400,000 march in Tel Aviv forcing Sharon’s resignation.</div>
          </div>
        </div>

      </div>

      <!-- Cartographic Disciplinary Synthesis Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 6px; background: #fafafa; margin-bottom: 2px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
          Cartographic Disciplinary Insight: Why Did Geography Undermine the Peace Process?
        </strong>
        <p style="font-family: 'Georgia', serif; font-size: 6.8pt; margin: 0; line-height: 1.22;">
          Geographical reality was the decisive barrier to lasting peace. Under Oslo II, Area A consisted of 227 separate islands of Palestinian autonomy entirely surrounded by Area C. Israeli bypass roads, military checkpoints, and expanding settlements fragmented the West Bank into disconnected cantons, making a viable sovereign Palestinian state physically impossible without extensive Israeli territorial concessions that right-wing nationalists refused to concede.
        </p>
      </div>

      ${renderFooterStrip(14, approvedFunnyFooters[13], 16)}
    </div>
  </div>
  `;

  // ====================================================================
  // PAGE 15: EXAM MASTERCLASS & SYNOPTIC THEMATIC SYNTHESIS
  // ====================================================================
  html += `
  <!-- PAGE 15: EXAM MASTERCLASS & SYNOPTIC THEMATIC SYNTHESIS -->
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Title Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Key Topic 3 Exam Masterclass &bull; Synoptic Synthesis (1974–1995)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px;">
            Grade 9 Disciplinary Toolkit
          </span>
        </div>
      </div>

      <!-- Section 1: Official Pearson Edexcel 8-Mark Level Descriptors -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px;">
        <div style="background: #000000; color: #ffffff; padding: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; display: flex; justify-content: space-between;">
          <span>1. Official Pearson Edexcel 8-Mark Level Descriptors &amp; Grade 9 Criteria</span>
          <span>Narrative &amp; Utility</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.2;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 1px solid #000;">
              <th style="padding: 2px 6px; text-align: center; width: 65px; border-right: 1px solid #000;">Level</th>
              <th style="padding: 2px 8px; text-align: left; border-right: 1px solid #000;">Official Pearson Standard</th>
              <th style="padding: 2px 8px; text-align: left; width: 230px;">Actionable Pupil Guidance (How to Secure It)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000; background: #fff;">
              <td style="padding: 2px 6px; text-align: center; font-weight: 900; font-size: 7.2pt; border-right: 1px solid #000;">
                Level 4<br><span style="font-size: 8pt;">7–8m</span>
              </td>
              <td style="padding: 2px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                Analytical explanation consistently directed to the question. Shows comprehensive, accurate knowledge. Sustained line of reasoning with explicit causal links.
              </td>
              <td style="padding: 2px 8px; font-weight: 600;">
                &bull; Never say <em>'and then'</em>; explain <strong>HOW</strong> event A forced event B.<br>
                &bull; Integrate at least 4 precise proper nouns/statistics per paragraph.<br>
                &bull; Conclude each phase with an analytical verdict directly addressing the stem.
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000; background: #fafafa;">
              <td style="padding: 2px 6px; text-align: center; font-weight: 800; font-size: 7.2pt; border-right: 1px solid #000;">
                Level 3<br><span style="font-size: 8pt;">5–6m</span>
              </td>
              <td style="padding: 2px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                Accurate knowledge demonstrated with some causal structure, but sections lapse into chronological narrative without evaluating consequences.
              </td>
              <td style="padding: 2px 8px;">
                &bull; Accurate chronology but descriptive narrative rather than analytical explanation.<br>
                &bull; Weak transition connectives between phases.
              </td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 2px 6px; text-align: center; font-weight: 800; font-size: 7.2pt; border-right: 1px solid #000;">
                Level 1–2<br><span style="font-size: 8pt;">1–4m</span>
              </td>
              <td style="padding: 2px 8px; border-right: 1px solid #000; font-family: 'Georgia', serif;">
                Simple, general statements or descriptive retell with limited factual detail and weak links.
              </td>
              <td style="padding: 2px 8px;">
                &bull; Needs specific proper nouns, dates, and clear causal connectives.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 2: Synoptic Question: Why Was Peace So Difficult to Achieve? -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 8px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">
            2. Synoptic Disciplinary Essay Plan: Why Was Peace So Difficult to Achieve (1974–1995)?
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
            THE BIG ENQUIRY
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.2pt; margin-bottom: 2px;">
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>1. UNRESOLVED FINAL STATUS:</strong> Oslo postponed the four hardest issues: Jerusalem, 1948 refugees\' right of return, borders, and Jewish settlements.
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>2. EXTREMIST SABOTAGE:</strong> Hamas suicide bombings (1994–95) and Jewish extremist terrorism (Goldstein in Hebron, Amir assassinating Rabin).
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fafafa;">
            <strong>3. ASYMMETRY OF POWER:</strong> Israel maintained military control over 60% of West Bank (Area C), while Palestinian Authority lacked territorial contiguity.
          </div>
        </div>
        <div style="border-left: 2px solid #000; padding-left: 5px; font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.2; color: #111;">
          <strong>Grade 9 Conclusion Model:</strong> <em>Peace proved elusive not because leaders lacked diplomatic skill, but because the Oslo Accords created a paradox: by deferring the existential questions of Jerusalem and settlements to future talks, both sides allowed violent rejectionists—Hamas suicide bombers on one side and militant settlers on the other—to hijack the political agenda, culminating in the tragic assassination of Yitzhak Rabin on 4 November 1995.</em>
        </div>
      </div>

      <!-- Section 3: High-Yield Analytical Connective & Sentence Starter Matrix -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px;">
        <div style="background: #000000; color: #ffffff; padding: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
          <span>3. Grade 9 Analytical Connective &amp; Transition Bank</span>
          <span>Elevate Your Writing</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.22;">
          <div style="padding: 2px 5px; border-right: 1px solid #000; background: #fff;">
            <strong style="text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Causal Chain Stems:</strong>
            <span style="font-family: 'Georgia', serif; font-style: italic;">
              &bull; "The underlying catalyst was..."<br>
              &bull; "This directly precipitated..."<br>
              &bull; "Consequently, this forced Begin to..."<br>
              &bull; "As an inevitable repercussion..."
            </span>
          </div>
          <div style="padding: 2px 5px; border-right: 1px solid #000; background: #fafafa;">
            <strong style="text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Narrative Progression:</strong>
            <span style="font-family: 'Georgia', serif; font-style: italic;">
              &bull; "The diplomatic deadlock broke when..."<br>
              &bull; "Tensions intensified when..."<br>
              &bull; "This secret breakthrough enabled..."<br>
              &bull; "The situation culminated in..."
            </span>
          </div>
          <div style="padding: 2px 5px; background: #fff;">
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
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 8px; background: #fafafa;">
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
          <div>&bull; &#9633; For utility questions: Did I evaluate provenance (nature, origin, purpose) and content?</div>
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
    keyTopicNum: 3,
    trackerTitle: 'Student Assessment Record • Key Topic 3 Tracker',
    trackerSubtitle:
      'Paper 2: Conflict in the Middle East, 1945–1995 • Attempts at a Solution (1974–1995)',
    enquiries: [
      {
        num: 1,
        code: 'KT3.1',
        title: 'Shuttle Diplomacy & Sadat in Jerusalem',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 2,
        code: 'KT3.2',
        title: 'Camp David & Treaty of Washington',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 3,
        code: 'KT3.3',
        title: 'Lebanon, Litani & Sabra-Shatila',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 4,
        code: 'KT3.4',
        title: 'First Intifada & Superpower Shifts',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 5,
        code: 'KT3.5',
        title: 'Oslo Accords, Oslo II & Rabin Death',
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
        label: 'KT 3.1: Shuttle Diplomacy',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=9`,
      },
      {
        label: 'KT 3.2: Camp David',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=10`,
      },
      {
        label: 'KT 3.3: Lebanon & Sabra',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=11`,
      },
      {
        label: 'KT 3.4: First Intifada',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=12`,
      },
      {
        label: 'KT 3.5: Oslo Accords',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=13`,
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

module.exports = { buildCmeKt3TwoPageWorkbook };
