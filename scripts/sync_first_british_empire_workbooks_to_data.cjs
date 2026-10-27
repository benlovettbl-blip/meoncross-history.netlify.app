const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'first_british_empire', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/const\s+first_british_empire_data\s*=\s*(\{[\s\S]*\});\s*if\s*\(typeof\s+window/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/first_british_empire/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const fbeExamPractice = [
  // Lesson 1: The East India Company & Mughal Bengal (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The East India Company & Mughal Bengal',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the East India Company was able to expand its territorial control across Bengal and India between 1600 and 1765. [12 marks]',
        stimulus: [
          'Royal charters granting trade monopolies and company private armies',
          'The grant of the Diwani (1765) by Mughal Emperor Shah Alam II'
        ],
        prompt: 'Explain three distinct causal reasons: the legal and military powers granted by British royal charters, the exploitation of Mughal political fragmentation culminating in the Battle of Plassey (1757), and the fiscal takeover through the Treaty of Allahabad (Diwani of Bengal 1765). Structure using PEEL paragraphs.',
        model: 'One major reason the East India Company expanded its control was the extraordinary legal and military authority granted by British royal charters. In December 1600, Queen Elizabeth I granted the Company a royal charter giving it a complete monopoly on British trade in the Indian Ocean. Crucially, subsequent seventeenth-century charters from King Charles II authorized the Company to build fortresses, mint coins, declare war, make peace, and maintain its own private army. By employing European officers to drill Indian recruits (sepoys) in modern flintlock musket tactics, the Company created a formidable military force that could overpower regional Indian rulers.<br><br>Furthermore, a second decisive factor was the political decentralization of the Mughal Empire after the death of Emperor Aurangzeb in 1707. Regional governors (nawabs) operated virtually independently, creating intense rivalries that Company officials ruthlessly exploited. In Bengal, Nawab Siraj ud-Daulah attempted to halt unauthorized British fortifications at Fort William (Calcutta). In response, Robert Clive conspired with the Nawab’s disaffected paymaster, Mir Jafar, bribing him to withhold his troops at the Battle of Plassey in June 1757. Clive’s victory allowed the Company to depose Siraj ud-Daulah and install puppet rulers, effectively subordinating Bengal’s vast administrative machinery.<br><br>Finally, the critical turning point cementing territorial control was the fiscal conquest achieved through the 1765 Treaty of Allahabad. Following the decisive British victory at the Battle of Buxar (1764), Mughal Emperor Shah Alam II was forced to grant the Company the "Diwani" of Bengal, Bihar, and Orissa. The Diwani transferred the sovereign right to assess and collect all land tax revenues from thirty million people directly to the Company. With access to over two million pounds sterling in annual tax revenue, the Company funded an army of over 100,000 men without needing British taxpayer money, transforming a private mercantile corporation into an unstoppable colonial sovereign.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Royal Charters & Private Armies', prompt: 'Explain Elizabeth I, Charles II, private armies, and European sepoy drilling.', starter: 'One major reason the East India Company expanded was...' },
            { letter: 'REASON 2', name: 'Mughal Fragmentation & Plassey (1757)', prompt: 'Explain Siraj ud-Daulah, Mir Jafar conspiracy, and the victory at Plassey.', starter: 'Furthermore, a second decisive factor was...' },
            { letter: 'REASON 3', name: 'The Diwani of Bengal (1765)', prompt: 'Explain the Treaty of Allahabad, Shah Alam II, collecting taxes, and funding an army of 100k.', starter: 'Finally, the critical turning point was...' }
          ],
          sentence_starters: [
            'One major reason was that...',
            'For example, royal charters granted...',
            'This was important because...',
            'Another key factor was...',
            'In particular, Clive exploited...',
            'Overall, the decisive turning point occurred in 1765 when...'
          ],
          connectives_bank: ['East India Company', 'Robert Clive', 'Battle of Plassey (1757)', 'Siraj ud-Daulah', 'Mir Jafar', 'Treaty of Allahabad (1765)', 'Diwani', 'Shah Alam II', 'sepoys']
        }
      }
    ]
  },

  // Lesson 2: Transatlantic Slave Trade & Middle Passage (Feature Drill [4m] + Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Transatlantic Slave Trade & The Middle Passage',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of conditions endured by enslaved Africans during the Middle Passage. [4 marks]',
        prompt: 'Identify two distinct features of conditions on slave ships during the Atlantic crossing. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was extreme physical confinement and overcrowding below decks.<br>Detail: Captives were forced to lie chained in pairs on tiered wooden shelves with barely thirty centimetres of headroom, packed in rows that prevented them from sitting upright or turning onto their sides during the eight-week voyage.<br><br>Feature 2: A second key feature was the catastrophic lack of sanitation and virulent disease.<br>Detail: Denied ventilation, the hold filled with vomit, dysentery (the "bloody flux"), and extreme tropical heat, creating lethal conditions that killed between 15% and 20% of enslaved Africans before reaching the Americas.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Physical Confinement)', prompt: 'Identify the cramped wooden shelves and iron shackles.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (thirty centimetres headroom, chained in pairs, inability to turn).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Sanitation & Mortality)', prompt: 'Identify the spread of virulent disease and heat below deck.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (dysentery / bloody flux, 15–20% mortality rate, suffocation).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['Middle Passage', 'tight packing', 'shackles', 'wooden shelves', 'dysentery', 'bloody flux', '15–20% mortality', 'slaver Brooks']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the Zong massacre (1781) for the British abolitionist movement. [4 marks]',
        prompt: 'Focus on how the captain throwing 133 enslaved Africans overboard for insurance money, and the court treating them merely as lost commercial cargo, outraged the public and galvanized Granville Sharp and Olaudah Equiano to campaign for abolition.',
        model: 'One significant consequence of the Zong massacre in 1781 was that it exposed the barbaric legal reality of chattel slavery, providing a powerful moral catalyst that galvanized the British abolitionist campaign. When Captain Luke Collingwood ordered 133 sick enslaved Africans to be thrown alive into the sea so the ship’s owners could claim an insurance payout for lost "cargo", the subsequent court case (Gregson v Gilbert) focused entirely on financial reimbursement rather than murder. Lord Chief Justice Mansfield ruled that the law viewed slaves identically to horses or timber. Outraged by this dehumanisation, abolitionist pioneers Granville Sharp and Olaudah Equiano published the court transcripts and publicised the atrocity. Consequently, the case shocked British public opinion, directly inspiring the founding of the Society for the Abolition of the Slave Trade in 1787 and proving that slavery was morally indefensible.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State the public outrage and moral catalyst galvanizing the abolition movement.', starter: 'One significant consequence of the Zong massacre was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite 133 people thrown overboard, Gregson v Gilbert insurance claim, and Granville Sharp.', starter: 'In particular, when Captain Collingwood...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain how this directly inspired the 1787 Abolition Society and legislative campaigns.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the Zong massacre was that...',
            'In particular, this occurred when...',
            'As a direct result...',
            'Consequently, this galvanized the abolition movement because...'
          ],
          connectives_bank: ['Zong massacre (1781)', 'Luke Collingwood', '133 murdered', 'insurance claim', 'Granville Sharp', 'Olaudah Equiano', '1787 Abolition Society']
        }
      }
    ]
  },

  // Lesson 3: Plantation Reality & Maroon Resistance (Contrasting Interpretations [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Plantation Reality & Maroon Resistance',
    tariff: '8 marks (Contrasting Historical Interpretations)',
    questions: [
      {
        tariff: '4 marks',
        type: 'interpretations_diff_4m',
        question: 'Explain how Interpretations 1 and 2 differ on the nature of enslaved African resistance. [4 marks]',
        stimulus: [
          'Interpretation 1: Planter Edward Long, History of Jamaica (1774) — argues enslaved people were naturally indolent and required perpetual whip discipline, claiming without European mastery order would dissolve.',
          'Interpretation 2: Historian Hilary Beckles, Caribbean Freedom (2004) — argues enslaved Africans waged an unrelenting war of resistance through daily sabotage, spiritual preservation, and armed guerrilla struggle led by Queen Nanny.'
        ],
        prompt: 'Explain the difference between Edward Long’s pro-slavery view of passive compliance and Hilary Beckles’s modern historical analysis of active military and cultural resistance.',
        model: 'Interpretations 1 and 2 differ fundamentally on the agency and resistance of enslaved Africans. Interpretation 1 portrays enslaved people as naturally passive, claiming that discipline and constant threat of the whip were required to extract labour, and asserting that without white European mastery social order would dissolve. In sharp contrast, Interpretation 2 emphasizes active, organized, and unrelenting resistance. Beckles highlights that Africans continuously fought back through daily sabotage, cultural preservation, and brilliant guerrilla warfare, citing Queen Nanny of the Maroons who outmanoeuvred the British imperial army. Thus, while Long presents enslaved people as compliant subjects, Beckles reveals them as strategic fighters for freedom.',
        scaffolding: {
          acronym: 'Point • Interp 1 • Interp 2 • Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(b) Interpretation Difference Formula',
          steps: [
            { letter: 'POINT', name: 'State the Core Difference', prompt: 'State clearly that they differ on whether enslaved people were passive or active resisters.', starter: 'Interpretations 1 and 2 differ fundamentally on...' },
            { letter: 'INTERP 1', name: 'Exemplify Interpretation 1', prompt: 'Quote or summarize Long on natural indolence, whip discipline, and need for mastery.', starter: 'Interpretation 1 argues that...' },
            { letter: 'INTERP 2', name: 'Exemplify Interpretation 2', prompt: 'Quote or summarize Beckles on unrelenting resistance, guerrilla strategy, and Queen Nanny.', starter: 'In contrast, Interpretation 2 suggests that...' },
            { letter: 'CONTRAST', name: 'Explain the Divergence', prompt: 'Explicitly contrast the two views in a final analytical sentence.', starter: 'This is a fundamental difference because...' }
          ],
          sentence_starters: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In contrast, Interpretation 2 suggests that...',
            'This is a difference because...'
          ],
          connectives_bank: ['Edward Long (1774)', 'Hilary Beckles (2004)', 'passivity vs resistance', 'driver’s whip', 'sabotage', 'guerrilla struggle', 'Queen Nanny', 'Blue Mountains']
        }
      },
      {
        tariff: '4 marks',
        type: 'interpretations_reason_4m',
        question: 'Suggest one reason why Interpretations 1 and 2 differ on the reality of plantation control. [4 marks]',
        prompt: 'Explain why Edward Long and Hilary Beckles hold contrasting views. Consider their differing backgrounds, historical context, access to sources, and motives.',
        model: 'One primary reason why Interpretations 1 and 2 differ is that the authors write from radically different historical contexts, motives, and sources. Edward Long was an 18th-century wealthy British planter and slaveholder writing in 1774. His direct motive was to justify chattel slavery and reassure British investors that harsh physical brutality was an economic and social necessity, leading him to produce racist caricatures that erased African agency. In contrast, Hilary Beckles is a 21st-century academic historian writing with modern scholarship and access to Maroon oral histories and colonial military records. Beckles’s motive is to restore historical truth and document the extensive reality of Black resistance, explaining why he reaches a completely contrary conclusion.',
        scaffolding: {
          acronym: 'Origin • Motive • Evidence Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(c) Why Interpretations Differ Formula',
          steps: [
            { letter: 'REASON', name: 'State Reason (Context & Motive)', prompt: 'Identify that the authors have contrasting positions: 18th-century slave owner vs modern academic.', starter: 'One reason why Interpretations 1 and 2 differ is because...' },
            { letter: 'AUTHOR 1', name: 'Analyse Long’s Motive', prompt: 'Explain Long was a planter justifying slave discipline to protect his financial profits.', starter: 'Specifically, Edward Long was writing in 1774 as a Jamaican planter who...' },
            { letter: 'AUTHOR 2', name: 'Analyse Beckles’s Perspective', prompt: 'Explain Beckles evaluates military archives and oral traditions to highlight African agency.', starter: 'In contrast, Hilary Beckles writes as a modern historian who...' }
          ],
          sentence_starters: [
            'One reason why Interpretations 1 and 2 differ is because they have a different focus...',
            'Specifically, Interpretation 1 focuses primarily on justifying...',
            'In contrast, Interpretation 2 focuses more on documenting...',
            'As a result, the authors reach different conclusions because...'
          ],
          connectives_bank: ['Jamaican planter', 'pro-slavery propaganda', 'economic justification', 'modern academic', 'oral traditions', 'colonial military records']
        }
      }
    ]
  },

  // Lesson 4: Thirteen Colonies & The Boston Tea Party (Narrative Account [8m] & Explain Importance [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Thirteen Colonies & The Boston Tea Party',
    tariff: '16 marks (Narrative Account [8m] & Explain Importance [8m])',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key events leading from the Stamp Act (1765) to the Boston Tea Party (1773). [8 marks]',
        stimulus: [
          'The Stamp Act and colonial boycotts (1765)',
          'The Boston Massacre and the Tea Act (1770–1773)'
        ],
        prompt: 'Write a chronological account examining the escalation of colonial resistance: the 1765 Stamp Act crisis, the 1770 Boston Massacre, and the 1773 Tea Act leading directly to the Boston Tea Party.',
        model: 'Between 1765 and 1773, relations between the British Parliament and the American colonies deteriorated through a cycle of imperial taxation, colonial resistance, and escalating violence.<br><br>The crisis began in 1765 when Parliament passed the Stamp Act to repay debts from the Seven Years’ War, taxing legal documents, newspapers, and playing cards. Colonists reacted with fury, establishing the Sons of Liberty and adopting the slogan "No taxation without representation", arguing that an unelected Parliament 3,000 miles away had no legal right to levy direct taxes. Widespread colonial boycotts of British goods forced Parliament to repeal the act in 1766, but the accompanying Declaratory Act insisted Parliament maintained sovereign power over the colonies in all cases whatsoever.<br><br>Tensions escalated dramatically with the 1767 Townshend Acts on imported glass, lead, paint, and tea. British troops were dispatched to Boston to enforce customs collections, creating friction that culminated on 5 March 1770 in the Boston Massacre, where British soldiers opened fire on an angry crowd, killing five colonists. Although Parliament repealed most Townshend duties following the massacre, it retained the tea tax as a symbol of authority.<br><br>The final catalyst occurred in May 1773 when Parliament passed the Tea Act, granting the struggling British East India Company a monopoly to sell surplus tea in America at reduced prices. Colonists recognized this as a bribe to accept parliamentary taxation. Consequently, on 16 December 1773, the Sons of Liberty disguised themselves as Mohawk warriors, boarded three East India Company ships in Boston Harbour, and dumped 342 chests of tea into the ocean, triggering the punitive Coercive Acts.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: '1765 Stamp Act & Boycotts', prompt: 'Explain the tax on printed paper, "No taxation without representation", and boycott.', starter: 'Initially, the imperial crisis began in 1765 when...' },
            { letter: 'STAGE 2', name: '1770 Boston Massacre', prompt: 'Explain Townshend Duties, British troops stationed in Boston, and 5 March 1770 shooting.', starter: 'Following this, tensions escalated sharply in March 1770 when...' },
            { letter: 'STAGE 3', name: '1773 Tea Act & Boston Tea Party', prompt: 'Explain East India Company monopoly, Sons of Liberty, and 342 tea chests dumped in harbour.', starter: 'The decisive turning point occurred in December 1773 when...' }
          ],
          sentence_starters: [
            'Initially, the crisis began when...',
            'Following this, a major escalation occurred in 1770 when...',
            'A violent turning point was reached when...',
            'Consequently, this culminated in December 1773 when...'
          ],
          connectives_bank: ['Stamp Act (1765)', 'Sons of Liberty', 'No taxation without representation', 'Boston Massacre (1770)', 'Tea Act (1773)', '342 tea chests', 'Boston Harbour', 'East India Company']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_importance_8m',
        question: 'Explain the importance of the Boston Tea Party (1773) for relations between Britain and the American colonies. [8 marks]',
        prompt: 'Explain two distinct consequences: how it prompted Parliament to pass the punitive "Coercive/Intolerable Acts" shutting Boston port, and how it united previously divided colonies behind the First Continental Congress.',
        model: 'One reason the Boston Tea Party was profoundly important was that it provoked a punitive and uncompromising legislative retaliation from the British government. Viewing the destruction of £10,000 worth of private property as open rebellion, King George III and Parliament passed the 1774 Coercive Acts (known in America as the "Intolerable Acts"). These measures closed Boston Harbour until the tea was paid for, suspended the Massachusetts colonial assembly, replaced the civilian governor with military general Thomas Gage, and quartered British troops in private buildings. By replacing colonial self-government with military rule, Britain foreclosed diplomatic compromise.<br><br>Furthermore, the Tea Party was critical because it transformed a regional dispute in Massachusetts into a united, continent-wide revolution. Rather than isolating Boston as Parliament intended, the harshness of the Coercive Acts outraged the other twelve colonies, inspiring them to send food and financial relief. More decisively, it spurred colonial leaders to convene the First Continental Congress in Philadelphia in September 1774. Representatives from twelve colonies united for the first time, establishing a coordinated continental boycott of British trade and authorizing local militias to arm themselves, paving the direct path to open warfare at Lexington and Concord in April 1775.',
        scaffolding: {
          acronym: 'Importance Point 1 • Importance Point 2',
          acronym_title: 'Edexcel Paper 2 Period Study 8-Mark Importance Standard',
          steps: [
            { letter: 'IMPACT 1', name: 'British Retaliation (Coercive Acts)', prompt: 'Explain closing Boston Harbour, General Gage, martial law, and quartering troops.', starter: 'One reason the Boston Tea Party was crucial was that...' },
            { letter: 'IMPACT 2', name: 'Colonial Unification (Continental Congress)', prompt: 'Explain how it united 12 colonies, Philadelphia Congress 1774, and militia arming.', starter: 'Furthermore, the event was vital because it transformed...' }
          ],
          sentence_starters: [
            'One reason why the Boston Tea Party was important was...',
            'In particular, this led the British government to...',
            'Furthermore, the event was critical because...',
            'Consequently, this transformed relations because...'
          ],
          connectives_bank: ['Coercive Acts (1774)', 'Intolerable Acts', 'Boston Harbour closed', 'General Thomas Gage', 'First Continental Congress', 'colonial unity', 'Lexington and Concord']
        }
      }
    ]
  },

  // Lesson 5: The American Revolution & Black Loyalists (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: The American Revolutionary War & Black Loyalists',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘British defeat in the American Revolutionary War was caused primarily by French naval intervention rather than American military strength.’ How far do you agree? [12 marks]',
        stimulus: [
          'The Battle of Saratoga and the French Alliance (1777–1778)',
          'George Washington and the Continental Army at Valley Forge'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate French naval support (Battle of the Chesapeake, Yorktown blockade) and widening the conflict into a global war; on the other hand, evaluate American resilience under Washington, guerrilla warfare, and knowledge of the terrain. Reach a weighed conclusion.',
        model: 'To a significant extent, it is accurate to argue that British defeat was caused primarily by French military and naval intervention. While American ideological determination and tactical endurance were necessary preconditions, French entry transformed a localized colonial counter-insurgency into an unmanageable global war that neutralized Britain’s single greatest asset: the Royal Navy.<br><br>On the one hand, French naval and military intervention was the indispensable catalyst for decisive British defeat. Following the American victory at Saratoga in October 1777, France signed a formal alliance with the Continental Congress in 1778, later joined by Spain and the Dutch Republic. This transformed the conflict across Europe, the Caribbean, and India, forcing Britain to disperse its naval fleets to defend vital sugar islands and the English Channel. Crucially, the war was decided at the Siege of Yorktown in 1781. Admiral de Grasse’s French fleet defeated the Royal Navy at the Battle of the Chesapeake, cutting off General Cornwallis’s seaward evacuation route while 7,000 French soldiers under Rochambeau joined Washington’s siege lines. Without French naval superiority, Cornwallis would have been evacuated or reinforced, preventing the decisive surrender that forced Parliament to concede independence.<br><br>On the other hand, it can be argued that American military and strategic resilience was the foundational cause of British defeat. George Washington recognized that the Continental Army did not need to win set-piece battles, but merely survive to exhaust British political will. Despite enduring freezing conditions, disease, and starvation at Valley Forge in the winter of 1777–1778, training by Baron von Steuben forged the army into a disciplined regular force. Furthermore, the British army struggled with insurmountable logistical challenges, fighting across 1,000 miles of hostile, vast terrain against local militias who utilized effective guerrilla tactics. The British strategy of relying on Loyalists and Black Loyalists (freed under Lord Dunmore’s Proclamation) failed to control the countryside.<br><br>In conclusion, while American resilience ensured that the revolution survived its darkest hours, it was French intervention that delivered actual victory. By breaking British naval hegemony at the Chesapeake and trapping Cornwallis at Yorktown, France turned a war of attrition into an absolute military checkmate that Britain could not recover from.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that French intervention turned the war into an unwinnable global conflict.', starter: 'To a significant extent, it is accurate to argue that...' },
            { letter: 'THEME 1', name: 'French Alliance & Naval Dominance', prompt: 'Explain 1778 Alliance, global war, Battle of the Chesapeake, Admiral de Grasse, and Yorktown.', starter: 'On the one hand, French naval and military intervention was decisive because...' },
            { letter: 'THEME 2', name: 'American Endurance & Washington', prompt: 'Evaluate Washington’s war of attrition, Valley Forge resilience, and hostile vast geography.', starter: 'On the other hand, it can be argued that American military resilience was foundational because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Explain why Yorktown could never have been achieved without French naval control.', starter: 'In conclusion, while American endurance prevented defeat, it was French intervention that...' }
          ],
          sentence_starters: [
            'To a significant extent, it is accurate to argue that...',
            'On the one hand, French naval intervention was decisive because...',
            'In particular, at Yorktown in 1781...',
            'On the other hand, an alternative argument highlights American military strength, such as...',
            'In conclusion, the most decisive factor was... because...'
          ],
          connectives_bank: ['Battle of Saratoga (1777)', 'French Alliance (1778)', 'George Washington', 'Valley Forge', 'Baron von Steuben', 'Admiral de Grasse', 'Battle of the Chesapeake', 'Siege of Yorktown (1781)', 'General Cornwallis']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (fbeExamPractice[idx]) {
    lesson.exam_practice = fbeExamPractice[idx];
  }
});

// Serialize back to units/first_british_empire/data.js
const serialized = `const first_british_empire_data = ${JSON.stringify(unitData, null, 2)};\nif (typeof window !== "undefined") {\n  window.FIRST_BRITISH_EMPIRE_DATA = first_british_empire_data;\n}\nexport default first_british_empire_data;\nexport { first_british_empire_data };\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of First British Empire with workbook examination practice!');
