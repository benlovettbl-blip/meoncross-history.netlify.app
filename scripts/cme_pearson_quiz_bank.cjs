/**
 * cme_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 2 (1HI0/2B / Option P5)
 * Conflict in the Middle East, 1945–1995
 * Master Knowledge Retrieval Bank (16 Enquiries x 12 Questions = 192 Questions).
 *
 * Pedagogical Standards (SEN & GCSE Exam Optimized):
 * 1. 100% Fidelity to the Pearson Specification & Revision Guide.
 * 2. Chronological Anchoring: Dates and years are pre-anchored in question stems,
 *    testing substantive historical facts, causes, and mechanisms rather than date guessing.
 * 3. SEN-Accessible Language: Simple, direct Tier-2 vocabulary (e.g. "sea route" instead of "maritime",
 *    "secret" instead of "clandestine") while rigorously preserving all Tier-3 specification terms.
 * 4. Short, Focused Questions: Stems kept to 10–18 words to avoid working-memory overload.
 * 5. Two-Line Retrieval Format: Line 1 = Core Fact; Line 2 = Historical Explanation (why it matters).
 * 6. Examiner Warning / Fatal Pitfall Callout on every enquiry page.
 */

const CME_PEARSON_QUIZ_BANK = [
  // =========================================================================
  // ENQUIRY 1: Conflicting Demands & The Post-War Mandate Crisis (1945–1947)
  // =========================================================================
  {
    num: 1,
    title: 'Conflicting Demands & The Post-War Mandate Crisis (1945–1947)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry: 'Why did the British Mandate in Palestine become ungovernable after 1945?',
    examinerTrap:
      'Examiner Warning: Do not confuse the Balfour Declaration (1917 British promise of a Jewish "national home") with the 1947 UN Partition Plan. Always specify that the 1939 British White Paper severely restricted Jewish immigration just as the Holocaust was unfolding, creating intense Zionist resentment against Britain.',
    questions: [
      {
        q: 'In 1917, what British letter promised support for a Jewish "national home" in Palestine?',
        a: 'The Balfour Declaration (1917)',
        exp: 'Supported a Jewish homeland while stating non-Jewish civil rights must not be harmed.',
      },
      {
        q: 'In 1915, what secret letters led Arabs to believe Britain promised post-war independence?',
        a: 'The McMahon-Hussein Correspondence',
        exp: 'Britain promised an independent Arab state in exchange for an Arab revolt against Ottoman rule.',
      },
      {
        q: 'In 1939, what British policy capped Jewish immigration into Palestine at 75,000 over 5 years?',
        a: 'The 1939 British White Paper (MacDonald White Paper)',
        exp: 'Britain tried to win Arab support before WWII, causing fierce Jewish anger during the Holocaust.',
      },
      {
        q: 'In August 1945, how many Jewish refugees did US President Truman urge Britain to admit into Palestine?',
        a: '100,000 Jewish refugees (Displaced Persons)',
        exp: 'Pressured Britain to let Holocaust survivors leave European refugee camps for Palestine.',
      },
      {
        q: 'In 1945, what was the population ratio between Arabs and Jews in Palestine?',
        a: '2:1 Arab majority (1.2 million Arabs to 600,000 Jews)',
        exp: 'Arabs demanded a single independent state; Jewish leaders demanded a separate Jewish homeland.',
      },
      {
        q: 'After 1945, what secret operation smuggled Jewish refugees past the British naval blockade?',
        a: 'Aliyah Bet (illegal immigration)',
        exp: 'Organized by the Haganah to bring Holocaust survivors to Palestine despite British bans.',
      },
      {
        q: 'In July 1947, which Jewish refugee ship was intercepted by Britain and forced back to Germany?',
        a: 'The SS Exodus (1947)',
        exp: 'Sending 4,500 Holocaust survivors back to Europe caused world outrage against British rule.',
      },
      {
        q: 'Why was the Suez Canal such a vital sea route for Britain after 1945?',
        a: 'Main route for Middle Eastern oil and trade to Asia',
        exp: 'Carried two-thirds of Western Europe’s oil, making Middle East stability essential to Britain.',
      },
      {
        q: 'Which narrow sea passage at Sharm el-Sheikh controls access to the Israeli port of Eilat?',
        a: 'The Straits of Tiran (Gulf of Aqaba)',
        exp: 'Controls sea access to the Red Sea; any Egyptian blockade here was treated by Israel as an act of war.',
      },
      {
        q: 'Why could Britain no longer afford to govern Palestine after World War Two?',
        a: 'Heavy post-war debt and the cost of keeping 100,000 soldiers under attack',
        exp: 'Britain faced rationing at home and could not afford an expensive military occupation.',
      },
      {
        q: 'Which British Foreign Secretary strictly enforced immigration limits in Palestine from 1945 to 1947?',
        a: 'Ernest Bevin',
        exp: 'Protected British oil ties with Arab states, causing clashes with the US and Jewish leaders.',
      },
      {
        q: 'In February 1947, how did Britain decide to end its troubled rule in Palestine?',
        a: 'Referred Palestine to the United Nations to end the Mandate',
        exp: 'Admitted Britain could not resolve the conflict and could no longer afford to police it.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 2: Armed Jewish Insurgency & British Surrender of Mandate (1945–1947)
  // =========================================================================
  {
    num: 2,
    title: 'Armed Jewish Insurgency & British Surrender of Mandate (1945–1947)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry: 'How did armed Jewish resistance compel Britain to abandon the Palestine Mandate?',
    examinerTrap:
      'Examiner Warning: Distinguish carefully between the Haganah (mainstream Jewish defence force under Jewish Agency control) and the militant underground groups Irgun (led by Menachem Begin) and Lehi (Stern Gang). Marks are lost when candidates attribute the King David Hotel bombing to David Ben-Gurion rather than the Irgun.',
    questions: [
      {
        q: 'What was the official, mainstream Jewish defence force in Palestine called?',
        a: 'The Haganah ("The Defence")',
        exp: 'Led by David Ben-Gurion; focused on secret immigration and defending settlements.',
      },
      {
        q: 'Which militant Zionist underground group was led by future Prime Minister Menachem Begin?',
        a: 'The Irgun (Etzel)',
        exp: 'Carried out armed bombings and attacks to drive British forces out of Palestine.',
      },
      {
        q: 'Which extreme breakaway Zionist group, known as the Stern Gang, carried out assassinations?',
        a: 'Lehi (Fighters for the Freedom of Israel)',
        exp: 'Believed violence was the only way to expel Britain; assassinated Lord Moyne in 1944.',
      },
      {
        q: 'In 1945–46, what alliance united the Haganah, Irgun, and Lehi against British forces?',
        a: 'The United Resistance Movement',
        exp: 'Coordinated joint sabotage attacks on British military railways, radar, and bridges.',
      },
      {
        q: 'Which Jerusalem hotel served as the central British military command and government offices?',
        a: 'The King David Hotel',
        exp: 'Heavily guarded base in West Jerusalem running British colonial rule in Palestine.',
      },
      {
        q: 'On 22 July 1946, the Irgun bombed the King David Hotel. Why was this building targeted?',
        a: 'It was the headquarters of the British government and army in Palestine',
        exp: 'Militants placed 350kg of explosives in milk churns to destroy British intelligence records.',
      },
      {
        q: 'How many people were killed in the July 1946 King David Hotel bombing?',
        a: '91 people killed (British, Arab, and Jewish staff)',
        exp: 'The deadliest attack on British forces during the Mandate; shocked the British public.',
      },
      {
        q: 'In June 1946, what major British military sweep arrested over 2,700 Jewish leaders?',
        a: 'Operation Agatha ("Black Saturday")',
        exp: 'Troops raided Jewish offices and seized weapons, triggering Irgun retaliation.',
      },
      {
        q: 'In July 1947, what event saw two British soldiers hanged in retaliation for executed militants?',
        a: 'The "Sergeants Affair"',
        exp: 'The Irgun hanged Sergeants Paice and Martin and booby-trapped their bodies, causing outrage in Britain.',
      },
      {
        q: 'How did the British public react in summer 1947 following the Sergeants Affair?',
        a: 'Anti-Jewish riots broke out in UK cities; newspapers demanded troops come home',
        exp: 'Convinced voters and politicians that British soldiers should no longer die in Palestine.',
      },
      {
        q: 'In May 1947, what special UN committee was sent to Palestine to investigate a solution?',
        a: 'UNSCOP (UN Special Committee on Palestine)',
        exp: '11 neutral nations toured Palestine, visited European refugee camps, and drafted partition.',
      },
      {
        q: 'Why did Palestinian Arab leaders boycott all meetings with UNSCOP in 1947?',
        a: 'They rejected dividing their land and refused to cooperate with partition',
        exp: 'Their boycott allowed the Jewish Agency to present their case for statehood unopposed.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 3: UN Resolution 181 Partition Plan & The Civil War (1947–1948)
  // =========================================================================
  {
    num: 3,
    title: 'UN Resolution 181 Partition Plan & The Civil War (1947–1948)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry: 'Why did the UN Partition Plan ignite civil war between Arabs and Jews in 1947?',
    examinerTrap:
      'Examiner Warning: Ensure you know the exact territorial allocation under UN Resolution 181: 56% to the Jewish state and 43% to the Arab state, with Jerusalem designated an international zone (corpus separatum). Do not confuse this partition plan with the armistice Green Line borders of 1949 (where Israel controlled 78%).',
    questions: [
      {
        q: 'On 29 November 1947, what landmark resolution was passed by the UN General Assembly?',
        a: 'UN Resolution 181 (The Partition Plan)',
        exp: 'Voted to end the British Mandate and divide Palestine into two separate independent states.',
      },
      {
        q: 'Under UN Resolution 181, what percentage of land was given to the proposed Jewish state?',
        a: 'Approximately 56% of Palestine',
        exp: 'Included the coastal plain, eastern Galilee, and Negev desert, though Jews owned under 7% of land.',
      },
      {
        q: 'Under UN Resolution 181, what percentage of land was given to the proposed Arab state?',
        a: 'Approximately 43% of Palestine',
        exp: 'Comprised the central highlands (West Bank), western Galilee, and the Gaza coastal strip.',
      },
      {
        q: 'Under UN Resolution 181, what special international status was given to Jerusalem?',
        a: 'An international zone (corpus separatum) run by the UN',
        exp: 'Planned to protect holy sites sacred to Jews, Christians, and Muslims under neutral global control.',
      },
      {
        q: 'How did David Ben-Gurion and the Jewish Agency respond to the UN partition plan in 1947?',
        a: 'Accepted the plan publicly and celebrated statehood',
        exp: 'Saw partition as international legal recognition of a sovereign Jewish homeland.',
      },
      {
        q: 'Why did Arab leaders and neighbouring Arab states reject UN Resolution 181?',
        a: 'Giving 56% of the land to a one-third minority was seen as unjust',
        exp: 'Refused to give up any part of historic Arab Palestine to European immigrant settlers.',
      },
      {
        q: 'On 30 November 1947, the morning after the UN vote, what broke out across Palestine?',
        a: 'Civil war between Arab and Jewish communities',
        exp: 'Began with an Arab ambush on Jewish buses; fighting quickly spread across towns and roads.',
      },
      {
        q: 'In early 1948, which vital road was blocked by Arab fighters, cutting off 100,000 Jews in Jerusalem?',
        a: 'The Tel Aviv to Jerusalem road (at Bab el-Wad)',
        exp: 'Arab fighters under Abd al-Qadir al-Husayni cut off all food and water convoys to Jewish West Jerusalem.',
      },
      {
        q: 'In April 1948, what military plan did the Haganah launch to secure roads and villages?',
        a: 'Plan Dalet (Plan D)',
        exp: 'Aimed to take control of key routes and towns within the Jewish area before British forces left.',
      },
      {
        q: 'On 9 April 1948, what notorious attack took place at the Arab village of Deir Yassin?',
        a: 'The Deir Yassin Massacre',
        exp: 'Irgun and Lehi fighters killed over 100 Arab villagers, causing mass panic and flight across Palestine.',
      },
      {
        q: 'On 13 April 1948, what revenge attack in Jerusalem killed 78 Jewish medical staff?',
        a: 'The Hadassah Convoy Massacre',
        exp: 'Arab fighters ambushed a convoy of doctors, nurses, and academics traveling to Mount Scopus.',
      },
      {
        q: 'On 14 May 1948, Sir Alan Cunningham sailed from Haifa. What did David Ben-Gurion declare on the same day?',
        a: 'The Declaration of the State of Israel',
        exp: 'Formally proclaimed the sovereign State of Israel at midnight as 25 years of British rule ended.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 4: The First Arab-Israeli War & Armistice Agreements (1948–1949)
  // =========================================================================
  {
    num: 4,
    title: 'The First Arab-Israeli War & Armistice Agreements (1948–1949)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry: 'Why did the newly declared State of Israel emerge victorious in the 1948–49 War?',
    examinerTrap:
      'Examiner Warning: Avoid writing that Israel was heavily outnumbered and under-equipped throughout the entire war. While true in the opening days, by the second truce (July 1948) Israel had unified command, superior mobilization, and modern heavy weaponry supplied by Czechoslovakia, outnumbering Arab soldiers on the battlefield.',
    questions: [
      {
        q: 'On 14 May 1948, who announced the creation of the State of Israel in Tel Aviv?',
        a: 'David Ben-Gurion',
        exp: 'Read the Declaration of Independence at the Tel Aviv Museum as British rule ended.',
      },
      {
        q: 'On 15 May 1948, which five Arab states invaded the newly declared State of Israel?',
        a: 'Egypt, Transjordan, Syria, Iraq, and Lebanon',
        exp: 'Launched a multi-front invasion with the aim of destroying the new Jewish state.',
      },
      {
        q: 'On 26 May 1948, what national army was created to unite all Jewish fighting forces?',
        a: 'The Israeli Defence Forces (IDF / Tzahal)',
        exp: 'Ben-Gurion disbanded the Haganah, Irgun, and Lehi into a single national army under civilian control.',
      },
      {
        q: 'Which elite, British-trained Arab army took control of East Jerusalem and the West Bank in 1948?',
        a: 'The Arab Legion (Transjordan)',
        exp: 'Led by British officer Glubb Pasha; drove Jewish forces out of the Old City of Jerusalem.',
      },
      {
        q: 'During the first UN ceasefire in summer 1948, where did Israel buy vital heavy weapons and planes?',
        a: 'Czechoslovakia',
        exp: 'Broke the arms embargo with Soviet approval, giving Israel modern rifles, artillery, and fighter planes.',
      },
      {
        q: 'In September 1948, which UN peace mediator was assassinated in Jerusalem by the militant group Lehi?',
        a: 'Count Folke Bernadotte',
        exp: 'Swedish diplomat murdered because his peace plan proposed giving the Negev desert to Arab control.',
      },
      {
        q: 'In October 1948, what major Israeli military offensive drove Egyptian forces out of the northern Negev?',
        a: 'Operation Yoav',
        exp: 'Broke the Egyptian blockade, captured Beersheba, and trapped an Egyptian brigade at Fallujah.',
      },
      {
        q: 'Give two main reasons why the Arab armies failed to defeat Israel during 1948–49.',
        a: 'Divided Arab leadership and no united military command',
        exp: 'Arab kings distrusted each other; King Abdullah of Jordan focused only on taking the West Bank.',
      },
      {
        q: 'At the end of the 1948–49 war, what percentage of Palestine was controlled by Israel?',
        a: '78% of Palestine',
        exp: 'Expanded well beyond the 56% in the UN plan, gaining Galilee, the coastal plain, and the Negev.',
      },
      {
        q: 'In 1949, on which Greek island were armistice talks held between Israel and Arab states?',
        a: 'The island of Rhodes',
        exp: 'UN mediator Ralph Bunche led separate talks between Israel, Egypt, Jordan, Lebanon, and Syria.',
      },
      {
        q: 'What was the 1949 ceasefire border between Israel and its neighbours called?',
        a: 'The Green Line',
        exp: 'Drawn in green ink on map sheets; served as Israel’s recognised borders until June 1967.',
      },
      {
        q: 'How was the city of Jerusalem divided under the 1949 ceasefire agreements?',
        a: 'West Jerusalem held by Israel; East Jerusalem and Old City held by Jordan',
        exp: 'Divided by walls, barbed wire, and minefields; Jews could not visit holy sites like the Western Wall.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 5: The Palestinian Refugee Crisis (Nakba), Law of Return & Early Israel (1948–1953)
  // =========================================================================
  {
    num: 5,
    title: 'The Palestinian Refugee Crisis (Nakba), Law of Return & Early Israel (1948–1953)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry:
      'How did the 1948–49 war transform the human and demographic landscape of the Middle East?',
    examinerTrap:
      'Examiner Warning: Be precise on the legal status of the West Bank and Gaza between 1948 and 1967. Jordan formally annexed the West Bank and East Jerusalem in 1950 (granting residents citizenship), whereas Egypt held the Gaza Strip under military administration without offering citizenship to Palestinian refugees.',
    questions: [
      {
        q: 'During the 1948–49 war, roughly how many Palestinian Arabs were driven from or fled their homes?',
        a: 'Approximately 700,000 to 750,000 Palestinian Arabs',
        exp: 'Made up over 80% of the Arab population living in the territory that became Israel.',
      },
      {
        q: 'What Arabic term, meaning "the Catastrophe", describes the 1948 displacement of Palestinians?',
        a: 'Al-Nakba',
        exp: 'Refers to the loss of their homeland, destruction of villages, and permanent refugee status.',
      },
      {
        q: 'In December 1948, what UN resolution stated that Palestinian refugees should be allowed to return home?',
        a: 'UN Resolution 194',
        exp: 'Stated that refugees wishing to live in peace should be allowed to return at the earliest date.',
      },
      {
        q: 'Why did the Israeli government refuse to let Palestinian refugees return after 1949?',
        a: 'Feared losing its Jewish majority and facing internal security threats',
        exp: 'Passed the Absentee Property Law to give abandoned Arab land and homes to new Jewish settlers.',
      },
      {
        q: 'In December 1949, what UN agency was created to provide food, housing, and schooling for Palestinian refugees?',
        a: 'UNRWA (UN Relief and Works Agency)',
        exp: 'Built and managed 59 refugee camps across Gaza, the West Bank, Jordan, Syria, and Lebanon.',
      },
      {
        q: 'In April 1950, which Arab country formally took over the West Bank and East Jerusalem?',
        a: 'Jordan (King Abdullah I)',
        exp: 'Made the territory part of Jordan and granted full Jordanian passports to Palestinian residents.',
      },
      {
        q: 'How did Egypt govern the Gaza Strip after the 1949 armistice?',
        a: 'Kept under strict military rule without giving residents Egyptian citizenship',
        exp: 'Palestinians were confined to refugee camps under curfews and could not move freely to Egypt.',
      },
      {
        q: 'In July 1950, what Israeli law gave every Jewish person worldwide the right to settle in Israel?',
        a: 'The Law of Return (1950)',
        exp: 'Granted immediate entry and full citizenship to any Jewish person who moved to Israel.',
      },
      {
        q: 'Between 1948 and 1951, how many Jewish immigrants arrived in Israel, doubling its population?',
        a: 'Approximately 687,000 immigrants',
        exp: 'Included European Holocaust survivors and hundreds of thousands of Jews fleeing Arab countries.',
      },
      {
        q: 'What temporary tent and tin hut camps housed hundreds of thousands of new immigrants in early Israel?',
        a: 'Ma’abarot (Transit Camps)',
        exp: 'Suffered harsh overcrowding, muddy winter floods, and strict food rationing (Tzena).',
      },
      {
        q: 'In 1949, what financial loan did the US government give to help build Israel’s early economy?',
        a: '$100 million Export-Import Bank loan',
        exp: 'Provided essential funds to buy farming equipment, build power stations, and lay water pipes.',
      },
      {
        q: 'What trade policy did Arab League states enforce against Israel from 1948 onwards?',
        a: 'The Comprehensive Arab Economic Boycott',
        exp: 'Banned all Arab trade with Israel and blacklisted foreign companies that did business with Israel.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 6: Nasser's Rise, the 1955 Gaza Raid & The Suez Crisis (1955–1956)
  // =========================================================================
  {
    num: 6,
    title: 'Nasser’s Rise, the 1955 Gaza Raid & The Suez Crisis (1955–1956)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry:
      'Why did the Suez Crisis mark a humiliating turning point for Britain and France in the Middle East?',
    examinerTrap:
      'Examiner Warning: Focus on causation for the Suez Crisis. Remember the sequence: 1. Israeli Gaza Raid (Feb 1955) -> 2. Nasser signs Czech Arms Deal (Sep 1955) -> 3. US/UK pull Aswan Dam funding (July 1956) -> 4. Nasser nationalises Suez Canal -> 5. Protocol of Sèvres secret pact -> 6. US financial pressure forces British withdrawal.',
    questions: [
      {
        q: 'In 1954, which Egyptian officer became President, promoting Arab unity and independence from Western rule?',
        a: 'Gamal Abdel Nasser',
        exp: 'Overthrew the pro-British king in 1952; vowed to stand up to Western control and support Arabs.',
      },
      {
        q: 'What Arab guerrilla fighters crossed from Egyptian Gaza to carry out sabotage and raids inside Israel?',
        a: 'Fedayeen ("Self-Sacrificers")',
        exp: 'Trained and armed by Egyptian intelligence to launch border attacks, sparking Israeli reprisals.',
      },
      {
        q: 'In February 1955, what Israeli raid into Gaza killed 38 Egyptian soldiers, shocking President Nasser?',
        a: 'Operation Black Arrow (The Gaza Raid)',
        exp: 'Showed Egypt’s military weakness and convinced Nasser he needed modern weapons immediately.',
      },
      {
        q: 'In September 1955, how did President Nasser get modern jet fighters and tanks after the Gaza raid?',
        a: 'Signed the Czechoslovak Arms Deal',
        exp: 'Bought 200 Soviet MiG-15 jets and 300 tanks via Czechoslovakia, breaking the Western arms monopoly.',
      },
      {
        q: 'What massive Nile River project did Nasser want to build to provide electricity and irrigation for Egypt?',
        a: 'The Aswan High Dam',
        exp: 'A key development project intended to modernize Egyptian agriculture and supply national power.',
      },
      {
        q: 'In July 1956, why did the United States abruptly cancel its loan to build the Aswan Dam?',
        a: 'Angry at Nasser buying Soviet arms and recognizing Communist China',
        exp: 'US Secretary of State Dulles tried to punish Nasser, prompting an immediate Egyptian response.',
      },
      {
        q: 'On 26 July 1956, Egyptian President Nasser gave a speech in Alexandria. What major asset did he nationalise?',
        a: 'The Suez Canal Company',
        exp: 'Announced canal toll fees would fund the Aswan Dam after Western loans were cancelled.',
      },
      {
        q: 'In October 1956, what secret meeting in France planned a joint war between Britain, France, and Israel?',
        a: 'The Protocol of Sèvres',
        exp: 'Secretly agreed that Israel would invade Sinai, giving Britain and France an excuse to seize the canal.',
      },
      {
        q: 'On 29 October 1956, what military operation saw Israeli paratroopers and tanks invade the Sinai Peninsula?',
        a: 'Operation Kadesh (The Sinai Invasion)',
        exp: 'Israeli forces dropped at Mitla Pass and drove across Sinai toward the Suez Canal as agreed at Sèvres.',
      },
      {
        q: 'On 30 October 1956, what staged ultimatum did Britain and France issue to Egypt and Israel?',
        a: 'Told both armies to withdraw 10 miles from the canal and let Anglo-French troops take ports',
        exp: 'A pre-planned excuse; Nasser refused, allowing British and French planes to bomb Egyptian airfields.',
      },
      {
        q: 'In November 1956, why did British Prime Minister Anthony Eden suddenly order a ceasefire at Suez?',
        a: 'US President Eisenhower threatened to wreck Britain’s currency (the pound)',
        exp: 'The US opposed the invasion and refused emergency oil and loans, forcing a humiliating British retreat.',
      },
      {
        q: 'What UN peacekeeping force was stationed in Sinai and Sharm el-Sheikh after the 1956 Suez War?',
        a: 'UNEF (UN Emergency Force)',
        exp: 'Kept Egyptian and Israeli forces apart and protected Israeli shipping through the Straits of Tiran until 1967.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 7: The Road to War: Water Disputes, Fatah & Border Escalation (1964–1967)
  // =========================================================================
  {
    num: 7,
    title: 'The Road to War: Water Disputes, Fatah & Border Escalation (1964–1967)',
    keyTopic: 'Key Topic 2: The Escalating Conflict, 1964–73',
    enquiry:
      'How did regional water rivalries and border escalation make a second Arab-Israeli war inevitable?',
    examinerTrap:
      'Examiner Warning: Do not overlook the "War over Water" (1964–66). Syrian attempts to divert the Banias and Hasbani rivers to starve Israel\'s National Water Carrier led directly to Israeli air strikes on bulldozers, creating the border hostility that exploded in 1967.',
    questions: [
      {
        q: 'In 1964, what Israeli engineering system began piping water from the Sea of Galilee south to the Negev?',
        a: 'The National Water Carrier',
        exp: 'Essential for Israeli farming and towns, but Arab states condemned it as stealing shared water.',
      },
      {
        q: 'In 1964, what Arab counter-plan tried to divert rivers in Syria and Jordan to starve Israel of water?',
        a: 'The Headwater Diversion Plan',
        exp: 'Tried to divert the Hasbani and Banias rivers; led to Israeli air strikes on Syrian bulldozers.',
      },
      {
        q: 'In January 1964, what umbrella organisation was founded at the Cairo Summit to represent Palestinians?',
        a: 'The Palestine Liberation Organization (PLO)',
        exp: 'Set up under Ahmad Shukeiri with Egyptian backing to unite Palestinian resistance groups.',
      },
      {
        q: 'In 1965, which armed Palestinian group founded by Yasser Arafat carried out its first sabotage attack in Israel?',
        a: 'Fatah ("The Conquest")',
        exp: 'Attacked the National Water Carrier on 1 January 1965, gaining popularity among Palestinian refugees.',
      },
      {
        q: 'Which high Syrian ridge overlooked Israeli farms in the Galilee, allowing Syrian gunners to shell them?',
        a: 'The Golan Heights',
        exp: 'Syrian troops in fortified hilltop bunkers regularly shelled Israeli farmers working border fields.',
      },
      {
        q: 'In February 1966, what radical military group took power in Syria, openly backing guerrilla attacks on Israel?',
        a: 'The radical Neo-Ba’athist government',
        exp: 'Gave bases and weapons to Fatah guerrillas and publicly called for the destruction of Israel.',
      },
      {
        q: 'In November 1966, what large Israeli raid into the Jordanian West Bank destroyed 40 houses in Samu?',
        a: 'The Samu Raid',
        exp: 'Launched after a landmine killed Israeli soldiers; caused outrage and destabilised King Hussein of Jordan.',
      },
      {
        q: 'On 7 April 1967, what dramatic air battle saw Israeli jets shoot down six Syrian MiG fighter planes?',
        a: 'The 7 April Air Battle',
        exp: 'Israeli jets downed six Syrian MiGs and flew over Damascus, deeply embarrassing the Syrian government.',
      },
      {
        q: 'In May 1967, what false report did the Soviet Union give Egypt about Israeli troops?',
        a: 'Falsely claimed Israel was massing troops on the Syrian border for an invasion',
        exp: 'A Soviet blunder meant to help Syria; it pushed President Nasser into a rapid military build-up.',
      },
      {
        q: 'On 16 May 1967, what demand did President Nasser send to the UN regarding peacekeepers in Sinai?',
        a: 'Demanded the immediate removal of all UNEF peacekeepers from Sinai',
        exp: 'The UN complied, removing the buffer force that had separated Egyptian and Israeli armies since 1956.',
      },
      {
        q: 'On 22 May 1967, what hostile move by Nasser cut off Israeli ships heading to the port of Eilat?',
        a: 'Closed the Straits of Tiran to Israeli shipping',
        exp: 'Cut off Israel’s oil imports through the Red Sea; Israel had warned this would be treated as an act of war.',
      },
      {
        q: 'On 30 May 1967, what military agreement placed Jordan’s army under Egyptian command?',
        a: 'The Egyptian-Jordanian Defence Pact',
        exp: 'King Hussein and Nasser joined forces, leaving Israel surrounded by hostile armies on three fronts.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 8: The Six-Day War: Pre-emptive Strike & 100-Hour Blitz (June 1967)
  // =========================================================================
  {
    num: 8,
    title: 'The Six-Day War: Pre-emptive Strike & 100-Hour Blitz (June 1967)',
    keyTopic: 'Key Topic 2: The Escalating Conflict, 1964–73',
    enquiry: 'How did Israel achieve a decisive military victory in just 132 hours in June 1967?',
    examinerTrap:
      'Examiner Warning: Many students wrongly state that Arab armies invaded Israel in June 1967. Be precise: Israel launched a pre-emptive aerial surprise attack (Operation Focus) at 07:45 on 5 June 1967 after Nasser mobilized 100,000 troops, expelled UNEF, and blockaded the Straits of Tiran.',
    questions: [
      {
        q: 'On 1 June 1967, which popular military hero was appointed Israeli Minister of Defence as war loomed?',
        a: 'Moshe Dayan',
        exp: 'Famous one-eyed general whose appointment boosted public morale and led to the decision to strike.',
      },
      {
        q: 'At 07:45 on 5 June 1967, what surprise operation began the Six-Day War?',
        a: 'Operation Focus (pre-emptive air strikes)',
        exp: 'Israeli jets attacked while Egyptian pilots were eating breakfast, destroying their air force on the ground.',
      },
      {
        q: 'How did Israeli jets avoid Egyptian radar during the opening wave of Operation Focus?',
        a: 'Flew very low over the Mediterranean Sea with complete radio silence',
        exp: 'Approached from the sea and west, catching Egyptian air bases by surprise.',
      },
      {
        q: 'How many Egyptian warplanes were destroyed on the ground within the first three hours of Operation Focus?',
        a: 'Over 300 Egyptian aircraft (out of 420)',
        exp: 'Bombed and cratered runways first, leaving Egyptian jets trapped on the tarmac to be destroyed.',
      },
      {
        q: 'Which other Arab air forces attacked Israel on 5 June 1967, only to be wiped out by nightfall?',
        a: 'Syria, Jordan, and Iraq',
        exp: 'Israeli jets counter-attacked, wiping out the Jordanian air force and most Syrian combat planes.',
      },
      {
        q: 'What crucial battlefield advantage did Israel hold for the rest of the Six-Day War?',
        a: 'Complete air supremacy across all fronts',
        exp: 'Israeli fighter-bombers could attack enemy tanks, convoys, and trenches with no threat from the air.',
      },
      {
        q: 'Between 5 and 8 June 1967, what vast desert area was taken by Israeli armored divisions from Egypt?',
        a: 'The Sinai Peninsula (and the Gaza Strip)',
        exp: 'Three Israeli tank divisions drove across Sinai, reaching the east bank of the Suez Canal.',
      },
      {
        q: 'Why did King Hussein of Jordan shell West Jerusalem on 5 June 1967 despite Israeli warnings?',
        a: 'Nasser falsely told him that Egyptian forces were marching toward Tel Aviv',
        exp: 'Believing an Arab victory was underway, Jordan opened fire with artillery across Jerusalem.',
      },
      {
        q: 'On 7 June 1967, Israeli paratroopers captured East Jerusalem. What sacred site did they reach?',
        a: 'The Western Wall in the Old City',
        exp: 'Restored Jewish access to the Western Wall for the first time in 19 years.',
      },
      {
        q: 'On 9–10 June 1967, what heavily fortified high ground did Israeli soldiers capture from Syria?',
        a: 'The Golan Heights',
        exp: 'Israeli troops scaled steep volcanic ridges under heavy fire to stop Syrian shelling of border farms.',
      },
      {
        q: 'Roughly how many Arab soldiers were killed in the Six-Day War compared to Israeli losses?',
        a: 'Around 15,000 to 20,000 Arab soldiers compared to 776 Israelis',
        exp: 'Showed the overwhelming one-sidedness of the victory won through surprise airpower.',
      },
      {
        q: 'How did the size of territory under Israeli control change after the Six-Day War?',
        a: 'Controlled territory more than tripled in size',
        exp: 'Gained strategic depth, but brought over 1 million Palestinian Arabs under Israeli military rule.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 9: The Conquered Territories, Israeli Settlements & UN Resolution 242 (1967–1973)
  // =========================================================================
  {
    num: 9,
    title: 'The Conquered Territories, Israeli Settlements & UN Resolution 242 (1967–1973)',
    keyTopic: 'Key Topic 2: The Escalating Conflict, 1964–73',
    enquiry:
      'How did the territories conquered in 1967 transform the conflict into a prolonged diplomatic stalemate?',
    examinerTrap:
      'Examiner Warning: Understand the critical linguistic ambiguity in UN Security Council Resolution 242: the English text calls for withdrawal from "territories occupied" (allowing Israel to argue for partial withdrawal to secure borders), whereas the French text reads "des territoires" (all the territories).',
    questions: [
      {
        q: 'Name the five territories captured and occupied by Israel in the June 1967 Six-Day War.',
        a: 'Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights',
        exp: 'Transformed Israel into the dominant military power in the Middle East.',
      },
      {
        q: 'In September 1967, what hardline resolution was agreed by Arab leaders meeting in Khartoum?',
        a: 'The "Three Noes" of Khartoum',
        exp: '"No peace with Israel, no recognition of Israel, no negotiations with Israel."',
      },
      {
        q: 'In November 1967, what famous UN resolution introduced the formula of "Land for Peace"?',
        a: 'UN Security Council Resolution 242',
        exp: 'Drafted by Britain’s Lord Caradon; became the foundation for all future peace negotiations.',
      },
      {
        q: 'What were the two main requirements set out in UN Resolution 242?',
        a: 'Israel pulls out of occupied land; Arab states recognise Israel’s right to live in peace',
        exp: 'Linked returning captured land directly to permanent peace and secure borders.',
      },
      {
        q: 'What wording difference between the English and French versions of Resolution 242 caused dispute?',
        a: 'English said "territories occupied" while French said "the territories" ("des territoires")',
        exp: 'Israel argued it meant some land; Arab states argued it required returning all land.',
      },
      {
        q: 'In June 1967, what immediate legal step did Israel take regarding East Jerusalem?',
        a: 'Formally annexed East Jerusalem into a united Israeli capital',
        exp: 'Bulldozed the Moroccan Quarter to make an open plaza before the Western Wall; rejected by the UN.',
      },
      {
        q: 'Roughly how many additional Palestinian refugees were displaced by the 1967 Six-Day War?',
        a: 'Approximately 300,000 Palestinian Arabs',
        exp: 'Over 200,000 fled across the Jordan River into Jordan, worsening the refugee crisis.',
      },
      {
        q: 'After 1967, what controversial building policy did Israel begin in the West Bank and Golan?',
        a: 'Building civilian Jewish settlements (outposts)',
        exp: 'Started as military outposts along the Jordan Valley; grew into permanent civilian towns.',
      },
      {
        q: 'What religious Jewish movement was set up after 1967 to build settlements across biblical Judea and Samaria?',
        a: 'Gush Emunim ("Bloc of the Faithful")',
        exp: 'Believed settling the whole biblical Land of Israel was a religious duty that could not be stopped.',
      },
      {
        q: 'From 1968, what massive sand wall and bunker chain did Israel build along the Suez Canal?',
        a: 'The Bar-Lev Line',
        exp: 'Cost $300 million; built with 25-metre sandbanks to stop Egyptian troops crossing the canal.',
      },
      {
        q: 'From 1969 to 1970, what undeclared fighting took place along the Suez Canal between Egypt and Israel?',
        a: 'The War of Attrition',
        exp: 'Daily artillery shelling and commando raids met by deep Israeli air strikes into Egypt.',
      },
      {
        q: 'In 1970, which superpower sent missile crews and pilots to protect Egypt along the Suez Canal?',
        a: 'The Soviet Union (USSR)',
        exp: 'Built a dense wall of SAM anti-aircraft missiles and sent Soviet pilots who fought Israeli jets.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 10: Palestinian Resistance, Hijackings & Black September (1968–1972)
  // =========================================================================
  {
    num: 10,
    title: 'Palestinian Resistance, Hijackings & Black September (1968–1972)',
    keyTopic: 'Key Topic 2: The Escalating Conflict, 1964–73',
    enquiry:
      'Why did Palestinian militant factions turn to international terrorism between 1968 and 1972?',
    examinerTrap:
      'Examiner Warning: Ensure you understand the distinction between Fatah (led by Yasser Arafat, focusing on guerrilla warfare inside the region) and the Marxist PFLP (Popular Front for the Liberation of Palestine, led by George Habash, which pioneered international hijackings to capture global media attention).',
    questions: [
      {
        q: 'In March 1968, what battle in Jordan turned Yasser Arafat and Fatah into popular resistance heroes?',
        a: 'The Battle of Karameh',
        exp: 'Palestinian fighters fought hard against an Israeli raid, inspiring thousands of young Arabs to join.',
      },
      {
        q: 'In February 1969, who was elected Chairman of the PLO, taking control of Palestinian resistance?',
        a: 'Yasser Arafat',
        exp: 'Marked the takeover of the PLO by armed guerrilla fighters instead of old Arab League diplomats.',
      },
      {
        q: 'Why did the presence of armed PLO fighters cause major conflict with King Hussein of Jordan by 1970?',
        a: 'The PLO acted like a "state within a state", setting up checkpoints in Amman',
        exp: 'Armed guerrillas broke Jordanian laws, collected taxes, and brought Israeli retaliatory raids on Jordan.',
      },
      {
        q: 'Which radical Palestinian group led by George Habash pioneered hijacking international airliners?',
        a: 'The PFLP (Popular Front for the Liberation of Palestine)',
        exp: 'Carried out hijackings to grab world headlines and put the Palestinian cause on global TV screens.',
      },
      {
        q: 'In September 1970, what multi-plane hijacking saw three airliners blown up on a desert airstrip in Jordan?',
        a: 'The Dawson’s Field Hijackings',
        exp: 'PFLP militants held 300 passengers hostage before blowing up the empty jets in front of world media.',
      },
      {
        q: 'In September 1970, what civil war erupted as Jordan’s army moved to crush the PLO?',
        a: 'Black September (The Jordanian Civil War)',
        exp: 'King Hussein ordered tanks and troops into Palestinian camps in Amman, killing thousands of fighters.',
      },
      {
        q: 'In September 1970, which neighbouring country sent tanks into Jordan to help the PLO, before retreating?',
        a: 'Syria',
        exp: 'Syrian tanks entered northern Jordan but pulled back when Jordan’s air force attacked them.',
      },
      {
        q: 'After being driven out of Jordan in 1971, where did Arafat and the PLO set up their new headquarters?',
        a: 'Lebanon (in Beirut and southern border towns)',
        exp: 'Built a strong base in southern Lebanon ("Fatahland"), launching rocket attacks into northern Israel.',
      },
      {
        q: 'What secret group within Fatah was created to carry out revenge attacks abroad after being expelled from Jordan?',
        a: 'The Black September Organization',
        exp: 'Murdered Jordan’s Prime Minister Wasfi Tel in Cairo in 1971 and planned the Munich Olympic attack.',
      },
      {
        q: 'In September 1972, what terror attack by Black September killed 11 Israeli athletes at a sports event?',
        a: 'The Munich Olympics Massacre',
        exp: 'Militants broke into the Olympic Village, took Israeli athletes hostage, and killed them at the airfield.',
      },
      {
        q: 'Following the Munich attack, what secret Mossad operation was ordered by Golda Meir to hunt down attackers?',
        a: 'Operation Wrath of God',
        exp: 'Israeli undercover squads tracked down and assassinated suspected Black September organizers across Europe.',
      },
      {
        q: 'What mixed international result came from Palestinian hijackings and the Munich attack?',
        a: 'Brought world condemnation for terror, but put Palestinian national identity on the world stage',
        exp: 'Forced Western countries to realise there could be no peace without dealing with the Palestinian issue.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 11: The War of Attrition & The Yom Kippur War (1969–1973)
  // =========================================================================
  {
    num: 11,
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    keyTopic: 'Key Topic 2: The Escalating Conflict, 1964–73',
    enquiry:
      'Why did the surprise attack on Yom Kippur in 1973 shatter Israeli military complacency?',
    examinerTrap:
      'Examiner Warning: In Paper 2, questions on the 1973 Yom Kippur War often ask about its consequences. Always emphasize the psychological turning point: although Israel achieved military victory in the final days (encircling the Egyptian Third Army), the initial collapse shattered the myth of Israeli invincibility and opened the door to diplomacy.',
    questions: [
      {
        q: 'In September 1970, who became President of Egypt following the sudden death of Gamal Abdel Nasser?',
        a: 'Anwar Sadat',
        exp: 'Initially seen as weak, Sadat planned a bold strategy to break the deadlock and reclaim Sinai.',
      },
      {
        q: 'On 6 October 1973, which major Jewish and Muslim holy occasions coincided when Egypt and Syria attacked?',
        a: 'Yom Kippur (Day of Atonement) and the holy month of Ramadan',
        exp: 'Israel was caught off guard; radio stations were silent, soldiers were fasting, and call-ups were delayed.',
      },
      {
        q: 'On 6 October 1973, what code name was given to Egypt’s assault crossing of the Suez Canal?',
        a: 'Operation Badr',
        exp: '100,000 Egyptian soldiers crossed the canal in boats under cover of a huge 2,000-gun artillery bombardment.',
      },
      {
        q: 'How did Egyptian engineers quickly break through Israel’s 25-metre high Bar-Lev sand wall along the canal?',
        a: 'Used high-pressure water hoses to wash away the sand ramparts',
        exp: 'Blasted gaps in the sand wall within hours, allowing pontoon bridges to carry tanks across into Sinai.',
      },
      {
        q: 'Which Soviet-supplied anti-aircraft missiles protected Egyptian troops and shot down Israeli jets over Sinai?',
        a: 'Mobile Soviet SAM missiles (SAM-6 Gainful)',
        exp: 'Created a deadly missile shield 10km east of the canal, downing dozens of Israeli jets in the first three days.',
      },
      {
        q: 'On 6–7 October 1973, what fierce tank battle stopped 1,400 Syrian tanks on the Golan Heights?',
        a: 'The Battle of the "Valley of Tears"',
        exp: 'A small force of Israeli tanks held off Syrian armored waves near Quneitra until reinforcements arrived.',
      },
      {
        q: 'Who were the Prime Minister and Minister of Defence of Israel during the October 1973 War?',
        a: 'Golda Meir (Prime Minister) and Moshe Dayan (Defence Minister)',
        exp: 'Both faced heavy public anger for ignoring war warnings and suffering huge early casualties.',
      },
      {
        q: 'In mid-October 1973, what emergency US military airlift flew tanks and ammunition to re-arm Israel?',
        a: 'Operation Nickel Grass',
        exp: 'Flew 22,000 tons of vital weapons and spare parts, allowing Israel to launch a decisive counter-offensive.',
      },
      {
        q: 'Which Israeli general led tanks across the Suez Canal into mainland Egypt, trapping Egypt’s Third Army?',
        a: 'General Ariel Sharon',
        exp: 'Found a gap between Egyptian armies, crossed to the west bank of the canal, and cut off Egyptian troops.',
      },
      {
        q: 'In October 1973, what economic weapon did Arab oil nations (OAPEC) use against the US and Netherlands?',
        a: 'The 1973 Arab Oil Embargo',
        exp: 'Cut oil production and stopped shipments to Israel’s allies, causing world oil prices to quadruple.',
      },
      {
        q: 'In late October 1973, what UN resolution enforced a ceasefire to halt the Yom Kippur War?',
        a: 'UN Resolution 338',
        exp: 'Enforced by the UN as the Soviet Union threatened to send troops to save Egypt’s trapped army.',
      },
      {
        q: 'What official Israeli inquiry investigated the military mistakes and intelligence failures of the 1973 war?',
        a: 'The Agranat Commission',
        exp: 'Blamed top generals for being unprepared, leading to the resignation of Prime Minister Golda Meir in 1974.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 12: The 1973 Oil Crisis & Kissinger's Shuttle Diplomacy (1973–1975)
  // =========================================================================
  {
    num: 12,
    title: 'The 1973 Oil Crisis & Kissinger’s Shuttle Diplomacy (1973–1975)',
    keyTopic: 'Key Topic 3: Attempts at a Solution, 1974–95',
    enquiry:
      'How did the 1973 oil embargo and American shuttle diplomacy transform Middle East diplomacy?',
    examinerTrap:
      'Examiner Warning: Recognize the global impact of the 1973 Oil Crisis. Arab oil power forced Western European nations and Japan to adopt a far more pro-Arab diplomatic stance, pressuring US Secretary of State Henry Kissinger to intervene directly through "shuttle diplomacy".',
    questions: [
      {
        q: 'What group of Arab oil-exporting nations organised the 1973 oil embargo against Israel’s allies?',
        a: 'OAPEC (Organization of Arab Petroleum Exporting Countries)',
        exp: 'Led by King Faisal of Saudi Arabia; used crude oil as a political weapon to pressure the West.',
      },
      {
        q: 'By how much did world crude oil prices rise between October 1973 and January 1974?',
        a: 'Prices quadrupled (surged from $3 to $12 a barrel)',
        exp: 'Caused petrol queues, speed limits, heating bans, and economic troubles across Western nations.',
      },
      {
        q: 'How did the 1973 oil crisis change attitudes toward the Middle East in Western Europe and Japan?',
        a: 'Forced Western nations to become more pro-Arab to protect their oil supplies',
        exp: 'Heavily reliant on Arab oil, European governments urged Israel to give back occupied land.',
      },
      {
        q: 'From 1974 to 1975, which US Secretary of State flew between Middle Eastern capitals to arrange deals?',
        a: 'Henry Kissinger',
        exp: 'Flew constantly between Cairo, Jerusalem, and Damascus in his jet, pioneering "shuttle diplomacy".',
      },
      {
        q: 'In January 1974, what first military pull-back agreement was signed between Israel and Egypt?',
        a: 'The Sinai I Accord (Sinai Disengagement Agreement)',
        exp: 'Both armies pulled back from the canal, creating a UN buffer zone and freeing the trapped Egyptian army.',
      },
      {
        q: 'In May 1974, what disengagement deal saw Israel pull back from Quneitra on the Syrian front?',
        a: 'The Golan Disengagement Agreement (UNDOF)',
        exp: 'Israel withdrew from areas taken in 1973, and UN peacekeepers (UNDOF) were placed on the Golan border.',
      },
      {
        q: 'In June 1975, which vital waterway was cleared of wartime wrecks and reopened by President Sadat?',
        a: 'The Suez Canal',
        exp: 'Reopened to world shipping on the eighth anniversary of the 1967 war after being shut for 8 years.',
      },
      {
        q: 'In September 1975, what second interim deal saw Israel hand back the Giddi and Mitla mountain passes in Sinai?',
        a: 'The Sinai II Accord',
        exp: 'Israel pulled further back in Sinai and gave back the Abu Rudeis oilfields in exchange for US aid.',
      },
      {
        q: 'Under the Sinai II Accord in 1975, what promise did President Sadat make about using military force?',
        a: 'Pledged that conflicts between Egypt and Israel would be solved peacefully',
        exp: 'Began detaching Egypt from the Arab war alliance, removing the biggest military threat to Israel.',
      },
      {
        q: 'What was Henry Kissinger’s main Cold War goal during his shuttle diplomacy in the Middle East?',
        a: 'To push out Soviet influence and make the US the main peacemaker',
        exp: 'Pulled Egypt away from Soviet influence and into a close partnership with the United States.',
      },
      {
        q: 'Which Israeli Prime Minister signed the 1974 and 1975 disengagement deals with Egypt and Syria?',
        a: 'Yitzhak Rabin',
        exp: 'Took over as Labour Prime Minister after Golda Meir resigned; agreed to step-by-step withdrawals.',
      },
      {
        q: 'Why were Syria, Iraq, and the PLO angry with Sadat for signing deals with Israel and the US?',
        a: 'Accused Sadat of breaking Arab unity and abandoning the Palestinians for Egyptian gain',
        exp: 'Deepened the divide between moderate Egypt and hardline Arab states that refused to compromise.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 13: Sadat's Knesset Initiative, Camp David & The 1979 Peace Treaty (1977–1979)
  // =========================================================================
  {
    num: 13,
    title: 'Sadat’s Knesset Initiative, Camp David & The 1979 Peace Treaty (1977–1979)',
    keyTopic: 'Key Topic 3: Attempts at a Solution, 1974–95',
    enquiry:
      'Why was the 1979 Egypt-Israel Peace Treaty both a historic triumph and a regional catastrophe?',
    examinerTrap:
      'Examiner Warning: When explaining the importance of the 1979 Egypt-Israel Peace Treaty, analyze both sides: 1. Huge success for Israel (neutralized Egypt, eliminating two-front war risk) and Egypt (recovered Sinai and US economic aid); 2. Catastrophe for Arab unity (Egypt expelled from Arab League, Sadat assassinated in 1981, Palestinian autonomy ignored).',
    questions: [
      {
        q: 'In May 1977, which right-wing Likud leader was elected Prime Minister of Israel, ending 29 years of Labour rule?',
        a: 'Menachem Begin',
        exp: 'Former Irgun commander who strongly believed in holding onto the West Bank (Judea and Samaria).',
      },
      {
        q: 'In November 1977, what shocking announcement did President Anwar Sadat make to Egypt’s Parliament?',
        a: 'Announced he was ready to travel to the Israeli Knesset in Jerusalem to talk peace',
        exp: 'Broke 30 years of Arab refusal to meet Israeli leaders, showing great personal bravery.',
      },
      {
        q: 'In November 1977, Egyptian President Sadat visited Jerusalem. What historic speech did he make?',
        a: 'Addressed the Israeli Knesset proposing permanent peace',
        exp: 'Stated "No more war, no more bloodshed" in front of Israeli leaders, opening direct peace talks.',
      },
      {
        q: 'In September 1978, which US President invited Sadat and Begin to his Maryland retreat for peace talks?',
        a: 'President Jimmy Carter',
        exp: 'Led 13 days of tense round-the-clock negotiations at Camp David to stop the talks from collapsing.',
      },
      {
        q: 'In September 1978, what framework agreement was signed by Sadat and Begin at the White House?',
        a: 'The Camp David Accords',
        exp: 'Set out a plan for an Egypt-Israel peace treaty and temporary self-government for Palestinians.',
      },
      {
        q: 'On 26 March 1979, what historic treaty was signed by Egypt and Israel on the White House lawn?',
        a: 'The Egypt-Israel Peace Treaty (The Treaty of Washington)',
        exp: 'The first peace treaty between Israel and an Arab country in modern history.',
      },
      {
        q: 'Under the 1979 peace treaty, what large territory did Israel return to Egypt?',
        a: 'The entire Sinai Peninsula',
        exp: 'Israel removed all its military bases, airfields, and civilian settlements in Sinai, including Yamit.',
      },
      {
        q: 'What main promises did Egypt give to Israel in exchange for the return of the Sinai in 1979?',
        a: 'Full diplomatic peace, open borders, and free passage through the Suez Canal and Tiran',
        exp: 'Exchanged ambassadors and opened direct trade, permanently ending the threat of an Egyptian invasion.',
      },
      {
        q: 'What international award was given jointly to Anwar Sadat and Menachem Begin in 1978?',
        a: 'The Nobel Peace Prize',
        exp: 'Honoured their courage in overcoming decades of hostility to sign the Camp David agreement.',
      },
      {
        q: 'Why did Palestinian leaders reject the Camp David Accords and the 1979 treaty?',
        a: 'It offered only limited local self-rule and ignored an independent Palestinian state',
        exp: 'Felt Begin gave back Sinai only so Israel could keep permanent control over the West Bank.',
      },
      {
        q: 'How did Arab League nations punish Egypt for signing the 1979 peace treaty with Israel?',
        a: 'Expelled Egypt from the Arab League, cut ties, and moved headquarters to Tunis',
        exp: 'Treated Egypt as a traitor to the Arab cause for making a separate peace with Israel.',
      },
      {
        q: 'On 6 October 1981, what happened to President Anwar Sadat during a military parade in Cairo?',
        a: 'Assassinated by Egyptian Islamic extremist soldiers',
        exp: 'Gunmen fired on his review stand, furious about his peace treaty with Israel.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 14: The Palestinian Issue, Operation Peace for Galilee & The Lebanon War (1974–1985)
  // =========================================================================
  {
    num: 14,
    title: 'The Palestinian Issue, Operation Peace for Galilee & The Lebanon War (1974–1985)',
    keyTopic: 'Key Topic 3: Attempts at a Solution, 1974–95',
    enquiry:
      'Why did Israel’s 1982 invasion of Lebanon prove a military quagmire and political catastrophe?',
    examinerTrap:
      "Examiner Warning: Clearly distinguish between the military aim of the 1982 Lebanon invasion (to secure a 40km buffer against PLO Katyusha rockets) and Ariel Sharon's expanded political aim (besieging Beirut to expel the PLO and install a pro-Israeli Christian Maronite government). The Sabra and Shatila massacre severely damaged Israel's international reputation.",
    questions: [
      {
        q: 'In November 1974, what famous words did Yasser Arafat say at the end of his UN speech in New York?',
        a: '"Do not let the olive branch fall from my hand"',
        exp: 'Offered world leaders a choice between supporting peaceful diplomacy or armed resistance.',
      },
      {
        q: 'In November 1974, what official diplomatic status did the UN General Assembly give to the PLO?',
        a: 'Permanent UN Observer Status (Resolution 3237)',
        exp: 'Recognized the PLO as the official representative of the Palestinian people on the world stage.',
      },
      {
        q: 'In March 1978, what Israeli military operation pushed into southern Lebanon to clear PLO bases?',
        a: 'Operation Litani',
        exp: 'Launched after a bus attack near Tel Aviv; led to UN peacekeepers (UNIFIL) being placed in southern Lebanon.',
      },
      {
        q: 'In June 1982, what invasion of Lebanon did the Israeli government launch after an attack on its UK ambassador?',
        a: 'Operation Peace for Galilee (The First Lebanon War)',
        exp: 'Launched after Abu Nidal gunmen shot Israeli ambassador Shlomo Argov in London.',
      },
      {
        q: 'What was the original goal of Operation Peace for Galilee given to the Israeli public and cabinet?',
        a: 'To push PLO rocket launchers 40 kilometres north of Israel’s border',
        exp: 'Promised to protect towns in northern Galilee from cross-border rocket shelling.',
      },
      {
        q: 'Which Israeli Defence Minister expanded the war, driving tanks all the way to Beirut?',
        a: 'Ariel Sharon',
        exp: 'Aimed to destroy the PLO completely and put a friendly Christian government in power in Lebanon.',
      },
      {
        q: 'In summer 1982, what city did the Israeli army surround and shell to force out the PLO?',
        a: 'West Beirut (The Siege of Beirut)',
        exp: 'Cut off water and power and bombed buildings for weeks until the PLO agreed to leave Lebanon.',
      },
      {
        q: 'In August 1982, where were Yasser Arafat and thousands of PLO fighters evacuated to by sea?',
        a: 'Tunis (Tunisia) and other Arab countries',
        exp: 'Evacuated on ships under international watch, moving the PLO leadership far away from Israel’s borders.',
      },
      {
        q: 'In September 1982, what horrific massacre of Palestinian refugees took place in Beirut refugee camps?',
        a: 'The Sabra and Shatila Massacre',
        exp: 'Lebanese Christian Phalangist militia entered the camps and murdered between 800 and 2,000 civilians.',
      },
      {
        q: 'What Israeli judicial inquiry investigated the Sabra and Shatila massacre in 1983?',
        a: 'The Kahan Commission',
        exp: 'Found Ariel Sharon personally responsible for failing to prevent the killings, forcing him to resign as Defence Minister.',
      },
      {
        q: 'In September 1982, what huge protest in Tel Aviv saw 400,000 Israelis demand an inquiry into Beirut?',
        a: 'The Peace Now Rally',
        exp: 'Nearly 10% of Israel’s population protested in Tel Aviv against the war and the refugee camp massacres.',
      },
      {
        q: 'What radical Iranian-backed Shia militant group was formed in Lebanon to fight Israeli troops?',
        a: 'Hezbollah ("Party of God")',
        exp: 'Used suicide bombs and ambushes, forcing Israel to pull back into a narrow southern security border strip by 1985.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 15: The First Palestinian Intifada & The Rise of Hamas (1987–1993)
  // =========================================================================
  {
    num: 15,
    title: 'The First Palestinian Intifada & The Rise of Hamas (1987–1993)',
    keyTopic: 'Key Topic 3: Attempts at a Solution, 1974–95',
    enquiry:
      'How did the First Intifada fundamentally transform the Israeli-Palestinian balance of power?',
    examinerTrap:
      'Examiner Warning: Emphasize the spontaneous grassroots nature of the First Intifada. It was not planned or launched by Yasser Arafat and the PLO in Tunis; it erupted organically from young Palestinians inside the occupied territories living under military rule, catching both Israel and the PLO leadership by complete surprise.',
    questions: [
      {
        q: 'On 8 December 1987, what traffic accident in Gaza sparked the spontaneous outbreak of the First Intifada?',
        a: 'An Israeli army truck hit Palestinian cars in Jabalya camp, killing 4 workers',
        exp: 'Crowds believed the crash was deliberate; riots erupted and quickly spread across Gaza and the West Bank.',
      },
      {
        q: 'What is the literal translation of the Arabic word "Intifada"?',
        a: '"Shaking off" (The Uprising)',
        exp: 'Meant Palestinians shaking off fear, military curfews, and Israeli occupation.',
      },
      {
        q: 'What simple weapons used by Palestinian youths led them to be called "Children of the Stones"?',
        a: 'Stones, slingshots, and petrol bombs',
        exp: 'Created dramatic world TV images of unarmed youths facing heavily armed Israeli soldiers in tanks.',
      },
      {
        q: 'What local grassroots committee organized strikes, boycotts, and leaflets during the First Intifada?',
        a: 'The UNLU (Unified National Leadership of the Uprising)',
        exp: 'Local activists from Fatah and other groups coordinated protests inside the territories, separate from Tunis.',
      },
      {
        q: 'Name two non-violent protest actions used by Palestinians during the First Intifada.',
        a: 'Shop strikes, refusing to pay Israeli taxes, and boycotting Israeli goods',
        exp: 'Aimed to make the occupied territories impossible to govern and hurt Israel’s economy.',
      },
      {
        q: 'What controversial military policy was used by Israeli Defence Minister Yitzhak Rabin to stop stone-throwers?',
        a: 'The "Iron Fist" policy ("force, might, and beatings")',
        exp: 'Soldiers were ordered to break bones, demolish houses, and place towns under round-the-clock curfews.',
      },
      {
        q: 'In December 1987, what Islamist militant group was founded in Gaza by Sheikh Ahmed Yassin?',
        a: 'Hamas (Islamic Resistance Movement)',
        exp: 'Formed from the Muslim Brotherhood; its charter called for an Islamic state across all historic Palestine.',
      },
      {
        q: 'Why did the rise of Hamas create a major political problem for Yasser Arafat and the PLO?',
        a: 'Hamas rejected any peace deal with Israel, challenging the secular leadership of the PLO',
        exp: 'Gained popularity through charity and schools while carrying out attacks that threatened peace talks.',
      },
      {
        q: 'In July 1988, what historic announcement did King Hussein of Jordan make about the West Bank?',
        a: 'Severed all legal and administrative ties with the West Bank',
        exp: 'Gave up Jordan’s claims to the territory, leaving the PLO as the sole body responsible for Palestinian statehood.',
      },
      {
        q: 'During the six years of the First Intifada (1987–1993), roughly how many people were killed?',
        a: 'Over 1,000 Palestinians and around 160 Israelis',
        exp: 'Showed both sides that military force alone could not crush Palestinian national feelings.',
      },
      {
        q: 'How did international TV coverage of the First Intifada damage Israel’s image abroad?',
        a: 'Turned world sympathy toward Palestinians and showed Israel as a harsh military occupier',
        exp: 'Viewers saw soldiers with rifles facing children throwing stones, increasing pressure for peace.',
      },
      {
        q: 'What major lesson did the First Intifada teach Israeli leaders like Yitzhak Rabin?',
        a: 'Permanent military rule over millions of Palestinians was impossible to maintain',
        exp: 'Convinced Rabin that Israel had to find a political compromise and talk directly to Palestinian leaders.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 16: Superpower Realignment, Madrid & The Oslo Peace Accords (1988–1995)
  // =========================================================================
  {
    num: 16,
    title: 'Superpower Realignment, Madrid & The Oslo Peace Accords (1988–1995)',
    keyTopic: 'Key Topic 3: Attempts at a Solution, 1974–95',
    enquiry:
      'Why did the Oslo peace process generate historic euphoria before collapsing into renewed conflict?',
    examinerTrap:
      'Examiner Warning: For the 1993 Oslo Accords, candidates must know the structural details of Oslo II (1995): the division of the West Bank into Area A (full Palestinian civil and security control, 3% of land), Area B (Palestinian civil, joint Israeli security, 24%), and Area C (full Israeli civil and security control, 73%, including all settlements).',
    questions: [
      {
        q: 'In December 1988, what three major concessions did Yasser Arafat announce at the UN in Geneva?',
        a: 'Rejected all terrorism, accepted UN Resolution 242, and recognized Israel’s right to exist',
        exp: 'Met US conditions, allowing the United States to open direct diplomatic talks with the PLO.',
      },
      {
        q: 'How did the fall of the Soviet Union in 1989–91 weaken the diplomatic position of the PLO?',
        a: 'Lost their main superpower supporter and weapons supplier',
        exp: 'Left the United States as the only superpower and allowed 1 million Soviet Jews to move to Israel.',
      },
      {
        q: 'During the 1990–91 Gulf War, which Iraqi leader did Yasser Arafat support, costing him Arab funding?',
        a: 'Saddam Hussein',
        exp: 'Angered rich Gulf states like Kuwait and Saudi Arabia, which stopped funding the PLO and expelled Palestinians.',
      },
      {
        q: 'In October 1991, what peace conference brought Arab states and Israel to direct talks in Spain?',
        a: 'The Madrid Peace Conference',
        exp: 'Chaired by the US and USSR; brought Israeli, Arab, and Palestinian negotiators into the same room for the first time.',
      },
      {
        q: 'In June 1992, which Israeli Labour leader was elected Prime Minister promising to make peace?',
        a: 'Yitzhak Rabin',
        exp: 'Defeated Likud leader Shamir, slowed settlement building, and allowed secret peace talks to begin.',
      },
      {
        q: 'In early 1993, in which European capital did Israeli and PLO negotiators hold secret peace meetings?',
        a: 'Oslo (Norway)',
        exp: 'Hosted quietly by Norwegian diplomats in country houses, avoiding the media and hardline politicians.',
      },
      {
        q: 'In September 1993, what historic letters were signed by Rabin and Arafat before the White House handshake?',
        a: 'The Letters of Mutual Recognition',
        exp: 'The PLO recognized Israel’s right to exist; Israel recognized the PLO as the voice of the Palestinian people.',
      },
      {
        q: 'On 13 September 1993, Rabin and Arafat shook hands in Washington. What agreement was signed?',
        a: 'The Oslo I Accord (Declaration of Principles)',
        exp: 'Agreed on 5 years of temporary Palestinian self-government, starting in Gaza and the West Bank town of Jericho.',
      },
      {
        q: 'What new governing body was created under the Oslo Accords to run Palestinian civilian areas?',
        a: 'The Palestinian Authority (PA)',
        exp: 'Set up in 1994; Yasser Arafat returned from exile to become its first elected President.',
      },
      {
        q: 'In October 1994, which neighbouring Arab country signed a formal peace treaty with Israel?',
        a: 'Jordan (King Hussein)',
        exp: 'Solved water-sharing and border disputes, making Jordan the second Arab state to make peace with Israel.',
      },
      {
        q: 'Under the 1995 Oslo II Accord, what three administrative areas was the West Bank divided into?',
        a: 'Area A (Palestinian control), Area B (joint control), and Area C (full Israeli control)',
        exp: 'Left the West Bank divided into separate pockets; Area C contained all Jewish settlements and main roads.',
      },
      {
        q: 'On 4 November 1995, which Israeli Prime Minister was assassinated at a peace rally in Tel Aviv?',
        a: 'Yitzhak Rabin',
        exp: 'Shot dead by right-wing Jewish extremist Yigal Amir, dealing a devastating blow to the peace process.',
      },
    ],
  },
];

module.exports = { CME_PEARSON_QUIZ_BANK };
