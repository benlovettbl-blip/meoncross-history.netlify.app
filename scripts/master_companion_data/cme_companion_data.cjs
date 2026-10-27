/**
 * scripts/master_companion_data/cme_companion_data.cjs
 * Universal 16-Page Master Knowledge Retrieval Companion Data
 * Unit: Conflict in the Middle East, 1945–1995 (Paper 2, Option B1 / P5)
 */

const { CME_PEARSON_QUIZ_BANK } = require('../cme_pearson_quiz_bank.cjs');

const ENQUIRY_DEFS = [
  {
    num: 1,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.1',
    title: 'British Mandate Crisis & Armed Insurgency (1945–1947)',
    focus: 'Balfour Declaration, 1939 White Paper, Aliyah Bet, Irgun, King David Hotel & British surrender of mandate',
    warning: 'Fatal Examiner Trap: Do not confuse the 1917 Balfour Declaration with the 1947 UN Partition Plan. The 1939 White Paper capped Jewish immigration at 75,000, creating desperate Zionist fury during the Holocaust and sparking armed guerrilla attacks against British forces.',
    quote: '"Balfour promised a homeland; the White Paper locked the gates: the King David Hotel bomb ended British rule."',
    questions: [
      CME_PEARSON_QUIZ_BANK[0].questions[0], // Balfour Declaration 1917
      CME_PEARSON_QUIZ_BANK[0].questions[1], // McMahon-Hussein Correspondence
      CME_PEARSON_QUIZ_BANK[0].questions[2], // 1939 White Paper
      CME_PEARSON_QUIZ_BANK[0].questions[4], // Aliyah Bet illegal immigration
      CME_PEARSON_QUIZ_BANK[0].questions[5], // SS Exodus July 1947
      CME_PEARSON_QUIZ_BANK[1].questions[0], // Irgun Menachem Begin
      CME_PEARSON_QUIZ_BANK[1].questions[1], // King David Hotel bombing 22 July 1946 (91 dead)
      CME_PEARSON_QUIZ_BANK[1].questions[2], // Lehi / Stern Gang
      CME_PEARSON_QUIZ_BANK[1].questions[4], // Sergeants affair July 1947
      CME_PEARSON_QUIZ_BANK[1].questions[5], // Britain hands Palestine to United Nations Feb 1947
    ]
  },
  {
    num: 2,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.2',
    title: 'UN Partition Plan & The 1948–1949 War',
    focus: 'UN Resolution 181, Deir Yassin, Plan Dalet, Ben-Gurion declaration & the 1948–49 Arab-Israeli War',
    warning: 'Fatal Examiner Trap: Believing the Arab armies were unified. Egypt, Jordan, Syria, and Iraq distrusted each other; King Abdullah of Jordan had secret contacts with Zionist leaders to seize the West Bank rather than create a Palestinian state.',
    quote: '"UN Resolution 181 divided Palestine; Ben-Gurion declared independence, and 5 Arab armies invaded."',
    questions: [
      CME_PEARSON_QUIZ_BANK[2].questions[0], // UNSCOP Partition Plan
      CME_PEARSON_QUIZ_BANK[2].questions[1], // UN Resolution 181 (55% Jewish, 45% Arab)
      CME_PEARSON_QUIZ_BANK[2].questions[2], // Jerusalem international corpus separatum
      CME_PEARSON_QUIZ_BANK[2].questions[4], // Deir Yassin massacre April 1948
      CME_PEARSON_QUIZ_BANK[2].questions[5], // Plan Dalet (Plan D)
      CME_PEARSON_QUIZ_BANK[3].questions[0], // David Ben-Gurion declares State of Israel 14 May 1948
      CME_PEARSON_QUIZ_BANK[3].questions[1], // 5 Arab armies invade 15 May 1948
      CME_PEARSON_QUIZ_BANK[3].questions[2], // IDF Israel Defense Forces
      CME_PEARSON_QUIZ_BANK[3].questions[3], // Czech arms deal via Avia S-199
      CME_PEARSON_QUIZ_BANK[3].questions[5], // 1949 Armistice agreements (79% territory)
    ]
  },
  {
    num: 3,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.3',
    title: 'The Palestinian Refugee Crisis (Nakba) & Early Israel',
    focus: 'The Nakba (750,000 refugees), UN Resolution 194, UNRWA, Law of Return (1950) & the Green Line',
    warning: 'Fatal Examiner Trap: Believing the 1949 Armistice borders were permanent peace treaties. The 1949 "Green Line" was strictly a temporary military truce; Arab states refused to recognise Israel’s existence and maintained a total economic blockade.',
    quote: '"750,000 Palestinians fled in the Nakba; the Law of Return doubled Israel\'s population in 4 years."',
    questions: [
      CME_PEARSON_QUIZ_BANK[4].questions[0], // 700,000-750,000 refugees (The Nakba)
      CME_PEARSON_QUIZ_BANK[4].questions[1], // Jordan annexes West Bank; Egypt administers Gaza
      CME_PEARSON_QUIZ_BANK[4].questions[2], // UN Resolution 194 right of return
      CME_PEARSON_QUIZ_BANK[4].questions[3], // UNRWA established 1949
      CME_PEARSON_QUIZ_BANK[4].questions[4], // The Law of Return July 1950
      CME_PEARSON_QUIZ_BANK[4].questions[5], // Population doubled 1948-1952 (687,000 arrivals)
      CME_PEARSON_QUIZ_BANK[4].questions[6], // Mizrahi Jews from Arab countries
      CME_PEARSON_QUIZ_BANK[4].questions[7], // Ma'abarot transit camps
      {
        q: 'What name was given to the temporary 1949 armistice border drawn on military maps with green pen?',
        a: 'The Green Line',
        exp: 'Established the de facto borders of Israel until June 1967, leaving Jerusalem divided between Israel and Jordan.'
      },
      {
        q: 'What form of collective agricultural community played a vital role in settling new immigrants and securing Israeli borders?',
        a: 'The Kibbutz (and Moshav cooperatives)',
        exp: 'Combined socialist communal farming with frontier military defense along vulnerable border zones.'
      }
    ]
  },
  {
    num: 4,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.4',
    title: 'Gamal Abdel Nasser & The 1956 Suez Crisis',
    focus: 'Free Officers (1952), Fedayeen border raids, Czech arms deal, Aswan High Dam, nationalisation & Sevres Protocol',
    warning: 'Fatal Examiner Trap: Claiming Britain and France were invited into Suez to keep the peace. The Sevres Protocol was a secret military conspiracy where Israel attacked Egypt first, giving Britain and France the pretext to invade and seize the canal.',
    quote: '"Nasser nationalised the Suez Canal; Eisenhower forced Britain to withdraw: imperial dominance ended."',
    questions: [
      CME_PEARSON_QUIZ_BANK[5].questions[0], // Free Officers Coup 1952 King Farouk
      CME_PEARSON_QUIZ_BANK[5].questions[1], // Gamal Abdel Nasser 1954
      CME_PEARSON_QUIZ_BANK[5].questions[2], // Fedayeen Palestinian guerrillas
      CME_PEARSON_QUIZ_BANK[5].questions[3], // Gaza Raid Feb 1955 (Ariel Sharon)
      CME_PEARSON_QUIZ_BANK[5].questions[4], // Czech Arms Deal Sep 1955 (MiG-15s)
      CME_PEARSON_QUIZ_BANK[5].questions[5], // US cancels Aswan Dam funding July 1956
      CME_PEARSON_QUIZ_BANK[5].questions[6], // Nasser nationalises Suez Canal 26 July 1956
      CME_PEARSON_QUIZ_BANK[5].questions[7], // Protocol of Sevres secret collusion
      {
        q: 'Why did US President Dwight D. Eisenhower force Britain, France, and Israel to withdraw from Suez in November 1956?',
        a: 'Threatened to collapse the British pound by selling US holdings of sterling and cutting IMF emergency loans',
        exp: 'Eisenhower was furious that allies launched an imperial war during the Hungarian Uprising without US approval.'
      },
      {
        q: 'What peacekeeping force was deployed in the Sinai Peninsula and Gaza Strip following the Suez Crisis?',
        a: 'UNEF (United Nations Emergency Force)',
        exp: 'Guaranteed Israeli shipping through the Straits of Tiran and prevented Fedayeen cross-border raids until 1967.'
      }
    ]
  },
  {
    num: 5,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.1',
    title: 'Water Disputes, Fatah Border Raids & Escalation (1964–1967)',
    focus: 'National Water Carrier, War over Water, Headwater Diversion, Yasser Arafat’s Fatah, Syrian border artillery & UNEF expulsion',
    warning: 'Fatal Examiner Trap: Thinking the Six-Day War started out of nowhere in June 1967. The conflict was brewed over 3 years: water disputes on the Jordan headwaters, Syrian shelling from the Golan Heights, and Palestinian Fatah raids through Jordan.',
    quote: '"Syrian guns shelled Galilee; Nasser closed Tiran and expelled UNEF: war became inevitable."',
    questions: [
      CME_PEARSON_QUIZ_BANK[6].questions[0], // Israeli National Water Carrier 1964
      CME_PEARSON_QUIZ_BANK[6].questions[1], // Arab Headwater Diversion Plan (War over Water)
      CME_PEARSON_QUIZ_BANK[6].questions[2], // Israeli airstrikes destroy diversion equipment 1965
      CME_PEARSON_QUIZ_BANK[6].questions[3], // Yasser Arafat's Fatah first attack 1965
      CME_PEARSON_QUIZ_BANK[6].questions[4], // Syrian artillery shelling Galilee kibbutzim from Golan
      CME_PEARSON_QUIZ_BANK[6].questions[5], // Israeli-Syrian dogfight 7 April 1967 (6 Syrian MiGs shot down)
      CME_PEARSON_QUIZ_BANK[6].questions[6], // False Soviet intelligence warning 13 May 1967
      CME_PEARSON_QUIZ_BANK[6].questions[7], // Nasser expels UNEF peacekeepers 16 May 1967
      {
        q: 'On 22 May 1967, what maritime blockade did President Nasser announce that Israel considered an act of war?',
        a: 'The closure of the Straits of Tiran to Israeli shipping',
        exp: 'Cut off Israel’s oil supplies arriving at the southern port of Eilat; Israel had stated in 1957 this was a casus belli.'
      },
      {
        q: 'On 30 May 1967, which monarch signed a joint military defense pact placing Jordan’s army under Egyptian command?',
        a: 'King Hussein of Jordan',
        exp: 'Encircling Israel on three borders and convincing Israeli military leaders that a pre-emptive strike was essential.'
      }
    ]
  },
  {
    num: 6,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.2',
    title: 'The Six-Day War: Pre-emptive Strike & Blitzkrieg (June 1967)',
    focus: 'Operation Focus (7:45am 5 Jun), destruction of Egyptian Air Force, Sinai, West Bank, Old City of Jerusalem & Golan Heights',
    warning: 'Fatal Examiner Trap: Believing the Six-Day War was a long, balanced ground war. The entire war was decided in the first 3 hours on the morning of 5 June 1967 when Operation Focus obliterated the Egyptian Air Force on the ground.',
    quote: '"Operation Focus wiped out 400 Arab jets in 3 hours; Israel seized the Sinai, West Bank, and Golan Heights."',
    questions: [
      CME_PEARSON_QUIZ_BANK[7].questions[0], // Operation Focus (Mivtza Moked) 7:45am 5 June 1967
      CME_PEARSON_QUIZ_BANK[7].questions[1], // Over 300 Egyptian aircraft destroyed on tarmac in 3 hours
      CME_PEARSON_QUIZ_BANK[7].questions[2], // General Yitzhak Rabin and Defence Minister Moshe Dayan
      CME_PEARSON_QUIZ_BANK[7].questions[3], // Jordanian artillery bombardment of West Jerusalem
      CME_PEARSON_QUIZ_BANK[7].questions[4], // Israeli paratroopers capture Old City of Jerusalem 7 June
      CME_PEARSON_QUIZ_BANK[7].questions[5], // Paratroopers reach the Western Wall (Kotel)
      CME_PEARSON_QUIZ_BANK[7].questions[6], // IDF captures Sinai Peninsula to Suez Canal
      CME_PEARSON_QUIZ_BANK[7].questions[7], // Golan Heights captured from Syria 9-10 June
      {
        q: 'By what multiple did Israel’s controlled territory expand as a result of the Six-Day War?',
        a: 'It expanded to more than three times its pre-1967 size',
        exp: 'Israel conquered the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.'
      },
      {
        q: 'How did the Six-Day War fundamentally alter the psychological balance between Israel and Arab states?',
        a: 'Created a sense of Israeli military invincibility while inflicting traumatic humiliation and shame on Arab nations',
        exp: 'Convinced Arab leaders that only a military victory could erase the shame of 1967, setting the stage for 1973.'
      }
    ]
  },
  {
    num: 7,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.3',
    title: 'Conquered Territories, UN Resolution 242 & Rise of the PLO',
    focus: 'Sinai, West Bank, Golan, Khartoum Summit ("Three No’s"), UN Res 242 (Land for Peace), Battle of Karameh & Black September',
    warning: 'Fatal Examiner Trap: Stating UN Resolution 242 required Israel to withdraw from "all" territories. The English text deliberately omits "the", stating "withdrawal from territories occupied", creating decades of diplomatic deadlock over "Land for Peace".',
    quote: '"Khartoum declared Three No’s; UN Res 242 proposed Land for Peace: Palestinian fedayeen took up armed struggle."',
    questions: [
      CME_PEARSON_QUIZ_BANK[8].questions[0], // Territories: Sinai, Gaza, West Bank, East Jerusalem, Golan
      CME_PEARSON_QUIZ_BANK[8].questions[1], // Over 1 million Palestinians placed under military occupation
      CME_PEARSON_QUIZ_BANK[8].questions[2], // Khartoum Resolution Sep 1967 ("Three No's")
      CME_PEARSON_QUIZ_BANK[8].questions[3], // UN Security Council Resolution 242 Nov 1967 ("Land for Peace")
      CME_PEARSON_QUIZ_BANK[8].questions[4], // Ambiguity of "from territories occupied" vs "all territories"
      CME_PEARSON_QUIZ_BANK[9].questions[0], // Yasser Arafat chairman of PLO 1969
      CME_PEARSON_QUIZ_BANK[9].questions[1], // Battle of Karameh March 1968
      CME_PEARSON_QUIZ_BANK[9].questions[2], // PFLP George Habash airline hijackings
      CME_PEARSON_QUIZ_BANK[9].questions[3], // Dawson's Field hijackings Sep 1970
      CME_PEARSON_QUIZ_BANK[9].questions[4], // Black September Jordan civil war (King Hussein expels PLO to Lebanon)
    ]
  },
  {
    num: 8,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.4',
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    focus: 'Bar-Lev Line, Anwar Sadat, Operation Badr (6 Oct 1973), SAM missile umbrella, Chinese Farm & OPEC oil embargo',
    warning: 'Fatal Examiner Trap: Concluding the Yom Kippur War was an Arab military victory. Militarily, Israel counter-attacked, crossed the Suez Canal, and encircled the Egyptian Third Army. However, politically it was a massive Arab psychological victory that shattered Israeli invincibility.',
    quote: '"Operation Badr breached the Bar-Lev Line on Yom Kippur; OPEC weaponized oil and forced US diplomacy."',
    questions: [
      CME_PEARSON_QUIZ_BANK[10].questions[0], // War of Attrition 1969-1970 along Suez Canal
      CME_PEARSON_QUIZ_BANK[10].questions[1], // Bar-Lev Line fortified sand rampart
      CME_PEARSON_QUIZ_BANK[10].questions[2], // Anwar Sadat succeeds Nasser Sep 1970
      CME_PEARSON_QUIZ_BANK[10].questions[3], // Surprise attack 6 October 1973 (Yom Kippur / 10th of Ramadan)
      CME_PEARSON_QUIZ_BANK[10].questions[4], // Operation Badr: high-pressure water cannons breach Bar-Lev Line
      CME_PEARSON_QUIZ_BANK[10].questions[5], // Soviet SAM-6 anti-aircraft and Sagger anti-tank missiles
      CME_PEARSON_QUIZ_BANK[10].questions[6], // Syrian tank assault across Golan Heights
      CME_PEARSON_QUIZ_BANK[10].questions[7], // General Ariel Sharon leads Israeli counter-offensive across Suez Canal
      CME_PEARSON_QUIZ_BANK[11].questions[0], // US military airlift Operation Nickel Grass
      CME_PEARSON_QUIZ_BANK[11].questions[1], // OPEC oil embargo October 1973 (oil price quadrupled)
    ]
  },
  {
    num: 9,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.1',
    title: 'Shuttle Diplomacy & The Camp David Accords (1974–1979)',
    focus: 'Henry Kissinger, Disengagement agreements, Sadat’s 1977 Jerusalem speech, Jimmy Carter, Menachem Begin & 1979 Peace Treaty',
    warning: 'Fatal Examiner Trap: Stating the Camp David Accords solved the Palestinian problem. Camp David was a bilateral separate peace between Egypt and Israel: Egypt regained Sinai, but Arab nations branded Sadat a traitor and expelled Egypt from the Arab League.',
    quote: '"Sadat addressed the Knesset in Jerusalem; Camp David returned the Sinai and cost Sadat his life."',
    questions: [
      CME_PEARSON_QUIZ_BANK[11].questions[2], // Henry Kissinger "Shuttle Diplomacy"
      CME_PEARSON_QUIZ_BANK[11].questions[3], // 1974-75 Sinai Disengagement Agreements
      CME_PEARSON_QUIZ_BANK[12].questions[0], // Anwar Sadat's historic speech to Israeli Knesset Nov 1977
      CME_PEARSON_QUIZ_BANK[12].questions[1], // Israeli Prime Minister Menachem Begin (Likud party)
      CME_PEARSON_QUIZ_BANK[12].questions[2], // US President Jimmy Carter hosts Camp David summit Sep 1978
      CME_PEARSON_QUIZ_BANK[12].questions[3], // 13 days of secret negotiations at Camp David
      CME_PEARSON_QUIZ_BANK[12].questions[4], // Egypt-Israel Peace Treaty 26 March 1979 on White House lawn
      CME_PEARSON_QUIZ_BANK[12].questions[5], // Israel returns Sinai Peninsula in exchange for peace and recognition
      CME_PEARSON_QUIZ_BANK[12].questions[6], // Arab League expels Egypt and moves headquarters from Cairo to Tunis
      CME_PEARSON_QUIZ_BANK[12].questions[7], // Anwar Sadat assassinated by Islamic extremists 6 October 1981
    ]
  },
  {
    num: 10,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.2',
    title: 'The Lebanon War & The Sabra-Shatila Massacres (1982–1985)',
    focus: 'Operation Peace for Galilee, Ariel Sharon, Siege of Beirut, PLO evacuation to Tunis, Phalangists & Kahan Commission',
    warning: 'Fatal Examiner Trap: Blaming the IDF for physically shooting refugees at Sabra and Shatila. Christian Phalangist militiamen carried out the massacre; however, the Israeli Kahan Commission found Defence Minister Ariel Sharon personally responsible for allowing them into the camps.',
    quote: '"Operation Peace for Galilee besieged Beirut; Sabra-Shatila forced Sharon\'s resignation and created Hezbollah."',
    questions: [
      CME_PEARSON_QUIZ_BANK[13].questions[0], // Operation Peace for Galilee 6 June 1982
      CME_PEARSON_QUIZ_BANK[13].questions[1], // Attempted assassination of Shlomo Argov by Abu Nidal group
      CME_PEARSON_QUIZ_BANK[13].questions[2], // Ariel Sharon advances 25 miles beyond official cabinet limit
      CME_PEARSON_QUIZ_BANK[13].questions[3], // IDF lays siege to West Beirut for 7 weeks
      CME_PEARSON_QUIZ_BANK[13].questions[4], // PLO fighters evacuated by sea to Tunisia August 1982
      CME_PEARSON_QUIZ_BANK[13].questions[5], // Christian Phalangist militia enters Sabra and Shatila refugee camps Sep 1982
      CME_PEARSON_QUIZ_BANK[13].questions[6], // 800 to 2,000 Palestinian civilians slaughtered by Phalangists
      CME_PEARSON_QUIZ_BANK[13].questions[7], // Kahan Commission finds Sharon personally responsible for negligence
      {
        q: 'Which Iranian-backed Shia militant and political movement was created in southern Lebanon to fight Israeli occupation?',
        a: 'Hezbollah ("Party of God")',
        exp: 'Launched suicide bombings and guerrilla attacks against the IDF until Israel fully withdrew from Lebanon in 2000.'
      },
      {
        q: 'In 1985, what narrow security strip did the IDF retain in southern Lebanon to protect northern Israeli towns?',
        a: 'The Southern Lebanon Security Zone',
        exp: 'Patrolled by the IDF and the South Lebanon Army (SLA) as a buffer against cross-border rocket attacks.'
      }
    ]
  },
  {
    num: 11,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.3',
    title: 'The First Palestinian Intifada & Rise of Hamas (1987–1993)',
    focus: 'Jabalya road accident, stone-throwers, unified leadership, "Iron Fist" policy, Sheikh Ahmed Yassin & Hamas',
    warning: 'Fatal Examiner Trap: Claiming the Intifada was planned by Yasser Arafat. The First Intifada was a spontaneous grassroots uprising organised by local Palestinian youth in Gaza and the West Bank; Arafat and the PLO leadership were caught by surprise in exile in Tunis.',
    quote: '"A road crash in Jabalya sparked the Uprising; stone-throwing youth challenged Israeli troops on global TV."',
    questions: [
      CME_PEARSON_QUIZ_BANK[14].questions[0], // Road accident in Jabalya refugee camp Dec 1987 kills 4 Palestinians
      CME_PEARSON_QUIZ_BANK[14].questions[1], // The First Intifada ("shaking off" / uprising)
      CME_PEARSON_QUIZ_BANK[14].questions[2], // Young Palestinians throw stones and petrol bombs at Israeli tanks
      CME_PEARSON_QUIZ_BANK[14].questions[3], // Defence Minister Yitzhak Rabin orders "Iron Fist" policy ("break their bones")
      CME_PEARSON_QUIZ_BANK[14].questions[4], // Commercial strikes, tax boycotts, and civil disobedience
      CME_PEARSON_QUIZ_BANK[14].questions[5], // Over 1,000 Palestinians and 160 Israelis killed 1987-1993
      CME_PEARSON_QUIZ_BANK[14].questions[6], // Sheikh Ahmed Yassin founds Hamas December 1987
      CME_PEARSON_QUIZ_BANK[14].questions[7], // 1988 Hamas Covenant calls for destruction of Israel and Islamic state
      {
        q: 'What secret local committee coordinated strikes, demonstrations, and medical supplies during the Intifada?',
        a: 'The Unified National Leadership of the Uprising (UNLU)',
        exp: 'Distributed clandestine leaflets directing daily resistance activities while avoiding arrest by Israeli security.'
      },
      {
        q: 'In November 1988, what historic concession did Yasser Arafat make to the Palestine National Council in Algiers?',
        a: 'Accepted UN Resolution 242, implicitly recognised Israel, and renounced terrorism',
        exp: 'Paved the way for the US government to open formal diplomatic dialogue with the PLO for the first time.'
      }
    ]
  },
  {
    num: 12,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.4',
    title: 'The Peace Process: Oslo Accords & Rabin’s Assassination (1991–1995)',
    focus: 'Madrid (1991), secret talks in Norway, 1993 Oslo Accords, White House handshake, Area A/B/C & assassination of Rabin',
    warning: 'Fatal Examiner Trap: Confusing the Oslo Accords with a final peace treaty. Oslo was an interim 5-year framework establishing Palestinian self-rule (the PA); it postponed the toughest issues—Jerusalem, borders, settlements, and refugees—which ultimately derailed the process.',
    quote: '"Rabin and Arafat shook hands on the White House lawn; an extremist bullet at Tel Aviv shattered Oslo."',
    questions: [
      CME_PEARSON_QUIZ_BANK[15].questions[0], // Madrid Peace Conference October 1991
      CME_PEARSON_QUIZ_BANK[15].questions[1], // Secret bilateral talks in Oslo, Norway 1993
      CME_PEARSON_QUIZ_BANK[15].questions[2], // Oslo Accords (Declaration of Principles) signed 13 September 1993
      CME_PEARSON_QUIZ_BANK[15].questions[3], // Historic handshake between Yitzhak Rabin and Yasser Arafat on White House lawn
      CME_PEARSON_QUIZ_BANK[15].questions[4], // Establishment of Palestinian National Authority (PNA) for Gaza and Jericho
      CME_PEARSON_QUIZ_BANK[15].questions[5], // Oslo II (1995) divides West Bank into Areas A, B, and C
      CME_PEARSON_QUIZ_BANK[15].questions[6], // Hamas launches wave of suicide bus bombings to destroy peace process
      CME_PEARSON_QUIZ_BANK[15].questions[7], // Baruch Goldstein kills 29 Muslims in Ibrahimi Mosque Hebron Feb 1994
      {
        q: 'On 4 November 1995, which Israeli leader was assassinated at a peace rally in Kings of Israel Square, Tel Aviv?',
        a: 'Prime Minister Yitzhak Rabin',
        exp: 'Shot dead by Yigal Amir, an ultra-nationalist Jewish law student who opposed ceding West Bank land to Palestinians.'
      },
      {
        q: 'Which 1994 bilateral treaty established peace between Israel and its eastern Arab neighbour following Oslo?',
        a: 'The Israel-Jordan Peace Treaty (signed by Rabin and King Hussein)',
        exp: 'Made Jordan only the second Arab nation after Egypt to formally recognise and establish diplomatic ties with Israel.'
      }
    ]
  }
];

