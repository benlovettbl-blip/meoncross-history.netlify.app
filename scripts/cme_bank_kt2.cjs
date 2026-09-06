const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 4: KT2.1: The Six Day War, 1967
const lesson4 = [
  makeQuestion(
    'Explain the significance of the Cairo Conference (1964) for the Palestinian national movement.',
    'Arab League leaders convened in Cairo in January 1964 to create the Palestine Liberation Organization (PLO) and establish the Palestine Liberation Army (PLA) under Arab state sponsorship.',
    'It was the summit where Arab nations signed a permanent non-aggression peace treaty with Israel in exchange for free trade.',
    'It resulted in the immediate military unification of Egypt, Saudi Arabia, and Turkey under a single high command.',
    'It formally disbanded all Palestinian refugee camps and ordered the permanent resettlement of refugees in North Africa.',
    'Summoned by Gamal Abdel Nasser to counter Israel’s diversion of the River Jordan, the Cairo Conference established the PLO under Ahmad Shukeiri. Although intended to keep Palestinian nationalism under state control, it gave Palestinians an official international body.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the growth of Fatah and the PLO between 1964 and 1967.',
    'Led by Yasser Arafat, Fatah rejected passive reliance on Arab governments, launching independent cross-border sabotage raids from January 1965 against Israeli water pipelines and infrastructure.',
    'Fatah established a moderate diplomatic party that renounced armed struggle and recognized Israel’s 1949 Green Line borders.',
    'The PLO formed an official political coalition with Israel’s Labor Party to govern Jerusalem under a joint council.',
    'Fatah surrendered all weapons to the United Nations Emergency Force (UNEF) in exchange for economic development loans.',
    'Fatah’s doctrine of ‘popular armed revolution’ captivated young Palestinian refugees who had grown disillusioned with empty promises from Arab regimes. Their cross-border guerrilla raids provoked escalating Israeli military retaliation, dragging Arab states toward war.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing escalating tension between Israel, Syria and Jordan, what was the significance of the River Jordan water dispute in the mid-1960s?',
    'Syria attempted to divert the Banias and Hasbani headwaters away from Israel’s National Water Carrier, prompting the IDF to use tank and airstrikes to destroy Syrian construction machinery.',
    'Israel attempted to dam the Suez Canal in Sinai to starve Egyptian agriculture in the Nile Delta.',
    'Jordan and Israel fought a naval battle in the Dead Sea over the rights to extract chemical potash fertilizers.',
    'The United Nations placed the entire Sea of Galilee under French colonial administration to prevent border clashes.',
    'Water was a matter of national life or death. When the Arab League launched an engineering scheme to divert 75% of the water feeding Israel’s National Water Carrier, Israel used long-range tank artillery and airstrikes to demolish Syrian bulldozers and canals between 1964 and 1966.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of Syria’s support for Fatah in escalating tension between Israel, Syria and Jordan before 1967.',
    'Following the radical Ba’athist coup in Damascus in February 1966, Syria openly armed and hosted Fatah guerrilla cells, encouraging cross-border infiltration and shelling Israeli kibbutzim from the Golan Heights.',
    'Syria arrested all Fatah leaders and expelled Palestinian guerrillas across the border into Jordan to prevent war with Israel.',
    'Syria signed a secret non-aggression pact with Israel agreeing to partition the West Bank between Damascus and Tel Aviv.',
    'Syria demanded that the Arab League revoke the PLO’s charter and recognize King Hussein as the sole voice of Palestine.',
    'The extreme left-wing Ba’ath regime of Salah Jadid embraced a ‘people’s war of liberation’. Syrian state radio broadcast martial rhetoric while Syrian artillery perched on the Golan Heights bombarded Israeli tractors below, creating an intolerable security crisis for Israel.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of Israel’s raid on Samu on 13 November 1966.',
    'Israeli forces destroyed dozens of houses and killed 15 Jordanian soldiers in the West Bank, triggering violent anti-Hashemite street riots against King Hussein and pushing Jordan toward an alliance with Egypt.',
    'King Hussein declared war on Syria and launched an armored invasion of Damascus to punish the Ba’athists.',
    'The United Nations Security Council expelled Israel from the General Assembly and imposed global petroleum sanctions.',
    'The Palestinian guerrilla movement agreed to surrender all small arms and cease cross-border attacks from Jordanian territory.',
    'Launched in retaliation for a Fatah landmine that killed three Israeli paratroopers, the disproportionate raid on the West Bank village of Samu outraged Jordanians. Palestinians rioted against King Hussein for failing to protect them, severely destabilizing Jordan’s monarchy.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the events of 7 April 1967 over the Golan Heights.',
    'An escalating artillery clash led to a major air dogfight where Israeli Mirage jets shot down six Syrian MiG-21s and buzzed the skies over Damascus, deeply humiliating the Syrian government.',
    'Syrian bombers destroyed the Israeli port city of Haifa and sank three Israeli patrol boats in Lake Tiberias.',
    'The United States Sixth Fleet deployed 10,000 Marines to occupy the border zone between Israel and Syria.',
    'Israel and Syria signed an emergency armistice treaty in Geneva demilitarizing the Sea of Galilee.',
    'The air engagement began when Syrian gunners fired on an Israeli armored tractor plowing in the demilitarized zone. Israeli Dassault Mirage fighters overwhelmed the Syrian air force, pursuing fleeing MiGs right over the Syrian capital of Damascus in a display of total aerial dominance.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the actions of the USSR, Nasser and the USA in the period leading to war, what crucial role did Soviet intelligence play in May 1967?',
    'Soviet intelligence fabricated reports alleging that Israel had massed 11 to 13 brigades along its northern border preparing to launch an invasion to overthrow the Syrian regime.',
    'The Soviets informed Nasser that the United States Navy was preparing to launch nuclear strikes on Cairo and Alexandria.',
    'Moscow claimed that King Hussein of Jordan had secretly agreed to join NATO and grant naval bases to Great Britain.',
    'Soviet officials warned Egypt that Israel had completed 50 operational atomic warheads at the Dimona nuclear reactor.',
    'On 13 May 1967, Soviet officials warned Cairo that Israeli forces were concentrating on the Syrian frontier for an imminent assault. Although UN observers inspected the area and confirmed no buildup existed, Nasser felt politically compelled to prove his leadership of the Arab world.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the actions of Nasser on 16–18 May 1967 following Soviet intelligence reports.',
    'Nasser deployed two Egyptian armoured divisions into Sinai and demanded that UN Secretary-General U Thant immediately withdraw the United Nations Emergency Force (UNEF) peacekeepers.',
    'Nasser launched a surprise pre-emptive airstrike that destroyed the Israeli nuclear facility at Dimona.',
    'Nasser signed an emergency peace treaty with Israel in Cairo to demilitarise the Sinai Peninsula permanently.',
    'Nasser resigned from the Egyptian presidency and handed power to an international United Nations committee.',
    'Taunted by Jordan and Syria for hiding behind UN skirts, Nasser ordered 100,000 troops and 1,000 tanks into Sinai. When Secretary-General U Thant complied with Nasser’s demand to withdraw UNEF, the international buffer that had kept peace since 1957 vanished overnight.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of Nasser’s decision to close the Straits of Tiran to Israeli shipping on 22 May 1967.',
    'It blockaded Israel’s southern port of Eilat, crossing an explicit Israeli red line (casus belli) and making a pre-emptive Israeli military strike virtually inevitable.',
    'It led to an immediate joint British and French naval expedition to conquer the Suez Canal for a second time.',
    'It persuaded the United States to deploy the Seventh Fleet to enforce an immediate ceasefire in the Red Sea.',
    'It forced Israel to surrender the Negev Desert to Egypt under an emergency United Nations trusteeship.',
    'By deploying troops to Sharm el-Sheikh and declaring the Straits of Tiran closed to Israeli-flagged ships and strategic cargo, Nasser crossed Israel’s declared red line. The blockade strangled Israel’s oil imports from Iran, creating an existential crisis in Tel Aviv.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Jordanian-Egyptian mutual defence pact signed on 30 May 1967 for escalating tension.',
    'King Hussein flew to Cairo to place the Jordanian army under Egyptian command, convincing Israeli leaders that they were completely encircled by a hostile Arab coalition preparing an attack.',
    'King Hussein signed an agreement with Egypt to annex the Sinai Peninsula and create a unified Hashemite-Egyptian republic.',
    'It resulted in Jordan expelling all Palestinian guerrilla fighters from the West Bank and sealing the Green Line.',
    'It provoked an immediate Soviet military intervention that occupied the Jordanian capital of Amman.',
    'In a stunning diplomatic reversal, King Hussein reconciled with his bitter rival Nasser, placing his British-trained army under Egyptian General Abdul Munim Riad. Surrounded on three sides by armies boasting over 250,000 men and 2,000 tanks, Israel felt an immediate threat of annihilation.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the actions of the USA in the period leading to war, what was President Lyndon B. Johnson’s diplomatic stance?',
    'Johnson urged Israel not to strike first while attempting to organize an international naval flotilla to open the straits, but privately signaled that the US would understand if Israel defended itself.',
    'Johnson threatened to deploy US B-52 bombers to strike Tel Aviv if Israel mobilized its civilian army reserves.',
    'The US provided Israel with 500 Phantom jet fighters and ordered the US Navy to sink the Egyptian fleet in the Red Sea.',
    'The US declared complete neutrality and severed all diplomatic and intelligence relationships with both Israel and Egypt.',
    'Preoccupied by the Vietnam War, Johnson cautioned Israeli Foreign Minister Abba Eban that ‘Israel will not be alone unless it decides to go alone’. However, when US efforts to assemble a ‘Regatta’ of maritime powers to break the blockade failed, Washington tacitly greenlit Israeli action.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of Moshe Dayan’s appointment as Minister of Defense on 1 June 1967 for Israel’s military decisions.',
    'Dayan’s entry into Levi Eshkol’s national unity government ended domestic political paralysis and decisively shifted the Israeli cabinet in favour of an immediate pre-emptive airstrike.',
    'Dayan immediately ordered the IDF to stand down all reserve brigades and submit to United Nations mediation.',
    'Dayan signed an emergency treaty transferring the Negev Desert to Transjordan in exchange for a non-aggression pact.',
    'Dayan was a civilian diplomat who negotiated the immediate reopening of the Straits of Tiran in Cairo.',
    'Public anxiety during the three-week waiting period (‘Konenut’) eroded confidence in Prime Minister Levi Eshkol. Appointing war hero Moshe Dayan electrified public morale and united the cabinet behind General Staff plans for an immediate pre-emptive offensive.',
    3, // D
  ),
  makeQuestion(
    'In a narrative account analysing key events of the Six Day War (1967), what was the decisive achievement of Operation Focus on the morning of 5 June 1967?',
    'Flying low beneath Egyptian radar, the Israeli Air Force destroyed over 300 grounded Egyptian aircraft and cratered 18 airfields in three hours, securing total air supremacy.',
    'An amphibious assault by Israeli naval commandos captured the presidential palace in Cairo and captured Nasser.',
    'Israeli paratroopers dropped along the Suez Canal, capturing all bridges and cutting off Egyptian army communications.',
    'Israeli fighter jets shot down 50 Soviet nuclear bombers over the Mediterranean Sea in a single dogfight.',
    'Conceived by IAF Commander Ezer Weizman and Chief of Staff Yitzhak Rabin, Operation Focus left only 12 jets defending Israeli skies while 200 strike aircraft struck Egyptian airfields at 07:45. By noon, Egypt’s air force was wiped out, leaving Egyptian ground forces defenseless against Israeli airstrikes.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing key events of the Six Day War, how did fighting unfold on the Jordanian front between 5 and 7 June 1967?',
    'Despite Israeli warnings to stay neutral, Jordanian artillery shelled West Jerusalem and Tel Aviv, prompting Israeli paratroopers to encircle and capture East Jerusalem and the entire West Bank.',
    'Jordanian armored brigades conquered West Jerusalem and linked up with Egyptian forces in the southern Negev.',
    'Jordan immediately surrendered all military positions to United Nations peacekeepers without firing a single shot.',
    'The Israeli Air Force bombed the royal palace in Amman, forcing King Hussein to sign an unconditional surrender in 12 hours.',
    'Prime Minister Eshkol sent an urgent message to King Hussein promising that Israel would not attack if Jordan stayed out. Misled by Nasser’s false reports of sweeping Egyptian air victories, Hussein opened fire. The IDF launched an immediate counter-attack, capturing the West Bank in 48 hours.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the capture of the Old City of Jerusalem on 7 June 1967 for the Israeli nation.',
    'Israeli paratroopers commanded by Motta Gur reached the Western Wall and Temple Mount, reuniting the divided city under Jewish sovereignty for the first time in nearly 2,000 years.',
    'It caused the immediate collapse of the Hashemite monarchy in Jordan and the installation of a democratic republic.',
    'It prompted the United Nations Security Council to designate Jerusalem as the permanent global capital of the UN.',
    'It forced all Arab nations to sign permanent peace treaties and dismantle their armies within 30 days.',
    'Colonel Motta Gur’s iconic radio transmission, ‘The Temple Mount is in our hands!’, marked an emotional and religious pinnacle for world Jewry. Access to the Western Wall, denied to Jews since 1948, was restored, and the city was immediately reunified by Israeli authorities.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing key events of the war, what occurred on the Syrian front on 9–10 June 1967?',
    'Israeli armoured and infantry brigades scaled the steep escarpment of the Golan Heights, capturing the fortress plateau and advancing to Quneitra before accepting a UN ceasefire.',
    'Syrian motorized divisions pushed into the suburbs of Haifa before being halted by French naval gunfire.',
    'The Soviet Union dropped airborne divisions onto the Golan Heights to protect Syrian defensive bunkers.',
    'Syrian forces surrendered voluntarily after David Ben-Gurion agreed to hand over the Sea of Galilee.',
    'With Egyptian and Jordanian fronts secured, Defense Minister Dayan ordered an assault up the heavily fortified Golan escarpment on 9 June. Israeli bulldozers and tanks fought uphill through minefields and concrete pillboxes, seizing the plateau and silencing Syrian artillery for good.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the territorial changes of the Six Day War (1967) for Israel’s geographic size.',
    'Israel captured the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights, quadrupling its territorial size and bringing over 1 million Palestinian Arabs under military occupation.',
    'Israel lost 25% of its pre-war territory to Jordan and was forced to pay $1 billion in reparations.',
    'Israel’s borders remained completely unchanged following an emergency United Nations Security Council resolution.',
    'Israel annexed the entire Kingdom of Jordan and the southern provinces of Lebanon up to the Litani River.',
    'In just six days, Israel transformed from a vulnerable nation with a 9-mile waistline into the undisputed regional superpower. However, controlling the occupied territories created profound military, demographic, and moral dilemmas that continue to define the Middle Eastern conflict.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Six Day War (1967) for Nasser’s prestige and Pan-Arab leadership.',
    'The catastrophic military collapse of Egypt’s armed forces in Sinai shattered Nasser’s Pan-Arab aura of invincibility, prompting his brief resignation on 9 June before crowds demanded his return.',
    'It solidified Nasser’s reputation as the supreme conqueror of the Middle East, leading to the unification of 12 Arab states.',
    'It resulted in Nasser being appointed Secretary-General of the United Nations in a unanimous General Assembly vote.',
    'It convinced Nasser to immediately abolish the Egyptian army and convert Egypt into a neutral trading state like Switzerland.',
    'Nasser had promised the Arab masses a decisive victory that would liberate Palestine; instead, Egypt lost 15,000 soldiers, 80% of its military hardware, and the entire Sinai Peninsula. Pan-Arab nationalism suffered a mortal blow from which it never recovered.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Six Day War (1967) for Israeli public confidence and national defence policy.',
    'The stunning six-day triumph fostered a culture of military invincibility (‘The Conception’) that led Israeli leaders to underestimate Arab military capabilities before 1973.',
    'It convinced Israeli leaders that the IDF was completely incapable of defending the nation without foreign ground troops.',
    'It prompted the Knesset to dismantle the standing army and rely entirely on civilian border police.',
    'It led to the immediate evacuation of all Jewish residents from West Jerusalem to coastal cities.',
    'The miraculous victory created national euphoria and hubris among Israeli political and military elites. Convinced that Arab armies would not dare attack their formidable defensive lines, Israeli intelligence grew dismissive of Egyptian military reforms, setting the stage for the 1973 surprise.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the key events of the Six Day War (1967), which sequence of three stages correctly explains how the conflict unfolded?',
    'Nasser expelled UNEF and closed the Straits of Tiran; Israel launched pre-emptive airstrikes destroying Arab air forces on 5 June; and the IDF captured Sinai, the West Bank, and the Golan Heights by 10 June.',
    'Syria invaded Galilee on 1 June; the UN ordered Britain to intervene on 5 June; and Israel surrendered Jerusalem on 10 June.',
    'Jordan captured Tel Aviv on 5 June; the US Sixth Fleet bombed Cairo on 7 June; and a ceasefire was declared on 10 June.',
    'Israel signed partition in May 1967; Egypt invaded Haifa on 5 June; and the Soviet Union annexed the Sinai on 10 June.',
    'A high-scoring narrative account links the pre-war crisis (UNEF eviction and naval blockade) to Israel’s devastating pre-emptive airstrike on 5 June. With control of the skies, the IDF routed Egyptian, Jordanian, and Syrian ground forces on three separate fronts in under a week.',
    3, // D
  ),
];

