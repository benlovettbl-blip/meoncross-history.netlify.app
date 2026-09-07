const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../units/cme_new/data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// ============================================================================
// 1. LESSON 1: FOUNDATIONAL GEOGRAPHY & GEOPOLITICS
// ============================================================================

// 1.1 Update Lesson 1 Do Now to test true prior knowledge (KS3 / WW1 / Empires)
const oldL1DoNow = `        type: 'questions',
        title: 'Geopolitical & Spatial Recall (Prior Knowledge)',
        instructions:
          'Answer these questions in full sentences based on your prior learning of Middle Eastern geography.',
        items: [
          {
            question:
              'Which three continents intersect at the Middle East, making it a critical strategic crossroads throughout world history?',
            answer: 'Europe, Asia, and Africa.',
          },
          {
            question:
              'What vital maritime waterway, completed in 1869 across Egypt, connects the Mediterranean Sea directly to the Red Sea?',
            answer: 'The Suez Canal.',
          },
          {
            question:
              'What narrow body of water at the southern tip of the Sinai Peninsula controls maritime access to the Gulf of Aqaba and Israel’s southern port of Eilat?',
            answer: 'The Straits of Tiran.',
          },
          {
            question:
              'Which elevated volcanic plateau in south-western Syria directly overlooks the Sea of Galilee and northern Israeli civilian settlements?',
            answer: 'The Golan Heights.',
          },
          {
            question:
              'Which freshwater river forms the natural eastern boundary of the West Bank, flowing south from the Sea of Galilee into the Dead Sea?',
            answer: 'The River Jordan.',
          },
          {
            question:
              'Which ancient city is considered a sacred holy sanctuary by Jews, Christians, and Muslims, and claimed as a capital by both Israelis and Palestinians?',
            answer: 'Jerusalem.',
          },
          {
            question:
              'Which vast triangular desert peninsula connecting Africa to Asia served as a major military buffer zone between Egypt and Israel?',
            answer: 'The Sinai Peninsula.',
          },
          {
            question:
              'What secret agreement in May 1916 saw British and French diplomats use a ruler to carve the collapsing Ottoman Empire into European spheres of influence?',
            answer: 'The Sykes-Picot Agreement.',
          },
          {
            question:
              'What official British letter in November 1917 promised British support for the establishment of a "national home for the Jewish people" in Palestine?',
            answer: 'The Balfour Declaration.',
          },
          {
            question:
              'Why is military control of "high ground" like the Golan Heights considered an indispensable defense asset in modern warfare?',
            answer:
              'It provides commanding sightlines for artillery, radar early warning, and tactical defense against land invasions.',
          },
        ],`;

const newL1DoNow = `        type: 'questions',
        title: 'Prior Knowledge Recall: World War I, Empires & The Middle East',
        instructions:
          'Answer these recall questions in full sentences based on your prior learning of modern world history and 20th-century empires.',
        items: [
          {
            question:
              'Which vast Islamic imperial power ruled the Middle East, North Africa, and southeastern Europe for over four centuries prior to 1914?',
            answer: 'The Ottoman Empire (ruled from Constantinople/Istanbul).',
          },
          {
            question:
              'In which year did the First World War break out across Europe and the wider world?',
            answer: '1914.',
          },
          {
            question:
              'Which European global power established military control over Egypt in 1882 to safeguard its strategic trade route to India?',
            answer: 'Great Britain.',
          },
          {
            question:
              'What vital man-made maritime canal, completed in Egypt in 1869, links the Mediterranean Sea directly to the Red Sea?',
            answer: 'The Suez Canal.',
          },
          {
            question:
              'What historical term describes hostility, prejudice, or violent discrimination directed specifically against Jewish people?',
            answer: 'Anti-Semitism.',
          },
          {
            question:
              'What political nationalist movement was founded by Theodor Herzl in 1896 aiming to establish a sovereign Jewish homeland in Palestine?',
            answer: 'Zionism.',
          },
          {
            question:
              'Which international organisation was created in 1919 after WW1 to promote global peace and supervise former imperial territories as "mandates"?',
            answer: 'The League of Nations.',
          },
          {
            question:
              'Which vital natural fossil fuel became the supreme industrial and military resource driving 20th-century superpower interest in the Middle East?',
            answer: 'Petroleum (crude oil).',
          },
          {
            question:
              'Which two major European allied powers emerged victorious from World War One and subsequently partitioned the Middle East?',
            answer: 'Great Britain and France.',
          },
          {
            question:
              'What geographical term is used to describe a narrow maritime passageway (such as a strait or canal) that can be easily blockaded to halt trade and provoke war?',
            answer: 'A strategic chokepoint.',
          },
        ],`;

