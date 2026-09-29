/**
 * cme_spreads_kt2.cjs
 *
 * Key Topic 2 Spreads (Lessons 5 to 9)
 * Written in simple, clear Pearson Edexcel revision guide style for lower-ability GCSE pupils (age 14–15).
 */
module.exports = [
  // LESSON 5 (Page 10): Causes of the Six-Day War (1964–1967)
  {
    id: 'cme_spread_5',
    spreadNum: 5,
    topic: 'Key Topic 2: The escalating conflict, 1964–73',
    title: 'Lesson 5: Causes of the Six-Day War: Water, Raids & Rhetoric (1964–1967)',
    left: {
      tag: 'Lesson 5 • Rising Tensions & The Road to War',
      headline: 'The Build-Up: Water Disputes, Border Raids & Blockade',
      summary:
        "Between 1964 and 1967, tension between Israel and its Arab neighbours reached boiling point. At the 1964 Cairo Conference, Arab leaders created the PLO and tried to divert water away from Israel's River Jordan. Palestinian guerrilla groups (Fatah) launched border raids into Israel. In November 1966, Israel retaliated by attacking the Jordanian town of Samu. In April 1967, Israeli fighter jets shot down six Syrian planes. In May 1967, President Nasser of Egypt expelled UN peacekeepers, sent 100,000 troops to the border, and closed the Straits of Tiran to Israeli ships, making war inevitable.",
      pillars: [
        {
          title: 'The Water Wars & The PLO',
          subtitle: 'Cairo Conference & National Water Carrier',
          bullets: [
            '**Creation of the PLO (1964):** Arab leaders created the Palestine Liberation Organisation to represent Palestinians and liberate Palestine.',
            '**Water Diversion Dispute:** Arab states tried to divert the headwaters of the River Jordan; Israel bombed the diversion works to protect its water supply.',
            '**Fatah Border Raids:** Palestinian guerrilla group Fatah, led by Yasser Arafat, carried out over **70 sabotage attacks** inside Israel.',
          ],
        },
        {
          title: 'Violent Border Clashes (1966–67)',
          subtitle: 'The Samu Raid & The Syrian Dogfight',
          bullets: [
            "**Samu Raid (Nov 1966):** After an Israeli police car hit a landmine, Israeli forces attacked the West Bank town of Samu, damaging Jordan's relations with Israel.",
            '**April 1967 Dogfight:** Israeli fighter jets shot down **six Syrian MiG-21 planes** and flew over Damascus, humiliating the Syrian government.',
            '**Rising Hatred:** Arab radio stations broadcast aggressive speeches promising to drive Israel into the sea and destroy the Jewish state.',
          ],
        },
        {
          title: "Nasser's May 1967 Escalation",
          subtitle: 'UNEF Expelled & The Straits Blockaded',
          bullets: [
            '**False Soviet Warning:** The USSR falsely told Egypt that Israel was massing troops to invade Syria, pushing Nasser to act.',
            '**UNEF Expelled:** Nasser ordered UN Emergency Force peacekeepers to leave the Sinai border and deployed **100,000 Egyptian soldiers**.',
            "**Straits of Tiran Closed (22 May):** Nasser shut the Straits to Israeli ships, cutting off Israel's oil supply; Israel saw this as an act of war.",
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gamal Abdel Nasser',
          role: 'President of Egypt who expelled UN peacekeepers, mobilised 100,000 troops, and shut the Straits of Tiran.',
        },
        {
          name: 'Levi Eshkol',
          role: 'Prime Minister of Israel who attempted to avoid war through diplomacy before authorising the pre-emptive air strike.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'King of Jordan who signed a mutual defence treaty with Egypt in May 1967, placing his army under Egyptian control.',
        },
        {
          name: 'Yasser Arafat',
          role: 'Founder of the militant Palestinian group Fatah, which launched sabotage raids across the borders into Israel.',
        },
      ],
      archivalSource: {
        title: 'President Nasser Speech to the Arab Trade Unions (26 May 1967)',
        citation: 'Radio Cairo Broadcast to the Arab World',
        quote:
          'The battle will be a general one and our basic objective will be to destroy Israel. This is the will of our people.',
        significance:
          'Proves Arab rhetoric convinced the Israeli public that they faced total destruction, justifying a pre-emptive strike.',
      },
    },
    right: {
      tag: 'Lesson 5 • Narrative Story & Key Words',
      causalPathway: [
        {
          stage: '1. Trigger: Water Wars & Border Raids',
          desc: 'Disputes over River Jordan water and Fatah guerrilla raids lead to violent border clashes with Syria.',
          text: 'Disputes over River Jordan water and Fatah raids led to violent clashes between Israel and Syria.',
        },
        {
          stage: '2. Escalation: Dogfight Over Damascus',
          desc: 'On 7 April 1967, Israeli fighter jets shoot down six Syrian MiG planes, humiliating Syria and raising tension.',
          text: 'On 7 April 1967, Israeli jets shot down six Syrian fighter planes, embarrassing the Syrian government.',
        },
        {
          stage: '3. Action: Nasser Mobilises Troops',
          desc: "Nasser expels UN peacekeepers from Sinai and sends 100,000 troops and 1,000 tanks to Israel's border.",
          text: 'Nasser kicked out UN peacekeepers and moved 100,000 soldiers to the Sinai border with Israel.',
        },
        {
          stage: '4. Outcome: Blockade of Tiran',
          desc: 'On 22 May 1967, Nasser closes the Straits of Tiran to Israeli ships, cutting oil imports and making war inevitable.',
          text: "Nasser closed the Straits of Tiran, cutting off Israel's oil supply and triggering the Six-Day War.",
        },
      ],
      masterWordBank: [
        {
          term: 'Straits of Tiran',
          def: "The narrow sea passage leading to Israel's southern port of Eilat; closing it was an act of war.",
        },
        {
          term: 'PLO',
          def: 'Palestine Liberation Organisation, created in 1964 to unite Palestinians and fight for their homeland.',
        },
        {
          term: 'Fatah',
          def: 'A Palestinian guerrilla group led by Yasser Arafat that carried out sabotage raids inside Israel.',
        },
        {
          term: 'Samu Raid',
          def: 'A large Israeli military raid into the Jordanian West Bank in November 1966 in revenge for a landmine.',
        },
      ],
    },
  },

  // LESSON 6 (Page 11): The Six-Day War (June 1967)
  {
    id: 'cme_spread_6',
    spreadNum: 6,
    topic: 'Key Topic 2: The escalating conflict, 1964–73',
    title: 'Lesson 6: The Six-Day War: Pre-emptive Strike & Victory (June 1967)',
    left: {
      tag: 'Lesson 6 • Operation Focus & The Three Fronts',
      headline: 'Six Days That Changed the Map: Total Israeli Air Victory',
      summary:
        'On 5 June 1967, Israel launched a surprise dawn attack called Operation Focus. Flying low under Egyptian radar, Israeli jets destroyed over 300 Egyptian planes on the ground in just three hours, winning total control of the skies. Over the next six days, Israel fought and won on three fronts: taking the Sinai Desert and Gaza Strip from Egypt, East Jerusalem and the West Bank from Jordan, and the Golan Heights from Syria. By the ceasefire on 10 June, Israel had tripled the size of the territory under its control.',
      pillars: [
        {
          title: 'Operation Focus: The Air Blitz',
          subtitle: 'Three Hours to Air Supremacy',
          bullets: [
            '**Surprise Dawn Strike (5 June):** At 7:45 AM, 200 Israeli jets flew low over the Mediterranean beneath Egyptian radar.',
            '**300+ Planes Destroyed:** Israeli bombs destroyed Egyptian runways and wiped out **over 300 planes on the tarmac** in 3 hours.',
            "**Air Supremacy:** With Egypt's air force gone, Israeli jets bombed Syrian and Jordanian air bases, leaving their armies unprotected.",
          ],
        },
        {
          title: 'The Three Ground Fronts',
          subtitle: 'Sinai, West Bank & Golan Heights',
          bullets: [
            '**Sinai & Gaza (5–8 June):** Israeli tanks smashed through Egyptian lines; Egyptian troops retreated in panic towards the Suez Canal.',
            '**Jerusalem & West Bank (5–7 June):** Jordan opened fire; Israeli paratroopers captured the **Old City of Jerusalem and the Western Wall**.',
            '**Golan Heights (9–10 June):** Israeli forces stormed steep Syrian fortified cliffs, capturing the heights and ending shelling of farms.',
          ],
        },
        {
          title: 'Why Did Israel Win So Fast?',
          subtitle: 'Air Power, Training & Arab Disunity',
          bullets: [
            '**Total Air Superiority:** Ground armies could not fight back against constant Israeli air strikes and close air support.',
            '**Superb Training:** Israeli commanders used flexible battlefield tactics, while Arab commanders gave rigid, confused orders.',
            '**Arab Division:** Egypt, Jordan, and Syria did not coordinate their plans, and Egypt broadcast false claims of victory early on.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Moshe Dayan',
          role: 'Israeli Minister of Defence whose leadership boosted Israeli public confidence and oversaw the 6-day victory.',
        },
        {
          name: 'Yitzhak Rabin',
          role: 'IDF Chief of Staff who planned Operation Focus and directed the rapid three-front ground campaign.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'President of Egypt who resigned in shame after his army was crushed in Sinai, though huge crowds demanded his return.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'King of Jordan who entered the war after being misled by Egyptian victory claims, losing the West Bank and East Jerusalem.',
        },
      ],
      archivalSource: {
        title: 'General Motta Gur at the Western Wall (7 June 1967)',
        citation: 'IDF Radio Field Transmission from the Old City of Jerusalem',
        quote: 'The Temple Mount is in our hands! I repeat, the Temple Mount is in our hands!',
        significance:
          'Captured the intense religious and national pride of Israelis regaining access to the Western Wall for the first time since 1948.',
      },
    },
    right: {
      tag: 'Lesson 6 • Narrative Story & Key Words',
      causalPathway: [
        {
          stage: '1. Trigger: Operation Focus Air Strike',
          desc: "On 5 June at 7:45 AM, Israeli jets launch a surprise strike, wiping out Egypt's air force on the ground.",
          text: "Israel launched a surprise dawn air strike, destroying Egypt's air force on the ground in 3 hours.",
        },
        {
          stage: '2. Escalation: Defeat of Egypt in Sinai',
          desc: 'Israeli tank columns smash through Sinai; Egyptian forces suffer thousands of casualties and retreat to the canal.',
          text: 'Israeli tanks swept across the Sinai Desert, defeating the Egyptian army and reaching the Suez Canal.',
        },
        {
          stage: '3. Action: Capture of Jerusalem & West Bank',
          desc: 'Jordan attacks; Israeli troops counter-attack, capturing East Jerusalem and the entire West Bank in three days.',
          text: 'Israeli paratroopers captured East Jerusalem and the Western Wall, taking the entire West Bank from Jordan.',
        },
        {
          stage: '4. Outcome: Golan Taken & Ceasefire',
          desc: 'Israel captures the Golan Heights from Syria; a UN ceasefire takes effect on 10 June with Israel holding 3x more land.',
          text: "Israel captured the Golan Heights from Syria; the war ended on 10 June with Israel's territory tripled.",
        },
      ],
      masterWordBank: [
        {
          term: 'Operation Focus',
          def: "The codename for Israel's surprise dawn air strike on 5 June 1967 that destroyed Arab air forces.",
        },
        {
          term: 'Pre-emptive Strike',
          def: 'An attack launched to destroy the enemy before they have the chance to attack first.',
        },
        {
          term: 'Western Wall',
          def: 'The holiest Jewish prayer site in Jerusalem, captured by Israeli paratroopers on 7 June 1967.',
        },
        {
          term: 'Air Supremacy',
          def: 'Having total control of the skies so enemy aircraft cannot interfere with ground troops.',
        },
      ],
    },
  },

  // LESSON 7 (Page 12): Aftermath of 1967 War & Occupied Territories (1967–1969)
  {
    id: 'cme_spread_7',
    spreadNum: 7,
    topic: 'Key Topic 2: The escalating conflict, 1964–73',
    title: 'Lesson 7: Aftermath of 1967: The Occupied Territories & UN Res 242',
    left: {
      tag: 'Lesson 7 • Occupied Territories & UN Res 242',
      headline: 'The New Map: Land for Peace, The Three Noes & Settlements',
      summary:
        'The Six-Day War changed everything. Israel now controlled the Sinai Desert, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights. Over one million Palestinians were now living under Israeli military occupation, and 300,000 new refugees fled across the River Jordan. In August 1967, Arab leaders met at Khartoum and declared the "Three Noes": no peace, no recognition, no negotiation. In November 1967, the UN passed Resolution 242, establishing the formula "Land for Peace". Israel began building Jewish settlements in the occupied territories, deepening Palestinian resentment.',
      pillars: [
        {
          title: 'The Occupied Territories',
          subtitle: 'Sinai, Gaza, West Bank & Golan',
          bullets: [
            '**Territory Tripled:** Israel gained strategic buffer zones: Sinai and Gaza from Egypt, West Bank from Jordan, and Golan from Syria.',
            '**1 Million Under Military Rule:** Over **1,000,000 Palestinian Arabs** were suddenly placed under Israeli military administration.',
            '**Second Refugee Crisis:** **300,000 Palestinians** were displaced during the war, fleeing into Jordan and filling new refugee camps.',
          ],
        },
        {
          title: 'The Khartoum "Three Noes"',
          subtitle: 'Arab States Refuse to Yield (Aug 1967)',
          bullets: [
            '**Arab Summit at Khartoum:** Humiliated Arab leaders met in Sudan in August 1967 to agree their common strategy.',
            '**The Three Noes:** They agreed: **No peace with Israel, no recognition of Israel, and no negotiations with Israel**.',
            '**Impact:** This hardline stance convinced Israeli leaders that they must hold on to the occupied lands for security.',
          ],
        },
        {
          title: 'UN Resolution 242 & Settlements',
          subtitle: '"Land for Peace" Formula',
          bullets: [
            '**"Land for Peace" (Nov 1967):** UN Res 242 stated Israel should return occupied land in exchange for Arab recognition and secure borders.',
            '**Ambiguous Wording:** The English text said withdrawal from "territories occupied" (not *all* territories), causing decades of disputes.',
            '**First Jewish Settlements:** Israel began building civilian settlements in the West Bank and Golan Heights to secure its control.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Levi Eshkol',
          role: 'Israeli Prime Minister who authorized the construction of the first Jewish settlements in the West Bank after the 1967 war.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President who attended the Khartoum Conference and led the Arab adoption of the hardline "Three Noes" policy.',
        },
        {
          name: 'Lord Caradon',
          role: 'British diplomat at the United Nations who drafted Resolution 242 to create the "Land for Peace" compromise.',
        },
        {
          name: 'Gunnar Jarring',
          role: 'Swedish UN diplomat appointed to negotiate between Israel and Arab states under Resolution 242, but achieved little success.',
        },
      ],
      archivalSource: {
        title: 'UN Security Council Resolution 242 (22 November 1967)',
        citation: 'United Nations Official Security Council Records',
        quote:
          'Withdrawal of Israel armed forces from territories occupied in the recent conflict... and termination of all claims or states of belligerency...',
        significance:
          'Created the famous "Land for Peace" formula, but disagreement over whether Israel had to return all land led to permanent stalemate.',
      },
    },
    right: {
      tag: 'Lesson 7 • Narrative Story & Key Words',
      causalPathway: [
        {
          stage: '1. Trigger: Capture of New Lands',
          desc: 'Israel captures Sinai, Gaza, West Bank, East Jerusalem, and Golan Heights, putting 1 million Palestinians under military rule.',
          text: 'Israel captured Sinai, Gaza, West Bank, Golan, and Jerusalem, putting 1 million Palestinians under military rule.',
        },
        {
          stage: '2. Escalation: Khartoum "Three Noes"',
          desc: 'In August 1967, Arab leaders refuse all peace talks with Israel, ruling out any diplomatic solution.',
          text: 'Arab leaders met at Khartoum and issued the "Three Noes": no peace, no recognition, no negotiation.',
        },
        {
          stage: '3. Action: UN Resolution 242',
          desc: 'In November 1967, the UN passes Resolution 242 calling for "Land for Peace", but its ambiguous wording causes arguments.',
          text: 'The UN passed Resolution 242 ("Land for Peace"), but ambiguous wording caused disagreement.',
        },
        {
          stage: '4. Outcome: Israeli Settlements',
          desc: 'Israel begins building Jewish settlements in the West Bank and Golan, entrenching control and angering Palestinians.',
          text: 'Israel began building settlements in the occupied territories, deepening Palestinian anger and making peace harder.',
        },
      ],
      masterWordBank: [
        {
          term: 'Occupied Territories',
          def: 'The areas captured by Israel in 1967: Sinai, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.',
        },
        {
          term: 'The Three Noes',
          def: 'The pledge made by Arab leaders at Khartoum in 1967: no peace, no recognition, no negotiations with Israel.',
        },
        {
          term: 'UN Resolution 242',
          def: 'The 1967 United Nations resolution establishing the idea of exchanging occupied "Land for Peace".',
        },
        {
          term: 'Israeli Settlements',
          def: 'Towns and communities built by Jewish Israelis on land captured during the 1967 Six-Day War.',
        },
      ],
    },
  },

  // LESSON 8 (Page 13): Palestinian Resistance: The PLO, Black September & Munich (1968–1972)
  {
    id: 'cme_spread_8',
    spreadNum: 8,
    topic: 'Key Topic 2: The escalating conflict, 1964–73',
    title: 'Lesson 8: The Rise of Palestinian Resistance: The PLO & Munich (1968–1972)',
    left: {
      tag: 'Lesson 8 • Fedayeen, Skyjackings & Munich',
      headline: 'Armed Struggle: Karameh, Black September & The 1972 Olympics',
      summary:
        'After Arab armies failed to defeat Israel in 1967, Palestinians decided they had to fight for themselves. In 1968, Palestinian fighters stood their ground against Israeli tanks at the Battle of Karameh, making Yasser Arafat a hero; he took control of the PLO in 1969. Militant groups like the PFLP turned to international terrorism, hijacking four Western planes to Dawson\'s Field in Jordan in September 1970. Threatened by this, King Hussein used the Jordanian army to crush the PLO in "Black September" and expelled them to Lebanon. In September 1972, a terrorist group called Black September murdered 11 Israeli athletes at the Munich Olympics.',
      pillars: [
        {
          title: 'The Rise of Yasser Arafat & The PLO',
          subtitle: 'The Battle of Karameh (1968)',
          bullets: [
            '**Taking Control:** Palestinians lost faith in Arab rulers after 1967; they turned to guerrilla fighters called **fedayeen**.',
            '**Battle of Karameh (March 1968):** Palestinian fighters resisted an Israeli raid in Jordan; though Israel won, it made Arafat a legend.',
            '**Arafat Leads PLO (1969):** Yasser Arafat became chairman of the PLO, making it independent of Arab governments.',
          ],
        },
        {
          title: "Dawson's Field & Black September (1970)",
          subtitle: 'Hijackings & Expulsion from Jordan',
          bullets: [
            "**Dawson's Field Hijackings (Sept 1970):** The militant PFLP hijacked **four airliners**, flew three to Jordan, and blew them up on TV.",
            "**King Hussein's Crackdown:** King Hussein felt his royal rule was threatened; Jordan's army attacked PLO camps in September 1970.",
            '**Expulsion to Lebanon:** Up to **3,000 Palestinians died**; the PLO was thrown out of Jordan and set up new bases in southern Lebanon.',
          ],
        },
        {
          title: 'The 1972 Munich Olympics Massacre',
          subtitle: 'Terrorism on Live Global TV',
          bullets: [
            '**Munich Massacre (Sept 1972):** A terror group called "Black September" took 11 Israeli athletes hostage at the Munich Games.',
            '**11 Athletes Murdered:** A botched rescue by German police at the airport ended in tragedy; all 11 Israeli hostages were killed.',
            '**Operation Wrath of God:** Israeli PM Golda Meir ordered the Mossad secret service to track down and assassinate those responsible.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yasser Arafat',
          role: 'Leader of Fatah who became Chairman of the PLO in 1969, adopting guerrilla tactics to liberate Palestine.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'King of Jordan who used his army to crush the PLO in "Black September" 1970 after airplane hijackings embarrassed him.',
        },
        {
          name: 'George Habash',
          role: 'Leader of the Marxist PFLP group that pioneered international airplane hijackings to draw world attention to Palestine.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister who ordered Mossad assassination squads (Operation Wrath of God) after the Munich massacre.',
        },
      ],
      archivalSource: {
        title: 'Yasser Arafat on Armed Struggle (1969 Interview)',
        citation: 'Official Interview Following Election as PLO Chairman',
        quote:
          'Our struggle is not aimed at throwing Jews into the sea... We are fighting for our right to live as a free people in our homeland.',
        significance:
          'Demonstrates the shift from Arab armies fighting for territory to Palestinians fighting for self-determination.',
      },
    },
    right: {
      tag: 'Lesson 8 • Narrative Story & Key Words',
      causalPathway: [
        {
          stage: '1. Trigger: Battle of Karameh (1968)',
          desc: 'Palestinian fedayeen fight Israeli forces at Karameh, making Yasser Arafat a national hero and leader of the PLO.',
          text: 'Fedayeen fighters resisted Israeli troops at Karameh; Arafat became Chairman of the PLO in 1969.',
        },
        {
          stage: "2. Escalation: Dawson's Field Skyjackings",
          desc: 'In Sept 1970, the PFLP hijacks four Western passenger planes to Jordan and blows them up on live global television.',
          text: 'PFLP hijacked four Western airliners to Jordan in Sept 1970, embarrassing King Hussein.',
        },
        {
          stage: '3. Action: Black September in Jordan',
          desc: "Jordan's army attacks PLO bases, killing thousands and expelling Arafat and the PLO fighters into Lebanon.",
          text: 'Jordan\'s army attacked PLO camps in "Black September", expelling fighters into southern Lebanon.',
        },
        {
          stage: '4. Outcome: Munich Olympics Massacre',
          desc: 'In Sept 1972, Black September terrorists murder 11 Israeli Olympic athletes in Munich, shocking the world.',
          text: 'In Sept 1972, Black September terrorists killed 11 Israeli athletes at the Munich Olympics, provoking Mossad reprisals.',
        },
      ],
      masterWordBank: [
        {
          term: 'Fedayeen',
          def: 'Palestinian guerrilla fighters or commandos who launched armed raids across the borders into Israel.',
        },
        {
          term: 'Black September',
          def: "The September 1970 civil war in which Jordan's army crushed and expelled the PLO to Lebanon.",
        },
        {
          term: 'PFLP',
          def: 'Popular Front for the Liberation of Palestine, a militant group that pioneered airplane hijackings.',
        },
        {
          term: "Dawson's Field",
          def: 'A desert airstrip in Jordan where hijacked Western planes were flown and blown up in 1970.',
        },
      ],
    },
  },

  // LESSON 9 (Page 14): The War of Attrition & The Yom Kippur War (1969–1973)
  {
    id: 'cme_spread_9',
    spreadNum: 9,
    topic: 'Key Topic 2: The escalating conflict, 1964–73',
    title: 'Lesson 9: The War of Attrition & The Yom Kippur War (1969–1973)',
    left: {
      tag: 'Lesson 9 • Surprise Attack, Superpowers & Oil',
      headline: 'The 1973 Yom Kippur Shock: The Bar-Lev Line & The Oil Weapon',
      summary:
        'Between 1969 and 1970, Egypt and Israel fought the "War of Attrition" along the Suez Canal, trading heavy artillery fire. When Anwar Sadat became President of Egypt in 1970, he decided war was necessary to break the diplomatic stalemate and force Israel to negotiate. On 6 October 1973, Egypt and Syria launched a surprise attack on Yom Kippur, the holiest day in the Jewish calendar. Egyptian troops crossed the canal using water-cannons to breach the Bar-Lev Line. Israel recovered thanks to a massive US airlift of weapons, and General Sharon led a counter-attack across the canal. Meanwhile, Arab oil states used the "oil weapon", cutting supplies and quadrupling prices.',
      pillars: [
        {
          title: "Sadat's Plan & Surprise Attack",
          subtitle: '6 October 1973: Holy Day Assault',
          bullets: [
            "**Sadat's Goal:** Sadat did not want to destroy Israel; he wanted to win back Sinai and force the USA to broker peace talks.",
            '**Surprise on Yom Kippur:** Israel was caught completely unprepared; soldiers were praying and radio communications were quiet.',
            '**Operation Badr:** **80,000 Egyptian troops** crossed the Suez Canal and used high-pressure water hoses to blast through sand walls.',
          ],
        },
        {
          title: 'Superpower Airlifts & Counter-Attack',
          subtitle: "US Weapons & Sharon's Crossing",
          bullets: [
            '**Syrian Tank Assault:** Syria attacked the Golan Heights with **1,400 tanks**, nearly breaking through into northern Israel.',
            '**Massive US Airlift:** The USA flew in emergency supplies of tanks, missiles, and ammunition (Operation Nickel Grass) to save Israel.',
            "**Sharon's Counter-Crossing:** General Ariel Sharon led Israeli tanks across the canal, encircling Egypt's Third Army in Sinai.",
          ],
        },
        {
          title: 'The OPEC Oil Weapon & Ceasefire',
          subtitle: 'Prices Quadrupled & DEFCON 3',
          bullets: [
            '**The Oil Embargo:** Arab oil producers (OPEC) cut oil production and banned sales to the USA, **quadrupling oil prices worldwide**.',
            '**Nuclear Alert (DEFCON 3):** When the USSR threatened to send troops to save Egypt, the USA put its nuclear forces on alert.',
            '**Ceasefire (25 Oct):** The UN arranged a ceasefire; Israel kept territory but its sense of invincibility was permanently shattered.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anwar Sadat',
          role: 'President of Egypt who planned and launched the 1973 Yom Kippur surprise attack to force diplomatic negotiations.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister who faced fierce criticism for failing to mobilise troops before the surprise attack, resigning in 1974.',
        },
        {
          name: 'Ariel Sharon',
          role: 'Israeli General who led the daring counter-attack across the Suez Canal, cutting off the Egyptian Third Army.',
        },
        {
          name: 'Henry Kissinger',
          role: 'US Secretary of State who organised the massive US arms airlift to Israel and negotiated the final ceasefire.',
        },
      ],
      archivalSource: {
        title: 'President Anwar Sadat to the Egyptian People (16 October 1973)',
        citation: 'Speech to the Egyptian National Assembly in Cairo',
        quote:
          'We have fulfilled our promise... We have crossed the obstacle and proved that Arab will cannot be broken.',
        significance:
          'Shows Egypt viewed the canal crossing as restoring Arab pride, which made peace talks with Israel politically possible.',
      },
    },
    right: {
      tag: 'Lesson 9 • Narrative Story & Key Words',
      causalPathway: [
        {
          stage: '1. Trigger: Surprise Attack on Yom Kippur',
          desc: 'On 6 October 1973, Egyptian and Syrian forces launch a surprise invasion on the holiest day of the Jewish year.',
          text: 'On 6 Oct 1973, Egypt and Syria launched a surprise attack on Yom Kippur, catching Israel off guard.',
        },
        {
          stage: '2. Escalation: Crossing the Suez Canal',
          desc: '80,000 Egyptian troops cross the canal and breach the Bar-Lev Line, while Syrian tanks storm the Golan Heights.',
          text: 'Egyptian soldiers crossed the Suez Canal and breached the Bar-Lev Line with high-pressure water hoses.',
        },
        {
          stage: '3. Action: Superpower Arms Airlifts',
          desc: "The USA and USSR fly in massive arms supplies; Israeli tanks cross the canal and encircle Egypt's Third Army.",
          text: 'A massive US arms airlift helped Israel counter-attack; General Sharon led tanks across the canal.',
        },
        {
          stage: '4. Outcome: The Arab Oil Embargo',
          desc: 'Arab states cut oil exports to the West, quadrupling global prices; a ceasefire is agreed on 25 October 1973.',
          text: 'Arab states cut oil sales to the West, quadrupling prices; a ceasefire ended fighting on 25 October.',
        },
      ],
      masterWordBank: [
        {
          term: 'Bar-Lev Line',
          def: 'A massive chain of Israeli sand forts built along the eastern bank of the Suez Canal after 1967.',
        },
        {
          term: 'Yom Kippur',
          def: 'The Day of Atonement, the holiest day in the Jewish religion, during which Israel was attacked in 1973.',
        },
        {
          term: 'OPEC Oil Embargo',
          def: 'When Arab oil nations cut production and stopped selling oil to Western countries supporting Israel.',
        },
        {
          term: 'Operation Badr',
          def: 'The Egyptian military plan to cross the Suez Canal and capture the Bar-Lev Line in October 1973.',
        },
      ],
    },
  },
];