// Lesson 5: KT2.2: Aftermath of the 1967 War
const lesson5 = [
  makeQuestion(
    'Explain the key principle of UN Resolution 242 adopted by the UN Security Council in November 1967.',
    'It established the ‘land for peace’ formula, calling for the withdrawal of Israeli armed forces from territories occupied and the recognition of the sovereignty and territorial integrity of every state in the area.',
    'It ordered Israel to surrender West Jerusalem to Jordan and dissolve the Israeli Defence Forces.',
    'It declared that all Palestinian refugees must be permanently relocated to Australia and North America.',
    'It authorized the Soviet Union to deploy naval garrisons along the Suez Canal to collect international transit tolls.',
    'Drafted by British Ambassador Lord Caradon, Resolution 242 became the cornerstone of all future Middle East peace diplomacy. It linked Arab recognition of Israel’s ‘right to live in peace within secure and recognized boundaries’ to Israeli territorial withdrawal.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the ambiguous phrasing in the English text of UN Resolution 242 regarding Israeli withdrawal.',
    'By calling for withdrawal from ‘territories occupied’ rather than ‘the territories occupied’, Israel argued it was not legally required to withdraw from all land captured in 1967.',
    'It caused the United Nations Security Council to disband and re-form under Soviet military leadership.',
    'It led to an immediate joint military invasion of Israel by Great Britain and France to enforce French text.',
    'It forced Jordan and Egypt to declare war on the United States for drafting the resolution.',
    'The omission of the definite article ‘the’ was intentional diplomatic drafting. While the French text specified ‘des territoires occupés’ (implying all territories), the English text allowed Israel to argue that minor border rectifications were permissible to secure defensible boundaries.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Arab League Summit in Khartoum in September 1967 for diplomatic negotiations.',
    'Arab leaders issued the famous ‘Three No’s’: no peace with Israel, no recognition of Israel, and no negotiations with Israel, rejecting direct peace talks.',
    'Arab leaders agreed to recognize Israel immediately in exchange for financial loans from the World Bank.',
    'The Arab League expelled Egypt and Syria for losing their sovereign territories during the Six Day War.',
    'Arab nations signed a mutual defence alliance with the United States to purchase American Phantom jets.',
    'Defeated on the battlefield, Arab leaders met in Sudan to forge a unified diplomatic front. The Khartoum Resolution’s hardline stance entrenched regional deadlock, convincing many Israelis that territorial compromise was pointless since Arab leaders refused to negotiate.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the continued dispute over the Suez Canal between 1967 and 1970 (the War of Attrition).',
    'The canal remained closed to all international shipping for eight years while Egypt and Israel fought prolonged artillery duels, commando raids, and aerial dogfights across the waterway.',
    'Egypt permitted completely free passage for Israeli oil tankers while barring European commercial vessels.',
    'The United States and the Soviet Union jointly purchased the canal from Egypt and built a nuclear naval base.',
    'Israel constructed a continuous underground highway beneath the canal connecting Tel Aviv directly to Cairo.',
    'Nasser launched the War of Attrition in 1969 to prevent the ceasefire line from hardening into a permanent border. The conflict cost hundreds of Israeli lives and devastated Egyptian canal cities until US Secretary of State William Rogers brokered a ceasefire in August 1970.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the 1967 war for the refugee status of Palestinian Arabs.',
    'Approximately 300,000 Palestinians became newly displaced refugees (a second wave called the ‘Nazihun’), fleeing across the Jordan River into overcrowded camps in Jordan.',
    'All Palestinian refugees living in the West Bank were granted immediate citizenship and voting rights in Israel.',
    'Over 500,000 Palestinians were safely repatriated to their original pre-1948 family homes inside Israel.',
    'The United Nations dissolved UNRWA and declared that no Palestinian qualified for international refugee assistance.',
    'Known as the Nazihun (‘the displaced’), roughly half of this second refugee wave were being displaced for the second time in their lives, having fled pre-1948 areas originally. Their influx into Jordan placed immense political and economic strain on King Hussein’s kingdom.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the occupied territories for Israel’s strategic security after 1967.',
    'The Sinai Peninsula, West Bank, and Golan Heights provided massive strategic depth, moving borders away from major Israeli population centres and providing early warning radar outposts.',
    'The territories contained no military value and cost over 90% of Israel’s annual national budget to police.',
    'The territories enabled Israel to conquer the oil fields of Saudi Arabia and the Persian Gulf within 12 months.',
    'They allowed Israel to completely demilitarise its regular army and rely entirely on civilian police.',
    'Prior to 1967, Israeli aircraft had only three minutes of radar warning before enemy jets reached Tel Aviv, and Syrian guns could shell Galilee kibbutzim at will. The occupied territories provided geographic buffers that fundamentally altered Israel’s military calculations.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of Israel’s consolidation of control over East Jerusalem immediately after the Six Day War.',
    'Israel passed legislation annexing East Jerusalem on 27 June 1967, declared the city its eternal undivided capital, and constructed new Jewish residential neighbourhoods around the perimeter.',
    'Israel handed all Christian and Muslim holy sites over to the direct sovereign control of the Vatican.',
    'Israel expelled all 70,000 Palestinian residents of East Jerusalem across the Jordan River into Amman.',
    'The United Nations immediately relocated its global headquarters from New York to East Jerusalem.',
    'Israel swiftly removed the physical barbed-wire and minefields dividing Jerusalem, expanding municipal boundaries and offering residents blue Israeli identity cards. The international community, through UN Resolution 252, declared Israel’s annexation null and void.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the occupied territories, what was the strategic purpose of the Allon Plan formulated in 1967?',
    'To construct Jewish agricultural and military settlements along the Jordan Valley and Judean Desert to establish a permanent security border along the Jordan River while returning Arab population centres.',
    'To build an impenetrable concrete wall dividing the Negev Desert into Israeli and Egyptian administrative zones.',
    'To expel all Arab populations from the West Bank and replace them with 2 million European Jewish immigrants.',
    'To surrender all captured territories unconditionally to the United Nations within six months of the war.',
    'Drafted by Labor Minister Yigal Allon, the plan sought to maximize Israeli security while minimizing Arab population absorption. It envisioned an Israeli military barrier along the Jordan River while offering densely populated West Bank towns (like Nablus and Ramallah) back to Jordanian civil rule.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Battle of Karameh in March 1968 for the growth of Fatah and the PLO.',
    'Palestinian guerrillas and Jordanian troops resisted an Israeli punitive raid, transforming Karameh into a symbolic heroic victory that inspired thousands of young recruits and made Yasser Arafat PLO Chairman in 1969.',
    'The Israeli army completely destroyed all Palestinian militant factions, ending armed resistance for a decade.',
    'King Hussein signed an immediate peace treaty with Israel and expelled all Palestinian refugees from Jordan.',
    'The United Nations Security Council authorized the PLO to establish an independent government in West Jerusalem.',
    'Although the IDF inflicted heavy casualties and demolished the Karameh base, Palestinian fighters stood their ground in close-quarters combat alongside Jordanian artillery. The battle became legendary, transforming Arafat into a world-famous resistance leader.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the use of terrorism, what was the primary objective of the PFLP airplane hijacks of September 1970?',
    'The Popular Front for the Liberation of Palestine hijacked four Western airliners to Dawson’s Field in Jordan, blowing up three empty aircraft on world television to publicize the Palestinian cause and demand prisoner releases.',
    'To transport 50,000 Palestinian fighters directly into Tel Aviv to launch an armed insurrection.',
    'To bomb the headquarters of the United Nations Security Council in New York City.',
    'To force the government of Switzerland to pay $1 billion in ransom directly to the Arab League in Cairo.',
    'Led by Marxist physician George Habash, the PFLP believed that sensational international terror operations were necessary to shock the world into confronting the Palestinian issue. The dramatic images of blown-up jetliners in the Jordanian desert stunned global audiences.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the PFLP airplane hijacks of 1970 for King Hussein of Jordan.',
    'The blatant humiliation of Jordanian sovereignty in front of global media convinced King Hussein that the armed Palestinian militias were operating as a rogue state-within-a-state that had to be crushed.',
    'King Hussein abdicated his throne and appointed George Habash as the new Prime Minister of Jordan.',
    'King Hussein signed a formal mutual defence pact with the PFLP to launch an invasion of the West Bank.',
    'The United States dispatched 50,000 troops to occupy Amman and disarm the Jordanian armed forces.',
    'Armed Palestinian fedayeen patrolled the streets of Amman, set up armed roadblocks, and openly defied Jordanian police and royal authority. The Dawson’s Field spectacular proved the final straw for King Hussein, who declared martial law on 16 September 1970.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the expulsion of the PLO from Jordan (1970), what occurred during ‘Black September’?',
    'The Jordanian army launched a ferocious civil war against Palestinian guerrilla factions in Amman, killing thousands of fighters and expelling the PLO leadership and brigades across the border into Lebanon.',
    'The Israeli Air Force bombed the royal palace in Amman to support Palestinian fedayeen against King Hussein.',
    'Jordan and the PLO merged their armies to launch a joint armored assault against the Israeli-held West Bank.',
    'The United Nations deployed 30,000 peacekeepers who peacefully disarmed both the Jordanian army and the PLO.',
    'Ten days of brutal urban fighting pitted King Hussein’s loyal Bedouin regiments against entrenched PLO guerrillas. A Syrian tank intervention was repelled by the Jordanian air force with Israeli deterrence, ending in the complete routing and expulsion of the PLO from Jordan by July 1971.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the expulsion of the PLO from Jordan (1970) for the Lebanese political landscape.',
    'The relocation of thousands of armed PLO fighters and leadership to southern Lebanon and Beirut upset Lebanon’s delicate Christian-Muslim sectarian balance, sparking the devastating Lebanese Civil War in 1975.',
    'It brought permanent peace and stability to Lebanon, enabling Beirut to become a major financial capital.',
    'It prompted the Lebanese government to sign a permanent military alliance with Israel against Syria.',
    'The PLO completely disbanded its armed wings and integrated peacefully into the Lebanese civil service.',
    'Having lost their base in Jordan, the PLO established ‘Fatahland’ in southern Lebanon and entrenched headquarters in West Beirut. Their armed cross-border attacks on Israel and growing domestic power clashed violently with Christian Phalangist militias, igniting a 15-year civil war.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Black September terrorist attack at the 1972 Munich Olympics.',
    'Eight Palestinian gunmen took 11 Israeli Olympic team members hostage, all of whom were murdered during a botched German rescue attempt, shocking a global live television audience of 900 million.',
    'The International Olympic Committee voted to cancel all future Olympic Games permanently.',
    'West Germany declared war on the Arab League and deployed ground troops to the Sinai Peninsula.',
    'The United Nations immediately recognized an independent State of Palestine with observer status.',
    'Named after the 1970 Jordanian defeat, the Black September faction infiltrated the Olympic village. The tragic deaths of 11 Israeli athletes and coaches during a bungled shootout at Fürstenfeldbruck airbase horrified the world and brought international terrorism into millions of living rooms.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of Israel’s response to the Munich Olympics massacre (Operation Wrath of God).',
    'Prime Minister Golda Meir authorized a top-secret Mossad assassination campaign across Europe and the Middle East, using covert operatives to hunt down and assassinate PLO and Black September organizers.',
    'The Israeli Air Force dropped atomic bombs on guerrilla training camps in the Libyan desert.',
    'Israel signed an immediate peace treaty with Lebanon and withdrew all border garrisons.',
    'Israel surrendered the occupied West Bank to Jordan in exchange for intelligence on Black September cells.',
    'Meir created ‘Committee X’ to target individuals tied to the Munich massacre. Over the next seven years, Mossad assassination squads eliminated prominent Palestinian figures in Rome, Paris, Beirut, and Athens, establishing Israel’s uncompromising counter-terrorism doctrine.',
    2, // C
  ),
  makeQuestion(
    'Explain how international attitudes towards the Palestine issue changed as a result of airplane hijackings and the Munich Olympics.',
    'While Palestinian militants succeeded in thrusting the Palestinian identity into global consciousness, their high-profile acts of terror alienated Western public opinion and led Western states to classify the PLO as a terrorist organisation.',
    'Western powers immediately suspended all diplomatic and economic relations with the State of Israel.',
    'The United Nations Security Council voted to expel Israel from the General Assembly and dissolve the state.',
    'The international community forced Israel to pay $5 billion in direct reparations to the Arab League.',
    'The sensational acts of violence ensured that the world could no longer dismiss Palestinians merely as anonymous ‘refugees’ (as termed in Resolution 242). However, hostage-taking and airport massacres created intense moral revulsion in the West, hardening attitudes against Palestinian political legitimacy.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Golan Heights as an occupied territory following the 1967 war.',
    'It placed Israeli forces within 40 miles of Damascus, eliminated Syrian artillery bombardment of the Hula Valley, and secured control over the headwaters of the Sea of Galilee.',
    'It gave Israel direct access to the Persian Gulf for offshore oil exploration and naval exercises.',
    'It was an uninhabited desert plateau that Israel converted into a national park managed by the United Nations.',
    'It allowed Syria to construct advanced radar stations that monitored all military flights across the Mediterranean Sea.',
    'Retaining the volcanic plateau provided Israel with a dominant military observation platform overlooking southern Syria. It converted a vulnerable border into an advance fortress, protecting Israeli agricultural settlements in the valley below.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Gaza Strip and West Bank for Israeli domestic political debate after 1967.',
    'Religious-nationalist Israelis viewed the areas as the biblical heartland of Judea and Samaria, establishing the Gush Emunim movement to build ideological settlements that clashed with international law.',
    'All Israeli political parties agreed that the territories should be evacuated immediately without any conditions.',
    'The Knesset voted unanimously to grant full Israeli citizenship and voting rights to all 1 million Arab residents.',
    'The Israeli government sold all land in the territories to American multinational corporations for oil drilling.',
    'The conquest of historic biblical sites transformed Israeli politics. While security pragmatists viewed the territories as bargaining chips for peace, religious Zionists regarded settling ‘Judea and Samaria’ as a divine commandment, driving the construction of Jewish settlements.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the aftermath of the 1967 war, what leadership change occurred in Egypt in September 1970?',
    'Gamal Abdel Nasser suffered a fatal heart attack following the Arab summit that ended Black September and was succeeded as President of Egypt by his Vice President, Anwar Sadat.',
    'Nasser was assassinated by the Muslim Brotherhood and replaced by King Farouk’s exiled son.',
    'Nasser resigned to become Secretary-General of the Arab League and was succeeded by Boutros Boutros-Ghali.',
    'The Egyptian military staged a coup and appointed General Ariel Sharon as military governor of Cairo.',
    'Nasser died of a heart attack on 28 September 1970 at age 52, leaving millions of Egyptians mourning in the streets. His successor, Anwar Sadat, was widely dismissed as a weak interim figure, but would dramatically transform Egyptian foreign policy and initiate the 1973 war.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the aftermath of the 1967 war, which sequence of three stages correctly explains the transformation of Palestinian resistance?',
    'The 1967 defeat discredited regular Arab armies; guerrilla groups led by Fatah took over the PLO after Karameh; and violent international terror operations like Munich in 1972 were adopted after the PLO’s expulsion from Jordan.',
    'The PLO disarmed in 1967; merged with the Jordanian army in 1970; and signed the Camp David Accords in 1973.',
    'Palestinian refugees left Jordan in 1967; established a government in Sinai in 1970; and conquered Beirut in 1972.',
    'Fatah surrendered to Israel in 1968; King Hussein formed the PFLP in 1970; and the UN abolished the PLO in 1972.',
    'A high-scoring narrative account links the failure of conventional Arab armies in 1967 to the rise of independent Palestinian armed resistance. Displaced from Jordan into Lebanon in 1970, militant factions turned to global asymmetric terrorism to maintain international visibility.',
    3, // D
  ),
];

