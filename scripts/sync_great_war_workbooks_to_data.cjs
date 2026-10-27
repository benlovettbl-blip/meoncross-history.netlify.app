const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s*\{\s*unitData\s*\};/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/great_war/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const gw1ExamPractice = [
  // Lesson 1: German Unification (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: German Unification & Bismarckian Diplomacy',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the creation of the German Empire in 1871 created long-term instability in Europe. [12 marks]',
        stimulus: [
          'The annexation of Alsace-Lorraine',
          'Bismarck’s dread of a two-front war'
        ],
        prompt: 'Explain three distinct causal reasons: the permanent humiliation and revanchism caused by annexing Alsace-Lorraine from France, Bismarck’s complex web of secret alliances to prevent a two-front war, and the dramatic economic and industrial disruption to the European balance of power.',
        model: 'One primary reason the unification of Germany created enduring instability was the territorial annexation of Alsace-Lorraine following the Franco-Prussian War (1870–1871). By proclaiming the German Empire inside the Hall of Mirrors at Versailles and seizing these border provinces, Chancellor Otto von Bismarck inflicted deep national humiliation on France. This fueled an enduring French desire for vengeance ("revanchisme") and guaranteed that post-war France would seek to dismantle German hegemony at the first strategic opportunity, permanently poisoning relations between the two continental powers.<br><br>Furthermore, a second decisive factor was Bismarck’s desperate dread of a two-front war ("cauchemar des coalitions"). Recognizing that a vengeful France would seek an ally on Germany’s eastern border, Bismarck constructed an intricate, secret web of diplomatic alliances—most notably the Dreikaiserbund (Three Emperors’ League) and the 1887 Reinsurance Treaty with Tsarist Russia. However, maintaining simultaneous friendships with rival empires like Austria-Hungary and Russia proved impossible. When Kaiser Wilhelm II dismissed Bismarck in 1890 and allowed the Reinsurance Treaty to lapse, Russia immediately allied with France in 1894, making Bismarck’s nightmare of encirclement a permanent geopolitical reality.<br><br>Finally, the sheer industrial and demographic power of the unified Reich disrupted the historic European balance of power. Germany rapidly overtook Britain and France in steel production, chemical manufacturing, and heavy engineering, while its population surged towards 65 million. This unprecedented economic supremacy fostered aggressive militarism and nationalistic confidence among German elites, who demanded a "place in the sun" (Weltpolitik) commensurate with their strength. Consequently, neighbouring great powers felt fundamentally threatened by German industrial preponderance, transforming Europe into an armed, competitive camp.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Alsace-Lorraine & French Revanchism', prompt: 'Explain the Versailles proclamation, annexation of border provinces, and French vengeance.', starter: 'One primary reason the creation of the German Empire caused instability was...' },
            { letter: 'REASON 2', name: 'Bismarck’s Dread of Two-Front War & Franco-Russian Alliance', prompt: 'Explain Bismarck’s secret treaties, Wilhelm II dropping Russia, and 1894 Franco-Russian pact.', starter: 'Furthermore, a second decisive factor was...' },
            { letter: 'REASON 3', name: 'Industrial Supremacy & Balance of Power Shift', prompt: 'Explain steel production, demographic growth, and Weltpolitik challenging European equilibrium.', starter: 'Finally, the unprecedented industrial power of the unified Reich...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, the annexation of...',
            'This led directly to instability because...',
            'A second critical factor was...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Alsace-Lorraine', 'revanchisme', 'Otto von Bismarck', 'two-front war', 'Reinsurance Treaty (1887)', 'Franco-Russian Alliance (1894)', 'balance of power', 'Weltpolitik']
        }
      }
    ]
  },

  // Lesson 2: Imperial Rivalry & Moroccan Crises (Feature Drill [4m] & Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Imperial Rivalry & The Moroccan Crises',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of the 1911 Agadir Crisis (Second Moroccan Crisis). [4 marks]',
        prompt: 'Identify two distinct features of the 1911 Agadir Crisis. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was Germany’s aggressive deployment of naval gunboat diplomacy.<br>Detail: In July 1911, the German government dispatched the gunboat SMS Panther to the Moroccan Atlantic port of Agadir under the pretext of protecting German commercial firms, attempting to intimidate France during French troop deployments to Fez.<br><br>Feature 2: A second key feature was the firm diplomatic intervention of Great Britain in support of France.<br>Detail: British Chancellor David Lloyd George delivered his famous Mansion House speech warning that Britain would fight rather than allow Germany to bully European nations, prompting Britain to prepare the Royal Navy for war and forcing Germany to accept minor territorial concessions in the Congo.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (SMS Panther Gunboat)', prompt: 'Identify Germany sending SMS Panther to Agadir port.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (July 1911, Moroccan port, gunboat diplomacy, challenging France).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (British Lloyd George Intervention)', prompt: 'Identify British backing for France in Mansion House speech.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (David Lloyd George, Mansion House speech, preparing Royal Navy, German retreat).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['Agadir Crisis (1911)', 'SMS Panther', 'gunboat diplomacy', 'David Lloyd George', 'Mansion House speech', 'Entente Cordiale', 'Anglo-French naval agreement']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the Moroccan Crises for relations between Great Britain and France. [4 marks]',
        prompt: 'Focus on how German aggression in Morocco solidified the Entente Cordiale into a de facto military and naval alliance with joint naval agreements in 1912.',
        model: 'One significant consequence of the Moroccan Crises was the transformation of the 1904 Entente Cordiale from a loose colonial agreement into a binding, de facto military alliance between Great Britain and France. Kaiser Wilhelm II’s repeated attempts to split the Entente—at Tangier in 1905 and Agadir in 1911—had the exact opposite effect: British leaders became convinced that Germany was an aggressive power seeking European naval domination. Consequently, in 1912, Britain and France signed a secret naval agreement where the British Royal Navy agreed to protect the English Channel and French northern coastline, while the French navy concentrated its battleships in the Mediterranean. As a direct result, Britain became morally and strategically committed to defending France in the event of German aggression in 1914.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State the transformation of the Entente into a binding military/naval partnership.', starter: 'One significant consequence of the Moroccan Crises was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite the 1912 Anglo-French naval agreement (Channel defense and Mediterranean).', starter: 'In particular, following the Agadir crisis...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain how this committed Britain morally and strategically to enter the war in 1914.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the Moroccan Crises was that...',
            'In particular, this led Britain and France to...',
            'As a direct result...',
            'Consequently, this solidified Anglo-French relations because...'
          ],
          connectives_bank: ['Entente Cordiale', 'Tangier (1905)', 'Agadir (1911)', '1912 naval agreement', 'Channel defense', 'military commitment']
        }
      }
    ]
  },

  // Lesson 3: The Anglo-German Naval Arms Race (Contrasting Interpretations [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Anglo-German Naval Arms Race & HMS Dreadnought',
    tariff: '8 marks (Contrasting Historical Interpretations)',
    questions: [
      {
        tariff: '4 marks',
        type: 'interpretations_diff_4m',
        question: 'Study Interpretations 1 and 2. How do they differ about the causes of the Anglo-German naval arms race? [4 marks]',
        stimulus: [
          'Interpretation 1: Professor Paul Kennedy, The Rise of Anglo-German Antagonism — argues that German naval expansion under Admiral von Tirpitz was a deliberate, provocative bid for world empire and naval challenge to British survival.',
          'Interpretation 2: Professor Christopher Clark, The Sleepwalkers — argues that German naval expansion was defensive and reactive, reflecting legitimate commercial growth, while British panic and anti-German hysteria exaggerated the risk.'
        ],
        prompt: 'Explain the difference between Kennedy’s view of aggressive German naval challenge and Clark’s view of defensive, legitimate commercial growth exaggerated by British alarm.',
        model: 'Interpretations 1 and 2 differ fundamentally on the underlying motives behind Germany’s naval building programme. Interpretation 1, advanced by Paul Kennedy, argues that Germany’s naval expansion was a deliberate, aggressive challenge to British global supremacy. Kennedy contends that Admiral von Tirpitz built a high-seas battle fleet with the explicit intention of coercing Britain and securing world empire. In contrast, Interpretation 2, by Christopher Clark, suggests that Germany’s naval build-up was primarily defensive and legitimate, reflecting its burgeoning commercial shipping and overseas trade. Clark argues that German leaders did not intend to provoke war, but that hyper-sensitive British fears and political alarmism unnecessarily escalated the rivalry. Thus, Kennedy views the naval race as German aggression, while Clark views it as mutual miscalculation.',
        scaffolding: {
          acronym: 'Point • Interp 1 • Interp 2 • Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(b) Interpretation Difference Formula',
          steps: [
            { letter: 'POINT', name: 'State the Core Difference', prompt: 'State clearly that they differ on whether Germany was an aggressor or acting defensively.', starter: 'Interpretations 1 and 2 differ fundamentally on...' },
            { letter: 'INTERP 1', name: 'Exemplify Kennedy (Deliberate Challenge)', prompt: 'Quote or summarize Kennedy on Tirpitz, challenge to British survival, and bid for empire.', starter: 'Interpretation 1 argues that...' },
            { letter: 'INTERP 2', name: 'Exemplify Clark (Defensive & Exaggerated)', prompt: 'Quote or summarize Clark on legitimate trade, defensive intentions, and British panic.', starter: 'In contrast, Interpretation 2 suggests that...' },
            { letter: 'CONTRAST', name: 'Synthesize the Divergence', prompt: 'Explicitly synthesize the difference between intentional aggression and mutual misjudgment.', starter: 'This is a fundamental difference because...' }
          ],
          sentence_starters: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In contrast, Interpretation 2 suggests that...',
            'This is a difference because...'
          ],
          connectives_bank: ['Paul Kennedy', 'Christopher Clark', 'Admiral von Tirpitz', 'Risk Theory', 'HMS Dreadnought', 'aggressive challenge vs defensive trade']
        }
      },
      {
        tariff: '4 marks',
        type: 'interpretations_reason_4m',
        question: 'Suggest one reason why Interpretations 1 and 2 differ about the causes of the naval arms race. [4 marks]',
        prompt: 'Explain why Kennedy and Clark arrive at different conclusions. Consider their differing evidence bases, historiographical perspectives (intentionalist vs revisionist), and focus.',
        model: 'One reason why Interpretations 1 and 2 differ is that the historians prioritize different archival evidence and write from contrasting historiographical paradigms. Paul Kennedy adopts an intentionalist, geopolitical framework, focusing heavily on internal German Admiralty planning documents, Tirpitz’s "Risk Theory", and Kaiser Wilhelm II’s aggressive bellicose speeches. This evidence emphasizes Germany’s conscious intention to challenge Britain. In contrast, Christopher Clark adopts a revisionist, multi-polar approach in "The Sleepwalkers", focusing on diplomatic misunderstandings, domestic political pressures within the British cabinet, and the psychology of decision-makers across Europe. Because Clark examines how fear and domestic paranoia distorted rational diplomacy, he reaches a conclusion emphasizing mutual panic rather than one-sided German culpability.',
        scaffolding: {
          acronym: 'Historiographical Framework • Evidence Focus • Synthesis',
          acronym_title: 'Edexcel Paper 3 Q3(c) Why Interpretations Differ Formula',
          steps: [
            { letter: 'REASON', name: 'Historiographical Focus', prompt: 'Identify that Kennedy uses German military planning, while Clark examines multi-polar psychology.', starter: 'One reason why Interpretations 1 and 2 differ is because they focus on...' },
            { letter: 'AUTHOR 1', name: 'Kennedy’s Intentionalist Focus', prompt: 'Explain Kennedy uses Tirpitz’s memos and Wilhelm II’s speeches to show deliberate planning.', starter: 'Specifically, Paul Kennedy focuses on German Admiralty archives and Tirpitz’s Risk Theory...' },
            { letter: 'AUTHOR 2', name: 'Clark’s Multi-Polar Focus', prompt: 'Explain Clark evaluates British domestic panic, cabinet rhetoric, and mutual sleepwalking.', starter: 'In contrast, Christopher Clark analyzes broader diplomatic psychology and British over-reaction...' }
          ],
          sentence_starters: [
            'One reason why Interpretations 1 and 2 differ is because they rely on different evidence...',
            'Specifically, Interpretation 1 focuses primarily on German Admiralty documents that show...',
            'In contrast, Interpretation 2 evaluates multi-polar diplomatic fears and...',
            'As a result, the authors reach different conclusions because...'
          ],
          connectives_bank: ['intentionalist historiography', 'revisionist history', 'Tirpitz memos', 'Risk Theory', 'British naval panic', 'multi-polar diplomacy']
        }
      }
    ]
  },

  // Lesson 4: The Alliance Systems & Balkan Powder Keg (Narrative Account [8m] & Explain Importance [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Alliance Systems & The Balkan Powder Keg',
    tariff: '16 marks (Narrative Account [8m] & Explain Importance [8m])',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing how crises in the Balkans between 1908 and 1913 increased European tension. [8 marks]',
        stimulus: [
          'The Austrian annexation of Bosnia (1908)',
          'The Balkan Wars and the rise of a Greater Serbia (1912–1913)'
        ],
        prompt: 'Write a chronological account examining the escalation: the 1908 Bosnian Crisis and Russian humiliation, the Balkan Wars of 1912–1913, and how this created intense Austro-Serbian hostility that led directly to 1914.',
        model: 'Between 1908 and 1913, consecutive crises in the Balkans converted the region into the volatile "powder keg" of Europe, dragging the great power alliances into acute confrontation.<br><br>The instability began in October 1908 when Austria-Hungary formally annexed the Ottoman provinces of Bosnia and Herzegovina. This provoked furious outrage in neighbouring Serbia, which harboured dreams of uniting all South Slavs under a "Greater Serbia". Serbia turned to its Slavic protector, Russia, for military support. However, when Germany issued an ultimatum in March 1909 declaring unconditional support for Austria, Russia—still recovering from its 1905 defeat by Japan—was forced to back down in deep humiliation. Tsar Nicholas II vowed that Russia would never back down in the Balkans again, initiating a massive military modernisation programme.<br><br>Tensions escalated dramatically during the Balkan Wars of 1912–1913. In the First Balkan War, the Balkan League (Serbia, Greece, Bulgaria, Montenegro) successfully drove the Ottoman Empire out of Europe. Following a territorial dispute in the Second Balkan War, Serbia emerged victorious, doubling its territorial size and population. Elated by victory, militant Serb nationalists in organizations like the "Black Hand" expanded subversive propaganda inside Austro-Hungarian territory.<br><br>Consequently, the outcome of the Balkan crises created irreconcilable hostility between Austria-Hungary and Serbia. Austrian military leaders, led by Field Marshal Conrad von Hötzendorf, became convinced that Serbia represented an existential mortal threat that had to be crushed by preventive war. When Archduke Franz Ferdinand visited Sarajevo in June 1914, the powder keg was primed for detonation.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: '1908 Bosnian Annexation & Russian Humiliation', prompt: 'Explain Austria seizing Bosnia, Serbian outrage, German ultimatum, and Russian humiliation.', starter: 'Initially, the Balkan crisis began in October 1908 when...' },
            { letter: 'STAGE 2', name: '1912–1913 Balkan Wars & Greater Serbia', prompt: 'Explain Balkan League, Ottoman expulsion, Serbia doubling in size, and Black Hand agitation.', starter: 'Following this, tensions escalated sharply during the Balkan Wars of 1912–1913 when...' },
            { letter: 'STAGE 3', name: 'Austro-Serbian Hostility & Priming 1914', prompt: 'Explain Austrian preventive war mentality (Conrad von Hötzendorf) and Sarajevo setting.', starter: 'The outcome of these crises permanently destabilized Europe because...' }
          ],
          sentence_starters: [
            'Initially, the crisis began when...',
            'Following this, a major escalation occurred in 1912–1913 when...',
            'A dangerous turning point was reached when...',
            'Consequently, this culminated by 1914 in...'
          ],
          connectives_bank: ['Bosnian Crisis (1908)', 'Greater Serbia', 'Russian humiliation', 'Balkan League', 'Balkans Powder Keg', 'Black Hand', 'Conrad von Hötzendorf', 'preventive war']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_importance_8m',
        question: 'Explain the importance of the alliance systems for relations between European great powers before 1914. [8 marks]',
        prompt: 'Explain two distinct reasons why the alliance systems were important: first, how they divided Europe into two armed, suspicious camps (Triple Alliance vs Triple Entente); second, how mutual defense obligations converted a localized Balkan dispute into a continent-wide total war in July 1914.',
        model: 'One reason the alliance systems were profoundly important was that they divided Europe into two rigid, armed camps characterized by pervasive fear of encirclement and mutual paranoia. By 1907, the Triple Alliance (Germany, Austria-Hungary, Italy) faced the Triple Entente (Britain, France, Russia). Rather than preserving the peace through balance of power deterrence as originally intended, the alliances entrenched suspicion. Every diplomatic incident—such as the Moroccan Crises or the Bosnian Crisis—was viewed as a zero-sum test of alliance resolve, encouraging military staffs to coordinate joint war plans and accelerate the land and naval arms races.<br><br>Furthermore, the alliances were critical because their interlocking mutual defense treaties operated as a fatal transmission belt that converted a localized regional quarrel into a catastrophic world war. When Archduke Franz Ferdinand was assassinated by Gavrilo Princip in June 1914, the dispute was strictly between Austria-Hungary and Serbia. However, Germany’s "blank cheque" of 5 July emboldened Austria to issue an impossible ultimatum. In turn, Russia’s commitment to Serbia triggered general mobilization; Germany’s Schlieffen Plan demanded an immediate invasion of France via Belgium; and Britain’s guarantee of Belgian neutrality under the 1839 Treaty of London compelled British entry. Consequently, the alliance obligations ensured that no great power could remain neutral, plunging the entire continent into war within six weeks.',
        scaffolding: {
          acronym: 'Importance Point 1 • Importance Point 2',
          acronym_title: 'Edexcel Paper 2 Period Study 8-Mark Importance Standard',
          steps: [
            { letter: 'IMPACT 1', name: 'Division into Armed Camps & Zero-Sum Paranoia', prompt: 'Explain Triple Alliance vs Triple Entente, fear of encirclement, and war plan coordination.', starter: 'One reason the alliance systems were profoundly important was that...' },
            { letter: 'IMPACT 2', name: 'The Fatal Transmission Belt in July 1914', prompt: 'Explain the blank cheque, Russian mobilization, Schlieffen Plan, Belgian neutrality, and world war.', starter: 'Furthermore, the alliances were critical because their mutual obligations operated as...' }
          ],
          sentence_starters: [
            'One reason why the alliance systems were important was...',
            'In particular, they divided Europe into...',
            'Furthermore, the alliances were decisive because...',
            'Consequently, this transformed a regional dispute because...'
          ],
          connectives_bank: ['Triple Alliance', 'Triple Entente', 'blank cheque (5 July 1914)', 'Russian mobilization', 'Schlieffen Plan', 'Treaty of London (1839)', 'fatal transmission belt']
        }
      }
    ]
  },

  // Lesson 5: The July Crisis: Sarajevo to Outbreak of War (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: The July Crisis & The Outbreak of War',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '“The main cause of the First World War was alliance rivalries.” How far do you agree? Explain your answer. [12 marks]',
        stimulus: [
          'The Triple Alliance and Triple Entente rivalries',
          'The assassination of Archduke Franz Ferdinand'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate how the rigid alliance commitments and mobilization timetables acted as the transmission belt that dragged all five great powers into war; on the other hand, evaluate alternative long-term causes—militarism (Schlieffen Plan), imperialism, and the immediate spark of the Sarajevo assassination. Reach a weighed conclusion.',
        model: 'To a significant extent, it is accurate to argue that alliance rivalries were the primary structural cause of the First World War. While imperial rivalries, naval competition, and the immediate spark of the Sarajevo assassination supplied the fuel, it was the rigid, interlocking treaty commitments of the Triple Alliance and Triple Entente that converted a localized Balkan incident into an inescapable continental catastrophe.<br><br>On the one hand, alliance obligations were decisive because they bound great power survival to mutual military commitments. When Kaiser Wilhelm II and Theobald von Bethmann-Hollweg issued Germany’s unconditional "blank cheque" to Austria-Hungary on 5 July 1914, they encouraged Vienna to issue a draconian ultimatum designed to crush Serbia. When Austria bombarded Belgrade, Russia felt compelled to order general mobilization to defend its Slavic ally and prevent its alliance partner, France, from viewing it as unreliable. Crucially, the alliance treaties removed diplomatic flexibility: Germany declared war on Russia on 1 August and France on 3 August, while Britain entered on 4 August to honor its strategic alignment with France and uphold the 1839 Treaty of London guaranteeing Belgian neutrality. Without these binding alliances, the crisis would have remained a third localized Balkan war.<br><br>On the other hand, it can be argued that aggressive militarism and rigid railway mobilization timetables were the true culprits. Under the Schlieffen Plan, German military commanders believed that because Russia’s army took six weeks to mobilize, Germany had to strike and defeat France within forty days by violating Belgian neutrality. As historian A. J. P. Taylor argued, the great powers were dragged into conflict by "war by timetable", where military chiefs insisted that stopping troop trains would leave their nations defenceless. Furthermore, rampant nationalism in the Balkans and the specific terrorist act of the Black Hand in Sarajevo on 28 June 1914 provided the indispensable catalyst without which general mobilization would never have been triggered.<br><br>In conclusion, while militarism dictated the mechanical speed of escalation, alliance rivalries were the foundational cause. The division of Europe into two fortified blocs created the zero-sum atmosphere where every power believed that allowing an ally to be crushed meant its own eventual destruction, making general war inevitable once the trigger was pulled.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that alliance commitments converted a local dispute into a world war.', starter: 'To a significant extent, it is accurate to argue that alliance rivalries were the primary cause because...' },
            { letter: 'THEME 1', name: 'Alliance Mechanics & Blank Cheque', prompt: 'Explain the 5 July blank cheque, Russian mobilization, and mutual obligations dragging in Britain and France.', starter: 'On the one hand, alliance rivalries were decisive because...' },
            { letter: 'THEME 2', name: 'Militarism, Timetables & Sarajevo Spark', prompt: 'Evaluate alternative factors: the Schlieffen Plan, war by timetable (A.J.P. Taylor), and the Black Hand assassination.', starter: 'On the other hand, it can be argued that rigid militarism and the Sarajevo spark were foundational because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why alliances were the structural architecture without which world war was impossible.', starter: 'In conclusion, while militarism determined the rapid execution of war, alliance rivalries were decisive because...' }
          ],
          sentence_starters: [
            'To a significant extent, it is accurate to argue that...',
            'On the one hand, alliance obligations were decisive because...',
            'In particular, Germany’s blank cheque to Austria-Hungary...',
            'On the other hand, an alternative argument highlights militarism and timetables, such as...',
            'In conclusion, the most decisive factor was... because...'
          ],
          connectives_bank: ['Triple Alliance', 'Triple Entente', 'blank cheque (5 July 1914)', 'Sarajevo assassination', 'Gavrilo Princip', 'Black Hand', 'Schlieffen Plan', 'war by timetable', 'A. J. P. Taylor']
        }
      }
    ]
  }
];

// Inject into unitData.lessons (first 5 lessons; lesson 6 retains its masterclass assessment)
for (let i = 0; i < 5; i++) {
  if (gw1ExamPractice[i]) {
    unitData.lessons[i].exam_practice = gw1ExamPractice[i];
  }
}

// Serialize back to units/great_war/data.js
const serialized = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized lessons 1–5 of Great War (Causes) with workbook examination practice!');
