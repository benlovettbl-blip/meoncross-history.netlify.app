const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const cmeExamSpiral = [
  // Lesson 1 (KT1 L1): Consequence (4 marks)
  {
    type: 'consequence_4m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 1 (Consequence)',
    tariff: '4 marks',
    questions: [
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question:
          'Explain one consequence of the Balfour Declaration (1917) for Arab-Jewish relations in Palestine. (4 marks)',
        prompt:
          'Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail from 1917–1939 (Balfour pledge, Arab reaction, land purchases), (3) Explain the lasting impact on communal relations and violence in Mandatory Palestine.',
        model:
          "One consequence of the Balfour Declaration (1917) was the **entrenchment of intense, long-term political and communal hostility between Arab Palestinians and Jewish immigrants** under the British Mandate.\n\nIssued on 2 November 1917 by British Foreign Secretary Arthur Balfour, the declaration formally pledged British government support for the establishment in Palestine of a 'national home for the Jewish people'. While it included a safeguard clause stating that nothing should prejudice the civil and religious rights of existing non-Jewish communities, Arab Palestinians viewed the declaration as a catastrophic imperial betrayal because it ignored their national right to self-determination and directly contradicted earlier British pledges made to Sharif Hussein of Mecca in the 1915–16 McMahon–Hussein Correspondence.\n\n**As a direct result of this official imperial endorsement**, Jewish immigration to Palestine expanded rapidly during the 1920s and 1930s, and Jewish land purchases displaced many Palestinian tenant farmers (*fellahin*). Consequently, Arab resentment exploded into widespread intercommunal violence and general strikes, such as the 1929 Western Wall Riots and the 1936–39 Arab Revolt, permanently shattering communal relations and making peaceful coexistence virtually impossible.",
      },
    ],
  },

  // Lesson 2 (KT1 L2): Consequence (4 marks)
  {
    type: 'consequence_4m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 1 (Consequence)',
    tariff: '4 marks',
    questions: [
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question:
          'Explain one consequence of the bombing of the King David Hotel (1946) for British policy in Mandatory Palestine. (4 marks)',
        prompt:
          "Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail (Irgun, Menachem Begin, 91 casualties, economic strain), (3) Explain how it accelerated the British government's decision to withdraw and refer the mandate to the United Nations.",
        model:
          "One consequence of the bombing of the King David Hotel was the **rapid erosion of British political resolve to maintain the Palestine Mandate, directly accelerating Britain's decision to withdraw and refer the problem to the United Nations**.\n\nOn 22 July 1946, members of the militant Zionist paramilitary group Irgun, commanded by Menachem Begin, disguised themselves as milkmen and detonated explosives in the basement of the King David Hotel in Jerusalem, which served as the headquarters of the British civil administration and military command. The blast collapsed the entire south-western wing, killing 91 British, Arab, and Jewish civil servants and soldiers.\n\n**As a direct consequence of this devastating terrorist attack and the escalating cycle of violence**, the British government under Prime Minister Clement Attlee faced fierce domestic public and parliamentary pressure to end the costly military occupation. Britain was already bankrupt from the Second World War and spending millions of pounds maintaining 100,000 troops in Palestine. Consequently, in February 1947, Foreign Secretary Ernest Bevin formally announced that Britain would terminate its mandate and hand full responsibility for Palestine's future to the United Nations, setting in motion the 1947 UN Partition Plan (Resolution 181).",
      },
    ],
  },

  // Lesson 3 (KT1 L3): Narrative Account (8 marks)
  {
    type: 'narrative_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 2 (Narrative Account)',
    tariff: '8 marks',
    stimulus: [
      {
        title: 'Stimulus Point 1',
        content: 'The United Nations truce (June 1948)',
      },
      {
        title: 'Stimulus Point 2',
        content: 'The 1949 Armistice Agreements (The Green Line)',
      },
    ],
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Write a narrative account analysing the key events of the 1948–49 Arab-Israeli War. (8 marks)\n\nYou may use the following in your answer:\n• The United Nations truce (June 1948)\n• The 1949 Armistice Agreements (The Green Line)\nYou must also use information of your own.',
        prompt:
          'Write 3 chronological and causally linked paragraphs showing progression from outbreak to turning point to outcome: (1) The initial multi-front Arab invasion on 15 May 1948 and Israeli vulnerability, (2) The decisive turning point of the four-week June truce, IDF unification under Ben-Gurion, and Czech arms imports, (3) The Israeli counter-offensives and the 1949 Rhodes Armistice Agreements establishing the Green Line and creating the refugee crisis.',
        model:
          "The 1948–49 Arab-Israeli War was initiated on 15 May 1948, immediately following David Ben-Gurion’s public declaration of the State of Israel and the formal expiration of the British Mandate. Five Arab armies—Egypt, Syria, Transjordan, Lebanon, and Iraq—invaded the newly declared state simultaneously from multiple fronts. In the opening weeks, the embryonic Israeli state was placed in mortal peril: Egyptian armored columns advanced north through the Negev to within 20 miles of Tel Aviv, while the British-officered Arab Legion of Transjordan seized East Jerusalem and laid siege to the Jewish Quarter of the Old City. However, the Arab war effort was critically undermined from the outset by bitter rivalries between Arab rulers and a complete absence of unified command, which prevented them from exploiting their initial numerical superiority.\n\n**A decisive turning point occurred on 11 June 1948, when** the United Nations mediated a four-week ceasefire. While the Arab states largely observed the international embargo, Israeli Prime Minister Ben-Gurion used the four-week pause with ruthless efficiency. He dissolved independent factional militias like the Irgun and Lehi to forge a single, disciplined national army—the Israel Defense Forces (IDF). Crucially, Israel bypassed the UN embargo by securing secret shipments of tens of thousands of rifles, heavy artillery, and Avia S-199 fighter aircraft from Czechoslovakia with Soviet approval. **Consequently, when fighting resumed on 8 July during the 'Ten Days',** the IDF had transformed from a beleaguered militia into a modern, heavily equipped army with superior combat morale and interior lines of communication.\n\n**This radical shift in the military balance enabled the IDF to** launch massive counter-offensives (Operation Yoav and Operation Horev) in the autumn of 1948 and early 1949, sweeping Egyptian forces out of the northern Negev and securing the entire Galilee. **The conflict culminated between February and July 1949 in** bilateral Armistice Agreements signed on the island of Rhodes. The agreements established the de facto 'Green Line' borders, expanding Israel's territory from the 55% allocated under UN Resolution 181 to 79% of Mandatory Palestine. Transjordan annexed the West Bank and East Jerusalem, while Egypt occupied the Gaza Strip. Consequently, no independent Palestinian state was created, and over 700,000 Palestinian Arabs were permanently displaced from their homes into refugee camps across neighboring states in what Palestinians commemorate as the *Nakba* (the Catastrophe).",
      },
    ],
  },

  // Lesson 4 (KT1 L4): Importance (8 marks)
  {
    type: 'importance_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 3 (Importance)',
    tariff: '8 marks',
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Explain the importance of the Suez Crisis (1956) for British and French imperial influence in the Middle East. (8 marks)',
        prompt:
          'Write 2 structured PEEL paragraphs explaining two distinct reasons why the crisis mattered: (1) The exposure of Anglo-French military and financial vulnerability to American superpower pressure, and (2) The total collapse of their colonial prestige in the Arab world, accelerating decolonisation and leaving a superpower vacuum.',
        model:
          "The Suez Crisis of 1956 was of pivotal importance because it decisively exposed the military and financial impotence of Great Britain and France, marking the irreversible end of their status as global imperial powers in the Middle East.\n\n**Firstly, the crisis was important because it proved that Britain and France could no longer act independently of the United States on the world stage.** After President Gamal Abdel Nasser nationalised the Anglo-French Suez Canal Company in July 1956, Britain and France engaged in secret military collusion with Israel at Sèvres, launching Operation Musketeer in October to invade Egypt and recapture the canal. However, the invasion triggered immediate, furious condemnation from US President Dwight D. Eisenhower. The US refused to provide vital financial loans and threatened to cause a catastrophic run on the British pound sterling by selling British bonds, while the Soviet Union threatened rocket attacks on London and Paris. Unable to sustain military operations without American financial underwriting and fuel supplies, British Prime Minister Anthony Eden was forced into a humiliating and unconditional ceasefire after just eight days. This exposed Britain and France as second-rate powers who were completely subordinate to American Cold War hegemony.\n\n**Secondly, the crisis was important because it shattered Anglo-French political prestige across the Arab world, dramatically accelerating British decolonisation and opening a superpower vacuum.** The military conspiracy with Israel confirmed Arab nationalist accusations that Britain and France were deceitful colonial manipulators clinging to imperial privilege. Rather than toppling Nasser as London and Paris intended, the crisis elevated Nasser into an undisputed Pan-Arab hero who had successfully defied the great imperial powers and kept the canal. Consequently, pro-British monarchies in the region were fatally destabilised—notably in Iraq, where the pro-British Hashemite monarchy was overthrown in a bloody republican coup in 1958. Britain was subsequently forced to announce its military withdrawal 'East of Suez' by 1971, permanently ending over a century of British and French imperial dominance and transforming the Middle East into a direct arena of Cold War competition between the United States and the Soviet Union.",
      },
    ],
  },

  // Lesson 5 (KT2 L1): Consequence (4 marks)
  {
    type: 'consequence_4m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 1 (Consequence)',
    tariff: '4 marks',
    questions: [
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question:
          'Explain one consequence of Egypt closing the Straits of Tiran to Israeli shipping in May 1967. (4 marks)',
        prompt:
          "Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail (Nasser's troops at Sharm el-Sheikh, blockade of Eilat, casus belli), (3) Explain how it directly provoked Israel's preemptive strike (Operation Focus) that launched the Six-Day War.",
        model:
          "One consequence of Egypt closing the Straits of Tiran in May 1967 was that it was **treated by Israel as an explicit act of war (*casus belli*), directly triggering Israel's preemptive military strike that launched the Six-Day War**.\n\nOn 22–23 May 1967, Egyptian President Gamal Abdel Nasser expelled the United Nations Emergency Force (UNEF) from the Sinai Peninsula and deployed Egyptian troops to Sharm el-Sheikh, announcing the closure of the Straits of Tiran to all Israeli-flagged ships and foreign vessels carrying strategic goods to Israel's southern port of Eilat. Because Eilat was Israel's sole maritime outlet to the Red Sea, East Africa, and Asia—and the primary conduit for 90% of its imported oil—Israel had repeatedly warned since the 1956 Suez Crisis that blockading the straits would be considered an intolerable act of aggression.\n\n**As a direct result of this maritime blockade and the encirclement of Israeli borders by mobilised Arab armies**, Israeli political and military leaders concluded that national survival was at immediate risk. Consequently, on the morning of 5 June 1967, the Israeli Air Force launched Operation Focus, a surprise preemptive strike that destroyed over 300 Egyptian combat aircraft on the ground within hours, initiating the Six-Day War and leading to the capture of the Sinai, Gaza, West Bank, East Jerusalem, and the Golan Heights.",
      },
    ],
  },

  // Lesson 6 (KT2 L2): Narrative Account (8 marks)
  {
    type: 'narrative_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 2 (Narrative Account)',
    tariff: '8 marks',
    stimulus: [
      {
        title: 'Stimulus Point 1',
        content: 'The Battle of Karameh (1968)',
      },
      {
        title: 'Stimulus Point 2',
        content: 'Black September in Jordan (1970)',
      },
    ],
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Write a narrative account analysing the escalation of Palestinian armed resistance and militant tactics in the years 1968–1972. (8 marks)\n\nYou may use the following in your answer:\n• The Battle of Karameh (1968)\n• Black September in Jordan (1970)\nYou must also use information of your own.',
        prompt:
          "Write 3 chronological and causally linked paragraphs: (1) The Battle of Karameh (1968) boosting fedayeen prestige and bringing Arafat's Fatah to power in the PLO, (2) PFLP airliner hijackings leading to King Hussein's crackdown in Black September (1970) and expulsion of fighters to Lebanon, (3) The emergence of the Black September extremist faction and the 1972 Munich Olympics massacre.",
        model:
          "The escalation of Palestinian resistance began following the catastrophic defeat of conventional Arab armies in the 1967 Six-Day War, which convinced Palestinians that they had to liberate their homeland through independent armed struggle. In March 1968, the Israeli military launched a major cross-border punitive raid against a Fatah guerrilla stronghold at the Jordanian town of Karameh. Although Israeli forces destroyed the base, Palestinian fighters alongside Jordanian artillery fought with stubborn tenacity, inflicting 28 Israeli fatalities and destroying armor. **Consequently, the Battle of Karameh was celebrated across the Arab world as a mythic victory**, causing thousands of young Palestinian volunteers (*fedayeen*) to enlist and enabling Yasser Arafat’s guerrilla faction, Fatah, to take complete control of the Palestine Liberation Organization (PLO) in 1969.\n\n**Following their emergence as a powerful military presence in Jordan, the PLO operated as an aggressive 'state within a state', which directly led to** conflict with the Jordanian monarchy. Radical Marxist factions within the PLO, particularly George Habash’s Popular Front for the Liberation of Palestine (PFLP), pioneered international airliner hijackings to shock the world into recognizing the Palestinian cause. In September 1970, the PFLP hijacked four Western commercial airliners, landing three of them at Dawson’s Field in the Jordanian desert and blowing them up in front of international media. Viewing this open defiance as an intolerable threat to his sovereign throne, King Hussein of Jordan unleashed his army on 17 September 1970 in a brutal military crackdown known as 'Black September'. Over ten days of fierce urban combat, Jordanian forces crushed the guerrilla strongholds, killing between 3,000 and 5,000 Palestinians and expelling Arafat and thousands of fighters across the border into southern Lebanon.\n\n**This traumatic expulsion from Jordan radicalised Palestinian tactics and culminated in** the formation of the clandestine extremist cell named 'Black September'. Dedicated to carrying out sensational international terrorist strikes to avenge their defeat and keep the Palestinian struggle on the global front page, the group struck on 5 September 1972 at the Munich Summer Olympic Games. Gunmen infiltrated the Olympic Village, taking eleven Israeli athletes and coaches hostage before murdering them during a bungled German rescue attempt at Fürstenfeldbruck airbase. Although the Munich massacre provoked universal international horror and prompted Israeli Prime Minister Golda Meir to authorize Operation 'Wrath of God'—a global Mossad assassination campaign against suspected perpetrators—it achieved the militant objective of forcefully thrusting the Palestinian national question onto the center stage of world diplomacy.",
      },
    ],
  },

  // Lesson 7 (KT2 L3): Importance (8 marks)
  {
    type: 'importance_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 3 (Importance)',
    tariff: '8 marks',
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Explain the importance of the 1973 Yom Kippur War for relations between the superpowers (the USA and the Soviet Union). (8 marks)',
        prompt:
          "Write 2 structured PEEL paragraphs explaining two distinct reasons why the war mattered for superpower relations: (1) How competitive arms airlifts and Soviet threats brought the superpowers to the brink of nuclear war (DEFCON 3), and (2) How it shattered the illusion of détente and enabled Henry Kissinger's 'shuttle diplomacy' to displace Soviet influence in Egypt.",
        model:
          "The 1973 Yom Kippur War was of immense importance for superpower relations because it pushed the United States and the Soviet Union to the precipice of direct nuclear conflict, while simultaneously exposing the fragility of Cold War détente and enabling the US to displace Soviet influence in the region.\n\n**Firstly, the war was important because the competitive superpower resupply efforts escalated regional warfare into a dangerous nuclear showdown that threatened global peace.** When Egyptian and Syrian forces launched their surprise assault on 6 October 1973, the Soviet Union immediately launched a massive sealift and airlift of advanced weaponry, including SAM-6 anti-aircraft systems and T-62 tanks, to sustain Arab advances. In response, US President Richard Nixon authorized Operation Nickel Grass, an emergency military airlift that flew over 22,000 tons of tanks, artillery, and electronic equipment to save the beleaguered IDF. When the IDF subsequently crossed the Suez Canal and trapped Egypt's entire Third Army, Soviet Premier Leonid Brezhnev warned Nixon on 24 October that the USSR would intervene unilaterally with airborne divisions if Israel did not halt. In response to this threat, the US placed its worldwide military and nuclear forces on DEFCON 3 alert—the highest peacetime military readiness since the 1962 Cuban Missile Crisis. This dramatic confrontation proved that regional conflicts in the Middle East possessed the dangerous potential to trigger global thermonuclear war between the superpowers.\n\n**Secondly, the war was important because it shattered the illusion of Cold War détente and enabled American 'shuttle diplomacy' to permanently marginalize Soviet diplomatic influence in the Middle East.** The Soviet Union had actively supported the surprise Arab offensive without prior notification to Washington, violating the 1972 Basic Principles of Détente. Recognizing the urgent necessity of stabilizing the region to prevent future crises, US Secretary of State Henry Kissinger seized the diplomatic initiative. Through exhausting 'shuttle diplomacy' between Cairo, Damascus, and Jerusalem, Kissinger brokered military disengagement agreements in 1974 and 1975. Crucially, Kissinger deliberately excluded the Soviets from these peace negotiations, successfully convincing Egyptian President Anwar Sadat that only Washington—not Moscow—possessed the leverage over Israel needed to return Egyptian territory. Consequently, Egypt severed its twenty-year alliance with the USSR and realigned firmly with the United States, representing a monumental Cold War diplomatic triumph for Washington and a devastating strategic loss for Moscow.",
      },
    ],
  },

  // Lesson 8 (KT3 L1): Consequence (4 marks)
  {
    type: 'consequence_4m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 1 (Consequence)',
    tariff: '4 marks',
    questions: [
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question:
          "Explain one consequence of the 1979 Egypt-Israel Peace Treaty (Treaty of Washington) for Egypt's position in the Arab world. (4 marks)",
        prompt:
          "Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail (Sadat, Begin, Carter, return of Sinai), (3) Explain the impact on Egypt's standing in the Arab League and Sadat's assassination.",
        model:
          'One consequence of the 1979 Egypt-Israel Peace Treaty was the **complete diplomatic and political isolation of Egypt within the Arab world, transforming it from the historic leader of Arab nationalism into an ostracized pariah state**.\n\nSigned on 26 March 1979 on the White House lawn by Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin following the 1978 Camp David Accords, the treaty officially ended thirty years of state-to-state warfare between Israel and its most populous Arab neighbor. In exchange for full diplomatic recognition and demilitarisation, Israel agreed to return the entire Sinai Peninsula to Egypt in phased withdrawals over three years.\n\n**As a direct result of Sadat signing a separate bilateral peace that failed to guarantee Palestinian statehood or resolve the status of Jerusalem**, other Arab nations and the PLO viewed the treaty as a treacherous betrayal of the Palestinian cause. Consequently, the Arab League immediately suspended Egypt’s membership, severed diplomatic and financial ties, and relocated its headquarters out of Cairo to Tunis. Furthermore, this intense regional fury empowered violent domestic Islamist opposition inside Egypt, directly culminating on 6 October 1981 in the assassination of President Anwar Sadat by members of Egyptian Islamic Jihad during a military victory parade in Cairo.',
      },
    ],
  },

  // Lesson 9 (KT3 L2): Narrative Account (8 marks)
  {
    type: 'narrative_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 2 (Narrative Account)',
    tariff: '8 marks',
    stimulus: [
      {
        title: 'Stimulus Point 1',
        content: 'Operation Peace for Galilee and the siege of Beirut (1982)',
      },
      {
        title: 'Stimulus Point 2',
        content: 'The outbreak of the First Intifada in Gaza (1987)',
      },
    ],
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Write a narrative account analysing the escalation of the Israeli-Palestinian conflict in the years 1982–1988. (8 marks)\n\nYou may use the following in your answer:\n• Operation Peace for Galilee and the siege of Beirut (1982)\n• The outbreak of the First Intifada in Gaza (1987)\nYou must also use information of your own.',
        prompt:
          "Write 3 chronological and causally linked paragraphs: (1) Operation Peace for Galilee (1982), the siege of Beirut, and Sabra & Shatila forcing PLO exile to Tunis, (2) The accumulation of Palestinian grassroots frustration under twenty years of occupation, (3) The outbreak of the First Intifada in December 1987, Rabin's 'Iron Fist', and Arafat's Geneva declaration (1988).",
        model:
          "The escalation of the Israeli-Palestinian conflict began on 6 June 1982 when Israeli Defense Minister Ariel Sharon launched 'Operation Peace for Galilee', sending 76,000 troops and heavy armor across the northern border into Lebanon to eradicate PLO rocket emplacements and crush Yasser Arafat's military infrastructure. However, Israeli forces pushed far beyond their declared 40-kilometer security zone, laying siege to the Lebanese capital of Beirut for nearly three months with intense aerial and naval bombardment. Under an American-brokered ceasefire in August 1982, Yasser Arafat and over 14,000 PLO fighters were evacuated by sea into exile in distant Tunisia. Shortly after the evacuation, Lebanese Christian Phalangist militiamen allied with Israel entered the Sabra and Shatila refugee camps in West Beirut, brutally slaughtering between 800 and 2,000 unarmed Palestinian civilians while Israeli forces illuminated the area. **Consequently, this massacre provoked massive international outrage and unprecedented domestic protests inside Israel**, forcing Ariel Sharon to resign as Defense Minister.\n\n**Following the forced dispersal of the PLO leadership to Tunis, 1,500 miles away, Palestinians living under military occupation in the West Bank and Gaza Strip grew increasingly desperate and isolated.** Over twenty years since the 1967 conquest, Israeli settlement construction accelerated, fertile agricultural land and water resources were confiscated, and thousands of Palestinians endured daily curfews, military checkpoints, and economic exploitation. Disillusionment reached a peak in November 1987 when Arab leaders met at the Amman Arab League summit without making the Palestinian crisis a primary agenda item. This accumulated domestic despair created a combustible atmosphere in the refugee camps that required only a spark to ignite mass rebellion without any instruction from the exiled PLO.\n\n**This combustible situation erupted on 8 December 1987 when** an Israeli military transport vehicle collided with civilian cars near the Jabalya refugee camp in Gaza, killing four Palestinian day-laborers. Convinced the collision was deliberate retaliation for the earlier stabbing of an Israeli merchant, thousands of mourners turned the funerals into violent anti-occupation demonstrations. The rebellion spread like wildfire across the entire Gaza Strip and West Bank, initiating the First Palestinian Intifada (*the Uprising*). Organized locally by grassroots Unified National Leadership committees, the Intifada mobilized mass civil disobedience, commercial strikes, tax boycotts, and unarmed youths confronting Israeli tanks with stones and slingshots. When Defense Minister Yitzhak Rabin instituted a harsh 'Iron Fist' policy of curfews, home demolitions, and orders to 'break their bones', international television cameras broadcast the brutal disparity globally. **This dramatic shift in global public opinion culminated in December 1988, when** Yasser Arafat addressed the UN General Assembly in Geneva, formally renouncing terrorism, recognizing Israel’s right to exist, and accepting UN Resolutions 242 and 338, thereby laying the diplomatic foundation for secret negotiations in Oslo.",
      },
    ],
  },

  // Lesson 10 (KT3 L3): Importance (8 marks)
  {
    type: 'importance_8m',
    title: 'Edexcel GCSE Paper 2 Exam Practice: Question 3 (Importance)',
    tariff: '8 marks',
    questions: [
      {
        tariff: '8 marks',
        type: '8-mark',
        marks: 8,
        question:
          'Explain the importance of the Oslo I Accord (1993) for attempts to achieve peace in the Middle East. (8 marks)',
        prompt:
          'Write 2 structured PEEL paragraphs explaining two distinct reasons why the 1993 Oslo Accord was of vital importance: (1) The historic breakthrough of mutual recognition establishing Palestinian self-governance (the Palestinian Authority), and (2) How deferring final-status issues (Jerusalem, refugees, borders, settlements) provoked disillusionment and empowered extremists to derail the peace process.',
        model:
          "The Oslo I Accord (Declaration of Principles) of 1993 was of historic importance because it achieved an unprecedented diplomatic breakthrough of mutual recognition that established Palestinian self-governance, while simultaneously containing structural flaws that empowered violent extremists on both sides to derail the peace process.\n\n**Firstly, the accord was important because it shattered forty-five years of mutual denial, establishing formal bilateral recognition and practical self-rule for Palestinians.** Brokered through secret back-channel negotiations in Norway and signed on the White House lawn on 13 September 1993, Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat sealed the agreement with a historic handshake. In the preceding Letters of Mutual Recognition, the PLO explicitly renounced terrorism and recognized Israel's sovereign right to exist in peace, while Israel formally recognized the PLO as the sole legitimate representative of the Palestinian people. The accord established an interim five-year timetable for Israeli military withdrawal from the Gaza Strip and the West Bank town of Jericho, leading directly to the creation of the Palestinian National Authority (PNA) under Arafat in 1994. For the first time in modern history, Palestinians exercised autonomous civil and security control over their own towns, schools, and police, providing a concrete diplomatic and administrative foundation for an eventual two-state solution.\n\n**Secondly, the accord was important because its deliberate deferral of core 'final status' issues created profound mutual disillusionment and provoked a violent extremist backlash that destroyed the momentum for peace.** To secure immediate agreement, negotiators intentionally postponed the most contentious issues—the permanent status of Jerusalem, the right of return for 1948 Palestinian refugees, permanent borders, and the future of Jewish settlements—to future talks. This ambiguity allowed Israeli settlement construction in the West Bank to expand rapidly under the subsequent Oslo II Accord (1995), which divided the West Bank into a patchwork of fragmented enclaves (Areas A, B, and C). Viewing the PNA as an illegitimate subcontractor of Israeli occupation, radical Islamist militant groups like Hamas and Palestinian Islamic Jihad launched a campaign of suicide bus bombings in Tel Aviv and Jerusalem to sabotage the peace process. Simultaneously, right-wing Israeli religious nationalists denounced Rabin as a traitor who was giving away sacred biblical land. This incendiary hatred culminated on 4 November 1995 when an Israeli Jewish extremist, Yigal Amir, assassinated Yitzhak Rabin at a peace rally in Tel Aviv, fatally shattering the moderate Israeli peace coalition and bringing the Oslo peace process to a tragic standstill.",
      },
    ],
  },
];

