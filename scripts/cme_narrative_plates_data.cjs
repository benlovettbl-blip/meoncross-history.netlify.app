// Comprehensive pedagogical 3-layer architecture data for Conflict in the Middle East (1945-1995)
// 12 Lessons: 24 Narrative Visual Plates (2 per lesson, alternating rhythm)

const narrativePlatesData = {
  lesson_1: [
    {
      blockIndex: 0,
      image: "/images/cme_allenby_jerusalem_1917.jpg",
      image_alt: "General Edmund Allenby entering Jerusalem on foot through Jaffa Gate in December 1917",
      caption: "General Allenby Enters Jerusalem (December 1917): Disclosing British military conquest of Ottoman Palestine, entering on foot out of respect for the holy city.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_middle_east_mandates_1921_map.jpg",
      image_alt: "Map of the League of Nations Middle East Mandates established at San Remo and the Treaty of Sèvres, 1920-1921",
      caption: "League of Nations Mandates (1921): Carving the collapsed Ottoman Empire into British (Palestine, Transjordan, Iraq) and French (Syria, Lebanon) administrative zones.",
      isReversed: true
    }
  ],
  lesson_2: [
    {
      blockIndex: 0,
      image: "/units/cme_new/assets/king_david_ruins.png",
      image_alt: "The devastated southwestern wing of the King David Hotel in Jerusalem following the Irgun bombing in July 1946",
      caption: "The King David Hotel Bombing (22 July 1946): Menachem Begin's Irgun destroyed British military headquarters, killing 91 people and shattering British resolve.",
      isReversed: false
    },
    {
      blockIndex: 4,
      image: "/images/cme_1948_arab_invasion_map.png",
      image_alt: "Military map depicting the multi-front invasion by five Arab armies into the former Mandate territory on 15 May 1948",
      caption: "The 1948 Arab-Israeli War: Egypt, Jordan, Syria, Iraq, and Lebanon invaded the fledgling state immediately following the termination of the British Mandate.",
      isReversed: true
    }
  ],
  lesson_3: [
    {
      blockIndex: 0,
      image: "/images/cme_palestinian_refugees_1948.jpg",
      image_alt: "Palestinian families and children fleeing their ancestral villages with bundles of possessions during the 1948 war",
      caption: "The Nakba ('The Catastrophe', 1948): Over 700,000 Palestinian Arabs were expelled or fled from their homes during the military campaigns of 1948.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/cme_palestinian_refugees_leaving_gaza.webp",
      image_alt: "Displaced Palestinian refugees arriving in designated UN camps in the Gaza Strip, 1949",
      caption: "Refugee Dispersal (1949): Stateless Palestinian populations concentrated in sprawling camps across Gaza, the West Bank, Jordan, Syria, and Lebanon.",
      isReversed: true
    }
  ],
  lesson_4: [
    {
      blockIndex: 0,
      image: "/images/cme_port_said_british_troops_1956.jpg",
      image_alt: "British Royal Marine Commandos landing from assault craft onto the quayside at Port Said during Operation Musketeer, November 1956",
      caption: "Anglo-French Invasion at Port Said (November 1956): British and French troops deployed under the secret Sèvres Protocol to seize the nationalised Suez Canal.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/cme_port_said_from_air.jpg",
      image_alt: "Aerial reconnaissance photograph showing smoke rising over Port Said and scuttled ships blocking the northern mouth of the Suez Canal, November 1956",
      caption: "Air Reconnaissance over Port Said: Demonstrating the physical destruction of harbour infrastructure and Egypt's defensive scuttling of canal shipping.",
      isReversed: true
    }
  ],
  lesson_5: [
    {
      blockIndex: 0,
      image: "/images/cme_cairo_summit_1964.jpg",
      image_alt: "Arab League leaders assembled at the First Arab Summit Conference in Cairo, January 1964",
      caption: "The First Arab League Summit (Cairo, 1964): Convened by President Nasser to coordinate pan-Arab resistance against Israel's National Water Carrier diversion.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_sinai_peninsula_map.jpg",
      image_alt: "Topographical overview map of the Sinai Peninsula showing the Straits of Tiran, Sharm el-Sheikh, and Israeli maritime corridors",
      caption: "Strategic Geography of Sinai: The narrow Straits of Tiran at Sharm el-Sheikh represented Israel's vital maritime lifeline to the Red Sea and Asia.",
      isReversed: true
    }
  ],
  lesson_6: [
    {
      blockIndex: 0,
      image: "/images/cme_six_day_war_airfield_1967.jpg",
      image_alt: "Burned out Egyptian MiG-21 jet fighters destroyed on tarmac runways during Operation Focus, 5 June 1967",
      caption: "Operation Focus (5 June 1967): The Israeli Air Force destroyed over 300 Egyptian combat aircraft on the ground in three hours, securing absolute air supremacy.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_1967_sinai_campaign_map.jpg",
      image_alt: "Military operational map showing the three-pronged IDF armored thrusts across the Sinai Peninsula toward the Suez Canal, June 1967",
      caption: "Sinai Blitzkrieg (5–8 June 1967): Rapid IDF armored divisions commanded by Tal, Yoffe, and Sharon outflanked Egyptian defenses and sealed the Mitla Pass.",
      isReversed: true
    }
  ],
  lesson_7: [
    {
      blockIndex: 0,
      image: "/units/cme_new/assets/conquered_territories_1967.png",
      image_alt: "Map displaying the post-1967 Israeli occupied territories: the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights",
      caption: "The Conquered Territories (June 1967): Israel quadrupled its territorial footprint, bringing over one million Palestinian Arabs under direct military administration.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/units/cme_new/assets/map_lesson4.png",
      image_alt: "Map showing strategic early Jewish settlement outposts established in the Jordan Valley under the Allon Plan framework",
      caption: "Settlement Geography: The inception of ideological and strategic Israeli settlements across the West Bank and Golan Heights to secure permanent border buffers.",
      isReversed: true
    }
  ],
  lesson_8: [
    {
      blockIndex: 0,
      image: "/images/cme_jordan_fedayeen_1970_map.png",
      image_alt: "Tactical map showing the Palestinian fedayeen armed enclaves in Amman and the Jordanian Army counter-offensive during Black September 1970",
      caption: "Black September (September 1970): King Hussein deployed the Royal Jordanian Army to crush armed PLO militias operating as an autonomous 'state-within-a-state'.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_munich_1972_balcony.jpg",
      image_alt: "Masked Black September guerrilla standing on the balcony of 31 Connollystraße in the Munich Olympic Village, September 1972",
      caption: "The Munich Olympics Massacre (September 1972): Palestinian militant group Black September murdered eleven Israeli athletes, thrusting the conflict onto world television.",
      isReversed: true
    }
  ],
  lesson_9: [
    {
      blockIndex: 0,
      image: "/images/cme_yom_kippur_1973_map.png",
      image_alt: "Operational theatre map showing the coordinated Egyptian assault across the Suez Canal and Syrian push on the Golan Heights on 6 October 1973",
      caption: "The Yom Kippur Surprise Attack (6 October 1973): Egyptian and Syrian forces shattered Israeli defensive lines during the holiest day in Judaism.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_yom_kippur_golan_1973_map.jpg",
      image_alt: "Battle map of the Syrian armoured offensive across the Golan Heights and the Israeli 7th Armoured Brigade defense in the Valley of Tears",
      caption: "The Battle of the Golan (October 1973): Outnumbered Israeli Centurion crews repelled over 800 Syrian T-55 and T-62 tanks before launching a counter-thrust toward Damascus.",
      isReversed: true
    }
  ],
  lesson_10: [
    {
      blockIndex: 0,
      image: "/images/cme_camp_david_1978.jpg",
      image_alt: "US President Jimmy Carter sitting between Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin at Camp David, September 1978",
      caption: "The Camp David Summit (September 1978): Thirteen days of intensive, secluded diplomacy produced the historic framework for the first Arab-Israeli peace accord.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_sadat_memorial_1981.jpg",
      image_alt: "The Unknown Soldier Memorial in Nasr City, Cairo, where Anwar Sadat was assassinated during the annual military victory parade on 6 October 1981",
      caption: "Assassination of Anwar Sadat (6 October 1981): Islamic Jihad militants murdered Sadat during a military parade, viewing the separate peace with Israel as treason.",
      isReversed: true
    }
  ],
  lesson_11: [
    {
      blockIndex: 0,
      image: "/images/cme_operation_litani_1978_map.jpg",
      image_alt: "Military map depicting Operation Litani, the Israeli invasion of southern Lebanon up to the Litani River in March 1978",
      caption: "Operation Litani (March 1978): The IDF invaded southern Lebanon to eliminate PLO cross-border rocket launch sites and establish a Christian militia buffer zone.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/images/cme_unifil_lebanon_map.jpg",
      image_alt: "United Nations map showing the UNIFIL peacekeeping deployment area along the Lebanese-Israeli border established by UN Resolution 425",
      caption: "UNIFIL Buffer Zone (1978): United Nations peacekeepers deployed along the southern Lebanese border following the withdrawal of Israeli forces.",
      isReversed: true
    }
  ],
  lesson_12: [
    {
      blockIndex: 0,
      image: "/images/cme_madrid_conference_1991.jpg",
      image_alt: "Plenary assembly of the Madrid Middle East Peace Conference co-chaired by President George H.W. Bush and President Mikhail Gorbachev, October 1991",
      caption: "The Madrid Peace Conference (October 1991): Post-Cold War summit bringing Israeli, Arab state, and Palestinian representatives into face-to-face negotiations.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/units/cme_new/assets/rabin_peace_rally_1995.jpg",
      image_alt: "Prime Minister Yitzhak Rabin addressing over 100,000 peace supporters at Kings of Israel Square in Tel Aviv on 4 November 1995",
      caption: "The Tel Aviv Peace Rally (4 November 1995): Moments before his assassination by a Jewish religious extremist, Yitzhak Rabin sang 'Shir LaShalom' in support of Oslo.",
      isReversed: true
    }
  ]
};

module.exports = { narrativePlatesData };
