/**
 * timeline_data.js
 * Interactive Living Timeline Data for Conflict in the Middle East, 1945–1995
 * 24 Specification-Aligned Milestones across 4 Key Topic Eras.
 */

export const CME_ERAS = [
  {
    page: 1,
    eraId: 'kt_1',
    themeColor: '#1b365d',
    lightBg: '#eff6ff',
    borderColor: '#93c5fd',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    specFocus:
      'Lessons KT 1.0, KT 1.1 & KT 1.2 • Imperial Borders, UN Partition & The 1948–49 War of Creation',
    badgeText: 'KEY TOPIC 1',
    specPills: [
      'Zionism',
      'Balfour Declaration',
      'British Mandate',
      'Jewish Insurgency',
      'Operation Agatha',
      'King David Hotel',
      'SS Exodus',
      'UN Resolution 181',
      'IDF Founded',
      '1949 Armistice Agreements',
      'Territorial Changes',
      '700,000 Palestinian Refugees',
    ],
    milestones: [
      {
        date: 'May 1916 – Nov 1917',
        title: 'Imperial Contradictions: Sykes-Picot Agreement & The Balfour Declaration',
        specTag: 'Root Causes & Imperial Betrayal',
        image: '/images/cme_balfour_declaration_1917.jpg',
        caption:
          'Original 1917 Balfour Declaration letter promising a "national home for the Jewish people".',
        trigger:
          'Britain sought wartime alliances, promising independence to Arab leaders (McMahon-Hussein) while secretly negotiating partition with France.',
        action:
          'Foreign Secretary Arthur Balfour committed Britain to supporting a "national home for the Jewish people" in Palestine without prejudicing existing civil rights.',
        consequence:
          'Created an irreconcilable imperial conflict between Arab national self-determination and growing Jewish Zionist immigration under the League of Nations Mandate.',
        id: 'cme_ms_1',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_1',
        lessonIndex: 0,
        lessonTitle: 'KT 1.0: Broken Promises & Imperial Borders',
      },
      {
        date: 'July 1946',
        title: 'The Bombing of the King David Hotel, Jerusalem',
        specTag: 'Jewish Insurgency & British Exhaustion',
        image: '/assets/cme_new_king_david_ruins.png',
        caption:
          'The collapsed south-west wing housing British military HQ after the Irgun bomb attack.',
        trigger:
          'British restrictions on post-Holocaust Jewish immigration and the arrest of Zionist leaders (Operation Agatha).',
        action:
          'Militants from the Irgun (led by Menachem Begin) detonated milk churns packed with explosives in the basement, killing 91 British, Arab, and Jewish staff.',
        consequence:
          'Shattered British political will to govern Palestine, leading directly to Foreign Secretary Ernest Bevin handing the Mandate to the United Nations in February 1947.',
        id: 'cme_ms_2',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_2',
        lessonIndex: 1,
        lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
      },
      {
        date: 'July 1947',
        title: 'The SS Exodus & The Sergeants Affair',
        specTag: 'International Pressure & Moral Collapse',
        image: '/images/cme_sergeants_affair_1947.jpg',
        caption:
          'The Sergeants Affair: Bodies of two executed British intelligence NCOs discovered near Netanya.',
        trigger:
          'The British Royal Navy blockaded Palestine, forcing 4,500 Holocaust survivors aboard the SS Exodus back to detention camps in post-war Germany.',
        action:
          'Irgun militants abducted and hanged two British intelligence sergeants (Paice and Martin) in retaliation for British executions of Irgun fighters.',
        consequence:
          'Triggered anti-Jewish riots across British cities and convinced British public opinion that staying in Palestine was morally untenable and too costly.',
        id: 'cme_ms_3',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_2',
        lessonIndex: 1,
        lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
      },
      {
        date: '29 November 1947',
        title: 'UN Resolution 181: The Partition Plan',
        specTag: 'The Diplomatic Catalyst for War',
        image: '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg',
        caption:
          'UN Resolution 181 map allocating 55% of Palestine to the Jewish state and 45% to the Arab state.',
        trigger:
          'UNSCOP investigated Palestine and concluded that joint Jewish-Arab power-sharing within a single state was impossible.',
        action:
          'The UN General Assembly voted to partition Palestine into independent Arab and Jewish states, placing Jerusalem under international UN trusteeship.',
        consequence:
          'Jewish Agency accepted partition; Arab Higher Committee and Arab League rejected it outright, immediately triggering civil war between Jewish and Arab militias.',
        id: 'cme_ms_4',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_2',
        lessonIndex: 1,
        lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
      },
      {
        date: '14–15 May 1948',
        title: 'Declaration of the State of Israel & Outbreak of the First Arab-Israeli War',
        specTag: 'The 1948 War of Survival / Independence',
        image: '/images/cme_bengurion_declaration_1948.jpg',
        caption:
          'David Ben-Gurion declaring Israeli independence in Tel Aviv under Herzl’s portrait.',
        trigger:
          'The final British High Commissioner departed Haifa, terminating the 26-year British Mandate.',
        action:
          'David Ben-Gurion read the Israeli Declaration of Independence; armies from five Arab nations (Egypt, Jordan, Syria, Iraq, Lebanon) invaded the next morning.',
        consequence:
          'Haganah mobilized into the Israel Defense Forces (IDF); superior coordination, Czechoslovak arms, and motivation enabled Israel to survive and seize the initiative.',
        id: 'cme_ms_5',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_2',
        lessonIndex: 1,
        lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
      },
      {
        date: '1948–1949',
        title: 'The Results of the 1948–49 War: Territorial Changes & Refugee Crisis',
        specTag: 'Territorial Changes & The Refugee Problem',
        image: '/images/cme_palestinian_refugees_1948.jpg',
        caption:
          'Palestinian refugees fleeing during the 1948–49 war; over 700,000 were displaced from their homes.',
        trigger:
          'Arab military disunity and the June 1948 UN truce enabled the newly formed IDF to rearm with foreign weapons and launch decisive counter-offensives.',
        action:
          'The 1949 Armistice Agreements redrew borders: Israel expanded to hold 78% of Mandatory Palestine; Jordan annexed the West Bank and Egypt held Gaza.',
        consequence:
          'Over 700,000 Palestinian Arabs became refugees in neighbouring Arab states; Israel refused their return, while Arab states refused permanent integration, creating an enduring crisis.',
        id: 'cme_ms_6',
        eraId: 'kt_1',
        eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
        themeColor: '#1b365d',
        badgeText: 'KEY TOPIC 1',
        lessonId: 'lesson_3',
        lessonIndex: 2,
        lessonTitle: 'KT 1.2: Aftermath of the 1948–49 War & Palestinian Refugees',
      },
    ],
    narrativeChain: [
      {
        title: '1. Imperial Contradiction',
        desc: 'Conflicting British pledges to Arabs & Zionists created irreconcilable national claims.',
      },
      {
        title: '2. Post-WWII Insurgency',
        desc: 'Irgun attacks (King David Hotel, Sergeants Affair) broke British political resolve to rule.',
      },
      {
        title: '3. UN Partition 181',
        desc: 'UN vote to partition sparked immediate civil war between Jewish and Arab militias.',
      },
      {
        title: '4. Statehood & Pan-Arab War',
        desc: 'May 1948 declaration of Israel triggered invasion by 5 Arab armies.',
      },
      {
        title: '5. Results of 1948–49 War',
        desc: '1949 armistice agreements gave Israel 78% of territory, creating 700,000 displaced Palestinian refugees.',
      },
    ],
    glossary: [
      {
        term: 'Zionism',
        def: 'Political movement founded by Theodor Herzl advocating a sovereign Jewish homeland in Palestine.',
      },
      {
        term: 'Mandate',
        def: 'Administrative authority granted by the League of Nations to Britain to govern Palestine (1922–1948).',
      },
      {
        term: 'Armistice Agreements',
        def: 'The 1949 treaties establishing formal ceasefire borders between Israel and Egypt, Jordan, Lebanon, and Syria.',
      },
      {
        term: 'Refugee Problem',
        def: 'The displacement of over 700,000 Palestinian Arabs who fled or were expelled during the 1948–49 war.',
      },
    ],
  },
  {
    page: 2,
    eraId: 'kt_2',
    themeColor: '#991b1b',
    lightBg: '#fef2f2',
    borderColor: '#fca5a5',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    specFocus:
      'Lessons KT 1.3, KT 2.1, KT 2.2 & KT 2.3 • Suez Crisis, Six-Day War, Rise of Palestinian Resistance & Yom Kippur War',
    badgeText: 'KEY TOPIC 2',
    specPills: [
      'Pan-Arabism',
      'Suez Nationalisation',
      'Protocol of Sèvres',
      'UAR (1958)',
      '1964 Cairo Conference',
      'Fatah & PLO',
      'River Jordan Water Dispute',
      'Samu Raid (1966)',
      'Pre-emptive Strike',
      'Operation Focus',
      'Occupied Territories',
      'UN Resolution 242',
      'Khartoum "Three Noes"',
      'PFLP Hijacks',
      'Black September',
      'Munich 1972',
      'Bar Lev Line',
      'OPEC Oil Embargo',
    ],
    milestones: [
      {
        date: 'July – Nov 1956',
        title: 'The Suez Crisis & The Rise of Gamal Abdel Nasser',
        specTag: 'Anti-Colonial Defiance & Pan-Arabism',
        image: '/images/cme_nasser_1956.jpg',
        caption:
          'President Gamal Abdel Nasser, hero of Pan-Arab nationalism across the Middle East.',
        trigger:
          'US and Britain cancelled funding for Egypt’s Aswan High Dam after Nasser bought Soviet Czech weapons.',
        action:
          'Nasser nationalised the Suez Canal; Britain, France, and Israel launched collusive invasion (Protocol of Sèvres); Israel captured Sinai.',
        consequence:
          'US President Eisenhower forced Anglo-French withdrawal via economic sanctions; Nasser became hero of **Pan-Arabism**; UNEF placed in Sinai.',
        id: 'cme_ms_7',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_4',
        lessonIndex: 3,
        lessonTitle: 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis',
      },
      {
        date: '13–17 January 1964',
        title: 'The Cairo Conference & The Creation of the PLO',
        specTag: 'Arab Mobilisation & Guerrilla Warfare',
        image: '/images/cme_cairo_summit_1964.jpg',
        caption:
          'Arab leaders convened in Cairo in 1964 to counter Israeli water diversion and create the PLO.',
        trigger:
          'Disputes erupted over Israeli diversion of River Jordan waters; Arab states met to organize military and diplomatic opposition.',
        action:
          'The Arab League established the **Palestine Liberation Organisation (PLO)**; Yasser Arafat’s **Fatah** movement launched cross-border fedayeen raids backed by Syria.',
        consequence:
          'Escalated border clashes with Israel (e.g. 1966 Samu raid and 7 April 1967 air battle over Golan), accelerating the slide into the 1967 war.',
        id: 'cme_ms_8',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_4',
        lessonIndex: 3,
        lessonTitle: 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis',
      },
      {
        date: '5–10 June 1967',
        title: 'The Six-Day War: Pre-emptive Triumph & Conquered Territories',
        specTag: 'The Decisive Territorial Cataclysm',
        image: '/images/israeli_troops_wall.jpg',
        caption:
          'David Rubinger’s iconic photograph of Israeli paratroopers at the Western Wall, 7 June 1967.',
        trigger:
          'Nasser expelled UNEF peacekeepers, remilitarised Sinai, closed Straits of Tiran, and signed joint defense pact with Jordan.',
        action:
          'Israel launched **Operation Focus** pre-emptive air strikes, destroying Arab air forces in 3 hours, then crushed Egyptian, Jordanian, and Syrian ground armies.',
        consequence:
          'Israel captured the **Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights**, placing 1 million Palestinians under military occupation.',
        id: 'cme_ms_9',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_5',
        lessonIndex: 4,
        lessonTitle: 'KT 2.1: The Six Day War, June 1967',
      },
      {
        date: '22 November 1967',
        title: 'UN Security Council Resolution 242',
        specTag: 'The "Land for Peace" Doctrine',
        image: '/units/cme_new/assets/palestine_1967_six_day_war_map.png',
        caption:
          'Map of the Conquered Territories establishing the geographic framework of UN Res 242.',
        trigger:
          'International community scrambled to establish a durable legal formula to resolve the territorial outcome of the Six-Day War.',
        action:
          'UNSC unanimously passed Resolution 242: called for Israeli withdrawal from occupied territories in exchange for Arab recognition and peace.',
        consequence:
          'Became the permanent diplomatic benchmark (**"Land for Peace"**); Arab League responded with the **"Three Noes"** of Khartoum (no peace, no recognition, no negotiation).',
        id: 'cme_ms_10',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_5',
        lessonIndex: 4,
        lessonTitle: 'KT 2.1: The Six Day War, June 1967',
      },
      {
        date: 'September 1970',
        title: 'Black September & The PFLP Airplane Hijackings',
        specTag: 'Palestinian Militancy & The PFLP',
        image: '/images/cme_munich_1972_balcony.jpg',
        caption: 'A Black September militant on the balcony at the 1972 Munich Olympic Games.',
        trigger:
          'The PLO and PFLP operated as a "state within a state" in Jordan, launching fedayeen raids and hijacking Western airliners to Dawson\'s Field.',
        action:
          'King Hussein ordered the Jordanian Army to crush Palestinian militia strongholds in Amman, killing thousands of fighters and civilians.',
        consequence:
          'The PLO leadership was expelled to Southern Lebanon ("Fatahland"); radical splinter group **Black September** formed, orchestrating the 1972 Munich Olympic massacre.',
        id: 'cme_ms_11',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_6',
        lessonIndex: 5,
        lessonTitle: 'KT 2.2: Aftermath of 1967 War & Rise of Palestinian Resistance',
      },
      {
        date: '6–25 October 1973',
        title: 'The Yom Kippur War: Operation Badr & The OPEC Oil Embargo',
        specTag: 'Shattering Israeli Complacency',
        image: '/units/cme_new/assets/yom_kippur_crossing.png',
        caption:
          'Egyptian infantry using high-pressure water cannons to breach Israel’s Bar Lev Line.',
        trigger:
          'Egypt and Syria sought to break the diplomatic stalemate, erase the humiliation of 1967, and regain the Sinai and Golan Heights.',
        action:
          'Launched surprise coordinated assault on Yom Kippur; Egyptian troops breached the Bar Lev Line under a Soviet SAM anti-aircraft umbrella.',
        consequence:
          'Shattered Israeli myth of invincibility; Arab OPEC ministers launched an **Oil Embargo** quadrupling world oil prices; forced US into emergency shuttle diplomacy.',
        id: 'cme_ms_12',
        eraId: 'kt_2',
        eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
        themeColor: '#991b1b',
        badgeText: 'KEY TOPIC 2',
        lessonId: 'lesson_7',
        lessonIndex: 6,
        lessonTitle: 'KT 2.3: War of Attrition and the Yom Kippur War',
      },
    ],
    narrativeChain: [
      {
        title: '1. Suez & Nasserism',
        desc: 'Suez nationalisation & survival made Nasser the undisputed champion of Pan-Arabism.',
      },
      {
        title: '2. Cairo & PLO Inception',
        desc: 'Creation of PLO (1964) and Syrian-backed Fatah raids triggered border clashes (Samu raid).',
      },
      {
        title: '3. Six-Day War Cataclysm',
        desc: 'Pre-emptive strike (Operation Focus) seized Sinai, Gaza, West Bank, Jerusalem & Golan.',
      },
      {
        title: '4. Res 242 & Militancy',
        desc: 'Khartoum "Three Noes" deadlock drove PFLP airplane hijackings and Jordanian civil war (1970).',
      },
      {
        title: '5. Yom Kippur & Oil Shock',
        desc: 'Egyptian surprise crossing shattered Israeli invincibility and triggered global OPEC oil embargo.',
      },
    ],
    glossary: [
      {
        term: 'Pan-Arabism',
        def: 'Ideology championed by Nasser promoting political, cultural, and military unity among all Arab nations.',
      },
      {
        term: 'Pre-emptive Strike',
        def: 'Military attack launched to forestall or neutralize an enemy’s imminent offensive (e.g. Operation Focus 1967).',
      },
      {
        term: 'Resolution 242',
        def: 'UN resolution establishing "Land for Peace": Israeli withdrawal in return for Arab recognition.',
      },
      {
        term: 'Bar Lev Line',
        def: 'Heavily fortified Israeli sand-rampart defensive chain built along the east bank of the Suez Canal after 1967.',
      },
    ],
  },
  {
    page: 3,
    eraId: 'kt_3a',
    themeColor: '#166534',
    lightBg: '#f0fdf4',
    borderColor: '#86efac',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    specFocus:
      'Lesson KT 3.1 • Yasser Arafat at the UN, Kissinger’s Shuttle Diplomacy & The Egypt-Israel Peace Treaty',
    badgeText: 'KEY TOPIC 3A',
    specPills: [
      'Shuttle Diplomacy',
      'Henry Kissinger',
      'Suez Reopened (1975)',
      'Yasser Arafat at UN',
      '"Olive Branch & Gun"',
      'Anwar Sadat',
      'Knesset Address (1977)',
      'Menachem Begin',
      'Jimmy Carter',
      'Camp David Accords (1978)',
      'Sinai Demilitarisation',
      'Treaty of Washington (1979)',
      'Arab League Boycott',
      'Sadat Assassination (1981)',
      'Peace Treaty Survives',
    ],
    milestones: [
      {
        date: '13 November 1974',
        title: 'Yasser Arafat Addresses the UN General Assembly',
        specTag: 'Diplomatic Legitimacy of the PLO',
        image: '/images/cme_arafat_un_1974.png',
        caption:
          'Yasser Arafat delivering his famous address carrying "an olive branch and a freedom fighter\'s gun".',
        trigger:
          'Arab League summit at Rabat recognized the PLO as the "sole legitimate representative of the Palestinian people".',
        action:
          'Arafat addressed the UN wearing a holster: *"Do not let the olive branch fall from my hand."* The UN granted the PLO observer status.',
        consequence:
          'Elevated the Palestinian national cause from a mere refugee issue into a recognized global political struggle for sovereign statehood.',
        id: 'cme_ms_13',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_6',
        lessonIndex: 5,
        lessonTitle: 'KT 2.2: Aftermath of 1967 War & Rise of Palestinian Resistance',
      },
      {
        date: '1974–1975',
        title: 'Kissinger’s "Shuttle Diplomacy" & Reopening of the Suez Canal',
        specTag: 'Step-by-Step Diplomatic Realism',
        image: '/images/cme_israeli_crossing_suez_1973.jpg',
        caption:
          'Israeli armor returning during the US-negotiated military disengagement agreements.',
        trigger:
          'The superpower nuclear alert during the Yom Kippur War convinced Washington that regional stability was a vital US strategic priority.',
        action:
          'US Secretary of State Henry Kissinger flew between Cairo, Tel Aviv, and Damascus negotiating disengagement pacts; Egypt reopened Suez Canal in June 1975.',
        consequence:
          'Separated Israeli and Egyptian armies along the canal, restored international shipping, and detached Egypt from the Soviet sphere of influence.',
        id: 'cme_ms_14',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_8',
        lessonIndex: 7,
        lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
      },
      {
        date: '19–20 November 1977',
        title: 'President Anwar Sadat’s Historic Journey to Jerusalem',
        specTag: 'The Psychological Breakthrough',
        image: '/units/cme_new/assets/anwar_sadat.jpg',
        caption: 'Anwar Sadat addressing the Israeli Parliament (Knesset) in Jerusalem.',
        trigger:
          'Sadat realized that Egypt’s fragile economy could no longer sustain war, and that only peace could recover the oil-rich Sinai Peninsula.',
        action:
          'Sadat made the electrifying announcement that he was ready to travel to Israel; he addressed the Knesset, recognizing Israel’s existence.',
        consequence:
          'Demolished the 30-year psychological wall of mutual hatred, paving the way for direct bilateral negotiations hosted by US President Jimmy Carter.',
        id: 'cme_ms_15',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_8',
        lessonIndex: 7,
        lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
      },
      {
        date: '5–17 September 1978',
        title: 'The Camp David Accords',
        specTag: 'The Historic Framework for Peace',
        image: '/images/cme_camp_david_1978.jpg',
        caption:
          'Menachem Begin, Jimmy Carter, and Anwar Sadat at the Camp David presidential retreat.',
        trigger:
          'Talks stalled over Israeli withdrawal from Sinai settlements and Palestinian autonomy in the West Bank and Gaza.',
        action:
          'President Carter isolated Begin and Sadat for 13 intense days at Camp David, drafting the **Framework for Peace in the Middle East**.',
        consequence:
          'Agreed on full Israeli withdrawal from Sinai in return for Egyptian diplomatic recognition, but left Palestinian autonomy vague and unfulfilled.',
        id: 'cme_ms_16',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_8',
        lessonIndex: 7,
        lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
      },
      {
        date: '26 March 1979',
        title: 'The Washington Treaty: Egypt-Israel Peace Treaty Signed',
        specTag: 'The First Arab-Israeli Peace Treaty',
        image: '/images/cme_treaty_triple_handshake_1979.jpg',
        caption:
          'The historic three-way handshake between Sadat, Carter, and Begin on the White House Lawn.',
        trigger:
          'Final legal formalization of the Camp David Accords backed by billions of dollars in US economic and military aid to both nations.',
        action:
          'Sadat and Begin signed the formal peace treaty in Washington, establishing full diplomatic relations and normalizing trade.',
        consequence:
          'Israel neutralized its most formidable military opponent; Egypt recovered all Sinai; Arab League expelled Egypt and moved HQ to Tunis.',
        id: 'cme_ms_17',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_8',
        lessonIndex: 7,
        lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
      },
      {
        date: '6 October 1981',
        title: 'The Assassination of Anwar Sadat & The Arab Boycott',
        specTag: 'Consequences of the 1979 Peace Treaty',
        image: '/images/cme_sadat_memorial_1981.jpg',
        caption: 'Site where President Anwar Sadat was assassinated in October 1981.',
        trigger:
          'Arab nations strongly condemned Egypt for signing a separate peace that ignored the Palestinians, expelling Egypt from the Arab League.',
        action:
          'In October 1981, President Anwar Sadat was assassinated by Egyptian soldiers who fiercely opposed the peace treaty with Israel.',
        consequence:
          'Despite Sadat’s assassination and Arab boycotts, the peace treaty held, permanently ending the threat of a major multi-front war for Israel.',
        id: 'cme_ms_18',
        eraId: 'kt_3a',
        eraTitle:
          'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
        themeColor: '#166534',
        badgeText: 'KEY TOPIC 3A',
        lessonId: 'lesson_8',
        lessonIndex: 7,
        lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
      },
    ],
    narrativeChain: [
      {
        title: '1. Nuclear Alert to Shuttle Talks',
        desc: '1973 superpower faceoff forced US mediation, separating armies & reopening Suez (1975).',
      },
      {
        title: '2. Diplomatic Rise of PLO',
        desc: 'Arafat’s UN speech transformed Palestinian issue from refugees into global drive for statehood.',
      },
      {
        title: '3. Sadat Shatters Deadlock',
        desc: 'Historic 1977 Knesset visit convinced Israeli public that direct bilateral peace was achievable.',
      },
      {
        title: '4. Camp David & Washington Treaty',
        desc: 'Carter brokered historic treaty (1979): full Sinai return in exchange for full recognition.',
      },
      {
        title: '5. Arab Boycott & Sadat Assassination',
        desc: 'Egypt was expelled from the Arab League and Sadat was assassinated (1981), but the peace treaty with Israel survived.',
      },
    ],
    glossary: [
      {
        term: 'Shuttle Diplomacy',
        def: 'Intense mediation involving travelling back and forth between rival capitals without direct face-to-face talks.',
      },
      {
        term: 'Knesset',
        def: 'The unicameral national parliament and legislative assembly of the State of Israel in Jerusalem.',
      },
      {
        term: 'Camp David Accords',
        def: '1978 peace agreements brokered by Jimmy Carter leading to the first Arab-Israeli peace treaty.',
      },
      {
        term: 'Cold Peace',
        def: 'State-to-state diplomatic peace without warm cultural, commercial, or public reconciliation.',
      },
    ],
  },
  {
    page: 4,
    eraId: 'kt_3b',
    themeColor: '#b45309',
    lightBg: '#fffbeb',
    borderColor: '#fcd34d',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    specFocus:
      'Lessons KT 3.2 & KT 3.3 • Operation Peace for Galilee, Sabra & Shatila, First Intifada & The Oslo Accords',
    badgeText: 'KEY TOPIC 3B',
    specPills: [
      'Operation Peace for Galilee',
      'Ariel Sharon',
      'Siege of Beirut (1982)',
      'Sabra & Shatila Massacre',
      'Kahan Commission',
      'First Intifada (1987–93)',
      'Jabalya Refugee Camp',
      'UNLU',
      '"Force, Might & Beatings"',
      'Arafat Renounces Terrorism (1988)',
      'Gulf War Coalition (1991)',
      'End of Cold War',
      'Oslo I Accords (1993)',
      'Declaration of Principles',
      'Palestinian Authority (PA)',
      '1994 Israel-Jordan Treaty',
      'Oslo II (Areas A, B, C)',
      'Rabin Assassination (1995)',
    ],
    milestones: [
      {
        date: 'June – Sept 1982',
        title: 'The 1982 Lebanon War (Operation Peace for Galilee)',
        specTag: 'The War of Choice & PLO Expulsion',
        image: '/units/cme_new/assets/ariel_sharon.webp',
        caption:
          'Defence Minister Ariel Sharon directed the massive invasion of Lebanon up to Beirut.',
        trigger:
          'Assassination attempt on Israeli ambassador Shlomo Argov in London by the Abu Nidal faction; ongoing cross-border PLO rocket attacks from southern Lebanon.',
        action:
          'Defence Minister **Ariel Sharon** launched a full-scale invasion, advancing 60 miles north to surround and besiege the PLO leadership in West Beirut.',
        consequence:
          'US-negotiated ceasefire evacuated 14,000 PLO fighters by sea to Tunis; shattered PLO military presence on Israel’s northern border, but entangled IDF in Lebanon.',
        id: 'cme_ms_19',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_9',
        lessonIndex: 8,
        lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
      },
      {
        date: '16–18 September 1982',
        title: 'The Sabra and Shatila Massacre & The Kahan Commission',
        specTag: 'Moral Crisis & Israeli Domestic Turmoil',
        image: '/units/cme_new/assets/ariel_sharon.webp',
        caption:
          'Ariel Sharon was forced to resign following severe censure by Israel’s Kahan Commission.',
        trigger:
          'Assassination of newly elected Lebanese Christian President Bachir Gemayel by Syrian-backed agents.',
        action:
          'IDF permitted Christian Phalangist militia into the Sabra and Shatila refugee camps; Phalangists slaughtered up to 3,500 unarmed Palestinian refugees.',
        consequence:
          'Huge anti-war protests (400,000 in Tel Aviv); Israel’s **Kahan Commission** ruled Sharon bore "personal responsibility" for failing to prevent the slaughter, forcing his resignation.',
        id: 'cme_ms_20',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_9',
        lessonIndex: 8,
        lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
      },
      {
        date: 'December 1987',
        title: 'Outbreak of the First Intifada (The Uprising of the Stones)',
        specTag: 'Grassroots Palestinian Mass Resistance',
        image: '/units/cme_new/assets/first_intifada.png',
        caption:
          'Palestinian youth confronting IDF armor with stones in the Gaza Strip, December 1987.',
        trigger:
          'An Israeli military tank transport crashed into civilian cars at Jabalya Refugee Camp in Gaza, killing four Palestinian workers.',
        action:
          'Spontaneous mass protests, strikes, boycotts, and stone-throwing erupted across Gaza and the West Bank, coordinated by the local **UNLU** (not Tunis PLO).',
        consequence:
          'IDF policy of "force, might, and beatings" drew global media condemnation; convinced Israeli military leaders like Yitzhak Rabin that occupation could not be maintained by force.',
        id: 'cme_ms_21',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_9',
        lessonIndex: 8,
        lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
      },
      {
        date: '1988–1991',
        title: 'Arafat Renounces Terrorism & The Post-Cold War Realignment',
        specTag: 'Diplomatic Pivot & The Madrid Conference',
        image: '/images/cme_madrid_conference_1991.jpg',
        caption:
          'President Bush addressing the joint US-Soviet sponsored Madrid Peace Conference in October 1991.',
        trigger:
          'The Intifada proved the Palestinian cause lived inside the territories; the 1991 Gulf War and Soviet collapse eliminated radical Arab/Soviet financial backing.',
        action:
          'Arafat renounced terrorism at the UN in Geneva (1988); following US coalition victory in Kuwait, the US and USSR co-sponsored the landmark **Madrid Conference (1991)**.',
        consequence:
          'Broke the taboo of face-to-face Arab-Israeli negotiations, creating the direct diplomatic momentum that led to secret Norwegian back-channel talks.',
        id: 'cme_ms_22',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_10',
        lessonIndex: 9,
        lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
      },
      {
        date: '13 September 1993',
        title: 'The Oslo Accords (Declaration of Principles)',
        specTag: 'Historic Mutual Recognition',
        image: '/images/oslo_handshake.jpg',
        caption:
          'Rabin, Clinton, and Arafat on the White House Lawn following the historic Oslo Handshake.',
        trigger:
          'Secret back-channel talks in Oslo, Norway, enabled direct face-to-face bargaining between Israeli diplomats and PLO representatives.',
        action:
          'Signed the **Declaration of Principles**: Israel and PLO officially recognized each other; established the **Palestinian National Authority (PA)** for interim self-rule in Gaza and Jericho.',
        consequence:
          'Historic psychological breakthrough; rejected by extremist factions on both sides (Hamas launched suicide bus bombings; Israeli settlers protested).',
        id: 'cme_ms_23',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_10',
        lessonIndex: 9,
        lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
      },
      {
        date: '1994–1995',
        title: 'The Israel-Jordan Peace Treaty, Oslo II & Assassination of Rabin',
        specTag: 'Partition of the West Bank & The Tragic Climax',
        image: '/images/cme_oslo_areas_map.png',
        caption:
          'Map of West Bank fragmented into Area A (Palestinian control), Area B (joint), and Area C (Israeli control).',
        trigger:
          'King Hussein of Jordan signed 1994 peace treaty; need to expand Palestinian self-rule into major West Bank towns.',
        action:
          'Oslo II partitioned the West Bank into **Areas A, B, and C**. On 4 November 1995, Prime Minister **Yitzhak Rabin** was assassinated by Jewish extremist Yigal Amir.',
        consequence:
          'West Bank remained fragmented under 60% direct Israeli military control (Area C); the peace process lost its principal Israeli architect, plunging the peace movement into crisis.',
        id: 'cme_ms_24',
        eraId: 'kt_3b',
        eraTitle:
          'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
        themeColor: '#b45309',
        badgeText: 'KEY TOPIC 3B',
        lessonId: 'lesson_10',
        lessonIndex: 9,
        lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
      },
    ],
    narrativeChain: [
      {
        title: '1. Lebanon Invasion & Moral Shock',
        desc: 'Sharon expelled PLO to Tunis (1982), but Sabra-Shatila massacre shattered domestic consensus.',
      },
      {
        title: '2. Grassroots Intifada (1987)',
        desc: 'Civilian stone-throwing vs IDF proved to Israeli generals that military occupation was unsustainable.',
      },
      {
        title: '3. Realignment & Madrid (1988–91)',
        desc: 'Arafat renounced terrorism; 1991 Gulf War & Soviet collapse launched historic Madrid talks.',
      },
      {
        title: '4. Oslo Accords & Self-Rule (1993)',
        desc: 'Secret back-channel produced mutual recognition & established Palestinian Authority in Gaza/Jericho.',
      },
      {
        title: '5. Oslo II & Rabin Murder (1995)',
        desc: 'West Bank partitioned into Areas A, B & C; Hamas bombings & Rabin assassination halted momentum.',
      },
    ],
    glossary: [
      {
        term: 'Intifada',
        def: 'Arabic for "shaking off": the mass Palestinian grassroots uprising against Israeli occupation (1987–1993).',
      },
      {
        term: 'UNLU',
        def: 'Unified National Leadership of the Uprising: the clandestine local leadership that coordinated strikes and protests.',
      },
      {
        term: 'Palestinian Authority',
        def: 'Interim administrative governing body established under the 1993 Oslo Accords to govern parts of West Bank and Gaza.',
      },
      {
        term: 'Areas A, B, and C',
        def: 'The 1995 territorial partition of the West Bank into Palestinian civil/security (A), joint control (B), and full Israeli control (C).',
      },
    ],
  },
];

