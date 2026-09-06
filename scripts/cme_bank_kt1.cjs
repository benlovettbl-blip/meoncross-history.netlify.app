const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 0: KT1: Geography of the Middle East (Geographic, Strategic & 1945 Baseline Context)
const lesson0 = [
  makeQuestion(
    'Explain the importance of the Suez Canal for British and Western European strategic and economic interests after 1945.',
    'It provided the shortest maritime route between Europe and Persian Gulf oil reserves, carrying over two-thirds of Western Europe’s petroleum imports without circumnavigating Africa.',
    'It served as a freshwater irrigation artery feeding agricultural kibbutzim across southern Israel and Jordan.',
    'It formed the internationally agreed demilitarized boundary between mandatory Palestine and Transjordan.',
    'It enabled the Soviet Mediterranean fleet to access the Atlantic Ocean without passing through Gibraltar.',
    'The Suez Canal was Western Europe’s economic jugular vein for Middle Eastern oil. Egypt’s nationalisation of the canal in July 1956 directly triggered an international invasion and military crisis.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of Egypt’s naval blockade of the Straits of Tiran at Sharm el-Sheikh in 1956 and 1967.',
    'It cut off Israel’s southern maritime access through the Gulf of Aqaba to the port of Eilat, which Israel formally treated as an act of war (casus belli).',
    'It severed all maritime trade routes between Great Britain and its Commonwealth colonies in India and Australia.',
    'It compelled the United Nations to revoke UN Resolution 181 and establish international control over Jerusalem.',
    'It forced Jordan to surrender its administrative control of the West Bank and East Jerusalem to Egypt.',
    'The Straits of Tiran command the narrow sea passage from the Red Sea into the Gulf of Aqaba. Israel warned that closing this maritime lifeline to the southern port of Eilat constituted a direct act of war, triggering conflict in both 1956 and 1967.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Sinai Peninsula for Israeli and Egyptian military strategy between 1948 and 1979.',
    'It provided a massive 60,000-square-kilometre desert buffer zone between Egyptian population centres and Israeli borders, and controlled access to the Suez Canal and Straits of Tiran.',
    'It housed the primary freshwater reservoirs feeding the River Jordan and the Sea of Galilee.',
    'It was designated by the United Nations as an autonomous independent Palestinian Arab homeland under Resolution 181.',
    'It formed an unbroken mountain fortress preventing all air travel and radar surveillance between North Africa and Asia.',
    'Controlling Sinai gave Egypt an advance staging ground against Israel, while capturing Sinai gave Israel invaluable strategic depth and early warning radar buffer. Under the 1979 Treaty of Washington, Israel returned Sinai in exchange for permanent peace and demilitarisation.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the River Jordan for regional conflict between Israel and its Arab neighbours.',
    'It served as the natural eastern boundary between Jordan and the West Bank and formed the primary freshwater artery for regional agriculture and water diversion schemes.',
    'It provided the main deep-water naval corridor connecting the Mediterranean Sea directly to the Persian Gulf.',
    'It formed the fortified sand rampart built by Israel to prevent an Egyptian military crossing into the Negev.',
    'It represented the maritime ceasefire line negotiated on the island of Rhodes to partition Jerusalem.',
    'Freshwater scarcity made the River Jordan an acute flashpoint. Clashes over Israel’s National Water Carrier and rival Syrian Arab diversion schemes on the river’s tributaries between 1964 and 1966 contributed heavily to the outbreak of the Six Day War.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the 1948–49 Arab-Israeli War for the city of Jerusalem.',
    'The city was divided along the Green Line, leaving West Jerusalem under Israeli control and East Jerusalem, including the Old City and Western Wall, under Jordanian rule.',
    'The city was placed under permanent United Nations direct military rule as an international corpus separatum.',
    'All Jewish and Arab residents were permanently evacuated, and the city was converted into an international park.',
    'The city was annexed entirely by Egypt, which established a joint military headquarters with Syria in the Old City.',
    'The 1949 armistice split Jerusalem in two, separated by minefields, concrete walls, and barbed wire. For 19 years until the 1967 Six Day War, Jewish Israelis were denied access to holy sites in the Old City, including the Western Wall.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Golan Heights for Syrian and Israeli military operations prior to June 1967.',
    'Its elevated volcanic plateau allowed Syrian artillery to bombard Israeli farming kibbutzim in the Hula Valley below and threatened Israel’s vital freshwater supply from the Sea of Galilee.',
    'It contained the major oil refineries supplying all petroleum products to the Egyptian Army in Sinai.',
    'It formed the demilitarized border corridor separating the Gaza Strip from the British Suez Canal base.',
    'It served as the primary naval staging port for the Soviet Mediterranean squadron in the Levant.',
    'Rising steeply 1,000 metres above northeastern Israel, the Golan Heights gave Syrian gunners a crushing topographic advantage. Israeli captures of the plateau on 9–10 June 1967 eliminated this artillery threat and secured vital headwaters of the Jordan River.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the 1948–49 War for the Gaza Strip.',
    'It fell under Egyptian military administration, becoming a severely overcrowded coastal strip housing over 200,000 displaced Palestinian refugees in eight UNRWA camps.',
    'It was formally annexed by the Kingdom of Jordan as part of its Hashemite sovereign territory.',
    'It was purchased by the Jewish Agency to construct a continuous overland rail link from Tel Aviv to Cairo.',
    'It was evacuated by all civilian populations and converted into a permanent United Nations headquarters.',
    'The 1949 Egyptian-Israeli armistice left the 40-kilometre Gaza Strip under Egyptian military governorate without granting residents Egyptian citizenship. The strip became an impoverished base for Palestinian fedayeen cross-border guerrilla raids.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the West Bank of the River Jordan following the 1948–49 War.',
    'It was occupied and formally annexed by King Abdullah of Transjordan in 1950, housing major historic cities like Hebron and Nablus and half a million Palestinian refugees.',
    'It was developed into an independent, sovereign democratic Palestinian Republic recognized by the United Nations.',
    'It was incorporated directly into Israel’s central municipal district and governed under British common law.',
    'It served as the primary demilitarized buffer zone policed by French and American airborne brigades.',
    'Transjordan’s British-led Arab Legion captured the West Bank during the 1948 war. King Abdullah formally unified it with his kingdom in 1950, renaming the country Jordan and granting Jordanian citizenship to its Palestinian population.',
    3, // D
  ),
  makeQuestion(
    'Explain the significance of the 1949 Green Line in the Arab-Israeli conflict.',
    'It was the de facto armistice boundary drawn on maps with green pencil at Rhodes in 1949, separating Israel from Jordanian, Egyptian, and Syrian forces until the 1967 war.',
    'It represented the permanent, internationally ratified border agreed by all Arab League states in a formal peace treaty.',
    'It was the fortified electric barrier built along the Suez Canal by Moshe Dayan to halt Egyptian tank incursions.',
    'It was the demarcation line dividing the British and French spheres of influence established by the Sykes-Picot Agreement.',
    'The Green Line served as Israel’s internationally recognized border for 18 years until 5 June 1967. While Israel regarded it as a temporary armistice line, UN resolutions (notably Resolution 242) used it as the benchmark for Israeli withdrawal from occupied territories.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Negev Desert for David Ben-Gurion and the new State of Israel.',
    'It comprised over 55% of the land allocated to Israel under UN Resolution 181, providing vital land for immigrant absorption and a overland corridor to the Red Sea port of Eilat.',
    'It provided the primary fertile farmland producing over 80% of the citrus and wheat crops consumed in mandatory Palestine.',
    'It was the location of Egypt’s principal military airfields used to launch bomber strikes against Tel Aviv.',
    'It was ceded to Transjordan under the 1949 armistice in exchange for control over the Old City of Jerusalem.',
    'Ben-Gurion viewed the arid southern desert as vital to Israel’s economic independence and defensive depth. Developing the Negev enabled Israel to build agricultural settlements, establish scientific institutes, and construct the Dimona nuclear research facility.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the southern port of Eilat for Israel’s international trade.',
    'It gave Israel direct maritime access to East Africa, the Indian Ocean, and Persian Gulf oil from Iran, bypassing the Egyptian-controlled Suez Canal.',
    'It served as the primary Mediterranean container port receiving British coal and French industrial machinery.',
    'It provided the sole freshwater desalination terminal supplying the cities of Jerusalem, Haifa, and Tel Aviv.',
    'It was the international air hub where all European Holocaust refugees landed under Operation Magic Carpet.',
    'Secured by Israeli forces in Operation Uvda in March 1949, Eilat broke Israel’s dependence on the Suez Canal. When Egypt blockaded shipping to Eilat via the Straits of Tiran, Israel treated it as a direct threat to its national survival.',
    2, // C
  ),
  makeQuestion(
    'Explain the strategic importance of Sharm el-Sheikh at the southern tip of the Sinai Peninsula.',
    'Its coastal artillery batteries and naval base directly commanded the narrow shipping passage through the Straits of Tiran into the Gulf of Aqaba.',
    'It was the primary agricultural oasis producing food for Egyptian forces garrisoned along the Libyan frontier.',
    'It served as the diplomatic headquarters where the Camp David Accords were negotiated by Jimmy Carter.',
    'It marked the northern terminus of the Suez Canal where ships entered the Mediterranean Sea.',
    'Positioned overlooking the narrow navigable channels of Tiran, Sharm el-Sheikh was a strategic choke-point. Nasser’s remilitarisation of Sharm el-Sheikh in May 1967 closed Israel’s sea lane to Eilat and triggered the pre-emptive Six Day War.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Sea of Galilee (Lake Tiberias) for regional tension in the 1950s and 1960s.',
    'It provided the freshwater reservoir for Israel’s National Water Carrier, sparking military clashes when Syria attempted to divert its headwaters (Banias and Hasbani rivers).',
    'It was the disputed maritime sea lane linking the Red Sea directly to the Indian Ocean.',
    'It served as the primary boundary line dividing Egyptian and British military garrisons in Sinai.',
    'It was an uninhabited saltwater depression used exclusively for underground chemical testing by the United Nations.',
    'The freshwater lake was vital to Israel’s national survival and agricultural development. Syrian attempts to construct diversion canals on the headwaters in 1964–65 provoked Israeli tank fire and airstrikes, heavily escalating border hostilities.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the PLO’s relocation to southern Lebanon after Black September in 1970.',
    'Southern Lebanon became known as ‘Fatahland’, from which Palestinian guerrillas launched cross-border Katyusha rocket attacks against northern Israeli towns like Kiryat Shmona.',
    'The PLO signed a permanent non-aggression pact with Israel and completely disbanded its armed militant wings.',
    'The United Nations expelled Lebanon from the General Assembly and transferred Beirut to Syrian civil administration.',
    'King Hussein of Jordan surrendered his crown and incorporated Jordan into the United Arab Republic.',
    'Expelled from Amman by the Jordanian army in 1970, the PLO re-established its armed state-within-a-state in southern Lebanon and Beirut. These cross-border rocket and guerrilla raids prompted Israeli ground incursions in 1978 and 1982.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Bar-Lev Line along the Suez Canal constructed by Israel after 1967.',
    'It was a $300 million fortified sand-barrier and bunker chain designed to provide early warning and halt an Egyptian amphibious crossing until IDF reserves could mobilise.',
    'It was a civilian railway connecting Jerusalem to Cairo constructed under the auspices of the United States.',
    'It formed an underwater minefield preventing Soviet submarines from entering the Red Sea via the Suez Canal.',
    'It was a demilitarized border fence patrolled exclusively by United Nations UNEF peacekeeping contingents.',
    'Constructed with massive 20-metre sand ramparts and reinforced concrete strongpoints, the Bar-Lev Line bred dangerous complacency in Israeli command. On 6 October 1973, Egyptian engineers blasted 60 breaches through the sand rampart using high-pressure water monitors.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of Israel’s siege of West Beirut in the summer of 1982.',
    'An international peacekeeping force evacuated Yasser Arafat and over 14,000 PLO fighters by sea to Tunisia, ending armed Palestinian military presence in southern Lebanon.',
    'Israel permanently annexed Lebanon as its northern sovereign territory and appointed Ariel Sharon as Prime Minister of Lebanon.',
    'The Soviet Union launched ballistic missile strikes against Tel Aviv, forcing Israel to withdraw immediately.',
    'The PLO established a joint governing coalition with the Christian Phalangists to rule Beirut jointly.',
    'Defense Minister Ariel Sharon pushed IDF forces into West Beirut, subjecting the city to heavy air and naval bombardment. Under a US-brokered agreement, the PLO evacuated to Tunis, though the political aftermath triggered the Sabra and Shatila massacre.',
    3, // D
  ),
  makeQuestion(
    'Explain the conflicting interests and demands of Jews and Arabs within the British Mandate in 1945.',
    'Zionists demanded unrestricted immigration of 250,000 Holocaust survivors and sovereign Jewish statehood, while Arabs demanded immediate independence based on majority rule and an end to Jewish land purchases.',
    'Zionists demanded that Palestine become a French colony, while Arabs demanded integration into the British Commonwealth.',
    'Arabs demanded partition into two states with equal territory, while Zionists demanded total control of Transjordan.',
    'Both communities demanded that Palestine remain indefinitely under direct British military administration with martial law.',
    'Zionist leaders argued that sovereign statehood was an urgent moral and existential necessity following the murder of six million Jews in Europe. Palestinian Arabs argued that European crimes should not be resolved by dispossessing the indigenous majority of Palestine.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the demographic balance in Mandatory Palestine in 1945, which statement accurately reflects the population and land ownership?',
    'Approximately 1.2 million Palestinian Arabs made up two-thirds of the population and owned the vast majority of private land, compared to 600,000 Jews who constituted one-third.',
    'Jews constituted 85% of the total population and owned 90% of all agricultural land across Palestine.',
    'The population was evenly divided at exactly 1 million Arabs and 1 million Jews with identical land holdings.',
    'Arabs constituted over 95% of the population, while Jewish presence was limited to less than 20,000 residents in Jerusalem.',
    'Despite substantial immigration between the world wars, Arabs remained a two-to-one majority in 1945. This demographic reality made British attempts to devise a single democratic constitution or partition plan politically impossible.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Balfour Declaration (1917) and the British Mandate for the growth of the Jewish national home.',
    'It committed Britain to supporting a national home for the Jewish people in Palestine and provided the international legal framework under the League of Nations that facilitated Jewish immigration between 1922 and 1939.',
    'It guaranteed immediate sovereign independence for an Arab kingdom encompassing Palestine, Syria, and Iraq.',
    'It transferred the administration of Jerusalem to the Pope and the Catholic Church under an international charter.',
    'It required all Jewish immigrants to renounce political Zionism and assimilate into the Ottoman administrative system.',
    'Issued by Foreign Secretary Arthur Balfour, the declaration gave Zionism international diplomatic legitimacy. Under the British Mandate, the Jewish population grew from 85,000 in 1918 to over 600,000 by 1945, establishing institutions that formed the infrastructure of statehood.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of Transjordan and the Hashemite monarchy under King Abdullah I in the regional landscape of 1945–48.',
    'Transjordan possessed the British-trained and British-officered Arab Legion, the most effective Arab fighting force in the region, and sought to annex the West Bank and Jerusalem.',
    'Transjordan was an industrialized democracy that advocated for an immediate military alliance with the Jewish Agency.',
    'King Abdullah was the official commander-in-chief of all Soviet-backed revolutionary movements across North Africa.',
    'Transjordan possessed no military forces and remained neutral throughout the entire 1948–49 Arab-Israeli War.',
    'King Abdullah entertained ambitions of creating a ‘Greater Syria’ under Hashemite rule. His secret contacts with Jewish Agency leaders and determination to secure the West Bank and East Jerusalem drove Transjordan’s distinctive military strategy in 1948.',
    3, // D
  ),
];

