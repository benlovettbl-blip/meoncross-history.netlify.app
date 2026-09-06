const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 0: KT1: Geography of the Middle East (Geographic, Strategic & 1945 Baseline Context)
const lesson0 = [
  makeQuestion(
    'What crucial man-made waterway connects the Mediterranean Sea to the Red Sea, serving as a vital strategic chokepoint for international trade and oil?',
    'The Suez Canal',
    'The Panama Canal',
    'The Strait of Hormuz',
    'The Bosphorus Strait',
    'The Suez Canal allows ships to transit between Europe and Asia without circumnavigating Africa. Its nationalisation by Egypt in 1956 triggered an international invasion and crisis.',
    0, // A
  ),
  makeQuestion(
    'Which strategic maritime passage at the mouth of the Gulf of Aqaba was blockaded by Egypt in 1956 and 1967, acts that Israel considered causes of war?',
    'The Straits of Tiran',
    'The Strait of Gibraltar',
    'The Bab el-Mandeb',
    'The Dardanelles',
    "The Straits of Tiran control maritime access from the Red Sea into the Gulf of Aqaba and Israel's southern port of Eilat. Egypt's closure of the straits in May 1967 was a direct trigger for the Six Day War.",
    1, // B
  ),
  makeQuestion(
    'Which triangular desert peninsula connecting Africa to Asia was captured by Israel from Egypt in 1956 and 1967, before being returned under the Camp David Accords?',
    'The Sinai Peninsula',
    'The Arabian Peninsula',
    'The Anatolian Plateau',
    'The Negev Desert',
    'The Sinai Peninsula served as a massive geographic buffer between Israel and Egypt. Under the 1979 Egyptian-Israeli Peace Treaty, Israel returned the entire peninsula in exchange for peace and demilitarisation.',
    2, // C
  ),
  makeQuestion(
    'Which strategic river forms the natural eastern boundary of the West Bank, flowing south from the Sea of Galilee into the Dead Sea?',
    'The River Jordan',
    'The River Nile',
    'The Tigris River',
    'The Euphrates River',
    'The River Jordan is the primary freshwater artery of the region and marks the border between Jordan and the West Bank. Control over its water resources and crossings has remained a core strategic issue.',
    3, // D
  ),
  makeQuestion(
    'Which ancient and holy city, claimed as a capital by both Israelis and Palestinians, was divided between 1948 and 1967 before Israeli forces captured the Old City?',
    'Jerusalem',
    'Tel Aviv',
    'Damascus',
    'Beirut',
    'Jerusalem was divided along the 1949 Green Line, with Jordan controlling East Jerusalem (including the Western Wall) and Israel controlling West Jerusalem. Israel reunified the city under its control during the 1967 Six Day War.',
    0, // A
  ),
  makeQuestion(
    'Which elevated volcanic plateau bordering south-western Syria was captured by Israel during the 1967 Six Day War due to its dominant military vantage point over Galilee?',
    'The Golan Heights',
    'The Judean Hills',
    'Mount Sinai',
    'The Zagros Mountains',
    'Syrian artillery on the Golan Heights frequently bombarded Israeli settlements in the Hula Valley below prior to 1967. Capturing the plateau gave Israel vital strategic depth and early warning capabilities.',
    1, // B
  ),
  makeQuestion(
    "Which narrow coastal strip bordering Egypt's Sinai Peninsula came under Egyptian military control in 1948, was captured by Israel in 1967, and became an epicenter of the 1987 Intifada?",
    'The Gaza Strip',
    'The West Bank',
    'The Golan Heights',
    'The Bekaa Valley',
    'The Gaza Strip absorbed hundreds of thousands of displaced Palestinian refugees following the 1948 War. Dense refugee camps in Gaza later served as the flashpoint for the First Palestinian Intifada in December 1987.',
    2, // C
  ),
  makeQuestion(
    'Which territory west of the River Jordan was annexed by Jordan in 1950, occupied by Israel in 1967, and became the central focus of Jewish settlement expansion?',
    'The West Bank',
    'The Sinai Peninsula',
    'The Golan Heights',
    'The Gaza Strip',
    'Referred to by Israelis as Judea and Samaria, the West Bank was captured during the 1967 Six Day War. It contains major historic cities including Hebron, Nablus, Bethlehem, and East Jerusalem.',
    3, // D
  ),
  makeQuestion(
    'What was the de facto border established by the 1949 Armistice Agreements separating Israel from the West Bank, Gaza Strip, and Golan Heights until 1967?',
    'The Green Line',
    'The Purple Line',
    'The Bar-Lev Line',
    'The Blue Line',
    'The Green Line received its name from the green pencil used to draw the armistice boundaries on maps during negotiations in Rhodes. It represented the internationally recognized boundary of Israel prior to June 1967.',
    0, // A
  ),
  makeQuestion(
    'Which arid southern desert region accounted for over 55% of the total land area allocated to the Jewish state under the 1947 UN Partition Plan?',
    'The Negev Desert',
    'The Sinai Desert',
    'The Syrian Desert',
    'The Judean Desert',
    "David Ben-Gurion considered developing the Negev Desert essential for Israel's economic future and absorption of immigrants. It links central Israel to the Gulf of Aqaba.",
    1, // B
  ),
  makeQuestion(
    'Which southern Israeli port city on the Gulf of Aqaba provides Israel with maritime access to the Red Sea, East Africa, and Asia without using the Suez Canal?',
    'Eilat',
    'Haifa',
    'Ashdod',
    'Tel Aviv',
    'Eilat was secured by Israel in Operation Uvda in March 1949. Egyptian attempts to blockade shipping to Eilat via the Straits of Tiran led directly to wars in 1956 and 1967.',
    2, // C
  ),
  makeQuestion(
    'Which strategic fortified coastal town at the southern tip of the Sinai Peninsula directly commands the entrance to the Straits of Tiran?',
    'Sharm el-Sheikh',
    'Port Said',
    'Ismailia',
    'Suez City',
    "Nasser's deployment of Egyptian troops to Sharm el-Sheikh and expulsion of the UN Emergency Force (UNEF) in May 1967 closed the straits to Israeli shipping. Israeli airborne and naval forces seized it during the Six Day War.",
    3, // D
  ),
  makeQuestion(
    'Which major freshwater lake in northern Israel, fed by the River Jordan, was a frequent source of border clashes with Syria in the 1950s and 1960s?',
    'The Sea of Galilee (Lake Tiberias)',
    'The Dead Sea',
    'Lake Nasser',
    'The Great Bitter Lake',
    "Israel's construction of the National Water Carrier and Syria's rival project to divert headwaters flowing into the lake escalated military friction between 1964 and 1967. Control over water resources remained critical.",
    0, // A
  ),
  makeQuestion(
    "Which region north of Israel's border became known as 'Fatahland' in the 1970s as the PLO launched cross-border rocket attacks against northern Israeli towns?",
    'Southern Lebanon',
    'The Bekaa Valley',
    'The Golan Heights',
    'The West Bank',
    "Following their expulsion from Jordan in Black September 1970, the PLO relocated to southern Lebanon. Repeated cross-border rocket bombardments prompted Israel's full-scale invasion in 1982.",
    1, // B
  ),
  makeQuestion(
    'What was the massive Israeli chain of sand-wall fortifications built along the eastern bank of the Suez Canal after 1967 to defend against an Egyptian crossing?',
    'The Bar-Lev Line',
    'The Maginot Line',
    'The Siegfried Line',
    'The Allon Line',
    'Costing $300 million, the Bar-Lev Line featured high sand ramparts and concrete bunkers. Egyptian forces stunned Israel on 6 October 1973 by using high-pressure water cannons to blast breaches through the sand wall.',
    2, // C
  ),
  makeQuestion(
    'Which capital city was subjected to a brutal three-month siege and heavy IDF bombardment in the summer of 1982, leading to the evacuation of the PLO to Tunisia?',
    'Beirut',
    'Damascus',
    'Amman',
    'Cairo',
    'Defense Minister Ariel Sharon pushed Israeli troops into West Beirut to trap Yasser Arafat and PLO fighters. An international peacekeeping force oversaw the maritime evacuation of 14,000 PLO personnel in August 1982.',
    3, // D
  ),
  makeQuestion(
    'What was the political movement that emerged in the late 19th century advocating for the establishment of a sovereign Jewish national homeland in Palestine?',
    'Zionism',
    'Pan-Arabism',
    "Ba'athism",
    'Ottomanism',
    'Zionism arose in response to European antisemitism and pogroms, asserting that the Jewish people required national self-determination. The movement drove successive waves of immigration that culminated in statehood in 1948.',
    0, // A
  ),
  makeQuestion(
    'What was the primary conflict between Arab and Jewish demands in Palestine as the British Mandate drew to a close in 1945?',
    'Arabs demanded an independent democratic state based on majority rule, while Jews demanded an independent sovereign state to absorb Holocaust survivors',
    'Arabs wanted Palestine to become a French colony, while Jews wanted to join the British Empire',
    'Both sides demanded the permanent division of Jerusalem under United Nations direct military rule',
    'Arabs demanded total union with Saudi Arabia, while Jews demanded union with Cyprus',
    'Palestinian Arabs argued that European persecution of Jews should not be solved at the expense of the indigenous Arab majority. Zionist leaders insisted that only sovereign statehood could guarantee Jewish survival after the murder of six million Jews in Europe.',
    1, // B
  ),
  makeQuestion(
    'Which neighboring Arab kingdom east of the River Jordan, ruled by King Abdullah I, annexed the West Bank and East Jerusalem following the 1948–49 War?',
    'Transjordan (Jordan)',
    'Syria',
    'Iraq',
    'Lebanon',
    "Transjordan's British-trained Arab Legion secured the West Bank and Old City of Jerusalem in 1948. King Abdullah formally unified the West Bank with Jordan in 1950, a move recognized only by Britain and Pakistan.",
    2, // C
  ),
  makeQuestion(
    'In 1945 at the end of the Second World War, what was the approximate demographic balance of the population living in Mandatory Palestine?',
    'Approximately 1.2 million Palestinian Arabs and 600,000 Jews',
    'Approximately 2 million Jews and 100,000 Arabs',
    'An equal balance of 500,000 Arabs and 500,000 Jews',
    'Approximately 3 million Arabs and 50,000 Jews',
    'In 1945, Arabs constituted approximately two-thirds of the population and owned the vast majority of land. The urgent plight of 250,000 Jewish Holocaust survivors in European displaced persons camps intensified pressure on this delicate demographic balance.',
    3, // D
  ),
];