const CME_ENQUIRY_QUESTIONS = [
  "Why did the British Mandate in Palestine become ungovernable between 1945 and 1947?",
  "Why did the UN partition plan lead directly to the 1948–1949 Arab-Israeli War and Palestinian refugee crisis?",
  "Why did Nasser's nationalisation of the Suez Canal trigger the 1956 Suez Crisis and war with Israel?",
  "What were the primary causes and territorial consequences of the Six-Day War of June 1967?",
  "Why was Israel caught unprepared by the Yom Kippur War of October 1973 and what was its global impact?",
  "Why did Anwar Sadat break Arab consensus to sign the 1978–1979 Camp David Accords with Israel?",
  "Why did Israel launch Operation Peace for Galilee and invade Lebanon in 1982?",
  "How did the First Palestinian Intifada (1987–1993) challenge Israeli authority in the Occupied Territories?",
  "Why did Yasser Arafat and Yitzhak Rabin sign the historic Oslo Accords in September 1993?",
  "How did Jewish settlement expansion and the 1994 Hebron massacre destabilise the peace process?",
  "Why did the 1994 Israel-Jordan Peace Treaty succeed while peace negotiations with Syria failed?",
  "How did the assassination of Yitzhak Rabin in November 1995 deal a fatal blow to the Oslo peace process?"
];