// Lesson 1: KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949
const lesson1 = [
  makeQuestion(
    'Explain the importance of conflicting interests and demands of Jews and Arabs within the British Mandate for Britain’s decision to maintain the 1939 White Paper immigration quotas after 1945.',
    'Britain sought to protect vital diplomatic alliances with oil-producing Arab states and secure the Suez Canal, rejecting Zionist demands to admit 100,000 Holocaust survivors from European DP camps.',
    'Britain wanted to encourage all Jewish Holocaust survivors to emigrate to Australia and Canada instead of the Middle East.',
    'Britain had agreed to hand over complete administrative control of Palestine to the United States and the Soviet Union.',
    'Britain was legally bound by the League of Nations to dissolve all Jewish agricultural kibbutzim established after 1918.',
    'Foreign Secretary Ernest Bevin feared that lifting immigration limits would provoke a general Arab rebellion, threatening British airbases and Middle Eastern oil pipelines. However, this policy alienated US President Truman and drove Jewish underground groups into armed revolt.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the bombing of the King David Hotel in Jerusalem on 22 July 1946.',
    'It destroyed the British military and administrative headquarters, killed 91 people, and hardened British domestic and political resolve to abandon the Palestine Mandate.',
    'It persuaded the British government to immediately abolish all immigration restrictions for European Jewish refugees.',
    'It prompted the Arab League to disband the Arab Higher Committee and recognize the State of Israel immediately.',
    'It resulted in the United States deploying two divisions of US Marines to garrison Jerusalem and Haifa.',
    'Menachem Begin’s Irgun disguised militants as milkmen to detonate explosives in the basement. The devastating casualty toll shattered British domestic public support for maintaining the Mandate, accelerating the cabinet’s decision to refer Palestine to the UN in February 1947.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the SS Exodus affair in July 1947 for the end of the British Mandate.',
    'The Royal Navy’s interception and forced return of 4,500 Holocaust survivors to displaced persons camps in Germany sparked international outrage and swayed the visiting UNSCOP commission against British policy.',
    'It was a clandestine arms shipment that provided the Haganah with 50,000 British Lee-Enfield rifles and heavy artillery.',
    'It proved to the United Nations that the Arab Higher Committee was willing to accept partition in exchange for financial aid.',
    'It led to an immediate joint British-American military invasion of Tel Aviv to disarm Jewish paramilitary groups.',
    'Global media images of British soldiers with batons forcing Holocaust survivors back into German barbed-wire camps created a diplomatic catastrophe for Britain. Visiting UNSCOP members observed the tragedy firsthand, concluding that the British Mandate was morally and politically dead.',
    2, // C
  ),
  makeQuestion(
    'Explain the key terms of UN Resolution 181 passed on 29 November 1947 for the partition of Palestine.',
    'It recommended ending the British Mandate and partitioning Palestine into a Jewish state (55% of land) and an Arab state (45%), with Jerusalem as an international corpus separatum under UN administration.',
    'It mandated creating a single unitary binational state with equal parliamentary seats for Jews and Arabs.',
    'It transferred all mandatory lands to the Kingdom of Transjordan, granting autonomous municipal status to Tel Aviv.',
    'It decreed that Palestine remain under permanent British military trusteeship until the year 2000.',
    'Resolution 181 passed the General Assembly by a 33–13 vote (with 10 abstentions), securing the necessary two-thirds majority. The Jewish state received 55% of the land (including the Negev and coastal plain), while the Arab state received 45%, leaving Jerusalem under international control.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the conflicting reactions to UN Resolution 181 by the Jewish Agency and the Arab Higher Committee.',
    'While the Jewish Agency accepted partition as legal statehood, the Arab Higher Committee rejected it as an infringement on majority rights, triggering an immediate civil war across Palestine.',
    'Both parties signed a historic non-aggression treaty in Geneva agreeing to demilitarise all borders.',
    'The Arab Higher Committee agreed to partition on condition that the Negev Desert was ceded to Saudi Arabia.',
    'The Jewish Agency rejected partition because it demanded the immediate inclusion of Damascus and Beirut in Israel.',
    'The day after the vote, Arab gunmen ambushed Jewish buses near Petah Tikva, igniting months of communal warfare. Arab leaders rejected partition because Arabs constituted two-thirds of the population, whereas Jewish leaders accepted it as international recognition of sovereign statehood.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the key events leading to the end of the British Mandate, what was the primary objective of the Haganah’s Plan Dalet (Plan D) in April 1948?',
    'To secure areas allocated to the Jewish state, establish territorial control along the vital Tel Aviv-to-Jerusalem road, and neutralize hostile Arab villages along supply corridors.',
    'To launch an immediate amphibious invasion of Egyptian naval bases along the Suez Canal.',
    'To arrest British colonial administrators and seize the port of Haifa before Royal Navy vessels could evacuate.',
    'To force King Abdullah of Transjordan to surrender the Arab Legion’s artillery regiments to the UN.',
    'Adopted in early April 1948, Plan Dalet shifted Jewish forces from defensive holding actions to offensive territorial control. By seizing Arab villages commanding strategic highways, it aimed to link Jewish enclaves and lift the siege of Jerusalem before regular Arab armies invaded.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the attack on the Arab village of Deir Yassin on 9 April 1948 by Irgun and Lehi fighters.',
    'The killing of over 100 Arab villagers caused widespread terror and demoralisation, triggering an accelerated mass flight of Palestinian Arab civilians from neighbouring towns and villages.',
    'It convinced the Arab Higher Committee to surrender unconditionally and recognize Jewish sovereignty over Jerusalem.',
    'It led to an immediate joint British-American military intervention that arrested Menachem Begin.',
    'It resulted in the United Nations immediately revoking Resolution 181 and halting all Jewish immigration.',
    'News and radio reports of the massacre at Deir Yassin created widespread panic among Arab communities. Fearing similar atrocities, hundreds of thousands of Palestinian villagers fled their homes in Jaffa, Haifa, and Galilee, dramatically accelerating the Palestinian exodus.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the Declaration of Independence on 14 May 1948 for the creation of Israel.',
    'David Ben-Gurion proclaimed the sovereign State of Israel hours before the British Mandate officially expired, establishing a provisional government and prompting regular Arab armies to invade.',
    'It marked the formal unification of Transjordan and Mandatory Palestine into a single federal kingdom.',
    'It was an international agreement signed by Britain, Egypt, and Israel establishing demilitarized borders.',
    'It was a decree issued by the United Nations General Assembly appointing Ralph Bunche as Governor of Palestine.',
    'Standing beneath a portrait of Theodor Herzl in the Tel Aviv Museum on 14 May 1948, Ben-Gurion ended nearly two millennia of Jewish statelessness. The United States and USSR recognized Israel within hours, and the armies of five Arab nations invaded the following morning.',
    3, // D
  ),
  makeQuestion(
    'In a narrative account analysing the outbreak of the Arab-Israeli war (1948–49), which combination of Arab states launched an invasion on 15 May 1948?',
    'Armies from Egypt, Transjordan, Syria, Lebanon, and Iraq invaded simultaneously across mandatory borders to defeat Jewish forces and prevent the establishment of the state.',
    'Saudi Arabia, Turkey, and Iran launched a combined airborne assault against Tel Aviv and Haifa.',
    'Egypt and France launched a coordinated amphibious landing along the Gaza coastline to seize the Negev.',
    'Great Britain and Transjordan invaded northern Galilee to restore direct British colonial administration.',
    'Five Arab states dispatched approximately 30,000 troops across the frontiers. However, the invasion was crippled by deep political rivalries, lack of a unified military command, and conflicting territorial goals between King Abdullah of Jordan and the other Arab governments.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the first UN truce (11 June – 8 July 1948) for Israeli forces during the Arab-Israeli war (1948–49).',
    'It halted the initial Arab advance and gave Israel critical time to import weapons from Czechoslovakia, absorb new immigrant recruits, and reorganize local militias into the unified IDF.',
    'It forced all Arab armies to withdraw permanently behind their international borders, ending the war.',
    'It enabled Egypt to construct deep defensive fortifications across the Sinai Peninsula.',
    'It resulted in the permanent deployment of 50,000 United Nations peacekeepers in the Gaza Strip.',
    'Negotiated by UN mediator Count Folke Bernadotte, the four-week truce saved Israel from exhausting its ammunition. During the pause, Israel covertly acquired rifles, machine guns, and fighter aircraft from Czechoslovakia, completely transforming its military capability for the subsequent ‘Ten Days’ fighting.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Czechoslovak arms deal (Operation Balak) for the outcome of the Arab-Israeli war (1948–49).',
    'It provided the IDF with thousands of Mauser rifles, machine guns, ammunition, and Avia S-199 fighter aircraft, breaking the Western arms embargo and tipping the military balance in Israel’s favour.',
    'It provided Egypt with advanced jet bombers that destroyed the port facilities of Tel Aviv and Haifa.',
    'It was an economic treaty that funded the construction of the Burma Road through the Judean hills.',
    'It forced the United States to impose strict economic sanctions against all European arms exporters.',
    'With Western democracies enforcing strict arms embargoes on the region, Stalin authorised Czechoslovakia to supply Israel with vital weapons. The arrival of Avia fighters and artillery allowed the IDF to contest Arab air superiority and launch decisive multi-brigade counter-offensives.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the assassination of UN mediator Count Folke Bernadotte by the militant group Lehi in Jerusalem in September 1948.',
    'It caused international outrage and prompted David Ben-Gurion to forcibly disband and outlaw both Lehi and the Irgun to establish absolute state control over armed forces.',
    'It persuaded the United Nations Security Council to dispatch a multinational military force to occupy Tel Aviv.',
    'It forced King Abdullah of Jordan to immediately surrender East Jerusalem to Israeli forces.',
    'It resulted in the United States revoking its diplomatic recognition of the State of Israel.',
    'Bernadotte had proposed revising partition by awarding the Negev to the Arabs and Galilee to Israel. His murder by Lehi extremists in Jerusalem appalled world leaders, prompting Ben-Gurion to eliminate all independent Jewish paramilitary factions to secure state authority.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Altalena affair in June 1948 for the creation of the Israeli Defence Forces (IDF).',
    'Ben-Gurion ordered the shelling of an Irgun arms ship on Tel Aviv beach, decisively eliminating private political militias and enforcing a single unified military command under the IDF.',
    'It was the naval battle where the Israeli Navy sank the flagship of the Egyptian Mediterranean fleet off Gaza.',
    'It was a secret treaty signed between Israel and France to jointly construct a nuclear reactor at Dimona.',
    'It was an Arab League arms smuggling network intercepted by the British Royal Navy off the coast of Beirut.',
    'When the Irgun refused to hand over all weapons aboard the cargo ship Altalena, Ben-Gurion ordered artillery to fire on the vessel off the coast of Tel Aviv. By crushing armed factionalism, Ben-Gurion ensured the state held an absolute monopoly on armed force.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the key events of the Arab-Israeli war (1948–49), which military force captured the Jewish Quarter of the Old City of Jerusalem in May 1948?',
    'The Arab Legion of Transjordan, led by British General John Bagot Glubb, defeated defending Haganah fighters and maintained control of East Jerusalem and the Western Wall.',
    'The Egyptian Expeditionary Force commanded by Gamal Abdel Nasser captured the entire city after a two-week siege.',
    'Syrian mechanized brigades crossed the Jordan River and occupied the Mount of Olives.',
    'A multinational brigade of United Nations peacekeepers occupied the Old City under General Ralph Bunche.',
    'Transjordan’s British-officered Arab Legion was the most formidable Arab force. After intense street combat, surviving Haganah and Irgun defenders in the Jewish Quarter surrendered on 28 May 1948, leaving East Jerusalem in Jordanian hands until 1967.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the ‘Burma Road’ constructed by Israeli forces during the Arab-Israeli war (1948–49).',
    'It was a steep bypass track through the Judean hills that bypassed the Arab-held fortress at Latrun, delivering vital food, water, and ammunition to 100,000 besieged Jews in Jerusalem.',
    'It was an underground railway connecting Tel Aviv to the Mediterranean port of Haifa for arms imports.',
    'It was an asphalt highway built by British engineers in 1945 to facilitate the rapid evacuation of colonial troops.',
    'It was the desert retreat route used by Egyptian forces to escape encirclement in the Faluja pocket.',
    'With the Arab Legion blocking the main Latrun highway, 100,000 Jewish residents of Jerusalem faced starvation. Israeli engineers and civilian workers bulldozed a makeshift track through steep rocky hills under nocturnal darkness, breaking the siege and saving the city.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the 1949 Armistice Agreements signed on the island of Rhodes.',
    'They established the Green Line armistice borders separating Israel from Egypt, Jordan, Lebanon, and Syria, but Arab states refused to sign permanent peace treaties or recognize Israel.',
    'They created a permanent, demilitarized Palestinian Arab state encompassing the West Bank and Gaza Strip.',
    'They required Israel to surrender western Galilee and the Negev Desert to the United Nations Trusteeship Council.',
    'They established a joint military defence alliance between Israel, Egypt, and Jordan to deter Soviet expansion.',
    'Brokered by UN mediator Ralph Bunche, separate armistice treaties suspended formal fighting between February and July 1949. However, Arab delegates insisted that the armistices did not constitute political recognition, leaving the conflict fundamentally unresolved.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the territorial changes resulting from the Arab-Israeli war (1948–49).',
    'Israel expanded its territory from the 55% allocated under UN Resolution 181 to 79% of Mandatory Palestine, capturing western Galilee, the coastal plain, and the entire Negev.',
    'Israel surrendered all territory outside the city limits of Tel Aviv and became an autonomous province of Jordan.',
    'The Arab state envisioned by the UN was expanded to cover 80% of Palestine, confining Israel to a narrow coastal enclave.',
    'The entire territory of Mandatory Palestine was placed under permanent French and British military governance.',
    'Israeli military counter-offensives (Operations Yoav, Hiram, and Uvda) substantially enlarged the state’s footprint beyond partition borders. Israel absorbed 2,500 square miles of territory originally allocated to the proposed Arab state.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Arab-Israeli war (1948–49) for the refugee status of Palestinian Arabs (the Nakba).',
    'Approximately 700,000 Palestinian Arabs became stateless refugees fleeing from their homes to camps in the West Bank, Gaza, Jordan, Syria, and Lebanon, denied re-entry by Israel.',
    'All Palestinian Arab civilians were granted full Israeli citizenship and received financial compensation within two years.',
    'The entire Palestinian population was safely resettled in North Africa with passports issued by the United Nations.',
    'Palestinian refugees were fully integrated into Saudi Arabian society with permanent housing and voting rights.',
    'Remembered by Palestinians as the Nakba (‘the Catastrophe’), over half of the pre-war Arab population became dispossessed refugees. Israel refused their return, arguing that mass repatriation would destroy the Jewish character and security of the new state.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the aftermath of the Arab-Israeli war (1948–49), why was an independent Palestinian Arab state not established?',
    'Transjordan annexed the West Bank and East Jerusalem while Egypt placed the Gaza Strip under military administration, extinguishing the separate Arab state envisioned by the UN.',
    'The United Nations revoked the concept of Palestinian self-determination and placed all Arab lands under Israeli control.',
    'The Palestinian leadership voluntarily agreed to merge all Palestinian territories into the Kingdom of Saudi Arabia.',
    'Great Britain re-occupied the West Bank and established a permanent crown colony based in Ramallah.',
    'Instead of aiding the creation of an independent Palestinian state, neighbouring Arab rulers seized the remaining Arab portions of Palestine. King Abdullah of Jordan incorporated the West Bank into his kingdom, while Egypt administered Gaza under martial law.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the key events of the Arab-Israeli war (1948–49), which sequence of three stages correctly explains how Israel secured its survival?',
    'Arab armies invaded in May 1948; Israel used the first truce to import Czech arms and reorganise; the IDF launched major offensives in autumn 1948 to secure armistice borders enclosing 79% of Palestine.',
    'Israel launched a pre-emptive strike on Cairo in 1947; the UN deployed peacekeepers in 1948; and Britain returned to impose peace in 1949.',
    'Transjordan conquered Tel Aviv in June 1948; the US intervened with troops in July 1948; and Egypt surrendered Sinai in August 1949.',
    'The Arab League signed partition in 1947; Israel declared neutrality in 1948; and all borders were demilitarized by the UN in 1949.',
    'A high-scoring narrative account links the initial desperate defensive fighting against invading Arab armies to the vital four-week truce in June 1948. Rearmed with Czech weaponry, the newly unified IDF launched sweeping counter-offensives that established the 1949 Green Line.',
    3, // D
  ),
];

