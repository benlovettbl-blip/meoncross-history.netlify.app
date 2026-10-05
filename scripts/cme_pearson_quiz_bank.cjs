/**
 * cme_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 2 (Conflict in the Middle East, 1945–1995)
 * Master Knowledge Retrieval Bank (12 Lessons x 12 Questions = 144 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Revision Guide: Every question and answer is verifiable directly in the guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, zero university-level historiography.
 * 3. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 4. Progressive Flow: Q1-4 Chronology/Foundations -> Q5-8 Causal Mechanisms -> Q9-12 Outcomes/Significance.
 */

const PEARSON_QUIZ_BANK = [
  // =========================================================================
  // LESSON 1: The 1945 Baseline & Imperial Legacies
  // =========================================================================
  {
    num: 1,
    title: 'The 1945 Baseline & Imperial Legacies',
    questions: [
      {
        q: 'What 1917 British diplomatic statement promised support for a "national home for the Jewish people" in Palestine?',
        a: 'The Balfour Declaration (1917)',
        exp: 'Promised British support for a Jewish homeland while stating existing non-Jewish civil rights should not be prejudiced.',
      },
      {
        q: 'What 1915 letters led Arab leaders to believe Britain had promised post-war Arab independence?',
        a: 'The McMahon-Hussein Correspondence',
        exp: 'Britain promised Arab independence in exchange for an Arab revolt against Ottoman rule.',
      },
      {
        q: 'What 1939 British policy paper restricted Jewish immigration into Palestine to 75,000 over five years?',
        a: 'The 1939 British White Paper (MacDonald White Paper)',
        exp: 'Britain aimed to appease Arab opinion ahead of WWII, angering Zionists during the Holocaust.',
      },
      {
        q: 'Following WWII in 1945, what urgent humanitarian demand did US President Truman make of Britain?',
        a: 'Immediate admission of 100,000 Jewish Displaced Persons (DPs)',
        exp: 'Truman pressured Britain to grant immediate entry to Holocaust survivors stranded in European camps.',
      },
      {
        q: 'What was the approximate demographic balance in Mandatory Palestine in 1945?',
        a: 'Approximately 1.2 million Palestinian Arabs and 600,000 Jews (2:1 Arab majority)',
        exp: 'Arabs demanded a single unitary democratic state; Zionists demanded an independent Jewish sovereign state.',
      },
      {
        q: 'Why did Britain find governing the Palestine Mandate unsustainable after 1945?',
        a: 'Armed Jewish insurgency, post-WWII economic exhaustion, and heavy troop casualties',
        exp: 'Maintaining 100,000 British soldiers in Palestine became financially and politically impossible for Britain.',
      },
      {
        q: 'In what month and year did the British government refer the problem of Palestine to the United Nations?',
        a: 'February 1947',
        exp: 'Prime Minister Attlee and Foreign Secretary Ernest Bevin announced Britain would surrender the Mandate.',
      },
      {
        q: 'Why was the Suez Canal of vital strategic importance to Britain after 1945?',
        a: 'It was the main maritime route for Middle Eastern oil to Western Europe',
        exp: "Two-thirds of Western Europe's oil passed through the canal, making British regional presence vital.",
      },
      {
        q: "Which narrow maritime passage at Sharm el-Sheikh commands access to Israel's southern port of Eilat?",
        a: 'The Straits of Tiran (Gulf of Aqaba)',
        exp: 'Controlling access to the Red Sea, any Egyptian blockade here was treated by Israel as an act of war.',
      },
      {
        q: 'Which large desert peninsula acted as the natural military buffer between Egypt and Israel?',
        a: 'The Sinai Peninsula',
        exp: 'Its 60,000 square kilometres of desert separated Egyptian armies from Israeli population centres.',
      },
      {
        q: 'Which elevated volcanic plateau in south-west Syria overlooked Israeli farming communities in Galilee?',
        a: 'The Golan Heights',
        exp: 'Syrian artillery used this high ridge to bombard Israeli kibbutzim in the valley below before 1967.',
      },
      {
        q: 'What special international status was proposed for Jerusalem under the 1947 UN Partition Plan?',
        a: 'An international zone administered by the United Nations',
        exp: "Recognised Jerusalem's unique religious significance to Jews, Christians, and Muslims.",
      },
    ],
  },

  // =========================================================================
  // LESSON 2: The End of the Mandate & The Birth of Israel (1945–1948)
  // =========================================================================
  {
    num: 2,
    title: 'The End of the Mandate & The Birth of Israel (1945–1949)',
    questions: [
      {
        q: 'Which militant Zionist underground group bombed the British administrative headquarters in July 1946?',
        a: 'The Irgun (led by Menachem Begin)',
        exp: 'Carried out on 22 July 1946, killing 91 people and shattering British public support for remaining in Palestine.',
      },
      {
        q: 'What building in Jerusalem was targeted by the Irgun bomb attack in July 1946?',
        a: 'The King David Hotel',
        exp: 'Housed the central British military command and civil administration in Mandatory Palestine.',
      },
      {
        q: 'What historic partition resolution was passed by the United Nations General Assembly in November 1947?',
        a: 'UN Resolution 181',
        exp: 'Voted 33 to 13 to partition Palestine into separate Arab and Jewish states with an international Jerusalem.',
      },
      {
        q: "What percentage of Palestine's land was allocated to the Jewish state under UN Resolution 181?",
        a: '55% of the land (compared to 45% for the Arab state)',
        exp: 'Zionist leaders accepted the plan; Palestinian Arabs and all Arab states rejected it as unjust.',
      },
      {
        q: 'How did the Jewish Agency and Arab leaders react to UN Resolution 181?',
        a: 'The Jewish Agency accepted partition; Arab leaders rejected it completely',
        exp: 'Arabs argued giving majority territory to a minority population violated democratic self-determination.',
      },
      {
        q: 'What broke out across Palestine immediately following the UN partition vote in late 1947?',
        a: 'Civil war between Jewish and Palestinian Arab communities',
        exp: 'Both sides fought fiercely for control of strategic towns, highways, and supply corridors.',
      },
      {
        q: 'What notorious attack on an Arab village on 9 April 1948 caused widespread civilian panic and flight?',
        a: 'The Deir Yassin massacre',
        exp: 'Over 100 Arab villagers were killed by Irgun and Lehi fighters, accelerating mass Arab flight.',
      },
      {
        q: 'On what date did David Ben-Gurion officially proclaim the declaration of the State of Israel?',
        a: '14 May 1948',
        exp: 'Declared in Tel Aviv hours before the British Mandate officially expired at midnight.',
      },
      {
        q: 'Who became the first Prime Minister of the newly declared State of Israel in May 1948?',
        a: 'David Ben-Gurion',
        exp: 'Head of the Jewish Agency who unified competing militias into a single national army.',
      },
      {
        q: 'What occurred on 15 May 1948, the day after Israel declared independence?',
        a: 'Armies of five neighboring Arab states invaded Israel',
        exp: 'Egypt, Transjordan, Syria, Lebanon, and Iraq invaded to destroy the newly proclaimed Jewish state.',
      },
      {
        q: 'What unified national military force was created by David Ben-Gurion in late May 1948?',
        a: 'The Israeli Defence Forces (IDF)',
        exp: 'Integrated the Haganah, Irgun, and Lehi into a single national army under government command.',
      },
      {
        q: 'What decisive advantage did Israel gain during the first UN ceasefire in June 1948?',
        a: 'Importing modern weapons and fighter aircraft from Czechoslovakia',
        exp: 'Allowed Israel to rearm, train recruits, and gain firepower superiority over divided Arab forces.',
      },
    ],
  },

  // =========================================================================
  // LESSON 3: The 1948–49 War, Armistice & The Refugee Crisis
  // =========================================================================
  {
    num: 3,
    title: 'The 1948–49 War, Armistice & The Refugee Crisis',
    questions: [
      {
        q: 'Name two Arab nations whose armies invaded Israel during the 1948–49 War.',
        a: 'Egypt and Jordan (Transjordan) [also Syria, Lebanon, Iraq]',
        exp: 'Arab armies attacked from multiple fronts but lacked central coordination and shared military objectives.',
      },
      {
        q: 'Why did the invading Arab armies fail to defeat Israel during the 1948–49 War?',
        a: 'Lack of unified command and rival political ambitions among Arab leaders',
        exp: 'Arab leaders distrusted one another; King Abdullah of Jordan aimed primarily to capture the West Bank.',
      },
      {
        q: 'What proportion of Mandatory Palestine did Israel control by the end of the 1948–49 War?',
        a: '78% of the territory (21% more land than allocated by the UN plan)',
        exp: 'Israel secured its borders and expanded into Western Galilee, a corridor to Jerusalem, and the Negev.',
      },
      {
        q: 'What was the name of the official armistice boundary established in 1949 between Israel and its neighbors?',
        a: 'The Green Line',
        exp: "Drawn with green pencil at Rhodes armistice talks, serving as Israel's borders until June 1967.",
      },
      {
        q: 'How was the city of Jerusalem divided following the 1949 Armistice Agreements?',
        a: 'West Jerusalem held by Israel; East Jerusalem and the Old City held by Jordan',
        exp: 'Divided by concrete walls and barbed wire; Jewish Israelis were denied access to the Western Wall.',
      },
      {
        q: 'Which Arab country formally annexed the West Bank and East Jerusalem following the 1948–49 War?',
        a: 'Jordan (The Hashemite Kingdom of Jordan)',
        exp: 'King Abdullah formally incorporated the West Bank into Jordan in 1950, granting residents Jordanian citizenship.',
      },
      {
        q: 'Which Arab country took administrative military control of the Gaza Strip after 1949?',
        a: 'Egypt',
        exp: 'Egypt placed Gaza under military rule but did not grant Egyptian citizenship to its Palestinian residents.',
      },
      {
        q: 'Approximately how many Palestinian Arabs became refugees as a result of the 1948–49 War?',
        a: 'Approximately 700,000 to 750,000 Palestinian Arabs',
        exp: 'Palestinians fled or were expelled from their homes, an event remembered in Arabic as Al-Nakba.',
      },
      {
        q: 'What United Nations agency was established in 1949 to provide humanitarian relief to Palestinian refugees?',
        a: 'UNRWA (United Nations Relief and Works Agency)',
        exp: 'Provided essential food, healthcare, and education in refugee camps across Gaza, West Bank, Jordan, and Lebanon.',
      },
      {
        q: 'What 1950 Israeli law gave every Jewish person worldwide the legal right to settle in Israel and gain citizenship?',
        a: 'The Law of Return (1950)',
        exp: 'Facilitated mass immigration of hundreds of thousands of European Holocaust survivors and Middle Eastern Jews.',
      },
      {
        q: 'How did the United States support the infant State of Israel economically after 1948?',
        a: 'Provided a $100 million development loan and vital diplomatic recognition',
        exp: 'American financial assistance helped Israel develop infrastructure and absorb mass immigration.',
      },
      {
        q: 'Why did Arab states refuse to sign formal peace treaties with Israel after the 1949 armistices?',
        a: "They refused to recognize Israel's legitimacy and demanded the return of all refugees",
        exp: 'Arab governments maintained an economic and diplomatic boycott, viewing Israel as an illegal entity.',
      },
    ],
  },

  // =========================================================================
  // LESSON 4: Nasser, the Gaza Raid & The 1956 Suez Crisis
  // =========================================================================
  {
    num: 4,
    title: 'Nasser, the Gaza Raid & The 1956 Suez Crisis',
    questions: [
      {
        q: 'Who became the charismatic nationalist President of Egypt in 1954?',
        a: 'Gamal Abdel Nasser',
        exp: 'Overthrew the monarchy to establish a republic, championing Pan-Arab unity and opposing Western imperialism.',
      },
      {
        q: 'What were the cross-border guerrilla fighters operating from Egyptian-held Gaza called?',
        a: 'Fedayeen ("self-sacrificers")',
        exp: 'Carried out sabotage raids into Israeli territory, provoking severe Israeli military retaliation.',
      },
      {
        q: 'What was the significant impact of the Israeli military raid on Gaza in February 1955?',
        a: 'The IDF killed 37 Egyptian soldiers, humiliating Nasser and spurring Egyptian rearmament',
        exp: 'Convinced Nasser that Egypt urgently required modern weaponry to defend against Israeli military power.',
      },
      {
        q: 'How did Nasser acquire advanced Soviet tanks and jet aircraft in September 1955?',
        a: 'The Czech Arms Deal',
        exp: 'Nasser bypassed Western arms embargoes by purchasing Soviet weapons via Czechoslovakia, alarming the West.',
      },
      {
        q: "Why did the US and Britain cancel funding for Egypt's Aswan High Dam in July 1956?",
        a: "Anger over Nasser's Soviet arms deal and his diplomatic recognition of Communist China",
        exp: 'US Secretary of State Dulles withdrew loans to pressure Nasser away from alignment with the Soviet bloc.',
      },
      {
        q: 'On what date did President Nasser nationalise the Suez Canal Company?',
        a: '26 July 1956',
        exp: 'Seized canal toll revenues to fund construction of the Aswan High Dam, outraging Britain and France.',
      },
      {
        q: 'What secret agreement was signed in October 1956 by Britain, France, and Israel to attack Egypt?',
        a: 'The Protocol of Sèvres',
        exp: 'Britain, France, and Israel secretly colluded to orchestrate an Israeli attack and Anglo-French invasion.',
      },
      {
        q: 'What military action did Israel take on 29 October 1956 under the Sèvres plan?',
        a: 'Invaded the Sinai Peninsula, advancing rapidly towards the Suez Canal',
        exp: 'Provided Britain and France the pretext to intervene as "peacekeepers" to protect international shipping.',
      },
      {
        q: 'What ultimatum did Britain and France issue to Egypt and Israel on 30 October 1956?',
        a: 'Demanded both armies withdraw 10 miles from the Suez Canal',
        exp: 'A deliberate trap; Nasser refused, allowing Anglo-French forces to bomb Egyptian airfields and land troops.',
      },
      {
        q: 'Why was British Prime Minister Anthony Eden forced to halt the Suez invasion in November 1956?',
        a: 'US President Eisenhower threatened devastating financial sanctions against the British pound',
        exp: 'The US refused to support military action, forcing an immediate British ceasefire and humiliation.',
      },
      {
        q: 'What international peacekeeping force was stationed in the Sinai following the 1956 Suez Crisis?',
        a: 'UNEF (United Nations Emergency Force)',
        exp: 'Positioned along the Egypt-Israel border and at Sharm el-Sheikh to guarantee open Israeli passage in Tiran.',
      },
      {
        q: 'What was the political outcome of the Suez Crisis for Egyptian President Nasser?',
        a: 'Nasser achieved a massive political victory and became the undisputed hero of the Arab world',
        exp: 'Despite battlefield defeat, Nasser retained the canal and stood up to imperial powers, forming the UAR in 1958.',
      },
    ],
  },

  // =========================================================================
  // LESSON 5: Water Wars, Border Clashes & Escalation (1964–1967)
  // =========================================================================
  {
    num: 5,
    title: 'Water Wars, Border Clashes & Escalation (1964–1967)',
    questions: [
      {
        q: 'What political and military organization was created at the Cairo Arab League Summit in January 1964?',
        a: 'The Palestine Liberation Organization (PLO)',
        exp: 'Established to mobilize the Palestinian people and lead the struggle to liberate Palestine.',
      },
      {
        q: 'Which armed Palestinian guerrilla faction led by Yasser Arafat launched raids against Israel from 1965?',
        a: 'Fatah',
        exp: 'Carried out sabotage attacks on Israeli water infrastructure and railways, provoking severe Israeli retaliation.',
      },
      {
        q: 'What vital natural resource dispute heightened tensions between Israel and Syria in 1964–65?',
        a: 'Syrian attempts to divert the headwaters of the River Jordan',
        exp: "Syria attempted to divert water feeding Israel's National Water Carrier, leading to Israeli airstrikes.",
      },
      {
        q: 'What political faction seized power in Syria in February 1966, escalating border hostilities?',
        a: "The radical Ba'ath Party",
        exp: 'Advocated an aggressive military stance against Israel and provided active support and bases for Fatah guerrillas.',
      },
      {
        q: 'What major retaliatory raid did the IDF launch into the Jordanian West Bank in November 1966?',
        a: 'The Samu Raid',
        exp: 'Israel destroyed dozens of houses in Samu in response to a Fatah landmine, severely damaging ties with Jordan.',
      },
      {
        q: 'What significant aerial clash occurred between Israel and Syria on 7 April 1967?',
        a: 'Israeli fighter jets shot down six Syrian MiG-21s in a dogfight',
        exp: 'Israeli jets pursued Syrian fighters over Damascus, deeply humiliating the Syrian government.',
      },
      {
        q: 'What false intelligence did the Soviet Union supply to Egypt in May 1967?',
        a: 'Falsely claimed Israel was concentrating 13 brigades on the Syrian border to invade',
        exp: 'Pressured Nasser into dramatic military mobilization to demonstrate leadership of the Arab alliance.',
      },
      {
        q: 'What demand did President Nasser make of the United Nations Emergency Force (UNEF) on 16 May 1967?',
        a: 'Demanded the immediate withdrawal of all UN peacekeepers from the Sinai',
        exp: 'UN Secretary-General U Thant complied, leaving Egyptian and Israeli forces directly confronting each other.',
      },
      {
        q: 'What provocative military blockade did Nasser impose on 22 May 1967?',
        a: 'Closed the Straits of Tiran to all Israeli shipping',
        exp: "Cut off Israeli trade through the port of Eilat, crossing Israel's declared red line for war.",
      },
      {
        q: 'How many Egyptian troops and tanks did Nasser deploy forward into the Sinai desert in May 1967?',
        a: 'Approximately 100,000 troops and 1,000 tanks',
        exp: "Created an immediate threat of invasion on Israel's southern border, forcing full Israeli mobilization.",
      },
      {
        q: "What mutual defense pact was signed on 30 May 1967 that completed Israel's military encirclement?",
        a: 'A joint defense pact between Egypt and King Hussein of Jordan',
        exp: "Placed Jordan's armed forces under Egyptian command, surrounding Israel on three hostile fronts.",
      },
      {
        q: 'Who was appointed Israeli Minister of Defense on 1 June 1967 to prepare the nation for war?',
        a: 'Moshe Dayan',
        exp: 'One-eyed war hero whose appointment rallied national morale and signaled a pre-emptive strike.',
      },
    ],
  },

  // =========================================================================
  // LESSON 6: The Six-Day War & Territorial Blitz (June 1967)
  // =========================================================================
  {
    num: 6,
    title: 'The Six-Day War & Territorial Blitz (June 1967)',
    questions: [
      {
        q: 'On what date did Israel launch the pre-emptive airstrikes that began the Six-Day War?',
        a: '5 June 1967',
        exp: 'Israel launched Operation Focus at sunrise, destroying Arab air forces before an invasion could occur.',
      },
      {
        q: "What was the code name of Israel's pre-emptive air offensive on 5 June 1967?",
        a: 'Operation Focus (Mivtza Moked)',
        exp: 'Flew beneath Egyptian radar to destroy over 300 Egyptian combat aircraft on the tarmac in 3 hours.',
      },
      {
        q: "Why was Israel's destruction of Arab air forces on 5 June so decisive to the war's outcome?",
        a: 'It gave the Israeli Air Force total air supremacy across all combat fronts',
        exp: 'Unchallenged Israeli air support decimated Arab armor, supply lines, and infantry throughout the war.',
      },
      {
        q: 'Which Arab nations had their air forces neutralized on the opening day of the war?',
        a: 'Egypt, Syria, and Jordan [also an Iraqi airbase]',
        exp: 'Israel knocked out all three opposing air forces within hours, securing total command of the skies.',
      },
      {
        q: 'What vast territory did the IDF conquer from Egypt between 5 and 8 June 1967?',
        a: 'The Sinai Peninsula and the Gaza Strip',
        exp: 'Israeli armor swept across Sinai to the Suez Canal, reopening the Straits of Tiran.',
      },
      {
        q: 'What historic territories did Israel capture from Jordan during the fighting?',
        a: 'The West Bank and East Jerusalem',
        exp: 'Israeli paratroopers captured the Old City and reached the Western Wall on 7 June.',
      },
      {
        q: 'What strategically vital high ground did Israel seize from Syria on 9–10 June 1967?',
        a: 'The Golan Heights',
        exp: 'IDF forces stormed the plateau, ending Syrian artillery bombardment of Galilee farming communities.',
      },
      {
        q: 'How many days did the 1967 war last before a UN ceasefire took effect?',
        a: 'Six days (5–10 June 1967)',
        exp: 'Ended on 10 June with Israel achieving a swift and total victory over Egypt, Jordan, and Syria.',
      },
      {
        q: "State two key military reasons for Israel's overwhelming victory in the Six-Day War.",
        a: 'Complete air supremacy and superior military planning and pilot training',
        exp: 'Decisive air strikes combined with flexible armored maneuvers shattered disorganized Arab forces.',
      },
      {
        q: 'Why was Arab military command and coordination so ineffective during the war?',
        a: 'Egypt broadcast false claims of victory, misleading Jordanian and Syrian commanders',
        exp: 'False reports led Jordan and Syria into disastrous ground assaults without understanding Egyptian losses.',
      },
      {
        q: 'Approximately how many Arab soldiers were killed in 1967 compared to Israeli casualties?',
        a: 'Over 15,000 Arab soldiers died compared to around 800 Israelis',
        exp: 'Reflected the overwhelming one-sidedness of the conflict due to Israeli air superiority.',
      },
      {
        q: 'How did the territorial size of Israel change as a result of the Six-Day War?',
        a: "Israel's controlled territory tripled in size",
        exp: 'Captured Sinai, Gaza, West Bank, East Jerusalem, and Golan, placing 1 million Palestinians under military rule.',
      },
    ],
  },

  // =========================================================================
  // LESSON 7: UN Resolution 242 & The Conquered Territories
  // =========================================================================
  {
    num: 7,
    title: 'UN Resolution 242 & The Conquered Territories',
    questions: [
      {
        q: 'What famous diplomatic resolution was passed by the UN Security Council in November 1967?',
        a: 'UN Security Council Resolution 242',
        exp: 'Established the enduring "Land for Peace" principle as the foundation for Middle East negotiations.',
      },
      {
        q: 'What core formula did UN Resolution 242 establish regarding land and sovereignty?',
        a: '"Land for Peace" (withdrawal from occupied land in exchange for recognized peace)',
        exp: "Required Israel to withdraw from occupied land in return for Arab states recognizing Israel's sovereignty.",
      },
      {
        q: 'What linguistic ambiguity in the English text of Resolution 242 caused lasting dispute?',
        a: 'Omission of the word "the" ("withdrawal from territories", not "the territories")',
        exp: 'Israel argued this meant partial withdrawal to secure borders; Arab states demanded complete withdrawal from all land.',
      },
      {
        q: 'What hardline stance was adopted by Arab leaders at the Khartoum Summit in September 1967?',
        a: 'The "Three Noes" of Khartoum',
        exp: '"No peace with Israel, no recognition of Israel, no negotiations with Israel."',
      },
      {
        q: 'Name the five occupied territories controlled by Israel following the 1967 war.',
        a: 'Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights',
        exp: 'Provided Israel with strategic defensive depth but created an enduring occupation dilemma.',
      },
      {
        q: 'What controversial settlement policy did Israel initiate in the West Bank and Gaza after 1967?',
        a: 'Constructing Jewish civilian settlements on occupied territory',
        exp: 'Encouraged Jewish settlers to build homes on captured land, complicating future territorial compromise.',
      },
      {
        q: 'What legal status did Israel immediately apply to East Jerusalem after the 1967 war?',
        a: 'Formally reunited and annexed East Jerusalem into Israel',
        exp: 'Declared Jerusalem the united and indivisible capital of Israel, rejected by international law.',
      },
      {
        q: 'Approximately how many new Palestinian refugees were displaced by the 1967 Six-Day War?',
        a: 'Approximately 300,000 Palestinian Arabs',
        exp: 'Thousands crossed the Jordan River into neighboring Jordan, creating a second refugee crisis.',
      },
      {
        q: 'What massive fortified sand barrier did Israel construct along the Suez Canal from 1968?',
        a: 'The Bar-Lev Line',
        exp: 'A chain of concrete fortifications and sand ramparts built to prevent an Egyptian canal crossing.',
      },
      {
        q: 'What low-intensity static conflict took place along the Suez Canal between 1969 and 1970?',
        a: 'The War of Attrition',
        exp: 'Sustained artillery duels, commando raids, and aerial dogfights aimed at exhausting Israeli forces.',
      },
      {
        q: 'Which superpower supplied advanced SAM missiles and military pilots to defend Egypt in 1970?',
        a: 'The Soviet Union (USSR)',
        exp: 'Soviet air defense missiles established a protective umbrella over Egyptian airspace along the canal.',
      },
      {
        q: 'Who died in September 1970 and was succeeded as President of Egypt by Anwar Sadat?',
        a: 'Gamal Abdel Nasser',
        exp: 'His death marked the end of the Pan-Arab era, bringing Sadat to power with a pragmatic agenda.',
      },
    ],
  },

  // =========================================================================
  // LESSON 8: Palestinian Resistance, Black September & Munich (1968–1972)
  // =========================================================================
  {
    num: 8,
    title: 'Palestinian Resistance, Black September & Munich (1968–1972)',
    questions: [
      {
        q: 'Who was elected Chairman of the Palestine Liberation Organization (PLO) in February 1969?',
        a: 'Yasser Arafat',
        exp: 'Leader of Fatah who transformed the PLO into an independent Palestinian national movement.',
      },
      {
        q: 'What March 1968 battle in Jordan established Yasser Arafat and Fatah as heroic resistance leaders?',
        a: 'The Battle of Karameh',
        exp: 'Palestinian guerrillas fought fiercely against an Israeli armored raid, sparking thousands of recruitments.',
      },
      {
        q: 'Why did serious political friction develop between the PLO and King Hussein of Jordan by 1970?',
        a: 'The PLO established a "state within a state" in Jordan, openly challenging royal authority',
        exp: 'Armed guerrillas controlled refugee camps, set up checkpoints in Amman, and attacked Israel from Jordan.',
      },
      {
        q: 'Which radical Marxist Palestinian faction pioneered international airline hijackings in 1968–70?',
        a: 'The Popular Front for the Liberation of Palestine (PFLP)',
        exp: 'Led by George Habash, using hijackings to force the Palestinian cause onto international television.',
      },
      {
        q: "What dramatic incident took place at Dawson's Field in Jordan in September 1970?",
        a: 'PFLP hijackers blew up three hijacked Western airliners on a desert airstrip',
        exp: 'Humiliated King Hussein and pushed the Jordanian monarchy into open civil war with the guerrillas.',
      },
      {
        q: 'What was the military crackdown launched by King Hussein against the PLO in September 1970 called?',
        a: 'Black September',
        exp: 'The Jordanian army shelled Palestinian refugee camps and military bases, killing thousands of fighters.',
      },
      {
        q: 'Where was the PLO leadership and fighting force expelled to after their defeat in Jordan in 1971?',
        a: 'Lebanon (relocating headquarters to Beirut and southern Lebanon)',
        exp: 'Established a new base of operations nicknamed "Fatahland" along Israel\'s northern frontier.',
      },
      {
        q: 'What clandestine militant faction was formed to carry out revenge operations after Black September?',
        a: 'The Black September Organization',
        exp: "A covert militant offshoot of Fatah responsible for the assassination of Jordan's Prime Minister and Munich.",
      },
      {
        q: 'What atrocity was carried out by Black September at the Olympic Games in September 1972?',
        a: 'The Munich Olympics Massacre',
        exp: 'Militants took 11 Israeli athletes hostage; all 11 Israelis and a German police officer were killed.',
      },
      {
        q: 'How did Israeli Prime Minister Golda Meir respond to the Munich Olympic massacre?',
        a: 'Authorized Mossad to assassinate the planners in Operation Wrath of God',
        exp: 'Israeli undercover agents tracked down and assassinated suspected Black September operatives in Europe.',
      },
      {
        q: 'What was the primary political objective of Palestinian factions in using international terrorism in the 1970s?',
        a: 'To force global attention onto the unresolved plight of the Palestinian refugees',
        exp: 'Propelled Palestinian identity onto the world stage at the cost of widespread moral condemnation.',
      },
      {
        q: 'How did international attitudes toward the Palestinian question change following Munich?',
        a: 'Increased international awareness of Palestinian grievances alongside strict anti-terror measures',
        exp: 'World governments recognized the Palestinian issue had to be solved diplomatically to stop global violence.',
      },
    ],
  },

  // =========================================================================
  // LESSON 9: The War of Attrition & The Yom Kippur War (1969–1973)
  // =========================================================================
  {
    num: 9,
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    questions: [
      {
        q: 'On what Jewish religious holiday did Egypt and Syria launch their surprise attack on Israel in 1973?',
        a: 'Yom Kippur (The Day of Atonement) on 6 October 1973',
        exp: 'The holiest day of the Jewish year; communications were shut down and soldiers were at prayer in synagogues.',
      },
      {
        q: "What was the code name of Egypt's successful canal-crossing offensive on 6 October 1973?",
        a: 'Operation Badr',
        exp: 'Egyptian infantry crossed the Suez Canal and breached the Bar-Lev Line in a flawlessly rehearsed assault.',
      },
      {
        q: 'How did Egyptian engineers rapidly breach the fortified Bar-Lev sand wall along the Suez Canal?',
        a: 'Using high-pressure water cannons to blast openings through the sand ramparts',
        exp: 'Allowed 100,000 Egyptian troops and hundreds of tanks to pour into Sinai within hours.',
      },
      {
        q: 'Which new Soviet weapon system neutralized the Israeli Air Force in the early stages of the 1973 war?',
        a: 'Mobile Soviet SAM surface-to-air missiles (SAM-6 and SAM-7)',
        exp: 'Created a dense missile umbrella that shot down dozens of Israeli jets attempting to relieve the front.',
      },
      {
        q: 'On what northern battlefront did Syrian armored divisions attack with over 1,000 tanks on 6 October 1973?',
        a: 'The Golan Heights',
        exp: 'Syrian forces almost broke through into Galilee before Israeli reserve armor stabilized the front.',
      },
      {
        q: 'Who were the political leaders of Israel and Egypt during the 1973 Yom Kippur War?',
        a: 'Golda Meir (Prime Minister of Israel) and Anwar Sadat (President of Egypt)',
        exp: 'Meir faced national grief over high casualties; Sadat restored Egyptian national honor and self-esteem.',
      },
      {
        q: 'What massive military emergency airlift did the United States launch to resupply Israel in October 1973?',
        a: 'Operation Nickel Grass',
        exp: 'President Nixon dispatched 22,000 tons of tanks, artillery, and ammunition to replace Israeli losses.',
      },
      {
        q: 'Which Israeli general led an armored counter-crossing over the Suez Canal into Egypt?',
        a: 'General Ariel Sharon',
        exp: 'Crossed to the west bank of Suez, threatening Cairo and encircling the Egyptian Third Army.',
      },
      {
        q: 'On what date did the United Nations Security Council impose a final ceasefire halting the 1973 war?',
        a: '25 October 1973 (UN Resolution 338/339)',
        exp: 'Halted the fighting after the US and Soviet Union intervened to prevent a superpower clash.',
      },
      {
        q: 'What economic weapon did Arab oil-producing nations (OPEC) unleash during the 1973 war?',
        a: 'The Arab Oil Embargo',
        exp: 'Cut oil production and embargoed the US and Netherlands, quadrupling global oil prices.',
      },
      {
        q: 'What was the domestic political impact of the 1973 Yom Kippur War inside Israel?',
        a: 'Severe public anger over intelligence failures, leading to the resignation of Golda Meir in 1974',
        exp: 'The Agranat Commission exposed severe military complacency, shattering public faith in Labour leadership.',
      },
      {
        q: 'Why did the Yom Kippur War ultimately make future peace negotiations possible?',
        a: 'It restored Egyptian pride while proving to Israel that military occupation alone did not guarantee security',
        exp: 'Both sides recognized that protracted war was unsustainable, opening the way for diplomacy.',
      },
    ],
  },

  // =========================================================================
  // LESSON 10: Shuttle Diplomacy, Camp David & The 1979 Peace Treaty
  // =========================================================================
  {
    num: 10,
    title: 'Shuttle Diplomacy, Camp David & The 1979 Peace Treaty',
    questions: [
      {
        q: 'What diplomatic method did US Secretary of State Henry Kissinger pioneer between 1974 and 1975?',
        a: '"Shuttle Diplomacy"',
        exp: 'Kissinger flew repeatedly between Cairo, Tel Aviv, and Damascus to negotiate disengagement agreements.',
      },
      {
        q: 'What vital international waterway was cleared and reopened by Egypt in June 1975?',
        a: 'The Suez Canal',
        exp: 'Reopened to international maritime commerce after being closed for eight years since the 1967 war.',
      },
      {
        q: 'Which right-wing Israeli Prime Minister and leader of Likud was elected in May 1977?',
        a: 'Menachem Begin',
        exp: 'Former Irgun leader whose election broke 29 years of Labour dominance, yet went on to sign peace with Egypt.',
      },
      {
        q: 'What dramatic announcement did President Anwar Sadat make to the Egyptian Parliament in November 1977?',
        a: 'Announced he was prepared to travel to Jerusalem and address the Israeli Knesset in person',
        exp: 'Broke 30 years of psychological deadlock by proposing direct, face-to-face negotiations.',
      },
      {
        q: 'On what dates did Anwar Sadat make his historic visit to Jerusalem?',
        a: '19–20 November 1977',
        exp: 'Sadat addressed the Knesset, offering full peace in exchange for the return of all Arab occupied lands.',
      },
      {
        q: 'Which US President hosted 13 days of intensive peace negotiations at Camp David in September 1978?',
        a: 'President Jimmy Carter',
        exp: 'Personally mediated between Sadat and Begin at the presidential retreat in Maryland to forge an agreement.',
      },
      {
        q: 'What historic peace framework was agreed upon by Sadat and Begin on 17 September 1978?',
        a: 'The Camp David Accords',
        exp: 'Provided a framework for peace between Egypt and Israel and an outline for Palestinian autonomy.',
      },
      {
        q: 'On what date was the formal Egypt-Israel Peace Treaty signed on the White House lawn?',
        a: '26 March 1979 (The Treaty of Washington)',
        exp: 'Signed by Sadat and Begin, witnessed by Carter; the first formal peace treaty between Israel and an Arab state.',
      },
      {
        q: 'What major territorial concession did Israel make under the 1979 Egypt-Israel Peace Treaty?',
        a: 'Israel returned the entire Sinai Peninsula to Egypt in phased stages',
        exp: 'Egypt regained its sovereign territory and oil fields in exchange for full diplomatic peace and demilitarisation.',
      },
      {
        q: 'What did Egypt grant Israel in exchange for the return of the Sinai Peninsula?',
        a: 'Full diplomatic recognition, open borders, and free Israeli passage through the Suez Canal and Tiran',
        exp: 'Eliminated Egypt as a military threat, fundamentally altering the strategic balance in the Middle East.',
      },
      {
        q: 'What prestigious international honor was awarded jointly to Anwar Sadat and Menachem Begin in 1978?',
        a: 'The Nobel Peace Prize',
        exp: 'Recognized their historic breakthrough in achieving the Camp David peace framework.',
      },
      {
        q: 'How did the rest of the Arab world immediately respond to Egypt signing the 1979 peace treaty?',
        a: 'Expelled Egypt from the Arab League, broke diplomatic ties, and moved League HQ to Tunis',
        exp: 'Arab states condemned Sadat as a traitor to the Palestinian cause, leading to his assassination in 1981.',
      },
    ],
  },

  // =========================================================================
  // LESSON 11: The Lebanon War (1982) & The First Intifada (1987)
  // =========================================================================
  {
    num: 11,
    title: 'The Lebanon War (1982) & The First Intifada (1987)',
    questions: [
      {
        q: 'What famous phrase did PLO Chairman Yasser Arafat use concluding his November 1974 address to the UN?',
        a: '"Do not let the olive branch fall from my hand"',
        exp: 'Arafat offered a path of diplomacy alongside armed struggle, pleading for international recognition.',
      },
      {
        q: 'What official status did the United Nations General Assembly grant to the PLO in November 1974?',
        a: 'Permanent Observer Status (UN Resolution 3237)',
        exp: 'Recognized the PLO as the sole legitimate representative of the Palestinian people.',
      },
      {
        q: "What was the code name of Israel's full-scale military invasion of Lebanon launched on 6 June 1982?",
        a: 'Operation Peace for Galilee',
        exp: 'Launched to destroy PLO rocket launching sites and command infrastructure in southern Lebanon.',
      },
      {
        q: 'Which Israeli Defense Minister masterminded the military invasion of Lebanon and siege of Beirut in 1982?',
        a: 'Ariel Sharon',
        exp: 'Advanced beyond the approved 40km buffer zone to encircle and bombard West Beirut.',
      },
      {
        q: 'Where were Yasser Arafat and 14,000 PLO fighters evacuated to by sea in August 1982?',
        a: 'Tunis (Tunisia) and other Arab nations far from Israel',
        exp: 'A US-brokered agreement ended the siege of Beirut by expelling PLO leadership from Lebanon.',
      },
      {
        q: 'What atrocity against Palestinian refugees occurred in Beirut refugee camps in September 1982?',
        a: 'The Sabra and Shatila massacre',
        exp: 'Lebanese Christian Phalangist militia entered the camps and slaughtered between 800 and 2,000 civilians.',
      },
      {
        q: 'What official Israeli inquiry investigated the Sabra and Shatila massacre?',
        a: 'The Kahan Commission (1983)',
        exp: 'Found Defense Minister Ariel Sharon bore personal responsibility for failing to prevent the slaughter.',
      },
      {
        q: 'What radical Iranian-backed Shia militant group emerged in southern Lebanon during the 1980s?',
        a: 'Hezbollah ("Party of God")',
        exp: 'Formed to wage guerrilla warfare against Israeli military occupation in southern Lebanon.',
      },
      {
        q: 'What spontaneous grassroots Palestinian uprising erupted in the Gaza Strip and West Bank in December 1987?',
        a: 'The First Intifada ("shaking off")',
        exp: 'A popular revolt against 20 years of Israeli military occupation, settlements, and restrictions.',
      },
      {
        q: 'What tragic incident triggered the outbreak of the First Intifada in Gaza in December 1987?',
        a: 'An Israeli army tank transporter collided with Palestinian cars in Jabalia camp, killing four workers',
        exp: 'Rumors spread that the crash was deliberate retaliation, sparking massive demonstrations across Gaza.',
      },
      {
        q: 'What primary protest tactics characterized the First Intifada on the streets of the occupied territories?',
        a: 'Stone-throwing by youths ("Children of the Stones"), commercial strikes, boycotts, and barricades',
        exp: 'Unarmed youth confronting armed Israeli soldiers captured international media sympathy.',
      },
      {
        q: 'What militant Islamist organization was founded in Gaza during the First Intifada in 1987?',
        a: 'Hamas (Islamic Resistance Movement)',
        exp: 'Founded by Sheikh Ahmed Yassin, rejecting any compromise and advocating an Islamic state in Palestine.',
      },
    ],
  },

  // =========================================================================
  // LESSON 12: The Oslo Peace Process & Rabin’s Assassination (1988–1995)
  // =========================================================================
  {
    num: 12,
    title: 'The Oslo Peace Process & Rabin’s Assassination (1993–1995)',
    questions: [
      {
        q: 'What did Yasser Arafat publicly renounce in his historic December 1988 speech to the United Nations?',
        a: "Renounced all forms of terrorism and recognized Israel's right to exist in peace",
        exp: 'Accepted UN Resolutions 242 and 338, enabling the United States to open direct diplomatic talks with the PLO.',
      },
      {
        q: 'Which Iraqi dictator did Yasser Arafat support during the 1990–91 Gulf War, alienating Gulf Arab donors?',
        a: 'Saddam Hussein',
        exp: "Backing Iraq's invasion of Kuwait caused Gulf states to cut funding and expelled 300,000 Palestinians.",
      },
      {
        q: 'What landmark international peace conference convened in Spain in October 1991 following the Gulf War?',
        a: 'The Madrid Peace Conference',
        exp: 'Co-sponsored by the US and USSR, bringing Israeli, Jordanian, Syrian, and Palestinian delegations face-to-face.',
      },
      {
        q: 'Which Israeli Labour Party leader was elected Prime Minister in June 1992 on a pro-peace platform?',
        a: 'Yitzhak Rabin',
        exp: 'Former military chief who promised to halt settlement expansion and reach an interim peace accord.',
      },
      {
        q: 'Where were secret backchannel negotiations held between Israeli and PLO representatives in 1993?',
        a: 'Oslo, Norway',
        exp: 'Norwegian diplomats facilitated private talks that successfully bypassed the stalled official negotiations.',
      },
      {
        q: 'What historic diplomatic documents were exchanged by Yitzhak Rabin and Yasser Arafat on 9–10 September 1993?',
        a: 'The Letters of Mutual Recognition',
        exp: "Israel recognized the PLO as representative of the Palestinians; the PLO recognized Israel's right to exist.",
      },
      {
        q: 'On what date was the Declaration of Principles (Oslo I Accord) signed on the White House lawn?',
        a: '13 September 1993',
        exp: 'Sealed by the iconic handshake between Rabin and Arafat, witnessed by US President Bill Clinton.',
      },
      {
        q: 'What interim governing body was established under the Oslo Accords to administer Palestinian civilian life?',
        a: 'The Palestinian National Authority (PNA / PA)',
        exp: 'Granted Palestinians self-rule over civil administration and security in designated parts of the occupied lands.',
      },
      {
        q: 'What was the first territorial phase of Palestinian self-rule implemented under the May 1994 Cairo Agreement?',
        a: '"Gaza-Jericho First"',
        exp: 'Israeli forces withdrew from the Gaza Strip and the West Bank city of Jericho, establishing Palestinian rule.',
      },
      {
        q: 'Which neighboring Arab nation signed a formal peace treaty with Israel on 26 October 1994?',
        a: 'Jordan (The Israel-Jordan Peace Treaty)',
        exp: 'Signed by King Hussein and Yitzhak Rabin, resolving water disputes and making Jordan the second Arab state to make peace.',
      },
      {
        q: 'What three administrative zones did the Oslo II Accord (1995) divide the West Bank into?',
        a: 'Area A (Palestinian control), Area B (joint control), and Area C (full Israeli control)',
        exp: 'Created a fragmented patchwork of jurisdiction, leaving major friction over settlements and checkpoints.',
      },
      {
        q: 'What tragic assassination on 4 November 1995 dealt a devastating blow to the Oslo peace process?',
        a: 'The assassination of Prime Minister Yitzhak Rabin',
        exp: 'Shot in Tel Aviv by right-wing Jewish extremist Yigal Amir, severely derailing the momentum for peace.',
      },
    ],
  },
];

module.exports = {
  PEARSON_QUIZ_BANK,
};
