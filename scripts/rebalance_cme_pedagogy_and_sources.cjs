const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { execSync } = require('child_process');

const dataFile = path.resolve(__dirname, '../units/cme_new/data.js');
const publicDataFile = path.resolve(__dirname, '../public/units/cme_new/data.js');
const rightsDbFile = path.resolve(__dirname, 'master_rights_database.json');

// ==============================================================================
// 1. REBALANCED DO NOW STARTERS (ZERO SELF-TESTING, STRICT 3-TIER SPACED RETRIEVAL)
//    NOTE: CME is the FIRST unit Year 10 pupils study at GCSE.
//    No other GCSE units are retrieved. Only prior CME lessons and KS3 schema.
// ==============================================================================

const rebalancedDoNows = [
  // Lesson 1: KT 1.0 Broken Promises & Imperial Borders: Why Was Conflict in the Middle East Inevitable?
  // Foundational WWI & Imperial entry schema (KS3 prior knowledge)
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior foundational history without using notes.',
    items: [
      {
        question: 'Which sprawling Islamic empire ruled Palestine and the wider Middle East for four centuries prior to World War One?',
        answer: 'The Ottoman Empire (ruled from Constantinople/Istanbul)',
        tier: 'Prior Schema: Imperial Foundations'
      },
      {
        question: 'In what year did World War One break out in Europe?',
        answer: '1914',
        tier: 'Prior Schema: Chronology'
      },
      {
        question: 'Which vital canal, opened in 1869, connected the Mediterranean Sea to the Red Sea as Britain\'s imperial maritime route to India?',
        answer: 'The Suez Canal (in Egypt)',
        tier: 'Prior Schema: Strategic Geography'
      },
      {
        question: 'Which wartime alliance of nations did the Ottoman Empire join during World War One in October 1914?',
        answer: 'The Central Powers (allied with Germany and Austria-Hungary)',
        tier: 'Prior Schema: WWI Alliances'
      },
      {
        question: 'What political ideology campaigned for the establishment of a sovereign national homeland for Jewish people in their ancestral biblical land?',
        answer: 'Zionism',
        tier: 'Prior Schema: Political Ideologies'
      },
      {
        question: 'Who is regarded as the father of modern political Zionism after organizing the First Zionist Congress in Basel in 1897?',
        answer: 'Theodor Herzl',
        tier: 'Prior Schema: Key Figures'
      },
      {
        question: 'What term describes state-sponsored, violent anti-Jewish riots and mob massacres in the late 19th-century Russian Empire that drove early Jewish emigration?',
        answer: 'Pogroms',
        tier: 'Prior Schema: Causes of Migration'
      },
      {
        question: 'What political movement sought self-determination and sovereign independence for Arab populations from Ottoman Turkish rule?',
        answer: 'Arab Nationalism',
        tier: 'Prior Schema: Political Ideologies'
      },
      {
        question: 'Which international peacekeeping organisation was founded after the Paris Peace Conference in 1919 to resolve disputes and prevent future world wars?',
        answer: 'The League of Nations',
        tier: 'Prior Schema: International Diplomacy'
      },
      {
        question: 'What legal system was established by the League of Nations allowing European powers to administer former Ottoman and German territories until they were deemed ready for self-rule?',
        answer: 'The Mandate System',
        tier: 'Prior Schema: Imperial Governance'
      }
    ]
  },

  // Lesson 2: KT 1.1 The End of the British Mandate and the Creation of Israel, 1945–1949
  // Retrieves Lesson 1 (Broken Promises, 1914–1939) & Foundational Concepts
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'What 1915–16 diplomatic correspondence between the British High Commissioner in Cairo and the Sharif of Mecca promised British support for Arab independence?',
        answer: 'The McMahon–Hussein Correspondence',
        tier: 'Last Lesson: British Wartime Pledges'
      },
      {
        question: 'What secret 1916 Anglo-French agreement partitioned Ottoman Arab provinces into British and French spheres of imperial influence?',
        answer: 'The Sykes–Picot Agreement',
        tier: 'Last Lesson: Imperial Partition'
      },
      {
        question: 'What November 1917 British policy statement declared imperial support for the establishment of a \'national home for the Jewish people\' in Palestine?',
        answer: 'The Balfour Declaration',
        tier: 'Last Lesson: British Wartime Pledges'
      },
      {
        question: 'Who was the British Foreign Secretary whose letter to Lord Walter Rothschild became known as the Balfour Declaration?',
        answer: 'Arthur James Balfour',
        tier: 'Last Lesson: Key Individuals'
      },
      {
        question: 'Which international body formally assigned Great Britain the Mandate to govern Palestine in 1922?',
        answer: 'The League of Nations',
        tier: 'Last Lesson: International Mandates'
      },
      {
        question: 'What major general strike and armed rebellion erupted in Palestine in 1936 demanding independence and an immediate halt to Jewish immigration?',
        answer: 'The 1936–1939 Arab Revolt',
        tier: 'Last Lesson: Palestinian Resistance'
      },
      {
        question: 'What 1937 British royal commission first recommended partitioning Palestine into separate Arab and Jewish states?',
        answer: 'The Peel Commission',
        tier: 'Last Lesson: Partition Proposals'
      },
      {
        question: 'What 1939 British government policy paper capped Jewish immigration to 75,000 over five years and severely restricted land sales?',
        answer: 'The 1939 White Paper',
        tier: 'Last Lesson: British Policy Shift'
      },
      {
        question: 'What was the main Jewish underground self-defence militia founded in 1920 to protect Jewish settlements in Mandatory Palestine?',
        answer: 'The Haganah',
        tier: 'Last Lesson: Paramilitary Organisations'
      },
      {
        question: 'Which catastrophic genocide during World War Two saw six million European Jews murdered by Nazi Germany, intensifying international pressure for a Jewish state?',
        answer: 'The Holocaust (Shoah)',
        tier: 'Foundational Knowledge: WWII Catastrophe'
      }
    ]
  },

  // Lesson 3: KT 1.2 The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis
  // Retrieves Lesson 2 (1945–1948 Collapse & 1948 War) & Lesson 1
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Which militant Zionist paramilitary group commanded by Menachem Begin bombed the British administrative and military headquarters at the King David Hotel in July 1946?',
        answer: 'The Irgun (Etzel)',
        tier: 'Last Lesson: Zionist Insurgency'
      },
      {
        question: 'How many British, Arab, and Jewish civil servants and military personnel died in the July 1946 King David Hotel bombing?',
        answer: '91 people',
        tier: 'Last Lesson: Escalating Casualties'
      },
      {
        question: 'Which refugee ship carrying 4,500 Holocaust survivors was intercepted by the Royal Navy in July 1947 and forcibly returned to detention camps in Germany?',
        answer: 'The SS Exodus (Exodus 1947)',
        tier: 'Last Lesson: International PR Disaster'
      },
      {
        question: 'What was the number of the United Nations Resolution passed on 29 November 1947 approving the partition of Palestine into Arab and Jewish states?',
        answer: 'UN Resolution 181',
        tier: 'Last Lesson: UN Partition'
      },
      {
        question: 'What percentage of Mandatory Palestine was allocated to the proposed Jewish state under UN Resolution 181, despite Jews comprising roughly 33% of the population?',
        answer: '55%',
        tier: 'Last Lesson: Territorial Terms'
      },
      {
        question: 'What special international status was designated for the city of Jerusalem under the 1947 UN Partition Plan?',
        answer: 'Corpus Separatum (an international zone administered directly by the United Nations)',
        tier: 'Last Lesson: Jerusalem Status'
      },
      {
        question: 'On what date did David Ben-Gurion read the Declaration of Independence proclaiming the State of Israel in Tel Aviv?',
        answer: '14 May 1948',
        tier: 'Last Lesson: Statehood Proclamation'
      },
      {
        question: 'Which five regular Arab armies invaded Palestine on 15 May 1948 immediately following Israel\'s declaration of independence?',
        answer: 'Egypt, Syria, Transjordan, Lebanon, and Iraq',
        tier: 'Last Lesson: Interstate Invasion'
      },
      {
        question: 'What 1917 British policy document originally promised imperial backing for a \'national home for the Jewish people\' in Palestine?',
        answer: 'The Balfour Declaration',
        tier: 'Earlier in Unit: Foundational Promises'
      },
      {
        question: 'What numerical quota on Jewish immigration over five years had been imposed by the controversial 1939 British White Paper?',
        answer: '75,000 immigrants',
        tier: 'Earlier in Unit: British Immigration Policy'
      }
    ]
  },

  // Lesson 4: KT 1.3 Increased Tension, Nasser, and the Suez Crisis, 1955–1963
  // Retrieves Lesson 3 (1948–49 War Outcomes & Refugee Crisis) & Lessons 1–2
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Approximately how many Palestinian Arabs were displaced from their homes during the 1948–49 War, becoming stateless refugees?',
        answer: 'Approximately 700,000 to 750,000 refugees',
        tier: 'Last Lesson: The Refugee Crisis'
      },
      {
        question: 'What Arabic term, meaning \'The Catastrophe\', is used by Palestinians to describe their mass displacement and loss of homeland in 1948?',
        answer: 'Al-Nakba',
        tier: 'Last Lesson: Core Concepts'
      },
      {
        question: 'Which United Nations relief agency was established in December 1949 to provide emergency food, health, education, and shelter in refugee camps?',
        answer: 'UNRWA (UN Relief and Works Agency for Palestine Refugees)',
        tier: 'Last Lesson: Humanitarian Institutions'
      },
      {
        question: 'What was the number of the December 1948 UN General Assembly Resolution declaring that Palestinian refugees wishing to return to their homes in peace should be permitted to do so?',
        answer: 'UN Resolution 194',
        tier: 'Last Lesson: Right of Return'
      },
      {
        question: 'What name was given to the 1949 armistice demarcation lines that served as the de facto borders of Israel until June 1967?',
        answer: 'The Green Line',
        tier: 'Last Lesson: Armistice Borders'
      },
      {
        question: 'What percentage of Mandatory Palestine did Israel control following the 1949 Armistice Agreements (compared to the 55% allocated by UN Resolution 181)?',
        answer: '78%',
        tier: 'Last Lesson: Territorial Expansion'
      },
      {
        question: 'Which Arab kingdom annexed the West Bank and East Jerusalem in 1950, granting citizenship to Palestinian residents?',
        answer: 'Transjordan (renamed Jordan)',
        tier: 'Last Lesson: Regional Annexation'
      },
      {
        question: 'Which country took military administrative control over the narrow coastal strip of Gaza following the 1949 armistice?',
        answer: 'Egypt',
        tier: 'Last Lesson: Regional Control'
      },
      {
        question: 'What landmark 1950 Israeli legislation granted every Jewish person worldwide the automatic right to immigrate to Israel and claim citizenship?',
        answer: 'The Law of Return (1950)',
        tier: 'Last Lesson: Demographic State-Building'
      },
      {
        question: 'What Arabic term describes armed Palestinian guerrilla infiltrators who carried out cross-border sabotage and raids into Israel during the 1950s?',
        answer: 'Fedayeen (\'self-sacrificers\')',
        tier: 'Last Lesson: Armed Infiltration'
      }
    ]
  },

  // Lesson 5: KT 2.1 Enquiry: How Did Water, Border Raids, and Rhetoric Make a Second Arab-Israeli War Inevitable? (1964–1967)
  // Retrieves Lesson 4 (Nasser & Suez Crisis, 1955–1963) & Lessons 2–3
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Who served as President of Egypt from 1954 to 1970 and emerged as the undisputed leader of Pan-Arab anti-colonial nationalism?',
        answer: 'Gamal Abdel Nasser',
        tier: 'Last Lesson: Key Leaders'
      },
      {
        question: 'On what date did President Nasser nationalise the Suez Canal Company in a historic speech in Alexandria?',
        answer: '26 July 1956',
        tier: 'Last Lesson: Suez Nationalisation'
      },
      {
        question: 'Which two European colonial powers secretly colluded with Israel in October 1956 to topple Nasser and regain control of the canal?',
        answer: 'Great Britain and France',
        tier: 'Last Lesson: Imperial Collusion'
      },
      {
        question: 'What was the code name of the secret tripartite treaty signed in France where Britain, France, and Israel coordinated their military plan?',
        answer: 'The Protocol of Sèvres',
        tier: 'Last Lesson: Secret Agreements'
      },
      {
        question: 'What military operation was launched by Israel on 29 October 1956, rapidly invading and overrunning the Egyptian Sinai Peninsula?',
        answer: 'Operation Kadesh',
        tier: 'Last Lesson: Military Campaigns'
      },
      {
        question: 'Which US President threatened to dump US sterling holdings and block IMF emergency loans unless British forces withdrew from Suez immediately?',
        answer: 'Dwight D. Eisenhower',
        tier: 'Last Lesson: Superpower Pressure'
      },
      {
        question: 'What United Nations peacekeeping force was deployed along the Egyptian-Israeli border and at Sharm el-Sheikh following the 1956 Suez Crisis?',
        answer: 'UNEF (United Nations Emergency Force)',
        tier: 'Last Lesson: UN Peacekeeping'
      },
      {
        question: 'What narrow maritime strait at the entrance to the Gulf of Aqaba was reopened to Israeli shipping under UNEF supervision following the 1956 war?',
        answer: 'The Straits of Tiran',
        tier: 'Last Lesson: Maritime Chokepoints'
      },
      {
        question: 'What Arabic term describes the 1948 mass expulsion and flight of over 700,000 Palestinian Arabs?',
        answer: 'Al-Nakba (\'The Catastrophe\')',
        tier: 'Earlier in Unit: Core Terminology'
      },
      {
        question: 'What 1949 armistice demarcation lines served as the international borders of Israel prior to 1967?',
        answer: 'The Green Line',
        tier: 'Earlier in Unit: Armistice Borders'
      }
    ]
  },

  // Lesson 6: KT 2.2 Enquiry: Why Was the Six-Day War Decided in Three Hours, and Did Nasser Intend to Fight? (May–June 1967)
  // Retrieves Lesson 5 (May 1967 Road to War) & Lessons 3–4
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'In which city was the Palestine Liberation Organisation (PLO) founded at an Arab League summit in January 1964?',
        answer: 'Cairo, Egypt',
        tier: 'Last Lesson: PLO Origins'
      },
      {
        question: 'Which Palestinian guerrilla organisation, founded by Yasser Arafat in Kuwait in 1959, launched armed cross-border raids into Israel via Lebanon and Jordan?',
        answer: 'Fatah',
        tier: 'Last Lesson: Armed Resistance'
      },
      {
        question: 'What strategic basalt plateau overlooking Israeli kibbutzim in the Hula Valley was heavily fortified by Syrian artillery before 1967?',
        answer: 'The Golan Heights',
        tier: 'Last Lesson: Strategic Geography'
      },
      {
        question: 'How many Syrian MiG-21 fighter jets were shot down by the Israeli Air Force in a major air battle on 7 April 1967, flying directly over Damascus?',
        answer: 'Six MiG-21s',
        tier: 'Last Lesson: Escalating Clashes'
      },
      {
        question: 'Which superpower passed false intelligence reports to Cairo on 13 May 1967 alleging that Israel was massing twelve brigades to invade Syria?',
        answer: 'The Soviet Union (USSR)',
        tier: 'Last Lesson: Soviet Disinformation'
      },
      {
        question: 'On 16 May 1967, which international peacekeeping force did President Nasser formally order to evacuate the Sinai Peninsula and Gaza Strip?',
        answer: 'UNEF (United Nations Emergency Force)',
        tier: 'Last Lesson: UNEF Expulsion'
      },
      {
        question: 'On 22 May 1967, which vital shipping strait did President Nasser close to Israeli-flagged ships, severing Israel\'s oil imports and creating a casus belli?',
        answer: 'The Straits of Tiran',
        tier: 'Last Lesson: Maritime Blockade'
      },
      {
        question: 'Which Arab monarch flew to Cairo on 30 May 1967 to sign a mutual military defence pact placing Jordan\'s armed forces under Egyptian command?',
        answer: 'King Hussein of Jordan',
        tier: 'Last Lesson: Arab Encirclement'
      },
      {
        question: 'Who was appointed Israeli Minister of Defence on 1 June 1967 in response to intense public anxiety and political pressure?',
        answer: 'Moshe Dayan',
        tier: 'Last Lesson: Israeli Leadership'
      },
      {
        question: 'What vital international waterway had President Nasser nationalised eleven years earlier in July 1956, triggering the Suez Crisis?',
        answer: 'The Suez Canal',
        tier: 'Earlier in Unit: Suez Crisis'
      }
    ]
  },

  // Lesson 7: KT 2.3 Enquiry: "Land for Peace" or Permanent Stalemate: How Did the 1967 Conquered Territories Transform the Conflict?
  // Retrieves Lesson 6 (Six-Day War Combat, June 1967) & Lessons 4–5
  // ZERO TESTING of Khartoum Summit, "Three Noes", or Resolution 242 (taught in this lesson!)
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'What was the code name of the pre-emptive aerial assault launched by the Israeli Air Force on the morning of 5 June 1967?',
        answer: 'Operation Focus (Moked)',
        tier: 'Last Lesson: Aerial Supremacy'
      },
      {
        question: 'How was the outcome of the Six-Day War virtually decided in the first three hours of combat on the morning of 5 June 1967?',
        answer: 'The IAF destroyed over 300 Egyptian combat aircraft on the ground, securing absolute air supremacy across all fronts',
        tier: 'Last Lesson: Decisive Turning Point'
      },
      {
        question: 'Which Egyptian commander panicked on 6 June and issued a chaotic, uncoordinated general retreat order through the narrow Sinai mountain passes?',
        answer: 'Field Marshal Abdel Hakim Amer',
        tier: 'Last Lesson: Egyptian Command Collapse'
      },
      {
        question: 'What bloody urban battle in East Jerusalem on 6 June 1967 saw Israeli paratroopers defeat entrenched Jordanian troops in fierce trench fighting?',
        answer: 'The Battle of Ammunition Hill (Givat HaTachmoshet)',
        tier: 'Last Lesson: Urban Combat'
      },
      {
        question: 'On what date did Israeli paratroopers capture the Old City of Jerusalem and reach the Western Wall and Temple Mount?',
        answer: '7 June 1967 (Day 3 of the war)',
        tier: 'Last Lesson: Capture of Jerusalem'
      },
      {
        question: 'Which Israeli military rabbi and general famously blew the ram\'s horn (shofar) at the Western Wall upon its capture on 7 June 1967?',
        answer: 'Rabbi Shlomo Goren',
        tier: 'Last Lesson: Key Moments'
      },
      {
        question: 'What heavily fortified Syrian military plateau was assaulted and captured by Israeli armor and infantry on 9–10 June 1967 to end the war?',
        answer: 'The Golan Heights',
        tier: 'Last Lesson: Syrian Front'
      },
      {
        question: 'Which Egyptian president had expelled UNEF peacekeepers and closed the Straits of Tiran in May 1967, provoking the conflict?',
        answer: 'Gamal Abdel Nasser',
        tier: 'Earlier in Unit: Causes of the War'
      },
      {
        question: 'What secret tripartite agreement between Britain, France, and Israel had triggered the 1956 Suez Crisis?',
        answer: 'The Protocol of Sèvres',
        tier: 'Earlier in Unit: 1956 Crisis'
      },
      {
        question: 'What 1949 armistice demarcation lines were fundamentally erased by Israel\'s sweeping military conquests in June 1967?',
        answer: 'The Green Line',
        tier: 'Earlier in Unit: Armistice Borders'
      }
    ]
  },

  // Lesson 8: KT 2.4 The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)
  // Retrieves Lesson 7 (Conquered Territories & Res 242) & Lessons 5–6
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Name three of the five distinct territories captured and occupied by the Israel Defense Forces during the June 1967 Six-Day War.',
        answer: 'Any three of: The Sinai Peninsula, the Gaza Strip, the West Bank, East Jerusalem, the Golan Heights',
        tier: 'Last Lesson: Conquered Territories'
      },
      {
        question: 'By approximately how much did Israel\'s land area expand as a result of its June 1967 territorial conquests?',
        answer: 'It tripled in size (expanded by approximately 300%)',
        tier: 'Last Lesson: Territorial Changes'
      },
      {
        question: 'Approximately how many additional Palestinian Arabs fled or were displaced into Jordan following the 1967 Six-Day War?',
        answer: 'Between 300,000 and 350,000 refugees',
        tier: 'Last Lesson: Refugee Crisis'
      },
      {
        question: 'What sector of Jerusalem was formally annexed by the Israeli Knesset on 27 June 1967, declaring Jerusalem the unified capital of Israel?',
        answer: 'East Jerusalem (including the Old City and holy sites)',
        tier: 'Last Lesson: Jerusalem Annexation'
      },
      {
        question: 'In which Sudanese city did Arab heads of state convene in August–September 1967 to formulate their postwar diplomatic policy?',
        answer: 'Khartoum',
        tier: 'Last Lesson: Arab Diplomacy'
      },
      {
        question: 'What were the famous "Three Noes" declared by Arab leaders in the Khartoum Resolution of September 1967?',
        answer: 'No peace with Israel, no recognition of Israel, no negotiations with Israel',
        tier: 'Last Lesson: The Three Noes'
      },
      {
        question: 'What was the number of the landmark United Nations Security Council Resolution unanimously adopted on 22 November 1967?',
        answer: 'UN Resolution 242',
        tier: 'Last Lesson: UN Diplomacy'
      },
      {
        question: 'What foundational diplomatic formula was established by UN Resolution 242, trading occupied land for peace, recognition, and secure borders?',
        answer: '"Land for Peace"',
        tier: 'Last Lesson: Core Diplomatic Doctrine'
      },
      {
        question: 'What was the name of the Israeli security plan formulated in 1967 proposing agricultural defense settlements along the Jordan Valley as a security barrier?',
        answer: 'The Allon Plan (devised by Yigal Allon)',
        tier: 'Last Lesson: Settlement Policy'
      },
      {
        question: 'What pre-emptive air offensive on 5 June 1967 destroyed the Egyptian Air Force on the ground within three hours?',
        answer: 'Operation Focus',
        tier: 'Earlier in Unit: Six-Day War Tactics'
      }
    ]
  },

  // Lesson 9: KT 2.5 The War of Attrition & The Yom Kippur War (1969–1973)
  // Retrieves Lesson 8 (PLO, Black September, Munich) & Lessons 6–7
  // ZERO TESTING of Bar-Lev Line, Egyptian water cannons, or 6 Oct 1973 surprise offensive!
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Which March 1968 battle in Jordan saw Palestinian fedayeen fighters stubbornly resist an Israeli armored raid, turning Yasser Arafat into a popular hero?',
        answer: 'The Battle of Karameh',
        tier: 'Last Lesson: Rise of the Fedayeen'
      },
      {
        question: 'Who was elected Chairman of the PLO Executive Committee in February 1969, cementing Fatah\'s dominance over the Palestinian national movement?',
        answer: 'Yasser Arafat',
        tier: 'Last Lesson: PLO Leadership'
      },
      {
        question: 'Which Marxist Palestinian guerrilla faction, founded by George Habash, pioneered sensational international airliner hijackings to dramatize the Palestinian cause?',
        answer: 'The Popular Front for the Liberation of Palestine (PFLP)',
        tier: 'Last Lesson: Guerrilla Factions'
      },
      {
        question: 'In which Jordanian desert airstrip did PFLP militants blow up three hijacked Western airliners in front of global television cameras in September 1970?',
        answer: 'Dawson\'s Field',
        tier: 'Last Lesson: Airliner Hijackings'
      },
      {
        question: 'What name was given to the brutal September 1970 civil war in which King Hussein\'s army crushed armed Palestinian militias operating inside Jordan?',
        answer: 'Black September',
        tier: 'Last Lesson: Jordanian Civil War'
      },
      {
        question: 'To which neighboring Mediterranean country was the PLO leadership and thousands of fighters expelled following their defeat in Jordan in 1971?',
        answer: 'Lebanon (establishing headquarters in West Beirut)',
        tier: 'Last Lesson: PLO Relocation'
      },
      {
        question: 'What covert Palestinian terrorist cell carried out the hostage-taking and murder of Israeli athletes at the Munich Olympic Village in September 1972?',
        answer: 'Black September',
        tier: 'Last Lesson: Munich Olympics Attack'
      },
      {
        question: 'How many Israeli athletes, coaches, and officials were murdered during the September 1972 Munich Olympic massacre?',
        answer: '11 Israeli athletes and coaches (plus one German police officer)',
        tier: 'Last Lesson: Munich Casualties'
      },
      {
        question: 'What covert Mossad assassination campaign was authorized by Prime Minister Golda Meir to track down and eliminate Black September operatives across Europe?',
        answer: 'Operation Wrath of God (Mivtza Za\'am HaEl)',
        tier: 'Last Lesson: Israeli Retaliation'
      },
      {
        question: 'What foundational diplomatic principle was established by UN Security Council Resolution 242 in November 1967?',
        answer: '"Land for Peace"',
        tier: 'Earlier in Unit: Core UN Doctrine'
      }
    ]
  },

  // Lesson 10: KT 3.1 Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979
  // Retrieves Lesson 9 (1973 Yom Kippur War & War of Attrition) & Lessons 7–8
  // ZERO TESTING of Kissinger shuttle diplomacy, Likud/Begin election, Sadat in Jerusalem, or Camp David 1978!
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'What static artillery, commando, and aerial border conflict was fought along the Suez Canal between Egypt and Israel from March 1969 to August 1970?',
        answer: 'The War of Attrition',
        tier: 'Last Lesson: Canal Warfare'
      },
      {
        question: 'Who succeeded Gamal Abdel Nasser as President of Egypt following Nasser\'s sudden death from a heart attack in September 1970?',
        answer: 'Anwar Sadat',
        tier: 'Last Lesson: Egyptian Succession'
      },
      {
        question: 'What massive, 20-metre-high sand-rampart defensive line did Israel construct along the east bank of the Suez Canal after 1967?',
        answer: 'The Bar-Lev Line',
        tier: 'Last Lesson: Defensive Fortifications'
      },
      {
        question: 'What innovative tactical method did Egyptian military engineers use on 6 October 1973 to blast breaches through the Bar-Lev Line in hours?',
        answer: 'High-pressure water monitors (water cannons / turbopumps)',
        tier: 'Last Lesson: Operation Badr Tactics'
      },
      {
        question: 'On what Jewish holy day did Egyptian and Syrian forces launch their coordinated surprise offensive against Israeli lines on 6 October 1973?',
        answer: 'Yom Kippur (The Day of Atonement, coinciding with Ramadan)',
        tier: 'Last Lesson: Surprise Attack'
      },
      {
        question: 'What mobile Soviet-supplied surface-to-air missile system provided a deadly protective umbrella over Egyptian troops, shooting down dozens of Israeli Phantoms?',
        answer: 'SAM-6 missiles (and ZSU-23-4 Shilka anti-aircraft guns)',
        tier: 'Last Lesson: Soviet Arms'
      },
      {
        question: 'What ferocious four-day tank battle on the Golan Heights saw approximately 100 Israeli Centurion tanks halt hundreds of attacking Syrian tanks?',
        answer: 'The Battle of the Valley of Tears (Emek HaBakha)',
        tier: 'Last Lesson: Northern Front Combat'
      },
      {
        question: 'Which audacious Israeli general led the armored counter-crossing back across the Suez Canal to mainland Egypt, encircling Egypt\'s Third Army?',
        answer: 'General Ariel Sharon',
        tier: 'Last Lesson: Counter-Crossing'
      },
      {
        question: 'What international cartel of Arab oil producers slashed crude oil production and placed an embargo on nations supporting Israel in October 1973?',
        answer: 'OPEC (specifically OAPEC, Organization of Arab Petroleum Exporting Countries)',
        tier: 'Last Lesson: The Global Oil Shock'
      },
      {
        question: 'What covert Mossad retaliatory campaign had been authorized by Golda Meir following the 1972 Munich Olympic massacre?',
        answer: 'Operation Wrath of God',
        tier: 'Earlier in Unit: Counter-Terrorism'
      }
    ]
  },

  // Lesson 11: KT 3.2 The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada, 1974–1993
  // Retrieves Lesson 10 (Camp David & 1979 Peace Treaty) & Lessons 8–9
  // ZERO TESTING of 1982 Lebanon War, Sabra & Shatila, or 1987 First Intifada!
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'Who served as US Secretary of State and pioneered high-stakes "shuttle diplomacy" flying between Middle Eastern capitals in 1974–75?',
        answer: 'Henry Kissinger',
        tier: 'Last Lesson: Shuttle Diplomacy'
      },
      {
        question: 'Which vital international waterway, closed since the Six-Day War in June 1967, was ceremonially reopened by President Sadat in June 1975?',
        answer: 'The Suez Canal',
        tier: 'Last Lesson: Diplomatic Thaw'
      },
      {
        question: 'Which right-wing Israeli political party won the general election in May 1977, ending 29 unbroken years of Labour party governance?',
        answer: 'Likud',
        tier: 'Last Lesson: Israeli Political Shift'
      },
      {
        question: 'Who became Prime Minister of Israel in May 1977, having formerly commanded the Zionist paramilitary organisation Irgun?',
        answer: 'Menachem Begin',
        tier: 'Last Lesson: Key Leaders'
      },
      {
        question: 'On what historic date did Egyptian President Anwar Sadat land in Tel Aviv and deliver an unprecedented peace address to the Israeli Knesset?',
        answer: '19–20 November 1977',
        tier: 'Last Lesson: Sadat in Jerusalem'
      },
      {
        question: 'Which US President invited Menachem Begin and Anwar Sadat to the Camp David presidential retreat in September 1978 for 13 days of intense mediation?',
        answer: 'Jimmy Carter',
        tier: 'Last Lesson: Camp David Summit'
      },
      {
        question: 'On what date was the formal Egyptian-Israeli Peace Treaty (Treaty of Washington) signed on the White House lawn?',
        answer: '26 March 1979',
        tier: 'Last Lesson: Bilateral Peace Treaty'
      },
      {
        question: 'What major territory captured in 1967 did Israel agree to evacuate and return to Egyptian sovereignty in exchange for full diplomatic peace and recognition?',
        answer: 'The Sinai Peninsula',
        tier: 'Last Lesson: Territorial Concessions'
      },
      {
        question: 'To which North African capital did the Arab League move its official headquarters after voting to suspend Egypt\'s membership in 1979?',
        answer: 'Tunis, Tunisia',
        tier: 'Last Lesson: Arab Backlash'
      },
      {
        question: 'On what date was Egyptian President Anwar Sadat assassinated by radical Islamist soldiers during a military victory parade in Cairo?',
        answer: '6 October 1981',
        tier: 'Last Lesson: Sadat\'s Assassination'
      }
    ]
  },

  // Lesson 12: KT 3.3 Attempts at a Solution: From the Oslo Accords to Oslo II, 1988–1995
  // Retrieves Lesson 11 (Lebanon, Sabra & Shatila, First Intifada) & Lessons 9–10
  // ZERO TESTING of Madrid 1991, Oslo Handshake 1993, Oslo II Areas A/B/C, or Rabin assassination!
  {
    type: 'recall',
    title: 'Do Now: Retrieval Starter',
    instructions: 'Answer the following 10 retrieval questions from prior learning without using notes.',
    items: [
      {
        question: 'In what year did PLO Chairman Yasser Arafat address the UN General Assembly declaring: "I have come bearing an olive branch and a freedom fighter\'s gun"?',
        answer: '1974 (13 November 1974)',
        tier: 'Last Lesson: Arafat at the UN'
      },
      {
        question: 'What popular term described the armed semi-autonomous sanctuary established by the PLO in southern Lebanon during the 1970s?',
        answer: '"Fatahland"',
        tier: 'Last Lesson: Southern Lebanon Enclave'
      },
      {
        question: 'Which Israeli Defence Minister launched "Operation Peace for Galilee" on 6 June 1982, pushing IDF armored divisions all the way to Beirut?',
        answer: 'Ariel Sharon',
        tier: 'Last Lesson: 1982 Lebanon Invasion'
      },
      {
        question: 'To which North African nation were Yasser Arafat and approximately 14,000 PLO fighters evacuated by sea under international protection in August 1982?',
        answer: 'Tunisia (Tunis)',
        tier: 'Last Lesson: PLO Exile'
      },
      {
        question: 'Which Lebanese Christian militia carried out the horrific massacre of hundreds of Palestinian civilians in the Sabra and Shatila refugee camps in September 1982?',
        answer: 'The Christian Phalangists (Kataeb)',
        tier: 'Last Lesson: Sabra and Shatila'
      },
      {
        question: 'What official Israeli judicial commission investigated the Sabra and Shatila massacre and found Ariel Sharon personally and indirectly responsible?',
        answer: 'The Kahan Commission',
        tier: 'Last Lesson: Judicial Inquiries'
      },
      {
        question: 'In which Gaza refugee camp did the First Intifada erupt in December 1987 following a fatal military vehicle collision?',
        answer: 'Jabalia Camp',
        tier: 'Last Lesson: Outbreak of the Intifada'
      },
      {
        question: 'What underground civilian steering committee coordinated strikes, tax boycotts, and civil disobedience during the First Intifada?',
        answer: 'UNLU (Unified National Leadership of the Uprising)',
        tier: 'Last Lesson: Grassroots Resistance'
      },
      {
        question: 'Which Israeli Defence Minister adopted the controversial "iron fist" policy before concluding that the Palestinian uprising could not be halted by military force?',
        answer: 'Yitzhak Rabin',
        tier: 'Last Lesson: IDF Reassessment'
      },
      {
        question: 'What landmark bilateral peace treaty signed on the White House lawn in March 1979 returned the Sinai Peninsula to Egypt in exchange for peace?',
        answer: 'The Egyptian-Israeli Peace Treaty (Treaty of Washington)',
        tier: 'Earlier in Unit: Camp David Accords'
      }
    ]
  }
];

