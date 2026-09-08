const fs = require('fs');
const path = require('path');

async function applySync() {
  console.log('Reading units/cme_new/data.js...');
  const dataPath = path.resolve(__dirname, '../units/cme_new/data.js');
  const publicDataPath = path.resolve(__dirname, '../public/units/cme_new/data.js');

  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.unitData;

  // ==========================================================
  // LESSON 1: Foundational Geography & Geopolitics
  // ==========================================================
  const l1 = unitData.lessons[0];
  l1.primary_source = {
    title: 'Source A: The Sykes-Picot Agreement Partition Map (8 May 1916)',
    src: '/images/sykes_picot_original_map.jpg',
    caption:
      'Primary map of the secret Sykes-Picot Agreement signed on 8 May 1916 by Sir Mark Sykes and François Georges-Picot, dividing the Middle East into British and French spheres of influence.',
    question:
      'Source Detective: Study Source A. Why did the secret Anglo-French partition of the Middle East in the Sykes-Picot Agreement lay the groundwork for decades of border conflicts and Arab betrayal?',
    model_answer:
      'Source A shows how Britain and France carved up the Ottoman Empire using arbitrary straight lines that ignored historic ethnic, tribal, and religious communities. By placing regions like Palestine under international administration and creating artificial borders, the agreement directly contradicted British wartime pledges of independence made to the Arabs in the McMahon-Hussein Correspondence, creating deep-rooted resentment and instability across the region.',
  };

  // Block 1 source: Balfour Declaration
  if (l1.narrative_blocks && l1.narrative_blocks[1] && l1.narrative_blocks[1].source) {
    l1.narrative_blocks[1].source.title =
      'Source B: The Original Balfour Declaration Letter (2 November 1917)';
    l1.narrative_blocks[1].source.caption =
      'The original letter from Foreign Secretary Arthur Balfour to Lord Rothschild expressing British support for a national home for the Jewish people in Palestine.';
    l1.narrative_blocks[1].source.question =
      'Source Detective: Study Source B. How did Arthur Balfour\'s pledge to establish a "national home for the Jewish people" create a fundamental and unresolvable contradiction with the rights of the existing Arab majority?';
    l1.narrative_blocks[1].source.model_answer =
      'Source B contains the fatal contradiction known as Britain’s "dual obligation": it pledged British support for a Jewish national home while simultaneously promising that "nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities." Because the Zionist movement sought statehood and sovereignty over the entire territory, while Palestinian Arabs comprised over 90% of the population and rejected colonization, fulfilling both promises simultaneously proved mathematically and politically impossible.';
  }

  // ==========================================================
  // LESSON 2: End of Mandate & Creation of Israel
  // ==========================================================
  const l2 = unitData.lessons[1];
  l2.primary_source = {
    title: 'Source A: The Ruins of the King David Hotel, Jerusalem (July 1946)',
    src: '/assets/cme_new_king_david_ruins.png',
    caption:
      'Primary Photograph: The south-west wing of the King David Hotel collapsed after the Irgun bomb detonation on 22 July 1946, killing 91 British, Arab, and Jewish staff.',
    question:
      'Source Detective: Study Source A. Why did the Irgun target the British administrative and military headquarters at the King David Hotel, and how did this attack convince the British government that maintaining the Mandate was untenable?',
    model_answer:
      'The Irgun targeted the King David Hotel because its south-western wing housed the central Secretariat of the British Mandate government and the headquarters of British armed forces in Palestine. By destroying the nerve centre of colonial administration and killing 91 officials in broad daylight, the Irgun demonstrated that 100,000 British troops could not guarantee security. The massive loss of life shocked the British public and convinced Prime Minister Attlee that policing Palestine was exacting an intolerable financial and human price.',
  };

  // Block 0: Remove stray source, convert to illustrative image where appropriate
  if (l2.narrative_blocks[0] && l2.narrative_blocks[0].source) {
    delete l2.narrative_blocks[0].source;
  }

  // Block 4: Sergeants Affair -> Source B
  if (l2.narrative_blocks[4] && l2.narrative_blocks[4].source) {
    l2.narrative_blocks[4].source.title = 'Source B: The Sergeants Affair (July 1947)';
    l2.narrative_blocks[4].source.question =
      'Source Detective: Study Source B. Why did the execution and public display of the two British sergeants create such overwhelming political pressure on Clement Attlee’s government to surrender the Mandate?';
    l2.narrative_blocks[4].source.model_answer =
      'Source B was decisive because the graphic visual evidence of British conscripts being abducted, executed, and booby-trapped by Zionist insurgents destroyed domestic support for the Mandate. After the immense sacrifices of the Second World War, the British public and press refused to endure young soldiers dying in a brutal colonial quagmire. The resulting anti-Jewish riots across British cities and fierce political backlash in Parliament convinced Prime Minister Attlee and Foreign Secretary Bevin that Palestine was completely ungovernable, precipitating the decision to surrender the Mandate to the United Nations.';
  }

  // Block 5: SS Exodus -> Source C
  if (l2.narrative_blocks[5] && l2.narrative_blocks[5].source) {
    l2.narrative_blocks[5].source.title = 'Source C: The SS Exodus Arriving in Haifa (July 1947)';
    l2.narrative_blocks[5].source.question =
      'Source Detective: Study Source C. How did Britain’s decision to forcibly deport Holocaust survivors back to displaced persons camps in Europe destroy British diplomatic standing in the United States?';
    l2.narrative_blocks[5].source.model_answer =
      'The interception and forced return of 4,500 Holocaust survivors aboard the SS Exodus was a public relations catastrophe for Britain. American newspapers and newsreels broadcast images of armed Royal Navy soldiers forcing destitute concentration camp survivors into cage-like transport ships and sending them back to detention camps in Germany. This caused immense moral outrage in the US, turning American public opinion decisively against British policy and pressuring President Truman to demand open Jewish immigration.';
  }

  // Block 6: Add illustrative image of UN partition map
  if (l2.narrative_blocks[6]) {
    l2.narrative_blocks[6].image =
      '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg';
    l2.narrative_blocks[6].caption =
      'Map of the proposed 1947 UN Partition Plan (Resolution 181) dividing Palestine into Arab and Jewish states.';
  }

  // Block 9: Ben-Gurion Declaration -> Source D
  if (l2.narrative_blocks[9] && l2.narrative_blocks[9].source) {
    l2.narrative_blocks[9].source.title =
      'Source D: David Ben-Gurion Declaring the State of Israel (14 May 1948)';
    l2.narrative_blocks[9].source.question =
      'Source Detective: Study Source D. Why did Ben-Gurion choose to declare independence beneath the portrait of Theodor Herzl on the exact afternoon British forces withdrew?';
    l2.narrative_blocks[9].source.model_answer =
      "Ben-Gurion positioned himself beneath the portrait of Theodor Herzl, the father of political Zionism, to establish direct historical legitimacy between Herzl's 1897 vision of a sovereign Jewish homeland and its reality in 1948. Declaring independence on the exact afternoon the British Mandate expired preempted any UN hesitation or British extension, establishing sovereign Israeli statehood hours before the anticipated invasion by five Arab armies.";
  }

  // ==========================================================
  // LESSON 3: Aftermath of 1948 War & Refugee Crisis
  // ==========================================================
  const l3 = unitData.lessons[2];
  l3.primary_source = {
    title: 'Source A: Israeli Troops in Heavy Fighting During the 1948 War',
    src: '/images/cme_israeli_troops_1948.jpg',
    caption: 'Primary Photograph: Israeli soldiers in combat during the 1948 Arab-Israeli War.',
    question:
      'Source Detective: Study Source A. How did the newly formed IDF successfully counter five invading Arab armies despite being heavily outnumbered in early 1948?',
    model_answer:
      'Source A reflects the mobilization and discipline of the newly formed IDF. Despite initial disadvantages in heavy weaponry, Israel benefited from unified political command under Ben-Gurion, superior wartime motivation defending their immediate survival, and the decisive four-week UN truce in June 1948, which allowed Israel to import modern rifles, machine guns, and fighter aircraft from Czechoslovakia, turning the tactical tide against divided Arab forces.',
  };

  if (l3.narrative_blocks[0] && l3.narrative_blocks[0].source) {
    delete l3.narrative_blocks[0].source;
    l3.narrative_blocks[0].image = '/images/cme_israeli_troops_1948.jpg';
    l3.narrative_blocks[0].caption = 'Israeli soldiers in combat during the 1948 Arab-Israeli War.';
  }

  // Block 2: Nakba Refugees -> Source B
  if (l3.narrative_blocks[2] && l3.narrative_blocks[2].source) {
    l3.narrative_blocks[2].source.title =
      'Source B: Palestinian Refugees Leaving Their Villages (1948 Nakba)';
    l3.narrative_blocks[2].source.question =
      'Source Detective: Study Source B. What does this photograph reveal about the suddenness of the Palestinian flight and the immense humanitarian crisis created across the region?';
    l3.narrative_blocks[2].source.model_answer =
      'Source B highlights the abrupt and desperate nature of the flight, showing families carrying meager possessions on their backs and donkeys along dusty roads. Over 700,000 Palestinians fled or were forcibly expelled from their ancestral homes, leaving behind possessions, land, and communities. The photograph reveals the human reality of the Nakba, which transformed the majority of the indigenous Palestinian population into stateless refugees living in makeshift tent camps across the region.';
  }

  // Block 4: 1949 Green Line -> Source C
  if (l3.narrative_blocks[4] && l3.narrative_blocks[4].source) {
    l3.narrative_blocks[4].source.title = 'Source C: The 1949 Armistice Green Line';
    l3.narrative_blocks[4].source.question =
      'Source Detective: Study Source C. Compare the 1949 Green Line with the 1947 UN Partition Plan: which areas did Israel capture beyond its original UN allocation?';
    l3.narrative_blocks[4].source.model_answer =
      'Under the 1947 UN Partition Plan, Israel was allocated 55% of Palestine. Source C shows that by the end of the 1948–49 war, Israel expanded its territorial control to 79% of mandatory Palestine, capturing western Galilee, the coastal plain, and a corridor connecting Tel Aviv to West Jerusalem. The remaining Palestinian territories—the West Bank and East Jerusalem—came under Jordanian administration, while the Gaza Strip fell under Egyptian military control.';
  }

  // Block 8: Straits of Tiran -> Source D (was duplicate Source C)
  if (l3.narrative_blocks[8] && l3.narrative_blocks[8].source) {
    l3.narrative_blocks[8].source.title =
      'Source D: Maritime Chokepoints & The Straits of Tiran Blockade';
    l3.narrative_blocks[8].source.question =
      'Source Detective: Study Source D. Locate the Straits of Tiran at the southern tip of the Sinai Peninsula. Why was Egypt’s naval blockade here considered an act of war (casus belli) by Israel?';
    l3.narrative_blocks[8].source.model_answer =
      "Source D demonstrates that the Straits of Tiran represent Israel's sole maritime access to the Red Sea from the port of Eilat. By closing the straits at Sharm el-Sheikh, Egypt cut off Israel's vital oil imports from Iran and trade routes with Asia and Africa. Because Israel possessed no alternative southern maritime outlet, any closure of the straits was regarded in Israeli military doctrine as a direct act of war (casus belli), leading directly to conflict in 1956 and 1967.";
  }

  // ==========================================================
  // LESSON 4: Nasser and the Suez Crisis
  // ==========================================================
  const l4 = unitData.lessons[3];
  l4.primary_source = {
    title: 'Source A: President Gamal Abdel Nasser (1956)',
    src: '/images/cme_nasser_portrait.jpg',
    caption:
      'Primary Photograph: President Gamal Abdel Nasser of Egypt, whose nationalisation of the Suez Canal in July 1956 electrified the Arab world.',
    question:
      "Source Detective: Study Source A. Why did Nasser's charismatic leadership and anti-colonial stance inspire such widespread devotion across the Arab world?",
    model_answer:
      'Nasser came to personify Pan-Arab nationalism and defiance against Western colonial domination. By overthrowing the corrupt pro-British monarchy in 1952, purchasing arms from Czechoslovakia in 1955, and boldly nationalising the British-and-French-owned Suez Canal, Nasser proved that an Arab leader could stand up to European imperial powers and defend Arab sovereignty, making him the unchallenged hero of the Arab world.',
  };

  if (l4.narrative_blocks[0] && l4.narrative_blocks[0].source) {
    delete l4.narrative_blocks[0].source;
    l4.narrative_blocks[0].image = '/images/cme_nasser_portrait.jpg';
    l4.narrative_blocks[0].caption = 'President Gamal Abdel Nasser of Egypt.';
  }

  // Block 6: Al-Ahram -> Source B
  if (l4.narrative_blocks[6] && l4.narrative_blocks[6].source) {
    l4.narrative_blocks[6].source.title =
      'Source B: Al-Ahram Front Page — Suez Canal Nationalised (July 1956)';
    l4.narrative_blocks[6].source.question =
      'Source Detective: Study Source B. How did Nasser use the nationalisation of the canal to assert Egyptian sovereignty and fund the construction of the Aswan High Dam?';
    l4.narrative_blocks[6].source.model_answer =
      "Nasser framed the Suez Canal as Egypt's national property that had been exploited by foreign colonial powers for nearly a century while 120,000 Egyptian workers died digging it. By nationalising the canal, he declared that its annual revenues would be used directly to build the Aswan High Dam after the US and Britain cancelled their promised loans, turning a financial setback into a triumph of Egyptian economic sovereignty.";
  }

  // Block 9: Campaign Map -> Source C
  if (l4.narrative_blocks[9] && l4.narrative_blocks[9].source) {
    l4.narrative_blocks[9].source.title =
      'Source C: Military Campaign Map: The 1956 Suez Crisis & Operation Kadesh';
    l4.narrative_blocks[9].source.question =
      'Source Detective: Study Source C. Study the troop movements on the map. How did the rapid Israeli capture of the Mitla Pass and Sinai allow Britain and France to claim they were merely intervening as "peacekeepers" to protect the Suez Canal?';
    l4.narrative_blocks[9].source.model_answer =
      'The map illustrates the secret pre-planned deception agreed at the Protocol of Sèvres. Israel launched a surprise invasion of Sinai, dropping paratroopers near the Mitla Pass just 30 miles from the canal. This gave Britain and France the false pretext to issue an ultimatum demanding both Egyptian and Israeli forces withdraw 10 miles from the canal. When Egypt predictably refused to withdraw from its own sovereign territory, Anglo-French forces bombed Egyptian airfields and invaded Port Said under the guise of "separating the combatants" and protecting the international waterway.';
  }

  // Block 10: Port Said Landing -> Source D (was duplicate Source C)
  if (l4.narrative_blocks[10] && l4.narrative_blocks[10].source) {
    l4.narrative_blocks[10].source.title =
      'Source D: British Forces Landing at Port Said (Operation Musketeer, Nov 1956)';
    l4.narrative_blocks[10].source.question =
      'Source Detective: Study Source D. Why did Britain and France claim they were entering Egypt as neutral peacekeepers to separate Israeli and Egyptian armies when the Sèvres Protocol proved they had pre-planned the war together?';
    l4.narrative_blocks[10].source.model_answer =
      'Britain and France claimed they were acting as neutral peacekeepers to protect the canal from the outbreak of fighting between Egypt and Israel. In reality, the Protocol of Sèvres proved they had colluded in secret with Israel: Israel agreed to attack Egypt first so Britain and France could intervene under the guise of protecting the canal, with the real objective of overthrowing Nasser and restoring European colonial control over the waterway.';
  }

  // Block 12: Anthony Eden -> Source E (add question and model answer)
  if (l4.narrative_blocks[12] && l4.narrative_blocks[12].source) {
    l4.narrative_blocks[12].source.title =
      'Source E: Prime Minister Anthony Eden Defending the Suez Operation (November 1956)';
    l4.narrative_blocks[12].source.question =
      'Source Detective: Study Source E. How did Prime Minister Eden attempt to justify military intervention to the British Parliament, and why did this justification collapse under international pressure?';
    l4.narrative_blocks[12].source.model_answer =
      "Eden justified the intervention by framing Nasser as an aggressive dictator who threatened international shipping and comparing him to 1930s European fascists who had to be stopped before they expanded. However, this justification collapsed because US President Eisenhower furiously condemned the colonial aggression, threatened to trigger a run on the British pound, and the UN General Assembly demanded an immediate ceasefire, exposing Britain's inability to act independently of American approval.";
  }

  // ==========================================================
  // LESSON 5: The Six Day War, June 1967
  // ==========================================================
  const l5 = unitData.lessons[4];
  l5.primary_source = {
    title: 'Source A: Military Map: The Six-Day War Campaigns (June 1967)',
    src: '/units/cme_new/assets/cme_six_day_war_1967_campaign_map.png',
    caption:
      'Primary Campaign Map: Map showing the three Israeli offensive fronts in June 1967: Sinai against Egypt, the West Bank against Jordan, and the Golan Heights against Syria.',
    question:
      'Source Detective: Study Source A. How does the map illustrate the strategic dilemma of fighting a war on three fronts simultaneously, and how did Israel overcome this geography?',
    model_answer:
      "Source A highlights that Israel was geographically encircled by hostile Arab armies: Egypt in the south, Jordan in the east, and Syria in the north. Israel overcame this multi-front encirclement through lightning speed, total surprise, and interior lines of communication. By launching Operation Focus to destroy Egypt's air force on the ground within hours, Israel secured undisputed air superiority, allowing its armoured divisions to defeat the Egyptian army in Sinai before pivoting rapidly to rout Jordanian forces in the West Bank and assault Syrian fortifications on the Golan Heights.",
  };

  if (l5.narrative_blocks[0] && l5.narrative_blocks[0].source) {
    delete l5.narrative_blocks[0].source;
    l5.narrative_blocks[0].image = '/units/cme_new/assets/cme_six_day_war_1967_campaign_map.png';
    l5.narrative_blocks[0].caption =
      'Campaign map showing the three Israeli offensive fronts in June 1967.';
  }

  // Block 6: Paratroopers at Western Wall -> Source B
  if (l5.narrative_blocks[6] && l5.narrative_blocks[6].source) {
    l5.narrative_blocks[6].source.title =
      'Source B: Israeli Paratroopers at the Western Wall (7 June 1967)';
    l5.narrative_blocks[6].source.question =
      'Source Detective: Study Source B. What does this iconic photograph reveal about the emotional and religious significance of capturing the Old City of Jerusalem for Israeli soldiers?';
    l5.narrative_blocks[6].source.model_answer =
      'Source B reveals the profound spiritual and historical emotion of the moment. For 19 years (1948–1967), Jews had been forbidden from visiting or praying at the Western Wall under Jordanian rule. The solemn, reverent expressions of the battle-hardened paratroopers looking up at the ancient stones symbolised the reunification of Jerusalem and fulfilled a 2,000-year Zionist yearning. However, capturing East Jerusalem also placed holy Muslim and Christian sites under Israeli control, ensuring Jerusalem would remain the most contested flashpoint in the conflict.';
  }

  // Block 14: Operation Focus -> Source C
  if (l5.narrative_blocks[14] && l5.narrative_blocks[14].source) {
    l5.narrative_blocks[14].source.title =
      'Source C: Operation Focus: The Destruction of Egyptian Airfields (5 June 1967)';
    l5.narrative_blocks[14].source.question =
      'Source Detective: Study Source C. Why was Israel’s preemptive strike against Egyptian airfields in Operation Focus decisive in securing total air superiority and victory in just six days?';
    l5.narrative_blocks[14].source.model_answer =
      "Operation Focus was the decisive masterstroke of the Six-Day War. At 7:45 AM on 5 June 1967, nearly 200 Israeli jets flew beneath Egyptian radar across the Mediterranean to hit 18 Egyptian airbases simultaneously while pilots were eating breakfast. By destroying over 300 Egyptian aircraft on the runway in under three hours, Israel eliminated Egypt's air force before it could take off. Without air cover, Egyptian armoured columns in the Sinai were left completely vulnerable to relentless Israeli air strikes, guaranteeing swift and total victory.";
  }

  // ==========================================================
  // LESSON 6: Aftermath of 1967 War & Rise of Palestinian Resistance
  // ==========================================================
  const l6 = unitData.lessons[5];
  l6.primary_source = {
    title: 'Source A: UN Security Council Resolution 242 (22 November 1967)',
    content:
      'The Security Council emphasizes the inadmissibility of the acquisition of territory by war and the need to work for a just and lasting peace in which every State in the area can live in security. It affirms that the fulfillment of Charter principles requires the establishment of a just and lasting peace in the Middle East which should include the application of both the following principles: (i) Withdrawal of Israel armed forces from territories occupied in the recent conflict; (ii) Termination of all claims or states of belligerency and respect for and acknowledgement of the sovereignty, territorial integrity and political independence of every State in the area and their right to live in peace within secure and recognized boundaries free from threats or acts of force.',
    type: 'written',
    caption:
      'Extract from UN Security Council Resolution 242, establishing the formula of "land for peace" following the Six-Day War.',
    question:
      'Source Detective: Study Source A. Why did the phrase "withdrawal from territories occupied in the recent conflict" create such intense and lasting disagreement between Israel and Arab states?',
    model_answer:
      'Source A established the principle of "land for peace," but its deliberate ambiguity caused permanent dispute. The English text called for withdrawal from "territories occupied" (rather than "the territories"), allowing Israel to argue it was not required to return all captured lands and could retain strategic areas for secure borders. Conversely, Arab states and the French text demanded withdrawal from "all the territories." Furthermore, Resolution 242 referred to Palestinians merely as a "refugee problem" rather than a people with a right to national self-determination, which the PLO rejected completely.',
  };

  // Block 0: Remove duplicate Source A
  if (l6.narrative_blocks[0] && l6.narrative_blocks[0].source) {
    delete l6.narrative_blocks[0].source;
    l6.narrative_blocks[0].image = '/images/cme_balcony_munich_1972.jpg';
    l6.narrative_blocks[0].caption =
      'A Black September militant during the 1972 Munich Olympic hostage crisis.';
  }

  // Block 6: Remove duplicate UN Res 242 source
  if (l6.narrative_blocks[6] && l6.narrative_blocks[6].source) {
    delete l6.narrative_blocks[6].source;
  }

  // Block 8: Arafat / Karameh -> Source B
  if (l6.narrative_blocks[8]) {
    l6.narrative_blocks[8].source = {
      title: 'Source B: Yasser Arafat and the Rise of Fatah Following the Battle of Karameh (1968)',
      src: '/images/cme_arafat_un_1974.jpg',
      caption:
        'Yasser Arafat addressing Palestinian commandos following the Battle of Karameh in 1968.',
      question:
        'Source Detective: Study Source B. How did Yasser Arafat use the 1968 Battle of Karameh to establish the PLO as an independent fighting force separate from Arab state control?',
      model_answer:
        'Source B shows Yasser Arafat emerging as the dominant leader of the Palestinian national movement. At the Battle of Karameh in March 1968, Palestinian commandos and Jordanian forces inflicted heavy casualties on an Israeli raid, forcing an Israeli withdrawal. Even though military losses were significant, Arafat transformed Karameh into a celebrated moral and political victory. Thousands of young Palestinians volunteered for Fatah, enabling Arafat to take control of the PLO in 1969 and establish it as an independent force committed to armed guerrilla struggle rather than relying on Arab regimes.',
    };
  }

  // Block 11: Map of Fedayeen Bases in Jordan -> Source C
  if (l6.narrative_blocks[11]) {
    l6.narrative_blocks[11].source = {
      title: 'Source C: Map of Fedayeen Bases & The Black September Conflict in Jordan (1970)',
      src: '/units/cme_new/assets/cme_fedayeen_jordan_black_september_1970_map.png',
      caption:
        'Map showing Palestinian fedayeen refugee camps and guerrilla bases in Jordan prior to the Black September civil war in 1970.',
      question:
        "Source Detective: Study Source C. Why did the armed Fedayeen presence in Jordanian cities directly threaten the sovereignty of King Hussein's monarchy, leading to the Black September civil war?",
      model_answer:
        'Source C demonstrates how Palestinian guerrilla factions (the fedayeen) operated as a "state within a state" inside Jordan. Armed PLO fighters set up roadblocks, defied Jordanian police, and launched unauthorized raids into Israel, which brought devastating Israeli retaliatory strikes against Jordanian villages. When the PFLP hijacked four western airliners to Dawson\'s Field in Jordan in September 1970, King Hussein ordered the Jordanian army to crush the fedayeen to restore royal authority, expelling the PLO to Lebanon.',
    };
  }

  // Block 12: Remove duplicate
  if (l6.narrative_blocks[12] && l6.narrative_blocks[12].source) {
    delete l6.narrative_blocks[12].source;
  }

  // Block 15: Munich Olympics -> Source D
  if (l6.narrative_blocks[15]) {
    l6.narrative_blocks[15].source = {
      title: 'Source D: Black September Militant on the Balcony at Munich (5 September 1972)',
      src: '/images/cme_balcony_munich_1972.jpg',
      caption:
        'A hooded member of the Black September Palestinian militant group standing on the balcony of the Olympic Village in Munich on 5 September 1972.',
      question:
        'Source Detective: Study Source D. Why did radical Palestinian militant groups shift toward dramatic international terrorism like the Munich hostage crisis after the defeat of conventional Arab armies in 1967?',
      model_answer:
        'Source D captures the moment international terrorism exploded onto global television. Following the catastrophic defeat of conventional Arab armies in 1967 and the expulsion of the PLO from Jordan in 1970, militant factions like Black September concluded that regular armies could never liberate Palestine. By taking Israeli athletes hostage at the Munich Olympics—viewed live by 900 million people worldwide—they hijacked global media attention to force the forgotten plight of the Palestinians onto the international agenda, despite widespread revulsion at their tactics.',
    };
  }

  // ==========================================================
  // LESSON 7: War of Attrition and Yom Kippur War (1967-1973)
  // ==========================================================
  const l7 = unitData.lessons[6];
  l7.primary_source = {
    title: 'Source A: Operation Badr: Egyptian Troops Crossing the Suez Canal (October 1973)',
    src: '/images/cme_operation_badr_canal_crossing_1973.jpg',
    caption:
      'Primary Photograph: Egyptian infantry and pontoon bridges crossing the Suez Canal during Operation Badr on 6 October 1973.',
    question:
      'Source Detective: Study Source A. How did the Egyptian surprise assault across the Suez Canal in Operation Badr overcome the Bar-Lev Line and completely shatter Israeli assumptions of military invulnerability?',
    model_answer:
      'Source A depicts Operation Badr, where Egypt achieved total tactical surprise by attacking on Yom Kippur, the holiest day in Judaism, while Israel was fasting and mobilising slowly. Using innovative high-pressure water cannons to blast 60 gaps through Israel\'s massive sand ramparts on the Bar-Lev Line, 32,000 Egyptian troops crossed in pontoon bridges in under two hours. The operation shattered the "concept" of Israeli invincibility that had persisted since 1967 and restored Arab military self-respect.',
  };

  // Block 0: Remove duplicate Source A
  if (l7.narrative_blocks[0] && l7.narrative_blocks[0].source) {
    delete l7.narrative_blocks[0].source;
    l7.narrative_blocks[0].image = '/images/cme_operation_badr_canal_crossing_1973.jpg';
    l7.narrative_blocks[0].caption = 'Egyptian soldiers crossing the Suez Canal in October 1973.';
  }

  // Block 7: Replace out-of-place 1978 Camp David source with Bar-Lev / SAM Umbrella -> Source B
  if (l7.narrative_blocks[7]) {
    l7.narrative_blocks[7].source = {
      title: 'Source B: The Soviet-Supplied Anti-Tank SAM Umbrella in the Sinai (October 1973)',
      src: '/images/cme_sam_missile_umbrella_1973.jpg',
      caption:
        'Egyptian soldiers armed with Soviet AT-3 Sagger wire-guided anti-tank missiles beneath the SAM anti-aircraft umbrella during the Yom Kippur War.',
      question:
        "Source Detective: Study Source B. How did Soviet-supplied anti-tank and surface-to-air missiles (SAMs) neutralize Israel's armored and air superiority during the early days of the Yom Kippur War?",
      model_answer:
        "Source B explains why Israeli counter-attacks were devastated in the first 48 hours. Egypt remained strictly under the protective shield of mobile Soviet SAM-6 and SAM-2 missile batteries deployed along the west bank of the canal, which shot down dozens of Israeli Skyhawk and Phantom jets. Simultaneously, Egyptian infantry armed with portable wire-guided Sagger anti-tank missiles decimated Israeli tanks attempting to reach the canal, completely neutralizing Israel's traditional advantages in blitzkrieg armoured warfare and close air support.",
    };
  }

  // Block 11: Sinai Front Map -> Source C
  if (l7.narrative_blocks[11] && l7.narrative_blocks[11].source) {
    l7.narrative_blocks[11].source.title =
      'Source C: Military Map: Yom Kippur War — Sinai Front (October 1973)';
    l7.narrative_blocks[11].source.question =
      'Source Detective: Study Source C. Study the Egyptian crossing points along the Suez Canal. How did Egyptian forces use the water barrier and geographical depth of the Sinai passes to catch the Israeli Bar Lev line by surprise?';
    l7.narrative_blocks[11].source.model_answer =
      'The map illustrates how Egypt coordinated a five-division assault across the entire 100-mile length of the Suez Canal simultaneously, overwhelming the isolated Israeli forts of the Bar-Lev Line. By digging into fortified bridgeheads 6 to 9 miles east of the canal beneath their SAM umbrella, Egyptian forces controlled the direct routes toward the strategic Gidi and Mitla passes, forcing Israeli reserves to launch costly, piecemeal counter-attacks across open desert terrain.';
  }

  // Block 13: Remove duplicate Source C
  if (l7.narrative_blocks[13] && l7.narrative_blocks[13].source) {
    delete l7.narrative_blocks[13].source;
  }

  // Block 14: Golda Meir -> Source D
  if (l7.narrative_blocks[14] && l7.narrative_blocks[14].source) {
    l7.narrative_blocks[14].source.title =
      'Source D: Prime Minister Golda Meir Addressing the Nation (October 1973)';
    l7.narrative_blocks[14].source.question =
      'Source Detective: Study Source D. How did Golda Meir explain the devastating initial losses on Yom Kippur, and why did the intelligence failure (the "Mehdal") lead to her eventual resignation?';
    l7.narrative_blocks[14].source.model_answer =
      'In Source D, Golda Meir sought to rally public morale while acknowledging the bitter shock of the surprise attack. The catastrophe became known in Israel as the "Mehdal" (The Blunder)—a catastrophic complacency in Israeli military intelligence that had dismissed Egyptian troop concentrations as mere training exercises. Although Israel eventually rallied to encircle the Egyptian Third Army, the heavy loss of over 2,600 Israeli soldiers caused overwhelming public grief and outrage, forcing the establishment of the Agranat Commission and leading to the resignation of Golda Meir and Moshe Dayan in 1974.';
  }

  // ==========================================================
  // LESSON 8: From Shuttle Diplomacy to Camp David (1974-1979)
  // ==========================================================
  const l8 = unitData.lessons[7];
  l8.primary_source = {
    title: 'Source A: President Anwar Sadat Addresses the Israeli Knesset (20 November 1977)',
    src: '/images/cme_sadat_knesset_1977.jpg',
    caption:
      'Primary Photograph: Egyptian President Anwar Sadat speaking at the podium of the Israeli Knesset in Jerusalem on 20 November 1977.',
    question:
      "Source Detective: Study Source A. Why was President Sadat's historic speech to the Israeli parliament in Jerusalem considered an astonishing psychological and diplomatic breakthrough for Middle East peace?",
    model_answer:
      "Source A captures an unprecedented moment: for 30 years, Arab states had refused to recognize Israel's existence or negotiate directly. By flying directly to Jerusalem and speaking directly to the Israeli parliament and public, Sadat broke the deep-seated psychological barrier of fear and mutual denial. He offered full diplomatic recognition and permanent peace in exchange for the total return of the occupied Sinai Peninsula and self-determination for the Palestinians, proving to the Israeli public that an Arab leader was genuinely willing to make peace.",
  };

  // Block 0: Remove duplicate Source A
  if (l8.narrative_blocks[0] && l8.narrative_blocks[0].source) {
    delete l8.narrative_blocks[0].source;
    l8.narrative_blocks[0].image = '/images/cme_sadat_knesset_1977.jpg';
    l8.narrative_blocks[0].caption =
      'President Anwar Sadat of Egypt addressing the Israeli Knesset in Jerusalem.';
  }

  // Block 5: Camp David Summit -> Source B
  if (l8.narrative_blocks[5] && l8.narrative_blocks[5].source) {
    l8.narrative_blocks[5].source.title =
      'Source B: Begin, Carter, and Sadat at the Camp David Summit (September 1978)';
    l8.narrative_blocks[5].source.src = '/units/cme_new/assets/camp_david_accords.png';
    l8.narrative_blocks[5].source.caption =
      'US President Jimmy Carter joins hands with Israeli Prime Minister Menachem Begin and Egyptian President Anwar Sadat following 13 days of secluded negotiations at Camp David.';
    l8.narrative_blocks[5].source.question =
      "Source Detective: Study Source B. Why was US President Jimmy Carter's personal mediation at Camp David indispensable in brokering a compromise between Menachem Begin and Anwar Sadat?";
    l8.narrative_blocks[5].source.model_answer =
      'Source B illustrates the crucial role of third-party US mediation. Begin and Sadat harboured deep personal distrust and refused to speak to each other directly for several days during the 13-day summit. Carter conducted exhausting "shuttle diplomacy" between their private cabins, drafting over 20 peace proposals himself. Carter persuaded Begin to dismantle all Israeli settlements in the Sinai in exchange for Egyptian demilitarization and recognition, while promising billions of dollars in annual US economic and military aid to both nations to seal the agreement.';
  }

  // Block 9: Sinai Map -> Source C
  if (l8.narrative_blocks[9] && l8.narrative_blocks[9].source) {
    l8.narrative_blocks[9].source.title =
      'Source C: Map of the Sinai Peninsula: Camp David Settlement (1979)';
    l8.narrative_blocks[9].source.question =
      'Source Detective: Study Source C. Explain why Israeli withdrawal from the Sinai Peninsula and guaranteed free passage through the Strait of Tiran were the twin cornerstones of the treaty.';
    l8.narrative_blocks[9].source.model_answer =
      'Source C illustrates the strict geopolitical bargain of "land for peace." Israel returned the entire 60,000 sq km Sinai desert (including the Alma oil fields and airbases), securing Egypt\'s withdrawal from the anti-Israel coalition. In exchange, Egypt demilitarized the peninsula into strict monitoring zones, permitted a UN observer force (MFO), and legally guaranteed unimpeded Israeli passage through the Suez Canal and Straits of Tiran, permanently removing the primary flashpoint that had triggered wars in 1956 and 1967.';
  }

  // Block 10: Treaty Signing -> Source D
  if (l8.narrative_blocks[10] && l8.narrative_blocks[10].source) {
    l8.narrative_blocks[10].source.title =
      'Source D: The Egypt-Israel Peace Treaty Signing in Washington (26 March 1979)';
    l8.narrative_blocks[10].source.src = '/images/cme_washington_treaty_signing_1979.jpg';
    l8.narrative_blocks[10].source.caption =
      'Anwar Sadat, Jimmy Carter, and Menachem Begin sign the Egypt-Israel Peace Treaty on the North Lawn of the White House on 26 March 1979.';
    l8.narrative_blocks[10].source.question =
      "Source Detective: Study Source D. How did the signing of the peace treaty transform regional alliances, and why did it lead directly to Egypt's suspension from the Arab League and the assassination of Sadat?";
    l8.narrative_blocks[10].source.model_answer =
      'The formal peace treaty in Source D fundamentally transformed Middle Eastern geopolitics. By signing a separate peace that took Egypt (the largest and most powerful Arab military power) out of the conflict, Sadat ensured that a unified Arab war against Israel was no longer militarily viable. However, other Arab nations viewed this as a traitorous betrayal of the Palestinian cause. The Arab League expelled Egypt, moved its headquarters from Cairo to Tunis, and suspended diplomatic ties. Domestically, radical Islamist groups condemned Sadat as an apostate, leading directly to his assassination during a military parade in Cairo on 6 October 1981.';
  }

  // ==========================================================
  // LESSON 9: Lebanon, Sabra & Shatila, First Intifada (1974-1993)
  // ==========================================================
  const l9 = unitData.lessons[8];
  l9.primary_source = {
    title: 'Source A: Ariel Sharon Overlooking Beirut During the Lebanon Invasion (June 1982)',
    src: '/images/cme_sharon_beirut_1982.jpg',
    caption:
      'Primary Photograph: Israeli Defence Minister Ariel Sharon surveying the besieged Lebanese capital of Beirut through binoculars in June 1982.',
    question:
      'Source Detective: Study Source A. Why did Defence Minister Ariel Sharon push the Israeli military invasion all the way to Beirut, and why did the siege provoke intense domestic and international opposition?',
    model_answer:
      "Source A shows Ariel Sharon directing Operation Peace for Galilee. Although the Israeli cabinet had initially approved a limited 40-kilometre incursion to protect northern settlements from PLO Katyusha rockets, Sharon deliberately expanded the offensive to lay siege to Beirut. His goal was to destroy the PLO's military infrastructure completely and install a pro-Israeli Christian Maronite government under Bachir Gemayel. However, the relentless artillery bombardment of civilian areas in Beirut and the subsequent massacre of thousands of refugees by Phalangist militias at Sabra and Shatila provoked international outrage and a 400,000-strong protest in Tel Aviv.",
  };

  // Block 0: Remove duplicate Source A
  if (l9.narrative_blocks[0] && l9.narrative_blocks[0].source) {
    delete l9.narrative_blocks[0].source;
    l9.narrative_blocks[0].image = '/images/cme_sharon_beirut_1982.jpg';
    l9.narrative_blocks[0].caption = 'Defence Minister Ariel Sharon during the 1982 Lebanon War.';
  }

  // Remove any stray sources on Block 7 or 14
  if (l9.narrative_blocks[7] && l9.narrative_blocks[7].source) {
    delete l9.narrative_blocks[7].source;
  }
  if (l9.narrative_blocks[14] && l9.narrative_blocks[14].source) {
    delete l9.narrative_blocks[14].source;
  }

  // Block 6: Lebanon War Map -> Source B
  if (l9.narrative_blocks[6]) {
    l9.narrative_blocks[6].source = {
      title: 'Source B: Military Map: 1982 Lebanon War (Operation Peace for Galilee)',
      src: '/units/cme_new/assets/cme_lebanon_war_1982_campaign_map.png',
      caption:
        'Map illustrating the three Israeli advancing columns north through southern Lebanon to encircle Beirut in June 1982.',
      question:
        'Source Detective: Study Source B. Study the arrows marking the Israeli advance northward. How does the map demonstrate that Sharon pushed the invasion far beyond the initial 40-kilometre security zone to encircle Beirut?',
      model_answer:
        'The map clearly proves that Israeli forces advanced far beyond the 40-kilometre limit publicly announced by Prime Minister Begin. The three armoured prongs drove over 80 kilometres north along the Mediterranean coast, through the Shouf mountains, and into the Bekaa Valley, confronting Syrian forces and cutting off the Beirut-Damascus highway to completely encircle West Beirut, transforming a border-security operation into an all-out regime-change war.',
    };
  }

  // Block 8: PLO Evacuation -> Source C
  if (l9.narrative_blocks[8]) {
    l9.narrative_blocks[8].source = {
      title: 'Source C: PLO Fighters Evacuating Beirut by Sea to Tunisia (August 1982)',
      src: '/images/cme_plo_evacuation_beirut_1982.jpg',
      caption:
        'Palestinian PLO fighters flashing victory signs as they board evacuation ships in Beirut harbour bound for Tunisia under multinational protection in August 1982.',
      question:
        'Source Detective: Study Source C. Why was the forced evacuation of Yasser Arafat and thousands of PLO fighters from Lebanon to Tunis both a military defeat and a catalyst for the First Intifada?',
      model_answer:
        "Source C captures the expulsion of over 14,000 PLO fighters from Lebanon following the brutal two-month Israeli siege. While celebrated defiantly as survival, the evacuation was a crushing military setback: the PLO lost its armed border sanctuary next to Israel and was exiled 1,500 miles away to Tunis, severely weakening Arafat's ability to conduct cross-border warfare. Because the exiled leadership in Tunis became distant and ineffective, leadership of the Palestinian national struggle shifted directly to the grassroots population living under occupation in the West Bank and Gaza, paving the way for the outbreak of the First Intifada in 1987.",
    };
  }

  // Block 15: First Intifada -> Source D
  if (l9.narrative_blocks[15]) {
    l9.narrative_blocks[15].source = {
      title:
        'Source D: Palestinian Youths Confronting Israeli Armoured Vehicles in Gaza (First Intifada, 1987)',
      src: '/images/cme_intifada_youth_tanks_1987.jpg',
      caption:
        'Palestinian youths armed with stones and slingshots confronting an Israeli Defense Forces armoured vehicle in the Gaza Strip in December 1987.',
      question:
        'Source Detective: Study Source D. How does the asymmetric confrontation between stone-throwing Palestinian youths and Israeli armored forces explain why the First Intifada created a public relations crisis for Israel?',
      model_answer:
        'Source D visualises the complete inversion of traditional media narratives: Israel was no longer seen as the David fighting Arab Goliaths, but as a heavily armed occupying power using tanks, tear gas, and live ammunition against unarmed teenagers and children armed only with stones. Television footage of Israeli soldiers enforcing Defence Minister Yitzhak Rabin\'s controversial "broken bones" policy shocked international public opinion and created unprecedented moral discomfort within Israeli society itself, proving that military force alone could never suppress Palestinian demands for self-determination.',
    };
  }

  // ==========================================================
  // LESSON 10: Attempts at a Solution: Oslo to Oslo II (1988-1995)
  // ==========================================================
  const l10 = unitData.lessons[9];
  l10.primary_source = {
    title: 'Source A: The Historic Oslo Handshake on the White House Lawn (13 September 1993)',
    src: '/images/cme_oslo_handshake_1993.jpg',
    caption:
      'Primary Photograph: Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shake hands on the White House lawn, encouraged by US President Bill Clinton, following the signing of the Oslo Accord on 13 September 1993.',
    question:
      'Source Detective: Study Source A. Why did the visual handshake between Rabin and Arafat symbolize an astonishing diplomatic breakthrough, and what major obstacles remained unresolved?',
    model_answer:
      "Source A was an extraordinary visual turning point: for decades, Israel had officially branded the PLO a terrorist organization, while the PLO's charter had called for Israel's destruction. The handshake symbolized mutual recognition: the PLO formally recognized Israel's right to exist in peace and renounced terrorism, while Israel recognized the PLO as the legitimate representative of the Palestinian people and agreed to phased self-rule in Gaza and Jericho. However, the accord left the four most volatile \"final status\" issues unresolved: the status of Jerusalem, the right of return for refugees, Jewish settlements, and final sovereign borders.",
  };

  // Block 0: Remove duplicate Source A
  if (l10.narrative_blocks[0] && l10.narrative_blocks[0].source) {
    delete l10.narrative_blocks[0].source;
    l10.narrative_blocks[0].image = '/images/cme_oslo_handshake_1993.jpg';
    l10.narrative_blocks[0].caption =
      'Yitzhak Rabin, Bill Clinton, and Yasser Arafat at the White House in September 1993.';
  }

  // Block 7: Israel-Jordan Peace Treaty -> Source B
  if (l10.narrative_blocks[7] && l10.narrative_blocks[7].source) {
    l10.narrative_blocks[7].source.title =
      'Source B: King Hussein and Yitzhak Rabin Signing the Israel-Jordan Peace Treaty (26 October 1994)';
    l10.narrative_blocks[7].source.src = '/images/cme_israel_jordan_treaty_1994.jpg';
    l10.narrative_blocks[7].source.caption =
      'King Hussein of Jordan and Israeli Prime Minister Yitzhak Rabin sign the Israel-Jordan Treaty of Peace in the Arava Valley on 26 October 1994, witnessed by President Bill Clinton.';
    l10.narrative_blocks[7].source.question =
      'Source Detective: Study Source B. Why was King Hussein of Jordan willing to sign a formal peace treaty with Israel in 1994 following the momentum of the Oslo Accords?';
    l10.narrative_blocks[7].source.model_answer =
      "Source B demonstrates the regional diplomatic momentum unleashed by Oslo. Once the PLO had formally recognized Israel, King Hussein felt politically free to normalize relations without being accused of betraying the Palestinians. Jordan shared Israel's longest land border and had maintained secret intelligence communications with Israeli leaders for decades. The treaty settled territorial disputes in the Arava Valley, secured vital water-sharing agreements for Jordan from the Sea of Galilee, recognized Jordan's special historic role over Muslim holy shrines in Jerusalem, and cemented Jordan's strategic alliance with the United States.";
  }

  // Block 12: Oslo II West Bank Map -> Source C
  if (l10.narrative_blocks[12] && l10.narrative_blocks[12].source) {
    l10.narrative_blocks[12].source.title =
      'Source C: Map of the West Bank under the Oslo II Agreement (1995)';
    l10.narrative_blocks[12].source.question =
      'Source Detective: Study Source C. Study the distribution of Areas A, B, and C. Why did this fragmented "archipelago" of isolated Palestinian enclaves lead many Palestinians to view Oslo II as an unworkable compromise?';
    l10.narrative_blocks[12].source.model_answer =
      'Source C illustrates the fragmentation of the West Bank into three separate zones: Area A (full Palestinian civil and security control, covering only 3% of the land and major cities), Area B (Palestinian civil control but joint Israeli security control, 24%), and Area C (complete Israeli civil and military control, covering 73% including all Jewish settlements, bypass roads, and borders). This created a disconnected "archipelago" of isolated Palestinian enclaves surrounded by Israeli checkpoints and military zones, preventing contiguous travel and convincing many Palestinians that Oslo was institutionalizing permanent Israeli occupation rather than leading to a viable sovereign state.';
  }

  // Block 13: Rabin Assassination / Peace Rally -> Source D
  if (l10.narrative_blocks[13] && l10.narrative_blocks[13].source) {
    l10.narrative_blocks[13].source.title =
      'Source D: Peace Rally in Tel Aviv Moments Before the Assassination of Yitzhak Rabin (4 November 1995)';
    l10.narrative_blocks[13].source.src = '/images/cme_rabin_assassination_rally_1995.jpg';
    l10.narrative_blocks[13].source.caption =
      'Yitzhak Rabin addresses over 100,000 Israelis at the Kings of Israel Square in Tel Aviv singing "A Song for Peace" moments before he was assassinated by a right-wing Jewish extremist.';
    l10.narrative_blocks[13].source.question =
      'Source Detective: Study Source D. What does this massive peace rally reveal about the deep polarization within Israeli society between supporters of the peace process and right-wing extremists?';
    l10.narrative_blocks[13].source.model_answer =
      'Source D captures the fragile climax of the peace movement. Over 100,000 Israelis gathered under the banner "Yes to Peace, No to Violence" to demonstrate public support for Rabin amid escalating venomous opposition from right-wing nationalist and religious groups who accused Rabin of treason for ceding biblical land. Minutes after singing "The Song for Peace", Rabin was shot dead by Yigal Amir, a religious Jewish extremist who believed killing the Prime Minister was divinely sanctioned to stop the peace accords. Rabin\'s assassination shattered the momentum of the Oslo peace process, demonstrating that internal violent extremism within both Israeli and Palestinian societies possessed the power to derail peace.';
  }

  // ==========================================================
  // Serialize and write back
  // ==========================================================
  const outputCode =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(dataPath, outputCode, 'utf8');
  fs.writeFileSync(publicDataPath, outputCode, 'utf8');
  console.log('✅ Successfully updated units/cme_new/data.js and public/units/cme_new/data.js');
}

applySync().catch((err) => {
  console.error('Fatal error in applySync:', err);
  process.exit(1);
});
