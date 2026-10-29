const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units/cme_new/data.js');
const publicDataJsPath = path.join(rootDir, 'public/units/cme_new/data.js');

const cmeData = require(dataJsPath).default || require(dataJsPath);
const narrativeTexts = require('./cme_lesson_narrative_text.cjs');

// Plates mapping extracted from existing blocks
const plates = {
  lesson_1: [
    {
      image: '/images/cme_allenby_jerusalem_1917.jpg',
      image_alt: 'General Allenby entering Jerusalem on foot through the Jaffa Gate, December 1917',
      caption:
        'General Allenby Enters Jerusalem (December 1917): Disclosing British military conquest of Ottoman Palestine, entering on foot out of respect for the holy city.',
    },
    {
      image: '/images/cme_middle_east_mandates_1921_map.jpg',
      image_alt: 'League of Nations Mandates Map of the Middle East, 1921',
      caption:
        'League of Nations Mandates (1921): Carving the collapsed Ottoman Empire into British (Palestine, Transjordan, Iraq) and French (Syria, Lebanon) administrative zones.',
    },
  ],
  lesson_2: [
    {
      image: '/units/cme_new/assets/king_david_ruins.png',
      image_alt:
        'The devastated southwestern wing of the King David Hotel in Jerusalem following the Irgun bombing in July 1946',
      caption:
        "The King David Hotel Bombing (22 July 1946): Menachem Begin's Irgun destroyed British military headquarters, killing 91 people and shattering British resolve.",
    },
    {
      image: '/images/cme_1948_arab_invasion_map.png',
      image_alt:
        'Map of the 1948 Arab-Israeli War showing invading armies from Egypt, Transjordan, Syria, Iraq, and Lebanon',
      caption:
        'The 1948 Arab-Israeli War: Egypt, Jordan, Syria, Iraq, and Lebanon invaded the fledgling state immediately following the termination of the British Mandate.',
    },
  ],
  lesson_3: [
    {
      image: '/images/cme_palestinian_refugees_1948.jpg',
      image_alt: 'Displaced Palestinian refugees carrying possessions along rural roads in 1948',
      caption:
        "The Nakba ('The Catastrophe', 1948): Over 700,000 Palestinian Arabs were expelled or fled from their homes during the military campaigns of 1948.",
    },
    {
      image: '/images/cme_palestinian_refugees_leaving_gaza.webp',
      image_alt: 'Stateless Palestinian refugees gathered in emergency encampments in Gaza, 1949',
      caption:
        'Refugee Dispersal (1949): Stateless Palestinian populations concentrated in sprawling camps across Gaza, the West Bank, Jordan, Syria, and Lebanon.',
    },
  ],
  lesson_4: [
    {
      image: '/images/cme_port_said_british_troops_1956.jpg',
      image_alt:
        'British troops patrolling the streets of Port Said during the Anglo-French Suez operation in November 1956',
      caption:
        'Anglo-French Invasion at Port Said (November 1956): British and French troops deployed under the secret Sèvres Protocol to seize the nationalised Suez Canal.',
    },
    {
      image: '/images/cme_port_said_from_air.jpg',
      image_alt:
        'Aerial photograph of Port Said harbour with sunken ships blocking the Suez Canal waterway',
      caption:
        "Air Reconnaissance over Port Said: Demonstrating the physical destruction of harbour infrastructure and Egypt's defensive scuttling of canal shipping.",
    },
  ],
  lesson_6: [
    {
      image: '/images/cme_cairo_summit_1964.jpg',
      image_alt:
        'Arab League leaders assembled at the First Arab Summit Conference in Cairo, January 1964',
      caption:
        "The First Arab League Summit (Cairo, 1964): Convened by President Nasser to coordinate pan-Arab resistance against Israel's National Water Carrier diversion.",
    },
    {
      image: '/images/cme_sinai_peninsula_map.jpg',
      image_alt:
        'Topographical overview map of the Sinai Peninsula showing the Straits of Tiran, Sharm el-Sheikh, and Israeli maritime corridors',
      caption:
        "Strategic Geography of Sinai: The narrow Straits of Tiran at Sharm el-Sheikh represented Israel's vital maritime lifeline to the Red Sea and Asia.",
    },
  ],
  lesson_7: [
    {
      image: '/images/cme_six_day_war_airfield_1967.jpg',
      image_alt:
        'Burned out Egyptian MiG-21 jet fighters destroyed on tarmac runways during Operation Focus, 5 June 1967',
      caption:
        'Operation Focus (5 June 1967): The Israeli Air Force destroyed over 300 Egyptian combat aircraft on the ground in three hours, securing absolute air supremacy.',
    },
    {
      image: '/images/cme_1967_sinai_campaign_map.jpg',
      image_alt:
        'Military operational map showing the three-pronged IDF armored thrusts across the Sinai Peninsula toward the Suez Canal, June 1967',
      caption:
        'Sinai Blitzkrieg (5–8 June 1967): Rapid IDF armored divisions commanded by Tal, Yoffe, and Sharon outflanked Egyptian defenses and sealed the Mitla Pass.',
    },
  ],
  lesson_8: [
    {
      image: '/units/cme_new/assets/conquered_territories_1967.png',
      image_alt:
        'Map displaying the post-1967 Israeli occupied territories: the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights',
      caption:
        'The Conquered Territories (June 1967): Israel quadrupled its territorial footprint, bringing over one million Palestinian Arabs under direct military administration.',
    },
    {
      image: '/units/cme_new/assets/map_lesson4.png',
      image_alt:
        'Map showing strategic early Jewish settlement outposts established in the Jordan Valley under the Allon Plan framework',
      caption:
        'Settlement Geography: The inception of ideological and strategic Israeli settlements across the West Bank and Golan Heights to secure permanent border buffers.',
    },
  ],
  lesson_9: [
    {
      image: '/images/cme_jordan_fedayeen_1970_map.png',
      image_alt:
        'Tactical map showing the Palestinian fedayeen armed enclaves in Amman and the Jordanian Army counter-offensive during Black September 1970',
      caption:
        "Black September (September 1970): King Hussein deployed the Royal Jordanian Army to crush armed PLO militias operating as an autonomous 'state-within-a-state'.",
    },
    {
      image: '/images/cme_munich_1972_balcony.jpg',
      image_alt:
        'Masked Black September guerrilla standing on the balcony of 31 Connollystraße in the Munich Olympic Village, September 1972',
      caption:
        'The Munich Olympics Massacre (September 1972): Palestinian militant group Black September murdered eleven Israeli athletes, thrusting the conflict onto world television.',
    },
  ],
  lesson_10: [
    {
      image: '/images/cme_yom_kippur_1973_map.png',
      image_alt:
        'Operational theatre map showing the coordinated Egyptian assault across the Suez Canal and Syrian push on the Golan Heights on 6 October 1973',
      caption:
        'The Yom Kippur Surprise Attack (6 October 1973): Egyptian and Syrian forces shattered Israeli defensive lines during the holiest day in Judaism.',
    },
    {
      image: '/images/cme_yom_kippur_golan_1973_map.jpg',
      image_alt:
        'Battle map of the Syrian armoured offensive across the Golan Heights and the Israeli 7th Armoured Brigade defense in the Valley of Tears',
      caption:
        'The Battle of the Golan (October 1973): Outnumbered Israeli Centurion crews repelled over 800 Syrian T-55 and T-62 tanks before launching a counter-thrust toward Damascus.',
    },
  ],
  lesson_11: [
    {
      image: '/images/cme_camp_david_1978.jpg',
      image_alt:
        'US President Jimmy Carter sitting between Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin at Camp David, September 1978',
      caption:
        'The Camp David Summit (September 1978): Thirteen days of intensive, secluded diplomacy produced the historic framework for the first Arab-Israeli peace accord.',
    },
    {
      image: '/images/cme_sadat_memorial_1981.jpg',
      image_alt:
        'The Unknown Soldier Memorial in Nasr City, Cairo, where Anwar Sadat was assassinated during the annual military victory parade on 6 October 1981',
      caption:
        'Assassination of Anwar Sadat (6 October 1981): Islamic Jihad militants murdered Sadat during a military parade, viewing the separate peace with Israel as treason.',
    },
  ],
  lesson_12: [
    {
      image: '/images/cme_operation_litani_1978_map.jpg',
      image_alt:
        'Military map depicting Operation Litani, the Israeli invasion of southern Lebanon up to the Litani River in March 1978',
      caption:
        'Operation Litani (March 1978): The IDF invaded southern Lebanon to eliminate PLO cross-border rocket launch sites and establish a Christian militia buffer zone.',
    },
    {
      image: '/images/cme_unifil_lebanon_map.jpg',
      image_alt:
        'United Nations map showing the UNIFIL peacekeeping deployment area along the Lebanese-Israeli border established by UN Resolution 425',
      caption:
        'UNIFIL Buffer Zone (1978): United Nations peacekeepers deployed along the southern Lebanese border following the withdrawal of Israeli forces.',
    },
  ],
  lesson_13: [
    {
      image: '/images/cme_madrid_conference_1991.jpg',
      image_alt:
        'Plenary assembly of the Madrid Middle East Peace Conference co-chaired by President George H.W. Bush and President Mikhail Gorbachev, October 1991',
      caption:
        'The Madrid Peace Conference (October 1991): Post-Cold War summit bringing Israeli, Arab state, and Palestinian representatives into face-to-face negotiations.',
    },
    {
      image: '/units/cme_new/assets/rabin_peace_rally_1995.jpg',
      image_alt:
        'Prime Minister Yitzhak Rabin addressing over 100,000 peace supporters at Kings of Israel Square in Tel Aviv on 4 November 1995',
      caption:
        "The Tel Aviv Peace Rally (4 November 1995): Moments before his assassination by a Jewish religious extremist, Yitzhak Rabin sang 'Shir LaShalom' in support of Oslo.",
    },
  ],
};

