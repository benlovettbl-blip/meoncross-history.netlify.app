/**
 * scripts/cme_unified_textbook_data.cjs
 *
 * CANONICAL 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK DATA
 * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE History)
 */

const COVER_CONFIG = {
  unitId: 'cme_unified',
  title: 'CONFLICT IN THE MIDDLE EAST',
  dateRange: '1945 – 1995',
  subtitle: 'Zionism, Arab Nationalism & The Struggle for the Holy Land',
  coverImage: '/images/cme_cover.jpg',
  coverImageCaption:
    'The Camp David Accords Signing • White House Lawn, Washington D.C. (September 1978)',
  overviewHeading: 'HISTORICAL OVERVIEW • 1945–1995',
  overviewParas: [
    "At the crossroads of Europe, Asia, and Africa, the end of the Second World War ignited one of modern history's most intractable conflicts. In May 1948, as the British lowered the Union Jack in Mandatory Palestine, David Ben-Gurion proclaimed the birth of the State of Israel. Within hours, five Arab armies invaded, launching a cycle of warfare that would redefine regional borders, displace hundreds of thousands of Palestinian refugees, and draw the United States and Soviet Union into dangerous Cold War confrontations.",
    'Across five tumultuous decades, this anthology chronicles the clash between Israeli survival and Palestinian national self-determination: from the dramatic blitzkrieg of the 1967 Six-Day War and the near-fatal shock of the 1973 Yom Kippur War, to the rise of the PLO, the trauma of the 1982 Lebanon invasion, the stones of the First Intifada, and the historic yet fragile handshake on the White House lawn between Yitzhak Rabin and Yasser Arafat.',
  ],
  coreConcepts: [
    'National Self-Determination',
    'Territorial Partition & Armistice',
    'Strategic Maritime Chokepoints',
    'Asymmetric Resistance & Intifada',
    'Land for Peace & Diplomatic Normalisation',
  ],
};

const MILESTONE_SPINE = [
  {
    date: 'Nov 1917',
    title: 'The Balfour Declaration & Contradictory British Pledges',
    desc: 'Foreign Secretary Balfour pledges British support for a Jewish national home, contradicting promises to Arab leaders and entrenching communal conflict.',
    ref: '1.2',
  },
  {
    date: 'July 1946',
    title: 'The Bombing of the King David Hotel & Mandate Collapse',
    desc: 'Zionist paramilitary group Irgun detonates 350kg of explosives at British military headquarters, forcing war-weary Britain to hand Palestine to the UN.',
    ref: '2.2',
  },
  {
    date: 'Nov 1947',
    title: 'UN Resolution 181: The Palestine Partition Plan',
    desc: 'The UN votes to partition Palestine into separate Arab and Jewish states with an international Jerusalem; Arab rejection sparks immediate civil war.',
    ref: '2.3',
  },
  {
    date: 'May 1948',
    title: 'Declaration of the State of Israel & The 1948–49 War',
    desc: 'Ben-Gurion proclaims Israeli statehood; five Arab armies invade. Israel wins military victory, expands borders, and 700,000 Palestinians become refugees.',
    ref: '2.4',
  },
  {
    date: 'July 1950',
    title: 'The Law of Return, IDF Creation & US Aid to Israel',
    desc: 'Knesset grants worldwide Jewish immigration right; population doubles within four years as transit camps house arrivals funded by US economic aid.',
    ref: '3.3',
  },
  {
    date: 'Oct 1956',
    title: 'The Suez Crisis, Sinai Invasion & UNEF Deployment',
    desc: 'Nasser nationalises the Suez Canal; Britain, France, and Israel secretly collude to invade Egypt. US financial pressure forces British withdrawal.',
    ref: '4.3',
  },
  {
    date: 'Jan 1964',
    title: 'The Cairo Conference, PLO & Water Diversion Disputes',
    desc: 'Arab summit establishes the PLO to represent Palestinians and attempts Jordan River diversion; Israel executes military strikes on diversion sites.',
    ref: '5.1',
  },
  {
    date: 'June 1967',
    title: 'The Six-Day War & Preemptive Air Strike (Operation Focus)',
    desc: 'Israel destroys 300+ Egyptian aircraft on the tarmac in 3 hours, conquering the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.',
    ref: '6.2',
  },
  {
    date: 'Nov 1967',
    title: 'UN Resolution 242 & The "Land for Peace" Principle',
    desc: 'The UN Security Council calls for Israeli withdrawal in exchange for recognised, secure borders, establishing the benchmark for all future diplomacy.',
    ref: '7.3',
  },
  {
    date: 'Sept 1970–72',
    title: 'Black September in Jordan & Munich Olympics Hostage Crisis',
    desc: 'Jordanian army expels the PLO to Lebanon; Black September terrorists murder 11 Israeli Olympic athletes and coaches in Munich.',
    ref: '8.3',
  },
  {
    date: 'Oct 1973',
    title: 'The Yom Kippur War & The Arab OPEC Oil Embargo',
    desc: 'Surprise Egyptian and Syrian assault breaches the Bar-Lev Line on Judaism’s holiest day; Arab oil embargo triggers global stagflation and forces US diplomacy.',
    ref: '9.2',
  },
  {
    date: 'Sept 1978–79',
    title: 'The Camp David Accords & 1979 Peace Treaty',
    desc: 'President Carter brokers peace between Egyptian President Sadat and Israeli PM Begin; Israel returns Sinai to Egypt in exchange for formal recognition.',
    ref: '10.3',
  },
  {
    date: 'June 1982',
    title: 'Operation Peace for Galilee & The Sabra and Shatila Massacre',
    desc: "Sharon orders full-scale invasion of Lebanon to crush the PLO; ends in Phalangist camp massacre, international outrage, and Sharon's resignation.",
    ref: '11.2',
  },
  {
    date: 'Dec 1987–88',
    title: "The First Intifada & Arafat's Renunciation of Terrorism",
    desc: 'Grassroots uprising of stone-throwing youth in Gaza and West Bank; Arafat declares Palestinian statehood and renounces terrorism at the UN in Geneva.',
    ref: '11.4',
  },
  {
    date: '1989–1995',
    title: 'End of Cold War, Gulf War, Madrid & The Oslo Accords',
    desc: "Soviet collapse & 1991 Gulf War compel Madrid; Rabin and Arafat sign Oslo Accords, followed by Jordan Peace Treaty and Rabin's assassination.",
    ref: '12.1',
  },
];

const THEATER_MAP_CONFIG = {
  mapRegionalImage: '/images/middle_east_map_cia_reference.jpg',
  mapIsraelImage: '/images/cme_1967_occupied_territories_cia_map.png',
  captionRegional:
    'Regional Pan-Arab Arena • The Levant, Persian Gulf oil corridors & Red Sea maritime routes.',
  captionIsrael:
    'The Conquered Territories • 1949 Green Line, West Bank, Gaza Strip, Golan Heights & Sinai frontier.',
  flashpoints: [
    {
      badge: 'FLASHPOINT 01',
      title: 'The Golan Heights & Syrian Escarpment',
      text: 'Rising 1,000 metres above the Sea of Galilee, the Golan Syrian military artillery vantage point routinely shelled Israeli agricultural kibbutzim below. Syrian engineering attempts to divert the Jordan River headwaters (Banias) triggered pre-war dogfights. In June 1967, Israeli forces scaled the fortified escarpment, seizing the plateau to eliminate artillery threats and establish early-warning listening posts overlooking Damascus.',
    },
    {
      badge: 'FLASHPOINT 02',
      title: 'The Straits of Tiran & Sharm el-Sheikh',
      text: "The narrow maritime bottleneck at the mouth of the Gulf of Aqaba controlled maritime access to Israel's southern port of Eilat—vital for oil shipments from Iran. In October 1956 and May 1967, Egyptian President Nasser blockaded the straits from gun batteries at Sharm el-Sheikh. Israel declared the maritime blockade an unambiguous act of war (casus belli), launching immediate preemptive military campaigns in response.",
    },
    {
      badge: 'FLASHPOINT 03',
      title: 'The West Bank & Mountain Aquifers',
      text: "Mandatory Palestine's central mountain spine dominates Israel's narrow coastal plain, which narrows to a mere 14 kilometres between Tel Aviv and the Green Line. Conquered in 1967 from Jordan, the West Bank provided critical military strategic depth. Crucially, the western and northeastern mountain aquifers supplied over 25% of Israel's freshwater, making territorial control an existential economic and strategic imperative.",
    },
    {
      badge: 'FLASHPOINT 04',
      title: 'The Suez Canal & Sinai Desert Buffer',
      text: "The 150-kilometre-wide arid Sinai desert formed a vital strategic buffer zone between Egypt and the Israeli heartland. Following the 1967 conquest, Israel constructed the fortified Bar-Lev Line along the canal bank. The canal's closure from 1967 to 1975 disrupted global oil trade, while the 1979 Egyptian-Israeli peace treaty demilitarised the Sinai under international observation, exchanging strategic depth for diplomatic peace.",
    },
  ],
  specBlueprint: [
    {
      topicNum: 'KEY TOPIC 1',
      dateRange: '1945–1963',
      title: 'The Birth of the State of Israel',
      color: '#1e3a8a',
      badgeBg: '#1e3a8a',
      borderTop: '#2563eb',
      units: [
        {
          code: 'KT 1.1',
          title: 'British Withdrawal & Creation of Israel',
          desc: 'Conflicting Jewish-Arab demands; Irgun bombing of King David Hotel (1946); UN Res 181 Partition Plan; 1948–49 War and military victory.',
        },
        {
          code: 'KT 1.2',
          title: 'Aftermath of the 1948–49 War',
          desc: 'Territorial changes & 1949 Green Line; 700,000 Palestinian refugees (Al-Nakba) & UNRWA; Law of Return (1950); creation of IDF; US economic and military aid; relations with Egypt.',
        },
        {
          code: 'KT 1.3',
          title: 'Increased Tension, 1955–63',
          desc: 'Nasser & Pan-Arab leadership; Czech Arms Deal; Israeli attack on Gaza (1955) & Sinai (1956); Suez Crisis, Sèvres collusion & UNEF; formation of United Arab Republic (1958).',
        },
      ],
      territorialSummary:
        '1947 Partition Borders, 1949 Armistice Green Line, Divided Jerusalem, Gaza (Egypt) & West Bank (Jordan).',
    },
    {
      topicNum: 'KEY TOPIC 2',
      dateRange: '1964–1973',
      title: 'The Escalating Conflict',
      color: '#7f1d1d',
      badgeBg: '#7f1d1d',
      borderTop: '#dc2626',
      units: [
        {
          code: 'KT 2.1',
          title: 'The Six-Day War (1967)',
          desc: '1964 Cairo Conference & PLO; River Jordan water disputes; Samu raid (1966) & 7 April 1967 dogfight; superpower roles; Operation Focus preemptive air strike.',
        },
        {
          code: 'KT 2.2',
          title: 'Aftermath of the 1967 War',
          desc: 'UN Resolution 242 ("Land for Peace"); Suez dispute; Conquered Territories (Golan, Gaza, West Bank, Sinai, East Jerusalem); PFLP 1970 hijacks; Black September; Munich 1972.',
        },
        {
          code: 'KT 2.3',
          title: 'Israel and Egypt (1967–73)',
          desc: 'Egyptian relations with superpowers & Arab states; Israeli consolidation & Bar-Lev Line; Yom Kippur War (1973) surprise assault; OPEC oil embargo & superpower nuclear alert.',
        },
      ],
      territorialSummary:
        'The Conquered Territories (Sinai, Gaza, West Bank, Golan Heights, East Jerusalem) & the Bar-Lev Line along the Suez Canal.',
    },
    {
      topicNum: 'KEY TOPIC 3',
      dateRange: '1974–1995',
      title: 'Attempts at a Solution',
      color: '#064e3b',
      badgeBg: '#064e3b',
      borderTop: '#059669',
      units: [
        {
          code: 'KT 3.1',
          title: 'Diplomatic Negotiations',
          desc: 'OPEC oil shock; Kissinger shuttle diplomacy & Suez reopening (1975); Sadat in Jerusalem (1977); Begin in Egypt (1977); Camp David Accords (1978); 1979 Treaty of Washington.',
        },
        {
          code: 'KT 3.2',
          title: 'The Palestinian Issue',
          desc: 'Arafat UN speech (1974); PLO in Lebanon; 1982 invasion (Operation Peace for Galilee, Beirut siege, Sabra-Shatila); First Intifada (1987–93); rise of Hamas.',
        },
        {
          code: 'KT 3.3',
          title: 'Attempts at Peace (1988–95)',
          desc: 'Arafat 1988 Geneva speech & renunciation of terrorism; End of Cold War & 1991 Gulf War; Madrid (1991); Oslo Accords (1993); Palestinian National Authority; Jordan Treaty (1994); Oslo II & Rabin assassination (1995).',
        },
      ],
      territorialSummary:
        'Sinai Demilitarisation & Handover, Gaza-Jericho First, and Oslo II Partition (Areas A, B, and C).',
    },
  ],
};

