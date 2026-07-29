const fs = require('fs');
const path = require('path');

const originalFile = path.join(__dirname, 'questions_original.js');
const targetFile = path.join(__dirname, '..', 'questions.js');

// Load original data
const fileContent = fs.readFileSync(originalFile, 'utf8');
const { QUIZ_DATA: originalQuizData } = require(originalFile);

// Define new questions to be added to reach 30 questions per subtopic (10 Easy, 10 Medium, 10 Difficult)
const newQuestions = {
  "subtopic_1_1": [
    // 5 Easy
    {
      "id": "q_1_1_n1",
      "question": "Which political party won the 1945 British General Election, changing British policy in Palestine?",
      "answer": "The Labour Party",
      "explanation": "Clement Attlee's Labour Party won a landslide victory in 1945, inheriting the bankrupt post-war British Empire and the Palestine crisis.",
      "year": 1945,
      "distractors": ["The Conservative Party", "The Liberal Party", "The Coalition Party"]
    },
    {
      "id": "q_1_1_n2",
      "question": "In which year did the British Mandate officially end and the State of Israel get declared?",
      "answer": "1948",
      "explanation": "David Ben-Gurion declared the establishment of the State of Israel on 14 May 1948, immediately as the last British troops departed.",
      "year": 1948,
      "distractors": ["1945", "1947", "1950"]
    },
    {
      "id": "q_1_1_n3",
      "question": "Who was the leader of the Jewish Agency who declared Israel's independence and became its first Prime Minister?",
      "answer": "David Ben-Gurion",
      "explanation": "David Ben-Gurion was the executive head of the Jewish Agency and led the struggle for independence, serving as Israel's first Prime Minister.",
      "year": 1948,
      "distractors": ["Chaim Weizmann", "Golda Meir", "Levi Eshkol"]
    },
    {
      "id": "q_1_1_n4",
      "question": "What was the name of the official governing body of the Jewish community in Palestine during the Mandate?",
      "answer": "The Jewish Agency",
      "explanation": "The Jewish Agency for Palestine acted as the de facto government for the Jewish population under the British Mandate.",
      "year": 1929,
      "distractors": ["The Zionist Congress", "The Hebrew Council", "The Histadrut Federation"]
    },
    {
      "id": "q_1_1_n5",
      "question": "Which major UN declaration in December 1948 established international rights for refugees worldwide?",
      "answer": "The Universal Declaration of Human Rights",
      "explanation": "The Universal Declaration of Human Rights was adopted by the UN in 1948 in response to the atrocities of World War II and the refugee crisis.",
      "year": 1948,
      "distractors": ["The Geneva Convention", "The UN Charter", "The Declaration of Rights of the Displaced"]
    },
    // 5 Medium
    {
      "id": "q_1_1_n6",
      "question": "In what year did the Arab population of Palestine launch a major revolt against British rule and Zionist immigration?",
      "answer": "1936",
      "explanation": "The Arab Revolt of 1936-39 was a major nationalist rebellion demanding independence and an end to Jewish immigration.",
      "year": 1936,
      "distractors": ["1920", "1929", "1945"]
    },
    {
      "id": "q_1_1_n7",
      "question": "Which British policy document in 1939 severely limited Jewish immigration to 75,000 over five years?",
      "answer": "The 1939 White Paper",
      "explanation": "The Macdonald White Paper of 1939 sought to appease Arab opinion to secure oil access during the upcoming war, infuriating the Zionist movement.",
      "year": 1939,
      "distractors": ["The Peel Report", "The Balfour Statement", "The Woodhead Commission Report"]
    },
    {
      "id": "q_1_1_n8",
      "question": "Which American President in 1945 urged the British government to immediately admit 100,000 Jewish refugees to Palestine?",
      "answer": "Harry S. Truman",
      "explanation": "President Truman faced strong domestic political pressure to support Holocaust survivors and strongly urged Britain to ease immigration limits.",
      "year": 1945,
      "distractors": ["Franklin D. Roosevelt", "Dwight D. Eisenhower", "John F. Kennedy"]
    },
    {
      "id": "q_1_1_n9",
      "question": "What was the name of the special United Nations committee created in May 1947 to investigate Palestine?",
      "answer": "UNSCOP",
      "explanation": "The United Nations Special Committee on Palestine was formed in 1947 and recommended the partition of Palestine into two states.",
      "year": 1947,
      "distractors": ["UNRWA", "UNEF", "UNTSO"]
    },
    {
      "id": "q_1_1_n10",
      "question": "Which global superpower was the first to recognize the newly declared State of Israel in May 1948?",
      "answer": "The USA",
      "explanation": "President Truman granted de facto recognition to the State of Israel just 11 minutes after it was declared on 14 May 1948.",
      "year": 1948,
      "distractors": ["The Soviet Union", "Great Britain", "France"]
    },
    // 4 Difficult
    {
      "id": "q_1_1_n11",
      "question": "In which Swiss city did Theodor Herzl organize the First Zionist Congress in 1897?",
      "answer": "Basel",
      "explanation": "The First Zionist Congress met in Basel in 1897, adopting the Basel Program which declared the goal of a Jewish homeland in Palestine.",
      "year": 1897,
      "distractors": ["Geneva", "Zurich", "Bern"]
    },
    {
      "id": "q_1_1_n12",
      "question": "What was the monthly quota limit on Jewish immigration maintained by British Foreign Secretary Ernest Bevin in 1945?",
      "answer": "1,500 immigrants",
      "explanation": "Britain maintained a strict quota of 1,500 immigrants per month to avoid provoking Arab unrest, which Zionist groups fought with blockade-running ships.",
      "year": 1945,
      "distractors": ["500 immigrants", "3,000 immigrants", "5,000 immigrants"]
    },
    {
      "id": "q_1_1_n13",
      "question": "Who was the commander of the right-wing Zionist paramilitary group, the Irgun, who ordered the King David Hotel bombing?",
      "answer": "Menachem Begin",
      "explanation": "Menachem Begin was the leader of the Irgun from 1944 to 1948 and later served as Prime Minister of Israel.",
      "year": 1946,
      "distractors": ["David Ben-Gurion", "Yitzhak Shamir", "Moshe Dayan"]
    },
    {
      "id": "q_1_1_n14",
      "question": "What was the specific Hebrew term used for the illegal immigration organized by Zionist groups during the British blockade?",
      "answer": "Aliyah Bet",
      "explanation": "Aliyah Bet was the code name given to illegal immigration into Mandatory Palestine between 1934 and 1948 in defiance of British White Papers.",
      "year": 1939,
      "distractors": ["Kibbutzim", "Haganah", "Yishuv"]
    }
  ],
  "subtopic_1_2": [
    // 5 Easy
    {
      "id": "q_1_2_n1",
      "question": "What is the name of the Israeli parliament established in 1949?",
      "answer": "The Knesset",
      "explanation": "The Knesset was established after the first elections in January 1949, serving as the unicameral national legislature.",
      "year": 1949,
      "distractors": ["The Senate", "The Assembly", "The Sanhedrin"]
    },
    {
      "id": "q_1_2_n2",
      "question": "Who was elected as the first President of the State of Israel in 1949?",
      "answer": "Chaim Weizmann",
      "explanation": "Chaim Weizmann, a prominent Zionist diplomat and chemist, was elected by the Knesset as Israel's first President, a ceremonial role.",
      "year": 1949,
      "distractors": ["David Ben-Gurion", "Theodor Herzl", "Moshe Sharett"]
    },
    {
      "id": "q_1_2_n3",
      "question": "In which year did the first Arab-Israeli War officially end with armistice agreements?",
      "answer": "1949",
      "explanation": "Israel signed separate armistice agreements with Egypt, Lebanon, Jordan, and Syria between February and July 1949.",
      "year": 1949,
      "distractors": ["1948", "1950", "1952"]
    },
    {
      "id": "q_1_2_n4",
      "question": "What is the term for the global dispersion of the Jewish people from their ancestral homeland?",
      "answer": "The Diaspora",
      "explanation": "The Diaspora refers to the communities of Jewish people living outside the Land of Israel, scattered across the world.",
      "year": 1948,
      "distractors": ["Zionism", "Aliyah", "Kibbutz"]
    },
    {
      "id": "q_1_2_n5",
      "question": "What currency was introduced in Israel in 1952, replacing the Palestine Pound?",
      "answer": "The Israeli Pound (Lira)",
      "explanation": "The Israeli Lira (or Pound) was introduced in 1952 to establish economic sovereignty separate from British currency systems.",
      "year": 1952,
      "distractors": ["The Shekel", "The Dollar", "The Dinar"]
    },
    // 5 Medium
    {
      "id": "q_1_2_n6",
      "question": "Which UN diplomat negotiated the 1949 armistice agreements after the assassination of Count Folke Bernadotte?",
      "answer": "Ralph Bunche",
      "explanation": "Ralph Bunche served as the acting mediator and successfully brokered the armistices, winning the Nobel Peace Prize for his efforts.",
      "year": 1949,
      "distractors": ["Trygve Lie", "Dag Hammarskjöld", "Gunnar Jarring"]
    },
    {
      "id": "q_1_2_n7",
      "question": "In which month and year did the Knesset pass the Law of Return?",
      "answer": "July 1950",
      "explanation": "The Law of Return was passed on 5 July 1950, declaring that every Jew has the right to immigrate to Israel.",
      "year": 1950,
      "distractors": ["May 1948", "January 1949", "December 1952"]
    },
    {
      "id": "q_1_2_n8",
      "question": "What was the name of the economic austerity policy of rationing introduced in Israel in 1949 to manage the influx of immigrants?",
      "answer": "Tzena",
      "explanation": "Tzena was a policy of strict economic austerity and food rationing introduced to ensure the survival of the state during massive immigration.",
      "year": 1949,
      "distractors": ["Kibbutz", "Histadrut", "Austerity Accord"]
    },
    {
      "id": "q_1_2_n9",
      "question": "Which European nation signed the historic Reparations Agreement with Israel in September 1952?",
      "answer": "West Germany",
      "explanation": "Chancellor Konrad Adenauer of West Germany signed the agreement to pay reparations to Israel for the Holocaust, aiding Israel's early economy.",
      "year": 1952,
      "distractors": ["East Germany", "Great Britain", "France"]
    },
    {
      "id": "q_1_2_n10",
      "question": "In which month and year did Israel sign the final armistice of the 1948-49 war, with Syria?",
      "answer": "July 1949",
      "explanation": "The final armistice agreement of the war was signed with Syria on 20 July 1949, concluding the formal fighting.",
      "year": 1949,
      "distractors": ["February 1949", "May 1948", "December 1949"]
    },
    // 4 Difficult
    {
      "id": "q_1_2_n11",
      "question": "Exactly how much financial aid did the US government extend to Israel in its first Export-Import Bank loan in early 1949?",
      "answer": "$100 million",
      "explanation": "The US granted a vital $100 million credit loan to Israel in early 1949 to buy agricultural and industrial equipment.",
      "year": 1949,
      "distractors": ["$25 million", "$50 million", "$250 million"]
    },
    {
      "id": "q_1_2_n12",
      "question": "Which Arab monarch was assassinated in Jerusalem in 1951, partly due to anger over his annexation of the West Bank?",
      "answer": "King Abdullah I of Jordan",
      "explanation": "King Abdullah of Jordan was shot at the Al-Aqsa Mosque by a Palestinian nationalist who feared he was negotiating a peace treaty with Israel.",
      "year": 1951,
      "distractors": ["King Farouk of Egypt", "King Faisal of Iraq", "King Hussein of Jordan"]
    },
    {
      "id": "q_1_2_n13",
      "question": "Under the 1949 armistice agreements, which nation took control of the Gaza Strip, though they did not annex it?",
      "answer": "Egypt",
      "explanation": "Egypt took administrative and military control of Gaza, keeping the borders closed and leaving Palestinian refugees stateless.",
      "year": 1949,
      "distractors": ["Jordan", "Syria", "Israel"]
    },
    {
      "id": "q_1_2_n14",
      "question": "Which Zionist militant faction carried out the assassination of UN mediator Count Folke Bernadotte in September 1948?",
      "answer": "The Stern Gang (Lehi)",
      "explanation": "Lehi (the Stern Gang) assassinated Bernadotte because they feared his peace plan would force Israel to give up Jerusalem and parts of the Negev.",
      "year": 1948,
      "distractors": ["The Irgun", "The Haganah", "The Palmach"]
    }
  ],
  "subtopic_1_3": [
    // 5 Easy
    {
      "id": "q_1_3_n1",
      "question": "Which vital Egyptian canal did President Nasser nationalize in July 1956?",
      "answer": "The Suez Canal",
      "explanation": "Nasser nationalised the British-and-French-owned Suez Canal to use its revenues to fund the construction of the Aswan High Dam.",
      "year": 1956,
      "distractors": ["The Corinth Canal", "The Panama Canal", "The Nile Canal"]
    },
    {
      "id": "q_1_3_n2",
      "question": "In which year did the Suez Crisis (Sinai Campaign) take place?",
      "answer": "1956",
      "explanation": "The Suez Crisis occurred in October-November 1956, involving a joint Israeli, British, and French military campaign against Egypt.",
      "year": 1956,
      "distractors": ["1948", "1954", "1967"]
    },
    {
      "id": "q_1_3_n3",
      "question": "Which two European powers invaded Egypt in 1956 alongside Israel?",
      "answer": "Britain and France",
      "explanation": "Britain and France colluded with Israel to regain control of the Suez Canal and depose President Nasser.",
      "year": 1956,
      "distractors": ["The USA and USSR", "Italy and Greece", "West Germany and Belgium"]
    },
    {
      "id": "q_1_3_n4",
      "question": "Who was the British Prime Minister during the 1956 Suez Crisis who was forced to resign due to the political fallout?",
      "answer": "Anthony Eden",
      "explanation": "Anthony Eden's reputation was destroyed by the Suez Crisis, leading to his resignation in January 1957.",
      "year": 1956,
      "distractors": ["Winston Churchill", "Harold Macmillan", "Clement Attlee"]
    },
    {
      "id": "q_1_3_n5",
      "question": "Who was the President of the United States who forced Britain, France, and Israel to withdraw from Egypt by threatening economic sanctions?",
      "answer": "Dwight D. Eisenhower",
      "explanation": "President Eisenhower was furious about the invasion and used US financial leverage (threatening to sell British sterling bonds) to halt the war.",
      "year": 1956,
      "distractors": ["Harry S. Truman", "John F. Kennedy", "Lyndon B. Johnson"]
    },
    // 5 Medium
    {
      "id": "q_1_3_n6",
      "question": "What was the name of the political union formed between Egypt and Syria in 1958?",
      "answer": "The United Arab Republic (UAR)",
      "explanation": "The UAR was formed in 1958 at the height of Pan-Arabism, creating fears of encirclement in Israel before dissolving in 1961.",
      "year": 1958,
      "distractors": ["The Arab League Federation", "The United Arab Emirates", "The Pan-Arab Coalition"]
    },
    {
      "id": "q_1_3_n7",
      "question": "Which Israeli Chief of Staff led the IDF forces during the 1956 Sinai invasion?",
      "answer": "Moshe Dayan",
      "explanation": "Moshe Dayan planned and led the swift armored campaign across the Sinai Peninsula, cementing his military reputation.",
      "year": 1956,
      "distractors": ["Yitzhak Rabin", "Ariel Sharon", "David Elazar"]
    },
    {
      "id": "q_1_3_n8",
      "question": "Who was the Soviet Premier who threatened rocket strikes on London and Paris during the 1956 Suez Crisis?",
      "answer": "Nikita Khrushchev",
      "explanation": "Premier Khrushchev threatened military action to boost Soviet prestige in the Middle East and divert attention from the Hungarian Uprising.",
      "year": 1956,
      "distractors": ["Joseph Stalin", "Leonid Brezhnev", "Mikhail Gorbachev"]
    },
    {
      "id": "q_1_3_n9",
      "question": "In what year did Syria launch a military coup and withdraw from the United Arab Republic, ending the union with Egypt?",
      "answer": "1961",
      "explanation": "Syria withdrew from the UAR in 1961 due to resentment over Egyptian dominance of their military and economy.",
      "year": 1961,
      "distractors": ["1958", "1960", "1963"]
    },
    {
      "id": "q_1_3_n10",
      "question": "What was the name of the UN peacekeeping force deployed to the Sinai border after the 1956 Suez Crisis?",
      "answer": "UNEF",
      "explanation": "The United Nations Emergency Force (UNEF) acted as a buffer between Israel and Egypt, securing shipping rights in the Straits of Tiran.",
      "year": 1956,
      "distractors": ["UNIFIL", "UNTSO", "UNRWA"]
    },
    // 5 Difficult
    {
      "id": "q_1_3_n11",
      "question": "Under the secret Protocol of Sèvres (1956), exactly how many hours after the Israeli invasion were Britain and France to issue their pre-planned ultimatum?",
      "answer": "36 hours",
      "explanation": "The protocol planned for Britain and France to issue an ultimatum to both sides 36 hours after the Israeli attack to justify their intervention.",
      "year": 1956,
      "distractors": ["12 hours", "24 hours", "48 hours"]
    },
    {
      "id": "q_1_3_n12",
      "question": "In which month and year did Egypt sign the Czech Arms Deal, bringing Soviet weapons into the Middle East?",
      "answer": "September 1955",
      "explanation": "Egypt signed the arms deal in September 1955, bypassing Western restrictions and alarming Israel with modern Soviet tanks and MiGs.",
      "year": 1955,
      "distractors": ["February 1955", "July 1956", "October 1956"]
    },
    {
      "id": "q_1_3_n13",
      "question": "Who was the French Prime Minister who strongly supported the alliance with Israel and signed the Protocol of Sèvres in 1956?",
      "answer": "Guy Mollet",
      "explanation": "Guy Mollet was the French PM who believed Nasser was supporting Algerian rebels and agreed to the secret collusion.",
      "year": 1956,
      "distractors": ["Charles de Gaulle", "Pierre Mendès France", "Georges Pompidou"]
    },
    {
      "id": "q_1_3_n14",
      "question": "What is the name of the secret French villa where British, French, and Israeli envoys met to sign the Protocol of Sèvres in October 1956?",
      "answer": "Sèvres",
      "explanation": "The meetings were held secretly at a private villa in Sèvres, a suburb of Paris, resulting in a signed tripartite agreement.",
      "year": 1956,
      "distractors": ["Versailles", "Rambouillet", "Fontainebleau"]
    },
    {
      "id": "q_1_3_n15",
      "question": "Which Syrian President signed the 1958 treaty of union with Egypt to form the United Arab Republic?",
      "answer": "Shukri al-Quwatli",
      "explanation": "Shukri al-Quwatli was the President of Syria who co-declared the union with Nasser in Cairo.",
      "year": 1958,
      "distractors": ["Hafez al-Assad", "Adib Shishakli", "Amin al-Hafiz"]
    }
  ],
  "subtopic_2_1": [
    // 5 Easy
    {
      "id": "q_2_1_n1",
      "question": "In which year did the Six Day War break out?",
      "answer": "1967",
      "explanation": "The Six Day War began on 5 June 1967, transforming the Middle East and redrawing borders.",
      "year": 1967,
      "distractors": ["1956", "1970", "1973"]
    },
    {
      "id": "q_2_1_n2",
      "question": "Who was the leader of Egypt during the 1967 Six Day War?",
      "answer": "Gamal Abdel Nasser",
      "explanation": "Nasser was the President of Egypt who mobilised forces and blockaded the Straits of Tiran, prompting the Israeli strike.",
      "year": 1967,
      "distractors": ["Anwar Sadat", "Hosni Mubarak", "Muhammad Naguib"]
    },
    {
      "id": "q_2_1_n3",
      "question": "Who was the famous one-eyed Israeli Defence Minister during the 1967 Six Day War?",
      "answer": "Moshe Dayan",
      "explanation": "Moshe Dayan was appointed Defence Minister just days before the war, coordinating the military strategies.",
      "year": 1967,
      "distractors": ["Yitzhak Rabin", "Ariel Sharon", "David Elazar"]
    },
    {
      "id": "q_2_1_n4",
      "question": "Which holy city did Israel capture from Jordan during the Six Day War, annexing its eastern sector?",
      "answer": "Jerusalem",
      "explanation": "Israel captured East Jerusalem and the Old City from Jordan, declaring the city reunited under Israeli sovereignty.",
      "year": 1967,
      "distractors": ["Tel Aviv", "Hebron", "Amman"]
    },
    {
      "id": "q_2_1_n5",
      "question": "Exactly how many days did the 1967 war between Israel and Arab coalition states last?",
      "answer": "Six days",
      "explanation": "The war lasted from 5 June to 10 June 1967, ending in a crushing victory for Israel.",
      "year": 1967,
      "distractors": ["Four days", "Ten days", "Eighteen days"]
    },
    // 5 Medium
    {
      "id": "q_2_1_n6",
      "question": "What is the name of the strategic Syrian plateau captured by Israel in the final two days of the Six Day War?",
      "answer": "The Golan Heights",
      "explanation": "Israel captured the Golan Heights on 9-10 June to stop Syrian artillery shelling of northern agricultural settlements.",
      "year": 1967,
      "distractors": ["The West Bank", "The Sinai Peninsula", "The Hula Valley"]
    },
    {
      "id": "q_2_1_n7",
      "question": "Which military alliance pact did King Hussein of Jordan sign with Egypt in May 1967, drawing Jordan into the war?",
      "answer": "The Egypt-Jordan Defence Treaty",
      "explanation": "King Hussein signed the defence treaty in Cairo on 30 May 1967, placing Jordanian forces under Egyptian command.",
      "year": 1967,
      "distractors": ["The Arab League Treaty", "The Egypt-Syria Pact", "The Amman Accord"]
    },
    {
      "id": "q_2_1_n8",
      "question": "What was the name of the Israeli infrastructure project that the Arab League attempted to block by diverting Jordan River headwaters?",
      "answer": "The National Water Carrier",
      "explanation": "The National Water Carrier of Israel transferred water from the Sea of Galilee to the south, which Arab states sought to divert.",
      "year": 1964,
      "distractors": ["The Negev Pipeline", "The Galilee Canal", "The Yarkon Project"]
    },
    {
      "id": "q_2_1_n9",
      "question": "In which month and year did the Six Day War occur?",
      "answer": "June 1967",
      "explanation": "The war began on 5 June and ended on 10 June 1967, altering Middle Eastern politics forever.",
      "year": 1967,
      "distractors": ["May 1967", "July 1967", "October 1973"]
    },
    {
      "id": "q_2_1_n10",
      "question": "Who was the Egyptian Field Marshal and commander-in-chief of the armed forces who committed suicide after the Six Day War defeat?",
      "answer": "Abdel Hakim Amer",
      "explanation": "Field Marshal Amer was blame-shifted for the military catastrophe and committed suicide in September 1967 while under house arrest.",
      "year": 1967,
      "distractors": ["Saad el-Shazly", "Anwar Sadat", "Ahmad Ismail Ali"]
    },
    // 5 Difficult
    {
      "id": "q_2_1_n11",
      "question": "What was the name of the American intelligence ship attacked by Israeli aircraft and torpedo boats during the Six Day War?",
      "answer": "USS Liberty",
      "explanation": "The USS Liberty was attacked on 8 June 1967, killing 34 crew; Israel claimed it was a case of mistaken identity.",
      "year": 1967,
      "distractors": ["USS Pueblo", "USS Maddox", "USS Cole"]
    },
    {
      "id": "q_2_1_n12",
      "question": "Exactly how many military aircraft did the Israeli Air Force destroy on the first morning of Operation Focus?",
      "answer": "Over 300 aircraft",
      "explanation": "By launching a pre-emptive strike, Israel destroyed over 300 Egyptian planes on the tarmac, securing air supremacy.",
      "year": 1967,
      "distractors": ["150 aircraft", "200 aircraft", "500 aircraft"]
    },
    {
      "id": "q_2_1_n13",
      "question": "In which month and year did the Samu Raid take place, escalating tensions between Israel and Jordan?",
      "answer": "November 1966",
      "explanation": "The IDF Samu Raid occurred on 13 November 1966 in the West Bank, resulting in dozens of deaths and inflaming Jordanian public opinion.",
      "year": 1966,
      "distractors": ["April 1967", "May 1967", "June 1967"]
    },
    {
      "id": "q_2_1_n14",
      "question": "Who was the Israeli Chief of Staff who planned the military operations for the 1967 Six Day War?",
      "answer": "Yitzhak Rabin",
      "explanation": "Yitzhak Rabin served as Chief of Staff of the IDF from 1964 to 1968, planning the rapid campaigns.",
      "year": 1967,
      "distractors": ["Moshe Dayan", "Ariel Sharon", "David Elazar"]
    },
    {
      "id": "q_2_1_n15",
      "question": "Which Syrian Defence Minister (and future President) played a key role in escalating border clashes before the war?",
      "answer": "Hafez al-Assad",
      "explanation": "Hafez al-Assad was the Syrian Defence Minister who adopted a highly aggressive stance against Israel, later seizing presidency in 1970.",
      "year": 1967,
      "distractors": ["Salah Jadid", "Nureddin al-Atassi", "Bashar al-Assad"]
    }
  ],
  "subtopic_2_2": [
    // 5 Easy
    {
      "id": "q_2_2_n1",
      "question": "What is the name of the militant Palestinian group responsible for the 1972 Munich Olympics massacre?",
      "answer": "Black September",
      "explanation": "Black September was a faction of Fatah formed to seek revenge for the PLO's expulsion from Jordan, targeting Israeli athletes.",
      "year": 1972,
      "distractors": ["The PFLP", "Hamas", "The Stern Gang"]
    },
    {
      "id": "q_2_2_n2",
      "question": "Who was elected chairman of the Palestine Liberation Organization (PLO) in 1969, leading it for over three decades?",
      "answer": "Yasser Arafat",
      "explanation": "Yasser Arafat became the chairman of the PLO in 1969, building its international profile and diplomatic standing.",
      "year": 1969,
      "distractors": ["George Habash", "Ahmad Shukeiri", "Mahmoud Abbas"]
    },
    {
      "id": "q_2_2_n3",
      "question": "In which country did the Munich Olympics hostage crisis occur in 1972?",
      "answer": "West Germany",
      "explanation": "The Munich Olympics took place in West Germany in September 1972, where 11 Israeli team members were murdered.",
      "year": 1972,
      "distractors": ["East Germany", "Austria", "Switzerland"]
    },
    {
      "id": "q_2_2_n4",
      "question": "Which superpower backed Israel with economic and military aid during the War of Attrition?",
      "answer": "The USA",
      "explanation": "The US supported Israel to prevent Soviet dominance, supplying Phantom fighter jets during the conflict.",
      "year": 1969,
      "distractors": ["The USSR", "Great Britain", "France"]
    },
    {
      "id": "q_2_2_n5",
      "question": "Which superpower supplied Egypt with SAM missiles and military advisers during the War of Attrition?",
      "answer": "The USSR",
      "explanation": "The Soviet Union sent thousands of military advisers and advanced air defense systems to Egypt to counter Israeli air strikes.",
      "year": 1970,
      "distractors": ["The USA", "China", "France"]
    },
    // 5 Medium
    {
      "id": "q_2_2_n6",
      "question": "What was the name of the Jordanian town where a major battle in March 1968 boosted PLO prestige and recruitment?",
      "answer": "Battle of Karameh",
      "explanation": "The Battle of Karameh was a joint PLO-Jordanian defense against an Israeli raid, which Arafat claimed as a massive victory.",
      "year": 1968,
      "distractors": ["Battle of Samu", "Battle of Mafraq", "Battle of Irbid"]
    },
    {
      "id": "q_2_2_n7",
      "question": "In which month and year did the UN Security Council pass Resolution 242?",
      "answer": "November 1967",
      "explanation": "Resolution 242 was passed on 22 November 1967, establishing the formula of 'land for peace'.",
      "year": 1967,
      "distractors": ["June 1967", "August 1967", "January 1968"]
    },
    {
      "id": "q_2_2_n8",
      "question": "What was the name of the US Secretary of State who negotiated the August 1970 ceasefire that ended the War of Attrition?",
      "answer": "William P. Rogers",
      "explanation": "Secretary Rogers initiated the 'Rogers Plan', securing a ceasefire along the Suez Canal to end the War of Attrition.",
      "year": 1970,
      "distractors": ["Henry Kissinger", "Dean Rusk", "Cyrus Vance"]
    },
    {
      "id": "q_2_2_n9",
      "question": "In which country did the PLO establish its primary base of operations and state-within-a-state after being expelled from Jordan?",
      "answer": "Lebanon",
      "explanation": "The PLO moved its base to Lebanon in late 1970, creating 'Fatahland' in the south and launching cross-border attacks.",
      "year": 1970,
      "distractors": ["Syria", "Egypt", "Iraq"]
    },
    {
      "id": "q_2_2_n10",
      "question": "What was the name of the Jordanian civil war in September 1970 in which King Hussein crushed and expelled the PLO?",
      "answer": "Black September",
      "explanation": "King Hussein launched a military offensive in September 1970 to restore Jordanian sovereignty against the PLO state-within-a-state.",
      "year": 1970,
      "distractors": ["The Karameh Campaign", "The September Revolt", "The Red October Campaign"]
    },
    // 5 Difficult
    {
      "id": "q_2_2_n11",
      "question": "Who was the Israeli Olympic wrestling coach who was the first athlete killed in the Olympic village during the Munich massacre?",
      "answer": "Moshe Weinberg",
      "explanation": "Wrestling coach Moshe Weinberg tried to block the door and fight off the armed terrorists, giving others time to escape.",
      "year": 1972,
      "distractors": ["Yossef Gutfreund", "Amitzur Shapira", "Kehat Shorr"]
    },
    {
      "id": "q_2_2_n12",
      "question": "In which month and year did the PFLP hijack four international planes, flying them to Dawson's Field in Jordan?",
      "answer": "September 1970",
      "explanation": "The Dawson's Field hijackings occurred on 6 September 1970, precipitating the Black September war in Jordan.",
      "year": 1970,
      "distractors": ["August 1969", "October 1970", "September 1972"]
    },
    {
      "id": "q_2_2_n13",
      "question": "What was the name of the first target assassinated in Rome by Mossad under Operation Wrath of God?",
      "answer": "Wael Zuaiter",
      "explanation": "Wael Zuaiter, a PLO representative and translator, was shot in Rome in October 1972, accused of being a Black September organizer.",
      "year": 1972,
      "distractors": ["Mahmoud Hamshari", "Ali Hassan Salameh", "Ziad Muchasi"]
    },
    {
      "id": "q_2_2_n14",
      "question": "What was the name of the Palestinian refugee camp in South Lebanon that became the main headquarters for Fatah forces after 1970?",
      "answer": "Ain al-Hilweh",
      "explanation": "Ain al-Hilweh near Sidon became the largest refugee camp in Lebanon and the primary military stronghold for Fatah.",
      "year": 1970,
      "distractors": ["Shatila", "Sabra", "Nahr al-Bared"]
    },
    {
      "id": "q_2_2_n15",
      "question": "Who was the head of the Jordanian Army who led the offensive against PLO forces during Black September in 1970?",
      "answer": "Habis al-Majali",
      "explanation": "Field Marshal Habis al-Majali was appointed military governor by King Hussein to command the campaign against the PLO.",
      "year": 1970,
      "distractors": ["Wasfi al-Tal", "Zaid al-Rifai", "Ali Abu Nuwar"]
    }
  ],
  "subtopic_2_3": [
    // 5 Easy
    {
      "id": "q_2_3_n1",
      "question": "In which year did the Yom Kippur War break out?",
      "answer": "1973",
      "explanation": "The Yom Kippur War began on 6 October 1973 with a surprise joint attack by Egypt and Syria.",
      "year": 1973,
      "distractors": ["1967", "1970", "1975"]
    },
    {
      "id": "q_2_3_n2",
      "question": "On which Jewish holy day of fasting and atonement did Egypt and Syria launch their attack in 1973?",
      "answer": "Yom Kippur",
      "explanation": "The attack was launched on Yom Kippur (Day of Atonement) when Israel's infrastructure, media, and military were largely shut down.",
      "year": 1973,
      "distractors": ["Passover", "Rosh Hashanah", "Hanukkah"]
    },
    {
      "id": "q_2_3_n3",
      "question": "Who was the Prime Minister of Israel during the 1973 Yom Kippur War?",
      "answer": "Golda Meir",
      "explanation": "Golda Meir was the PM who led Israel through the initial crisis of the war, later resigning in 1974.",
      "year": 1973,
      "distractors": ["David Ben-Gurion", "Levi Eshkol", "Yitzhak Rabin"]
    },
    {
      "id": "q_2_3_n4",
      "question": "Which canal did the Egyptian military successfully cross during the opening hours of the Yom Kippur War?",
      "answer": "The Suez Canal",
      "explanation": "Egyptian forces crossed the Suez Canal, breaching the Bar-Lev Line sand fortifications in a massive amphibious operation.",
      "year": 1973,
      "distractors": ["The Straits of Tiran", "The Jordan River", "The Litani River"]
    },
    {
      "id": "q_2_3_n5",
      "question": "What is the acronym for the group of petroleum-exporting countries that imposed a devastating oil embargo in 1973?",
      "answer": "OPEC",
      "explanation": "OPEC (led by OAPEC members) cut oil exports and embargoed the West to force pressure on Israel to withdraw.",
      "year": 1973,
      "distractors": ["OAPEC", "OECD", "G7"]
    },
    // 5 Medium
    {
      "id": "q_2_3_n6",
      "question": "What was the code name of the massive US military airlift operation that sent emergency supplies to Israel during the war?",
      "answer": "Operation Nickel Grass",
      "explanation": "Operation Nickel Grass was ordered by President Nixon in October 1973, shipping over 22,000 tons of tanks, planes, and ammo to Israel.",
      "year": 1973,
      "distractors": ["Operation Badr", "Operation Nickel Shield", "Operation Nickel Storm"]
    },
    {
      "id": "q_2_3_n7",
      "question": "Which Israeli General led the daring counter-crossing of the Suez Canal to encircle the Egyptian Third Army?",
      "answer": "Ariel Sharon",
      "explanation": "Ariel Sharon commanded the 143rd Armoured Division, crossing the canal to the west bank and turning the tide of the war.",
      "year": 1973,
      "distractors": ["David Elazar", "Moshe Dayan", "Yitzhak Rabin"]
    },
    {
      "id": "q_2_3_n8",
      "question": "What was the name of the Syrian military frontline boundary that Israel broke through to launch its counter-offensive toward Damascus?",
      "answer": "The Purple Line",
      "explanation": "The Purple Line was the de facto border line between Israel and Syria after 1967; Israel crossed it to threaten Damascus.",
      "year": 1973,
      "distractors": ["The Green Line", "The Bar-Lev Line", "The Blue Line"]
    },
    {
      "id": "q_2_3_n9",
      "question": "Who was the President of the United States during the 1973 Yom Kippur War?",
      "answer": "Richard Nixon",
      "explanation": "President Nixon ordered the military airlift and cooperated with the Soviets to pass a UN ceasefire resolution.",
      "year": 1973,
      "distractors": ["Lyndon B. Johnson", "Gerald Ford", "Jimmy Carter"]
    },
    {
      "id": "q_2_3_n10",
      "question": "In which month and year did the Yom Kippur War begin?",
      "answer": "October 1973",
      "explanation": "The Yom Kippur War began on 6 October and ended with ceasefires in late October 1973.",
      "year": 1973,
      "distractors": ["June 1967", "November 1973", "September 1970"]
    },
    // 5 Difficult
    {
      "id": "q_2_3_n11",
      "question": "What was the name of the Egyptian operational plan for the crossing of the Suez Canal in 1973?",
      "answer": "Operation Badr",
      "explanation": "Operation Badr was the code name for the highly successful crossing of the canal and breaching of the Bar-Lev Line.",
      "year": 1973,
      "distractors": ["Operation Kadesh", "Operation Focus", "Operation Black Arrow"]
    },
    {
      "id": "q_2_3_n12",
      "question": "Who was the Director of Israeli Military Intelligence (Aman) during the Yom Kippur War who was criticized for ignoring warnings?",
      "answer": "Eli Zeira",
      "explanation": "Major General Eli Zeira was found by the Agranat Commission to have failed in warning the cabinet due to dogmatic assumptions.",
      "year": 1973,
      "distractors": ["Dado Elazar", "Zvi Zamir", "Moshe Dayan"]
    },
    {
      "id": "q_2_3_n13",
      "question": "Which Soviet Premier did Egypt's Anwar Sadat negotiate with to secure SAM missile batteries before the war?",
      "answer": "Leonid Brezhnev",
      "explanation": "Leonid Brezhnev agreed to supply Egypt with SAM batteries, which neutralized Israel's air superiority in the war's first week.",
      "year": 1973,
      "distractors": ["Nikita Khrushchev", "Mikhail Gorbachev", "Andrei Gromyko"]
    },
    {
      "id": "q_2_3_n14",
      "question": "Which Israeli Defence Minister suffered a near-breakdown on 7 October 1973, declaring 'the destruction of the Third Temple' was near?",
      "answer": "Moshe Dayan",
      "explanation": "Moshe Dayan was shocked by the early losses and recommended pulling back to defensive lines, but Golda Meir overruled his panic.",
      "year": 1973,
      "distractors": ["Ariel Sharon", "David Elazar", "Yitzhak Rabin"]
    },
    {
      "id": "q_2_3_n15",
      "question": "Exactly how many Soviet military advisers did Anwar Sadat expel from Egypt in July 1972 to prepare a shift to the USA?",
      "answer": "15,000 advisers",
      "explanation": "Anwar Sadat expelled all 15,000 Soviet advisers to show independence and court diplomatic support from Washington.",
      "year": 1972,
      "distractors": ["5,000 advisers", "10,000 advisers", "25,000 advisers"]
    }
  ],
  "subtopic_3_1": [
    // 5 Easy
    {
      "id": "q_3_1_n1",
      "question": "In which year did the Camp David Accords get signed, laying the framework for peace between Egypt and Israel?",
      "answer": "1978",
      "explanation": "The Camp David Accords were signed on 17 September 1978 after 13 days of secret negotiations in Maryland.",
      "year": 1978,
      "distractors": ["1973", "1977", "1979"]
    },
    {
      "id": "q_3_1_n2",
      "question": "Who was the US President who hosted and mediated the secret talks at Camp David in 1978?",
      "answer": "Jimmy Carter",
      "explanation": "President Jimmy Carter personally intervened, inviting Begin and Sadat to Camp David to broker a peace deal.",
      "year": 1978,
      "distractors": ["Richard Nixon", "Gerald Ford", "Ronald Reagan"]
    },
    {
      "id": "q_3_1_n3",
      "question": "Who was the Israeli Prime Minister who signed the Camp David Accords and the 1979 peace treaty?",
      "answer": "Menachem Begin",
      "explanation": "Menachem Begin was the Likud Prime Minister of Israel who made peace with Egypt, returning the Sinai Peninsula.",
      "year": 1978,
      "distractors": ["Yitzhak Rabin", "Golda Meir", "Yitzhak Shamir"]
    },
    {
      "id": "q_3_1_n4",
      "question": "In which year did Egypt and Israel sign their formal, historic peace treaty in Washington?",
      "answer": "1979",
      "explanation": "The Egypt-Israel Peace Treaty was signed in Washington D.C. on 26 March 1979, ending 30 years of war.",
      "year": 1979,
      "distractors": ["1977", "1978", "1981"]
    },
    {
      "id": "q_3_1_n5",
      "question": "What is the name of the US presidential country retreat in Maryland where the 1978 peace talks took place?",
      "answer": "Camp David",
      "explanation": "Camp David is the official mountain retreat for the President of the US, offering isolation from press and political pressure.",
      "year": 1978,
      "distractors": ["Kennebunkport", "Warm Springs", "Key Largo"]
    },
    // 5 Medium
    {
      "id": "q_3_1_n6",
      "question": "Who succeeded Anwar Sadat as President of Egypt after Sadat was assassinated by Islamist soldiers in 1981?",
      "answer": "Hosni Mubarak",
      "explanation": "Hosni Mubarak succeeded Sadat in October 1981, maintaining the peace treaty with Israel and ruling Egypt for 30 years.",
      "year": 1981,
      "distractors": ["Anwar Sadat", "Gamal Abdel Nasser", "Boutros Boutros-Ghali"]
    },
    {
      "id": "q_3_1_n7",
      "question": "What is the name of the historic speech delivered by Anwar Sadat in November 1977 directly to Israeli legislators?",
      "answer": "The Knesset Speech",
      "explanation": "Anwar Sadat traveled to Jerusalem and delivered a speech in the Knesset, proposing peace while defending Arab rights.",
      "year": 1977,
      "distractors": ["The Jerusalem Declaration", "The Sinai Accord Speech", "The Knesset Proposal"]
    },
    {
      "id": "q_3_1_n8",
      "question": "Which vital international shipping canal did Egypt reopen in June 1975 following troop disengagement agreements?",
      "answer": "The Suez Canal",
      "explanation": "The Suez Canal had been closed since the 1967 war, but was reopened in 1975 after Israeli forces withdrew from its eastern banks.",
      "year": 1975,
      "distractors": ["The Straits of Tiran", "The Jordan Canal", "The Aqaba Outlet"]
    },
    {
      "id": "q_3_1_n9",
      "question": "In which Egyptian city was President Anwar Sadat assassinated during a military parade in October 1981?",
      "answer": "Cairo",
      "explanation": "Sadat was shot in Cairo by members of the Egyptian Islamic Jihad who opposed the peace treaty with Israel.",
      "year": 1981,
      "distractors": ["Alexandria", "Suez", "Ismailia"]
    },
    {
      "id": "q_3_1_n10",
      "question": "Which regional organization expelled Egypt in 1979 in protest of its peace treaty with Israel?",
      "answer": "The Arab League",
      "explanation": "The Arab League expelled Egypt and moved its headquarters from Cairo to Tunis, furious that Sadat had signed a separate peace.",
      "year": 1979,
      "distractors": ["OPEC", "The Gulf Cooperation Council", "The Pan-Arab Coalition"]
    },
    // 4 Difficult
    {
      "id": "q_3_1_n11",
      "question": "What was the name of the January 1974 military disengagement agreement between Israel and Egypt brokered by Henry Kissinger?",
      "answer": "Sinai I",
      "explanation": "The Sinai I agreement saw Israeli forces pull back to 20km east of the Suez Canal, allowing Egypt to clear and reopen it.",
      "year": 1974,
      "distractors": ["Sinai II", "Sinai Accord", "Suez Disengagement Agreement"]
    },
    {
      "id": "q_3_1_n12",
      "question": "Which US Secretary of State pioneered 'shuttle diplomacy' to broker the Sinai I and Sinai II agreements between 1974 and 1975?",
      "answer": "Henry Kissinger",
      "explanation": "Henry Kissinger flew constantly between Cairo, Tel Aviv, and Damascus to negotiate troop pullbacks and disengagement.",
      "year": 1974,
      "distractors": ["William P. Rogers", "Cyrus Vance", "George Shultz"]
    },
    {
      "id": "q_3_1_n13",
      "question": "Which Egyptian diplomat and future UN Secretary-General served as Minister of State for Foreign Affairs during the Camp David talks?",
      "answer": "Boutros Boutros-Ghali",
      "explanation": "Boutros Boutros-Ghali accompanied Sadat to Camp David, playing a vital role in negotiating the legal frameworks.",
      "year": 1978,
      "distractors": ["Ismail Fahmy", "Muhammad Ibrahim Kamel", "Amr Moussa"]
    },
    {
      "id": "q_3_1_n14",
      "question": "In which month and year was the formal Egypt-Israel Peace Treaty signed in Washington D.C.?",
      "answer": "March 1979",
      "explanation": "The treaty was signed on 26 March 1979 on the White House lawn by Sadat, Begin, and Carter.",
      "year": 1979,
      "distractors": ["September 1978", "November 1977", "October 1981"]
    }
  ],
  "subtopic_3_2": [
    // 5 Easy
    {
      "id": "q_3_2_n1",
      "question": "What is the name of the grassroots Palestinian uprising that erupted in Gaza and the West Bank in December 1987?",
      "answer": "The First Intifada",
      "explanation": "The First Intifada was a massive, spontaneous rebellion featuring boycotts, strikes, and stone-throwing against Israeli forces.",
      "year": 1987,
      "distractors": ["The Al-Aqsa Intifada", "The Nakba Revolt", "The Fatah Insurgency"]
    },
    {
      "id": "q_3_2_n2",
      "question": "Who was the leader of the PLO during the 1982 Lebanon War?",
      "answer": "Yasser Arafat",
      "explanation": "Yasser Arafat commanded PLO forces in Beirut, eventually agreeing to withdraw to Tunisia under a US-brokered deal.",
      "year": 1982,
      "distractors": ["George Habash", "Abu Nidal", "Mahmoud Abbas"]
    },
    {
      "id": "q_3_2_n3",
      "question": "In which Arab country is Beirut, the capital city besieged and bombarded by Israeli forces in 1982?",
      "answer": "Lebanon",
      "explanation": "Lebanon was invaded by Israel in 1982 to destroy the PLO bases, culminating in the siege of West Beirut.",
      "year": 1982,
      "distractors": ["Syria", "Jordan", "Egypt"]
    },
    {
      "id": "q_3_2_n4",
      "question": "What symbolic plant branch did Yasser Arafat claim to carry alongside a freedom fighter's gun in his 1974 UN speech?",
      "answer": "An olive branch",
      "explanation": "Arafat famously said, 'I have come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.'",
      "year": 1974,
      "distractors": ["A palm branch", "A laurel branch", "A fig branch"]
    },
    {
      "id": "q_3_2_n5",
      "question": "In which year did the First Palestinian Intifada begin, sparked by a military vehicle crash in Gaza?",
      "answer": "1987",
      "explanation": "The First Intifada began on 9 December 1987 after an IDF truck crashed into Palestinian civilian cars, killing four.",
      "year": 1987,
      "distractors": ["1982", "1985", "1993"]
    },
    // 5 Medium
    {
      "id": "q_3_2_n6",
      "question": "Which Lebanese Christian militia carried out the horrific Sabra and Shatila massacre in September 1982?",
      "answer": "The Phalangists",
      "explanation": "Phalangist militias entered the camps to avenge the assassination of their leader Bashir Gemayel, killing hundreds of civilians.",
      "year": 1982,
      "distractors": ["The Druze Forces", "The Amal Movement", "Hezbollah"]
    },
    {
      "id": "q_3_2_n7",
      "question": "Which Israeli judicial commission investigated the Sabra and Shatila massacre, finding Defence Minister Ariel Sharon indirectly responsible?",
      "answer": "The Kahan Commission",
      "explanation": "The 1983 Kahan Commission found Sharon personally responsible for failing to anticipate the danger of letting Phalangists into the camps.",
      "year": 1983,
      "distractors": ["The Agranat Commission", "The Shamgar Commission", "The Land Commission"]
    },
    {
      "id": "q_3_2_n8",
      "question": "Who was the Israeli Chief of Staff during the 1982 invasion of Lebanon who was reprimanded by the Kahan Commission?",
      "answer": "Rafael Eitan",
      "explanation": "Lieutenant General Rafael Eitan was criticized by the commission for failing to coordinate and intervene in the massacres.",
      "year": 1982,
      "distractors": ["Ariel Sharon", "Moshe Dayan", "Yitzhak Rabin"]
    },
    {
      "id": "q_3_2_n9",
      "question": "To which North African capital city was the PLO headquarters forced to relocate in 1982 after being expelled from Beirut?",
      "answer": "Tunis",
      "explanation": "The PLO moved its leadership and administrative headquarters to Tunis, Tunisia, where it remained until 1994.",
      "year": 1982,
      "distractors": ["Algiers", "Tripoli", "Cairo"]
    },
    {
      "id": "q_3_2_n10",
      "question": "Who was the Israeli Defence Minister who directed the 1982 invasion of Lebanon and was forced to resign over the Sabra and Shatila massacre?",
      "answer": "Ariel Sharon",
      "explanation": "Ariel Sharon directed the war, pushing forces past the authorized 40km buffer all the way to Beirut, resigning in early 1983.",
      "year": 1982,
      "distractors": ["Menachem Begin", "Yitzhak Shamir", "Moshe Arens"]
    },
    // 4 Difficult
    {
      "id": "q_3_2_n11",
      "question": "In which month and year did the First Palestinian Intifada break out?",
      "answer": "December 1987",
      "explanation": "The First Intifada began on 9 December 1987, starting in the Jabalia refugee camp in the Gaza Strip.",
      "year": 1987,
      "distractors": ["September 1982", "November 1988", "September 1993"]
    },
    {
      "id": "q_3_2_n12",
      "question": "What was the name of the Israeli Ambassador in London whose attempted assassination in June 1982 was used as the pretext to invade Lebanon?",
      "answer": "Shlomo Argov",
      "explanation": "Argov was shot by the extremist Abu Nidal Group (which was hostile to Arafat's PLO), but Israel blamed the PLO and launched the invasion.",
      "year": 1982,
      "distractors": ["Abba Eban", "Ephraim Evron", "Simcha Dinitz"]
    },
    {
      "id": "q_3_2_n13",
      "question": "Exactly how many Israeli troops invaded South Lebanon in March 1978 during the limited Operation Litani?",
      "answer": "25,000 troops",
      "explanation": "Israel sent 25,000 troops across the border to clear PLO bases south of the Litani River, withdrawing when UNIFIL arrived.",
      "year": 1978,
      "distractors": ["10,000 troops", "15,000 troops", "50,000 troops"]
    },
    {
      "id": "q_3_2_n14",
      "question": "In which month and year was Yasser Arafat's landmark speech delivered to the UN General Assembly?",
      "answer": "November 1974",
      "explanation": "Arafat spoke to the General Assembly in New York on 13 November 1974, securing a major diplomatic breakthrough.",
      "year": 1974,
      "distractors": ["October 1973", "December 1975", "November 1978"]
    }
  ],
  "subtopic_3_3": [
    // 4 Easy
    {
      "id": "q_3_3_n1",
      "question": "Who was the Israeli Prime Minister who shook hands with Yasser Arafat on the White House lawn in 1993 to sign the Oslo Accords?",
      "answer": "Yitzhak Rabin",
      "explanation": "Prime Minister Yitzhak Rabin signed the Declaration of Principles alongside Yasser Arafat, a move that won him the Nobel Peace Prize.",
      "year": 1993,
      "distractors": ["Yitzhak Shamir", "Shimon Peres", "Benjamin Netanyahu"]
    },
    {
      "id": "q_3_3_n2",
      "question": "In which year did Israel and the PLO sign the Oslo I Accord, establishing the Palestinian Authority?",
      "answer": "1993",
      "explanation": "The Oslo I Accord (Declaration of Principles) was signed in Washington D.C. on 13 September 1993.",
      "year": 1993,
      "distractors": ["1988", "1991", "1995"]
    },
    {
      "id": "q_3_3_n3",
      "question": "In which European capital city did the secret, back-channel talks between the PLO and Israeli negotiators take place in 1992-93?",
      "answer": "Oslo",
      "explanation": "The secret negotiations were hosted by Norway in Oslo, allowing negotiators to make compromises away from the public eye.",
      "year": 1993,
      "distractors": ["Stockholm", "Copenhagen", "Helsinki"]
    },
    {
      "id": "q_3_3_n4",
      "question": "Who was the US President who hosted the historic Oslo I signing ceremony and handshake on the White House lawn?",
      "answer": "Bill Clinton",
      "explanation": "President Bill Clinton hosted and facilitated the public signing of the Oslo Accords on 13 September 1993.",
      "year": 1993,
      "distractors": ["George H.W. Bush", "Ronald Reagan", "Jimmy Carter"]
    },
    // 4 Medium
    {
      "id": "q_3_3_n5",
      "question": "Which Spanish city hosted the landmark November 1991 peace conference co-sponsored by the US and the USSR?",
      "answer": "Madrid",
      "explanation": "The Madrid Conference of 1991 opened direct bilateral peace talks between Israel and its Arab neighbours.",
      "year": 1991,
      "distractors": ["Barcelona", "Seville", "Toledo"]
    },
    {
      "id": "q_3_3_n6",
      "question": "In which year did Israel and Jordan sign their historic, formal bilateral peace treaty?",
      "answer": "1994",
      "explanation": "Israel and Jordan signed their peace treaty on 26 October 1994, resolving borders and water rights.",
      "year": 1994,
      "distractors": ["1979", "1993", "1995"]
    },
    {
      "id": "q_3_3_n7",
      "question": "Who was the Jordanian monarch who signed the 1994 peace treaty with Israeli Prime Minister Rabin?",
      "answer": "King Hussein",
      "explanation": "King Hussein of Jordan signed the peace treaty, ending the state of war that had existed since 1948.",
      "year": 1994,
      "distractors": ["King Abdullah II", "Crown Prince Hassan", "King Faisal"]
    },
    {
      "id": "q_3_3_n8",
      "question": "Who succeeded Yitzhak Rabin as Prime Minister of Israel immediately after Rabin's assassination in November 1995?",
      "answer": "Shimon Peres",
      "explanation": "Shimon Peres, Rabin's Foreign Minister and peace partner, assumed the premiership to continue the peace process.",
      "year": 1995,
      "distractors": ["Benjamin Netanyahu", "Ehud Barak", "Ariel Sharon"]
    },
    // 4 Difficult
    {
      "id": "q_3_3_n9",
      "question": "In which Swiss city did the UN General Assembly hold a special session in December 1988 so Yasser Arafat could speak after the US denied him a visa?",
      "answer": "Geneva",
      "explanation": "The UN voted to move the session to Geneva to allow Arafat to deliver his historic speech renouncing terrorism.",
      "year": 1988,
      "distractors": ["Zurich", "Bern", "Lausanne"]
    },
    {
      "id": "q_3_3_n10",
      "question": "Under the 1995 Oslo II Accord, which letter designation was given to West Bank areas under full Israeli military and civil control?",
      "answer": "Area C",
      "explanation": "Area C covered about 60% of the West Bank, encompassing Jewish settlements, military zones, and state lands under full Israeli control.",
      "year": 1995,
      "distractors": ["Area A", "Area B", "Area D"]
    },
    {
      "id": "q_3_3_n11",
      "question": "In which month and year was Israeli Prime Minister Yitzhak Rabin assassinated at a peace rally in Tel Aviv?",
      "answer": "November 1995",
      "explanation": "Yitzhak Rabin was shot on 4 November 1995 by Yigal Amir, an Israeli extremist who opposed the Oslo Accords.",
      "year": 1995,
      "distractors": ["September 1993", "October 1994", "September 1995"]
    },
    {
      "id": "q_3_3_n12",
      "question": "Who was the Iraqi dictator whose August 1990 invasion of Kuwait split the Arab coalition and forced the PLO into isolation?",
      "answer": "Saddam Hussein",
      "explanation": "Saddam Hussein invaded Kuwait, and Arafat's decision to support him lost the PLO the financial backing of Gulf oil states, forcing Arafat to negotiate.",
      "year": 1990,
      "distractors": ["Tariq Aziz", "Hasan al-Bakr", "King Faisal"]
    }
  ]
};

