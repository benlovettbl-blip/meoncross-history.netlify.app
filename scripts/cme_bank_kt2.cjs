const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 4: KT2.1: The Six Day War, 1967
const lesson4 = [
  makeQuestion(
    'What major political entity was established at the January 1964 Arab League Summit in Cairo to represent the Palestinian national movement?',
    'The Palestine Liberation Organization (PLO)',
    'Hamas (Islamic Resistance Movement)',
    'The Arab National Movement',
    'The Palestinian Authority (PA)',
    'The Arab League created the PLO to harness Palestinian nationalism under Arab state patronage. Hamas and the PA were created decades later in 1987 and 1994 respectively.',
    0, // A
  ),
  makeQuestion(
    'Which faction within the Palestinian movement, led by Yasser Arafat, advocated independent armed guerrilla struggle rather than reliance on regular Arab armies?',
    'Fatah',
    'The Muslim Brotherhood',
    'The Arab Socialist Party',
    'Hezbollah',
    "Fatah launched its first cross-border guerrilla raid against Israel's National Water Carrier on 1 January 1965, popularizing armed struggle ('Fedai') as the only path to liberate Palestine.",
    1, // B
  ),
  makeQuestion(
    "What was the 'Water War' fought between Israel and Syria in the mid-1960s?",
    "A series of military skirmishes over Syrian attempts to divert the headwaters of the River Jordan away from Israel's National Water Carrier",
    'A conflict over shipping routes through the Suez Canal',
    'A dispute over underground oil pipelines passing beneath the Golan Heights',
    'A naval battle fought in the Gulf of Aqaba over deep-sea fishing rights',
    'Syria attempted to divert the Banyas and Hasbani rivers to deprive Israel of fresh water. The IDF used tank and air strikes to systematically destroy Syrian earth-moving equipment.',
    2, // C
  ),
  makeQuestion(
    'What major cross-border raid on 13 November 1966 saw the IDF attack a West Bank village in Jordanian territory following a Fatah landmine attack?',
    'The Samu Raid',
    'The Qibya Raid',
    'The Karameh Raid',
    'The Entebbe Raid',
    'Israel raided Samu to punish Jordanian authorities for tolerating Fatah bases. The raid sparked massive Palestinian demonstrations against King Hussein of Jordan for failing to defend them.',
    3, // D
  ),
  makeQuestion(
    'What dramatic air engagement on 7 April 1967 escalated border tensions between Israel and Syria to a fever pitch?',
    'Israeli Mirage fighters shot down six Syrian MiG-21s and buzzed the skies over Damascus',
    'Syrian bombers destroyed the Israeli oil refinery in Haifa',
    'Egyptian jets attacked an Israeli radar station in the Negev',
    'A dogfight over the Sinai resulted in the destruction of 50 Israeli planes',
    'Following Syrian artillery fire from the Golan Heights on Israeli tractors, an air battle broke out. Israeli fighters pursued retreating MiGs all the way to Damascus, humiliating Syrian leaders.',
    0, // A
  ),
  makeQuestion(
    'What false intelligence report did the Soviet Union deliver to Egyptian officials in Cairo on 13 May 1967?',
    'That Israel was massing 11 to 13 military brigades on its northern border to launch an invasion of Syria',
    'That the United States Sixth Fleet was preparing to bomb Alexandria',
    'That King Hussein of Jordan had signed a secret military alliance with Tel Aviv',
    'That Israel had already assembled five operational nuclear warheads',
    "Moscow's false report was aimed at encouraging Egypt to deter Israel. UN observers inspected the border and found no Israeli troop concentration, but Nasser felt compelled to act.",
    1, // B
  ),
  makeQuestion(
    'What provocative step did President Nasser take on 16 May 1967 to demonstrate Egyptian solidarity with Syria?',
    'He demanded that UN Secretary-General U Thant withdraw all UNEF peacekeepers from Sinai',
    'He launched an immediate air raid against Israeli airfields in the Negev',
    'He declared that Egypt would permanently annex the Gaza Strip',
    'He signed a mutual defense treaty with the Soviet Union in Moscow',
    "To the shock of Western diplomats, U Thant complied with Nasser's demand without consulting the UN Security Council, leaving Egyptian and Israeli armies facing each other with no buffer.",
    2, // C
  ),
  makeQuestion(
    'What action by President Nasser on 22 May 1967 was treated by Israel as an unambiguous act of war (casus belli)?',
    'The closure of the Straits of Tiran to all Israeli shipping and strategic goods',
    'The nationalisation of the Haifa-Suez railway',
    'The expulsion of the American ambassador from Cairo',
    'The deployment of Egyptian submarines into the Mediterranean Sea',
    "Closing the Straits strangled Israel's vital oil imports from Iran and severed its maritime trade route to Asia. Israel had repeatedly warned that closing the Straits would trigger war.",
    3, // D
  ),
  makeQuestion(
    'What pact signed in Cairo on 30 May 1967 convinced the Israeli cabinet that they were facing an imminent, coordinated three-front invasion?',
    'A joint mutual defense pact signed between President Nasser and King Hussein of Jordan',
    'An alliance between Syria and the United States',
    'A non-aggression treaty between Iraq and Iran',
    'A trade agreement between Egypt and Great Britain',
    "King Hussein, long Nasser's bitter rival, flew to Cairo and placed Jordan's army under Egyptian command. With Syrian and Iraqi troops also mobilizing, Israel was surrounded by hostile Arab forces.",
    0, // A
  ),
  makeQuestion(
    "Who was appointed Minister of Defense in Israel's emergency national unity government on 1 June 1967, electrifying public confidence?",
    'General Moshe Dayan',
    'Yitzhak Rabin',
    'Ariel Sharon',
    'Menachem Begin',
    'Dayan, the one-eyed war hero of 1956, was appointed by a reluctant Prime Minister Levi Eshkol to satisfy widespread public demands for dynamic, decisive military leadership.',
    1, // B
  ),
  makeQuestion(
    'What was Operation Focus (Moked) launched by the Israeli Air Force at 7:45 AM on Monday, 5 June 1967?',
    'A devastating pre-emptive airstrike that destroyed over 300 Egyptian combat aircraft on the ground in under three hours',
    'A paratrooper assault on the presidential palace in Cairo',
    'An amphibious landing on the beaches of Alexandria',
    'A coordinated naval bombardment of Syrian ports',
    'Israeli jets flew ultra-low under Egyptian radar to strike airfields when Egyptian pilots were eating breakfast. By wiping out Egyptian air cover, Israel secured total mastery of the skies.',
    2, // C
  ),
  makeQuestion(
    'Why did Jordan enter the Six Day War on 5 June 1967 despite Israeli Prime Minister Eshkol sending a message urging King Hussein to stay out?',
    'Nasser misled King Hussein by falsely claiming that Egyptian air strikes had destroyed Israeli airfields and that his army was marching on Tel Aviv',
    'Jordan was legally required to invade under the terms of the British Mandate',
    'Israeli troops had already invaded Amman on the morning of 5 June',
    'King Hussein had secretly agreed to partition Jerusalem with the Soviet Union',
    'Nasser told King Hussein that Egyptian radar showed hundreds of jets attacking Israel (which were actually returning Israeli jets). Jordan opened fire with artillery, bringing disaster upon itself.',
    3, // D
  ),
  makeQuestion(
    'On what historic date did Israeli paratroopers capture the Old City of Jerusalem and reach the Western Wall for the first time in 19 years?',
    '7 June 1967',
    '5 June 1967',
    '10 June 1967',
    '15 May 1948',
    "Colonel Motta Gur radioed the famous message: 'The Temple Mount is in our hands!' Jews were finally able to pray at the Western Wall after being barred by Jordan since 1948.",
    0, // A
  ),
  makeQuestion(
    'What geographical feature marked the final line of Israeli advance in the south after routing the Egyptian army in the Sinai Peninsula?',
    'The east bank of the Suez Canal',
    'The outskirts of Cairo',
    'The Nile Delta',
    'The Gulf of Aqaba',
    'Israeli armored divisions under Sharon, Tal, and Yoffe trapped fleeing Egyptian forces in the Mitla and Giddi passes, reaching the Suez Canal by 8 June.',
    1, // B
  ),
  makeQuestion(
    'What steep, heavily fortified plateau did the IDF storm on 9–10 June 1967 to silence Syrian artillery bombardments of northern kibbutzim?',
    'The Golan Heights',
    'Mount Sinai',
    'The Judean Hills',
    'Mount Nebo',
    'Syria had fortified the volcanic plateau with deep concrete bunkers. Israeli bulldozers and infantry scaled the cliffs under heavy fire, capturing Quneitra and opening the road to Damascus.',
    2, // C
  ),
  makeQuestion(
    'What controversial maritime tragedy occurred on 8 June 1967 when Israeli jets and torpedo boats mistakenly attacked a neutral American vessel?',
    'The USS Liberty incident',
    'The SS Exodus disaster',
    'The Gulf of Tonkin incident',
    'The Pueblo capture',
    'Israeli forces misidentified the technical research ship USS Liberty as an Egyptian vessel, killing 34 American crewmen and wounding 171. Israel apologized and paid millions in compensation.',
    3, // D
  ),
  makeQuestion(
    'How much territory did Israel control following its stunning victory in the Six Day War compared to its pre-war boundaries?',
    'It controlled over three times more territory than it had before the war',
    "It doubled its territory by capturing Jordan's capital",
    'Its territory remained exactly the same due to UN borders',
    'It controlled all of Egypt and half of Saudi Arabia',
    'Israel captured the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria, profoundly altering regional geography.',
    0, // A
  ),
  makeQuestion(
    'Approximately how many Arab casualties were suffered in the Six Day War compared to Israeli losses?',
    'Around 20,000 Arab soldiers were killed, compared to fewer than 1,000 Israeli soldiers',
    'Around 100,000 Israeli soldiers were killed, compared to 5,000 Arab soldiers',
    'Both sides suffered identical losses of approximately 10,000 men each',
    'Zero casualties were reported because it was fought entirely through diplomatic cables',
    "The casualty disparity reflected Israel's absolute air dominance, superior armored doctrine, and the total collapse of Arab field communication. Israel lost 776 soldiers.",
    1, // B
  ),
  makeQuestion(
    'What psychological impact did the Six Day War have on the Israeli public and religious communities?',
    "A wave of national euphoria, messianic fervor, and the conviction that Israel's military might guaranteed permanent security",
    'Widespread national despair and demands to immediately abandon Tel Aviv',
    'A total collapse in immigration from Western nations',
    'A complete rejection of all military service among the youth',
    'Reuniting Jerusalem and capturing the ancient biblical heartland of Judea and Samaria created a profound religious awakening and a false sense of invincibility that proved costly in 1973.',
    2, // C
  ),
  makeQuestion(
    'What term is used in the Arab world to describe the catastrophe and humiliation of the 1967 Six Day War defeat?',
    'An-Naksah (The Setback)',
    'The Nakba (The Catastrophe)',
    'The Intifada (The Uprising)',
    'The Jihad (The Struggle)',
    "While 1948 is known as the Nakba, 1967 is mourned as an-Naksah ('the Setback'), shattering Arab faith in Nasser's secular pan-Arabism and opening the door for political Islam and Palestinian guerrilla independence.",
    3, // D
  ),
];