const ENQUIRIES = [
  {
    num: 1,
    title: 'Broken Promises & Imperial Borders: Why Was Conflict Inevitable?',
    versoSubtitle: 'Part I: Ottoman Collapse, Sykes-Picot & The Balfour Declaration',
    rectoSubtitle: 'Part II: The Interwar Mandate & The 1939 White Paper',
    rectoAnchor:
      'Zionist settlement and the 1936 Great Arab Revolt forced Britain into irreconcilable diplomatic reversals on the eve of the Second World War.',
    enquiry:
      'Why did British imperial diplomacy and contradictory wartime promises make conflict in Palestine unavoidable?',
    block1: {
      ref: '1.1',
      date: '1914–1916',
      title: 'The Dismemberment of the Ottoman Empire & Sykes-Picot',
      paras: [
        "For over four centuries leading up to the First World War, the lands of the Middle East were ruled as provinces of the Turkish Ottoman Empire. When the Ottomans entered the war on the side of Imperial Germany in October 1914, British and French imperial planners moved swiftly to orchestrate the partition of the Sultan's empire. In May 1916, British diplomat Sir Mark Sykes and French diplomat François Georges-Picot concluded the secret Sykes-Picot Agreement. Using rulers across desert maps, they divided the Levant into imperial spheres of influence: France claimed direct control over Syria and Lebanon, while Britain secured Mesopotamia (Iraq) and Transjordan to safeguard maritime routes to India and vital oil supplies in the Persian Gulf.",
        'Following the Allied military conquest of Jerusalem by General Edmund Allenby in December 1917, the newly formed League of Nations formalised this partition through the Mandate System. Under Article 22 of the League Covenant, Britain was granted temporary administrative control over Mandatory Palestine. However, these arbitrary imperial boundaries ignored historic tribal, ethnic, and religious realities, creating an artificial political arena in which competing national movements would collide.',
      ],
    },
    block2: {
      ref: '1.2',
      date: '1915–1917',
      title: 'Contradictory Pledges: McMahon-Hussein vs The Balfour Declaration',
      paras: [
        "To secure military alliances during the desperate fighting of the First World War, the British government issued contradictory, irreconcilable promises to Arab nationalists and Zionist leaders. Between July 1915 and March 1916, British High Commissioner Sir Henry McMahon conducted a secret correspondence with Sharif Hussein of Mecca, the guardian of Islam's holy sites. McMahon promised that if the Arabs launched a military revolt against the Ottoman Turks, Great Britain would recognise an independent Arab kingdom spanning the Arabian peninsula and the Fertile Crescent. Arab leaders understood this guarantee to include Palestine as an integral part of their future sovereign homeland.",
        'Simultaneously, British Prime Minister David Lloyd George and Foreign Secretary Arthur Balfour sought to win international Jewish support for the Allied war effort, particularly in revolutionary Russia and the United States. On 2 November 1917, Balfour addressed an official 67-word letter to Lord Walter Rothschild, declared British government support for the establishment in Palestine of "a national home for the Jewish people." Crucially, the declaration pledged that existing non-Jewish communal rights would not be prejudiced. This dual commitment sowed profound division. This created deep resentment.',
      ],
    },
    block3: {
      ref: '1.3',
      date: '1920–1936',
      title: 'Zionist Pioneers, Arab Dispossession & Communal Clashes',
      paras: [
        'Throughout the 1920s and 1930s, the Zionist movement—founded in 1897 by Theodor Herzl—translated the Balfour Declaration into physical reality on the ground. Financed by the Jewish National Fund, hundreds of thousands of European Jewish immigrants arrived in Palestine, purchasing agricultural land from absentee Ottoman landlords and draining malaria-ridden swamps to establish collective farming settlements (kibbutzim). Between 1922 and 1936, the Jewish population surged from 84,000 (11%) to over 400,000 (nearly 30% of the total population), driven by virulent antisemitic persecution and the rise of Adolf Hitler in Germany.',
        'For Palestinian Arabs, this rapid influx represented an existential threat of imperial colonization and economic dispossession. Arab tenant farmers, evicted from estates purchased by Zionist agencies that operated a strict policy of "Hebrew Labor," congregated in impoverished shantytowns around Jaffa, Haifa, and Jerusalem. Communal riots erupted with increasing ferocity, most notably the 1929 Western Wall clashes which left 133 Jews and 116 Arabs dead. British Royal Commissions consistently warned that economic growth could not reconcile the contradictory aims of Arab self-determination and Jewish state-building. This deep communal polarization entrenched bitter rivalries that resisted diplomatic mediation.',
      ],
    },
    block4: {
      ref: '1.4',
      date: '1936–1939',
      title: 'The Great Arab Revolt & The 1939 MacDonald White Paper',
      paras: [
        'In April 1936, Palestinian frustration boiled over into the Great Arab Revolt. Led by the Arab Higher Committee and the Grand Mufti of Jerusalem, Amin al-Husseini, Arab workers launched a six-month general strike, demanding an immediate halt to Jewish immigration, a prohibition on land sales, and national independence. When peaceful resistance failed, armed guerrilla bands mobilized in the hill country, sabotaging oil pipelines, railway tracks, and British military outposts. Britain deployed over 25,000 troops, ruthlessly crushing the rebellion by 1939 using collective punishment, village demolitions, and aerial bombardment, disarming and devastating the Palestinian Arab leadership on the eve of the post-war crisis.',
        'Desperate to pacify the Arab world to secure Middle Eastern oil and communications as war with Nazi Germany loomed, the British government executed a stunning policy reversal. In May 1939, Colonial Secretary Malcolm MacDonald published the 1939 White Paper. The document renounced the partition of Palestine, capped Jewish immigration at 75,000 over the next five years, and stipulated that any further immigration would require Arab consent. Zionists condemned the White Paper as a cowardly betrayal of the Balfour Declaration that trapped European Jews on the eve of the Holocaust.',
      ],
    },
    ktCode: 'KT 1.0',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    ktGroupTitle: 'The Birth of the State of Israel',
  },
  {
    num: 2,
    title: 'The End of the Mandate & The 1948–49 War',
    versoSubtitle: 'Part I: Post-War Insurgency, King David Hotel & UN Resolution 181',
    rectoSubtitle: 'Part II: The 1948 Declaration, Arab Invasion & The Green Line',
    rectoAnchor:
      'The 1948 military victory and the Rhodes armistices established the Green Line, securing Israeli sovereignty while permanently dividing historical Palestine.',
    enquiry:
      'How did the Zionist paramilitary insurgency break British will and secure the State of Israel in the 1948 War?',
    block1: {
      ref: '2.1',
      date: '1945–1946',
      title: 'Holocaust Survivors, The White Paper & Zionist Insurgency',
      paras: [
        'In the summer of 1945, the liberation of Nazi concentration camps confronted the world with the horrifying reality of the Holocaust: six million European Jews had been murdered. Over 250,000 traumatised Jewish survivors remained languishing in squalid Displaced Persons camps across Germany and Austria, desperate to emigrate to Palestine. Newly elected British Prime Minister Clement Attlee and Foreign Secretary Ernest Bevin, terrified of alienating oil-rich Arab nations, strictly enforced the 1939 White Paper quota of 1,500 immigrants per month, intercepting refugee ships and deporting Holocaust survivors to barbed-wire detention camps on Cyprus.',
        'In response, the three major Zionist underground paramilitary groups formed the United Resistance Movement. The Haganah (the official defense force of the Jewish Agency, led by David Ben-Gurion) organized the clandestine Aliyah Bet immigration network, sailing rickety vessels through the British naval blockade. Simultaneously, radical right-wing militant groups—the Irgun (commanded by Menachem Begin) and the Lehi (the Stern Gang)—unleashed a ferocious guerrilla war against British infrastructure, ambushing patrols, blowing up rail junctions, and assassinating police officers.',
      ],
    },
    block2: {
      ref: '2.2',
      date: '1946–1947',
      title: 'The King David Hotel Bombing, Sergeants Affair & UN Handover',
      paras: [
        'On 22 July 1946, the Zionist insurgency reached a devastating climax. Disguised as milkmen delivering dairy churns, Irgun militants smuggled 350 kilograms of explosives into the basement restaurant of the King David Hotel in Jerusalem—the headquarters of the British civil administration and military command. The resulting explosion collapsed the entire six-story south-west wing into rubble, killing 91 people, including British officers, Arab civil servants, and Jewish secretaries. The attack sent shockwaves through Westminster and cemented British public weariness with the mandate. The audacity of the bombing shocked the British establishment to its core.',
        'Tensions escalated further in July 1947 with the "Sergeants Affair," when the Irgun kidnapped and hanged two British intelligence sergeants in retaliation for the execution of three Irgun members, booby-trapping their corpses in a net of eucalyptus trees. When the British navy boarded the refugee ship SS Exodus in international waters, forcing 4,500 Holocaust survivors back to British-occupied Germany in full glare of global media, British prestige collapsed. Exhausted by wartime debt and imperial overreach, Foreign Secretary Bevin announced in February 1947 that Britain was handing the "insoluble problem" of Palestine to the United Nations.',
      ],
    },
    block3: {
      ref: '2.3',
      date: '1947–1948',
      title: 'UN Resolution 181 (The Partition Plan) & Civil War',
      paras: [
        'In November 1947, the United Nations General Assembly passed Resolution 181 by a vote of 33 to 13. The Partition Plan recommended dividing Palestine into two sovereign states: an Arab state covering 43% of the land, and a Jewish state covering 56% (including the fertile coastal plain and the Negev desert), with Jerusalem designated an international corpus separatum under UN administration. David Ben-Gurion and the Jewish Agency pragmatically accepted the plan as legal recognition of statehood. The Arab Higher Committee and the entire Arab League rejected it outright, pointing out that Jews made up only 33% of the population and owned just 7% of the land.',
        'The morning after the UN vote, armed violence erupted across Palestine, transforming into a brutal intercommunal civil war. Arab irregulars blockaded the 100,000 Jewish residents of Jerusalem by severing the mountainous Tel Aviv highway, while Zionist forces implemented Plan Dalet (Plan D) in April 1948—a military directive to capture strategic towns, secure transportation corridors, and forcibly evacuate hostile Arab villages. The massacre of over 100 Arab civilians by Irgun and Lehi fighters at the village of Deir Yassin sparked widespread panic, triggering an accelerating exodus of Arab families from their homes.',
      ],
    },
    block4: {
      ref: '2.4',
      date: '1948–1949',
      title: 'The Proclamation of Israel, The Arab Invasion & The Green Line',
      paras: [
        'On 14 May 1948, eight hours before the final British High Commissioner sailed from Haifa, David Ben-Gurion stood beneath a portrait of Theodor Herzl in the Tel Aviv Museum and read the Declaration of Independence, proclaiming the State of Israel. The following morning, armies from five Arab nations—Egypt, Syria, Transjordan, Iraq, and Lebanon—invaded Palestine to crush the fledgling state. Despite initial Arab advances, the newly unified Israel Defense Forces (IDF) proved superior in discipline, organization, and motivation, having mobilized 60,000 troops under unified command.',
        'During a crucial four-week UN truce in June 1948, Israel broke the international arms embargo by purchasing modern fighter aircraft, artillery, and rifles from Czechoslovakia (with Soviet approval). When fighting resumed, the IDF launched sweeping counter-offensives (Operations Yoav and Horev), driving Egyptian forces out of the Negev and capturing Galilee. Between February and July 1949, UN mediator Ralph Bunche brokered bilateral armistice agreements on the island of Rhodes. The resulting ceasefire borders—known as the "Green Line"—left Israel in control of 78% of Mandatory Palestine, while Transjordan annexed the West Bank and East Jerusalem, and Egypt occupied the Gaza Strip. This armistice partition established thirty years of confrontation.',
      ],
    },
    ktCode: 'KT 1.1',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    ktGroupTitle: 'The Birth of the State of Israel',
  },
  {
    num: 3,
    title: 'The Palestinian Refugee Crisis & The 1949 Armistice',
    versoSubtitle: 'Part I: Al-Nakba, UNRWA & The Tragedy of Dispossession',
    rectoSubtitle: 'Part II: The Law of Return, IDF Consolidation & Fedayeen Raids',
    rectoAnchor:
      'Mass Palestinian displacement and the unyielding Law of Return created a militarised frontier defined by cross-border fedayeen raids and brutal reprisals.',
    enquiry:
      'How did the 1948–49 War create the Palestinian refugee crisis and reshape Middle Eastern demographics?',
    block1: {
      ref: '3.1',
      date: '1948–1949',
      title: 'Al-Nakba (The Catastrophe) & The Palestinian Refugee Exodus',
      paras: [
        'The 1948–49 War resulted in a catastrophic humanitarian disaster for the indigenous Arab population of Palestine, known in Arabic as Al-Nakba (The Catastrophe). Approximately 700,000 to 750,000 Palestinian Arabs—over half the pre-war population—fled or were expelled from their ancestral homes, farms, and villages in areas that fell under Israeli sovereignty. Palestinian society was shattered: wealthy urban elites evacuated early to Cairo and Beirut, while hundreds of thousands of impoverished rural villagers were forced onto roads at gunpoint, carrying only the iron keys to their stone houses and identity deeds in their pockets.',
        'Historians debate the complex causes of the exodus: Arab radio broadcasts urged civilians to seek temporary shelter until Arab armies triumphed, while Israeli military expulsions (such as the forced marches from Lydda and Ramle ordered by Yitzhak Rabin) and psychological terror after Deir Yassin generated widespread panic. In December 1949, the United Nations established the United Nations Relief and Works Agency (UNRWA) to provide emergency food, healthcare, and tented shelter. Over 50 permanent refugee camps sprung up across Gaza, the West Bank, Jordan, Syria, and Lebanon, becoming permanent monuments to Palestinian statelessness. This entrenched decades of national grievance.',
      ],
    },
    block2: {
      ref: '3.2',
      date: '1948–1950',
      title: 'UN Resolution 194 & The Right of Return Deadlock',
      paras: [
        'In December 1948, the United Nations General Assembly passed Resolution 194, resolving that refugees wishing to return to their homes and live at peace with their neighbours should be permitted to do so at the earliest practicable date, and that compensation should be paid for the property of those choosing not to return. Arab governments demanded the immediate, unconditional repatriation of all refugees as a prerequisite for any peace negotiations. Israel adamantly rejected repatriation, asserting that allowing a hostile Arab population to return would destroy the Jewish state from within. This transformed regional security forever.',
        'Instead, the Israeli government enacted the Absentee Property Law of 1950, which legally confiscated all land, citrus orchards, commercial premises, and houses belonging to Palestinians who had fled during the war. Over 400 depopulated Arab villages were systematically bulldozed or reforested by the Jewish National Fund to prevent any return, while vacant properties in Jaffa, Haifa, and West Jerusalem were reassigned to house incoming Jewish immigrants. The refugee question was frozen into an immovable political barrier. The swift military reprisals deepened regional bitterness, transforming the armistice borders into active frontline combat zones.',
      ],
    },
    block3: {
      ref: '3.3',
      date: '1950–1953',
      title: 'The Law of Return, IDF Creation & US Economic Aid',
      paras: [
        "While Palestinian Arabs were barred from returning, the Knesset passed the landmark Law of Return in July 1950, declaring that every Jewish person anywhere in the world possessed the absolute right to immigrate to Israel and gain automatic citizenship. Between 1948 and 1952, Israel's population doubled from 650,000 to 1.4 million. Alongside 300,000 European Holocaust survivors, over 300,000 Sephardic and Mizrahi Jews arrived after being expelled or fleeing anti-Zionist riots and persecution in Arab nations like Iraq, Yemen, Morocco, and Egypt. This transformed the cultural landscape.",
        "This demographic explosion pushed the young state to the brink of economic collapse. Immigrants were housed in squalid transit camps (Ma'abarot) made of canvas tents and tin shacks, surviving under strict food rationing. Israel survived through vital **US economic and military aid to Israel**, private American loans, and the controversial 1952 Reparations Agreement with West Germany, which pumped $822 million into infrastructure. To integrate this diverse population and defend against hostile neighbors, David Ben-Gurion established the **Israeli Defence Forces (IDF)** as the central engine of national cohesion, introducing universal conscription. By transforming immigration into an engine of nation-building, Israel expanded its workforce and military readiness.",
      ],
    },
    block4: {
      ref: '3.4',
      date: '1951–1955',
      title: 'Relations with Egypt: Fedayeen Border Raids & Unit 101 Reprisals',
      paras: [
        'The unfortified 1949 armistice Green Line was porous, running through backyards, dividing farms from water wells, and cutting olive groves in half. Displaced Palestinians living in wretched poverty in refugee camps began crossing the border back into Israel. Initially, the vast majority of infiltrators were unarmed peasants seeking to harvest crops, recover hidden valuables, or visit relatives. However, Israeli authorities treated all infiltration as an existential security threat, adopting a shoot-to-kill border policy.',
        'By 1953, infiltration had escalated into armed fedayeen (self-sacrificers) guerrilla warfare, sponsored by Egyptian military intelligence in Gaza and Jordanian authorities in the West Bank. Fedayeen squads planted landmines on Israeli roads, derailed trains, and attacked civilian kibbutzim. In response, Prime Minister Ben-Gurion and Chief of Staff Moshe Dayan established Unit 101—a clandestine elite commando unit commanded by 25-year-old Ariel Sharon. Unit 101 pioneered a doctrine of disproportionate retaliation, culminating in the October 1953 Qibya raid, where Sharon’s commandos blew up 45 houses in a Jordanian village, killing 69 civilians and sparking international condemnation. Reprisal operations commanded by Sharon cemented a doctrine of disproportionate deterrence that became central to IDF strategic doctrine.',
      ],
    },
    ktCode: 'KT 1.2',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    ktGroupTitle: 'The Birth of the State of Israel',
  },
  {
    num: 4,
    title: 'Nasser, Arab Nationalism & The 1956 Suez Crisis',
    versoSubtitle: 'Part I: Pan-Arabism, The Czech Arms Deal & Suez Nationalisation',
    rectoSubtitle: 'Part II: The Sèvres Collusion, Operation Musketeer & Superpower Reality',
    rectoAnchor:
      'Nasser’s nationalisation of the Suez Canal and the humiliating Anglo-French retreat marked the definitive collapse of European colonial power in the Middle East.',
    enquiry:
      'How did the 1956 Suez Crisis destroy European imperial power and elevate Nasser to the hero of the Arab world?',
    block1: {
      ref: '4.1',
      date: '1954–1955',
      title: 'Gamal Abdel Nasser, Pan-Arab Pride & The Czech Arms Deal',
      paras: [
        'In 1954, a charismatic young army colonel named Gamal Abdel Nasser seized absolute power in Egypt. A veteran of the 1948 War who had been besieged in the Faluja Pocket, Nasser blamed corrupt Arab monarchs and European imperialists for the Arab defeat. Broadcasting across the region via the powerful Voice of the Arabs radio station in Cairo, Nasser electrified the Arab world with the doctrine of Pan-Arabism—calling for Arab unity, social justice, and the complete elimination of Western colonial domination. This ideological vision resonated deeply across post-colonial societies.',
        "In February 1955, the **Israeli attack on Gaza** killed 38 Egyptian soldiers, exposing Egypt's catastrophic military weakness and humiliating Nasser. Rebuffed by the United States and Britain when requesting weapons, Nasser executed a stunning geopolitical masterstroke: in September 1955, he signed the massive Czech Arms Deal with the Soviet bloc, purchasing 200 modern MiG-15 fighter jets, 300 heavy tanks, and submarines in exchange for Egyptian cotton. For the first time, the Soviet Union gained a strategic foothold in the Middle East, terrifying British Prime Minister Anthony Eden and Israeli leaders who watched the balance of power shift. The Czech arms shipment shattered Western military dominance, demonstrating the growing geopolitical reach of the Soviet Union.",
      ],
    },
    block2: {
      ref: '4.2',
      date: '1956',
      title: 'The Aswan Dam Cancellation & Nationalisation of the Suez Canal',
      paras: [
        "Nasser’s central ambition was to industrialise Egypt by constructing the massive Aswan High Dam across the River Nile to provide electricity and control annual floods. Furious at Nasser's recognition of Communist China and his flirtation with Moscow, US Secretary of State John Foster Dulles abruptly cancelled a promised $56 million World Bank loan package in July 1956, expecting to humiliate the Egyptian leader and topple his government.",
        'Nasser’s retaliation was audacious and swift. On 26 July 1956, speaking before an ecstatic crowd of 250,000 in Alexandria, Nasser pronounced the codeword "de Lesseps" (the French engineer who built the canal). At that signal, Egyptian troops stormed the headquarters of the Universal Suez Canal Company, seizing control of the vital international waterway. Nasser declared that Egypt would use the canal’s $100 million annual toll revenues to fund the Aswan Dam. British Prime Minister Anthony Eden denounced Nasser as a "Moslem Mussolini" who had "his thumb on Britain\'s windpipe," privately vowing to destroy him. Nasser’s charismatic oratory rallied millions across the Arab world, positioning Cairo as the epicentre of anti-imperial resistance.',
      ],
    },
    block3: {
      ref: '4.3',
      date: 'Oct–Nov 1956',
      title: 'The Secret Sèvres Protocol & The Tripartite Invasion',
      paras: [
        "Unable to secure American support for military intervention, Britain and France turned to Israel. In late October 1956, French diplomats convened a secret meeting in a secluded villa at Sèvres, outside Paris, attended by Anthony Eden's representatives, French Prime Minister Guy Mollet, and Israeli Prime Minister David Ben-Gurion with Moshe Dayan. Together, they forged the notorious Protocol of Sèvres—a cynical, pre-planned conspiracy. Israel would invade the Egyptian Sinai Peninsula on 29 October, advancing towards the Suez Canal; Britain and France would then pose as impartial peacekeepers, issuing an ultimatum for both sides to withdraw from the canal zone, and invade Egypt when Nasser inevitably refused. French military planners coordinated air and naval assets directly with Israeli commanders.",
        'The plan was executed with mechanical precision. On 29 October, Israeli paratroopers dropped near the Mitla Pass, while armored columns swept across Sinai, routing Egyptian defenders, occupying the Gaza Strip, and capturing Sharm el-Sheikh to reopen the Straits of Tiran to Israeli shipping. The next day, London and Paris issued their ultimatum, and on 31 October, Anglo-French bombers pulverised Egyptian airfields. On 5 November, British and French paratroopers landed at Port Said in Operation Musketeer, seizing the canal zone amid bitter urban combat.',
      ],
    },
    block4: {
      ref: '4.4',
      date: 'Nov 1956–1957',
      title: 'Eisenhower’s Ultimatum, Imperial Humiliation & Birth of UNEF',
      paras: [
        'The Anglo-French invasion sparked a furious international crisis. US President Dwight D. Eisenhower, facing re-election and outraged that his closest allies had launched a colonial war behind his back while Soviet tanks were crushing the Hungarian Uprising, issued an uncompromising ultimatum. Washington threatened to block emergency IMF loans and dump British sterling reserves on currency markets, precipitating the catastrophic collapse of the British pound. Soviet Premier Nikolai Bulganin went further, threatening rocket attacks against London and Paris.',
        "Under intense US pressure, Israel withdrew from Sinai in March 1957. In exchange, the United Nations deployed the first international peacekeeping force—the United Nations Emergency Force (UNEF)—along the armistice border and at Sharm el-Sheikh, guaranteeing Israeli maritime passage through the Straits of Tiran for the next decade. The crisis elevated Nasser into the undisputed hero of Pan-Arabism, culminating in the **formation of the United Arab Republic (UAR) in 1958**—the revolutionary political union of Egypt and Syria under Nasser's presidency. Although the UAR collapsed in 1961, it entrenched Nasser's regional hegemony and intensified Israeli fears of hostile Arab encirclement across both frontiers.",
      ],
    },
    ktCode: 'KT 1.3',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    ktGroupTitle: 'The Birth of the State of Israel',
  },
  {
    num: 5,
    title: 'Water Wars, Border Raids & The Road to War (1964–1967)',
    versoSubtitle: 'Part I: The 1964 Cairo Conference, The PLO & Headwater Diversions',
    rectoSubtitle: 'Part II: The Golan Heights Clashes, The Samu Raid & Damascus Dogfight',
    rectoAnchor:
      'Disputes over Jordan River water diversion, border artillery clashes, and Egyptian troop mobilization in Sinai made war an unavoidable inevitability by 1967.',
    enquiry:
      'How did clashes over the River Jordan water supply and Syrian border skirmishes push the Middle East to war by 1967?',
    block1: {
      ref: '5.1',
      date: '1964',
      title: 'The 1964 Cairo Summit & Creation of the PLO',
      paras: [
        'In January 1964, the heads of state of the Arab League gathered in Cairo at the invitation of Egyptian President Gamal Abdel Nasser. The immediate catalyst was Israel’s completion of the National Water Carrier—a massive engineering pipeline designed to pump water from the Sea of Galilee across the coastal plain to irrigate the arid Negev desert. Arab governments viewed this diversion as an aggressive strategic move to absorb millions more Jewish immigrants. At Cairo, Arab leaders agreed on two radical measures: they approved a joint Arab engineering scheme to divert the headwaters of the River Jordan inside Syria and Lebanon, and they founded the Palestine Liberation Organisation (PLO) under Ahmad Shukeiri to give Palestinians an official voice.',
        'However, younger, more militant Palestinian refugees grew impatient with official Arab League rhetoric. Led by Yasser Arafat, an independent guerrilla organisation called Fatah (the Movement for the National Liberation of Palestine) stepped forward, determined to wage armed struggle. Operating from bases in Syria and Jordan, Fatah commandos began launching clandestine cross-border sabotage raids into Israel in January 1965, laying landmines under railway tracks, blowing up water pumps, and targeting farming kibbutzim, intentionally seeking to provoke Israeli retaliation that would drag Arab armies into total war.',
      ],
    },
    block2: {
      ref: '5.2',
      date: '1965–1966',
      title: "The Water Wars & The Syrian Ba'athist Coup",
      paras: [
        'Between 1964 and 1966, the dispute over freshwater escalated into active military combat along the northern frontier. Israeli tanks and fighter-bombers repeatedly shelled Syrian construction machinery and diversion canals on the Golan slopes, bringing the Arab diversion scheme to a complete standstill. The crisis reached fever pitch in February 1966 when a radical military coup brought hardline, Marxist officers of the Ba\'ath Party to power in Damascus. The new Syrian regime, led by Salah Jadid and Defense Minister Hafez al-Assad, openly pledged total sponsorship for Fatah guerrillas and called for a "popular liberation war" to wipe Israel off the map. This heightened military tensions across borders.',
        'Syrian artillery dug into concrete bunkers on the heights regularly rained high-explosive shells down on Israeli collective farms in the Hula Valley below. Israeli farmers were forced to plough their fields in custom-armored tractors, while children in border kibbutzim like Ein Gev and Gadot spent weeks sleeping in underground concrete bomb shelters. Israel adopted a doctrine of rapid military escalation, warning that host nations would be held directly responsible for any guerrilla incursions launched from their territory.',
      ],
    },
    block3: {
      ref: '5.3',
      date: 'Nov 1966',
      title: 'Operation Asad: The Destruction of the Samu Raid',
      paras: [
        'In November 1966, after a Fatah landmine killed three Israeli paratroopers on border patrol, the Israeli military High Command launched Operation Asad—a massive retaliatory strike into the Jordanian-controlled West Bank. On the morning of 13 November, an armored brigade of 4,000 Israeli soldiers, supported by Centurion tanks and Dassault Mirage jets, crossed the Green Line and stormed the town of as-Samu. Over 125 houses, a medical clinic, and a school were demolished by Israeli sappers. Israeli agricultural workers operated tractors under constant threat of sniper fire.',
        'When an outnumbered Jordanian army column rushed to defend the town, Israeli forces ambushed them, killing 18 Jordanian soldiers and a civilian, and wounding 54 others. The destruction of Samu sparked massive anti-government riots across East Jerusalem, Amman, and the West Bank, with Palestinians demanding the overthrow of King Hussein for failing to protect them. The raid fatally shattered the secret dialogue between Israel and the Jordanian monarch, while radical Arab radio stations mocked King Hussein and President Nasser as cowards hiding behind the UN peacekeeping force in Sinai. Syrian artillery bombardments maintained relentless psychological and economic pressure on northern Israeli agricultural communities.',
      ],
    },
    block4: {
      ref: '5.4',
      date: 'April 1967',
      title: 'The 7 April 1967 Dogfight & Soviet Disinformation',
      paras: [
        'The final military trigger occurred on 7 April 1967. When an Israeli tractor began ploughing a disputed strip of land in the demilitarized zone below the Golan Heights, Syrian gunners opened fire with machine guns and heavy artillery. The clash escalated into an all-out artillery duel, prompting the Israeli Air Force to dispatch Mirage III fighter jets to bomb Syrian positions. When the Syrian Air Force scrambled MiG-21s to intercept them, Israeli pilots shot down six Syrian MiGs in succession, chasing the fleeing aircraft all the way to the suburbs of Damascus in full view of the humiliated Syrian public. This defensive posture invited preemptive strikes.',
        'In early May, the Soviet Union added fuel to the fire by handing false intelligence reports to Egypt, claiming that Israel had massed 11 to 13 armored brigades along the Syrian border preparing for an imminent invasion to topple the Damascus regime. Although UN observers inspected the frontier and confirmed no Israeli troop concentrations existed, Nasser felt trapped. Accused of hiding behind the UN while his Syrian ally was attacked, Nasser decided he had to act decisively to restore his prestige as leader of the Arab world, setting the catastrophic chain reaction of May 1967 in motion. The expulsion of UN peacekeepers eliminated the diplomatic buffer, leaving Egyptian and Israeli armies confronting each other directly across the frontier.',
      ],
    },
    ktCode: 'KT 2.1',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    ktGroupTitle: 'The Escalating Conflict',
  },
  {
    num: 6,
    title: 'The Six-Day War: Operation Focus & The 3-Hour Triumph',
    versoSubtitle: "Part I: Nasser's Brinkmanship, The UNEF Eviction & The Tiran Blockade",
    rectoSubtitle: 'Part II: Operation Focus, Three Fronts & The Fall of the Old City',
    rectoAnchor:
      'Israel’s preemptive air blitzkrieg shattered three Arab armies in six days, quadrupling Israeli territory and placing one million Palestinians under direct military occupation.',
    enquiry:
      'Why was the Six-Day War decided in three hours, and how did Israel conquer an empire in six days?',
    block1: {
      ref: '6.1',
      date: 'May 1967',
      title: 'Nasser’s Brinkmanship: Evicting UNEF & Closing the Straits',
      paras: [
        'On 14 May 1967, President Nasser launched a dramatic gamble of military brinkmanship. He marched two full Egyptian armored divisions through the streets of Cairo in broad daylight and deployed 100,000 troops and 1,000 tanks into the demilitarized Sinai Peninsula. Two days later, Nasser demanded that UN Secretary-General U Thant immediately withdraw the 3,400 UNEF peacekeepers who had guarded the border since 1957. To international astonishment, U Thant complied without consulting the Security Council, removing the buffer between Egyptian and Israeli armies. Israeli reconnaissance pilots had spent months mapping Egyptian radar installations.',
        'On 22 May, Nasser took the fatal step: he reoccupied the coastal fort of Sharm el-Sheikh and declared a complete naval blockade of the Straits of Tiran, cutting off all maritime shipping to Israel\'s southern port of Eilat. Nasser broadcast to the world: "The Jews threaten war—we say to them: Welcome, we are ready for war!" In late May, King Hussein of Jordan flew to Cairo to sign a joint military defense pact, placing the Jordanian army under Egyptian command. Israel was encircled by 250,000 Arab troops and gripped by existential panic: rabbis consecrated public parks as emergency war cemeteries, and digging 10,000 grave sites commenced in Tel Aviv. Rabin’s strategic masterstroke achieved absolute air supremacy within hours, sealing the fate of the entire land campaign before it began.',
      ],
    },
    block2: {
      ref: '6.2',
      date: '5 June 1967',
      title: 'Operation Focus (Mivtza Moked): The Dawn Airstrike',
      paras: [
        'Faced with economic paralysis caused by total civilian mobilization and convinced that an Arab attack was imminent, newly appointed Defense Minister Moshe Dayan and Prime Minister Levi Eshkol authorized a preemptive strike. At 7:45 AM on Monday, 5 June 1967, the Israeli Air Force (IAF), commanded by General Mordechai Hod, launched Operation Focus. Nearly 200 combat aircraft—leaving only four jets to defend Israeli airspace—flew out over the Mediterranean Sea at tree-top level, beneath Egyptian radar beams, maintaining absolute radio silence.',
        'The timing was masterly: Egyptian pilots had just completed their dawn dawn patrols, and military commanders were stuck in Cairo morning traffic. Israeli jets appeared suddenly over eleven Egyptian air bases, dropping French-designed runway-cratering "dibber" bombs that shattered concrete runways before strafing grounded aircraft. In less than three hours, the IAF wiped out 309 of Egypt\'s 340 combat aircraft, including all thirty long-range Tu-16 supersonic bombers, while losing just nineteen jets. In a single morning, Israel won total, uncontested mastery of the skies, deciding the outcome of the war before ground fighting had even peaked.',
      ],
    },
    block3: {
      ref: '6.3',
      date: '5–8 June 1967',
      title: 'Sinai Blitzkrieg & The Jerusalem Front',
      paras: [
        'With total air supremacy, three Israeli armored divisions under Generals Israel Tal, Avraham Yoffe, and Ariel Sharon punched through fortified Egyptian defensive lines in Sinai at Abu Ageila and Rafah. Without air cover, the Egyptian army collapsed into a chaotic rout; Field Marshal Abdel Hakim Amer panicked and ordered a general retreat, turning the desert passes into slaughter corridors as Israeli jets pulverized retreating armor. Within four days, Israeli tanks reached the eastern banks of the Suez Canal, having captured the entire 60,000-square-kilometre Sinai Peninsula.',
        'On the eastern front, Israeli Prime Minister Eshkol sent a message to King Hussein promising not to attack if Jordan remained neutral. However, deceived by false Egyptian radio broadcasts claiming overwhelming victories over Tel Aviv, Jordanian artillery opened fire on West Jerusalem and launched air raids. The IDF launched an immediate counter-attack: Israeli paratroopers engaged in ferocious hand-to-hand trench combat on Ammunition Hill, encircling the Old City. On Wednesday morning, 7 June, paratroopers commanded by Colonel Motta Gur stormed through the Lion\'s Gate, broadcasting the historic words: "The Temple Mount is in our hands!" Surrounded by weeping soldiers, Rabbi Shlomo Goren blew the shofar at the Western Wall, reunifying Jerusalem under Jewish rule for the first time in 2,000 years.',
      ],
    },
    block4: {
      ref: '6.4',
      date: '9–10 June 1967',
      title: 'Storming the Golan Heights & The New Middle East Map',
      paras: [
        "With Egypt and Jordan crushed, Defense Minister Moshe Dayan turned Israel's full military power against Syria. On 9 June, Israeli armored bulldozers, tanks, and infantry scrambled up the nearly vertical volcanic cliffs of the Golan Heights under murderous artillery fire, capturing the heavily fortified Syrian strongpoints at Za'ura and Qala. By 10 June, Israeli armor captured the provincial capital of Quneitra, putting Damascus within artillery range before a UN ceasefire took effect at 6:30 PM. The stunning speed of victory stunned military observers and global powers alike.",
        'In just 132 hours of combat, the geopolitical map of the Middle East was revolutionized. Israel had conquered the Sinai Peninsula, the Gaza Strip, the West Bank, East Jerusalem, and the Golan Heights—a territory three times the size of pre-war Israel, bringing over one million Palestinian Arabs under direct military occupation. While Israeli society celebrated an almost messianic deliverance, the Arab world was plunged into profound shock and humiliation: Pan-Arab nationalism suffered a mortal blow, and Nasser submitted his resignation on live television, only to be recalled by weeping crowds. The capture of the holy sites aroused fervent religious messianism inside Israel while inflicting profound psychological trauma on the Arab world.',
      ],
    },
    ktCode: 'KT 2.2',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    ktGroupTitle: 'The Escalating Conflict',
  },
  {
    num: 7,
    title: 'The Conquered Territories & UN Resolution 242',
    versoSubtitle: 'Part I: Military Occupation, The Khartoum Summit & The "Three Noes"',
    rectoSubtitle: 'Part II: Resolution 242, "Land for Peace" & The Rise of Settlements',
    rectoAnchor:
      'UN Resolution 242 established the historic "Land for Peace" principle, while settlement building and the Khartoum "Three Noes" entrenched three decades of confrontation.',
    enquiry:
      'Why did the territorial conquests of 1967 entrench permanent stalemate instead of bringing peace?',
    block1: {
      ref: '7.1',
      date: 'Summer 1967',
      title: 'The Military Administration of the Occupied Territories',
      paras: [
        'Following the 1967 triumph, the Israeli government found itself governing more than one million Palestinian Arabs in the West Bank and Gaza Strip, along with thousands of Syrian Druze on the Golan Heights. Defense Minister Moshe Dayan introduced an administrative policy termed the "Enlightened Occupation" or "Open Bridges." Under this doctrine, Jordan was permitted to maintain administrative ties and pay civil service salaries in the West Bank, while agricultural produce and travelers were allowed to cross the River Jordan bridges. Dayan hoped that by raising the material standard of living and keeping military visibility low, Palestinians would accept Israeli rule.',
        'However, beneath this veneer lay a rigid military apparatus. The IDF governed through military decrees, enforcing military courts, midnight searches, administrative detention without trial, censorship of newspapers, and the deportation of political leaders. Approximately 300,000 Palestinians fled or were displaced into Jordan during and immediately after the fighting, becoming "twice-refugees." Israeli society was divided between "security hawks" who wanted to retain the biblical territories of Judea and Samaria, and "doves" who warned that ruling an alien population would corrupt Israeli democracy. Military rule established extensive administrative controls, identity permits, and security checkpoints that reshaped daily Palestinian life under occupation.',
      ],
    },
    block2: {
      ref: '7.2',
      date: 'Sept 1967',
      title: 'The Khartoum Arab Summit & The "Three Noes"',
      paras: [
        'In August 1967, eight Arab heads of state gathered in the Sudanese capital of Khartoum to forge a unified response to the catastrophe of the Six-Day War. Radical regimes like Syria and Algeria advocated a war of economic attrition and an immediate oil embargo against Western nations. However, oil-rich monarchies like Saudi Arabia and Kuwait opted to subsidize the shattered economies of Egypt and Jordan with $392 million in annual grants to enable them to rebuild their frontline armed forces.',
        'On 1 September 1967, the summit issued the famous Khartoum Resolution, anchored by the uncompromising "Three Noes": "No peace with Israel, no recognition of Israel, no negotiations with it, and adherence to the rights of the Palestinian people in their country." The Khartoum declaration hardened Israeli public attitudes, convincing the Israeli government that the Arab states had no intention of ever living alongside a Jewish state, thereby snuffing out early Israeli government deliberations about trading the West Bank and Sinai for peace. Religious nationalist movements viewed the newly acquired territories as liberated biblical heritage rather than negotiable bargaining chips.',
      ],
    },
    block3: {
      ref: '7.3',
      date: 'Nov 1967',
      title: 'UN Resolution 242 & The "Land for Peace" Principle',
      paras: [
        'On 22 November 1967, after months of tortuous international diplomacy, the United Nations Security Council unanimously adopted Resolution 242. Drafted by British Ambassador Lord Caradon, Resolution 242 established the foundational "Land for Peace" benchmark that would underpin all subsequent Arab-Israeli peace negotiations for the next half-century. The resolution balanced two core principles: the "inadmissibility of the acquisition of territory by war" and the "withdrawal of Israeli armed forces from territories occupied in the recent conflict," paired with the "termination of all claims or states of belligerency and respect for the sovereignty of every state in the area to live in peace within secure and recognized boundaries." The diplomatic compromise balanced territorial withdrawal against recognized regional sovereignty and secure boundaries.',
        'Crucially, the English text intentionally omitted the definite article "the," calling for withdrawal from "territories occupied" rather than "the territories occupied"—an ambiguity that allowed Israel to argue it was not required to return all captured land. Crucially, the resolution treated Palestinians purely as a "refugee problem," failing to acknowledge Palestinian national identity or political rights, causing both the PLO and Syria to reject it outright. Resolution 242’s linguistic ambiguity allowed both sides to interpret its withdrawal clauses to suit their conflicting territorial ambitions.',
      ],
    },
    block4: {
      ref: '7.4',
      date: '1967–1972',
      title: 'The Allon Plan & The Genesis of Israeli Settlements',
      paras: [
        'Within weeks of the 1967 ceasefire, the Israeli Labor government established the first permanent civilian settlements in the occupied territories. Deputy Prime Minister Yigal Allon drafted the "Allon Plan"—a strategic blueprint proposing that Israel annex a 15-kilometre security corridor along the Jordan Valley and the Judean Desert to establish a defensible eastern military border, while returning densely populated Arab towns in the central highlands to Jordanian administrative control.',
        'Although never formally adopted as official policy, the Allon Plan guided state-sponsored settlement building. The first settlement, Kfar Etzion, was re-established in the West Bank in September 1967 on the site of a Jewish kibbutz destroyed in 1948. Soon after, religious-nationalist pioneers led by Rabbi Moshe Levinger checked into the Park Hotel in Arab Hebron for Passover in 1968 and refused to leave, eventually compelling the Israeli government to build the fortified settlement of Kiryat Arba. By 1972, dozens of military outposts and civilian settlements were permanently altering the physical landscape, transforming the occupation from a temporary military necessity into an entrenched ideological reality.',
      ],
    },
    ktCode: 'KT 2.3',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    ktGroupTitle: 'The Escalating Conflict',
  },
  {
    num: 8,
    title: 'The Rise of Palestinian Resistance: The PLO & Munich',
    versoSubtitle: 'Part I: The Battle of Karameh, Yasser Arafat & Guerrilla Warfare',
    rectoSubtitle: 'Part II: Skyjackings, Black September & The 1972 Munich Massacre',
    rectoAnchor:
      'The rise of the PLO and asymmetric international skyjackings propelled Palestinian national identity onto the global stage through spectacle and armed struggle.',
    enquiry:
      'How did Palestinian fedayeen transform from refugees into global armed revolutionaries between 1968 and 1972?',
    block1: {
      ref: '8.1',
      date: '1968–1969',
      title: 'The Battle of Karameh & Yasser Arafat Takes the PLO',
      paras: [
        'The crushing defeat of conventional Arab armies in 1967 convinced Palestinian leaders that Arab states were incapable of liberating Palestine. In March 1968, the Israeli army launched a punitive raid across the Jordan River into the town of Karameh to destroy a major Fatah guerrilla base. Forewarned, Yasser Arafat and several hundred Fatah fighters stood their ground alongside Jordanian army artillery, inflicting 28 Israeli deaths and destroying four tanks before withdrawing. Though militarily an Israeli tactical victory, Karameh was celebrated across the Arab world as a heroic moral triumph. This inspired broad popular support.',
        'Thousands of young volunteers flocked to join the fedayeen. In February 1969, independent guerrilla factions seized control of the Palestine National Council, electing Yasser Arafat as Chairman of the PLO Executive Committee. The PLO adopted a revised National Charter calling for the total dismantling of the Zionist state through armed revolution and the creation of a secular, democratic state across historic Palestine. Operating as a state-within-a-state inside Jordan, the PLO ran its own clinics, schools, police, and tax collection, openly defying King Hussein.',
      ],
    },
    block2: {
      ref: '8.2',
      date: 'Sept 1970',
      title: "Dawson's Field & The Bloodbath of Black September",
      paras: [
        "More radical Marxist factions within the PLO, led by George Habash's Popular Front for the Liberation of Palestine (PFLP), pioneered international airline hijackings to force the Palestinian struggle onto the front pages of world newspapers. On 6 September 1970, PFLP operatives hijacked four Western airliners simultaneously, forcing three of them—a TWA jet, a Swissair jet, and a British BOAC airliner—to land at Dawson’s Field, a remote desert strip in Jordan. After evacuating over 300 civilian hostages, PFLP commandos blew the aircraft up in front of global television cameras, humiliating King Hussein on his own soil. This emboldened militant groups.",
        'Determined to re-establish royal authority, King Hussein ordered the Jordanian Armed Forces to strike on 17 September 1970. In ten days of ferocious urban warfare known as "Black September," Jordanian artillery and tanks bombarded Palestinian refugee camps and headquarters in Amman, killing an estimated 3,000 to 5,000 Palestinian fighters and civilians. Syrian tanks that intervened to assist the PLO were repulsed. By July 1971, King Hussein had completely expelled the armed guerrilla infrastructure from Jordan, forcing Arafat and the PLO to relocate their headquarters to southern Lebanon ("Fatahland"). The skyjackings forced international governments to confront the reality that the Palestinian national question could no longer be ignored.',
      ],
    },
    block3: {
      ref: '8.3',
      date: 'Sept 1972',
      title: 'The Munich Olympic Games Massacre',
      paras: [
        'In the wake of the expulsion from Jordan, a clandestine terrorist splinter group named "Black September" was formed under the direction of Arafat\'s deputy, Salah Khalaf (Abu Iyad). On 5 September 1972, eight Black September gunmen scaled the wire fence of the Olympic Village at the Munich Summer Games in West Germany. Bursting into the quarters of the Israeli Olympic delegation, they shot dead wrestling coach Moshe Weinberg and weightlifter Yossef Romano, taking nine other Israeli athletes and coaches hostage, demanding the release of 234 Palestinian prisoners in Israel.',
        'A televised standoff captivated an estimated 900 million viewers worldwide. When the German police attempted a botched rescue ambush at Fürstenfeldbruck airfield, the terrorists detonated a hand grenade inside a helicopter packed with hostages and executed the rest with machine guns. All eleven Israeli athletes and a West German police officer were murdered. The slaughter horrified global opinion, transforming the public face of the Palestinian struggle into one of merciless international terrorism. The massacre altered global aviation security, prompting international counter-terrorism measures.',
      ],
    },
    block4: {
      ref: '8.4',
      date: '1972–1974',
      title: 'Operation Wrath of God & Arafat\'s "Olive Branch" at the UN',
      paras: [
        'In response to Munich, Israeli Prime Minister Golda Meir authorized Operation Wrath of God—a covert global assassination campaign conducted by the Mossad. Over the next two years, Israeli hit squads tracked down and assassinated Black September and PLO operatives across Paris, Rome, Cyprus, and Beirut, culminating in the April 1973 "Spring of Youth" commando raid on PLO headquarters led by Ehud Barak. While this campaign decimated the operational leadership of Black September, the botched killing of an innocent Moroccan waiter in Lillehammer, Norway, in July 1973 exposed Israeli undercover operations to international censure.',
        'Recognizing that terrorism was alienating Western diplomacy, Yasser Arafat executed a pivot toward international legitimacy. In October 1974, an Arab League summit in Rabat recognized the PLO as the "sole legitimate representative of the Palestinian people." On 13 November 1974, Arafat addressed the UN General Assembly in New York, wearing his signature keffiyeh and a holster. He delivered an iconic plea: "I have come bearing an olive branch and a freedom fighter\'s gun. Do not let the olive branch fall from my hand." The UN granted the PLO observer status, securing international political recognition. Arafat’s speech established the PLO as an indispensable participant in any future comprehensive peace architecture.',
      ],
    },
    ktCode: 'KT 2.4',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    ktGroupTitle: 'The Escalating Conflict',
  },
  {
    num: 9,
    title: 'The War of Attrition & The 1973 Yom Kippur War',
    versoSubtitle: "Part I: The Bar-Lev Line, Sadat's Gamble & The Holy Day Assault",
    rectoSubtitle: "Part II: The Valley of Tears, Sharon's Crossing & The OPEC Oil Embargo",
    rectoAnchor:
      'The 1973 surprise assault shattered Israeli complacency, while the Arab oil embargo transformed global economics and forced American diplomatic intervention.',
    enquiry:
      'Why did the 1973 Yom Kippur War catch Israel unprepared, and how did it shatter the regional status quo?',
    block1: {
      ref: '9.1',
      date: '1969–1972',
      title: 'The War of Attrition & Anwar Sadat’s Strategic Ambition',
      paras: [
        'Following the 1967 defeat, President Nasser launched the War of Attrition (1969–1970) along the Suez Canal, unleashing relentless artillery barrages against Israeli forces fortified behind the Bar-Lev Line—a massive, 150-kilometre sand rampart built by Israel along the canal bank. Israel responded with deep-penetration air strikes into Egypt, prompting the Soviet Union to deploy 15,000 military advisors and advanced SAM missile batteries. When Nasser died suddenly of a heart attack in September 1970, he was succeeded by Vice President Anwar Sadat. Egyptian artillery barrages along the canal inflicted steady casualties on Israeli defensive bunkers.',
        'Sadat inherited a nation crippled by military expenditure and public demoralisation. Convinced that the superpowers had accepted a "no war, no peace" stalemate that left Israel permanently occupying the Sinai, Sadat concluded that only a dramatic military shock could shake the diplomatic deadlock and force the United States to intervene. In July 1972, Sadat boldly expelled 15,000 Soviet advisors to prove Egyptian independence and secretly allied with Syrian President Hafez al-Assad to plan a coordinated, two-front surprise assault. Sadat recognized that prolonged military stalemate was economically unsustainable and strategically disastrous for Egyptian sovereignty.',
      ],
    },
    block2: {
      ref: '9.2',
      date: '6 October 1973',
      title: 'Operation Badr: The Holy Day Surprise Assault',
      paras: [
        "At 2:00 PM on Saturday, 6 October 1973, Egyptian and Syrian forces launched Operation Badr. The date was chosen with lethal genius: it was Yom Kippur (the Day of Atonement), the holiest day in the Jewish calendar, when Israel's radio stations were silent, roads empty, and the army operating at skeleton strength. Simultaneously, it was the Islamic holy month of Ramadan. In Sinai, Egyptian infantry crossed the Suez Canal on inflatable dinghies, using high-pressure water hoses to blast massive breaches through the Israeli sand ramparts within hours.",
        'Egyptian sappers constructed ten pontoon bridges, pouring 100,000 troops and 1,000 tanks into Sinai under a dense umbrella of Soviet-supplied SAM-6 anti-aircraft missiles and portable wire-guided anti-tank missiles (Saggers). In the north, 1,400 Syrian tanks stormed across the 1967 ceasefire line onto the Golan Heights, overwhelming the badly outnumbered Israeli garrison. Israel was caught in total intelligence failure—the "Mehdal" (The Blunder)—where military intelligence chief Eli Zeira had arrogantly dismissed Egyptian war preparations as routine training maneuvers. The audacious water-cannon assault shattered Israel’s formidable sand ramparts, achieving complete surprise along the entire length of the canal.',
      ],
    },
    block3: {
      ref: '9.3',
      date: '7–15 October 1973',
      title: 'The Valley of Tears & Sharon’s Counter-Crossing',
      paras: [
        'For the first forty-eight hours, the survival of Israel hung in the balance. On the Golan Heights, a handful of Israeli Centurion tanks under commanders Avigdor Kahalani held the "Valley of Tears" against relentless waves of Syrian T-62 tanks until emergency reserve brigades arrived to drive the Syrians back. In Sinai, desperate Israeli armored counter-attacks were decimated by Egyptian infantry firing Sagger missiles. Prime Minister Golda Meir and Defense Minister Moshe Dayan were plunged into despair, with Dayan warning that "the Third Temple is falling."',
        'On the southern front along the Suez Canal, General Ariel Sharon spearheaded a daring counter-crossing on 15 October. Exploiting a seam between the Egyptian Second and Third Armies at Deversoir, Israeli engineers constructed a pontoon bridge across the canal under murderous artillery fire. Sharon’s armored division crossed into the Egyptian mainland, fanning out behind Egyptian lines to systematically destroy surface-to-air missile batteries and sever the Cairo-Suez highway. By 22 October, the IDF had completely encircled the entire 30,000-strong Egyptian Third Army in Sinai, threatening its total destruction and compelling urgent superpower ceasefire negotiations.',
      ],
    },
    block4: {
      ref: '9.4',
      date: 'Oct 1973–1974',
      title: 'The OPEC Oil Weapon, The Nuclear Alert & A New Diplomatic Order',
      paras: [
        'As Soviet leader Leonid Brezhnev threatened to deploy Soviet airborne divisions to rescue the encircled Egyptian Third Army, President Nixon placed US nuclear forces on DEFCON 3 worldwide, bringing the superpowers to the edge of direct nuclear confrontation. Simultaneously, the Arab members of OPEC (Organization of the Petroleum Exporting Countries), led by King Faisal of Saudi Arabia, deployed the "oil weapon." They declared a total oil embargo against the United States and the Netherlands and slashed production, causing global crude oil prices to quadruple from $3 to $12 a barrel. The embargo sent Western economies into deep stagflation, proving that the Arab world wielded formidable economic leverage.',
        'When a UN ceasefire took effect on 25 October, 2,600 Israeli and 15,000 Arab soldiers were dead. While Israel had achieved military victory, the myth of Israeli invincibility was permanently broken. An official Israeli judicial commission (the Agranat Commission) placed blame on military intelligence, forcing the resignations of Prime Minister Golda Meir and Chief of Staff David Elazar. Conversely, having restored Arab honor and proven they could strike Israel, President Sadat was now positioned to negotiate as an equal, laying the groundwork for US Secretary of State Henry Kissinger\'s "shuttle diplomacy."',
      ],
    },
    ktCode: 'KT 2.5',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    ktGroupTitle: 'The Escalating Conflict',
  },
  {
    num: 10,
    title: 'Diplomatic Breakthroughs: From Shuttle Diplomacy to Camp David',
    versoSubtitle: "Part I: Kissinger's Disengagement, The 1977 Likud Shock & Sadat in Jerusalem",
    rectoSubtitle: 'Part II: The 13 Days at Camp David & The 1979 Washington Treaty',
    rectoAnchor:
      'The Camp David Accords removed the Arab world’s strongest military power from the conflict, exchanging the Sinai Peninsula for lasting Egyptian-Israeli peace.',
    enquiry:
      'How did Anwar Sadat and Menachem Begin overcome thirty years of hostility to sign the Camp David Accords?',
    block1: {
      ref: '10.1',
      date: '1974–1975',
      title: 'Kissinger’s "Shuttle Diplomacy" & The Disengagement Agreements',
      paras: [
        'In the aftermath of the 1973 war, US Secretary of State Henry Kissinger pioneered a brand-new style of international mediation: "shuttle diplomacy." Flying relentlessly between Cairo, Jerusalem, and Damascus aboard his Boeing 707, Kissinger brokered incremental step-by-step military disengagement agreements. In January 1974 (Sinai I) and September 1975 (Sinai II), Israel withdrew its forces from the Suez Canal bank and returned the Abu Rudeis oil fields in exchange for Egyptian pledges of non-belligerency and the reopening of the canal to commercial shipping in June 1975.',
        'Between January 1974 and September 1975, Kissinger embarked on his famous "shuttle diplomacy," flying relentlessly between Middle Eastern capitals aboard his Boeing 707. His diplomatic marathon produced the Sinai I and Sinai II disengagement agreements, which separated Egyptian and Israeli armies, established UN buffer zones, and returned vital Sinai oil fields to Egypt. Crucially, in June 1975, President Sadat reopened the Suez Canal to international maritime traffic for the first time in eight years.',
      ],
    },
    block2: {
      ref: '10.2',
      date: 'May–Nov 1977',
      title: 'The Likud "Mahapakh" & Sadat\'s Historic Flight to Jerusalem',
      paras: [
        'In May 1977, Israeli politics underwent an earth-shattering revolution. For the first time in the state\'s 29-year history, the socialist Labor Party was ousted from power. Menachem Begin—the former underground commander of the Irgun and leader of the right-wing Likud bloc—became Prime Minister. Begin held an unyielding ideological conviction that the West Bank ("Judea and Samaria") was non-negotiable ancestral Jewish land. Yet Begin was also a disciplined legalist who was willing to consider territorial compromise in Sinai if it secured lasting security. Begin’s election signaled a hardening of Israel’s ideological posture toward territorial concession and Judea and Samaria.',
        'Realizing that conventional diplomacy was stalling, President Anwar Sadat decided on an electrifying gamble. On 9 November 1977, speaking to the Egyptian parliament, Sadat announced: "I am ready to go to the end of the world, and Israel will be astonished to hear me say that I am ready to go to their very home, to the Knesset itself." Ten days later, Sadat stepped out of an Egyptian airliner at Ben-Gurion Airport, greeted by Begin and a 21-gun salute. Addressing the Israeli Knesset, Sadat offered permanent peace based on justice. In December 1977, Prime Minister **Begin paid a historic reciprocal visit to Egypt**, meeting Sadat at the Ismailia Summit. Although bilateral talks stalled over the Palestinian issue, these direct visits broke three decades of psychological hostility, paving the way for American mediation.',
      ],
    },
    block3: {
      ref: '10.3',
      date: 'Sept 1978',
      title: 'Thirteen Days at Camp David: Carter, Sadat & Begin',
      paras: [
        'Despite the euphoria of Sadat’s visit, bilateral negotiations quickly deadlocked over Israeli settlements in Sinai and Palestinian self-determination. In September 1978, newly elected US President Jimmy Carter staged a high-stakes diplomatic intervention, inviting Sadat and Begin to the secluded presidential retreat at Camp David in Maryland. For thirteen agonizing days, Carter kept the two leaders isolated in the woods, acting as mediator, drafting twenty-three revisions, and personally pleading when negotiations threatened to collapse. President Carter personally shuttled between cabins in the Maryland woods to prevent direct personal shouting matches between Sadat and Begin.',
        'On 17 September 1978, the trio signed the historic Camp David Accords, establishing two distinct frameworks: Framework I laid out a pathway for full Israeli withdrawal from the Sinai Peninsula and the restoration of Egyptian sovereignty; Framework II outlined a vague, five-year transitional plan for Palestinian administrative autonomy in the West Bank and Gaza. Begin agreed to dismantle all eighteen Israeli settlements and airbases in Sinai, but adamantly refused to halt settlements in the West Bank or acknowledge Palestinian sovereignty. Carter’s relentless personal persistence saved the negotiations from collapse on multiple occasions, binding both nations to a historic compromise.',
      ],
    },
    block4: {
      ref: '10.4',
      date: '1979–1981',
      title: 'The 1979 Peace Treaty & The Assassination of Anwar Sadat',
      paras: [
        'On 26 March 1979, on the North Lawn of the White House, Anwar Sadat and Menachem Begin signed the historic Treaty of Peace between Egypt and Israel. The treaty ended thirty-one years of official warfare: Israel completed its withdrawal from Sinai in April 1982, returning the vital peninsula to Egypt, while Egypt established formal diplomatic ties, opened embassies, and guaranteed Israeli shipping through the Suez Canal and Straits of Tiran. The historic peace treaty neutralized the primary military threat against Israel from the south.',
        'The treaty ignited fury across the Arab world. The Arab League expelled Egypt, severed diplomatic ties, and moved its headquarters from Cairo to Tunis. Sadat was condemned as a traitor to the Palestinian cause. On 6 October 1981, while reviewing a military victory parade in Cairo celebrating the 1973 war, President Sadat was assassinated by radical Islamist army officers belonging to Egyptian Islamic Jihad, shouting: "I have killed Pharaoh!" He was succeeded by Vice President Hosni Mubarak, who preserved the "cold peace" with Israel while maintaining domestic stability. Despite the intense regional ostracism, the treaty eliminated the existential threat of a multi-front assault on Israel for generations.',
      ],
    },
    ktCode: 'KT 3.1',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    ktGroupTitle: 'Attempts at a Solution',
  },
  {
    num: 11,
    title: 'The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada',
    versoSubtitle: 'Part I: Operation Peace for Galilee & The Siege of Beirut',
    rectoSubtitle: 'Part II: The Sabra & Shatila Massacre & The First Intifada',
    rectoAnchor:
      'The quagmire of the Lebanon War and the spontaneous grassroots stones of the First Intifada fundamentally broke Israel’s post-1967 status quo.',
    enquiry:
      'How did the 1982 invasion of Lebanon and the First Intifada reassert the Palestinian struggle on the global stage?',
    block1: {
      ref: '11.1',
      date: '1975–1982',
      title: 'The Lebanese Powder Keg & Operation Peace for Galilee',
      paras: [
        'Following their expulsion from Jordan in 1970, the PLO established southern Lebanon as their military base ("Fatahland"), embedding artillery and Katyusha rocket batteries in Palestinian refugee camps outside Tyre, Sidon, and Beirut. Lebanon was already consumed by a brutal multi-sectarian civil war between Christian Maronite militias, Sunni and Shiite Muslims, and Druze fighters. Cross-border fedayeen raids into northern Israel provoked frequent IDF bombardments, leaving Israeli border towns like Kiryat Shmona in constant panic.',
        'In June 1982, after the anti-Arafat Abu Nidal faction attempted to assassinate Shlomo Argov, the Israeli ambassador to London, Defense Minister Ariel Sharon launched Operation Peace for Galilee. Sharon claimed the operation would be a limited 48-hour incursion pushing 40 kilometres into Lebanon to place Israeli towns beyond rocket range. Instead, Sharon drove the IDF all the way to the Lebanese capital of Beirut, linking up with Christian Phalangist allies commanded by Bashir Gemayel and trapping 15,000 PLO fighters in West Beirut under a brutal two-month naval and artillery siege. The expanding military operation alienated international allies and deepened bitter domestic political divisions within Israeli society. The siege inflicted severe civilian casualties across the Lebanese capital.',
      ],
    },
    block2: {
      ref: '11.2',
      date: 'Aug–Sept 1982',
      title: 'The PLO Evacuation & The Sabra and Shatila Massacre',
      paras: [
        'In August 1982, US special envoy Philip Habib negotiated an internationally monitored ceasefire: Yasser Arafat and 14,000 PLO fighters agreed to evacuate Beirut by sea, dispersing their leadership to Tunisia, leaving Palestinian refugee families defenseless under Western security guarantees. The crisis turned into a bloodbath on 14 September when President-elect Bashir Gemayel was assassinated in a massive bomb blast. In response, Israeli troops occupied West Beirut, and Defense Minister Sharon authorized Christian Phalangist militia units to enter the Sabra and Shatila refugee camps to "clear out remaining terrorists."',
        'Between 16 and 18 September 1982, while the IDF encircled the camps and fired illumination flares into the night sky, Phalangist militiamen slaughtered an estimated 800 to 2,000 unarmed Palestinian men, women, and children. The massacre sparked international outrage and massive domestic demonstrations inside Israel, where 400,000 citizens marched in Tel Aviv. The Kahan Commission of Inquiry concluded that while Phalangists committed the slaughter, Defense Minister Sharon bore "personal responsibility" for negligence, forcing his resignation, and devastating Prime Minister Menachem Begin, who resigned in despair in 1983.',
      ],
    },
    block3: {
      ref: '11.3',
      date: 'Dec 1987',
      title: 'The Outbreak of the First Palestinian Intifada',
      paras: [
        'By 1987, twenty years of Israeli military occupation had bred intolerable frustration across the West Bank and Gaza. On 8 December 1987, an Israeli army tank transporter collided with civilian cars at the Erez checkpoint in Gaza, killing four Palestinian workers. Rumors spread that the crash was deliberate retaliation for the stabbing of an Israeli merchant. Spontaneous protests erupted at the Jabalia refugee camp, spreading like wildfire across Gaza and the West Bank, igniting the First Intifada (the "shaking off"). Palestinian commercial strikes completely shuttered economic life across East Jerusalem.',
        'Unlike previous conflicts led by foreign guerrilla fighters, the Intifada was a spontaneous, grassroots civil rebellion led by ordinary Palestinian youth, known as the "children of the stones." Coordinated by the clandestine Unified National Leadership of the Uprising (UNLU), Palestinians staged mass strikes, tax revolts, boycotts of Israeli goods, and burned tires. Daily images of teenage boys armed only with slingshots and stones facing heavily armed IDF soldiers and Merkava tanks shattered Israel\'s international moral standing. The decentralized nature of the civil uprising rendered conventional Israeli military superiority ineffective against widespread popular rebellion.',
      ],
    },
    block4: {
      ref: '11.4',
      date: '1988–1989',
      title: 'Rabin’s "Iron Fist," The Rise of Hamas & The Geneva Declaration',
      paras: [
        'Defense Minister Yitzhak Rabin instituted an aggressive "Iron Fist" policy to crush the uprising, instructing troops to use "might, power, and beatings" to break the bones of stone throwers. Over 1,000 Palestinians were killed, thousands imprisoned, and scores of family homes demolished, but the rebellion refused to die. The crisis also birthed a new, religious-nationalist rival to the secular PLO: in December 1987, Sheikh Ahmed Yassin founded Hamas (the Islamic Resistance Movement), declaring in its 1988 charter that Palestine was an indivisible Islamic waqf that could never be ceded to non-Muslims. This altered the political dynamics.',
        "Sensing that political leadership was shifting away from exiled leaders in Tunis to the grassroots inside the territories, Yasser Arafat executed a seismic diplomatic pivot. In November 1988 in Algiers, the Palestine National Council declared an independent State of Palestine, implicitly accepting the 1947 partition. In December 1988, speaking to a special session of the UN General Assembly in Geneva, Arafat announced the **renunciation of terrorism** in all its forms, recognized Israel's right to exist in peace and security, and accepted UN Resolutions 242 and 338. This historic concession satisfied Washington's conditions, prompting the US to open formal diplomatic dialogue with the PLO, laying the diplomatic foundation for the 1990s peace process.",
      ],
    },
    ktCode: 'KT 3.2',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    ktGroupTitle: 'Attempts at a Solution',
  },
  {
    num: 12,
    title: "Attempts at a Solution: From Oslo to Rabin's Assassination",
    versoSubtitle: 'Part I: Madrid 1991, The Secret Oslo Channel & The 1993 Handshake',
    rectoSubtitle: 'Part II: Oslo II Partition, Extremist Backlash & The Murder of Rabin',
    rectoAnchor:
      'Secret diplomacy at Oslo achieved unprecedented mutual recognition before collapsing under the weight of extremist violence, settlement growth, and assassination.',
    enquiry:
      'How close did the Oslo Accords come to achieving peace, and why did the peace process unravel by 1995?',
    block1: {
      ref: '12.1',
      date: '1990–1992',
      title: 'Changing Superpower Policies: End of the Cold War, Gulf War & Madrid',
      paras: [
        'Between 1989 and 1991, the international architecture of the Middle East was revolutionized by the **end of the Cold War**. The collapse of the Soviet Union eliminated the Arab world’s primary superpower patron and brought over one million Russian Jewish immigrants to Israel. In 1990, Iraqi dictator Saddam Hussein invaded Kuwait; Yasser Arafat critically supported Saddam, prompting Gulf states to expel 300,000 Palestinians and terminate PLO subsidies. Bankrupt and diplomatically isolated, the PLO was powerless. Following the **US victory in the 1991 Gulf War**—during which 39 Iraqi Scud missiles struck Tel Aviv—President George H.W. Bush and James Baker leveraged unprecedented American dominance to convene the October 1991 Madrid Peace Conference, compelling Israeli and Arab delegations to sit at the same table.',
        'When the formal Washington bilateral talks stalled, a breakthrough occurred in secret. In 1992, the Israeli Labor Party under Yitzhak Rabin and Shimon Peres won the general election on a peace platform. In January 1993, Norwegian academics Terje Rød-Larsen and Mona Juul organized clandestine meetings in a secluded lodge outside Oslo between Israeli academics and senior PLO official Ahmed Qurei. Away from media pressure, the secret Oslo channel bypassed official red lines, forging a historic framework of mutual recognition and interim self-government.',
      ],
    },
    block2: {
      ref: '12.2',
      date: 'Sept 1993',
      title: 'The Declaration of Principles & The White House Lawn Handshake',
      paras: [
        'On 9 September 1993, Yitzhak Rabin and Yasser Arafat exchanged letters of mutual recognition: Arafat recognized "the right of the State of Israel to exist in peace and security" and renounced terrorism; Rabin recognized the PLO as "the representative of the Palestinian people." Four days later, on 13 September 1993, 3,000 dignitaries assembled on the South Lawn of the White House. Under the beaming gaze of President Bill Clinton, Prime Minister Rabin and Chairman Arafat signed the Declaration of Principles on Interim Self-Government Arrangements (the Oslo I Accord) and sealed it with an iconic, reluctant handshake.',
        'Oslo I did not create a Palestinian state, nor did it resolve the explosive "permanent status" issues: the future of Jerusalem, borders, Israeli settlements, or the right of return for refugees. Instead, it established a five-year transitional timetable: the IDF would withdraw from the Gaza Strip and the West Bank town of Jericho ("Gaza-Jericho First"), handing local administrative and policing powers to a newly created Palestinian National Authority (PNA). In July 1994, Arafat returned from 27 years of exile to triumphant crowds in Gaza to assume the presidency of the PNA.',
      ],
    },
    block3: {
      ref: '12.3',
      date: '1994–1995',
      title: 'The 1994 Jordan Peace Treaty & The Oslo II Accord (1995)',
      paras: [
        "The momentum generated by Oslo enabled a second historic regional breakthrough. In October 1994, King Hussein of Jordan and Prime Minister Rabin signed the Israel-Jordan Peace Treaty at the desert border crossing in the Arava, resolving boundary disputes, water-sharing quotas on the Yarmouk River, and formalising Jordan's special role as custodian of Muslim holy shrines in Jerusalem.",
        'In September 1995, Rabin and Arafat signed the Interim Agreement on the West Bank and the Gaza Strip (Oslo II) in Washington. Oslo II partitioned the West Bank into three distinct administrative zones: Area A (3% of territory, including seven major Palestinian cities) under full Palestinian civil and security control; Area B (27% of territory, covering 440 Arab villages) under Palestinian civil control with joint Israeli military security; and Area C (70% of territory, containing all 140 Israeli settlements, military bases, and open countryside) under exclusive Israeli military and civil administration. Palestinians condemned this mosaic as a fragmented archipelago of "Bantustans," while Israeli right-wingers accused Rabin of treason for surrendering ancestral land.',
      ],
    },
    block4: {
      ref: '12.4',
      date: '1994–1995',
      title: 'Extremist Backlash, Suicide Bombings & The Assassination of Rabin',
      paras: [
        "Extremists on both sides moved ruthlessly to sabotage the peace process. In February 1994, Baruch Goldstein, a radical American-Israeli settler and member of the outlawed Kach movement, opened fire inside the Cave of the Patriarchs mosque in Hebron, massacring 29 Palestinian worshippers during Ramadan before being beaten to death. Hamas and Palestinian Islamic Jihad retaliated by unleashing a deadly wave of suicide bus bombings in Afula, Hadera, and central Tel Aviv, killing scores of Israeli civilians and shattering the Israeli public's sense of security.",
        'Inside Israel, right-wing religious nationalists and Likud opposition leaders demonized Prime Minister Rabin as a traitor and murderer. At mass opposition rallies, demonstrators displayed placards showing Rabin in a Nazi SS uniform. On the evening of 4 November 1995, after addressing a massive rally of 100,000 citizens singing "Shir LaShalom" (Song for Peace) in Kings of Israel Square in Tel Aviv, Rabin walked to his car. Yigal Amir, a 25-year-old radical Orthodox law student, stepped from the shadows and shot Rabin twice in the back. Rabin died on the operating table, and with his death, the spirit of mutual compromise perished. The Oslo peace process ground to a halt, leaving Israelis and Palestinians locked in unresolved, bitter struggle. The historic opportunity for immediate reconciliation was extinguished.',
      ],
    },
    ktCode: 'KT 3.3',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    ktGroupTitle: 'Attempts at a Solution',
  },
];

