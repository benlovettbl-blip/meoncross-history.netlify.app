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

// 14 APPROVED RISQUÉ / CHEEKY BLACKADDER-STYLE QUIPS (One per page)
const quipList = [
  'Conflict in the Middle East Revision Hub • The History Department', // Page 1
  'Water diversion tip: If Syria diverts the Banyas River and you divert the Jordan, everyone ends up thirsty with tanks on their lawn.', // Page 2
  'Living Timeline complete: 10 years of border skirmishes, pre-emptive strikes, and oil crises summarized in 6 chronological milestones.', // Page 3
  'National Water Carrier: Millions of gallons pumped to make the desert bloom, accompanied by artillery duels across the demilitarised zone.', // Page 4
  'Aerial dogfights: When six Syrian MiG-21s are downed before breakfast, it is usually a sign that diplomatic talks have stalled.', // Page 5
  'Closing the Straits of Tiran: An excellent way to provoke a pre-emptive strike in three hours flat.', // Page 6
  'Operation Focus: If your entire air force is parked in neat rows on the tarmac at 7:45 AM, do not expect them to still be there at 8:00 AM.', // Page 7
  'Resolution 242: Drafting an ambiguous resolution without the word "the" is diplomacy at its most gloriously confusing.', // Page 8
  'The Khartoum Summit: The "Three Noes" proved that when in doubt, Arab leaders could at least agree on what they definitely would not do.', // Page 9
  'Operating a state-within-a-state: Guaranteed to annoy your host monarch until he brings in the Jordanian 40th Armoured Brigade.', // Page 10
  'Dawson’s Field: Blowing up three Boeing 707s in the desert gets you global headlines, but also an eviction notice from Amman.', // Page 11
  'The Bar-Lev Line: Twelve miles of sand ramparts and concrete bunkers—breached in two hours by high-pressure fire hoses.', // Page 12
  'The OPEC oil embargo: Proof that turning off the petroleum tap concentrates American diplomatic minds faster than a thousand speeches.', // Page 13
  'Key Topic 2 Mastery complete: Three question types conquered, zero complacency, and full marks secured in the revision ledger.', // Page 14
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Quip on the Same Line)
// Even pages (verso/left): Page number on left, quip on right.
// Odd pages (recto/right): Quip on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, quipText, totalPages = 14) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;"><em>${quipText}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
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
    title:
      'KT2.1: The Road to War: The Cairo Conference, Water Wars & Border Skirmishes (1964–1967)',
    specAnchor:
      'The Arab League and the Cairo Conference (1964); disputes over the River Jordan water diversion; the creation of the PLO and Fatah; Syrian-backed fedayeen guerrilla attacks; Israeli reprisal raids and the 7 April 1967 aerial battle over the Golan Heights.',
    doNow: [
      {
        q: 'What 1917 British policy document supported a "national home for the Jewish people" in Palestine?',
        a: 'The Balfour Declaration',
      },
      {
        q: 'What administrative authority was granted to Britain over Palestine by the League of Nations in 1922?',
        a: 'The British Mandate',
      },
      {
        q: 'Which Jerusalem hotel was bombed by the Zionist paramilitary group Irgun in July 1946?',
        a: 'The King David Hotel',
      },
      {
        q: 'What was the number of the United Nations Resolution passed in November 1947 to partition Palestine?',
        a: 'UN Resolution 181',
      },
      {
        q: 'On what date did David Ben-Gurion proclaim the establishment of the State of Israel?',
        a: '14 May 1948',
      },
      {
        q: 'Approximately how many Palestinian Arabs became refugees during the 1948–49 Arab-Israeli War?',
        a: 'Approximately 700,000',
      },
      {
        q: 'What law passed by the Israeli Knesset in 1950 granted every Jewish person the right to settle in Israel?',
        a: 'The Law of Return',
      },
      {
        q: 'Who became President of Egypt in 1954 and emerged as the champion of Pan-Arab nationalism?',
        a: 'Gamal Abdel Nasser',
      },
      {
        q: 'What vital international waterway did Nasser nationalise in July 1956, sparking the Suez Crisis?',
        a: 'The Suez Canal',
      },
      {
        q: 'Which two European powers secretly colluded with Israel in the Protocol of Sèvres in October 1956?',
        a: 'Britain and France',
      },
    ],
    vocabPrompt:
      'Explain the crucial tactical difference between Israel’s National Water Carrier and Syria’s Headwater Diversion project, and why water rights ignited cross-border combat.',
    drillType: 'consequence_4',
    tariff: 'Question 1: Explain One Consequence [4 marks &bull; 5 mins]',
    examStem:
      'Explain one consequence of the 7 April 1967 aerial battle over the Golan Heights. [4 marks]',
    provenanceClue:
      'Consider the topographical military survey of the Golan Heights (1967). How did Syrian artillery superiority from the plateau overlooking kibbutzim in the Hula Valley make armed confrontation unavoidable?',
    source: {
      title: 'Historical Topographical Survey: The Syrian Armistice Line & Golan Heights Plateau',
      shelfmark: 'ISR-SYR-66',
      src: '/images/cme_golan_heights_relief_map_1967.jpg',
      caption:
        'Topographical contour survey showing Syrian artillery batteries on the Golan Heights dominating Israeli kibbutzim in the Hula Valley (1964–1967).',
      provenance:
        'Department of Military Survey, Historical Topographical Record, Sheet 4 (Accession Ref: ISR-SYR-66).',
      context:
        'This official military survey details the fortified Syrian artillery bunkers and trench networks excavated along the Golan Heights plateau, from which Syrian forces regularly shelled Israeli tractors and border communities in the demilitarised zone.',
      hinge:
        'How does the physical elevation of the Golan Heights shown in Source A explain why border skirmishes between Israel and Syria were so difficult to resolve peacefully?',
    },
    structureStrip: [
      {
        col: '1. IDENTIFY CONSEQUENCE',
        text: 'State clearly one major result: the shooting down of six Syrian MiGs and the profound humiliation of the Syrian government.',
      },
      {
        col: '2. DEPLOY HISTORICAL EVIDENCE',
        text: 'Detail the IAF Mirage fighters pursuing MiGs over Damascus and the activation of the 1966 Egyptian-Syrian Mutual Defense Pact.',
      },
      {
        col: '3. EXPLAIN CAUSAL IMPACT',
        text: 'Explain how Arab public outcry forced President Nasser to mobilise Egyptian forces in Sinai to protect his Pan-Arab leadership, directly precipitating the Six-Day War.',
      },
    ],
    connectives:
      'One significant consequence of the 7 April 1967 air battle was... &bull; Specifically, during the aerial clash over the Golan... &bull; Furthermore, this activated... &bull; Consequently, this directly compelled Nasser to... &bull; Therefore...',
    wordBank:
      'National Water Carrier &bull; Banyas River &bull; demilitarised zone (DMZ) &bull; Kibbutz Ein Gev &bull; Syrian MiG-21 &bull; IAF Mirage jets &bull; Damascus &bull; Mutual Defense Pact &bull; Pan-Arab credibility',
    timelineMission:
      'Sketch and annotate the River Jordan water diversion route and the 7 April air battle on Milestones 1 and 2',
    leftPageQuip:
      'National Water Carrier: Millions of gallons pumped to make the desert bloom, accompanied by artillery duels across the demilitarised zone.',
    rightPageQuip:
      'Aerial dogfights: When six Syrian MiG-21s are downed before breakfast, it is usually a sign that diplomatic talks have stalled.',
  },

  {
    lessonIndex: 5,
    lessonNum: 2,
    id: 'lesson_7',
    title: 'KT2.2: The Slide to War & The Six Day War (May–June 1967)',
    specAnchor:
      'The escalation of tension: Soviet false reports; Nasser’s remilitarisation of the Sinai, expulsion of UNEF peacekeepers, and blockade of the Straits of Tiran; the Jordanian-Egyptian defense pact; Israeli pre-emptive strike (Operation Focus); the three-front war and territorial conquests.',
    doNow: [
      {
        q: 'Where did Arab League leaders meet in January 1964 to coordinate policy against Israel?',
        a: 'Cairo (The Cairo Conference)',
      },
      {
        q: 'What organisation was founded in 1964 under Ahmad Shukeiri to represent Palestinian Arabs?',
        a: 'The Palestine Liberation Organisation (PLO)',
      },
      {
        q: 'Which Palestinian guerrilla movement was led by Yasser Arafat from 1959 onwards?',
        a: 'Fatah',
      },
      {
        q: 'What was the name of the Israeli engineering project diverting River Jordan water to the Negev?',
        a: 'The National Water Carrier',
      },
      {
        q: 'Which strategic plateau did Syrian artillery use to shell Israeli settlements in the Hula Valley?',
        a: 'The Golan Heights',
      },
      {
        q: 'How many Syrian MiG-21 fighter jets did the Israeli Air Force shoot down on 7 April 1967?',
        a: 'Six MiG-21s',
      },
      {
        q: 'Over which Arab capital city did Israeli Mirage fighters perform celebratory victory rolls in April 1967?',
        a: 'Damascus',
      },
      {
        q: 'What treaty signed in November 1966 bound Egypt and Syria into a mutual military alliance?',
        a: 'The Egyptian-Syrian Mutual Defense Pact',
      },
      {
        q: 'What strip of territory along the Jordan-Syrian border was designated as neutral but frequently farmed?',
        a: 'The Demilitarised Zone (DMZ)',
      },
      {
        q: 'Which superpower provided false intelligence in May 1967 claiming Israeli troops were massing on Syria’s border?',
        a: 'The Soviet Union (USSR)',
      },
    ],
    vocabPrompt:
      'Explain why Israel defined Egypt’s closure of the Straits of Tiran as a "casus belli" (justification for war) and how this concept led directly to Operation Focus.',
    drillType: 'narrative_8',
    tariff: 'Question 2: Narrative Account Analysing Key Events [8 marks &bull; 10 mins]',
    examStem:
      'Write a narrative account analysing the key events of the Six Day War (June 1967). [8 marks]',
    stimulus: [
      "Nasser's closure of the Straits of Tiran (May 1967)",
      'The pre-emptive Israeli air strike (5 June 1967)',
    ],
    provenanceClue:
      'Consider the official aerial damage reconnaissance photograph taken at Bir Gifgafa airbase on 5 June 1967. How does photographic proof of total air supremacy explain why the ground campaign across Sinai was decided so rapidly?',
    source: {
      title:
        'Archival Reconnaissance Photograph: Destroyed Egyptian Combat Aircraft at Bir Gifgafa Airbase',
      shelfmark: 'AIR-1967-0506',
      src: '/images/cme_six_day_war_airfield_1967.jpg',
      caption:
        'Charred wreckage of Egyptian combat aircraft destroyed on the tarmac during Operation Focus at dawn on 5 June 1967.',
      provenance:
        'IDF Military Archive, Western Sinai Campaign Collection (Accession Ref: AIR-1967-0506).',
      context:
        'This primary aerial intelligence photograph records the catastrophic aftermath of the Israeli dawn airstrike at Bir Gifgafa airbase in the Sinai Peninsula. By destroying Arab runways and aircraft within three hours, Israel secured complete uncontested air supremacy.',
      hinge:
        'How does Source A help explain why the ground war in the Sinai Peninsula was decided so rapidly in Israel’s favour?',
    },
    structureStrip: [
      {
        col: '1. PHASE 1: CRISIS & ENCIRCLEMENT',
        text: 'Explain the catalyst: Nasser’s expulsion of UNEF peacekeepers, blockade of the Straits of Tiran, and Jordan signing a defense pact, creating perceived encirclement.',
      },
      {
        col: '2. PHASE 2: PRE-EMPTIVE AIR STRIKE',
        text: 'Explain the turning point: Operation Focus launched at 07:45 on 5 June, destroying over 400 Arab aircraft on the ground in 3 hours and securing total air dominance.',
      },
      {
        col: '3. PHASE 3: TERRITORIAL CONQUEST',
        text: 'Explain the outcome: rapid three-front armoured advance capturing Sinai and Gaza from Egypt, West Bank and East Jerusalem from Jordan, and Golan Heights from Syria by 10 June.',
      },
    ],
    connectives:
      'The conflict began in May 1967 when President Nasser... &bull; This directly triggered an existential crisis because the blockade... &bull; Consequently, on 5 June 1967 Israel launched... &bull; This shifted the military balance decisively because... &bull; As a direct result, by 10 June 1967...',
    wordBank:
      'Straits of Tiran &bull; Sharm el-Sheikh &bull; UNEF peacekeepers &bull; casus belli &bull; Operation Focus &bull; General Yitzhak Rabin &bull; Bir Gifgafa &bull; Western Wall &bull; Golan Heights &bull; 1 million refugees',
    timelineMission:
      'Sketch and annotate Operation Focus airstrikes and the five conquered territories on Milestone 3',
    leftPageQuip:
      'Closing the Straits of Tiran: An excellent way to provoke a pre-emptive strike in three hours flat.',
    rightPageQuip:
      'Operation Focus: If your entire air force is parked in neat rows on the tarmac at 7:45 AM, do not expect them to still be there at 8:00 AM.',
  },

  {
    lessonIndex: 6,
    lessonNum: 3,
    id: 'lesson_8',
    title: 'KT2.3: The Aftermath of 1967: The Occupied Territories & UN Resolution 242',
    specAnchor:
      "The political and territorial consequences of the Six Day War: the Occupied Territories (Sinai, Gaza, West Bank, Golan Heights, East Jerusalem); UN Security Council Resolution 242 ('Land for Peace'); the Khartoum Arab Summit and the 'Three Noes'; the initiation of Israeli settlement policy.",
    doNow: [
      {
        q: 'What international peacekeeping force was expelled from the Sinai Peninsula by Nasser in May 1967?',
        a: 'The UN Emergency Force (UNEF)',
      },
      {
        q: 'What narrow strait connecting the Gulf of Aqaba to the Red Sea was blockaded by Egypt in May 1967?',
        a: 'The Straits of Tiran',
      },
      {
        q: 'What was the codename of the pre-emptive Israeli air strike launched on 5 June 1967?',
        a: 'Operation Focus (Mivtza Moked)',
      },
      {
        q: 'Which three Arab countries fought against Israel in the Six-Day War?',
        a: 'Egypt, Jordan, and Syria',
      },
      {
        q: 'Name two territories captured by Israel from Egypt during the Six-Day War.',
        a: 'Sinai Peninsula and Gaza Strip',
      },
      {
        q: 'What territory, including East Jerusalem, was captured by Israel from Jordan in June 1967?',
        a: 'The West Bank',
      },
      {
        q: 'What strategic elevated plateau was captured by Israel from Syria in the final days of the 1967 war?',
        a: 'The Golan Heights',
      },
      {
        q: 'Approximately how many Palestinian Arabs came under Israeli military occupation following June 1967?',
        a: 'Over one million (approx. 1.1 million)',
      },
      {
        q: 'Which holy Jewish site in the Old City of Jerusalem was brought under Israeli control on 7 June 1967?',
        a: 'The Western Wall (Wailing Wall)',
      },
      {
        q: 'What was the official duration of the 1967 Arab-Israeli War?',
        a: 'Six Days (5–10 June 1967)',
      },
    ],
    vocabPrompt:
      'Explain the crucial legal distinction between military occupation and territorial annexation, using the West Bank and East Jerusalem as examples.',
    drillType: 'importance_8',
    tariff: 'Question 3: Explain the Importance [8 marks &bull; 10 mins]',
    examStem:
      'Explain the importance of UN Security Council Resolution 242 (1967) for Middle East peace diplomacy. [8 marks]',
    provenanceClue:
      'Consider the official diplomatic communiqué issued by eight Arab heads of state at Khartoum in September 1967. How does their collective declaration of the "Three Noes" explain why Resolution 242 failed to produce immediate peace?',
    source: {
      title: 'Archival Primary Excerpt: The Khartoum Arab League Summit Communiqué (Clause 3)',
      shelfmark: 'ARAB-LEAGUE-1967-KRT',
      src: '', // text-based primary source box
      caption:
        'Official English translation of the third clause of the Khartoum Summit declaration issued by eight Arab heads of state on 1 September 1967.',
      provenance:
        'Arab League Summit Records, Fourth Arab Summit Conference, Khartoum (1 September 1967).',
      context:
        'This official declaration was adopted by eight Arab heads of state—including Egypt, Jordan, Syria, and Saudi Arabia—meeting in Khartoum following the Six-Day War. Clause 3 established the famous "Three Noes", rejecting direct negotiations or recognition of Israel.',
      hinge:
        'Why did the "Three Noes" in Source A convince Israeli leaders that offering to return the Occupied Territories would not bring genuine peace?',
    },
    structureStrip: [
      {
        col: '1. "LAND FOR PEACE" PRINCIPLE',
        text: 'Explain how Res 242 established the universal formula: withdrawal of Israeli armed forces in exchange for Arab recognition and secure borders.',
      },
      {
        col: '2. DELIBERATE DIPLOMATIC AMBIGUITY',
        text: 'Explain how omitting "the" before "territories" in English allowed Israel to claim partial withdrawal while Arabs demanded full withdrawal.',
      },
      {
        col: '3. ENDURING DIPLOMATIC BENCHMARK',
        text: 'Explain how 242 became the indispensable basis for all future Middle East treaties: Camp David (1978), Oslo (1993), and Jordan-Israel (1994).',
      },
    ],
    connectives:
      'UN Resolution 242 was important for peace diplomacy because it established... &bull; Specifically, the doctrine of "Land for Peace" meant... &bull; However, its significance was complicated by... &bull; Furthermore, the resolution became the cornerstone because... &bull; Consequently...',
    wordBank:
      'Resolution 242 &bull; Land for Peace &bull; Lord Caradon &bull; territorial ambiguity &bull; Khartoum Summit &bull; Three Noes (no peace, no recognition, no negotiation) &bull; Occupied Territories &bull; Gush Emunim &bull; Allon Plan',
    timelineMission:
      'Sketch and annotate the "Land for Peace" balance scales and the Khartoum "Three Noes" banner on Milestone 4',
    leftPageQuip:
      'Resolution 242: Drafting an ambiguous resolution without the word "the" is diplomacy at its most gloriously confusing.',
    rightPageQuip:
      'The Khartoum Summit: The "Three Noes" proved that when in doubt, Arab leaders could at least agree on what they definitely would not do.',
  },

  {
    lessonIndex: 7,
    lessonNum: 4,
    id: 'lesson_9',
    title:
      'KT2.4: The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    specAnchor:
      'The growth of Palestinian nationalism: the Battle of Karameh (1968) and Yasser Arafat’s chairmanship of the PLO; the PFLP and international terrorism (Dawson’s Field hijackings 1970); Black September in Jordan and expulsion to Lebanon; the 1972 Munich Olympic massacre and Israeli retaliation.',
    doNow: [
      {
        q: 'What diplomatic formula was established by UN Security Council Resolution 242 in November 1967?',
        a: '"Land for Peace"',
      },
      {
        q: 'What was the famous phrase summarizing the resolutions passed at the September 1967 Khartoum Arab Summit?',
        a: 'The "Three Noes"',
      },
      {
        q: 'Name the three principles of the "Three Noes".',
        a: 'No peace, no recognition, no negotiation with Israel',
      },
      {
        q: 'What language version of Resolution 242 included the definite article "the" before "territories"?',
        a: 'The French version',
      },
      {
        q: 'Which Israeli settlement plan proposed defensive military outposts along the Jordan River rift valley?',
        a: 'The Allon Plan',
      },
      {
        q: 'What religious-nationalist movement pioneered Jewish settlement construction in the West Bank?',
        a: 'Gush Emunim (Bloc of the Faithful)',
      },
      {
        q: 'Who was elected Chairman of the Palestine Liberation Organisation (PLO) Executive Committee in 1969?',
        a: 'Yasser Arafat',
      },
      {
        q: 'Which March 1968 battle in Jordan was celebrated as a heroic moral victory for Palestinian fedayeen?',
        a: 'The Battle of Karameh',
      },
      {
        q: 'Which Marxist-Leninist Palestinian group pioneered international aircraft hijackings from 1968 onwards?',
        a: 'The Popular Front for the Liberation of Palestine (PFLP)',
      },
      {
        q: 'Who was the King of Jordan who confronted and expelled armed Palestinian guerrillas in September 1970?',
        a: 'King Hussein',
      },
    ],
    vocabPrompt:
      'Explain how the phrase "state within a state" accurately characterizes the political and military autonomy of the PLO inside Jordan prior to September 1970.',
    drillType: 'consequence_4',
    tariff: 'Question 1: Explain One Consequence [4 marks &bull; 5 mins]',
    examStem:
      'Explain one consequence of the Black September conflict in Jordan (1970) for the PLO. [4 marks]',
    provenanceClue:
      'Consider Kurt Strumpf’s iconic primary photograph of the masked Black September gunman on the balcony at the Munich Olympic Village (1972). How did live global television coverage both elevate the Palestinian cause and provoke international condemnation?',
    source: {
      title:
        'Archival Primary Photograph: Masked Black September Militant on Balcony at Munich Olympic Village',
      shelfmark: 'AP-MUC-1972-0509',
      src: '/images/cme_munich_1972_balcony.jpg',
      caption:
        'A masked member of the Black September militant organisation on the balcony of 31 Connollystraße during the Munich Olympic hostage crisis (5 September 1972).',
      provenance: 'Kurt Strumpf / Associated Press Archive (Accession Ref: AP-MUC-1972-0509).',
      context:
        'Taken during the live global broadcast of the 1972 Munich Olympics attack, this primary photograph shows a militant guarding the quarters of the Israeli Olympic team. Eleven Israeli athletes and coaches and one German policeman were murdered, prompting Operation Wrath of God.',
      hinge:
        'Why did the live television broadcast of the Munich crisis shown in Source A create both worldwide publicity and widespread condemnation for the Palestinian cause?',
    },
    structureStrip: [
      {
        col: '1. IDENTIFY CONSEQUENCE',
        text: 'State clearly one major result: the expulsion of the PLO from Jordan to Southern Lebanon, transferring the base of Palestinian guerrilla operations to Beirut.',
      },
      {
        col: '2. DEPLOY HISTORICAL EVIDENCE',
        text: 'Detail King Hussein’s military offensive in September 1970 following the Dawson’s Field hijackings, killing 3,000+ fighters and driving Arafat’s forces into exile.',
      },
      {
        col: '3. EXPLAIN CAUSAL IMPACT',
        text: 'Explain how losing the Jordanian border base prompted radical splinter groups to turn to international terror (Munich 1972) and destabilised Lebanon.',
      },
    ],
    connectives:
      "One significant consequence of the Black September conflict for the PLO was... &bull; Specifically, after the Dawson's Field hijackings... &bull; In response, King Hussein deployed... &bull; Consequently, this forced Yasser Arafat and the PLO to... &bull; Therefore...",
    wordBank:
      "Battle of Karameh (1968) &bull; George Habash (PFLP) &bull; Dawson's Field &bull; King Hussein of Jordan &bull; Black September (1970) &bull; Fatahland (Southern Lebanon) &bull; Munich Olympic massacre (1972) &bull; Operation Wrath of God",
    timelineMission:
      'Sketch and annotate the Dawson’s Field hijackings and the PLO exile route to Southern Lebanon on Milestone 5',
    leftPageQuip:
      'Operating a state-within-a-state: Guaranteed to annoy your host monarch until he brings in the Jordanian 40th Armoured Brigade.',
    rightPageQuip:
      'Dawson’s Field: Blowing up three Boeing 707s in the desert gets you global headlines, but also an eviction notice from Amman.',
  },

  {
    lessonIndex: 8,
    lessonNum: 5,
    id: 'lesson_10',
    title: 'KT2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
    specAnchor:
      'The War of Attrition (1969–70); the death of Nasser and succession of Anwar Sadat; reasons for the 1973 attack; Operation Badr (Suez crossing and Bar-Lev Line breach); the Golan front; superpower involvement (US and Soviet airlifts); the OPEC oil embargo; military and political outcomes.',
    doNow: [
      {
        q: "What was the name of the Israeli Olympic athletes' hostage crisis that occurred in September 1972?",
        a: 'The Munich Olympic Massacre',
      },
      {
        q: 'What covert Israeli retaliation campaign was authorized by Prime Minister Golda Meir following Munich?',
        a: 'Operation Wrath of God',
      },
      {
        q: 'Which desert airstrip in Jordan was used by the PFLP in September 1970 to blow up three hijacked Western airliners?',
        a: 'Dawson’s Field (Zarqa)',
      },
      {
        q: 'Which country became the main operating headquarters for the PLO after their expulsion from Jordan in 1971?',
        a: 'Lebanon (Beirut / Southern Lebanon)',
      },
      {
        q: 'What static artillery and commando conflict was fought along the Suez Canal between Egypt and Israel in 1969–70?',
        a: 'The War of Attrition',
      },
      {
        q: 'Who succeeded Gamal Abdel Nasser as President of Egypt following Nasser’s sudden death in September 1970?',
        a: 'Anwar Sadat',
      },
      {
        q: 'What heavily fortified sand-rampart defensive line did Israel build along the eastern bank of the Suez Canal?',
        a: 'The Bar-Lev Line',
      },
      {
        q: 'What technological method did Egyptian engineers use to blast through the sand ramparts of the Bar-Lev Line?',
        a: 'High-pressure water cannons (monitors)',
      },
      {
        q: 'On what Jewish holy day did Egypt and Syria launch their coordinated surprise attack in October 1973?',
        a: 'Yom Kippur (Day of Atonement)',
      },
      {
        q: 'Which vital international waterway remained closed to international shipping between 1967 and 1975?',
        a: 'The Suez Canal',
      },
    ],
    vocabPrompt:
      'Explain the tactical purpose of the Bar-Lev Line and why Egyptian engineers deployed high-pressure water monitors to breach it on 6 October 1973.',
    drillType: 'narrative_8',
    tariff: 'Question 2: Narrative Account [8m] &bull; Question 3: Importance [8m]',
    examStem:
      'Write a narrative account analysing the key events of the Yom Kippur War (October 1973). [8 marks]',
    stimulus: ['The surprise attack on 6 October 1973', 'The OPEC oil embargo'],
    provenanceClue:
      'Consider the official wartime photograph of Egyptian infantry crossing the Suez Canal under a Soviet SAM umbrella. How does this successful assault demonstrate why Israeli complacency after 1967 was shattered?',
    source: {
      title:
        'Archival Photographic Record: Egyptian Infantry and Armored Columns Crossing the Suez Canal',
      shelfmark: 'EGY-1973-1006',
      src: '/images/cme_egyptians_crossing_suez_1973.jpg',
      caption:
        'Egyptian infantry and armored vehicles crossing pontoon bridges over the Suez Canal after blasting through Israel’s sand ramparts on 6 October 1973.',
      provenance:
        'Egyptian Armed Forces Directorate of Moral Affairs (Accession Ref: EGY-1973-1006).',
      context:
        'Taken during Operation Badr on 6 October 1973, this primary photograph records Egyptian troops crossing the Suez Canal. Using British and German high-pressure water monitors, engineers blasted 60 breaches through the 20-metre sand ramparts of the Bar-Lev Line within hours.',
      hinge:
        'How does Source A illustrate why the opening crossing of the Suez Canal was viewed as a major technological and psychological triumph for Egypt?',
    },
    structureStrip: [
      {
        col: '1. PHASE 1: SURPRISE CROSSING',
        text: 'Explain the 6 October surprise crossing on Yom Kippur / Ramadan: water cannons breaching Bar-Lev Line under Soviet SAM umbrella while Syria hit Golan.',
      },
      {
        col: '2. PHASE 2: AIRLIFTS & COUNTER-CROSSING',
        text: 'Explain the massive US emergency airlift (Nickel Grass) enabling General Sharon’s armored division to counter-cross the canal and encircle Egypt’s 3rd Army.',
      },
      {
        col: '3. PHASE 3: OUTCOME & OIL EMBARGO',
        text: 'Explain the Arab OPEC oil embargo quadrupling world oil prices, shattering Israeli invincibility and forcing US shuttle diplomacy.',
      },
    ],
    connectives:
      'The war began on 6 October 1973 when Egypt and Syria launched... &bull; This coordinated assault achieved tactical surprise because... &bull; This early Arab success prompted the United States to... &bull; Consequently, General Sharon was able to... &bull; In retaliation, Arab OPEC ministers unleashed... &bull; Ultimately, this forced...',
    wordBank:
      'Operation Badr &bull; Bar-Lev Line &bull; water monitors &bull; SAM-6 missiles &bull; Golan Heights &bull; Operation Nickel Grass &bull; Ariel Sharon &bull; Third Army encirclement &bull; OPEC oil embargo &bull; Henry Kissinger &bull; Agranat Commission',
    timelineMission:
      'Sketch and annotate the water-cannon breach of the Bar-Lev Line and the OPEC oil embargo pipeline on Milestone 6',
    leftPageQuip:
      'The Bar-Lev Line: Twelve miles of sand ramparts and concrete bunkers—breached in two hours by high-pressure fire hoses.',
    rightPageQuip:
      'The OPEC oil embargo: Proof that turning off the petroleum tap concentrates American diplomatic minds faster than a thousand speeches.',
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
      line-height: 1.32;
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
    /* Page Container: Zero outer border, pure flex distribution for optimal page budget */
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    /* Full flex section container for interior distribution */
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Clean Task Section Spacing */
    .task-section {
      margin-bottom: 4px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }
    /* Thick Black Writing Lines for Handwriting */
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.2mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1px dotted #333333;
      height: 5.8mm;
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
    /* Primary Archival Excerpt / Citation Box */
    .archival-box {
      border: 1.5px solid #000000;
      border-radius: 4px;
      padding: 4px 7px;
      margin-bottom: 4px;
      background: #ffffff;
    }
    .archival-shelfmark {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #000000;
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
      <div style="text-align: center; border-bottom: 1.5px solid #000000; padding-bottom: 3px; margin-bottom: 5px;" data-department-name="The History Department">
        <div style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #000000;">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #222222; margin-top: 1px;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
        </div>
      </div>

      <!-- Pupil Details Box (Top of Cover, 3 Columns) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
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
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; background: #ffffff;">
          Key Topic 2 &bull; 1964–1973
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; line-height: 1.15; color: #000000; margin: 2px 0 3px 0; font-weight: 900;">
          The Escalating Conflict, 1964–1973
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          The Cairo Conference, Six-Day War, Resolution 242, Palestinian Resistance &amp; The Yom Kippur War
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Archival Presentation) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="/units/cme_new/assets/kt2_cover.jpg" alt="David Rubinger: Israeli Paratroopers at the Western Wall, Jerusalem" style="width: 100%; max-height: 235px; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Source:</strong> <em>Israeli Paratroopers at the Western Wall</em> &bull; David Rubinger (7 June 1967)</span>
          <span>Accession Shelfmark: <strong>GPO-D388-052</strong></span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 4px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 5px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 5px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Learnt
              </th>
              <th style="padding: 5px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.1: The Road to War: The Cairo Conference, Water Wars &amp; Skirmishes (1964–67)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the River Jordan water dispute, the creation of the PLO, and the 7 April 1967 Golan air clash escalate Arab-Israeli tensions?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.2: The Slide to War &amp; The Six Day War (May–June 1967)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did Nasser close the Straits of Tiran, and how did Operation Focus enable Israel to seize Sinai, Gaza, West Bank, Jerusalem, and Golan?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.3: The Aftermath of 1967: The Occupied Territories &amp; UN Resolution 242
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the "Land for Peace" principle in UN Resolution 242 clash with the Khartoum "Three Noes" and early Israeli settlements?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.4: The Rise of Palestinian Resistance: The PLO, Black September &amp; Munich (1968–72)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the Battle of Karameh elevate Arafat, why did King Hussein expel the PLO in 1970, and how did Munich impact world opinion?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 2.5: The War of Attrition &amp; The Yom Kippur War (1969–1973)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did Egypt breach the Bar-Lev Line, how did US and Soviet airlifts alter the conflict, and why did the OPEC oil embargo matter?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, quipList[0], 14)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE SPREAD (2 Pages, Zero Exam Synthesis)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3: 1964–1967) -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Water Wars, Border Skirmishes &amp; The Six-Day War (1964–1967)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace (Zero Exam Synthesis) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1: 1964 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                JANUARY 1964 &bull; The Cairo Conference &amp; The Creation of the PLO
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The Arab League convenes in Cairo to counter Israel’s National Water Carrier, which diverts River Jordan water to the Negev. The summit resolves to establish the Palestine Liberation Organisation (PLO) under Ahmad Shukeiri, while Yasser Arafat’s Fatah faction launches cross-border fedayeen raids backed by Syria.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2: MAY–JUNE 1967 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                MAY–JUNE 1967 &bull; The Slide to War: Straits of Tiran &amp; UNEF Expulsion
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1 &bull; 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Following false Soviet reports of Israeli troop build-ups on the Syrian border, President Nasser expels UN Emergency Force (UNEF) peacekeepers, marches 100,000 Egyptian troops into the Sinai, and closes the Straits of Tiran to Israeli shipping. On 30 May, King Hussein signs a joint Egyptian-Jordanian defense pact.
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
              Israel launches Operation Focus at dawn on 5 June, destroying over 400 Arab aircraft on the ground in three hours. Israeli armoured divisions sweep through Sinai to the Suez Canal, seize the West Bank and East Jerusalem from Jordan, and scale the Golan Heights to defeat Syria, capturing five strategic territories in six days.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, quipList[1], 14)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6: 1967–1973) -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Occupation, Black September &amp; The Yom Kippur War (1967–1973)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace (Zero Exam Synthesis) -->
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

      ${renderFooterStrip(3, quipList[2], 14)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS KT 2.1 TO 2.5)
  // ====================================================================
  kt2Configs.forEach((cfg) => {
    const lesson = lessons[cfg.lessonIndex];
    const leftPageNum = cfg.lessonNum * 2 + 2; // Pages 4, 6, 8, 10, 12
    const rightPageNum = leftPageNum + 1; // Pages 5, 7, 9, 11, 13

    // ------------------------------------------------------------------
    // LEFT PAGE: 10 DO NOW + VOCAB APPLICATION (3 LINES) + EXAM DRILL
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Exam Planning Drill
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Grid (Clean borderless presentation) -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Prior Learning Retrieval (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 14px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #000000; line-height: 1.15;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task (3 Handwriting Lines to eliminate underflow) -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Application Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">HISTORICAL TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Edexcel Paper 2 Exam Planning Drill (Rotating Q1 Consequence, Q2 Narrative, Q3 Importance) -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Edexcel Paper 2 Exam Planning Drill &bull; ${cfg.tariff}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ${cfg.drillType === 'consequence_4' ? 'PEE CAUSAL DRILL' : cfg.drillType === 'narrative_8' ? '3-STAGE CHRONOLOGY' : '2-POINT IMPORTANCE'}
          </span>
        </div>
        
        ${
          cfg.drillType === 'consequence_4'
            ? `
        <div style="margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.2; margin-bottom: 2px; background: #f4f4f4; padding: 3px 6px; border-left: 2.5px solid #000000;">
            <strong>Edexcel PEE Framework:</strong> <em>Point</em> (Identify the consequence) &rarr; <em>Evidence</em> (Specific factual proof) &rarr; <em>Explanation</em> (Historical mechanism and ongoing impact).
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">1. Consequence (Point):</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">2. Evidence (Facts/Dates):</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">3. Explanation (Impact):</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
          </div>
        </div>
        `
            : cfg.drillType === 'narrative_8'
              ? `
        <div style="margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.2; margin-bottom: 2px; background: #f4f4f4; padding: 3px 6px; border-left: 2.5px solid #000000;">
            <strong>3-Stage Narrative Structure:</strong> Phase 1 (Beginning / Trigger) &rarr; Phase 2 (Turning Point / Escalation) &rarr; Phase 3 (Outcome / Long-term Resolution).
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Phase 1: Beginning</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Phase 2: Turning Point</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Phase 3: Outcome</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
          </div>
        </div>
        `
              : `
        <div style="margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.2; margin-bottom: 2px; background: #f4f4f4; padding: 3px 6px; border-left: 2.5px solid #000000;">
            <strong>The 'X Linked to Y' Importance Model:</strong> Explain what difference X made to Y across two distinct analytical PEEL paragraphs.
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Point 1: Immediate Difference X Made to Y:</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
            <div>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">Point 2: Long-Term Significance for Relations:</span>
              <div class="task-line" style="height: 6.4mm;"></div>
              <div class="task-line" style="height: 6.4mm;"></div>
            </div>
          </div>
        </div>
        `
        }

      </div>

      ${renderFooterStrip(leftPageNum, cfg.leftPageQuip, 14)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: PRIMARY SOURCE + EXAM ASSESSMENT + TIMELINE MISSION     -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Primary Archival Source &bull; Edexcel Paper 2 Exam Assessment
        </span>
      </div>

      <!-- Archival Primary Source Box -->
      <div class="archival-box">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
            ${cfg.source.title}
          </span>
          <span class="archival-shelfmark">
            ${cfg.source.shelfmark}
          </span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          ${
            cfg.source.src
              ? `
          <div style="flex: 1.1; text-align: center;">
            <img src="${cfg.source.src}" alt="${cfg.source.title}" style="max-height: 38mm; max-width: 100%; object-fit: contain; border: 1px solid #000000; filter: grayscale(100%);">
            <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-style: italic; margin-top: 1px; color: #333333;">
              ${cfg.source.caption}
            </div>
          </div>
          `
              : `
          <div style="flex: 1.1; padding: 4px 6px; border: 1px solid #000000; background: #fdfdfd; font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.25; font-style: italic;">
            "The Arab States agree to united action to safeguard their existence, recover Arab rights in Palestine, and reject reconciliation: No peace with Israel, no recognition of Israel, no negotiations with Israel, and adherence to the rights of the Palestinian people in their homeland."
            <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-style: normal; margin-top: 2px; color: #444; font-weight: 700;">
              &mdash; Khartoum Arab League Summit Resolution, Clause 3 (1 Sept 1967)
            </div>
          </div>
          `
          }
          <div style="flex: 1.5; font-size: 6.8pt; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong>Provenance:</strong> ${cfg.source.provenance}<br>
              <span style="margin-top: 2px; display: block;"><strong>Historical Context:</strong> ${cfg.source.context}</span>
            </div>
            <div style="border-top: 1px dashed #666666; padding-top: 2px; margin-top: 2px; background: #f9f9f9; padding: 2px 4px; border-left: 2px solid #000000;">
              <strong>Hinge Question:</strong> <em>${cfg.source.hinge}</em>
            </div>
          </div>
        </div>
      </div>

      <!-- Question Stem & Scaffolding Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.2;">
          ${cfg.examStem}
        </div>
        ${
          cfg.stimulus
            ? `
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; margin-bottom: 2px;">
          <strong>You may use the following in your answer:</strong> &bull; ${cfg.stimulus[0]} &bull; ${cfg.stimulus[1]}<br>
          <em>You must also use information of your own.</em>
        </div>
        `
            : `
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; margin-bottom: 2px;">
          <strong>Guidance:</strong> Focus strictly on explaining one consequence with precise evidence and its historical impact. Do not write a narrative of the event itself.
        </div>
        `
        }
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; Analytical Step-by-Step Framework
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.2px solid #000000; border-radius: 2px; padding: 2px 4px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #000000; line-height: 1.15; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; line-height: 1.15; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.15; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #222222; margin-bottom: 1px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical exam answer in full sentences below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 3px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Timeline Mission (Direct Link to Pages 2–3 Living Timeline) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; line-height: 1.2;">
            ${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      ${renderFooterStrip(rightPageNum, cfg.rightPageQuip, 14)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (Target Grade, 82-Mark Ledger, QR Hub)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12.5pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Student Assessment Record &amp; Progress Tracker
        </h2>
      </div>

      <!-- Pupil Details & Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px; text-align: center; font-weight: 900;"></div>
        </div>
      </div>

      <!-- 82-Mark Progress Ledger Table with 'Date Completed' and Wide Score Boxes -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 4px 6px; width: 14%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Date Completed</th>
              <th style="padding: 4px 8px; width: 32%; text-align: left; border-right: 1px solid #444444; font-size: 7.6pt;">Lesson &bull; Specification Focus</th>
              <th style="padding: 4px 6px; width: 18%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Do Now Retrieval</th>
              <th style="padding: 4px 6px; width: 22%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Exam Practice Practice</th>
              <th style="padding: 4px 6px; width: 14%; text-align: center; font-size: 7.6pt;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.1:</strong> Cairo Conference &amp; Water Wars</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1 Conseq: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 14</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.2:</strong> Straits of Tiran &amp; Six Day War</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2 Narrat: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 18</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.3:</strong> Occupied Territories &amp; Res 242</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Import: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 18</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.4:</strong> Black September &amp; Munich 1972</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1 Conseq: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 14</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.5:</strong> Yom Kippur War &amp; Oil Embargo</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2/Q3 Drill: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 18</strong> ]</td>
            </tr>
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 7.8pt;">Key Topic 2 Assessment Totals</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Do Now: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 50</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Exam Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 32</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 82</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 lines each) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            Teacher Formative Assessment &bull; WWW / EBI Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222222; font-weight: 700;">
            Effort Grade: [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </span>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
          </div>
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </span>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
            <div class="task-line" style="height: 6.4mm;"></div>
          </div>
        </div>
      </div>

      <!-- Interactive Quizzing & Revision QR Hub (5 QR Codes for Lessons 5 to 9) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #000000;">
            Interactive Quizzing &bull; Digital Revision Hub
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; font-weight: 700;">
            Scan with smartphone camera to open live interactive self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          
          <div>
            <div style="width: 44px; height: 44px; margin: 0 auto; border: 1px solid #000000; padding: 1px;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=5')}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; margin-top: 2px; line-height: 1.1;">
              KT 2.1 Quiz<br><span style="font-weight: normal; font-size: 5.8pt;">Water Wars</span>
            </div>
          </div>

          <div>
            <div style="width: 44px; height: 44px; margin: 0 auto; border: 1px solid #000000; padding: 1px;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=6')}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; margin-top: 2px; line-height: 1.1;">
              KT 2.2 Quiz<br><span style="font-weight: normal; font-size: 5.8pt;">Six Day War</span>
            </div>
          </div>

          <div>
            <div style="width: 44px; height: 44px; margin: 0 auto; border: 1px solid #000000; padding: 1px;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=7')}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; margin-top: 2px; line-height: 1.1;">
              KT 2.3 Quiz<br><span style="font-weight: normal; font-size: 5.8pt;">Res 242</span>
            </div>
          </div>

          <div>
            <div style="width: 44px; height: 44px; margin: 0 auto; border: 1px solid #000000; padding: 1px;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=8')}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; margin-top: 2px; line-height: 1.1;">
              KT 2.4 Quiz<br><span style="font-weight: normal; font-size: 5.8pt;">Munich 1972</span>
            </div>
          </div>

          <div>
            <div style="width: 44px; height: 44px; margin: 0 auto; border: 1px solid #000000; padding: 1px;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=lessons&unit=cme_new&lesson=9')}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; margin-top: 2px; line-height: 1.1;">
              KT 2.5 Quiz<br><span style="font-weight: normal; font-size: 5.8pt;">Yom Kippur</span>
            </div>
          </div>

        </div>
      </div>

      ${renderFooterStrip(14, quipList[13], 14)}
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

module.exports = {
  buildCmeKt2TwoPageWorkbook,
};
