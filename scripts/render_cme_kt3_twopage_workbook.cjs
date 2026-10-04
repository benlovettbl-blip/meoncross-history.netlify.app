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
function renderFooterStrip(pageNum, text, totalPages = 28) {
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
    stages: [
      {
        step: 1,
        date: 'Oct 1973',
        title: 'The Arab Oil Shock & Superpower Realignment',
        actor: 'OPEC Arab Oil Producers & The USA',
        tag: 'The Economic Lever',
        trigger:
          'Arab OPEC states embargo crude oil shipments to the US and slash production, quadrupling world oil prices in weeks.',
        because:
          'Arab nations sought to punish the US for resupplying Israel during the 1973 war and force Western powers to pressure Israel into territorial concessions.',
        therefore:
          'Inflicted severe Western stagflation and convinced Washington that Middle East stability was an urgent national security priority.',
        connective:
          'With US economic interests threatened, Secretary of State Henry Kissinger launched unprecedented mediation...',
      },
      {
        step: 2,
        date: 'Jan 1974',
        title: 'Kissinger’s Shuttle Diplomacy & Sinai I',
        actor: 'Henry Kissinger, Egypt & Israel',
        tag: 'Bilateral Disengagement',
        trigger:
          'Kissinger flies between Cairo and Jerusalem, brokering the Sinai Disengagement Agreement (Sinai I) to separate frontline armies.',
        because:
          'Both armies were dangerously entangled across the Suez Canal, with Egypt’s Third Army encircled and risking renewed superpower war.',
        therefore:
          'Established a UN buffer zone along the canal, allowing Egypt to reopen the waterway and paving the way for gradual territorial talks.',
        connective:
          'Encouraged by military separation, the parties negotiated a broader diplomatic pact...',
      },
      {
        step: 3,
        date: 'Sept 1975',
        title: 'The Sinai II Agreement',
        actor: 'Egyptian & Israeli Governments',
        tag: 'Renouncing Force',
        trigger:
          'Egypt and Israel sign Sinai II in Geneva, committing both nations to resolve their territorial disputes exclusively by peaceful means.',
        because:
          'Sadat urgently needed to rebuild Egypt’s shattered domestic economy, while Israel sought to detach Egypt from the Arab military coalition.',
        therefore:
          'Israel withdrew further into Sinai, returning the Abu Rudeis oilfields, while Egypt formally pledged not to resort to military force.',
        connective:
          'However, political leadership in Israel shifted sharply to the right, threatening negotiations...',
      },
      {
        step: 4,
        date: 'May 1977',
        title: 'Likud Election Victory (Menachem Begin)',
        actor: 'Menachem Begin & The Likud Party',
        tag: 'Right-Wing Triumph',
        trigger:
          'Menachem Begin leads the right-wing Likud party to an election victory, ending 29 years of unbroken Labour rule in Israel.',
        because:
          'Israeli voters were disillusioned by Labour’s military unpreparedness in 1973 and sought stronger, uncompromising leadership.',
        therefore:
          'Begin took power as a hardline ideological Zionist opposed to returning the West Bank, making peace appear completely impossible.',
        connective:
          'To break this dangerous diplomatic impasse, President Sadat made an astonishing unilateral gamble...',
      },
      {
        step: 5,
        date: '19–21 Nov 1977',
        title: 'Sadat’s Historic Journey to Jerusalem',
        actor: 'President Anwar Sadat & The Israeli Knesset',
        tag: 'The Psychological Breakthrough',
        trigger:
          'Sadat flies to Tel Aviv and addresses the Israeli Knesset in Jerusalem, declaring directly to the Israeli people: "No more war."',
        because:
          'Sadat realised that mutual fear and psychological barriers prevented peace, and that only a dramatic gesture could unlock direct talks.',
        therefore:
          'Electrified world opinion, shattered 30 years of Arab diplomatic taboos, and paved the way directly to the Camp David Summit.',
        connective:
          'Sadat’s courage opened the door to intense tripartite negotiations at the presidential retreat of Camp David...',
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
    stages: [
      {
        step: 1,
        date: '5–17 Sept 1978',
        title: 'The Camp David Summit',
        actor: 'Jimmy Carter, Anwar Sadat & Menachem Begin',
        tag: 'Presidential Isolation',
        trigger:
          'US President Jimmy Carter isolates Sadat and Begin at Camp David for 13 days of grueling, closed-door negotiations.',
        because:
          'Bilateral talks had collapsed over Israeli settlements in Sinai and Begin’s refusal to grant Palestinian national sovereignty.',
        therefore:
          'Carter’s personal diplomacy and promises of billions in US economic and military aid saved the summit from total failure.',
        connective:
          'The intense 13-day summit produced two historic but fundamentally unequal framework documents...',
      },
      {
        step: 2,
        date: 'Sept 1978',
        title: 'The Dual Framework Agreements',
        actor: 'The United States, Egypt & Israel',
        tag: 'The Two Accords',
        trigger:
          'The leaders sign two frameworks: one for complete Israeli withdrawal from Sinai, and a second vague framework for Palestinian self-government.',
        because:
          'Begin agreed to trade Sinai for peace, but adamantly refused to surrender Israeli military control over the West Bank and Gaza.',
        therefore:
          'Created deep division: Egypt secured its lost territory, but Palestinians rejected the second framework as an empty sham.',
        connective:
          'The bilateral framework was formally transformed into a binding international peace treaty...',
      },
      {
        step: 3,
        date: '26 March 1979',
        title: 'The Egypt-Israel Peace Treaty',
        actor: 'Sadat, Begin & Carter',
        tag: 'Peace on the White House Lawn',
        trigger:
          'Sadat and Begin sign the formal peace treaty on the White House lawn, officially ending 31 years of war between Egypt and Israel.',
        because:
          'Both nations sought an enduring bilateral peace guaranteed by massive American financial and military assistance.',
        therefore:
          'Israel agreed to dismantle all 18 Sinai settlements and return the peninsula; Egypt recognised Israel and opened diplomatic ties.',
        connective:
          'While celebrated in the West, Egypt’s separate peace provoked immense outrage across the Arab world...',
      },
      {
        step: 4,
        date: 'March–Nov 1979',
        title: 'The Arab League Boycott of Egypt',
        actor: 'The Arab League & PLO',
        tag: 'Total Pan-Arab Isolation',
        trigger:
          'The Arab League condemns Egypt as a traitor to the Arab cause, suspends Egypt’s membership, and relocates its headquarters from Cairo to Tunis.',
        because:
          'Arab states and Palestinians viewed Sadat’s separate peace as an unforgivable betrayal that removed the Arab world’s strongest army from the struggle.',
        therefore:
          'Egypt was completely isolated diplomatically and economically in the Arab world, leaving Palestinians feeling abandoned.',
        connective:
          'Violent fury within Egypt culminated in extreme tragedy for the architect of the peace treaty...',
      },
      {
        step: 5,
        date: '6 October 1981',
        title: 'The Assassination of Anwar Sadat',
        actor: 'Egyptian Islamic Jihad Militants',
        tag: 'Martyr of Camp David',
        trigger:
          'Islamist army officers open fire on Sadat during a military victory parade in Cairo, assassinating him on the anniversary of the 1973 crossing.',
        because:
          'Militants were enraged by Sadat’s peace treaty with Israel, his alliance with the US, and his arrest of hundreds of Islamic opponents.',
        therefore:
          'Shook the Middle East, but Vice President Hosni Mubarak assumed the presidency and vowed to maintain the 1979 peace treaty.',
        connective:
          'With its southern border secure, Israel turned its military attention to PLO bases in Lebanon...',
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
    stages: [
      {
        step: 1,
        date: 'March 1978',
        title: 'Operation Litani & The Border Buffer',
        actor: 'IDF & Palestinian Guerrillas',
        tag: 'The First Incursion',
        trigger:
          'Following a deadly coastal road bus hijacking near Tel Aviv, the IDF invades southern Lebanon up to the Litani River.',
        because:
          'The PLO used southern Lebanon ("Fatahland") as a staging ground to fire Katyusha rockets and launch raids into northern Israel.',
        therefore:
          'Displaced 100,000 Lebanese civilians; UN Resolution 425 established UNIFIL peacekeepers and a Christian militia buffer zone.',
        connective:
          'PLO cross-border shelling continued, prompting Israeli defence leaders to plan a much larger invasion...',
      },
      {
        step: 2,
        date: '6 June 1982',
        title: 'Operation Peace for Galilee Launched',
        actor: 'Defence Minister Ariel Sharon & The IDF',
        tag: 'The Full-Scale Invasion',
        trigger:
          'Following the shooting of Israeli ambassador Shlomo Argov in London, Israel launches a massive air and ground invasion of Lebanon.',
        because:
          'Ariel Sharon was determined to eradicate the PLO’s military infrastructure in Lebanon and install a friendly Christian government in Beirut.',
        therefore:
          'Sharon’s armored columns bypassed the government’s authorised 40km zone, advancing rapidly all the way to the Lebanese capital.',
        connective:
          'Israeli forces laid siege to Beirut, trapping thousands of Palestinian fighters and Lebanese civilians...',
      },
      {
        step: 3,
        date: 'June–Aug 1982',
        title: 'The Siege of Beirut & PLO Evacuation',
        actor: 'IDF, PLO & US Diplomat Philip Habib',
        tag: 'The Beirut Siege',
        trigger:
          'The IDF bombards West Beirut with heavy artillery and airstrikes for two months until US envoy Philip Habib brokers a ceasefire.',
        because:
          'Arafat and 14,000 PLO fighters were encircled in the city, using urban neighborhoods as defensive fortifications.',
        therefore:
          'The PLO agreed to evacuate Beirut by sea under international protection, relocating its political headquarters 1,500 miles away to Tunis.',
        connective:
          'The withdrawal of PLO fighters left Palestinian refugee camps unprotected when Christian leader Bachir Gemayel was assassinated...',
      },
      {
        step: 4,
        date: '16–18 Sept 1982',
        title: 'The Sabra and Shatila Massacre',
        actor: 'Lebanese Christian Phalangists & The IDF',
        tag: 'Camp Slaughter',
        trigger:
          'Christian Phalangist militiamen enter the Sabra and Shatila refugee camps, slaughtering between 800 and 3,500 unarmed Palestinian civilians.',
        because:
          'Phalangists sought bloody revenge for the assassination of their leader, President-elect Bachir Gemayel.',
        therefore:
          'The IDF controlled the camp perimeter and fired illumination flares over the camps, sparking global outrage at Israeli complicity.',
        connective:
          'Horror at the massacre triggered massive political upheaval and public protests within Israel...',
      },
      {
        step: 5,
        date: 'Feb 1983',
        title: 'The Kahan Commission & Israeli Protests',
        actor: 'The Israeli Judiciary & The Peace Now Movement',
        tag: 'Judicial Verdict',
        trigger:
          '400,000 Israelis protest in Tel Aviv, forcing the government to establish the independent Kahan Commission of Inquiry.',
        because:
          'The Israeli public was shocked by the brutality of the massacres and demanded accountability for military command decisions.',
        therefore:
          'The commission ruled Ariel Sharon bore "personal responsibility" for failing to prevent the slaughter, forcing his resignation as Defence Minister.',
        connective:
          'With the PLO exiled in Tunis, grassroots frustration inside the occupied territories boiled over into spontaneous rebellion...',
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
    stages: [
      {
        step: 1,
        date: '8 Dec 1987',
        title: 'The Jabalia Traffic Spark',
        actor: 'Palestinian Civilians & The IDF',
        tag: 'The Catalyst',
        trigger:
          'An Israeli army tank transporter crashes into four civilian cars at the Erez checkpoint, killing four Palestinian laborers from Jabalia camp.',
        because:
          'Rumors spread that the crash was a deliberate revenge attack for the stabbing of an Israeli salesman in Gaza.',
        therefore:
          'Funerals turned into furious mass protests, quickly spreading across the entire Gaza Strip and the West Bank as the First Intifada.',
        connective:
          'What began as spontaneous riots transformed into an organised, grassroots campaign of civil disobedience...',
      },
      {
        step: 2,
        date: '1987–1988',
        title: 'Popular Uprising & The "Iron Fist" Policy',
        actor: 'Palestinian Youths vs. Defence Minister Yitzhak Rabin',
        tag: 'Stones vs. Bullets',
        trigger:
          'Palestinian youths wage continuous stone-throwing protests and commercial strikes; Rabin orders the IDF to use "force, might, and beatings."',
        because:
          'Twenty years of Israeli military occupation, land confiscations, and economic subjugation had left Palestinian youth with nothing to lose.',
        therefore:
          'Global television broadcasts of Israeli soldiers beating teenage protesters shattered Israel’s international image and moral authority.',
        connective:
          'As the secular uprising escalated, a militant Islamic faction emerged to challenge PLO leadership...',
      },
      {
        step: 3,
        date: 'Dec 1987',
        title: 'The Founding of Hamas in Gaza',
        actor: 'Sheikh Ahmed Yassin & The Muslim Brotherhood',
        tag: 'The Islamic Alternative',
        trigger:
          'Paraplegic cleric Sheikh Ahmed Yassin founds Hamas in Gaza, publishing an Islamic Covenant rejecting any territorial compromise.',
        because:
          'Religious militants believed the secular PLO was weak, corrupt, and ineffective in ending the Israeli occupation.',
        therefore:
          'Introduced suicide bombings and militant Islamic ideology, dividing Palestinian leadership between secular diplomacy and religious resistance.',
        connective:
          'Feeling his leadership slipping away, Yasser Arafat made a radical diplomatic pivot on the international stage...',
      },
      {
        step: 4,
        date: '13 Dec 1988',
        title: 'Arafat’s Geneva Speech to the UN',
        actor: 'Yasser Arafat & The UN General Assembly',
        tag: 'Renouncing Terrorism',
        trigger:
          'Arafat addresses the UN General Assembly in Geneva, explicitly renouncing terrorism and recognising Israel’s right to exist in peace (UN Res 242).',
        because:
          'Arafat urgently needed to break the diplomatic blockade imposed by the United States and establish direct US-PLO dialogue.',
        therefore:
          'Washington immediately opened formal diplomatic talks with the PLO, legitimising the two-state solution internationally.',
        connective:
          'The collapse of the Soviet Union and the 1991 Gulf War transformed the geopolitical balance of power...',
      },
      {
        step: 5,
        date: 'Oct 1991',
        title: 'The Madrid Peace Conference',
        actor: 'The USA, The USSR, Israel & Arab Neighbours',
        tag: 'The Face-to-Face Summit',
        trigger:
          'Following victory in the 1991 Gulf War, US President Bush and Soviet President Gorbachev convene the historic Madrid Peace Conference.',
        because:
          'The US held unchallenged superpower dominance and wanted to reward Arab allies who had joined the coalition against Saddam Hussein.',
        therefore:
          'Brought Israeli, Jordanian, Syrian, Lebanese, and Palestinian delegates together in the same room for face-to-face talks for the first time.',
        connective:
          'While formal talks in Madrid stalled, secret backchannel contacts began in Scandinavia...',
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
    stages: [
      {
        step: 1,
        date: 'June 1992',
        title: 'The Election of Yitzhak Rabin',
        actor: 'Yitzhak Rabin & The Israeli Labour Party',
        tag: 'The Mandate for Peace',
        trigger:
          'Israeli voters elect Yitzhak Rabin and the Labour Party, ending 15 years of Likud dominance on a pledge to achieve peace within nine months.',
        because:
          'The Israeli public was exhausted by five years of the First Intifada and feared the demographic growth of the Palestinian population.',
        therefore:
          'Rabin halted new political settlement building in the West Bank and authorised direct diplomatic contacts with Palestinian representatives.',
        connective:
          'Frustrated by public delays in Washington, negotiators opened an ultra-secret backchannel in Norway...',
      },
      {
        step: 2,
        date: 'Jan–Aug 1993',
        title: 'Secret Backchannel Negotiations in Oslo',
        actor: 'Israeli Academics, PLO Delegates & Norwegian Facilitators',
        tag: 'Secret Scandinavian Diplomacy',
        trigger:
          'Covert talks in Norwegian farmhouses produce the breakthrough Letters of Mutual Recognition between Israel and the PLO.',
        because:
          'Secrecy allowed negotiators to speak honestly without political grandstanding or leaks to domestic extremists.',
        therefore:
          'Rabin officially recognised the PLO as the legitimate representative of Palestinians; Arafat officially recognised Israel and renounced terror.',
        connective:
          'Mutual recognition made possible an unprecedented public signing ceremony in Washington...',
      },
      {
        step: 3,
        date: '13 Sept 1993',
        title: 'Oslo I (Declaration of Principles) & White House Handshake',
        actor: 'Yitzhak Rabin, Yasser Arafat & Bill Clinton',
        tag: 'The Historic Handshake',
        trigger:
          'On the White House lawn, Rabin and Arafat sign the Oslo I Accord and share a historic handshake orchestrated by President Clinton.',
        because:
          'Both leaders recognised that decades of armed conflict had reached a military stalemate that only political compromise could resolve.',
        therefore:
          'Established the Palestinian Authority (PA) with five years of interim self-rule, starting in Gaza and Jericho ("Gaza-Jericho First").',
        connective:
          'However, extremists on both sides were determined to sabotage the peace agreement through terror...',
      },
      {
        step: 4,
        date: '1994–1995',
        title: 'Extremist Violence, Jordan Peace & Oslo II',
        actor: 'Baruch Goldstein, Hamas Militants & King Hussein',
        tag: 'The Violent Backlash',
        trigger:
          'Baruch Goldstein murders 29 Palestinians in Hebron; Hamas launches bus suicide bombings; King Hussein signs the Israel-Jordan Peace Treaty.',
        because:
          'Jewish and Islamist extremists both viewed territorial compromise as an existential betrayal of their sacred religious duties.',
        therefore:
          'Polarised both societies; nonetheless, Rabin and Arafat signed Oslo II (1995), dividing the West Bank into Areas A, B, and C.',
        connective:
          'Growing hatred and right-wing incitement inside Israel culminated in an act of domestic terror that changed history...',
      },
      {
        step: 5,
        date: '4 Nov 1995',
        title: 'The Assassination of Yitzhak Rabin',
        actor: 'Yigal Amir & The Israeli Nation',
        tag: 'The Tragedy of Peace',
        trigger:
          'Jewish religious extremist Yigal Amir shoots Prime Minister Yitzhak Rabin three times at point-blank range following a peace rally in Tel Aviv.',
        because:
          'Amir believed that surrendering biblical Jewish land to the Palestinians was an act of treason forbidden by Jewish religious law.',
        therefore:
          'Traumatised Israel, halted further territorial withdrawals, and led to the narrow election of right-wing Likud leader Benjamin Netanyahu in 1996.',
        connective:
          'Rabin’s death effectively shattered the momentum of the Oslo peace process, leaving its promise unfulfilled...',
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
    /* Ruled Paper Geometry (0px Overflow Standard • 28 Lines with 22mm Left Margin) */
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 22mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 2px;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
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
    totalPageCount: 28,
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

      ${renderFooterStrip(2, approvedFunnyFooters[1], 28)}
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

      ${renderFooterStrip(3, approvedFunnyFooters[2], 28)}
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
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000; padding-bottom: 2px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Chronological Lesson Spine &amp; Structured Note-Taking
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000; padding: 0 5px; border-radius: 2px;">
            5 TURNING POINTS &bull; ACTIVE RECALL
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; border-top: 1.2px solid #000000;">
          ${cfg.stages
            .map(
              (s, sIdx) => `
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
            <!-- Spine Node Down The Left (Heading & Date Only • No AI Text • 44mm Width) -->
            <div style="width: 44mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 5px 0 7px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 9px; height: 9px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 900; padding: 1px 3px; border-radius: 2px; text-transform: uppercase;">STAGE ${s.step}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000;">${s.date}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.15;">
                ${s.title}
              </div>
            </div>

            <!-- Ruled Note-Taking Lines (Pupil writes notes here • Faint Vertical Line shifted left) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary (Core Disciplinary Distinction) -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #fafafa; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Core Disciplinary Vocabulary &amp; Historical Distinction
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line" style="height: 6.2mm;"></div>
        <div class="task-line" style="height: 6.2mm;"></div>
        <div class="task-line" style="height: 6.2mm;"></div>
      </div>

      ${renderFooterStrip(leftPageNum, approvedFunnyFooters[leftPageNum - 1], 28)}
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

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1;">
        ${Array.from({ length: 28 }, (_, idx) => {
          const isFirst = idx === 0;
          const marginContent = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
            : `&nbsp;`;
          return `
            <div class="lined-row">
              <div class="lined-margin-cell">${marginContent}</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`;
        }).join('')}
      </div>

      ${renderFooterStrip(rightPageNum, approvedFunnyFooters[rightPageNum - 1], 28)}
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

      <!-- Initial Response Lines (Ruled Grid with Margin) -->
      <div class="lined-page-grid" style="flex: 1; margin: 2px 0 2px 0;">
        ${Array.from({ length: 15 }, (_, idx) => {
          const isFirst = idx === 0;
          const marginContent = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
            : `&nbsp;`;
          return `
            <div class="lined-row">
              <div class="lined-margin-cell">${marginContent}</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`;
        }).join('')}
      </div>

      ${renderFooterStrip(linedLeftPageNum, approvedFunnyFooters[linedLeftPageNum - 1], 28)}
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

      <!-- 20 Ruled Response Lines with Margin -->
      <div class="lined-page-grid" style="flex: 1; margin-bottom: 3px;">
        ${Array.from({ length: 20 }, (_, idx) => {
          const isFirst = idx === 0;
          const marginContent = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
            : `&nbsp;`;
          return `
            <div class="lined-row">
              <div class="lined-margin-cell">${marginContent}</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`;
        }).join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 2px; padding: 2px 6px; background: #fafafa; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
          Timeline Mission &bull; Pages 2–3
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.18;">
          ${rx.timelineMission}
        </div>
      </div>

      <!-- Band 4 Marking Rubric / Self-Assessment Checklist -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <span style="font-weight: 800; text-transform: uppercase;">Band 4 Checklist [7–8m]:</span>
          <span><input type="checkbox"> Accurate &amp; relevant details deployed</span>
          <span><input type="checkbox"> Analytical progression sustained throughout</span>
          <span><input type="checkbox"> Explicit causal connectives used</span>
        </div>
        <div style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; white-space: nowrap;">
          Mark: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 8 ]
        </div>
      </div>

      ${renderFooterStrip(linedRightPageNum, approvedFunnyFooters[linedRightPageNum - 1], 28)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 24: CARTOGRAPHIC MASTERCLASS & TERRITORIAL REFERENCE (VERSO)
  // ====================================================================
  html += `
  <!-- PAGE 24: CARTOGRAPHIC MASTERCLASS & TERRITORIAL PARTITION REFERENCE -->
  <div class="page page-container verso-page" id="page-24" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(24, approvedFunnyFooters[23], 28)}
    </div>
  </div>
  `;

  <!-- ==================================================================== -->
  <!-- PAGE 25: EXAM MASTERCLASS & SYNOPTIC THEMATIC SYNTHESIS (RECTO)      -->
  <!-- ==================================================================== -->
  html += `
  <div class="page page-container recto-page" id="page-25" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      
      <!-- Top Departmental Branding -->
      <div style="border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Grade 9 Masterclass</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">KEY TOPIC 3 EXAM EXCELLENCE</span>
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
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 4px 8px; background: #fafafa; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 2px;">
          <span>4. Pupil Extended Writing Self-Audit Checklist (The Grade 9 Polish)</span>
          <span>Tick Before Handing In</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; flex: 1; align-content: space-between;">
          <div>&bull; &#9633; Did I name at least 3 specific historical proper nouns per paragraph?</div>
          <div>&bull; &#9633; Did I frame my opening line to echo the exact words of the exam question?</div>
          <div>&bull; &#9633; Did I explain <strong>HOW</strong> event A caused event B rather than just stating it?</div>
          <div>&bull; &#9633; For narrative accounts: Are my 3 paragraphs in strict chronological sequence?</div>
          <div>&bull; &#9633; Did I use causal connectives (<em>Consequently, This directly led to</em>)?</div>
          <div>&bull; &#9633; For utility questions: Did I evaluate provenance (nature, origin, purpose) and content?</div>
        </div>
      </div>

      ${renderFooterStrip(25, approvedFunnyFooters[24], 28)}
    </div>
  </div>
  `;

  // ====================================================================
  // PAGES 26–27: SYNOPTIC ASSESSMENT & TIMED EXAM PRACTICE (FACING SPREAD)
  // ====================================================================
  const linedRowsSynopticLeft = Array.from({ length: 28 }, (_, idx) => {
    const isFirst = idx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Synoptic Practice &bull; Aspect 1: Detailed Historical Analysis ]</span>`
      : `&nbsp;`;
    return `
      <div class="lined-row">
        <div class="lined-margin-cell">${marginContent}</div>
        <div class="lined-content-cell">${linePrompt}</div>
      </div>`;
  }).join('');

  html += `
  <div class="page page-container verso-page" id="page-26" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Key Topic 3 Synoptic Assessment &bull; Timed Exam Practice
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Edexcel Paper 2 &bull; Question 2 / Question 3 &bull; Aspect 1 Analysis
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        ${linedRowsSynopticLeft}
      </div>

      ${renderFooterStrip(26, approvedFunnyFooters[25], 28)}
    </div>
  </div>
`;

  const linedRowsSynopticRight = Array.from({ length: 28 }, (_, idx) => {
    const isFirst = idx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Synoptic Practice Continued &bull; Aspect 2 &amp; Sustained Evaluative Conclusion ]</span>`
      : `&nbsp;`;
    return `
      <div class="lined-row">
        <div class="lined-margin-cell">${marginContent}</div>
        <div class="lined-content-cell">${linePrompt}</div>
      </div>`;
  }).join('');

  html += `
  <div class="page page-container recto-page" id="page-27" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Key Topic 3 Synoptic Assessment &bull; Sustained Analytical Conclusion
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Edexcel Paper 2 &bull; Band 4 Evaluative Verdict &bull; Examiner Criteria
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        ${linedRowsSynopticRight}
      </div>

      ${renderFooterStrip(27, approvedFunnyFooters[26], 28)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 28: OUTSIDE BACK COVER (Student Assessment Record & Digital Quizzing Hub)
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
    footerQuip: approvedFunnyFooters[27],
    totalPageCount: 28,
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
