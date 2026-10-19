const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cme_unified_textbook_data.cjs');
const fullData = require(filePath);

// 1. Update MILESTONE_SPINE to 15 items
fullData.MILESTONE_SPINE = [
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

// 2. Update THEATER_MAP_CONFIG
fullData.THEATER_MAP_CONFIG = {
  mapImage: '/images/middle_east_map.png',
  caption:
    'The Middle East Geopolitical Theater • Strategic Maritime Chokepoints, Elevated High Ground, Freshwater Basins & The Green Line',
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

// 3. Attach Key Topic codes to each Enquiry
const ktCodes = [
  {
    code: 'KT 1.0',
    group: 'KEY TOPIC 1 (1945–1963)',
    groupTitle: 'The Birth of the State of Israel',
  },
  {
    code: 'KT 1.1',
    group: 'KEY TOPIC 1 (1945–1963)',
    groupTitle: 'The Birth of the State of Israel',
  },
  {
    code: 'KT 1.2',
    group: 'KEY TOPIC 1 (1945–1963)',
    groupTitle: 'The Birth of the State of Israel',
  },
  {
    code: 'KT 1.3',
    group: 'KEY TOPIC 1 (1945–1963)',
    groupTitle: 'The Birth of the State of Israel',
  },
  { code: 'KT 2.1', group: 'KEY TOPIC 2 (1964–1973)', groupTitle: 'The Escalating Conflict' },
  { code: 'KT 2.2', group: 'KEY TOPIC 2 (1964–1973)', groupTitle: 'The Escalating Conflict' },
  { code: 'KT 2.3', group: 'KEY TOPIC 2 (1964–1973)', groupTitle: 'The Escalating Conflict' },
  { code: 'KT 2.4', group: 'KEY TOPIC 2 (1964–1973)', groupTitle: 'The Escalating Conflict' },
  { code: 'KT 2.5', group: 'KEY TOPIC 2 (1964–1973)', groupTitle: 'The Escalating Conflict' },
  { code: 'KT 3.1', group: 'KEY TOPIC 3 (1974–1995)', groupTitle: 'Attempts at a Solution' },
  { code: 'KT 3.2', group: 'KEY TOPIC 3 (1974–1995)', groupTitle: 'Attempts at a Solution' },
  { code: 'KT 3.3', group: 'KEY TOPIC 3 (1974–1995)', groupTitle: 'Attempts at a Solution' },
];

fullData.ENQUIRIES.forEach((e, idx) => {
  e.ktCode = ktCodes[idx].code;
  e.ktGroup = ktCodes[idx].group;
  e.ktGroupTitle = ktCodes[idx].groupTitle;
});

// 4. Refine Enquiry 3 Block 3 [3.3] for US Aid
fullData.ENQUIRIES[2].block3.title = 'The Law of Return, IDF Creation & US Economic Aid';
fullData.ENQUIRIES[2].block3.paras[1] =
  "This demographic explosion pushed the young state to the brink of economic collapse. Immigrants were housed in squalid transit camps (Ma'abarot) made of canvas tents and tin shacks, surviving under strict food rationing. Israel survived through vital **US economic and military aid to Israel**, private American loans, and the controversial 1952 Reparations Agreement with West Germany, which pumped $822 million into infrastructure. To integrate this diverse population and defend against hostile neighbors, David Ben-Gurion established the **Israeli Defence Forces (IDF)** as the central engine of national cohesion, introducing universal conscription. By transforming immigration into an engine of nation-building, Israel expanded its workforce and military readiness.";

// 5. Refine Enquiry 3 Block 4 [3.4] for Relations with Egypt
fullData.ENQUIRIES[2].block4.title =
  'Relations with Egypt: Fedayeen Border Raids & Unit 101 Reprisals';

// 6. Refine Enquiry 4 Block 1 [4.1] & Block 4 [4.4] for Gaza attack, Sinai attack & UAR 1958
fullData.ENQUIRIES[3].block1.paras[1] =
  "In February 1955, the **Israeli attack on Gaza** killed 38 Egyptian soldiers, exposing Egypt's catastrophic military weakness and humiliating Nasser. Rebuffed by the United States and Britain when requesting weapons, Nasser executed a stunning geopolitical masterstroke: in September 1955, he signed the massive Czech Arms Deal with the Soviet bloc, purchasing 200 modern MiG-15 fighter jets, 300 heavy tanks, and submarines in exchange for Egyptian cotton. For the first time, the Soviet Union gained a strategic foothold in the Middle East, terrifying British Prime Minister Anthony Eden and Israeli leaders who watched the balance of power shift. The Czech arms shipment shattered Western military dominance, demonstrating the growing geopolitical reach of the Soviet Union.";
fullData.ENQUIRIES[3].block4.paras[1] =
  "Under intense US pressure, Israel withdrew from Sinai in March 1957. In exchange, the United Nations deployed the first international peacekeeping force—the United Nations Emergency Force (UNEF)—along the border and at Sharm el-Sheikh, guaranteeing Israeli passage through the Straits of Tiran. The crisis elevated Nasser into the undisputed hero of Pan-Arabism, culminating in the **formation of the United Arab Republic (UAR) in 1958**—the political union of Egypt and Syria under Nasser's presidency. Although the UAR collapsed in 1961, it intensified Israeli fears of hostile Arab encirclement.";

// 7. Refine Enquiry 10 Block 2 [10.2] for Begin's reciprocal visit to Egypt 1977
fullData.ENQUIRIES[9].block2.paras[1] =
  'Realizing that conventional diplomacy was stalling, President Anwar Sadat decided on an electrifying gamble. On 9 November 1977, speaking to the Egyptian parliament, Sadat announced: "I am ready to go to the end of the world, and Israel will be astonished to hear me say that I am ready to go to their very home, to the Knesset itself." Ten days later, Sadat stepped out of an Egyptian airliner at Ben-Gurion Airport, greeted by Begin and a 21-gun salute. Addressing the Israeli Knesset, Sadat offered permanent peace based on justice. In December 1977, Prime Minister **Begin paid a historic reciprocal visit to Egypt**, meeting Sadat at the Ismailia Summit. Although bilateral talks stalled over the Palestinian issue, these direct visits broke three decades of psychological hostility, paving the way for American mediation.';

// 8. Refine Enquiry 11 Block 4 [11.4] for Arafat's renunciation of terrorism
fullData.ENQUIRIES[10].block4.paras[1] =
  "Sensing that political leadership was shifting away from exiled leaders in Tunis to the grassroots inside the territories, Yasser Arafat executed a seismic diplomatic pivot. In November 1988 in Algiers, the Palestine National Council declared an independent State of Palestine, implicitly accepting the 1947 partition. In December 1988, speaking to a special session of the UN General Assembly in Geneva, Arafat announced the **renunciation of terrorism** in all its forms, recognized Israel's right to exist in peace and security, and accepted UN Resolutions 242 and 338. This historic concession satisfied Washington's conditions, prompting the US to open formal diplomatic dialogue with the PLO, laying the diplomatic foundation for the 1990s peace process.";

// 9. Refine Enquiry 12 Block 1 [12.1] for Changing Superpower Policies & 1991 Gulf War
fullData.ENQUIRIES[11].block1.title =
  'Changing Superpower Policies: End of the Cold War, Gulf War & Madrid';
fullData.ENQUIRIES[11].block1.paras[0] =
  'Between 1989 and 1991, the international architecture of the Middle East was revolutionized by the **end of the Cold War**. The collapse of the Soviet Union eliminated the Arab world’s primary superpower patron and brought over one million Russian Jewish immigrants to Israel. In 1990, Iraqi dictator Saddam Hussein invaded Kuwait; Yasser Arafat critically supported Saddam, prompting Gulf states to expel 300,000 Palestinians and terminate PLO subsidies. Bankrupt and diplomatically isolated, the PLO was powerless. Following the **US victory in the 1991 Gulf War**—during which 39 Iraqi Scud missiles struck Tel Aviv—President George H.W. Bush and James Baker leveraged unprecedented American dominance to convene the October 1991 Madrid Peace Conference, compelling Israeli and Arab delegations to sit at the same table.';

// Write back to file formatted cleanly
const outputJs =
  '/**\n * scripts/cme_unified_textbook_data.cjs\n *\n * CANONICAL 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK DATA\n * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE History)\n */\n\n' +
  'const COVER_CONFIG = ' +
  JSON.stringify(fullData.COVER_CONFIG, null, 2) +
  ';\n\n' +
  'const MILESTONE_SPINE = ' +
  JSON.stringify(fullData.MILESTONE_SPINE, null, 2) +
  ';\n\n' +
  'const THEATER_MAP_CONFIG = ' +
  JSON.stringify(fullData.THEATER_MAP_CONFIG, null, 2) +
  ';\n\n' +
  'const ENQUIRIES = ' +
  JSON.stringify(fullData.ENQUIRIES, null, 2) +
  ';\n\n' +
  'const QUIZ_QUESTIONS = ' +
  JSON.stringify(fullData.QUIZ_QUESTIONS, null, 2) +
  ';\n\n' +
  'module.exports = {\n  COVER_CONFIG,\n  MILESTONE_SPINE,\n  THEATER_MAP_CONFIG,\n  ENQUIRIES,\n  QUIZ_QUESTIONS\n};\n';

fs.writeFileSync(filePath, outputJs, 'utf8');
console.log('Successfully updated scripts/cme_unified_textbook_data.cjs!');