// Lesson 1: KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949
const lesson1 = [
  makeQuestion(
    'Why was British Foreign Secretary Ernest Bevin determined to maintain strict immigration quotas to Palestine in 1945–46?',
    'To preserve British alliances with oil-rich Arab states and prevent regional conflict',
    'Because Britain planned to make Palestine an official county of England',
    'Because the United Nations ordered Britain to halt all maritime transport',
    'To force all Holocaust survivors to settle permanently in the Soviet Union',
    'Bevin feared that mass Jewish immigration would alienate strategic Arab allies and ignite an all-out Middle Eastern war. Distractors offer fabricated political motives.',
    0, // A
  ),
  makeQuestion(
    'What tragic event on 22 July 1946 broke British civilian morale and accelerated their withdrawal from Palestine?',
    'The bombing of the King David Hotel in Jerusalem',
    'The assassination of Lord Moyne in Cairo',
    'The sinking of the SS Patria in Haifa harbour',
    'The ambush of the Hadassah medical convoy',
    'Irgun militants disguised as milkmen detonated explosives in the hotel basement, destroying British administrative and military headquarters and killing 91 people. It hardened British resolve to abandon the Mandate.',
    1, // B
  ),
  makeQuestion(
    'Which refugee ship carrying 4,500 Holocaust survivors was intercepted by the British Royal Navy in July 1947 and forcibly returned to displaced persons camps in Germany?',
    'The SS Exodus 1947',
    'The SS Struma',
    'The SS Patria',
    'The Altalena',
    'The British interception of the Exodus and the forced return of survivors created a global public relations disaster for Britain, heavily swinging international opinion toward Zionism.',
    2, // C
  ),
  makeQuestion(
    'What did United Nations Resolution 181 (passed on 29 November 1947) propose for Palestine?',
    'Partitioning Palestine into separate Arab and Jewish states with Jerusalem under international control',
    'Creating a single democratic binational state with equal voting rights for all citizens',
    'Handing administrative control of Palestine to the United States and the Soviet Union',
    'Expelling all British forces and making Palestine an autonomous province of Egypt',
    "Resolution 181 allocated 55% of mandatory territory to a Jewish state, 45% to an Arab state, and designated Jerusalem an international 'corpus separatum'. It was accepted by Jews but rejected by Arabs.",
    3, // D
  ),
  makeQuestion(
    "What was the Jewish Agency's reaction to UN Resolution 181 compared to that of the Arab Higher Committee?",
    'The Jewish Agency accepted partition, whereas the Arab Higher Committee rejected it completely',
    'Both sides accepted the partition plan enthusiastically at the UN General Assembly',
    'The Jewish Agency rejected partition because it demanded all of Transjordan',
    'The Arab Higher Committee accepted partition on condition that Jerusalem became an Arab capital',
    "Zionist leaders accepted the plan because it recognized a sovereign Jewish state, despite unfavorable borders. Arab leaders rejected partition as an unjust violation of the majority population's self-determination.",
    0, // A
  ),
  makeQuestion(
    "What was the primary military objective of the Haganah's 'Plan Dalet' (Plan D) launched in April 1948?",
    'To secure vital transport corridors (especially Tel Aviv-Jerusalem) and clear hostile villages prior to British departure',
    'To launch an immediate amphibious invasion of Beirut and Damascus',
    'To arrest British officials and capture the port of Haifa by force',
    'To force the United Nations to revoke Resolution 181',
    'Plan Dalet aimed to gain control of areas allocated to the Jewish state and secure supply lines. Its implementation led to the expulsion or flight of tens of thousands of Arab villagers.',
    1, // B
  ),
  makeQuestion(
    'What notorious event on 9 April 1948 involved an Irgun and Lehi attack on an Arab village, causing widespread panic and civilian flight?',
    'The Deir Yassin massacre',
    'The Qibya raid',
    'The Kfar Etzion massacre',
    'The Black Saturday crackdown',
    'Over 100 villagers were killed in Deir Yassin. News of the killings was amplified by both Arab and Jewish radio, triggering mass panic and accelerated Arab civilian flight across Palestine.',
    2, // C
  ),
  makeQuestion(
    'Who read the Declaration of Independence establishing the State of Israel in Tel Aviv on 14 May 1948?',
    'David Ben-Gurion',
    'Chaim Weizmann',
    'Menachem Begin',
    'Golda Meir',
    "Ben-Gurion, head of the Jewish Agency, read the declaration beneath a portrait of Theodor Herzl just hours before the British Mandate officially expired. He became Israel's first Prime Minister.",
    3, // D
  ),
  makeQuestion(
    'What happened on 15 May 1948, the day after Israel declared its independence?',
    'Armies from five neighboring Arab states invaded the newly declared State of Israel',
    'The British Royal Navy returned to reoccupy Haifa and Tel Aviv',
    'The United Nations revoked Resolution 181 and imposed direct rule',
    'Israel signed peace treaties with Egypt and Jordan',
    'Egypt, Transjordan, Syria, Iraq, and Lebanon launched a coordinated military invasion, turning the civil war into an international conflict. Israel fought a war of survival that lasted until 1949.',
    0, // A
  ),
  makeQuestion(
    'How did the first UN-negotiated truce in June 1948 provide Israel with a decisive operational advantage?',
    'It allowed Israel to reorganize the IDF, train conscripts, and import modern weapons from Czechoslovakia',
    'It allowed the United States to deploy 50,000 marines to defend Tel Aviv',
    'It forced all Arab armies to surrender their heavy artillery to UN observers',
    'It gave Israel time to sign a secret peace treaty with Syria',
    "The 30-day truce was exploited by Israel to import rifles, machine guns, and Avia fighter planes from Soviet-aligned Czechoslovakia, fundamentally tipping the balance of firepower in Israel's favor.",
    1, // B
  ),
  makeQuestion(
    'Which UN mediator was assassinated in Jerusalem in September 1948 by the radical Jewish militant group Lehi (Stern Gang)?',
    'Count Folke Bernadotte',
    'Ralph Bunche',
    'Trygve Lie',
    'Dag Hammarskjöld',
    'Swedish diplomat Bernadotte was assassinated because his peace proposals recommended transferring the Negev to Arabs and returning Lydda and Ramle. Ralph Bunche succeeded him and negotiated the 1949 armistices.',
    2, // C
  ),
  makeQuestion(
    'What was the name of the official border established by the 1949 Armistice Agreements between Israel and its Arab neighbors?',
    'The Green Line',
    'The Purple Line',
    'The Blue Line',
    'The Bar-Lev Line',
    "The Green Line (named after the green pencil used on the negotiation maps at Rhodes) served as Israel's de facto border until the 1967 Six Day War. The Purple Line was the 1967 ceasefire line with Syria.",
    3, // D
  ),
  makeQuestion(
    'By the end of the 1948–49 Arab-Israeli War, what percentage of mandatory Palestine was controlled by Israel?',
    'Approximately 79%',
    'Exactly 55%',
    'Approximately 45%',
    '100%',
    'Israel expanded its territory from the 55% allocated by UN Resolution 181 to 79% by the end of hostilities in 1949, leaving only the West Bank and Gaza under Arab control.',
    0, // A
  ),
  makeQuestion(
    'Which Arab military force proved to be the most effective and well-trained during the 1948–49 War, successfully holding the Old City of Jerusalem?',
    'The Arab Legion of Transjordan',
    'The Egyptian Expeditionary Force',
    'The Syrian Armoured Corps',
    'The Lebanese Defense Guard',
    "Commanded by British General John Bagot Glubb ('Glubb Pasha'), the British-trained Arab Legion held East Jerusalem and the West Bank against heavy Israeli assaults.",
    1, // B
  ),
  makeQuestion(
    "What was the 'Sergeants Affair' of July 1947, which caused widespread outrage in Britain?",
    'The Irgun executed two kidnapped British intelligence sergeants in retaliation for British hangings of Irgun members',
    'Two British officers defected to the Arab Higher Committee with secret military codes',
    'British sergeants refused orders to fire on unarmed Jewish refugees in Haifa',
    'Two British sergeants were awarded the Victoria Cross for defending Jerusalem',
    'The bodies of the two sergeants were booby-trapped in an orange grove near Netanya. The event sparked violent antisemitic riots in Liverpool and convinced the British public that troops must be brought home.',
    2, // C
  ),
  makeQuestion(
    'What happened to the territory designated for an independent Palestinian Arab state under UN Resolution 181 following the 1948–49 war?',
    'It was annexed by Jordan (West Bank) and placed under Egyptian military control (Gaza Strip)',
    'It became an independent Palestinian state recognized by the United Nations',
    'It was completely absorbed into the British Commonwealth',
    'It was handed to Syria under a League of Nations mandate',
    'No Palestinian state was created. Jordan annexed the West Bank in 1950, while Egypt administered the Gaza Strip, leaving Palestinians without a sovereign national territory.',
    3, // D
  ),
  makeQuestion(
    "Why was the Israeli supply corridor to Jerusalem known as the 'Burma Road' constructed in June 1948?",
    'To bypass Arab Legion blockades at Latrun and deliver vital food and weapons to besieged Jewish residents in Jerusalem',
    'To transport Iraqi oil directly from the Persian Gulf to Mediterranean tankers',
    'To allow British diplomatic convoys to evacuate safely to Amman',
    'To link the kibbutzim of Galilee with southern Negev farming communities',
    'Arab forces had severed the main highway at Latrun, threatening 100,000 Jews in West Jerusalem with starvation. Israeli engineers hacked an improvised bypass road through rugged mountain terrain.',
    0, // A
  ),
  makeQuestion(
    'What incident in June 1948 nearly sparked a civil war inside Israel when Ben-Gurion ordered the shelling of an Irgun arms ship off Tel Aviv?',
    'The Altalena Affair',
    'The Exodus Affair',
    'The Lavon Affair',
    'The Patria Explosion',
    "Ben-Gurion insisted on 'one state, one army' and refused to let the Irgun maintain private weapon stores. The IDF shelled the ship, killing 16 Irgun fighters and firmly establishing state control over all armed forces.",
    1, // B
  ),
  makeQuestion(
    'Which superpower was the first to grant de jure diplomatic recognition to the State of Israel in May 1948?',
    'The Soviet Union',
    'The United States',
    'Great Britain',
    'France',
    'While US President Truman granted de facto recognition within 11 minutes, the Soviet Union under Stalin was the first to grant full de jure recognition on 17 May 1948, hoping Israel would become a socialist ally.',
    2, // C
  ),
  makeQuestion(
    'Where were the formal 1949 armistice talks between Israel and Egypt, Jordan, Lebanon, and Syria held under UN auspices?',
    'On the island of Rhodes',
    'In Geneva, Switzerland',
    'At Camp David, Maryland',
    'In Paris, France',
    'UN mediator Ralph Bunche conducted separate bilateral proximity talks on the Greek island of Rhodes, earning the 1950 Nobel Peace Prize for securing the armistice agreements.',
    3, // D
  ),
];