content = content.replace(oldL1DoNow, newL1DoNow);

// 1.2 Update Lesson 1 Narrative Tasks: add matching choke points, comparison table for promises, source detective for Sykes-Picot map, and bold paragraph signposts
const oldL1B1Tasks = `          tasks: [
            {
              type: 'comprehension',
              question:
                'Explain why the Sykes-Picot Agreement and League of Nations mandates created artificial borders in the Middle East.',
              model:
                'The Sykes-Picot Agreement created artificial borders because British and French diplomats divided the collapsed Ottoman Empire according to European imperial and strategic interests rather than local realities. They drew arbitrary straight lines across desert maps without consulting the indigenous populations, grouping rival religious sects and distinct tribes into newly fabricated states while splitting historic communities across national frontiers.',
            },
          ],`;

const newL1B1Tasks = `          tasks: [
            {
              type: 'comprehension',
              question:
                'Explain why the Sykes-Picot Agreement and League of Nations mandates created artificial borders in the Middle East.',
              model:
                'The Sykes-Picot Agreement created artificial borders because British and French diplomats divided the collapsed Ottoman Empire according to European imperial and strategic interests rather than local realities. They drew arbitrary straight lines across desert maps without consulting the indigenous populations, grouping rival religious sects and distinct tribes into newly fabricated states while splitting historic communities across national frontiers.',
            },
            {
              type: 'written',
              text:
                'Source Detective: Study the 1916 Sykes-Picot Agreement map above. What does the straight pencil line drawn between the British and French zones reveal about European imperial priorities versus on-the-ground ethnic and religious realities?',
              model:
                'The straight pencil line drawn across the Syrian desert demonstrates that European diplomats prioritized dividing imperial assets (railways, ports, oil pipeline access) rather than respecting existing ethnic, religious, or tribal groupings. By drawing arbitrary straight lines across nomadic and sectarian communities, Britain and France grouped rival populations into artificial states, creating enduring political instability.',
            },
          ],`;

content = content.replace(oldL1B1Tasks, newL1B1Tasks);

const oldL1B2Tasks = `          tasks: [
            {
              type: 'comprehension',
              question:
                'Explain the fundamental contradiction between the McMahon-Hussein Correspondence and the Balfour Declaration.',
              model:
                'The fundamental contradiction was that Britain pledged the same territory to two opposing nationalist movements. Through the McMahon-Hussein Correspondence, Arab leaders were led to believe Britain would support an independent Arab kingdom including Palestine in reward for fighting the Ottomans. However, the Balfour Declaration officially promised British backing for a Jewish national home in Palestine, ignoring the political self-determination of the existing 90% Arab majority.',
            },
          ],`;

const newL1B2Tasks = `          tasks: [
            {
              type: 'table_planner',
              text:
                'Diplomatic Contradictions Matrix: Complete the comparative planner analyzing the three conflicting British wartime pledges during World War One:',
              columns: [
                'Wartime Agreement',
                'Date & Key Signatories',
                'Recipient & British Commitment',
                'Why It Contradicted Other Pledges',
              ],
              rows: 3,
            },
            {
              type: 'comprehension',
              question:
                'Explain the fundamental contradiction between the McMahon-Hussein Correspondence and the Balfour Declaration.',
              model:
                'The fundamental contradiction was that Britain pledged the same territory to two opposing nationalist movements. Through the McMahon-Hussein Correspondence, Arab leaders were led to believe Britain would support an independent Arab kingdom including Palestine in reward for fighting the Ottomans. However, the Balfour Declaration officially promised British backing for a Jewish national home in Palestine, ignoring the political self-determination of the existing 90% Arab majority.',
            },
          ],`;

content = content.replace(oldL1B2Tasks, newL1B2Tasks);