// ==============================================================================
// 2. ENHANCED PRIMARY SOURCES (CONTEXT + HINGE QUESTION + MODEL ANSWER + PROVENANCE)
//    Powers the Dual-Stage Discussion Box across all 12 lessons.
// ==============================================================================

const enhancedSources = [
  // Lesson 1: KT 1.0 Broken Promises
  [
    {
      id: 'cme_sykes_picot_1916',
      title: 'Source A: The Sykes-Picot Agreement Partition Map (8 May 1916)',
      src: '/images/cme_sykes_picot_1916_map.jpg',
      image: '/images/cme_sykes_picot_1916_map.jpg',
      caption: 'The secret partition map signed by Britain\'s Sir Mark Sykes and France\'s François Georges-Picot dividing the Ottoman Empire into direct and indirect European imperial spheres.',
      provenance: 'The National Archives (UK), Kew (TNA MPK 1/426, Foreign Office Records). Direct official archival accession record.',
      source_context: 'Concluded secretly in May 1916 while hundreds of thousands were dying on the Western Front, the Sykes-Picot Agreement carved up the Ottoman provinces using geometric straight lines. Britain claimed Mesopotamia (Iraq) and the ports of Haifa and Acre, while France claimed Syria and Lebanon. Palestine was designated for a vague \'international administration\'. This secret deal directly contradicted British wartime pledges made to Sharif Hussein of Mecca promising an independent Arab state in exchange for an Arab revolt against the Turks. **Hinge Question:** Why did the secret straight-line division of Ottoman provinces in 1916 make long-term sectarian and border conflicts in the modern Middle East virtually inevitable?',
      question: 'Study Source A. Using the partition map and your knowledge, explain why the Sykes-Picot Agreement laid the groundwork for decades of border instability and Arab betrayal.',
      model_answer: 'Source A shows how Britain and France carved up the Middle East using arbitrary straight lines that ignored historic ethnic, tribal, and religious communities. By placing regions like Palestine under international administration and creating artificial borders, the agreement directly contradicted British wartime pledges of independence made to the Arabs in the McMahon-Hussein Correspondence, creating deep-rooted resentment and instability across the region.'
    },
    {
      id: 'cme_balfour_declaration_1917',
      title: 'Source B: The Original Balfour Declaration Letter (2 November 1917)',
      src: '/images/cme_balfour_declaration_1917.jpg',
      image: '/images/cme_balfour_declaration_1917.jpg',
      caption: 'Official 67-word letter from British Foreign Secretary Arthur Balfour to Lord Walter Rothschild conveying the British government\'s declaration of sympathy with Jewish Zionist aspirations.',
      provenance: 'The British Library, London (Add MS 41178, f. 3). Permanent national collection.',
      source_context: 'Written as a brief 67-word letter on 2 November 1917, the Balfour Declaration was issued to rally Jewish international backing during WWI and secure British imperial control over the approaches to the Suez Canal. Crucially, the text deliberately used the vague term \'national home\' rather than \'state\', while adding a safeguarding clause that \'nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities\'. This conspicuous omission of political or national rights for the 90% Arab majority ignited irreconcilable expectations. **Hinge Question:** How did the deliberate linguistic ambiguity of promising a "national home" without political rights for the non-Jewish majority fuel irreconcilable expectations between Zionists and Palestinian Arabs?',
      question: 'Study Source B. How did the wording of the Balfour Declaration create contradictory expectations for Zionists and Palestinian Arabs?',
      model_answer: 'The declaration intentionally used ambiguous wording: it promised British support for the \'establishment in Palestine of a national home for the Jewish people\' without defining whether this meant a sovereign state. Crucially, it added a safeguarding clause stating \'nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities\', conspicuously omitting political and national rights for the 90% Arab majority. Zionists viewed the document as a binding imperial mandate for statehood, whereas Arabs viewed it as colonial betrayal of their right to self-determination.'
    }
  ],

  // Lesson 2: KT 1.1 End of the British Mandate & Creation of Israel
  [
    {
      id: 'cme_king_david_hotel_1946',
      title: 'Source A: The Ruins of the King David Hotel, Jerusalem (22 July 1946)',
      src: '/assets/cme_new_king_david_ruins.png',
      image: '/assets/cme_new_king_david_ruins.png',
      caption: 'The south-west wing of the King David Hotel collapsed following the Irgun bomb detonation, killing 91 British, Arab, and Jewish civil and military personnel.',
      provenance: 'Imperial War Museums (IWM Photo Archive HU 36136). Official British military record.',
      source_context: 'The King David Hotel housed the central Secretariat of the Government of Palestine and the Headquarters of the British Forces in Palestine. Disguised as milk delivery men, Menachem Begin\'s Irgun fighters smuggled 350 kilograms of explosives into the basement cafe. The resulting collapse killed 91 people, sparking outrage in Westminster. **Hinge Question:** How does the total destruction of Britain\'s fortified imperial headquarters illustrate why British military peacekeeping in Palestine had become politically and logistically untenable?',
      question: 'What does Source A reveal about the vulnerability of British authority in Palestine by July 1946?',
      model_answer: 'Source A reveals that British authority was deeply vulnerable, as even its fortified central administrative and military command headquarters could be successfully infiltrated and destroyed in broad daylight by Zionist insurgents, convincing British politicians that policing Palestine was exacting an intolerable human cost.'
    },
    {
      id: 'cme_sergeants_affair_1947',
      title: 'Source B: The Sergeants Affair, Netanya (July 1947)',
      src: '/images/cme_sergeants_affair_1947.jpg',
      image: '/images/cme_sergeants_affair_1947.jpg',
      caption: 'British Army Intelligence Corps sergeants Clifford Martin and Mervyn Paice hanged by the Irgun in a eucalyptus grove near Netanya.',
      provenance: 'Associated Press Archival Wirephoto (AP 470731012). National press record.',
      source_context: 'Abducted as hostages to prevent the British execution of three condemned Irgun fighters, the two 20-year-old British sergeants were hanged and one body was booby-trapped with an anti-personnel mine. When British sappers attempted to cut down the bodies, the mine detonated, severely wounding an officer. Front-page publication in UK newspapers provoked anti-Jewish riots across British cities and led to overwhelming demands in Parliament to abandon the Mandate. **Hinge Question:** Why was this photograph more politically damaging to British domestic morale than the King David Hotel bombing?',
      question: 'Study Source B. Why did this photograph decisively convince the British public and government that Britain must leave Palestine?',
      model_answer: 'The graphic photograph proved that British conscripts were being killed and mutilated in an impossible peacekeeping role. War-weary Britons refused to lose more lives after WWII, sparking anti-Jewish riots and forcing Prime Minister Attlee to refer Palestine to the UN.'
    },
    {
      id: 'cme_exodus_haifa_1947',
      title: 'Source C: The SS Exodus Intercepted off Palestine (July 1947)',
      src: '/units/cme_new/assets/cme_exodus.jpeg',
      image: '/units/cme_new/assets/cme_exodus.jpeg',
      caption: 'The SS Exodus carrying 4,500 Holocaust survivors intercepted by the Royal Navy and returned to displaced persons camps in Germany.',
      provenance: 'Israel Government Press Office (GPO Reference D50-014). Archival record.',
      source_context: 'The SS Exodus 1947 was rammed by British destroyers off the coast of Palestine. Two passengers and a crewman were killed during boarding. Rather than detaining the refugees in Cyprus, Foreign Secretary Ernest Bevin ordered the passengers forcibly returned to displaced persons camps in the British-occupied zone of Germany. International journalists filmed British troops using batons and water cannons against Holocaust survivors, creating an international public relations disaster that destroyed British diplomatic standing in Washington. **Hinge Question:** Why did British naval enforcement of immigration quotas against Holocaust survivors prove so devastating to Britain\'s diplomatic leverage in Washington?',
      question: 'How did Source C damage Great Britain’s international standing during the UN debate on Palestine?',
      model_answer: 'Source C severely damaged British standing because forcing Holocaust survivors back into European detention camps appeared callous and cruel, alienating US public opinion and creating irresistible pressure for a sovereign Jewish state.'
    },
    {
      id: 'cme_bengurion_declaration_1948',
      title: 'Source D: David Ben-Gurion Declaring the State of Israel (14 May 1948)',
      src: '/images/cme_bengurion_declaration_1948.jpg',
      image: '/images/cme_bengurion_declaration_1948.jpg',
      caption: 'David Ben-Gurion reads the Declaration of Independence at the Tel Aviv Museum beneath Theodor Herzl’s portrait on 14 May 1948.',
      provenance: 'Rudi Weissenstein / Israel Government Press Office (GPO D1-073). Official state record.',
      source_context: 'David Ben-Gurion proclaimed Israeli statehood on the afternoon of 14 May 1948, hours before the British Mandate formally expired at midnight and adjacent to coordinated invasions by five neighboring Arab armies. The ceremony took place in secret at the Tel Aviv Museum to evade British interruption or Arab aerial bombardment. **Hinge Question:** Why did Ben-Gurion insist on declaring independence immediately rather than waiting for international UN negotiations?',
      question: 'Study Source D. Why did David Ben-Gurion choose to declare independence beneath the portrait of Theodor Herzl on the exact afternoon British forces withdrew?',
      model_answer: 'Ben-Gurion positioned himself beneath the portrait of Theodor Herzl, the father of political Zionism, to establish direct historical legitimacy between Herzl\'s 1897 vision of a sovereign Jewish homeland and its reality in 1948. Declaring independence on the exact afternoon the British Mandate expired preempted any UN hesitation, establishing sovereign Israeli statehood hours before the anticipated invasion by five Arab armies.'
    }
  ],

  // Lesson 3: KT 1.2 Aftermath of the 1948–49 War & The Palestinian Refugee Crisis
  [
    {
      id: 'cme_palestinian_refugees_1948',
      title: 'Source A: Palestinian Arab Refugees Leaving Galilee on Foot (1948 Nakba)',
      src: '/images/cme_palestinian_refugees_1948.jpg',
      image: '/images/cme_palestinian_refugees_1948.jpg',
      caption: 'Palestinian Arab families carrying household possessions on foot during the 1948 Nakba displacement.',
      provenance: 'Fred Csasznik / UNRWA Photo and Film Archive, Amman (REF-1948-04). UN historical collection.',
      source_context: 'Between late 1947 and the 1949 armistices, approximately 700,000 to 750,000 Palestinian Arabs fled or were expelled from their ancestral homes, representing over half of Palestine\'s Arab population. The displacement was caused by military violence, atrocities like the Deir Yassin massacre, direct expulsions under Plan Dalet in Lydda and Ramle, the flight of Palestinian community leaders, and psychological panic. Following the war, Israel refused to permit the refugees to return, citing national security and demographic survival. **Hinge Question:** Why did the permanent displacement of over 700,000 Palestinian Arabs transform a localized border dispute into an intractable, multi-generational refugee crisis?',
      question: 'What were the primary causes of the flight of over 700,000 Palestinian Arabs between 1947 and 1949?',
      model_answer: 'The displacement resulted from a combination of factors: widespread fear amplified by atrocities such as Deir Yassin, direct expulsions by Jewish forces under Plan Dalet along strategic communication corridors, the collapse of municipal leadership, and Israeli refusal to permit refugees to return following armistices, establishing a chronic grievance that fueled future conflict.'
    },
    {
      id: 'cme_bengurion_declaration_1948_l3',
      title: 'Source B: David Ben-Gurion Declaring Israeli Independence (14 May 1948)',
      src: '/images/cme_bengurion_declaration_1948.jpg',
      image: '/images/cme_bengurion_declaration_1948.jpg',
      caption: 'David Ben-Gurion reading the Declaration of Independence beneath the portrait of Theodor Herzl at the Tel Aviv Museum on 14 May 1948.',
      provenance: 'Israel Government Press Office (GPO Reference D1-073 / Library of Congress 2007684074). State photographic archive.',
      source_context: 'For Israelis, the 14 May 1948 declaration represented the miraculous realization of national self-determination, existential survival after the Holocaust, and a sanctuary for millions of displaced Jews. For Palestinians and neighboring Arab states, it was viewed as an illegitimate colonial intrusion that dispossessed the indigenous population of their homeland. **Hinge Question:** Why was David Ben-Gurion\'s declaration of statehood viewed by Israelis as an existential national resurrection, but by Arab leaders as an illegitimate colonial intrusion?',
      question: 'Why was the declaration of Israeli statehood viewed by Jewish people as historic national redemption, but by Arab states as an illegitimate catastrophe?',
      model_answer: 'For Jewish people, statehood fulfilled Theodor Herzl\'s Zionist vision and offered an essential sovereign sanctuary following the extermination of six million Jews in the Holocaust. For Arab states and Palestinians, it represented a colonial injustice where European guilt was resolved at the expense of Arab inhabitants who were dispossessed of 78% of their historic land.'
    }
  ],

  // Lesson 4: KT 1.3 Increased Tension, Nasser, and the Suez Crisis, 1955–1963
  [
    {
      id: 'cme_nasser_suez_cartoon_1956',
      title: 'Source A: Political Cartoon: "The Man at the Tap" (August 1956)',
      src: '/images/cme_nasser_suez_cartoon_1956.jpg',
      image: '/images/cme_nasser_suez_cartoon_1956.jpg',
      caption: 'Contemporary Political Cartoon: "Der Mann am Hahnen" ("The Man at the Tap") by cartoonist Fritz Behrendt (August 1956). Egyptian President Gamal Abdel Nasser reclines with his hand on the "SUEZ" tap of a giant oil barrel, forcing Britain, France, and the USA to wait in line with oil cans.',
      provenance: 'Fritz Behrendt / Algemeen Handelsblad Archive (Amsterdam, August 1956). Contemporary international press cartoon.',
      source_context: 'Published in Western newspapers in August 1956 following Nasser\'s nationalisation of the Suez Canal, this cartoon depicts European powers as completely vulnerable to Egyptian control. Britain and France received two-thirds of their crude oil from the Persian Gulf via the Suez Canal. Prime Minister Anthony Eden feared Nasser could shut off Europe\'s industrial energy supply at whim, comparing Nasser to a fascist dictator who had to be stopped. **Hinge Question:** How does this contemporary cartoon reflect Western imperial anxieties that control over Persian Gulf oil was slipping into the hands of anti-colonial Arab nationalists?',
      question: 'Study Source A. What can you learn from Source A about European and American fears following President Nasser’s nationalisation of the Suez Canal in 1956?',
      model_answer: 'Source A demonstrates Western fears that Nasser now held an economic stranglehold over the industrialized world. By portraying Nasser reclining casually on the oil tap while Western powers queue with humble cans, the cartoon illustrates Western anxiety that European economic survival and military mobility were at the mercy of anti-colonial Egyptian nationalism.'
    },
    {
      id: 'cme_alahram_suez_1956',
      title: 'Source B: Cairo Newspaper Al-Ahram Announcing the Suez Nationalisation (July 1956)',
      src: '/images/cme_alahram_suez_1956.jpg',
      image: '/images/cme_alahram_suez_1956.jpg',
      caption: 'The front page of Cairo\'s leading daily Al-Ahram featuring Gamal Abdel Nasser\'s announcement nationalising the Suez Canal Company.',
      provenance: 'Al-Ahram Archival Collection, Cairo (Issue 25482, 27 July 1956). Primary press front page.',
      source_context: 'On 26 July 1956, speaking in Alexandria to commemorate the fourth anniversary of the Egyptian Revolution, Nasser delivered a fiery three-hour speech. When he uttered the code word \'de Lesseps\' (the French engineer who built the canal), Egyptian military units seized the canal\'s headquarters in Port Said, Ismailia, and Suez. Nasser declared that canal revenues would fund the construction of the Aswan High Dam after Western powers canceled financial loans. **Hinge Question:** Why did President Nasser\'s defiance of Britain and France in nationalising the Suez Canal transform him into the undisputed leader of Pan-Arab nationalism?',
      question: 'Why did Nasser\'s nationalisation of the Suez Canal make him an instant hero of Pan-Arab nationalism across the Middle East?',
      model_answer: 'Nationalising the Suez Canal proved to ordinary Arab citizens that a Middle Eastern nation could successfully stand up to former colonial masters, reclaim sovereignty over stolen natural resources, and redirect imperial profits to fund domestic development, restoring collective Arab dignity.'
    }
  ],

  // Lesson 5: KT 2.1 Road to the Six-Day War (1964–1967)
  [
    {
      id: 'cme_cairo_summit_1964',
      title: 'Source A: Archival Primary Photograph: Arab Heads of State at the First Arab League Summit in Cairo (January 1964)',
      src: '/images/cme_cairo_summit_1964.jpg',
      image: '/images/cme_cairo_summit_1964.jpg',
      caption: 'Thirteen Arab monarchs and heads of state meeting at the Nile Hilton in Cairo in January 1964, voting to establish the PLO and counter Israel\'s National Water Carrier.',
      provenance: 'Al-Ahram Photo Archive, Cairo / Arab League Secretariat (Summit Record 1964-01). Official diplomatic record.',
      source_context: 'Convened by President Nasser in January 1964 to respond to Israel completing its National Water Carrier diverting Jordan River waters to the Negev, the Cairo Summit marked a major turning point. The leaders resolved to divert the Jordan\'s headwaters in Syria and Lebanon and officially chartered the Palestine Liberation Organisation (PLO). However, behind public unity lay fierce rivalries between traditional monarchies (Jordan, Saudi Arabia) and radical socialist republics (Egypt, Syria). **Hinge Question:** Why did the Arab League decide to create the Palestine Liberation Organisation (PLO) in 1964, and how did this decision alter the nature of Palestinian resistance?',
      question: 'What does Source A reveal about how Arab leaders attempted to present a unified front against Israel in 1964, and what underlying divisions existed?',
      model_answer: 'Source A shows Arab heads of state projecting collective regional unity against Israel\'s water diversion projects by founding the PLO. However, this concealed deep structural rivalries between conservative monarchies like Jordan and radical socialist republics like Egypt and Syria, who frequently used the Palestinian cause to bolster their own domestic legitimacy.'
    },
    {
      id: 'cme_golan_heights_relief_map_1967',
      title: 'Source B: Historical Topographical Map: The Syrian Armistice Line and Golan Heights Overlooking Israeli Settlements (1964–1967)',
      src: '/images/cme_golan_heights_relief_map_1967.jpg',
      image: '/images/cme_golan_heights_relief_map_1967.jpg',
      caption: 'Military relief map illustrating the sheer basalt escarpment of the Golan Heights towering 500 meters over Israeli agricultural kibbutzim in the Hula Valley and Sea of Galilee.',
      provenance: 'Israel Defense Forces Archives (IDFA Cartographic Map 67-GOL-02). Military topographical map.',
      source_context: 'The Golan Heights formed an imposing natural fortress. Syrian artillery batteries and concrete bunkers entrenched along the cliffs regularly bombarded Israeli tractors and farming communities in the valley below. Between 1964 and 1966, repeated clashes erupted over disputed demilitarized zones and water diversion machinery, driving the Israeli military command to consider capturing the heights to secure Galilee. **Hinge Question:** How did the sheer topography of the Golan Heights give Syria a decisive tactical advantage over Israeli settlements in the Hula Valley below?',
      question: 'Explain how the physical topography of the Golan Heights shown in Source B contributed directly to the outbreak of the Six-Day War.',
      model_answer: 'Source B demonstrates that Syrian forces held commanding high ground overlooking Israeli kibbutzim, allowing artillery to shell Israeli farmers with impunity. This tactical vulnerability forced Israel to launch pre-emptive air and ground operations to protect its northern civilian population, escalating the border conflict toward open war.'
    }
  ],

  // Lesson 6: KT 2.2 The Six-Day War (June 1967)
  [
    {
      id: 'cme_six_day_war_airfield_1967',
      title: 'Source A: Archival Photograph: Destroyed Egyptian Jet Aircraft at Bir Gifgafa Airfield, Sinai (5 June 1967)',
      src: '/images/cme_six_day_war_airfield_1967.jpg',
      image: '/images/cme_six_day_war_airfield_1967.jpg',
      caption: 'Charred wreckage of Egyptian MiG-21 and MiG-17 combat aircraft caught on the runway during the opening wave of Operation Focus on the morning of 5 June 1967.',
      provenance: 'Imperial War Museums (IWM Photograph Archive MH 31548 / IDF Aerial Reconnaissance). Combat record.',
      source_context: 'At 07:45 on 5 June 1967, nearly 200 Israeli aircraft flew low over the Mediterranean beneath Egyptian radar nets. Arriving over Egyptian airfields while pilots were eating breakfast, the IAF dropped specialized runway-cratering bombs before destroying over 300 combat jets on the tarmac. Within three hours, the Egyptian Air Force was eradicated, granting Israel total air supremacy. **Hinge Question:** Why was the destruction of the Egyptian Air Force on the ground during the first three hours of combat the decisive military factor of the entire Six-Day War?',
      question: 'Why was the military operation shown in Source A considered the decisive turning point of the entire Six-Day War?',
      model_answer: 'Destroying over 300 Egyptian combat aircraft on the ground in the first three hours gave the Israeli Air Force total air supremacy. Without air cover, Egyptian armor in Sinai and Jordanian forces in the West Bank were completely defenseless against relentless Israeli close air support, making an Arab military defeat inevitable.'
    },
    {
      id: 'cme_paratroopers_western_wall_1967',
      title: 'Source B: Archival Primary Photograph: Israeli Paratroopers at the Western Wall, Jerusalem (David Rubinger, 7 June 1967)',
      src: '/images/cme_paratroopers_western_wall_1967.jpg',
      image: '/images/cme_paratroopers_western_wall_1967.jpg',
      caption: 'Israeli paratroopers Zion Karasenti, Yitzhak Yifat, and Haim Oshri gazing at the Western Wall in the Old City of Jerusalem moments after its capture on 7 June 1967.',
      provenance: 'David Rubinger / Government Press Office (Israel) (GPO Photo D70-089). Iconic national photograph.',
      source_context: 'Taken by photojournalist David Rubinger on the morning of 7 June 1967, this image captures Israeli soldiers at the Western Wall (Kotel) minutes after Colonel Motta Gur radioed the famous message: \'The Temple Mount is in our hands\'. Jews had been barred from visiting their holiest prayer site during 19 years of Jordanian rule. The capture triggered immense religious and national euphoria across Israel, cementing East Jerusalem\'s reunification. **Hinge Question:** How did the capture of the Western Wall transform Israeli public perception of the war from an act of military self-defence into a historic spiritual reunification?',
      question: 'Study Source B. What does this famous photograph reveal about the emotional and religious significance of capturing East Jerusalem for the Israeli people in 1967?',
      model_answer: 'Source B reveals profound emotional relief and awe. Having been denied access to their holiest prayer site for 19 years under Jordanian rule, the paratroopers standing bareheaded before the stones symbolized the spiritual culmination of 2,000 years of Jewish exile, transforming Jerusalem into what Israelis declared their eternal, indivisible capital.'
    }
  ],

  // Lesson 7: KT 2.3 Conquered Territories & UN Resolution 242
  [
    {
      id: 'cme_1967_occupied_territories_cia_map',
      title: 'Source A: Archival Primary Map: The Conquered Occupied Territories Following the Six-Day War (June 1967)',
      src: '/images/cme_1967_occupied_territories_cia_map.png',
      image: '/images/cme_1967_occupied_territories_cia_map.png',
      caption: 'Official CIA cartographic map delineating the ceasefire lines following the Six-Day War, highlighting the captured Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights.',
      provenance: 'US National Archives and Records Administration (NARA / CIA Directorate of Intelligence Map 500312). Public domain government map.',
      source_context: 'By 10 June 1967, Israel had captured territories three times the size of its pre-war boundaries: the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria. While these conquered lands provided immense strategic depth against future foreign invasion, they brought over one million Palestinian Arabs under direct Israeli military rule. **Hinge Question:** How did capturing territories three times the size of Israel fundamentally alter Israel\'s strategic security while creating an acute demographic dilemma?',
      question: 'Using Source A and your knowledge, explain the strategic advantages and demographic dilemmas Israel faced after capturing these territories in 1967.',
      model_answer: 'Source A shows that Israel gained immense strategic depth: the Sinai buffered the Negev, the Golan protected Galilee, and the West Bank created a defensible border along the Jordan River. However, incorporating over one million disenfranchised Palestinian Arabs created an acute demographic dilemma: granting them voting rights threatened Israel\'s Jewish majority, while military occupation undermined its democratic legitimacy.'
    }
  ],

  // Lesson 8: KT 2.4 Palestinian Resistance: PLO, Black September & Munich
  [
    {
      id: 'cme_dawsons_field_1970',
      title: 'Source A: Archival Photograph: PFLP Militants Detonating Hijacked Commercial Airliners at Dawson\'s Field, Jordan (12 September 1970)',
      src: '/images/cme_dawsons_field_1970.jpg',
      image: '/images/cme_dawsons_field_1970.jpg',
      caption: 'Three hijacked commercial jetliners (Swissair, TWA, and BOAC) detonated simultaneously by Marxist PFLP guerrillas on a desert airstrip in Zarqa, Jordan.',
      provenance: 'Associated Press Photo Archive (AP 700912015). Contemporary newsphoto.',
      source_context: 'In September 1970, George Habash\'s PFLP hijacked four international airliners, landing three at Dawson\'s Field in Jordan. After evacuating civilian hostages, militants blew up the multi-million-dollar jets before world television cameras. This brazen defiance humiliated King Hussein of Jordan in his own kingdom, triggering the Black September civil war where the Jordanian Army crushed and expelled Palestinian militias to Lebanon. **Hinge Question:** Why did Palestinian armed factions turn to international airliner hijackings after 1967, and why did this provoke King Hussein to launch Black September?',
      question: 'Study Source A. Why did militant Palestinian factions carry out high-profile international airliner hijackings during the early 1970s?',
      model_answer: 'After conventional Arab armies suffered crushing defeat in the 1967 Six-Day War, Palestinian factions concluded conventional warfare would never liberate Palestine. By hijacking Western airliners and blowing them up before global media, they forced the world to recognize the Palestinian cause as a distinct national liberation struggle rather than a mere refugee problem.'
    },
    {
      id: 'cme_munich_1972_balcony',
      title: 'Source B: Archival Primary Photograph: Masked Black September Gunman on the Balcony at Munich Olympic Village (5 September 1972)',
      src: '/images/cme_munich_1972_balcony.jpg',
      image: '/images/cme_munich_1972_balcony.jpg',
      caption: 'A masked militant of the Black September faction standing on the balcony of 31 Connollystraße during the Munich Olympic hostage crisis.',
      provenance: 'Kurt Strumpf / Associated Press (AP 720905018). Worldwide news photograph.',
      source_context: 'On 5 September 1972, eight Black September terrorists stormed the Israeli Olympic quarters in Munich, murdering two athletes and taking nine hostage. Broadcast live to 900 million television viewers worldwide, the crisis ended in a botched rescue attempt at Fürstenfeldbruck airfield where all nine hostages, five terrorists, and a German policeman were killed. The massacre prompted Golda Meir to authorize Operation Wrath of God. **Hinge Question:** How did the live television broadcast of the Munich Olympic attack transform international terrorism into a global media spectacle?',
      question: 'What does Source B reveal about how the Black September organisation weaponized global media coverage to publicize their cause?',
      model_answer: 'Source B captures the masked terrorist peering from the Olympic balcony directly into global living rooms. By striking at the \'Peace Olympics\' before 900 million viewers, Black September demonstrated that international terrorism could hijack global mass media to amplify psychological shock and force their political demands onto the world stage.'
    }
  ],

  // Lesson 9: KT 2.5 War of Attrition & The Yom Kippur War
  [
    {
      id: 'cme_egyptians_crossing_suez_1973',
      title: 'Source A: Archival Photograph: Egyptian Infantry and Armored Columns Crossing the Suez Canal (October 1973)',
      src: '/images/cme_egyptians_crossing_suez_1973.jpg',
      image: '/images/cme_egyptians_crossing_suez_1973.jpg',
      caption: 'Egyptian soldiers raising the national flag on the east bank of the Suez Canal after breaching the Bar-Lev Line during Operation Badr on 6 October 1973.',
      provenance: 'Egyptian Armed Forces Directorate of Moral Affairs / Al-Ahram Archive. Official military photograph.',
      source_context: 'At 14:00 on 6 October 1973, 100,000 Egyptian troops launched Operation Badr across the Suez Canal while soldiers fasted for Yom Kippur and Ramadan. Using high-pressure water cannons, engineers blasted through 20-metre sand ramparts in hours, laying pontoon bridges and ferrying armor across. Protected by mobile Soviet SAM-6 missile umbrellas, Egypt dealt the IDF a profound tactical shock. **Hinge Question:** How did Egypt\'s successful crossing of the Suez Canal and breaching of the Bar-Lev Line shatter the psychological myth of Israeli invincibility?',
      question: 'Why did the military crossing shown in Source A cause such profound psychological shock across Israeli society?',
      model_answer: 'Source A depicts the successful breaching of the supposedly impregnable Bar-Lev Line. After the easy victory of 1967, Israeli military intelligence had assumed Arab armies were incapable of coordinated assault. The surprise crossing and heavy initial IDF casualties shattered Israeli overconfidence, demonstrating that holding captured territory did not guarantee security.'
    },
    {
      id: 'cme_israeli_crossing_suez_1973',
      title: 'Source B: Archival Photograph: Israeli Armored Vehicles Crossing the Suez Canal to the West Bank (October 1973)',
      src: '/images/cme_israeli_crossing_suez_1973.jpg',
      image: '/images/cme_israeli_crossing_suez_1973.jpg',
      caption: 'Israeli Centurion and Patton tanks crossing pontoon bridges over the Suez Canal into mainland Egypt under General Ariel Sharon.',
      provenance: 'Israel Defense Forces Archive (IDFA Photo 73-SUEZ-104). Official combat photograph.',
      source_context: 'On 15–16 October 1973, General Ariel Sharon exploited a seam between Egypt\'s Second and Third Armies at the Deversoir crossing. Ferried across on pontoon rafts, Israeli armor established a bridgehead on the Egyptian mainland, destroying Soviet SAM anti-aircraft missile batteries and encircling Egypt\'s 20,000-man Third Army, threatening Cairo and forcing an immediate superpower ceasefire. **Hinge Question:** Why was Sharon\'s counter-crossing into mainland Egypt strategically decisive in turning the military tide and trapping Egypt\'s Third Army?',
      question: 'Study Source B. How did the military counter-offensive shown in this photograph alter the strategic balance of the 1973 Yom Kippur War?',
      model_answer: 'Source B illustrates Sharon\'s counter-crossing onto mainland Egypt, which destroyed the Soviet SAM missile umbrella that had protected Egyptian infantry. By encircling Egypt\'s Third Army and advancing to within 101 kilometers of Cairo, the IDF reversed initial tactical defeats, forcing the Soviet Union and US to impose an immediate UN ceasefire.'
    }
  ],

  // Lesson 10: KT 3.1 Diplomatic Negotiations: Shuttle Diplomacy to Camp David
  [
    {
      id: 'cme_sadat_knesset_1977',
      title: 'Source A: Archival Photograph: President Anwar Sadat Addressing the Israeli Knesset in Jerusalem (20 November 1977)',
      src: '/units/cme_new/assets/anwar_sadat.jpg',
      image: '/units/cme_new/assets/anwar_sadat.jpg',
      caption: 'Egyptian President Anwar Sadat addressing members of the Israeli Knesset from the podium in Jerusalem on 20 November 1977, seated beside Menachem Begin.',
      provenance: 'Israel Government Press Office (GPO Photo D77-1120). State archival record.',
      source_context: 'For three decades, no Arab head of state had ever set foot on Israeli soil or recognized Israel\'s sovereignty. In November 1977, President Sadat stunned the world by declaring to Egypt\'s parliament that he was willing to go to Jerusalem to talk peace. His speech to the Knesset dismantled the immense psychological wall of fear, assuring Israelis that Egypt genuinely sought mutual peace while insisting on the return of occupied Arab lands and Palestinian rights. **Hinge Question:** Why was Anwar Sadat\'s personal address to the Knesset regarded as the most decisive psychological breakthrough in Middle Eastern diplomatic history?',
      question: 'Why was Anwar Sadat\'s address to the Israeli parliament shown in Source A considered an extraordinary historical turning point?',
      model_answer: 'Sadat\'s address was an unprecedented psychological breakthrough. By flying directly to Jerusalem and speaking face-to-face with his former enemies, Sadat shattered 30 years of Arab diplomatic refusal to recognize Israel, convincing a skeptical Israeli public that an Arab leader was genuinely willing to embrace peace.'
    },
    {
      id: 'cme_camp_david_1978',
      title: 'Source B: Archival Photograph: Menachem Begin, Jimmy Carter, and Anwar Sadat at Camp David (September 1978)',
      src: '/images/cme_camp_david_1978.jpg',
      image: '/images/cme_camp_david_1978.jpg',
      caption: 'President Jimmy Carter confers informally with Israeli Prime Minister Menachem Begin and Egyptian President Anwar Sadat on a woodland path at the Camp David presidential retreat.',
      provenance: 'White House Photographic Collection / Jimmy Carter Presidential Library (NARA ARC 173921). Official US presidential record.',
      source_context: 'Over 13 grueling days in September 1978, President Jimmy Carter sequestered Begin and Sadat at Camp David in Maryland. Relations between the two leaders became so acrimonious that they refused to speak directly to each other for days, communicating only through Carter\'s shuttle diplomacy between their cabins. Carter saved the talks from collapse by appealing personally to Begin using inscribed photos for his grandchildren. **Hinge Question:** What critical role did Jimmy Carter\'s personal presidential mediation play in preventing Begin and Sadat from walking out of Camp David?',
      question: 'Study Source B. What does this photograph indicate about the diplomatic methodology employed by President Carter at Camp David?',
      model_answer: 'Source B illustrates Carter\'s informal, high-intensity mediation strategy: isolating the bitter adversaries in a secluded woodland retreat away from the media, applying continuous personal pressure, and directly bridging deep ideological impasses until both leaders agreed to sign the Camp David Accords.'
    },
    {
      id: 'cme_sinai_peninsula_map_1979',
      title: 'Source C: Cartographic Map: The Sinai Peninsula and Camp David Demilitarization Zones (1979)',
      src: '/images/cme_sinai_peninsula_map.jpg',
      image: '/images/cme_sinai_peninsula_map.jpg',
      caption: 'Map showing the phased withdrawal zones (A, B, C) and demilitarization buffers established by the 1979 Egyptian-Israeli Peace Treaty.',
      provenance: 'US Department of State Cartographic Section (Treaty Annex II Map). Official diplomatic map.',
      source_context: 'Under the 1979 Peace Treaty, Israel agreed to return 100% of the Sinai Peninsula (over 60,000 square kilometers) to Egyptian sovereignty over a three-year phased withdrawal, dismantling major airbases, oil fields, and civilian settlements like Yamit. In exchange, Egypt guaranteed full diplomatic relations, open passage through the Suez Canal, and strict demilitarization enforced by international observers. **Hinge Question:** Why was Menachem Begin willing to return 100% of the oil-rich Sinai Peninsula and demolish Israeli settlements like Yamit in exchange for peace with Egypt?',
      question: 'Explain the core territorial compromise shown in Source C that allowed Egypt and Israel to conclude their 1979 peace treaty.',
      model_answer: 'Source C delineates the "Land for Peace" compromise: Israel agreed to dismantle all its settlements, airbases, and military posts across the entire Sinai Peninsula, returning it to Egypt in exchange for full diplomatic recognition, demilitarized buffer zones, and open navigation through the Suez Canal.'
    },
    {
      id: 'cme_treaty_triple_handshake_1979',
      title: 'Source D: Archival Photograph: The Triple Handshake at the Egypt-Israel Peace Treaty Signing (26 March 1979)',
      src: '/images/cme_treaty_triple_handshake_1979.jpg',
      image: '/images/cme_treaty_triple_handshake_1979.jpg',
      caption: 'Menachem Begin, Jimmy Carter, and Anwar Sadat joining hands on the North Lawn of the White House following the signing of the Treaty of Washington.',
      provenance: 'White House Photographic Collection / US National Archives (NARA ARC 7273340). Historic public record.',
      source_context: 'Signed on 26 March 1979, the Egypt-Israel Peace Treaty removed the Arab world\'s most powerful military state from the conflict, guaranteeing that Israel would never again face a multi-front conventional war with Egypt. However, the treaty was reviled by other Arab nations as a separate betrayal of the Palestinians. The Arab League expelled Egypt, relocated its headquarters to Tunis, and on 6 October 1981, radical Islamist soldiers assassinated Sadat in Cairo. **Hinge Question:** Why did the 1979 Peace Treaty lead to Egypt\'s total expulsion from the Arab League and the eventual assassination of Anwar Sadat?',
      question: 'Study Source D. What were the historic achievements and the severe regional consequences of the peace treaty signed in this photograph?',
      model_answer: 'Source D represents the historic bilateral peace that neutralized the threat of another major interstate Arab-Israeli war by removing Egypt from the battlefield. However, Arab states condemned Sadat for signing a separate peace that abandoned Palestinian rights, expelling Egypt from the Arab League and culminating in Sadat\'s assassination by Islamist extremists in 1981.'
    }
  ],

  // Lesson 11: KT 3.2 The Palestinian Issue: Lebanon, Sabra & Shatila, First Intifada
  [
    {
      id: 'cme_arafat_un_1974',
      title: 'Source A: Archival Photograph: Yasser Arafat Addressing the United Nations General Assembly in New York (13 November 1974)',
      src: '/images/cme_arafat_un_1974.png',
      image: '/images/cme_arafat_un_1974.png',
      caption: 'PLO Chairman Yasser Arafat wearing his keffiyeh and holster, addressing the UN General Assembly after the UN recognized the PLO as the representative of the Palestinian people.',
      provenance: 'United Nations Photo Archive, New York (UN Photo 128456 / Yutaka Nagata). Official UN photograph.',
      source_context: 'On 13 November 1974, Yasser Arafat became the first representative of a non-state entity to address a plenary meeting of the UN General Assembly. He famously concluded his address with the words: \'I have come bearing an olive branch and a freedom fighter\'s gun. Do not let the olive branch fall from my hand\'. Shortly after, the UN granted the PLO permanent observer status and affirmed the inalienable right of the Palestinian people to self-determination. **Hinge Question:** What was the strategic significance of Yasser Arafat\'s warning to the UN General Assembly: "Do not let the olive branch fall from my hand"?',
      question: 'What does Source A reveal about the transformation of the PLO from an underground guerrilla group into an internationally recognized diplomatic body?',
      model_answer: 'Source A captures the moment the PLO achieved global diplomatic legitimacy. By addressing the UN General Assembly and offering a choice between peaceful diplomacy (the olive branch) and armed struggle (the gun), Arafat established the PLO as the recognized voice of Palestinian national aspirations.'
    },
    {
      id: 'cme_lebanon_1982_campaign_map',
      title: 'Source B: Military Operations Map of the 1982 Lebanon Invasion (\'Operation Peace for Galilee\')',
      src: '/images/cme_lebanon_1982_campaign_map.png',
      image: '/images/cme_lebanon_1982_campaign_map.png',
      caption: 'Cartographic map showing the three Israeli armored thrusts into Lebanon in June 1982 advancing past the initial 40km buffer zone to encircle West Beirut.',
      provenance: 'US Army Command and General Staff College / Combat Studies Institute Map 82-LEB-01. Academic military analysis.',
      source_context: 'Launched on 6 June 1982 under Defence Minister Ariel Sharon, Operation Peace for Galilee was initially presented to the Israeli cabinet as a limited 40-kilometer incursion to push PLO Katyusha rockets out of range of northern Israeli towns. However, Sharon pushed IDF armored divisions all the way to Beirut, laying siege to the city for ten weeks. While forcing Arafat\'s PLO fighters into exile in Tunis, the invasion resulted in the horrific Sabra and Shatila massacre, triggering massive protests in Tel Aviv and the Kahan Commission inquiry. **Hinge Question:** How did Ariel Sharon\'s decision to push Israeli forces beyond the 40km buffer zone all the way to Beirut provoke an acute political and moral crisis within Israel?',
      question: 'Explain how the military operations shown in Source B caused deep political controversy and moral debate within Israel.',
      model_answer: 'Source B shows how Sharon expanded a supposedly limited 40-kilometer security incursion into an all-out assault on an Arab capital (Beirut). The high civilian death toll, the siege of West Beirut, and the subsequent Sabra and Shatila massacre destroyed Israeli national consensus, triggering protests of 400,000 citizens in Tel Aviv and forcing Sharon\'s resignation.'
    },
    {
      id: 'cme_first_intifada_1987',
      title: 'Source C: Archival Photograph: Palestinian Youths Confronting Armoured Patrols in Gaza (First Intifada, December 1987)',
      src: '/units/cme_new/assets/first_intifada.png',
      image: '/units/cme_new/assets/first_intifada.png',
      caption: 'Palestinian youths using slingshots and throwing stones at an Israeli military vehicle behind burning tire barricades in Gaza.',
      provenance: 'Agence France-Presse (AFP Photo / Patrick Baz). International wire photo.',
      source_context: 'Sparked in December 1987 in Gaza\'s Jabalia camp after an Israeli military truck collision killed four Palestinian workers, the First Intifada was a spontaneous, grassroots uprising led by local youths and women\'s committees. Rather than conventional guerrilla warfare, Palestinians engaged in mass strikes, tax refusal, and stone-throwing against IDF tanks. Global broadcast footage of Israeli soldiers beating stone-throwers damaged Israel\'s international standing, convincing Yitzhak Rabin that military force could not maintain the occupation. **Hinge Question:** Why did the First Intifada prove that Israel\'s military dominance against foreign armies could not maintain perpetual control over a civilian population?',
      question: 'Study Source C. How did the asymmetric nature of the First Intifada create an acute tactical and political dilemma for the Israeli government?',
      model_answer: 'Source C shows the asymmetric contrast: armed soldiers in armored vehicles confronted by civilian teenagers armed only with stones. The IDF was trained for conventional tank warfare, not riot policing; television broadcasts of soldiers beating youths damaged Israel\'s international standing, convincing pragmatic leaders like Rabin that the occupation was politically and militarily unmanageable.'
    }
  ],

  // Lesson 12: KT 3.3 Attempts at a Solution: Oslo Accords to Oslo II
  [
    {
      id: 'cme_madrid_conference_1991',
      title: 'Source A: Archival Photograph: The Opening Session of the Madrid Peace Conference (October 1991)',
      src: '/images/cme_madrid_conference_1991.jpg',
      image: '/images/cme_madrid_conference_1991.jpg',
      caption: 'US President George H.W. Bush and Soviet President Mikhail Gorbachev co-chairing the historic Madrid Peace Conference alongside Israeli, Syrian, Lebanese, and Jordanian-Palestinian delegations.',
      provenance: 'US National Archives / George H.W. Bush Presidential Library (NARA ARC 186542). Official state photograph.',
      source_context: 'Convened in October 1991 following the Gulf War, the Madrid Conference brought Israel face-to-face with delegations from Syria, Lebanon, Jordan, and the Palestinians for the first time in history. Co-chaired by the US and USSR, it broke the taboo against multilateral direct negotiations, creating the diplomatic momentum that eventually enabled secret backchannel talks in Norway. **Hinge Question:** Why was the 1991 Madrid Conference necessary to break the historical taboo of direct bilateral negotiations between Israel and Arab delegations?',
      question: 'Study Source A. Why was the Madrid Peace Conference considered a vital diplomatic breakthrough despite producing few immediate treaties?',
      model_answer: 'Source A shows Israeli and Arab delegations seated around the same negotiation table for the first time in history. Co-sponsored by the US and USSR after the Gulf War, Madrid broke the psychological taboo against direct multilateral face-to-face diplomacy, establishing the bilateral negotiation tracks that made the secret Oslo talks possible.'
    },
    {
      id: 'cme_oslo_handshake_1993',
      title: 'Source B: Archival Photograph: The Historic Oslo I Handshake on the White House Lawn (13 September 1993)',
      src: '/images/oslo_handshake.jpg',
      image: '/images/oslo_handshake.jpg',
      caption: 'President Bill Clinton opens his arms as Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shake hands following the signing of the Declaration of Principles on 13 September 1993.',
      provenance: 'White House Photographic Office / William J. Clinton Presidential Library (NARA ARC 7273344 / Vince Musi). Official presidential photograph.',
      source_context: 'Negotiated secretly in Norway by Israeli academics and PLO officials, the Oslo I Accord saw mutual recognition: the PLO renounced terrorism and recognized Israel\'s right to exist in peace, while Israel recognized the PLO as the representative of the Palestinian people. The iconic White House lawn handshake between sworn enemies Rabin and Arafat symbolized global hope for a two-state solution, establishing interim Palestinian self-government in Gaza and Jericho. **Hinge Question:** How did the mutual recognition achieved in the Oslo Accords dismantle the central existential premise that had driven the conflict since 1948?',
      question: 'What core historic compromises were made by Yitzhak Rabin and Yasser Arafat in the Oslo I Accord depicted in Source B?',
      model_answer: 'Source B captures mutual existential recognition: for the first time, Israel formally recognized the PLO as the legitimate representative of the Palestinian people, while the PLO renounced terrorism and officially recognized Israel\'s right to exist in peace and security, establishing interim Palestinian self-governance in Gaza and Jericho.'
    },
    {
      id: 'cme_oslo_areas_map_1995',
      title: 'Source C: Cartographic Map: The Fragmentation of the West Bank into Areas A, B, and C under Oslo II (1995)',
      src: '/images/cme_oslo_areas_map.png',
      image: '/images/cme_oslo_areas_map.png',
      caption: 'Map detailing the patchwork division of the West Bank under the 1995 Oslo II Interim Agreement: Area A (Palestinian civil/security), Area B (Palestinian civil/Israeli security), and Area C (full Israeli civil/military control).',
      provenance: 'United Nations Office for the Coordination of Humanitarian Affairs (OCHA Cartographic Section). UN official map.',
      source_context: 'The September 1995 Oslo II agreement divided the West Bank into a patchwork of non-contiguous enclaves: Area A (3% of land, covering major Palestinian cities under full PA control), Area B (24% of land, under PA civil control and Israeli military control), and Area C (73% of land, under exclusive Israeli military and civil control, containing all Jewish settlements and bypass roads). This territorial fragmentation made everyday Palestinian life dependent on Israeli military checkpoints. **Hinge Question:** Why did the division of the West Bank into non-contiguous Areas A, B, and C make a viable, independent Palestinian state extraordinarily difficult to implement in practice?',
      question: 'Explain how the territorial division of the West Bank into Areas A, B, and C shown in Source C undermined Palestinian faith in the Oslo peace process.',
      model_answer: 'Source C shows how Oslo II fragmented the West Bank into isolated archipelagos. With Israel retaining exclusive military and planning control over Area C (over 70% of the land), Israeli settlements continued to expand, while Palestinian travel between towns remained subject to Israeli military checkpoints, convincing Palestinians that interim autonomy was merely entrenching perpetual occupation.'
    },
    {
      id: 'cme_rabin_assassination_1995',
      title: 'Source D: Archival Photograph: The Tel Aviv Peace Rally Moments Before the Assassination of Yitzhak Rabin (4 November 1995)',
      src: '/units/cme_new/assets/rabinovich_cover.png',
      image: '/units/cme_new/assets/rabinovich_cover.png',
      caption: 'Prime Minister Yitzhak Rabin singing the \'Song of Peace\' (Shir LaShalom) before 100,000 cheering Israelis in Kings of Israel Square, Tel Aviv, minutes before his murder.',
      provenance: 'Shalom Bar-Tal / Yedioth Ahronoth Photo Archive (Tel Aviv, 4 November 1995). Historical newsphoto.',
      source_context: 'On the evening of 4 November 1995, over 100,000 Israelis packed Kings of Israel Square in Tel Aviv under the banner \'Yes to Peace, No to Violence\'. Yitzhak Rabin sang the Song of Peace and folded the lyric sheet into his breast pocket. As he descended the steps to his limousine, a right-wing Jewish religious-nationalist extremist named Yigal Amir fired three hollow-point bullets into Rabin\'s back, shouting that Rabin was a traitor giving away biblical land. Rabin\'s death struck a devastating blow to the Oslo peace momentum. **Hinge Question:** Why did the assassination of Yitzhak Rabin by a Jewish extremist demonstrate that internal ideological divisions within Israeli society were just as threatening to peace as interstate conflict?',
      question: 'Study Source D. How did the assassination of Prime Minister Yitzhak Rabin on 4 November 1995 fatally derail the Oslo peace process?',
      model_answer: 'Rabin\'s assassination by a Jewish religious extremist shattered the domestic political consensus supporting the peace process. It proved that internal ideological opposition to territorial withdrawal was violent and deeply entrenched, creating a political vacuum that allowed right-wing opponents to win power and freeze further implementation of the Oslo Accords.'
    }
  ]
];