// Update lesson_2 stages to match Page 4 of the printed workbook 100%
const lesson2 = cmeData.lessons.find((l) => l.id === 'lesson_2');
if (lesson2) {
  lesson2.causal_domino_spine.stages = [
    {
      step: 1,
      date: '1945–1946',
      title: 'Holocaust Survivors & The 1,500 Monthly Limit',
      actor: 'British Foreign Office & Jewish Survivors',
      tag: 'Immigration Cap',
      trigger:
        'British Foreign Secretary Ernest Bevin strictly enforces the 1939 White Paper limit of 1,500 Jewish immigrants per month, deporting intercepted Holocaust survivors to Cyprus.',
      because:
        'Britain feared that permitting unrestricted Jewish immigration would provoke an all-out Arab uprising that would jeopardize British military bases and Middle Eastern oil supplies.',
      therefore:
        'Enraged Jewish survivors and Zionist paramilitaries who viewed the immigration cap as a death sentence for European Jewry, triggering armed rebellion against British rule.',
      connective:
        'When peaceful appeals failed, Zionist underground paramilitaries joined forces to launch an armed insurgency...',
      exam_link:
        'Q1 Consequence: Convinced Zionist leaders that Britain had abandoned its Balfour pledges, leading directly to armed resistance.',
      question: 'Why did Bevin strictly enforce the 1,500 monthly refugee immigration limit?',
    },
    {
      step: 2,
      date: 'Nov 1945 – 1946',
      title: 'The Zionist Paramilitary Insurgency',
      actor: 'United Resistance Movement (Haganah, Irgun, Lehi)',
      tag: 'Armed Insurgency',
      trigger:
        'The Haganah, Irgun, and Lehi unite in the United Resistance Movement to wage coordinated guerrilla sabotage against British military and communications infrastructure.',
      because:
        'Zionist leaders concluded that only armed sabotage could make the Mandate ungovernable and force Britain to abandon its restrictive immigration limits.',
      therefore:
        'Paralyzed British rail networks and coastal radar stations, prompting Britain to launch Operation Agatha and arrest thousands of Jewish leaders.',
      connective:
        'The arrest of Zionist leaders during Operation Agatha prompted the Irgun to strike at the very heart of British administration...',
      exam_link:
        'Q2 Narrative Account: Marked the collapse of Anglo-Zionist cooperation and initiated the cycle of armed escalation that broke British control.',
      question: 'How did Zionist paramilitaries paralyze British infrastructure in Palestine?',
    },
    {
      step: 3,
      date: '22 July 1946',
      title: 'The King David Hotel Bombing',
      actor: 'Irgun Paramilitaries',
      tag: 'Headquarters Destroyed',
      trigger:
        'Irgun operatives disguised as milkmen detonate 350kg of explosives in the basement of the King David Hotel, destroying the British Military Headquarters and Civil Secretariat.',
      because:
        'The Irgun sought to destroy British intelligence records seized during Operation Agatha and prove that British forces could not protect their own headquarters.',
      therefore:
        'Killed 91 people, shattered British administrative prestige, and forced British personnel behind fortified security compounds known as "Bevingrads".',
      connective:
        'As British authority retreated into fortified zones, the Irgun escalated its retaliation against British military personnel...',
      exam_link:
        'Q3 Explain the Importance: Crucial turning point proving to the British government that Palestine could not be maintained without unsustainable military costs.',
      question: 'Why did targeting the King David Hotel prove Palestine was ungovernable?',
    },
    {
      step: 4,
      date: 'July 1947',
      title: 'The Sergeants Affair & Public Backlash',
      actor: 'Irgun & British Public',
      tag: 'Retaliatory Execution',
      trigger:
        'The Irgun hangs two abducted British intelligence sergeants (Clifford Martin and Mervyn Paice) and booby-traps one body in retaliation for British executions of Irgun members.',
      because:
        'Menachem Begin sought to establish deterrence against British military courts executing Zionist underground fighters.',
      therefore:
        'Triggered anti-Jewish riots in British cities and provoked overwhelming British public demand to bring British soldiers home from Palestine.',
      connective:
        'Domestic outrage in Britain coincided with a global international public relations disaster on the high seas...',
      exam_link:
        'Q1 Consequence: Hardened British domestic opinion against remaining in Palestine, accelerating the decision to withdraw.',
      question: 'Why did the Sergeants Affair trigger public outrage in Britain?',
    },
    {
      step: 5,
      date: 'Summer–Nov 1947',
      title: 'The SS Exodus Crisis & Handover to the UN',
      actor: 'Royal Navy & UNSCOP',
      tag: 'UN Handover',
      trigger:
        'The Royal Navy intercepts the refugee ship SS Exodus carrying 4,500 Holocaust survivors, forcibly returning them to detention camps in Germany before the eyes of UNSCOP.',
      because:
        'Foreign Secretary Bevin was determined to deter future illegal immigration, but the sight of survivors forced onto German soil provoked worldwide condemnation.',
      therefore:
        'Severely alienated US President Truman and destroyed British moral authority, confirming Britain’s decision to surrender the Mandate to the United Nations.',
      connective:
        'Having announced its intention to surrender the Mandate, Britain left the fate of Palestine in the hands of the United Nations...',
      exam_link:
        'Q1 Consequence: Decisively influenced UNSCOP delegates visiting Palestine to recommend immediate termination of British rule and partition.',
      question: 'How did the SS Exodus crisis force Britain to surrender the Mandate to the UN?',
    },
  ];
}