const oldL1B3Tasks = `          tasks: [
            {
              type: 'comprehension',
              question:
                'Why were the Golan Heights and the Straits of Tiran of supreme strategic importance in the Arab-Israeli wars?',
              model:
                "The Golan Heights were strategically vital because their high elevation gave Syrian artillery commanding sightlines to shell civilian Israeli settlements across the Galilee plain, making capture of the high plateau essential for Israeli border security. The Straits of Tiran were crucial because they represented Israel's only southern maritime corridor to the Red Sea and global oil supplies; when Egypt closed this chokepoint in 1967, it severed Israel's trade lifeline and triggered the Six-Day War.",
            },
          ],`;

const newL1B3Tasks = `          tasks: [
            {
              type: 'matching',
              text:
                'Strategic Flashpoints & Chokepoints: Match each critical geographic flashpoint on the left with its decisive military significance on the right:',
              pairs: [
                {
                  left: '1. The Straits of Tiran (Gulf of Aqaba)',
                  right:
                    "Israel's only southern maritime corridor for oil imports; its blockade by Egypt in 1956 and 1967 constituted an immediate act of war.",
                },
                {
                  left: '2. The Golan Heights (South-western Syria)',
                  right:
                    'Elevated volcanic plateau giving Syrian artillery commanding sightlines to bombard civilian Israeli settlements across the Galilee plain.',
                },
                {
                  left: '3. The Suez Canal (Egypt)',
                  right:
                    'Vital 120-mile maritime artery connecting the Mediterranean to the Red Sea, cutting 5,000 miles off trade routes between Europe and Asia.',
                },
                {
                  left: '4. The River Jordan & West Bank Ridge',
                  right:
                    'Natural freshwater boundary and strategic mountain ridge providing essential defensive depth against ground invasion from the east.',
                },
              ],
            },
            {
              type: 'comprehension',
              question:
                'Why were the Golan Heights and the Straits of Tiran of supreme strategic importance in the Arab-Israeli wars?',
              model:
                "The Golan Heights were strategically vital because their high elevation gave Syrian artillery commanding sightlines to shell civilian Israeli settlements across the Galilee plain, making capture of the high plateau essential for Israeli border security. The Straits of Tiran were crucial because they represented Israel's only southern maritime corridor to the Red Sea and global oil supplies; when Egypt closed this chokepoint in 1967, it severed Israel's trade lifeline and triggered the Six-Day War.",
            },
          ],`;

content = content.replace(oldL1B3Tasks, newL1B3Tasks);

// 1.3 Add Exit Ticket to Lesson 1 (Rotated Evaluative Ranking Ladder)
const oldL1Consolidation = `      consolidation: 'Why is the geography of the Middle East so geopolitically important?',`;
const newL1Consolidation = `      consolidation: 'Why is the geography of the Middle East so geopolitically important?',
      exit_ticket: {
        type: 'ranking_ladder',
        type_label: 'Exit Ticket · Evaluative Ranking Ladder',
        title: 'Exit Ticket: The Geopolitical Priority Verdict',
        prompt:
          'Which foundational factor studied today created the greatest long-term obstacle to peace in the Middle East? Rank them from 1 (Most Destabilising) to 3 (Least Destabilising) and justify your #1 rank:',
        options: [
          'Factor A: Contradictory Imperial Pledges (McMahon-Hussein Correspondence vs Balfour Declaration vs Sykes-Picot).',
          'Factor B: Artificial Borders & Mandates (European straight-line borders dividing historic ethnic and religious communities).',
          'Factor C: Strategic Chokepoints & Topography (vulnerability around the Straits of Tiran, Golan Heights, and Suez Canal).',
        ],
        guidance:
          'State your #1 factor and write 2-3 structured sentences using precise historical vocabulary (e.g., mandate, sovereignty, buffer zone, casus belli) to justify your choice.',
      },`;

content = content.replace(oldL1Consolidation, newL1Consolidation);

// ============================================================================
// 2. LESSON 2: THE END OF THE BRITISH MANDATE & CREATION OF ISRAEL (1945–49)
// ============================================================================

