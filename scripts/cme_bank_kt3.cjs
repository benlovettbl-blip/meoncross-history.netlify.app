const { makeQuestion } = require('./enrich_quizzing_helper.cjs');

// Lesson 7: KT3.1: Diplomatic negotiations, 1974–1979
const lesson7 = [
  makeQuestion(
    'Explain the significance of the oil crisis for American foreign policy in the Middle East after 1973.',
    'The OPEC oil embargo quadrupled petroleum prices from $3 to $12 per barrel and caused Western fuel rationing, forcing the United States to prioritize active Middle Eastern diplomacy to prevent future wars.',
    'It persuaded the United States to abandon its alliance with Israel and deploy 100,000 troops to occupy Saudi Arabian oil wells.',
    'It resulted in Western European nations cutting all trade with Arab states and importing oil exclusively from the Soviet Union.',
    'It led the United States Congress to dissolve the State Department and transfer foreign policy to the United Nations.',
    'The 1973 oil embargo demonstrated that regional conflict directly threatened Western economic prosperity. Long petrol station queues and stagflation in the US convinced Secretary of State Henry Kissinger that Washington could no longer afford a frozen status quo in the Middle East.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the involvement of the USA and the USSR in diplomatic negotiations after 1973.',
    'While the Geneva Conference (Dec 1973) was co-chaired by both superpowers, US Secretary of State Henry Kissinger deliberately marginalized the USSR to establish American diplomatic pre-eminence in the region.',
    'The Soviet Union and the United States signed a secret treaty to divide Egypt and Syria into permanent Cold War spheres of influence.',
    'The Soviet Union provided $5 billion in direct economic grants to Israel to encourage Menachem Begin to negotiate with Egypt.',
    'Both superpowers agreed to withdraw all ambassadors and impose a total arms embargo on every Middle Eastern nation.',
    'Kissinger viewed the post-1973 environment through a Cold War lens. By stepping into the role of sole mediator between Israel, Egypt, and Syria, Kissinger systematically froze Moscow out of the peace process, pulling Cairo firmly into the American orbit.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing diplomatic negotiations, what was the primary achievement of Kissinger’s ‘shuttle diplomacy’ in 1974–75?',
    'Kissinger flew between Middle Eastern capitals to broker the Sinai I (Jan 1974), Syrian Golan (May 1974), and Sinai II (Sept 1975) disengagement agreements separating hostile armies.',
    'Kissinger convinced the Arab League to disband the PLO and accept full Israeli sovereignty over the West Bank and Gaza.',
    'Kissinger persuaded the United Nations General Assembly to deploy 100,000 American soldiers to garrison Jerusalem.',
    'Kissinger negotiated an immediate unconditional surrender of all Syrian military forces along the Golan Heights.',
    'Escewing unwieldy multilateral conferences, Kissinger boarded his Boeing 707 to shuttle tirelessly between Jerusalem, Cairo, and Damascus. His step-by-step approach untangled front lines, established UN buffer zones, and built essential diplomatic trust.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the reopening of the Suez Canal in June 1975 following bilateral disengagement agreements.',
    'Egypt cleared mines, resumed international maritime shipping through the canal after eight years of closure, and regained vital transit toll revenues that stabilized its national economy.',
    'Israel gained complete sovereign control over the northern entrance to the canal at Port Said.',
    'The Soviet Navy was granted exclusive rights to collect all transit tolls from Western commercial vessels.',
    'Egypt converted the canal into an impenetrable freshwater barrier that completely halted all regional trade.',
    'Closed since the Six Day War in June 1967, the canal was cleared of sunken wrecks and unexploded ordnance with US and British naval assistance. Reopening the waterway on 5 June 1975 demonstrated Sadat’s commitment to peace and economic reconstruction.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the 1977 Israeli election for diplomatic negotiations with Egypt.',
    'Menachem Begin’s right-wing Likud victory ended 29 years of Labor dominance, bringing to power a decisive nationalist leader with the political credibility to make historic concessions in Sinai.',
    'The Communist Party of Israel won a majority and formed a coalition government with the Palestinian Liberation Organization.',
    'The Israeli public voted to dissolve the Knesset and join the British Commonwealth as an overseas territory.',
    'Prime Minister Yitzhak Rabin was re-elected with an overwhelming majority that rejected any future negotiations with Arab states.',
    'Begin was a former Irgun underground commander with impeccable nationalist credentials. Just as only anti-communist Nixon could go to China, only a hardline Israeli hawk like Begin possessed the domestic authority to dismantle Jewish settlements in Sinai without triggering a right-wing revolt.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of Sadat’s visit to Israel (1977) for breaking the 30-year diplomatic deadlock.',
    'Anwar Sadat landed at Ben Gurion Airport on 19 November 1977 and addressed the Knesset in Jerusalem, smashing psychological taboos by offering full peace in exchange for Israeli withdrawal from Arab lands.',
    'Sadat surrendered the entire Egyptian military arsenal to the Israeli General Staff in exchange for economic loans.',
    'Sadat travelled to Tel Aviv to sign a joint military defence alliance with Israel against Syria and Iraq.',
    'Sadat was taken hostage by the Israeli government, which forced him to surrender the Suez Canal.',
    'Sadat’s daring leap of faith stunned the world. Speaking directly to the Israeli parliament and public on live television, he acknowledged Israel’s existence and security needs, tearing down the psychological barrier that had made direct bilateral talks impossible.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of Begin’s visit to Egypt (1977) in December 1977.',
    'Prime Minister Begin met Sadat in Ismailia to conduct reciprocal bilateral negotiations, establishing permanent direct diplomatic communication channels between Cairo and Jerusalem.',
    'Begin declared war on Egypt and ordered the Israeli Air Force to bomb Egyptian airfields in the Nile Delta.',
    'The Egyptian public held a national referendum that voted to annex the southern half of Israel into Egypt.',
    'The United Nations Security Council expelled both Israel and Egypt for violating the Geneva Conventions.',
    'Begin’s Christmas Day summit with Sadat in Ismailia marked the first official visit of an Israeli Prime Minister to an Arab state. Although talks stalled over the Palestinian issue and Sinai settlements, it institutionalized direct ministerial contacts.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of US President Carter and Camp David (1978) in resolving diplomatic impasses.',
    'President Jimmy Carter hosted 13 days of intensive, sequestered mediation at Camp David in September 1978, drafting compromise texts that produced the historic Camp David Accords.',
    'Carter threatened to deploy the US military to occupy Cairo and Tel Aviv if both leaders refused to sign a peace treaty.',
    'Carter forced Israel to surrender West Jerusalem to the United Nations Trusteeship Council within 24 hours.',
    'Carter broke diplomatic relations with Israel and offered $10 billion in modern weapons exclusively to Egypt.',
    'When bilateral talks broke down in mid-1978, Carter took a massive political risk by secluding Begin and Sadat at the presidential retreat in Maryland. Acting as mediator, drafter, and emotional buffer, Carter personally saved the summit from collapse.',
    3, // D
  ),
  makeQuestion(
    'In a narrative account analysing the Camp David Accords (1978), what were the two distinct frameworks signed by Begin and Sadat?',
    'One framework outlined a phased five-year plan for Palestinian self-governing autonomy in the West Bank and Gaza, while the other established the terms for an Egyptian-Israeli peace treaty.',
    'One framework partitioned Lebanon between Israel and Syria, while the other transferred the Suez Canal to the United States.',
    'One framework merged Egypt and Israel into a single federal democracy, while the other abolished the United Nations.',
    'One framework expelled all Palestinian refugees to North Africa, while the other established a joint nuclear force.',
    'Signed on 17 September 1978, the first framework (‘A Framework for Peace in the Middle East’) dealt vaguely with Palestinian autonomy, while the second (‘Framework for the Conclusion of a Peace Treaty’) laid down concrete steps for Israel’s complete withdrawal from Sinai.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Treaty of Washington (1979) signed on 26 March 1979.',
    'It was the first formal peace treaty between Israel and an Arab state, securing complete Israeli withdrawal from Sinai, demilitarisation, mutual diplomatic recognition, and open maritime transit through Suez and Tiran.',
    'It established a military alliance between Israel, Egypt, and Jordan to launch an invasion of the Soviet Union.',
    'It required Israel to dismantle the Israeli Defence Forces and rely on Egyptian peacekeepers for national defence.',
    'It placed the entire city of Jerusalem under the sovereign governance of the United States federal government.',
    'Signed on the White House lawn by Begin and Sadat with Jimmy Carter witnessing, the treaty transformed Middle Eastern geopolitics. Israel surrendered the entire Sinai Peninsula, its oil fields, and airbases in exchange for normalized diplomatic relations and permanent peace with its strongest neighbour.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Treaty of Washington (1979) for the Israeli settlement of Yamit in Sinai.',
    'Israel evacuated and bulldozed the entire Jewish coastal city of Yamit and 14 other farming settlements in April 1982, returning all captured Sinai territory to Egyptian sovereignty.',
    'Yamit was granted independent sovereign nation status with its own seat in the United Nations General Assembly.',
    'The Egyptian government purchased Yamit for $2 billion and converted it into a joint Israeli-Egyptian university.',
    'Israeli settlers in Yamit declared war on the Israeli government and joined the armed forces of Jordan.',
    'Dismantling Yamit was deeply painful for Israel. In April 1982, Israeli soldiers had to forcibly drag protesting nationalist settlers from rooftops before army bulldozers flattened the town to ensure the complete return of Sinai to Egypt.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the Treaty of Washington (1979) for Egypt’s standing within the Arab League.',
    'Arab states denounced Sadat as a traitor, expelled Egypt from the Arab League, moved League headquarters from Cairo to Tunis, and enacted a total economic and diplomatic boycott against Egypt.',
    'The Arab League unanimously praised Sadat and elected him supreme commander of all Arab military forces.',
    'Arab nations immediately signed identical peace treaties with Israel at the United Nations in New York.',
    'Saudi Arabia and Syria merged their governments with Egypt to form a unified Pan-Arab federation.',
    'Furious that Sadat had signed a separate bilateral peace that left the Palestinians under occupation, Arab states broke diplomatic relations with Cairo. Egypt, the traditional leader of the Arab world, found itself diplomatically isolated in the region for a decade.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Multinational Force and Observers (MFO) created following the Treaty of Washington (1979).',
    'An independent peacekeeping force led by the United States was deployed across Sinai to verify compliance with strict treaty demilitarisation zones and monitor the international border.',
    'It was a combat division tasked with conducting offensive commando raids against anti-treaty protests in Cairo.',
    'It was a Soviet-led military commission that managed all civil administration and tax collection in Sinai.',
    'It was an international naval fleet that blockaded the port of Eilat to prevent illegal immigration.',
    'Because the Soviet Union threatened to veto a UN peacekeeping force, the US organized the non-UN MFO. Stationed across four designated security zones in Sinai, the MFO continues to ensure that Sinai remains demilitarized and peaceful.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Camp David Accords for Palestinian nationalist attitudes towards Anwar Sadat.',
    'The PLO and West Bank Palestinians rejected the accords because Sadat negotiated their future without their consent, offering vague administrative autonomy rather than true self-determination and statehood.',
    'Palestinians celebrated Sadat as their national liberator and elected him honorary chairman of the PLO.',
    'The PLO agreed to dismantle all armed guerrilla units and integrate its fighters into the Egyptian army.',
    'Palestinian leaders signed a formal treaty in Cairo accepting permanent Israeli sovereignty over East Jerusalem.',
    'Palestinians viewed Sadat’s agreement to ‘autonomy’ talks as a betrayal that legitimized Israel’s continued military occupation of the West Bank and Gaza. Yasser Arafat vowed that the Palestinian people would not accept crumbs from an Egyptian-Israeli separate deal.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the domestic backlash against Sadat’s peace treaty inside Egypt.',
    'Radical Islamist militants from Egyptian Islamic Jihad assassinated President Anwar Sadat during a military victory parade in Cairo on 6 October 1981, leading to Hosni Mubarak becoming President.',
    'Sadat was re-elected in a popular landslide, securing 99% of the national vote for a third presidential term.',
    'The Egyptian military staged a coup d’état, executed the entire cabinet, and declared war on Israel.',
    'The Muslim Brotherhood dissolved itself and endorsed the complete westernization of Egyptian law.',
    'Simmering anger over economic hardship, corruption, and the perceived betrayal of the Palestinian cause galvanized Islamist extremist groups. On 6 October 1981, soldiers led by Lieutenant Khalid Islambouli opened fire on the presidential review stand, assassinating Sadat.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of Hosni Mubarak’s succession following Sadat’s assassination in October 1981 for relations with Israel.',
    'Mubarak honored all commitments under the Treaty of Washington, maintaining the ‘Cold Peace’ with Israel while gradually restoring Egypt’s diplomatic ties with moderate Arab states.',
    'Mubarak immediately tore up the peace treaty, remilitarised the Sinai, and launched an armored assault across the border.',
    'Mubarak signed an agreement with Israel to jointly invade Lebanon and partition Beirut between them.',
    'Mubarak severed all economic and military relationships with the United States and aligned Egypt with Iran.',
    'Vice President Hosni Mubarak inherited a volatile situation. He steadfastly adhered to the peace treaty with Israel—creating a durable ‘Cold Peace’ marked by correct diplomatic relations but limited cultural or economic warmth—while slowly rehabilitating Egypt’s standing in the Arab world.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the Nobel Peace Prize awarded in December 1978 to Anwar Sadat and Menachem Begin.',
    'It recognized their courage in concluding the Camp David Accords and symbolized global validation for the principle of trading conquered land for diplomatic recognition and peace.',
    'It was an honorary award given to them for their military victories during the 1973 Yom Kippur War.',
    'It was awarded to Jimmy Carter alone, while Begin and Sadat were barred from the ceremony in Oslo.',
    'It required both leaders to surrender their sovereign national passports and become citizens of Norway.',
    'Awarding the prize jointly to former bitter enemies highlighted the transformative potential of diplomacy. While controversial in the Arab world, it cemented Begin and Sadat’s international standing as statesmen who chose compromise over perpetual conflict.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing diplomatic negotiations between 1974 and 1979, which sequence of events accurately traces the peace process?',
    'Kissinger conducted shuttle diplomacy after the 1973 war; Sadat made his historic visit to Jerusalem in 1977; and Carter mediated the Camp David Accords leading to the 1979 Treaty of Washington.',
    'Sadat invaded Jerusalem in 1974; the UN imposed a treaty in 1977; and Begin resigned from politics in 1979.',
    'Carter visited Cairo in 1974; the Suez Canal was nationalised in 1977; and Israel annexed Sinai in 1979.',
    'The Arab League accepted Israel in 1974; Sadat was assassinated in 1977; and Begin signed peace in 1979.',
    'A coherent narrative account links post-1973 disengagement agreements to Sadat’s dramatic November 1977 journey to Jerusalem. When direct talks bogged down, Jimmy Carter’s personal mediation at Camp David produced the framework that culminated in the 1979 bilateral peace treaty.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of American financial and military commitments for securing the Treaty of Washington (1979).',
    'The United States pledged billions of dollars in annual economic and military subsidies to both Israel and Egypt, cementing a lasting Pax Americana in the eastern Mediterranean.',
    'The United States promised to build 50 nuclear reactors across Egypt and Israel to provide free electricity.',
    'The United States agreed to forgive all sovereign debt owed by European nations from the Second World War.',
    'The United States promised to pay $100 billion in direct cash subsidies to the Arab League in Tunis.',
    'Peace was underpinned by American aid. Washington agreed to provide approximately $3 billion annually to Israel and $2 billion to Egypt in military and economic aid, binding both nations closely to US strategic interests and stabilizing the peace.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the strategic impact of the Treaty of Washington (1979), why did it transform Israel’s national security?',
    'By neutralizing Egypt—the Arab world’s largest and most powerful military—Israel eliminated the threat of a coordinated multi-front conventional war against its borders.',
    'It allowed Israel to completely disband the Israeli Air Force and dismiss all reserve soldiers from duty.',
    'It forced Syria and Jordan to immediately surrender their armed forces to United Nations peacekeepers.',
    'It eliminated all Palestinian guerrilla resistance and ended terrorist attacks against Israeli civilians permanently.',
    'Historically, Israel’s greatest military nightmare was a coordinated two-front assault by Egypt and Syria. Removing Egypt from the hostile coalition broke the Arab military encirclement, leaving Syria isolated and granting Israel decisive conventional military superiority.',
    3, // D
  ),
];