const targetFiles = [
  path.join(__dirname, '..', 'units', 'cme_new', 'data.js'),
  path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js'),
];

(async () => {
  try {
    for (const filePath of targetFiles) {
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Target file not found: ${filePath}`);
        continue;
      }

      const fileUrl = pathToFileURL(filePath).href;
      const mod = await import(fileUrl);
      const unitData = mod.default || mod.unitData || mod.cme_new;

      if (!unitData || !unitData.lessons || unitData.lessons.length !== 10) {
        throw new Error(`Invalid CME unit data in ${filePath}`);
      }

      unitData.lessons.forEach((lesson, idx) => {
        // 1. Remove redundant legacy gcse_task that caused dual assessment dumps
        delete lesson.gcse_task;

        // 2. Set clean, specification-aligned spiral exam_practice
        lesson.exam_practice = cmeExamSpiral[idx];

        console.log(
          `Lesson ${idx + 1} (${lesson.id}): set ${lesson.exam_practice.tariff} (${lesson.exam_practice.type}) - removed legacy gcse_task.`,
        );
      });

      const updatedCode = `const cme_new = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = cme_new;\nexport default cme_new;\n`;
      fs.writeFileSync(filePath, updatedCode, 'utf8');
      console.log(`✅ Successfully updated ${filePath}`);
    }

    console.log('\n🎉 Spiral Exam Practice curriculum applied across all 10 CME lessons!');
  } catch (err) {
    console.error('❌ Error applying CME exam spiral:', err);
    process.exit(1);
  }
})();