const CME_MILESTONES = [
  // 1: British Mandate
  [
    { date: 'Nov 1917', title: 'Balfour Declaration Issued' },
    { date: 'May 1939', title: 'British White Paper Caps Entry' },
    { date: '22 Jul 1946', title: 'King David Hotel Bombing' },
    { date: 'Feb 1947', title: 'Britain Refers to UN' },
    { date: 'Jul 1947', title: 'SS Exodus Turned Back' }
  ],
  // 2: Partition & 1948 War
  [
    { date: '29 Nov 1947', title: 'UN Resolution 181 Partition' },
    { date: 'Apr 1948', title: 'Haganah Executes Plan Dalet' },
    { date: '14 May 1948', title: 'Ben-Gurion Declares State' },
    { date: '15 May 1948', title: '5 Arab Armies Invade' },
    { date: '1949', title: 'Armistices: Israel Takes 79%' }
  ],
  // 3: Palestinian Refugees & Early Israel
  [
    { date: '1948–49', title: '750,000 Flee in Nakba' },
    { date: 'Dec 1948', title: 'UN Resolution 194 Passed' },
    { date: 'Dec 1949', title: 'UNRWA Agency Founded' },
    { date: 'Jul 1950', title: 'Law of Return Enacted' },
    { date: 'Oct 1953', title: 'Qibya Raid by Unit 101' }
  ],
  // 4: Suez Crisis & 1956 War
  [
    { date: 'Jul 1952', title: 'Free Officers Coup in Egypt' },
    { date: 'Jul 1956', title: 'Nasser Nationalises Suez' },
    { date: '22 Oct 1956', title: 'Protocol of Sèvres Signed' },
    { date: '29 Oct 1956', title: 'Israel Invades Sinai' },
    { date: 'Nov 1956', title: 'US Halts Anglo-French Attack' }
  ],
  // 5: Six-Day War
  [
    { date: 'May 1967', title: 'Nasser Expels UNEF Troops' },
    { date: '22 May 1967', title: 'Straits of Tiran Closed' },
    { date: '5 Jun 1967', title: 'Operation Focus Destroys Jets' },
    { date: '7 Jun 1967', title: 'IDF Seizes Old Jerusalem' },
    { date: 'Nov 1967', title: 'UN Resolution 242 (Land for Peace)' }
  ],
  // 6: War of Attrition & PLO
  [
    { date: '1964', title: 'PLO Founded in Cairo' },
    { date: '1968', title: 'Battle of Karameh (Arafat)' },
    { date: '1969–70', title: 'Suez War of Attrition' },
    { date: 'Sep 1970', title: 'Black September in Jordan' },
    { date: 'Sep 1972', title: 'Munich Olympics Massacre' }
  ],
  // 7: Yom Kippur War
  [
    { date: '6 Oct 1973', title: 'Surprise Attack on Yom Kippur' },
    { date: 'Oct 1973', title: 'IDF Crosses Suez Canal' },
    { date: 'Oct 1973', title: 'OAPEC Imposes Oil Embargo' },
    { date: '22 Oct 1973', title: 'UN Resolution 338 Ceasefire' },
    { date: '1974', title: 'Agranat Commission Report' }
  ],
  // 8: Camp David Accords
  [
    { date: 'Nov 1977', title: 'Sadat Visits Jerusalem' },
    { date: 'Sep 1978', title: 'Camp David Accords Signed' },
    { date: 'Mar 1979', title: 'Washington Peace Treaty' },
    { date: '1979', title: 'Arab League Expels Egypt' },
    { date: 'Oct 1981', title: 'Sadat Assassinated in Cairo' }
  ],
  // 9: 1982 Lebanon War
  [
    { date: 'Jun 1982', title: 'Argov Assassination Attempt' },
    { date: '6 Jun 1982', title: 'Peace for Galilee Invasion' },
    { date: 'Aug 1982', title: 'PLO Evacuated from Beirut' },
    { date: 'Sep 1982', title: 'Sabra & Shatila Massacres' },
    { date: '1982–85', title: 'Hezbollah Founded in South' }
  ],
  // 10: First Intifada & Hamas
  [
    { date: '8 Dec 1987', title: 'Gaza Crash Sparks Revolt' },
    { date: 'Dec 1987', title: 'Hamas Formed by Yassin' },
    { date: '1988', title: 'Stone War & Broken Bones Policy' },
    { date: 'Nov 1988', title: 'Arafat Accepts UN 242' },
    { date: 'Oct 1991', title: 'Madrid Peace Conference' }
  ],
  // 11: Oslo Accords
  [
    { date: 'Jan 1993', title: 'Secret Talks in Norway' },
    { date: '9 Sep 1993', title: 'Mutual Recognition Letters' },
    { date: '13 Sep 1993', title: 'White House Lawn Handshake' },
    { date: 'May 1994', title: 'Gaza-Jericho Self-Rule' },
    { date: 'Sep 1995', title: 'Oslo II Divides Areas A/B/C' }
  ],
  // 12: Jordan Treaty & Rabin's Assassination
  [
    { date: 'Feb 1994', title: 'Hebron Mosque Massacre' },
    { date: 'Oct 1994', title: 'Israel-Jordan Peace Treaty' },
    { date: 'Oct 1995', title: 'Zion Square Rally Invective' },
    { date: '4 Nov 1995', title: 'Rabin Shot Dead in Tel Aviv' },
    { date: 'May 1996', title: 'Netanyahu Elected PM' }
  ]
];

