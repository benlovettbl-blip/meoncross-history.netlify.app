const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/const\s+medieval_england_data\s*=\s*(\{[\s\S]*\});\s*if\s*\(typeof\s+module/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/medieval_england/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const medExamPractice = [
  // Lesson 1: Hastings (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The Battle of Hastings (1066)',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why William of Normandy achieved victory at the Battle of Hastings in 1066. [12 marks]',
        stimulus: [
          'Norman military tactics, heavy cavalry, and the feigned retreat',
          'Anglo-Saxon exhaustion and loss of shield-wall discipline'
        ],
        prompt: 'Explain three distinct causal reasons: William’s combined-arms tactics (archers, infantry, and heavy cavalry) and the decisive feigned retreat; King Harold Godwinson’s physical and military exhaustion following the Battle of Stamford Bridge; and the fatal breakdown of Anglo-Saxon shield-wall discipline at the top of Senlac Hill.',
        model: 'One primary reason William of Normandy achieved victory was his superior combined-arms military tactics and the devastating deployment of the "feigned retreat". Unlike King Harold’s exclusively infantry army, William commanded a modern, integrated force comprising long-range archers, heavy foot soldiers, and armoured mounted knights. When early Norman charges failed to penetrate the Anglo-Saxon shield wall, William exploited rumours of his death by lifting his helmet to rally his men, before ordering his cavalry to simulate panicked retreats down Senlac Hill. When undisciplined Saxon soldiers broke ranks to pursue the fleeing Normans, William’s knights wheeled around and surrounded them on the open slopes, decimating Harold’s defensive perimeter.<br><br>Furthermore, a second decisive factor was the acute exhaustion and depletion of Harold Godwinson’s army. In September 1066, Harold was forced to march his elite housecarls 190 miles north in just four days to confront King Harald Hardrada of Norway at the Battle of Stamford Bridge. Although victorious, Harold suffered heavy casualties among his best-trained veterans. Hearing that William had landed at Pevensey, Harold marched his exhausted men 250 miles back south to London and straight to Hastings without waiting for regional levies from the northern earls, Edwin and Morcar. Consequently, many Saxon soldiers were tired, wounded, and supplemented by untrained peasant fyrd wielding simple farming implements.<br><br>Finally, the battle was decided by the loss of Saxon shield-wall discipline and the death of Harold Godwinson. The Anglo-Saxon shield wall was formidable when locked tight, but as hours passed and soldiers repeatedly broke formation to chase retreating Normans, gaps opened in the Saxon line. Late in the afternoon, William ordered his archers to fire high in the air, creating a deadly rain of falling arrows while heavy cavalry charged through the fractured line. Harold was killed alongside his brothers Gyrth and Leofwine; deprived of their king and leadership, the remaining Saxon fyrd dissolved into panic and fled into the woods, handing Duke William total military victory.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Combined Arms & Feigned Retreat', prompt: 'Explain William’s archers, heavy cavalry, lifting helmet, and fake retreat drawing Saxons downhill.', starter: 'One primary reason William won was his superior tactics, such as...' },
            { letter: 'REASON 2', name: 'Saxon Exhaustion (Stamford Bridge March)', prompt: 'Explain Stamford Bridge battle against Hardrada, 400 miles marching in 3 weeks, and missing levies.', starter: 'Furthermore, a second decisive factor was Harold’s army being exhausted because...' },
            { letter: 'REASON 3', name: 'Shield Wall Collapse & Harold’s Death', prompt: 'Explain discipline breaking, high-angled archery, death of Harold, and rout of the fyrd.', starter: 'Finally, the battle was decided when the Saxon shield wall collapsed because...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, the deployment of...',
            'This led directly to Norman victory because...',
            'Another key factor was Harold’s exhaustion, such as...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['William of Normandy', 'Harold Godwinson', 'Senlac Hill', 'shield wall', 'feigned retreat', 'heavy cavalry', 'Stamford Bridge', 'housecarls', 'fyrd']
        }
      }
    ]
  },

  // Lesson 2: Castles, Terror & Domesday (Feature Drill [4m] & Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Castles, Terror & The Domesday Survey',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of Norman motte-and-bailey castles. [4 marks]',
        prompt: 'Identify two distinct architectural features of motte-and-bailey castles. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was the motte, an artificial steep earthen mound crowned by a wooden keep.<br>Detail: The motte was constructed between five and ten metres high using earth dug from a surrounding ditch, providing Norman garrisons with an elevated watchtower and defensive stronghold accessible only via a steep wooden drawbridge.<br><br>Feature 2: A second key feature was the bailey, an enclosed courtyard at the base of the mound.<br>Detail: Protected by a wooden palisade fence and ditch, the bailey housed barracks, stables, workshops, and livestock, serving as the daily military garrison that controlled the surrounding English countryside.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (The Motte & Keep)', prompt: 'Identify the artificial mound, surrounding ditch, and wooden lookout keep.', starter: 'One key feature was the motte, which was...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (5–10m high, earth mound, elevated lookout, drawbridge).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (The Bailey Courtyard)', prompt: 'Identify the enclosed lower courtyard with living quarters and stables.', starter: 'A second key feature was the bailey, which...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (palisade fence, ditch, barracks, workshops, livestock).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this served to...'
          ],
          connectives_bank: ['motte', 'bailey', 'wooden keep', 'palisade', 'ditch', 'drawbridge', 'garrison', 'quick construction']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the motte-and-bailey blitz for Anglo-Saxon resistance against Norman rule. [4 marks]',
        prompt: 'Focus on how the rapid construction of over 500 motte-and-bailey castles within a few decades permanently suppressed rebellions and established psychological intimidation over the hostile English population.',
        model: 'One significant consequence of the motte-and-bailey castle blitz was the permanent suppression of Anglo-Saxon rebellions and the total subjugation of the English population. Because motte-and-bailey castles could be assembled in as little as eight to fourteen days using forced Anglo-Saxon labour, William planted over 500 castles at strategic crossroads, river crossings, and rebellious cities (such as York). Each castle housed armoured Norman cavalry capable of riding out within minutes to crush local insurrections before rebels could unite. Consequently, these fortifications operated as permanent psychological instruments of terror, depriving Anglo-Saxons of their weapons and ensuring that a tiny Norman ruling elite of roughly 7,000 men could successfully dominate two million hostile English subjects.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State the permanent suppression of Saxon rebellion and psychological terror.', starter: 'One significant consequence of the castle blitz was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite 500 castles, quick construction, cavalry strike capacity, and controlling 2 million people.', starter: 'In particular, because castles could be built in under two weeks...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain how 7,000 Normans dominated 2 million hostile English.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the castle blitz was that...',
            'In particular, this meant that...',
            'As a direct result...',
            'Consequently, this transformed Norman control because...'
          ],
          connectives_bank: ['500 castles', 'castle blitz', 'suppression of rebellion', 'Norman cavalry patrols', 'Harrying of the North', 'psychological intimidation']
        }
      }
    ]
  },

  // Lesson 3: Crown vs Church: Henry II & Thomas Becket (Contrasting Interpretations [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Crown vs Church: Henry II & Thomas Becket',
    tariff: '8 marks (Contrasting Historical Interpretations)',
    questions: [
      {
        tariff: '4 marks',
        type: 'interpretations_diff_4m',
        question: 'Explain how Interpretations 1 and 2 differ on Thomas Becket’s motives and character. [4 marks]',
        stimulus: [
          'Interpretation 1: Edward Grim, Eyewitness Monk & Chronicler, Life of St Thomas (c. 1175) — praises Becket as a saintly martyr who defended holy Church liberties against a tyrannical king, dying with serene Christian courage in Canterbury Cathedral.',
          'Interpretation 2: Historian W. L. Warren, Henry II (1973) — portrays Becket as an obstinate, arrogant politician who provoked his own downfall by stubbornly defying royal legal reforms and excommunicating fellow bishops to satisfy his personal vanity.'
        ],
        prompt: 'Explain the difference between Edward Grim’s contemporary hagiographical view of a saintly, selfless martyr and W. L. Warren’s modern historical analysis of an arrogant, stubborn political fanatic.',
        model: 'Interpretations 1 and 2 differ fundamentally on the character, motives, and conduct of Thomas Becket. Interpretation 1, written by eyewitness monk Edward Grim shortly after Becket’s murder, depicts Becket as a holy, self-sacrificing martyr for Christ. Grim presents Becket as a courageous defender of Church independence who meekly offered his life rather than compromise sacred liberties against royal tyranny. In sharp contrast, Interpretation 2, by modern biographer W. L. Warren, portrays Becket as an arrogant, obstinate, and politically reckless figure. Warren contends that Becket was driven by personal pride and vanity rather than pure religious devotion, arguing that he deliberately provoked King Henry II by stubbornly obstructing necessary legal reforms and vindictively excommunicating fellow bishops. Thus, Grim sees a righteous saint, while Warren sees an inflexible, self-destructive politician.',
        scaffolding: {
          acronym: 'Point • Interp 1 • Interp 2 • Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(b) Interpretation Difference Formula',
          steps: [
            { letter: 'POINT', name: 'State the Core Difference', prompt: 'State clearly that they differ on whether Becket was a holy martyr or an arrogant politician.', starter: 'Interpretations 1 and 2 differ fundamentally on...' },
            { letter: 'INTERP 1', name: 'Exemplify Grim (Holy Martyr)', prompt: 'Quote or summarize Grim on defending Church liberties, holy courage, and martyrdom.', starter: 'Interpretation 1 argues that...' },
            { letter: 'INTERP 2', name: 'Exemplify Warren (Arrogant Politician)', prompt: 'Quote or summarize Warren on obstinate vanity, excommunications, and provoking Henry II.', starter: 'In contrast, Interpretation 2 suggests that...' },
            { letter: 'CONTRAST', name: 'Synthesize the Divergence', prompt: 'Explicitly synthesize the difference between spiritual martyrdom and secular arrogance.', starter: 'This is a fundamental difference because...' }
          ],
          sentence_starters: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In contrast, Interpretation 2 suggests that...',
            'This is a difference because...'
          ],
          connectives_bank: ['Edward Grim (c. 1175)', 'W. L. Warren (1973)', 'Constitutions of Clarendon', 'saintly martyr vs arrogant politician', 'benefit of clergy', 'excommunication', 'Canterbury Cathedral']
        }
      },
      {
        tariff: '4 marks',
        type: 'interpretations_reason_4m',
        question: 'Suggest one reason why Interpretations 1 and 2 differ on Becket’s clash with King Henry II. [4 marks]',
        prompt: 'Explain why Grim and Warren arrive at contrasting conclusions. Consider Grim’s medieval monastic veneration and eyewitness loyalty to Becket versus Warren’s modern secular evaluation of administrative statecraft and royal legal reform.',
        model: 'One primary reason why Interpretations 1 and 2 differ is that the authors write from radically different historical eras, religious perspectives, and analytical motives. Edward Grim was a medieval Catholic monk who personally witnessed Becket’s murder inside Canterbury Cathedral in December 1170. Writing during Becket’s rapid canonisation as Europe’s most revered saint, Grim’s motive was hagiographical—to inspire Christian pilgrimage, venerate Becket’s holiness, and cast King Henry II’s knights as demonic villains. In contrast, W. L. Warren is a twentieth-century secular academic historian evaluating Henry II’s reign as a whole. Warren’s focus is on Henry II’s pioneering creation of English common law and royal judicial circuits, leading him to view Becket’s defence of "benefit of clergy" (criminous clerks escaping royal courts) as an unreasonable obstacle to royal justice, explaining why he reaches a critical verdict.',
        scaffolding: {
          acronym: 'Context Contrast • Monastic Veneration vs Administrative Law',
          acronym_title: 'Edexcel Paper 3 Q3(c) Why Interpretations Differ Formula',
          steps: [
            { letter: 'REASON', name: 'Era & Purpose', prompt: 'Identify medieval hagiography for pilgrims vs modern secular legal history.', starter: 'One reason why Interpretations 1 and 2 differ is because they write from...' },
            { letter: 'AUTHOR 1', name: 'Grim’s Monastic Purpose', prompt: 'Explain Grim witnessed the murder and wrote to promote saintly martyrdom.', starter: 'Specifically, Edward Grim was a medieval monk whose purpose was to...' },
            { letter: 'AUTHOR 2', name: 'Warren’s Institutional Focus', prompt: 'Explain Warren analyzes Henry II’s common law and judges Becket by modern statecraft.', starter: 'In contrast, W. L. Warren writes as a modern historian analyzing Henry II’s legal system...' }
          ],
          sentence_starters: [
            'One reason why Interpretations 1 and 2 differ is because they have different purposes...',
            'Specifically, Interpretation 1 was written in the 1170s to promote...',
            'In contrast, Interpretation 2 was written in 1973 to evaluate...',
            'As a result, the authors reach different conclusions because...'
          ],
          connectives_bank: ['hagiography', 'eyewitness monk', 'canonisation of St Thomas', 'common law creation', 'benefit of clergy', 'criminous clerks', 'secular administration']
        }
      }
    ]
  },

  // Lesson 4: Magna Carta (1215) & Medieval Kingship (Narrative Account [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: King John & The Sealing of Magna Carta (1215)',
    tariff: '8 marks (Narrative Account)',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key events leading from the loss of Normandy (1204) to the sealing of Magna Carta (1215). [8 marks]',
        stimulus: [
          'The loss of Normandy and heavy scutage taxation',
          'The defeat at the Battle of Bouvines (1214)'
        ],
        prompt: 'Write a chronological account examining the escalation: King John’s loss of ancestral Norman lands in 1204, his exorbitant financial exactions (scutage, wardship fines) to finance reconquest, his humiliating defeat at Bouvines in 1214, and the baronial rebellion forcing the sealing of Magna Carta at Runnymede in June 1215.',
        model: 'Between 1204 and 1215, King John’s catastrophic military failures and tyrannical extortion provoked a unified baronial rebellion that fundamentally transformed English medieval kingship.<br><br>The crisis began in 1204 when King Philip II of France conquered Normandy and Anjou, stripping John of his ancestral continental empire. Desperate to fund an army to reconquer his lands, John subjected his English subjects to unprecedented financial extortion. He levied eleven "scutage" taxes (shield money in place of military service) in sixteen years, extorted massive arbitrary relief payments from young heirs, seized church properties during his six-year quarrel with Pope Innocent III, and abused forest laws. Known as "Softsword", John alienated both the northern barons and the Church by ruling through personal caprice rather than feudal custom.<br><br>The decisive military turning point occurred on 27 July 1214 at the Battle of Bouvines. John had spent hundreds of thousands of pounds assembling a grand coalition with the Holy Roman Emperor Otto IV to crush Philip II. However, John’s coalition was utterly routed at Bouvines, shattering his dream of reclaiming Normandy and bankrupting the royal treasury. Barons who had paid exorbitant scutage returned home furious that their money had been squandered on a humiliating foreign defeat.<br><br>Consequently, when John demanded yet another tax, a coalition of northern and eastern barons rebelled in May 1215, renouncing their feudal homage and capturing London. Deprived of military support, John was forced to meet the rebel barons at Runnymede meadow beside the River Thames. On 15 June 1215, John affixed the Great Seal to Magna Carta, legally establishing for the first time that the English monarch was not above the law and could not levy taxes without the common counsel of the realm.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: '1204 Loss of Normandy & Scutage Extortion', prompt: 'Explain losing Normandy, 11 scutages, relief fines, and baronial resentment.', starter: 'Initially, the road to Magna Carta began in 1204 when King John...' },
            { letter: 'STAGE 2', name: 'July 1214 Disaster at Bouvines', prompt: 'Explain spending royal wealth, total rout at Bouvines, and shattered prestige.', starter: 'Following a decade of heavy taxation, the decisive military disaster occurred in July 1214 at...' },
            { letter: 'STAGE 3', name: 'May–June 1215 Baronial Rebellion & Runnymede', prompt: 'Explain barons renouncing homage, capturing London, and sealing Magna Carta at Runnymede.', starter: 'The culmination of the rebellion occurred in the spring of 1215 when...' }
          ],
          sentence_starters: [
            'Initially, the crisis began when King John...',
            'Following this, financial oppression escalated when...',
            'A decisive military turning point was reached in 1214 when...',
            'Consequently, this culminated in June 1215 when...'
          ],
          connectives_bank: ['loss of Normandy (1204)', 'Philip II of France', 'scutage taxation', 'relief fines', 'Pope Innocent III', 'Battle of Bouvines (1214)', 'rebel barons', 'Runnymede (1215)', 'Magna Carta']
        }
      }
    ]
  },

  // Lesson 5: Black Death & Peasants' Revolt (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: The Black Death & The Breakdown of Feudalism',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The Black Death of 1348 was the main cause of the breakdown of the feudal system in medieval England.’ How far do you agree? [12 marks]',
        stimulus: [
          'The demographic collapse and labour shortage caused by the Black Death (1348–1350)',
          'The 1351 Statute of Labourers and the Peasants’ Revolt of 1381'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate how the Black Death’s 40–50% mortality created an acute labour shortage, allowing serfs to demand higher wages and flee bondage; on the other hand, evaluate how the feudal system survived through reactionary laws (1351 Statute of Labourers) and how it was the Poll Taxes and the 1381 Peasants’ Revolt that permanently shattered the feudal order. Reach a weighed conclusion.',
        model: 'To a significant extent, the Black Death of 1348 was the fundamental economic catalyst that doomed the feudal system in England. While the legal structures of serfdom were not dismantled overnight, the demographic annihilation of nearly half the population irrevocably shattered the basic premise of feudalism: that land was scarce and labour was cheap and expendable.<br><br>On the one hand, the Black Death triggered an unprecedented demographic collapse that fundamentally reversed economic power between lords and peasants. Arriving in Dorset in the summer of 1348, the bubonic and pneumonic plague killed between 40% and 50% of the English population within eighteen months. Fields were left unharvested and livestock wandered through abandoned villages. With an acute scarcity of labour, surviving peasants and serfs suddenly possessed immense economic leverage. Peasants demanded double or triple their pre-plague wages, while bondmen (villeins) threatened to flee to neighbouring manors unless lords reduced labor services (corvée) and converted obligations into cash rents. This spontaneous economic revolution began the rapid erosion of customary serfdom.<br><br>On the other hand, it can be argued that feudalism was broken not by the plague itself, but by the violent political clash between peasant aspirations and reactionary state repression. In response to the labour shortage, the landowning nobility passed the 1351 Statute of Labourers, fixing wages at pre-plague 1346 levels and criminalizing peasants who travelled to seek higher pay. For thirty years, justices enforced these punitive laws. Tensions exploded when the crown levied three successive flat-rate Poll Taxes between 1377 and 1381 to pay for the Hundred Years’ War. Led by Wat Tyler and radical priest John Ball (who preached "When Adam delved and Eve span, who was then the gentleman?"), the Peasants’ Revolt of 1381 marched on London, burning manorial rolls and executing the Archbishop of Canterbury. Although Richard II betrayed the rebels and executed Tyler, the aristocracy recognized that serfdom could no longer be enforced by fear without risking social annihilation.<br><br>In conclusion, while the 1381 Peasants’ Revolt delivered the political coup de grâce that made lords abandon serfdom, it was the Black Death that created the underlying conditions. By halving the workforce and transforming human labour into a scarce, valuable commodity, the plague dealt feudalism a fatal economic wound from which it could never recover.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that the plague created the labour scarcity that made feudal serfdom economically unviable.', starter: 'To a significant extent, the Black Death was the fundamental catalyst because...' },
            { letter: 'THEME 1', name: 'Plague Mortality & Labour Leverage', prompt: 'Explain 40–50% death toll, labour scarcity, demanding higher wages, and fleeing to other manors.', starter: 'On the one hand, the Black Death shattered feudal power dynamics because...' },
            { letter: 'THEME 2', name: 'Statute of Labourers & 1381 Revolt', prompt: 'Evaluate 1351 Statute of Labourers, Poll Taxes, Wat Tyler, John Ball, and manorial rolls burned.', starter: 'On the other hand, it can be argued that political resistance was decisive because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why economic labour scarcity drove the political crisis of 1381.', starter: 'In conclusion, while the 1381 revolt delivered the final blow, the Black Death was the true cause because...' }
          ],
          sentence_starters: [
            'To a significant extent, it can be argued that...',
            'On the one hand, the demographic collapse transformed the economy because...',
            'In particular, peasants were able to demand...',
            'On the other hand, an alternative argument highlights political repression and revolt, such as...',
            'In conclusion, the most decisive factor was... because...'
          ],
          connectives_bank: ['Black Death (1348)', '40–50% mortality', 'labour shortage', 'Statute of Labourers (1351)', 'Poll Tax (1381)', 'Peasants’ Revolt', 'Wat Tyler', 'John Ball', 'villeins / serfdom', 'manorial rolls']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (medExamPractice[idx]) {
    lesson.exam_practice = medExamPractice[idx];
  }
});

// Serialize back to units/medieval_england/data.js
const serialized = `const medieval_england_data = ${JSON.stringify(unitData, null, 2)};\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = medieval_england_data;\n}\nexport default medieval_england_data;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Medieval England with workbook examination practice!');