export const CME_TIMELINE_MILESTONES = [
  {
    date: 'May 1916 – Nov 1917',
    title: 'Imperial Contradictions: Sykes-Picot Agreement & The Balfour Declaration',
    specTag: 'Root Causes & Imperial Betrayal',
    image: '/images/cme_balfour_declaration_1917.jpg',
    caption:
      'Original 1917 Balfour Declaration letter promising a "national home for the Jewish people".',
    trigger:
      'Britain sought wartime alliances, promising independence to Arab leaders (McMahon-Hussein) while secretly negotiating partition with France.',
    action:
      'Foreign Secretary Arthur Balfour committed Britain to supporting a "national home for the Jewish people" in Palestine without prejudicing existing civil rights.',
    consequence:
      'Created an irreconcilable imperial conflict between Arab national self-determination and growing Jewish Zionist immigration under the League of Nations Mandate.',
    id: 'cme_ms_1',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_1',
    lessonIndex: 0,
    lessonTitle: 'KT 1.0: Broken Promises & Imperial Borders',
  },
  {
    date: 'July 1946',
    title: 'The Bombing of the King David Hotel, Jerusalem',
    specTag: 'Jewish Insurgency & British Exhaustion',
    image: '/assets/cme_new_king_david_ruins.png',
    caption:
      'The collapsed south-west wing housing British military HQ after the Irgun bomb attack.',
    trigger:
      'British restrictions on post-Holocaust Jewish immigration and the arrest of Zionist leaders (Operation Agatha).',
    action:
      'Militants from the Irgun (led by Menachem Begin) detonated milk churns packed with explosives in the basement, killing 91 British, Arab, and Jewish staff.',
    consequence:
      'Shattered British political will to govern Palestine, leading directly to Foreign Secretary Ernest Bevin handing the Mandate to the United Nations in February 1947.',
    id: 'cme_ms_2',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_2',
    lessonIndex: 1,
    lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
  },
  {
    date: 'July 1947',
    title: 'The SS Exodus & The Sergeants Affair',
    specTag: 'International Pressure & Moral Collapse',
    image: '/images/cme_sergeants_affair_1947.jpg',
    caption:
      'The Sergeants Affair: Bodies of two executed British intelligence NCOs discovered near Netanya.',
    trigger:
      'The British Royal Navy blockaded Palestine, forcing 4,500 Holocaust survivors aboard the SS Exodus back to detention camps in post-war Germany.',
    action:
      'Irgun militants abducted and hanged two British intelligence sergeants (Paice and Martin) in retaliation for British executions of Irgun fighters.',
    consequence:
      'Triggered anti-Jewish riots across British cities and convinced British public opinion that staying in Palestine was morally untenable and too costly.',
    id: 'cme_ms_3',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_2',
    lessonIndex: 1,
    lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
  },
  {
    date: '29 November 1947',
    title: 'UN Resolution 181: The Partition Plan',
    specTag: 'The Diplomatic Catalyst for War',
    image: '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg',
    caption:
      'UN Resolution 181 map allocating 55% of Palestine to the Jewish state and 45% to the Arab state.',
    trigger:
      'UNSCOP investigated Palestine and concluded that joint Jewish-Arab power-sharing within a single state was impossible.',
    action:
      'The UN General Assembly voted to partition Palestine into independent Arab and Jewish states, placing Jerusalem under international UN trusteeship.',
    consequence:
      'Jewish Agency accepted partition; Arab Higher Committee and Arab League rejected it outright, immediately triggering civil war between Jewish and Arab militias.',
    id: 'cme_ms_4',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_2',
    lessonIndex: 1,
    lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
  },
  {
    date: '14–15 May 1948',
    title: 'Declaration of the State of Israel & Outbreak of the First Arab-Israeli War',
    specTag: 'The 1948 War of Survival / Independence',
    image: '/images/cme_bengurion_declaration_1948.jpg',
    caption: 'David Ben-Gurion declaring Israeli independence in Tel Aviv under Herzl’s portrait.',
    trigger:
      'The final British High Commissioner departed Haifa, terminating the 26-year British Mandate.',
    action:
      'David Ben-Gurion read the Israeli Declaration of Independence; armies from five Arab nations (Egypt, Jordan, Syria, Iraq, Lebanon) invaded the next morning.',
    consequence:
      'Haganah mobilized into the Israel Defense Forces (IDF); superior coordination, Czechoslovak arms, and motivation enabled Israel to survive and seize the initiative.',
    id: 'cme_ms_5',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_2',
    lessonIndex: 1,
    lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel',
  },
  {
    date: '1948–1949',
    title: 'The Results of the 1948–49 War: Territorial Changes & Refugee Crisis',
    specTag: 'Territorial Changes & The Refugee Problem',
    image: '/images/cme_palestinian_refugees_1948.jpg',
    caption:
      'Palestinian refugees fleeing during the 1948–49 war; over 700,000 were displaced from their homes.',
    trigger:
      'Arab military disunity and the June 1948 UN truce enabled the newly formed IDF to rearm with foreign weapons and launch decisive counter-offensives.',
    action:
      'The 1949 Armistice Agreements redrew borders: Israel expanded to hold 78% of Mandatory Palestine; Jordan annexed the West Bank and Egypt held Gaza.',
    consequence:
      'Over 700,000 Palestinian Arabs became refugees in neighbouring Arab states; Israel refused their return, while Arab states refused permanent integration, creating an enduring crisis.',
    id: 'cme_ms_6',
    eraId: 'kt_1',
    eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
    themeColor: '#1b365d',
    badgeText: 'KEY TOPIC 1',
    lessonId: 'lesson_3',
    lessonIndex: 2,
    lessonTitle: 'KT 1.2: Aftermath of the 1948–49 War & Palestinian Refugees',
  },
  {
    date: 'July – Nov 1956',
    title: 'The Suez Crisis & The Rise of Gamal Abdel Nasser',
    specTag: 'Anti-Colonial Defiance & Pan-Arabism',
    image: '/images/cme_nasser_1956.jpg',
    caption: 'President Gamal Abdel Nasser, hero of Pan-Arab nationalism across the Middle East.',
    trigger:
      'US and Britain cancelled funding for Egypt’s Aswan High Dam after Nasser bought Soviet Czech weapons.',
    action:
      'Nasser nationalised the Suez Canal; Britain, France, and Israel launched collusive invasion (Protocol of Sèvres); Israel captured Sinai.',
    consequence:
      'US President Eisenhower forced Anglo-French withdrawal via economic sanctions; Nasser became hero of **Pan-Arabism**; UNEF placed in Sinai.',
    id: 'cme_ms_7',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_4',
    lessonIndex: 3,
    lessonTitle: 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis',
  },
  {
    date: '13–17 January 1964',
    title: 'The Cairo Conference & The Creation of the PLO',
    specTag: 'Arab Mobilisation & Guerrilla Warfare',
    image: '/images/cme_cairo_summit_1964.jpg',
    caption:
      'Arab leaders convened in Cairo in 1964 to counter Israeli water diversion and create the PLO.',
    trigger:
      'Disputes erupted over Israeli diversion of River Jordan waters; Arab states met to organize military and diplomatic opposition.',
    action:
      'The Arab League established the **Palestine Liberation Organisation (PLO)**; Yasser Arafat’s **Fatah** movement launched cross-border fedayeen raids backed by Syria.',
    consequence:
      'Escalated border clashes with Israel (e.g. 1966 Samu raid and 7 April 1967 air battle over Golan), accelerating the slide into the 1967 war.',
    id: 'cme_ms_8',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_4',
    lessonIndex: 3,
    lessonTitle: 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis',
  },
  {
    date: '5–10 June 1967',
    title: 'The Six-Day War: Pre-emptive Triumph & Conquered Territories',
    specTag: 'The Decisive Territorial Cataclysm',
    image: '/images/israeli_troops_wall.jpg',
    caption:
      'David Rubinger’s iconic photograph of Israeli paratroopers at the Western Wall, 7 June 1967.',
    trigger:
      'Nasser expelled UNEF peacekeepers, remilitarised Sinai, closed Straits of Tiran, and signed joint defense pact with Jordan.',
    action:
      'Israel launched **Operation Focus** pre-emptive air strikes, destroying Arab air forces in 3 hours, then crushed Egyptian, Jordanian, and Syrian ground armies.',
    consequence:
      'Israel captured the **Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights**, placing 1 million Palestinians under military occupation.',
    id: 'cme_ms_9',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_5',
    lessonIndex: 4,
    lessonTitle: 'KT 2.1: The Six Day War, June 1967',
  },
  {
    date: '22 November 1967',
    title: 'UN Security Council Resolution 242',
    specTag: 'The "Land for Peace" Doctrine',
    image: '/units/cme_new/assets/palestine_1967_six_day_war_map.png',
    caption:
      'Map of the Conquered Territories establishing the geographic framework of UN Res 242.',
    trigger:
      'International community scrambled to establish a durable legal formula to resolve the territorial outcome of the Six-Day War.',
    action:
      'UNSC unanimously passed Resolution 242: called for Israeli withdrawal from occupied territories in exchange for Arab recognition and peace.',
    consequence:
      'Became the permanent diplomatic benchmark (**"Land for Peace"**); Arab League responded with the **"Three Noes"** of Khartoum (no peace, no recognition, no negotiation).',
    id: 'cme_ms_10',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_5',
    lessonIndex: 4,
    lessonTitle: 'KT 2.1: The Six Day War, June 1967',
  },
  {
    date: 'September 1970',
    title: 'Black September & The PFLP Airplane Hijackings',
    specTag: 'Palestinian Militancy & The PFLP',
    image: '/images/cme_munich_1972_balcony.jpg',
    caption: 'A Black September militant on the balcony at the 1972 Munich Olympic Games.',
    trigger:
      'The PLO and PFLP operated as a "state within a state" in Jordan, launching fedayeen raids and hijacking Western airliners to Dawson\'s Field.',
    action:
      'King Hussein ordered the Jordanian Army to crush Palestinian militia strongholds in Amman, killing thousands of fighters and civilians.',
    consequence:
      'The PLO leadership was expelled to Southern Lebanon ("Fatahland"); radical splinter group **Black September** formed, orchestrating the 1972 Munich Olympic massacre.',
    id: 'cme_ms_11',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_6',
    lessonIndex: 5,
    lessonTitle: 'KT 2.2: Aftermath of 1967 War & Rise of Palestinian Resistance',
  },
  {
    date: '6–25 October 1973',
    title: 'The Yom Kippur War: Operation Badr & The OPEC Oil Embargo',
    specTag: 'Shattering Israeli Complacency',
    image: '/units/cme_new/assets/yom_kippur_crossing.png',
    caption: 'Egyptian infantry using high-pressure water cannons to breach Israel’s Bar Lev Line.',
    trigger:
      'Egypt and Syria sought to break the diplomatic stalemate, erase the humiliation of 1967, and regain the Sinai and Golan Heights.',
    action:
      'Launched surprise coordinated assault on Yom Kippur; Egyptian troops breached the Bar Lev Line under a Soviet SAM anti-aircraft umbrella.',
    consequence:
      'Shattered Israeli myth of invincibility; Arab OPEC ministers launched an **Oil Embargo** quadrupling world oil prices; forced US into emergency shuttle diplomacy.',
    id: 'cme_ms_12',
    eraId: 'kt_2',
    eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
    themeColor: '#991b1b',
    badgeText: 'KEY TOPIC 2',
    lessonId: 'lesson_7',
    lessonIndex: 6,
    lessonTitle: 'KT 2.3: War of Attrition and the Yom Kippur War',
  },
  {
    date: '13 November 1974',
    title: 'Yasser Arafat Addresses the UN General Assembly',
    specTag: 'Diplomatic Legitimacy of the PLO',
    image: '/images/cme_arafat_un_1974.png',
    caption:
      'Yasser Arafat delivering his famous address carrying "an olive branch and a freedom fighter\'s gun".',
    trigger:
      'Arab League summit at Rabat recognized the PLO as the "sole legitimate representative of the Palestinian people".',
    action:
      'Arafat addressed the UN wearing a holster: *"Do not let the olive branch fall from my hand."* The UN granted the PLO observer status.',
    consequence:
      'Elevated the Palestinian national cause from a mere refugee issue into a recognized global political struggle for sovereign statehood.',
    id: 'cme_ms_13',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_6',
    lessonIndex: 5,
    lessonTitle: 'KT 2.2: Aftermath of 1967 War & Rise of Palestinian Resistance',
  },
  {
    date: '1974–1975',
    title: 'Kissinger’s "Shuttle Diplomacy" & Reopening of the Suez Canal',
    specTag: 'Step-by-Step Diplomatic Realism',
    image: '/images/cme_israeli_crossing_suez_1973.jpg',
    caption: 'Israeli armor returning during the US-negotiated military disengagement agreements.',
    trigger:
      'The superpower nuclear alert during the Yom Kippur War convinced Washington that regional stability was a vital US strategic priority.',
    action:
      'US Secretary of State Henry Kissinger flew between Cairo, Tel Aviv, and Damascus negotiating disengagement pacts; Egypt reopened Suez Canal in June 1975.',
    consequence:
      'Separated Israeli and Egyptian armies along the canal, restored international shipping, and detached Egypt from the Soviet sphere of influence.',
    id: 'cme_ms_14',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_8',
    lessonIndex: 7,
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
  },
  {
    date: '19–20 November 1977',
    title: 'President Anwar Sadat’s Historic Journey to Jerusalem',
    specTag: 'The Psychological Breakthrough',
    image: '/units/cme_new/assets/anwar_sadat.jpg',
    caption: 'Anwar Sadat addressing the Israeli Parliament (Knesset) in Jerusalem.',
    trigger:
      'Sadat realized that Egypt’s fragile economy could no longer sustain war, and that only peace could recover the oil-rich Sinai Peninsula.',
    action:
      'Sadat made the electrifying announcement that he was ready to travel to Israel; he addressed the Knesset, recognizing Israel’s existence.',
    consequence:
      'Demolished the 30-year psychological wall of mutual hatred, paving the way for direct bilateral negotiations hosted by US President Jimmy Carter.',
    id: 'cme_ms_15',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_8',
    lessonIndex: 7,
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
  },
  {
    date: '5–17 September 1978',
    title: 'The Camp David Accords',
    specTag: 'The Historic Framework for Peace',
    image: '/images/cme_camp_david_1978.jpg',
    caption:
      'Menachem Begin, Jimmy Carter, and Anwar Sadat at the Camp David presidential retreat.',
    trigger:
      'Talks stalled over Israeli withdrawal from Sinai settlements and Palestinian autonomy in the West Bank and Gaza.',
    action:
      'President Carter isolated Begin and Sadat for 13 intense days at Camp David, drafting the **Framework for Peace in the Middle East**.',
    consequence:
      'Agreed on full Israeli withdrawal from Sinai in return for Egyptian diplomatic recognition, but left Palestinian autonomy vague and unfulfilled.',
    id: 'cme_ms_16',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_8',
    lessonIndex: 7,
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
  },
  {
    date: '26 March 1979',
    title: 'The Washington Treaty: Egypt-Israel Peace Treaty Signed',
    specTag: 'The First Arab-Israeli Peace Treaty',
    image: '/images/cme_treaty_triple_handshake_1979.jpg',
    caption:
      'The historic three-way handshake between Sadat, Carter, and Begin on the White House Lawn.',
    trigger:
      'Final legal formalization of the Camp David Accords backed by billions of dollars in US economic and military aid to both nations.',
    action:
      'Sadat and Begin signed the formal peace treaty in Washington, establishing full diplomatic relations and normalizing trade.',
    consequence:
      'Israel neutralized its most formidable military opponent; Egypt recovered all Sinai; Arab League expelled Egypt and moved HQ to Tunis.',
    id: 'cme_ms_17',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_8',
    lessonIndex: 7,
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
  },
  {
    date: '6 October 1981',
    title: 'The Assassination of Anwar Sadat & The Arab Boycott',
    specTag: 'Consequences of the 1979 Peace Treaty',
    image: '/images/cme_sadat_memorial_1981.jpg',
    caption: 'Site where President Anwar Sadat was assassinated in October 1981.',
    trigger:
      'Arab nations strongly condemned Egypt for signing a separate peace that ignored the Palestinians, expelling Egypt from the Arab League.',
    action:
      'In October 1981, President Anwar Sadat was assassinated by Egyptian soldiers who fiercely opposed the peace treaty with Israel.',
    consequence:
      'Despite Sadat’s assassination and Arab boycotts, the peace treaty held, permanently ending the threat of a major multi-front war for Israel.',
    id: 'cme_ms_18',
    eraId: 'kt_3a',
    eraTitle:
      'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    themeColor: '#166534',
    badgeText: 'KEY TOPIC 3A',
    lessonId: 'lesson_8',
    lessonIndex: 7,
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy to Camp David',
  },
  {
    date: 'June – Sept 1982',
    title: 'The 1982 Lebanon War (Operation Peace for Galilee)',
    specTag: 'The War of Choice & PLO Expulsion',
    image: '/units/cme_new/assets/ariel_sharon.webp',
    caption: 'Defence Minister Ariel Sharon directed the massive invasion of Lebanon up to Beirut.',
    trigger:
      'Assassination attempt on Israeli ambassador Shlomo Argov in London by the Abu Nidal faction; ongoing cross-border PLO rocket attacks from southern Lebanon.',
    action:
      'Defence Minister **Ariel Sharon** launched a full-scale invasion, advancing 60 miles north to surround and besiege the PLO leadership in West Beirut.',
    consequence:
      'US-negotiated ceasefire evacuated 14,000 PLO fighters by sea to Tunis; shattered PLO military presence on Israel’s northern border, but entangled IDF in Lebanon.',
    id: 'cme_ms_19',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_9',
    lessonIndex: 8,
    lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
  },
  {
    date: '16–18 September 1982',
    title: 'The Sabra and Shatila Massacre & The Kahan Commission',
    specTag: 'Moral Crisis & Israeli Domestic Turmoil',
    image: '/units/cme_new/assets/ariel_sharon.webp',
    caption:
      'Ariel Sharon was forced to resign following severe censure by Israel’s Kahan Commission.',
    trigger:
      'Assassination of newly elected Lebanese Christian President Bachir Gemayel by Syrian-backed agents.',
    action:
      'IDF permitted Christian Phalangist militia into the Sabra and Shatila refugee camps; Phalangists slaughtered up to 3,500 unarmed Palestinian refugees.',
    consequence:
      'Huge anti-war protests (400,000 in Tel Aviv); Israel’s **Kahan Commission** ruled Sharon bore "personal responsibility" for failing to prevent the slaughter, forcing his resignation.',
    id: 'cme_ms_20',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_9',
    lessonIndex: 8,
    lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
  },
  {
    date: 'December 1987',
    title: 'Outbreak of the First Intifada (The Uprising of the Stones)',
    specTag: 'Grassroots Palestinian Mass Resistance',
    image: '/units/cme_new/assets/first_intifada.png',
    caption:
      'Palestinian youth confronting IDF armor with stones in the Gaza Strip, December 1987.',
    trigger:
      'An Israeli military tank transport crashed into civilian cars at Jabalya Refugee Camp in Gaza, killing four Palestinian workers.',
    action:
      'Spontaneous mass protests, strikes, boycotts, and stone-throwing erupted across Gaza and the West Bank, coordinated by the local **UNLU** (not Tunis PLO).',
    consequence:
      'IDF policy of "force, might, and beatings" drew global media condemnation; convinced Israeli military leaders like Yitzhak Rabin that occupation could not be maintained by force.',
    id: 'cme_ms_21',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_9',
    lessonIndex: 8,
    lessonTitle: 'KT 3.2: The Palestinian Issue: Lebanon & First Intifada',
  },
  {
    date: '1988–1991',
    title: 'Arafat Renounces Terrorism & The Post-Cold War Realignment',
    specTag: 'Diplomatic Pivot & The Madrid Conference',
    image: '/images/cme_madrid_conference_1991.jpg',
    caption:
      'President Bush addressing the joint US-Soviet sponsored Madrid Peace Conference in October 1991.',
    trigger:
      'The Intifada proved the Palestinian cause lived inside the territories; the 1991 Gulf War and Soviet collapse eliminated radical Arab/Soviet financial backing.',
    action:
      'Arafat renounced terrorism at the UN in Geneva (1988); following US coalition victory in Kuwait, the US and USSR co-sponsored the landmark **Madrid Conference (1991)**.',
    consequence:
      'Broke the taboo of face-to-face Arab-Israeli negotiations, creating the direct diplomatic momentum that led to secret Norwegian back-channel talks.',
    id: 'cme_ms_22',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_10',
    lessonIndex: 9,
    lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
  },
  {
    date: '13 September 1993',
    title: 'The Oslo Accords (Declaration of Principles)',
    specTag: 'Historic Mutual Recognition',
    image: '/images/oslo_handshake.jpg',
    caption:
      'Rabin, Clinton, and Arafat on the White House Lawn following the historic Oslo Handshake.',
    trigger:
      'Secret back-channel talks in Oslo, Norway, enabled direct face-to-face bargaining between Israeli diplomats and PLO representatives.',
    action:
      'Signed the **Declaration of Principles**: Israel and PLO officially recognized each other; established the **Palestinian National Authority (PA)** for interim self-rule in Gaza and Jericho.',
    consequence:
      'Historic psychological breakthrough; rejected by extremist factions on both sides (Hamas launched suicide bus bombings; Israeli settlers protested).',
    id: 'cme_ms_23',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_10',
    lessonIndex: 9,
    lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
  },
  {
    date: '1994–1995',
    title: 'The Israel-Jordan Peace Treaty, Oslo II & Assassination of Rabin',
    specTag: 'Partition of the West Bank & The Tragic Climax',
    image: '/images/cme_oslo_areas_map.png',
    caption:
      'Map of West Bank fragmented into Area A (Palestinian control), Area B (joint), and Area C (Israeli control).',
    trigger:
      'King Hussein of Jordan signed 1994 peace treaty; need to expand Palestinian self-rule into major West Bank towns.',
    action:
      'Oslo II partitioned the West Bank into **Areas A, B, and C**. On 4 November 1995, Prime Minister **Yitzhak Rabin** was assassinated by Jewish extremist Yigal Amir.',
    consequence:
      'West Bank remained fragmented under 60% direct Israeli military control (Area C); the peace process lost its principal Israeli architect, plunging the peace movement into crisis.',
    id: 'cme_ms_24',
    eraId: 'kt_3b',
    eraTitle:
      'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
    themeColor: '#b45309',
    badgeText: 'KEY TOPIC 3B',
    lessonId: 'lesson_10',
    lessonIndex: 9,
    lessonTitle: 'KT 3.3: Attempts at a Solution: From Oslo to Oslo II',
  },
];

export default { eras: CME_ERAS, milestones: CME_TIMELINE_MILESTONES };