// Lesson 6: KT2.3: Israel and Egypt, 1967–73
const lesson6 = [
  makeQuestion(
    'Explain the importance of Anwar Sadat’s diplomatic initiative in February 1971 for Egyptian relations with Israel.',
    'Sadat offered to sign a formal peace agreement and reopen the Suez Canal if Israel withdrew to the Mitla and Gidi passes in Sinai, but Israeli Prime Minister Golda Meir rejected the overture.',
    'Sadat offered to surrender Cairo and Alexandria to the Israeli Defence Forces in exchange for US financial loans.',
    'Sadat demanded that Israel immediately dismantle all nuclear reactors and join the Arab League.',
    'Sadat agreed to recognize Jerusalem as Israel’s undivided capital if Egypt was granted control of the West Bank.',
    'In a historic break from the Khartoum ‘Three No’s’, Sadat signaled through UN envoy Gunnar Jarring that Egypt was prepared to enter into peace with Israel. Convinced of their unassailable military superiority, Golda Meir and Moshe Dayan dismissed the offer, believing Egypt had no military option.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of Anwar Sadat’s decision to expel 15,000 Soviet military advisers from Egypt in July 1972.',
    'It reduced Soviet influence in Cairo, signaled to the United States that Egypt was open to a Western-brokered diplomatic realignment, and lured Israel into underestimating Egypt’s military readiness.',
    'It caused the Soviet Union to launch an immediate naval invasion of Alexandria and overthrow Sadat’s government.',
    'It prompted Israel to immediately sign a mutual defence pact with the Soviet Union against Egypt.',
    'It forced Egypt to cancel all plans for military operations and surrender the Sinai Peninsula permanently.',
    'Frustrated by Soviet reluctance to supply advanced offensive weapons and eager to court Washington, Sadat ordered Soviet personnel out of Egypt. Israeli intelligence misread the expulsion as proof that Egypt’s armed forces were in disarray and incapable of launching an offensive.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of Egyptian relations with Saudi Arabia and Syria under Anwar Sadat before October 1973.',
    'Sadat formed a secret war alliance with President Hafez al-Assad of Syria for a coordinated two-front assault, while securing King Faisal of Saudi Arabia’s pledge to deploy the ‘oil weapon’.',
    'Sadat severed all diplomatic ties with Syria and joined a pro-Western military alliance with Iran and Turkey.',
    'Saudi Arabia refused to provide any financial or diplomatic assistance to Egypt due to religious disagreements.',
    'Syria and Saudi Arabia pressured Egypt to abandon the military option and recognize Israel unconditionally.',
    'Sadat meticulously built an effective Arab coalition. While coordinating synchronized battle plans with Syria to force Israel into a two-front war, he secured King Faisal’s commitment to cut oil production, ensuring that military action would be reinforced by economic pressure.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of ‘The Conception’ (Ha-Konseptziya) for Israel’s consolidation of control of the occupied territories prior to October 1973.',
    'Israeli military intelligence assumed that Egypt would never attack without long-range strike bombers and Scud missiles to neutralize the Israeli Air Force, blinding them to warning signs of an impending assault.',
    'It was a diplomatic doctrine that mandated the immediate return of all occupied territories in exchange for trade.',
    'It was an Israeli military plan to conquer Cairo and Damascus within 48 hours using tactical nuclear weapons.',
    'It was a strategy that relied exclusively on United Nations peacekeepers to defend all international borders.',
    'Military Intelligence Director Eli Zeira and Defense Minister Moshe Dayan rigidly believed that Egypt knew it would be defeated in any war. This dogmatic hubris led them to dismiss dozens of urgent warnings, including reports from King Hussein and top Mossad spy Ashraf Marwan.',
    3, // D
  ),
  makeQuestion(
    'In a narrative account analysing Israel’s consolidation of control of the occupied territories, how did the Bar-Lev Line fail on 6 October 1973?',
    'Egyptian assault troops crossed the Suez Canal and used high-pressure water monitors to blast 60 breaches through the 20-metre sand ramparts within hours, overrunning the fortified bunkers.',
    'The Israeli garrison surrendered peacefully after Egyptian forces agreed to pay $100 million in gold.',
    'Soviet paratroopers dropped directly onto the fortifications, capturing all Israeli command centers.',
    'The Bar-Lev Line held perfectly for three weeks until Israeli reserves launched an invasion of Cairo.',
    'The $300 million sand barrier was breached by brilliant Egyptian engineering. Mounting commercial water pumps onto pontoons, Egyptian assault teams pumped water from the canal to wash away 1,500 cubic metres of sand per hour, creating openings for 1,000 tanks to cross on pontoon bridges.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the timing of the joint Arab surprise attack on 6 October 1973 (Operation Badr).',
    'It struck on Yom Kippur, the holiest day in Judaism, when Israeli radio stations were silent, commercial transport was halted, and military garrisons were undermanned.',
    'It coincided with the Israeli national election, leaving the Knesset without an active Prime Minister.',
    'It occurred during a total solar eclipse that blinded all Israeli radar installations across the Mediterranean.',
    'It was launched on the exact day that all Israeli fighter aircraft were undergoing scheduled maintenance in France.',
    'Yom Kippur (the Day of Atonement) was chosen with meticulous deception. While Israeli soldiers were fasting and praying, mobilization was severely delayed because public communications were shut down. The date also coincided with the Muslim holy month of Ramadan.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the early stages of the Yom Kippur War, what military innovation protected Egyptian ground troops across the Suez Canal?',
    'A dense interlocking umbrella of Soviet-supplied SA-6 surface-to-air missiles (SAMs) and man-portable wire-guided Sagger anti-tank missiles neutralized Israeli air strikes and armored counter-attacks.',
    'Egyptian soldiers were protected by impenetrable bulletproof body armor imported from Great Britain.',
    'The Egyptian air force maintained a fleet of 500 stealth bombers that destroyed all Israeli airfields.',
    'The United States Air Force deployed electronic jamming aircraft that blinded Israeli communication systems.',
    'For six years, the IAF and Israeli armor had ruled the battlefield. In October 1973, Egyptian infantry armed with portable Sagger wire-guided missiles devastated counter-attacking Israeli tanks, while mobile SA-6 missile batteries shot down dozens of Israeli Skyhawks and Phantoms.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing key events of the Yom Kippur War, what occurred on the northern front in the Golan Heights between 6 and 9 October 1973?',
    'Over 1,400 Syrian tanks overwhelmed Israeli border posts in the ‘Valley of Tears’, pushing toward the Sea of Galilee before heroic 7th and 188th Armored Brigade defenders halted the advance.',
    'Syrian motorized divisions captured Haifa and Netanya within 24 hours without encountering any resistance.',
    'The Israeli Air Force destroyed all Syrian tanks within two hours, ending the northern campaign immediately.',
    'United Nations peacekeepers successfully disarmed both armies and negotiated a permanent border settlement.',
    'Outnumbered ten to one, Israeli tank crews fought desperately around the clock in the ‘Valley of Tears’. Supported by reserve units rushing to the front without resting or zeroing their weapons, the IDF halted the Syrian breakthrough just miles from the Sea of Galilee before counter-attacking toward Damascus.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the United States’ Operation Nickel Grass airlift during the Yom Kippur War.',
    'US President Richard Nixon authorized a massive emergency military airlift delivering over 22,000 tons of tanks, artillery, ammunition, and TOW missiles that replenished depleted Israeli stocks.',
    'US transport planes evacuated the entire civilian population of Tel Aviv and Jerusalem to North America.',
    'The United States delivered 50 tactical nuclear warheads to the Israeli Air Force base at Nevatim.',
    'US Marines landed in Alexandria to fight alongside Israeli paratroopers against the Egyptian Second Army.',
    'Facing catastrophic losses of over 100 aircraft and 800 tanks in the first five days, Prime Minister Golda Meir appealed to Washington for help. Nixon ordered the US Air Force to ‘send everything that can fly’, tipping the technological and logistical balance back to Israel.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Arab oil-producing nations’ (OAPEC) response to the US emergency airlift to Israel in October 1973.',
    'OPEC Arab members imposed a total oil embargo against the United States and the Netherlands and slashed oil production, quadrupling global crude oil prices from $3 to $12 per barrel.',
    'Arab nations surrendered all oil fields to American petroleum corporations under United Nations oversight.',
    'Saudi Arabia broke diplomatic relations with Egypt and formed a military alliance with Great Britain.',
    'The Soviet Union took over complete distribution of all Middle Eastern oil to Western European nations.',
    'Meeting in Kuwait on 17 October 1973, Arab oil ministers weaponized their vast petroleum reserves. The resulting oil shock triggered severe energy rationing, long petrol station queues in Western cities, and global economic stagflation, forcing Western powers to prioritize Middle Eastern diplomacy.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the turning point of the Yom Kippur War in Sinai, what was the significance of General Ariel Sharon’s counter-offensive on 15–16 October 1973?',
    'Sharon’s armored division exploited a gap between the Egyptian Second and Third Armies at Deversoir, crossed the Suez Canal on pontoon bridges, and encircled the Egyptian Third Army on the west bank.',
    'Sharon surrendered his division to the Egyptian Army to prevent further loss of civilian lives.',
    'Sharon captured Cairo after a three-day siege and forced Anwar Sadat to sign an unconditional surrender.',
    'Sharon ordered the demolition of the Aswan High Dam using long-range American precision-guided missiles.',
    'Displaying trademark tactical audacity, Sharon identified the seam between Egyptian army corps north of the Great Bitter Lake. Under fierce artillery fire, Israeli paratroopers crossed the canal on rubber dinghies followed by tanks, cutting off the Egyptian Third Army and trapping 20,000 soldiers in the desert.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the Soviet Union’s threat to intervene militarily on 24 October 1973 to save the encircled Egyptian Third Army.',
    'US Secretary of State Henry Kissinger placed all American global military forces on DEFCON 3 nuclear alert to deter Soviet airborne divisions from deploying to Egypt.',
    'The Soviet Union launched nuclear strikes on Tel Aviv and Haifa, forcing an immediate ceasefire.',
    'The United States withdrew all diplomatic recognition of Israel and ordered the IDF to surrender Sinai.',
    'Israel and Egypt signed an immediate military alliance to repel Soviet airborne forces from the Middle East.',
    'When Israel continued advancing around the Third Army despite UN Resolution 338, Soviet leader Leonid Brezhnev sent an ominous letter to Nixon threatening unilateral Soviet military intervention. Kissinger responded with a worldwide DEFCON 3 alert, the closest the superpowers had come to nuclear war since the Cuban Missile Crisis.',
    3, // D
  ),
  makeQuestion(
    'Explain the key terms of United Nations Security Council Resolution 338 passed on 22 October 1973.',
    'It called for an immediate ceasefire, the complete implementation of Resolution 242 in all its parts, and immediate negotiations between the parties under appropriate auspices to establish a just peace.',
    'It ordered Israel to dismantle its sovereign government and transfer all territory to the Arab League.',
    'It mandated the permanent division of the Sinai Peninsula into American and Soviet military zones.',
    'It required Egypt to pay $10 billion in gold reparations to the Israeli Ministry of Finance within 30 days.',
    'Jointly sponsored by Washington and Moscow, Resolution 338 brought an end to active combat. Crucially, it demanded direct negotiations between the combatants for the first time, laying the diplomatic foundation for Kissinger’s shuttle diplomacy and the 1978 Camp David Accords.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Yom Kippur War (1973) for Israeli domestic politics and military leadership.',
    'The Agranat Commission’s inquiry into intelligence failures caused widespread public outrage, leading to the resignations of Chief of Staff David Elazar, Prime Minister Golda Meir, and Moshe Dayan in 1974.',
    'The Labor Party won a historic landslide victory in the Knesset, increasing its majority by 30 seats.',
    'The Israeli military dissolved parliament and established a permanent military junta led by Ariel Sharon.',
    'The Israeli public voted in a national referendum to dissolve the State of Israel and join the British Commonwealth.',
    'Although the commission officially exonerated the political leadership, public fury over the 2,688 Israeli dead and military complacency made Meir’s position untenable. Golda Meir resigned in April 1974, succeeded by Yitzhak Rabin, permanently damaging the Labor establishment.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Yom Kippur War (1973) for Egyptian national pride and diplomatic leverage.',
    'By successfully crossing the Suez Canal and shattering the myth of Israeli invincibility, Egypt restored its damaged Arab honour, enabling Sadat to negotiate peace from a position of equal dignity.',
    'It convinced Egypt that military force could conquer all of Israel, prompting an immediate follow-up invasion in 1974.',
    'It resulted in Egypt surrendering its sovereignty and becoming an autonomous republic of the Soviet Union.',
    'It completely discredited Anwar Sadat, who was overthrown in a popular revolution within two weeks of the ceasefire.',
    'For Egypt, ‘The Crossing’ (Al-Ubour) was a profound psychological triumph that washed away the humiliation of 1967. Having demonstrated that Arab armies could plan, surprise, and fight effectively, Sadat had the domestic authority and diplomatic standing to pursue direct peace negotiations.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the military aftermath of the 1973 War, what was agreed at the Kilometer 101 military talks in November 1973?',
    'Egyptian General Gamal el-Gamasy and Israeli General Aharon Yariv conducted face-to-face negotiations to stabilize the ceasefire, supply food to the Third Army, and exchange all prisoners of war.',
    'Egypt agreed to surrender the entire city of Cairo to the Israeli army in exchange for 1,000 tanks.',
    'Israel agreed to dissolve the Israeli Defence Forces and merge its military into the Egyptian army.',
    'The United Nations took over sovereign control of all oil fields across the Sinai Peninsula.',
    'Conducted in a tent on the Cairo-Suez highway at Kilometer 101, these talks marked the first direct, high-level Israeli-Egyptian military negotiations in 25 years. The pragmatic working relationship between the generals paved the way for subsequent disengagement agreements.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the 1973 Oil Crisis for Western European and Japanese diplomatic attitudes towards the Middle East.',
    'Crippling fuel shortages, petrol rationing, and double-digit inflation compelled Western European nations to adopt a more pro-Arab diplomatic stance and recognize Palestinian rights.',
    'Western powers imposed a complete naval blockade on the Persian Gulf and seized all Saudi Arabian oil wells.',
    'European nations severed all diplomatic ties with Egypt and sent 100,000 troops to defend the Bar-Lev Line.',
    'The European Economic Community voted to expel all Arab diplomats and ban the importation of Middle Eastern petroleum.',
    'Heavily dependent on Middle Eastern crude, European nations refused transit rights to US planes flying arms to Israel during the war. In November 1973, the EEC issued a statement endorsing Resolution 242 and urging recognition of Palestinian legitimate rights to secure oil supplies.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Yom Kippur War for Israel’s long-term political leadership in the 1977 Knesset elections.',
    'Voter anger over the government’s complacency in 1973 ended 29 years of unbroken Labor Party dominance, sweeping Menachem Begin and the right-wing Likud coalition to power.',
    'The Communist Party of Israel won a majority in the Knesset and formed a coalition with the PLO.',
    'The Israeli electorate voted to abolish the post of Prime Minister and establish a constitutional monarchy.',
    'The Labor Party increased its parliamentary majority, securing 80 of the 120 seats in the Knesset.',
    'The trauma of the 1973 war shattered public faith in Labor’s ruling elite. Disillusionment, particularly among Sephardic and Mizrahi voters who felt neglected by the Ashkenazi establishment, triggered the historic political earthquake (‘Mahapakh’) of May 1977 that brought Likud to power.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the diplomatic aftermath of the 1973 War, what was the primary achievement of the Sinai I Disengagement Agreement signed in January 1974?',
    'Brokered by Henry Kissinger, Israel agreed to withdraw its troops 20 miles east of the Suez Canal, allowing Egypt to clear mines and reopen the vital waterway to international trade.',
    'Israel permanently annexed the Gaza Strip and expelled all 300,000 Palestinian residents into Egypt.',
    'Egypt agreed to provide free petroleum to Israel for 25 years in exchange for the return of the Mitla Pass.',
    'The United States established a permanent military base in Jerusalem to oversee the demilitarization of the city.',
    'Sinai I untangled the dangerously intertwined armies along the canal. Israel pulled back behind a UN buffer zone, Egypt reduced its troop presence on the east bank, and Egyptian authorities began dredging the canal, which reopened to world shipping in June 1975.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing Israel and Egypt between 1967 and 1973, which sequence of three stages correctly explains how the conflict evolved?',
    'The 1967 war created a stalemate across the closed Suez Canal; Egypt and Syria launched a coordinated surprise assault on Yom Kippur 1973; and US-brokered disengagement pacts paved the way for peace talks.',
    'Sadat surrendered Sinai in 1968; Israel invaded Damascus in 1971; and the UN imposed peace in 1973.',
    'The Bar-Lev Line was built in 1967; the US bombed Cairo in 1970; and Egypt dismantled its army in 1973.',
    'Egypt conquered the Negev in 1968; the PLO signed peace in 1971; and the Soviet Union annexed Sinai in 1973.',
    'A high-scoring narrative account links the prolonged post-1967 stalemate and War of Attrition to Sadat’s high-stakes gamble on Yom Kippur 1973. Shattering the military status quo forced the superpowers to intervene, creating the diplomatic opening for disengagement and eventual bilateral peace.',
    3, // D
  ),
];

module.exports = {
  lesson4,
  lesson5,
  lesson6,
};