// ==============================================================================
// 3. SYNCHRONIZE DATA FILES (units/cme_new/data.js and public/units/cme_new/data.js)
// ==============================================================================

async function updateDataFiles() {
  console.log('🔄 Importing CME unitData module...');
  const mod = await import(pathToFileURL(dataFile).href);
  const unitData = mod.unitData;

  console.log(`Found ${unitData.lessons.length} lessons in unitData.`);
  if (unitData.lessons.length !== 12) {
    throw new Error(`Expected 12 lessons, but found ${unitData.lessons.length}`);
  }

  // Update Do Nows and Sources on each lesson
  for (let i = 0; i < 12; i++) {
    const lesson = unitData.lessons[i];
    lesson.do_now = rebalancedDoNows[i];
    lesson.sources = enhancedSources[i];
    console.log(`Updated Lesson ${i + 1}: ${lesson.id || lesson.title} (Do Now items: ${lesson.do_now.items.length}, Sources: ${lesson.sources.length})`);
  }

  // Serialize updated module back to disk
  const updatedCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;

  fs.writeFileSync(dataFile, updatedCode, 'utf8');
  console.log(`✅ Written updated units/cme_new/data.js (${(fs.statSync(dataFile).size / 1024).toFixed(1)} KB)`);

  fs.writeFileSync(publicDataFile, updatedCode, 'utf8');
  console.log(`✅ Written updated public/units/cme_new/data.js (${(fs.statSync(publicDataFile).size / 1024).toFixed(1)} KB)`);
}

