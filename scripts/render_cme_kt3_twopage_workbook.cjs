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

// Approved Witty Revision Quips for CME Key Topic 3 (28 Pages)
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 3 • The History Department', // Page 1
  "\"'Shuttle diplomacy' wasn't a holiday: Kissinger lived on a Boeing 707 so you could write this essay.\"", // Page 2
  '"Carter spent 13 days in a Maryland cabin without leaving: you only need 45 minutes for Paper 2."', // Page 3
  '"Sadat said \'No more war\': make sure your consequence question has no more blank lines."', // Page 4
  '"Yamit was dismantled house by house: build your narrative paragraph by paragraph."', // Page 5
  '"Notes are the fuel of memory: write with precision, proper nouns, and chronological clarity."', // Page 6
  '"Level 4 examiners look for sustained analysis: explain HOW each event triggered the next."', // Page 7
  '"Arafat brought an olive branch and a gun in 1974: bring your blue pen and specific dates."', // Page 8
  '"Operation Litani pushed 25 miles north: push your historical explanation beyond a simple description."', // Page 9
  '"Disciplinary writing requires evidence: name the treaties, dates, and key political leaders."', // Page 10
  '"Structure creates clarity: Point, Evidence, Explanation, and Causal Impact."', // Page 11
  '"400,000 Israelis marched in Tel Aviv: evidence and statistics turn a Grade 5 into a Grade 9."', // Page 12
  '"The Kahan Commission didn\'t accept vague excuses; neither will your Pearson GCSE examiner."', // Page 13
  '"Precision separates good from great: cite specific UN resolutions and casualty figures."', // Page 14
  '"Sustained argument wins the highest band: keep your answer tightly focused on the stem."', // Page 15
  '"The Intifada began with stones, but examiners award marks for precise political causes."', // Page 16
  '"Don\'t confuse the PLO with Hamas: secular nationalism vs Islamic covenant is vital detail."', // Page 17
  '"Clear handwriting and rigorous terminology are the hallmarks of historical scholarship."', // Page 18
  '"A conclusion is not a summary: provide a substantiated historical verdict on the turning point."', // Page 19
  '"Arafat backed Saddam in 1990 and lost his Gulf funding: evaluate that diplomatic disaster."', // Page 20
  '"Secret talks in a Norwegian farmhouse: Oslo was born in silence, not on social media."', // Page 21
  '"Deep historical knowledge turns complex geopolitics into structured, lucid prose."', // Page 22
  '"Independent practice builds exam stamina: timing is everything on Edexcel Paper 2."', // Page 23
  '"Oslo II carved the West Bank into Areas A, B, and C: know your jurisdictions and percentages!"', // Page 24
  '"Rabin paid with his life on 4 November 1995: explain how extremism derailed the peace process."', // Page 25
  '"Synoptic mastery: evaluate the interplay between diplomacy, territorial disputes, and ideology."', // Page 26
  '"Final timed assessment: deploy every proper noun and analytical connective with total command."', // Page 27
  'Key Topic 3 Mastery Complete • Conflict in the Middle East GCSE Certification Hub', // Page 28
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
    specAnchor: `The <strong>oil crisis and superpower involvement</strong>; the <strong>roles of the USA (Kissinger’s shuttle diplomacy) and the USSR</strong>; the <strong>1974–75 disengagement accords (Sinai I and II)</strong>; the <strong>reopening of the Suez Canal</strong>; the <strong>May 1977 Israeli election of Menachem Begin (Likud)</strong>; and <strong>Sadat’s historic visit to Jerusalem (Nov 1977) and address to the Knesset</strong>.`,
    stages: [
      {
        step: 1,
        keywords: [
          'OPEC crude oil embargo against US',
          'World oil prices quadruple',
          'Western petrol rationing & queues',
          'Middle East stability vital for US economy',
          'USSR displaced as primary peace broker',
        ],
        clue: 'Why did the OPEC oil shock force the US to prioritize Middle East diplomacy?',
        date: 'Oct 1973',
        title: 'The Arab Oil Shock & Superpower Realignment',
      },
      {
        step: 2,
        keywords: [
          'US Sec of State Henry Kissinger',
          'Shuttle diplomacy between Cairo & Tel Aviv',
          'Sinai Disengagement Accord I signed',
          'UN buffer zone created along canal',
          'Suez Canal cleared & reopened (1975)',
        ],
        clue: 'How did Kissinger’s step-by-step shuttle diplomacy separate the frontline armies?',
        date: 'Jan 1974',
        title: 'Kissinger’s Shuttle Diplomacy & Sinai I',
      },
      {
        step: 3,
        keywords: [
          'Sinai II bilateral agreement signed',
          'Israel withdraws further into Sinai desert',
          'Abu Rudeis oilfields returned to Egypt',
          'Formal pledge to renounce military force',
          'Egypt begins detachment from Arab war coalition',
        ],
        clue: "Why was the return of the Abu Rudeis oilfields so vital for Egypt's economy?",
        date: 'Sept 1975',
        title: 'The Sinai II Agreement',
      },
      {
        step: 4,
        keywords: [
          'Menachem Begin (Likud leader) elected',
          'Ends 29 years of unbroken Labour rule',
          'Revisionist Zionist ideology',
          'West Bank claimed as Judea and Samaria',
          'Fears of renewed Middle East war',
        ],
        clue: 'Why did Menachem Begin’s 1977 election make a peace agreement seem impossible?',
        date: 'May 1977',
        title: 'Likud Election Victory (Menachem Begin)',
      },
      {
        step: 5,
        keywords: [
          'Anwar Sadat lands at Ben-Gurion Airport',
          'Historic address to the Israeli Knesset',
          '"No more war, no more bloodshed"',
          'Shatters 30 years of Arab diplomatic taboos',
          'Paves direct way to Camp David Summit',
        ],
        clue: 'Why was Sadat’s speech to the Israeli Knesset such a profound psychological breakthrough?',
        date: '19–21 Nov 1977',
        title: 'Sadat’s Historic Journey to Jerusalem',
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
    specAnchor: `The <strong>role of US President Jimmy Carter</strong>; the <strong>Camp David negotiations (Sept 1978)</strong>; the <strong>two frameworks of the Camp David Accords</strong>; the <strong>Egyptian-Israeli Peace Treaty (Treaty of Washington, March 1979)</strong>; the <strong>phased return of Sinai</strong>; <strong>Arab state backlash and the Arab League boycott</strong>; and the <strong>assassination of Anwar Sadat (October 1981)</strong>.`,
    stages: [
      {
        step: 1,
        keywords: [
          'President Jimmy Carter presidential retreat',
          '13 days of intense secret isolation',
          'Near collapse over settlements & West Bank',
          "Carter's personal shuttle diplomacy",
          'Billions in US financial & military aid promised',
        ],
        clue: 'How did Jimmy Carter prevent the 13-day Camp David summit from collapsing?',
        date: '5–17 Sept 1978',
        title: 'The Camp David Summit',
      },
      {
        step: 2,
        keywords: [
          'Framework for Egyptian-Israeli peace',
          'Second framework for Palestinian autonomy',
          'Begin refuses to surrender West Bank',
          'PLO & Palestinians reject framework as sham',
          'Arab world brands deal a betrayal',
        ],
        clue: 'Why did Palestinian leaders reject the second Camp David framework?',
        date: 'Sept 1978',
        title: 'The Dual Framework Agreements',
      },
      {
        step: 3,
        keywords: [
          'Treaty of Washington signed on White House lawn',
          'Sadat, Begin & Carter historic handshake',
          '31 years of official war ended',
          'Phased return of entire Sinai to 1982',
          'Yamit Jewish settlement bulldozed',
        ],
        clue: 'What territorial concessions did Israel make under the 1979 Peace Treaty?',
        date: '26 March 1979',
        title: 'The Egypt-Israel Peace Treaty',
      },
      {
        step: 4,
        keywords: [
          'Baghdad Arab Summit condemns Sadat',
          'Egypt expelled from the Arab League',
          'Arab League headquarters moved to Tunis',
          'Arab diplomatic & economic embargo',
          'Egypt totally isolated in the Arab world',
        ],
        clue: 'Why did the Arab League expel Egypt after the Treaty of Washington?',
        date: 'March–Nov 1979',
        title: 'The Arab League Boycott of Egypt',
      },
      {
        step: 5,
        keywords: [
          'Cairo military victory parade',
          'Egyptian Islamic Jihad assassins open fire',
          'Sadat shot dead on review stand',
          'Revenge for peace with Israel & mass arrests',
          'Hosni Mubarak takes over & upholds treaty',
        ],
        clue: 'Why did Egyptian Islamic Jihad target Anwar Sadat in October 1981?',
        date: '6 October 1981',
        title: 'The Assassination of Anwar Sadat',
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
    specAnchor: `The <strong>PLO in Lebanon and the 1978 Coastal Road attack</strong>; <strong>Operation Litani (1978)</strong>; the <strong>1982 Israeli invasion of Lebanon (Operation Peace for Galilee)</strong>; the <strong>siege of West Beirut and PLO evacuation to Tunis</strong>; the <strong>Sabra and Shatila massacres (Sept 1982)</strong>; and the <strong>Kahan Commission inquiry and Sharon’s resignation</strong>.`,
    stages: [
      {
        step: 1,
        keywords: [
          'Fatah Coastal Road bus hijack (38 dead)',
          'Operation Litani IDF invasion',
          '25,000 troops advance to Litani River',
          'UN Security Council Resolution 425',
          'UNIFIL peacekeepers & Christian militia buffer',
        ],
        clue: 'What was the military objective of Operation Litani in southern Lebanon?',
        date: 'March 1978',
        title: 'Operation Litani & The Border Buffer',
      },
      {
        step: 2,
        keywords: [
          'Ambassador Shlomo Argov shot in London',
          'Full-scale invasion of Lebanon launched',
          'Defence Minister Ariel Sharon',
          'Armored columns advance 60 miles to Beirut',
          'Cabinet 40km limit secretly bypassed',
        ],
        clue: "Why did Ariel Sharon expand the invasion far beyond the cabinet's 40km limit?",
        date: '6 June 1982',
        title: 'Operation Peace for Galilee Launched',
      },
      {
        step: 3,
        keywords: [
          'Ten-week siege of West Beirut',
          'Heavy IDF shelling & aerial bombardment',
          'US envoy Philip Habib brokers ceasefire',
          '14,000 PLO fighters evacuated by ship',
          'Arafat moves headquarters to Tunis (1,500 mi)',
        ],
        clue: 'Why did the evacuation of the PLO to Tunis weaken Arafat’s military power?',
        date: 'June–Aug 1982',
        title: 'The Siege of Beirut & PLO Evacuation',
      },
      {
        step: 4,
        keywords: [
          'Lebanese President Gemayel assassinated',
          'Christian Phalangist militiamen enter camps',
          '800 to 3,500 unarmed refugees slaughtered',
          'IDF controls perimeter & fires night flares',
          'Worldwide moral outrage at Israeli complicity',
        ],
        clue: 'Why was Israel held internationally accountable for the Phalangist massacre?',
        date: '16–18 Sept 1982',
        title: 'The Sabra and Shatila Massacre',
      },
      {
        step: 5,
        keywords: [
          '400,000 Israelis protest in Tel Aviv',
          'Judicial Kahan Commission of Inquiry',
          'Sharon found "personally responsible"',
          'Sharon forced to resign as Defence Minister',
          'Begin resigns as Prime Minister (Aug 1983)',
        ],
        clue: 'What were the findings of the Kahan Commission regarding Ariel Sharon?',
        date: 'Feb 1983',
        title: 'The Kahan Commission & Israeli Protests',
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
    specAnchor: `The <strong>First Intifada (1987–93)</strong>: <strong>causes, events, and the Israeli "Iron Fist" response</strong>; the <strong>role of the PLO and the founding of Hamas (1987)</strong>; <strong>Arafat’s Geneva speech to the UN renouncing terrorism (1988)</strong>; <strong>collapse of the Soviet Union</strong>; the <strong>1990–91 Gulf War</strong>; the <strong>1991 Madrid Peace Conference</strong>; and the <strong>1992 Israeli election of Yitzhak Rabin</strong>.`,
    stages: [
      {
        step: 1,
        keywords: [
          'IDF tank transporter crashes at checkpoint',
          'Four Palestinian workers from Jabalia killed',
          'Rumors of deliberate Israeli retaliation',
          'Funerals explode into mass rioting',
          'Spontaneous uprising across Gaza & West Bank',
        ],
        clue: 'Why did a traffic collision at the Erez checkpoint spark the First Intifada?',
        date: '8 Dec 1987',
        title: 'The Jabalia Traffic Spark',
      },
      {
        step: 2,
        keywords: [
          'Youths throwing stones vs armed soldiers',
          'Commercial strikes & tax boycotts',
          'Defence Minister Rabin "break their bones"',
          'Global TV footage of soldiers beating youths',
          'IDF moral authority & image shattered',
        ],
        clue: 'How did global television broadcasts of the "Iron Fist" policy damage Israel?',
        date: '1987–1988',
        title: 'Popular Uprising & The "Iron Fist" Policy',
      },
      {
        step: 3,
        keywords: [
          'Sheikh Ahmed Yassin (Muslim Brotherhood)',
          'Hamas founded as Islamic Resistance',
          '1988 Hamas Covenant: all Palestine Islamic Waqf',
          'Rejection of any diplomatic compromise',
          'Challenges secular authority of the PLO',
        ],
        clue: 'Why did the rise of Hamas threaten Yasser Arafat and the PLO’s leadership?',
        date: 'Dec 1987',
        title: 'The Founding of Hamas in Gaza',
      },
      {
        step: 4,
        keywords: [
          'UN General Assembly moves to Geneva',
          'Arafat explicitly renounces terrorism',
          'Accepts UN Resolutions 242 & 338',
          'Recognises State of Israel’s right to exist',
          'US opens direct diplomatic dialogue with PLO',
        ],
        clue: 'Why was Arafat’s 1988 Geneva speech a historic turning point for the PLO?',
        date: '13 Dec 1988',
        title: 'Arafat’s Geneva Speech to the UN',
      },
      {
        step: 5,
        keywords: [
          'US victory in 1991 Gulf War',
          'Pres Bush & Gorbachev convene summit',
          'Arabs & Israelis face-to-face for first time',
          'Palestinians represented in Jordanian delegation',
          'Framework established for future bilateral talks',
        ],
        clue: 'Why did the end of the Cold War and the Gulf War make the Madrid Conference possible?',
        date: 'Oct 1991',
        title: 'The Madrid Peace Conference',
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
    specAnchor: `The <strong>1992 Labour victory of Yitzhak Rabin</strong>; <strong>secret Oslo backchannel negotiations</strong> and <strong>Letters of Mutual Recognition (1993)</strong>; the <strong>Oslo I Accord (Declaration of Principles)</strong>; the <strong>1994 Israel-Jordan Peace Treaty</strong>; <strong>extremist opposition (Hamas suicide bombings and the Hebron massacre)</strong>; <strong>Oslo II (partition of the West Bank into Areas A, B, and C)</strong>; and the <strong>assassination of Yitzhak Rabin (Nov 1995)</strong>.`,
    stages: [
      {
        step: 1,
        keywords: [
          'Yitzhak Rabin elected Prime Minister',
          'Ends 15 years of Likud dominance',
          'Pledges peace within nine months',
          'Freeze on political West Bank settlements',
          'Public exhaustion with the First Intifada',
        ],
        clue: 'What mandate did Israeli voters give Yitzhak Rabin and Labour in 1992?',
        date: 'June 1992',
        title: 'The Election of Yitzhak Rabin',
      },
      {
        step: 2,
        keywords: [
          'Covert talks in Norwegian farmhouses',
          'Away from media grandstanding & leaks',
          'Letters of Mutual Recognition signed',
          'Rabin recognises PLO as Palestinian representative',
          'Arafat recognises Israel & renounces violence',
        ],
        clue: 'Why was strict secrecy essential for the Oslo negotiators in Norway?',
        date: 'Jan–Aug 1993',
        title: 'Secret Backchannel Negotiations in Oslo',
      },
      {
        step: 3,
        keywords: [
          'Declaration of Principles (Oslo I)',
          'Signing ceremony on White House lawn',
          'Historic Rabin-Arafat handshake (Clinton)',
          'Palestinian Authority (PA) established',
          '"Gaza-Jericho First" interim self-rule',
        ],
        clue: 'What did the "Gaza-Jericho First" formula provide for Palestinians?',
        date: '13 Sept 1993',
        title: 'Oslo I (Declaration of Principles) & Handshake',
      },
      {
        step: 4,
        keywords: [
          'Hebron Cave of Patriarchs massacre (29 dead)',
          'Hamas bus suicide bombing campaign',
          'Israel-Jordan Peace Treaty signed (1994)',
          'Oslo II Accord: West Bank divided',
          'Area A (PA), Area B (Joint), Area C (IDF)',
        ],
        clue: 'How did the division of the West Bank into Areas A, B, and C leave territory fragmented?',
        date: '1994–1995',
        title: 'Extremist Violence, Jordan Peace & Oslo II',
      },
      {
        step: 5,
        keywords: [
          'Massive peace rally in Tel Aviv',
          'Yigal Amir Jewish religious extremist',
          'Rabin shot point-blank walking to car',
          'Religious opposition to ceding biblical land',
          'Shatters the momentum of the Oslo peace process',
        ],
        clue: 'Why did Jewish extremist Yigal Amir assassinate Prime Minister Yitzhak Rabin?',
        date: '4 Nov 1995',
        title: 'The Assassination of Yitzhak Rabin',
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
    
    /* 5-Stage Domino Causal Chain Styling */
    .domino-chain-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      margin: 2px 0;
    }
    .domino-card-compact {
      border: 1.2px solid #000000;
      border-radius: 3px;
      padding: 2.5px 6px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .domino-connector {
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 700;
      color: #000000;
      line-height: 1;
      padding: 1px 0;
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
      title: 'Pearson Edexcel GCSE (9–1) History Specification &bull; Key Topic 3 Content',
      subtopics: [
        {
          title: '1. Diplomatic Negotiations, 1974–79',
          items: [
            '<strong>Superpower Shuttle Diplomacy:</strong> Henry Kissinger negotiates disengagement accords following the 1973 war and the OPEC oil embargo.',
            '<strong>Sadat’s Jerusalem Initiative (1977):</strong> Historic flight to Ben Gurion Airport and address to the Israeli Knesset: "No more war, no more bloodshed."',
            '<strong>Camp David Accords (1978):</strong> 13 days of secluded talks hosted by Jimmy Carter, brokering bilateral peace frameworks between Sadat and Begin.',
            '<strong>Treaty of Washington (1979):</strong> Demilitarisation and return of Sinai, demolition of Yamit, Arab League boycott, and Sadat’s assassination (1981).',
          ],
        },
        {
          title: '2. The Palestinian Issue, 1974–93',
          items: [
            '<strong>PLO Diplomacy &amp; "Fatahland":</strong> Arafat’s UN "gun and olive branch" address (1974) and guerrilla cross-border rocket strikes from southern Lebanon.',
            '<strong>Lebanon Invasion &amp; Siege of Beirut (1982):</strong> Operation Peace for Galilee driving 60 miles north; 10-week siege and PLO evacuation to Tunis.',
            '<strong>Sabra-Shatila &amp; Political Repercussions:</strong> Phalangist massacre of Palestinian refugees; Israeli Kahan Commission forces Sharon’s resignation.',
            '<strong>The First Intifada (1987–93):</strong> Jabalia camp spark, civil strikes, Rabin’s "Iron Fist" policy, and the founding of militant Islamist rival Hamas.',
          ],
        },
        {
          title: '3. Attempts at a Solution, 1988–95',
          items: [
            '<strong>Renunciation of Terrorism (1988):</strong> Arafat’s Geneva address recognising Israel’s right to exist, opening direct US diplomatic dialogue.',
            '<strong>Madrid Conference &amp; Rabin Election:</strong> Impact of Gulf War and Soviet collapse; 1992 election of Labour leader Yitzhak Rabin promising peace.',
            '<strong>Oslo Accords &amp; Jordan Treaty (1993–94):</strong> Secret Norwegian backchannel, White House lawn handshake, and 1994 Israel-Jordan peace treaty.',
            '<strong>Extremist Backlash &amp; Oslo II (1995):</strong> Baruch Goldstein Hebron massacre, Hamas suicide bombings, West Bank division (Areas A/B/C), and Rabin’s assassination.',
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
          <strong>Living Timeline Protocol:</strong> Throughout this unit, illustrate each historical milestone inside its dedicated sketchpad box below. Use the dual-coding prompt to combine symbolic diagrams, causal arrows, and key dates.
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch Sadat's presidential aircraft landing in Jerusalem and Sadat addressing the Knesset under the words: 'No More War'.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
          </div>
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a 3-way diplomatic triangle: Jimmy Carter mediating at the top, joining hands with Sadat (Egypt) and Begin (Israel).</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
          </div>
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch the White House lawn signing ceremony, Israeli bulldozers demolishing Yamit, and the Egyptian flag over Sinai.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
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
            Living Timeline &bull; Part 2: Resistance, The Intifada &amp; The Oslo Peace Process (1982–1995)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual symbols, causal arrows, and dates) to master the chronological spine.
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch IDF invasion arrows driving 60 miles north to Beirut, PLO evacuation ships heading for Tunis, and the Kahan report.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
          </div>
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a stone-throwing youth confronting a military vehicle (slingshot vs armour), paired with Arafat at the Geneva UN podium.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
          </div>
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
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch the Rabin-Arafat-Clinton White House handshake, a map dividing Areas A/B/C, and a memorial candle for Rabin.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
              <span>⌜ Visual Diagram / Symbolic Sketch</span>
              <span>Causal Annotation &amp; Key Dates ⌟</span>
            </div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(3, approvedFunnyFooters[2], 24)}
    </div>
  </div>
  `;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED FOUR-PAGE LESSONS (KT 3.1 TO 3.5)
  // Spread 1 (Verso & Recto): Enquiry Lesson + Docked Exam Scaffolding
  // Spread 2 (Verso & Recto): Facing Ruled Paper for Extended Assessment
  // ====================================================================
  kt3Configs.forEach((cfg) => {
    const leftPageNum = 4 + (cfg.lessonNum - 1) * 4; // Spread 1 Left (Verso): Chronological Spine + Vocab
    const rightPageNum = leftPageNum + 1; // Spread 1 Right (Recto): Open Ruled Lesson Notebook
    const linedLeftPageNum = leftPageNum + 2; // Spread 2 Left (Verso): Exam Practice & Planning Scaffold
    const linedRightPageNum = leftPageNum + 3; // Spread 2 Right (Recto): Extended Response & Band 4 Rubric
    const rx = cfg.rightExam || cfg.extendedPractice;
    const isUtility = rx.type === 'utility_8';

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
            KEY TOPIC 3.${cfg.lessonNum} &bull; ENQUIRY LESSON NOTEBOOK
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

      <!-- Chronological Lesson Spine (Down the Left) with Pupil Note-Taking Canvas -->
      <div class="spine-notes-container" style="display: flex; flex-direction: column; flex: 1; margin: 2px 0 3px 0;">
        <div style="display: flex; flex-direction: column; flex: 1; border-top: 1.5px solid #000000;">
          ${cfg.stages
            .map(
              (s, sIdx) => `
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
            <!-- Spine Node Down The Left (Number, Date, Title, Keywords & Focus Clue • 38mm Width) -->
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 3px 0 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${s.step}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${s.date}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
                ${s.title}
              </div>
              ${
                (s.keywords && s.keywords.length > 0) ||
                (s.coreKeywords && s.coreKeywords.length > 0) ||
                (s.stretchKeywords && s.stretchKeywords.length > 0)
                  ? `
              <div style="margin-top: 1px;">
                <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                  ${(s.keywords || [...(s.coreKeywords || []), ...(s.stretchKeywords || [])])
                    .map(
                      (kw) =>
                        `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${kw}</div>`,
                    )
                    .join('')}
                </div>
              </div>`
                  : ''
              }
              ${
                s.clue
                  ? `
              <div style="margin-top: 2.5px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                  Focus Clue
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                  ${s.clue}
                </div>
              </div>`
                  : ''
              }
            </div>

            <!-- Ruled Note-Taking Lines (6 Lines per stage • Tighter Line Spacing ~8.0mm • Thick 1.5px Black Lines) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>
          `,
            )
            .join('')}
        </div>
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
          KEY TOPIC 3.${cfg.lessonNum} &bull; EDEXCEL EXAM PRACTICE
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
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-style: italic; color: #222222; margin-bottom: 1px; line-height: 1.15;">
          <strong>PFC Guidance:</strong> ${cfg.consequenceA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> ${cfg.consequenceA.stems}
        </div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
        <div class="task-line" style="height: 6.8mm;"></div>
      </div>

      <!-- Section 2: Extended Exam Practice (Q2 Narrative [8m] or Q3 Utility [8m]) -->
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
        <!-- Row 1: Stem & Stimulus/Sources -->
        <div style="padding: 2.5px 6px; border-bottom: 1px solid #000000; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
            ${rx.stem}
          </div>
          ${
            isUtility
              ? `
          <!-- Two Compact Sources for Q3 Utility -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 2px;">
            <div style="border: 1px solid #000; border-radius: 2px; padding: 2px 4px; background: #fafafa;">
              <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 800; border-bottom: 1px solid #ddd; padding-bottom: 1px; margin-bottom: 1px;">
                <span>SOURCE A: ${rx.sourceA.tag}</span>
                <span>${rx.sourceA.shelfmark}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.2pt; font-style: italic; line-height: 1.15; color: #111;">
                "${rx.sourceA.quote}"
              </div>
            </div>
            <div style="border: 1px solid #000; border-radius: 2px; padding: 2px 4px; background: #fafafa;">
              <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 800; border-bottom: 1px solid #ddd; padding-bottom: 1px; margin-bottom: 1px;">
                <span>SOURCE B: ${rx.sourceB.tag}</span>
                <span>${rx.sourceB.shelfmark}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.2pt; font-style: italic; line-height: 1.15; color: #111;">
                "${rx.sourceB.quote}"
              </div>
            </div>
          </div>
          `
              : `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.18;">
            <strong>You may use the following in your answer:</strong> &bull; ${rx.stimulus[0]} &bull; ${rx.stimulus[1]} &bull; <em>You must also use information of your own.</em>
          </div>
          `
          }
        </div>

        <!-- Row 2: 3-Column Planning Structure Strip -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #000000; background: #fafafa;">
          ${rx.structureStrip
            .map(
              (strip, sIdx) => `
          <div style="padding: 2px 4px; ${sIdx < 2 ? 'border-right: 1px solid #000000;' : ''}">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; line-height: 1.1; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111111; line-height: 1.12; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Row 3: Connectives & Word Bank -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; background: #ffffff;">
          <div style="padding: 2px 5px; border-right: 1px solid #000000;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; line-height: 1.1;">Analytical Connectives:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.12; display: block;">${rx.connectives || rx.causalConnectives}</span>
          </div>
          <div style="padding: 2px 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; line-height: 1.1;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.12; display: block;">${rx.wordBank}</span>
          </div>
        </div>
      </div>

      <!-- Initial Response Lines (Ruled Grid with 8mm Margin • Tighter Line Spacing) -->
      <div class="lined-page-grid" style="flex: 1; margin: 2px 0 2px 0;">
        ${Array.from(
          { length: 20 },
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
    footerQuip: approvedFunnyFooters[23],
    totalPageCount: 24,
    renderFooterStrip,
  });

  html += `
</body>
</html>
`;

  return html;
}

// ============================================================================
// PDF COMPILER WITH PUPPETEER & AUDIT HOOK
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
    const html = buildCmeKt3TwoPageWorkbook({}, { name: 'KT3' });
    const publicHtml = path.join(rootDir, 'public', 'units', 'cme_new', 'pupil_workbook_KT3.html');
    const unitHtml = path.join(rootDir, 'units', 'cme_new', 'pupil_workbook_KT3.html');
    fs.mkdirSync(path.dirname(publicHtml), { recursive: true });
    fs.mkdirSync(path.dirname(unitHtml), { recursive: true });
    fs.writeFileSync(publicHtml, html, 'utf8');
    fs.writeFileSync(unitHtml, html, 'utf8');
    console.log(`✅ Saved HTML: ${publicHtml}`);

    const pdfPath = path.join(rootDir, 'public', 'pdfs', 'cme_new_pupil_workbook_KT3.pdf');
    const v17Path = path.join(
      rootDir,
      'public',
      'pdfs',
      'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
    );
    console.log(`🖨️ Compiling PDF with Puppeteer & Dynamic Auto-Lines...`);
    await compilePdf(publicHtml, pdfPath, v17Path);
    console.log(`✅ Compiled PDF: ${v17Path}`);
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildCmeKt3TwoPageWorkbook };