// 2.1 Replace Lesson 2 Block 3 task with interactive sorting task for Jewish Insurgency
const oldL2B3Task = `          tasks: [
            {
              type: 'written',
              text: "What was the 'Jewish Insurgency' and which three Zionist groups united to launch it? (P3)",
              model:
                'The Jewish Insurgency was a coordinated, violent campaign against British rule in Palestine. It was led by the moderate Haganah, working alongside the extreme paramilitary splinter groups: the Irgun and the Lehi.',
            },
          ],`;

const newL2B3Task = `          tasks: [
            {
              type: 'sorting',
              text:
                "Chronological Causal Sequence: Order the following 5 key developments leading to the British decision to abandon Palestine from 1 (Earliest) to 5 (Latest):",
              events: [
                "Ernest Bevin imposes a strict monthly quota of 1,500 Jewish immigrants to appease oil-rich Arab allies.",
                "The Haganah, Irgun, and Lehi form the United Resistance Movement to launch coordinated sabotage against British military infrastructure.",
                "The Irgun detonates explosives in the King David Hotel, destroying the British Mandate headquarters and killing 91 people.",
                "The Royal Navy boards the SS Exodus and forcibly returns 4,500 Holocaust survivors to displaced persons camps in Europe.",
                "Faced with public outrage over the 'Sergeants Affair' and a £100m annual policing cost, Britain hands Palestine to the United Nations."
              ],
            },
            {
              type: 'written',
              text: "What was the 'Jewish Insurgency' and which three Zionist groups united to launch it? (P3)",
              model:
                'The Jewish Insurgency was a coordinated, violent campaign against British rule in Palestine. It was led by the moderate Haganah, working alongside the extreme paramilitary splinter groups: the Irgun and the Lehi.',
            },
          ],`;

content = content.replace(oldL2B3Task, newL2B3Task);

// 2.2 Enhance Lesson 2 Block 6 with UN Partition Plan Table Planner
const oldL2B6Task = `          tasks: [
            {
              type: 'written',
              text: 'How did the United Nations Partition Plan (Resolution 181) divide the land of Palestine, and what was the reaction of the two communities? (P6)',
              model:
                'Resolution 181 allocated 55% of Palestine to the Jewish population and 45% to the Arab majority, with Jerusalem as an international zone. The Zionist leadership accepted the plan with joy, while Arab leaders vehemently rejected it and vowed to fight to prevent the partition of their homeland.',
            },
          ],`;

const newL2B6Task = `          tasks: [
            {
              type: 'table_planner',
              text:
                'UN Resolution 181 Partition Matrix: Complete the comparative table below analyzing the territorial allocations and reactions to the 1947 UN Partition Plan:',
              columns: [
                'Dimension',
                'Proposed Jewish State',
                'Proposed Arab State',
                'City of Jerusalem (Corpus Separatum)',
              ],
              rows: 3,
            },
            {
              type: 'written',
              text: 'How did the United Nations Partition Plan (Resolution 181) divide the land of Palestine, and what was the reaction of the two communities? (P6)',
              model:
                'Resolution 181 allocated 55% of Palestine to the Jewish population and 45% to the Arab majority, with Jerusalem as an international zone. The Zionist leadership accepted the plan with joy, while Arab leaders vehemently rejected it and vowed to fight to prevent the partition of their homeland.',
            },
          ],`;

content = content.replace(oldL2B6Task, newL2B6Task);

// ============================================================================
// 3. LESSON 3: AFTERMATH OF 1948–49 WAR & REFUGEE CRISIS
// ============================================================================

// 3.1 Enhance Lesson 3 Block 2 with Territorial Transformation Table Planner
const oldL3B2Task = `          tasks: [
            {
              type: 'written',
              text: 'What happened to the remaining portions of mandate Palestine (the West Bank and Gaza Strip) following the 1948-49 war? (P2)',
              model:
                'The West Bank and East Jerusalem were occupied and annexed by King Abdullah of Transjordan, while the Gaza Strip was placed under the military and administrative control of Egypt.',
            },
          ],`;

