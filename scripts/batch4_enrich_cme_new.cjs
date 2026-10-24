const fs = require('fs');
const path = require('path');

function parseDurationSecs(dur) {
  if (!dur) return 999999;
  let secs = 0;
  const hrMatch = dur.match(/(\d+)\s*hr/i);
  const minMatch = dur.match(/(\d+)\s*min/i);
  const secMatch = dur.match(/(\d+)\s*sec/i);
  if (hrMatch) secs += parseInt(hrMatch[1], 10) * 3600;
  if (minMatch) secs += parseInt(minMatch[1], 10) * 60;
  if (secMatch) secs += parseInt(secMatch[1], 10);
  return secs > 0 ? secs : 999999;
}

const cmePedagogy = {
  // L1
  '[STARTER HOOK] The Sykes-Picot Agreement & The Partition of the Ottoman Empire': {
    task: 'How did the secret 1916 Sykes-Picot Agreement between Britain and France create artificial borders and conflicting wartime promises in the Middle East?',
    answer:
      "In May 1916, British diplomat Sir Mark Sykes and French diplomat François Georges-Picot secretly drew the 'line in the sand', partitioning the Arab provinces of the collapsing Ottoman Empire into French zones of control (Syria, Lebanon) and British zones (Mesopotamia, Transjordan, and Palestine). This secret pact directly contradicted British promises made by Sir Henry McMahon to the Sharif of Mecca (Hussein bin Ali) in 1915–16 pledging British support for independent Arab statehood in exchange for the Arab Revolt against the Turks, planting decades of bitterness over imperial betrayal.",
  },
  '[ENQUIRY EVIDENCE] The Balfour Declaration: Historical Context & British Motives (1917)': {
    task: 'What strategic motives prompted British Foreign Secretary Arthur Balfour to issue the 1917 Balfour Declaration, and what inherent contradictions did its 67 words contain?',
    answer:
      "On 2 November 1917, Foreign Secretary Arthur Balfour declared British support for 'the establishment in Palestine of a national home for the Jewish people'. Britain was driven by imperial strategy to secure the eastern approaches to the Suez Canal and by the belief that supporting Zionism would rally American and Russian Jewish support for the Allied war effort. However, the declaration contained an impossible contradiction: promising a Jewish national home while stating 'nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities', completely ignoring the national and political aspirations of Palestine's 90% Arab majority.",
  },

  // L2
  'Land Divided (1947-56) | The 50 Years War: Israel and the Arabs (Part 1)': {
    task: 'Why did the United Nations approve Resolution 181 partitioning Palestine in November 1947, and how did Jewish and Arab leaders react?',
    answer:
      'Confronted by post-war Zionist insurgency, global sympathy for Holocaust survivors, and severe financial exhaustion, Britain referred the Palestine mandate to the UN in 1947. UN Resolution 181 proposed dividing Palestine into independent Jewish and Arab states, with Jerusalem under international trusteeship (corpus separatum). David Ben-Gurion and Jewish leaders accepted the partition despite being awarded fragmented borders, viewing it as essential sovereign recognition. Arab leaders and Palestinian representatives rejected partition completely as fundamentally illegitimate, arguing it granted 56% of Palestine to a Jewish population that owned less than 7% of the land and constituted only one-third of the inhabitants.',
  },
  '[STARTER HOOK] GCSE Rapid Revision: Creation of the State of Israel (1945–1949)': {
    task: "What sequence of events between the King David Hotel bombing (1946) and David Ben-Gurion's declaration on 14 May 1948 culminated in Israeli statehood?",
    answer:
      'Following the Second World War, the Jewish resistance movement escalated attacks against British mandate authority: in July 1946, the Irgun bombed the British administrative headquarters at the King David Hotel in Jerusalem, killing 91 people. Unable to maintain order, Britain announced its unilateral withdrawal. On 14 May 1948, hours before the British mandate expired, David Ben-Gurion proclaimed the establishment of the State of Israel under the portrait of Theodor Herzl in Tel Aviv. The following morning, armies from Egypt, Jordan, Syria, Iraq, and Lebanon invaded, triggering the First Arab-Israeli War.',
  },
  '[ENQUIRY EVIDENCE] Post-War Jewish Immigration & The Exodus 1947 Affair': {
    task: 'How did the British interception of the refugee ship SS Exodus in July 1947 create an international public relations disaster that undermined British mandate rule?',
    answer:
      'In July 1947, the Haganah chartered the SS Exodus carrying 4,500 Holocaust survivors without legal immigration certificates. Royal Navy warships rammed the vessel off the coast of Palestine and boarded it with tear gas. Rather than interning the refugees in Cyprus, British Foreign Secretary Ernest Bevin ordered the passengers forcibly transported back across Europe to displaced persons camps in British-occupied Germany. International press photographs of Holocaust survivors trapped behind barbed wire on British prison ships shocked world public opinion, especially in the United States, convincing Britain that the Mandate was politically untenable.',
  },
  '[EXAM EXTENSION] 20th Century History: Israel and the Arab States – The 1948 War (BBC)': {
    task: 'What military and organizational advantages enabled Israeli forces to defeat the coordinated invasion by five Arab armies in the 1948–49 War?',
    answer:
      'Although seemingly outnumbered by five Arab states, Israeli forces held critical strategic advantages: the newly formed Israel Defense Forces (IDF) operated under unified national command under David Ben-Gurion, mobilized over 100,000 highly motivated fighters (many with WWII combat experience), and received crucial shipments of advanced weapons and fighter aircraft from Czechoslovakia during the first UN truce. In contrast, the Arab armies were poorly coordinated, divided by mutual rivalries (King Abdullah of Jordan sought only the West Bank, clashing with Egypt), lacked central logistics, and fielded barely 40,000 combat troops on the front lines.',
  },

  // L3
  '[STARTER HOOK] GCSE Revision: The Reshaping of the Middle East (1948–1949)': {
    task: 'How did the 1949 Armistice Agreements redraw the political map of the Middle East and leave Palestinians stateless?',
    answer:
      "The 1949 Armistice Agreements (the 'Green Line') dramatically reshaped the region: Israel expanded its territory by 21% beyond the original UN partition borders, controlling 78% of mandatory Palestine. The proposed Palestinian Arab state was erased: King Abdullah of Jordan annexed the West Bank and East Jerusalem, while Egypt occupied the Gaza Strip under military administration. Over 700,000 Palestinian Arabs became displaced refugees dispersed into camps across Jordan, Lebanon, Syria, and Gaza, without a sovereign state of their own.",
  },
  '[PRIMARY EVIDENCE] The 1948 Arab-Israeli War & Al-Nakba ("The Catastrophe")': {
    task: 'What historical factors caused the mass displacement of over 700,000 Palestinian Arabs during the 1948 War, remembered by Palestinians as the Nakba?',
    answer:
      "The Palestinian Nakba ('The Catastrophe') resulted from multiple converging factors: panic and flight triggered by armed conflict, the collapse of Palestinian urban leadership and municipal services, and deliberate expulsions by Jewish forces under 'Plan Dalet' to secure vital transport corridors (such as the forced expulsions from Lydda and Ramle in July 1948). The psychological terror caused by the massacre of over 100 villagers at Deir Yassin by Irgun and Lehi fighters in April 1948 caused widespread civilian panic. When the war ended, Israel passed the Absentees' Property Law and refused to allow refugees to return, cementing permanent exile.",
  },
  "[ENQUIRY PERSPECTIVE] 1948: Israel's War of Independence & Defence of Statehood": {
    task: 'How did Israeli society view the 1948 conflict as an existential struggle for national survival, and what sacrifices did it entail?',
    answer:
      "To Israelis, the 1948 War was the 'War of Independence' (Milchemet HaAtzma'ut)—a desperate, existential fight for survival against annihilation by surrounding Arab armies just three years after the Holocaust. The fledgling state suffered catastrophic casualties: over 6,000 Israelis were killed (roughly 1% of the entire Jewish population). For Israelis, survival and victory validated Zionism, establishing a secure national homeland that immediately absorbed hundreds of thousands of European Holocaust survivors and Jewish refugees expelled from Arab nations across the Middle East.",
  },

  // L4
  '[STARTER HOOK] GCSE Revision: President Nasser & The 1956 Suez Crisis': {
    task: 'Why did Egyptian President Gamal Abdel Nasser nationalize the Suez Canal in July 1956, and what was the tripartite response?',
    answer:
      'President Gamal Abdel Nasser nationalized the British and French-owned Suez Canal Company on 26 July 1956 to assert Egyptian national sovereignty and use canal transit tolls to fund the construction of the Aswan High Dam after Britain and the US abruptly canceled their loans. In response, Britain, France, and Israel met secretly at Sèvres in France to hatch a covert conspiracy: Israel would invade the Sinai Peninsula, providing a pretext for Britain and France to intervene as neutral peacekeepers to occupy the canal zone and topple Nasser.',
  },
  '[ENQUIRY EVIDENCE] The 1956 Suez Crisis: Secret Anglo-French Collusion & Superpower Pressure': {
    task: 'How did US financial pressure and Soviet threats force Britain and France into a humiliating withdrawal during the 1956 Suez Crisis?',
    answer:
      "The secret Protocol of Sèvres unraveled when US President Dwight D. Eisenhower reacted with intense fury at being kept in the dark by his European allies. Eisenhower threatened to crash the British pound by blocking IMF emergency loans and selling US reserves of sterling unless British forces ceased fire immediately. Facing severe currency collapse and Soviet nuclear threats from Nikita Khrushchev, British Prime Minister Anthony Eden was forced into a humiliating unconditional retreat, ending Britain's role as a first-tier global superpower and cementing Nasser's status as the triumphant hero of Pan-Arab nationalism.",
  },

  // L5
  '[STARTER HOOK] GCSE Revision: Escalation to the Six-Day War (1964–1967)': {
    task: 'What escalating crises between 1964 and May 1967 made war between Israel and surrounding Arab states inevitable?',
    answer:
      "Escalation was driven by four interconnected flashpoints: (1) The War over Water (1964–66), where Israel bombed Syrian earthworks attempting to divert the River Jordan headwaters; (2) Aggressive border clashes along the Golan Heights, culminating in April 1967 when the Israeli Air Force shot down six Syrian MiG-21s outside Damascus; (3) Soviet false intelligence reports in May 1967 alleging Israel was massing troops on the Syrian border; and (4) Nasser's response—demanding the removal of UN peacekeepers (UNEF) from Sinai and closing the Straits of Tiran to Israeli shipping.",
  },
  '[DEPTH STUDY] The War over Water (Survival of a Nation)': {
    task: 'How did competition over the River Jordan headwaters between Israel and Syria (1964–1966) act as a primary catalyst for the 1967 Six-Day War?',
    answer:
      "Water was an existential strategic resource: in 1964, Israel completed its National Water Carrier, drawing fresh water from the Sea of Galilee to irrigate coastal plains and the Negev desert. Arab states retaliated by launching the Headwater Diversion Plan to divert the Dan, Banias, and Hasbani tributaries into Jordan and Syria, which would have slashed Israel's water supply by 35%. Israel viewed this diversion as a direct assault on national survival: the IDF deployed precision tank fire and air strikes to demolish Syrian construction machinery on the Golan Heights, sparking escalating artillery duels that culminated in the 1967 war.",
  },
  '[DOCUMENTARY EXTENSION] Days That Shook the World: The Six-Day War (BBC)': {
    task: "How did Gamal Abdel Nasser's brinkmanship in May 1967—closing the Straits of Tiran and expelling UNEF—lead Israeli leaders to launch a pre-emptive strike?",
    answer:
      "On 16 May 1967, Nasser ordered the expulsion of the United Nations Emergency Force (UNEF) stationed in Sinai since 1956, replacing them with 100,000 Egyptian troops and 1,000 tanks. On 22 May, Nasser blockaded the Straits of Tiran, cutting off Israel's oil port of Eilat—an act Israel had declared in 1957 would be an explicit casus belli (act of war). Trapped in a state of national paralysis and economic mobilization while Arab leaders broadcast fiery rhetoric promising the liberation of Palestine, the Israeli cabinet formed a National Unity Government with Moshe Dayan as Defence Minister, authorizing a pre-emptive strike.",
  },

  // L6
  '1967: A Story of Occupation': {
    task: 'What territories did Israel occupy during the Six-Day War, and how did this transform Israel from a defensive state into an occupying power?',
    answer:
      'In six days of combat, Israel conquered territory three times its original size: the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria. Israel captured strategic high ground and defensible borders, but brought over one million Palestinian Arabs under direct military occupation, creating complex humanitarian, civil rights, and legal dilemmas that have defined the conflict ever since.',
  },
  'Who Will Fire First? (Survival of a Nation)': {
    task: 'What internal debates took place within the Israeli cabinet in early June 1967 before authorizing Operation Focus?',
    answer:
      "Israeli Prime Minister Levi Eshkol initially resisted immediate war, sending Foreign Minister Abba Eban to Washington to seek diplomatic guarantees from President Lyndon B. Johnson regarding the Straits of Tiran. However, when US plans for an international naval flotilla ('Operation Red Sea') stalled, IDF generals insisted that Israel's reserve army could not remain mobilized indefinitely without economic collapse. Facing encirclement by Egypt, Syria, and Jordan (who signed a joint defence pact on 30 May), the cabinet voted unanimously for a pre-emptive strike.",
  },
  'War on Three Fronts (Survival of a Nation)': {
    task: 'How did Israel manage simultaneous military operations across three separate fronts (Sinai, West Bank, and Golan Heights) between 5 and 10 June 1967?',
    answer:
      "After destroying the Arab air forces on 5 June, Israel enjoyed uncontested air superiority: on the southern front, General Tal and General Sharon's armored divisions breached Egyptian fortified positions at Abu Ageila, racing to the Suez Canal in four days. When King Hussein of Jordan opened fire on West Jerusalem, Israeli forces counter-attacked, capturing the entire West Bank and uniting Jerusalem on 7 June. Finally, on 9–10 June, Israeli brigades scaled the heavily fortified Golan escarpment under intense Syrian artillery fire, securing the heights before a UN ceasefire took effect.",
  },
  'Six Days of Miracles': {
    task: 'Why was the capture of the Old City of Jerusalem and the Western Wall on 7 June 1967 of profound religious and emotional significance for the Jewish people?',
    answer:
      "For nineteen years (1948–1967) under Jordanian control, Jewish people had been strictly barred from visiting Judaism's holiest prayer site, the Western Wall (Kotel), and Jewish cemeteries on the Mount of Olives had been desecrated. When Israeli paratroopers under Colonel Motta Gur broke through the Lion's Gate and broadcast the historic words 'The Temple Mount is in our hands!' (Har HaBayit BeYadeinu), soldiers wept and prayed at the Wall, creating an enduring emotional conviction across Israeli society that Jerusalem would never again be divided.",
  },
  'Arab-Israeli War 1967 (Six-Day War Documentary)': {
    task: 'What fundamental military failures contributed to the catastrophic Arab defeat across Sinai, the West Bank, and the Golan Heights in June 1967?',
    answer:
      'Arab forces suffered from poor leadership, politicized officer corps, and catastrophic communication breakdowns: Egyptian military commander Field Marshal Amer gave contradictory retreat orders after the air force was obliterated, turning the Sinai retreat into a rout where hundreds of tanks were abandoned. Egyptian state radio broadcast false reports claiming dozens of Israeli jets had been downed, misleading King Hussein into entering the war. Arab armies lacked combined-arms coordination and tactical flexibility against the rapid, aggressive maneuvers of the IDF.',
  },
  '[STARTER HOOK] The Pre-emptive Israeli Air Strike (5 June 1967)': {
    task: 'How did Operation Focus (Moked) achieve the destruction of the Egyptian Air Force within three hours on the morning of 5 June 1967?',
    answer:
      'At 07:45 am on 5 June 1967, nearly 200 Israeli combat aircraft flew ultra-low under Egyptian radar across the Mediterranean before sweeping back inland to strike Egyptian airbases simultaneously. Operating with pinpoint precision, IAF jets used cratering bombs to obliterate runway intersections first, trapping aircraft on the ground, before methodically destroying fighters, bombers, and radar installations. Within three hours, over 300 Egyptian aircraft were destroyed before they could take off, eliminating Arab air cover and guaranteeing total Israeli air supremacy for the ground war.',
  },
  '[ENQUIRY EVIDENCE] GCSE Revision: The Six-Day War Combat Timeline & Three Fronts': {
    task: 'Outline the chronologic progression of the Six-Day War from the destruction of Arab airfields on 5 June to the ceasefire on 10 June 1967.',
    answer:
      'The war unfolded across three rapid phases: Phase 1 (5–6 June): Operation Focus destroyed 450 Egyptian, Syrian, and Jordanian aircraft; Israeli armored columns punched through Egyptian lines in Sinai. Phase 2 (6–8 June): Israeli paratroopers engaged in fierce house-to-house fighting at Ammunition Hill, capturing East Jerusalem and the entire West Bank as Jordanian forces retreated across the Jordan River. Phase 3 (9–10 June): Israel launched a daring assault up the Golan Heights, capturing Quneitra and forcing Syria to accept a UN ceasefire on 10 June.',
  },

  // L7
  '[STARTER HOOK] GCSE Revision: Conquered Territories & UN Resolution 242': {
    task: "What was the 'Land for Peace' formula articulated in UN Security Council Resolution 242, and how was it received by Arab states at the Khartoum Summit?",
    answer:
      "Passed in November 1967, UN Resolution 242 established the foundational 'Land for Peace' formula, calling for the 'withdrawal of Israel armed forces from territories occupied in the recent conflict' in exchange for 'termination of all claims or states of belligerency' and recognition of the right of every state in the area to live in peace within secure borders. However, in September 1967, the Arab League summit in Khartoum issued the famous 'Three Noes': No peace with Israel, No recognition of Israel, and No negotiations with Israel, entrenching diplomatic deadlock.",
  },
  '[ENQUIRY EVIDENCE] UN Resolution 242 & The "Land for Peace" Formula': {
    task: 'How did the linguistic discrepancy between the English and French versions of UN Resolution 242 create competing legal interpretations of Israeli withdrawal obligations?',
    answer:
      "A deliberate diplomatic ambiguity was crafted into the resolution: the English draft (authored by British diplomat Lord Caradon) called for withdrawal from 'territories occupied', intentionally omitting the definite article 'the' to permit minor border adjustments for security. Conversely, the French text specified 'retrait des territoires occupés' ('from the territories occupied'), which Arab states interpreted as requiring total, unconditional withdrawal from every inch of land captured in 1967. This textual dispute allowed Israel to retain conquered lands while establishing the first ideological Jewish settlements in the West Bank and Gaza.",
  },

  // L8
  "[ENQUIRY EVIDENCE] Days That Shook the World: Black September & Dawson's Field (BBC)": {
    task: "How did the September 1970 Dawson's Field aircraft hijackings provoke King Hussein of Jordan to crush the PLO during 'Black September'?",
    answer:
      "Operating as a 'state within a state' in Jordan, the Popular Front for the Liberation of Palestine (PFLP) hijacked three western passenger airliners in September 1970, forced them to land at Dawson's Field in the Jordanian desert, and blew up the aircraft after releasing hostages. Viewing this open defiance as an existential threat to the Hashemite monarchy, King Hussein ordered the Jordanian army to attack PLO camps. After heavy urban fighting that killed thousands, Jordanian forces expelled Yasser Arafat and the PLO to southern Lebanon, prompting the formation of the radical terrorist splinter faction 'Black September'.",
  },
  '[PRIMARY ARCHIVE] The Munich 1972 Olympics Attack: Black September Hostage Crisis': {
    task: "What occurred during the 1972 Munich Olympic Games hostage crisis, and how did Israel respond through Operation 'Wrath of God'?",
    answer:
      "On 5 September 1972, eight Black September terrorists broke into the Olympic Village in Munich, murdering two Israeli team members and taking nine others hostage, demanding the release of 234 Palestinian prisoners. A botched rescue attempt by West German police at Fürstenfeldbruck airfield resulted in the murder of all nine hostages, five terrorists, and one German police officer. In response, Israeli Prime Minister Golda Meir authorized the Mossad to launch Operation 'Wrath of God', an undercover global assassination campaign targeting the organizers and planners of the Munich massacre across Europe and the Middle East.",
  },

  // L9
  'Golda Meir and Anwar Sadat Historical Encounter': {
    task: "Why was Egyptian President Anwar Sadat's historic November 1977 visit to Jerusalem a revolutionary psychological breakthrough in Arab-Israeli relations?",
    answer:
      'For thirty years, Arab leaders had refused to recognize or even speak directly with Israeli officials. On 19 November 1977, Egyptian President Anwar Sadat landed at Ben Gurion Airport, where he was greeted by Prime Minister Menachem Begin and former Prime Minister Golda Meir. Addressing the Israeli Knesset in Jerusalem, Sadat declared that 70% of the conflict was psychological barrier and fear, offering full peace in exchange for the return of the Sinai Peninsula, breaking decades of hatred and proving that direct diplomacy could replace war.',
  },
  'Yom Kippur War Explained 1973: A Brief History': {
    task: 'How did Egypt and Syria achieve total tactical surprise when they launched the Yom Kippur War on 6 October 1973?',
    answer:
      "President Anwar Sadat and Syrian President Hafez al-Assad launched Operation Badr on 6 October 1973—the holy Jewish fast day of Yom Kippur (and during the Muslim month of Ramadan). Israeli radio was silent, soldiers were on leave, and the IDF was unmobilised. Egyptian infantry crossed the Suez Canal using high-pressure water cannons to blast through the 60-foot sand ramparts of the Bar Lev Line under a Soviet SAM anti-aircraft umbrella, while 1,400 Syrian tanks stormed the Golan Heights, catching Israeli intelligence ('The Conception') completely off guard.",
  },
  'Israel at War: 1973 | PragerU': {
    task: 'Why did Israeli military intelligence suffer a catastrophic failure before the Yom Kippur War, and what was the role of the Agranat Commission?',
    answer:
      "Israeli Military Intelligence (Aman) was blinded by 'The Conception' (HaKontzeptzia)—the rigid dogma that Egypt would never go to war without long-range strike bombers to hit Israeli airfields, and that Syria would never fight alone. Warning signs—including Egyptian troop massing, Soviet advisors evacuating Cairo, and warnings from King Hussein—were dismissed as routine exercises. The subsequent 1974 Agranat Commission blamed Chief of Staff David Elazar and intelligence chief Eli Zeira for systemic negligence, forcing their resignations and leading Prime Minister Golda Meir and Moshe Dayan to step down.",
  },
  'Sadat in Jerusalem | BBC Witness History': {
    task: 'What eyewitness memories reveal the intense emotion and disbelief when Anwar Sadat addressed the Knesset in November 1977?',
    answer:
      "Eyewitnesses recall the surreal shock of watching Egyptian state television and Israeli television simultaneously: soldiers who had fought each other in the desert four years earlier stood side by side saluting. When Sadat walked into the Knesset chamber, the room rose in respectful silence. Sadat spoke passionately about the waste of young lives, declaring to the Israeli parliament: 'You want to live with us in this part of the world in peace, and I say to you, in all honesty, that we welcome you among us in security and peace'.",
  },
  'The Yom Kippur War: How Israel Turned the Tide (Part 2) | Unpacked': {
    task: "How did General Ariel Sharon's counter-crossing of the Suez Canal encircle Egypt's Third Army and trigger a Cold War superpower nuclear crisis?",
    answer:
      'Exploiting a seam between the Egyptian Second and Third Armies, General Ariel Sharon led an Israeli armored force across the Suez Canal onto the African mainland on 15–16 October 1973, destroying Soviet SAM missile batteries and encircling the 30,000-man Egyptian Third Army. Facing total Egyptian collapse, Soviet Premier Brezhnev threatened unilateral military intervention to save Egypt. US President Nixon and Henry Kissinger responded by placing US military forces worldwide on DEFCON 3 nuclear alert, forcing an immediate UN ceasefire on 25 October.',
  },
  'The Yom Kippur War: Behind The Valley of Tears (Part 1) | Unpacked': {
    task: "How did outnumbered Israeli tank crews halt the Syrian armored onslaught in the 'Valley of Tears' on the Golan Heights in October 1973?",
    answer:
      "In the northern Golan Heights, the Israeli 7th Armored Brigade and 188th 'Barak' Brigade faced staggering odds: approximately 170 Israeli Centurion tanks battled over 1,200 modern Syrian T-55 and T-62 tanks equipped with night-vision systems. For four days and nights of continuous combat in the 'Valley of Tears' (Emek HaBakha), Israeli commanders fought until ammunition was nearly exhausted, knocking out over 500 Syrian tanks and holding the high ground until reserve brigades mobilized and counter-attacked toward Damascus.",
  },
  'Yom Kippur WAR of 1973 in GREAT HD': {
    task: 'What technological advancements in anti-tank missiles (Sagger) and surface-to-air missiles (SAMs) challenged Israeli military doctrine in 1973?',
    answer:
      "The 1973 war shattered the assumption that Israeli air and armored supremacy could guarantee easy victories: Soviet-supplied mobile SAM-6 surface-to-air missile batteries shot down dozens of Israeli Skyhawk and Phantom jets in the opening 48 hours, neutralizing IAF close air support. On the ground, Egyptian infantry armed with wire-guided AT-3 'Sagger' anti-tank missiles and RPGs destroyed early Israeli tank counter-attacks, proving that unescorted armor was highly vulnerable to modern guided missile technology.",
  },
  '[STARTER HOOK] GCSE Revision: The Yom Kippur War (October 1973)': {
    task: "How did the 1973 Yom Kippur War trigger the global OPEC oil embargo and transform Arab pride despite Israel's tactical military victory?",
    answer:
      "Although Israel eventually turned the military tide to encircle the Egyptian Third Army and threaten Damascus, the war shattered the myth of Israeli invincibility and restored Arab self-respect after the humiliation of 1967. Crucially, Arab oil-producing states (OPEC) deployed the 'oil weapon', embargoing nations supporting Israel (especially the US and Netherlands) and quadrupling crude oil prices. This triggered global stagflation and demonstrated to Washington that Middle East stability required active diplomatic resolution of the Arab-Israeli conflict.",
  },
  '[ENQUIRY EVIDENCE] The Yom Kippur War: Coordinated Arab Offensive & The Israeli Counter-Strike':
    {
      task: 'How did US emergency arms shipments (Operation Nickel Grass) and Israeli mobilization reverse the near-catastrophic initial losses in October 1973?',
      answer:
        "In the first three days, Israel lost hundreds of tanks and aircraft, leading Defence Minister Moshe Dayan to warn of the 'destruction of the Third Temple'. President Richard Nixon authorized Operation Nickel Grass—a massive US military airlift flying 22,000 tons of tanks, artillery, ammunition, and electronic jamming pods directly into Israeli airbases. Re-supplied and fully mobilized, Israeli forces halted the Syrian advance, counter-attacked within 25 miles of Damascus, crossed the Suez Canal, and encircled the Egyptian Third Army.",
    },

  // L10
  '[STARTER HOOK] GCSE Revision: Shuttle Diplomacy to Camp David (1974–1979)': {
    task: "What were the key achievements of Henry Kissinger's 'shuttle diplomacy' and the 1978 Camp David Accords between Egypt and Israel?",
    answer:
      "Following the 1973 war, US Secretary of State Henry Kissinger flew between Middle Eastern capitals ('shuttle diplomacy') to negotiate disengagement agreements in Sinai and the Golan. In September 1978, US President Jimmy Carter hosted Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin at Camp David for thirteen days of intense negotiations. The resulting 1979 Egypt-Israel Peace Treaty saw Israel return the entire oil-rich Sinai Peninsula to Egypt in exchange for full diplomatic relations, commercial ties, and Israeli navigation rights through the Suez Canal.",
  },
  '[ENQUIRY EVIDENCE] Anwar Sadat in Jerusalem: The Speech to the Knesset (November 1977)': {
    task: "Why was Anwar Sadat's decision to address the Knesset in November 1977 condemned across the Arab world while celebrated in the West?",
    answer:
      "Sadat's visit shattered the Arab consensus of the Khartoum 'Three Noes': he directly legitimized the State of Israel by visiting its capital and speaking before the Knesset. Western leaders hailed Sadat as a visionary peacemaker, and he was awarded the 1978 Nobel Peace Prize alongside Menachem Begin. However, across the Arab world, Sadat was denounced as a traitor who had abandoned the Palestinian cause to secure a separate peace for Egypt, leading the Arab League to suspend Egypt's membership and move its headquarters from Cairo.",
  },
  '[PRIMARY ARCHIVE] The Camp David Accords (1978): Begin, Sadat & Jimmy Carter': {
    task: 'What were the two separate frameworks agreed at Camp David in 1978, and why was the framework for Palestinian self-government never implemented?',
    answer:
      "Camp David established two frameworks: (1) A bilateral framework for an Egypt-Israel peace treaty involving full Israeli withdrawal from Sinai, which was successfully signed in March 1979; and (2) A framework for Palestinian autonomy in the West Bank and Gaza. However, the Palestinian framework collapsed because Begin's right-wing Likud government insisted on expanding Jewish settlements and offered only limited municipal autonomy without political self-determination, while the PLO and Jordan refused to participate in talks they viewed as an American-sponsored sellout.",
  },

  // L11
  '[STARTER HOOK] GCSE Revision: The 1982 Lebanon War & The First Intifada (2 mins 0 secs)': {
    task: "Why did Israel launch Operation 'Peace for Galilee' in June 1982, and how did the First Intifada erupt in December 1987?",
    answer:
      "In June 1982, Defence Minister Ariel Sharon launched Operation Peace for Galilee to eradicate PLO rocket firing from southern Lebanon and expel Yasser Arafat's infrastructure from Beirut. Although the PLO was expelled to Tunisia, the war bogged Israel down and sparked domestic outrage over the Sabra and Shatila massacres. Five years later, in December 1987, decades of frustration under military occupation boiled over when an IDF truck collision killed four Palestinians in Gaza, igniting the grassroots First Intifada of strikes, boycotts, and youth stone-throwing.",
  },
  '[ENQUIRY EVIDENCE] The 1982 Lebanon War & The Sabra-Shatila Massacres': {
    task: 'What were the findings of the 1983 Israeli Kahan Commission regarding the massacres at the Sabra and Shatila refugee camps?',
    answer:
      'In September 1982, following the assassination of Lebanese President-elect Bashir Gemayel, Israeli forces allowed Lebanese Christian Phalangist militias into the Sabra and Shatila refugee camps in west Beirut to root out suspected terrorists. Over three days, Phalangists slaughtered between 800 and 3,500 unarmed Palestinian refugees while IDF troops stationed outside failed to intervene. Following a 400,000-person anti-war protest in Tel Aviv, the judicial Kahan Commission concluded that Defence Minister Ariel Sharon bore personal indirect responsibility for failing to anticipate the bloodshed, forcing his resignation.',
  },
  '[PRIMARY ARCHIVE] The First Intifada (1987–1993): The Stone-Throwing Uprising': {
    task: 'How did the First Intifada shift the political centre of gravity from exiled PLO leaders in Tunis to local Palestinian youth in the occupied territories?',
    answer:
      "Unlike earlier cross-border PLO guerrilla attacks, the First Intifada ('shaking off') was a spontaneous, decentralized mass popular uprising led by local youth, women's committees, and the Unified National Leadership of the Uprising (UNLU). Palestinians deployed civil disobedience: general strikes, refusing to pay Israeli taxes, boycotting Israeli goods, and stone-throwing clashes against heavily armed IDF soldiers. Media footage of Israeli soldiers breaking bones and using live fire against teenagers armed with stones generated immense international sympathy for Palestinians and forced Yasser Arafat to moderate PLO diplomacy.",
  },

  // L12
  '[ENQUIRY EVIDENCE] The 1993 Oslo Accords: Secret Talks & The White House Handshake': {
    task: 'What historic compromises were agreed in the 1993 Oslo Accords between Yitzhak Rabin and Yasser Arafat on the White House South Lawn?',
    answer:
      "Brokered through secret backchannel negotiations in Norway, the Declaration of Principles (Oslo I) was signed on 13 September 1993: the PLO formally recognized the State of Israel's right to exist in peace and renounced terrorism, while Israel recognized the PLO as the legitimate representative of the Palestinian people. The accords established interim Palestinian self-rule under the Palestinian Authority (PA) in Gaza and Jericho, scheduling final status negotiations on borders, Jerusalem, refugees, and Jewish settlements within five years, sealed by the historic handshake between Yitzhak Rabin and Yasser Arafat hosted by President Bill Clinton.",
  },
  '[PRIMARY EVIDENCE] The Assassination of Yitzhak Rabin (1995) & The Fragility of Peace': {
    task: 'Why was Prime Minister Yitzhak Rabin assassinated on 4 November 1995, and how did his murder derail the Oslo peace process?',
    answer:
      "Right-wing Israeli nationalists and religious fundamentalists violently opposed the Oslo Accords and the 1995 Oslo II agreement, viewing the surrender of biblical Judea and Samaria (the West Bank) as treason against God's covenant. Following months of inflammatory rhetoric depicting Rabin in Nazi SS uniforms, twenty-five-year-old Jewish religious extremist Yigal Amir shot Rabin twice at point-blank range following a massive 100,000-person peace rally in Tel Aviv on 4 November 1995. Rabin's assassination eliminated the undisputed leader capable of delivering peace, allowing extremist violence (Hamas suicide bombings and hardline Likud election victories) to derail the peace process.",
  },
};

