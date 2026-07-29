// Middle East Conflict (1945-95) Quiz Data
// Stored as a global variable to prevent CORS issues when run via file:// protocol.

const QUIZ_DATA = [
  {
    "id": "topic_1",
    "title": "Key Topic 1: The birth of the state of Israel, 1945-63",
    "subtopics": [
      {
        "id": "subtopic_1_1",
        "embedVideo": "https://youtu.be/PgnQeDoypO8",
        "title": "Topic 1.1: The British withdrawal and the creation of Israel",
        "easy": [
          {
            "id": "q_1_1_s1",
            "question": "What legal authority was Britain given by the League of Nations in 1920 to govern Palestine?",
            "answer": "The British Mandate",
            "explanation": "The League of Nations created this system to manage former Ottoman territories, though in Palestine, it became an impossible balancing act between protecting the rights of the Arab majority and supporting Jewish immigration.",
            "year": 1920,
            "distractors": [
              "The British Protectorate Accord",
              "The British Colonial Charter",
              "The British Trusteeship Treaty"
            ]
          },
          {
            "id": "q_1_1_s2",
            "question": "What was the name of the nationalist movement aiming to create a Jewish homeland in Palestine?",
            "answer": "Zionism",
            "explanation": "Originally a political movement founded in Europe in response to widespread anti-Semitism, it argued for the creation of a Jewish homeland in Palestine to ensure Jewish survival.",
            "year": 1897,
            "distractors": [
              "Pan-Arabism",
              "Diaspora Nationalism",
              "Hebrew Integrationism"
            ]
          },
          {
            "id": "q_1_1_s3",
            "question": "Which 1917 British declaration originally promised to support the establishment of a Jewish national home?",
            "answer": "The Balfour Declaration",
            "explanation": "The 1917 Balfour Declaration was highly controversial because it promised a Jewish national home in a land where the vast majority of the population was Arab, laying the groundwork for decades of future conflict.",
            "year": 1917,
            "distractors": [
              "The Peel Declaration",
              "The Sykes-Picot Agreement",
              "The White Paper of 1939"
            ]
          },
          {
            "id": "q_1_1_s4",
            "question": "The horrors of which event during the Second World War vastly increased global sympathy for a Jewish state?",
            "answer": "The Holocaust",
            "explanation": "The murder of six million European Jews generated immense international sympathy and moral pressure on Western nations, particularly the USA, to support a Jewish state as a safe haven.",
            "year": 1945,
            "distractors": [
              "The Dreyfus Affair",
              "The Pogroms of Tsarist Russia",
              "The Kishinev Riots"
            ]
          },
          {
            "id": "q_1_1_s10",
            "question": "In February 1947, exhausted by the insurgency, Britain handed the Palestine problem to which international organisation?",
            "answer": "The United Nations (UN)",
            "explanation": "The newly formed United Nations was handed the Palestine problem in 1947 because the British had exhausted their military troops and financial resources trying to suppress the Jewish insurgency.",
            "year": 1947,
            "distractors": [
              "The League of Nations",
              "The International Court of Justice",
              "The Allied Supreme Council"
            ]
          },
          {
            "id": "q_1_1_n1",
            "question": "Which political party won the 1945 British General Election, changing British policy in Palestine?",
            "answer": "The Labour Party",
            "explanation": "Clement Attlee's Labour Party won a landslide victory in 1945, inheriting the bankrupt post-war British Empire and the Palestine crisis.",
            "year": 1945,
            "distractors": [
              "The Conservative Party",
              "The Liberal Party",
              "The Coalition Party"
            ]
          },
          {
            "id": "q_1_1_n2",
            "question": "In which year did the British Mandate officially end and the State of Israel get declared?",
            "answer": "1948",
            "explanation": "David Ben-Gurion declared the establishment of the State of Israel on 14 May 1948, immediately as the last British troops departed.",
            "year": 1948,
            "distractors": [
              "1945",
              "1947",
              "1950"
            ]
          },
          {
            "id": "q_1_1_n3",
            "question": "Who was the leader of the Jewish Agency who declared Israel's independence and became its first Prime Minister?",
            "answer": "David Ben-Gurion",
            "explanation": "David Ben-Gurion was the executive head of the Jewish Agency and led the struggle for independence, serving as Israel's first Prime Minister.",
            "year": 1948,
            "distractors": [
              "Chaim Weizmann",
              "Golda Meir",
              "Levi Eshkol"
            ]
          },
          {
            "id": "q_1_1_n4",
            "question": "What was the name of the official governing body of the Jewish community in Palestine during the Mandate?",
            "answer": "The Jewish Agency",
            "explanation": "The Jewish Agency for Palestine acted as the de facto government for the Jewish population under the British Mandate.",
            "year": 1929,
            "distractors": [
              "The Zionist Congress",
              "The Hebrew Council",
              "The Histadrut Federation"
            ]
          },
          {
            "id": "q_1_1_n5",
            "question": "Which major UN declaration in December 1948 established international rights for refugees worldwide?",
            "answer": "The Universal Declaration of Human Rights",
            "explanation": "The Universal Declaration of Human Rights was adopted by the UN in 1948 in response to the atrocities of World War II and the refugee crisis.",
            "year": 1948,
            "distractors": [
              "The Geneva Convention",
              "The UN Charter",
              "The Declaration of Rights of the Displaced"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_1_1_s5",
            "question": "What was the name of the moderate Jewish defence force that helped smuggle immigrants into Palestine?",
            "answer": "The Haganah",
            "explanation": "Formed in the 1920s originally to defend Jewish settlements, it evolved into a highly organised military force that helped smuggle Holocaust survivors past the British blockade.",
            "year": 1920,
            "distractors": [
              "The Irgun Zvai Leumi",
              "The Stern Gang (Lohamei Herut Israel)",
              "The Palmach Special Forces"
            ]
          },
          {
            "id": "q_1_1_s6",
            "question": "Which extremist Jewish terrorist organisation bombed the British administrative headquarters in 1946?",
            "answer": "The Irgun",
            "explanation": "This right-wing paramilitary group believed that diplomacy had failed and that only armed force, sabotage, and acts of terror would force the British to abandon their control of Palestine.",
            "year": 1946,
            "distractors": [
              "The Haganah",
              "The Stern Gang",
              "The Jewish Agency Guard"
            ]
          },
          {
            "id": "q_1_1_s7",
            "question": "In which city was this bombed headquarters, the King David Hotel, located?",
            "answer": "Jerusalem",
            "explanation": "A city of profound religious significance, making its political status one of the most explosive issues, which is why the UN later proposed it be an international zone.",
            "year": 1946,
            "distractors": [
              "Tel Aviv",
              "Haifa",
              "Jaffa"
            ]
          },
          {
            "id": "q_1_1_s9",
            "question": "What was the name of the ship carrying 4,500 Jewish refugees that the British notoriously turned back in 1947?",
            "answer": "SS Exodus",
            "explanation": "The highly publicised image of Holocaust survivors being forced back to Europe by the British Royal Navy was a massive public relations disaster for Britain and significantly boosted global support for Zionism.",
            "year": 1947,
            "distractors": [
              "SS Exodus 1947",
              "SS Patria",
              "SS Struma"
            ]
          },
          {
            "id": "q_1_1_d2",
            "question": "What was the name of the 1937 British Commission that was the very first to recommend the partition of Palestine?",
            "answer": "The Peel Commission",
            "explanation": "The 1937 Peel Commission concluded that the mandate was fundamentally unworkable because the nationalist aspirations of the Arabs and Jews were entirely incompatible.",
            "year": 1937,
            "distractors": [
              "The Woodhead Commission",
              "The Anglo-American Committee",
              "The Morrison-Grady Plan"
            ]
          },
          {
            "id": "q_1_1_n6",
            "question": "In what year did the Arab population of Palestine launch a major revolt against British rule and Zionist immigration?",
            "answer": "1936",
            "explanation": "The Arab Revolt of 1936-39 was a major nationalist rebellion demanding independence and an end to Jewish immigration.",
            "year": 1936,
            "distractors": [
              "1920",
              "1929",
              "1945"
            ]
          },
          {
            "id": "q_1_1_n7",
            "question": "Which British policy document in 1939 severely limited Jewish immigration to 75,000 over five years?",
            "answer": "The 1939 White Paper",
            "explanation": "The Macdonald White Paper of 1939 sought to appease Arab opinion to secure oil access during the upcoming war, infuriating the Zionist movement.",
            "year": 1939,
            "distractors": [
              "The Peel Report",
              "The Balfour Statement",
              "The Woodhead Commission Report"
            ]
          },
          {
            "id": "q_1_1_n8",
            "question": "Which American President in 1945 urged the British government to immediately admit 100,000 Jewish refugees to Palestine?",
            "answer": "Harry S. Truman",
            "explanation": "President Truman faced strong domestic political pressure to support Holocaust survivors and strongly urged Britain to ease immigration limits.",
            "year": 1945,
            "distractors": [
              "Franklin D. Roosevelt",
              "Dwight D. Eisenhower",
              "John F. Kennedy"
            ]
          },
          {
            "id": "q_1_1_n9",
            "question": "What was the name of the special United Nations committee created in May 1947 to investigate Palestine?",
            "answer": "UNSCOP",
            "explanation": "The United Nations Special Committee on Palestine was formed in 1947 and recommended the partition of Palestine into two states.",
            "year": 1947,
            "distractors": [
              "UNRWA",
              "UNEF",
              "UNTSO"
            ]
          },
          {
            "id": "q_1_1_n10",
            "question": "Which global superpower was the first to recognize the newly declared State of Israel in May 1948?",
            "answer": "The USA",
            "explanation": "President Truman granted de facto recognition to the State of Israel just 11 minutes after it was declared on 14 May 1948.",
            "year": 1948,
            "distractors": [
              "The Soviet Union",
              "Great Britain",
              "France"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_1_1_s8",
            "question": "Exactly how many people died in the King David Hotel bombing?",
            "answer": "91 people",
            "explanation": "The victims included Arabs, Britons, and Jews; the sheer scale of the death toll and the resulting negative publicity permanently destroyed British public morale to maintain the Mandate.",
            "year": 1946,
            "distractors": [
              "50 people",
              "75 people",
              "120 people"
            ]
          },
          {
            "id": "q_1_1_d1",
            "question": "What was the name of the Austrian Jewish journalist who published The Jewish State in 1896, sparking the political Zionist movement?",
            "answer": "Theodor Herzl",
            "explanation": "As the visionary father of modern political Zionism, his writings successfully shifted the Jewish focus from a purely religious connection to the Holy Land toward a highly organised, secular political campaign.",
            "year": 1896,
            "distractors": [
              "Chaim Weizmann",
              "David Ben-Gurion",
              "Ze'ev Jabotinsky"
            ]
          },
          {
            "id": "q_1_1_d3",
            "question": "Who was the British Foreign Secretary immediately after the Second World War who heavily clashed with Zionists?",
            "answer": "Ernest Bevin",
            "explanation": "Ernest Bevin was determined to maintain good relations with the Arab world to secure British access to vital Middle Eastern oil, causing bitter conflict over refugee quotas.",
            "year": 1945,
            "distractors": [
              "Anthony Eden",
              "Arthur Balfour",
              "Clement Attlee"
            ]
          },
          {
            "id": "q_1_1_d4",
            "question": "Exactly what percentage of Palestinian land was allocated to the proposed Jewish state under the UN Resolution 181 partition plan?",
            "answer": "55 percent",
            "explanation": "Although Jews formed only about a third of the population, they were allocated the majority of the territory to provide enough space to absorb the anticipated influx of Holocaust survivors.",
            "year": 1947,
            "distractors": [
              "45 percent",
              "50 percent",
              "60 percent"
            ]
          },
          {
            "id": "q_1_1_d5",
            "question": "What is the specific Hebrew term for the Jewish agricultural communal farms that often acted as fortified defensive outposts?",
            "answer": "Kibbutz",
            "explanation": "These highly socialist, collective farming communities were crucial not only for agricultural development but also acted as strategic military outposts that delayed Arab advances in 1948.",
            "year": 1910,
            "distractors": [
              "Moshav",
              "Moshava",
              "Ulpan"
            ]
          },
          {
            "id": "q_1_1_d6",
            "question": "Which prominent Palestinian leader and Grand Mufti of Jerusalem led the Arab Higher Committee in opposing Jewish immigration during the British Mandate?",
            "answer": "Haj Amin al-Husseini",
            "explanation": "Haj Amin al-Husseini was the Grand Mufti of Jerusalem who became the main leader of Arab opposition to Zionism and British rule. He led the Arab Higher Committee during the 1936-39 Arab Revolt, fiercely fighting Jewish immigration.",
            "year": 1936,
            "distractors": [
              "Fawzi al-Qawuqji",
              "Musa al-Husayni",
              "Raghib al-Nashashibi"
            ]
          },
          {
            "id": "q_1_1_n11",
            "question": "In which Swiss city did Theodor Herzl organize the First Zionist Congress in 1897?",
            "answer": "Basel",
            "explanation": "The First Zionist Congress met in Basel in 1897, adopting the Basel Program which declared the goal of a Jewish homeland in Palestine.",
            "year": 1897,
            "distractors": [
              "Geneva",
              "Zurich",
              "Bern"
            ]
          },
          {
            "id": "q_1_1_n12",
            "question": "What was the monthly quota limit on Jewish immigration maintained by British Foreign Secretary Ernest Bevin in 1945?",
            "answer": "1,500 immigrants",
            "explanation": "Britain maintained a strict quota of 1,500 immigrants per month to avoid provoking Arab unrest, which Zionist groups fought with blockade-running ships.",
            "year": 1945,
            "distractors": [
              "500 immigrants",
              "3,000 immigrants",
              "5,000 immigrants"
            ]
          },
          {
            "id": "q_1_1_n13",
            "question": "Who was the commander of the right-wing Zionist paramilitary group, the Irgun, who ordered the King David Hotel bombing?",
            "answer": "Menachem Begin",
            "explanation": "Menachem Begin was the leader of the Irgun from 1944 to 1948 and later served as Prime Minister of Israel.",
            "year": 1946,
            "distractors": [
              "David Ben-Gurion",
              "Yitzhak Shamir",
              "Moshe Dayan"
            ]
          },
          {
            "id": "q_1_1_n14",
            "question": "What was the specific Hebrew term used for the illegal immigration organized by Zionist groups during the British blockade?",
            "answer": "Aliyah Bet",
            "explanation": "Aliyah Bet was the code name given to illegal immigration into Mandatory Palestine between 1934 and 1948 in defiance of British White Papers.",
            "year": 1939,
            "distractors": [
              "Kibbutzim",
              "Haganah",
              "Yishuv"
            ]
          }
        ]
      },
      {
        "id": "subtopic_1_2",
        "embedVideo": "https://youtu.be/fXk_n_ww6GU",
        "title": "Topic 1.2: Aftermath of the 1948-49 war",
        "easy": [
          {
            "id": "q_1_2_s1",
            "question": "Which Arab country annexed the West Bank and East Jerusalem following the 1948-49 war?",
            "answer": "Jordan",
            "explanation": "King Abdullah formally annexed the territory in 1950 and granted Jordanian citizenship to its Palestinian residents, a move that angered other Arab nations.",
            "year": 1950,
            "distractors": [
              "Syria",
              "Egypt",
              "Lebanon"
            ]
          },
          {
            "id": "q_1_2_s2",
            "question": "Which Arab country took military control over the Gaza Strip?",
            "answer": "Egypt",
            "explanation": "Unlike Jordan, Egypt did not annex the territory but retained it under a strict military administration, leaving the Palestinians there as stateless refugees.",
            "year": 1949,
            "distractors": [
              "Jordan",
              "Syria",
              "Saudi Arabia"
            ]
          },
          {
            "id": "q_1_2_s3",
            "question": "What colour was used to describe the 1949 armistice lines that formed Israel's new borders?",
            "answer": "The Green Line",
            "explanation": "These armistice lines constituted Israel's de facto borders with its Arab neighbours from 1949 until they were shattered during the June War of 1967.",
            "year": 1949,
            "distractors": [
              "The Red Line",
              "The Blue Line",
              "The Purple Line"
            ]
          },
          {
            "id": "q_1_2_s4",
            "question": "What Arabic phrase, meaning 'the catastrophe', do Palestinians use to describe their mass displacement in the 1948 war?",
            "answer": "Al-Nakba",
            "explanation": "This term encapsulates not just the military defeat, but the permanent loss of the Palestinian homeland and the fragmentation of their society.",
            "year": 1948,
            "distractors": [
              "Al-Naksa",
              "Al-Intifada",
              "Al-Thawra"
            ]
          },
          {
            "id": "q_1_2_s9",
            "question": "What 1950 Law gave any Jew worldwide the right to Israeli citizenship?",
            "answer": "The Law of Return",
            "explanation": "The Law of Return was the ultimate fulfilment of the Zionist dream, legally enshrining Israel as the homeland for the global Jewish diaspora and ensuring a rapid demographic expansion.",
            "year": 1950,
            "distractors": [
              "The Law of Citizenship",
              "The Right of Return Act",
              "The Nationality Declaration"
            ]
          },
          {
            "id": "q_1_2_n1",
            "question": "What is the name of the Israeli parliament established in 1949?",
            "answer": "The Knesset",
            "explanation": "The Knesset was established after the first elections in January 1949, serving as the unicameral national legislature.",
            "year": 1949,
            "distractors": [
              "The Senate",
              "The Assembly",
              "The Sanhedrin"
            ]
          },
          {
            "id": "q_1_2_n2",
            "question": "Who was elected as the first President of the State of Israel in 1949?",
            "answer": "Chaim Weizmann",
            "explanation": "Chaim Weizmann, a prominent Zionist diplomat and chemist, was elected by the Knesset as Israel's first President, a ceremonial role.",
            "year": 1949,
            "distractors": [
              "David Ben-Gurion",
              "Theodor Herzl",
              "Moshe Sharett"
            ]
          },
          {
            "id": "q_1_2_n3",
            "question": "In which year did the first Arab-Israeli War officially end with armistice agreements?",
            "answer": "1949",
            "explanation": "Israel signed separate armistice agreements with Egypt, Lebanon, Jordan, and Syria between February and July 1949.",
            "year": 1949,
            "distractors": [
              "1948",
              "1950",
              "1952"
            ]
          },
          {
            "id": "q_1_2_n4",
            "question": "What is the term for the global dispersion of the Jewish people from their ancestral homeland?",
            "answer": "The Diaspora",
            "explanation": "The Diaspora refers to the communities of Jewish people living outside the Land of Israel, scattered across the world.",
            "year": 1948,
            "distractors": [
              "Zionism",
              "Aliyah",
              "Kibbutz"
            ]
          },
          {
            "id": "q_1_2_n5",
            "question": "What currency was introduced in Israel in 1952, replacing the Palestine Pound?",
            "answer": "The Israeli Pound (Lira)",
            "explanation": "The Israeli Lira (or Pound) was introduced in 1952 to establish economic sovereignty separate from British currency systems.",
            "year": 1952,
            "distractors": [
              "The Shekel",
              "The Dollar",
              "The Dinar"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_1_2_s5",
            "question": "Exactly how many Palestinian Arabs fled or were driven from their homes?",
            "answer": "Over 700,000",
            "explanation": "Approximately 700,000 to 750,000 Palestinians became refugees, representing the vast majority of the Arab population that had lived in the territory that became Israel.",
            "year": 1948,
            "distractors": [
              "Over 500,000",
              "Over 900,000",
              "Over 1,000,000"
            ]
          },
          {
            "id": "q_1_2_s6",
            "question": "What is the acronym of the UN agency created in December 1949 to provide camps and relief for these refugees?",
            "answer": "UNRWA",
            "explanation": "The United Nations Relief and Works Agency became a permanent fixture providing food, shelter, and education as the conflict dragged on.",
            "year": 1949,
            "distractors": [
              "UNHCR",
              "UNICEF",
              "UNDP"
            ]
          },
          {
            "id": "q_1_2_s7",
            "question": "What is the name of the new unified national army created by David Ben-Gurion during the war?",
            "answer": "Israeli Defence Forces (IDF)",
            "explanation": "The Israeli Defence Forces were formed in May 1948 when Ben-Gurion unified the Haganah and smaller militant groups, ensuring the government had total control over a single military.",
            "year": 1948,
            "distractors": [
              "The Haganah Corps",
              "The Israeli National Army (INA)",
              "The Palmach Units"
            ]
          },
          {
            "id": "q_1_2_s8",
            "question": "To build up its military strength, what mandatory service did Israel introduce for all 18-year-old men and women?",
            "answer": "Compulsory conscription",
            "explanation": "By requiring men and women to serve and maintaining a lifelong reserve duty, Israel turned almost its entire adult population into a rapid-response military force.",
            "year": 1948,
            "distractors": [
              "National volunteer service",
              "Civilian reserve training",
              "Border guard mobilization"
            ]
          },
          {
            "id": "q_1_2_s10",
            "question": "What is the Arabic name for the Palestinian guerrilla fighters who launched raids into Israel from Egyptian-controlled Gaza?",
            "answer": "Fedayeen",
            "explanation": "Translating to 'those who sacrifice themselves', these fighters were viewed as terrorists by Israelis, but celebrated as resistance heroes across the Arab world.",
            "year": 1950,
            "distractors": [
              "Mujahideen",
              "Fatah",
              "Intifadists"
            ]
          },
          {
            "id": "q_1_2_n6",
            "question": "Which UN diplomat negotiated the 1949 armistice agreements after the assassination of Count Folke Bernadotte?",
            "answer": "Ralph Bunche",
            "explanation": "Ralph Bunche served as the acting mediator and successfully brokered the armistices, winning the Nobel Peace Prize for his efforts.",
            "year": 1949,
            "distractors": [
              "Trygve Lie",
              "Dag Hammarskjöld",
              "Gunnar Jarring"
            ]
          },
          {
            "id": "q_1_2_n7",
            "question": "In which month and year did the Knesset pass the Law of Return?",
            "answer": "July 1950",
            "explanation": "The Law of Return was passed on 5 July 1950, declaring that every Jew has the right to immigrate to Israel.",
            "year": 1950,
            "distractors": [
              "May 1948",
              "January 1949",
              "December 1952"
            ]
          },
          {
            "id": "q_1_2_n8",
            "question": "What was the name of the economic austerity policy of rationing introduced in Israel in 1949 to manage the influx of immigrants?",
            "answer": "Tzena",
            "explanation": "Tzena was a policy of strict economic austerity and food rationing introduced to ensure the survival of the state during massive immigration.",
            "year": 1949,
            "distractors": [
              "Kibbutz",
              "Histadrut",
              "Austerity Accord"
            ]
          },
          {
            "id": "q_1_2_n9",
            "question": "Which European nation signed the historic Reparations Agreement with Israel in September 1952?",
            "answer": "West Germany",
            "explanation": "Chancellor Konrad Adenauer of West Germany signed the agreement to pay reparations to Israel for the Holocaust, aiding Israel's early economy.",
            "year": 1952,
            "distractors": [
              "East Germany",
              "Great Britain",
              "France"
            ]
          },
          {
            "id": "q_1_2_n10",
            "question": "In which month and year did Israel sign the final armistice of the 1948-49 war, with Syria?",
            "answer": "July 1949",
            "explanation": "The final armistice agreement of the war was signed with Syria on 20 July 1949, concluding the formal fighting.",
            "year": 1949,
            "distractors": [
              "February 1949",
              "May 1948",
              "December 1949"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_1_2_d1",
            "question": "What was the specific military codename for the severe Israeli reprisal attack on the Egyptian army headquarters in Gaza on 28 February 1955?",
            "answer": "Operation Black Arrow",
            "explanation": "Operation Black Arrow was a massive turning point in Egyptian-Israeli relations, convincing Nasser that Egypt's military was too weak and prompting the Czech arms deal.",
            "year": 1955,
            "distractors": [
              "Operation Olive Leaves",
              "Operation Sinai Shield",
              "Operation Sinai Counter-Strike"
            ]
          },
          {
            "id": "q_1_2_d2",
            "question": "Who was the Israeli commander of the Paratroopers Brigade that led this 1955 attack on Gaza, and who later became a highly controversial political figure?",
            "answer": "Ariel Sharon",
            "explanation": "Ariel Sharon's aggressive leadership established his reputation as a ruthless tactician, foreshadowing his later role in the 1982 invasion of Lebanon.",
            "year": 1955,
            "distractors": [
              "Moshe Dayan",
              "Yitzhak Rabin",
              "Ezer Weizman"
            ]
          },
          {
            "id": "q_1_2_d3",
            "question": "What was the name of the Israeli southern port that was economically strangled by Egypt's blockade of the Straits of Tiran?",
            "answer": "Eilat",
            "explanation": "Because it was Israel's only gateway to the Red Sea, the economic strangulation of Eilat cut Israel off from vital trade routes to Asia and East Africa.",
            "year": 1949,
            "distractors": [
              "Haifa",
              "Ashdod",
              "Tel Aviv"
            ]
          },
          {
            "id": "q_1_2_d4",
            "question": "Who was the Egyptian King overthrown in 1952, partly because of the army's anger over his failures in the 1948 war?",
            "answer": "King Farouk",
            "explanation": "The humiliating defeat deeply shamed the Egyptian military, prompting a group of 'Free Officers' to launch a revolution that paved the way for Nasser's rise to power.",
            "year": 1952,
            "distractors": [
              "King Fuad II",
              "King Hussein",
              "King Faisal II"
            ]
          },
          {
            "id": "q_1_2_d5",
            "question": "What was the name of the 1952 financial agreement in which West Germany agreed to pay compensation to Israel for the Holocaust?",
            "answer": "The Reparations Agreement",
            "explanation": "The Reparations Agreement provided Israel with hundreds of millions of dollars in vital foreign currency and equipment, essential for absorbing massive immigration.",
            "year": 1952,
            "distractors": [
              "The West German Compensation Pact",
              "The Geneva Restitution Treaty",
              "The Holocaust Reconciliation Accord"
            ]
          },
          {
            "id": "q_1_2_d6",
            "question": "Which UN mediator, dispatched to negotiate a peace settlement during the 1948 Arab-Israeli War, was assassinated in Jerusalem by the extremist Jewish Stern Gang?",
            "answer": "Count Folke Bernadotte",
            "explanation": "Count Folke Bernadotte of Sweden was appointed by the UN Security Council as the mediator. He successfully arranged two truces but was shot in September 1948 by members of Lehi (the Stern Gang) who feared his peace plan would hand Jerusalem to Jordan.",
            "year": 1948,
            "distractors": [
              "Lord Moyne",
              "Sir Harold MacMichael",
              "Ralph Bunche"
            ]
          },
          {
            "id": "q_1_2_n11",
            "question": "Exactly how much financial aid did the US government extend to Israel in its first Export-Import Bank loan in early 1949?",
            "answer": "$100 million",
            "explanation": "The US granted a vital $100 million credit loan to Israel in early 1949, which was part of wider US aid that ultimately totaled $300 million in grants to support and house the new Jewish immigrants, preventing the Israeli economy from collapsing.",
            "year": 1949,
            "distractors": [
              "$25 million",
              "$50 million",
              "$250 million"
            ]
          },
          {
            "id": "q_1_2_n12",
            "question": "Which Arab monarch was assassinated in Jerusalem in 1951, partly due to anger over his annexation of the West Bank?",
            "answer": "King Abdullah I of Jordan",
            "explanation": "King Abdullah of Jordan was shot at the Al-Aqsa Mosque by a Palestinian nationalist who feared he was negotiating a peace treaty with Israel.",
            "year": 1951,
            "distractors": [
              "King Farouk of Egypt",
              "King Faisal of Iraq",
              "King Hussein of Jordan"
            ]
          },
          {
            "id": "q_1_2_n13",
            "question": "Under the 1949 armistice agreements, which nation took control of the Gaza Strip, though they did not annex it?",
            "answer": "Egypt",
            "explanation": "Egypt took administrative and military control of Gaza, keeping the borders closed and leaving Palestinian refugees stateless.",
            "year": 1949,
            "distractors": [
              "Jordan",
              "Syria",
              "Israel"
            ]
          },
          {
            "id": "q_1_2_n14",
            "question": "Which Zionist militant faction carried out the assassination of UN mediator Count Folke Bernadotte in September 1948?",
            "answer": "The Stern Gang (Lehi)",
            "explanation": "Lehi (the Stern Gang) assassinated Bernadotte because they feared his peace plan would force Israel to give up Jerusalem and parts of the Negev.",
            "year": 1948,
            "distractors": [
              "The Irgun",
              "The Haganah",
              "The Palmach"
            ]
          }
        ]
      },
      {
        "id": "subtopic_1_3",
        "embedVideo": "https://youtu.be/PnZ2tG_PYpc",
        "title": "Topic 1.3: Increased tension, 1955-63",
        "easy": [
          {
            "id": "q_1_3_s1",
            "question": "Who is the Egyptian leader who became President in 1954 and championed Arab nationalism?",
            "answer": "Gamal Abdel Nasser",
            "explanation": "Gamal Abdel Nasser's charismatic leadership transformed Egypt into the dominant power in the Middle East, challenging both Israeli security and Western imperialism.",
            "year": 1954,
            "distractors": [
              "Muhammad Naguib",
              "Anwar Sadat",
              "Hosni Mubarak"
            ]
          },
          {
            "id": "q_1_3_s2",
            "question": "What specific political ideology did this leader promote to unite Arabic-speaking nations against Western influence and Israel?",
            "answer": "Pan-Arabism",
            "explanation": "This movement sought to politically and economically unify the Arab world, presenting a severe strategic threat to Israel by attempting to surround it.",
            "year": 1954,
            "distractors": [
              "Arab Socialism",
              "Islamic Solidarity",
              "Levantine Coalitionism"
            ]
          },
          {
            "id": "q_1_3_s5",
            "question": "What major infrastructure project did Egypt plan to build on the River Nile to control flooding and provide hydroelectric power?",
            "answer": "The Aswan High Dam",
            "explanation": "The Aswan High Dam was Nasser's flagship domestic project, intended to modernize the Egyptian economy and alleviate poverty.",
            "year": 1955,
            "distractors": [
              "The Aswan Low Dam",
              "The Nile Delta Hydroelectric Plant",
              "The Lake Nasser Irrigation Project"
            ]
          },
          {
            "id": "q_1_3_s7",
            "question": "In retaliation for this withdrawn funding, what vital waterway did the Egyptian President nationalize in July 1956?",
            "answer": "The Suez Canal",
            "explanation": "By nationalising the canal to use its toll revenues, Nasser struck a massive blow against British and French imperial pride and their oil supply routes.",
            "year": 1956,
            "distractors": [
              "The Straits of Tiran",
              "The Gulf of Aqaba",
              "The River Nile Outlet"
            ]
          },
          {
            "id": "q_1_3_s9",
            "question": "On 29 October 1956, Israel invaded which Egyptian territory as the first stage of this secret military plan?",
            "answer": "The Sinai Peninsula",
            "explanation": "The IDF's rapid and stunning conquest of the Sinai Peninsula proved their military superiority, allowing them to destroy Fedayeen guerrilla bases.",
            "year": 1956,
            "distractors": [
              "The Gaza Strip",
              "The West Bank",
              "The Golan Heights"
            ]
          },
          {
            "id": "q_1_3_n1",
            "question": "Which vital Egyptian canal did President Nasser nationalize in July 1956?",
            "answer": "The Suez Canal",
            "explanation": "Nasser nationalised the British-and-French-owned Suez Canal to use its revenues to fund the construction of the Aswan High Dam.",
            "year": 1956,
            "distractors": [
              "The Corinth Canal",
              "The Panama Canal",
              "The Nile Canal"
            ]
          },
          {
            "id": "q_1_3_n2",
            "question": "In which year did the Suez Crisis (Sinai Campaign) take place?",
            "answer": "1956",
            "explanation": "The Suez Crisis occurred in October-November 1956, involving a joint Israeli, British, and French military campaign against Egypt.",
            "year": 1956,
            "distractors": [
              "1948",
              "1954",
              "1967"
            ]
          },
          {
            "id": "q_1_3_n3",
            "question": "Which two European powers invaded Egypt in 1956 alongside Israel?",
            "answer": "Britain and France",
            "explanation": "Britain and France colluded with Israel to regain control of the Suez Canal and depose President Nasser.",
            "year": 1956,
            "distractors": [
              "The USA and USSR",
              "Italy and Greece",
              "West Germany and Belgium"
            ]
          },
          {
            "id": "q_1_3_n4",
            "question": "Who was the British Prime Minister during the 1956 Suez Crisis who was forced to resign due to the political fallout?",
            "answer": "Anthony Eden",
            "explanation": "Anthony Eden's reputation was destroyed by the Suez Crisis, leading to his resignation in January 1957.",
            "year": 1956,
            "distractors": [
              "Winston Churchill",
              "Harold Macmillan",
              "Clement Attlee"
            ]
          },
          {
            "id": "q_1_3_n5",
            "question": "Who was the President of the United States who forced Britain, France, and Israel to withdraw from Egypt by threatening economic sanctions?",
            "answer": "Dwight D. Eisenhower",
            "explanation": "President Eisenhower was furious about the invasion and used US financial leverage (threatening to sell British sterling bonds) to halt the war.",
            "year": 1956,
            "distractors": [
              "Harry S. Truman",
              "John F. Kennedy",
              "Lyndon B. Johnson"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_1_3_s3",
            "question": "In February 1955, the Israeli army launched a massive retaliation raid against the Egyptian military headquarters in which territory?",
            "answer": "Gaza",
            "explanation": "On 28 February 1955, the severe IDF surprise attack on an Egyptian base in Gaza killed 38 Egyptian soldiers, a deep humiliation that exposed military weakness and convinced Nasser to sign the Czech Arms Deal.",
            "year": 1955,
            "distractors": [
              "The Sinai Peninsula",
              "The West Bank",
              "The Golan Heights"
            ]
          },
          {
            "id": "q_1_3_s4",
            "question": "From which Eastern Bloc country did Egypt sign a massive arms deal in September 1955 to bypass Western arms embargoes?",
            "answer": "Czechoslovakia",
            "explanation": "Acting as a proxy for the Soviet Union, Czechoslovakia provided Egypt with advanced jet fighters and tanks, fundamentally shifting the balance of military power.",
            "year": 1955,
            "distractors": [
              "Poland",
              "Hungary",
              "East Germany"
            ]
          },
          {
            "id": "q_1_3_s6",
            "question": "Which global superpower famously withdrew its offer to fund this dam in July 1956 due to Egypt's growing ties with the Communist bloc?",
            "answer": "The USA",
            "explanation": "President Eisenhower withdrew the loan offer to punish Nasser for buying Soviet arms, demonstrating how Middle Eastern nations were used in Cold War rivalries.",
            "year": 1956,
            "distractors": [
              "Great Britain",
              "France",
              "The Soviet Union"
            ]
          },
          {
            "id": "q_1_3_s10",
            "question": "What acronym represents the United Nations peacekeeping force stationed on the Egyptian-Israeli border after the crisis?",
            "answer": "UNEF (United Nations Emergency Force)",
            "explanation": "The United Nations Emergency Force successfully acted as a buffer between Israel and Egypt, providing Israel with a decade of secure southern borders.",
            "year": 1956,
            "distractors": [
              "UNIFIL (United Nations Interim Force in Lebanon)",
              "UNTSO (United Nations Truce Supervision Organization)",
              "UNRWA (United Nations Relief and Works Agency)"
            ]
          },
          {
            "id": "q_1_3_d3",
            "question": "What is the specific name of the Egyptian town located at the extreme southern tip of the Sinai Peninsula, captured by Israel in 1956 to break the naval blockade?",
            "answer": "Sharm el-Sheikh",
            "explanation": "Controlling this heavily fortified outpost was the only way to dominate the narrow Straits of Tiran, making its capture the ultimate strategic prize.",
            "year": 1956,
            "distractors": [
              "El Arish",
              "Taba",
              "Ras Sudr"
            ]
          },
          {
            "id": "q_1_3_n6",
            "question": "What was the name of the political union formed between Egypt and Syria in 1958?",
            "answer": "The United Arab Republic (UAR)",
            "explanation": "The UAR was formed in 1958 at the height of Pan-Arabism, creating fears of encirclement in Israel before dissolving in 1961.",
            "year": 1958,
            "distractors": [
              "The Arab League Federation",
              "The United Arab Emirates",
              "The Pan-Arab Coalition"
            ]
          },
          {
            "id": "q_1_3_n7",
            "question": "Which Israeli Chief of Staff led the IDF forces during the 1956 Sinai invasion?",
            "answer": "Moshe Dayan",
            "explanation": "Moshe Dayan planned and led the swift armored campaign across the Sinai Peninsula, cementing his military reputation.",
            "year": 1956,
            "distractors": [
              "Yitzhak Rabin",
              "Ariel Sharon",
              "David Elazar"
            ]
          },
          {
            "id": "q_1_3_n8",
            "question": "Who was the Soviet Premier who threatened rocket strikes on London and Paris during the 1956 Suez Crisis?",
            "answer": "Nikita Khrushchev",
            "explanation": "Premier Khrushchev threatened military action to boost Soviet prestige in the Middle East and divert attention from the Hungarian Uprising.",
            "year": 1956,
            "distractors": [
              "Joseph Stalin",
              "Leonid Brezhnev",
              "Mikhail Gorbachev"
            ]
          },
          {
            "id": "q_1_3_n9",
            "question": "In what year did Syria launch a military coup and withdraw from the United Arab Republic, ending the union with Egypt?",
            "answer": "1961",
            "explanation": "Syria withdrew from the UAR in 1961 due to resentment over Egyptian dominance of their military and economy.",
            "year": 1961,
            "distractors": [
              "1958",
              "1960",
              "1963"
            ]
          },
          {
            "id": "q_1_3_n10",
            "question": "What was the name of the UN peacekeeping force deployed to the Sinai border after the 1956 Suez Crisis?",
            "answer": "UNEF",
            "explanation": "The United Nations Emergency Force (UNEF) acted as a buffer between Israel and Egypt, securing shipping rights in the Straits of Tiran.",
            "year": 1956,
            "distractors": [
              "UNIFIL",
              "UNTSO",
              "UNRWA"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_1_3_s8",
            "question": "What is the name of the secret agreement signed in October 1956 between Britain, France, and Israel to collude against Egypt?",
            "answer": "Protocol of Sèvres",
            "explanation": "The Protocol of Sèvres planned for Israel to invade Egypt, providing Britain and France with a manufactured 'excuse' to intervene militarily to seize the canal.",
            "year": 1956,
            "distractors": [
              "Paris Collusion Agreement",
              "London Canal Accord",
              "Sinai Tripartite Pact"
            ]
          },
          {
            "id": "q_1_3_d1",
            "question": "What was the specific operational codename for the devastating Israeli attack on Syrian outposts near the Sea of Galilee in December 1955?",
            "answer": "Operation Kinneret (Olive Leaves)",
            "explanation": "Operation Kinneret was intended to stop Syrian troops firing on Israeli fishermen, but the ferocity of the attack pushed Syria closer to Egypt.",
            "year": 1955,
            "distractors": [
              "Operation Black Arrow",
              "Operation Galilee Storm",
              "Operation Sea of Galilee Patrol"
            ]
          },
          {
            "id": "q_1_3_d2",
            "question": "Who was the moderate Israeli Prime Minister who preferred diplomacy but was overruled by hardliners in 1954-55?",
            "answer": "Moshe Sharett",
            "explanation": "Moshe Sharett's tenure was marked by a constant struggle against the aggressive, retaliatory defence policies championed by Moshe Dayan and David Ben-Gurion.",
            "year": 1954,
            "distractors": [
              "David Ben-Gurion",
              "Pinhas Lavon",
              "Levi Eshkol"
            ]
          },
          {
            "id": "q_1_3_d4",
            "question": "What was the official Israeli military codename for their invasion of the Sinai Peninsula in October 1956?",
            "answer": "Operation Kadesh",
            "explanation": "Named after the biblical oasis, Operation Kadesh relied heavily on rapid armored thrusts and paratroop drops to overwhelm Egyptian forces.",
            "year": 1956,
            "distractors": [
              "Operation Focus",
              "Operation Sinai Storm",
              "Operation Sinai Shield"
            ]
          },
          {
            "id": "q_1_3_d5",
            "question": "Under the secret Protocol of Sèvres, what specific diplomatic mechanism were Britain and France going to use as a false pretext to invade?",
            "answer": "An Anglo-French ultimatum",
            "explanation": "Britain and France issued a pre-planned 'ultimatum' demanding both sides withdraw from the canal, knowing Egypt would refuse on its own territory.",
            "year": 1956,
            "distractors": [
              "An appeal to the United Nations Security Council",
              "A formal declaration of war against Egypt",
              "A joint military mobilization in North Africa"
            ]
          },
          {
            "id": "q_1_3_n11",
            "question": "Under the secret Protocol of Sèvres (1956), exactly how many hours after the Israeli invasion were Britain and France to issue their pre-planned ultimatum?",
            "answer": "36 hours",
            "explanation": "The protocol planned for Britain and France to issue an ultimatum to both sides 36 hours after the Israeli attack to justify their intervention.",
            "year": 1956,
            "distractors": [
              "12 hours",
              "24 hours",
              "48 hours"
            ]
          },
          {
            "id": "q_1_3_n12",
            "question": "In which month and year did Egypt sign the Czech Arms Deal, bringing Soviet weapons into the Middle East?",
            "answer": "September 1955",
            "explanation": "Egypt signed the arms deal in September 1955, bypassing Western restrictions and alarming Israel with modern Soviet tanks and MiGs.",
            "year": 1955,
            "distractors": [
              "February 1955",
              "July 1956",
              "October 1956"
            ]
          },
          {
            "id": "q_1_3_n13",
            "question": "Who was the French Prime Minister who strongly supported the alliance with Israel and signed the Protocol of Sèvres in 1956?",
            "answer": "Guy Mollet",
            "explanation": "Guy Mollet was the French PM who believed Nasser was supporting Algerian rebels and agreed to the secret collusion.",
            "year": 1956,
            "distractors": [
              "Charles de Gaulle",
              "Pierre Mendès France",
              "Georges Pompidou"
            ]
          },
          {
            "id": "q_1_3_n14",
            "question": "What is the name of the secret French villa where British, French, and Israeli envoys met to sign the Protocol of Sèvres in October 1956?",
            "answer": "Sèvres",
            "explanation": "The meetings were held secretly at a private villa in Sèvres, a suburb of Paris, resulting in a signed tripartite agreement.",
            "year": 1956,
            "distractors": [
              "Versailles",
              "Rambouillet",
              "Fontainebleau"
            ]
          },
          {
            "id": "q_1_3_n15",
            "question": "Which Syrian President signed the 1958 treaty of union with Egypt to form the United Arab Republic?",
            "answer": "Shukri al-Quwatli",
            "explanation": "Shukri al-Quwatli was the President of Syria who co-declared the union with Nasser in Cairo.",
            "year": 1958,
            "distractors": [
              "Hafez al-Assad",
              "Adib Shishakli",
              "Amin al-Hafiz"
            ]
          },
          {
            "id": "q_1_3_n16",
            "question": "Which British-and-American-led security alliance of 1955 did Egypt's President Nasser fiercely oppose and refuse to join?",
            "answer": "The Baghdad Pact",
            "explanation": "Nasser saw the Baghdad Pact of 1955 as a Western imperialist attempt to keep Arab nations weak, divided, and subservient to foreign interests, and his opposition boosted his Pan-Arab popularity.",
            "year": 1955,
            "distractors": [
              "The Warsaw Pact",
              "The Cairo Treaty Organization",
              "The Suez Canal Defense League"
            ]
          },
          {
            "id": "q_1_3_n17",
            "question": "What was the operational codename for the major Israeli border raid in November 1955 targeting fortified Egyptian positions at Sabha?",
            "answer": "Operation Volcano",
            "explanation": "Launched in November 1955, Operation Volcano was a response to Egyptian incursions, targeting positions at Sabha and resulting in over 70 Egyptian casualties, demonstrating the IDF's tactical superiority.",
            "year": 1955,
            "distractors": [
              "Operation Black Arrow",
              "Operation Kadesh",
              "Operation Kinneret"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "topic_2",
    "title": "Key Topic 2: The escalating conflict, 1964-73",
    "subtopics": [
      {
        "id": "subtopic_2_1",
        "embedVideo": "https://youtu.be/W7KFi6ZmZdU",
        "title": "Topic 2.1: The Six Day War, 1967",
        "easy": [
          {
            "id": "q_2_1_s2",
            "question": "What umbrella organisation was set up in 1964 to unite the Palestinian people?",
            "answer": "The PLO (Palestine Liberation Organisation)",
            "explanation": "The Palestine Liberation Organisation quickly became an umbrella for various independent guerrilla groups dedicated to armed struggle.",
            "year": 1964,
            "distractors": [
              "The PNA (Palestinian National Authority)",
              "The PNC (Palestinian National Council)",
              "The PA (Palestinian Authority)"
            ]
          },
          {
            "id": "q_2_1_s3",
            "question": "What is the name of the Palestinian guerrilla group, founded by Yasser Arafat, that began raiding Israel in 1965?",
            "answer": "Fatah",
            "explanation": "Believing in using guerrilla warfare and sabotage against Israeli infrastructure, Fatah launched over 100 raids between 1965 and 1967.",
            "year": 1965,
            "distractors": [
              "The PFLP (Popular Front for the Liberation of Palestine)",
              "The Black September Organization",
              "Hamas"
            ]
          },
          {
            "id": "q_2_1_s8",
            "question": "Which narrow waterway did Egypt blockade on 22 May 1967, cutting off Israel's vital trade route to the Red Sea?",
            "answer": "The Straits of Tiran",
            "explanation": "Nesser's closure of the Straits of Tiran cut off Israel's oil supply; Israel had explicitly warned that blockading this waterway would be treated as an act of war.",
            "year": 1967,
            "distractors": [
              "The Suez Canal",
              "The Straits of Gibraltar",
              "The Bab-el-Mandeb Strait"
            ]
          },
          {
            "id": "q_2_1_s9",
            "question": "What tactical advantage was crucial to the success of the initial Israeli attack on 5 June 1967?",
            "answer": "Total surprise",
            "explanation": "By attacking at 7:45 AM while Egyptian pilots were eating breakfast, Israel achieved total tactical surprise, destroying the Arab air forces within hours.",
            "year": 1967,
            "distractors": [
              "Numerical superiority",
              "Technological supremacy",
              "Heavy artillery firepower"
            ]
          },
          {
            "id": "q_2_1_s10",
            "question": "What type of pre-emptive attack did Israel use to destroy the Egyptian air force on the ground?",
            "answer": "A pre-emptive airstrike",
            "explanation": "This devastating pre-emptive strike gave the IDF total air superiority, leaving Arab ground troops completely defenseless.",
            "year": 1967,
            "distractors": [
              "A naval blockade",
              "A parachute drop behind enemy lines",
              "A massive border tank charge"
            ]
          },
          {
            "id": "q_2_1_n1",
            "question": "In which year did the Six Day War break out?",
            "answer": "1967",
            "explanation": "The Six Day War began on 5 June 1967, transforming the Middle East and redrawing borders.",
            "year": 1967,
            "distractors": [
              "1956",
              "1970",
              "1973"
            ]
          },
          {
            "id": "q_2_1_n2",
            "question": "Who was the leader of Egypt during the 1967 Six Day War?",
            "answer": "Gamal Abdel Nasser",
            "explanation": "Nasser was the President of Egypt who mobilised forces and blockaded the Straits of Tiran, prompting the Israeli strike.",
            "year": 1967,
            "distractors": [
              "Anwar Sadat",
              "Hosni Mubarak",
              "Muhammad Naguib"
            ]
          },
          {
            "id": "q_2_1_n3",
            "question": "Who was the famous one-eyed Israeli Defence Minister during the 1967 Six Day War?",
            "answer": "Moshe Dayan",
            "explanation": "Moshe Dayan was appointed Defence Minister just days before the war, coordinating the military strategies.",
            "year": 1967,
            "distractors": [
              "Yitzhak Rabin",
              "Ariel Sharon",
              "David Elazar"
            ]
          },
          {
            "id": "q_2_1_n4",
            "question": "Which holy city did Israel capture from Jordan during the Six Day War, annexing its eastern sector?",
            "answer": "Jerusalem",
            "explanation": "Israel captured East Jerusalem and the entire West Bank by 7 June 1967, reunifying the city under Israeli sovereignty.",
            "year": 1967,
            "distractors": [
              "Tel Aviv",
              "Hebron",
              "Amman"
            ]
          },
          {
            "id": "q_2_1_n5",
            "question": "Exactly how many days did the 1967 war between Israel and Arab coalition states last?",
            "answer": "Six days",
            "explanation": "The war lasted from 5 June to 10 June 1967, ending in a crushing victory for Israel.",
            "year": 1967,
            "distractors": [
              "Four days",
              "Ten days",
              "Eighteen days"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_2_1_s1",
            "question": "What was the location of the 1964 Arab League Conference that officially set an anti-Israel agenda?",
            "answer": "Cairo",
            "explanation": "The 1964 conference marked a turning point where Arab leaders officially sponsored Palestinian nationalism and agreed on a unified military strategy.",
            "year": 1964,
            "distractors": [
              "Damascus",
              "Amman",
              "Beirut"
            ]
          },
          {
            "id": "q_2_1_s4",
            "question": "The diversion of which vital river by Syria and Lebanon caused major border tensions with Israel?",
            "answer": "The River Jordan",
            "explanation": "The Headwater Diversion Plan threatened to cut off Israel's fresh water supply, prompting Israel to use airstrikes to destroy the engineering works.",
            "year": 1964,
            "distractors": [
              "The River Litani",
              "The Yarmouk River",
              "The Euphrates River"
            ]
          },
          {
            "id": "q_2_1_s5",
            "question": "What was the name of the West Bank village where the IDF launched a massive, destructive reprisal raid in November 1966?",
            "answer": "Samu",
            "explanation": "On 13 November 1966, the IDF launched a massive raid on the village of Samu in retaliation for a Fatah landmine, clashing with the Jordanian army, destroying dozens of houses, and killing 15 Jordanian soldiers. This humiliated King Hussein and drew international condemnation.",
            "year": 1966,
            "distractors": [
              "Qibya",
              "Karamah",
              "Jenin"
            ]
          },
          {
            "id": "q_2_1_s6",
            "question": "What type of Soviet-made fighter jets did Israel shoot down six of over Damascus on 7 April 1967?",
            "answer": "Syrian MiGs",
            "explanation": "Humiliated by the loss of six MiG-21 fighter jets on 7 April 1967 and the Israeli planes flying low over Damascus, Syria demanded that Egypt honor their mutual defense pact.",
            "year": 1967,
            "distractors": [
              "Egyptian MiGs",
              "Jordanian Hunters",
              "Soviet Sukhois"
            ]
          },
          {
            "id": "q_2_1_s7",
            "question": "In May 1967, which global superpower deliberately gave Egypt false intelligence claiming Israel was massing troops?",
            "answer": "The USSR (Soviet Union)",
            "explanation": "On 13 May 1967, the Soviet Union falsely warned Egypt that Israel was massing troops on the Syrian border, which prompted Nasser to mobilize his forces in the Sinai on 15 May.",
            "year": 1967,
            "distractors": [
              "Syria",
              "Jordan",
              "Great Britain"
            ]
          },
          {
            "id": "q_2_1_n6",
            "question": "What is the name of the strategic Syrian plateau captured by Israel in the final two days of the Six Day War?",
            "answer": "The Golan Heights",
            "explanation": "Israeli forces scaled the steep cliffs of the Golan Heights on 9 June, securing the plateau before a UN-brokered ceasefire took effect on 10 June 1967 to stop Syrian artillery shelling of northern settlements.",
            "year": 1967,
            "distractors": [
              "The West Bank",
              "The Sinai Peninsula",
              "The Hula Valley"
            ]
          },
          {
            "id": "q_2_1_n7",
            "question": "Which military alliance pact did King Hussein of Jordan sign with Egypt in May 1967, drawing Jordan into the war?",
            "answer": "The Egypt-Jordan Defence Treaty",
            "explanation": "King Hussein signed the defence treaty in Cairo on 30 May 1967, placing Jordanian forces under Egyptian command and completing the military encirclement of Israel.",
            "year": 1967,
            "distractors": [
              "The Arab League Treaty",
              "The Egypt-Syria Pact",
              "The Amman Accord"
            ]
          },
          {
            "id": "q_2_1_n8",
            "question": "What was the name of the Israeli infrastructure project that the Arab League attempted to block by diverting Jordan River headwaters?",
            "answer": "The National Water Carrier",
            "explanation": "The National Water Carrier of Israel transferred water from the Sea of Galilee to the south, which Arab states sought to divert.",
            "year": 1964,
            "distractors": [
              "The Negev Pipeline",
              "The Galilee Canal",
              "The Yarkon Project"
            ]
          },
          {
            "id": "q_2_1_n9",
            "question": "In which month and year did the Six Day War occur?",
            "answer": "June 1967",
            "explanation": "The war began on 5 June and ended on 10 June 1967, altering Middle Eastern politics forever.",
            "year": 1967,
            "distractors": [
              "May 1967",
              "July 1967",
              "October 1973"
            ]
          },
          {
            "id": "q_2_1_n10",
            "question": "Who was the Egyptian Field Marshal and commander-in-chief of the armed forces who committed suicide after the Six Day War defeat?",
            "answer": "Abdel Hakim Amer",
            "explanation": "Field Marshal Amer was blame-shifted for the military catastrophe and committed suicide in September 1967 while under house arrest.",
            "year": 1967,
            "distractors": [
              "Saad el-Shazly",
              "Anwar Sadat",
              "Ahmad Ismail Ali"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_2_1_d1",
            "question": "Who was the Israeli Prime Minister who initially hesitated to go to war in May 1967, facing immense domestic criticism?",
            "answer": "Levi Eshkol",
            "explanation": "Levi Eshkol's cautious approach frustrated Israeli military leaders, forcing him to yield the Defence Ministry portfolio to Moshe Dayan.",
            "year": 1967,
            "distractors": [
              "David Ben-Gurion",
              "Moshe Dayan",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_2_1_d2",
            "question": "What specific Arab military alliance, formed between Egypt and Syria in November 1966, meant an attack on one would bring the other into war?",
            "answer": "The Egypt-Syria Defence Pact",
            "explanation": "The Egypt-Syria Defence Pact was a crucial tripwire, meaning border skirmishes with Syria threatened to drag the entire Egyptian army into conflict.",
            "year": 1966,
            "distractors": [
              "The Arab League Joint Command Pact",
              "The Egypt-Jordan Defence Treaty",
              "The Cairo-Damascus Military Alliance"
            ]
          },
          {
            "id": "q_2_1_d3",
            "question": "What was the specific military codename for the highly secretive, pre-emptive Israeli airstrike on 5 June 1967?",
            "answer": "Operation Focus",
            "explanation": "Operation Focus relied on total radio silence and flying under Egyptian radar, resulting in the destruction of over 300 planes.",
            "year": 1967,
            "distractors": [
              "Operation Black Arrow",
              "Operation Peace for Galilee",
              "Operation Sinai Strike"
            ]
          },
          {
            "id": "q_2_1_d4",
            "question": "How many Egyptian troops did Nasser move into the Sinai Peninsula by mid-May 1967 after receiving the false intelligence?",
            "answer": "100,000 troops",
            "explanation": "The sudden deployment of 100,000 Egyptian soldiers removed Israel's strategic depth, causing sheer panic and forcing a massive mobilisation.",
            "year": 1967,
            "distractors": [
              "50,000 troops",
              "75,000 troops",
              "150,000 troops"
            ]
          },
          {
            "id": "q_2_1_d5",
            "question": "Who was the American President who suggested Israel wait for an international flotilla, a plan that failed?",
            "answer": "Lyndon B. Johnson",
            "explanation": "President Lyndon B. Johnson was bogged down in Vietnam and could only offer vague promises, leaving Israel to act alone.",
            "year": 1967,
            "distractors": [
              "Dwight D. Eisenhower",
              "John F. Kennedy",
              "Richard Nixon"
            ]
          },
          {
            "id": "q_2_1_n11",
            "question": "What was the name of the American intelligence ship attacked by Israeli aircraft and torpedo boats during the Six Day War?",
            "answer": "USS Liberty",
            "explanation": "The USS Liberty was attacked on 8 June 1967, killing 34 crew; Israel claimed it was a case of mistaken identity.",
            "year": 1967,
            "distractors": [
              "USS Pueblo",
              "USS Maddox",
              "USS Cole"
            ]
          },
          {
            "id": "q_2_1_n12",
            "question": "Exactly how many military aircraft did the Israeli Air Force destroy on the first morning of Operation Focus?",
            "answer": "Over 300 aircraft",
            "explanation": "By launching a pre-emptive strike on 5 June 1967 (Operation Focus), Israel destroyed 338 Egyptian aircraft on the ground, securing absolute air supremacy.",
            "year": 1967,
            "distractors": [
              "150 aircraft",
              "200 aircraft",
              "500 aircraft"
            ]
          },
          {
            "id": "q_2_1_n13",
            "question": "In which month and year did the Samu Raid take place, escalating tensions between Israel and Jordan?",
            "answer": "November 1966",
            "explanation": "The IDF Samu Raid occurred on 13 November 1966 in the West Bank, clashing with the Jordanian army, blowing up dozens of houses, and killing 15 Jordanian soldiers, which deeply humiliated King Hussein and inflamed Jordanian public opinion.",
            "year": 1966,
            "distractors": [
              "April 1967",
              "May 1967",
              "June 1967"
            ]
          },
          {
            "id": "q_2_1_n14",
            "question": "Who was the Israeli Chief of Staff who planned the military operations for the 1967 Six Day War?",
            "answer": "Yitzhak Rabin",
            "explanation": "Yitzhak Rabin served as Chief of Staff of the IDF from 1964 to 1968, planning the rapid campaigns.",
            "year": 1967,
            "distractors": [
              "Moshe Dayan",
              "Ariel Sharon",
              "David Elazar"
            ]
          },
          {
            "id": "q_2_1_n15",
            "question": "Which Syrian Defence Minister (and future President) played a key role in escalating border clashes before the war?",
            "answer": "Hafez al-Assad",
            "explanation": "Hafez al-Assad was the Syrian Defence Minister who adopted a highly aggressive stance against Israel, later seizing presidency in 1970.",
            "year": 1967,
            "distractors": [
              "Salah Jadid",
              "Nureddin al-Atassi",
              "Bashar al-Assad"
            ]
          }
        ]
      },
      {
        "id": "subtopic_2_2",
        "embedVideo": "https://youtu.be/hMOIIdnkrDY",
        "title": "Topic 2.2: Aftermath of the 1967 war",
        "easy": [
          {
            "id": "q_2_2_s1",
            "question": "What was the number of the UN Resolution passed in November 1967 that established the principle of 'land for peace'?",
            "answer": "UN Resolution 242",
            "explanation": "Although the cornerstone of future peace negotiations, its ambiguous wording allowed Israel to justify retaining captured land until treaties were signed.",
            "year": 1967,
            "distractors": [
              "UN Resolution 181",
              "UN Resolution 338",
              "UN Resolution 194"
            ]
          },
          {
            "id": "q_2_2_s4",
            "question": "Which occupied territory provided Israel with a massive physical military buffer zone against Egypt and contained valuable oil reserves?",
            "answer": "The Sinai Peninsula",
            "explanation": "Occupying the Sinai gave Israel immense strategic depth, meaning an Egyptian invasion would have to cross hundreds of miles of desert.",
            "year": 1967,
            "distractors": [
              "The West Bank",
              "The Gaza Strip",
              "The Golan Heights"
            ]
          },
          {
            "id": "q_2_2_s5",
            "question": "Which elevated occupied territory provided crucial fresh water sources and stopped Syrian artillery attacks on Israeli farming communities?",
            "answer": "The Golan Heights",
            "explanation": "Controlling the Golan Heights completely shifted the tactical advantage, placing Israeli forces less than 40 miles from Damascus.",
            "year": 1967,
            "distractors": [
              "The West Bank",
              "The Sinai Peninsula",
              "The Shebaa Farms"
            ]
          },
          {
            "id": "q_2_2_s6",
            "question": "The 1967 war created over 300,000 new Palestinian what, the vast majority of whom fled into neighbouring Jordan?",
            "answer": "Refugees",
            "explanation": "This second massive wave of displacement compounded the tragedy of the Nakba, overflowing UNRWA camps and creating recruiting grounds for militants.",
            "year": 1967,
            "distractors": [
              "Citizens",
              "Evacuees",
              "Expatriates"
            ]
          },
          {
            "id": "q_2_2_s10",
            "question": "In which West German city did the 'Black September' group strike during the highly publicised 1972 Olympic Games?",
            "answer": "Munich",
            "explanation": "The horrific reality of the hostage crisis playing out on live global television shocked the world and cast the PLO as a terrorist organisation.",
            "year": 1972,
            "distractors": [
              "Frankfurt",
              "Berlin",
              "Hamburg"
            ]
          },
          {
            "id": "q_2_2_n1",
            "question": "What is the name of the militant Palestinian group responsible for the 1972 Munich Olympics massacre?",
            "answer": "Black September",
            "explanation": "Black September was a faction of Fatah formed to seek revenge for the PLO's expulsion from Jordan, targeting Israeli athletes.",
            "year": 1972,
            "distractors": [
              "The PFLP",
              "Hamas",
              "The Stern Gang"
            ]
          },
          {
            "id": "q_2_2_n2",
            "question": "Who was elected chairman of the Palestine Liberation Organization (PLO) in 1969, leading it for over three decades?",
            "answer": "Yasser Arafat",
            "explanation": "Yasser Arafat became the chairman of the PLO in 1969, building its international profile and diplomatic standing.",
            "year": 1969,
            "distractors": [
              "George Habash",
              "Ahmad Shukeiri",
              "Mahmoud Abbas"
            ]
          },
          {
            "id": "q_2_2_n3",
            "question": "In which country did the Munich Olympics hostage crisis occur in 1972?",
            "answer": "West Germany",
            "explanation": "The Munich Olympics took place in West Germany in September 1972, where 11 Israeli team members were murdered.",
            "year": 1972,
            "distractors": [
              "East Germany",
              "Austria",
              "Switzerland"
            ]
          },
          {
            "id": "q_2_2_n4",
            "question": "Which superpower backed Israel with economic and military aid during the War of Attrition?",
            "answer": "The USA",
            "explanation": "The US supported Israel to prevent Soviet dominance, supplying Phantom fighter jets during the conflict.",
            "year": 1969,
            "distractors": [
              "The USSR",
              "Great Britain",
              "France"
            ]
          },
          {
            "id": "q_2_2_n5",
            "question": "Which superpower supplied Egypt with SAM missiles and military advisers during the War of Attrition?",
            "answer": "The USSR",
            "explanation": "The Soviet Union sent thousands of military advisers and advanced air defense systems to Egypt to counter Israeli air strikes.",
            "year": 1970,
            "distractors": [
              "The USA",
              "China",
              "France"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_2_2_s2",
            "question": "In which city did the Arab League meet in August 1967, issuing the famous 'Three Nos' (no peace, no recognition, no negotiation)?",
            "answer": "Khartoum",
            "explanation": "This defiant resolution convinced many Israelis that the Arab world was completely unwilling to compromise.",
            "year": 1967,
            "distractors": [
              "Cairo",
              "Algiers",
              "Baghdad"
            ]
          },
          {
            "id": "q_2_2_s3",
            "question": "What name is given to the prolonged artillery and aerial conflict (1967-1970) initiated by Egypt to wear down Israeli forces?",
            "answer": "The War of Attrition",
            "explanation": "President Nasser hoped this static war of constant shelling would break Israeli public morale and force a withdrawal from Sinai.",
            "year": 1967,
            "distractors": [
              "The Suez Canal Conflict",
              "The Border Artillery War",
              "The War of Exhaustion"
            ]
          },
          {
            "id": "q_2_2_s7",
            "question": "Realising conventional armies could not defeat Israel, Palestinian nationalist groups increasingly shifted to what violent tactic?",
            "answer": "International terrorism",
            "explanation": "Groups like Fatah and the PFLP adopted asymmetrical guerrilla warfare and international terror attacks to force the world to address their statelessness.",
            "year": 1968,
            "distractors": [
              "Conventional border wars",
              "Diplomatic lobbying",
              "Trade embargos"
            ]
          },
          {
            "id": "q_2_2_s8",
            "question": "Which radical Marxist Palestinian organisation, founded by George Habash, pioneered the hijacking of international civilian flights?",
            "answer": "The PFLP",
            "explanation": "The Popular Front for the Liberation of Palestine viewed attacking Western commercial airlines as a legitimate way to strike at Israel's supporters.",
            "year": 1967,
            "distractors": [
              "Fatah",
              "The PLO",
              "The Black September Organization"
            ]
          },
          {
            "id": "q_2_2_s9",
            "question": "At which Jordanian desert airfield did this group blow up three hijacked international passenger airliners in September 1970?",
            "answer": "Dawson's Field",
            "explanation": "The spectacular visual gained massive media attention but humiliated the Jordanian government by proving they lost control of their territory.",
            "year": 1970,
            "distractors": [
              "Mafraq Air Base",
              "Amman International Airport",
              "Zarqa Desert Runway"
            ]
          },
          {
            "id": "q_2_2_n6",
            "question": "What was the name of the Jordanian town where a major battle in March 1968 boosted PLO prestige and recruitment?",
            "answer": "Battle of Karameh",
            "explanation": "The Battle of Karameh was a joint PLO-Jordanian defense against an Israeli raid, which Arafat claimed as a massive victory.",
            "year": 1968,
            "distractors": [
              "Battle of Samu",
              "Battle of Mafraq",
              "Battle of Irbid"
            ]
          },
          {
            "id": "q_2_2_n7",
            "question": "In which month and year did the UN Security Council pass Resolution 242?",
            "answer": "November 1967",
            "explanation": "Resolution 242 was passed on 22 November 1967, establishing the formula of 'land for peace'.",
            "year": 1967,
            "distractors": [
              "June 1967",
              "August 1967",
              "January 1968"
            ]
          },
          {
            "id": "q_2_2_n8",
            "question": "What was the name of the US Secretary of State who negotiated the August 1970 ceasefire that ended the War of Attrition?",
            "answer": "William P. Rogers",
            "explanation": "Secretary Rogers initiated the 'Rogers Plan', securing a ceasefire along the Suez Canal to end the War of Attrition.",
            "year": 1970,
            "distractors": [
              "Henry Kissinger",
              "Dean Rusk",
              "Cyrus Vance"
            ]
          },
          {
            "id": "q_2_2_n9",
            "question": "In which country did the PLO establish its primary base of operations and state-within-a-state after being expelled from Jordan?",
            "answer": "Lebanon",
            "explanation": "The PLO moved its base to Lebanon in late 1970, creating 'Fatahland' in the south and launching cross-border attacks.",
            "year": 1970,
            "distractors": [
              "Syria",
              "Egypt",
              "Iraq"
            ]
          },
          {
            "id": "q_2_2_n10",
            "question": "What was the name of the Jordanian civil war in September 1970 in which King Hussein crushed and expelled the PLO?",
            "answer": "Black September",
            "explanation": "King Hussein launched a military offensive in September 1970 to restore Jordanian sovereignty against the PLO state-within-a-state.",
            "year": 1970,
            "distractors": [
              "The Karameh Campaign",
              "The September Revolt",
              "The Red October Campaign"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_2_2_d1",
            "question": "Who was the Swedish UN diplomat appointed in November 1967 to try and implement Resolution 242?",
            "answer": "Gunnar Jarring",
            "explanation": "Gunnar Jarring spent over three years attempting to find a compromise, but his mission collapsed due to the rigid stances of both sides.",
            "year": 1967,
            "distractors": [
              "Count Folke Bernadotte",
              "Ralph Bunche",
              "U Thant"
            ]
          },
          {
            "id": "q_2_2_d2",
            "question": "Who was the founder of the PFLP, a Palestinian Christian doctor who believed only Marxist revolution would liberate Palestine?",
            "answer": "George Habash",
            "explanation": "George Habash formed the PFLP in 1967, breaking away from Arafat's Fatah because he believed the PLO was too moderate.",
            "year": 1967,
            "distractors": [
              "Yasser Arafat",
              "Wadi Haddad",
              "Abu Nidal"
            ]
          },
          {
            "id": "q_2_2_d3",
            "question": "What was the official Israeli military codename for the covert assassination campaign launched to hunt down the Munich perpetrators?",
            "answer": "Operation Wrath of God",
            "explanation": "Operation Wrath of God involved Israeli intelligence tracking down operatives across Europe, demonstrating Israel's commitment to lethal deterrence.",
            "year": 1972,
            "distractors": [
              "Operation Spring of Youth",
              "Operation Solomon",
              "Operation Entebbe Rescue"
            ]
          },
          {
            "id": "q_2_2_d4",
            "question": "What was the name of the West German military airbase where the botched police rescue attempt resulted in the deaths of the Israeli hostages?",
            "answer": "F├╝rstenfeldbruck",
            "explanation": "The disastrous outcome exposed severe flaws in counter-terrorism capabilities, prompting the creation of specialised hostage-rescue units globally.",
            "year": 1972,
            "distractors": [
              "Munich-Riem Airport",
              "F├╝rstenberg Airbase",
              "Bavarian Police Training School"
            ]
          },
          {
            "id": "q_2_2_d5",
            "question": "Who was the Israeli Prime Minister who ordered fierce military reprisals and the Mossad assassination campaign following Munich?",
            "answer": "Golda Meir",
            "explanation": "Golda Meir's unyielding 'iron lady' approach defined Israel's response to global terrorism, cementing a policy of absolute refusal to negotiate.",
            "year": 1972,
            "distractors": [
              "Levi Eshkol",
              "Menachem Begin",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_2_2_n11",
            "question": "Who was the Israeli Olympic wrestling coach who was the first athlete killed in the Olympic village during the Munich massacre?",
            "answer": "Moshe Weinberg",
            "explanation": "Wrestling coach Moshe Weinberg tried to block the door and fight off the armed terrorists, giving others time to escape.",
            "year": 1972,
            "distractors": [
              "Yossef Gutfreund",
              "Amitzur Shapira",
              "Kehat Shorr"
            ]
          },
          {
            "id": "q_2_2_n12",
            "question": "In which month and year did the PFLP hijack four international planes, flying them to Dawson's Field in Jordan?",
            "answer": "September 1970",
            "explanation": "The Dawson's Field hijackings occurred on 6 September 1970, precipitating the Black September war in Jordan.",
            "year": 1970,
            "distractors": [
              "August 1969",
              "October 1970",
              "September 1972"
            ]
          },
          {
            "id": "q_2_2_n13",
            "question": "What was the name of the first target assassinated in Rome by Mossad under Operation Wrath of God?",
            "answer": "Wael Zuaiter",
            "explanation": "Wael Zuaiter, a PLO representative and translator, was shot in Rome in October 1972, accused of being a Black September organizer.",
            "year": 1972,
            "distractors": [
              "Mahmoud Hamshari",
              "Ali Hassan Salameh",
              "Ziad Muchasi"
            ]
          },
          {
            "id": "q_2_2_n14",
            "question": "What was the name of the Palestinian refugee camp in South Lebanon that became the main headquarters for Fatah forces after 1970?",
            "answer": "Ain al-Hilweh",
            "explanation": "Ain al-Hilweh near Sidon became the largest refugee camp in Lebanon and the primary military stronghold for Fatah.",
            "year": 1970,
            "distractors": [
              "Shatila",
              "Sabra",
              "Nahr al-Bared"
            ]
          },
          {
            "id": "q_2_2_n15",
            "question": "Who was the head of the Jordanian Army who led the offensive against PLO forces during Black September in 1970?",
            "answer": "Habis al-Majali",
            "explanation": "Field Marshal Habis al-Majali was appointed military governor by King Hussein to command the campaign against the PLO.",
            "year": 1970,
            "distractors": [
              "Wasfi al-Tal",
              "Zaid al-Rifai",
              "Ali Abu Nuwar"
            ]
          }
        ]
      },
      {
        "id": "subtopic_2_3",
        "embedVideo": "https://youtu.be/F4GGpOxJW7I",
        "title": "Topic 2.3: Israel and Egypt, 1967-73",
        "easy": [
          {
            "id": "q_2_3_s1",
            "question": "Who became the President of Egypt following the death of Nasser in September 1970?",
            "answer": "Anwar Sadat",
            "explanation": "Anwar Sadat was initially viewed as a weak, transitional figure, but proved to be a highly cunning strategist who drastically changed Egypt's geopolitical alignment.",
            "year": 1970,
            "distractors": [
              "Gamal Abdel Nasser",
              "Hosni Mubarak",
              "Muhammad Naguib"
            ]
          },
          {
            "id": "q_2_3_s3",
            "question": "To secure its occupied territories, Israel built a massive defensive sand wall along the Suez Canal known as what?",
            "answer": "The Bar-Lev Line",
            "explanation": "The Bar Lev Line cost hundreds of millions and created a false sense of absolute security within the Israeli military establishment.",
            "year": 1971,
            "distractors": [
              "The Sharon Wall",
              "The Suez Shield",
              "The Maginot Line"
            ]
          },
          {
            "id": "q_2_3_s4",
            "question": "What is the specific term for the Jewish communities built by Israel in the newly conquered territories to consolidate its control?",
            "answer": "Israeli settlements",
            "explanation": "Heavily subsidised by the government, these fortified towns were intended to create permanent 'facts on the ground'.",
            "year": 1967,
            "distractors": [
              "Jewish outposts",
              "Communal farms (Kibbutzim)",
              "Zionist municipalities"
            ]
          },
          {
            "id": "q_2_3_s5",
            "question": "On what specific Jewish holy day did Egypt and Syria launch a surprise coordinated attack in 1973?",
            "answer": "Yom Kippur",
            "explanation": "The holiest day in the Jewish calendar meant the country was at a complete standstill, allowing Arab armies to achieve total tactical surprise.",
            "year": 1973,
            "distractors": [
              "Passover",
              "Rosh Hashanah",
              "Hanukkah"
            ]
          },
          {
            "id": "q_2_3_s8",
            "question": "What global superpower organised a massive emergency airlift of military equipment to save Israel from defeat?",
            "answer": "The USA",
            "explanation": "President Nixon's $2.2 billion airlift of tanks, jets, and ammunition was crucial for Israel's survival, but infuriated the Arab world.",
            "year": 1973,
            "distractors": [
              "Great Britain",
              "France",
              "West Germany"
            ]
          },
          {
            "id": "q_2_3_n1",
            "question": "In which year did the Yom Kippur War break out?",
            "answer": "1973",
            "explanation": "The Yom Kippur War began on 6 October 1973 with a surprise joint attack by Egypt and Syria.",
            "year": 1973,
            "distractors": [
              "1967",
              "1970",
              "1975"
            ]
          },
          {
            "id": "q_2_3_n2",
            "question": "On which Jewish holy day of fasting and atonement did Egypt and Syria launch their attack in 1973?",
            "answer": "Yom Kippur",
            "explanation": "The attack was launched on Yom Kippur (Day of Atonement) when Israel's infrastructure, media, and military were largely shut down.",
            "year": 1973,
            "distractors": [
              "Passover",
              "Rosh Hashanah",
              "Hanukkah"
            ]
          },
          {
            "id": "q_2_3_n3",
            "question": "Who was the Prime Minister of Israel during the 1973 Yom Kippur War?",
            "answer": "Golda Meir",
            "explanation": "Golda Meir was the PM who led Israel through the initial crisis of the war, later resigning in 1974.",
            "year": 1973,
            "distractors": [
              "David Ben-Gurion",
              "Levi Eshkol",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_2_3_n4",
            "question": "Which canal did the Egyptian military successfully cross during the opening hours of the Yom Kippur War?",
            "answer": "The Suez Canal",
            "explanation": "Egyptian forces crossed the Suez Canal, breaching the Bar-Lev Line sand fortifications in a massive amphibious operation.",
            "year": 1973,
            "distractors": [
              "The Straits of Tiran",
              "The Jordan River",
              "The Litani River"
            ]
          },
          {
            "id": "q_2_3_n5",
            "question": "What is the acronym for the group of petroleum-exporting countries that imposed a devastating oil embargo in 1973?",
            "answer": "OPEC",
            "explanation": "OPEC (led by OAPEC members) cut oil exports and embargoed the West to force pressure on Israel to withdraw.",
            "year": 1973,
            "distractors": [
              "OAPEC",
              "OECD",
              "G7"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_2_3_s2",
            "question": "To encourage the USA to pressure Israel, how many Soviet military advisers did this new Egyptian President expel in 1972?",
            "answer": "15,000 advisers",
            "explanation": "Expelling the Soviets was a massive gamble to win American favour, leading Sadat to decide a limited war was his only remaining option.",
            "year": 1972,
            "distractors": [
              "5,000 advisers",
              "10,000 advisers",
              "25,000 advisers"
            ]
          },
          {
            "id": "q_2_3_s6",
            "question": "What type of high-pressure weapon did Egyptian engineers innovatively use to blast through the Israeli sand walls?",
            "answer": "Water cannons",
            "explanation": "Using powerful water hoses to melt the sand banks was a stroke of Egyptian military genius, allowing quick crossings of the canal.",
            "year": 1973,
            "distractors": [
              "Bulldozers",
              "Explosive charges",
              "Pneumatic drills"
            ]
          },
          {
            "id": "q_2_3_s7",
            "question": "What type of Soviet-built surface-to-air missiles successfully protected the initial Egyptian advance from Israeli fighter jets?",
            "answer": "SAM-3 missiles",
            "explanation": "These advanced anti-aircraft missiles created an 'umbrella' over the Suez Canal that effectively neutralized the Israeli Air Force.",
            "year": 1973,
            "distractors": [
              "Scud missiles",
              "Sagger missiles",
              "SAM-6 missiles"
            ]
          },
          {
            "id": "q_2_3_s9",
            "question": "What economic 'weapon' did Arab states use to punish the West for supplying Israel with weapons?",
            "answer": "The Oil Embargo",
            "explanation": "By drastically cutting production, Arab oil-producing nations triggered a massive global energy crisis, proving they possessed a devastating economic tool.",
            "year": 1973,
            "distractors": [
              "The Shipping Boycott",
              "The Financial Embargo",
              "The Canal Blockade"
            ]
          },
          {
            "id": "q_2_3_s10",
            "question": "What was the number of the United Nations Security Council Resolution that eventually brought the fighting to a ceasefire?",
            "answer": "Resolution 338",
            "explanation": "Passed jointly by the USA and USSR, Resolution 338 demanded a ceasefire and legally mandated the implementation of Resolution 242.",
            "year": 1973,
            "distractors": [
              "Resolution 242",
              "Resolution 181",
              "Resolution 340"
            ]
          },
          {
            "id": "q_2_3_n6",
            "question": "What was the code name of the massive US military airlift operation that sent emergency supplies to Israel during the war?",
            "answer": "Operation Nickel Grass",
            "explanation": "Operation Nickel Grass was ordered by President Nixon in October 1973, shipping over 22,000 tons of tanks, planes, and ammo to Israel.",
            "year": 1973,
            "distractors": [
              "Operation Badr",
              "Operation Nickel Shield",
              "Operation Nickel Storm"
            ]
          },
          {
            "id": "q_2_3_n7",
            "question": "Which Israeli General led the daring counter-crossing of the Suez Canal to encircle the Egyptian Third Army?",
            "answer": "Ariel Sharon",
            "explanation": "Ariel Sharon commanded the 143rd Armoured Division, crossing the canal to the west bank and turning the tide of the war.",
            "year": 1973,
            "distractors": [
              "David Elazar",
              "Moshe Dayan",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_2_3_n8",
            "question": "What was the name of the Syrian military frontline boundary that Israel broke through to launch its counter-offensive toward Damascus?",
            "answer": "The Purple Line",
            "explanation": "The Purple Line was the de facto border line between Israel and Syria after 1967; Israel crossed it to threaten Damascus.",
            "year": 1973,
            "distractors": [
              "The Green Line",
              "The Bar-Lev Line",
              "The Blue Line"
            ]
          },
          {
            "id": "q_2_3_n9",
            "question": "Who was the President of the United States during the 1973 Yom Kippur War?",
            "answer": "Richard Nixon",
            "explanation": "President Nixon ordered the military airlift and cooperated with the Soviets to pass a UN ceasefire resolution.",
            "year": 1973,
            "distractors": [
              "Lyndon B. Johnson",
              "Gerald Ford",
              "Jimmy Carter"
            ]
          },
          {
            "id": "q_2_3_n10",
            "question": "In which month and year did the Yom Kippur War begin?",
            "answer": "October 1973",
            "explanation": "The Yom Kippur War began on 6 October and ended with ceasefires in late October 1973.",
            "year": 1973,
            "distractors": [
              "June 1967",
              "November 1973",
              "September 1970"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_2_3_d1",
            "question": "What was the name of the official Israeli judicial commission of inquiry set up in November 1973 to investigate the intelligence failures?",
            "answer": "The Agranat Commission",
            "explanation": "The Agranat Commission absolved politicians of direct responsibility, placing the blame entirely on the military leadership, sparking massive public outrage.",
            "year": 1973,
            "distractors": [
              "The Kahane Commission",
              "The Shamgar Commission",
              "The Kahan Commission"
            ]
          },
          {
            "id": "q_2_3_d2",
            "question": "Who was the Chief of Staff of the Israeli Defence Forces (IDF) who was forced to resign as a direct result of this commission's findings?",
            "answer": "David 'Dado' Elazar",
            "explanation": "Lieutenant General David 'Dado' Elazar took the fall for the intelligence disaster despite having successfully commanded the counter-offensive.",
            "year": 1973,
            "distractors": [
              "Eli Zeira",
              "Zvi Zamir",
              "Moshe Dayan"
            ]
          },
          {
            "id": "q_2_3_d3",
            "question": "What was the specific name of the Soviet-built, wire-guided anti-tank missiles used by Egyptian infantry to devastate Israeli tanks?",
            "answer": "Sagger missiles",
            "explanation": "The portable Sagger missiles fundamentally changed tank warfare, destroying hundreds of charging, technologically superior Israeli tanks.",
            "year": 1973,
            "distractors": [
              "SAM-3 missiles",
              "SAM-6 missiles",
              "Scud missiles"
            ]
          },
          {
            "id": "q_2_3_d4",
            "question": "What was the name of the Israeli intelligence assumption that Egypt would never attack without superior air power?",
            "answer": "'The Conception'",
            "explanation": "'The Conception' blinded Israeli military intelligence, causing them to interpret the massive Egyptian troop build-up as merely a training exercise.",
            "year": 1973,
            "distractors": [
              "The Israel Shield Assumption",
              "The Dayan Concept",
              "The Deterrence Doctrine"
            ]
          },
          {
            "id": "q_2_3_d5",
            "question": "Who was the King of Jordan who secretly flew to Tel Aviv in September 1973 to personally warn Golda Meir of the impending Syrian attack?",
            "answer": "King Hussein",
            "explanation": "King Hussein's extraordinary secret meeting demonstrated complex back-channel relationships; he warned Israel to avoid destabilizing his own kingdom.",
            "year": 1973,
            "distractors": [
              "Crown Prince Hassan",
              "King Faisal",
              "Prime Minister Zaid al-Rifai"
            ]
          },
          {
            "id": "q_2_3_n11",
            "question": "What was the name of the Egyptian operational plan for the crossing of the Suez Canal in 1973?",
            "answer": "Operation Badr",
            "explanation": "Operation Badr was the code name for the highly successful crossing of the canal and breaching of the Bar-Lev Line.",
            "year": 1973,
            "distractors": [
              "Operation Kadesh",
              "Operation Focus",
              "Operation Black Arrow"
            ]
          },
          {
            "id": "q_2_3_n12",
            "question": "Who was the Director of Israeli Military Intelligence (Aman) during the Yom Kippur War who was criticized for ignoring warnings?",
            "answer": "Eli Zeira",
            "explanation": "Major General Eli Zeira was found by the Agranat Commission to have failed in warning the cabinet due to dogmatic assumptions.",
            "year": 1973,
            "distractors": [
              "Dado Elazar",
              "Zvi Zamir",
              "Moshe Dayan"
            ]
          },
          {
            "id": "q_2_3_n13",
            "question": "Which Soviet Premier did Egypt's Anwar Sadat negotiate with to secure SAM missile batteries before the war?",
            "answer": "Leonid Brezhnev",
            "explanation": "Leonid Brezhnev agreed to supply Egypt with SAM batteries, which neutralized Israel's air superiority in the war's first week.",
            "year": 1973,
            "distractors": [
              "Nikita Khrushchev",
              "Mikhail Gorbachev",
              "Andrei Gromyko"
            ]
          },
          {
            "id": "q_2_3_n14",
            "question": "Which Israeli Defence Minister suffered a near-breakdown on 7 October 1973, declaring 'the destruction of the Third Temple' was near?",
            "answer": "Moshe Dayan",
            "explanation": "Moshe Dayan was shocked by the early losses and recommended pulling back to defensive lines, but Golda Meir overruled his panic.",
            "year": 1973,
            "distractors": [
              "Ariel Sharon",
              "David Elazar",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_2_3_n15",
            "question": "Exactly how many Soviet military advisers did Anwar Sadat expel from Egypt in July 1972 to prepare a shift to the USA?",
            "answer": "15,000 advisers",
            "explanation": "Anwar Sadat expelled all 15,000 Soviet advisers to show independence and court diplomatic support from Washington.",
            "year": 1972,
            "distractors": [
              "5,000 advisers",
              "10,000 advisers",
              "25,000 advisers"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "topic_3",
    "title": "Key Topic 3: Attempts at a solution, 1974-95",
    "subtopics": [
      {
        "id": "subtopic_3_1",
        "embedVideo": "https://youtu.be/iK729p_-ZRg",
        "title": "Topic 3.1: Diplomatic negotiations",
        "easy": [
          {
            "id": "q_3_1_s2",
            "question": "What acronym represents the organisation of Arab petroleum-exporting countries that imposed this embargo?",
            "answer": "OPEC",
            "explanation": "The Organization of the Petroleum Exporting Countries demonstrated unprecedented unity, forcing Western nations to adopt more neutral foreign policies.",
            "year": 1973,
            "distractors": [
              "OAPEC",
              "GCC",
              "Arab League"
            ]
          },
          {
            "id": "q_3_1_s3",
            "question": "Which US Secretary of State engaged in intensive travel between Middle Eastern capitals to mediate peace agreements between 1974 and 1975?",
            "answer": "Henry Kissinger",
            "explanation": "Henry Kissinger actively sidelined the Soviet Union to ensure that the USA became the sole indispensable peace-broker in the Middle East.",
            "year": 1974,
            "distractors": [
              "William P. Rogers",
              "Cyrus Vance",
              "George Shultz"
            ]
          },
          {
            "id": "q_3_1_s6",
            "question": "In November 1977, the Egyptian President made an unprecedented and historic visit to which city to offer peace?",
            "answer": "Jerusalem",
            "explanation": "By travelling to the heart of the Jewish state, Sadat shattered the immense psychological barrier of the Arab world's 'Three Nos'.",
            "year": 1977,
            "distractors": [
              "Tel Aviv",
              "Cairo",
              "Washington D.C."
            ]
          },
          {
            "id": "q_3_1_s8",
            "question": "Who was the US President who personally intervened to save the failing peace talks in 1978?",
            "answer": "Jimmy Carter",
            "explanation": "Driven by deep personal religious convictions and a strategic desire to stabilize the Middle East, Jimmy Carter staked his political reputation on achieving a treaty.",
            "year": 1978,
            "distractors": [
              "Richard Nixon",
              "Gerald Ford",
              "Ronald Reagan"
            ]
          },
          {
            "id": "q_3_1_s10",
            "question": "In what month and year was the formal signing of the Egypt-Israel peace treaty in the US capital?",
            "answer": "March 1979 (Treaty of Washington)",
            "explanation": "The Treaty of Washington legally codified the Camp David Accords, with the USA cementing the deal by committing billions of dollars in aid.",
            "year": 1979,
            "distractors": [
              "September 1978 (Camp David Frameworks)",
              "November 1977 (Jerusalem Declaration)",
              "June 1979 (Washington Accord)"
            ]
          },
          {
            "id": "q_3_1_n1",
            "question": "In which year did the Camp David Accords get signed, laying the framework for peace between Egypt and Israel?",
            "answer": "1978",
            "explanation": "The Camp David Accords were signed on 17 September 1978 after 13 days of secret negotiations in Maryland.",
            "year": 1978,
            "distractors": [
              "1973",
              "1977",
              "1979"
            ]
          },
          {
            "id": "q_3_1_n2",
            "question": "Who was the US President who hosted and mediated the secret talks at Camp David in 1978?",
            "answer": "Jimmy Carter",
            "explanation": "President Jimmy Carter personally intervened, inviting Begin and Sadat to Camp David to broker a peace deal.",
            "year": 1978,
            "distractors": [
              "Richard Nixon",
              "Gerald Ford",
              "Ronald Reagan"
            ]
          },
          {
            "id": "q_3_1_n3",
            "question": "Who was the Israeli Prime Minister who signed the Camp David Accords and the 1979 peace treaty?",
            "answer": "Menachem Begin",
            "explanation": "Menachem Begin was the Likud Prime Minister of Israel who made peace with Egypt, returning the Sinai Peninsula.",
            "year": 1978,
            "distractors": [
              "Yitzhak Rabin",
              "Golda Meir",
              "Yitzhak Shamir"
            ]
          },
          {
            "id": "q_3_1_n4",
            "question": "In which year did Egypt and Israel sign their formal, historic peace treaty in Washington?",
            "answer": "1979",
            "explanation": "The Egypt-Israel Peace Treaty was signed in Washington D.C. on 26 March 1979, ending 30 years of war.",
            "year": 1979,
            "distractors": [
              "1977",
              "1978",
              "1981"
            ]
          },
          {
            "id": "q_3_1_n5",
            "question": "What is the name of the US presidential country retreat in Maryland where the 1978 peace talks took place?",
            "answer": "Camp David",
            "explanation": "Camp David is the official mountain retreat for the President of the US, offering isolation from press and political pressure.",
            "year": 1978,
            "distractors": [
              "Kennebunkport",
              "Warm Springs",
              "Key Largo"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_3_1_s1",
            "question": "What economic 'weapon' did Arab states use in 1973 to punish the West for supporting Israel?",
            "answer": "The Oil Embargo",
            "explanation": "The embargo quadrupled global fuel prices and created a severe economic crisis in the West, forcing the USA to actively intervene in the conflict.",
            "year": 1973,
            "distractors": [
              "The Suez Canal Closure",
              "The Trade Boycott",
              "The Dollar Embargo"
            ]
          },
          {
            "id": "q_3_1_s4",
            "question": "What specific term became famous to describe this process of the US mediator flying back and forth between hostile capitals?",
            "answer": "Shuttle Diplomacy",
            "explanation": "Because the Arab leaders completely refused to sit in the same room as the Israelis, 'shuttle diplomacy' was the only practical way to build trust.",
            "year": 1974,
            "distractors": [
              "Backchannel Diplomacy",
              "Intermediary Mediation",
              "Step-by-Step Peacekeeping"
            ]
          },
          {
            "id": "q_3_1_s5",
            "question": "Which vital international waterway was officially reopened to global shipping in June 1975 following these diplomatic agreements?",
            "answer": "The Suez Canal",
            "explanation": "Reopening the canal after eight years of closure was a massive economic boost for Egypt and a symbolic victory for President Sadat.",
            "year": 1975,
            "distractors": [
              "The Straits of Tiran",
              "The Gulf of Suez",
              "The Straits of Aqaba"
            ]
          },
          {
            "id": "q_3_1_s7",
            "question": "What is the name of the Israeli parliament where the Egyptian President delivered his famous peace speech?",
            "answer": "The Knesset",
            "explanation": "Addressing the Israeli parliament directly allowed Sadat to bypass the politicians and speak straight to the Israeli public.",
            "year": 1977,
            "distractors": [
              "The Knesset Building",
              "The President's Residence",
              "The Israeli High Court"
            ]
          },
          {
            "id": "q_3_1_s9",
            "question": "What is the name of the secluded US presidential retreat in Maryland where the three leaders met in September 1978?",
            "answer": "Camp David",
            "explanation": "The isolation of Camp David was a deliberate tactic by Carter to cut the leaders off from domestic political pressures and the global press.",
            "year": 1978,
            "distractors": [
              "Warm Springs",
              "Kennebunkport",
              "Key Largo"
            ]
          },
          {
            "id": "q_3_1_n6",
            "question": "Who succeeded Anwar Sadat as President of Egypt after Sadat was assassinated by Islamist soldiers in 1981?",
            "answer": "Hosni Mubarak",
            "explanation": "Hosni Mubarak succeeded Sadat in October 1981, maintaining the peace treaty with Israel and ruling Egypt for 30 years.",
            "year": 1981,
            "distractors": [
              "Anwar Sadat",
              "Gamal Abdel Nasser",
              "Boutros Boutros-Ghali"
            ]
          },
          {
            "id": "q_3_1_n7",
            "question": "What is the name of the historic speech delivered by Anwar Sadat in November 1977 directly to Israeli legislators?",
            "answer": "The Knesset Speech",
            "explanation": "Anwar Sadat traveled to Jerusalem and delivered a speech in the Knesset, proposing peace while defending Arab rights.",
            "year": 1977,
            "distractors": [
              "The Jerusalem Declaration",
              "The Sinai Accord Speech",
              "The Knesset Proposal"
            ]
          },
          {
            "id": "q_3_1_n8",
            "question": "Which vital international shipping canal did Egypt reopen in June 1975 following troop disengagement agreements?",
            "answer": "The Suez Canal",
            "explanation": "The Suez Canal had been closed since the 1967 war, but was reopened in 1975 after Israeli forces withdrew from its eastern banks.",
            "year": 1975,
            "distractors": [
              "The Straits of Tiran",
              "The Jordan Canal",
              "The Aqaba Outlet"
            ]
          },
          {
            "id": "q_3_1_n9",
            "question": "In which Egyptian city was President Anwar Sadat assassinated during a military parade in October 1981?",
            "answer": "Cairo",
            "explanation": "Sadat was shot in Cairo by members of the Egyptian Islamic Jihad who opposed the peace treaty with Israel.",
            "year": 1981,
            "distractors": [
              "Alexandria",
              "Suez",
              "Ismailia"
            ]
          },
          {
            "id": "q_3_1_n10",
            "question": "Which regional organization expelled Egypt in 1979 in protest of its peace treaty with Israel?",
            "answer": "The Arab League",
            "explanation": "The Arab League expelled Egypt and moved its headquarters from Cairo to Tunis, furious that Sadat had signed a separate peace.",
            "year": 1979,
            "distractors": [
              "OPEC",
              "The Gulf Cooperation Council",
              "The Pan-Arab Coalition"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_3_1_d1",
            "question": "Which North African country's King hosted the highly secretive 1977 meetings between Israeli and Egyptian envoys?",
            "answer": "Morocco (King Hassan II)",
            "explanation": "King Hassan II facilitated clandestine meetings, proving that back-channel, secret diplomacy was essential before public breakthroughs.",
            "year": 1977,
            "distractors": [
              "Egypt (Anwar Sadat)",
              "Saudi Arabia (King Khalid)",
              "Jordan (King Hussein)"
            ]
          },
          {
            "id": "q_3_1_d2",
            "question": "Who was the Egyptian Foreign Minister who dramatically resigned on the final day of the Camp David summit?",
            "answer": "Muhammad Ibrahim Kamel",
            "explanation": "Muhammad Ibrahim Kamel's resignation highlighted deep internal divisions; he believed Sadat had abandoned the Palestinian cause.",
            "year": 1978,
            "distractors": [
              "Ismail Fahmy",
              "Boutros Boutros-Ghali",
              "Amr Moussa"
            ]
          },
          {
            "id": "q_3_1_d3",
            "question": "In July 1978, the USA hosted secret preliminary talks between Israeli and Egyptian foreign ministers at which historic English castle?",
            "answer": "Leeds Castle",
            "explanation": "The Leeds Castle talks broke a dangerous diplomatic freeze and laid the groundwork for Carter's decision to invite leaders to Camp David.",
            "year": 1978,
            "distractors": [
              "Windsor Castle",
              "Heidelberg Castle",
              "Ch├óteau de Versailles"
            ]
          },
          {
            "id": "q_3_1_d4",
            "question": "What Roman numeral is used to denote the September 1975 interim agreement, where Israel agreed to withdraw from strategic Sinai passes?",
            "answer": "Sinai II",
            "explanation": "The Sinai II agreement was a massive milestone as it included the first official statement that the conflict should not be resolved by military force.",
            "year": 1975,
            "distractors": [
              "Sinai I",
              "Suez II",
              "Geneva I"
            ]
          },
          {
            "id": "q_3_1_d5",
            "question": "Who was the brilliant Israeli legal advisor who helped draft the deliberately ambiguous wording of the Camp David frameworks?",
            "answer": "Aharon Barak",
            "explanation": "Aharon Barak's legal genius allowed both Begin and Sadat to claim political victories to their home audiences without losing face.",
            "year": 1978,
            "distractors": [
              "Meir Shamgar",
              "Elyakim Rubinstein",
              "Menachem Begin"
            ]
          },
          {
            "id": "q_3_1_d6",
            "question": "Which commander of the Egyptian Air Force during the Yom Kippur War succeeded Anwar Sadat as President of Egypt after Sadat's assassination in 1981?",
            "answer": "Hosni Mubarak",
            "explanation": "Hosni Mubarak served as Commander of the Air Force and Vice President, and assumed the presidency after Anwar Sadat was assassinated by Islamic extremists in 1981. He maintained the peace treaty with Israel and ruled Egypt for nearly 30 years.",
            "year": 1981,
            "distractors": [
              "Anwar Sadat",
              "Saad el-Shazly",
              "Ahmad Ismail Ali"
            ]
          },
          {
            "id": "q_3_1_n11",
            "question": "What was the name of the January 1974 military disengagement agreement between Israel and Egypt brokered by Henry Kissinger?",
            "answer": "Sinai I",
            "explanation": "The Sinai I agreement saw Israeli forces pull back to 20km east of the Suez Canal, allowing Egypt to clear and reopen it.",
            "year": 1974,
            "distractors": [
              "Sinai II",
              "Sinai Accord",
              "Suez Disengagement Agreement"
            ]
          },
          {
            "id": "q_3_1_n12",
            "question": "Which US Secretary of State pioneered 'shuttle diplomacy' to broker the Sinai I and Sinai II agreements between 1974 and 1975?",
            "answer": "Henry Kissinger",
            "explanation": "Henry Kissinger flew constantly between Cairo, Tel Aviv, and Damascus to negotiate troop pullbacks and disengagement.",
            "year": 1974,
            "distractors": [
              "William P. Rogers",
              "Cyrus Vance",
              "George Shultz"
            ]
          },
          {
            "id": "q_3_1_n13",
            "question": "Which Egyptian diplomat and future UN Secretary-General served as Minister of State for Foreign Affairs during the Camp David talks?",
            "answer": "Boutros Boutros-Ghali",
            "explanation": "Boutros Boutros-Ghali accompanied Sadat to Camp David, playing a vital role in negotiating the legal frameworks.",
            "year": 1978,
            "distractors": [
              "Ismail Fahmy",
              "Muhammad Ibrahim Kamel",
              "Amr Moussa"
            ]
          },
          {
            "id": "q_3_1_n14",
            "question": "In which month and year was the formal Egypt-Israel Peace Treaty signed in Washington D.C.?",
            "answer": "March 1979",
            "explanation": "The treaty was signed on 26 March 1979 on the White House lawn by Sadat, Begin, and Carter.",
            "year": 1979,
            "distractors": [
              "September 1978",
              "November 1977",
              "October 1981"
            ]
          }
        ]
      },
      {
        "id": "subtopic_3_2",
        "embedVideo": "https://youtu.be/-XkX1UUe7HQ",
        "title": "Topic 3.2: The Palestinian issue",
        "easy": [
          {
            "id": "q_3_2_s1",
            "question": "Who made a historic speech to the General Assembly in 1974, claiming to bear \"an olive branch and a freedom fighter's gun\"?",
            "answer": "Yasser Arafat",
            "explanation": "Yasser Arafat's speech was a monumental diplomatic victory, successfully transforming his global image into an internationally recognised statesman.",
            "year": 1974,
            "distractors": [
              "Yitzhak Rabin",
              "Anwar Sadat",
              "Jimmy Carter"
            ]
          },
          {
            "id": "q_3_2_s2",
            "question": "After being violently expelled from Jordan in 1970, to which neighbouring country did the PLO move its headquarters and guerrilla bases?",
            "answer": "Lebanon",
            "explanation": "Lebanon's weak central government and existing refugee population made it the perfect staging ground for the PLO to rebuild its military.",
            "year": 1970,
            "distractors": [
              "Syria",
              "Egypt",
              "Jordan"
            ]
          },
          {
            "id": "q_3_2_s6",
            "question": "In June 1982, the attempted assassination of the Israeli ambassador in London was used by Ariel Sharon to justify what?",
            "answer": "A full-scale invasion",
            "explanation": "Israel used the outrage as the perfect pretext to launch a long-planned, massive military offensive to destroy the PLO permanently.",
            "year": 1982,
            "distractors": [
              "A border skirmish in the Golan Heights",
              "The hijacking of an Israeli airliner to Beirut",
              "A cross-border artillery attack on Kiryat Shmona"
            ]
          },
          {
            "id": "q_3_2_s9",
            "question": "In September 1982, Lebanese Christian Phalangist militias carried out a horrific two-day massacre of Palestinian refugees in the Shatila and which other camp?",
            "answer": "Sabra and Shatila",
            "explanation": "The Sabra and Shatila massacres resulted in the brutal murder of up to 3,000 unarmed civilians while the Israeli army guarded the perimeters.",
            "year": 1982,
            "distractors": [
              "Chatila and Bourj el-Barajneh",
              "Sabra and Ein el-Hilweh",
              "Sabra and Shatila Camps"
            ]
          },
          {
            "id": "q_3_2_s10",
            "question": "In December 1987, an Israeli army truck crashed into civilian cars in Gaza, sparking a massive, spontaneous uprising known as what?",
            "answer": "The First Intifada",
            "explanation": "Translating to 'shaking off', the grassroots Intifada took the military completely by surprise, shifting the conflict back to the occupied territories.",
            "year": 1987,
            "distractors": [
              "The First Resistance",
              "The Stones Uprising",
              "The Gaza Revolt"
            ]
          },
          {
            "id": "q_3_2_n1",
            "question": "What is the name of the grassroots Palestinian uprising that erupted in Gaza and the West Bank in December 1987?",
            "answer": "The First Intifada",
            "explanation": "The First Intifada was a massive, spontaneous rebellion featuring boycotts, strikes, and stone-throwing against Israeli forces.",
            "year": 1987,
            "distractors": [
              "The Al-Aqsa Intifada",
              "The Nakba Revolt",
              "The Fatah Insurgency"
            ]
          },
          {
            "id": "q_3_2_n2",
            "question": "Who was the leader of the PLO during the 1982 Lebanon War?",
            "answer": "Yasser Arafat",
            "explanation": "Yasser Arafat commanded PLO forces in Beirut, eventually agreeing to withdraw to Tunisia under a US-brokered deal.",
            "year": 1982,
            "distractors": [
              "George Habash",
              "Abu Nidal",
              "Mahmoud Abbas"
            ]
          },
          {
            "id": "q_3_2_n3",
            "question": "In which Arab country is Beirut, the capital city besieged and bombarded by Israeli forces in 1982?",
            "answer": "Lebanon",
            "explanation": "Lebanon was invaded by Israel in 1982 to destroy the PLO bases, culminating in the siege of West Beirut.",
            "year": 1982,
            "distractors": [
              "Syria",
              "Jordan",
              "Egypt"
            ]
          },
          {
            "id": "q_3_2_n4",
            "question": "What symbolic plant branch did Yasser Arafat claim to carry alongside a freedom fighter's gun in his 1974 UN speech?",
            "answer": "An olive branch",
            "explanation": "Arafat famously said, 'I have come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.'",
            "year": 1974,
            "distractors": [
              "A palm branch",
              "A laurel branch",
              "A fig branch"
            ]
          },
          {
            "id": "q_3_2_n5",
            "question": "In which year did the First Palestinian Intifada begin, sparked by a military vehicle crash in Gaza?",
            "answer": "1987",
            "explanation": "The First Intifada began on 9 December 1987 after an IDF truck crashed into Palestinian civilian cars, killing four.",
            "year": 1987,
            "distractors": [
              "1982",
              "1985",
              "1993"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_3_2_s3",
            "question": "The PLO's arrival upset a delicate religious demographic balance, contributing to the outbreak of a devastating 15-year conflict in 1975 known as what?",
            "answer": "The Lebanese Civil War",
            "explanation": "The Lebanese Civil War turned the country into a chaotic and bloody battleground, allowing the PLO to operate outside of government control.",
            "year": 1975,
            "distractors": [
              "The Lebanese Sectarian Conflict",
              "The Beirut Border Clashes",
              "The Mount Lebanon Insurgency"
            ]
          },
          {
            "id": "q_3_2_s4",
            "question": "In March 1978, a deadly PLO bus hijacking triggered Israel to launch a limited 26,000-troop invasion known as what?",
            "answer": "Operation Litani",
            "explanation": "Operation Litani successfully pushed the PLO forces north of the Litani River, but international outrage forced Israel to withdraw relatively quickly.",
            "year": 1978,
            "distractors": [
              "Operation Peace for Galilee",
              "Operation Grapes of Wrath",
              "Operation Accountability"
            ]
          },
          {
            "id": "q_3_2_s5",
            "question": "Following this 1978 invasion, what acronym represents the UN peacekeeping force deployed to patrol the border buffer zone?",
            "answer": "UNIFIL",
            "explanation": "The United Nations Interim Force in Lebanon was established to restore peace, but proved powerless to stop the PLO from continuing to infiltrate.",
            "year": 1978,
            "distractors": [
              "UNEF",
              "UNTSO",
              "UNDP"
            ]
          },
          {
            "id": "q_3_2_s7",
            "question": "What was the official Israeli military codename for this 1982 invasion?",
            "answer": "Operation Peace for Galilee",
            "explanation": "Officially sold to the public as a limited 40km incursion to protect northern settlements, it rapidly expanded into a war to conquer the capital.",
            "year": 1982,
            "distractors": [
              "Operation Litani",
              "Operation Peace for Lebanon",
              "Operation Beirut Shield"
            ]
          },
          {
            "id": "q_3_2_s8",
            "question": "Which Lebanese capital city was heavily bombarded, cutting off food and water to trap 15,000 PLO fighters inside?",
            "answer": "Beirut",
            "explanation": "By trapping Arafat and his fighters in West Beirut, the IDF achieved a tactical victory, but high civilian casualties caused a public relations disaster.",
            "year": 1982,
            "distractors": [
              "Tripoli",
              "Sidon",
              "Tyre"
            ]
          },
          {
            "id": "q_3_2_n6",
            "question": "Which Lebanese Christian militia carried out the horrific Sabra and Shatila massacre in September 1982?",
            "answer": "The Phalangists",
            "explanation": "Phalangist militias entered the camps to avenge the assassination of their leader Bashir Gemayel, killing hundreds of civilians.",
            "year": 1982,
            "distractors": [
              "The Druze Forces",
              "The Amal Movement",
              "Hezbollah"
            ]
          },
          {
            "id": "q_3_2_n7",
            "question": "Which Israeli judicial commission investigated the Sabra and Shatila massacre, finding Defence Minister Ariel Sharon indirectly responsible?",
            "answer": "The Kahan Commission",
            "explanation": "The 1983 Kahan Commission found Sharon personally responsible for failing to anticipate the danger of letting Phalangists into the camps.",
            "year": 1983,
            "distractors": [
              "The Agranat Commission",
              "The Shamgar Commission",
              "The Land Commission"
            ]
          },
          {
            "id": "q_3_2_n8",
            "question": "Who was the Israeli Chief of Staff during the 1982 invasion of Lebanon who was reprimanded by the Kahan Commission?",
            "answer": "Rafael Eitan",
            "explanation": "Lieutenant General Rafael Eitan was criticized by the commission for failing to coordinate and intervene in the massacres.",
            "year": 1982,
            "distractors": [
              "Ariel Sharon",
              "Moshe Dayan",
              "Yitzhak Rabin"
            ]
          },
          {
            "id": "q_3_2_n9",
            "question": "To which North African capital city was the PLO headquarters forced to relocate in 1982 after being expelled from Beirut?",
            "answer": "Tunis",
            "explanation": "The PLO moved its leadership and administrative headquarters to Tunis, Tunisia, where it remained until 1994.",
            "year": 1982,
            "distractors": [
              "Algiers",
              "Tripoli",
              "Cairo"
            ]
          },
          {
            "id": "q_3_2_n10",
            "question": "Who was the Israeli Defence Minister who directed the 1982 invasion of Lebanon and was forced to resign over the Sabra and Shatila massacre?",
            "answer": "Ariel Sharon",
            "explanation": "Ariel Sharon directed the war, pushing forces past the authorized 40km buffer all the way to Beirut, resigning in early 1983.",
            "year": 1982,
            "distractors": [
              "Menachem Begin",
              "Yitzhak Shamir",
              "Moshe Arens"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_3_2_d1",
            "question": "What was the specific name of the 1978 Palestinian terror attack, where a hijacked bus resulted in 38 Israeli civilian deaths?",
            "answer": "The Coastal Road Massacre",
            "explanation": "The Coastal Road Massacre deeply traumatised the Israeli public and convinced the government that a buffer zone inside Lebanon was required.",
            "year": 1978,
            "distractors": [
              "The Ma'alot Massacre",
              "The Kiryat Shmona Massacre",
              "The Avivim School Bus Bombing"
            ]
          },
          {
            "id": "q_3_2_d2",
            "question": "Who was the newly elected Lebanese Christian President whose assassination in September 1982 triggered the Phalangist militias' revenge?",
            "answer": "Bashir Gemayel",
            "explanation": "Bashir Gemayel was a close ally of Israel, and his sudden assassination shattered Ariel Sharon's strategic plan of a formal peace treaty.",
            "year": 1982,
            "distractors": [
              "Amin Gemayel",
              "Camille Chamoun",
              "Suleiman Frangieh"
            ]
          },
          {
            "id": "q_3_2_d3",
            "question": "Who was the Israeli Prime Minister who authorised the 1982 invasion of Lebanon, but who resigned in deep depression?",
            "answer": "Menachem Begin",
            "explanation": "Menachem Begin, deeply affected by the mounting death toll of Israeli soldiers and the daily protests, stepped down in 1983.",
            "year": 1982,
            "distractors": [
              "Yitzhak Shamir",
              "Yitzhak Rabin",
              "Ariel Sharon"
            ]
          },
          {
            "id": "q_3_2_d4",
            "question": "What was the specific Arabic acronym for the underground, grassroots leadership committee that coordinated the First Intifada?",
            "answer": "UNLU",
            "explanation": "The Unified National Leadership of the Uprising was highly effective because it decentralised the rebellion, making it impossible to decapitate.",
            "year": 1987,
            "distractors": [
              "PLO",
              "Hamas",
              "DFLP"
            ]
          },
          {
            "id": "q_3_2_d5",
            "question": "Who was the Israeli Defence Minister during the First Intifada who controversially ordered troops to use \"force, might and beatings\"?",
            "answer": "Yitzhak Rabin",
            "explanation": "Yitzhak Rabin's 'Iron Fist' policy severely damaged his international image, but the exhaustion of fighting eventually convinced him to seek peace.",
            "year": 1987,
            "distractors": [
              "Ariel Sharon",
              "Yitzhak Shamir",
              "Moshe Arens"
            ]
          },
          {
            "id": "q_3_2_d6",
            "question": "Which former leader of the militant Stern Gang served as the hardline Prime Minister of Israel during the First Intifada and the 1991 Madrid Peace Conference?",
            "answer": "Yitzhak Shamir",
            "explanation": "Yitzhak Shamir was a hardline Likud politician who had previously co-led the underground Stern Gang. As Prime Minister, he strongly opposed territorial compromise and was pressured by the US to attend the 1991 Madrid Conference.",
            "year": 1991,
            "distractors": [
              "Menachem Begin",
              "Yitzhak Rabin",
              "Shimon Peres"
            ]
          },
          {
            "id": "q_3_2_n11",
            "question": "In which month and year did the First Palestinian Intifada break out?",
            "answer": "December 1987",
            "explanation": "The First Intifada began on 9 December 1987, starting in the Jabalia refugee camp in the Gaza Strip.",
            "year": 1987,
            "distractors": [
              "September 1982",
              "November 1988",
              "September 1993"
            ]
          },
          {
            "id": "q_3_2_n12",
            "question": "What was the name of the Israeli Ambassador in London whose attempted assassination in June 1982 was used as the pretext to invade Lebanon?",
            "answer": "Shlomo Argov",
            "explanation": "Argov was shot by the extremist Abu Nidal Group (which was hostile to Arafat's PLO), but Israel blamed the PLO and launched the invasion.",
            "year": 1982,
            "distractors": [
              "Abba Eban",
              "Ephraim Evron",
              "Simcha Dinitz"
            ]
          },
          {
            "id": "q_3_2_n13",
            "question": "Exactly how many Israeli troops invaded South Lebanon in March 1978 during the limited Operation Litani?",
            "answer": "25,000 troops",
            "explanation": "Israel sent 25,000 troops across the border to clear PLO bases south of the Litani River, withdrawing when UNIFIL arrived.",
            "year": 1978,
            "distractors": [
              "10,000 troops",
              "15,000 troops",
              "50,000 troops"
            ]
          },
          {
            "id": "q_3_2_n14",
            "question": "In which month and year was Yasser Arafat's landmark speech delivered to the UN General Assembly?",
            "answer": "November 1974",
            "explanation": "Arafat spoke to the General Assembly in New York on 13 November 1974, securing a major diplomatic breakthrough.",
            "year": 1974,
            "distractors": [
              "October 1973",
              "December 1975",
              "November 1978"
            ]
          }
        ]
      },
      {
        "id": "subtopic_3_3",
        "embedVideo": "https://youtu.be/nXddsCeaCDw",
        "title": "Topic 3.3: Attempts at a solution, 1974-95",
        "easy": [
          {
            "id": "q_3_3_s2",
            "question": "By renouncing terrorism, Arafat accepted the existence of Israel and officially endorsed a solution based on how many states?",
            "answer": "A two-state solution",
            "explanation": "By officially accepting UN Resolution 242 and the 'two-state solution', the PLO shifted its goal from the destruction of Israel to establishing a Palestinian state.",
            "year": 1988,
            "distractors": [
              "A single democratic state solution",
              "A confederation of Arab and Jewish cantons",
              "A mandate-style international trusteeship"
            ]
          },
          {
            "id": "q_3_3_s3",
            "question": "Which global ideological conflict officially ended in December 1991, removing a major source of funding and weapons for the PLO and Arab states?",
            "answer": "The Cold War",
            "explanation": "The end of the Cold War left the USA as the undisputed global superpower, meaning Arab states could no longer rely on the USSR for protection.",
            "year": 1991,
            "distractors": [
              "The Soviet Collapse",
              "The Gulf War Conflict",
              "The Arab League Split"
            ]
          },
          {
            "id": "q_3_3_s7",
            "question": "Frustrated by the lack of progress in public talks, Israeli and PLO negotiators began secret, back-channel meetings in 1993 in which European capital city?",
            "answer": "Oslo",
            "explanation": "Secret back-channel talks in Norway allowed Israeli and PLO negotiators to speak frankly and make painful compromises away from the media spotlight.",
            "year": 1993,
            "distractors": [
              "Stockholm",
              "Copenhagen",
              "Helsinki"
            ]
          },
          {
            "id": "q_3_3_s8",
            "question": "On the lawn of the White House in September 1993, what historic physical gesture did Rabin and Arafat share?",
            "answer": "A handshake",
            "explanation": "The highly televised handshake between former bitter enemies Yitzhak Rabin and Yasser Arafat symbolised mutual recognition.",
            "year": 1993,
            "distractors": [
              "A signed treaty scroll",
              "A joint press declaration",
              "A formal toast of peace"
            ]
          },
          {
            "id": "q_3_3_s10",
            "question": "In October 1994, becoming only the second Arab state to do so, which neighbouring country signed a full peace treaty with Israel?",
            "answer": "Jordan",
            "explanation": "Encouraged by the PLO's agreements and the promise of US debt relief, King Hussein signed a formal peace treaty with Israel.",
            "year": 1994,
            "distractors": [
              "Syria",
              "Lebanon",
              "Saudi Arabia"
            ]
          },
          {
            "id": "q_3_3_d6",
            "question": "Which Soviet leader's reforms ended the Cold War, halted military aid to Arab states, and co-sponsored the 1991 Madrid Peace Conference?",
            "answer": "Mikhail Gorbachev",
            "explanation": "Mikhail Gorbachev introduced glasnost and perestroika, ending the Cold War. As Soviet influence collapsed, the USSR cut off military funding to Arab states like Syria and co-sponsored the landmark 1991 Madrid Peace Conference with the USA.",
            "year": 1991,
            "distractors": [
              "Boris Yeltsin",
              "Eduard Shevardnadze",
              "Andrei Gromyko"
            ]
          },
          {
            "id": "q_3_3_n1",
            "question": "Who was the Israeli Prime Minister who shook hands with Yasser Arafat on the White House lawn in 1993 to sign the Oslo Accords?",
            "answer": "Yitzhak Rabin",
            "explanation": "Prime Minister Yitzhak Rabin signed the Declaration of Principles alongside Yasser Arafat, a move that won him the Nobel Peace Prize.",
            "year": 1993,
            "distractors": [
              "Yitzhak Shamir",
              "Shimon Peres",
              "Benjamin Netanyahu"
            ]
          },
          {
            "id": "q_3_3_n2",
            "question": "In which year did Israel and the PLO sign the Oslo I Accord, establishing the Palestinian Authority?",
            "answer": "1993",
            "explanation": "The Oslo I Accord (Declaration of Principles) was signed in Washington D.C. on 13 September 1993.",
            "year": 1993,
            "distractors": [
              "1988",
              "1991",
              "1995"
            ]
          },
          {
            "id": "q_3_3_n3",
            "question": "In which European capital city did the secret, back-channel talks between the PLO and Israeli negotiators take place in 1992-93?",
            "answer": "Oslo",
            "explanation": "The secret negotiations were hosted by Norway in Oslo, allowing negotiators to make compromises away from the public eye.",
            "year": 1993,
            "distractors": [
              "Stockholm",
              "Copenhagen",
              "Helsinki"
            ]
          },
          {
            "id": "q_3_3_n4",
            "question": "Who was the US President who hosted the historic Oslo I signing ceremony and handshake on the White House lawn?",
            "answer": "Bill Clinton",
            "explanation": "President Bill Clinton hosted and facilitated the public signing of the Oslo Accords on 13 September 1993.",
            "year": 1993,
            "distractors": [
              "George H.W. Bush",
              "Ronald Reagan",
              "Jimmy Carter"
            ]
          }
        ],
        "medium": [
          {
            "id": "q_3_3_s1",
            "question": "In December 1988, Yasser Arafat made a historic speech renouncing terrorism at a special session of the UN General Assembly held in which Swiss city?",
            "answer": "Geneva",
            "explanation": "Arafat's public renunciation of terrorism successfully opened the door for direct dialogue with the American government.",
            "year": 1988,
            "distractors": [
              "Zurich",
              "Bern",
              "Geneva Session"
            ]
          },
          {
            "id": "q_3_3_s4",
            "question": "In August 1990, Iraqi dictator Saddam Hussein invaded which oil-rich neighbouring country, sparking a massive international crisis?",
            "answer": "Kuwait",
            "explanation": "Saddam Hussein's invasion split the Arab world; while most Arab states joined the US-led coalition, Arafat disastrously chose to support Saddam.",
            "year": 1990,
            "distractors": [
              "Saudi Arabia",
              "Iran",
              "Jordan"
            ]
          },
          {
            "id": "q_3_3_s5",
            "question": "What was the name of the 1991 conflict where a US-led coalition successfully expelled Iraqi forces from this invaded country?",
            "answer": "The Gulf War",
            "explanation": "The swift American victory in the 1991 Gulf War demonstrated total US military dominance, creating a window of opportunity for Washington to dictate peace terms.",
            "year": 1991,
            "distractors": [
              "Operation Desert Storm",
              "The Iraq Conflict",
              "The Kuwait Liberation Campaign"
            ]
          },
          {
            "id": "q_3_3_s6",
            "question": "Emerging as the sole superpower, the USA co-sponsored a major Middle East peace conference in November 1991 in which Spanish capital city?",
            "answer": "Madrid",
            "explanation": "Co-sponsored by the US and the USSR, this 1991 conference was groundbreaking as it was the first time Israelis and Palestinians sat at the same table.",
            "year": 1991,
            "distractors": [
              "Barcelona",
              "Seville",
              "Toledo"
            ]
          },
          {
            "id": "q_3_3_s9",
            "question": "The 1993 agreement led to the creation of a new governing body to administer parts of the West Bank and Gaza; what was its name?",
            "answer": "Palestinian National Authority (PNA)",
            "explanation": "The Oslo Accords established the Palestinian National Authority (PNA) to provide limited self-government.",
            "year": 1993,
            "distractors": [
              "Palestinian National Council (PNC)",
              "Palestinian Authority (PA)",
              "PLO Executive Committee"
            ]
          },
          {
            "id": "q_3_3_d1",
            "question": "Who was the US Secretary of State who made eight intense diplomatic trips to force the parties to attend the 1991 Madrid Conference?",
            "answer": "James Baker",
            "explanation": "James Baker used the momentum of the Gulf War to aggressively pressure both Israelis and Arabs, demonstrating the sheer diplomatic force of the USA.",
            "year": 1991,
            "distractors": [
              "George Shultz",
              "Warren Christopher",
              "Brent Scowcroft"
            ]
          },
          {
            "id": "q_3_3_n5",
            "question": "Which Spanish city hosted the landmark November 1991 peace conference co-sponsored by the US and the USSR?",
            "answer": "Madrid",
            "explanation": "The Madrid Conference of 1991 opened direct bilateral peace talks between Israel and its Arab neighbours.",
            "year": 1991,
            "distractors": [
              "Barcelona",
              "Seville",
              "Toledo"
            ]
          },
          {
            "id": "q_3_3_n6",
            "question": "In which year did Israel and Jordan sign their historic, formal bilateral peace treaty?",
            "answer": "1994",
            "explanation": "Israel and Jordan signed their peace treaty on 26 October 1994, resolving borders and water rights.",
            "year": 1994,
            "distractors": [
              "1979",
              "1993",
              "1995"
            ]
          },
          {
            "id": "q_3_3_n7",
            "question": "Who was the Jordanian monarch who signed the 1994 peace treaty with Israeli Prime Minister Rabin?",
            "answer": "King Hussein",
            "explanation": "King Hussein of Jordan signed the peace treaty, ending the state of war that had existed since 1948.",
            "year": 1994,
            "distractors": [
              "King Abdullah II",
              "Crown Prince Hassan",
              "King Faisal"
            ]
          },
          {
            "id": "q_3_3_n8",
            "question": "Who succeeded Yitzhak Rabin as Prime Minister of Israel immediately after Rabin's assassination in November 1995?",
            "answer": "Shimon Peres",
            "explanation": "Shimon Peres, Rabin's Foreign Minister and peace partner, assumed the premiership to continue the peace process.",
            "year": 1995,
            "distractors": [
              "Benjamin Netanyahu",
              "Ehud Barak",
              "Ariel Sharon"
            ]
          }
        ],
        "difficult": [
          {
            "id": "q_3_3_d2",
            "question": "Who was the Norwegian Foreign Minister who hosted and mediated the top-secret back-channel talks in 1992-1993?",
            "answer": "Johan J├©rgen Holst",
            "explanation": "Johan J├©rgen Holst provided the secluded, pressure-free environment in Norway absolutely essential for building personal trust.",
            "year": 1993,
            "distractors": [
              "Gro Harlem Brundtland",
              "Thorvald Stoltenberg",
              "Kjell Magne Bondevik"
            ]
          },
          {
            "id": "q_3_3_d3",
            "question": "Under the 1995 Oslo II agreement, exactly what percentage of the West Bank was designated as 'Area A' (under full Palestinian civil and military control)?",
            "answer": "3 percent",
            "explanation": "This tiny fraction demonstrated how little physical territory Israel was initially willing to cede, fuelling massive Palestinian frustration.",
            "year": 1995,
            "distractors": [
              "10 percent",
              "18 percent",
              "22 percent"
            ]
          },
          {
            "id": "q_3_3_d4",
            "question": "On the night he was assassinated in November 1995, what specific song had Yitzhak Rabin just finished singing to a crowd in Tel Aviv?",
            "answer": "The Song of Peace (Shir LaShalom)",
            "explanation": "Singing Shir LaShalom (Song of Peace) was a highly emotional moment for Rabin, making his murder moments later a traumatic national event.",
            "year": 1995,
            "distractors": [
              "The Song of Brotherhood (Shir HaAchva)",
              "The Song of Hope (Hatikvah)",
              "The Song of the Land (Shir HaAdama)"
            ]
          },
          {
            "id": "q_3_3_d5",
            "question": "What was the surname of the Israeli religious extremist who assassinated Yitzhak Rabin?",
            "answer": "Yigal Amir",
            "explanation": "Yigal Amir's bullets shattered the Israeli political consensus, empowering hardliners and fundamentally derailing the Oslo Accords.",
            "year": 1995,
            "distractors": [
              "Baruch Goldstein",
              "Yona Avrushmi",
              "Ami Popper"
            ]
          },
          {
            "id": "q_3_3_d7",
            "question": "Which US President leveraged victory in the 1991 Gulf War and threatened to withhold $10 billion in loan guarantees to force Israel to attend the Madrid Peace Conference?",
            "answer": "George H.W. Bush",
            "explanation": "George H.W. Bush used the diplomatic capital gained from defeating Iraq in the Gulf War to push for a regional peace settlement. He took a tough stance against Israeli settlement expansion, forcing Prime Minister Yitzhak Shamir to the negotiating table in Madrid.",
            "year": 1991,
            "distractors": [
              "Ronald Reagan",
              "Bill Clinton",
              "George W. Bush"
            ]
          },
          {
            "id": "q_3_3_d8",
            "question": "Which founding member of Fatah and future Palestinian President was the key coordinator of the secret PLO negotiations in Norway that culminated in the 1993 Oslo Accords?",
            "answer": "Mahmoud Abbas (Abu Mazen)",
            "explanation": "Mahmoud Abbas (also known as Abu Mazen) was a key Fatah diplomat who directed the back-channel negotiations in Oslo behind the scenes, signing the Declaration of Principles alongside Shimon Peres in Washington.",
            "year": 1993,
            "distractors": [
              "Ahmed Qurei (Abu Ala)",
              "Saeb Erekat",
              "Mahmoud Al-Zahar"
            ]
          },
          {
            "id": "q_3_3_n9",
            "question": "In which Swiss city did the UN General Assembly hold a special session in December 1988 so Yasser Arafat could speak after the US denied him a visa?",
            "answer": "Geneva",
            "explanation": "The UN voted to move the session to Geneva to allow Arafat to deliver his historic speech renouncing terrorism.",
            "year": 1988,
            "distractors": [
              "Zurich",
              "Bern",
              "Lausanne"
            ]
          },
          {
            "id": "q_3_3_n10",
            "question": "Under the 1995 Oslo II Accord, which letter designation was given to West Bank areas under full Israeli military and civil control?",
            "answer": "Area C",
            "explanation": "Area C covered about 60% of the West Bank, encompassing Jewish settlements, military zones, and state lands under full Israeli control.",
            "year": 1995,
            "distractors": [
              "Area A",
              "Area B",
              "Area D"
            ]
          },
          {
            "id": "q_3_3_n11",
            "question": "In which month and year was Israeli Prime Minister Yitzhak Rabin assassinated at a peace rally in Tel Aviv?",
            "answer": "November 1995",
            "explanation": "Yitzhak Rabin was shot on 4 November 1995 by Yigal Amir, an Israeli extremist who opposed the Oslo Accords.",
            "year": 1995,
            "distractors": [
              "September 1993",
              "October 1994",
              "September 1995"
            ]
          },
          {
            "id": "q_3_3_n12",
            "question": "Who was the Iraqi dictator whose August 1990 invasion of Kuwait split the Arab coalition and forced the PLO into isolation?",
            "answer": "Saddam Hussein",
            "explanation": "Saddam Hussein invaded Kuwait, and Arafat's decision to support him lost the PLO the financial backing of Gulf oil states, forcing Arafat to negotiate.",
            "year": 1990,
            "distractors": [
              "Tariq Aziz",
              "Hasan al-Bakr",
              "King Faisal"
            ]
          }
        ]
      }
    ]
  }
];
const EXAM_SKILLS_DATA = {
  "1.1a": {
    "topicCode": "1.1",
    "question": "Explain the importance of the bombing of the King David Hotel for the end of the British Mandate.",
    "clue1": "Think about the impact on British public opinion and morale back home.",
    "clue2": "Think about the financial/military cost and Britain's decision to hand the problem to the UN.",
    "keywords": ["King David Hotel", "British morale", "91 deaths", "UN", "1947"],
    "answer": "<strong>Point 1:</strong> The bombing was highly important because it destroyed British public morale. The death of 91 people, including British administrators, generated massive outrage back in Britain, leading to heavy domestic pressure on the government to bring their soldiers home rather than continuing to fight a bloody Jewish insurgency.<br><br><strong>Point 2:</strong> It was also important because it proved the Mandate was unworkable. The severity of the Irgun attack highlighted that the 100,000 British troops stationed there could not keep the peace, convincing the exhausted British government to give up and hand the Palestine problem over to the UN in February 1947."
  },
  "1.1b": {
    "topicCode": "1.1",
    "question": "Explain the importance of UN Resolution 181 for the creation of Israel.",
    "clue1": "Think about the international legal recognition it gave to the Zionist cause.",
    "clue2": "Think about how the Arab rejection of it triggered the 1948 civil war.",
    "keywords": ["UN Resolution 181", "Jewish state", "partition plan", "civil war", "legitimacy"],
    "answer": "<strong>Point 1:</strong> UN Resolution 181 was important because it provided international legal backing for a Jewish state. By voting to partition Palestine and allocate 55% of the land to the Jews, the international community officially endorsed the Zionist dream, giving David Ben-Gurion the legitimacy to declare the State of Israel in May 1948.<br><br><strong>Point 2:</strong> It was also important because it directly triggered the 1948-49 Arab-Israeli War. Because the Arab states and Palestinian leadership completely rejected the partition plan as unfair, violence immediately broke out, forcing the Jewish forces to rapidly organise and conquer their designated territory to ensure the new state survived."
  },
  "1.2a": {
    "topicCode": "1.2",
    "question": "Explain the importance of the creation of the Israeli Defence Forces for the survival of the new state of Israel.",
    "clue1": "Think about how it united divided paramilitary groups under one central command.",
    "clue2": "Think about the role of conscription in fighting the Arab armies.",
    "keywords": ["IDF", "co-ordinated defence", "conscription", "invading Arab armies"],
    "answer": "<strong>Point 1:</strong> The creation of the IDF was important because it united various rival Jewish paramilitary groups. By bringing together the Haganah, Irgun, and Lehi under a single, central command structure, David Ben-Gurion prevented an internal Jewish civil war and ensured Israel could fight a co-ordinated defence.<br><br><strong>Point 2:</strong> It was also important because it allowed Israel to rapidly mobilise its population. By introducing mandatory conscription for both men and women, the IDF grew its forces from around 35,000 to over 100,000 troops, giving Israel the numerical strength needed to ultimately defeat the five invading Arab armies in 1948-49."
  },
  "1.3a": {
    "topicCode": "1.3",
    "question": "Explain the importance of the Suez Crisis (1956) for Israel's security.",
    "clue1": "Think about the destruction of Fedayeen bases in the Sinai and the arrival of UN peacekeepers.",
    "clue2": "Think about the reopening of the Straits of Tiran for Israel's economy.",
    "keywords": ["Suez Crisis", "Fedayeen bases", "UNEF", "Straits of Tiran", "Eilat"],
    "answer": "<strong>Point 1:</strong> The Suez Crisis was highly important for Israeli security because it successfully stopped cross-border terrorism for a decade. By rapidly conquering the Sinai Peninsula, the IDF destroyed the Fedayeen guerrilla bases; when Israel withdrew, the UN stationed peacekeeping troops (UNEF) on the border, creating a secure buffer zone.<br><br><strong>Point 2:</strong> It was also important because it secured Israel's economic survival. Egypt had previously blockaded the Straits of Tiran, but the outcome of the crisis forced the waterway to be reopened, allowing Israel to safely import vital goods like oil into its southern port of Eilat."
  },
  "2.1a": {
    "topicCode": "2.1",
    "question": "Explain the importance of the closure of the Straits of Tiran for the outbreak of the Six Day War.",
    "clue1": "Think about the economic strangulation of Israel (oil).",
    "clue2": "Think about how Israel had previously warned this would be treated as an act of war.",
    "keywords": ["Straits of Tiran", "blockade", "Eilat", "Iranian oil", "pre-emptive strike"],
    "answer": "<strong>Point 1:</strong> Nasser's closure of the Straits was important because it threatened Israel with economic strangulation. The blockade cut off Israel's only southern route to the Red Sea via Eilat, stopping vital imports of Iranian oil, which convinced the Israeli government that their national survival was at immediate risk.<br><br><strong>Point 2:</strong> It was also important because it provided Israel with the absolute justification for a pre-emptive strike. Israel had explicitly warned the international community in 1956 that closing the Straits would be treated as an act of war, so when Nasser closed them in May 1967, it directly triggered the Israeli Air Force to launch their devastating surprise attack on June 5th."
  },
  "2.2a": {
    "topicCode": "2.2",
    "question": "Explain the importance of the occupied territories for Arab-Israeli relations after the Six Day War.",
    "clue1": "Think about how the land provided Israel with defensive buffer zones.",
    "clue2": "Think about the Arab League's reaction at the Khartoum conference (The 'Three Nos').",
    "keywords": ["occupied territories", "buffer zones", "Three Nos", "Khartoum"],
    "answer": "<strong>Point 1:</strong> The occupied territories were important because they drastically altered the strategic military balance. By holding the Sinai Peninsula and the Golan Heights, Israel gained massive physical buffer zones, meaning any future Arab invasion would have to cross heavily fortified, difficult terrain before reaching Israeli civilian centres.<br><br><strong>Point 2:</strong> They were also important because they permanently hardened Arab hostility towards Israel. Because Israel refused to return the lands (including the West Bank and Gaza) without a formal peace treaty, the Arab League issued the defiant 'Three Nos' at the Khartoum conference, ensuring decades of diplomatic stalemate and continued conflict."
  },
  "2.3a": {
    "topicCode": "2.3",
    "question": "Explain the importance of the Yom Kippur War (1973) for diplomatic negotiations in the Middle East.",
    "clue1": "Think about how it shattered the myth of Israeli invincibility.",
    "clue2": "Think about the involvement of the USA and the 'Oil Weapon'.",
    "keywords": ["Yom Kippur War", "invincibility", "shuttle diplomacy", "Kissinger", "Oil Weapon"],
    "answer": "<strong>Point 1:</strong> The Yom Kippur War was important because it broke the psychological deadlock. Although Israel won militarily, the initial shock and heavy casualties shattered the myth of Israeli invincibility, while Egypt restored its national pride. This made both sides realise that military force alone could not guarantee security, pushing them towards negotiations.<br><br><strong>Point 2:</strong> It was also important because it forced massive US intervention. The Arab use of the 'Oil Weapon' (the OPEC embargo) caused a global economic crisis, forcing US Secretary of State Henry Kissinger to urgently engage in 'shuttle diplomacy' to stabilise the region, paving the way for the Camp David Accords."
  },
  "3.1a": {
    "topicCode": "3.1",
    "question": "Explain the importance of Sadat's visit to Israel (1977) for the peace process.",
    "clue1": "Think about how addressing the Knesset broke the psychological barrier.",
    "clue2": "Think about how it led to the Camp David Accords.",
    "keywords": ["Sadat", "Knesset", "psychological barrier", "Camp David", "Jimmy Carter"],
    "answer": "<strong>Point 1:</strong> Sadat's visit was highly important because it shattered the psychological barrier between Arabs and Israelis. By becoming the first Arab leader to travel to Jerusalem and address the Israeli parliament (the Knesset), Sadat officially recognised Israel's right to exist, directly violating the Arab League's 'Three Nos'.<br><br><strong>Point 2:</strong> It was also important because it built the vital trust needed for a formal treaty. By proving to the deeply suspicious Israeli public that Egypt genuinely desired peace, Sadat laid the diplomatic groundwork that allowed US President Jimmy Carter to successfully mediate the Camp David Accords in 1978."
  },
  "3.2a": {
    "topicCode": "3.2",
    "question": "Explain the importance of PLO activities in Lebanon for Israeli security.",
    "clue1": "Think about the creation of 'Fatahland' and cross-border rocket attacks.",
    "clue2": "Think about how it provoked the massive 1982 invasion of Lebanon.",
    "keywords": ["Lebanon", "rocket attacks", "Ariel Sharon", "Operation Peace for Galilee", "security threat"],
    "answer": "<strong>Point 1:</strong> PLO activities in Lebanon were highly important because they created an intolerable border threat for Israel. After being expelled from Jordan, the PLO set up a 'state within a state' in southern Lebanon, using it as a base to launch constant Katyusha rocket attacks and guerrilla raids into northern Israeli farming communities.<br><br><strong>Point 2:</strong> It was also important because it directly provoked full-scale war. The constant security threat, combined with the attempted assassination of an Israeli ambassador, gave Defence Minister Ariel Sharon the justification to launch 'Operation Peace for Galilee' in 1982, an invasion intended to destroy the PLO infrastructure permanently."
  },
  "3.3a": {
    "topicCode": "3.3",
    "question": "Explain the importance of the end of the Cold War for the peace process in the Middle East.",
    "clue1": "Think about how it removed Soviet military and financial backing for Arab states and the PLO.",
    "clue2": "Think about how it left the USA as the sole global superpower to broker talks.",
    "keywords": ["Cold War", "Soviet Union", "Arafat", "superpower", "Madrid Peace Conference"],
    "answer": "<strong>Point 1:</strong> The end of the Cold War was highly important because it cut off vital superpower backing for the PLO and Arab states. With the collapse of the Soviet Union in 1991, Syria and the PLO could no longer rely on Moscow for military aid, financial loans, or diplomatic protection at the UN, forcing Yasser Arafat to adopt a much more pragmatic, peaceful stance.<br><br><strong>Point 2:</strong> It was also important because it left the USA as the unchallenged global superpower. This allowed Washington to aggressively pressure both Israel and Arab nations to attend the Madrid Peace Conference in November 1991, establishing the first direct, face-to-face negotiations between the parties in history."
  },
  "3.3b": {
    "topicCode": "3.3",
    "question": "Explain the importance of the Oslo Accords (1993) for attempts to find a solution to the conflict in the Middle East.",
    "clue1": "Think about the mutual recognition between Israel and the PLO.",
    "clue2": "Think about the establishment of the Palestinian National Authority and limited self-government.",
    "keywords": ["Oslo Accords", "mutual recognition", "PLO", "Palestinian National Authority", "PNA"],
    "answer": "<strong>Point 1:</strong> The Oslo Accords were highly important because they achieved historic mutual recognition. By signing the Accords, the government of Israel formally recognized the PLO as the legitimate representative of the Palestinian people, and the PLO recognized Israel's right to exist, ending decades of total rejectionism.<br><br><strong>Point 2:</strong> They were also important because they created the framework for Palestinian self-government. The Accords established the Palestinian National Authority (PNA) to administer civil affairs and security in Gaza and parts of the West Bank, moving the peace process from a theoretical debate to practical, on-the-ground self-rule."
  },
  "p_2018_q3_a": {
    "question": "Explain the importance of Nasser for leadership of the Arab world.",
    "clue1": "Explain his promotion of Pan-Arabism and how his nationalisation of the Suez Canal made him a hero.",
    "clue2": "Explain how this led to the creation of the United Arab Republic (UAR) in 1958.",
    "keywords": ["Pan-Arabism", "Suez Canal", "United Arab Republic", "Nasser"],
    "answer": "<strong>Point 1:</strong> Nasser's leadership was important because he championed Pan-Arabism, which aimed to unite Arab countries against Western influence. His bold stance against Western imperialism during the Suez Crisis, especially after nationalising the Suez Canal in 1956, made him a legendary figure across the Arab world.<br><br><strong>Point 2:</strong> It was also important because it led to concrete political unions. His popularity and influence were so great that Syria agreed to merge with Egypt to form the United Arab Republic (UAR) in 1958, demonstrating his role as the undisputed leader of the Arab national movement."
  },
  "p_2019_q3_b": {
    "question": "Explain the importance of the actions of the USSR and the USA for the outbreak of the Six Day War (1967).",
    "clue1": "Explain how the USSR falsely informed Syria that Israel was massing troops, triggering Nasser to act.",
    "clue2": "Explain how US financial and military backing gave Israel confidence.",
    "keywords": ["USSR", "false intelligence", "blockade", "Straits of Tiran", "pre-emptive strike"],
    "answer": "<strong>Point 1:</strong> The actions of the USSR were highly important because they triggered the immediate crisis. In May 1967, Soviet intelligence falsely informed Egypt and Syria that Israel was massing troops on the Syrian border, which prompted Nasser to mobilize 100,000 troops, expel UN peacekeepers, and blockade the Straits of Tiran.<br><br><strong>Point 2:</strong> The actions of the USA were also important because they shaped Israel's military readiness. While the US tried to resolve the blockade diplomatically, their extensive financial and military backing gave Israel the confidence that they could launch a pre-emptive strike without losing superpower support."
  },
  "p_2020_q3_b": {
    "question": "Explain the importance of the Law of Return for the development of the state of Israel.",
    "clue1": "Detail how granting citizenship to any Jew worldwide triggered massive demographic expansion.",
    "clue2": "Explain how this immigration provided essential manpower for the economy and the IDF.",
    "keywords": ["Law of Return", "immigration", "refugees", "demographic shift", "IDF"],
    "answer": "<strong>Point 1:</strong> The Law of Return (1950) was important because it sparked massive demographic growth. By granting any Jew in the world the legal right to settle in Israel and receive immediate citizenship, it attracted hundreds of thousands of immigrants, including Holocaust survivors and Jewish refugees expelled from Arab lands.<br><br><strong>Point 2:</strong> It was also important because it secured the country's military and economic survival. The influx of new citizens provided the essential manpower needed to build a viable economy, settle border areas, and fill the reserves of the newly created Israeli Defence Forces (IDF) for national defence."
  },
  "p_2020_q3_c": {
    "question": "Explain the importance of Kissinger's 'shuttle diplomacy' for diplomatic negotiations in the Middle East.",
    "clue1": "Explain how Kissinger flying between capitals secured disengagement treaties after the Yom Kippur War.",
    "clue2": "Explain how this enabled the reopening of the Suez Canal and laid the groundwork for Camp David.",
    "keywords": ["Yom Kippur War", "shuttle diplomacy", "Sinai I", "Suez Canal", "Camp David"],
    "answer": "<strong>Point 1:</strong> Kissinger's shuttle diplomacy was important because it succeeded in separating hostile armies after the 1973 Yom Kippur War. By flying between Tel Aviv, Cairo, and Damascus, Kissinger brokered disengagement treaties (like Sinai I and Sinai II), reducing the risk of a new war.<br><br><strong>Point 2:</strong> It was also important because it brought Egypt into the American diplomatic orbit, bypassing the Soviets. This process reopened the Suez Canal in 1975 and established the trust and diplomatic channels that directly laid the groundwork for the 1978 Camp David Accords."
  },
  "p_2022_q3_a": {
    "question": "Explain the importance of territorial changes in the aftermath of the 1948-49 war for Palestinians.",
    "clue1": "Detail how Israel expanded beyond the UN partition borders, leaving no land for a Palestinian state.",
    "clue2": "Detail how Jordan annexed the West Bank and Egypt took Gaza, creating 700,000 stateless refugees.",
    "keywords": ["partition borders", "Nakba", "refugees", "annexed", "West Bank"],
    "answer": "<strong>Point 1:</strong> The territorial changes were important because they completely prevented the creation of an independent Palestinian state. Israel captured 78% of former Palestine--well beyond the 55% proposed by UN Resolution 181--leaving no continuous territory under Palestinian control.<br><br><strong>Point 2:</strong> They were also important because they led to the fragmentation and displacement of the population. Jordan annexed the West Bank and East Jerusalem, Egypt occupied Gaza, and over 700,000 Palestinians became stateless refugees, scattered in camps across neighboring countries under UNRWA care."
  },
  "p_2022_q3_b": {
    "question": "Explain the importance of the PFLP airplane hijacks (1970) for international attitudes towards the Palestine issue.",
    "clue1": "Explain how blowing up international jets succeeded in forcing the world to look at the Palestinian cause.",
    "clue2": "Explain how it deteriorated their reputation by associating them with global terrorism.",
    "keywords": ["hijackings", "Dawson's Field", "refugee crisis", "global terrorism", "alienating"],
    "answer": "<strong>Point 1:</strong> The Dawson's Field hijackings were important because they dramatically forced the Palestinian issue onto the global stage. By blowing up three empty Western commercial jets on live television, the PFLP captured international media attention, making it impossible for the world to ignore the refugee crisis.<br><br><strong>Point 2:</strong> However, they were also important because they severely damaged international sympathy for their cause. The spectacular acts of violence associated the Palestinian national movement with global terrorism, alienating many Western governments and turning public opinion against the PLO."
  },
  "p_2022_q3_c": {
    "question": "Explain the importance of the Yom Kippur War (1973) for Israel's relations with Egypt.",
    "clue1": "Explain how the surprise Egyptian attack shattered the myth of Israeli invincibility.",
    "clue2": "Explain how restoring Egyptian pride enabled Sadat to negotiate peace from a position of strength.",
    "keywords": ["surprise attack", "invincibility", "restored pride", "Sadat", "peace treaty"],
    "answer": "<strong>Point 1:</strong> The war was important because it shattered the myth of Israeli invincibility. Egypt's initial success in crossing the Suez Canal and breaching the Bar Lev Line shocked Israel, making them realize that military occupation of the Sinai could not guarantee security.<br><br><strong>Point 2:</strong> It was also important because it restored Egyptian military honour. This restored pride gave President Sadat the domestic and Arab backing to pursue diplomatic negotiations, enabling him to offer peace to Israel from a position of strength, which ultimately led to the 1979 peace treaty."
  },
  "p_2023_q3_a": {
    "question": "Explain the importance of the end of the British Mandate (1948) for the creation of Israel.",
    "clue1": "Explain how the exhausted British withdrawal created a sudden power vacuum.",
    "clue2": "Explain how this allowed Ben-Gurion to declare the State of Israel, triggering the Arab invasion.",
    "keywords": ["power vacuum", "withdrawal", "Ben-Gurion", "declaration", "Arab invasion"],
    "answer": "<strong>Point 1:</strong> The end of the Mandate was highly important because it created a sudden power vacuum in Palestine. As the last British troops withdrew on May 14, 1948, the legal and administrative authority vanished, leaving the Zionist leadership free to act.<br><br><strong>Point 2:</strong> It was also important because it allowed David Ben-Gurion to immediately declare the establishment of the State of Israel. This declaration was the official realization of the Zionist goal, but it also served as the immediate trigger for the invasion by five Arab armies the next day."
  },
  "p_2023_q3_b": {
    "question": "Explain the importance of UN Resolution 242 (1967) for relations between Israel and the Arab world after the Six Day War.",
    "clue1": "Explain the 'Land for Peace' formula, and how the ambiguous wording failed to secure peace.",
    "clue2": "Explain how the Arab League responded with the 'Three Nos' at Khartoum.",
    "keywords": ["Resolution 242", "Land for Peace", "ambiguity", "Three Nos", "Khartoum"],
    "answer": "<strong>Point 1:</strong> Resolution 242 was important because it established the 'Land for Peace' framework. It called for the withdrawal of Israeli forces in exchange for Arab recognition of Israel. However, its deliberate ambiguity (the English text omitted 'the' before 'territories') allowed both sides to interpret it differently, preventing a settlement.<br><br><strong>Point 2:</strong> It was also important because it highlighted the diplomatic deadlock. Instead of accepting the resolution, the Arab League issued the Khartoum Resolution ('Three Nos': no peace, no recognition, no negotiation), cementing a state of cold war for the next decade."
  },
  "p_2023_q3_c": {
    "question": "Explain the importance of Arafat renouncing terrorism (1988) for attempts to find a solution in the Middle East.",
    "clue1": "Detail how his historic speech in Geneva met the preconditions set by the USA.",
    "clue2": "Explain how this enabled America to open official diplomatic channels with the PLO.",
    "keywords": ["renunciation", "preconditions", "dialogue", "negotiating partner", "PLO"],
    "answer": "<strong>Point 1:</strong> Arafat's renunciation of terrorism was important because it marked a major shift in PLO policy. By publicly renouncing violence, recognizing Israel's right to exist, and accepting UN Resolutions 242 and 338, the PLO moved away from its militant past toward diplomacy.<br><br><strong>Point 2:</strong> It was also important because it met the strict preconditions required by the United States. This enabled the US government to open official diplomatic channels with the PLO, bringing the Palestinians into the international peace process, which led to the Oslo Accords."
  },
  "p_2024_q3_a": {
    "question": "Explain the importance of Nasser for tension in the Middle East in the years 1955-63.",
    "clue1": "Detail his signing of the Czech Arms Deal and his nationalisation of the Suez Canal.",
    "clue2": "Explain how this enraged Western powers and escalated the Cold War proxy conflict.",
    "keywords": ["Czech Arms Deal", "Suez Crisis", "Western powers", "Cold War", "proxy conflict"],
    "answer": "<strong>Point 1:</strong> Nasser was highly important because his actions escalated regional military tension. By signing the Czech Arms Deal in 1955 and nationalising the Suez Canal in 1956, he challenged Western hegemony, which directly triggered the Suez Crisis (the joint British, French, and Israeli invasion of Egypt).<br><br><strong>Point 2:</strong> He was also important because he brought the Cold War directly into the Middle East. By aligning Egypt with the Soviet Union, he provoked the US to counter Soviet influence, escalating regional proxy conflicts and turning the Arab-Israeli dispute into a global superpower struggle."
  },
  "p_2024_q3_b": {
    "question": "Explain the importance of the Six Day War (1967) for Israel's security.",
    "clue1": "Explain how capturing the Sinai, West Bank, and Golan Heights eliminated immediate threats.",
    "clue2": "Explain how these captured lands provided massive physical 'buffer zones' against future invasions.",
    "keywords": ["pre-emptive", "air strike", "buffer zones", "Sinai", "Golan Heights"],
    "answer": "<strong>Point 1:</strong> The Six Day War was highly important because it eliminated immediate military threats. Israel's pre-emptive air strike destroyed the Egyptian, Syrian, and Jordanian air forces on the ground, proving Israel's qualitative military superiority and securing its airspace.<br><br><strong>Point 2:</strong> It was also important because it gave Israel immense strategic depth. Capturing the Sinai, the West Bank, and the Golan Heights provided Israel with physical buffer zones. Hostile Arab armies were pushed hundreds of miles away from major Israeli cities, making a surprise invasion much harder."
  },
  "p_2024_q3_c": {
    "question": "Explain the importance of the Israel-Jordan peace treaty (1994) for peace in the Middle East.",
    "clue1": "Explain how it built on the momentum of the Oslo Accords, normalising relations.",
    "clue2": "Explain how it secured Israel's longest eastern border, proving bilateral peace was possible.",
    "keywords": ["peace treaty", "Jordan", "Oslo Accords", "normalise", "bilateral"],
    "answer": "<strong>Point 1:</strong> The 1994 treaty was important because it built on the momentum of the Oslo Accords. Following Israel's mutual recognition with the PLO, Jordan felt empowered to normalize relations, becoming only the second Arab nation to sign a peace treaty with Israel.<br><br><strong>Point 2:</strong> It was also important because it secured Israel's eastern flank. The treaty resolved long-standing land and water disputes and formally secured Israel's longest border, proving that stable, bilateral peace agreements could be reached between Israel and moderate Arab states."
  }
};

const CONSEQUENCE_SKILLS_DATA = {
  "1.1a": {
    "topicCode": "1.1",
    "question": "Explain one consequence of the bombing of the King David Hotel (1946).",
    "clue": "Think about how it affected British public opinion and the decision to hand the Mandate to the UN.",
    "keywords": ["Irgun", "91 deaths", "UN", "1947", "Mandate"],
    "answer": "<strong>Option 1 (British Withdrawal Decision):</strong> One consequence was that it shattered British resolve to maintain the Mandate. The bombing of the administrative headquarters by the Irgun resulted in 91 deaths, creating immense domestic pressure in Britain to withdraw and hand the Palestine problem over to the UN in 1947.<br><br><strong>Option 2 (Fortified Security Zones):</strong> Another consequence was the locking down of Jerusalem. The destruction forced the British to turn the city into heavily fortified security zones and impose strict martial law, signaling the collapse of normal civil administration under the Mandate."
  },
  "1.1b": {
    "topicCode": "1.1",
    "question": "Explain one consequence of UN Resolution 181 (1947).",
    "clue": "Think about the outbreak of violence between Arab and Jewish populations.",
    "keywords": ["Resolution 181", "civil war", "partition plan", "invading Arab armies"],
    "answer": "<strong>Option 1 (Outbreak of Civil War):</strong> One consequence was the immediate outbreak of civil war in Palestine. Because the Arab leadership rejected the partition plan under Resolution 181, fighting erupted between Jewish and Arab communities as the British prepared to leave.<br><br><strong>Option 2 (Arab Invasion Trigger):</strong> Another consequence was the invasion of the newly declared state of Israel by invading Arab armies in May 1948, who sought to prevent the implementation of the UN partition plan by military force."
  },
  "1.2a": {
    "topicCode": "1.2",
    "question": "Explain one consequence of the creation of the Israeli Defence Forces (1948).",
    "clue": "Think about how it consolidated separate paramilitary groups under a single command.",
    "keywords": ["IDF", "Haganah", "Irgun", "Lehi", "coordinated defence"],
    "answer": "<strong>Option 1 (Consolidation of Paramilitary Groups):</strong> One consequence was the unification of the Jewish paramilitary forces. David Ben-Gurion ordered that rival groups like the Haganah, Irgun, and Lehi be dissolved and integrated into the IDF to ensure a single central command.<br><br><strong>Option 2 (Defeat of Invading Armies):</strong> Another consequence was that it enabled a coordinated defence of the new state. The centralized structure allowed Israel to deploy troops efficiently, successfully repelling the invading Arab forces."
  },
  "1.2b": {
    "topicCode": "1.2",
    "question": "Explain one consequence of the Law of Return (1950).",
    "clue": "Think about the demographic shift and immigration into Israel.",
    "keywords": ["Law of Return", "immigration", "refugees", "demographic shift"],
    "answer": "<strong>Option 1 (Demographic Expansion):</strong> One consequence was a massive demographic shift. The Law of Return of 1950 sparked huge waves of immigration, allowing hundreds of thousands of Jewish refugees from post-war Europe and Arab lands to settle.<br><br><strong>Option 2 (Military and Economic Strength):</strong> Another consequence was the expansion of Israel's military and workforce. The massive influx of new immigrants provided vital manpower for the economy and reserves for the IDF."
  },
  "1.3a": {
    "topicCode": "1.3",
    "question": "Explain one consequence of the Israeli raid on Gaza in 1955.",
    "clue": "Think about how it affected President Nasser and his military alignment.",
    "keywords": ["Gaza", "Nasser", "Soviet arms", "Czechoslovak arms deal"],
    "answer": "<strong>Option 1 (Czech Arms Deal):</strong> One consequence was that it pushed Egypt to sign the Czechoslovak arms deal. The devastating Israeli raid on Gaza exposed the weakness of Egypt's army, prompting Nasser to seek Soviet arms for defence.<br><br><strong>Option 2 (Rise of Fedayeen Raids):</strong> Another consequence was Nasser's formal sponsorship of Palestinian Fedayeen raids. Humiliated by the raid, Nasser set up state-funded sabotage bases to strike back at Israel."
  },
  "1.3b": {
    "topicCode": "1.3",
    "question": "Explain one consequence of the Suez Crisis (1956).",
    "clue": "Think about the deployment of UNEF peacekeepers and the reopening of shipping lanes.",
    "keywords": ["UNEF", "Sinai Peninsula", "Straits of Tiran", "Fedayeen raids"],
    "answer": "<strong>Option 1 (Deployment of UNEF):</strong> One consequence was the deployment of United Nations peacekeepers (UNEF) in the Sinai Peninsula. This successfully stopped Palestinian Fedayeen raids across the border for a decade.<br><br><strong>Option 2 (Reopening Straits of Tiran):</strong> Another consequence was the reopening of the Straits of Tiran to Israeli shipping, allowing Eilat to import oil and goods safely."
  },
  "2.1a": {
    "topicCode": "2.1",
    "question": "Explain one consequence of the Cairo Conference (1964).",
    "clue": "Think about the establishment of the PLO and the Syrian water diversion plan.",
    "keywords": ["Cairo Conference", "PLO", "Arab leaders", "national aspirations"],
    "answer": "<strong>Option 1 (Creation of the PLO):</strong> One consequence was the founding of the PLO. Arab leaders at the Cairo Conference established this unified body to represent Palestinian national aspirations and coordinate the struggle.<br><br><strong>Option 2 (River Jordan Water Plan):</strong> Another consequence was the Arab plan to divert the headwaters of the River Jordan, which aimed to cut off Israel's water supply and led directly to border clashes."
  },
  "2.1b": {
    "topicCode": "2.1",
    "question": "Explain one consequence of Israel's raid on Samu (1966).",
    "clue": "Think about how it escalated tensions between Israel and Jordan, and mobilized Arab sentiment.",
    "keywords": ["Samu", "King Hussein", "riots", "defense pact", "Egypt"],
    "answer": "<strong>Option 1 (Destabilisation of Jordan):</strong> One consequence was massive political unrest in Jordan. The destruction of Samu by Israeli forces provoked violent riots among West Bank Palestinians, who accused King Hussein of failing to protect them.<br><br><strong>Option 2 (Jordan-Egypt Defence Pact):</strong> Another consequence was that King Hussein signed a mutual defense pact with Egypt in May 1967, drawing Jordan into the Six Day War."
  },
  "2.2a": {
    "topicCode": "2.2",
    "question": "Explain one consequence of UN Resolution 242 (1967).",
    "clue": "Think about the 'land for peace' framework that became the basis of future talks.",
    "keywords": ["UN Resolution 242", "territories", "peace for land", "diplomatic deadlock"],
    "answer": "<strong>Option 1 (Land for Peace Framework):</strong> One consequence was the establishment of the 'peace for land' formula under UN Resolution 242, which called for withdrawal from occupied territories and became the legal basis for all future negotiations.<br><br><strong>Option 2 (Khartoum Resolution / Three Nos):</strong> Another consequence was the rejection of the resolution by the Arab League at Khartoum, leading to a long diplomatic deadlock."
  },
  "2.2b": {
    "topicCode": "2.2",
    "question": "Explain one consequence of the expulsion of the PLO from Jordan (1970).",
    "clue": "Think about where the PLO moved its base of operations and the effect on that country.",
    "keywords": ["expulsion", "Black September", "Jordan", "Lebanon", "Fatahland"],
    "answer": "<strong>Option 1 (PLO Relocation to Lebanon):</strong> One consequence was the relocation of the PLO to Lebanon. Following their expulsion during Black September, Yasser Arafat's fighters established 'Fatahland' in southern Lebanon.<br><br><strong>Option 2 (Munich Olympics Terror Splinter):</strong> Another consequence was the radicalisation of splinter groups. Frustrated by defeat in Jordan, militants formed Black September to launch terror attacks like the Munich Olympics massacre."
  },
  "2.3a": {
    "topicCode": "2.3",
    "question": "Explain one consequence of Israel's consolidation of control of the occupied territories after 1967.",
    "clue": "Think about the growth of Jewish settlements and the growth of Palestinian resistance.",
    "keywords": ["occupied territories", "Jewish settlements", "West Bank", "obstacle"],
    "answer": "<strong>Option 1 (Growth of Jewish Settlements):</strong> One consequence was the construction of permanent Jewish settlements. This established Israeli control over the West Bank and Gaza, creating a major obstacle to peace.<br><br><strong>Option 2 (Rise of Local Resistance):</strong> Another consequence was the growth of grassroots Palestinian resistance in the occupied territories, laying the groundwork for the First Intifada."
  },
  "2.3b": {
    "topicCode": "2.3",
    "question": "Explain one consequence of the Yom Kippur War (1973).",
    "clue": "Think about how the initial Arab military success shattered the myth of Israeli invincibility and led to shuttle diplomacy.",
    "keywords": ["Yom Kippur War", "invincibility", "restored pride", "shuttle diplomacy", "Kissinger"],
    "answer": "<strong>Option 1 (Kissinger's Shuttle Diplomacy):</strong> One consequence was the launch of shuttle diplomacy by US Secretary of State Henry Kissinger, who brokered disengagement agreements between the hostile forces.<br><br><strong>Option 2 (Restoration of Arab Pride):</strong> Another consequence was the restoration of Egyptian and Syrian military pride. This psychological shift made it possible for President Sadat to eventually negotiate peace."
  },
  "3.1a": {
    "topicCode": "3.1",
    "question": "Explain one consequence of the 1973 oil crisis.",
    "clue": "Think about how OPEC used the oil embargo and its impact on Western economies.",
    "keywords": ["oil crisis", "embargo", "OPEC", "inflation", "recession"],
    "answer": "<strong>Option 1 (Western Economic Recession):</strong> One consequence was a severe global recession. In response to US support for Israel, OPEC declared an oil embargo, triggering record inflation and fuel shortages in the West.<br><br><strong>Option 2 (Shift in Western Foreign Policy):</strong> Another consequence was a shift in Western foreign policy. European nations, vulnerable to the oil crisis, began to distance themselves from Israel."
  },
  "3.1b": {
    "topicCode": "3.1",
    "question": "Explain one consequence of President Sadat's visit to Israel (1977).",
    "clue": "Think about how it broke the diplomatic taboo and led to the Camp David Accords.",
    "keywords": ["Sadat visit", "Jerusalem", "Knesset speech", "psychological barrier", "Camp David"],
    "answer": "<strong>Option 1 (Camp David Accords):</strong> One consequence was the convening of the Camp David summit. The trust built by Sadat's visit enabled President Jimmy Carter to broker the Camp David Accords.<br><br><strong>Option 2 (Arab League Boycott):</strong> Another consequence was Egypt's isolation. The Sadat visit outraged the Arab world, leading to Egypt being expelled from the Arab League."
  },
  "3.2a": {
    "topicCode": "3.2",
    "question": "Explain one consequence of the Israeli invasion of Lebanon (1982).",
    "clue": "Think about the expulsion of the PLO from Beirut and the rise of Hezbollah.",
    "keywords": ["invasion of Lebanon", "Operation Peace for Galilee", "Ariel Sharon", "Hezbollah", "Beirut"],
    "answer": "<strong>Option 1 (Creation of Hezbollah):</strong> One consequence was the rise of Hezbollah. The Israeli invasion of southern Lebanon radicalized the local Shia population, leading to the creation of Hezbollah with Iranian backing.<br><br><strong>Option 2 (PLO Expulsion to Tunis):</strong> Another consequence was the expulsion of Yasser Arafat and the PLO from Beirut. Under a US-brokered deal, PLO fighters evacuated their Lebanon headquarters to Tunis."
  },
  "3.2b": {
    "topicCode": "3.2",
    "question": "Explain one consequence of the First Palestinian Intifada (1987-93).",
    "clue": "Think about how it damaged Israel's international reputation and forced Rabin to seek peace.",
    "keywords": ["First Intifada", "stone-throwing", "Iron Fist policy", "reputation", "Rabin"],
    "answer": "<strong>Option 1 (Rabin's Turn to Peace):</strong> One consequence was Yitzhak Rabin realizing that military force could not end the stones-throwing. The cost of the Iron Fist policy convinced him to seek a negotiated settlement.<br><br><strong>Option 2 (Rise of Hamas):</strong> Another consequence was the founding of Hamas in 1987. Hamas emerged as an Islamist alternative to Yasser Arafat's secular PLO, challenging its leadership of the resistance."
  },
  "3.3a": {
    "topicCode": "3.3",
    "question": "Explain one consequence of Yasser Arafat's renunciation of terrorism at the UN (1988).",
    "clue": "Think about the opening of official dialogue with the USA.",
    "keywords": ["renunciation", "preconditions", "dialogue", "negotiating partner", "PLO"],
    "answer": "<strong>Option 1 (US-PLO Official Dialogue):</strong> One consequence was that the US opened official dialogue with the PLO. Arafat's renunciation of terrorism met the strict US preconditions, recognizing the PLO as a negotiating partner.<br><br><strong>Option 2 (Internal Palestinian Splintering):</strong> Another consequence was a split within the Palestinian national movement. Radical factions rejected Arafat's renunciation, accusing him of selling out the armed struggle."
  },
  "3.3b": {
    "topicCode": "3.3",
    "question": "Explain one consequence of the Oslo Accords (1993).",
    "clue": "Think about what was set up for Palestinian self-government.",
    "keywords": ["Oslo Accords", "Yasser Arafat", "Yitzhak Rabin", "PNA", "limited self-government"],
    "answer": "<strong>Option 1 (Creation of the PNA):</strong> One consequence was the establishment of the Palestinian National Authority (PNA). Under the Oslo Accords, Rabin and Arafat agreed to grant Palestinians limited self-government in Gaza and Jericho.<br><br><strong>Option 2 (Violent Backlash from Extremists):</strong> Another consequence was a deadly backlash. Extremists on both sides launched attacks, culminating in the Hamas suicide bombings and the 1995 assassination of Yitzhak Rabin."
  },
  "p_2018_q1": {
    "topicCode": "1.2",
    "question": "Explain one consequence of the territorial changes following the 1948-49 Arab-Israeli war.",
    "clue": "Think about the impact on the Palestinian Arabs (the Nakba) and the refugee crisis, or Israel's expansion beyond the partition borders.",
    "keywords": ["Nakba", "refugees", "West Bank", "Gaza Strip", "Jordan"],
    "answer": "One consequence was the mass displacement of over 700,000 Palestinian Arabs (the Nakba), who fled their homes and became stateless refugees in neighbouring countries like Jordan and Lebanon. Additionally, Israel expanded its territory by capturing 78% of historic Palestine, while Jordan annexed the West Bank and Egypt took control of Gaza, leaving the Palestinians without a homeland."
  },
  "p_2019_q1": {
    "topicCode": "3.3",
    "question": "Explain one consequence of the Oslo Accords (1993).",
    "clue": "Think about the diplomatic breakthrough (mutual recognition and the PNA) or the violent backlash from extremists.",
    "keywords": ["Oslo Accords", "PLO", "PNA", "suicide bombings", "Yitzhak Rabin"],
    "answer": "One consequence was the historic mutual recognition between Israel and the PLO, which led directly to the creation of the Palestinian National Authority (PNA). This gave Palestinians limited self-rule in Gaza and Jericho for the first time, though it also triggered a violent backlash from Hamas suicide bombings and right-wing Jewish extremists who opposed the accords."
  },
  "p_2020_q1": {
    "topicCode": "3.2",
    "question": "Explain one consequence of the Palestinian Intifada (1987-93).",
    "clue": "Think about the international condemnation of Israel's response, the rise of Hamas, or the push toward the Oslo negotiations.",
    "keywords": ["Intifada", "Iron Fist", "Hamas", "stalemate", "Oslo Accords"],
    "answer": "One consequence was severe damage to Israel's international reputation, as global media broadcasted images of IDF soldiers using harsh 'Iron Fist' tactics against stone-throwing youths. This international pressure, combined with the rise of Hamas, ultimately forced both Israeli and PLO leadership to recognize a military stalemate and begin peace talks."
  },
  "p_2023_q1": {
    "topicCode": "2.2",
    "question": "Explain one consequence of the terrorist attack at the Munich Olympics (1972).",
    "clue": "Think about the negative media attention for the Palestinian cause, or Israel's covert Mossad campaign (Operation Wrath of God).",
    "keywords": ["Munich Olympics", "athletes", "global audience", "airstrikes", "Operation Wrath of God"],
    "answer": "One consequence was the launching of 'Operation Wrath of God' by Israel, a covert Mossad assassination campaign to track down and eliminate Black September operatives across Europe. Additionally, the attack shocked a live television audience of millions, bringing immense media attention to the Palestinian cause but heavily linking it to global terrorism."
  },
  "p_2024_q1": {
    "topicCode": "3.1",
    "question": "Explain one consequence of President Sadat of Egypt's visit to Israel (1977).",
    "clue": "Think about breaking the psychological barrier and the 'Three Nos', or paving the way for the Camp David Accords.",
    "keywords": ["Sadat", "Knesset", "Three Nos", "psychological barrier", "Camp David"],
    "answer": "One consequence was the breaking of the long-standing Arab diplomatic deadlock and the 'Three Nos' of Khartoum. By visiting Jerusalem and addressing the Knesset, Sadat officially recognized Israel, which built the trust necessary for US President Jimmy Carter to broker the Camp David Accords in 1978."
  }
};

const NARRATIVE_SKILLS_DATA = {
  "n1": {
    "keywords": [
      "Resolution 181",
      "Deir Yassin",
      "British Mandate",
      "State of Israel",
      "civil war"
    ],
    "question": "Write a narrative account analysing the key events of 1947-48 that led to the outbreak of the Arab-Israeli War.",
    "events": [
      "The British Mandate ends and the State of Israel is declared.",
      "UN Resolution 181 (1947) partitions Palestine.",
      "Civil war breaks out and the Deir Yassin massacre occurs."
    ],
    "correct": [
      1,
      2,
      0
    ],
    "model": "<strong>Paragraph 1: UN Resolution 181 and Arab Rejection (1947)</strong><br>The road to war began in November 1947 when the United Nations passed Resolution 181, recommending the partition of the British Mandate of Palestine into separate Jewish and Arab states. <strong>While Jewish leaders accepted</strong> the plan, the Palestinian Arabs and neighbouring Arab states rejected it, viewing it as an illegal usurpation of their land. <strong>Consequently</strong>, this diplomatic dispute triggered an immediate civil war within Palestine as both communities fought for control of key towns and roads.<br><br><strong>Paragraph 2: Escalating Civil War and Refugee Displacement (Winter 1947-48)</strong><br><strong>As the British administration prepared for withdrawal</strong>, the civil conflict intensified. Jewish paramilitary forces launched offensive operations to secure the territory allocated by the UN, including capturing key urban centers like Haifa and Jaffa, and the Deir Yassin massacre occurred, causing panic. <strong>This escalation provoked</strong> a severe humanitarian crisis, causing tens of thousands of Palestinian Arabs to flee their homes in fear, while Arab volunteer forces entered Palestine to support the local population.<br><br><strong>Paragraph 3: Declaration of Independence and Conventional Invasion (May 1948)</strong><br><strong>Tensions were pushed to a climax</strong> when the British Mandate officially expired on 14 May 1948, and David Ben-Gurion declared the creation of the State of Israel. <strong>This declaration instantly provoked</strong> an invasion by the regular armies of five neighboring Arab states the very next day. <strong>Ultimately</strong>, this invasion transformed the local civil conflict into the first Arab-Israeli War, shaping the political borders of the region for decades."
  },
  "n2": {
    "keywords": [
      "Gaza",
      "Czechoslovakia",
      "Aswan High Dam",
      "Suez Canal",
      "Protocol of Sèvres"
    ],
    "question": "Write a narrative account analysing the key events of 1955-56 that led to the Suez Crisis.",
    "events": [
      "Nasser nationalises the Suez Canal, leading to the Protocol of Sèvres.",
      "The USA and Britain withdraw funding for the Aswan High Dam.",
      "Israeli attacks on Gaza (1955) prompt Nasser to buy Soviet arms."
    ],
    "correct": [
      2,
      1,
      0
    ],
    "model": "<strong>Paragraph 1: Gaza Raid and Czech Arms Deal (1955)</strong><br>The escalation began in February 1955 when Israel launched a devastating raid on Gaza, killing 38 Egyptian soldiers and exposing the weakness of Egypt's military. <strong>This humiliation prompted</strong> President Nasser to seek modern weaponry from the Soviet bloc, culminating in the Czechoslovakia arms deal. <strong>Consequently</strong>, this influx of weapons altered the regional balance of power, causing immense alarm in Israel and the West.<br><br><strong>Paragraph 2: Aswan Dam and Western Withdrawal (1956)</strong><br><strong>Subsequently</strong>, Nasser sought Western funding to construct the Aswan High Dam to modernize Egypt's economy. <strong>However, Egypt's Soviet alignment angered</strong> the United States and Britain. <strong>This led to</strong> the Western powers suddenly withdrawing their financial backing for the dam project in July 1956, leaving Nasser in a severe political and financial bind.<br><br><strong>Paragraph 3: Nationalisation of the Canal and Sèvres Accord (July-October 1956)</strong><br><strong>Tensions were pushed to a climax</strong> when Nasser retaliated by nationalising the Suez Canal Company, intending to use its transit tolls to fund the dam. <strong>This nationalisation outraged</strong> Britain and France, who conspired with Israel in October 1956 to sign the secret Protocol of Sèvres. <strong>Ultimately</strong>, this secret agreement set the stage for a coordinated military invasion to reclaim the canal and depose Nasser."
  },
  "n3": {
    "keywords": [
      "Black September",
      "Coastal Road Massacre",
      "Operation Litani",
      "Ariel Sharon",
      "Operation Peace for Galilee"
    ],
    "question": "Write a narrative account analysing the key events in the years 1970-82 that led to the Israeli invasion of Lebanon.",
    "events": [
      "The PLO is expelled from Jordan and moves to Lebanon.",
      "The attempted assassination of the Israeli ambassador in London sparks Operation Peace for Galilee.",
      "PLO cross-border raids and the Coastal Road Massacre trigger Operation Litani."
    ],
    "correct": [
      0,
      2,
      1
    ],
    "model": "<strong>Paragraph 1: Expulsion from Jordan and Fatahland (1970-75)</strong><br>The PLO's presence in Lebanon was established after their violent expulsion from Jordan during the Black September conflict of 1970-71. Yasser Arafat and thousands of armed fighters relocated to Lebanon, taking advantage of the weak central government in Beirut. <strong>This influx of militants enabled</strong> the PLO to set up a powerful administrative and military base in southern Lebanon, which became known as 'Fatahland', effectively creating a 'state within a state'.<br><br><strong>Paragraph 2: Cross-Border Raids and Operation Litani (1975-78)</strong><br><strong>Subsequently</strong>, from this new southern Lebanese base, the PLO launched frequent rocket attacks and cross-border raids into northern Israeli towns, including the deadly 1978 Coastal Road Massacre. <strong>These constant guerrilla attacks provoked</strong> heavy Israeli military reprisal strikes and destabilized Lebanon's fragile sectarian balance, contributing directly to the outbreak of the Lebanese Civil War. <strong>Consequently</strong>, Israel formed an alliance with Christian Lebanese militias to counter the growing power of the PLO.<br><br><strong>Paragraph 3: The London Assassination Attempt and Invasion (1982)</strong><br><strong>Finally</strong>, the escalation of border violence reached a breaking point in June 1982 when the attempted assassination of the Israeli ambassador in London was blamed on the PLO. In response, Israel's Defense Minister Ariel Sharon launched a massive invasion, 'Operation Peace for Galilee', driving all the way to Beirut and placing the city under a devastating siege. <strong>This overwhelming military pressure forced</strong> Arafat and the PLO leadership to accept a US-brokered evacuation, <strong>resulting in</strong> their expulsion from Lebanon to Tunis."
  },
  "n4": {
    "keywords": [
      "Yasser Arafat",
      "Gulf War",
      "Yitzhak Rabin",
      "Norway",
      "Oslo Accords"
    ],
    "question": "Write a narrative account analysing the key events of 1988-93 that led to the Oslo Accords.",
    "events": [
      "Arafat renounces terrorism and accepts a two-state solution at the UN (1988).",
      "Secret back-channel meetings in Norway lead to the Declaration of Principles.",
      "The Cold War ends and the USA emerges as the sole superpower pushing for peace."
    ],
    "correct": [
      0,
      2,
      1
    ],
    "model": "<strong>Paragraph 1: UN Speech and the Opening of Dialogue (1988)</strong><br>A major diplomatic shift occurred in 1988 when Yasser Arafat addressed the UN in Geneva, officially renouncing terrorism and accepting a two-state solution based on UN Resolution 242. <strong>This moderate stance enabled</strong> the United States to open a direct diplomatic dialogue with the PLO for the first time. <strong>Consequently</strong>, this dialogue broke the long-standing international isolation of the PLO, although direct talks between Israel and the PLO remained officially forbidden.<br><br><strong>Paragraph 2: The End of the Cold War and Financial Isolation (1989-91)</strong><br><strong>Subsequently</strong>, the diplomatic pressure was intensified by the end of the Cold War and the 1991 Gulf War. The collapse of the Soviet Union stripped the PLO of its primary financial and military backer, while Arafat's support for Saddam Hussein during the Gulf War alienated wealthy Arab Gulf states, leaving the PLO financially bankrupt. <strong>This severe isolation forced</strong> Yasser Arafat to recognize that the PLO had to make major compromises to survive.<br><br><strong>Paragraph 3: Secret Negotiations and Oslo Accords (1992-93)</strong><br><strong>Finally</strong>, the election of Yitzhak Rabin's labor government in 1992 brought a more pragmatic leadership to Israel, which recognized that military force could not halt the First Palestinian Intifada. <strong>This mutual need for a solution led to</strong> secret, back-channel negotiations in Oslo, Norway, in 1993. <strong>Ultimately</strong>, these negotiations resulted in the historic Oslo Accords (Oslo I), establishing mutual recognition and creating the Palestinian National Authority to grant limited self-rule."
  },
  "pn1": {
    "keywords": [
      "Yom Kippur War",
      "Henry Kissinger",
      "Suez Canal",
      "Jerusalem",
      "Anwar Sadat"
    ],
    "question": "Write a narrative account analysing Egypt's relations with Israel in the years 1973-77.",
    "events": [
      "Egypt and Syria launch the surprise Yom Kippur War (1973) against Israel.",
      "Henry Kissinger conducts 'shuttle diplomacy' to broker disengagement agreements.",
      "President Anwar Sadat makes his historic visit to Jerusalem to address the Knesset (1977)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: The Surprise Offensive and Restored Arab Pride (October 1973)</strong><br>Relations between Egypt and Israel began in deep hostility when Sadat launched a surprise offensive in October 1973, triggering the Yom Kippur War. <strong>This sudden assault shattered</strong> the status quo, and although Israel recovered militarily, the initial Arab successes restored Egyptian national pride and prestige. <strong>Consequently</strong>, this restoration of pride created a vital political space that made future diplomatic negotiations with Israel a realistic possibility for the Egyptian leadership.<br><br><strong>Paragraph 2: Kissinger's Shuttle Diplomacy and Disengagements (1974-75)</strong><br><strong>Subsequently</strong>, the high risk of a direct superpower conflict between the USA and the USSR <strong>forced</strong> the United States to intervene actively in regional diplomacy. US Secretary of State Henry Kissinger conducted intensive 'shuttle diplomacy' between Jerusalem and Cairo to defuse the immediate military crisis. <strong>This diplomatic mediation resulted in</strong> the signing of the Sinai I (1974) and Sinai II (1975) disengagement agreements, which separated the hostile forces, reopened the Suez Canal, and began a gradual normalization process.<br><br><strong>Paragraph 3: Sadat's Knesset Speech and Psychological Breakthrough (1977)</strong><br><strong>Finally</strong>, despite these incremental military agreements, a formal diplomatic peace treaty remained stalled, prompting President Sadat to take a revolutionary step to break the deadlock. In November 1977, Sadat made his historic visit to Jerusalem to address the Israeli Knesset directly. <strong>This dramatic gesture broke</strong> the long-standing psychological barrier and taboo of Arab non-recognition of Israel, directly <strong>paving</strong> the way for the Camp David negotiations and a permanent peace treaty."
  },
  "pn2": {
    "keywords": [
      "Dawson's Field",
      "King Hussein",
      "Black September",
      "Lebanon",
      "Munich Olympics"
    ],
    "question": "Write a narrative account analysing the key developments in the Palestinian issue in the years 1970-72.",
    "events": [
      "PFLP hijackings at Dawson's Field trigger Black September in Jordan (1970).",
      "The PLO is expelled from Jordan and moves its headquarters to Lebanon.",
      "Black September terrorists attack the Munich Olympics, killing 11 Israelis (1972)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Dawson's Field and Black September (1970)</strong><br>The Palestinian issue was escalated in September 1970 when the PFLP hijacked four international civilian aircraft and blew up three of them at Dawson's Field in Jordan. <strong>This direct challenge</strong> to Jordan's sovereignty and stability <strong>provoked</strong> King Hussein to launch a massive military offensive against the PLO, a conflict known as Black September. <strong>Consequently</strong>, this civil war ended in the total defeat and expulsion of the Palestinian forces from Jordan by July 1971.<br><br><strong>Paragraph 2: Relocation to Lebanon and Munich Olympics (1971-72)</strong><br><strong>Subsequently</strong>, the expelled PLO fighters were forced to relocate their headquarters and establish a new base of operations in Lebanon. <strong>Furious at their defeat</strong> and displacement, extreme Palestinian militants formed the 'Black September' splinter group. <strong>This culminated in</strong> the hostage crisis at the Munich Olympics in September 1972, where the group seized and murdered 11 Israeli athletes.<br><br><strong>Paragraph 3: International Outrage and Retaliation (1972)</strong><br><strong>Finally</strong>, the Munich massacre shocked the international community as the crisis was broadcast live to 900 million viewers, forcing the unresolved Palestinian issue back onto the global stage. <strong>The outrage generated by this attack prompted</strong> Israel to launch 'Operation Wrath of God', a systematic covert assassination campaign by the Mossad. <strong>Ultimately</strong>, this cycle of violence hardened international attitudes toward the PLO, branding it as a terrorist organization and delaying diplomatic solutions."
  },
  "pn3": {
    "keywords": [
      "Norway",
      "Yasser Arafat",
      "Yitzhak Rabin",
      "PNA",
      "Oslo II"
    ],
    "question": "Write a narrative account analysing the key developments in the negotiations between Israel and the Palestinians in the years 1993-95.",
    "events": [
      "Secret back-channel talks are held in Norway.",
      "Arafat and Rabin sign the Oslo I Accord, creating the PNA (1993).",
      "The Oslo II Accord is signed, dividing the West Bank into Areas A, B, and C (1995)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Oslo I Accords and Mutual Recognition (1993)</strong><br>Negotiations began in early 1993 when Israeli and PLO representatives held secret back-channel negotiations in Norway. <strong>These meetings built</strong> the mutual trust that <strong>enabled</strong> the signing of the Oslo I Accords in September 1993, where Yasser Arafat and Yitzhak Rabin shared a historic handshake. <strong>Consequently</strong>, this agreement established the Palestinian National Authority (PNA) to provide Palestinians with limited self-government in Gaza and Jericho.<br><br><strong>Paragraph 2: Oslo II and Extremist Backlash (1995)</strong><br><strong>Subsequently</strong>, the peace process was expanded in September 1995 with the signing of the Oslo II Accord. <strong>This agreement resulted in</strong> dividing the West Bank into Areas A, B, and C with different levels of Palestinian and Israeli control. <strong>However, these compromises provoked</strong> severe domestic opposition from extremists on both sides, who felt their leaders had betrayed their core principles, leading to Hamas suicide bombings.<br><br><strong>Paragraph 3: Rabin's Assassination and Stagnation (November 1995)</strong><br><strong>Tensions were pushed to breaking point</strong> in November 1995 when a right-wing Jewish extremist assassinated Israeli Prime Minister Yitzhak Rabin at a peace rally. <strong>Rabin's assassination removed</strong> the key Israeli partner committed to the peace process, leading to political instability. <strong>Ultimately</strong>, this loss of leadership, combined with ongoing Hamas violence, halted the momentum of the peace talks and left key issues unresolved."
  },
  "pn4": {
    "keywords": [
      "armistice",
      "IDF",
      "Law of Return",
      "immigration",
      "78%"
    ],
    "question": "Write a narrative account analysing the developments in Israel in the years 1949-54.",
    "events": [
      "Israel gains territory from the 1948 war, creating long, hostile borders.",
      "Israel consolidates its military into the single Israeli Defence Forces (IDF).",
      "Israel passes the Law of Return, triggering mass Jewish immigration (1950)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Post-War Influx and the Law of Return (1949-50)</strong><br>In the immediate aftermath of the 1948-49 war, the newly established state of Israel faced the urgent task of defending and consolidating its borders. Under the armistice agreements of 1949, Israel captured 78% of former Palestine. <strong>However, these new borders</strong> were long, poorly defined, and surrounded by hostile Arab nations, which <strong>triggered</strong> frequent cross-border infiltrations, prompting Israel to pass the Law of Return in 1950 giving any Jew the right to immigrate.<br><br><strong>Paragraph 2: Economic Strain and Austerity (1950-52)</strong><br><strong>Subsequently</strong>, the arrival of hundreds of thousands of new citizens placed an overwhelming strain on the country's weak economy. To manage this population influx, the government was <strong>forced</strong> to implement a strict austerity regime (Tzena), rationing food and fuel. <strong>To house the families</strong>, Israel constructed temporary tent camps and began the rapid development of new towns in rural areas.<br><br><strong>Paragraph 3: Financial Aid and Consolidation (1952-54)</strong><br><strong>Finally</strong>, the economic crisis was slowly stabilized through massive financial injections from the West. The USA provided critical loans, and in 1952, Israel signed a highly controversial Reparations Agreement with West Germany. <strong>This influx of capital enabled</strong> the government to replace the temporary camps with permanent housing, build industrial infrastructure, and modernize the IDF, <strong>ensuring</strong> Israel's long-term survival."
  },
  "pn5": {
    "keywords": [
      "Black September",
      "Fatahland",
      "Coastal Road Massacre",
      "Operation Litani",
      "Operation Peace for Galilee"
    ],
    "question": "Write a narrative account analysing the key developments of the PLO in Lebanon in the years 1970-82.",
    "events": [
      "The PLO is expelled from Jordan and establishes 'Fatahland' in Lebanon.",
      "PLO cross-border rocket attacks and raids trigger conflicts like Operation Litani.",
      "The attempted assassination of the Israeli ambassador in London sparks Operation Peace for Galilee (1982)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Expulsion from Jordan and Fatahland (1970-75)</strong><br>The PLO's presence in Lebanon was established after their violent expulsion from Jordan during the Black September conflict of 1970-71. Yasser Arafat and thousands of armed fighters relocated to Lebanon, taking advantage of the weak central government in Beirut. <strong>This influx of militants enabled</strong> the PLO to set up a powerful administrative and military base in southern Lebanon, which became known as 'Fatahland', effectively creating a 'state within a state'.<br><br><strong>Paragraph 2: Cross-Border Raids and Operation Litani (1975-78)</strong><br><strong>Subsequently</strong>, from this new southern Lebanese base, the PLO launched frequent rocket attacks and cross-border raids into northern Israeli towns, including the deadly 1978 Coastal Road Massacre. <strong>These constant guerrilla attacks provoked</strong> heavy Israeli military reprisal strikes and destabilized Lebanon's fragile sectarian balance, contributing directly to the outbreak of the Lebanese Civil War. <strong>Consequently</strong>, Israel formed an alliance with Christian Lebanese militias to counter the growing power of the PLO.<br><br><strong>Paragraph 3: The London Assassination Attempt and Invasion (1982)</strong><br><strong>Finally</strong>, the escalation of border violence reached a breaking point in June 1982 when the attempted assassination of the Israeli ambassador in London was blamed on the PLO. In response, Israel launched a massive invasion, 'Operation Peace for Galilee', driving all the way to Beirut and placing the city under a devastating siege. <strong>This overwhelming military pressure forced</strong> Arafat and the PLO leadership to accept a US-brokered evacuation, <strong>resulting in</strong> their expulsion from Lebanon to Tunis."
    },
  "n1_war": {
    "keywords": [
      "Ben-Gurion",
      "Haganah",
      "first truce",
      "Czechoslovakia",
      "armistice"
    ],
    "question": "Write a narrative account analysing the key events of the Arab-Israeli War (1948-49).",
    "events": [
      "Prime Minister Ben-Gurion consolidates separate Jewish militias into the Israeli Defence Forces (IDF).",
      "Five invading Arab armies launch a coordinated offensive on the newly declared State of Israel.",
      "A UN-brokered truce enables Israel to import modern weapons from Czechoslovakia and outnumber Arab forces."
    ],
    "correct": [
      1,
      0,
      2
    ],
    "model": "<strong>Paragraph 1: The Arab Invasion and Sovereign Survival (May 1948)</strong><br>The war began on 15 May 1948, the day after David Ben-Gurion declared the independence of Israel, when the regular armies of five Arab nations launched a coordinated invasion. <strong>This invasion threatened</strong> the very survival of the infant state as Egyptian forces advanced in the south and Jordanian troops entered East Jerusalem. <strong>Consequently</strong>, the Jewish population was forced to rapidly organize a desperate, unified national defense to prevent their lines from collapsing.<br><br><strong>Paragraph 2: Military Consolidation and the Creation of the IDF (May 1948)</strong><br><strong>This immediate military crisis prompted</strong> Prime Minister David Ben-Gurion to order the merger of all rival Jewish underground militias, including the Haganah, Irgun, and Lehi. <strong>This consolidation resulted in</strong> the official creation of the single Israeli Defence Forces (IDF) under a central command. <strong>Ultimately</strong>, this unified structure ended political factionalism and allowed the forces to operate with a coordinated military strategy.<br><br><strong>Paragraph 3: The First Truce and Czech Arms Lifeline (June-July 1948)</strong><br><strong>The military deadlock culminated in</strong> a UN-brokered four-week truce in June 1948. Israel actively utilized this period to bypass international arms embargoes, importing modern weapons and fighter planes from <strong>Czechoslovakia</strong>. <strong>This resupply enabled</strong> Israel to double its troop numbers and launch successful counter-offensives, leading to the 1949 armistices which left Israel in control of 78% of former Palestine."
  },
  "n2_war": {
    "keywords": [
      "Nasser",
      "Protocol of Sèvres",
      "Sinai",
      "tripartite",
      "Eisenhower"
    ],
    "question": "Write a narrative account analysing the key events of the Suez Crisis (1956).",
    "events": [
      "Anglo-French paratroopers land at Port Said, but face intense political and economic pressure from the USA.",
      "President Nasser nationalises the Suez Canal to fund the Aswan Dam, blockading the Straits of Tiran.",
      "Israel invades the Sinai Peninsula under the secret Protocol of Sèvres to provide a pretext for Western intervention."
    ],
    "correct": [
      1,
      2,
      0
    ],
    "model": "<strong>Paragraph 1: Nationalisation of the Canal (July 1956)</strong><br>The crisis was triggered in July 1956 when Egyptian President Gamal Abdel Nasser nationalised the Suez Canal Company to fund the Aswan High Dam. <strong>This bold action outraged</strong> Britain and France, who lost control of their commercial assets and oil shipping routes. <strong>Consequently</strong>, the Western powers resolved to use military force to reclaim the canal and depose Nasser, secretly conspiring with Israel to organize a joint campaign.<br><br><strong>Paragraph 2: The Protocol of Sèvres and Sinai Invasion (October 1956)</strong><br><strong>This secret collusion led to</strong> the signing of the Protocol of Sèvres, under which Israel launched a surprise land invasion of the Sinai Peninsula on 29 October. <strong>This planned attack provided</strong> the military pretext for Britain and France to issue an ultimatum demanding both sides withdraw from the canal zone. <strong>Following Nasser's refusal</strong>, Anglo-French forces bombed Egyptian airfields and deployed paratroopers to seize Port Said.<br><br><strong>Paragraph 3: Superpower Intervention and Forced Withdrawal (November 1956)</strong><br><strong>The military operation was brought to a halt</strong> by intense international opposition led by U.S. President Eisenhower. Fearing a direct conflict with the USSR and furious at the distraction from the Hungarian Uprising, the USA threatened to crash the British economy. <strong>This decisive economic pressure forced</strong> a rapid ceasefire and a humiliating withdrawal of Western and Israeli troops, <strong>resulting in</strong> a massive boost to Nasser's prestige as a Pan-Arab hero."
  },
  "n3_war": {
    "keywords": [
      "Operation Focus",
      "airfields",
      "Sinai",
      "Golan Heights",
      "Resolution 242"
    ],
    "question": "Write a narrative account analysing the key events of the Six Day War (1967).",
    "events": [
      "Israeli ground forces capture the West Bank and East Jerusalem, reunifying the city under Jewish control.",
      "The IDF launches Operation Focus, a preemptive air strike that destroys the Egyptian Air Force on the ground.",
      "Israeli troops scale the Golan Heights to defeat Syrian forces, securing a ceasefire on 10 June."
    ],
    "correct": [
      1,
      2,
      0
    ],
    "model": "<strong>Paragraph 1: Pre-emptive Air Strike and Air Supremacy (5 June 1967)</strong><br>The war began on 5 June 1967 when Israel launched Operation Focus, a surprise preemptive airstrike against Egyptian airfields. <strong>This air campaign destroyed</strong> over 300 Egyptian aircraft on the ground in three hours, securing complete air supremacy. <strong>Consequently</strong>, this absolute control of the skies left Arab ground forces exposed without air cover, enabling rapid Israeli advances across the Sinai Peninsula.<br><br><strong>Paragraph 2: Ground Campaigns and the Capture of Jerusalem (6-8 June 1967)</strong><br><strong>This initial success led to</strong> immediate battles on the Jordanian front after King Hussein opened fire. The IDF launched a rapid counter-offensive, capturing the entire West Bank and entering the Old City of East Jerusalem. <strong>The capture of the Western Wall resolved</strong> a long-standing Jewish religious grievance and unified the city, while Jordan was forced to retreat across the Jordan River, displacing 300,000 new refugees.<br><br><strong>Paragraph 3: The Golan Heights Assault and Ceasefire (9-10 June 1967)</strong><br><strong>Tensions were pushed to a final climax</strong> on the northern front when Israeli forces turned their attention to Syria, scaling the steep volcanic cliffs of the Golan Heights under heavy fire. <strong>This final victory secured</strong> Israel's northern border from Syrian shelling, leading to a UN ceasefire on 10 June. <strong>Ultimately, this crushing defeat left</strong> Israel in control of the Sinai, Gaza, West Bank, and Golan Heights, redrawing the geopolitical map of the Middle East and leading directly to UN Resolution 242."
  },
  "n4_war": {
    "keywords": [
      "Bar-Lev Line",
      "Nickel Grass",
      "Suez Canal",
      "nuclear alert",
      "Resolution 338"
    ],
    "question": "Write a narrative account analysing key events of the Yom Kippur War (1973) and its aftermath.",
    "events": [
      "The USA and USSR launch massive arms airlifts to resupply their respective allies, leading to DEFCON 3.",
      "Egypt and Syria launch a surprise coordinated attack on Yom Kippur, breaching the Bar-Lev Line.",
      "The war ends with UN Resolution 338, followed by a devastating OPEC oil embargo on Western nations."
    ],
    "correct": [
      1,
      0,
      2
    ],
    "model": "<strong>Paragraph 1: The Surprise Arab Offensive (October 1973)</strong><br>The war began on 6 October 1973 when Egypt and Syria launched a coordinated surprise attack on Israel during the holy day of Yom Kippur, aiming to reclaim the occupied territories lost in 1967. <strong>As a result of</strong> the surprise assault, Egyptian forces successfully crossed the Suez Canal and breached the Bar-Lev Line, while Syrian tanks swept across the Golan Heights. <strong>This led to</strong> a critical military crisis for Israel, which was caught unprepared, prompting an immediate mobilization of its reserves and an urgent request for international assistance.<br><br><strong>Paragraph 2: Superpower Intervention and Counter-Offensives (October 1973)</strong><br><strong>This military escalation culminated in</strong> direct involvement by the USA and the USSR, turning the conflict into a Cold War proxy struggle. The Soviet Union began airlifting heavy weapons to supply the Arab armies, which <strong>consequently prompted</strong> US President Nixon to launch a massive arms airlift (Operation Nickel Grass) to resupply the IDF. Equipped with modern American weaponry, the IDF launched a successful counter-offensive, crossing the Suez Canal into Egypt and surrounding the Egyptian Third Army, which pushed the superpowers to raise their military alert levels, triggering a global nuclear alert.<br><br><strong>Paragraph 3: Ceasefire and the OPEC Oil Embargo Aftermath (1973-74)</strong><br><strong>Tensions were brought to a close</strong> when the USA and the USSR co-sponsored UN Resolution 338 to enforce an immediate ceasefire on the fighting fronts. <strong>Following this ceasefire</strong>, Arab oil-producing nations launched a devastating OPEC oil embargo, quadrupling oil prices to punish Western nations for supporting Israel. <strong>Ultimately, this economic pressure caused</strong> the United States to actively mediate the peace process, leading to Kissinger's shuttle diplomacy and the disengagement of forces, which began a long-term diplomatic shift in Arab-Israeli relations."
  },
  "n5_war": {
    "keywords": [
      "Argov",
      "Peace for Galilee",
      "siege of Beirut",
      "Sabra and Shatila",
      "Kahan Commission"
    ],
    "question": "Write a narrative account analysing the key events of the Israeli invasion of Lebanon (1982).",
    "events": [
      "The IDF surrounds and bombards West Beirut, forcing Yasser Arafat and the PLO to evacuate to Tunis.",
      "The attempted assassination of Ambassador Shlomo Argov triggers Operation Peace for Galilee.",
      "Lebanese Christian Phalangists massacre Palestinian refugees in Sabra and Shatila under indirect IDF control."
    ],
    "correct": [
      1,
      0,
      2
    ],
    "model": "<strong>Paragraph 1: The Assassination Trigger and Invasion (June 1982)</strong><br>The conflict was triggered in June 1982 when the attempted assassination of the Israeli ambassador to London, Shlomo Argov, was blamed on the PLO. In retaliation, Defense Minister Ariel Sharon launched a massive land invasion of Lebanon, named Operation Peace for Galilee. <strong>This rapid advance bypassed</strong> UN peacekeepers and drove deep into Lebanese territory, aiming to destroy the PLO infrastructure and push their forces back 40 kilometers from the border.<br><br><strong>Paragraph 2: The Siege and Evacuation of Beirut (June-August 1982)</strong><br><strong>This military campaign culminated in</strong> the siege of Beirut, where PLO fighters had retreated. For two months, Israeli forces subjected the capital to a devastating aerial and artillery bombardment, cutting off electricity, food, and water. <strong>This intense military pressure forced</strong> Yasser Arafat to accept a US-brokered evacuation plan. <strong>Consequently</strong>, 14,000 armed PLO members were exiled to Tunis, removing the organization's armed presence from Israel's northern border.<br><br><strong>Paragraph 3: Sabra and Shatila and the Kahan Commission (September 1982)</strong><br><strong>The situation descended into tragedy</strong> in September 1982 when Lebanese Christian Phalangist militias entered the Sabra and Shatila refugee camps and massacred hundreds of civilians. Although the Phalangists carried out the killings, the IDF had secured the perimeter. <strong>This atrocity provoked</strong> massive international outrage and led to the Kahan Commission in Israel, which found Sharon personally responsible for failing to prevent the slaughter, <strong>resulting in</strong> his forced resignation and a severe damage to Israel's global reputation."
  },
  "n6_war": {
    "keywords": [
      "Kuwait",
      "Saddam Hussein",
      "SCUD missiles",
      "Madrid Conference",
      "Saudi Arabia"
    ],
    "question": "Write a narrative account analysing the key events of the Gulf War (1991) and its regional impact.",
    "events": [
      "The US-led coalition launches Operation Desert Storm, defeating Iraqi forces and liberating Kuwait.",
      "Saddam Hussein launches SCUD missiles at Tel Aviv to drag Israel into the conflict and break the coalition.",
      "Saddam Hussein invades Kuwait, leading the United States to deploy troops to Saudi Arabia."
    ],
    "correct": [
      2,
      1,
      0
    ],
    "model": "<strong>Paragraph 1: The Invasion of Kuwait and Operation Desert Shield (1990)</strong><br>The crisis began in August 1990 when Iraqi President Saddam Hussein ordered a surprise invasion of neighboring Kuwait, annexing the oil-rich state and claiming it as Iraq's 19th province. <strong>This aggressive invasion alarmed</strong> the international community and threatened Saudi oil fields. <strong>Consequently</strong>, the United States led a global coalition to deploy hundreds of thousands of troops to Saudi Arabia (Operation Desert Shield) and secured a UN deadline for an Iraqi withdrawal.<br><br><strong>Paragraph 2: SCUD Missile Attacks on Israel (January 1991)</strong><br><strong>Following the expiration of the deadline</strong> in January 1991, the US-led coalition launched Operation Desert Storm. In response, Saddam Hussein fired 39 SCUD missiles at Tel Aviv and Haifa, aiming to provoke Israeli military retaliation. <strong>This calculated provocation was designed to</strong> force Arab nations to withdraw from the US-led coalition, as they could not fight alongside Israel. <strong>Ultimately, this strategy failed because</strong> the United States pressured Israel to remain passive, deploying Patriot defense missiles to protect Israeli airspace.<br><br><strong>Paragraph 3: Iraqi Defeat and the Madrid Peace Process (February-October 1991)</strong><br><strong>The conflict ended in</strong> February 1991 with the rapid defeat and expulsion of Iraqi forces from Kuwait during a 100-hour ground campaign. <strong>This decisive victory left</strong> the USA as the sole global superpower in the region. <strong>Consequently</strong>, Washington utilized its immense post-war leverage to pressure both Israel and Arab states to attend the historic Madrid Conference in October 1991, <strong>initiating</strong> the diplomatic process that culminated in the 1993 Oslo Accords."
  }
};

const PAST_PAPERS_DATA = [
  {
    "id": "2018_summer",
    "title": "Summer 2018 Past Paper",
    "year": "2018",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of the territorial changes following the 1948-49 Arab-Israeli war. (8 marks)",
      "clue": "Think about the impact on the Palestinian Arabs (the Nakba) and the refugee crisis. Also think about the impact on the map, such as Israel's expansion and Jordan taking the West Bank.",
      "keywords": ["displacement", "refugees", "partition boundaries", "West Bank", "Gaza Strip"],
      "model": "One consequence was the displacement of over 700,000 Palestinian Arabs (the Nakba), who became stateless refugees fleeing into neighbouring Jordan, Lebanon, and Gaza, creating a massive humanitarian crisis. Another consequence was the expansion of Israel's borders beyond the original UN partition boundaries, with Israel capturing 78% of Palestine, while Jordan annexed the West Bank and East Jerusalem, and Egypt took control of the Gaza Strip, leaving no territory for a Palestinian state."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing Egypt's relations with Israel in the years 1973-77. (8 marks)",
      "stimulus": [
        "Yom Kippur War (1973)",
        "President Sadat"
      ],
      "clue": "Start with the surprise attack of the Yom Kippur War. Explain how this led to US/Soviet intervention and Kissinger's 'shuttle diplomacy'. Link this to how the stalemate ultimately prompted Sadat's historic 1977 visit to Jerusalem to break the deadlock.",
      "keywords": ["surprise offensive", "Yom Kippur War", "shuttle diplomacy", "Kissinger", "Knesset"],
      "model": "<strong>Paragraph 1: The Surprise Offensive and Restored Arab Pride (October 1973)</strong><br>Relations between Egypt and Israel began in deep hostility when Sadat launched a surprise offensive in October 1973, triggering the Yom Kippur War. <strong>This sudden assault shattered</strong> the status quo, and although Israel recovered militarily, the initial Arab successes restored Egyptian national pride and prestige. <strong>Consequently</strong>, this restoration of pride created a vital political space that made future diplomatic negotiations with Israel a realistic possibility for the Egyptian leadership.<br><br><strong>Paragraph 2: Kissinger's Shuttle Diplomacy and Disengagements (1974-75)</strong><br><strong>Subsequently</strong>, the high risk of a direct superpower conflict between the USA and the USSR <strong>forced</strong> the United States to intervene actively in regional diplomacy. US Secretary of State Henry Kissinger conducted intensive 'shuttle diplomacy' between Jerusalem and Cairo to defuse the immediate military crisis. <strong>This diplomatic mediation resulted in</strong> the signing of the Sinai I (1974) and Sinai II (1975) disengagement agreements, which separated the hostile forces, reopened the Suez Canal, and began a gradual normalization process.<br><br><strong>Paragraph 3: Sadat's Knesset Speech and Psychological Breakthrough (1977)</strong><br><strong>Finally</strong>, despite these incremental military agreements, a formal diplomatic peace treaty remained stalled, prompting President Sadat to take a revolutionary step to break the deadlock. In November 1977, Sadat made his historic visit to Jerusalem to address the Israeli Knesset directly. <strong>This dramatic gesture broke</strong> the long-standing psychological barrier and taboo of Arab non-recognition of Israel, directly <strong>paving</strong> the way for the Camp David negotiations and a permanent peace treaty."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2018_q3_a",
          "title": "The importance of Nasser for leadership of the Arab world.",
          "clue": "Explain his promotion of Pan-Arabism and how his nationalisation of the Suez Canal made him a hero, leading to the creation of the UAR in 1958.",
          "keywords": ["Pan-Arabism", "Suez Canal", "United Arab Republic", "Nasser"],
          "model": "<strong>Point 1:</strong> Nasser's leadership was important because he championed Pan-Arabism, which aimed to unite Arab countries against Western influence. His bold stance against Western imperialism during the Suez Crisis, especially after nationalising the Suez Canal in 1956, made him a legendary figure across the Arab world.<br><br><strong>Point 2:</strong> It was also important because it led to concrete political unions. His popularity and influence were so great that Syria agreed to merge with Egypt to form the United Arab Republic (UAR) in 1958, demonstrating his role as the undisputed leader of the Arab national movement."
        },
        {
          "id": "2018_q3_b",
          "title": "The importance of the occupied territories for Arab-Israeli relations after the Six Day War (1967).",
          "clue": "Explain how taking the West Bank, Gaza, and Golan Heights gave Israel a military buffer zone, but provoked the Arab League to issue the 'Three Nos' and demand 'Land for Peace' (UN Resolution 242).",
          "keywords": ["occupied territories", "buffer zones", "Three Nos", "Khartoum"],
          "model": "<strong>Point 1:</strong> The occupied territories were important because they fundamentally altered the military dynamic, giving Israel strategic buffer zones like the Sinai, West Bank, and Golan Heights. This enhanced Israel's security, but placed millions of Palestinians under Israeli military occupation, fueling resentment.<br><br><strong>Point 2:</strong> It was also important because it hardened Arab diplomatic resistance, prompting the Arab League to issue the 'Three Nos' (no peace, no negotiation, no recognition) at Khartoum, and leading to UN Resolution 242's 'Land for Peace' formula, which became the disputed basis for all future negotiations."
        },
        {
          "id": "2018_q3_c",
          "title": "The importance of the end of the Cold War for attempts to find a solution in the Middle East.",
          "clue": "Explain how the collapse of the USSR stripped the PLO of its main source of funding and weapons, which forced Arafat to compromise and attend the US-led Madrid Conference.",
          "keywords": ["Cold War", "Soviet Union", "superpower", "Madrid Peace Conference"],
          "model": "<strong>Point 1:</strong> The end of the Cold War was important because the collapse of the Soviet Union in 1991 stripped the PLO and Syria of their primary military, financial, and diplomatic backer, leaving them isolated and severely weakened.<br><br><strong>Point 2:</strong> It was also important because it left the USA as the sole global superpower, allowing Washington to exert immense diplomatic pressure on both Israel and Arab states, which forced Yasser Arafat to make compromises and participate in the landmark Madrid Peace Conference in 1991."
        }
      ]
    }
  },
  {
    "id": "2019_summer",
    "title": "Summer 2019 Past Paper",
    "year": "2019",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of the Oslo Accords (1993). (8 marks)",
      "clue": "Consequence 1: Think about the diplomatic breakthrough (mutual recognition between the PLO and Israel and the creation of the PNA). Consequence 2: Think about the violent backlash from extremists who felt betrayed (e.g., Hamas bombings and the assassination of Yitzhak Rabin).",
      "keywords": ["breakthrough", "mutual recognition", "PNA", "Hamas", "Rabin"],
      "model": "One consequence was a major diplomatic breakthrough, leading to mutual recognition between Israel and the PLO, and the creation of the Palestinian National Authority (PNA) to provide limited self-rule in Gaza and Jericho. Another consequence was a violent backlash from extremists on both sides; Palestinian militant groups like Hamas launched suicide bombings to derail the peace process, while a right-wing Jewish extremist assassinated Israeli Prime Minister Yitzhak Rabin in 1995."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing the key developments of the Suez Crisis in 1956. (8 marks)",
      "stimulus": [
        "Nasser",
        "British and French troops"
      ],
      "clue": "Start with Nasser nationalising the Suez Canal in July 1956. Explain how this led to Britain and France colluding with Israel at the Protocol of Sèvres. Describe the subsequent invasion of Sinai and the landing of British and French troops, and how international pressure from the USA and USSR ultimately forced a withdrawal, boosting Nasser's prestige.",
      "keywords": ["nationalised", "Protocol of Sèvres", "Sinai Peninsula", "Eisenhower", "UNEF"],
      "model": "<strong>Paragraph 1: Nationalisation of the Canal (July 1956)</strong><br>The crisis was triggered in July 1956 when Egyptian President Gamal Abdel Nasser nationalised the Suez Canal Company, aiming to use its transit tolls to fund the construction of the Aswan High Dam. <strong>This nationalisation outraged</strong> Britain and France, who viewed the canal as a vital economic lifeline. <strong>Consequently</strong>, the European powers resolved to reclaim control of the canal and secretly conspired with Israel to orchestrate a military invasion.<br><br><strong>Paragraph 2: Secret Sèvres Accord and Sinai Invasion (October 1956)</strong><br><strong>This diplomatic planning resulted in</strong> the secret Protocol of Sèvres. Under the plan, Israel launched a surprise land invasion of the Sinai Peninsula in late October 1956, driving Egyptian forces back. <strong>This planned attack provided</strong> the pretext for Britain and France to intervene, sending troops to seize the canal zone under the guise of separating the combatants.<br><br><strong>Paragraph 3: Global Pressure and Western Humiliation (November 1956)</strong><br><strong>The military success culminated in</strong> political humiliation when US President Eisenhower threatened to bankrupt the British economy. <strong>This decisive economic intervention forced</strong> a rapid ceasefire and withdrawal of British and French troops, replaced by a UN Emergency Force (UNEF). <strong>Ultimately</strong>, this outcome consolidated Nasser's position as a hero of Pan-Arabism."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2019_q3_a",
          "title": "The importance of the establishment of the Israeli Defence Forces for the protection of the new state of Israel.",
          "clue": "Detail how the IDF brought rival militias (like Haganah and Irgun) under a single command, and how the system of conscription gave Israel the troop numbers to survive the 1948 invasion.",
          "keywords": ["IDF", "co-ordinated defence", "conscription", "invading Arab armies"],
          "model": "<strong>Point 1:</strong> The creation of the IDF was important because it united various rival Jewish paramilitary groups. By bringing together the Haganah, Irgun, and Lehi under a single, central command structure, David Ben-Gurion prevented an internal Jewish civil war and ensured Israel could fight a co-ordinated defence.<br><br><strong>Point 2:</strong> It was also important because it allowed Israel to rapidly mobilise its population. By introducing mandatory conscription for both men and women, the IDF grew its forces from around 35,000 to over 100,000 troops, giving Israel the numerical strength needed to ultimately defeat the five invading Arab armies in 1948-49."
        },
        {
          "id": "2019_q3_b",
          "title": "The importance of the actions of the USSR and the USA for the outbreak of the Six Day War (1967).",
          "clue": "Explain how the USSR falsely informed Syria that Israel was massing troops, which triggered Nasser to act. Contrast this with the USA's financial and military backing of Israel.",
          "keywords": ["USSR", "false intelligence", "Straits of Tiran", "pre-emptive strike", "superpower"],
          "model": "<strong>Point 1:</strong> Soviet actions were important because they triggered the immediate crisis. By falsely telling Egypt in May 1967 that Israel was massing troops on the Syrian border, the USSR provoked Nasser to move Egyptian troops into the Sinai, expel UN peacekeepers, and close the Straits of Tiran.<br><br><strong>Point 2:</strong> US actions were also important because their strong diplomatic and military alliance with Israel, combined with their failure to clear the blockade through international effort, convinced Israel that they had passive US backing to launch a pre-emptive strike on June 5th."
        },
        {
          "id": "2019_q3_c",
          "title": "The importance of PLO activities in Lebanon (1970-82) for Israeli security.",
          "clue": "Explain how the PLO's creation of 'Fatahland' enabled cross-border rocket attacks and raids like the Coastal Road Massacre, which ultimately provoked Israel into launching Operation Peace for Galilee.",
          "keywords": ["Lebanon", "rocket attacks", "Ariel Sharon", "Operation Peace for Galilee", "security threat"],
          "model": "<strong>Point 1:</strong> PLO activities in Lebanon were important because they created an intolerable border threat for Israel. After being expelled from Jordan, the PLO set up a 'state within a state' in southern Lebanon, using it as a base to launch constant Katyusha rocket attacks and guerrilla raids into northern Israeli farming communities.<br><br><strong>Point 2:</strong> It was also important because it directly provoked full-scale war. The constant security threat, combined with the attempted assassination of an Israeli ambassador, gave Defence Minister Ariel Sharon the justification to launch 'Operation Peace for Galilee' in 1982, an invasion intended to destroy the PLO infrastructure permanently."
        }
      ]
    }
  },
  {
    "id": "2020_autumn",
    "title": "Autumn 2020 Past Paper",
    "year": "2020",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of the Palestinian Intifada (1987-93). (8 marks)",
      "clue": "Consequence 1: Think about the international condemnation of Israel's harsh 'Iron Fist' response. Consequence 2: Think about how the grassroots uprising led to the emergence of radical groups like Hamas, or how it pressured both sides into the Oslo negotiations.",
      "keywords": ["Iron Fist", "radicalisation", "Hamas", "stalemate", "Oslo Accords"],
      "model": "One consequence was severe international condemnation of Israel's harsh military response, as global media broadcasted images of IDF soldiers using 'Iron Fist' tactics against unarmed Palestinian youths, which damaged Israel's reputation. Another consequence was the radicalisation of the resistance, leading to the founding of Hamas in 1987, but also pressuring Israeli and PLO leadership to recognize that a military stalemate existed, ultimately forcing them to start the secret negotiations that led to the 1993 Oslo Accords."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing the key developments in the Palestinian issue in the years 1970-72. (8 marks)",
      "stimulus": [
        "PFLP airplane hijacks (1970)",
        "Munich Olympics (1972)"
      ],
      "clue": "Explain how the Dawson's Field hijackings resulted in King Hussein expelling the PLO from Jordan (Black September). Link this to how the expelled militants formed extreme splinter groups to gain global attention, culminating in the Munich Olympics attack.",
      "keywords": ["PFLP", "Black September", "Fatahland", "Munich Olympics", "Operation Wrath of God"],
      "model": "<strong>Paragraph 1: The PFLP Hijackings and Sovereignty Crisis (1970)</strong><br>The escalation began in September 1970 when the Popular Front for the Liberation of Palestine (PFLP) hijacked four international civilian aircraft and flew three of them to Dawson's Field in Jordan, blowing them up on live television. <strong>As a result of</strong> this flagrant defiance of Jordanian sovereignty, King Hussein resolved to reassert control over his country. <strong>This led to</strong> a major military showdown, known as the Black September conflict, between the Jordanian army and PLO guerrillas.<br><br><strong>Paragraph 2: Expulsion to Lebanon and Fatahland (1970-71)</strong><br><strong>This military conflict culminated in</strong> the defeat and expulsion of the PLO from Jordan by July 1971. <strong>Consequently</strong>, Yasser Arafat and thousands of armed fighters were forced to relocate to southern Lebanon, exploiting the country's weak central government. <strong>This influx of militants enabled</strong> the PLO to establish a new administrative and military base, known as 'Fatahland', effectively creating a 'state within a state' on Israel's northern border from which they could launch cross-border attacks.<br><br><strong>Paragraph 3: Splinter Factions and the Munich Olympic Massacre (1972)</strong><br><strong>Tensions were pushed to a climax</strong> as expelled Palestinian militants, frustrated by their military defeat in Jordan, formed the extremist 'Black September' splinter group to launch high-profile international terror attacks. <strong>Following this development</strong>, they carried out the hostage-taking and murder of 11 Israeli athletes at the 1972 Munich Olympics. <strong>Ultimately, this atrocity caused</strong> widespread international condemnation of Palestinian militancy and triggered a covert Israeli assassination campaign (Operation Wrath of God) to eliminate PLO operatives across Europe."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2020_q3_a",
          "title": "The importance of UN Resolution 181 for the creation of Israel.",
          "clue": "Explain how the partition plan gave the Zionist movement international legitimacy, but provoked immediate civil war because Arab states entirely rejected it.",
          "keywords": ["UN Resolution 181", "Jewish state", "partition plan", "civil war", "legitimacy"],
          "model": "<strong>Point 1:</strong> UN Resolution 181 was important because it provided international legal backing for a Jewish state. By voting to partition Palestine and allocate 55% of the land to the Jews, the international community officially endorsed the Zionist dream, giving David Ben-Gurion the legitimacy to declare the State of Israel in May 1948.<br><br><strong>Point 2:</strong> It was also important because it directly triggered the 1948-49 Arab-Israeli War. Because the Arab states and Palestinian leadership completely rejected the partition plan as unfair, violence immediately broke out, forcing the Jewish forces to rapidly organise and conquer their designated territory to ensure the new state survived."
        },
        {
          "id": "2020_q3_b",
          "title": "The importance of the Law of Return for the development of the state of Israel.",
          "clue": "Detail how granting citizenship to any Jew worldwide triggered massive demographic expansion, providing essential manpower for the economy and the IDF.",
          "keywords": ["Law of Return", "immigration", "refugees", "demographic shift", "IDF"],
          "model": "<strong>Point 1:</strong> The Law of Return (1950) was important because it sparked massive demographic growth. By granting any Jew in the world the legal right to settle in Israel and receive immediate citizenship, it attracted hundreds of thousands of immigrants, including Holocaust survivors and Jewish refugees expelled from Arab lands.<br><br><strong>Point 2:</strong> It was also important because it secured the country's military and economic survival. The influx of new citizens provided the essential manpower needed to build a viable economy, settle border areas, and fill the reserves of the newly created Israeli Defence Forces (IDF) for national defence."
        },
        {
          "id": "2020_q3_c",
          "title": "The importance of Kissinger's 'shuttle diplomacy' for diplomatic negotiations in the Middle East.",
          "clue": "Explain how Kissinger flying between capitals secured disengagement treaties after the Yom Kippur War, which enabled the reopening of the Suez Canal and laid the groundwork for Camp David.",
          "keywords": ["Yom Kippur War", "shuttle diplomacy", "Sinai I", "Suez Canal", "Camp David"],
          "model": "<strong>Point 1:</strong> Kissinger's shuttle diplomacy was important because it succeeded in separating hostile armies after the 1973 Yom Kippur War. By flying between Tel Aviv, Cairo, and Damascus, Kissinger brokered disengagement treaties (like Sinai I and Sinai II), reducing the risk of a new war.<br><br><strong>Point 2:</strong> It was also important because it brought Egypt into the American diplomatic orbit, bypassing the Soviets. This process reopened the Suez Canal in 1975 and established the trust and diplomatic channels that directly laid the groundwork for the 1978 Camp David Accords."
        }
      ]
    }
  },
  {
    "id": "2022_summer",
    "title": "Summer 2022 Past Paper",
    "year": "2022",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of Syria's support for Fatah in the years 1964-67. (8 marks)",
      "clue": "Think about how Syrian training and bases enabled Fatah to launch bomb attacks inside Israel, leading to Israeli border retaliation. Also consider how the support raised regional tensions, directly leading to major military clashes like the air battle over Damascus in April 1967 and setting the stage for the Six-Day War.",
      "keywords": ["guerrilla raids", "Fatah", "border violence", "Damascus", "Six-Day War"],
      "model": "One consequence of Syria's support for Fatah in the years 1964-67 was an increase in guerrilla raids and border violence. With Syrian military training, financing, and bases, Fatah was able to launch mines and bomb attacks against Israeli agricultural settlements, which provoked retaliatory Israeli reprisal raids and heightened border insecurity. Another consequence was the direct military escalation that led to the Six-Day War. The Syrian-Fatah alliance drew direct Israeli responses, resulting in major military clashes, such as the air battle of April 1967 where Israeli jets shot down six Syrian fighters over Damascus, driving both countries closer to full-scale mobilization and conflict."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing the key developments in the negotiations between Israel and the Palestinians in the years 1993-95. (8 marks)",
      "stimulus": [
        "Arafat",
        "Oslo II (1995)"
      ],
      "clue": "Start with the secret back-channel talks in Norway. Explain how this led to Arafat and Rabin shaking hands on Oslo I (creating the PNA). Link this to the subsequent Oslo II agreement, which divided the West Bank into Areas A, B, and C.",
      "keywords": ["Norway", "Oslo I", "handshake", "PNA", "Oslo II", "assassination"],
      "model": "<strong>Paragraph 1: Secret Norway Negotiations and Oslo I (1993)</strong><br>The path to negotiations began in early 1993 when Israeli and PLO representatives opened secret, back-channel talks in Oslo, Norway. <strong>As a result of</strong> the ongoing First Intifada and mutual economic exhaustion, Yasser Arafat and Prime Minister Yitzhak Rabin realized that military force could not resolve the conflict. <strong>This diplomatic breakthrough led to</strong> the signing of the Oslo I Accord in September 1993, where Israel and the PLO officially recognized each other's legitimacy for the first time in history.<br><br><strong>Paragraph 2: The Handshake and PNA Self-Government (1993-94)</strong><br><strong>This historic recognition was symbolized by</strong> the famous handshake between Rabin and Arafat on the White House lawn. Under the agreement, the Palestinian National Authority (PNA) was established to provide limited self-rule, starting in the Gaza Strip and the West Bank town of Jericho. <strong>Consequently</strong>, British and Israeli forces began withdrawing from these populated areas, allowing Arafat to return from exile and assume administrative control over civil affairs and internal security.<br><br><strong>Paragraph 3: Oslo II and Territorial Division (1995)</strong><br><strong>Negotiations were pushed to a further stage</strong> in September 1995 with the signing of the Oslo II Agreement (the Interim Agreement). <strong>Following this accord</strong>, the West Bank was divided into Areas A (full Palestinian control), B (Palestinian civil and joint security control), and C (full Israeli civil and military control). <strong>Ultimately, this partition caused</strong> intense domestic opposition from extremists on both sides, culminating in Hamas suicide bombings and the tragic assassination of Yitzhak Rabin by a right-wing Jewish extremist in November 1995."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2022_q3_a",
          "title": "The importance of territorial changes in the aftermath of the 1948-49 war for Palestinians.",
          "clue": "Detail how Israel expanded beyond the UN partition borders, leaving no land for an independent Palestinian state and creating 700,000 stateless refugees.",
          "keywords": ["partition borders", "Nakba", "refugees", "annexed", "West Bank"],
          "model": "<strong>Point 1:</strong> The territorial changes were important because they completely prevented the creation of an independent Palestinian state. Israel captured 78% of former Palestine--well beyond the 55% proposed by UN Resolution 181--leaving no continuous territory under Palestinian control.<br><br><strong>Point 2:</strong> They were also important because they led to the fragmentation and displacement of the population. Jordan annexed the West Bank and East Jerusalem, Egypt occupied Gaza, and over 700,000 Palestinians became stateless refugees, scattered in camps across neighboring countries under UNRWA care."
        },
        {
          "id": "2022_q3_b",
          "title": "The importance of the PFLP airplane hijacks (1970) for international attitudes towards the Palestine issue.",
          "clue": "Explain how blowing up international jets succeeded in forcing the world to look at the Palestinian cause, but severely deteriorated their reputation by associating them with global terrorism.",
          "keywords": ["hijackings", "Dawson's Field", "refugee crisis", "global terrorism", "alienating"],
          "model": "<strong>Point 1:</strong> The Dawson's Field hijackings were important because they dramatically forced the Palestinian issue onto the global stage. By blowing up three empty Western commercial jets on live television, the PFLP captured international media attention, making it impossible for the world to ignore the refugee crisis.<br><br><strong>Point 2:</strong> However, they were also important because they severely damaged international sympathy for their cause. The spectacular acts of violence associated the Palestinian national movement with global terrorism, alienating many Western governments and turning public opinion against the PLO."
        },
        {
          "id": "2022_q3_c",
          "title": "The importance of the Yom Kippur War (1973) for Israel's relations with Egypt.",
          "clue": "Explain how the surprise Egyptian attack shattered the myth of Israeli invincibility. This restored Egyptian pride, which enabled Sadat to negotiate peace from a position of strength.",
          "keywords": ["surprise attack", "invincibility", "restored pride", "Sadat", "peace treaty"],
          "model": "<strong>Point 1:</strong> The war was important because it shattered the myth of Israeli invincibility. Egypt's initial success in crossing the Suez Canal and breaching the Bar Lev Line shocked Israel, making them realize that military occupation of the Sinai could not guarantee security.<br><br><strong>Point 2:</strong> It was also important because it restored Egyptian military honour. This restored pride gave President Sadat the domestic and Arab backing to pursue diplomatic negotiations, enabling him to offer peace to Israel from a position of strength, which ultimately led to the 1979 peace treaty."
        }
      ]
    }
  },
  {
    "id": "2023_summer",
    "title": "Summer 2023 Past Paper",
    "year": "2023",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of the terrorist attack at the Munich Olympics. (8 marks)",
      "clue": "Consequence 1: Think about the massive (but highly negative) international media attention drawn to the Palestinian cause. Consequence 2: Think about Israel's fierce retaliation (Operation Wrath of God and airstrikes on Lebanon).",
      "keywords": ["hostage crisis", "Black September", "Operation Wrath of God", "Mossad", "assassinate"],
      "model": "One consequence was that the hostage crisis and deaths of 11 Israeli athletes played out on live television before a global audience of millions, bringing massive international attention to the Palestinian cause, though it heavily associated it with terrorism. Another consequence was Israel's fierce military and intelligence response, leading to airstrikes on PLO bases in Lebanon and Syria, and the launch of 'Operation Wrath of God'--a covert Mossad campaign to track down and assassinate the Black September operatives across Europe."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing the developments in Israel in the years 1949-54. (8 marks)",
      "stimulus": [
        "territory",
        "Israeli Defence Forces (IDF)"
      ],
      "clue": "Start with the territorial gains from the 1948 war. Explain how this resulted in long, hostile borders, meaning Israel had to rapidly consolidate its military (the IDF) and pass the Law of Return to rapidly increase its population for defence.",
      "keywords": ["armistice", "IDF", "Law of Return", "austerity", "Reparations Agreement"],
      "model": "<strong>Paragraph 1: Border Insecurity and the IDF's Creation (1949-50)</strong><br>In the immediate aftermath of the 1948-49 war, the newly established state of Israel faced the urgent task of defending and consolidating its borders. Under the armistice agreements of 1949, Israel captured 78% of the former Mandate territory, which was significantly more than the UN partition plan. <strong>However, these new borders</strong> were long, poorly defined, and surrounded by hostile Arab nations, which <strong>triggered</strong> frequent cross-border infiltrations. In response, David Ben-Gurion created the Israeli Defence Forces (IDF) to unify all paramilitary groups under a single national command to secure the borders.<br><br><strong>Paragraph 2: Mass Immigration, the Law of Return, and Austerity (1950-52)</strong><br><strong>Subsequently</strong>, the arrival of hundreds of thousands of new citizens placed an overwhelming strain on the country's weak economy. To manage this population influx, the government passed the Law of Return in 1950, granting any Jew worldwide the right to settle and receive citizenship, which doubled the population. <strong>To survive the economic strain</strong>, Israel was <strong>forced</strong> to implement a strict austerity regime (Tzena), rationing food and fuel, and housing families in temporary tent camps.<br><br><strong>Paragraph 3: Financial Consolidation and Stability (1952-54)</strong><br><strong>Finally</strong>, the economic crisis was slowly stabilized through massive financial injections from the West. The USA provided critical loans, and in 1952, Israel signed a highly controversial Reparations Agreement with West Germany. <strong>This influx of capital enabled</strong> the government to replace the temporary camps with permanent housing, build industrial infrastructure, and modernize the IDF, <strong>ensuring</strong> Israel's long-term survival."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2023_q3_a",
          "title": "The importance of the end of the British Mandate (1948) for the creation of Israel.",
          "clue": "Explain how the exhausted British withdrawal created a sudden power vacuum, allowing David Ben-Gurion to instantly declare the State of Israel, which triggered the invasion by five Arab armies.",
          "keywords": ["power vacuum", "withdrawal", "Ben-Gurion", "declaration", "Arab invasion"],
          "model": "<strong>Point 1:</strong> The end of the Mandate was highly important because it created a sudden power vacuum in Palestine. As the last British troops withdrew on May 14, 1948, the legal and administrative authority vanished, leaving the Zionist leadership free to act.<br><br><strong>Point 2:</strong> It was also important because it allowed David Ben-Gurion to immediately declare the establishment of the State of Israel. This declaration was the official realization of the Zionist goal, but it also served as the immediate trigger for the invasion by five Arab armies the next day."
        },
        {
          "id": "2023_q3_b",
          "title": "The importance of UN Resolution 242 (1967) for relations between Israel and the Arab world after the Six Day War.",
          "clue": "Explain the 'Land for Peace' formula, and how the ambiguous wording failed to secure peace, leading the Arab League to respond with the 'Three Nos' at Khartoum.",
          "keywords": ["Resolution 242", "Land for Peace", "ambiguity", "Three Nos", "Khartoum"],
          "model": "<strong>Point 1:</strong> Resolution 242 was important because it established the 'Land for Peace' framework. It called for the withdrawal of Israeli forces in exchange for Arab recognition of Israel. However, its deliberate ambiguity (the English text omitted 'the' before 'territories') allowed both sides to interpret it differently, preventing a settlement.<br><br><strong>Point 2:</strong> It was also important because it highlighted the diplomatic deadlock. Instead of accepting the resolution, the Arab League issued the Khartoum Resolution ('Three Nos': no peace, no recognition, no negotiation), cementing a state of cold war for the next decade."
        },
        {
          "id": "2023_q3_c",
          "title": "The importance of Arafat renouncing terrorism (1988) for attempts to find a solution in the Middle East.",
          "clue": "Detail how his historic speech at the UN in Geneva finally met the preconditions set by the USA, which enabled America to open official diplomatic channels with the PLO for the first time.",
          "keywords": ["renunciation", "preconditions", "dialogue", "negotiating partner", "PLO"],
          "model": "<strong>Point 1:</strong> Arafat's renunciation of terrorism was important because it marked a major shift in PLO policy. By publicly renouncing violence, recognizing Israel's right to exist, and accepting UN Resolutions 242 and 338, the PLO moved away from its militant past toward diplomacy.<br><br><strong>Point 2:</strong> It was also important because it met the strict preconditions required by the United States. This enabled the US government to open official diplomatic channels with the PLO, bringing the Palestinians into the international peace process, which led to the Oslo Accords."
        }
      ]
    }
  },
  {
    "id": "2024_summer",
    "title": "Summer 2024 Past Paper",
    "year": "2024",
    "q1": {
      "type": "consequence_8",
      "question": "Explain two consequences of President Sadat of Egypt's visit to Israel (1977). (8 marks)",
      "clue": "Consequence 1: Think about how he broke the psychological barrier and the 'Three Nos', showing true intent for peace. Consequence 2: Think about how it paved the way for Jimmy Carter to host the Camp David Accords the following year.",
      "keywords": ["Knesset", "Sadat", "Camp David", "Jimmy Carter", "reconciliation"],
      "model": "One consequence was the shattering of the long-standing diplomatic deadlock and the Arab League's 'Three Nos' policy. By travelling to Jerusalem and addressing the Knesset, Sadat officially recognized Israel, breaking the psychological barrier to negotiations. Another consequence was that this breakthrough paved the way for formal peace talks, enabling US President Jimmy Carter to invite Sadat and Prime Minister Begin to Camp David in 1978, which resulted in the historic Camp David Accords."
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing relations between Israel and Egypt in the years 1949-56. (8 marks)",
      "stimulus": [
        "The abdication of King Farouk of Egypt (1952)",
        "The Suez Canal"
      ],
      "clue": "Start with the hostile borders established after the 1949 armistices. Explain how the Free Officers coup in 1952 and the abdication of King Farouk brought Nasser to power, escalating tensions. Link this to the rise of Fedayeen raids from Gaza and Israel's Gaza reprisal raid (1955). Describe how Nasser's nationalisation of the Suez Canal led to the 1956 Suez War.",
      "keywords": ["Suez Canal", "Fedayeen", "Gaza reprisal", "Czech Arms Deal", "Suez War"],
      "model": "<strong>Paragraph 1: Hostile Borders and the Egyptian Coup (1949-52)</strong><br>Following the armistice agreements of 1949, relations between Israel and Egypt were defined by deep mutual suspicion and border instability. <strong>As a result of</strong> Egypt blocking the Suez Canal and the Straits of Tiran, Israel's economy was choked, encouraging Palestinian Fedayeen to launch frequent cross-border sabotage raids into Israeli territory. <strong>This led to</strong> a state of constant border insecurity and escalating tension.<br><br><strong>Paragraph 2: The Gaza Reprisal and the Czech Arms Deal (1952-55)</strong><br><strong>This border conflict culminated in</strong> the Egyptian Free Officers coup of 1952 which brought Gamal Abdel Nasser to power. Nasser's active support for Fedayeen raids provoked a massive Israeli reprisal raid in Gaza in February 1955, killing 38 Egyptian soldiers. <strong>Consequently</strong>, Nasser felt <strong>forced</strong> to sign the Czech Arms Deal in September 1955 to secure Soviet weapons, altering the regional balance of power.<br><br><strong>Paragraph 3: Nationalisation and the Suez War (1956)</strong><br><strong>Tensions were pushed to breaking point</strong> in July 1956 when Nasser nationalised the Suez Canal, prompting Britain, France, and Israel to form a secret alliance at Sèvres. <strong>Following this agreement</strong>, Israel launched a pre-emptive invasion of Sinai in October 1956. <strong>Ultimately, this collusion caused</strong> the outbreak of the Suez War, which ended with Israel securing shipping rights through the Straits of Tiran and the placement of UN peacekeepers."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2024_q3_a",
          "title": "The importance of Nasser for tension in the Middle East in the years 1955-63.",
          "clue": "Detail his signing of the Czech Arms Deal and his nationalisation of the Suez Canal, which enraged Britain/France and dramatically escalated the Cold War proxy conflict in the region.",
          "keywords": ["Czech Arms Deal", "Suez Crisis", "Western powers", "Cold War", "proxy conflict"],
          "model": "<strong>Point 1:</strong> Nasser was highly important because his actions escalated regional military tension. By signing the Czech Arms Deal in 1955 and nationalising the Suez Canal in 1956, he challenged Western hegemony, which directly triggered the Suez Crisis (the joint British, French, and Israeli invasion of Egypt).<br><br><strong>Point 2:</strong> He was also important because he brought the Cold War directly into the Middle East. By aligning Egypt with the Soviet Union, he provoked the US to counter Soviet influence, escalating regional proxy conflicts and turning the Arab-Israeli dispute into a global superpower struggle."
        },
        {
          "id": "2024_q3_b",
          "title": "The importance of the Six Day War (1967) for Israel's security.",
          "clue": "Explain how capturing the Sinai, Gaza, West Bank, and Golan Heights eliminated immediate threats and provided Israel with massive physical 'buffer zones' against future invasions.",
          "keywords": ["pre-emptive", "air strike", "buffer zones", "Sinai", "Golan Heights"],
          "model": "<strong>Point 1:</strong> The Six Day War was highly important because it eliminated immediate military threats. Israel's pre-emptive air strike destroyed the Egyptian, Syrian, and Jordanian air forces on the ground, proving Israel's qualitative military superiority and securing its airspace.<br><br><strong>Point 2:</strong> It was also important because it gave Israel immense strategic depth. Capturing the Sinai, the West Bank, and the Golan Heights provided Israel with physical buffer zones. Hostile Arab armies were pushed hundreds of miles away from major Israeli cities, making a surprise invasion much harder."
        },
        {
          "id": "2024_q3_c",
          "title": "The importance of the Israel-Jordan peace treaty (1994) for peace in the Middle East.",
          "clue": "Explain how it built on the momentum of the Oslo Accords, normalising relations and securing Israel's longest eastern border, proving that bilateral peace between Israel and Arab states was possible.",
          "keywords": ["peace treaty", "Jordan", "Oslo Accords", "normalise", "bilateral"],
          "model": "<strong>Point 1:</strong> The 1994 treaty was important because it built on the momentum of the Oslo Accords. Following Israel's mutual recognition with the PLO, Jordan felt empowered to normalize relations, becoming only the second Arab nation to sign a peace treaty with Israel.<br><br><strong>Point 2:</strong> It was also important because it secured Israel's eastern flank. The treaty resolved long-standing land and water disputes and formally secured Israel's longest border, proving that stable, bilateral peace agreements could be reached between Israel and moderate Arab states."
        }
      ]
    }
  },
  {
    "id": "2025_summer",
    "title": "Summer 2025 Past Paper",
    "year": "2025",
    "q1": {
      "type": "consequence_split_4",
      "question": "Section A: Consequence sub-questions",
      "subQuestions": [
        {
          "id": "2025_q1_a",
          "title": "Q1(a): Explain one consequence of the bombing of the King David Hotel (1946). (4 marks)",
          "clue": "Think about the devastating effect on British morale and public opinion, forcing the government to hand the Mandate over to the UN.",
          "keywords": ["Irgun", "91 deaths", "UN", "1947", "withdraw"],
          "model": "One consequence was the end of British resolve to maintain the Mandate. The bombing by the Irgun killed 91 people, which caused massive outrage in Britain and created intense domestic pressure to withdraw troops, leading directly to Britain handing the Palestine problem to the UN in 1947."
        },
        {
          "id": "2025_q1_b",
          "title": "Q1(b): Explain one consequence of territorial changes following the 1948-49 Arab-Israeli war. (4 marks)",
          "clue": "Think about how the new borders meant no Palestinian state was created, leading to 700,000 stateless refugees.",
          "keywords": ["displacement", "refugees", "partition boundaries", "annexed", "Gaza"],
          "model": "One consequence was the mass displacement of over 700,000 Palestinian Arabs (the Nakba), who fled their homes and became stateless refugees in neighbouring countries like Jordan and Lebanon. Additionally, Israel expanded its territory by capturing 78% of historic Palestine, while Jordan annexed the West Bank and Egypt took control of Gaza, leaving the Palestinians without a homeland."
        }
      ]
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing the key developments of the PLO in Lebanon in the years 1970-82. (8 marks)",
      "stimulus": [
        "the expulsion of the PLO from Jordan (1970)",
        "Israel's 'Operation Peace for Galilee' (1982)"
      ],
      "clue": "Explain how the expulsion from Jordan forced the PLO into Lebanon where they built 'Fatahland'. Link this to their cross-border raids into Israel, which ultimately provoked Ariel Sharon into launching a full-scale invasion of Lebanon to destroy them.",
      "keywords": ["Fatahland", "Coastal Road Massacre", "Lebanese Civil War", "Operation Peace for Galilee", "evacuation"],
      "model": "<strong>Paragraph 1: Expulsion from Jordan and Fatahland (1970-75)</strong><br>The PLO's presence in Lebanon was established after their violent expulsion from Jordan during the Black September conflict of 1970-71. Yasser Arafat and thousands of armed fighters relocated to Lebanon, taking advantage of the weak central government in Beirut. <strong>This influx of militants enabled</strong> the PLO to set up a powerful administrative and military base in southern Lebanon, which became known as 'Fatahland', effectively creating a 'state within a state'.<br><br><strong>Paragraph 2: Cross-Border Raids and Operation Litani (1975-78)</strong><br><strong>Subsequently</strong>, from this new southern Lebanese base, the PLO launched frequent rocket attacks and cross-border raids into northern Israeli towns, including the deadly 1978 Coastal Road Massacre. <strong>These constant guerrilla attacks provoked</strong> heavy Israeli military reprisal strikes and destabilized Lebanon's fragile sectarian balance, contributing directly to the outbreak of the Lebanese Civil War. <strong>Consequently</strong>, Israel formed an alliance with Christian Lebanese militias to counter the growing power of the PLO.<br><br><strong>Paragraph 3: The London Assassination Attempt and Invasion (1982)</strong><br><strong>Finally</strong>, the escalation of border violence reached a breaking point in June 1982 when the attempted assassination of the Israeli ambassador in London was blamed on the PLO. In response, Israel launched a massive invasion, 'Operation Peace for Galilee', driving all the way to Beirut and placing the city under a devastating siege. <strong>This overwhelming military pressure forced</strong> Arafat and the PLO leadership to accept a US-brokered evacuation, <strong>resulting in</strong> their expulsion from Lebanon to Tunis."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2025_q3_a",
          "title": "The importance of the Suez Crisis (1956) for Egypt's status in the Arab world.",
          "clue": "Explain how standing up to the British, French, and Israeli invasion made Nasser a Pan-Arab hero, increasing his influence and leadership across the Arab world.",
          "keywords": ["Nasser", "Pan-Arabism", "prestige", "United Arab Republic", "UAR"],
          "model": "<strong>Point 1:</strong> Nasser's leadership was important because it transformed him into an undisputed hero of Arab nationalism (Pan-Arabism). By politically surviving the tripartite invasion of 1956, he was seen as the first Arab leader to successfully defy Western imperial powers, which dramatically elevated Egypt's prestige across the Middle East.<br><br><strong>Point 2:</strong> It was also important because it established Egypt as the undisputed leader of the Arab world. Nasser's newfound popularity and status enabled Egypt to pursue concrete political unions, leading directly to the merger with Syria to form the United Arab Republic (UAR) in 1958 and cementing Egyptian influence over regional politics."
        },
        {
          "id": "2025_q3_b",
          "title": "The importance of the Yom Kippur War (1973) for superpower involvement in the Middle East.",
          "clue": "Explain how the threat of direct conflict between the USA and USSR forced both to negotiate a ceasefire, and how it brought Egypt into the US diplomatic sphere.",
          "keywords": ["superpower", "Resolution 338", "Kissinger", "shuttle diplomacy", "orbit"],
          "model": "<strong>Point 1:</strong> The war was important because it brought the USA and the Soviet Union to the brink of direct military confrontation. The massive superpower arms airlifts and the Soviet threat to intervene unilaterally to support Egypt forced both superpowers to coordinate on UN Resolution 338, establishing a joint diplomatic framework for a ceasefire.<br><br><strong>Point 2:</strong> It was also important because it enabled the United States to shut the Soviet Union out of future Middle Eastern peace talks. US Secretary of State Henry Kissinger used 'shuttle diplomacy' to negotiate disengagement treaties, successfully bringing Egypt into the US diplomatic orbit and making the US the sole mediator in subsequent peace processes."
        },
        {
          "id": "2025_q3_c",
          "title": "The importance of the Camp David Accords (1978) for attempts to find a solution to the Arab-Israeli conflict.",
          "clue": "Detail how it led to the first formal peace treaty between Israel and an Arab nation (Egypt), but divided the Arab world because it ignored the Palestinian issue.",
          "keywords": ["Camp David", "Peace Treaty", "Sinai Peninsula", "isolated", "Arab League"],
          "model": "<strong>Point 1:</strong> The Accords were important because they resulted in the historic 1979 Egypt-Israel Peace Treaty, the first peace agreement between Israel and an Arab nation. This treaty ended decades of hostility, returned the Sinai Peninsula to Egypt, and permanently secured Israel's southern border.<br><br><strong>Point 2:</strong> However, they were also important because they isolated Egypt and divided the Arab world. Because the Accords failed to secure a clear path for Palestinian self-determination or statehood, the PLO and other Arab nations rejected the agreement, and Egypt was expelled from the Arab League, which hardened diplomatic resistance elsewhere."
        }
      ]
    }
  },
  {
    "id": "mock_paper_1",
    "title": "Mock Exam Paper 1 (The Build-up & Peace Process Focus)",
    "year": "Mock",
    "highProbability": true,
    "q1": {
      "type": "consequence_split_4",
      "question": "Section A: Consequence sub-questions",
      "subQuestions": [
        {
          "id": "mock_paper_1_q1_a",
          "title": "Q1(a): Explain one consequence of US aid to Israel following the 1948-49 war. (4 marks)",
          "clue": "Think about the solidification of Israel's military dominance (the IDF) and how this deterred immediate conventional invasions by Arab states, though it also deepened Arab hostility.",
          "keywords": ["IDF", "military dominance", "immigrants", "Arab hostility", "superiority"],
          "model": "One consequence was the solidification of Israel's long-term military dominance in the region. The financial and military assistance from the United States enabled Israel to build a highly modern, professional army (the IDF) and absorb hundreds of thousands of immigrants. This military superiority deterred immediate large-scale conventional invasions by Arab states, though it also deepened Arab hostility as they viewed Israel as a US imperialist outpost."
        },
        {
          "id": "mock_paper_1_q1_b",
          "title": "Q1(b): Explain one consequence of the Cairo Conference (1964). (4 marks)",
          "clue": "Think about how it led directly to the creation of the Palestinian Liberation Organisation (PLO) to represent Palestinian aspirations.",
          "keywords": ["Cairo Conference", "PLO", "representation", "guerrilla", "national aspirations"],
          "model": "One consequence was the creation of the Palestinian Liberation Organisation (PLO). Arab leaders met in Cairo to coordinate opposition to Israel, which led directly to the establishment of the PLO to represent Palestinian national aspirations and launch guerrilla actions against Israel under a unified body."
        }
      ]
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing escalating tension between Israel, Syria and Jordan in the years 1964-67. (8 marks)",
      "stimulus": [
        "Syria's support for Fatah",
        "Samu (1966)"
      ],
      "clue": "Start with the backing of Fatah from Syria. Explain how Samu (1966) humiliated Jordan and caused riots. Conclude with Jordan signing the mutual defence pact with Egypt in May 1967.",
      "keywords": ["Fatah", "Samu", "defence pact", "dogfight", "misinformation", "Straits of Tiran"],
      "model": "<strong>Paragraph 1: The Growth of Fatah and Syrian Support (1964-65)</strong><br>The escalation in tension began following the Cairo Conference in 1964, where Arab leaders established the Palestine Liberation Organisation (PLO). From 1965, the new, radical Syrian government actively supported the Palestinian guerrilla group Fatah by providing them with funds, explosives, and training camps inside Syria. <strong>As a result of</strong> this direct Syrian sponsorship, Fatah was able to launch over 100 cross-border sabotage raids into Israel. <strong>This led to</strong> a continuous cycle of violence, as Israel launched harsh retaliatory strikes against Fatah targets, deeply straining border relations between Israel and its Arab neighbours.<br><br><strong>Paragraph 2: The Samu Incident and its Political Fallout (1966)</strong><br><strong>This escalating border conflict culminated in</strong> the Samu Incident in November 1966, when an Israeli border patrol hit a landmine, killing three policemen. Blaming Fatah for the attack, Israel launched a massive reprisal raid into the Jordanian-controlled West Bank village of Samu, sending 600 troops and tanks that destroyed the village and killed 15 Jordanian soldiers. <strong>Consequently</strong>, King Hussein of Jordan faced intense domestic protests and heavily criticised Egypt's President Nasser for hiding behind UN peacekeepers instead of helping his Arab allies. <strong>This pressure prompted</strong> Nasser to sign a joint defence pact with Syria and forced him into a position where he felt he had to take dramatic action against Israel to maintain his reputation as the leader of the Arab world.<br><br><strong>Paragraph 3: Aerial Clashes and the Slide to War (April-June 1967)</strong><br><strong>Tensions were pushed to breaking point</strong> on 7 April 1967, when disputes over farming in the demilitarised zone escalated into a major dogfight over the Golan Heights, resulting in Israeli forces shooting down six Syrian fighter jets. <strong>Following this humiliating defeat</strong>, the Soviet Union intervened in May 1967 by falsely informing Nasser that Israel was massing troops on the Syrian border for a full-scale invasion. <strong>Ultimately, this Soviet misinformation caused</strong> Nasser to mobilise his army into the Sinai Peninsula, order UN peacekeepers to leave the border, and close the Straits of Tiran to Israeli shipping. <strong>This sequence of events</strong> convinced Israel that a coordinated Arab invasion was imminent, directly leading to the Israeli pre-emptive air strike that triggered the Six Day War on 5 June 1967."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "mock_paper_1_q3_a",
          "title": "The importance of Israeli attacks on Gaza in 1955 and Sinai in 1956 for increased tension.",
          "clue": "Explain how the Gaza raid in February 1955 humiliated President Nasser and convinced him that Egypt's military was too weak, leading to the Czech Arms Deal. Also explain how the subsequent joint attack on Sinai in 1956 confirmed Arab fears of Western-Israeli collusion and escalated the Cold War.",
          "keywords": ["Gaza raid", "Nasser", "Czech Arms Deal", "Sinai", "collusion"],
          "model": "<strong>Point 1:</strong> The Gaza raid in February 1955 was important because it shattered any chance of peace between Egypt and Israel and humiliated President Nasser. The attack killed 38 Egyptian soldiers and proved that Egypt's military was too weak to defend against Israel. This humiliation <span class='highlight-word'>forced</span> Nasser to seek modern weaponry, leading him to sign the Czech Arms Deal in September 1955, which brought Soviet weapons into the region and dramatically escalated regional tensions.<br><br><strong>Point 2:</strong> The Israeli attack on Sinai in October 1956 as part of the Suez Crisis was also important because it confirmed Arab suspicions that Israel was an imperialist tool of Western powers (colluding with Britain and France). Although Israel withdrew under US pressure, the conflict intensified Arab hostility toward Israel and cemented Nasser's role as a Pan-Arab hero, cementing a state of permanent cold war and drawing the Soviet Union deeper into the region as Egypt's protector."
        },
        {
          "id": "mock_paper_1_q3_b",
          "title": "The importance of Black September and the Munich Olympics for international attitudes towards the Palestine issue.",
          "clue": "Explain how the Munich Olympics hostage crisis in 1972 forced the Palestinian issue onto the global stage, but also how it associated the Palestinian cause with global terrorism.",
          "keywords": ["Munich Olympic", "Black September", "hostage crisis", "refugee crisis", "terrorism"],
          "model": "<strong>Point 1:</strong> Black September and the Munich Olympic hostage crisis in 1972 were important because they forced the Palestinian issue onto the global stage. By taking Israeli athletes hostage on live television watched by 900 million viewers, the Black September group succeeded in drawing massive international attention to the unresolved Palestinian refugee crisis.<br><br><strong>Point 2:</strong> However, they were also highly important because they deteriorated international attitudes by associating the Palestinian struggle with terrorism. The murder of the 11 hostages shocked the world, prompting Western governments to increase security cooperation and view the PLO as a terrorist organization, which severely damaged its diplomatic credibility."
        },
        {
          "id": "mock_paper_1_q3_c",
          "title": "The importance of US President Carter and Camp David (1978) for diplomatic negotiations.",
          "keywords": ["Carter", "Camp David", "Peace Treaty", "Land for Peace", "mediation"],
          "clue": "Explain how Carter's personal mediation broke a decades-long deadlock, leading to the 1979 Egypt-Israel Peace Treaty and establishing the 'Land for Peace' formula as a blueprint.",
          "model": "<strong>Point 1:</strong> President Carter's personal mediation at Camp David in 1978 was important because it succeeded in breaking a decades-long diplomatic deadlock. By inviting Sadat and Begin to a secluded retreat, Carter used intense personal diplomacy to broker the first peace agreement between Israel and an Arab country (Egypt).<br><br><strong>Point 2:</strong> It was also important because it created the 'Camp David Accords' framework, which returned the Sinai Peninsula to Egypt in exchange for diplomatic recognition and security guarantees. This established the 'Land for Peace' formula as the successful blueprint for all future bilateral negotiations in the region."
        }
      ]
    }
  },
  {
    "id": "mock_paper_2",
    "title": "Mock Exam Paper 2 (Stagnation & Diplomatic Breakthrough Focus)",
    "year": "Mock",
    "highProbability": true,
    "q1": {
      "type": "consequence_split_4",
      "question": "Section A: Consequence sub-questions",
      "subQuestions": [
        {
          "id": "mock_paper_2_q1_a",
          "title": "Q1(a): Explain one consequence of the formation of the UAR in 1958. (4 marks)",
          "clue": "Think about how the merger of Egypt and Syria under Nasser's leadership alarmed Israel and pro-Western monarchies like Jordan and Iraq.",
          "keywords": ["UAR", "insecurity", "Arab Federation", "nationalist coup", "British troops"],
          "model": "One consequence was increased insecurity for pro-Western Arab monarchies and Israel. The union of Egypt and Syria under Nasser's leadership alarmed Jordan and Iraq, who responded by forming their own short-lived 'Arab Federation'. Additionally, when a nationalist coup overthrew the Iraqi monarchy in July 1958, King Hussein of Jordan felt <span class='highlight-word'>forced</span> to request British troops to secure his throne."
        },
        {
          "id": "mock_paper_2_q1_b",
          "title": "Q1(b): Explain one consequence of the expulsion of the PLO from Jordan (1970). (4 marks)",
          "clue": "Think about how the PLO relocation to southern Lebanon created a new base ('Fatahland') for launching cross-border attacks into northern Israel.",
          "keywords": ["relocation", "Fatahland", "rocket attacks", "destabilised", "invasion"],
          "model": "One consequence was the relocation of the PLO's leadership and armed fighters to southern Lebanon. Consequently, they established a 'state within a state' ('Fatahland') from which they launched rocket attacks and cross-border raids into northern Israel, which severely destabilised Lebanon and led to the 1982 Israeli invasion."
        }
      ]
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing diplomatic negotiations between Israel and Egypt in the years 1973-79. (8 marks)",
      "stimulus": [
        "'shuttle diplomacy'",
        "Sadat's visit to Israel (1977)"
      ],
      "clue": "Start with the aftermath of the Yom Kippur War. Detail Kissinger's shuttle diplomacy and disengagement agreements. Conclude with Sadat's visit, Camp David (1978), and the 1979 treaty.",
      "keywords": ["shuttle diplomacy", "Sadat", "Knesset", "Camp David", "Peace Treaty", "Sinai Peninsula"],
      "model": "<strong>Paragraph 1: The Aftermath of War and Shuttle Diplomacy (1973-75)</strong><br>The path to diplomatic negotiations began in the immediate aftermath of the Yom Kippur War of October 1973. While Israel recovered militarily, Egypt's initial successes restored Arab national pride, making peace talks politically viable. <strong>As a result of this shift</strong>, the United States intervened to prevent superpower escalation, sending Secretary of State Henry Kissinger to conduct intensive 'shuttle diplomacy' between Cairo and Tel Aviv. <strong>This mediation led to</strong> the Sinai I (1974) and Sinai II (1975) disengagement agreements, which successfully separated the armies and allowed Egypt to reopen the Suez Canal, establishing basic trust between the two nations.<br><br><strong>Paragraph 2: Sadat's Bold Move to Break the Deadlock (1977)</strong><br><strong>This initial progress culminated in</strong> a period of diplomatic stagnation, as regional leaders remained unwilling to formally recognize the Jewish state. To break this deadlock, Egyptian President Anwar Sadat made a dramatic and historic visit to Jerusalem in November 1977 to address the Israeli Knesset directly. <strong>Consequently</strong>, Sadat's speech broke the decades-old psychological taboo of non-recognition and convinced the Israeli public of Egypt's genuine desire for peace. <strong>This historic breakthrough prompted</strong> Israeli Prime Minister Menachem Begin to engage in serious bilateral negotiations, bypassing wider Arab league opposition.<br><br><strong>Paragraph 3: The Camp David Accords and Peace Treaty (1978-79)</strong><br><strong>Negotiations were pushed to completion</strong> in September 1978, when US President Jimmy Carter hosted a secluded summit at Camp David. After twelve days of intense mediation, the leaders signed the Camp David Accords, establishing a framework for a peace settlement. <strong>Following this agreement</strong>, the historic Egypt-Israel Peace Treaty was officially signed in Washington in March 1979. <strong>Ultimately, this treaty caused</strong> Israel to return the entire Sinai Peninsula to Egypt in exchange for full diplomatic recognition and security guarantees. <strong>This sequence of events</strong> permanently removed Egypt as a military threat to Israel and fundamentally reshaped Middle Eastern geopolitics."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "mock_paper_2_q3_a",
          "title": "The importance of the refugee status of Palestinian Arabs for the aftermath of the 1948-49 war.",
          "clue": "Explain how the permanent displacement of 700,000 Palestinians created an enduring humanitarian crisis in neighboring states and catalyzed the rise of independent guerrilla resistance.",
          "keywords": ["refugee status", "UNRWA", "instability", "identity", "Fatah"],
          "model": "<strong>Point 1:</strong> The refugee status of over 700,000 Palestinians was important because it created a permanent humanitarian and political crisis in neighboring Arab states. Fleeing into Gaza, the West Bank, Jordan, and Lebanon, they were housed in squalid, temporary camps under UNRWA care, serving as a constant source of regional instability and anti-Israel sentiment.<br><br><strong>Point 2:</strong> It was also important because it hardened Palestinian national identity and opposition to Israel. Denied the right of return by Israel and left stateless, the refugees formed the core of the Palestinian resistance movement, leading directly to the creation of independent guerrilla groups like Fatah to fight for liberation."
        },
        {
          "id": "mock_paper_2_q3_b",
          "title": "The importance of Syria's support for Fatah for escalating tension between Israel, Syria and Jordan.",
          "clue": "Explain how Syrian backing enabled Fatah raids that provoked IDF reprisal actions, and how this ultimately dragged Jordan into the defense pact with Egypt.",
          "keywords": ["guerrilla raids", "reprisal", "Samu raid", "defense pact", "Arab alliance"],
          "model": "<strong>Point 1:</strong> Syria's active backing of Fatah from 1964 was important because it enabled Palestinians to launch guerrilla raids directly into Israel from Syrian and Jordanian territory. This violated Israel's borders and led to a cycle of violent reprisal raids by the IDF, escalating military tensions.<br><br><strong>Point 2:</strong> It was also important because it dragged Jordan into the conflict. Because Fatah fighters used the West Bank (controlled by Jordan) as a base, Israel launched the devastating Samu raid in 1966. This humiliation <span class='highlight-word'>forced</span> King Hussein of Jordan to sign a defense pact with Egypt, consolidating the Arab alliance that fought Israel in 1967."
        },
        {
          "id": "mock_paper_2_q3_c",
          "title": "The importance of the First Palestinian Intifada (1987-93) for the Palestinian issue.",
          "clue": "Explain how the grassroots civil uprising damaged Israel's reputation and pressured both Israel and the PLO to negotiate the Oslo Accords.",
          "keywords": ["First Intifada", "civil uprising", "media attention", "Yitzhak Rabin", "Oslo Accords"],
          "model": "<strong>Point 1:</strong> The First Intifada (1987-93) was highly important because it shifted the focus of the Palestinian struggle back to the occupied territories. The grassroots, civil uprising of stone-throwing youth against armed IDF soldiers captured global media attention, turning international public opinion against the Israeli occupation.<br><br><strong>Point 2:</strong> It was also important because it forced both Israel and the PLO to compromise. The rise of local leaders and Hamas threatened Yasser Arafat's authority, while Prime Yitzhak Rabin realized that military force could not end the uprising. This mutual pressure directly <span class='highlight-word'>enabled</span> the secret negotiations that led to the 1993 Oslo Accords."
        }
      ]
    }
  },
  {
    "id": "mock_paper_3",
    "title": "Mock Exam Paper 3 (The Wars & Superpower Influence Focus)",
    "year": "Mock",
    "highProbability": true,
    "q1": {
      "type": "consequence_split_4",
      "question": "Section A: Consequence sub-questions",
      "subQuestions": [
        {
          "id": "mock_paper_3_q1_a",
          "title": "Q1(a): Explain one consequence of Israel's raid on Samu. (4 marks)",
          "clue": "Think about the severe destabilization of Jordan and King Hussein signing a defense pact with Egypt in May 1967.",
          "keywords": ["Samu", "destabilisation", "riots", "defence pact", "King Hussein"],
          "model": "One consequence was the severe destabilisation of Jordan and its military alignment with Egypt. The raid, which destroyed dozens of houses and killed Jordanian soldiers, provoked massive riots among West Bank Palestinians. To restore his credibility, King Hussein was <span class='highlight-word'>forced</span> to sign a mutual defence pact with Egypt in May 1967, drawing Jordan into the Six Day War."
        },
        {
          "id": "mock_paper_3_q1_b",
          "title": "Q1(b): Explain one consequence of US involvement in the Gulf War (1991). (4 marks)",
          "clue": "Think about Yasser Arafat supporting Saddam Hussein, which led to expulsion of Palestinians and financial bankruptcy of the PLO.",
          "keywords": ["isolation", "subsidies", "expelled", "bankruptcy", "Oslo Accords"],
          "model": "One consequence was the diplomatic isolation and near-bankruptcy of the PLO. Because Yasser Arafat supported Saddam Hussein's invasion of Kuwait, wealthy Gulf states cut subsidies and expelled 300,000 Palestinian workers from Kuwait. This loss of backing weakened the PLO, which <span class='highlight-word'>forced</span> Arafat to accept the US-led peace negotiations that led to the Oslo Accords."
        }
      ]
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing key events of the Yom Kippur War (1973) and its aftermath. (8 marks)",
      "stimulus": [
        "occupied territories",
        "the USA and the USSR"
      ],
      "clue": "Start with the surprise joint Egyptian-Syrian attack in October 1973. Detail US resupply efforts and Soviet support, leading to superpower tension. Conclude with UN Resolution 338, the OPEC oil embargo, and Kissinger's shuttle diplomacy.",
      "keywords": ["surprise attack", "proxy struggle", "Nickel Grass", "Resolution 338", "oil embargo", "Kissinger"],
      "model": "<strong>Paragraph 1: The Surprise Arab Offensive (October 1973)</strong><br>The war began on 6 October 1973 when Egypt and Syria launched a coordinated surprise attack on Israel during the holy day of Yom Kippur, aiming to reclaim the occupied territories lost in 1967. <strong>As a result of</strong> the surprise assault, Egyptian forces successfully crossed the Suez Canal and breached the Bar-Lev Line, while Syrian tanks swept across the Golan Heights. <strong>This led to</strong> a critical military crisis for Israel, which was caught unprepared, prompting an immediate mobilization of its reserves and an urgent request for international assistance.<br><br><strong>Paragraph 2: Superpower Intervention and Counter-Offensives (October 1973)</strong><br><strong>This military escalation culminated in</strong> direct involvement by the USA and the USSR, turning the conflict into a Cold War proxy struggle. The Soviet Union began airlifting heavy weapons to supply the Arab armies, which <strong>consequently prompted</strong> US President Nixon to launch a massive arms airlift (Operation Nickel Grass) to resupply the IDF. Equipped with modern American weaponry, the IDF launched a successful counter-offensive, crossing the Suez Canal into Egypt and surrounding the Egyptian Third Army, which pushed the superpowers to raise their military alert levels.<br><br><strong>Paragraph 3: Ceasefire and the OPEC Oil Embargo Aftermath (1973-74)</strong><br><strong>Tensions were brought to a close</strong> when the USA and the USSR co-sponsored UN Resolution 338 to enforce an immediate ceasefire on the fighting fronts. <strong>Following this ceasefire</strong>, Arab oil-producing nations launched a devastating OPEC oil embargo, quadrupling oil prices to punish Western nations for supporting Israel. <strong>Ultimately, this economic pressure caused</strong> the United States to actively mediate the peace process, leading to Kissinger's shuttle diplomacy and the disengagement of forces, which began a long-term diplomatic shift in Arab-Israeli relations."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "mock_paper_3_q3_a",
          "title": "The importance of Nasser and Egypt's leadership of the Arab world for increased tension, 1955-63.",
          "clue": "Explain how Pan-Arab nationalism united public opinion against Israel and how alignment with the USSR escalated the Cold War proxy conflict in the region.",
          "keywords": ["Pan-Arabism", "Suez Canal", "Czech Arms Deal", "Nasser", "proxy struggles"],
          "model": "<strong>Point 1:</strong> Nasser's promotion of Pan-Arabism was important because it challenged Western influence and united Arab public opinion against Israel. His nationalisation of the Suez Canal in 1956 and survival of the subsequent invasion made him a Pan-Arab hero, escalating regional military alignment.<br><br><strong>Point 2:</strong> It was also important because it brought the Cold War directly into the Middle East. By signing the Czech Arms Deal in 1955 and accepting Soviet aid for the Aswan Dam, Nasser aligned Egypt with the USSR, which alarmed Israel and the US, turning regional conflicts into dangerous superpower proxy struggles."
        },
        {
          "id": "mock_paper_3_q3_b",
          "title": "The importance of the actions of the USSR, Nasser and the USA in the period leading to war for the outbreak of the Six Day War (1967).",
          "clue": "Explain how Soviet false intelligence triggered Nasser to mobilize and blockade the Straits of Tiran, and how the failure of US diplomacy prompted a pre-emptive Israeli air strike.",
          "keywords": ["USSR", "false informing", "blockade", "Straits of Tiran", "pre-emptive"],
          "model": "<strong>Point 1:</strong> The actions of the USSR in May 1967 were important because they triggered the crisis by falsely informing Egypt that Israel was massing troops on the Syrian border, which prompted Nasser to mobilize 100,000 troops, expel UN peacekeepers, and blockade the Straits of Tiran.<br><br><strong>Point 2:</strong> The actions of Nasser and the USA were also important because they made war inevitable. Nasser's blockade of the Straits of Tiran was seen by Israel as a declaration of war, while the failure of the USA to resolve the blockade diplomatically gave Israel the confidence to launch a pre-emptive air strike on June 5, 1967."
        },
        {
          "id": "mock_paper_3_q3_c",
          "title": "The importance of Arafat, Rabin and the Oslo Accords (1993) for attempts at a solution.",
          "clue": "Explain how the mutual recognition ended decades of rejectionism, and how the creation of the PNA established a framework for Palestinian self-government.",
          "keywords": ["Oslo Accords", "mutual recognition", "rejectionism", "PNA", "self-government"],
          "model": "<strong>Point 1:</strong> The Oslo Accords signed by Arafat and Rabin in 1993 were important because they achieved historic mutual recognition. The PLO recognized Israel's right to exist in peace, and Israel recognized the PLO as the legitimate representative of the Palestinian people, ending decades of total rejectionism.<br><br><strong>Point 2:</strong> They were also important because they created the framework for Palestinian self-government. The Accords established the Palestinian National Authority (PNA) to administer civil and security affairs in Gaza and Jericho, moving the peace process from a theoretical dispute to practical self-rule."
        }
      ]
    }
  },
  {
    "id": "mock_paper_4",
    "title": "Mock Exam Paper 4 (Israel's Creation & Later Conflicts Focus)",
    "year": "Mock",
    "highProbability": true,
    "q1": {
      "type": "consequence_split_4",
      "question": "Section A: Consequence sub-questions",
      "subQuestions": [
        {
          "id": "mock_paper_4_q1_a",
          "title": "Q1(a): Explain one consequence of Kissinger, 'shuttle diplomacy'. (4 marks)",
          "clue": "Think about how Kissinger brokered disengagement agreements that separated hostile forces and built trust that paved the way for Camp David.",
          "keywords": ["shuttle diplomacy", "Sinai I", "Sinai II", "disengagement", "Camp David"],
          "model": "One consequence was the separation of hostile Israeli, Egyptian, and Syrian armies following the Yom Kippur War. Kissinger's flights between capitals successfully brokered the Sinai I, Sinai II, and Golan disengagement agreements, which reopened the Suez Canal in 1975 and built the bilateral trust that laid the groundwork for the Camp David Accords."
        },
        {
          "id": "mock_paper_4_q1_b",
          "title": "Q1(b): Explain one consequence of the end of the Cold War. (4 marks)",
          "clue": "Think about the collapse of the Soviet Union cutting off backing for the PLO, which forced Arafat to compromise and enter negotiations.",
          "keywords": ["Cold War", "isolation", "aid", "negotiations", "Oslo Accords"],
          "model": "One consequence was the diplomatic isolation and loss of superpower backing for the PLO and Syria. Without Soviet military and financial aid, Yasser Arafat was <span class='highlight-word'>forced</span> to moderate his stance and participate in the US-led peace negotiations, leading to the Madrid Conference in 1991 and the Oslo Accords in 1993."
        }
      ]
    },
    "q2": {
      "type": "narrative",
      "question": "Write a narrative account analysing key events leading to the end of the British Mandate, partition and the creation of Israel. (8 marks)",
      "stimulus": [
        "bombing of the King David Hotel (1946)",
        "UN Resolution 181"
      ],
      "clue": "Start with the post-WWII Zionist insurgency. Detail the King David Hotel bombing. Describe UN Resolution 181, the outbreak of civil war, and Ben-Gurion declaring the state of Israel in May 1948.",
      "keywords": ["King David Hotel", "Resolution 181", "civil war", "Ben-Gurion", "Nakba"],
      "model": "<strong>Paragraph 1: The Zionist Insurgency and British Crisis (1945-46)</strong><br>The slide toward the end of the British Mandate began after World War II, as Jewish paramilitary groups launched a violent insurgency to force the creation of a Jewish state. <strong>As a result of</strong> this campaign, the Irgun group carried out the devastating bombing of the King David Hotel in July 1946, destroying the British administrative headquarters and killing 91 people. <strong>This led to</strong> a major political crisis for Britain, which faced mounting military casualties and public outrage at home, making the Mandate far too costly and dangerous to administer.<br><br><strong>Paragraph 2: The UN Partition Plan and Civil War (1947)</strong><br><strong>This administrative crisis culminated in</strong> Britain deciding to hand the Palestine problem over to the United Nations in February 1947. In November 1947, the UN passed Resolution 181, recommending the partition of Palestine into separate Jewish and Arab states. <strong>Consequently</strong>, while the Zionist leadership accepted the plan, the Palestinian Arabs and neighboring Arab states rejected it as an illegal theft of their land. <strong>This rejection prompted</strong> an immediate outbreak of violent civil war within Palestine, as both sides fought for control of key towns and roads.<br><br><strong>Paragraph 3: The End of the Mandate and Birth of Israel (May 1948)</strong><br><strong>Tensions were pushed to a climax</strong> as British forces completed their withdrawal, leading David Ben-Gurion to declare the official creation of the State of Israel on 14 May 1948. <strong>Following this declaration</strong>, the regular armies of five neighboring Arab nations invaded the new state the very next day. <strong>Ultimately, this invasion caused</strong> the local civil war to escalate into the first Arab-Israeli War. <strong>This sequence of events</strong> resulted in the displacement of 700,000 Palestinians (the Nakba) and established Israel's control over 79% of the former Mandate territory, redrawing the map of the region."
    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "mock_paper_4_q3_a",
          "title": "The importance of the creation of the Israeli Defence Forces and the Law of Return for the aftermath of the 1948-49 war.",
          "clue": "Explain how the IDF consolidated militias under a single command to secure the borders, and how the Law of Return doubled the population for economic and military defense.",
          "keywords": ["IDF", "paramilitary", "conscription", "Law of Return", "citizenship"],
          "model": "<strong>Point 1:</strong> The creation of the IDF in 1948 was important because it consolidated separate Jewish militias (like Haganah and Irgun) under a single national command. This prevented internal political divisions and professionalized the army, ensuring Israel's military survival during the war.<br><br><strong>Point 2:</strong> The Law of Return (1950) was important because it sparked massive demographic expansion by giving any Jew in the world the right to gain Israeli citizenship. This influx of immigrants provided the essential manpower needed to rebuild the economy and populate border areas to defend the state."
        },
        {
          "id": "mock_paper_4_q3_b",
          "title": "The importance of the continued dispute over the Suez Canal for the aftermath of the 1967 war.",
          "clue": "Explain how control of the canal triggered the War of Attrition, and how the canal's closing pressured Egypt to launch the 1973 war.",
          "keywords": ["Suez Canal", "War of Attrition", "Nasser", "embargo", "Yom Kippur War"],
          "model": "<strong>Point 1:</strong> The continued dispute over the Suez Canal was important because it led directly to the War of Attrition (1967-70). Because Egypt refused to accept Israeli control of the east bank of the canal, Nasser launched constant artillery bombardments and raids, escalating military tensions and superpower involvement.<br><br><strong>Point 2:</strong> It was also important because it devastated the canal's surrounding infrastructure and closed the shipping lanes for eight years. This economic loss pressured Egypt to seek a military breakthrough to force negotiations, which ultimately led to Sadat launching the Yom Kippur War in 1973."
        },
        {
          "id": "mock_paper_4_q3_c",
          "title": "The importance of Arafat's speech to the UN (1974) for the Palestinian issue.",
          "clue": "Explain how the speech gained the PLO global legitimacy and observer status, but also how Arafat's commitment to armed struggle delayed direct negotiations with the West.",
          "keywords": ["olive branch", "legitimacy", "observer status", "armed struggle", "negotiations"],
          "model": "<strong>Point 1:</strong> Arafat's 'olive branch and freedom fighter' speech to the UN General Assembly in 1974 was important because it gained the PLO immense international legitimacy. Following the speech, the UN recognized the PLO as the sole representative of the Palestinian people and granted it observer status, elevating it to the global stage.<br><br><strong>Point 2:</strong> However, it was also important because it highlighted the PLO's refusal to compromise on armed struggle. Arafat's warning that the olive branch would fall if the UN ignored Palestinian rights confirmed Israeli and US suspicions that the PLO remained committed to violence, delaying direct negotiations with the West."
        }
      ]
    }
  }
];

if (typeof exports !== 'undefined') {
  exports.QUIZ_DATA = QUIZ_DATA;
  exports.EXAM_SKILLS_DATA = EXAM_SKILLS_DATA;
  exports.CONSEQUENCE_SKILLS_DATA = CONSEQUENCE_SKILLS_DATA;
  exports.NARRATIVE_SKILLS_DATA = NARRATIVE_SKILLS_DATA;
  exports.PAST_PAPERS_DATA = PAST_PAPERS_DATA;
} else if (typeof window !== 'undefined') {
  window.QUIZ_DATA = QUIZ_DATA;
  window.EXAM_SKILLS_DATA = EXAM_SKILLS_DATA;
  window.CONSEQUENCE_SKILLS_DATA = CONSEQUENCE_SKILLS_DATA;
  window.NARRATIVE_SKILLS_DATA = NARRATIVE_SKILLS_DATA;
  window.PAST_PAPERS_DATA = PAST_PAPERS_DATA;
}