const newL3B2Task = `          tasks: [
            {
              type: 'table_planner',
              text:
                'Territorial Transformation Matrix: Complete the table comparing the 1947 UN Partition Plan boundaries with the actual 1949 Armistice (Green Line) outcomes:',
              columns: [
                'Territory / Region',
                'Allocated Under UN 181 (1947)',
                'Actual Outcome Under 1949 Armistice',
                'Controlling Authority after 1949',
              ],
              rows: 4,
            },
            {
              type: 'written',
              text: 'What happened to the remaining portions of mandate Palestine (the West Bank and Gaza Strip) following the 1948-49 war? (P2)',
              model:
                'The West Bank and East Jerusalem were occupied and annexed by King Abdullah of Transjordan, while the Gaza Strip was placed under the military and administrative control of Egypt.',
            },
          ],`;

content = content.replace(oldL3B2Task, newL3B2Task);

// 3.2 Enhance Lesson 3 Block 4 with Refugee Deadlock Table Planner
const oldL3B4Task = `          tasks: [
            {
              type: 'written',
              text: 'Why did both Israel and the Arab host states refuse to permanently integrate the Palestinian refugees into their societies? (P4)',
              model:
                'Israel refused to allow refugees to return because it would destroy the Jewish majority and compromise national security. Arab states refused to integrate them to keep permanent diplomatic and moral pressure on Israel to honor the right of return.',
            },
          ],`;

const newL3B4Task = `          tasks: [
            {
              type: 'table_planner',
              text:
                'The Refugee Deadlock Matrix: Complete the table analyzing the opposing policies and rationales regarding the displaced Palestinian refugees:',
              columns: [
                'Key Actor',
                'Official Policy on Palestinian Refugees',
                'Strategic & Political Rationale',
              ],
              rows: 3,
            },
            {
              type: 'written',
              text: 'Why did both Israel and the Arab host states refuse to permanently integrate the Palestinian refugees into their societies? (P4)',
              model:
                'Israel refused to allow refugees to return because it would destroy the Jewish majority and compromise national security. Arab states refused to integrate them to keep permanent diplomatic and moral pressure on Israel to honor the right of return.',
            },
          ],`;

content = content.replace(oldL3B4Task, newL3B4Task);

// 3.3 Replace duplicated question in Lesson 3 Block 10 with focused Edexcel 4-mark consequence drill on Fedayeen/Reprisals
const oldL3B10Task = `          tasks: [
            {
              type: 'written',
              text: 'How did David Ben-Gurion attempt to deter Fedayeen border raids, and what was the consequence? (P10)',
              model:
                'Ben-Gurion implemented a severe reprisal policy, ordering the IDF to respond to every raid with disproportionate military force. This created an escalating border war that kept the region on the brink of conflict.',
            },
            {
              text: 'Explain one consequence of the territorial changes following the 1948–49 Arab-Israeli war. (4 marks)',
              model:
                'One consequence of the territorial changes following the 1948–49 Arab-Israeli War was the permanent displacement of the Palestinian Arab population and the creation of a massive refugee crisis. Prior to the war, the UN Partition Plan had allocated 45% of the land to a proposed Arab state; however, Israel\\'s military victory expanded its borders to cover 79% of mandate Palestine, while Jordan occupied and annexed the West Bank and Egypt took control of the Gaza Strip.\\n\\nAs a direct result of these territorial changes, over 700,000 Palestinian Arabs lost their homes and became stateless refugees. They were forced to resettle in squalid, overcrowded refugee camps managed by UNRWA in the Gaza Strip, West Bank, Jordan, and Lebanon, where they were denied the "right of return" by Israel, cementing a permanent humanitarian crisis that remains unresolved.',
            },
          ],`;

const newL3B10Task = `          tasks: [
            {
              type: 'written',
              text: 'How did David Ben-Gurion attempt to deter Fedayeen border raids, and what was the consequence? (P10)',
              model:
                'Ben-Gurion implemented a severe reprisal policy, ordering the IDF to respond to every raid with disproportionate military force. This created an escalating border war that kept the region on the brink of conflict.',
            },
            {
              type: 'written',
              text: 'Explain one consequence of the cross-border Fedayeen raids and Israeli reprisal policy between 1950 and 1955. (4 marks)',
              model:
                'One consequence of the Fedayeen border raids and Israeli reprisal policy was the rapid escalation of military tensions between Israel and Egypt, bringing both nations to the brink of war. Palestinian Fedayeen guerrillas based in the Egyptian-administered Gaza Strip launched regular sabotage attacks into southern Israel, killing civilians and mining roads. In response, Prime Minister David Ben-Gurion and General Moshe Dayan established an aggressive deterrence doctrine, launching disproportionate cross-border counter-strikes (such as the February 1955 Gaza Raid, which killed 38 Egyptian soldiers). Consequently, this cycle of violence humiliated Egypt’s military leadership and directly prompted President Nasser to seek advanced Soviet weaponry through the 1955 Czech Arms Deal.',
            },
          ],`;