// Lesson 2: KT1.2: The Aftermath of the 1948–49 War
const lesson2 = [
  makeQuestion(
    "What Arabic term, meaning 'Catastrophe', is used to describe the expulsion and flight of approximately 700,000 Palestinians during the 1948–49 War?",
    'The Nakba',
    'The Intifada',
    'The Jihad',
    'The Sharia',
    'The Nakba refers to the displacement of over 700,000 Palestinian Arabs and the destruction of hundreds of villages. The Intifada refers to the later uprisings in 1987 and 2000.',
    0, // A
  ),
  makeQuestion(
    'What was the core principle established by UN General Assembly Resolution 194 in December 1948 regarding Palestinian refugees?',
    'Refugees wishing to return in peace should be permitted to do so, or be compensated for lost property',
    'Refugees must be permanently resettled in South American nations with UN passports',
    'Israel was legally required to pay $10 billion directly to the Arab League',
    'All refugees were ordered to join the regular Jordanian Armed Forces',
    "Resolution 194 established the international basis for the Palestinian 'Right of Return'. Israel rejected mass repatriation, arguing that returning refugees would constitute a hostile fifth column.",
    1, // B
  ),
  makeQuestion(
    'Which United Nations agency was established in December 1949 to provide direct relief, education, and healthcare to displaced Palestinians?',
    'UNRWA (United Nations Relief and Works Agency)',
    'UNHCR (UN High Commissioner for Refugees)',
    "UNICEF (UN Children's Fund)",
    'UNDP (UN Development Programme)',
    'UNRWA was created specifically to support Palestinian refugees across Jordan, Lebanon, Syria, the West Bank, and Gaza. UNHCR handles all other global refugee populations.',
    2, // C
  ),
  makeQuestion(
    'What landmark Israeli law passed in July 1950 granted every Jewish individual worldwide the right to immigrate to Israel and receive citizenship?',
    'The Law of Return',
    'The Basic Law on Human Dignity',
    'The Absentee Property Law',
    'The Nationality and Naturalisation Act',
    'The Law of Return fulfilled the foundational Zionist promise of Israel as a safe sanctuary for world Jewry. Non-Jewish Palestinians who fled were denied any equivalent right of return.',
    3, // D
  ),
  makeQuestion(
    'What legislation passed by the Israeli Knesset in 1950 allowed the state to take custody of land and properties belonging to displaced Palestinian Arabs?',
    'The Absentee Property Law',
    'The British Mandate Land Ordinance',
    'The Agricultural Reorganisation Act',
    'The Jewish Agency Settlement Charter',
    "The Absentee Property Law declared anyone who fled their residence during the war an 'absentee', transferring their homes, businesses, and farmland to the state development authority.",
    0, // A
  ),
  makeQuestion(
    'What was Operation Magic Carpet (1949–1950)?',
    'The secret airlift of approximately 50,000 Yemenite Jews to Israel',
    'The transfer of British military surplus tanks from Egypt to Tel Aviv',
    'A clandestine smuggling route bringing Soviet grain into Haifa',
    'A covert Mossad operation sabotaging Iraqi oil pipelines',
    'British and American transport planes flew over 49,000 Yemenite Jews to Israel following riots in Aden. It was followed in 1951 by Operation Ezra and Nehemiah, airlifting over 120,000 Iraqi Jews.',
    1, // B
  ),
  makeQuestion(
    'Why was the 1952 Reparations Agreement signed between Israel and West Germany so controversial inside Israel?',
    'Many Israelis, led by Menachem Begin, viewed accepting German money as blood money for the Holocaust',
    'West Germany demanded that Israel hand over Jerusalem in exchange for economic aid',
    'The Soviet Union threatened to cut all diplomatic ties if Israel accepted western currency',
    'The agreement required Israel to return land captured in the 1948 war',
    "Begin and the Herut party led violent protests outside the Knesset, arguing that taking reparations from Germany was an intolerable insult to the memory of Holocaust victims. The aid, however, saved Israel's economy.",
    2, // C
  ),
  makeQuestion(
    'What term was used to describe armed Palestinian guerrilla raiders who crossed armistice lines to launch cross-border attacks against Israeli targets in the 1950s?',
    'Fedayeen',
    'Peshmerga',
    'Mujahedeen',
    'Phalangists',
    "Fedayeen ('self-sacrificers') operated primarily from the Egyptian-administered Gaza Strip and Jordan. Israel viewed them as terrorists and responded with large-scale military reprisal raids.",
    3, // D
  ),
  makeQuestion(
    "What was the primary goal of Israel's military 'reprisal policy' developed during the 1950s under Moshe Dayan and David Ben-Gurion?",
    'To deter future infiltration by launching disproportionately severe military counter-strikes against Arab border villages and bases',
    'To conquer Damascus and Amman through gradual territorial acquisition',
    'To assassinate foreign diplomats in European capitals',
    'To force the United Nations to withdraw its observer forces from the border',
    'Israel believed Arab governments would only stop cross-border fedayeen infiltration if the punitive cost to their territory and prestige was unbearable. The policy was criticized internationally for collective punishment.',
    0, // A
  ),
  makeQuestion(
    'Which controversial Israeli commando raid in October 1953, led by Major Ariel Sharon and Unit 101, resulted in the dynamiting of houses and 69 civilian deaths in a West Bank village?',
    'The Qibya Raid',
    'The Samu Raid',
    'The Gaza Raid',
    'The Karameh Operation',
    'Unit 101 attacked Qibya in Jordanian-held territory following a fedayeen grenade attack in Yehud. The high civilian death toll brought worldwide condemnation, including from the US State Department.',
    1, // B
  ),
  makeQuestion(
    'Why was King Abdullah I of Jordan assassinated by a Palestinian gunman outside the Al-Aqsa Mosque in Jerusalem in July 1951?',
    'Because he was suspected of conducting secret bilateral peace negotiations with Israel',
    'Because he refused to allow British military officers to train the Arab Legion',
    'Because he had signed an alliance with the Soviet Union',
    'Because he ordered the closure of all Islamic holy sites in East Jerusalem',
    'Palestinian nationalists accused Abdullah of treason and collusion with Zionists to annex the West Bank and partition Palestine between Jordan and Israel at the expense of Palestinian statehood.',
    2, // C
  ),
  makeQuestion(
    "What was the 'Lavon Affair' (Operation Susannah) of 1954 in Egypt?",
    'A covert Israeli military intelligence plot to bomb British and American targets in Egypt to frame the Muslim Brotherhood and stop British troop withdrawal',
    'An Egyptian assassination attempt on Israeli Defense Minister Pinhas Lavon',
    'A British plan to seize the Suez Canal using French paratroopers',
    'A financial scandal involving the embezzlement of US foreign aid by the Israeli treasury',
    'Israeli intelligence operatives recruited Egyptian Jews to plant firebombs in US and British libraries and cinemas. The plot was exposed, humiliating Israel and forcing Defense Minister Pinhas Lavon to resign.',
    3, // D
  ),
  makeQuestion(
    "What was the 'Tzena' regime in Israel between 1949 and 1953?",
    'A period of strict economic austerity, price controls, and food rationing to absorb hundreds of thousands of penniless immigrants',
    'A national military draft requiring five years of compulsory military service',
    'A censorship office that screened all international news broadcasts',
    'A political coalition between socialist Mapai and religious parties',
    "Between 1948 and 1951, Israel's Jewish population doubled due to mass immigration, forcing the government to impose severe coupon rationing for food, clothing, and furniture.",
    0, // A
  ),
  makeQuestion(
    'Under what legal framework did Palestinian Arab citizens who remained inside the State of Israel live between 1948 and 1966?',
    'Under a strict system of Military Administration with curfews, travel permits, and special courts',
    'Under complete diplomatic immunity granted by the United Nations',
    'Under the jurisdiction of the Jordanian High Court in Amman',
    'Under a completely separate penal code administered by British colonial judges',
    'Until 1966, Israeli Arabs were subject to military governance, requiring army permits to travel between towns, facing curfews, and having land expropriated under emergency defence regulations.',
    1, // B
  ),
  makeQuestion(
    'What was the impact of the February 1955 Israeli raid on Gaza (Operation Black Arrow) that killed 38 Egyptian soldiers?',
    'It shattered Egyptian military pride and directly convinced President Nasser to seek modern weapons from the Soviet bloc',
    'It forced Egypt to sign an unconditional peace treaty with Israel',
    'It led to the immediate deployment of 10,000 British troops to guard Cairo',
    'It caused the United Nations to expel Israel from the General Assembly',
    "The humiliation of the Egyptian garrison demonstrated Egypt's military inferiority, prompting Nasser to conclude the September 1955 Czechoslovak arms deal, which shifted the regional Cold War balance.",
    2, // C
  ),
  makeQuestion(
    "Which demographic group of Jewish immigrants faced significant discrimination, poor tent encampments (Ma'abarot), and social marginalization upon arrival in 1950s Israel?",
    'Mizrahi and Sephardic Jews from Arab and North African countries',
    'Ashkenazi Jews from Western Europe and the United States',
    'Russian Jews who arrived during the 1905 revolution',
    'South African Jewish volunteers from the 1948 war',
    'Mizrahi Jews from Iraq, Yemen, and North Africa were often treated with paternalistic condescension by the Ashkenazi establishment, placed in transit tent camps, and directed to remote peripheral development towns.',
    3, // D
  ),
  makeQuestion(
    'Which Arab country formally granted full citizenship to the Palestinian refugees residing within its borders after 1949?',
    'Jordan',
    'Egypt',
    'Syria',
    'Lebanon',
    'Jordan annexed the West Bank in 1950 and granted Jordanian citizenship to all resident Palestinians. Other Arab nations refused citizenship to preserve their refugee status and collective right of return.',
    0, // A
  ),
  makeQuestion(
    "What regional defense treaty, organized by Britain in 1955 to contain Soviet influence, was fiercely opposed by Egypt's Gamal Abdel Nasser as Western neo-colonialism?",
    'The Baghdad Pact',
    'NATO',
    'The Warsaw Pact',
    'The Arab League Defense Treaty',
    "The Baghdad Pact united Britain, Iraq, Turkey, Pakistan, and Iran. Nasser viewed Iraq's pro-Western monarchy as a traitor to Arab independence and launched a fierce propaganda war against it.",
    1, // B
  ),
  makeQuestion(
    'How did the United States support the young State of Israel economically in its immediate post-independence years?',
    'By providing extensive grants, private bond sales, and a $100 million Export-Import Bank loan',
    'By giving Israel direct ownership of the Panama Canal revenues',
    'By stationing two US aircraft carriers permanently in Haifa port',
    'By canceling all commercial trade agreements with Arab nations',
    'President Truman provided crucial loans and allowed tax-exempt private donations from American Jewish organizations, providing essential capital to build housing, irrigation, and infrastructure.',
    2, // C
  ),
  makeQuestion(
    "What was the 'Tripartite Declaration' issued by Britain, France, and the United States in May 1950?",
    'A pledge to regulate arms sales to both Arab states and Israel to prevent an arms race and oppose border changes by force',
    'A military treaty creating a joint Western base in the Sinai desert',
    'A diplomatic agreement recognizing East Jerusalem as the capital of Jordan',
    'A pledge to invade Egypt if the Suez Canal was ever nationalised',
    'The Tripartite Declaration aimed to keep stability in the Middle East by restricting arms shipments and declaring that the three powers would act against any state violating armistice lines.',
    3, // D
  ),
];