console.log('Harmonizing narrative blocks across all 12 CME lessons to 5 blocks:');

cmeData.lessons.forEach((l, idx) => {
  const lessonStages = l.causal_domino_spine.stages;
  const lessonTexts = narrativeTexts[l.id];

  if (!lessonTexts || lessonTexts.length !== 5) {
    console.error(`Missing or incomplete narrative texts for ${l.id}`);
    return;
  }

  const newBlocks = lessonStages.map((st, sIdx) => {
    const stepNum = st.step;
    const textEntry = lessonTexts[sIdx];
    const block = {
      title: st.title,
      paragraphs: [textEntry.p1, textEntry.p2],
      act: stepNum,
      act_title: `Stage ${stepNum}: ${st.title} — ${st.question}`,
      theme_heading: st.title,
      text: `${textEntry.p1}\n\n${textEntry.p2}`,
      sources: [l.sources[sIdx]],
    };

    if (stepNum === 2 && plates[l.id] && plates[l.id][0]) {
      block.image = plates[l.id][0].image;
      block.image_alt = plates[l.id][0].image_alt;
      block.caption = plates[l.id][0].caption;
      block.isReversed = false;
    } else if (stepNum === 4 && plates[l.id] && plates[l.id][1]) {
      block.image = plates[l.id][1].image;
      block.image_alt = plates[l.id][1].image_alt;
      block.caption = plates[l.id][1].caption;
      block.isReversed = true;
    }

    return block;
  });

  l.narrative_blocks = newBlocks;
  console.log(`  ✅ Lesson ${idx + 1} (${l.id}): 5 narrative blocks harmonized.`);
});

// Format JavaScript output
const jsContent = `const cme_new_data = ${JSON.stringify(cmeData, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cme_new_data;
}

export default cme_new_data;
`;

fs.writeFileSync(dataJsPath, jsContent, 'utf8');
fs.writeFileSync(publicDataJsPath, jsContent, 'utf8');

console.log(`\nSuccessfully written harmonized 5-block data to:`);
console.log(`  - ${dataJsPath}`);
console.log(`  - ${publicDataJsPath}`);