// Lesson 8: KT3.2: The Palestinian issue, 1974–1993
const lesson8 = [
  makeQuestion(
    'Explain the importance of Arafat’s speech to the UN (1974) on 13 November 1974 for the Palestinian cause.',
    'Wearing a holster, Yasser Arafat delivered his famous ‘olive branch and freedom fighter’s gun’ address, elevating the Palestinian national movement from a refugee problem to a global struggle for self-determination.',
    'Arafat announced that the PLO was disbanding its armed wings and accepting full Israeli sovereignty over Jerusalem.',
    'Arafat declared that the Palestinian people wished to merge their territory into the Kingdom of Jordan.',
    'Arafat surrendered his leadership of the PLO and appointed King Hussein as the official representative of Palestine.',
    'Arafat’s appearance before the UN General Assembly was a diplomatic triumph. He warned delegates: ‘Do not let the olive branch fall from my hand.’ The speech redefined the conflict internationally from a border dispute between states into a question of Palestinian national rights.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of Arafat’s speech to the UN (1974) for the international legal status of the PLO.',
    'The UN General Assembly passed Resolution 3236 recognizing Palestinian rights to national independence and granted the PLO permanent official observer status as the sole legitimate representative of the Palestinian people.',
    'The United Nations expelled Israel from the General Assembly and deployed 50,000 peacekeepers to Tel Aviv.',
    'The United States officially recognized the State of Palestine and opened an embassy in East Jerusalem.',
    'The Arab League voted to dissolve the PLO and transfer all Palestinian representation to Egypt.',
    'Following the Rabat Arab Summit’s declaration that the PLO was the ‘sole legitimate representative of the Palestinian people’, the UN granted the PLO non-state observer status. This gave Arafat an international diplomatic platform comparable to a head of state.',
    1, // B
  ),
  makeQuestion(
    'Explain the significance of PLO activities in Lebanon during the mid-1970s for Lebanese national stability.',
    'The PLO created an armed state-within-a-state in southern Lebanon and West Beirut, controlling territory and clashing with Christian Maronite Phalangists, triggering the 1975 Lebanese Civil War.',
    'The PLO integrated peacefully into Lebanese society, becoming the dominant financial banking faction in Beirut.',
    'The PLO signed a mutual defense treaty with Israel to protect Lebanon from Syrian military intervention.',
    'The PLO surrendered all heavy weapons to the Lebanese army and converted into an unarmed charitable organization.',
    'Having rebuilt its military infrastructure after expulsion from Jordan, the PLO commanded 25,000 armed fighters in Lebanon. Their armed presence, cross-border raids against Israel, and alliance with Lebanese leftist Muslims destroyed the country’s fragile sectarian pact, plunging Lebanon into civil war.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of cross-border PLO activities in Lebanon for northern Israeli security between 1975 and 1982.',
    'Palestinian fedayeen fired Katyusha rockets into northern Israeli towns like Kiryat Shmona and launched deadly commando raids, such as the 1978 Coastal Road massacre that killed 38 Israeli civilians.',
    'PLO fighters maintained absolute peace along the Lebanese border, preventing any cross-border infiltration.',
    'The PLO protected Israeli border kibbutzim from attacks by Syrian-backed terrorist groups.',
    'Palestinian commandos built an underground railway to transport Israeli tourists safely into Beirut.',
    'Northern Israeli towns lived under constant threat of rocket barrages and hostage raids. In March 1978, a Fatah commando team landed on an Israeli beach, hijacked a passenger bus, and engaged in a firefight that killed 38 Israelis, prompting massive IDF retaliation.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the 1978 Coastal Road massacre for Israeli reprisals in Lebanon (Operation Litani).',
    'The IDF launched a major invasion of southern Lebanon with 25,000 troops, pushing PLO forces north of the Litani River and prompting the deployment of UN peacekeepers (UNIFIL).',
    'Prime Minister Menachem Begin signed an immediate peace treaty with Yasser Arafat in Jerusalem.',
    'The United States imposed severe military sanctions against Israel and withdrew all ambassadorial staff.',
    'The PLO completely withdrew all fighters from Lebanon and relocated its headquarters to London.',
    'Operation Litani aimed to clear a 20-mile security belt south of the Litani River. While PLO fighters withdrew north to avoid battle, the UN Security Council passed Resolution 425, establishing UNIFIL peacekeepers and creating the Israeli-allied South Lebanon Army (SLA) proxy militia.',
    0, // A
  ),
  makeQuestion(
    'In a narrative account analysing the trigger for the invasion of Lebanon (1982), which event provided the immediate pretext for Israeli military action?',
    'The Abu Nidal terrorist group attempted to assassinate Israeli Ambassador Shlomo Argov in London on 3 June 1982, leaving him critically paralyzed and prompting the Israeli cabinet to retaliate.',
    'The PLO dropped paratroopers onto Tel Aviv and captured the Israeli Ministry of Defense.',
    'The Lebanese navy fired torpedoes at an American passenger cruise ship off the coast of Haifa.',
    'Syrian jet fighters shot down 20 Israeli civilian airliners over the Mediterranean Sea.',
    'Although the hit was carried out by Abu Nidal’s renegade faction (sworn enemies of Arafat’s PLO), Defense Minister Ariel Sharon used the attack to justify launching a pre-planned invasion. When Chief of Staff Rafael Eitan was told Abu Nidal was not the PLO, he famously replied: ‘Abu Nidal, Abu Shmidal, they are all PLO.’',
    1, // B
  ),
  makeQuestion(
    'Explain the primary military objectives of the Israeli invasion of Lebanon (1982) launched on 6 June (Operation Peace for Galilee).',
    'Defense Minister Ariel Sharon intended to destroy the PLO’s military infrastructure in Lebanon, expel Syrian forces, and install a pro-Israeli Christian government under Bashir Gemayel in Beirut.',
    'To conquer Damascus and annex the southern provinces of Syria into the State of Israel.',
    'To rescue American hostages held in Tehran by deploying Israeli airborne brigades.',
    'To construct a permanent freshwater canal carrying the Litani River directly into the Sea of Galilee.',
    'While the cabinet initially approved an advance of only 40 kilometres to push PLO rockets out of range of northern towns, Sharon had far more ambitious goals. He pushed the IDF 60 miles north to the gates of Beirut, intending to fundamentally redraw the political map of the Levant.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing key events of the invasion of Lebanon (1982), what occurred during the summer siege of West Beirut?',
    'Israeli forces surrounded 15,000 PLO fighters in West Beirut, cutting water and electricity while conducting weeks of intensive air and artillery bombardment of residential neighbourhoods.',
    'The Lebanese army routed the Israeli forces within 24 hours and occupied northern Galilee.',
    'The Soviet Union landed 50,000 troops in Beirut harbour, forcing the IDF into an immediate retreat.',
    'Yasser Arafat and Ariel Sharon conducted daily face-to-face negotiations in the American embassy.',
    'For nearly three months, West Beirut was subjected to crushing Israeli siege tactics. The television images of apartment towers collapsing under Israeli bunker-buster bombs sparked widespread international outrage, including sharp reprimands from US President Ronald Reagan.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the international mediation that ended the siege of West Beirut in August 1982.',
    'An international peacekeeping force of US, French, and Italian troops evacuated Yasser Arafat and over 14,000 PLO fighters by sea to distant exile in Tunisia and other Arab states.',
    'Israel permanently annexed Lebanon as its northern sovereign territory and appointed a military governor.',
    'The PLO was granted direct sovereign control over West Jerusalem and the port city of Haifa.',
    'The United States and Israel signed a treaty dividing Lebanon into two American and Israeli military zones.',
    'Brokered by US diplomat Philip Habib, the multinational evacuation stripped the PLO of its armed sanctuary on Israel’s border. Dispersed across North Africa and headquartered in Tunis, thousands of miles from Palestine, the PLO appeared militarily finished.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the assassination of newly elected Lebanese President Bashir Gemayel on 14 September 1982.',
    'Christian Phalangist militiamen entered the Sabra and Shatila refugee camps in West Beirut under Israeli flares, massacring between 800 and 2,000 defenseless Palestinian civilians over 48 hours.',
    'The Lebanese parliament voted unanimously to merge Lebanon with the State of Israel.',
    'The PLO returned to Beirut in triumph and took over the presidential palace.',
    'The United States declared war on Syria and deployed 100,000 troops to occupy Damascus.',
    'Gemayel’s murder by a pro-Syrian operative shattered Israel’s political plan for a friendly Lebanon. Seeking vengeance, Phalangist fighters were allowed by the IDF to enter the camps to clear suspected terrorists, where they unleashed an orgiastic slaughter of women, children, and elderly refugees.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Kahan Commission of Inquiry established in Israel following the Sabra and Shatila massacre.',
    'Following a protest of 400,000 Israelis in Tel Aviv, the judicial commission found Defense Minister Ariel Sharon personally responsible for ignoring the danger of bloodshed, forcing his resignation.',
    'The commission voted to dissolve the Israeli Defence Forces and merge all military units into the police.',
    'The commission exonerated all Israeli officials and awarded Ariel Sharon the Medal of Valor.',
    'The commission recommended that Israel immediately launch a nuclear strike against Beirut and Damascus.',
    'The mass demonstration of 400,000 citizens in Tel Aviv (nearly 10% of Israel’s population) reflected moral horror. Chief Justice Yitzhak Kahan’s report concluded that Sharon bore ‘personal responsibility’ for failing to anticipate the massacre, severely tarnishing Sharon’s career.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the invasion of Lebanon (1982) and prolonged Israeli occupation for Lebanese resistance.',
    'Shiite Muslim militants in southern Lebanon radicalized and formed Hezbollah (‘Party of God’), backed by Iran, waging a relentless guerrilla campaign of suicide bombings against IDF forces.',
    'The entire population of southern Lebanon welcomed the Israeli army as permanent liberators.',
    'Lebanese political parties dissolved all militias and established an unarmed socialist republic.',
    'The South Lebanon Army surrendered its arms to the United Nations and disbanded in 1983.',
    'Israel entered Lebanon to crush the secular Sunni Palestinian PLO, but its occupation alienated the southern Shiite population. Guided and funded by the Iranian Revolutionary Guards, Hezbollah emerged as a formidable, religiously zealous guerrilla army that plagued the IDF for decades.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the invasion of Lebanon (1982) for Israeli domestic morale and Prime Minister Menachem Begin.',
    'High military casualties, international condemnation, and public anti-war protests demoralised Menachem Begin, who resigned in August 1983 declaring ‘I cannot go on any longer’.',
    'It united all Israeli political factions behind Begin, enabling him to win a landslide election victory in 1984.',
    'It resulted in Israel securing 20 years of total regional peace without a single military fatality.',
    'Begin became the first Israeli leader to be appointed Secretary-General of the United Nations.',
    'Lebanon became known as ‘Israel’s Vietnam’—its first war fought without national consensus. Besieged by daily anti-war protesters outside his office displaying the rising Israeli casualty count, and grief-stricken over the death of his wife Aliza, Begin resigned and withdrew into seclusion.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of conditions in the Israeli occupied territories for sparking the First Palestinian Intifada in 1987.',
    'Twenty years of direct military occupation, land confiscations, Jewish settlement expansion, humiliating checkpoints, and economic dependency generated deep popular despair and resentment.',
    'Palestinian residents enjoyed full democratic voting rights in the Knesset and complete economic prosperity.',
    'The Israeli government had dismantled all military garrisons and handed sovereignty to local mayors.',
    'The United Nations was actively constructing modern luxury housing estates for all refugee camp residents.',
    'By 1987, a new generation of Palestinians had grown up knowing only military occupation. Daily humiliations under military administration, restrictions on travel, arbitrary arrests, and the visible growth of Jewish settlements created an explosive social tinderbox waiting for a spark.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing the outbreak of the First Palestinian Intifada (1987–93), what specific incident on 8 December 1987 ignited the uprising?',
    'An Israeli army tank transporter collided with civilian cars at the Erez checkpoint in the Gaza Strip, killing four Palestinian labourers from the Jabalia refugee camp.',
    'An Israeli airstrike destroyed the Al-Aqsa Mosque in East Jerusalem.',
    'Yasser Arafat landed by helicopter in Gaza to proclaim armed insurrection.',
    'The Israeli Knesset passed legislation expelling all Palestinian residents from the West Bank.',
    'Rumours spread like wildfire that the fatal collision was deliberate retaliation for the stabbing of an Israeli salesman in Gaza. The funeral of the four victims in Jabalia turned into a massive, spontaneous demonstration where youth hurled stones at IDF troops, sparking the Intifada (‘shaking off’).',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the grassroots organization of the First Palestinian Intifada (1987–93).',
    'A clandestine local underground committee called the Unified National Leadership of the Uprising (UNLU) distributed leaflets organizing general strikes, tax resistance, boycotts of Israeli goods, and mass demonstrations.',
    'The Palestinian leadership ordered all civilians to surrender their property and move permanently to Jordan.',
    'The uprising was directed entirely by telephone from the Soviet Kremlin in Moscow.',
    'The uprising was an armed tank conflict fought exclusively between regular Egyptian and Israeli soldiers.',
    'The Intifada was not initiated by the exiled PLO leadership in Tunis, but by local youth and grassroots popular committees. The UNLU issued numbered communiqués directing strikes, civil disobedience, and economic boycotts, displaying remarkable communal cohesion.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of Defense Minister Yitzhak Rabin’s ‘Iron Fist’ policy during the First Palestinian Intifada.',
    'Rabin ordered the IDF to use ‘force, might, and beatings’ to break bones and crush Palestinian stone-throwers, drawing global television condemnation when soldiers were filmed beating youths.',
    'Rabin ordered the IDF to completely withdraw from the West Bank and Gaza Strip within 48 hours.',
    'Rabin distributed automatic rifles to all Palestinian demonstrators to encourage a conventional war.',
    'Rabin invited Yasser Arafat to become Defense Minister of Israel to restore order in the territories.',
    'Trained for conventional armored warfare against regular armies, the IDF was ill-equipped to police stone-throwing children and civil demonstrations. Televised images of heavily armed Israeli soldiers beating unarmed youths damaged Israel’s international image and moral self-perception.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the creation of Hamas in December 1987 during the First Palestinian Intifada.',
    'Founded by Sheikh Ahmed Yassin as an offshoot of the Muslim Brotherhood, Hamas rejected compromise, published an antisemitic charter, and advocated armed Islamist jihad to establish an Islamic state across all of Palestine.',
    'Hamas was a secular political party that advocated peaceful coexistence and a two-state solution alongside Israel.',
    'Hamas was an Israeli intelligence organization created to assist the IDF in policing refugee camps.',
    'Hamas was a Christian charitable foundation that provided humanitarian food parcels to refugee families.',
    'The rise of Hamas (Islamic Resistance Movement) introduced radical religious ideology into the national struggle. Viewing all of historic Palestine as an inalienable Islamic endowment (waqf), Hamas challenged the secular PLO, rejecting diplomacy and pioneering suicide bombings.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the First Palestinian Intifada for King Hussein of Jordan’s policy towards the West Bank in July 1988.',
    'King Hussein severed all legal, administrative, and financial ties with the West Bank, surrendering Jordan’s claims to the territory and leaving the PLO as the undisputed representative of the Palestinians.',
    'King Hussein declared war on Israel and dispatched the Arab Legion to occupy East Jerusalem.',
    'King Hussein formally annexed the West Bank into Jordan and made Amman the joint capital of Palestine.',
    'King Hussein ordered the immediate expulsion of all Palestinian refugees living inside Jordan.',
    'Recognizing that the Intifada represented an unyielding demand for independent Palestinian national identity, King Hussein dissolved the Jordanian parliament’s West Bank seats and stopped paying civil servant salaries. This forced the PLO to assume full political responsibility for the territories.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing the Palestinian issue between 1974 and 1993, which sequence of three stages captures the evolution of the conflict?',
    'Arafat gained UN recognition in 1974; Israel crushed the PLO’s military base in Lebanon in 1982; and the grassroots 1987 Intifada forced Israeli leaders to recognize that direct military rule was unsustainable.',
    'The PLO conquered Beirut in 1974; Jordan invaded Sinai in 1982; and Egypt signed peace in 1987.',
    'Arafat surrendered in 1974; Israel evacuated all territories in 1982; and Hamas won national elections in 1987.',
    'The UN disbanded UNRWA in 1974; Lebanon annexed the West Bank in 1982; and the Cold War ended in 1987.',
    'A high-scoring narrative account connects the PLO’s international diplomatic elevation at the UN to its military expulsion from Lebanon in 1982. Exiled in Tunis, the leadership was superseded by the internal grassroots uprising in 1987, which ultimately compelled Rabin to seek a political solution at Oslo.',
    3, // D
  ),
];

