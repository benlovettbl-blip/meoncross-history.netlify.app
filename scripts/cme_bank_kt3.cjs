const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 7: KT3.1: Diplomatic negotiations, 1974–1979
const lesson7 = [
  makeQuestion(
    'What diplomatic method did US Secretary of State Henry Kissinger pioneer in 1974–75, flying repeatedly between Middle Eastern capitals to broker disengagement?',
    "'Shuttle Diplomacy'",
    "'Gunboat Diplomacy'",
    "'Dollar Diplomacy'",
    "'Detente Summitry'",
    'Kissinger avoided complex multi-lateral conferences, instead flying back and forth between Jerusalem, Cairo, and Damascus to negotiate separate, step-by-step disengagement pacts.',
    0, // A
  ),
  makeQuestion(
    'What major economic and infrastructural milestone occurred in June 1975 as a direct result of the Sinai disengagement agreements?',
    'Egypt officially reopened the Suez Canal to international maritime shipping after eight years of closure',
    'Israel completed construction of a nuclear power plant in Sinai',
    'Saudi Arabia offered free oil to the State of Israel',
    'The United Nations established a permanent headquarters in Port Said',
    "President Sadat reopened the cleared canal on 5 June 1975, exactly eight years after it closed in 1967, restoring vital toll revenues to Egypt's struggling economy.",
    1, // B
  ),
  makeQuestion(
    'What political earthquake occurred in Israel in May 1977, ending 29 unbroken years of Labour Party dominance?',
    "The right-wing Likud party led by former Irgun commander Menachem Begin won the national election (The 'Mahapakh')",
    'The Communist Party of Israel formed a majority coalition',
    'General Ariel Sharon staged a bloodless military coup',
    'The Knesset voted to dissolve the government and rejoin the British Commonwealth',
    "Begin's victory was propelled by working-class Mizrahi voters who felt neglected by Labour. Known as an uncompromising hawk, Begin shocked observers by subsequently making peace with Egypt.",
    2, // C
  ),
  makeQuestion(
    'What stunning announcement did President Anwar Sadat make to the Egyptian Parliament on 9 November 1977?',
    'That he was prepared to travel to the ends of the earth, even to the Israeli Knesset, to plead the cause of peace',
    'That Egypt was declaring unconditional war on the United States',
    'That Egypt was officially merging its government with Saudi Arabia',
    'That he had signed a mutual defense pact with the Soviet Union',
    "Sadat's speech shocked the world. Prime Minister Begin immediately responded with an official invitation, breaking thirty years of psychological taboo between Israel and the Arab world.",
    3, // D
  ),
  makeQuestion(
    'On what historic date did Anwar Sadat land at Ben Gurion Airport and address the Israeli Knesset in Jerusalem?',
    '19–20 November 1977',
    '6 October 1973',
    '17 September 1978',
    '26 March 1979',
    'Millions watched live television as Sadat stepped off the plane, greeted by Golda Meir and Menachem Begin, and delivered an impassioned plea for peace directly to the Knesset.',
    0, // A
  ),
  makeQuestion(
    'Which US President intervened decisively to rescue the stalled negotiations by inviting Sadat and Begin to the presidential retreat at Camp David, Maryland in September 1978?',
    'President Jimmy Carter',
    'President Richard Nixon',
    'President Ronald Reagan',
    'President Gerald Ford',
    'Carter staked his entire presidency on the summit, spending 13 grueling days acting as mediator, scribe, and emotional buffer between the deeply suspicious Sadat and Begin.',
    1, // B
  ),
  makeQuestion(
    'What were the two distinct framework documents agreed upon at the conclusion of the 13-day Camp David summit in September 1978?',
    'A Framework for Peace between Egypt and Israel, and a Framework for Peace in the Middle East (Palestinian autonomy)',
    'A Treaty on Nuclear Disarmament, and a Trade Accord for Mediterranean shipping',
    'An Agreement to Partition the Sinai, and an Alliance against the Soviet Union',
    'A Plan for Joint Control of the Suez Canal, and an Accord for Egyptian-Jordanian Federation',
    'The first framework led to the 1979 peace treaty, while the second framework remained a dead letter because Begin offered only limited administrative autonomy, not sovereign statehood, to Palestinians.',
    2, // C
  ),
  makeQuestion(
    'On what date was the historic Egypt-Israel Peace Treaty (Treaty of Washington) officially signed on the White House lawn?',
    '26 March 1979',
    '17 September 1978',
    '6 October 1981',
    '13 September 1993',
    'Sadat and Begin signed the treaty in the presence of Jimmy Carter, formally ending 31 years of war between Israel and the most populous Arab state.',
    3, // D
  ),
  makeQuestion(
    'What was the primary territorial concession made by Israel under the 1979 Egypt-Israel Peace Treaty?',
    'Israel returned the entire Sinai Peninsula to Egypt in three phased stages over three years',
    'Israel handed over the Gaza Strip to Jordan',
    'Israel ceded half of Jerusalem to the United Nations',
    'Israel evacuated all military installations from the Golan Heights',
    'In exchange for full diplomatic recognition, peace, and security guarantees, Israel surrendered the oil-rich Sinai Peninsula, which represented 90% of all land captured in 1967.',
    0, // A
  ),
  makeQuestion(
    'What controversial Israeli settlement in northeastern Sinai was forcibly evacuated by the IDF and demolished with bulldozers in April 1982 to complete the treaty terms?',
    'Yamit',
    'Ofira',
    'Kfar Etzion',
    'Ariel',
    'Right-wing settlers chained themselves to rooftops in Yamit to resist the withdrawal. Defense Minister Ariel Sharon ordered troops to drag them away and raze the town to the ground.',
    1, // B
  ),
  makeQuestion(
    'What prestigious international honor was awarded jointly to Anwar Sadat and Menachem Begin in 1978 for their peace breakthrough?',
    'The Nobel Peace Prize',
    'The UN Human Rights Award',
    'The Woodrow Wilson Peace Medal',
    'The International Red Cross Cross of Honor',
    "The Nobel Committee recognized their courage in breaking the Arab-Israeli diplomatic deadlock, though Arab nations condemned Sadat's acceptance as a betrayal.",
    2, // C
  ),
  makeQuestion(
    'How did the rest of the Arab world immediately respond to Egypt signing the 1979 peace treaty with Israel?',
    'They expelled Egypt from the Arab League, severed diplomatic ties, and moved the League headquarters from Cairo to Tunis',
    'They all signed identical peace treaties with Israel within six months',
    'They launched an immediate combined military invasion of Cairo',
    'They demanded that the United States cut all trade with Israel',
    "Nasser's proud Egypt was cast out as a pariah state for breaking the Arab consensus of Khartoum and abandoning the Palestinian cause for its own narrow territorial gain.",
    3, // D
  ),
  makeQuestion(
    'What massive financial incentive did the United States provide to lock in the 1979 Egyptian-Israeli peace treaty?',
    'Billions of dollars in permanent annual military and economic foreign aid to both Israel and Egypt',
    'A promise to forgive all British World War Two debts',
    'Free ownership of US naval shipyards in Norfolk, Virginia',
    'Complete tariff-free exports of Egyptian cotton to all 50 US states',
    'To this day, Israel and Egypt remain among the largest recipients of US foreign assistance in the world, receiving roughly $3 billion and $1.5 billion annually to maintain stability.',
    0, // A
  ),
  makeQuestion(
    'What tragic event occurred on 6 October 1981 during a military victory parade in Cairo?',
    'Anwar Sadat was assassinated by radical Islamist soldiers belonging to Egyptian Islamic Jihad',
    'Menachem Begin was assassinated by a right-wing extremist',
    'A military coup overthrew the Egyptian army leadership',
    'Israeli jets accidentally bombed the reviewing stand',
    "Led by Lieutenant Khalid Islambouli, militant soldiers broke from the parade and opened fire on the presidential stand with assault rifles and grenades, shouting 'I have killed Pharaoh!'",
    1, // B
  ),
  makeQuestion(
    'Who succeeded Anwar Sadat as President of Egypt in October 1981, maintaining the peace treaty with Israel for the next thirty years?',
    'Hosni Mubarak',
    'Gamal Abdel Nasser',
    'Boutros Boutros-Ghali',
    'Omar Suleiman',
    "Sadat's Vice President, former Air Force Commander Hosni Mubarak, assumed power and maintained a 'cold peace' with Israel while gradually restoring Egypt's diplomatic standing in the Arab world.",
    2, // C
  ),
  makeQuestion(
    'Why was Menachem Begin willing to return the entire Sinai to Egypt while resolutely refusing to concede any part of the West Bank or Gaza?',
    'Begin viewed Sinai as a strategic desert buffer, but regarded the West Bank (Judea and Samaria) as non-negotiable ancestral biblical Jewish land',
    'Because Sinai had no commercial or agricultural value whatsoever',
    'Because the United Nations threatened to invade Tel Aviv if Sinai was kept',
    'Because Egypt promised to pay Israel $50 billion in gold bullion',
    "For Begin and the Likud party, peace with Egypt neutralized Israel's most powerful Arab military adversary, thereby removing the threat of a two-front war and securing Israeli control over the West Bank.",
    3, // D
  ),
  makeQuestion(
    "What law passed by the Israeli Knesset in July 1980 inflamed international opinion by declaring Jerusalem the 'complete and united' capital of Israel?",
    'The Jerusalem Law',
    'The Law of Return',
    'The Basic Law on Human Rights',
    'The Golan Heights Annexation Act',
    "The law formalized Israel's annexation of East Jerusalem, prompting the UN Security Council to pass Resolution 478 declaring the law null and void and calling on nations to withdraw their embassies from Jerusalem.",
    0, // A
  ),
  makeQuestion(
    'What strategic diplomatic goal did Egypt achieve by securing the return of the Sinai Peninsula?',
    'It regained its full sovereign territory, oil fields, and total control over both banks of the Suez Canal',
    'It established an Egyptian military garrison inside Tel Aviv',
    'It acquired the right to annex the Kingdom of Jordan',
    'It gained control of the headwaters of the Jordan River',
    'Egypt recovered all the land it lost in 1967, reclaimed the Abu Rudeis oil fields, and removed the existential threat of Israeli military strikes across the Suez Canal.',
    1, // B
  ),
  makeQuestion(
    'Why did the Palestinian leadership under Yasser Arafat furiously reject the Camp David Accords?',
    "Because the Accords offered only limited administrative 'autonomy' while ignoring Palestinian statehood, self-determination, and the status of Jerusalem",
    'Because Egypt was granted ownership of the Gaza Strip',
    'Because the Accords forced all Palestinians to move to Saudi Arabia',
    'Because the United States refused to recognize the existence of the United Nations',
    "Palestinians felt betrayed by Sadat, arguing that the vague promises of 'autonomy' were merely a cosmetic screen that allowed Israel to entrench and expand Jewish settlements in the West Bank.",
    2, // C
  ),
  makeQuestion(
    'What term is commonly used by political scientists to describe the post-1979 relationship between Egypt and Israel?',
    "A 'Cold Peace'",
    "A 'Strategic Alliance'",
    "A 'Brotherly Federation'",
    "An 'Armed Neutrality'",
    'While the treaty held firm militarily and ambassadors were exchanged, Egyptian professional syndicates, artists, and the public maintained a deep cultural and commercial boycott against normalizing with Israel.',
    3, // D
  ),
];