// Lesson 3: KT1.3: Increased Tension, 1955–1963
const lesson3 = [
  makeQuestion(
    'What political revolution in July 1952 transformed Egypt from a pro-British monarchy into a radical nationalist republic?',
    'The Free Officers Revolution led by Gamal Abdel Nasser and Muhammad Naguib',
    'The Islamic Brotherhood Uprising led by Sayyid Qutb',
    'The Wafd Party Parliamentary Revolt',
    'The Egyptian Socialist Workers Strike in Alexandria',
    'Young nationalist army officers overthrew corrupt King Farouk, expelling British forces and establishing a republic that soon made Nasser the pre-eminent leader of the Arab world.',
    0, // A
  ),
  makeQuestion(
    'What major geopolitical ideology did President Nasser champion, advocating the political, cultural, and economic unification of all Arab peoples?',
    'Pan-Arabism',
    'Pan-Turkism',
    'Zionism',
    'Wahhabism',
    "Pan-Arabism ('Qawmiya') argued that Arabs constituted a single nation divided by imperialist borders, using Cairo's 'Voice of the Arabs' radio to rally popular masses against pro-Western monarchies.",
    1, // B
  ),
  makeQuestion(
    'What landmark September 1955 agreement shattered the Western arms monopoly in the Middle East and alarmed both Israel and the United States?',
    'The Czechoslovak Arms Deal',
    'The Baghdad Pact',
    'The Tripartite Accord',
    'The Franco-Israeli Nuclear Agreement',
    'Nasser purchased over $200 million worth of advanced Soviet weaponry (MiG-15 jets, T-34 tanks, Il-28 bombers) routed through Czechoslovakia, bringing the Cold War into the heart of the Middle East.',
    2, // C
  ),
  makeQuestion(
    'What decision by US Secretary of State John Foster Dulles in July 1956 directly triggered the Suez Crisis?',
    'The abrupt withdrawal of US and British financing for the Aswan High Dam',
    'The deployment of US Sixth Fleet warships to Alexandria harbour',
    'The signing of a formal mutual defense alliance between the US and Israel',
    'A complete US oil embargo against Egyptian shipping in the Red Sea',
    "Angered by Nasser's recognition of Communist China and arms purchases from Moscow, Dulles canceled the $270 million loan for the dam, prompting Nasser to seek alternate revenue by seizing the Suez Canal.",
    3, // D
  ),
  makeQuestion(
    'On what historic date did President Nasser nationalise the Suez Canal Company during a fiery speech in Alexandria?',
    '26 July 1956',
    '29 October 1956',
    '5 November 1956',
    '15 May 1948',
    "Nasser announced the nationalisation on the anniversary of King Farouk's abdication, using the codeword 'de Lesseps' over the radio to signal Egyptian troops to seize canal offices.",
    0, // A
  ),
  makeQuestion(
    'Why was British Prime Minister Sir Anthony Eden so personally hostile toward Gamal Abdel Nasser?',
    "Eden viewed Nasser as a dangerous fascist dictator ('Mussolini on the Nile') who threatened Britain's imperial oil lifeline",
    'Nasser had personally ordered the assassination of British diplomats in London',
    'Eden wanted to convert Egypt into a permanent British Crown colony',
    'Nasser had allied Egypt with Nazi Germany during World War Two',
    'Eden had opposed 1930s appeasement and drew a false analogy between Hitler and Nasser, convincing himself that standing up to Nasser at Suez was vital to prevent British imperial collapse.',
    1, // B
  ),
  makeQuestion(
    'Why was France eager to join a military operation against Nasser in 1956?',
    'France accused Nasser of providing crucial military and financial support to the FLN rebels in Algeria',
    'France wanted to annex Cairo as an overseas French department',
    'Egypt had refused to import French wine and automobiles',
    'Nasser had seized French gold deposits in the Bank of Alexandria',
    'France viewed Algeria as integral French soil and believed that toppling Nasser would cut off external arms to the Algerian independence movement and break the back of the rebellion.',
    2, // C
  ),
  makeQuestion(
    'What secret collusion agreement was signed in October 1956 in a French villa between representatives of Britain, France, and Israel?',
    'The Protocol of Sèvres',
    'The Treaty of Washington',
    'The Camp David Accords',
    'The Balfour Pact',
    "British Foreign Secretary Selwyn Lloyd, French PM Guy Mollet, and Israeli PM David Ben-Gurion agreed that Israel would invade Sinai, giving Britain and France the pretext to intervene as 'peacekeepers'.",
    3, // D
  ),
  makeQuestion(
    'What was Operation Kadesh launched on 29 October 1956?',
    'The Israeli military invasion of the Sinai Peninsula, advancing rapidly toward the Suez Canal',
    'The British Royal Air Force bombing of Cairo international airport',
    'The Egyptian amphibious assault across the Straits of Tiran',
    'A combined Arab invasion of northern Israel from Syria and Jordan',
    'Israeli paratroopers dropped near the Mitla Pass under Colonel Ariel Sharon, and mechanized columns swept through the Sinai, routing Egyptian defenders in less than a week.',
    0, // A
  ),
  makeQuestion(
    'What did the joint Anglo-French ultimatum issued on 30 October 1956 demand of Egypt and Israel?',
    'That both sides stop fighting and withdraw their forces 10 miles away from the Suez Canal',
    'That Egypt unconditionally recognize the State of Israel within 24 hours',
    'That Israel immediately surrender all captured territory in Sinai to Jordan',
    'That both countries allow permanent British military garrisons in their capitals',
    "The ultimatum was disingenuous: Israel's troops were still far from the canal, while Egypt was ordered to withdraw from its own sovereign waterway. When Nasser refused, Anglo-French air strikes began.",
    1, // B
  ),
  makeQuestion(
    'How did President Dwight D. Eisenhower and the United States respond to the Anglo-French military intervention at Suez?',
    'With fury, threatening to collapse the British economy by selling US sterling reserves unless troops withdrew',
    'By immediately sending 20,000 US troops to fight alongside the British at Port Said',
    'With neutral silence, refusing to comment on Middle Eastern affairs',
    'By launching air strikes against Israeli positions in the Sinai desert',
    'Eisenhower was enraged that US allies had colluded in an imperialist invasion without consultation, especially during the concurrent Soviet invasion of Hungary. He applied devastating financial coercion on London.',
    2, // C
  ),
  makeQuestion(
    'What threat did Soviet Premier Nikolai Bulganin make against Britain and France in November 1956 during the height of the crisis?',
    'He issued veiled threats that London and Paris were vulnerable to Soviet rocket strikes',
    'He announced that the Red Army would invade West Germany within 48 hours',
    'He declared that the Soviet Union would cut all natural gas to Western Europe',
    'He threatened to annex Turkey and Greece into the Soviet bloc',
    "Bulganin's notes to Eden and Mollet asked ominously how Britain would feel if attacked by 'rocket weapons'. This allowed Moscow to claim credit for forcing the imperial powers to back down.",
    3, // D
  ),
  makeQuestion(
    'What innovative peacekeeping body was created by the UN General Assembly in November 1956 to oversee the withdrawal of invading forces from Egypt?',
    'UNEF (United Nations Emergency Force)',
    'UNIFIL (UN Interim Force in Lebanon)',
    'UNPROFOR (UN Protection Force)',
    'UNSCOP (UN Special Committee on Palestine)',
    "Canadian diplomat Lester B. Pearson proposed the first armed UN peacekeeping force ('Blue Helmets'), earning the 1957 Nobel Peace Prize. UNEF stationed troops in Gaza and Sharm el-Sheikh.",
    0, // A
  ),
  makeQuestion(
    'What was the ultimate geopolitical consequence of the 1956 Suez Crisis for Britain and France?',
    'It decisively demonstrated that Britain and France were no longer first-tier global superpowers and could not act independently of the US',
    "It expanded the British Empire's control over Egyptian shipping for another 50 years",
    'It resulted in the military occupation of Egypt by French paratroopers until 1970',
    'It caused Britain and France to withdraw completely from the NATO alliance',
    "Suez was a catastrophic humiliation that shattered British imperial pretensions, forced Anthony Eden's resignation, and showed that the superpowers (US and USSR) now dictated global affairs.",
    1, // B
  ),
  makeQuestion(
    'What major political victory did Gamal Abdel Nasser achieve despite Egypt suffering defeat on the battlefield in 1956?',
    'He emerged as the heroic champion of the anti-imperialist Arab world, keeping control of the nationalised Suez Canal',
    'He was awarded the Nobel Peace Prize for his speech in Alexandria',
    'He was appointed Secretary-General of the United Nations',
    'He gained full sovereign ownership of the Sinai oil fields and southern Israel',
    'Nasser stood up to two imperial powers and Israel, successfully retained the canal, and saw his enemies humiliated. His prestige soared to legendary status across the Arab world.',
    2, // C
  ),
  makeQuestion(
    'What conditions did Israeli Prime Minister David Ben-Gurion secure before agreeing to withdraw the IDF from Sinai and Gaza in March 1957?',
    'Guarantees from the US and the deployment of UNEF troops ensuring freedom of navigation through the Straits of Tiran',
    'A formal peace treaty signed by Egypt in Washington D.C.',
    'The annexation of the Gaza Strip into the State of Israel',
    'The disarmament of the entire Egyptian army for twenty years',
    'President Eisenhower provided written assurances that Israel had the right to navigate the Gulf of Aqaba and that closing the Straits would be treated as an act of war, monitored by UNEF at Sharm el-Sheikh.',
    3, // D
  ),
  makeQuestion(
    "What was the 'Eisenhower Doctrine' announced by the US President in January 1957 following the Suez Crisis?",
    'A policy offering military and economic aid to any Middle Eastern nation threatened by armed aggression from Communist-controlled states',
    'A commitment to recognize Jerusalem as the undivided capital of Israel',
    'A plan to build nuclear power reactors across Arab League member nations',
    'A declaration that the US would take direct military ownership of the Suez Canal',
    'Fearing that the collapse of British influence would leave a power vacuum for Moscow to exploit, Eisenhower pledged American intervention to stop Soviet expansion in the region.',
    0, // A
  ),
  makeQuestion(
    "What political union was formed in February 1958, uniting Egypt and Syria under President Nasser's single leadership?",
    'The United Arab Republic (UAR)',
    'The Arab Federation of Iraq and Jordan',
    'The League of Arab States',
    'The Gulf Cooperation Council',
    "Syria's leaders feared a Communist takeover and sought union with Cairo. The UAR lasted until September 1961, when Syrian army officers staged a coup and seceded from Egyptian domination.",
    1, // B
  ),
  makeQuestion(
    'What dramatic event in July 1958 brought an abrupt end to the pro-Western Hashemite monarchy in Iraq?',
    'A bloody military coup led by Brigadier Abd al-Karim Qasim that murdered King Faisal II and Prime Minister Nuri al-Said',
    "An Israeli commando raid on Baghdad's presidential palace",
    'A popular plebiscite voting to merge Iraq with Saudi Arabia',
    'A British naval blockade of the Persian Gulf that overthrew the government',
    "Inspired by Nasser's pan-Arabism, Iraqi nationalist officers executed the royal family, withdrew Iraq from the pro-Western Baghdad Pact, and turned Iraq toward Soviet alignment.",
    2, // C
  ),
  makeQuestion(
    'What secret assistance did France begin providing to Israel in the late 1950s as a reward for their military cooperation at Suez?',
    'Construction of a secret nuclear reactor and reprocessing facility at Dimona in the Negev desert',
    'A free fleet of 500 French supersonic Concorde aircraft',
    'Direct ownership of French overseas territories in North Africa',
    'Sole distribution rights for French oil across the Mediterranean',
    "France supplied the technology, heavy water, and uranium to build the Dimona nuclear complex, laying the groundwork for Israel's covert development of an independent nuclear deterrent.",
    3, // D
  ),
];

module.exports = { lesson0, lesson1, lesson2, lesson3 };
