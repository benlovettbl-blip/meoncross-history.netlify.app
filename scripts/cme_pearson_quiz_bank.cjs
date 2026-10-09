/**
 * cme_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 2 (1HI0/2B / Option P5)
 * Conflict in the Middle East, 1945–1995
 * Master Knowledge Retrieval Bank (16 Enquiries x 8 Questions = 128 Questions).
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
        q: 'Why could Britain no longer afford to govern Palestine after World War Two?',
        a: 'Heavy post-war debt and the cost of keeping 100,000 soldiers under attack',
        exp: 'Britain faced rationing at home and could not afford an expensive military occupation.',
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
        exp: 'Coordinated widespread sabotage of railways, bridges, and radar stations across Palestine.',
      },
      {
        q: 'On 22 July 1946, the Irgun bombed the King David Hotel. Why was this building targeted?',
        a: 'It was the headquarters of the British government and army in Palestine',
        exp: 'Irgun smuggled explosives in milk churns to destroy British command and secret intelligence files.',
      },
      {
        q: 'How many people were killed in the July 1946 King David Hotel bombing?',
        a: '91 people killed (British, Arab, and Jewish staff)',
        exp: 'Caused international shock and shattered British domestic resolve to remain in Palestine.',
      },
      {
        q: 'In July 1947, what event saw two British soldiers hanged in retaliation for executed militants?',
        a: 'The "Sergeants Affair"',
        exp: 'Irgun hanged Sergeants Paice and Martin in an orange grove and booby-trapped the bodies.',
      },
      {
        q: 'How did the British public react in summer 1947 following the Sergeants Affair?',
        a: 'Anti-Jewish riots broke out in UK cities; newspapers demanded troops come home',
        exp: 'Convinced the British public that maintaining the Palestine Mandate was no longer worth British lives.',
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
    enquiry: 'Why did the UN Partition Plan ignite civil war across Palestine in 1947?',
    examinerTrap:
      'Examiner Warning: Always memorise the exact land percentages under UN Resolution 181: 56% for the Jewish state and 43% for the Arab state (with Jerusalem internationalised). Explain that Arabs rejected the plan because Jews owned less than 10% of the land and made up only one-third of the population.',
    questions: [
      {
        q: 'On 29 November 1947, what landmark resolution was passed by the UN General Assembly?',
        a: 'UN Resolution 181 (The Partition Plan)',
        exp: 'Voted 33 to 13 to partition Palestine into separate Arab and Jewish states with an international Jerusalem.',
      },
      {
        q: 'Under UN Resolution 181, what percentage of land was given to the proposed Jewish state?',
        a: 'Approximately 56% of Palestine',
        exp: 'Included fertile coastal plains and the Negev desert, providing room for mass immigration.',
      },
      {
        q: 'Under UN Resolution 181, what percentage of land was given to the proposed Arab state?',
        a: 'Approximately 43% of Palestine',
        exp: 'Comprised the central highlands, Galilee, and Gaza, but lacked major deep-water ports.',
      },
      {
        q: 'Under UN Resolution 181, what special international status was given to Jerusalem?',
        a: 'An international zone (corpus separatum) run by the UN',
        exp: 'Designed to protect holy sites sacred to Jews, Christians, and Muslims from control by either side.',
      },
      {
        q: 'Why did Arab leaders and neighbouring Arab states reject UN Resolution 181?',
        a: 'Giving 56% of the land to a one-third minority was seen as unjust',
        exp: 'Argued it violated self-determination and rewarded foreign immigration at the expense of native Arabs.',
      },
      {
        q: 'On 30 November 1947, the morning after the UN vote, what broke out across Palestine?',
        a: 'Civil war between Arab and Jewish communities',
        exp: 'Arab fighters ambushed Jewish buses; Haganah mobilized to defend isolated settlements.',
      },
      {
        q: 'In April 1948, what military plan did the Haganah launch to secure roads and villages?',
        a: 'Plan Dalet (Plan D)',
        exp: 'Aimed to take control of strategic roads, villages, and towns within the Jewish state before British departure.',
      },
      {
        q: 'On 9 April 1948, what notorious attack took place at the Arab village of Deir Yassin?',
        a: 'The Deir Yassin Massacre',
        exp: 'Irgun and Lehi fighters killed over 100 villagers, spreading panic that caused mass Palestinian flight.',
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
    enquiry: 'How did Israel survive and defeat the invasion by five Arab armies in 1948–49?',
    examinerTrap:
      'Examiner Warning: Do not portray the 1948 war as a simple "David vs Goliath" narrative after the first truce. While Israel was outnumbered in population, the IDF had unified command, superior European military training, and received critical shipments of Czech heavy weapons that outmatched divided Arab armies.',
    questions: [
      {
        q: 'On 14 May 1948, who announced the creation of the State of Israel in Tel Aviv?',
        a: 'David Ben-Gurion',
        exp: 'Read the Declaration of Independence as the British Mandate expired, becoming Israel’s first Prime Minister.',
      },
      {
        q: 'On 15 May 1948, which five Arab states invaded the newly declared State of Israel?',
        a: 'Egypt, Transjordan, Syria, Iraq, and Lebanon',
        exp: 'Invaded to destroy the new Jewish state and prevent the partition of Arab Palestine.',
      },
      {
        q: 'On 26 May 1948, what national army was created to unite all Jewish fighting forces?',
        a: 'The Israeli Defence Forces (IDF / Tzahal)',
        exp: 'Unified Haganah, Palmach, Irgun, and Lehi under central government authority and command.',
      },
      {
        q: 'Which elite, British-trained Arab army took control of East Jerusalem and the West Bank in 1948?',
        a: 'The Arab Legion (Transjordan)',
        exp: 'Led by British officer Glubb Pasha; proved to be the most effective Arab fighting force in 1948.',
      },
      {
        q: 'During the first UN ceasefire in summer 1948, where did Israel buy vital heavy weapons and planes?',
        a: 'Czechoslovakia',
        exp: 'Imported rifles, machine guns, artillery, and Avia S-199 fighter aircraft, shifting the military balance.',
      },
      {
        q: 'Give two main reasons why the Arab armies failed to defeat Israel during 1948–49.',
        a: 'Divided Arab leadership and no united military command',
        exp: 'King Abdullah of Jordan wanted the West Bank, while Egypt and Syria distrusted his territorial ambitions.',
      },
      {
        q: 'At the end of the 1948–49 war, what percentage of Palestine was controlled by Israel?',
        a: '78% of Palestine',
        exp: 'Gained 22% more land than allocated under the 1947 UN Partition Plan, securing defensible borders.',
      },
      {
        q: 'How was the city of Jerusalem divided under the 1949 Rhodes armistice agreements?',
        a: 'West Jerusalem held by Israel; East Jerusalem and Old City held by Jordan',
        exp: 'Divided by barbed wire and concrete walls; Jewish residents were cut off from the Western Wall.',
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
      'Why did the 1948 war create a permanent refugee crisis and transform Israel’s demographics?',
    examinerTrap:
      'Examiner Warning: Balance the historical causes of the Palestinian refugee flight: historians identify voluntary evacuation to escape fighting, Arab radio broadcasts, and psychological panic alongside active expulsions and demolitions under Plan Dalet (e.g. Lydda, Ramle, and Deir Yassin).',
    questions: [
      {
        q: 'During the 1948–49 war, roughly how many Palestinian Arabs were driven from or fled their homes?',
        a: 'Approximately 700,000 to 750,000 Palestinian Arabs',
        exp: 'Created a massive refugee population across Gaza, the West Bank, Jordan, Syria, and Lebanon.',
      },
      {
        q: 'What Arabic term, meaning "the Catastrophe", describes the 1948 displacement of Palestinians?',
        a: 'Al-Nakba',
        exp: 'Refers to the loss of their homeland, destruction of 400 villages, and permanent exile.',
      },
      {
        q: 'In December 1948, what UN resolution stated that Palestinian refugees should be allowed to return home?',
        a: 'UN Resolution 194',
        exp: 'Stated refugees wishing to live in peace should return or receive compensation for lost property.',
      },
      {
        q: 'Why did the Israeli government refuse to let Palestinian refugees return after 1949?',
        a: 'Feared losing its Jewish majority and facing internal security threats',
        exp: 'Believed returning refugees would destroy the Jewish state from within and act as a fifth column.',
      },
      {
        q: 'In December 1949, what UN agency was created to provide food, housing, and schooling for Palestinian refugees?',
        a: 'UNRWA (UN Relief and Works Agency)',
        exp: 'Set up 58 official camps across the region, providing vital healthcare, education, and food relief.',
      },
      {
        q: 'In April 1950, which Arab country formally took over the West Bank and East Jerusalem?',
        a: 'Jordan (King Abdullah I)',
        exp: 'Granted citizenship to Palestinians and annexed the territory, angering other Arab League states.',
      },
      {
        q: 'In July 1950, what Israeli law gave every Jewish person worldwide the right to settle in Israel?',
        a: 'The Law of Return (1950)',
        exp: 'Fulfilled the Zionist goal of providing a permanent sanctuary for all Jews, granting immediate citizenship.',
      },
      {
        q: 'Between 1948 and 1951, how many Jewish immigrants arrived in Israel, doubling its population?',
        a: 'Approximately 687,000 immigrants',
        exp: 'Included European Holocaust survivors and Mizrahi Jews fleeing persecution in Arab countries.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 6: Nasser’s Rise, the 1955 Gaza Raid & The Suez Crisis (1955–1956)
  // =========================================================================
  {
    num: 6,
    title: 'Nasser’s Rise, the 1955 Gaza Raid & The Suez Crisis (1955–1956)',
    keyTopic: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    enquiry: 'Why did the Suez Crisis mark the end of British imperial power in the Middle East?',
    examinerTrap:
      'Examiner Warning: Ensure you explicitly link the 1955 Israeli Gaza Raid to the Czech Arms Deal and Suez. The raid humiliated Nasser and proved Egyptian weakness, driving him to buy Soviet weapons, which prompted the US to cancel Aswan Dam funding, triggering the canal nationalisation.',
    questions: [
      {
        q: 'In 1954, which Egyptian officer became President, promoting Arab unity and independence from Western rule?',
        a: 'Gamal Abdel Nasser',
        exp: 'Championed Pan-Arab nationalism, opposed Western imperialism, and supported Palestinian resistance.',
      },
      {
        q: 'In February 1955, what Israeli raid into Gaza killed 38 Egyptian soldiers, shocking President Nasser?',
        a: 'Operation Black Arrow (The Gaza Raid)',
        exp: 'Humiliated the Egyptian military and proved Egypt urgently needed modern heavy weapons to face Israel.',
      },
      {
        q: 'In September 1955, how did President Nasser get modern jet fighters and tanks after the Gaza raid?',
        a: 'Signed the Czechoslovak Arms Deal',
        exp: 'Bypassed Western arms limits to buy advanced Soviet MiG-15 jets and T-34 tanks, alarming the West.',
      },
      {
        q: 'In July 1956, why did the United States abruptly cancel its loan to build Egypt’s Aswan Dam?',
        a: 'Angry at Nasser buying Soviet arms and recognizing Communist China',
        exp: 'Secretary of State Dulles pulled funding to punish Nasser, threatening Egypt’s economic modernization.',
      },
      {
        q: 'On 26 July 1956, Egyptian President Nasser gave a speech in Alexandria. What major asset did he nationalise?',
        a: 'The Suez Canal Company',
        exp: 'Seized the canal from British and French owners, declaring transit tolls would fund the Aswan High Dam.',
      },
      {
        q: 'In October 1956, what secret meeting in France planned a joint war between Britain, France, and Israel?',
        a: 'The Protocol of Sèvres',
        exp: 'Israel agreed to invade Sinai, giving Britain and France an excuse to intervene as "peacekeepers" to seize the canal.',
      },
      {
        q: 'On 29 October 1956, what military operation saw Israeli paratroopers and tanks invade the Sinai Peninsula?',
        a: 'Operation Kadesh (The Sinai Invasion)',
        exp: 'IDF forces routed Egyptian troops in Sinai, opened the Straits of Tiran, and reached the Suez Canal.',
      },
      {
        q: 'In November 1956, why did British Prime Minister Anthony Eden suddenly order a ceasefire at Suez?',
        a: 'US President Eisenhower threatened to wreck Britain’s currency (the pound)',
        exp: 'The US refused IMF loans unless Britain withdrew, proving Britain was no longer a premier world superpower.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 7: The Road to War: Water Disputes, Fatah & Border Escalation (1964–1967)
  // =========================================================================
  {
    num: 7,
    title: 'The Road to War: Water Disputes, Fatah & Border Escalation (1964–1967)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73',
    enquiry: 'How did border clashes and water disputes escalate into the Six-Day War of 1967?',
    examinerTrap:
      'Examiner Warning: Do not view the Six-Day War as an isolated event in June 1967. High-scoring candidates trace causal origins to the 1964 water disputes, Fatah guerrilla raids, Syrian artillery shelling from the Golan, and Soviet false intelligence in May 1967.',
    questions: [
      {
        q: 'In 1964, what Israeli engineering system began piping water from the Sea of Galilee south to the Negev?',
        a: 'The National Water Carrier',
        exp: 'Essential for irrigating Israel’s farmland, but viewed by Arab neighbours as stealing Arab water.',
      },
      {
        q: 'In 1964, what Arab counter-plan tried to divert rivers in Syria and Jordan to starve Israel of water?',
        a: 'The Headwater Diversion Plan',
        exp: 'Aimed to cut Israel’s water supply by 35%; Israeli artillery and airstrikes destroyed the diversion machinery.',
      },
      {
        q: 'In January 1964, what umbrella organisation was founded at the Cairo Summit to represent Palestinians?',
        a: 'The Palestine Liberation Organization (PLO)',
        exp: 'Set up by the Arab League to unite Palestinian factions and lead the struggle to liberate Palestine.',
      },
      {
        q: 'Which high Syrian ridge overlooked Israeli farms in the Galilee, allowing Syrian gunners to shell them?',
        a: 'The Golan Heights',
        exp: 'Syrian artillery fired on Israeli tractors and kibbutzim below, sparking frequent military exchanges.',
      },
      {
        q: 'On 7 April 1967, what dramatic air battle saw Israeli jets shoot down six Syrian MiG fighter planes?',
        a: 'The 7 April Air Battle',
        exp: 'Israeli Mirage jets flew over Damascus, humiliating Syria and increasing pressure on Egypt to act.',
      },
      {
        q: 'In May 1967, what false report did the Soviet Union give Egypt about Israeli troops?',
        a: 'Falsely claimed Israel was massing troops on the Syrian border for an invasion',
        exp: 'Pushed Nasser to deploy 100,000 Egyptian troops into Sinai to demonstrate Arab solidarity.',
      },
      {
        q: 'On 16 May 1967, what demand did President Nasser send to the UN regarding peacekeepers in Sinai?',
        a: 'Demanded the immediate removal of all UNEF peacekeepers from Sinai',
        exp: 'UN Secretary-General U Thant complied, removing the buffer between Egyptian and Israeli armies.',
      },
      {
        q: 'On 22 May 1967, what hostile move by Nasser cut off Israeli ships heading to the port of Eilat?',
        a: 'Closed the Straits of Tiran to Israeli shipping',
        exp: 'Blockaded Israel’s southern sea route to oil and trade, which Israel had warned would be an act of war.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 8: The Six-Day War: Pre-emptive Strike & 100-Hour Blitz (June 1967)
  // =========================================================================
  {
    num: 8,
    title: 'The Six-Day War: Pre-emptive Strike & 100-Hour Blitz (June 1967)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73',
    enquiry:
      'Why was Israel able to achieve complete military victory within six days in June 1967?',
    examinerTrap:
      'Examiner Warning: When discussing the Six-Day War, emphasize that complete air supremacy established in the first three hours was the decisive causal factor. Candidates who focus solely on ground tank battles fail to explain why Arab ground forces were destroyed so quickly.',
    questions: [
      {
        q: 'On 1 June 1967, which popular military hero was appointed Israeli Minister of Defence as war loomed?',
        a: 'Moshe Dayan',
        exp: 'Appointed to boost national morale and lead a decisive pre-emptive strike against mobilizing Arab forces.',
      },
      {
        q: 'At 07:45 on 5 June 1967, what surprise operation began the Six-Day War?',
        a: 'Operation Focus (pre-emptive air strikes)',
        exp: 'Nearly 200 Israeli jets flew low under radar to bomb Egyptian runways and destroy aircraft on the ground.',
      },
      {
        q: 'How many Egyptian warplanes were destroyed on the ground within the first three hours of Operation Focus?',
        a: 'Over 300 Egyptian aircraft (out of 420)',
        exp: 'Wiped out the Egyptian Air Force before pilots could take off, giving Israel total air supremacy.',
      },
      {
        q: 'What crucial battlefield advantage did Israel hold for the rest of the Six-Day War?',
        a: 'Complete air supremacy across all fronts',
        exp: 'Allowed Israeli jets to destroy Arab tank columns, supply lines, and artillery without aerial challenge.',
      },
      {
        q: 'Between 5 and 8 June 1967, what vast desert area was taken by Israeli armored divisions from Egypt?',
        a: 'The Sinai Peninsula (and the Gaza Strip)',
        exp: 'Defeated Field Marshal Amer’s army and reached the east bank of the Suez Canal in four days.',
      },
      {
        q: 'On 7 June 1967, Israeli paratroopers captured East Jerusalem. What sacred site did they reach?',
        a: 'The Western Wall in the Old City',
        exp: 'Captured from Jordanian forces, uniting Jerusalem under Jewish control for the first time in 2,000 years.',
      },
      {
        q: 'On 9–10 June 1967, what heavily fortified high ground did Israeli soldiers capture from Syria?',
        a: 'The Golan Heights',
        exp: 'Stormed steep cliffs and bunkers, eliminating the artillery threat to kibbutzim in the Galilee valley.',
      },
      {
        q: 'How did the size of territory under Israeli control change after the Six-Day War?',
        a: 'Controlled territory more than tripled in size',
        exp: 'Captured Sinai, Gaza, West Bank, East Jerusalem, and Golan, bringing 1 million Palestinians under military rule.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 9: The Conquered Territories, Israeli Settlements & UN Resolution 242 (1967–1973)
  // =========================================================================
  {
    num: 9,
    title: 'The Conquered Territories, Israeli Settlements & UN Resolution 242 (1967–1973)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73',
    enquiry: 'How did the 1967 conquests alter Israeli security and entrench diplomatic deadlock?',
    examinerTrap:
      'Examiner Warning: Understand the critical ambiguity in UN Resolution 242. The English version called for withdrawal from "territories occupied" (allowing Israel to keep border adjustments), whereas the French text said "de tous les territoires" (all territories), creating endless diplomatic deadlock.',
    questions: [
      {
        q: 'Name the five territories captured and occupied by Israel in the June 1967 Six-Day War.',
        a: 'Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights',
        exp: 'Created strategic buffer zones against invasion, but brought 1 million hostile Palestinian Arabs under military rule.',
      },
      {
        q: 'In September 1967, what hardline resolution was agreed by Arab leaders meeting in Khartoum?',
        a: 'The "Three Noes" of Khartoum',
        exp: '"No peace with Israel, no recognition of Israel, no negotiations with Israel", ruling out a quick diplomatic settlement.',
      },
      {
        q: 'In November 1967, what famous UN resolution introduced the formula of "Land for Peace"?',
        a: 'UN Security Council Resolution 242',
        exp: 'Called for Israeli withdrawal from occupied lands in exchange for Arab recognition of Israel’s secure borders.',
      },
      {
        q: 'What wording difference between the English and French versions of Resolution 242 caused dispute?',
        a: 'English said "territories occupied" while French said "the territories" ("des territoires")',
        exp: 'Israel argued it did not have to return all land; Arab states insisted withdrawal from all land was mandatory.',
      },
      {
        q: 'In June 1967, what immediate legal step did Israel take regarding East Jerusalem?',
        a: 'Formally annexed East Jerusalem into a united Israeli capital',
        exp: 'Declared Jerusalem indivisible, building Jewish neighbourhoods across the former Jordanian sector.',
      },
      {
        q: 'After 1967, what controversial building policy did Israel begin in the West Bank and Golan?',
        a: 'Building civilian Jewish settlements (outposts)',
        exp: 'Aimed to establish permanent facts on the ground and strengthen strategic control over occupied territories.',
      },
      {
        q: 'What religious Jewish movement was set up after 1967 to build settlements across biblical Judea and Samaria?',
        a: 'Gush Emunim ("Bloc of the Faithful")',
        exp: 'Believed settling the biblical Promised Land was a religious duty that no government should reverse.',
      },
      {
        q: 'From 1968, what massive sand wall and bunker chain did Israel build along the Suez Canal?',
        a: 'The Bar-Lev Line',
        exp: 'Cost $300 million to build; designed to absorb Egyptian artillery and stop any surprise canal crossing.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 10: Palestinian Resistance, Hijackings & Black September (1968–1972)
  // =========================================================================
  {
    num: 10,
    title: 'Palestinian Resistance, Hijackings & Black September (1968–1972)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73',
    enquiry: 'Why did Palestinian groups turn to international terrorism between 1968 and 1972?',
    examinerTrap:
      'Examiner Warning: Clearly distinguish between Fatah (led by Yasser Arafat, focusing on raids from Jordan/Lebanon) and George Habash’s PFLP (which pioneered international plane hijackings). Candidates often incorrectly state that Arafat personally hijacked airliners at Dawson’s Field.',
    questions: [
      {
        q: 'In March 1968, what battle in Jordan turned Yasser Arafat and Fatah into popular resistance heroes?',
        a: 'The Battle of Karameh',
        exp: 'Fatah fighters resisted an Israeli armored raid, inspiring thousands of young Palestinians to join the fedayeen.',
      },
      {
        q: 'In February 1969, who was elected Chairman of the PLO, taking control of Palestinian resistance?',
        a: 'Yasser Arafat',
        exp: 'Transformed the PLO into an independent guerrilla movement free from control by Arab governments.',
      },
      {
        q: 'Which radical Palestinian group led by George Habash pioneered hijacking international airliners?',
        a: 'The PFLP (Popular Front for the Liberation of Palestine)',
        exp: 'Used hijackings to publicize the Palestinian cause globally and demand the release of prisoners.',
      },
      {
        q: 'In September 1970, what multi-plane hijacking saw three airliners blown up on a desert airstrip in Jordan?',
        a: 'The Dawson’s Field Hijackings',
        exp: 'PFLP hijacked Swissair, TWA, and BOAC flights, humiliating King Hussein and triggering a showdown in Jordan.',
      },
      {
        q: 'In September 1970, what civil war erupted as Jordan’s army moved to crush the PLO?',
        a: 'Black September (The Jordanian Civil War)',
        exp: 'King Hussein’s army defeated armed Palestinian guerrillas, killing thousands and expelling the PLO to Lebanon.',
      },
      {
        q: 'After being driven out of Jordan in 1971, where did Arafat and the PLO set up their new headquarters?',
        a: 'Lebanon (in Beirut and southern border towns)',
        exp: 'Created "Fatahland" in southern Lebanon to launch rocket attacks and cross-border raids into northern Israel.',
      },
      {
        q: 'In September 1972, what terror attack by Black September killed 11 Israeli athletes at a sports event?',
        a: 'The Munich Olympics Massacre',
        exp: 'Gunmen took athletes hostage in the Olympic Village, resulting in a botched rescue at Fürstenfeldbruck airfield.',
      },
      {
        q: 'Following the Munich attack, what secret Mossad operation was ordered by Golda Meir to hunt down attackers?',
        a: 'Operation Wrath of God',
        exp: 'Targeted and assassinated suspected Black September planners and PLO representatives across Europe.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 11: The War of Attrition & The Yom Kippur War (1969–1973)
  // =========================================================================
  {
    num: 11,
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73',
    enquiry: 'Why did the surprise Arab assault on Yom Kippur 1973 shatter Israeli complacency?',
    examinerTrap:
      'Examiner Warning: Do not describe the 1973 war as an outright Arab military victory. While Egypt and Syria achieved brilliant tactical surprise and breached the Bar-Lev Line, Israel counter-attacked, crossed the Suez Canal, surrounded Egypt’s Third Army, and advanced to within 100km of Cairo.',
    questions: [
      {
        q: 'In September 1970, who became President of Egypt following the sudden death of Gamal Abdel Nasser?',
        a: 'Anwar Sadat',
        exp: 'Determined to break the diplomatic stalemate, recover Sinai, and force Israel to negotiate through war.',
      },
      {
        q: 'On 6 October 1973, which major Jewish and Muslim holy occasions coincided when Egypt and Syria attacked?',
        a: 'Yom Kippur (Day of Atonement) and the holy month of Ramadan',
        exp: 'Caught Israeli military intelligence completely off guard as radio stations were silent and soldiers were fasting.',
      },
      {
        q: 'On 6 October 1973, what code name was given to Egypt’s assault crossing of the Suez Canal?',
        a: 'Operation Badr',
        exp: 'Mobilized 80,000 soldiers across the canal in the first 24 hours under cover of dense artillery fire.',
      },
      {
        q: 'How did Egyptian engineers quickly break through Israel’s 25-metre high Bar-Lev sand wall along the canal?',
        a: 'Used high-pressure water hoses to wash away the sand ramparts',
        exp: 'Blasted 60 passages through the sand barriers within hours, allowing Egyptian tanks to roll into Sinai.',
      },
      {
        q: 'Which Soviet-supplied anti-aircraft missiles protected Egyptian troops and shot down Israeli jets over Sinai?',
        a: 'Mobile Soviet SAM missiles (SAM-6 Gainful)',
        exp: 'Formed a dense missile shield that neutralized Israel’s air superiority over the canal zone.',
      },
      {
        q: 'On 6–7 October 1973, what fierce tank battle stopped 1,400 Syrian tanks on the Golan Heights?',
        a: 'The Battle of the "Valley of Tears"',
        exp: 'Outnumbered Israeli tank crews held the line until reinforcements arrived, saving Galilee from Syrian capture.',
      },
      {
        q: 'In mid-October 1973, what emergency US military airlift flew tanks and ammunition to re-arm Israel?',
        a: 'Operation Nickel Grass',
        exp: 'Delivered over 22,000 tons of weapons, allowing the IDF to launch decisive counter-offensives.',
      },
      {
        q: 'Which Israeli general led tanks across the Suez Canal into mainland Egypt, trapping Egypt’s Third Army?',
        a: 'General Ariel Sharon',
        exp: 'Breached the gap between Egyptian armies, surrounded the Third Army, and threatened Cairo before the ceasefire.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 12: The 1973 Oil Crisis & Kissinger’s Shuttle Diplomacy (1973–1975)
  // =========================================================================
  {
    num: 12,
    title: 'The 1973 Oil Crisis & Kissinger’s Shuttle Diplomacy (1973–1975)',
    keyTopic: 'Key Topic 2: The Escalation of Conflict, 1964–73 / Key Topic 3',
    enquiry:
      'How did the oil weapon and American diplomacy reshape Middle Eastern relations after 1973?',
    examinerTrap:
      'Examiner Warning: Link the 1973 Arab Oil Embargo directly to Henry Kissinger’s shuttle diplomacy. The quadrupling of oil prices caused severe Western economic recessions, which forced the US to broker disengagement treaties to stabilize the region and secure oil supplies.',
    questions: [
      {
        q: 'What group of Arab oil-exporting nations organised the 1973 oil embargo against Israel’s allies?',
        a: 'OAPEC (Organization of Arab Petroleum Exporting Countries)',
        exp: 'Used crude oil as an economic weapon to punish countries supporting Israel, particularly the US and Netherlands.',
      },
      {
        q: 'By how much did world crude oil prices rise between October 1973 and January 1974?',
        a: 'Prices quadrupled (surged from $3 to $12 a barrel)',
        exp: 'Triggered worldwide inflation, petrol rationing, and severe industrial recessions across Western economies.',
      },
      {
        q: 'How did the 1973 oil crisis change attitudes toward the Middle East in Western Europe and Japan?',
        a: 'Forced Western nations to become more pro-Arab to protect their oil supplies',
        exp: 'European governments distanced themselves from US pro-Israeli policies and endorsed Palestinian rights.',
      },
      {
        q: 'From 1974 to 1975, which US Secretary of State flew between Middle Eastern capitals to arrange deals?',
        a: 'Henry Kissinger',
        exp: 'Pioneered "shuttle diplomacy", brokering step-by-step interim peace agreements between Israel, Egypt, and Syria.',
      },
      {
        q: 'In January 1974, what first military pull-back agreement was signed between Israel and Egypt?',
        a: 'The Sinai I Accord (Sinai Disengagement Agreement)',
        exp: 'Both sides pulled forces back from the Suez Canal, creating a UN-patrolled buffer zone in western Sinai.',
      },
      {
        q: 'In May 1974, what disengagement deal saw Israel pull back from Quneitra on the Syrian front?',
        a: 'The Golan Disengagement Agreement (UNDOF)',
        exp: 'Established a UN Disengagement Observer Force on the Golan that maintained border peace for decades.',
      },
      {
        q: 'In June 1975, which vital waterway was cleared of wartime wrecks and reopened by President Sadat?',
        a: 'The Suez Canal',
        exp: 'Reopened to international maritime trade after eight years of closure since the 1967 Six-Day War.',
      },
      {
        q: 'In September 1975, what second interim deal saw Israel hand back the Giddi and Mitla mountain passes in Sinai?',
        a: 'The Sinai II Accord',
        exp: 'Sadat pledged to resolve conflicts peacefully, paving the way for full peace negotiations at Camp David.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 13: Sadat’s Knesset Initiative, Camp David & The 1979 Peace Treaty (1977–1979)
  // =========================================================================
  {
    num: 13,
    title: 'Sadat’s Knesset Initiative, Camp David & The 1979 Peace Treaty (1977–1979)',
    keyTopic: 'Key Topic 3: The Attempts for Peace, 1974–95',
    enquiry: 'Why did Anwar Sadat risk everything to sign the 1979 Egypt-Israel Peace Treaty?',
    examinerTrap:
      'Examiner Warning: Explain why the 1979 Treaty of Washington isolated Egypt in the Arab world. While Egypt recovered the Sinai, other Arab states viewed Sadat as a traitor for making a separate peace with Israel without securing an independent Palestinian state.',
    questions: [
      {
        q: 'In May 1977, which right-wing Likud leader was elected Prime Minister of Israel, ending 29 years of Labour rule?',
        a: 'Menachem Begin',
        exp: 'Former Irgun leader with hardline nationalist views, yet proved willing to surrender Sinai for formal peace.',
      },
      {
        q: 'In November 1977, Egyptian President Sadat visited Jerusalem. What historic speech did he make?',
        a: 'Addressed the Israeli Knesset proposing permanent peace',
        exp: 'Broke 30 years of Arab taboo by speaking directly to Israeli MPs, stating "no more war, no more bloodshed".',
      },
      {
        q: 'In September 1978, which US President invited Sadat and Begin to his Maryland retreat for peace talks?',
        a: 'President Jimmy Carter',
        exp: 'Spent 13 days in intense mediation at Camp David, preventing talks from collapsing into failure.',
      },
      {
        q: 'On 26 March 1979, what historic treaty was signed by Egypt and Israel on the White House lawn?',
        a: 'The Egypt-Israel Peace Treaty (The Treaty of Washington)',
        exp: 'First formal peace treaty between Israel and an Arab state, establishing diplomatic and trade ties.',
      },
      {
        q: 'Under the 1979 peace treaty, what large territory did Israel return to Egypt?',
        a: 'The entire Sinai Peninsula',
        exp: 'Dismantled all Israeli military airbases, oil rigs, and civilian settlements (including Yamit) by 1982.',
      },
      {
        q: 'What main promises did Egypt give to Israel in exchange for the return of the Sinai in 1979?',
        a: 'Full diplomatic peace, open borders, and free passage through the Suez Canal and Tiran',
        exp: 'Recognized Israel’s right to exist, ending Egypt’s state of war that had lasted since 1948.',
      },
      {
        q: 'How did Arab League nations punish Egypt for signing the 1979 peace treaty with Israel?',
        a: 'Expelled Egypt from the Arab League, cut ties, and moved headquarters to Tunis',
        exp: 'Arab states condemned Sadat for abandoning the Palestinians and making a separate peace with the enemy.',
      },
      {
        q: 'On 6 October 1981, what happened to President Anwar Sadat during a military parade in Cairo?',
        a: 'Assassinated by Egyptian Islamic extremist soldiers',
        exp: 'Killed by members of Egyptian Islamic Jihad who opposed peace with Israel and Western secular ties.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 14: The Palestinian Issue, Operation Peace for Galilee & The Lebanon War (1974–1985)
  // =========================================================================
  {
    num: 14,
    title: 'The Palestinian Issue, Operation Peace for Galilee & The Lebanon War (1974–1985)',
    keyTopic: 'Key Topic 3: The Attempts for Peace, 1974–95',
    enquiry:
      'Why did the 1982 Israeli invasion of Lebanon fail to bring security to northern Israel?',
    examinerTrap:
      'Examiner Warning: Do not confuse Christian Phalangist militia perpetrators with the Israeli Defence Forces at Sabra and Shatila. The Kahan Commission established that Lebanese Phalangists carried out the killings, while Ariel Sharon bore personal indirect responsibility for allowing them into the camps.',
    questions: [
      {
        q: 'In November 1974, what famous words did Yasser Arafat say at the end of his UN speech in New York?',
        a: '"Do not let the olive branch fall from my hand"',
        exp: 'Carried an olive branch and a freedom fighter’s gun, offering diplomacy while refusing to abandon armed resistance.',
      },
      {
        q: 'In June 1982, what invasion of Lebanon did the Israeli government launch after an attack on its UK ambassador?',
        a: 'Operation Peace for Galilee (The First Lebanon War)',
        exp: 'Launched to crush PLO rocket bases in southern Lebanon and protect northern Israeli settlements.',
      },
      {
        q: 'Which Israeli Defence Minister expanded the war, driving tanks all the way to Beirut?',
        a: 'Ariel Sharon',
        exp: 'Misled Prime Minister Begin by pushing beyond the agreed 40km buffer to besiege West Beirut.',
      },
      {
        q: 'In August 1982, where were Yasser Arafat and thousands of PLO fighters evacuated to by sea?',
        a: 'Tunis (Tunisia) and other Arab countries',
        exp: 'Forced to surrender their heavy arms and leave Lebanon under international naval protection.',
      },
      {
        q: 'In September 1982, what horrific massacre of Palestinian refugees took place in Beirut refugee camps?',
        a: 'The Sabra and Shatila Massacre',
        exp: 'Lebanese Christian Phalangist militias slaughtered between 800 and 3,500 unarmed refugees over three days.',
      },
      {
        q: 'What Israeli judicial inquiry investigated the Sabra and Shatila massacre in 1983?',
        a: 'The Kahan Commission',
        exp: 'Ruled Defence Minister Ariel Sharon held indirect personal responsibility, forcing him to resign as Defence Minister.',
      },
      {
        q: 'In September 1982, what huge protest in Tel Aviv saw 400,000 Israelis demand an inquiry into Beirut?',
        a: 'The Peace Now Rally',
        exp: 'Demonstrated massive domestic opposition to the war and deep moral shock over the Beirut massacres.',
      },
      {
        q: 'What radical Iranian-backed Shia militant group was formed in Lebanon to fight Israeli troops?',
        a: 'Hezbollah ("Party of God")',
        exp: 'Used suicide bombings and guerrilla warfare to force Israeli troops to withdraw from southern Lebanon.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 15: The First Palestinian Intifada & The Rise of Hamas (1987–1993)
  // =========================================================================
  {
    num: 15,
    title: 'The First Palestinian Intifada & The Rise of Hamas (1987–1993)',
    keyTopic: 'Key Topic 3: The Attempts for Peace, 1974–95',
    enquiry:
      'How did the First Intifada convince Israeli leaders that military rule was unsustainable?',
    examinerTrap:
      'Examiner Warning: Candidates must understand that the First Intifada was a spontaneous, grassroots uprising led by local youths and the UNLU, NOT an operation ordered from exile by Yasser Arafat in Tunis. Arafat had to hurry to claim political leadership of the movement.',
    questions: [
      {
        q: 'On 8 December 1987, what traffic accident in Gaza sparked the spontaneous outbreak of the First Intifada?',
        a: 'An Israeli army truck hit Palestinian cars in Jabalya camp, killing 4 workers',
        exp: 'Rumours spread that the crash was deliberate revenge, sparking mass riots that spread across the territories.',
      },
      {
        q: 'What simple weapons used by Palestinian youths led them to be called "Children of the Stones"?',
        a: 'Stones, slingshots, and petrol bombs',
        exp: 'Confronted heavily armed Israeli soldiers, capturing global media sympathy for their resistance.',
      },
      {
        q: 'What local grassroots committee organized strikes, boycotts, and leaflets during the First Intifada?',
        a: 'The UNLU (Unified National Leadership of the Uprising)',
        exp: 'Coordinated commercial shop strikes, civil disobedience, and boycotts of Israeli goods without consulting Tunis.',
      },
      {
        q: 'What controversial military policy was used by Israeli Defence Minister Yitzhak Rabin to stop stone-throwers?',
        a: 'The "Iron Fist" policy ("force, might, and beatings")',
        exp: 'Ordered troops to break the bones of protesters, which was broadcast on global TV and damaged Israel’s reputation.',
      },
      {
        q: 'In December 1987, what Islamist militant group was founded in Gaza by Sheikh Ahmed Yassin?',
        a: 'Hamas (Islamic Resistance Movement)',
        exp: 'Dedicated to armed jihad to destroy Israel and create an Islamic Palestinian state from the Jordan to the sea.',
      },
      {
        q: 'In July 1988, what historic announcement did King Hussein of Jordan make about the West Bank?',
        a: 'Severed all legal and administrative ties with the West Bank',
        exp: 'Left the PLO as the sole legitimate representative of the Palestinian people in the occupied territories.',
      },
      {
        q: 'How did international TV coverage of the First Intifada damage Israel’s image abroad?',
        a: 'Turned world sympathy toward Palestinians and showed Israel as a harsh military occupier',
        exp: 'Contrasted armed soldiers using live ammunition against stone-throwing children, creating international outcry.',
      },
      {
        q: 'What major lesson did the First Intifada teach Israeli leaders like Yitzhak Rabin?',
        a: 'Permanent military rule over millions of Palestinians was impossible to maintain',
        exp: 'Convinced Rabin and the Israeli military that only a negotiated political settlement could bring lasting security.',
      },
    ],
  },

  // =========================================================================
  // ENQUIRY 16: Superpower Realignment, Madrid & The Oslo Peace Accords (1988–1995)
  // =========================================================================
  {
    num: 16,
    title: 'Superpower Realignment, Madrid & The Oslo Peace Accords (1988–1995)',
    keyTopic: 'Key Topic 3: The Attempts for Peace, 1974–95',
    enquiry: 'Why did the breakthrough of the Oslo Accords collapse into tragedy by November 1995?',
    examinerTrap:
      'Examiner Warning: In exam answers on Oslo, always distinguish between Oslo I (1993 Declaration of Principles setting up the PA) and Oslo II (1995 division of the West Bank into Areas A, B, and C). Explain that Israeli right-wing extremists rejected Oslo because they opposed surrendering biblical land.',
    questions: [
      {
        q: 'In December 1988, what three major concessions did Yasser Arafat announce at the UN in Geneva?',
        a: 'Rejected all terrorism, accepted UN Resolution 242, and recognized Israel’s right to exist',
        exp: 'Met US preconditions for direct talks and opened the door to diplomatic engagement with Washington.',
      },
      {
        q: 'How did the fall of the Soviet Union in 1989–91 weaken the diplomatic position of the PLO?',
        a: 'Lost their main superpower supporter and weapons supplier',
        exp: 'Forced Arafat to look to the United States and direct peace negotiations as his only diplomatic option.',
      },
      {
        q: 'In October 1991, what peace conference brought Arab states and Israel to direct talks in Spain?',
        a: 'The Madrid Peace Conference',
        exp: 'Co-sponsored by US President Bush and Soviet President Gorbachev; established direct face-to-face negotiations.',
      },
      {
        q: 'In early 1993, in which European capital did Israeli and PLO negotiators hold secret peace meetings?',
        a: 'Oslo (Norway)',
        exp: 'Bypassed official Madrid diplomats to negotiate a historic mutual recognition and interim self-rule framework.',
      },
      {
        q: 'In September 1993, what historic letters were signed by Rabin and Arafat before the White House handshake?',
        a: 'The Letters of Mutual Recognition',
        exp: 'The PLO recognized Israel’s right to exist in peace, and Israel recognized the PLO as the Palestinian representative.',
      },
      {
        q: 'On 13 September 1993, Rabin and Arafat shook hands in Washington. What agreement was signed?',
        a: 'The Oslo I Accord (Declaration of Principles)',
        exp: 'Established Palestinian self-rule in Gaza and Jericho, with a 5-year transition to final status talks.',
      },
      {
        q: 'Under the 1995 Oslo II Accord, what three administrative areas was the West Bank divided into?',
        a: 'Area A (Palestinian control), Area B (joint control), and Area C (full Israeli control)',
        exp: 'Left 60% of the West Bank (Area C) containing all Israeli settlements under exclusive Israeli military control.',
      },
      {
        q: 'On 4 November 1995, which Israeli Prime Minister was assassinated at a peace rally in Tel Aviv?',
        a: 'Yitzhak Rabin',
        exp: 'Shot dead by Yigal Amir, a Jewish religious extremist who opposed giving biblical land to Palestinians.',
      },
    ],
  },
];

module.exports = {
  CME_PEARSON_QUIZ_BANK,
};
