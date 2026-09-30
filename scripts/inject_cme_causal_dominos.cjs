const fs = require('fs');
const path = require('path');

const dominosByLessonId = {
  lesson_1: {
    title: 'Origins of the Conflict: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1915–1916',
        title: 'The McMahon-Hussein Correspondence',
        actor: 'Britain & Arab Leadership',
        tag: 'The Wartime Pledge',
        trigger:
          'British High Commissioner McMahon exchanges letters with Sherif Hussein of Mecca, promising British support for an independent post-war Arab state.',
        because:
          'Britain desperately needed Arab tribal forces to launch a desert guerrilla revolt to tie down Ottoman divisions and protect the Suez Canal.',
        therefore:
          'Arab forces mobilized under the belief they were fighting for national independence, but Britain withheld geographical specifics regarding Palestine.',
        connective:
          'However, while negotiating with Arab leaders, Britain and France held secret imperial talks...',
        exam_link:
          'Q1 Consequence: Established the fundamental Arab grievance of imperial betrayal that fueled future resistance.',
      },
      {
        step: 2,
        date: 'May 1916',
        title: 'The Secret Sykes-Picot Agreement',
        actor: 'Britain & France',
        tag: 'Imperial Collusion',
        trigger:
          'Diplomats Mark Sykes and François Georges-Picot secretly negotiate the partition of Ottoman Arab lands into direct British and French spheres of influence.',
        because:
          'European imperial powers sought strategic dominance over oil routes, Mediterranean naval ports, and the overland transit corridor to British India.',
        therefore:
          'Directly contradicted promises made to Hussein; exposed to the world by Bolsheviks in 1917, deeply radicalising Arab distrust.',
        connective:
          'To compound Arab betrayal, British wartime diplomacy produced an additional contradictory commitment...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Contrasted wartime promises of Arab independence with secret colonial division.',
      },
      {
        step: 3,
        date: 'November 1917',
        title: 'The Balfour Declaration',
        actor: 'Britain & World Zionist Movement',
        tag: 'The Dual Obligation',
        trigger:
          'Foreign Secretary Arthur Balfour writes an official letter pledging British support for "the establishment in Palestine of a national home for the Jewish people".',
        because:
          'The Lloyd George cabinet sought to rally worldwide Jewish support (particularly in the US and revolutionary Russia) for the Allied war effort.',
        therefore:
          'Created an irreconcilable imperial dilemma: pledging a Jewish national home while promising not to prejudice civil/religious rights of existing Arab inhabitants.',
        connective:
          'Following Ottoman defeat, the newly formed League of Nations formalized these imperial pledges...',
        exam_link:
          'Q3 Importance: Provided legal international legitimacy for the Zionist movement while marginalising Palestinian Arabs.',
      },
      {
        step: 4,
        date: '1920–1936',
        title: 'The British Mandate & Rising Aliyah Influx',
        actor: 'British Administration & Jewish Immigrants',
        tag: 'Demographic Transformation',
        trigger:
          'Britain governs Palestine under League of Nations mandate; Jewish immigration (Aliyah) swells the Jewish population from 11% to nearly 30% by 1936.',
        because:
          'Zionist pioneers fled rising anti-Semitism and Nazi persecution in Europe, purchasing fertile agricultural land through the Jewish National Fund.',
        therefore:
          'Palestinian Arab tenant farmers (fellahin) were evicted from ancestral lands, sparking severe economic anxiety and violent inter-communal clashes.',
        connective:
          'Mounting economic desperation and lack of democratic representation boiled over into open rebellion...',
        exam_link:
          'Q1 Consequence: Dramatic demographic and economic shift that made violent communal conflict inevitable.',
      },
      {
        step: 5,
        date: '1936–1939',
        title: 'The Arab Revolt & The 1939 White Paper',
        actor: 'Palestinian Arabs & British Forces',
        tag: 'The Imperial Uprising',
        trigger:
          'Palestinian Arabs launch a 3-year armed revolt and general strike; Britain crushes the revolt with 20,000 troops, but subsequently issues the 1939 White Paper.',
        because:
          'Faced with impending war against Nazi Germany, Britain could not risk Arab oil embargoes or regional rebellion and sought to appease Arab states.',
        therefore:
          'The White Paper strictly capped Jewish immigration to 75,000 over five years just as the Holocaust began, alienating both Jews and Arabs and turning Britain into the enemy of both.',
        connective: null,
        exam_link:
          'Q1 Consequence & Q2 Narrative: Left Palestinian Arabs militarily disarmed while driving Jewish militants into armed anti-British insurgency.',
      },
    ],
  },

  lesson_2: {
    title: 'End of the British Mandate: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1945–1946',
        title: 'Holocaust Survivors & The Jewish Insurgency',
        actor: 'Zionist Militants & British Forces',
        tag: 'The Post-War Crisis',
        trigger:
          'Zionist paramilitaries (Haganah, Irgun, Lehi) launch coordinated attacks against British railways, radar stations, and police posts; Britain blockades refugee ships.',
        because:
          '250,000 Jewish Holocaust survivors languished in European DP camps, while Britain maintained strict 1939 White Paper immigration quotas.',
        therefore:
          'Forced Britain to deploy 100,000 troops and impose martial law in Palestine, exhausting British finances and public patience.',
        connective:
          'In direct retaliation for British mass arrests and weapons raids on Black Saturday...',
        exam_link:
          'Q1 Consequence: Turned British domestic opinion against maintaining the costly mandate.',
      },
      {
        step: 2,
        date: '22 July 1946',
        title: 'The King David Hotel Bombing',
        actor: 'Irgun (Menachem Begin)',
        tag: 'The Decisive Strike',
        trigger:
          'Irgun militants disguise themselves as milkmen and detonate 350kg of explosives in the basement of the British Secretariat and Military Headquarters, killing 91.',
        because:
          'The Irgun sought to destroy incriminating intelligence documents seized during Operation Agatha and prove Britain could not maintain order.',
        therefore:
          'Humiliated the British administration, prompted anti-Semitic riots in UK cities, and convinced PM Clement Attlee that Palestine was militarily ungovernable.',
        connective:
          'Facing bankruptcy, domestic war-weariness, and international condemnation over the SS Exodus...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Direct trigger that broke British political resolve to stay in Palestine.',
      },
      {
        step: 3,
        date: 'February 1947',
        title: 'Britain Refers Palestine to the United Nations',
        actor: 'British Cabinet (Ernest Bevin)',
        tag: 'Imperial Abdication',
        trigger:
          'Foreign Secretary Ernest Bevin announces Britain will surrender the League of Nations mandate and hand the problem unconditionally to the United Nations.',
        because:
          'Palestine was costing £40 million annually during extreme domestic post-war rationing, and diplomatic plans (Bevin Plan) were rejected by both sides.',
        therefore:
          'Transferred full responsibility to the UN, which established the 11-nation Special Committee on Palestine (UNSCOP) to conduct a fact-finding mission.',
        connective:
          'Following extensive investigations and visits to European refugee camps, UNSCOP published its verdict...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Shifted the conflict from a British colonial problem into an international crisis.',
      },
      {
        step: 4,
        date: '29 November 1947',
        title: 'UN Resolution 181 Partition Plan',
        actor: 'United Nations General Assembly',
        tag: 'The International Partition',
        trigger:
          'The UN General Assembly passes Resolution 181 by 33 votes to 13, partitioning Palestine into an Arab state (43%) and a Jewish state (56%), with Jerusalem internationalised.',
        because:
          'Intense global sympathy for Holocaust survivors and decisive diplomatic lobbying by US President Harry Truman secured the necessary two-thirds majority.',
        therefore:
          'The Jewish Agency accepted the plan as legal recognition of statehood; the Arab Higher Committee rejected it as an illegitimate theft of Arab land, sparking immediate civil war.',
        connective:
          'As British forces began their final staged withdrawal, inter-communal fighting turned into total war...',
        exam_link:
          'Q3 Importance: Provided legal international authority for David Ben-Gurion to declare Israeli independence.',
      },
      {
        step: 5,
        date: '14–15 May 1948',
        title: 'Declaration of Israel & Pan-Arab Invasion',
        actor: 'David Ben-Gurion & Five Arab States',
        tag: 'The Birth & The Onslaught',
        trigger:
          'David Ben-Gurion proclaims the independent State of Israel at 4:00 PM on 14 May; at midnight the British Mandate ends, and armies from Egypt, Jordan, Syria, Iraq, and Lebanon invade.',
        because:
          'The British evacuation left a total security vacuum, and Arab leaders had vowed to prevent partition and defend Palestinian sovereignty by force.',
        therefore:
          'Transformed an internal civil skirmish into the first full-scale regional Arab-Israeli interstate war (the 1948 War of Independence / Al-Nakba).',
        connective: null,
        exam_link:
          'Q1 Consequence & Q2 Narrative: The defining climax that established Israel as a sovereign military reality.',
      },
    ],
  },

  lesson_3: {
    title: 'The 1948 War & Refugee Crisis: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'June–July 1948',
        title: 'The First UN Truce & The Czech Arms Influx',
        actor: 'Israel, UN & Soviet Bloc',
        tag: 'The Tactical Turning Point',
        trigger:
          'A 4-week UN ceasefire halts active combat; Israel bypasses the UN arms embargo by importing 25,000 rifles, 5,000 machine guns, and 25 Avia fighter planes from Czechoslovakia.',
        because:
          'The newly formed IDF was initially outgunned by regular Arab artillery and armoured columns; Ben-Gurion utilized Soviet diplomatic support to rearm.',
        therefore:
          'Decisively shifted the military balance of power, allowing the reorganized IDF to launch sweeping offensives (Operation Dani & Yoav) when fighting resumed.',
        connective:
          'Armed with superior weapons and unified command, Israeli offensives swept through Arab population centres...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Turned the military tide of the 1948 war from defensive survival to decisive expansion.',
      },
      {
        step: 2,
        date: '1948–1949',
        title: 'The Palestinian Nakba (The Catastrophe)',
        actor: 'Palestinian Civilians & IDF',
        tag: 'Mass Dispossession',
        trigger:
          'Between 700,000 and 750,000 Palestinian Arabs are displaced from their towns and villages, fleeing into emergency refugee camps in Gaza, the West Bank, Lebanon, Syria, and Jordan.',
        because:
          'A combination of IDF military expulsions (Plan Dalet at Lydda and Ramle), psychological panic following the Deir Yassin massacre, and the collapse of Palestinian leadership.',
        therefore:
          'Created a permanent refugee population living under UNRWA care; Israel demolished abandoned villages and refused their return under UN Resolution 194.',
        connective:
          'With Arab armies routed and hundreds of thousands displaced, bilateral armistices were negotiated...',
        exam_link:
          'Q1 Consequence: Created the enduring core humanitarian and political grievance of the Middle East conflict.',
      },
      {
        step: 3,
        date: 'Jan–July 1949',
        title: 'The 1949 Armistice Agreements (The Green Line)',
        actor: 'Israel, Egypt, Jordan, Syria, Lebanon',
        tag: 'The New Map',
        trigger:
          'UN mediator Ralph Bunche brokers separate bilateral armistices on Rhodes; the temporary armistice demarcation lines become known as the "Green Line".',
        because:
          'Arab states suffered humiliating battlefield defeats; Israel held 78% of mandatory Palestine (a 22% increase over the 1947 UN Partition Plan).',
        therefore:
          'Jordan formally annexed the West Bank and East Jerusalem; Egypt occupied the Gaza Strip; no independent Palestinian state was established, and Arab states refused formal peace.',
        connective:
          'With borders temporarily secured behind armistice lines, Israel moved to consolidate its demographic survival...',
        exam_link:
          'Q3 Importance: Established the de facto geopolitical borders that governed the region until June 1967.',
      },
      {
        step: 4,
        date: 'July 1950',
        title: 'The Israeli Law of Return',
        actor: 'Knesset (David Ben-Gurion)',
        tag: 'Demographic Consolidation',
        trigger:
          'The Israeli Knesset enacts the Law of Return, guaranteeing every Jewish person worldwide the automatic right to immigrate to Israel and receive full citizenship.',
        because:
          'Ben-Gurion sought to build a permanent Jewish demographic majority and absorb 680,000 displaced European Holocaust survivors and Jewish refugees expelled from Arab nations.',
        therefore:
          'Doubled Israel’s population within four years, requiring massive US financial aid and German reparations to construct housing, while permanently closing borders to Arab return.',
        connective:
          'Separated from their ancestral lands by barbed wire and minefields, impoverished refugees organized cross-border resistance...',
        exam_link:
          'Q1 Consequence: Institutionalized the permanent demographic transformation of Palestine into a sovereign Jewish state.',
      },
      {
        step: 5,
        date: 'October 1953',
        title: 'Fedayeen Infiltration & The Qibya Massacre',
        actor: 'Palestinian Fedayeen & IDF Unit 101',
        tag: 'The Cycle of Reprisal',
        trigger:
          'Armed Palestinian guerrillas (Fedayeen) stage cross-border sabotage raids; Ariel Sharon’s commando Unit 101 retaliates by blowing up 45 houses in Qibya, killing 69 civilians.',
        because:
          'Prime Minister Ben-Gurion established a doctrine of disproportionate military retaliation to force Arab host governments to police their borders.',
        therefore:
          'Provoked fierce international condemnation from the UN and US, hardened Arab hatred, and set off the military escalation that led directly to the 1955 Gaza Raid and 1956 Suez Crisis.',
        connective: null,
        exam_link:
          'Q1 Consequence & Q2 Narrative: Established the escalatory reprisal dynamic that dragged Egypt into the Suez Crisis.',
      },
    ],
  },

  lesson_6: {
    title: 'Road to the Six Day War: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'January 1964',
        title: 'The 1964 Cairo Conference & PLO Founding',
        actor: 'Arab League & President Nasser',
        tag: 'Institutionalised Resistance',
        trigger:
          'Nasser convenes Arab heads of state in Cairo to create the Palestine Liberation Organisation (PLO) under Ahmad Shukeiri and coordinate unified Arab defense.',
        because:
          'Arab regimes sought to institutionalize and control rising Palestinian guerrilla nationalism while opposing Israeli water diversion projects.',
        therefore:
          'Re-established Palestinian identity on the global stage; Yasser Arafat’s radical Fatah faction began guerrilla sabotage raids independent of Arab state control.',
        connective:
          'Alongside political mobilization, Arab leaders targeted Israel’s most vital natural lifeline...',
        exam_link:
          'Q1 Consequence: Transformed Palestinian resistance from scattered refugees into an organized political movement.',
      },
      {
        step: 2,
        date: '1964–1965',
        title: 'The War Over the River Jordan Waterways',
        actor: 'Israel, Syria & Jordan',
        tag: 'The Resource Battle',
        trigger:
          'Arab states begin building heavy engineering canals to divert headwaters of the River Jordan (Hasbani and Banias); Israeli tanks and aircraft shell Syrian construction sites.',
        because:
          'Israel completed its National Water Carrier to irrigate the Negev desert; Arab states resolved to cut Israel’s freshwater supply by 35%.',
        therefore:
          'Israel proved it would use pre-emptive military force to protect essential resources, escalating border tensions into routine artillery duels.',
        connective:
          'Unable to defeat Israel conventionally, Syria’s military leadership turned to sponsorship of guerrilla proxies...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Escalated political rhetoric into hot armed border clashes.',
      },
      {
        step: 3,
        date: 'February 1966',
        title: 'The Radical Syrian Coup & Fatah Sponsorship',
        actor: 'Ba’athist Syrian Junta & Fatah',
        tag: 'Revolutionary Escalation',
        trigger:
          'Hardline radical officers seize power in Damascus, declaring a "People’s War of Liberation" and directly providing funds, arms, and bases for Fatah landmine raids.',
        because:
          'The new Syrian regime sought to assert radical revolutionary leadership in the Arab world and shame Nasser for relying on UN peacekeepers.',
        therefore:
          'Cross-border guerrilla attacks into northern Israel tripled, making the Syrian frontier the most volatile battleground in the region.',
        connective:
          'When an Israeli police patrol was blown up by a Syrian-trained landmine, Israel launched a massive retaliatory strike...',
        exam_link:
          'Q1 Consequence: Turned the Golan Heights border into an active combat zone that dragged Jordan and Egypt toward war.',
      },
      {
        step: 4,
        date: '13 November 1966',
        title: 'The Samu Raid in the West Bank',
        actor: 'IDF & Jordanian Armed Forces',
        tag: 'The Inter-Arab Fracture',
        trigger:
          '600 Israeli soldiers backed by 60 tanks and air support attack the Jordanian-controlled village of Samu, destroying 125 buildings and killing 15 Jordanian soldiers.',
        because:
          'Retaliation for a Fatah landmine that killed three Israeli border police; Israel struck Jordan because the infiltrators operated from the West Bank.',
        therefore:
          'Deeply embarrassed King Hussein of Jordan, who publicly accused Nasser of hiding behind UNEF peacekeepers instead of defending his Arab brother nations.',
        connective:
          'With King Hussein openly mocking Nasser’s courage, border tensions on the Syrian front exploded into open aerial combat...',
        exam_link:
          'Q2 Narrative (Link 3 → 4): Pressured Nasser into taking reckless gambles in 1967 to restore his Arab leadership.',
      },
      {
        step: 5,
        date: '7 April 1967',
        title: 'The Air Dogfight Over Damascus',
        actor: 'Israeli Air Force & Syrian Air Force',
        tag: 'The Military Catalyst',
        trigger:
          'Syrian artillery shells Israeli tractors farming in the demilitarized zone; Israeli Mirage jets respond aggressively, shooting down six Syrian MiG-21s and buzzing Damascus.',
        because:
          'Israel resolved to silence Syrian artillery on the Golan Heights and display absolute aerial dominance over Syrian airspace.',
        therefore:
          'Humiliated the Syrian military junta, leaving Damascus desperate for Egyptian intervention and prompting Moscow to intervene with fateful false intelligence in May 1967.',
        connective: null,
        exam_link:
          'Q1 Consequence & Q2 Narrative: The final military spark that triggered the Soviet false warning and the Six-Day War crisis.',
      },
    ],
  },

  lesson_7: {
    title: 'The 1967 Six Day War: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '13–15 May 1967',
        title: 'Soviet False Intelligence & Egyptian Mobilisation',
        actor: 'USSR & President Nasser',
        tag: 'The Fabricated Crisis',
        trigger:
          'The Soviet Union falsely informs Nasser that Israel has massed 10 armed brigades on the Syrian border; Nasser puts the Egyptian military on high alert and marches 100,000 troops into Sinai.',
        because:
          'Moscow sought to deter an Israeli strike against Syria, but UN observers on the ground confirmed there was zero Israeli troop concentration.',
        therefore:
          'Taunted by Jordan and Syria for hiding behind UN peacekeepers, Nasser felt compelled to take a dramatic military stand to restore his Arab leadership.',
        connective:
          'To demonstrate to the Arab street that he was ready for full-scale confrontation, Nasser took a fateful diplomatic step...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): The catalyst that transformed border friction into an uncontrollable regional crisis.',
      },
      {
        step: 2,
        date: '16–23 May 1967',
        title: 'UNEF Expulsion & Closing the Straits of Tiran',
        actor: 'Egypt & United Nations',
        tag: 'The Casus Belli',
        trigger:
          'Nasser orders the immediate withdrawal of UN Emergency Force (UNEF) peacekeepers from the Sinai border and closes the Straits of Tiran at Sharm el-Sheikh to Israeli ships.',
        because:
          'Nasser gambled that aggressive military posturing would win him a bloodless diplomatic triumph and force Israel to make political concessions.',
        therefore:
          'Choked off 90% of Israel’s vital petroleum imports through Eilat; Israel had explicitly warned since 1957 that closing the Straits would be treated as an act of war.',
        connective:
          'Caught in a wave of Arab nationalist euphoria, neighbouring monarchs rushed to join Nasser’s war coalition...',
        exam_link:
          'Q3 Importance: The closure of the Straits of Tiran provided Israel with the formal justification for a pre-emptive strike.',
      },
      {
        step: 3,
        date: '30 May 1967',
        title: 'The Jordan-Egypt Mutual Defence Treaty',
        actor: 'King Hussein & President Nasser',
        tag: 'The Encirclement',
        trigger:
          'King Hussein of Jordan flies to Cairo and signs a joint military defense pact, placing the Royal Jordanian Army under the direct command of an Egyptian general.',
        because:
          'Hussein feared an internal coup or revolution if he stood aside while Arab radio stations called for the holy liberation of Palestine.',
        therefore:
          'Completed the complete military encirclement of Israel on three fronts (Egypt, Jordan, Syria); panicked Israeli civilians and prompted the formation of a National Unity Cabinet with Moshe Dayan as Defence Minister.',
        connective:
          'Convinced that Arab armies were preparing an imminent invasion to destroy the Jewish state, Israel decided to strike first...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Convinced the Israeli cabinet that diplomatic solutions were exhausted and invasion was imminent.',
      },
      {
        step: 4,
        date: '5 June 1967 (7:45 AM)',
        title: 'The Pre-Emptive Air Strike (5 June 1967)',
        actor: 'Israeli Air Force (IAF)',
        tag: 'The Three-Hour Decision',
        trigger:
          'Nearly 200 Israeli fighter jets fly ultra-low over the Mediterranean to avoid radar, bombing runways and destroying 309 of Egypt’s 340 combat aircraft on the tarmac within three hours.',
        because:
          'Lacking strategic depth and facing a three-front encirclement, Israel could not survive a ground war without absolute command of the skies.',
        therefore:
          'Decided the outcome of the war on the first morning; subsequent strikes obliterated the Syrian and Jordanian air forces, leaving Arab ground armies defenseless.',
        connective:
          'With total air superiority secured, Israeli armoured divisions launched a lightning three-front blitzkrieg...',
        exam_link:
          'Q1 Consequence & Q2 Narrative: The decisive tactical turning point that guaranteed Israel’s complete military victory.',
      },
      {
        step: 5,
        date: '5–10 June 1967',
        title: 'The Lightning Conquests & UN Ceasefire',
        actor: 'IDF vs. Egypt, Jordan, Syria',
        tag: 'The Redrawn Map',
        trigger:
          'In six days of combat, Israel conquers the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria.',
        because:
          'Arab ground armies were decimated from the air and suffered from chaotic, uncoordinated command structures.',
        therefore:
          'Tripled Israel’s territorial size, brought over 1 million Palestinian Arabs under direct Israeli military occupation, and deeply shattered the prestige of Pan-Arab nationalism.',
        connective: null,
        exam_link:
          'Q1 Consequence: Transformed the geopolitical landscape and created the modern "Occupied Territories" conflict.',
      },
    ],
  },

  lesson_8: {
    title: 'The Conquered Territories & Resolution 242: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '7 June 1967',
        title: 'The Capture & Unification of East Jerusalem',
        actor: 'Israeli Paratroopers (Motta Gur)',
        tag: 'The Emotional Heart',
        trigger:
          'Israeli paratroopers breach the Lions’ Gate, storm the Old City, and secure the Western Wall; the Israeli Knesset immediately passes legislation annexing East Jerusalem.',
        because:
          'Jordan opened artillery fire on West Jerusalem on 5 June, giving Israel the tactical justification to capture the holy sites.',
        therefore:
          'Unified Jerusalem under sole Israeli civil law, prompting universal condemnation under UN Resolution 2253 and making the city the most sacred dispute in the conflict.',
        connective:
          'Stunned by their catastrophic battlefield collapse, Arab heads of state gathered in Sudan to formulate a response...',
        exam_link:
          'Q1 Consequence: Made Jerusalem an intractable religious and political flashpoint in all future peace talks.',
      },
      {
        step: 2,
        date: '1 September 1967',
        title: 'The Khartoum Summit & The "Three No’s"',
        actor: 'The Arab League',
        tag: 'The Rejectionist Stance',
        trigger:
          'Eight Arab heads of state adopt the Khartoum Resolution containing the famous "Three No’s": "No peace with Israel, no recognition of Israel, no negotiations with it".',
        because:
          'Defeated Arab leaders (Nasser, Hussein, Atassi) could not survive politically at home if they recognized the victorious Jewish state.',
        therefore:
          'Shattered Israeli hopes of immediately exchanging captured land for permanent peace treaties, entrenching diplomatic deadlock.',
        connective:
          'With direct negotiations blocked by the Khartoum declaration, the United Nations sought a diplomatic compromise...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Blocked direct bilateral negotiations and locked the Middle East in a diplomatic deep-freeze.',
      },
      {
        step: 3,
        date: '22 November 1967',
        title: 'UN Resolution 242: "Land for Peace"',
        actor: 'UN Security Council (Lord Caradon)',
        tag: 'The Diplomatic Foundation',
        trigger:
          'The UN Security Council unanimously passes Resolution 242, establishing the core principle of "Land for Peace": Israeli withdrawal in return for Arab recognition of its right to secure borders.',
        because:
          'Superpowers sought to prevent another regional war while resolving the humanitarian and territorial fallout of the 1967 conquests.',
        therefore:
          'Deliberate ambiguity in the English text ("withdrawal from territories" rather than "the territories") allowed Israel to argue it was not required to surrender all captured lands.',
        connective:
          'While diplomats argued over wording, the Israeli military moved to permanently fortify its new strategic frontiers...',
        exam_link:
          'Q3 Importance: The foundational legal framework for all subsequent Middle East peace negotiations (Camp David, Madrid, Oslo).',
      },
      {
        step: 4,
        date: '1968–1969',
        title: 'The Bar-Lev Line on the Suez Canal',
        actor: 'IDF (General Haim Bar-Lev)',
        tag: 'The Fortress Strategy',
        trigger:
          'Israel constructs a 20-metre-high sand embankment backed by 35 concrete fortresses and underground napalm pipes along the entire 160km eastern bank of the Suez Canal.',
        because:
          'The Sinai desert provided vast strategic depth to absorb any future Egyptian invasion and protect mainland Israel.',
        therefore:
          'Bred dangerous military complacency (the "Conceptzia") among Israeli generals, who believed Egypt could never cross the canal, setting the stage for surprise in 1973.',
        connective:
          'Alongside military fortifications, ideological and security motives drove Israeli civilians into the captured territories...',
        exam_link:
          'Q1 Consequence: Massive fortification that anchored the occupation of Sinai but fostered fatal Israeli military overconfidence.',
      },
      {
        step: 5,
        date: '1968–1973',
        title: 'The Inception of Israeli Settlements',
        actor: 'Israeli Government & Gush Emunim',
        tag: 'Facts on the Ground',
        trigger:
          'Israel establishes its first permanent civilian settlements: agricultural kibbutzim in the Golan and Jordan Valley (Allon Plan), and religious enclaves in Hebron and the West Bank.',
        because:
          'Military planners sought defensive buffer frontiers, while religious-nationalist Jews believed settling Judea and Samaria was a divine biblical mandate.',
        therefore:
          'Fragmented Palestinian territory, established irreversible "facts on the ground", and transformed a temporary military occupation into a permanent dispute.',
        connective: null,
        exam_link:
          'Q1 Consequence: The root cause of enduring Palestinian dispossession and resistance across the West Bank and Gaza.',
      },
    ],
  },

  lesson_9: {
    title: 'Rise of Palestinian Resistance: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '21 March 1968',
        title: 'The Battle of Karameh',
        actor: 'Fatah Guerrillas, Jordan Army & IDF',
        tag: 'The Legend of the Fedayeen',
        trigger:
          'A massive Israeli armoured force attacks the Fatah base at Karameh in Jordan; Palestinian guerrillas stand their ground alongside Jordanian artillery, inflicting 28 Israeli deaths.',
        because:
          'Israel launched a punitive cross-border raid to crush Arafat’s guerrilla command after a school bus was blown up by a landmine.',
        therefore:
          'Despite losing 150 fighters, Fatah claimed an iconic moral victory; thousands of young Arabs rushed to join the Fedayeen, and Yasser Arafat was elected PLO Chairman in 1969.',
        connective:
          'Emboldened by their soaring popularity, radical Marxist factions inside the PLO turned to international terrorism...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Transformed Arafat into the undisputed hero of Palestinian national resistance.',
      },
      {
        step: 2,
        date: 'September 1970',
        title: 'The Dawson’s Field Airline Hijackings',
        actor: 'PFLP (George Habash)',
        tag: 'Internationalising Terror',
        trigger:
          'The Popular Front for the Liberation of Palestine (PFLP) hijacks four Western passenger airliners, forcing three to land at a remote desert strip in Jordan and blowing them up on live TV.',
        because:
          'The Marxist PFLP sought to internationalize the Palestinian cause, win the release of prisoners, and humiliate pro-Western Arab monarchs.',
        therefore:
          'Directly challenged King Hussein’s royal sovereignty, turning the PLO into a lawless "state within a state" that openly threatened to overthrow the Jordanian monarchy.',
        connective:
          'Pushed to the brink of losing his throne, King Hussein ordered the Royal Jordanian Army to strike...',
        exam_link: 'Q1 Consequence: Direct trigger of the Black September civil war in Jordan.',
      },
      {
        step: 3,
        date: 'September 1970',
        title: 'Black September Civil War in Jordan',
        actor: 'Royal Jordanian Army vs. PLO',
        tag: 'The Brother War',
        trigger:
          'King Hussein declares martial law and unleashes tank divisions against PLO strongholds and refugee camps in Amman, killing thousands of Palestinian fighters.',
        because:
          'The PLO had established armed checkpoints, flouted Jordanian police authority, and attempted two separate assassinations of King Hussein.',
        therefore:
          'The PLO was completely crushed and expelled from Jordan; Arafat relocated his entire military and political headquarters to Beirut and southern Lebanon ("Fatahland").',
        connective:
          'Consumed by bitterness over their violent expulsion, radical militants formed a secretive covert assassination cell...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Shifted Palestinian guerrilla operations to Lebanon and birthed the Black September terror faction.',
      },
      {
        step: 4,
        date: '5–6 September 1972',
        title: 'The Munich Olympics Massacre',
        actor: 'Black September Terrorist Faction',
        tag: 'Terror on the World Stage',
        trigger:
          'Eight Black September militants infiltrate the Munich Olympic Village, killing two Israeli athletes and taking nine hostage; all nine hostages and a German police officer are killed in a botched rescue.',
        because:
          'The group demanded the release of 234 Palestinian prisoners in Israeli jails and global television publicity for the forgotten Palestinian struggle.',
        therefore:
          'Shocked the global public, branded the Palestinian national movement with international terrorism, and united Israelis in fierce grief and anger.',
        connective:
          'In cold fury, Israeli Prime Minister Golda Meir convened a secret war cabinet to order absolute retribution...',
        exam_link:
          'Q3 Importance: Brought the Palestinian struggle into 900 million living rooms but isolated the movement diplomatically.',
      },
      {
        step: 5,
        date: '1972–1979',
        title: 'Operation Wrath of God (Mossad Retribution)',
        actor: 'Mossad (Golda Meir & Zvi Zamir)',
        tag: 'The Covert Shadow War',
        trigger:
          'Israeli Mossad assassination squads track down and assassinate Palestinian organizers across Rome, Paris, Cyprus, and Beirut using car bombs and silenced pistols.',
        because:
          'Prime Minister Golda Meir resolved to re-establish Israeli military deterrence and eliminate every individual associated with the Munich massacre.',
        therefore:
          'Ignited a ruthless international shadow war; accidentally killed an innocent Moroccan waiter in Lillehammer (1973), exposing Mossad methods and drawing international condemnation.',
        connective: null,
        exam_link:
          'Q1 Consequence: Established Israel’s targeted assassination doctrine against terrorist leadership abroad.',
      },
    ],
  },

  lesson_10: {
    title: 'The 1973 Yom Kippur War: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1969–1970',
        title: 'The War of Attrition along the Suez Canal',
        actor: 'Egypt, USSR & Israel',
        tag: 'The Grinding Stalemate',
        trigger:
          'Nasser launches a continuous 18-month artillery and commando bombardment across the Suez Canal; Israel responds with deep-penetration air raids; Soviets install SAM missile batteries.',
        because:
          'Egypt refused to accept the static Israeli occupation of Sinai and sought to bleed the IDF into economic and military exhaustion.',
        therefore:
          'Killed over 10,000 Egyptian and 368 Israeli soldiers; established an impenetrable Soviet surface-to-air missile umbrella along the west bank of the canal.',
        connective:
          'Following Nasser’s sudden death in September 1970, his successor Anwar Sadat sought a bold diplomatic breakthrough...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Constructed the Soviet missile screen that made the 1973 canal crossing possible.',
      },
      {
        step: 2,
        date: 'July 1972',
        title: 'Sadat Expels 15,000 Soviet Advisers',
        actor: 'President Anwar Sadat',
        tag: 'The Diplomatic Rebuff',
        trigger:
          'Sadat summarily expels all 15,000 Soviet military technicians from Egypt after his 1971 "Peace for Sinai" diplomatic proposal is ignored by Israel and the United States.',
        because:
          'Golda Meir felt invulnerable behind the Bar-Lev Line, while Moscow refused to supply offensive weapons and Washington ignored Egyptian overtures.',
        therefore:
          'Left Sadat mocked at home as a weak leader; convinced him that only a limited, dramatic military shock could shatter Israeli complacency and force superpower intervention.',
        connective:
          'With peaceful diplomacy exhausted, Sadat forged a secret military alliance with Syria to plan a surprise assault...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): The critical psychological and strategic motive that made the 1973 surprise attack inevitable.',
      },
      {
        step: 3,
        date: '6 October 1973 (2:00 PM)',
        title: 'The Surprise Yom Kippur Canal Crossing',
        actor: 'Egypt & Syria vs. Israel',
        tag: 'The Two-Front Shock',
        trigger:
          'Egyptian forces cross the Suez Canal using high-pressure water cannons to blast through the Bar-Lev Line, while 1,400 Syrian tanks storm the Golan Heights.',
        because:
          'Launched on Yom Kippur (holiest Jewish fast day) and during Muslim Ramadan, catching the IDF completely off-guard with reserve units unmobilized.',
        therefore:
          'Overran the Bar-Lev Line under SAM missile cover, destroying hundreds of Israeli tanks and shattering the myth of Israeli military invincibility.',
        connective:
          'With the IDF suffering catastrophic initial losses and running low on ammunition, the conflict became a superpower crisis...',
        exam_link:
          'Q1 Consequence & Q2 Narrative: Shattered Israeli military overconfidence and caused the resignation of Golda Meir and Moshe Dayan.',
      },
      {
        step: 4,
        date: '12–16 October 1973',
        title: 'Operation Nickel Grass & Sharon’s Counter-Crossing',
        actor: 'USA & General Ariel Sharon',
        tag: 'The Military Turn',
        trigger:
          'US President Richard Nixon orders a massive military airlift (Operation Nickel Grass) to resupply Israel; General Ariel Sharon exploits a gap to cross to the west bank of the Suez Canal.',
        because:
          'Israel faced an existential crisis running out of artillery shells and tanks after six days of brutal attrition against Soviet-supplied armies.',
        therefore:
          'Sharon’s armoured divisions destroyed Egyptian SAM sites and completely encircled Egypt’s Third Army in Sinai, bringing the superpowers to DEFCON 3 nuclear alert.',
        connective:
          'Furious at American military intervention, Arab oil-exporting nations deployed their ultimate economic weapon...',
        exam_link:
          'Q2 Narrative (Link 3 → 4) & Q3 Importance: Demonstrated total Israeli dependence on American military and diplomatic support.',
      },
      {
        step: 5,
        date: '17–24 October 1973',
        title: 'The Arab Oil Embargo & UN Resolution 338',
        actor: 'OPEC & UN Security Council',
        tag: 'The Global Economic Weapon',
        trigger:
          'Arab OPEC members cut oil production by 5% monthly and embargo all crude exports to the US and Netherlands; the UN Security Council passes Resolution 338 enforcing a ceasefire.',
        because:
          'Arab nations sought to punish Western allies of Israel and force international pressure on Israel to withdraw from 1967 territories.',
        therefore:
          'Quadrupled world oil prices, triggered global economic stagflation, and convinced US Secretary of State Henry Kissinger that resolving the conflict was an urgent US security priority.',
        connective: null,
        exam_link:
          'Q1 Consequence: The birth of the Arab "oil weapon" and direct catalyst for Kissinger’s Shuttle Diplomacy.',
      },
    ],
  },

  lesson_11: {
    title: 'From Shuttle Diplomacy to Camp David: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1974–1975',
        title: 'Henry Kissinger’s Shuttle Diplomacy',
        actor: 'Henry Kissinger, Israel & Egypt',
        tag: 'Step-by-Step Diplomacy',
        trigger:
          'US Secretary of State Henry Kissinger flies repeatedly between Jerusalem, Cairo, and Damascus to broker military disengagement pacts (Sinai I & II).',
        because:
          'The US sought to defuse the Arab oil embargo, prevent another regional war, and pull Egypt decisively away from its alliance with the Soviet Union.',
        therefore:
          'Israel withdrew from the Suez Canal and western Sinai oilfields, allowing Egypt to reopen the Suez Canal in June 1975 and establishing UN buffer zones.',
        connective:
          'Although disengagement stabilized the borders, comprehensive peace remained blocked until a radical psychological breakthrough...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Laid the diplomatic groundwork for direct Egyptian-Israeli bilateral communication.',
      },
      {
        step: 2,
        date: '19–20 November 1977',
        title: 'Sadat’s Historic Address to the Knesset',
        actor: 'President Anwar Sadat',
        tag: 'The Psychological Breakthrough',
        trigger:
          'Anwar Sadat becomes the first Arab leader to set foot in Israel, arriving at Ben-Gurion Airport and addressing the Israeli Knesset in Jerusalem with an offer of permanent peace.',
        because:
          'Egypt was economically bankrupt from continuous military spending; Sadat realized only a direct psychological shock could convince Israelis he was serious about peace.',
        therefore:
          'Broke the 30-year Arab taboo against direct recognition of Israel, won global acclaim, and forced hardline Israeli PM Menachem Begin to enter direct peace negotiations.',
        connective:
          'When subsequent bilateral talks stalled over Israeli settlements in Sinai, the US President intervened personally...',
        exam_link:
          'Q3 Importance: The decisive psychological turning point that transformed a military enemy into a negotiating partner.',
      },
      {
        step: 3,
        date: '5–17 September 1978',
        title: 'The Camp David Summit',
        actor: 'Jimmy Carter, Anwar Sadat, Menachem Begin',
        tag: 'The Presidential Crucible',
        trigger:
          'US President Jimmy Carter sequesters Sadat and Begin at the secluded Camp David presidential retreat in Maryland for 13 days of grueling, round-the-clock negotiations.',
        because:
          'Bilateral negotiations had completely collapsed over the removal of Israeli settlements in Sinai and Palestinian autonomy in the West Bank.',
        therefore:
          'Carter drafted 23 versions of the accords, cajoling Begin and Sadat into signing the two historic Camp David Frameworks for peace.',
        connective:
          'With the principles established, diplomats drafted the first formal peace treaty between Israel and an Arab state...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Demonstrated the indispensable mediating role of the US President in Middle Eastern diplomacy.',
      },
      {
        step: 4,
        date: '26 March 1979',
        title: 'The Egypt-Israel Peace Treaty (Washington)',
        actor: 'Sadat, Begin & Carter',
        tag: 'The Historic Accord',
        trigger:
          'Sadat and Begin sign the formal Egypt-Israel Peace Treaty on the White House lawn, formally ending the state of war that had existed since May 1948.',
        because:
          'Israel agreed to return the entire Sinai Peninsula and evacuate all 7,000 Jewish settlers (Yamit); Egypt recognized Israel and granted Israeli ships passage through the Suez Canal.',
        therefore:
          'Removed the Arab world’s largest army from the military conflict; the US rewarded both nations with billions of dollars in annual military and economic subsidies.',
        connective:
          'While celebrated in Western capitals, Sadat’s separate peace provoked fury and condemnation across the Arab world...',
        exam_link:
          'Q1 Consequence: The first peace treaty between Israel and an Arab nation, permanently neutralizing Israel’s southern front.',
      },
      {
        step: 5,
        date: '1979–1981',
        title: 'Arab Ostracization & Sadat’s Assassination',
        actor: 'The Arab League & Islamic Jihad',
        tag: 'The Deadly Backlash',
        trigger:
          'The Arab League expels Egypt and severs diplomatic ties; on 6 October 1981, Islamic extremists assassinate President Sadat during a military parade in Cairo.',
        because:
          'Arab leaders and Islamists viewed Sadat’s separate treaty as a treasonous betrayal that abandoned the Palestinian people to permanent Israeli occupation.',
        therefore:
          'Egypt maintained the peace treaty with Israel, but Israel remained an isolated regional island with no other Arab peace treaties for 15 years.',
        connective: null,
        exam_link:
          'Q1 Consequence: Highlighted the lethal domestic and regional risks facing any Arab leader who compromised with Israel.',
      },
    ],
  },

  lesson_12: {
    title: 'Lebanon & The First Intifada: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '6 June 1982',
        title: 'Operation Peace for Galilee (Invasion of Lebanon)',
        actor: 'IDF (Ariel Sharon & Menachem Begin)',
        tag: 'The Northern Incursion',
        trigger:
          'Israel launches a massive invasion of Lebanon with 76,000 troops, pushing past the 40km buffer zone to encircle and bombard the capital city of Beirut.',
        because:
          'Retaliation for the Abu Nidal assassination attempt on Israel’s UK ambassador Shlomo Argov, and Sharon’s objective to eliminate the PLO base in southern Lebanon.',
        therefore:
          'Inflicted devastating urban casualties in Beirut, forcing Yasser Arafat and 14,000 PLO fighters to evacuate Lebanon to distant exile in Tunisia by sea.',
        connective:
          'In the chaotic aftermath of the PLO’s departure from Beirut, a horrific sectarian atrocity occurred...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Expelled the PLO military command from Israel’s border but dragged Israel into an 18-year quagmire.',
      },
      {
        step: 2,
        date: '16–18 September 1982',
        title: 'The Sabra and Shatila Refugee Camp Massacres',
        actor: 'Christian Phalangist Militias & IDF',
        tag: 'The Humanitarian Horror',
        trigger:
          'Lebanese Christian Phalangist militia enter the Sabra and Shatila refugee camps in West Beirut, systematically massacring between 800 and 3,000 Palestinian civilians.',
        because:
          'Revenge for the assassination of Lebanese Christian President-elect Bachir Gemayel; the IDF surrounded the camps and fired illumination flares without intervening.',
        therefore:
          'Caused international outrage and a 400,000-person anti-war protest in Tel Aviv; the official Kahan Commission found Sharon personally responsible, forcing his resignation.',
        connective:
          'With the PLO leadership exiled in distant Tunis, daily friction in the occupied territories reached breaking point...',
        exam_link:
          'Q1 Consequence: Deepened Palestinian hatred, damaged Israel’s international moral standing, and led to Sharon’s censure.',
      },
      {
        step: 3,
        date: '8 December 1987',
        title: 'Outbreak of the First Intifada',
        actor: 'Palestinian Youths & IDF',
        tag: 'The Grassroots Uprising',
        trigger:
          'An Israeli military transport vehicle collides with civilian cars in the Gaza Strip, killing four Palestinian workers; riots erupt and spread like wildfire.',
        because:
          'Twenty years of accumulated frustration under military occupation: land confiscations, Jewish settlement expansion, arbitrary curfews, and lack of civil rights.',
        therefore:
          'Transformed the conflict into a mass civilian uprising (strikes, boycotts, stone-throwing) led by local underground youth rather than the exiled PLO elite.',
        connective:
          'Struggling to suppress mass civilian demonstrations, Israel’s military command instituted harsh riot measures...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Shifted the focus of Palestinian resistance from external terrorism to internal civil disobedience.',
      },
      {
        step: 4,
        date: '1987–1988',
        title: 'Rabin’s "Iron Fist" & The Rise of Hamas',
        actor: 'IDF & Islamic Resistance Movement',
        tag: 'The Radicalisation',
        trigger:
          'Defence Minister Yitzhak Rabin orders troops to "break the bones" of stone-throwers; Sheikh Ahmed Yassin establishes Hamas as an Islamic alternative to the secular PLO.',
        because:
          'The IDF was trained for conventional tank warfare, not urban crowd control; Hamas rejected any compromise with Israel, calling for an Islamic state across all of Palestine.',
        therefore:
          'Televised footage of soldiers beating unarmed youths damaged Israel’s global reputation; Hamas introduced suicide bombings, permanently fracturing Palestinian leadership.',
        connective:
          'Under immense pressure from the street uprising and the rise of Hamas, Yasser Arafat made a radical diplomatic pivot...',
        exam_link:
          'Q1 Consequence: The emergence of Hamas as a violent, fundamentalist rival to the PLO.',
      },
      {
        step: 5,
        date: 'December 1988',
        title: 'Arafat Renounces Terror & Accepts Resolution 242',
        actor: 'Yasser Arafat & United Nations',
        tag: 'The Historic Concession',
        trigger:
          'Yasser Arafat addresses the UN General Assembly in Geneva, explicitly renouncing all forms of terrorism and accepting UN Resolutions 242 and 338.',
        because:
          'The Intifada proved Palestinians wanted an independent state in the West Bank and Gaza; King Hussein of Jordan had severed all administrative ties with the West Bank in July 1988.',
        therefore:
          'Satisfied US conditions, opening the first direct official diplomatic dialogue between the US and the PLO, laying the foundation for Madrid and Oslo.',
        connective: null,
        exam_link:
          'Q3 Importance: The fundamental diplomatic concession that accepted the two-state solution and led directly to the Oslo peace process.',
      },
    ],
  },

  lesson_13: {
    title: 'The Oslo Peace Process & Assassination: 5-Stage Causal Domino Chain',
    subtitle:
      'Edexcel Paper 2 Disciplinary Framework for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'October 1991',
        title: 'The Madrid Peace Conference',
        actor: 'USA, USSR, Israel, Arab States, Palestinians',
        tag: 'The Multilateral Forum',
        trigger:
          'US President George H.W. Bush and Soviet President Gorbachev co-sponsor the first direct multilateral peace conference in Madrid, bringing all warring parties together.',
        because:
          'The 1991 Gulf War defeated Saddam Hussein, leaving the US in unchallenged regional dominance; Bush pressured Israeli PM Shamir by withholding $10bn in loan guarantees.',
        therefore:
          'Broke the historical taboo of face-to-face negotiations between Israelis and Palestinians, though formal plenary discussions quickly bogged down in posturing.',
        connective:
          'Frustrated by the rigid public posturing in Washington, Israeli academics and PLO officials opened a covert backchannel...',
        exam_link:
          'Q2 Narrative (Link 1 → 2): Broke the psychological taboo against direct multilateral face-to-face Arab-Israeli negotiations.',
      },
      {
        step: 2,
        date: 'Jan–August 1993',
        title: 'The Secret Oslo Backchannel Negotiations',
        actor: 'Israeli Academics & PLO Delegates',
        tag: 'The Norwegian Breakthrough',
        trigger:
          'Norwegian sociologists host 14 rounds of secret negotiations in secluded country houses outside Oslo between Israeli delegates (Hirschfeld/Pundak) and PLO officials (Abu Ala).',
        because:
          'Newly elected Israeli PM Yitzhak Rabin and Shimon Peres realized official talks were deadlocked and feared the rising power of extremist Hamas.',
        therefore:
          'Negotiators bypassed public media scrutiny and political posturing, drafting a pragmatic 5-year interim framework for mutual recognition and Palestinian self-government.',
        connective:
          'The secret Norwegian breakthrough culminated in an iconic diplomatic ceremony on the world stage...',
        exam_link:
          'Q2 Narrative (Link 2 → 3): Demonstrated how covert backchannel secrecy allowed compromises impossible under public scrutiny.',
      },
      {
        step: 3,
        date: '13 September 1993',
        title: 'The Oslo I Accord & White House Handshake',
        actor: 'Yitzhak Rabin, Yasser Arafat, Bill Clinton',
        tag: 'The Historic Handshake',
        trigger:
          'Rabin and Arafat sign the Declaration of Principles on the White House lawn, sealed by an iconic, reluctant handshake hosted by US President Bill Clinton.',
        because:
          'Letters of Mutual Recognition were exchanged: the PLO recognized Israel’s right to exist in peace; Israel recognized the PLO as the official representative of the Palestinian people.',
        therefore:
          'Established the Palestinian Authority (PA) with self-rule starting in "Gaza and Jericho first", deferring explosive final status issues (Jerusalem, refugees, borders) for 5 years.',
        connective:
          'Momentum from the Oslo breakthrough immediately unlocked another historic bilateral peace treaty on Israel’s eastern border...',
        exam_link:
          'Q3 Importance: Mutual diplomatic recognition between the two warring national movements after 45 years of existential conflict.',
      },
      {
        step: 4,
        date: '1994–1995',
        title: 'Israel-Jordan Peace Treaty & Oslo II Accords',
        actor: 'King Hussein, Yitzhak Rabin, Yasser Arafat',
        tag: 'The Partition of the West Bank',
        trigger:
          'King Hussein and Rabin sign a peace treaty in October 1994; in September 1995, Oslo II divides the West Bank into Areas A (18% PA control), B (22% joint), and C (60% Israeli control).',
        because:
          'King Hussein felt protected by the Palestinian deal to normalize relations, while negotiators sought to gradually transfer civil control in the West Bank.',
        therefore:
          'Secured Israel’s longest border, but created a fragmented territorial archipelago in the West Bank that outraged both Israeli settlers and Palestinian nationalists.',
        connective:
          'The deepening territorial compromises provoked violent, fanatical extremism from both fringes...',
        exam_link:
          'Q1 Consequence & Q2 Narrative: Established the three-tier administrative division (Area A/B/C) that still governs the West Bank today.',
      },
      {
        step: 5,
        date: '1994–1995',
        title: 'Extremist Violence & The Assassination of Rabin',
        actor: 'Hamas, Baruch Goldstein & Yigal Amir',
        tag: 'The Death of the Peace Process',
        trigger:
          'Baruch Goldstein massacres 29 Muslims in Hebron; Hamas launches deadly bus bombings; right-wing Jewish extremist Yigal Amir assassinates Prime Minister Rabin on 4 November 1995.',
        because:
          'Religious zealots on both sides viewed political compromise as an existential betrayal of holy land and national destiny.',
        therefore:
          'Dealt a fatal psychological blow to the Oslo peace process; shattered Israeli consensus and paved the way for the election of Benjamin Netanyahu in May 1996.',
        connective: null,
        exam_link:
          'Q1 Consequence: The tragic turning point that halted the momentum of the Oslo peace process.',
      },
    ],
  },
};