// Now merge the new questions into the original QUIZ_DATA.
// First, make a map of original questions for each subtopic to easily combine.
originalQuizData.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    const subtopicId = subtopic.id;
    const addedQs = newQuestions[subtopicId] || [];

    // Combine standard and depth questions into a single look-up map by ID
    const allQuestionsMap = {};
    subtopic.standard.forEach(q => { allQuestionsMap[q.id] = q; });
    subtopic.depth.forEach(q => { allQuestionsMap[q.id] = q; });

    // Add new questions to this map
    addedQs.forEach(q => {
      allQuestionsMap[q.id] = q;
    });

    // Define mapping lists for 10 easy, 10 medium, and 10 difficult
    const mapping10 = {
      "subtopic_1_1": {
        "easy": ["q_1_1_s1", "q_1_1_s2", "q_1_1_s3", "q_1_1_s4", "q_1_1_s10", "q_1_1_n1", "q_1_1_n2", "q_1_1_n3", "q_1_1_n4", "q_1_1_n5"],
        "medium": ["q_1_1_s5", "q_1_1_s6", "q_1_1_s7", "q_1_1_s9", "q_1_1_d2", "q_1_1_n6", "q_1_1_n7", "q_1_1_n8", "q_1_1_n9", "q_1_1_n10"],
        "difficult": ["q_1_1_s8", "q_1_1_d1", "q_1_1_d3", "q_1_1_d4", "q_1_1_d5", "q_1_1_d6", "q_1_1_n11", "q_1_1_n12", "q_1_1_n13", "q_1_1_n14"]
      },
      "subtopic_1_2": {
        "easy": ["q_1_2_s1", "q_1_2_s2", "q_1_2_s3", "q_1_2_s4", "q_1_2_s9", "q_1_2_n1", "q_1_2_n2", "q_1_2_n3", "q_1_2_n4", "q_1_2_n5"],
        "medium": ["q_1_2_s5", "q_1_2_s6", "q_1_2_s7", "q_1_2_s8", "q_1_2_s10", "q_1_2_n6", "q_1_2_n7", "q_1_2_n8", "q_1_2_n9", "q_1_2_n10"],
        "difficult": ["q_1_2_d1", "q_1_2_d2", "q_1_2_d3", "q_1_2_d4", "q_1_2_d5", "q_1_2_d6", "q_1_2_n11", "q_1_2_n12", "q_1_2_n13", "q_1_2_n14"]
      },
      "subtopic_1_3": {
        "easy": ["q_1_3_s1", "q_1_3_s2", "q_1_3_s5", "q_1_3_s7", "q_1_3_s9", "q_1_3_n1", "q_1_3_n2", "q_1_3_n3", "q_1_3_n4", "q_1_3_n5"],
        "medium": ["q_1_3_s3", "q_1_3_s4", "q_1_3_s6", "q_1_3_s10", "q_1_3_d3", "q_1_3_n6", "q_1_3_n7", "q_1_3_n8", "q_1_3_n9", "q_1_3_n10"],
        "difficult": ["q_1_3_s8", "q_1_3_d1", "q_1_3_d2", "q_1_3_d4", "q_1_3_d5", "q_1_3_n11", "q_1_3_n12", "q_1_3_n13", "q_1_3_n14", "q_1_3_n15"]
      },
      "subtopic_2_1": {
        "easy": ["q_2_1_s2", "q_2_1_s3", "q_2_1_s8", "q_2_1_s9", "q_2_1_s10", "q_2_1_n1", "q_2_1_n2", "q_2_1_n3", "q_2_1_n4", "q_2_1_n5"],
        "medium": ["q_2_1_s1", "q_2_1_s4", "q_2_1_s5", "q_2_1_s6", "q_2_1_s7", "q_2_1_n6", "q_2_1_n7", "q_2_1_n8", "q_2_1_n9", "q_2_1_n10"],
        "difficult": ["q_2_1_d1", "q_2_1_d2", "q_2_1_d3", "q_2_1_d4", "q_2_1_d5", "q_2_1_n11", "q_2_1_n12", "q_2_1_n13", "q_2_1_n14", "q_2_1_n15"]
      },
      "subtopic_2_2": {
        "easy": ["q_2_2_s1", "q_2_2_s4", "q_2_2_s5", "q_2_2_s6", "q_2_2_s10", "q_2_2_n1", "q_2_2_n2", "q_2_2_n3", "q_2_2_n4", "q_2_2_n5"],
        "medium": ["q_2_2_s2", "q_2_2_s3", "q_2_2_s7", "q_2_2_s8", "q_2_2_s9", "q_2_2_n6", "q_2_2_n7", "q_2_2_n8", "q_2_2_n9", "q_2_2_n10"],
        "difficult": ["q_2_2_d1", "q_2_2_d2", "q_2_2_d3", "q_2_2_d4", "q_2_2_d5", "q_2_2_n11", "q_2_2_n12", "q_2_2_n13", "q_2_2_n14", "q_2_2_n15"]
      },
      "subtopic_2_3": {
        "easy": ["q_2_3_s1", "q_2_3_s3", "q_2_3_s4", "q_2_3_s5", "q_2_3_s8", "q_2_3_n1", "q_2_3_n2", "q_2_3_n3", "q_2_3_n4", "q_2_3_n5"],
        "medium": ["q_2_3_s2", "q_2_3_s6", "q_2_3_s7", "q_2_3_s9", "q_2_3_s10", "q_2_3_n6", "q_2_3_n7", "q_2_3_n8", "q_2_3_n9", "q_2_3_n10"],
        "difficult": ["q_2_3_d1", "q_2_3_d2", "q_2_3_d3", "q_2_3_d4", "q_2_3_d5", "q_2_3_n11", "q_2_3_n12", "q_2_3_n13", "q_2_3_n14", "q_2_3_n15"]
      },
      "subtopic_3_1": {
        "easy": ["q_3_1_s2", "q_3_1_s3", "q_3_1_s6", "q_3_1_s8", "q_3_1_s10", "q_3_1_n1", "q_3_1_n2", "q_3_1_n3", "q_3_1_n4", "q_3_1_n5"],
        "medium": ["q_3_1_s1", "q_3_1_s4", "q_3_1_s5", "q_3_1_s7", "q_3_1_s9", "q_3_1_n6", "q_3_1_n7", "q_3_1_n8", "q_3_1_n9", "q_3_1_n10"],
        "difficult": ["q_3_1_d1", "q_3_1_d2", "q_3_1_d3", "q_3_1_d4", "q_3_1_d5", "q_3_1_d6", "q_3_1_n11", "q_3_1_n12", "q_3_1_n13", "q_3_1_n14"]
      },
      "subtopic_3_2": {
        "easy": ["q_3_2_s1", "q_3_2_s2", "q_3_2_s6", "q_3_2_s9", "q_3_2_s10", "q_3_2_n1", "q_3_2_n2", "q_3_2_n3", "q_3_2_n4", "q_3_2_n5"],
        "medium": ["q_3_2_s3", "q_3_2_s4", "q_3_2_s5", "q_3_2_s7", "q_3_2_s8", "q_3_2_n6", "q_3_2_n7", "q_3_2_n8", "q_3_2_n9", "q_3_2_n10"],
        "difficult": ["q_3_2_d1", "q_3_2_d2", "q_3_2_d3", "q_3_2_d4", "q_3_2_d5", "q_3_2_d6", "q_3_2_n11", "q_3_2_n12", "q_3_2_n13", "q_3_2_n14"]
      },
      "subtopic_3_3": {
        "easy": ["q_3_3_s2", "q_3_3_s3", "q_3_3_s7", "q_3_3_s8", "q_3_3_s10", "q_3_3_d6", "q_3_3_n1", "q_3_3_n2", "q_3_3_n3", "q_3_3_n4"],
        "medium": ["q_3_3_s1", "q_3_3_s4", "q_3_3_s5", "q_3_3_s6", "q_3_3_s9", "q_3_3_d1", "q_3_3_n5", "q_3_3_n6", "q_3_3_n7", "q_3_3_n8"],
        "difficult": ["q_3_3_d2", "q_3_3_d3", "q_3_3_d4", "q_3_3_d5", "q_3_3_d7", "q_3_3_d8", "q_3_3_n9", "q_3_3_n10", "q_3_3_n11", "q_3_3_n12"]
      }
    };

    const rules = mapping10[subtopicId];
    if (!rules) {
      throw new Error(`Missing mapping for ${subtopicId}`);
    }

    // Build the new arrays
    const newEasy = rules.easy.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    const newMedium = rules.medium.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    const newDifficult = rules.difficult.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    // Replace the properties
    delete subtopic.standard;
    delete subtopic.depth;
    subtopic.easy = newEasy;
    subtopic.medium = newMedium;
    subtopic.difficult = newDifficult;
  });
});

// Now generate the new file content.
// Find the split point in the original file content.
const splitText = 'const EXAM_SKILLS_DATA =';
const splitIndex = fileContent.indexOf(splitText);
if (splitIndex === -1) {
  throw new Error("Could not find 'const EXAM_SKILLS_DATA =' in questions_original.js");
}
const secondPart = fileContent.substring(splitIndex);

// First part will be the new QUIZ_DATA definition
const firstPart = `// Middle East Conflict (1945-95) Quiz Data
// Stored as a global variable to prevent CORS issues when run via file:// protocol.

const QUIZ_DATA = ${JSON.stringify(originalQuizData, null, 2)};

`;

fs.writeFileSync(targetFile, firstPart + secondPart, 'utf8');
console.log("Successfully generated expanded questions.js with 10 Easy, 10 Medium, and 10 Difficult questions per subtopic (total 270 questions)!");