// Lesson 5: KT2.2: The Aftermath of the 1967 War
const lesson5 = [
  makeQuestion(
    'What famous formula did the Arab League adopt at the Khartoum Summit on 1 September 1967?',
    "The 'Three Noes': No peace, No recognition, No negotiations with Israel",
    "The 'Three Yeses': Yes to peace, Yes to trade, Yes to diplomacy",
    "The 'Sinai Formula': Returning the Suez Canal in exchange for Jerusalem",
    "The 'Two-State Agreement': Immediate recognition of a Palestinian state in Gaza",
    'The Khartoum Resolution rejected compromise and pledged continued struggle, showing that military defeat had stiffened Arab diplomatic intransigence.',
    0, // A
  ),
  makeQuestion(
    'What fundamental principle for resolving the Arab-Israeli conflict was established by UN Security Council Resolution 242 in November 1967?',
    "'Land for Peace'—Israeli withdrawal from occupied territories in exchange for recognized, secure borders",
    'Complete and unconditional disarmament of the Israeli Defence Forces',
    'The immediate absorption of all Palestinian refugees into Western Europe',
    'The permanent division of the Sinai Peninsula between Egypt and Jordan',
    'Resolution 242 became the legal cornerstone for all subsequent Middle East negotiations, balancing Israeli withdrawal against the right of all states to live in peace free from threats of force.',
    1, // B
  ),
  makeQuestion(
    'What crucial semantic ambiguity in the English text of UN Resolution 242 led to decades of competing legal interpretations?',
    "It called for Israeli withdrawal from 'territories occupied' rather than 'THE territories occupied'",
    'It failed to mention the State of Israel by name in the preamble',
    'It omitted any mention of Jerusalem or the Suez Canal',
    'It was written entirely in Latin with no official translation',
    "The absence of the definite article 'the' allowed Israel to argue it was only required to withdraw from some territories to secure defensible borders, while Arabs argued it required full withdrawal from all lands.",
    2, // C
  ),
  makeQuestion(
    'What major waterway was completely shut down from June 1967 until 1975 because Egypt scuttled ships and laid mines to block traffic?',
    'The Suez Canal',
    'The Straits of Tiran',
    'The Dardanelles',
    'The Bab-el-Mandeb Strait',
    "The closure of the canal trapped fifteen international cargo ships (the 'Yellow Fleet') for eight years and forced world shipping to detour around the Cape of Good Hope, costing billions.",
    3, // D
  ),
  makeQuestion(
    'Approximately how many additional Palestinian Arabs were displaced as refugees during the Six Day War, many for the second time?',
    'Around 300,000',
    'Fewer than 5,000',
    'Over 3 million',
    'Exactly 50,000',
    'Between 250,000 and 300,000 Palestinians fled from the West Bank and Gaza into Jordan and Syria, creating fresh humanitarian crises in overcrowded refugee camps.',
    0, // A
  ),
  makeQuestion(
    "What was the 'Allon Plan', formulated by Israeli Deputy Prime Minister Yigal Allon in 1967?",
    'A strategic proposal to annex a defensible security perimeter in the Jordan Valley while returning populated Arab areas to Jordanian civil control',
    'A secret military plan to invade Saudi Arabia and seize its oil reserves',
    'A scheme to deport all Arab residents of Jerusalem to Egypt',
    'A plan to build a continuous concrete separation barrier along the Green Line',
    'Allon sought to maximize Israeli military security without absorbing millions of hostile Arab civilians. Although never officially adopted, it shaped Israeli settlement patterns for decades.',
    1, // B
  ),
  makeQuestion(
    "What battle on 21 March 1968 between the IDF and Palestinian fedayeen in Jordan became a massive symbolic victory for Yasser Arafat's Fatah movement?",
    'The Battle of Karameh',
    'The Battle of Samu',
    'The Battle of Qibya',
    'The Battle of Jenin',
    'Although Israel destroyed the Karameh camp, Palestinian fighters stood their ground and inflicted heavy casualties on the IDF. Arafat portrayed it as the first Arab victory over Israel, causing PLO recruitment to surge.',
    2, // C
  ),
  makeQuestion(
    'Who was elected Chairman of the PLO Executive Committee in February 1969, fundamentally shifting the organization away from Arab state control?',
    'Yasser Arafat',
    'Ahmad Shukeiri',
    'George Habash',
    'Nayef Hawatmeh',
    "Arafat replaced Egyptian puppet Ahmad Shukeiri. Under Arafat's leadership, the PLO became an independent actor representing the distinct national identity of the Palestinian people.",
    3, // D
  ),
  makeQuestion(
    'Which radical Marxist-Leninist Palestinian faction, founded by George Habash, pioneered international aircraft hijackings to publicize the Palestinian cause?',
    'The Popular Front for the Liberation of Palestine (PFLP)',
    'Hamas',
    'Fatah',
    'Islamic Jihad',
    'The PFLP believed that spectacular international terror attacks would shock world public opinion and expose Western imperialist backing for Israel. Their hijackings dominated 1970s headlines.',
    0, // A
  ),
  makeQuestion(
    'What dramatic event in September 1970 saw the PFLP hijack four Western airliners and blow up three of them on an abandoned airstrip in the Jordanian desert?',
    "The Dawson's Field hijackings",
    'The Entebbe raid',
    'The Lod Airport massacre',
    'The Achille Lauro hijacking',
    'The PFLP blew up the empty planes in front of global television cameras, humiliating King Hussein of Jordan and demonstrating that Palestinian guerrillas acted as a law unto themselves in his kingdom.',
    1, // B
  ),
  makeQuestion(
    "What was 'Black September' in 1970?",
    'A brutal civil war in Jordan where King Hussein deployed the army to crush Palestinian militias and expel the PLO from the country',
    'The date Egypt nationalised the Suez Canal',
    'An oil crisis triggered by an OPEC embargo',
    'The signing of the Camp David Accords in Maryland',
    'Viewing the armed PLO as an existential threat to his Hashemite throne, King Hussein launched a massive military offensive. Thousands were killed, and Arafat and the PLO were forced to flee to Lebanon.',
    2, // C
  ),
  makeQuestion(
    'Where did Yasser Arafat and the PLO relocate their main headquarters and military bases after their expulsion from Jordan in 1970–71?',
    'Lebanon',
    'Egypt',
    'Syria',
    'Tunisia',
    "The PLO established a powerful autonomous mini-state in southern Lebanon and Beirut ('Fatahland'), from which they launched cross-border rocket attacks against northern Israeli towns.",
    3, // D
  ),
  makeQuestion(
    "What terrorist atrocity was carried out by the Palestinian 'Black September' faction at the 1972 Summer Olympics in Munich?",
    'The kidnapping and murder of 11 Israeli Olympic athletes and coaches',
    'The assassination of the West German Chancellor',
    'The detonation of a bomb inside the main Olympic stadium',
    "The hijacking of the German Olympic team's aircraft",
    'Gunmen broke into the Olympic village, taking athletes hostage. A botched German rescue attempt at Fürstenfeldbruck airbase ended in the slaughter of all nine remaining Israeli hostages and a police officer.',
    0, // A
  ),
  makeQuestion(
    'What was Operation Wrath of God authorized by Israeli Prime Minister Golda Meir in the wake of the Munich massacre?',
    'A covert Mossad assassination campaign across Europe and the Middle East targeting individuals involved in the Munich attack',
    'A full-scale military invasion of Egypt across the Suez Canal',
    'An economic blockade of all Arab oil shipments to Europe',
    'A public diplomatic trial conducted at the International Court of Justice',
    "A secret assassination committee tasked Mossad hit teams ('Caesarea') with hunting down and eliminating Black September and PLO operatives in Rome, Paris, Beirut, and Athens.",
    1, // B
  ),
  makeQuestion(
    "What was the 'War of Attrition' fought between Egypt and Israel from 1967 to 1970 along the Suez Canal?",
    "A grinding static war of heavy artillery duels, commando raids, and aerial dogfights designed to exhaust Israel's military resolve",
    'A trade war fought with economic sanctions and embargoes',
    'A brief one-week naval conflict over fishing borders in the Mediterranean',
    'A diplomatic dispute conducted exclusively through the United Nations',
    'Nasser calculated that Israel, with its small population and reliance on citizen soldiers, could not sustain continuous casualties. The war ended in a US-brokered ceasefire in August 1970.',
    2, // C
  ),
  makeQuestion(
    'Which superpower directly intervened to protect Egypt during the War of Attrition, deploying advanced anti-aircraft missiles and flying combat missions?',
    'The Soviet Union',
    'The United States',
    'Great Britain',
    'France',
    'Moscow sent thousands of military advisers, modern SAM-3 missile batteries, and Soviet fighter pilots who engaged in direct aerial combat with Israeli pilots over the Suez Canal.',
    3, // D
  ),
  makeQuestion(
    'Who succeeded Gamal Abdel Nasser as President of Egypt following his sudden death from a heart attack in September 1970?',
    'Anwar Sadat',
    'Hosni Mubarak',
    'Boutros Boutros-Ghali',
    'Ali Sabri',
    "Initially dismissed as a weak transitional figure, Sadat outmaneuvered domestic rivals, consolidated power, and radically changed Egypt's strategic course toward war and eventual peace with Israel.",
    0, // A
  ),
  makeQuestion(
    'What religious nationalist Israeli movement was founded in 1974 to spearhead Jewish settlement across the West Bank (Judea and Samaria)?',
    'Gush Emunim (Bloc of the Faithful)',
    'Peace Now',
    'The Jewish Agency',
    'Herut',
    'Gush Emunim believed that settling the biblical heartland was a divine commandment and a messianic duty, establishing settlements like Elon Moreh and defying government restrictions.',
    1, // B
  ),
  makeQuestion(
    "How did the 1967 conquests transform Israel's domestic economy in the 1970s?",
    'It created a construction boom and brought over 100,000 Palestinian day-labourers from the occupied territories into low-wage jobs in Israel',
    "It caused Israel's economy to collapse into immediate bankruptcy",
    'It eliminated all agricultural farming inside the Green Line',
    'It forced Israel to abolish its national currency and adopt the US dollar',
    "Israel experienced economic expansion fueled by defense spending and cheap Palestinian manual labor in agriculture and construction, while integrating the occupied markets into Israel's economy.",
    2, // C
  ),
  makeQuestion(
    'What did the Palestinian National Charter, amended by the PLO in 1968, explicitly declare regarding the State of Israel?',
    'That the establishment of Israel was entirely illegal and that armed struggle was the only way to liberate all of Palestine',
    'That Israel should be recognized as a Jewish state alongside an Arab state',
    'That the PLO would seek peaceful reunification through the British Crown',
    'That Jerusalem should become the permanent headquarters of the United Nations',
    'Articles 9 and 19 declared the Balfour Declaration and UN Partition void and stated that armed struggle was the sole strategy to dismantle Zionism. This charter was cited by Israel as proof the PLO sought its destruction.',
    3, // D
  ),
];