// Lesson 9: KT3.3: Attempts at a solution, 1988–1995
const lesson9 = [
  makeQuestion(
    'Explain the significance of the Palestine National Council (PNC) declaration in Algiers on 15 November 1988.',
    'The PNC declared an independent State of Palestine and voted to accept UN Resolution 181 and Resolution 242, implicitly endorsing a two-state solution alongside Israel for the first time.',
    'The PNC voted to launch an immediate full-scale conventional military invasion of Tel Aviv and Haifa.',
    'The PNC dissolved the PLO and appointed King Hussein of Jordan as the permanent monarch of Palestine.',
    'The PNC voted to reject all United Nations resolutions and join the Warsaw Pact military alliance.',
    'Spurred by the momentum of the Intifada, the PNC adopted a historic historic compromise drafted by poet Mahmoud Darwish. By recognizing partition (Resolution 181) and ‘land for peace’ (Resolution 242), the PLO effectively abandoned its demand for all of historic Palestine in favor of a two-state framework.',
    0, // A
  ),
  makeQuestion(
    'Explain the significance of Arafat’s renunciation of terrorism in a speech at the UN (1988) in Geneva on 13–14 December 1988.',
    'After the US denied him a visa to New York, Arafat addressed the UN in Geneva, explicitly recognizing Israel’s right to exist in peace, accepting Resolutions 242 and 338, and renouncing all forms of terrorism.',
    'Arafat declared that the PLO was merging with Hamas to launch global suicide bombings against Western capitals.',
    'Arafat announced that the Palestinian people agreed to be permanently resettled in Canada and Australia.',
    'Arafat ordered all Palestinian civilians to surrender unconditionally to the Israeli military administration.',
    'When US Secretary of State George Shultz denied Arafat a visa, the General Assembly voted to convene in Geneva. Under intense American pressure, Arafat clarified his position in a press conference, uttering the exact words required by Washington to end the PLO’s diplomatic isolation.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of Arafat’s renunciation of terrorism in his speech at the UN (1988) for US diplomatic policy.',
    'US President Ronald Reagan declared that the PLO had satisfied American conditions and authorized the US ambassador in Tunisia to open direct official diplomatic dialogue with the PLO.',
    'The United States immediately deployed 20,000 Marines to build military bases in the Gaza Strip.',
    'The US Congress voted to impose total economic sanctions on Israel for refusing to negotiate.',
    'The United States broke all diplomatic relations with European allies who recognized the PLO.',
    'Since 1975, US policy (pledged by Kissinger to Israel) had forbidden any dialogue with the PLO until it recognized Israel and renounced terrorism. Arafat’s explicit declaration met those conditions, leading Reagan to open the first official US-PLO diplomatic channel in Tunis.',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the end of the Cold War (1989–1991) for the Arab-Israeli balance of power.',
    'The collapse of the Soviet Union eliminated the primary financial and military patron of Syria and the PLO, while over 400,000 Soviet Jewish immigrants arrived in Israel, leaving the US as the sole superpower.',
    'The collapse of the Soviet Union forced Israel to surrender all occupied territories to the United Nations.',
    'It resulted in the Warsaw Pact deploying 100,000 troops to establish an independent Palestinian state.',
    'It led to the complete dissolution of the United States armed forces and the abandonment of Israel.',
    'The demise of the Soviet bloc transformed Middle Eastern dynamics. Deprived of Soviet arms and political backing, radical Arab regimes lost their superpower patron. Meanwhile, the massive influx of educated Soviet Jews bolstered Israel’s economy and demographic confidence.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of US involvement in the Gulf War (1991) for the diplomatic standing of the PLO.',
    'Yasser Arafat endorsed Iraqi dictator Saddam Hussein’s invasion of Kuwait, causing wealthy Gulf states to cut financial subsidies to the PLO and expel 300,000 Palestinian expatriates, leaving the PLO bankrupt and isolated.',
    'The PLO became the supreme diplomatic arbiter of the Middle East, praised by all Arab monarchies.',
    'The United States rewarded the PLO with $10 billion in economic aid for supporting the coalition.',
    'Kuwait granted full citizenship and permanent voting rights to all Palestinian residents in the Gulf.',
    'Arafat made a disastrous strategic blunder by embracing Saddam Hussein, who claimed he would liberate Palestine. When the US-led coalition crushed Iraq, Kuwait and Saudi Arabia severed funding to the PLO and expelled hundreds of thousands of Palestinian workers, plunging the PLO into financial ruin.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of US involvement in the Gulf War (1991) for Israeli security policy.',
    'When Iraq fired 39 Scud missiles into Tel Aviv and Haifa, US President George H.W. Bush deployed Patriot anti-missile batteries and persuaded Israel not to retaliate to preserve the Arab coalition against Iraq.',
    'Israel launched a full-scale nuclear assault on Baghdad, destroying the Iraqi armed forces within two hours.',
    'The Israeli Air Force conducted unilateral airstrikes across Saudi Arabia to seize oil fields.',
    'The United States forced Israel to surrender its entire air force to the international coalition.',
    'Saddam deliberately targeted Israeli cities with conventional Scuds to bait an Israeli counter-strike, which would have fractured Bush’s fragile coalition with Arab partners (Egypt, Syria, Saudi Arabia). Israel showed unprecedented strategic restraint, earning vital goodwill from Washington.',
    1, // B
  ),
  makeQuestion(
    'Explain the importance of the Madrid Peace Conference held in October 1991 following the Gulf War.',
    'Co-chaired by George H.W. Bush and Mikhail Gorbachev, it brought Israeli, Jordanian, Syrian, Lebanese, and Palestinian delegates together for face-to-face bilateral talks for the first time in history.',
    'It resulted in the immediate signing of a final permanent peace treaty establishing an independent Palestinian state.',
    'It forced Israel to immediately withdraw all military forces behind the 1949 Green Line within 30 days.',
    'The Arab League voted to dissolve the State of Israel and place Jerusalem under United Nations administration.',
    'Capitalizing on American prestige after defeating Iraq, Bush and Secretary of State James Baker pressured reluctant Israeli Prime Minister Yitzhak Shamir and Arab leaders to sit in the same room. Although the public speeches were frosty, Madrid broke the psychological taboo of face-to-face negotiations.',
    2, // C
  ),
  makeQuestion(
    'Explain one consequence of the June 1992 Israeli general election for peace negotiations.',
    'The Labor Party led by Yitzhak Rabin defeated Yitzhak Shamir’s Likud, campaigning on a pledge to freeze new political settlement building and conclude an agreement on Palestinian autonomy within nine months.',
    'The Likud party increased its parliamentary majority and formally annexed the entire West Bank and Gaza Strip.',
    'The Israeli electorate voted to abolish the office of Prime Minister and establish a military dictatorship.',
    'The election resulted in a coalition government led by the religious-nationalist Gush Emunim movement.',
    'Rabin campaigned as a decorated war hero and former Chief of Staff who could be trusted on national security. His victory over the intransigent Shamir signaled a clear public mandate for change, ending deadlock and opening the door to serious peace diplomacy.',
    3, // D
  ),
  makeQuestion(
    'In a narrative account analysing the Oslo Accords (1993), why did Israeli and Palestinian negotiators establish secret backchannel talks in Norway?',
    'Frustrated by the frozen public Madrid talks in Washington, Israeli academics and PLO officials met secretly in Sarpsborg and Oslo under Norwegian diplomat Terje Rød-Larsen to negotiate directly without press leaks.',
    'The United Nations ordered both delegations to conduct talks exclusively in the Arctic Circle.',
    'Norway threatened to cut off petroleum exports to both Israel and Arab states unless they met in secret.',
    'The Israeli Supreme Court ordered the government to conduct all foreign diplomacy in European hotels.',
    'The public bilateral negotiations in Washington were paralyzed by posturing and procedural arguments. Starting in January 1993, Norwegian sociologist Terje Rød-Larsen and Foreign Minister Johan Jørgen Holst provided a private, deniable venue where Israeli envoys and PLO officials could build mutual trust.',
    0, // A
  ),
  makeQuestion(
    'Explain the importance of the Letters of Mutual Recognition exchanged on 9 September 1993 between Yitzhak Rabin and Yasser Arafat.',
    'The PLO formally recognized Israel’s right to exist in peace and renounced terrorism, while Israel officially recognized the PLO as the representative of the Palestinian people and partner in negotiations.',
    'The PLO agreed to disband and merge its administration into the Israeli Ministry of the Interior.',
    'Israel agreed to surrender West Jerusalem to the PLO and dismantle the Israeli Defence Forces.',
    'Both parties agreed to submit all territorial disputes to the direct arbitration of the International Court of Justice.',
    'This diplomatic exchange shattered half a century of mutual denial. For decades, Israel had branded the PLO a terrorist gang, while the PLO charter had called for the destruction of the ‘Zionist entity’. Overcoming this mutual existential veto made the subsequent peace accords possible.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing key events of the Oslo Accords (1993), what historic event took place on the White House lawn on 13 September 1993?',
    'Yitzhak Rabin and Yasser Arafat signed the Declaration of Principles on Interim Self-Government (Oslo I) and sealed it with an iconic handshake hosted by US President Bill Clinton.',
    'Menachem Begin and Anwar Sadat signed the Treaty of Washington in front of Jimmy Carter.',
    'The United Nations General Assembly voted unanimously to dissolve the British Mandate.',
    'King Hussein of Jordan and Yitzhak Rabin signed a mutual defence treaty against Syria.',
    'Before 3,000 dignitaries on the South Lawn, President Clinton guided the reluctant former warrior Yitzhak Rabin and guerrilla leader Yasser Arafat into their historic handshake. Rabin declared: ‘We who have fought against you, the Palestinians, we say to you today in a loud and clear voice: Enough of blood and tears!’',
    2, // C
  ),
  makeQuestion(
    'Explain the importance of the setting up of the Palestinian National Authority (PNA) under the Gaza-Jericho Agreement of May 1994.',
    'Israel withdrew troops from the Gaza Strip and Jericho, allowing Yasser Arafat to return from exile in July 1994 to establish an autonomous Palestinian government and civilian police force.',
    'The PNA took over complete sovereign control of all land between the Jordan River and the Mediterranean Sea.',
    'The PNA was placed under the permanent military command of the United States Marine Corps.',
    'Israel disbanded all municipalities in Tel Aviv and Haifa, transferring civil administration to the PNA.',
    'Signed in Cairo on 4 May 1994, the agreement translated the Oslo principles into practical reality. Yasser Arafat made a triumphant return to Gaza after 27 years in exile, swearing in the Palestinian Authority to manage healthcare, education, taxation, and internal policing.',
    3, // D
  ),
  makeQuestion(
    'Explain the importance of the 1994 Nobel Peace Prize for the Middle East peace process.',
    'The Nobel Peace Prize was awarded jointly to Yitzhak Rabin, Shimon Peres, and Yasser Arafat, celebrating their historic breakthrough while urging both sides to overcome extremist opposition to peace.',
    'It was awarded exclusively to US President Bill Clinton for mediating the handshake on the White House lawn.',
    'It was awarded to Hamas leader Sheikh Ahmed Yassin for agreeing to halt suicide bus bombings in Tel Aviv.',
    'It forced the recipient leaders to surrender their governmental posts and become international peace ambassadors.',
    'The Nobel Committee recognized the immense political risks taken by Rabin, Peres, and Arafat to dismantle five decades of enmity. The award conferred immense international prestige on the Oslo process, although domestic critics on both sides fiercely condemned the compromise.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the Israel-Jordan peace treaty signed on 26 October 1994.',
    'Yitzhak Rabin and King Hussein ended a 46-year official state of war, demarcating shared borders, establishing water-sharing protocols, and recognizing Jordan’s special historic role in Jerusalem’s Muslim holy shrines.',
    'Jordan merged its sovereign territory with Israel to create a single binational federal republic.',
    'Israel agreed to cede the entire Negev Desert to Jordan in exchange for free access to Petra.',
    'The United Nations Security Council expelled Jordan from the Arab League for negotiating with Israel.',
    'Signed in the Arava desert with President Bill Clinton present, the treaty established warm, cooperative relations. Jordan became the second Arab state to make peace with Israel, fostering close security coordination and intelligence sharing along the longest shared border.',
    1, // B
  ),
  makeQuestion(
    'Explain one consequence of the Cave of the Patriarchs massacre carried out by Baruch Goldstein in Hebron in February 1994.',
    'A Jewish extremist opened fire on praying Muslim worshippers, killing 29 civilians, prompting Hamas to initiate its deadly campaign of suicide bus bombings in Israeli cities to derail the peace process.',
    'The Palestinian Authority declared war on Israel and launched an armored invasion of Jerusalem.',
    'The United Nations expelled all Jewish residents from the West Bank and deployed 50,000 peacekeepers.',
    'The Israeli government voted to immediately dismantle all Jewish settlements across the West Bank and Gaza.',
    'Goldstein, an American-born settler and follower of extremist Meir Kahane, fired automatic weapons into Muslims praying during Ramadan in Hebron. In retaliation, Hamas’s armed wing (the Izz ad-Din al-Qassam Brigades) unleashed devastating suicide bombings on civilian buses in Afula, Hadera, and Tel Aviv.',
    2, // C
  ),
  makeQuestion(
    'Explain the territorial divisions established under the Oslo II Agreement signed in Taba in September 1995.',
    'The West Bank was divided into Area A (full Palestinian control, 3%), Area B (Palestinian civil and joint Israeli security control, 24%), and Area C (full Israeli civil and military control, 73%).',
    'The entire West Bank was divided equally into two independent halves by an international concrete wall.',
    'Israel withdrew from 100% of the West Bank and transferred East Jerusalem to Palestinian administration.',
    'The United Nations took over sovereign direct governance of all cities in the West Bank and Gaza Strip.',
    'Oslo II (the Interim Agreement on the West Bank and the Gaza Strip) created a complex, fragmented patchwork of jurisdictional zones. While major Palestinian cities (Area A) gained self-rule, Israel retained absolute control over 73% of the West Bank (Area C), which included all Jewish settlements, bypass roads, and military bases.',
    3, // D
  ),
  makeQuestion(
    'Explain one consequence of the Oslo II (1995) decision to defer permanent status issues.',
    'Explosive disputes over permanent borders, Israeli settlements, the status of Jerusalem, and the right of return for Palestinian refugees were postponed to final-status talks, allowing tensions to fester.',
    'The United Nations General Assembly dissolved the Palestinian Authority and re-established the British Mandate.',
    'All Jewish settlers in the West Bank voluntarily dismantled their houses and returned inside the Green Line.',
    'Israel and the Palestinian Authority agreed to merge their police forces into a single federal security service.',
    'By postponing the hardest core issues to permanent status talks (scheduled to conclude by 1999), the Oslo framers hoped that confidence built during the interim phase would make compromise easier. Instead, continued settlement construction and terrorist attacks destroyed public trust.',
    0, // A
  ),
  makeQuestion(
    'Explain one consequence of the assassination of Prime Minister Yitzhak Rabin in Tel Aviv on 4 November 1995.',
    'Rabin was murdered by right-wing Jewish extremist Yigal Amir at a peace rally, devastating the Israeli peace camp and contributing to Benjamin Netanyahu’s election victory in May 1996.',
    'The Israeli parliament voted to dissolve the state and join the European Economic Community.',
    'The United States dispatched 50,000 troops to establish martial law across all major Israeli cities.',
    'Yasser Arafat immediately broke all peace agreements and launched a conventional war against Israel.',
    'Following a massive peace rally in the Kings of Israel Square, 25-year-old religious law student Yigal Amir shot Rabin at point-blank range, declaring he acted on God’s orders to stop the handover of land. The assassination traumatized Israeli democracy and critically weakened the peace momentum.',
    1, // B
  ),
  makeQuestion(
    'In a narrative account analysing attempts at a solution between 1988 and 1995, why did the peace process stall by 1996?',
    'Hamas suicide bombings eroded Israeli public trust, Jewish settlement expansion continued in Area C, and the assassination of Rabin brought a skeptical Likud government to power under Netanyahu.',
    'The Soviet Union re-emerged and launched nuclear strikes against all diplomatic summits in Europe.',
    'The United Nations Security Council voted to expel both Israel and Palestine from international diplomacy.',
    'The Palestinian Authority declared bankruptcy and surrendered all civil powers to the Kingdom of Jordan.',
    'The peace process was undermined by violent rejectionists on both sides. A devastating wave of Hamas bus bombings in early 1996 killed dozens of Israeli civilians, playing directly into the hands of Likud leader Benjamin Netanyahu, who narrowly defeated Shimon Peres on a campaign promising security over concessions.',
    2, // C
  ),
  makeQuestion(
    'In a narrative account analysing attempts at a solution (1988–1995), which sequence of three stages correctly explains how the peace process unfolded?',
    'Arafat renounced terrorism in 1988; the end of the Cold War and Gulf War led to the 1993 Oslo Accords and PNA creation; and Rabin’s assassination in 1995 halted momentum toward a permanent two-state solution.',
    'Rabin was assassinated in 1988; the Gulf War took place in 1993; and Arafat renounced terrorism in 1995.',
    'The Oslo Accords were signed in 1988; Jordan signed peace in 1991; and the Cold War ended in 1995.',
    'The Madrid Conference occurred in 1988; Camp David was signed in 1993; and Hamas disarmed in 1995.',
    'A high-scoring narrative account connects the PLO’s historic 1988 renunciation of terrorism to the geopolitical shifts of 1989–91 (Cold War collapse and Gulf War). This paved the way for the breakthrough 1993 Oslo Accords and PNA self-rule, before political assassinations and extremist violence derailed the process by 1996.',
    3, // D
  ),
];

module.exports = {
  lesson7,
  lesson8,
  lesson9,
};
