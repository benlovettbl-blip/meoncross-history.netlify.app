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

// Approved Witty Revision Quips for CME Key Topic 1
const approvedFunnyFooters = [
  'Conflict in the Middle East Revision Hub • Key Topic 1 • The History Department', // Page 1
  '"Timeline rule: 1917 Balfour, 1947 Partition, 1948 War — keep the causal chain unbroken."', // Page 2
  '"Dual-coding tip: A clean sketch of the 1947 UN Partition map is worth a hundred words."', // Page 3
  '"Contradictory promises: McMahon said yes, Balfour said yes, Sykes-Picot drew the line."', // Page 4
  '"Carving up empires: straight lines across a desert map rarely lead to lasting peace."', // Page 5
  '"The King David Hotel bombing shattered British resolve overnight: explain that consequence."', // Page 6
  '"Resolution 181 passed 33 to 13, but the hardest part was what happened on the ground."', // Page 7
  '"A war of survival and displacement: detail the military turning points with exact dates."', // Page 8
  '"Armistice lines are not peace treaties: never confuse the 1949 Green Line with permanent peace."', // Page 9
  '"The Nakba displaced 700,000 Palestinians: precision in terminology is vital for Band 4."', // Page 10
  '"The Law of Return opened the gates: explain how mass immigration transformed Israeli society."', // Page 11
  '"Nasser\'s nationalisation of Suez was popular in Cairo, but intolerable in London and Paris."', // Page 12
  '"The Protocol of Sèvres was top secret in 1956; in an Edexcel exam, you must reveal it all."', // Page 13
  '"Master the specification: When dates, statistics, and connectives align, Grade 9 follows."', // Page 14
  '"The difference between Grade 7 and Grade 9 is not what happened, but precisely why it mattered."', // Page 15
  'Key Topic 1 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub', // Page 16
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
      tariff: 'Question 2: Write an Analytical Narrative [8 marks]',
      stem: 'Write an analytical narrative explaining how British wartime diplomacy between 1915 and 1922 created long-term conflict between Jews and Arabs in Palestine.',
      stimulus: ['The McMahon-Hussein Correspondence (1915)', 'The Balfour Declaration (1917)'],
      structureStrip: [
        'Phase 1: Wartime Pledges to Arabs & Jews (1915–1917 &bull; Contradictory Promises)',
        'Phase 2: Secret Imperial Carve-Up (1916–1919 &bull; Sykes-Picot & Betrayal)',
        'Phase 3: The Mandate System (1920–1922 &bull; League of Nations & Rising Friction)',
      ],
      causalConnectives:
        'Consequently &bull; In direct reaction to &bull; This fundamentally shifted &bull; As a direct result &bull; Crucially &bull; This created an unresolvable contradiction because',
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
      tariff: 'Question 3: Explain the Importance of... [8 marks]',
      stem: 'Explain the importance of the bombing of the King David Hotel (July 1946) for the British decision to withdraw from Palestine and hand the problem to the United Nations.',
      stimulus: [
        'Aspect 1: Military & Administrative Impact (Headquarters destruction & troop vulnerability)',
        'Aspect 2: Domestic Political Crisis (British financial exhaustion & public pressure to withdraw)',
      ],
      structureStrip: [
        'Aspect 1: Military Paralysis & Security Breakdown (91 deaths & loss of British administrative control)',
        'Aspect 2: Domestic Backlash & Economic Exhaustion (Clement Attlee & the decision to abandon the Mandate)',
      ],
      causalConnectives:
        'This was of paramount importance because &bull; Consequently &bull; This decisively altered British policy by &bull; Crucially &bull; This meant that maintaining the Mandate was',
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
      tariff: 'Question 2: Write an Analytical Narrative [8 marks]',
      stem: 'Write an analytical narrative explaining the course of the 1948–49 Arab-Israeli War from the declaration of the State of Israel to the 1949 Armistice Agreements.',
      stimulus: [
        'David Ben-Gurion’s Declaration of Independence (14 May 1948)',
        'The first UN truce and Czechoslovakian arms shipments (June 1948)',
      ],
      structureStrip: [
        'Phase 1: Arab Invasion & Initial Israeli Defence (15 May 1948 &bull; 5 Arab armies attack)',
        'Phase 2: The Turning Point Truce (June–July 1948 &bull; Czech arms & unified IDF command)',
        'Phase 3: Israeli Counter-Offensives & 1949 Armistices (Rhodes talks & The Green Line)',
      ],
      causalConnectives:
        'Consequently &bull; In direct reaction to &bull; This fundamentally shifted &bull; As a direct result &bull; Crucially &bull; This military turning point ensured that',
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
      tariff: 'Question 3: Explain the Importance of... [8 marks]',
      stem: 'Explain the importance of the Law of Return (1950) for the development of the new State of Israel in the aftermath of the 1948–49 War.',
      stimulus: [
        'Aspect 1: Demographic Growth & Absorption of Holocaust Survivors and Mizrahi Jews',
        'Aspect 2: Military Manpower & National Consolidation against Arab Neighbours',
      ],
      structureStrip: [
        'Aspect 1: Demographic Transformation & State Identity (Doubling population & absorbing refugees)',
        'Aspect 2: Military Capability & Economic Expansion (Compulsory conscription & border settlements)',
      ],
      causalConnectives:
        'This was crucial for Israel’s development because &bull; Consequently &bull; This fundamentally strengthened the state by &bull; Crucially &bull; This ensured that the infant nation could',
      wordBank:
        'Law of Return (1950) &bull; David Ben-Gurion &bull; Jewish diaspora &bull; Holocaust survivors &bull; Displaced Persons camps &bull; Mizrahi Jews &bull; Arab states expulsions &bull; ma’abarot (transit camps) &bull; population doubled &bull; IDF universal conscription &bull; kibbutzim border defense',
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
      tariff: 'Question 2: Write an Analytical Narrative [8 marks]',
      stem: 'Write an analytical narrative explaining the events of the 1956 Suez Crisis from the nationalisation of the canal to the withdrawal of Anglo-French and Israeli forces.',
      stimulus: [
        'President Nasser nationalises the Suez Canal (26 July 1956)',
        'The secret Protocol of Sèvres and Israeli invasion of Sinai (October 1956)',
      ],
      structureStrip: [
        'Phase 1: Catalyst & Nationalisation (July 1956 &bull; Aswan Dam loan cancelled & Nasser’s speech)',
        'Phase 2: Secret Conspiracy & Tripartite Invasion (October 1956 &bull; Sèvres Protocol & Sinai offensive)',
        'Phase 3: Superpower Intervention & Humiliating Withdrawal (November 1956 &bull; Eisenhower’s ultimatum & UNEF)',
      ],
      causalConnectives:
        'Consequently &bull; In direct reaction to &bull; This fundamentally shifted &bull; As a direct result &bull; Crucially &bull; This superpower ultimatum ensured that',
      wordBank:
        'Gamal Abdel Nasser &bull; Aswan High Dam &bull; nationalisation &bull; 26 July 1956 &bull; Anthony Eden &bull; Guy Mollet &bull; Protocol of Sèvres &bull; Operation Musketeer &bull; Sinai Peninsula &bull; Port Said paratroopers &bull; Dwight D. Eisenhower &bull; oil sanctions &bull; run on the pound &bull; UN Emergency Force (UNEF) &bull; United Arab Republic (1958)',
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
  // PAGE 1: FRONT COVER (Publisher Side-by-Side Hero Layout, Large Photo)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      
      <!-- Top Publisher Header -->
      <div style="border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 12pt; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">GCSE History Revision Hub &bull; Pupil Workbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #222;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800;">SPECIFICATION 1HI0/2B</span>
        </div>
      </div>

      <!-- Grand Publisher Title Banner (Full Page Width) -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 12px; margin-bottom: 4px; background: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;">
              KEY TOPIC 1
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #222;">
              CHRONOLOGICAL ENQUIRY SEQUENCE &bull; 1945–1963
            </span>
          </div>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 17.5pt; line-height: 1.1; margin: 1px 0 2px 0; font-weight: 900; letter-spacing: -0.2px;">
          The Birth of the State of Israel, 1945–1963
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #222; font-style: italic; line-height: 1.2;">
          British Mandate Collapse, King David Hotel, UN Resolution 181, The 1948 War, The Nakba &amp; The Suez Crisis
        </div>
      </div>

      <!-- Main Content Area: Massive Photo Left (108mm) + Docked Publisher Panels Right (66mm) -->
      <div style="flex: 1; display: flex; gap: 6px; margin-bottom: 3px; min-height: 0;">
        
        <!-- Left Column: Master Photographic Plate (108mm wide) -->
        <div style="width: 108mm; border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column; justify-content: space-between;">
          
          <!-- Large Photo Frame (Spans Full Available Height) -->
          <div style="flex: 1; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden; min-height: 0;">
            <img src="${coverImgSrc}" alt="David Ben-Gurion Declaring the State of Israel, Tel Aviv" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; filter: grayscale(100%) contrast(115%);">
          </div>

          <!-- Archival Provenance Plate Underneath Photo -->
          <div style="border-top: 1.5px solid #000; padding: 5px 9px; background: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                Archival Primary Record &bull; 14 May 1948
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
                GPO-D597-087
              </span>
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 10pt; font-weight: 800; line-height: 1.15; margin: 2px 0;">
              Proclamation of the State of Israel, Tel Aviv Museum of Art
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #111; line-height: 1.25;">
              Rudi Weissenstein (1910–1969) &bull; David Ben-Gurion, Executive Head of the World Zionist Organisation, reads the Declaration of Independence beneath the portrait of Theodor Herzl on 5 Iyyar 5708. Registered in the State of Israel Government Press Office archive under Accession Shelfmark GPO-D597-087.
            </div>
            <div style="margin-top: 3px; padding-top: 3px; border-top: 1px dashed #999; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; text-transform: uppercase; color: #333;">
              <span>Historical Primary Source</span>
              <span>Edexcel Paper 2 Master Archive</span>
            </div>
          </div>

        </div>

        <!-- Right Column: Docked Editorial Panels (66mm wide, Zero Gaps, Rich Content) -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px; min-height: 0;">
          
          <!-- Panel 1: Pupil Enrollment & Assessment Portfolio Card -->
          <div style="border: 1.5px solid #000; border-radius: 4px; padding: 5px 8px; background: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Pupil Workbook &amp; Assessment Portfolio
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #333;">
                GCSE History
              </span>
            </div>
            
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt;">
              <div style="display: flex; align-items: baseline; margin-bottom: 4px;">
                <strong style="text-transform: uppercase; width: 44px; font-size: 6.8pt;">Name:</strong>
                <div style="flex: 1; border-bottom: 1.2px solid #000; height: 12px;"></div>
              </div>
              
              <div style="display: flex; gap: 8px; margin-bottom: 4px;">
                <div style="flex: 1; display: flex; align-items: baseline;">
                  <strong style="text-transform: uppercase; width: 38px; font-size: 6.8pt;">Class:</strong>
                  <div style="flex: 1; border-bottom: 1.2px solid #000; height: 12px;"></div>
                </div>
                <div style="flex: 1; display: flex; align-items: baseline;">
                  <strong style="text-transform: uppercase; width: 44px; font-size: 6.8pt;">Teacher:</strong>
                  <div style="flex: 1; border-bottom: 1.2px solid #000; height: 12px;"></div>
                </div>
              </div>

              <!-- Detailed Key Topic Sign-Off Tracker Table -->
              <div style="border: 1px solid #000; border-radius: 2px; overflow: hidden;">
                <div style="background: #222; color: #fff; display: flex; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; padding: 1.5px 4px;">
                  <div style="width: 36px;">Enquiry</div>
                  <div style="flex: 1; text-align: center;">Taught</div>
                  <div style="flex: 1; text-align: center;">Do Now</div>
                  <div style="flex: 1; text-align: center;">Q1 [4m]</div>
                  <div style="flex: 1; text-align: center;">Q2/3 [8m]</div>
                  <div style="width: 28px; text-align: right;">Score</div>
                </div>
                <div style="display: flex; font-size: 5.8pt; padding: 1.5px 4px; border-bottom: 1px solid #ddd; background: #fff; align-items: center;">
                  <div style="width: 36px; font-weight: 700;">KT 1.1</div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="width: 28px; text-align: right; border-bottom: 1px solid #000; height: 9px;"></div>
                </div>
                <div style="display: flex; font-size: 5.8pt; padding: 1.5px 4px; border-bottom: 1px solid #ddd; background: #fafafa; align-items: center;">
                  <div style="width: 36px; font-weight: 700;">KT 1.2</div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="width: 28px; text-align: right; border-bottom: 1px solid #000; height: 9px;"></div>
                </div>
                <div style="display: flex; font-size: 5.8pt; padding: 1.5px 4px; border-bottom: 1px solid #ddd; background: #fff; align-items: center;">
                  <div style="width: 36px; font-weight: 700;">KT 1.3</div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="width: 28px; text-align: right; border-bottom: 1px solid #000; height: 9px;"></div>
                </div>
                <div style="display: flex; font-size: 5.8pt; padding: 1.5px 4px; border-bottom: 1px solid #ddd; background: #fafafa; align-items: center;">
                  <div style="width: 36px; font-weight: 700;">KT 1.4</div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="width: 28px; text-align: right; border-bottom: 1px solid #000; height: 9px;"></div>
                </div>
                <div style="display: flex; font-size: 5.8pt; padding: 1.5px 4px; background: #fff; align-items: center;">
                  <div style="width: 36px; font-weight: 700;">KT 1.5</div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="flex: 1; text-align: center;"><span style="display:inline-block; width:7px; height:7px; border:1px solid #000;"></span></div>
                  <div style="width: 28px; text-align: right; border-bottom: 1px solid #000; height: 9px;"></div>
                </div>
              </div>

            </div>
          </div>

          <!-- Panel 2: Unified Editorial Suite (Docked Flush: Architecture + Roadmap + Chronology + Formula) -->
          <div style="flex: 1; border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column;">
            
            <!-- Section A: Assessment Architecture -->
            <div style="border-bottom: 1.5px solid #000;">
              <div style="background: #000; color: #fff; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between; align-items: center;">
                <span>Paper 2 Exam Architecture &amp; Tariffs</span>
                <span>26m / Enquiry &bull; 130m Total</span>
              </div>
              <div style="padding: 3px 6px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.28; background: #fafafa;">
                <div style="display: flex; justify-content: space-between;">
                  <span>&bull; <strong>Q1(a) &amp; Q1(b):</strong> Consequence Questions (PFC Formula)</span>
                  <span style="font-weight: 800;">[4m + 4m = 8m]</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>&bull; <strong>Q2 / Q3:</strong> Analytical Narrative &bull; Explain Importance</span>
                  <span style="font-weight: 800;">[8m / 16m]</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>&bull; <strong>Do Now Recall:</strong> 10-Question Knowledge Retrieval Bell-Ringer</span>
                  <span style="font-weight: 800;">[10m]</span>
                </div>
              </div>
            </div>

            <!-- Section B: 5 Enquiries Roadmap (Rich Content, Beautifully Distributed) -->
            <div style="flex: 1; display: flex; flex-direction: column;">
              <div style="background: #000; color: #fff; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between; align-items: center;">
                <span>Specification Enquiry Sequence (KT1)</span>
              </div>

              <!-- Lesson 1 -->
              <div style="padding: 2.5px 6px; border-bottom: 1px solid #000; display: flex; flex-direction: column; justify-content: space-between; background: #fff; flex: 1;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000;">
                      KT 1.1: Imperial Origins &amp; Promises
                    </span>
                    <div style="display: flex; gap: 4px; align-items: center;">
                      <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #333;">1915–45</span>
                    </div>
                  </div>
                  <div style="font-family: 'Georgia', serif; font-size: 6.1pt; font-style: italic; color: #333; line-height: 1.15; margin: 1px 0;">
                    Why did British wartime diplomacy make conflict inevitable?
                  </div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #222; line-height: 1.18;">
                    &bull; <strong>Pledges:</strong> McMahon-Hussein vs Balfour Declaration; Sykes-Picot line.<br>
                    &bull; <strong>Mandate:</strong> Jewish immigration, Arab revolt, 1939 White Paper quota.
                  </div>
                </div>
                <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #555; font-weight: 700;">
                  <span>Concepts: Zionism &bull; Arab Nationalism &bull; Mandate</span>
                  <span>Exam: Q1 Consequence [4m] &bull; Q2 Narrative [8m]</span>
                </div>
              </div>

              <!-- Lesson 2 -->
              <div style="padding: 2.5px 6px; border-bottom: 1px solid #000; display: flex; flex-direction: column; justify-content: space-between; background: #fafafa; flex: 1;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000;">
                      KT 1.2: Mandate Collapse &amp; UN Partition
                    </span>
                    <div style="display: flex; gap: 4px; align-items: center;">
                      <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #333;">1945–47</span>
                    </div>
                  </div>
                  <div style="font-family: 'Georgia', serif; font-size: 6.1pt; font-style: italic; color: #333; line-height: 1.15; margin: 1px 0;">
                    Why did Britain hand the Palestine problem to the UN?
                  </div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #222; line-height: 1.18;">
                    &bull; <strong>Insurgency:</strong> King David Hotel bombing (July 1946; 91 casualties); Irgun.<br>
                    &bull; <strong>Pressure:</strong> SS Exodus affair, British bankruptcy, UNSCOP partition plan.
                  </div>
                </div>
                <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #555; font-weight: 700;">
                  <span>Concepts: Irgun &bull; UNSCOP &bull; King David Hotel</span>
                  <span>Exam: Q1 Consequence [4m] &bull; Q3 Importance [8m]</span>
                </div>
              </div>

              <!-- Lesson 3 -->
              <div style="padding: 2.5px 6px; border-bottom: 1px solid #000; display: flex; flex-direction: column; justify-content: space-between; background: #fff; flex: 1;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000;">
                      KT 1.3: UN 181 &amp; The 1948–49 War
                    </span>
                    <div style="display: flex; gap: 4px; align-items: center;">
                      <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #333;">1947–49</span>
                    </div>
                  </div>
                  <div style="font-family: 'Georgia', serif; font-size: 6.1pt; font-style: italic; color: #333; line-height: 1.15; margin: 1px 0;">
                    How was the State of Israel proclaimed and defended?
                  </div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #222; line-height: 1.18;">
                    &bull; <strong>Birth:</strong> UN Res 181 partition; Ben-Gurion declaration (14 May 1948).<br>
                    &bull; <strong>War:</strong> 5 Arab armies invade; June truce &amp; Czech arms; 1949 Green Line.
                  </div>
                </div>
                <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #555; font-weight: 700;">
                  <span>Concepts: Resolution 181 &bull; Green Line &bull; Czech Arms</span>
                  <span>Exam: Q1 Consequence [4m] &bull; Q2 Narrative [8m]</span>
                </div>
              </div>

              <!-- Lesson 4 -->
              <div style="padding: 2.5px 6px; border-bottom: 1px solid #000; display: flex; flex-direction: column; justify-content: space-between; background: #fafafa; flex: 1;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000;">
                      KT 1.4: Nakba &amp; The New Israeli State
                    </span>
                    <div style="display: flex; gap: 4px; align-items: center;">
                      <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #333;">1948–54</span>
                    </div>
                  </div>
                  <div style="font-family: 'Georgia', serif; font-size: 6.1pt; font-style: italic; color: #333; line-height: 1.15; margin: 1px 0;">
                    Why did the 1948 war produce permanent displacement?
                  </div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #222; line-height: 1.18;">
                    &bull; <strong>Refugees:</strong> 700,000 displaced Palestinians (Al-Nakba); UNRWA camps.<br>
                    &bull; <strong>Statehood:</strong> Law of Return (1950); IDF creation; massive US aid loans.
                  </div>
                </div>
                <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #555; font-weight: 700;">
                  <span>Concepts: Al-Nakba &bull; Law of Return &bull; IDF &bull; UNRWA</span>
                  <span>Exam: Q1 Consequence [4m] &bull; Q3 Importance [8m]</span>
                </div>
              </div>

              <!-- Lesson 5 -->
              <div style="padding: 2.5px 6px; border-bottom: 1.5px solid #000; display: flex; flex-direction: column; justify-content: space-between; background: #fff; flex: 1;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000;">
                      KT 1.5: Nasser &amp; The 1956 Suez Crisis
                    </span>
                    <div style="display: flex; gap: 4px; align-items: center;">
                      <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #333;">1955–58</span>
                    </div>
                  </div>
                  <div style="font-family: 'Georgia', serif; font-size: 6.1pt; font-style: italic; color: #333; line-height: 1.15; margin: 1px 0;">
                    Why did the nationalisation of Suez trigger war?
                  </div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #222; line-height: 1.18;">
                    &bull; <strong>Crisis:</strong> Gaza raid 1955, Czech arms deal, Canal nationalised (July 1956).<br>
                    &bull; <strong>War:</strong> Sèvres conspiracy; Sinai invasion; US financial halt; UAR 1958.
                  </div>
                </div>
                <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #555; font-weight: 700;">
                  <span>Concepts: Fedayeen &bull; Protocol of Sèvres &bull; UAR</span>
                  <span>Exam: Q1 Consequence [4m] &bull; Q2 Narrative [8m]</span>
                </div>
              </div>
            </div>

            <!-- Section C: Core Chronological Anchors (10 Key Events in 2 Columns) -->
            <div style="border-bottom: 1.5px solid #000; background: #fafafa; padding: 2.5px 6px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1.5px; display: flex; justify-content: space-between;">
                <span>Core Chronological Anchors</span>
                <span style="font-weight: 800;">1917–1958</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1px 8px; font-family: 'Inter', sans-serif; font-size: 5.7pt; line-height: 1.18; color: #111;">
                <div>&bull; <strong>1917 (Nov):</strong> Balfour Declaration issued</div>
                <div>&bull; <strong>1948 (14 May):</strong> Israel declared by Ben-Gurion</div>
                <div>&bull; <strong>1939 (May):</strong> British White Paper quota</div>
                <div>&bull; <strong>1948–49:</strong> Arab invasion &amp; 1949 Armistice</div>
                <div>&bull; <strong>1946 (Jul):</strong> King David Hotel bombing</div>
                <div>&bull; <strong>1950 (Jul):</strong> Israeli Law of Return passed</div>
                <div>&bull; <strong>1947 (Jul):</strong> SS Exodus turned back</div>
                <div>&bull; <strong>1955 (Feb):</strong> Israeli paratrooper Gaza Raid</div>
                <div>&bull; <strong>1947 (Nov):</strong> UN Res 181 Partition Plan</div>
                <div>&bull; <strong>1956 (Oct):</strong> Suez Crisis &amp; Sinai Campaign</div>
              </div>
            </div>

            <!-- Section D: PFC Writing Formula & Benchmark Model Answer -->
            <div style="padding: 3px 6px; background: #fff; font-family: 'Inter', sans-serif; font-size: 6.0pt; line-height: 1.2;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <strong style="text-transform: uppercase; font-size: 6.5pt; letter-spacing: 0.3px;">Edexcel PFC Writing Technique (Q1 Consequence):</strong>
                <span style="font-size: 5.8pt; font-weight: 800; background: #000; color: #fff; padding: 0.5px 4px; border-radius: 2px;">4 MARKS</span>
              </div>
              <div style="display: flex; gap: 3px; border: 1px solid #000; padding: 1.5px 4px; border-radius: 2px; background: #fafafa; margin-bottom: 2px;">
                <div style="flex: 1;"><strong>[P] Point:</strong> Name consequence</div>
                <div style="flex: 1.1;"><strong>[F] Fact:</strong> Specific date/stat</div>
                <div style="flex: 1.2;"><strong>[C] Consequence:</strong> Historical impact</div>
              </div>
              <div style="border-left: 2px solid #000; padding-left: 4px; font-family: 'Georgia', serif; font-size: 5.7pt; color: #111; line-height: 1.15;">
                <strong>Model Answer:</strong> One consequence of the July 1946 King David Hotel bombing was British military and political demoralisation. The Irgun detonated explosives destroying the British Secretariat, killing 91 administrative and military personnel. This directly resulted in overwhelming British public outrage, convincing Prime Minister Attlee that the Mandate was ungovernable and prompting the decision to surrender Palestine to the UN.
              </div>
            </div>

          </div>

        </div>
      </div>

      ${renderFooterStrip(1, approvedFunnyFooters[0], 16)}
    </div>
  </div>
`;

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

      <!-- Unified 3-Row Scaffolding Block (Docked Directly Below Header) -->
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
          </div>`
              : `
          <div style="background: #f4f4f4; border-left: 2.5px solid #000000; padding: 1.5px 5px; margin-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.18;">
            <strong>Analytical Focus:</strong> &bull; ${rx.stimulus[0]} &bull; ${rx.stimulus[1]}
          </div>`
          }
        </div>

        <!-- Row 2: Structure Strip & Analytical Connectives -->
        <div style="display: flex; border-bottom: 1px solid #000000; background: #fafafa;">
          <div style="flex: 1.4; border-right: 1px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.22;">
            <strong style="text-transform: uppercase; font-size: 7.5pt;">Structure Strip:</strong><br>
            &bull; <strong>Phase 1:</strong> ${rx.structureStrip[0]}<br>
            &bull; <strong>Phase 2:</strong> ${rx.structureStrip[1]}
            ${rx.structureStrip[2] ? `<br>&bull; <strong>Phase 3:</strong> ${rx.structureStrip[2]}` : ''}
          </div>
          <div style="flex: 1; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.22; background: #ffffff;">
            <strong style="text-transform: uppercase; font-size: 7.2pt;">Causal Connectives:</strong><br>
            ${rx.causalConnectives}
          </div>
        </div>

        <!-- Row 3: Vocabulary Bank & Dual-Coding Timeline Mission -->
        <div style="display: flex; background: #ffffff;">
          <div style="flex: 1.4; border-right: 1px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2;">
            <strong style="text-transform: uppercase; font-size: 7.2pt;">Vocabulary &amp; Historical Terms:</strong><br>
            ${rx.wordBank}
          </div>
          <div style="flex: 1; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; background: #f8fafc;">
            <strong style="text-transform: uppercase; font-size: 7.2pt; color: #000000;">Dual-Coding Mission:</strong><br>
            ${rx.timelineMission}
          </div>
        </div>

      </div>

      <!-- Exactly 16 Thick Black Writing Lines for SEND/Pearson Standard -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 1px;">
        ${Array.from({ length: 16 })
          .map(() => `<div class="task-line"></div>`)
          .join('')}
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
  // PAGE 16: OUTSIDE BACK COVER (Assessment Tracker & Digital Quizzing Hub)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #000000; margin: 0; font-weight: 900; text-transform: uppercase;">
            Key Topic 1 &bull; Progress Tracker &amp; Digital Hub
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
            PORTFOLIO COMPLETION RECORD
          </span>
        </div>
      </div>

      <!-- Section 1: Detailed Key Topic 1 Assessment Gradebook -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #fff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000; padding-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            Assessment Gradebook &bull; Enquiry Tasks &amp; Extended Writing
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700;">
            Target Grade: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; border: 1px solid #000;">
          <thead>
            <tr style="background: #000; color: #fff; font-weight: 800; text-transform: uppercase;">
              <th style="padding: 2px 4px; text-align: left; width: 34%; border-right: 1px solid #fff;">Enquiry Lesson</th>
              <th style="padding: 2px 4px; text-align: center; width: 14%; border-right: 1px solid #fff;">Do Now (/10)</th>
              <th style="padding: 2px 4px; text-align: center; width: 14%; border-right: 1px solid #fff;">Q1(a) (/4)</th>
              <th style="padding: 2px 4px; text-align: center; width: 14%; border-right: 1px solid #fff;">Q1(b) (/4)</th>
              <th style="padding: 2px 4px; text-align: center; width: 14%; border-right: 1px solid #fff;">Q2/3 (/8)</th>
              <th style="padding: 2px 4px; text-align: center; width: 10%;">Signed</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ccc;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #ccc;">KT 1.1: Imperial Origins &amp; Promises</td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="text-align: center;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #ccc; background: #fafafa;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #ccc;">KT 1.2: Mandate Collapse &amp; UN 181</td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="text-align: center;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #ccc;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #ccc;">KT 1.3: UN 181 &amp; The 1948–49 War</td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="text-align: center;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #ccc; background: #fafafa;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #ccc;">KT 1.4: Nakba &amp; The New State</td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="text-align: center;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #ccc;">KT 1.5: Nasser &amp; The Suez Crisis</td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="border-right: 1px solid #ccc; text-align: center;"></td>
              <td style="text-align: center;"></td>
            </tr>
            <tr style="background: #f0fdf4; font-weight: 900;">
              <td style="padding: 2px 4px; text-transform: uppercase; border-right: 1px solid #ccc;">Unit Aggregate Total:</td>
              <td style="border-right: 1px solid #ccc; text-align: center;">[ &nbsp;&nbsp; / 50 ]</td>
              <td style="border-right: 1px solid #ccc; text-align: center;">[ &nbsp;&nbsp; / 20 ]</td>
              <td style="border-right: 1px solid #ccc; text-align: center;">[ &nbsp;&nbsp; / 20 ]</td>
              <td style="border-right: 1px solid #ccc; text-align: center;">[ &nbsp;&nbsp; / 40 ]</td>
              <td style="text-align: center; font-size: 6pt;">OVERALL GRADE:</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 2: Formal Teacher Diagnostic WWW / EBI Matrix -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #fafafa; margin-bottom: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000; padding-bottom: 1px;">
          Teacher Diagnostic Feedback &amp; Mastery Target (WWW &bull; EBI)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
          <div>
            <strong style="text-transform: uppercase; color: #000;">What Went Well (WWW):</strong><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Accurate recall of core dates, treaties &amp; resolutions</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Clear Point-Fact-Consequence (PFC) analytical structure</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Balanced explanation of Jewish and Arab perspectives</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Thorough understanding of military turning points</label>
          </div>
          <div>
            <strong style="text-transform: uppercase; color: #000;">Even Better If (EBI):</strong><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Inject more specific statistical evidence (dates, casualties)</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Explicitly link causes to consequences using causal connectives</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Address all 3 phases in 8-mark analytical narratives</label><br>
            <label><input type="checkbox" style="vertical-align: middle;"> Evaluate long-term significance rather than merely describing</label>
          </div>
        </div>
        <div style="margin-top: 3px; border-top: 1px dashed #ccc; padding-top: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase;">Teacher Personalized Commentary:</div>
          <div class="task-line" style="height: 6mm;"></div>
          <div class="task-line" style="height: 6mm;"></div>
        </div>
      </div>

      <!-- Section 3: Vector QR Code Smartphone Interactive Quizzing Hub -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px; background: #fff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            Digital Quizzing Hub &bull; Smartphone Quizzes &amp; Flashcard Decks
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222222; font-weight: 700;">
            Scan with smartphone camera to open live interactive 20-question self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${kt1Configs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=${cfg.lessonIndex}`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Imperial Pledges',
                'Mandate Collapse',
                'UN 181 & 1948 War',
                'Nakba & Statehood',
                'Nasser & Suez 1956',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000; margin-bottom: 2px; text-transform: uppercase;">
              KT 1.${idx + 1}: ${shortLabels[idx]}
            </div>
            <div style="width: 20mm; height: 20mm; margin: 2px auto;">
              ${qrSvg}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-top: 2px;">
              Scan to Quiz
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, approvedFunnyFooters[15], 16)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildCmeKt1TwoPageWorkbook };
