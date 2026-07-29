export interface MapLocation {
  lat: number;
  lng: number;
  title: string;
  body: string;
  imageUrl?: string;
  scholarlyContext?: string;
  researchLinks?: { label: string; url: string }[];
  subtopicId?: string;
  isIsraeli?: boolean;
}

export const MAP_LOCATIONS_CME: MapLocation[] = [
{
    lat: 31.7683,
    lng: 35.2137,
    title: "Jerusalem: Divided City and Holy Capital",
    body: "The central point of religious and political conflict. Designated an international zone by the UN in 1947, it was divided in 1948 and fully unified under Israeli control in 1967.",
    imageUrl: "assets/sources/un_partition_plan_1947.png", // Fallback to partition plan or similar if exists
    scholarlyContext: "Jerusalem's spatial layout reflects the deep political divisions of the conflict. Under the 1947 UN Partition Plan (Resolution 181), it was designated a corpus separatum (international city). Following the 1948 war, the city was cleaved in two by the 'Green Line'—West Jerusalem under Israeli sovereignty and East Jerusalem (including the historic Old City and holy sites) annexed by Jordan. During the 1967 Six-Day War, Israeli paratroopers captured East Jerusalem, and the state officially annexed the unified city. This remains one of the most explosive final-status issues in diplomatic peace negotiations.",
    researchLinks: [
      { label: "UN Resolution 181 Document", url: "https://www.un.org/unispal/document/auto-insert-185393/" },
      { label: "Six-Day War Historical Archives", url: "https://www.sixdaywar.org/jerusalem-reunified/" }
    ],
    subtopicId: "subtopic_1_1",
    isIsraeli: true
  },
  {
    lat: 31.2653,
    lng: 32.3019,
    title: "Suez Canal: The Imperial Waterway",
    body: "The strategic 120-mile shipping link connecting the Mediterranean to the Red Sea, nationalized by Egyptian President Nasser in July 1956.",
    imageUrl: "assets/sources/suez_crisis_map.png",
    scholarlyContext: "Completed in 1869, the Suez Canal served as a vital maritime trade lane, particularly for Western European oil supplies. In July 1956, Egyptian President Gamal Abdel Nasser nationalized the British- and French-owned Suez Canal Company in retaliation for the sudden withdrawal of US and British funding for the Aswan High Dam. Nasser's action challenged Western imperial authority in the Middle East and triggered the Protocol of Sèvres collusion, leading to a tripartite military invasion by Britain, France, and Israel in October 1956.",
    researchLinks: [
      { label: "Suez Crisis Records - National Archives", url: "https://www.nationalarchives.gov.uk/cabinetpapers/themes/suez-crisis.htm" },
      { label: "Nasser Alexandria Speech Audio Transcript", url: "https://www.marxists.org/subject/arab-world/nasser/1956/07/26.htm" }
    ],
    subtopicId: "subtopic_1_3",
    isIsraeli: false
  },
  {
    lat: 30.0411,
    lng: 33.1025,
    title: "Mitla Pass: The Desert Choke Point",
    body: "A critical 20-mile-long pass through the Sinai mountains, serving as a tactical gateway and battleground in 1956, 1967, and 1973.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "Mitla Pass is a strategic pass in western Sinai, bounded by steep sand dunes and rocky ridges. In the 1956 Suez Crisis, it was the site of a controversial paratrooper drop by Ariel Sharon's brigade, aiming to secure the pass as a pretext for the Anglo-French landing. In 1967, retreating Egyptian tanks were trapped in the pass by Israeli airstrikes, creating massive armored casualties. In 1973, it acted as a defensive shield for the IDF against Egyptian attempts to breakout deeper into the Sinai Peninsula.",
    researchLinks: [
      { label: "IDF Historical Archives - Mitla Pass drop", url: "https://www.idf.il/en/" }
    ],
    subtopicId: "subtopic_1_3",
    isIsraeli: true
  },
  {
    lat: 32.9646,
    lng: 35.7997,
    title: "Golan Heights: The Strategic High Ground",
    body: "A volcanic plateau overlooking northern Israel, captured from Syria in 1967 and site of the intense 1973 Valley of Tears tank battles.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "The Golan Heights holds immense military importance due to its commanding elevation, which overlooks the Sea of Galilee and northern Israeli settlements. Prior to 1967, Syrian forces used the plateau to shell Israeli border towns. Israel captured the heights in a grueling uphill infantry assault on 9-10 June 1967. In October 1973, Syrian tank divisions launched a surprise attack to retake the plateau. A vastly outnumbered Israeli force held the line in the northern Golan (the 'Valley of Tears') before counter-attacking toward Damascus.",
    researchLinks: [
      { label: "Golan Heights Geography and Conflicts", url: "https://www.britannica.com/place/Golan-Heights" },
      { label: "1973 Yom Kippur War Battlefield Studies", url: "https://www.history.com/topics/middle-east/yom-kippur-war" }
    ],
    subtopicId: "subtopic_2_1",
    isIsraeli: true
  },
  {
    lat: 31.3547,
    lng: 34.3088,
    title: "Gaza Strip: Refugee Hub and Birthplace of the Intifada",
    body: "A narrow coastal strip packed with Palestinian refugees, governed by Egypt from 1949 to 1967, and site of the 1987 First Intifada outbreak.",
    imageUrl: "assets/sources/palestinian_refugees_1948.jpg",
    scholarlyContext: "The Gaza Strip's modern boundaries were defined by the 1949 Armistice Agreements, packing over 200,000 displaced Palestinians into a 140-square-mile strip of land. Governed by Egypt, it served as a launching ground for Fedayeen guerrilla raids into Israel in the 1950s, provoking severe Israeli retaliations (e.g. the 1955 Gaza Raid). Israel captured Gaza in 1967. In December 1987, decades of economic and political frustration erupted in the Jabalia refugee camp, launching the stone-throwing civil disobedience of the First Intifada.",
    researchLinks: [
      { label: "UNRWA Gaza Refugee Camp Archives", url: "https://www.unrwa.org/where-we-work/gaza-strip" },
      { label: "History of the First Intifada - King Institute", url: "https://kinginstitute.stanford.edu/encyclopedia/first-palestinian-intifada" }
    ],
    subtopicId: "subtopic_1_2",
    isIsraeli: false
  },
  {
    lat: 31.9029,
    lng: 35.2062,
    title: "West Bank: Disputed Hills and Oslo Zones",
    body: "Occupied by Jordan in 1948, captured by Israel in 1967, and divided into Areas A, B, and C under the 1993/1995 Oslo Accords.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "The West Bank contains the historical highlands of Judea and Samaria. Annexed by Jordan in 1950, it was captured by the IDF in June 1967, placing over one million Palestinians under military rule and initiating the growth of Israeli settlements. The 1993 and 1995 Oslo Accords sought to establish a transition to self-rule, dividing the West Bank into a patchwork of Area A (Palestinian security and civil control), Area B (Palestinian civil control, joint security), and Area C (full Israeli security and civil control).",
    researchLinks: [
      { label: "Oslo Accords Map and Text - UN", url: "https://peacemaker.un.org/israelpalestine-osloaccord93" }
    ],
    subtopicId: "subtopic_3_3",
    isIsraeli: true
  },
  {
    lat: 30.0444,
    lng: 31.2357,
    title: "Cairo: The Heart of Pan-Arabism",
    body: "The capital of Egypt. Hub of Nasser's revolutionary government and the strategic planning center for the 1973 surprise crossing of the Suez Canal.",
    imageUrl: "assets/sources/nasser_nationalizing_suez_1956.jpg",
    scholarlyContext: "Cairo served as the political and media epicenter of the Arab world throughout the mid-20th century. Following the 1952 Free Officers revolution that deposed King Farouk, Cairo became the command center of Pan-Arabism, hosting the 'Voice of the Arabs' radio network that broadcast anti-colonial and anti-Zionist rhetoric across the region. In 1973, President Anwar Sadat used the military headquarters in Cairo to plan Operation Badr—the highly coordinated surprise crossing of the Suez Canal that initiated the Yom Kippur War.",
    researchLinks: [
      { label: "Egypt Free Officers Revolution - History", url: "https://www.history.com/this-day-in-history/egyptian-monarchy-overthrown" }
    ],
    subtopicId: "subtopic_1_3",
    isIsraeli: false
  },
  {
    lat: 33.5138,
    lng: 36.2765,
    title: "Damascus: The Northern Coalition Hub",
    body: "Capital of Syria. A co-belligerent with Egypt in the 1948, 1967, and 1973 wars, serving as a political center for the Ba'athist military alliance.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "Damascus played a critical role in regional military coalitions against Israel. In 1958, Syria joined Egypt in the United Arab Republic (UAR) union governed from Cairo. Under the Ba'ath party in the 1960s, Damascus sponsored Fatah raids and clashed with Israel over the diversion of Jordan River headwaters. During the 1973 war, the Syrian military command in Damascus launched a massive armored offensive into the Golan Heights, which eventually resulted in Israeli counter-attacks advancing within artillery range of Damascus outskirts.",
    researchLinks: [
      { label: "Ba'ath Party and Syrian History Study", url: "https://www.britannica.com/topic/Baath-Party" }
    ],
    subtopicId: "subtopic_2_1",
    isIsraeli: false
  },
  {
    lat: 33.8938,
    lng: 35.5018,
    title: "Beirut: PLO Stronghold and the 1982 Siege",
    body: "The capital of Lebanon. The PLO established its headquarters here in 1970, prompting the 1982 Israeli invasion and the Siege of Beirut.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "Following their violent expulsion from Jordan during Black September in 1970, Yasser Arafat and the PLO relocated their command to West Beirut, turning southern Lebanon into 'Fatahland' to launch rocket attacks on northern Israel. In June 1982, Defense Minister Ariel Sharon led the IDF to invade Lebanon, besieging West Beirut. Under intense international mediation, Arafat and the PLO were forced to evacuate Lebanon by sea, relocating their headquarters to Tunis.",
    researchLinks: [
      { label: "The 1982 Lebanon War - Stanford Archives", url: "https://kinginstitute.stanford.edu/encyclopedia/lebanon-war" }
    ],
    subtopicId: "subtopic_3_2",
    isIsraeli: false
  },
  {
    lat: 27.9158,
    lng: 34.3300,
    title: "Sharm el-Sheikh: Guard of the Straits of Tiran",
    body: "A strategic port city at the tip of the Sinai Peninsula, controlling access to the Straits of Tiran and Israel's southern sea access.",
    imageUrl: "assets/sources/1949_armistice_map.png",
    scholarlyContext: "Sharm el-Sheikh overlooks the narrow Straits of Tiran, a geographical choke point leading into the Gulf of Aqaba. Any blockade of these straits cuts off Israel's only southern port of Eilat, strangling oil imports and trade. Egypt blockaded the Straits in 1956 (sparking the Suez Campaign) and again in May 1967. Nasser's deployment of Egyptian troops to Sharm el-Sheikh to enforce the 1967 blockade was the decisive casus belli that triggered Israel's pre-emptive airstrikes on 5 June 1967.",
    researchLinks: [
      { label: "Straits of Tiran Legal and Historical Disputes", url: "https://www.britannica.com/place/Straits-of-Tiran" }
    ],
    subtopicId: "subtopic_2_1",
    isIsraeli: false
  }
];