function injectDominos(filePath) {
  console.log(`Injecting 5-stage causal dominos into: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [lessonId, domino] of Object.entries(dominosByLessonId)) {
    // Check if domino already injected
    const lessonRegex = new RegExp(`(id:\\s*'${lessonId}'[\\s\\S]*?)(flashcards:\\s*\\[)`, 'm');
    const match = content.match(lessonRegex);

    if (match) {
      const dominoStr = `causal_domino_spine: ${JSON.stringify(domino, null, 8).replace(/^ {8}/gm, '      ')},\n      `;
      if (match[1].includes('causal_domino_spine:')) {
        const updatedBlock = match[1].replace(
          /causal_domino_spine:\s*\{[\s\S]*?\}\s*,\s*/m,
          dominoStr,
        );
        content = content.replace(match[1] + match[2], updatedBlock + match[2]);
        console.log(`  🔄 Successfully updated causal_domino_spine in ${lessonId}`);
      } else {
        const replacement = `${match[1]}${dominoStr}${match[2]}`;
        content = content.replace(match[0], replacement);
        console.log(`  ✅ Successfully injected causal_domino_spine into ${lessonId}`);
      }
    } else {
      console.warn(`  ⚠️ Could not find injection insertion point for ${lessonId}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// Update both copies
const file1 = path.join(__dirname, '../units/cme_new/data.js');
const file2 = path.join(__dirname, '../public/units/cme_new/data.js');

injectDominos(file1);
injectDominos(file2);

console.log('\n🎉 Finished injecting 5-stage causal dominos into all lessons!');