const QUIZ_QUESTIONS = {
  card1: [
    'Which collapsing empire ruled Mandatory Palestine for 400 years until World War One?',
    'What secret 1916 agreement between Britain and France divided the Middle East with straight lines?',
    'Which British Foreign Secretary authored the 1917 declaration promising a Jewish national home?',
    'What 1939 British policy paper restricted Jewish immigration to 75,000 over five years?',
    'What was the name of the Zionist defense force that organized clandestine Aliyah Bet immigration?',
    'Which Jerusalem hotel was bombed by the Irgun on 22 July 1946, killing 91 people?',
    'What UN Resolution passed on 29 November 1947 to partition Palestine into Arab and Jewish states?',
    'On what date did David Ben-Gurion proclaim the establishment of the State of Israel?',
    'Which European nation supplied fighter aircraft and weapons to Israel during the 1948 truce?',
    'What term describes the 1949 armistice ceasefire boundaries established on the island of Rhodes?',
  ],
  card2: [
    "What Arabic term, meaning 'The Catastrophe', describes the mass displacement of 700,000 Palestinians?",
    'What UN agency was established in December 1949 to provide relief and shelter to Palestinian refugees?',
    'What 1950 Israeli law granted every Jewish person worldwide the right to settle in Israel?',
    'What term described the temporary transit camps where incoming Jewish immigrants were housed?',
    'What was the name of the elite commando unit formed in 1953 under Ariel Sharon to conduct reprisal raids?',
    'Who became President of Egypt in 1954, championing the political ideology of Pan-Arab nationalism?',
    'Which Communist-bloc country signed a major arms deal with Nasser in September 1955?',
    'What vital maritime waterway did Nasser nationalise on 26 July 1956, triggering the Suez Crisis?',
    'What was the name of the secret French villa where Britain, France, and Israel plotted the 1956 invasion?',
    'Which US President threatened financial collapse to force Britain and France to withdraw from Suez?',
  ],
  card3: [
    "What was the name of Israel's national pipeline system completed in 1964 to pump water to the Negev?",
    'Which umbrella organization was founded at the 1964 Cairo Conference to represent the Palestinian people?',
    'Which Palestinian nationalist guerrilla group was founded by Yasser Arafat to wage armed struggle?',
    'Which elevated volcanic plateau did Syrian artillery use to bombard Israeli farms in the Hula Valley?',
    'In which West Bank town did Israeli forces destroy 125 buildings during a major November 1966 raid?',
    'How many Syrian MiG-21 fighter jets did the Israeli Air Force shoot down on 7 April 1967?',
    'What narrow waterway at the mouth of the Gulf of Aqaba did Nasser blockade in May 1967?',
    'What was the Hebrew codename for the surprise dawn airstrike launched by Israel on 5 June 1967?',
    'How many Egyptian combat aircraft did Israel destroy on the ground in the first three hours of the war?',
    'On what historic date did Israeli paratroopers capture the Old City of Jerusalem and the Western Wall?',
  ],
  card4: [
    'Which four territories did Israel conquer during the six days of combat in June 1967?',
    "What Sudanese city hosted the September 1967 Arab summit that declared the 'Three Noes'?",
    "What landmark UN Resolution passed in November 1967 established the 'Land for Peace' benchmark?",
    'What strategic plan proposed annexing the Jordan Valley while returning populated Arab highlands?',
    'What was the name of the first Israeli civilian settlement re-established in the West Bank in 1967?',
    'Which March 1968 battle in Jordan was celebrated as a moral victory for Fatah and the PLO?',
    'At which Jordanian desert airstrip did the PFLP blow up three hijacked Western airliners in 1970?',
    "What name was given to King Hussein's September 1970 military crackdown that expelled the PLO to Lebanon?",
    'How many Israeli athletes and coaches were murdered by Black September at the 1972 Munich Olympics?',
    'What phrase did Yasser Arafat use when addressing the UN General Assembly in New York in 1974?',
  ],
  card5: [
    'What was the name of the fortified 150-kilometre sand rampart built by Israel along the Suez Canal?',
    'Who succeeded Gamal Abdel Nasser as President of Egypt following his death in September 1970?',
    'On which Jewish holy day did Egyptian and Syrian forces launch their surprise assault in October 1973?',
    'What Soviet-supplied portable anti-tank wire-guided missile inflicted devastating losses on Israeli armor?',
    'In which mountain battle on the Golan Heights did Israeli Centurion tanks hold against 1,400 Syrian tanks?',
    'What was the codename of the massive US military emergency airlift ordered by President Nixon to Israel?',
    'Which Israeli general led the counter-crossing of the Suez Canal to encircle the Egyptian Third Army?',
    'What international oil cartel declared a total oil embargo in October 1973, quadrupling world oil prices?',
    "Which US Secretary of State pioneered 'shuttle diplomacy' flying between Middle Eastern capitals in 1974?",
    'At which US presidential retreat did Jimmy Carter broker peace between Anwar Sadat and Menachem Begin?',
  ],
  card6: [
    'In what year did Israel and Egypt sign the historic Treaty of Peace on the White House lawn?',
    'In what year was Egyptian President Anwar Sadat assassinated by Islamic Jihad army officers in Cairo?',
    "What was the codename of Israel's full-scale military invasion of Lebanon launched in June 1982?",
    'Which two Palestinian refugee camps in Beirut were the scene of a brutal massacre by Phalangist militias?',
    "What Arabic term meaning 'shaking off' describes the spontaneous grassroots uprising that erupted in 1987?",
    'Which Islamic resistance movement was founded in Gaza in December 1987 by Sheikh Ahmed Yassin?',
    'In which Spanish city did the historic October 1991 international Middle East peace conference take place?',
    'Which Scandinavian capital hosted the secret backchannel negotiations that produced the 1993 accords?',
    'Which Arab kingdom signed a historic bilateral peace treaty with Israel in October 1994?',
    'On what date was Israeli Prime Minister Yitzhak Rabin assassinated by an extremist in Tel Aviv?',
  ],
};

module.exports = {
  COVER_CONFIG,
  MILESTONE_SPINE,
  THEATER_MAP_CONFIG,
  ENQUIRIES,
  QUIZ_QUESTIONS,
};
