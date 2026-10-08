/**
 * cme_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 2 (1HI0/2B / Option P5)
 * Conflict in the Middle East, 1945–1995
 * Master Knowledge Retrieval Bank (16 Enquiries x 12 Questions = 192 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Specification & Revision Guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, authentic classroom examiner focus.
 * 3. Two-Line Format: Line 1 = Core Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 4. Progressive Flow: Q1-4 Foundations & Chronology -> Q5-8 Causal Mechanisms -> Q9-12 Outcomes & Significance.
 * 5. Examiner Warning / Fatal Pitfall Callout on every enquiry page.
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
        q: 'What 1917 British statement promised support for a "national home for the Jewish people" in Palestine?',
        a: 'The Balfour Declaration (1917)',
        exp: 'Stated British support for a Jewish homeland while specifying existing non-Jewish civil rights should not be prejudiced.',
      },
      {
        q: 'What 1915 diplomatic letters led Arab leaders to believe Britain had promised post-war Arab independence?',
        a: 'The McMahon-Hussein Correspondence',
        exp: 'Britain promised Arab independence across the region in return for an Arab revolt against Ottoman Turkish rule.',
      },
      {
        q: 'What 1939 British government policy paper capped Jewish immigration into Palestine at 75,000 over five years?',
        a: 'The 1939 British White Paper (MacDonald White Paper)',
        exp: 'Britain sought to appease Arab opinion ahead of WWII, creating intense Zionist anger during the European Holocaust.',
      },
      {
        q: 'Following WWII in August 1945, what urgent humanitarian appeal did US President Harry Truman make to Britain?',
        a: 'Immediate admission of 100,000 Jewish Displaced Persons (DPs)',
        exp: 'Pressured Britain to admit Holocaust survivors languishing in European displaced persons camps into Palestine.',
      },
      {
        q: 'What was the approximate demographic population balance in Mandatory Palestine in 1945?',
        a: 'Approximately 1.2 million Palestinian Arabs and 600,000 Jews (2:1 Arab majority)',
        exp: 'Arabs demanded an independent unitary state reflecting their majority; Zionists demanded a sovereign Jewish state.',
      },
      {
        q: 'What was the clandestine Jewish movement organizing illegal post-war maritime immigration called?',
        a: 'Aliyah Bet ("Illegal Immigration")',
        exp: 'Organized by the Haganah to smuggle tens of thousands of Holocaust survivors through the British naval blockade.',
      },
      {
        q: 'What famous immigrant ship carrying 4,500 Holocaust survivors was intercepted by the Royal Navy in July 1947?',
        a: 'The SS Exodus (1947)',
        exp: 'Britain forcibly returned passengers to displaced persons camps in Germany, generating global outrage against UK rule.',
      },
      {
        q: 'Why was the Suez Canal considered an irreplaceable strategic lifeline for Britain after 1945?',
        a: "It was Britain's primary maritime corridor for Middle Eastern oil and access to Asian dominions",
        exp: "Two-thirds of Western Europe's oil passed through the canal, making stability in the Middle East vital for Britain.",
      },
      {
        q: 'What narrow maritime strait at Sharm el-Sheikh controls access to the Israeli port of Eilat?',
        a: 'The Straits of Tiran (Gulf of Aqaba)',
        exp: 'Commanded maritime access to the Red Sea; any Egyptian blockade here was treated by Israel as an act of war.',
      },
      {
        q: 'Why did the British post-war Labour government find maintaining the Palestine Mandate financially impossible?',
        a: 'Post-WWII national bankruptcy combined with maintaining 100,000 troops under guerrilla attack',
        exp: 'Britain faced severe domestic rationing and could not afford the economic and human cost of policing the Mandate.',
      },
      {
        q: 'Which British Foreign Secretary was responsible for British Palestine policy between 1945 and 1947?',
        a: 'Ernest Bevin',
        exp: 'Maintained strict immigration limits to protect British oil ties with Arab states, clashing with the US and Zionists.',
      },
      {
        q: 'In what month and year did the British government formally announce it was referring Palestine to the United Nations?',
        a: 'February 1947',
        exp: 'Prime Minister Clement Attlee admitted Britain could not reconcile Arab and Jewish demands and would surrender the Mandate.',
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
        q: 'What was the mainstream official Jewish defence militia in Mandatory Palestine called?',
        a: 'The Haganah ("The Defence")',
        exp: 'Controlled by David Ben-Gurion and the Jewish Agency, focusing on clandestine immigration and strategic defence.',
      },
      {
        q: 'Which radical militant Zionist underground group was commanded by future Prime Minister Menachem Begin?',
        a: 'The Irgun (Etzel)',
        exp: 'Rejected British authority completely and launched armed urban guerrilla attacks against British personnel and infrastructure.',
      },
      {
        q: 'Which extreme breakaway Zionist group, known as the Stern Gang, carried out political assassinations?',
        a: 'Lehi (Fighters for the Freedom of Israel)',
        exp: 'Believed armed force was the only method to expel the British; assassinated Lord Moyne in Cairo in 1944.',
      },
      {
        q: 'What joint armed underground alliance operated against British security forces in 1945–46?',
        a: 'The United Resistance Movement (Tenuat Hameri Haivri)',
        exp: 'Temporarily united the Haganah, Irgun, and Lehi to coordinate sabotage attacks on British railways and bridges.',
      },
      {
        q: 'What building in Jerusalem housed the central British military command and Secretariat?',
        a: 'The King David Hotel',
        exp: 'Located in West Jerusalem, serving as the heavily fortified nerve-centre of British colonial administration.',
      },
      {
        q: 'On what date did the Irgun detonate explosives inside the King David Hotel?',
        a: '22 July 1946',
        exp: 'Militants disguised as milk delivery men detonated 350kg of explosives in the basement of the hotel wing.',
      },
      {
        q: 'How many British, Arab, and Jewish civil servants and officers were killed in the King David Hotel bombing?',
        a: '91 people killed (and 46 injured)',
        exp: 'Remains the deadliest single attack against British forces during the Mandate, shattering British domestic resolve.',
      },
      {
        q: 'What British security operation was launched across Palestine in June 1946, arresting over 2,700 Jewish leaders?',
        a: 'Operation Agatha ("Black Saturday")',
        exp: 'British troops imposed curfews, raided Jewish Agency offices, and confiscated weapons, accelerating Irgun retaliation.',
      },
      {
        q: 'What incident in July 1947, involving the hanging of two British sergeants, shocked British public opinion?',
        a: 'The "Sergeants Affair"',
        exp: 'Irgun hanged Sergeants Paice and Martin and booby-trapped their bodies in retaliation for the execution of Irgun fighters.',
      },
      {
        q: 'How did the British public and press react in Britain following the Sergeants Affair in summer 1947?',
        a: 'Anti-Jewish riots broke out in UK cities and national newspapers demanded immediate troop withdrawal',
        exp: 'Outrage convinced British voters and Parliament that British soldiers should no longer die in Palestine.',
      },
      {
        q: 'What special United Nations body was formed in May 1947 to investigate and recommend a solution for Palestine?',
        a: 'UNSCOP (United Nations Special Committee on Palestine)',
        exp: 'Consisted of 11 neutral nations who toured Palestine, visited DP camps in Europe, and drafted the partition plan.',
      },
      {
        q: 'Why did Palestinian Arab leaders boycott all meetings with UNSCOP during their 1947 visit?',
        a: 'They argued partition was illegal and that Palestinian self-determination was non-negotiable',
        exp: 'Their refusal to engage allowed the Jewish Agency to present an unopposed case for Jewish statehood.',
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
        q: 'What landmark resolution was passed by the UN General Assembly on 29 November 1947?',
        a: 'UN Resolution 181 (The Partition Plan)',
        exp: 'Voted 33 to 13 (with 10 abstentions) to terminate the British Mandate and partition Palestine into two independent states.',
      },
      {
        q: 'What percentage of the land was allocated to the proposed Jewish state under UN Resolution 181?',
        a: 'Approximately 56% of Mandatory Palestine',
        exp: 'Included the coastal plain, fertile Eastern Galilee, and the Negev desert, despite Jews owning under 7% of land.',
      },
      {
        q: 'What percentage of the land was allocated to the proposed Arab state under UN Resolution 181?',
        a: 'Approximately 43% of Mandatory Palestine',
        exp: 'Comprised the central highlands (West Bank), Western Galilee, and the Gaza coastal strip.',
      },
      {
        q: 'What special international legal status was designated for the city of Jerusalem under Resolution 181?',
        a: 'A corpus separatum (international zone administered by the UN)',
        exp: 'Designed to preserve holy sites sacred to Jews, Christians, and Muslims under neutral global administration.',
      },
      {
        q: 'How did the Jewish Agency, led by David Ben-Gurion, respond to the UN partition vote?',
        a: 'Accepted the plan publicly and celebrated statehood',
        exp: 'Viewed partition as international legal recognition of a sovereign Jewish homeland, despite security concerns.',
      },
      {
        q: 'Why did the Arab Higher Committee and Arab League reject UN Resolution 181 entirely?',
        a: 'They argued giving 56% of territory to a 33% minority population violated basic democratic principles',
        exp: 'Refused to surrender any part of historic Arab Palestine to European immigrant settlers.',
      },
      {
        q: 'What broke out across Palestine on 30 November 1947, the morning after the UN partition vote?',
        a: 'Inter-communal civil war between Jewish and Arab communities',
        exp: 'Began with an Arab ambush on Jewish civilian buses near Petah Tikva; towns and roads descended into violent chaos.',
      },
      {
        q: 'What strategic highway was besieged by Arab irregular militias in early 1948, cutting off 100,000 Jewish residents?',
        a: 'The Tel Aviv to Jerusalem highway (at Sha’ar HaGai / Bab el-Wad)',
        exp: 'Arab forces commanded by Abd al-Qadir al-Husayni besieged Jewish West Jerusalem, cutting off food and water supplies.',
      },
      {
        q: 'What operational military plan was executed by the Haganah in April 1948 to secure territory ahead of independence?',
        a: 'Plan Dalet (Plan D)',
        exp: 'Aimed to seize control of strategic routes, towns, and villages within the Jewish allocation and clear hostile militia bases.',
      },
      {
        q: 'What notorious massacre occurred at the Arab village of Deir Yassin on 9 April 1948?',
        a: 'The Deir Yassin Massacre',
        exp: 'Irgun and Lehi fighters killed between 100 and 120 Arab villagers, triggering widespread panic and mass flight.',
      },
      {
        q: 'What retaliatory attack was carried out by Arab fighters four days later on 13 April 1948 in Jerusalem?',
        a: 'The Hadassah Medical Convoy Massacre',
        exp: 'Arab forces ambushed a convoy of Jewish doctors, nurses, and academics heading to Mount Scopus, killing 78 people.',
      },
      {
        q: 'On what date did British High Commissioner Sir Alan Cunningham sail from Haifa, ending the British Mandate?',
        a: '14 May 1948',
        exp: 'Marked the official midnight termination of 25 years of British imperial rule in Mandatory Palestine.',
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
        q: 'Who declared the establishment of the State of Israel in Tel Aviv on 14 May 1948?',
        a: 'David Ben-Gurion',
        exp: 'Delivered the Declaration of Independence beneath a portrait of Theodor Herzl at the Tel Aviv Museum.',
      },
      {
        q: 'Which five Arab League states invaded Israeli territory on 15 May 1948?',
        a: 'Egypt, Transjordan, Syria, Iraq, and Lebanon',
        exp: 'Launched a multi-front invasion with the declared objective of destroying the newly proclaimed Jewish state.',
      },
      {
        q: 'What military force was established on 26 May 1948, unifying all Jewish militias under state command?',
        a: 'The Israeli Defence Forces (IDF / Tzahal)',
        exp: 'Ben-Gurion dissolved the Haganah, Irgun, and Lehi into a single professional national army under unified civilian control.',
      },
      {
        q: 'Which elite British-trained Arab military force, commanded by Glubb Pasha, captured East Jerusalem and the West Bank?',
        a: 'The Arab Legion (Transjordan)',
        exp: 'The best-disciplined Arab army; successfully drove Haganah forces out of the Jewish Quarter of the Old City.',
      },
      {
        q: 'What vital military advantage did Israel secure during the first UN ceasefire in June–July 1948?',
        a: 'Importation of rifles, machine guns, artillery, and Avia fighter planes from Czechoslovakia',
        exp: 'Broke the international arms embargo with Soviet blessing, giving the IDF decisive firepower and air superiority.',
      },
      {
        q: 'Which UN mediator was assassinated by Jewish militant group Lehi in Jerusalem in September 1948?',
        a: 'Count Folke Bernadotte',
        exp: 'Swedish diplomat who negotiated the truces; assassinated because his revised peace plan gave the Negev to the Arabs.',
      },
      {
        q: 'What major offensive in October 1948 drove Egyptian armies completely out of the northern Negev?',
        a: 'Operation Yoav',
        exp: 'The IDF broke the Egyptian blockade of the Negev, encircled the Egyptian Fourth Brigade at Fallujah, and captured Beersheba.',
      },
      {
        q: 'State two crucial structural weaknesses that crippled the Arab war effort during 1948–49.',
        a: 'Severe political divisions among Arab monarchs and lack of a unified military command structure',
        exp: 'King Abdullah of Jordan prioritised seizing the West Bank rather than coordinating with Egyptian or Syrian forces.',
      },
      {
        q: 'What percentage of Mandatory Palestine did Israel control at the end of the 1948–49 fighting?',
        a: '78% of Mandatory Palestine',
        exp: 'Expanded far beyond the 56% granted in the UN Partition Plan, securing Galilee, the coastal plain, and the entire Negev.',
      },
      {
        q: 'Where were the official bilateral armistice agreements negotiated between Israel and Arab states in 1949?',
        a: 'The island of Rhodes (Greece)',
        exp: 'UN mediator Ralph Bunche chaired separate negotiations with Egypt, Lebanon, Jordan, and Syria.',
      },
      {
        q: 'What was the official armistice boundary established in 1949 between Israel and its neighbours called?',
        a: 'The Green Line',
        exp: 'Drawn in green ink on negotiation maps; served as the internationally recognised de facto borders until June 1967.',
      },
      {
        q: 'How was the holy city of Jerusalem divided under the 1949 armistice arrangements?',
        a: 'West Jerusalem held by Israel; East Jerusalem and the Old City held by Jordan',
        exp: 'Divided by concrete walls, razor wire, and minefields; Jews were completely barred from visiting the Western Wall.',
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
        q: 'Approximately how many Palestinian Arabs were displaced from their homes during the 1948–49 War?',
        a: 'Approximately 700,000 to 750,000 Palestinian Arabs',
        exp: 'Constituted over 80% of the Arab population of the territory that became the State of Israel.',
      },
      {
        q: 'What Arabic term, meaning "the Catastrophe", is used by Palestinians to describe their 1948 dispossession?',
        a: 'Al-Nakba',
        exp: 'Represents the destruction of Palestinian society, loss of ancestral homeland, and permanent refugee status.',
      },
      {
        q: 'What United Nations General Assembly resolution affirmed the right of Palestinian refugees to return to their homes?',
        a: 'UN Resolution 194 (December 1948)',
        exp: 'Resolved that refugees wishing to return and live at peace should be permitted to do so at the earliest practicable date.',
      },
      {
        q: 'Why did the Israeli government refuse to permit the return of Palestinian refugees after 1949?',
        a: 'Feared mass repatriation would destroy the Jewish demographic majority and introduce a hostile fifth column',
        exp: 'Passed the Absentee Property Law to confiscate abandoned Arab homes, land, and orchards for Jewish resettlement.',
      },
      {
        q: 'What dedicated UN agency was established in December 1949 to provide humanitarian relief to Palestinian refugees?',
        a: 'UNRWA (United Nations Relief and Works Agency)',
        exp: 'Constructed and operated 59 registered refugee camps across Gaza, the West Bank, Jordan, Lebanon, and Syria.',
      },
      {
        q: 'Which Arab nation formally annexed the West Bank and East Jerusalem in April 1950?',
        a: 'The Hashemite Kingdom of Jordan (King Abdullah I)',
        exp: 'Integrated the territory into Jordan and granted full Jordanian passports and voting rights to Palestinian residents.',
      },
      {
        q: 'How did Egypt govern the Gaza Strip following the 1949 armistice?',
        a: 'Maintained military administrative rule without granting citizenship',
        exp: 'Kept refugees confined in impoverished camps under strict military curfew, denying them integration into Egypt.',
      },
      {
        q: 'What historic legislation passed by the Israeli Knesset in July 1950 granted automatic immigration rights to all Jews?',
        a: 'The Law of Return (1950)',
        exp: 'Gave every Jewish person worldwide the right to settle in Israel and gain immediate full citizenship.',
      },
      {
        q: 'How many Jewish immigrants arrived in Israel between May 1948 and December 1951, doubling the nation’s population?',
        a: 'Approximately 687,000 immigrants',
        exp: 'Absorbed European Holocaust survivors and hundreds of thousands of Sephardic and Mizrahi Jews fleeing Arab nations.',
      },
      {
        q: 'What temporary canvas tent and corrugated tin transit camps were used to house new immigrants in early Israel?',
        a: 'Ma’abarot (Transit Camps)',
        exp: 'Faced harsh overcrowding, winter floods, and severe rationing (Tzena) as the fledgling state struggled to build housing.',
      },
      {
        q: 'How did the United States government assist the infant State of Israel financially in 1949?',
        a: 'Granted a $100 million Export-Import Bank infrastructure development loan',
        exp: 'Provided crucial capital to buy agricultural machinery, expand electrical grids, and develop modern water networks.',
      },
      {
        q: 'What collective economic policy did Arab League member states enforce against Israel from 1948?',
        a: 'The Comprehensive Arab Economic Boycott',
        exp: 'Barred all trade with Israel and blacklisted international foreign firms doing business with the Jewish state.',
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
        q: 'Which charismatic army officer became President of Egypt in 1954, championing Pan-Arab nationalism?',
        a: 'Gamal Abdel Nasser',
        exp: 'Led the 1952 Free Officers revolution, overthrowing King Farouk and vowing to end Western colonial dominance.',
      },
      {
        q: 'What cross-border Arab guerrilla fighters launched sabotage and sniper raids into southern Israel from Gaza?',
        a: 'Fedayeen ("Self-Sacrificers")',
        exp: 'Trained and equipped by Egyptian military intelligence to launch terrorist infiltrations, provoking Israeli reprisals.',
      },
      {
        q: 'What major retaliatory cross-border assault was launched by the IDF into Egyptian-held Gaza in February 1955?',
        a: 'Operation Black Arrow (The Gaza Raid)',
        exp: 'Israeli paratroopers killed 38 Egyptian soldiers at a military base, exposing Egypt’s grave military vulnerability.',
      },
      {
        q: 'How did President Nasser respond to the humiliating 1955 Gaza Raid in September 1955?',
        a: 'Signed the Czechoslovak Arms Deal',
        exp: 'Acquired 200 modern Soviet MiG-15 jet fighters, 300 T-34 tanks, and submarines, shattering the Western arms monopoly.',
      },
      {
        q: 'What massive infrastructure project on the River Nile did Nasser seek Western financial loans to build?',
        a: 'The Aswan High Dam',
        exp: 'Designed to generate national hydroelectric power and irrigate millions of acres of farmland to modernize Egypt.',
      },
      {
        q: 'Why did US Secretary of State John Foster Dulles abruptly cancel funding for the Aswan Dam in July 1956?',
        a: 'Anger over Nasser’s Soviet arms deal and Egypt’s diplomatic recognition of Communist China',
        exp: 'The US attempted to punish Nasser for non-alignment, provoking an immediate nationalist counter-stroke.',
      },
      {
        q: 'On what date did President Nasser announce the nationalisation of the Suez Canal Company in Alexandria?',
        a: '26 July 1956',
        exp: 'Declared canal toll revenues would fund construction of the Aswan Dam, triggering a major international crisis.',
      },
      {
        q: 'What secret tripartite military pact was signed in France in October 1956 to orchestrate war against Egypt?',
        a: 'The Protocol of Sèvres',
        exp: 'Britain, France, and Israel secretly conspired: Israel would attack Sinai, providing a pretext for Anglo-French intervention.',
      },
      {
        q: 'What military action did Israeli armored brigades launch on 29 October 1956 under the Sèvres plan?',
        a: 'Operation Kadesh (Invasion of the Sinai Peninsula)',
        exp: 'Paratroopers dropped at Mitla Pass while armor raced across Sinai, advancing toward the Suez Canal.',
      },
      {
        q: 'What fraudulent joint ultimatum did Britain and France issue to Egypt and Israel on 30 October 1956?',
        a: 'Demanded both armies withdraw 10 miles from the canal and accept Anglo-French occupation of key ports',
        exp: 'A transparent pre-planned ultimatum; Nasser rejected it, allowing Anglo-French forces to bomb Egyptian airfields.',
      },
      {
        q: 'Why was British Prime Minister Anthony Eden forced to declare a humiliating ceasefire on 6 November 1956?',
        a: 'US President Eisenhower threatened to collapse the British pound and block IMF emergency loans',
        exp: 'The US refused to support imperial aggression during the Cold War, exposing Britain as a second-rank global power.',
      },
      {
        q: 'What international peacekeeping force was stationed in Sinai and Sharm el-Sheikh following the 1956 war?',
        a: 'UNEF (United Nations Emergency Force)',
        exp: 'Guaranteed Israeli shipping free navigation through the Straits of Tiran and patrolled the Sinai frontier until 1967.',
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
        q: 'What major civil engineering system completed by Israel in 1964 pumped water from Lake Kinneret to the Negev?',
        a: 'The National Water Carrier',
        exp: 'Essential for Israeli agricultural survival; Arab states condemned it as an illegal theft of shared regional water.',
      },
      {
        q: 'What retaliatory civil engineering scheme did Arab states launch at the January 1964 Cairo Summit?',
        a: 'The Headwater Diversion Plan',
        exp: 'Attempted to divert the tributaries of the Jordan River (Hasbani and Banias) through Syria and Jordan to bypass Israel.',
      },
      {
        q: 'What umbrella nationalist organization was established at the Arab League Cairo Summit in January 1964?',
        a: 'The Palestine Liberation Organization (PLO)',
        exp: 'Founded under Ahmad Shukeiri with Egyptian backing to represent Palestinian claims and mobilize resistance.',
      },
      {
        q: 'Which armed Palestinian guerrilla faction, founded in Kuwait by Yasser Arafat, began sabotage attacks in 1965?',
        a: 'Fatah ("The Conquest")',
        exp: 'Carried out its first attack on the Israeli National Water Carrier on 1 January 1965, gaining rapid popularity.',
      },
      {
        q: 'Which elevated Syrian volcanic plateau overlooked Israeli farming kibbutzim in the Hula and Galilee valleys?',
        a: 'The Golan Heights',
        exp: 'Syrian military gunners used fortified bunkers along the ridge to shell Israeli tractors and farmers cultivating border zones.',
      },
      {
        q: 'What radical military coup seized power in Damascus in February 1966, aggressively championing "popular war"?',
        a: 'The radical Neo-Ba’athist military junta (Salah Jadid)',
        exp: 'Openly sponsored Fatah guerrilla operations and called for the immediate revolutionary overthrow of Israel.',
      },
      {
        q: 'What massive Israeli reprisal raid was launched into the Jordanian West Bank on 13 November 1966?',
        a: 'The Samu Raid',
        exp: 'The IDF attacked the village of Samu after a Fatah landmine killed Israeli soldiers, destroying 40 houses and killing 15 Jordanians.',
      },
      {
        q: 'What dramatic air battle took place between Israeli Mirages and Syrian MiG-21s on 7 April 1967?',
        a: 'The 7 April Aerial Clash (six Syrian MiGs shot down)',
        exp: 'Israeli jets downed six Syrian fighters and buzzed the suburbs of Damascus, severely humiliating the Syrian regime.',
      },
      {
        q: 'What fraudulent intelligence report did the Soviet Union pass to Egyptian military intelligence in early May 1967?',
        a: 'Falsely claimed Israel was massing 11 to 13 brigades on the Syrian border for an imminent invasion',
        exp: 'Soviet miscalculation aimed at protecting their Syrian ally, but pushed President Nasser into reckless military posturing.',
      },
      {
        q: 'What demand did President Nasser submit to UN Secretary-General U Thant on 16 May 1967?',
        a: 'Immediate evacuation of all UNEF peacekeepers from Sinai and Sharm el-Sheikh',
        exp: 'U Thant abruptly complied, removing the 10-year international buffer separating Egyptian and Israeli armies.',
      },
      {
        q: 'What bellicose military measure did Nasser take on 22 May 1967 that crossed Israel’s declared casus belli?',
        a: 'Closed the Straits of Tiran to all Israeli-flagged ships and strategic cargo',
        exp: 'Severed maritime access to the port of Eilat; Israeli leaders treated the blockade as an open act of war.',
      },
      {
        q: 'What historic military pact did King Hussein of Jordan sign with President Nasser in Cairo on 30 May 1967?',
        a: 'The Egyptian-Jordanian Joint Defence Treaty',
        exp: 'Placed the Jordanian army under Egyptian command, completing the hostile military encirclement of Israel on three fronts.',
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
        q: 'Who was appointed Israeli Minister of Defence on 1 June 1967 in response to immense public anxiety?',
        a: 'Moshe Dayan',
        exp: 'Renowned military leader whose appointment unified the national unity government and settled the decision to strike.',
      },
      {
        q: 'On what date did Israel launch Operation Focus, the pre-emptive air strike that began the Six-Day War?',
        a: '5 June 1967',
        exp: 'Launched at 07:45 am, timed to coincide with Egyptian pilots eating breakfast after early morning dawn patrols.',
      },
      {
        q: 'How did the Israeli Air Force (IAF) evade Egyptian radar networks during the opening attack of Operation Focus?',
        a: 'Flew extremely low over the Mediterranean Sea and maintained complete radio silence',
        exp: 'Approached Egyptian air bases from unexpected western and northern angles, taking airfields completely by surprise.',
      },
      {
        q: 'How many Egyptian combat aircraft were destroyed on the ground within the first three hours of Operation Focus?',
        a: 'Over 300 Egyptian aircraft (out of 420)',
        exp: 'Cratered runways with specialized Dibber concrete-penetrating bombs, trapping aircraft on the ground for destruction.',
      },
      {
        q: 'Which other Arab air forces attacked Israel on the afternoon of 5 June, leading to their immediate destruction?',
        a: 'Syria, Jordan, and Iraq',
        exp: 'IAF strikes wiped out the entire Jordanian air force and two-thirds of the Syrian air force by nightfall.',
      },
      {
        q: 'What decisive military advantage did Israel possess for the remainder of the six-day campaign?',
        a: 'Total and unchallenged air supremacy across all combat fronts',
        exp: 'Allowed Israeli fighter-bombers to blast enemy armor, supply convoys, and fortifications without opposition.',
      },
      {
        q: 'What vast desert territory was conquered from Egypt between 5 and 8 June 1967?',
        a: 'The Sinai Peninsula (and the Gaza Strip)',
        exp: 'Three Israeli armored divisions commanded by Tal, Yoffe, and Sharon swept to the banks of the Suez Canal.',
      },
      {
        q: 'Why did King Hussein of Jordan enter the war on 5 June despite secret warnings from Prime Minister Levi Eshkol?',
        a: 'Nasser broadcast fraudulent claims that Egyptian forces were marching victoriously toward Tel Aviv',
        exp: 'Misled into believing an Arab victory was underway, Jordanian artillery opened fire on West Jerusalem.',
      },
      {
        q: 'On what historic date did Israeli paratroopers capture the Old City of Jerusalem and reach the Western Wall?',
        a: '7 June 1967',
        exp: 'Colonel Motta Gur radioed the famous message: "The Temple Mount is in our hands!"; Jewish access was restored after 19 years.',
      },
      {
        q: 'What heavily fortified territory was captured from Syrian forces on 9–10 June 1967?',
        a: 'The Golan Heights',
        exp: 'Golani Brigade infantry and armor scaled steep volcanic escarpments under heavy fire, capturing Quneitra.',
      },
      {
        q: 'Approximately how many Arab soldiers were killed in the 1967 war compared to Israeli casualties?',
        a: 'Over 15,000 to 20,000 Arab soldiers compared to approximately 776 Israelis',
        exp: 'Demonstrated the overwhelming one-sidedness of the battlefield outcome produced by pre-emptive airpower.',
      },
      {
        q: 'How did the geographical footprint of territory under Israeli control change as a result of the Six-Day War?',
        a: 'Controlled territory more than tripled in size',
        exp: 'Acquired 42,000 square miles of strategic depth, but brought over 1 million hostile Palestinian Arabs under military rule.',
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
        q: 'Name the five distinct geographical territories captured and occupied by Israel in June 1967.',
        a: 'The Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights',
        exp: 'Transformed Israel from a narrow, vulnerable coastal state into the dominant military power in the region.',
      },
      {
        q: 'What uncompromising diplomatic resolution was adopted by Arab heads of state at Khartoum in September 1967?',
        a: 'The "Three Noes" of Khartoum',
        exp: '"No peace with Israel, no recognition of Israel, no negotiations with Israel."',
      },
      {
        q: 'What landmark diplomatic resolution was passed unanimously by the UN Security Council on 22 November 1967?',
        a: 'UN Security Council Resolution 242',
        exp: 'Formulated by British ambassador Lord Caradon, establishing the foundational principle of "Land for Peace".',
      },
      {
        q: 'What were the two core reciprocal requirements set out in UN Resolution 242?',
        a: 'Israeli withdrawal from occupied land in exchange for Arab recognition of Israel’s sovereignty within secure borders',
        exp: 'Linked territorial withdrawal directly to permanent peace, ending the state of belligerency.',
      },
      {
        q: 'What linguistic ambiguity between the English and French versions of Resolution 242 fueled ongoing deadlock?',
        a: 'Omission of the definite article "the" in English ("territories occupied" vs French "des territoires")',
        exp: 'Israel claimed it required withdrawal from some territories, while Arab states demanded withdrawal from all territories.',
      },
      {
        q: 'What immediate administrative action did the Israeli government take regarding East Jerusalem in late June 1967?',
        a: 'Formally annexed East Jerusalem, declaring the unified city the eternal capital of Israel',
        exp: 'Demolished the historic Moroccan Quarter to create a plaza before the Western Wall; rejected by the UN.',
      },
      {
        q: 'Approximately how many additional Palestinian Arabs were displaced as refugees by the 1967 war?',
        a: 'Approximately 300,000 Palestinian Arabs',
        exp: 'Over 200,000 fled across the Jordan River into Jordan, creating a second massive humanitarian refugee crisis.',
      },
      {
        q: 'What controversial settlement policy did Israel initiate in the conquered West Bank and Golan after 1967?',
        a: 'Constructing civilian Jewish settlements (Allon Plan outposts)',
        exp: 'Initially built security outposts along the Jordan Valley, evolving into permanent ideological civilian communities.',
      },
      {
        q: 'What messianic Zionist movement emerged after 1967 to spearhead illegal settlement in biblical Judea and Samaria?',
        a: 'Gush Emunim ("Bloc of the Faithful")',
        exp: 'Believed Jewish settlement across the entire biblically promised Land of Israel was a religious commandment.',
      },
      {
        q: 'What massive 25-metre fortified sand barrier and bunker chain did Israel construct along the Suez Canal from 1968?',
        a: 'The Bar-Lev Line',
        exp: 'Cost $300 million; built to withstand heavy Egyptian artillery and prevent an amphibious assault across the canal.',
      },
      {
        q: 'What static, low-intensity conflict erupted along the Suez Canal between Egypt and Israel from 1969 to 1970?',
        a: 'The War of Attrition',
        exp: 'Involved relentless Egyptian artillery bombardments and commando raids met by deep-penetration Israeli air strikes.',
      },
      {
        q: 'Which superpower intervened directly in 1970 to construct a dense SAM missile umbrella along the Suez Canal?',
        a: 'The Soviet Union (USSR)',
        exp: 'Deployed thousands of Soviet advisors, SAM-3 surface-to-air missiles, and combat pilots who clashed with Israeli jets.',
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
        q: 'What March 1968 battle in Jordan transformed Yasser Arafat and Fatah into celebrated resistance icons?',
        a: 'The Battle of Karameh',
        exp: 'Palestinian fedayeen inflicted heavy casualties on an Israeli armored raid, inspiring thousands of young Arab recruits.',
      },
      {
        q: 'Who was elected Chairman of the Executive Committee of the PLO in February 1969?',
        a: 'Yasser Arafat',
        exp: 'Marked the moment Palestinian guerrilla leaders took over the PLO from traditional Arab League diplomats.',
      },
      {
        q: 'Why did armed PLO factions generate severe political friction with King Hussein of Jordan by 1970?',
        a: 'The PLO created a "state within a state", setting up checkpoints and defying Jordanian law in Amman',
        exp: 'Armed guerrillas challenged royal authority, collected taxes, and provoked devastating Israeli reprisal raids on Jordan.',
      },
      {
        q: 'Which radical Marxist Palestinian faction, led by George Habash, pioneered international airliner hijackings?',
        a: 'The Popular Front for the Liberation of Palestine (PFLP)',
        exp: 'Argued that hijackings would shock the international public and force the forgotten Palestinian plight onto world television.',
      },
      {
        q: 'What spectacular multi-plane hijacking was executed by the PFLP in Jordan in September 1970?',
        a: 'The Dawson’s Field Hijackings',
        exp: 'Forced three hijacked Western jetliners to land at a remote desert strip, holding 300 hostages before blowing up the planes.',
      },
      {
        q: 'What brutal civil conflict was launched by the Jordanian Army against the PLO in September 1970?',
        a: 'Black September (The Jordanian Civil War)',
        exp: 'King Hussein ordered his tanks and Bedouin troops to shell Palestinian camps in Amman, killing thousands of fighters.',
      },
      {
        q: 'Which neighboring Arab nation sent an armored division into northern Jordan to assist the PLO in September 1970?',
        a: 'Syria',
        exp: 'Syrian tanks intervened, but withdrew after Jordan’s air force attacked and Israel mobilized armor on the border.',
      },
      {
        q: 'Where did Yasser Arafat and the surviving PLO leadership relocate their military headquarters after expulsion from Jordan?',
        a: 'Lebanon (establishing headquarters in Beirut and southern bases)',
        exp: 'Created a new enclave dubbed "Fatahland" in southern Lebanon, launching cross-border rocket attacks into northern Israel.',
      },
      {
        q: 'What covert terrorist faction was formed within Fatah to carry out international revenge operations?',
        a: 'The Black September Organization',
        exp: 'Assassinated Jordanian Prime Minister Wasfi Tel in Cairo in 1971 and masterminded the Munich Olympic attack.',
      },
      {
        q: 'What international terrorist atrocity was carried out by Black September in September 1972?',
        a: 'The Munich Olympics Massacre',
        exp: 'Infiltrated the Olympic Village, murdered two Israeli athletes, and took nine hostage; all nine were killed at Fürstenfeldbruck airfield.',
      },
      {
        q: 'What covert retaliation operation was authorized by Israeli Prime Minister Golda Meir following Munich?',
        a: 'Operation Wrath of God (Mivtza Za’am HaEl)',
        exp: 'Mossad assassination teams tracked down and eliminated suspected Black September organizers across European capitals.',
      },
      {
        q: 'What was the paradoxical international consequence of Palestinian airline hijackings and the Munich attack?',
        a: 'Attracted worldwide condemnation for terrorism while propelling the Palestinian national identity onto the global stage',
        exp: 'Forced Western powers to recognise that Middle East peace was impossible without addressing Palestinian national rights.',
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
        q: 'Who succeeded Gamal Abdel Nasser as President of Egypt following Nasser’s death in September 1970?',
        a: 'Anwar Sadat',
        exp: 'Initially underestimated, Sadat formulated a bold strategy to break the diplomatic stalemate and reclaim the Sinai.',
      },
      {
        q: 'On what Jewish holiest day and Muslim fasting month did Egypt and Syria launch their surprise attack in 1973?',
        a: 'Yom Kippur (The Day of Atonement) / The Holy Month of Ramadan (6 October 1973)',
        exp: 'Radio networks were silent, Israeli soldiers were in synagogues, and military call-ups were critically delayed.',
      },
      {
        q: 'What was the code name of Egypt’s meticulously planned assault crossing of the Suez Canal on 6 October 1973?',
        a: 'Operation Badr',
        exp: '100,000 Egyptian troops crossed the canal in rubber dinghies under cover of a massive 2,000-gun artillery barrage.',
      },
      {
        q: 'How did Egyptian combat engineers rapidly breach the 25-metre high Bar-Lev sand wall along the canal?',
        a: 'Blasted passages through the sand ramparts using high-pressure water cannons',
        exp: 'Washed away millions of cubic metres of sand in hours, allowing pontoon bridges to deploy heavy armor into Sinai.',
      },
      {
        q: 'Which Soviet-supplied air defence weapon systems neutralized Israeli fighter jets over the canal in the first 72 hours?',
        a: 'Mobile Soviet SAM surface-to-air missiles (SAM-6 Gainful and ZSU-23 quad anti-aircraft guns)',
        exp: 'Created an impenetrable missile shield extending 10km east of the canal, shooting down over 100 Israeli aircraft.',
      },
      {
        q: 'What fierce armored battle took place on the Golan Heights on 6–7 October as 1,400 Syrian tanks attacked 180 Israeli tanks?',
        a: 'The Battle of the "Valley of Tears" (Emek HaBacha)',
        exp: 'Heroic Israeli armored resistance blunted the Syrian offensive just miles from the Jordan River bridges until reserves arrived.',
      },
      {
        q: 'Who served as Prime Minister and Minister of Defence of Israel during the 1973 Yom Kippur War?',
        a: 'Golda Meir (Prime Minister) and Moshe Dayan (Minister of Defence)',
        exp: 'Both faced crushing domestic criticism for ignoring intelligence warnings and suffering catastrophic opening casualties.',
      },
      {
        q: 'What massive emergency military airlift was launched by the United States to replenish Israeli losses in mid-October?',
        a: 'Operation Nickel Grass',
        exp: 'Dispatched 22,000 tons of tanks, artillery, and precision electronic countermeasures, restoring the IDF’s offensive capacity.',
      },
      {
        q: 'Which charismatic Israeli general led an armored counter-crossing across the Suez Canal into mainland Egypt?',
        a: 'General Ariel Sharon',
        exp: 'Exploited a seam between the Egyptian Second and Third Armies, crossing at Deversoir and encircling the Third Army.',
      },
      {
        q: 'What economic weapon did Arab oil producers (OAPEC) deploy against the US and Netherlands during the war?',
        a: 'The 1973 Arab Oil Embargo',
        exp: 'Cut petroleum production by 5% monthly and halted exports to Israel’s allies, triggering a quadrupling of world oil prices.',
      },
      {
        q: 'On what date did the UN Security Council enforce a definitive ceasefire halting the 1973 war?',
        a: '25 October 1973 (UN Resolutions 338 and 339)',
        exp: 'Ceasefire negotiated as Soviet leaders threatened military intervention to rescue Egypt’s encircled Third Army.',
      },
      {
        q: 'What Israeli official commission of inquiry investigated the disastrous military and intelligence failures of October 1973?',
        a: 'The Agranat Commission',
        exp: 'Condemned military chief David Elazar for complacency, leading to the resignation of Prime Minister Golda Meir in 1974.',
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
        q: 'What international cartel of petroleum-exporting nations orchestrated the 1973 oil embargo?',
        a: 'OPEC (specifically OAPEC - Organization of Arab Petroleum Exporting Countries)',
        exp: 'Led by King Faisal of Saudi Arabia, utilizing crude oil as an overt political weapon to pressure the West.',
      },
      {
        q: 'By what factor did global crude oil prices surge between October 1973 and January 1974?',
        a: 'Prices quadrupled (surging from $3 to nearly $12 per barrel)',
        exp: 'Triggered severe fuel rationing, nationwide motorway speed reductions, and global economic stagflation in the West.',
      },
      {
        q: 'How did the oil embargo influence foreign policy toward the Middle East in Western Europe and Japan?',
        a: 'Compelled Western nations to distance themselves from Israel and adopt a more pro-Arab diplomatic position',
        exp: 'Dependence on Middle Eastern oil forced European governments to demand Israeli compliance with Resolution 242.',
      },
      {
        q: 'Which US Secretary of State pioneered "shuttle diplomacy" between Middle Eastern capitals from 1974 to 1975?',
        a: 'Henry Kissinger',
        exp: 'Flew relentlessly between Cairo, Jerusalem, and Damascus in his Boeing 707, mediating bilateral step-by-step accords.',
      },
      {
        q: 'What step-by-step military agreement was signed between Israel and Egypt in January 1974?',
        a: 'The Sinai I Disengagement Accord (Sinai Agreement)',
        exp: 'Both armies pulled back from the canal, establishing a UN buffer zone and relieving the encircled Egyptian Third Army.',
      },
      {
        q: 'What breakthrough disengagement agreement was negotiated between Israel and Syria in May 1974?',
        a: 'The Golan Disengagement Agreement (UNDOF)',
        exp: 'Israel withdrew from the pocket captured in 1973 and Quneitra, establishing a lasting UN observer force (UNDOF).',
      },
      {
        q: 'What vital international waterway was cleared of mines and wrecks and reopened by President Sadat in June 1975?',
        a: 'The Suez Canal',
        exp: 'Reopened to global maritime commerce on the eighth anniversary of the Six-Day War after being closed since 1967.',
      },
      {
        q: 'What second interim bilateral agreement did Egypt and Israel sign in September 1975?',
        a: 'The Sinai II Accord (Sinai Interim Agreement)',
        exp: 'Israel withdrew further into Sinai, relinquishing the strategic Giddi and Mitla passes and the Abu Rudeis oilfields.',
      },
      {
        q: 'What did President Sadat promise the United States and Israel under the Sinai II Accord?',
        a: 'Pledged that conflicts between Egypt and Israel would be resolved peacefully without resort to military force',
        exp: 'Effectively decoupled Egypt from the Arab military alliance, neutralizing the primary threat to Israel.',
      },
      {
        q: 'What was the central strategic goal of Henry Kissinger’s step-by-step diplomatic approach in the Middle East?',
        a: 'To displace Soviet influence and establish the United States as the sole indispensable mediator in the region',
        exp: 'Succeeded in drawing Egypt firmly into the American orbit while marginalizing Soviet diplomatic power.',
      },
      {
        q: 'Which Israeli Labour Prime Minister negotiated the 1974 and 1975 disengagement accords with Kissinger?',
        a: 'Yitzhak Rabin',
        exp: 'Elected following Golda Meir’s resignation; cautious military chief who agreed to interim territorial concessions.',
      },
      {
        q: 'Why did Syria, Iraq, and the PLO bitterly condemn Sadat’s bilateral negotiations with Israel and Kissinger?',
        a: 'Accused Sadat of betraying Arab unity and abandoning the Palestinian cause for separate Egyptian territorial gain',
        exp: 'Deepened the political rift between moderate Egypt and rejectionist Arab regimes.',
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
        q: 'Which right-wing Likud leader was elected Prime Minister of Israel in May 1977, ending 29 years of Labour rule?',
        a: 'Menachem Begin',
        exp: 'Former commander of the Irgun who held an ideological commitment to Greater Israel (Eretz Israel) in Judea and Samaria.',
      },
      {
        q: 'What sensational announcement did President Anwar Sadat make to the Egyptian Parliament on 9 November 1977?',
        a: 'Announced he was ready to travel to the Israeli Knesset in Jerusalem to negotiate peace face-to-face',
        exp: 'Shattered 30 years of Arab diplomatic taboo, demonstrating immense personal bravery in seeking an end to war.',
      },
      {
        q: 'On what historic dates did Anwar Sadat make his visit to Jerusalem and address the Israeli parliament?',
        a: '19–20 November 1977',
        exp: 'Greeted at Ben-Gurion Airport by Begin and Meir; addressed the Knesset declaring "No more war, no more bloodshed".',
      },
      {
        q: 'Which US President invited Sadat and Begin to 13 days of secluded negotiations at his Maryland retreat in September 1978?',
        a: 'President Jimmy Carter',
        exp: 'Engaged in relentless personal mediation at Camp David, preventing negotiations from collapsing over Sinai settlements.',
      },
      {
        q: 'What two framework documents were signed by Sadat and Begin at the White House on 17 September 1978?',
        a: 'The Camp David Accords',
        exp: 'Contained "A Framework for Peace in the Middle East" (Palestinian autonomy) and "A Framework for an Egypt-Israel Treaty".',
      },
      {
        q: 'On what date was the formal Egypt-Israel Peace Treaty signed on the White House lawn in Washington?',
        a: '26 March 1979 (The Treaty of Washington)',
        exp: 'The first formal peace treaty signed between Israel and an Arab sovereign state in modern history.',
      },
      {
        q: 'What major territorial concession did Israel make under the 1979 treaty?',
        a: 'Returned the entire Sinai Peninsula to Egypt in phased stages over three years',
        exp: 'Dismantled all Israeli military airbases, naval installations, and civilian settlements in Sinai, including Yamit.',
      },
      {
        q: 'What strategic concessions did Egypt grant to Israel under the 1979 peace treaty?',
        a: 'Full diplomatic relations, demilitarisation of Sinai, and unimpeded transit through the Suez Canal and Tiran',
        exp: 'Exchanged ambassadors and opened direct borders, eliminating Egypt from the Arab military coalition.',
      },
      {
        q: 'What prestigious international honor was awarded jointly to Anwar Sadat and Menachem Begin in 1978?',
        a: 'The Nobel Peace Prize',
        exp: 'Recognized their historic statesmanship in overcoming psychological hostility to sign the Camp David framework.',
      },
      {
        q: 'Why did Palestinian leaders condemn the Camp David Accords as a betrayal of their national aspirations?',
        a: 'Offered only vague administrative "autonomy" for the West Bank and Gaza while ignoring sovereign Palestinian statehood',
        exp: 'Begin made peace with Egypt so Israel could retain permanent sovereign control over the West Bank.',
      },
      {
        q: 'How did the Arab League respond to Egypt signing the 1979 peace treaty with Israel?',
        a: 'Expelled Egypt from the Arab League, severed diplomatic ties, and moved League headquarters to Tunis',
        exp: 'Egypt was treated as an outcast state by fellow Arab nations for breaking the united front against Israel.',
      },
      {
        q: 'What tragic fate befell President Anwar Sadat on 6 October 1981 in Cairo?',
        a: 'Assassinated by Egyptian Islamic Jihad militants during a military victory parade',
        exp: 'Gunmen led by Lieutenant Islambouli fired on the reviewing stand, enraged by the peace treaty with Israel.',
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
        q: 'What famous phrase did PLO Chairman Yasser Arafat declare concluding his historic address to the UN in November 1974?',
        a: '"Do not let the olive branch fall from my hand"',
        exp: 'Appeared wearing a holster, offering the international community a choice between diplomatic peace and armed struggle.',
      },
      {
        q: 'What diplomatic recognition did the UN General Assembly grant to the PLO in November 1974?',
        a: 'Permanent UN Observer Status (Resolution 3237)',
        exp: 'Recognized the PLO as the sole legitimate representative of the Palestinian people on the world stage.',
      },
      {
        q: 'What cross-border Israeli military offensive into southern Lebanon was launched in March 1978?',
        a: 'Operation Litani',
        exp: 'Launched after the Coastal Road massacre in Tel Aviv; the IDF cleared PLO bases south of the Litani River, leading to UNIFIL.',
      },
      {
        q: 'What full-scale military invasion of Lebanon did the Israeli government launch on 6 June 1982?',
        a: 'Operation Peace for Galilee (The First Lebanon War)',
        exp: 'Triggered by the Abu Nidal assassination attempt on Israeli ambassador Shlomo Argov in London.',
      },
      {
        q: 'What was the publicly stated objective of Operation Peace for Galilee presented to the Israeli cabinet?',
        a: 'To push PLO artillery and Katyusha rocket batteries 40 kilometers north of the Israeli border',
        exp: 'Promised to protect northern Israeli towns in Galilee from cross-border rocket bombardment.',
      },
      {
        q: 'Which Israeli Minister of Defence drove the armored assault all the way to Beirut, expanding the war’s aims?',
        a: 'Ariel Sharon',
        exp: 'Aimed to destroy the PLO infrastructure entirely and install Bashir Gemayel’s Christian Maronite regime in Lebanon.',
      },
      {
        q: 'What protracted military siege was conducted by the IDF throughout July and August 1982?',
        a: 'The Siege of West Beirut',
        exp: 'Subjected West Beirut to intense aerial and artillery bombardment, cutting off water and electricity to force a PLO surrender.',
      },
      {
        q: 'Where were Yasser Arafat and approximately 14,000 PLO fighters evacuated to by sea in August 1982?',
        a: 'Tunis (Tunisia) and other distant Arab nations',
        exp: 'Evacuated under US, French, and Italian supervision, removing the PLO military leadership far from Israel’s borders.',
      },
      {
        q: 'What horrific massacre of Palestinian refugees was perpetrated in Beirut in September 1982?',
        a: 'The Sabra and Shatila Massacre',
        exp: 'Lebanese Christian Phalangist militia entered the camps and slaughtered between 800 and 2,000 unarmed civilians.',
      },
      {
        q: 'What official Israeli judicial inquiry investigated the Sabra and Shatila atrocities in 1983?',
        a: 'The Kahan Commission',
        exp: 'Concluded Defense Minister Ariel Sharon bore personal indirect responsibility for failing to prevent the slaughter, forcing his resignation.',
      },
      {
        q: 'What massive anti-war demonstration took place in Tel Aviv in September 1982 following Sabra and Shatila?',
        a: 'The 400,000-person Peace Now Rally',
        exp: 'Nearly 10% of Israel’s population protested in Kings of Israel Square, demanding a full independent judicial inquiry.',
      },
      {
        q: 'What radical Iranian-backed Shia militant movement emerged in southern Lebanon to wage guerrilla war against the IDF?',
        a: 'Hezbollah ("The Party of God")',
        exp: 'Utilized suicide bombings and roadside ambushes, compelling Israel to withdraw into a narrow southern "security zone" by 1985.',
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
        q: 'What tragic incident on 8 December 1987 triggered the spontaneous outbreak of the First Intifada in Gaza?',
        a: 'An Israeli military tank transport collided with civilian cars in Jabalya camp, killing four Palestinian workers',
        exp: 'Rumours spread that the crash was deliberate retaliation for a fatal stabbing, sparking mass riots across Gaza.',
      },
      {
        q: 'What is the literal translation of the Arabic word "Intifada"?',
        a: '"Shaking off" (The Uprising)',
        exp: 'Signified the Palestinian population shaking off decades of fear, humiliation, and Israeli military occupation.',
      },
      {
        q: 'What iconic tactical weapon was deployed by Palestinian youths, giving them the title "Children of the Stones"?',
        a: 'Slingshots, stones, and petrol bombs against armored IDF patrols',
        exp: 'Asymmetric street combat created striking global television imagery of unarmed youths facing heavily armed Israeli soldiers.',
      },
      {
        q: 'What clandestine internal committee organized strikes, boycotts, and protest leaflets across the territories?',
        a: 'The Unified National Leadership of the Uprising (UNLU)',
        exp: 'Composed of local grassroots activists affiliated with PLO factions, directing civil disobedience independently of Tunis.',
      },
      {
        q: 'What non-violent civil disobedience tactics characterized the early phase of the First Intifada?',
        a: 'Commercial strikes, withholding Israeli taxes, boycotting Israeli goods, and erecting street barricades',
        exp: 'Aimed to make the occupied territories ungovernable and disconnect the Palestinian economy from Israel.',
      },
      {
        q: 'What controversial military policy was implemented by Israeli Defence Minister Yitzhak Rabin to crush the unrest?',
        a: 'The "Iron Fist" policy ("force, might and beatings")',
        exp: 'Authorized troops to break the bones of stone-throwers, demolish homes, and impose indefinite village curfews.',
      },
      {
        q: 'What Islamist militant organization was founded in Gaza in December 1987 by Sheikh Ahmed Yassin?',
        a: 'Hamas (The Islamic Resistance Movement)',
        exp: 'Emerged from the Muslim Brotherhood; its 1988 charter rejected compromise and demanded an Islamic state across historic Palestine.',
      },
      {
        q: 'How did the founding of Hamas pose a severe internal political threat to Yasser Arafat and the PLO?',
        a: 'Directly challenged the secular nationalist leadership of the PLO by combining social welfare with violent holy war',
        exp: 'Refused to recognize Israel, rejecting the diplomatic compromise being pursued by Arafat’s moderate Fatah faction.',
      },
      {
        q: 'What historic diplomatic disengagement was announced by King Hussein of Jordan in July 1988?',
        a: 'Severed all administrative and legal ties with the West Bank',
        exp: 'Relinquished Jordanian sovereignty claims over the West Bank, forcing the PLO to assume direct responsibility for statehood.',
      },
      {
        q: 'How many Palestinians and Israelis were killed during the six years of the First Intifada (1987–1993)?',
        a: 'Over 1,000 Palestinians and approximately 160 Israelis (plus hundreds of alleged Palestinian collaborators)',
        exp: 'Severe casualties and detention of tens of thousands demonstrated that military force could not extinguish national revolt.',
      },
      {
        q: 'How did international television broadcasts of the Intifada impact global attitudes toward the conflict?',
        a: 'Deeply damaged Israel’s moral standing and generated widespread international sympathy for Palestinian self-determination',
        exp: 'Reversed the public narrative: Israel was seen as the Goliath military occupier and Palestinians as the David resistance.',
      },
      {
        q: 'What profound realization did the First Intifada force upon Israeli military and political leaders like Yitzhak Rabin?',
        a: 'Proved that maintaining permanent military rule over 1.7 million hostile Palestinians was politically and demographically unsustainable',
        exp: 'Convinced Rabin that Israel had to negotiate an interim political separation with the Palestinian leadership.',
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
        q: 'What did PLO Chairman Yasser Arafat publicly declare in his historic address to the UN in Geneva in December 1988?',
        a: 'Renounced all forms of terrorism, accepted UN Resolutions 242/338, and recognized Israel’s right to exist',
        exp: 'Fulfilled American conditions, prompting US Secretary of State George Shultz to open official diplomatic dialogue with the PLO.',
      },
      {
        q: 'How did the collapse of the Soviet Union in 1989–91 fundamentally alter Middle Eastern geopolitical dynamics?',
        a: 'Deprived radical Arab states and the PLO of their primary superpower sponsor and arms supplier',
        exp: 'Left the United States as the sole global superpower and allowed 1 million Russian Jews to emigrate to Israel.',
      },
      {
        q: 'Which Iraqi dictator did Yasser Arafat disastrously endorse during the 1990–91 Persian Gulf War?',
        a: 'Saddam Hussein',
        exp: 'Alienated wealthy Gulf Arab donors (Kuwait and Saudi Arabia), cutting PLO financial subsidies and expelling 300,000 Palestinians.',
      },
      {
        q: 'What landmark international peace conference convened in Spain in October 1991 following the Gulf War?',
        a: 'The Madrid Peace Conference',
        exp: 'Co-sponsored by the US and USSR, bringing Israeli, Jordanian, Syrian, and Palestinian negotiators face-to-face for the first time.',
      },
      {
        q: 'Which Israeli Labour leader was elected Prime Minister in June 1992 on a mandate to achieve peace?',
        a: 'Yitzhak Rabin',
        exp: 'Defeated Likud’s Yitzhak Shamir, freezing new settlement construction and authorizing secret backchannel peace negotiations.',
      },
      {
        q: 'Where did secret backchannel negotiations between Israeli and PLO representatives take place in early 1993?',
        a: 'Oslo (Norway)',
        exp: 'Facilitated by Norwegian academics and Foreign Minister Johan Jørgen Holst in secluded country houses, bypassing public scrutiny.',
      },
      {
        q: 'What historic diplomatic documents were exchanged by Rabin and Arafat on 9–10 September 1993?',
        a: 'The Letters of Mutual Recognition',
        exp: 'The PLO recognized Israel’s right to exist in peace; Israel recognized the PLO as the legitimate representative of the Palestinian people.',
      },
      {
        q: 'On what historic date was the Declaration of Principles (Oslo I Accord) signed on the White House lawn?',
        a: '13 September 1993',
        exp: 'Sealed by the iconic handshake between Rabin and Arafat hosted by Bill Clinton, creating a 5-year interim autonomy timetable.',
      },
      {
        q: 'What interim governing institution was established under the Oslo Accords to administer Palestinian civilian life?',
        a: 'The Palestinian National Authority (PNA / PA)',
        exp: 'Established in 1994 with Yasser Arafat returning from exile to become its first democratically elected President.',
      },
      {
        q: 'Which neighboring Arab nation signed a formal peace treaty with Israel on 26 October 1994?',
        a: 'The Hashemite Kingdom of Jordan (King Hussein)',
        exp: 'Resolved long-standing water allocations and border disputes, making Jordan the second Arab state to normalize relations.',
      },
      {
        q: 'What three distinct administrative zones did the Oslo II Accord (Taba, 1995) divide the West Bank into?',
        a: 'Area A (Palestinian control), Area B (joint Palestinian civil/Israeli security), and Area C (full Israeli control)',
        exp: 'Created a fragmented archipelago of Palestinian enclaves; Area C contained all Jewish settlements, bypass roads, and borders.',
      },
      {
        q: 'What catastrophic assassination in Tel Aviv on 4 November 1995 dealt a fatal blow to the Oslo peace process?',
        a: 'The assassination of Israeli Prime Minister Yitzhak Rabin',
        exp: 'Shot dead by right-wing Jewish extremist Yigal Amir at a massive peace rally, derailing moderate momentum for compromise.',
      },
    ],
  },
];

module.exports = { CME_PEARSON_QUIZ_BANK };
