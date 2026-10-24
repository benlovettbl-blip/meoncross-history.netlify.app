const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'cme_new', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'cme_new.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const CME_PEDAGOGY = {
  // LESSON 1: Broken Promises & Imperial Borders (1914–1919)
  lesson_1: [
    {
      match: /Sykes-Picot/i,
      hinge_question:
        'Study the straight, geometric imperial borderlines drawn across the Middle East in the Sykes-Picot map. How did Britain and France partitioning the Ottoman Arab provinces between themselves directly betray the McMahon-Hussein correspondence promises of Arab independence?',
      discussion_ideas: [
        "Betrayal of Pledged Arab Sovereignty: In the 1915–16 McMahon-Hussein letters, Sir Henry McMahon promised Sharif Hussein of Mecca that Britain would support an independent united Arab Kingdom in exchange for launching the Arab Revolt against the Ottomans; the secret Sykes-Picot map carved the region into direct French ('Blue') and British ('Red') colonial control, directly violating that pledge.",
        'Artificial Imperial Borders Fueling Long-Term Instability: By drawing arbitrary geometric lines across ethnic, sectarian, and tribal boundaries to divide oil routes and ports (such as Haifa for Britain and Syria for France), European diplomats disregarded local self-determination, laying the groundwork for enduring regional conflict.',
      ],
    },
    {
      match: /Balfour/i,
      hinge_question:
        "Study Source B. How did Arthur Balfour's pledge to establish a 'national home for the Jewish people' create a fundamental and unresolvable contradiction with the rights of the existing Arab majority?",
      discussion_ideas: [
        "The Conflicting Inherent Dual Mandate: The 67-word letter promised British support for a 'Jewish national home' in Palestine while simultaneously stating that 'nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities'; because Jewish statehood inevitably required political sovereignty and land acquisition, Britain made mutually exclusive promises to both Zionists and the 90% indigenous Arab majority.",
        "Denial of Arab National Political Rights: While the Jewish people were recognized as a distinct national collective entitled to a homeland, the indigenous Palestinian Arab population was relegated to unnamed 'non-Jewish communities' granted only civil and religious protections, denying them the political right to national self-determination.",
      ],
    },
  ],

  // LESSON 2: The End of the British Mandate & Creation of Israel (1945–1949)
  lesson_2: [
    {
      match: /King David/i,
      hinge_question:
        'What does Source A reveal about the vulnerability of British authority in Palestine by July 1946?',
      discussion_ideas: [
        'The shearing off of the hotel’s entire southwest wing—the heavily fortified headquarters of the British Secretariat and Military Command in Palestine—demonstrated that even the nerve centre of British imperial power was utterly vulnerable to Zionist underground insurgent attacks. Orchestrated by Menachem Begin’s Irgun, the bombing killed 91 British, Arab, and Jewish staff, exposing to London and the world that Britain could no longer protect its own senior administrators or maintain civil control in Palestine.',
      ],
    },
    {
      match: /Sergeants/i,
      hinge_question:
        'Study Source B. Why did this photograph decisively convince the British public and government that Britain must leave Palestine?',
      discussion_ideas: [
        'Domestic Public Outrage and Rioting: The graphic visual of two young British national service conscripts (Clifford Martin and Mervyn Paice) hanged and their bodies booby-trapped with landmines by the Irgun caused instant domestic outrage across Britain, triggering anti-Semitic riots in Liverpool and London and convincing ordinary voters that British soldiers were dying pointless deaths policing a foreign conflict.',
        "Political and Economic Exhaustion of the Attlee Government: Bankrupted by the Second World War and facing severe domestic fuel and food rationing in 1947, the British government could no longer justify spending £40 million a year and stationing 100,000 troops in Palestine; the brutal affair broke London's political resolve, forcing Clement Attlee to surrender the Mandate to the United Nations.",
      ],
    },
    {
      match: /Exodus/i,
      hinge_question:
        'How did Source C damage Great Britain’s international standing during the UN debate on Palestine?',
      discussion_ideas: [
        'The spectacle of Royal Navy warships ramming a dilapidated steamer packed with 4,500 destitute Holocaust survivors and forcibly deporting them behind barbed wire back to displaced persons camps in British-occupied Germany was a global public relations catastrophe. Witnessed firsthand by the visiting United Nations Special Committee on Palestine (UNSCOP), the incident turned American and international public opinion decisively against Britain, creating overwhelming diplomatic sympathy for Jewish statehood and ensuring the passage of UN Resolution 181.',
      ],
    },
    {
      match: /Ben-Gurion|Declaring/i,
      hinge_question:
        'Study Source D. Why did David Ben-Gurion choose to declare independence beneath the portrait of Theodor Herzl on the exact afternoon British forces withdrew?',
      discussion_ideas: [
        'Ideological Lineage from Political Zionism: Positioning himself directly under the portrait of Theodor Herzl—who had convened the First Zionist Congress in 1897 and predicted a Jewish state within 50 years—Ben-Gurion framed the declaration as the historic fulfilment of modern political Zionism and sanctuary for the Jewish diaspora after the Holocaust.',
        'Filling the Constitutional Vacuum Before Inevitable Invasion: By declaring statehood at 4:00 PM on Friday 14 May 1948, hours before the British Mandate officially terminated at midnight and Shabbat began, Ben-Gurion established a legal government and armed defense apparatus (the IDF) ready to receive international diplomatic recognition before the armies of five neighbouring Arab states attacked the next morning.',
      ],
    },
  ],

  // LESSON 3: The Aftermath of the 1948–49 War & Palestinian Refugee Crisis
  lesson_3: [
    {
      match: /Refugee|Nakba/i,
      hinge_question:
        'What were the primary causes of the flight of over 700,000 Palestinian Arabs between 1947 and 1949?',
      discussion_ideas: [
        'Military Expulsion and Psychological Warfare: Fear generated by Jewish paramilitary advances, the psychological terror following the massacre at Deir Yassin (April 1948), and systematic expulsions by the Haganah under Plan Dalet (such as the forced marches from Lydda and Ramle) caused mass civilian panic and flight.',
        'Collapse of Leadership and War Proximity: The early flight of wealthy Palestinian political elites left rural villagers leaderless, while Arab military broadcasts encouraged civilians to move temporarily out of active combat zones expecting to return alongside victorious Arab armies after the war.',
      ],
    },
    {
      match: /Ben-Gurion|Independence/i,
      hinge_question:
        'Why was the declaration of Israeli statehood viewed by Jewish people as historic national redemption, but by Arab states as an illegitimate catastrophe?',
      discussion_ideas: [
        'Jewish National Redemption and Sovereignty: For Jewish people worldwide, it represented the end of 2,000 years of diaspora exile, a sovereign sanctuary against persecution following the murder of six million Jews in the Holocaust, and the realisation of ancestral Biblical self-determination.',
        "The Arab Experience of Illegitimate Dispossession: For Arab states and Palestinian Arabs, it was viewed as the violent imposition of Western colonial guilt at their expense, partitioning land without the consent of the majority population and triggering the 'Nakba' (Catastrophe)—the permanent loss of their homeland and exile of 700,000 refugees.",
      ],
    },
    {
      match: /Green Line/i,
      hinge_question:
        'Study Source C. Compare the 1949 Green Line on the map with the 1947 UN Partition Plan: which areas did Israel capture beyond its original UN allocation?',
      discussion_ideas: [
        'While the 1947 UN Partition Plan had allocated 56% of mandatory Palestine to the proposed Jewish state, the 1949 Green Line expanded Israeli control to 78% of the country, capturing West Jerusalem, western Galilee, the Jaffa enclave, and the entire Negev desert corridor to the Gulf of Aqaba. The remaining 22% was absorbed by neighbouring Arab states: the West Bank and East Jerusalem were annexed by Jordan, while the Gaza Strip was placed under Egyptian military administration, extinguishing the proposed independent Palestinian Arab state.',
      ],
    },
    {
      match: /Straits of Tiran|Blockade/i,
      hinge_question:
        'Study Source D. Locate the Straits of Tiran at the southern tip of the Sinai Peninsula on the map. Why was Egypt’s naval blockade here considered an act of war (casus belli) by Israel?',
      discussion_ideas: [
        "The narrow Straits of Tiran formed the only maritime gateway connecting Israel’s southern port of Eilat to the Red Sea, the Indian Ocean, and vital crude oil shipments from Iran. When Egypt fortified Sharm el-Sheikh with coastal artillery and blocked the straits to Israeli-flagged ships, it effectively severed Israel's commercial and energy lifeline to Africa and Asia; under international maritime law, closing an international waterway constituted an illegal blockade and an explicit act of war.",
      ],
    },
  ],

  // LESSON 4: Increased Tension, Nasser, and the Suez Crisis (1955–1963)
  lesson_4: [
    {
      match: /Man at the Tap|Nasser.*1956|Gamal Abdel Nasser/i,
      hinge_question:
        "Study Source A. Why did Nasser's charismatic leadership and anti-colonial stance inspire such widespread devotion across the Arab world?",
      discussion_ideas: [
        'Defiant Rejection of Western Imperial Hegemony: Nasser was the first native Egyptian to rule Egypt in over two millennia; by overthrowing the corrupt British-backed monarchy, ordering the evacuation of British military bases, and buying arms from the Soviet bloc, he demonstrated that Arab nations could stand tall and defy Western colonial domination.',
        "Champion of Pan-Arab Pride and Social Justice: Through powerful radio broadcasts on 'Voice of the Arabs' and agrarian land reforms, Nasser articulated a vision of Pan-Arab nationalism that united the Arab masses across state borders, portraying Egypt as the vanguard of Arab unity, modernization, and pride.",
      ],
    },
    {
      match: /Al-Ahram|Nationalisation/i,
      hinge_question:
        "Why did Nasser's nationalisation of the Suez Canal make him an instant hero of Pan-Arab nationalism across the Middle East?",
      discussion_ideas: [
        'Reclaiming National Sovereign Wealth: The Suez Canal had been excavated by Egyptian forced labour but was owned and exploited by Anglo-French shareholders who drained profits overseas; seizing the company returned Egypt’s greatest economic asset to its people to directly fund the construction of the Aswan High Dam after Western banks cancelled loans.',
        'Decisive Symbolic Victory Over Colonial Powers: In standing up to Britain and France and successfully running the canal using Egyptian pilots, Nasser shattered the myth of Western technological and moral superiority, electrifying the Arab street from Cairo to Baghdad.',
      ],
    },
    {
      match: /Kadesh|Campaign Map/i,
      hinge_question:
        "Study Source C. Study the troop movements on the map. How did the rapid Israeli capture of the Mitla Pass and Sinai allow Britain and France to claim they were merely intervening as 'peacekeepers' to protect the Suez Canal?",
      discussion_ideas: [
        "The map shows Israeli paratroopers dropping deep behind Egyptian lines at the Mitla Pass, just 30 miles east of the canal, while Israeli armoured columns surged across the Sinai. Under the secret Protocol of Sèvres, this planned Israeli advance gave Britain and France the pretext to issue an ultimatum to both sides to withdraw 10 miles from the waterway; when Egypt predictably refused to retreat from its own territory, Britain and France launched 'Operation Musketeer', bombing airfields and landing troops at Port Said under the fraudulent pretence of acting as neutral peacekeepers to separate the combatants.",
      ],
    },
    {
      match: /Port Said|Musketeer/i,
      hinge_question:
        'Study Source D. Why did Britain and France claim they were entering Egypt as neutral peacekeepers to separate Israeli and Egyptian armies when the Sèvres Protocol proved they had pre-planned the war together?',
      discussion_ideas: [
        'Britain and France needed a legal and diplomatic pretext to seize the nationalized canal and overthrow Nasser without appearing to commit an unprovoked imperial war of aggression. The top-secret Protocol of Sèvres was a conspiracy: Israel agreed to invade the Sinai, allowing London and Paris to pose as neutral international arbiters intervening solely to protect global shipping through the canal. When the deception was exposed, it caused furious diplomatic condemnation from the United Nations and the United States.',
      ],
    },
    {
      match: /Anthony Eden|Eden Defending/i,
      hinge_question:
        'Study Source E. How did Prime Minister Eden attempt to justify military intervention to the British Parliament, and why did this justification collapse under international pressure?',
      discussion_ideas: [
        "Eden's 'Munich Analogy' and Anti-Appeasement Rhetoric: Haunted by his 1930s stand against Hitler and Mussolini, Eden insisted that Nasser was an expansionist dictator bent on dominating the Middle East; he argued before Parliament that seizing the canal was necessary to stop a 'new Hitler' before he controlled global oil supplies.",
        'Diplomatic and Financial Collapse Under US Pressure: The justification collapsed because US President Dwight Eisenhower refused to endorse Anglo-French colonialism during the Cold War; threatening to collapse the British pound by blocking IMF emergency loans, Eisenhower forced an immediate, humiliating British ceasefire, ruining Eden’s health, career, and reputation.',
      ],
    },
  ],

  // LESSON 6: Water Wars, Border Raids & Golan Heights (1964–1967)
  lesson_6: [
    {
      match: /Arab Heads of State|First Arab League Summit|Cairo.*1964/i,
      hinge_question:
        'Study Source A. How did the creation of the Jordan River headwaters diversion project and the establishment of the Palestine Liberation Organization (PLO) at this 1964 Cairo summit transform Arab strategy against Israel?',
      discussion_ideas: [
        "Water Wars and Strategic Chokepoints: Arab states resolved to divert the Hasbani and Banias tributaries to block Israel's National Water Carrier from irrigating the Negev desert; this direct threat to Israel's national water security prompted Israeli air strikes against Syrian earthmoving equipment, sparking cross-border escalation.",
        'Institutionalization of Palestinian Identity: Convened by Nasser, the summit officially sponsored the creation of the PLO under Ahmad al-Shuqayri, creating a formal pan-Arab vehicle for Palestinian liberation while initially keeping guerrilla activities under strict Arab League oversight.',
      ],
    },
    {
      match: /Syrian Armistice Line|Golan Heights Overlooking/i,
      hinge_question:
        'Study Source B. Using the topographical map, explain why Syrian artillery batteries dug into the Golan Heights held such an overwhelming tactical advantage over Israeli settlements in the Hula Valley below.',
      discussion_ideas: [
        'The steep 3,000-foot basalt escarpment of the Golan Heights loomed directly over low-lying Israeli farming settlements in the Hula and Upper Jordan Valleys. Syrian dug-in artillery and sniper positions could shell Israeli tractors, farmsteads, and fishing boats with impunity, forcing kibbutz children to live in underground concrete bomb shelters and creating immense public pressure on the Israeli government to neutralize the heights.',
      ],
    },
    {
      match: /7 April 1967|Air Battle/i,
      hinge_question:
        'Study Source C. Why was the downing of six Syrian MiG-21 fighters by the Israeli Air Force on 7 April 1967 the decisive spark that forced Egypt into the crisis leading to the Six-Day War?',
      discussion_ideas: [
        "Humiliation of Syrian Air Defenses: Israeli Mirage jets not only shot down six Syrian fighters over the Golan but buzzed Damascus in a brazen show of aerial dominance, deeply humiliating the Syrian Ba'athist government and triggering emergency mutual defense pact calls to Cairo.",
        "Political Trap for Nasser's Pan-Arab Leadership: Criticized by Arab rivals for 'hiding behind UN peacekeepers' in the Sinai while Syria was bombed, Nasser felt compelled to mobilize his army, demand the expulsion of UNEF from the Sinai, and blockade the Straits of Tiran to protect his reputation as leader of the Arab world.",
      ],
    },
  ],

  // LESSON 7: The Six-Day War Decision (May–June 1967)
  lesson_7: [
    {
      match: /Destroyed Egyptian Jet Aircraft|Bir Gifgafa Airfield/i,
      hinge_question:
        'Study Source A. Why was Israel’s pre-emptive air strike (Operation Focus) against Egyptian airfields decisive in winning the Six-Day War in its first three hours?',
      discussion_ideas: [
        'By flying low beneath Egyptian radar networks across the Mediterranean at dawn, the Israeli Air Force caught the Egyptian military unprepared, bombing runways with specialized anti-crater bombs and destroying over 300 aircraft on the tarmac. With total control of the skies secured before noon, Israeli ground forces could advance across the Sinai, West Bank, and Golan Heights under devastating close air support while Arab armored divisions had zero air cover.',
      ],
    },
    {
      match: /Western Wall|David Rubinger/i,
      hinge_question:
        'Study Source B. What does this iconic photograph reveal about the emotional and religious significance of capturing the Old City of Jerusalem for Israeli soldiers?',
      discussion_ideas: [
        "For 19 years following the 1948 war, the Old City and the Western Wall—Judaism's holiest prayer site—had been under Jordanian control, with Jewish worshipers strictly banned. Capturing the Western Wall was experienced by soldiers and citizens alike as an emotional reunion with 2,000 years of Jewish history and exile, transforming a defensive war of survival into a transcendent spiritual and national redemption.",
      ],
    },
  ],

  // LESSON 8: Conquered Territories, Khartoum, UN 242 (1967)
  lesson_8: [
    {
      match: /Conquered Occupied Territories|Occupied Territories Following the Six-Day War/i,
      hinge_question:
        'Study Source A. How did capturing the Sinai, Gaza, West Bank, and Golan Heights fundamentally transform Israel from a small, vulnerable state into an occupying power?',
      discussion_ideas: [
        'Strategic Depth and Natural Barriers: Conquering territories three times its original size gave Israel defensible natural frontiers: the Suez Canal in the west, the Jordan River in the east, and the Golan escarpment in the north, shielding Israeli population centers from artillery range.',
        "Demographic Dilemma and Ideological Settlement: The conquest brought over one million Palestinian Arabs under direct military rule, sparking a fierce internal dilemma between returning land for peace or retaining biblical 'Judea and Samaria' for permanent Jewish settlement.",
      ],
    },
    {
      match: /Khartoum Arab League Summit|Khartoum Resolution/i,
      hinge_question:
        "Study Source B. Why did the 'Three No’s' of the Khartoum Resolution ('No peace, no recognition, no negotiation') entrench a diplomatic stalemate in the Middle East?",
      discussion_ideas: [
        "Humiliated by their catastrophic military defeat in June 1967, Arab leaders assembled in Khartoum refused to surrender or negotiate from a position of weakness. By issuing the categorical 'Three No's'—no peace with Israel, no recognition of Israel, no negotiations with it—the Arab League foreclosed any immediate 'land for peace' compromise, hardening Israeli resolve to retain the conquered territories permanently.",
      ],
    },
    {
      match: /Resolution 242|Article 1\(i\)/i,
      hinge_question:
        "Study Source C. How did the linguistic discrepancy between the English text ('withdrawal from occupied territories') and the French text ('withdrawal from the occupied territories') create an enduring diplomatic controversy?",
      discussion_ideas: [
        "The Israeli Interpretation (English Text): The omission of the definite article ('the') allowed Israel to argue that it was only required to withdraw from some territories to secure defensible borders, legitimizing retaining strategic areas like East Jerusalem and the Golan Heights.",
        "The Arab Interpretation (French Text): The French wording mandated withdrawal from all the occupied territories, emphasizing the resolution’s preamble stating the 'inadmissibility of the acquisition of territory by war', demanding full return to the pre-June 1967 lines.",
      ],
    },
  ],

  // LESSON 9: Rise of Palestinian Resistance: Dawson's Field & Munich (1968–1972)
  lesson_9: [
    {
      match: /Dawson's Field|PFLP/i,
      hinge_question:
        "Study Source A. Why did the PFLP's spectacular destruction of hijacked airliners at Dawson’s Field provoke King Hussein into launching the Black September civil war?",
      discussion_ideas: [
        "By flying three hijacked international passenger jets onto a desert airstrip in Jordan, blowing them up before world television cameras, and openly defying Jordanian security forces, George Habash's Marxist PFLP demonstrated that armed Palestinian factions were operating as an uncontrolled 'state within a state'. Recognizing that his kingdom's sovereignty and Western support were on the verge of total collapse, King Hussein ordered the Royal Jordanian Army to crush and expel the PLO militias in a bloody civil war.",
      ],
    },
    {
      match: /Munich Olympic|Black September Gunman|Balcony at Munich/i,
      hinge_question:
        'Study Source B. Why did radical Palestinian factions turn to dramatic international hostage-taking like the Munich Olympics massacre, and how did it affect global perceptions of their cause?',
      discussion_ideas: [
        "Asymmetric Publicity on a Global Stage: After conventional Arab armies failed in 1967, militant groups realized that capturing the Olympic Games—broadcast live to 900 million viewers—would force the word 'Palestine' into global political consciousness, ending decades of international neglect.",
        "Severe Moral Condemnation and Israeli Retaliation: The murder of eleven Israeli athletes and coaches horrified global public opinion, branding the Palestinian national movement as terrorists and prompting Israeli Prime Minister Golda Meir to launch 'Operation Wrath of God'—a global covert assassination campaign against Black September organizers.",
      ],
    },
  ],

  // LESSON 10: War of Attrition & Yom Kippur War (1969–1973)
  lesson_10: [
    {
      match: /Egyptian Infantry.*Crossing|Crossing the Suez/i,
      hinge_question:
        'Study Source A. Why was the successful breach of the Bar-Lev Line in Operation Badr an immense military and psychological victory for Egypt?',
      discussion_ideas: [
        'Egyptian assault troops crossed the canal on assault boats, blasted 81 gaps through the 60-foot sand ramparts using high-pressure water cannons, and established fortified bridgeheads under an impenetrable surface-to-air missile screen. Catching Israel completely by surprise on Yom Kippur, Operation Badr destroyed the myth of Israeli invincibility, avenged the humiliation of 1967, and restored Egyptian national self-respect.',
      ],
    },
    {
      match: /Israeli Armored Vehicles.*Crossing|West Bank.*October 1973/i,
      hinge_question:
        'Study Source B. How did the Israeli counter-crossing of the Suez Canal under Ariel Sharon reverse the course of the Yom Kippur War and force an urgent ceasefire?',
      discussion_ideas: [
        "Exploiting a gap between Egypt's Second and Third Armies at the Great Bitter Lake, Sharon's armored division crossed to the African (west) bank of the Suez Canal on pontoon bridges. Rushing behind Egyptian frontline lines, Israeli armor destroyed Egyptian SAM missile sites, enabling the Israeli Air Force to regain air supremacy and completely encircle the 20,000-man Egyptian Third Army, threatening Cairo and compelling Egypt and the USSR to accept a UN ceasefire.",
      ],
    },
  ],

  // LESSON 11: Diplomatic Negotiations: Shuttle Diplomacy to Camp David (1974–1979)
  lesson_11: [
    {
      match: /Anwar Sadat Addressing the Israeli Knesset|Knesset in Jerusalem/i,
      hinge_question:
        'Study Source A. Why was Anwar Sadat’s historic visit to Jerusalem and speech to the Knesset considered an unprecedented diplomatic breakthrough?',
      discussion_ideas: [
        "Dismantling the Psychological Wall of Enmity: By landing at Ben-Gurion Airport and addressing Israeli parliamentarians face-to-face, Sadat shattered 30 years of Arab refusal to recognize Israel's existence, directly appealing to the Israeli public that Egypt was genuinely ready for peace in exchange for occupied land.",
        'Bypassing Multilateral Stalemate: Bypassing stalled international conferences and Soviet diplomacy, Sadat initiated direct bilateral negotiations with Israeli Prime Minister Menachem Begin, paving the way for US-sponsored mediation at Camp David.',
      ],
    },
    {
      match: /Begin, Jimmy Carter, and Anwar Sadat at Camp David|Camp David Summit/i,
      hinge_question:
        "Study Source B. Why was US President Jimmy Carter's personal mediation at Camp David indispensable in brokering a compromise between Menachem Begin and Anwar Sadat?",
      discussion_ideas: [
        'Over 13 grueling, isolated days at Camp David, when talks completely broke down and Sadat threatened to pack his bags, Carter personally intervened as an energetic, tireless mediator. Shuttle-negotiating between the private cabins of Begin and Sadat, Carter drafted 23 versions of the accords, used US financial aid and security guarantees to bridge mutual distrust, and persuaded Begin to evacuate Sinai settlements in exchange for Sadat’s historic peace treaty.',
      ],
    },
    {
      match: /Sinai Peninsula and Camp David Demilitarization Zones|Demilitarization Zones/i,
      hinge_question:
        'Study Source C. How did the division of the Sinai Peninsula into demilitarized security zones (Zones A, B, C, and D) guarantee security for both Egypt and Israel?',
      discussion_ideas: [
        'The treaty created four distinct security zones monitored by the Multinational Force and Observers (MFO): Egypt was permitted only a limited division in Zone A near the canal, light police forces in Zone C along the international border, and strict limits on Israeli forces in Zone D. This ensured that Egypt restored full territorial sovereignty over the entire Sinai, while Israel gained a vast, permanently demilitarized buffer zone preventing surprise tank invasions.',
      ],
    },
    {
      match: /Triple Handshake|Egypt-Israel Peace Treaty Signing/i,
      hinge_question:
        "Study Source D. How did the signing of the peace treaty transform regional alliances, and why did it lead directly to Egypt's suspension from the Arab League and the assassination of Sadat?",
      discussion_ideas: [
        'Realignment with the West and Strategic Isolation: The treaty removed the Arab world’s military heavyweight from the battlefield forever, ending the prospect of a two-front war for Israel; furious Arab states branded Sadat a traitor for abandoning the Palestinians, expelling Egypt from the Arab League and moving its headquarters to Tunis.',
        'Domestic Radicalization and Sadat’s Martyrdom: Radical Islamist groups within Egypt viewed formal peace with Israel and normalization as an unpardonable betrayal of Islam; in October 1981, militant soldiers affiliated with Egyptian Islamic Jihad assassinated Sadat at a military parade.',
      ],
    },
  ],

  // LESSON 12: The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada (1974–1993)
  lesson_12: [
    {
      match: /Arafat Addressing the United Nations|General Assembly in New York/i,
      hinge_question:
        "In his famous 1974 UN speech, Yasser Arafat declared: 'I have come bearing an olive branch and a freedom-fighter's gun. Do not let the olive branch fall from my hand.' How does this speech mark the transition of the PLO from a guerrilla group to an internationally recognized government-in-exile?",
      discussion_ideas: [
        "Diplomatic Legitimacy and UN Recognition: Arafat became the first non-state representative to address the UN General Assembly, securing formal observer status for the PLO as the 'sole legitimate representative of the Palestinian people' and establishing diplomatic recognition across the world.",
        "Balancing Armed Resistance with Diplomacy: The olive branch symbolized the PLO's newfound readiness to accept a two-state diplomatic settlement, while the gun reassured militant fedayeen that armed struggle would remain an active lever of national liberation until Palestinian self-determination was achieved.",
      ],
    },
    {
      match: /1982 Lebanon Invasion|Peace for Galilee/i,
      hinge_question:
        "Study Source B. How does the military advance shown on the map prove that Defense Minister Ariel Sharon pushed the Lebanon invasion far beyond the Cabinet's official 40-kilometre security zone?",
      discussion_ideas: [
        'The map clearly shows Israeli armored spearheads driving past Sidon and Damour all the way to Beirut—over 100 kilometres north of the Israeli border. While Prime Minister Begin and the Israeli Cabinet had authorized only a limited 40-kilometre defensive zone to protect Galilee settlements from Katyusha rockets, Sharon executed a premeditated plan to encircle west Beirut, crush the PLO leadership, and expel Syrian forces from Lebanon.',
      ],
    },
    {
      match: /Palestinian Youths at Barricades|First Intifada.*1987|Youths Confronting/i,
      hinge_question:
        'Study Source C. How did the asymmetric confrontation between stone-throwing youths and heavily armed Israeli troops transform global public opinion during the First Intifada?',
      discussion_ideas: [
        'Inverting the David vs Goliath Dynamic: For 40 years, Israel had been portrayed as a vulnerable David surrounded by hostile Arab Goliaths; global television footage of unarmed teenagers and children facing Israeli tanks and firing tear gas flipped this perception, casting Palestinians as the brave, oppressed underdog fighting military occupation.',
        "Exposing the Unsustainability of the Status Quo: Defense Minister Yitzhak Rabin’s policy of 'breaking bones' and mass curfews failed to suppress the spontaneous, grassroots civil disobedience, demonstrating to Israeli society and international allies that permanent military occupation was morally corrosive and unsustainable.",
      ],
    },
  ],

  // LESSON 13: Attempts at a Solution: From Oslo Accords to Oslo II (1988–1995)
  lesson_13: [
    {
      match: /Madrid Peace Conference/i,
      hinge_question:
        'Study Source A. Why was the 1991 Madrid Peace Conference considered a historic turning point in Middle Eastern diplomacy, despite yielding no immediate peace treaty?',
      discussion_ideas: [
        'First Direct Bilateral Face-to-Face Negotiations: Co-sponsored by the United States and the Soviet Union following the Gulf War, Madrid brought Israel and all its immediate Arab neighbors (Syria, Lebanon, Egypt, and a joint Jordanian-Palestinian delegation) into direct face-to-face negotiations for the very first time in history.',
        'Breakthrough for Palestinian Representation: Although Israel refused to negotiate directly with official PLO members, local Palestinian figures from the West Bank and Gaza (like Hanan Ashrawi and Haidar Abdel-Shafi) participated, legitimizing the Palestinian national issue and establishing the direct personal relationships that enabled secret backchannel talks in Oslo.',
      ],
    },
    {
      match: /Oslo I Handshake|White House Lawn/i,
      hinge_question:
        'Study Source B. What was the historic significance of the handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn, and what fundamental compromises did it represent?',
      discussion_ideas: [
        "Mutual Recognition Between Mortal Enemies: The handshake sealed the formal Letters of Mutual Recognition: the PLO renounced terrorism and recognized Israel's right to exist in peace and security, while Israel recognized the PLO as the official representative of the Palestinian people and partner in negotiations.",
        'Establishment of Palestinian Self-Rule (Gaza-Jericho First): The agreement established the Palestinian Authority to govern civilian affairs in Gaza and Jericho, setting a five-year timetable to negotiate permanent status issues (borders, refugees, Jerusalem, and Jewish settlements).',
      ],
    },
    {
      match: /Oslo II|Areas A, B, and C|Fragmentation of the West Bank/i,
      hinge_question:
        'Study Source C. Why did the fragmentation of the West Bank into Areas A, B, and C under Oslo II lead critics to argue that the agreement created disconnected enclaves rather than a viable state?',
      discussion_ideas: [
        'The map divided the West Bank into a patchwork of disconnected zones: Area A (Palestinian civil and security control over 3% of land, covering major cities), Area B (Palestinian civil and joint Israeli security control over 24% of land and rural villages), and Area C (complete Israeli military and civil control over 73% of land, containing all Jewish settlements, bypass roads, and borders). This fragmented the territory into dozens of isolated Palestinian enclaves surrounded by Israeli military checkpoints, preventing territorial contiguity, economic self-sufficiency, or genuine sovereignty.',
      ],
    },
    {
      match: /Tel Aviv Peace Rally|Assassination of Yitzhak Rabin/i,
      hinge_question:
        'Study Source D. What does this massive peace rally reveal about the deep polarization within Israeli society, and why did Rabin’s assassination fatally wound the Oslo peace process?',
      discussion_ideas: [
        "Mass Mobilization of the Israeli Peace Camp: Over 100,000 Israelis gathered under the banner 'Yes to Peace, No to Violence', passionately singing the 'Song for Peace' alongside Rabin and Peres, demonstrating powerful popular support for territorial compromise.",
        'Lethal Nationalist Backlash Halting Peace Momentum: Radical religious nationalists and right-wing opponents considered relinquishing biblical Judea and Samaria as treason; moments after leaving the podium, Rabin was murdered by Jewish extremist Yigal Amir, removing the only Israeli leader with the security credentials and political authority to deliver a two-state peace.',
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Loading units/cme_new/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.unitData || mod.default || mod;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = CME_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    // Helper to find matching rule
    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      } else {
        console.warn(`  ⚠️ [l.sources ${idx}] No match for: "${s.title}" (id=${s.id})`);
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across CME: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/cme_new/data.js
  const jsContent =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/cme_new/data.js');

  // 2. Write to public/data/cme_new.json
  if (fs.existsSync(pubJsonPath)) {
    const pubData = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    pubData.data = unitData;
    fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully updated public/data/cme_new.json');
  }

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.cme_new) {
      db.cme_new.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated cme_new in public/database.json');
    }
  }

  console.log('\n🏁 Completed Conflict in the Middle East enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
