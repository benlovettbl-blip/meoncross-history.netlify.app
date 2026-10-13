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

// Approved Witty Revision Quips for CME Key Topic 1 (Exact 28 Pages)
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 1 • The History Department', // Page 1
  '"Diplomacy 101: Never promise the exact same slice of land to three different people at once."', // Page 2
  '"Sykes and Picot drew borders with a pencil and a ruler — please be slightly more careful with your map sketches!"', // Page 3
  '"The 1939 White Paper managed to infuriate absolutely everyone: truly the peak of British compromise."', // Page 4
  '"Saying \'Britain was tired after the war\' is true, but the examiner expects 8 marks of depth!"', // Page 5
  '"Balfour wrote 67 words; you have two full pages of lined paper to explain the consequences."', // Page 6
  '"Extended responses win Grade 9: deploy precise statistics and sustain your historical argument."', // Page 7
  '"Irgun checked into the King David Hotel with milk churns... and checked Britain out of the Mandate."', // Page 8
  '"UN Resolution 181 gave each side a jigsaw puzzle; neither side liked the picture."', // Page 9
  '"Bevingrads and barbed wire: explain how urban insurgency made Palestine ungovernable for Attlee."', // Page 10
  '"Write with forensic detail: dates, casualties, and causal mechanisms turn notes into top marks."', // Page 11
  '"Ben-Gurion proclaimed independence in 16 minutes flat: you have 12 minutes for this narrative!"', // Page 12
  '"Five invading Arab armies, zero unified commanders: coordination counts in war and in paragraphs."', // Page 13
  '"Operation Dani and the Haganah: explain the strategic shift from defence to counter-offensive."', // Page 14
  '"Armistice lines drawn in green pencil at Rhodes created 70 years of geopolitical deadlock."', // Page 15
  '"Calling 700,000 displaced refugees \'a minor consequence\' is a guaranteed ticket to a Level 1 mark."', // Page 16
  '"The Law of Return opened Israel\'s gates; you just need to return to your essay plan."', // Page 17
  '"UNRWA camps in Gaza and the West Bank: explain the demographic transformation of the Levant."', // Page 18
  '"Sustained conclusions: weigh political displacement against military security for Band 4."', // Page 19
  '"Eden thought Nasser was Mussolini on the Nile; Eisenhower promptly reminded Eden what year it was."', // Page 20
  '"The Protocol of Sèvres was so top secret the French burnt their copies — don\'t burn your exam paper!"', // Page 21
  '"100-hour blitzkrieg across the Sinai: Moshe Dayan showed the power of pre-emptive armor."', // Page 22
  '"Superpower showdown: US financial threats proved the British Empire was officially over."', // Page 23
  '"Cartographic evidence: chokepoints and armistice lines dictated the rhythm of every Middle East war."', // Page 24
  '"Grade 9 formula: Point, Fact, Consequence — never leave an assertion without its factual anchor."', // Page 25
  '"Synoptic mastery: connect 1917 British pledges to the 1956 Suez crisis in one causal chain."', // Page 26
  '"Final timed assessment: three sustained paragraphs, zero fluff, maximum historical precision."', // Page 27
  'Key Topic 1 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub', // Page 28
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
// 5 DEDICATED KEY TOPIC 1 LESSON CONFIGURATIONS
// ============================================================================
const kt1Configs = [
  {
    lessonIndex: 0,
    lessonNum: 1,
    id: 'lesson_1',
    inquiryQuestion:
      'Why did conflicting British wartime promises make conflict in Palestine inevitable?',
    subTitle:
      'Key Topic 1.1: Imperial Origins, Conflicting Promises & Mandate Tensions (1915–1945)',
    title: 'KT1.1: Imperial Origins & Contradictory Pledges (1915–1945)',
    specAnchor: `<strong>Conflicting interests and demands of Jews and Arabs within the British Mandate</strong>; contextualised by the McMahon-Hussein Correspondence (1915), the secret Sykes-Picot Agreement (1916), the Balfour Declaration (1917), and the 1939 British White Paper.`,
    stages: [
      {
        num: 1,
        step: 1,
        date: '1915–1916',
        questionHeading:
          'Why did Arabs believe Britain promised them independent sovereignty in 1915?',
        bullets: [
          'Sherif Hussein of Mecca',
          'Arab Revolt Against Ottomans',
          'Pledge from High Commissioner',
        ],
        keywords: [
          'Sherif Hussein of Mecca',
          'Arab Revolt Against Ottomans',
          'Pledge from High Commissioner',
        ],
        clue: 'Why did Arabs believe Britain promised them Palestine in 1915?',
        title: 'The McMahon-Hussein Correspondence',
      },
      {
        num: 2,
        step: 2,
        date: 'May 1916',
        questionHeading: 'Why was the secret Sykes-Picot Agreement viewed as an imperial betrayal?',
        bullets: [
          'Anglo-French Imperial Partition',
          'Direct British & French Rule',
          'International Holy Land Zone',
        ],
        keywords: [
          'Anglo-French Imperial Partition',
          'Direct British & French Rule',
          'International Holy Land Zone',
        ],
        clue: 'Why was the secret Sykes-Picot deal seen as an imperial betrayal?',
        title: 'The Secret Sykes-Picot Agreement',
      },
      {
        num: 3,
        step: 3,
        date: 'November 1917',
        questionHeading:
          'How did the Balfour Declaration create contradictory British commitments?',
        bullets: [
          'Letter to Lord Rothschild',
          '"Jewish National Home" Pledge',
          'Safeguarding Arab Civil Rights',
        ],
        keywords: [
          'Letter to Lord Rothschild',
          '"Jewish National Home" Pledge',
          'Safeguarding Arab Civil Rights',
        ],
        clue: 'Why was the Balfour Declaration contradictory to McMahon’s pledge?',
        title: 'The Balfour Declaration',
      },
      {
        num: 4,
        step: 4,
        date: '1920–1936',
        questionHeading:
          'Why did rising Jewish immigration spark communal violence under the Mandate?',
        bullets: [
          'Land Purchases & Evictions',
          '1929 Hebron & Jaffa Clashes',
          'Haganah Self-Defence Force',
        ],
        keywords: [
          'Land Purchases & Evictions',
          '1929 Hebron & Jaffa Clashes',
          'Haganah Self-Defence Force',
        ],
        clue: 'How did rising Jewish immigration spark the 1936 Arab Revolt?',
        title: 'The British Mandate & Rising Immigration',
      },
      {
        num: 5,
        step: 5,
        date: '1936–1939',
        questionHeading: 'Why did the 1939 White Paper turn Zionists against British rule?',
        bullets: [
          '75,000 Five-Year Immigrant Cap',
          'Arab Consent for Future Entry',
          'Zionist Sense of Betrayal',
        ],
        keywords: [
          '75,000 Five-Year Immigrant Cap',
          'Arab Consent for Future Entry',
          'Zionist Sense of Betrayal',
        ],
        clue: 'Why did the 1939 White Paper turn Zionists against Britain?',
        title: 'The Arab Revolt & The 1939 White Paper',
      },
    ],
    vocabPrompt:
      'Explain the fundamental historical distinction between <strong>Zionism</strong> and <strong>Arab Nationalism</strong>. Why did both movements consider the land of Palestine their rightful national territory, and why did this make peaceful compromise under the British Mandate nearly impossible?',
    consequenceA: {
      question: 'Explain one consequence of the Balfour Declaration (November 1917).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Identify a clear consequence (e.g. Arab sense of betrayal or international legitimisation of a Jewish homeland), cite specific factual detail, and explain its long-term impact on tensions in Palestine.',
    },
    consequenceB: {
      question: 'Explain one consequence of the British White Paper of 1939.',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Explain how limiting Jewish immigration to 75,000 over five years alienated Jewish leaders during the Holocaust and triggered armed resistance against British rule.',
    },
    extendedPractice: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing how British wartime diplomacy and policy between 1915 and 1923 created long-term conflict in Palestine. [8 marks]',
      stimulus: ['The McMahon-Hussein Correspondence (1915)', 'The Balfour Declaration (1917)'],
      structureStrip: [
        {
          col: '1. PHASE 1: CONTRADICTORY PLEDGES',
          text: 'Explain McMahon’s 1915 pledge to Sharif Hussein vs the 1917 Balfour Declaration pledging a Jewish national home.',
        },
        {
          col: '2. PHASE 2: SECRET IMPERIAL CARVE-UP',
          text: 'Explain the 1916 Sykes-Picot Agreement carving up Ottoman lands and Arab outrage at perceived imperial betrayal.',
        },
        {
          col: '3. PHASE 3: THE MANDATE & CLASHES',
          text: 'Explain League of Nations Mandate (1922), Churchill White Paper, and early Arab-Jewish friction in Jerusalem.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'McMahon-Hussein (1915) &bull; Sharif Hussein &bull; Sykes-Picot (1916) &bull; Balfour Declaration (1917) &bull; Arthur Balfour &bull; Lord Rothschild &bull; "national home" &bull; League of Nations Mandate (1922) &bull; Yishuv &bull; Arab Nationalism &bull; Jewish immigration',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.1). In Milestone 1, sketch the contradictory British pledges and the imperial boundary line separating British and French mandate zones.',
    },
  },
  {
    lessonIndex: 1,
    lessonNum: 2,
    id: 'lesson_2',
    inquiryQuestion:
      'Why did Britain abandon its Mandate in Palestine and hand the problem to the UN?',
    subTitle: 'Key Topic 1.2: The Collapse of the British Mandate & UN Partition (1945–1947)',
    title: 'KT1.2: Collapse of the Mandate & UN Partition (1945–1947)',
    specAnchor: `<strong>Conflicting interests and demands of Jews and Arabs within the British Mandate</strong>; <strong>Jewish insurgency</strong> (the <strong>Irgun</strong> and <strong>Lehi</strong>); the <strong>bombing of the King David Hotel (July 1946)</strong>; British economic and military exhaustion; the <strong>SS Exodus affair (1947)</strong>; and <strong>UNSCOP recommendations</strong>.`,
    stages: [
      {
        num: 1,
        step: 1,
        date: '1945–1946',
        questionHeading:
          'Why did Bevin strictly enforce the 1,500 monthly refugee immigration limit?',
        bullets: [
          '250,000 Displaced Holocaust Survivors',
          'Threat to Middle East Oil Access',
          'Truman Demands 100,000 Visas',
        ],
        keywords: [
          '250,000 Displaced Holocaust Survivors',
          'Threat to Middle East Oil Access',
          'Truman Demands 100,000 Visas',
        ],
        clue: 'Why did Bevin strictly enforce the 1,500 monthly refugee limit?',
        title: 'Holocaust Survivors & Immigration Caps',
      },
      {
        num: 2,
        step: 2,
        date: 'Nov 1945 – 1946',
        questionHeading:
          'How did Zionist paramilitaries paralyze British infrastructure in Palestine?',
        bullets: [
          'Night of the Trains (153 Rail Cuts)',
          'Irgun & Lehi Paramilitary Alliance',
          'Sabotage of Bridges & Pipelines',
        ],
        keywords: [
          'Night of the Trains (153 Rail Cuts)',
          'Irgun & Lehi Paramilitary Alliance',
          'Sabotage of Bridges & Pipelines',
        ],
        clue: 'How did Zionist paramilitaries paralyze British transport networks?',
        title: 'The Jewish Insurgency & Night of the Trains',
      },
      {
        num: 3,
        step: 3,
        date: '22 July 1946',
        questionHeading: 'Why did targeting the King David Hotel prove Palestine was ungovernable?',
        bullets: [
          'British Military & Civil HQ Destroyed',
          '91 Government Staff Killed',
          'Collapse of British Governing Morale',
        ],
        keywords: [
          'British Military & Civil HQ Destroyed',
          '91 Government Staff Killed',
          'Collapse of British Governing Morale',
        ],
        clue: 'Why did targeting the King David Hotel prove Palestine was ungovernable?',
        title: 'Bombing of the King David Hotel',
      },
      {
        num: 4,
        step: 4,
        date: 'July 1947',
        questionHeading: 'Why did the Sergeants Affair trigger public outrage in Britain?',
        bullets: [
          'Hanged in Eucalyptus Grove',
          'Booby-Trapped Wire Explosives',
          'Anti-Jewish Riots Across the UK',
        ],
        keywords: [
          'Hanged in Eucalyptus Grove',
          'Booby-Trapped Wire Explosives',
          'Anti-Jewish Riots Across the UK',
        ],
        clue: 'Why did the hanged sergeants trigger "bring our boys home" demands?',
        title: 'The Sergeants Affair & Public Backlash',
      },
      {
        num: 5,
        step: 5,
        date: 'Summer–Nov 1947',
        questionHeading:
          'How did the SS Exodus crisis force Britain to surrender the Mandate to the UN?',
        bullets: [
          '4,500 Holocaust Survivors Turned Back',
          'Royal Navy Forced Return to Germany',
          'US Outrage & International Outcry',
        ],
        keywords: [
          '4,500 Holocaust Survivors Turned Back',
          'Royal Navy Forced Return to Germany',
          'US Outrage & International Outcry',
        ],
        clue: 'How did the SS Exodus PR disaster force Britain to surrender the Mandate?',
        title: 'The SS Exodus & UN Referral',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between a <strong>League of Nations Mandate</strong> and <strong>United Nations Partition</strong>. Why did the British government conclude by February 1947 that the Mandate was entirely unworkable, prompting them to refer Palestine to the UN?',
    consequenceA: {
      question: 'Explain one consequence of the bombing of the King David Hotel (July 1946).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Focus on the 91 deaths, the destruction of British military headquarters, and the hardening of British domestic public opinion demanding troop withdrawal from Palestine.',
    },
    consequenceB: {
      question: 'Explain one consequence of the SS Exodus affair (July 1947).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Explain how turning 4,500 Holocaust survivors back to Europe caused an international public relations disaster for Britain, severely alienating US President Truman and global opinion.',
    },
    extendedPractice: {
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the bombing of the King David Hotel (July 1946) for the British decision to withdraw from Palestine. [8 marks]',
      focusAspects: [
        'Destruction of British Military HQ & Security Breakdown',
        'Domestic Economic Exhaustion & Handover to the UN',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: SECURITY BREAKDOWN',
          text: 'Explain how the 91 casualties and destruction of British Secretariat/HQ in Jerusalem shattered security control and proved the Mandate was ungovernable.',
        },
        {
          col: '2. POINT 2: DOMESTIC CRISIS',
          text: 'Detail British post-WWII bankruptcy, 100,000 garrison costs, and the public outcry to "bring our boys home" following Sergeant executions.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: UN REFERRAL',
          text: 'Assess why Foreign Secretary Bevin concluded Britain could not reconcile Zionist and Arab demands, forcing the February 1947 handover to UNSCOP.',
        },
      ],
      connectives:
        'This was of paramount historical importance because... • In particular, a decisive factor was that... • Furthermore, this directly altered developments by... • On the other hand, an alternative critical perspective is that... • Consequently, this transformed relations because... • Ultimately, this was important because...',
      wordBank:
        'King David Hotel (July 1946) &bull; Irgun &bull; Menachem Begin &bull; 91 casualties &bull; British Military HQ &bull; Secretariat &bull; Clement Attlee &bull; Ernest Bevin &bull; financial cost &bull; 100,000 troops &bull; UNSCOP &bull; February 1947 handover',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.2). In Milestone 2, sketch the shattered south-west wing of the King David Hotel and the barbed wire perimeter around British administrative zones.',
    },
  },
  {
    lessonIndex: 1,
    lessonNum: 3,
    id: 'lesson_2_war',
    inquiryQuestion: 'How was the State of Israel established and defended during the 1948–49 War?',
    subTitle: 'Key Topic 1.3: UN Resolution 181, Independence & The 1948–49 War (1947–1949)',
    title: 'KT1.3: UN Resolution 181 & The 1948–49 War (1947–1949)',
    specAnchor: `<strong>UN Resolution 181 (Partition Plan, November 1947)</strong>; <strong>outbreak of civil war</strong>; <strong>the British evacuation</strong>; <strong>David Ben-Gurion’s declaration of the State of Israel (14 May 1948)</strong>; <strong>invasion by five Arab armies</strong>; <strong>the UN truces</strong>; and the <strong>1949 Armistice Agreements (Green Line)</strong>.`,
    stages: [
      {
        num: 1,
        step: 1,
        date: 'Dec 1947 – May 1948',
        questionHeading:
          'Why did Plan Dalet ignite intense fighting along the Tel Aviv–Jerusalem corridor?',
        bullets: [
          'Relieving Blockaded Enclaves',
          'Capture of Arab Villages',
          'Deir Yassin Civilian Panic',
        ],
        keywords: [
          'Relieving Blockaded Enclaves',
          'Capture of Arab Villages',
          'Deir Yassin Civilian Panic',
        ],
        clue: 'Why was securing the Tel Aviv–Jerusalem road vital before 14 May?',
        title: 'Communal Civil War & Plan Dalet',
      },
      {
        num: 2,
        step: 2,
        date: '14 May 1948',
        questionHeading:
          'Why did Ben-Gurion proclaim statehood hours before the British Mandate expired?',
        bullets: [
          'Establish Sovereign Government',
          'Immediate Truman Recognition',
          'Legitimacy to Receive Weapons',
        ],
        keywords: [
          'Establish Sovereign Government',
          'Immediate Truman Recognition',
          'Legitimacy to Receive Weapons',
        ],
        clue: 'Why did Ben-Gurion insist on declaring statehood hours before the British left?',
        title: 'Proclamation of the State of Israel',
      },
      {
        num: 3,
        step: 3,
        date: '15 May 1948',
        questionHeading:
          'Which strategic sectors did the five invading Arab armies seize in May 1948?',
        bullets: [
          'Jordanian Arab Legion Seizes Old City',
          'Egyptian Advance Through Negev',
          'Syrian Thrust in the North',
        ],
        keywords: [
          'Jordanian Arab Legion Seizes Old City',
          'Egyptian Advance Through Negev',
          'Syrian Thrust in the North',
        ],
        clue: 'Which strategic areas did Transjordan’s Arab Legion seize immediately?',
        title: 'Five Arab Armies Invade',
      },
      {
        num: 4,
        step: 4,
        date: 'June–July 1948',
        questionHeading:
          'How did the 4-week UN truce enable Israel to decisively shift military momentum?',
        bullets: [
          'Illegal Czechoslovakian Arms Airlift',
          'Forces Doubled to 108,000 Troops',
          'Consolidation of the Unified IDF',
        ],
        keywords: [
          'Illegal Czechoslovakian Arms Airlift',
          'Forces Doubled to 108,000 Troops',
          'Consolidation of the Unified IDF',
        ],
        clue: 'How did the 4-week UN truce decisively tip military firepower to Israel?',
        title: 'The First UN Truce & Czech Arms Resupply',
      },
      {
        num: 5,
        step: 5,
        date: 'Feb–July 1949',
        questionHeading: 'How did the 1949 Green Line transform the territory allocated by the UN?',
        bullets: [
          'Israel Captures 79% of Palestine',
          'Jordanian Annexation of West Bank',
          'Egyptian Control of Gaza Strip',
        ],
        keywords: [
          'Israel Captures 79% of Palestine',
          'Jordanian Annexation of West Bank',
          'Egyptian Control of Gaza Strip',
        ],
        clue: 'How did the 1949 Green Line transform the borders allocated by UN 181?',
        title: 'Rhodes Armistices & The Green Line',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between the <strong>1947 UN Partition Borders (Resolution 181)</strong> and the <strong>1949 Armistice Green Line</strong>. How did Israel’s military victory in 1948–49 transform the map of the Middle East?',
    consequenceA: {
      question: 'Explain one consequence of United Nations Resolution 181 (November 1947).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Detail how the UN vote to partition Palestine granted international legitimacy to the creation of a Jewish state, but provoked immediate violent rejection and civil war by Palestinian Arabs.',
    },
    consequenceB: {
      question: 'Explain one consequence of the first United Nations truce (June–July 1948).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Explain how Israel used the four-week ceasefire to reorganise command, mobilise recruits, and smuggle in heavy Czechoslovakian weaponry, transforming its military balance against Arab armies.',
    },
    extendedPractice: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the key events of the 1948–49 Arab-Israeli War from the declaration of the State of Israel to the 1949 Armistice Agreements. [8 marks]',
      stimulus: [
        'David Ben-Gurion’s Declaration of Independence (14 May 1948)',
        'The first UN truce and Czechoslovakian arms shipments (June 1948)',
      ],
      structureStrip: [
        {
          col: '1. PHASE 1: ARAB INVASION',
          text: 'Detail Ben-Gurion’s 14 May declaration, the 15 May invasion by 5 Arab armies, and early defensive survival by Haganah/IDF.',
        },
        {
          col: '2. PHASE 2: TURNING POINT TRUCE',
          text: 'Explain how the June 1948 UN truce enabled Israel to import Czechoslovakian weapons and unify command under IDF.',
        },
        {
          col: '3. PHASE 3: ISRAELI OFFENSIVES',
          text: 'Detail Operations Dani and Yoav breaking Arab armies, leading to the 1949 Rhodes Armistice Agreements and Green Line.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'David Ben-Gurion &bull; 14 May 1948 &bull; Tel Aviv Museum &bull; Arab invasion &bull; Egypt, Jordan, Syria, Iraq, Lebanon &bull; Arab Legion &bull; Glubb Pasha &bull; June 1948 truce &bull; Count Folke Bernadotte &bull; Czech arms deal &bull; Operation Dani &bull; Operation Yoav &bull; 1949 Armistices &bull; Green Line',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.3). In Milestones 3 & 4, sketch the UN Partition map divisions and the five Arab invasion routes crossing Israel’s borders.',
    },
  },
  {
    lessonIndex: 2,
    lessonNum: 4,
    id: 'lesson_3',
    inquiryQuestion:
      'Why did the aftermath of the 1948–49 War create a permanent refugee crisis and an armed Israeli state?',
    subTitle:
      'Key Topic 1.4: The Refugee Crisis (Nakba), Israeli Statehood & Border Friction (1949–1955)',
    title: 'KT1.4: The Refugee Crisis (Nakba) & New Israeli State (1948–1954)',
    specAnchor: `<strong>Territorial changes and the refugee status of approximately 700,000 Palestinian Arabs (Al-Nakba)</strong>; creation and role of <strong>UNRWA</strong>; the development of the State of Israel: the <strong>Law of Return (1950)</strong>; the <strong>creation of the Israeli Defence Forces (IDF)</strong>; the role of <strong>US financial aid</strong>; and <strong>early relations between Israel and its Arab neighbours</strong>.`,
    stages: [
      {
        num: 1,
        step: 1,
        date: '1948–1949',
        questionHeading:
          'Why is the cause of the 1948 Palestinian refugee flight (Al-Nakba) contested?',
        bullets: [
          '700,000 Civilians Displaced',
          'Debate: Panic Flight vs Expulsion',
          'Over 400 Abandoned Villages',
        ],
        keywords: [
          '700,000 Civilians Displaced',
          'Debate: Panic Flight vs Expulsion',
          'Over 400 Abandoned Villages',
        ],
        clue: 'Why is the cause of the 1948 Palestinian refugee exodus still contested?',
        title: 'The Palestinian Refugee Flight (Al-Nakba)',
      },
      {
        num: 2,
        step: 2,
        date: 'Dec 1949',
        questionHeading:
          'Why did Arab states and Israel disagree over UN Resolution 194 and UNRWA?',
        bullets: [
          'Palestinian "Right of Return" Demand',
          'Israel Refuses Arab Majority Threat',
          'Tents in Gaza & West Bank Camps',
        ],
        keywords: [
          'Palestinian "Right of Return" Demand',
          'Israel Refuses Arab Majority Threat',
          'Tents in Gaza & West Bank Camps',
        ],
        clue: 'Why did Arab states and Israel disagree over UN Resolution 194?',
        title: 'UN Resolution 194 & Creation of UNRWA',
      },
      {
        num: 3,
        step: 3,
        date: 'July 1950',
        questionHeading:
          'How did the Law of Return transform Israel’s demographics and economy by 1953?',
        bullets: [
          'Automatic Citizenship Guaranteed',
          'Population Doubles to 1.5 Million',
          'Severe Housing & Rationing Crisis',
        ],
        keywords: [
          'Automatic Citizenship Guaranteed',
          'Population Doubles to 1.5 Million',
          'Severe Housing & Rationing Crisis',
        ],
        clue: 'How did the Law of Return transform Israel’s demographics by 1953?',
        title: 'The Israeli Law of Return & Immigration Boom',
      },
      {
        num: 4,
        step: 4,
        date: '1948–1953',
        questionHeading:
          'Why was universal military conscription and US aid essential for Israeli survival?',
        bullets: [
          'Surrounded by Hostile Arab States',
          'Mandatory Service for Men & Women',
          'Vital Financial Lifeline from Washington',
        ],
        keywords: [
          'Surrounded by Hostile Arab States',
          'Mandatory Service for Men & Women',
          'Vital Financial Lifeline from Washington',
        ],
        clue: 'Why was universal conscription essential for Israel’s survival?',
        title: 'IDF Military Consolidation & US Aid',
      },
      {
        num: 5,
        step: 5,
        date: '1949–1954',
        questionHeading:
          'Why did cross-border infiltration trigger Sharon’s Unit 101 raid on Qibya?',
        bullets: [
          'Fedayeen Raids & Crop Harvesting',
          'Dynamiting of 45 Village Houses',
          '69 Palestinian Civilians Killed',
        ],
        keywords: [
          'Fedayeen Raids & Crop Harvesting',
          'Dynamiting of 45 Village Houses',
          '69 Palestinian Civilians Killed',
        ],
        clue: 'Why did Israeli border crossers trigger Sharon’s Unit 101 raid on Qibya?',
        title: 'Border Infiltration & Retaliatory Raids',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between the <strong>Palestinian Nakba</strong> and the <strong>Israeli Law of Return (1950)</strong>. How did the displacement of Palestinians on one hand and the open-door immigration of global Jews on the other create two totally opposing historical realities?',
    consequenceA: {
      question: 'Explain one consequence of the 1948–49 War for Palestinian Arabs.',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Focus on the displacement of approximately 700,000 people, the loss of land, exile into squalid refugee camps in Gaza, the West Bank, Lebanon, and Syria, and their denial of a right of return.',
    },
    consequenceB: {
      question: 'Explain one consequence of the Israeli Law of Return (1950).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Explain how guaranteeing automatic citizenship to any Jewish immigrant doubled Israel’s population within four years, creating severe housing shortages but securing manpower for national defence.',
    },
    extendedPractice: {
      type: 'importance_8',
      tariff: 'Question 3: Explain the Importance [8 marks &bull; 12 mins]',
      stem: 'Explain the importance of the Law of Return (1950) for the development of the new State of Israel in the aftermath of the 1948–49 War. [8 marks]',
      focusAspects: [
        'Demographic Expansion & Absorbing Holocaust Survivors and Mizrahi Jews',
        'Military Manpower & National Consolidation against Arab Neighbours',
      ],
      structureStrip: [
        {
          col: '1. POINT 1: DEMOGRAPHIC GROWTH',
          text: 'Explain how automatic citizenship for all Jewish immigrants absorbed 700,000 refugees and Holocaust survivors, doubling the population.',
        },
        {
          col: '2. POINT 2: MILITARY & BORDER SECURITY',
          text: 'Detail how universal conscription into the IDF and establishing kibbutzim along the Green Line fortified frontiers against Arab neighbours.',
        },
        {
          col: '3. EVALUATIVE SUMMARY: STATE IDENTITY',
          text: 'Assess how the Law fulfilled the founding Zionist mission of a sovereign sanctuary, cementing state legitimacy despite severe rationing.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'Law of Return (1950) &bull; David Ben-Gurion &bull; Jewish diaspora &bull; Holocaust survivors &bull; Displaced Persons camps &bull; Mizrahi Jews &bull; ma’abarot (transit camps) &bull; population doubled &bull; IDF universal conscription &bull; kibbutzim border defense',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.4). In Milestone 5, sketch the overcrowded UNRWA refugee tents alongside the cargo ships arriving in Haifa with Jewish immigrants.',
    },
  },
  {
    lessonIndex: 3,
    lessonNum: 5,
    id: 'lesson_4',
    inquiryQuestion:
      'Why did the nationalisation of the Suez Canal trigger an international crisis in 1956?',
    subTitle: 'Key Topic 1.5: Nasser, Border Tension, the Gaza Raid & The Suez Crisis (1955–1963)',
    title: 'KT1.5: Nasser, Border Tension & The 1956 Suez Crisis (1955–1958)',
    specAnchor: `<strong>Gamal Abdel Nasser and Egypt’s leadership of the Arab world</strong>; cross-border fedayeen raids; the <strong>Israeli raid on Gaza (Feb 1955)</strong>; the <strong>Czech arms deal (1955)</strong>; the <strong>nationalisation of the Suez Canal (July 1956)</strong>; the <strong>secret Protocol of Sèvres</strong>; the <strong>Sinai campaign</strong>; <strong>US and Soviet intervention</strong>; and the <strong>creation of the United Arab Republic (1958)</strong>.`,
    stages: [
      {
        num: 1,
        step: 1,
        date: 'Feb 1955',
        questionHeading:
          'Why did Ben-Gurion’s Gaza raid convince Nasser he needed modern heavy weapons?',
        bullets: [
          '37 Egyptian Soldiers Killed',
          'Humiliation of Egyptian Military',
          'Western Arms Boycott Refusal',
        ],
        keywords: [
          '37 Egyptian Soldiers Killed',
          'Humiliation of Egyptian Military',
          'Western Arms Boycott Refusal',
        ],
        clue: 'Why did Ben-Gurion’s Gaza raid convince Nasser he needed heavy weapons?',
        title: 'The Gaza Raid & Escalating Fedayeen Clashes',
      },
      {
        num: 2,
        step: 2,
        date: 'Sept 1955',
        questionHeading: 'Why did the Czech arms deal alarm Britain, France, and Israel in 1955?',
        bullets: [
          'MiG-15 Jet Fighters & Heavy Tanks',
          'Western Arms Monopoly Broken',
          'Upsetting Regional Balance with Israel',
        ],
        keywords: [
          'MiG-15 Jet Fighters & Heavy Tanks',
          'Western Arms Monopoly Broken',
          'Upsetting Regional Balance with Israel',
        ],
        clue: 'Why did the Czech arms deal alarm Britain, France, and Israel?',
        title: 'The Czech Arms Deal & Cold War Realignment',
      },
      {
        num: 3,
        step: 3,
        date: '26 July 1956',
        questionHeading:
          'Why did Britain and France view canal nationalisation as an intolerable threat?',
        bullets: [
          'Vital Maritime Oil Route to Gulf',
          'Tolls Used to Fund Aswan Dam',
          'Threat to European Imperial Prestige',
        ],
        keywords: [
          'Vital Maritime Oil Route to Gulf',
          'Tolls Used to Fund Aswan Dam',
          'Threat to European Imperial Prestige',
        ],
        clue: 'Why did Britain and France view canal nationalisation as an act of theft?',
        title: 'Nasser Nationalises the Suez Canal',
      },
      {
        num: 4,
        step: 4,
        date: 'Oct–Nov 1956',
        questionHeading:
          'How did the secret Protocol of Sèvres orchestrate a pretext for invading Egypt?',
        bullets: [
          'Secret Tripartite Alliance in Paris',
          'Pre-Planned Anglo-French Ultimatum',
          'Pretext to Reoccupy the Waterway',
        ],
        keywords: [
          'Secret Tripartite Alliance in Paris',
          'Pre-Planned Anglo-French Ultimatum',
          'Pretext to Reoccupy the Waterway',
        ],
        clue: 'How did the secret Protocol of Sèvres orchestrate a fake pretext for war?',
        title: 'The Secret Protocol of Sèvres & Sinai Blitz',
      },
      {
        num: 5,
        step: 5,
        date: 'Nov 1956 – 1958',
        questionHeading:
          'Why did the Suez Crisis end in political triumph for Nasser despite military defeat?',
        bullets: [
          'Eisenhower Threatens British Pound',
          'Humiliating Anglo-French Retreat',
          'Champion of Anti-Imperialism (UAR)',
        ],
        keywords: [
          'Eisenhower Threatens British Pound',
          'Humiliating Anglo-French Retreat',
          'Champion of Anti-Imperialism (UAR)',
        ],
        clue: 'Why did the Suez Crisis end in political triumph for Nasser despite military defeat?',
        title: 'US Ultimatum, UNEF & Arab Leadership',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between <strong>Nationalisation</strong> and <strong>Demilitarisation</strong>. How did Nasser’s nationalisation of the Suez Canal in July 1956 lead directly to the demilitarisation of the Sinai Peninsula monitored by UN peacekeepers (UNEF) in 1957?',
    consequenceA: {
      question: 'Explain one consequence of the Israeli raid on Gaza (February 1955).',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Explain how the death of 37 Egyptian soldiers shattered Nasser’s illusion of military strength, prompting him to seek Soviet weapons through the 1955 Czech arms deal.',
    },
    consequenceB: {
      question:
        'Explain one consequence of the 1956 Suez Crisis for Britain and France as global powers.',
      guidance:
        'Identify one direct consequence (Point), support with precise factual evidence (Fact), and explain how this altered subsequent developments (Consequence).',
      stems:
        'One major consequence was that... • Specifically, this was evident when... • Consequently, this directly resulted in...',
      modelAnswer:
        'Detail how US financial pressure forced an ignominious retreat, proving that European imperial powers could no longer act independently on the world stage without US approval.',
    },
    extendedPractice: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      stem: 'Write a narrative account analysing the events of the 1956 Suez Crisis from the nationalisation of the canal to the withdrawal of Anglo-French forces. [8 marks]',
      stimulus: [
        'President Nasser nationalises the Suez Canal (26 July 1956)',
        'The secret Protocol of Sèvres and Israeli invasion of Sinai (October 1956)',
      ],
      structureStrip: [
        {
          col: '1. PHASE 1: CATALYST & NATIONALISATION',
          text: 'Explain US cancellation of Aswan Dam loans, prompting Nasser to nationalise the Suez Canal on 26 July 1956 to fund the dam.',
        },
        {
          col: '2. PHASE 2: SECRET SÈVRES CONSPIRACY',
          text: 'Detail the secret Protocol of Sèvres where Israel invaded Sinai, providing the pretext for Anglo-French paratrooper landings at Port Said.',
        },
        {
          col: '3. PHASE 3: SUPERPOWER ULTIMATUM',
          text: 'Explain Eisenhower’s financial threat to collapse sterling, forcing humiliating Anglo-French retreat and deploying UNEF.',
        },
      ],
      connectives:
        'The sequence of events was initiated when... • In response to this development... • A decisive turning point occurred when... • Furthermore, tensions escalated because... • As a direct consequence of this... • Ultimately, this culminated in...',
      wordBank:
        'Gamal Abdel Nasser &bull; Aswan High Dam &bull; nationalisation &bull; 26 July 1956 &bull; Anthony Eden &bull; Protocol of Sèvres &bull; Operation Musketeer &bull; Sinai Peninsula &bull; Port Said paratroopers &bull; Dwight D. Eisenhower &bull; oil sanctions &bull; run on the pound &bull; UN Emergency Force (UNEF) &bull; United Arab Republic (1958)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.5). In Milestone 6, sketch the nationalised Suez Canal waterway and the British paratroopers landing at Port Said under US diplomatic pressure.',
    },
  },
];

// ============================================================================
// MAIN GENERATOR FUNCTION: 16-PAGE TWO-PAGE SPREAD WORKBOOK FOR CME KT1
// ============================================================================
function buildCmeKt1TwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 1: The Birth of the State of Israel, 1945–1963 Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
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
    /* 5-Stage Chronological Note-Taking Block Styling (KS3 Enquiry Architecture) */
    .spine-notes-container {
      display: flex;
      flex-direction: column;
      gap: 2.2mm;
      margin-top: 1.5mm;
      flex: 1;
    }
    .spine-stage-block {
      border: 1.2px solid #000;
      background: #fff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .stage-banner {
      background: #000;
      color: #fff;
      font-family: 'Cinzel', 'Times New Roman', serif;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 1.2mm 2mm;
      display: flex;
      align-items: center;
      gap: 1.8mm;
      border-bottom: 1px solid #000;
      letter-spacing: 0.1px;
    }
    .stage-banner .stage-badge {
      background: #fff;
      color: #000;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      padding: 0.2mm 1.4mm;
      border-radius: 1.5px;
      line-height: 1;
    }
    .stage-content-row {
      display: flex;
      flex-direction: row;
      min-height: 38mm;
    }
    .stage-trigger-col {
      width: 26mm;
      background: #fbfbfb;
      border-right: 1.2px solid #000;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 1mm 1.5mm;
      box-sizing: border-box;
    }
    .trigger-fact-cell {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 5.6pt;
      font-weight: 700;
      color: #111;
      line-height: 1.15;
    }
    .trigger-fact-cell .fact-dot {
      color: #000;
      font-size: 6.5pt;
      margin-right: 0.8mm;
    }
    .stage-writing-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;
      box-sizing: border-box;
    }
    .ruled-line {
      height: 6.33mm;
      border-bottom: 0.5px solid #000000;
      box-sizing: border-box;
    }
    .ruled-line:last-child {
      border-bottom: none;
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

  const coverImgPath = path.resolve('public/units/cme_new/assets/kt1_cover.jpg');
  let coverImgSrc = '/units/cme_new/assets/kt1_cover.jpg';
  if (fs.existsSync(coverImgPath)) {
    const coverImgBase64 = fs.readFileSync(coverImgPath).toString('base64');
    coverImgSrc = `data:image/jpeg;base64,${coverImgBase64}`;
  }

  // Map images for Page 14 Cartographic Masterclass
  const palestine1949MapPath = path.resolve('public/units/cme_new/assets/palestine_1949_map.png');
  let palestine1949MapSrc = '/units/cme_new/assets/palestine_1949_map.png';
  if (fs.existsSync(palestine1949MapPath)) {
    const b64 = fs.readFileSync(palestine1949MapPath).toString('base64');
    palestine1949MapSrc = `data:image/png;base64,${b64}`;
  }

  const suez1956MapPath = path.resolve(
    'public/units/cme_new/assets/cme_suez_1956_campaign_map.jpg',
  );
  let suez1956MapSrc = '/units/cme_new/assets/cme_suez_1956_campaign_map.jpg';
  if (fs.existsSync(suez1956MapPath)) {
    const b64 = fs.readFileSync(suez1956MapPath).toString('base64');
    suez1956MapSrc = `data:image/jpeg;base64,${b64}`;
  }

  // ====================================================================
  // ====================================================================
  // PAGE 1: OUTSIDE FRONT COVER (Master Architectural Cover)
  // ====================================================================
  html += renderStandardFrontCover({
    unitId: 'cme_new',
    paperTitle: 'EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
    specCode: 'SPECIFICATION 1HI0/2B',
    keyTopicNum: 1,
    dateRange: '1945–1963',
    title: 'The Birth of the State of Israel, 1945–1963',
    subtitle:
      'British Mandate Collapse, King David Hotel, UN Resolution 181, The 1948 War, The Nakba &amp; The Suez Crisis',
    heroImage: {
      src: coverImgSrc,
      alt: 'David Ben-Gurion Declaring the State of Israel, Tel Aviv',
      objectPosition: 'center 36%',
      shelfmark: 'GPO-D597-087',
      date: '14 May 1948',
      title: 'Proclamation of the State of Israel, Tel Aviv Museum of Art',
      caption:
        'Rudi Weissenstein (1910–1969) &bull; David Ben-Gurion, Executive Head of the World Zionist Organisation, reads the Declaration of Independence beneath the portrait of Theodor Herzl on 5 Iyyar 5708. Registered in the State of Israel Government Press Office archive under Accession Shelfmark GPO-D597-087.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 100,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification &bull; Key Topic 1 Content',
      subtopics: [
        {
          title: '1. The British Withdrawal &amp; Israel',
          items: [
            '<strong>Mandate Nationalist Rivalry:</strong> Conflicting demands of Palestinian Arabs and Zionists; British White Paper immigration quotas vs post-Holocaust survivor influx.',
            '<strong>Zionist Insurgency (1945–47):</strong> Armed campaigns by Irgun and Lehi targeting British administration, culminating in the King David Hotel bombing (July 1946).',
            '<strong>UN Partition Plan (1947):</strong> UN Resolution 181 voting to divide Palestine (56% Jewish / 43% Arab), accepted by Jewish Agency and rejected by Arab states.',
            '<strong>The First Arab-Israeli War (1948–49):</strong> Proclamation of Israel, five Arab army invasions, Czech arms supplies, and the 1949 Green Line armistices.',
          ],
        },
        {
          title: '2. Aftermath of the 1948–49 War',
          items: [
            '<strong>Territorial Division:</strong> Israeli control expanding to 78% of Mandate Palestine, Transjordan annexing the West Bank, and Egyptian military rule in Gaza.',
            '<strong>The Palestinian Refugee Crisis (Al-Nakba):</strong> Permanent displacement of 700,000 Palestinian Arabs into exile and establishment of UNRWA relief camps.',
            '<strong>State Security &amp; Immigration:</strong> Formation of the Israeli Defence Forces (IDF) and the 1950 Law of Return absorbing over 680,000 Jewish refugees.',
            '<strong>Superpower Alliances:</strong> Early United States financial aid and diplomatic recognition establishing an enduring strategic partnership.',
            '<strong>Cross-Border Skirmishes:</strong> Infiltration of Palestinian fedayeen from Gaza and fierce Israeli military reprisals escalating border volatility.',
          ],
        },
        {
          title: '3. Increased Tension, 1955–63',
          items: [
            '<strong>Pan-Arab Leadership:</strong> Gamal Abdel Nasser assumes Egyptian presidency, championing Arab nationalism, anti-colonialism, and regional unity.',
            '<strong>Gaza Raid &amp; Arms Deal (1955):</strong> Israeli retaliatory strike in Gaza prompting Nasser to secure large-scale modern Soviet-Czech weaponry.',
            '<strong>The Suez Crisis (1956):</strong> Nasser nationalises the Suez Canal; secret Protocol of Sèvres between Britain, France, and Israel leads to the Sinai invasion.',
            '<strong>Crisis Aftermath (1957–63):</strong> US financial ultimatums force humiliating European withdrawal, UNEF deployed in Sinai, and creation of the UAR (1958).',
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
            Living Timeline &bull; Part 1: Imperial Pledges, Insurgency &amp; Partition (1917–1947)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Throughout this unit, illustrate each historical milestone inside its dedicated sketchpad box below. Use the dual-coding prompt to combine symbolic diagrams, causal arrows, and key dates.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1: NOV 1917 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                NOV 1917 &bull; The Balfour Declaration &amp; Contradictory British Promises
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              British Foreign Secretary Arthur Balfour writes to Lord Rothschild promising British support for the establishment of a "national home for the Jewish people" in Palestine. This directly contradicts Britain’s 1915 pledge to Sharif Hussein of Mecca and the secret 1916 Sykes-Picot Agreement dividing the Middle East with France.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a balance scale weighing Balfour's letter (1917) against the McMahon-Hussein pledge (1915), or map the Sykes-Picot partition line.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 2: JULY 1946 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                JULY 1946 &bull; The Bombing of the King David Hotel, Jerusalem
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Disguised as milkmen, militants from the Zionist paramilitary group Irgun, led by Menachem Begin, detonate 350kg of explosives in the basement of the King David Hotel. The blast collapses the entire south-west wing housing British military headquarters, killing 91 British, Arab, and Jewish staff.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch the hotel facade with milk churn explosives in the basement, an outward blast wave, and Irgun's paramilitary emblem.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 3: NOV 1947 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                NOV 1947 &bull; UN Resolution 181 (The Palestine Partition Plan)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              The United Nations General Assembly votes 33 to 13 to terminate the British Mandate and partition Palestine into separate Arab and Jewish states, with Jerusalem placed under international United Nations trusteeship. The Jewish Agency accepts; all Arab nations reject the plan, triggering civil war.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch an outline map showing the partitioned Arab (43%) and Jewish (56%) zones, with Jerusalem under a UN emblem.</span></span>
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
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Statehood, The Nakba &amp; The Suez Crisis (1948–1956)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual symbols, causal arrows, and dates) to master the chronological spine.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 4: MAY 1948 – 1949 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                MAY 1948 &bull; Declaration of Independence &amp; The 1948–49 Arab-Israeli War
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              On 14 May 1948, David Ben-Gurion proclaims the State of Israel as British forces complete their evacuation. The next day, five Arab states (Egypt, Transjordan, Syria, Iraq, Lebanon) invade. Israel survives initial assaults, re-arms during the June UN truce via Czechoslovakia, and signs armistices along the 1949 Green Line.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch Ben-Gurion declaring statehood beneath the Star of David, with 5 converging Arab invasion arrows repelled to the 1949 Green Line.</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 5: 1948–1950 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                1948–1950 &bull; The Palestinian Refugee Crisis (Al-Nakba) &amp; Law of Return
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Approximately 700,000 Palestinian Arabs are displaced into permanent exile (Al-Nakba), supported by the newly formed UNRWA in Gaza, the West Bank, Lebanon, and Syria. Simultaneously, Israel passes the 1950 Law of Return, absorbing over 680,000 Holocaust survivors and Mizrahi Jewish refugees from Arab lands.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a split diagram: Palestinian refugee tents / UNRWA ration cards (left) vs immigrant ships arriving under the 1950 Law of Return (right).</span></span>
              <span style="font-size: 6.2pt; color: #555555; font-weight: 700; text-transform: uppercase; white-space: nowrap; margin-left: 8px;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 6: OCT–NOV 1956 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.8pt; color: #000000;">
                OCT–NOV 1956 &bull; The Suez Crisis &amp; The Protocol of Sèvres
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              Following Nasser’s nationalisation of the Suez Canal, Britain, France, and Israel secretly sign the Protocol of Sèvres. Israel invades the Sinai on 29 October; Britain and France intervene to "separate the combatants" and seize the canal. US financial ultimatums force a humiliating Anglo-French withdrawal, leaving UNEF peacekeepers in Sinai.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 44mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.2pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; letter-spacing: 0.3px; color: #000000;">Milestone Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Sketch a tripartite causal flowchart: Israeli Sinai strike &rarr; Anglo-French canal landing &rarr; US economic ultimatum forcing withdrawal.</span></span>
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
  // PAGES 4–23: 5 DEDICATED FOUR-PAGE ENQUIRY SPREADS (2 SPANNING SPREADS PER LESSON)
  // ====================================================================
  kt1Configs.forEach((cfg) => {
    const leftPageNum = 4 + (cfg.lessonNum - 1) * 4; // Spread 1 Left (Verso): Chronological Spine + Vocab
    const rightPageNum = leftPageNum + 1; // Spread 1 Right (Recto): Open Ruled Lesson Notebook
    const linedLeftPageNum = leftPageNum + 2; // Spread 2 Left (Verso): Exam Practice & Planning Scaffold
    const linedRightPageNum = leftPageNum + 3; // Spread 2 Right (Recto): Extended Response & Band 4 Rubric
    const rx = cfg.extendedPractice;

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
            KEY TOPIC 1.${cfg.lessonNum} &bull; ENQUIRY LESSON NOTEBOOK
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
      <div class="spine-notes-container">
        ${cfg.stages
          .map((stg) => {
            const bullets =
              stg.bullets && stg.bullets.length
                ? stg.bullets
                : stg.keywords || [stg.clue || stg.title];
            return `
          <div class="spine-stage-block">
            <div class="stage-banner">
              <span class="stage-badge">${stg.num || stg.step}</span>
              <span>${stg.date ? `${stg.date} • ` : ''}${stg.questionHeading || stg.title || stg.clue}</span>
            </div>
            <div class="stage-content-row">
              <div class="stage-trigger-col">
                ${bullets
                  .slice(0, 3)
                  .map(
                    (b) => `
                  <div class="trigger-fact-cell">
                    <span class="fact-dot">•</span>${b}
                  </div>
                `,
                  )
                  .join('')}
              </div>
              <div class="stage-writing-col">
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
              </div>
            </div>
          </div>
        `;
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
          KEY TOPIC 1.${cfg.lessonNum} &bull; EDEXCEL EXAM PRACTICE
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
    keyTopicNum: 1,
    trackerTitle: 'Student Assessment Record • Key Topic 1 Tracker',
    trackerSubtitle:
      'Paper 2: Conflict in the Middle East, 1945–1995 • The Creation of the State of Israel (1945–1956)',
    enquiries: [
      {
        num: 1,
        code: 'KT1.1',
        title: 'Imperial Origins & Promises',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 2,
        code: 'KT1.2',
        title: 'Mandate Collapse & King David',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 3,
        code: 'KT1.3',
        title: 'UN Res 181 & The 1948–49 War',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q2',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 4,
        code: 'KT1.4',
        title: 'Nakba & The Law of Return',
        doNowMarks: 10,
        q1aMarks: 4,
        q1bMarks: 4,
        extType: 'Q3',
        extMarks: 8,
        totalMarks: 26,
      },
      {
        num: 5,
        code: 'KT1.5',
        title: 'Nasser & The 1956 Suez Crisis',
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
        label: 'KT 1.1: Imperial Pledges',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=0`,
      },
      {
        label: 'KT 1.2: Mandate Collapse',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=1`,
      },
      {
        label: 'KT 1.3: UN 181 & 1948 War',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=2`,
      },
      {
        label: 'KT 1.4: Nakba & Statehood',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=3`,
      },
      {
        label: 'KT 1.5: Nasser & Suez 1956',
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=4`,
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
    const html = buildCmeKt1TwoPageWorkbook({}, { name: 'KT1' });
    const publicHtml = path.join(rootDir, 'public', 'units', 'cme_new', 'pupil_workbook_KT1.html');
    const unitHtml = path.join(rootDir, 'units', 'cme_new', 'pupil_workbook_KT1.html');
    fs.mkdirSync(path.dirname(publicHtml), { recursive: true });
    fs.mkdirSync(path.dirname(unitHtml), { recursive: true });
    fs.writeFileSync(publicHtml, html, 'utf8');
    fs.writeFileSync(unitHtml, html, 'utf8');
    console.log(`✅ Saved HTML: ${publicHtml}`);

    const pdfPath = path.join(rootDir, 'public', 'pdfs', 'cme_new_pupil_workbook_KT1.pdf');
    const v17Path = path.join(
      rootDir,
      'public',
      'pdfs',
      'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    );
    console.log(`🖨️ Compiling PDF with Puppeteer & Dynamic Auto-Lines...`);
    await compilePdf(publicHtml, pdfPath, v17Path);
    console.log(`✅ Compiled PDF: ${v17Path}`);
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildCmeKt1TwoPageWorkbook };