// Update cme_new
const jsPath = path.resolve(__dirname, '../units/cme_new/data.js');
const pubJsonPath = path.resolve(__dirname, '../public/data/cme_new.json');
const dataJsonPath = path.resolve(__dirname, '../data/cme_new.json');

delete require.cache[require.resolve(jsPath)];
const mod = require(jsPath);
const data = mod.default || mod.unitData || mod;

let enrichedCount = 0;
data.lessons.forEach((l, li) => {
  (l.video || []).forEach((v, vi) => {
    // Match by exact title or key phrase
    let match = cmePedagogy[v.title];
    if (!match) {
      for (const [k, p] of Object.entries(cmePedagogy)) {
        if (v.title.includes(k) || k.includes(v.title)) {
          match = p;
          break;
        }
      }
    }
    if (match) {
      v.viewing_task = match.task;
      v.model_answer = match.answer;
      enrichedCount++;
    } else {
      console.log(`Unmatched in CME: "${v.title}"`);
    }
  });

  // Sort shortest-to-longest
  if (Array.isArray(l.video)) {
    l.video.sort((a, b) => parseDurationSecs(a.duration) - parseDurationSecs(b.duration));
  }
});

console.log(`Enriched ${enrichedCount} clips in cme_new`);

// Write files
const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(jsPath, jsContent, 'utf8');
fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('✅ Successfully updated cme_new!');
