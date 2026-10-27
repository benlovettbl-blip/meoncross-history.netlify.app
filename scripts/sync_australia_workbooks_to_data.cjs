const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'australia', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/export\s+const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s+default\s+unitData;/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/australia/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const ausExamPractice = [
  // Lesson 1: Claiming Australia: Cook, Tupaia & Terra Nullius (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: Claiming Australia & Terra Nullius',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the British Empire claimed eastern Australia and declared it terra nullius between 1768 and 1788. [12 marks]',
        stimulus: [
          'Secret Admiralty instructions to locate the Great Southern Land',
          'Joseph Banks’s reports of Botany Bay and European property law'
        ],
        prompt: 'Explain three distinct causal reasons: geopolitical and naval rivalry in the Pacific following the Seven Years’ War, botanical and agricultural recommendations by Joseph Banks, and the legal fiction of "terra nullius" based on European concepts of cultivated land ownership.',
        model: 'One primary reason the British Empire claimed Australia was geopolitical and commercial competition with rival European powers. Following victory in the Seven Years’ War (1756–1763), the British Admiralty sought to discover the hypothetical continent of Terra Australis Incognita to prevent France or Spain from securing strategic naval bases in the Pacific. James Cook was dispatched on HMS Endeavour in 1768 with secret Admiralty instructions ordering him, after observing the Transit of Venus in Tahiti, to chart southern sea routes and take possession of convenient territories in the name of King George III. Claiming eastern Australia in August 1770 on Possession Island secured Britain a strategic Pacific gateway for future trade with China and the East Indies.<br><br>Furthermore, a second decisive factor was the glowing scientific and commercial report delivered by botanist Joseph Banks. Banks observed Botany Bay in April 1770, collecting hundreds of botanical specimens with Polynesian navigator Tupaia. Banks testified before Parliament in 1779 that New South Wales possessed rich soil, abundant timber, and fertile pastures suitable for European crops, while Norfolk Island could supply tall pines for ship masts and native flax for naval sailcloth. Consequently, British political leaders viewed the continent as an economically viable territory capable of self-sufficiency.<br><br>Finally, Britain declared Australia "terra nullius" (nobody’s land) by applying ethnocentric European legal doctrines of property ownership. Drawing upon philosopher John Locke’s theory that legitimate property rights derive from enclosing land and tilling the soil, Cook and Banks falsely assumed that because First Nations peoples were nomadic hunter-gatherers who did not erect permanent stone fences or European-style farms, they held no sovereign ownership. By deliberately ignoring Indigenous land management systems (such as fire-stick farming) and the 65,000-year continuous cultural attachment of over 500 First Nations groups, the British Crown bypassed seeking treaties or consent, legally dispossessing First Nations peoples upon arrival.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Pacific Rivalry & Secret Admiralty Orders', prompt: 'Explain the Seven Years’ War, Cook on HMS Endeavour, secret instructions, and claiming for King George III.', starter: 'One primary reason the British Empire claimed Australia was...' },
            { letter: 'REASON 2', name: 'Joseph Banks’s Botany Bay Reports', prompt: 'Explain Banks, Tupaia, fertile pastures, Norfolk Island pine for masts, and flax for sails.', starter: 'Furthermore, a second decisive factor was...' },
            { letter: 'REASON 3', name: 'The Legal Fiction of Terra Nullius', prompt: 'Explain John Locke, European property law, ignoring fire-stick farming, and seizing land without treaties.', starter: 'Finally, Britain declared Australia "terra nullius" because...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, secret instructions ordered...',
            'This led directly to the claim because...',
            'A second critical factor was...',
            'Finally, the legal doctrine of terra nullius was applied because...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['James Cook', 'Tupaia', 'terra nullius', 'Admiralty instructions', 'Joseph Banks', 'Botany Bay', 'Possession Island', 'HMS Endeavour', 'John Locke']
        }
      }
    ]
  },

  // Lesson 2: The First Fleet & The Convict Penal Colony (Feature Drill [4m] & Source Utility [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The First Fleet & The Penal Colony',
    tariff: '12 marks (Feature Drill [4m] & Source Utility [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of life on board the Thames prison hulks in the 1780s. [4 marks]',
        prompt: 'Identify two distinct features of living conditions on the Thames prison hulks. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was severe overcrowding and debilitating physical confinement.<br>Detail: Decommissioned naval warships moored on the River Thames were crammed with hundreds of chained convicts in unventilated, rat-infested lower decks, sleeping on bare floorboards with minimal bedding.<br><br>Feature 2: A second key feature was the prevalence of virulent infectious diseases and hard labour.<br>Detail: Due to contaminated river water and raw sewage, typhus (jail fever), dysentery, and scurvy spread rapidly, killing up to a third of inmates while survivors were forced into heavy manual labour dredging the Thames riverbed.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Confinement & Overcrowding)', prompt: 'Identify decommissioned warships, iron chains, and rat-infested lower decks.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (hundreds chained, bare floorboards, unventilated holds).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Lethal Disease & Forced Labour)', prompt: 'Identify jail fever, dysentery, and dredging the Thames riverbed.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (up to 30% mortality, typhus, contaminated bilge water).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['prison hulks', 'River Thames', 'overcrowding', 'jail fever / typhus', 'leg irons', 'forced dredging', 'First Fleet']
        }
      },
      {
        tariff: '8 marks',
        type: 'source_utility_8m',
        question: 'How useful are Sources A and B for an enquiry into the challenges faced by convicts and colonial authorities during the founding of Sydney Cove (1780–1792)? [8 marks]',
        stimulus: [
          'Source A: Governor Arthur Phillip’s dispatch to Lord Sydney (1788) detailing unyielding eucalyptus wood that blunts axes, poor soil at Sydney Cove, and near-starvation.',
          'Source B: Extract from the journal of convict marine Watkin Tench (1790) recording severe caloric reductions, the loss of the supply ship HMS Guardian, and rampant scurvy.'
        ],
        prompt: 'Evaluate both sources for their historical utility. Analyse what their contents reveal about agricultural failure and supply shortages, corroborating with contextual knowledge and interrogating their official provenance and personal perspectives.',
        model: 'Source A is exceptionally useful because it provides official, direct evidence from Governor Arthur Phillip regarding the acute environmental and physical challenges encountered at Sydney Cove. Phillip details how the hard eucalyptus timber destroyed iron axes and spades, and notes that the sandy coastal soil caused English wheat crops to wither. This aligns precisely with contextual knowledge: the colony faced immediate starvation because convicts were largely urban pickpockets rather than skilled farmers. Furthermore, the provenance makes Source A highly valuable as a candid administrative dispatch written to the British Home Secretary, Lord Sydney, where Phillip had an urgent motive to convey the unvarnished reality to secure emergency supply fleets.<br><br>Source B is equally valuable because it captures the psychological and nutritional desperation of the colony during the "Starvation Years" (1790–1792). Watkin Tench documents how weekly rations were halved to barely surviving levels of salt pork and flour following the shipwreck of the supply frigate HMS Guardian off South Africa. From my own knowledge, I know that Phillip dispatched HMS Sirius to Norfolk Island to divide the hungry population, but Sirius was also wrecked. As a literate marine officer living among the convicts, Tench’s published journal offers an observant eyewitness account of daily suffering that corroborates Phillip’s official reports. Together, both sources provide comprehensive insight into the extreme fragility of early colonial survival.',
        scaffolding: {
          acronym: 'Source A (Content + Provenance) • Source B (Content + Provenance) • Synthesis',
          acronym_title: 'Edexcel Paper 3 Q3(a) Dual Source Utility Framework',
          steps: [
            { letter: 'SOURCE A', name: 'Analyse Phillip’s Dispatch', prompt: 'Analyse eucalyptus wood blunting tools, sandy soil, urban convicts, and official report motive.', starter: 'Source A is exceptionally useful because its content reveals that...' },
            { letter: 'SOURCE B', name: 'Analyse Tench’s Journal', prompt: 'Analyse halved rations, loss of HMS Guardian, scurvy, and personal eyewitness accuracy.', starter: 'Source B is equally useful because it captures...' },
            { letter: 'SYNTHESIS', name: 'Weighed Value', prompt: 'Explain how both sources corroborate the extreme precarity of the Starvation Years.', starter: 'Combined, both sources provide high historical utility because...' }
          ],
          sentence_starters: [
            'Source A is useful for an enquiry into challenges because it reveals...',
            'In particular, this aligns with historical knowledge regarding...',
            'Furthermore, the provenance makes it valuable because...',
            'Similarly, Source B offers critical insight into...',
            'Overall, both sources combined provide comprehensive utility because...'
          ],
          connectives_bank: ['Arthur Phillip', 'Watkin Tench', 'Sydney Cove', 'eucalyptus blunted axes', 'starvation rations', 'HMS Guardian wreck', 'Norfolk Island', 'scurvy']
        }
      }
    ]
  },

  // Lesson 3: Frontier Warfare: Smallpox, Bennelong & Pemulwuy (Narrative Account [8m] & Explain Importance [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Frontier Warfare & Pemulwuy’s Resistance',
    tariff: '16 marks (Narrative Account [8m] & Explain Importance [8m])',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key events of Indigenous resistance and frontier conflict in New South Wales between 1788 and 1802. [8 marks]',
        stimulus: [
          'The 1789 smallpox epidemic (Galgany) and the kidnapping of Bennelong',
          'Pemulwuy’s guerrilla campaign and the Battle of Parramatta (1797)'
        ],
        prompt: 'Write a chronological account examining the escalation: the initial 1789 smallpox catastrophe and diplomatic kidnappings, the emergence of Pemulwuy’s armed resistance in the Hawkesbury and Parramatta regions, and Governor King’s 1801 outlaw proclamation leading to Pemulwuy’s death in 1802.',
        model: 'Between 1788 and 1802, relations between British colonizers and the Eora people rapidly disintegrated from cautious curiosity into sustained guerrilla warfare.<br><br>The conflict began in April 1789 with the devastating outbreak of smallpox (known to the Eora as Galgany) along Sydney Cove, which wiped out over 50% of the local Indigenous population within months. Weakened by demographic collapse, the Eora faced aggressive British incursions onto their ancestral lands. In an attempt to force diplomatic communication, Governor Arthur Phillip ordered the kidnapping of Arabanoo and later Bennelong in late 1789. Although Bennelong was dressed in European clothes and traveled to London in 1792, colonial pastoralists continued clearing Eora fishing creeks and yam beds, igniting armed friction.<br><br>Sustained military resistance coalesced around the Bidjigal warrior Pemulwuy from 1790. Rejecting collaboration, Pemulwuy launched a systematic guerrilla campaign, spearing Governor Phillip’s gamekeeper John McIntyre and coordinating multi-clan raids across the Hawkesbury and Parramatta settlements. Utilizing burning spears to destroy colonial grain stores and orchards, Pemulwuy culminated his campaign in March 1797 by leading 100 warriors directly into the township at the Battle of Parramatta. Despite being shot seven times, Pemulwuy survived and escaped from hospital, entering Indigenous legend as an invincible spiritual leader.<br><br>The final escalation occurred in May 1801 when Governor Philip Gidley King issued an official proclamation outlawing Indigenous people from entering settled areas and offering a reward for Pemulwuy dead or alive. In June 1802, Pemulwuy was shot by a British ambush, and his decapitated head was pickled in spirits and sent to Sir Joseph Banks in London. Consequently, Pemulwuy’s death ended the first phase of unified resistance along the Sydney Basin, paving the way for unrestricted British expansion.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: '1789 Smallpox & Bennelong Kidnap', prompt: 'Explain 50% mortality from Galgany, Phillip kidnapping Bennelong, and land clearing.', starter: 'Initially, relations disintegrated following the April 1789...' },
            { letter: 'STAGE 2', name: '1790–1797 Pemulwuy & Battle of Parramatta', prompt: 'Explain spearing McIntyre, burning crops, Parramatta raid, and surviving 7 bullet wounds.', starter: 'Following this, organized armed resistance coalesced under Pemulwuy when...' },
            { letter: 'STAGE 3', name: '1801 Outlawing & 1802 Ambush', prompt: 'Explain Governor King’s proclamation, Pemulwuy’s death, and sending head to Joseph Banks.', starter: 'The tragic culmination of the frontier conflict occurred in 1801–1802 when...' }
          ],
          sentence_starters: [
            'Initially, relations broke down when...',
            'Following this, sustained armed resistance erupted in...',
            'A major military escalation occurred in March 1797 when...',
            'Consequently, this culminated in 1801–1802 when...'
          ],
          connectives_bank: ['smallpox / Galgany', 'Bennelong kidnap', 'Pemulwuy', 'Bidjigal clan', 'Hawkesbury raids', 'Battle of Parramatta (1797)', 'Governor King proclamation (1801)', 'Joseph Banks']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_importance_8m',
        question: 'Explain the importance of Pemulwuy’s guerrilla campaign (1790–1802) for Indigenous resistance against British colonisation. [8 marks]',
        prompt: 'Explain two distinct reasons why Pemulwuy was historically important: first, how his multi-clan tactical alliances proved that Indigenous peoples fought back with sophisticated military strategy; second, how his enduring spiritual legacy inspired future frontier resistance across the Australian continent.',
        model: 'One reason Pemulwuy’s guerrilla campaign was profoundly important was that it shattered the colonial myth that Indigenous Australians were passive spectators who surrendered their lands without a fight. Pemulwuy developed sophisticated military tactics specifically tailored to counter British flintlock muskets. Recognizing that British muskets took twenty seconds to reload and were rendered useless in damp weather, Pemulwuy orchestrated dawn and rain raids, targeted British supply chains, burned crop fields with fire-sticks, and ambushed isolated patrols along the Hawkesbury River. Crucially, he united previously divided clans—including the Bidjigal, Dharug, and Eora—into a coordinated resistance alliance, demonstrating formidable political and military leadership.<br><br>Furthermore, Pemulwuy’s campaign was vital because he created an enduring spiritual and cultural legacy of resistance that inspired subsequent generations across the Australian Frontier Wars. When Pemulwuy survived seven gunshot wounds following the Battle of Parramatta in 1797, his people believed he was protected by ancestral spirits and impervious to British bullets. Even Governor King admitted in official dispatches that Pemulwuy was "a terrible pest to the colony" who was regarded by his people as a hero. His twelve-year war of resistance established a blueprint for frontier defiance that was later adopted by warriors in the Bathurst War and the Tasmanian Black War, cementing his status as Australia’s first great national resistance leader.',
        scaffolding: {
          acronym: 'Importance Point 1 • Importance Point 2',
          acronym_title: 'Edexcel Paper 2 Period Study 8-Mark Importance Standard',
          steps: [
            { letter: 'IMPACT 1', name: 'Tactical Sophistication & Multi-Clan Unity', prompt: 'Explain exploiting musket reload times, rain raids, burning crops, and unifying clans.', starter: 'One reason Pemulwuy’s campaign was profoundly important was that...' },
            { letter: 'IMPACT 2', name: 'Enduring Spiritual & Frontier Legacy', prompt: 'Explain surviving bullet wounds, legend of invulnerability, and inspiring future frontier wars.', starter: 'Furthermore, the campaign was vital because it established...' }
          ],
          sentence_starters: [
            'One reason why Pemulwuy’s campaign was important was...',
            'In particular, he demonstrated military sophistication by...',
            'Furthermore, the campaign was critical because...',
            'Consequently, this transformed Indigenous resistance because...'
          ],
          connectives_bank: ['Pemulwuy', 'guerrilla tactics', 'rain raids', 'multi-clan alliance', 'Battle of Parramatta', 'spiritual invulnerability', 'Frontier Wars legacy']
        }
      }
    ]
  },

  // Lesson 4: The Frontier Wars & The Black War (Contrasting Interpretations [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Frontier Wars & The Black War',
    tariff: '8 marks (Contrasting Historical Interpretations)',
    questions: [
      {
        tariff: '4 marks',
        type: 'interpretations_diff_4m',
        question: 'Explain how Interpretations 1 and 2 differ on the nature and scale of frontier conflict in Australia. [4 marks]',
        stimulus: [
          'Interpretation 1: Historian Henry Reynolds, The Other Side of the Frontier (1981) — argues European occupation was resisted from the start by Indigenous peoples using guerrilla tactics in a protracted, bloody war costing at least 20,000 Aboriginal lives.',
          'Interpretation 2: Historian Keith Windschuttle, The Fabrication of Aboriginal History (2002) — argues there was no systematic warfare or frontier genocide, asserting conflicts were uncoordinated, small-scale criminal skirmishes over stolen goods with fabricated death tolls.'
        ],
        prompt: 'Explain the fundamental difference between Henry Reynolds’s orthodox view of a protracted, bloody continental war of resistance and Keith Windschuttle’s revisionist view of minor, uncoordinated criminal skirmishes.',
        model: 'Interpretations 1 and 2 differ fundamentally on whether colonial conflict in Australia constituted a genuine war of resistance or mere uncoordinated criminal skirmishes. Interpretation 1, advanced by Henry Reynolds, argues that British settlement met with organized, continuous warfare from Indigenous peoples defending their ancestral lands. Reynolds characterizes this as a protracted, bloody war resulting in over 20,000 Aboriginal deaths. In sharp contrast, Interpretation 2, by Keith Windschuttle, rejects the concept of a "Frontier War" entirely. Windschuttle asserts that there was no systematic warfare or frontier genocide, claiming conflicts were isolated criminal disputes over stolen sheep and tools, and dismissing high death tolls as unproven fabrications. Thus, Reynolds identifies a national war of territorial defense, while Windschuttle dismisses it as localized minor criminality.',
        scaffolding: {
          acronym: 'Point • Interp 1 • Interp 2 • Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(b) Interpretation Difference Formula',
          steps: [
            { letter: 'POINT', name: 'State the Core Difference', prompt: 'State clearly that they disagree on whether the frontier was a war of defense or minor crime.', starter: 'Interpretations 1 and 2 differ fundamentally on...' },
            { letter: 'INTERP 1', name: 'Exemplify Reynolds (War & 20,000 Dead)', prompt: 'Quote or summarize Reynolds on guerrilla resistance, bloody war, and 20,000 casualties.', starter: 'Interpretation 1 argues that...' },
            { letter: 'INTERP 2', name: 'Exemplify Windschuttle (Minor Crime Skirmishes)', prompt: 'Quote or summarize Windschuttle on denying warfare, small-scale criminal disputes, and fabricated figures.', starter: 'In contrast, Interpretation 2 suggests that...' },
            { letter: 'CONTRAST', name: 'Explain the Divergence', prompt: 'Explicitly synthesize the difference between patriotic warfare and localized crime.', starter: 'This is a fundamental difference because...' }
          ],
          sentence_starters: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In contrast, Interpretation 2 suggests that...',
            'This is a difference because...'
          ],
          connectives_bank: ['Henry Reynolds (1981)', 'Keith Windschuttle (2002)', 'Frontier Wars', 'guerrilla resistance', '20,000 dead', 'History Wars', 'criminal skirmishes vs warfare']
        }
      },
      {
        tariff: '4 marks',
        type: 'interpretations_reason_4m',
        question: 'Suggest one reason why Interpretations 1 and 2 differ on the reality of the Frontier Wars. [4 marks]',
        prompt: 'Explain why Reynolds and Windschuttle arrive at opposing conclusions. Consider their different methodologies, source selection, and political/philosophical motives.',
        model: 'One primary reason why Interpretations 1 and 2 differ is that the historians utilize radically different methodologies and evidence criteria in what is known as the "History Wars". Henry Reynolds draws upon oral histories from First Nations elders, missionary diaries, private letters of colonial settlers, and police reports that recorded violent dispersals that were intentionally omitted from official records. His objective is to acknowledge colonial dispossession and give voice to Indigenous perspectives. In contrast, Keith Windschuttle adopts a strictly narrow, literalist methodology that accepts only formal British government court documents and certified coroner records as proof of killing. Because frontier massacres (such as at Myall Creek or during the Black War) were rarely documented by perpetrators in official court files, Windschuttle’s standard of evidence leads him to drastically minimize the conflict, producing contrasting historical conclusions.',
        scaffolding: {
          acronym: 'Methodology Contrast • Source Selection • Motive',
          acronym_title: 'Edexcel Paper 3 Q3(c) Why Interpretations Differ Formula',
          steps: [
            { letter: 'REASON', name: 'Methodology & Source Criteria', prompt: 'Identify that Reynolds uses settler letters and oral histories, while Windschuttle demands court records.', starter: 'One reason why Interpretations 1 and 2 differ is because they rely on...' },
            { letter: 'AUTHOR 1', name: 'Reynolds’s Methodology', prompt: 'Explain Reynolds acknowledges unrecorded massacres and Indigenous testimony.', starter: 'Specifically, Henry Reynolds evaluates settler letters, missionary records, and oral traditions...' },
            { letter: 'AUTHOR 2', name: 'Windschuttle’s Methodology', prompt: 'Explain Windschuttle demands strict court records, dismissing undocumented massacres.', starter: 'In contrast, Keith Windschuttle insists on strict documentary court evidence...' }
          ],
          sentence_starters: [
            'One reason why Interpretations 1 and 2 differ is because they rely on different historical sources...',
            'Specifically, Interpretation 1 uses settler diaries and oral testimony to...',
            'In contrast, Interpretation 2 focuses strictly on official legal records to...',
            'As a result, the authors reach different conclusions because...'
          ],
          connectives_bank: ['History Wars', 'settler diaries', 'oral traditions', 'narrow literalist methodology', 'Myall Creek trial', 'Black War martial law']
        }
      }
    ]
  },

  // Lesson 5: The Gold Rush & Eureka Stockade (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: The Gold Rush, Eureka Stockade & Historical Legacy',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The discovery of gold and the Eureka Stockade were the most important turning points in 19th-century Australian history.’ How far do you agree? Explain your answer. [12 marks]',
        stimulus: [
          'The 1851 Gold Rush and the Eureka Stockade rebellion (1854)',
          'Pastoral expansion, the wool boom, and the frontier wars (1820–1840)'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate how gold triggered massive demographic growth, ended convict transportation, and sparked the birth of Australian democracy at Eureka; on the other hand, evaluate how the earlier wool boom, pastoral squatting, and frontier wars permanently defined the continent’s land division and Indigenous dispossession. Reach a weighed conclusion.',
        model: 'To a large extent, the discovery of gold in 1851 and the 1854 Eureka Stockade rebellion represent the most transformative turning point in 19th-century Australian history, dramatically accelerating democratic self-government, terminating the convict system, and forging a modern multicultural society.<br><br>On the one hand, the Gold Rush fundamentally transformed Australia’s demographics, economy, and political structures within a single decade. Following Edward Hargraves’s 1851 discovery near Bathurst, hundreds of thousands of free migrants rushed from Britain, America, and southern China, causing the non-Indigenous population to skyrocket from 400,000 in 1850 to over 1.1 million by 1860. This massive influx of free settlers irrevocably ended British convict transportation to eastern Australia. Furthermore, the Eureka Stockade of December 1854—where gold diggers at Ballarat swore allegiance to the Southern Cross flag against repressive mining licence fees—led directly to democratic reforms. In 1856, Victoria granted universal male suffrage, the secret ballot (the "Australian Ballot"), and abolished property requirements for MPs, establishing Australia as a world pioneer in democratic governance.<br><br>On the other hand, it can be argued that the earlier pastoral wool boom of 1820–1840 was the foundational turning point that shaped the geography and racial hierarchy of Australia. The expansion of the "squattocracy" across millions of acres of fertile grassland transformed Australia into the world’s leading wool exporter, establishing British financial hegemony. Crucially, it was this relentless pastoral hunger for grazing lands that triggered the Frontier Wars, the declaration of martial law in Tasmania’s Black War, and the catastrophic dispossession of First Nations peoples long before gold was discovered. Without the pastoral seizure of the continent, the infrastructure that enabled the gold rushes would not have existed.<br><br>In conclusion, while the wool boom established the foundational territorial seizure of Australia, the Gold Rush was the decisive watershed. It destroyed the stigma of Australia as a penal prison, triggered an unprecedented demographic and economic explosion, and birthed the democratic institutions that created modern Australian national identity.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that gold transformed Australia from a penal colony into a wealthy, democratic nation.', starter: 'To a large extent, the discovery of gold and the Eureka Stockade were the decisive turning points because...' },
            { letter: 'THEME 1', name: 'Gold Rush & Eureka Democracy (1851–1856)', prompt: 'Explain population tripling to 1.1m, ending convict transport, Eureka rebellion, and secret ballot.', starter: 'On the one hand, the Gold Rush fundamentally transformed Australia by...' },
            { letter: 'THEME 2', name: 'Wool Boom & Frontier Dispossession (1820–1840)', prompt: 'Evaluate squattocracy, wool exports, and the pastoral dispossession of Indigenous lands.', starter: 'On the other hand, it can be argued that the pastoral wool boom was foundational because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why gold was the decisive catalyst creating modern democratic Australia.', starter: 'In conclusion, while the wool boom established the territory, the Gold Rush was decisive because...' }
          ],
          sentence_starters: [
            'To a large extent, it can be argued that...',
            'On the one hand, the discovery of gold transformed Australia because...',
            'In particular, at the Eureka Stockade in 1854...',
            'On the other hand, an alternative view emphasizes the earlier pastoral expansion, such as...',
            'In conclusion, the most decisive turning point was... because...'
          ],
          connectives_bank: ['1851 Gold Rush', 'Edward Hargraves', 'Ballarat', 'Eureka Stockade (1854)', 'Southern Cross flag', 'universal male suffrage', 'Australian secret ballot', 'squattocracy', 'wool boom']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (ausExamPractice[idx]) {
    lesson.exam_practice = ausExamPractice[idx];
  }
});

// Serialize back to units/australia/data.js
const serialized = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Australia with workbook examination practice!');