// Lesson 8: KT3.2: The Palestinian Issue, 1974–1993
const lesson8 = [
  makeQuestion(
    'What famous phrase did PLO Chairman Yasser Arafat use at the end of his landmark address to the UN General Assembly in November 1974?',
    "'I have come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.'",
    "'There can be no peace, no recognition, and no compromise.'",
    "'We will fight on the beaches, we will fight in the streets.'",
    "'Give me liberty or give me death in the sands of Palestine.'",
    "Arafat became the first representative of a non-state entity to address the UN, signaling the PLO's readiness to engage in international diplomacy alongside armed struggle.",
    0, // A
  ),
  makeQuestion(
    'What status did the United Nations General Assembly grant to the Palestine Liberation Organization (PLO) in November 1974 via Resolution 3237?',
    'Permanent Observer Status',
    'Full Sovereign Member State Status',
    'A seat on the UN Security Council',
    'Direct command of the UN Peacekeeping Forces',
    "The UN recognized the PLO as the 'sole legitimate representative of the Palestinian people', elevating Arafat to statesman status and dealing a major blow to King Hussein's claim to represent the West Bank.",
    1, // B
  ),
  makeQuestion(
    'What tragic internal conflict broke out in 1975, largely driven by sectarian tensions and the growing armed presence of the PLO?',
    'The Lebanese Civil War',
    'The Jordanian Civil War',
    "The Syrian Ba'athist Revolt",
    'The Yemenite Insurgency',
    "Christian Maronites feared that armed Palestinian factions allied with Lebanese Muslim leftists were creating a 'state within a state' and tipping the country's delicate sectarian balance.",
    2, // C
  ),
  makeQuestion(
    'What was the official name of the full-scale Israeli military invasion of Lebanon launched on 6 June 1982?',
    'Operation Peace for Galilee',
    'Operation Kadesh',
    'Operation Focus',
    'Operation Litani',
    'The operation aimed to push PLO rocket artillery 40 kilometres north of the border, but Defense Minister Ariel Sharon expanded the campaign into a drive on Beirut to crush the PLO entirely.',
    3, // D
  ),
  makeQuestion(
    'What was the immediate trigger (pretext) used by Israel to launch the 1982 invasion of Lebanon?',
    'The attempted assassination of Israeli Ambassador Shlomo Argov in London by the renegade Abu Nidal faction',
    'A full-scale Syrian tank invasion across the Golan Heights',
    'The kidnapping of an Israeli submarine in the Mediterranean',
    'The hijacking of an El Al airliner in Athens',
    "Although British intelligence confirmed the attack was carried out by Abu Nidal (a mortal enemy of Arafat's PLO), the Begin government used it to launch their long-planned invasion to destroy the PLO.",
    0, // A
  ),
  makeQuestion(
    'What decisive military strategy did Defense Minister Ariel Sharon pursue during the summer of 1982 in Lebanon?',
    'He drove past the approved 40km buffer zone to surround and lay siege to West Beirut, subjecting the city to heavy air and artillery bombardment',
    'He ordered a complete withdrawal back to the Green Line after three days',
    'He deployed French peacekeepers to disarm all Christian militias',
    'He surrendered Israeli tanks to Syrian military commanders',
    "Sharon's siege of an Arab capital and the heavy civilian toll caused widespread international condemnation, fierce US pressure from Ronald Reagan, and massive anti-war protests inside Israel.",
    1, // B
  ),
  makeQuestion(
    'Where were Yasser Arafat and 14,000 PLO fighters evacuated to by ship in August 1982 following the US-brokered siege of Beirut?',
    'Tunis (Tunisia) and other Arab nations far from the Israeli border',
    'Tehran, Iran',
    'Moscow, Soviet Union',
    'London, Great Britain',
    'French and American peacekeepers supervised the evacuation. Moving PLO headquarters to Tunis isolated Arafat geographically from Palestine, weakening his military option.',
    2, // C
  ),
  makeQuestion(
    'What horrific event took place in Beirut between 16 and 18 September 1982 following the assassination of Lebanese President-elect Bashir Gemayel?',
    'The Sabra and Shatila massacre of Palestinian refugees by Christian Phalangist militias',
    'The bombing of the US Marine barracks',
    'The execution of the Israeli cabinet in Tel Aviv',
    'The detonation of a nuclear warhead over Beirut port',
    "Seeking vengeance for Gemayel's murder, Phalangist militiamen entered the camps while Israeli troops surrounded the perimeter and fired illuminating flares, butchering between 800 and 2,000 civilians.",
    3, // D
  ),
  makeQuestion(
    "What official Israeli judicial investigation found Defense Minister Ariel Sharon bearing 'personal responsibility' for failing to prevent the Sabra and Shatila massacre?",
    'The Kahan Commission',
    'The Agranat Commission',
    'The Shamgar Commission',
    'The Peel Commission',
    'Following a massive 400,000-person protest in Tel Aviv, the Kahan Commission forced Sharon to resign as Defense Minister, ruling that he should have anticipated that sending the Phalangists would lead to a massacre.',
    0, // A
  ),
  makeQuestion(
    'What radical Iranian-backed Shia militant movement emerged in southern Lebanon during the 1980s to fight against Israeli occupation?',
    "Hezbollah ('Party of God')",
    'Hamas',
    'Al-Qaeda',
    'The Muslim Brotherhood',
    "Hezbollah used suicide bombings, roadside ambushes, and guerrilla warfare to harass the IDF and its Christian proxy militia (the South Lebanon Army), eventually forcing Israel's full withdrawal in 2000.",
    1, // B
  ),
  makeQuestion(
    'What spontaneous event on 8 December 1987 ignited the First Palestinian Intifada in the Gaza Strip?',
    'An Israeli army tank transporter collided with civilian cars in the Jabalia refugee camp, killing four Palestinian workers',
    'The Israeli government announced the total demolition of the Dome of the Rock',
    'Yasser Arafat declared full-scale war from his headquarters in Tunis',
    'The United States vetoed a UN resolution on Palestinian water rights',
    'Rumors spread that the crash was deliberate revenge for the stabbing of an Israeli. Riots erupted at the funerals in Jabalia and instantly spread across Gaza and the West Bank.',
    2, // C
  ),
  makeQuestion(
    'What primary tactics characterized the First Intifada (1987–1993) on the streets of the occupied territories?',
    "Grassroots civil disobedience, stone-throwing by youth ('Children of the Stones'), commercial strikes, barricades, and tax boycotts",
    'High-altitude precision aerial bombings by Palestinian fighter jets',
    'Full-scale conventional tank assaults against Israeli border bases',
    'Submarine warfare in the Mediterranean Sea',
    'The Intifada was largely unarmed in its early phases. Television images of Israeli soldiers armed with M-16s confronting stone-throwing Palestinian teenagers flipped global media perceptions of David vs Goliath.',
    3, // D
  ),
  makeQuestion(
    'What underground committee inside the occupied territories coordinated the strikes, boycotts, and civil resistance of the First Intifada through clandestine leaflets?',
    'The UNLU (Unified National Leadership of the Uprising)',
    'The Arab League Executive Board',
    'The Israeli Military Command',
    'The Islamic Jihad Central Council',
    'The UNLU united Fatah, the PFLP, DFLP, and Communists. Their numbered communiqués instructed the population when to open shops, hold strikes, and confront the military.',
    0, // A
  ),
  makeQuestion(
    'What controversial policy was introduced by Israeli Defense Minister Yitzhak Rabin to suppress the First Intifada?',
    "The 'Iron Fist' policy, including curfews, home demolitions, mass administrative detention, and 'breaking bones'",
    'A policy of immediate, total military evacuation within 48 hours',
    'A plan to grant immediate Israeli citizenship to all Palestinian residents',
    'A policy of handing all governing authority directly to the United Nations',
    'Rabin authorized troops to use force, beatings, plastic bullets, and tear gas to quell protests. Over 1,000 Palestinians were killed and tens of thousands injured or imprisoned over the course of the uprising.',
    1, // B
  ),
  makeQuestion(
    'Which new Islamist militant organization was founded in Gaza in December 1987 by Sheikh Ahmed Yassin as an offshoot of the Muslim Brotherhood?',
    'Hamas (The Islamic Resistance Movement)',
    'Hezbollah',
    'Fatah',
    'The PLO',
    "Hamas combined social welfare, religious orthodoxy, and armed jihad. Its 1988 Charter rejected any territorial compromise, posing a direct ideological threat to the secular, diplomatic approach of Arafat's PLO.",
    2, // C
  ),
  makeQuestion(
    'What historic announcement did King Hussein of Jordan make on 31 July 1988, dramatically reshaping Palestinian diplomacy?',
    "He severed all administrative and legal ties with the West Bank, abandoning Jordan's claim to the territory in favor of the PLO",
    'He declared war on Israel and mobilized the Arab Legion',
    'He invited Yasser Arafat to merge the PLO into the Jordanian government',
    'He signed a military alliance with the Islamic Republic of Iran',
    'King Hussein recognized that the Intifada showed West Bank Palestinians looked solely to the PLO, not Amman. His renunciation forced the PLO to step forward and seek sovereign statehood directly.',
    3, // D
  ),
  makeQuestion(
    'What historic declaration was made by Yasser Arafat and the Palestine National Council in Algiers on 15 November 1988?',
    'The unilateral declaration of an independent State of Palestine, accepting UN Resolution 242 and renouncing terrorism',
    'The immediate unconditional surrender of all Palestinian guerrilla fighters',
    'A formal military alliance with the Soviet Union to invade Israel',
    'A declaration making Cairo the permanent capital of Palestine',
    'Drafted by poet Mahmoud Darwish, the declaration recognized the partition principle of UN Resolution 181 and explicitly endorsed a two-state solution, fulfilling US preconditions for direct dialogue.',
    0, // A
  ),
  makeQuestion(
    'What condition did US President Ronald Reagan insist upon before opening formal diplomatic dialogue with the PLO in December 1988?',
    "Arafat had to explicitly accept UN Resolutions 242 and 338, recognize Israel's right to exist in peace, and renounce all forms of terrorism",
    'The PLO had to immediately dissolve its political executive committee',
    'Arafat had to convert to Christianity and move to Washington',
    'The PLO was required to pay $5 billion to the US Treasury',
    'After Arafat repeated the required formula word-for-word at a press conference in Geneva, Reagan announced the opening of substantive bilateral talks between the US and the PLO.',
    1, // B
  ),
  makeQuestion(
    "What was the 'Security Zone' established by Israel in southern Lebanon in 1985?",
    'A 10-mile deep buffer zone occupied by the IDF and the proxy South Lebanon Army (SLA) to prevent cross-border rocket attacks',
    'A free-trade economic corridor connecting Beirut and Haifa',
    'A United Nations refugee camp housing 500,000 civilians',
    'An international naval base operated jointly by Britain and France',
    "Israel withdrew from most of Lebanon but retained the southern buffer strip. It became a bloody quagmire of guerrilla attrition against Hezbollah until Israel's withdrawal in May 2000.",
    2, // C
  ),
  makeQuestion(
    'How did the First Intifada fundamentally alter the dynamic of the Israeli-Palestinian conflict by the early 1990s?',
    'It demonstrated to Israeli leaders that military occupation was unsustainable indefinitely, and proved to Palestinians that grassroots resistance could force diplomatic engagement',
    'It resulted in the total military defeat and surrender of the Palestinian population',
    'It convinced the Arab League to abandon all diplomatic support for Palestine',
    'It led to the immediate integration of the West Bank into the State of Israel',
    "The Intifada destroyed the illusion that Israel could peacefully maintain the status quo. It exhausted the IDF, damaged Israel's international standing, and convinced leaders like Yitzhak Rabin that partition was inevitable.",
    3, // D
  ),
];