// Lesson 6: KT2.3: Israel and Egypt, 1967–1973
const lesson6 = [
  makeQuestion(
    'Why was Anwar Sadat determined to launch a military offensive against Israel in 1973?',
    "To break the diplomatic stalemate ('no war, no peace') and force the superpowers to pressure Israel into returning the Sinai",
    'To destroy Tel Aviv and permanently annex all of Israel into Egypt',
    'Because the Soviet Union ordered Egypt to attack under threat of invasion',
    'To conquer Jordan and overthrow King Hussein',
    'Sadat had limited, rational diplomatic goals: he knew Egypt could not destroy Israel, but a successful military crossing would restore Arab honor and force international diplomacy to return Sinai.',
    0, // A
  ),
  makeQuestion(
    'What bold geopolitical gamble did Sadat take in July 1972 that astonished the world and misled Israeli intelligence?',
    'He expelled 15,000 Soviet military advisers and technicians from Egypt',
    'He signed a mutual defense treaty with the United States',
    "He recognized Israel's sovereignty over the Sinai Peninsula",
    'He disbanded the Egyptian army and declared neutrality',
    'Sadat expelled Soviet personnel to prepare for an independent Egyptian military operation and to show Washington that Egypt was ready to re-align with the West once Sinai was regained.',
    1, // B
  ),
  makeQuestion(
    'Which Arab leader did Sadat ally with to plan a synchronized two-front surprise offensive against Israel in October 1973?',
    'President Hafez al-Assad of Syria',
    'King Hussein of Jordan',
    'Saddam Hussein of Iraq',
    'Colonel Muammar Gaddafi of Libya',
    'Sadat and Assad secretly coordinated Operation Badr: Egypt would assault the Suez Canal in the south while Syria launched a massive armored thrust across the Golan Heights in the north.',
    2, // C
  ),
  makeQuestion(
    "What was the 'Conceptzia' (The Concept)—the fatal flaw in Israeli military intelligence prior to the 1973 War?",
    'The unshakeable conviction that Egypt would never attack without long-range strike aircraft, and Syria would never attack without Egypt',
    'The belief that the Soviet Union would invade Israel directly through Turkey',
    'The assumption that Arab soldiers were physically incapable of driving tanks',
    "The belief that the United States would fight all of Israel's battles",
    'Led by Military Intelligence Chief Eli Zeira, Israeli generals dismissed repeated Egyptian military mobilizations on the Suez Canal as routine annual exercises, blinding them to the imminent threat.',
    3, // D
  ),
  makeQuestion(
    'On what date and holy occasion did Egypt and Syria launch their simultaneous surprise assault against Israel?',
    '6 October 1973, on Yom Kippur (the Day of Atonement) and during Muslim Ramadan',
    '5 June 1973, on the anniversary of the Six Day War',
    '11 November 1973, on Armistice Day',
    '29 October 1973, on the anniversary of the Suez Crisis',
    'Yom Kippur was the holiest day of the Jewish calendar, when the nation fasted, radio stations fell silent, and road traffic stopped. However, empty roads actually accelerated Israeli reserve mobilization.',
    0, // A
  ),
  makeQuestion(
    'What formidable defensive barrier along the Suez Canal, built by Israel at a cost of $300 million, was breached by Egyptian engineers in October 1973?',
    'The Bar-Lev Line',
    'The Green Line',
    'The Maginot Line',
    'The Purple Line',
    'The Bar-Lev Line was a 60-foot-high sand embankment backed by concrete fortresses. Israeli planners believed it was impregnable, but Egyptian engineers breached it in hours.',
    1, // B
  ),
  makeQuestion(
    'How did Egyptian engineering units ingeniously blast through the massive sand ramparts of the Bar-Lev Line within hours?',
    'By using high-pressure water cannons adapted from British and German fire-fighting pumps',
    'By detonating miniature nuclear demolition charges supplied by Moscow',
    'By deploying thousands of heavy steamrollers flown in from Libya',
    'By digging deep underground tunnels beneath the entire Suez Canal',
    'Major General Baki Zaki Yousef proposed using water monitors powered by boat engines to wash away the sand into the canal, blasting 60 gaps for tanks and vehicles with incredible speed.',
    2, // C
  ),
  makeQuestion(
    'What Soviet-supplied weapon devastated Israeli tank counter-attacks in the opening days of the 1973 war?',
    "The AT-3 'Sagger' wire-guided anti-tank missile",
    'The Scud ballistic missile',
    'The T-72 heavy battle tank',
    'The Stinger anti-aircraft launcher',
    'Egyptian infantry deployed thousands of portable Sagger missiles and RPG-7s, destroying hundreds of counter-attacking Israeli tanks before they could even get within gun range.',
    3, // D
  ),
  makeQuestion(
    'Why was the Israeli Air Force initially unable to provide close air support to troops on the Suez Canal and Golan Heights in 1973?',
    "Because of Egypt and Syria's dense Soviet-built mobile surface-to-air missile (SAM) umbrella (SAM-6 and Shilka anti-aircraft guns)",
    'Because the US had confiscated all Israeli fighter jet fuel',
    'Because Israeli pilots were on strike demanding higher salaries',
    'Because bad weather grounded all flights for the first four days',
    'The mobile SAM-6 batteries inflicted shocking losses on Israeli Phantoms and Skyhawks. Over 40 Israeli aircraft were shot down in the first 48 hours until missile radar sites were destroyed.',
    0, // A
  ),
  makeQuestion(
    'What desperate armored engagement on the Golan Heights saw fewer than 100 Israeli Centurion tanks hold off 500 Syrian T-55 and T-62 tanks for three days?',
    'The Battle of the Valley of Tears',
    'The Battle of the Mitla Pass',
    'The Battle of Karameh',
    'The Battle of El Alamein',
    'The 7th Armoured Brigade under Colonel Avigdor Ben-Gal fought until almost all their tanks were knocked out, halting the Syrian advance just miles from the Sea of Galilee before reserves arrived.',
    1, // B
  ),
  makeQuestion(
    'What crucial strategic error did Anwar Sadat make on 14 October 1973, against the urgent advice of his Chief of Staff General Saad El Shazly?',
    'He ordered Egyptian armored divisions to advance into the open desert beyond the protective cover of their SAM missile umbrella',
    'He ordered the total retreat of all Egyptian forces back across the Suez Canal',
    'He fired all his Soviet generals and surrendered the Sinai to Jordan',
    'He ordered the chemical bombing of Tel Aviv',
    'Sadat attacked to relieve pressure on his Syrian allies. Without air defense cover, the Egyptians drove straight into prepared Israeli kill zones, losing over 250 tanks in a single disastrous day.',
    2, // C
  ),
  makeQuestion(
    'Who led the audacious Israeli counter-crossing of the Suez Canal on 15–16 October 1973 (Operation Stouthearted Men)?',
    'Major General Ariel Sharon',
    'General Yitzhak Rabin',
    'General Moshe Dayan',
    'General Haim Bar-Lev',
    'Sharon drove his division through a seam between the Egyptian Second and Third Armies at Deversoir, establishing a pontoon bridge to the west bank and turning the tide of the war.',
    3, // D
  ),
  makeQuestion(
    'What dramatic military position had Israeli forces achieved on the western side of the Suez Canal by the end of the war?',
    'They had completely encircled the Egyptian Third Army (20,000 men) and cut the road to Cairo',
    'They had captured the city of Alexandria and occupied Cairo airport',
    'They had been completely driven into the Red Sea by Egyptian reserves',
    'They had surrendered their tanks to United Nations peacekeepers',
    'The encirclement of the Third Army gave Israel overwhelming tactical leverage, but also risked bringing direct Soviet intervention to save Egypt from total destruction.',
    0, // A
  ),
  makeQuestion(
    'What was Operation Nickel Grass ordered by US President Richard Nixon on 12 October 1973?',
    'A massive emergency military airlift flying 22,000 tons of tanks, ammunition, and precision missiles to Israel',
    'A secret plan to drop atomic bombs on the Syrian capital of Damascus',
    'A CIA covert operation to assassinate Anwar Sadat in Cairo',
    'An economic embargo against all Arab oil-producing nations',
    'Fearing Israel was running dangerously low on ammunition and anti-tank munitions, Nixon ordered US Galaxy transport planes to deliver supplies, matching Soviet airlifts to Egypt and Syria.',
    1, // B
  ),
  makeQuestion(
    'What devastating economic weapon did the Organization of Arab Petroleum Exporting Countries (OAPEC) unleash during the 1973 War?',
    'An oil production cut and full embargo against the US and Netherlands, causing global oil prices to quadruple',
    'A boycott of all Western commercial passenger flights',
    'The mass withdrawal of Arab deposits from the Bank of England',
    'The nationalisation of all Western pharmaceutical factories',
    'Led by King Faisal of Saudi Arabia, Arab oil producers demonstrated for the first time that oil was a lethal political weapon, triggering double-digit inflation and a worldwide economic recession.',
    2, // C
  ),
  makeQuestion(
    'What tense Cold War standoff occurred on 24–25 October 1973 as the war drew to a close?',
    'Soviet leader Brezhnev threatened unilateral military intervention to save the Egyptian Third Army, prompting the US to place its nuclear forces on DEFCON 3',
    'US and Soviet warships fought a naval battle in the Red Sea',
    'The Soviet Union launched intercontinental ballistic missiles toward Washington',
    'President Nixon flew to Moscow to surrender US bases in Turkey',
    'When Israeli troops violated the first ceasefire to tighten the siege on Suez, Moscow mobilized airborne divisions. The US went to DEFCON 3 to signal resolve, forcing Israel to halt its advance.',
    3, // D
  ),
  makeQuestion(
    'What landmark United Nations Security Council Resolution, passed on 22 October 1973, called for an immediate ceasefire and the direct implementation of Resolution 242?',
    'Resolution 338',
    'Resolution 181',
    'Resolution 194',
    'Resolution 425',
    'Drafted jointly by the US and USSR in Moscow, Resolution 338 demanded an immediate halt to all fighting and called for immediate negotiations between the parties under appropriate auspices.',
    0, // A
  ),
  makeQuestion(
    "What judicial inquiry in Israel investigated the government and military's catastrophic lack of preparedness for the 1973 War?",
    'The Agranat Commission',
    'The Kahan Commission',
    'The Winograd Commission',
    'The Shamgar Commission',
    'The Agranat Commission recommended the dismissal of Chief of Staff David Elazar and intelligence chiefs, but controversially cleared PM Golda Meir and Moshe Dayan, sparking furious public protests.',
    1, // B
  ),
  makeQuestion(
    'What political fallout occurred in Israel in the months following the release of the Agranat Commission report in 1974?',
    'Prime Minister Golda Meir and Defense Minister Moshe Dayan were forced to resign amid massive public outrage',
    'The Israeli Knesset voted to abolish the armed forces and rely solely on the United Nations',
    'The Labour Party won the largest electoral landslide in Israeli history',
    'General Ariel Sharon was appointed permanent military governor of the country',
    "Public grief over 2,600 dead soldiers and anger at government complacency destroyed the Labour establishment's credibility, ultimately leading to Menachem Begin's historic Likud victory in 1977.",
    2, // C
  ),
  makeQuestion(
    'What profound psychological and diplomatic breakthrough did the 1973 Yom Kippur War achieve for the Middle East?',
    "It shattered Israel's assumption that Arab armies would never fight effectively, and restored Egyptian national honor, making peace talks as equals possible",
    'It permanently ended all conflict between Israel and Syria',
    'It convinced the United States to abandon its alliance with Israel',
    'It caused the complete dissolution of the League of Arab States',
    'Sadat proved that Israel was not invincible and that occupation came at a heavy blood price. By restoring Egyptian pride, the war created the psychological conditions for the Camp David Accords.',
    3, // D
  ),
];

module.exports = { lesson4, lesson5, lesson6 };