// Lesson 2: KT1.2: The Aftermath of the 1948–49 War
const lesson2 = [
  makeQuestion(
    'Explain one consequence of the territorial changes resulting from the 1949 Armistice Agreements for the Palestinian Arab population.',
    'Over 700,000 Palestinian Arabs were permanently displaced from their villages inside the Green Line, losing their ancestral lands and entering refugee status in neighbouring territories.',
    'All Palestinian Arabs were granted dual citizenship in Israel and Jordan with the right to purchase real estate anywhere.',
    'Palestinian Arab landowners received full financial compensation and new farms in the Negev Desert within 12 months.',
    'The Palestinian Arab community established an independent parliamentary democracy with its capital in West Jerusalem.',
    'The territorial changes left Palestinian society shattered and stateless. Over 400 Arab villages inside Israel were depopulated, and their inhabitants were barred from returning, creating an enduring geopolitical grievance.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of UN General Assembly Resolution 194 (passed in December 1948) for the refugee status of Palestinian Arabs.',
    'It resolved that refugees wishing to return to their homes and live at peace with their neighbours should be permitted to do so at the earliest practicable date or receive compensation.',
    'It ordered all Palestinian refugees to be permanently relocated to South America with United Nations travel documents.',
    'It decreed that Israel must pay an immediate annual tribute of $500 million directly to the Arab League in Cairo.',
    'It mandated that all Palestinian refugee camps be placed under the direct military jurisdiction of the United States Army.',
    'Resolution 194 established the international legal benchmark for the Palestinian ‘Right of Return’. Israel rejected its implementation, asserting that Arab states had initiated the war and that returning refugees posed an existential security threat.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the refugee status of Palestinian Arabs for international humanitarian intervention in 1949.',
    'The United Nations established UNRWA (United Nations Relief and Works Agency) to provide emergency food, healthcare, shelter, and education to displaced Palestinians across the region.',
    'The International Red Cross was granted permanent sovereign governmental control over the Gaza Strip and West Bank.',
    'The World Bank purchased the Sinai Peninsula from Egypt to build permanent modern housing estates for all refugees.',
    'The United Nations mandated that all Arab League nations immediately grant full voting citizenship to all refugees.',
    'Established by UN General Assembly Resolution 302, UNRWA became the primary lifeline for registered refugees in Jordan, Lebanon, Syria, the West Bank, and Gaza. It sustained refugee communities but also preserved Palestinian national identity across generations.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the Law of Return (1950) for the newly created State of Israel.',
    'It granted every Jewish person worldwide the automatic legal right to immigrate to Israel and receive full citizenship, driving mass immigration that doubled the Jewish population in four years.',
    'It allowed all Palestinian refugees who fled during the 1948 war to reclaim their original homes and farmland inside Israel.',
    'It required all Israeli citizens to serve permanently in the military until the age of 65 without exemption.',
    'It prohibited any foreign financial investment in Israel unless approved by a two-thirds majority of the Knesset.',
    'Enacted on 5 July 1950, the Law of Return gave legal expression to the core Zionist principle that Israel was the sovereign homeland and refuge for all Jews. Between 1948 and 1951, over 680,000 Jewish immigrants arrived from post-Holocaust Europe and Arab lands.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the Absentee Property Law passed by the Israeli Knesset in 1950.',
    'The Israeli state confiscated homes, commercial properties, and over 4 million dunams of agricultural land belonging to displaced Palestinian refugees and transferred them to Jewish development agencies.',
    'It forced all Jewish citizens to surrender their privately owned properties to the state to create collective kibbutzim.',
    'It granted full legal title and monetary compensation to any Palestinian refugee residing in refugee camps abroad.',
    'It returned all religious endowments (waqf) in East Jerusalem to the Jordanian Ministry of Islamic Affairs.',
    'The law classified anyone who had left their usual residence during the 1948 conflict as an ‘absentee’. Their lands, orchards, houses, and bank accounts were placed under a Custodian of Absentee Property and used to house and settle incoming Jewish immigrants.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the creation of the Israeli Defence Forces (IDF) in 1948–49, how did David Ben-Gurion establish a unified military command?',
    'He issued Order No. 4 dissolving the Haganah, Irgun, and Lehi into the IDF and instituted mandatory universal conscription for both young men and women.',
    'He merged the Haganah with the British Royal Army and appointed John Bagot Glubb as Chief of the General Staff.',
    'He hired mercenary officers from France and the United States to lead professional foreign volunteer battalions.',
    'He permitted each political party in the Knesset to maintain its own independent armed militia and artillery regiment.',
    'Ben-Gurion was determined that the new state would not be paralyzed by private political armies. Universal conscription turned the IDF into a ‘people’s army’ that integrated diverse immigrants into Israeli national culture while providing rapid reserve mobilisation.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of Operation Magic Carpet (1949–50) and Operation Ezra and Nehemiah (1951) for Israel’s demographic development.',
    'They airlifted nearly 50,000 Yemenite Jews and 120,000 Iraqi Jews to Israel, transforming Israeli society by introducing large numbers of Mizrahi (Middle Eastern) Jews into the population.',
    'They were clandestine military raids that captured the Syrian airfields around Damascus and the Golan Heights.',
    'They were economic treaties that secured $2 billion in direct loans from the British and French central banks.',
    'They were maritime operations that evacuated British colonial administrators and their families from Haifa.',
    'Fleeing anti-Jewish persecution, riots, and property confiscation in Arab countries after 1948, ancient Jewish communities were evacuated in massive airlifts. These operations radically diversified Israel’s demographics, creating a substantial Mizrahi population alongside European Ashkenazi Jews.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of US aid to Israel during its formative years between 1949 and 1953.',
    'The United States granted a $135 million Export-Import Bank loan and hundreds of millions in food and grant assistance that stabilized Israel’s struggling economy during mass immigration.',
    'The United States sent 50,000 troops to establish permanent military garrison bases along the Green Line.',
    'The United States provided Israel with nuclear warheads and long-range strategic bombers to deter Egypt.',
    'The United States forced Great Britain to surrender its colonial oil concessions in Iraq directly to Israel.',
    'Swamped by over 700,000 impoverished immigrants, Israel faced acute shortages of foreign currency, food rationing (the Tzena austerity regime), and high inflation. US government loans and American Jewish philanthropic donations kept the state financially solvent.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the 1952 Reparations Agreement between Israel and West Germany.',
    'West Germany paid over 3 billion marks ($822 million) in goods and machinery to Israel, funding infrastructure and industrialisation despite furious domestic street protests led by Menachem Begin.',
    'West Germany agreed to surrender its diplomatic embassies in the Arab world and recognize Jerusalem as Israel’s capital.',
    'The Israeli Knesset voted unanimously to forgive all Nazi war criminals and release Adolf Eichmann from custody.',
    'Israel agreed to demilitarise the Negev Desert and accept 200,000 German settlers into southern farming settlements.',
    'Negotiated by Ben-Gurion and Chancellor Konrad Adenauer, the reparations funded electrical grids, railway locomotives, shipping fleets, and industrial factories. The agreement provoked fierce riots outside the Knesset, where opposition leader Menachem Begin denounced it as blood money.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing Israel’s relations with Egypt in the early 1950s, what was the primary source of cross-border violence?',
    'Armed Palestinian fedayeen guerrillas based in Egyptian-controlled Gaza launched cross-border raids into southern Israel, provoking severe retaliatory reprisal strikes from the IDF.',
    'The Egyptian Navy regularly bombarded the civilian beaches of Tel Aviv and Netanya with heavy naval artillery.',
    'Israel and Egypt launched joint military commando raids against Jordanian border checkpoints in the West Bank.',
    'The Egyptian Army deployed three armoured divisions across the Negev Desert to capture the port of Eilat.',
    'Palestinian fedayeen (‘self-sacrificers’) crossed the armistice line to carry out sabotage, mine roads, and attack civilian settlements in southern Israel. Israel held the Egyptian military governorate in Gaza directly responsible and instituted severe military counter-strikes.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of Israel’s military ‘reprisal policy’ developed by Moshe Dayan and David Ben-Gurion in the 1950s.',
    'It aimed to deter Arab guerrilla infiltrations by launching disproportionately severe, aggressive counter-attacks across the armistice lines to force Arab governments to police their borders.',
    'It was a diplomatic framework where Israel offered immediate financial compensation for all border incidents.',
    'It was a policy of complete military passivity designed to encourage United Nations peacekeepers to patrol the borders.',
    'It focused exclusively on building defensive concrete walls along the entire length of the Green Line armistice border.',
    'Dayan and Ben-Gurion believed that only overwhelming offensive retaliation could prevent regular Arab armies from being emboldened by guerrilla successes. The policy created a continuous cycle of escalating cross-border violence that contributed to the 1956 Sinai campaign.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the Israeli military raid on the West Bank village of Qibya in October 1953.',
    'Unit 101, commanded by Ariel Sharon, destroyed 45 houses and killed 69 Arab civilians, drawing severe international condemnation from the United Nations and the US State Department.',
    'King Hussein of Jordan signed a formal military non-aggression treaty with Israel in Jerusalem.',
    'The United Nations Security Council expelled Israel from the General Assembly and deployed 20,000 peacekeepers.',
    'The Jordanian government ordered all Palestinian fedayeen groups to disband their bases across the West Bank.',
    'Launched in retaliation for the murder of an Israeli mother and her two children in Yehud, the Qibya raid shocked global opinion when 69 civilians, mostly women and children, died in blown-up buildings. The US temporarily suspended economic aid to Israel in protest.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of Egypt’s naval blockade of the Suez Canal and Straits of Tiran for Israel’s relations with Egypt between 1950 and 1955.',
    'Egypt blocked Israeli-flagged shipping and intercepted foreign ships carrying cargo to Eilat, strangling Israel’s southern trade and prompting Israel to declare any blockade a legitimate act of war.',
    'Egypt permitted completely unrestricted navigation for all Israeli civilian and military vessels through the Suez Canal.',
    'The blockade forced Israel to sign a comprehensive mutual defence alliance with Saudi Arabia and Iraq.',
    'The United Nations Security Council authorized the Israeli Navy to sink all Egyptian commercial vessels on sight.',
    'Citing an ongoing state of war, Egypt barred Israeli ships and designated strategic goods bound for Israel as contraband under the 1949 armistice. This maritime chokehold crippled Israel’s trade with Asia and Africa and became a primary justification for the 1956 invasion.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the covert espionage scandal known as the ‘Lavon Affair’ in Egypt in 1954.',
    'An Israeli intelligence ring planted bombs at British and American facilities in Cairo to blame Egyptian nationalists; its exposure caused Defense Minister Pinhas Lavon to resign and Ben-Gurion to return to power.',
    'Egypt signed a comprehensive non-aggression treaty with Israel and expelled all Palestinian fedayeen militants from Gaza.',
    'Great Britain and the United States launched joint naval strikes against Israeli coastal ports in the Mediterranean.',
    'The Israeli government successfully assassinated Gamal Abdel Nasser and dissolved the Egyptian revolutionary command.',
    'Known as ‘Operation Susannah’, the bungled plot aimed to convince Britain not to withdraw its troops from the Suez Canal base. When the ring was caught, two agents were executed in Cairo, triggering a major political crisis that fractured Israel’s ruling Mapai party.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the territorial changes of the 1948–49 War, what happened to the historic city of Jerusalem?',
    'The city was divided by barbed wire and no-man’s-land along the Green Line, with Jordan annexing East Jerusalem and Israel declaring West Jerusalem its national capital in December 1949.',
    'The entire city was captured by Israeli forces and declared an undivided capital recognized by all world powers.',
    'The city was handed over to the United Nations Trusteeship Council and governed by a Swedish high commissioner.',
    'Jordan captured all of Jerusalem and expelled every civilian resident, converting the city into a Hashemite military fortress.',
    'The division of Jerusalem became a physical manifestation of the conflict. Israel established its parliament (the Knesset) and government ministries in West Jerusalem, while Jordan controlled the historic Holy Places in East Jerusalem until June 1967.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the Arab League’s political response to the creation of Israel after the 1949 Armistice Agreements.',
    'Arab states established a comprehensive secondary and tertiary economic boycott against Israel, blacklisting foreign companies that conducted business with the Jewish state.',
    'Arab states established diplomatic embassies in Tel Aviv and traded petroleum directly with Israeli companies.',
    'The Arab League funded the construction of new agricultural settlements for Israeli immigrants in the Negev.',
    'Arab states recognized the Green Line as permanent international borders in a joint UN declaration.',
    'The Arab Boycott Office in Damascus maintained blacklists of foreign corporations, shipping lines, and banks dealing with Israel. The boycott isolated Israel economically in the Middle East and forced it to develop trade ties with distant European and American markets.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of King Abdullah of Transjordan’s annexation of the West Bank in 1950 for Palestinian Arab leadership.',
    'King Abdullah dissolved separate Palestinian national political organisations and granted Jordanian citizenship to West Bank residents, drawing fury from other Arab leaders and leading to his assassination in 1951.',
    'King Abdullah granted full independence to a sovereign Republic of Palestine with Yasser Arafat as President.',
    'King Abdullah entered into a formal military alliance with Israel to divide the Sinai Peninsula between them.',
    'King Abdullah expelled all 500,000 Palestinian residents across the Jordan River into Syria and Iraq.',
    'Abdullah’s annexation of the West Bank and East Jerusalem in April 1950 was recognized only by Britain and Pakistan. Other Arab states condemned it as betrayal, and a Palestinian nationalist assassinated King Abdullah at the Al-Aqsa Mosque in Jerusalem in July 1951.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the refugee status of Palestinian Arabs, what living conditions did refugees face in the 1950s?',
    'Most refugees lived in crowded tent cities that evolved into permanent cinderblock camps managed by UNRWA, facing strict restrictions on employment and travel in Lebanon and Syria.',
    'Refugees were granted luxurious villas and immediate citizenship in wealthy Gulf oil states like Kuwait and Qatar.',
    'Refugees were permitted by Israel to cross the Green Line daily to work on their original family farms.',
    'Refugees established an independent agricultural economy in the Sinai Desert with substantial financial exports to Europe.',
    'UNRWA established 58 designated refugee camps across Lebanon, Syria, Jordan, the West Bank, and Gaza. Barred from formal integration in most host states (except Jordan), generations grew up in crowded camps, cementing their collective determination to return.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the creation of the Israeli Defence Forces (IDF) for Israel’s national security doctrine.',
    'Lacking strategic geographic depth, the IDF relied on a small standing army backed by rapid citizen-reserve mobilisation, pre-emptive strikes, and transferring any war immediately into enemy territory.',
    'The IDF relied on a massive standing army of 1 million professional soldiers garrisoned permanently along borders.',
    'The IDF adopted a purely defensive doctrine that strictly prohibited crossing international armistice lines under any circumstances.',
    'The IDF was subordinated directly to the United Nations Military Staff Committee for all combat operations.',
    'Israel’s narrow waistline (only 9 miles wide near Netanya) meant the country could not absorb an invasion. The IDF doctrine demanded rapid intelligence, air superiority, pre-emptive offensive action, and swift mobile tank thrusts into Arab territory to force quick decisions.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the impact of territorial changes and immigration in Israel between 1948 and 1953, which sequence of events is historically accurate?',
    'Israel secured 79% of Palestine; the Law of Return opened borders to over 700,000 immigrants; and US aid combined with German reparations financed the housing and integration of the newcomers.',
    'Israel lost the Negev Desert; closed its borders to European immigration; and relied entirely on British colonial subsidies.',
    'Israel annexed the Gaza Strip; expelled all Mizrahi Jews to North Africa; and joined the Warsaw Pact in 1952.',
    'The United Nations revoked Resolution 194; Jordan invaded Tel Aviv; and Israel demilitarized its military forces in 1953.',
    'A high-scoring narrative links the territorial enlargement of the 1948–49 War to the legislative foundation of the 1950 Law of Return. Massive immigration strained the state’s resources until US grants and the 1952 German Reparations Agreement provided the financial stability to build permanent infrastructure.',
    3, // D
  ),
];

