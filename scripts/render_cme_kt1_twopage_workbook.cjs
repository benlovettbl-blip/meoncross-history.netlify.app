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
        step: 1,
        keywords: [
          'Sherif Hussein of Mecca',
          'High Commissioner McMahon',
          'Arab Revolt against Ottomans',
          'Pledge of Arab independence',
        ],
        clue: 'Why did Arabs believe Britain promised them Palestine in 1915?',
        date: '1915–1916',
        title: 'The McMahon-Hussein Correspondence',
      },
      {
        step: 2,
        keywords: [
          'Mark Sykes & François Picot',
          'Secret British-French treaty',
          'Middle East imperial carve-up',
          'International administration zone',
        ],
        clue: 'Why was the secret Sykes-Picot deal seen as an imperial betrayal?',
        date: 'May 1916',
        title: 'The Secret Sykes-Picot Agreement',
      },
      {
        step: 3,
        keywords: [
          'Foreign Sec Arthur Balfour',
          'Lord Walter Rothschild',
          '"National home for Jewish people"',
          'Safeguard civil & religious rights',
        ],
        clue: 'Why was the Balfour Declaration contradictory to McMahon’s pledge?',
        date: 'November 1917',
        title: 'The Balfour Declaration',
      },
      {
        step: 4,
        keywords: [
          'League of Nations Mandate',
          '1929 Jaffa & Hebron riots',
          '1936–39 Arab Great Revolt',
          'Haganah Jewish defence militia',
        ],
        clue: 'How did rising Jewish immigration spark the 1936 Arab Revolt?',
        date: '1920–1936',
        title: 'The British Mandate & Rising Immigration',
      },
      {
        step: 5,
        keywords: [
          'Colonial Sec Malcolm MacDonald',
          '75,000 Jewish entry cap (5 yrs)',
          'Arab consent for future entry',
          'Zionist sense of betrayal',
        ],
        clue: 'Why did the 1939 White Paper turn Zionists against Britain?',
        date: '1936–1939',
        title: 'The Arab Revolt & The 1939 White Paper',
      },
    ],
    vocabPrompt:
      'Explain the fundamental historical distinction between <strong>Zionism</strong> and <strong>Arab Nationalism</strong>. Why did both movements consider the land of Palestine their rightful national territory, and why did this make peaceful compromise under the British Mandate nearly impossible?',
    consequenceA: {
      question: 'Explain one consequence of the Balfour Declaration (November 1917).',
      guidance:
        'Identify a clear consequence (e.g. Arab sense of betrayal or international legitimisation of a Jewish homeland), cite specific factual detail, and explain its long-term impact on tensions in Palestine.',
      stems:
        'One consequence of the Balfour Declaration was... Specifically, Foreign Secretary Arthur Balfour promised... This directly resulted in Arab opposition because...',
    },
    consequenceB: {
      question: 'Explain one consequence of the British White Paper of 1939.',
      guidance:
        'Explain how limiting Jewish immigration to 75,000 over five years alienated Jewish leaders during the Holocaust and triggered armed resistance against British rule.',
      stems:
        'One consequence of the 1939 White Paper was... In particular, Britain restricted... Consequently, the Jewish community (Yishuv) felt betrayed and...',
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
        'The conflict originated during WWI when Britain... &bull; In direct reaction, Arab forces launched... &bull; Crucially, contradictory promises emerged because... &bull; Consequently, when the League of Nations ratified... &bull; This fundamentally altered relations because... &bull; Ultimately, this resulted in unresolvable conflict because...',
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
        step: 1,
        keywords: [
          '250,000 Displaced Persons (DPs)',
          'Foreign Sec Ernest Bevin',
          '1,500 monthly entry quota',
          'Truman calls for 100,000 visas',
        ],
        clue: 'Why did Bevin strictly enforce the 1,500 monthly refugee limit?',
        date: '1945–1946',
        title: 'Holocaust Survivors & Immigration Caps',
      },
      {
        step: 2,
        keywords: [
          'United Resistance Movement',
          'Haganah, Irgun & Lehi alliance',
          'Night of Trains (153 rail cuts)',
          'Guerilla raids & oil sabotage',
        ],
        clue: 'How did Zionist paramilitaries paralyze British transport networks?',
        date: 'Nov 1945 – 1946',
        title: 'The Jewish Insurgency & Night of the Trains',
      },
      {
        step: 3,
        keywords: [
          'Menachem Begin (Irgun commander)',
          '350kg explosives in milk churns',
          'British military & civil HQ',
          '91 officials & staff killed',
        ],
        clue: 'Why did targeting the King David Hotel prove Palestine was ungovernable?',
        date: '22 July 1946',
        title: 'Bombing of the King David Hotel',
      },
      {
        step: 4,
        keywords: [
          'Sgts Clifford Martin & Mervyn Paice',
          'Retaliation for Acre hangings',
          'Booby-trapped bodies in grove',
          'UK anti-Jewish riots & outcry',
        ],
        clue: 'Why did the hanged sergeants trigger "bring our boys home" demands?',
        date: 'July 1947',
        title: 'The Sergeants Affair & Public Backlash',
      },
      {
        step: 5,
        keywords: [
          'SS Exodus (4,500 refugees)',
          'Royal Navy forced German return',
          'US outrage & loan threats',
          'UNSCOP recommendation (Feb 1947)',
        ],
        clue: 'How did the SS Exodus PR disaster force Britain to surrender the Mandate?',
        date: 'Summer–Nov 1947',
        title: 'The SS Exodus & UN Referral',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between a <strong>League of Nations Mandate</strong> and <strong>United Nations Partition</strong>. Why did the British government conclude by February 1947 that the Mandate was entirely unworkable, prompting them to refer Palestine to the UN?',
    consequenceA: {
      question: 'Explain one consequence of the bombing of the King David Hotel (July 1946).',
      guidance:
        'Focus on the 91 deaths, the destruction of British military headquarters, and the hardening of British domestic public opinion demanding troop withdrawal from Palestine.',
      stems:
        'One consequence of the bombing of the King David Hotel was... Specifically, the Irgun detonated explosives that killed 91 people, which caused... As a result, the British public and government...',
    },
    consequenceB: {
      question: 'Explain one consequence of the SS Exodus affair (July 1947).',
      guidance:
        'Explain how turning 4,500 Holocaust survivors back to Europe caused an international public relations disaster for Britain, severely alienating US President Truman and global opinion.',
      stems:
        'One consequence of the SS Exodus affair was... In particular, British warships boarded the ship and returned refugees to Germany, causing... Consequently, international and US pressure on Britain to...',
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
        'This was of paramount importance because... &bull; Specifically, the bombing destroyed... &bull; Furthermore, British public opinion hardened when... &bull; Crucially, maintaining 100,000 troops cost... &bull; Consequently, Prime Minister Attlee decided to... &bull; Ultimately, this was important because it made British withdrawal inevitable.',
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
        step: 1,
        keywords: [
          'UN Resolution 181 partition (55%/45%)',
          'Plan Dalet (Plan D offensive)',
          'Tel Aviv–Jerusalem convoy ambushes',
          'Deir Yassin massacre & panic',
          'British military non-intervention',
        ],
        clue: 'Why was securing the Tel Aviv–Jerusalem road vital before 14 May?',
        date: 'Dec 1947 – May 1948',
        title: 'Communal Civil War & Plan Dalet',
      },
      {
        step: 2,
        keywords: [
          'David Ben-Gurion declaration',
          'Tel Aviv Museum of Art',
          'Theodor Herzl portrait',
          'US Truman recognition in 11 mins',
          'British Mandate expires at midnight',
        ],
        clue: 'Why did Ben-Gurion insist on declaring statehood hours before the British left?',
        date: '14 May 1948',
        title: 'Proclamation of the State of Israel',
      },
      {
        step: 3,
        keywords: [
          'Egypt, Transjordan, Syria, Iraq, Lebanon',
          'Multi-front coordinated assault',
          'Glubb Pasha & Arab Legion',
          'Old City of Jerusalem captured',
          'Severe Israeli heavy weapons deficit',
        ],
        clue: 'Which strategic areas did Transjordan’s Arab Legion seize immediately?',
        date: '15 May 1948',
        title: 'Five Arab Armies Invade',
      },
      {
        step: 4,
        keywords: [
          'Count Folke Bernadotte 28-day truce',
          'Operation Balak Czech arms airlift',
          '25,000 rifles & Avia fighter planes',
          'Unified IDF command established',
          'Bernadotte assassinated by Lehi',
        ],
        clue: 'How did the 4-week UN truce decisively tip military firepower to Israel?',
        date: 'June–July 1948',
        title: 'The First UN Truce & Czech Arms Resupply',
      },
      {
        step: 5,
        keywords: [
          'UN mediator Ralph Bunche',
          '1949 Rhodes Armistice Agreements',
          'Green Line borders (Israel 79%)',
          'Transjordan annexes West Bank',
          'Egypt controls Gaza Strip',
        ],
        clue: 'How did the 1949 Green Line transform the borders allocated by UN 181?',
        date: 'Feb–July 1949',
        title: 'Rhodes Armistices & The Green Line',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between the <strong>1947 UN Partition Borders (Resolution 181)</strong> and the <strong>1949 Armistice Green Line</strong>. How did Israel’s military victory in 1948–49 transform the map of the Middle East?',
    consequenceA: {
      question: 'Explain one consequence of United Nations Resolution 181 (November 1947).',
      guidance:
        'Detail how the UN vote to partition Palestine granted international legitimacy to the creation of a Jewish state, but provoked immediate violent rejection and civil war by Palestinian Arabs.',
      stems:
        'One consequence of UN Resolution 181 was... Specifically, the UN voted to allocate 55% of Palestine to a Jewish state, which resulted in... Consequently, civil conflict broke out immediately between...',
    },
    consequenceB: {
      question: 'Explain one consequence of the first United Nations truce (June–July 1948).',
      guidance:
        'Explain how Israel used the four-week ceasefire to reorganise command, mobilise recruits, and smuggle in heavy Czechoslovakian weaponry, transforming its military balance against Arab armies.',
      stems:
        'One consequence of the June 1948 UN truce was... During the four-week pause, Israeli forces... This directly resulted in Israel gaining military superiority because...',
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
        'The war commenced on 14 May 1948 when... &bull; Immediately on 15 May, five Arab armies... &bull; The vital turning point occurred during the June truce when... &bull; With Czechoslovakian weapons secured, the IDF launched... &bull; Consequently, Arab armies were pushed back because... &bull; Ultimately, the 1949 Armistices established...',
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
        step: 1,
        keywords: [
          '700,000+ Palestinians displaced',
          'Contested causes: flight vs expulsion',
          'Destruction of 400+ Arab villages',
          'Loss of homes, farmland & property',
          'Al-Nakba ("The Catastrophe")',
        ],
        clue: 'Why is the cause of the 1948 Palestinian refugee exodus still contested?',
        date: '1948–1949',
        title: 'The Palestinian Refugee Flight (Al-Nakba)',
      },
      {
        step: 2,
        keywords: [
          'UN General Assembly Res 194',
          'Palestinian "Right of Return" principle',
          'Creation of UNRWA relief agency',
          'Camps in Gaza, West Bank, Jordan, Lebanon',
          'Refugees denied resettlement',
        ],
        clue: 'Why did Arab states and Israel disagree over UN Resolution 194?',
        date: 'Dec 1949',
        title: 'UN Resolution 194 & Creation of UNRWA',
      },
      {
        step: 3,
        keywords: [
          'Law of Return enacted (Knesset)',
          'Automatic citizenship for any Jew',
          'Holocaust survivors & Mizrahi Jews',
          'Jewish population doubles in 3 yrs',
          "Ma'abarot transit tent camps",
        ],
        clue: 'How did the Law of Return transform Israel’s demographics by 1953?',
        date: 'July 1950',
        title: 'The Israeli Law of Return & Immigration Boom',
      },
      {
        step: 4,
        keywords: [
          'Integration of Haganah, Irgun & Lehi',
          'Universal compulsory military service',
          'US government grants & soft loans',
          'American Jewish diaspora fundraising',
          'Technological & defensive edge',
        ],
        clue: 'Why was universal conscription essential for Israel’s survival?',
        date: '1948–1953',
        title: 'IDF Military Consolidation & US Aid',
      },
      {
        step: 5,
        keywords: [
          'Palestinian refugee border crossers',
          'Stealing crops vs armed sabotage',
          'IDF Unit 101 (Ariel Sharon)',
          '1953 Qibya raid (69 civilians killed)',
          'Severe international condemnation',
        ],
        clue: 'Why did Israeli border crossers trigger Sharon’s Unit 101 raid on Qibya?',
        date: '1949–1954',
        title: 'Border Infiltration & Retaliatory Raids',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between the <strong>Palestinian Nakba</strong> and the <strong>Israeli Law of Return (1950)</strong>. How did the displacement of Palestinians on one hand and the open-door immigration of global Jews on the other create two totally opposing historical realities?',
    consequenceA: {
      question: 'Explain one consequence of the 1948–49 War for Palestinian Arabs.',
      guidance:
        'Focus on the displacement of approximately 700,000 people, the loss of land, exile into squalid refugee camps in Gaza, the West Bank, Lebanon, and Syria, and their denial of a right of return.',
      stems:
        'One consequence of the 1948–49 War for Palestinian Arabs was the creation of a permanent refugee crisis. Specifically, over 700,000 Palestinians fled or were expelled, resulting in... Consequently, generations of Palestinians were forced to live in...',
    },
    consequenceB: {
      question: 'Explain one consequence of the Israeli Law of Return (1950).',
      guidance:
        'Explain how guaranteeing automatic citizenship to any Jewish immigrant doubled Israel’s population within four years, creating severe housing shortages but securing manpower for national defence.',
      stems:
        'One consequence of the Law of Return was a massive demographic explosion in Israel. In particular, the law granted every Jewish person the right to settle, causing... This directly resulted in...',
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
        'This was crucial for Israel’s development because... &bull; Specifically, the 1950 Law guaranteed... &bull; Consequently, over 700,000 immigrants arrived, which... &bull; Furthermore, this demographic influx enabled the IDF to... &bull; Crucially, placing new arrivals in border kibbutzim ensured... &bull; Ultimately, this transformed Israel from a fragile enclave into...',
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
        step: 1,
        keywords: [
          'President Gamal Abdel Nasser',
          'IDF Gaza Raid (37 Egyptians killed)',
          'Egyptian army humiliation',
          'State-sponsored fedayeen attacks',
          'Voice of the Arabs radio propaganda',
        ],
        clue: 'Why did Ben-Gurion’s Gaza raid convince Nasser he needed heavy weapons?',
        date: 'Feb 1955',
        title: 'The Gaza Raid & Escalating Fedayeen Clashes',
      },
      {
        step: 2,
        keywords: [
          'Czech Arms Deal via USSR',
          'MiG-15 fighters & T-34 tanks',
          'Western arms monopoly broken',
          'US cancels Aswan High Dam loans',
          'Soviet geopolitical entry to Mideast',
        ],
        clue: 'Why did the Czech arms deal alarm Britain, France, and Israel?',
        date: 'Sept 1955',
        title: 'The Czech Arms Deal & Cold War Realignment',
      },
      {
        step: 3,
        keywords: [
          'Alexandria speech ("de Lesseps" codeword)',
          'Canal revenues fund Aswan Dam',
          'Anglo-French maritime lifeline seized',
          'Closure of Straits of Tiran',
          'PM Anthony Eden vows to remove Nasser',
        ],
        clue: 'Why did Britain and France view canal nationalisation as an act of theft?',
        date: '26 July 1956',
        title: 'Nasser Nationalises the Suez Canal',
      },
      {
        step: 4,
        keywords: [
          'Secret Protocol of Sèvres collusion',
          'Britain, France & Israel plot',
          'Operation Kadesh IDF Sinai assault',
          'Anglo-French ultimatum & Port Said bombs',
          'Paratroopers at Mitla Pass',
        ],
        clue: 'How did the secret Protocol of Sèvres orchestrate a fake pretext for war?',
        date: 'Oct–Nov 1956',
        title: 'The Secret Protocol of Sèvres & Sinai Blitz',
      },
      {
        step: 5,
        keywords: [
          'President Eisenhower financial threats',
          'Sterling run forces UK ceasefire',
          'UNEF peacekeepers in Sinai',
          'Nasser emerges as Pan-Arab hero',
          'United Arab Republic formed (1958)',
        ],
        clue: 'Why did the Suez Crisis end in political triumph for Nasser despite military defeat?',
        date: 'Nov 1956 – 1958',
        title: 'US Ultimatum, UNEF & Arab Leadership',
      },
    ],
    vocabPrompt:
      'Explain the crucial historical difference between <strong>Nationalisation</strong> and <strong>Demilitarisation</strong>. How did Nasser’s nationalisation of the Suez Canal in July 1956 lead directly to the demilitarisation of the Sinai Peninsula monitored by UN peacekeepers (UNEF) in 1957?',
    consequenceA: {
      question: 'Explain one consequence of the Israeli raid on Gaza (February 1955).',
      guidance:
        'Explain how the death of 37 Egyptian soldiers shattered Nasser’s illusion of military strength, prompting him to seek Soviet weapons through the 1955 Czech arms deal.',
      stems:
        'One consequence of the Israeli raid on Gaza was Nasser’s decision to rearm Egypt with Soviet weapons. In particular, Israeli paratroopers killed 37 Egyptian soldiers, which humiliated Nasser and proved Egyptian weakness. Consequently, Nasser turned to the Soviet bloc and signed the September 1955 Czech arms deal...',
    },
    consequenceB: {
      question:
        'Explain one consequence of the 1956 Suez Crisis for Britain and France as global powers.',
      guidance:
        'Detail how US financial pressure forced an ignominious retreat, proving that European imperial powers could no longer act independently on the world stage without US approval.',
      stems:
        'One consequence of the Suez Crisis was the collapse of British and French imperial prestige. Specifically, US President Eisenhower threatened to collapse the British pound unless forces withdrew immediately. This directly resulted in the humiliation of Britain and France, proving that they were no longer...',
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
        'The crisis began on 26 July 1956 when President Nasser... &bull; In response, Britain and France secretly allied with Israel through... &bull; On 29 October 1956, the plan unfolded when Israeli forces invaded... &bull; Under the pretext of separating the combatants, Anglo-French paratroopers... &bull; However, US President Eisenhower intervened decisively by... &bull; Consequently, Britain and France were forced into a humiliating retreat, resulting in...',
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
    .task-section {
      margin-bottom: 2px;
    }
    /* Thick Black Writing Lines for Accessibility & SEND Legibility */
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