// Lesson 9: KT3.3: Attempts at a solution, 1988–1995
const lesson9 = [
  makeQuestion(
    'What disastrous diplomatic gamble did Yasser Arafat take during the 1990–91 Gulf Crisis that alienated his wealthy Gulf Arab donors?',
    "He publicly backed Iraqi dictator Saddam Hussein following Iraq's invasion of Kuwait",
    'He signed a secret military alliance with the United States to bomb Baghdad',
    'He deployed 10,000 PLO fighters to defend Saudi Arabia',
    'He ordered the assassination of the King of Saudi Arabia',
    'Saddam attempted to link his withdrawal from Kuwait to Israeli withdrawal from Palestine. When the US-led coalition crushed Iraq, Gulf states expelled 400,000 Palestinians and cut all funding to the bankrupt PLO.',
    0, // A
  ),
  makeQuestion(
    'What historic global transformation in 1991 deprived the Arab states and the PLO of their primary superpower sponsor and diplomatic shield?',
    'The collapse of the Soviet Union',
    'The withdrawal of Great Britain from the United Nations',
    'The dissolution of the United States Sixth Fleet',
    'The economic collapse of the European Economic Community',
    'The end of the Cold War left the United States as the undisputed sole global superpower, while an influx of over 800,000 Soviet Jewish immigrants to Israel transformed the demographics and politics of the region.',
    1, // B
  ),
  makeQuestion(
    'What landmark diplomatic conference convened in Spain in October 1991, bringing Israeli, Jordanian, Syrian, Lebanese, and Palestinian delegates face-to-face for the first time?',
    'The Madrid Peace Conference',
    'The Geneva Summit',
    'The Camp David Summit',
    'The Oslo Accord Conference',
    'Co-sponsored by US President George H.W. Bush and Soviet President Mikhail Gorbachev, Madrid broke diplomatic taboos by placing direct Arab-Israeli bilateral negotiations on the world stage.',
    2, // C
  ),
  makeQuestion(
    'Which Israeli political party won the June 1992 national election on a platform of halting settlement construction and reaching an interim peace deal with the Palestinians?',
    'The Labour Party led by Yitzhak Rabin',
    'The Likud Party led by Yitzhak Shamir',
    'The Shas religious party',
    'The National Religious Party',
    "Rabin defeated the hardline Shamir, declaring in his inaugural address: 'The time has come not only to dream of peace, but to take real steps to achieve it.'",
    3, // D
  ),
  makeQuestion(
    'Where were the top-secret backchannel negotiations between Israeli academics and PLO officials conducted in 1993, completely bypassing the stalled official Washington talks?',
    'In Sarpsborg and Oslo, Norway',
    'In London, Great Britain',
    'In Cairo, Egypt',
    'In Stockholm, Sweden',
    'Norwegian sociologist Terje Rød-Larsen and Foreign Minister Johan Jørgen Holst hosted informal, deniable meetings in secluded Norwegian villas where negotiators drafted the historic peace framework.',
    0, // A
  ),
  makeQuestion(
    'What historic exchange of documents occurred between Yitzhak Rabin and Yasser Arafat on 9–10 September 1993 prior to signing the Oslo Accords?',
    "The Letters of Mutual Recognition: Israel recognized the PLO as representative of the Palestinians, and the PLO recognized Israel's right to exist in peace and security",
    'A formal extradition treaty for convicted terrorists',
    'A trade agreement dividing ownership of the Dead Sea minerals',
    'A military pact declaring joint war on Syria',
    'Rabin overcame deep personal revulsion to sign recognition of the PLO, while Arafat formally committed the PLO to peaceful coexistence and renounced all acts of terrorism.',
    1, // B
  ),
  makeQuestion(
    'On what historic date was the Declaration of Principles (Oslo I Accord) signed on the South Lawn of the White House, sealed by an iconic handshake between Rabin and Arafat?',
    '13 September 1993',
    '26 March 1979',
    '4 November 1995',
    '28 September 1995',
    "Hosted by US President Bill Clinton, the two lifelong enemies shook hands before 3,000 dignitaries. Rabin declared: 'We who have fought against you, the Palestinians, we say to you today in a loud and a clear voice: Enough of blood and tears.'",
    2, // C
  ),
  makeQuestion(
    'What interim governing body was established under the Oslo Accords to administer civilian life in parts of the West Bank and Gaza Strip?',
    'The Palestinian National Authority (PNA / PA)',
    'The Arab League Military Commission',
    'The United Nations Relief Council',
    'The Supreme Muslim Council',
    'The PA was granted authority over education, health, direct taxation, and policing. Yasser Arafat returned from 27 years in exile in July 1994 to serve as its first elected President.',
    3, // D
  ),
  makeQuestion(
    'What was the first territorial phase of the Oslo peace process implemented in May 1994 under the Cairo Agreement?',
    "'Gaza-Jericho First': Limited Palestinian self-rule established in the Gaza Strip and the West Bank city of Jericho",
    'The immediate evacuation of all Jewish settlements in East Jerusalem',
    'The return of the Golan Heights to Syria',
    'The complete disarmament of the Israeli Defence Forces',
    'Israeli troops withdrew from the populated centers of Gaza and the oasis city of Jericho, transferring policing and local government to newly deployed Palestinian police officers.',
    0, // A
  ),
  makeQuestion(
    'Who were the three leaders jointly awarded the 1994 Nobel Peace Prize for their groundbreaking work on the Oslo Accords?',
    'Yitzhak Rabin, Shimon Peres, and Yasser Arafat',
    'Bill Clinton, Jimmy Carter, and Anwar Sadat',
    'Yitzhak Shamir, King Hussein, and Hafez al-Assad',
    'Ariel Sharon, Mahmoud Abbas, and Hosni Mubarak',
    "The award generated controversy worldwide due to Arafat's past guerrilla background and the unresolved nature of the conflict, but celebrated their historic breakthrough toward peace.",
    1, // B
  ),
  makeQuestion(
    'What historic bilateral treaty was signed on 26 October 1994 at the Arava border crossing, making this country only the second Arab state to make peace with Israel?',
    'The Israel-Jordan Peace Treaty, signed by Yitzhak Rabin and King Hussein',
    'The Israel-Syria Golan Accord, signed by Hafez al-Assad',
    'The Israel-Lebanon Friendship Pact',
    'The Israel-Saudi Arabia Non-Aggression Treaty',
    'Rabin and King Hussein enjoyed genuine personal warmth and mutual respect. The treaty resolved long-standing land and water disputes along the Jordan and Yarmouk rivers.',
    2, // C
  ),
  makeQuestion(
    'What atrocity on 25 February 1994 in Hebron threatened to derail the peace process and sparked widespread rioting?',
    'American-Israeli Jewish extremist Baruch Goldstein opened fire with an assault rifle on Muslim worshippers inside the Cave of the Patriarchs (Ibrahimi Mosque), killing 29',
    'A Palestinian suicide bomber detonated a truck outside Tel Aviv central bus station',
    'An Israeli naval vessel shelled a fishing village in Gaza',
    'A bomb destroyed the British embassy in Amman',
    'Goldstein, a follower of the radical Kach movement, murdered worshippers during Ramadan. In response, Hamas announced a deadly campaign of suicide bus bombings inside Israeli cities.',
    3, // D
  ),
  makeQuestion(
    'What deadly tactic did militant Islamist factions Hamas and Palestinian Islamic Jihad systematically launch in 1994–95 to destroy Israeli public support for the Oslo Accords?',
    'Suicide bus bombings in Israeli cities like Tel Aviv, Afula, and Hadera targeting civilians',
    'High-altitude missile strikes against Haifa naval yards',
    'Kidnapping American diplomats in Cairo',
    'Poisoning urban water reservoirs across the Galilee',
    "Hamas sought to sabotage the peace process and provoke Israeli retaliation. The horrific carnage on passenger buses shattered the Israeli public's sense of personal security and eroded faith in Rabin's peace policy.",
    0, // A
  ),
  makeQuestion(
    'How was the territory of the West Bank divided under the September 1995 Interim Agreement (Oslo II / Taba Accord)?',
    'Into three distinct administrative categories: Areas A, B, and C',
    'Into two independent sovereign states with concrete walls',
    'Into four equal quadrants administered by NATO peacekeepers',
    'Into a single binational federation governed by the United Nations',
    'Oslo II divided the West Bank: Area A (Palestinian civil & security control; 3% of land, major cities); Area B (Palestinian civil, joint Israeli security; 24%); Area C (full Israeli civil & military control; 73% of land, settlements, roads).',
    1, // B
  ),
  makeQuestion(
    "Under the Oslo II territorial breakdown, what was the status of 'Area C' in the West Bank?",
    'Full Israeli military and civil control, covering over 70% of the land and containing all Jewish settlements, military bases, and bypass roads',
    'Full Palestinian sovereign control with no Israeli presence allowed',
    'An international neutral demilitarized zone guarded by UN peacekeepers',
    'A joint condominium ruled equally by Jordan and Egypt',
    'Area C contained virtually all the open land, natural resources, water aquifers, and Jewish settlements. Palestinians viewed Area C as fragmenting the West Bank into disconnected islands (Bantustans).',
    2, // C
  ),
  makeQuestion(
    'What was the most critical structural flaw of the Oslo peace process that ultimately contributed to its collapse?',
    "It deliberately deferred the most contentious 'permanent status' issues (Jerusalem, Palestinian refugees' Right of Return, borders, and Jewish settlements) to be solved later",
    'It required the complete dissolution of the Israeli economy within three years',
    'It granted the United States permanent ownership of the Gaza coastline',
    'It forced all Arab nations to abolish their armed forces',
    'The gradualist step-by-step approach assumed that confidence-building would make hard issues solvable. Instead, while final talks were delayed, settlement expansion and terror attacks poisoned trust on both sides.',
    3, // D
  ),
  makeQuestion(
    'How did the expansion of Israeli settlements during the Oslo years (1993–1995) impact Palestinian attitudes toward the peace process?',
    'It generated deep cynicism and disillusionment, as the settler population in the West Bank and Gaza grew by over 50%, signaling that Israel had no intention of ending the occupation',
    'It convinced Palestinians that Israel was eager to give up all land immediately',
    'It led to the immediate dissolution of the Hamas militant group',
    'It caused all Palestinian refugees to permanently surrender their claims in Jordan',
    'While peace was being negotiated, the number of Israeli settlers in the West Bank increased dramatically, leading Palestinians to believe that Israel was using the peace process as cover to create irreversible facts on the ground.',
    0, // A
  ),
  makeQuestion(
    'What toxic political climate emerged inside Israel among right-wing and religious nationalist groups opposing the Oslo Accords in 1994–95?',
    "Rabin was branded a traitor, 'Judenrat', and depicted in Nazi SS uniform at mass rallies led by right-wing opposition politicians",
    'A nationwide general strike shut down the Israeli military for six months',
    'The Knesset passed a law making criticism of the peace process punishable by death',
    'Right-wing leaders defected to Jordan to seek political asylum',
    'Rabbis issued theological condemnations against handing biblical land to non-Jews. Heated protests and blood libels created an atmosphere of incitement that culminated in political violence.',
    1, // B
  ),
  makeQuestion(
    'What devastating tragedy occurred on the evening of 4 November 1995 at Kings of Israel Square in Tel Aviv, dealing a fatal blow to the peace process?',
    'Israeli Prime Minister Yitzhak Rabin was assassinated by Yigal Amir, a right-wing Jewish extremist, after addressing a massive peace rally',
    "A Palestinian suicide bomber detonated an explosive vest on the speaker's podium",
    'Yasser Arafat was assassinated by an Israeli commando team',
    'A riot between rival political factions burned down Tel Aviv City Hall',
    "Rabin had just sung 'The Song for Peace' before 100,000 cheering citizens. As he walked to his car, Amir fired three hollow-point bullets into his back, intending to destroy the peace process.",
    2, // C
  ),
  makeQuestion(
    "What was the political consequence of Yitzhak Rabin's assassination in Israel's May 1996 general election?",
    'Following a wave of Hamas suicide bus bombings, right-wing Likud leader Benjamin Netanyahu narrowly defeated Shimon Peres on a campaign emphasizing security over peace concessions',
    'Shimon Peres won the largest parliamentary landslide in Israeli history',
    'The Labour Party and Likud merged into a permanent coalition',
    'Israel adopted a new constitution recognizing an independent Palestinian state',
    "Netanyahu campaigned under the slogan 'Netanyahu – Making a Safe Peace'. His victory halted the momentum of the Oslo Accords and marked a fundamental shift back toward hardline security skepticism.",
    3, // D
  ),
];

module.exports = { lesson7, lesson8, lesson9 };