// ==============================================================================
// 4. SYNCHRONIZE MASTER RIGHTS DATABASE PATHS (asset_path for all 35 records)
// ==============================================================================

function updateMasterRightsDatabase() {
  console.log('\n🔄 Updating Master Rights Database (asset_path synchronization)...');
  const rightsDb = JSON.parse(fs.readFileSync(rightsDbFile, 'utf8'));

  const cmeUnit = rightsDb.units && rightsDb.units.cme_new;
  if (!cmeUnit || !Array.isArray(cmeUnit.sources)) {
    throw new Error('cme_new unit not found in master_rights_database.json');
  }

  const assetPathMap = {
    // Lesson 0: Master Plate
    'Plate I': '/images/oslo_handshake.jpg',
    
    // Lesson 1
    'cme_sykes_picot_1916': '/images/cme_sykes_picot_1916_map.jpg',
    'cme_balfour_declaration_1917': '/images/cme_balfour_declaration_1917.jpg',

    // Lesson 2
    'cme_king_david_hotel_1946': '/assets/cme_new_king_david_ruins.png',
    'cme_sergeants_affair_1947': '/images/cme_sergeants_affair_1947.jpg',
    'cme_exodus_haifa_1947': '/units/cme_new/assets/cme_exodus.jpeg',
    'cme_bengurion_declaration_1948': '/images/cme_bengurion_declaration_1948.jpg',

    // Lesson 3
    'cme_palestinian_refugees_1948': '/images/cme_palestinian_refugees_1948.jpg',
    'cme_1949_green_line': '/images/cme_1949_green_line_map.jpg',
    'cme_tiran_chokepoint': '/images/cme_straits_tiran_map.jpg',

    // Lesson 4
    'cme_nasser_suez_cartoon_1956': '/images/cme_nasser_suez_cartoon_1956.jpg',
    'cme_alahram_suez_1956': '/images/cme_alahram_suez_1956.jpg',
    'cme_suez_campaign_map_1956': '/images/cme_suez_1956_campaign_map.png',
    'cme_port_said_landing_1956': '/images/cme_port_said_landing_1956.jpg',

    // Lesson 5
    'cme_cairo_summit_1964': '/images/cme_cairo_summit_1964.jpg',
    'cme_golan_heights_relief_map_1967': '/images/cme_golan_heights_relief_map_1967.jpg',
    'cme_air_battle_april_1967': '/images/cme_air_battle_april_1967.jpg',

    // Lesson 6
    'cme_six_day_war_airfield_1967': '/images/cme_six_day_war_airfield_1967.jpg',
    'cme_paratroopers_western_wall_1967': '/images/cme_paratroopers_western_wall_1967.jpg',

    // Lesson 7
    'cme_1967_occupied_territories_cia_map': '/images/cme_1967_occupied_territories_cia_map.png',
    'cme_khartoum_resolution_1967': '/images/cme_khartoum_resolution_1967.jpg',
    'cme_un_res_242_document': '/images/cme_un_res_242_document.jpg',

    // Lesson 8
    'cme_dawsons_field_1970': '/images/cme_dawsons_field_1970.jpg',
    'cme_munich_1972_balcony': '/images/cme_munich_1972_balcony.jpg',

    // Lesson 9
    'cme_egyptians_crossing_suez_1973': '/images/cme_egyptians_crossing_suez_1973.jpg',
    'cme_israeli_crossing_suez_1973': '/images/cme_israeli_crossing_suez_1973.jpg',

    // Lesson 10
    'cme_sadat_knesset_1977': '/units/cme_new/assets/anwar_sadat.jpg',
    'cme_camp_david_1978': '/images/cme_camp_david_1978.jpg',
    'cme_sinai_peninsula_map_1979': '/images/cme_sinai_peninsula_map.jpg',
    'cme_treaty_triple_handshake_1979': '/images/cme_treaty_triple_handshake_1979.jpg',

    // Lesson 11
    'cme_arafat_un_1974': '/images/cme_arafat_un_1974.png',
    'cme_lebanon_1982_campaign_map': '/images/cme_lebanon_1982_campaign_map.png',
    'cme_first_intifada_1987': '/units/cme_new/assets/first_intifada.png',

    // Lesson 12
    'cme_madrid_conference_1991': '/images/cme_madrid_conference_1991.jpg',
    'cme_oslo_handshake_1993': '/images/oslo_handshake.jpg',
    'cme_oslo_areas_map_1995': '/images/cme_oslo_areas_map.png',
    'cme_rabin_assassination_1995': '/units/cme_new/assets/rabinovich_cover.png'
  };

  let updatedCount = 0;
  cmeUnit.sources.forEach((s) => {
    // Match by source_id or lesson/title match
    let matchedPath = null;
    if (assetPathMap[s.source_id]) {
      matchedPath = assetPathMap[s.source_id];
    } else {
      // Find matching key in map by keyword
      const foundKey = Object.keys(assetPathMap).find(k => 
        (s.artifact_title && s.artifact_title.toLowerCase().includes(k.replace('cme_', '').replace(/_/g, ' '))) ||
        (s.source_url && s.source_url.toLowerCase().includes(k.replace('cme_', '')))
      );
      if (foundKey) matchedPath = assetPathMap[foundKey];
    }

    // Fallbacks for specific titles
    if (!matchedPath) {
      if (s.artifact_title && s.artifact_title.includes('Sykes-Picot')) matchedPath = '/images/cme_sykes_picot_1916_map.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Balfour')) matchedPath = '/images/cme_balfour_declaration_1917.jpg';
      else if (s.artifact_title && s.artifact_title.includes('King David Hotel')) matchedPath = '/assets/cme_new_king_david_ruins.png';
      else if (s.artifact_title && s.artifact_title.includes('Sergeants')) matchedPath = '/images/cme_sergeants_affair_1947.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Exodus')) matchedPath = '/units/cme_new/assets/cme_exodus.jpeg';
      else if (s.artifact_title && s.artifact_title.includes('Ben-Gurion')) matchedPath = '/images/cme_bengurion_declaration_1948.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Refugees Leaving Galilee')) matchedPath = '/images/cme_palestinian_refugees_1948.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Man at the Tap')) matchedPath = '/images/cme_nasser_suez_cartoon_1956.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Al-Ahram')) matchedPath = '/images/cme_alahram_suez_1956.jpg';
      else if (s.artifact_title && s.artifact_title.includes('First Arab League Summit')) matchedPath = '/images/cme_cairo_summit_1964.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Golan Heights')) matchedPath = '/images/cme_golan_heights_relief_map_1967.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Airfield in Sinai')) matchedPath = '/images/cme_six_day_war_airfield_1967.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Western Wall')) matchedPath = '/images/cme_paratroopers_western_wall_1967.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Occupied Territories')) matchedPath = '/images/cme_1967_occupied_territories_cia_map.png';
      else if (s.artifact_title && s.artifact_title.includes('Dawson\'s Field')) matchedPath = '/images/cme_dawsons_field_1970.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Munich Olympic')) matchedPath = '/images/cme_munich_1972_balcony.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Crossing the Suez Canal (Operation Badr)')) matchedPath = '/images/cme_egyptians_crossing_suez_1973.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Sharon\'s Armoured')) matchedPath = '/images/cme_israeli_crossing_suez_1973.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Sadat Addressing the Israeli Knesset')) matchedPath = '/units/cme_new/assets/anwar_sadat.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Camp David Retreat')) matchedPath = '/images/cme_camp_david_1978.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Arafat Addressing the United Nations')) matchedPath = '/images/cme_arafat_un_1974.png';
      else if (s.artifact_title && s.artifact_title.includes('1982 Lebanon War')) matchedPath = '/images/cme_lebanon_1982_campaign_map.png';
      else if (s.artifact_title && s.artifact_title.includes('First Intifada')) matchedPath = '/units/cme_new/assets/first_intifada.png';
      else if (s.artifact_title && s.artifact_title.includes('Madrid Peace Conference')) matchedPath = '/images/cme_madrid_conference_1991.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Oslo I Handshake')) matchedPath = '/images/oslo_handshake.jpg';
      else if (s.artifact_title && s.artifact_title.includes('Oslo II Interim Agreement')) matchedPath = '/images/cme_oslo_areas_map.png';
      else if (s.artifact_title && s.artifact_title.includes('Yitzhak Rabin Singing')) matchedPath = '/units/cme_new/assets/rabinovich_cover.png';
    }

    if (matchedPath) {
      s.asset_path = matchedPath;
      updatedCount++;
    }
  });

  fs.writeFileSync(rightsDbFile, JSON.stringify(rightsDb, null, 2), 'utf8');
  console.log(`✅ Synchronized ${updatedCount} / ${cmeUnit.sources.length} records in master_rights_database.json`);
}

async function run() {
  await updateDataFiles();
  updateMasterRightsDatabase();

  console.log('\n🖨️ Recompiling Master Rights Database PDF...');
  try {
    execSync('node scripts/generate_rights_register_pdf.cjs', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
    console.log('✅ Master Rights Register and Unit Bibliography PDFs recompiled successfully!');
  } catch (err) {
    console.error('⚠️ generate_rights_register_pdf failed:', err.message);
  }

  console.log('\n🎉 All pedagogical rebalancing and source synchronization complete!');
}

run().catch(err => {
  console.error('Fatal error during update:', err);
  process.exit(1);
});