// Lesson 3: KT1.3: Increased Tension, 1955–63
const lesson3 = [
  makeQuestion(
    'Explain the importance of Gamal Abdel Nasser’s rise to power in 1954 for Egypt’s leadership of the Arab world.',
    'Nasser championed Pan-Arab nationalism and anti-colonialism across the Arab world via ‘Voice of the Arabs’ radio, pledging to unify Arab nations against Western dominance and Israel.',
    'Nasser signed an immediate mutual defence treaty with Israel and applied for Egypt to join NATO.',
    'Nasser restored the Egyptian monarchy and appointed British officers to command the Egyptian Air Force.',
    'Nasser abandoned Egypt’s military focus to establish a religious Islamic caliphate across North Africa.',
    'Overthrowing King Farouk in the 1952 Free Officers coup and outmanoeuvring Muhammad Naguib by 1954, Nasser captured the imagination of the Arab masses. His fiery speeches against Western imperialism and for social justice made Cairo the political capital of Arab nationalism.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Israeli attack on Gaza on 28 February 1955 (Operation Black Arrow).',
    'It killed 38 Egyptian soldiers, humiliated Nasser’s military regime, and convinced him that Egypt needed modern armaments, directly leading to the Czechoslovak arms deal with the Soviet bloc.',
    'It convinced Nasser to immediately sign a permanent non-aggression peace treaty with David Ben-Gurion.',
    'It led to an immediate joint British and French invasion of the Gaza Strip to protect Egyptian civilians.',
    'It forced the United Nations to revoke Israel’s membership in the General Assembly and impose global sanctions.',
    'Israeli paratroopers launched the raid in response to fedayeen infiltrations, blowing up Egyptian military headquarters in Gaza. The crushing defeat exposed the weakness of Egypt’s armed forces, prompting Nasser to sponsor larger fedayeen raids and seek Soviet weapons.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Czech arms deal in September 1955 for escalating Middle Eastern tension.',
    'Egypt acquired hundreds of advanced Soviet jet fighters, bombers, and tanks, ending the Western arms monopoly and alarming Israel into planning a pre-emptive strike against Egypt.',
    'It was an economic agreement where Czechoslovakia agreed to purchase all of Egypt’s cotton crops for 50 years.',
    'It provided Israel with 200 British Centurion tanks and French jet fighters to defend the Negev Desert.',
    'It required Egypt to expel all Soviet military advisors and join the pro-Western Baghdad Pact alliance.',
    'Brokered through Czechoslovakia to disguise direct Soviet involvement, the deal provided Egypt with MiG-15 jet fighters, Ilyushin bombers, and T-34 tanks. This shattered the Tripartite Declaration balance of power, convincing Israeli leaders that Egypt would attack once pilots were trained.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of US Secretary of State John Foster Dulles cancelling American funding for the Aswan High Dam in July 1956.',
    'Nasser retaliated by nationalising the Suez Canal Company on 26 July 1956 to use canal transit toll revenues to finance the dam’s construction independently.',
    'Nasser immediately resigned from office and handed power back to the Egyptian royal family.',
    'Egypt launched an immediate airborne invasion of the American naval base in Naples, Italy.',
    'The Soviet Union withdrew all military and technical assistance from Egypt and recognized Israel’s capital in Jerusalem.',
    'Dulles abruptly pulled US financial backing after Nasser recognized Communist China and purchased Soviet arms. Speaking to a jubilant crowd of 250,000 in Alexandria, Nasser used the codeword ‘de Lesseps’ over the radio, ordering Egyptian troops to seize the canal offices.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of Nasser’s nationalisation of the Suez Canal on 26 July 1956 for Britain and France.',
    'British Prime Minister Anthony Eden and French leaders viewed it as an illegal seizure of vital Western shipping infrastructure and resolved to overthrow Nasser by military force.',
    'Britain and France welcomed the decision as a legitimate act of post-colonial self-determination.',
    'It caused Britain to immediately abandon all military installations in Cyprus and Malta.',
    'France severed all diplomatic relations with Israel and offered Egypt free jet fighters.',
    'Eden viewed Nasser as a dangerous Middle Eastern dictator comparable to Mussolini or Hitler who threatened Britain’s oil lifeline. France was equally eager to strike Nasser because Egypt was providing arms, money, and radio support to the FLN rebels in French Algeria.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the Suez Crisis (1956), what was agreed at the secret Protocol of Sèvres in October 1956?',
    'Israel agreed to invade the Sinai Peninsula, giving Britain and France a pretext to issue an ultimatum and intervene militarily to ‘separate the combatants’ and seize the Suez Canal.',
    'Britain, France, and Egypt agreed to share canal revenues equally under United Nations supervision.',
    'Israel agreed to surrender the Negev Desert to Jordan in exchange for free navigation through the Suez Canal.',
    'The Soviet Union agreed to withdraw its nuclear weapons from the Middle East in exchange for Western trade credits.',
    'Meeting secretly at a private villa in Sèvres outside Paris, British Foreign Secretary Selwyn Lloyd, French leaders, and David Ben-Gurion concocted a collusive conspiracy. Israel would attack Egypt across Sinai, allowing Britain and France to intervene under the guise of peacemakers.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Israeli attack on Sinai on 29 October 1956 (Operation Kadesh).',
    'Israeli paratroopers seized the strategic Mitla Pass, routed Egyptian forces across the peninsula, and captured Sharm el-Sheikh to lift the blockade of the Straits of Tiran.',
    'The Egyptian Army repelled all Israeli forces within 24 hours and occupied the southern suburbs of Tel Aviv.',
    'The United States immediately dispatched two aircraft carrier strike groups to bomb Israeli airfields.',
    'David Ben-Gurion was forced to resign as Prime Minister and was replaced by Menachem Begin.',
    'Commencing with Colonel Ariel Sharon’s paratrooper drop at the Mitla Pass, the IDF swept across Sinai in eight days. Israeli troops captured the entire peninsula and Gaza Strip, dismantling Egyptian coastal guns at Ras Nasrani and opening the Straits of Tiran.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the Suez Crisis (1956), which actions did Britain and France take following the Israeli invasion of Sinai?',
    'They issued an ultimatum demanding both sides withdraw 10 miles from the canal, bombed Egyptian airfields, and dropped Anglo-French paratroopers to capture Port Said.',
    'They condemned Israel at the United Nations and imposed a total naval blockade on the port of Haifa.',
    'They ordered their Mediterranean fleets to defend Cairo and shoot down any attacking Israeli jet fighters.',
    'They persuaded the Soviet Union to deploy Warsaw Pact divisions to garrison the Suez Canal zone.',
    'Carrying out the Sèvres script, Britain and France issued an ultimatum demanding that Egypt and Israel withdraw from the canal zone. When Nasser predictably refused to abandon his own sovereign territory, Anglo-French air and amphibious forces invaded Port Said (Operation Musketeer).',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of US President Dwight D. Eisenhower’s reaction for the outcome of the Suez Crisis (1956).',
    'Eisenhower fiercely opposed the Anglo-French-Israeli invasion, threatening severe economic sanctions and withholding IMF loans to force Britain to halt military operations and accept a ceasefire.',
    'Eisenhower dispatched the US Sixth Fleet to assist British and French paratroopers in capturing Cairo.',
    'Eisenhower congratulated Anthony Eden and provided $500 million in emergency military aid to Israel.',
    'Eisenhower declared war on Egypt and ordered the United States Air Force to bomb the Aswan High Dam.',
    'Furious that the invasion occurred days before the US presidential election and distracted world attention from the Soviet invasion of Hungary, Eisenhower applied crushing financial leverage. He threatened to crash the British pound sterling, forcing Britain into an immediate humiliating ceasefire.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of Soviet Premier Bulganin’s threats during the Suez Crisis in November 1956.',
    'The USSR threatened to unleash rocket strikes against London and Paris and dispatch Soviet volunteers to Egypt, cementing the Soviet Union’s reputation as the primary protector of Arab states.',
    'The Soviet Union declared war on Israel and launched an immediate naval invasion of Haifa.',
    'The Soviet Union withdrew all funding for the Aswan High Dam and broke diplomatic ties with Egypt.',
    'The United States and the Soviet Union signed an immediate mutual defence alliance to partition Egypt.',
    'Premier Nikolai Bulganin dispatched threatening diplomatic notes to Britain, France, and Israel, hinting at atomic missile strikes. While Washington warned Moscow against intervening, Nasser’s regime credited Soviet deterrence with halting the imperialist invasion.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Suez Crisis (1956) for British global power and prestige.',
    'It exposed Britain’s inability to act independently without US approval, hastened the end of the British Empire, and forced British Prime Minister Anthony Eden to resign in January 1957.',
    'It revitalized British imperial authority across the Middle East, leading to the re-occupation of Palestine.',
    'It resulted in Britain permanently annexing the Suez Canal and controlling all international shipping.',
    'It persuaded the British Parliament to abolish the Royal Navy and withdraw from all NATO commitments.',
    'Suez is widely regarded by historians as the definitive death knell for Britain as an independent global superpower. Anthony Eden’s health collapsed alongside his political reputation, forcing his resignation, and British colonial prestige in the Middle East was permanently shattered.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the United Nations Emergency Force (UNEF) deployment in the Sinai Peninsula after the Suez Crisis.',
    'UNEF peacekeepers were deployed along the armistice line and at Sharm el-Sheikh to guarantee freedom of navigation for Israeli ships through the Straits of Tiran into Eilat.',
    'UNEF took over sovereign governance of Egypt and managed all municipal revenues from the Suez Canal.',
    'UNEF was authorized to disarm the Israeli Defence Forces and permanently occupy West Jerusalem.',
    'UNEF constructed permanent missile bases across Sinai to prevent any future Egyptian troop deployments.',
    'Created by Canadian diplomat Lester Pearson (who won the Nobel Peace Prize for the initiative), UNEF was the world’s first armed UN peacekeeping force. Stationed in Sinai and Gaza from 1957 to 1967, it provided a decade of relative calm along the Egyptian-Israeli frontier.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Suez Crisis (1956) for Nasser and Egypt’s leadership of the Arab world.',
    'Despite military defeat in Sinai, Nasser emerged as a triumphant political hero who had defied two European colonial powers and retained sovereign ownership of the Suez Canal.',
    'Nasser was deposed in a popular military coup and replaced by an Egyptian royalist general.',
    'Egypt was forced to cede the entire Sinai Peninsula and Gaza Strip permanently to Great Britain.',
    'Nasser signed a mutual security pact with Israel and severed all relations with the Soviet Union.',
    'Although the Egyptian Army was soundly beaten on the battlefield by the IDF, Nasser won an overwhelming diplomatic and political victory. Standing up to Britain, France, and Israel cemented his position as the undisputed leader of Pan-Arab nationalism.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of Nasser’s heightened political prestige for the formation of the United Arab Republic (UAR) in 1958.',
    'Syria merged with Egypt to create the United Arab Republic under Nasser’s presidency, fulfilling Pan-Arab aspirations to unite the Arab world into a single powerful state.',
    'Syria declared war on Egypt to prevent Nasser from expanding his political influence in Damascus.',
    'Iraq, Jordan, and Lebanon merged into a pro-Israeli democratic federation under King Hussein.',
    'The Arab League voted to dissolve the State of Israel and appoint Nasser as Governor of Palestine.',
    'Fearing a domestic communist takeover and inspired by Nasser’s charismatic leadership, Syrian leaders travelled to Cairo in February 1958 to propose immediate political union. The UAR united Egypt and Syria, encircling Israel on two fronts and alarming Western powers.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the formation of the United Arab Republic (UAR) in 1958, why did the union dissolve in 1961?',
    'Syrian military officers and business elites resented Egyptian political domination and nationalisation policies, staging a military coup in Damascus in September 1961 to secede from the UAR.',
    'The United States Air Force bombed military bases in Cairo, forcing Egypt to release Syria from the union.',
    'Israel launched a pre-emptive ground offensive that severed all geographic communication between Cairo and Damascus.',
    'Nasser decided to dissolve the UAR voluntarily so Egypt could join the European Economic Community.',
    'Nasser treated Syria as a subordinate province, appointing Egyptian bureaucrats, dissolving Syrian political parties, and imposing socialist economic nationalisations. Resentment boiled over in September 1961, when Syrian army units seized power and re-established Syrian independence.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the Eisenhower Doctrine announced by the US government in January 1957.',
    'It committed American economic and military assistance to protect any Middle Eastern country threatened by communist aggression, demonstrated by US troop landings in Lebanon in 1958.',
    'It prohibited any American financial or military aid to Israel to preserve friendships with Arab kingdoms.',
    'It decreed that the United States would exclusively purchase oil from Egypt rather than Saudi Arabia.',
    'It ordered the immediate dismantling of all British and French naval bases throughout the Mediterranean Sea.',
    'Alarmed by growing Soviet influence following the Suez Crisis, President Eisenhower sought to fill the geopolitical vacuum left by Britain and France. In July 1958, Eisenhower invoked the doctrine by dispatching 14,000 US Marines to Lebanon to protect President Chamoun from pro-Nasser rebels.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the Israeli military withdrawal from the Sinai Peninsula in March 1957.',
    'Israel withdrew its forces only after securing international guarantees that the Straits of Tiran would remain open to Israeli shipping under the surveillance of UNEF troops.',
    'Israel permanently annexed the Gaza Strip and integrated all 200,000 refugees into the Israeli economy.',
    'The United States cut all diplomatic relations with Israel and imposed an arms embargo on the Middle East.',
    'Egypt signed a comprehensive non-aggression treaty that granted Israel full use of the Suez Canal.',
    'Ben-Gurion initially hoped to retain parts of Sinai and Gaza, but intense pressure from President Eisenhower forced a full IDF withdrawal. In return, the US and Western maritime powers guaranteed Israel’s right of innocent passage through the Straits of Tiran.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the events and significance of Israeli attacks on Gaza in 1955 and Sinai in 1956, which sequence correctly explains the escalation?',
    'The 1955 Gaza raid prompted the Czech arms deal; Nasser nationalised the Suez Canal; and Israel colluded with Britain and France to invade Sinai in October 1956.',
    'Israel invaded Sinai in 1955; the UN placed peacekeepers in Cairo; and Nasser nationalised the canal in 1957.',
    'Nasser attacked Tel Aviv in 1955; Israel captured Cairo in 1956; and Britain mediated a peace treaty in 1957.',
    'The US cancelled dam funding in 1954; Israel raided Gaza in 1956; and Egypt joined the Baghdad Pact in 1958.',
    'A high-scoring narrative account links the February 1955 Gaza attack directly to Nasser’s desperate search for weapons, leading to the Czech deal. When the US cancelled dam loans in retaliation, Nasser seized the canal, setting the stage for the Sèvres conspiracy and the 1956 Sinai invasion.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Suez Crisis (1956) for French-Israeli military and scientific relations.',
    'France became Israel’s primary arms supplier, providing Dassault Mirage jet fighters and secret technical assistance to construct the Dimona nuclear reactor in the Negev.',
    'France severed all diplomatic ties with Israel and supported Arab nationalist groups across North Africa.',
    'France forced Israel to surrender all captured British weaponry to the United Nations in Geneva.',
    'Israel agreed to deploy two IDF armoured divisions to assist French colonial forces in Vietnam.',
    'Having fought side-by-side in 1956, French-Israeli cooperation reached an intimate peak. France supplied the advanced Mirage fighters that dominated the skies in 1967 and provided the nuclear reactor at Dimona that gave Israel a covert nuclear weapons capability.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing increased tension between 1955 and 1963, which sequence of three stages captures the geopolitical shifts?',
    'Nasser’s 1955 Czech arms deal brought the Cold War to the Middle East; the 1956 Suez Crisis elevated Nasser’s Pan-Arab prestige; and the 1958 UAR marked the high-water mark of Arab unification efforts.',
    'The Suez Canal was nationalised in 1954; the Gaza raid occurred in 1956; and Israel captured Damascus in 1958.',
    'Britain invaded Sinai in 1955; the US built the Aswan Dam in 1956; and the UAR annexed Jordan in 1958.',
    'UNEF was expelled in 1955; the Eisenhower Doctrine was signed in 1956; and Syria conquered Egypt in 1961.',
    'A coherent narrative shows how regional conflict became entangled with global superpower rivalry. The influx of Soviet arms to Egypt led directly to the 1956 war, which catapulted Nasser into supreme Arab leadership, culminating in the 1958 Egyptian-Syrian merger into the UAR.',
    3, // D
  ),
];

module.exports = {
  lesson0,
  lesson1,
  lesson2,
  lesson3,
};
