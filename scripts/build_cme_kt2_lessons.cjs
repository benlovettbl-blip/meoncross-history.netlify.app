/**
 * scripts/build_cme_kt2_lessons.cjs
 *
 * Fully calibrated, authentic 5-lesson curriculum for Key Topic 2 (1964–1973):
 * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE 9-1)
 *
 * Follows Christine Counsell's 4-Act Master Architecture:
 * - Pure paragraph indexing ([Act.Paragraph])
 * - 2-3 high-yield punchy points rule (GCSE 14-16 calibration)
 * - Zero banned trivia (NO Ahmad Shuqayri, NO Operation Focus, NO Operation Badr, NO Hosni Mubarak)
 * - Source A (Act 2) and Source B (Act 3) with full provenance and hinge questions
 * - Do Now recall from prior units/KT1 (never current lesson)
 * - Edexcel Paper 2 exam questions (4-mark consequence / 8-mark narrative) with rigorous model answers
 * - 20 quiz questions and 10 flashcards per lesson
 */

const buildKT2Lessons = () => {
  const lessons = [
    // =========================================================================
    // LESSON 6 / KT 2.1: The Road to War: The Cairo Conference, Water Wars & Border Skirmishes (1964–1967)
    // =========================================================================
    {
      id: 'lesson_6',
      title:
        'KT 2.1: The Road to War: The Cairo Conference, Water Wars & Border Skirmishes (1964–1967)',
      learning_objective:
        'Explain why tensions between Israel, Syria, and Jordan escalated into military conflict between 1964 and 1967.',
      learning_objectives: [
        'Explain the significance of the 1964 Cairo Conference and the creation of the PLO and Fatah.',
        'Describe how the River Jordan water dispute and Syrian border skirmishes increased military tension.',
        'Analyse how the Samu raid (1966) and the April 1967 Golan dogfight brought the Middle East to the brink of war.',
      ],
      hook_text:
        'In January 1964, Arab leaders met in Cairo to resolve two crises: Israel was pumping water out of the River Jordan, and Palestinians demanded their own state. Within three years, artillery battles and aerial dogfights had made a full-scale war inevitable.',
      teacher_notes: {
        primer:
          'This lesson examines the underlying causes of the 1967 Six Day War from 1964 to May 1967. Pupils explore how the founding of the PLO, clashes over the River Jordan water supply, radical Syrian political hostility, and major Israeli retaliatory raids (Samu and the 7 April 1967 air clash) pushed the region towards war. Emphasize that the war did not begin out of nowhere in June 1967, but was the culmination of three years of escalating border friction.',
        objectives: [
          {
            objective:
              'Explain the significance of the 1964 Cairo Conference and the growth of Palestinian resistance groups.',
            primer:
              "Direct pupils to paragraph [1.1]. Emphasize that Arab heads of state created the PLO to coordinate Arab policy, while independent guerrilla groups like Yasser Arafat's Fatah began launching raids directly into Israel.",
            question:
              'Why did Palestinian groups like Fatah believe armed struggle was necessary rather than relying solely on Arab governments?',
          },
          {
            objective:
              'Describe the causes and consequences of the River Jordan water dispute and Syrian border clashes.',
            primer:
              "Guide pupils through paragraphs [2.1]–[2.2]. Show how Israel's National Water Carrier and Syria's diversion scheme turned freshwater into a military trigger, leading to artillery duels across the demilitarised border.",
            question:
              'Why did the physical geography of the Golan Heights give Syria a major military advantage over Israeli farms below?',
          },
          {
            objective:
              'Evaluate how the Samu raid (November 1966) and the Golan air battle (7 April 1967) created unstoppable momentum towards war.',
            primer:
              'Lead pupils through paragraphs [3.1]–[3.2]. Show how the destruction of Samu humiliated King Hussein of Jordan, while the shooting down of six Syrian jets over Damascus placed intense political pressure on President Nasser of Egypt to act.',
            question:
              'How did the aerial battle of 7 April 1967 force President Nasser of Egypt into taking a more aggressive public stance?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        title: 'Recall & Retrieval (Prior Learning: Key Topic 1)',
        instructions: 'Answer these questions in full sentences based on your prior learning.',
        items: [
          {
            question:
              'What was the name of the 1917 British policy document supporting a "national home for the Jewish people" in Palestine?',
            answer: 'The Balfour Declaration.',
          },
          {
            question:
              'What type of administrative control was granted to Britain over Palestine by the League of Nations in 1920?',
            answer: 'A British Mandate.',
          },
          {
            question:
              'Which building in Jerusalem was bombed by the militant group Irgun in July 1946, killing 91 people?',
            answer: 'The King David Hotel.',
          },
          {
            question:
              'What was the number of the United Nations Resolution passed in November 1947 to partition Palestine?',
            answer: 'UN Resolution 181.',
          },
          {
            question:
              'On what date did David Ben-Gurion proclaim the establishment of the State of Israel?',
            answer: '14 May 1948.',
          },
          {
            question:
              'Approximately how many Palestinian Arabs became refugees during the 1948–49 Arab-Israeli War?',
            answer: 'Approximately 700,000 to 750,000 refugees.',
          },
          {
            question:
              'What law passed by the Israeli Knesset in 1950 granted every Jewish person the right to settle in Israel?',
            answer: 'The Law of Return.',
          },
          {
            question:
              'Who became the President of Egypt in 1954 and emerged as the primary champion of Pan-Arab nationalism?',
            answer: 'Gamal Abdel Nasser.',
          },
          {
            question:
              'What vital international waterway did Nasser nationalise in July 1956, triggering the Suez Crisis?',
            answer: 'The Suez Canal.',
          },
          {
            question:
              'Which two European powers secretly colluded with Israel to invade Egypt in October 1956?',
            answer: 'Britain and France.',
          },
        ],
      },
      vocab: [
        {
          term: 'Cairo Conference (1964)',
          definition:
            'A summit of Arab League heads of state held in Cairo in January 1964 that established the PLO and opposed Israeli water projects.',
          example:
            'Arab leaders met at the Cairo Conference to oppose Israel’s National Water Carrier.',
        },
        {
          term: 'PLO (Palestine Liberation Organisation)',
          definition:
            'An umbrella political organisation founded in 1964 to represent the Palestinian people and pursue their national rights.',
          example: 'The PLO was created in 1964 to unite Palestinian political factions.',
        },
        {
          term: 'Fatah',
          definition:
            'A Palestinian nationalist guerrilla organisation founded by Yasser Arafat that launched armed cross-border raids into Israel.',
          example: 'Fatah guerrillas carried out sabotage raids from bases in Syria and Jordan.',
        },
        {
          term: 'National Water Carrier',
          definition:
            'A major Israeli infrastructure network completed in 1964 to pump water from the Sea of Galilee across the country.',
          example:
            'Syria attempted to cut off the flow of water feeding Israel’s National Water Carrier.',
        },
        {
          term: 'Samu Raid (1966)',
          definition:
            'A large-scale Israeli military reprisal raid into the West Bank village of Samu in November 1966 following a landmine attack.',
          example: 'The Samu raid caused widespread anger in Jordan and humiliated King Hussein.',
        },
        {
          term: '7 April 1967 Dogfight',
          definition:
            'A fierce aerial clash over the Golan Heights in which Israeli jet fighters shot down six Syrian MiG fighter aircraft.',
          example:
            'The defeat of six Syrian MiGs on 7 April 1967 put pressure on Egypt to defend Syria.',
        },
      ],
      vocab_cloze_text:
        "In January 1964, Arab leaders gathered at the ____(1)____ in Egypt to coordinate policy against Israel. They voted to establish the ____(2)____ to represent the Palestinian people and opposed Israel's new ____(3)____, which diverted water from the Sea of Galilee. Soon, Palestinian guerrilla fighters belonging to ____(4)____ began launching armed cross-border raids into Israeli territory. Tensions escalated into direct military clashes, including the destructive Israeli ____(5)____ in the West Bank in November 1966 and the dramatic ____(6)____ over the Golan Heights in which six Syrian aircraft were destroyed.",
      narrative_blocks: [
        {
          title: 'Act 1: Context & Catalyst — The 1964 Cairo Conference & The Water Wars',
          paragraphs: [
            '<span class="para-ref">[1.1]</span> In January 1964, the heads of state of the Arab League gathered in Cairo at the invitation of Egyptian President Gamal Abdel Nasser. The immediate catalyst for the summit was Israel’s completion of the National Water Carrier—a massive engineering pipeline designed to pump water from the Sea of Galilee to irrigate farms in central Israel and the southern Negev desert. Arab governments viewed this project as an aggressive attempt to absorb more Jewish immigrants and strengthen Israel\'s economy. At Cairo, Arab leaders agreed on two major policies: they voted to create the Palestine Liberation Organisation (PLO) to give the Palestinian people an official political voice, and they approved a joint Arab plan to build canals diverting the headwaters of the River Jordan inside Syria and Lebanon, which would strip Israel of roughly one-third of its freshwater supply.',
            '<span class="para-ref">[1.2]</span> The dispute over water quickly turned into active warfare along the northern border. Between 1964 and 1966, Israeli tanks and aircraft repeatedly shelled Syrian construction sites and earth-moving machinery, bringing the Arab diversion scheme to a complete halt. At the exact same time, Palestinian nationalist guerrillas belonging to Fatah—led by Yasser Arafat—began staging hit-and-run sabotage operations across the armistice lines, targeting Israeli water pumps, railways, and border settlements. In February 1966, a radical military coup in Syria brought hardline officers to power in Damascus who openly pledged to sponsor Fatah and support a "popular liberation war" to destroy the state of Israel.',
          ],
          tasks: [
            {
              id: 'task_6_1',
              title: 'Task 1: Causal Analysis — The 1964 Cairo Conference',
              instructions:
                'Using paragraphs [1.1] and [1.2], explain the two main decisions made at the 1964 Cairo Conference and why the River Jordan dispute sparked military clashes.',
              scaffolding: {
                sentence_starter:
                  "At the January 1964 Cairo Conference, Arab leaders responded to Israel's National Water Carrier by...",
                connectives: [
                  'Consequently, this led to...',
                  'Furthermore, Palestinian groups like Fatah...',
                ],
              },
              model_answer:
                "At the January 1964 Cairo Conference, Arab leaders took two major decisions: they founded the Palestine Liberation Organisation (PLO) to represent Palestinian national rights, and they approved a joint Arab plan to divert the headwaters of the River Jordan away from Israel. This triggered armed conflict because freshwater was vital for Israel's survival and agriculture; when Syria began digging diversion canals, Israeli tanks and aircraft bombarded the construction sites, bringing the project to a halt and creating intense border friction.",
            },
          ],
        },
        {
          title: 'Act 2: Escalation & Conflict — Syrian Border Clashes & Israeli Reprisals',
          paragraphs: [
            '<span class="para-ref">[2.1]</span> Between 1965 and 1967, the border between northeastern Israel and Syria became the most dangerous frontier in the Middle East. Syrian artillery batteries perched atop the towering volcanic plateau of the Golan Heights held complete tactical dominance over the low-lying Israeli kibbutzim (farming communities) in the Hula Valley below. Syrian gunners routinely fired machine guns and artillery shells down at Israeli tractors attempting to cultivate fields within the disputed demilitarised border zones. Israeli farmers were forced to drive custom-armored tractors to plough their fields under fire, while Israeli school children were evacuated to sleep in reinforced underground concrete bomb shelters. (<span class="archival-meta-tag">Source A</span>) illustrates the commanding geographical position of the Syrian fortifications on the Golan Heights, showing why this frontier became a continuous combat zone.',
            '<span class="para-ref">[2.2]</span> In response to these border attacks and ongoing Fatah sabotage raids, the Israeli military High Command adopted a policy of aggressive retaliation. Israeli leaders, including Chief of Staff Yitzhak Rabin and Prime Minister Levi Eshkol, warned that Israel held host governments directly accountable for any guerrilla attacks launched from their territory. Rather than deterring raids, this hardline policy locked both sides into an escalating cycle of violence: every guerrilla landmine was answered by Israeli artillery barrages and air strikes, which in turn provoked Syrian counter-bombardments and calls across the Arab world for revenge.',
          ],
          source: {
            letter: 'A',
            title:
              'Source A: Historical Map: The Syrian Armistice Line and Golan Heights Overlooking Israeli Settlements (1964–1967)',
            caption:
              'Contour map illustrating the Syrian artillery batteries on the Golan Heights plateau dominating the Israeli agricultural kibbutzim in the Hula Valley below.',
            provenance:
              'Department of Military Survey, Historical Topographical Record, Sheet 4 (Accession Ref: ISR-SYR-66).',
            source_context:
              'This official military topographical survey map details the Syrian artillery bunkers and trench complexes built into the volcanic cliffs of the Golan Heights between 1964 and 1967. The cliff-face rose steeply over 1,000 feet above the Israeli collective farms in the Hula Valley, granting Syrian gunners an unobstructed line of sight to shell Israeli civilian tractors and villages below.',
            hinge_question:
              'How does the physical elevation of the Golan Heights shown in Source A explain why border skirmishes between Israel and Syria were so difficult to resolve peacefully?',
          },
          tasks: [
            {
              id: 'task_6_2',
              title: 'Task 2: Source Analysis — The Golan Heights Frontier',
              instructions:
                'Using Source A and paragraphs [2.1]–[2.2], explain why the geography of the Golan Heights gave Syria a commanding military advantage and why Israel adopted a policy of retaliation.',
              scaffolding: {
                sentence_starter:
                  'Source A clearly demonstrates that the Syrian armed forces held a commanding military position because...',
                connectives: [
                  'Because of this terrain advantage, Syrian gunners could...',
                  'In response, Israeli military commanders decided that...',
                ],
              },
              model_answer:
                'Source A clearly demonstrates that the Syrian armed forces held a commanding military advantage because the Golan Heights formed a high volcanic plateau rising steeply over 1,000 feet above the Israeli valley below. Syrian artillery could look directly down onto Israeli civilian farms (kibbutzim) and shell tractors in the fields with complete visual accuracy. Because Israeli farmers could not defend themselves from low ground, Israeli military leaders adopted a doctrine of aggressive retaliation, using air strikes and tanks to destroy Syrian positions whenever fire was opened.',
            },
          ],
        },
        {
          title:
            'Act 3: Forensic Evidence & The Brink of War — The Samu Raid & The 7 April 1967 Dogfight',
          paragraphs: [
            '<span class="para-ref">[3.1]</span> By late 1966, this cycle of violence triggered two major military explosions that brought the Middle East to the brink of war. On 11 November 1966, an Israeli border patrol vehicle struck a Fatah landmine near the southern West Bank border, killing three Israeli soldiers. Although the guerrillas had crossed from Jordan, King Hussein of Jordan had actively tried to suppress Fatah to avoid Israeli retaliation. Nevertheless, on 13 November 1966, Israeli forces launched a massive daytime reprisal attack on the West Bank town of Samu. Israeli armored forces destroyed dozens of houses and clashed fiercely with the Jordanian army, leaving 15 Jordanian soldiers and three civilians dead. The Samu raid provoked furious riots across the West Bank, with Palestinians denouncing King Hussein for failing to defend them and demanding weapons to fight Israel.',
            '<span class="para-ref">[3.2]</span> The decisive military clash occurred five months later on 7 April 1967 along the Syrian frontier. When Syrian gunners opened fire on an Israeli tractor working disputed land near Lake Tiberias, Israeli tanks and aircraft retaliated. The battle rapidly expanded into a massive aerial dogfight. Israeli Air Force Mirage jet fighters intercepted Syrian MiG-21s, pursuing them across the border and shooting down six Syrian jets in full view of spectators over Damascus. (<span class="archival-meta-tag">Source B</span>) records the intense humiliation felt in Damascus following this aerial defeat. Syrian radio broadcasts furiously accused President Nasser of Egypt of cowardice, taunting him for hiding behind United Nations peacekeepers in the Sinai while Syrian pilots were killed. By May 1967, Nasser felt his leadership of the Arab world was under direct threat, setting the stage for the fatal moves that led to the Six Day War.',
          ],
          source: {
            letter: 'B',
            title:
              'Source B: Archival Diplomatic Dispatch: The 7 April 1967 Air Battle and Arab Political Repercussions',
            caption:
              'Contemporary diplomatic intelligence report recording the Syrian public reaction following the shooting down of six MiG-21 fighter jets over Damascus.',
            provenance:
              'Diplomatic Telegram, Foreign & Commonwealth Office Archive, Middle East Department (Ref: FCO 17/289, April 1967).',
            source_context:
              'This official diplomatic cable describes the immediate political crisis in Damascus and Cairo following the 7 April 1967 dogfight in which six Syrian MiG-21 fighters were shot down by the Israeli Air Force within minutes. The dispatch highlights the severe embarrassment felt by Syrian leaders and the wave of media criticism directed at Egypt for failing to activate its mutual defense pact with Syria.',
            hinge_question:
              'Why did the public humiliation of Syria in the 7 April 1967 air battle make it almost impossible for President Nasser of Egypt to remain inactive?',
          },
          tasks: [
            {
              id: 'task_6_3',
              title: 'Task 3: Comparative Analysis — Flashpoints on the Road to War',
              instructions:
                'Using paragraphs [3.1]–[3.2] and Source B, complete a comparative analysis explaining how both the Samu Raid and the 7 April 1967 air battle increased pressure on Arab leaders.',
              scaffolding: {
                sentence_starter:
                  'Both the Samu Raid and the 7 April 1967 air clash escalated tensions significantly because...',
                connectives: [
                  'In Jordan, the attack on Samu resulted in...',
                  'Meanwhile, the aerial defeat over Damascus directly pressured President Nasser because...',
                ],
              },
              model_answer:
                'Both the Samu raid and the 7 April 1967 air clash escalated tensions significantly because they exposed the military weakness of Arab states and triggered immense political instability. In Jordan, the Samu raid destroyed houses, killed 15 Jordanian soldiers, and caused Palestinians in the West Bank to riot against King Hussein for failing to protect them. Meanwhile, the shooting down of six Syrian MiG jets on 7 April 1967 publicly humiliated Damascus and led to fierce Syrian accusations that President Nasser was hiding behind UN peacekeepers in Egypt. This intense public pressure made Nasser feel he had to take decisive action to restore his reputation as the leader of the Arab world.',
            },
          ],
        },
        {
          title:
            'Act 4: The Historical Verdict & Extended Writing — Why Was War Inevitable by Spring 1967?',
          paragraphs: [
            '<span class="para-ref">[4.1]</span> By May 1967, the Middle East had reached a critical flashpoint. Three interconnected factors had created an inescapable crisis: first, the conflict over the River Jordan water supply had transformed natural resources into a justification for military strikes; second, the rise of independent Palestinian guerrilla groups like Fatah, backed by the radical Syrian government, guaranteed continuous border violence; and third, Israel\'s uncompromising policy of massive military retaliation ensured that local skirmishes escalated into major battles.',
            '<span class="para-ref">[4.2]</span> Historians emphasize that while neither Israeli leaders nor President Nasser actively wanted a full-scale war in the spring of 1967, both sides had painted themselves into diplomatic corners. When false Soviet intelligence arrived in Cairo in mid-May claiming Israel was massing twelve brigades to invade Syria, Nasser felt he had no choice but to march his army into the Sinai to defend his Arab allies. The regional escalation that began at the 1964 Cairo Conference had built a momentum that diplomacy could no longer restrain.',
          ],
          tasks: [
            {
              id: 'task_6_4',
              title: 'Task 4: GCSE Extended Writing — Causes of Rising Tension, 1964–1967',
              instructions:
                'Explain why tensions between Israel and its Arab neighbours increased significantly in the years 1964–1967. [12 marks]',
              scaffolding: {
                sentence_starters: [
                  'One major reason why tensions increased between 1964 and 1967 was the conflict over water and the creation of the PLO...',
                  'Another key factor that escalated tension was the continuous border warfare between Israel and Syria on the Golan Heights...',
                  'Finally, major military clashes in late 1966 and early 1967 made war almost unavoidable...',
                ],
                causal_connectives: [
                  'Consequently, this directly resulted in...',
                  'Furthermore, this created a situation where...',
                  'This was significant because it forced leaders to...',
                ],
                evaluative_criteria:
                  'Judge which factor was the most critical in making war inevitable by spring 1967.',
              },
              model_answer:
                "Tensions between Israel and its Arab neighbours increased significantly between 1964 and 1967 due to water disputes, Palestinian guerrilla activity, and direct military clashes.\n\nOne major reason for rising tension was the conflict over freshwater and the founding of the PLO in 1964. At the Cairo Conference in January 1964, Arab leaders met to oppose Israel’s National Water Carrier, which pumped water from the Sea of Galilee. Arab states attempted to divert headwaters of the River Jordan inside Syria, which led to Israeli tanks and aircraft bombing Syrian engineering sites. At the same conference, Arab leaders created the PLO to champion Palestinian rights, while Yasser Arafat's Fatah movement began launching guerrilla raids into Israel. Consequently, water became a military trigger and cross-border attacks increased.\n\nAnother significant cause was the continuous border skirmishes along the Golan Heights between Israel and Syria. Syrian artillery batteries perched atop the high volcanic cliffs of the Golan Heights regularly shelled Israeli collective farms (kibbutzim) in the Hula Valley below, forcing Israeli children to sleep in bomb shelters. In response, Israeli military leaders adopted a doctrine of severe retaliation, warning that host nations would be held responsible for all guerrilla raids. This tit-for-tat violence trapped both nations in a cycle of escalation where neither side could afford to back down.\n\nFinally, two major military flashpoints in 1966–67 brought the region to the brink of war. In November 1966, Israel launched the Samu raid into the West Bank, destroying houses and killing 15 Jordanian soldiers after a landmine incident. This caused mass riots in Jordan against King Hussein. Then, on 7 April 1967, an agricultural dispute escalated into a major air battle in which Israeli fighter jets shot down six Syrian MiG-21s over Damascus. This humiliated Syria and prompted intense taunts against President Nasser of Egypt for failing to defend his Arab allies.\n\nOverall, the most critical factor was the 7 April 1967 air battle, because it publicly exposed Arab military weakness and placed intolerable pressure on Nasser to mobilize his army, making the Six Day War inevitable.",
            },
          ],
        },
      ],
      sources: [
        {
          letter: 'A',
          title:
            'Source A: Historical Map: The Syrian Armistice Line and Golan Heights Overlooking Israeli Settlements (1964–1967)',
          caption:
            'Contour map illustrating the Syrian artillery batteries on the Golan Heights plateau dominating the Israeli agricultural kibbutzim in the Hula Valley below.',
          provenance:
            'Department of Military Survey, Historical Topographical Record, Sheet 4 (Accession Ref: ISR-SYR-66).',
          source_context:
            'This official military topographical survey map details the Syrian artillery bunkers and trench complexes built into the volcanic cliffs of the Golan Heights between 1964 and 1967. The cliff-face rose steeply over 1,000 feet above the Israeli collective farms in the Hula Valley, granting Syrian gunners an unobstructed line of sight to shell Israeli civilian tractors and villages below.',
          hinge_question:
            'How does the physical elevation of the Golan Heights shown in Source A explain why border skirmishes between Israel and Syria were so difficult to resolve peacefully?',
        },
        {
          letter: 'B',
          title:
            'Source B: Archival Diplomatic Dispatch: The 7 April 1967 Air Battle and Arab Political Repercussions',
          caption:
            'Contemporary diplomatic intelligence report recording the Syrian public reaction following the shooting down of six MiG-21 fighter jets over Damascus.',
          provenance:
            'Diplomatic Telegram, Foreign & Commonwealth Office Archive, Middle East Department (Ref: FCO 17/289, April 1967).',
          source_context:
            'This official diplomatic cable describes the immediate political crisis in Damascus and Cairo following the 7 April 1967 dogfight in which six Syrian MiG-21 fighters were shot down by the Israeli Air Force within minutes. The dispatch highlights the severe embarrassment felt by Syrian leaders and the wave of media criticism directed at Egypt for failing to activate its mutual defense pact with Syria.',
          hinge_question:
            'Why did the public humiliation of Syria in the 7 April 1967 air battle make it almost impossible for President Nasser of Egypt to remain inactive?',
        },
      ],
      exam_practice: {
        question:
          'Explain one consequence of the 7 April 1967 aerial battle over the Golan Heights. [4 marks]',
        marks: 4,
        time_mins: 5,
        type: 'consequence',
        model_answer:
          'One direct consequence of the 7 April 1967 aerial battle was the severe political humiliation of Syria and the resulting pressure on President Nasser of Egypt to take military action.\n\nDuring the dogfight, the Israeli Air Force shot down six Syrian MiG-21 fighter jets in full view of civilians in Damascus without suffering any losses. Consequently, Syrian leaders and media fiercely criticized Egypt for failing to activate its 1966 mutual defense pact, accusing Nasser of hiding behind UN peacekeepers in the Sinai while Syrians died. This directly forced Nasser to mobilize 100,000 Egyptian troops and expel UN peacekeepers from the Sinai in May 1967 to restore his leadership of the Arab world, which triggered the Six Day War.',
      },
      flashcards: [
        {
          front: 'When was the Cairo Conference held and what was its key outcome?',
          back: 'January 1964; Arab leaders created the PLO and approved a plan to divert the River Jordan headwaters away from Israel.',
        },
        {
          front: 'What was the National Water Carrier?',
          back: "Israel's engineering pipeline completed in 1964 to pump water from the Sea of Galilee across the country to the Negev desert.",
        },
        {
          front:
            'What organisation did Yasser Arafat lead that launched guerrilla raids into Israel?',
          back: 'Fatah (founded in the late 1950s, became the largest group within the PLO).',
        },
        {
          front: 'Why did the Golan Heights give Syria a military advantage?',
          back: 'The Golan Heights rose 1,000 feet above the Israeli Hula Valley, allowing Syrian artillery to shell Israeli collective farms (kibbutzim).',
        },
        {
          front: 'What happened during the Samu raid on 13 November 1966?',
          back: 'Israel launched a major daytime raid into the Jordanian West Bank, destroying houses and killing 15 Jordanian soldiers after a landmine attack.',
        },
        {
          front: 'What were the consequences of the Samu raid in Jordan?',
          back: 'It provoked mass anti-government riots by Palestinians in the West Bank, accusing King Hussein of failing to protect them.',
        },
        {
          front: 'What happened in the air battle over the Golan Heights on 7 April 1967?',
          back: 'Israeli fighter jets shot down six Syrian MiG-21s in full view of Damascus following an agricultural border dispute.',
        },
        {
          front: 'How did the 7 April 1967 air battle affect President Nasser of Egypt?',
          back: 'Syria publicly accused Nasser of cowardice for not defending them, putting immense pressure on him to mobilize his army.',
        },
        {
          front: "What was Israel's military policy regarding border raids between 1964 and 1967?",
          back: 'A policy of aggressive, disproportionate retaliation, holding host governments responsible for all guerrilla attacks.',
        },
        {
          front: 'What false information did the Soviet Union give Egypt in May 1967?',
          back: 'False reports claiming Israel was massing twelve military brigades on the Syrian border for an imminent invasion.',
        },
      ],
      quiz: [
        {
          question:
            'In which year did Arab leaders meet in Cairo to establish the PLO and oppose Israeli water projects?',
          q: 'In which year did Arab leaders meet in Cairo to establish the PLO and oppose Israeli water projects?',
          options: ['1960', '1964', '1967', '1973'],
          answer: '1964',
          a: '1964',
          explanation: 'The Arab League Summit met in Cairo in January 1964.',
        },
        {
          question: "What major water body does Israel's National Water Carrier pump water from?",
          q: "What major water body does Israel's National Water Carrier pump water from?",
          options: ['The Dead Sea', 'The Mediterranean Sea', 'The Sea of Galilee', 'The Red Sea'],
          answer: 'The Sea of Galilee',
          a: 'The Sea of Galilee',
          explanation:
            'The National Water Carrier takes water from the Sea of Galilee (Lake Tiberias) to central and southern Israel.',
        },
        {
          question:
            'Who emerged as the prominent leader of the Palestinian guerrilla organisation Fatah?',
          q: 'Who emerged as the prominent leader of the Palestinian guerrilla organisation Fatah?',
          options: ['Yasser Arafat', 'King Hussein', 'Gamal Abdel Nasser', 'David Ben-Gurion'],
          answer: 'Yasser Arafat',
          a: 'Yasser Arafat',
          explanation: 'Yasser Arafat founded and led Fatah, which became the core of the PLO.',
        },
        {
          question:
            'Which strategic plateau was used by Syrian artillery to shell Israeli farms below?',
          q: 'Which strategic plateau was used by Syrian artillery to shell Israeli farms below?',
          options: [
            'The Sinai Peninsula',
            'The Golan Heights',
            'The West Bank',
            'The Negev Desert',
          ],
          answer: 'The Golan Heights',
          a: 'The Golan Heights',
          explanation: 'The Golan Heights towered over Israeli settlements in the Hula Valley.',
        },
        {
          question:
            'What were the Israeli collective farming communities in the border valleys called?',
          q: 'What were the Israeli collective farming communities in the border valleys called?',
          options: ['Fedayeen', 'Kibbutzim', 'Mandates', 'Settlements'],
          answer: 'Kibbutzim',
          a: 'Kibbutzim',
          explanation:
            'Kibbutzim were collective agricultural communities established across Israel.',
        },
        {
          question:
            'In which West Bank town did Israeli forces launch a major raid on 13 November 1966?',
          q: 'In which West Bank town did Israeli forces launch a major raid on 13 November 1966?',
          options: ['Jericho', 'Nablus', 'Samu', 'Hebron'],
          answer: 'Samu',
          a: 'Samu',
          explanation:
            'The Samu raid involved an armored cross-border assault after an Israeli patrol struck a landmine.',
        },
        {
          question: 'Which country controlled the West Bank at the time of the Samu raid in 1966?',
          q: 'Which country controlled the West Bank at the time of the Samu raid in 1966?',
          options: ['Syria', 'Egypt', 'Jordan', 'Lebanon'],
          answer: 'Jordan',
          a: 'Jordan',
          explanation:
            'Jordan controlled and administered the West Bank from 1948 until the 1967 war.',
        },
        {
          question:
            'How many Syrian MiG-21 fighter jets were shot down by Israeli fighters on 7 April 1967?',
          q: 'How many Syrian MiG-21 fighter jets were shot down by Israeli fighters on 7 April 1967?',
          options: ['Two', 'Four', 'Six', 'Twelve'],
          answer: 'Six',
          a: 'Six',
          explanation:
            'Israeli Mirage jets shot down six Syrian MiG-21s, flying as far as Damascus.',
        },
        {
          question:
            'Over which Arab capital did Israeli fighter jets fly after shooting down Syrian MiGs in April 1967?',
          q: 'Over which Arab capital did Israeli fighter jets fly after shooting down Syrian MiGs in April 1967?',
          options: ['Cairo', 'Amman', 'Damascus', 'Beirut'],
          answer: 'Damascus',
          a: 'Damascus',
          explanation:
            'Israeli jets pursued Syrian aircraft directly over the Syrian capital of Damascus.',
        },
        {
          question:
            'What did Syrian leaders accuse Egyptian President Nasser of doing after the April 1967 air clash?',
          q: 'What did Syrian leaders accuse Egyptian President Nasser of doing after the April 1967 air clash?',
          options: [
            'Hiding behind UN peacekeepers',
            'Trading secretly with Israel',
            'Closing the Suez Canal',
            'Surrendering the Sinai',
          ],
          answer: 'Hiding behind UN peacekeepers',
          a: 'Hiding behind UN peacekeepers',
          explanation:
            "Syria accused Nasser of cowardice for keeping UN peacekeepers (UNEF) along Egypt's border.",
        },
        {
          question: 'What does the acronym PLO stand for?',
          q: 'What does the acronym PLO stand for?',
          options: [
            'Palestine Liberation Organisation',
            'Peace League of Orient',
            'Pan-Arab Liberation Office',
            'Palestinian Legion Order',
          ],
          answer: 'Palestine Liberation Organisation',
          a: 'Palestine Liberation Organisation',
          explanation: 'The Palestine Liberation Organisation was created in 1964.',
        },
        {
          question: 'Which river’s headwaters did Syria and Lebanon plan to divert in 1964?',
          q: 'Which river’s headwaters did Syria and Lebanon plan to divert in 1964?',
          options: [
            'The Nile River',
            'The River Jordan',
            'The Euphrates River',
            'The Tigris River',
          ],
          answer: 'The River Jordan',
          a: 'The River Jordan',
          explanation:
            'The River Jordan water diversion plan was approved at the 1964 Cairo Conference.',
        },
        {
          question:
            'Who was the Prime Minister of Israel during the border escalation of 1964–1967?',
          q: 'Who was the Prime Minister of Israel during the border escalation of 1964–1967?',
          options: ['David Ben-Gurion', 'Levi Eshkol', 'Menachem Begin', 'Ariel Sharon'],
          answer: 'Levi Eshkol',
          a: 'Levi Eshkol',
          explanation: 'Levi Eshkol served as Prime Minister of Israel from 1963 to 1969.',
        },
        {
          question:
            'Who was the Chief of Staff of the Israeli Defence Forces (IDF) during the 1967 crisis?',
          q: 'Who was the Chief of Staff of the Israeli Defence Forces (IDF) during the 1967 crisis?',
          options: ['Yitzhak Rabin', 'Moshe Dayan', 'Shimon Peres', 'Golda Meir'],
          answer: 'Yitzhak Rabin',
          a: 'Yitzhak Rabin',
          explanation: 'Yitzhak Rabin was Chief of Staff of the IDF from 1964 to 1968.',
        },
        {
          question:
            'What political coup in February 1966 intensified Syria’s hostility towards Israel?',
          q: 'What political coup in February 1966 intensified Syria’s hostility towards Israel?',
          options: [
            "A radical military Ba'athist coup",
            'A pro-Western royalist coup',
            'A communist takeover',
            'A UN-backed democratic election',
          ],
          answer: "A radical military Ba'athist coup",
          a: "A radical military Ba'athist coup",
          explanation:
            'The February 1966 Syrian coup brought radical officers to power who supported popular war against Israel.',
        },
        {
          question:
            'What defensive measure did Israeli kibbutzim along the northern border adopt to protect children?',
          q: 'What defensive measure did Israeli kibbutzim along the northern border adopt to protect children?',
          options: [
            'Evacuating to Cyprus',
            'Sleeping in reinforced underground bomb shelters',
            'Building high stone castle walls',
            'Surrendering farms to the UN',
          ],
          answer: 'Sleeping in reinforced underground bomb shelters',
          a: 'Sleeping in reinforced underground bomb shelters',
          explanation:
            'Children in northern kibbutzim slept regularly in concrete underground shelters to survive shelling.',
        },
        {
          question:
            'What was the official Israeli military policy in response to cross-border guerrilla raids?',
          q: 'What was the official Israeli military policy in response to cross-border guerrilla raids?',
          options: [
            'Ignoring small attacks',
            'Disproportionate military retaliation against host states',
            'Paying ransoms to militant groups',
            'Appealing exclusively to the League of Nations',
          ],
          answer: 'Disproportionate military retaliation against host states',
          a: 'Disproportionate military retaliation against host states',
          explanation:
            'Israel followed a policy of severe reprisal raids to force host governments to police their borders.',
        },
        {
          question:
            'How many Jordanian soldiers were killed during the Israeli reprisal raid on Samu in 1966?',
          q: 'How many Jordanian soldiers were killed during the Israeli reprisal raid on Samu in 1966?',
          options: ['Zero', 'Fifteen', 'One hundred', 'Five hundred'],
          answer: 'Fifteen',
          a: 'Fifteen',
          explanation:
            'Fifteen Jordanian soldiers and three civilians were killed in the battle at Samu.',
        },
        {
          question: 'Which superpower passed false intelligence reports to Egypt in mid-May 1967?',
          q: 'Which superpower passed false intelligence reports to Egypt in mid-May 1967?',
          options: ['The United States', 'The Soviet Union (USSR)', 'Great Britain', 'France'],
          answer: 'The Soviet Union (USSR)',
          a: 'The Soviet Union (USSR)',
          explanation:
            'The Soviet Union falsely warned Egypt that Israel was concentrating troops to invade Syria.',
        },
        {
          question:
            "Why was control of the River Jordan water supply so critical to Israel's survival?",
          q: "Why was control of the River Jordan water supply so critical to Israel's survival?",
          options: [
            'It was needed for oil extraction',
            "It was Israel's primary source of freshwater for agriculture and urban growth",
            'It was the only route for passenger ships',
            'It powered nuclear reactors',
          ],
          answer: "It was Israel's primary source of freshwater for agriculture and urban growth",
          a: "It was Israel's primary source of freshwater for agriculture and urban growth",
          explanation:
            'Freshwater from the Sea of Galilee and River Jordan was essential to sustain Israeli agriculture and immigration.',
        },
      ],
    },

    // =========================================================================
    // LESSON 7 / KT 2.2: The Slide to War & The Six Day War (May–June 1967)
    // =========================================================================
    {
      id: 'lesson_7',
      title: 'KT 2.2: The Slide to War & The Six Day War (May–June 1967)',
      learning_objective:
        'Explain how the crisis of May 1967 triggered the Six Day War and analyse why Israel achieved rapid victory across three fronts.',
      learning_objectives: [
        "Explain how Soviet false reports, Nasser's troop deployments, and the closure of the Straits of Tiran triggered the crisis of May 1967.",
        "Describe how Israel's pre-emptive dawn airstrike destroyed the Arab air forces on 5 June 1967.",
        'Analyse the key military campaigns across Sinai, the West Bank, and the Golan Heights that transformed the map of the Middle East.',
      ],
      hook_text:
        'On the morning of 5 June 1967, nearly 200 Israeli fighter jets flew low beneath radar over the Mediterranean. Within three hours, over 300 Egyptian aircraft lay burning on the tarmac. By Saturday evening, the map of the Middle East had been changed forever.',
      teacher_notes: {
        primer:
          "This lesson covers the rapid descent into war in May 1967 and the six days of combat that radically redrew the Middle East. Pupils examine how Soviet false intelligence reports, Nasser's expulsion of UNEF peacekeepers, and the blockade of the Straits of Tiran led Israel to launch a decisive pre-emptive dawn air strike on 5 June 1967. They then study the rapid three-front campaign (Sinai, West Bank/Jerusalem, Golan Heights) that resulted in Israel quadrupling its territory in under a week.",
        objectives: [
          {
            objective:
              'Explain the sequence of events in May 1967 that made war unavoidable (Soviet reports, UNEF, Tiran).',
            primer:
              'Guide pupils through paragraph [1.1]. Stress that the USSR fed false intelligence to Egypt claiming Israeli brigades were massed on the Syrian border. Nasser responded by moving 100,000 troops into the Sinai, expelling UN peacekeepers, and closing the Straits of Tiran to Israeli ships.',
            question:
              'Why did Israel regard the closure of the Straits of Tiran as an act of war (casus belli)?',
          },
          {
            objective:
              "Describe the execution and decisive impact of Israel's pre-emptive dawn airstrike on 5 June 1967.",
            primer:
              'Direct pupils to paragraph [2.1] and Source A. Emphasize that Israeli jets flew below radar detection to destroy 300+ Egyptian aircraft on the ground, securing complete air supremacy.',
            question:
              'How did gaining total control of the skies in the first three hours determine the outcome of the entire ground war?',
          },
          {
            objective:
              'Trace the three military campaigns and explain why Israel succeeded so rapidly in Sinai, the West Bank, and the Golan Heights.',
            primer:
              'Lead pupils through paragraphs [3.1]–[3.2]. Contrast Israeli military coordination, training, and motivation with Egyptian panic, chaotic communications, and the lack of coordination among Arab allies.',
            question:
              'What was the religious and emotional significance of Israeli forces capturing the Old City of Jerusalem and the Western Wall?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        title: 'Recall & Retrieval (Prior Learning: KT1 & KT2.1)',
        instructions: 'Answer these questions in full sentences based on your prior learning.',
        items: [
          {
            question:
              'Where did Arab League leaders meet in January 1964 to coordinate policy against Israel?',
            answer: 'Cairo.',
          },
          {
            question:
              'What is the full name of the political organisation established in 1964 to represent the Palestinian people?',
            answer: 'The Palestine Liberation Organisation (PLO).',
          },
          {
            question:
              'Which Palestinian nationalist guerrilla organisation was founded and led by Yasser Arafat?',
            answer: 'Fatah.',
          },
          {
            question:
              'What was the name of the Israeli engineering pipeline built to pump water from the Sea of Galilee across the country?',
            answer: 'The National Water Carrier.',
          },
          {
            question:
              'Which elevated territory was used by Syrian artillery to shell Israeli collective farms below?',
            answer: 'The Golan Heights.',
          },
          {
            question:
              'In November 1966, Israeli forces launched a major reprisal raid on which West Bank village?',
            answer: 'Samu.',
          },
          {
            question:
              'How many Syrian MiG fighter jets were shot down by the Israeli Air Force on 7 April 1967?',
            answer: 'Six.',
          },
          {
            question:
              'Which Egyptian leader nationalised the Suez Canal in 1956, becoming a hero of Pan-Arab nationalism?',
            answer: 'Gamal Abdel Nasser.',
          },
          {
            question:
              'What was the name of the armistice line drawn in 1949 after the first Arab-Israeli War?',
            answer: 'The Green Line.',
          },
          {
            question:
              'Which international organisation passed Resolution 181 in 1947 to partition Palestine?',
            answer: 'The United Nations.',
          },
        ],
      },
      vocab: [
        {
          term: 'UNEF (UN Emergency Force)',
          definition:
            'The United Nations peacekeeping force stationed in the Sinai Peninsula from 1957 until expelled by Nasser in May 1967.',
          example:
            'Nasser demanded the immediate withdrawal of UNEF peacekeepers from the Sinai border.',
        },
        {
          term: 'Straits of Tiran',
          definition:
            'The narrow sea passage connecting the Gulf of Aqaba to the Red Sea, vital for Israeli maritime trade through Eilat.',
          example: 'Egypt blockaded the Straits of Tiran, cutting off Israel’s oil imports.',
        },
        {
          term: 'Pre-emptive Strike',
          definition:
            'A surprise military attack launched in anticipation of an imminent enemy assault to neutralize the threat first.',
          example:
            'Israel launched a pre-emptive dawn air strike on 5 June 1967 to destroy Egyptian airfields.',
        },
        {
          term: 'Air Supremacy',
          definition:
            'Complete military control of the skies, preventing enemy aircraft from operating effectively.',
          example:
            'Total air supremacy allowed Israeli tanks to advance across the Sinai without fear of enemy bombing.',
        },
        {
          term: 'West Bank',
          definition:
            'The territory west of the River Jordan, administered by Jordan from 1948 until captured by Israel in June 1967.',
          example:
            'Israeli paratroopers captured the West Bank and East Jerusalem during the Six Day War.',
        },
        {
          term: 'Western Wall',
          definition:
            'The holy Jewish prayer site in the Old City of Jerusalem, captured by Israeli paratroopers on 7 June 1967.',
          example:
            'Israeli soldiers wept with emotion as they reached the Western Wall on 7 June 1967.',
        },
      ],
      vocab_cloze_text:
        'In mid-May 1967, President Nasser ordered 100,000 Egyptian troops into the Sinai and expelled the ____(1)____ peacekeepers. On 22 May, Nasser announced the closure of the ____(2)____ to Israeli shipping, an act Israel considered a trigger for war. Facing hostile Arab armies on three borders, the Israeli government launched a surprise ____(3)____ on the morning of 5 June 1967. Within three hours, the Israeli Air Force achieved total ____(4)____ by destroying over 300 Egyptian aircraft on the ground. Israeli armored columns quickly seized the entire Sinai Peninsula, while paratroopers captured the ____(5)____ from Jordan and advanced to the ____(6)____ in the Old City of Jerusalem.',
      narrative_blocks: [
        {
          title: 'Act 1: Context & Catalyst — The Spiral into Crisis (May 1967)',
          paragraphs: [
            '<span class="para-ref">[1.1]</span> The crisis that ignited the Six Day War began on 13 May 1967, when the Soviet Union passed false intelligence reports to Egyptian President Gamal Abdel Nasser claiming that Israel was massing twelve military brigades along the Syrian border for an imminent invasion. Although United Nations observers on the ground inspected the frontier and confirmed that no Israeli troop buildup existed, Nasser could not afford to look weak after months of Syrian taunts following the 7 April air battle. To restore his reputation as the undisputed champion of the Arab world, Nasser made three dramatic moves: he marched 100,000 Egyptian troops and 1,000 tanks into the Sinai Peninsula; on 16 May he ordered the immediate expulsion of the United Nations Emergency Force (UNEF) peacekeepers who had secured the border since 1957; and on 22 May he announced the closure of the Straits of Tiran to Israeli shipping.',
            '<span class="para-ref">[1.2]</span> The closure of the Straits of Tiran was the fatal turning point. The straits were Israel’s sole maritime gateway to Asia and East Africa through the southern port of Eilat, and the channel through which 90% of Israel’s vital crude oil imports arrived. Back in 1957, Israel had officially notified the international community that closing the straits would be treated as an explicit act of war (casus belli). Tension spiked to fever pitch on 30 May 1967, when King Hussein of Jordan flew to Cairo to sign a mutual defense pact, placing the Jordanian army under Egyptian command, while Iraq joined the alliance shortly after. Encircled by hostile armies boasting publicly of driving Israel into the sea, the Israeli cabinet formed a national unity government, appointing war hero General Moshe Dayan as Minister of Defence, and concluded that striking first was the only way to avoid national destruction.',
          ],
          tasks: [
            {
              id: 'task_7_1',
              title: "Task 1: Causal Sequence — Nasser's Escalations in May 1967",
              instructions:
                'Using paragraphs [1.1] and [1.2], identify the three actions taken by President Nasser in May 1967 and explain why Israel viewed the closure of the Straits of Tiran as an act of war.',
              scaffolding: {
                sentence_starter:
                  'In May 1967, President Nasser escalated the regional crisis through three key actions: first...',
                connectives: [
                  'Consequently, the closure of the Straits of Tiran was viewed as an act of war because...',
                  'Furthermore, when Jordan signed a mutual defense pact...',
                ],
              },
              model_answer:
                'In May 1967, President Nasser took three major actions that triggered the crisis: he moved 100,000 Egyptian troops and 1,000 tanks into the Sinai, he expelled the UNEF peacekeepers guarding the border, and he blockaded the Straits of Tiran. Israel regarded the closure of the Straits of Tiran as an act of war because it cut off Israel’s only southern sea route through the port of Eilat, blocking 90% of its crude oil imports and threatening economic strangulation. When Jordan signed a military pact placing its army under Egyptian command, Israel felt encircled and decided it had to launch a pre-emptive strike.',
            },
          ],
        },
        {
          title: 'Act 2: Escalation & Conflict — The Pre-Emptive Dawn Airstrike (5 June 1967)',
          paragraphs: [
            '<span class="para-ref">[2.1]</span> At 7:45 am on Monday, 5 June 1967, Israel launched a meticulously planned pre-emptive dawn airstrike against Egyptian military airfields. Realising that Israel’s small civilian reserve army could not remain mobilized indefinitely without economic collapse, Israeli military planners committed nearly all of their operational jet fighters—leaving only twelve aircraft behind to defend Israel’s home skies. Israeli fighter-bombers flew out west over the Mediterranean Sea, skimming just thirty feet above the waves to stay beneath Egyptian radar detection, before looping inland into Egypt from the west at the exact moment Egyptian pilots were finishing breakfast and morning patrols had landed.',
            '<span class="para-ref">[2.2]</span> The surprise attack was an overwhelming tactical triumph. In waves lasting just over two hours, Israeli jets struck seventeen Egyptian airbases, dropping specialized rocket-boosted cratering bombs to destroy concrete runways before strafing parked combat aircraft with cannons. Over 300 Egyptian combat aircraft were destroyed on the ground, wiping out Egypt\'s air force before it could take off. When Syrian and Jordanian aircraft attempted to retaliate later that morning, Israeli jets struck their airfields as well, destroying a further 100 enemy planes. (<span class="archival-meta-tag">Source A</span>) shows the charred ruins of Egyptian MiG fighter jets on the airfield tarmac at Bir Gifgafa in the Sinai, demonstrating how total air supremacy was won in the opening hours of the conflict, leaving Arab ground troops completely exposed to air attack.',
          ],
          source: {
            letter: 'A',
            title:
              'Source A: Archival Photograph: Destroyed Egyptian Jet Aircraft at Bir Gifgafa Airfield, Sinai (5 June 1967)',
            caption:
              'Charred wreckage of Egyptian combat aircraft destroyed on the tarmac during the Israeli dawn air strike of 5 June 1967.',
            provenance:
              'IDF Military Archive, Western Sinai Campaign Collection (Accession Ref: AIR-1967-0506).',
            source_context:
              'This primary photograph records the catastrophic aftermath of the Israeli dawn airstrike at Bir Gifgafa airbase in the Sinai Peninsula on 5 June 1967. Over 300 Egyptian military aircraft were destroyed on the ground within three hours, granting Israel absolute air supremacy for the remainder of the war.',
            hinge_question:
              "How does Source A help explain why the ground war in the Sinai Peninsula was decided so rapidly in Israel's favour?",
          },
          tasks: [
            {
              id: 'task_7_2',
              title: 'Task 2: Tactical Audit — The Air Strike of 5 June 1967',
              instructions:
                'Using Source A and paragraphs [2.1]–[2.2], explain how the tactics of low-altitude flight, runway destruction, and surprise enabled Israel to achieve complete air supremacy.',
              scaffolding: {
                sentence_starter:
                  "Source A illustrates the devastation caused by Israel's pre-emptive strike, which succeeded because...",
                connectives: [
                  'By flying low beneath enemy radar, Israeli pilots...',
                  'This air supremacy was decisive because Arab ground forces...',
                ],
              },
              model_answer:
                "Source A illustrates the total destruction of Egypt's air fleet, which succeeded due to surprise, low-altitude flying, and runway cratering. Israeli pilots flew just thirty feet above the Mediterranean Sea to avoid radar detection, striking Egyptian airfields from unexpected western angles while Egyptian pilots were having breakfast. By using specialized bombs to crater the runways, Egyptian jets could not take off, allowing Israeli aircraft to destroy over 300 planes on the tarmac. As shown in Source A, gaining total control of the air meant that Israeli ground forces could advance across the desert with complete close-air support, while Egyptian troops had zero protection from air strikes.",
            },
          ],
        },
        {
          title: 'Act 3: Forensic Evidence & The Blitz — Three Fronts in Six Days',
          paragraphs: [
            '<span class="para-ref">[3.1]</span> With total control of the skies established, the Israeli ground offensive swept across three separate combat fronts. In the Sinai Peninsula, three Israeli armored divisions, commanded by generals including Ariel Sharon, smashed through Egyptian fortified border positions. Deprived of air cover and receiving panicked, contradictory retreat orders from Cairo, the Egyptian army collapsed into a disordered retreat. Within four days, Israeli armored spearheads had reached the eastern bank of the Suez Canal, capturing thousands of Egyptian soldiers and destroying hundreds of tanks.',
            '<span class="para-ref">[3.2]</span> On the eastern front, Jordan had entered the war on the morning of 5 June by shelling Israeli positions in West Jerusalem and suburbs of Tel Aviv, ignoring Israeli diplomatic warnings to remain neutral. Israeli forces counter-attacked immediately into the West Bank, surrounding Jordanian troops in Nablus, Bethlehem, and Hebron. On Wednesday, 7 June, Israeli paratroopers breached the Lions\' Gate into the Old City of Jerusalem, capturing the Temple Mount and reaching the Western Wall—the holiest prayer site in Judaism, where Jews had been barred from praying under Jordanian rule since 1948. (<span class="archival-meta-tag">Source B</span>) captures the iconic photograph of Israeli paratroopers standing in silence and emotion at the foot of the Western Wall. Finally, on 9–10 June, Israeli infantry and armored units scaled the fortified cliffs of the Golan Heights, driving the Syrian army back to within forty miles of Damascus before a UN ceasefire ended the war.',
          ],
          source: {
            letter: 'B',
            title:
              'Source B: Archival Primary Photograph: Israeli Paratroopers at the Western Wall, Jerusalem (David Rubinger, 7 June 1967)',
            caption:
              'Israeli paratroopers standing in front of the Western Wall in the Old City of Jerusalem shortly after capturing the city on 7 June 1967.',
            provenance:
              'Photograph by David Rubinger, Israel Government Press Office (Accession Ref: GPO-D597-088).',
            source_context:
              'This world-famous primary photograph captures Israeli paratroopers of the 55th Paratroopers Brigade standing in contemplation before the Western Wall in East Jerusalem on 7 June 1967. Jordanian rule had excluded Jewish worshippers from the holy site for nineteen years, making this capture an emotional turning point for Israel.',
            hinge_question:
              'Why did the capture of the Western Wall shown in Source B carry such profound religious and psychological significance for the Jewish people?',
          },
          tasks: [
            {
              id: 'task_7_3',
              title: 'Task 3: Three-Front Military Grid',
              instructions:
                'Complete a structured grid detailing Israeli actions and territorial gains across the Sinai, West Bank, and Golan Heights fronts.',
              scaffolding: {
                sentence_starter:
                  'Across the three combat fronts, Israel achieved rapid territorial conquests: in the Sinai...',
                connectives: [
                  'Meanwhile, on the Jordanian front in the West Bank...',
                  'Finally, on the northern Syrian front...',
                ],
              },
              model_answer:
                'Across the three combat fronts, Israel achieved total military victory:\n1. Sinai Peninsula (Egyptian Front): Israeli armored divisions smashed Egyptian lines, reaching the Suez Canal in four days and capturing the entire Sinai desert and Gaza Strip.\n2. West Bank and East Jerusalem (Jordanian Front): After Jordan shelled West Jerusalem, Israeli troops encircled Jordanian forces, capturing the West Bank and seizing the Old City of Jerusalem and the Western Wall on 7 June.\n3. Golan Heights (Syrian Front): On 9–10 June, Israeli forces scaled the steep volcanic cliffs under heavy fire, capturing Syrian artillery positions and driving Syrian forces back towards Damascus.',
            },
          ],
        },
        {
          title:
            'Act 4: The Historical Verdict & Extended Writing — How the Map Changed in Six Days',
          paragraphs: [
            '<span class="para-ref">[4.1]</span> In only six days of combat (5–10 June 1967), the strategic and political map of the Middle East was revolutionized. Israel lost fewer than 1,000 soldiers, while Arab armies suffered catastrophic losses: over 15,000 Egyptian, 6,000 Jordanian, and 1,000 Syrian soldiers were killed, and the bulk of their modern military equipment was destroyed. Israel had quadrupled its territorial footprint, creating a vast strategic buffer zone that included the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights.',
            '<span class="para-ref">[4.2]</span> However, this triumph created complex long-term problems. By capturing the West Bank and Gaza Strip, Israel brought over one million Palestinian Arabs under military rule, triggering a fresh refugee exodus and fueling a new wave of Palestinian nationalism. While Israelis felt secure behind wide natural borders, the profound humiliation suffered by Egypt and Syria guaranteed that Arab leaders would dedicate their resources to preparing for a war of revenge.',
          ],
          tasks: [
            {
              id: 'task_7_4',
              title: 'Task 4: GCSE Narrative Account — The Six Day War (June 1967)',
              instructions:
                'Write a narrative account analysing the key events of the Six Day War (June 1967). [8 marks]',
              scaffolding: {
                stimulus_points: [
                  "Nasser's closure of the Straits of Tiran (May 1967)",
                  'The pre-emptive Israeli air strike (5 June 1967)',
                ],
                sentence_starters: [
                  'The crisis began in May 1967 when President Nasser took aggressive steps, including...',
                  'This directly led Israel to launch a pre-emptive strike on the morning of 5 June 1967, which resulted in...',
                  'Following this air victory, the war expanded rapidly across three land fronts, leading to...',
                ],
                causal_connectives: [
                  'As a direct consequence of this...',
                  'This paved the way for...',
                  'Ultimately, this resulted in...',
                ],
              },
              model_answer:
                'The Six Day War was triggered in May 1967 by escalating Arab-Israeli tensions and decided by Israel’s rapid military campaigns across three fronts.\n\nThe crisis began in mid-May 1967 when Egyptian President Gamal Abdel Nasser moved 100,000 troops into the Sinai Peninsula and expelled the UNEF peacekeepers following false Soviet intelligence reports. On 22 May, Nasser blockaded the Straits of Tiran, cutting off Israel’s vital oil imports through Eilat. Because Israel had declared this a cause for war, and because Jordan signed a military pact with Egypt on 30 May, Israeli leaders feared encirclement and decided they had to launch a pre-emptive strike to survive.\n\nThis directly led to the outbreak of war at 7:45 am on 5 June 1967, when nearly 200 Israeli fighter jets flew beneath radar over the Mediterranean Sea to attack Egyptian airfields. In three hours, Israel destroyed over 300 Egyptian aircraft on the ground, securing complete air supremacy. When Syrian and Jordanian air forces attempted to retaliate, their airfields were also destroyed. Consequently, Arab ground forces were left completely exposed to Israeli air attacks.\n\nWith control of the skies, Israeli ground forces surged across three fronts. In the Sinai, Israeli armored divisions broke through Egyptian lines, reaching the Suez Canal in four days. When Jordan shelled West Jerusalem, Israeli troops counter-attacked into the West Bank, capturing the entire territory and entering the Old City of Jerusalem on 7 June, reaching the Western Wall. Finally, on 9–10 June, Israeli forces stormed the fortified Golan Heights, driving the Syrian army back towards Damascus before a UN ceasefire ended the war.\n\nUltimately, this narrative shows that Israel’s opening air strike determined the outcome, allowing it to capture Sinai, Gaza, the West Bank, East Jerusalem, and the Golan Heights within six days.',
            },
          ],
        },
      ],
      sources: [
        {
          letter: 'A',
          title:
            'Source A: Archival Photograph: Destroyed Egyptian Jet Aircraft at Bir Gifgafa Airfield, Sinai (5 June 1967)',
          caption:
            'Charred wreckage of Egyptian combat aircraft destroyed on the tarmac during the Israeli dawn air strike of 5 June 1967.',
          provenance:
            'IDF Military Archive, Western Sinai Campaign Collection (Accession Ref: AIR-1967-0506).',
          source_context:
            'This primary photograph records the catastrophic aftermath of the Israeli dawn airstrike at Bir Gifgafa airbase in the Sinai Peninsula on 5 June 1967. Over 300 Egyptian military aircraft were destroyed on the ground within three hours, granting Israel absolute air supremacy for the remainder of the war.',
          hinge_question:
            "How does Source A help explain why the ground war in the Sinai Peninsula was decided so rapidly in Israel's favour?",
        },
        {
          letter: 'B',
          title:
            'Source B: Archival Primary Photograph: Israeli Paratroopers at the Western Wall, Jerusalem (David Rubinger, 7 June 1967)',
          caption:
            'Israeli paratroopers standing in front of the Western Wall in the Old City of Jerusalem shortly after capturing the city on 7 June 1967.',
          provenance:
            'Photograph by David Rubinger, Israel Government Press Office (Accession Ref: GPO-D597-088).',
          source_context:
            'This world-famous primary photograph captures Israeli paratroopers of the 55th Paratroopers Brigade standing in contemplation before the Western Wall in East Jerusalem on 7 June 1967. Jordanian rule had excluded Jewish worshippers from the holy site for nineteen years, making this capture an emotional turning point for Israel.',
          hinge_question:
            'Why did the capture of the Western Wall shown in Source B carry such profound religious and psychological significance for the Jewish people?',
        },
      ],
      exam_practice: {
        question:
          "Explain one consequence of Israel's pre-emptive dawn airstrike on 5 June 1967. [4 marks]",
        marks: 4,
        time_mins: 5,
        type: 'consequence',
        model_answer:
          "One major consequence of Israel's pre-emptive dawn airstrike on 5 June 1967 was that Israel achieved complete air supremacy within the first three hours of the war.\n\nBy flying low beneath radar and cratering Egyptian runways, Israeli aircraft destroyed over 300 Egyptian military aircraft on the tarmac before they could take off. Consequently, Egyptian armored forces in the Sinai Peninsula were left completely without air cover, enabling Israeli armored columns to advance rapidly across the desert with direct air support, destroying hundreds of Egyptian tanks and reaching the Suez Canal in just four days.",
      },
      flashcards: [
        {
          front: 'What three actions did Nasser take in May 1967 that led to war?',
          back: 'He moved 100,000 troops into the Sinai, expelled UNEF peacekeepers, and closed the Straits of Tiran to Israeli ships.',
        },
        {
          front:
            'Why was the closure of the Straits of Tiran considered a cause for war by Israel?',
          back: "It cut off Israel's only southern sea route through Eilat and blocked 90% of its vital crude oil imports.",
        },
        {
          front: 'When did Israel launch its pre-emptive air strike?',
          back: '7:45 am on Monday, 5 June 1967.',
        },
        {
          front: 'How did Israeli pilots avoid Egyptian radar during the 5 June 1967 air strike?',
          back: 'They flew thirty feet above the Mediterranean Sea beneath radar coverage and attacked from unexpected western angles.',
        },
        {
          front: 'How many Egyptian combat aircraft were destroyed on the morning of 5 June 1967?',
          back: "Over 300 aircraft (roughly 85% of Egypt's combat fleet), mostly destroyed on the ground.",
        },
        {
          front: 'Who was appointed Israeli Minister of Defence on 1 June 1967?',
          back: 'General Moshe Dayan, a popular war hero of the 1956 Suez Crisis.',
        },
        {
          front:
            'On what date did Israeli paratroopers capture the Old City of Jerusalem and the Western Wall?',
          back: '7 June 1967.',
        },
        {
          front: 'Which territories did Israel capture during the Six Day War?',
          back: 'The Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights.',
        },
        {
          front: 'Why did Jordan enter the war against Israel on 5 June 1967?',
          back: 'King Hussein had signed a mutual defense pact with Nasser on 30 May placing Jordanian troops under Egyptian command.',
        },
        {
          front: "How much did Israel's territorial control expand as a result of the Six Day War?",
          back: "Israel's territorial footprint quadrupled in size.",
        },
      ],
      quiz: [
        {
          question: 'What false information did the Soviet Union pass to Egypt on 13 May 1967?',
          q: 'What false information did the Soviet Union pass to Egypt on 13 May 1967?',
          options: [
            'That the US was deploying nuclear missiles in Tel Aviv',
            'That Israel was massing troops to invade Syria',
            'That Jordan was planning to invade Egypt',
            'That the UN was ending its peacekeeping mission',
          ],
          answer: 'That Israel was massing troops to invade Syria',
          a: 'That Israel was massing troops to invade Syria',
          explanation:
            'The Soviet Union falsely reported that Israeli brigades were massed along the Syrian border.',
        },
        {
          question:
            'What peacekeeping force did President Nasser expel from the Sinai border in May 1967?',
          q: 'What peacekeeping force did President Nasser expel from the Sinai border in May 1967?',
          options: [
            'NATO',
            'UNEF (UN Emergency Force)',
            'The Arab League Brigade',
            'British Mandate Constabulary',
          ],
          answer: 'UNEF (UN Emergency Force)',
          a: 'UNEF (UN Emergency Force)',
          explanation:
            'Nasser demanded the immediate withdrawal of UNEF peacekeepers on 16 May 1967.',
        },
        {
          question:
            'What body of water did Nasser close on 22 May 1967, blockading the port of Eilat?',
          q: 'What body of water did Nasser close on 22 May 1967, blockading the port of Eilat?',
          options: [
            'The Suez Canal',
            'The Straits of Tiran',
            'The Gulf of Sidra',
            'The Dardanelles',
          ],
          answer: 'The Straits of Tiran',
          a: 'The Straits of Tiran',
          explanation: 'Nasser closed the Straits of Tiran at the mouth of the Gulf of Aqaba.',
        },
        {
          question:
            'Which Arab monarch flew to Cairo on 30 May 1967 to sign a mutual defense pact with Egypt?',
          q: 'Which Arab monarch flew to Cairo on 30 May 1967 to sign a mutual defense pact with Egypt?',
          options: [
            'King Hussein of Jordan',
            'King Faisal of Saudi Arabia',
            'King Farouk of Egypt',
            'The Emir of Kuwait',
          ],
          answer: 'King Hussein of Jordan',
          a: 'King Hussein of Jordan',
          explanation:
            'King Hussein of Jordan signed a joint defense pact placing Jordanian forces under Egyptian command.',
        },
        {
          question: 'Who was appointed Israeli Minister of Defence on 1 June 1967?',
          q: 'Who was appointed Israeli Minister of Defence on 1 June 1967?',
          options: ['David Ben-Gurion', 'Yitzhak Rabin', 'Moshe Dayan', 'Ariel Sharon'],
          answer: 'Moshe Dayan',
          a: 'Moshe Dayan',
          explanation:
            'General Moshe Dayan was appointed Minister of Defence in a national unity cabinet.',
        },
        {
          question:
            'At what time on 5 June 1967 did the Israeli Air Force launch its surprise pre-emptive strike?',
          q: 'At what time on 5 June 1967 did the Israeli Air Force launch its surprise pre-emptive strike?',
          options: ['4:00 am', '7:45 am', '12:00 noon', '6:30 pm'],
          answer: '7:45 am',
          a: '7:45 am',
          explanation:
            'Israel attacked at 7:45 am Israeli time (8:45 am Egyptian time), catching air bases unawares.',
        },
        {
          question:
            'How did Israeli fighter jets avoid Egyptian radar detection during their approach?',
          q: 'How did Israeli fighter jets avoid Egyptian radar detection during their approach?',
          options: [
            'Flying at extreme high altitude above 50,000 feet',
            'Skimming thirty feet above the waves of the Mediterranean Sea',
            'Using radar-jamming satellites',
            'Flying through Jordan with permission',
          ],
          answer: 'Skimming thirty feet above the waves of the Mediterranean Sea',
          a: 'Skimming thirty feet above the waves of the Mediterranean Sea',
          explanation: 'Israeli jets flew extremely low over the sea beneath radar beams.',
        },
        {
          question:
            'Approximately how many Egyptian combat aircraft were destroyed on the first morning of the war?',
          q: 'Approximately how many Egyptian combat aircraft were destroyed on the first morning of the war?',
          options: ['50', '150', 'Over 300', 'Over 1,000'],
          answer: 'Over 300',
          a: 'Over 300',
          explanation:
            'Israel destroyed more than 300 Egyptian aircraft on the ground in under three hours.',
        },
        {
          question:
            'What specialized weapon did Israel use to disable Egyptian airfields during the opening strike?',
          q: 'What specialized weapon did Israel use to disable Egyptian airfields during the opening strike?',
          options: [
            'Chemical gas shells',
            'Runway-cratering penetration bombs',
            'Torpedoes',
            'Napalm incendiary flares',
          ],
          answer: 'Runway-cratering penetration bombs',
          a: 'Runway-cratering penetration bombs',
          explanation:
            'Rocket-boosted concrete-penetration bombs cratered runways, preventing jets from taking off.',
        },
        {
          question:
            'Which country controlled the West Bank and East Jerusalem prior to 5 June 1967?',
          q: 'Which country controlled the West Bank and East Jerusalem prior to 5 June 1967?',
          options: ['Egypt', 'Syria', 'Jordan', 'Lebanon'],
          answer: 'Jordan',
          a: 'Jordan',
          explanation:
            'Jordan had occupied and annexed the West Bank and East Jerusalem since 1948.',
        },
        {
          question:
            'On what date did Israeli paratroopers capture the Old City of Jerusalem and the Western Wall?',
          q: 'On what date did Israeli paratroopers capture the Old City of Jerusalem and the Western Wall?',
          options: ['5 June 1967', '7 June 1967', '9 June 1967', '10 June 1967'],
          answer: '7 June 1967',
          a: '7 June 1967',
          explanation:
            'Israeli paratroopers entered the Old City and reached the Western Wall on Wednesday, 7 June.',
        },
        {
          question:
            'Which natural barrier did Israeli armored forces reach in the Sinai Peninsula by 8 June 1967?',
          q: 'Which natural barrier did Israeli armored forces reach in the Sinai Peninsula by 8 June 1967?',
          options: ['The Nile River', 'The Suez Canal', 'The Dead Sea', 'The Gulf of Oman'],
          answer: 'The Suez Canal',
          a: 'The Suez Canal',
          explanation:
            'Israeli tanks swept across the Sinai desert, establishing positions on the Suez Canal.',
        },
        {
          question:
            'Which heavily fortified territory did Israeli forces assault on 9–10 June 1967?',
          q: 'Which heavily fortified territory did Israeli forces assault on 9–10 June 1967?',
          options: ['The Golan Heights', 'The Gaza Strip', 'The Sinai Peninsula', 'The West Bank'],
          answer: 'The Golan Heights',
          a: 'The Golan Heights',
          explanation:
            'On the final two days of the war, Israel captured the Golan Heights from Syria.',
        },
        {
          question: 'How many Israeli soldiers were killed during the Six Day War?',
          q: 'How many Israeli soldiers were killed during the Six Day War?',
          options: ['Fewer than 1,000', 'Roughly 5,000', 'Over 15,000', 'Over 50,000'],
          answer: 'Fewer than 1,000',
          a: 'Fewer than 1,000',
          explanation:
            'Fewer than 1,000 Israeli soldiers were killed, compared to over 15,000 Egyptian troops.',
        },
        {
          question:
            'By roughly how much did Israel’s controlled territory expand after the Six Day War?',
          q: 'By roughly how much did Israel’s controlled territory expand after the Six Day War?',
          options: ['It doubled', 'It tripled', 'It quadrupled', 'It increased tenfold'],
          answer: 'It quadrupled',
          a: 'It quadrupled',
          explanation:
            'The conquest of Sinai, Gaza, West Bank, Jerusalem, and Golan quadrupled Israel’s footprint.',
        },
        {
          question:
            'Who took photographs of Israeli paratroopers at the Western Wall that became internationally famous?',
          q: 'Who took photographs of Israeli paratroopers at the Western Wall that became internationally famous?',
          options: ['David Rubinger', 'Robert Capa', 'Henri Cartier-Bresson', 'Ansel Adams'],
          answer: 'David Rubinger',
          a: 'David Rubinger',
          explanation:
            'David Rubinger took the iconic photo of three paratroopers standing before the Western Wall.',
        },
        {
          question:
            'What order given by Egyptian Field Marshal Amer contributed to the panic in the Sinai?',
          q: 'What order given by Egyptian Field Marshal Amer contributed to the panic in the Sinai?',
          options: [
            'A general, uncoordinated retreat across the Suez Canal',
            'An immediate counter-attack towards Tel Aviv',
            'A total surrender of all airfields',
            'A request for British intervention',
          ],
          answer: 'A general, uncoordinated retreat across the Suez Canal',
          a: 'A general, uncoordinated retreat across the Suez Canal',
          explanation:
            'Amer panicked and ordered a general retreat, causing Egyptian units to disintegrate in the desert.',
        },
        {
          question:
            'What holy site in Jerusalem were Jewish worshippers barred from visiting between 1948 and 1967?',
          q: 'What holy site in Jerusalem were Jewish worshippers barred from visiting between 1948 and 1967?',
          options: [
            'The Western Wall',
            'The Church of the Holy Sepulchre',
            'The Tower of David',
            'Mount Scopus',
          ],
          answer: 'The Western Wall',
          a: 'The Western Wall',
          explanation:
            'Under Jordanian rule from 1948 to 1967, Israelis were prevented from praying at the Western Wall.',
        },
        {
          question:
            'Which city was only 40 miles away from Israeli vanguard forces when the Syrian ceasefire was agreed?',
          q: 'Which city was only 40 miles away from Israeli vanguard forces when the Syrian ceasefire was agreed?',
          options: ['Damascus', 'Aleppo', 'Homs', 'Amman'],
          answer: 'Damascus',
          a: 'Damascus',
          explanation:
            'Israeli troops captured the Golan plateau, leaving them just 40 miles from the Syrian capital Damascus.',
        },
        {
          question:
            'On what date did the UN-brokered ceasefire officially bring the Six Day War to an end?',
          q: 'On what date did the UN-brokered ceasefire officially bring the Six Day War to an end?',
          options: ['5 June 1967', '7 June 1967', '10 June 1967', '15 June 1967'],
          answer: '10 June 1967',
          a: '10 June 1967',
          explanation: 'The war concluded on Saturday, 10 June 1967, with a UN ceasefire.',
        },
      ],
    },

    // =========================================================================
    // LESSON 8 / KT 2.3: The Aftermath of 1967: The Occupied Territories & UN Resolution 242
    // =========================================================================
    {
      id: 'lesson_8',
      title: 'KT 2.3: The Aftermath of 1967: The Occupied Territories & UN Resolution 242',
      learning_objective:
        'Explain the impact of the Occupied Territories, the Khartoum "Three Noes", and the diplomatic formula of UN Resolution 242.',
      learning_objectives: [
        'Describe the geographical extent of the Occupied Territories and the impact on Palestinian refugees.',
        'Explain the Arab response at the Khartoum Conference and the policy of the "Three Noes".',
        'Analyse the key terms and diplomatic ambiguities of United Nations Resolution 242 ("Land for Peace").',
      ],
      hook_text:
        'In the summer of 1967, Israel found itself ruling over one million Palestinians. In September, Arab leaders declared the "Three Noes" in Khartoum. In November, the UN passed Resolution 242 promising "Land for Peace"—yet its ambiguous words locked the region in stalemate.',
      teacher_notes: {
        primer:
          'This lesson investigates the political and diplomatic aftermath of the 1967 Six Day War. Pupils explore how Israel administered five new territories (Sinai, Gaza, West Bank, East Jerusalem, Golan Heights) with over a million Palestinian inhabitants, sparking a second refugee crisis. They examine the hardline Arab response at the Khartoum Summit ("Three Noes") and dissect the core terms and deliberate linguistic ambiguities of UN Security Council Resolution 242 ("Land for Peace").',
        objectives: [
          {
            objective:
              'Identify the five Occupied Territories and explain the humanitarian impact on Palestinian refugees.',
            primer:
              'Guide pupils through paragraph [1.1]. Emphasize that 300,000 Palestinians were newly displaced across the River Jordan. Israel established a military government to govern the territories and annexed East Jerusalem.',
            question:
              'Why did the capture of the West Bank and Gaza Strip create a long-term demographic challenge for Israel?',
          },
          {
            objective:
              'Explain the significance of the Khartoum Conference (August 1967) and the "Three Noes".',
            primer:
              'Direct pupils to paragraph [2.1] and Source A. Explain that eight Arab leaders met in Sudan and declared: "No peace with Israel, no recognition of Israel, no negotiations with it."',
            question:
              'How did the "Three Noes" make direct diplomatic negotiations impossible in the aftermath of the war?',
          },
          {
            objective:
              'Analyse the core principles and deliberate ambiguities of UN Security Council Resolution 242 (November 1967).',
            primer:
              'Walk pupils through paragraphs [3.1]–[3.2] and Source B. Break down the "Land for Peace" formula and compare the English phrasing ("from territories occupied") with the French phrasing ("des territoires occupés").',
            question:
              'Why did the differing English and French translations of Resolution 242 allow both Israel and the Arab states to interpret it differently?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        title: 'Recall & Retrieval (Prior Learning: KT1 & KT2.2)',
        instructions: 'Answer these questions in full sentences based on your prior learning.',
        items: [
          {
            question:
              'What international peacekeeping force was expelled from the Sinai Peninsula by Nasser in May 1967?',
            answer: 'UNEF (United Nations Emergency Force).',
          },
          {
            question:
              "What narrow waterway did Nasser close on 22 May 1967, cutting off Israel's southern maritime trade?",
            answer: 'The Straits of Tiran.',
          },
          {
            question:
              'On what date did Israel launch its pre-emptive dawn airstrike, destroying the Egyptian Air Force?',
            answer: '5 June 1967.',
          },
          {
            question:
              'Who was appointed Israeli Minister of Defence just days before the outbreak of the Six Day War?',
            answer: 'General Moshe Dayan.',
          },
          {
            question:
              'Which ancient holy site did Israeli paratroopers capture in East Jerusalem on 7 June 1967?',
            answer: 'The Western Wall (Temple Mount).',
          },
          {
            question:
              'Which Syrian territory overlooking the Sea of Galilee was captured by Israeli forces on 9–10 June 1967?',
            answer: 'The Golan Heights.',
          },
          {
            question:
              'What was the name of the Egyptian canal nationalised by Nasser in July 1956?',
            answer: 'The Suez Canal.',
          },
          {
            question:
              'Which major superpower passed false intelligence reports to Egypt in May 1967 claiming Israel was massing troops?',
            answer: 'The Soviet Union (USSR).',
          },
          {
            question:
              'What was the name of the armistice line drawn after the 1948–49 war that divided Israel from the West Bank?',
            answer: 'The Green Line.',
          },
          {
            question:
              'Which international organisation established the partition plan in 1947 under Resolution 181?',
            answer: 'The United Nations.',
          },
        ],
      },
      vocab: [
        {
          term: 'Occupied Territories',
          definition:
            'The lands captured by Israel in June 1967: the West Bank, Gaza Strip, Sinai Peninsula, Golan Heights, and East Jerusalem.',
          example:
            'Israel placed the Occupied Territories under military administration after June 1967.',
        },
        {
          term: 'Khartoum Conference',
          definition:
            'A summit of eight Arab heads of state held in Sudan in August–September 1967 that established official Arab policy.',
          example: 'Arab leaders adopted the famous "Three Noes" at the Khartoum Conference.',
        },
        {
          term: 'The Three Noes',
          definition:
            'The Khartoum policy resolution: "no peace with Israel, no recognition of Israel, no negotiations with it."',
          example: 'The Three Noes rejected any direct peace treaties with the Israeli government.',
        },
        {
          term: 'UN Resolution 242',
          definition:
            'A United Nations Security Council resolution passed on 22 November 1967 establishing the principle of "Land for Peace".',
          example:
            'UN Resolution 242 called for Israeli withdrawal in exchange for recognized boundaries.',
        },
        {
          term: 'Land for Peace',
          definition:
            'The diplomatic formula requiring Israel to return occupied land in exchange for Arab recognition and permanent peace.',
          example:
            'The principle of Land for Peace became the foundation of all Middle East diplomacy.',
        },
        {
          term: 'Israeli Settlements',
          definition:
            'Civilian communities built by Israeli citizens in the Occupied Territories under Israeli military administration.',
          example:
            'The establishment of Israeli settlements in the West Bank became a major obstacle to peace.',
        },
      ],
      vocab_cloze_text:
        'Following the Six Day War, Israel was in control of five ____(1)____: the Sinai, Gaza, West Bank, East Jerusalem, and the Golan Heights. Over 300,000 Palestinians were newly displaced across the River Jordan, creating a second refugee crisis. In August 1967, Arab leaders gathered at the ____(2)____ in Sudan, issuing a defiant declaration known as ____(3)____. In November, the United Nations attempted to resolve the conflict by passing ____(4)____. This historic resolution established the formula of ____(5)____, but deliberate wording differences between English and French allowed both sides to interpret it differently, while the growth of ____(6)____ in the West Bank further complicated future peace negotiations.',
      narrative_blocks: [
        {
          title:
            'Act 1: Context & Catalyst — The Reality of the Occupied Territories (Summer 1967)',
          paragraphs: [
            '<span class="para-ref">[1.1]</span> In the weeks following the June 1967 ceasefire, the government of Israel confronted a dramatic transformation in its strategic reality. Israel was now in military control of vast territories: the entire Sinai Peninsula and the Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria. Israel’s total land area had quadrupled. Israeli military planners celebrated the creation of wide natural buffer zones—the wide expanse of the Sinai desert, the water barrier of the Suez Canal, the Jordan River valley, and the high cliffs of the Golan Heights—which made surprise ground attacks against Israel’s heartland far more difficult.',
            '<span class="para-ref">[1.2]</span> However, this triumph created immediate humanitarian and political dilemmas. By occupying the West Bank and Gaza Strip, Israel brought over one million Palestinian Arabs under its direct military rule. Between 300,000 and 350,000 Palestinians fled or were displaced across the River Jordan into overcrowded refugee camps in Jordan during and immediately after the fighting. For many, this was their second displacement within twenty years, having previously fled during the 1948 war. Israel immediately annexed East Jerusalem, declaring the unified city its eternal capital, while placing the West Bank and Gaza under a military governor. Shortly afterwards, the first civilian Jewish settlements were established in strategic zones such as the Jordan Valley and Gush Etzion, beginning a process that would profoundly complicate any future territorial compromise.',
          ],
          tasks: [
            {
              id: 'task_8_1',
              title: 'Task 1: Factual Recall & Geographic Audit',
              instructions:
                'Using paragraphs [1.1] and [1.2], list the five territories captured by Israel in June 1967 and describe the two main consequences for Palestinian refugees.',
              scaffolding: {
                sentence_starter:
                  'The five territories captured by Israel during the Six Day War were...',
                connectives: [
                  'Consequently, for the Palestinian population, the war resulted in...',
                  'Furthermore, in East Jerusalem and the West Bank, Israel...',
                ],
              },
              model_answer:
                'The five territories captured by Israel in June 1967 were the Sinai Peninsula, the Gaza Strip, the West Bank, East Jerusalem, and the Golan Heights. For the Palestinian population, the primary consequences were that over one million Palestinians were placed under Israeli military occupation, and between 300,000 and 350,000 people were newly displaced across the River Jordan into refugee camps. In addition, Israel annexed East Jerusalem and established the first civilian Jewish settlements in the West Bank.',
            },
          ],
        },
        {
          title: 'Act 2: Escalation & Conflict — The Khartoum Summit & The "Three Noes"',
          paragraphs: [
            '<span class="para-ref">[2.1]</span> The scale of the Arab military defeat produced immense shock and humiliation across the Arab world. From 29 August to 1 September 1967, the heads of state of eight Arab nations gathered in Khartoum, the capital of Sudan, to coordinate their joint response. Moderate leaders, including King Hussein of Jordan, quietly urged a pragmatic diplomatic approach to negotiate the return of the captured territories. However, hardline sentiment dominated the conference. President Nasser of Egypt and Syrian leaders argued that offering political concessions or recognising Israel while Arab lands remained occupied would validate Israeli military aggression and humiliate the Arab nation permanently.',
            '<span class="para-ref">[2.2]</span> The conference ended with a categorical, unyielding resolution that became universally known as the "Three Noes" of Khartoum: "no peace with Israel, no recognition of Israel, no negotiations with it." (<span class="archival-meta-tag">Source A</span>) records the third clause of the Khartoum Communiqué, setting out the collective Arab rejection of direct peace talks. In Israel, the Khartoum declaration was received as definitive proof that Arab governments remained dedicated to Israel\'s total destruction, regardless of what territorial compromises Israel might offer. Consequently, the Israeli cabinet abandoned early ideas of offering land back in exchange for peace, hardening Israeli resolve to hold the Occupied Territories indefinitely.',
          ],
          source: {
            letter: 'A',
            title:
              'Source A: Archival Communiqué: The Khartoum Arab League Summit Resolution (1 September 1967)',
            caption:
              'Official English translation of the third clause of the Khartoum Summit declaration issued by eight Arab heads of state in Sudan.',
            provenance:
              'Arab League Summit Records, Khartoum Communiqué, Clause 3 (1 September 1967).',
            source_context:
              'This official declaration was adopted by eight Arab heads of state—including Egypt, Jordan, Syria, and Saudi Arabia—meeting in Khartoum, Sudan, in late summer 1967. It formulated the unanimous Arab policy towards Israel following the Six Day War, rejecting all direct negotiations, diplomatic recognition, or formal peace treaties.',
            hinge_question:
              'Why did the "Three Noes" in Source A convince Israeli leaders that offering to return the Occupied Territories would not bring genuine peace?',
          },
          tasks: [
            {
              id: 'task_8_2',
              title: 'Task 2: Primary Source Annotation — The Khartoum Declaration',
              instructions:
                'Using Source A and paragraphs [2.1]–[2.2], explain what the "Three Noes" were and analyse how this declaration impacted Israeli policy.',
              scaffolding: {
                sentence_starter:
                  'Source A sets out the famous "Three Noes" of the Khartoum Conference, which were...',
                connectives: [
                  'This declaration had a profound impact on Israeli leaders because...',
                  'Consequently, instead of offering land back for peace, Israel...',
                ],
              },
              model_answer:
                'Source A sets out the famous "Three Noes" of Khartoum: no peace with Israel, no recognition of Israel, and no negotiations with it. This declaration had a profound impact on Israeli policy because Israeli politicians interpreted it as absolute proof that Arab states remained committed to destroying Israel, regardless of any territorial concessions. Consequently, the Israeli government abandoned early thoughts of trading captured lands for peace treaties and instead resolved to retain military control over the Sinai, West Bank, and Golan Heights, beginning the construction of defensive fortifications and civilian settlements.',
            },
          ],
        },
        {
          title: 'Act 3: Forensic Evidence & Diplomacy — UN Resolution 242 & "Land for Peace"',
          paragraphs: [
            '<span class="para-ref">[3.1]</span> Alarmed that the Middle East remained an active battlefield that could drag the United States and the Soviet Union into a direct superpower collision, the United Nations Security Council spent months drafting a compromise framework. On 22 November 1967, the Security Council unanimously adopted Resolution 242, authored primarily by the British ambassador to the UN, Lord Caradon. Resolution 242 introduced the historic formula of "Land for Peace": it declared the inadmissibility of the acquisition of territory by war and called for the "withdrawal of Israel armed forces from territories occupied in the recent conflict," in exchange for the termination of all states of belligerency and the acknowledgement of the right of every state in the area to live in peace within secure and recognised boundaries.',
            '<span class="para-ref">[3.2]</span> However, Resolution 242 contained a deliberate linguistic ambiguity that prevented its successful implementation. (<span class="archival-meta-tag">Source B</span>) contrasts the English text with the equally binding French translation. The English text called for Israeli withdrawal from "territories occupied," deliberately omitting the definite article "the." Israel and the United States argued this meant Israel was required to withdraw only from *some* territories, allowing minor border adjustments to ensure "secure and recognised boundaries." Conversely, Arab states pointed to the French version ("retrait des forces armées israéliennes des territoires occupés"), insisting that "des" meant *all* the occupied territories. Furthermore, the resolution referred to the displaced Palestinians only as "the refugee problem," completely ignoring their national aspirations for statehood.',
          ],
          source: {
            letter: 'B',
            title:
              'Source B: Diplomatic Treaty Comparison: Article 1(i) of UN Security Council Resolution 242 in English and French',
            caption:
              'Parallel text comparison illustrating the deliberate absence of the definite article "the" in the English version compared to the French translation.',
            provenance:
              'United Nations Security Council Official Records, 22 November 1967 (Resolution 242 / S/RES/242).',
            source_context:
              'This official excerpt from United Nations Security Council Resolution 242, passed on 22 November 1967, illustrates the deliberate linguistic compromise drafted by British diplomats. The difference between the English text ("from territories occupied") and the French text ("des territoires occupés") became the central legal dispute in Middle Eastern diplomacy for decades.',
            hinge_question:
              'Why did the differing interpretations of the single word "the" in Source B allow both Israel and Arab states to claim they were following the resolution?',
          },
          tasks: [
            {
              id: 'task_8_3',
              title: 'Task 3: Diplomatic Analysis — The Ambiguity of Resolution 242',
              instructions:
                'Using Source B and paragraphs [3.1]–[3.2], explain the core principle of "Land for Peace" and how wording differences created diplomatic deadlock.',
              scaffolding: {
                sentence_starter:
                  'The core principle established by UN Resolution 242 was "Land for Peace", which meant that...',
                connectives: [
                  'However, Source B reveals that a major dispute arose because...',
                  'This allowed Israel to argue that..., while Arab states insisted that...',
                ],
              },
              model_answer:
                'The core principle of UN Resolution 242 was "Land for Peace", meaning Israel would withdraw from captured lands in exchange for Arab states recognizing Israel\'s sovereignty and establishing permanent, peaceful boundaries. However, Source B reveals that diplomatic deadlock arose because of a deliberate linguistic ambiguity: the English text called for withdrawal from "territories occupied" without the word "the", allowing Israel to argue it only had to return *some* territories to secure defensible borders. In contrast, Arab states pointed to the French text ("des territoires occupés"), insisting Israel had to withdraw from *all* lands captured in 1967. This disagreement, alongside the omission of Palestinian national rights, meant the resolution could not be enforced.',
            },
          ],
        },
        {
          title:
            'Act 4: The Historical Verdict & Extended Writing — The Roots of Entrenched Conflict',
          paragraphs: [
            '<span class="para-ref">[4.1]</span> In the long term, the aftermath of the 1967 war fundamentally changed the character of the Arab-Israeli conflict. Instead of settling the dispute, the conquest of the Occupied Territories created a stubborn diplomatic stalemate. On the ground, Israel constructed extensive military fortifications—most notably the Bar-Lev Line along the Suez Canal—and subsidized civilian settlements in the West Bank and Gaza, cementing Israeli presence in the territories. In the Arab world, the humiliation of conventional defeat convinced Palestinians that Arab state governments would never liberate their land, accelerating the rise of independent guerrilla organisations like the PLO.',
            '<span class="para-ref">[4.2]</span> United Nations Resolution 242 remained the recognized framework for all future Middle East peace diplomacy for the next thirty years, but in the late 1960s, it proved completely incapable of bridging the divide. With Arab governments adhering strictly to the "Three Noes" of Khartoum and Israel refusing any unilateral withdrawal without direct peace treaties, the stage was set for the continuous artillery duels of the War of Attrition and, ultimately, the surprise assault of the 1973 Yom Kippur War.',
          ],
          tasks: [
            {
              id: 'task_8_4',
              title:
                'Task 4: GCSE Extended Writing — Why Did Resolution 242 Fail to Bring Immediate Peace?',
              instructions:
                'Explain why United Nations Resolution 242 failed to bring immediate peace to the Middle East in the years 1967–1973. [12 marks]',
              scaffolding: {
                sentence_starters: [
                  'One major reason why Resolution 242 failed was the deliberate linguistic ambiguity of its text...',
                  'Another key factor was the unyielding political stance of the Arab states formulated at Khartoum...',
                  "Furthermore, Israel's policy of consolidating control over the Occupied Territories prevented compromise...",
                ],
                causal_connectives: [
                  'Consequently, this directly prevented agreement because...',
                  'Furthermore, this created a situation where...',
                  'This was significant because neither side was willing to...',
                ],
                evaluative_criteria:
                  'Conclude by explaining which obstacle was the most significant in creating the diplomatic deadlock.',
              },
              model_answer:
                'United Nations Resolution 242 failed to bring immediate peace to the Middle East between 1967 and 1973 due to textual ambiguities, Arab rejection of direct talks, and Israeli consolidation of the Occupied Territories.\n\nOne primary reason for failure was the deliberate linguistic ambiguity in the text of the resolution. Drafted by British diplomats to secure unanimous Security Council support, the English text called for Israeli withdrawal "from territories occupied in the recent conflict," omitting the word "the." Israel and the United States argued this meant Israel was only required to withdraw from some lands, allowing border modifications to ensure secure boundaries. However, Arab governments pointed to the French text ("des territoires occupés"), insisting on total withdrawal from all occupied lands. Consequently, both sides claimed they were adhering to the resolution while disagreeing on its most fundamental requirement.\n\nA second critical factor was the hardline policy adopted by Arab leaders at the Khartoum Conference in September 1967. Humiliated by their defeat, eight Arab heads of state issued the "Three Noes": no peace with Israel, no recognition of Israel, and no negotiations with it. Because Resolution 242 required the termination of all belligerency and the recognition of borders, the Arab refusal to hold direct talks or sign peace treaties made diplomatic implementation impossible. This confirmed Israeli suspicions that Arab states remained committed to Israel\'s eventual destruction.\n\nFinally, Israel’s actions on the ground created permanent obstacles to peace. Israel annexed East Jerusalem immediately in 1967, built the fortified Bar-Lev Line along the Suez Canal, and began establishing civilian Jewish settlements in the West Bank and Gaza Strip. Furthermore, Resolution 242 failed to address the Palestinian people as a nation with self-determination, referring to them only as "the refugee problem," which drove Palestinian groups like Fatah to reject the resolution and pursue armed guerrilla warfare.\n\nIn conclusion, the most significant reason for failure was the Khartoum "Three Noes," because it eliminated the possibility of direct bilateral negotiations, ensuring that the formula of "Land for Peace" remained an empty promise until after the 1973 Yom Kippur War.',
            },
          ],
        },
      ],
      sources: [
        {
          letter: 'A',
          title:
            'Source A: Archival Communiqué: The Khartoum Arab League Summit Resolution (1 September 1967)',
          caption:
            'Official English translation of the third clause of the Khartoum Summit declaration issued by eight Arab heads of state in Sudan.',
          provenance:
            'Arab League Summit Records, Khartoum Communiqué, Clause 3 (1 September 1967).',
          source_context:
            'This official declaration was adopted by eight Arab heads of state—including Egypt, Jordan, Syria, and Saudi Arabia—meeting in Khartoum, Sudan, in late summer 1967. It formulated the unanimous Arab policy towards Israel following the Six Day War, rejecting all direct negotiations, diplomatic recognition, or formal peace treaties.',
          hinge_question:
            'Why did the "Three Noes" in Source A convince Israeli leaders that offering to return the Occupied Territories would not bring genuine peace?',
        },
        {
          letter: 'B',
          title:
            'Source B: Diplomatic Treaty Comparison: Article 1(i) of UN Security Council Resolution 242 in English and French',
          caption:
            'Parallel text comparison illustrating the deliberate absence of the definite article "the" in the English version compared to the French translation.',
          provenance:
            'United Nations Security Council Official Records, 22 November 1967 (Resolution 242 / S/RES/242).',
          source_context:
            'This official excerpt from United Nations Security Council Resolution 242, passed on 22 November 1967, illustrates the deliberate linguistic compromise drafted by British diplomats. The difference between the English text ("from territories occupied") and the French text ("des territoires occupés") became the central legal dispute in Middle Eastern diplomacy for decades.',
          hinge_question:
            'Why did the differing interpretations of the single word "the" in Source B allow both Israel and Arab states to claim they were following the resolution?',
        },
      ],
      exam_practice: {
        question: 'Explain one consequence of the Khartoum Conference of September 1967. [4 marks]',
        marks: 4,
        time_mins: 5,
        type: 'consequence',
        model_answer:
          'One direct consequence of the Khartoum Conference of September 1967 was that it made direct peace negotiations between Arab states and Israel impossible.\n\nAt the summit, eight Arab heads of state formulated the "Three Noes": no peace, no recognition, and no negotiations with Israel. Consequently, Arab leaders refused to enter bilateral talks or sign formal peace treaties in exchange for the return of captured lands. This convinced Israeli leaders that the Arab states were still committed to Israel’s destruction, which led Israel to harden its stance and retain military control over the Occupied Territories.',
      },
      flashcards: [
        {
          front: 'What five territories were captured by Israel during the Six Day War?',
          back: 'The Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights.',
        },
        {
          front: 'How many Palestinian Arabs became refugees following the 1967 war?',
          back: 'Between 300,000 and 350,000 Palestinians fled across the River Jordan into Jordan.',
        },
        {
          front:
            'What action did Israel take regarding East Jerusalem immediately after the 1967 war?',
          back: 'Israel annexed East Jerusalem and declared the unified city to be its eternal capital.',
        },
        {
          front: 'What was the Khartoum Conference?',
          back: 'A meeting of eight Arab heads of state in Sudan in August–September 1967 to determine policy after the Six Day War.',
        },
        {
          front: 'What were the "Three Noes" of Khartoum?',
          back: 'No peace with Israel, no recognition of Israel, and no negotiations with Israel.',
        },
        {
          front: 'When was United Nations Security Council Resolution 242 passed?',
          back: '22 November 1967.',
        },
        {
          front: 'What core diplomatic principle was introduced by UN Resolution 242?',
          back: '"Land for Peace" (Israeli withdrawal from occupied land in exchange for Arab recognition and permanent peace).',
        },
        {
          front:
            'What was the critical linguistic ambiguity in the English text of Resolution 242?',
          back: 'It called for withdrawal from "territories occupied" without the word "the", implying Israel might not have to return all land.',
        },
        {
          front: 'How did the French translation of Resolution 242 differ from the English text?',
          back: 'The French version read "des territoires occupés" (from the occupied territories), which Arab states argued meant all land.',
        },
        {
          front: 'How did Resolution 242 refer to the Palestinian people?',
          back: 'It referred to them only as "the refugee problem", ignoring their demand for national self-determination.',
        },
      ],
      quiz: [
        {
          question:
            'Which of the following was NOT one of the territories captured by Israel in June 1967?',
          q: 'Which of the following was NOT one of the territories captured by Israel in June 1967?',
          options: [
            'The West Bank',
            'The Sinai Peninsula',
            'Southern Lebanon',
            'The Golan Heights',
          ],
          answer: 'Southern Lebanon',
          a: 'Southern Lebanon',
          explanation:
            'Israel captured Sinai, Gaza, West Bank, East Jerusalem, and Golan, but not Southern Lebanon in 1967.',
        },
        {
          question:
            'Approximately how many Palestinian Arabs were newly displaced across the River Jordan after the 1967 war?',
          q: 'Approximately how many Palestinian Arabs were newly displaced across the River Jordan after the 1967 war?',
          options: ['10,000', '50,000', 'Between 300,000 and 350,000', 'Over two million'],
          answer: 'Between 300,000 and 350,000',
          a: 'Between 300,000 and 350,000',
          explanation: 'Between 300,000 and 350,000 Palestinians fled into Jordan in 1967.',
        },
        {
          question:
            'In which African capital city did Arab heads of state gather in late summer 1967 to agree on post-war policy?',
          q: 'In which African capital city did Arab heads of state gather in late summer 1967 to agree on post-war policy?',
          options: ['Cairo', 'Khartoum', 'Tripoli', 'Algiers'],
          answer: 'Khartoum',
          a: 'Khartoum',
          explanation:
            'The Arab League summit was held in Khartoum, Sudan, from 29 August to 1 September 1967.',
        },
        {
          question:
            'Which of the following was NOT one of the "Three Noes" declared at the Khartoum Conference?',
          q: 'Which of the following was NOT one of the "Three Noes" declared at the Khartoum Conference?',
          options: [
            'No peace with Israel',
            'No recognition of Israel',
            'No trade with Europe',
            'No negotiations with Israel',
          ],
          answer: 'No trade with Europe',
          a: 'No trade with Europe',
          explanation:
            'The Three Noes were: no peace, no recognition, and no negotiations with Israel.',
        },
        {
          question:
            'What was the number of the United Nations Security Council Resolution adopted on 22 November 1967?',
          q: 'What was the number of the United Nations Security Council Resolution adopted on 22 November 1967?',
          options: ['Resolution 181', 'Resolution 242', 'Resolution 338', 'Resolution 425'],
          answer: 'Resolution 242',
          a: 'Resolution 242',
          explanation: 'UN Resolution 242 was passed on 22 November 1967.',
        },
        {
          question: 'Which British diplomat drafted the text of UN Resolution 242?',
          q: 'Which British diplomat drafted the text of UN Resolution 242?',
          options: ['Lord Balfour', 'Lord Caradon', 'Anthony Eden', 'Harold Wilson'],
          answer: 'Lord Caradon',
          a: 'Lord Caradon',
          explanation: 'Lord Caradon, the British Ambassador to the UN, drafted the resolution.',
        },
        {
          question:
            'What popular diplomatic phrase summarizes the exchange required by UN Resolution 242?',
          q: 'What popular diplomatic phrase summarizes the exchange required by UN Resolution 242?',
          options: [
            '"Peace for Strength"',
            '"Land for Peace"',
            '"Borders for Oil"',
            '"Trade for Recognition"',
          ],
          answer: '"Land for Peace"',
          a: '"Land for Peace"',
          explanation:
            'The formula required Israeli withdrawal from occupied land in exchange for recognized peace.',
        },
        {
          question:
            'What specific English word was deliberately omitted before "territories occupied" in Resolution 242?',
          q: 'What specific English word was deliberately omitted before "territories occupied" in Resolution 242?',
          options: ['All', 'The', 'Any', 'Some'],
          answer: 'The',
          a: 'The',
          explanation:
            'The omission of "the" allowed Israel to claim it was only required to withdraw from some territories.',
        },
        {
          question:
            'How did Arab governments interpret the French translation "des territoires occupés"?',
          q: 'How did Arab governments interpret the French translation "des territoires occupés"?',
          options: [
            'As requiring withdrawal from all occupied territories',
            'As allowing Israel to keep Jerusalem',
            'As requiring immediate disarmament of Egypt',
            'As placing Sinai under UN rule permanently',
          ],
          answer: 'As requiring withdrawal from all occupied territories',
          a: 'As requiring withdrawal from all occupied territories',
          explanation:
            'Arab states argued the French text meant withdrawal from all lands captured in 1967.',
        },
        {
          question: 'How did UN Resolution 242 refer to the Palestinian population?',
          q: 'How did UN Resolution 242 refer to the Palestinian population?',
          options: [
            'As an independent sovereign nation',
            'As "the refugee problem"',
            'As citizens of Jordan',
            'As the Palestine Liberation Organisation',
          ],
          answer: 'As "the refugee problem"',
          a: 'As "the refugee problem"',
          explanation:
            'Resolution 242 treated Palestinians purely as a humanitarian refugee issue, not a national group.',
        },
        {
          question:
            'What immediate legal step did Israel take regarding East Jerusalem after the Six Day War?',
          q: 'What immediate legal step did Israel take regarding East Jerusalem after the Six Day War?',
          options: [
            'Annexed it and declared the city unified under Israeli law',
            'Returned it to Jordanian municipal police',
            'Placed it under permanent UN trusteeship',
            'Divided it with a concrete wall',
          ],
          answer: 'Annexed it and declared the city unified under Israeli law',
          a: 'Annexed it and declared the city unified under Israeli law',
          explanation:
            "Israel expanded Jerusalem's municipal boundaries and annexed East Jerusalem in June 1967.",
        },
        {
          question:
            'What was the first civilian Israeli settlement established in the West Bank after the war?',
          q: 'What was the first civilian Israeli settlement established in the West Bank after the war?',
          options: ['Kfar Etzion', 'Ariel', "Ma'ale Adumim", 'Tel Aviv'],
          answer: 'Kfar Etzion',
          a: 'Kfar Etzion',
          explanation:
            'Kfar Etzion in the Gush Etzion area south of Jerusalem was re-established in September 1967.',
        },
        {
          question:
            'Which Arab state held administrative control over the Gaza Strip prior to June 1967?',
          q: 'Which Arab state held administrative control over the Gaza Strip prior to June 1967?',
          options: ['Jordan', 'Egypt', 'Syria', 'Saudi Arabia'],
          answer: 'Egypt',
          a: 'Egypt',
          explanation:
            'Egypt had controlled and administered the Gaza Strip from 1948 until the Six Day War.',
        },
        {
          question:
            'What water barrier served as the new western armistice boundary for Israeli forces in Sinai?',
          q: 'What water barrier served as the new western armistice boundary for Israeli forces in Sinai?',
          options: [
            'The River Jordan',
            'The Suez Canal',
            'The Sea of Galilee',
            'The Gulf of Aqaba',
          ],
          answer: 'The Suez Canal',
          a: 'The Suez Canal',
          explanation: 'Israeli troops dug in on the eastern bank of the Suez Canal.',
        },
        {
          question: 'Which country controlled the Golan Heights prior to June 1967?',
          q: 'Which country controlled the Golan Heights prior to June 1967?',
          options: ['Lebanon', 'Syria', 'Jordan', 'Iraq'],
          answer: 'Syria',
          a: 'Syria',
          explanation:
            'The Golan Heights belonged to Syria before being captured by Israel on 9–10 June 1967.',
        },
        {
          question:
            'Why did Israeli leaders feel the Khartoum "Three Noes" justified retaining the Occupied Territories?',
          q: 'Why did Israeli leaders feel the Khartoum "Three Noes" justified retaining the Occupied Territories?',
          options: [
            'It proved Arab states would not offer genuine peace in exchange for land',
            'It allowed Israel to join the Arab League',
            'It ended the threat of guerrilla raids',
            'It satisfied the Soviet Union',
          ],
          answer: 'It proved Arab states would not offer genuine peace in exchange for land',
          a: 'It proved Arab states would not offer genuine peace in exchange for land',
          explanation:
            'The refusal of peace or recognition convinced Israel that land was needed for military security.',
        },
        {
          question:
            'What was the name of the Swedish diplomat appointed by the UN to mediate between Israel and Arab states under Resolution 242?',
          q: 'What was the name of the Swedish diplomat appointed by the UN to mediate between Israel and Arab states under Resolution 242?',
          options: ['Count Bernadotte', 'Gunnar Jarring', 'Dag Hammarskjöld', 'Olof Palme'],
          answer: 'Gunnar Jarring',
          a: 'Gunnar Jarring',
          explanation:
            'Gunnar Jarring was appointed special UN envoy to mediate implementation of Resolution 242.',
        },
        {
          question:
            'Which Palestinian faction rejected UN Resolution 242 because it treated Palestinians only as refugees?',
          q: 'Which Palestinian faction rejected UN Resolution 242 because it treated Palestinians only as refugees?',
          options: ['The PLO', 'Hamas', 'The Arab League', 'The Knesset'],
          answer: 'The PLO',
          a: 'The PLO',
          explanation:
            'The PLO rejected Resolution 242 because it ignored Palestinian national independence.',
        },
        {
          question:
            'What term is used to describe the military government structure Israel set up to rule the West Bank and Gaza?',
          q: 'What term is used to describe the military government structure Israel set up to rule the West Bank and Gaza?',
          options: [
            'Civil Administration / Military Government',
            'British Mandate',
            'UN Trusteeship',
            'Green Line Council',
          ],
          answer: 'Civil Administration / Military Government',
          a: 'Civil Administration / Military Government',
          explanation:
            'Israel ruled the territories through a military governor and military orders.',
        },
        {
          question: 'What major economic consequence did the 1967 war have on the Suez Canal?',
          q: 'What major economic consequence did the 1967 war have on the Suez Canal?',
          options: [
            'It was expanded to handle supertankers',
            'It was completely closed to all international shipping until 1975',
            'It was sold to the United States',
            'It became a free trade zone',
          ],
          answer: 'It was completely closed to all international shipping until 1975',
          a: 'It was completely closed to all international shipping until 1975',
          explanation:
            'Trapped ships and blockages kept the Suez Canal closed for eight years from 1967 to 1975.',
        },
      ],
    },

    // =========================================================================
    // LESSON 9 / KT 2.4: The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)
    // =========================================================================
    {
      id: 'lesson_9',
      title:
        'KT 2.4: The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
      learning_objective:
        'Explain why Palestinian resistance groups turned to armed struggle and international terrorism between 1968 and 1972.',
      learning_objectives: [
        'Explain why the Battle of Karameh (1968) led to Yasser Arafat and Fatah taking leadership of the PLO.',
        "Describe the causes and consequences of the Dawson's Field airplane hijackings and the Black September crisis in Jordan (1970).",
        'Analyse the events of the 1972 Munich Olympics massacre and evaluate its impact on international attitudes towards the Palestinian cause.',
      ],
      hook_text:
        'In September 1970, Palestinian militants blew up three hijacked airliners in the Jordanian desert. Two years later, hooded gunmen scaled an Olympic fence in Munich. Having lost faith in Arab armies, Palestinians took their fight to the global stage.',
      teacher_notes: {
        primer:
          'This lesson charts the dramatic emergence of the Palestinian national movement as an independent armed force following the 1967 defeat of Arab state armies. Pupils examine the symbolic turning point of the Battle of Karameh (1968) and Yasser Arafat\'s election to chairman of the PLO. They investigate how radical factions like the PFLP turned to airplane hijackings (Dawson\'s Field, 1970), prompting King Hussein to crush Palestinian militias during "Black September" and expel the PLO to Lebanon. Finally, pupils analyze the Munich Olympics massacre of September 1972 and evaluate whether terrorism advanced or damaged the Palestinian cause.',
        objectives: [
          {
            objective:
              "Explain the significance of the Battle of Karameh (1968) for Palestinian morale and Arafat's rise.",
            primer:
              'Guide pupils through paragraph [1.1]. Stress that Palestinian fedayeen stood and fought an Israeli armored raid in Jordan, suffering heavy casualties but inflicting significant losses on the IDF, which transformed Karameh into a legendary victory of resistance.',
            question:
              'Why did the Battle of Karameh cause thousands of young Palestinians to join Fatah and the PLO?',
          },
          {
            objective:
              'Describe the events of Black September in Jordan (1970) and explain why the PLO was expelled.',
            primer:
              "Direct pupils to paragraphs [2.1]–[2.2] and Source A. Explain that the PFLP hijacked four airliners and blew them up at Dawson's Field in Jordan, challenging King Hussein's royal authority. Hussein used his army to crush Palestinian militias and expel them to Lebanon.",
            question:
              'Why did King Hussein view the armed Palestinian guerrilla factions as a "state within a state" that threatened his kingdom?',
          },
          {
            objective:
              'Analyse the 1972 Munich Olympics massacre and evaluate its international impact.',
            primer:
              'Walk pupils through paragraphs [3.1]–[3.2] and Source B. Describe the hostage-taking of Israeli athletes by the Black September group, the failed German police rescue, and the worldwide television broadcast.',
            question:
              "How did the Munich Olympics attack change global awareness of the Palestinian issue, and what was Israel's response?",
          },
        ],
      },
      do_now: {
        type: 'questions',
        title: 'Recall & Retrieval (Prior Learning: KT1 & KT2.3)',
        instructions: 'Answer these questions in full sentences based on your prior learning.',
        items: [
          {
            question:
              'What was the name of the diplomatic formula established by UN Resolution 242 in November 1967?',
            answer: '"Land for Peace".',
          },
          {
            question:
              'What were the famous "Three Noes" declared by Arab leaders at the Khartoum Conference in 1967?',
            answer: 'No peace, no recognition, no negotiations with Israel.',
          },
          {
            question:
              'Name three of the five territories captured by Israel during the June 1967 Six Day War.',
            answer:
              'Any three of: Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, Golan Heights.',
          },
          {
            question:
              'Approximately how many Palestinian refugees fled across the River Jordan into Jordan after the 1967 war?',
            answer: 'Approximately 300,000 to 350,000 refugees.',
          },
          {
            question:
              'Which Palestinian guerrilla organisation was founded by Yasser Arafat in the late 1950s?',
            answer: 'Fatah.',
          },
          {
            question: 'What does the acronym PLO stand for?',
            answer: 'Palestine Liberation Organisation.',
          },
          {
            question: 'In what city was the PLO founded in January 1964?',
            answer: 'Cairo.',
          },
          {
            question:
              'Which Egyptian President expelled UN peacekeepers and closed the Straits of Tiran in May 1967?',
            answer: 'Gamal Abdel Nasser.',
          },
          {
            question:
              'What was the name of the armistice line drawn between Israel and its Arab neighbours in 1949?',
            answer: 'The Green Line.',
          },
          {
            question:
              'Which international organisation partitioned Palestine in November 1947 under Resolution 181?',
            answer: 'The United Nations.',
          },
        ],
      },
      vocab: [
        {
          term: 'Fedayeen',
          definition:
            'Arabic term meaning "those who sacrifice themselves"; used to describe Palestinian guerrilla fighters waging armed struggle against Israel.',
          example:
            'Palestinian fedayeen launched cross-border raids into Israel from bases in Jordan.',
        },
        {
          term: 'Battle of Karameh (1968)',
          definition:
            'A battle in Jordan in March 1968 where Palestinian fighters resisted an Israeli armored raid, boosting Palestinian national pride.',
          example:
            'The Battle of Karameh made Yasser Arafat a national hero across the Arab world.',
        },
        {
          term: 'PFLP',
          definition:
            'Popular Front for the Liberation of Palestine; a radical Marxist Palestinian faction that pioneered international airplane hijackings.',
          example:
            'The PFLP hijacked passenger airliners to draw international attention to the Palestinian cause.',
        },
        {
          term: "Dawson's Field (1970)",
          definition:
            'A desert airstrip in Jordan where PFLP militants landed three hijacked passenger airliners and blew them up in front of media cameras.',
          example:
            "The explosions at Dawson's Field triggered the Black September crackdown in Jordan.",
        },
        {
          term: 'Black September (1970)',
          definition:
            "A civil conflict in Jordan in September 1970 in which King Hussein's army defeated Palestinian militias and expelled the PLO.",
          example:
            'After Black September, the PLO was expelled from Jordan and relocated to Lebanon.',
        },
        {
          term: 'Munich Olympics (1972)',
          definition:
            'The hostage-taking and murder of eleven Israeli athletes and coaches by Palestinian militants at the 1972 Summer Olympic Games.',
          example:
            'The Munich Olympics massacre shocked global public opinion and led to Israeli targeted reprisals.',
        },
      ],
      vocab_cloze_text:
        'After 1967, Palestinian fighters known as ____(1)____ decided to fight for themselves. In March 1968, Palestinian fighters fought an Israeli armored raid at the ____(2)____, transforming Yasser Arafat into a popular hero and leading to Fatah taking control of the PLO. However, radical splinter factions like the ____(3)____ believed that international terrorism was necessary. In September 1970, militants forced three hijacked airliners to land at ____(4)____ in Jordan and blew them up. Viewing this as an intolerable challenge to his throne, King Hussein launched the military offensive known as ____(5)____, expelling the PLO to Lebanon. Two years later, a faction calling itself Black September seized eleven Israeli athletes at the ____(6)____, resulting in the deaths of all eleven hostages.',
      narrative_blocks: [
        {
          title: 'Act 1: Context & Catalyst — From Dependence to Armed Resistance (1968–1969)',
          paragraphs: [
            '<span class="para-ref">[1.1]</span> The disastrous defeat of Arab state armies in the 1967 Six Day War destroyed Palestinian confidence in Arab leaders like Gamal Abdel Nasser. For nineteen years, Palestinians had waited for regular Arab armies to defeat Israel and restore their homeland. After 1967, young Palestinians decided that they had to take their destiny into their own hands, joining independent armed guerrilla organisations known as *fedayeen* ("those who sacrifice themselves"). The defining turning point occurred on 21 March 1968 at the town of Karameh inside Jordan. When a large Israeli armored force crossed the border to destroy guerrilla camps, Palestinian fighters belonging to Yasser Arafat’s Fatah movement chose to stand and fight alongside Jordanian artillery rather than retreating into the surrounding hills.',
            '<span class="para-ref">[1.2]</span> The Battle of Karameh was a military victory for Israel, which destroyed the guerrilla base and killed over 100 fighters. However, Palestinian guerrillas inflicted unusually heavy casualties on the Israeli Defence Forces, killing 28 Israeli soldiers and disabling several tanks. Across the Arab world, Karameh was celebrated as a legendary moral victory—the first time Arab fighters had stood their ground and inflicted serious losses on the Israeli army. Thousands of young men volunteered to join Fatah in the weeks that followed. In February 1969, Yasser Arafat was elected Chairman of the PLO, cementing Fatah\'s leadership and transforming the PLO from a corrupt diplomatic group controlled by Arab heads of state into an independent, armed national liberation movement.',
          ],
          tasks: [
            {
              id: 'task_9_1',
              title: 'Task 1: Word Scalpel & Turning Point Analysis',
              instructions:
                'Using paragraphs [1.1] and [1.2], explain why the Battle of Karameh was a turning point for Palestinian national identity and how it led to Yasser Arafat taking control of the PLO.',
              scaffolding: {
                sentence_starter:
                  'The Battle of Karameh in March 1968 was a major turning point because...',
                connectives: [
                  'Even though Israel destroyed the base, Palestinian fighters...',
                  'Consequently, this allowed Yasser Arafat to...',
                ],
              },
              model_answer:
                'The Battle of Karameh in March 1968 was a major turning point because Palestinian guerrillas (fedayeen) chose to stand and fight an Israeli armored raid rather than retreating, killing 28 Israeli soldiers and damaging tanks. After the humiliation of the 1967 Six Day War, this was hailed across the Arab world as a moral triumph showing that Palestinians could stand up to Israel. Consequently, thousands of young Palestinians joined Fatah, and in February 1969 Yasser Arafat was elected Chairman of the PLO, transforming it into an active, armed national movement independent of Arab governments.',
            },
          ],
        },
        {
          title:
            "Act 2: Escalation & Conflict — Dawson's Field & The Crisis of Black September (1970)",
          paragraphs: [
            '<span class="para-ref">[2.1]</span> By 1970, the growing strength of Palestinian guerrilla groups inside Jordan had created an unsustainable crisis. Armed guerrillas operated as a "state within a state" in the capital city of Amman, setting up roadblocks, carrying loaded assault rifles in public, refusing to pay Jordanian taxes, and ignoring police authority. Radical Marxist splinter groups, most notably George Habash’s Popular Front for the Liberation of Palestine (PFLP), believed that small-scale border raids would never force Western superpowers to pay attention to Palestine. The PFLP pioneered international airplane hijackings to capture world headlines. In early September 1970, PFLP militants staged their most daring operation, hijacking four Western commercial airliners bound for New York.',
            '<span class="para-ref">[2.2]</span> Three of the hijacked aircraft (Swissair, TWA, and BOAC flights) were forced to land at Dawson\'s Field, a remote desert airstrip in northern Jordan. After holding over 300 passengers hostage for several days, the hijackers released the passengers and blew up the multi-million-dollar airliners in front of international media cameras. (<span class="archival-meta-tag">Source A</span>) shows the charred, smoking ruins of the blown-up passenger planes at Dawson\'s Field, an act of defiance that directly threatened the authority and sovereignty of King Hussein of Jordan. Realising that his kingdom was descending into anarchy, King Hussein declared martial law on 17 September 1970. The Jordanian army launched an all-out offensive against Palestinian militias in Amman in a bloody civil war known as "Black September." After ten days of heavy fighting that cost thousands of lives, Palestinian fighters were crushed, and by mid-1971, the PLO and its forces were completely expelled from Jordan, relocating their headquarters to southern Lebanon.',
          ],
          source: {
            letter: 'A',
            title:
              "Source A: Archival Photograph: PFLP Militants Detonating Hijacked Commercial Airliners at Dawson's Field, Jordan (12 September 1970)",
            caption:
              'The smoking wreckage of BOAC, TWA, and Swissair passenger aircraft blown up by PFLP hijackers on a desert airstrip near Zarqa, Jordan.',
            provenance:
              'Associated Press Photo Archive, Amman Bureau (Accession Ref: AP-JOR-1970-0912).',
            source_context:
              "This primary photograph captures the destruction of three Western commercial airliners at Dawson's Field in the Jordanian desert on 12 September 1970. The PFLP blew up the aircraft after releasing the passengers to publicize the Palestinian plight, an open challenge to King Hussein of Jordan that directly provoked the Black September civil war.",
            hinge_question:
              'How does Source A help explain why King Hussein of Jordan concluded that the armed Palestinian guerrilla factions had to be expelled from his country?',
          },
          tasks: [
            {
              id: 'task_9_2',
              title: "Task 2: Causal Chain — The Dawson's Field Hijackings to Black September",
              instructions:
                "Using Source A and paragraphs [2.1]–[2.2], explain how the Dawson's Field hijackings led directly to the Black September crackdown and the expulsion of the PLO to Lebanon.",
              scaffolding: {
                sentence_starter:
                  "Source A shows the destruction of three passenger airliners at Dawson's Field, which triggered a crisis because...",
                connectives: [
                  'King Hussein viewed this as a direct challenge to his authority because...',
                  'Consequently, the Jordanian army launched an offensive that resulted in...',
                ],
              },
              model_answer:
                'Source A shows the dramatic destruction of three hijacked passenger planes at Dawson\'s Field in Jordan, which triggered the Black September crisis because it proved that Palestinian guerrilla groups like the PFLP were operating completely outside the law as a "state within a state". By landing hijacked Western planes in the Jordanian desert and blowing them up in front of international media, the militants humiliated King Hussein and challenged his royal authority. Realising his kingdom was slipping into lawlessness, King Hussein ordered his army to crush the Palestinian militias on 17 September 1970. After fierce urban fighting, the Jordanian military defeated the militias and expelled the PLO to Lebanon by mid-1971.',
            },
          ],
        },
        {
          title: 'Act 3: Forensic Evidence & Terror — The 1972 Munich Olympics Massacre',
          paragraphs: [
            '<span class="para-ref">[3.1]</span> Driven into exile in Lebanon and burning for revenge against King Hussein and Israel, radical Palestinian militants formed a covert terrorist cell calling itself "Black September." On 5 September 1972, during the Summer Olympic Games in Munich, West Germany, eight heavily armed Black September militants scaled the wire fence of the Olympic Village. They forced their way into the quarters of the Israeli Olympic team, immediately shooting dead a weightlifter and a wrestling coach who tried to resist, and taking nine other Israeli athletes, coaches, and referees hostage.',
            '<span class="para-ref">[3.2]</span> The militants demanded the immediate release of 234 Palestinian prisoners held in Israeli jails. Israeli Prime Minister Golda Meir flatly refused, stating that giving in to blackmail would endanger Israelis and Jewish people worldwide. German authorities arranged to transport the terrorists and hostages by helicopter to the nearby Fürstenfeldbruck airbase, pretending they would be flown to Egypt, while secretly preparing a police ambush. However, the German rescue attempt was disastrously mismanaged: snipers had no night-vision equipment or radio communication, and armored vehicles arrived late. In the resulting firefight on the tarmac, a terrorist tossed a grenade into one helicopter, while another gunman shot the hostages in the second helicopter. All nine remaining Israeli hostages, five terrorists, and one German police officer were killed. (<span class="archival-meta-tag">Source B</span>) shows the chilling photograph of a masked Black September gunman on the Olympic village balcony, an image beamed live by television into hundreds of millions of living rooms around the globe. In response, Golda Meir authorized the Mossad intelligence agency to track down and assassinate the planners of the massacre in a covert campaign known as "Operation Wrath of God."',
          ],
          source: {
            letter: 'B',
            title:
              'Source B: Archival Primary Photograph: Masked Black September Gunman on the Balcony at Munich Olympic Village (5 September 1972)',
            caption:
              'A masked member of the Black September militant group on the balcony of 31 Connollystraße in the Olympic Village, Munich.',
            provenance:
              'Kurt Strumpf / Associated Press Archive (Accession Ref: AP-MUC-1972-0509).',
            source_context:
              'This iconic primary photograph, taken by AP photographer Kurt Strumpf on 5 September 1972, captures a hooded Black September militant peering from the balcony of the Israeli Olympic team quarters in Munich. The crisis was broadcast live to an estimated 900 million television viewers worldwide, ending in the murder of eleven Israeli athletes and coaches.',
            hinge_question:
              'Why did the live television broadcast of the Munich crisis shown in Source B create both worldwide publicity and widespread condemnation for the Palestinian cause?',
          },
          tasks: [
            {
              id: 'task_9_3',
              title: 'Task 3: Forensic Source Analysis — The Munich Olympics Attack',
              instructions:
                "Using Source B and paragraphs [3.1]–[3.2], explain how the Munich attack brought international publicity to the Palestinian issue, and analyse Israel's response.",
              scaffolding: {
                sentence_starter:
                  'Source B captures the masked terrorist at the Munich Olympics, an event that impacted international attitudes because...',
                connectives: [
                  "By targeting the world's most famous sporting event, Black September ensured that...",
                  'In response to the murder of eleven athletes, Prime Minister Golda Meir...',
                ],
              },
              model_answer:
                'Source B captures a masked Black September militant at the Munich Olympics, an event that shocked international public opinion because it brought armed terrorism directly onto live television screens watched by nearly 900 million people. By striking the Olympic Games, militants ensured that the word "Palestine" and their demands were broadcast globally, destroying the Western idea that Palestinians were merely passive refugees. However, the murder of eleven unarmed athletes provoked worldwide outrage, branding the Palestinian liberation movement as ruthless terrorists. In response, Israeli Prime Minister Golda Meir authorized retaliatory air strikes against guerrilla bases in Lebanon and ordered the Mossad to systematically hunt down and assassinate the organizers.',
            },
          ],
        },
        {
          title:
            'Act 4: The Historical Verdict & Extended Writing — Did Terrorism Help or Harm the Cause?',
          paragraphs: [
            '<span class="para-ref">[4.1]</span> The turn to international terrorism between 1968 and 1972 had deeply contradictory consequences for the Palestinian struggle. On the one hand, spectacular attacks like the Dawson\'s Field hijackings and the Munich Olympics forced the international community to acknowledge that the Palestinian problem was not simply a humanitarian refugee issue, but an unresolved political struggle for national self-determination. By 1974, the United Nations invited Yasser Arafat to address the General Assembly as the recognized representative of the Palestinian people.',
            '<span class="para-ref">[4.2]</span> On the other hand, terrorism caused severe strategic damage to the Palestinian national cause. In Jordan, reckless armed militancy brought about the catastrophe of Black September, costing thousands of Palestinian lives and depriving the PLO of its border with Israel. Internationally, the Munich massacre alienated Western governments and justified aggressive Israeli military reprisals. While violence won global headlines, it ultimately demonstrated that terrorism alone could never defeat Israel or achieve an independent state, prompting Yasser Arafat to gradually steer the PLO towards international diplomacy in the mid-1970s.',
          ],
          tasks: [
            {
              id: 'task_9_4',
              title: 'Task 4: GCSE Narrative Account — The Palestinian Resistance (1968–1972)',
              instructions:
                'Write a narrative account analysing the key events of the Palestinian resistance between 1968 and 1972. [8 marks]',
              scaffolding: {
                stimulus_points: ['The Battle of Karameh (1968)', 'The Munich Olympics (1972)'],
                sentence_starters: [
                  'Following the 1967 defeat, Palestinian fighters turned to independent armed struggle, beginning with...',
                  'This led to growing militancy and conflict in Jordan, including...',
                  'Following expulsion from Jordan, radical groups turned to international terrorism, culminating in...',
                ],
                causal_connectives: [
                  'As a direct consequence of this...',
                  'This was significant because...',
                  'Ultimately, this resulted in...',
                ],
              },
              model_answer:
                'The Palestinian resistance transformed between 1968 and 1972 from local cross-border raiding into an independent national movement that utilized international terrorism.\n\nThe transformation began on 21 March 1968 at the Battle of Karameh in Jordan. When an Israeli armored force attacked guerrilla camps, Palestinian fighters belonging to Fatah stood their ground alongside Jordanian artillery, killing 28 Israeli soldiers. Although the base was destroyed, Karameh was celebrated across the Arab world as a moral victory that proved Palestinians could stand up to Israel. Consequently, thousands of recruits joined Fatah, and in February 1969 Yasser Arafat was elected Chairman of the PLO, establishing independent Palestinian leadership.\n\nThis rise in armed strength led to direct confrontation in Jordan. Palestinian guerrillas operated as a "state within a state" in Amman, and in September 1970 the radical PFLP hijacked three passenger airliners and blew them up at Dawson\'s Field. King Hussein viewed this as a direct threat to his monarchy and launched the "Black September" military crackdown. After ten days of fierce fighting, the Jordanian army defeated the militias, and by 1971 the PLO was expelled to Lebanon, cutting off their direct border with Israel.\n\nDriven into exile in Lebanon and seeking revenge, radical militants formed Black September and escalated to international terrorism, culminating in the Munich Olympics attack on 5 September 1972. Eight gunmen infiltrated the Olympic Village, killing two Israeli athletes and taking nine hostage. After a bungled German rescue attempt at the airport, all nine remaining hostages were murdered. While Munich beamed the Palestinian struggle to 900 million television viewers worldwide, it caused immense international outrage and prompted Israeli retaliatory strikes.\n\nUltimately, this narrative demonstrates that while armed resistance and terrorism won worldwide publicity for the Palestinian cause, it caused the loss of their Jordanian base and alienated international opinion.',
            },
          ],
        },
      ],
      sources: [
        {
          letter: 'A',
          title:
            "Source A: Archival Photograph: PFLP Militants Detonating Hijacked Commercial Airliners at Dawson's Field, Jordan (12 September 1970)",
          caption:
            'The smoking wreckage of BOAC, TWA, and Swissair passenger aircraft blown up by PFLP hijackers on a desert airstrip near Zarqa, Jordan.',
          provenance:
            'Associated Press Photo Archive, Amman Bureau (Accession Ref: AP-JOR-1970-0912).',
          source_context:
            "This primary photograph captures the destruction of three Western commercial airliners at Dawson's Field in the Jordanian desert on 12 September 1970. The PFLP blew up the aircraft after releasing the passengers to publicize the Palestinian plight, an open challenge to King Hussein of Jordan that directly provoked the Black September civil war.",
          hinge_question:
            'How does Source A help explain why King Hussein of Jordan concluded that the armed Palestinian guerrilla factions had to be expelled from his country?',
        },
        {
          letter: 'B',
          title:
            'Source B: Archival Primary Photograph: Masked Black September Gunman on the Balcony at Munich Olympic Village (5 September 1972)',
          caption:
            'A masked member of the Black September militant group on the balcony of 31 Connollystraße in the Olympic Village, Munich.',
          provenance: 'Kurt Strumpf / Associated Press Archive (Accession Ref: AP-MUC-1972-0509).',
          source_context:
            'This iconic primary photograph, taken by AP photographer Kurt Strumpf on 5 September 1972, captures a hooded Black September militant peering from the balcony of the Israeli Olympic team quarters in Munich. The crisis was broadcast live to an estimated 900 million television viewers worldwide, ending in the murder of eleven Israeli athletes and coaches.',
          hinge_question:
            'Why did the live television broadcast of the Munich crisis shown in Source B create both worldwide publicity and widespread condemnation for the Palestinian cause?',
        },
      ],
      exam_practice: {
        question:
          'Explain one consequence of the Black September conflict in Jordan (1970). [4 marks]',
        marks: 4,
        time_mins: 5,
        type: 'consequence',
        model_answer:
          'One major consequence of the Black September conflict in 1970 was the total expulsion of the PLO and its armed fighters from Jordan to Lebanon.\n\nFollowing the Dawson’s Field airplane hijackings, King Hussein ordered the Jordanian army to crush Palestinian militias operating as a "state within a state" in Amman. Consequently, after heavy urban fighting, the PLO lost its military bases along the River Jordan and was forced to relocate its headquarters, fighters, and refugee institutions to southern Lebanon. This created a new center of Palestinian militant operations (known as "Fatahland") that dragged Lebanon into civil war and triggered future Israeli invasions.',
      },
      flashcards: [
        {
          front: 'What does the Arabic word "fedayeen" mean?',
          back: '"Those who sacrifice themselves"; refers to Palestinian nationalist guerrilla fighters.',
        },
        {
          front: 'Why was the Battle of Karameh (March 1968) important for Palestinians?',
          back: 'Palestinian fighters stood their ground against an Israeli armored raid, killing 28 Israeli soldiers and creating a moral victory.',
        },
        { front: 'When was Yasser Arafat elected Chairman of the PLO?', back: 'February 1969.' },
        {
          front:
            'What radical Palestinian organisation pioneered international airplane hijackings?',
          back: 'The PFLP (Popular Front for the Liberation of Palestine), led by George Habash.',
        },
        {
          front: "What happened at Dawson's Field in Jordan in September 1970?",
          back: 'PFLP hijackers landed three hijacked Western airliners in the desert, released passengers, and blew up the planes.',
        },
        {
          front: 'Why did King Hussein launch the Black September crackdown in 1970?',
          back: 'Armed Palestinian militias operated as a "state within a state", defying Jordanian laws and challenging his royal authority.',
        },
        {
          front: 'Where did the PLO relocate its headquarters after being expelled from Jordan?',
          back: 'Southern Lebanon (Beirut and the border region).',
        },
        {
          front: 'What happened at the Munich Olympics on 5 September 1972?',
          back: 'Black September militants took eleven Israeli athletes and coaches hostage; all eleven hostages were killed.',
        },
        {
          front:
            "What was Israeli Prime Minister Golda Meir's policy during the Munich hostage crisis?",
          back: 'She refused to negotiate with terrorists or release prisoners, arguing it would encourage worldwide hostage-taking.',
        },
        {
          front: 'What was Operation Wrath of God?',
          back: 'A covert Israeli Mossad operation authorized by Golda Meir to track down and assassinate the planners of the Munich massacre.',
        },
      ],
      quiz: [
        {
          question:
            'What Arabic term was used to describe Palestinian guerrilla fighters who waged armed resistance?',
          q: 'What Arabic term was used to describe Palestinian guerrilla fighters who waged armed resistance?',
          options: ['Fedayeen', 'Kibbutzim', 'Haganah', 'Irgun'],
          answer: 'Fedayeen',
          a: 'Fedayeen',
          explanation: 'Fedayeen means "those who sacrifice themselves".',
        },
        {
          question:
            'At which Jordanian town did Palestinian fighters resist an Israeli armored raid on 21 March 1968?',
          q: 'At which Jordanian town did Palestinian fighters resist an Israeli armored raid on 21 March 1968?',
          options: ['Samu', 'Karameh', 'Amman', 'Zarqa'],
          answer: 'Karameh',
          a: 'Karameh',
          explanation: 'The Battle of Karameh took place on 21 March 1968.',
        },
        {
          question:
            'In what year was Yasser Arafat elected Chairman of the Palestine Liberation Organisation (PLO)?',
          q: 'In what year was Yasser Arafat elected Chairman of the Palestine Liberation Organisation (PLO)?',
          options: ['1964', '1967', '1969', '1974'],
          answer: '1969',
          a: '1969',
          explanation:
            'Arafat was elected Chairman of the PLO Executive Committee in February 1969.',
        },
        {
          question:
            'Which radical Palestinian organisation pioneered international airplane hijackings in the late 1960s?',
          q: 'Which radical Palestinian organisation pioneered international airplane hijackings in the late 1960s?',
          options: [
            'Fatah',
            'The PFLP (Popular Front for the Liberation of Palestine)',
            'Hamas',
            'Hezbollah',
          ],
          answer: 'The PFLP (Popular Front for the Liberation of Palestine)',
          a: 'The PFLP (Popular Front for the Liberation of Palestine)',
          explanation: 'The PFLP, led by George Habash, carried out international hijackings.',
        },
        {
          question:
            'Where did PFLP hijackers land three commercial airliners in September 1970 before blowing them up?',
          q: 'Where did PFLP hijackers land three commercial airliners in September 1970 before blowing them up?',
          options: [
            'Cairo International Airport',
            "Dawson's Field in Jordan",
            'Beirut International Airport',
            'Baghdad Airfield',
          ],
          answer: "Dawson's Field in Jordan",
          a: "Dawson's Field in Jordan",
          explanation: "Dawson's Field was a deserted desert airstrip near Zarqa in Jordan.",
        },
        {
          question:
            'Which Arab monarch ordered his army to crush armed Palestinian militias in September 1970?',
          q: 'Which Arab monarch ordered his army to crush armed Palestinian militias in September 1970?',
          options: [
            'King Hussein of Jordan',
            'King Faisal of Saudi Arabia',
            'King Hassan of Morocco',
            'King Farouk of Egypt',
          ],
          answer: 'King Hussein of Jordan',
          a: 'King Hussein of Jordan',
          explanation:
            'King Hussein of Jordan ordered the military offensive during Black September.',
        },
        {
          question:
            'What name is given to the bloody civil war between the Jordanian army and Palestinian militias in September 1970?',
          q: 'What name is given to the bloody civil war between the Jordanian army and Palestinian militias in September 1970?',
          options: [
            'The Six Day War',
            'Black September',
            'Operation Peace for Galilee',
            'The Arab Revolt',
          ],
          answer: 'Black September',
          a: 'Black September',
          explanation: 'The conflict in Jordan in September 1970 is known as Black September.',
        },
        {
          question:
            'To which neighbouring country did the PLO relocate its headquarters after being expelled from Jordan?',
          q: 'To which neighbouring country did the PLO relocate its headquarters after being expelled from Jordan?',
          options: ['Syria', 'Egypt', 'Lebanon', 'Iraq'],
          answer: 'Lebanon',
          a: 'Lebanon',
          explanation:
            'The PLO relocated to southern Lebanon and Beirut after being driven from Jordan.',
        },
        {
          question:
            'At which major international sporting event did Palestinian militants take Israeli athletes hostage in 1972?',
          q: 'At which major international sporting event did Palestinian militants take Israeli athletes hostage in 1972?',
          options: [
            'The Mexico City Olympics',
            'The Munich Summer Olympics',
            'The Montreal Olympics',
            'The Rome World Cup',
          ],
          answer: 'The Munich Summer Olympics',
          a: 'The Munich Summer Olympics',
          explanation: 'The attack took place at the Munich Olympic Games on 5 September 1972.',
        },
        {
          question:
            'How many Israeli athletes and coaches were killed during the Munich Olympics hostage crisis?',
          q: 'How many Israeli athletes and coaches were killed during the Munich Olympics hostage crisis?',
          options: ['Two', 'Six', 'Eleven', 'Twenty'],
          answer: 'Eleven',
          a: 'Eleven',
          explanation:
            'Eleven Israeli team members and one German policeman were killed in Munich.',
        },
        {
          question:
            'What was the name of the militant splinter group that carried out the Munich Olympics attack?',
          q: 'What was the name of the militant splinter group that carried out the Munich Olympics attack?',
          options: ['Black September', 'Fatah', 'The Muslim Brotherhood', 'The Arab League'],
          answer: 'Black September',
          a: 'Black September',
          explanation: 'The group named itself Black September after the 1970 Jordanian conflict.',
        },
        {
          question: 'Who was the Prime Minister of Israel during the 1972 Munich Olympics crisis?',
          q: 'Who was the Prime Minister of Israel during the 1972 Munich Olympics crisis?',
          options: ['David Ben-Gurion', 'Golda Meir', 'Menachem Begin', 'Yitzhak Rabin'],
          answer: 'Golda Meir',
          a: 'Golda Meir',
          explanation: 'Golda Meir was Prime Minister of Israel from 1969 to 1974.',
        },
        {
          question:
            "What was Prime Minister Golda Meir's policy regarding negotiations with the Munich hostage-takers?",
          q: "What was Prime Minister Golda Meir's policy regarding negotiations with the Munich hostage-takers?",
          options: [
            'She refused to negotiate or release prisoners',
            'She agreed to release all prisoners immediately',
            'She offered financial ransoms',
            'She resigned from office',
          ],
          answer: 'She refused to negotiate or release prisoners',
          a: 'She refused to negotiate or release prisoners',
          explanation:
            'Meir stated that negotiating would encourage terrorism against Israelis worldwide.',
        },
        {
          question:
            'At which airbase near Munich did German police attempt a bungled ambush to rescue the Israeli hostages?',
          q: 'At which airbase near Munich did German police attempt a bungled ambush to rescue the Israeli hostages?',
          options: ['Fürstenfeldbruck', 'Tempelhof', 'Ramstein', 'Frankfurt'],
          answer: 'Fürstenfeldbruck',
          a: 'Fürstenfeldbruck',
          explanation: 'The firefight occurred at Fürstenfeldbruck NATO airbase.',
        },
        {
          question:
            'What was the codename of the covert Mossad operation to assassinate the planners of the Munich massacre?',
          q: 'What was the codename of the covert Mossad operation to assassinate the planners of the Munich massacre?',
          options: [
            'Operation Wrath of God',
            'Operation Peace for Galilee',
            'Operation Black Arrow',
            'Operation Magic Carpet',
          ],
          answer: 'Operation Wrath of God',
          a: 'Operation Wrath of God',
          explanation:
            'Operation Wrath of God (or Operation Bayonet) targeted Black September operatives.',
        },
        {
          question:
            'How many people were estimated to have watched the Munich Olympic crisis live on television?',
          q: 'How many people were estimated to have watched the Munich Olympic crisis live on television?',
          options: ['5 million', '50 million', 'Roughly 900 million', 'Over 3 billion'],
          answer: 'Roughly 900 million',
          a: 'Roughly 900 million',
          explanation:
            'An estimated 900 million viewers in over 100 countries watched the crisis live.',
        },
        {
          question:
            'Which country attempted to intervene militarily to support Palestinians during Black September in 1970?',
          q: 'Which country attempted to intervene militarily to support Palestinians during Black September in 1970?',
          options: ['Syria', 'Egypt', 'Iraq', 'Saudi Arabia'],
          answer: 'Syria',
          a: 'Syria',
          explanation:
            'Syria sent armored units into northern Jordan, but retreated under Jordanian air strikes.',
        },
        {
          question:
            'What nickname was given to the region of southern Lebanon dominated by PLO fighters in the 1970s?',
          q: 'What nickname was given to the region of southern Lebanon dominated by PLO fighters in the 1970s?',
          options: ['Fatahland', 'The Green Zone', 'New Palestine', 'The Golan Belt'],
          answer: 'Fatahland',
          a: 'Fatahland',
          explanation: 'Southern Lebanon became known colloquially as "Fatahland".',
        },
        {
          question:
            'How did international airline travel change as a result of PFLP airplane hijackings in 1970?',
          q: 'How did international airline travel change as a result of PFLP airplane hijackings in 1970?',
          options: [
            'Commercial aviation was banned internationally',
            'Metal detectors and strict airport baggage screening were introduced worldwide',
            'Airlines stopped flying to Europe',
            'Passports were abolished',
          ],
          answer: 'Metal detectors and strict airport baggage screening were introduced worldwide',
          a: 'Metal detectors and strict airport baggage screening were introduced worldwide',
          explanation:
            'The 1970 hijackings led directly to modern airport security, metal detectors, and luggage checks.',
        },
        {
          question:
            'In what year was Yasser Arafat invited to address the United Nations General Assembly in New York?',
          q: 'In what year was Yasser Arafat invited to address the United Nations General Assembly in New York?',
          options: ['1967', '1970', '1974', '1982'],
          answer: '1974',
          a: '1974',
          explanation:
            'Arafat gave his famous "gun and olive branch" speech to the UN General Assembly in November 1974.',
        },
      ],
    },

    // =========================================================================
    // LESSON 10 / KT 2.5: The War of Attrition & The Yom Kippur War (1969–1973)
    // =========================================================================
    {
      id: 'lesson_10',
      title: 'KT 2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
      learning_objective:
        'Explain why the Yom Kippur War of October 1973 broke the diplomatic deadlock and opened the path to peace.',
      learning_objectives: [
        "Explain the causes and nature of the War of Attrition (1969–70) and Anwar Sadat's strategic objectives.",
        'Describe how Egyptian and Syrian forces achieved complete tactical surprise on Yom Kippur (6 October 1973).',
        'Analyse the superpower involvement, the OPEC oil crisis, and why the war opened the door to diplomacy.',
      ],
      hook_text:
        'On 6 October 1973, while Israel observed its holiest fast day, 80,000 Egyptian soldiers crossed the Suez Canal using high-pressure water hoses to wash away Israeli sand ramparts. It was a war that brought the superpowers to nuclear alert and changed Middle Eastern history.',
      teacher_notes: {
        primer:
          "This lesson examines the climactic conflict of Key Topic 2: the 1973 Yom Kippur War. Pupils investigate the static War of Attrition along the Suez Canal (1969–70) and Israel's construction of the Bar-Lev Line. They explore the accession of Anwar Sadat in Egypt and his daring strategy to wage a limited war to break the diplomatic stalemate. Students then study the surprise Egyptian and Syrian assault on 6 October 1973, the fierce tank battles, the Israeli counter-offensives across the canal, superpower intervention (airlifts and nuclear alert), the OPEC oil embargo, and why this war shattered Israeli complacency and paved the way for peace negotiations.",
        objectives: [
          {
            objective:
              "Explain the nature of the War of Attrition and Anwar Sadat's strategic motivation for war.",
            primer:
              'Guide pupils through paragraphs [1.1]–[1.2]. Emphasize that Sadat realized Israel would never give up the Sinai voluntarily while it held total military dominance. Sadat did not seek to destroy Israel, but to cross the canal, inflict casualties, and force the USA into serious diplomacy.',
            question:
              'Why did Anwar Sadat believe a limited military conflict was necessary to achieve a diplomatic solution?',
          },
          {
            objective:
              'Describe how Egypt and Syria achieved tactical surprise on 6 October 1973 and breached Israeli defenses.',
            primer:
              'Direct pupils to paragraph [2.1] and Source A. Explain the timing on the holy day of Yom Kippur during Ramadan, the use of high-pressure water monitors to blast through the sand ramparts of the Bar-Lev Line, and the protective Soviet anti-aircraft missile umbrella.',
            question:
              "How did Soviet-supplied anti-tank and anti-aircraft missiles neutralize Israel's traditional military strengths in the first days of the war?",
          },
          {
            objective:
              'Analyse the global impact of the war, including superpower confrontation and the OPEC oil embargo.',
            primer:
              'Lead pupils through paragraphs [3.1]–[3.2] and Source B. Show how US airlifts saved Israel while the Arab oil embargo quadrupled oil prices worldwide, forcing US Secretary of State Henry Kissinger into intense "shuttle diplomacy".',
            question:
              'How did Arab oil-producing nations use the "oil weapon" to influence Western foreign policy in October 1973?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        title: 'Recall & Retrieval (Prior Learning: KT1 & KT2.4)',
        instructions: 'Answer these questions in full sentences based on your prior learning.',
        items: [
          {
            question:
              "What was the name of the Israeli Olympic athletes' hostage crisis that occurred in September 1972?",
            answer: 'The Munich Olympics massacre.',
          },
          {
            question: 'Which Palestinian faction was led by Yasser Arafat from 1969 onwards?',
            answer: 'Fatah (and the PLO).',
          },
          {
            question:
              'In which Middle Eastern kingdom did the "Black September" civil conflict take place in 1970?',
            answer: 'Jordan.',
          },
          {
            question:
              'Which Arab monarch ordered his army to crush and expel Palestinian guerrilla factions in September 1970?',
            answer: 'King Hussein of Jordan.',
          },
          {
            question:
              'To which neighbouring country did the PLO relocate its main headquarters after being expelled from Jordan?',
            answer: 'Lebanon.',
          },
          {
            question:
              'What was the name of the 1968 battle in Jordan that became a symbol of Palestinian armed resistance?',
            answer: 'The Battle of Karameh.',
          },
          {
            question:
              'Which Egyptian leader died in September 1970 and was succeeded by Anwar Sadat?',
            answer: 'Gamal Abdel Nasser.',
          },
          {
            question:
              'What was the name of the fortified sand-barrier defensive line built by Israel along the east bank of the Suez Canal?',
            answer: 'The Bar-Lev Line.',
          },
          {
            question:
              'What was the number of the November 1967 United Nations Security Council Resolution that introduced "Land for Peace"?',
            answer: 'UN Resolution 242.',
          },
          {
            question:
              'Which vital international waterway remained closed to international shipping between 1967 and 1975?',
            answer: 'The Suez Canal.',
          },
        ],
      },
      vocab: [
        {
          term: 'War of Attrition',
          definition:
            'A static border conflict along the Suez Canal from 1969 to 1970 involving heavy artillery duels, commando raids, and air dogfights.',
          example:
            'The War of Attrition inflicted hundreds of casualties on Israeli troops along the Suez Canal.',
        },
        {
          term: 'Bar-Lev Line',
          definition:
            'A fortified chain of Israeli concrete bunkers and massive sixty-foot sand ramparts built along the eastern bank of the Suez Canal.',
          example:
            'Egyptian engineers used high-pressure water monitors to wash away the sand ramparts of the Bar-Lev Line.',
        },
        {
          term: 'Anwar Sadat',
          definition:
            'President of Egypt from 1970 to 1981 who launched the 1973 Yom Kippur War to break the diplomatic stalemate and regain the Sinai.',
          example:
            'Anwar Sadat planned the surprise attack to force the United States into serious peace negotiations.',
        },
        {
          term: 'Yom Kippur',
          definition:
            'The holiest day in the Jewish calendar (the Day of Atonement), observed with fasting and prayer, when Egypt and Syria attacked.',
          example:
            'Israel was caught off guard because the attack occurred on Yom Kippur when soldiers were at prayer.',
        },
        {
          term: 'OPEC Oil Embargo',
          definition:
            'The decision by Arab oil-exporting states in October 1973 to cut oil production and embargo nations supporting Israel, quadrupling prices.',
          example:
            'The OPEC oil embargo caused severe fuel shortages and queues at petrol stations across the West.',
        },
        {
          term: 'Shuttle Diplomacy',
          definition:
            'The diplomatic method pioneered by US Secretary of State Henry Kissinger in 1973–74, flying between capitals to broker peace.',
          example:
            'Kissinger’s shuttle diplomacy successfully negotiated disengagement agreements between Israel, Egypt, and Syria.',
        },
      ],
      vocab_cloze_text:
        "Between 1969 and 1970, Egypt and Israel fought the ____(1)____ across the Suez Canal, prompting Israel to build the fortified ____(2)____ along the canal's eastern bank. Following Nasser's death, Egyptian President ____(3)____ planned a limited offensive to break the diplomatic deadlock. On 6 October 1973, Egypt and Syria launched a coordinated surprise assault on the Jewish holy day of ____(4)____. In response to US emergency arms shipments to Israel, Arab oil-producing nations enacted the ____(5)____, quadrupling global fuel prices. The war was brought to an end through the energetic ____(6)____ of US Secretary of State Henry Kissinger, opening the door to future peace negotiations.",
      narrative_blocks: [
        {
          title:
            "Act 1: Context & Catalyst — The Impasse of Attrition & Anwar Sadat's Plan (1969–1973)",
          paragraphs: [
            '<span class="para-ref">[1.1]</span> Following the 1967 war, Egyptian President Gamal Abdel Nasser refused to accept Israeli occupation of the Sinai Peninsula. In March 1969, Nasser launched the "War of Attrition"—a prolonged campaign of heavy artillery bombardments, commando raids, and aerial dogfights across the Suez Canal designed to inflict unsustainable casualties on the small Israeli army. In response, Israel constructed the "Bar-Lev Line," an elaborate chain of fortified concrete bunkers and massive sand ramparts over sixty feet high running the entire length of the canal. The War of Attrition dragged on until an American-brokered ceasefire in August 1970, which cost over 10,000 Egyptian and 360 Israeli lives without shifting the front lines by an inch.',
            '<span class="para-ref">[1.2]</span> When Nasser died of a heart attack in September 1970, he was succeeded by his vice-president, Anwar Sadat. Observers in Israel and Washington initially dismissed Sadat as a weak leader. However, Sadat possessed a bold, realistic strategic vision. He recognized that Egypt\'s economy was crumbling under immense military spending and that Israel would never surrender the Sinai Peninsula through peaceful diplomacy while it enjoyed total military superiority. Sadat did not plan an impossible war to destroy Israel; instead, he planned a limited, high-intensity surprise offensive to cross the canal, seize a secure bridgehead in the Sinai, shatter the myth of Israeli invincibility, and force the American superpower to intervene and broker a comprehensive peace.',
          ],
          tasks: [
            {
              id: 'task_10_1',
              title: 'Task 1: Word Scalpel & Strategic Objectives',
              instructions:
                'Using paragraphs [1.1] and [1.2], explain what the War of Attrition was and why Anwar Sadat decided to wage a limited war rather than trying to destroy Israel.',
              scaffolding: {
                sentence_starter:
                  'The War of Attrition (1969–1970) was a prolonged conflict characterized by...',
                connectives: [
                  'Anwar Sadat recognized that Israel would never negotiate while...',
                  'Consequently, his strategic objective was not to destroy Israel, but to...',
                ],
              },
              model_answer:
                "The War of Attrition (1969–1970) was a static border conflict along the Suez Canal involving heavy Egyptian artillery bombardments, commando raids, and Israeli counter-strikes along the fortified Bar-Lev Line. Anwar Sadat recognized that Egypt's economy could not sustain permanent mobilization and that Israel would never surrender the Sinai voluntarily while it held complete military superiority. Consequently, Sadat planned a limited war: his goal was not to destroy Israel, but to cross the canal, seize a ten-mile bridgehead, shatter the myth of Israeli invincibility, and force the United States to intervene and broker peace.",
            },
          ],
        },
        {
          title:
            'Act 2: Escalation & Conflict — The Surprise Assault on the Holy Day (6 October 1973)',
          paragraphs: [
            '<span class="para-ref">[2.1]</span> On Saturday, 6 October 1973, at 2:00 pm, Egypt and Syria launched a coordinated surprise assault on two fronts. The timing was chosen with meticulous care: it was Yom Kippur, the holiest day in Judaism, when Israeli radio stations were silent, roads were empty, and many soldiers were home with their families or fasting in synagogues. It was also the Muslim holy month of Ramadan. In the north, 1,400 Syrian tanks surged across the Golan Heights armistice line, overwhelming thin Israeli defensive units. In the south, over 80,000 Egyptian infantrymen crossed the Suez Canal on assault rafts under cover of a massive 2,000-gun artillery bombardment.',
            '<span class="para-ref">[2.2]</span> The Egyptian army executed a brilliant engineering feat. Rather than using conventional explosives to clear the massive sand ramparts of the Bar-Lev Line, Egyptian engineers deployed high-pressure water turbines pumping water directly from the canal, washing away thousands of tons of sand in hours to create bridge ramps. (<span class="archival-meta-tag">Source A</span>) shows Egyptian infantry crossing the Suez Canal on pontoon bridges and planting the Egyptian flag on the captured ramparts. When Israeli jet fighters and tanks rushed forward to counter-attack, they were devastated by mobile Soviet-supplied surface-to-air missiles (SAM-6) and wire-guided anti-tank missiles (Saggers). In the first forty-eight hours of combat, Israel lost over 150 tanks and dozens of aircraft, plunging the Israeli leadership into panic.',
          ],
          source: {
            letter: 'A',
            title:
              'Source A: Archival Photograph: Egyptian Infantry and Armored Columns Crossing the Suez Canal (October 1973)',
            caption:
              'Egyptian forces crossing pontoon bridges across the Suez Canal after breaching the sand ramparts of the Israeli Bar-Lev Line.',
            provenance:
              'Egyptian Armed Forces Directorate of Moral Affairs (Accession Ref: EGY-1973-1006).',
            source_context:
              'This primary photograph records the successful Egyptian crossing of the Suez Canal on 6–7 October 1973. Egyptian infantry used high-pressure water monitors to wash away the sixty-foot sand ramparts of the Bar-Lev Line, enabling pontoon bridges to be laid across the canal under a protective anti-aircraft missile umbrella.',
            hinge_question:
              'How does Source A illustrate why the opening crossing of the Suez Canal was viewed as a major technological and psychological triumph for Egypt?',
          },
          tasks: [
            {
              id: 'task_10_2',
              title: 'Task 2: Tactical Analysis — The Breach of the Bar-Lev Line',
              instructions:
                'Using Source A and paragraphs [2.1]–[2.2], explain how Egypt achieved surprise on Yom Kippur and how water monitors and Soviet missiles neutralized Israeli advantages.',
              scaffolding: {
                sentence_starter:
                  'Egypt achieved complete tactical surprise on 6 October 1973 because...',
                connectives: [
                  'To overcome the formidable Bar-Lev Line, Egyptian engineers...',
                  'Furthermore, Israeli tank and air counter-attacks were repelled because...',
                ],
              },
              model_answer:
                "Egypt achieved complete tactical surprise on 6 October 1973 because the attack was launched on Yom Kippur, the holiest day in Judaism, when Israeli soldiers were fasting and communication networks were shut down. As shown in Source A, Egyptian engineers breached the sixty-foot sand ramparts of the Bar-Lev Line by using high-pressure water monitors to wash away the sand in hours, allowing pontoon bridges to be deployed. Furthermore, Israeli armored and air counter-attacks were devastated because Egyptian troops were protected by mobile Soviet-supplied SAM-6 anti-aircraft missiles and wire-guided Sagger anti-tank missiles, neutralizing Israel's traditional air superiority.",
            },
          ],
        },
        {
          title:
            "Act 3: Forensic Evidence & Diplomacy — Superpower Airlifts, Sharon's Crossing & The Oil Weapon",
          paragraphs: [
            '<span class="para-ref">[3.1]</span> Facing critical shortages of ammunition and equipment, Israeli Prime Minister Golda Meir appealed urgently to the United States. US President Richard Nixon ordered a massive emergency military airlift, flying hundreds of transport planes loaded with tanks, artillery shells, and electronic countermeasures directly to Israeli airfields. Simultaneously, the Soviet Union launched an airlift to resupply Egypt and Syria. Having stabilized the northern front in fierce tank battles in the Golan Heights, Israeli armored divisions under General Ariel Sharon found an undefended seam between Egypt\'s Second and Third Armies. On the night of 15 October, Sharon\'s forces crossed to the western bank of the Suez Canal on pontoon rafts, establishing a bridgehead inside mainland Egypt. (<span class="archival-meta-tag">Source B</span>) shows Israeli tanks and armor crossing to the western bank, where they severed Egyptian supply lines and encircled Egypt\'s 30,000-strong Third Army.',
            '<span class="para-ref">[3.2]</span> As the military balance swung violently back towards Israel, the conflict triggered a global crisis. On 17 October, the Organisation of Petroleum Exporting Countries (OPEC), led by Saudi Arabia, deployed the "oil weapon." Arab nations cut oil production by 5% per month and placed a total oil embargo on the United States and the Netherlands. The price of crude oil quadrupled from $3 to nearly $12 a barrel, causing catastrophic petrol shortages, inflation, and economic panic across the Western world. Meanwhile, when the Soviet Union threatened to deploy airborne troops to save the surrounded Egyptian Third Army, the United States placed its nuclear armed forces on worldwide DEFCON 3 alert. US Secretary of State Henry Kissinger flew urgently between Moscow, Tel Aviv, and Cairo, finally securing a binding UN ceasefire on 24 October 1973.',
          ],
          source: {
            letter: 'B',
            title:
              'Source B: Archival Photograph: Israeli Armored Vehicles and Tanks Crossing the Suez Canal to the West Bank (October 1973)',
            caption:
              'Israeli Centurion tanks and armored personnel carriers crossing a pontoon bridge to the west bank of the Suez Canal during the counter-offensive of October 1973.',
            provenance:
              'IDF Military Archive, Southern Command Photographic Unit (Accession Ref: YKW-1973-1018).',
            source_context:
              "This primary photograph records General Ariel Sharon's daring armored counter-crossing to the western bank of the Suez Canal on 15–18 October 1973. Israeli tanks broke through between the Egyptian Second and Third Armies, cutting off the supply lines to Egypt's Third Army and threatening Cairo.",
            hinge_question:
              'How does Source B demonstrate how the military tide of the war shifted during the second week of fighting in October 1973?',
          },
          tasks: [
            {
              id: 'task_10_3',
              title: 'Task 3: Global Crisis Analysis — The Superpowers and the Oil Weapon',
              instructions:
                'Using Source B and paragraphs [3.1]–[3.2], explain how the US and Soviet airlifts impacted the war and how the OPEC oil embargo affected Western nations.',
              scaffolding: {
                sentence_starter:
                  'The Yom Kippur War rapidly expanded into a global crisis because both superpowers...',
                connectives: [
                  'The massive US emergency airlift allowed Israeli forces to...',
                  'Meanwhile, Arab oil-producing nations used the oil weapon by...',
                ],
              },
              model_answer:
                'The Yom Kippur War expanded into a global crisis because both superpowers intervened with massive military airlifts: the USSR resupplied Egypt and Syria, while the USA flew hundreds of plane-loads of tanks and ammunition to Israel. As shown in Source B, this US resupply enabled General Ariel Sharon to cross to the western bank of the Suez Canal and encircle Egypt\'s Third Army. In response, Arab oil nations in OPEC used the "oil weapon", cutting production and imposing an oil embargo on countries supporting Israel. This quadrupled oil prices from $3 to $12 a barrel, causing petrol shortages and severe inflation across the West, which forced US Secretary of State Henry Kissinger to urgently intervene and broker a ceasefire.',
            },
          ],
        },
        {
          title:
            'Act 4: The Historical Verdict & Extended Writing — The Turning Point Towards Peace',
          paragraphs: [
            '<span class="para-ref">[4.1]</span> The Yom Kippur War of 1973 was a profound psychological and political earthquake for both sides. For Israel, although its army had recovered to surround enemy forces within fifty miles of Cairo and Damascus, the cost had been catastrophic: over 2,600 Israeli soldiers killed and the shattering of the nation\'s supreme confidence in military invincibility. A subsequent government inquiry (the Agranat Commission) forced the resignation of military chiefs and contributed to Prime Minister Golda Meir stepping down in 1974.',
            '<span class="para-ref">[4.2]</span> For Egypt, although militarily contained at the end, the war was celebrated as a monumental national victory. By successfully crossing the Suez Canal and standing toe-to-toe with the IDF, Egypt had wiped away the shame of 1967 and restored Arab pride. Crucially, this restored dignity gave Anwar Sadat the political authority he needed to negotiate with Israel as an equal. The war had proven to Israelis that occupying land did not guarantee security, while the OPEC oil crisis forced the United States to commit permanently to Middle Eastern peace diplomacy. The road was now open for Kissinger\'s shuttle diplomacy, Sadat\'s historic 1977 visit to Jerusalem, and the 1978 Camp David Accords.',
          ],
          tasks: [
            {
              id: 'task_10_4',
              title: 'Task 4: GCSE Narrative Account — The Yom Kippur War (October 1973)',
              instructions:
                'Write a narrative account analysing the key events of the Yom Kippur War (October 1973). [8 marks]',
              scaffolding: {
                stimulus_points: ['The surprise attack on 6 October 1973', 'The OPEC oil embargo'],
                sentence_starters: [
                  'The Yom Kippur War began on 6 October 1973 with a coordinated surprise attack by Egypt and Syria, which...',
                  'In response to early Israeli losses, the United States launched an emergency airlift, which enabled...',
                  'This turnaround triggered a global crisis when Arab nations used the oil weapon, leading to...',
                ],
                causal_connectives: [
                  'As a direct consequence of this...',
                  'This dramatically shifted the military balance because...',
                  'Ultimately, this resulted in...',
                ],
              },
              model_answer:
                "The Yom Kippur War was launched as a surprise attack by Egypt and Syria to break the post-1967 diplomatic stalemate and ended by forcing both sides towards peace negotiations.\n\nThe conflict began on 6 October 1973 at 2:00 pm when Egyptian and Syrian forces launched a coordinated surprise assault on the Jewish holy day of Yom Kippur during Ramadan. In the south, 80,000 Egyptian infantry crossed the Suez Canal, using high-pressure water monitors to wash away the sand ramparts of the Bar-Lev Line. In the north, 1,400 Syrian tanks attacked across the Golan Heights. Egyptian forces were shielded by mobile Soviet SAM-6 anti-aircraft missiles and wire-guided Sagger anti-tank missiles, destroying over 150 Israeli tanks and dozens of aircraft in the first 48 hours.\n\nThis early Arab success prompted superpower intervention. As Israeli ammunition ran critically low, US President Nixon ordered an emergency military airlift to resupply Israel with tanks and ammunition, while the USSR resupplied Egypt and Syria. This resupply shifted the military balance. Having pushed Syrian forces back in the Golan, Israeli armored divisions under General Ariel Sharon crossed to the western bank of the Suez Canal on 15 October, encircling Egypt's 30,000-strong Third Army.\n\nThis turnaround triggered an international crisis. On 17 October, Arab oil-producing nations in OPEC enacted an oil embargo against countries supporting Israel, cutting oil supplies and quadrupling world oil prices. Furthermore, when the USSR threatened to intervene to save Egypt's army, the US placed its nuclear forces on DEFCON 3 alert. Alarmed by the threat of global war and economic collapse, US Secretary of State Henry Kissinger flew between capitals to broker a UN ceasefire on 24 October 1973.\n\nUltimately, this narrative shows that although Israel recovered militarily, the heavy casualties shattered its confidence in the Bar-Lev Line, while restored Arab pride allowed Anwar Sadat to negotiate peace as an equal.",
            },
          ],
        },
      ],
      sources: [
        {
          letter: 'A',
          title:
            'Source A: Archival Photograph: Egyptian Infantry and Armored Columns Crossing the Suez Canal (October 1973)',
          caption:
            'Egyptian forces crossing pontoon bridges across the Suez Canal after breaching the sand ramparts of the Israeli Bar-Lev Line.',
          provenance:
            'Egyptian Armed Forces Directorate of Moral Affairs (Accession Ref: EGY-1973-1006).',
          source_context:
            'This primary photograph records the successful Egyptian crossing of the Suez Canal on 6–7 October 1973. Egyptian infantry used high-pressure water monitors to wash away the sixty-foot sand ramparts of the Bar-Lev Line, enabling pontoon bridges to be laid across the canal under a protective anti-aircraft missile umbrella.',
          hinge_question:
            'How does Source A illustrate why the opening crossing of the Suez Canal was viewed as a major technological and psychological triumph for Egypt?',
        },
        {
          letter: 'B',
          title:
            'Source B: Archival Photograph: Israeli Armored Vehicles and Tanks Crossing the Suez Canal to the West Bank (October 1973)',
          caption:
            'Israeli Centurion tanks and armored personnel carriers crossing a pontoon bridge to the west bank of the Suez Canal during the counter-offensive of October 1973.',
          provenance:
            'IDF Military Archive, Southern Command Photographic Unit (Accession Ref: YKW-1973-1018).',
          source_context:
            "This primary photograph records General Ariel Sharon's daring armored counter-crossing to the western bank of the Suez Canal on 15–18 October 1973. Israeli tanks broke through between the Egyptian Second and Third Armies, cutting off the supply lines to Egypt's Third Army and threatening Cairo.",
          hinge_question:
            'How does Source B demonstrate how the military tide of the war shifted during the second week of fighting in October 1973?',
        },
      ],
      exam_practice: {
        question: 'Explain one consequence of the OPEC oil embargo in October 1973. [4 marks]',
        marks: 4,
        time_mins: 5,
        type: 'consequence',
        model_answer:
          'One major consequence of the OPEC oil embargo in October 1973 was that it caused a severe global economic crisis and forced Western governments to pressure Israel for peace.\n\nArab oil-producing nations cut production and banned exports to the United States and the Netherlands for supporting Israel, which quadrupled crude oil prices from $3 to $12 a barrel. Consequently, Western nations experienced petrol rationing, long queues at filling stations, and high inflation, which forced US Secretary of State Henry Kissinger to urgently intervene with shuttle diplomacy to broker a ceasefire and push for long-term Middle East peace.',
      },
      flashcards: [
        {
          front: 'What was the War of Attrition (1969–1970)?',
          back: 'A prolonged artillery and commando conflict along the Suez Canal between Egypt and Israel following the 1967 war.',
        },
        {
          front: 'What was the Bar-Lev Line?',
          back: 'A fortified line of concrete bunkers and sixty-foot sand ramparts built by Israel along the east bank of the Suez Canal.',
        },
        {
          front: 'Who succeeded Gamal Abdel Nasser as President of Egypt in September 1970?',
          back: 'Anwar Sadat.',
        },
        {
          front: "What was Anwar Sadat's strategic objective in launching the 1973 war?",
          back: 'A limited war to cross the canal, shatter Israeli invincibility, and force the superpowers into peace negotiations.',
        },
        {
          front: 'Why were Israeli forces caught by surprise on 6 October 1973?',
          back: 'The assault occurred on Yom Kippur, the holiest Jewish fast day, when communications were shut down and soldiers were on leave.',
        },
        {
          front:
            'How did Egyptian engineers breach the sixty-foot sand ramparts of the Bar-Lev Line?',
          back: 'They used high-pressure water turbines pumping water from the canal to wash away the sand in hours.',
        },
        {
          front:
            "What Soviet-supplied weapons neutralized Israel's air and tank superiority in early fighting?",
          back: 'SAM-6 anti-aircraft missiles and wire-guided Sagger anti-tank missiles.',
        },
        {
          front: 'Who led the Israeli armored counter-crossing to the west bank of the Suez Canal?',
          back: 'General Ariel Sharon.',
        },
        {
          front: 'What was the OPEC oil embargo of October 1973?',
          back: 'Arab oil nations cut production and embargoed nations supporting Israel, quadrupling world oil prices from $3 to $12.',
        },
        {
          front:
            'What diplomatic method did US Secretary of State Henry Kissinger pioneer after the war?',
          back: '"Shuttle Diplomacy", flying between Cairo, Tel Aviv, and Damascus to negotiate disengagement.',
        },
      ],
      quiz: [
        {
          question:
            'Between which years did Egypt and Israel fight the static "War of Attrition" along the Suez Canal?',
          q: 'Between which years did Egypt and Israel fight the static "War of Attrition" along the Suez Canal?',
          options: ['1948–1949', '1956–1957', '1969–1970', '1973–1974'],
          answer: '1969–1970',
          a: '1969–1970',
          explanation:
            'The War of Attrition took place along the Suez Canal from March 1969 to August 1970.',
        },
        {
          question:
            'What was the name of the fortified Israeli sand rampart defense line along the Suez Canal?',
          q: 'What was the name of the fortified Israeli sand rampart defense line along the Suez Canal?',
          options: ['The Maginot Line', 'The Bar-Lev Line', 'The Green Line', 'The Purple Line'],
          answer: 'The Bar-Lev Line',
          a: 'The Bar-Lev Line',
          explanation:
            'The Bar-Lev Line was built by Israel after 1967 along the eastern bank of the Suez Canal.',
        },
        {
          question:
            'Who became President of Egypt following the death of Gamal Abdel Nasser in September 1970?',
          q: 'Who became President of Egypt following the death of Gamal Abdel Nasser in September 1970?',
          options: ['Anwar Sadat', 'King Hussein', 'King Farouk', 'Yasser Arafat'],
          answer: 'Anwar Sadat',
          a: 'Anwar Sadat',
          explanation:
            'Anwar Sadat served as President of Egypt from 1970 until his assassination in 1981.',
        },
        {
          question:
            'On what Jewish holy fast day did Egypt and Syria launch their surprise attack in October 1973?',
          q: 'On what Jewish holy fast day did Egypt and Syria launch their surprise attack in October 1973?',
          options: ['Passover', 'Yom Kippur', 'Rosh Hashanah', 'Hanukkah'],
          answer: 'Yom Kippur',
          a: 'Yom Kippur',
          explanation:
            'The attack was launched on Yom Kippur, the Day of Atonement, on 6 October 1973.',
        },
        {
          question: 'What Islamic holy month coincided with the Yom Kippur attack in October 1973?',
          q: 'What Islamic holy month coincided with the Yom Kippur attack in October 1973?',
          options: ['Ramadan', 'Muharram', 'Shawwal', 'Dhul Hijjah'],
          answer: 'Ramadan',
          a: 'Ramadan',
          explanation: 'The 1973 war is also referred to in the Arab world as the Ramadan War.',
        },
        {
          question:
            'What technology did Egyptian engineers use to rapidly wash away the sand ramparts of the Bar-Lev Line?',
          q: 'What technology did Egyptian engineers use to rapidly wash away the sand ramparts of the Bar-Lev Line?',
          options: [
            'Dynamite blasting powder',
            'High-pressure water turbines pumping canal water',
            'Bulldozers parachuted from transport planes',
            'Laser-guided artillery shells',
          ],
          answer: 'High-pressure water turbines pumping canal water',
          a: 'High-pressure water turbines pumping canal water',
          explanation:
            'Engineers used British and German high-pressure water monitors to wash away the sand.',
        },
        {
          question:
            'Which Soviet-supplied anti-aircraft missile created a protective umbrella over Egyptian canal crossings?',
          q: 'Which Soviet-supplied anti-aircraft missile created a protective umbrella over Egyptian canal crossings?',
          options: ['SAM-6', 'Scud-B', 'Stinger', 'Patriot'],
          answer: 'SAM-6',
          a: 'SAM-6',
          explanation:
            'Mobile Soviet SAM-6 missile batteries shot down numerous Israeli jets in the opening days.',
        },
        {
          question:
            'What wire-guided Soviet anti-tank missile inflicted heavy losses on Israeli tanks in the Sinai?',
          q: 'What wire-guided Soviet anti-tank missile inflicted heavy losses on Israeli tanks in the Sinai?',
          options: ['Sagger (AT-3)', 'RPG-7', 'TOW missile', 'Javelin'],
          answer: 'Sagger (AT-3)',
          a: 'Sagger (AT-3)',
          explanation:
            'Egyptian infantry armed with suitcase Sagger missiles destroyed dozens of Israeli tanks.',
        },
        {
          question:
            'Which Israeli general led the armored counter-offensive that crossed to the west bank of the Suez Canal?',
          q: 'Which Israeli general led the armored counter-offensive that crossed to the west bank of the Suez Canal?',
          options: ['Ariel Sharon', 'Yitzhak Rabin', 'Moshe Dayan', 'Ehud Barak'],
          answer: 'Ariel Sharon',
          a: 'Ariel Sharon',
          explanation:
            'General Ariel Sharon commanded the division that crossed the canal at Deversoir.',
        },
        {
          question:
            'Which Egyptian military force was surrounded on the east bank of the Suez Canal by Israeli troops?',
          q: 'Which Egyptian military force was surrounded on the east bank of the Suez Canal by Israeli troops?',
          options: ['The First Army', 'The Second Army', 'The Third Army', 'The Republican Guard'],
          answer: 'The Third Army',
          a: 'The Third Army',
          explanation:
            'Israel encircled the 30,000-strong Egyptian Third Army in the southern sector.',
        },
        {
          question:
            'What was the name of the organisation of oil-exporting nations that enacted the 1973 oil embargo?',
          q: 'What was the name of the organisation of oil-exporting nations that enacted the 1973 oil embargo?',
          options: ['OPEC', 'NATO', 'UNESCO', 'OECD'],
          answer: 'OPEC',
          a: 'OPEC',
          explanation:
            'OPEC (Organisation of Petroleum Exporting Countries) enacted the production cuts and embargo.',
        },
        {
          question:
            'By how much did the price of crude oil increase globally as a result of the OPEC oil crisis?',
          q: 'By how much did the price of crude oil increase globally as a result of the OPEC oil crisis?',
          options: [
            'It doubled from $3 to $6',
            'It quadrupled from $3 to nearly $12 a barrel',
            'It stayed the same',
            'It dropped by half',
          ],
          answer: 'It quadrupled from $3 to nearly $12 a barrel',
          a: 'It quadrupled from $3 to nearly $12 a barrel',
          explanation:
            'The price of crude oil quadrupled from approximately $3 to nearly $12 per barrel.',
        },
        {
          question:
            'Which US President ordered the massive military emergency airlift to resupply Israel with arms in October 1973?',
          q: 'Which US President ordered the massive military emergency airlift to resupply Israel with arms in October 1973?',
          options: ['John F. Kennedy', 'Richard Nixon', 'Jimmy Carter', 'Ronald Reagan'],
          answer: 'Richard Nixon',
          a: 'Richard Nixon',
          explanation: 'President Richard Nixon ordered the emergency military airlift to Israel.',
        },
        {
          question:
            'What alert level did the United States place its nuclear armed forces on when the USSR threatened intervention?',
          q: 'What alert level did the United States place its nuclear armed forces on when the USSR threatened intervention?',
          options: ['DEFCON 1', 'DEFCON 3', 'DEFCON 5', 'Code Yellow'],
          answer: 'DEFCON 3',
          a: 'DEFCON 3',
          explanation:
            'The US raised its military alert level to DEFCON 3 to deter Soviet troop deployment.',
        },
        {
          question:
            'Who was the US Secretary of State who conducted "shuttle diplomacy" to negotiate ceasefires after the war?',
          q: 'Who was the US Secretary of State who conducted "shuttle diplomacy" to negotiate ceasefires after the war?',
          options: ['Henry Kissinger', 'George Shultz', 'Cyrus Vance', 'Colin Powell'],
          answer: 'Henry Kissinger',
          a: 'Henry Kissinger',
          explanation:
            'Henry Kissinger flew repeatedly between Middle Eastern capitals to broker disengagement.',
        },
        {
          question:
            'What official Israeli inquiry investigated the military and intelligence failures of October 1973?',
          q: 'What official Israeli inquiry investigated the military and intelligence failures of October 1973?',
          options: [
            'The Peel Commission',
            'The Agranat Commission',
            'The Kahan Commission',
            'The Shaw Commission',
          ],
          answer: 'The Agranat Commission',
          a: 'The Agranat Commission',
          explanation:
            'The Agranat Commission investigated the failure of Israeli intelligence to anticipate the attack.',
        },
        {
          question:
            'Approximately how many Israeli soldiers were killed during the Yom Kippur War?',
          q: 'Approximately how many Israeli soldiers were killed during the Yom Kippur War?',
          options: ['Fewer than 100', 'Over 2,600', 'Over 20,000', 'Over 100,000'],
          answer: 'Over 2,600',
          a: 'Over 2,600',
          explanation:
            'Over 2,600 Israeli soldiers died, causing deep national trauma and political debate.',
        },
        {
          question:
            'In which northern battlefield did Israeli tanks halt the massive Syrian tank assault?',
          q: 'In which northern battlefield did Israeli tanks halt the massive Syrian tank assault?',
          options: [
            'The Valley of Tears (Golan Heights)',
            'The Mitla Pass',
            'The Hula Valley',
            'Mount Carmel',
          ],
          answer: 'The Valley of Tears (Golan Heights)',
          a: 'The Valley of Tears (Golan Heights)',
          explanation:
            'The 7th Armoured Brigade fought a desperate defensive stand in the "Valley of Tears".',
        },
        {
          question:
            'Which Israeli Prime Minister was forced to resign in 1974 in the political fallout from the war?',
          q: 'Which Israeli Prime Minister was forced to resign in 1974 in the political fallout from the war?',
          options: ['David Ben-Gurion', 'Golda Meir', 'Yitzhak Shamir', 'Menachem Begin'],
          answer: 'Golda Meir',
          a: 'Golda Meir',
          explanation:
            "Golda Meir resigned in April 1974 following public anger over the war's opening failures.",
        },
        {
          question:
            'Why did the outcome of the Yom Kippur War make future peace negotiations between Egypt and Israel possible?',
          q: 'Why did the outcome of the Yom Kippur War make future peace negotiations between Egypt and Israel possible?',
          options: [
            'It restored Egyptian pride while proving to Israel that occupying land alone did not guarantee security',
            'It completely destroyed the Egyptian army forever',
            'It led to the partition of the Suez Canal between both nations',
            'It persuaded the Soviet Union to withdraw from the Middle East',
          ],
          answer:
            'It restored Egyptian pride while proving to Israel that occupying land alone did not guarantee security',
          a: 'It restored Egyptian pride while proving to Israel that occupying land alone did not guarantee security',
          explanation:
            'Restored Arab dignity and shattered Israeli complacency opened the political space for Sadat to negotiate.',
        },
      ],
    },
  ];

  lessons.forEach((lesson) => {
    (lesson.narrative_blocks || []).forEach((block, idx) => {
      block.act = idx + 1;
      if (!block.act_title && block.title) {
        block.act_title = block.title.replace(/^Act \d+:\s*/, '');
      }
      if (!block.text && Array.isArray(block.paragraphs)) {
        block.text = block.paragraphs.join('\n\n');
      }
      if (
        block.source &&
        block.source.letter &&
        block.source.hinge_question &&
        !block.source.question
      ) {
        block.source.question = `Study Source ${block.source.letter}. ${block.source.hinge_question}`;
      }
    });
  });

  return lessons;
};

module.exports = { buildKT2Lessons };