content = content.replace(oldL3B10Task, newL3B10Task);

// ============================================================================
// 4. LESSON 4: INCREASED TENSION, NASSER & SUEZ CRISIS (1955–63)
// ============================================================================

// 4.1 Enhance Lesson 4 Block 8 with Protocol of Sèvres Collusion Table Planner
const oldL4B8Task = `          tasks: [
            {
              type: 'written',
              text: 'What was the secret Protocol of Sèvres in October 1956? (P8)',
              model:
                'It was a highly secret conspiracy between Britain, France, and Israel to plan a coordinated military intervention to overthrow Nasser and retake the Suez Canal.',
            },
          ],`;

const newL4B8Task = `          tasks: [
            {
              type: 'table_planner',
              text:
                'Protocol of Sèvres Collusion Matrix: Complete the table below analyzing the secret conspiracy forged between Britain, France, and Israel in October 1956:',
              columns: [
                'Conspiring Nation',
                'Key National Motive / Grievance',
                'Agreed Secret Role in Operation Kadesh',
              ],
              rows: 3,
            },
            {
              type: 'written',
              text: 'What was the secret Protocol of Sèvres in October 1956? (P8)',
              model:
                'It was a highly secret conspiracy between Britain, France, and Israel to plan a coordinated military intervention to overthrow Nasser and retake the Suez Canal.',
            },
          ],`;

content = content.replace(oldL4B8Task, newL4B8Task);

// 4.2 Enhance Lesson 4 Block 15 with Matching Task for Suez Legacies
const oldL4B15Task = `          tasks: [
            {
              type: 'written',
              text: 'Identify two vital security guarantees Israel received in exchange for withdrawing its forces from the Sinai Peninsula. (P15)',
              model:
                'First, the UN deployed peacekeepers (UNEF) along the Egyptian-Israeli border and at Sharm el-Sheikh. Second, the international community guaranteed free navigation for Israeli shipping through the Straits of Tiran.',
            },
          ],`;

const newL4B15Task = `          tasks: [
            {
              type: 'matching',
              text:
                'Legacies of the Suez Crisis: Match each decisive outcome of the 1956 Suez Crisis on the left with its long-term historical consequence on the right:',
              pairs: [
                {
                  left: '1. Stationing of UNEF peacekeepers in Sinai & Gaza',
                  right:
                    'Guaranteed Israeli maritime navigation through the Straits of Tiran and secured the southern border for 11 years until May 1967.',
                },
                {
                  left: '2. Total diplomatic and financial humiliation of Britain and France',
                  right:
                    'Signaled the permanent end of British and French imperial dominance and gunboat diplomacy in the Middle East.',
                },
                {
                  left: '3. Nasser retains sovereign control over the Suez Canal',
                  right:
                    'Transformed Gamal Abdel Nasser into the idolized, untouchable leader of Pan-Arab nationalism across the Arab world.',
                },
                {
                  left: '4. Formulation of the Eisenhower Doctrine (1957)',
                  right:
                    'Pledged direct American military and economic aid to any Middle Eastern state resisting armed communist aggression.',
                },
              ],
            },
            {
              type: 'written',
              text: 'Identify two vital security guarantees Israel received in exchange for withdrawing its forces from the Sinai Peninsula. (P15)',
              model:
                'First, the UN deployed peacekeepers (UNEF) along the Egyptian-Israeli border and at Sharm el-Sheikh. Second, the international community guaranteed free navigation for Israeli shipping through the Straits of Tiran.',
            },
          ],`;

content = content.replace(oldL4B15Task, newL4B15Task);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Successfully enriched Key Topic 1 questions in units/cme_new/data.js!');
