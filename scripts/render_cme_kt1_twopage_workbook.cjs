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

// Approved Witty Revision Quips for CME Key Topic 1
const approvedFunnyFooters = [
  '"Remember: In history exams, \'they had a disagreement\' is worth 0 marks. Give the dates!"', // Page 1
  '"Diplomacy 101: Never promise the exact same slice of land to three different people at once."', // Page 2
  '"Sykes and Picot drew borders with a pencil and a ruler — please be slightly more careful with your map sketches!"', // Page 3
  '"The 1939 White Paper managed to infuriate absolutely everyone: truly the peak of British compromise."', // Page 4
  '"Saying \'Britain was tired after the war\' is true, but the examiner expects 8 marks of depth!"', // Page 5
  '"Irgun checked into the King David Hotel with milk churns... and checked Britain out of the Mandate."', // Page 6
  '"UN Resolution 181 gave each side a jigsaw puzzle; neither side liked the picture."', // Page 7
  '"Ben-Gurion proclaimed independence in 16 minutes flat: you have 12 minutes for this narrative!"', // Page 8
  '"Five invading Arab armies, zero unified commanders: coordination counts in war and in paragraphs."', // Page 9
  '"Calling 700,000 displaced refugees \'a minor consequence\' is a guaranteed ticket to a Level 1 mark."', // Page 10
  '"The Law of Return opened Israel\'s gates; you just need to return to your essay plan."', // Page 11
  '"Eden thought Nasser was Mussolini on the Nile; Eisenhower promptly reminded Eden what year it was."', // Page 12
  '"The Protocol of Sèvres was so top secret the French burnt their copies — don\'t burn your exam paper!"', // Page 13
  "\"If you can't remember whether it was 1948 or 1949, don't write 'sometime in the 20th century'!\"", // Page 14
  '"Examiners read 300 essays a day: write legibly, or they might think Balfour was a French cheese."', // Page 15
  '"You\'ve finished Key Topic 1! Take a deep breath... Key Topic 2 has three more wars waiting for you."', // Page 16
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
    specAnchor:
      'Conflicting interests and demands of Jews and Arabs within the British Mandate; the McMahon-Hussein Correspondence (1915), the secret Sykes-Picot Agreement (1916), the Balfour Declaration (1917), and the 1939 British White Paper.',
    doNow: [
      {
        q: 'Which vital maritime waterway, completed in 1869, connects the Mediterranean to the Red Sea?',
        a: 'The Suez Canal',
      },
      {
        q: 'Which narrow strait at the tip of the Sinai Peninsula controls access to the Gulf of Aqaba?',
        a: 'The Straits of Tiran',
      },
      {
        q: 'Which vast desert peninsula connecting Africa to Asia served as a buffer between Egypt and Palestine?',
        a: 'The Sinai Peninsula',
      },
      {
        q: 'Which ancient city is holy to Judaism, Christianity, and Islam, and claimed by both peoples?',
        a: 'Jerusalem',
      },
      {
        q: 'Which collapsing empire ruled the Middle East for over 400 years until its defeat in World War One?',
        a: 'The Ottoman Empire',
      },
      {
        q: 'What international organisation, established in 1919, granted Britain the Mandate for Palestine?',
        a: 'The League of Nations',
      },
      {
        q: 'What political movement, founded by Theodor Herzl in 1897, campaigned for a Jewish national homeland?',
        a: 'Zionism',
      },
      {
        q: 'What political ideology sought self-determination and political independence for Arab populations?',
        a: 'Arab Nationalism',
      },
      {
        q: 'What secret 1916 agreement between Britain and France used straight lines to carve up the Middle East?',
        a: 'The Sykes-Picot Agreement',
      },
      {
        q: 'What 1939 British government policy paper severely restricted Jewish immigration into Palestine to 75,000 over five years?',
        a: 'The 1939 White Paper',
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
    specAnchor:
      'Conflicting interests after World War Two; Jewish insurgency (Irgun and Lehi); the bombing of the King David Hotel (July 1946); British economic and military exhaustion; the SS Exodus affair (1947); and UNSCOP recommendations.',
    doNow: [
      {
        q: 'What 1917 document promised British support for a Jewish national home in Palestine?',
        a: 'The Balfour Declaration',
      },
      {
        q: 'What was the immigration limit set by the British White Paper in 1939?',
        a: '75,000 over five years',
      },
      {
        q: 'Which catastrophic genocide during World War Two saw 6 million European Jews murdered by Nazi Germany?',
        a: 'The Holocaust (Shoah)',
      },
      {
        q: 'What was the official Jewish defence militia in Mandatory Palestine that later became the IDF?',
        a: 'The Haganah',
      },
      {
        q: 'Which militant Zionist paramilitary group was led by Menachem Begin from 1943?',
        a: 'The Irgun (Etzel)',
      },
      {
        q: 'In which Jerusalem building was the British military and administrative headquarters located?',
        a: 'The King David Hotel',
      },
      {
        q: 'In what month and year was the King David Hotel bombed by the Irgun?',
        a: 'July 1946',
      },
      {
        q: 'How many British, Arab, and Jewish administrative personnel died in the King David Hotel bombing?',
        a: '91 people',
      },
      {
        q: 'Which ship carrying 4,500 Holocaust survivors was turned back to Europe by the British in July 1947?',
        a: 'The SS Exodus',
      },
      {
        q: 'What international body replaced the League of Nations in 1945 to maintain global peace?',
        a: 'The United Nations (UN)',
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
    specAnchor:
      'UN Resolution 181 (Partition Plan, November 1947); outbreak of civil war; the British evacuation; David Ben-Gurion’s declaration of Israel (14 May 1948); invasion by five Arab armies; the UN truces; and the 1949 Armistice Agreements (Green Line).',
    doNow: [
      {
        q: 'What United Nations resolution in November 1947 proposed partitioning Palestine into separate states?',
        a: 'UN Resolution 181',
      },
      {
        q: 'What percentage of the land was allocated to the proposed Jewish state under UN Resolution 181?',
        a: '55% (including the Negev Desert)',
      },
      {
        q: 'What was the planned international status of Jerusalem under the UN partition plan?',
        a: 'Corpus Separatum (international zone)',
      },
      {
        q: 'Did the Arab Higher Committee and Arab states accept or reject UN Resolution 181?',
        a: 'They rejected it completely',
      },
      {
        q: 'On what exact date did David Ben-Gurion proclaim the establishment of the State of Israel?',
        a: '14 May 1948',
      },
      {
        q: 'Which five Arab states invaded the newly declared State of Israel on 15 May 1948?',
        a: 'Egypt, Syria, Transjordan, Iraq, and Lebanon',
      },
      {
        q: 'What Eastern European country supplied vital rifles and Messerschmitt fighter planes to Israel during the first truce?',
        a: 'Czechoslovakia (Czech arms deal)',
      },
      {
        q: 'What Jordanian military force, commanded by British General Glubb Pasha, captured East Jerusalem?',
        a: 'The Arab Legion',
      },
      {
        q: 'In what year were the armistice agreements signed on the island of Rhodes that ended the war?',
        a: '1949',
      },
      {
        q: 'What color pencil gave its name to the 1949 armistice borders separating Israel from Arab neighbours?',
        a: 'The Green Line',
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
    specAnchor:
      'Territorial changes and the Green Line; the refugee status of approximately 700,000 Palestinian Arabs (Al-Nakba); creation of UNRWA; the Israeli Law of Return (1950); the creation of the IDF; US financial aid; and early relations with Egypt.',
    doNow: [
      {
        q: 'Approximately how many Palestinian Arabs were displaced from their homes during the 1948–49 War?',
        a: 'Approximately 700,000 refugees',
      },
      {
        q: 'What Arabic term, meaning "The Catastrophe", is used by Palestinians to describe the 1948 displacement?',
        a: 'Al-Nakba',
      },
      {
        q: 'Which United Nations relief agency was established in December 1949 to support Palestinian refugees?',
        a: 'UNRWA (UN Relief and Works Agency)',
      },
      {
        q: 'Which Arab country annexed the West Bank in 1950, granting citizenship to Palestinian refugees?',
        a: 'Transjordan (Jordan)',
      },
      {
        q: 'Which country controlled the Gaza Strip and kept Palestinian refugees under military administration?',
        a: 'Egypt',
      },
      {
        q: 'What landmark 1950 Israeli legislation granted every Jewish person worldwide the right to settle in Israel?',
        a: 'The Law of Return (1950)',
      },
      {
        q: 'By what factor did Israel’s Jewish population increase between 1948 and 1952 due to immigration?',
        a: 'It doubled (from ~650,000 to ~1.4 million)',
      },
      {
        q: 'What official national military force was created on 26 May 1948, unifying all Jewish militias?',
        a: 'The Israel Defense Forces (IDF / Tzahal)',
      },
      {
        q: 'Which global superpower provided substantial loans, economic aid, and diplomatic backing to the new Israeli state?',
        a: 'The United States (USA)',
      },
      {
        q: 'What term was given to Palestinian armed infiltrators and guerrillas who launched cross-border raids into Israel from Gaza?',
        a: 'Fedayeen ("self-sacrificers")',
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
    specAnchor:
      'Gamal Abdel Nasser and Egypt’s leadership of the Arab world; cross-border fedayeen raids; the Israeli raid on Gaza (Feb 1955); the Czech arms deal (1955); the nationalisation of the Suez Canal (July 1956); the secret Protocol of Sèvres; the Sinai campaign; US intervention; and the creation of the United Arab Republic (1958).',
    doNow: [
      {
        q: 'Which Egyptian army officer seized power after overthrowing King Farouk in 1952, becoming President in 1954?',
        a: 'Gamal Abdel Nasser',
      },
      {
        q: 'Which strategic maritime chokepoint did Egypt close to Israeli shipping in 1950, blockading Eilat?',
        a: 'The Straits of Tiran',
      },
      {
        q: 'In February 1955, Israeli paratroopers launched a devastating reprisal raid into which Egyptian-controlled territory?',
        a: 'The Gaza Strip (The Gaza Raid)',
      },
      {
        q: 'How many Egyptian soldiers were killed in the February 1955 Gaza Raid, humiliating Nasser?',
        a: '37 Egyptian soldiers (and 2 civilians)',
      },
      {
        q: 'In September 1955, Egypt bypassed Western arms embargoes by purchasing Soviet weapons via which country?',
        a: 'Czechoslovakia (The Czech Arms Deal)',
      },
      {
        q: 'Which massive hydroelectric construction project on the River Nile did the US and Britain refuse to finance in July 1956?',
        a: 'The Aswan High Dam',
      },
      {
        q: 'On what date in July 1956 did Nasser announce the nationalisation of the Suez Canal Company?',
        a: '26 July 1956',
      },
      {
        q: 'What secret agreement was signed in France in October 1956 between Britain, France, and Israel to invade Egypt?',
        a: 'The Protocol of Sèvres',
      },
      {
        q: 'Which US President threatened financial ruin against Britain and ordered an immediate military withdrawal from Suez?',
        a: 'Dwight D. Eisenhower',
      },
      {
        q: 'What political union between Egypt and Syria was established in February 1958 under Nasser’s leadership?',
        a: 'The United Arab Republic (UAR)',
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
      heightMm: 120,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification &bull; Key Topic 1 Content',
      subtopics: [
        {
          title: '1. The British withdrawal &amp; Israel',
          items: [
            'Conflicting interests and demands of Jews and Arabs within the British Mandate.',
            'Key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.',
            'Key events of the Arab-Israeli war (1948–49).',
          ],
        },
        {
          title: '2. Aftermath of the 1948–49 war',
          items: [
            'Territorial changes and their impact.',
            'The refugee status of Palestinian Arabs.',
            'The creation of the Israeli Defence Forces (IDF) and the Law of Return (1950).',
            'US aid to Israel.',
            'Israel’s relations with Egypt.',
          ],
        },
        {
          title: '3. Increased tension, 1955–63',
          items: [
            'Nasser and Egypt’s leadership of the Arab world.',
            'The events and significance of Israeli attacks on Gaza in 1955 and Sinai in 1956.',
            'The events and significance of the Suez Crisis (1956), including the formation of the United Arab Republic (UAR) in 1958.',
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
            Living Timeline &bull; Part 1: Imperial Pledges, Insurgency &amp; Partition (1917–1947)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
              The United Nations General Assembly votes 33 to 13 to terminate the British Mandate and partition Palestine into separate Arab and Jewish states, with Jerusalem placed under international trusteeship (Corpus Separatum). The Jewish Agency accepts; all Arab nations reject the plan, triggering civil war.
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
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Statehood, The Nakba &amp; The Suez Crisis (1948–1956)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete sketches and dual-coding annotations for the war of independence, the displacement of Palestinians, and the 1956 Suez Crisis.
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, approvedFunnyFooters[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE ENQUIRY SPREADS
  // ====================================================================
  kt1Configs.forEach((cfg) => {
    const leftPageNum = 4 + (cfg.lessonNum - 1) * 2;
    const rightPageNum = leftPageNum + 1;
    const rx = cfg.extendedPractice;

    // ------------------------------------------------------------------
    // LEFT PAGE: ENQUIRY LAUNCH, DO NOW RETRIEVAL & 2x Q1 CONSEQUENCE [4m+4m]
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC 1.${cfg.lessonNum} &bull; ENQUIRY LESSON
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
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; line-height: 1.12; display: block;">${rx.connectives || rx.causalConnectives}</span>
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
  // PAGE 14: MASTER KNOWLEDGE ORGANISER (Bilingual Glossary & Spec Tables)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #000000; margin: 0; font-weight: 900; text-transform: uppercase;">
            Key Topic 1 &bull; Master Knowledge Organiser
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
            REVISION REFERENCE VAULT
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between;">
        
        <!-- Section 1: Bilingual Hebrew & Arabic Terminology Glossary -->
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 3px 6px; background: #fff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000; padding-bottom: 1px;">
            Bilingual Key Terminology Glossary (Hebrew &amp; Arabic Concepts)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 10px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22;">
            <div>&bull; <strong>Zionism (צִיּוֹנוּת):</strong> Movement for Jewish self-determination &amp; homeland.</div>
            <div>&bull; <strong>Al-Nakba (النكبة):</strong> "The Catastrophe" — displacement of 700k Palestinians in 1948.</div>
            <div>&bull; <strong>Yishuv (יִשּׁוּב):</strong> The Jewish pre-state community living in Mandatory Palestine.</div>
            <div>&bull; <strong>Fedayeen (فدائيون):</strong> "Self-sacrificers" — Palestinian guerrilla border fighters.</div>
            <div>&bull; <strong>Haganah (הַהֲגָנָה):</strong> "The Defence" — mainstream Zionist militia formed in 1920 (pre-IDF).</div>
            <div>&bull; <strong>UNRWA:</strong> UN Relief and Works Agency created in 1949 to assist refugees.</div>
            <div>&bull; <strong>Irgun (אצ״ל):</strong> Militant Zionist breakaway group led by Menachem Begin.</div>
            <div>&bull; <strong>Green Line:</strong> 1949 armistice demarcation drawn in green pencil on Rhodes maps.</div>
            <div>&bull; <strong>Aliyah (עֲלִיָּה):</strong> "Ascent" — waves of Jewish immigration to the Holy Land.</div>
            <div>&bull; <strong>Law of Return (1950):</strong> Legislation granting every Jew worldwide right to settle.</div>
            <div>&bull; <strong>Knesset (כְּנֶסֶת):</strong> The democratic unicameral parliament of the State of Israel.</div>
            <div>&bull; <strong>UAR:</strong> United Arab Republic — political union between Egypt and Syria (1958).</div>
          </div>
        </div>

        <!-- Section 2: Three High-Yield Pearson Spec Reference Tables -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1;">
          
          <!-- Table 1: Key Leaders & Historical Figures -->
          <div style="border: 1.2px solid #000; border-radius: 3px; overflow: hidden; display: flex; flex-direction: column;">
            <div style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; padding: 2px 6px; text-transform: uppercase;">
              Key Historical Leaders &amp; Diplomats
            </div>
            <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.18; flex: 1;">
              <tbody>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800; width: 32%;">David Ben-Gurion</td>
                  <td style="padding: 2px 4px;">Zionist leader; 1st Israeli PM; declared State of Israel (14 May 1948).</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Gamal Abdel Nasser</td>
                  <td style="padding: 2px 4px;">Egyptian President (1954–70); champion of pan-Arabism; nationalised Suez.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Menachem Begin</td>
                  <td style="padding: 2px 4px;">Commander of the Irgun; ordered King David Hotel bombing; future PM.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Clement Attlee</td>
                  <td style="padding: 2px 4px;">British Labour PM (1945–51); decided to end Mandate due to costs.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800;">King Abdullah I</td>
                  <td style="padding: 2px 4px;">Ruler of Jordan; commanded Arab Legion; captured and annexed West Bank.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Anthony Eden</td>
                  <td style="padding: 2px 4px;">British PM; conspired at Sèvres; resigned following Suez humiliation.</td>
                </tr>
                <tr>
                  <td style="padding: 2px 4px; font-weight: 800; background: #f8fafc;">Dwight Eisenhower</td>
                  <td style="padding: 2px 4px; background: #f8fafc;">US President; halted Suez invasion via financial sanctions on UK sterling.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Table 2: Decisive Treaties, Pledges & Resolutions -->
          <div style="border: 1.2px solid #000; border-radius: 3px; overflow: hidden; display: flex; flex-direction: column;">
            <div style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; padding: 2px 6px; text-transform: uppercase;">
              Decisive Pledges, Treaties &amp; Resolutions
            </div>
            <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.18; flex: 1;">
              <tbody>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800; width: 34%;">McMahon-Hussein (1915)</td>
                  <td style="padding: 2px 4px;">British pledge to support independent Arab kingdom for Ottoman revolt.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Sykes-Picot (1916)</td>
                  <td style="padding: 2px 4px;">Secret Anglo-French deal carving Middle East into colonial spheres.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800;">Balfour Decl. (1917)</td>
                  <td style="padding: 2px 4px;">British pledge supporting a "national home for the Jewish people".</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">1939 White Paper</td>
                  <td style="padding: 2px 4px;">Restricted Jewish immigration to 75,000 over 5 years; rejected by Zionists.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc; background: #f8fafc;">
                  <td style="padding: 2px 4px; font-weight: 800;">UN Res 181 (1947)</td>
                  <td style="padding: 2px 4px;">UN plan to partition Palestine: 55% Jewish, 44% Arab, Jerusalem int’l.</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <td style="padding: 2px 4px; font-weight: 800;">1949 Armistices</td>
                  <td style="padding: 2px 4px;">Rhodes agreements establishing Green Line borders; no peace treaty.</td>
                </tr>
                <tr>
                  <td style="padding: 2px 4px; font-weight: 800; background: #f8fafc;">Protocol of Sèvres (1956)</td>
                  <td style="padding: 2px 4px; background: #f8fafc;">Secret collusion: Israel attacks Sinai, UK/France seize Suez Canal.</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <!-- Section 3: Military Capabilities & Armies Comparison -->
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 3px 6px; background: #fafafa;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
            Military Formations &amp; Turning Points (1948 &amp; 1956)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.2;">
            <div style="border-right: 1px solid #ccc; padding-right: 4px;">
              <strong>1948 Arab Coalition:</strong> 5 armies (~30,000 troops initially). Arab Legion (Jordan) highly trained under Glubb Pasha; poor unified command; rival national territorial ambitions.
            </div>
            <div style="border-right: 1px solid #ccc; padding-right: 4px;">
              <strong>1948 Israeli Forces:</strong> Haganah transformed into IDF. ~30k troops grew to 100k by Dec 1948. Czech rifles, machine guns, and Avia S-199 fighters bought during June truce turned tide.
            </div>
            <div>
              <strong>1956 Sinai Campaign:</strong> IDF under Moshe Dayan captured Sinai in 100 hours. British/French paratroopers took Port Said. UNEF peacekeepers placed at Sharm el-Sheikh until 1967.
            </div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(14, approvedFunnyFooters[13], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 15: GRADE 9 EXTENDED WRITING MASTERCLASS & BAND 4 RUBRIC
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #000000; margin: 0; font-weight: 900; text-transform: uppercase;">
            Grade 9 Extended Writing Masterclass &amp; Band 4 Rubric
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
            EDEXCEL PAPER 2 EXCELLENCE
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between;">
        
        <!-- Section 1: The PFC Analytical Framework for 4-Mark Consequence Questions -->
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between;">
            <span>1. The PFC Analytical Formula (Q1 Consequence [4 Marks])</span>
            <span style="font-weight: 700; color: #333;">Strict 5-Minute Exam Target</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; margin-bottom: 3px;">
            <div style="border: 1px solid #000; border-radius: 2px; padding: 3px 5px; background: #fafafa;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">[P] Point</strong>
              <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2;">Directly state the consequence using exact question phrasing.</div>
            </div>
            <div style="border: 1px solid #000; border-radius: 2px; padding: 3px 5px; background: #fafafa;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">[F] Fact</strong>
              <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2;">Provide precise historical evidence (exact dates, figures, casualties, names).</div>
            </div>
            <div style="border: 1px solid #000; border-radius: 2px; padding: 3px 5px; background: #fafafa;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">[C] Consequence</strong>
              <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2;">Explain the long-term causal impact on regional tension or conflict.</div>
            </div>
          </div>
        </div>

        <!-- Section 2: Causal Connectives & Band 4 Evaluative Criteria -->
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #fafafa;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px;">
            2. High-Yield Causal Connectives &amp; Band 4 Evaluative Criteria
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            <div>
              <strong>Analytical Causal Connectives:</strong><br>
              &bull; <em>"Consequently, this fundamentally shifted..."</em><br>
              &bull; <em>"In direct reaction to this humiliation, Nasser..."</em><br>
              &bull; <em>"Crucially, this created an unresolvable deadlock because..."</em><br>
              &bull; <em>"This directly resulted in the military turning point whereby..."</em>
            </div>
            <div>
              <strong>Band 4 Evaluative Criteria Prompts:</strong><br>
              &bull; <strong>Scale &amp; Permanence:</strong> Did this alter borders permanently (e.g. 1949 Green Line)?<br>
              &bull; <strong>Superpower Influence:</strong> How did US or Soviet intervention dictate the outcome?<br>
              &bull; <strong>Demographic Impact:</strong> How did displacement (Nakba) prevent diplomatic recognition?<br>
              &bull; <strong>Strategic Supremacy:</strong> How did military factors overpower political agreements?
            </div>
          </div>
        </div>

        <!-- Section 3: Annotated Grade 9 Benchmark Model Essay (Q3 Importance [8 Marks]) -->
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #000; padding-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
                3. Annotated Grade 9 Model Answer &bull; Q3: Explain Importance [8 Marks]
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #000; color: #fff; padding: 0.5px 5px; border-radius: 1px;">
                EXAMINER MARKS: 8/8 (BAND 4)
              </span>
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; margin-bottom: 2px;">
              Question: Explain the importance of the bombing of the King David Hotel (July 1946) for the British decision to withdraw from Palestine.
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.26; color: #111;">
              <p style="margin: 0 0 3px 0;">
                <strong>Aspect 1 (Military &amp; Administrative Destruction):</strong> The bombing of the King David Hotel on 22 July 1946 was of paramount importance because it directly crippled British military and civil administration in Mandatory Palestine. Militants from Menachem Begin’s Irgun smuggled 350kg of explosives into the basement disguised as milk churns, detonating the entire south-west wing and killing 91 British, Arab, and Jewish staff. Crucially, this eradicated the central archives, intelligence registries, and senior command infrastructure of the British Secretariat. Consequently, the British army was forced into defensive, fortified enclaves ("Bevingrads"), demonstrating that Britain could no longer maintain basic law and order against determined Jewish insurgent militias.
              </p>
              <p style="margin: 0;">
                <strong>Aspect 2 (Domestic Political &amp; Financial Exhaustion):</strong> Furthermore, the bombing was decisively important in shattering British political resolve at home. Prime Minister Clement Attlee’s postwar Labour government was financially bankrupt, rationing bread, and struggling under £3 billion of wartime debt while deploying 100,000 soldiers to Palestine. The public spectacle of British soldiers dying in a thankless imperial conflict triggered ferocious parliamentary and media backlash, crystallised by the execution of two British intelligence sergeants in retaliation for Irgun hangings in 1947. In direct reaction to this unsustainable financial drain and domestic fury, Foreign Secretary Ernest Bevin announced in February 1947 that Britain would abandon the Mandate and surrender the entire problem to the United Nations without enforcing a partition.
              </p>
            </div>
          </div>
          <div style="border-top: 1px dashed #000; padding-top: 2px; margin-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #333; display: flex; justify-content: space-between;">
            <span>&bull; Detailed historical facts: 22 July 1946, 350kg TNT, 91 deaths, Menachem Begin, 100,000 troops.</span>
            <span>&bull; Analytical focus: Direct link to Attlee’s February 1947 UN surrender.</span>
          </div>
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

module.exports = { buildCmeKt1TwoPageWorkbook };