const mappedEnquiries = ENQUIRY_DEFS.map((enq, idx) => ({
  number: enq.num,
  keyTopic: enq.kt,
  topicCode: enq.topicCode,
  title: enq.title,
  focus: enq.focus,
  enquiryQuestion: CME_ENQUIRY_QUESTIONS[idx] || enq.title,
  examinerWarning: enq.warning,
  footerQuote: enq.quote,
  milestones: CME_MILESTONES[idx] || [],
  questions: enq.questions.slice(0, 8).map((q, qIdx) => ({
    num: qIdx + 1,
    q: q.q,
    a: q.a,
    exp: q.exp
  }))
}));

module.exports = {
  unitId: 'cme',
  unitTitle: 'Conflict in the Middle East, 1945–1995',
  paperCode: 'Pearson Edexcel GCSE (9–1) History • Paper 2: Period Study (Option B1 / P5)',
  heroImage: 'images/cme_oslo_handshake_1993.jpg',
  heroCaption: 'Source A: Israeli PM Yitzhak Rabin, US President Bill Clinton, and PLO Chairman Yasser Arafat at the Oslo Accords signing on the White House lawn (13 September 1993). US National Archives (NARA).',
  enquiries: mappedEnquiries,
  bankPages: [
    { title: 'Enquiries 1–4: Key Topic 1 The Birth of Israel & 1956 Crisis (1945–1956)', startQ: 1, endQ: 32, pageNum: 14 },
    { title: 'Enquiries 5–8: Key Topic 2 Six-Day War to Camp David (1967–1979)', startQ: 33, endQ: 64, pageNum: 15 },
    { title: 'Enquiries 9–12: Key Topic 3 Lebanon, Intifada & The Peace Process (1982–1995)', startQ: 65, endQ: 96, pageNum: 16 }
  ]
};
